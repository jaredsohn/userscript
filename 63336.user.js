// ==UserScript==
// @name           Taringa - Borrador 
// @namespace      http://www.mcodina.com.ar
// @description    Permite guardar en un borrador los posts que creas
// @include        http://www.taringa.net/agregar/
// @include        http://taringa.net/agregar/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(document).ready(function () {
	// CONTROLAMOS LA VERSION!
	// version                     0.2 04 Dic 2009
	var local_version = new Number(0.2);
	
	//alert("Actualizar");
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://docs.google.com/Doc?docid=0Ac34gGCiSVRGZGNqNmt3OG5fMTJjaGNmYm1tYw',
		headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
		data:'',
		onload:function(result) {
			var res = result.responseText;
			var start_pos = res.indexOf("*Version");
			var stop_pos = res.indexOf("*", start_pos + 1);
			var server_version = new Number(0);
			server_version = res.substr(start_pos + 8, (stop_pos - start_pos - 8 ));
			if (server_version > local_version){
				alert("Hay una nueva version del script, ahora se le actualizara. Disculpe las molestias");
				location.replace("http://userscripts.org/scripts/source/63336.user.js");
			}
		}
	});
	// FIN CONTROL DE VERSIÓN!!

    var caja = $('#post_agregar')[0];
	var cajita = caja.childNodes[1].childNodes[3];
	var boton = document.createElement('input');
	boton.type = "button";
	boton.id = "guardarBorrador";
	boton.value = "Guardar en Borrador";
	boton.style.cssFloat = "right";
	boton.style.cursor = "pointer";
	boton.style.color = "#FFF";
	boton.style.border = "1px solid #CCCCCC";
	boton.style.background = "#004A95";
	var boton2 = document.createElement('input');
	boton2.type = "button";
	boton2.id = "cargarBorradores";
	boton2.value = "Cargar Borradores";
	boton2.style.cssFloat = "right";
	boton2.style.cursor = "pointer";
	boton2.style.color = "#FFF";
	boton2.style.border = "1px solid #CCCCCC";
	boton2.style.background = "#004A95";
	boton2.style.margin = "0px 5px 0px 0px"
	cajita.appendChild(boton);
	cajita.appendChild(boton2);
	// AL HACER CLICK GUARDAMOS LAS COSAS!
	$('#guardarBorrador').bind('click', guardamos);
	// AL HACER CLICK CARGAMOS LAS COSAS!
	$('#cargarBorradores').bind('click', cargamos);
});
var guardamos = function(){
	var pass = prompt("Ingrese una contraseña para el borrador", "");
	var usuario = $('#menu .usernameMenu')[0].childNodes[1].text;
	var titulo = $('form input')[1].value;
	var post = $('form #markItUp')[0].value;
	var tags = $('form input')[3].value;
	var categoria = $('form select')[0].selectedIndex; 
	var dataString = 'task=set&titulo='+ titulo + '&post=' + post + '&tags=' + tags + '&categoria=' + categoria + '&pass=' + pass + '&usuario=' + usuario;  
	GM_xmlhttpRequest({
        method: "POST",
        url: "http://www.mcodina.com.ar/borrador_taringa.php",
        headers:{'Content-type':'application/x-www-form-urlencoded; charset=utf-8'},
        data:encodeURI(dataString),
        onload: function(xhr) { alert(xhr.responseText); }
    });
	return false
}
var cargamos = function(){
	var caja = $('#post_agregar')[0];
	var div = document.createElement('div');
	div.id = "listadoBorradoresUsuario";
	div.style.textAlign = "left";
	div.style.position = "fixed";
	div.style.top = "100px";
	div.style.right = "20px";
	div.style.backgroundColor = "#FFF";
	div.style.border = "2px solid #000";
	div.style.padding = "5px"
	div.style.background = "#F1F1F1";
	var pC = document.createElement('p');
	pC.style.textAlign = "right";
	var cerrar = document.createElement('a');
	var txt = document.createTextNode('Cerrar [X]');
	cerrar.href = 'javascript:void(0)';
	cerrar.id = 'linkCerrarBorradores';
	cerrar.appendChild(txt);
	cerrar.style.color = "#0000FF";
	pC.appendChild(cerrar);
	div.appendChild(pC);
	caja.appendChild(div);
	$('#linkCerrarBorradores').bind('click', function(){
		caja.removeChild(div);
	});
	
	var usuario = $('#menu a')[7].text;
	var dataString = 'task=load&usuario='+ usuario; 
	GM_xmlhttpRequest({
        method: "POST",
        url: "http://www.mcodina.com.ar/borrador_taringa.php",
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(dataString),
        onload: function(xhr) {
			// var resp = xhr.responseText; 
			var resultado = eval('(' + xhr.responseText + ')');
			var cant = resultado.length;
			var i;
			for(i=0;i<cant;i++){
				var p = document.createElement('p');
				var text = document.createTextNode(resultado[i].titulo + " - ");
				var insertar = document.createElement('a');
				var insertarTxt = document.createTextNode('Usar');
				insertar.href = "javascript:void(0)";
				insertar.id = "insertarBorrador" + resultado[i].id;
				insertar.style.color = "#0000FF";
				insertar.appendChild(insertarTxt);
				
				var separadorTxt = document.createTextNode(' - ');
				
				var borrar = document.createElement('a');
				var borrarTxt = document.createTextNode('Borrar');
				borrar.href = "javascript:void(0)";
				borrar.id = "borrarBorrador" + resultado[i].id;
				borrar.style.color = "#0000FF";
				borrar.appendChild(borrarTxt);
				
				p.appendChild(text);
				p.appendChild(insertar);
				p.appendChild(separadorTxt);
				p.appendChild(borrar);
				div.appendChild(p);
				
				$('#insertarBorrador' + resultado[i].id).bind('click', function(e){
					var id = this.id.substr(16);
					var pass = prompt("Ingrese el password del borrador", "");
					var dataEnviar = 'task=getPost&id=' + id + '&pass=' + pass; 
					GM_xmlhttpRequest({
						method: "POST",
						url: "http://www.mcodina.com.ar/borrador_taringa.php",
						headers:{'Content-type':'application/x-www-form-urlencoded; charset=utf-8'},
						data:encodeURI(dataEnviar),
						onload: function(xhr) { 
							var txtRes = unescape(xhr.responseText);
							var res = eval('(' + txtRes + ')');
							var post = res[0].post;
							post = post.replace(/\[saltoN\]/g, "\n");
							post = post.replace(/\[saltoR\]/g, "\r");
							post = post.replace(/\[saltoNR\]/g, "\n\r");
							$('form input')[1].value = res[0].titulo;
							$('form #markItUp')[0].value = post;
							$('form input')[3].value = res[0].tags;
							$('form select')[0].selectedIndex = res[0].categoria; 
						}
					});
					e.stopPropagation();
				});
				$('#borrarBorrador' + resultado[i].id).bind('click', function(e){
					var id = this.id.substr(14);
					var pass = prompt("Ingrese el password del borrador", "");
					var dataEnviar = 'task=borrarPost&id=' + id + '&pass=' + pass; 
					GM_xmlhttpRequest({
						method: "POST",
						url: "http://www.mcodina.com.ar/borrador_taringa.php",
						headers:{'Content-type':'application/x-www-form-urlencoded; charset=utf-8'},
						data:encodeURI(dataEnviar),
						onload: function(xhr) { 
							var txtRes = unescape(xhr.responseText);
							var el = $('#listadoBorradoresUsuario')[0];
							el.parentNode.removeChild(el);
							alert(txtRes); 
						}
					});
					e.stopPropagation();
				});
			}
		}
    });
	return false
}