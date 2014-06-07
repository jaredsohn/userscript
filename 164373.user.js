// ==UserScript==
// @name        Sheep Mailchecker
// @namespace   what?
// @include     http://*.*
// @include     https://*.*
// @version     3
// @grant       none
// ==/UserScript==

var user    = ''; // IMAP user
var pass    = ''; // IMAP password
var server  = ''; // Server URL, e.g. "subdomain.domain.tld:port"

// -- FROM NOW ON NO MORE EDITING!!! -- //

var url  = location.href;
var url = url.split('/');
var url = url[0] + url[1] + '//' + url[2];

if (document.getElementById('sitmc') == null) {
	var div = document.createElement('div');
	div.setAttribute('id' , 'sitmc');
	document.getElementsByTagName('body')[0].appendChild(div);
}

document.getElementById('sitmc').innerHTML = '';

var div = document.createElement('div');
div.style.position = 'fixed';
div.style.top = '10px';
div.style.textAlign = 'left';
div.style.right = '10px';
div.style.width = '500px';
// div.style.background = '#000000';
div.style.color = '#FFFFFF';
div.style.zIndex = 1000;
div.setAttribute ('id' , 'msu');
document.getElementById('sitmc').appendChild(div);

var xhr = new XMLHttpRequest();

xhr.open('OPTIONS' , 'http://sheep-it.net/tools/imap/imap.php' , true);
xhr.setRequestHeader('Host' , '*');
xhr.setRequestHeader('Access-Control-Request-Method' , 'POST, GET, OPTIONS');
xhr.setRequestHeader('Origin' , '*');
xhr.setRequestHeader('Access-Control-Request-Headers' , 'x-requested-with');
xhr.send();

var xhr2 = new XMLHttpRequest();

xhr2.open('POST' , 'http://sheep-it.net/tools/imap/imap.php' , true);
xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
xhr2.send('user=' + user + '&pass=' + pass + '&url=' + url + '&server=' + server);

xhr2.onreadystatechange = function() {
	if (xhr2.readyState == 4 && xhr2.status == 200) {
		document.getElementById('msu').innerHTML = xhr2.responseText;
	}
}