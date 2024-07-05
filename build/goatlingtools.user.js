// ==UserScript==
// @name        Goatling Tools
// @namespace   goatling.tools
// @description Various tweaks to Goatlings.com
// @match       https://goatlings.com/*
// @match       https://www.goatlings.com/*
// @require     https://code.jquery.com/jquery-3.7.1.min.js
// @downloadURL https://raw.githubusercontent.com/SleebyRhea/goatlings-usability/main/goatlings-usability.js
// @updateURL   https://raw.githubusercontent.com/SleebyRhea/goatlings-usability/main/goatlings-usability.js
// @license     bsd-3-clause
// @version     1.1.0
// ==/UserScript==
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
var _this = this;
var RES = {
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
RES.image.stacked =
    "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANlJREFUSIl" +
        "jZEACaZaG/xmoBGYdP8/IwMDAwIJu+OMPn6llBwOKBciGb7uyniJDGZl1GbFawMDAwNCyqInh3LnLZBtubBrFiMzHsMDISJdswxkYGBj+/738H68Pv" +
        "HQCGVoWNZFtAboP4BxqR/L263cYUSxAtoQaAJZMMXxATcNRLPDUVKGKBbICvCiWoATR/7+XKbLESycQbglWCxgYGBjOnl5GkSU1cXUoFqAkU0p9gA2" +
        "gWMDIrMtIiQ9q4uowxGgeySzoEtQAWJMpA8NofYAAo/UBXjD86gMAmXlwBoegD/UAAAAASUVORK5CYII=";
RES.image.unstacked =
    "data:image/gif;base64, iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUpJREFUS" +
        "IntlT1ug0AQhWdtt0hcgC5NJCigQ/IFQscFXOIuh7Dc5QR2SZHWnXOBSC4srwsspUnHBZCoo0310ODsxPwocpOvWRh239vZn4Hon3ujsjg0ZVXT28e" +
        "n4h+eHh+M5zq0PZyVNBhkcWhs8e3hrGZ4MV+FUdNAoe06Q4iXVd2Ke65DWRyaCQ+ejq+Gt12B+P6yo3W+asUm4qieQBhGYGbr3AVp3a8ZZICDATzXE" +
        "fv2XiKIY733lx2VVU2b55fxBlxc64KiKKDlfNGYLOeL4QY2cTUN1OY9p8RPxUw6GUjivI/WhTWTmwZc3AaWCMAEG3/TgItLs5cyIWK1COlLp2EIZVW" +
        "37wHEr+vKUDzX+XnReF0ZQ+KnRCTc5HW+Iq2LweJRFDTPVgPeYSyNQeKnzdFK/LRVHfvCJ6j4DwMGf7LJvCL+Vh378g38zcYi1It/3wAAAABJRU5Er" +
        "kJggg==";
var PAGE = "https://www.goatlings.com";
/**
 * Return the URI portion of a page url
 * @param string page URL to parse
 * @returns string
 */
var getUri = function (page) {
    if (page === void 0) { page = window.location.href; }
    return page.replace(/^https?:\/\/(?:www\.)?goatlings\.com\/?/, "/");
};
/**
 * Parse a string into an int, removing the given seperator
 * @param toInt
 * @returns int
 */
var parseSepInt = function (toInt, sep) {
    if (toInt === void 0) { toInt = "0"; }
    if (sep === void 0) { sep = ","; }
    return parseInt(toInt.replace(sep, ""));
};
/**
 * Run a function only if the current page URI section matches the given string(s)
 * @param fn Function to run
 * @param uri URI endings that this function will be run on
 */
var onlyOn = function (fn) {
    var uri = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        uri[_i - 1] = arguments[_i];
    }
    if (uri.length <= 0)
        return fn();
    var pageUri = getUri();
    for (var _a = 0, uri_1 = uri; _a < uri_1.length; _a++) {
        var u = uri_1[_a];
        if (u == pageUri || "".concat(u, "/") == pageUri)
            return fn();
    }
};
var Logger = /** @class */ (function () {
    function Logger(repr) {
        this.logLevel = 1;
        this.__repr = repr;
    }
    Logger.prototype.log = function (level) {
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        if (level >= this.logLevel)
            console.log.apply(console, __spreadArray(["[GoatTools:".concat(_b.LOG_REPR[level], "] ").concat(this.__repr(), " ")], msg, false));
    };
    Logger.prototype.logInfo = function (msg) {
        return this.log(_b.LOG_INFO, msg);
    };
    Logger.prototype.logWarn = function (msg) {
        return this.log(_b.LOG_WARNING, msg);
    };
    Logger.prototype.logError = function (msg) {
        return this.log(_b.LOG_ERROR, msg);
    };
    Logger.prototype.logDebug = function (msg) {
        return this.log(_b.LOG_DEBUG, msg);
    };
    Logger.prototype.logVerbose = function (msg) {
        return this.log(_b.LOG_VERBOSE, msg);
    };
    var _b;
    _b = Logger;
    Logger.LOG_ERROR = 0;
    Logger.LOG_WARNING = 1;
    Logger.LOG_INFO = 2;
    Logger.LOG_VERBOSE = 3;
    Logger.LOG_DEBUG = 4;
    Logger.LOG_REPR = (_a = {},
        _a[_b.LOG_ERROR] = "ERROR",
        _a[_b.LOG_WARNING] = "WARN ",
        _a[_b.LOG_INFO] = "INFO ",
        _a[_b.LOG_VERBOSE] = "VERB ",
        _a[_b.LOG_DEBUG] = "DEBUG",
        _a);
    return Logger;
}());
var Script = /** @class */ (function () {
    function Script() {
    }
    Script.add = function (name, fn) {
        if (this.allScripts[name])
            return console.log("[GoatTools:WARN ] Attempted to add pre-existing script");
        console.log("[GoatTools:DEBUG] Preparing to inject \"".concat(name, "\""));
        this.allScripts[name] = fn.toString();
    };
    Script.inject = function () {
        for (var s in this.allScripts) {
            $("<script>")
                .prop("type", "text/javascript")
                .html("\n          const ".concat(s, "Actual = ").concat(this.allScripts[s], "\n          const ").concat(s, " = (...args) => {\n            try {\n              return ").concat(s, "Actual(...args)\n            }\n\n            catch (e) {\n              console.log(e)\n            }\n\n            return false\n          }\n        "))
                .appendTo("head");
        }
    };
    Script.allScripts = {};
    return Script;
}());
var Style = /** @class */ (function () {
    function Style() {
    }
    Style.add = function (css) {
        this.allStyles.push(css.replaceAll(/(?:\r\n|\r|\n)/g, " "));
    };
    Style.get = function (property) {
        var _a;
        return (_a = this.settings[property]) !== null && _a !== void 0 ? _a : "black";
    };
    Style.load = function (defaultSet) {
        var _a, _c;
        if (defaultSet === void 0) { defaultSet = {}; }
        var loadedStyle = JSON.parse((_a = localStorage.getItem("gt_style")) !== null && _a !== void 0 ? _a : "{}");
        var wantedStyle = __assign(__assign({}, defaultSet), loadedStyle);
        for (var key in wantedStyle) {
            this.settings[key] = (_c = wantedStyle[key]) !== null && _c !== void 0 ? _c : this.settings[key];
        }
        localStorage.setItem("gt_style", JSON.stringify(this.settings));
    };
    Style.inject = function () {
        $("<style>")
            .prop("type", "text/css")
            .html(this.allStyles
            .join(" ")
            .replaceAll(/%CLR_BACKGROUND/g, this.settings.background)
            .replaceAll(/%CLR_PRIMARY/g, this.settings.primary)
            .replaceAll(/%CLR_ACCENT/g, this.settings.accent))
            .appendTo("head");
    };
    Object.defineProperty(Style, "background", {
        set: function (color) {
            this.settings.background = color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style, "primary", {
        set: function (color) {
            this.settings.primary = color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style, "accent", {
        set: function (color) {
            this.settings.accent = color;
        },
        enumerable: false,
        configurable: true
    });
    Style.allStyles = [];
    Style.settings = {
        background: "#FFFFFF",
        primary: "black",
        accent: "grey",
    };
    return Style;
}());
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.get = function (property) {
        var _a;
        return (_a = this.settings[property]) !== null && _a !== void 0 ? _a : false;
    };
    Settings.set = function (property, what) {
        this.settings[property] = what;
        localStorage.setItem("gt_settings", JSON.stringify(this.settings));
    };
    Settings.load = function (defaultSet) {
        var _a, _c;
        if (defaultSet === void 0) { defaultSet = {}; }
        var loadedSettings = JSON.parse((_a = localStorage.getItem("gt_settings")) !== null && _a !== void 0 ? _a : "{}");
        var wantedSettings = __assign(__assign({}, defaultSet), loadedSettings);
        for (var key in wantedSettings) {
            this.settings[key] = (_c = wantedSettings[key]) !== null && _c !== void 0 ? _c : this.settings[key];
        }
        localStorage.setItem("gt_settings", JSON.stringify(this.settings));
    };
    Settings.settings = {
        itemsStacked: false,
    };
    return Settings;
}());
/**
 *
 * @param key Color key to update
 * @param value Value to update the color to
 * @returns boolean
 */
var gtUpdateStyle = function (key, value) {
    var _a;
    if (["background", "accent", "primary"].indexOf(key) < 0) {
        console.log("[GoatTools:WARN ] Style[] Attempt to save invalid key to style");
        return false;
    }
    var didUpdate = false;
    console.log("[GoatTools:DEBUG] Style[] Setting ".concat(key, " value to ").concat(value));
    var style = JSON.parse((_a = localStorage.getItem("gt_style")) !== null && _a !== void 0 ? _a : "{}");
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
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(uuid, name) {
        var _this = _super.call(this, function () {
            return _this.name ? "User[".concat(String(_this.name), "]") : "User[GuestUser]";
        }) || this;
        _this.uuid = uuid;
        _this.name = name;
        return _this;
    }
    User.prototype.fetchGoatlings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_c) {
                if (!this.__goatlings) {
                    this.__goatlings = JSON.parse((_a = localStorage.getItem("".concat(this.uuid, "_goatlings"))) !== null && _a !== void 0 ? _a : "{}");
                }
                return [2 /*return*/, this.__goatlings];
            });
        });
    };
    User.prototype.updateGoatling = function (name, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.__goatlings[name] = __assign(__assign({}, this.__goatlings[name]), data);
                localStorage.setItem("".concat(this.uuid, "_goatlings"), JSON.stringify(this.__goatlings));
                return [2 /*return*/];
            });
        });
    };
    /**
     * Parse goatling objects from the given JQuery object
     * @param obj
     */
    User.prototype.updateGoatlingsActual = function (obj) {
        var goatlings = {};
        var view_re = /^\/mypets\/view\/([\d]+)\/?/;
        $(obj).each(function (_, e) {
            var _a;
            var pet_id = "";
            var goat_def = (_a = $(e).text()) === null || _a === void 0 ? void 0 : _a.replace(/[\s]+/g, ";").split(";");
            goat_def.shift();
            goat_def.pop();
            $(e)
                .find("a")
                .each(function (_, a) {
                var _a;
                if (pet_id != "")
                    return;
                var goto = getUri($(a).attr("href"));
                if (goto == "")
                    return;
                if (!view_re.test(goto))
                    return;
                pet_id = String((_a = view_re.exec(goto)) === null || _a === void 0 ? void 0 : _a[1]);
            });
            // HP and EXP are presented as "current/max"
            var hp = goat_def[6].split("/");
            var exp = goat_def[4].split("/");
            var goat = {
                id: pet_id,
                name: goat_def[0],
                portait: getUri($(e).find("img").attr("src")),
                level: parseSepInt(goat_def[2]),
                current_exp: parseSepInt(exp[0]),
                max_exp: parseSepInt(exp[1]),
                current_hp: parseSepInt(hp[0]),
                max_hp: parseSepInt(hp[1]),
                str: parseSepInt(goat_def[8]),
                def: parseSepInt(goat_def[10]),
                int: parseSepInt(goat_def[12]),
                spd: parseSepInt(goat_def[14]),
                hunger: parseSepInt(goat_def[16].split("/")[0]),
                mood: parseSepInt(goat_def[18].split("/")[0]),
                wins: parseSepInt(goat_def[20]),
                losses: parseSepInt(goat_def[22]),
            };
            goatlings[goat.name] = goat;
        });
        return goatlings;
    };
    /**
     * Fetch and update the goatlings data with the latest information from /mypets
     */
    User.prototype.updateGoatlings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.logInfo("Updating goatlings ...");
                if (getUri() == "/mypets") {
                    this.__goatlings = this.updateGoatlingsActual($("div.mypets-pet"));
                    localStorage.setItem("".concat(this.uuid, "_goatlings"), JSON.stringify(this.__goatlings));
                    this.logDebug("updateGoatlings() Finished update");
                }
                else {
                    this.logDebug("Fetching pet data from /mypets ...");
                    $.ajax({
                        url: "".concat(PAGE, "/mypets"),
                        async: true,
                        success: function (data) {
                            _this.__goatlings = _this.updateGoatlingsActual($(data).find("div.mypets-pet"));
                            localStorage.setItem("".concat(_this.uuid, "_goatlings"), JSON.stringify(_this.__goatlings));
                            _this.logDebug("updateGoatlings() Finished update");
                        },
                    });
                }
                localStorage.setItem("".concat(this.uuid, "_goatlings_last_update"), "".concat(Math.floor(Date.now() / 1000)));
                return [2 /*return*/];
            });
        });
    };
    /**
     * Determine whether or not the last user update has expired for a given field
     */
    User.prototype.checkNeedsUpdate = function (what) {
        return __awaiter(this, void 0, void 0, function () {
            var now, last;
            var _a;
            return __generator(this, function (_c) {
                now = Math.floor(Date.now() / 1000);
                last = Math.floor(parseSepInt((_a = localStorage.getItem("".concat(this.uuid, "_").concat(what, "_last_update"))) !== null && _a !== void 0 ? _a : "0"));
                if (now - last >= User.UPDATE_WAIT_TIME)
                    return [2 /*return*/, true];
                return [2 /*return*/, false];
            });
        });
    };
    User.prototype.doUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logInfo("Update triggered ...");
                        return [4 /*yield*/, this.checkNeedsUpdate("goatlings")];
                    case 1:
                        if (_a.sent())
                            this.updateGoatlings();
                        return [2 /*return*/];
                }
            });
        });
    };
    User.UPDATE_WAIT_TIME = 60 * 60 * 1;
    return User;
}(Logger));
/**
 * Represents a mod that this userscript is injecting
 */
var Mod = /** @class */ (function (_super) {
    __extends(Mod, _super);
    function Mod(name) {
        var _this = _super.call(this, function () {
            return "Mod[".concat(name, "]");
        }) || this;
        _this.name = "";
        _this.runsOn = [];
        _this.name = name;
        _this.enabled = true;
        _this.onActivate = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        }); };
        _this.onPreload = function () {
            return true;
        };
        return _this;
    }
    Object.defineProperty(Mod.prototype, "user", {
        get: function () {
            return Mod.user;
        },
        enumerable: false,
        configurable: true
    });
    Mod.prototype.activate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pageUri, canRun, _i, _a, uri;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.enabled)
                            return [2 /*return*/, this.logDebug("Not enabled, skipping")];
                        pageUri = getUri();
                        if (this.runsOn.length > 0) {
                            canRun = false;
                            for (_i = 0, _a = this.runsOn; _i < _a.length; _i++) {
                                uri = _a[_i];
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
                                return [2 /*return*/, this.logDebug("Can't run on this page")];
                        }
                        return [4 /*yield*/, this.onActivate(this)];
                    case 1:
                        if (!(_c.sent()))
                            this.logDebug("Didn't activate");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Run a given function against each mod
     */
    Mod.each = function (fn) {
        for (var _i = 0, _a = this.__all; _i < _a.length; _i++) {
            var cls = _a[_i];
            fn(cls);
        }
    };
    /**
     * Create a new mod, and add it to the list of mods
     * @param name Name of the mod
     * @param init Initialization function
     */
    Mod.create = function (name, init) {
        var m = new Mod(name);
        init(m);
        this.__all.push(m);
        var canRun = true;
        if (m.runsOn.length > 0) {
            canRun = false;
            var pageUri = getUri();
            for (var _i = 0, _a = m.runsOn; _i < _a.length; _i++) {
                var uri = _a[_i];
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
    };
    /**
     * Activate all mods
     */
    Mod.activateAll = function () {
        Mod.each(function (mod) {
            mod.activate();
        });
    };
    Mod.__all = [];
    Mod.user = null;
    return Mod;
}(Logger));
Style.add(/*css*/ "\n  .gt-header {\n    background: %CLR_PRIMARY;\n    color: %CLR_BACKGROUND;\n    float: right;\n    width: 772px;\n    margin-left: 5;\n    margin-right: 5;\n    margin-bottom: 0;\n    padding: 5px;\n    font-weight: bold;\n    border-radius: 4px 4px 0px 0px;\n    display: flex;\n    \n    & hr {\n      width: 1;\n      border-left: 1px solid %CLR_BACKGROUND;\n      height: 100%;\n    }\n    \n    & .header-option:hover {\n      cursor: pointer;\n    }\n\n    & .selected {\n      text-decoration: underline;\n    }\n  }\n");
// Shows the lowest haggle-able price for a shop object
Mod.create("hagglePrice", function (mod) {
    mod.runsOn = ["/shops/viewa"];
    mod.onPreload = function () {
        Style.add(".gt-haggle-price { margin: 5px }");
    };
    mod.onActivate = function () { return __awaiter(_this, void 0, void 0, function () {
        var text, priceText, price;
        return __generator(this, function (_a) {
            text = $("#content > center").text();
            if (!text || /This item is sold out/i.test(text))
                return [2 /*return*/, false];
            priceText = /To purchase this item, enter a price close to ([\d,]+) Sugar Stars/.exec(text);
            if (!priceText)
                return [2 /*return*/, false];
            price = parseSepInt(priceText[1].replace(",", ""));
            if (price == 0)
                return [2 /*return*/, false];
            $("#content > center > form").before("\n      <div class=\"gt-haggle-price\">Haggle price: <b>".concat(price * 0.8, "</b></div><br>\n    "));
            return [2 /*return*/, true];
        });
    }); };
});
// Overhauls the sidebar placement
Mod.create("sidebarOverhaul", function (mod) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        mod.onPreload = function () {
            Style.add(/*css*/ "\n      div#sidebar {\n        background-color: %CLR_BACKGROUND;\n        border: 1px solid %CLR_PRIMARY;\n        border-radius: 4px 4px 4px 4px;\n        position: relative;\n        width: 125px;\n        margin: 5px;\n        & form {\n          margin: 0;\n        }\n      }\n    ");
        };
        mod.onActivate = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                $("div#sidebar > p.navlink > a").each(function (_, e) {
                    var _a;
                    var goto = getUri($(e).attr("href"));
                    switch (goto) {
                        case "/townmap":
                        case "/townmap/": {
                            $(e).parent().remove();
                            break;
                        }
                        case (_a = goto.match(/^\/login\/logout/)) === null || _a === void 0 ? void 0 : _a.input: {
                            $(e).parent().remove();
                            break;
                        }
                    }
                });
                return [2 /*return*/, true];
            });
        }); };
        return [2 /*return*/];
    });
}); });
Mod.create("quickbar", function (mod) {
    mod.onPreload = function () {
        Style.add(/*css*/ "\n      #gt-quickbar {\n        margin: 5px;\n        padding: 5px;\n        border-radius: 4px 4px 4px 4px;\n        border: 1px solid %CLR_PRIMARY;\n        position: relative;\n        width: 771px;\n        float: right;\n        background: linear-gradient(to bottom, %CLR_PRIMARY 23%, %CLR_BACKGROUND 23%);\n  \n        & b {\n          color: %CLR_PRIMARY;\n        }\n      \n        & hr {\n          height: 1px;\n          border: 0px;\n          background-color: %CLR_PRIMARY;\n        }\n      \n        & div.shoparea>a>img {\n          height: 50px;\n        }\n      \n        & div.sep {\n          border-left: 1px solid %CLR_PRIMARY;\n          padding-left: 15px;\n        }\n      \n        & div.rsep {\n          border-right: 1px solid %CLR_PRIMARY;\n          padding-right: 15px;\n        }\n      \n        & span.newevent {\n          border-left: 1px solid %CLR_BACKGROUND;\n          padding-left: 5px;\n          & a:link, a:visited, a:hover, a:active {\n            color: %CLR_BACKGROUND;\n          }\n        }\n  \n        & div.linkmenu {\n          display: inline-block;\n          vertical-align: top;\n          margin: 5px;\n          font-size: 1em;\n          line-height: 1.1;\n  \n          & a:link, a:visited {\n            color: %CLR_PRIMARY;\n          }\n  \n          & a:hover, a:active {\n            color: %CLR_ACCENT;\n          }\n        }\n  \n        & span.goattime {\n          font-weight: bold;\n          color: %CLR_BACKGROUND;\n  \n          & a:link, a:visited, a:hover, a:active {\n            color: %CLR_BACKGROUND;\n          }\n        }\n  \n        & div.user-info {\n          justify-content: middle;\n          float: right;\n          position: absolute;\n          font-weight: bold;\n          color: %CLR_BACKGROUND;\n      \n          margin: 5px;\n          top: 0;\n          right: 0;\n      \n          & img {\n            width: 12px;\n          }\n  \n          & .sep {\n            border-left: 1px solid %CLR_BACKGROUND;\n            padding-left: 5px;\n          }\n        \n          & .rsep {\n            border-right: 1px solid %CLR_BACKGROUND;\n            padding-right: 5px;\n          }\n  \n          & a:link, a:visited, a:hover, a:active {\n            color: %CLR_BACKGROUND;\n          }\n        }\n      }\n  \n      #gt-quickbar.loggedout {\n        background: %CLR_PRIMARY;\n        height: 1.2em;\n        & div, hr {\n          display: none;\n        }\n      }\n    ");
    };
    mod.onActivate = function (m) { return __awaiter(_this, void 0, void 0, function () {
        var goat_time, user_login_or_register, user_pfx_element, new_event, user_info, logout_link, pfx, quickbar_element;
        var _a, _c;
        return __generator(this, function (_d) {
            goat_time = $("#user-info > span.small-text").text();
            user_login_or_register = "";
            user_pfx_element = "";
            new_event = "";
            user_info = "";
            logout_link = "";
            if ($("div#content > .event")[0]) {
                // Only remove the first instance. On /events, each possible event is also
                // given the event class, and we only want to remove the header event
                $("div#content > .event")[0].remove();
                new_event = "<span class=\"newevent\"><a href=\"/events\">You have a new event!</a></>";
            }
            if (m.user) {
                pfx = (_a = m.user) === null || _a === void 0 ? void 0 : _a.prefix;
                if (pfx)
                    user_pfx_element = "<img src=\"".concat(pfx, "\">");
                user_info = "<div class=\"user-info\">\n          <span>Welcome ".concat(user_pfx_element, "<a href=\"/profile/u/").concat((_c = m.user) === null || _c === void 0 ? void 0 : _c.uuid, "\">").concat(m.user.name, "</a></span>\n          <span class=\"sep\"><a href=\"/mail/index/\"><img src=\"").concat(RES.image.mail, "\"></a></span>\n          <span class=\"sep\"><a href=\"/cashshop\">").concat(m.user.daimonddust, " <img src=\"").concat(RES.image.dd3, "\"></a></span>\n          <span class=\"sep\"><a href=\"/bank\">").concat(m.user.sugarstars, " <img src=\"").concat(RES.image.sugarstars, "\"></a></span>\n        </div>");
                logout_link = "<a href=\"/login/logout/".concat(m.user.csrf, "\">Logout</a><br>");
            }
            else {
                user_login_or_register = "- Welcome (<u><a href=\"/login/\">Login</a></u> or <u><a href=\"/register/\">Register</a></u>)";
            }
            quickbar_element = "<div id=\"gt-quickbar\">\n        <span class=\"goattime\">".concat(goat_time).concat(user_login_or_register, "</span>\n        \n        ").concat(new_event, "\n        ").concat(user_info, "\n        \n        <hr>\n\n        <div class=\"shoparea\"><a href=\"/EventCalendar\"><img title=\"Event Calendar\" src=\"/images/shops/CommunityCenterEventCalendar.gif\"></a><br><b>Calendar</b></div>\n        <div class=\"shoparea sep\"><a href=\"/shops/view/10\"><img title=\"General Foods\" src=\"/images/shops/GeneralFoods.gif\"></a><br><b>General Foods</b></div>\n        <div class=\"shoparea\"><a href=\"/shops/view/1\"><img title=\"Toy Shop\" src=\"/images/shops/ToyShop.gif\"></a><br><b>Toy Shop</b></div>\n\n        <div class=\"shoparea\"><a href=\"/shops/view/8\"><img title=\"Battle Weapons\" src=\"/images/shops/Armory.gif\"></a><br><b>Weapons</b></div>\n        <div class=\"shoparea\"><a href=\"/shops/view/26\"><img title=\"Battle Pets\" src=\"/images/shops/BattlePets.gif\"></a><br><b>Battle Pets</b></div>\n        <div class=\"shoparea\"><a href=\"/shops/view/17\"><img title=\"Battle Defense\" src=\"/images/shops/battledefence.gif\"></a><br><b>Defense</b></div>\n        <div class=\"shoparea\"><a href=\"/shops/view/7\"><img title=\"Remedies And Elixirs\" src=\"/images/shops/RemediesAndElixirs.gif\"></a><br><b>Remedies</b></div>\n\n        <div class=\"shoparea\"><a href=\"/GivingTree\"><img title=\"Giving Tree\" src=\"/images/shops/GivingTree.gif\"></a></a><br><b>Giving Tree</b></div>\n        <div class=\"shoparea rsep\"><a href=\"/pawn\"><img title=\"Pawn Shop\" src=\"/images/shops/pawnshop.gif\"></a></a><br><b>Pawn Shop</b></div>\n\n        <div class=\"linkmenu\">\n          <a href=\"/townmap/\">Town Map</a><br>\n          <a href=\"/buddies\">My Buddies</a><br>\n          <a href=\"/inventory\">My Items</a><br>\n          <a href=\"/settings\">My Settings</a><br>\n          ").concat(logout_link, "\n        </div>\n      </div>");
            $("#header").after(quickbar_element);
            if (!m.user)
                $("div#gt-quickbar").addClass("loggedout");
            $("#user-info-wrap, #user-info > br, #user-info, #user-info-points, #user-info > span.small-text").remove();
            return [2 /*return*/, true];
        });
    }); };
});
Mod.create("petHeader", function (mod) {
    mod.onPreload = function () {
        Style.add(/*css*/ "\n      div#header > div#active_pet_image {\n          right: 100px;\n      }\n      \n      div#header > div.active_pet_stats {\n          position: absolute;\n          top: 0;\n          right: 0;\n          width: 100px;\n          margin: 5px;\n          padding: 3px;\n          padding-top: 0px;\n          border-radius: 4px 4px 4px 4px;\n          border: 1px solid %CLR_PRIMARY;\n          background: linear-gradient(to bottom, %CLR_PRIMARY 16%, white 16%);\n          \n          & b {\n              color: %CLR_PRIMARY;\n          }\n          \n          & hr {\n              height: 1px;\n              border: 0px;\n              background-color: %CLR_PRIMARY;\n          }\n\n          & span { float:right; }\n\n          & span.peril {\n            color: red;\n            font-weight: bold;\n          }\n\n          & span.danger {\n            color: orange;\n            font-weight: bold;\n          }\n\n          & .stat-header {\n            line-height: 1.5;\n            color: white;\n            font-weight: bold;\n          }\n      }\n      \n      div#header > div.active_exp_bar {\n          position: absolute;\n          bottom: 0;\n          right: 0;\n          width: 106px;\n          height: 5px;\n          margin: 3px;\n          margin-right: 5px;\n          border-radius: 4px 4px 4px 4px;\n          border: 1px solid %CLR_PRIMARY;\n      }\n    ");
    };
    var getStatClass = function (cur, max) {
        if (cur === void 0) { cur = 0; }
        if (max === void 0) { max = 100; }
        cur = cur !== null && cur !== void 0 ? cur : 0;
        max = max !== null && max !== void 0 ? max : 100;
        var ratio = cur / max;
        if (ratio >= 0.5)
            return "normal";
        if (ratio <= 0.25)
            return "peril";
        return "danger";
    };
    mod.onActivate = function (m) { return __awaiter(_this, void 0, void 0, function () {
        var active, ratio, hp;
        var _a;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!((_a = m.user) === null || _a === void 0 ? void 0 : _a.active))
                        return [2 /*return*/, false];
                    return [4 /*yield*/, m.user.fetchGoatlings()];
                case 1:
                    active = (_c.sent())[m.user.active];
                    if (!active)
                        return [2 /*return*/, false];
                    ratio = (active.current_exp / active.max_exp) * 100;
                    hp = "".concat(active.current_hp, "/").concat(active.max_hp);
                    $("div#header > div#active_pet_image > img")
                        .wrap("<a href=\"/mypets\"></a>")
                        .parent()
                        .parent().after("\n        <div class=\"active_pet_stats\">\n          <div class=\"stat-header\">Level:  <span>".concat(active.level, "</span><br></div>\n          <b>Hp</b>:     <span class=\"").concat(getStatClass(active.current_hp, active.max_hp), "\">").concat(hp, "</span><br>\n          <b>Hunger</b>: <span class=\"").concat(getStatClass(active.hunger), "\">").concat(active.hunger, "/100</span><br>\n          <b>Mood</b>:   <span class=\"").concat(getStatClass(active.mood), "\">").concat(active.mood, "/100</span><br><hr>\n          <b>Wins</b>:   <span >").concat(active.wins, "</span><br>\n          <b>Loss</b>:   <span >").concat(active.losses, "</span><br>\n        </div>\n        <div class=\"active_exp_bar\" style=\"background: linear-gradient(to right, ").concat(Style.get("accent"), " ").concat(ratio, "%, ").concat(Style.get("background"), " ").concat(ratio, "%)\"></div>\n      "));
                    return [2 /*return*/, true];
            }
        });
    }); };
});
Mod.create("pageUpdates", function (mod) {
    mod.runsOn = ["/mypets", "/battle/over", "/inventory/view_action"];
    mod.onActivate = function () { return __awaiter(_this, void 0, void 0, function () {
        var doUpdate, uri;
        var _a;
        return __generator(this, function (_c) {
            doUpdate = false;
            uri = getUri();
            switch (true) {
                case uri == "/mypets": {
                    doUpdate = true;
                    break;
                }
                case uri.startsWith("/battle/over"): {
                    if (/The battle is over/.test($("div#content").text()))
                        doUpdate = true;
                    break;
                }
                case uri.startsWith("/inventory/view_action"): {
                    $("div#content").each(function (_, e) {
                        if (doUpdate)
                            return;
                        var text = $(e).text();
                        if (/Their [^\s]+ increased by/.test(text) ||
                            /has their hp healed/.test(text) ||
                            /Mood ([+-][\d]+)/.test(text))
                            doUpdate = true;
                    });
                    break;
                }
                default: {
                    return [2 /*return*/, false];
                }
            }
            (_a = mod.user) === null || _a === void 0 ? void 0 : _a.updateGoatlings();
            return [2 /*return*/, true];
        });
    }); };
});
Mod.create("settingsPage", function (mod) {
    mod.runsOn = ["/settings"];
    mod.enabled = true;
    mod.onPreload = function () {
        Style.add(/*css*/ "\n      #content.gt-settings-container {  \n        & .hidden {\n          display: none;\n        }\n  \n        & .gt-settings > span {\n          float: right;\n        }\n  \n        & #gt-tools-settings {\n          & input.submit {\n            position: absolute;\n            right: 0;\n            margin: 5;\n            top: -27;\n          }\n\n          & table {\n            border-collapse: separate;\n            display: inline-block;\n          }\n\n          & table#gt-style-settings {\n            float: left;\n          }\n\n          & table#gt-mods-enabled {\n            float: right;\n          }\n  \n          & table > tbody > tr > td:nth-child(1) {\n            padding: 5px;\n            border-radius: 4px 0px 0px 4px;\n          }\n  \n          & table > tbody > tr > td:nth-last-child(1) {\n            padding: 5px;\n            border-radius: 0px 4px 4px 0px;\n          }\n  \n          & table {\n            border-collapse: separate;\n            border-spacing: 0px 5px;\n  \n            & tbody {\n              color: %CLR_BACKGROUND;\n              background: %CLR_PRIMARY;\n            }\n          }\n        }\n      }\n    ");
    };
    var gtUpdateSettingFromForm = function (e) {
        var _a;
        var updateFormArray = $(e).serializeArray();
        var didUpdate = false;
        for (var _i = 0, updateFormArray_1 = updateFormArray; _i < updateFormArray_1.length; _i++) {
            var data = updateFormArray_1[_i];
            switch (true) {
                case /^gt\-color\-/.test((_a = data.name) !== null && _a !== void 0 ? _a : ""): {
                    if (gtUpdateStyle(data.name.replace(/^gt\-color\-/, ""), data.value))
                        didUpdate = true;
                }
            }
        }
        if (didUpdate)
            window.location.reload();
        return false;
    };
    Script.add("gtUpdateStyle", gtUpdateStyle);
    Script.add("gtUpdateSettingFromForm", gtUpdateSettingFromForm);
    mod.onActivate = function () { return __awaiter(_this, void 0, void 0, function () {
        var root, settings_root;
        return __generator(this, function (_a) {
            root = $("div#content");
            root.before(/*html*/ "\n      <div class=\"gt-header\">\n        <div id=\"my-settings-select\" class=\"header-option selected\">My Settings</div>\n        &nbsp|&nbsp\n        <div id=\"gttools-select\" class=\"header-option\">Goatling Tools</div>\n      </div>\n    ");
            $(".gt-header").after("<div id=\"content\" class=\"gt-settings-container gt-has-header\"></div>");
            root.addClass("gt-settings").find("h2")[0].remove();
            settings_root = $("div#content.gt-settings-container");
            root.attr("id", "my-settings").appendTo(settings_root);
            settings_root.append(/*html*/ "\n      <div id=\"gt-tools-settings\" class=\"gt-settings hidden\">\n        <form id=\"gt-update-settings\" onsubmit=\"return gtUpdateSettingFromForm(this)\">\n        <input class=\"submit\" type=\"image\" src=\"".concat(RES.image.save, "\" value=\"Update\" name=\"gt-submit\">\n        <table id=\"gt-style-settings\">\n          <tbody>\n            <tr>\n              <td>\n                <b>Styling options:</b><br>\n                &nbsp&nbsp<b>-</b> Colors must be a hex value <br>\n                &nbsp&nbsp<b>-</b> An empty field resets the color <br>\n              </td>\n              <td></td>\n            </tr>\n            <tr>\n              <td>Background Color</td>\n              <td><input type=\"text\" value=\"").concat(Style.get("background"), "\" name=\"gt-color-background\"></td>\n            </tr>\n\n            <tr>\n              <td>Primary Color</td>\n              <td><input type=\"text\" value=\"").concat(Style.get("primary"), "\" name=\"gt-color-primary\"></td>\n            </tr>\n\n            <tr>\n              <td>Accent Color</td>\n              <td><input type=\"text\" value=\"").concat(Style.get("accent"), "\" name=\"gt-color-accent\"></td>\n            </tr>\n          </tbody>\n        </table>\n        <!--\n        <table id=\"gt-mods-enabled\">\n          <tbody>\n            <tr>\n              <td><b>Enabled Mods</b><td>\n              <td><td>\n            </tr>\n          </tbody>\n        </table>\n        -->\n        </form>\n      </div>\n    "));
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
            $("#gttools-select").on("click", function () {
                $("#gttools-select").addClass("selected");
                $("#my-settings-select").removeClass("selected");
                $("#my-settings").addClass("hidden");
                $("#gt-tools-settings").removeClass("hidden");
            });
            $("#my-settings-select").on("click", function () {
                $("#my-settings-select").addClass("selected");
                $("#gttools-select").removeClass("selected");
                $("#gt-tools-settings").addClass("hidden");
                $("#my-settings").removeClass("hidden");
            });
            return [2 /*return*/, true];
        });
    }); };
});
Mod.create("inventoryTools", function (mod) {
    mod.runsOn = ["/inventory"];
    mod.onPreload = function () {
        Style.add("\n      div.gt-header {\n        justify-content: space-evenly;\n        & img {\n          margin: 0;\n          width: 14;\n        }\n        & a, a:link, a:visited, a:active {\n          color: %CLR_BACKGROUND;\n        }\n        & a:hover {\n          color: %CLR_ACCENT;\n        }\n      }\n\n      div#content {\n        text-align: center;\n      }\n\n      center > .item-invent {\n        border: 1px dotted;\n        border-color: %CLR_PRIMARY;\n        border-radius: 4px;\n        height: 95px;\n        width: 95px;\n        position: relative;\n\n        & img {\n          height: 70%;\n        }\n\n        & span.item-count {\n          position: absolute;\n          top: 0;\n          right: 0;\n          margin: 5;\n          font-size: 14;\n        }\n\n        & div.item-name {\n          border-radius: 0 0 4px 4px;\n          position: absolute;\n          bottom: 0;\n          width: 100%;\n          padding: 3 0 3 0;\n          margin: 0;\n          background: %CLR_PRIMARY;\n          color: %CLR_BACKGROUND;\n        }\n\n        & a, a:link, a:visited, a:hover, a:active {\n          color: %CLR_PRIMARY;\n        }\n      }\n    ");
    };
    var COUNT_RE = new RegExp("Total Items: ([0-9]+)$");
    var idToRegexp = {
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
    mod.onActivate = function () { return __awaiter(_this, void 0, void 0, function () {
        var root, s, uri, id;
        return __generator(this, function (_a) {
            root = $("div#content");
            s = Settings.get("itemsStacked") ? 2 : 1;
            root.before(/*html*/ "\n      <div class=\"gt-header\">\n        <div id=\"all-items\" class=\"header-option\">\n          <a href=\"/inventory/index/".concat(s, "\">All</a>\n        </div>\n\n        &nbsp|&nbsp\n        <div id=\"food-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/food\">Food</a>\n        </div>\n\n        &nbsp|&nbsp\n        <div id=\"toy-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/toy\">Toys</a>\n        </div>\n\n        &nbsp|&nbsp\n        <div id=\"wearable-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/wearable\">Wearables</a>\n        </div>\n\n        &nbsp|&nbsp\n        <div id=\"atk-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/battle_item_att\">Attacking</a>\n        </div>\n\n        &nbsp|&nbsp\n        <div id=\"def-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/battle_item_def\">Defending</a>\n        </div>\n\n        &nbsp|&nbsp\n        <div id=\"dodge-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/speed_inc\">Dodging</a>\n        </div>\n\n        &nbsp|&nbsp\n        <div id=\"collect-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/collectible\">Collectibles</a>\n        </div>\n\n        &nbsp|&nbsp\n        <div id=\"container-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/container\">Containers</a>\n        </div>\n\n        &nbsp|&nbsp\n        <div id=\"book-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/intel_inc\">Books</a>\n        </div>\n        \n        &nbsp|&nbsp\n        <div id=\"icon-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/usericon\">Icons</a>\n        </div>\n        \n        &nbsp|&nbsp\n        <div id=\"doll-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/pet_look\">Dolls</a>\n        </div>\n        \n        &nbsp|&nbsp\n        <div id=\"potion-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/health_potion\">Potions</a>\n        </div>\n        \n        &nbsp|&nbsp\n        <div id=\"retired-items\" class=\"header-option\">\n          <a href=\"/inventory/index/").concat(s, "/retired\">Retired</a>\n        </div>\n        \n        &nbsp|&nbsp\n        <div class=\"header-option\">\n          <img id=\"toggle-stack\" src=\"").concat(Settings.get("itemsStacked")
                ? RES.image.stacked
                : RES.image.unstacked, "\">\n        </div>\n      </div>\n    "));
            root.addClass("gt-has-header");
            root.find("h2")[0].remove();
            root.find("p").slice(0, 2).remove();
            uri = getUri();
            for (id in idToRegexp) {
                if (idToRegexp[id].test(uri)) {
                    $("div.gt-header > div#" + id).addClass("selected");
                }
            }
            $("center > div.item-invent").each(function (_, item) {
                var _a, _c;
                var text = $(item).text();
                var link = $(item).find("a")[0].href;
                var imag = $(item).find("img")[0].src;
                var count = parseSepInt((_c = (_a = COUNT_RE.exec(text)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _c !== void 0 ? _c : "1");
                text = text.replace(COUNT_RE, "");
                var countElement = "";
                if (count > 1)
                    countElement = "<span class=\"item-count\">x".concat(count, "</span>");
                $("div#content > center").append("\n        <div class=\"item-invent\">\n          <a href=\"".concat(getUri(link), "\">\n            <img src=\"").concat(getUri(imag), "\">\n            ").concat(countElement, "\n          </a>\n          <div class=\"item-name\">").concat(text, "</div>\n        </div>\n      "));
                $(item).remove();
            });
            $("div.header-option > img#toggle-stack").on("click", function () {
                var _a;
                Settings.set("itemsStacked", Settings.get("itemsStacked") ? false : true);
                var trailing = (_a = /^\/inventory\/index\/[0-9](.+)$/.exec(uri)) === null || _a === void 0 ? void 0 : _a[1];
                console.log("Toggling stacks!");
                if (trailing) {
                    mod.logDebug("/inventory/index/".concat(Settings.get("itemsStacked") ? 2 : 1).concat(trailing));
                    window.location.href = "/inventory/index/".concat(Settings.get("itemsStacked") ? 2 : 1).concat(trailing);
                    return;
                }
                mod.logDebug("/inventory/index/".concat(Settings.get("itemsStacked") ? 2 : 1));
                window.location.href = "/inventory/index/".concat(Settings.get("itemsStacked") ? 2 : 1);
            });
            return [2 /*return*/, true];
        });
    }); };
});
Style.add(/*css*/ "\n  /* Alters main content margins, and adds a border to better fit with the changes */\n  /* added by quickbar and sidebar mods */\n  div#wrapper {\n    background: none;\n\n    & div#content {\n      border: 1px solid %CLR_PRIMARY;\n      \n      width: 760px;\n      float: right;\n    }\n  }\n\n  /* Adjust the battle page content to fit better inline*/\n  #content > center > div.battle-grid {\n    padding: 0;\n  }\n\n  div#content.gt-has-header {\n    border-radius: 0px 0px 4px 4px;\n    margin-top: 0;\n  }\n");
Style.load({
    background: "#FFFFFF",
    primary: "#F56A91",
    accent: "#FF80A4",
});
Style.inject();
/**
 * Main Entrypoint
 */
$(function () { return __awaiter(_this, void 0, void 0, function () {
    var csrf, LOGIN_RE, userinfo_link, currency, user_1, prefix;
    var _a, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                Settings.load({
                    itemsStacked: false,
                });
                csrf = null;
                LOGIN_RE = /^\/login\/logout\/([a-zA-Z0-9]+)\/?$/;
                $("div#sidebar > p.navlink > a").each(function (_, e) {
                    var _a;
                    if (csrf)
                        return;
                    var goto = getUri($(e).attr("href"));
                    var found = ((_a = LOGIN_RE.exec(goto)) !== null && _a !== void 0 ? _a : [])[1];
                    if (!found)
                        return;
                    csrf = found;
                });
                if (!(typeof csrf === "string")) return [3 /*break*/, 2];
                userinfo_link = $("div#user-info > span > a");
                currency = (_d = (_c = (_a = $("div#user-info-points")) === null || _a === void 0 ? void 0 : _a.text()) === null || _c === void 0 ? void 0 : _c.replace(/[\s]+/g, ";").split(";")) !== null && _d !== void 0 ? _d : [];
                user_1 = new User(getUri(userinfo_link.attr("href"))
                    .replace("/profile/u/", "")
                    .replace("/", ""), userinfo_link.text());
                user_1.sugarstars = parseSepInt((_e = currency[2]) !== null && _e !== void 0 ? _e : "0");
                user_1.daimonddust = parseSepInt((_f = currency[1]) !== null && _f !== void 0 ? _f : "0");
                user_1.csrf = csrf;
                // Parse out the active goatling from the DOM, if present
                user_1.active =
                    (_j = (_h = (_g = /Welcome\s+[^\s]+\s+-\s+Your\s+active\s+Goatling\s+is\s+([^\s]+)/) === null || _g === void 0 ? void 0 : _g.exec($("div#user-info").text())) === null || _h === void 0 ? void 0 : _h[1]) !== null && _j !== void 0 ? _j : null;
                prefix = null;
                prefix = (_l = (_k = $("div#user-info > span > img")) === null || _k === void 0 ? void 0 : _k.attr("src")) !== null && _l !== void 0 ? _l : null;
                if (prefix)
                    user_1.prefix = getUri(prefix);
                Mod.user = user_1;
                return [4 /*yield*/, user_1.doUpdate()];
            case 1:
                _m.sent();
                setInterval(function () {
                    user_1.doUpdate();
                }, User.UPDATE_WAIT_TIME * 1000);
                _m.label = 2;
            case 2:
                Script.inject();
                Mod.activateAll();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=goatlingtools.user.js.map