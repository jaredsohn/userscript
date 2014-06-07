// ==UserScript==
// @name		Last.fm Clickable Username and Avatar
// @namespace	http://straylight.cz/userscripts/
// @description	Makes username and avatar on user page clickable as in the old version of Last.fm.
// @version		7
// @updateUrl https://raw.github.com/gist/3370656/clickable_username_avatar.user.js
// @screenshot http://s3.amazonaws.com/uso_ss/1839/large.png
// @homepage http://userscripts.org/scripts/show/30447
// @domain www.last.fm
// @domain www.lastfm.de
// @domain www.lastfm.es
// @domain www.lastfm.fr
// @domain www.lastfm.it
// @domain www.lastfm.jp
// @domain www.lastfm.pl
// @domain www.lastfm.com.br
// @domain www.lastfm.ru
// @domain www.lastfm.se
// @domain www.lastfm.com.tr
// @domain cn.last.fm
// @include	http://*.last.fm/user/*
// @include	http://www.lastfm.tld/user/*
// @exclude	http://*.last.fm/user/*/*
// @exclude	http://www.lastfm.tld/user/*/*
// ==/UserScript==
// Changelog
// 7 (2012-08-16) Fix domain info
// 6 (2012-08-16) Specify domains and homepage
// 5 (2012-08-16) Remove Fx2 compatibility, fix for changes, Scriptish tags
// 0.4 (2008-07-27) Fix for changes on Last.fm site
// 0.3 (2008-07-24) Support for Firefox 2 (TODO: Drop it on December)
// 0.2 (2008-07-23) Added target for username
// 0.1 (2008-07-22) Initial version, only for avatar

(function()
{
  var userBadge = document.getElementById('userBadge');
  if(!userBadge)
   return;

  var img = userBadge.getElementsByClassName('badgeAvatar')[0];
  var heading = document.getElementsByClassName('page-head')[0].getElementsByTagName('h1')[0];
  var target = window.location.href;

  if(img)
  {
    img.innerHTML = '<a href="'+target+'">'+img.innerHTML+'</a>';
  }

  if(heading)
  {
    heading.innerHTML = '<a href="'+target+'" style="color: #000">'+heading.innerHTML+'</a>';
  }

})();
