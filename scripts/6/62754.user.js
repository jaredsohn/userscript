// ==UserScript==
// @name           Acuerdos Culturales
// @autor          nulan
// @namespace      nulan_acuerdosCulturales
// @description    Muestra en la pantalla del consejero diplomático, en la solapa de la alianza con que miembros de ella se tiene acuerdos culturales y con cuales no
// @version	   1.0.0
// @homepage       inexistente
// @include        http://s*.ikariam.*/index.php?view=diplomacyAdvisorAlly*
// ==/UserScript==

function cambiarVisibilidadConfiguracion()
{		
	var div = document.getElementById('divConfiguracion');
	div.style.display == 'none' ? div.style.display = '' : div.style.display = 'none';	
	div = document.getElementById('masMenosConfiguracion');	
	div.innerHTML == ' (-) ' ? div.innerHTML = ' (+) ' : div.innerHTML = ' (-) ';
}

function get(url, cb) {
	GM_xmlhttpRequest({
		method: 'GET',
	    	url: url,
	    	//headers: {'Accept': 'application/atom+xml,application/xml,text/xml,text/html'},
	    	onload: function(r) {cb(r);}
	});
}

//var s = 'informacion: <br>';

var div = document.getElementById('mainview');
//var info = document.createElement('div');
var divConf = document.createElement('divConf');
div.insertBefore(divConf, div.childNodes[2]);
//div.insertBefore(info, div.childNodes[2]);

var sConf = '<div class="contentBox01h" ><h3 class="header" style="cursor:pointer" id="cabeceraConfiguracion"><span class="textLabel">Acuerdos Culturales - Configuración</span><span id="masMenosConfiguracion" class="textLabel"> (-) </span></h3><div class="content" id="divConfiguracion" style="margin:20px; margin-bottom:10px; line-height: 20px;">';
sConf += "Introduzca la dirección web que muestra su navegador cuando visualiza uno de sus museos<br>Por ejemplo: http://s3.ikariam.es/index.php?view=museum&id=12013&position=10 <br> <input type='text' id='txtUrlMuseos' style='width:500px' /> <a id='btnGuardar' class='button'>Guardar</a>";
sConf += '</div><div class="footer"/></div>';
divConf.innerHTML = sConf;

//info.innerHTML = s;

var claveUrlMuseo = "urlMuseo_" + window.location.href.substring(0, window.location.href.indexOf('/',9));

var cabeceraConfiguracion = document.getElementById('cabeceraConfiguracion');
cabeceraConfiguracion.addEventListener("click", cambiarVisibilidadConfiguracion , false);

var btnGuardar = document.getElementById('btnGuardar');
btnGuardar.addEventListener("click", function()  {GM_setValue(claveUrlMuseo,  document.getElementById("txtUrlMuseos").value) ; alert("Guardado correctamente."); cambiarVisibilidadConfiguracion(); } , false);

if (GM_getValue(claveUrlMuseo , "") != "")
{	
	document.getElementById('txtUrlMuseos').value = GM_getValue(claveUrlMuseo, "") ;	
	cambiarVisibilidadConfiguracion();
}

var cabeceraAlianza = document.evaluate("//div[@id='alliance']/div[2]/h3", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);  
cabeceraAlianza.snapshotItem(0).innerHTML += "&nbsp;&nbsp;&nbsp; <a id='mostrar' style='cursor:pointer'>[Mostrar acuerdos culturales]</a>";
var mostrar = document.getElementById('mostrar');
mostrar.addEventListener("click", function()  {this.style.display='none'; get(GM_getValue(claveUrlMuseo , '') , procesarInformacionMuseos)}, false);


function procesarInformacionMuseos(d)
{	
	var infoMuseos = document.createElement("div");
	infoMuseos.setAttribute("style", "display: none;");
        document.body.appendChild(infoMuseos);
        infoMuseos.innerHTML = d.responseText;	
        
        var tdJugadoresMuseos = document.evaluate("//td[@class='player']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);        	
	var tdJugadoresAlianza = document.evaluate("//table[@id='memberList']/tbody/tr/td[2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);        
        
        var tabla = document.getElementById('memberList');       
        var celda = document.createElement('th');
        
        celda.innerHTML = 'Acuerdo';        
        tabla.childNodes[1].childNodes[1].appendChild(celda);
        for (var i = 0; i < tdJugadoresAlianza.snapshotLength; i++) 
        {   
        	celda = document.createElement('td');
        	tdJugadoresAlianza.snapshotItem(i).parentNode.appendChild(celda);
        	var j = 0;
        	var encontrado = false;
        	while (!encontrado && j<tdJugadoresMuseos.snapshotLength)
        	{	
        		if (tdJugadoresAlianza.snapshotItem(i).innerHTML == tdJugadoresMuseos.snapshotItem(j).innerHTML)
        		{
        			encontrado = true;				
		        	celda.innerHTML = '<img src="http://s14.ikariam.es/skin/museum/icon32_culturalgood.gif" style="width:15px; height:15px; margin:0; padding:0"/>';		        	
        		}        		        		
        		j++;
        	}
        	if (!encontrado)
        	{
        		celda.innerHTML = '';		        	
        	}       	
        	
        }        
}	







