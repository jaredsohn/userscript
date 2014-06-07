//
// ==UserScript==
// @name                        Sporepedia 2: Botones ChatBox
// @description                 Agrega nuevos botones para los ChatBox de Foroactivo. Por defecto agrega botones para insertar códigos "spoiler" e "img", pero el script es fácilmente personalizable para agregar nuevos botones. ¡Ahora con categorías y smilies! :D
// @version                     1.2
// ==/UserScript==
// 

var botones = new Array();
var categorias = new Array();
var smilies = new Array();

//==================================================================================================================================================================================================================//
//  Para crear un botón, agrega una linea de código en el bloque "tus botones" de la siguiente forma:                                                                                                               //
//                                                                                                                                                                                                                  //
//              botones.push(["<codigo>","<texto>"]);                                                                                                                                                               //
//                                                                                                                                                                                                                  //
//      ->Donde dice <codigo> hay que reemplazarlo por el código que querés que se inserte al clickear el botón. NOTA: No es necesario que sea un código, puede ser cualquier texto.                                //
//      ->Donde dice <texto> hay que reemplazarlo por el texto que querés que se vea en el botón.                                                                                                                   //
//                                                                                                                                                                                                                  //
//  Este script ya viene con dos botones por defecto que te pueden servir de ejemplo, los cuales podés borrar.                                                                                                      //
//==================================================================================================================================================================================================================//
//  También podés crear categorías, que sirven para seleccionar opciones agrupadas en una lista desplegable. Para hacer una nueva, agrega una línea de código en el bloque "tus categorías" de la siguiente forma:  //
//                                                                                                                                                                                                                  //
//              categorias.push([["<codigo1>","<texto1>"],["<codigo2>","<texto2>"],["<codigo3>","<texto3>"]]);                                                                                                      //
//                                                                                                                                                                                                                  //
//      ->La cantidad de opciones por categoría la decidís vos.                                                                                                                                                     //
//                                                                                                                                                                                                                  //
//  Este script ya viene con una categoría por defecto con 4 opciones que te puede servir de ejemplo, la cual podes borrar.                                                                                         //
//==================================================================================================================================================================================================================//
//  Para crear un smilie personal (que se mostrarán en la categoría "Smilies Personal" de la ventana de smilies), agrega una línea de código en el bloque "tus smilies" de la siguiente forma:                      //
//                                                                                                                                                                                                                  //
//              smilies.push("<smile>");                                                                                                                                                                            //
//                                                                                                                                                                                                                  //
//      ->Donde dice <smilie> hay que reempazarlo por el link de la imagen.                                                                                                                                         //
//                                                                                                                                                                                                                  //
//  Este script ya viene con cuatro smilies por defecto que te pueden servir de ejemplo, los cuales podés borrar.                                                                                                   //
//==================================================================================================================================================================================================================//


//===BLOQUE TUS BOTONES===//
botones.push(["[spoiler][/spoiler]","spoiler"]);
botones.push(["[img][/img]","img"]);
//===BLOQUE TUS BOTONES===//

//===BLOQUE TUS CATEGORÍAS===//
categorias.push([["[b][/b]","Negrita"],["[i][/i]","Cursiva"],["[u][/u]","Subrayar"],["[strike][/strike]","Rayado"]]);
//===BLOQUE TUS CATEGORÍAS===//

//===BLOQUE TUS SMILIES===//
smilies.push("http://r26.imgfast.net/users/2612/26/07/98/smiles/1695449044.gif");
smilies.push("http://r26.imgfast.net/users/2612/26/07/98/smiles/3315134335.gif");
smilies.push("http://r26.imgfast.net/users/2612/26/07/98/smiles/807510727.gif");
smilies.push("http://r26.imgfast.net/users/2612/26/07/98/smiles/4293637789.gif");
//===BLOQUE TUS SMILIES===//


if(document.getElementById("chatbox_footer")){
	for (var i = 0; i < botones.length; i++) {
		document.getElementById("chatbox_footer").innerHTML += "   <button onclick=\"document.getElementById('message').value += '" + botones[i][0] + "';document.getElementById('message').focus();\">" + botones[i][1] + "</button>";
	}

	for (var i = 0; i < categorias.length; i++) {
		document.getElementById("chatbox_footer").innerHTML += "   <select onchange=\"document.getElementById('message').value += this.value;document.getElementById('message').focus();this.options[0].innerHTML = this.options[this.selectedIndex].innerHTML;this.value = '';\" class='categoria-cb'></select>";
		document.getElementsByClassName("categoria-cb")[i].innerHTML += "<option style='display: none;' value=''>" + categorias[i][0][1] + "</option>";
		for (var j = 0; j < categorias[i].length; j++) {
			document.getElementsByClassName("categoria-cb")[i].innerHTML += "<option value='"+  categorias[i][j][0] + "'>" + categorias[i][j][1] + "</option>";
		}
	}
}

if(document.URL.indexOf("mode=smilies") > -1 && document.URL.indexOf("mode=smilies_frame") == -1 && smilies.length > 0){
	document.getElementsByName("categ")[0].innerHTML += "<option value='23'>Smilies Personales</option>";
	if(document.URL.indexOf("categ=23") > -1){
		while (document.getElementsByTagName("a").length > 1) {
			document.getElementById("simple-wrap").removeChild(document.getElementsByTagName("a")[0]);
		}
		var cerrar = document.getElementsByTagName("p")[1];
		document.getElementById("simple-wrap").removeChild(cerrar);
		for (var i = 0; i < smilies.length; i++) {
			document.getElementById("simple-wrap").innerHTML += "<a href=\"javascript:insert_chatboxsmilie('[img]" + smilies[i] + "[/img]')\" style=\"margin-left: 10px;\"><img src=\"" + smilies[i] + "\" style=\"margin-bottom: 10px;\"></a>";
		}
		document.getElementById("simple-wrap").appendChild(cerrar);
	}
}