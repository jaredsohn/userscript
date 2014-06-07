// ==UserScript==
// @author      Tim Weinitz
// @namespace	http://userscripts.org/
// @name	GrooveShark anyway
// @description	Get GrooveShark anywhere for free
// @include 	*//grooveshark.com/*
// @include 	*.grooveshark.com/*
// @version     0.25
// ==/UserScript==



function InjectCode(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}


if(!GM_addStyle) {
 GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }
}

// Hide ads while we wait for the page to load


GM_addStyle("#lightbox_overlay, #capital { display:none !important; } #capitalSidebar { display:none !important; } #application { margin:0 !important; } .gs_lightbox_login { display:none !important; }");





window.addEventListener ("load", function () {
	InjectCode( function () {
		init ();
		function init () {
			if(!!GS.user) {
				GS.user.updateAccountType("anywhere");
			} else {
				setTimeout("init()",100);
			}
		}
	});
}, false);