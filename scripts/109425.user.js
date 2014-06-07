// ==UserScript==
// @name           Link Imdb to Nzbindex
// @require	       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js
// @namespace      imdbnzbindex
// @include        *imdb.com/*
// ==/UserScript==

//global variables
//because I want to watch my movies german..
var extraSearchInfo=" german";

//var notNeededInfo=/TV Series|TV Movie/g;

//title location
var locationTitle = "/title/";

//watchlist location
var locationWatchlist = "/list/watchlist";

//community list location
var locationList = "/list/";

//name location 
var locationName = "/name/";

//because somehow window.location doesn't work (maybe because of iframes?!)
var windowLoc = $('link[rel="canonical"]').attr('href');

//where to get the title
var titlePosition = "";

var nzbPosition = "";

//check if we are on a community list or on a title page
if(windowLoc.indexOf(locationTitle)!=-1){
	//when the link should be displayed on title page
	addLinks('h1[class="header"][itemprop="name"]');

} else if(windowLoc.indexOf(locationWatchlist)!=-1){	
	//when the link should be displayed on all items in a watchlist
	$('div[class="list_item grid"]').each(function (i, value){
		$(this).mouseover(function(event){
			//add the links we need
			addLinks('span[class="ho-title"]');
			//TODO: somehow there's a shadow behind the img (firebug says there's no css for it?!)
		});
	});
	
} else if(windowLoc.indexOf(locationList)!=-1){
	//when the link should be displayed on all items in a community list
	addLinks('div[class="info"] b');
	
} else if(windowLoc.indexOf(locationName)!=-1){
	//when the link should be displayed on all items in a Name page (knwon for links
	addLinks('div#knownfor div a[itemprop="performerIn"]');
	
}

function addLinks(titlePosition){
$(titlePosition).each(function(index, value){
var movieText = $(this).text()
				.replace(/\s+/g,' ') // for spaces in between name and year
				.replace(/[&\(\)-]/g,''); //for not needed signs
movieText += extraSearchInfo;
movieText=movieText.replace(/TV Series|TV Movie/g, '');
movieText=movieText.trim();
createNzbLink(movieText, $(this));
});
}

function createNzbLink(searchText, loc){
	//check if there is already a nzbLink (is a must for the watchlist hover stuff..)
	if(loc.next().attr('id')!='nzbLink'){
		return $('<a>')
			.attr('id', 'nzbLink')
			.attr('href', 'http://www.nzbindex.nl/search/?age=200&max=250&sort=agedesc&minsize=300&complete=1&rating=1&hidespam=1&q=' + searchText)
			.css({marginRight: '.25em', position: 'relative', top: 3, left: 3, background : 'none' })
			.append('<img src="http://www.nzbindex.nl/favicon.ico">')
			.insertAfter(loc);
	}
};