// ==UserScript==
// @name           Pennergame Pixelfehler
// @author         _thetiger_
// @description    fuegt einen "Pixelfehler" am Monitor hinzu...
// @include        http://*pennergame.de/*
// @exclude				 http://*board.pennergame.de/*
// @exclude				 *anonym.to*
// ==/UserScript==
document.body.innerHTML += '<div id="hehe" style="position:fixed;top:300px;left:700px;background:red;z-index:10000;height:1px;width:1px;"></div>';

document.getElementById("hehe").addEventListener("mouseover", function() {
				alert("Das ist er der Pixelfehler!");
				alert("Haettest du wohl lieber deine Maus nicht ueber den leuchtenden roten Punkt bewegt...");
				alert("Ich weiss nicht wem so ein Skript gefallen koennte aber wenns jemandem gefaellt der soll es mir doch bitte melden...");
},false);

