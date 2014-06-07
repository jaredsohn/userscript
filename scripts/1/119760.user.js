// ==UserScript==
// @name           Travian Requette
// @namespace      Travian4
// @description    Script néssessaire au fonctionnement d'autre script
// @author         Assouan
//
// @include        http://ts*.travian.*/*
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//
// @lastchanges    add ajax, add convert
// @version        1.2
// @history        1.2 ajout de converteur
// @history        1.1 ajout du ajax perso
// @history        1.0 création du script
//
// ==/UserScript==

// Variable Globale : Initialisation
var domaine      = window.location.host;
var domaine_full = 'http://' + window.location.host + '/';

// Fonctions de requette HTTP
function  t4ReqSimple(_page, _data)
{
	var xhr_object = null;

	if(window.XMLHttpRequest) // Firefox
		xhr_object = new XMLHttpRequest();
	else if(window.ActiveXObject) // Internet Explorer
		xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
	else // XMLHttpRequest non supporté par le navigateur
	{
		alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
		return;
	}

	var method = (_data == undefined) ? 'GET' : 'POST';
	var url    = domaine_full + _page;

	xhr_object.open(method, url, false);

	if(_data == undefined) { _data = null; }
	xhr_object.send(_data);
	
	if(xhr_object.readyState == 4)
	{
		return xhr_object.responseText;
	}
}
function  t4Req(_page, _data)
{
	var xhr_object = null;

	if(window.XMLHttpRequest) // Firefox
		xhr_object = new XMLHttpRequest();
	else if(window.ActiveXObject) // Internet Explorer
		xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
	else // XMLHttpRequest non supporté par le navigateur
	{
		alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
		return;
	}

	var method = (_data == undefined) ? 'GET' : 'POST';
	var url    = domaine_full + _page;

	xhr_object.open(method, url, true);

	xhr_object.onreadystatechange = function()
	{
		if(xhr_object.readyState == 4)
		{
			//alert('Terminer');
		}
	}

	xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	if(_data == undefined) { _data = null; }
	xhr_object.send(_data);
}

// Fonctions de gestion de page HTML
function getElementsByClass(classe,type)
{
	if(type == undefined) { type = 'div'; }
     var divs = document.getElementsByTagName(type);
     var resultats = new Array();
     for(var i=0; i<divs.length; i++)
          if(divs[i].className == classe)
               resultats.push(divs[i]);
     return resultats;
}
function getElementsByClassSpan(classe)
{
     return getElementsByClass(classe, 'span');
}

// Fonctions Ajax
function ajaxExtract(code)
{
	var datas = {
	error : true,
	errorMsg : 'ajax invalid',
	data : ''};
	
	if (/\{"error":([\s\S]+?),"errorMsg":([\s\S]+?),"data":{"html":"([\s\S]+?)"}}/i.test(code))
	{
		datas['error'] = (RegExp.$1 == 'false') ? false : true;
		datas['errorMsg'] = (RegExp.$2 == 'null') ? null : RegExp.$2;
		datas['data'] = RegExp.$3;
	}
	
	return datas;
}

// Fonctions de convertion
function convertUcodeToAccent(str)
{
	return str.replace(/\\u([0-9a-f]{4})/g,function(n,code){return String.fromCharCode(parseInt(code,16));});
}
function removeSlash(str)
{
	return str.replace(/\\/g,'');
}
function specialTransfo(str)
{
	str=str.replace(/\\n/g," ");
	str=str.replace(/\\r/g,' ');
	str=str.replace(/\\t/g,'');
	str=str.replace(/<[\s\S]+?>/g,'');
	return str;
}
function convertTrial(str)
{
	return convertUcodeToAccent(removeSlash(specialTransfo(str)));
}
