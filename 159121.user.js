// ==UserScript==
// @name        Youtube
// @include     *://www.youtube.com/*
// @exclude     *://www.youtube.com/account*
// @exclude     *://www.youtube.com/user*
// @resource    background https://lh6.googleusercontent.com/-NaenAzixG-A/UTKE15LIi9I/AAAAAAAAALI/nxVPQsIkFWw/I/mlp_lone_denizen_of_everfree_by_huussii_d5tl1i9%2525281%252529.jpg
// ==/UserScript==
var backgrounddiv = document.createElement("div");
document.body.appendChild(backgrounddiv);
backgrounddiv.id = "divbackground";
backgrounddiv.style.background = '#FFFFFF url("' + GM_getResourceURL ("background") + '") no-repeat center fixed';
backgrounddiv.style.backgroundSize = "cover";
backgrounddiv.style.position = "fixed";
backgrounddiv.style.zIndex = "-1";
backgrounddiv.style.top = "0";
backgrounddiv.style.height = "100%";
backgrounddiv.style.width = "100%";
fadein(document.getElementById('divbackground'),12,100);
if(document.getElementById("page-container") != null) {
	document.getElementById("page-container").style.paddingBottom = "0px";
}
function fadein(elem, speed, opacity){
	speed = speed || 20;
	opacity = opacity || 100;
	elem.style.opacity = 0;
	var val = 0;
	(function(){
		elem.style.opacity = val / 100;
		val += 1;
		if (val <= opacity) setTimeout(arguments.callee, speed)
	})();
}
if (document.getElementById("yt-masthead-user") != null) {
	document.getElementById("yt-masthead-container").style.minWidth = "1px";
	document.getElementById("yt-masthead-dropdown").parentNode.removeChild(document.getElementById("yt-masthead-dropdown"));
	document.getElementById("yt-masthead-user-displayname").parentNode.removeChild(document.getElementById("yt-masthead-user-displayname"));
}
if (document.getElementById("watch7-sidebar") == null) {
	
	var guide = document.getElementById("guide");
	guide.style.backgroundColor = "#FFF";
	guide.style.marginTop = "15px";
	guide.style.marginLeft = "-22px";
	document.getElementById("guide-container").style.paddingRight = "10px";
	document.getElementById("guide-container").style.paddingLeft = "5px";
	//if (document.getElementById("gh-personal") != null) {
	//	document.getElementById("guide-subscriptions-section").parentNode.parentNode.removeChild(document.getElementById("guide-subscriptions-section").parentNode);
	//	document.getElementById("guide-main").lastElementChild.lastElementChild.parentNode.removeChild(document.getElementById("guide-main").lastElementChild.lastElementChild);
	//	document.getElementById("guide-main").firstElementChild.style.marginBottom = "0";
	//	document.getElementById("guide").style.paddingTop = "7px";
	//} 	
	if(document.getElementById("footer-container") != null) {
		var footer = document.getElementById("footer-container");
		footer.parentNode.removeChild(footer);
	}
	if(document.getElementById("content").firstElementChild.firstElementChild.firstElementChild.className == "branded-page-v2-secondary-col") {
		var secondarycol = document.getElementById("content").firstElementChild.firstElementChild.firstElementChild;
		secondarycol.parentNode.removeChild(secondarycol)
	}	

	if(document.getElementById("gh-activityfeed").firstElementChild.firstElementChild.className == "lohp-newspaper-shelf") {
		document.getElementById("content").firstElementChild.style.marginTop = "15px";
	}
	if(document.getElementById("feed-main-what_to_watch") != null) {
		var primarycol = document.getElementById("content").firstElementChild.firstElementChild.lastElementChild;
		//	primarycol.parentNode.removeChild(primarycol);
		//	document.body.style.overflow = "hidden";
		primarycol.style.marginTop = "-5px";
	}
}
if (document.getElementById("watch7-sidebar") != null) {
	var watch7sidebar = document.getElementById("watch7-sidebar");
	var guidecontainer = document.getElementById("guide-container");
	watch7sidebar.style.backgroundColor = "#FFFFFF";
	watch7sidebar.style.paddingTop = "15px";
	watch7sidebar.style.paddingBottom = "0px";
	watch7sidebar.style.marginBottom = "0px";
	guidecontainer.style.backgroundColor = "rgba(255,255,255,1";
	guidecontainer.style.left = "22px";
	guidecontainer.style.paddingBottom = "0";
        document.getElementById("guide-main").style.paddingRight = "10px";
	document.getElementById("guide-main").style.paddingLeft = "5px";
	//if (document.getElementById("gh-personal") != null) {
	//	var guidemain = document.getElementById("guide-subscriptions-section").parentNode;
	//	guidemain.parentNode.removeChild(guidemain);
	//	var guideseperator = document.getElementById("guide-main").lastElementChild.childNodes[3];
	//	guideseperator.parentNode.removeChild(guideseperator);
	//	document.getElementById("guide-main").width = "100px";
	//	document.getElementById("guide-main").style.marginBottom = "0";
	//	document.getElementById("guide-main").lastElementChild.style.marginBottom = "5px";
	//	document.getElementById("guide-container").style.paddingBottom = "10px";
	//	document.getElementById("watch-context-container").style.marginBottom = "0px";
	//}
	document.getElementById("content").style.paddingBottom = "0px";
	document.getElementById("content").style.marginLeft= "0px";
	document.getElementById("page").style.paddingBottom = "0px";
	if(document.getElementById("footer-container") != null) {
		var footer = document.getElementById("footer-container");
		footer.parentNode.removeChild(footer);
	}
}
