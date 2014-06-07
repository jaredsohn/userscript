// ==UserScript==
// @name		Loudsur13 Login V2.0
// @namespace	http://myspace.com/loudsur13
// @description	Login Page By Loudsur13
// @include	http://www.myspace.com/
// @include	http://myspace.com/
// @include	http://www.myspace.com/index.cfm?fuseaction=splash*
//@exclude	http://login.myspace.com/*

// ==/UserScript==

s = 'body {background-image:url(http://img179.imageshack.us/img179/4003/bgeo2.jpg); background-color:#000000}\n';

s+= '#wrap {position:relative; top:15px; -moz-border-radius:20px 20px 20px 20px; background-color:#FFFFFF; border:5px solid #FFFFFF; z-index:2; }\n';

s+= '#footer, span.txtRed, #ad440x160, #ad300x100, #splash_login h5, #splash_mainBottom,  #ctl00_Main_SplashDisplay_userVideos_VideoToday {display:none;}\n';

s+= '#header {background-color:transparent; height:100px; background:url(http://img150.imageshack.us/img150/2066/headingbgno5.png) top center no-repeat;}\n';
s+= '#header div {visibility:hidden;}\n';

s+= '#topnav a:link, #topnav a:active, #topnav a:visited {letter-spacing:0px; color:#8C8C8C; font-size:13px; font-weight:bold; font-family:verdana; text-transform:lowercase; letter-spacing:0px;}\n';
s+= '#topnav a:hover {color:#000000; text-decoration:none;}\n';
s+= '#topnav {height:39px; background:url(http://img150.imageshack.us/img150/5465/navbgju6.png)top center no-repeat; padding-top:7px; font-size:1px !important; color:#E5E5E5; letter-spacing:2px;}\n';
s+= '#topnav span {display:none;}\n';

s+= '#splash_music {background:url(http://img482.imageshack.us/img482/3576/splashmusicbgba0.png);}\n';
s+= '#splash_music h5 {visibility:hidden;}\n';
s+= '#splash_music span, #splash_music a {font-size:10px; font-weight:bold; color:#000000;}\n';

s+= '#ctl00_Main_SplashDisplay_music_CMS_MyspaceMusic table {background-image:none; background-color:transparent;}\n';

s+= '#splash_greybox {border:2px solid #CFCFCF;-moz-border-radius:10px 10px 10px 10px; background:url(http://img242.imageshack.us/img242/1483/greyboxbgus0.png) top center no-repeat; opacity:0.55;}\n';
s+= '#splash_greybox a:link, #splash_greybox a:active, #splash_greybox a:visited{color:#666666; display:block;}\n';
s+= '#splash_greybox br {display:none;}\n';
s+= '#splash_greybox a:hover {background-color:#FFFFFF; padding-left:5px; text-decoration:none; font-weight:normal;}\n';

s+= '#splash_login {border:0px;}\n';

s+= '#splash_main {background-image:none;}\n';

s+= '#splash_coolNewPeople {border:2px solid #3399CC; width:245px; height:180px; -moz-border-radius:0px 0px 20px 20px; position:relative; left:25px; padding-left:10px; overflow:hidden;}\n';
s+= '#splash_coolNewPeople h5.heading {background-color:#3399CC;position:relative; left:-10; width:245px; color:#FFFFFF;}\n';
s+= '#splash_coolNewPeople a img {width:80px; display:block; top:-40px; left:-90px; position:relative;}\n';
s+= '#splash_coolNewPeople div {width:240px;}\n';
s+= '#splash_coolNewPeople div a {font-size:20px; font-weight:normal; font-family:Verdana, Arial, Helvetica, sans-serif; color:#3399CC; position:relative; top:20px; left:90px; text-align:left; display:block; }\n';
s+= '#splash_coolNewPeople div br, #splash_coolNewPeople br {display:none;}\n';

s+= '#ctl00_Main_SplashDisplay_featuredVideos_CMS_videos {width:245; display:none;}\n';
s+= '#ctl00_Main_SplashDisplay_featuredVideos_CMS_videos div {border:2px solid; border-color:#3399CC; width:245px; -moz-border-radius:0px 0px 20px 20px; }\n';
s+= '#ctl00_Main_SplashDisplay_featuredVideos_CMS_videos div div a img {max-width:230px; max-height:130; align:center; }\n';
s+= '#ctl00_Main_SplashDisplay_featuredVideos_CMS_videos div div {border:0px; width:auto;}\n';
s+= '#ctl00_Main_SplashDisplay_featuredVideos_CMS_videos div td[style="padding: 5px; background-color: rgb(153, 0, 51);"] {background-color:#3399CC;}\n';
s+= '#ctl00_Main_SplashDisplay_featuredVideos_CMS_videos div table td h5 a img {display:none;}\n';

document.getElementById('theForm').innerHTML = '<table width="250" height="150" border="0" align="center" cellpadding="0" cellspacing="5" background="http://img484.imageshack.us/img484/8757/theformbgad5.png"><tr><td align="center" colspan="3" height="35px" style="padding-right:5px;"></td></tr><tr><td width="50%" align="right" valign="top"><input type="text" name="email" id="email" style="background-image:url(http://img482.imageshack.us/img482/8890/theforminputbgks7.png);width:100px; height:20px; font-family:Verdana, Arial, Helvetica, sans-serif; font-size:9px; text-align:left;"></td><td width="50%" align="left"  valign="top" style="padding-left:5px;"><input name="password" type="password" id="password" style="background-image:url(http://img482.imageshack.us/img482/8890/theforminputbgks7.png); width:100px; height:20px; font-family:Verdana, Arial, Helvetica, sans-serif; text-align:left;"></td></tr><tr><td colspan="2" align="center" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="5" align="center"><tr><td align="right" valign="middle"><input src="http://img230.imageshack.us/img230/2778/theformloginpc0.png" name="ctl00$Main$SplashDisplay$login$loginbutton" type="image" id="ctl00_Main_SplashDisplay_login_loginbutton" alt="Member Login" /></td><td><a id="ctl00_Main_SplashDisplay_login_HyperLink1" title="SignUp" href="http://signup.myspace.com/index.cfm?fuseaction=join"><img title="SignUp" src="http://img230.imageshack.us/img230/9272/theformsignupwq8.png" style="border-width:0px;" /></a></td></tr><tr><td colspan="3" height="20px"></td></tr><tr><td colspan="3" align="center" valign="middle"><a href="http://collect.myspace.com/index.cfm?fuseaction=user.retrievepassword" title="dumbass">Forgot your shit?</a></td></tr></table></td></tr></table>';

GM_addStyle(s);

var shadow = document.createElement("div");
shadow.innerHTML = '<style type="text/css">'
+'<!--'
+'#shadowbg {'
+'position:absolute; top:0px; left:50%; margin-left:-420;'
+'width:840; height:785; background:url("http://img392.imageshack.us/img392/1306/wrapbg1rr7.png") top center no-repeat;}'
+'--!>'
+'</style>'
+'<div id="shadowbg"></div>'
document.body.insertBefore(shadow, document.body.firstChild);