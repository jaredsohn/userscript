// ==UserScript==
// @name           Facebook - Diaspora redirect
// @namespace      Zuurstof
// @version        0.1
// @description    Simply redirects Facebook.com to Joindiaspora.com
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @copyleft       2012, Zuurstof
// ==/UserScript==


if(top.location.href="http://www.facebook.com"){

 window.location="http://joindiaspora.com";
    
}

if(top.location.href="https://www.facebook.com"){

 window.location="http://joindiaspora.com";
    
}