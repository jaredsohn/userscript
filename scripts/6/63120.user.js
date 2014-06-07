// Cruncyroll.com no-ads
// 2009-11-30
// ==UserScript==
// @name          CrunchyRoll no-ads
// @namespace      http://userscripts.org/users/gizmostudios
// @description   Remove all ads on crunchyroll.com
// @include       http://www.crunchyroll.com/*
// ==/UserScript==

var errors = new Array();

function elem(id){
	var tempElem = document.getElementById(id);
	return tempElem;
}

function hide(element){
	try{
		element.style.display = 'none';
	} catch(e){
		errors.push("hide: " + e);
	}
}

function hideElements(list){
	for(item in list){
		try{
			var cItem = elem(list[item]);
			hide(cItem);
		} catch(e){
			errors.push("hideElements: " + e);
		}
	}
}

function hideClasses(list){
	for(c in list){
		try{
			var className = list[c];
			var classAr = document.getElementsByClassName(className);
			for(item in classAr){
				hide(classAr[item]);
			}
		} catch(e){
			errors.push("hideClasses: " + e);
		}
	}
}

var hidelist = new Array(
	 "template_ad_leaderboard"
	,"message_box"
	,"welcome_announcement"
	,"showmedia_square_adbox_new"
	,"collectiongoods_more"
	,"library_article_collectiongoods_grid"
	,"skin-leaderboard"
	,"welcome_ad_mrec"
)
var classlist = new Array(
	 "welcome-supporter"
	,"anime-mrec"
)


hideElements(hidelist);
hideClasses(classlist);