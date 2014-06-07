// ==UserScript==
// @name           Gigs Left till Elite on PassthePopcorn
// @namespace      http://userscripts.org/scripts/show/78714
// @description    Calculates and shows the gigs left till you fulfil the data upload requirement for elite
// @include        http://passthepopcorn.me*
// @include        https://passthepopcorn.me/*
// ==/UserScript==
uploaded = parseFloat(document.getElementById('userinfo_stats').getElementsByTagName('li')[0].lastChild.innerHTML.replace(' GB', ''));
li = document.createElement('li');
li.innerHTML = 'Left Till Elite: <span class="stat" style="color:#FF0000;">' + (500-uploaded).toFixed(2) + ' GB</span>';
document.getElementById('userinfo_stats').appendChild(li);