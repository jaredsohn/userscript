// ==UserScript==
// @name                    [TS] USO-Updater
// @namespace               TimidScript
// @description             An advanced USO Script Updater
// @usage                   Give credit to original author and link
// @exclude                 *
// @version                 1.0.11
// ==/UserScript==


/* Information
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/159301

----------------------------------------------
    Description 
----------------------------------------------
 USO-Updater is an advance script updater that provides more control than the one provided by 
 GreaseMonkey. 

 Press "Ctrl+Alt+U" to bring up Update Menu
 For information on how to use this script please visit:
 http://userscripts.org/scripts/show/159301
 
 Though no longer anything like the original, this script was based on "AEG AutoUpdater" 
 and released under original license: http://creativecommons.org/licenses/by-nc-sa/3.0/
 Original Script: http://userscripts.org/scripts/show/75442/

----------------------------------------------
    Version History
----------------------------------------------
1.0.11
 - Removed duplicated notice to service provider

1.0.10
 - Show your appreciation message added
 - USO-Updater Link Added
 - @exclude * instead of @include

1.0.9
 - Bug Fix: Asynchronous, delayed checking to fix issues with "@run-at document-start", which
 fails due to waiting for document to load.

1.0.8
 - Counter for iForm resize added.
 - Added Comments

1.0.7
 - Syntax Fix
 - To ease the load on userscript.org the default check interval was increased from 2 days to 5
 - Increase delay before resize to 1000ms

1.0.6
 - Bug Fix: Now checks if document is loaded first. Issue caused by "document-start" metatag.

1.0.5
 - Bug Fix: Did not set the infoBox text innerHTML

1.0.4
 - Background colour for the iframe's document body is set to white.
 - iframe size is set after a timeout delay.
 - Added a header and changed the colour of the USO-Updater menu

1.0.3
 - Changed the GM saved values to something more unique.

1.0.2
 - @updateinfo has become versioninfo
 - Displays if versions are the same in update window

1.0.1
 - Initial Release
*****************************************************************************************************/

var Counter = 0;

var USOUpdater =
{
    currentMetaData: null,
    newMetaData: null,
    checkInterval: 5,
    updateWindow: 0,
    ID: null,

    //Checks if online USOVersion number is same
    check: function (force) {
        if (this.checkUpdateNeeded() || force) {
            console.info("Checking for update for: " + this.currentMetaData["name"]);
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://userscripts.org/scripts/source/" + this.currentMetaData["uso:script"] + ".meta.js",
                //url: "http://blue/uso/script/meta" + this.currentMetaData["uso:script"] + ".meta.js",
                onload: function (response) {
                    USOUpdater.newMetaData = USOUpdater.parseMeta(response.responseText);
                    var newVersion = USOUpdater.newMetaData['uso:version'];
                    if (force || (newVersion !== undefined &&
                         USOUpdater.currentMetaData !== undefined &&
                         USOUpdater.currentMetaData['uso:version'] !== undefined &&
                         Number(newVersion) > Number(USOUpdater.currentMetaData['uso:version']))) {
                        USOUpdater.showUpdateWindow(USOUpdater.newMetaData);
                    }
                }
            });
        }
    },

    //Checks if online check is needed by checking last time online check was made
    checkUpdateNeeded: function () {
        this.checkInterval = GM_getValue("USO-Updater: CheckInterval", this.checkInterval);
        if (this.checkInterval == 0) return;

        var now = Math.round(new Date().getTime() / 1000); // was milliseconds
        var lastCheck = GM_getValue('USO-Updater: LastCheck', 0);
        GM_setValue('USO-Updater: LastCheck', now); // update  
        //console.log(now > lastCheck + this.checkInterval * 86400);
        return now > lastCheck + this.checkInterval * 86400;
    },

    //Parse through the script metadata
    parseMeta: function (raw_metadata) {
        var lines = raw_metadata.split('\n');
        var metadata = {};
        var that = this;
        for (var i = 0; i < lines.length; i++) {
            lines[i].replace(/\s*\/\/\s*@([^ ]+)\s+(.+)/, function (all, key, value) {
                key = key.toLowerCase();
                metadata[key] = value;
                switch (key) {
                    case "interval":
                        if (!isNaN(value) && value > 0 && value < 8) value = GM_setValue("USO-Updater: CheckInterval", GM_getValue("USO-Updater: CheckInterval", value));
                        break;
                }
            });
        }
        return metadata;
    },

   
    getCurrentMeta: function () {
        this.currentMetaData = this.parseMeta(GM_getResourceText('meta'));
        this.ID = USOUpdater.currentMetaData["uso:script"] + new Date().getTime();
        //console.log(USOUpdater.ID);
    },

    //Shows update window
    showUpdateWindow: function () {
        if (document.getElementById("updateWindow")) return;
        if (!USOUpdater.newMetaData) {
            USOUpdater.check(true);
            return;
        }

        var iframe = document.createElement("iframe");
        iframe.id = "updateWindow";
        iframe.setAttribute("style", "position:fixed; right: 15px; bottom: 15px; text-align:center; z-index: 9999;");
        iframe.onload = function () {
            iDoc = iframe.contentDocument || iframe.contentWindow.document;

            iDoc.body.innerHTML = '<div style="width: 500px; background-color: #ECF6D9; border: 5px ridge; padding: 5px 5px 0 5px;"><div style="text-align: center; border: 1px ridge #808080; padding: 5px;"><span id="cVersion" style="font-weight: bold;">USO-Updater</span><span style="font-size: small;">(1.0.1)</span><a target="_blank"><img alt="home" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABW0lEQVR42mNkwAECAoNZGBkYVgKZCv8ZGFw2rF/7Hps6RmyCvn7+TIwMjIuAstFggf8MJ/4z/HfZvGnjV6IM8Pb2nQakMtGE9wBN8tm6dctPvAZ4eHh1AAXLsRkM9Mo6IBm+Y8f2P1gNcHN1rwBS7Qz4wYL///8n796z6x+KAc5OzkAnM05jIAr8n7h3394CuAEO9g7AwGJcjCtMcBjScODggUZGWxtbb6C+DUARFuI1ww3JZrSxslEEsuSB/nIH0hVE6lzAyMi4EEi/gTvZwsw8AUjNJ9KAxhOnTjagBKKpsQlJBpw+ewbVACMDQxQDGEHhwshwEeJVoBcZ/icgG3DuwnlUAwx09dBdkHjh8qUFUDkHILUf2QCgHKoBulraGAZcvnZ1AVQOwwCgHKoBWuoaGAZcu3ljAVQOwwCgHKoB6iqqIEW7gJgVZsDNO7cXIMnBDPgPlQNFIwMAOj56D6356V8AAAAASUVORK5CYII=" onmouseover="this.style.backgroundColor=\'#FF0\';" onmouseout="this.style.backgroundColor=null;" /></a><div style="text-align: left; font-size: small; color: gray;">Show your appreciation for the script\'s author by writing a <a id="usoSReview">review</a> and becoming a <a id="usoSFan">fan</a>.</div></div><div style="width: auto; background-color: #D5DBCF; border: 1px ridge #808080;"><fieldset style="margin-bottom: 5px;"><legend style="color: #07770D; font-weight: bold;"><span>New Version: </span><span id="nVersion" style="color: #000;">USO-Updater</span><span style="font-size: small;">(1.0.2 BETA)</span></legend><div id="infoBox" style="padding: 5px; background-color: #FFF; border: 1px ridge #808080;">No version information provided</div><div id="warnBeta" style="background-color: #D4C6D7; padding: 0 5px 0 5px; border: 1px ridge #808080; display: none;"><label style="color: #000;">WARNING: New version is a BETA release</label></div><div id="warnAlpha" style="background-color: #D4C6D7; padding: 0 5px 0 5px; border: 1px ridge #808080; display: none;"><label style="color: #F00;">WARNING</label><label style="color: #000;">: New version is an ALPHA release</label></div></fieldset></div><div><form id="USOUpdaterForm"><label>Check for update<select id="intervalLength"><option>never</option><option>everyday</option><option>every 2 days</option><option>every 3 day</option><option>every 4 days</option><option>every 5 day</option><option>every 6 days</option><option>every 7 days</option></select></label><input type="submit" name="update" value="Update" onclick="this.parentNode.name = this.name;" style="float: right" /><input type="submit" name="cancel" value="Cancel" onclick="this.parentNode.name = this.name;" style="float: right" /></form></div></div>'
                + '<div style="border: 1px ridge #808080; text-align: center; width:100%; font: bold;">(Press "Ctrl+Alt+U" to access this window)</div>'
                + '<div style="text-align: left; font-size:small; color:gray; margin-left: 10px;">Service provided by <a href="http://userscripts.org/scripts/show/159301">USO-Updater script.</a></div>';

            
            var el = iDoc.getElementById("cVersion");
            el.textContent = USOUpdater.currentMetaData["name"];
            el.nextElementSibling.textContent = "(" + USOUpdater.currentMetaData["version"] + ")";

            el = iDoc.getElementById("nVersion");
            el.textContent = USOUpdater.newMetaData["name"];
            el.nextElementSibling.textContent = "(" + USOUpdater.newMetaData["version"] + ")";

            iDoc.getElementById("usoSReview").href = "http://userscripts.org/scripts/reviews/" + USOUpdater.currentMetaData["uso:script"];
            iDoc.getElementById("usoSFan").href = "http://userscripts.org/scripts/fans/" + USOUpdater.currentMetaData["uso:script"];

            try {
                if (USOUpdater.currentMetaData['uso:version'] === USOUpdater.newMetaData['uso:version']) el.previousElementSibling.textContent = "Same Version: ";
            }
            catch (err) { };

            if (USOUpdater.newMetaData["versioninfo"]) iDoc.getElementById("infoBox").innerHTML = USOUpdater.newMetaData["versioninfo"];

            el = iDoc.getElementById("intervalLength");
            el.selectedIndex = USOUpdater.checkInterval;
            el.onchange = function () { USOUpdater.checkInterval = el.selectedIndex; GM_setValue("USO-Updater: CheckInterval", USOUpdater.checkInterval); };

            try {
                iDoc.getElementById("warnBeta").style.display = (USOUpdater.newMetaData["version"].match(/beta/gi)) ? null : "none";
            }
            catch (err) { };
            try {
                iDoc.getElementById("warnAlpha").style.display = (USOUpdater.newMetaData["version"].match(/alpha/gi)) ? null : "none";
            }
            catch (err) { };


            iDoc.body.setAttribute("style", "background-color:white;");
            iframe.style.width = (iDoc.body.firstElementChild.offsetWidth + 15) + "px";
            iframe.style.height = (iDoc.body.scrollHeight) + "px";
            //iframe.style.width = (iDoc.body.scrollWidth) + "px";
            //iframe.style.height = (iDoc.body.firstElementChild.offsetHeight + 20) + "px";

            //Sometimes the resize fails. Small delay before resizing should fix it.

            var intervalID = setInterval(function (iframe, iDoc) {
                iframe.style.width = (iDoc.body.firstElementChild.offsetWidth + 15) + "px";
                iframe.style.height = (iDoc.body.scrollHeight) + "px";
                Counter++;
                if (Counter == 10) 
                {
                    clearInterval(intervalID);                    
                }
            }, 250, iframe, iDoc);
            
            iDoc.getElementsByTagName("a")[0].href = "http://userscripts.org/scripts/show/" + USOUpdater.currentMetaData["uso:script"];
            iDoc.getElementById("USOUpdaterForm").onsubmit = USOUpdater.formsumbit;
        }
        document.body.appendChild(iframe);
    },

    /*
    Meant to show Update History but due USO server overload currently not implemented
    addToHistory: function (metaData) {
        //http://userscripts.org/scripts/version/35445/566329.user.js  
        //http://userscripts.org/scripts/version/35445/566329.meta.js
    },
    */

    //Opens Update Window
    formsumbit: function (e) {
        if (e.target.name == "update") {
            //console.log("Update window open");
            //window.open("http://userscripts.org/scripts/source/" + USOUpdater.currentMetaData["uso:script"] + ".user.js", "_target");
            window.open("http://userscripts.org/scripts/source/" + USOUpdater.currentMetaData["uso:script"] + ".user.js", "_self");
        }

        document.body.removeChild(document.getElementById("updateWindow"));
    },

    //Adds menu option to the USO Update Menu that is accessed through Ctrl+Alt+U. 
    //This only appears if there is more than one active script that utilises the script.
    menuItemAdd: function () {
        var UpdaterMenu = document.getElementById("USOUpdaterMenu");
        if (!UpdaterMenu) {
            var UpdaterMenu = document.createElement("div");
            UpdaterMenu.id = "USOUpdaterMenu";
            UpdaterMenu.setAttribute("style", "z-index: 9999; position: fixed; top: 15px; right: 15px; display: none; background-color: #F00; padding: 10px; border: 5px solid #000;");
            var header = document.createElement("div");
            header.textContent = "USO-Updater Menu";
            header.setAttribute("style", "text-align:center; color:white;font-weight:bold; margin-bottom:5px;");
            UpdaterMenu.appendChild(header);

            var btn = document.createElement("input");
            btn.type = "button";

            btn.value = "Exit";
            btn.setAttribute("style", "display: block; width: 100%; margin-top: 10px;");
            btn.onclick = function () { UpdaterMenu.style.display = "none"; };
            UpdaterMenu.appendChild(btn);
        }
        var btn = document.createElement("input");
        btn.type = "button";
        btn.value = USOUpdater.currentMetaData["name"] + " (" + USOUpdater.currentMetaData["version"] + ")";
        btn.name = USOUpdater.ID;
        btn.setAttribute("style", "display: block; width: 100%;");
        btn.onclick = function (e) {
            //console.log(USOUpdater.ID, USOUpdater.currentMetaData["name"]);
            document.getElementById("USOUpdaterMenu").style.display = "none";
            if (USOUpdater.ID == e.target.name)
                USOUpdater.showUpdateWindow();
        };

        UpdaterMenu.insertBefore(btn, UpdaterMenu.lastElementChild);
        document.body.appendChild(UpdaterMenu);
    },

    //Captures Key presses. (Ctrl+Alt+U)
    keydown: function (e) {
        var key = e.keyCode;
        //console.log(USOUpdater.currentMetaData['uso:version'], USOUpdater.newMetaData['uso:version']);

        if (e.ctrlKey & e.altKey & e.keyCode == 85) {
            e.stopImmediatePropagation();  //No need for this.
            var updaterMenu = document.getElementById("USOUpdaterMenu");
            if (updaterMenu.getElementsByTagName("input").length > 2) {
                updaterMenu.style.display = null;
                var updateWindow = document.getElementById("updateWindow")
                if (updateWindow) document.body.removeChild(updateWindow);
            }
            else USOUpdater.showUpdateWindow();
        }
    }
};



if (window.self === window.top)
{
    setTimeout(function ()
    {
        var interval = setInterval(
            function ()
            {
                if (document.readyState != "loading") //interactive complete
                {
                    clearInterval(interval);
                    USOUpdater.getCurrentMeta();
                    USOUpdater.menuItemAdd();
                    document.onkeydown = USOUpdater.keydown;
                    USOUpdater.check();
                }
            }
            , 500);
    }, 500);
}