// ==UserScript==
// @name           KG Title Search
// @namespace      http://karagarga.net/
// @description    make an easy search from imdb movie title and director name in karagarga library
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*
// @include        http://imdb.com/name/*/
// @include        http://*.imdb.com/name/*/
// @include        http://*.imdb.com/title/*/?ref_=*
// @grant 		GM_addStyle 
// @grant 		GM_openInTab 
// ==/UserScript==

// Version 0.2
//This script is based on "IMDb->DirectSearch Fixed" from mohanr
// Modification by KaraGarga
// 06/01/2014
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
//  You can remove or comment out below lines if you disable a search engine from the script.

var trackers = new Array();

//-----------------------------------
//--------SUBTITLES----------- 
//-----------------------------------

//Label
trackers.push(new SearchEngine("Subtitle Links", "http://userscripts.org/users/42134", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaklEQVQ4T6XTwQrAIAwDUP1qPW4399WzvYwhpklR8KL0IU2t5XBVUN/s/FFsBLxWfNu+GBIBXksRBlBEAUJEBSCSAbZIFvBo+z+ZDLBNRAVgnAoQzgIDjgaJFnsz0QvG2m30JxDA/tB3PwESJxoRYp7B3QAAAABJRU5ErkJggg=="));

//KaraGarga - MovieTitle
trackers.push(new SearchEngine("KG Movie Title Search", "http://karagarga.net/browse.php?incldead=&d=&sort=&search_type=imdb&search=%imdb-id", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABu0lEQVR4nM2RUUhTURjHf/dyvc7d02TcHCrc5lx2K6MIgpBeBOnBKKFnQ5+DIIhZ4QiJnvYYSfRYQx96C4oh4kOvgS8WQzchTMirtrs2uG0N205PrdoWpE9+Tx/nfOd3/r9zcJNIN4nkgKX+ag4K0V5tXmU5W8GobbIyuyvP3fqq7CvBNStFGyUW37cTX7jEXDyyryRqaLKmREI1hBCUSiUeL5rMzwzK3Rfqf4E0gL6je1i9PXz85BAO9/E6o7FWiJJKZOSF7nVCk7V/atU35mcG5fRzD9u20XWdarWKZVmEjzicD2W5ci/TElL/hcv9q1TKHp7nIYTAsix0XcephHnytp/YDVuuzAabtP6iphK2vPn0O9FolGKxiGEY+Hw+AoEAAF3+ImN2mtH4ltISsJ30y7svu0lvB8nlcuTzeYwOnfYOgWmaCCHQNI2pkbU6pMnr3bOz8tGbY6jlDYbP/E685f4g67ShB0/S63e4GCkw/jCtaH8efnB7TC6tS4ZsON3l4/r95aYL5uLf5IfPAXYKDQqphC2dvQE2vqi45U6OnzgFwJ3YdMvXd5NIcwJFaVxsHDQnmjUPV/0EfDGYIOyRtCUAAAAASUVORK5CYII%3D"));

//KaraGarga - Director
//trackers.push(new SearchEngine("KG DirectorSearch", "http://karagarga.net/browse.php?incldead=&d=&sort=&search=%director&search_type=director", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABu0lEQVR4nM2RUUhTURjHf/dyvc7d02TcHCrc5lx2K6MIgpBeBOnBKKFnQ5+DIIhZ4QiJnvYYSfRYQx96C4oh4kOvgS8WQzchTMirtrs2uG0N205PrdoWpE9+Tx/nfOd3/r9zcJNIN4nkgKX+ag4K0V5tXmU5W8GobbIyuyvP3fqq7CvBNStFGyUW37cTX7jEXDyyryRqaLKmREI1hBCUSiUeL5rMzwzK3Rfqf4E0gL6je1i9PXz85BAO9/E6o7FWiJJKZOSF7nVCk7V/atU35mcG5fRzD9u20XWdarWKZVmEjzicD2W5ci/TElL/hcv9q1TKHp7nIYTAsix0XcephHnytp/YDVuuzAabtP6iphK2vPn0O9FolGKxiGEY+Hw+AoEAAF3+ImN2mtH4ltISsJ30y7svu0lvB8nlcuTzeYwOnfYOgWmaCCHQNI2pkbU6pMnr3bOz8tGbY6jlDYbP/E685f4g67ShB0/S63e4GCkw/jCtaH8efnB7TC6tS4ZsON3l4/r95aYL5uLf5IfPAXYKDQqphC2dvQE2vqi45U6OnzgFwJ3YdMvXd5NIcwJFaVxsHDQnmjUPV/0EfDGYIOyRtCUAAAAASUVORK5CYII%3D"));

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
/*function openAllInTabs(title, id, inclIMDBID) {
	for (var i = 0; i < trackers.length; i++) {
		if (trackers[i].usesIMDBID && !inclIMDBID)
			continue;
		else
			GM_openInTab(trackers[i].getSearchUrl(title, id));
	}
}
*/
function getTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	title = title.replace (/\s/g, "+"); //replace spaces with +'s
	return title;
}


function getDirector() {
	var director = document.description;
	director = str.match(/name\/nm(.*?)\//)[1];
	return director;
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
		aopenall.innerHTML = "";
		aopenall.href = "javascript:;";
		aopenall.setAttribute("class", "openall");
		aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
		tdopenall.appendChild(aopenall);
		iconbar.appendChild(tdopenall);
	}
}

function addStyles() {
}

addStyles();
var title = getTitle();
var id = getId();
addIconBarIcons(title, id, trackers);



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