// ==UserScript==
// @name           Rep Given UCP
// @author         Connected
// @include        http://www.hackforums.net/usercp.php
// @include        https://hackforums.net/usercp.php
// ==/UserScript==


var html = document.body.innerHTML;
html = html.replace( /Details(.*?)/g, 'Details</a>] [<a href="http://www.hackforums.net/repsgiven.php?uid=1403633">Given</a>' );
document.body.innerHTML = html;

//Change the UID to yours