// tested with GreaseMonkey 0.8.20080609.0 and DGS 1.0.14

// ==UserScript==
// @name           Time Remaining in DGS Games
// @namespace      http://www.dmwit.com
// @description    Adds a column to the list of games on the status page indicating time left in each game
// @include        *dragongoserver.net/status.php*
// ==/UserScript==

function xpath(query, node) {
    if(node == null) node = document;
    return document.evaluate(query, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathSingle(query, node) { return xpath(query, node).snapshotItem(0); }
function xpathText  (query, node) { return xpathSingle(query, node).textContent; }
function id(s) { return document.getElementById(s); }

function sortByTime() {
    var gameTable = xpathSingle("//table[@id='gameTable']/tbody");
    var rows      = xpath("//table[@id='gameTable']/tbody/tr[contains(@class,'Row')]");

    var rowsCopy  = [];
    for(i = 0; i < rows.snapshotLength; i++)
        rowsCopy.push(rows.snapshotItem(i));
    rowsCopy.sort(function(a, b) { return a.getAttribute('hoursleft') - b.getAttribute('hoursleft'); });

    for(i = 0; i < rowsCopy.length; i++) {
        var row = rowsCopy[i];
        gameTable.appendChild(row);
        row.className = ((row.className.indexOf('Hil') < 0) ? "" : "Hil") + "Row" + (i % 4 + 1);
    }
}

function parseQuickStatus(response) {
    if(response.status != 200) return;
    if(response.responseText.indexOf('\n') == -1) return;

    var s = response.responseText;
    var i = s.indexOf('\n') + 1;
    var j = s.indexOf('\n', i);
    var gameTime = {};

    while(i < s.length) {
        var line = eval('[' + s.substring(i, j) + ']');
        gameTime[line[1]] = line[5];

        i = j + 1;
        j = s.indexOf('\n', i);
        if(j == -1) j = s.length;
    }

    header = document.createElement('th');
    header.innerHTML = '<a href="javascript:void(0)">Time Remaining</a>';
    header.setAttribute('valign', 'bottom');
    header.childNodes[0].addEventListener('click', sortByTime, false);
    id('TableHead').appendChild(header);

    var games = xpath("//table[@id='gameTable']/tbody/tr[@class!='Head']");
    for(i = 0; i < games.snapshotLength; i++) {
        var tr   = games.snapshotItem(i);
        var game = xpathText("./td[@class='Button']/a", tr);

        var td   = document.createElement('td');
        td.innerHTML = gameTime[game];
        tr.setAttribute('hoursleft', parseHours(gameTime[game]));
        tr.appendChild(td);
    }
}

function parseHours(s) {
    if(s.indexOf('---') >= 0) return 0;
    var hours = parseFragment(s);

    switch(s.charAt(0)) {
        case 'F': // Fischer time
            return hours;
        case 'C': // Canadian time
            var byoyomi = s.indexOf('/');
            if(byoyomi < 0) return hours;
            else            return hours / Number(s.substring(byoyomi + 1));
        case 'J': // Japanese time
            var byoyomi = s.indexOf('+');
            var periods = s.indexOf('*');
            if(byoyomi < 0) return hours;
            else            return parseFragment(s.substring(0, byoyomi)) + parseFragment(s.substring(byoyomi + 1, periods)) * Number(s.substring(periods + 1));
    }
}

function parseFragment(s) {
    var right = function(t) { return t.substring(0, t.length - 1); }
    var days  = s.match(/[0-9]*d/) || ['0d'];
    var hours = s.match(/[0-9]*h/) || ['0h'];
    days  = Number(right(days [0]));
    hours = Number(right(hours[0]));
    return 15 * days + hours;
}

account = xpathText("//a[@id='loggedId']");
GM_xmlhttpRequest({
    method  : 'GET',
    url     : 'http://www.dragongoserver.net/quick_status.php?user=' + account,
    onload  : parseQuickStatus
});