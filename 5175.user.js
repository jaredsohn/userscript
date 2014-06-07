// ==UserScript==
// @name              Griffin Corriher
// @namespace         freewebs.com/griffincorriher / r4wr.com
// @description       Griffin Corriher
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://i17.photobucket.com/albums/b80/honda1979civic/bg-1.gif) center repeat-y #830220!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#000!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:url(http://i17.photobucket.com/albums/b80/honda1979civic/bg6.gif) no-repeat; #830220!important; color:#830220!important; padding-top:65px!important;!important}\n";
s+= "a{color:white!important;text-decoration:none!important;}\n";
s+= "a:hover{color:white!important;}\n";
s+= "#topnav a{color:white!important;}\n";
s+= "#topnav a:hover{color:white!important;}\n";
s+= ".heading{height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#850000!important;}\n";
s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:-1px;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#850000;color:#FFF;}\n";

document.getElementById('squareAd').innerHTML = '<embed allowScriptAccess="never" allownetworking="internal"       src= "http://www.fileden.com/files/2006/8/5/155848/songs.swf?playlist_url=http://www.fileden.com/files/2006/8/5/155848/playlist3.xml&autoplay=true&info_button_text=Lyrics" quality="high" bgcolor="black" name="xspf_player" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="250" width="300">';
html = document.body.innerHTML.replace(/Hello,/, "Drink your Cheerwine"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;


GM_addStyle(s);

