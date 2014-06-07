// ==UserScript==
// @name		Retour flotte
// @namespace	nheir
// @version		1.2.1
// @description	Indique l'heure de retour de flotte sur la page mouvement flotte
// @updateURL      http://userscripts.org/scripts/source/165490.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165490.user.js
// @include		http://*.ogame.gameforge.com/game/index.php?page=movement
// ==/UserScript==

//------------ From Antigame ---------------//
function getDatePart (a) {
	return Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
}

function LZ(a) {
	return (0 > a || 9 < a ? "" : "0") + a;
}

function format (a) {
	var d = "";
	var c = new Date();
	var b = (getDatePart(c) !== getDatePart(a) ? "[d]/[m] " : "") + "[H]:[i]:[s]";
	d = b;
	b = a.getHours();
	d = d.split("[d]").join(LZ(a.getDate())).split("[m]").join(LZ(a.getMonth() + 1)).split("[Y]").join(a.getFullYear()).split("[y]").join(a.getFullYear().toString().substr(2, 4)).split("[H]").join(LZ(b)).split("[i]").join(LZ(a.getMinutes())).split("[s]").join(LZ(a.getSeconds()));
	return d;
}
//------------------------------------------//

function parse3(a) {
    a = a.replace(/["<\/span>]/g,"");
    var r = /(\d{2,2})\.(\d{2,2})\.(\d{4,4})\s*(\d{2,2}):(\d{2,2}):(\d{2,2})/;
    r = a.match(r);
    if(r)
    {
        a = new Date(r[3],r[2]-1,r[1],r[4],r[5],r[6],0);
        return a;
    }
    return null;
}

var planet = document.getElementById('planet');
var reg1 = /fleet\d+/;
var reg2 = /\d+/;

var delta = new Date();
var serverTime = parse3(document.getElementById('playerName').parentNode.lastChild.previousSibling.innerHTML);
delta = delta.getTime()-serverTime.getTime();

var dateRetour = {};

var nav = planet.nextSibling;
while(nav)
{
	if(nav.nodeType == 1 && nav.hasAttributes() && reg1.test(nav.id) && nav.getAttribute("data-return-flight") == "false")
	{
		var m = reg2.exec(nav.id);
		var span = document.createElement('span');
        span.id = 'retourFlotte_'+m;
        span.title = 'Retour';
        span.setAttribute('style',"position: absolute; top: 46px; left: 540px; color: yellow;");
		nav.appendChild(span);
        var tret = document.getElementById("timerNext_"+m).title;
        var dret = parse3(tret);
        dateRetour[nav.id] = dret.getTime();
	}
	nav = nav.nextSibling;
}

setInterval(function(){
	var dact = new Date(),
		tact = dact.getTime()-delta,
		nav = planet.nextSibling;
	while(nav)
	{
		if(nav.nodeType == 1 && nav.hasAttributes() && reg1.test(nav.id) && nav.getAttribute("data-return-flight") == "false")
		{
			var m = reg2.exec(nav.id);
			var tarr = nav.getAttribute("data-arrival-time")*1000;
			var darr = new Date(tarr);
			var tret = dateRetour[nav.id];
			tret = tret - 2*(tarr-tact);
			darr.setTime(tret);
			var rf = document.getElementById('retourFlotte_'+m);
			rf.innerHTML = format(darr);
		}
		nav = nav.nextSibling;
	}
	
}, 500);
