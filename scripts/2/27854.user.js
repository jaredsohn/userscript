// ==UserScript==
// @description    Long Jepka`s viewer. Based on "Youtube inline watcher" by mcm69
// @name           jepka_watcher
// @namespace      ru.nexis.lepra
// @include        http://leprosorium.ru/comments/*
// @include        http://www.leprosorium.ru/comments/*
// @version        0.2
// ==/UserScript==
// чочо
function $(id){return document.getElementById(id)}

var jepimg=document.createElement("img");
//внедрим картинке
jepimg.src="data:image/gif;base64,R0lGODlhCgAKAPcAAAAAAAAA/93d3f///wAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zAAAACH5BAEAABAALAAAAAAKAAoAAAgrAAcIFBigYMGBBA0GQDhA4UKEDhk6BECRooCLFytaxChAIwCOHTWC9AgyIAA7";

var tags = $('tags_common');
var jepki = new Array();

jepki=tags.getElementsByTagName('a');
if (jepki) {
		/* init div */
	var d = document.createElement('DIV');
	d.id = "jepka_inline_div";
	d.style.display="none";
	d.innerHTML = "";
	document.body.appendChild(d);
	var css=" #jepka_inline_div { position: absolute; display: none; border: 1px solid #999;"+
			"background: #ececec; padding: 1px; text-align: center; z-index:99}";
	style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = css;
	document.body.appendChild(style);

	}
else return;

		/* show div */
function showdiv() {
	var jep = this.getAttribute('wtf'); //jepka nicks
	dd = $('jepka_inline_div');
	if ((dd.style.display == 'block')) {
			dd.style.display = 'none';
			return;
	} 
		else
	{
		//load contents
		
		dd.innerHTML = jep;
		// insert it in new place
		var winwidth = window.innerWidth;

		if(winwidth<450)
			dd.style.left = Math.max((findPosX(this) - 130), 20) + "px";
		else
			if (findPosX(this)+10 > winwidth)
				dd.style.right = winwidth-findPosX(this) + "px";
			else
				dd.style.right = 0.5*(winwidth - findPosX(this)) + "px";

		dd.style.top = (findPosY(this) + 20) + "px";
		dd.style.display = 'block';
		d.focus();
	}
}

	
/* init links */
function init() 
{
		var all = tags.getElementsByTagName('a');
		for (var i = 0, o; o = all[i]; i++) {
			if(all) {
				var img = document.createElement('img');
				img.src = jepimg.src; img.title = 'open jepkas';
				img.height = img.width = 10;
				img.style.border = 'none';
				img.style.marginRight = '0.5em';
				img.style.cursor = 'pointer';
				var title = o.getAttribute('title');

				img.setAttribute('wtf', title);
				img.addEventListener('click', showdiv, true);
				o.parentNode.insertBefore(img, o);
			}
		}
}
init();

/* routines */
function findPosX(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	} 
	return curleft;
}

function findPosY(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	} 
	return curtop;
}