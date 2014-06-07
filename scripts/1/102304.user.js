// ==UserScript==
// @name                Linkomanija.Net „Man Sekasi“
// @namespace	        http://justinas.me
// @description	        „Man sekasi“ mygtukas skirtas Linkomanija.Net
// @copyright     copyleft 2011 Justinas Stankevicius
// @license       LGPL 3 I guess
// @version       0.01
//
// @include		http://www.linkomanija.net/browse.php*
// @include		https://www.linkomanija.net/browse.php*
// @include		http://linkomanija.net/browse.php*
// @include		https://linkomanija.net/browse.php*
//
// @history       0.01 Initial release
// ==/UserScript==


function sekasi(q) {
    var xml = new XMLHttpRequest();
    var query = 'http://www.linkomanija.net/browse.php?search='+q;
    var tmp = undefined;
    console.log('searching for '+q);
    xml.open('GET',query);
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
            tmp = document.createElement('div');
            tmp.id = tmp;
            tmp.innerHTML = xml.responseText;
            parser(tmp);
        }
    }
    xml.send(null);  
}

function parser(div) {
    url = div.getElementsByTagName('tbody')[3].childNodes[2].childNodes[3].childNodes[0].href;
    window.location = url;
}

butt = document.createElement('button');
butt.id = 'sekasi';
butt.innerHTML = 'Man sekasi!'
butt.onclick = function(e) {
    e.preventDefault();
    var box = document.getElementsByTagName('tbody')[0].childNodes[2].childNodes[1].childNodes[1];
    sekasi(box.value);
}
document.getElementsByTagName('tbody')[0].childNodes[2].childNodes[3].appendChild(butt)
