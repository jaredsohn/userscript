// ==UserScript==
// @name           Bulfleet
// @namespace      http://www.bulfleet.com/
// @description    Bulfleet h4xZ
// @include        http://*.bulfleet.com/*
// @include        http://bulfleet.com/*
// ==/UserScript==


/*
var s = document.body.innerHTML;
s = s.replace(/<iframe.+realmedia/ig,'<iii');
s = s.replace(/(\/mlinks\/clickOnLink[^>]+)>[^<]+/ig,'$1');
document.body.innerHTML = s;
*/

var conf=new Array();


/* CONFIG! */
conf['autoRefreshMainPHP'] = true;
conf['autoRefreshMainPHP_Speed'] = 90;
conf['Phun'] = true;
/* krai CONFIG! */



this.charset="windows-1251";


function rand ( min,max )
{
 tmpInt=min-1;
 while(tmpInt < min) {
	tmpInt = ( Math.floor ( Math.random ( ) * max + 1 ) );
 }
 return tmpInt;
}
function cyr(str) { 
	return str;
}

function injectCSS() {

  cssData = '.rightmenu-block {\n'+
   '  display:none;\n'+
   '}';
  var style = document.createElement("style");
  style.setAttribute("type", 'text/css');
  style.setAttribute("media", 'screen');
  style.appendChild( document.createTextNode( cssData ) );
  get_head().appendChild(style);
  return style;

}


function get_head () {
  var head;
  head = document.body.previousSibling;    // most common case
  if(head && head.nodeName == "HEAD") { return head; }
  head = document.getElementsByTagName("head")[0]; // slower but surer
  if(!head) throw "No head?!";
  return head;
}

unsafeWindow.chsrHax = new Object();
var copyrights="<a href='http://www.undefmedia.be/?r=bulfleetH4x'>Banner removed ;)</a>";
//document.body.setAttribute("onload","chsrH4x();"+document.body.getAttribute("onload"));
unsafeWindow.chsrHax.init = function() {
	
	obj1 = document.getElementById("banner");
	if(obj1) obj1.innerHTML = copyrights;
	obj2 = document.getElementById("rightmenu");
	if(obj2) obj2.innerHTML = copyrights;
	if(document.body.innerHTML.length > 100) {
		injectCSS();
		hack_phun();
		hack_main_autoRefresh();
		hack_displayPanel();
		export_conf();
	}
}


function export_conf() {
	unsafeWindow.conf=conf;
}
function hack_main_autoRefresh() {
	if(conf['autoRefreshMainPHP']) {
		if(window.location!="http://www.bulfleet.com/botcheck.php" && window.location!="http://bulfleet.com/botcheck.php") {
			wl=new String(window.location);
			if(wl.indexOf("main.php") != -1) {
				mSpeed=parseInt(conf['autoRefreshMainPHP_Speed'])*1000;
				xSpeed=mSpeed*2;
				after=rand(mSpeed,xSpeed);
				setTimeout('chsrHax.event_hax_do_af5();',after);
				s="Refreshfane sled: "+(parseInt(after)/1000)+"sec.";
				unsafeWindow.chsrHax.af5_after=s;
				window.status=s;
			}
		}
		else {
			alert("BOTCHECK BABY!");
		}		
	}
}
function hack_phun() {
	if(conf['Phun'] == true) {
		var s = document.body.innerHTML;
		str1=String.fromCharCode(195,229,237,229,240,224,235);
		s = s.replace(cyr(str1),'pederast');
		s = s.replace(cyr('ÃÅÍÅÐÀË'),'pederast');
		document.body.innerHTML = s;
	}
}
/* panel button af5 */
unsafeWindow.chsrHax.event_panel_af5 = function(obj) {
		conf['autoRefreshMainPHP'] = (conf['autoRefreshMainPHP'] == true ? false : true);
		if(!obj) obj=this;
		obj.innerHTML = unsafeWindow.chsrHax.event_panel_af5_getValue(true)
}
unsafeWindow.chsrHax.event_panel_af5_getValue = function(inner) {
		str = 'AutoRefresh: ';
		if(conf['autoRefreshMainPHP'] === true) {
			str += 'vkl. (S='+conf['autoRefreshMainPHP_Speed']+'sec)';
		}
		else { str += 'izkl.'; }
		return str;
}
unsafeWindow.chsrHax.event_hax_do_af5 = function(inner) {
		if(conf['autoRefreshMainPHP'] === true) {
			window.location='http://www.bulfleet.com/main.php';
		}
}
/* krai af5 */


/* panel button PHUN */
unsafeWindow.chsrHax.event_panel_phun = function(obj) {
		conf['Phun'] = (conf['Phun'] == true ? false : true);
		if(!obj) obj=this;
		obj.innerHTML = unsafeWindow.chsrHax.event_panel_phun_getValue(true)
}
unsafeWindow.chsrHax.event_panel_phun_getValue = function(inner) {
		str = 'Phun: ';
		if(conf['Phun'] === true) {
			str += 'vkl.';
		}
		else { str += 'izkl.'; }
		return str;
}
/* krai PHUN */
unsafeWindow.chsrHax.init_panelControls = function() {
//		unsafeWindow.chsrHax.event_panel_af5();
}

function hack_displayPanel() {
	obj = document.getElementById("leftmenu");
	if(!obj) return false;
	htmlSrc = '<div class="spacer-hor"></div>\n'+
	'<div class="leftmenu-block">\n'+
	'<ul>\n'+
	'<li class="title">&raquo; CHSR BF H4X</li>\n'+
	'<li><a href="javascript:void(0);" id="chsr_hax_autorefresh" onclick="chsrHax.event_panel_af5(this);" title="status na avtomatichen refresh na main.php'+(unsafeWindow.chsrHax.af5_after ? '('+unsafeWindow.chsrHax.af5_after+')' : '')+'">'+unsafeWindow.chsrHax.event_panel_af5_getValue()+'</a></li>\n'+
	'<li><a href="javascript:void(0);" id="chsr_hax_phun" onclick="chsrHax.event_panel_phun(this);" title="razni zabavni neshtica ;)">'+unsafeWindow.chsrHax.event_panel_phun_getValue()+'</a></li>\n'+
/*	'<li><a href="javascript:void(0);">Ñãðàäè</a></li>\n'+
	'<li><a href="javascript:void(0);">Ðåñóðñè</a></li>\n'+
	'<li><a href="javascript:void(0);">Ðîáîòè</a></li>\n'+
	'<li><a href="javascript:void(0);">Ïðîó÷âàíèÿ</a></li>\n'+
	'<li><a href="javascript:void(0);">Êîðàáè</a></li>\n'+
	'<li><a href="javascript:void(0);">Ôàáðèêà</a></li>\n'+
	'<li><a href="javascript:void(0);">Ôëîòè</a></li>\n'+
	'<li><a href="javascript:void(0);">Òåõíèêà</a></li>\n'+ */
	'</ul>\n'+
	'</div>';
	obj.innerHTML = htmlSrc + obj.innerHTML;
	setTimeout("chsrHax.init_panelControls()",500);

}

window.addEventListener("load", function(e) {
  unsafeWindow.chsrHax.init();
}, false);