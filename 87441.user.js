// ==UserScript==
// @name           dict.cc Plus
// @namespace      http://www.sebastian-lang.net/
// @description    Center content on http://*dict.cc/*
//
// @include        http://*dict.cc/*
// @include        http://my.dict.cc/*
// @include        http://*my.dict.cc/*
// @include        http://forum.dict.cc/*
// @include        http://*forum.dict.cc/*
// @include        http://contribute.dict.cc/*
// @include        http://*contribute.dict.cc/*
// @include        http://browse.dict.cc/*
// @include        http://*browse.dict.cc/*
//
//
//	Deutsch -> ...
//
// @exclude        http://*dict.cc/
// @exclude        http://*deen.dict.cc/
// @exclude        http://*deit.dict.cc/
// @exclude        http://*dept.dict.cc/
// @exclude        http://*defr.dict.cc/
// @exclude        http://*deis.dict.cc/
// @exclude        http://*deru.dict.cc/
// @exclude        http://*desv.dict.cc/
// @exclude        http://*dees.dict.cc/
// @exclude        http://*dehu.dict.cc/
// @exclude        http://*decs.dict.cc/
// @exclude        http://*detr.dict.cc/
// @exclude        http://*dela.dict.cc/
// @exclude        http://*depl.dict.cc/
// @exclude        http://*denl.dict.cc/
// @exclude        http://*dero.dict.cc/
// @exclude        http://*deda.dict.cc/
// @exclude        http://*deno.dict.cc/
// @exclude        http://*deeo.dict.cc/
// @exclude        http://*debg.dict.cc/
// @exclude        http://*desk.dict.cc/
// @exclude        http://*debs.dict.cc/
// @exclude        http://*deel.dict.cc/
// @exclude        http://*desr.dict.cc/
// @exclude        http://*dehr.dict.cc/
// @exclude        http://*defi.dict.cc/
// @exclude        http://*desu.dict.cc/
//
//
//	... -> Deutsch
//
// @exclude        http://*ende.dict.cc/
// @exclude        http://*itde.dict.cc/
// @exclude        http://*ptde.dict.cc/
// @exclude        http://*frde.dict.cc/
// @exclude        http://*isde.dict.cc/
// @exclude        http://*rude.dict.cc/
// @exclude        http://*svde.dict.cc/
// @exclude        http://*esde.dict.cc/
// @exclude        http://*hude.dict.cc/
// @exclude        http://*csde.dict.cc/
// @exclude        http://*trde.dict.cc/
// @exclude        http://*lade.dict.cc/
// @exclude        http://*plde.dict.cc/
// @exclude        http://*nlde.dict.cc/
// @exclude        http://*rode.dict.cc/
// @exclude        http://*dade.dict.cc/
// @exclude        http://*node.dict.cc/
// @exclude        http://*eode.dict.cc/
// @exclude        http://*bgde.dict.cc/
// @exclude        http://*skde.dict.cc/
// @exclude        http://*bsde.dict.cc/
// @exclude        http://*elde.dict.cc/
// @exclude        http://*srde.dict.cc/
// @exclude        http://*hrde.dict.cc/
// @exclude        http://*fide.dict.cc/
// @exclude        http://*sude.dict.cc/
//
//
//	English -> ...
//
// @exclude        http://*enpl.dict.cc/
// @exclude        http://*ennl.dict.cc/
// @exclude        http://*encz.dict.cc/
// @exclude        http://*enfr.dict.cc/
// @exclude        http://*enit.dict.cc/
// @exclude        http://*enpt.dict.cc/
// @exclude        http://*enru.dict.cc/
// @exclude        http://*ensv.dict.cc/
// @exclude        http://*enes.dict.cc/
// @exclude        http://*enhu.dict.cc/
// @exclude        http://*enda.dict.cc/
// @exclude        http://*eneo.dict.cc/
// @exclude        http://*enro.dict.cc/
// @exclude        http://*enis.dict.cc/
// @exclude        http://*entr.dict.cc/
// @exclude        http://*enno.dict.cc/
// @exclude        http://*enbs.dict.cc/
// @exclude        http://*ensr.dict.cc/
// @exclude        http://*enhr.dict.cc/
// @exclude        http://*enel.dict.cc/
// @exclude        http://*ensk.dict.cc/
// @exclude        http://*enbg.dict.cc/
// @exclude        http://*enfi.dict.cc/
// @exclude        http://*ensq.dict.cc/
// @exclude        http://*enla.dict.cc/
//
//
//	... -> English
//
// @exclude        http://*plen.dict.cc/
// @exclude        http://*nlen.dict.cc/
// @exclude        http://*czen.dict.cc/
// @exclude        http://*fren.dict.cc/
// @exclude        http://*iten.dict.cc/
// @exclude        http://*pten.dict.cc/
// @exclude        http://*ruen.dict.cc/
// @exclude        http://*sven.dict.cc/
// @exclude        http://*esen.dict.cc/
// @exclude        http://*huen.dict.cc/
// @exclude        http://*daen.dict.cc/
// @exclude        http://*eoen.dict.cc/
// @exclude        http://*roen.dict.cc/
// @exclude        http://*isen.dict.cc/
// @exclude        http://*tren.dict.cc/
// @exclude        http://*noen.dict.cc/
// @exclude        http://*bsen.dict.cc/
// @exclude        http://*sren.dict.cc/
// @exclude        http://*hren.dict.cc/
// @exclude        http://*elen.dict.cc/
// @exclude        http://*sken.dict.cc/
// @exclude        http://*bgen.dict.cc/
// @exclude        http://*fien.dict.cc/
// @exclude        http://*sqen.dict.cc/
// @exclude        http://*laen.dict.cc/
//
//
// @author         Sebastian-Lang.net
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.1.2
// @lastupdated    2012-06-18
// 
// @history        0.1.2 script rewritten to change css-styles after update
// @history        0.1.1 Optimized CSS, main pages excluded
// @history        0.1.0 Added CSS centers content
// @history        0.0.1 Initial release
//
// ==/UserScript==

//Modify CSS
document.body.style.background = '#222';
document.body.style.cssFloat = 'none';
document.body.style.margin = '0 auto';

if (document.getElementById('langbar')){
	document.getElementById('langbar').style.fontSize = '8pt';
};

document.getElementById('maincontent').id = 'test1234'
if (document.getElementById('test1234')){
	document.getElementById('test1234').style.cssFloat = 'none';
	document.getElementById('test1234').style.margin = '0 auto';
	document.getElementById('test1234').style.paddingLeft = '10pt';
	document.getElementById('test1234').style.paddingRight = '10pt';
	document.getElementById('test1234').style.maxWidth = '730px';
	document.getElementById('test1234').style.maxWidth = '730px';
	document.getElementById('test1234').style.background = '#fff';
};

if (document.getElementById('entertexthere')){
	document.getElementById('entertexthere').style.fontFamily = 'arial';
	document.getElementById('entertexthere').style.fontSize = '9pt';
};
if (document.getElementById('sinp')){
	document.getElementById('sinp').style.fontFamily = 'arial';
	document.getElementById('sinp').style.fontSize = '14pt';
};

if (document.getElementById('lpddbsf')){
	document.getElementById('lpddbsf').style.fontFamily = 'arial';
	document.getElementById('lpddbsf').style.fontSize = '9pt';
};

if (document.getElementsByClassName('noli666')[1]){
document.getElementsByClassName('noli666')[1].style.background = '#555';
document.getElementsByClassName('noli666')[1].style.position = 'relative';
document.getElementsByClassName('noli666')[1].style.left = '2000px';
document.getElementsByClassName('noli666')[1].style.top = '0px';
document.getElementsByClassName('noli666')[1].style.height = '0px';
};

if (document.getElementsByClassName('inp1')[0]){
	document.getElementsByClassName('inp1')[0].style.fontFamily = 'arial';
	document.getElementsByClassName('inp1')[0].style.color = '#FFD175!important';
	document.getElementsByClassName('inp1')[0].style.fontSize = '10pt';
	document.getElementsByClassName('inp1')[0].style.fontWeight = 'bold';
};

if (document.getElementById('maincontent')){
	document.getElementById('maincontent').style.cssFloat = 'none';
	document.getElementById('maincontent').style.margin = '0 auto';
	document.getElementById('maincontent').style.paddingLeft = '10pt';
	document.getElementById('maincontent').style.paddingRight = '10pt';
};
