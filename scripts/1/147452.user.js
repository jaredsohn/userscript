// ==UserScript==
// @name          Rearrange Google Menu Bar
// @namespace     http://mimiche.org
// @version       1
// @description   Customizes the google black bar
// @include	*.google.*
// @grant	none
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//////////////////////////////
// Remove all useless links //
//////////////////////////////

// - google+
$('#gbzc li:contains("+Vous")').remove();
$('#gbzc li:contains("+You")').remove();
// - google play
$('#gbzc li:contains("Play")').remove();
// - google news
$('#gbzc li:contains("Actualités")').remove();
$('#gbzc li:contains("News")').remove();


//////////////////////
// Add the new ones //
//////////////////////

var links = {
    'Dailymotion' : {
	pos : 3,
	url : 'http://www.dailymotion.com',
	search : function(query) { return 'http://www.dailymotion.com/relevance/search/' + param + '/1'; }
    },
    'Wikipedia' : {
	pos : 5,
	url : 'http://fr.wikipedia.org',
	search : function(query) { return 'http://fr.wikipedia.org/w/index.php?search=' + param; }
    },
    'FilesTube' : {
	pos : 6,
	url : 'http://www.filestube.com',
	search : function(query) { return 'http://www.filestube.com/search.html?q=' + param; }
    },
};

// Retrieve url query string parameters
$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results)
	return results[1] || 0;
    else
	return 0;
}

function googleToolbarElt(url, name)
{
    return '<li class=gbt><a class="gbzt" href="' + url
	+'"><span class="gbtb2"></span><span class="gbts">' + name + '</span></a></li>';
}

function createUrl(param, name, obj)
{
    if (param == 0)
	url=obj.url;
    else
	url=obj.search(param);
    return googleToolbarElt(url, name);
}

function adjustToolbar()
{
    param = $.urlParam('q');
    for (var key in links) {
	$('#gbzc li:contains("'+key+'")').remove();
	$("#gbzc li").eq(links[key].pos - 1).after(createUrl(param, key, links[key]));
    };
}

window.onhashchange = function() { adjustToolbar(); };
adjustToolbar();
