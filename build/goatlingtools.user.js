// ==UserScript==
// @name        Goatling Tools
// @namespace   goatling.tools
// @description Various tweaks to Goatlings.com
// @match       https://goatlings.com/*
// @match       https://www.goatlings.com/*
// @require     https://code.jquery.com/jquery-3.7.1.min.js
// @downloadURL https://raw.githubusercontent.com/SleebyRhea/goat-tools/refs/heads/main/build/goatlingtools.user.js
// @updateURL   https://raw.githubusercontent.com/SleebyRhea/goat-tools/refs/heads/main/build/goatlingtools.user.js
// @license     bsd-3-clause
// @version     1.2.1
// ==/UserScript==
/**
 *
 * About
 *  This userscript makes a series of tweaks to the https://goatlings.com website
 *  to make it a smidgeon more pleasing to my eye. Included as well are severeal
 *  QoL changes:
 *
 *  - Shows the currently active goat on the upper righthand side of the bar
 *  - Adds a navigation bar to the top of the screen with configurable colors
 *  - Saves whether or not you have items stacked or unstacked across loads
 *  - Shows a calculated haggling price
 *
 * A Note to the developers of Goatlings
 *  Should you find any - or all - of these features objectionable, I am more
 *  than willing to make edits as desired. I've done my best to keep this as
 *  ToS friendly as possible (including limiting extra calls to your site for
 *  pulling character data), but I fully understand if you take issue with
 *  it regardless. I make this in my spare time, and for my own amusement.
 *
 * Changelog
 *  v1.2.1
 *    Fix some bugs from v1.2.0
 *      - Fix goatling parsing error (remove specific index dependency)
 *      - Fix handling for saving goats
 *      - Fix case wherein scripts and css will not be applied until you
 *        have refreshed a sufficient number of times for the mods localstorage
 *        datastructures to be created / saved. This was happening due to
 *        needing to pull the tab information, and having async:true set in
 *        said ajax request.
 *
 *  v1.2.0
 *    Update User with the ability to parse goatling tabs
 *      - Added updateGoatlingTabs and updateGoatlingTabsActual
 *      - Tabs are now saved in localstorage and loaded on startup
 *      - updateGoatlings by default runs updateGoatlingTabs
 *      - updateGoatlings now takes optional arguments:
 *        * skipTabs: skip updating goatling tabs, unless necessary
 *        * whichTab: select which goatling tab to update
 *    Fix updateGoatlingsActual to work with recent changes to /mypets
 *    Added some more documentation comments
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const RES = {
    image: {
        mail: "/images/layout/mail3.gif",
        sugarstars: "/images/layout/SS2.gif",
    },
};
/**
 * The original DD2.gif file - $site/images/layout/DD2.gif - contains no alpha
 * channel. This blob is simply a version of that image that includes one.
 */
RES.image.dd3 =
    "data:image/gif;base64, R0lGODlhFAAUAMZ6AP7//wDm9v79zf/8zLTy////zQLl9v/+zf/9/v/+0Lbx/wLl+ADl+P7+zP/+//7" +
        "8y//8/wPk9gLk9AHk9wHk9QPm97j0/7Pz//7//f/9zgLk+rjy///+y//9ygXj+rTy/QHn9///zAHm+f/8zwPl9QDk9//+/P7+/P//0/3/zgDl+gDn9" +
        "QDm9bjw/f3//Pz/zrfx/P//zwPk+v///f7+/rHz/wDk+f7+//3+0v/8zbL1/gXk9QDn+QDm8gDm+Lfx/bfz+7jx/Lby/ATl+f79ywDm9ATi9//7zf7" +
        "/z///zv780//+0v3+/7fz/gHj+QDn+7by+gDl97Pz/f//y7T0///7y//90vz9///9/7Px/v/7z7Xz/wDl9bL1+wHn9rXz/v//0f3/+gLj9bT0/v7/0" +
        "f3/zf3//rX1/gDm8wPl8///+/79////+v7+yrXw/v/+z/78zADj87fy/wLi+7Ly/gDl/P/9zQPm+f/90P/+zv/////9zP///////////////yH/C05" +
        "FVFNDQVBFMi4wAwEAAAAh/hFDcmVhdGVkIHdpdGggR0lNUAAh+QQJMgB/ACwAAAAAFAAUAEAH2oB/goOEhYJ3hAEtQCASBB8wOgoEFiUMdBsahIiDA" +
        "XoIeiqGo6SDnIkwNSsuWBAALhJfXROlpXd3ELeDTqAYJgYKW1kMDg4zax6EFQRyZxQAn3oOJxglQlJuC5uHH3EnAABiGxG1hRTlhAS1p6Pqo+yCFTZ" +
        "RXHdPEiILczxFIIUTCmQw0ePjB5UgTS6gQQCAAhRNgiKoCJDGwwoSMgyQGMKCAYMddbQNMkBAAYsbNNTQCKNHz4ILFgyMEjEmgoMrbEwAqNAigCFcn" +
        "LwY0WNmhgGf6AT1AEArqdNAACH5BAkyAH8ALAEAAAATABIAQAfQgH+Cg4SFhQEtQCASBB8wOgoEFiUMdBsahoIBegh6KoJ3EHeDo5mmhAEwNSsuWBA" +
        "ALhJfXROEpaemTp0YJgYKW1kMDg4zax6DFQRyZxQAnHoOJxglQlJuC4MEoB9xJwAAYhsRuOSkouWZFTZRXHdPEiILczxFIIQTCjJMej4/VEFNLqBBA" +
        "IACFEx/IqgIkMbDChIyDJAYwoIBgx11sAkyQEABixs01NAIo0fPggsWDBgSMSaCgytsTACo0CIALi9G9JiZYcDmn1umegCoRWpQIAA";
/**
 * Goatling Tools Save animation on /settings
 */
RES.image.save =
    "data:image/gif;base64, R0lGODdhFAAUAHcAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAAFAAUAIMAAAAiIDQeUD" +
        "w3lG5bbuFjm/+Pj4/AwMD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAEb1BIc6q9RoANxBjUVQXBYQza5oHiWJ6o+oUiaX7pSl82nM+tQw8nYwUrvqJh" +
        "yWwuiZ2PdDolWH/U7IBQIGC1HytXHEWYz2huYd0tO53qdhlNN49/iPebEJvX630eeXpNCIEDf3+HYFopHRKQkZKOEQAh+QQJCgAAACwAAAAAFAAUAI" +
        "MAAAAiIDQeUDw3lG5bbuFjm/+Pj4/AwMD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAEalBIc6q9RoANxBjUVQXBYQza5oHiWJ6o+oUiaX7pSl82nM+t" +
        "Qw8nYwUrvqJhyWwuiZ2PdEqFrqrYWDQ7JXh/iLB4HCYUCGBn02tmR8lkc2F+fqvXdIIMDm+n72taHnx8glxYKR0Si4yNiREAIfkECQoAAAAsAAAAAB" +
        "QAFACDAAAAIiA0HlA8N5RuW27hY5v/j4+PwMDA////AAAAAAAAAAAAAAAAAAAAAAAAAAAABG1QSHOqvUaADcQY1FUFwWEM2uaB4lieqPqFIml+6Upf" +
        "NpzPrUMPJ2MFK76iYclsLomdj3RKha6q2Fg0i/0hvuBwWOtBOM+EtFfMJhQI3jMz7aZH2WF3Yf++y+d8BDJ4YnU/XFMEWh0SjY6PKQARACH5BAUKAA" +
        "AALAAAAAAUABQAgwAAACIgNB5QPDeUbltu4WOb/4+Pj8DAwP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAARqUEhzqr1GgA3EGNRVBcFhDNrmgeJYnqj6" +
        "hSJpfulKXzacz61DDydjBSu+omHJbC6JnY90SoWuqthYNDsleH+IsHgcJhQIYGfTa2ZHyWRzYX5+q9d0ggwOb6fva1oefHyCXFgpHRKLjI2JEQA7";
/**
 * Stacked items icon
*/
RES.image.stacked =
    "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANlJREFUSIl" +
        "jZEACaZaG/xmoBGYdP8/IwMDAwIJu+OMPn6llBwOKBciGb7uyniJDGZl1GbFawMDAwNCyqInh3LnLZBtubBrFiMzHsMDISJdswxkYGBj+/738H68Pv" +
        "HQCGVoWNZFtAboP4BxqR/L263cYUSxAtoQaAJZMMXxATcNRLPDUVKGKBbICvCiWoATR/7+XKbLESycQbglWCxgYGBjOnl5GkSU1cXUoFqAkU0p9gA2" +
        "gWMDIrMtIiQ9q4uowxGgeySzoEtQAWJMpA8NofYAAo/UBXjD86gMAmXlwBoegD/UAAAAASUVORK5CYII=";
/**
 * Unstacked items icon
*/
RES.image.unstacked =
    "data:image/gif;base64, iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUpJREFUS" +
        "IntlT1ug0AQhWdtt0hcgC5NJCigQ/IFQscFXOIuh7Dc5QR2SZHWnXOBSC4srwsspUnHBZCoo0310ODsxPwocpOvWRh239vZn4Hon3ujsjg0ZVXT28e" +
        "n4h+eHh+M5zq0PZyVNBhkcWhs8e3hrGZ4MV+FUdNAoe06Q4iXVd2Ke65DWRyaCQ+ejq+Gt12B+P6yo3W+asUm4qieQBhGYGbr3AVp3a8ZZICDATzXE" +
        "fv2XiKIY733lx2VVU2b55fxBlxc64KiKKDlfNGYLOeL4QY2cTUN1OY9p8RPxUw6GUjivI/WhTWTmwZc3AaWCMAEG3/TgItLs5cyIWK1COlLp2EIZVW" +
        "37wHEr+vKUDzX+XnReF0ZQ+KnRCTc5HW+Iq2LweJRFDTPVgPeYSyNQeKnzdFK/LRVHfvCJ6j4DwMGf7LJvCL+Vh378g38zcYi1It/3wAAAABJRU5Er" +
        "kJggg==";
const PAGE = "https://www.goatlings.com";
/**
 * Return the URI portion of a page url
 * @param string page URL to parse
 * @returns string
 */
const getUri = (page = window.location.href) => {
    return page.replace(/^https?:\/\/(?:www\.)?goatlings\.com\/?/, "/");
};
/**
 * Parse a string into an int, removing the given seperator
 * @param toInt
 * @returns int
 */
const parseSepInt = (toInt = "0", sep = ",") => {
    return parseInt(toInt.replace(sep, ""));
};
/**
 * Run a function only if the current page URI section matches the given string(s)
 * @param fn Function to run
 * @param uri URI endings that this function will be run on
 */
const onlyOn = (fn, ...uri) => {
    if (uri.length <= 0)
        return fn();
    const pageUri = getUri();
    for (const u of uri) {
        if (u == pageUri || `${u}/` == pageUri)
            return fn();
    }
};
class Logger {
    constructor(repr) {
        this.__repr = repr;
    }
    log(level, ...msg) {
        let loglevel = Number(Settings.get("logLevel"));
        loglevel = isNaN(loglevel) ? 1 : loglevel;
        if (level <= loglevel)
            console.log(`[GoatTools:${_a.LOG_REPR[level]}] ${this.__repr()} `, ...msg);
    }
    logInfo(...msg) {
        return this.log(_a.LOG_INFO, ...msg);
    }
    logWarn(...msg) {
        return this.log(_a.LOG_WARNING, ...msg);
    }
    logError(...msg) {
        return this.log(_a.LOG_ERROR, ...msg);
    }
    logDebug(...msg) {
        return this.log(_a.LOG_DEBUG, ...msg);
    }
    logVerbose(...msg) {
        return this.log(_a.LOG_VERBOSE, ...msg);
    }
}
_a = Logger;
Logger.LOG_ERROR = 0;
Logger.LOG_WARNING = 1;
Logger.LOG_INFO = 2;
Logger.LOG_VERBOSE = 3;
Logger.LOG_DEBUG = 4;
Logger.LOG_REPR = {
    [this.LOG_ERROR]: "ERROR",
    [this.LOG_WARNING]: "WARN ",
    [this.LOG_INFO]: "INFO ",
    [this.LOG_VERBOSE]: "VERB ",
    [this.LOG_DEBUG]: "DEBUG",
};
class Script {
    /**
     * Adds a function to list of functions that will be injected into the DOM
     * @param name Name of function to be injected
     * @param fn Function to be injected
     */
    static add(name, fn) {
        if (this.allScripts[name])
            return;
        this.allScripts[name] = fn.toString();
    }
    /**
     * Injects functions added by Script.add to the pages DOM
     *
     * This method is used to enable an easier method for using functions
     * by injected HTML elements.
     */
    static inject() {
        for (const s in this.allScripts) {
            $("<script>")
                .prop("type", "text/javascript")
                .html(`
          var ${s}Actual = ${this.allScripts[s]}
          var ${s} = (...args) => {
            try {
              return ${s}Actual(...args)
            }

            catch (e) {
              console.log(e)
            }

            return false
          }
        `)
                .appendTo("head");
        }
    }
}
Script.allScripts = {};
class Style {
    /**
     * Add a CSS sheet to be injected into the DOM when inject is called
     * @param css
     */
    static add(css) {
        this.allStyles.push(css.replaceAll(/(?:\r\n|\r|\n)/g, " "));
    }
    static get(property) {
        var _b;
        return (_b = this.settings[property]) !== null && _b !== void 0 ? _b : "black";
    }
    /**
     * Load style settings from localstorage and a given object; with the settings
     * in localstorage taking priority
     * @param defaultSet
     */
    static load(defaultSet = {}) {
        var _b, _c;
        const loadedStyle = JSON.parse((_b = localStorage.getItem(`gt_style`)) !== null && _b !== void 0 ? _b : "{}");
        const wantedStyle = Object.assign(Object.assign({}, defaultSet), loadedStyle);
        for (const key in wantedStyle) {
            this.settings[key] = (_c = wantedStyle[key]) !== null && _c !== void 0 ? _c : this.settings[key];
        }
        localStorage.setItem("gt_style", JSON.stringify(this.settings));
    }
    /**
     * Inject loaded styles into the DOMs <head> element
     */
    static inject() {
        $("<style>")
            .prop("type", "text/css")
            .html(this.allStyles
            .join(" ")
            .replaceAll(/%CLR_BACKGROUND/g, this.settings.background)
            .replaceAll(/%CLR_PRIMARY/g, this.settings.primary)
            .replaceAll(/%CLR_ACCENT/g, this.settings.accent))
            .appendTo("head");
    }
    static set background(color) {
        this.settings.background = color;
    }
    static set primary(color) {
        this.settings.primary = color;
    }
    static set accent(color) {
        this.settings.accent = color;
    }
}
Style.allStyles = [];
Style.whitelist = ["background", "primary", "accent"];
Style.settings = {
    background: "#FFFFFF",
    primary: "black",
    accent: "grey",
};
class Settings {
    static get(property) {
        var _b;
        return (_b = this.settings[property]) !== null && _b !== void 0 ? _b : false;
    }
    static set(property, what) {
        this.settings[property] = what;
        localStorage.setItem("gt_settings", JSON.stringify(this.settings));
    }
    static load(defaultSet = {}) {
        var _b, _c;
        const loadedSettings = JSON.parse((_b = localStorage.getItem(`gt_settings`)) !== null && _b !== void 0 ? _b : "{}");
        const wantedSettings = Object.assign(Object.assign({}, defaultSet), loadedSettings);
        for (const key in wantedSettings) {
            this.settings[key] = (_c = wantedSettings[key]) !== null && _c !== void 0 ? _c : this.settings[key];
        }
        localStorage.setItem("gt_settings", JSON.stringify(this.settings));
    }
}
Settings.whitelist = ["itemsStacked", "logLevel"];
Settings.settings = {
    itemsStacked: false,
};
/**
 *
 * @param key Setting to update
 * @param value Value to update the setting to
 * @returns boolean
 */
const gtUpdateSetting = (key, value) => {
    var _b;
    if (["itemsStacked", "logLevel"].indexOf(key) < 0) {
        // TODO setup static loggign
        // console.log(
        //   "[GoatTools:WARN ] Setting[] Attempt to save invalid key to settings"
        // );
        return false;
    }
    let didUpdate = false;
    const setting = JSON.parse((_b = localStorage.getItem("gt_settings")) !== null && _b !== void 0 ? _b : "{}");
    if (setting[key] != value) {
        didUpdate = true;
        if (value === "") {
            delete setting[key];
        }
        else {
            setting[key] = value;
        }
    }
    localStorage.setItem("gt_settings", JSON.stringify(setting));
    return didUpdate;
};
/**
 *
 * @param key Color key to update
 * @param value Value to update the color to
 * @returns boolean
 */
const gtUpdateStyle = (key, value) => {
    var _b;
    if (["background", "accent", "primary"].indexOf(key) < 0)
        return false;
    let didUpdate = false;
    const style = JSON.parse((_b = localStorage.getItem("gt_style")) !== null && _b !== void 0 ? _b : "{}");
    if (style[key] != value) {
        didUpdate = true;
        if (value === "") {
            delete style[key];
        }
        else {
            style[key] = value;
        }
    }
    localStorage.setItem("gt_style", JSON.stringify(style));
    return didUpdate;
};
/**
 * Represents a logged in user object
 */
class User extends Logger {
    constructor(uuid, name) {
        var _b, _c;
        super(() => {
            return this.name ? `User[${String(this.name)}]` : "User[GuestUser]";
        });
        this.uuid = uuid;
        this.name = name;
        this.__tabs = JSON.parse((_b = localStorage.getItem(`${this.uuid}_tabs`)) !== null && _b !== void 0 ? _b : "[]");
        this.__goatlings = JSON.parse((_c = localStorage.getItem(`${this.uuid}_goatlings`)) !== null && _c !== void 0 ? _c : "{}");
    }
    fetchGoatlings() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.__goatlings;
        });
    }
    /**
     * Parse goatling objects from the given JQuery object
     * @param mystuff div.mystuff objects retrieved from JQuery
     */
    updateGoatlingsActual(mystuff) {
        const goatlings = {};
        const name_re = /^\/mypets\/change_name\/([\d]+)\/?/;
        $(mystuff).each((_, e) => {
            var _b;
            let pet_id = "";
            const goat_def = (_b = $(e).text()) === null || _b === void 0 ? void 0 : _b.replace(/[\s]+/g, ";").split(";");
            goat_def.shift();
            goat_def.pop();
            if (goat_def.length <= 4)
                return;
            this.logDebug("On goat:", goat_def);
            $(e)
                .find("ul > li > a")
                .each((_, a) => {
                var _b, _c;
                if (pet_id != "")
                    return;
                let goto = getUri($(a).attr("href"));
                if (goto == "")
                    return;
                pet_id = (_c = (_b = name_re.exec(goto)) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : "";
            });
            const goat = {
                id: pet_id,
                name: goat_def[0],
                portait: getUri($(e).find("img").attr("src")),
                level: -1,
                current_exp: -1,
                max_exp: -1,
                current_hp: -1,
                max_hp: -1,
                str: -1,
                def: -1,
                int: -1,
                spd: -1,
                hunger: -1,
                mood: -1,
                wins: -1,
                losses: -1,
            };
            goat_def.forEach((what, i) => {
                var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                switch (what.toLowerCase()) {
                    case "level":
                    case "level:": {
                        goat.level = parseSepInt(goat_def[i + 1]);
                    }
                    case "exp":
                    case "exp:": {
                        const exp = (_b = goat_def[i + 1].split("/")) !== null && _b !== void 0 ? _b : [];
                        goat.max_exp = parseSepInt((_c = exp[1]) !== null && _c !== void 0 ? _c : "-1");
                        goat.current_exp = parseSepInt((_d = exp[0]) !== null && _d !== void 0 ? _d : "-1");
                    }
                    case "hp":
                    case "hp:": {
                        const hp = (_e = goat_def[i + 1].split("/")) !== null && _e !== void 0 ? _e : [];
                        goat.max_hp = parseSepInt((_f = hp[1]) !== null && _f !== void 0 ? _f : "-1");
                        goat.current_hp = parseSepInt((_g = hp[0]) !== null && _g !== void 0 ? _g : "-1");
                    }
                    case "strength":
                    case "strength:": {
                        goat.str = parseSepInt(goat_def[i + 1]);
                    }
                    case "defense":
                    case "defense:": {
                        goat.def = parseSepInt(goat_def[i + 1]);
                    }
                    case "intelligence":
                    case "intelligence:": {
                        goat.int = parseSepInt(goat_def[i + 1]);
                    }
                    case "speed":
                    case "speed:": {
                        goat.spd = parseSepInt(goat_def[i + 1]);
                    }
                    case "hunger":
                    case "hunger:": {
                        goat.hunger = parseSepInt((_j = (_h = goat_def[i + 1].split("/")) === null || _h === void 0 ? void 0 : _h[0]) !== null && _j !== void 0 ? _j : "-1");
                    }
                    case "mood":
                    case "mood:": {
                        goat.mood = parseSepInt((_l = (_k = goat_def[i + 1].split("/")) === null || _k === void 0 ? void 0 : _k[0]) !== null && _l !== void 0 ? _l : "-1");
                    }
                    case "wins":
                    case "wins:": {
                        goat.wins = parseSepInt(goat_def[i + 1]);
                    }
                    case "losses":
                    case "losses:": {
                        goat.losses = parseSepInt(goat_def[i + 1]);
                    }
                }
            });
            this.logDebug("Parsed goat: ", goat);
            goatlings[goat.name] = goat;
        });
        return goatlings;
    }
    updateGoatlingTabsActual(tabs) {
        this.__tabs = [];
        $(tabs).find("div.pv-cat > p > a").each((_, e) => {
            var _b, _c;
            // If there's an img present, then the name is not present
            if ($(e).find("img").length > 0)
                return;
            // Parse the Tab ID from the link URL
            let uri = getUri($(e).attr("href"));
            let found = (_b = /\/manage\/(\d+)/.exec(uri)) !== null && _b !== void 0 ? _b : [];
            let tid = parseInt((_c = found[1]) !== null && _c !== void 0 ? _c : "");
            // Filter out non-tab URLs
            if (!found[1] || Number.isNaN(tid))
                return;
            let tab = {
                id: tid,
                name: $(e).text()
            };
            this.__tabs.push(tab);
        });
    }
    /**
     *
     */
    updateGoatlingTabs() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logInfo("Updating goatling tabs ...");
            if (getUri() == "/MyGoatlings") {
                this.updateGoatlingTabsActual($("div#wrapper > div#content > form"));
            }
            else {
                $.ajax({
                    url: `${PAGE}/MyGoatlings`,
                    async: false,
                    success: (data) => {
                        this.updateGoatlingTabsActual($(data).find("div"));
                    },
                });
            }
            localStorage.setItem(`${this.uuid}_tabs`, JSON.stringify(this.__tabs));
            this.logDebug("updateGoatlingTabs() Finished update");
        });
    }
    /**
     * Update a users registered Goatlings
     * @param skipTabs Skip updating tabs when updating goatlings
     * @param whichTab Update goatlings from a specific tab
     */
    updateGoatlings() {
        return __awaiter(this, arguments, void 0, function* (skipTabs = false, whichTab = -1) {
            if (!skipTabs)
                this.updateGoatlingTabs();
            this.logDebug(this);
            if (typeof this.__tabs === "undefined")
                this.updateGoatlingTabs();
            let tabJobs = this.__tabs;
            if (whichTab > -1) {
                tabJobs = this.__tabs.filter((t) => t.id === whichTab);
            }
            this.logDebug("Fetching goatlings from tabs:", tabJobs, this.__tabs);
            this.logInfo("Updating goatlings ...");
            let new_goats = {};
            for (var tab of tabJobs) {
                if (getUri() == `/MyGoatlings/manage/${tab.id}`) {
                    new_goats = Object.assign(Object.assign({}, this.updateGoatlingsActual($("div.mystuff"))), new_goats);
                    this.logDebug("updateGoatlings() Finished update");
                }
                else {
                    $.ajax({
                        url: `${PAGE}/MyGoatlings/manage/${tab.id}`,
                        async: false,
                        success: (data) => {
                            new_goats = Object.assign(Object.assign({}, this.updateGoatlingsActual($(data).find("div.mystuff"))), new_goats);
                        },
                    });
                }
            }
            this.__goatlings = new_goats;
            localStorage.setItem(`${this.uuid}_goatlings`, JSON.stringify(this.__goatlings));
            localStorage.setItem(`${this.uuid}_goatlings_last_update`, `${Math.floor(Date.now() / 1000)}`);
            this.logDebug("updateGoatlings() Finished update");
        });
    }
    /**
     * Determine whether or not the last user update has expired for a given field
     */
    checkNeedsUpdate(what) {
        return __awaiter(this, void 0, void 0, function* () {
            var _b;
            if (!this.__goatlings || Object.keys(this.__goatlings).length < 1)
                return true;
            if (!this.__tabs || this.__tabs.length < 1)
                return true;
            let now = Math.floor(Date.now() / 1000);
            let last = Math.floor(parseSepInt((_b = localStorage.getItem(`${this.uuid}_${what}_last_update`)) !== null && _b !== void 0 ? _b : "0"));
            if (now - last >= User.UPDATE_WAIT_TIME)
                return true;
            return false;
        });
    }
    doUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logInfo("Update triggered ...");
            if (!this.name)
                return;
            if (yield this.checkNeedsUpdate("goatlings"))
                this.updateGoatlings();
        });
    }
}
User.UPDATE_WAIT_TIME = 60 * 60 * 1;
/**
 * Represents a mod that this userscript is injecting
 */
class Mod extends Logger {
    get user() {
        return Mod.user;
    }
    constructor(name) {
        super(() => {
            return `Mod[${name}]`;
        });
        this.name = "";
        /**Acceptable URIs - or URI matches - that this may run on */
        this.runsOn = [];
        this.name = name;
        this.enabled = true;
        this.onActivate = () => __awaiter(this, void 0, void 0, function* () {
            return true;
        });
        this.onPreload = () => {
            return true;
        };
    }
    /**
     * Activates the main body of the mod
     *
     * Only permits running the mod if it's enable and the current page is one that
     * this mod is permitted to run on
     */
    activate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.enabled)
                return this.logDebug("Not enabled, skipping");
            const pageUri = getUri();
            if (this.runsOn.length > 0) {
                let canRun = false;
                for (const uri of this.runsOn) {
                    if (uri instanceof RegExp) {
                        if (!uri.test(pageUri))
                            continue;
                        canRun = true;
                        break;
                    }
                    if (typeof uri === "string") {
                        if (!pageUri.startsWith(uri))
                            continue;
                        canRun = true;
                        break;
                    }
                }
                if (!canRun)
                    return this.logDebug("Can't run on this page");
            }
            if (!(yield this.onActivate(this)))
                this.logDebug("Didn't activate");
        });
    }
    /**
     * Run a given function against each mod
     */
    static each(fn) {
        for (const cls of this.__all)
            fn(cls);
    }
    /**
     * Create a new mod, and add it to the list of mods
     * @param name Name of the mod
     * @param init Initialization function
     */
    static create(name, init) {
        const m = new Mod(name);
        init(m);
        this.__all.push(m);
        let canRun = true;
        if (m.runsOn.length > 0) {
            canRun = false;
            const pageUri = getUri();
            for (const uri of m.runsOn) {
                if (uri instanceof RegExp) {
                    if (!uri.test(pageUri))
                        continue;
                    canRun = true;
                    break;
                }
                if (typeof uri === "string") {
                    if (!pageUri.startsWith(uri))
                        continue;
                    canRun = true;
                    break;
                }
            }
        }
        if (canRun) {
            m.logDebug("Running onPreload hook ...");
            m.onPreload(m);
        }
        return m;
    }
    /**
     * Activate all mods
     */
    static activateAll() {
        Mod.each((mod) => {
            mod.activate();
        });
    }
}
Mod.__all = [];
Mod.user = null;
Style.add(/*css*/ `
  .gt-header {
    background: %CLR_PRIMARY;
    color: %CLR_BACKGROUND;
    float: right;
    width: 772px;
    margin-left: 5;
    margin-right: 5;
    margin-bottom: 0;
    padding: 5px;
    font-weight: bold;
    border-radius: 4px 4px 0px 0px;
    display: flex;
    
    & hr {
      width: 1;
      border-left: 1px solid %CLR_BACKGROUND;
      height: 100%;
    }
    
    & .header-option:hover {
      cursor: pointer;
    }

    & .selected {
      text-decoration: underline;
    }
  }
`);
// Shows the lowest haggle-able price for a shop object
Mod.create("hagglePrice", (mod) => {
    mod.runsOn = ["/shops/viewa"];
    mod.onPreload = () => {
        Style.add(`.gt-haggle-price { margin: 5px }`);
    };
    mod.onActivate = () => __awaiter(this, void 0, void 0, function* () {
        let text = $("#content > center").text();
        if (!text || /This item is sold out/i.test(text))
            return false;
        let priceText = /To purchase this item, enter a price close to ([\d,]+) Sugar Stars/.exec(text);
        if (!priceText)
            return false;
        let price = parseSepInt(priceText[1].replace(",", ""));
        if (price == 0)
            return false;
        $("#content > center > form").before(`
      <div class="gt-haggle-price">Haggle price: <b>${price * 0.8}</b></div><br>
    `);
        return true;
    });
});
// Overhauls the sidebar placement
Mod.create("sidebarOverhaul", (mod) => __awaiter(this, void 0, void 0, function* () {
    mod.onPreload = () => {
        Style.add(/*css*/ `
      div#sidebar {
        background-color: %CLR_BACKGROUND;
        border: 1px solid %CLR_PRIMARY;
        border-radius: 4px 4px 4px 4px;
        position: relative;
        width: 125px;
        margin: 5px;
        & form {
          margin: 0;
        }
      }
    `);
    };
    mod.onActivate = () => __awaiter(this, void 0, void 0, function* () {
        $("div#sidebar > p.navlink > a").each((_, e) => {
            var _b;
            let goto = getUri($(e).attr("href"));
            switch (goto) {
                case `/townmap`:
                case `/townmap/`: {
                    $(e).parent().remove();
                    break;
                }
                case (_b = goto.match(/^\/login\/logout/)) === null || _b === void 0 ? void 0 : _b.input: {
                    $(e).parent().remove();
                    break;
                }
            }
        });
        return true;
    });
}));
Mod.create("pageUpdates", (mod) => {
    mod.runsOn = [
        "/MyGoatlings",
        "/MyGoatlings/manage",
        "/battle/over",
        "/inventory/view_action",
    ];
    mod.onActivate = () => __awaiter(this, void 0, void 0, function* () {
        var _b, _c, _d, _e;
        let doUpdate = false;
        const uri = getUri();
        let skipTabs = false;
        let whichTab = -1;
        switch (true) {
            case uri.startsWith("/MyGoatlings/manage"): {
                whichTab = parseInt((_c = (_b = /^\/MyGoatlings\/manage\/([0-9]+)/.exec(uri)) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : "-1");
                if (whichTab > -1) {
                    skipTabs = true;
                    doUpdate = true;
                }
                break;
            }
            case uri == "/MyGoatlings": {
                (_d = mod.user) === null || _d === void 0 ? void 0 : _d.updateGoatlingTabs();
                break;
            }
            case uri.startsWith("/battle/over"): {
                if (/The battle is over/.test($("div#content").text()))
                    doUpdate = true;
                break;
            }
            case uri.startsWith("/inventory/view_action"): {
                $("div#content").each((_, e) => {
                    if (doUpdate)
                        return;
                    let text = $(e).text();
                    if (/Their [^\s]+ increased by/.test(text) ||
                        /has their hp healed/.test(text) ||
                        /Mood ([+-][\d]+)/.test(text))
                        doUpdate = true;
                });
                break;
            }
            default: {
                return false;
            }
        }
        if (doUpdate)
            (_e = mod.user) === null || _e === void 0 ? void 0 : _e.updateGoatlings(skipTabs, whichTab);
        return true;
    });
});
Mod.create("quickbar", (mod) => {
    mod.onPreload = () => {
        Style.add(/*css*/ `
      #gt-quickbar {
        margin: 5px;
        padding: 5px;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid %CLR_PRIMARY;
        position: relative;
        width: 771px;
        float: right;
        background: linear-gradient(to bottom, %CLR_PRIMARY 23%, %CLR_BACKGROUND 23%);
  
        & b {
          color: %CLR_PRIMARY;
        }
      
        & hr {
          height: 1px;
          border: 0px;
          background-color: %CLR_PRIMARY;
        }
      
        & div.shoparea>a>img {
          height: 50px;
        }
      
        & div.sep {
          border-left: 1px solid %CLR_PRIMARY;
          padding-left: 15px;
        }
      
        & div.rsep {
          border-right: 1px solid %CLR_PRIMARY;
          padding-right: 15px;
        }
      
        & span.newevent {
          border-left: 1px solid %CLR_BACKGROUND;
          padding-left: 5px;
          & a:link, a:visited, a:hover, a:active {
            color: %CLR_BACKGROUND;
          }
        }
  
        & div.linkmenu {
          display: inline-block;
          vertical-align: top;
          margin: 5px;
          font-size: 1em;
          line-height: 1.1;
  
          & a:link, a:visited {
            color: %CLR_PRIMARY;
          }
  
          & a:hover, a:active {
            color: %CLR_ACCENT;
          }
        }
  
        & span.goattime {
          font-weight: bold;
          color: %CLR_BACKGROUND;
  
          & a:link, a:visited, a:hover, a:active {
            color: %CLR_BACKGROUND;
          }
        }
  
        & div.user-info {
          justify-content: middle;
          float: right;
          position: absolute;
          font-weight: bold;
          color: %CLR_BACKGROUND;
      
          margin: 5px;
          top: 0;
          right: 0;
      
          & img {
            width: 12px;
          }
  
          & .sep {
            border-left: 1px solid %CLR_BACKGROUND;
            padding-left: 5px;
          }
        
          & .rsep {
            border-right: 1px solid %CLR_BACKGROUND;
            padding-right: 5px;
          }
  
          & a:link, a:visited, a:hover, a:active {
            color: %CLR_BACKGROUND;
          }
        }
      }
  
      #gt-quickbar.loggedout {
        background: %CLR_PRIMARY;
        height: 1.2em;
        & div, hr {
          display: none;
        }
      }
    `);
    };
    mod.onActivate = (m) => __awaiter(this, void 0, void 0, function* () {
        var _b, _c;
        const goat_time = $("#user-info > span.small-text").text();
        let user_login_or_register = "";
        let user_pfx_element = "";
        let new_event = "";
        let user_info = "";
        let logout_link = "";
        if ($("div#content > .event")[0]) {
            // Only remove the first instance. On /events, each possible event is also
            // given the event class, and we only want to remove the header event
            $("div#content > .event")[0].remove();
            new_event = `<span class="newevent"><a href="/events">You have a new event!</a></>`;
        }
        if (m.user) {
            const pfx = (_b = m.user) === null || _b === void 0 ? void 0 : _b.prefix;
            if (pfx)
                user_pfx_element = `<img src="${pfx}">`;
            user_info = `<div class="user-info">
          <span>Welcome ${user_pfx_element}<a href="/profile/u/${(_c = m.user) === null || _c === void 0 ? void 0 : _c.uuid}">${m.user.name}</a></span>
          <span class="sep"><a href="/mail/index/"><img src="${RES.image.mail}"></a></span>
          <span class="sep"><a href="/cashshop">${m.user.daimonddust} <img src="${RES.image.dd3}"></a></span>
          <span class="sep"><a href="/bank">${m.user.sugarstars} <img src="${RES.image.sugarstars}"></a></span>
        </div>`;
            logout_link = `<a href="/login/logout/${m.user.csrf}">Logout</a><br>`;
        }
        else {
            user_login_or_register = `- Welcome (<u><a href="/login/">Login</a></u> or <u><a href="/register/">Register</a></u>)`;
        }
        let quickbar_element = `<div id="gt-quickbar">
        <span class="goattime">${goat_time}${user_login_or_register}</span>
        
        ${new_event}
        ${user_info}
        
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
          ${logout_link}
        </div>
      </div>`;
        $("#header").after(quickbar_element);
        if (!m.user)
            $("div#gt-quickbar").addClass("loggedout");
        $("#user-info-wrap, #user-info > br, #user-info, #user-info-points, #user-info > span.small-text").remove();
        return true;
    });
});
Mod.create("petHeader", (mod) => {
    mod.onPreload = () => {
        Style.add(/*css*/ `
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
          border: 1px solid %CLR_PRIMARY;
          background: linear-gradient(to bottom, %CLR_PRIMARY 16%, white 16%);
          
          & b {
              color: %CLR_PRIMARY;
          }
          
          & hr {
              height: 1px;
              border: 0px;
              background-color: %CLR_PRIMARY;
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
          border: 1px solid %CLR_PRIMARY;
      }
    `);
    };
    const getStatClass = (cur = 0, max = 100) => {
        cur = cur !== null && cur !== void 0 ? cur : 0;
        max = max !== null && max !== void 0 ? max : 100;
        let ratio = cur / max;
        if (ratio >= 0.5)
            return "normal";
        if (ratio <= 0.25)
            return "peril";
        return "danger";
    };
    mod.onActivate = (m) => __awaiter(this, void 0, void 0, function* () {
        var _b;
        if (!((_b = m.user) === null || _b === void 0 ? void 0 : _b.active))
            return false;
        const active = (yield m.user.fetchGoatlings())[m.user.active];
        if (!active)
            return false;
        const ratio = (active.current_exp / active.max_exp) * 100;
        const hp = `${active.current_hp}/${active.max_hp}`;
        $("div#header > div#active_pet_image > img")
            .wrap(`<a href="/MyGoatlings"></a>`)
            .parent()
            .parent().after(`
        <div class="active_pet_stats">
          <div class="stat-header">Level:  <span>${active.level}</span><br></div>
          <b>Hp</b>:     <span class="${getStatClass(active.current_hp, active.max_hp)}">${hp}</span><br>
          <b>Hunger</b>: <span class="${getStatClass(active.hunger)}">${active.hunger}/100</span><br>
          <b>Mood</b>:   <span class="${getStatClass(active.mood)}">${active.mood}/100</span><br><hr>
          <b>Wins</b>:   <span >${active.wins}</span><br>
          <b>Loss</b>:   <span >${active.losses}</span><br>
        </div>
        <div class="active_exp_bar" style="background: linear-gradient(to right, ${Style.get("accent")} ${ratio}%, ${Style.get("background")} ${ratio}%)"></div>
      `);
        return true;
    });
});
Mod.create("settingsPage", (mod) => {
    mod.runsOn = ["/settings"];
    mod.enabled = false;
    mod.onPreload = () => {
        Style.add(/*css*/ `
      #content.gt-settings-container {  
        & .hidden {
          display: none;
        }
  
        & .gt-settings > span {
          float: right;
        }
  
        & #gt-tools-settings {
          & input.submit {
            position: absolute;
            right: 0;
            margin: 5;
            top: -27;
          }

          & table {
            border-collapse: separate;
            display: inline-block;
          }

          & table#gt-style-settings {
            float: left;
          }

          & table#gt-mods-enabled {
            float: right;
          }
  
          & table > tbody > tr > td:nth-child(1) {
            padding: 5px;
            border-radius: 4px 0px 0px 4px;
          }
  
          & table > tbody > tr > td:nth-last-child(1) {
            padding: 5px;
            border-radius: 0px 4px 4px 0px;
          }
  
          & table {
            border-collapse: separate;
            border-spacing: 0px 5px;
  
            & tbody {
              color: %CLR_BACKGROUND;
              background: %CLR_PRIMARY;
            }
          }
        }
      }
    `);
    };
    const gtUpdateSettingFromForm = (e) => {
        var _b, _c;
        const updateFormArray = $(e).serializeArray();
        let didUpdate = false;
        for (const data of updateFormArray) {
            switch (true) {
                case /^gt\-color\-/.test((_b = data.name) !== null && _b !== void 0 ? _b : ""): {
                    didUpdate = gtUpdateStyle(data.name.replace(/^gt\-color\-/, ""), data.value)
                        ? true
                        : didUpdate;
                    break;
                }
                case /^gt\-setting\-/.test((_c = data.name) !== null && _c !== void 0 ? _c : ""): {
                    didUpdate = gtUpdateSetting(data.name.replace(/^gt\-setting\-/, ""), data.value)
                        ? true
                        : didUpdate;
                    break;
                }
            }
        }
        if (didUpdate)
            window.location.reload();
        return false;
    };
    Script.add("gtUpdateStyle", gtUpdateStyle);
    Script.add("gtUpdateSetting", gtUpdateSetting);
    Script.add("gtUpdateSettingFromForm", gtUpdateSettingFromForm);
    mod.onActivate = () => __awaiter(this, void 0, void 0, function* () {
        const root = $("div#content");
        root.before(/*html*/ `
      <div class="gt-header">
        <div id="my-settings-select" class="header-option selected">My Settings</div>
        &nbsp|&nbsp
        <div id="gttools-select" class="header-option">Goatling Tools</div>
      </div>
    `);
        $(".gt-header").after(`<div id="content" class="gt-settings-container gt-has-header"></div>`);
        root.addClass("gt-settings").find("h2")[0].remove();
        const settings_root = $("div#content.gt-settings-container");
        root.attr("id", "my-settings").appendTo(settings_root);
        settings_root.append(/*html*/ `
      <div id="gt-tools-settings" class="gt-settings hidden">
        <form id="gt-update-settings" onsubmit="return gtUpdateSettingFromForm(this)">
        <input class="submit" type="image" src="${RES.image.save}" value="Update" name="gt-submit">
        <table id="gt-style-settings">
          <tbody>
            <tr>
              <td>
                <b>Styling options:</b><br>
                &nbsp&nbsp<b>-</b> Colors must be a hex value <br>
                &nbsp&nbsp<b>-</b> An empty field resets the color <br>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Background Color</td>
              <td><input type="text" value="${Style.get("background")}" name="gt-color-background"></td>
            </tr>

            <tr>
              <td>Primary Color</td>
              <td><input type="text" value="${Style.get("primary")}" name="gt-color-primary"></td>
            </tr>

            <tr>
              <td>Accent Color</td>
              <td><input type="text" value="${Style.get("accent")}" name="gt-color-accent"></td>
            </tr>
          </tbody>
        </table>
        <!--
        <table id="gt-mods-enabled">
          <tbody>
            <tr>
              <td><b>Enabled Mods</b><td>
              <td><td>
            </tr>
          </tbody>
        </table>
        -->
        </form>
      </div>
    `);
        // const modsTable = $("table#gt-mods-enabled > tbody")
        // let i = 0
        // Mod.each((m: Mod) => {
        //   modsTable.append(`
        //     <tr>
        //       <td>Mod[${m.name}] enabled</td>
        //       <td>
        //         <input type="checkbox"
        //           value="${m.name}"
        //           name="gt-mod-enabled-${i}"
        //         ${m.enabled ? "checked" : ''}>
        //       </td>
        //     </tr>
        //   `)
        //   i++
        // })
        $("#gttools-select").on("click", () => {
            $("#gttools-select").addClass("selected");
            $("#my-settings-select").removeClass("selected");
            $("#my-settings").addClass("hidden");
            $("#gt-tools-settings").removeClass("hidden");
        });
        $("#my-settings-select").on("click", () => {
            $("#my-settings-select").addClass("selected");
            $("#gttools-select").removeClass("selected");
            $("#gt-tools-settings").addClass("hidden");
            $("#my-settings").removeClass("hidden");
        });
        return true;
    });
});
Mod.create("inventoryTools", (mod) => {
    mod.runsOn = ["/inventory"];
    mod.onPreload = () => {
        Style.add(`
      div.gt-header {
        justify-content: space-evenly;
        & img {
          margin: 0;
          width: 14;
        }
        & a, a:link, a:visited, a:active {
          color: %CLR_BACKGROUND;
        }
        & a:hover {
          color: %CLR_ACCENT;
        }
      }

      div#content {
        text-align: center;
      }

      center > .item-invent {
        border: 1px dotted;
        border-color: %CLR_PRIMARY;
        border-radius: 4px;
        height: 95px;
        width: 95px;
        position: relative;

        & img {
          height: 70%;
        }

        & span.item-count {
          position: absolute;
          top: 0;
          right: 0;
          margin: 5;
          font-size: 14;
        }

        & div.item-name {
          border-radius: 0 0 4px 4px;
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 3 0 3 0;
          margin: 0;
          background: %CLR_PRIMARY;
          color: %CLR_BACKGROUND;
        }

        & a, a:link, a:visited, a:hover, a:active {
          color: %CLR_PRIMARY;
        }
      }
    `);
    };
    const COUNT_RE = new RegExp("Total Items: ([0-9]+)$");
    const idToRegexp = {
        "all-items": new RegExp("^/inventory(?:/index/[0-9]+)?/?$"),
        "food-items": new RegExp("/food/?$"),
        "toy-items": new RegExp("/toy/?$"),
        "wearable-items": new RegExp("/wearable/?$"),
        "atk-items": new RegExp("/battle_item_att/?$"),
        "def-items": new RegExp("/battle_item_def/?$"),
        "dodge-items": new RegExp("/speed_inc/?$"),
        "collect-items": new RegExp("/collectible/?$"),
        "container-items": new RegExp("/container/?$"),
        "book-items": new RegExp("/intel_inc/?$"),
        "icon-items": new RegExp("/usericon/?$"),
        "doll-items": new RegExp("/pet_look/?$"),
        "potion-items": new RegExp("/health_potion/?$"),
        "retired-items": new RegExp("/retired/?$"),
    };
    mod.onActivate = () => __awaiter(this, void 0, void 0, function* () {
        const root = $("div#content");
        const s = Settings.get("itemsStacked") ? 2 : 1;
        root.before(/*html*/ `
      <div class="gt-header">
        <div id="all-items" class="header-option">
          <a href="/inventory/index/${s}">All</a>
        </div>

        &nbsp|&nbsp
        <div id="food-items" class="header-option">
          <a href="/inventory/index/${s}/food">Food</a>
        </div>

        &nbsp|&nbsp
        <div id="toy-items" class="header-option">
          <a href="/inventory/index/${s}/toy">Toys</a>
        </div>

        &nbsp|&nbsp
        <div id="wearable-items" class="header-option">
          <a href="/inventory/index/${s}/wearable">Wearables</a>
        </div>

        &nbsp|&nbsp
        <div id="atk-items" class="header-option">
          <a href="/inventory/index/${s}/battle_item_att">Attacking</a>
        </div>

        &nbsp|&nbsp
        <div id="def-items" class="header-option">
          <a href="/inventory/index/${s}/battle_item_def">Defending</a>
        </div>

        &nbsp|&nbsp
        <div id="dodge-items" class="header-option">
          <a href="/inventory/index/${s}/speed_inc">Dodging</a>
        </div>

        &nbsp|&nbsp
        <div id="collect-items" class="header-option">
          <a href="/inventory/index/${s}/collectible">Collectibles</a>
        </div>

        &nbsp|&nbsp
        <div id="container-items" class="header-option">
          <a href="/inventory/index/${s}/container">Containers</a>
        </div>

        &nbsp|&nbsp
        <div id="book-items" class="header-option">
          <a href="/inventory/index/${s}/intel_inc">Books</a>
        </div>
        
        &nbsp|&nbsp
        <div id="icon-items" class="header-option">
          <a href="/inventory/index/${s}/usericon">Icons</a>
        </div>
        
        &nbsp|&nbsp
        <div id="doll-items" class="header-option">
          <a href="/inventory/index/${s}/pet_look">Dolls</a>
        </div>
        
        &nbsp|&nbsp
        <div id="potion-items" class="header-option">
          <a href="/inventory/index/${s}/health_potion">Potions</a>
        </div>
        
        &nbsp|&nbsp
        <div id="retired-items" class="header-option">
          <a href="/inventory/index/${s}/retired">Retired</a>
        </div>
        
        &nbsp|&nbsp
        <div class="header-option">
          <img id="toggle-stack" src="${Settings.get("itemsStacked")
            ? RES.image.stacked
            : RES.image.unstacked}">
        </div>
      </div>
    `);
        root.addClass("gt-has-header");
        root.find("h2")[0].remove();
        root.find("p").slice(0, 2).remove();
        const uri = getUri();
        for (const id in idToRegexp) {
            if (idToRegexp[id].test(uri)) {
                $("div.gt-header > div#" + id).addClass("selected");
            }
        }
        $("center > div.item-invent").each((_, item) => {
            var _b, _c;
            let text = $(item).text();
            const link = $(item).find("a")[0].href;
            const imag = $(item).find("img")[0].src;
            const count = parseSepInt((_c = (_b = COUNT_RE.exec(text)) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : "1");
            text = text.replace(COUNT_RE, "");
            let countElement = "";
            if (count > 1)
                countElement = `<span class="item-count">x${count}</span>`;
            $("div#content > center").append(`
        <div class="item-invent">
          <a href="${getUri(link)}">
            <img src="${getUri(imag)}">
            ${countElement}
          </a>
          <div class="item-name">${text}</div>
        </div>
      `);
            $(item).remove();
        });
        $("div.header-option > img#toggle-stack").on("click", () => {
            var _b;
            mod.logDebug("Toggling stacks!");
            Settings.set("itemsStacked", Settings.get("itemsStacked") ? false : true);
            // Preserve what inventory we're viewing
            const trailing = (_b = /^\/inventory\/index\/[0-9](.+)$/.exec(uri)) === null || _b === void 0 ? void 0 : _b[1];
            if (trailing) {
                mod.logDebug("Before:", `/inventory/index/${Settings.get("itemsStacked") ? 2 : 1}${trailing}`);
                window.location.href = `/inventory/index/${Settings.get("itemsStacked") ? 2 : 1}${trailing}`;
                return;
            }
            mod.logDebug("After:", `/inventory/index/${Settings.get("itemsStacked") ? 2 : 1}`);
            window.location.href = `/inventory/index/${Settings.get("itemsStacked") ? 2 : 1}`;
        });
        return true;
    });
});
Style.add(/*css*/ `
  /* Alters main content margins, and adds a border to better fit with the changes */
  /* added by quickbar and sidebar mods */
  div#wrapper {
    background: none;

    & div#content {
      border: 1px solid %CLR_PRIMARY;
      
      width: 760px;
      float: right;
    }
  }

  /* Adjust the battle page content to fit better inline*/
  #content > center > div.battle-grid {
    padding: 0;
  }

  div#content.gt-has-header {
    border-radius: 0px 0px 4px 4px;
    margin-top: 0;
  }
`);
Mod.create("shoppingTweaks", (mod) => {
    mod.runsOn = ["/ShoppingDistrict"];
    mod.onPreload = () => {
        Style.add(`
      div#wrapper > div#content > center {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        & div.shoparea {
          border: 1px dashed;
          border-color: %CLR_BACKGROUND;
          max-width: 100px;
          display: flex;
          padding: 0;
          margin: 0;
          position: relative;
          background: %CLR_BACKGROUND;
          flex-direction: column;

          & img {
            width: 100px;
          }
        }
      }
    `);
    };
    mod.onActivate = () => __awaiter(this, void 0, void 0, function* () {
        $(`div#wrapper > div#content > center > div.shoparea`).find("br").remove();
        return true;
    });
});
Style.load({
    background: "#FFFFFF",
    primary: "#F56A91",
    accent: "#FF80A4",
});
Style.inject();
/**
 * Main Entrypoint
 */
$(() => __awaiter(this, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    Settings.load({
        itemsStacked: false,
        logLevel: Logger.LOG_WARNING,
    });
    // Pull the page CSRF from the logout section of the sidebar
    let csrf = null;
    const LOGIN_RE = /^\/login\/logout\/([a-zA-Z0-9]+)\/?$/;
    $("div#sidebar > p.navlink > a").each((_, e) => {
        var _b;
        if (csrf)
            return;
        let goto = getUri($(e).attr("href"));
        let found = ((_b = LOGIN_RE.exec(goto)) !== null && _b !== void 0 ? _b : [])[1];
        if (!found)
            return;
        csrf = found;
    });
    if (typeof csrf === "string") {
        const userinfo_link = $("div#user-info > span > a");
        const currency = (_d = (_c = (_b = $("div#user-info-points")) === null || _b === void 0 ? void 0 : _b.text()) === null || _c === void 0 ? void 0 : _c.replace(/[\s]+/g, ";").split(";")) !== null && _d !== void 0 ? _d : [];
        /**
         * At the time of this writing, Goatlings has a link to the users profile
         * at XPath 'div#user-info > span > a', and that same element also conveniently
         * stores the username. Parse the <a> tag for the profile UID, and the text
         * for the username
         */
        const user = new User(getUri(userinfo_link.attr("href"))
            .replace("/profile/u/", "")
            .replace("/", ""), userinfo_link.text());
        user.csrf = csrf;
        user.sugarstars = parseSepInt((_e = currency[2]) !== null && _e !== void 0 ? _e : "0");
        user.daimonddust = parseSepInt((_f = currency[1]) !== null && _f !== void 0 ? _f : "0");
        // Parse out the active goatling from the DOM, if present
        user.active =
            (_j = (_h = (_g = /Welcome\s+[^\s]+\s+-\s+Your\s+active\s+Goatling\s+is\s+([^\s]+)/) === null || _g === void 0 ? void 0 : _g.exec($("div#user-info").text())) === null || _h === void 0 ? void 0 : _h[1]) !== null && _j !== void 0 ? _j : null;
        // Parse out the active user prefix from the DOM, if present
        let prefix = null;
        prefix = (_l = (_k = $("div#user-info > span > img")) === null || _k === void 0 ? void 0 : _k.attr("src")) !== null && _l !== void 0 ? _l : null;
        if (prefix)
            user.prefix = getUri(prefix);
        Mod.user = user;
        yield user.doUpdate();
        setInterval(() => {
            user.doUpdate();
        }, User.UPDATE_WAIT_TIME * 1000);
    }
    Script.inject();
    Mod.activateAll();
}));
//# sourceMappingURL=goatlingtools.user.js.map