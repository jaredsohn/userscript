// ==UserScript==
// @name           Liens Google en target "_blank"
// @namespace      http://olivier.jeulin.free.fr/scripts/
// @description    Force l'ouverture d'un nouvel onglet sur les liens de Google en ajoutant une icone à droite du lien principal
// @include        http://www.google.*
// ==/UserScript==

function test_lng() {
    if (navigator.language == "fr") return "Ouvrir le lien dans un nouvel onglet";
    else return "Open link in a new tab";
    return true;
    }   
function liste(a, lng) {
    for (i=0; i<a.length; i++) {
        var a_class = a[i].className;
        if (a_class == "l") add_link(a[i], lng);
        }
    }
function add_link(a, lng) {
	var img_blank = 'data:image/gif;base64,'+
    'R0lGODlhDgAOAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD/'+
    '/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBm'+
    'AABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/'+
    'MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNm'+
    'ZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/'+
    'mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZm'+
    'zGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb/'+
    '/5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZ'+
    'AJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwA'+
    'M8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZ'+
    'ZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8A'+
    'mf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+Z'+
    'zP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///ywAAAAADgAOAAAIRgAfCBxI'+
    'sODAHwgTJiz4w+CDhgQhMhyIAEGMihgRPBQYo6NHjxohxnB4ceODkQZLiiQZAyFHkhoHoixYUiZM'+
    'gh9zOtw5MCAAOw==';
    var inner= a.parentNode.innerHTML;
    var link = a.href;
    var attr = a.attributes;
    var omd = "";
    for(n=0; n<attr.length; n++) {
        if (attr[n].nodeName == "onmousedown") omd = attr[n].nodeValue;
        }
    var new_link = document.createElement("a");
	new_link.href = link;
	new_link.target = "_blank";
	new_link.title = lng;
	if (omd != "") new_link.setAttribute("onmousedown", omd); 
	new_img = document.createElement("img");
	new_img.src = img_blank;
	new_img.setAttribute("alt", "+");
	new_img.style.border = "0";
	new_img.style.padding = "0 0 0 3px";
	new_link.appendChild(new_img);
	old_table = a.parentNode.getElementsByTagName('table')[0];
    a.parentNode.insertBefore(new_link, old_table);
    }

if (document.getElementById('res')) {
	var res = document.getElementById('res');
	if (res.getElementsByTagName('a')) {
		var a = res.getElementsByTagName('a');
		var lng = test_lng();
		liste(a, lng);
		}
	}