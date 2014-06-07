// ==UserScript==
// @name            PF Hide Rating Column
// @author          mclark
// @namespace       http://forums.philosophyforums.com/members/mclark-40590.html
// @description     Hides the Rating column on forums.philosophyforums.com
// @license         Creative Commons Attribution License
// @version	    0.1
// @include         http://forums.philosophyforums.com/*
// @released        2011-10-13
// @updated         2011-10-13
// ==/UserScript==


function main()
{
    var divMain = getFirstElementByTagNameAndClass("div", "main");
    if (divMain == null)
    {
        return;
    }
    var ratingTable = findRatingTable(divMain.getElementsByTagName("table"));

    if (ratingTable == null)
    {
        return;
    }

    removeTableColumn(ratingTable, 4);
}



function getFirstElementByTagNameAndClass(tagName, className)
{
    var tags = document.getElementsByTagName(tagName);
    for(var i = 0; i < tags.length; i++)
    {
        if (tags[i].className == className)
        {
            return tags[i];
        }
    }
    return null;
}

function removeTableColumn(table, idx)
{
    var tableBody = table.tBodies[0]
    if (table.tHead) 
    {
        tableBody.rows[0].cell[idx].style.display='none';
        //var oneRow = table.tHead.rows[0];
        //oneRow.deleteCell(idx);
    }
    for (var i = 0; i < tableBody.rows.length; i++) 
    {
        tableBody.rows[i].cells[idx].style.display='none';
        //oneRow.deleteCell(idx);
    }
}

function findRatingTable(tables)
{
    for(var i = 0; i < tables.length; i++)
    {
        var table = tables[i];
        var tbodies = table.getElementsByTagName("tbody");
        if (tbodies.length == 0) continue;
        var tbody = tbodies[0];
        var trs = tbody.getElementsByTagName("tr");
        if (trs.length == 0) continue;
        var tr = trs[0];
        for(var j = 0; j < tr.childNodes.length; j++)
        {
            var th = tr.childNodes[j];
            if (th.nodeName != "TH") continue;
            //alert(th.firstChild.nodeType + " "  + th.firstChild.nodeValue);
            if (th.firstChild.nodeType == 3 
                    && trim(th.firstChild.nodeValue) == "Rating")
            {
                return table;
            }
        }
    }
    return null;
}

function trim(str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

main();
