// ==UserScript==

// @name Ogame Actualizacion Vision galaxia Automatico

// @author lala

// @namespace http://www.ogame.com.es

// @description Actualiza la vision galaxia automaticamente. cada cierto tiempo

// @include http://uni40.ogame.com.es/game/index.php?page=galaxy&session=444367b20d83&no_header=1// ==/UserScript==

//

// Constantes Globales

var ONESEC = 1000 ; // Un segundo (in ms)

var ONEMIN = 60 * ONESEC ; // Un Minuto (in ms)=
var MIN = 20 * ONEMIN ; // Minimos minutos
var MAX = 50 * ONEMIN ; // Maximos minutos

function aleatorio(inferior,superior){
numPosibilidades = superior - inferior
aleat = Math.random() * numPosibilidades
aleat = Math.round(aleat)
return parseInt(inferior) + aleat
}

window.setTimeout(

function()

{

window.location.reload() ;

},

aleatorio(MIN, MAX)

) ;