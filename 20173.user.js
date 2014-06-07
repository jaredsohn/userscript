// ==UserScript==
// @name           ttv4l
// @namespace      fvv.cl
// @description    TerraTV 4 Linux
// @include        http://terratv.terra.*
// @include        http://terratv.terra.cl/*
// @include        http://terratv.terra.com.ar/*
// @include        http://terratv.terra.com.pe/*
// @include        http://terratv.terra.com.ec/*
// @include        http://terratv.terra.com.br/*
// @include        http://terratv.terra.com.mx/*
// @include        http://terratv.terra.com.co/*
// @include        http://terratv.terra.com/*
// @include        http://terratv.terra.com.do/*
// @include        http://terratv.terra.es/*
// @include        http://terratv.terra.com.ve/*
// @include        http://www.terra.tv/*
// @author         Alejandro Vera <alevera@fvv.cl>
// ==/UserScript==

// TerraTV para Linux con Firefox/Iceweasel + greasemonkey
// Notes: 
// 	Tested on Iceweasel, debian, with totem-xine installed + codecs.
// TODO:
//	Disable redirect

// global vars
var req=new XMLHttpRequest();
var reqwmv=new XMLHttpRequest();
var asx='about:blank';
var wmv='about:blank';

// get id from url script
function getID() {
	var strHref = window.location.href;
	var i= strHref.indexOf("contentid=");
	var id=-1;
	if ( i > -1 ){
		id = strHref.substr(i+10);
		i = id.indexOf('&');
		if (i>-1) {
        	   id = id.substr(0,i);
		}
		i = id.indexOf('#');
		if (i>-1) {
        	   id = id.substr(0,i);
		}
	}
	return id;
}

//get vid from ajax call
function getTtvXml(id) {
	if (id>0) {
		req.open('GET','Ajax/genericAjax.aspx?AjaxSource=TerraMediaCenter.AjaxMediaXml&page=genericAjax_aspx&p1='
			+id
			+'&p2=10&p3=true&p4=true&p5=true&p6=false',true);
		req.onload = openVideo ;
		req.send(null);
	}
}

// abre asx.
function openVideo() {
	asx = req.responseXML.evaluate("//media/@url",req.responseXML,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.nodeValue;
	//deshabilito el parseo del asx... tiene problemas. Abro directamente el asx
	//getWmvXML();
	window.document.location=asx;
}

//Reemplazo el comportamiento de la funcion Play!
var oldPlay = unsafeWindow.Play;
unsafeWindow.Play = function(iid,x) {
	getTtvXml(iid);
};

// Las siguientes funciones NO estan en uso.
//get wmv from video asx URL
function getWmvXML() {
	reqwmv.open('GET',asx,true);
	reqwmv.onload = openWmv ;
	reqwmv.send(null);
}

// open vid, simple.
function openWmv() {
	if (reqwmv.status == 200) {
		var si = reqwmv.responseText.indexOf('href="');
		if (si>0) {
			var se = reqwmv.responseText.substring(si).indexOf('"/>');
			if (se>0) {
				wmv = reqwmv.responseText.substring(si+6,se);
				window.document.location=wmv;
				return;
			}
		}
	}
	//si todo falla tiro el asx;
	window.document.location=asx;
}
// Fin de las funciones en desuso


// Main
var id=getID();
getTtvXml(id);

