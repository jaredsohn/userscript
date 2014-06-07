// ==UserScript==
// @name		Automatischer Login
// @namespace		http://javan.de
// @description		Loggt sich automatisch ins Spiel ein
// @author		Javan
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_xmlhttpRequest
// @grant		GM_openInTab
// @include		http://*pennergame.de*
// @version		1.0.1
// @updateURL		http://userscripts.org/scripts/source/154163.user.js
// @downloadURL		http://userscripts.org/scripts/source/154163.user.js
// @icon		http://javan.de/tools/live/favicon.png
// ==/UserScript==

var version = '1';
var link = 'http://' + window.location.host;
var url = window.location;
var stadt = window.location.host + '.';
var script = 'autologin';

if(document.getElementsByTagName('body')[0].innerHTML.search(/user_name/) != -1){
	var username = document.getElementsByClassName('user_name')[0].innerHTML;
}


if(GM_getValue(stadt + "anaus") == null){
GM_setValue(stadt + "anaus", 'An');
}
if(GM_getValue(stadt + "_username") == null){
GM_setValue(stadt + "_username", username);
}
if(GM_getValue(stadt + "_password") == null){
GM_setValue(stadt + "_password", " ");
}

var neuerdiv = document.createElement("div");
var ausgabebereich = document.getElementsByTagName('body')[0];
ausgabebereich.appendChild(neuerdiv);
neuerdiv.innerHTML += '<form><div id="' + script + '" style="border-radius:5px;background-color:#313131;font-size:13px;color:#ffffff;background-image:url(\'http://img152.imageshack.us/img152/5117/1f50c5097a6842f5913393d.png\');padding:5px;border:1px solid #000000;-moz-border-radius:5px;left:'+GM_getValue(script + 'vonseite') + ';top:'+GM_getValue(script + 'vonoben') + ';position:absolute;text-align:left;">'
+'<table border="0"><tr><td>Username:</td><td><input type="text" name="' + script + '_username" value="' + GM_getValue(stadt + "_username") + '"/></td></tr>'
+'<tr><td>Passwort:</td><td><input type="password" name="' + script + '_password" value="' + GM_getValue(stadt + "_password") + '"/></td></tr></table>'
+'<span style="float:right;"><input type="button" name="' + script + '_speichern" id="' + script + '_speichern" value="' + GM_getValue(stadt + "anaus") + 'schalten" />'
+' &copy; Javan_xD</span></div></form>';
document.getElementById(script).addEventListener('mouseover', function speichern(){
	GM_setValue(stadt + '_username', document.getElementsByName(script + '_username')[0].value);
	GM_setValue(stadt + '_password', document.getElementsByName(script + '_password')[0].value);
},false);
document.getElementById(script + '_speichern').addEventListener('click', function speichern(){
	if(GM_getValue(stadt + "anaus") == 'An'){
	GM_setValue(stadt + "anaus", 'Aus');
	}else{
	GM_setValue(stadt + "anaus", 'An');
	}
	document.getElementsByName(script + '_speichern')[0].value = GM_getValue(stadt + "anaus") + 'schalten';
	location.reload();
},false);



if(GM_getValue(stadt + "anaus") == 'Aus' && url.toString().search("logout") == -1){

function login(){
		
	GM_xmlhttpRequest({
		method: 'GET',
		url: link+ '/',
		headers:  {'Content-type': 'application/x-www-form-urlencoded'},
		onload: function(responseDetails) {
				
			var content = responseDetails.responseText;
			if(content.search(/Die letzten News/) == -1) {				
			
					
					
				GM_xmlhttpRequest({
					method: 'POST',
					url: link+ '/login/check/',
					headers:  {'Content-type': 'application/x-www-form-urlencoded'},
					data: encodeURI('username=' + GM_getValue(stadt + "_username") + '&password=' + GM_getValue(stadt + "_password")),
					onload: function(responseDetails) {
				
						var content = responseDetails.responseText;
						if(content.search(/Die letzten News/) == -1) {
							location.reload();
						}
				}});
			}
	}});
}	
			
			var counter = 617;
			var los = counter*1000+10000;
			var loskurz = counter*1000+4000;
			setTimeout(function(){login();}, Math.floor( Math.random() * (Number(los) - Number(loskurz)) ) + Number(loskurz) );	
			
	if(document.getElementsByTagName('body')[0].innerHTML.search(/Aus:/) == -1){
		login();
	}

}
//---------------------------------------------------------------------------------------------------
//  			MouseEvent
//---------------------------------------------------------------------------------------------------
document.getElementById(script).addEventListener('dblclick', function(mouseEvent){		//alles verschieben mit dblclick
	var objDrag = document.getElementById(script);
	var oldX = mouseEvent.pageX;
	var oldY = mouseEvent.pageY;
	var objX = objDrag.offsetLeft;
	var objY = objDrag.offsetTop;
	var newX = 0;
	var newY = 0;
	var move = function (mouseEvent){
		newX = mouseEvent.pageX;
		newY = mouseEvent.pageY;
		objDrag.style.left = (objX + newX - oldX) + 'px';
		objDrag.style.top = (objY + newY - oldY) + 'px';
	}
	document.body.addEventListener('mousemove', move, true);
	objDrag.addEventListener('click', function (){		//aktuelle position speichern
		document.body.removeEventListener('mousemove', move, true);
		objDrag.style.cursor = 'auto';
		if (newX != 0 || newY != 0){
			GM_setValue(script + 'vonseite',(objX + newX - oldX) + 'px'); 
			GM_setValue(script + 'vonoben',(objY + newY - oldY) + 'px'); 
			
		}
	},false);
	objDrag.style.cursor = 'move';
}, false);


// Copyright (c) by Javan_xD
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.