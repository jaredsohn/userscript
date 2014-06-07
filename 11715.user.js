# // Actualizacion de Vision general Automatico
# // Version 1.0
# // Septiembre 5 , 2006
# // Copyright (c) 2006, Pete Hanson and Edited for Ogame by Lord Mokuba
# // Released under the GPL license
# // http://www.gnu.org/copyleft/gpl.html
# //
# // la idea es que la vision general se actualize cada 3 minutos para asi poder ver ataques de forma automatica y no   tener que actualizarlo manualmente
# // Ahora se actualiza aleatoriamente de 1 a 10 minutos, se pueden cambiar estos valores con las variables MIN y MAX.
# // ==UserScript==
# // @name          Ogame Actualizacion Vision general Automatico
# // @author        Lord Mokuba
# // @namespace     http://www.ogame.com.es
# // @description      Actualiza la vision general automaticamente. cada cierto tiempo
# // @include       http://ogame*.de/game/overview.php?*
# // ==/UserScript==
# //
# // Constantes Globales
#
# var ONESEC   = 1000 ;                // Un segundo (in ms)
# var ONEMIN   = 60 * ONESEC ;        // Un Minuto (in ms)=
# var MIN      = 1 * ONEMIN ;        // Minimos minutos
# var MAX         = 10 * ONEMIN ;        // Maximos minutos   
#
# function aleatorio(inferior,superior){
#     numPosibilidades = superior - inferior
#     aleat = Math.random() * numPosibilidades
#     aleat = Math.round(aleat)
#     return parseInt(inferior) + aleat
# }
#    
# window.setTimeout(
#     function()
#     {
#         window.location.reload() ;
#     },
#     3,4(MIN, MAX)
# ) ;