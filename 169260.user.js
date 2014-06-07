// ==UserScript==
// @name        Cambiador de tema de Foros PxP
// @namespace   pxpthemechanger
// @description Cambia el tema de foros pokexperto.
// @include     http://www.pokexperto.net/foros/*
// @version     1.8
// @grant       none
// ==/UserScript==
if(getCookie("fondo")) {
    document.getElementById("bodybg").style.background = "url('"+ getCookie("fondo") +"') repeat scroll 0 0 #000000"
}
var functionContainer = document.createElement("script");
functionContainer.innerHTML= 'function modo(tema) {if(getCookie("tema")==tema) {document.cookie = "tema = normal";}else {document.cookie = "tema = " + tema;} window.location.assign(window.location);}';
functionContainer.innerHTML += 'function getCookie(c_name){var c_value = document.cookie;var c_start = c_value.indexOf(" " + c_name + "=");if (c_start == -1) {c_start = c_value.indexOf(c_name + "=");}if (c_start == -1) {	c_value = null; }else{c_start = c_value.indexOf("=", c_start) + 1; var c_end = c_value.indexOf(";", c_start);if (c_end == -1) {c_end = c_value.length;}c_value = unescape(c_value.substring(c_start,c_end));}return c_value;}'
document.body.appendChild(functionContainer);
window.onload = function() {

var listItem = document.createElement("li");
listItem.innerHTML = "<a href='http://www.pokexperto.net/foros/index.php?board=666'><span>Cambiar Tema</span></a>";

document.getElementById("nav").appendChild(listItem);
var icons = document.getElementsByClassName("windowbg icon");
var i = icons.length -1;
if(getCookie("tema")=="brony") {
document.getElementById("header").style.backgroundImage="url(../../../main/layout/logo_pony.png)";
}
else if(getCookie("tema")=="nobunaga") {
document.getElementById("header").style.backgroundImage="url(../../../main/layout/logo_nobunaga.jpg)";
}
else if(getCookie("tema")=="vintage") {
document.getElementById("header").style.backgroundImage="url(../../../main/layout/logo_zorua.jpg)";
while (i > -1) {
icons[i].innerHTML = icons[i].innerHTML.replace("http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/on.gif", "http://sumlaris.net23.net/img/vintage_on.gif");
icons[i].innerHTML = icons[i].innerHTML.replace("http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/off.gif", "http://sumlaris.net23.net/img/vintage_off.gif");
console.log(icons[i].innerHTML);
i--
}

i = icons.lenght -1;

while (document.body.innerHTML.indexOf("http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/pxp_mod.gif") != -1) {
document.body.innerHTML = document.body.innerHTML.replace("http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/pxp_mod.gif", "http://sumlaris.net23.net/img/pxp_mod.gif")
};

}
else if(getCookie("tema")=="hgss") {
document.getElementById("header").style.backgroundImage="url(http://www.pokexperto.net/main/layout/heartgoldsoulsilver.jpg)";

while (i > -1) {
icons[i].innerHTML = icons[i].innerHTML.replace("http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/on.gif", "http://web.archive.org/web/20100111070540im_/http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/on.gif");
icons[i].innerHTML = icons[i].innerHTML.replace("http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/off.gif", "http://web.archive.org/web/20100111070540im_/http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/off.gif");

console.log(icons[i].innerHTML);
i--
}

i = icons.length -1;


while (document.body.innerHTML.indexOf("http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/pxp_mod.gif") != -1 || document.body.innerHTML.indexOf("http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/pxp_smod.gif") != -1) {
document.body.innerHTML = document.body.innerHTML.replace("http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/pxp_mod.gif", "http://sumlaris.net23.net/img/pxp_mod_old.gif")
document.body.innerHTML = document.body.innerHTML.replace("http://www.pokexperto.net/foros/Themes/mysticjade_20rc1/images/pxp_smod.gif", "http://sumlaris.net23.net/img/pxp_smod_old.gif")
console.log("miau");
};

}
if(getCookie("ownbanner")) {
    document.getElementById("header").style.backgroundImage="url('"+getCookie("ownbanner")+"')";
}
if(getCookie("ownnav")) {
    document.getElementById("toolbar").style.background = 'url("'+getCookie("ownnav")+'") repeat-x scroll 0 0 transparent';
    /*(new HTMLNodeIterator()).iterate(function(node) {
        if(node.nodeName.toUpperCase() == "LI" || node.nodeName.toUpperCase() == "UL") {
            node.style.background = "";
        }
    }, document.getElementById("nav"));*/
   
    for(i = 0; i < document.getElementsByClassName("catbg").length; i++) {
        document.getElementsByClassName("catbg")[i].style.background = 'url("'+getCookie("ownnav")+'") repeat-x scroll 0 0 transparent';
    }
    for(i = 0; i < document.getElementsByClassName("catbg1").length; i++) {
        document.getElementsByClassName("catbg1")[i].style.backgroundImage="url('"+getCookie("ownnav")+"')";
    }
    for(i = 0; i < document.getElementsByClassName("catbg2").length; i++) {
        document.getElementsByClassName("catbg2")[i].style.backgroundImage="url('"+getCookie("ownnav")+"')";
    }
    for(i = 0; i < document.getElementsByClassName("catbg3").length; i++) {
        document.getElementsByClassName("catbg3")[i].style.backgroundImage="url('"+getCookie("ownnav")+"')";
    }
    
}
if (window.location =="http://www.pokexperto.net/foros/index.php?board=666") {
document.title = "Cambiar Tema";
document.getElementsByClassName("titlebg")[0].innerHTML="Cambiar tema";
var tb = document.getElementsByClassName("windowbg")[0];
tb.innerHTML="<b>Temas predeterminados:</b><br>";
var bronyText = document.createElement("button");
bronyText.setAttribute("onclick", "modo('brony');");
tb.appendChild(bronyText);
bronyText.innerHTML="Brony";

var nobunagaText = document.createElement("button");
nobunagaText.setAttribute("onclick", "modo('nobunaga');");
tb.appendChild(nobunagaText);
nobunagaText.innerHTML="Nobunaga";

var vintageText = document.createElement("button");
vintageText.setAttribute("onclick", "modo('vintage');");
tb.appendChild(vintageText);
vintageText.innerHTML="Zorua";

var hgssText = document.createElement("button");
hgssText.setAttribute("onclick", "modo('hgss');");
tb.appendChild(hgssText);
hgssText.innerHTML="HGSS";
tb.innerHTML += "<br><b>Opciones personalizadas:</b> (Dejar en blanco para que sea automático) <br>Fondo: <input id='fondo' type='text' value='"+getCookie("fondo")+"' ></input><button onclick='document.cookie = \"fondo= \" + document.getElementById(\"fondo\").value; window.location.assign(window.location);'>Actualizar</button><br>Banner: <input id='ownbanner' type='text' value='"+getCookie("ownbanner")+"' ></input><button onclick='document.cookie = \"ownbanner= \" + document.getElementById(\"ownbanner\").value; window.location.assign(window.location);'>Actualizar</button><br>";
tb.innerHTML += "Barras: <input id='ownnav' type='text' value='"+getCookie("ownnav")+"' ></input><button onclick='document.cookie = \"ownnav= \" + document.getElementById(\"ownnav\").value; window.location.assign(window.location);'>Actualizar</button>";
if (getCookie("tema") == "brony") {
bronyText.innerHTML="Normal";
}
else if (getCookie("tema") == "nobunaga") {
nobunagaText.innerHTML="Normal";
}
else if (getCookie("tema") == "vintage") {
vintageText.innerHTML="Normal";
}
else if (getCookie("tema") == "hgss") {
hgssText.innerHTML="Normal";
}


}
var functionContainer = document.createElement("script");
functionContainer.innerHTML= 'function modo(tema) {if(getCookie("tema")==tema) {document.cookie = "tema = normal";}else {document.cookie = "tema = " + tema;} window.location.assign(window.location);}';
functionContainer.innerHTML += 'function getCookie(c_name){var c_value = document.cookie;var c_start = c_value.indexOf(" " + c_name + "=");if (c_start == -1) {c_start = c_value.indexOf(c_name + "=");}if (c_start == -1) {	c_value = null; }else{c_start = c_value.indexOf("=", c_start) + 1; var c_end = c_value.indexOf(";", c_start);if (c_end == -1) {c_end = c_value.length;}c_value = unescape(c_value.substring(c_start,c_end));}return c_value;}'
document.body.appendChild(functionContainer);
}
function getCookie(c_name)
{
var c_value = document.cookie;
var 
	c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {

	 
	c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {

	 
	c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) 
	+ 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {

	c_end = c_value.length;
}
c_value = 
	unescape(c_value.substring(c_start,c_end));
}
return c_value;
}