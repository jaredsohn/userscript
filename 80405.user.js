// ==UserScript==
// @name           login
// @namespace      login
// @description    автологин)
// @author         http://lockerztalk.ru/member4128.html , добавьте репы, если понравилось!
// @copyright      s12307, 2010
// @version        1.1
// @include        http://overheat.cn/ptzplace/redeem
// @include        http://ptzplace.lockerz.com/*
// @include        http://ptzplace.lockerzclub.info/*
// ==/UserScript==

var values = ["mouse5353@mail.ru", "53mouse"]; $("input").each(function(i){ $(this).val(values[i]); }); doLogin();
}