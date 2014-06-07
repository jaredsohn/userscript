// ==UserScript==
// @name		Last.fm Full Size Avatar Image
// @namespace	http://userscripts.org/users/500287
// @description	getting a full-size avatar image by clicking on it
// @version		1
// @updateUrl 
// @screenshot 
// @homepage http://userscripts.org/scripts/show/155391
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
// ...

(function()
{
  var userBadge = document.getElementById('userBadge');
  if(!userBadge)
   return;
  
  userBadge.getElementsByClassName('photo')[0].onclick=function()
    {
    var strURL = userBadge.getElementsByClassName('photo')[0].src;
    var imgName = strURL.substr(strURL.lastIndexOf("/")+1,strURL.length);
    var imgURL = "http://userserve-ak.last.fm/serve/_/" + imgName;

    myWindow=window.open("'" + imgURL + "'",'_blank');
    myWindow.document.write("<p><img src='" + imgURL  + "'></p>");
    myWindow.focus();
    };

})();