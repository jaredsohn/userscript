// ==UserScript==
// @name			Tumblr TinyMCE Extender
// @author			Ernie Smith
// @namespace		com.tinytumblr.extender
// @version     1.0.1
// @description		Easier font resizing, undo and redo, and some more options to make posting on Tumblr less annoying.
// @include        	http://www.tumblr.com/*new/text
// @include        	http://www.tumblr.com/*new/photo
// @include        	http://www.tumblr.com/*new/quote
// @include        	http://www.tumblr.com/*new/link
// @include        	http://www.tumblr.com/*new/audio
// @include        	http://www.tumblr.com/*new/video
// @include        	http://www.tumblr.com/reblog/*
// @include        	http://www.tumblr.com/edit/*
// ==/UserScript==
(function () {	
	function main() {
		// is link post ?
		var ep = document.forms["edit_post"];
		ep = (ep) ? ep.className == "link_post" : false;
		var pn = (ep) ? "post_three" : "post_two";
        
		tinyMCE.execCommand("mceRemoveControl", true, pn);
        tinyMCE.settings.theme_advanced_blockformats = "p,blockquote,h1,h2,h3,h4,h5,h6",
		tinyMCE.settings.theme_advanced_buttons1 = "bold,italic,underline,strikethrough,separator,formatselect,separator,bullist,numlist,separator,image,link,unlink,pagebreak,separator,spellchecker,separator,code,undo,redo",
		tinyMCE.settings.pagebreak_separator = "[[MORE]]",
        tinyMCE.settings.theme_advanced_statusbar_location = "bottom",
        tinyMCE.execCommand("mceAddControl", true, pn);	
	};
	setTimeout(function(){
		var script = document.createElement('script');
		script.appendChild(document.createTextNode('('+ main + ') ();'));
		(document.body || document.head || document.documentElement).appendChild(script);
	}, 1000);
}) ();