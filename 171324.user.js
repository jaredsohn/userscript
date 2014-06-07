// ==UserScript==
// @name	Disable Mobile01 ADs
// @version	1.0
// @description	Mobile01 關掉廣告
// @author	Jason
// @namespace	http://userscripts.org/scripts/show/111
// @include	http://5i01.com/*
// @include	http://www.mobile01.com/*
// @include	https://www.mobile01.com/*
// @match	http://5i01.com/*
// @match	http://www.mobile01.com/*
// @match	https://www.mobile01.com/*
// @require        http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js
// ==/UserScript==
$('div.fb-like-box').remove();
$('div[id^="ad"]').remove(); 
$('a[href^="http://ad-"]').remove();
$('a[href^="adredir.php"]').each(function() {
  if ($(this).text() != '二手交換' &&
      $(this).text() != '入門好機' &&
      $(this).text() != '完全免費' &&
      $(this).text() != '全新未拆')
  {
 		$(this).remove(); 
  } 
});