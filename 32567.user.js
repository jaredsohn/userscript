// ==UserScript==
// @author	kirilloid
// @name		Travian key binder
// @namespace	http://userscripts.org/
// @include	http://s*.travian*
// @include	http://rs*.travian*
// @exclude	http://shop.travian*
// ==/UserScript==
function $(t){return document.getElementById(t);}

function nav_to(url) {
	with (window.location) {
		if (url.match(/\//))
			href = url;
		else
			href = href.replace(/(.*)\/.*/, "$1/"+url);
	}
}

function random(min,max){return(Math.round(Math.random() * (max-min)) + min);}

function xy2id(x, y){ return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400))); }

function nav_to_gid(gid) {
	nav_to("build.php?gid="+gid);
}

function is_our() {
	return lmid2.childNodes[1].className == 'txt_menue';
}

if (window.location.href.match('login.php')) {
	document.forms[0].getElementsByTagName('table')[1].rows[0].cells[0].childNodes[2].focus();
}
var msg_rpt_table = false;
var lmid2 = $('lmid2');
var vil_nums = false;
var vil_idx = 0;
if ($('lright1').firstChild) {
	try{
		vil_list = $('lright1').getElementsByTagName('table')[0];
		vil_nums = vil_list.rows.length;
		while (vil_list.rows[vil_idx++].cells[0].firstChild.className != "c2") {};
		vil_idx--;
	}catch(e){}
}
function consol(){
	if(!$('cons')){
		cons=document.createElement("input");
		cons.id="cons";
		cons.setAttribute("style","position:absolute;margin:auto;bottom:100px;border:4px double blue;");
		document.body.appendChild(cons);
		cons.focus();
		removeEventListener('keyup', bind_function, false);
		cons.addEventListener('blur',function(){addEventListener('keyup',bind_function,false);},false);
		cons.addEventListener('focus',function(){removeEventListener('keyup',bind_function,false);},false);
		cons.addEventListener('keydown',function(e){
			if (typeof e == "undefined" ) e = window.event;
			var wkey = e.keyCode;
			var mods = e.which;
			c=$("cons");
			function del(){
				document.body.removeChild(c);
				addEventListener('keyup',bind_function,false);
			}
			if(wkey==27){
				del();
			}
			if(wkey==13){
				if(c.value.length>0){
				v=c.value.toLowerCase();
				v2=c.value;
				for(i=0;i<vil_list.rows.length;i++){//ha falu akkor ugorjon rá
					if(vil_list.rows[i].cells[0].getElementsByTagName("a")[0].innerHTML.toLowerCase()==v){
						location.href=vil_list.rows[i].cells[0].getElementsByTagName("a")[0].href;
						del();
						return;
					}
				}
				if(c.value[0]=="="){//ha művelet akkor futtassa le
					try{
						eval("alert("+c.value.slice(1,c.value.length)+")");
						del();
					}catch(e){alert("Hiba/Error:\n"+e.message)};
				}
				switch(v){
					case "help":location.href="http://help.travian.hu";break;
					case "ism":
					pb=$("ce");
					if(pb!=null){
						var rc="<div class=\"popup3\"><iframe frameborder=\"0\" id=\"Frame\" src=\"manual.php?s="+0+"&typ="+0
							+"\" width=\"412\" height=\"440\" border=\"0\"></iframe></div><a href=\"#\" onClick=\"Close(); ret"
							+"urn false;\"><img src=\"img/un/a/x.gif\" border=\"1\" class=\"popup4\" alt=\"Close\"></a>";
						pb.innerHTML=rc;}if(gb()<700){$("ce").style.position='absolute';sc=true;};
					break;
					case "dorf1":location.href="dorf1.php";break;
					case "dorf2":location.href="dorf2.php";break;
					case "dorf3":location.href="dorf3.php";break;
					case "profil":location.href="spieler.php";break;
					case "kl�n":case "klán":case "klan":case "clan":case "ally":location.href="allianz.php";break;
					case "stat0":location.href="statistiken.php?id=0";break;
					case "stat1":case "stat":location.href="statistiken.php";break;
					case "stat2":location.href="statistiken.php?id=2";break;
					case "stat3":location.href="statistiken.php?id=3";break;
					case "stat4":location.href="statistiken.php?id=4";break;
					case "msg":case "messages":case "uzenetek":case "�zenetek":case "üzenetek":location.href="nachrichten.php";break;
					case "lock":location.href="login.php?del_cookie";break;
					case "logout":location.href="logout.php";break;
				}
				sl=v.split(" ");//szóköz szerinti darabolás
				sl2=v2.split(" ");
				switch(sl[0]){
					case "x":alert(sl);break;
					//case "whois":location.href="statistiken.php?spieler="+sl[1]+"&s1.x="+random(0,47)+"&s1.y="+random(0,17)+"&s1=ok";break;
					case "msg":
						switch(sl[1]){
							case "in":case "bejövő":case "bejovo": case 1:location.href="nachrichten.php";break;
							case "out":case "kimenő":case "kimeno": case 2:location.href="nachrichten.php?t=2";break;
							case "ir":case "write": case 3: case "snd": case "send":location.href="nachrichten.php?t=1";break;
							case "arhív":case "arhiv": case 4: case "archive": case "arc":location.href="nachrichten.php?t=3";break;
							case "jegyzettömb":case "jegyzet": case 5: case "note": case "notes":location.href="nachrichten.php?t=4";break;
						};break;
					case "clan":case "klan":case "ally":case "klán":
						switch(sl[1]){
							case "1":case "main":case "nézet":case "nezet":case "view":location.href="allianz.php?s=1";break;
							case "2":case "forum":case "fórum":location.href="allianz.php?s=2";break;
							case "3":case "támadások":case "tamadasok":case "attacks":case "attks":location.href="allianz.php?s=3";break;
							case "4":case "hírek":case "hirek":case "news":location.href="allianz.php?s=4";break;
							case "5":case "options":case "beallitasok":case "beállítások":location.href="allianz.php?s=5";break;
							case "6":case "chat":case "cset":case "ally-chat":case "im":location.href="allianz.php?s=6";break;
							default:alert("ismeretlen/unkown:\n"+sl[1]);break;
						};break;
				}
				for(i=0;i<vil_list.rows.length;i++){
					vill=vil_list.rows[i].cells[0].getElementsByTagName("a")[0].innerHTML.toLowerCase();
					vID=vil_list.rows[i].cells[0].getElementsByTagName("a")[0].href.split("newdid=")[1].split("&")[0]
					if(vill==sl[0]+" "+sl[1]){
						sl[0]=sl[0]+" "+sl[1];
						sl[1]=sl[2];
						sl[2]=sl[3];
						sl[3]=sl[4];
						sl[4]=sl[5];
						sl2[0]=sl2[0]+" "+sl2[1];
						sl2[1]=sl2[2];
						sl2[2]=sl2[3];
						sl2[3]=sl2[4];
						sl2[4]=sl2[5];
						alert("space");
					}
					if(vill==sl[0]){
						switch(sl[1]){
							case "jump":case "go":vil_list.rows[i].cells[0].getElementsByTagName("a")[0].click();break;
							case "up":case "upgrade":location.href="build.php?id="+sl[2]+"&newdid="+vID+"&up=1";break;
							case "dorf1":case "d1":location.href="dorf1.php?newdid="+vID;break;
							case "dorf2":case "d1":location.href="dorf2.php?newdid="+vID;break;
							case "dorf3":case "d1":location.href="dorf3.php?newdid="+vID;break;
							case "map":case "terkep":location.href="karte.php?newdid="+vID;break;
							case "profil":case "pr":location.href="spieler.php?newdid="+vID;break;
							case "piac":case "merc":location.href="build.php?newdid="+vID+"&gid=17";break;
							case "vns":case "setVillageName":case "rename":case "ren":location.href="spieler.php?newdid="+vID+"&s=1&to="+sl2[2];break;
						}
					}
				}
				for(i=0;i<vil_list.rows.length;i++){
					for(j=0;j<vil_list.rows.length;j++){
						x=vil_list.rows[i].cells[0].getElementsByTagName("a")[0].innerHTML.toLowerCase();
						y=vil_list.rows[j].cells[0].getElementsByTagName("a")[0].innerHTML.toLowerCase();
						newdid=vil_list.rows[i].cells[0].getElementsByTagName("a")[0].href.replace(/[a-zA-Z0-9:.\/?]*/,"")
						//vil_list.rows[i].cells[0].getElementsByTagName("a")[0].href.search(/newdid=[0-9]*/)
						//newdid=RegExp.$1;alert(newdid);return;
						if(v==x+" sup "+y || v==x+" piac "+y || v==x+"->"+y || v==x+" to "+y || v==x+" -> "+y){
							vil_list.rows[j].cells[1].textContent.search(/\((.*)\n?\|\n?(.*)\)/);
							location.href=("build.php?z="+xy2id(RegExp.$1, RegExp.$2)+"&"+newdid+"&gid=17")
							return;
						}
						if(v==x+" def "+y || v==x+" tamogat "+y || v==x+"=>"+y || v==x+" ot "+y || v==x+" => "+y){
							vil_list.rows[j].cells[1].textContent.search(/\((.*)\n?\|\n?(.*)\)/);
							location.href=("a2b.php?z="+xy2id(RegExp.$1, RegExp.$2)+"&"+newdid)
							return;
						}
					}
				}
				}else{
					del();
				}
			}
		},false)
	}
}
//default controller
var controller = {
	actions: {
		
		a:function(){}, b:function(){},c:function(){}, d:function(){}, e:function(){}, f:function(){}, g:function(){}, h:function(){}, i:function(){},j:function(){}, k:function(){}, l:function(){}, m:function(){}, n:function(){}, o:function(){}, p:function(){}, q:function(){}, r:function(){}, s:function(){},t:function(){}, u:function(){}, v:function(){}, w:function(){}, x:function(){}, y:function(){}, z:function(){}, esc: function() {},  up: function() {},down: function() {},  right: function() {},  left: function() {},  num: function() {},  numpad: function() {},  wildcard: function() {},  del: function() {},ins: function() {},  plus: function() {},  enter: function() {},F4: function() {},home: function() {},backspace:function(){},
		tilde: function() { nav_to('dorf1.php') },//�
		t: function() { nav_to('karte.php') }, // terkep
		backslash: function() { nav_to('statistiken.php') },//�
  
  
		q: function() {nav_to('dorf1.php') },
		w: function() {nav_to('dorf2.php') },
		e: function() {nav_to('dorf3.php') },
		r: function() {nav_to('karte.php') },
		t: function() {nav_to('berichte.php') }, // Jelentesek
		z: function() {nav_to('nachrichten.php') }, // Igm
		
		k: function() {	nav_to('allianz.php') },

		b: function() { nav_to_gid(19) }, // Barakk
		n: function() { nav_to_gid(20) }, // Istallo
		m: function() { nav_to_gid(21) }, // Muhely

		s: function() { nav_to_gid(17) }, // Piac
		d: function() { nav_to("build.php?gid=17&t=1") }, // Piac vesz
		f: function() { nav_to("build.php?gid=17&t=2") }, // Piac elad

		x: function() { nav_to('build.php?id=39') }, // Rally point
		c: function() { nav_to_gid(37) }, // H�s�k h�za
  
		a: function() { if(vil_nums){vil_idx = vil_idx?--vil_idx:vil_nums-1;nav_to(vil_list.rows[vil_idx].cells[0].lastChild.href)} },
		y: function() { if(vil_nums){vil_idx = ++vil_idx % vil_nums;nav_to(vil_list.rows[vil_idx].cells[0].lastChild.href)} },

		pause: consol,
	}
}

if (window.location.href.match(/nachrichten\.php([?&]s=\d+)?([?&]t=\d)?(\&o=1)?$/)
||	window.location.href.match(/berichte\.php([?&]s=\d+)?(\&o=1)?$/)) {
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
			for(i=0; i<10; i++) msg_rpt_table.rows[i+1].insertCell(0).innerHTML = (i+1);
			msg_rpt_table.rows[11].insertCell(0).innerHTML = '*';
			
			var nav_elt = msg_rpt_table.rows[11].cells[msg_rpt_table.rows[11].cells.length-1];
			with (controller.actions) {
				num = function(n) { nav_to(msg_rpt_table.rows[n].cells[2].firstChild.href) };
				left = function() { if(nav_elt.childNodes[0].href) nav_to(nav_elt.childNodes[0].href) };
				right = function() { if(nav_elt.childNodes[1].href) nav_to(nav_elt.childNodes[1].href) };
				numpad = function(n) { msg_rpt_table.rows[n].cells[1].firstChild.click() };
				//						document.getElementsByName('n'+n))[0].click()
				wildcard = function() { for(i=0;i<10;i++) msg_rpt_table.rows[i+1].cells[1].firstChild.click() };
				del = function() { document.getElementsByName('del')[0].click() };
				ins = function() { document.getElementsByName('archive')[0].click() };
				s = function() { nav_to(msg_rpt_table.rows[0].cells[msg_rpt_table.rows[0].cells.length-1].firstChild.href) };
			}
		} else { // we're writing msg
//			protect_box(['an', 'be', 'message']);
			with (controller.actions) {
				a = function() {
					document.forms[1].getElementsByTagName('table')[0].rows[1].cells[3].firstChild.click();
					//toggleFriendsList(); return false;
				};
			}
		}
	}
}


if (window.location.href.match(/nachrichten\.php\?id/)) {
	var msg_rpt_table = document.forms[0].getElementsByTagName('table')[0];
	var s = msg_rpt_table.rows[4].cells[1].innerHTML;
	s = s.replace(/(http[^\s<]*)/g, "<a href=\"$1\">$1</a>");
	msg_rpt_table.rows[4].cells[1].innerHTML = s;
	with (controller.actions) {
		r = function() { document.forms[0].submit() }
	}
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
	with (controller.actions) {
		num = function(n) {
			f_before();
			links_idx *= 10;
			links_idx += (n==10?0:n);			
			if (links_idx > counter) links_idx = counter;
			f_after();
		};
		F4 = function() { f_before(); links_idx=0; }
		del = F4;
		numpad = function(n) { nav_to(links[n-1]); }
		enter = function() { if(links_idx)nav_to(links[links_idx-1]) } 
	}
}

if (window.location.href.match(/karte\.php([?&]newdid=\d+)?([?&]z=\d+)?$/)) {
	var mdiv = $('map_content').childNodes[1];
	mdiv.innerHTML += '<div style="width:100%;height:100%" id="over_display"></div>';
	var od = $('over_display');
	for(i=1; i<=4; i++) {
		$('ma_n'+i).addEventListener('click',
			function(e){setTimeout(rebuild_od, 500)}, false);
		$('ma_n'+i+'p7').addEventListener('click',
			function(e){setTimeout(rebuild_od, 500)}, false);
	}
	with (controller.actions) {
		left =	function() { setTimeout(rebuild_od, 500) };
		right =	function() { setTimeout(rebuild_od, 500) };
		up =	function() { setTimeout(rebuild_od, 500) };
		down =	function() { setTimeout(rebuild_od, 500) };
		x = function() { document.getElementsByName('xp')[0].focus() };
		o = function(){location.href=$("a_3_3").href;}
	}
	rebuild_od();
}

if (window.location.href.match(/karte\.php\?d/)) {
	var xdivs = lmid2.getElementsByTagName('div');
	var map_details_troops = xdivs[xdivs.length-4];
	if (map_details_troops.className != 'map_details_troops')
		map_details_troops = false;
	else {
		xcell = map_details_troops.lastChild.rows[0].cells[1];
		xcell.innerHTML = '<ol style="margin:0px; padding-left:8px;">' + xcell.innerHTML + '</ol>';
	}
	with (controller.actions) {
		a = function() {
			try {
				nav_to(lmid2.lastChild.lastChild.rows[1].cells[0].firstChild.href);
			} catch(e) {
				alert('Cannot attack!');
			}
		};
		c = function() { nav_to(lmid2.lastChild.lastChild.rows[0].cells[0].firstChild.href) };
		num = function(n) {
			if ((n >= 1) && (n <= 5) && map_details_troops) try {
				window.location.href = 
					xcell.firstChild.childNodes[n-1].firstChild.href;
			} catch(e) { alert('out of range') }
		}
	}	
}

if (window.location.href.match('dorf1.php')) {
	with (controller.actions) {
		tilde = function() { nav_to('dorf2.php') };
	}
}


if (window.location.href.match('statistiken.php')) {
	with (controller.actions) {
		v = function() { nav_to('statistiken.php?id=2') };
		a = function() { nav_to('statistiken.php?id=4') };
		o = function() { nav_to('statistiken.php?id=31') };
		d = function() { nav_to('statistiken.php?id=32') };
		plus = function() { nav_to('statistiken.php?id=5') };
		c = function() { nav_to('statistiken.php?id=0') };
		t = function() { nav_to('statistiken.php?id=7') };
	}
	if (document.forms[0]) {
		xcell = document.forms[0].getElementsByTagName('table')[2].rows[0].cells[6];
		with (controller.actions) {
			left = function() { nav_to(xcell.firstChild.href) };
			right = function() { nav_to(xcell.childNodes[2].href) };
		}
//		protect_box(['rang', 'spieler']);
	}
}
if (window.location.href.match('build.php?')) {
	var divs = lmid2.getElementsByTagName('div');
	with(controller.actions) {
		u = function() {try {nav_to(divs[divs.length-1].getElementsByTagName('a')[0].href)}catch(e){} };
		// upgrade building if possible
	}
	if(window.location.href.match('&up=1')){
		try {nav_to(divs[divs.length-1].getElementsByTagName('a')[0].href)}catch(e){}
	}
}

if (window.location.href.match('a2b.php')) {
	var form_tables = document.forms[0].getElementsByTagName('table');
	var xdivs_atk_type = form_tables[2].rows[0].cells[0].getElementsByTagName('div');
	var img_name = form_tables[1].rows[0].cells[0].firstChild.src.replace(/^.*?(\d+)\.gif$/, "$1");
	switch(Math.floor(parseInt(img_name)/10)) {
		case 0: units = {off:0xb20, def:0x011, spy:0x002}; break;
		case 1: units = {off:0xb01, def:0x030, spy:0x002}; break;
		case 2: units = {off:0xb12, def:0x021, spy:0x100}; break;
	}
	function select_troops(troops_mask) {
		for(i=0; i<10; i++) {
			var xrow = form_tables[1].rows[Math.floor(i/4)].cells;
			if (troops_mask & (1<<i)) {
				xrow[(i%4)*3+1].firstChild.value = 
				xrow[(i%4)*3+2].firstChild.innerHTML.replace(/[)(]/g,'');
			} else
				xrow[(i%4)*3+1].firstChild.value = '';
		}
		if ((troops_mask & (1<<11))
		&&	(form_tables[1].rows[2].cells.length > 8)) { // hero is possible
			form_tables[1].rows[2].cells[8].firstChild.value = 1;
		}
	}
	with (controller.actions) {
//		d = function() { xdivs_atk_type[0].firstChild.click() };
		a = function() { xdivs_atk_type[1].firstChild.click() };
		r = function() { xdivs_atk_type[2].firstChild.click() };
		x = function() { document.getElementsByName('x')[0].focus() };
		o = function() { select_troops(units.off) };
		d = function() { select_troops(units.def) };
		s = function() { select_troops(units.spy) };
//		c = function() { ;/* select all off + capturing */ };
	}
}

if (window.location.href.match('allianz.php') && is_our()) { // our allianz
	with (controller.actions) {
		a = function() { nav_to('allianz.php?s=3') };
		n = function() { nav_to('allianz.php?s=4') };
		o = function() { nav_to('allianz.php?s=5') };
		if (window.location.href.match('s=3')) {
			num = function(n) { nav_to(lmid2.lastChild.rows[n+1].cells[1].firstChild.href) }
		}
	}
}

if (window.location.href.match('spieler.php') && is_our()) { // our allianz
	links = lmid2.childNodes[1].getElementsByTagName('a');
	for(i=0; i<links.length; i++)
		links[i].innerHTML = (i+1) + '.' + links[i].innerHTML;	
	with (controller.actions) {
		num = function(n) { if(n<=5) nav_to(links[n-1].href) }
	}
	if(window.location.href.match('&s=1&to=')){
		document.forms[0].getElementsByTagName("input")[8].value=location.href.split("&s=1&to=")[1];
		document.forms[0].getElementsByTagName("input")[9].click();
	}
}

if(window.location.href.match('dorf1.php')){
	var links = new Array();
	var counter = 0;
	ob=$("lmid2").getElementsByTagName("div")[1]
	for(x=1; x<19; x++) {
		elem=document.createElement("span");
		elem.setAttribute("class","rf"+x);
		elem.innerHTML=x;
		ob.appendChild(elem);
		elem.style.top=(elem.offsetTop-20)+"px";
		elem.style.backgroundColor="transparent";
		elem.style.color="white";
		links[counter++] = "build.php?id="+x;
		elem.appendChild(document.createElement("div"));
		
		mini=elem.lastChild;
		mini.innerHTML=x;
		mini.style.position="relative";
		mini.style.top="-16px";
		mini.style.color="black";
		mini.style.left="1px";
	}
			var links_idx = 0;
			var xspans = ob.getElementsByTagName('span');
			f_before = function() {if(links_idx) with (xspans[links_idx-1].lastChild.style) {backgroundColor = 'transparent';}}
			f_after = function() {if (links_idx > counter) {links_idx = 0;} else {if(links_idx) with (xspans[links_idx-1].lastChild.style) {backgroundColor = 'yellow';}}}
			with (controller.actions) {
				num = function(n) {
					f_before();
					links_idx *= 10;
					links_idx += (n==10?0:n);
					if (links_idx > counter) links_idx = counter;
					f_after();
				};
				enter=function(){if(links_idx){nav_to("build.php?id="+(links_idx));}}
				u=function(){if(links_idx){nav_to("build.php?id="+(links_idx)+"&up=1");}}
				backspace=function(){f_before(); links_idx=Math.floor(links_idx/10);f_after();}
				F4 = function() { f_before(); links_idx=0; }
				del = F4;
			}
}

if(window.location.href.match(/dorf2\.php([?&]newdid=\d+)?/)){
	var links = new Array();
	var counter = 0;
	ob=$("lmid2")
	ob.appendChild(document.createElement("div"));
	ob=ob.lastChild;
	for(x=1; x<23; x++) {
		elem=document.createElement("span");
		elem.setAttribute("class","d"+x);
		elem.innerHTML=x;
		ob.appendChild(elem);
		elem.style.top=(elem.offsetTop+50)+"px";
		elem.style.left=(elem.offsetLeft+30)+"px";
		elem.style.backgroundColor="transparent";
		elem.style.color="white";
		counter++;
		if(x==21){
			elem.setAttribute("class","d20");
			elem.style.top="200px";
			elem.style.left="360px";
		}
		if(x==22){
			elem.setAttribute("class","d20");
			elem.style.top="380px";
			elem.style.left="410px";
		}
		elem.appendChild(document.createElement("div"));
		mini=elem.lastChild;
		mini.innerHTML=x;
		mini.style.position="relative";
		mini.style.top="-16px";
		mini.style.color="black"
		mini.style.left="1px";
	
		
	}
	
	var links_idx = 0;
	var xspans = ob.getElementsByTagName('span');
	f_before = function() {if(links_idx) with (xspans[links_idx-1].lastChild.style) {backgroundColor = 'transparent';}}
	f_after = function() {if (links_idx > counter) {links_idx = 0;} else {if(links_idx) with (xspans[links_idx-1].lastChild.style) {backgroundColor = 'yellow';}}}
	with (controller.actions) {
		num = function(n) {
			f_before();
			links_idx *= 10;
			links_idx += (n==10?0:n);
			if (links_idx > counter) links_idx = counter;
			f_after();
		};
		enter=function(){if(links_idx){nav_to("build.php?id="+(18+links_idx));}}
		u=function(){if(links_idx){nav_to("build.php?id="+(18+links_idx)+"&up=1");}}
		backspace=function(){f_before(); links_idx=Math.floor(links_idx/10);f_after();}
		F4 = function() { f_before(); links_idx=0; }
		del = F4;
	}
}

var xtable = lmid2.getElementsByTagName('table')[0];
try { // in tavern	
	for (i=1; i<=5; i++) { xtable.rows[i].cells[3].childNodes[1].innerHTML = i }
	with (controller.actions) {
		num = function(n) {
			if (n <= 5) nav_to(xtable.rows[n].cells[3].childNodes[1].href);
		}
	}
} catch(e) {};

// key binding
function bind_function(e){
	if ( typeof e == "undefined" ) e = window.event;
	var wkey = e.keyCode;
	var mods = e.which;
	if(e.ctrlKey || e.altKey || e.shiftKey){return false;}
	switch (wkey) {
		case 8: controller.actions.backspace(); break;
//		case 9: controller.actions.tab(); break;
		case 13: controller.actions.enter(); break;
		case 19: controller.actions.pause(); break;
		case 27: controller.actions.esc(); break;
//		case 32: controller.actions.space(); break;
//		case 33: controller.actions.pageUp(); break;
//		case 34: controller.actions.pageDown(); break;
//		case 35: controller.actions.end(); break;
		case 36: controller.actions.home(); break;
		case 37: controller.actions.left(); break;
		case 38: controller.actions.up(); break;
		case 39: controller.actions.right(); break;
		case 40: controller.actions.down(); break;
		case 45: controller.actions.ins(); break;
		case 46: controller.actions.del(); break;
		case 106: controller.actions.wildcard(); break;//num*
		case 107: controller.actions.plus(); break;
//		case 109: controller.actions.minus(); break;
//		case 112: controller.actions.F1(); break;
//		case 113: controller.actions.F2(); break;
//		case 114: controller.actions.F3(); break;
		case 115: controller.actions.F4(); break;
//		case 116: controller.actions.F5(); break;
//		case 117: controller.actions.F6(); break;
//		case 118: controller.actions.F7(); break;
//		case 119: controller.actions.F8(); break;
//		case 120: controller.actions.F9(); break;
//		case 121: controller.actions.F10(); break;
//		case 122: controller.actions.F11(); break;
//		case 123: controller.actions.F12(); break;
		case 192: controller.actions.tilde(); break;//�
		case 220: controller.actions.backslash(); break;
		
		case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: case 48:
			var n = wkey - 48;
			controller.actions.num(n?n:10);
		break;
		case 97: case 98: case 99: case 100: case 101: case 102: case 103: case 104: case 105: case 96:
			var n = wkey - 96;
			controller.actions.numpad(n?n:10);
		break;

		case 65: controller.actions.a(); break;
		case 66: controller.actions.b(); break;
		case 67: controller.actions.c(); break;
		case 68: controller.actions.d(); break;
		case 69: controller.actions.e(); break;
		case 70: controller.actions.f(); break;
		case 71: controller.actions.g(); break;
		case 72: controller.actions.h(); break;
		case 73: controller.actions.i(); break;
		case 73: controller.actions.j(); break;
		case 75: controller.actions.k(); break;
		case 76: controller.actions.l(); break;
		case 77: controller.actions.m(); break;
		case 78: controller.actions.n(); break;
		case 79: controller.actions.o(); break;
		case 80: controller.actions.p(); break;
		case 81: controller.actions.q(); break;
		case 82: controller.actions.r(); break;
		case 83: controller.actions.s(); break;
		case 84: controller.actions.t(); break;
		case 85: controller.actions.u(); break;
		case 86: controller.actions.v(); break;
		case 87: controller.actions.w(); break;
		case 88: controller.actions.x(); break;
		case 89: controller.actions.y(); break;
		case 90: controller.actions.z(); break;
	default:
		window.status = wkey + (mods ? '+'+mods : '');
	}
}
addEventListener('keyup', bind_function, false);

for(f=0; f<document.forms.length; f++)
	for(i=0; i<document.forms[f].elements.length; i++)
		document.forms[f].elements[i].addEventListener('keyup', function(e){if(e.keyCode==27){this.blur();}e.stopPropagation()}, false);