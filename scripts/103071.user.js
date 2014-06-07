// ==UserScript==
// @name           Ravioles_y_Faso
// @namespace      taringa
// @include        *taringa.net/*
// @creator        Fetman // Editado de un script creado por "Comunidad_wtf" (El usuario)
// ==/UserScript==


function byClass(clsName, tag) {
	var arrayElements = new Array();
	if (tag == null){ tag="*";}
	var elements = document.getElementsByTagName(tag);

	for(var i = 0;i < elements.length;i++)
		{
		if(elements[i].className.indexOf(" ") >= 0)
			{
				var classes = elements[i].className.split(" ");
            	for(var j = 0;j < classes.length;j++)
				{
                	if(classes[j] == clsName)
                    arrayElements.push(elements[i]);
            	}
        	}
        	else if(elements[i].className == clsName)
            	arrayElements.push(elements[i]);
    	}

	for (element in arrayElements)
	{
		return arrayElements[element];
	}
}

byClass('menuTabs').innerHTML += "<li id=\"tabbedWTF\" class=\"tabbed\">\n <a onclick=\"createCookie('canIHaveBetaForTaringaV5Plskthx', 'ec7ac94d9e08886acaf6a78228718078', 365); window.location.reload()\" onclick=\"menu(\'WTF \', this.onclick);return false;\" title=\"Testear la V5!\">Testear BETA <img src=\n\"http://www.scielo.br/img/revistas/rlae/v13n2/letra_grega_beta.gif\" alt=\"Beta\" /></a>\n</li>";

var ancho=200;


var estiloCuadrito="width:"+ancho+"px;background-color:white;position:fixed;left:0px;top:0px;border:0px solid #40BF00;padding:0px;-moz-border-radius:0px;"
var div=document.createElement("div");

var con;
function verPost(url)
{
  //alert(url);
  con=new XMLHttpRequest();
  con.onreadystatechange = procesarEventos;
  //con.overrideMimeType("text/xml")
  con.open('GET',url, true);
  con.send(null);
}



