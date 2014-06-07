// ==UserScript==
// @name           TinyPic Auto Login
// @description    Automatically logs you in to TinyPic.com
// @include        http://tinypic.com/*
// @include        http://tinypic.com*
// ==/UserScript==
/*-------------------------------SETTINGS-------------------------------*/
var EM = "" //Your Email Address {* The Email you used when you signed up*}    -- EM is short for "Email"
var PW = "" //Your TinyPic Password                                            -- PW stands for "Password"
/*-------------------------------SETTINGS-------------------------------*/
document.getElementById('email').innerHtml = '<input id="email" class="input-text" type="text" maxlength="150" name="email" value="'+EM+'"></input>';
document.getElementById('password').innerHtml = '<input type="password" name="password"  class="input-text" id="password"  maxlength="150" value="'+PW+'"></input>';
document.getElementById('submitSignin').click();