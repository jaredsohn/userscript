// ==UserScript==
// @name           What.CD - GB left to Power User
// @namespace      http://what.cd
// @description    Shows how much GB needs to be uploaded till you reach Power User
// @include        http*://what.cd/*
// ==/UserScript==

uploaded = parseFloat(document.getElementById('userinfo_stats').getElementsByTagName('li')[0].lastChild.innerHTML.replace(' GB', ''));
li = document.createElement('li');
li.innerHTML = 'Left Till PU: <span class="stat" style="color:#FF0000;">' + (25-uploaded).toFixed(2) + ' GB</span>';
document.getElementById('userinfo_stats').appendChild(li);