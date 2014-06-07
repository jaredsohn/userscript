// ==UserScript==
// @name           Cobertura Alianza
// @namespace      ikariamScript
// @description    Script que permite ver las ciudades de la alianza que no has enviado tropas
// @include        http://*.ikariam.*/*
// ==/UserScript==
var tablaAlianza = document.getElementById("memberList");

if (tablaAlianza)
{

var ocupadas = document.getElementById("citySelect");
var result = "Ciudades cubiertas\n";
ciudades_cubiertas = [];
// for (i=0; i<ocupadas.length; i++)
// {
	// ciudad = "_"+ocupadas.options[i].text+"_";
	// ciudad = ciudad.replace(/(\[.*?:.*?\]) (.*)/,"_$1$2_");
	// ciudades_cubiertas[ciudades_cubiertas.length] = ciudad;
	// result+=ciudad+"\n";
// }
for (i=0; i<ocupadas.children.length; i++)
{
	ciudad = ocupadas.children[i].innerHTML;
	ciudad = ciudad.replace(/&nbsp;/, " ");
	ciudad = ciudad.replace(/(\[.*?:.*?\]) (.*)/,"_$1$2_");
	ciudades_cubiertas[ciudades_cubiertas.length] = ciudad;
	result+=ciudad+"\n";
}
var r1 = result;
	//alert(r1);

result = "Ciudades Alianza\n";
var ciudades_alianza=[];
var linkciudad = [];
for (i=1; i<tablaAlianza.children[1].children.length; i++)
{
	var aliado;
	var row = tablaAlianza.children[1];
	var celdas = row.children[i].children[2].children[0].children[0].children[0];
	for (j = 0; j<celdas.children.length; j++)
	{
		txtciudad = celdas.children[j].children[0].innerHTML;
		
		ciudad = txtciudad.replace(/(.*?) (\[.*?:.*?\])/,"_$2$1_");
		linkciudad[ciudad] = celdas.children[j].innerHTML;
		result += ciudad + "\n";
		ciudades_alianza[ciudades_alianza.length] = ciudad;
	}
} 
var r2 = result;	
//alert(r2);

var a = ciudades_alianza.sort();
var b = ciudades_cubiertas.sort();

Array.prototype.contains = function (element) {
for (var i = 0; i < this.length; i++) {
if (this[i] == element) {
return true;
}
}
return false;
}


result = "Ciudades Descubiertas\n";

var ciudades_descubiertas=[];
var lista = "";
j = 0;
for (i=0;i<a.length;i++)
{
	if (b.contains(a[i]))
	{
		j++;
	}
	else
	{
		result+=a[i]+" "+b[j]+"\n";
		ciudades_descubiertas[ciudades_descubiertas.length]=a[i];
		lista+=linkciudad[a[i]]+"<br />";
	}
	
}
r3 = result;
//alert(r3);

var mostrar = document.createElement('div');
mostrar.setAttribute("id","descubiertas");
mostrar.setAttribute("style","position: relative; z-index: 1;");
mostrar.setAttribute("class","dynamic");
var contenido = document.createElement('div');
contenido.setAttribute("class","content");
contenido.innerHTML=lista;
var header = document.createElement('h3');
header.setAttribute("class","header");
header.innerHTML = "Ciudades sin cobertura";
var footer = document.createElement('div');
footer.setAttribute("class","footer");
mostrar.appendChild(header);
mostrar.appendChild(contenido);
mostrar.appendChild(footer);

document.getElementById("container2").insertBefore(mostrar,document.getElementById("mainview"));

}