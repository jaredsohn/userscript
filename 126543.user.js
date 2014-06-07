// ==UserScript==
// @name           Pokec.sk - skrytie bočného panelu
// @namespace      http://
// @description    Skrytie bočného panelu
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @include        http://www-pokec.azet.sk/miestnost/*
// @date           2012-02-23
// @author         Marvin-HOG (MaxSVK)
// @version        1.0
// ==/UserScript==


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/* *********************** globalne pouzivane funkcie *********************** */


function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if(!head) {return;}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */


addGlobalStyle(
	'html, body {width: 100% !important;}'+
	'#sklo {width: 100% !important;}'+
	'#reklama_parapet {display: none !important;}'+
	'#parapet {display: none; height: 100% !important; bottom: 0px !important;}'+
	'#parapetHider {float:right; line-height: 20px; display: block; margin-right: 15px !important;}'+
	''
);


var sidebar = document.getElementById('zalozky_sub');

var aElement = document.createElement('a');
	aElement.setAttribute('class','piskotka vsetko');
	aElement.setAttribute('href','#');
	aElement.setAttribute('onclick',	"var sklo=document.getElementById('sklo');"+
								"var vyska=sklo.style.width;"+
								"var parapet=document.getElementById('parapet');"+
								"var cwidth=parseInt(sklo.offsetWidth);"+
								"if(parapet.style.display=='block')"+
								"{cwidth=cwidth+216;sklo.setAttribute('style','width: '+cwidth+'px  !important;');parapet.style.display='none';}"+
								"else"+
								"{cwidth=cwidth-216;sklo.setAttribute('style','width: '+cwidth+'px !important;');parapet.style.display='block';}");

var divElement = document.createElement('div');
	divElement.setAttribute('id','parapetHider');

var theText = document.createTextNode('Zobraziť/skryť bočný panel');
	aElement.appendChild(theText);
	divElement.appendChild(aElement);

document.getElementById('miestnostne').appendChild(divElement);

