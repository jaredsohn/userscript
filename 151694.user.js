// ==UserScript==
// @name		Kaskus No Long Post
// @include		*.kaskus.co.id/thread/*
// @include		*.kaskus.co.id/post/*
// @include		*.kaskus.co.id/lastpost/*
// @version		1.0.1
// @grant		GM_addStyle
// ==/UserScript==

var panjang_post_maksimal = 5000; //pixel

GM_addStyle('span { position: static !important; }');
function add_script(callbackFn,jQready) {
	jQready = jQready ? 'jQuery(document).ready(' + callbackFn.toString() + ');' : 'setInterval(' + callbackFn.toString() + ',1000);';
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
	var scriptNode  = D.createElement("script");
	scriptNode.textContent  = 'var run_time = 0, max_height = ' + panjang_post_maksimal.toString() +';\n' + jQready;
	targ.appendChild(scriptNode);
}
function GM_main(){
	if (run_time <= 120) {
		run_time++;
		var rows = document.getElementsByClassName('row');
		for(i=0; i<rows.length; i++) {
			var row_id = rows[i].getAttribute('id')||'';
			var height = rows[i].offsetHeight;
			if (height > max_height && row_id !== '') {
				var cpos = rows[i].childNodes[0].childNodes[0].childNodes[3];
					cpos = cpos? (cpos.tagName!='time'&&cpos.tagName!='TIME'? 3 : 4) : 0;
				rows[i].childNodes[0].childNodes[0].childNodes[cpos].innerHTML = 'HADITUSSO ganteng sekali.';
			}
		}
	}
}
add_script(GM_main);