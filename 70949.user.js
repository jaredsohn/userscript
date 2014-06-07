// ==UserScript==
// @name           hordes-mp
// @namespace      hordes-mp
// @include        http://www.hordes.fr/*
// ==/UserScript==

function $(id){ return document.getElementById(id); }
function $e(node) { return document.createElement(node); }

// cookies //
// write, read, erase
function cook(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function eat(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function trash(name) {
	createCookie(name,"",-1);
}

function getsk() {
  if ( eat('sk') != null )
    return eat('sk');
  var logoutNode=$('logout');
  if ( logoutNode != null ) {
    var chtrouv= "js.XmlHttp.get('user/logout?sk=";
    var posstr= logoutNode.innerHTML.indexOf(chtrouv,0);
    if ( posstr >= 0 ) {
      var str= logoutNode.innerHTML.substr( posstr + chtrouv.length );
      cook('sk', str.substr( 0, str.indexOf("'",0)), 2);
    }else{
      cook('sk', null, 2);
      alert("Script GM: Clé de session non trouvée!");
    }
  }else{
    //alert("Script GM: Pas encore logué mais script actif: faire shift-reload après login");
    GM_log("HorTools.getsk: pas de sk disponible, qui m'a appelé ?"); // Avertissement
  }
  //GM_log("HorTools: " + this.sk); //DEBUG
  return eat('sk');
}
function httpGet(url,exact) {
  if ( ! exact ) {
    var morepar= url.indexOf('?') == -1 ? '?' : ';'; // (cond?oui:non)
    if (url.indexOf('sk=') == -1)
      url += morepar+"sk="+getsk();
    var rnd= Math.round(Math.random()*10000000);
    url += ";rand=" + rnd; // forcément déjà un paramètre donc pas de test pour '?' ou ';'
  }
  //GM_log("HorTools.httpGet: XMLHttpRequest: "+url); // DEBUG
  var req = new XMLHttpRequest();
  req.open("get", "/"+url, false);
  req.setRequestHeader("X-Handler","js.XmlHttp");// nécessaire
  req.send(null);
  return req.responseText;

}
function getMyUID() {
//   GM_log("HorTools.getMyUID: début"); //DEBUG
	if ( eat('uid') != null ) {
		GM_log("MyUID: trouvé en cache objet, uid= "+eat('uid')); // DEBUG
		return eat('uid');
	}
	var html= httpGet('ghost/user');
	var pos= html.indexOf("showV1");
	if ( pos == -1 ) {
		GM_log("HorTools.getMyUID: uid avec showV1 non présent!"); // Avertissement //TODO prévoir un signalement autre ?
		return "";
	}
  var html2=html.substr(pos+1);
  var uid;
  try {
    uid= html2.match(/uid=(.+?);/);
    uid=uid[1];
    cook('uid', uid, 2);
  }catch(e){
    cook('uid', "", 2);
  }
  GM_log("HorTools.getMyUID: trouvé uid: "+eat('uid')); //DEBUG

	// extraction d'un des numéro de ville, pour getMyPSeudo
	try{
		var motif= "#ghost/ingame?id=";
		pos= html.indexOf(motif);
		var html3= html.substr(pos+motif.length);
		cook('aCityId', html3.match(/^(\d+)/)[1], 2); // mis en mémoire cache objet
		if ( ! parseInt(eat('aCityId')) )
			cook('aCityId', null, 2);
		GM_log("HorTools.getMyUID: une des ville a pour n°: "+this.aCityId); //DEBUG
	}catch(ex){
		GM_log("HorTools.getMyUID: pas de ville ancienne..."); //DEBUG
		cook('aCityId', null, 2);
	}

  return eat('uid'); // c'est un nombre retourné sous forme de texte ! (pour faire clé de hash)
}
function getMyPseudo(){ // retourne le uid du perso courant,
	if ( eat('myPseudo') ) {
    GM_log("HorTools.getMyPseudo: trouvé en cache objet, pseudo= "+this.myPseudo); // DEBUG
		return eat('pseudo');
	}
	if ( eat('aCityId') == null ) {
		getMyUID(); // résultat posé en mémoire objet
	}
	if ( eat('aCityId') != null ) {
		var html= httpGet("ghost/ingame?id="+eat('aCityId'));
		//GM_log(html); // DEBUG ET GROS
		var motif= "tr class=\"me\"";
		var pos= html.indexOf(motif);
		html= html.substr(pos+motif.length);
		motif= "td class=\"name\"";
		pos= html.indexOf(motif);
		html= html.substr(pos+motif.length);
		pseudo= html.match(/>(.*?)<\/a>/)[1];
		if ( ! pseudo )
			pseudo= "";
	}else{
		GM_log("HorTools.getMyPseudo: Pas d'ancienne cité trouvée pour déterminer le pseudo...");
		pseudo="";
	}
	cook('pseudo', pseudo, 2);
	return pseudo;
}


function getJson(pseudo){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://6-11.latest.hordes-mp.appspot.com/json?pseudo='+pseudo,
		onload: function(responseDetails) {
			var json = responseDetails.responseText
			update(json);
		}
	});
}
function update(json){
	json = eval('('+json+')');
	for (var i in json.message) {
		if(json.message[i].state == 0){
			mail.src = 'http://jellycopter.net/img/small_new_mail.gif';
			return true;
		}
	}
	mail.src = 'http://data.hordes.fr/gfx/icons/small_mail.gif';
	return true;
}
function adddisplay(){
	$('sites').parentNode.appendChild(display);
}

var display = $e('div');
	display.style.backgroundColor = '#5C2B20';
	display.style.border = '1px solid #F0D79E';
	display.style.outline = '1px solid black';
	display.style.position = 'absolute';
	display.style.top  = '35px';
	display.style.padding = '0px 5px';
	display.style.marginLeft = '-10px';
	display.style.zIndex = '4';

var mail = $e('img');
	mail.src = 'http://data.hordes.fr/gfx/icons/small_mail.gif';

var a = $e('a');
	a.href = 'http://hordes-mp.appspot.com/log?p='+getMyPseudo();

var json;
var i = 0;

	display.appendChild(a);
	a.appendChild(mail)
	adddisplay();
	getJson(getMyPseudo());
	document.addEventListener('load', function(evt) {adddisplay();}, true);