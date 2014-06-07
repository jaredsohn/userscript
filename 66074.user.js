// ==UserScript==
// @name          eRepublik  gasterbajter - croatia
// @namespace      http://www.tralala.com/
// @description   replaces urls for news and country  stats to croatia ones - useful if you are working out side of your country - hardcoded for croatia
// @version 1.1
// @include       http://www.erepublik.com*
// ==/UserScript==


var EG = {};

//firefox debug
EG.log = function(msg){
	if(unsafeWindow.console){
	  unsafeWindow.console.info(msg);
	}
}

//constants and setup
EG.baseUrl = 'http://www.erepublik.com/en/';
EG.countryId = 63; //croatia  country id, for news anyways
EG.countryName = 'Croatia'; //croatia  country name
EG.countryNewsUrl = EG.baseUrl + 'news/rated/1/'+ EG.countryId; //croatia news url
EG.countryStatsUrl = EG.baseUrl + 'country/society/' + EG.countryName; //croatia country stats url
EG.countryAdministrationUrl = EG.baseUrl + 'country/' + EG.countryName //croatia country adm. url

EG.communityMenuId = 'menu5';
EG.newsMenuPosition = 3;
EG.infoMenuId = 'menu4';
EG.countryStatsMenuPosition = 2;
EG.myPlacesMenuId = 'menu2';
EG.countryAdministrationMenuPosition = 6;


//does the job :P
EG.doTheJob = function() {	
	EG.replaceMenuUrls();
	//other stuff	
}

//couldn't get prototype/jquery to work on erep - writing my own methods..
EG.$ = function(elemId){
	return document.getElementById(elemId);
}

EG.next = function(elem, count, tagName){
	var count = count || 1;
	var tagName = tagName || '*';
	
	var elems = elem.getElementsByTagName(tagName);
	if(count <= elems.length){
		return elems[count -1];
	}
}

EG.changeMenuLinkUrl = function(menuId, linkNo, url){
	var menuElem = EG.$(menuId);
	if(menuElem){
		var menuLinkListElem = EG.next(menuElem, linkNo, 'li');
		var menuLinkElem = EG.next(menuLinkListElem, 1, 'a');
		menuLinkElem.setAttribute('href', url);
	}
	
}

//replace menu links - to croatia urls
EG.replaceMenuUrls = function(){
	
	EG.changeMenuLinkUrl(EG.communityMenuId, EG.newsMenuPosition, EG.countryNewsUrl);
	EG.changeMenuLinkUrl(EG.infoMenuId, EG.countryStatsMenuPosition, EG.countryStatsUrl);
	EG.changeMenuLinkUrl(EG.myPlacesMenuId , EG.countryAdministrationMenuPosition, EG.countryAdministrationUrl);
	
};

window.addEventListener('load', function(event) {      
   EG.doTheJob();
 
}, 'false');



