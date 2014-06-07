// ==UserScript==
// @name        Mejoras Editor Wiki Fiuba
// @namespace   http://localhost
// @description Importación automatica de templates, asistente de links a páginas nuevas
// @include     http://wiki.foros-fiuba.com.ar/*
// @version     0.12
// @grant       GM_log
// @grant       GM_addStyle
// ==/UserScript==

/*
Todo lo relativo al asistente de links a páginas nuevas está pendiente. Un día de estos lo termino (?)
Hay muchas cosas por revisar, y probar. En un caso acotado de pruebas funcionó bien sobre Firefox 22 @ Win7-x64.

Hay un par de negradas en el código, no se por qué Javascript me odia y me complica acceder a métodos dentro
de otros métodos de una clase cuando hago: this.otroMetodo() Seguramente es una tontería porque que estoy muy quemando.

Bajo licencia GNU, para la pipol de FIUBA :)
*/


/*********Funciones Auxiliares*********/
formatoDosDigitos = function (x){ return (x>=0&&x<10)?"0"+String(x):String(x)}
/**************************************/
isEditPage = function(){
	//Verifica si estoy en modo de edición, y por ende, si hay que correr este script.
	
    //Como no puedo valerme de la URL para saber si estoy o no en modo edición, hago esto.
    return document.getElementById("tool__bar") != null;
}

articleMetadata = function(){
    //Atributos
    this.tipoExamen = "(Final|Parcial|Parcialito|Sarasasasa)";
    this.fecha = undefined;
    this.tema = "";
    this.codigoMateria = "XX.XX";
    this.nombreMateria = "*Nombre de la materia*"; //¿De donde sacamos esto? Por ahora pidámosle al usuario
    this.catedra = "*Nombre de la cátedra*";
	this.nro_catedra = 1;
    this.nro_oportunidad = 1;
    this.periodo = undefined;
	
	this.periodos = {primerCuat: 1, segundoCuat:2, verano:3, invierno:4};
	this.str_periodos = ['','1º Cuatrimestre', '2º Cuatrimestre', 'Verano', 'Invierno'];
	return this;
 }   

 //Métodos
articleMetadata.prototype.printTemplate = function(){

	//Reemplaza los campos del template con la información de data
	var template = "====== Examen TIPO_EXAMEN - CODIGO_MATERIA. NOMBRE_MATERIA - FECHA ======\n\n**Cátedra:** CATEDRA\\\\ \n**Fecha:** NRO_OPORTUNIDAD Oportunidad - PERIODO AÑO\\\\ \n**Día:** FECHA\n\n<note important>\nEsta página está incompleta; podés ayudar completando el material.\n</note>\n\n===== Enunciado =====\n\n<!-- ==== Punto I ==== ... -->\n\n===== Resolución =====\n\n<!-- ==== Punto I ==== ... -->\n\n===== Discusión =====\n\n<note warning>\nSi ves algo que te parece incorrecto en la resolución y no te animás a cambiarlo, dejá tu comentario acá.\n</note>"
	
	var reemplazos=new Array();
	reemplazos["TIPO_EXAMEN"]=this.tipoExamen;
	reemplazos["CODIGO_MATERIA"]=this.codigoMateria;
	reemplazos["NOMBRE_MATERIA"]=this.nombreMateria;
	reemplazos["FECHA"]=this.getFechaStr();
	reemplazos["CATEDRA"]=this.catedra;
	reemplazos["NRO_OPORTUNIDAD"]=(this.nro_oportunidad>0&&this.nro_oportunidad<=5)?(new Array("Primer","Segunda","Tercer","Cuarta","Quinta"))[this.nro_oportunidad-1]:String(this.nro_oportunidad)+"º";
	reemplazos["PERIODO"]=this.str_periodos[this.periodo];
	reemplazos["AÑO"]=this.fecha.getFullYear();
	reemplazos["TEMA"]=this.tema; //El tema no está contemplado en el template.
	
	for (var i in reemplazos){
		template = template.replace(eval("/"+i+"/g"),reemplazos[i]);
	}
	
	return template;
}
	
articleMetadata.prototype.loadPageMetadata = function(){
	GM_log("Entrando a función loadPageMetadata");
	//Cargo toda la información que pueda.
	var claves = document.URL.split("/").reverse();
	var data = null;
	for (var i in claves){
		if (claves[i].indexOf("materias")!=-1){
			data = claves[i];
			break;
		}
	}
	
	if (data == null)
		return;
	
	
	var tokensDosPuntos = data.split(':');
	this.codigoMateria = tokensDosPuntos[1]+'.'+tokensDosPuntos[2];
	GM_log('cod:' + this.codigoMateria);
	var tokensGuion = tokensDosPuntos[tokensDosPuntos.length-1].split('_');
	
	//Tipo de exámen
	var str = tokensGuion[0].toLowerCase();
	if(str.indexOf("final")!= -1)
		this.tipoExamen="Final";
	else if(str.indexOf("parcialito")!= -1)
		this.tipoExamen="Parcialito";
	else if(str.indexOf("parcial")!= -1)
		this.tipoExamen="Parcial";
	else
		this.tipoExamen="Parcial (?)";
	
	
	GM_log("tipo: "+tokensGuion[0]+"->"+this.tipoExamen);
	//Hay dos tipos de formatos distintos: materias:XX:XX:(parcial|final|sarasa)_#catedra_yyyymmdd_#art
	//y lo mismo pero sin el numero de cátedra. Hay que ver que caso es
	
	if (tokensGuion.length == 4){
		this.nro_catedra = tokensGuion[1];
		GM_log("nro_catedra: "+tokensGuion[1]);
	}
	for (var j in tokensGuion){
		if (tokensGuion[j].length == 8 && !isNaN(tokensGuion[j])){ //La fecha
			var año=Math.floor(tokensGuion[j].substr(0,4));
			var mes=Math.floor(tokensGuion[j].substr(4,2));
			var dia=Math.floor(tokensGuion[j].substr(6,2));
			
			this.fecha = new Date(año, mes, dia);
			GM_log("aaaammdd:" + tokensGuion[j] +"->"+this.fecha);
			break;
		}
	}
	this.processData();
	return;
	
}
	
articleMetadata.prototype.processData = function(){
	GM_log("procesarData");
	
	//Hay que generar el nombre de materia y el período
	//this.nombreMateria = ""; //A futuro: obtener el nombre desde el código de materia
	
	//Obtengo el peridodo: Xº Cuatrimestre|Verano|Invierno
	if (this.tipoExamen = "Final"){
		this.periodo = (this.fecha.getMonth() > 3 && this.fecha.getMonth() < 9)? this.periodos.invierno:this.periodos.verano;
	}else{
		this.periodo = (this.fecha.getMonth() < 8)? this.periodos.primerCuat:this.periodos.segundoCuat;
	}
	GM_log("periodo: "+this.periodo);
}

articleMetadata.prototype.getFechaStr = function(){
	return isNaN(this.fecha.getTime())?"dd/mm/aaaa":(formatoDosDigitos(this.fecha.getDate()) + '/' + formatoDosDigitos(this.fecha.getMonth()==0?12:this.fecha.getMonth()) + '/' + this.fecha.getFullYear());
}

articleMetadata.prototype.setFechaStr = function(str){
	//Formato DD/MM/AAAA
	var data = str.split('/');
	this.fecha = new Date(data[2], data[1], data[0]);
	return this;
}

articleMetadata.prototype.setTipoExamen = function(value,str){
	//Recibe Final=1|Parcial=2|Parcialito=3|Otro=4 y el texto de "Especifique" y devuelve el string correspondiente
	var s= this.tipoExamen;
	this.tipoExamen = (new Array(str, "Final", "Parcial", "Parcialito"))[value];
	return this;
}

articleMetadata.prototype.getTipoExamenValue = function(){
	var examenArray=new Array();
	examenArray["Final"]=1;
	examenArray["Parcial"]=2;
	examenArray["Parcialito"]=3;
	return (examenArray[this.tipoExamen]==undefined)?0:examenArray[this.tipoExamen];
}

insertTemplate = function(){
    //Veo de obtener todos los datos que pueda
	var data = new articleMetadata()
    data.loadPageMetadata();
    
    //Le pido al usuario que confirme que está todo OK.
    data = templateWiz.confirmData(data);
    
    //Agarra el template correspondiente, reemplaza todo
    var text = data.printTemplate();
    document.getElementById("wiki__text").value += text;
}

addCSS = function() {
	GM_log("Entrando a función addCSS()");
	
	GM_addStyle('\
.myWindow label{\
	width: 100px;\
	display: block;\
	float:left;\
	padding:2px;\
	margin:2px;\
	cursor:pointer;\
	text-align: left;\
}\
\
.myWindow form{\
	display:block;\
	padding:2px;\
}\
\
.myWindow fieldset{\
	display: block;\
}\
\
.formPair{\
	overflow:auto;\
}\
\
.myWindow input[type=text], select{\
	width:180px;\
	display:block;\
	float: none;\
}\
\
.myWindow{\
	z-index: 100001;\
	position:absolute;\
	display:block;\
	z-index:99;\
	width:300px;\
	height:250px;\
	padding:0;\
	margin:0;\
	border:1px solid #8cacbb;\
	background-color:#f5f5f5;\
	text-align:center;\
}\
\
.myWindow_content{\
	display:block;\
	background-color:#f5f5f5;\
	text-align:center;\
}\
\
.myWindow_header{\
	background-color:#dee7ec;\
	height:16px;\
	margin-bottom:5px;\
}\
\
.myWindow_close{\
	cursor:pointer;\
	margin:0;\
}\
\
\
.myWindow_fondo{\
	display:block;\
	z-index: 100000;\
	position: absolute;\
	height: 300%;\
	width: 100%;\
	top: 0px;\
	left: 0px;\
	background-color:#101010;\
	opacity: 0.7;\
}\
	');
	
	GM_log("Saliendo de función addCSS()");
}

var newPageWiz = {};
newPageWiz.injectNewPageForm = function(){
	GM_log("Entrando a función newPageWiz.injectNewPageForm()");

	var my_div = document.createElement('div');
	my_div.innerHTML = '\
	<div id="newPageWiz" class="dokuwiki picker myWindow" style="top: 113px; left: 275px; margin-left: 0px; margin-top: 0px; position: absolute; display:none; height:auto; width:auto;">\
      <div class="myWindow_header" id="newPageWiz_header">\
        <img src="/lib/images/close.png" alt="" id="newPageWiz_close" class=myWindow_close" height="16" align="right" width="16"/>\
		Enlace a examen nuevo\
	  </div>\
      <div id="newPageWiz_addTemplateDiv" class="myWindow_content">\
        <form id="newPageWiz_addTemplateForm" method="post" action="">\
        <fieldset>\
          <legend>Datos del Examen</legend>\
          <div class="formPair">\
          <label for="newPageWiz_examen">Tipo</label> \
          <select name="newPageWiz_examen" id="newPageWiz_examen" value="1">\
            <option value="1">Final</option>\
            <option value="2">Parcial</option>\
            <option value="3">Parcialito</option>\
            <option value="0">Otro (especificar)</option>\
          </select></div>\
          <div id="newPageWiz_examen2Container" class="formPair" style="display:none">\
          <label for="newPageWiz_examen2">Especifique</label> \
          <input name="newPageWiz_examen2" type="text" id="newPageWiz_examen2" value="Especifique tipo de examen" /></div>\
          <div class="formPair">\
          <label for="newPageWiz_fecha">Fecha</label> \
          <input name="fecha" type="text" id="fecha" value="dd/mm/aaaa" /></div>\
        </fieldset>\
        <input type="button" class="button" value="Insertar enlace" id="newPageWiz_submit" /> \
      </div>\
    </div>\
	';
	
	//Agarro el html, lo convierto en un objeto DOM, lo agrego al documento principal.
	document.getElementsByClassName('toolbar')[0].parentNode.appendChild(my_div);

	//Tengo la ventanita añadida al documento, hay que agregarle algunos eventos
	
	//Campo "Especifique" que aparece solo cuando se selecciona "Otros" en la lista desplegable
	document.getElementById('newPageWiz_examen2Container').refreshDisplay = function(){
		return this.style.display=(document.getElementById("newPageWiz_examen").value==0)?'block':'none';
	}
	document.getElementById('newPageWiz_examen').addEventListener('change',document.getElementById('newPageWiz_examen2Container').refreshDisplay, false);
	document.getElementById('newPageWiz_examen2Container').refreshDisplay(); //Ejecuto esto para que se configure
	
	//Funcionalidad del botón X para cerrar
	document.getElementById('newPageWiz_close').addEventListener('click',newPageWiz.close, false);
	
	//Funcionalidad del boton enviar
	document.getElementById('newPageWiz_submit').addEventListener('click', newPageWiz.submit, false);
	
	
	GM_log("Saliendo de función newPageWiz.injectNewPageForm()");
	return my_div;
}

newPageWiz.open = function(){
	document.getElementById('newPageWiz').style.display='block';
	GM_log('end open()');
}
		
newPageWiz.close = function(){
	document.getElementById('newPageWiz').style.display='none';
	GM_log('end close()');
}

var templateWiz = {
	data: null
};
templateWiz.injectTemplateForm = function(){
	GM_log("Entrando a función injectTemplateForm()");

	var my_div = document.createElement('div');
	my_div.innerHTML = '\
<div id="templateWiz_fondo">\
   <div class="myWindow_fondo"></div>\
   <div id="templateWiz" class="dokuwiki picker myWindow" style="top: 113px; left: 275px; margin-left: 0px; margin-top: 0px; position: absolute; width: auto; height:auto; z-index:9999999">\
      <div class="myWindow_header" id="templateWiz_header">\
        <img src="/lib/images/close.png" alt="" class="myWindow_close" id="templateWiz_close" height="16" align="right" width="16"/>\
		Insertar plantilla de examen\
	  </div>\
      <div id="templateWiz_addTemplateDiv" class="myWindow_content">\
        <form id="templateWiz_addTemplateForm" method="post" action="">\
        <fieldset>\
          <legend>Datos del Examen</legend>\
          <div class="formPair">\
          <label for="templateWiz_examen">Tipo</label> \
          <select name="templateWiz_examen" id="templateWiz_examen" value="1">\
            <option value="1">Final</option>\
            <option value="2">Parcial</option>\
            <option value="3">Parcialito</option>\
            <option value="0">Otro (especificar)</option>\
          </select></div>\
          <div id="templateWiz_examen2Container" class="formPair" style="display:none">\
          <label for="templateWiz_examen2">Especifique</label> \
          <input name="templateWiz_examen2" type="text" id="templateWiz_examen2" value="Especifique tipo de examen" /></div>\
          <div class="formPair">\
          <label for="templateWiz_fecha">Fecha</label> \
          <input name="templateWiz_fecha" type="text" id="templateWiz_fecha" value="dd/mm/aaaa" /></div>\
          <div class="formPair">\
          <label for="templateWiz_oportunidad">Oportunidad</label> \
          <input type="text" name="templateWiz_oportunidad" id="templateWiz_oportunidad" value="1" /></div>\
		  <div class="formPair">\
          <label for="templateWiz_tema">Tema</label> \
          <input type="text" name="templateWiz_tema" id="templateWiz_tema" value="1" /></div>\
        </fieldset>\
        <fieldset>\
          <legend>Datos de la Materia</legend>\
          <div class="formPair">\
          <label for="templateWiz_codigo">Código</label> \
          <input type="text" name="templateWiz_codigo" id="templateWiz_codigo" value="XX.XX" /></div>\
          <div class="formPair">\
          <label for="templateWiz_nombreMateria">Nombre</label> \
          <input type="text" name="templateWiz_nombreMateria" id="templateWiz_nombreMateria" /></div>\
          <div class="formPair">\
          <label for="templateWiz_catedra">Cátedra</label> \
          <input type="text" name="templateWiz_catedra" id="templateWiz_catedra" value="Todas" /></div>\
        </fieldset>\
        <input type="button" class="button" value="Insertar Plantilla" id="templateWiz_submit" /> \
		<input type="button" class="button" value="Cancelar" id="templateWiz_cancel" /> \
      </div>\
    </div>\
</div>\
	';
	document.body.appendChild(my_div);
	
	//Campo "Especifique" que aparece solo cuando se selecciona "Otros" en la lista desplegable
	document.getElementById('templateWiz_examen').addEventListener('change',templateWiz.refreshDisplay, false);
	templateWiz.refreshDisplay(); //Ejecuto esto para que se configure
	
	//Funcionalidad del botón X para cerrar
	document.getElementById('templateWiz_close').addEventListener('click', templateWiz.close, false);
	
	//Funcionalidad de los botones
	document.getElementById('templateWiz_submit').addEventListener('click', templateWiz.submit, false);
	document.getElementById('templateWiz_cancel').addEventListener('click', templateWiz.close, false);
	
	GM_log("Saliendo de función injectTemplateForm()");
	return my_div;
}

templateWiz.refreshDisplay = function(){
		document.getElementById('templateWiz_examen2Container').style.display=(document.getElementById("templateWiz_examen").value==0)?'block':'none';
}

templateWiz.close = function(){
	document.getElementById("templateWiz_fondo").style.display="none";
}

templateWiz.open = function(){
	document.getElementById("templateWiz_fondo").style.display="block";
}

templateWiz.start = function(){
	if (document.getElementById("templateWiz") == null)
		templateWiz.injectTemplateForm();
	
	if(templateWiz.data==undefined){
		templateWiz.data = new articleMetadata();
		templateWiz.data.loadPageMetadata();
	}
		
	var $ = function(str){
		return document.getElementById(str);
	}
	
	$("templateWiz_examen").value = templateWiz.data.getTipoExamenValue();
	$("templateWiz_examen2").value = templateWiz.data.tipoExamen;
	$("templateWiz_fecha").value = templateWiz.data.getFechaStr();
	$("templateWiz_oportunidad").value = templateWiz.data.nro_oportunidad;
	$("templateWiz_tema").value = templateWiz.data.tema;
	$("templateWiz_codigo").value = templateWiz.data.codigoMateria;
	$("templateWiz_nombreMateria").value = templateWiz.data.nombreMateria;
	$("templateWiz_catedra").value = templateWiz.data.catedra;
	
	templateWiz.open();	
}

templateWiz.submit = function(){
	GM_log("submit");
	//Acá pasa todo
	
	var $ = function(str){
		return document.getElementById(str);
	}
	
	//Recuperamos los valores que el usuario ingresó
	templateWiz.data.setTipoExamen($("templateWiz_examen").value, $("templateWiz_examen2").value);
	templateWiz.data.setFechaStr($("templateWiz_fecha").value);
	templateWiz.data.nro_oportunidad=$("templateWiz_oportunidad").value;
	templateWiz.data.tema=$("templateWiz_tema").value;
	templateWiz.data.codigoMateria=$("templateWiz_codigo").value;
	templateWiz.data.nombreMateria=$("templateWiz_nombreMateria").value;
	GM_log('nombre:'+templateWiz.data.nombreMateria);
	templateWiz.data.catedra=$("templateWiz_catedra").value;
	
	templateWiz.data.processData();
	
	//Imprimimos
	var txtArea = document.getElementById("wiki__text");
	txtArea.value = templateWiz.data.printTemplate() + txtArea.value;
	
	//Salimos
	templateWiz.close();
}

/////////////////////////////////////////////////////
main = function(){
	GM_log("main() Mejoras_Editor_Wiki_Fiuba");
	
	if(!isEditPage())
		return; // :(
	
	GM_log("Es una página de edición");
	//Agrego estilos CSS
	addCSS();
	
    //Agrego el botón para el asistente de links a páginas nuevas
    var my_btn = document.createElement("input"); //usar button, clase toolbutton y una imagen en lugar de texto
	my_btn.type="button";
	my_btn.className="button";
    my_btn.onclick = function (){alert ('Soon, my dear :)')};//newPageWiz.open;
    my_btn.value="Link a página nueva";
    document.getElementById("tool__bar").appendChild(my_btn);
	
	//Agrego los links al editor de templates
	var my_btn = document.createElement("input"); //usar button, clase toolbutton y una imagen en lugar de texto
	my_btn.type="button";
	my_btn.className="button";
    my_btn.onclick = templateWiz.start;
    my_btn.value="Asistente de Plantillas para exámenes";
    document.getElementById("tool__bar").appendChild(my_btn);
}

window.addEventListener('load', main);
GM_log("Script Wiki corriendo");