// ==UserScript==
// @name           KG-IMDb
// @namespace      http://userscripts.org/users/42134
// @description    IMDb enhancer search bar
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/?ref_=*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*
// @grant 		GM_addStyle 
// @grant 		GM_openInTab 
// ==/UserScript==

//This script is based on "IMDb->DirectSearch Fixed" from mohanr and "itas" from tukankaan
// Modification by KaraGarga
// 21/01/2014
// version 0.7

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

GM_addStyle(".view-count {color: #ffcc00 !important;} div.description {color: brown !important;} .video-time {color: lime !important;}")

//-----------------------------------
//--------other sites-------------
//-----------------------------------

//Label
trackers.push(new SearchEngine("ED2K Links", "http://userscripts.org/users/42134", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaklEQVQ4T6XTwQrAIAwDUP1qPW4399WzvYwhpklR8KL0IU2t5XBVUN/s/FFsBLxWfNu+GBIBXksRBlBEAUJEBSCSAbZIFvBo+z+ZDLBNRAVgnAoQzgIDjgaJFnsz0QvG2m30JxDA/tB3PwESJxoRYp7B3QAAAABJRU5ErkJggg=="));

//ED2k: DivXForever
//trackers.push(new SearchEngine("ED2k: DivXForever", "http://www.divxforever.in/index.php?act=ed2k&CODE=66&keyword=%title", false, "data:image/gif;base64,R0lGODlhEAAQAMQfAJ1qUPDw78uPac20r8/NzEgxKYBzc6iFcPlmAOtVBZCPjtNLDTEeFrtuOY1VNrGvrVdQUqheLvh1HJQ4F/Z8L2NgYtJ8Tb1EFHZDKdNvOrWYgtxBBMtbJfyQTP10D////yH5BAEAAB8ALAAAAAAQABAAQAW04CcWjKEdhgFBlfgZCYJI3VAUUcPF0shgFkuENJFJLJ1PYTJZGDMRDSFAVUA+leWEs3teRYYLJxJxHDSYpQxBecUQHktjLlAYHg+M8oeZXBKACAkXDhAMLR8MSxwSEhQUQ4cuJAUYBwAOFzIeDQYHHwo3Dg0REwyKmnBJBgseFBkWAQMOExtvbTBGFgIAEXUVABwLHxAbtjMZpAJTVAZZik2bRwK7AxUrBQ4AmBjbGBXXBVchADs%3D"));

//ED2K: VeryCD
trackers.push(new SearchEngine("VeryCD", "http://find.verycd.com/folders?tags=&rec=1&sort=created_on&rev=1&kw=%title", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1ElEQVR4nJ2TzW9UZRjFf+9779x7p0yYQtthgOA0LUpsK62twdIYiE1YqWCltImRP4GNiQZ1Y8JGE8WIxriBhlQ3RoMKppq0jQmmXUANFqYzUPthSWko04EwH/f7vi4ITUgMUc/2ec4vZ3EO0dyv+8L53wT/Q9Ffkz06UdiJCsrA7w8PV/b2JIK3jgw+YVTfBFjyak6aX1z45pnRsdLDnzA30orvdIno5qW+cP7iZ3r6yS8r15eGFj//saf6x/Q7hlttj1u6BHDcIHLMmumaltYPdhwbHEt2ZI6EN3Nvyx3PHdcV6ge824PhbP6Ec638hnNpIrNZalZteiNS0x9EDQJ5r1jqKE5OnHVf2DITmhufjaT1vYzavhMAYf7bp6OZD8cr86tpb0IgrkbETAtpWIAg8h28cpWwCeIHJBuealiTre/2artem9YBnDuZvP1nYi75/GraqLfwAWYNDGsDCIHngtGsMAc09F0296cSc/HabVkACXD36+HOhU+vdjm3JXpnQOyQIrZTg0CCL9G2ahj9Aq3bx7srWTiV3V0YHupaB7gLM43OctVaO2cjDBB7bMRLNmFtlSBWQR60EfschKlYO29jL1Ysd+lGI4AOIKUMpSkpXrDZdNjE6oboQBlRVuAIeLmCNATulYDCORtpCjQpgvUEyd7evJ6I23bJp3DGhkA+SNJfQr5eQsQVUkkKww520UNPWHZy//78OiCWarie3N0y4lOlMOpSGvXRhAQlQIJEUp4MWf3JxadKsq3ll1gqlXukloUT7++Z2r79zjio6c5Nys02KieXUXY2o/zZJpV9sU6Ngbq8JbV2b+h09z92u3jqk0OX6zevjCPV4nsp5eWblTfTrJY/TqtxNDVVX7dSPPnRq48dyPJAX3u+vev0tZattyo/Nyn3YpPK7d22kmvrOHNr8HDHY82PgF7pryud7f3KGek7vzxwtOFfG/+r/gaJ6DlfZUWfzQAAAABJRU5ErkJggg%3D%3D"));

//ED2K: FindHash
//trackers.push(new SearchEngine("FindHash", "http://www.findhash.com/find.php?title=%title", false, "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAACAAACAgAAAAACAAIAAgAAAgIAAwMDAAICAgAD/AAAAAP8AAP//AAAAAP8A/wD/AAD//wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGCf/4wgk8yAgBPMuIATzKLAE8yiwBPMgIAQwLiAEMCiwBPMjCCTzIugk8yAABAMgAAQDIAAH/+AAAAADgA"));

//ED2K: Osloskop
trackers.push(new SearchEngine("Osloskop", "http://www.osloskop.net/search.php?q=%title", false, "data:image/png;base64,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%3D"));

//ED2K: Rollyo
//trackers.push(new SearchEngine("Rollyo", "http://rollyo.com/search.html?q=%title&sid=145155", false, "data:image/gif;base64,R0lGODdhEAAQAN0AAPr//8ABAdgAALEAANEAALgAAMgAAP319fjKyuEzM9oSEup1deAjI+EqKvvm5qsAANkKCuhYWOFAQOZNTdkfH8gSErcSEqEAAN8cHN4SEtESEut7e/W8vOhmZu+Li+VRUex7e9qYmPOSkt+OjsESEvjPz/bAwJ4AAP3p6fKhoeyamvW5ueSqquQ5OeM5Obc4N8o7O+RAQMtbW9Q7O7cdHdIYGO2EhO1kZO1bW84zM+hfXwAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAGl0CAcEgsGo9GBGjSSjRqJIulosiADpGI5DA8iCSBgkEAWSwAJk8nEdkgUDdDQJBpAEofwZCMcBAKBAoYHgAcNmsfCwgAOAEDBgoMAhMrRAccMY4DARqSAmQYDRQEBgUDDw+cngSkAWEDsA8XBRUun6xyrqYDFycDISkCrKRyBbsvRBujBrnGNCxGDio6MzkwMiMOSNvc3EEAOw%3D%3D"));

//Divxplanet Forumda Ed2k arama
//trackers.push(new SearchEngine("DivXPlanet", "http://www.google.com/search?hl=en&q=forum+divxplanet+ed2k+%22%title%22&btnG=Google+Search", false, "http://www.divxplanet.com/favicon.ico"));

//ED2K: Chispr
//trackers.push(new SearchEngine("Chispr", "http://chispr.com/searchengines/ed2k_links/?search=%title", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACyElEQVQ4jYVTPWhkVRT+zrk/7/9Nxnlkkpm4FltkIWCxaLWuZrERGxFBsbFXBFlstrMUQQvRSmysLLVSG0HQYlVwEcEiSCTRAV+chJk3mYwz9717LPZlf2TBDy6Xe+79zj3f+VG4DdUuwf2g/zlDtbsA8A94aIIguG6tfVVExiJy8CAn0Fq/YK39gIg2WlMEAGEYvlUUhfR6PVlbWzshokfae77DVUo9bIz5SGv9kFKqXiwW18+jyfP8UaVUU9d1SUSDLMsuVlV1QEQkclstW2vHW1tbPyZJInmenwZBcC2O45ettdtKqam1VoVhOOj3+98DuNl+fEcuAUBRFDbP88+qqtpl5pCImIjmzBx2u90PmfmrsixvHR0dlS1H7nNgjHkzy7J3kyQ56/V6XxhjJtPp9LnT09NitVp9Ox6PnwGwaLXfm2woZr6QpuknURQlcRy/WJbl3ng83kvT9H0RealpmksA5s657wDY/1aPmflK0zTrIvLT4eHh53EcP14Uxe7+/v7PzrlbdV2DiJ5sCQ5AA6BuZZAGEHrvsVgsxs45VFV1QkS7WutfZ7PZUClVG2MSZgYzv8LMz3vv/2ya5j0R2ddZlu075/xqtbrovVdpmh7HcXzJGHOzqqr6+Ph4m4guh2H4A4DLANh7T8z8tHPuKaW1Puh0Olcnk8ljWuut5XL5qbX26+l0uj6ZTK4aY3g4HH45m82uiMg/bTLnAC547/8CAGxsbGwPBoPfmPm8pT0A6XQ6srOz80ae55Qkye/GmHkYhidBEPyttZYoim7QeWn6/f56t9t9bblcXqvrOgqCYK9pmo9Ho9E3zjkMh8O3y7K84ZyrAeiiKP7w3j9BAEBELCKitZYsy8DMdHZ2JovFAkSkRKRJ09Rsbm6+Pp/Pnw2CoFytVu+MRqNf7o4fEQHQ90ybIiKFuyClFLIsQxRF501I/wIYBh9Alv5FsAAAAABJRU5ErkJggg%3D%3D"));


//MoviePostersDB
trackers.push(new SearchEngine("MoviePostersDB", "http://www.movieposterdb.com/movie/%imdb-id/", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAABjElEQVQ4y6WTT0sbURTFf/e+N39iiIIUu6i1Lgx1VQpFoaBQcOHOhYi74kdw7wfowu/goqtuShf9Al0VDKWItF0phKZqLUJiyiQmxsm4mMxz0u7M3Z3zzjvcd+598mj1dcIIZQHKazv3unz08U1qYHTEDozKaAZ2YPB+a46Cp+xVLvjwrTEkXCmPs738kOs4YePtseMVwDOCZ4SCp1TrXdafTRJYcbxnhM3nk1TrXQqeOs4Z+EbwB8ThWRur8GK66Pj5qZCJ0HB41uZfvQIEVglsmmQ/gS+1Fq/mxh2/Up7gczVCJL2U16cdWMG36aFRqPxqsfi4SClUxnzl5ZMi+7XITSuvtwAl37hQAqP8+duj2YlZmi1x1evT7MRctmOCgUNebzPHrIym+OC0xcJMkeubhK8nbXwrQx0MTSH/JqNCYJXv5x3KD0KeToX8OL8isOr2Ja+3WapZgEKacNSN+dno0ukl3PQTfCMIQj+50zuDbKa7n36Tx+8O6kO4Uouo1CKH/9vE+5SM+p1vAYV8ZwooQAvxAAAAAElFTkSuQmCC"));

//Rotten Tomatoes via IMDb-ID
trackers.push(new SearchEngine("Rotten Tomatoes via IMDb-ID", "http://www.rottentomatoes.com/alias?type=imdbid&s=%imdb-id", true, "data:image/x-icon;base64,AAABAAEAEBAAAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ51AAMjQ1AAAAAAAAAAAABC+AAAs8BIAzO8SAD+61QAYXEAAsgYIABC+AAABALIAsgYIAAEAAACyBggAAAAAERAAAAAAAAEREQAAAAAAARERAAEQERAAERAAEREREQAREBEREAEREBEREREAAAEREREQAAAAABEREQAAAAAREBEREQAAAREAEREREAABEQARABEREAERAREAEREQAAAREQABEQAAABERAAAAAAAAEREAAAAAAAAREAAAAAD8f3cA+D93hfg5AAAccADwDEF3rIQDAADgH3eA8D8AAMQPAJyMBwAAjMF3aIjBAALw43dQ8P93//D//2nx/3ei"));

//Vudu
//trackers.push(new SearchEngine ("Vudu", "http://www.vudu.com/movies/#search/", false, "http://www.vudu.com/facicon.ico"));


//Metacritic
//trackers.push(new SearchEngine("Metacritic", "http://www.metacritic.com/search/all/%title/results", false, "http://www.metacritic.com/favicon.ico"));

var allmovie_title = new String(getTitle());
allmovie_title = allmovie_title.replace(/ /g,"+");
//AllMovie
trackers.push(new SearchEngine("AllMovie", "http://www.allmovie.com/search/all/" + allmovie_title +"" , false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABpElEQVQ4jYXTQUhUURTG8d+MlRQWLSaYJMKhxbxVBEFgEEI0ILQIlwWBEQRFbYSCIIiJ2ugqBMPFbAZauEmEwMgKF5HYynpQuEloke1CncZS8rUY3zA+n/itDvf7n8O5l+9mQoGEiriCEvJYw09MobJZN5VpGbAPg7iNNjjUd8FGra429SFmaniEofig7ZZc3DyJy8hC52hZfvCuw1cv2Vj5rT4zF3MldGFCDGME51tXO3ixp1l39J5LXrMfA/GA07ieJJbGJpv18vibpA1l5DOhYAQ304j9Z07aWFrxd34hzYb7WfQe6D7lxOyYwnRVe7HQdFc/ft7SnMKVhIKoPvspirX8cjoKBVEoiH5VJ6La25no65Gz0Q7ct2xyp2htvVnvyefsLRxL3X2T+5cJBYvtxUL+6PAD0eofP+48tv59MbWpvViQ4N5nQsFzjeRtU0qQknqS1YjnNnWOlh1/MazrdUVuoD8NWUMli3cYT7q7BIlGnBfiR7yGuVZ3lyC9wkO2fqYOVNEXH+wQpKe4t3mFLQNideMGehCnal7jOz/Dl1b4P9jcsBveESy7AAAAAElFTkSuQmCC"));

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
		var html = "<a target=\"blank\" href=\"" + this.getSearchUrl(title, id) + "\"><img id=\"i1\" class=\"img\" style=\"opacity: 0.4;\" border=\"0\" width=\"16\" height=\"16\" onMouseover=\"this.style.opacity=1\" onMouseout=\"this.style.opacity=0.3\"src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
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
		aopenall.innerHTML = "OA";
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
	"	opacity: 0.5\n" +
    "   font-size: 10px\n" +
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