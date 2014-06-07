// ==UserScript==
// @name			pritch & bbcity's tinyMCE for tumblr v0.08
// @author			Ben
// @namespace		com.curlyben.tumblr
// @description		Single-spacing, superscript, subscript and underlining. I just wanted a superscript button.
// @include        	http://www.tumblr.com/*new/text
// @include        	http://www.tumblr.com/*new/photo
// @include        	http://www.tumblr.com/*new/quote
// @include        	http://www.tumblr.com/*new/link
// @include        	http://www.tumblr.com/*new/audio
// @include        	http://www.tumblr.com/*new/video
// @include        	http://www.tumblr.com/edit/*
// @include        	http://www.tumblr.com/javascript/tiny_mce_3_2/plugins/template/template.htm

// ==/UserScript==

(function () {	
	function main() {
		var simga = "http://rails.bencharnock.com/images/doublespace.gif";
		var simgb = "http://rails.bencharnock.com/images/singlespace.gif";
		window.singlespaced = false;
		// is link post ?
		var ep = document.forms["edit_post"];
		ep = (ep) ? ep.className == "link_post" : false;
		var pn = (ep) ? "post_three" : "post_two";
		tinyMCE.execCommand("mceRemoveControl", true, pn);
		tinyMCE.settings.setup = function(e){
			e.addButton("spacing", {
				title:"desc",
				image:simga, 
				onclick:function(){
					tinyMCE.execCommand("mceRemoveControl", true, pn);
					if (window.singlespaced) {
						tinyMCE.settings.force_p_newlines = true;
						tinyMCE.settings.force_br_newlines = false;
						tinyMCE.settings.forced_root_block = 'P';
					} else {
						tinyMCE.settings.force_p_newlines = false;
						tinyMCE.settings.force_br_newlines = true;
						tinyMCE.settings.forced_root_block = '';
					}
					tinyMCE.execCommand("mceAddControl", true, pn);
					window.singlespaced = !window.singlespaced;
					$(pn + "_spacing").firstChild.src = window.singlespaced ? simgb : simga;
				}});
		};
		tinyMCE.settings.theme_advanced_buttons1 = "spacing,seperator,bold,italic,strikethrough,underline,separator,bullist,numlist,separator,blockquote,separator,image,link,unlink,separator,spellchecker,separator,pagebreak,separator,code,seperator,sub,sup";
		tinyMCE.execCommand("mceAddControl", true, pn);	
	};
	setTimeout(function(){
		var script = document.createElement('script');
		script.appendChild(document.createTextNode('('+ main + ') ();'));
		(document.body || document.head || document.documentElement).appendChild(script);
	}, 2000);
}) ();