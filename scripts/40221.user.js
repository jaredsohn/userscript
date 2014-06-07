// ==UserScript==
// @name           Wunza.ws - GB left to Power User
// @namespace      http://wunza.ws
// @description    Shows how much you need to upload before you reach Power User
// @include        http*://wunza.ws/*
// ==/UserScript==

uploaded = 

parseFloat(document.getElementById('userinfo_stats').getElementsByTagName('li')[0].l

astChild.innerHTML.replace(' GB', ''));
li = document.createElement('li');
li.innerHTML = 'Left Till PU: <span class="stat" style="color:#FF0000;">' + 

(25-uploaded).toFixed(2) + ' GB</span>';
document.getElementById('userinfo_stats').appendChild(li);