// ==UserScript==
// @name           what.cd - Add View Filelist Links
// @namespace      onefish
// @description    Creates a link that shows the list of files in a torrent on the current page.
// @match          http://*.what.cd/*
// @match          https://*.what.cd/*
// @version        0.9.6
// @installURL     https://userscripts.org/scripts/source/114268.user.js
// @downloadURL    https://userscripts.org/scripts/source/114268.user.js
// @updateURL      https://userscripts.org/scripts/source/114268.meta.js
// ==/UserScript==

function getFile(filename) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filename, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

function toggleFileList(event) {
    thisElement = event.target;
    if (thisElement.getAttribute('title') != null) {
        if (thisElement.getAttribute('title') == 'View Filelist') {
            torrentID = thisElement.getAttribute('torrentID');
            if (thisElement.getAttribute('clicked') == 'false') {
                filesListText = getFile('/torrents.php?torrentid=' + torrentID);
                filesListText = '<div id="' + filesListText.substring(filesListText.indexOf('files_' + torrentID + '" class="hidden">'));
                filesListText = filesListText.substring(filesListText.indexOf('<table style='), filesListText.indexOf('</table></div>')) + '</table>';
                filesListTable = document.createElement('div');
                filesListTable.innerHTML = filesListText;
                tables = document.getElementsByTagName('table');
                for (q = 0; q < tables.length; q++) {
                    torrentTable = tables[q].getElementsByTagName('tbody')[0];
                    for (i = 0; i < torrentTable.rows.length; i++) {
                        linksInRow = torrentTable.rows[i].getElementsByTagName('a');
                        if (linksInRow[0] != undefined) {
                            if (linksInRow[0].getAttribute('href').indexOf(torrentID) > 0) {
                                insertedTr = torrentTable.insertBefore(document.createElement('tr'), torrentTable.rows[i + 1]);
                                insertedTd = document.createElement('td');
                                insertedTd.setAttribute('colspan', 10);
                                insertedTd.style.padding = "20px";
                                insertedTd.appendChild(filesListTable);
                                insertedTr.appendChild(insertedTd);
                                insertedTr.setAttribute('torrentID', torrentID);
                                insertedTr.setAttribute('id', 'VFButton_' + torrentID);
                                insertedTr.querySelector('.hidden').classList.remove('hidden');
                            }
                        }
                    }
                }
                thisElement.setAttribute('clicked', 'true');
            } else {
                thisRow = document.getElementById('VFButton_' + torrentID);
                if (thisRow.getAttribute('class') == 'hidden') thisRow.setAttribute('class', '');
                else thisRow.setAttribute('class', 'hidden');
            }
        }
    }
}

function addLinks() {
    anchors = document.getElementById('content').querySelectorAll('[title=Download]');
    for (j = 0; j < anchors.length; j++) {
                thisSpan = anchors[j].parentNode;
                thisHref = anchors[j].getAttribute('href');
                vfLink = document.createElement('a');
                vfLink.innerHTML = 'VF';
                vfLink.setAttribute('torrentID', thisHref.substring(thisHref.indexOf('id=') + 3, thisHref.indexOf('&auth')));
                vfLink.setAttribute('clicked', 'false');
                vfLink.setAttribute('title', 'View Filelist');
                vfLink.setAttribute('href', '#');
                vfLink.setAttribute('onclick', '; return false');
                thisSpan.insertBefore(document.createTextNode(' | '), thisSpan.lastChild);
                thisSpan.insertBefore(vfLink, thisSpan.lastChild);
    }
    document.addEventListener("click", toggleFileList, false);
}

addLinks();