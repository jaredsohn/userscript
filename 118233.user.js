// ==UserScript==
// @name          sukebei-nyaa-cover-search
// @namespace     http://loli.tw/userscripts
// @description	  Generate search links to find cover for torrent in torrent infomation area
// @include       http://sukebei.nyaa.eu/?page=view&tid=*
// ==/UserScript==

var keywords = document.getElementsByClassName('viewtorrentname')[0].innerHTML.replace(/\(.*\)|(\..*)|[\[\]]|成年コミック/g,'');

// Create display area
var container = document.getElementsByClassName('viewtable')[0];
var cover_tr = document.createElement("tr");
container.appendChild(cover_tr);
var google_url = 'http://www.google.co.jp/search?tbm=isch&hl=ja&q='+keywords;
var amazon_url = 'http://www.amazon.co.jp/s/?field-keywords=(Using AJAX search feature)#/?keywords='+keywords;

cover_tr.innerHTML = '<td>Cover search:</td><td><a href="'+google_url+'" target="_blank">Google Image</a> '+
					  '<a href="'+amazon_url+'" target="_blank">Amazon JP</a></td>';

//TODO: match date & 成年コミック