// ==UserScript==
// @name          VU for Jómunkásembör
// @namespace     http://userstyles.org
// @description	  Ez a script arra készült, hogy a Vézetúr játékot nyugodtan játszhassuk melóhelyen, iskolában vagy más nyilvános helyeken.
// @author        z0408
// @homepage      http://userstyles.org/styles/96721
// @include       http://vegzetur.hu/*
// @include       https://vegzetur.hu/*
// @include       http://*.vegzetur.hu/*
// @include       https://*.vegzetur.hu/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "img, input[type=image]{\n    opacity: 0.05 !important;\n    }\n  img[src*=\"add\"],\n  img[src*=\"cross\"],\n  img[src*=\"tick\"]{\n    opacity: 0.2 !important;\n    }\n  img:hover, input[type=image]:hover{\n    opacity: 0.5 !important;\n    }\n    \n  .templomkep{opacity: 0.1 !important;}\n  .templomkep:hover{opacity: 0.5 !important;}\n  .szintkuldikep{opacity: 0.1 !important;}\n  .szintkuldikep:hover{opacity: 0.5 !important;}\n  #szerencsekerek{opacity: 0.1 !important;}\n  #szerencsekerek:hover{opacity: 0.5 !important;}\n  #hordak_haboruja_map{opacity: 0.05 !important;}\n  #hordak_haboruja_map:hover{opacity: 0.3 !important;}\n  .mezo{opacity: 0.1 !important;}\n  .mezo:hover{opacity: 0.9 !important;}\n  \n  tr.link_sor_even.kiemelt,tr.link_sor_odd.kiemelt{font-weight:bold!important;}\n  #targy_popup_content{ border: 2px solid black!important;}\n  \n  *:not(.templomkep):not(.szintkuldikep):not(#szerencsekerek):not(#hordak_haboruja_map):not(.mezo){;background:#fff!important; color:#000!important; }\n  a { color: #007!important; text-decoration: none; }\n  a:hover { color: #5bf!important; }\n  a:visited { color: #557!important; }\n  li.uj a, .specializacio, .turbo, .counter_akt { font-weight: bolder!important;text-decoration:underline!important;color: #f70!important; background: #eee!important;border: 1px solid #ccc!important;}\n  .lathatatlan td { background: #aaa!important; font-weight:bold; }\n  a.gomblink2 span, a.gomblink span, .gomblink_hordja span, .gomblink2_big span, .eladas_gomb, .epitesgomb { border: 2px solid black!important; background: #eee!important; }\n\n  div.hr { border: 2px solid black!important; height: 0px !important; }\n  div.h3_out h3 { border: 1px solid #ccc!important; text-transform: uppercase; }\n \n  div.bal_content {  position: absolute;left: 0px; top: 10px; width:160px}\n  span#rendszerido { position: fixed; left: 45px; top: 0px; }\n \n  td[style=\"color: yellow;\"]           {color: yellow !important; }\n  td[style=\"color: rgb(0, 255, 255);\"] {color: #0FF !important; }\n  td[style=\"color: rgb(0, 204, 0);\"]   {color: #0a0 !important; }\n  td[style=\"color: red;\"]              {color: red !important; }\n  td[style=\"color: rgb(153, 153, 153);\"]   {color: #999 !important; }\n  \n  .felszereles_kep, .fk_kep { width: 20px!important; height: auto !important;}\n \n  div #harmonet, #harmonet_linksor, #header,  .bannerek, #linklista {display: none !important;}\n  .banner {display: none !important; }\n  div #infobox { font-size: 11px!important; }\n  tr[class=\"topicrow\"][style] { background: #f00!important; font-weight:bold }\n \n  td.nevadas a { display: none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
