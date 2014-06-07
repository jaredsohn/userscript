// ==UserScript==
// @name          Bacon!
// @version       0.1
// @namespace     http://forums.somethingawful.com/member.php?action=getinfo&userid=110823
// @description   redirects every link through http://bacolicio.us/
// @include       *
// ==/UserScript==
var i, ls;
ls = document.links;
for (i = 0; i < ls.length; i++) {
  ls[i].href = 'http://bacolicio.us/' + ls[i].href;
}