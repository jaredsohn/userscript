// ==UserScript==
// @name           ISS
// @namespace      C3--@live.com
// @description    Imperial Scouting Service
// @include        http://www.cybernations.net/allNations_display_alliances.asp?*
// @include        http://www.cybernations.net/teams.asp
// ==/UserScript==

//-------Methods-------
Array.prototype.has = function (v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == v) { return i + 1; }
    }
    return false;
}

//------Variables------
var rulers = eval(GM_getValue('rulers', 'new Array()'));
var stats = eval(GM_getValue('stats', 'new Array()'));

//------Main Line-----
if (document.location.href.match("http://www.cybernations.net/allNations_display_alliances.asp?")) {
    var target = document.getElementById("table23").parentNode.childNodes[9].childNodes[1].firstChild.childNodes[1].childNodes[1].childNodes[1].firstChild;
    var td = document.createElement("td");
    var center = document.createElement("center");
    td.setAttribute("width", "100%");
    td.appendChild(center);
    target.parentNode.insertBefore(td, target);

    var grabStatsButton = document.createElement("input");
    grabStatsButton.setAttribute("class", "Buttons");
    grabStatsButton.setAttribute("type", "button");
    grabStatsButton.setAttribute("id", "grabStatsButton");
    grabStatsButton.value = "Grab Stats";
    center.appendChild(grabStatsButton);
    grabStatsButton.addEventListener("click", grabStats, true);

    var clearStatsButton = document.createElement("input");
    clearStatsButton.setAttribute("class", "Buttons");
    clearStatsButton.setAttribute("type", "button");
    clearStatsButton.setAttribute("id", "clearStatsButton");
    clearStatsButton.value = "Clear Stats";
    center.appendChild(clearStatsButton);
    clearStatsButton.addEventListener("click", clearStats, true);
} else if (document.location.href.match("http://www.cybernations.net/teams.asp")) {
    var box = document.createElement("textarea");
    document.getElementById("table2").parentNode.appendChild(box);
    var paste = "";
    for (var i = 0; i < rulers.length; i++) {
        paste += '[url="www.cybernations.net/nation_drill_display.asp?Nation_ID=' + stats[i][0] +'"]' + rulers[i] + '[/url] [b]Strength:[/b] ' + stats[i][1] + ' [b]Infra:[/b] ' + stats[i][2] + ' [b]Tech:[/b] ' + stats[i][3] + ' [b]Nukes:[/b] ' + stats[i][4] + '\r';
    }
    box.value = paste;
}
//-----Functions------
function grabStats() {
    var rulerNodes = document.evaluate("//a[contains(@href, 'send_message.asp?Nation_ID=')]", document, null, 7, null);

    for (var i = 0; i < rulerNodes.snapshotLength; i++) {
        var thisRuler = rulerNodes.snapshotItem(i).parentNode.parentNode.parentNode;

        var ruler = thisRuler.childNodes[3].childNodes[1].childNodes[1].innerHTML;

        if (!rulers.has(ruler)) {
            var nationID = thisRuler.childNodes[3].childNodes[1].childNodes[1].href.replace("http://www.cybernations.net/nation_drill_display.asp?Nation_ID=", "");

            try {
                var nukes = thisRuler.childNodes[5].childNodes[1].childNodes[3].getAttribute("title").replace("Nukes: ", "");
            }
            catch (err) {
                var nukes = "N/A";
            }
            var strength = thisRuler.childNodes[10].firstChild.innerHTML;
            var infra = thisRuler.childNodes[11].firstChild.innerHTML;
            var tech = thisRuler.childNodes[12].firstChild.innerHTML;

            rulers.push(ruler);
            var temp = [nationID, strength, infra, tech, nukes]
            stats.push(temp);
        }
    }
    GM_setValue("rulers", uneval(rulers));
    GM_setValue("stats", uneval(stats));

    alert(rulers.length);
}

function clearStats() {
    GM_setValue("rulers", "[]");
    GM_setValue("stats", "[]");
    rulers = eval(GM_getValue('rulers', 'new Array()'));
    stats = eval(GM_getValue('stats', 'new Array()'));
    alert("Names Cleared");
}