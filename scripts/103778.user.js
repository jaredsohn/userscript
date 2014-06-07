// ==UserScript==
// @name           OGameRediseño Recorredor de Galaxias
// @version	   0.4
// @author         MaSSaCre
// @date           2012-06-09
// @namespace      OGame
// @description    OGameRediseño Recorredor de Galaxias
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

var UPDATE = {
     name: "OGameRediseño Recorredor de Galaxias"
    ,check: "http://userscripts.org/scripts/source/103778.meta.js"
    ,install: "http://userscripts.org/scripts/source/103778.user.js"
    ,version: "0.4"
    ,msg: ""
    ,minHours: 5
};

var op = function () {
   this.set = function(key, value) {
      return GM_setValue("ogGal_" + getServer() + "_" + key, value);
   }
   
   this.get = function(key){
         return GM_getValue("ogGal_" + getServer() + "_" + key,1)
   }
}

var options = new op();


// Definimos Variables a agregar al contenido HTML
var SITIO=document.getElementById('galaxyheadbg').parentNode;
var GalaxiaInicio = document.createElement("input");
var GalaxiaFin = document.createElement("input");
var SistemaInicio = document.createElement("input");
var SistemaFin = document.createElement("input");
var Enviar = document.createElement("input");
var btnDetener = document.createElement("input");

//Definimos Variables para la forma de visualizacion.
var DivGalaxiaInicio = document.createElement("div");
var DivGalaxiaFin = document.createElement("text");
var DivSistemaInicio = document.createElement("text");
var DivSistemaFin = document.createElement("text");
var BR = document.createElement("text");
var tr = document.createElement("tr");


var a=options.get("GalaxiaInicial");
var b=options.get("GalaxiaFinal");
var c=options.get("SistemaInicial");
var d=options.get("SistemaFinal");

var Galaxiaactual = parseInt(document.forms[0].elements.namedItem("galaxy").value);
var Sistemaactual = parseInt(document.forms[0].elements.namedItem("system").value);
options.set("GalaxiaActual", Galaxiaactual);
options.set("SistemaActual", Sistemaactual);



// Asignamos Atributos a TR
tr.setAttribute('class', 'info info_header');

// Agregamos Atributos a Galaxia Inicial.
GalaxiaInicio.setAttribute('type','text');
GalaxiaInicio.setAttribute('name','GalaxiaInicio');
GalaxiaInicio.setAttribute('id','GalaxiaInicio');
GalaxiaInicio.setAttribute('value',a);
GalaxiaInicio.setAttribute('size','1');
GalaxiaInicio.setAttribute('maxlength','1');
GalaxiaInicio.style.width = '10px';
GalaxiaInicio.style.marginRight='15px';
GalaxiaInicio.style.color='#ffffff';
GalaxiaInicio.style.backgroundColor='transparent';
GalaxiaInicio.style.borderColor='#ffffff';


// Agregamos Atributos a Galaxia Final
GalaxiaFin.setAttribute('type','text');
GalaxiaFin.setAttribute('name','GalaxiaFin');
GalaxiaFin.setAttribute('id','GalaxiaFin');
GalaxiaFin.setAttribute('value',b);
GalaxiaFin.setAttribute('size','1');
GalaxiaFin.setAttribute('maxlength','1');
GalaxiaFin.style.width = '10px';
GalaxiaFin.style.marginRight = '15px';
GalaxiaFin.style.color='#ffffff';
GalaxiaFin.style.backgroundColor='transparent';

// Agregamos Atributos a Sistema Inicial
SistemaInicio.setAttribute('type','text');
SistemaInicio.setAttribute('name','SistemaInicio');
SistemaInicio.setAttribute('id','SistemaInicio');
SistemaInicio.setAttribute('value',c);
SistemaInicio.setAttribute('size','3');
SistemaInicio.setAttribute('maxlength','3');
SistemaInicio.style.width = '30px';
SistemaInicio.style.marginRight = '15px';
SistemaInicio.style.color='#ffffff';
SistemaInicio.style.backgroundColor='transparent';

// Agregamos Atributos a Sistema Final
SistemaFin.setAttribute('type','text');
SistemaFin.setAttribute('name','SistemaFin');
SistemaFin.setAttribute('id','SistemaFin');
SistemaFin.setAttribute('value',d);
SistemaFin.setAttribute('size','3');
SistemaFin.setAttribute('maxlength','3');
SistemaFin.style.width = '30px';
SistemaFin.style.marginRight = '15px';
SistemaFin.style.color='#ffffff';
SistemaFin.style.backgroundColor='transparent';

//Agregamos Atributos al boton Enviar..
Enviar.setAttribute('type','button');
Enviar.setAttribute('name','Enviar');
Enviar.setAttribute('value','Empezar');
Enviar.addEventListener('click',function(){funcion_llamada();},0);

//Agregamos Atributos al boton Enviar..
btnDetener.setAttribute('type','button');
btnDetener.setAttribute('name','btnDetener');
btnDetener.setAttribute('value','Stop');
btnDetener.addEventListener('click',function(){Detener();},0);
btnDetener.style.marginLeft = '15px';

/*   Agregamos todos los Atributos para los elementos a mostrar*/
DivGalaxiaInicio.setAttribute('name','DivGalaxiaInicio');
DivGalaxiaInicio.setAttribute('align','center');
DivGalaxiaFin.setAttribute('name','DivGalaxiaFin');
DivSistemaInicio.setAttribute('name','DivSistemaInicio');
DivSistemaFin.setAttribute('name','DivSistemaFin');

DivGalaxiaInicio.innerHTML="Galaxia Inicial: ";
DivGalaxiaFin.innerHTML=" Galaxia Final: ";
DivSistemaInicio.innerHTML=" Sistema Inicial: ";
DivSistemaFin.innerHTML=" Sistema Final: ";
BR.innerHTML="&nbsp;";


/*Agregamos los contenidos...*/
SITIO.appendChild(tr);
tr.appendChild(DivGalaxiaInicio);
DivGalaxiaInicio.appendChild(GalaxiaInicio);
DivGalaxiaInicio.appendChild(DivGalaxiaFin);
DivGalaxiaInicio.appendChild(GalaxiaFin);
DivGalaxiaInicio.appendChild(DivSistemaInicio);
DivGalaxiaInicio.appendChild(SistemaInicio);
DivGalaxiaInicio.appendChild(DivSistemaFin);
DivGalaxiaInicio.appendChild(SistemaFin);
DivGalaxiaInicio.appendChild(BR);
DivGalaxiaInicio.appendChild(BR);
DivGalaxiaInicio.appendChild(Enviar);
DivGalaxiaInicio.appendChild(BR);
DivGalaxiaInicio.appendChild(btnDetener);

/* Definimos Funciones.. */
function funcion_llamada(){

var Galaxiainicial  = parseInt(document.getElementById("GalaxiaInicio").value);
var Galaxiafinal  = parseInt(document.getElementById("GalaxiaFin").value);
var Sistemainicial  = parseInt(document.getElementById("SistemaInicio").value);
var Sistemafinal  = parseInt(document.getElementById("SistemaFin").value);


options.set("GalaxiaInicial", Galaxiainicial);
options.set("GalaxiaFinal", Galaxiafinal);
options.set("SistemaInicial", Sistemainicial);
options.set("SistemaFinal", Sistemafinal);

var e=options.get("GalaxiaActual");
var f=options.get("SistemaActual");

document.forms[0].elements.namedItem("galaxy").value = a; 
document.forms[0].elements.namedItem("system").value = c;
document.forms[0].submit();


options.set("estado", true);

}


var Inicializador=options.get("estado");

if(Inicializador==true){
Init();
}else{

}


function Init(){
var d=options.get("SistemaFinal");
var f=options.get("SistemaActual");

if(f<d){
window.setTimeout(function() { Actualizar() }, 4000);
}
else{

var e=options.get("GalaxiaActual");
var b=options.get("GalaxiaFinal");

if(e<b){
document.forms[0].elements.namedItem("galaxy").value = parseInt(Galaxia());
document.forms[0].elements.namedItem("system").value = 1;
document.forms[0].submit();
}
else{
options.set("estado", false);
alert("Actualización Completada!");
}

}
}/*Fin Function Init */




/*		Funciones Comprobadas		*/
function Actualizar(){
document.forms[0].elements.namedItem("galaxy").value = options.get("GalaxiaActual"); 
document.forms[0].elements.namedItem("system").value = parseInt(Sistema());
document.forms[0].submit();
	}

function Sistema(){
var retorno=parseInt(document.forms[0].elements.namedItem("system").value);
return retorno+1;
}

function Galaxia(){
var retorno=parseInt(document.forms[0].elements.namedItem("galaxy").value)+1;
options.set("GalaxiaActual", retorno);
return retorno;
}

function Detener(){
options.set("estado", false);
alert("Script Stoped..!");
}

var checkUPDATE = function() {
    var version = UPDATE.version;
    var uurl = UPDATE.check;
	var now = new Date();
	var str = options.get('lastupdate');
    var hDif = 99999;
    var lastCheck;
    
    if(typeof str != 'undefined') {
        lastCheck = new Date(str);
        hDif = Math.abs(Math.floor((now-lastCheck)/(1000*60*60)));
    }

	
	this.init = function() {
		if(hDif >= UPDATE.minHours) {
			options.set('lastupdate',now.toString());
			this.check();	
		}
        else {
            var ant_check = options.get('checkver');
            if(typeof ant_check != 'undefined') {
                var thisver = parseInt(version.replace(/\./g,''))+100;
                if(parseInt(ant_check)>thisver){
                    this.doupdate(null,true);
                }
            }
        }
	}

	this.check = function() {
       GM_xmlhttpRequest({
            method:"GET",
            url:uurl,
            headers: {
                "Expires":"Mon, 26 Jul 1997 05:00:00 GMT",
                "Last-Modified":"Sun, 25 Jul 2004 16:12:09 GMT",
                "Cache-Control":"no-cache, must-revalidate",
                "Pragma":"nocache"
            },
            onreadystatechange:this.doupdate});
	}

    this.doupdate = function(o, force) {
	   var show = false
	   if(arguments.length == 2){
	       if(force) show = true;
       }
       else {
            if(o.readyState == 4) {
                checkver = o.responseText.substr(0,100);
                checkver = checkver.split('@version')[1];
                checkver = parseInt(checkver.replace(/\./g,''))+100;
                thisver = parseInt(version.replace(/\./g,''))+100;
                if(checkver>thisver) {
                    options.set('checkver', checkver); 
                    show = true;
                }
            }
        }
        
        if(show) {
            var divA = document.createElement('div');
            var html = '<div style="position:absolute;position:fixed;bottom:0;left:0;padding:0.2em 0.35em;color:#FFFFFF;background:#FF0000;font-weight:bold;font-size:small;z-index:99;">';
            html += '<a href="' + UPDATE.install + '" style="color:#FFFFFF">' + LANG.newVer + '</a></div>';
            divA.innerHTML = html;
            document.body.appendChild(divA);
        }
	}
    
    
    this.init();
}

function getServer() {

   var server = location.href;
   server = server.replace("http://", "").replace("www.", "");
   server = server.substring(0, server.indexOf("."));
   
   return server;
}