// ==UserScript==
// @name          Vegzetur aka Doomlord aka VĂŠgzetĂşr - R3MAKE
// @namespace     http://userstyles.org
// @description   Vegzetur.hu aka. vegzetur aka. vĂŠgzetĂşr (hungarian and international online game) ski
// @author        Let
// @homepage      http://userstyles.org/styles/26981
// @include       http://vegzetur.hu/*
// @include       https://vegzetur.hu/*
// @include       http://*.vegzetur.hu/*
// @include       https://*.vegzetur.hu/*
// @include       http://doomlord.net/*
// @include       https://doomlord.net/*
// @include       http://*.doomlord.net/*
// @include       https://*.doomlord.net/*
// ==/UserScript==
(function() {
var css = "div #harmonet, #harmonet_linksor, #hirblock, #fo_flash {display: none !important;}\ndiv #header h2 { display: none !important; }\n.banner {display: none !important; }\n.bannerek {display: none !important; }\n.fust {display: none !important; }\n.google_adsense {display: none !important; }\n.also_banner {display: none !important; } { color: #E9C347; font-size: 15px!important; font-weight:bolder; background: transparent url(http://images.vegzetur.hu/pic/design_uj/halvany_back.png) repeat scroll 0 0}\n#rendszerido:before{content: \"RendszeridĹ� \";}\n#rendszerido:hover {color:white;}\n#copyright:after{content: \"LĂĄsd fent\";}\n\n\n\n\n\ndiv #infobox { font-size: 11px!important; height: 40px!important; }\ndiv #timer5 { color: #00EE00!important; font-size: 12px!important; font-weight:bold; }\ndiv #timer3 { color: #00EE00!important; font-size: 12px!important; font-weight:bold; }\ndiv #timer2 { color: #00EE00!important; font-size: 12px!important; font-weight:bold; } \ndiv #timer1 { color: #00EE00!important; font-size: 12px!important; font-weight:bold; }\ndiv #timer0 { color: #00EE00!important; font-size: 12px!important; font-weight:bold; }\n.vadaszat_info a { color: #FF0000!important; font-size: 12px!important; font-weight:bold; }\n\n\n\ntr[class=\"topicrow\"][style] { background: #004!important; font-weight:bold; font-variant:small-caps;  }\n.topiccim a { color: #FFCC00!important; }";
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
