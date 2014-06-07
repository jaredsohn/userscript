// ==UserScript==
// @author		  ROBOT BOY
// @name          Travian Signature for Messages UPDATED
// @namespace     http://userscripts.org/
// @description   This Script Will Automatically Create signature to your Messages.
// @include       http://ts4.travian.*/nachrichten.php
// @include       http://ts4.travian*.*/nachrichten.php?t=1
// @include       http://ts4.travian*.*/nachrichten.php?t=1&id=*
// @version		  2.001
// ==/UserScript==
//Any problems then message me at 70.cyborg.07@gmail.com


// E[tid8]IT THIS "in the cotes":
var greet=""
var regards=""

// TURK
var sig11 = "[tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30]"+"\n"+"[tid30][tid8][tid8][tid8][tid8][tid8][tid30][tid8][tid30][tid30][tid8][tid30][tid8][tid8][tid8][tid30][tid30][tid8][tid30][tid30][tid8][tid30]"
var sig12 = "[tid30][tid8][tid8][tid8][tid8][tid8][tid30][tid8][tid30][tid30][tid8][tid30][tid8][tid8][tid8][tid30][tid30][tid8][tid30][tid30][tid8][tid30]"
var sig13 = "[tid30][tid30][tid30][tid8][tid30][tid30][tid30][tid8][tid30][tid30][tid8][tid30][tid8][tid30][tid30][tid8][tid30][tid8][tid30][tid8][tid30][tid30]"
var sig14 = "[tid30][tid30][tid30][tid8][tid30][tid30][tid30][tid8][tid30][tid30][tid8][tid30][tid8][tid8][tid8][tid30][tid30][tid8][tid8][tid30][tid30][tid30]"
var sig15 = "[tid30][tid30][tid30][tid8][tid30][tid30][tid30][tid8][tid30][tid30][tid8][tid30][tid8][tid30][tid8][tid30][tid30][tid8][tid30][tid8][tid30][tid30]"
var sig16 = "[tid30][tid30][tid30][tid8][tid30][tid30][tid30][tid30][tid8][tid8][tid30][tid30][tid8][tid30][tid30][tid8][tid30][tid8][tid30][tid30][tid8][tid30]"
var sig17 = "[tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30][tid30]"

//ISDA
var sig1 = "[tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8]"
var sig2 = "[tid8][tid30][tid30][tid30][tid8][tid8][tid8][tid30][tid30][tid30][tid8][tid8][tid30][tid30][tid30][tid8][tid8][tid8][tid8][tid8][tid30][tid8][tid8][tid8]"
var sig3 = "[tid8][tid8][tid30][tid8][tid8][tid8][tid30][tid8][tid8][tid8][tid8][tid8][tid30][tid8][tid8][tid30][tid8][tid8][tid8][tid30][tid8][tid30][tid8][tid8]"
var sig4 = "[tid8][tid8][tid30][tid8][tid8][tid8][tid30][tid30][tid30][tid8][tid8][tid8][tid30][tid8][tid8][tid30][tid8][tid8][tid30][tid8][tid8][tid8][tid30][tid8]"
var sig5 = "[tid8][tid8][tid30][tid8][tid8][tid8][tid8][tid8][tid8][tid30][tid8][tid8][tid30][tid8][tid8][tid30][tid8][tid8][tid30][tid30][tid30][tid30][tid30][tid8]"
var sig6 = "[tid8][tid30][tid30][tid30][tid8][tid8][tid30][tid30][tid30][tid8][tid8][tid8][tid30][tid30][tid30][tid8][tid8][tid8][tid30][tid8][tid8][tid8][tid30][tid8]"
var sig7 = "[tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8][tid8]"

// Pipistrelli

var pip1 ="[tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34]"
var pip2 = "[tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44] [color=white]oo[/color] [giocatore]4597[/giocatore] [color=white]oo[/color] [tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44][tid44]"

var pip3 ="[tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34][tid34]"


//TILL HERE

var isda = sig1+"\n"+sig2+"\n"+sig3+"\n"+sig4+"\n"+sig5+"\n"+sig6+"\n"+sig7
var turk = sig11+"\n"+sig12+"\n"+sig13+"\n"+sig14+"\n"+sig15+"\n"+sig16+"\n"+sig17
var pipistrelli = pip1+"\n"+pip2+"\n"+pip3

var message = document.getElementById('message');

if (message) {
	message.innerHTML = "\n\n"+pipistrelli+ message.innerHTML;
}