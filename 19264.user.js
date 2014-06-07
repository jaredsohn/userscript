// ==UserScript==

// @name           Clean_Myspace_Login
// Version .6 - A few minor changes were mad to make it more user friendly.
// @namespace      Dargx
// @description    Attempts to make the myspace login screen better organized.
// @include        http://www.myspace.com/
// @include        http://www.myspace.com/index.cfm?fuseaction=splash

// ==UserScript==

//Dont edit this.
s= 'body {background-color:black !Important;}';
s+= '*{-moz-border-radius:7px !Important;}';
s+= '#ad440x160 {display:none;}';
s+= '#ad300x100 {display:none;}';

//This is user editable.

s+= '#ctl00_Main_SplashDisplay_userVideos_VideoToday {display:none;}';
s+= '#CMS_SplashHome_Gads_DE {display:none}';
s+= '#splash_videotoday {display:none;}';
s+= '#splash_greybox {display:none;}';
s+= '#myspacespecials {display:none}';
s+= '#splash_coolNewPeople {display:none}';
s+= '#splash_mainBottom {display:none;}';
s+= '#footer {display:none;}';
s+= '#splash_login_container {position:absolute; left:170px; top:70px; z-index:4; width:317px; height:165px; overflow:auto; z-index:9; background-color:white;}';
s+= '#splash_music {position:absolute; left:163px; top:245px; z-index:4; width:487px; height: 180px; overflow:hidden;z-index:9; background-color:white;}';
s+= '#ctl00_Main_SplashDisplay_PromoMember_ABIContainer {position:absolute;right:175px;top:245px;z-index:4;width:300px;height:100px;overflow:auto; z-index:9; background-color:white;}';


GM_addStyle(s);
document.getElementById('header').innerHTML = '<center><a href=http://www.myspace.com/index.cfm?fuseaction=misc.relatedfaqs&Category=1&SubCategory=2>Login Trouble?</a></center>';



