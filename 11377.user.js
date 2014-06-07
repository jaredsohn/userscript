// ==UserScript==
// @name           mapaogame_uni
// @namespace      pawkow@pawkow.pl
// @description    Skrypt automatycznie wybiera universum w kazdym formularzu na mapaogame.net
// @include        http://mapaogame.net*
// ==/UserScript==

function zmianaUni()
{
	GM_setValue("uni",prompt("Na którym grasz universum ?"));
}
		elem = document.getElementById("log");
		c = document.createElement('p');
		c.innerHTML='<a href="#">ZMIEŃ UNIVERSUM</a>';
		c.setAttribute('id','log_linki'); 
		c.addEventListener('click',zmianaUni,true);
		elem.appendChild(c);

if(GM_getValue("uni")==null) {
    GM_setValue("uni",prompt("Na którym grasz universum ?"));
}


var u_options=document.getElementsByTagName("option");

for(var i=0;i<u_options.length;i++)
{
    if (u_options[i].value==GM_getValue("uni")) {
        u_options[i].selected='selected';
        break;
    }
}
