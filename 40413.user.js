// ==UserScript==
// @name           PureTNA Avatar Image URL Path Cleaner
// @author         DODeath
// @date           2009-01-12
// @namespace      http://www.userscripts.org
// @description    Cleans Avatar Image URL Paths for *puretna.com/*.  For
//                 example, http://pic.puretna.com/fetchavatar.php?img=2293650_\
//                 tanya_hansen_02.jpg will be re-written to http://pic.puretna\
//                 .com/avatar/full/2293650_tanya_hansen_02.jpg.  This increases
//                 compatibility with scripts like DownThemAll (DTA OneClick).
// @include        *puretna.com/*
// ==/UserScript==
// version 20090112
// first public release

(function() {
  var imgs = document.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; ++i)
    if (imgs[i].src.match(/.fetchavatar.php.img./))
      imgs[i].src = imgs[i].src.replace('fetchavatar.php?img=', 'avatar/full/');
 })();

