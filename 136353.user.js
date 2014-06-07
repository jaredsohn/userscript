// JavaScript Document
// ==UserScript==
// @name           naves
// @namespace      C:/
// @include http://uni*.ogame.*/game/index.php?page=shipyard*
// ==/UserScript==

var target_dt = document.getElementById("button1").children[0].children[0].children[0].children[0].lastChild;
var target_mt = document.getElementById("button2").children[0].children[0].children[0].children[0].lastChild;
var target_rc = document.getElementById("button4").children[0].children[0].children[0].children[0].lastChild;
var target_edlm = document.getElementById("button8").children[0].children[0].children[0].children[0].lastChild;

var tmp_dt = target_dt.nodeValue;
var tmp_mt = target_mt.nodeValue;
var tmp_rc = target_rc.nodeValue;
var tmp_edlm = target_edlm.nodeValue;

var metal = parseInt(document.getElementById("resources_metal").firstChild.nodeValue.trim().replace(/\./g, ''));
var crystal = parseInt(document.getElementById("resources_crystal").firstChild.nodeValue.trim().replace(/\./g, ''));
var deuter = parseInt(document.getElementById("resources_deuterium").firstChild.nodeValue.trim().replace(/\./g, ''));

//cazador ligero
if(Math.floor(metal/3000) < Math.floor(crystal/1000)){
var count_dt = Math.floor(metal/3000);
}
else{
	var count_dt = Math.floor(crystal/1000);
	}
	// cazador pesado
if(Math.floor(metal/6000) < Math.floor(crystal/4000)){
var count_mt = Math.floor(metal/6000);
}
else{
	var count_mt = Math.floor(crystal/4000);
	}
//nave de batalla
if(Math.floor(metal/45000) < Math.floor(crystal/15000)){
var count_rc = Math.floor(metal/45000);
}
else{
	var count_rc = Math.floor(crystal/15000);
	}
var count_rc 
var count_edlm = Math.floor(metal/5000000);



tmp_dt += " " + "(" + count_dt + ")";
tmp_mt += " " + "(" + count_mt + ")";
tmp_rc += " " + "(" + count_rc + ")";
tmp_edlm += " " + "(" + count_edlm + ")";

target_dt.nodeValue = tmp_dt;
target_mt.nodeValue = tmp_mt;
target_rc.nodeValue = tmp_rc;
target_edlm.nodeValue = tmp_edlm;