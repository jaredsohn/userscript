// ==UserScript==
// @name           UTN FRRe: BiblioVirtual - Mi Biblioteca Fix
// @namespace      http://biblio.frre.utn.edu.ar/bibliodigital/
// @description    Soluciona problemas en la presentación y comportamiento de Mi Biblioteca en navegadores distintos de IE.
// @version	       1.2
// @author		   Sebastián J. Seba
// @include        http://biblio.frre.utn.edu.ar/bibliodigital/mi_biblioteca.asp*
// @downloadURL    https://userscripts.org/scripts/source/98326.user.js
// @updateURL      https://userscripts.org/scripts/source/98326.meta.js
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.setAttribute("type", "text/javascript");
	script.addEventListener('load', function() {
					var script = document.createElement("script");
					script.textContent = "(" + callback.toString() + ")();";
					document.body.appendChild(script);
					}, false);
  document.body.appendChild(script);
}

function main() {
	//var adelante = $("html body div table tbody tr td div table tbody tr td div p font a:last-child").attr('href');
	var adelante = $("html body div table tbody tr td div table tbody tr td div font p a:last-child").attr('href');
	//var atras = $("html body div table tbody tr td div table tbody tr td div p font a:first-child").attr('href');
	var atras = $("html body div table tbody tr td div table tbody tr td div font p a:first-child").attr('href');
			
	$("html body div table tbody tr td div table tbody tr td div font p a:first-child").attr({'href' : atras});
	$("html body div table tbody tr td div table tbody tr td div font p a:last-child").attr({'href' : adelante});
	
	$("html body div table tbody tr td div table tbody tr td div font table tbody tr td div table tbody tr td table tbody tr td div table tbody tr td:nth-child(3) a").each(function(index){
		inventario = $(this).attr('href');
		inventario = inventario.replace(/\D/g,'');
		$(this).attr({'href': 'javascript:void()', 'id': inventario});
	  });
	  
 	$("html body div table tbody tr td div table tbody tr td div font table tbody tr td div table tbody tr td table tbody tr td div table tbody tr td:nth-child(3) a").click(function(){
		if(confirm("¿Desea eliminar este libro de Mi Biblioteca?")){
			window.location = "http://biblio.frre.utn.edu.ar/bibliodigital/eliminar_de_mi_biblio.asp?nro_inv=" + $(this).attr('id');
		}else{return false}
	});
	
	$("html body div table tbody tr td div table tbody tr td div font table tbody tr td div table tbody tr td table tbody tr td div table tbody tr td:nth-child(4) a").each(function(index){
		var tabla;		
		
		if(index == 0){
			tabla = "table:first-child";
		}else{
				tabla = "table:nth-child(" + (++index)  + ")";
			 }
		
		nroInv = $("html body div table tbody tr td div table tbody tr td div font " + tabla + " tbody tr td div table tbody tr td table tbody tr td div table tbody tr td:nth-child(3) a").attr('id');
		$(this).attr({'href': 'javascript:void()', 'id': nroInv});
	});
	  
	$("html body div table tbody tr td div table tbody tr td div font table tbody tr td div table tbody tr td table tbody tr td div table tbody tr td:nth-child(4) a").click(function(){
		window.open('ver_indice.asp?nro_inv=' + $(this).attr('id') + '&pagina=indice.asp', null, "height=600, width=600, scrollbars=yes, status=yes, toolbar=no, menubar=no, location=no, resizable=yes");
	});
	
	$("html body div table tbody tr td div form table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr td font input.textBoxVerdana1").click(function(){
		window.open('imprimir_ticket.asp', null, "height=400, width=250, scrollbars=yes, status=yes, toolbar=no, menubar=no, location=no, resizable=yes");
	});
	
	$("html body div table tbody tr td div form table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr:nth-child(3) td font input.textBoxVerdana1").click(function(){
		window.location = "http://biblio.frre.utn.edu.ar/bibliodigital/cancelar_pedido.asp?nro_inv=1137";
	});
	
	$("html body div table tbody tr td div form table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr:nth-child(5) td font input.textBoxVerdana1").click(function(){
		window.open('otro_tramite.asp', null, "height=400, width=250, scrollbars=yes, status=yes, toolbar=no, menubar=no, location=no, resizable=yes");
	});
}

addJQuery(main);