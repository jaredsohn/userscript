// ==UserScript==
// @name          Forum Skin - View Thread PAge - Div Space Edition
// @namespace     http://www.myspace.com/yayie
// @description   A Customize forum skin at View all Topics page only
// @include       http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewThread*
// @include       http://collect.myspace.com/index.cfm?fuseaction=messageboard.viewThread*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageboard.viewCategory*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageboard.postReply*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageBoard.previewReply*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageboard.posted*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewCategory*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageboard.postReply*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageBoard.previewReply*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageboard.posted*
// ==/UserScript==








//background code
s = "body{background:url(http://img117.imageshack.us/img117/4235/bgdsrr9.jpg) center repeat-y #679BCD!important;margin-top:-130px!important}\n";


s+= "div{background:transparent!important;}\n";




//table content
s+= "div table{background:transparent!important;}\n";

s+= "div table tr td table tr td table {background:transparent!important;border:none!important;}\n";

s+= "div table tr td table tr td table tr td table{background:white!important;border:1px solid black !important;}\n";

s+= "div table tr td table tr td table tr td table tr td{background:white!important;}\n";





//style the qoutes
s+= "div td td td td td td p {padding:5px; border:1px black solid; background-color:white!important; }\n";








//hide bottom links
s+= "#msft{display:none!important;}\n";

//hide send mail and instant messages (classifiedstext)
s+= ".classifiedstext{display:none!important;}\n";



//navbar box
s+= ".navbar{background:transparent!important; color:#FFFFFF!important; padding-top:55px!important;}\n";

//typical links color
s+= "a{color:black!important;text-decoration:none!important;}\n";
s+= "a:visited{color:black!important;text-decoration:none!important;}\n";
s+= "a:hover{color:silver!important;}\n";
s+= "a:hover img {-moz-opacity:.5;opacity:.5;border:none!important;}\n";
s+= "a img{border:none!important;}\n";




































GM_addStyle(s);
