// ==UserScript==
// @name         Ipernity Refer Comment
// @namespace    http://www.consulentionline.org/
// @description  Auto comment the place (on ipernity.com) where you come from.
// @include http://*ipernity.com/doc/*/*
// @include http://*ipernity.com/blog/*/*
// @include http://*ipernity.com/group/*/*
// @exclude http://*ipernity.com/doc/*/organize
// -- additional meta data --
// @version      0.94.1
// @date         2010-04-11
// @source       http://userscripts.org/scripts/show/72110
// @identifier   http://userscripts.org/scripts/source/72110.user.js
// @identifier   http://www.consulentionline.org/js/ipernityrefercomment.user.js
// @creator      greasefury (http://userscripts.org/users/64260) extending script by Roberto Ballerini, based on Flickr Refer Comment by Pierre Andrews (mortimer.pa@free.fr)
// ==/UserScript==

// version 0.93 by markus a. loisson (http://greynine.ipernity.com, http://userscripts.org/users/64260) 

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2007 Roberto Ballerini, (C) 2006 Pierre Andrews
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA

var SUC_script_num = 72110; // userscript.org script number for update checker

(function () {

	var IpernityReferComment = function() {this.init();}

	IpernityReferComment.prototype = {

		init: function() {
			if (document.referrer == "") return;
			var referrer = document.referrer;
			// alert("referrer: " + referrer);
			
			// ADD 0.9: home page resolution; 0.94 ipernity.com is personal home of current user.
			if (referrer == "http://www.ipernity.com/" || referrer == "http://ipernity.com/" || 
			referrer == "http://www.ipernity.com" || referrer == "http://ipernity.com") {
				var url = this.getCurrentUserHome();
				if (!url) url = referrer;
				this.insertComment("Seen on my home page", url );
				return;
			}
			// ADD 0.92: IpernityFox resolution; thanks Carsten
			if (referrer == "http://foto-cs.de/ipernityfox.html") {
				this.insertComment("Seen on IpernityFox", referrer);
				return;
			}

			if (referrer.indexOf('/blog/') >= 0) {
				this.insertBlogComment(referrer);
			} else if (referrer.indexOf('/doc/') >= 0) {
				if (referrer.indexOf('/in/group/') >= 0) { // 0.93: browsing through group photostream
					var theGroup = this.getGroupText(referrer,"the");
					this.insertComment('Coming from ' + theGroup + ' photostream',referrer);
				} else if (referrer.indexOf('/in/album/') >= 0) { // 0.94
					this.insertComment('Coming from <b>' + this.getAlbumHomepageName(referrer) + '</b> album photostream',referrer);
				} else if (referrer.indexOf('/album/') >= 0) { // 0.94
					this.insertComment('Coming from album <b>' + this.getPageCaption(referrer) + '</b>',referrer);
				} else {
					this.insertComment('Coming from ' + this.getUserText(referrer) + ' photostream',referrer);
				}
				// /doc/* --> a user's stream
				// /doc/*/* --> a user's shot
				// /doc/*/album/* --> a user's album
				// /doc/*/album/*/comments --> a user's album comments
				// /doc/*/album/*/comments/* --> a user's album comment
				// /doc/*/*/in/album/* --> a user's shot in a album
				// /doc/*/*/in/album/*?from=* --> same user different album
			} else if (referrer.indexOf('/user/') >= 0) { // ver 0.93: user profile page
				this.insertComment('Coming from ' + this.getUserText(referrer) + ' profile',referrer);
			} else if (referrer.indexOf('/home/') >= 0) {
				if (referrer.indexOf('/activity') >= 0) {
					this.insertComment('Seen in my account recent activity',referrer);
				} else if (referrer.substr(referrer.indexOf('/home/')).length >6) { // rivedere
					this.insertComment('Seen on ' + this.getUserText(referrer) + ' home page',referrer);
				} else {
					var url = this.getCurrentUserHome();
					if (!url) url = referrer;
					this.insertComment("Seen on my home page", url );
				}
				// /home/* --> a user's home
				// /home/*/activity --> a user's stream recent activity
				// /home/*/network --> a user's network
				// /home/*/network/0/photo --> network lastest photos
				// /home/ --> current users home
			} else if (referrer.indexOf('/explore/') >= 0) {
				this.insertExploreComment(referrer);
			} else if (referrer.indexOf('/group') >= 0) {
				if (referrer.indexOf('/discuss') >= 0) 
					this.insertComment('Seen in ' + this.getGroupText(referrer, "a") + ' discussion',referrer);
				else if (referrer.indexOf('/doc') >= 0) 
					this.insertComment('Seen in ' + this.getGroupText(referrer, "the") + ' pool', referrer);
				else
					this.insertComment('Coming from ' + this.getGroupText(referrer, "the") + ' home page',referrer);
			} else if (referrer.indexOf('/network/') >= 0) {
				this.insertNetworkComment(referrer);
			} else if (referrer.indexOf('/search/doc')>=0) {
				this.insertComment('Coming from a search',referrer);
				// /search/doc --> a search
			} else if (referrer.indexOf('/mail/view/inbox')>=0) {
				this.insertComment('Coming from a mailbox','javascript:void(0)');
				// /mail/view/inbox --> a mail message
			} else if (referrer.indexOf('/tag')>=0) {
				this.insertComment('Coming from a tag cloud',referrer);
			} else {
				//alert(referrer);
				this.insertComment("Coming from here", referrer);
			}
		},

		// 0.94: resolve Blog pages
		insertBlogComment: function(referrer) {
			var commentText = 'Coming from ' + this.getUserText(referrer) + ' blog';
			var blogEntry = this.getReferrerPart(referrer, 5);
			if (blogEntry) {
				if (this.isNumeric(blogEntry)) {
					var blogTitle = this.getPageCaption(referrer);
					if (blogTitle) {
						blogTitle = " '" + blogTitle + "'"; 
					}
					commentText += blogTitle;
				}
			}
			this.insertComment(commentText, referrer);
			// /blog/* --> a blog
			// /blog/*/* --> a blog entry
		},

		// 0.94: resolve Explore pages
		insertExploreComment: function(referrer) {
			if (referrer.indexOf('/explore/whatshot') >= 0) {
				this.insertComment('Seen in Explore / What\'s hot', referrer);
			} else if (referrer.indexOf('/explore/latest') >= 0) {
				this.insertComment('Seen in Explore / Latest publications', referrer);
			} else if (referrer.indexOf('/explore/profile') >= 0) {
				var user = this.getUserTextExtra(referrer,5);
				this.insertComment('Seen in ' + user + ' member tags', referrer);
			} else if (referrer.indexOf('/explore/keyword') >= 0) {
				this.insertComment('Seen in Explore keyword tag', referrer);
			} else {
				this.insertComment('Seen in Explore', referrer);
			}
		},

		// 0.94: resolve Network pages
		insertNetworkComment: function(referrer) {
			// only from 'own' network pages "latest docs/posts" are docs or posts directly reachable
			if (referrer.indexOf('/network/docs') >= 0) {
				this.insertComment('Seen in my network latest docs', referrer);
			} else if (referrer.indexOf('/network/posts') >= 0) {
				this.insertComment('Seen in my network latest posts', referrer);
			} else {
				this.insertComment('Seen in my network', referrer);
			}
		},

		// 0.94: retrieve user name (from user homepage) by userkey from referrer (default position)
		getUserText: function(referrer) {
 			var userKey = this.getReferrerPart(referrer, 4);
			return this.resolveUserKey(userKey);
		},

		// 0.94: retrieve user name (from user homepage) by userkey from referrer (variable postion)
		getUserTextExtra: function(referrer, posOfUserkeyInRef) {
 			var userKey = this.getReferrerPart(referrer, posOfUserkeyInRef);
			return this.resolveUserKey(userKey);
		},

		// 0.94: get the display name of the user by resolving the "userKey"
		resolveUserKey: function(userKey) {
			var user = this.getUserDisplayName(userKey);
			if (user.length != "") {
				if (user == "%me%") {
					user = 'my';
				} else {
					user = '<b>' + user + '</b>';
				}
			} else {
				if (this.isNumeric(userKey)) {
					user = 'a user\'s';
				} else {
					user = '<b>' + userKey + '</b>';
				}
			}
			return user;
		},

		// 0.94: get a part of the referrer url, eg. 'user key'
		getReferrerPart: function(referrer, referrerPartNo) {
			var result;
 			var tmp = referrer.split("/");
			if (referrerPartNo <= tmp.length) {
				if (this.isNumeric(tmp[referrerPartNo])) {
					return tmp[referrerPartNo];
				} else {
					noParams = tmp[referrerPartNo].split("?");	// 0.9: removing parameters from address
					result = noParams[0];
					noParams = result.split("|");		// 0.93: removing photostream sub-page information
					return noParams[0];
				}
			}
			return result;
		},

		// 0.94: retrieve user name (from user homepage) by userkey from referrer
		getUserDisplayName: function(userKey) {
			var userName = this.getUserHomepageName(userKey);
			// 'own' user homepage titles "Your home page" (in current language)
			// so I'm comparing it with own hompepage (www.ipernity.com) of current user.
			var iperHome = this.getIpernityHomepageName();
			if (userName == iperHome) {
				return "%me%";
			}
			return userName;
		},

		isNumeric: function(aString) {
			var ValidChars = "0123456789.";
			var isNumeric = true;
 
			for (i = 0; i < aString.length && isNumeric == true; i++) 
			{	var Char = aString.charAt(i); 
				if (ValidChars.indexOf(Char) == -1) 
				{	isNumeric = false;
				}
			}
			return isNumeric;
		},
		
		getGroupText: function(referrer, article) {
			var theGroup = this.resolveGroup(referrer);
			if (theGroup.length > 0) { 
				theGroup = article + " <b>" + theGroup +"</b> group";
			} else {
				theGroup = "a group";
			}
			return theGroup;
		},
		
		resolveGroup: function(referrer) {
			var groupKey = this.getGroupKey(referrer);
			var groupName = this.getGroupHomepageName(groupKey); // 0.94
			if (groupName != "") {
				risposta = groupName;
			} else {
				// keeping old manual group name resolution for at least one 'release'.
				switch (groupKey) {
					case '25651':
					case 'ww.wonders': risposta = 'Weekend Walk Wonderz'; break;
					case '25262':
					case 'germany': risposta = 'Germany'; break;
					case '25345':
					case 'macro': risposta = 'Macro'; break;
					case '25342':
					case 'i-central': risposta = 'i-Central'; break;
					case '25925':
					case 'geometric-abstracts': risposta = 'Geometric Abstracts'; break;
					case '25390':
					case 'nightshots': risposta = 'Night Shots'; break;
					case '25495':
					case 'absurd': risposta = '\'the Absurd\''; break;
					case '25456':
					case 'bokeh': risposta = 'Bokeh'; break;
					case '25458':
					case 'minimal': risposta = 'Less is More'; break;
					case '26080': risposta = '** PIX EDIT **'; break;
					case '25731':
					case 'groupiperdirectory': risposta = 'Ipernity Groups Directory'; break;
					case '25235':
					case 'bestoftheweek': risposta = 'Best of the Week'; break;
					case '25702':
					case 'b.w': risposta = 'B&W'; break;
					case 'blackandwhite':
					case '25279': risposta = 'Black and White'; break;
					case '27386': risposta = '* Crazy Faces *'; break;
					case '26757': risposta = 'asymetrix'; break;
					case '25962':
					case 'manipulatedreality': risposta = 'Manipulated reality'; break;
					case '25952':
					case 'metropolis': risposta = 'Metropolis'; break;
					case '25618':
					case 'flowerotica': risposta = 'Flowerotica'; break;
					case '25709':
					case 'myself': risposta = '\"me, myself and I\"'; break;
					case '25454':
					case 'strongcolors': risposta = 'Strong colors'; break;
					case '25259': risposta = 'Art libre...'; break;
					case '25542':
					case 'selfportraits': risposta = 'selfportraits'; break;
					case '25216':
					case 'architecture': risposta = 'Architecture'; break;
					case '25404':
					case 'portrait': risposta = 'Portrait'; break;
					/*0.7*/
					case '25399':
					case 'travelphoto': risposta = 'Travel Photo Forum'; break;
					case '25660':
					case 'catchy-colours': risposta = 'Catchy Colours'; break;
					case '25332':
					case 'landscape': risposta = 'Landscape'; break;
					case '25517':
					case 'fogdustmistbrouillardnebel': risposta = 'fog, dust, mist...'; break;
					case '25592':
					case 'grafitti': risposta = 'Graffiti'; break;
					case '25486': risposta = 'Animal Photos'; break;
					case '25937':
					case 'red': risposta = 'Red!'; break;
					case '25318':
					case 'streetphotography': risposta = 'Candid Street Photography'; break;
					case '25312': risposta = 'Ipernity meetings'; break;
					case '25283':
					case 'flower': risposta = 'Flowers'; break;
					case '25956':
					case 'takealook': risposta = 'Take a look!'; break;
					/* 0.8*/
					case '25280': risposta = 'Mono images'; break;
					case '25218':
					case 'sky.creative': risposta = 'Sky is creative...'; break;
					case '25392':
					case 'experiment': risposta = 'Time For Experiments'; break;
					case '25547':
					case 'woods': risposta = 'into the woods'; break;
					case '26486':
					case 'girls': risposta = 'Girls - An Ode...'; break;
					case '25936':
					case 'blue': risposta = 'Blue!'; break;
					case '28032':
					case 'light': risposta = 'Light'; break;
					/*0.9*/
					case '25479':
					case 'blackwhite': risposta= 'the B&W ';break;
					case '25589':
					case 'sony-r1': risposta = 'Sony R1'; break;
					case '26222':
					case 'tree': risposta = 'Tree'; break;
					case '26294':
					case 'illusions': risposta = 'Illusions'; break;
					case '26411':
					case 'spring': risposta = '4 Seasons - Spring'; break;
					case '26412':
					case 'summer': risposta = '4 Seasons - Summer'; break;
					case '26413':
					case 'fall': risposta = '4 Seasons - Fall'; break;
					case '26414':
					case 'winter': risposta = '4 Seasons - Winter'; break;
					case '26295':
					case 'illusionsofnature': risposta = 'Illusions of Nature'; break;
					case '25563':
					case 'clouds': risposta = 'Clouds'; break;
					case '25560':
					case 'backlighting': risposta = 'Backlighting'; break;
					case '26943':
					case 'fruits': risposta = 'Fruits and Vegetables'; break;
					case '28026':
					case 'stone': risposta = 'Stone'; break;
					case '25906':
					case 'leaves': risposta = 'Leaves'; break;
					case '25340':
					case 'dark': risposta = 'The Dark Side'; break;
					case '29054': risposta = 'One pic/One song'; break;
					case '25277':
					case 'mpph': risposta = 'mpph'; break;
					case '25734':
					case 'markart.photography': risposta = 'professional photographers'; break;
					case '29029': risposta = 'Another view of the world'; break;
					case '25314': risposta = 'chimney-roofs-walls'; break;
					case '25711': risposta = 'urban life'; break;
					case '28334':
					case 'sky-limit': risposta = 'The Sky is the Limit'; break;
					case '25840':
					case 'reflection': risposta = 'Reflection'; break;
					case '25716':
					case 'contemporaryabstracts': risposta = 'Contemporary Abstracts'; break;
					case '28209': risposta = 'Photographes Super Amateurs'; break;
					case '25260':
					case 'hdr': risposta = 'HDR'; break;
					case '28302': risposta = '* most creative *'; break;
					case '28610':
					case 'unofficialgroup': risposta = 'Unofficial Ipernity Ideas and Wish'; break;
					case '25937':
					case 'red': risposta = 'Red!'; break;
					case '25810':
					case 'praiseandcurseofthecity': risposta = 'Praise and Curse of the City'; break;
					case '26094': risposta = 'An Ocean of Blue'; break;
					case '25482': risposta = 'Sunrise - Sunset:'; break;
					/* 0.93 */
					case 'antidepressivum':
					case '56648': risposta = 'Antidepressivum'; break;
					case 'nikon-d80':
					case '25519': risposta = 'Nikon D80'; break;
					case 'mini':
					case '27398': risposta = 'Is it love? (The MINI group)'; break;
					case 'dragonfly':
					case '25447': risposta = 'dragonfly'; break;
					case 'zoomin':
					case '48082': risposta = 'Picture in Picture'; break;
					case 'beauty-through-light':
					case '59608': risposta = 'beauty through light'; break;
					case '30127': risposta = 'I want to show you this pic :)'; break;
					case '65673': risposta = 'animals, not pets'; break;
					case 'bianconero':
					case '51226': risposta = 'Bianco e Nero'; break;
					case 'cloud-is-the-color':
					case '31338': risposta = 'Cloud is the Color'; break;
					case '35917': risposta = 'Waterscapes '; break;
					case 'watercolors':
					case '25252': risposta = 'water colors...'; break;
					case 'parcs.jardins.publics':
					case '125844': risposta = 'Parks and Public Gardens to Dream ...'; break;
					case 'panorama':
					case '25298': risposta = 'Panorama'; break;
					case 'farbklecks_in_sw':
					case '26198': risposta = 'black/white & and a smudge of colour'; break;
					case 'benches':
					case '51092': risposta = 'benches'; break;
					case 'liberality':
					case '47715': risposta = 'liberality'; break;
					case 'all_churches':
					case '26870': risposta = 'All About Churches'; break;
					case 'weltskulpturen':
					case '76858': risposta = 'sculptures of the world'; break;
					case 'people':
					case '25520': risposta = 'people'; break;
					case '27700': risposta = 'Good reflection'; break;
					case 'people':
					case '25520': risposta = 'people'; break;

					default: risposta=''; break;
				}
			}
			return risposta;
		},
		
		getGroupKey: function(referrer) {
			var mySlash = referrer.indexOf('/group/') + 7;
			var myNextSlash = referrer.substr(mySlash).indexOf('/');
			if (myNextSlash <= 0) myNextSlash = referrer.substr(mySlash).indexOf('?');
			if (myNextSlash <= 0) myNextSlash = referrer.length;
			var groupKey = referrer.substr(mySlash, myNextSlash).toLowerCase();
			// alert(referrer + '\n(' + mySlash +','+ myNextSlash + ') ->\n' + groupKey);
			return groupKey;
		},
		
		// ver 0.91: sostituito font size=-2 con lo span
		insertComment: function(comment, url) {
			var html = comment;
			if(url){
				html = '<a href="'+url+'" title="Seen on ...">'+comment+'</a>';
			}
			// ver 0.93: fixed span-tag range. removed font-size since no longer allowed by ipernity. use font-family instead.
			var span = '<span style="font-family: Times, Times New Roman, Georgia, Bitstream Vera Serif, serif">';
			var endSpan = '</span>';
			html = "\n\n--\n" + span + "<i>" + html + "</i>"
			html += ' <em>(<a href="http://userscripts.org/scripts/show/72110">?</a>)</em>';
			html += endSpan;
			thisTextArea = document.evaluate(
											 "//textarea[@id='comment_content']",
											 document,
											 null,
											 XPathResult.FIRST_ORDERED_NODE_TYPE, null
											 ).singleNodeValue;
			if(thisTextArea) {
				if(thisTextArea.value.indexOf(html) < 0) 
					thisTextArea.value += html;
				thisTextArea.selectionStart = thisTextArea.selectionEnd = 0;
			}
		},

		// 0.94: retrieve album name from caption (h1) of group homepage
		getAlbumHomepageName: function(referrer) {
			var albumKey = (/(\/in\/album\/)(.*)(\?.*)?/.exec(referrer)[2]);
			var albumUrl = "http://www.ipernity.com/doc/" + this.getReferrerPart(referrer,4) + "/album/" + albumKey;
			var albumName = this.getPageCaption(albumUrl);
			return albumName;
		},
		
		// 0.94: retrieve "own" home page from menu "My Space"
		getCurrentUserHome: function() {
			var userHome;
			var mySpaceMenu = document.getElementById("mainmenu_doc");
			if (mySpaceMenu) {
				var anchor = mySpaceMenu.getElementsByTagName("a")[0];
				if (anchor) {
					userHome = anchor.getAttribute("href");
					if (userHome.indexOf('http://') != 0) {
						if (userHome.indexOf('/') != 0) {
							userHome = "/" + userHome;
						}
						userHome = "http://www.ipernity.com" + userHome;
					}
				}
			}
			return userHome;
		},
		
		// 0.94: retrieve group name from caption (h1) of group homepage
		getGroupHomepageName: function(groupKey) {
			var groupName = this.getPageCaption("http://www.ipernity.com/group/" + groupKey);
			return groupName;
		},
		
		// 0.94: retrieve user name from title of user homepage
		getUserHomepageName: function(userKey) {
			var userName = this.getPageTitle("http://www.ipernity.com/home/" + userKey);
			return userName;
		},

		// 0.94: retrieve title of ipernity homepage
		getIpernityHomepageName: function() {
			var homepageTitle = GM_getValue('RC_homepage_title', '').trim();
			var checkCounter = parseInt(GM_getValue('RC_homepage_title_reload_counter', '5'));
			if (homepageTitle == "" || checkCounter == 0) { // query page only every 10th time
				homepageTitle = this.getPageTitle("http://www.ipernity.com");
				GM_setValue('RC_homepage_title', homepageTitle);
				checkCounter = 10;
			}
			GM_setValue('RC_homepage_title_reload_counter', (checkCounter - 1) );
			return homepageTitle;
		},

		// 0.94: retrieve caption (h1) of a ipernity page
		getPageCaption: function(pageUrl) {
			try {
				var page = this.getPageSource(pageUrl);
				return (/(<h1([^<>]?)+>)([\ \t\n\r]*)?(.*)([\ \t\n\r]*)?(<\/h1([^<>]?)+>)/.exec(page)[4]);
			} catch (err) {
				GM_log("getPageCaption(): " + err);
			}
			return "";
		},

		// 0.94: retrieve title of a ipernity page (excluding leading "ipernity:")
		getPageTitle: function(pageUrl) {
			try {
				var page = this.getPageSource(pageUrl);
				return (/(<title([^<>]?)+>ipernity:)(.*)(<\/title([^<>]?)+>)/.exec(page)[3]).trim();
			} catch (err) {
				GM_log("getPageTitle(): " + err);
			}
			return "";
		},
		
		// 0.94: retrieve content of a ipernity page
		getPageSource: function(pageUrl) {
			var request = new XMLHttpRequest();
			request.open("GET", pageUrl, false);
			request.send();
			return request.responseText;
		}
	}
		
	//======================================================================
	// launch
	try {
		window.addEventListener("load", function () {
						try{ // Script Update Checker, written by Jarett [04/29/09],  http://userscripts.org/scripts/show/20145
						function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);
						}catch(err){}

						var ipernitygp = new IpernityReferComment();
		}, false);
	} catch (ex) {}
})();
