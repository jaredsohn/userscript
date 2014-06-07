// ==UserScript==
// @name          Abbatia ES
// @version       0.3f
// @author        FactorX
// @namespace     http://www.abbatia.net
// @description   Script para agilizar el manejo de Abbatia
// @include       http://www.abbatia.net/*
// ==/UserScript==
/* Lista de implementaciones:

General:
0.3f	- Añadido mensaje para que avise cuando haya nueva versión.

listarMonjes.do:
0.1		- Muestra datos numericos.
0.1		- Buen medico.
0.1		- Buen copista.
0.1		- Buen copista exterior.
0.1		- Buen profesor.
0.2a	- Modificado icono profesor.
0.2a	- Añadido redondeo a puntuaciones. (Arreglo)
0.3b	- Puntuación de habilidades de monjes sobre 100.
0.3c	- Tiempo restante para novicios.

main.do:
0.2		- Contador para los monjes (Y suma de los propios).
	
gestionGuardias.do:
0.3e	- Gestión de guardias de forma más rápida. (En Chrome se ve la barra slider)
	
listarEdificios.do:
0.2		- Enlace a wikia de los edificios.
0.2a	- Corregidos algunos enlaces a wikia. (Arreglo)

crear_edificio.do:
0.2 	- Enlace a wikia de los edificios.

granja:
0.3		- Traslado de animales sin recargar la página agilizado.
0.3d	- Modificado el icono para traslado rápido de animales por el original de traslado.

barra superior:
0.3		- Añadido enlace a la página del script

biblioteca:
0.3d2	- Corregidos algunos fallos que tenía el script en biblioteca.
	Tu biblioteca:
	0.3a	- Se puede ordenar de mayor a menor deterioro.
	0.3a	- Se puede restaurar sin recargar la página agilizado.
	0.3d2	- Tiempo restante de copia, al poner el ratón encima número de tareas. (Mostrar todo)
	
	Copias en otras bibliotecas:
	0.3d2	- Tiempo restante de copia, al poner el ratón encima número de tareas. (Mostrar todo)
	
comedor:
0.3e	- Ahora se muestra la fecha de inicio caducidad (Aparece en rojo si es menos de 5 dias), fin de caducidad e icono para vender agrupado.

*/
 
//COMPATIBILIDAD
if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }

	GM_getValue = function(name, defaultValue) {
		var value = localStorage[name];
		return value == null ? defaultValue : JSON.parse(value);
	}

	GM_setValue = function(name, value) {
		localStorage[name] = JSON.stringify(value);
	}
}
//FIN COMPATIBILIDAD

//SCRIPT ACTUALIZACION 
//Fuente: http://userscripts.org/scripts/show/20145
//Solo para Firefox + GreaseMonkey
if (typeof GM_xmlhttpRequest != 'undefined') {


	var SUC_script_num = 111435; // Change this to the number given to the script by userscripts.org (check the address bar)
	try
	{
		function updateCheck(forced)
		{
			if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
			{
				try
				{
					GM_xmlhttpRequest(
					{
						method: 'GET',
						url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
						headers: {'Cache-Control': 'no-cache'},
						onload: function(resp)
						{
							var local_version, remote_version, rt, script_name;
							
							rt=resp.responseText;
							GM_setValue('SUC_last_update', new Date().getTime()+'');
							remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
							local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
							if(local_version!=-1)
							{
								script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
								GM_setValue('SUC_target_script_name', script_name);
								if (remote_version > local_version)
								{
									if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
									{
										GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
										GM_setValue('SUC_current_version', remote_version);
									}
								}
								else if (forced)
									alert('No update is available for "'+script_name+'."');
							}
							else
								GM_setValue('SUC_current_version', remote_version+'');
						}
					});
				}
				catch (err)
				{
					if (forced)
						alert('An error occurred while checking for updates:\n'+err);
				}
			}
		}
		GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
		{
			updateCheck(true);
		});
		updateCheck(false);
	}
	catch(err)
	{}
}
//FIN SCRIPT ACTUALIZACION

req = false;
if (window.XMLHttpRequest) {
	req = new XMLHttpRequest();    
} else if (window.ActiveXObject) {
	req = new ActiveXObject("Microsoft.XMLHTTP");
}

var recoger_fecha = function () 
{
	GM_setValue("fecha_abbatia", document.getElementById("reloj").textContent);
	setTimeout(recoger_fecha,1000);
}

fecha_abbatia = GM_getValue("fecha_abbatia");


array_util = new Array();
array_monjes = new Array();

var corregir_fecha = function (texto_fecha,caracter) {
    dia=texto_fecha.split(caracter)[0];
    mes=texto_fecha.split(caracter)[1];
    anyo=texto_fecha.split(caracter)[2];
    for (var i=0;anyo.length<4;i++) anyo="0"+anyo;
    for (var i=0;dia.length<2;i++) dia="0"+dia;
    for (var i=0;mes.length<2;i++) mes="0"+mes;
    texto_fecha = anyo+"-"+mes+"-"+dia;
    return(texto_fecha);
}

var isNumeric = function (expression)
{
	return (String(expression).search(/^\d+$/) != -1);
}

var recoger_pagina = function (pagina_in) {
	//Se puede insertar por ejemplo document.location.href
	return pagina_in.split("/")[3].split("?")[0];
}

// FUNCIONES COMEDOR
var recoger_fechas_cocina = function ()
{
	string_edificios = new Array;
	fechas_alimentos = new Array;	//Aqui guardaremos: Nombre, f_inicio, f_fin tanto de alimentos como de guisos
	contador_alimentos = 0;
	string_edificios = GM_getValue("edificios").split("|");
	url=string_edificios[string_edificios.indexOf("Cocina")+1]+"&Tab=init&pagesize=1000";	//Alimentos
	recoger_alimentos(url);
	url=string_edificios[string_edificios.indexOf("Cocina")+1]+"&Tab=guisos&pagesize=1000";	//Guisos
	recoger_alimentos(url);
}
var recoger_alimentos = function (url) 
{
	req_alimentos = new XMLHttpRequest();
	req_alimentos.onreadystatechange = anhadir_alimentos_string;
	req_alimentos.open("GET",url);
	req_alimentos.send(null);
}
var anhadir_alimentos_string = function ()
{
	if ((this.status==200) && (this.readyState==4))
	{
		datos=document.createElement("div");
		datos.innerHTML=this.responseText;
		filas_alimentos=datos.getElementsByTagName("tbody")[1].getElementsByTagName("tr");
		for (var i=0;i<filas_alimentos.length;i++)
		{
			if (filas_alimentos[i].getAttribute("class")!="empty")
			{
				fechas_alimentos.push(filas_alimentos[i].getElementsByTagName("strong")[0].textContent);	//Nombre
				fechas_alimentos.push(filas_alimentos[i].getElementsByTagName("td")[2].textContent);		//Fecha desde
				fechas_alimentos.push(filas_alimentos[i].getElementsByTagName("td")[3].textContent);		//Fecha hasta
				enlaces_imagenes=filas_alimentos[i].getElementsByTagName("a");
				for (var j=0;(j<enlaces_imagenes.length) && (!enlaces_imagenes[j].href.match("venderAgrupado"));j++);
				fechas_alimentos.push(filas_alimentos[i].getElementsByTagName("a")[j].href);
			}
		}
		contador_alimentos++;
		if (contador_alimentos==2)
		{
			rellenar_columnas_comedor();
		}
	}
}
var rellenar_columnas_comedor = function ()
{
	//Los datos están en fechas_alimentos
	//nombre alimento, fecha inicio, fecha fin, enlace javascript para vender
	for (var i=0;i<filas_comedor.length;i++)
	{
		nombre_alimento_comedor = filas_comedor[i].children[1].children[0].textContent.split("\n")[1].trim();
		if ((j=fechas_alimentos.indexOf(nombre_alimento_comedor))!=-1)
		{
			//Si esta en el array
			casilla=document.createElement("td");
			//Calcular dias (Seria util funcion)
			fecha_actual_string=corregir_fecha(fecha_abbatia.trim().split(" ")[0],"-");
			var fecha_actual=new Date(fecha_actual_string);
			fecha_fin_string=corregir_fecha(fechas_alimentos[j+1],"-");
			var fecha_fin=new Date(fecha_fin_string);
			dias=Math.round((fecha_actual.getTime()-fecha_fin.getTime()) / (1000 * 60 * 60 * 24))*(-1);
			//
			if (dias<5) casilla.setAttribute("class","textRightRed");
			else casilla.setAttribute("class","textRight");
			casilla.textContent=fechas_alimentos[j+1];
			filas_comedor[i].appendChild(casilla);
			casilla=document.createElement("td");
			casilla.setAttribute("class","textRight");
			casilla.textContent=fechas_alimentos[j+2];
			filas_comedor[i].appendChild(casilla);
			casilla=document.createElement("td");
			imagen=document.createElement("a");
			imagen.href=fechas_alimentos[j+3];
			imagen.innerHTML="<img border=\"0\" alt=\"Vender\" title=\"Vender\" src=\"/images/iconos/16/vender.jpg\">";
			casilla.appendChild(imagen);
			filas_comedor[i].appendChild(casilla);
		}
	}
}
// FIN FUNCIONES COMEDOR

// FUNCIONES GUARDIAS
var formulario_guardias = function () {
	contenedor_tabla=tabla.parentNode.parentNode;
	if (contenedor_tabla.getElementsByTagName("table").length>1) contenedor_tabla.removeChild(contenedor_tabla.getElementsByTagName("table")[1]);
	guardias_contratar=0;
	if (this.parentNode.textContent.trim() == "Contratar guardias") guardias_contratar=1;
	formulario=document.createElement("table");
	formulario.setAttribute("colspan",1);
	formulario.setAttribute("border",2);
	formulario.setAttribute("width",190);
	formulario.innerHTML=
	"<center><b>"+this.parentNode.textContent.trim()+"</b><br>"+
	"Número de guardias:<font size=1>(1-10)</font>"+
	"<br><input id=\"input_guardias\" type=\"range\" min=\"1\" max=\"10\" step=\"1\" value=\"1\"></input><br>"+
	"<button id=\"boton_guardias\">"+this.parentNode.textContent.trim().split(" ")[0]+" 1 guardia/s</button></center>";
	formulario.getElementsByTagName("input")[0].addEventListener("change",modificado_valor_guardas);
	formulario.getElementsByTagName("button")[0].addEventListener("click",clic_valor_guardas);
	contenedor_tabla.appendChild(formulario);
}
var modificado_valor_guardas = function ()
{
	if (!isNumeric(this.value) || this.value<=0)
	{
		this.value = 1;
	}
	else if (this.value>10) this.value=10;
	else if (!guardias_contratar && this.value>contratados) this.value=1;	//No se si se puede estar sin guardias, como no se ha probado, dejo uno.
	document.getElementById("boton_guardias").textContent=document.getElementById("boton_guardias").textContent.split(" ")[0]+" "+document.getElementById("input_guardias").value+" guardia/s";
}
var clic_valor_guardas = function ()
{
	numero_guardias=parseInt(document.getElementById("input_guardias").value);
	numero_guardias_final=numero_guardias+contratados;
	formulario.innerHTML="<CENTER>Cargando...</CENTER>";
	//Ahora vamos a crear sockets uno a uno
	socket_guardias=false;
	lanzar_socket_guardia();
}
var lanzar_socket_guardia = function ()
{
	if ((socket_guardias!=false) && (socket_guardias.status==200) && (socket_guardias.readyState==4))
	{
		datos=document.createElement("div");
		datos.innerHTML=socket_guardias.responseText;
		if (!isNaN(datos.getElementsByTagName("strong")[0].textContent))
		{
			contratados=parseInt(datos.getElementsByTagName("strong")[0].textContent);
			document.getElementsByTagName("strong")[0].textContent=contratados;
			if (contratados!=numero_guardias_final)
			{
				lanzar_socket_guardia_socket();
			}
			else
			{
				formulario.innerHTML="<CENTER>Finalizado</CENTER>";
			}
		}
		else formulario.innerHTML="<CENTER>Error<BR><a href=\""+url+"\">Ver error</a></CENTER>";
	}
	else if (socket_guardias==false) lanzar_socket_guardia_socket();
}
var lanzar_socket_guardia_socket = function ()
{
	socket_guardias = new XMLHttpRequest();
	if (guardias_contratar) url="contratarGuardia.do?dumy="+contratados;
	else url="despedirGuardia.do?dumy="+contratados;
	socket_guardias.onreadystatechange = lanzar_socket_guardia;
	socket_guardias.open("GET",url);
	socket_guardias.send(null);
}
// FIN FUNCIONES GUARDIAS

// FUNCIONES MONJES
var recoger_stat_y_mostrar = function (objeto,texto) {
	var valor_stat = parseInt(objeto.children[0].getAttribute("title").replace(texto,""));
	objeto.insertBefore(document.createTextNode(valor_stat+" "),objeto.getElementsByTagName("img")[0]);
	return valor_stat;
}
var recoger_dias_monje = function () {
	if ((this.status==200) && this.readyState==4)
	{
		i=array_util.indexOf(this);
		contenedor=document.createElement("div");
		contenedor.innerHTML=this.responseText;
		fecha_actual_string=corregir_fecha(fecha_abbatia.trim().split(" ")[0],"-");
		var fecha_actual=new Date(fecha_actual_string);
		fecha_fin_string=corregir_fecha(contenedor.getElementsByTagName("dd")[3].textContent,"-");
		var fecha_fin=new Date(fecha_fin_string);
		fecha_fin.setFullYear(fecha_fin.getFullYear()+2);
		dias=Math.round((fecha_actual.getTime()-fecha_fin.getTime()) / (1000 * 60 * 60 * 24))*(-1);
		document.getElementsByClassName("nov_flag")[i].setAttribute("alt","D\xEDas para que se convierta en monje: "+dias);
		document.getElementsByClassName("nov_flag")[i].setAttribute("title","D\xEDas para que se convierta en monje: "+dias);
	}
}
var rellenar_dias_noviciado = function () {
	for (var i=0;i<document.getElementsByClassName("nov_flag").length;i++)
	{
		url = document.getElementsByClassName("nov_flag")[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("tfoot")[0].getElementsByTagName("a")[0].href;
		pagina_monje = new XMLHttpRequest();
		array_util.push(pagina_monje);
		pagina_monje.onreadystatechange = recoger_dias_monje;
		pagina_monje.open("GET",url);
		pagina_monje.send(null);
	}
}
// FIN FUNCIONES MONJES

// FUNCIONES GRANJA

var tratar_respuesta_animal = function () {		
	if ((req.status==200) && req.readyState==4)
	{
		datos=document.createElement("div");
		datos.innerHTML=req.responseText;
		tabla1=document.getElementsByTagName("tbody")[1];
		tabla1nueva=datos.getElementsByTagName("tbody")[1];
		tabla2=document.getElementsByTagName("tbody")[2];
		tabla2nueva=datos.getElementsByTagName("tbody")[2];
		master1=tabla1.parentNode;
		master1.appendChild(tabla1nueva);
		master1.removeChild(tabla1);
		master2=tabla2.parentNode;
		master2.appendChild(tabla2nueva);
		master2.removeChild(tabla2);
		crear_tablas_animal(document.getElementsByTagName("tbody")[1]); //Animales
		crear_tablas_animal(document.getElementsByTagName("tbody")[2]); //Aislados
	}
}

var mover_animal_click = function () {
	if (parseInt(this.parentNode.parentNode.children[0].textContent)>=1)
	{
		if ((req!=null) && (req.readyState!=1))
		{
			url = this.getAttribute("enlace").replace("http://www.abbatia.net","")+"&pagesize=1000";
			req.onreadystatechange = tratar_respuesta_animal;
			req.open("GET",url);
			req.send(null);
			this.disabled=true;
		}
	}
}

var crear_tablas_animal = function (tabla) {
	for (var i=0;i<tabla.getElementsByTagName("tr").length;i++)
	{
		//Añadimos botones
		fila=tabla.getElementsByTagName("tr")[i];
		if (fila.getAttribute("class") != "empty")
		{	
			boton=document.createElement("img");
			celda=fila.lastChild;
			botones=celda.getElementsByTagName("img");
			for (j=0;(j<botones.length) && (!botones[j].getAttribute("src").match(/separar/));j++);
			boton.setAttribute("enlace",fila.lastChild.children[j].href);
			botones[j].parentNode.parentNode.removeChild(botones[j].parentNode);
			boton.src="http://www.abbatia.net/images/iconos/16/separar.gif";
			boton.title="Trasladar sin refrescar";
			boton.setAttribute("style","cursor: pointer");
			
			boton.addEventListener('click',mover_animal_click,true);
			fila.lastChild.appendChild(boton);
		}
	}
}
//FIN FUNCIONES GRANJA

//FUNCIONES TU BIBLIOTECA
var cabecera_tu_biblioteca = function (cabecera) {
	enlace=document.createElement("a");
	enlace.href=cabecera.children[0].children[5].children[0].href.replace("-s=5","-s=6").replace("-o=2","-o=1");
	enlace.textContent="Deterioro";
	cabecera.children[0].children[6].setAttribute("class","sortable");
	cabecera.children[0].children[6].textContent="";
	cabecera.children[0].children[6].appendChild(enlace);
}
var crear_tablas_tu_biblioteca = function (tabla) {
	for (var i=0;i<tabla.getElementsByTagName("tr").length;i++)
	{
		//Añadimos botones
		fila=tabla.getElementsByTagName("tr")[i];
		if ((fila.getAttribute("class") != "empty") && (fila.lastChild.getElementsByTagName("a").length>0))
		{
			for (var j=0;j<fila.lastChild.getElementsByTagName("a").length;j++)
			{
				boton=fila.lastChild.getElementsByTagName("a")[j];
				if (boton.href.match(/restaurarLibro.do/)||boton.href.match(/cancelarRestauracionLibro.do/))
				{
					imagen_restaurar=boton.children[0];
					boton.removeChild(imagen_restaurar);
					contenedor=boton.parentNode;
					contenedor.removeChild(boton);
					imagen_restaurar.setAttribute("style","cursor: pointer");
					imagen_restaurar.setAttribute("enlace",boton.href+"&"+document.URL.split("?")[1]);
					imagen_restaurar.addEventListener('click',restaurar_libro,true);
					contenedor.appendChild(imagen_restaurar);
				}
			}
		}
	}
}
var restaurar_libro = function () {
	if (parseInt(this.parentNode.parentNode.children[0].textContent)>=1)
	{
		if ((req!=null) && (req.readyState!=1))
		{
			url = this.getAttribute("enlace").replace("http://www.abbatia.net","")+"&pagesize=1000";
			req.onreadystatechange = tratar_respuesta_libro;
			req.open("GET",url);
			req.send(null);
			this.disabled=true;
		}
	}
}
var tratar_respuesta_libro = function () {		
	if ((req.status==200) && req.readyState==4)
	{
		datos=document.createElement("div");
		datos.innerHTML=req.responseText;
		tabla1=document.getElementsByTagName("tbody")[1];
		tabla1nueva=datos.getElementsByTagName("tbody")[1];
		master1=tabla1.parentNode;
		master1.appendChild(tabla1nueva);
		master1.removeChild(tabla1);
		crear_tablas_tu_biblioteca(document.getElementsByTagName("tbody")[1]); //Animales
	}
}

//FIN FUNCIONES TU BIBLIOTECA
//FUNCIONES "Copias en otras bibliotecas"
columna_restante = function ()
{
	//Añadimos nueva columna
	tabla=tabla_completa.getElementsByTagName("tbody")[0];
	filas = tabla.children;
	if (filas[0].getAttribute("class")!="empty")
	{
		cabecera=tabla_completa.getElementsByTagName("thead")[0].children[0];
		cab_restante=document.createElement("th");
		cab_restante.textContent="Restante (D\xEDas)";
		cabecera.insertBefore(cab_restante,cabecera.lastChild);
		for (var i=0;i<filas.length;i++)
		{
			cas_restante=document.createElement("td");
			cas_restante.textContent="...";
			filas[i].insertBefore(cas_restante,filas[i].lastChild);
		}
		//Recogemos enlaces monjes
		url = "http://www.abbatia.net/listarMonjes.do";
		recoger_monjes = new XMLHttpRequest();
		recoger_monjes.onreadystatechange = recoger_array_monjes;
		recoger_monjes.open("GET",url);
		recoger_monjes.send(null);
	}
}

recoger_array_monjes = function () 
{
	if ((this.status==200) && this.readyState==4)
	{
		datos=document.createElement("div");
		datos.innerHTML=this.responseText;
		fichas = datos.getElementsByTagName("table");
		for (var i=0;i<fichas.length;i++)
		{
			ficha=fichas[i];
			if (ficha.getElementsByTagName("img").length>=8)
			{
			array_monjes.push(ficha.getElementsByTagName("th")[0].textContent.trim());
			array_monjes.push(ficha.getElementsByTagName("a")[1].href);
			array_monjes.push(-1);	//Tareas
			array_monjes.push(parseInt(ficha.getElementsByTagName("img")[3].alt.split(":")[1]));	//Talento
			array_monjes.push(parseInt(ficha.getElementsByTagName("img")[7].alt.split(":")[1]));	//Destreza
			array_monjes.push(parseInt(ficha.getElementsByTagName("img")[2].alt.split(":")[1]));	//Idiomas
			array_monjes.push(parseInt(ficha.getElementsByTagName("img")[1].alt.split(":")[1]));	//Fe
			array_monjes.push(-1);	//Extranjero? (1=si;0=no);
			}
		}
		hacer_request_libro();
	}

}
var hacer_request_libro = function ()
{
	//Ahora crearemos la request para cada libro, para ello debemos entrar en el Detalle de cada uno (Y ver si coinciden o no los idiomas).
	//tabla_completa=document.getElementsByTagName("table")[1];
	tabla=tabla_completa.getElementsByTagName("tbody")[0];
	filas=tabla.children;
	for (var i=0;i<filas.length;i++)
	{
		if (filas[i].getAttribute("class") != "empty")
		{
			//Buscar ojo
			casilla=filas[i].lastChild;
			for (var j=0;(j<casilla.getElementsByTagName("img").length)&&(casilla.getElementsByTagName("img")[j].alt!="Detalles del libro");j++);
			url = filas[i].lastChild.getElementsByTagName("img")[j].parentNode.href;
			detalle_libro = new XMLHttpRequest();
			array_util.push(detalle_libro);
			detalle_libro.onreadystatechange = recoger_detalle_libro;
			detalle_libro.open("GET",url);
			detalle_libro.send(null);
		}
	}


}

var recoger_detalle_libro = function ()
{
	if ((this.status==200) && this.readyState==4)
	{
		datos=document.createElement("div");
		datos.innerHTML=this.responseText;
		//Buscamos primera fila donde salga monje.
		tabla=datos.getElementsByTagName("tbody")[datos.getElementsByTagName("tbody").length-1];
		for (j=8;(tabla.getElementsByTagName("td")[j].textContent.trim()=="sin asignar")&&(j<=29);j+=7);
		nombre_monje = tabla.getElementsByTagName("td")[j].textContent.trim();
		//Asignamos numero tareas
		i = array_monjes.indexOf(nombre_monje);
		tareas_num=0;
		tareas_img=tabla.getElementsByTagName("img");
		for (var j=0;j<tareas_img.length;j++)
		{
			if (tareas_img[j].getAttribute("alt").match(/copiadas/)) tareas_num++;
		}
		array_monjes[i+2]=tareas_num;	//Recogemos numero de tareas.
		if (datos.getElementsByTagName("td")[10].textContent.trim() == tabla.getElementsByTagName("td")[j+4].textContent.trim()) array_monjes[i+7]=0; //Mismo idioma
		else array_monjes[i+7]=1; //Traduciendo
		//Ya tenemos los datos que necesitamos.
		modificar_tabla_copiar();
	}	
}
var modificar_tabla_copiar = function ()
{
	tabla=tabla_completa.getElementsByTagName("tbody")[0];
	for (var z=0;z<tabla_completa.getElementsByTagName("thead")[0].children[0].children.length && tabla_completa.getElementsByTagName("thead")[0].children[0].children[z].textContent.trim()!="Monje Copiando";z++);
	filas=tabla.getElementsByTagName("tr");
	for (var k=0;k<filas.length;k++)
	{
		fila=filas[k];
		cas_restante=fila.children[fila.children.length-2];
		if (fila.children[z].getElementsByTagName("strong").length>0)
		{
			nombre_monje=fila.children[z].textContent.split("\n")[1].trim();
		}
		else
		{
			nombre_monje=fila.children[z].textContent;
		}
		j=array_monjes.indexOf(nombre_monje);
		tareas=array_monjes[j+2]; //Tareas
		talento=array_monjes[j+3]; //Talento
		destreza=array_monjes[j+4];
		idioma=array_monjes[j+5];
		fe=array_monjes[j+6];
		flag_traduciendo=array_monjes[j+7];
		if (flag_traduciendo==1)
		{
			hojas_dia=(fe/100)*(talento/100+destreza/100+idioma/100)/6*tareas;
		}
		else
		{
			hojas_dia=(fe/100)*(talento/99+destreza/99+1)/6*tareas;
		}
		hojas_restantes_texto=cas_restante.parentNode.getElementsByTagName("img")[0].alt;
		hojas_restantes=parseInt(hojas_restantes_texto.split(" ")[4])-parseInt(hojas_restantes_texto.split(" ")[0]);
		cas_restante.textContent=Math.round(hojas_restantes/hojas_dia*100)/100;
		cas_restante.setAttribute("title",tareas+" Tareas");
	}
}



//FIN FUNCIONES "Copias en otras bibliotecas"

var pagina_actual = (recoger_pagina(document.location.href));
if (pagina_actual=="listarMonjes.do")
{
	//Modificamos altura de las fichas.
	fila_iconos = new Array;
	var fichas = document.getElementsByTagName("tbody");
	for (var i=0;i<fichas.length;i++)
	{
		fila_iconos[i]=fichas[i].appendChild(document.createElement("tr"));
		fila_iconos[i].setAttribute("class","content");
		fila_iconos[i].appendChild(document.createElement("td"));
		fila_iconos[i].children[0].appendChild(document.createElement("center"));
		fila_iconos[i]=fila_iconos[i].children[0].children[0];
	}
	//Datos numéricos, iremos ficha por ficha:
	var fichas=document.getElementsByTagName("table");
	for (var j=0;j<fichas.length;j++)
	{
		var ficha = fichas[j];
		enfermo=ficha.getElementsByTagName("th")[0].getElementsByTagName("img");
		if (enfermo.length>0 && enfermo[0].getAttribute("src").match(/enfermo/)) enfermo[0].setAttribute("height","9");
		var campos=ficha.getElementsByTagName("dt");
		for (var i=0;i<campos.length;i++)
		{
			campo=campos[i];
			if (campo.textContent == "Salud: ")	var salud = recoger_stat_y_mostrar(campo,"Salud:");
			else if (campo.textContent == "I: ") var idioma = recoger_stat_y_mostrar(campo,"Idioma:");
			else if (campo.textContent == "C: ") var carisma = recoger_stat_y_mostrar(campo,"Carisma:");
			else if (campo.textContent == "F: ") var fuerza = recoger_stat_y_mostrar(campo,"Fuerza:");
		}
		var campos=ficha.getElementsByTagName("dd");
		for (var i=0;i<campos.length;i++)
		{
			campo=campos[i];
			if (parseInt(campo.textContent) > 0) var edad = parseInt(campo.textContent);
			else if (campo.textContent == "Fe: ") var fe = recoger_stat_y_mostrar(campo,"Fe:");
			else if (campo.textContent == "T: ") var talento = recoger_stat_y_mostrar(campo,"Talento:");
			else if (campo.textContent == "S: ") var sabiduria = recoger_stat_y_mostrar(campo,"Sabidur\xEDa:");
			else if (campo.textContent == "D: ") var destreza = recoger_stat_y_mostrar(campo,"Destreza:");
		}
		//Ahora vemos iconos para añadir
		
		//Profesor
		if ((idioma*fe/100>50)||(fuerza*fe/100>50)||(talento*fe/100>50)||(sabiduria*fe/100>50)||(destreza*fe/100>50))
		{
			icono=document.createElement("img");
			var puntuacion_profesor = Math.round(((idioma*fe/100>50)*(idioma*fe/100-50)+(fuerza*fe/100>50)*(fuerza*fe/100-50)+(talento*fe/100>50)*(talento*fe/100-50)+(sabiduria*fe/100>50)*(sabiduria*fe/100-50)+(destreza*fe/100>50)*(destreza*fe/100-50))*100/219.3);
			icono.setAttribute("alt","Profesor, puntos: "+puntuacion_profesor+"/100");
			icono.setAttribute("title","Profesor, puntos: "+puntuacion_profesor+"/100");
			icono.setAttribute("src","http://images2.wikia.nocookie.net/abbatia/es/images/4/41/Profesor.gif");
			fila_iconos[j].appendChild(icono);
		}
		//Copista
		if ((talento>=30) && (destreza>=30) && (talento+destreza>80))
		{
			icono=document.createElement("img");
			var puntuacion_copista=Math.round((talento+destreza-80)*100/118*100)/100;
			icono.setAttribute("alt","Copista, puntos: "+puntuacion_copista+"/100");
			icono.setAttribute("title","Copista, puntos: "+puntuacion_copista+"/100");
			icono.setAttribute("src","http://www.abbatia.net/images/iconos/16/copiar.gif");
			fila_iconos[j].appendChild(icono);
			//De exterior
			if (idioma>=65)
			{
				icono=document.createElement("img");
				icono.setAttribute("alt","Copista a exterior, puntos: "+(Math.round(((idioma-64)*100/35)*100)/100)+"/100");
				icono.setAttribute("title","Copista a exterior, puntos: "+(Math.round((idioma-64)*100/35*100)/100)+"/100");
				icono.setAttribute("src","http://www.abbatia.net/images/iconos/16/subirnivel.gif");
				fila_iconos[j].appendChild(icono);
			}
		}
		//Medico
		if ((0.5*sabiduria+0.3*talento+0.2*destreza)*fe/100>50)
		{
			icono=document.createElement("img");
			var puntuacion_medico = Math.round(((0.5*sabiduria+0.3*talento+0.2*destreza)*fe/100-50)*10000/44.05)/100;
			icono.setAttribute("alt","M\xE9dico, puntos: "+puntuacion_medico+"/100");
			icono.setAttribute("title","M\xE9dico, puntos: "+puntuacion_medico+"/100");
			icono.setAttribute("src","http://images2.wikia.nocookie.net/abbatia/es/images/7/7a/Red_cross.gif");
			fila_iconos[j].appendChild(icono);
		}
	}
	//Tiempo de novicios
	novicios=document.getElementsByClassName("novicio");
	for (var i=0;i<novicios.length;i++)
	{
		tabla=novicios[i].parentNode.parentNode.parentNode;
		contenedor=tabla.getElementsByClassName("content")[tabla.getElementsByClassName("content").length-1].children[0].children[0];
		flag_novicio = document.createElement("IMG");
		flag_novicio.src="http://images3.wikia.nocookie.net/abbatia/es/images/8/83/Reloj_arena_oscuro_tr.png";
		flag_novicio.setAttribute("alt","Recogiendo datos...");
		flag_novicio.setAttribute("title","Recogiendo datos...");
		flag_novicio.setAttribute("class","nov_flag");
		contenedor.appendChild(flag_novicio);
	}
	if (novicios.length>0)
	{
		rellenar_dias_noviciado();
	}
}
else if (pagina_actual=="main.do")
{
	tabla_poblacion=document.getElementsByClassName("floatLeft column")[1];
	listas = tabla_poblacion.getElementsByTagName("ul");
	var total_poblacion=listas[0].childElementCount-listas[1].childElementCount;
	for (var i=1;i<=3;i++)
	{
		total_poblacion+=listas[i].childElementCount;
		tabla_poblacion.insertBefore(document.createTextNode("Total: "+listas[i].childElementCount),listas[i]);
	}
	tabla_poblacion.insertBefore(document.createTextNode("Monjes propios: "+total_poblacion),tabla_poblacion.children[1]);
	
	//Recogemos enlaces para edificios
	tabla_edificios=document.getElementsByClassName("floatLeft column")[2];
	enlaces=tabla_edificios.getElementsByTagName("a");
	string_edificios = "";
	for (var i=0;i<enlaces.length;i++) {
		string_edificios += enlaces[i].textContent.split("(")[0].trim()+"|";
		string_edificios += enlaces[i].href+"|";
	}
	GM_setValue("edificios",string_edificios);
}
else if ((pagina_actual=="listarEdificios.do")||(pagina_actual=="crear_edificio.do"))
{
	edificios = document.getElementsByTagName("table");
	var nombre = "";
	for (var i=0;i<edificios.length;i++)
	{
		edificio = edificios[i];
		//Link de wikia
		link = document.createElement("a");
		nombre = edificio.getElementsByTagName("th")[0].textContent.replace("/","-");
		//Excepciones
		if (nombre=="Taller de costura - Sastrer\xEDa") nombre = "Taller_de_costura";
		else if (nombre=="Campos de cultivo - huerta") nombre = "Campo_de_cultivo_-_Huerta";
		else if (nombre=="Taller de Artesan\xEDa") nombre = "Taller_de_artesan%C3%ADa";
		link.setAttribute("href","http://es.abbatia.wikia.com/wiki/"+nombre);
		link.textContent="(Wikia)";
		link.setAttribute("title","Ver en wikia");
		link.setAttribute("target","_blank");
		edificio.children[2].children[0].children[0].appendChild(link);
	}
}
if (document.getElementsByTagName("h6").length>0)
{
	pagina_actual=document.getElementsByTagName("h6")[0].textContent;
	if (pagina_actual=="Granja" && document.URL.match(/mostrarEdificio.do/))
	{
		//Granja
		if (document.getElementsByClassName("three")[0].children[0].textContent=="Paginaci\xF3n")
		{
			crear_tablas_animal(document.getElementsByTagName("tbody")[1]); //Animales
			crear_tablas_animal(document.getElementsByTagName("tbody")[2]); //Aislados
		}
		else
		{
			if (document.getElementsByClassName("three")[0].children[0].textContent=="Mostrar Todos")
			{
				estrella=document.createElement("img");
				estrella.src="http://images3.wikia.nocookie.net/abbatia/es/images/2/2e/Star.png";
				document.getElementsByClassName("three")[0].appendChild(estrella);
			}
		}
	}
	
	else if (pagina_actual=="Biblioteca")
	{
		//"Tu biblioteca".
		if (document.getElementById("selected").children[0].textContent=="Tu Biblioteca" && document.getElementById("edificio_biblioteca_local"))
		{
			cabecera_tu_biblioteca(document.getElementsByTagName("thead")[0]);
			
			tabla_completa=document.getElementById("edificio_biblioteca_local_copias");
			columna_restante();
			
			//Mostrar todos, obligatorio
			if (document.URL.match(/pagesize=1000/)) 
			{
				//Mostrando todos
				crear_tablas_tu_biblioteca(document.getElementsByTagName("tbody")[1]);
			}
			else if (document.URL.match("mostrarEdificio.do"))
			{
				if (document.URL.split("?").length>1) document.location.href += "&pagesize=1000";
				else document.location.href += "?pagesize=1000";
			}
		}
		//"Copias en otras bibliotecas"
		else if (document.getElementById("selected").children[0].textContent=="Copias en otras Bibliotecas"  && document.getElementById("edificio_biblioteca_copiando"))
		{
			tabla_completa=document.getElementById("edificio_biblioteca_copiando");
			columna_restante();
		}
	}
	//Comedor
	else if (pagina_actual=="Comedor")
	{
		function venderAgrupado(p_ProductoId, p_MercTipo)
		{
			openPopupIFrame('/mercado_vender_agrupado_inicio.do?lid=' + p_ProductoId + '&merc=' + p_MercTipo,700,450,"VentaProductoAgrupado");
		}
		//Creamos las nuevas columnas
		tabla_completa_comedor = document.getElementById("edificio_comedor");
		cabecera_comedor = tabla_completa_comedor.getElementsByTagName("thead")[0].children[0]; //Tr de cabecera
		filas_comedor = tabla_completa_comedor.getElementsByTagName("tbody")[0].getElementsByTagName("tr"); //Guardamos cada fila
		columna=document.createElement("th");
		columna.textContent="Caducidad desde";
		cabecera_comedor.appendChild(columna);
		columna=document.createElement("th");
		columna.textContent="Caducidad hasta";
		cabecera_comedor.appendChild(columna);
		columna=document.createElement("th");
		columna.textContent="Opciones";
		cabecera_comedor.appendChild(columna);		
		//Guardaremos cada alimento y sus fechas en array_util
		recoger_fechas_cocina();
	}
}
else if (pagina_actual=="cabecera.do")
{
	enlace=document.createElement("a");
	enlace.href="http://userscripts.org/scripts/show/111435";
	enlace.textContent="Abbatia-ES";
	enlace.target="_blank";
	document.getElementsByTagName("form")[0].appendChild(enlace);
	recoger_fecha();
}
else if (pagina_actual=="gestionGuardias.do")
{
	contratados=parseInt(document.getElementsByTagName("strong")[0].textContent);
	tabla=document.getElementsByClassName("menu")[0].parentNode.parentNode;
	//Quitamos algunas llamadas a funciones no definidas
	tabla.parentNode.removeAttribute("onmouseover");
	tabla.parentNode.removeAttribute("onmousedown");
	tabla.parentNode.removeAttribute("onmouseout");
	tabla.parentNode.removeAttribute("onmouseup");
	tabla.getElementsByTagName("a")[0].lastChild.textContent="Contratar guardias";
	tabla.getElementsByTagName("a")[1].lastChild.textContent="Despedir guardias";
	//Quitamos enlaces
	for (var i=1;i>=0;i--) 
	{
		celda=tabla.getElementsByTagName("img")[i].parentNode;
		celda.parentNode.innerHTML=celda.innerHTML;
		tabla.getElementsByTagName("img")[i].setAttribute("style","cursor: pointer");
		tabla.getElementsByTagName("img")[i].addEventListener('click',formulario_guardias,true);
	}
}