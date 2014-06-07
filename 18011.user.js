// Copyright (C) 2007 Christoph Reiter <christoph.reiter@gmx.at> 
// and Oezguen Goecer <oezgueng@yahoo.de>
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// ==UserScript==
// @name          SchuelerVZ - Alle Gruscheln
// @description   Fügt eine "alle gruscheln" Funktion hinzu.
// @include       http://www.schuelervz.net/home.php*
// ==/UserScript==

function send(meth, url, data, cb) {
  GM_xmlhttpRequest({
    method: meth,
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(xhr) { cb(xhr.responseText); }
  });
}

function gruschel_all() {

    //Change link to text
    cell.removeChild(gru_link);
    gru_text =  document.createElement('span');
    gru_text.innerHTML = '[ gruschel... ]';
    cell.appendChild(gru_text);
    
    //Get all people on the frontpage
    var links = gru_list.getElementsByTagName('a');
    var gruschels = new Array();
    for (var i = 0; i < links.length; i++) {
        if (links[i].href.indexOf('gru.php?') != -1) {
            gruschels.push(links[i].href.split('?')[1]);
        }
    }
    
    //Poke/gruschel them all
    var count = 0;
    for(var i = 0; i < gruschels.length; i++) {
        send('GET', 'http://www.schuelervz.net/gru.php?'+gruschels[i],'', function(s) {
            var tag = s.substr(s.indexOf('checkcode')-25,96);
            var checkcode = tag.substr(tag.indexOf('value="')+7,32);
            var data = gruschels[count]+'&save=1&checkcode='+checkcode;
            
            send('POST', 'http://www.schuelervz.net/gru.php', data, function(g) {
                // Debug
                //alert(g.substr(g.lastIndexOf('<h2>')+4,g.lastIndexOf('</h2>')-g.lastIndexOf('<h2>')-4));
                if(count >= gruschels.length)
                    gru_text.innerHTML = '[ '+gruschels.length + ' gegruschelt ]';
            })
            
            count++;
        })
    }
}

//Include link
gru_list = document.getElementsByName('poke_list')[0];
if(gru_list) {
    gru_link = document.createElement('a');
    gru_link.innerHTML = '[ alle gruscheln ]';
    gru_link.href='javascript:;';
    gru_link.addEventListener('click', gruschel_all, true);
    
    table = gru_list.childNodes[3];
    row = table.insertRow(table.rows.length);
    row.insertCell(0);
    cell = row.insertCell(1);
    cell.appendChild(gru_link);
}