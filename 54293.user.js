// ==UserScript==
// @author	kirilloid
// @name		Travian key binder
// @namespace	http://userscripts.org/
// @include	http://s*.travian*
// @exclude	http://shop.travian*
// ==/UserScript==
try {
	
var keys = [
	,,,, ,,,,  'backspace','tab',,, 'gray5','enter',,, //16
	'shift','ctrl','alt','break', 'capsLock',,,,  ,,,'esc', ,,,, //32
	'space','pageUp','pageDown','end', 'home','left','up','right',  'down',,,, 'printScreen','ins','del',, //48
	'n10','n1','n2','n3', 'n4','n5','n6','n7',  'n8','n9',,'semicolon', ,,,, //64
	   ,'a','b','c', 'd','e','f','g',  'h','i','j','k', 'l','m','n','o', //80
	'p','q','r','s', 't','u','v','w',  'x','y','z','leftWin', 'rightWin','menu',,, //96
	'N10','N1','N2','N3', 'N4','N5','N6','N7',  'N8','N9','wildcard','plus', ,'minus','grayDel','graySlash', //112
	'F1','F2','F3','F4', 'F5','F6','F7','F8',  'F9','F10','F11','F12', ,,,, //128
	,,,, ,,,,  ,,,, ,,,, //144
	'numLock','scrollLock',,, ,,,,  ,,,, ,,,, //160
/*	,,,, ,,,,  ,,,'favorites', ,'mute','volumeDown','volumeUp', //176
	'nextTrack','prevTrack','stop','play', ,,,,  ,,,, 'colon',,'dot','slash', //192 */
	,,,, ,,,,  ,,,, ,,,, //176
	,,,, ,,,,  ,,,, 'colon',,'dot','slash', //192 
	'tilde',,,, ,,,,  ,,,, ,,,, //208
	,,,, ,,,,  ,,,'leftbracket', 'backslash','rightbracket','apostrophe',, //224
	,,,, ,,,,  ,,,, ,,, //256
];
for (b = 0; b < 256; b++) {
	if (!keys[b]) keys[b] = "_"+b;
}
	
var $ = function(id) {
	return document.getElementById(id);
}
	
// Storage procedures
// TODO: add userData support for IE
if (!GM_setValue) {
	GM_setValue = function(key, value) {
		var new_time = (new Date((new Date().getTime())+10*365*24*60*60*1000)).toUTCString();
		document.cookie = "tkb_"+key+"="+encodeURIComponent(value)+";expires="+new_time;
	}
}

if (!GM_getValue) {
	GM_getValue = function(key, defaultValue) {
		var regex = new RegExp("(?:^|;)tkb_"+key+"=.*?(?:;|$)");
		if (m = document.cookie.match(regex)) {
			return decodeURIComponent(m[1]);
		} else {
			return defaultValue;
		}
	}
}

var nav_to = function(url) {
	window.location = url;
}

var nav_to_gid = function(gid) {
	nav_to("build.php?gid="+gid);
}

var is_our = function() {
	return lmid2.childNodes[1].className == 'txt_menue';
}

if (window.location.href.match('login[.]php')) {
	document.forms[0].getElementsByTagName('input')[2].focus();
}

var msg_rpt_table = false;
var lmid2 = $('content');
var vil_nums = false;
var vil_idx = 0;
var right_panel = $('side_info');
var res_panel = $('res');

var gp_path;
try {
	gp_path = res_panel.getElementsByTagName('img')[0].src.replace("img/un/r/1.gif", "");
} catch(e) {}

if (nav_bar = $('navi_table')) {
	profile_link = nav_bar.getElementsByTagName('a')[2];
} else {
	profile_link = $('side_navi').getElementsByTagName('a')[4];
}
var user_id = profile_link.href.replace(/.*uid=(\d+)/, "$1");

if (right_panel.firstChild) try {
	vil_list = right_panel.getElementsByTagName('table')[0];
	vil_nums = vil_list.rows.length;
	while  ( vil_list.rows[vil_idx]
	&&		(vil_list.rows[vil_idx].cells[0].firstChild.className != "c2")
	&&		(vil_list.rows[vil_idx].className != "sel"))
	{ vil_idx++ };
} catch(e) {}

//default controller
var controller = {
	actions: {
		tilde: function() { nav_to('dorf1.php') },
		k: function() { nav_to('karte.php') }, // Karte
		backslash: function() { nav_to('statistiken.php') },
		p: function() {	nav_to('berichte.php') }, // rePorts
		i: function() {	nav_to('nachrichten.php') }, // Igm
		q: function() {	nav_to('dorf3.php') }, // just dorf3 =P
		
		a: function() {	nav_to('a2b.php') },
		z: function() {	nav_to('allianz.php') },
		f: function() {	nav_to('spieler.php?s=1') }, // proFile
		esc: function() { nav_to('login.php') },
		
		b: function() { nav_to_gid(19) }, // Barracks
		s: function() { nav_to_gid(20) }, // Stable
		w: function() { nav_to_gid(21) }, // Workshop
		h: function() { nav_to_gid(24) }, // townHall
		m: function() { nav_to_gid(17) }, // Marketplace
		e: function() { nav_to_gid(10) }, // warEhouse
		g: function() { nav_to_gid(11) }, // Granary
		n: function() { nav_to('build.php?gid=17&t=3') }, // Npc-trader
		x: function() { nav_to('build.php?id=40') }, // wall
		r: function() { nav_to('build.php?id=39') }, // Rally point
		v: function() { nav_to_gid(37) }, // taVern
		l: function() { nav_to_gid(12) }, // bLacksmith
		o: function() { nav_to_gid(13) }, // armOry
		t: function() { nav_to_gid(36) }, // Trapper
		home: function() { nav_to_gid(15) }, // Main Building
		
		up: function() { if(vil_nums){vil_idx = vil_idx?--vil_idx:vil_nums-1; nav_to(vil_list.getElementsByTagName('a')[vil_idx].href)} },
		down: function() { if(vil_nums){vil_idx = ++vil_idx % vil_nums; nav_to(vil_list.getElementsByTagName('a')[vil_idx].href)} },
		plus: function() { nav_to('plus.php?id=3') },
	}
}

if (window.location.href.match(/nachrichten[.]php([?&]s=\d+)?([?&]t=\d)?(\&o=1)?$/)
||	window.location.href.match(/berichte[.]php([?&]s=\d+)?(\&o=1)?$/)) {
	if (document.forms[0]) {
		var msg_rpt_table = document.forms[0].getElementsByTagName('table')[0];
		// explicit date sorting order
		var send_text = msg_rpt_table.rows[0].cells[msg_rpt_table.rows[0].cells.length-1].firstChild;
		if (send_text.firstChild
		&&	send_text.firstChild.firstChild) {
			send_text.firstChild.firstChild.innerHTML +=
				window.location.href.match(/\&o=1/)?' &uarr;':' &darr;';
		}		
		if (document.forms[0].name != 'adressbuch') { // we're not writing msg
			msg_rpt_table.rows[0].insertCell(0).innerHTML = '#';
			var total = msg_rpt_table.rows.length - 2;
			for(i=0; i<total; i++) msg_rpt_table.rows[i+1].insertCell(0).innerHTML = (i+1);
			msg_rpt_table.rows[total+1].insertCell(0).innerHTML = '*';
			
			var nav_elt = msg_rpt_table.rows[total+1].cells[msg_rpt_table.rows[total+1].cells.length-1];
			controller.actions.num = function(n) { nav_to(msg_rpt_table.rows[n].cells[2].firstChild.href) };
			controller.actions.left = function() { if(nav_elt.childNodes[0].href) nav_to(nav_elt.childNodes[0].href) };
			controller.actions.right = function() { if(nav_elt.childNodes[1].href) nav_to(nav_elt.childNodes[1].href) };
			controller.actions.numpad = function(n) { msg_rpt_table.rows[n].cells[1].firstChild.click() };
				//						document.getElementsByName('n'+n))[0].click()
			controller.actions.wildcard = function() { for(i=0;i<total;i++) msg_rpt_table.rows[i+1].cells[1].firstChild.click() };
			controller.actions.del = function() { document.getElementsByName('del')[0].click() };
			controller.actions.ins = function() { document.getElementsByName('archive')[0].click() };
			controller.actions.s = function() { nav_to(msg_rpt_table.rows[0].cells[msg_rpt_table.rows[0].cells.length-1].firstChild.href) };
		} else { // we're writing msg
//			protect_box(['an', 'be', 'message']);
			controller.actions.a = function() {
				document.forms[1].getElementsByTagName('table')[0].rows[1].cells[3].firstChild.click();
				//toggleFriendsList(); return false;
			};
		}
	}
}

if (window.location.href.match(/berichte\.php\?id/)) {
	var troops_tables = lmid2.getElementsByTagName('table')[0].rows[3].cells[0].getElementsByTagName('table');
	var xcell = troops_tables[0].rows[0].cells[1];
	var url_e = 'a2b.php?z='+xcell.lastChild.href.replace(/^.*d=(\d+).*$/, "$1");
	controller.actions.e = function() { nav_to(url_e) };
	xcell.innerHTML += ' <strong>[<a href="'+url_e+'">E</a>]</strong>';
	for (i=1; i<troops_tables.length; i++) {
		xcell = troops_tables[i].rows[0].cells[1];
		if (xcell.childNodes.length > 1) {
			var url_d = 'a2b.php?z='+xcell.lastChild.href.replace(/^.*d=(\d+).*$/, "$1");
			controller.actions.d = function() { nav_to(url_d) };
			xcell.innerHTML += ' <strong>[<a href="'+url_d+'">D</a>]</strong>';
		}
	}
}

if (window.location.href.match(/nachrichten\.php\?id/)) {
	var msg_rpt_table = document.forms[0].getElementsByTagName('table')[0];
	var s = msg_rpt_table.rows[4].cells[1].innerHTML;
	s = s.replace(/(http[^\s<]*)/g, "<a href=\"$1\">$1</a>");
	msg_rpt_table.rows[4].cells[1].innerHTML = s;
	controller.actions.r = function() { document.forms[0].submit() }
}

if (window.location.href.match(/plus[.]php\?id=3$/)) {
	controller.actions.f = function() {
		nav_to('plus.php?id=3&a=7&uid='+user_id);
	};
}

function rebuild_od() {
	var counter = 0;
	od.innerHTML = '';
	var links_idx = 0;
	delete links;
	var links = new Array();
	for(x=0; x<7; x++) {
		for(y=0; y<7; y++) {
			if(!$('i_'+x+'_'+y).src.replace(/^.*?(\w+)\.gif/, "$1").match(/t\d/)) {
				links[counter++] = $('a_'+x+'_'+y).href;
				od.innerHTML +=
					'<span style="position:absolute; right:'+(463-x*37-y*36)+'px; top:'+(221+(x-y)*20)+'px;'
				+	' z-index:1000; font-weight:bold; padding:0px 1px;">' + counter + '</span>';
			}
		}
	}
	var xspans = od.getElementsByTagName('span');
	f_before = function() {
		if(links_idx) with (xspans[links_idx-1].style) {
			backgroundColor = 'transparent';
		}
	}
	f_after = function() {
		if (links_idx > counter) {
			links_idx = 0;
		} else {
			if(links_idx) with (xspans[links_idx-1].style) {
				backgroundColor = 'yellow';
			}
		}		
	}
	controller.actions.num = function(n) {
		f_before();
		links_idx *= 10;
		links_idx += (n==10?0:n);			
		if (links_idx > counter) links_idx = counter;
		f_after();
	};
	controller.actions.F4 = function() { f_before(); links_idx=0; }
	controller.actions.del = F4;
	controller.actions.numpad = function(n) { nav_to(links[n-1]); }
	controller.actions.enter = function() { if(links_idx)nav_to(links[links_idx-1]) } 
}

/*if (window.location.href.match(/karte\.php([?&]newdid=\d+)?([?&]z=\d+)?$/)) {
	var mdiv = $('map_content').childNodes[1];
	mdiv.innerHTML += '<div style="width:100%;height:100%" id="over_display"></div>';
	var od = $('over_display');
	for(i=1; i<=4; i++) {
		$('ma_n'+i).addEventListener('click',
			function(e){setTimeout(rebuild_od, 500)}, false);
		$('ma_n'+i+'p7').addEventListener('click',
			function(e){setTimeout(rebuild_od, 500)}, false);
	}
	controller.actions.left =	function() { setTimeout(rebuild_od, 500) };
	controller.actions.right =	function() { setTimeout(rebuild_od, 500) };
	controller.actions.up =	function() { setTimeout(rebuild_od, 500) };
	controller.actions.down =	function() { setTimeout(rebuild_od, 500) };
	controller.actions.x = function() { document.getElementsByName('xp')[0].focus() };
	rebuild_od();
}*/

if (window.location.href.match(/karte\.php\?d/)) {
	var xdivs = lmid2.getElementsByTagName('div');
	var map_details_troops = xdivs[xdivs.length-4];
	if (map_details_troops.className != 'map_details_troops')
		map_details_troops = false;
	else {
		xcell = map_details_troops.lastChild.rows[0].cells[1];
		xcell.innerHTML = '<ol style="margin:0px; padding-left:8px;">' + xcell.innerHTML + '</ol>';
	}
	var pos = location.href.replace(/^.*\?d=(\d+).*$/, "$1");
	controller.actions.a = function() {
		try {
			nav_to(lmid2.lastChild.lastChild.rows[1].cells[0].firstChild.href);
		} catch(e) {
			alert('Cannot attack!');
		}
	};
	controller.actions.c = function() { nav_to(lmid2.lastChild.lastChild.rows[0].cells[0].firstChild.href) };
	controller.actions.num = function(n) {
		if ((n >= 1) && (n <= 5) && map_details_troops) try {
			window.location.href = 
				xcell.firstChild.childNodes[n-1].firstChild.href;
		} catch(e) { alert('out of range') }
	};
	controller.actions.m = function() {
		nav_to('build.php?z='+pos+'&gid=17');
	}
}

if (window.location.href.match('dorf1.php')) {
	controller.actions.tilde = function() { nav_to('dorf2.php') };
}

if (window.location.href.match('dorf3.php')) {
	links = lmid2.firstChild.getElementsByTagName('a');
	for(i=0; i<links.length; i++)
		links[i].innerHTML = (i+1) + '.' + links[i].innerHTML;
	controller.actions.num = function(n) { nav_to('dorf3.php'+(n==1?'':'?s='+n)) };
}

if (window.location.href.match('statistiken.php')) {
	controller.actions.v = function() { nav_to('statistiken.php?id=2') };
	controller.actions.a = function() { nav_to('statistiken.php?id=4') };
	controller.actions.o = function() { nav_to('statistiken.php?id=31') };
	controller.actions.d = function() { nav_to('statistiken.php?id=32') };
	controller.actions.backslash = function() { nav_to('statistiken.php?id=5') };
	controller.actions.c = function() { nav_to('statistiken.php?id=0') };
	controller.actions.t = function() { nav_to('statistiken.php?id=7') };
	if (document.forms[0]) {
		var xcell;
		if (document.forms[0].getElementsByTagName('table').length) {
			xcell = document.forms[0].getElementsByTagName('table')[2].rows[0].cells[6];
		} else {
			xcell = document.forms[0].parentNode.offsetParent.rows[0].cells[1];
		}
		var xlinks = xcell.getElementsByTagName('a');
		controller.actions.left = function() { nav_to(xlinks[0].href) };
		controller.actions.right = function() { nav_to(xlinks[1].href) };
//		protect_box(['rang', 'spieler']);
	}
}

if (window.location.href.match('build.php?')) {
	var links = lmid2.getElementsByTagName('a');
	controller.actions.u = function() { 
		try {
			nav_to(links[links.length-1].href)
		}catch(e){} 
	};
	// upgrade building if possible
}

if (window.location.href.match('a2b.php')) {
	var t1 = document.getElementsByName('t1')[0];
	if ((document.forms[0]) && (t1.type != 'hidden')) {
		var img = document.forms[0].getElementsByTagName('img')[0];
		var num = img.src.replace(/^.*?\/(\w+)[.]gif$/, "$1");
		if (num == 'x') num = img.className.replace("unit u", "");
		var race = Math.floor(parseInt(num)/10);
		switch(race) {
			case 0: units = {off:0x434, def:0x003, spy:0x010}; break;
			case 1: units = {off:0x425, def:0x012, spy:0x010}; break;
			case 2: units = {off:0x446, def:0x011, spy:0x008}; break;
		}
		function select_troops(troops_mask) {
			var mapping = [0, 4, 8, 1, 5, 9, 2, 6, 3, 8];
			for(var i=0; i<10; i++) {
				var link = document.forms[0].getElementsByClassName('f8')[mapping[i]].getElementsByTagName('a')[0];
				var input = document.getElementsByName('t'+(i+1))[0];
				if (link && (troops_mask & (1<<i))) {
					input.value = link.innerHTML.replace(/[)(]/g,'');
				} else {
					input.value = '';
				}
			}
			if (document.getElementsByName('t11')[0]) { // hero is possible
				if (troops_mask & (1<<10)) {
					document.getElementsByName('t11')[0].value = 1;
				} else {
					document.getElementsByName('t11')[0].value = '';
				}
			}
		}
	//		d = function() { document.getElementsByName('c')[0].click() };
		controller.actions.a = function() { document.getElementsByName('c')[1].click() };
		controller.actions.r = function() { document.getElementsByName('c')[2].click() };
		controller.actions.x = function() { document.getElementsByName('x')[0].focus() };
		controller.actions.o = function() { select_troops(units.off) };
		controller.actions.d = function() { select_troops(units.def) };
		controller.actions.s = function() { select_troops(units.spy) };
	//		c = function() { ;/* select all off + capturing };
		controller.actions.num = function(n) { select_troops(1<<(n-1)) };
	}
}

if (window.location.href.match('allianz.php') && is_our()) { // our allianz
	controller.actions.a = function() { nav_to('allianz.php?s=3') };
	controller.actions.n = function() { nav_to('allianz.php?s=4') };
	controller.actions.o = function() { nav_to('allianz.php?s=5') };
	if (window.location.href.match('s=3')) {
		controller.actions.num = function(n) { nav_to(lmid2.lastChild.rows[n+1].cells[1].firstChild.href) }
	}
}

if (window.location.href.match('spieler.php') && is_our()) { // our allianz
	links = lmid2.childNodes[1].getElementsByTagName('a');
	for(i=0; i<links.length; i++)
		links[i].innerHTML = (i+1) + '.' + links[i].innerHTML;	
	controller.actions.num = function(n) { if(n<=5) nav_to(links[n-1].href) }
}

var xtable = lmid2.getElementsByTagName('table')[0];
if (xtable && (xtable.rows.length == 5)) try { // in tavern	
	for (i=1; i<=5; i++) { xtable.rows[i].cells[3].childNodes[1].innerHTML = i }
	controller.actions.num = function(n) {
		if (n <= 5) nav_to(xtable.rows[n].cells[3].childNodes[1].href);

	}
} catch(e) {};

// key binding
window.addEventListener('keydown', function (e){
	if ( typeof e == "undefined" ) e = window.event;
	var wkey = e.keyCode;
	var func_name = keys[wkey];
	if (!e.altKey && !e.ctrlKey && !e.shiftKey) {
		if (m = func_name.match(/(n)(\d+)/i)) { // (num(?:pad))
			var n = parseInt(m[2]);
			window.status = '#number('+n+')';
			if ((m[1] == 'n')
			&&	controller.actions.num) {
				controller.actions.num(n);
			} else
			if ((m[1] == 'N')
			&&	controller.actions.numpad) {
				controller.actions.numpad(n);
			}
			e.preventDefault();
		} else if (controller.actions[func_name]) {
			controller.actions[func_name].call();
			e.preventDefault();
		}
	}
}, false);

for(f=0; f<document.forms.length; f++)
	for(i=0; i<document.forms[f].elements.length; i++)
		document.forms[f].elements[i].addEventListener(
			'keydown', function(e){e.stopPropagation()}, false
		);

} catch(e) {
	window.status = 'TKB:'+e;
}