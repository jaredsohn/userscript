// Facebook Slogan example user script
// version 0.1.1
// 2011−08−20
// Copyright (c) 2011, Sławomir Chrobak
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Facebook Slogan", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name Facebook Slogan
// @namespace http://diveintogreasemonkey.org/download/
// @description Script tha changes the default translation values of Facebook UI
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include http://facebook.com/*
// @include http://*.facebook.com/*
// @include https://facebook.com/*
// @include https://*.facebook.com/*
// ==/UserScript==

$(document).ready(function() {

	// translations
    var translate = new Array();
    
    translate["like_it"] = "Lubię w chuj!";
    translate["unlike_it"] = "Jednak nie lubię";
    translate["add_comment"] = "Dojebaj coś";
    translate["share"] = "Pokaż im!";
    translate["show_all_comments"] = "Zobacz co dejebali";
    translate["events"] = "Iwenty";
    translate["friend_invitations"] = "Zobacz, ktoś chce Cię wielbić";
    translate["friends_of"] = "wielbią teraz";
    translate["add_friend"] = "Dodaj pokemona";
    translate["others_like_it"] = "w chuj innych osób";
    translate[""] = "";

	// Like it!
	var likeBtn = $(".like_link");
    
    $(likeBtn).each(function() {
    	var likeChildren = $(this).children();
        
        $(likeChildren[0]).html(translate["like_it"]);
    	$(likeChildren[1]).html(translate["unlike_it"]);
    });
    
    $(likeBtn).click(function() {
    	$(this).delay(500, function() {
        	var children = $(this).children();
        
        	$(children[0]).html(translate["like_it"]);
    		$(children[1]).html(translate["unlike_it"]);
        });
    });
    
});