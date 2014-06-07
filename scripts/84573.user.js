// ==UserScript==
// @name	Pennergame - Einkaufswagen ausleeren (all Citys, all Countries)
// @version	0.8
// @author	abwasch - pennerhack.foren-city.de
// @include	*pennergame.de/*
// @include	*clodogame.fr/*
// @include	*mendigogame.es/*
// @include	*menelgame.pl/*
// @include	*dossergame.co.uk/*
// @include	*serserionline.com/*
// @include	*bumrise.com/*
// @include	*faveladogame.com.br/*
// @include	*bomzhuj.ru/*
// @exclude	*board.*
// @exclude	*dontknow.me/*
// @exclude	*/redirect/*
// ==/UserScript==

var version = '0.8';
update()

var use_debug = false;		//use debug set true
var emptied = 0;
var bottles_found = 0;
var action_status = '';
var junk_use = '';
var junk_id = '';

var cart_link = 'http://'+document.URL.split('/')[2];
var img_link = 'http://static.pennergame.de/img/pv4';
var div_top = GM_getValue(cart_link+'div_top', '100px');
var div_left = GM_getValue(cart_link+'div_left', '530px');

var cart_img0 = 'data:image/gif;base64,R0lGODlhDQANANUAAJAQEJEREZESEpITE7ppab90dMF4eMSAgMWAgMWCgs+YmNCZmdCamtGbm9Gc'
	+'nNKfn9OgoNShodSiotWjo9epqdirq9murtqvr9uxsd64uN+6uuC7u+G+vuTDw+TExOXGxubIyObJyefKyufLy+fMzOjNze3Y2Pbr6////wAAAAAA'
	+'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAACkALAA'
	+'AAAANAA0AAAhDAAcMSEGwYEEAAwAgNFhQwEKHAw1CbLiQ4ESJDysydEhAI8MUCQl8pNgx4saHAkxa1CggZUOXEl22VPkypYCRFgcEBAA7';

var cart_img1 = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABnRSTlMA/wD/AP83WBt9AAAACXBI'
	+'WXMAAA7DAAAOwwHHb6hkAAAACXRFWHRDb21tZW50AACJKo0GAAAALklEQVR4nGP4TwRgQOOfOXUEiIaIImQJrGwGND4mA8U6iCgywu4'
	+'mrCrI9R1WAADIC5i6og5qlAAAAABJRU5ErkJggg==';

var cart_img2 = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABnRSTlMA/wD/AP83WBt9AAAACXBI'
	+'WXMAAA7DAAAOwwHHb6hkAAAACXRFWHRDb21tZW50AACJKo0GAAAAMUlEQVR4nGP4TwRgQOOfOXUEiPApgqjAVMeAVQWaOgY0WzAZ'
	+'UEXIfKxs0h0+SBVhBQAt4Zi6ZVgYMQAAAABJRU5ErkJggg==';

document.getElementById('topmenu').innerHTML += '<div id=\"cart_div\" style=\"position:absolute; top:'+div_top+'; left:'+div_left+'; '
	+'min-width:210px; background-color:#cccac4; color:#000000; border:3px solid #968080; -moz-border-radius:4px; '
	+'font-size:12px; font-weight:normal; text-align:right; text-transform:none; cursor:default; z-index:50\"></div>';

//---start-script--------------------------------------------------------------------------

cart_config()

function cart_config(){
	this.auto = GM_getValue(cart_link+'auto', false);
	this.time_out_start = GM_getValue(cart_link+'time_out_start', '0:00');
	this.time_out_ende = GM_getValue(cart_link+'time_out_ende', '0:00');
	this.time_out_except = GM_getValue(cart_link+'time_out_except', false);
	this.junk_before = GM_getValue(cart_link+'junk_before', -1+'|'+cart_img0).split('|');
	this.junk_after = GM_getValue(cart_link+'junk_after', -1+'|'+cart_img0).split('|');
	this.junk_except = GM_getValue(cart_link+'junk_except', false);
	this.mofamotor_except = GM_getValue(cart_link+'mofamotor_except', false);
	this.cart_setup_display = GM_getValue(cart_link+'display', 'none');
	this.cart_status;
	this.interval_time;
	cart_auslesen()
}

function cart_auslesen(){
	cart_status = 'collect';
	interval_time = strToSec(document.getElementById('counter2').innerHTML);
	if (!interval_time){
		GM_xmlhttpRequest({
			method: 'GET',
			url: cart_link+'/activities/',
			onload: function(content){
				if(!html2dom(content.responseText).getElementById('my-profile')){
					cart_auslesen()
					return;
				}
				var doc = html2dom(content.responseText.match(/<form name="xycoords"(\s|.)*?<\/form/g)[0]);
				if (doc.getElementsByName('bottlecollect_pending')[0]) cart_status = 'full';
				else if (doc.getElementById('active_process2')){
					interval_time = parseInt(doc.getElementsByTagName('script')[0].firstChild.data.match(/\d+/));
					cart_status = 'collect';
				}
				else{
					interval_time = parseInt(doc.getElementsByTagName('option')[0].value)*60;
					cart_status = 'empty';
				}
				cart_anzeige()
			}
		});
	}
	else cart_anzeige()
}

function cart_anzeige(){

	var cart_css = '<style type="text/css">\n'
		+'.cart_table {display:'+cart_setup_display+'; border-top:1px solid #968080}\n'
		+'.cart_button {height:20px; text-align:center; color:#fcf7f2; background-image:url('+img_link+'/icons/button.jpg); border:1px solid #000000; -moz-border-radius:3px}\n'
		+'.cart_bg_img {background-image:url('+img_link+'/topmenu/sprite_icons.png); width:28px; height:21px}\n'
		+'#cart_div table {width:100%}\n'
		+'#cart_div td {padding:0px}\n'		//fix for donation-page
		+'#cart_div input {text-align:right; font-size:10px}\n'
		+'#cart_before, #cart_after {width:22px; text-align:left; cursor:pointer}\n'
		+'#cart_div:hover .hover1 {display:block}\n'
		+'.drop, .junk_info {display:none}\n'
		+'.junk_value_drop:hover .junk_info {display:block}\n'
		+'</style>\n';

	var cart_table_empty = '<table><tr>'
		+'<td class=\"cart_bg_img\" style=\"background-position:-3px -161px\"></td>'
		+'<td id=\"cart_time\" style=\"width:50px; text-align:center; font-weight:bold\">'+cart_status+'</td>'
		+'<td id=\"cart_empty\" class=\"cart_button\" style=\"min-width:66px; color:#9fa099\">Empty cart</td>'
		+'<td><i>auto</i></td>'
		+'<td style=\"width:17px\"><input id=\"cart_auto\" type=\"checkbox\" '+(auto ? 'checked=\"checked\"' : '')+'></td>'
		+'</tr></table>';

	var cart_table_junk = '<table id=\"cart_junk\" style=\"display:'+cart_setup_display+'; border-top:1px solid #968080\"><tr>'
		+'<td class=\"cart_bg_img\" style=\"background-position:-2px -262px\"></td>'
		+'<td style=\"width:45px\"><b>&nbsp;Before:</b></td>'
		+'<td id=\"cart_before\"><img src=\"'+junk_before[1]+'\" height=\"15px\ "title=\"click for setup\"></td>'
		+'<td style=\"width:35px\"><b>After:</b></td>'
		+'<td id=\"cart_after\"><img src=\"'+junk_after[1]+'\" height=\"15px\ title=\"click for setup\"></td>'
		+'<td><i>set</i></td>'
		+'<td style=\"width:17px\"><input id=\"junk_except\" type=\"checkbox\" '+(junk_except ? 'checked=\"checked\"' : '')
		+((junk_before[0] == -1 || junk_after[0] == -1) ? 'disabled=\"disabled\"' : '')+'></td>'
		+'</tr></table>';

	var cart_table_time = '<table id=\"time_out\" style=\"display:'+cart_setup_display+'; border-top:1px solid #968080\"><tr>'
		+'<td style=\"width:28px; height:21px; text-align:center; background-image:url('+img_link+'/icons/clock.png); background-position:6px 3px; background-repeat:no-repeat\" title=\"time-out\">'
		+'<img src=\"'+cart_img0+'\" width=\"12px\"></td>'
		+'<td align=\"left\">&nbsp;<input id=\"time_out_start\" type=\"text\" size=\"4\" maxlength=\"5\" value=\"'+time_out_start+'\" title=\"begin time-out (hh:mm)\"> - '
		+'<input id=\"time_out_ende\" type=\"text\" size=\"4\" maxlength=\"5\" value=\"'+time_out_ende+'\" title=\"end time-out (hh:mm)\"></td>'
		+'<td><i>set</i></td>'
		+'<td style=\"width:17px\"><input id=\"time_out_except\" type=\"checkbox\" '+(time_out_except ? 'checked=\"checked\"' : '')+'></td>'
		+'</tr></table>';

	var cart_table_mofamotor = '<table id=\"mofamotor\" style=\"display:'+cart_setup_display+'; border-top:1px solid #968080\"><tr>'
		+'<td style=\"width:28px; height:21px; text-align:center; background-image:url('+img_link+'/plunder/mofamotor.png); background-position:2px -3px; background-repeat:no-repeat\" title=\"Mofamotor\"></td>'
		+'<td align=\"left\"><b>&nbsp;Time reduction 20%</b></td>'
		+'<td><i>set</i></td>'
		+'<td style=\"width:17px\"><input id=\"mofamotor_except\" type=\"checkbox\" '+(mofamotor_except ? 'checked=\"checked\"' : '')+'></td>'
		+'</tr></table>';

	var cart_debug_div = '<div id=\"debug\" style=\"display:'+cart_setup_display+'\"></div>';

	var cart_setup = '<div id=\"cart_setup_button\" class=\"hover1 drop\" style=\"position:absolute; width:26px; bottom:-18px; right:-3px; '
		+'text-align:center; background-color:#901010; border:3px solid #968080; -moz-border-radius:3px; cursor:pointer; overflow:hidden\">'
		+'<img src=\"'+((cart_setup_display == 'none') ? cart_img1 : cart_img2)+'\"></div>\n';

	document.getElementById('cart_div').innerHTML = cart_css + cart_table_empty + cart_table_junk + cart_table_time + cart_table_mofamotor + cart_debug_div + cart_setup;
	
//---add-listener--------------------------------------------------------------------------

	document.getElementById('cart_setup_button').addEventListener('click', function (){
		if (cart_setup_display == 'none'){
			cart_setup_display = '';
			document.getElementById('time_out').style.display = '';
			document.getElementById('cart_junk').style.display = '';
			document.getElementById('mofamotor').style.display = '';
			document.getElementById('debug').style.display = '';
			document.getElementById('cart_setup_button').firstChild.src = cart_img2;
		}
		else {
			cart_setup_display = 'none';
			document.getElementById('time_out').style.display = 'none';
			document.getElementById('cart_junk').style.display = 'none';
			document.getElementById('mofamotor').style.display = 'none';
			document.getElementById('debug').style.display = 'none';
			document.getElementById('cart_setup_button').firstChild.src = cart_img1;
		}
		GM_setValue(cart_link+'display', cart_setup_display);
	},false);

	document.getElementById('cart_auto').addEventListener('click', function (){
		GM_setValue(cart_link+'auto', document.getElementById('cart_auto').checked);
		clearTimeout(aktiv);
		cart_config();
	},false);

	document.getElementById('time_out').addEventListener('keydown', function (){
		document.getElementById('time_out_except').checked = false;
	},false);

	document.getElementById('time_out_except').addEventListener('click', function (){
		GM_setValue(cart_link+'time_out_start', document.getElementById('time_out_start').value);
		GM_setValue(cart_link+'time_out_ende', document.getElementById('time_out_ende').value);
		GM_setValue(cart_link+'time_out_except', document.getElementById('time_out_except').checked);
		clearTimeout(aktiv);
		cart_config();
	},false);

	document.getElementById('cart_before').addEventListener('click', function (){
		cart_plunder_auswahl('before')
	},false);

	document.getElementById('cart_after').addEventListener('click', function (){
		cart_plunder_auswahl('after')
	},false);

	document.getElementById('junk_except').addEventListener('click', function (){
		GM_setValue(cart_link+'junk_except', document.getElementById('junk_except').checked);
		clearTimeout(aktiv);
		cart_config();
	},false);

	document.getElementById('mofamotor_except').addEventListener('click', function (){
		GM_setValue(cart_link+'mofamotor_except', document.getElementById('mofamotor_except').checked);
		clearTimeout(aktiv);
		cart_config();
	},false);

//---calculate-----------------------------------------------------------------------------

	if (time_out_except && auto){		//ausnahmezeit berechnen
		var sec_start = strToSec(time_out_start + ':00');
		var sec_ende = strToSec(time_out_ende + ':00');
		var sec_diff = (sec_ende - sec_start + 172800) % 86400;
		var sec_time = sec_start + sec_diff;
		var now = (new Date().getHours() * 3600) + (new Date().getMinutes() * 60) + new Date().getSeconds();
		var now2 = now + 86400;
		if ((now > sec_start && now < sec_time) || (now2 > sec_start && now2 < sec_time)){
			interval_time = (sec_time - now) % 86400;
			cart_status = 'timeout';
		}
	}

	if (cart_status == 'full'){		//wagen voll
		document.getElementById('cart_time').innerHTML = cart_status;
		document.getElementById('cart_time').style.color = '#bc0000';
		document.getElementById('cart_empty').style.color = '#fcf7f2';
		document.getElementById('cart_empty').style.cursor = 'pointer';
		document.getElementById('cart_empty').addEventListener('click', function (){cart_action('manually', 'before')},false);
		if (auto) cart_action('automatically', 'before');		//wagen voll, automatisch
	}
	else{		//cart empty, new interval
		if (mofamotor_except && cart_status == 'empty') interval_time = parseInt(interval_time * 0.8);		//mofamotor in use, no timeout
		if (auto && cart_status != 'timeout') interval_time += rnd();		//automatisch, no timeout
		interval(interval_time)
	}
	debug()
}

//---functions-----------------------------------------------------------------------------

function interval(time){
	time--;
	aktiv = setTimeout(function (){
		if (time >= 0){
			document.getElementById('cart_time').innerHTML = secToStr(time);
			interval(time);
		}
		else cart_auslesen()
	}, 1000);
}

function cart_action(modus, stat){		//eine scheiss-idee :(
	action_status = stat;		//debug
	debug()
	if (junk_except){
		if (stat == 'before') cart_plunder_wechsel(modus, 'empty', junk_before[0])
		if (stat == 'empty') cart_ausleeren(modus, 'after')
		if (stat == 'after') cart_plunder_wechsel(modus, false, junk_after[0])
	}
	else if (stat) cart_ausleeren(modus, false)
}

function cart_ausleeren(modus, stat){
	GM_xmlhttpRequest({
		method: 'POST',
		url: cart_link+'/activities/bottle/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('bottlecollect_pending=True'),
		onload: function(content) {
			if(!html2dom(content.responseText).getElementById('my-profile')){
				cart_ausleeren(modus, stat)
				return;
			}
			var doc = html2dom(content.responseText.match(/<form name="xycoords"(\s|.)*?<\/form/g)[0]);
			if (!doc.getElementsByName('bottlecollect_pending')[0]){
				var menge = html2dom(content.responseText).getElementById('ntext').getElementsByTagName('p')[0].innerHTML.match(/\d+/);
				cart_status = 'empty';
				document.getElementById('cart_time').innerHTML = cart_status;
				interval_time = parseInt(doc.getElementsByTagName('option')[0].value)*60;
				showMsg('Instruction', 'Cart was emptied '+modus+'! '+(menge > 0 ? 'You found '+menge+' Bottles.' : '')+' Next call in '+interval_time/60+' min.', 'bottle');
				emptied++;		//debug
				bottles_found = menge;
				debug()
				cart_action(modus, stat)
				cart_anzeige()
			}
			else{
				cart_ausleeren(modus, stat)
				return;
			}
		}
	});
}

function cart_plunder_wechsel(modus, stat, new_plunder){
	GM_xmlhttpRequest({
		method: 'get',
		url: cart_link+'/stock/plunder/',
		onload: function(content){
			if(!html2dom(content.responseText).getElementById('my-profile')){
				setTimeout(function (){cart_plunder_wechsel(modus, stat, new_plunder)}, 1000);
				return;
			}
			var doc = html2dom(content.responseText.match(/plunderlist(\s|.)*?submenu/g));
			var item = doc.getElementsByClassName('box special')[0].getElementsByTagName('h4')[0].childNodes[1].nodeValue.substr(1);
			var table = doc.getElementsByClassName('trhover');
			for (i in table){
				if (table[i].getElementsByTagName('a')[0].firstChild.data == new_plunder && item != new_plunder){
					var id = table[i].getElementsByTagName('a')[0].href.match(/'(\d+)'/)[1];
					junk_id = id;		//debug
					debug()
				}
			}
			if (id){
				GM_xmlhttpRequest({
					method: 'POST',
					url: cart_link+'/stock/plunder/change/',
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: encodeURI('f_plunder='+id),
					onload: function(content){
						var doc = html2dom(content.responseText.match(/plunderlist(\s|.)*?submenu/g));
						junk_use = doc.getElementsByClassName('box special')[0].getElementsByTagName('h4')[0].childNodes[1].nodeValue.substr(1);		//debug
						debug()
						cart_action(modus, stat)
					}
				});
			}
			else{
				junk_use = 'error';		//debug
				debug()
				showMsg('Attention!', 'Can&acute;t change junk.', 'error');
				setTimeout(function (){cart_action(modus, stat)}, 5000);
			}
		}
	});
}

function cart_plunder_auswahl(modus){
	if (!document.getElementById('cart_plunder_save')){
		var cart_plunder_div = '<div style=\"position:absolute; top:220px; left:150px; width:650px; padding:4px; text-align:left; '
			+'text-transform:none; background-color:#fcfcdf; border:1px solid #000000; -moz-border-radius:3px; z-index:60\">'
			+'<b>junk change <u>'+modus+'</u> the shopping cart is empty</b><br><br><ul>';
		GM_xmlhttpRequest({
			method: 'get',
			url: cart_link+'/stock/plunder/',
			onload: function(content){
				var doc = html2dom(content.responseText.match(/plunderlist(\s|.)*?submenu/g));
				var item = [], img = [], values = [], use = 0;
				var in_use = doc.getElementsByClassName('box special')[0];
				try{
					item.push(in_use.getElementsByTagName('h4')[0].childNodes[1].nodeValue.substr(1));
					img.push(in_use.getElementsByTagName('img')[0].src);
					values.push(in_use.getElementsByTagName('ul')[0].innerHTML);
				}
				catch (e){
					item.push('Kein Plunder angelegt');
					img.push('http://static.pennergame.de/img/pv4/icons/mail_del.png');
					values.push('');
				}
				junk_use = item[0];		//debug
				debug()
				var table = doc.getElementsByClassName('trhover');
				for (i in table){
					if (!table[i].innerHTML.match('icon_equip-off|'+item[use])){
						item.push(table[i].getElementsByTagName('a')[0].firstChild.data);
						img.push(table[i].getElementsByTagName('img')[0].src);
						values.push(table[i].getElementsByClassName('hide')[0].innerHTML);
					}
				}
				for (i in item){
					var info = '<div class=\"junk_info drop\" style=\"position:absolute; left:60px; bottom:22px; min-width:180px; background-color:#ffffff; '
						+'opacity:0.9; padding:6px; border:1px solid #000000; -moz-border-radius:3px; z-index:70\">'
						+'<img style=\"position:absolute; right:4px; top:3px\" src=\"'+img[i]+'\" height=\"22px\">'
						+'<p class=\"line\"><b>'+item[i]+'</b>&emsp;&emsp;</p>'+values[i]+'</div>';
					cart_plunder_div += '<li class=\"zleft junk_value_drop\" style=\"position:relative; width:200px; cursor:default\">'
						+'<table cellspacing=\"0\"><tr>'
						+'<td><input type=\"radio\" name=\"cart_junk_check\" onclick=\"javascript:document.getElementById(\'cart_plunder_save\').innerHTML = \'save\';\"></td>'
						+'<td>&nbsp;<img src=\"'+img[i]+'\" height=\"18px\"></td><td>&nbsp;'+item[i]+'</td></tr></table>'+info+'</li>';
				}
				cart_plunder_div += '</ul><div id=\"cart_plunder_save\" style=\"position:absolute; bottom:4px; right:4px; width:40px; background-color:#901010; color:#e4e4e4; '
					+'cursor:pointer; font-size:12px; font-weight:bold; text-align:center; padding:2px; border:1px solid #000000; -moz-border-radius:3px\">close</div></div>';

				var cart_plunder_setup = document.getElementById('topmenu').appendChild(document.createElement('div'));
				cart_plunder_setup.innerHTML = cart_plunder_div;
				document.getElementById('cart_plunder_save').addEventListener('click', function(){
					for (i in item){
						if (document.getElementsByName('cart_junk_check')[i].checked){
							GM_setValue(cart_link+'junk_'+modus, item[i]+'|'+img[i]);
							clearTimeout(aktiv);
							cart_config();
						}
					}
					document.getElementById('topmenu').removeChild(cart_plunder_setup);
				},false);
			}
		});
	}
}

function html2dom(content){		//make a valid DOM-document
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument('', '', dt);
	var html = doc.createElement('html');
	html.innerHTML = content;
	doc.appendChild(html);
	return doc;
}

function secToStr(sec){		//umrechnung sekunden in minuten/stunden
	var s = sec%60;
	var m = parseInt(sec/60);
	m = m % 60;
	var h = parseInt(sec/3600);
	h = h % 24;
	s < 10 ? s = '0' + s : '';
	(m < 10 && h > 0) ? m = '0' + m : '';
	return (h > 0 ? h + ':' : '') + m + ':' + s;
}

function strToSec(str){		//umrechnung string in sekunden
	if (isNaN(parseInt(str))) str = '0';
	var t = str.split(':');
	while (t.length < 3) t.unshift(0)
	var h = parseFloat(t[0]);
	var m = parseFloat(t[1]);
	var s = parseFloat(t[2]);
	return h * 3600 + m * 60 + s;
}

function showMsg(title, text, pic){		//meldung - ueberschrift, hinweistext, bild
	window.setTimeout("PgFunction.showMsg($('notifyme'), '"+title+"', '<b>"+text+"</b>', '"+pic+"')", 100);
}

function rnd(){		//zufallszahl zwischen 20 und 40
	return(Math.round(Math.random()*20+20));
}

function update(){		//update, now minus last_update = daily
	var now = (new Date().getTime()/86400000).toString().split('\.')[0];
	var last_update = GM_getValue('last_update','0');
	if (now-last_update >= 1){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/84573.meta.js',
			onload: function(content) {
				var scriptname = (/@name\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversion = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1];
				if (newversion != version){
					if (confirm('\tUpdate available for the Greasemonkey script\n\n"'+scriptname+'"\n\n\t\t\tClick OK to install now')){
						window.location.href = 'http://userscripts.org/scripts/source/84573.user.js';
					}
				}
			}
		}, false);
		GM_setValue('last_update', now);
	}
}

document.getElementById('cart_div').addEventListener('dblclick', function(mouseEvent){		//alles verschieben mit dblclick
	var objDrag = document.getElementById('cart_div');
	var oldX = mouseEvent.pageX;
	var oldY = mouseEvent.pageY;
	var objX = objDrag.offsetLeft;
	var objY = objDrag.offsetTop;
	var newX = 0;
	var newY = 0;
	var move = function (mouseEvent){
		newX = mouseEvent.pageX;
		newY = mouseEvent.pageY;
		objDrag.style.left = (objX + newX - oldX) + 'px';
		objDrag.style.top = (objY + newY - oldY) + 'px';
	}
	document.body.addEventListener('mousemove', move, true);
	objDrag.addEventListener('click', function (){		//aktuelle position speichern
		document.body.removeEventListener('mousemove', move, true);
		objDrag.style.cursor = 'auto';
		if (newX != 0 || newY != 0){
			GM_setValue(cart_link+'div_left',(objX + newX - oldX)+'px');
			GM_setValue(cart_link+'div_top',(objY + newY - oldY)+'px');
		}
	},false);
	objDrag.style.cursor = 'move';
}, false);

//---debug---------------------------------------------------------------------------------

function debug(){
	if (use_debug) document.getElementById('debug').innerHTML = '<div style=\"padding:3px; text-align:left; border-top:1px solid #968080\">'
		+'cart_status: '+cart_status+'<br>'
		+'interval_time: '+secToStr(interval_time)+'<br>'
		+'action_status: '+action_status+'<br>'
		+'junk_use: '+junk_use+'<br>'
		+'junk_id: '+junk_id+'<br>'
		+'bottles_found: '+bottles_found+'<br>'
		+'cart_emptied: '+emptied+'<br><hr>'
		+'auto: '+GM_getValue(cart_link+'auto', false)+'<br>'
		+'junk_except: '+GM_getValue(cart_link+'junk_except')+'<br>'
		+'time_out_except: '+GM_getValue(cart_link+'time_out_except')+'<br>'
		+'mofamotor_except: '+GM_getValue(cart_link+'mofamotor_except')+'<br><hr>'
		+'junk_before: '+GM_getValue(cart_link+'junk_before', -1+'|'+cart_img0).split('|')[0]+'<br>'
		+'junk_after: '+GM_getValue(cart_link+'junk_after', -1+'|'+cart_img0).split('|')[0]+'<br>'
		+'time_out_start: '+GM_getValue(cart_link+'time_out_start')+'<br>'
		+'time_out_end: '+GM_getValue(cart_link+'time_out_ende')+'<br>'
		+'<div>';
}action_status