// ==UserScript==
// @name       Corazón de Melón Cambio de Avatar
// @namespace  CorazonDeMelon
// @version    0.3
// @description  Modificar el avatar de un usuario
// @include http://www.corazondemelon.es/messagerie.kiss*
// @include http://www.corazondemelon.es/profil*
// @copyright  2014+, Ricardo
// ==/UserScript==

var usuario = "InstintoRelativo";
var face = "http://www.corazondemelon.es/assets/npc.kiss!thumbnail%C2%BFid=38&resolution=web";
var full = "http://www.corazondemelon.es/assets/picture.kiss!normal?id=227&haircut=no&haircolor=no&eyecolor=no&resolution=web"

var imagenes = document.getElementsByTagName("img"), imagen;
for (var i = 0, len = imagenes.length; i < len; i++)
{
    imagen = imagenes[i];
    if (imagen.src && imagen.src.indexOf(usuario) !== -1)
    {
        if(imagen.src.indexOf("/face/") !== -1){
            imagen.src = face;
        }
        else if(imagen.src.indexOf("/full/") !== -1){
            imagen.src = full;
        }
    }
}
/*
function img_create(src,titutlo) {
    var img = document.createElement('img');
    img.alt= titutlo;
    img.title= titutlo;
    img.src= src;
    return img;
}

for (var i = 220; i < 700; i++)
{
    //NPC
	var img = img_create("http://www.corazondemelon.es/assets/npc.kiss!thumbnail%C2%BFid="+i+"&resolution=web");
    //picture
    var titutlo = i+"";
    var img = img_create("http://www.corazondemelon.es/assets/picture.kiss!normal?id="+i+"&haircut=long&haircolor=brown&eyecolor=pink&resolution=web",titutlo);
    document.body.appendChild(img);
    var img = img_create("http://www.corazondemelon.es/assets/picture.kiss!normal?id="+i+"&haircut=no&haircolor=no&eyecolor=no&resolution=web",titutlo+"-2");
    document.body.appendChild(img);
    var img = img_create("http://www.corazondemelon.es/assets/picture.kiss!normal?id="+i+"&haircut=long&haircolor=brown&eyecolor=no&resolution=web",titutlo+"-3");
    document.body.appendChild(img);
    var img = img_create("http://www.corazondemelon.es/assets/picture.kiss!normal?id="+i+"&resolution=web",titutlo+"-4");
    document.body.appendChild(img);
}
*/