// ==UserScript==
// @name          PHProxy
// @namespace     http://userscripts.org
// @description   Bypass firewall restrictions via PHProxy (http://www.whitefyre.com/poxy/)
// @author        Alex Morozov - inductor2000@mail.ru
// @include       *
// ==/UserScript==


GM_registerMenuCommand("PHProxy settings", settings);

var alnum  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._';

window.addEventListener("load", rewriteLinks, false);

function rewriteLinks() 
{ 
	var proxies = GM_getValue ('gm_phproxy_proxies', '').split ("\n");
	var badURLs = GM_getValue ('gm_phproxy_badurls', '').split ("\n");
	
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		a = links[i];
		for (var j = 0; j < badURLs.length; j++) {
			var idx = a.href.indexOf(badURLs[j]);
			if (idx >= 0 && badURLs[j].length > 0) {
				var proxy = '';
				while (proxy.length == 0) {
					proxy = proxies[Math.round(Math.random()*(proxies.length-1))]
				}
				a.href =  proxy + "/?q=" + base64_encode(a.href.substr(idx, a.href.length-idx)) + "&hl=0011101110";
			}
		}
	}
}

function settings() {
	var proxies_str = GM_getValue ('gm_phproxy_proxies', "http://greenrabbit.org\nhttp://thestrongestlinks.com\nhttp://ieproxy.com");
	var badurls_str = GM_getValue ('gm_phproxy_badurls', "disney.com");
	
	var wnd = 
	'<div id="gm_phproxy_title" style="background: #EFEAB3; color: black; width: 98%; padding: 4px;"><strong>PHProxy settings</strong></div>' + 
	'<form name="gm_phproxy_form"><br>' +
	'Proxies:<br>' + 
	'<textarea name="gm_phproxy_proxies" rows=7 cols=50>' + proxies_str + '</textarea><br><br>' +
	'&quot;Bad&quot; sites (no wildcards yet):<br>' + 
	'<textarea name="gm_phproxy_badurls" rows=7 cols=50>' + badurls_str + '</textarea><br><br>' +
	'<input type=button value="OK" id="gm_phproxy_ok">&nbsp;' +
	'<input type=button value="Cancel" id="gm_phproxy_cancel">' +
	'</form>' +
	'</div>';
	
	var wnd_style = 'z-index: 99; position: fixed; left: 10px; top: 10px; background: #FCFFDF; border: 1px solid black; padding: 5px;';
	wnd_style += 'font-face: arial, helvetica, sans-serif; font-size: 12px; -moz-border-radius: 10px;';
	
	var wndbox = window.document.getElementById("gm_phproxy_settings");
	try{
		wndbox.style.display = "block";
		wndbox.innerHTML = wnd;
	}
	catch(e){
		body = window.document.getElementsByTagName("body")[0];
		script = window.document.createElement("div");
		script.setAttribute("id", 'gm_phproxy_settings');
		script.setAttribute("style", wnd_style);
		script.innerHTML = wnd;
		body.appendChild(script);
	}
	
	window.document.getElementById("gm_phproxy_ok").addEventListener ("click", form_ok, true);
	window.document.getElementById("gm_phproxy_cancel").addEventListener ("click", form_cancel, true);
}

function form_ok () {
	GM_setValue ('gm_phproxy_proxies', unsafeWindow.document.gm_phproxy_form.gm_phproxy_proxies.value);
	GM_setValue ('gm_phproxy_badurls', unsafeWindow.document.gm_phproxy_form.gm_phproxy_badurls.value);
	form_cancel ();
}

function form_cancel () {
	window.document.getElementById("gm_phproxy_settings").style.display = "none";
}

function base64_encode(str)
{
    var out = '';
    var t, x, y ,z;

    for (var i = 0; i < str.length; i += 3)
    {
        t = Math.min(3, str.length - i);
        if (t == 1)
        {
            x = str.charCodeAt(i);
            out += alnum.charAt((x >> 2));
            out += alnum.charAt(((x & 0X00000003) << 4));
            out += '--';
        } 
        else if (t == 2)
        {
            x = str.charCodeAt(i);
            y = str.charCodeAt(i+1);
            out += alnum.charAt((x >> 2));
            out += alnum.charAt((((x & 0X00000003) << 4) | (y >> 4)));
            out += alnum.charAt(((y & 0X0000000f) << 2));
            out += '-';
        }
        else
        {
            x = str.charCodeAt(i);
            y = str.charCodeAt(i+1);
            z = str.charCodeAt(i+2);
            out += alnum.charAt((x >> 2));
            out += alnum.charAt((((x & 0x00000003) << 4) | (y >> 4)));
            out += alnum.charAt((((y & 0X0000000f) << 2) | (z >> 6)));
            out += alnum.charAt((z & 0X0000003f));
        }
    }
    return out;
}