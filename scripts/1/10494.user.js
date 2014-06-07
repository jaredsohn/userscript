// ==UserScript==
// @name	Last.fm - Group Forum Search
// @namespace	http://no.name.space/	
// @description	Adds forum search to group forums.
// @include	http://www.last.fm/group/*/forum*
// ==/UserScript==

// History
// 2007-06-24 : Created - gadgetchannel

//Regular Expression to strip XML declaration prior to new XML()
var xmlDeclaration = /^<\?xml version[^>]+?>/;

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

String.prototype.endsWith = function(suffix) {
    var startPos = this.length - suffix.length;
    if (startPos < 0) {
        return false;
    }
    return (this.lastIndexOf(suffix, startPos) == startPos);
};


function displayTimeChart(newchart)
{
	var chartHTML = '';
	charts = xpath("//table[contains(@class, 'barChart')]")
	if (charts.snapshotLength > 1)
	{
		chart = charts.snapshotItem(1);
		var header=document.createElement("div");
		header.innerHTML='<table><tr><td><a href="javascript:ChangeChart(\'artist\',\'plays\')">Play-Based Chart</a></td><td>|</td><td><b>Time-Based Chart</b></td></tr></table>'; 
		chart.parentNode.insertBefore(header,chart);
		for(var i=0; i<newchart.length(); i++) {
			var minutes = newchart[i].minutes;
			var hours = Math.floor(minutes / 60);
			var artistname;
			if (/http:\/\/.*?\/music\/([^?\/]+)/.test(newchart[i].url)) {
				artistname = decodeURIComponent(RegExp.$1);
				artistname = artistname.replace(/\+/g,' ');
				artistname = decodeURIComponent(artistname);
    			}
			minutes = minutes - (hours * 60);
		        chartHTML = chartHTML + '<tr><td class="position">' + newchart[i].normalisedrank + '</td>';
			chartHTML = chartHTML + '<td class="playButtons">' + getPlayButton(chart, artistname) + '</td>';
			chartHTML = chartHTML + '<td class="subject" title="' + artistname + ', played for ' + newchart[i].minutes + ' minutes">';
			chartHTML = chartHTML + '<span><a href="' + newchart[i].url + '">' + artistname + '</a></span></td>';
			chartHTML = chartHTML + '<td class="quantifier">';
			var perc = ((newchart[i].minutes / newchart[0].minutes) * 100)
			if (perc < 11)
			{
				perc = 11;
			}
			chartHTML = chartHTML + '<div style="width:' + perc + '%;">';
			chartHTML = chartHTML + '<span>' + newchart[i].minutes + '</span>';
			chartHTML = chartHTML + '</div>';
			chartHTML = chartHTML + '</td>';
			chartHTML = chartHTML + '</tr>';
    		}	
		chart.innerHTML = chartHTML;
	}
}
(function () {
	var headers = xpath("//h1[contains(@class, 'h1group')]");
	if (headers.snapshotLength > 0)
	{
		groupname = headers.snapshotItem(0).innerHTML;
	}
	else
	{
		groupname = '';	
	}
	var threads = xpath("//td[contains(@class, 'threadTitle')]");
	if (threads.snapshotLength > 0)
	{
		if (threads.snapshotItem(0).childNodes[1].tagName == 'A')
		{
			forumlink = threads.snapshotItem(0).childNodes[1].href;
		}
		else
		{
			forumlink = threads.snapshotItem(0).childNodes[3].href;
		}
	}
	else
	{
		forumlink = location.href;
	}
		var forumid;
		if (/http:\/\/.*?\/group\/.*?\/forum\/([^?\/]+)/.test(forumlink)) {
			forumid = RegExp.$1;
		}
		if(!forumid) { return; }
		var sidebars = xpath("//div[contains(@class, 'sidebar')]");
		sidebar = sidebars.snapshotItem(0);
		
		var searchbox=document.createElement("div");
		searchbox.id = "forumSearch";
		searchbox.className = "lastPanel";
		var SearchHTML = '<div class="h">';
		SearchHTML = SearchHTML + '<h2>Search</h2>';
	  	SearchHTML = SearchHTML + '<a href="javascript:;" class="tog collapseTog" title="Collapse Panel" onclick="return collapseBox(\'forumSearch\', this);" onfocus="blur();"></a>';
		SearchHTML = SearchHTML + '</div>';
		SearchHTML = SearchHTML + '<div class="c">';
		SearchHTML = SearchHTML + '<form  method="get" action="/forum/search">';
		SearchHTML = SearchHTML + '<p><label for="searchterm">Search the forums:</label></p>';
		SearchHTML = SearchHTML + '<input type="text" name="q" id="searchterm" style="width: 150px;" value=""/>';
		SearchHTML = SearchHTML + '<input type="checkbox" name="forums[]" value="' + forumid + '" id="justthisone" checked="checked" />';
		SearchHTML = SearchHTML + '<label for="justthisone">just in <strong>Group \'' + groupname + '\' Forum</strong>';
		SearchHTML = SearchHTML + '</label>';
		SearchHTML = SearchHTML + '<input type="submit" value="Search" />';
		SearchHTML = SearchHTML + '<p id="radiotoggle">';
		SearchHTML = SearchHTML + '<a href="#"  class="viewWidget" onclick="$(\'moreOptionsView\').src=$(\'moreoptions\').style.display==\'\'?\'http://panther1.last.fm/depth/sidebars/vw_view.gif\':\'http://panther1.last.fm/depth/sidebars/vw_view_on.gif\';$(\'moreoptions\').style.display=$(\'moreoptions\').style.display==\'\'?\'none\':\'\';return false;"><img src="http://panther1.last.fm/depth/sidebars/vw_view.gif" id="moreOptionsView" border="0" width="11" height="11" style="position:relative;bottom:-1px;" alt="View More"/></a>';
		SearchHTML = SearchHTML + '<a href="javascript:;" onclick="$(\'moreOptionsView\').src=$(\'moreoptions\').style.display==\'\'?\'http://panther1.last.fm/depth/sidebars/vw_view.gif\':\'http://panther1.last.fm/depth/sidebars/vw_view_on.gif\';$(\'moreoptions\').style.display=$(\'moreoptions\').style.display==\'\'?\'none\':\'\';return false;">More options</a></p>';
		SearchHTML = SearchHTML + '<fieldset id="moreoptions" style="display:none;">'; 
		SearchHTML = SearchHTML + '<dl class="sidebarInfoList">';
		SearchHTML = SearchHTML + '<dt>Search result ordering</dt>';
		SearchHTML = SearchHTML + '<dd>';
		SearchHTML = SearchHTML + '<input checked="checked" type="radio" name="sortorder" value="" id="best_matching"/><label for="best_matching">Best matching first, ignore date</label>';
		SearchHTML = SearchHTML + '</dd>';
		SearchHTML = SearchHTML + '<dd>';
		SearchHTML = SearchHTML + '<input  type="radio" name="sortorder" value="date desc" id="date_desc"/><label for="date_desc">Newest posts first</label>';
		SearchHTML = SearchHTML + '</dd>';
		SearchHTML = SearchHTML + '<dd>';
		SearchHTML = SearchHTML + '<input  type="radio" name="sortorder" value="date asc" id="date_asc"/><label for="date_asc">Oldest posts first</label>';
		SearchHTML = SearchHTML + '</dd>';
		SearchHTML = SearchHTML + '<dt>Search tips</dt>';
		SearchHTML = SearchHTML + '<dd>You can use quotes (") around search phrases to improve search accuracy</dd>';
		SearchHTML = SearchHTML + '<dd>Check the <a href="/help/faq">Frequently Asked Questions</a> list for common queries</dd>';
		SearchHTML = SearchHTML + '</dl>';
		SearchHTML = SearchHTML + '<p>';
		SearchHTML = SearchHTML + '<em>The default is to search all forums listed below.  If you feel like digging deaper please enter a specific forum and then search from there.</em>';
		SearchHTML = SearchHTML + '</p>';
		SearchHTML = SearchHTML + '</fieldset>';
		SearchHTML = SearchHTML + '</form>';
		SearchHTML = SearchHTML + '</div>';
		SearchHTML = SearchHTML + '<div class="f">';
		SearchHTML = SearchHTML + '<span class="iesucks">&nbsp;</span>';
		
		searchbox.innerHTML = SearchHTML;
		sidebar.insertBefore(searchbox,sidebar.childNodes[0]);
})();
