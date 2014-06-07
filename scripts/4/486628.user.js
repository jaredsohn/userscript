// ==UserScript==
// @name        novaposhta
// @namespace   what?
// @description добавление штрихкода на старой и новой версии сайта
// @include     http://*novaposhta.ua/*
// @version     1
// @grant       none
// ==/UserScript==

window.onload = function () {
    var url = document.URL;
    var res = url.match(/http:\/\/new.novaposhta.ua\/cargo\/\?cargo_number=(\d+)/);
    if (res)
    {
        var id = res[1];
        var code = 'http://www.barcodes4.me/barcode/i2of5/' + id + '.jpg'
        var div = document.getElementsByClassName('highlight') [0];
        var p = document.createElement('p');
        p.innerHTML = '<strong>Штрихкод:</strong><img src="' + code + '">';
        div.appendChild(p);
    }

    var res2 = url.match(/http:\/\/novaposhta.ua\/frontend\/tracking\?lang=ukr/);
    if (res2)
    {
        var id = document.getElementById('number').value;
        var code = 'http://www.barcodes4.me/barcode/i2of5/' + id + '.jpg';
        var table = document.getElementsByTagName('table') [1];
        var tr = document.createElement('tr');
        tr.innerHTML = '<td><h2>&nbsp;&nbsp;&nbsp;Штрихкод: </h2></td><td><img src="' + code + '"></td>';
        table.appendChild(tr);
    }
}
