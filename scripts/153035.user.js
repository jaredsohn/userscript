// ==UserScript==
// @name          F64 Voting Link
// @description	Add a Vote link below posts in F64
// @namespace     http://www.flickr.com/joshjohnson
// @version       v1.0
// @include       http://*flickr.com/*
// @exclude       http://*flickr.com/messages_write.gne*
// ==/UserScript==

// v1.0 adapted from Flickr Buddy Icon Reply script (http://userscripts.org/scripts/show/87052) by Josh Johnson (Josh_Wolf)

(function() {

	textareas = document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	textArray = new Array();
	messageIndex = 0;

	function tagIt (tagOpen,tagClose,i) {
		var v = textArray[i].value;
		var selLength = textArray[i].textLength;
		var selStart = textArray[i].selectionStart;
		var selEnd = textArray[i].selectionEnd;
		if (selEnd==1 || selEnd==2) selEnd=selLength;
		var start = (v).substring(0,selStart);
		var middle = (v).substring(selStart, selEnd)
		var end = (v).substring(selEnd, selLength);
		textArray[i].value = start + tagOpen + middle + tagClose + end;
	
		textArray[i].selectionStart = textArray[i].value.length;
		textArray[i].selectionEnd = textArray[i].value.length;
		textArray[i].focus();
	}
	
	function voteItAuto(username, i) {
		if (username != null) {
			tagIt('VOTE: ' + username,'',i);
		}
	}

	//FlickrLocalisation, script to help localise user script for Flickr
	//version 0.2
	//release 26 Jun 2007
	//author: Pierre Andrews

	// --------------------------------------------------------------------
	// Copyright (C) 2007 Pierre Andrews
	// This script can be redistributed under the terms of the GNU LGPL, without
	// modification of this licence and copyright notice. Attribution to the author should be
	// kept at least in the source of the scripts.
	// For reference: http://6v8.gamboni.org/Localising-Flickr-Greasemonkey.html
	// 
	// This program is free software; you can redistribute it and/or
	// modify it under the terms of the GNU Lesser General Public License
	// as published by the Free Software Foundation; 
	// 
	// This program is distributed in the hope that it will be useful,
	// but WITHOUT ANY WARRANTY; without even the implied warranty of
	// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	// GNU General Public License for more details.
	// 
	// The GNU Lesser General Public License is available by visiting
	//   http://www.gnu.org/copyleft/lgpl.html
	// or by writing to
	//   Free Software Foundation, Inc.
	//   51 Franklin Street, Fifth Floor
	//   Boston, MA  02110-1301
	//   USA


	var FlickrLocaliser = function(locals) {
		this.init(locals);
	}
	FlickrLocaliser.prototype = {
		selectedLang: undefined,
		localisations: undefined,
		getLanguage: function() {
			if(!this.selectedLang) {
				var langA = document.evaluate(
								 "//p[@class='LanguageSelector']//a[contains(@class,'selected')]",
								 document,
								 null,
								 XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
                if (!langA) { // new photo page layout
                    var langA = document.evaluate(
                                "//div[@id='foot-lang']//a[contains(@class,'selected')]",
                                document,
                                null,
                                XPathResult.FIRST_ORDERED_NODE_TYPE, null
                                ).singleNodeValue;
                }
				if(langA) {
					var matches = /\/change_language.gne\?lang=([^&]+)&.*/.exec(langA.href);
					if(matches && matches[1]) {
						this.selectedLang = matches[1];
						return this.selectedLang;
					}
				}
				return false;
			} else return this.selectedLang;
		},

		init: function(locals) {
			this.localisations = locals;
		},

		localise: function(string, params) {
			if(this.localisations && this.getLanguage()) {
				var currentLang = this.localisations[this.selectedLang];
				if(!currentLang) currentLang = this.localisations[this.localisations.defaultLang];
				var local = currentLang[string];
				if(!local) {
					local = this.localisations[this.localisations.defaultLang][string];
				} 
				if(!local) return string;
				for(arg in params) {
					var rep = new RegExp('@'+arg+'@','g');
					local = local.replace(rep,params[arg]);
				}
				local =local.replace(/@[^@]+@/g,'');
				return local;
			} else return undefined;
		}

	}

	/*****************************Flickr Localisation**********************/


	var localiser = new FlickrLocaliser({
			'en-us' : {
				'vote': 'Vote',
			},
			'fr-fr' : {
				'vote': 'Voter',
			},
			'pt-br' : {
				'vote': 'Votar',
			},
			'it-it' : {
				'vote': 'Votare',
			},
			'es-us' : {
				'vote': 'Votar',
			},
			defaultLang: 'en-us'
		});

	for (i=0; i<textareas.snapshotLength; i++) {
		textArray[i] = textareas.snapshotItem(i);
		//GM_log('doc18' + textArray[i].parentNode.innerHTML);
		if (textArray[i].name == 'message') {
			messageIndex = i;
			//GM_log('doc18 > textarea index' + messageIndex);
		}
	}

	//Test for layouts
	//original style layout
	comments = document.evaluate("//td[@class='Who']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var el = 'td';
    	var pageLayout = 1;

	//2nd style layout (upto 2010)
	if (comments.snapshotLength == 0) {
		comments = document.evaluate("//div[contains(@class,'Who')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null),
			el = 'div';
		pageLayout = 2;
	}

	//Special gallery style layout
	if (comments.snapshotLength == 0) {
		comments = document.evaluate("//td[contains(@class,'HeyBuddy')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null),
			el = 'td';
		pageLayout = 3;
	}

	// 2010 proposed new photo page layout
	if (comments.snapshotLength == 0) { 
        	comments = document.evaluate("//li[contains(@class,'comment-block')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null),
        	el = 'div';
        	pageLayout = 4;
    	}

	for (i=0; i< comments.snapshotLength; i++) {
		processComment(comments.snapshotItem(i));
	}
	document.getElementById("comments").addEventListener('DOMNodeInserted', checkAndProcess, true);
	
	function checkAndProcess (arg) {
		if (arg.target.tagName == 'OL') {
			textareas = document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			textArray = new Array();
			messageIndex = 0;
			for (i=0; i<textareas.snapshotLength; i++) {
				textArray[i] = textareas.snapshotItem(i);
				//GM_log('doc18' + textArray[i].parentNode.innerHTML);
				if (textArray[i].name == 'message') {
					messageIndex = i;
					//GM_log('doc18 > textarea index' + messageIndex);
				}
			}
			list = arg.target.getElementsByTagName('li');
			for (var j=0; j < list.length; j++) {
				processComment(list[j]);
			}
		}
	}
	
	function processComment(commentBlock) {
		if (pageLayout == 4) {
        	said = document.evaluate(".//div[contains(@class,'comment-content')]", commentBlock, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        	img = document.evaluate(".//img[contains(@class,'comment-buddy-icon')]", commentBlock, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (img.getAttribute('data-defer-src')) {
				imgSrc = img.getAttribute('data-defer-src');
			} else {
				imgSrc = img.getAttribute('src');
			}
        	small = document.evaluate(".//span[contains(@class,'comment-controls')]", commentBlock, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        	permalink = document.evaluate(".//a[contains(@class,'comment-delete')]", said, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        	h4 = document.evaluate(".//span[contains(@class,'comment-owner')]", said, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        } else {
			var who = commentBlock;
			var said = who.parentNode.getElementsByTagName(el)[1];
			var imgSrc = who.getElementsByTagName('img')[0].src;
    		var small = said.getElementsByTagName('small')[0];
    		var permalink = small.getElementsByTagName('a')[0];
	    	var h4 = said.getElementsByTagName('h4')[0];
       	}
		if (h4) {
			var username;
			var userpath;
			if (h4.getElementsByTagName('a').length > 0) {
				username = h4.getElementsByTagName('a')[0].textContent;
				userpath = h4.getElementsByTagName('a')[0].href;
			}
			else {
				username = h4.getElementsByClassName('comment-author-container')[0].innerHTML.split(' <small')[0];
                                // Icon is not available for a deleted user, so no need for userpath.
				userpath = '-';
			}
			if (username == '') {
				//admin username
				username = h4.getElementsByTagName('a')[1]. textContent;	
			}
			if (userpath == '') {
				//admin user path
				userpath = h4.getElementsByTagName('a')[1]. href;	
			}
			if (pageLayout == 4) {
				var replyDiv = document.createElement("div");
				replyDiv.className = "f64-vote";
				commentBlock.appendChild(replyDiv);
				var linksP = document.createElement("p");
				linksP.className = "f64-vote-head";
				replyDiv.appendChild(linksP);
				var linksSmall = document.createElement("small");
				linksSmall.className = "f64-vote-meta";
				linksP.appendChild(linksSmall);
				linksSmall.innerHTML = '(F64 ';
				
				var voteA = linksSmall.appendChild(document.createElement('a'));
				voteA.href='javascript:;';
				voteA.innerHTML = localiser.localise('vote');
				voteA.className = 'Plain';
				voteA.addEventListener('click', (function(a,b) { return function(){voteItAuto(a,b)};})(username,messageIndex),false);

				linksSmall.appendChild(document.createTextNode(' )'));
			} else {
				small.insertBefore(document.createTextNode('F64 '),permalink);
				
				var voteA = small.insertBefore(document.createElement('a'),permalink);
				voteA.href='javascript:;';
				voteA.innerHTML = localiser.localise('vote');
				voteA.className = 'Plain';
				voteA.addEventListener('click', (function(a,b) { return function(){voteItAuto(a,b)};})(username,messageIndex),false);
				
				small.insertBefore(document.createTextNode(' | '),permalink);
			}
		}	
	}
})();