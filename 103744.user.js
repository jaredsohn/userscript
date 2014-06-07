// ==UserScript==
// @name           NZ forum tweaks
// @namespace     NZ
// @description     Currently includes: moving resources bar up; upgraded youtube link->flash converter; buttons for G-Code insertion (with selected text)
// @author     MJ
// @include    http://www.nukezone.nu/forum*
// @include    http://www.nukezone.se/forum*
// ==/UserScript==

var tbl = document.getElementsByTagName('table')[0];
tbl.style.marginTop = '25px';

var anchors = document.getElementsByTagName('a');
for(var i = 0, a; a = anchors[i]; ++i){
	if(a.href.search(/youtube\.com\/watch\?v=/) == -1 || a.parentNode.className == "Quote") continue;
	
	var id = (a.href.search(/&/) != -1) ? a.href.slice(a.href.search(/=/) + 1, a.href.search(/&/)) : a.href.slice(a.href.search(/=/) + 1);
		
	var obj = document.createElement('object');
	obj.width = 640; obj.height = 390;
	obj.innerHTML = '<param value="http://www.youtube.com/v/' + id + '" name="movie"/><param value="transparent" name="wmode"/><embed width="640" height="390" wmode="transparent" type="application/x-shockwave-flash" src="http://www.youtube.com/v/' + id + '"/><a href="http://www.youtube.com/v/' + id + '" />';
	a.parentNode.insertBefore(obj,a);
	a.parentNode.insertBefore(document.createElement('br'),obj);
	a.parentNode.removeChild(a);
}


var box = document.getElementsByTagName('textarea')[0];
if(box) {
	//START FORUM BUTTON CODE
	box.id='box';
	var stilius = document.createElement('style'); stilius.type="text/css";
	stilius.innerHTML='#italic{font-style: italic;}#under{text-decoration: underline;}#strike{text-decoration: line-through;}#color{color: red;}#font{font-family: Comic Sans, Courier, Serif;}#bold{font-weight: bold;}';
	var head = document.getElementsByTagName("head").item(0);
	head.appendChild(stilius);
	var skriptas = document.createElement('script'); skriptas.type="text/javascript";
	skriptas.src = 'http://glamdring.se/users/a4d7e1e06965a6486c12f1890351a18c/nz/priv_forum.js';
	head.appendChild(skriptas);

	var divc = document.createElement('div'); divc.id="count";
	divc.innerHTML='<input id="counter" type="text" size="4" disabled="disabled" readonly="readonly" maxlength="5" value="'+(64315-box.value.length)+'" name="counter"/>';
	var divb = document.createElement('div'); divb.id="buttons";
	divb.innerHTML='<button type="button" class="Button2" id="bold" onclick="insertBold(document.getElementById(\'box\'), document.getElementById(\'counter\'), 64315);">Bold</button><button type="button" class="Button2" id="italic" onclick="insertItalic(document.getElementById(\'box\'), document.getElementById(\'counter\'), 64315);">Italic</button><button type="button" class="Button2" onclick="insertUnderline(document.getElementById(\'box\'), document.getElementById(\'counter\'), 64315);"><span id="under">Underline</span></button><button type="button" class="Button2" onclick="insertStrike(document.getElementById(\'box\'), document.getElementById(\'counter\'), 64315);"><span id="strike">Strikethrough</span></button><button type="button" class="Button2" id="quote" onclick="insertQuote(document.getElementById(\'box\'), document.getElementById(\'counter\'), 64315);">Quote</button><button type="button" class="Button2" onclick="insertImage(document.getElementById(\'box\'), document.getElementById(\'counter\'), 64315);">Image</button><button type="button" class="Button2" id="color" onclick="insertColor(document.getElementById(\'box\'), document.getElementById(\'counter\'), 64315);">Color</button><button type="button" class="Button2" id="size" onclick="insertSize(document.getElementById(\'box\'), document.getElementById(\'counter\'), 64315);">SIZE</button><button type="button" class="Button2" id="font" onclick="insertFont(document.getElementById(\'box\'), document.getElementById(\'counter\'), 64315);">Font</button>';
	//box.parentNode.insertBefore(divc,box.nextSibling);
	box.parentNode.insertBefore(divb,box.nextSibling);

	//box.setAttribute('onmouseup',"textCounter(box, document.getElementById('counter'), 64315)");
	//box.setAttribute('onkeyup',"textCounter(box, document.getElementById('counter'), 64315)");

	//END FORUM BUTTON CODE
}