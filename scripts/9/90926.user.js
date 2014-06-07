// ==UserScript==
// @name           Allegro check all mail notification
// @namespace      localhost
// @description    Allows to check all auction to get mail notification
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://allegro.pl/myaccount/watch.php/*
// ==/UserScript==



jQuery("#listingMyAccount tr:lt(1) th:gt(6):lt(1) a").remove();
jQuery("#listingMyAccount tr:lt(1) th:gt(6):lt(1) ").append('<img id="markAllEmailNotification"  style="height:14px" onclick="jQuery(\'.mailInvert:[checked=false]\').attr(\'checked\', true);" title="Zaznacz wszystkie" alt="Zaznacz wszystkie" src="http://static.allegrostatic.pl/site_images/1/0/invert.gif">');
