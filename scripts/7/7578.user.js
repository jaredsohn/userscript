// ==UserScript==
// @name              Homepage
// @namespace        Unknown
// @description       Homepage
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://img441.imageshack.us/img441/5168/untitledup2.jpg) center repeat-y #000!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#000000!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:url(http://img441.imageshack.us/img441/8296/75534054le7.jpg)#211B18!important; color:#BDBAAF!important;font-size:10px!important; padding-top:65px!important; border-bottom:0px solid #333!important}\n";
s+= "a{color:#000000!important;font-size:10px!important;text-decoration:none!important;font-weight:normal;}\n";
s+= "a:hover{background-color:#333333!important;color:#CDFF00!important;font-size:10px!important;font-weight:normal;}\n";
s+= "#topnav a{color:#838383!important;font-size:10px!important;}\n";
s+= "#topnav a:hover{color:#0099FF!important;font-size:10px!important;}\n";
s+= ".heading{height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#000000!important;font-size:10px!important;}\n";
s+= ".heading{font-size:20px!important; line-height:18px!important; letter-spacing:-1px;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#FFFFFF;color:#000;}\n";

document.getElementById('squareAd').innerHTML = '<embed style="width:435px; visibility:visible; height:270px;" allowScriptAccess="never" src="http://www.myplaylist.org/mc/mp3player.swf?config=http://www.myplaylist.org/mc/config/config_regular_noautostart_shuffle.xml&mywidth=320&myheight=270&file=http://www.myplaylist.org/loadplaylist.php?playlist=3978072" menu="false" quality="high" width="320" height="270" name="mp3player" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" border="0"/>';
html = document.body.innerHTML.replace(/Hello,/, "Hey Folks Its,"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);

