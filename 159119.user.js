// ==UserScript==
// @name        Google
// @namespace    
// @description  
// @include     https://www.google.com/*
// @include     http://www.google.com/*
// @exclude     *://www.google.com/preferences*
// @exclude     *://www.google.com/advanced_search?*
// @exclude     *://www.google.com/settings*
// @exclude     *://www.google.com/ig
// @resource    background https://lh6.googleusercontent.com/-NaenAzixG-A/UTKE15LIi9I/AAAAAAAAALI/nxVPQsIkFWw/I/mlp_lone_denizen_of_everfree_by_huussii_d5tl1i9%2525281%252529.jpg
// ==/UserScript==
var body = document.body;
var backgrounddiv = document.createElement("div");
body.appendChild(backgrounddiv);
backgrounddiv.id = "divbackground";
var background = document.getElementById("divbackground");
background.style.background = '#000000 url("' + GM_getResourceURL ("background") + '") no-repeat center fixed';
backgrounddiv.style.backgroundSize = "cover";
background.style.position = "fixed";
background.style.zIndex = "-1";
background.style.height = "100%";
background.style.width = "100%";
background.style.top = "0";
fadeout(document.getElementById('divbackground'),12,100);
function fadeout(elem, speed, opacity){
	speed = speed || 20;
	opacity = opacity || 100;
	elem.style.opacity = 0;
	var val = 0;
	(function(){
		elem.style.opacity = val / 100;
		val += 1;
		if (val <= opacity) setTimeout(arguments.callee, speed)
	})();
}
if (document.getElementById("hplogo") != null) {
	if(document.getElementById("gbgs4dn") != null) {
		document.getElementById("gbgs4dn").style.color = "#FFFFFF"
	}
	var oldlogo = document.getElementById('hplogo');
	oldlogo.parentNode.removeChild(oldlogo);
	var footer = document.getElementById("footer").innerHTML = "";
	document.body.style.overflow = "hidden";
	document.getElementById("tsf").lastElementChild.style.padding = "0 0 0 0";
	document.getElementById("tsf").style.maxWidth = "500px";
}
if (document.getElementById("rcnt") != null) {
	document.getElementById("rcnt").parentNode.style.margin="0 auto 0 auto";
	document.getElementById("center_col").parentNode.style.margin="0 auto 0 auto";
	document.getElementById("center_col").style.backgroundColor = "#FFFFFF";
	document.getElementById("center_col").style.paddingBottom="1px";
	var extrares = document.getElementById("extrares");
	extrares.parentNode.removeChild(extrares);
	var foot = document.getElementById("foot");
	foot.style.backgroundColor = "#FFFFFF";
	foot.style.paddingTop="1px";
	foot.style.paddingBottom="25px";
	foot.removeChild(foot.lastElementChild);
	foot.removeChild(foot.lastElementChild);
	foot.removeChild(foot.lastElementChild);
	foot.removeChild(foot.lastElementChild);
	document.getElementById("appbar").style.backgroundColor = "rgba(255, 255, 255, 0.0)";
	document.getElementById("resultStats").style.backgroundColor = "rgba(255, 255, 255, .8)";
	document.getElementById("rhs_block").lastElementChild.style.marginTop = "-5px";
	var element = document.getElementById("rso").lastElementChild;
	if ( element.className !=  "g"){
		element.parentNode.removeChild( element);
	}
	var block = document.getElementById("rhs_block").lastElementChild;
	function descend_to_classless ( obj) {
		for ( var i = 0; obj.className != "" ; i++) {
			obj = obj.firstElementChild;
		}
		return obj;
	}
	block = descend_to_classless( block);
	var main = block.parentNode;
	for ( var i = 0; main.className != ""; i++) {
		block = descend_to_classless( main);
		block = block.parentNode;
		block.style.backgroundColor = "#FFF";
		main = main.nextSibling;
		}
	var feedback = document.getElementById("knop");
	if ( feedback.childNodes[1].className == "rhsvw"){
		feedback.childNodes[1].parentNode.removeChild(feedback.childNodes[1]);
	}
}