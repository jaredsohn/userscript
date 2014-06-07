// ==UserScript==
// @name          TribalWars Background Vista
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
//css = css.replace(/stamm1181867721.css/gi,"http://kingbushido95.kilu.de/GPs/Vista/vista_style.css "); // created by Morgan Kendal (www.plemiona.pl)
//css = css.replace(/stamm1181867721.css/gi,"http://kingbushido95.kilu.de/GPs/Vista/vista_style.css "); // Verdana Font... created by Morgan Kendal (www.plemiona.pl)
//css = css.replace(/stamm1181867721.css/gi,"http://kingbushido95.kilu.de/GPs/Vista/vista_style.css "); // created by Morgan Kendal (www.plemiona.pl)
//css = css.replace(/stamm1181867721.css/gi,"http://kingbushido95.kilu.de/GPs/Vista/vista_style.css "); // Verdana Font... created by Morgan Kendal (www.plemiona.pl)
css = css.replace(/stamm1181867721.css/gi,"http://kingbushido95.kilu.de/GPs/Vista/vista_style.css "); // http://spars.name/blog/index.php?sec=dsskin
css = css.replace(/stamm.css/gi,"http://kingbushido95.kilu.de/GPs/Vista/vista_style.css "); // http://spars.name/blog/index.php?sec=dsskin
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
//var urlGraph = "http://kingbushido95.kilu.de/GPs/Vista/"; // http://spars.name/blog/index.php?sec=dsskin
var urlGraph = "http://kingbushido95.kilu.de/GPs/Vista/";
graphic = graphic.replace(/graphic/gi, urlGraph);
bodyHTML.innerHTML = graphic; 
/*********************************************************************/
///////////////////////////////////////////////////////////////////////
}}
addCSS();
addGraph();





