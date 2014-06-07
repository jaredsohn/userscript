// ==UserScript==
// @name           Orkut Online Offline 
// @author         WWW.VEVIN.COM
// @namespace      http://www.vevin.com
// @description    Who is Online On Orkut Presented By Vevin.com
// @include        http://www.orkut.com/*
// @include        http://www.orkut.co.in/*
// ==/UserScript==

//--------------------------------------------
// Início
//--------------------------------------------
script_ = function scri_(){/* Aqui e o inicio */

// Config:
var showname=1 /* 1 para mostrar o status no nome; 0 para não mostrar */
var showemoticon=1 /* 1 para mostrar emoticon; 0 para não mostrar */

//--------------------------------------------
// Emoticons
//--------------------------------------------
var lon=String.fromCharCode(9679)
var lbusy=String.fromCharCode(9660)
var laway=String.fromCharCode(9650)
var loff=String.fromCharCode(9632)
var gifon="data:image/gif;base64,R0lGODlhCQAIANEAAAAAAP8A%2FwDoOAAAACH5BAkZAAEALAAAAAAJAAgAAAITjIFgJy0agHNKzhcvthNyvCRQAQA7"
var gifbusy="data:image/gif;base64,R0lGODlhCQAIANEAAAAAAMwsAP8A%2F%2F%2F%2F%2FyH5BAkZAAIALAAAAAAJAAgAAAIXlIFgFx0qgHNKjjteDDjX2UAStUSJUQAAOw%3D%3D"
var gifaway="data:image/gif;base64,R0lGODlhCQAIANIAAAAAAMwsAP8A%2F5SQlP%2F%2F%2FwAAAAAAAAAAACH5BAkZAAIALAAAAAAJAAgAAAMYKBocuoQA4kSIMrobJ7USMGggRpbn0igJADs%3D"
var gifoff="data:image/gif;base64,R0lGODlhCQAIANEAAAAAAP8A%2F%2F8AAAAAACH5BAkZAAEALAAAAAAJAAgAAAITjIFgJy0agHNKzhcvthNyvCRQAQA7"

if(showemoticon==1)
{
	for (g=0;g<document.links.length;g++)
	{
	dl=document.links[g]
		if(dl.innerHTML.match(new RegExp(lon+'+$')))
		{
		dl.innerHTML=dl.innerHTML.replace(lon,"<img border=0 src=\""+gifon+"\">")
		}
		if(dl.innerHTML.match(new RegExp(lbusy+'+$')))
		{
		dl.innerHTML=dl.innerHTML.replace(lbusy,"<img border=0 src=\""+gifbusy+"\">")
		}
		if(dl.innerHTML.match(new RegExp(laway+'+$')))
		{
		dl.innerHTML=dl.innerHTML.replace(laway,"<img border=0 src=\""+gifaway+"\">")
		}
		if(dl.innerHTML.match(new RegExp(loff+'+$')))
		{
		dl.innerHTML=dl.innerHTML.replace(loff,"<img border=0 src=\""+gifoff+"\">")}
		}
}

//--------------------------------------------
// Função Principal
//--------------------------------------------
function onoff()
	{
	xml=new XMLHttpRequest();
	xml.open("GET","EditGeneral.aspx",true);
	xml.onreadystatechange=function(){
	if(xml.readyState==4)
		{
		xmlfim=xml.responseText
		xmlfim=xmlfim.replace(/\<form method=\"post\"/gi,'<form method="post" target=\"onoff\" action="/EditGeneral.aspx"');
		xmlfim=xmlfim.replace(/name=\"Action.update\"/gi,'name="Action.update" id="buttononoff"');
		xmlfim=xmlfim.replace(/.link href=.styles006.css. type="text.css" rel=stylesheet./gi,'');
		document.getElementById('spanonoff').innerHTML=xmlfim+"<iframe name=\"onoff\"></iframe>";
		changest(document.getElementById('omenu').value);
	 	}
	};
	xml.send(null);
	}
//--------------------------------------------
// Adiciona os elementos antes do link "Configurações"
//--------------------------------------------
function addele()
{
for(v=0;v<document.links.length;v++)
	{
	if(document.links[v].href=='http://www.orkut.co.in/Settings.aspx')
		{
		main=document.links[v];
		ele=document.createElement('span');
		ele.innerHTML="<span id=\"spanonoff\" style=\"display:none\"></span> <span id=\"Status\"><a href=\"javascript:void(0)\" onclick=\"oomenu()\">Status</a></span> | "
		main.parentNode.insertBefore(ele,main);return;
		}
	}
}
addele()
//--------------------------------------------
// Menu Drop Down
//--------------------------------------------
function oomenu()
{
document.getElementById('Status').innerHTML=""+
"<select size=\"1\" name=\"omenu\" id=\"omenu\" onchange=\"onoff()\">"+
"<option value=\"Escolha\">---</option>"+
"<option value=\"Online\">"+String.fromCharCode(9679)+" Online</option>"+
"<option value=\"Ocupado\">"+String.fromCharCode(9660)+"Ocupado</option>"+
"<option value=\"Ausente\">"+String.fromCharCode(9650)+"Ausente</option> | "+
"<option value=\"Offline\">"+String.fromCharCode(9632)+" Offline</option>"+
"</select>"
}
//--------------------------------------------
// Muda o status
//--------------------------------------------
function changest(st)
{
if(st=='Escolha'){return;}
//muda o perfil
var on=String.fromCharCode(9679)
var busy=String.fromCharCode(9660)
var away=String.fromCharCode(9650)
var off=String.fromCharCode(9632)
var aboutMe=document.getElementById('aboutMe')
	if(st=='Online')
	{
	var otext="No momento estou:\n[X]Online\n[ ]Ocupado\n[ ]Ausente\n[ ]Offline";var simb=on
	}
	if(st=='Ocupado')
	{
	var otext="No momento estou:\n[ ]Online\n[X]Ocupado\n[ ]Ausente\n[ ]Offline";var simb=busy
	}
	if(st=='Ausente')
	{
	var otext="No momento estou:\n[ ]Online\n[ ]Ocupado\n[X]Ausente\n[ ]Offline";var simb=away
	}
	if(st=='Offline')
	{
	var otext="No momento estou:\n[ ]Online\n[ ]Ocupado\n[ ]Ausente\n[X]Offline";var simb=off
	}
var amatch=aboutMe.value.match(/No momento estou:\n\[.\]Online\n\[.\]Ocupado\n\[.\]Ausente\n\[.\]Offline/gi)
	if(amatch)
	{
	aboutMe.value=aboutMe.value.replace(amatch,otext)
	}
		else
		{
		aboutMe.value=otext+'\n\n'+aboutMe.value
		}
document.getElementById('Status').innerHTML="<a href=\"javascript:void(0)\" onclick=\"oomenu()\">Status</a>"
//muda o nick
var fnl=document.getElementById('firstName').value.length
var firstn=document.getElementById('firstName')
var regon=firstn.value.match(new RegExp(on+'+$'));
var regbusy=firstn.value.match(new RegExp(busy+'+$'));
var regaway=firstn.value.match(new RegExp(away+'+$'));
var regoff=firstn.value.match(new RegExp(off+'+$'));
	if(showname==1 && fnl<17)
	{	
		if(!regon && !regbusy && !regaway && !regoff)
		{
		firstn.value+=simb
		}
		else if(regon || regbusy || regaway || regoff)
		{
		firstn.value=firstn.value.replace(/.$/,simb)
		}	
	}
//confirma
document.getElementById('buttononoff').click();
}

}/* Aqui e o fim */

//--------------------------------------------
// Insere Script na pagina
//--------------------------------------------
var sub1="0"+script_+"0";
var sub2=sub1.substring(24,sub1.length - 4);

var script = document.createElement('script');
script.innerHTML = sub2
document.body.insertBefore(script, document.body.firstChild);