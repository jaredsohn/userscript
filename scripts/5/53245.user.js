// ==UserScript==
// @name          xchat.cz - forum alert on homepage
// @version       0.3
// @description   upozorneni o novych prispevcich ve forech na uvodni strane
// @homepage      http://Kub4jz.cz

// @include			http://xchat.centrum.cz/~$*/
// @include			http://xchat.centrum.cz/%7E$*/
// @include			http://xchat.centrum.cz/~$*/index.php
// @include			http://xchat.centrum.cz/*/modchat?op=fullscreenmessage*&leftroom*
// ==/UserScript==

var refresh = 2; // interval obnovování v minutách

function check(text) {

	find = new RegExp("<strong class=\"forum_new\">([0-9]+)<\/strong>");

	if (find.test(text)) {

	  li_last = document.getElementsByClassName('last').item(0);
	  li_last.className = '';
	  li_last.style.display = 'none'; // ICQ stahovat nepotrebuju

	  txt = document.createTextNode('!!! NOVÝ !!!');
	  a = document.createElement('a');
	  a.insertBefore(txt, null);

	  a.setAttribute('href', page);

	  a.setAttribute('style', 'color: #FB3527; font-weight: bold;');

	  li = document.createElement('li');
	  li.insertBefore(a, null);
	  li.className = 'last';

	  div = document.getElementById('menu_sub');
	  ul = div.getElementsByTagName('ul').item(0);

	  ul.insertBefore(li, null);

	  window.clearTimeout(nacasovani);
	}else{
		nacasovani = window.setTimeout(ajax, (refresh * 60 * 1000), page, null);
	}
}

function ajax(page) {

  var httpRequest;

  if (typeof window.ActiveXObject != 'undefined') {
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  }
  else {
    httpRequest = new XMLHttpRequest();
  }
  httpRequest.open("GET", page, true);
  httpRequest.onreadystatechange = function () {
    processRequest(httpRequest);
  };
  httpRequest.send(null);

}

function processRequest(httpRequest) {

  if (httpRequest.readyState == 4) {

    if (httpRequest.status == 200) {
      check(httpRequest.responseText);
    }

  }
}

host = location.href.toString().split('/'.toString());

var page = location.href.replace(host[host.length-1], '');
page += 'forum/favourite.php'

ajax(page);
