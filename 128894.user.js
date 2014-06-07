// ==UserScript==
// @id             www.bbcgoodfood.com-5989ad85-85b4-4c9c-ac0a-f0229142d1c5@scriptish
// @name           Print Good Food
// @version        1.01
// @namespace      
// @author         Nicholas McGovern
// @description    Tidy the BBC Good Food recipe pages, ready for print
// @include        http://www.bbcgoodfood.com/recipes/*
// @include        http://www.bbc.co.uk/food/recipes/*
// @run-at         document-end
// ==/UserScript==


// ID based element removal
hideElementByID("accesskeys");
hideElementByID("promo");
hideElementByID("footer");
hideElementByID("bbcw-footer")
hideElementByID("accesskeys");
hideElementByID("ads");
hideElementByID("bannerAd");
hideElementByID("header");
hideElementByID("binderDetailsWrapper");
hideElementByID("userDetail");
hideElementByID("leaveComment");
hideElementByID("feedbackBox");
hideElementByID("webLink");
hideElementByID("webLink");
hideElementByID("binder");
hideElementByID("search");
hideElementByID("addToBinderForm");

removeElementByID("sidebarAd");
removeElementByID("nakedWine");
removeElementByID("sidebarAd");
removeElementByID("sidePromos");
removeElementByID("printSidebarPromo");
removeElementByID("webLink");

hideElementByID("comments");
hideElementByID("try");
hideElementByID("recipePublication");


//document.getElementById("otherInfo")


// CSS class based element removal
document.getElementsByClassName("share")[0].style.display = "none";
document.getElementsByClassName("content-promo")[0].style.display = "none";


function removeElementByID(id) {
	element = document.getElementById(id);
	if(element != null) {
		element.parentNode.removeChild(element);
	}
}

function hideElementByID(id) {
	element = document.getElementById(id);
	if(element != null) {
		element.style.display = "none";
	}
}