// ==UserScript==
// @name           eBay Quick Fix
// @namespace      ion_
// @description    Moves the page selector to the bottom left, and now does a few various other helpful things.
// @version       01-04-2011
// @include        ht*://*.ebay.*/*
// ==/UserScript==
  var usebg = true; // turn on/off to make ebay PRETTY~~!! - WARNING: EXPERIMENTAL.
  var backgroundstyle = 'background-image: url(http://www.cubeupload.com/files/7c000mirrorsedge1.jpg); background-poisiton: right top; background-attachment: fixed; background-color: black;';
  var fimage = 'http://www.burn2u.com/images/filler2.png';
  var rp = 'background-repeat: repeat-xy;';
  var topDiv = document.createElement("div");
  topDiv.setAttribute("name", "blade_div");
  topDiv.setAttribute("id", "supernav");
  topDiv.setAttribute("style", "width: 100%; border-top: solid 1px silver; position: fixed; bottom: 2px; left: 1px; right: 1px;");
	for (var i2=0; i2<document.getElementsByTagName("table").length; i2++) {
    var theEl = document.getElementsByTagName("table")[i2];
    if (theEl.getAttribute("class") == "pager") {
    theEl.setAttribute("style", "position: fixed; bottom: -27px; right: 3px; font-family: Arial !important; font-size: 12pt !important; border: solid 1px black; background-color: white; width: 210px !important;");
    theEl.setAttribute("id", "bpageSelector");
    theEl.setAttribute("onmouseover", 'slidec()');
    theEl.setAttribute("onmouseout", 'slideb()');
    }
	}
	
	var countone = 0;
	for (var i3=0; i3<document.getElementsByTagName("div").length; i3++) {
    var theEl = document.getElementsByTagName("div")[i3];
    if (theEl.getAttribute("class") == "alpdBt2px") theEl.setAttribute("style", "display: none;");
    if (theEl.getAttribute("class") == "h-mnu") theEl.setAttribute("style", "display: none;");
    if (theEl.getAttribute("class") == "h-wrp") theEl.setAttribute("style", "display: none;");
    if (theEl.getAttribute("class") == "th-a2px") theEl.setAttribute("style", "display: none;");
    if (theEl.getAttribute("id") == "rtm_html_433") theEl.setAttribute("style", "display: none;");
    if (theEl.getAttribute("id") == "rtm_html_391") theEl.setAttribute("style", "display: none;");
    if (theEl.getAttribute("class") == "toolsl") theEl.setAttribute("style", "display: none;");
    if (theEl.getAttribute("id") == "sModule") theEl.setAttribute("style", "display: none;");
    if (theEl.getAttribute("class") == "dsft") theEl.setAttribute("style", "display: none;");
    if (theEl.getAttribute("id") == "gh-log") theEl.setAttribute("style", "display: none !important;");
    if (theEl.getAttribute("id") == "LocalNavigation") theEl.setAttribute("style", "width: 200px !important;");
    if (theEl.getAttribute("id") == "gh-sbox") theEl.setAttribute("style", "background-color: white !important; background-image: none;");
    if (theEl.getAttribute("class") == "ebp-pdtp") theEl.setAttribute("style", "display: none !important; left: -9999999px;");
    if (theEl.getAttribute("id") == "leftnav") theEl.setAttribute("style", "padding-top: 4px; font-family: Arial; font-size: 12px; font-weight: bold; color: blue; background-color: transparent !important; background-image: url("+fimage+");");

    if (theEl.getAttribute("class") == "ipp") {
      var navHTML = document.getElementById("bpageSelector");
      var itemc = theEl.innerHTML;
      itemc = itemc.replace(/Items per page/g, 'Show&nbsp;');
      itemc = itemc.replace(/<\/a>/g, "</a>&nbsp;");
      itemc = itemc.replace(/<\/span>/g, "</span>&nbsp;");
      itemc = itemc.replace(/^25/g, "25&nbsp;");
      itemc = itemc.replace(/^50/g, " 50&nbsp;");
      itemc = itemc.replace(/^100/g, " 100&nbsp;");
      itemc = itemc.replace(/^200/g, " 200&nbsp;");
      navHTML.innerHTML = '</tr></table><span align="right" width="100%" style="padding-left: 4px; width: 100% !important;"><font align="right" style="font-size: 11px !important; font-family: arial; align: right;">' + unescape("&#31;") +  ' ebayNavFix <font color="#bbbbbb"><small>v 1.3</small></font> &nbsp;|&nbsp;' + itemc + " items per page</font></span>\r\n<table><tr>" + navHTML.innerHTML;
      theEl.setAttribute("style", "display: none;");
    }
    
	}
	// remove those RETARDED "sponsored ads/results"
	// this will add an element to the DOM so the function will run continuously
  var theBox = document.createElement("div")
  theBox.setAttribute("style", "display:none;");
  theBox.innerHTML = unescape('%09%3Cscript%20type%3D%22text/javascript%22%3EloopKillAds%28%29%3B%20%0A%09function%20loopKillAds%28%29%20%7B%0A%09%09for%20%28var%20i7%3D0%3B%20i7%3Cdocument.getElementsByTagName%28%22div%22%29.length%3B%20i7++%29%20%7B%0A%09%09%20%20%20%20var%20theEl%20%3D%20document.getElementsByTagName%28%22div%22%29%5Bi7%5D%3B%0A%09%09%20%20%20%20if%20%28theEl.getAttribute%28%22id%22%29%20%3D%3D%20%22rtm_html_391%22%29%20theEl.setAttribute%28%22style%22%2C%20%22display%3A%20none%3B%22%29%3B%0A%09%09%7D%0A%09%20var%20timerId%20%3D%20setTimeout%28%22loopKillAds%28%29%22%2C%201350%29%3B%0A%09%7D%3C/script%3E');
  document.body.appendChild(theBox);
  
  var theBox2 = document.createElement("div")
  theBox2.setAttribute("style", "display:none;");
  theBox2.setAttribute("id", "slidefunctiondiv");
  var ttm = '<script type="text/javascript">' + "\r\n";
  ttm += 'var elm=document.getElementById("bpageSelector");' + "\r\n";
  ttm += 'function slidec() { elm.setAttribute("style","position: fixed; bottom: 3px; right: 3px; font-family: Arial !important; font-size: 12pt !important; border: solid 1px black; background-color: white; width: 210px !important;"); }';
  ttm += 'function slideb() { elm.setAttribute("style","position: fixed; bottom: -27px; right: 3px; font-family: Arial !important; font-size: 12pt !important; border: solid 1px black; background-color: white; width: 210px !important;"); }';
  ttm += '</script>';
  theBox2.innerHTML = ttm;
  document.body.appendChild(theBox2);

	// Set background image -- Note: testing only
	if (usebg==true) {
		if (document.getElementById("leftNavMenu")) {
		var y = document.getElementById("leftNavMenu");
		var p = y.parentNode;
		p.setAttribute("style", "background-color: transparent !important;");
		}
		var newClass = document.createElement("style");
		newClass.setAttribute("type", "text/css");
		var CSSHTML;
		CSSHTML += "div {background-color: transparent !important; background-image: none !important;}\r\n";
		CSSHTML += "#LeftPanel {background-color: transparent; background-image: url("+fimage+"); "+rp+"}\r\n";
		CSSHTML += ".asr-nd {background-color: transparent !important;}\r\n";
		CSSHTML += ".asr-v {background-color: transparent !important;}\r\n";
		CSSHTML += ".pref {background-color: transparent !important;}\r\n";
		CSSHTML += ".ff-rail {background-color: transparent !important;}\r\n";
		CSSHTML += ".navp {background-color: transparent !important;}\r\n";
		CSSHTML += ".fsbr {background-color: transparent !important; background-image: url(); "+rp+"}\r\n";
		CSSHTML += "a {color: #ac330f; !important; font-weight: bold;}\r\n";
		CSSHTML += "a:hover {color: #ffcc00 !important;}\r\n";
		CSSHTML += "a:active {color: #ffff00 !important;}\r\n";
		CSSHTML += "a:visited {color: #339f77 !important;}\r\n";
		CSSHTML += "#LeftNavMenu {background-color: transparent; background-image: url("+""+"); "+rp+"}\r\n"
		CSSHTML += "#leftnav {background-color: transparent !important;}\r\n";
		CSSHTML += ".ln {background-color: transparent;}\r\n";
		CSSHTML += ".r3 {background-color: transparent;}\r\n";
		CSSHTML += ".c {backgroundcolor: transparent !important;}\r\n";
		CSSHTML += ".gy-br {background-color: transparent !important;}\r\n";
		CSSHTML += ".ic-mc {background-color: transparent !important; background-image: url("+fimage+"); "+rp+"}\r\n";
		CSSHTML += ".gh-mn {background-color: transparent !important; background-image: url("+fimage+");}\r\n";
		CSSHTML += "#CenterPanel {background-image: url("+fimage+");}\r\n";
		CSSHTML += ".cr-w {background-image("+fimage+");}\r\n";
		CSSHTML += ".cr-bt {background-image("+fimage+");}\r\n";
		CSSHTML += ".c-gy-bdr {background-image: url("+fimage+");}\r\n";
		CSSHTML += ".tRtL {background-color: transparent !important; background-image: none;}\r\n";
		CSSHTML += ".tLtL {background-color: transparent !important; background-image: none;}\r\n";
		CSSHTML += ".ttALt {background-color: transparent !important; background-image: none;}\r\n";
		CSSHTML += ".ttARt {background-color: transparent !important; background-image: none;}\r\n";
		CSSHTML += ".r3_cm {background-color: transparent !important;}\r\n";
		CSSHTML += ".bp {background-color: transparent !important;}\r\n";
		CSSHTML += ".tp {background-color: transparent !important;}\r\n";
		CSSHTML += ".r3_c {background-color: transparent !important;}\r\n";
		CSSHTML += "div#totalCompRcpSelling {background-color: transparent !important;}\r\n";
		CSSHTML += "div#totalsh {background-color: transparent !important;}\r\n";
		CSSHTML += "div#totalscm {background-color: transparent !important;}\r\n";
		CSSHTML += ".secCnt {background-color: transparent; background-image: url("+fimage+"); "+rp+"}\r\n";
		CSSHTML += ".item_description {background-color: transparent; background-image: url("+fimage+") !important; "+rp+"}\r\n";
		CSSHTML += "#CentralArea {background-color: transparent; background-image: url("+fimage+") !important; " + rp + "}\r\n";
		newClass.innerHTML = CSSHTML;
		newClass.setAttribute("id", "leftnavfixstyle");
		document.body.appendChild(newClass);
		document.body.setAttribute('style', backgroundstyle);
	}