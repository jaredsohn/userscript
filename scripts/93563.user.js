// ==UserScript==
// @name           Fanfou Advanced Friends Page
// @namespace      http://www.ssfighter.com/ 
// @description    When visit the friend of mine page, show whether he/she is following me now.
// @include        http://fanfou.com/friends*
// ==/UserScript==

var username;
var myaddr;
var myid, mypasswd;

function getElementsByClassName(n) {
	var classElements = [], allElements = document.getElementsByTagName('*');
	for (var i=0; i< allElements.length; i++ )
	{
		if (allElements[i].className == n ) {
			classElements[classElements.length] = allElements[i];
		}
	}
	return classElements;
}

function include(arr, obj) {
	for(var i=0; i < arr.length; i++) {
		if (arr[i].textContent == obj) return true;
	}
	return false;
}

var windowhref = window.location.href;
var delimStr = windowhref.split('/');
var i = delimStr.length - 1;
if (delimStr[i] == '')
	i --;

var lifinder = document.getElementById('nav-finder');
var myidhref = lifinder.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
var myid = myidhref.substring(myidhref.indexOf('fanfou.com/') + 11, myidhref.indexOf('">'));

var patrn = /^p.[0-9]+$/
if (patrn.exec(delimStr[i]))
{
	// Page 2,3,4...
	if ((delimStr[i - 1] != 'friends') && (delimStr[i - 1] != myid))
		return;
}

if ((delimStr[i] != myid) && (delimStr[i] != 'friends') && (!patrn.exec(delimStr[i])))
{
	// Not my following page, just return	
	return;
}

// Get my id and password

myid = decodeURI(myid);
var friends = document.getElementsByClassName('name');
var relationElement;

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://api.fanfou.com/followers/ids.xml?id='+myid,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		//'Authorization':'Basic ' + base64string,
		},
	onload: function parseMyname(responseDetails) {

		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,
			"application/xml");
		var userids = dom.getElementsByTagName('id');

		for (i = 0; i < friends.length; i++)
		{
			friendid = decodeURI(friends[i].toString().split('/').pop());

			relationElement = document.createElement('span');
			relationElement.setAttribute('id', 'relation');
			if (include(userids, friendid) == true)
			{
				relationElement.innerHTML = '在关注我';
				relationElement.setAttribute('style', 'padding-left: 15px');
			}
			else
			{
				relationElement.innerHTML = '没有关注我';
				relationElement.setAttribute('style', 'padding-left: 15px; font-weight: bold');
			}

			friends[i].parentNode.insertBefore(relationElement, friends[i].nextSibling);
		}
	}
});
