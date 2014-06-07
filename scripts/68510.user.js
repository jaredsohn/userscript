// ==UserScript==
// @name           StR :: Upload till Member
// @namespace      http://seaofquiddity.com
// @description    Shows how much you need to upload untill you are a Member (code originally from mlapaglia)
// @include        http*://*sharetheremote.org/*
// ==/UserScript==

uploaded = parseFloat(document.getElementById('userinfo_stats').getElementsByTagName('li')[0].lastChild.innerHTML.replace(' GB', ''));
li = document.createElement('li');
li.innerHTML = 'Promotion: <span class="stat">' + (15-uploaded).toFixed(2) + ' GB</span>';
document.getElementById('userinfo_stats').appendChild(li);