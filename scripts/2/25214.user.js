// ==UserScript==
// @name           Projectw Film Arama
// @description    Projectw Film Arama
// @author         smasherz
// @version        1.0
// @include        http://www.projectw.org/
// @include        http://projectw.org/
// ==/UserScript==


var xa = location.pathname;
window.location='http://projectw.org/search.php?keywords='+xa+'&terms=any&author=&fid%5B%5D=25&sc=1&sf=titleonly&sr=topics&sk=t&sd=d&st=0&ch=300&t=0&submit=Search';