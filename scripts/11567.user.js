// ==UserScript==
// @name          add CSS and Graphical packages for TribalWars\Die-staemme\Plemiona without PREMIUM!!!
// @include       http://*.ds.innogames.*/*
// @include       http://*.plemiona.*/*
// @include       http://*.tribalwars.*/*
// @include       http://*.die-staemme.*/*
// @author        r0nin
// ==/UserScript==


var loc=window.location.href;
function addCSS(){
if((loc.indexOf('plemiona')!=-1 || loc.indexOf('innogames')!=-1) && loc.indexOf('forum')==-1){
///////////////////////////////////////////////////////////////////////
/*********************************************************************/
//CSS ADD
var headHTML = document.getElementsByTagName('head')[0]; 
var css = headHTML.innerHTML; 
//css = css.replace(/stamm1181867721.css/gi,"http://plemionacss.republika.pl/blue.css"); // created by Morgan Kendal (www.plemiona.pl)
//css = css.replace(/stamm1181867721.css/gi,"http://plemionacss.republika.pl/blue_v.css"); // Verdana Font... created by Morgan Kendal (www.plemiona.pl)
//css = css.replace(/stamm1181867721.css/gi,"http://plemionacss.republika.pl/green.css"); // created by Morgan Kendal (www.plemiona.pl)
//css = css.replace(/stamm1181867721.css/gi,"http://plemionacss.republika.pl/green_v.css"); // Verdana Font... created by Morgan Kendal (www.plemiona.pl)
css = css.replace(/stamm1181867721.css/gi,"http://www.spars.name/1ds-skin/stamm1148719460.css"); // http://spars.name/blog/index.php?sec=dsskin
css = css.replace(/stamm.css/gi,"http://www.spars.name/1ds-skin/stamm1148719460.css"); // http://spars.name/blog/index.php?sec=dsskin
headHTML.innerHTML = css;
/*********************************************************************/
///////////////////////////////////////////////////////////////////////
}
}
function addGraph(){
if((loc.indexOf('plemiona')!=-1 || loc.indexOf('innogames')!=-1) && loc.indexOf('forum')==-1 && loc.indexOf('map')==-1){
///////////////////////////////////////////////////////////////////////
/*********************************************************************/
//Graphical packages ADD
var bodyHTML = document.getElementsByTagName('body')[0]; 
var graphic = bodyHTML.innerHTML;
//var urlGraph = "http://www.spars.name/1ds-skin"; // http://spars.name/blog/index.php?sec=dsskin
var urlGraph = "http://adamarc.ad.funpic.de/ds/Grafik_s1-10";
graphic = graphic.replace(/graphic/gi, urlGraph);
bodyHTML.innerHTML = graphic; 
/*********************************************************************/
///////////////////////////////////////////////////////////////////////
}}
addCSS();
addGraph();