// ==UserScript==
// @name           Reputations given in User CP
// @author         Forsaken
// @include        http://www.leakforums.org/usercp.php
// @include        https://leakforums.org/usercp.php
// ==/UserScript==


var html = document.body.innerHTML;
html = html.replace( /Details(.*?)/g, 'Details</a>] [<a href="http://www.leakforums.org/givenrep.php?uid=27660">Given</a>' );
document.body.innerHTML = html;