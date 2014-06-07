// ==UserScript==
// @name nCore GET Search
// @include http://ncore.cc/torrents.php*
// @include http://ncore.nu/torrents.php*
// @include https://ncore.cc/torrents.php*
// @include https://ncore.nu/torrents.php*
// @author main idea by NPeete rewrite from scratch for nCore V3 by gala
// ==/UserScript==
var div = document.getElementById('torrents1_txt');
var frm = document.getElementById('kereses_mezo') || null;
var inn = div.innerText;
if(frm) {
   frm.method = 'get';
   div.innerHTML += ' || <a href="javascript:void(0);" onclick="alert(\'Köszönöm hogy használod! Bármi kérdésed lenne akkor keressed fel ezt a címet: http://userscripts.org/users/gala\');" class="highlight">by gala</a>';
}