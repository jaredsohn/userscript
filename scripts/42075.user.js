// ==UserScript==
// @name           Gigs Left till Elite on what.cd
// @namespace      http://what.cd
// @description    Calculates and shows the gigs left till you fulfil the data upload requirement for elite
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==
uploaded = parseFloat(document.getElementById('userinfo_stats').getElementsByTagName('li')[0].lastChild.innerHTML.replace(' GB', ''));
li = document.createElement('li');
li.innerHTML = 'Left Till Elite: <span class="stat" style="color:#FF0000;">' + (100-uploaded).toFixed(2) + ' GB</span>';
document.getElementById('userinfo_stats').appendChild(li);