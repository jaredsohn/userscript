// ==UserScript==
// @name          View All friends Page
// @namespace     Yayie's Designs
// @description	  Custom comments Page (userScripts)
// @include       http://www.myspace.com/index.cfm?fuseaction=user.viewfriends*
// @include       http://home.myspace.com/index.cfm?fuseaction=user.viewfriends*
// @include       http://home.myspace.com/Modules/ViewFriends/FriendsView.aspx?friendID=39140266*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';


//background code
s = "body{background:url(http://i10.tinypic.com/491kmd4.jpg) center repeat-y #FFF!important;}\n";



//hide trash
s+= "#header,#msft,tipDiv,#footer,h5,a[id*='friendNameLink'],*[id*='BirthdayLabel'],img[src*='http://x.myspace.com/images/icons/birthday_icon.gif']{display:none!important;}\n";



s+= "div, table, tr, td, .heading{color:#FFF!important; background-color:transparent!important;border:0px!important;border-bottom:none!important;}\n";



//navbar box
s+= "#topnav{background:#ffffff!important; color:#000000!important; padding-top:55px!important;}\n";


s+=".navigation{;border-bottom: 1px solid #FFF!important;}\n";




s+= "#friendsDisplay a img{height:74px!important; width:90px!important;border-top:1px solid!important;border-right:1px solid!important;border-left:1px solid!important;border-bottom:20px solid!important;}\n";







//typical links color/fonts
s+= ".blacktext10{color:white!important;border-bottom: 1px solid #FFF!important;}\n";
s+= ".blacktext12{color:white!important;border-bottom: 1px solid #FFF!important;}\n";
s+= "a{color:white!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#0B4709!important;}\n";
s+= "a:hover img {-moz-opacity:.5;opacity:.5;border:none!important;}\n";
//specific link on topnav
s+= "#topnav a{color:#000000!important;}\n";
s+= "#topnav a:hover{color:silver!important;}\n";


GM_addStyle(s);
