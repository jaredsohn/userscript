// ==UserScript==
// @name           SFC Apocalypse v1.1
// @namespace      Despondent.US
// @description    Updated version with Heph Support
// @include        http://*playstarfleet*.com/*
// ==/UserScript==

(function() {
var css = "";
css += "@namespace url(http://www.w3.org/1999/xhtml);";
if (false || (document.location.href.indexOf("http://playstarfleet.com") == 0))
	css += "body {\nbackground: #000000 url(http://despondent.us/background.jpg) no-repeat scroll left top !important;\n}";
if (false || (document.location.href.indexOf("http://uni2.playstarfleet.com") == 0))
	css += "body {\nbackground: #000000 url(http://despondent.us/background.jpg) no-repeat scroll left top !important;\n}";
if (false || (document.location.href.indexOf("http://playstarfleetextreme.com") == 0))
	css += "body {\nbackground: #000000 url(http://despondent.us/background1.jpg) no-repeat scroll left top !important;\n}";

css += "#header .navigation .sub_nav a.selected, #header .navigation .sub_nav a:hover {\nbackground-image: url(http://www.sfcstats.com/extra/skins/metallic/nav_highlight_small.jpg) !important;}";
css += "#header .navigation .main_nav .primary a {\ncolor: #FFFFFF !important;\n}";

css += "#header .main .resources {\nmargin-bottom: 52px !important;\n}";
css += "#header .main {\nheight: 116px !important;\n}";

css += "img[alt=\"Starfleet Commander\"]{\nwidth: 0px !important;\nheight: 116px !important;\npadding-left: 254px !important;\nbackground-image: url(http://despondent.us/sfc-logo1.jpg) !important;\nbackground-position: center center;\nbackground-repeat: no-repeat;\n}";
css += "img[alt=\"Starfleet Commander Extreme\"]{\nwidth: 0px !important;\nheight: 116px !important;\npadding-left: 254px !important;\nbackground-image: url(http://despondent.us/extreme-logo1.jpg) !important;\n}";
css += "img[alt=\"Starfleet Commander - Uni 2\"]{\nwidth: 0px !important;\nheight: 116px !important;\npadding-left: 254px !important;\nbackground-image: url(http://despondent.us/sfc2-logo1.jpg) !important;\nbackground-position: center center;\nbackground-repeat: no-repeat;\n}";

css += ".navigation {\nbackground-image: url(http://despondent.us/sfc-menu1.jpg) !important;\nbackground-repeat: repeat !important;\nwidth: 98% !important;\n}";
css += ".footer {\nbackground-image: url(http://despondent.us/sfc-menu1.jpg) !important;\nbackground-repeat: repeat !important;\nwidth: 100% !important;\nmargin-bottom: 125px !important;\n}";

css += ".spacer {\nheight: 0px !important;\n}";
css += ".colonies {\nwidth: 625px !important;\n}";
css += ".positioner {\nwidth: 100% !important;\n}";
css += ".inner_logout {\ndisplay: none !important\n}";
css += ".user_stats {\nfont-size: 10px !important\n}";
css += ".home_planet {\nmargin-top: 0px !important;\n}";
css += ".planet_choice selected, .planet_choice { width: 8.9% !important; }";
css += ".system_time {\nposition: absolute;\nbackground-image: none !important;\nborder: none !important;\n}";
css += ".logout {\nbackground-image: none !important;\npadding-bottom: 0px !important;\nmargin-bottom: 0px !important;\nposition: absolute;\npadding-top: 0px !important;\nborder-bottom: 0px !important;\n}";

css += "#user_planets {\nwidth: auto !important;\n}";

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

function getElementsByClassName(cl,obj) {
  var retnode = [];
  var myclass = new RegExp('\\b'+cl+'\\b');

  if( !obj ) obj = document.body;

  var elem = obj.getElementsByTagName("div");
  for (var i = 0; i < elem.length; i++) {
    var classes = elem[i].className;
    if (myclass.test(classes)) retnode.push(elem[i])
  }
  return retnode;
}

var planetSelector = document.getElementsByClassName("planet_selector");
if( !planetSelector || planetSelector.length == 0) return;

myInner = planetSelector[0].innerHTML;

myInner = myInner.replace(/[\n\r\t]/g,"");
myInner = myInner.replace("</div>      <div class=\"planets_box\">", "");

planetSelector[0].innerHTML = myInner;