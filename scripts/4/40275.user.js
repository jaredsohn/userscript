// ==UserScript==
// @name          IMDb Binsearch/NZBMatrix
// @namespace     Hank Hill (Code derived from imdb directsearch plus)
// @description   SEARCHAN GAEMS

// @include       http://*.imdb.com/title/*/
// @include       http://*.imdb.com/title/*/#*
// @include       http://*.imdb.com/title/*/combined*
// @include       http://*.imdb.com/title/*/maindetails*

// @include       http://imdb.com/title/*/
// @include       http://imdb.com/title/*/#*
// @include       http://imdb.com/title/*/combined*
// @include       http://imdb.com/title/*/maindetails*
// ==/UserScript==



// --------------- SEARCH ENGINES --------------- 
//  You can remove or comment out below lines if you disable a search engine from the script.

var trackers = new Array();

//Binsearch
trackers.push(new SearchEngine("Binsearch", "http://binsearch.info/?q=%title&max=250&adv_age=240&server=", false, "data:image/x-icon;base64,R0lGODlhIAAgAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///ywAAAAAIAAgAAAIawAfCBxIsKDBgwgTKlzIsKHDhxAjSpxIseJAAAAsIsSo8SDHjgU/gryYcSRJkycfYFypcaVLlhVdEoQ5UeRMmxBxppSoU2DPhj9/MgxakmfRkEdzJvW59CFNpk0dvnxpkSNVlFizat3K1WJAADs="));

//NZBMatrix
trackers.push(new SearchEngine("NZBMatrix", "http://nzbmatrix.com/nzb-search.php?search=%title&cat=movies-all", false, "data:image/x-icon;base64,R0lGODlhIAAgAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///yH5BAEAABAALAAAAAAgACAAAAiiAP8JHEiwoMGDCBMqXMiwocOHECNKnEixokWHhqrEqLJCY5WL/wypqDKy5MeKhgCJ5MgyBiyK1f4Y2rLFZEmKKmUCatlSoswthn6SHDryT8SgKZFWGdpRBSCIMwEBnZpx6ZalhiBWS6pS5ZadV7mchPgT6Z+raMdG1BlUbNgqqihS+wl2aZUtFpW+xXtRJNpqIAWmjBu4sOHDiBMrXsy4scKAADs="));



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

//		var html = "<a href=\"" + this.getSearchUrl(title, id) + "\"><img class=\"img\" style=\"-moz-opacity: 0.6;\" border=\"0\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
		var html = "<a href=\"" + this.getSearchUrl(title, id) + "\" target='_blank'><img class=\"img\" style=\"-moz-opacity: 0.6;\" border=\"0\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
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


//a new "div" element for keep original IMDb movie title style
/**** BEGIN ****/
var main = document.getElementById('tn15content');
var div_iconbar = document.createElement("div"); 
div_iconbar.id = "div_iconbar";
main.parentNode.insertBefore(div_iconbar, main); 
/**** END ****/

function addIconBarIcons(title, id, trackers) {   
 var iconbar = xpath("//div[@id='div_iconbar']", document);
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

	
//	if (GM_openInTab) {
//		var aopenall = document.createElement("a");
//		aopenall.innerHTML = "Open All";
//		aopenall.href = "javascript:;";
//		aopenall.setAttribute("class", "openall");
//		aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
//		iconbar.appendChild(aopenall);
//	}
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

