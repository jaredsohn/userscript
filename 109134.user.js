// ==UserScript==
// @name       ЯR-Pro
// @version    0.7
// @description  Kit de mejoras para el MMORPG Los Reinos Renacientes.
// @include    http://foro.losreinos.com/*
// @include    http://foro2.losreinos.com/*
// @include    http://www.losreinos.com/*
// @include    http://losreinos.com/*
// @exclude    http://foro.losreinos.com/viewforum.php?f=*
// @exclude    http://foro2.losreinos.com/viewforum.php?f=*
// @copyright  Copyleft, by SirSlither (Black_lotus), 
// ==/UserScript==

/* 
Estas son las modificaciones que lleva a cabo este script:
Misa:Lanza una alerta cuando es horario de misa. ¡En desarrollo!
AnadirAmigo:Crea un botón en la ficha de personaje para añadirlo a su lista de amigos.
BotonFirma:Crea un botón que borra las firmas en el foro.
VincularLogin:Vincula el nombre del usuario del foro con su ficha de personaje.
BorrarSecciones:Borra automáticamente las secciones turcas, griegas, rumanas, polacas...
MapaMrGroar:Añade un botón que permite mostrar y ocultar el mapa de MrGroar en Fuera del pueblo
*/

var url = window.location.href;
var elementos = new Array();
var elementos = document.getElementsByTagName('td');
var names = document.getElementsByClassName('name');
//secciones del foro a borrar en la función BorrarSecciones()
var secciones = ["Türkiye","Zagranicznych","Graafschap","ÅëëÜäá","ma³opolska","KoE/KoS","Mazowiecka","Romania","Mazowsze","Ksiêstwa","Kraljevina Hrvatska","Sring Italico","Palazzo delle Corporazioni","Red Vitezova Templara","Çöp Kutusu","Mansuri Dergahi","Italia","Regno delle Due Sicilie","Italia-Corte d'Appello","ÄïõêÜôï ôçò ÅëëÜäïò","Magy","Królestwo","Wielkopolska","Małopolska","Mumhain","Port of Greece"];
var finalraiz = url.slice(7).search('/');
var raiz = url.slice(7,finalraiz+7);
var botonesficha = document.getElementsByClassName('texte2');
//consigue del url de la ficha de personaje el nombre
var nombreaccion = url.slice(url.search('=')+1);

//Puedes borrar cualquiera de las mejoras del script borrándolas aquí:
//Funciones llamadas en los foros y el juego
//Misa();

//Funciones llamadas en la ficha de personaje
if (url.slice(25,40) == 'FichePersonnage'){
    AnadirAmigo();
}

//Funciones llamadas en los foros
if (raiz == 'foro.losreinos.com' || raiz == 'foro2.losreinos.com'){
    BotonFirma();
    VincularLogin();
    BorrarSecciones();
}

//Funciones llamadas en Fuera del pueblo
if (window.location=='http://www.losreinos.com/EcranPrincipal.php?l=8'){
    MapaMrGroar();
}

function BorrarFirma(){
    for (var b = 1; b < elementos.length; b++){
        texto=elementos[b].innerHTML;
        texto=texto.replace(/_________________.*/, ""); //Ya que la firma no tiene ID o clase propia, busca la barra que todas las firmas tienen antes.
        elementos[b].innerHTML=texto;
    }
}

function BorrarSecciones(){
    for (var x = 0; x < secciones.length; x++){
        var borrareste = secciones[x];
        for (var e = 1; e < elementos.length; e++){
            var sespacio = elementos[e].innerHTML;
            if (sespacio.search(borrareste)!=-1){
                //si encuentra alguno de los elementos de Secciones en el innerHTML, elimina todo el div.
                elementos[e].parentNode.parentNode.removeChild(elementos[e].parentNode); 
            }
        }
    }
}

function VincularLogin(){
    for (var i = 0; i < names.length; i++){
        var s=names[i].innerHTML;
        var s1=s.search('<b>')+3;
        var s2=s.search('</b>');
        var nombre=s.slice(s1,s2);
        //Antes mira si tiene las señales típicas de un pnj o un moderador '--' o '{'
        if(!nombre.search('--')==0) if(!nombre.search('{')==0) names[i].innerHTML='<a href="http://www.losreinos.com/FichePersonnage.php?login='+nombre+'" target="_blank">'+nombre+'</a>';
    }
}
 
function BotonFirma(){
    document.body.innerHTML += '<button type="submit" id="borrar" style="opacity: 0.3; position: fixed; right: 0px; bottom: 0px;" onmouseover="this.style.opacity=0.8;this.filters.alpha.opacity=80" onmouseout="this.style.opacity=0.3;this.filters.alpha.opacity=30">Ocultar firmas</button>'; 
    borrador=document.getElementById("borrar");
    borrador.addEventListener ("click", function () {BorrarFirma();}, false);
}

function AnadirAmigo(){
    botonesficha[0].innerHTML += '<br><br><form method="post" action="Action.php?action=31"><li><input name="ami" type="hidden" value="'+nombreaccion+'"><input type="submit" value="Añadir a '+nombreaccion+' como amigo"></li></form></ul></ul>';
}

/*
function Misa(){
    var dt = new Date();
    alert(dt.getUTCDay());
    //el Valor GM 'misa' sirve para que no alerte varias veces de la misa. Cuando el usuario sale de los intervalos de horario de misas, el valor se repone a 0. 
    if(dt.getUTCDay()==7 && dt.getUTCHours()>7 && dt.getUTCHours()<11){
        if(Number(GM_getValue('misa'))==0){
            alert('Misa disponible');
            GM_setValue('misa',1);
        }
    }
    else if(dt.getUTCDay()==3 && dt.getUTCHours()>15 && dt.getUTCHours()<19){
        if(Number(GM_getValue('misa'))==0){
            alert('Misa disponible');
            GM_setValue('misa',1);
        }
    }
    else{
        GM_setValue('misa',0);
    }
}
*/

function MapaMrGroar(){
    document.body.innerHTML += '<button type="submit" id="mapag" style="opacity: 0.3; position: fixed; right: 0px; bottom: 0px;" onmouseover="this.style.opacity=0.8;this.filters.alpha.opacity=80" onmouseout="this.style.opacity=0.3;this.filters.alpha.opacity=30">Cambiar mapa</button>'; 

    $("#mapag").click(function(){
        if (document.getElementById('MMG')){
            $("#MMG").toggle();
            }
        else{
            var mapjb=document.getElementsByName('MapJB');
            mapjb[0].innerHTML+='<IFRAME id="MMG" SRC="http://www.le317.fr/cartes/monde.html" frameborder=no width="100%" height=400> </IFRAME>';
        }
    });
}