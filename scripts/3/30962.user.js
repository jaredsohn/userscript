// ==UserScript==
// @name          TribalWars background New TW style
// @namespace     El-Barto
// @include       http://*.tribalwars.*/*
// @exclude       http://www.tribalwars.*
// ==/UserScript==


var loc=window.location.href;
function addCSS(){
if((loc.indexOf('tribalwars')!=-1 || loc.indexOf('innogames')!=-1) && loc.indexOf('forum')==-1){
///////////////////////////////////////////////////////////////////////
/*********************************************************************/
//CSS ADD
var headHTML = document.getElementsByTagName('head')[0]; 
var css = headHTML.innerHTML; 
//css = css.replace(/stamm1181867721.css/gi,"http://home.deds.nl/~fazant/newstyle-B.css"); // created by Morgan Kendal (www.plemiona.pl)
//css = css.replace(/stamm1181867721.css/gi,"http://home.deds.nl/~fazant/newstyle-B.css"); // Verdana Font... created by Morgan Kendal (www.plemiona.pl)
//css = css.replace(/stamm1181867721.css/gi,"http://home.deds.nl/~fazant/newstyle-B.css"); // created by Morgan Kendal (www.plemiona.pl)
//css = css.replace(/stamm1181867721.css/gi,"http://home.deds.nl/~fazant/newstyle-B.css"); // Verdana Font... created by Morgan Kendal (www.plemiona.pl)
css = css.replace(/stamm1181867721.css/gi,"http://home.deds.nl/~fazant/newstyle-B.css"); // http://spars.name/blog/index.php?sec=dsskin
css = css.replace(/stamm.css/gi,"http://home.deds.nl/~fazant/newstyle-B.css"); // http://spars.name/blog/index.php?sec=dsskin
headHTML.innerHTML = css;
/*********************************************************************/
///////////////////////////////////////////////////////////////////////
}
}
function addGraph(){
if((loc.indexOf('tribalwars')!=-1 || loc.indexOf('innogames')!=-1) && loc.indexOf('forum')==-1 && loc.indexOf('map')==-1){
///////////////////////////////////////////////////////////////////////
/*********************************************************************/
//Graphical packages ADD
var bodyHTML = document.getElementsByTagName('body')[0]; 
var graphic = bodyHTML.innerHTML;
//var urlGraph = "http://bsienok.bs.funpic.org/tribalwars08pack/graphic/"; // http://spars.name/blog/index.php?sec=dsskin
var urlGraph = "http://bsienok.bs.funpic.org/tribalwars08pack/graphic/";
graphic = graphic.replace(/graphic/gi, urlGraph);
bodyHTML.innerHTML = graphic; 
/*********************************************************************/
///////////////////////////////////////////////////////////////////////
}}
addCSS();
addGraph();