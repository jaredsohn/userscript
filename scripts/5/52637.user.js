// ==UserScript==
// @name           Medal
// @author         Endy
// @namespace      DeNada
// @include        http://www.erepublik.com/en/citizen/profile/*
// ==/UserScript==

var allLinks = document.getElementsByClassName('last');


    	allLinks[1].innerHTML = '<a href="http://blog.erepublik.com/ambassador-program/" target="_blank" title=""><img alt="Ambassador" src="/images/achievements/icon_achievement_ambassador_on.gif" /></a><div class="hinter"><span><p class="padded"><strong>Ambassador</strong></p><p>Represent your country (or eNation) in the real world</p></span>';