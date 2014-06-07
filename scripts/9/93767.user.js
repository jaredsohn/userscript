// ==UserScript==
// @name           Hello monkey!
// @description    Shows captcha.
// @include        http://*.2ch.so/* 
// @match        http://*.2ch.so/*
// @include        http://2ch.so/* 
// @match        http://2ch.so/*


// ==/UserScript==

alert(22);
previous_load = load;
alert(11);
load = function(id,url)
{
alert(1);
if(id=='captcha')
{
var captcha = document.getElementById('captcha');
captcha.innerHTML = '<style>#captcha_i { display: inline };</style><div id="recaptcha_widget"><div id="recaptcha_data"><div id="recaptcha_image" onclick="javascript:Recaptcha.reload()"></div></div></div>';
}
else
    previous_load(id,url);
}
alert(load);