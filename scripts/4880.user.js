// ==UserScript==
// @name          Freedivs home
// @namespace     edited from joyboner.com
// @description	  Custom Homepage Styles
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://xs304.xs.to/xs304/06302/bghh03.gif) center repeat-y #FFF!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#FFF!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#07F9C9!important; color:#afcd1d!important; padding-top:55px!important;}\n";
s+= "a{color:#107D67!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#07F9C9!important;}\n";
s+= "#topnav a{color:#1A0AB6!important;}\n";
s+= "#topnav a:hover{color:silver!important;}\n";
s+= ".heading{border-bottom: 1px solid #FFF!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#107D67!important;}\n";
s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:-1px;}\n";
s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2{padding-left:5px;border-left:10px solid;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#3000FF;color:#FFF;}\n";

document.getElementById('squareAd').innerHTML = '<a href="http://groups.myspace.com/index.cfm?fuseaction=groups.groupProfile&groupID=101405915"><img src="http://xs304.xs.to/xs304/06302/jbdlogo.jpg"/></a>';
html = document.body.innerHTML.replace(/Hello,/, "Wassup!!"); 
document.body.innerHTML = html;
html = document.body.innerHTML.replace(/My Bulletin Space/, "Some Crap"); 
document.body.innerHTML = html;
html = document.body.innerHTML.replace(/My Friend Space/, "My Homies"); 
document.body.innerHTML = html;
html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "http://collect.myspace.com/index.cfm?fuseaction=messageboard.viewCategory&groupID=101405915"); 
ifrm.style.width = 830+"px";
ifrm.style.height = 480+"px";
ifrm.style.display="inline";
ifrm.style.position="relative";
ifrm.style.top = 1000+"px"; // make this higher to move further down
document.body.style.marginBottom=10+"px";
document.getElementById('body').appendChild(ifrm);

GM_addStyle(s);