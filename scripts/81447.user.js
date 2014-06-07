// ==UserScript==
// @name           JamLegend - Moyenne Points Profil
// @namespace      Affiche la moyenne des points des morceaux récément joués à la place du bouton de changement d'arrière plans...
// @version 1.01
// @creator Omega
// @include        http://www.jamlegend.com/user/*
// @require http://sizzlemctwizzle.com/updater.php?id=81447&days=1
// ==/UserScript==
var strscore = new Array();
var score = new Array();
for (var i=0 ; i<5 ; i++) 
{
strscore[i] = document.getElementById('content_header').getElementsByClassName('two_col_top_box float_right')[0].getElementsByClassName('transparent_bg_box')[0].getElementsByClassName('content_box_row clear')[i].getElementsByTagName('div')[0].getElementsByTagName('div')[0].innerHTML;
score[i] = strscore[i].replace( /[^0-9-]/g, "");
score[i] = parseInt(score[i]);
}

function format(valeur,decimal,separateur) {
// formate un chiffre avec 'decimal' chiffres après la virgule et un separateur
	var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ;
	var val=Math.floor(Math.abs(valeur));
	if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
	var val_format=val+"";
	var nb=val_format.length;
	for (var i=1;i<4;i++) {
		if (val>=Math.pow(10,(3*i))) {
			val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
		}
	}
	if (decimal>0) {
		var decim="";
		for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
		deci=decim+deci.toString();
		val_format=val_format+"."+deci;
	}
	if (parseFloat(valeur)<0) {val_format="-"+val_format;}
	return val_format;
}
var total = score[0] + score[1] + score[2] + score[3] + score[4];
moyenne = total/5

var showMoyenne = document.createElement('div');
showMoyenne.innerHTML = 'TEST';
document.getElementById('content_header').getElementsByClassName('two_col_top_box float_right')[0].getElementsByClassName('center padT15 em11')[0].getElementsByTagName('a')[0].href = '';
document.getElementById('content_header').getElementsByClassName('two_col_top_box float_right')[0].getElementsByClassName('center padT15 em11')[0].getElementsByTagName('a')[0].innerHTML = 'Moyenne : ' + format(moyenne, 0, '.') + ' pts';