// ==UserScript==
// @name           Unlock Orkut Albuns
// @namespace      http://greasemonkey.sitesbr.net
// @description    Allows viewing photos even with padlock
// @include        *.orkut.com*profile.aspx*
// ==/UserScript==

/*
 * Autor: Sergio Abreu - Brasil
 *
 * Criação: 23/12/2007
 * Updated: 24/12/2007 01:30h   ::  v 1.2 Bilingual - Português / Inglês
 *
 */

function waitToLoad(){

var db = document.body.innerHTML;
var lg = db.match(/"fotos"/) ? 1 : 0;

var msg = lg ? "Liberadas pelo Destrava Álbuns, by Sergio Abreu" : "Unlocked by Sergio Abreu's Unlock Album script";
var placa = lg ? "Fotos =]" : "Photos =]";
var voltar = lg ? "Voltar" : "Back";

if( db.match(/icn_privacy_private/)) {
address = location.href;
var s="", fo = db.match(/http.+medium.+\.jpg/)[0];
for( var i=1; i < 101; i++){
s += "<img onerror='esconde(this)' src='" + fo.replace(/medium/, 'milieu/' + i) + "'>";
}

var magica = "document.write(\"<html><head><title>"+ msg +"<\/title>" +
	"<scr"+"ipt type='text/javasc"+"ript'>function esconde(o){o.style.display='none';}</sc"+"ript><\/head>"+
	"<body><center><br><br><table border=0 cellspacing=0 cellpadding=0><tr><td>"+
	"<img border=0 src='http://images3.orkut.com/img/bl.gif'></td>"+
	"<td valign='middle' height='20' style='background:url(http://images3.orkut.com/img/bm.gif)'><a href='" + address + "' "+
	"style='height:20px; cursor:pointer;color:black;font-family:arial,verdana;font-size:12px;font-weight:normal;text-decoration:none;'>"+
	voltar+"</a></td>"+
	"<td><img border=0 src='http://images3.orkut.com/img/br.gif'></td></tr></table><br><br>" + s + "<br><br><table border=0 cellspacing=0 cellpadding=0><tr><td>"+
	"<img border=0 src='http://images3.orkut.com/img/bl.gif'></td>"+
	"<td valign='middle' height='20' style='background:url(http://images3.orkut.com/img/bm.gif)'><a href='" + address + "' "+
	"style='height:20px; cursor:pointer;color:black;font-family:arial,verdana;font-size:12px;font-weight:normal;text-decoration:none;'>"+
	voltar+"</a></td>"+
	"<td><img border=0 src='http://images3.orkut.com/img/br.gif'></td></tr></table><\/center><\/body><\/html>\")"

var bt = document.createElement('div');
bt.setAttribute('style', 'width:50px;  height:auto; margin:3px; padding:3px; border:1px solid #aaaaaa; -moz-border-radius:7px; cursor:pointer; color:red; background:#ffffcc; font-size:9px;');
bt.setAttribute('onclick', magica); 
bt.setAttribute('title', msg);
bt.innerHTML = placa;

var bt2 = document.createElement('div');
bt2.setAttribute('class', 'lf');
bt2.setAttribute('style', 'width:'+(lg?50:60)+'px; margin-top:5px; height:15px; padding:7px 10px 3px 10px; border:1px solid #aaaaaa; -moz-border-radius:7px; cursor:pointer; color:red; background:#ffffcc; font-size:10px;');
bt2.setAttribute('onclick', magica); 
bt2.setAttribute('title', msg);
bt2.innerHTML = placa;

var as, at = document.links;

as = new Array();

for( var i=0; i < at.length; i++){
 if(at[i].innerHTML.match(/(f|ph)otos/) && at[i].innerHTML.match(/icn_privacy_private/)){ as[ as.length] = at[i];}
 if( as.length > 1) break;
}

as[0].parentNode.replaceChild(bt , as[0]);
as[1].parentNode.replaceChild(bt2, as[1]);
}

}

window.addEventListener('load', waitToLoad, false);

/*
 * Now, bilingual: Pt-Br / US
 */