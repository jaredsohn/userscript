// ==UserScript==
// @id             rakakafbtwittercrapremoval
// @name           Rakaka fb/twitter crap removal
// @version        0.23
// @author         dvr
// @description    Removes shit.
// @include        http://rakaka.se/*
// @include        http://*.rakaka.se/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/112788.user.js
// ==/UserScript==

var node = document.evaluate('//ul[@id="n_menu_dropdown"]/li[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

node.style.display='none';

var sep_full = document.getElementsByClassName('n_sep_full')[0]
  , content_middle = document.getElementById('n_content_middle')
  , content = document.getElementById('n_content')
  , contain = document.getElementById('n_contain')
  , header_menu = document.getElementById('n_header_menu');
	
sep_full.style.display='none';
content_middle.style.display='none';
content.style.width='832px';
contain.style.width='857px';
header_menu.style.width='590px';