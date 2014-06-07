// ==UserScript==
// @name           what.cd - more info on better.php lists
// @namespace      onefish
// @description    shows the number of seeds and snatches as well as the age of each torrent displayed by better.php
// @match          http://*.what.cd/better.php?*
// @match          https://*.what.cd/better.php?*
// @version        0.3.1
// @installURL     https://userscripts.org/scripts/source/138409.user.js
// @downloadURL    https://userscripts.org/scripts/source/138409.user.js
// @updateURL      https://userscripts.org/scripts/source/138409.meta.js
// ==/UserScript==

function requestInfo(tgtP, tgtTd, tgtID, tgtGID) {
    requestString = ('/torrents.php?id=' + tgtGID + '&torrentid=' + tgtID + '#torrent' + tgtID);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            onResponse(this.responseText, tgtP, tgtTd, tgtID, tgtGID);
        }
    }
    xmlhttp.open("GET", requestString, true);
    xmlhttp.send();
}

function onResponse(response, tgtP, tgtTd, tgtID, tgtGID) {
    activeString = response.slice(response.indexOf('#torrent_' + tgtID));
    timeString = activeString.slice(activeString.indexOf('time tooltip')+21, activeString.indexOf('</span'));
    timeString = timeString.slice(0, timeString.indexOf('">'));
    activeString = activeString.slice(0, activeString.indexOf(tgtGID));
    Active = activeString.split('<td');
    Active.shift();
    Active.shift();
    for (i = 0; i < 3; i++) {
        Active[i] = Active[i].slice(Active[i].indexOf('column">') + 8, Active[i].indexOf('</td'));
    }
    tgtDate = new Date(timeString);
    tgtAge = Math.round((now - tgtDate.getTime()) / 86400000);
    tgtP.appendChild(document.createTextNode('[' + Active[2] + '↓  ' + Active[1] + '↑  ' + Active[0] + 'ø  |  ' + tgtAge + 'd]'));
    if(parseInt(Active[1].replace(',','')) > 12 || parseInt(Active[0].replace(',','')) > 120) tgtP.setAttribute('style', tgtP.getAttribute('style') + 'color: #bb9900;');
	if(parseInt(Active[1].replace(',','')) > 20 || parseInt(Active[0].replace(',','')) > 200) tgtP.setAttribute('style', tgtP.getAttribute('style') + 'color: #dd8833;');
	if(parseInt(Active[1].replace(',','')) > 90 || parseInt(Active[0].replace(',','')) > 900) tgtP.setAttribute('style', tgtP.getAttribute('style') + 'color: #ee6622;');
	if(parseInt(Active[1].replace(',','')) > 200 || parseInt(Active[0].replace(',','')) > 2000) tgtP.setAttribute('style', tgtP.getAttribute('style') + 'color: #ff4411;');
}

function processPage() {
    tds = document.getElementById('content').getElementsByTagName('td');
    for (j = 0; j < tds.length; j++) {
        tdString = tds[j].innerHTML;
        if (tdString.indexOf('<a href="torrents.php?action=download') != -1) {
            tgtTd = tds[j];
            tgtID = tdString.slice(tdString.indexOf('torrents.php?action=download&amp;id=') + 36, tdString.indexOf('&amp;authkey='));
            tgtGID = tdString.slice(tdString.indexOf('href="torrents.php?id=') + 22, tdString.indexOf('" title="View Torrent"'));
            tgtP = document.createElement('span');
			tgtP.setAttribute('style', 'float: right; float: right; margin-top: -2em !important;');
            if (tdString.indexOf('<div class="tags">') >= 0) {
                tgtTd.insertBefore(tgtP, tgtTd.getElementsByTagName('br')[0]);
            } else {
                tgtTd.appendChild(tgtP);
            }
            requestInfo(tgtP, tgtTd, tgtID, tgtGID);
        }
    }
}

now = new Date().getTime();
processPage();