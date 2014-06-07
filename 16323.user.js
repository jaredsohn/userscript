// ==UserScript==
// @name	Last.fm - Artist Taste-o-Meter
// @namespace	http://no.name.space/	
// @description	Adds Taste-o-Meter to artist pages
// @include	http://www.last.fm/music/*
// ==/UserScript==

// History
// 2007-06-24 : Created - gadgetchannel

//Regular Expression to strip XML declaration prior to new XML()
var xmlDeclaration = /^<\?xml version[^>]+?>/;
var SimilarArtists;
var artistname;
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


function getMyArtists(username)
{
var charttype = 'overall';
getMyArtistsOverall(username);
}

function getMyArtistsOverall(username)
{
var charttype = 'overall';
GM_xmlhttpRequest({
	        	method: 'GET',
	        	url: 'http://ws.audioscrobbler.com/1.0/user/' + username + '/topartists.xml?type=' + charttype,
	        	onload: function(responseDetails) {
	           	var xml = new XML(responseDetails["responseText"].replace(xmlDeclaration, '').replace(/&/g,' '));
	           	var OverallTOM = getTOMScore(eval('xml.artist'),SimilarArtists);
	            	getMyArtistsSixMonth(username,OverallTOM);
	        		}
	        	});  
}

function getMyArtistsSixMonth(username,OverallTOM)
{
var charttype = '6month';
GM_xmlhttpRequest({
	        	method: 'GET',
	        	url: 'http://ws.audioscrobbler.com/1.0/user/' + username + '/topartists.xml?type=' + charttype,
	        	onload: function(responseDetails) {
	           	var xml = new XML(responseDetails["responseText"].replace(xmlDeclaration, '').replace(/&/g,' '));
	            	var SixMonthTOM = getTOMScore(eval('xml.artist'),SimilarArtists);
	            	var MyTOM = (OverallTOM + SixMonthTOM) / 2;
	            	OutputTOM(MyTOM);
	        		}
	        	});  
}

function getTOMScore(my,sim)
{
	var TOMScore = 0;
	var Count = 0;
	var main_artist = decodeURIComponent(artistname.replace(/\+/g,'%20'));
	var SimCount = sim.length();
	var MyCount = my.length();
	var mainartistfound = false;

	for(var i=0; i<SimCount; i++) {
		Count = Count + 1;
		var sim_artist = '';
		var sim_rank = 100;
		if (/http:\/\/.*?\/music\/([^?\/]+)/.test(sim[i].url)) {
			sim_artist = decodeURIComponent(RegExp.$1);
			sim_artist = sim_artist.replace(/\+/g,' ');
			sim_artist = decodeURIComponent(sim_artist);
			sim_rank = sim[i].match;
    		}
    	
    		for(var j=0; j<my.length(); j++) {
    			var my_artist = '';
    			var my_rank = 100;
			if (/http:\/\/.*?\/music\/([^?\/]+)/.test(my[j].url)) {
				my_artist = decodeURIComponent(RegExp.$1);
				my_artist = my_artist.replace(/\+/g,' ');
				my_artist = decodeURIComponent(my_artist);
				my_rank = (50 - my[j].rank) * 2;
    			}
    			if (my_artist == sim_artist)
			{
	    			var ThisScore = (100 - Math.abs(sim_rank - my_rank));
	    			ThisScore = ThisScore * (SimCount / MyCount);
	    			ThisScore = ThisScore / 100;
	    			TOMScore = TOMScore + ThisScore;
    			}
    			if ((my_artist == main_artist) && (!mainartistfound))
    			{
    				var ThisScore = my_rank;
	    			TOMScore = ThisScore
	    			mainartistfound = true;
	    			break;
    			}
    		}
    		if(mainartistfound)
    		{
    			break;
    		}
	}
	TOMScore = Math.min(TOMScore * 2, 100);
	return TOMScore;
}

function OutputTOM(TOMScore)
{
	var main_artist = decodeURIComponent(artistname.replace(/\+/g,'%20'));
	var tomHTML = '<br/><div style="catContent"><div id="tasteOMeter" class="lastPanel"><div class="h">';
        tomHTML = tomHTML + '<h2>Taste-o-meter</h2>';
	tomHTML = tomHTML + '<a href="javascript:;" class="tog collapseTog" title="Collapse Panel" onclick="return collapseBox(\'tasteOMeter\', this);" onfocus="blur();"></a>';
	tomHTML = tomHTML + '</div>';
	tomHTML = tomHTML + '<div class="c collapsed">';
	tomHTML = tomHTML + '<div id="tom_contents">';
	tomHTML = tomHTML + '<p>Your musical compatibility rating with <strong>' + main_artist + '</strong> is:</p>';
	var RatingText;
	var RatingClass;
	if(TOMScore >= 90)
	{
		RatingText = "Super";
		RatingClass = "super";
	}
	if((TOMScore >= 70) && (TOMScore < 90))
	{
		RatingText = "Very High";
		RatingClass = "veryhigh";
	}
	if((TOMScore >= 50) && (TOMScore < 70))
	{
		RatingText = "High";
		RatingClass = "high";
	}
	if((TOMScore >= 30) && (TOMScore < 50))
	{
		RatingText = "Medium";
		RatingClass = "medium";
	}
	if((TOMScore >= 10) && (TOMScore < 30))
	{
		RatingText = "Low";
		RatingClass = "low";
	}
	if(TOMScore < 10)
	{
		RatingText = "Very Low";
		RatingClass = "verylow";
	}
	tomHTML = tomHTML + '<div id="tomRating" class="' + RatingClass + '">';
	tomHTML = tomHTML + '<div class="reading">' + RatingText + '</div>';
	tomHTML = tomHTML + '<div class="graph"><div id="tomGraph" style="width:' + TOMScore + '%;"> </div></div>';
	tomHTML = tomHTML + '</div>';
	tomHTML = tomHTML + '</div>';
	tomHTML = tomHTML + '</div>';
	tomHTML = tomHTML + '<div class="f">';
	tomHTML = tomHTML + '<span class="iesucks">&nbsp;</span>';
	tomHTML = tomHTML + '</div>';
	tomHTML = tomHTML + '</div>';
	tomHTML = tomHTML + '</div>';
	var divs = xpath("//div[contains(@class, 'catRight')]");
	var div = divs.snapshotItem(0).childNodes[0];
	newdiv = document.createElement('div');
	newdiv.innerHTML = tomHTML;
	div.insertBefore(newdiv,div.childNodes[1]);
}

(function () {  	
 	var meLink = xpath("//a[@id='profileImage']");
	if (meLink.snapshotLength < 1) { return; }
	var whoAmI = meLink.snapshotItem(0).href.match(/user\/([^\/]*)\//)[1];
	var username;
	if (/http:\/\/.*?\/music\/([^?\/]+)/.test(location.href)) {
		artistname = RegExp.$1;
	}
	if(!artistname) { return; }
	if(!artistname) { return; }
    	GM_xmlhttpRequest({
	        	method: 'GET',
	        	url: 'http://ws.audioscrobbler.com/1.0/artist/' + artistname + '/similar.xml',
	        	onload: function(responseDetails) {
	           	var xml = new XML(responseDetails["responseText"].replace(xmlDeclaration, '').replace(/&/g,' '));
	            	SimilarArtists = eval('xml.artist');
	            	getMyArtists(whoAmI);
	        		}
	        	});   	
})();
