// ==UserScript==
// @name           c-plusplus.de: Alle Beiträge auf einer Seite
// @namespace      c-plusplus.de
// @description    Fügt der Threadübersicht Links zur Anzeige aller Beiträge mehrseitiger Threads hinzu
// @include        http://*c-plusplus.de/forum/viewforum-*.html
// ==/UserScript==

function modifyPageLists()
{
    pages = document.evaluate(
        "/html/body/table[2]/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr/td[2]/span[2][count(a)>0]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
   
    for(var i = 0; i < pages.snapshotLength; ++i)
    {
        span = pages.snapshotItem(i);       
		var link = String(span.getElementsByTagName("a")[0]);
		
        span.innerHTML = span.innerHTML +
            " [ <a href='" +
             link.substr(0, link.length-5) +
             "-and-printview-is-1.html'>alles</a> ]";
    }
}

modifyPageLists();
