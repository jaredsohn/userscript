// ==UserScript==
// @name           OzBargain Comments Menu Link
// @version        0.2
// @namespace      http://www.jameswigley.com   
// @author         James Wigley
// @copyright      2011, James Wigley
// @include        http://www.ozbargain.com.au/*
// ==/UserScript==

var user = document.getElementById('menu-user');
user.parentNode.innerHTML += "<li><a href='" + user.getElementsByTagName('a')[0].getAttribute('href') + "/comments/'>My Comments</a></li>";
