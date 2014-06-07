// ==UserScript==
// @name       Remove Facebooks "Woh can look up your Timelime by name" layer
// @namespace  http://www.djbusti.me
// @version    0.1
// @description  Removes the Facebook Layer about the removal of the "Who can look up your Timeline by name".
// @include      http://www.facebook.com*
// @include      https://www.facebook.com*
// @include      http://facebook.com*
// @include      https://facebook.com*
// @include      http://www.beta.facebook.com*
// @include      http://beta.facebook.com*
// @include      https://www.beta.facebook.com*
// @include      https://beta.facebook.com*
// @include      http://apps.facebook.com*
// @include      https://apps.facebook.com*
// @include      http://apps.beta.facebook.com*
// @include      https://apps.beta.facebook.com*
// @include      http://developer.facebook.com*
// @include      https://developer.facebook.com*
// @include      http://developer.beta.facebook.com*
// @include      https://developer.beta.facebook.com*
// @run-at        document-end
// @copyright  2013, Patrick Reimers
// @grant         unsafeWindow
// ==/UserScript==

var page = document.getElementsByTagName('div')[0];
page.classList.remove('_31e');
var layer = document.getElementsByClassName('_3qw');
for(var i = 0; i < layer.length; i++) { layer[i].style.display = 'none'; }