// ==UserScript==
//
// version 0.2
// 2008-11-06
// Copyright (c) 2008, Jeff Walter
// Released under the GPL license 
// http://www.gnu.org/copyleft/gpl.html 
// 
// --------------------------------------------------------
// 
// This is a Greasemonkey user script. 
// 
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script. 
// Under Tools, there will be a new menu item to "Install User Script". 
// Accept the default configuration and install. 
// 
// To uninstall, go to Tools/Manage User Scripts, 
// select "Tumblr TinyMCE Templates", and click Uninstall. 
// 
// -------------------------------------------------------- 
//
// @name           Tumblr TinyMCE Templates
// @namespace      com.jeffinmotion.tumblr
// @description    Adds the template function w/ custom template support to the TinyMCE editor in Tumblr.
// @include        http://www.tumblr.com/*new/text
// @include        http://www.tumblr.com/*new/photo
// @include        http://www.tumblr.com/*new/quote
// @include        http://www.tumblr.com/*new/link
// @include        http://www.tumblr.com/*new/audio
// @include        http://www.tumblr.com/*new/video
// @include        http://www.tumblr.com/edit/*
// @include        http://www.tumblr.com/javascript/tiny_mce_3_2/plugins/template/template.htm
//
// ==/UserScript==

GM_registerMenuCommand("Set Tumblr template URL", template_menu_url);

var menu_dialog = "Set your Tumblr TinyMCE template URL";
var currentURL = window.location.href;

function isLinkPost() {
	var ep = unsafeWindow.document.forms["edit_post"];
	return (ep) ? ep.className == "link_post" : false;
}

function isURL(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return regexp.test(s);
}

function template_menu_url() {
	var t_url = GM_getValue("tumblr_template_url", "");
	var validUrl = false;
	var s = window.prompt(menu_dialog, t_url);
	
	while(s != null && !validUrl) {
		// Validate the url
		validUrl = (s != "") ? isURL(s) : true;
		
		// If the url is valid, set it, otherwise re-ask for the url
		if(validUrl)
			GM_setValue("tumblr_template_url", s);
		else {
			alert(s + " is not a valid url. Please enter a valid one.");
			s = window.prompt(menu_dialog, t_url);
		}
	}
}

if(currentURL.indexOf("tumblr.com/javascript/tiny_mce_3_2/plugins/template/template.htm") > -1) {
	var td = unsafeWindow.TemplateDialog;
	
	td.placeTemplate = function(template, ti) {
		var d = unsafeWindow.frames['templatesrc'].document, x, tsrc = this.tsrc;
		
		d.body.innerHTML = this.templateHTML = template;

		for (x=0; x<tsrc.length; x++) {
			if (tsrc[x].title == ti)
				document.getElementById('tmpldesc').innerHTML = tsrc[x].description || '';
		}
	}
	
	td.selectTemplate = function(u, ti) {
		this.getFileContents(u, ti);
	}
	
	td.getFileContents = function(u, ti) {
		var template;
		
		// Use GM_xmlhttpRequest to get template HTML, since the normal way is blocked
		window.setTimeout(function() {
			GM_xmlhttpRequest({
				method:"GET",
				url: u,
				onload:function(result) {
					td.placeTemplate(result.responseText, ti);
				}
			});
		}, 0);
	}
}
else {
	var t_el = (isLinkPost()) ? "post_three" : "post_two";
	var templateURL = GM_getValue("tumblr_template_url", "");
	
	// Grab a reference to the tinyMCE object in the page
	var tm = (unsafeWindow.tinyMCE) ? unsafeWindow.tinyMCE : null;
	
	if(tm) {
		// Remove the old tinyMCE
		tm.execCommand("mceRemoveControl", true, t_el);
		
		// Add custom settings to the tinyMCE configuration
		tm.settings["valid_elements"] = "-p[*],-a[*],-blockquote[*],br[*],-code[*],-dd[*],-dl[*],-dt[*],-del[*],-i/em[*],-ins[*],-li[*],-ol[*],-pre[*],-q[*],-b/strong[*],-u[*],-ul[*],-s[*],script[*],img[*],hr[*],-sub[*],-sup[*],-strike[*],-h1[*],-h2[*],-h3[*],-h4[*],-h5[*],-h6[*],object[*],embed[*],param[*],-div[*],-span[*]"; 
		tm.settings["theme_advanced_buttons1"] = "bold,italic,strikethrough,separator,bullist,numlist,separator,indent,outdent,separator,image,link,unlink,separator,spellchecker,separator,template,separator,code";
		tm.settings["plugins"] = "spellchecker,safari,media,template";
		if(templateURL != null && templateURL != "")
			unsafeWindow.tinyMCE.settings["template_external_list_url"] = templateURL;
		
		// Re-create the tinyMCE control
		tm.execCommand("mceAddControl", true, t_el);
	}
	

	
}

window.addEventListener( 
	'load', 
	function() {
		// Fake out Tumblr by telling it we are not using rich text -- otherwise, additional markup will be stripped
		var rte = (isLinkPost()) ? "post_three_is_rich_text" : "post_two_is_rich_text";
		var rt = document.getElementById(rte);
		if(rt)
			rt.value = 0;
	}, 
	true
);

//
// ChangeLog
// 2008-11-06 - 0.2 - Added regular expressions on include pages to allow this script on edit post pages
//                  - Added isLinkPost method that reads form class names to determine the current page type
// 2008-11-06 - 0.1 - Flipped the is_rich_text bit on TinyMCE editor field
//                  - Added regular expressions on include pages to allow this script on group tumblelogs
// 
