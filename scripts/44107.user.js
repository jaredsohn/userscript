// ==UserScript==
// @name           KG-IMDb
// @namespace      http://userscripts.org/users/42134
// @description    IMDb enhancer search bar
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*
// ==/UserScript==

//This script is based on "IMDb->DirectSearch Fixed" from mohanr and "itas" from tukankaan
// Modification by KaraGarga
// 23 June 2008
// version 0.2

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/


// --------------- SEARCH ENGINES --------------- 
//  You can remove or comment out below lines if you disable/enable a search engine from the script.
// use this site to embed favicon.ico http://www.greywyvern.com/code/php/binary2base64


var trackers = new Array();

//opensubtitles.org  via IMDb-ID
trackers.push(new SearchEngine("opensubtitles via IMDb-ID", "http://www.opensubtitles.org/pb/search/imdbid-%imdb-id", true, "data:application/octet-stream;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqqqr///////+qqqoAAAAAAADMzMzu7u7///////9VVVUAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACZmZmIiIgAAACIiIgAAAAAAABERETd3d0AAAAAAAAAAAAAAADu7u4REREAAAAAAAARERHu7u4AAABERET////////d3d0zMzMAAAAAAAAAAAAAAADd3d0iIiIAAAAAAAARERHd3d0AAADd3d1EREQAAAAAAAAAAAAAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACqqqp3d3cAAADMzMxEREQAAAARERHd3d0AAAAAAAAAAAAAAAAAAACZmZn///////+qqqoAAAAAAAAiIiLu7u7////////u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//Mininova via IMDb-ID
trackers.push(new SearchEngine("Mininova via IMDb-ID", "http://mininova.org/imdb/%imdb-id/seeds", true, "data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////ANx3RgDdEREA7rmeAOWXbgD44NcA8825AOuphAD68ekA34BQAOJ+RgDx0MEA/PLxAP/99wDmkmsAMzMzMzMzMzMxEREREREREzERERERERETMRERERERERMxonHCoRUkEzGiccKhFSQTMaJxwqEVJBMxonHCsRUkEzGiQXItHyQTMaK08iVCJxMxoosixSL+EzGZ7W0eZuETMRERERERERMxEREREREREzERERERERETMzMzMzMzMzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//ThePirateBay
trackers.push(new SearchEngine("PirateBay", "http://thepiratebay.org/search/%title/0/99/200", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAACbUlEQVQ4y5XRS08TURjG8f+ZablYwEK4KRGE1AsXEYSALjTRxIWGhRuXuvCr+A3cGHdudEHcaQgYNUGMiFEsNhS51xZoSykMdDq9zPQcF0QiKQnx2bzJWfzynucVUkrFETGNbSq8NRwX7ahHK2Uw/20cADufQ0r5f8D30WE8J2vIpPcIBacRQqCUOh7I57JshpfImAaeqmrGnj0mGZrDSGwQX1tBSolS6tBGB0DBsQlMjGLubjMw9IDFqbdY8VXyVoqJl08o91RhpQySsQhZyywGMuYuuttNLpMmtjzLmn+C89eH2I3Mc/bSAPl0ip1YhMgvP+WeymJAKkVVTT3+N89JbYZp6bvJ8uQYe5trnL7QS2x1ji+vntLS0YcQohio9NaSWAlQSO8QX/xJYmmGOl83CI1STxVbv+cpKy3FW9t4dIlCCLIpg+rmdvLpPVqv3cE3eBu9zEPI/4nI9AdOeGvRdL0YsPM57HyO+nM9FLImlpHA3IoyOzFCXVsngbEX6JqGnTGLzukC0HSdtYUAq9Pj7CXWEUIQDU5RyFpougulJAowoiGMWITqU82HN9B1F4nwEtH5HzjoOFopuMpo6L5BRUsX5Q2tlFQ34m1uJ/h5/9RFHdQ0neXy3YfIEg+7pollS2LhFQoK4usRyutaqPX1cPXeI3SX++Arrr9Aa2c/dU1tJBNxFvyTNFzsxzSSzPm/Igs221MfydgFvI3N+LquHO4AwLFtYhthJsffoQGLwRlWg35kwUEBynFIGiNk8g6ay03GStPRO4iQUiopJe9fD7MeWsLJWiAEKLU//4lAAArdXcIZXzu3hu7zBwwEMI4IoRqNAAAAAElFTkSuQmCC"));

//Demonoid
trackers.push(new SearchEngine("Demonoid", "http://www.demonoid.com/files/?category=1&subcategory=0&language=0&quality=0&seeded=0&external=2&query=%title&uid=0&sort=S", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAACR0lEQVQ4y8WTz0sUYRjHP7M7O+4P29zdljQE3RKULCSLQIyKiYLoUBBdO+TFoEuXKCjoWgQdPRlEd/sLHC+F6aVwbUstcl01WRvd3dlxdmaceTvIatIPvPWcvrwP75eH5/l84X+WqqpCqov6o6Zp0l4+1rVcF3ceRfGEAHaaf6uBey7gMPw0tmOgr3pkOhp5+DzK4kKV9iMJQqEAnu8DgrJuo+s2TUmwLJtvX2pAjEDdoFyykQJg1wQfP5TRV2s4jsAyfSzTJxJVqJQcFuaLhCMNzOR0NE2Ttg2cWgghBIGAxOVrbSRSYRxb8HZsGc/32PQ8WjM+zYeaqJolioXY7h1I8gaIOEHZp1hcx6x6hGSFrmMp1leDGNVFIjEPOeQSCsaxnO+oqiqCqqqKwQcNtB+OkZ8vk52UUNxLdLTcYGpykwv9d+lqu85sNsyb0R9IUpQNZ4HTZ32mxpNbEywvVZh+34jinqPvxBlOnuohnU5RqRjIskwy1UTzwRauXrlJOt3Kk2f36Tmf25q8fteBW7fp7T1OONqAtWGhKAqu62IYBolEgkKhQDKZJJ+fp1QyeflqCHxl6wqapknDL4ao2Q4tza3Mzc2xsrJCZ2cnpmmSy+Xo7u7GdX1KJYNKRQdfQdM0KVhfYiaTeZxfHqdxH4yNTrA/foBYNM67iQk+f5ohEIDc7BgjI6+Zzs5sE7sLW1VVRd9FC09UCAZ9fCEQvoTtlNHX1iivC4yl/l24/8b9r5xnjuqEwxEct8bXbPKPWflncPYSsp+9dAnY5lgLkAAAAABJRU5ErkJggg%3D%3D"));

// TorrentLeech
trackers.push(new SearchEngine("TorrentLeech", "http://www.torrentleech.org/browse.php?search=%title&cat=0", false, "data:data:image/x-icon;base64,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%3D"));
// --------------- END OF SEARCH ENGINES ---------------  



function xpath(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function SearchEngine(shortname, searchurl, usesIMDBID, icon) {
	this.shortname = shortname;
	this.searchurl = searchurl;
	this.usesIMDBID = usesIMDBID;
	this.icon = icon;
	
	this.getHTML = function (title, id) {
		var html = "<a href=\"" + this.getSearchUrl(title, id) + "\"><img class=\"img\" style=\"-moz-opacity: 0.4;\" border=\"0\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
		return html;
	}
	
	this.getSearchUrl = function (title, id) {
		var searchUrl = this.searchurl;
		if (this.usesIMDBID) {
			searchUrl = searchUrl.replace(/%imdb\-id/, id);
		}
		else {
			searchUrl = searchUrl.replace(/%title/, encodeURIComponent(title));
		}
		
		return searchUrl;
	}	
}

function openAllInTabs(title, id, inclIMDBID) {
	for (var i = 0; i < trackers.length; i++) {
		if (trackers[i].usesIMDBID && !inclIMDBID)
			continue;
		else
			GM_openInTab(trackers[i].getSearchUrl(title, id));
	}
}

function getTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	
	/*
	regexp = /'|,|:/g;
	title = title.replace(regexp, " ");
	*/
	
	return title;
}


function getId() {
	with (location.href) {
		var id = match(/title\/tt(.*?)\//i)[1];
	}
	return id;
}


function addIconBarIcons(title, id, trackers) {
 var iconbar = xpath("//h1", document);
    if (!iconbar || iconbar.snapshotLength != 1) {
    GM_log("Error! Couldn't find icon bar. Quitting!");
    return;
  }

	iconbar = iconbar.snapshotItem(0);
	iconbar.id = "iconbar";
	
   var tdimg;
  for (var i = 0; i < trackers.length; i++) {
    tdimg = document.createElement("span");
    tdimg.innerHTML = trackers[i].getHTML(title, id);
    iconbar.appendChild(tdimg);
	}

	
	if (GM_openInTab) {
		var tdopenall = document.createElement("a");
		var aopenall = document.createElement("a");
		aopenall.innerHTML = "Open All";
		aopenall.href = "javascript:;";
		aopenall.setAttribute("class", "openall");
		aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
		tdopenall.appendChild(aopenall);
		
		iconbar.appendChild(tdopenall);
	}
}
/*
function addAkaIcons(id, trackers) {
	var xpath_exp = "//i[@class='transl']";
	var akas = xpath(xpath_exp, document);
	
	if (!akas || akas.snapshotLength == 0) {
		GM_log("Error! Couldn't find akas. Quitting!");
		return;
	}
	
	var aka;
	for (var i = 0; aka = akas.snapshotItem(i); i++) {
		unsafeWindow.aka = aka.textContent;
		
		var title = aka.textContent.match(/(.*?)\s+\(.*?\)\s+\[.*?\]/)[1];
		GM_log(title);
		
		for (var ii = 0; ii < trackers.length; ii++) {
			if (!trackers[ii].usesIMDBID) {
				link_span = document.createElement("span");

				link_span.innerHTML = trackers[ii].getHTML(title, id);
				aka.appendChild(link_span);
				
				delim_text = document.createTextNode(" ");
				aka.appendChild(delim_text);
			}
		}
		
		if (GM_openInTab) { //If this API exists.
			var aopenall = document.createElement("a");
			aopenall.innerHTML = "OPEN ALL";
			aopenall.href = "javascript:;";
			aopenall.setAttribute("class", "openall");
			
			function creator (a, b) {
				return function () { openAllInTabs(a, b, false); }
			}
			
			aopenall.addEventListener("click", creator(title, id), false);

			aka.appendChild(aopenall);
		}
	}
}
*/

function addStyles() {
	var open_all_class = "a.openall {\n" +
	"	font-weight: bold;\n" + 
	"	font-family: Calibri, Verdana, Arial, Helvetica, sans-serif;\n" +
	"	font-size: 10px\n" +
	"}";
	
	GM_addStyle(open_all_class);
}


addStyles();
var title = getTitle();
var id = getId();
addIconBarIcons(title, id, trackers);
//addAkaIcons(id, trackers);


(function()
{
    try
    {
        var tr = document.evaluate("//TR[TD/@class='lhscol'][1]/TD[last()]//TR[1]",
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null).snapshotItem(0);
        if (tr)
        {
            tr.deleteCell(tr.cells.length - 1);
        }
    }
    catch (e)
    {
        alert("UserScript exception: " + e);
    }
}
)();