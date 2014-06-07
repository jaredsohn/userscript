// ==UserScript==
// @name           SDN ignore list
// @description    Maintain a list of ignored users on Sun Developer Network (http://forums.sun.com). Threads and messages of the users matching the specified usernames will be hidden from view.
// @author         BalusC
// @namespace      http://forums.sun.com
// @include        http://forums.sun.com/forum.jspa*
// @include        http://forums.sun.com/thread.jspa*
// ==/UserScript==

// Specify your array of ignored users here.
var ignoredUsers = new Array('username', 'anotherName', 'CaseSensitive!');

// Block users in forums.
if (window.location.href.indexOf('/forum.jspa') > -1) {
    var tables = document.getElementsByTagName('table');
    for (var i = 0; i < tables.length; i++) {
        var tableRows = tables[i].getElementsByTagName('tr');
        if (tableRows.length < 1 || tableRows[0].bgColor != '#507c9a') continue;
        var bgColorToggle = false;
        for (var j = 1; j < tableRows.length; j++) {
            var tableCells = tableRows[j].getElementsByTagName('td');
            if (tableCells.length < 2) continue;
            var secondCellLinks = tableCells[1].getElementsByTagName('a');
            if (secondCellLinks.length < 1) continue;
            var username = secondCellLinks[0].firstChild.nodeValue;
            if (ignoredUsers.indexOf(username) > -1) {
                tableRows[j].style.display = 'none';
            } else {
                // Reapply background color of the alternated rows.
                tableRows[j].className = '';
                tableRows[j].bgColor = bgColorToggle ? '#e4ecf0' : '#ffffff';
                bgColorToggle = !bgColorToggle;
            }
        }
        break;
    }
}

// Block users in threads.
else if (window.location.href.indexOf('/thread.jspa') > -1) {
    var tables = document.getElementsByTagName('table');
    for (var i = 0; i < tables.length; i++) {
        var tableRows = tables[i].getElementsByTagName('tr');
        if (tableRows.length < 3 || tableRows[2].bgColor != '#507c9a') continue;
        for (var j = 3; j < tableRows.length; j++) {
            var tableCells = tableRows[j].getElementsByTagName('td');
            if (tableCells.length < 1) continue;
            var firstCellLinks = tableCells[0].getElementsByTagName('a');
            if (firstCellLinks.length < 1) continue;
            var username = firstCellLinks[0].firstChild.nodeValue;
            if (ignoredUsers.indexOf(username) > -1) {
                tableRows[j].style.display = tableRows[++j].style.display = 'none';
            }
        }
        break;
    }
}
