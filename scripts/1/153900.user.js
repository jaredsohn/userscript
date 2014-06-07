// ==UserScript==
// @name        Entidad
// @namespace   http://clientes.argonautanet.com
// @description Script para Entidad verificadora
// @include     https://eagora.telefonica.es/g1/servlets/*
// @include     http://clientes.argonautanet.com:*/*
// @include     http://192.168.253.25:*/*
// @include     http://192.168.253.17:*/*
// @include     http://192.168.253.90:*/*
// @version     1
// @grant    GM_getValue
// @grant    GM_setValue
// ==/UserScript==

// Versión 1.02 - 24.01.2013 - CH7 : Dejan de funcionar los boletines de portabilidad. Han cambiado la matrícula y el canal.

var res = "";
var boletin = "";
var nombre = "";
var telefono = "";
var apellido1 = "";
var apellido2 = "";
var dninif = "";
var matricula = "";
var canalcomercial = "";
		
window.addEventListener("load", function(e) {
  detectarBoletin();
  instalarChupaDatos();
}, false);


function detectarBoletin()
{
	try
	{	
		if (document.body.innerHTML.indexOf("Boletines: PORTABILIDAD RECEPTORA")!=-1)
		{	res = "PORTABILIDAD/RECEPTORA"; 	}		
		else if (document.body.innerHTML.indexOf("Boletines: INHABILITACIONES DE LA PREASIGNACION")!=-1)
		{	res = "INHABILITACIONES/PREASIGNACION";	}
		else if (document.body.innerHTML.indexOf("Boletines: INHABILITACIONL/BAJA AMLT")!=-1)
		{	res = "INHABILITACIONES/BAJA";		}		
		else if (document.body.innerHTML.indexOf("Boletines: Cancelación Verbal Bucle Acceso Compartido")!=-1)
		{	res = "CANCELACION/BUCLE";		}					
		else if (document.body.innerHTML.indexOf("Boletines: Cancelación Verbal de la Portabilidad Donante")!=-1)
		{	res = "CANCELACION/PORTABILIDAD";	}						
		else if (document.body.innerHTML.indexOf("Boletines: Portabilidad P12")!=-1)
		{	res = "Portabilidad P12";		}
	}
	catch(e)
	{}

//alert(res);

	if (res!="")
	{
		// Activar para depurar
		// imprimeTDs();
	}
		
	// Recogemos valores
	
	if (res.trim() == "PORTABILIDAD/RECEPTORA" || res == "Portabilidad P12")
    {

		boletin = returnStrongValue(0);
		nombre = returnStrongValue(6);
		telefono = returnStrongValue(75);
		apellido1 = returnStrongValue(10);
		apellido2 = returnStrongValue(12);
		dninif = returnStrongValue(14);

		// frenado CH7 24/ene: matricula = returnStrongValue(44);
		  matricula = returnStrongValue(46);
		// frenado CH7 24/ene: canalcomercial = returnStrongValue(47);
		  canalcomercial = returnStrongValue(49);


		// alert('boletin ok...');
		
		vuelcaDatos();
	}
	else
	{
		// alert('boletin ko...');
	}
	
	if (res == "INHABILITACIONES/PREASIGNACION" || res == "INHABILITACIONES/BAJA")
    {	
	
		boletin = returnStrongValue(0);
		nombre = returnStrongValue(12);
		telefono = returnStrongValue(7);
		apellido1 = returnStrongValue(14);
		apellido2 = returnStrongValue(16);
		dninif = returnStrongValue(18);
		
		if (res == "INHABILITACIONES/PREASIGNACION")
		{
			matricula = returnStrongValue(25,1);
			canalcomercial = returnStrongValue(24,1);
		}
		else
		{
			matricula = returnStrongValue(24,1);
			canalcomercial = returnStrongValue(23,1);
		}
			
		vuelcaDatos();
	}	
	
	if (res == "CANCELACION/PORTABILIDAD" || res == "CANCELACION/BUCLE")
    {
		
		boletin = returnStrongValue(1);		
		telefono = returnStrongValue(6);
		nombre = returnStrongValue(10);
		apellido1 = returnStrongValue(12);
		apellido2 = returnStrongValue(15);
		dninif = returnStrongValue(17);
		matricula = "";
		canalcomercial = "";
		
		vuelcaDatos();
	}
}


function returnStrongValue(index, strongindex)
{
	if (!strongindex)
		strongindex = 0;
	formulario = document.getElementsByName("Form1")[0];
	temp = formulario.getElementsByTagName("td")[index];
	return temp.getElementsByTagName("strong")[strongindex].innerHTML;
}

function returnValue(index)
{
	formulario = document.getElementsByName("Form1")[0];
	temp = formulario.getElementsByTagName("td")[index];
	return temp.innerHTML;
}

function imprimeTDs()
{
		var cadena= "LISTADO DE VALORES DE LA PÁGINA\n\n";
		var formulario = document.getElementsByName("Form1")[0];
		var temp = formulario.getElementsByTagName("td").length;
		for(i=60;i<temp;i++)
		{

		 //if (i==0 || i==6 || i==8 || i==10 || i== 12 || i==14 || i==44 || i==47)
		 //{

			//cadena += i + " " + returnValue(i).substr(0,100) + "\n" +
			//"---------------------------------------------------------------" + "\n\n\n";

			cadena += i + " " + returnValue(i).substr(0,100) + "\n" 



		 //}
		}
		alert(cadena);
		
}

function vuelcaDatos()
{

//alert('volcamos datos...');

	GM_setValue('res', res);
	GM_setValue('boletin', boletin);
	GM_setValue('nombre', nombre);
	GM_setValue('apellido1', apellido1);
	GM_setValue('apellido2', apellido2);
	GM_setValue('telefono', telefono);
	GM_setValue('dninif', dninif);
	GM_setValue('matricula',matricula);
	GM_setValue('canalcomercial', canalcomercial);

	GM_setValue('volcar',
		confirm("Detectado boletín de " + res + " \n" + "¿Desea volcar los datos listados a continuación?\n\n" +
			"Tipo :" + res + "\n" +
			"Boletin :" + boletin + "\n" + 
			"Nombre  :"+ nombre+ "\n" + 			
			"Apellido1 :"+ apellido1+ "\n" + 
			"Apellido2 :"+ apellido2+ "\n" + 
			"Telefono :"+ telefono+ "\n" + 
			"Dninif :"+ dninif + "\n" + 
			"Matricula :"+ matricula + "\n" + 
			"Canalcomercial :"+ canalcomercial + "\n" )
			);
}


function instalarChupaDatos()
{
	if(document.getElementById('WorkCode'))
	{	
		alert('Instalando soporte para recogida de datos de EVTDE');	
		window.setTimeout(checkvalues, 1000);
	}
}

function checkvalues()
{
	
		
		if (GM_getValue("volcar"))
		{
			// alert('Recogiendo datos de boletín EVTDE');
			
			var elem = null;
			elem= document.getElementById("evtdeinfo");
			if (!elem)
			{
				elem = document.createElement("div");
				elem.id="evtdeinfo";
				elem.style.display = "none";
			}
			
			// Fijar datos en el DOM y crear rutina para campaña EVTDE que recoja del mismo			
			elem.innerHTML = 
				GM_getValue( "res" ) + "##" + 
				GM_getValue( "boletin") + "##" + 
				GM_getValue( "nombre") + "##" + 
				GM_getValue( "apellido1") + "##" + 
				GM_getValue( "apellido2") + "##" + 
				GM_getValue( "telefono") + "##" + 
				GM_getValue( "dninif") + "##" + 
				GM_getValue( "matricula") + "##" + 
				GM_getValue( "canalcomercial");
			
			document.getElementsByTagName("body")[0].appendChild(elem);
						
			GM_setValue("volcar",false);
		}

		
		
	window.setTimeout(checkvalues, 1000);
}



