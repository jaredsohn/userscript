// ==UserScript==
// @name           Loudsur13's Custom Login Page
// @namespace      http://www.myspace.com/loudsur13
// @description    Custom Login Page
// @include        http://www.myspace.com/index.cfm?fuseaction=splash*
// @include     http://login.myspace.com/index.cfm?fuseaction=login*
// @include     http://www.myspace.com
// @include	http://myspace.com/
// @include	http://www.myspace.com/
// ==/UserScript==


s = "body {background-color:FFFFFF; background-image:url(http://img357.imageshack.us/img357/9707/signinbgqt6.jpg); background-attachment: fixed; background-position:top center; background-repeat:no-repeat; overflow:hidden;}";
s+= "table, tr, td, div, span {background-color:transparent;}";
s+= "#main {visibility:hidden;}";

s+= "#topnav {background:#A3A3A3!important; color:#FFFFFF!important; padding-top:55px!important; width:540px; font-size:9px;}";
s+= "#topnav {position:absolute: top:0px; left; 50%; margin-left:125;}";
s+= "#topnav a {color:#FFFFFF!important; font-size:9px;}";
s+= "#topnav a:hover {color:000000!important; text-decoration:none;}";

s+= "#topnav span {display:none;}";
s+= "#footer, #nav, #msft {display:none;}\n";
s+= "#header {display:none;}\n";
s+= "#splash_coolNewPeople {display:none;}\n";
s+= "#ctl00_Main_SplashDisplay_featuredVideos_CMS_videos {display:none;}\n";
s+= "#ctl00_Main_SplashDisplay_CMS_SplashEast300x100 {display:none;}\n";
s+= "#splash_getStarted {display:none;}\n";

s+= "#wrap {background-color:transparent;}\n";
s+= "#main {background-image:none;}\n";
s+= "#splash_login {position:absolute; left:50%; margin-left:-400px; top:50px;}\n";
s+= "#splash_login {visibility:visible; background-color:FFFFFF; -moz-border-radius:15px 15px 0px 0px; border:2px #a3a3a3 solid; padding:3px;}\n";
s+= "#splash_login .heading {-moz-border-radius:15px 15px 0px 0px; background-color:#a3a3a3; display:block; text-align:center;}\n";
s+= "#wrap {height:300px;}\n";

s+= "#splash_login a {color:#a3a3a3; font-size:9px;}\n";
s+= "#splash_login a:hover {color:#000000; text-decoration:none;}\n";
s+= "#splash_login input#email {-moz-border-radius: 15px 15px 0px 0px; font-size:9px; color:#a3a3a3;}\n";
s+= "#splash_login input#password {-moz-border-radius: 0px 0px 15px 15px; font-size:9px; color:#a3a3a3;}\n";
s+= "#splash_login input {border:1px solid #a3a3a3; padding-left:5px;}\n";
s+= "#splash_login label {color:#a3a3a3; font-size:9px; padding-top:5px;}\n";

s+= "#splash_login #ctl00_Main_SplashDisplay_login_loginbutton {border:0px;}\n";


GM_addStyle(s);