// ==UserScript==
// @name           TOG Full Width Forum
// @namespace      http://www.pixelspluscode.com
// @description    Adjusts the banners on the The Older Gamers (TOG) website to make for easier forum browsing 
// @include        http://www.theoldergamers.com/forum/*
// @include        http://theoldergamers.com/forum/*
// ==/UserScript==

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}

if (document.body.offsetWidth > 1024) {

	var forum             = document.getElementById("forum");
	var wrapper           = document.getElementById("wrapper");
	var contentContainer  = document.getElementById("content-col");
	var forumContainers   = getElementsByClassName(contentContainer, "div", "page-inner");
	var forumBanners      = getElementsByClassName(contentContainer, "div", "forum-ad")[0];
	var forumTopBox       = getElementsByClassName(contentContainer, "div", "forum-content-box")[0];
	var forumProfiles     = getElementsByClassName(contentContainer, "td", "alt2");
	var forumTopAd        = document.getElementById("rhs-col");

	if(document.body.offsetWidth < 1280) {
		forum.style.margin = "0px 5px 0px -2px"; //position = "relative";
		wrapper.style.margin = "0px 5px 0px -2px";
		//forum.style.left = "-100px";
	}

	forumBanners.style.position = "relative";
	forumBanners.style.left = "210px";

	for (var i=0; i<forumContainers.length; i++) {
		forumContainers[i].style.width = "942px";
	}

	for (var i=0; i<forumProfiles.length; i++) {
		forumProfiles[i].style.width = "172px";
		forumProfiles[i].style.overflow = "hidden";
	}



	forumTopBox.parentNode.removeChild(forumTopBox);
	forumTopAd.parentNode.removeChild(forumTopAd);

	contentContainer.appendChild(forumTopBox);
	contentContainer.style.marginTop = "5px";

	forumTopBox.appendChild(forumTopAd);

	forumTopAd.style.position = "relative";
	forumTopAd.style.marginTop = -forumTopAd.offsetHeight - 10 + "px";
	forumTopAd.style.left = "-5px";

//	forumTopAd.style.float = "right";

	document.getElementById("vb-latest-content-load").style.fontSize = "10px";
	document.getElementById("vb-latest-division-load").style.fontSize = "10px";



}