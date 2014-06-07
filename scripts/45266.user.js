// ==UserScript==
// @name          easy userscript updater snippet
// @namespace     http://thomd.net/userscript
// @description   copy-paste this updater script snippet at the end of your userscript file hosted on userscripts.org. Your script is now displaying update notifications the next time you upload a new version of your script.
// @include       http://domain-name.tld/*
// @author        Thomas Duerr
// @version       1.0.2
// @date          2010-05-11
// ==/UserScript==


//
// Usage:
// ------
// 
//     (1) Copy and paste the script snippet at the end of your userscript file.
//
//     (2) Set at least script-id (from userscripts.org) and current script version as options in init function:
//         
//         Example: 
// 
//             userscriptUpdater.init({
//                 scriptId:       "123456789",
//                 currentVersion: "1.0"
//             });
//
//
//     (3) You may optional overwrite the 'checkInterval', 'injectInto' and 'updaterCss' option
//
//         Example:
// 
//             userscriptUpdater.init({
//                 scriptId:       "123456789",
//                 currentVersion: "1.0.2",
//                 checkInterval:  604800,                              // check only once a week
//                 injectInto:     document.getElementById("header"),   // inject updater-message into this DOM-node
//                 updaterCss:     ""                                   // individual css rules (see 'Styling of updater-message' below)
//             });
//
// 
//     (4) You may optional define additional (non standard) userscript-meta tags '@change' and/or '@depricated' in your script. 
//         This information will then be used in an update-message as additional description.
//
//           @change:      what has been changed in the new version
//           @depricated:  if userscript is depricated (the scripts site may have implemented your feature now, so the userscript isn't necessary anymore),
//                         then give a description or set to 'true'.
//
//
//
// Notes:
// ------
//
//     * For an example of this script being implemented, see for example this: http://userscripts.org/scripts/review/28226?format=txt
//     * Currently this updater script works only for unserscripts hosted on userscripts.org
//     * Please don't set 'checkInterval' to more than once a day to limit unnecessary server load on userscripts.org
//     * use version numbers for your userscripts based on this versioning scheme:  major.minor[.bugfix]
//     * you may use a packed version of this script snippet (the userscriptUpdater-function only!) by using Dean Edwards Packer (http://deanedwards.me.uk/packer/)
//
// 
//
// Tested with:
// ------------
//
//     * Firefox 3.0.x
//     * Greasemonkey Addon 0.8.20090123.1
//
//
//
// License:
// --------
//
//     * MIT License (http://www.opensource.org/licenses/mit-license.php)
//
//
//
// Styling of updater-message:
// ---------------------------
//
//	   * individual CSS rules should be based on this exemplary generated HTML structure:
//
//         <div class="greasemonkey_updater">
//             <h1>
//                 <div class="greasemonkey_updater_link_to_hide">
//                     <a href=""><span>Skip until next Update!</span></a>
//                 </div>
//                 Greasemonkey UserScript Update Notification!
//             </h1>
//             <p>There is an update available for <a href="http://userscripts.org/scripts/show/12346">userscript updater</a>.<br/><br/>
//             New Feature: this and that!<br/><br/>
//             You are currently running version <b>1.3</b>, the newest version on userscripts.org is <b>1.4.3</b>!<br/>
//             <a href="http://userscripts.org/scripts/source/12346.user.js">Update to Version 1.4.3</a></p>
//         </div>
//
//
//     * use for example this set of CSS selectors:
//
//         div.greasemonkey_updater {  }
//         div.greasemonkey_updater h1 {  }
//         div.greasemonkey_updater a {  }
//         div.greasemonkey_updater .greasemonkey_updater_link_to_hide {  }
//         div.greasemonkey_updater p {  }
//
//
//     * some message-themes for usage as options in the init function (just copy-paste it):
//
//         (1) updaterCss: "div.greasemonkey_updater { background: #FDD; border: 2px solid #F00; font: normal 11px/1.5 Helvetica; margin: 0 auto; padding: 10px; width: 600px; } div.greasemonkey_updater h1 { font-size: inherit; } div.greasemonkey_updater a { color: #F00; } div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; }"
//         (2) updaterCss: "div.greasemonkey_updater { position: absolute; top: 40px; left: " + parseInt(document.body.clientWidth - 700) / 2 + "px ; background: #CCC; border: 6px solid #EEE; -moz-border-radius: 12px; font: normal 16px Helvetica; padding: 20px; width: 700px; } div.greasemonkey_updater h1 { font-size: 20px; } div.greasemonkey_updater a { color: #666; } div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; } div.greasemonkey_updater .greasemonkey_updater_link_to_hide span { font-weight: normal; font-size: 16px; }"
//
//




//
// ---------- userscript updater --------------------------------------------------------------------------------------
//
var userscriptUpdater = function(){

    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 604800,                                    // default check interval: check once a week [in seconds]
                                                                  // Please don't set 'checkInterval' to more than once a day to limit unnecessary server load on userscripts.org
        injectInto:    document.getElementsByTagName("body")[0],  // default dom-node for the updater-message to be inserted
        updaterCss:    css                                        // default styles of updater message
    };
    var lastCheck   = GM_getValue("lastCheck", 0);
    var lastVersion = GM_getValue("lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)[\r\n]/,
        change:     /@change\s+(.*)[\r\n]/,
        depricated: /@depricated\s+(.*)[\r\n]/
    };
    var updater;


    // check remote userscript for version
    var checkRemoteUserscript = function(){
        GM_xmlhttpRequest({
            method:  "GET",
            url:     "http://userscripts.org/scripts/source/" + config.scriptId + ".meta.js",
            headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue("lastCheck", currentTime);
                for(m in meta){meta[m] = (meta[m].exec(resp.responseText) ? meta[m].exec(resp.responseText)[1] : null);}
                if(isNewer(meta.version, config.currentVersion) && isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                }
            }
        });
    };


    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p){
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp){
            if(parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if(parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if(parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    };


    // skip current update until next
    var skipUpdate = function(ev){
        ev.preventDefault();
        GM_setValue("lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    };


    // initialization
    var initialize = function(options){

        // merge options into config
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}

        // already checked for an update today?
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };


    // build updater message and inject it into DOM
    var build = function(){
        var updater = document.createElement("div");
            updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
            hide.className = "greasemonkey_updater_link_to_hide";
        if(meta.depricated == null){
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
            h1.appendChild(document.createTextNode(meta.depricated == null ? "Greasemonkey UserScript Update Notification!" : "Depricated Greasemonkey UserScript!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if(meta.depricated == null){
            var text = "There is an update available for <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a>.<br>";
                text += meta.change ? "<br>" + meta.change + "<br><br>" : "";
                text += "You are currently running version <b>" + config.currentVersion + "</b>, the newest version on userscripts.org is <b>" + meta.version + "</b>!<br><a href=\"http://userscripts.org/scripts/source/" + config.scriptId + ".user.js\">Update to Version " + meta.version + "</a>";
        } else {
            var text = "The userscript <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> is now depricated.<br>";
                text += meta.depricated && meta.depricated != "true" ? "<br>" + meta.depricated + "<br><br>" : "";
                text += "Please remove your script! Thanks for using it.";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) : config.injectInto.appendChild(updater));
        return updater;
    };

    return { init: initialize };
}();


// initialize updater
userscriptUpdater.init({
    scriptId:       "123456789", // insert id of your userscript from userscripts.org!
    currentVersion: "1.0"        // insert current version number based on versioning scheme: major.minor[.bugfix]
});

//
// ---------- / userscript updater ------------------------------------------------------------------------------------
//





//
// ChangeLog
// 2009-01-29 - 0.1   - created
// 2009-03-09 - 0.2   - rewritten and implemented with module pattern
// 2009-03-10 - 0.3   - included change-message
// 2009-03-24 - 0.4   - included deprication-message
// 2009-03-25 - 1.0   - first final release
// 2009-03-27 - 1.0.1 - minor fixes
// 2010-05-11 - 1.0.2 - changed url for script-updater-check and increased check interval to limit unnecessary server load on userscripts.org
//

