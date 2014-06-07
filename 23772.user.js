// ==UserScript==
// @name           NicovideoAutoLogin
// @namespace      http://polog.org
// @description    auto login for niconico video
// @include        http://www.nicovideo.jp/*
// ==/UserScript==

var $ = function(id){return document.getElementById(id)};

// each video
var login_button = $('login_submit');
if(login_button &&
   $('mail').value != '' &&
   $('password').value != ''
  ){
    login_button.click();
}else{
    // top
    var login_bar = $('login_bar');
    if(login_bar &&
       $('bar_mail').value != '' &&
       $('bar_password').value != ''
      ){
        login_bar.submit();
    }
}
