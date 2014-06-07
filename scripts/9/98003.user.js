// ==UserScript==
// @name           Twitter Pic
// @namespace      http://userscripts.org/
// @include        http://twitter.com/*
// @author	       @davegrohl_
// ==/UserScript==
a = document.createElement('a');
a.setAttribute('onClick',"prompt('Link da foto:',document.getElementById('profile-image').src.replace('_bigger',''))");
a.innerHTML = '<img src="http://milk.jaiku.com/themes/classic/icons/web-camera.gif">';
document.getElementsByClassName('screen-name')[0].appendChild(a);