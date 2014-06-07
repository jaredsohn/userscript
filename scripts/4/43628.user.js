/* No Ads in vkontakte.ru
 * based on 'No Ads in LJ' by Serguei Trouchelle (http://trouchelle.com/)
 */

// ==UserScript==
// @name        No Ads in vkontakte.ru
// @description Remove vkontakte.ru ads
// @version     1.2
// @include     http://vkontakte.ru/*
// @include     http://vk.com/*
// ==/UserScript==

function RemoveAds() {
  var head = document.getElementsByTagName('head')[0];
  if (!head) { return; };
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = ' .ad_box, #banner1, #banner2, #left_ads { display: none ! important; }';
  head.appendChild(style);
}

function RemoveHelpLink() {
  var sidebar = document.getElementById('sideBar');
  var regexp = /<a href="http:\/\/(vkontakte.ru|vk.com){1}\/help.php\?page=target">(.*?)<\/a>/g
  sidebar.innerHTML = sidebar.innerHTML.replace(regexp, "");
}

RemoveAds();
RemoveHelpLink();

/* What's new:
    1.0    05.03.2009 Initial revision
	1.1    12.01.2010 Remove "help" link below the advertisement block
        1.2    29.06.2011 One more block was banned
*/