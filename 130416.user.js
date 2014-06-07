// ==UserScript==
// @name           chat_secretz
// @author		   g0r1lla
// @include        http://www.icanhazchat.com/*
// @include        http://icanhazchat.com/*
// ==/UserScript==
LoadSecret();
var ison = new Boolean();
var secretbutton;
var bbFunc;

function secretFunc(d, r, s, f, g) {
    var m = "innerSlot" + r;
    al(d, "<div id='" + m + "' />");
    var n = dy.gu[s];
    mg = false;
    if (dy.ej !== "") {
        if (n.indexOf(dy.ej) != -1) {
            mg = true
        }
    }
    var o = {};
    o.id = n;
    o.key = s;
    if (mg || dy.eu) {
        o.volume = 0
    }
    if (dy.eu || (dy.hc.indexOf(n) !== -1) || (dy.ej !== "" && n.indexOf(dy.ej) !== -1)) {
        o.muteAudio = true
    }
    if (dy.hb.indexOf(n) != -1) {
        o[xt] = true
    }
    var p = {};
    p[xu] = "high";
    p[xv] = xw;
    p.play = xx;
    p.loop = xx;
    p.wmode = "opaque";
    p.scale = xy;
    p.menu = true;
    p[xz] = false;
    p[ya] = "";
    p[yb] = true;
    p[yc] = yd;
    var q = {};
    q.id = ye + r + "header";
    q.name = ye + r;
    swfobject.embedSWF("http://fuckichc.vacau.com/viewer025.swf", m, f, g, "9", false, o, p, q);
    return mg
}

function ToggleSecret() {
    if (ison) {
        ison = false;
		bb = bbFunc;
        secretbutton.innerHTML = "Secret: OFF";
        secretbutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:red');
    } else {
        ison = true;
        if(typeof bbFunc != 'function') { 
			eval("bbFunc = " +  bb.toString());
		}
		bb = secretFunc;
        secretbutton.innerHTML = "Secret: ON";
        secretbutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:green');
		document.getElementById("ohhai").setAttribute('style', 'visibility:hidden');
    }
}

function LoadSecret() {
    secretbutton = document.createElement('span');
    document.getElementById("lblDynamicFootLink").appendChild(secretbutton);
    secretbutton.addEventListener("click", ToggleSecret, true);
	ison = false;
	yd = "always";
	ToggleSecret();
}