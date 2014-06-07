// ==UserScript==
// @name          Facebook - Like A Chibi Cyber Theme
// @namespace     http://userstyles.org
// @description	  Facebook themed like Chibi-Cyber.com
// @author        Gabriel Espadas
// @homepage      http://www.facebook.com/hackeeeeeeeeeeeeed
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include       http://ilike.com/*
// @include       https://ilike.com/*
// @include       http://*.ilike.com/*
// @include       https://*.ilike.com/*
// @run-at        document-start
// ==/UserScript==
@-moz-document url("https://www.facebook.com/"), url-prefix("https://www.facebook.com/index.php?stype=lo"), url-prefix("https://www.facebook.com/index.php") { 
body.fbIndex { 
background: url('http://s1319.photobucket.com/user/Muhammad_Faruk/media/wa_zpsda0be995.jpg.html')right center fixed !important; 
-webkit-background-size: cover; 
-moz-background-size: 100% !important; 
background-repeat: no-repeat !important;
background-size: cover !important;
}

.loggedout_menubar_container { background: url('http://fiakka.com/images/blank_transparent.png') !important; }
.fbIndex #globalContainer #dropmenu_container,
.fbIndex #globalContainer #content,
.fbIndex #globalContainer #pageFooter { display: none !important }


.fbIndex .loggedout_menubar_container {
  position: fixed !important;
  width: 420px !important;
  height: 82px !important;
  min-width: 0 !important;
  top: 50% !important;
  left: 50% !important;
  margin-top: -17px !important;
  margin-left: -210px !important;
  z-index: -1 !important;
}


.fbIndex .loggedout_menubar { width: auto !important }
.fbIndex .loggedout_menubar_container .lfloat,
.fbIndex .loggedout_menubar_container .rfloat { float: none !important }
.fbIndex .loggedout_menubar_container .lfloat img,
.fbIndex .loggedout_menubar_container .rfloat #login_form table { display: block !important; margin: 0 auto !important }

.fbIndex .loggedout_menubar_container .lfloat img { display: block; margin: -60px auto 20px !important; }



#SetAsHomepage_Callout {
  display: none;
}

}