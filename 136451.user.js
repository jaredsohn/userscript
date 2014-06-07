// ==UserScript==
// @name           ściskacz zdjęcia
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/profil/*
// @version        1.1.0
// ==/UserScript==

var $ = unsafeWindow.$;
var originalH = $(".profile-photo img").height();
var originalW = $(".profile-photo img").width();
var ar = originalW / originalH;
$(window).resize(refitPhoto);
$(document).ready(refitPhoto);

function refitPhoto(){
	var h = $(window).height() - $(".profile-photo").offset().top;	
	var maxW = 670;
	var maxH = maxW / ar;
	h = Math.max(100, h-3);
	h = Math.min(h, maxH);	
	$(".profile-photo").css({height: h+"px"});		
	$(".photo-info-container").css({width: "inherit", height: "inherit"});
	$(".jcrop-holder").prev().css({width: "inherit", height: "inherit"});
	$(".jcrop-holder").css({width: "auto", height: "auto", backgroundColor: "inherit"});
	$(".jcrop-tracker").css({width: "inherit", height: "inherit"});
	$(".jcrop-holder img").css({width: "inherit", height: h+"px", position: "inherit"});	
	$(".profile-photo img").css({height: h+"px", width: "auto"});
	$(".profile-photo img").mouseover(revert);
}

function revert(){
	$(".profile-photo").css({height: "auto"});	
	$(".profile-photo img").css({height: originalH + "px", width: "auto"});
	$(".profile-photo img").unbind("mouseover");
	$(window).unbind("resize");
}