/* CPIggy2
// v2.1.1
// $Date: 2007-11-17 11:36:40 -0600 (Sat, 17 Nov 2007) $
//
// Copyright (c) 2007, Inspire, LLC
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of Inspire, LLC nor the names of its
//       contributors may be used to endorse or promote products derived from
//       this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
// LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// ----------------------------------------------------------------------------
// This is the beginnings of a fully functional ignore script for ChiefsPlanet,
// an Internet message board using vBulletin 3.0.0.  This script may be useful
// for other vBulletin based forums, but testing has not been performed by the
// author.  Use at your own risk.
//
// ==UserScript==
// @name           CPIggy2
// @namespace      chiefsplanet
// @description    The *****OFFICIAL***** ignore script for ChiefsPlanet
// @include        http://www.chiefsplanet.com/BB/forumdisplay.php?*
// @include        http://www.chiefsplanet.com/BB/showthread.php?*
// @include        http://www.chiefsplanet.com/BB/usercp.php*
// ==/UserScript==
*/

/******************************************************************************
***** Constants                                                           *****
******************************************************************************/
// Get the script start time to use throughout this execution.
var dateObj = new Date();
var scriptStart = dateObj.getTime();
var debug = false;
mlog("Starting");
var fullVersion = "$Rev: 48 $";
var version = parseInt(fullVersion.split(" ")[1]);

// Define the images that we'll use in the app since we can't store actual
// image files anywhere.
var closegif = "data:image/gif;base64,R0lGODlhDgAOAIABAP///wAAACH5BAEKAAEALAAAAAAOAA4AAAIiTICpdurYmGQLUtBgMnvl/V1WyIHkU2pWx0rqOJXfM9JgAQA7";
var nogif = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANkE3LLaAgAAAv9JREFUeJx9k1FoWwUUhr+bpGnuJb1dstykqQ+6MNdKWreMVGMgD5MxYUhNxQ4ftpWa+SJCccM5EQb61oe64aMbXXHWUaUollljBmVMZ4WiWGybwWhNu6YpVtvQ7KbNXXt8WURm8X86B/7vPy/nV9hZ9WHY97jT2Sig5CuV/K9wByg+alQe2bWUqr7WefhwZzgeD/saGupRFP4qFIpTt29Pf57JfHG5XO4H7v8noAWilxOJgWfPng2jKDA1BYuLYFkQCMD+/SDCxIULM6lbt7on4ad/zoahbSWZNCWTETl1SlYiEcl4PNsDNTUrl2DpGyiZoZDI1asi4+PyZ0dHuRViVb5uvKnpjgwOirS3y4jXu5qA9zU4ALgDEB4/eDArFy+KDA+LnD8vcuWKTLS23gXqaYduOXNGpKdH0rpeqIPnqskRp/OpuUQiK319Iv39Yh07JndBKqmUSFeXJOF1PlSUQenokEpbm0TgeBV+UdePmEePrktvr0hfn2wdOiRjsHUcrs/X1Fhit8tHMMSn8J2AZF2ue4Ab4G2fr0diMUtOnhRJpWQ7HpcbUGyCTkD93mb7XUAGIePYgG0Aj91ea4D7XCBw7rTX+x75PBSLsLFBem5uoRtOFOAmoDg8nhKmyf3NzW1HFnK4XPhV1fdbY+PPflUNIgLNzVAoMDQz80sXvLIJswBRXY9GDONJ1teZXl6+ZxuFkXVNA13HX1sbRNMgFIL5eXonJ4dfheercLPPt28oHv/M6fU6l51O0g8efO2YgvSltbX06WDwBQIB8HhA0xiwrNEPNO3N3aa59UQo1PpyS8tLb+zZ89auUskrpsnHudyNGRitfmLwS/g2GY0+TSwGhkHFMCqKrm8oqmpzOBxuTBNyOUin+WRsbLoLjgCL9ocBpSEYLufzu58plw+4DEOx+/12e11drc2ynMzOwsgIxWvXeCebHXgXTgBLO5UJA+LtDQ3J+N690cfcbj/5PIsLC3/8uLo6cR2+WoIf/q+N/5YP2PVwXgNWdjL9DexqPLOcVCEOAAAAAElFTkSuQmCC";

/******************************************************************************
***** Utility functions                                                   *****
******************************************************************************/
/**
 * General purpose debug function.
 *
 * @param string msg            The message to write to the log.
 * @param int lvl               The message level.
 *
 * @return none
 */
function mlog(msg, lvl) {
    if (debug) {
        if (msg == null || msg == undefined || msg == "") { msg = "Unknown message"; }
        if (lvl == null || lvl == undefined) { lvl = 0; }
        switch (lvl) {
            case 0: // info
                if (debug) { GM_log(msg, lvl); }
                break;
            case 1: // warning
                if (debug) { GM_log(msg, lvl); }
                break;
            case 2: // error
                GM_log(msg, lvl);
                break;
        }
    }
    else {
        if (lvl == 2) { GM_log(msg, lvl); }
    }
}

/**
 * Checks for updates to the software.
 *
 * @return none
 */
function checkForUpdates(isAuto) {
    // The click events we subscribe to pass in mouse args, so we have to
    // check for values other than true and recast them to false.
    if (isAuto != true) { isAuto = false; }
    try {
        GM_xmlhttpRequest({
                method: "Get",
                url: "http://dev1.inspirecom.com/cpiggy/ver.php",
                headers: {
                    "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
                    "Accept": "text/html",
                },
                onload: function(responseDetails) {
                    if (version < parseInt(responseDetails.responseText)) {
                        showAlert("There is an upgrade available.  You can get it at " +
                        "<a href=\"http://userscripts.org/scripts/source/12975.user.js\" " +
                        "target=\"_blank\">the official download site</a>");
                    }
                    else {
                        if (!isAuto) {
                            showAlert("You have the latest version.");
                        }
                    }
                }
        });
        lastUpdateCheck = scriptStart;
        mlog("Updating lastUpdateCheck to " + scriptStart);
        GM_setValue("lastUpdateCheck", scriptStart.toString());
    }
    catch (e) {
        mlog("Failed check for updates :: " + e.message);
        showAlert("I wasn't able to check for updates.  Please tell support -> " + e.message);
    }
}

/**
 * Saves changes made in the config form to persistant storage.
 *
 * @return none
 */
function saveChanges() {
    try {
        var val = document.getElementById("iggyUsers").value;
        // End newline characters may be the root of the settings corruption
        // issue.  Empty lines also cause problems.
        val = val.replace(/^\n*/, ""); // Strip any starting newlines
        val = val.replace(/\n+/g, "\n"); // Strip any consecutive newlines
        val = val.replace(/\n*$/g, ""); // Strip any ending newlines
        mlog("Setting iggyUsers to " + val);
        GM_setValue("iggyUsers", val);
        var val = document.getElementById("iggyWords").value;
        // End newline characters may be the root of the settings corruption
        // issue.  Empty lines also cause problems.
        val = val.replace(/^\n*/, ""); // Strip any starting newlines
        val = val.replace(/\n+/g, "\n"); // Strip any consecutive newlines
        val = val.replace(/\n*$/g, ""); // Strip any ending newlines
        mlog("Setting iggyWords to " + val);
        GM_setValue("iggyWords", val);
        // We only need to check the value of the "true" radio button.  If
        // it's value expresses the value of the entire radio button group.
        val = document.getElementsByName("autoCheck")[1];
        mlog("Setting autoCheck to " + val.checked);
        GM_setValue("autoCheck", val.checked.toString());
        val = document.getElementsByName("displayShowHide")[1];
        mlog("Setting displayShowHide to " + val.checked);
        GM_setValue("displayShowHide", val.checked.toString());
        val = document.getElementsByName("displayDC")[1];
        mlog("Setting displayDC to " + val.checked);
        GM_setValue("displayDC", val.checked.toString());

        // Reload the page so that new settings will be applied.
        document.location.reload();
    }
    catch (e) {
        mlog("Failed saving changes :: " + e.message, 2);
        showAlert("Sorry, but I was unable to save some or all of your changes.  Please tell support -> " + e.message);
    }
}

/**
 * Cancels changes made in the config form to persistant storage.
 *
 * @return none
 */
function cancelChanges() {
    mlog("Cancelling changes");
    document.getElementById("iggyUsers").value = GM_getValue("iggyUsers", "");
    document.getElementById("iggyWords").value = GM_getValue("iggyWords", "");
    val = GM_getValue("autoCheck");
    if (val == "true") { document.getElementsByName("autoCheck")[1].checked = true; }
    else { document.getElementsByName("autoCheck")[0].checked = true; }
    val = GM_getValue("displayShowHide");
    if (val == "true") { document.getElementsByName("displayShowHide")[1].checked = true; }
    else { document.getElementsByName("displayShowHide")[0].checked = true; }
    val = GM_getValue("displayDC");
    if (val == "true") { document.getElementsByName("displayDC")[1].checked = true; }
    else { document.getElementsByName("displayDC")[0].checked = true; }
    document.getElementById("cpiggy_config").style.display = "none";
}

/**
 * Adds a user to the Iggy List.  Used primarily by the links next to user's
 * names.
 *
 * @return none
 */
function addIggyUser(event) {
    mlog("Adding user to ignore");
    var newUser = event.target.previousSibling.innerHTML;
    var val = GM_getValue("iggyUsers");
    mlog("Setting iggyUsers to " + val + "\n" + newUser);
    GM_setValue("iggyUsers", val + "\n" + newUser);
    // Reload the page so that new settings will be applied.
    document.location.reload();
}

/**
 * Generate show/hide script.
 *
 * @param string text           The text to show in the anchor tag.
 * @param array ctlIds          An array of controls to hide/show.  You must
 *                              pass this as an array even if there is only
 *                              one control.
 * @return string               A complete href that will show/hide any
 */
function getShowHide(text, ctlIds) {
    // Verify that we have an array of Control Ids; if not just return.
    if (!ctlIds instanceof Array) { return; }
    var jsl = "";
    for (var i = 0; i < ctlIds.length; i++) {
        jsl = jsl +
              "var c" +
              ctlIds[i] +
              "=document.getElementById('" +
              ctlIds[i] +
              "');if(c" +
              ctlIds[i] +
              ".style.display=='none'){c" +
              ctlIds[i] +
              ".style.display='table-row';}else{c" +
              ctlIds[i] +
              ".style.display='none';}";
    }
    var link = "<a href=\"#\" onClick=\"javascript:" +
               jsl +
               " return false;\">" +
               text +
               "</a>";
    return link;
}

/**
 * Remove DC Links
 *
 * @return none
 */
function removeDC() {
    // Remove it from the drop-down menus.
    // DC happens to be the last item added to this menu, so we can just pop()
    // it off.
    unsafeWindow.menuForums.pop();
    // Remove it from the Sub-Forums panel on the main page.
    var re = /forumdisplay.php\?f=1$/;
    if (window.location.toString().match(re)) {
        var result = document.evaluate("/html/body/table[2]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[6]", document, null, XPathResult.ANY_TYPE, null);
        var DC = result.iterateNext();
        DC.parentNode.removeChild(DC);
    }
}

/******************************************************************************
***** Pop-up screens                                                      *****
******************************************************************************/
/**
 * Shows the CPIggy menu
 *
 * @return none
 */
function genMenu() {
    try {
        mlog("Creating Menu item");
        var result = document.evaluate("/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr", document, null, XPathResult.ANY_TYPE, null);
        var trow = result.iterateNext();
        var td = trow.insertCell(-1);
        td.innerHTML = '<img src="images/headerseperator.gif" alt=""/>';
        td.setAttribute("valign", "top");
        td.setAttribute("nowrap", "nowrap");
        td.setAttribute("cellpadding", "2");
        td.setAttribute("cellspacing", "0");
        var td = trow.insertCell(-1);
        var href = getShowHide("<font color=\"#FFFFFF\">&nbsp;&nbsp;CPIggy&nbsp;&nbsp;</font>", new Array("cpiggy_config"));
        td.innerHTML = "<div class=\"headerdiv\">" + href + "</div>";
        td.setAttribute("valign", "top");
        td.setAttribute("nowrap", "nowrap");
        td.setAttribute("cellpadding", "2");
        td.setAttribute("cellspacing", "0");
        return true;
    }
    catch (e) {
        mlog("Failed to create Menu item :: " + e.message, 2);
        return false;
    }
}

/**
 * Shows an alert dialog
 *
 * @return none
 */
function genAlert() {
    try {
        mlog("Creating Alert box");
        var body = document.getElementsByTagName("body")[0];
        var div = document.createElement("div");
        div.setAttribute("id", "cpiggy_alert");
        div.style.width = "300px";
        div.style.backgroundColor = "#993333"
        div.style.position = "absolute";
        div.style.top = "225px";
        div.style.left = "130px";
        div.style.textAlign = "center";
        div.style.MozBorderRadius = "10px";
        div.style.border = "2px solid #FFFFFF";
        div.style.display = "none";
        var text = document.createElement("p");
        var close = document.createElement("img");
        close.setAttribute("id", "cpiggy_alert_close");
        close.setAttribute("onClick", "javascript:this.parentNode.style.display='none';return false;");
        close.style.cssFloat = "right";
        close.style.marginTop = "5px";
        close.style.marginRight = "5px";
        close.style.cursor = "pointer";
        close.setAttribute("src", closegif);
        text.innerHTML = "";
        text.style.color = "#FFFFFF";
        div.appendChild(close);
        div.appendChild(text);
        body.appendChild(div);
    }
    catch (e) {
        mlog("Failed to create Alert screen :: " + e.message, 2);
        return false;
    }
}

/**
 * Shows an alert dialog
 *
 * @param string text           The text to show in the alert dialog.  You may
 *                              pass in any valid HTML.
 * @return bool                 Returns true if the function completes,
 *                              false if it fails to complete.
 */
function showAlert(text) {
    try {
        mlog("Showing Alert dialog with text :: " + text);
        alert = document.getElementById("cpiggy_alert");
        alert.childNodes[1].innerHTML = text;
        alert.style.display = "table-row";
        return true;
    }
    catch (e) {
        mlog("Failed to show Alert dialog :: " + e.message, 2);
        return false;
    }
}

/**
 * Shows the configuration dialog.
 *
 * @return bool                 Returns true if the function completes,
 *                              false if it fails to complete.
 */
function genConfig() {
    try {
        mlog("Creating Config dialog");

        var body = document.getElementsByTagName("body")[0];
        var head = document.getElementsByTagName("head")[0];

        var style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode("#cpiggy_config { width:528px; background-color:#F1F1F1; color:#000000; position:absolute; top:132px; left:13px; -moz-border-radius:10px; border:2px solid #000000; font-family:verdana,geneva,lucida,'lucida grande',arial,helvetica,sans-serif; font-size:12px; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_pad { min-height:10px; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_space { width:5px; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_inline { display:inline; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_br { clear:both; }\n"));
        style.appendChild(document.createTextNode("#cpiggy_config input { background-color:#FFFFFF; border:1px solid #000000; }\n"));
        style.appendChild(document.createTextNode("#cpiggy_config textarea { width:235px; height:150px; border:1px solid #000000; background-color:#FFFFFF; }\n"));
        style.appendChild(document.createTextNode("#cpiggy_config input[type=\"button\"] { width:110px; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_title { text-align:center; font-weight:bold; margin-top:5px; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_rowDiv { width:100%; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_label { float:left; display:inline; width:265px; padding-left:10px; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_ctlDiv {  }\n"));
        style.appendChild(document.createTextNode(".cpiggy_ctl1 { float:left; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_ctl2 { padding-left:325px; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_ctl3 { float:right; padding-right:18px; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_addLink { margin-left:10px; cursor:pointer; opacity:.2; }\n"));
        style.appendChild(document.createTextNode(".cpiggy_addLink:hover { margin-left:10px; cursor:pointer; opacity:1; }\n"));
        head.appendChild(style);

        var br = document.createElement("br");
        br.className = "cpiggy_br";
        var pad = document.createElement("div");
        pad.className = "cpiggy_pad";

        var wrapper = document.createElement("div");
        wrapper.id = "cpiggy_config";
        wrapper.style.display = "none";

        // Add the title
        var title = document.createElement("div");
        title.innerHTML = "CPIggy Settings";
        title.className = "cpiggy_title";
        wrapper.appendChild(title);
        wrapper.appendChild(document.createElement("hr"));
        wrapper.appendChild(br);
        wrapper.appendChild(pad);

        // Add the ignore users textarea
        var row = document.createElement("div");
        row.className = "cpiggy_rowDiv";
            var label = document.createElement("div");
                label.textContent = "Ignore Users:";
                label.className = "cpiggy_label";
                var ctlDiv = document.createElement("div");
                    ctlDiv.className = "cpiggy_ctlDiv";
                    var userTA = document.createElement("textarea");
                        userTA.id = "iggyUsers";
                        userTA.textContent = GM_getValue("iggyUsers", "");
                ctlDiv.appendChild(userTA);
        row.appendChild(label);
        row.appendChild(ctlDiv);
        wrapper.appendChild(row);
        wrapper.appendChild(br);
        var pad2 = document.createElement("div");
        pad2.className = "cpiggy_pad";
        wrapper.appendChild(pad2);

        // Add the ignore words textarea
        var row = document.createElement("div");
        row.className = "cpiggy_rowDiv";
            var label = document.createElement("div");
                label.textContent = "Ignore Words:";
                label.className = "cpiggy_label";
                var ctlDiv = document.createElement("div");
                    ctlDiv.className = "cpiggy_ctlDiv";
                    var userTA = document.createElement("textarea");
                        userTA.id = "iggyWords";
                        userTA.textContent = GM_getValue("iggyWords", "");
                ctlDiv.appendChild(userTA);
        row.appendChild(label);
        row.appendChild(ctlDiv);
        wrapper.appendChild(row);
        wrapper.appendChild(br);
        var pad3 = document.createElement("div");
        pad3.className = "cpiggy_pad";
        wrapper.appendChild(pad3);

        // Add the update checking
        var row = document.createElement("div");
        row.className = "cpiggy_rowDiv";
            var cnDiv = document.createElement("div");
                cnDiv.className = "cpiggy_ctl3";
                var cn = document.createElement("input");
                    cn.id = "cpiggy_checkForUpdates";
                    cn.type = "button";
                    cn.value = "Check Now";
                    cn.click = function(){ return false; };
                cnDiv.appendChild(cn);
            var label = document.createElement("div");
                label.textContent = "Automatically check for updates:";
                label.className = "cpiggy_label";
                var ctlDiv = document.createElement("div");
                    ctlDiv.className = "cpiggy_ctlDiv";
                    var noDiv = document.createElement("div");
                        noDiv.className = "cpiggy_ctl1";
                        var no = document.createElement("input");
                            no.type = "radio";
                            no.name = "autoCheck";
                            no.value = "false";
                            no.checked = true;
                        noDiv.appendChild(no);
                        var lbl = document.createElement("p"); lbl.textContent = "No"; lbl.className = "cpiggy_inline";
                        noDiv.appendChild(lbl);
                    var yesDiv = document.createElement("div");
                        yesDiv.className = "cpiggy_ctl2";
                        var yes = document.createElement("input");
                            yes.type = "radio";
                            yes.name = "autoCheck";
                            yes.value = "true";
                            yes.checked = (autoCheck == "true");
                        yesDiv.appendChild(yes);
                        var lbl = document.createElement("p");
                        lbl.textContent = "Yes";
                        lbl.className = "cpiggy_inline";
                        yesDiv.appendChild(lbl);
                ctlDiv.appendChild(noDiv);
                ctlDiv.appendChild(yesDiv);
        row.appendChild(cnDiv);
        row.appendChild(label);
        row.appendChild(ctlDiv);
        wrapper.appendChild(row);
        wrapper.appendChild(br);

        // Re-usable function to create standard Question: No Yes configuration
        // rows.
        function stdOptRow(question, btnName, btn1Label, btn2Label, enabled, wrapper) {
            // Display show/hide links
            var row = document.createElement("div");
            row.className = "cpiggy_rowDiv";
                var label = document.createElement("div");
                    label.textContent = question;
                    label.className = "cpiggy_label";
                    var ctlDiv = document.createElement("div");
                        ctlDiv.className = "cpiggy_ctlDiv";
                        var noDiv = document.createElement("div");
                            noDiv.className = "cpiggy_ctl1";
                            var no = document.createElement("input");
                                no.type = "radio";
                                no.name = btnName;
                                no.value = "false";
                                no.checked = true;
                            noDiv.appendChild(no);
                            var lbl = document.createElement("p"); lbl.textContent = btn1Label; lbl.className = "cpiggy_inline";
                            noDiv.appendChild(lbl);
                        var yesDiv = document.createElement("div");
                            yesDiv.className = "cpiggy_ctl2";
                            var yes = document.createElement("input");
                                yes.type = "radio";
                                yes.name = btnName;
                                yes.value = "true";
                                yes.checked = enabled;
                                yes.className = "cpiggy_ctl2";
                            yesDiv.appendChild(yes);
                            var lbl = document.createElement("p"); lbl.textContent = btn2Label; lbl.className = "cpiggy_inline";
                            yesDiv.appendChild(lbl);
                    ctlDiv.appendChild(noDiv);
                    ctlDiv.appendChild(yesDiv);
            row.appendChild(label);
            row.appendChild(ctlDiv);
            wrapper.appendChild(row);
            wrapper.appendChild(br);
        }

        stdOptRow("Display Show/Hide Links?", "displayShowHide", "No", "Yes", (displayShowHide == "true"), wrapper);

        stdOptRow("Show Washington DC?", "displayDC", "No", "Yes", (displayDC == "true"), wrapper);

        // Save/Cancel
        var pad4 = document.createElement("div");
        pad4.className = "cpiggy_pad";
        wrapper.appendChild(pad4);

        var row = document.createElement("div");
        row.className = "cpiggy_rowDiv";
            var cnDiv = document.createElement("div");
                cnDiv.className = "cpiggy_ctl3";
                var btnCancel = document.createElement("input");
                    btnCancel.id = "cpiggy_cancel";
                    btnCancel.type = "button";
                    btnCancel.value = "Cancel Changes";
                    btnCancel.click = function(){ return false; };
                cnDiv.appendChild(btnCancel);
                var spacer = document.createElement("div");
                    spacer.className = "cpiggy_spacer cpiggy_inline";
                    spacer.textContent = " ";
                cnDiv.appendChild(spacer);
                var btnSave = document.createElement("input");
                    btnSave.id = "cpiggy_save";
                    btnSave.type = "button";
                    btnSave.value = "Save Changes";
                    btnSave.click = function(){ return false; };
                cnDiv.appendChild(btnSave);
        row.appendChild(cnDiv);
        wrapper.appendChild(row);
        wrapper.appendChild(br);
        var pad5 = document.createElement("div");
        pad5.className = "cpiggy_pad";
        wrapper.appendChild(pad5);
        body.appendChild(wrapper);
        document.getElementById("cpiggy_checkForUpdates").addEventListener("click", checkForUpdates, false);
        document.getElementById("cpiggy_cancel").addEventListener("click", cancelChanges, false);
        document.getElementById("cpiggy_save").addEventListener("click", saveChanges, false);
        return true;
    }
    catch (e) {
        mlog("Failed to create Config screen :: " + e.message, 2);
        showAlert("Sorry, I wasn't able to display the CPIggy menu.  Please tell this to support -> " + e.message);
        return false;
    }
}

/******************************************************************************
***** Initialize preferences to sane values                               *****
******************************************************************************/
try {
    // The list of users to ignore.
    if (GM_getValue("iggyUsers") == undefined) {
        mlog("Setting default value for iggyUsers");
        GM_setValue("iggyUsers", "");
    }
    // The list of words to ignore.
    if (GM_getValue("iggyWords") == undefined) {
        mlog("Setting default value for iggyWords");
        GM_setValue("iggyWords", "");
    }
    // Should we automatically check for updates?
    if (GM_getValue("autoCheck") == undefined) {
        mlog("Setting default value for autoCheck to false");
        GM_setValue("autoCheck", "false");
    }
    // When was the last time we checked for available updates?
    if (GM_getValue("lastUpdateCheck") == undefined) {
        mlog("Setting default value for lastUpdateCheck to " + scriptStart);
        GM_setValue("lastUpdateCheck", scriptStart.toString());
    }
    // Should we automatically check for updates?
    if (GM_getValue("displayShowHide") == undefined) {
        mlog("Setting default value for displayShowHide to true");
        GM_setValue("displayShowHide", "true");
    }
    // Should we automatically check for updates?
    if (GM_getValue("displayDC") == undefined) {
        mlog("Setting default value for displayDC to true");
        GM_setValue("displayDC", "true");
    }

    // Initialize the internal variables to the stored values.
    var iggyUsers = GM_getValue("iggyUsers", "");
    // End newline characters may be the root of the settings corruption
    // issue.
    iggyUsers = iggyUsers.replace(/^\n*/, ""); // Strip any starting newlines
    iggyUsers = iggyUsers.replace(/\n+/g, "\n"); // Strip any consecutive newlines
    iggyUsers = iggyUsers.replace(/\n*$/g, ""); // Strip any ending newlines
    iggyUsers = iggyUsers.split("\n");
    mlog("iggyUsers = " + iggyUsers.toString());
    // iggyWords needs to have at least one item or the regex fails.  Seed it
    // with a garbage value that will never match.
    var iggyWords = GM_getValue("iggyWords", "") + "\nfaaaajfxmi43icinnjkaemxc8c8fcahfahfxnfgkjbvvdfccddjydcjy5dvjyscas4zwzzz";
    // End newline characters may be the root of the settings corruption
    // issue.
    iggyWords = iggyWords.replace(/^\n*/, ""); // Strip any starting newlines
    iggyWords = iggyWords.replace(/\n+/g, "\n"); // Strip any consecutive newlines
    iggyWords = iggyWords.replace(/\n*$/g, ""); // Strip any ending newlines
    iggyWords = iggyWords.split("\n");
    regxWords = new RegExp("(" + iggyWords.join("|") + ")\\W", "i");
    mlog("iggyWords = " + iggyWords.toString());
    mlog("regxWords = " + regxWords.toString());
    var autoCheck = GM_getValue("autoCheck", "false");
    mlog("autoCheck = " + autoCheck.toString());
    var lastUpdateCheck = GM_getValue("lastUpdateCheck", scriptStart.toString());
    mlog("lastUpdateCheck = " + lastUpdateCheck);
    var displayShowHide = GM_getValue("displayShowHide", "true");
    mlog("displayShowHide = " + displayShowHide.toString());
    var displayDC = GM_getValue("displayDC", "true");
    mlog("displayDC = " + displayDC.toString());
}
catch (e) {
    mlog("Greasemonkey host error, could not read or write values ::  " + e.message, 2);
    showAlert("Sorry, I wasn't able to read/write your settings.  Please tell this to support -> " + e.message);
}

/******************************************************************************
***** Display the CPIggy menu and create the dialogs                      *****
******************************************************************************/
try {
    genConfig();
    genAlert();
    genMenu();
    if (displayDC == "false") {
        removeDC();
    }
}
catch (e) {
    mlog("Could not display the CPIggy menu ::  " + e.message, 2);
    showAlert("Sorry, I wasn't able to display the CPIggy menu.  Please tell this to support -> " + e.message);
}

/******************************************************************************
***** Handle forum listings                                               *****
******************************************************************************/
if (window.location.toString().match("forumdisplay")) {
    try {
        // The XPath to the rows of the forum listing
        var result = document.evaluate("/html/body/table[2]/tbody/tr/td/form[3]/table/tbody/tr/td/table/tbody/tr", document, null, XPathResult.ANY_TYPE, null);
        // Removing the rows as we go messes up the indexing of our loop.
        // removeRows stores the rows we need to remove for later.
        removeRows = new Array();
        while (trow = result.iterateNext()) {
            try {
                // This XPath gets the anchor element that holds the user name
                iresult = document.evaluate("td[4]/a", trow, null, XPathResult.ANY_TYPE, null);
                var ta = iresult.iterateNext();
                var user = ta.textContent;
                if (iggyUsers.indexOf(user) > -1) {
                    removeRows.push(trow);
                }
                // This XPath gets the anchor element that holds the link
                // The first link is sometimes the arrow image, sometimes not.
                // In order to get the one we want we get the first one with a
                // title element.
                try {
                    iresult = document.evaluate("td[3]/a[@title!=\"\"]", trow, null, XPathResult.ANY_TYPE, null);
                    var ta = iresult.iterateNext();
                    var words = ta.textContent + " " + ta.title;
                    if (words.match(regxWords)) {
                        removeRows.push(trow);
                    }
                }
                catch (e) {
                }
            }
            catch (e) {
                //mlog(e.message, 2);
            }
        }
        // Remove the rows we identified as ignored.
        while (row = removeRows.pop()) {
            row.parentNode.removeChild(row);
        }
    }
    catch (e) {
        mlog("Error processing forum :: " + e.message, 2);
        showAlert("Sorry, I failed to process the forum correctly.  Please tell this to support -> " + e.message);
    }
}

/******************************************************************************
***** Handle thread bodies                                                *****
******************************************************************************/
else if (window.location.toString().match("showthread")) {
    // incrimenting variable to put a unique id on elements
    var i = 0;
    // We can't operate on the DOM while iterating, so create an array of
    // objects to hold everything we need while we determine which rows will
    // need to be fixed up.
    function post(prow, trow, nrow, itd, postId, footId, hlink) {
        this.prow = prow;
        this.trow = trow;
        this.nrow = nrow;
        this.itd = itd;
        this.postId = postId;
        this.footId = footId;
        this.hlink = hlink;
    }
    function quote(tquote, quoteId, innerH) {
        this.tquote = tquote;
        this.quoteId = quoteId;
        this.innerH = innerH;
    }
    var posts = new Array();
    var quotes = new Array();
    var result = document.evaluate("//*[@id=\"poststable\"]/tbody/tr/td/table/tbody/tr", document, null, XPathResult.ANY_TYPE, null);
    // Skip the first row, otherwise we throw an error when trying to access
    // the previousRow.
    result.iterateNext();
    while (trow = result.iterateNext()) {
        try {
            // Handle posts by users on iggy
            var iresult = document.evaluate("td/b", trow, null, XPathResult.ANY_TYPE, null);
            var user = "";
            try { user = iresult.iterateNext().textContent; } catch (e) { }
            var iggdUser = iggyUsers.indexOf(user);
            // Get the td element we'll be putting the link into
            var iresult = document.evaluate("td[2]/table/tbody/tr/td", trow.previousSibling.previousSibling, null, XPathResult.ANY_TYPE, null);
            var itd = iresult.iterateNext();
            var showLink = "";
            if (displayShowHide == "true") {
                showLink = getShowHide("Show/Hide post by CPIggy'd user " + iggyUsers[iggdUser], new Array("post" + i, "foot" + i));
            }
            if (iggdUser > -1) {
                ipost = new post (trow.previousSibling.previousSibling, trow, trow.nextSibling.nextSibling, itd, "post" + i, "foot" + i, showLink);
                posts.push(ipost);
                i = i + 1;
            }
        }
        catch (e) { mlog(e.message + i.toString()); }
    }
    // Put show/hide links on posts
    while (ipost = posts.pop()) {
        ipost.itd.innerHTML = ipost.hlink;
        ipost.trow.id = ipost.postId;
        ipost.trow.style.display = "none";
        ipost.nrow.id = ipost.footId;
        ipost.nrow.style.display = "none";
    }

    // Handle quotes
    // Reset counter
    i = 0;
    var result = document.evaluate("//*[@id=\"poststable\"]/tbody/tr/td/table/tbody/tr/td[2]/blockquote", document, null, XPathResult.ANY_TYPE, null);
    while (tquote = result.iterateNext()) {
        var user = tquote.childNodes[3].textContent;
        var iggdUser = iggyUsers.indexOf(user);
        if (iggdUser > -1) {
            quoteId = "quote" + i.toString();
            var showLink = "";
            if (displayShowHide == "true") {
                showLink = getShowHide("Show/Hide quote of CPIggy'd user " + iggyUsers[iggdUser], new Array(quoteId));
            }
            newQ = "<div class=\"smallfont\" style=\"padding-bottom:5px;\">" + showLink + "</div><div id=\"" + quoteId + "\">" + tquote.innerHTML + "</div>";
            iquote = new quote(tquote, quoteId, newQ);
            quotes.push(iquote);
            i = i + 1;
        }
    }
    // Put show/hide links on quotes
    while (iquote = quotes.pop()) {
        iquote.tquote.innerHTML = iquote.innerH;
        document.getElementById(iquote.quoteId).style.display = "none";
    }

    // Add the icon to add users to ignore
    var unames = new Array();
    var result = document.evaluate("//*[@id=\"poststable\"]/tbody/tr/td/table/tbody/tr/td[1]/b", document, null, XPathResult.ANY_TYPE, null);
    while (tb = result.iterateNext()) {
        unames.push(tb);
    }
    while (uname = unames.pop()) {
        var iggdUser = iggyUsers.indexOf(uname.innerHTML);
        if (iggdUser == -1) {
            addLink = document.createElement("img");
                addLink.src = nogif;
                addLink.className = "cpiggy_addLink";
                addLink.setAttribute("title", "Add User to CPIggy Ignore");
            uname.parentNode.insertBefore(addLink, uname.nextSibling);
            addLink.addEventListener("click", addIggyUser, false);
        }
    }
}

/******************************************************************************
***** Handle the rep screen                                               *****
******************************************************************************/
else if (window.location.toString().match("usercp.php?")) {
    try {
        var c = new Array();
        var result = document.evaluate("/html/body/table[2]/tbody/tr/td/table[3]/tbody/tr/td/table/tbody/tr", document, null, XPathResult.ANY_TYPE, null);
        result.iterateNext();
        while (trow = result.iterateNext()) {
            var user = trow.childNodes[7].childNodes[0].childNodes[0].textContent;
            var iggdUser = iggyUsers.indexOf(user);
            if (iggdUser > -1) {
                c.push(trow);
            }
        }
        while (quote = c.pop()) {
            quote.childNodes[9].childNodes[0].textContent = "(Comment removed by CPIggy)";
        }
    }
    catch (e) {
        mlog("Error handling rep quotes :: " + e.message, 2);
    }
}

/******************************************************************************
***** Do automatic update checking if enabled                             *****
******************************************************************************/
// 86400000 is the number of milliseconds in a day
if (autoCheck == "true" && (parseInt(scriptStart) > (parseInt(lastUpdateCheck) + 86400000))) {
    mlog("Doing automatic update check");
    checkForUpdates(true);
}

var scriptEnd = new Date();
var runtime = scriptEnd.getTime() - scriptStart;
mlog("Script run time was: " + runtime.toString() + "ms");
