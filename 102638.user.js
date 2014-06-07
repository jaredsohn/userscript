// ==UserScript==
// @name           The West_-_beta_test
// @description    test script
// @copyright      Hack.Crows/ryuuku
// @author         Hack.Crows
// @website        http://selim.oguz.free.fr/
// @include        http://*.the-west.*/game.php*
// @include        http://userscripts.org/scripts/source/.meta.js
// @require        http://userscripts.org/scripts/source/74144.user.js
// @exclude        http://forum.the-west.fr/*
// @exclude        http://wiki.the-west.fr/*
// @version        1.00.00
// ==/UserScript==

javascript:
var texte=AjaxWindow.topWindow.textContent;
while(texte.indexOf('\n') != -1){texte=texte.replace("\n","");}
while(texte.indexOf('\t') != -1){texte=texte.replace("\t","");}
var x = texte.indexOf('%');
var y = texte.indexOf('%',x+1);
var Motivation = texte.substr(y-3,3);x = texte.indexOf('more');
if(x==-1){x = texte.indexOf('points');}
var pt = (texte.substr(x-4,4)*1)+1;
var a = texte.indexOf('$');x = texte.indexOf('/');x = texte.indexOf(' ',x);
var etat = texte.substr(a+1,x-a-1);x = etat.indexOf('/');
var avancement = etat.substr(0,x) * 1;
var avancementTotal = etat.substr(x+1) * 1;
var r30 = (((0.4 * (pt)) + 20) * (Motivation-1.5)/100 * (30 /120));r30 = (Math.round (r30,0)) ;r30 = (avancement + r30) + '/' + avancementTotal + " (" + r30 + " pts)";
var r60 = (((0.4 * (pt)) + 20) * (Motivation-3)/100 * (60 /120)) ;r60 = (Math.round (r60,0));r60 = (avancement + r60) + '/' + avancementTotal + " (" + r60 + " pts)";
var r120 = (((0.4 * (pt)) + 20) * (Motivation-6)/100 * (120 /120)) ; r120 = (Math.round (r120,0)) ;r120 = (avancement + r120) + '/' + avancementTotal + " (" + r120 + " pts)";alert('Etat:' + etat + '\n' + 'Motivation:' + Motivation + '\n' + 'PT: ' + pt + '\n' + '15 minutes: ' + r30 + '\n' + '30 minutes: ' + r60 + '\n' + '60 minutes: ' + r120);