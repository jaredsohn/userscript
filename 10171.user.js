// ==UserScript==
// @name	Last.fm - Normalised Chart
// @namespace	http://no.name.space/	
// @description	Adds option to view time normalised artist chart - uses mattperdeaux's XML feed.
// @include	http://www.last.fm/user/*
// ==/UserScript==

// History
// 2007-06-24 : Created - gadgetchannel
// 2008-07-26 : Changed for new layout.
// 2008-07-29 : Fixed issues with caching of chart HTML and imrpoved response time.

var root_url;
var jumptochart = false;
var current_charttype = "";
var chartMode = "";
var username;
var TimeChartHTML = {};
var PlayChartHTML = {};
var Loading = false;

//Regular Expression to strip XML declaration prior to new XML()
var xmlDeclaration = /^<\?xml version[^>]+?>/;

function xpath(query, doc) {
    return document.evaluate(query, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
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

function displayPlaysChart()
{
	current_charttype = getChartType();
	chartMode = 'plays';
	GM_setValue('artist_ChartMode',chartMode);
	var i, charts;
	var parent = xpath("//div[contains(@class, 'chart')]", document).snapshotItem(0);
	for(i = 0; i < parent.childNodes.length; i++) {
		if(parent.childNodes[i].className && parent.childNodes[i].className.indexOf("chart") != -1 && parent.childNodes[i].style.display != "none") {
			charts = xpath(".//tr/../..", parent.childNodes[i]);
			break;
		}
    	}
	if (charts.snapshotLength > 0)
	{
		chart = charts.snapshotItem(0);
		var Pos = chart.className.indexOf('normalized');
		if(Pos != -1)
		{
			chart.className = chart.className.substr(0,Pos);
		}
		
		var header = document.getElementById('chartmode_options');
		if (header)
		{
			header.style.display = "";
			var playbased = document.getElementById('playbased');
			var timebased = document.getElementById('timebased');
			timebased.className = "";
			playbased.className = "current first";
		}
		else
		{
			header = document.createElement("div");
			header.className = "horizontalOptions clearit";
			header.id = "chartmode_options";
			var headerHTML = '<ul>';
			headerHTML = headerHTML + '<li id="playbased" class="current first">';
			headerHTML = headerHTML + '<a href="javascript:displayPlaysChart();">Play-Based Chart</a>';	
			headerHTML = headerHTML + '</li>';
			headerHTML = headerHTML + '<li id="timebased">';
			headerHTML = headerHTML + '<a href="javascript:getTimeChart();">Time-Based Chart</a>';
			headerHTML = headerHTML + '</ul>';
		
			header.innerHTML = headerHTML;
			chart.parentNode.parentNode.insertBefore(header,chart.parentNode);
		}
		if(PlayChartHTML[current_charttype] != undefined && PlayChartHTML[current_charttype] != "")
		{
			chart.innerHTML = PlayChartHTML[current_charttype];
		}
		
		
	}
	if(jumptochart)
	{
		location.hash = '#plays_chart';
	}
}

function getPlayButton(chart,artistname)
{
	var PlayButton = '&nbsp';
	//var rows = xpath("//table[@id='" + chart.id + "']//tr",document);
	var rows = xpath(".//tr",chart);
	if (rows.snapshotLength < 1) { return '&nbsp'; }
	for (var i = 0; i < rows.snapshotLength ; i++ ) {
		row = rows.snapshotItem(i);
		var artist = "";	
		for(var j = 0; j < row.cells.length; j++)
		{
			if(row.cells[j].className == "playbuttonCell")
			{
				PlayButton = row.cells[j].innerHTML;
			}
			if(row.cells[j].className == "subjectCell")
			{
				artist = row.cells[j].childNodes[1].childNodes[1].innerHTML;
			}
		}
		if (artist == artistname)
		{	return PlayButton;
		}
	}
	return '&nbsp;';
}

function getChartType() {
    var tabs = xpath("//div[contains(@class, 'chart')]/../div/ul/li", document);
    for(var i = 0; i < tabs.snapshotLength; i++) {
        tab = tabs.snapshotItem(i);
        if(tab.className.indexOf("current") != -1) {
            if(tab.className.indexOf("chartweek") != -1) {
                return "week";
            } else if(tab.className.indexOf("chart3month") != -1) {
                return "3month";
            } else if(tab.className.indexOf("chart6month") != -1) {
                return "6month";
            } else if(tab.className.indexOf("chartyear") != -1) {
                return "12month";
            } else if(tab.className.indexOf("chartoverall") != -1) {
                return "overall";
            }
        }
    }
}

function nameArtistChart(pos) {
    chart = xpath("//div[contains(@class, 'chart')]/table", document).snapshotItem(pos);
    chart.id = "artistchart";
}

function watchForChartChange(username)
{
    if(!Loading)
    {
    	var charttype = getChartType();
    	if(charttype != current_charttype) {
        	current_charttype = charttype;
        	if(charttype != 'week')
		{
			if (chartMode == 'time')
			{
				getTimeChart(username,charttype);
			}
			else
			{
				displayPlaysChart();	
			}
    		}
    		else
    		{
    			var header = document.getElementById('chartmode_options');
			if (header)
			{
				header.style.display = "none";
			}
    		}
    	}
    }
}

function getTimeChart()
{
	current_charttype = getChartType();
	chartMode = 'time';
	GM_setValue('artist_ChartMode',chartMode);
	
	var i;
	var parent = xpath("//div[contains(@class, 'chart')]", document).snapshotItem(0);
		for(i = 0; i < parent.childNodes.length; i++) {
		        if(parent.childNodes[i].className && parent.childNodes[i].className.indexOf("chart") != -1 && parent.childNodes[i].style.display != "none") {
		            charts = xpath(".//tr/../..", parent.childNodes[i]);
		            break;
		        }
	    	}
	
	var ReadFeed = true;
	
	if (charts.snapshotLength > 0)
	{
		var chart = charts.snapshotItem(charts.snapshotLength - 1);
		if(TimeChartHTML[current_charttype])
		{
			chart.innerHTML = TimeChartHTML[current_charttype];
			ReadFeed = false;
		}
		var header = document.getElementById('chartmode_options');
		if (header)
		{
			header.style.display = "";
			var playbased = document.getElementById('playbased');
			var timebased = document.getElementById('timebased');
			timebased.className = "current";
			playbased.className = "first";
		}
		else
		{
			header=document.createElement("div");
			if(ReadFeed)
			{
				header.className = "horizontalOptions clearit loading";
			}
			else
			{
				header.className = "horizontalOptions clearit";
			}
			header.id = "chartmode_options";
		
			var headerHTML = '<ul>';
			headerHTML = headerHTML + '<li id="playbased" class="first">';
			headerHTML = headerHTML + '<a href="javascript:displayPlaysChart();">Play-Based Chart</a>';	
			headerHTML = headerHTML + '</li>';
			headerHTML = headerHTML + '<li id="timebased" class="current">';
			headerHTML = headerHTML + '<a href="javascript:getTimeChart();">Time-Based Chart</a>';
			headerHTML = headerHTML + '</ul>';
		
			header.innerHTML = headerHTML;
			chart.parentNode.parentNode.insertBefore(header,chart.parentNode);
		}
		
		if(ReadFeed)
		{
			Loading = true;
			var charttype = current_charttype;
			GM_xmlhttpRequest({
				        	method: 'GET',
				        	url: 'http://www.associativetrails.com/stuff/normalisefm/index.cfm?user=' + username + '&format=xml&chart=artist&type=' + charttype,
				        	onload: function(responseDetails) {
				           	var xml = new XML(responseDetails["responseText"].replace(xmlDeclaration, '').replace(/&/g,' '));
				            	displayTimeChart(eval('xml.artist'));
				        		}
	        	});
		}
	}
	
	
}
function displayTimeChart(newchart)
{
	var i, charts;
	var chartHTML = '<tbody>';
	
	
	var parent = xpath("//div[contains(@class, 'chart')]", document).snapshotItem(0);
	for(i = 0; i < parent.childNodes.length; i++) {
	        if(parent.childNodes[i].className && parent.childNodes[i].className.indexOf("chart") != -1 && parent.childNodes[i].style.display != "none") {
	            charts = xpath(".//tr/../..", parent.childNodes[i]);
	            break;
	        }
    	}
    	    
    	if (charts.snapshotLength > 0)
	{
		var chart = charts.snapshotItem(charts.snapshotLength - 1);
		if(chart.className.indexOf('normalized') == -1)
		{
		chart.className += ' normalized';
		if(PlayChartHTML[current_charttype] == undefined || PlayChartHTML[current_charttype] == "")
		{
			PlayChartHTML[current_charttype] = chart.innerHTML;
		}
		
		var rowcount = xpath(".//tr", chart).snapshotLength;
		for(var i=0; i < Math.min(newchart.length(), rowcount); i++) {
			var minutes = newchart[i].minutes;
			var hours = Math.floor(minutes / 60);
			var artistname;
			if (/http:\/\/.*?\/music\/([^?\/]+)/.test(newchart[i].url)) {
				artistname = decodeURIComponent(RegExp.$1);
				artistname = artistname.replace(/\+/g,' ');
				artistname = decodeURIComponent(artistname);
    			}
			minutes = minutes - (hours * 60);
			
			if(i % 2 == 0)
			{
				chartHTML = chartHTML + '<tr class="odd">';
			}
			else
			{
				chartHTML = chartHTML + '<tr>';
			}
			
		        chartHTML = chartHTML + '<td class="positionCell">' + newchart[i].normalisedrank + '</td>';
			chartHTML = chartHTML + '<td class="playButtonCell">' + getPlayButton(chart, artistname) + '</td>';
			chartHTML = chartHTML + '<td class="subjectCell" title="' + artistname + ', played for ' + newchart[i].minutes + ' minutes">';
			chartHTML = chartHTML + '<span><a href="' + newchart[i].url + '">' + artistname + '</a></span></td>';
			chartHTML = chartHTML + '<td class="multiButtonCell"></td>';
			chartHTML = chartHTML + '<td class="chartbarCell">';
			var perc = ((newchart[i].minutes / newchart[0].minutes) * 100)
			if (perc < 11)
			{
				perc = 11;
			}
			chartHTML = chartHTML + '<div style="width:' + perc + '%;" class="chartbar">';
			chartHTML = chartHTML + '<span>' + newchart[i].minutes + '</span>';
			chartHTML = chartHTML + '</div>';
			chartHTML = chartHTML + '</td>';
			chartHTML = chartHTML + '</tr>';
    		}
    		chartHTML = chartHTML + '</tbody>';
    		TimeChartHTML[current_charttype] = chartHTML;
		chart.innerHTML = chartHTML;
		}
	}
	var header = document.getElementById('chartmode_options');
	if (header)
	{
		header.className = "horizontalOptions clearit";
	}
	Loading = false;
	if(jumptochart)
	{
		location.hash = '#time_chart';
	}	
}
(function () {
	// Give main page access to required methods
    	// unsafeWindow.gm_wrapped_setValue = function (key, value) { window.setTimeout(function () { GM_setValue(key, value);  window.location.reload(); }, 0); };
        unsafeWindow.displayPlaysChart = function () { window.setTimeout(function () { displayPlaysChart(); }, 0); };
        unsafeWindow.getTimeChart = function () { window.setTimeout(function () { getTimeChart(); }, 0); };
        
	root_url = location.href;
	root_url = root_url.replace(location.search,'');
	root_url = root_url.replace(location.hash,'');
	
	if (/http:\/\/.*?\/user\/([^?\/]+)/.test(location.href)) {
	        username = RegExp.$1;
    	}
	if(!username) { return; }

    	chartMode = GM_getValue('artist_ChartMode','plays');
    	
    	var charttype = getChartType();
    	current_charttype = charttype;
    	if(charttype != 'week')
	    	{
	    	if (chartMode == 'time')
	    	{
			getTimeChart();
		}
		else
		{
			displayPlaysChart();	
	    	}
    	}
        var tabs = xpath("//div[contains(@class, 'chart')]/../div/ul/li", document);
        for(var i = 0; i < tabs.snapshotLength; i++) {
        	var tab = tabs.snapshotItem(i);
        	if(tab.className.indexOf("chart") != -1) {
            		tab.addEventListener("click",function() { window.setTimeout(function () { watchForChartChange(username); }, 100); },false);
            		
        	}
        }
    	
	
})();