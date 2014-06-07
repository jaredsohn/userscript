// ==UserScript==
// @name           Spiegel.de pure content
// @namespace      *
// @include        http://www.spiegel.de/*
// @exclude		   http://www.spiegel.de/static/sys/pixel.gif
// ==/UserScript==

function remove_node_id(id) {
    	var el = document.getElementById(id);
    	if (el) {
    		el.parentNode.removeChild(el);
    	}
}

function remove_node_class(cla) {
	var ebody = document.getElementsByClassName(cla);
	for (var i = (ebody.length - 1); i >= 0; i--) {
		ebody[i].parentNode.removeChild(ebody[i]);
	}
}

function change_class_width(cla, value) {
	for (var i = 0; i < document.getElementsByClassName(cla).length; i++) {
		document.getElementsByClassName(cla)[i].style.width = value;
	}
}

function change_class_background(cla, value) {
	for (var i = 0; i < document.getElementsByClassName(cla).length; i++) {	document.getElementsByClassName(cla)[i].style.background = value; }
}


Array.prototype.in_array = function(needle) {
	for(var i=0; i < this.length; i++) if(this[i] === needle) return true;
	return false;
}

var locator = window.location.href.split("/");

var ressorts = Array("unispiegel","wissenschaft","panorama","politik","wirtschaft","sport","kultur","netzwelt","gesundheit","karriere","uni","schulspiegel","reise","auto");

if (locator[3] == "") {

	remove_node_class("header-top");
	remove_node_id("breadcrumb");
	remove_node_class("top-poster");
	remove_node_class("column-small pano_xxl");
	remove_node_class("hpheftkasten hp-gradient clearfix");
	remove_node_class("asset-box asset-hp-special clearfix");
	remove_node_class("boersenboxhp hp-gradient clearfix");
	remove_node_class("asset-box asset-mixed-imagetypes clearfix");
	remove_node_id("footer");
	change_class_width("column-wide pano_xxl","100%");
	change_class_background("column-wide pano_xxl","white");
	remove_node_class("clearfix commonpager-indicator");	
	remove_node_class("column-small");
	change_class_width("column-wide","100%");
	change_class_background("column-wide","white");
	document.getElementById("wrapper").style.margin = "0px";
	document.getElementById("wrapper-shadow").style.width = "97%";
	document.getElementById("wrapper-content").style.width = "97%";
	for (var i = 0; i < document.getElementsByClassName("teaser").length; i++) { 
		document.getElementsByClassName("teaser")[i].style.marginBottom = "5px";
		document.getElementsByClassName("teaser")[i].style.paddingTop = "5px";
		document.getElementsByClassName("teaser")[i].style.borderTopWidth = "1px";
	}

	
}
else if ((ressorts.in_array(locator[3]))&&(locator[locator.length-1].substr(locator[locator.length-1].length - 4) == "html")) {

	remove_node_class("header-top");
	remove_node_id("breadcrumb");
	remove_node_class("nav-channel");
	remove_node_class("column-small");
	remove_node_class("module-box function-box");
	remove_node_id("spVeeseo");
	remove_node_class("clearfix article-comments-box module-box");
	remove_node_class("article-newsfeed-box module-box");
	remove_node_class("article-copyright");
	remove_node_class("spTopicMultimedia");
	remove_node_class("top-anchor link-gradient-button-box");
	remove_node_id("footer");
	change_class_width("column-wide","100%");	
	change_class_width("column-both","100%");
	document.getElementById("content-main").style.width = "100%";
	change_class_width("js-module-box-image box-position  spXXLPano asset-align-center breitwandaufmacher","100%");
	document.getElementById("wrapper").style.margin = "0px";
	document.getElementById("wrapper-shadow").style.width = "97%";
	document.getElementById("wrapper-content").style.width = "97%";
	try { 
		var gallery = document.getElementsByClassName("asset-box spPhotoGallery article-photo-gallery");
		if (gallery.length == 1) {
			gallery = gallery[0];
			root = gallery.parentNode;
			root.removeChild(gallery);
			root.appendChild(gallery);
		}
	}
	catch(e) {}
	remove_node_class("asset-box asset-list-box clearfix");


}
else if ((locator[3] == "fotostrecke")&&(locator[locator.length-1].substr(locator[locator.length-1].length - 4) == "html")) {
}