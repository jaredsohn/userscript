// ==UserScript==
// @name          Friendster Black and Grey Home 
// @namespace     www.friendstersatisfaction.com
// @description	  Black and Grey Homepage
// @include       http://*friendster.com/*
// ==/UserScript==

s = "html,body{margin:0;padding:0;z-index:0;text-align:center;font-family: Arial, sans-serif;color:#000000;font-size:12px;line-height:1.2em}\n";
s+= "body {background:url(http://images.friendster.com/images/homebg.gif) repeat top left #000000;z-index:0; padding-bottom:30px !important;}\n";
s+= "input { font-size: 12px;color: #ffffff;}\n";
s+= ".photoUpload { font-size: 13px; color: #ffffff;}\n";
s+= ".photoPlaceholder { font-size: 11px; padding-left: 16px;}\n";
s+= ".photoPreviewBox { font-size: 11px; height: 50px; border: 1px solid #000000; width: 45px; overflow: hidden; white-space: nowrap; background: #DDDDDD;}\n";
s+= "table { font-size: 12px; color: #ffffff; }\n";
s+= "h1, h2, h3, strong, label, .strong { font-weight: bold; }\n";
s+= "h1, h2, h3, form { margin: 0; paddgroupsing: 0; }\n";
s+= "img { border: 0; }\n";
s+= "a, a:link, a:visited, a:active { text-decoration: none; color:#528BC0; }\n";
s+= "a:hover { text-decoration: underline; color:#FF4000; }\n";
s+= "ol, ul { list-style: none; margin: 0; padding: 0; }\n";
s+= ".inlinert { display: inline; margin: 0px 0px 0px 5px; border: 0px; }\n";
s+= ".inlinelt { display: inline; margin: 0px 5px 0px 0px !important; border: 0px; }\n";
s+= ".inlineblock { display: inline-block; }\n";
s+= ".floatR { float: right; display: inline; }\n";
  s+= ".floatL { float: left; display: inline; }\n";
  s+= ".hidden { display: none !important; }\n";
  s+= ".fakeLink { cursor: pointer; }\n";
  s+= ".center { text-align: center; }\n";
s+= "*html body {padding-bottom:15px !important;}\n";

  s+= "#homeBg { width: 850px; background: #FFFFFF; border: 1px solid #A6A69A; margin: 10px auto; padding: 0 0 10px 0; text-align: center; z-index: 0; }\n";
  s+= "#container { width: 800px !important; margin: 0 auto; padding: 0; text-align: left; }\n";
  s+= "#content { padding: 0; margin: 5px 0 0 0; position: relative; }\n";
  s+= "#controlPanel { z-index: 4; }\n";
  s+= ".flo0, .flo1, .flo2, .flo3, .flo4 { z-index: 1; padding:0; margin: 0; zoom: 1; }\n";
  s+= "* html .flo0, .flo1, .flo2, .flo3, .flo4 { position:relative; }\n";
  s+= ".flo0:after, .flo1:after, .flo2:after, .flo3:after, .flo4:after { content: "."; display: block; height: 0; clear: both; visibility: hidden;  }\n";
  s+= ".lc { float: left; display: inline; position: relative; }\n";
  s+= ".rc { float: right; display: inline; position: relative; }\n";
  s+= ".flo4 .lc, .flo3 .rc { z-index: 5; width: 160px; }\n";
  s+= ".flo2 .lc, .flo1 .rc { z-index: 5; width: 300px; }\n";
  s+= ".flo1 .lc, .flo2 .rc { z-index: 2; width: 490px; }\n";
  s+= ".flo3 .lc, .flo4 .rc { z-index: 2; width: 630px; }\n";
  s+= ".tabModuleContent .flo1 .lc, .tabModuleContent .flo2 .rc { width: 470px; }\n";
  s+= ".tabModuleContent .flo3 .lc, .tabModuleContent .flo4 .rc { width: 610px; }\n";
  s+= "* html .tabModuleContent .subnav {position:fixed;}\n";
  s+= "* html .tabModuleContent .boxcontent {position:fixed;}\n";
  s+= "* html .tabModuleContent .flo1 {position:fixed;}\n";
  s+= "* html .tabModuleContent .flo1 .lc {position:fixed;}\n";
  s+= "* html .tabModuleContent .flo1 .rc {position:fixed;}\n";
  s+= "* html .tabModuleContent .flo1 .rc .sn_greenbor {position:fixed;}\n";

  s+= "#footer_container { width: 850px; margin: 0 auto; }\n";
  s+= "#footer { font-size: 10px; line-height: 1em; position: relative; margin: 10px auto; text-align: center; color: #000000; }\n";
  s+= "#footer a { font-size: 10px; color: #000000; }\n";

  s+= ".statusmessagebox { border: 1px solid #D7D7D7; background: none; padding: 3px; margin: 0 0 5px 0; }\n";
  s+= ".notificationbox { background: url(http://images.friendster.com/images/msg_check.gif) 5px center no-repeat; }\n";
  s+= ".confirmbox { background: url(http://images.friendster.com/images/msg_info.gif) 5px center no-repeat; }  \n";
  s+= ".errorbox, .commonmsgbox, .notificationbox, .confirmbox { position: relative; background-color: #F0F0F0 !important; padding: 10px 10px 10px 42px; }\n";
  s+= ".errorbox { background: url(http://images.friendster.com/images/msg_error.gif) 5px center no-repeat; }\n";
  s+= ".errorbox h2, .commonmsgbox h2, .notificationbox h2, .confirmbox h2 { padding: 0; line-height: 18px; }\n";
  s+= ".errorbox h2, .commonmsgbox h2 { color: #EB0000; }\n";
  s+= ".errorbox .boxcontent, .commonmsgbox .boxcontent, .notificationbox .boxcontent, .confirmbox .boxcontent { padding: 5px 0 5px 0; }\n";
  s+= ".commonmsgbox { padding: 10px;}\n";
  s+= ".notificationbox h2 { color: #2B8902; }\n";
  s+= ".confirmbox h2 { color: #0477AB; }\n";
  s+= ".confirmbox span.buttonBox { padding-left: 10px; }\n";
  s+= ".confirmbox span.buttonBox a { font-size: 95%; }  \n";
  s+= ".confirmbox div.buttonBox { margin: 7px 0 0 0; }\n";



  s+= ".commonbox { position: relative; width: auto; margin: 0 0 10px 0; padding: 0; }\n";
  s+= ".boxcontent { padding: 7px 10px !important; }\n";
  s+= "* html .boxcontent { position:relative; }\n";
    s+= "html .commonbox, * html .boxcontent { height: 1%; }\n";
  s+= ".sn_scroll { margin: 0; padding: 0 10px 10px 10px; clear: left; }\n";
  
  
  s+= ".sn_subnav { padding: 7px 10px; margin: 0 -10px 10px -10px; font-weight: bold; color: #FFFFFF; }\n";
  s+= ".sn_subnav2 { font-weight: bold; padding-bottom: 5px; font-size: 1.2em; }\n";
  s+= ".sn_subnav3 { padding: 7px 10px; margin: 0 -10px -7px -10px; color: #ffffff; }\n";
  s+= ".sn_subnav span, .sn_subnav3 span { margin: 0 3px; color: #FFFFFF; }\n";
  s+= ".sn_subnav a, .sn_subnav3 a { font-weight: normal !important; color: #FFFFFF !important; }\n";
 s+= " .sn_subnav2 a { font-size: 0.8em !important; }\n";
  s+= ".viewall { padding: 2px 10px; font-weight: bold; }\n";
  s+= ".dr a, .viewall a {color: #196B91}\n";
  s+= ".dr a:visited, .viewall a:visited {color: #196B91}\n";
  s+= ".action_panel { background-color: #eeeeee;}\n";
  s+= ".action_panel ul li { margin-left: 30px; padding: 5px 0; font-weight: bold;}\n";
  s+= ".friends_panel { background: none; position: relative; padding: 0; margin-bottom: 5px; text-align: center;}\n";
  s+= "html .friends_panel { height: 1%; } \n";
  s+= ".friends_panel ul a { color: #196B91;}\n";
  s+= ".friends_panel ul a:visited { color: #196B91;}\n";
  s+= ".friends_panel .flogrid75 .flogriditem { margin-top: 7px !important; margin-bottom: 0 !important; }\n";
  s+= "#yourStats a { font-size: 110%; }\n";
  s+= "#yourStats span { color: #528bc0; font-size: 110%; }\n";
  s+= "#friendtrackerPanel a {color: #FF661A;}\n";
  s+= ".nameLink {color: #528BC0 !important;}\n";

s+= "#signIn .signup { float: right; padding: 10px 10px 0 0; font-weight: bold; }\n";
s+= "#signIn .login { font-size: 138% !important; font-weight: bold; padding: 10px; margin: 0; background-color:#f7f7f7; }\n";
s+= "#signIn .loginButton input { cursor: pointer; font-weight: bold; font-size: 93%; color: #fff !important; background-color: #528BC0; border: 1px solid #C4C4C4; padding: 3px 0; margin: 0 10px 10px 0 !important; white-space: nowrap; width: 75px; }\n";
s+= "#signIn label { font-weight: normal; }\n";
s+= "#signIn input.orangebutton { font-weight: bold; font-size: 93%; background:#FF2000 !important; border: 1px solid #c4c4c4; width:95px;}\n";
s+= ".loginBoxTop{background:url(http://images.friendster.com/images/login-box-top.png) no-repeat;position:relative}\n";
s+= ".loginBoxBot{background:url(http://images.friendster.com/images/login-box-bot.png) no-repeat;width:300px;height:9px;position:relative}\n";
s+= "#loginInfoText{position:absolute;width:500px;background:#fff;padding:5px;z-index:1000;border:1px solid #eee;top:-10px;left:190px;font-size:11px}\n";



GM_addStyle(s);