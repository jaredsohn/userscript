// ==UserScript==
// @name       En BatallaXX
// @version    1.0.0
// @description  En BatallaXX
// @copyright Bit Bytes Team
// @author richirm
// @match *ori.pokemonrpgonline.com/bin/index.php?area=8
// ==/UserScript==

// console.log('########################## Pokemon RPG Online Battle Script ###############################');

//////////// ADD jQuery //////////////////////////////////
function addJquery(js){
	if(js==null){ js = 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';}
	var d = document;var s = d.createElement("script");s.type="text/javascript";s.src=js;
	var h = d.getElementsByTagName("head")[0];
	h || (h=d.body.parentNode.appendChild(d.createElement("head")));h.appendChild(s);
}
//////////// ADD jQuery UI //////////////////////////////////
function addJqueryUIJs(js){
	if(js==null){ js = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js';}
	var d = document;var s = d.createElement("script");s.type="text/javascript";s.src=js;
	var h = d.getElementsByTagName("head")[0];
	h || (h=d.body.parentNode.appendChild(d.createElement("head")));h.appendChild(s);
}
//////////// ADD jQuery UI Js//////////////////////////////////
function addJqueryUICss(css){
	if(css==null){ css = 'http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css';}
	var d = document;var s = d.createElement("link");s.type="text/css";s.href=css;s.ref="stylesheet"
	var h = d.getElementsByTagName("head")[0];
	h || (h=d.body.parentNode.appendChild(d.createElement("head")));h.appendChild(s);
}

//////////// ADD jQuery UI Css //////////////////////////////////
function addPro(js){
	if(js==null){ js = 'http://abduxion.ekiwi.es/juegos/pokemonrpg/script/pro.js';}
	var d = document;var s = d.createElement("script");s.type="text/javascript";s.src=js;
	var h = d.getElementsByTagName("head")[0];
	h || (h=d.body.parentNode.appendChild(d.createElement("head")));h.appendChild(s);
}
// exec function
addJquery();
addJqueryUIJs();
addJqueryUICss();
addPro();