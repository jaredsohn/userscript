// ==UserScript==
// @name            ipTorrents XBLA/DLC/XBLIG Filter
// @description     Hide XBLA/DLC/XBLIG from X360 Category on ipTorrents by demitrix
// @include           http://*.iptorrents.com/browse.php?cat=44*
// ==/UserScript==

if (location.href.match('iptorrents.com/browse.php\\?cat=44')) {
    var viewXBLA = false;
    var viewDLC = false;
    var viewXBLIG = false;

    var table = document.getElementsByTagName('table')[7];
    var hideMenu = document.createElement('p');

    var spacer1 = document.createElement('b');
    spacer1.appendChild(document.createTextNode(' | '));

    var spacer2 = document.createElement('b');
    spacer2.appendChild(document.createTextNode(' | '));

    var menuXBLA = document.createElement('b');
    var linkXBLA = document.createElement('a');
    linkXBLA.href = '#';
    linkXBLA.appendChild(document.createTextNode('Hide XBLA'));
    linkXBLA.addEventListener('click', hideXBLA, false);
    menuXBLA.appendChild(linkXBLA);

    var menuDLC = document.createElement('b');
    var linkDLC = document.createElement('a');
    linkDLC.href = '#';
    linkDLC.appendChild(document.createTextNode('Hide DLC'));
    linkDLC.addEventListener('click', hideDLC, false);
    menuDLC.appendChild(linkDLC);

    var menuXBLIG = document.createElement('b');
    var linkXBLIG = document.createElement('a');
    linkXBLIG.href = '#';
    linkXBLIG.appendChild(document.createTextNode('Hide XBLIG'));
    linkXBLIG.addEventListener('click', hideXBLIG, false);
    menuXBLIG.appendChild(linkXBLIG);

    hideMenu.appendChild(menuXBLA);
    hideMenu.appendChild(spacer1);
    hideMenu.appendChild(menuDLC);
    hideMenu.appendChild(spacer2);
    hideMenu.appendChild(menuXBLIG);

    table.parentNode.insertBefore(hideMenu, table);

hideXBLA();
hideDLC();
hideXBLIG();



    function hideXBLA(e) {
        viewXBLA = (viewXBLA == false) ? true : false;
        var allRows = table.getElementsByTagName('tr');
        var rowCount = allRows.length;
        for (i = 1; i < rowCount; i++) {
            var allCells = allRows[i].getElementsByTagName('td');
            if (allCells[1].firstChild.firstChild.firstChild.firstChild.data.match("XBLA")) {
                var row = allRows[i];
                if (viewXBLA) {
                    row.style.display = 'none';
                }
                else {
                    row.style.display = '';
                }
            }
        }
        linkXBLA.replaceChild(document.createTextNode((viewXBLA == false) ? 'Hide XBLA' : 'Show XBLA'), linkXBLA.firstChild);
if(e){
        e.preventDefault();
}
    }
    function hideDLC(e) {
        viewDLC = (viewDLC == false) ? true : false;
        var allRows = table.getElementsByTagName('tr');
        var rowCount = allRows.length;
        for (i = 1; i < rowCount; i++) {
            var allCells = allRows[i].getElementsByTagName('td');
            if (allCells[1].firstChild.firstChild.firstChild.firstChild.data.match("DLC")) {
                var row = allRows[i];
                if (viewDLC) {
                    row.style.display = 'none';
                }
                else {
                    row.style.display = '';
                }
            }
        }
        linkDLC.replaceChild(document.createTextNode((viewDLC == false) ? 'Hide DLC' : 'Show DLC'), linkDLC.firstChild);
if(e){
        e.preventDefault();
}
    }
    function hideXBLIG(e) {
        viewXBLIG = (viewXBLIG == false) ? true : false;
        var allRows = table.getElementsByTagName('tr');
        var rowCount = allRows.length;
        for (i = 1; i < rowCount; i++) {
            var allCells = allRows[i].getElementsByTagName('td');
            if (allCells[1].firstChild.firstChild.firstChild.firstChild.data.match("XBLIG")) {
                var row = allRows[i];
                if (viewXBLIG) {
                    row.style.display = 'none';
                }
                else {
                    row.style.display = '';
                }
            }
        }
        linkXBLIG.replaceChild(document.createTextNode((viewXBLIG == false) ? 'Hide XBLIG' : 'Show XBLIG'), linkXBLIG.firstChild);
if(e){
        e.preventDefault();
}
    }
}