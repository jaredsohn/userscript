// ==UserScript==
// @name           Post activity in User CP
// @author         Perfect Cell
// @include        http://www.hackforums.net/usercp.php
// @version		   2.0
// ==/UserScript==
 

var html = document.body.innerHTML;
html = html.replace( /Posts(.*?)/g,'<a href="http://www.hackforums.net/postactivity.php?uid=1237824">Post activity</a> | Posts ' );
document.body.innerHTML = html;

//Change the UID to yours