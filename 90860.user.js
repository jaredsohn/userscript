// ==UserScript==
// @name           	Dorayaki Script
// @namespace      DorayakiTips
// @description    Accesos Rapidos para la comoda implantacion de codigos phpbb en el foro de rol: http://dorayaki.foroactivo.com
// @include     http://dorayaki.foroactivo.com/post.forum?*
// @include	http://dorayaki.foroactivo.com/msg.forum?*
// @author	Ame.
// ==/UserScript==

//-------------- Vars ---------------------
// ------>  Aqui solo modificar las variables con los colores que quieras tener y si es negrita, o cursiva, etc. Son 4 variables, 2 por funcion. 

// --->  Este color es para describir la escena.
var color_one = "[color=darkgrey][i]";
var color_one_end = "[/i][/color]";

// ---> Este color es para cuando tu personaje hable
var color_two = "[color=orange][b]";
var color_two_end = "[/b][/color]";

// ---> Este color es para otra voz
var color_three = "[color=crimson][b]";
var color_three_end = "[/b][/color]";

//------> Las siguientes variables indican frases escritas o predeterminadas con anterioridad.

// Esta funcion es para el "Hot Key" (combinacino de teclas rapidas). Se puede usar cualquier tecla, solo buscar el codigo ASCII de la letra EN MAYUSCULA
// Y ponerlo tal cual esta este codigo, con la nueva funcion a la que hace referencia.
// No usar las letras B, I, U, Q, C, L, O, P, W, D, T. Estas teclas estan prohibidas de uso, si no daran errores.

function key(e) {

   if(e.altKey) {
      switch(e.keyCode) {
         case 88:unsafeWindow.bbfontstyle (color_one,color_one_end);break;       // Alt + X
         case 90:unsafeWindow.bbfontstyle (color_two,color_two_end);break;       // Alt + Z
         case 70:unsafeWindow.bbfontstyle (color_three,color_three_end);break;   // Alt + F
      
      }
   }
}

window.addEventListener('keydown', key, false);

