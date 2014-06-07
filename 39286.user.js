// ==UserScript==
// @name           Monkey Shield 1.0.0
// @namespace      http://pivot.servut.us/w/Monkey_Shield
// @homepage       http://pivot.servut.us/w/Monkey_Shield
// @author         Frozenball <orkkiolento[at]gmail[dot]com>
// @description    Internet Protection: blocks shock sites, alert loops etc.
// @include        *
// ==/UserScript==

// vars
last_alert = 0;
last_alert_str = '';
alerts_blocked = 0;
backup_html = '';

// shortcuts
$ = function(id){ return document.getElementById(id); }
get_time = function(){ return (new Date()).getTime(); }

// icons (c) famfamfam, http://www.famfamfam.com/lab/icons/silk/
// http://creativecommons.org/licenses/by/2.5/
icon_error = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'
+'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFYSURBVDjLY/z//z8DJYCJgUJAsQEsuCQe'
+'HIgP/f/vX/H/f//9lFyWvCLJBff2xPD9+/27kV/O3xxIl5HsBaCmAj5Zb00+SUOGPz9/J19fF2BK'
+'tAG3NoVoATXl84oIMPz9tIlBXC9F4O/PX7WXl3iwEjQAaBPTn5+/KkW1ooUYfpxjOLVoKQOPwHeG'
+'Pz9++QCxH0EDgDa5cQnrxfAKfmP49/M+A8P/fwx/v5xmUHQoZvzz82fzqUmWvDgNuLjQjQ1oS4uA'
+'nAHDv2+XgHq/MxgHqzP8+/WMgYPjFoO4boQm0HWFOA0A2p4qpOJtzMX7huH/n7cMDIzMDGfX3QIF'
+'KcO/H7cYRNXkgWp+Zx9q0tHCmg7+/PgJ9Ls/0MgHDEx8okCR/wxmSQFwe5g5lRmUXMvFbm1uagQK'
+'hGIa8PMXx7nZwd+BCQfo/H9I+D+cZgDR//9LILuAcehnJgBMs6gZ4tipDAAAAABJRU5ErkJggg==';
icon_x = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'
+'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVDjLpZNraxpBFIb3a0ggISmmNISW'
+'XmOboKihxpgUNGWNSpvaS6RpKL3Ry//Mh1wgf6PElaCyzq67O09nVjdVlJbSDy8Lw77PmfecMwZg'
+'/I/GDw3DCo8HCkZl/RlgGA0e3Yfv7+DbAfLrW+SXOvLTG+SHV/gPbuMZRnsyIDL/OASziMxkkKkU'
+'QTJJsLaGn8/iHz6nd+8mQv87Ahg2H9Th/BxZqxEkEgSrq/iVCvLsDK9awtvfxb2zjD2ARID+lVVl'
+'babTgWYTv1rFL5fBUtHbbeTJCb3EQ3ovCnRC6xAgzJtOE+ztheYIEkqbFaS3vY2zuIj77AmtYYDu'
+'sPy8/zuvunJkDKXM7tYWTiyGWFjAqeQnAD6+7ueNx/FLpRGAru7mcoj5ebqzszil7DggeF/DX1nB'
+'N82rzPqrzbRayIsLhJqMPT2N83Sdy2GApwFqRN7jFPL0tF+10cDd3MTZ2AjNUkGCoyO6y9cRxfQo'
+'wFUbpufr1ct4ZoHg+Dg067zduTmEbq4yi/UkYidDe+kaTcP4ObJIajksPd/eyx3c+N2rvPbMDPbU'
+'FPZSLKzcGjKPrbJaDsu+dQO3msfZzeGY2TCvKGYQhdSYeeJjUt21dIcjXQ7U7Kv599f4j/oF55W4'
+'g/2e3b8AAAAASUVORK5CYII=';

// style
GM_addStyle("#protectx { position:fixed; z-index:10000001; margin:0px; top:0px; left:0px; width:100%; padding:7px; padding-top:6px; padding-bottom:8px; color:black; font-family:Tahoma; font-size:11px; background-color:#ffffe1; border-bottom:1px #a7a6aa solid; }");
GM_addStyle("#px_left_icon { padding:0px; margin:0px; margin-bottom:-4px; margin-right:6px; }");
GM_addStyle("#protectx_button { position:fixed; z-index:10000002; top:2px; right:30px; }");
GM_addStyle("#protectx_x { position:fixed; z-index:10000002; top:7px; right:2px; }");
GM_addStyle("#protectx_x:hover { cursor:pointer; }");

GM_addStyle("#protectx_button button { font-size:11px; font-family:Tahoma; padding:2px; }")
GM_addStyle("#protectx_hide { width:100%; height:100%; background-color:black; position:fixed; top:0px; left:0px; z-index:10000000; }")
GM_addStyle("#protectx_hide div { margin-top:100px; padding:30px; font-size:30px; color:white; font-family:Trebuchet MS; text-align:center; }");

// proper functions
// (c) http://www.toao.net/32/my-htmlspecialchars-function-for-javascript/
function htmlspecialchars(str) {
 if (typeof(str) == "string") {
  str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  }
 return str;
}
function px_insert(html) {
	var temp = document.createElement("div");
	temp.innerHTML = html;
	document.body.insertBefore(temp, document.body.firstChild);
}
function px_hide_screen() {
	if (!$('protectx_hide')) {
		px_insert(
		"<div id=\"protectx_hide\"><div>This page's content has been darkened due to it's possible disturbing content. Please press 'View Page' if you want to see view this page. Thank you.<br><span style='font-size:16px;'><a href='http://pivot.servut.us/w/Monkey_Shield' style='color:white!important;'>Monkey Shield</a></span></div></div>"
		);
	}
	$('protectx_hide').style.display = 'block';
}
function px_unload_evil() {
	document.body.onmousemove = '';
	document.body.onkeydown = '';
	document.body.onunload = '';
	document.body.onmouseover = '';
}
function px_init_error() {
	if (!$('protectx')) {
		px_insert(
		"<div id=\"protectx\">"
		+'<img id="px_left_icon" src="data:image/gif;base64,'+icon_error+'">'
		+"<span id='protectx_text'></span>"
		+"<span id='protectx_button'></span>"
		+'<span id="protectx_x" onclick="document.getElementById(\'protectx\').style.display = \'none\';"><img id="px_left_icon" src="data:image/gif;base64,'+icon_x+'"></span>'
		+"</span></div>"
		);
	}
	$('protectx').style.display = 'block';
	$('protectx_button').innerHTML = '';
	$('protectx_text').innerHTML = '';
}
function px_shock_site(msg) {
	backup_html = document.body.innerHTML;
	document.body.innerHTML = '';
	unsafeWindow.setTimeout = function(){ return; }
	px_init_error();
	$('protectx_text').innerHTML = htmlspecialchars(msg);
	$('protectx_button').innerHTML = '<button class="protectx_button" type="button" onclick="px_view_html()">View Page</button> <button class="protectx_button" type="button" onclick="history.go(-1)">Go Back</button>';
	px_hide_screen(); px_unload_evil();
}
function px_settings() {
	document.body.innerHTML = '';
	dw = function(s){ document.body.innerHTML += s; }
	dw("<html><head><title>ProtectX Settings</title>");
	dw("<style>body { font-size:12px; font-family:Verdana; }</style></head>");
	dw("<body>");
	dw("<h1>ProtectX</h1>");
	
	dw("</body></html>");
	
}

// Antishocksite
if (/(\tubgirl.com|lemonparty.org|bangedup.com|rotten.com|nimp.org|fuck.org|goatse.cx|snickerbars.com|bakla.net|klerck.org|honkee.org|ratemygoatse.cx|tubboy.net|desertofthereal.org|supermodelsfart.com|exet.nu)\b/.test(document.location)) {
	px_shock_site('An harmful shock site was detected using link checker');
} else {
	if (!/(\google|encyclopediadramatica)\b/.test(document.location) && /(\gnaa|you are an idiot)\b/.test(document.title.toLowerCase())) {
		px_shock_site('An harmful shock site was detected using title checker');
	}
}  

// Check variations
if (unsafeWindow.movew0w) { unsafeWindow.movew0w = function(){ px_shock_site('An harmful shock site was detected using function checker (movew0w)'); return false; } }
if (unsafeWindow.load_goatse) { unsafeWindow.load_goatse = function(){ px_shock_site('An harmful shock site was detected using function checker (load_goatse)'); return false; } }
if (unsafeWindow.altf4key) { unsafeWindow.altf4key = function(){ px_shock_site('An harmful shock site was detected using function checker (altf4key)'); return false; } }



// Generic - ALERT
unsafeWindow.px_view_html = function(){
	document.body.innerHTML = backup_html;
	if ($('protectx_hide')) { $('protectx_hide').style.display = 'none'; }
}
unsafeWindow.px_view_last_alert = function(){ alert(last_alert_str); }
unsafeWindow.alert = function(s){
	time = get_time();
	if ((time - last_alert) < 500) {
		alerts_blocked++;
		last_alert_str = s;
		last_alert = time;
		px_init_error();
		if (alerts_blocked <= 1) {
			$('protectx_text').innerHTML = htmlspecialchars('An alert pop-up has been blocked with contents: '+s);
		} else {
			$('protectx_text').innerHTML = htmlspecialchars(alerts_blocked+' alert pop-ups have been blocked. Contents: '+s);
		}
		$('protectx_button').innerHTML = '<button class="protectx_button" type="button" onclick="return px_view_last_alert()">View Alert</button>';
	} else {
		alert(s);
		last_alert = time;
	}
}

GM_registerMenuCommand('Monkey Shield',px_settings);



