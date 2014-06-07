// ==UserScript==
// @name           last.fm Check Friends
// @version        1.0.0
// @author         Leon_-
// @copyright      2009, Leon_-
// @licence        GNU General Public License; http://www.opensource.org/licenses/gpl-2.0.php
// @namespace      http://projects.swallow-all-lies.com/greasemonkey/namsespaces/lastfm.check.friends
// @description    Keep an eye on deleted friends
// @include        http://www.last.fm/home
// @include        http://www.lastfm.*/home
// @exclude        http://www.last.fm/home/*
// @exclude        http://www.lastfm.*/home/*
// ==/UserScript==

function CheckFriends() {
	this.username = '';
	self = this;
	
	this.init = function() {
		this.getUsername();
		
		if (self.username != '') {
			getDeletedFriends();
		}
	}
	
	this.getUsername = function() {
		var nameLink = document.getElementById('idBadgerUser').href;
		var index = nameLink.indexOf('/user/') + 6;
		
		this.username = nameLink.slice(index);
	}
	
	this.resetExFriendsCache = function(name) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://projects.swallow-all-lies.com/greasemonkey/files/lastfmCheckFriends/getter.php?action=resetExFriendsCache&username='+encodeURIComponent(name),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
				'Accept': 'text/xml'
			},
			onload: function(response) {
				// do nothing
			}
		});
	}
	
	var getDeletedFriends = function() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://projects.swallow-all-lies.com/greasemonkey/files/lastfmCheckFriends/getter.php?action=getDeletedFriendsXML&username='+encodeURIComponent(self.username),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
				'Accept': 'text/xml'
			},
			onload: function(response) {
				if (!response.responseXML) {
					var xml = (new DOMParser()).parseFromString(response.responseText, 'text/xml');
				} else {
					var xml = response.responseXML;
				}
				
				if (xml.getElementsByTagName('deletedFriend').length > 0) {
					var divMain = document.createElement('div');
					var divHead = document.createElement('div');
					var divContent = document.createElement('div');
					var divModule = document.createElement('div');
					var divModuleContent = document.createElement('div');
					var divModuleFooter = document.createElement('div');
					var h2 = document.createElement('h2');
					var spanh2 = document.createElement('span');
					var ul = document.createElement('ul');
					var span = document.createElement('span');
					var link = document.createElement('a');
					
					divMain.setAttribute('class', 'home-group');
					divMain.setAttribute('id', 'moduleDeletedFriends');
					divHead.setAttribute('class', 'home-group-header');
					divContent.setAttribute('class', 'home-group-content');
					divModule.setAttribute('class', 'cmodule first last');
					divModuleContent.setAttribute('class', 'module-content');
					divModuleFooter.setAttribute('class', 'module-footer');
					h2.setAttribute('class', 'heading');
					spanh2.setAttribute('class', 'h2Wrapper');
					ul.setAttribute('class', 'usersSmall clearit');
					span.setAttribute('class', 'moduleOptions');
					span.setAttribute('style', 'cursor: pointer;');
					
					link.addEventListener('click', function() {
						self.resetExFriendsCache(self.username);
						document.getElementById('moduleDeletedFriends').style.display = 'none';
					}, true);
					
					spanh2.innerHTML = 'Deleted Friendships ('+xml.getElementsByTagName('deletedFriend').length+')';
					link.innerHTML = 'Hide';
					
					
					for (i in xml.getElementsByTagName('deletedFriend')) {
						var li = document.createElement('li');
						var userDiv = document.createElement('div');
						var strong = document.createElement('strong');
						var a = document.createElement('a');
						var span1 = document.createElement('span');
						var img = document.createElement('img');
						var span2 = document.createElement('span');
						
						if (i == 0) li.setAttribute('class', 'first user');
						else li.setAttribute('class', 'user');
						userDiv.setAttribute('class', 'vcard ');
						a.setAttribute('class', 'url');
						span1.setAttribute('class', 'userImage');
						img.setAttribute('class', 'photo fn');
						span2.setAttribute('class', 'nickname');
						
						a.setAttribute('href', '/user/'+encodeURIComponent(xml.getElementsByTagName('deletedFriend')[i].getElementsByTagName('name')[0].firstChild.nodeValue));
						a.setAttribute('rel', 'acquaintance');
						
						img.setAttribute('src', xml.getElementsByTagName('deletedFriend')[i].getElementsByTagName('image')[0].firstChild.nodeValue);
						img.setAttribute('alt', xml.getElementsByTagName('deletedFriend')[i].getElementsByTagName('name')[0].firstChild.nodeValue);
						img.setAttribute('width', '34');
						img.setAttribute('height', '34');
						
						span2.innerHTML = xml.getElementsByTagName('deletedFriend')[i].getElementsByTagName('name')[0].firstChild.nodeValue;
						
						span1.appendChild(img);
						a.appendChild(span1);
						a.appendChild(span2);
						strong.appendChild(a);
						userDiv.appendChild(strong);
						li.appendChild(userDiv);
						ul.appendChild(li);
						
						img = span1 = span2 = a = strong = userDiv = li = null;
					}
					
					h2.appendChild(spanh2);
					divHead.appendChild(h2);
					
					divModuleContent.appendChild(ul);
					span.appendChild(link);
					divModuleFooter.appendChild(span);
					
					divModule.appendChild(divModuleContent);
					divModule.appendChild(divModuleFooter);
					divContent.appendChild(divModule);
					
					divMain.appendChild(divHead);
					divMain.appendChild(divContent);
					document.getElementsByClassName('leftColWrapper')[0].insertBefore(divMain, document.getElementsByClassName('leftColWrapper')[0].firstChild.nextSibling.nextSibling.nextSibling);
				}
			}
		});
	}
}

checkFriends = new CheckFriends();
checkFriends.init();