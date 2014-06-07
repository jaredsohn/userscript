// ==UserScript==
// @name           DivxDen.com Download link
// @namespace      Aaron Russell
// @include        http://www.divxden.com/*
// @include        http://www.vidxden.com/*
// ==/UserScript==

var a = document.evaluate( '//input[contains(@value, "Free Stream")]' , document, null, 4, null ).iterateNext();
if(a){a.click();}

var b = document.evaluate( '//a[contains(@onclick, "Upgrade to Premium")]' , document, null, 4, null ).iterateNext();
var c = document.getElementsByTagName('embed')[0];
if(b){if(c){
b.innerHTML="Download Video";


if(document.getElementById('player')){
var d = document.getElementById('player').getAttribute('flashvars').split('le=')[1].split('&')[0];
}else{
var d = document.getElementById('np_vid').src;}
b.href=d;
b.removeAttribute('onclick');
var d = document.evaluate( '//a[contains(@href, "http://www.divxden.com/?op=payments")]' , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(1);
if(d){d.href=document.getElementsByName("src")[0].value;}
}}