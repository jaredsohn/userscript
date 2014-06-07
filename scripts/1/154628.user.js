// ==UserScript==
// @name          ex.ua [interface]
// @namespace     http://userstyles.org
// @description	  без реклами, текст, фон
// @author        JohnyZlo
// @include       http://ex.ua/*
// @include       https://ex.ua/*
// @include       http://*.ex.ua/*
// @include       https://*.ex.ua/*
// @run-at        document-start
// @grant         none
// ==/UserScript==
(function() {
var css = "body {\nbackground-image: url('data:image/gif;base64,R0lGODdhBAAEAIAAAOXl5f///ywAAAAABAAEAAACBQRieMkFADs=')\n;\n} \n\n\n*[style=\"margin-top: 24px;\"] {\nmargin-top: 0 !important;\n}\n\na[onClick*=\"social\"], div[id*=\"plusone\"], #ad_block, a[href*=\"ad_click\"], #index_box {\ndisplay: none !important;\n}\n\n#search_box {\nbackground: #d2dfe7 !important;\nheight: 50px !important;\nwidth: 100% !important;\ntop: 0;\nleft: 0;\n}\n\n#search_help {\ndisplay: block !important;\ntop: 10px !important;\ntext-align: left !important;\nleft: 50%;\n}\n\n#search_line {\ndisplay: block !important;\nleft: large !important;\ntop: 11px !important;\n}\n\n.panel tr td  {\nbackground: #fff;\n}\n\ndiv[style*=\"height: 28px;\"] {\ndisplay: none !important;\n}\n\ninput[type=\"text\"], #search_text {\nfont-size: large;\nwidth: 300px;\n}\n\n.small_button {\npadding: 2px 20px;\nfont-size: large;\n}\n\n.button {\npadding: 2px 20px;\nfont-size: large;\n}\n\nselect.small {\nfont-size: medium;\npadding: 2px 5px;\n}\n\n#search_button {\npadding: 2px;\nfont-size: large;\nleft: 330px !important;\ntop: 8px !important;\n}\n\n.r_button a {\nbackground: #fff;\nfont-size: large;\nfont-weight:normal;}\n\ntable {\nmargin: 0 auto;\n}\n\n.copyright, table.include_0 td {\nbackground: #fff;\n}\n\nh1, h2 {\nfont-size: x-large;\nfont-weight:bold;\nborder-bottom: 1px solid #ccc;\nbackground: #e5e5e5;\n\nbox-shadow: inset 0 5px 5px -5px rgba(100, 100, 100, 0.2);\nfont-weight:normal;\npadding: 8px 15px 10px 15px;\n}\n\na[id*=\"play\"] {\nbackground: #eee;\nfont-size: 15px;\npadding: 8px 20px;\n}\n\n td.menu_text {\nfont-size: medium;\nfont-weight:normal;\nborder-top: 1px solid #ccc;\nborder-bottom: 1px solid #ccc;\nbackground: #e5e5e5;\n\nbox-shadow: inset 0 5px 5px -5px rgba(100, 100, 100, 0.2);\npadding: 8px 15px 10px 15px;\n}\n\n";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
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

function load() {
    var playerList = player_list.split("},");
    for (var i = 0; i < 100; i++) {
        var name = "play_" + i;
        var item = document.getElementById(name);
        if (item == undefined)
            return;
        var text = item.parentNode.parentNode.previousSibling.previousSibling.getElementsByTagName("a")[0].title
        var playerItem = JSON.parse(playerList[i] + "}");
        item.href = playerItem.url + "?" + text;
    }
}

if (document.readyState == "complete")
    load();
else
    window.addEventListener('load', load, false);