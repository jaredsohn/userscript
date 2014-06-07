// ==UserScript==
// @name          'IMDb->Torrents'
// @namespace     http://determinist.org/greasemonkey/
// @description   SEARCH FROM imdb to Torrents.
// @version        0.1

// @include       http://*.imdb.*/title/*/
// @include       http://*.imdb.*/title/*/#*
// @include       http://*.imdb.*/title/*/combined*
// @include       http://*.imdb.*/title/*/maindetails*

// @include       http://imdb.*/title/*/
// @include       http://imdb.*/title/*/#*
// @include       http://imdb.*/title/*/combined*
// @include       http://imdb.*/title/*/maindetails*
// ==/UserScript==

//
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

var trackers = new Array();



var allmovie_title = new String(getTitle());
allmovie_title = allmovie_title.replace(/ /g,"|");

//CosaNostra via IMDb-ID
trackers.push(new SearchEngine("Search CosaNostra", "https://www.cosanostra.mn/browse.php?rar=All+types&imdbid=%imdb-id", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC30lEQVQ4jX2SW0gUYRTHz/d9szM7O7Oa62XXy6a73kDQh16ssCIi0ajIoLDIILpAWo89BWsQBFsWpe1Ld4qgXiqL6ik1kihCtDYq75q31hu1zuzozDfz9WToZh34wzmc//8HBw4wxiBedd7M6tP+nF2RkRHQNQ3CrS1/eRaFGGMAALDfl+3kDcNzZ3S8N1iQG9It5hI2bNo/+boty4FgTzTV1Xj5XQeFuMKLjUxpmZfnn9b5fa4J3WiO6Hp/bnExyxBsRRLGtbNjETk+vAyAMfmsmCaxTMNDCe4ymUWHw2E0YdDOacN41m3j1f8CdgcCo92x2ENgKNGX7Z/JstuVifb2hCHLUrvV2KcroZCxIiDgz7kbyPeXlB8+wigvXJg2dNlCCEbnF2IDMRUnEYJkjousraxcKQ9YIDjJtMzdb9vawJuYsCBjnDk8+QMPCeKN9buqfuZVbFOHEX6zYhoA0Mlcn+f91PQhahdDHZFIdHFRXVggzjEw0wjiNEVxPhgZi6wIYIzBNrfb7cKoWs/Lb6rZu5e9aDhfRCm95eC4z27etsFg7F593+DZpcGX16+hjuZmghhjEO7qghP79vG6phD8S9mYznO1Xru90iMIUYkQeWReawoOfj+1FFC3OutonkPc/ueRAACOZmUEBIx2dEaVmyLHdZYkOKcimlZhQ1iSSksvhh4/sQAAzhTmZyYhaDcZ3OLiTnJjQGtkQl7GnNLtSwNDC1uSXT0CQlWzra07azLSJ0sSE2YkhzgOhlGu5fj6lwEooEcegT/GY7y5ZfbXq7Ls7PcujN1zlPYWOsRgsSylq4Zxv/5r93EAmAMAWAZIS0lutxSlRSZknYvgYIqhH0wS+HOyJKYm23j7vGV9mKK0YdkfLB2CXZ8WoiYNWcA4t8AX9aiq3QQIS4SzaZb1cdI0D1wd+t7/TwAAAMv0Pv+maiecHOlLW5XYO47wgS+xWBUnylsbB4d74/2/ASO2VYy0ytDRAAAAAElFTkSuQmCC"));


//BitmeTV
trackers.push(new SearchEngine("Search BitmeTV", "http://www.bitmetv.org/browse.php?search=%title&cat=0", false , "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACW1BMVEUAAADRGAzAFgsRAgFICASJEAhoDAYrBQKmEwrc3uDS1dj09fT5+fns7e1iZmtLQD95fILh5OWytrmlqq+mqq2OkJX09fXv8vHv8vMfHx/S09cfERDCxMff4ePe4OGiSELd3eCNSETx8vODiI6mS0WCi42go6jl6erX29yGi5FCODfs7e7R09Xg4uDw8fPIzMzKzs7i5eZQW2Xi5efm5+jy9PLj5ef4+fmxsrR9foNaUE/dgXvLzdGbnaDGyc5xeX7o7OzIvr7htbK3u7+ZnKHb3N7AxcbVubbVvr08MDDj5eitsrOorbHrwb2Ii4+5u7iXmqDFyMmEf4Dn6ei4SkTevLmznJphaG7Iy85qNjO0uL20aWT5+vgPDw/Jy8329/jj4+SXm59aPjx0eH+FcG7s7e+xMCjd3t6wMCfN0dPk5+n3+Pnw8fJpbXF4gITt7+6tsbWprLKxuLx3en2JREB4fYCzuL2Bio6Vj43T1dhJPj339/fu8O+0t7zVlI+ipKebnqKbnaKhpKi8v8TO0tXi5ObOT0bn6ebf4uTetrPHyszg4uOUgX/ISUH6+vrt7+9pYF+2urxgQ0Gpt7ni4+Slp6u2vL7k5+i4vcGYdHH3+Pf19vWhpKrh5eS/wsXXTESipqnk5efP0dKlp6zBx8fz9fS1ubv4+Pjr7e7V19rFyc3Fx8q3uLxna3C0u76QkJX5+vp9fn3Z3N2oq628wcX3+Pj09vSEOTTR09fSu7nl5+dpamvFvLt9ipDZ2t6LkJb9/f3Cxcf09vXl5ufN0NPLu7ra3NzY3N1vQD2xAd9AAAABFUlEQVQYlR3Bg3IEURAAwFm8xSm2bdu2bdu2bdu2bfOzcpVueDKPadd4kSiPF/fO81g9qQEXQYae9vTxbD9rnMUeSlZBkahUaVP1voXs9bvrvdeYE7TGcji6BgW8U5urhh1pM0V4gH9yAGchAEnnEK6vQBB+IqMEYV9LEPU5cJCfTtOPw240PT5I05klsLz3S5JfvFeSjJsjyegIcPavpCjfhcQbilKjqDs+dPyoIOTDn09ASBOhLSMo64pkmCgZq2aGyWZyuZbgWTeE431LPUG4UPfIJoS+rWCYu04jFxNyMAmD4A1H690Z5Un1lMKP73UxJThqS7uVN1Rd6/3cDjBNbRFAsd3UYif7fBl4kTxgW6E18QdFqE9/bBKsYQAAAABJRU5ErkJggg%3D%3D"));



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
		var html = "<a href=\"" + this.getSearchUrl(title, id) + "\"><img border=\"1\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
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
    
 var iconbar = xpath("//div[@id='tn15title']", document);
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
		var tdopenall = document.createElement("td");
		var aopenall = document.createElement("a");
		aopenall.innerHTML = "Open All";
		aopenall.href = "javascript:;";
		aopenall.setAttribute("class", "openall");
		aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
		tdopenall.appendChild(aopenall);
		
		iconbar.appendChild(tdopenall);
	}
}


function addStyles() {
	var open_all_class = "a.openall {\n" +
	"	font-weight: bold;\n" + 
	"	font-family: Verdana, Arial, Helvetica, sans-serif;\n" +
	"	font-size: 10px\n" +
	"}";
	
	GM_addStyle(open_all_class);
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