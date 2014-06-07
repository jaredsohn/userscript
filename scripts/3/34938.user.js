// ==UserScript==
// @name           	Alma Script
// @namespace      ASTips
// @description    Accesos Rapidos para la comoda implantacion de codigos phpbb en el foro de rol: http://www.alma-shinigami.com
// @include     http://www.alma-shinigami.es/foro/posting.php*
// @include	http://www.alma-shinigami.es/foro/privmsg.php*
// @author	Tolke. Great Help from JoeSimmons.
// ==/UserScript==

//---------------------------------------------------------

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

//------> Las siguientes variables indican en quote las habilidades de tu personaje, Asi solo tienes que editar el texto, y usarlo siempre en cada combate.

// ---> Habilidad nº 1
var hab_one = "[quote][b]Hace una tirada FEd4 y añade lo que salga a su Defensa. 2 x combate. 12 EE.";
var hab_one_end = "[/b][/quote]";

// ---> Habilidad nº 2
var hab_two = "[quote][b]Tiras tu propia FE con tantas caras como tenga el dado del Kidoh a regresar y si supera el ataque, lo devuelve contra el enemigo. Solo Kidohs que sean de daño directo. 1 x combate. 80 + kidoh a devolver EE.";
var hab_two_end = "[/b][/quote]";

// ---> Habilidad nº 3
var hab_three = "[quote][b]FEd6. Paraliza al enemigo durante 5 turnos. Puede deshacerse de las ataduras tirando 1d30, 21+ se libera, si no resta la tirada a su vit. El enemigo defiende con la mitad de dados. 1 x combate. 80 EE.";
var hab_three_end = "[/b][/quote]";

//---> Habilidad nº 4
var hab_four = "[quote][b]Hace una tirada FEd7. Si el daño es mayor de 30, reduce todos los parámetros del objetivo en 3 unidades (la EE en 20) durante 5 turnos. 2 x combate. (Avanzado) . 3 x combate. 75 EE.";
var hab_four_end = "[/b][/quote]";

//---> Habilidad nº 5
var hab_five = "[quote][b]Fed12 a todos. 1 x combate. 70 EE.";
var hab_five_end = "[/b][/quote]";

//---> Habilidad nº 6
var hab_six = "[quote][b]Se crea una escudo con la Vit Maxima del individuo que utiliza el kidoh hasta un tope de 1000 puntos, absorbiendo todo el daño que valla a el y deshaciendose luego. No ataca al proximo turno. 1 x combate. 120 EE.";
var hab_six_end = "[/b][/quote]";

//---> Habilidad nº 7
var hab_seven = "[quote][b]Hace un daño de FEd7 al objetivo. 2 x combate. 30 EE.";
var hab_seven_end = "[/b][/quote]";

//---> Habilidad nº 8
var hab_eight = "[quote][b] ---";
var hab_eight_end = "[/b][/quote]";

//---> Habilidad nº 9
var hab_nine = "[quote][b] ---";
var hab_nine_end = "[/b][/quote]";

//---> Habilidad nº 10
var hab_ten = "[quote][b] ---";
var hab_ten_end = "[/b][/quote]";


// Esta funcion es para el "Hot Key" (combinacino de teclas rapidas). Se puede usar cualquier tecla, solo buscar el codigo ASCII de la letra EN MAYUSCULA
// Y ponerlo tal cual esta este codigo, con la nueva funcion a la que hace referencia.
// No usar las letras B, I, U, Q, C, L, O, P, W, D, T. Estas teclas estan prohibidas de uso, si no daran errores.

function key(e) {

   if(e.altKey) {
      switch(e.keyCode) {
         case 88:unsafeWindow.bbfontstyle (color_one,color_one_end);break;       // Alt + X
         case 90:unsafeWindow.bbfontstyle (color_two,color_two_end);break;       // Alt + Z
         case 70:unsafeWindow.bbfontstyle (color_three,color_three_end);break;   // Alt + F
         case 49:unsafeWindow.bbfontstyle (hab_one,hab_one_end);break;           // Alt + 1
         case 50:unsafeWindow.bbfontstyle (hab_two,hab_two_end);break;           // Alt + 2
         case 51:unsafeWindow.bbfontstyle (hab_three,hab_three_end);break;       // Alt + 3
         case 52:unsafeWindow.bbfontstyle (hab_four,hab_four_end);break;         // Alt + 4
         case 53:unsafeWindow.bbfontstyle (hab_five,hab_five_end);break;         // Alt + 5
         case 54:unsafeWindow.bbfontstyle (hab_six,hab_six_end);break;           // Alt + 6
         case 55:unsafeWindow.bbfontstyle (hab_seven,hab_seven_end);break;       // Alt + 7
         case 56:unsafeWindow.bbfontstyle (hab_eight,hab_eight_end);break;       // Alt + 8
         case 57:unsafeWindow.bbfontstyle (hab_nine,hab_nine_end);break;         // Alt + 9
         case 48:unsafeWindow.bbfontstyle (hab_ten,hab_ten_end);break;           // Alt + 10
      }
   }
}

window.addEventListener('keydown', key, false);
