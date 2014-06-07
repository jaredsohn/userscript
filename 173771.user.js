// ==UserScript==
// @name            [HF] Filter Results
// @description     Filters out the unwanted forums in new posts.
// @author          Gambino
// @copyright       Gambino 2013+ (http://userscripts.org/users/521590)
//
// @version         1.0.1
//
// @match           http://*.hackforums.net/search.php?action=*
//
// @history         1.0.1 - Script created
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

var tblMain, trInner, tdInner, aInner, footer, scrinput, s, scrsave;

footer = document.getElementsByClassName('quick_keys')[0];
footer.innerHTML += "<br /><span id='scrtoggle' style='cursor: pointer'>[Filter Results Settings]</span>   " +
    "-- <span id='scrsave' style='cursor: pointer'>[Save Settings]</span><br />" +
    "<span id='scrlbl' style='display: none'>Forum Filter Names:</span><br />" +
    "<textarea id='scrinput' style='display: none' rows='10' cols='50' </textarea>";
tblMain = document.getElementsByTagName("table")[1];
trInner = tblMain.getElementsByTagName("tr");
scrinput = document.getElementById('scrinput');
scrsave = document.getElementById('scrsave');
document.getElementById('scrtoggle').addEventListener("click", showSettings, false);
scrsave.addEventListener("click", saveSettings, false);

s = getStoredSetting("fNames");

if (s == null) {
    s = ["Enter a filter!"];
}

for (i = 0; i < s.length; i++) {
    scrinput.value += "\n" + s[i];
}

removeLineBreaks();

for (i = trInner.length - 1; i > 0; i--) {
    tdInner = trInner[i].getElementsByTagName("td")[3];
    aInner = tdInner.getElementsByTagName("a")[0];
    for (k = 0; k < s.length; k++) {
        if (aInner.innerHTML.indexOf(s[k]) != -1) {
            console.log(s[k] + " was found and removed!");
            trInner[i].remove();
        }
    }
}

function showSettings() {
    if (scrinput.style.display != "block") {
        scrinput.style.display = "block";
        document.getElementById('scrlbl').style.display = "inline";
    } else {
        scrinput.style.display = "none";
        document.getElementById('scrlbl').style.display = "none";
    }
}

function saveSettings() {
    removeLineBreaks();
    s = scrinput.value.split("\n");
    setStoredSetting("fNames", s);
    scrsave.textContent = "[Saved]";
    setTimeout(function () {
        scrsave.textContent = "[Save Settings]";
    }, 2000);
}

function getStoredSetting(aKey) {
    var getStored = localStorage.getItem(aKey);
    return JSON.parse(getStored);
}

function setStoredSetting(aKey, aVal) {
    var setStored = JSON.stringify(aVal);
    localStorage.setItem(aKey, setStored);
}

function removeLineBreaks() {
    scrinput.value = scrinput.value.replace(/(\r?\n){2,}/g, '\n').replace(/^\r?\n|\r?\n$/g, '');
}