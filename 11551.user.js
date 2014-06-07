// ==UserScript==
// @name            MySpace Simple Login Screen w/Auto-Login
// @description     This is my version of MySpace.com...I was not satisfied with the crappy styles on this site, and MySpace has always been full of ads...All I do on the main page is log in, and sometimes I look at the music page...So I removed everything except the login box and changed the background to white...Comments welcome!! NOW INCLUDES AUTO-LOGIN!
// @author          Sean
// @version         11/28/2007
// @include         http://login.myspace.com/index.cfm?fuseaction=login.process*
// @include         http://*.myspace.com/*?fuseaction=splash*
// @include         http://www.myspace.com/

// ==/UserScript==


//////////////////
//Style-Remover//
////////////////
var css = "#splash_mainLeft, #ctl00_Main_SplashDisplay_CMS_SplashHome_Gads_DE, #ctl00_Main_SplashDisplay_CMS_SplashHome_Gads_DE, #splash_coolNewPeople, #ctl00_Main_SplashDisplay_PromoMember_ABIContainer, #ctl00_Main_SplashDisplay_featuredVideos_CMS_videos, #ad300x100, #header, #footer, #topnav, #splash_getstarted, .splash_vspace {display: none!important;}";
if (typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
  addStyle(css);
} else {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.innerHTML = css;
    heads[0].appendChild(node); 
  }
}

///////////////
//Auto-Login//
/////////////
var timer = 1000;
var timo, maySubmit = true;
var form = document.forms.namedItem('aspnetForm');
var uid = form.elements.namedItem('ctl00$Main$SplashDisplay$ctl00$Email_Textbox');
var pw = form.elements.namedItem('ctl00$Main$SplashDisplay$ctl00$Password_Textbox');

function doSignIn() {
  if(uid.value.length && pw.value.length) {
    form.submit();
  } else { 
    window.setTimeout(doSignIn, timer);
  }
}

doSignIn();

///////////////////////
//Create Home Button//
/////////////////////
var navdiv = document.createElement("div");
    navdiv.setAttribute('id','navdiv');
  navdiv.innerHTML = '<a href="http://home.myspace.com/index.cfm?fuseaction=user">Home</a>';
  document.body.insertBefore(navdiv, document.body.firstChild);

var s='#navdiv{background-color:#6698CB;position:fixed;top:0px;right:0px;padding:1px 2px 4px 4px;-moz-border-radius-bottomleft:6px;}'
  + '#navdiv a{color:white; font-family:Calibri, Arial; font-size:12px; font-weight:normal;}';
  GM_addStyle(s);
