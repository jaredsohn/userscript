// ==UserScript==
// @name           Ogame: Lystnactifs
// @namespace      Lyn
// @version        1.0
// @date           2013-04-29
// @description    Ajout d'un lien d'espionnage dans la mailbox
// @include        http://*.ogame.*/game/index.php?page=messages
// ==/UserScript==

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function getLink(g, s, a) {
    return ("http://uni68.ogame.fr/game/index.php?page=fleet1&amp;galaxy=" + g + "&amp;system=" + s + "&amp;position=" + a + "&amp;type=1&amp;mission=" + constants.espionage);
}

function modifyLinks() {
    var cells = document.getElementsByTagName("td");

    for (var i = 0; i < cells.length; ++i)
    {
        var cell = cells[i];

        if (cell.className == "subject")
        {   
            var reg = /\[[0-9]:[0-9]+:[0-9]+\]/;
            var coords = reg.exec(cell.innerHTML);
            
            if (coords)
            {
                var d = String(coords).replace("[", "").replace("]", "").split(":");
                if (d.length == 3 && cell.innerHTML.indexOf("Rapport d`e") !== -1)
                {
                    var link = document.createElement('span');
                    link.innerHTML = "<a href=\"" + getLink(d[0], d[1], d[2]) + "\">[Spy]</a>";
                    cell.innerHTML = cell.innerHTML.replace("Rapport d`e", "E");
                    cell.appendChild(link);
                }
            }
        }
    }

    return false;
}

function addMenu()
{
    var menu = document.getElementById('playerName').nextSibling.nextSibling;
    if (menu)
    {
        var container = document.createElement('li');
        container.innerHTML = '<a id="change_links" href="javascript:void(0);">Liens</a>';
        insertAfter(menu, container);
        document.getElementById('change_links').addEventListener('click', modifyLinks, true);
    }
}

addMenu();
