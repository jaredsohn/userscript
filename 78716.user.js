// ==UserScript==
// @name           Gigs Left till TorrentMaster on PassthePopcorn
// @namespace      http://userscripts.org/scripts/show/78716
// @description    Calculates and shows the gigs left till you fulfill the data upload requirement for TorrentMaster
// @include        http://passthepopcorn.me/*
// @include        https://passthepopcorn.me/*
// ==/UserScript==
uploaded = parseFloat(document.getElementById('userinfo_stats').getElementsByTagName('li')[0].lastChild.innerHTML.replace(' GB', ''));
li = document.createElement('li');
li.innerHTML = ' Left Till TM: <span class="stat" style="color:#FF0000;">' + (1024-uploaded).toFixed(2) + ' GB</span>';
document.getElementById('userinfo_stats').appendChild(li);