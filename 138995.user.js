// ==UserScript==
// @name        PBS Show 100
// @namespace   http://obscur.us
// @description Rewrite links to older Daily Digests to display 100 books per page.
// @include     http://www.paperbackswap.com/members/daily_emails/digest_alpha.php*
// @version     1
// ==/UserScript==
(function(){
  links = document.getElementsByTagName('A');
  for (i=0; i<links.length; i++) {
    link = links[i];
    if (link.href.match("/digest_alpha\.php")) {
      link.href = link.href + "&l=100";
    }
  } 
})();
