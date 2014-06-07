// ==UserScript==
// @author         Cracker744 from lockerztalk.ru
// @name           LockerzAutoLogin+NoAds
// @include        *lockerz*
// ==/UserScript==
var email = "EMAIL"
var password = "PASSWORD"

if(document.getElementById('login-form')){
document.getElementById('email-email').value = email
document.getElementById('password-password').value = password
document.getElementById('login-submit').click()}
if (document.getElementById("hallway-column-right")){
document.getElementById("hallway-column-right").parentNode.removeChild(document.getElementById("hallway-column-right"))}
if (document.getElementById("right-col-marketing")){
document.getElementById("right-col-marketing").parentNode.removeChild(document.getElementById("right-col-marketing"))}
if (document.getElementById("adContentBanner")){
document.getElementById("adContentBanner").parentNode.removeChild(document.getElementById("adContentBanner"))}
if (document.getElementById("friends-column-right")){
document.getElementById("friends-column-right").parentNode.removeChild(document.getElementById("friends-column-right"))}
if (document.getElementById("contentSideMarketing")){
document.getElementById("contentSideMarketing").parentNode.removeChild(document.getElementById("contentSideMarketing"))}