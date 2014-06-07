// ==UserScript==
// @name        FuckingTelecomPersonal
// @namespace   FuckingTelecomPersonal
// @description Recorre los numeros de los servicios SMS para darles de baja
// @include     https://autogestion.personal.com.ar/individuos/SuscripcionesServicios.aspx
// @grant       none
// @version     1
// ==/UserScript==


// Autor: YO. No ausmo ninguna responsabilidad en la vida, menos aún por éste script.
// Instrucciones: 
// 1) Hay que tener instalado Greasemonkey en Firefox (funciona en otros browsers).
//      Buscá en google y vas a encontrar cómo hacerlo
// 2) Instalá éste script en el Greasemonkey de Firefox. 
// 3) Entrá a la página de Personal y logueate con tus credenciales 
// 4) Entrá a https://autogestion.personal.com.ar/individuos/SuscripcionesServicios.aspx
//
//
// Ahora vas a ver los numeros de SMS con los servicos que tengas asociados uno por uno de forma
// automática. Si ves algo raro, detené el proceso con Esc.
// Suerte !!!!! Fuck You Personal !!!!!

// Los amigos de Peronal pueden cambiar ésto, así que los declaro 
// acá arriba para poder modificarlos

var id_combobox="ctl00_ContenedorAutogestion_DDLnumerosCortos"; 
var id_buscar="ctl00_ContenedorAutogestion_btnBuscar";
var id_form="aspnetForm";

var SayNoMore=0; // Charly rules ;-)
var EsperaParaVer=500; // 1 segundo para ver si el numero tiene asociado algún servicio del orto

var ListoElDelay;



function ShowNext()
{
	if(SayNoMore) // ya recorrí todos los mumeros
		return;

	var combo=document.getElementById(id_combobox); 
	var btn_buscar=document.getElementById(id_buscar); 
	var formulario=document.getElementById(id_form); 
	var combo_val= combo.options[combo.selectedIndex].text;
	combo.selectedIndex++;
	if(combo.selectedIndex==(combo.options.length-1))
	{
		SayNoMore=1;
		alert("Listo!");
	}

	btn_buscar.click();
	
}

ShowNext();

