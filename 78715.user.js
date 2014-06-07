// ==UserScript==
// @name           Gigs Left till Power User on PassthePopcorn
// @namespace      http://userscripts.org/scripts/show/78715
// @description    Displays how many gigs are left until the user reaches Power user (code originally from mlapaglia, so props to them)
// @include        http://passthepopcorn.me*
// @include        https://passthepopcorn.me/*
// ==/UserScript==
uploaded = parseFloat(document.getElementById('userinfo_stats').getElementsByTagName('li')[0].lastChild.innerHTML.replace(' GB', ''));
li = document.createElement('li');
li.innerHTML = 'Power User in: <span class="stat" style="color:#FF0000;">' + (80-uploaded).toFixed(2) + ' GB</span>';
document.getElementById('userinfo_stats').appendChild(li);