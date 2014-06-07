// ==UserScript==
// @name           Fanfou Follower Status
// @namespace      http://www.ssfighter.com/ 
// @description    When visit a personal page, add a status whether he/she follows my messages to the page.
// @include        http://fanfou.com/*
// ==/UserScript==

var username;

function include(arr, obj) {
	for(var i=0; i < arr.length; i++) {
		if (arr[i].textContent == obj) return true;
	}
	return false;
}

// 这里取得该用户的id
var windowhref = window.location.href;
var userhref = windowhref.substring((windowhref.indexOf('fanfou.com/')+11), windowhref.length);
if (userhref.indexOf('/') != -1) {
	userhref = userhref.substring(0, userhref.indexOf('/'));	
}
username = decodeURI(userhref);

if (username == 'home')
	return;

// 这里取得自己的id
var lifinder = document.getElementById('nav-finder');
var myidhref = lifinder.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
var myid = myidhref.substring(myidhref.indexOf('fanfou.com/') + 11, myidhref.indexOf('">'));

// 这里从关注者列表中看自己是否在其中
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://api.fanfou.com/followers/ids.xml?id='+myid,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
	onload: function parseMyname(responseDetails) {

		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,
			"application/xml");
		var userids = dom.getElementsByTagName('id');

		var txtRelation = document.getElementById('relation');
		if (include(userids, username))
		{
			// 也在关注我
			if (txtRelation)
			{
				txtRelation.innerHTML = txtRelation.innerHTML.replace('是我关注的人', '是我关注的人，也在关注我');
			}
			else
			{
				// span id=relation不存在，需要手动创建
				var panellink = document.getElementById('panel');
				var actions = panellink.firstChild.nextSibling;
				relationElement = document.createElement('p');
				relationElement.setAttribute('id', 'relation');
				relationElement.innerHTML = '在关注我';
				panellink.appendChild(relationElement);
			}
		}
	}
});

