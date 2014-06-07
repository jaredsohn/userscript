// ==UserScript==
// @name        Facebook Feed
// @namespace   http://promwand.com
// @include     *www.facebook.com*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @version     1.0
// ==/UserScript==

var imgSrc = 'http://s9.postimage.org/a898drt0r/04_rss.png'
var str=$("html").html();
var patt=/profile_id":([0-9]*),/g;

var profilId=patt.exec(str);
var rssLink = '<a href="http://www.facebook.com/feeds/page.php?format=atom10&id='+profilId[1]+'"> Atom </a>';
var atomLink = '<a href="http://www.facebook.com/feeds/page.php?format=rss20&id='+profilId[1]+'"> RSS </a>';

var wstrzyk = '<div id="promwand-facebook-feed" style="font-size:10px;"><img src="' + imgSrc + '" />' + rssLink + atomLink + '</div>'
//$('#pagelet_timeline_nav').before(wstrzyk);
$('span[itemprop="name"]').after(wstrzyk);
