// vi:set sw=4
// vi:set ai

// ==UserScript==
// @name            aficionado
// @namespace       slife
// @description     Vote for all members of your Sorority Life house
// @copyright       2009-2010, aficionado
// @license         EUPL v.1.1; http://www.osor.eu/eupl/european-union-public-licence-eupl-v.1.1
// @version         1.4.1
// @require         http://userscripts.org/scripts/source/49700.user.js
// @require         http://userscripts.org/scripts/source/50018.user.js
// @include         http://apps.facebook.com/sororitylife/*
// @include         http://*/prod_facebook/sisters/sororitywars/*
// @history         Made 'already running' popup less annoying
//
//                  1.4.1             More (un-)pausing glitches fixed to
//                                    make 'already running' popup less annoying
// Bataille Québec  1.4, 31.dec.2009  Fixed preference dialog 'reset to default'
//                                    Fixed issue with previous 'involve user' update
//                                    Fixed issue reanimating a 'paused' script
//                                    Added options to optimize the speed of voting
//
// Kon-Tiki         1.3, 28.dec.2009  Made script more robust (involve user)
//                                    Do not leave whiteboard message by default
//                                    Changed UserScript updater
//                  in memory of: Knut Magne Haugland (23.Sep.1917 – 25.Dec.2009)
//
// Candy Cane       1.2, 24.dec.2009  Fixed glitch in graphics
//
// Abominable Snow  1.1, 23.dec.2009  Added option to not leave a message
//                                    Added option to auto pause after a vote cycle
//
// Sexbomb          1.0, 21.dec.2009  Initial public release
// ==/UserScript==

const DEBUG = 1;

var userAgent = navigator.userAgent.toLowerCase();

// greasemonkey compatibility
if ('undefined' == typeof(unsafeWindow)) {
    unsafeWindow = window;
}

if ('undefined' == typeof(unsafeWindow.console)) {
    GM_log("Welcome!");
    if (DEBUG) GM_log("INFO: Debug output can be seen in Firebug console.");
}

var message = { 
    log   : function (text) {
                if (DEBUG && unsafeWindow.console) unsafeWindow.console.log(text);
            },
    info  : function (text) {
                if (DEBUG && unsafeWindow.console) unsafeWindow.console.info(text);
            },
    warn  : function (text) {
                if (DEBUG && unsafeWindow.console) unsafeWindow.console.warn(text);
            },
    error : function (text) {
                if (unsafeWindow.console) unsafeWindow.console.error(text);
                else GM_log(text);
            }
}; // message function library

// google chrome compatibility support
//
// see also:
// http://src.chromium.org/viewvc/chrome/trunk/src/chrome/renderer/resources/greasemonkey_api.js
var is_chrome = /chrome/.test( userAgent );
var is_version = (userAgent.match( /.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/ ) || [])[1];
if (is_chrome && (4 <= parseInt(is_version))) {
    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    } // GM_deleteValue

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    } // GM_setValue

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value) return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    } // GM_getValue
}

// taken from version 0.3 of http://userscripts.org/scripts/review/29102 (unlicensed)
// ---------- userscript updater  ---------------------------------------------
// but changed somewhat (TM)
var userscriptUpdater = function() {
    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }"; // css

    var config = {
        checkInterval: 86400, // default check interval: check once a day [in seconds]
        prefix:     "usoup-", // used during storage operations
        injectInto: document.getElementsByTagName("body")[0], // default dom-node for the updater-message to be inserted
        updaterCss: css // default styles of updater message
    }; // config
    var lastCheck   = GM_getValue(config.prefix+"lastCheck", 0);
    var lastVersion = GM_getValue(config.prefix+"lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)[\r\n]/,
        change:     /@history\s+(.*)[\r\n]/,
        deprecated: /@deprecated\s+(.*)[\r\n]/
    };
    var updater;

    // check remote userscript for version
    var checkRemoteUserscript = function() {
        GM_xmlhttpRequest( {
            method:  "GET",
            url:     "http://userscripts.org/scripts/source/" + config.scriptId + ".meta.js",
            headers: {"Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue(config.prefix+"lastCheck", currentTime);
                for (m in meta) {
                    meta[m] = (meta[m].exec(resp.responseText) ?
                               meta[m].exec(resp.responseText)[1] : null);
                }
                if (isNewer(meta.version, config.currentVersion) &&
                    isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                    usoLink = document.getElementById("uso_update_perform");
                    if (usoLink) {
                        usoLink.addEventListener("click", doingUpdate, false);
                    }
                }
            }
        });
    }; // checkRemoteUserscript

    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p) {
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp) {
            if (parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if (parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if (parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    }; // isNewer

    var doingUpdate = function(ev) {
        config.injectInto.removeChild(updater);
        alert("You have to reload this page once you updated the UserScript!");
    }; // doingUpdate

    // skip current update until next
    var skipUpdate = function(ev) {
        ev.preventDefault();
        GM_setValue(config.prefix+"lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    }; // skipUpdate


    // initialization
    var initialize = function(options) {
        for (prop in options) {
            if (options[prop]) {
                config[prop] = options[prop];
                if ('prefix' == prop) {
                    lastCheck   = GM_getValue(config.prefix+"lastCheck", 0);
                    lastVersion = GM_getValue(config.prefix+"lastVersion", 0);
                }
            }
        } // for-loop
        if (currentTime > (lastCheck + config.checkInterval)) {
            checkRemoteUserscript();
        }
    }; // initialize


    // build updater message and inject into DOM
    var build = function() {
        var updater = document.createElement("div");
        updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
        hide.className = "greasemonkey_updater_link_to_hide";
        if (meta.depricated == null) {
            var a_hide = document.createElement("a");
            a_hide.href = "";
            a_hide.addEventListener("click", skipUpdate, false);
            var a_span = document.createElement("span");
            a_span.appendChild(document.createTextNode("Skip until next Update!"));
            a_hide.appendChild(a_span);
            hide.appendChild(a_hide);
        }
        var h1 = document.createElement("h1");
        h1.appendChild(hide);
        h1.appendChild(document.createTextNode(meta.deprecated == null ?
                        "Greasemonkey UserScript Update Notification!" :
                        "Deprecated Greasemonkey UserScript!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if (meta.deprecated == null) {
            var text = "There is an update available for " +
                "<a href=\"http://userscripts.org/scripts/show/" +
                config.scriptId + "\">" + meta.name + "</a>.<br>";
            text += meta.change ? "<br>&nbsp; &nbsp; " + meta.change + "<br><br>" : "";
            text += "You are currently running version <b>" + 
                config.currentVersion + "</b>, the newest version on " + 
                "userscripts.org is <b>" + meta.version + "</b>!<br>" +
                "<a href=\"http://userscripts.org/scripts/source/" +
                config.scriptId + ".user.js\" id=\"uso_update_perform\" " + 
                "target=\"_blank\">Update to Version " + meta.version + "</a>";
        } else {
            var text = "The userscript " +
                "<a href=\"http://userscripts.org/scripts/show/" +
                config.scriptId + "\" target=\"_blank\">" + meta.name +
                "</a> is now deprecated.<br>";
            text += meta.deprecated && meta.deprecated != "true" ? "<br>" +
                meta.deprecated + "<br><br>" : "";
            text += "Please remove your script! Thanks for using it.";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) :
                 config.injectInto.appendChild(updater));
        return updater;
    }; // build

    return { init: initialize };
}();


//message.log(document.URL);


// game page variables
var REQUEST_DESTINATION_URL  = "request_destination_url";
var RESOURCE_DESTINATION_URL = "resource:destination_url";
var QUERY_STRING = "";

// global private aficionado script variables
var fadeMainPage = true;  // in case of GM_config
var my_user_id = 12345678; // facebook user id
var ballot = new Array();
var nick = new Array();

var today = new Date();
var weekday = new Array("Sunday","Monday","Tuesday","Wednesday", 
                        "Thursday","Friday","Saturday");
var dayname = weekday[today.getDay()];

// utility routine collection
function isValid(a) {
    return (a != undefined && a != null)
}
function isInvalid(a) {
    return ((a == undefined) || (a == null))
}
function wait(c,f) {
   if (c()) f()
   else window.setTimeout(function (){wait(c,f)},300,false);
}

var hmi = {
    settingsOpen: false,
    initialized: false,
    defaultThumb: 'http://static.ak.fbcdn.net/pics/q_silhouette.gif',
    infoIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADPUlEQVR42l3Te2wMQRwH8O++aTV1WjmttueupSIedWiaqJL7QyQETdoQJyIIEsQrErlS0Wg9KooQkYq/LogSCeKt8QwSjcQj+INzrfbu2nu0d1drd293ze4FZZJNdnZmPzO/38yPwn/N5/PbOY5dJwiCS9N1u64DFHSfKIrtsqycmzChxDd0PvX7xe/3MzTNNiRF7PK2dXDPX/kQjSbNsVGjMjG73IEVNWUKz6aaNVWtLy0dr/4BOju7GJ7n224/+VZ9/OxjWMgP3DAO+u9VyIsiKeiPDmLr+irMK8+7JstyrYGYQE8g2HjnWaen5fxT5FizkaJpVDpt2La83ASOnm7HK38ErKYhHBzAtjWVqHKObhpf4qijurt77AmJ/rx4y0UuZ8xIKAwNjaYwf+Y47HNXmEB9yz087IyCUTVwBIkE+nGlpVYRKKmUCofDjQe8bzztb/xghwsAAUCArEwBedkZJhDoSyChpACNxKKqUEUZrrIibK2e2ETF4/EX5Z5bFRkCC8gyARhIZKJragFOrp1tAjsO3ca9njgEhnRSGiDwEKUUHu11vaRiA/GgY/t1q91hhdY/gO+RQYQHFbjnlMC7ea4JrG+4idYPQeRm8CjIyQRtyYbvSxAfDy0IpYGdN6w2xxh86fuBRKTf3Ka7shjejZVp4MAttH7qI6ExyMrNRnFuJvxfA/h4kADJZPKFs/5uRYIbhkDSCIGEQm6P25kP7+oZaeDwfbR+F83cIKUiL4tHliziuWceCSEWa/Rc+eA52xGERtFmDozHPbMA3pXT0kDzwzRATsDYHa1r2OC0om5hcRPV29tnj0jU52n773Myy5nbBLkH7lmF8K6angaOPEBr1480oKngFQUde1zKCOpnqXmRItFY46XXQc+my28BlgBkJ0vL8nGiZooJ7D7zFBe7CUBWBjnOU8umYsmkkU2FBfl1JhAKhRheENouvA5Vb7/6DrJx3hQ1pFR0My886R4jaM1kyzVJkmpttiL1TzEZCMvxDb2ivuvko2/czfdBdMVEc6zQMhyLJluxucqmWFi1OaXI9UVFhX+LaWgzcmKUM8dxLkXV7cY3htJ9pJTbJVk+NzY/759y/gUON2pDlqRajwAAAABJRU5ErkJgggo=",
    voteIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKGRYYMCItkMQAAAQbSURBVDgRARAE7/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAP8AAAD9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYAAADkAAAAjwAAAAIAAAAAAAAAAAAAAEUAAAD6AAAAzwAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeXl5xQMDA/8AAAD/MzMz3s7OztXOzs7VGxsb7gAAAP8sLCz/pKSktAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADOzs7VioqK/wAAAP8AAAD/m5ub/83Nzf8AAAD/AAAA/7q6uv/Ozs7VAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM7OztX+/v7/UFBQ/wAAAP8XFxf/Tk5O/wAAAP8sLCz//////87OztUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzs7O1f/////u7u7/IiIi/wAAAP8AAAD/AAAA/5CQkP//////zs7O1QAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAABEREQCurq4ADQ0NAAAAAAAEBAQAW1tbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8vLwAjIyMAAAAAAPz8/ACUlJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2dnZANDQ0AADAwMAAAAAAIGBgQAJCQkARkZGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADOzs7V//////////+AgID/AAAA/21tbf/Jycn/Hh4e/wAAAP9GRkbcAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAM7OztX//////////zk5Of8ODg7/5eXl///////x8fH/fn5+/xkZGf8AAABnAAAAAAAAAAAEAAAAAAAAAAAAAAAA2dnZ3AAAAAD5+fkG2dnZJHt7e93p6en56enpAAAAAABQUFAAKCgo3VpaWp0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoAAADiAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAADsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL2fvRn+8AXEAAAAAElFTkSuQmCC",
    startImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLARQjDwOw0G8AAAFGSURBVDjL3dE9S0JhFAfw89zn5TxxyyGhJGzrRSIv5BA056ZDDiqlV6P6DA1pRVNr9SF6WQL3IJRLW7SE0L3htbUEe1uucrmtoaXUVv/xcPjx5xyAPx/aOdDzmU2/f/itbj88/gooFApbsVh8f3JqYlQi3ljW/fuPgFQqmR8aVKcjc5H5UCiUC4wF2tHF6G2lUml/BShdImUMJYLTciA4HhzZWFs/CGuzVzu7xbhhGLwvwDljUg6AEAJQIChUAU0La4mlRMmu185PTo9nPu+zTkAIwSRKUKgCnHGglILruuA4LZBSMgAgPQEUyBhjwDkHzjl4ngfVavXuqdHYzqxkS4SQVk+Aca544AEigmlZTduuHaZTy0eI2Mxm9P5HBPDg5fm1fVkun6mqupDTV/cQsfndG7samKZ57fP5iulk+oIQ4sL/zweSs1ufOLjJEAAAAABJRU5ErkJggg==",
    pauseImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLARQiJcEQKPgAAAFJSURBVDjL3ZJNTgJBEIVfdVc3U8OQEJgmhHgKfhJ6DqSew+g5NB5A421mL+gk8rNCAhkZN6AMInutXb2q91UlVcCfDzqSy16+BACllERRRPV6ncIwXKRpWuwa+AAgd/e38ziO7Ww6W1+cXzacc3R9czVtNmM7mbytHx+e2mmazncGte+u1WoUN2MrQQXOOdvr9cxwOLSxczaKqnCuZb33Zt9T2mAwGBhjGEEQIM/fkSSJ6XQ6irWGBAFWqzVOArz3hpkRhlUslyt470273VbvywUCEfBigX6/XwKoQ4DWGiICZo0kSUy322VmhohAa4aI0EkAkULFVqA1o9VqKWstGWZIINBa/zhjCdBoNBQBICIQfQ9SWsMYU9J+O2PxmmU5KcVZluUACgAYjZ7zzWbDL+Pxl3b0kYqi0ADOtnoBYLQtlTQi+sD/iU8MyFGrluX8IwAAAABJRU5ErkJggg==",
    preferenceImage: "data:image/png;base64,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",

    addStyle: function() {
        GM_addStyle(
            "#aficionadoStatus {background-color: #111111; min-height: 1px; min-width: 1px; max-width: 400px; z-index: 100; position: absolute; border: 2px solid white; padding: 5px;  -moz-border-radius: 5px; opacity: 0.75; -moz-opacity: 0.75; -khtml-opacity: 0.75;}"
        ); // GM_addStyle
        GM_addStyle(
            "#aficionadoProgress {float: left; width: 180px; border: 1px solid #FFFFFF; margin-bottom: 0.5em; padding: 2px; position: relative; text-align: left; display: block; color: white; background-color: black; font-size: xx-small;} #aficionadoProgress .progressBar {background-color: #E12966; padding-left: 1px; height: 10px; overflow: visible;}"
        ); // GM_addStyle
	GM_addStyle(
            "#aficionado .eventTime {color:#888; font-size: 11px; width: 80px;  float: left;} #aficionado .eventBody {width: 565px; float: right;} #aficionado .eventTime #aficionado .eventBody {} #aficionado .eventBody .good {color: #52E259; font-weight: bold;} #aficionado .eventBody .bad {color: #EC2D2D; font-weight:bold;} #aficionado .eventBody .warn {color:#EC2D2D;} #aficionado .eventBody .ballot {color:gold;} #aficionado .eventBody .user {color:red;font-weight:bold;} #aficionado .clear{clear:both} #aficionado .logEvent.Icon {background-repeat: no-repeat; background-position: 70px;}"
	); // GM_addStyle

        GM_addStyle(
            ".aficithumb {font-style: normal; font-size: x-small; text-align: left; color: white;}"
        ); // GM_addStyle
    }, // addStyle

    initialize: function() {
        //GM_log(document.URL + " :: HMI.initialize :: " + this.initialized);
        if (!this.initialized) {
            this.addStyle();

            var prefsParentElt = null;
            var prefsStyle = "height: 21px; width: 21px; cursor: pointer; position: relative;";
            var className = "playerStatusDiv";
            var q = document.evaluate(".//div[@class='" + className + "']",
                document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            if(q && q.singleNodeValue) {
                prefsParentElt = q.singleNodeValue;
                var prefsLocLeft = prefsParentElt.offsetWidth + 475;
                var prefsLocTop = -prefsParentElt.offsetHeight - 10;
                prefsStyle += " top: " + prefsLocTop + "px; ";
                prefsStyle += "left: " + prefsLocLeft + "px;";
                //GM_log(">> prefsStyle :. " + prefsStyle);
                /*
                GM_log(">> offsetWidth :. " + prefsParentElt.offsetWidth);
                GM_log(">> offsetHeight :. " + prefsParentElt.offsetHeight);
                GM_log(">> offsetLeft :. " + prefsParentElt.offsetLeft);
                GM_log(">> offsetTop :. " + prefsParentElt.offsetTop);
                */

	        var aficionadoStatusDiv = prefsParentElt.appendChild(
	            document.createElement('div'));
                aficionadoStatusDiv.setAttribute('id', 'aficionadoStatus');
                aficionadoStatusDiv.setAttribute('class', 'aficionadoStatusDiv');
                aficionadoStatusDiv.setAttribute('style',
                    'height: 63px; width: 225px; left: 390px; top: 47px');

	        var prefsIcon = aficionadoStatusDiv.appendChild(  
	            document.createElement('img'));
                prefsIcon.setAttribute('id', 'ap_prefs');
                prefsIcon.setAttribute('title', 'Preferences...');
                prefsIcon.setAttribute('style', 'float: right;');
                prefsIcon.setAttribute('src', this.preferenceImage);
                prefsIcon.href="javascript:void(0);";
                //prefsIcon.addEventListener('click', hmi.toggleLogs, false);
                prefsIcon.addEventListener('click', GM_config.open, false);

                var paused = GM_getValue(my_user_id + "-votePaused", false);
                var startstopImage;
                var startstopTitle;
                if (paused) {
                    startstopImage = this.startImage;
                    startstopTitle = 'Resume Voting';
                } else {
                    startstopImage = this.pauseImage;
                    startstopTitle = 'Pause Voting';
                }
	        var pauseButton = aficionadoStatusDiv.appendChild(  
	            document.createElement('img'));
                pauseButton.setAttribute('id', 'ap_startstop');
                pauseButton.setAttribute('title', startstopTitle);
                pauseButton.setAttribute('src', startstopImage);
                pauseButton.setAttribute('style', 'float: right;');
                pauseButton.href="javascript:void(0);";
                pauseButton.addEventListener('click', hmi.pauseVoting, false);

	        var aficionadoProgressDiv = aficionadoStatusDiv.appendChild(
	            document.createElement('div'));
                aficionadoProgressDiv.setAttribute('id', 'aficionadoProgress');
                aficionadoProgressDiv.setAttribute('class', 'aficionadoProgress');
	        var aficionadoMeterDiv = aficionadoProgressDiv.appendChild(
	            document.createElement('div'));
                aficionadoMeterDiv.setAttribute('id', 'aficionadoMeter');
                aficionadoMeterDiv.setAttribute('class', 'progressBar');
                aficionadoMeterDiv.setAttribute('style', 'width: 0%;');
                aficionadoMeterDiv.setAttribute('title', 'aficionado');
	        var aficionadoMeterTxt = aficionadoProgressDiv.appendChild(
	            document.createElement('span'));
                aficionadoMeterTxt.setAttribute('id', 'aficionadoMeterText');
                aficionadoMeterTxt.setAttribute('class', 'progressText');
                aficionadoMeterTxt.setAttribute('style', 'position: absolute; top: 2px; right: 2ex');

	        var aficionadoYacketyYakDiv = aficionadoStatusDiv.appendChild(
	            document.createElement('div'));
                aficionadoYacketyYakDiv.setAttribute('id', 'aficionadoBabble');
                aficionadoYacketyYakDiv.setAttribute('class', 'aficionadoBabble');
                aficionadoYacketyYakDiv.setAttribute('style', 'clear: both; overflow: hidden; height: 45px;');

	        var aficionadoBabbleDiv = aficionadoYacketyYakDiv.appendChild(
	            document.createElement('div'));
                aficionadoBabbleDiv.setAttribute('class', 'aficithumb');
                aficionadoBabbleDiv.setAttribute('style', 'display: block;');

	        var aficionadoBabblePic = aficionadoBabbleDiv.appendChild(
	            document.createElement('a'));
                aficionadoBabblePic.setAttribute('class', 'aficithumb_image');
                aficionadoBabblePic.setAttribute('style', 'margin-right: 8px; float: left;');
                aficionadoBabblePic.setAttribute('title', 'aficithumb_title');
                aficionadoBabblePic.href="javascript:void(0);";

	        var aficionadoBabbleImg = aficionadoBabblePic.appendChild(
	            document.createElement('img'));
                aficionadoBabbleImg.setAttribute('id', 'aficithumb');
                aficionadoBabbleImg.setAttribute('width', '40px');
                aficionadoBabbleImg.setAttribute('height', '40px');
                aficionadoBabbleImg.setAttribute('src', hmi.defaultThumb);

	        var aficionadoBabbleTxt = aficionadoBabbleDiv.appendChild(
	            document.createElement('div'));
                aficionadoBabbleTxt.setAttribute('style', 'display: table-cell; vertical-align: top;');
	        var aficionadoBabbleTxtAction = aficionadoBabbleTxt.appendChild(
	            document.createElement('div'));
                aficionadoBabbleTxtAction.setAttribute('id', 'aficithumb_action');
                aficionadoBabbleTxtAction.setAttribute('class', 'aficithumb');
                aficionadoBabbleTxtAction.setAttribute('style', 'padding-top: 1em;');
                aficionadoBabbleTxtAction.appendChild(document.createTextNode('Hello'));

	        var aficionadoBabbleTxtName = aficionadoBabbleTxt.appendChild(
	            document.createElement('div'));
                aficionadoBabbleTxtName.setAttribute('id', 'aficithumb_name');
                aficionadoBabbleTxtName.setAttribute('class', 'aficithumb');
                aficionadoBabbleTxtName.setAttribute('style', 'font-style: italic');
                aficionadoBabbleTxtName.appendChild(document.createTextNode('aficionado'));

                this.createAficionadoLogBox();

                this.initialized = true;
            } else {
                //GM_log("-- playerStatusDiv...");
                window.setTimeout(function () {
                    hmi.initialize();
                }, (slife.waitMilliSecs * 1));
                return;
           }
        }
    }, // initialize

    autoVoteButtonCheck: function(force) {
        var m_names = new Array('Jan', 'Feb', 'Mar',
            'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec');
        var title = '';
        if (force == undefined) {
            if (undefined == GM_getValue(my_user_id+"-autoVote")) {
                force = true;
            } else {
                force = false;
                var then = new Date();
                then.setTime(GM_getValue(my_user_id+"-autoVote"));
                var timestampdate = then.getDate() + '.' + m_names[then.getMonth()];
                var timestamptime = (then.getHours() < 10 ? '0' : '') +
                    then.getHours() + ':' +
                    (then.getMinutes() < 10 ? '0' : '') +
                    then.getMinutes() + ':' +
                    (then.getSeconds() < 10 ? '0' : '') +
                    then.getSeconds();
                title = timestampdate + ' ' + timestamptime;
            }
        }
        var autoVoteButton = GM_config.frame.contentDocument.getElementById('field_autoVote');
        if (autoVoteButton) {
            autoVoteButton.disabled = force;
            autoVoteButton.title = title;
        } else {
            GM_log("autoVoteButton NOT found.");
        }
    }, // autoVoteButtonCheck

    autoVoteReset: function() {
        GM_log('autoVoteReset...');
        window.setTimeout(GM_deleteValue, 0, my_user_id+"-autoVote"); 
        autoVoteButtonCheck(true);
    },  // autoVoteReset

    ballotReset: function() {
        GM_log('ballotReset...');
        window.setTimeout(GM_deleteValue, 0, my_user_id+"-ballot"); 
        window.setTimeout(GM_deleteValue, 0, my_user_id+"-nicks"); 
    }, // ballotReset

    createAficionadoLogBox: function() {
        //GM_log("create aficionado log box for FB user " + my_user_id);

        if (my_user_id == 12345678) {
            GM_log("FB user ID hasn't been set yet... try again later.");
            return;
        }
        var aficionadoLog = document.getElementById('logBox');
        if (aficionadoLog) {
            GM_log("aficionado log box already exists.");
            return;
        }

        GM_config.init(
            'aficionado configuration',{
                leaveNote:  { label: 'Leave Vote Note',
                              title: 'Check to leave a note for each sister on her Sorority Board',
                              type:  'checkbox', _def: false, default: false},
                voteNotice: { label: 'Note to leave for sister:',
                              title: 'Note to leave for sister (%D - weekday, %N - name of sister)',
                              type:  'textarea', cols:60, rows:5,
                              _def: '%D vote for %N', default: '%D vote for %N' },
                autoPause:  { label: 'Auto Pause',
                              title: 'Check to not automagically restart voting',
                              type:  'checkbox', _def: false, default: false },
                autoVote:   { label: 'Neglect Last Vote Date',
                              title: '',
                              type:  'button', script: 'hmi.autoVoteReset()' },
                ballotRefresh: { label: 'Reset Ballot',
                              title: 'Triggers a new census before the next poll',
                              type:  'button', script: 'hmi.ballotReset()' },
                randomize:  { label: 'Randomize Voting',
                              title: 'Add a random delay between votes',
                              type:  'checkbox', _def: false, default: false },
                randomMin:  { label: 'Minimal delay:',
                              title: 'Minimal delay in seconds between votes',
                              type:  'int', default: 8, size: 4 },
                randomMax:  { label: 'Maximal delay:',
                              title: 'Maximal delay in seconds between votes',
                              type:  'int', default: 30, size: 4 },
            }, // config data
            //GM_config.eCSS,
            {
            open: function() {
                //GM_log("^^^ open...");
                hmi.autoVoteButtonCheck();  // disable/enable button click
                GM_config.localizeButtons();
                GM_config.resizeFrame('80%','432px');
                if (fadeMainPage) GM_config.fadeOut();
                }, // open
            save: function() {
                //GM_log("^^^ save...");
                window.setTimeout(function() {
                    //GM_log("sg voteNotice. " + GM_config.get('voteNotice'));
                    slife.VoteNoticeSet(GM_config.get('voteNotice'));
                    if ("" == GM_config.get('voteNotice')) {
                        //GM_log(">>> vote notice <empty>; disable vote note");
                        GM_setValue(my_user_id+"-leaveNote", false);
                    } else {
                        GM_setValue(my_user_id+"-leaveNote", GM_config.get('leaveNote'));
                    }
                    GM_setValue(my_user_id+"-autoPause", GM_config.get('autoPause'));
                    }, 0);
                }, // save
            close: function() {
                //GM_log("^^^ close...");
                if (fadeMainPage) GM_config.fadeIn();
                }  // close
            }
        );
        // backward compatibility (start)
        GM_config.set('voteNotice', slife.VoteNoticeGet());
        GM_config.set('leaveNote', GM_getValue(my_user_id+"-leaveNote", false));
        GM_config.set('autoPause', GM_getValue(my_user_id+"-autoPause", false));
        // backward compatibility (end)

	// add backround 'event icons'
	GM_addStyle("#aficionado .logEvent.info.Icon{background-image:url("
		+ hmi.infoIcon + ")"
		); // GM_addStyle
	GM_addStyle("#aficionado .logEvent.vote.Icon{background-image:url("
		+ hmi.voteIcon + ")"
		); // GM_addStyle

	body = document.getElementsByTagName('body')[0];
	mainF = document.getElementById('mainFrame');
        if (mainF) {
            //GM_log("mainFrame found");
            body = mainF;
        } else {
            GM_log("mainFrame not FOUND");
        }
	var aficionadoBox = body.appendChild(document.createElement('div'));
	aficionadoBox.setAttribute('id', 'aficionado');
	aficionadoBox.setAttribute('class', 'wishlistMainMenuDiv clearfix');
        aficionadoBox.setAttribute('style', 'display: none; height: 280px; font-size: 10px;');

	// pause vote button
	var pauseButtonClass = aficionadoBox.appendChild(document.createElement('div'));
	var pauseButton = pauseButtonClass.appendChild(document.createElement('a'));
        pauseButton.setAttribute('class', 'slbutton_medium slbutton_pink');
        pauseButton.setAttribute('style', 'overflow: hidden;');
        pauseButton.href="javascript:void(0);";
	var pauseText = pauseButton.appendChild(document.createElement('span'));
	pauseText.setAttribute('style', 'white-space: nowrap; font-weight: bold;');
        pauseText.setAttribute('id', 'pauseText');
        var paused = GM_getValue(my_user_id + "-votePaused", false);
        var stringBuffer = ' Voting';
        if (paused) {
            stringBuffer = 'Resume' + stringBuffer;
        } else {
            stringBuffer = 'Pause' + stringBuffer;
        }
	pauseText.appendChild(document.createTextNode(stringBuffer));
        pauseButtonClass.addEventListener('click', hmi.pauseVoting, false);

	// clear aficionado log button
	var clearButtonClass = aficionadoBox.appendChild(document.createElement('div'));
	var clearButton = clearButtonClass.appendChild(document.createElement('a'));
        clearButton.setAttribute('class', 'slbutton_medium slbutton_pink');
        clearButton.setAttribute('style', 'overflow: hidden; float: right;');
        clearButton.href="javascript:void(0);";
	var clearText = clearButton.appendChild(document.createElement('span'));
	clearText.setAttribute('style', 'white-space: nowrap; font-weight: bold;');
	clearText.appendChild(document.createTextNode('Clear aficionado log'));
        clearButtonClass.addEventListener('click', hmi.clearAficionadoLog, false);

        spacer = aficionadoBox.appendChild(document.createElement('div'));
        spacer.setAttribute('style', 'float: right;');
	spacer.innerHTML = '&nbsp; &nbsp; ';

	// hide aficionado log button
	var hideButtonClass = aficionadoBox.appendChild(document.createElement('div'));
	var hideButton = hideButtonClass.appendChild(document.createElement('a'));
        hideButton.setAttribute('class', 'slbutton_medium slbutton_pink');
        hideButton.setAttribute('style', 'overflow: hidden; float: right;');
        hideButton.href="javascript:void(0);";
	var hideText = hideButton.appendChild(document.createElement('span'));
	hideText.setAttribute('style', 'white-space: nowrap; font-weight: bold;');
	hideText.appendChild(document.createTextNode('Hide aficionado log'));
        hideButtonClass.addEventListener('click', hmi.toggleLogs, false);

        // log box
        aficionadoLog = aficionadoBox.appendChild(document.createElement('div'));
        aficionadoLog.setAttribute('id', 'logBox');
        aficionadoLog.setAttribute('style', 'clear: both; overflow: auto; background-color: #111111; font-size:11px; color: #BCD2EA; text-align: left; height: 240px; padding: 5px;');
        aficionadoLog.innerHTML = GM_getValue(my_user_id + '-voteLog', '');
    }, // createAficionadoLogBox

    makeElement: function(type, appendto, attributes, checked, chkdefault) {
        var element = document.createElement(type);
        if (attributes != null) {
            for (var i in attributes) {
                element.setAttribute(i, attributes[i]);
            }
        }
        if (checked != null) {
            if (GM_getValue(checked, chkdefault) == 'checked') {
                element.setAttribute('checked', 'checked');
            }
        }
        if (appendto) {
            appendto.appendChild(element);
        }
        return element;
    }, // makeElement

    pauseVoting: function() {
        var paused = GM_getValue(my_user_id + "-votePaused", false);
        //message.log("PauseVoting: ### saved   = " + paused);
        paused = !(paused);
        //message.log("PauseVoting: ### now/new = " + paused);
        GM_setValue(my_user_id + "-votePaused", paused);

        var remainingBallots = parseInt(GM_getValue(my_user_id + '-ballotsRemaining', 0));
        message.log("PauseVoting: ### remainingBallots = " + remainingBallots);
        if (paused) {
            //message.log("### voting paused.");
            GM_deleteValue(my_user_id + "-isRunning");
            window.setTimeout(function() {slife.PauseElection();}, 0);
        } else {
            //message.log("### (if possible) resume voting shortly...");
            var appraisal = slife.appraiseElection();
            if (appraisal) {
                window.setTimeout(function() {
                    if (0 == remainingBallots) {
                        GM_deleteValue(my_user_id + '-ballotsRemaining');
                    }
                    slife.ResumeElection();
                    }, 50);
            } else {
                message.info("### (no appraisal) resume voting not possible");
            }
        }

        var stringBuffer = ' Voting';
        var pauseText = document.getElementById('pauseText');
        if (pauseText) {
            var logLen = pauseText.childNodes.length;
            //GM_log("pauseText child nodes = " + logLen);
            if (paused) {
                stringBuffer = 'Resume' + stringBuffer;
            } else {
                stringBuffer = 'Pause' + stringBuffer;
            }
            pauseText.replaceChild(document.createTextNode(stringBuffer),
                pauseText.firstChild);
        } // pauseText
        var pauseButton = document.getElementById('ap_startstop');
        if (pauseButton) {
            if (paused) {
                pauseButton.src = hmi.startImage;
            } else {
                pauseButton.src = hmi.pauseImage;
            }
            pauseButton.title = stringBuffer;
        } // pauseButton
    }, // PauseVoting

    clearAficionadoLog: function() {
        //GM_log("clearAficionadoLog ...");
        GM_setValue(my_user_id + '-voteLog', '');
        var aficionadoLogBox = document.getElementById('logBox');
        if (aficionadoLogBox) {
            aficionadoLogBox.innerHTML = GM_getValue(my_user_id + '-voteLog', '');
        }
    }, // clearAficionadoLog

    showAficionadoLog: function() {
        //GM_log("showAficionadoLog ...");
        var aficionadoLog = document.getElementById('aficionado');
        if (aficionadoLog) {
            aficionadoLog.style.display = 'block';
        }
    }, // showAficionadoLog

    hideAficionadoLog: function() {
        //GM_log("hideAficionadoLog ...");
        var aficionadoLog = document.getElementById('aficionado');
        if (aficionadoLog) {
            aficionadoLog.style.display = 'none';
        }
    }, // hideAficionadoLog

    toggleLogs: function() {
        //GM_log("toggleLogs ...");
        if (hmi.settingsOpen === false) {
            //GM_log(">> settingsOpen is false");
            hmi.settingsOpen = true;
            if (!document.getElementById('aficionado')) {
                //GM_log(">> try to create aficionado log box...");
                hmi.createAficionadoLogBox();
            } //else GM_log(">> aficionadoBox found.");
            hmi.showAficionadoLog();
        } else {
            //GM_log(">> settingsOpen is true");
            hmi.settingsOpen = false;
            hmi.hideAficionadoLog();
        }
    }, // toggleLogs

    updateAficionadoMeter: function(remaining, total) {
        //GM_log("updateAficionadoMeter ...");
        var stringBuffer;
        var aficionadoMeterTxt = document.getElementById('aficionadoMeterText');
        if (aficionadoMeterTxt) {
            stringBuffer = 'Ballots: ' + remaining + ' / ' + total;
            aficionadoMeterTxt.innerHTML = stringBuffer;
        }
        var aficionadoMeter = document.getElementById('aficionadoMeter');
        if (aficionadoMeter) {
            var percent = 100 - Math.floor(remaining * 100 / total);
            stringBuffer = percent + '%';
            var textNode = document.createTextNode(stringBuffer);
            aficionadoMeter.setAttribute('style', 'width: '+stringBuffer+';');
            if (0 == remaining) {
                stringBuffer = 'aficionado';
            }
            aficionadoMeter.setAttribute('title', stringBuffer);
            if (aficionadoMeter.childNodes.length > 0) {
                aficionadoMeter.replaceChild(textNode, aficionadoMeter.firstChild);
            } else {
                aficionadoMeter.appendChild(textNode);
            }
        }
    }, // updateAficionadoMeter

    yacketyYak: function(thumb, firstLine, secondLine) {
        //GM_log("yacketyYak: [" + thumb + "] " + firstLine + " -- " + secondLine);
        var aficionadoBabbleImg = document.getElementById('aficithumb');
        if (aficionadoBabbleImg) {
            aficionadoBabbleImg.src = thumb;
        }
        var aficionadoBabbleAction = document.getElementById('aficithumb_action');
        if (aficionadoBabbleAction) {
            aficionadoBabbleAction.innerHTML = firstLine;
        }
        var aficionadoBabbleName = document.getElementById('aficithumb_name');
        if (aficionadoBabbleName) {
            aficionadoBabbleName.innerHTML = secondLine;
        }
    }, // yacketyYak

    updateAficionadoCountdown: function() {
        //GM_log("updateAficionadoCountdown ...");

        var cutOff = new Date();
        cutOff.setUTCHours(6);
        cutOff.setUTCMinutes(0);
        cutOff.setUTCSeconds(0);
        var tomorrow = 24 * 60 * 60 * 1000;
        var dateAvailable = new Date();
        dateAvailable.setTime(cutOff.getTime() + tomorrow);

        var now = new Date();
        var timeLeft = dateAvailable.getTime() - now.getTime();
        var e_daysLeft = timeLeft / tomorrow;
        var daysLeft = Math.floor(e_daysLeft);
        var e_hrsLeft = (e_daysLeft - daysLeft) * 24;
        var hrsLeft = Math.floor(e_hrsLeft);
        var minsLeft = Math.floor((e_hrsLeft - hrsLeft) * 60);
        var stringBuffer;
        var aficionadoMeterTxt = document.getElementById('aficionadoMeterText');
        if (aficionadoMeterTxt) {
            var paused = GM_getValue(my_user_id + "-votePaused", false);
            if (paused) stringBuffer = ' Voting possible in ';
            else        stringBuffer = ' Voting starts in ';
            var minsLeftString = ((minsLeft < 10) ? '0' : '') + minsLeft;
            aficionadoMeterTxt.innerHTML = stringBuffer + hrsLeft + ':' +
                                           minsLeftString + ' hours';
        }
        var aficionadoMeter = document.getElementById('aficionadoMeter');
        if (aficionadoMeter) {
            var percent = 100 - (Math.round(e_hrsLeft * 100 / 24));
            if (100 < percent) percent = 100; // just to be save
            if (0 > percent) percent = 0;
            aficionadoMeter.setAttribute('style', 'width: '+percent+'%;');
            stringBuffer = percent + '%';
            var textNode = document.createTextNode(stringBuffer);
            if (aficionadoMeter.childNodes.length > 0) {
                aficionadoMeter.replaceChild(textNode, aficionadoMeter.firstChild);
            } else {
                aficionadoMeter.appendChild(textNode);
            }
        }
    } // countdown

}; // 'hmi' object variable

var slife = {
notice:
    "%D vote for %N",  // %D - weekday; %N - name of sister
ballotThreshold:
    10,     // threshold of new candidates before ballot is refreshed
waitMilliSecs:
    50000,  // wait before checking page again
delayMilliSecs:
    7319,   // delay between votes (and such)
extraStop:
    16,     // add an extra stop/delay every Nth time
makeXMLNotCachedRequest:
    null,   // game function to send requests to server
population:
    0,      // house population
userList:
    null,   // cached user list of game
api:
    null,   // FB API client
usersCounted:
    0,      // number of users already read into cache
voteables:
    0,      // number of ballots in total

AddToLog: function (icon, line) {
    return;
    //GM_log("AddToLog: ### ...");
    // Create a datestamp, formatted for the log.
    var currentTime = new Date();
    var m_names = new Array('Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec');
    var timestampdate = currentTime.getDate() + '.' + m_names[currentTime.getMonth()];

    // Create a timestamp, formatted for the log.
    var timestamptime = (currentTime.getHours() < 10 ? '0' : '') +
        currentTime.getHours() + ':' +
        (currentTime.getMinutes() < 10 ? '0' : '') +
        currentTime.getMinutes() + ':' +
        (currentTime.getSeconds() < 10 ? '0' : '') +
        currentTime.getSeconds();

    // Get a log box to work with.
    var logBox = document.getElementById('logBox');
    if (!logBox) {
        message.warn("AddToLog: ### logBox not found.");
        return;
    }
    var logLen = logBox.childNodes.length;

    // Create the new log entry.
    var lineToAdd = document.createElement('div');
    lineToAdd.className = 'logEvent ' + icon;
    lineToAdd.innerHTML = '<div class="eventTime">' + timestampdate + ' <br/>' +
        timestamptime + '</div><div class="eventBody">' +
        line + '</div><div class="clear"></div>';

    // Put it in the log box.
    logBox.insertBefore(lineToAdd, logBox.firstChild);

    // If the log is too large, trim it down.
    //var logMax = parseInt(GM_getValue(my_user_id + '-voteLogLength', 300));
    var logMax = 5000;
    //GM_log('logLen=' + logLen + ', logMax=' + logMax);
    if (logMax > 0) {
        while (logLen-- > logMax) {
            logBox.removeChild(logBox.lastChild);
        }
    }

    // Save the log
    slife.storeValue("-voteLog", logBox.innerHTML, true);
    }, // AddToLog

storeValue: function(key, value, async) {
    if (async) {
        window.setTimeout(
            function() {
                GM_setValue(my_user_id+""+key, value);
            }, 0
        );
    } else {
        GM_setValue(my_user_id+""+key, value);
    }
    }, // storeValue

VoteNoticeSet: function(notice) {
    GM_setValue(my_user_id+"-voteNotice", notice);
    }, // VoteNoticeSet

VoteNoticeGet: function() {
    this.notice = GM_getValue(my_user_id+"-voteNotice", this.notice);
    return this.notice;
    }, // VoteNoticeSet


AddToBallot: function (sister_id, sister_name) {
	if (sister_name) {
	    ballot.push(sister_id);
	    nick.push(sister_name);
	}
    }, // AddToBallot

greeting: function() {
        //GM_log("HMI greeting... [" + my_user_id + "] (enter)");
        if (isInvalid(slife.api)) {
            GM_log("ERROR: FB API client no accessible (no HMI)");
            return;
        }
        var uids = new Array(my_user_id, my_user_id);
        var fields = new Array('first_name', 'name', 'pic_square');
        slife.api.users_getInfo(uids, fields, function (result, e) {
            if (!e) {
                var first_name = '';
                var pic_url = '';
                if (isInvalid(e)) {
                    first_name = result[0]['first_name'];
                    if (isInvalid(first_name)) {
                        first_name = result[0]['name'];
                    }
                    pic_url = result[0]['pic_square'];
                    if (isInvalid(pic_url)) {
                        pic_url = hmi.defaultThumb;
                    }
                }
                hmi.yacketyYak(pic_url, 'Hello ' + first_name + '!', 'aficionado');
            }
        }); // api.users_getInfo
    }, // greeting

FillBallot: function (sister_id, sister_name, count) {
    //GM_log("### FillBallot ("+sister_id+", "+sister_name+", "+count+")");
    if (isInvalid(slife.api)) {
        GM_log("ERROR: FB API client no accessible (no HMI update during votes)");
        return;
    }
    var uids = new Array(sister_id, sister_id);
    var fields = new Array('first_name', 'name', 'pic_square', 'profile_url');
    slife.api.users_getInfo(uids, fields, function (result, e) {
            var first_name = '';
            var pic_url = '';
            if (!e) {
                first_name = result[0]['first_name'];
                if (null == first_name) {
                    first_name = result[0]['name'];
                }
                pic_url = result[0]['pic_square'];
                if (isInvalid(pic_url)) {
                    pic_url = hmi.defaultThumb;
                }
            }
            window.setTimeout(
                function() {
                    slife.CastBallot(sister_id, sister_name, pic_url, first_name, count);
                }, 0
            );
        }); // api.users_getInfo
    }, // FillBallot

CastBallot: function (sister_id, sister_name, thumb, real_name, count) {
        //message.log("# CastBallot -> " + real_name);
	if (my_user_id === sister_id) return; // don't vote for myself
        var bv = REQUEST_DESTINATION_URL + "/avatar_vote";
        var callback_func = function () {
            slife.LeaveVoteMessage(sister_id, sister_name);
            };
        var leaveNote = GM_getValue(my_user_id+"-leaveNote", false);
        if (!leaveNote) {
            callback_func = function () {
                    slife.SendNotificationAfterVote(my_user_id, sister_id);
                };
        }
        if (0 != sister_name) {
            //message.log("Ballot : " + count + " [" + sister_id + "] " +
            //        real_name + " aka. " + sister_name);
            slife.AddToLog('vote Icon',
                '<span class="ballot">Ballot : ' + count + '</span> ['+
                '<span class="good">' + sister_id + '</span>] ' +
                '<span class="user">' + real_name + ' aka. <i>' +
                sister_name + '</i></span>');
            hmi.yacketyYak(thumb,
                'Vote for ' + real_name + ' aka. <i>' + sister_name + '</i>',
                'Powered by <b>aficionado</b>');
            }
        else callback_func = function () {};
        var ac = {};
        ac.voter_id = my_user_id;
        ac.votee_id = sister_id;
        this.makeXMLNotCachedRequest(bv, callback_func, ac, 1);
    }, // CastBallot

LeaveVoteMessage:
    function (sister_id, sister_name) {
        var comment = this.notice;
        comment = comment.replace("%N", sister_name);
        comment = comment.replace("%N", sister_name);
        comment = comment.replace("%N", sister_name);
        comment = comment.replace("%D", dayname);
        comment = comment.replace("%D", dayname);
        comment = comment.replace("%D", dayname);
        //message.log("LeaveVoteMessage (" + sister_id + ", " + sister_name + ") - " + comment);
        var ac = {};
        ac.user_id = my_user_id;
        ac.target_id = sister_id;
        ac.message = "cstm_" + encodeURIComponent(comment).replace(/%/g, "@");
        this.makeXMLNotCachedRequest(REQUEST_DESTINATION_URL + "/save_comment",
        function (D) {
            slife.SendNotificationAfterVote(my_user_id, sister_id);
        }
        , ac, 1);
    }, // LeaveVoteMessage

SendNotificationAfterVote:
    function (voter_id, votee_id) {
        //message.log("sendNotificationAfterVote (" + voter_id + ", " + votee_id + ")");
        var ac = {};
        ac.voter_id = voter_id;
        ac.to_ids = votee_id;
        ac.type = "aftervote";
        var callback_func = function() { /* GM_log(votee_id, " notified."); */ };
        this.makeXMLNotCachedRequest(RESOURCE_DESTINATION_URL +
            "/send_cust_notification.php?" + QUERY_STRING,
            callback_func, ac, null, "JSON");
    }, // SendNotificationAfterVote

Census: function (num) {
    var reqSize = 250; 
    message.log(">>> Census [district " + num + "] ...");

    // getUsers(i.m_currentLoadedNumUsers, i.m_incrementAmount, f);
    slife.userList.getUsers(slife.usersCounted, reqSize - 1,
        function (f) {
            var B = (f.slice()).slice();
            slife.usersCounted += reqSize;
            if (slife.population > slife.usersCounted) {
                slife.Census(slife.usersCounted);
            } else {
                var nullMembers = 0;
                //GM_log("]]] population :: " + slife.population);
                //GM_log(">>> getUsers B  :: " + B.length + " -> " + B);
                for (var x = 0; x < B.length; x++) {
                    if (B[x]) {
                        var sisName = B[x].getMobName();
                        var sisPic  = B[x].getThumbnailUrl();
                        if (isValid(sisPic) == false) {
                            sisPic = "http://static.ak.fbcdn.net/pics/t_silhouette.jpg"
                        }
                        /*
                        var fbkName = B[x].getName();
                        if (isValid(fbkName) == false) {
                            fbkName = '<<nop>>';
                        }
                        GM_log(x + " ] " + sisName + " - " + B[x].getId() +
                               " FB: " + fbkName + " thumbnail: " + sisPic);
                        */

                        if (sisName) {
                            slife.AddToBallot(B[x].getId(), sisName);
                        } else {
                            //GM_log("XXX s = " + x + " skipped [" + B[x].getId() + "]");
                            nullMembers++;
                        }
                    } else {
                        nullMembers++;
                        //GM_log("XXX x = " + x + " skipped.");
                    }
                } // for-loop

                //GM_setValue(my_user_id+"-nullMembers", nullMembers);
                //window.setTimeout(GM_setValue, 0, my_user_id+"-nullMembers", nullMembers); 
                slife.storeValue("-nullMembers", nullMembers, true);
                //GM_setValue(my_user_id+"-ballot", ballot.join(','));
                //window.setTimeout(GM_setValue, 0, my_user_id+"-nicks", nick.join(',')); 
                slife.storeValue("-nicks", nick.join(','), true);
                //window.setTimeout(GM_setValue, 0, my_user_id+"-ballot", ballot.join(',')); 
                slife.storeValue("-ballot", ballot.join(','), true);
                message.info("Saving internal ballot of " + ballot.length +
                       " done. [" + nullMembers + " invalid/unsaved members]");
                slife.voteables = ballot.length;
                //GM_deleteValue(my_user_id+"-isUpdating");
                window.setTimeout(GM_deleteValue, 0, my_user_id+"-isUpdating"); 
                message.info("]]] Census complete.");
                
                window.setTimeout(function() {slife.CheckPage(0);}, 0);
            }
        } // function(f)
    );
    //GM_log("<<< leaving Census");
    }, // Census

UserConfirmation: function (reason) {
        //message.log("[UserConfirmation] :: ...");
        var messageStr = "The aficionado script seems to be running already!";
        messageStr = messageStr + " " + reason +"\n\n";
        messageStr += "Please click on CANCEL to cancel this script from running,";
        messageStr += "\nor click on OK to reset this script and reload this page.\n\n";
        messageStr += "Running aficionado in two (or more) tabs/windows in parallel ";
        messageStr += "might result in double voting.";
        var run = confirm(messageStr);
        if (run) {
            message.info("[UserConfirmation] :: (OK) reset script.");
            switch (reason) {
                case 'U':
                    // script was in the middle of a census
                default:
                    // "reset" stored values to default
                    GM_deleteValue(my_user_id + "-isUpdating");
                    GM_deleteValue(my_user_id + "-ballot");
                    GM_deleteValue(my_user_id + "-nicks");
                    GM_deleteValue(my_user_id + "-autoVote");
                case 'R': // script was voting
                    GM_deleteValue(my_user_id + "-isRunning");
                    break;
            }
        }
        //message.log("[UserConfirmation] :: end.");
        return run;
    }, // UserConfirmation

CheckRunning: function(count){
        var remainingBallots = parseInt(
            GM_getValue(my_user_id + '-ballotsRemaining', 0));
        message.log("CheckRunning (" + count + ") - " + remainingBallots);

        if (GM_getValue(my_user_id+"-isRunning") == undefined) {
            message.log("CheckRunning: script is not running");
            return;
        }
        if (count > remainingBallots) {
            message.log("CheckRunning: script is active voting");
            return;
        }

        // check with user to continue running (or not)
        var run = slife.UserConfirmation('R');
        if (run) {
            message.log("Got OK to reload page [" +  location.href + "]...");
            count=10;
            location.reload();
        } else {
            message.warn("CANCELing this script.");
        }
    }, // CheckRunning

CheckPage: function (count) {
        //GM_log("Check Page...");
        if (count == undefined) count = 0;

        if ((!(unsafeWindow.GBL)) || (!(unsafeWindow.GBL.MAIN_DATA))) {
            message.log("(waiting) GBL object NOT found. [count = " + count + "]");
            count++;
            window.setTimeout(function () {
                if (0) message.log("(waiting check page over) :: " +
                                   document.URL + " count = " + count);
                else   message.log("(waiting check page over) count = " + count);
                if (count < 9) slife.CheckPage(count);
            }, 7531);
            return;
        }

        // retrieve your facebook user id
        if (typeof unsafeWindow.GBL.MAIN_DATA.getViewer() == 'object') {
            my_user_id = unsafeWindow.GBL.MAIN_DATA.getViewer().getUserId();
            // unsafeWindow.GBL.MAIN_DATA.getViewer().getThumbnailUrl();
        } else {
            message.error("Game page mismatch (exiting).");
            return;
        }

        var votingPaused = GM_getValue(my_user_id + "-votePaused", false);
        message.info("Check Page... [Voting paused = " + votingPaused + "] - " + count);

        // update voting machine
        var notice = this.VoteNoticeGet();
        //message.log("## saved notice :: " + notice);
        if (GM_getValue(my_user_id+"-voteNotice") == undefined) {
            this.VoteNoticeSet(notice);
        }

        // set QUERY_STRING based on server value
        if (unsafeWindow.QUERY_STRING) {
            QUERY_STRING = unsafeWindow.QUERY_STRING;
        } else return;
        // set RESOURCE_DESTINATION_URL based on server value
        if (unsafeWindow.RESOURCE_DESTINATION_URL) {
            RESOURCE_DESTINATION_URL = unsafeWindow.RESOURCE_DESTINATION_URL;
        } else return;
        // set REQUEST_DESTINATION_URL based on server value
        if (typeof unsafeWindow.getCDNRequestDestinationURL == 'function') {
            REQUEST_DESTINATION_URL = unsafeWindow.getCDNRequestDestinationURL();
        }
        // check for server function 'makeXMLNotCachedRequest'
        if (typeof unsafeWindow.makeXMLNotCachedRequest == 'function') {
            this.makeXMLNotCachedRequest = unsafeWindow.makeXMLNotCachedRequest
        } else {
            this.makeXMLNotCachedRequest = null;
            message.error("Game XML request function not found (exiting).");
            return;
        }

        //GM_log("QUERY_STRING             = \"" + QUERY_STRING + "\"");
        //GM_log("REQUEST_DESTINATION_URL  = \"" + REQUEST_DESTINATION_URL + "\"");
        //GM_log("RESOURCE_DESTINATION_URL = \"" + RESOURCE_DESTINATION_URL + "\"");

        // remember cached user list of game for later reference
        this.userList = unsafeWindow.GBL.MAIN_DATA.getCachedUsers(
                        unsafeWindow.CachedUserList.MY_MOB);
        // remember FB API client for later use
        if (typeof unsafeWindow.FB.Facebook.apiClient == 'object') {
            this.api = unsafeWindow.FB.Facebook.apiClient;
        } else {
            this.api = null;
        }

        // check if internal ballot is in the process to be updated
        if (GM_getValue(my_user_id+"-isUpdating") != undefined) {
            // it is... wait a little before trying again
            message.info(">> ballot is updating...");
            count++;
            // check with user to continue running (or not)
            var run = slife.UserConfirmation('U');
            if (run) {
                message.log("Got OK to reload page [" +  location.href + "]...");
                count=10;
                location.reload();
            } else {
                message.warn("CANCELing this script.");
            }
            return;
        }

        // check for (and save) possible boarders
        var hg = unsafeWindow.GBL.MAIN_DATA.getViewer().getNumHiredGuns();
        if (hg) GM_setValue(my_user_id+"-boarders", hg);
        var ms = unsafeWindow.GBL.MAIN_DATA.getViewer().getMobSize();
	var nm = GM_getValue(my_user_id+"-nullMembers", 0);
        var mm = ms - hg - 1 - nm;

        if ((ms == undefined) || (hg == undefined)) {
            count++;
            window.setTimeout(function () {
                if (0) message.info("(mm/hg undef waiting done) :: " +
                                    document.URL + " count = " + count);
                else   message.log("(mm/hg undef waiting done) count = " + count);
                slife.CheckPage(count);
            }, (this.waitMilliSecs * 1));
            return;
        }

        // initialize user interface
        hmi.initialize();

        if (!votingPaused) {
            var comment = notice;
            comment = comment.replace("%N", "aficionado");
            comment = comment.replace("%N", "aficionado");
            comment = comment.replace("%N", "aficionado");
            comment = comment.replace("%D", dayname);
            comment = comment.replace("%D", dayname);
            comment = comment.replace("%D", dayname);
            slife.AddToLog('info Icon',
                'Saved  Notice Format: <span class="good">' + notice  + '</span>' +
                '<br/>&nbsp;&nbsp;&nbsp;&nbsp;' +
                '<i>Example Message:</i>&nbsp; <span class="user">' + comment + '</span>');
        }

        // greet the user
        window.setTimeout(function () {
                slife.FillBallot(0x3675345, 0x0, 0x0);
                slife.greeting();
            }, 0);

        // check if internal ballot exists
        var refreshInternalBallot = false;
        if (GM_getValue(my_user_id+"-ballot") != undefined) {
            ballot = (GM_getValue(my_user_id+"-ballot")).split(',');
            if (GM_getValue(my_user_id+"-nicks") != undefined) {
                nick =  (GM_getValue(my_user_id+"-nicks")).split(',');
            } else {
                message.info(">> script version changed since last update");
                refreshInternalBallot = true;
            }
            // check if number of occupants changed since last update
            message.log(">> " + ms + " - " + hg + " boarders " + " - " +
                   nm + " invalid (" + mm + " vs " + ballot.length +
                   "); threshold " + this.ballotThreshold);
            if (ballot.length == mm) {
                refreshInternalBallot = false;
            } else if ((this.ballotThreshold + ballot.length) < mm) {
                message.info(">> number of occupants changed since last update");
                refreshInternalBallot = true;
            }
        } else {
            if (0 < mm) {
                refreshInternalBallot = true;
            } else {
                GM_deleteValue(my_user_id+"-ballot")
                message.error(">> no one to vote for - will try again shortly...");
                count++;
                window.setTimeout(function () {
                    message.log("(no one to vote for waiting done) :: " +
                        document.URL + " count = " + count);
                    slife.CheckPage();
                }, (this.waitMilliSecs * 1));
                return;
            }
        }

        if (refreshInternalBallot) {
            GM_setValue(my_user_id+"-isUpdating", true);
            ballot = [];    // clear-out array
            nick = [];
            message.info(">> population census...");
            slife.AddToLog('info Icon', 'Starting population census...');
            slife.usersCounted = 0; // reset 'census' counter
            this.userList.getNumUsers(
                function (b) {
                    message.log (">> refreshing internal ballot :: population = " + b);
                    slife.AddToLog('info Icon', 'Your house is populated by ' +
                        '<span class="warn">' + b + '</span> sisters');
                    slife.population = b;
                    slife.Census(slife.usersCounted);
                    });
            return;
        }

        slife.voteables = ballot.length;
        var remainingBallots = parseInt(
            GM_getValue(my_user_id + '-ballotsRemaining', 0));
        hmi.updateAficionadoMeter(remainingBallots, ballot.length);

        // check if script is already running
        if (GM_getValue(my_user_id+"-isRunning") == undefined) {
            // script was not running
            if (0 == remainingBallots) {
                message.info("### no ballots remaining from last election");
            } else {
                var len = ballot.length;
                message.log("### " + remainingBallots + "/" + len +
                    " ballots remaining from last election.");
                for(var i = 0; i < (len - remainingBallots); i++) {
                    var sister_id = ballot.pop();
                    var sister_name = nick.pop();
                    message.log("skip ballot: " + i + " " + sister_name +
                        " (" + sister_id + ").");
                } // for-loop
                if (votingPaused) {
                    message.log("### voting paused; doing nothing...");
                    window.setTimeout(function () {
                        slife.CheckPage();
                    }, 60000);
                    return;
                }
                message.log("### voting NOT paused; resume voting...");
            }
        } else {
            message.info("script already running; remaining ballots = " +
                remainingBallots + " (paused = " + votingPaused + ")");
            var vmax = GM_config.get('randomMax');
            if ('false' == vmax) vmax = this.delayMilliSecs * 4;
            else vmax = (vmax * 917) + 42;
            if ((0 < remainingBallots) && (ballot.length != remainingBallots)) {
                var len = ballot.length;
                message.log("-R- " + remainingBallots + "/" + len +
                    " ballots remaining from running election.");
                for(var i = 0; i < (len - remainingBallots); i++) {
                    var sister_id = ballot.pop();
                    var sister_name = nick.pop();
                    message.log("skip ballot: " + i + " " + sister_name +
                        " (" + sister_id + ").");
                } // for-loop
            }
            window.setTimeout(function () {
                slife.CheckRunning(remainingBallots); }, vmax);
            return;
        }

        // check when voted last
        if (0 == remainingBallots) {
            var appraisal = slife.appraiseElection();
            if (appraisal) {
                message.info("### election appraisal received");
            } else {
                //message.log("### election appraisal denied");
                count++;
                hmi.updateAficionadoCountdown();
                window.setTimeout(function () {
                    if (0) {
                        message.log("(election appraisal waiting done) :: " +
                            document.URL + " count = " + count);
                    } else {
                        message.log("(election appraisal waiting done) count = " +
                                    count);
                    }
                    slife.CheckPage();
                }, 1000 * 60);
                return;
            }
        }

        var votingPaused = GM_getValue(my_user_id + "-votePaused", false);
        if (votingPaused) {
            hmi.updateAficionadoMeter(ballot.length, slife.voteables);
        } else {
            window.setTimeout(function() {
                    slife.RunElection();
                }, this.delayMilliSecs);
        }
    }, // CheckPage

appraiseElection: function() {
        if (GM_getValue(my_user_id+"-autoVote") != undefined) {
            var now = new Date();
            var lastVote = now-GM_getValue(my_user_id+"-autoVote");
            // compare against 24h (86400000 seconds)
            if (86400000 > lastVote) {
                var then = new Date();
                then.setTime(GM_getValue(my_user_id+"-autoVote"));
                //GM_log("now time = " + now + "  then time = " + then);

                // compare if still the same day
                //GM_log("Last election less than 24 hours ago.");
                if ((now.getFullYear() == then.getFullYear())
                    && (now.getMonth() == then.getMonth())) {
                    if (now.getDate()  == then.getDate()) {
                        //GM_log("Last election was today.");
                        dateChange = GM_getValue(my_user_id+"-dataChange", 7);
                        if ((dateChange <= now.getHours()) &&
                            (dateChange > then.getHours())) {
                            //GM_log("Last election was before " + dateChange + ":00");
                            return true;
                        } else {
                            //GM_log("Last election was after " + dateChange + ":00");
                        }
                    } else if (now.getDate() > then.getDate()) {
                        //GM_log("Last election was before today.");
                        dateChange = GM_getValue(my_user_id+"-dataChange", 7);
                        if (dateChange <= now.getHours()) {
                            //GM_log("It is now after " + dateChange + ":00");
                            return true;
                        } else {
                            //GM_log("It is still before " + dateChange + ":00");
                        }
                    }
                }
                return false;
            }
            //GM_log("Last election was " + lastVote + " milliseconds ago.");
        }
        return true;
    }, // appraiseElection

ResumeElection: function() {
        message.log("### ResumeElection...");
        var remainingBallots = parseInt(
            GM_getValue(my_user_id + '-ballotsRemaining', -1));
        if (-1 == remainingBallots) {
            remainingBallots = ballot.length;
        }
        if ((0 == remainingBallots) || (remainingBallots < ballot.length)) {
            message.warn("### resume failed - ballot mismatch");
            window.setTimeout(function() {slife.checkPage(0);}, 100);
            return;
        }
        var appraisal = slife.appraiseElection();
        if (appraisal) {
            message.log("### election appraisal received [2]");
            window.setTimeout(function() {
                slife.RunElection();
                }, this.delayMilliSecs);
        } else {
            message.info("### election appraisal denied [2]");
        }
    }, // ResumeElection

PauseElection: function() {
    message.log("#-# PauseElection...");
    GM_deleteValue(my_user_id + "-isRunning");
    }, // PauseElection

RunElection: function () {
        var votingPaused = GM_getValue(my_user_id + "-votePaused", false);
        if (votingPaused) {
            message.log("RunElection: voting paused.");
            return;
        }
        if (ballot.length > 0) {
            GM_setValue(my_user_id+"-isRunning", true);
            var sister_id = ballot.pop();
            var sister_name = nick.pop();
            GM_setValue(my_user_id + "-ballotsRemaining", ballot.length);
            hmi.updateAficionadoMeter(ballot.length, slife.voteables);
            if (sister_id) {
                message.info(ballot.length + " - Vote for sister (" +
                             sister_id + ") " + sister_name);
                slife.FillBallot(sister_id, sister_name, ballot.length);
                var vmin = GM_config.get('randomMin');
                var vmax = GM_config.get('randomMax');
                if ('false' == vmin) vmin = this.delayMilliSecs;
                else vmin = vmin * 1001;
                if ('false' == vmax) vmax = this.delayMilliSecs * 4;
                else vmax = (vmax * 917) + 1;
                if (vmin < 0) vmin = 0; if (vmax < 0) vmax = 0;
                if (GM_config.get('randomize')) {
                    var vdly = Math.round(Math.random() * vmax) + vmin;
                    message.log("RunElection: randomizing vote... [" +
                                vmin + " - " + vdly + " - " + vmax + "]");
                    window.setTimeout(function() {slife.RunElection();}, vdly);
                } else {
                    if (ballot.length % this.extraStop) {
                        window.setTimeout(function() {
                            slife.RunElection(); }, vmin);
                    } else {
                        window.setTimeout(function() {
                            slife.RunElection(); }, vmax);
                    }
                }
            } // else {
            if (ballot.length <= 0) {
                hmi.updateAficionadoMeter(0, slife.voteables);
                message.log("RunElection :: no more candidates.");
                GM_setValue(my_user_id + "-ballotsRemaining", 0);
                GM_setValue(my_user_id + "-autoVote", ""+(new Date()).getTime())
                GM_deleteValue(my_user_id + "-isRunning");
                var autoPause = GM_getValue(my_user_id+"-autoPause", false);
                if (autoPause) {
                    window.setTimeout(function () {
                        message.info("(voting complete) auto pause...");
                        var paused = GM_getValue(my_user_id + "-votePaused", false);
                        if (!paused) {
                            //message.log("(voting complete) engage");
                            hmi.pauseVoting();
                        } else {
                            //message.log("(voting complete) already paused");
                        }
                    }, 0);
                } // autoPause
                message.info("Voting complete");
                window.setTimeout(function () {
                    //message.log("(voting complete) wait over");
                    slife.CheckPage();
                }, 60000);
            }
        } else {
            GM_deleteValue(my_user_id + "-isRunning");
            window.setTimeout(function () {
                //message.log("(voting complete (2)) wait over");
                slife.CheckPage();
            }, 60000);
        }
    } // RunElection

}; // var slife


// check if actual document is main facebook page (based on document url)
if (document.URL.match(RegExp("/sororitylife/"))) {
    message.log("(ignore) facebook page");
    // initialize updater
    userscriptUpdater.init({
        scriptId:       "64666",
        currentVersion: "1.4.1",
    });
    return;
} else {
    if (document.URL.match(RegExp("/facebook_iframe.php"))) {
        //GM_log(">>> " + document.URL);
        window.addEventListener("load",
            function (e) {
                slife.CheckPage(0);
            }, false); // window.addEventListener
    } else {
        //GM_log("(ignore) " + document.URL);
        message.log("(ignore) pd page");
    }
}

