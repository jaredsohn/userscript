// ==UserScript==
// @name              JoyBoner Homepages (HH02)
// @namespace         joyboner.com / r4wr.com
// @description       JoyBoner Homepages (HH02)
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background-image:url(http://img.photobucket.com/albums/v670/acidz_nightmares/Goodnight__Snow_White.jpg); background-attachment:fixed; background-repeat: 0; background-position: topcenter%; background-color:black;}\n";

s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";

s+= "div, table, tr, td, .heading{color:blue!important; background-color:transparent!important;border:0px!important;}\n";

s+= "#topnav{background:blue!important; color:blue!important; padding-top:55px!important;}\n";

s+= "a{color:blue!important;text-decoration:none!important;}\n";

s+= "a:hover{color:blue!important;}\n";

s+= "#topnav a{color:blue!important;}\n";

s+= "#topnav a:hover{color:blue!important;}\n";

s+= ".heading{border-bottom: 1px solid #blue!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";

s+= "#home_infoBar span, strong span{color:blue!important;}\n";

s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:-1px;}\n";

s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2{padding-left:5px;border-left:10px dashed;}\n";

s+= "#home_infoBar{position:relative;left:6px;}\n";

s+= "#main{min-height:0!important;height:0px!important}\n";

s+= ".indicator span {color:blue!important;}\n";

s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";

s+= "*::-moz-selection{background:blue;color:blue;}\n";


document.getElementById('squareAd').innerHTML = '<a href="http://myspace-800.vo.llnwd.net/01495/00/83/1495833800_l.jpg"/></a>';
html = document.body.innerHTML.replace(/hello,/, "Fucking,"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Leave');
document.body.innerHTML = html;

GM_addStyle(s);