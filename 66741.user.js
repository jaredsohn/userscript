/***********************************************************************
Link Labs
Version 1.1
2010-01-20
Copyright 2008, Rene Gonzalez Campos
Released under the GPL license
http://www.gnu.org/copyleft/gpl.html

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************
**************************************************************************/


// ==UserScript==
// @name           Link Labs
// @version        1.1
// @date           2010-01-20
// @creator        jazdian@gmail.com
// @namespace      http://programadoresmx.blogspot.com/
// @description    Nuevo menu para herramientas experimentales de google labs
// @include        http://www.google.com*
// @include        https://www.google.com*
// @include        https://www.google.tld*
// @include        http://www.google.tld/#*
// @include        http://*.google.*
// @include        https://*.google.*
// ==/UserScript==


var SubMenuGoogle = document.getElementById('gbi');
SubMenuGoogle.style.backgroundColor="#81BEF7";

var CrearLink = new Array();
var TextoLink = new Array();

//Para agregar las etiquetas del link 
var VarEtiqueta = new Array ('Labs', 'Transliterate', 'Squared', 'Tables', 'Similar-images', 'Image-Swirl', 'Fastflip', 'News-Time-Line', 'Mars', 'Code');
//Para agregar la direccion url a la que va dirigida la etiqueta						
var VarURL = new Array ('http://www.googlelabs.com/', 'http://www.google.com/transliterate/', 'http://www.google.com/squared', 'http://tables.googlelabs.com/', 'http://similar-images.googlelabs.com/', 'http://image-swirl.googlelabs.com/', 'http://fastflip.googlelabs.com/', 'http://newstimeline.googlelabs.com/', 'http://mars.google.com/', 'http://code.google.com/intl/en/');
//La cantidad de links 
var i = VarEtiqueta.length - 1;


var div = document.createElement('DIV');
div.style.backgroundColor = "#C9D7F1";
div.style.width = "87%";
div.style.height = "1px";
div.style.marginLeft = "7px";
div.style.marginBottom = "3px";
div.style.marginTop = "3px"; 
//div.className=('gb2');
SubMenuGoogle.appendChild(div);

var x;
for (x = 0; x <= i; x++)
{
	CrearLink[x] = document.createElement('A');	
	TextoLink[x] = document.createTextNode(VarEtiqueta[x]);
	CrearLink[x].appendChild(TextoLink[x]);
	CrearLink[x].setAttribute('href',VarURL[x]);
	CrearLink[x].className=('gb2'); 
	SubMenuGoogle.appendChild(CrearLink[x]);
}
