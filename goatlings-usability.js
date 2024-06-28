// ==UserScript==
// @name        Goatlings Usability
// @namespace   goatlings.usability
// @description Various tweaks to Goatlings.com
// @match       https://goatlings.com/*
// @match       https://www.goatlings.com/*
// @grant       GM_setValue
// @grant       GM_setValue
// @grant       GM.setValue
// @grant       GM.getValue
// @require     https://code.jquery.com/jquery-3.7.1.min.js
// @downloadURL https://raw.githubusercontent.com/SleebyRhea/goatlings-usability/main/goatlings-usability.js
// @updateURL   https://raw.githubusercontent.com/SleebyRhea/goatlings-usability/main/goatlings-usability.js
// @license     bsd-3-clause
// @version     1.0.2
// ==/UserScript==

/* eslint-env jquery */
/* globals jQuery, $, waitForKeyElements */

// Unfortunately necessary, as the DD2.gif image does not contain transparency
let __dd3_raw = "data:image/gif;base64, R0lGODlhFAAUAMZ6AP7//wDm9v79zf/8zLTy////zQLl9v/+zf/9/v/+0Lbx/wLl+ADl+P7+zP/+//78"
  + "y//8/wPk9gLk9AHk9wHk9QPm97j0/7Pz//7//f/9zgLk+rjy///+y//9ygXj+rTy/QHn9///zAHm+f/8zwPl9QDk9//+/P7+/P//0/3/zgDl+gDn9QDm9bjw/f3//Pz/zrfx/P"
  + "//zwPk+v///f7+/rHz/wDk+f7+//3+0v/8zbL1/gXk9QDn+QDm8gDm+Lfx/bfz+7jx/Lby/ATl+f79ywDm9ATi9//7zf7/z///zv780//+0v3+/7fz/gHj+QDn+7by+gDl97Pz/"
  + "f//y7T0///7y//90vz9///9/7Px/v/7z7Xz/wDl9bL1+wHn9rXz/v//0f3/+gLj9bT0/v7/0f3/zf3//rX1/gDm8wPl8///+/79////+v7+yrXw/v/+z/78zADj87fy/wLi+7Ly"
  + "/gDl/P/9zQPm+f/90P/+zv/////9zP///////////////yH/C05FVFNDQVBFMi4wAwEAAAAh/hFDcmVhdGVkIHdpdGggR0lNUAAh+QQJMgB/ACwAAAAAFAAUAEAH2oB/goOEhYJ"
  + "3hAEtQCASBB8wOgoEFiUMdBsahIiDAXoIeiqGo6SDnIkwNSsuWBAALhJfXROlpXd3ELeDTqAYJgYKW1kMDg4zax6EFQRyZxQAn3oOJxglQlJuC5uHH3EnAABiGxG1hRTlhAS1p6P"
  + "qo+yCFTZRXHdPEiILczxFIIUTCmQw0ePjB5UgTS6gQQCAAhRNgiKoCJDGwwoSMgyQGMKCAYMddbQNMkBAAYsbNNTQCKNHz4ILFgyMEjEmgoMrbEwAqNAigCFcnLwY0WNmhgGf6AT1"
  + "AEArqdNAACH5BAkyAH8ALAEAAAATABIAQAfQgH+Cg4SFhQEtQCASBB8wOgoEFiUMdBsahoIBegh6KoJ3EHeDo5mmhAEwNSsuWBAALhJfXROEpaemTp0YJgYKW1kMDg4zax6DFQRyZx"
  + "QAnHoOJxglQlJuC4MEoB9xJwAAYhsRuOSkouWZFTZRXHdPEiILczxFIIQTCjJMej4/VEFNLqBBAIACFEx/IqgIkMbDChIyDJAYwoIBgx11sAkyQEABixs01NAIo0fPggsWDBgSM"
  + "SaCgytsTACo0CIALi9G9JiZYcDmn1umegCoRWpQIAA"

const UPDATE_WAIT_TIME = 60 * 60 * 1
const PAGE = "https://www.goatlings.com"
const IMAGES = {
  mail: "/images/layout/mail3.gif",
  daimonds: __dd3_raw,
  sugarstars: "/images/layout/SS2.gif"
}

const setValue = GM?.setValue ?? GM_setValue // eslint-disable-line
const getValue = GM?.getValue ?? GM_getValue // eslint-disable-line

const getUri = (page) => {
  return String(page ?? window.location.href).replace(/^https?:\/\/(?:www\.)?goatlings.com/, "")
}

const parseSepInt = (str) => {
  return parseInt((str ?? "0").replace(",", ""))
}

const css = (def) => {
  def = String(def ?? "")
  return String(def.replaceAll(/(?:\r\n|\r|\n)/g, " "))
}

class UserInfo {
  constructor(csrf, name) {
    this.csrf = csrf ?? false
    this.name = name ?? false
    this.__updaters = {}
    this.__builders = {}
    this.__fields = {}

    return new Proxy(this, this)
  }

  addField(what, define) {
    if (what in this.__fields) throw Error("Can't redefine getter for UserInfo: " + what)
    this.log("debug", "addField()", `Defining new UserInfo field '${what}'`)
    this.__fields[what] = null
    this.__updaters[what] = define.update
    this.__builders[what] = define.create || (() => { })
  }

  validField(what) {
    if (!what
      || !(what in this.__fields)
      || !(what in this.__updaters)
      || !(what in this.__builders)
    ) return false
    return true
  }

  async checkNeedsUpdate(what) {
    if (!this.validField(what)) return null
    this.log("debug", `checkNeedsUpdate() - Checking for needs update on '${what}'`)

    if (!this.csrf) {
      this.log("checkNeedsUpdate() - Dom not ready, missing CSRF aborting")
      return false
    }

    let now = Math.floor(Date.now() / 1000)
    let last = Math.floor(await getValue(`${this.csrf}_${what}_last_update`) || 0)

    this.log("debug", "checkNeedsUpdate()", `Time since last update time was: ${now - last}, want >= ${UPDATE_WAIT_TIME}`)
    this.log("debug", "checkNeedsUpdate()", `Times - now:${now}, last:${last}`)
    if ((now - last) >= UPDATE_WAIT_TIME) return true

    this.log("debug", "checkNeedsUpdate()", "No update needed for " + what)
    return false
  }

  async fetch(what) {
    if (!this.validField(what)) return null
    this.log("debug", `fetch() - Fetching data for '${what}' ...`)
    if (await this.checkNeedsUpdate(what))
      return this.update(what)

    if (this.__fields[what] != null && this.__fields[what] != undefined)
      return this.__fields[what]

    let saved = await getValue(`${this.csrf}_${what}`)
    if (saved != null && saved != undefined) {
      let data = JSON.parse(saved)
      this.__builders[what](data)
      this.__fields[what] = data
      return data
    }


    return this.update(what)
  }

  async update(what) {
    if (!this.validField(what)) return null
    this.log("debug", "update()", `Performing update for '${what}' ...`)
    let result = this.__fields[what] = this.__updaters[what](this)
    this.log("debug", "update() results - ", result)
    await setValue(`${this.csrf}_${what}_last_update`, Math.floor(Date.now() / 1000))
    await setValue(`${this.csrf}_${what}`, JSON.stringify(result))
    this.__builders[what](result)
    return result
  }

  log(level, ...msg) {
    let lvl;

    if (!msg) {
      msg = level
      level = "info"
    }

    switch (level) {
      case `debug`: { lvl = "DEBUG"; break }
      case `warning`, `warn`: { lvl = "WARN "; break }
      case `error`, `err`: { lvl = "ERROR"; break }
      case `info`: { lvl = "INFO"; break }
      default: { lvl = "info"; break }
    }

    console.log(`[GSU] [${lvl}] User:${this.name}`, ...msg)
  }
}

class Mod {
  constructor(name, fn) {
    this.activate = () => {
      if (this.limits.length <= 0) {
        this.log("debug", "Injecting ...")
        return fn(this)
      }

      let pageUri = getUri()

      for (const u in this.limits) {
        if (pageUri.startsWith(this.limits[u])) {
          this.log("debug", "Injecting ...")
          return fn(this)
        }
      }
    }

    this.user = Mod.user
    this.name = name
    this.limits = []
  }

  runsOn(str) {
    this.limits.push(str)
    return this
  }

  log(level, ...msg) {
    let lvl;

    if (!msg) {
      msg = level
      level = "info"
    }

    switch (level) {
      case `debug`: { lvl = "DEBUG"; break }
      case `warning`, `warn`: { lvl = "WARN "; break }
      case `error`, `err`: { lvl = "ERROR"; break }
      case `info`: { lvl = "INFO"; break }
      default: { lvl = "info"; break }
    }

    console.log(`[GSU] [${lvl}] ${this.name}`, ...msg)
  }


  static {
    this.mods = []
    this.add_mod = (name, fn) => {
      let _new = new this(name, fn)
      this.mods.push(_new)
      return _new
    }

    this.each = (fn) => {
      for (const m of this.mods) {
        fn(m)
      }
    }

    this.load_all = () => {
      this.each((m) => {
        m.activate()
      })
    }

    this.user = new UserInfo()

    let login_re = /^\/login\/logout\/([a-zA-Z0-9]+)\/?$/
    $("div#sidebar > p.navlink > a").each((i, e) => {
      let goto = getUri($(e).attr("href"))
      let userid = (login_re.exec(goto) ?? [])[1]
      if (!userid) return
      this.user.csrf = userid
    })

    let _u = $("div#user-info > span > a")
    this.user.uid = getUri(_u.attr("href")).replace("/profile/u/", "").replace("/", "")
    this.user.name = _u.text()

    this.user.active = false
    let _u_a = $("div#user-info")?.text()?.replace(/[\s]+/g, ";").split(";")
    if (_u_a) {
      _u_a.shift(); _u_a.pop()
      this.user.active = _u_a[7] || false
    }

    this.user.prefix = false
    let _u_img = $("div#user-info > span > img")
    if (_u_img) this.user.prefix = getUri(_u_img.attr("src"))

    let d = $("div#user-info-points").text().replace(/[\s]+/g, ";").split(";")
    this.user.mail = d[0] == "" ? 0 : parseSepInt(d[0])
    this.user.daimonds = parseSepInt(d[1])
    this.user.sugarstars = parseSepInt(d[2])
  }
}

Mod.user.addField("goatlings", {
  create: (data) => { data.each = (fn) => { for (g of this.__all) fn(g) } },
  update: (user_info) => {
    let selector = "div.mypets-pet"
    let view_re = /^\/mypets\/view\/([\d]+)\/?/
    let do_update = (e) => {
      let goatlings = { __all: [] }

      $(e).each((_, e) => {
        let goat_def = $(e).text()?.replace(/[\s]+/g, ";").split(";")
        goat_def.shift(); goat_def.pop()

        let pet_id = false
        $(e).find("a").each((_, a) => {
          if (pet_id) return
          let goto = getUri($(a).attr("href"))
          if (goto == "") return
          if (!view_re.test(goto)) return

          pet_id = view_re.exec(goto)?.[1]
        })

        let goat = {
          portait: getUri($(e).find("img").attr("src")),
          name: goat_def[0],
          level: parseSepInt(goat_def[2]),
          experience: goat_def[4],
          hp: goat_def[6],
          id: pet_id,
          str: parseSepInt(goat_def[8]),
          def: parseSepInt(goat_def[10]),
          int: parseSepInt(goat_def[12]),
          spd: parseSepInt(goat_def[14]),
          hunger: parseSepInt(goat_def[16].split("/")[0]),
          mood: parseSepInt(goat_def[18].split("/")[0]),
          wins: parseSepInt(goat_def[20]),
          losses: parseSepInt(goat_def[22])
        }

        goatlings[goat.name] = goat
        goatlings.__all.push(goat.name)
      })

      return goatlings
    }

    if (getUri() == "/mypets") return do_update($(selector))
    let result = null
    user_info.log("debug", "Performing AJAX update for /mypets ...")

    $.ajax({
      url: `${PAGE}/mypets`, async: false, success: (data) => {
        result = do_update($(data).find(selector))
      }
    })

    return result
  }
})

Mod.add_mod("update-pets", (m) => {
  let needs_update = false

  if (getUri() == "/mypets") needs_update = true

  if (getUri().startsWith("/battle/over")) {
    if (/The battle is over/.test($("div#content").text())) needs_update = true
  }

  if (getUri().startsWith("/inventory/view_action")) {
    $("div#content").each((_, e) => {
      if (needs_update) return
      let text = $(e).text()
      if (
        /Their [^\s]+ increased by/.test(text)
        || /has their hp healed/.test(text)
        || /Mood ([+-][\d]+)/.test(text)
      ) needs_update = true
    })
  }

  if (needs_update) m.user.update("goatlings")
})
  .runsOn("/mypets")
  .runsOn("/battle/over")
  .runsOn("/inventory/view_action")

Mod.add_mod("quickbar", async (m) => {
  let menu_clr = "#956E44"
  let edge_clr = "#AF8A61"
  let text_clr = "#F8F8C4"

  let glu_css_def = css(`
    #glu-quickbar {
      margin: 5px;
      padding: 5px;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #F56A91;
      position: relative;
      width: 771px;
      float: right;
      background: linear-gradient(to bottom, #F56A91 23%, white 23%);

      & b {
        color: #F56A91;
      }
    
      & hr {
        height: 1px;
        border: 0px;
        background-color: #F56A91;
      }
    
      & div.shoparea>a>img {
        height: 50px;
      }
    
      & div.sep {
        border-left: 1px solid #F56A91;
        padding-left: 15px;
      }
    
      & div.rsep {
        border-right: 1px solid #F56A91;
        padding-right: 15px;
      }
    
      & span.newevent {
        border-left: 1px solid white;
        padding-left: 5px;
        & a:link, a:visited, a:hover, a:active {
          color: white;
        }
      }

      & div.linkmenu {
        display: inline-block;
        vertical-align: top;
        margin: 5px;
        font-size: 1em;
        line-height: 1.1;

        & a:link, a:visited {
          color: #F56A91;
        }

        & a:hover, a:active {
          color: #FF80A4;
        }
      }

      & span.goattime {
        font-weight: bold;
        color: white;

        & a:link, a:visited, a:hover, a:active {
          color: white;
        }
      }

      & div.user-info {
        justify-content: middle;
        float: right;
        position: absolute;
        font-weight: bold;
        color: white;
    
        margin: 5px;
        top: 0;
        right: 0;
    
        & img {
          width: 12px;
        }

        & .sep {
          border-left: 1px solid white;
          padding-left: 5px;
        }
      
        & .rsep {
          border-right: 1px solid white;
          padding-right: 5px;
        }

        & a:link, a:visited, a:hover, a:active {
          color: white;
        }
      }
    }

    #glu-quickbar.loggedout {
      background: #F56A91;
      height: 1.2em;
      & div, hr { display: none; }
    }
  `)

  let user_pfx_element = ""
  let pfx = await m.user.prefix
  if (pfx) user_pfx_element = `<img src="${pfx}">`

  let goat_time = $("#user-info > span.small-text").text()
  $("#user-info > span.small-text").remove()

  let new_event = ""
  if ($("div#content > .event")[0]) {
    new_event = `<span class="newevent"><a href="/events">You have a new event!</a></>`
    $("div#content > .event")[0].remove()
  }

  let user_login_or_register = ""
  if (!await m.user.csrf) user_login_or_register = `- Welcome (<u><a href="/login/">Login</a></u> or <u><a href="/register/">Register</a></u>)`

  let glu_quickbar_obj =
    `<div id="glu-quickbar">
      <span class="goattime">${goat_time}${user_login_or_register}</span>
      
      ${new_event}
      <div class="user-info">
        <span>Welcome ${user_pfx_element}<a href="/profile/u/${m.user.uid}">${await m.user.name}</a></span>
        <span class="sep"><a href="/mail/index/">${await m.user.mail} <img src="${IMAGES.mail}"></a></span>
        <span class="sep"><a href="/cashshop">${await m.user.daimonds} <img src="${IMAGES.daimonds}"></a></span>
        <span class="sep"><a href="/bank">${await m.user.sugarstars} <img src="${IMAGES.sugarstars}"></a></span>
      </div>
      
      <hr>

      <div class="shoparea"><a href="/EventCalendar"><img title="Event Calendar" src="/images/shops/CommunityCenterEventCalendar.gif"></a><br><b>Calendar</b></div>
      <div class="shoparea sep"><a href="/shops/view/10"><img title="General Foods" src="/images/shops/GeneralFoods.gif"></a><br><b>General Foods</b></div>
      <div class="shoparea"><a href="/shops/view/1"><img title="Toy Shop" src="/images/shops/ToyShop.gif"></a><br><b>Toy Shop</b></div>

      <div class="shoparea"><a href="/shops/view/8"><img title="Battle Weapons" src="/images/shops/Armory.gif"></a><br><b>Weapons</b></div>
      <div class="shoparea"><a href="/shops/view/26"><img title="Battle Pets" src="/images/shops/BattlePets.gif"></a><br><b>Battle Pets</b></div>
      <div class="shoparea"><a href="/shops/view/17"><img title="Battle Defense" src="/images/shops/battledefence.gif"></a><br><b>Defense</b></div>
      <div class="shoparea"><a href="/shops/view/7"><img title="Remedies And Elixirs" src="/images/shops/RemediesAndElixirs.gif"></a><br><b>Remedies</b></div>

      <div class="shoparea"><a href="/GivingTree"><img title="Giving Tree" src="/images/shops/GivingTree.gif"></a></a><br><b>Giving Tree</b></div>
      <div class="shoparea rsep"><a href="/pawn"><img title="Pawn Shop" src="/images/shops/pawnshop.gif"></a></a><br><b>Pawn Shop</b></div>

      <div class="linkmenu">
        <a href="/townmap/">Town Map</a><br>
        <a href="/buddies">My Buddies</a><br>
        <a href="/inventory">My Items</a><br>
        <a href="/settings">My Settings</a><br>
        <a href="/login/logout/${m.user.csrf}">Logout</a><br>
      </div>
    </div>`

  $("<style>").prop("type", "text/css").html(glu_css_def).appendTo("head")

  $("#header").after(glu_quickbar_obj)
  if (! await m.user.csrf) $("div#glu-quickbar").addClass("loggedout")
  $("#user-info-wrap, #user-info > br, #user-info, #user-info-points").remove()
})

{
  const getStatClass = (cur, max) => {
    cur = cur ?? 0
    max = max ?? 100
    let ratio = cur / max

    if (ratio >= .5) return "normal"
    if (ratio <= .25) return "peril"
    return "danger"
  }

  Mod.add_mod("content", async (m) => {
    const content_css = css(`
      div#wrapper {
        background: none;

        & div#content {
          border: 1px solid #F56A91;
          margin-right: 0px;
          width: 760px;
          float: left;
        }
      }
    `)

    $("<style>").prop("type", "text/css").html(content_css).appendTo("head")
  })

  Mod.add_mod("my-pets-header", async (m) => {
    if (! await m.user.csrf) return
    let header_css = css(`
      div#header > div#active_pet_image {
          right: 100px;
      }
      
      div#header > div.active_pet_stats {
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          margin: 5px;
          padding: 3px;
          padding-top: 0px;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #F56A91;
          background: linear-gradient(to bottom, #F56A91 16%, white 16%);
          
          & b {
              color: #F56A91;
          }
          
          & hr {
              height: 1px;
              border: 0px;
              background-color: #956E44;
          }

          & span { float:right; }

          & span.peril {
            color: red;
            font-weight: bold;
          }

          & span.danger {
            color: orange;
            font-weight: bold;
          }

          & .stat-header {
            line-height: 1.5;
            color: white;
            font-weight: bold;
          }
      }
      
      div#header > div.active_exp_bar {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 106px;
          height: 5px;
          margin: 3px;
          margin-right: 5px;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #F56A91;
      }
    `)

    if (await m.user.active) {
      let active = (await m.user.fetch("goatlings"))[await m.user.active]
      let hp = active.hp.split("/")
      let exp = active.experience.split("/")
      let ratio = (exp[0] / exp[1]) * 100
      $("div#header > div#active_pet_image > img")
        .wrap(`<a href="/mypets"></a>`)
        .parent()
        .parent()
        .after(`
          <div class="active_pet_stats">
            <div class="stat-header">Level:  <span>${active.level}</span><br></div>
            <b>Hp</b>:     <span class="${getStatClass(hp[0], hp[1])}">${active.hp}</span><br>
            <b>Hunger</b>: <span class="${getStatClass(active.hunger)}">${active.hunger}/100</span><br>
            <b>Mood</b>:   <span class="${getStatClass(active.mood)}">${active.mood}/100</span><br><hr>
            <b>Wins</b>:   <span >${active.wins}</span><br>
            <b>Loss</b>:   <span >${active.losses}</span><br>
          </div>
          <div class="active_exp_bar" style="background: linear-gradient(to right, pink ${ratio}%, white ${ratio}%)"></div>`
        )
    }

    $("<style>").prop("type", "text/css").html(header_css).appendTo("head")
  })
}

Mod.add_mod("sidebar", async () => {
  const sidebar_css = css(`
    div#sidebar {
      background-color: white;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #F56A91;
      position: relative;
      margin: 5px;
      width: 125px;
      & form {
        margin: 0;
      }
    }
  `)


  $("div#sidebar > p.navlink > a").each((_, e) => {
    let goto = getUri($(e).attr("href"))
    switch (goto) {
      case `/townmap`:
      case `/townmap/`: {
        $(e).parent().remove()
        break;
      }
      case goto.match(/^\/login\/logout/)?.input: {
        $(e).parent().remove()
        break;
      }
    }
  })

  $("<style>").prop("type", "text/css").html(sidebar_css).appendTo("head")
})

let bargain_mod = Mod.add_mod("bargain-hint", (m) => {
  let text = $("#content > center").text()
  if (!text || /This item is sold out/i.test(text)) return
  let price = parseInt((/To purchase this item, enter a price close to ([\d,]+) Sugar Stars/.exec(text)[1] ?? "0").replace(",", ""))
  if (price == 0) return
  let hint = `<div margin="5px">Haggle price: <b>${price * 0.80}</b></div><br>`

  $("#content > center > form").before(hint)
})

bargain_mod.runsOn("/shops/viewa")

$(async () => { Mod.load_all() })