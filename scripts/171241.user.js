// ==UserScript==
// @name           CBC - Clickable Avatar
// @namespace      TnB/CBC
// @description    Clickable Avatar for CBC
// @author         Titties and Beer
// @copyright      Titties and Beer 2013
// @include        http://casualbananas.com/*
// @include        http://www.casualbananas.com/*
// @version        1.0.0
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$("span.avatar").wrap('<a href="http://casualbananas.com/forums/member.php?action=profile"></a>');
