// ==UserScript==
// @name           last.fm Common Friends
// @version        1.0.0
// @author         Leon_-
// @copyright      2009, Leon_-
// @licence        GNU General Public License; http://www.opensource.org/licenses/gpl-2.0.php
// @namespace      http://projects.swallow-all-lies.com/greasemonkey/namsespaces/lastfm.common.friends
// @description    Shows friends you have in common with an user on his/her profil page
// @include        http://www.last.fm/user/*
// @include        http://www.lastfm.*/user/*
// ==/UserScript==

function CommonFriends() {
	this.ownUsername = '';
	this.username = '';
	self = this;
	
	this.init = function() {
		getOwnUsername();
		getUsername();
		
		if ((self.ownUsername != self.username) && (self.ownUsername != '') && (self.username != '')) {
			getCommonFriends();
		}
	}
	
	var getOwnUsername = function() {
		var nameLink = document.getElementById('idBadgerUser').href;
		var index = nameLink.indexOf('/user/') + 6;
		
		self.ownUsername = nameLink.slice(index);
	}
	
	var getUsername = function() {
		self.username = document.getElementById('userBadge').getElementsByTagName('h1')[0].firstChild.nodeValue;
	}
	
	var getCommonFriends = function() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://projects.swallow-all-lies.com/greasemonkey/files/lastfmCommonFriends/getter.php?ownUsername='+encodeURIComponent(self.ownUsername)+'&username='+encodeURIComponent(self.username),
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
				
				if (xml.getElementsByTagName('friend').length > 0) {
					var div = document.createElement('div');
					var h2 = document.createElement('h2');
					var spanh2 = document.createElement('span');
					var ul = document.createElement('ul');
					
					div.setAttribute('class', 'module');
					h2.setAttribute('class', 'heading');
					spanh2.setAttribute('class', 'h2Wrapper');
					ul.setAttribute('class', 'usersSmall clearit');
					
					spanh2.innerHTML += 'Friends in Common ('+xml.getElementsByTagName('friend').length+')';
					
					for (i in xml.getElementsByTagName('friend')) {
						var li = document.createElement('li');
						var userDiv = document.createElement('div');
						var strong = document.createElement('strong');
						var a = document.createElement('a');
						var span1 = document.createElement('span');
						var img = document.createElement('img');
						var span2 = document.createElement('span');
						
						if (i == 0) li.setAttribute('class', 'first user friend');
						else li.setAttribute('class', 'user friend');
						userDiv.setAttribute('class', 'vcard ');
						a.setAttribute('class', 'url');
						span1.setAttribute('class', 'userImage');
						img.setAttribute('class', 'photo fn');
						span2.setAttribute('class', 'nickname');
						
						a.setAttribute('href', '/user/'+encodeURIComponent(xml.getElementsByTagName('friend')[i].getElementsByTagName('name')[0].firstChild.nodeValue));
						a.setAttribute('rel', 'acquaintance');
						
						img.setAttribute('src', xml.getElementsByTagName('friend')[i].getElementsByTagName('image')[0].firstChild.nodeValue);
						img.setAttribute('alt', xml.getElementsByTagName('friend')[i].getElementsByTagName('name')[0].firstChild.nodeValue);
						img.setAttribute('width', '34');
						img.setAttribute('height', '34');
						
						span2.innerHTML = xml.getElementsByTagName('friend')[i].getElementsByTagName('name')[0].firstChild.nodeValue;
						
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
					div.appendChild(h2);
					div.appendChild(ul);
					document.getElementsByClassName('rightCol')[0].insertBefore(div, document.getElementsByClassName('rightCol')[0].getElementsByClassName('module')[1]);
				}
			}
		});
	}
}

(new CommonFriends()).init();