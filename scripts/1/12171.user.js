// ==UserScript==
// @name           Zooomr Buddy Icon Reply
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Add a reply link to each comment which will generate the buddy icon code or bold username code in the add post textarea on Zooomr. This is a port of doc18's Flickr Buddy Icon Reply script (http://flickr.com/groups/flickrhacks/discuss/72157594482547285/).
// @include        http://*.zooomr.com/groups/*/discuss/*
// ==/UserScript==
/* 

History
--------
2007.09.11 - v1.0 First Release

*/

(function() {

	// -----------------------------------------------------------------------
	// This is a Zooomr port of the FlickrLocalisation script (details below)
	// -----------------------------------------------------------------------
	
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


	var ZooomrLocaliser = function(locals) {
		this.init(locals);
	}
	ZooomrLocaliser.prototype = {
		selectedLang: undefined,
		localisations: undefined,
		getLanguage: function() {
			if(!this.selectedLang) {
				var htmlDoc = document.evaluate(
					"//html[@lang]"
					, document
					,null
					,XPathResult.FIRST_ORDERED_NODE_TYPE
					,null).singleNodeValue;
				if (htmlDoc.lang) {
					this.selectedLang = htmlDoc.lang;
					return this.selectedLang;
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

	/***************************** Zooomr Localisation**********************/

	var localiser = new ZooomrLocaliser({
			'en' : {
				'name_reply' : 'Name Reply',
				'icon_reply' : 'Icon Reply'
			},
			'fr-fr' : {
				'name_reply' : 'R&eacute;pondre avec le nom',
				'icon_reply' : 'R&eacute;pondre avec l\'icone'
			},
			'pt-br' : {
				'name_reply' : 'Responder com o nome',
				'icon_reply' : 'Responder com o &iacute;cone'
			},
			'it' : {
				'name_reply' : 'Rispondere con il nome',
				'icon_reply' : 'Rispondere con l\'icone'
			},
			defaultLang: 'en'
		});	
	
	// Get textarea object - assumes it's the first one found
	var textAreas, textAreaPost
	textAreas = document.getElementsByTagName('textarea');
	textAreaPost = textAreas[0];
	
	function tagIt (tagOpen,tagClose) {
		var v = textAreaPost.value;
		var selLength = textAreaPost.textLength;
		var selStart = textAreaPost.selectionStart;
		var selEnd = textAreaPost.selectionEnd;
		if (selEnd==1 || selEnd==2) selEnd=selLength;
		var start = (v).substring(0,selStart);
		var middle = (v).substring(selStart, selEnd)
			var end = (v).substring(selEnd, selLength);
		textAreaPost.value = start + tagOpen + middle + tagClose + end;
	
		textAreaPost.selectionStart = textAreaPost.value.length;
		textAreaPost.selectionEnd = textAreaPost.value.length;
		textAreaPost.focus();
	}


	function imgItAuto (imgSRC, username) {
		if (imgSRC != null) {
			tagIt('<img src="' + imgSRC + '" height="25" width="25" title="' + username + '"> ','');
		}
	}
	
	function usernameItAuto (username) {
		if (username != null) {
			tagIt('<b>'+ username +'</b> ','');
		}
	}
	
	
	var navDiv = document.evaluate(
		'//div[@id="navcell"]'
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		, null);
	var yourURL = navDiv.snapshotItem(0).getElementsByTagName('a')[1].href;
	//GM_log('Your URL: ' + yourURL);
		
	var postTab, posts, who;
	
	// Grab the posts
	posts = document.evaluate(
		'//table[@class="topic"]/tbody/tr[@class="post"]'
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		, null);

	for (var i = 0; i < posts.snapshotLength; i++) {
		who = posts.snapshotItem(i);
		var imgSrc = (who.getElementsByTagName('td')[0]).getElementsByTagName('img')[0].src;
		var userName = (who.getElementsByTagName('td')[1]).getElementsByTagName('a')[0].innerHTML;
		var userURL = (who.getElementsByTagName('td')[1]).getElementsByTagName('a')[0].href;
		
		if (userURL != yourURL) {
			var elePostHeader = who.getElementsByTagName('ul')[0];
	
			var listItem = elePostHeader.appendChild(document.createElement('li'));
			listItem.setAttribute('class','Star');
	
			var nameA = listItem.appendChild(document.createElement('a'));
			nameA.href='javascript:;';		
			nameA.innerHTML = localiser.localise('name_reply');
			nameA.setAttribute('class','smalllink_dblue');
			nameA.addEventListener('click',
								   (function(a) { return function(){usernameItAuto(a)};})(userName),false);
								   
			listItem = elePostHeader.appendChild(document.createElement('li'));
			listItem.setAttribute('class','Star');
			var iconA = listItem.appendChild(document.createElement('a'));
			iconA.href='javascript:;';
			iconA.innerHTML = localiser.localise('icon_reply');
			iconA.setAttribute('class','smalllink_dblue');
			iconA.addEventListener('click',(function(a,b) {return function() {imgItAuto(a,b)};})(imgSrc,userName),false);
		}
	}

})()