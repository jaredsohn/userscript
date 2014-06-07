// ==UserScript==
// @author         jazdian
// @version        1.1.0
// @namespace      http://programadoresmx.blogspot.com/
// @description    Google - Agrega un link al menu de google, con un submenu con links a paginas web reconocidas.
// @name           moreplusplus
// @namespace      http://programadoresmx.blogspot.com/
// @include        http://www.google.tld/webhp?*
// @include        http://www.google.tld/search?*
// @include        http://www.google.tld/ig?*
// @include        http://www.google.tld/
// @include        http://www.google.tld/#*
// @include        http://www.google.com*
// @include        http://*.google.*
// @include        https://*.google.*
// @include        https://mail.google.com*
// @grant          none

// ==/UserScript==

//alert('');
var EleDiv = document.createElement('DIV');
window.onload = function(){OcultarDiv();}

//Variable de posición X para colocar el menu en la posicion requerida
var PosX;
var PosY;

//acceder a el elemento Id 'gb'
var MenuGoogle = document.getElementById('gb');

var ElBody = document.getElementById('main');
ElBody.addEventListener("click", OcultarDiv, false);

//Función para mostrar el DIV con los links
function MostrarDiv() {
    //alert(PosX);
    EleDiv.style.backgroundColor = "#FFFFFF";
    EleDiv.style.border = "1px solid #262626";
    EleDiv.style.padding = "10px";
    EleDiv.style.wordWrap = "break-word";
    EleDiv.style.left = PosX + -50 + "px";
    EleDiv.style.top = PosY + 25 + "px";
    EleDiv.style.right = "auto";
    EleDiv.style.visibility = "visible";
    EleDiv.style.position = "absolute";       
    EleDiv.style.width = "80px";
    CrearLista.style.visibility = "visible";
    //EleDiv.style.height = "250px";
}

function OcultarDiv() {
    EleDiv.style.visibility = "hidden";
    CrearLista.style.visibility = "hidden";
}

//Crear elemento <a>
var a = document.createElement('A');
var txtU = document.createTextNode('+Menu');
a.appendChild(txtU);
a.className = "gb_f";
a.setAttribute('href', '#');
a.addEventListener("click", MostrarDiv, false);

//Crear div para el link del +Menu
var DivA = document.createElement('DIV');
DivA.className = "gb_i gb_j";
DivA.appendChild(a);

//Se agrega el +Menu 
MenuGoogle.firstChild.firstChild.firstChild.appendChild(DivA);

//******Obtener la posición del DIV**********
PosX = DivA.offsetLeft;
PosY = DivA.offsetTop;


//*********************************
var CrearLink = new Array();
var TextoLink = new Array();
//Para agregar las etiquetas del link
var VarEtiqueta = new Array('Yahoo Search ', 'Bing ', 'Ask ', 'Altavista ', 'Mooter ', 'Clusty ', 'Dogpile ', 'AOL Search ', 'Lycos ', 
                            '--------', 'Facebook ', 'Twitter ', 'Google+ ', 'Linkedin ', 'Pinterest ', 'Flickr ',
                            '--------', 'Yahoo ', 'AOL ');
//Para agregar la direccion url a la que va dirigida la etiqueta
var VarURL = new Array('http://www.search.yahoo.com/', 'http://www.bing.com/', 'http://www.ask.com/',
                    'http://www.altavista.com/', 'http://mooter.com/', 'http://clusty.com/',
                    'http://www.dogpile.com/', 'http://www.search.aol.com/', 'http://www.lycos.com/',
                    '#', 'http://www.facebook.com/', 'http://twitter.com/', 'https://plus.google.com/',
                    'http://www.linkedin.com/', 'http://www.pinterest.com/', 'http://www.flickr.com/',
                    '#', 'http://www.yahoo.com/', 'http://www.aol.com/');
//La cantidad de links

var i = VarEtiqueta.length - 1;

var CrearLista = document.createElement('UL');
CrearLista.style.listStyleType = "none"; 
CrearLista.style.visibility = "hidden";

var CrearEleLista = new Array();

EleDiv.appendChild(CrearLista);

var x;
for (x = 0; x <= i; x++) {
    CrearLink[x] = document.createElement('A');
    CrearEleLista[x] = document.createElement('LI');
    TextoLink[x] = document.createTextNode(VarEtiqueta[x]);
    CrearLink[x].appendChild(TextoLink[x]);
    CrearLink[x].setAttribute('href', VarURL[x]);
    CrearLista.appendChild(CrearEleLista[x]);
    CrearEleLista[x].appendChild(CrearLink[x]);
}



//*********************************

MenuGoogle.appendChild(EleDiv);

//**********************************