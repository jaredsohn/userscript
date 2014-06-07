// ==UserScript==
// @name           mahoticon.js
// @namespace      http://chars19.blogspot.com
// @description    reshow maho icon in kaskus.us, replace :maho with emoticon
// @version        0.2
// @author         emaniacs
// @license        GPL
// @updateURL      https://userscripts.org/scripts/source/62634.meta.js
// @include        http://userscripts.org/scripts/source/62634.meta.js
// @include        http://www.kaskus.us/showthread.php*
// @include        http://www.kaskus.us/member.php*	
// ==/UserScript==

// change log
// * v0.1 -> ** initial commit
// * v0.2 -> ** fixed regex.
//           ** adding support in kaskus.us/member.php

var mahoticon = {
	re: /(?:^|\s+):(maho[s]?)/gm,
	rePost: /td_post_[0-9]{1,}/,
	img: {
		'maho': '<img class="inlineimg" from="Mahoticon" src="http://static.kaskus.us/images/smilies/mahos.gif" title=":maho reborn!" />',
		'mahos': '<img class="inlineimg" from="Mahoticon" src="http://static.kaskus.us/images/smilies/s_sm_maho.gif" title=":maho reborn!" />'
	},
	trim: function (t) {
		return t.replace(/^\s*/,'').replace(/\s*$/,'');
	},
	
	getTd: function() {
		var cl = 'alt1';
		if (document.URL.match (/.*member\.php.*/)) {
			cl = 'visitor_message_body';
			mahoticon.rePost = /vmessage_text_[0-9]{1,}/;
		}
		
		return document.getElementsByClassName(cl);
	},
	reborn: function() {
		td = mahoticon.getTd();

		for (i=0; i<td.length; i++) {	
			if (td[i].id.match(mahoticon.rePost)) {
				inHTML = td[i].innerHTML;
				td[i].innerHTML = inHTML.replace(mahoticon.re, function(m,c){
					return mahoticon.img[c];
				});
			}
		};
	}
};

// get my :maho back!!
mahoticon.reborn();
