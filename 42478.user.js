// ==UserScript==
// @name           Gigs Left till Power User on what.cd
// @namespace      http://what.cd
// @description    Displays how many gigs are left until the user reaches Power user (code originally from mlapaglia, so props to them)
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==
uploaded = parseFloat(document.getElementById('userinfo_stats').getElementsByTagName('li')[0].lastChild.innerHTML.replace(' GB', ''));
li = document.createElement('li');
li.innerHTML = 'Power User in: <span class="stat" style="color:#FF0000;">' + (25-uploaded).toFixed(2) + ' GB</span>';
document.getElementById('userinfo_stats').appendChild(li);