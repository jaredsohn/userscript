// ==UserScript==
// @name       IFET Autologin for twitter
// @namespace  IFET
// @version    0.1
// @description  Autologin for twitter authentication, using twitterfall
// @match      https://twitter.com/oauth/authorize*
// @copyright  IFET 2013
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

console.log('autologin for twitter started, please do not steal our supersecret password :(');
$('#username_or_email').val('ifetgastein');
$('#password').val('ifetgfhe');

$('#remember').click();
$('#allow').click();