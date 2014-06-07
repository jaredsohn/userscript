// ==UserScript==
// @name 		Wykop advanced search button
// @description 	This script add advanced search options to standard search
// @author		Dziudek
// @version 		0.1
// @include 		http://*wykop.pl*
// ==/UserScript==

var d = document;
var conf = [false,true,true,true,true];
function $add(el){return d.createElement(el);}
function $(el){return d.getElementById(el);}

var f = $("search-form");
f.setAttribute("style","text-align: right;");

var b = $add("input");
b.setAttribute("type","button");
b.setAttribute("class","submit-button");
b.setAttribute("value","opcje");
b.addEventListener("click",hide,false);
function hide(){(conf[0]) ? $("adv-search").style.display = "none" : $("adv-search").style.display = "block";conf[0] = !conf[0];}

f.childNodes[1].appendChild(b);

var fs = $add("fieldset");
function checked(i){i++;if(conf[i]){return 'checked="checked"';}else{return false;}}
if(conf[0]){var dis = 'block';}else{var dis = 'none';}
fs.setAttribute("style","display:"+dis+";margin-top: -17px;");
fs.setAttribute("id","adv-search");
fs.innerHTML = '<select name="zakres" id="select-zakres" style="margin-right: 0;">' + 
					'<option value="1" selected="selected">wszystkie</option>' + 
					'<option value="2">wykopane</option>' + 
					'<option value="3">nie wykopane</option>' +
				'</select>' +
				'<input type="checkbox" class="chk-box" name="pole[tytul]" id="poletytul" ' + checked(0) + '/><label for="poletytul">Tytuł</label>' +
				'<input type="checkbox" class="chk-box" name="pole[opis]" id="poleopis" ' + checked(1) + '/><label for="poleopis">Opis</label>' +
				'<input type="checkbox" class="chk-box" name="pole[URL]" id="poleURL" ' + checked(2) + '/><label for="poleURL">URL</label>' +  	    
				'<input type="checkbox" class="chk-box" name="pole[tag]" id="poletag" ' + checked(3) + '/><label for="poletag">Tagi</label>';
f.appendChild(fs);