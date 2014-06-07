// ==UserScript==
// @name           Lasering: display barcode
// @namespace      http://userscripts.org/users/430716
// @description    Displays the release barcode on lasering item pages
// @include        http://www.lasering.ee/index.php?make=item_show&toote_id=*
// ==/UserScript==

// alert(1);
var lasering_cover_art = document.getElementsByTagName('img')[06].getAttribute('src');
var lasering_barcode = lasering_cover_art.replace('http://www.lasering.ee/img/toote_pildid/','');
var lasering_barcode = lasering_barcode.replace('.jpg','');
var target = document.getElementsByTagName('img')[06].parentNode;
var newDiv = document.createElement('div');
newDiv.innerHTML = '<b>Ribakood:</b> ' + lasering_barcode;
target.insertBefore(newDiv, target.getElementsByTagName('table')[0]);