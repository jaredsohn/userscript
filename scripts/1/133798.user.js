// ==UserScript==
// @name Profile Palette
// @description Customise your fabebook profile and share it with your friends.
// @author MakuraYami
// @version 1.0.1
// @license (CC) MakuraYami
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// ==/UserScript==
window.onload=asdf;function asdf(){if(/(http|https)\:\/\/www.facebook.com\/ai.php/gi.test(String(window.location.href))){return;}setInterval(function(){var fbc=document.getElementById("facebook_customizer");if(fbc == null){var fbce = document.createElement('div');fbce.setAttribute('id', 'facebook_customizer');document.body.appendChild(fbce);fbc = document.getElementById("facebook_customizer");}var newurl = String(window.location.href);var url = newurl.split('/')[3];if(url.substr(0, 15) == "profile.php?id=") url = url.substr(15);var username = url.split(/[^\w.]+/)[0].toLowerCase();if(!username || username == ''){ username = 'index'; }(function(){var href = 'http://www.memedatabase.net/facebook_customizer/style/'+username+'.css';var obj = fbc.getElementsByTagName('link');if(obj[0] == undefined){ var oldhref = ''; }else{ var oldhref = obj[0].getAttribute('href'); }if(href != oldhref){fbc.innerHTML = "";var s=document.createElement('link');s.rel='stylesheet';s.type='text/css';s.async=true;s.href=href;fbc.appendChild(s);}})();}, 500);}