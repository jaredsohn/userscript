// ==UserScript==
// @name           CommenTT!
// @namespace      CommenT! V0.1 Briiann78
// @description    Comentar en T!
// @include        http://taringa.net/*
// ==/UserScript==
///////////////------------------Modificar Agregar Comentario--------------------////////////////////
function $$(elem) {
	return document.getElementById(elem);
}
function CrearBarraColores(){
		var colores = new Array('#000000','#222222','#444444','#666666','#888888','#AAAAAA','#000000','#000040','#000080','#0000BF','#0000FF','#004000','#004040','#004080','#0040BF','#0040FF','#008000','#008040','#008080','#0080BF','#0080FF','#00BF00','#00BF40',
			'#00BF80','#00BFBF','#00BFFF','#00FF00','#00FF40','#00FF80','#00FFBF','#00FFFF','#400000','#400040','#400080','#4000BF','#4000FF','#404000','#404040','#404080','#4040BF','#4040FF','#408000','#408040','#408080','#4080BF','#4080FF','#40BF00','#40BF40',
			'#40BF80','#40BFBF','#40BFFF','#40FF00','#40FF40','#40FF80','#40FFBF','#40FFFF','#800000','#800040','#800080','#8000BF','#8000FF','#804000','#804040','#804080','#8040BF','#8040FF','#808000','#808040','#808080','#8080BF','#8080FF','#80BF00','#80BF40',
			'#80BF80','#80BFBF','#80BFFF','#80FF00','#80FF40','#80FF80','#80FFBF','#80FFFF','#BF0000','#BF0040','#BF0080','#BF00BF','#BF00FF','#BF4000','#BF4040','#BF4080','#BF40BF','#BF40FF','#BF8000','#BF8040','#BF8080','#BF80BF','#BF80FF','#BFBF00','#BFBF40',
			'#BFBF80','#BFBFBF','#BFBFFF','#BFFF00','#BFFF40','#BFFF80','#BFFFBF','#BFFFFF','#FF0000','#FF0040','#FF0080','#FF00BF','#FF00FF','#FF4000','#FF4040','#FF4080','#FF40BF','#FF40FF','#FF8000','#FF8040','#FF8080','#FF80BF','#FF80FF','#FFBF00','#FFBF40',
			'#FFBF80','#FFBFBF','#FFBFFF','#FFFF00','#FFFF40','#FFFF80','#FFFFBF','#FFFFFF');
		var nuevaHTML = '<div id="Sharkale_TaringaColores" style="position: absolute!important;margin-left:-85px"><table border="0" cellpadding="0" cellspacing="1" align="center" bgcolor="#000000" onmouseover="this.style.cursor=\'pointer\'"><tbody><tr>'; 
		for(var i = 1; i < colores.length; i++){
			nuevaHTML += '<td bgcolor="'+colores[i]+'"><img src="'+URL+'spacer.gif" onclick="insertarBBC(\'[color='+colores[i]+']\', \'[/color]\')" alt="'+colores[i]+'" title="'+colores[i]+'" width="15" height="11"></td>';
			if(i%5 == 0 && i != colores.length-1) nuevaHTML += '</tr><tr>';
		}