// ==UserScript==
// @name	Waffe Eigenheim Plunder wechseln (alle Laender, alle Staedte)
// @version	0.7
// @author	abwasch - pennerhack.foren-city.de
// @description	weapon home junk everywhere change (all countries)
// @include	*pennergame.de/*
// @include	*clodogame.fr/*
// @include	*mendigogame.es/*
// @include	*menelgame.pl/*
// @include	*dossergame.co.uk/*
// @include	*serserionline.com/*
// @include	*bumrise.com/*
// @include	*faveladogame.com.br/*
// @exclude	http://board.*
// @exclude	http://dontknow.me/*
// @exclude	*/redirect/*
// ==/UserScript==

var version = '0.7';
var link = 'http://'+document.URL.split('/')[2];
var div_left = GM_getValue(link+'-div_left', '202px');
var div_top = GM_getValue(link+'-div_top', '130px');

var style_top = [10, 42];
var style_right = [41, -41];
var style_width = [44, 38];
var style_height = [38, 44];
var style_align = ['top', 'left'];
var mystyle = GM_getValue(link+'-style', 0);

var trans_weapon = ['Weapon', 'Waffe', 'Bron', 'Arme', 'Arma', 'Arma', 'Silah'];		//en, de, pl, fr, es, pt, tr		// please send me your translations!
var trans_home = ['Home', 'Eigenheim', 'Mieszkanie', 'Domicile', 'Domicilio', 'Lar','Home'];
var trans_junk = ['Junk', 'Plunder', 'Rupiec', 'Babiole', 'Cachivache', 'Trecos', 'Junk'];
var trans_tip = ['Display area can be moved by double click / click.',
			 'Anzeige verschieben mit Doppelklick / Klick.',
			 'Display area can be moved by double click / click. (Please send me your translation.)',
			 'Display area can be moved by double click / click. (Please send me your translation.)',
			 'Display area can be moved by double click / click. (Please send me your translation.)',
			 'Display area can be moved by double click / click. (Please send me your translation.)',
			 'Display area can be moved by double click / click. (Please send me your translation.)'];
var lang = GM_getValue(link+'-language', 0);

//---css-html-----------------------------------------------------------------------------

var mycss = '<style type="text/css">\n'
	+'.drop {display:none}\n'
	+'.item_div:hover .hover1, .menu:hover .hover2, .setup_list:hover .setup_info {display:block}\n'
	+'.border1 {border:1px solid #000000; -moz-border-radius:3px}\n'
	+'.border3 {border:3px solid #434363; -moz-border-radius:4px}\n'
	+'.text {font-size:12px; font-weight:bold; white-space:nowrap}\n'
	+'.text-center {font-size:12px; font-weight:bold; text-align:center; padding:2px}\n'
	+'.item_div {position:absolute; width:'+style_width[mystyle]+'px; height:'+style_height[mystyle]+'px}\n'
	+'.item_img {position:absolute; right:0px; width:32px; height:32px; background-color:#e4e4e4; overflow:hidden}\n'
	+'.item_info {position:absolute; bottom:48px; right:41px; min-width:80px; background-color:#fcfcdf; padding:4px}\n'
	+'.menu {position:absolute; top:'+style_top[mystyle]+'px; right:'+style_right[mystyle]+'px; width:114px; background-color:#434363; color:#e4e4e4}\n'
	+'.menu_list {background-color:#e4e4e4; color:#434363}\n'
	+'.menu_list:hover {background-color:#434363; color:#e4e4e4; cursor:pointer}\n'
	+'.setup {position:absolute; top:150px; right:300px; width:450px; background-color:#fcfcdf; padding:4px; z-index:50}\n'
	+'.setup_list {position:relative; width:200px; padding:2px; text-align:left; cursor:default}\n'
	+'.setup_info {position:absolute; left:60px; bottom:22px; min-width:180px; background-color:#ffffff; opacity:0.9; padding:6px; z-index:3}\n'
	+'.setup_button {background-color:#e4e4e4; color:#901010}\n'
	+'.setup_button:hover, .close_button, .save_button {background-color:#901010; color:#e4e4e4; cursor:pointer}\n'
	+'</style>\n';

var mydiv = '\n\n<!--Beginn_GM_Script_Waffe_Eigenheim_Plunder_wechseln-->\n'+mycss+'\n'
	+'<div id=\"wep_div\" style=\"position:absolute; top:'+div_top+'; left:'+div_left+'; z-index:100\"\n'		//main frame, shifts all
	+'onmouseover=\"javascript:set=document.getElementById(\'tool_tip\').style;aktiv=setTimeout\(function(){set.display = \'block\'}, 5000\)\"'
	+'onmouseout=\"javascript:clearTimeout(aktiv);set.display = \'none\'\">\n'
	+'<div id=\"weapon\" class=\"item_div\" style=\"'+style_align[mystyle]+':-82px\"></div>\n'
	+'<div id=\"home\" class=\"item_div\" style=\"'+style_align[mystyle]+':-41px\"></div>\n'
	+'<div id=\"junk\" class=\"item_div\" style=\"'+style_align[mystyle]+':0px\"></div>\n'
	+'<div id=\"tool_tip\" class=\"border1 drop\" style=\"position:absolute; top:-40px; left:50px; '
	+'width:100px; background-color:#dffcfc; padding:3px\">'+trans_tip[lang]+'</div>\n'
	+'</div>\n'
	+'<!--Ende_GM_Script_Waffe_Eigenheim_Plunder_wechseln-->\n\n';

//---get-weapon----------------------------------------------------------------------------

function get_weapon(){
	GM_xmlhttpRequest({		//query page
		method: 'GET',
		url: link+'/stock/armoury/',
		onload: function (content){

			if (error('weapon', content.responseText)) return;

			var doc = get_doc(content.responseText.match(/<div class="b75">(\s|.)*?<script/g));		//make DOM-document
			var table = doc.getElementsByTagName('table');
			var item = [], img = [], values = [], id = [], use = 0;
			for (i in table){		//search name, pic, value, id
				item.push(table[i].getElementsByClassName('tiername')[0].firstChild.data);
				img.push(table[i].getElementsByTagName('img')[0].src);
				values.push('ATT'+table[i].getElementsByClassName('att')[0].firstChild.data);
				id.push(table[i].getElementsByClassName('formbutton')[0].previousSibling.value);
				if (table[i].getElementsByClassName('formbutton')[0].disabled) use = id.length-1;
			}

			var filter = GM_getValue(link+'-check_myweapon','');		//load filter

			var div = '<div class=\"item_img border3\"><img style=\"position:absolute; top:-10px; left:-10px\" src=\"'+img[use]+'\" width=\"50px\" height=\"54px\"></div>\n'		//picture
				+'<div class=\"item_info hover1 border1 drop\"><p class=\"line text\">'+item[use]+'</p>'+values[use]+'</div>\n'		//infobox
				+'<div class=\"menu hover1 border3 drop\"><p class=\"text-center\">'+trans_weapon[lang]+'</p><div id=\"weapon_list\">\n';
			for (i in item){		//list of entries
				if (filter.match('/'+item[i]+'/') && i != use) div += '<p class=\"text-center menu_list hover2 drop\" value=\"'+id[i]+'\">'+item[i]+'</p>\n';
			}
			div += '</div><p class=\"text-center setup_button hover2 drop\">setup</p></div>\n';

			document.getElementById('weapon').innerHTML = div;		//add content
			document.getElementById('weapon').style.display = 'block';

			document.getElementById('weapon_list').addEventListener('click', function(mouseEvent){		//menuclick, item change
				document.getElementById('weapon').style.display = 'none';
				var new_id = mouseEvent.explicitOriginalTarget.parentNode.attributes[0].nodeValue;		// :) it's cool..
				GM_xmlhttpRequest({
					method: 'POST',
					url: link+'/stock/armoury/use/',
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: encodeURI('id='+new_id),
					onload: function() get_weapon()
				});
			},false);

			document.getElementById('weapon_list').nextSibling.addEventListener('click', function(){		//call setup
				setup('myweapon', item, -1, values, filter);
			},false);
		}
	});
}

//---get-home------------------------------------------------------------------------------

function get_home(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: link+'/city/home/',
		onload: function (content){

			if (error('home', content.responseText)) return;

			var doc = get_doc(content.responseText.match(/class="listshop"(\s|.)*?<script/g));
			var table = doc.getElementsByTagName('table');
			var item = [], img = [], values = [], id = [], use = 0;
			for (i in table){
				if (!table[i].getElementsByClassName('formbutton')[0].value.match(/\d/)){
					item.push(table[i].getElementsByClassName('tiername')[0].firstChild.data);
					img.push(table[i].getElementsByTagName('img')[0].src);
					values.push('DEF'+table[i].getElementsByClassName('def')[0].firstChild.data);
					id.push(table[i].getElementsByTagName('input')[0].value);
					if (table[i].getElementsByClassName('formbutton')[0].disabled) use = id.length-1;
				}
			}

			var filter = GM_getValue(link+'-check_myhome','');
			
			var div = '<div class=\"item_img border3\"><img style=\"position:absolute; top:-10px; left:-10px\" src=\"'+img[use]+'\" width=\"50px\" height=\"54px\"></div>\n'		//picture
				+'<div class=\"item_info hover1 border1 drop\"><p class=\"line text\">'+item[use]+'</p>'+values[use]+'</div>\n'
				+'<div class=\"menu hover1 border3 drop\"><p class=\"text-center\">'+trans_home[lang]+'</p><div id=\"home_list\">\n';
			for (i in item){
				if (filter.match('/'+item[i]+'/') && i != use) div += '<p class=\"text-center menu_list hover2 drop\" value=\"'+id[i]+'\">'+item[i]+'</p>\n';
			}
			div += '</div><p class=\"text-center setup_button hover2 drop\">setup</p></div>\n';

			document.getElementById('home').innerHTML = div;
			document.getElementById('home').style.display = 'block';

			document.getElementById('home_list').addEventListener('click', function(mouseEvent){
				document.getElementById('home').style.display = 'none';
				var new_id = mouseEvent.explicitOriginalTarget.parentNode.attributes[0].nodeValue;
				GM_xmlhttpRequest({
					method: 'POST',
					url: link+'/city/home/buy/',
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: encodeURI('id='+new_id),
					onload: function() get_home()
				});
			},false);

			document.getElementById('home_list').nextSibling.addEventListener('click', function(){
				setup('myhome', item, -1, values, filter);
			},false);
		}
	});
}

//---get-junk------------------------------------------------------------------------------

function get_junk(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: link+'/stock/plunder/',
		onload: function (content){

			if (error('junk', content.responseText)) return;

			var doc = get_doc(content.responseText.match(/plunderlist(\s|.)*?submenu/g));
			var item = [], img = [], values = [], id = [], use = 0;

			var in_use = doc.getElementsByClassName('box special')[0];
			item.push(in_use.getElementsByTagName('h4')[0].childNodes[1].nodeValue.substr(1));
			img.push(in_use.getElementsByTagName('img')[0].src);
			values.push(in_use.getElementsByTagName('ul')[0].innerHTML);
			id.push(use);

			var table = doc.getElementsByClassName('trhover');
			for (i in table){
				if (!table[i].innerHTML.match('icon_equip-off|'+item[use])){
					item.push(table[i].getElementsByTagName('a')[0].firstChild.data);
					img.push(table[i].getElementsByTagName('img')[0].src);
					values.push(table[i].getElementsByClassName('hide')[0].innerHTML);
					id.push(table[i].getElementsByTagName('a')[0].href.match(/'(\d+)'/)[1]);
				}
			}

			var filter = GM_getValue(link+'-check_myjunk','');

			var div = '<div class=\"item_img border3\"><img src=\"'+img[use]+'\" height=\"32px\"></div>\n'
				+'<div class=\"item_info hover1 border1 drop\"><p class=\"line text\" style=\"min-width:160px\">'+item[use]+'</p>'+values[use]+'</div>\n'
				+'<div class=\"menu hover1 border3 drop\"><p class=\"text-center\">'+trans_junk[lang]+'</p><div id=\"junk_list\">\n';
			for (i in item){
				if (filter.match('/'+item[i]+'/') && i != use) div += '<p class=\"text-center menu_list hover2 drop\" value=\"'+id[i]+'\">'+item[i]+'</p>\n';
			}
			div += '</div><p class=\"text-center setup_button hover2 drop\">setup</p></div>\n';

			document.getElementById('junk').innerHTML = div;
			document.getElementById('junk').style.display = 'block';

			document.getElementById('junk_list').addEventListener('click', function(mouseEvent){
				document.getElementById('junk').style.display = 'none';
				var new_id = mouseEvent.explicitOriginalTarget.parentNode.attributes[0].nodeValue;
				GM_xmlhttpRequest({
					method: 'POST',
					url: link+'/stock/plunder/change/',
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: encodeURI('f_plunder='+new_id),
					onload: function() get_junk()
				});
			},false);

			document.getElementById('junk_list').nextSibling.addEventListener('click', function(){
				setup('myjunk', item, img, values, filter);
			},false);
		}
	});
}

//---get-setup-----------------------------------------------------------------------------

function setup(div_name, item, img, values, filter){

	var save_button = '<div id=\"save_button_'+div_name+'\" class=\"save_button text-center border1\" style=\"position:absolute; bottom:4px; right:4px; width:40px\">save</div>\n';
	var close_button = '<div id=\"close_button_'+div_name+'\" class=\"close_button border1\" style=\"position:absolute; top:4px; right:4px; width:12px; height:12px; overflow:hidden\">'
		+'<p style=\"font-size:22px; font-weight:normal; font-family:sans-serif; margin-left:-3px; margin-top:-9px\">&times;</p></div>\n';

	var setup_list = '<ul>\n';
	for (i in item){		//selection list
		var info = '<div class=\"setup_info border1 drop\"><img style=\"position:absolute; right:-6px; top:3px\" src=\"'+img[i]+'\" height=\"22px\">'
			+'<p class=\"line text\">'+item[i]+'&emsp;&emsp;</p>'+values[i]+'</div>';
		setup_list += '<li class=\"zleft setup_list\">'
			+'<input type=\"checkbox\" name=\"check\" '+(filter.match('/'+item[i]+'/') ? 'checked=\"checked\"' : '')+'>&nbsp;'+item[i]+info+'</li>&emsp;\n';
	}

	var img0 = 'data:image/gif;base64,R0lGODlhBwAXAIAAAAAAAP///yH5BAkAAAEALAAAAAAHABcAAAIahG+hmhu9IAPuoVPnpU7a6oUbB47l2ZFTuRUAOw==';
	var img1 = 'data:image/gif;base64,R0lGODlhFwAHAIAAAAAAAP///yH5BAkAAAEALAAAAAAXAAcAAAIfhA+Bp2sBYUpR2frwjbM232kUN0qbWX4ieDaOi8BHAQA7';
	var language = ['en', 'de', 'pl', 'fr', 'es', 'pt', 'tr'];

	setup_list += '<li class=\"zclear\">&nbsp;</li></ul>\n'
		+'<table frame=\"above\"><tr><td>style:&nbsp;</td>'
		+'<td><input type=\"radio\" name=\"style\"></td><td><img src='+img0+'></td>'
		+'<td><input type=\"radio\" name=\"style\"></td><td><img src='+img1+'></td>'
		+'<td>language:&nbsp;</td>';
	for (i in language){
		setup_list += '<td><input type=\"radio\" name=\"lang\"></td><td>'+language[i]+'&nbsp;</td>\n';
	}
	setup_list += '</tr></table><div class=\"text\" style=\"color:#901010\">Please send me your translation.</div>';

	var mysetup = div_name;
	mysetup = document.getElementById('my-profile').appendChild(document.createElement('div'));
	mysetup.setAttribute('class', 'setup border1');
	mysetup.innerHTML = setup_list+close_button+save_button;		//setup-window
	document.getElementById('save_button_'+div_name).addEventListener('click', function(){		//click, save setup
		filter = '';
		for (i in item){
			if (document.getElementsByName('check')[i].checked) filter += '/'+item[i]+'/';		//add selection
		}
		GM_setValue(link+'-check_'+div_name,filter);		//save filter

		for (i in document.getElementsByName('style')){		//save style
			if (document.getElementsByName('style')[i].checked){
				GM_setValue(link+'-style',i);
				var reload_page = true;
			}
		}

		for (i in document.getElementsByName('lang')){		//save language
			if (document.getElementsByName('lang')[i].checked){
				GM_setValue(link+'-language',i);
				var reload_page = true;
			}
		}

		if (reload_page){
			window.location.href = document.URL;
			return;
		}

		if(div_name == 'myweapon') get_weapon()		//reload
		if(div_name == 'myhome') get_home()
		if(div_name == 'myjunk') get_junk()
		document.getElementById('my-profile').removeChild(mysetup);
	},false);

	document.getElementById('close_button_'+div_name).addEventListener('click', function(){		//click, close setup-window
		document.getElementById('my-profile').removeChild(mysetup);
	},false);
}

//---start-script--------------------------------------------------------------------------

if (error('my-profile', document.body.innerHTML)) return;
document.getElementById('my-profile').innerHTML += mydiv;		//here comes all in
get_weapon()
get_home()
get_junk()
update()

//---functions-----------------------------------------------------------------------------

document.getElementById('wep_div').addEventListener('dblclick', function(mouseEvent){		//all move with dblclick
	for (var i = 0; i <= 5; i++) document.getElementsByClassName('hover1')[i].style.display = 'none';
	var move = function (mouseEvent){
		newX = mouseEvent.pageX;
		newY = mouseEvent.pageY;
		objDrag.style.left = (objX + newX - oldX) + 'px';
		objDrag.style.top = (objY + newY - oldY) + 'px';
	}
	var oldX = mouseEvent.pageX;
	var oldY = mouseEvent.pageY;
	var newX = newY = 0;
	var curleft = curtop = 0;
	var objDrag = document.getElementById('wep_div');
	var objPos = document.getElementsByClassName('item_img')[1];
	do {		//find position
		curleft += objPos.offsetLeft;
		curtop += objPos.offsetTop;
	} while (objPos = objPos.offsetParent);
	objDrag.style.left = (objDrag.offsetLeft + oldX - curleft - 18) + 'px';		//set position 0, 0
	objDrag.style.top = (objDrag.offsetTop + oldY - curtop - 18) + 'px';
	var objX = objDrag.offsetLeft;
	var objY = objDrag.offsetTop;
	document.body.addEventListener('mousemove', move, true);
	objDrag.addEventListener('click', function (){		//save position
		for (var i = 0; i <= 5; i++) document.getElementsByClassName('hover1')[i].style.display = '';
		document.body.removeEventListener('mousemove', move, true);
		objDrag.style.cursor = 'auto';
		if (newX != 0 || newY != 0){
			GM_setValue(link+'-div_left',(objX + newX - oldX)+'px');
			GM_setValue(link+'-div_top',(objY + newY - oldY)+'px');
		}
	},false);
	objDrag.style.cursor = 'move';
},false);


function update(){		//update, now minus last_update = daily
	now = (new Date().getTime()/86400000).toString().split('\.')[0];
	last_update = GM_getValue('last_update','0');
	if (now-last_update >= 1){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/69409.meta.js',
			onload: function(content) {
				var scriptname = (/@name\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversion = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1];
				if (newversion != version){
					if (confirm('Update available for the Greasemonkey script\n\n"'+scriptname+'"\n\n\t\tClick OK to install now')){
						window.location.href = 'http://userscripts.org/scripts/source/69409.user.js';
					}
				}
			}
		}, false);
		GM_setValue('last_update', now);
	}
}

function get_doc(content){		//make a valid DOM-document
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument('', '', dt);
	var html = doc.createElement('html');
	html.innerHTML = content;
	doc.appendChild(html);
	return doc;
}

function error(func, content){		//error handling
	if (!content.match(/class="avatar"/)){
		document.getElementById(func).innerHTML += '<img src=\"http://static.pennergame.de/img/pv4/icons/mail_del.png\" height=\"10px\">';
		if (func == 'weapon') window.setTimeout(function(){get_weapon()}, 1000);
		if (func == 'home') window.setTimeout(function(){get_home()}, 1000);
		if (func == 'junk') window.setTimeout(function(){get_junk()}, 1000);
		return true;
	}
}