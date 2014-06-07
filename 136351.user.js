// JavaScript Document
// ==UserScript==
// @name           naus possibles
// @namespace      C:/
// @include http://uni*.ogame.*/game/index.php?page=fleet1*
// ==/UserScript==

var target_dt = document.getElementById("button203").children[0].children[0].children[0].children[0].lastChild;
var target_mt = document.getElementById("button202").children[0].children[0].children[0].children[0].lastChild;
var target_rc = document.getElementById("button209").children[0].children[0].children[0].children[0].lastChild;
var target_edlm = document.getElementById("button214").children[0].children[0].children[0].children[0].lastChild;

var tmp_dt = target_dt.nodeValue;
var tmp_mt = target_mt.nodeValue;
var tmp_rc = target_rc.nodeValue;
var tmp_edlm = target_edlm.nodeValue;

var metal = parseInt(document.getElementById("resources_metal").firstChild.nodeValue.trim().replace(/\./g, ''));
var crystal = parseInt(document.getElementById("resources_crystal").firstChild.nodeValue.trim().replace(/\./g, ''));
var deuter = parseInt(document.getElementById("resources_deuterium").firstChild.nodeValue.trim().replace(/\./g, ''));



if(metal<crystal && metal<deuter){
var count_dt = Math.ceil(metal/2000);
var count_mt = Math.ceil(metal/6000);
var count_rc = Math.ceil(metal/10000);
var count_edlm = Math.ceil(metal/5000000);
}
if(crystal<metal && crystal<deuter){
var count_dt = Math.ceil(crystal/2000);
var count_mt = Math.ceil(crystal/6000);
var count_rc = Math.ceil(crystal/6000);
var count_edlm = Math.ceil(crystal/4000000);
}
if(deuter<metal && deuter<crystal){
var count_rc = Math.ceil(deuter/2000);
var count_edlm = Math.ceil(deuter/1000000);
}
tmp_dt += " " + "(" + count_dt + ")";
tmp_mt += " " + "(" + count_mt + ")";
tmp_rc += " " + "(" + count_rc + ")";
tmp_edlm += " " + "(" + count_edlm + ")";

target_dt.nodeValue = tmp_dt;
target_mt.nodeValue = tmp_mt;
target_rc.nodeValue = tmp_rc;
target_edlm.nodeValue = tmp_edlm;