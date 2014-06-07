// ==UserScript==
// @name       Facebook Logout Button
// @version    1.0.1
// @description  logout button on facebook in the navbar
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// @include        http*://*.facebook.tld/*
// @include        http*://facebook.tld/*
// @grant          none
// @copyright      none
// ==/UserScript==
var y = document.getElementById("pageNav");
y.innerHTML +='<li id="my_logout_button" class="navItem"><a href="#" class="fbJewel" style="padding-left: 8px; padding-right: 8px;" rel="toggle">Logout</a></li>'

var x = document.getElementById("my_logout_button");
var t = x.getElementsByTagName("a")[0];
t.setAttribute('href','#');
t.setAttribute('onclick','javascript:document.getElementById(\'logout_form\').submit();');