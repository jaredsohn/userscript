// ==UserScript==

// @name           Retouch Divmonster

// @namespace      Myspace.com/yayie_ali

// @description    Add mising links and fix stuff

// @include        http://divmonster.com/forum/*

// ==/UserScript==

s= 'div#wrapper {width:90%;}\n';
s+= 'body {overflow-x:hidden;}\n';
s+= 'div#logo, div#userinfo {display:none;}\n';
s+= 'div.quote {font-family:verdana!important; padding:10px!important; font-size:10px!important; background-color:#333333!important; color:white!important; border:1px solid #131311}\n';
s+= 'div.code {font-family:courier!important; padding:5px!important; font-size:12px!important; background-color:#EFEFEF!important; color:#333333!important; border:1px solid #333333}\n';
s+= 'div#header {padding-left:10px; padding-top:10px;}\n';
s+= 'div#myHeader {text-align:right; padding-right:20px; padding-top:20px;}\n';


GM_addStyle (s);



document.getElementById('header').innerHTML = '<div id="myHeader"> ' +
'<a href="http://divmonster.com/forum/index.php?action=unread">View Post Since Last Visit</a>' +
'<br>' +
'<a href="http://divmonster.com/forum/index.php?action=unreadreplies">View Your Post</a> ' +
'</div>';
