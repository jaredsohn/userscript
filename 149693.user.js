// ==UserScript==
// @name           Ema_Center
// @description    Ayuda en la validación de centros
// @author         Ismael Vayra
// @include        http://*
// @version        1.1
// @run-at         document-end
// ==/UserScript==

//Declaración de las constantes de los países

const esp = "http://www.admines.emagister.es/administradores/centro/data?id=";
const ita = "http://www.adminit.emagister.es/administradores/centro/data?id=";
const arg = "http://www.adminar.emagister.es/administradores/centro/data?id=";
const chi = "http://www.admincl.emagister.es/administradores/centro/data?id=";
const col = "http://www.adminco.emagister.es/administradores/centro/data?id=";
const mex = "http://www.adminmx.emagister.es/administradores/centro/data?id=";
const fra = "http://www.adminfr.emagister.es/administradores/centro/data?id=";
const uka = "http://www.adminuk.emagister.es/administradores/centro/data?id=";
const bra = "http://www.adminbr.emagister.es/administradores/centro/data?id=";
const ind = "http://www.adminin.emagister.es/administradores/centro/data?id=";

const paises = new Array(esp, ita, arg, chi, col, mex, fra, uka, bra, ind);

const prep = new Array (" Di ", " Dei ", " D' ", " A "," Da ", " In ", " Con ", " Su ", " Per ", " Tra ", " Fra ", " I ", " Lo ", " La ", " Gli ", " Le ", " L' ", " Uno ", " Del "," Una ", " Un' ", " A "," Ante "," Bajo "," Cabe "," Con "," Contra "," De "," Desde "," En "," Entre "," Hacia "," Hasta "," Para "," Por "," Según "," Della ", " Dello ", " Segun "," Sin "," So "," Sobre "," Tras ", " After ", " At ", " Behind ", " Beneath ", " Between ", " By ", " Except ", " From ", " Into ", " And ", " Near ", " Off ", " Over ", " Through ", " Until ", " Under ", " Upon ", " Without ", " Above ", " Among ", " Before ", " Below ", " Beside ", " But ", " Down ", " For ", " In ", " Like ", " Of ", " On ", " Since ", " Throughout ", " To ", " Up ", " With ", " Aus ", " Bei ", " Mit ", " Nach ", " Seit ", " Von ", " Zu ", " Durch ", " Für ", " Ohne ", " Um ", " Gegen ", " Trotz ", " Während ", " Wegen ", " An ", " Auf ", " Hinter ", " In ", " Neben ", " Über ", " Unter ", " Vor ", " Zwischen ", " El ", " La ", " Los ", " Las ", " Un ", " Una ", " Unos ", " Unas ", " The ", " Der ", " Die ", " Das "," Einer ", " Eine ", " Ein "," Eins "," Einige "," Wenige ", " À ", " En ", " Au ", " Aux ", " Chez ", " Dans ", " Derrière ", " Devant ", " Entre ", " Derriere ", " Le ", " La "," Les "," Un "," Une "," Des ", " Y ");


//Obtención de la URL de la pagina en la que estamos entrando
var dire = document.URL;
dire = dire.slice(0,63); //eliminamos el ID del centro, para que la URL sea generica de Emagister

//Verifica si estamos entrando en el administrador de centros

if (paises.indexOf(dire) != -1){
//Funcion que modifica el texto transformandolo en formato titulo

	function MaysPrimera(string){
		var arrayWords;
		var returnString = "";
		var len;
		arrayWords = string.split(" ");
		len = arrayWords.length;
		for(i=0;i < len ;i++){
			if(i != (len-1)){
				returnString = returnString+ucFirst(arrayWords[i])+" ";
			}
			else{
				returnString = returnString+ucFirst(arrayWords[i]);
			}
		}
		return returnString = SacameElCase(returnString);
		
	}
	
	function SacameElCase(cadena){
		var pMai, pmin;
		for(i=0; i<prep.length; i++){
			pMai= prep[i];
			pmin = prep[i].toLowerCase();
			cadena = cadena.replace(new RegExp(pMai,"g"),pmin); //busca todas las prep en la frase y las sostituye con la misma en minuscula
		}	
		return cadena;
	}
	
	function ucFirst(string){
		return string.substr(0,1).toUpperCase()+string.substr(1,string.length).toLowerCase();
	}

	//Pone GIGREV en el textbox correspondiente
	document.getElementById("codigoAct").value="GIGREV"

	//Si la ciudad está vacía entonces escribe A Determinar
	if (document.getElementById("descPoblacion").value==""){
		document.getElementById("descPoblacion").value="A Determinar"
	}
	
	//Si el contacto está vacío entonces escribe Contact
	if (document.getElementById("persCtcto").value==""){
		document.getElementById("persCtcto").value="Contact"
	}

	//*****************************************
	//formato titulo de todos estos campos
	document.getElementById("descCentro").value=MaysPrimera
	  (document.getElementById("descCentro").value);

	document.getElementById("descPoblacion").value=MaysPrimera
	  (document.getElementById("descPoblacion").value);

	document.getElementById("direccion").value=MaysPrimera
	  (document.getElementById("direccion").value);

	document.getElementById("razonSocial").value=MaysPrimera
	  (document.getElementById("razonSocial").value);

	document.getElementById("persCtcto").value=MaysPrimera
	  (document.getElementById("persCtcto").value);
	  
	//*****************************************
	
	
	//Verifica que esté vacio el textbox de la URL, si no está vacio verifica que no empieze con "http", encaso contrario lo agrega y lo pone en minusculo
	if (document.getElementById("url").value != ""){
		var busca = document.getElementById("url").value.search("http://");
		if (busca==-1){
			document.getElementById("url").value="http://"+document.getElementById("url").value.toLowerCase();
		}else{
			document.getElementById("url").value=document.getElementById("url").value.toLowerCase();
		}
	}

	document.getElementById("mail").value=
	  document.getElementById("mail").value.toLowerCase();

}