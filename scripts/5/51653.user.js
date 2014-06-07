// ==UserScript==
// @name          google homepage
// @include       http://www.google.com/
// ==/UserScript==
(function() {
var css = "body { height:100%; padding-top:60px;}/* HEADERS */ .gbh, #gbar, #guser, input[type='submit'] { display: none !important; } /* RIGHT SIDE-BAR */ A[href=\"/advanced_search?hl=en\"], A[href=\"/preferences?hl=en\"], A[href=\"/language_tools?hl=en\"] { display: none !important; } /* TEXT ADS TEND TO SHOW UP HERE */ HTML > BODY > CENTER > FONT, #body > CENTER > FONT { display: none !important; } /* FOOTER */ HTML > BODY > CENTER > BR:first-child + IMG + BR + BR + FORM + BR + FONT + BR + BR + BR + FONT, HTML > BODY > CENTER > P, #footer { display: none !important; }";
// css += 'body { background: url("http://files.getdropbox.com/u/516841/2913294304_dd52d1aa43_o.jpg")}'
// css += 'body { background: url("http://files.getdropbox.com/u/516841/Wallpaper%20blue.png")}'
css += 'body { background: url("http://files.getdropbox.com/u/516841/01917_alovelyday_1440x900.jpg") top center no-repeat}'
css += 'img[src*="logos/"], img[src$="logo.gif"], div[style*="logo_plain.png"], img[src$="logo_google_suggest.gif"], img[src^="logos/holiday"], img[src^="/intl/"][alt="Google"][title="Google"] { display: none !important; }'
css += '.aAutoComplete .cAutoComplete, .google-ac-a .google-ac-c, .gac_a > .gac_c { color: #000 !important; } .aAutoComplete .dAutoComplete, .google-ac-a .google-ac-d, .gac_a > .gac_d { color: green !important; } .google-ac-e td, .gac_e { color: blue !important; }'
css += 'input, textarea {outline-style:none;} input[name=\"q\"] { padding-top:30px; background-color: rgba(255,255,255,0.2); text-align:center; border:none; height:100px; width:700px; font-size:50px; color:white;}'
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
