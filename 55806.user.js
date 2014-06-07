// ==UserScript==
// @name           Netload.in Popup Remover, Faster Captcha and Immediate Download Link (August 2009 edition)
// @namespace      http://userscripts.org/users/104101
// @description    Based on script by marcin3k, added automatic redirect for free users to captcha, shows download link immediately after captcha check (saves you 20 seconds), works as of August 2009
// @include        http://netload.in/*
// @include        http://www.netload.in/*
// ==/UserScript==


function addJS(a){var b=document.getElementsByTagName('head')[0];if(!b){return}var c=document.createElement('script');c.type='text/javascript';c.innerHTML=a;b.appendChild(c)}
function getParam(a){var b=window.location.href;if(a){var c="[\\?&]"+a+"=([^&#]*)";var d=new RegExp(c);var r=d.exec(b)}if(r)return r[1]}

// Redirect for free users
var i, v = document.getElementById('InLine_Content_Container'), re = new RegExp('\\bFree_dl\\b');
if (v) {
	v = v.getElementsByTagName('div')[4];
	if (re.test(v.className)) window.location = v.getElementsByTagName('a')[0].href;
}

// Remove popup(s)
addJS('function popUnder(){}');

// Remove iframe(s)
v = document.getElementsByTagName('iframe');
for (i=v.length-1; i>=0; i--) {
	v[i].parentNode.removeChild( v[i] );
}

// Wait until the page is fully loaded
window.addEventListener('load', function( e ) {
// Get captcha or download link after captcha
	if (getParam('id'))      { addJS('change();') }
	if (getParam('file_id')) { document.getElementsByName('captcha_check')[0].focus() }
},false);
