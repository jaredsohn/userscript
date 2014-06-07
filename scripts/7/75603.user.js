// Hello World! example user script
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Russian openid-realselector
// @namespace     http://movister.ru/signin/
// @description   Adds Russian-known OpenID providers to openid-realselector
// @include       http://movister.ru/signin/*
// ==/UserScript==

function main ()
{
  var oldOpenid = $.fn.openid;
  $.fn.openid = function(opt)
  {
    alert(opt);
    oldOpenid(opt);
  }
$(this.oForm).openid({buttonsContainer:'#openid_btns',inputareaContainer:'#openid_inputarea',inputName:'',withUrls:true});
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);