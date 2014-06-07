// ==UserScript==
// @name           	NeoBux Cliques 1.0.0 PT
// @namespace      	http://userscripts.org/users/BrunoGuerreiro
// @description    	Amostra os nossos cliques, e dá a possibilidade de grava-los!
// @include        	http://www.neobux.com/m/v/*
// @icon		http://www.neobux.com/favicon.ico	
// @version 1.0.0
// ==/UserScript==
// Changelog
// Versão Nº 1.0.0 disponivel para download dia: 31-05-2012


//var bottom_pix para determinar la posición de los botones, 
var bottom_pix = window.innerHeight/2 - (32*5/2);
var bottom_pix_2 = window.innerHeight/2 - (41*5/2); 

//obtenemos el idioma de la página
var neoclicsebp_Idioma = document.body.innerHTML.indexOf("c0 f-") + 5;
neoclicsebp_Idioma = document.body.innerHTML.substring(neoclicsebp_Idioma, neoclicsebp_Idioma + 2);

// common button style, estas variables permiten determinar la forma, color, tamaño, etc, de los botones
var css_button_General = 'cursor:pointer;width:179px; height:34px; -moz-border-radius:20px; -webkit-border-radius:20px; color:#fff;  line-height:32px; text-align:center; position:fixed;right:3px;';
var css_button_Adicional = 'cursor:pointer;width:179px; height:26px; -moz-border-radius:20px; -webkit-border-radius:20px; color:#fff;  line-height:26px; text-align:center; position:fixed;right:3px;';
// common button style; para los botones pequeños cuando la pantalla tiene un ancho menor a 1204
var css_button_General_2 = 'cursor:pointer;width:56px; height:41px; -moz-border-radius:20px; color:#fff; line-height:20px; text-align:center; position:fixed;right:3px;';
// common button style; para el botón fecha cuando la pantalla tiene un ancho menor a 1204
var css_button_Fecha = 'cursor:pointer;width:56px; height:20px; -moz-border-radius:20px; -webkit-border-radius:20px; color:#fff; line-height:20px; text-align:center; position:fixed;right:3px;';
// common button style; para los botones pequeños de restar clics
var css_button_Pequeno = 'cursor:pointer;width:25px; height:10px; -moz-border-radius:20px; -webkit-border-radius:20px; line-height:10px; text-align:center; position:fixed;';
//Obtenemos el Tipo de Cuenta
var neoebp_accountType = document.evaluate("//div[@class='mbxm sb']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
neoebp_accountType = neoebp_accountType.snapshotItem(neoebp_accountType.snapshotLength-1).innerHTML.replace(/&nbsp;/gi,"");
//esta variable la colocamos en 2 si la resolucion horizontal de la ventana es menor a 1205
var TipoBoton = 1;
// Dependiendo del Tipo de Cuenta, colocaremos los valores de los Clics
var neoebp_ADS_EPR = "";
var neoebp_ADS_EES = "";
var neoebp_ADS_EMN = "";
var neoebp_ADS_EMC = "";
var neoebp_ADS_AFF = "";
var neoebp_ADS_AFN = "";
//creamos las variables que van a contener el texto de los botones
var Text_ADS_EPR;
var Text_ADS_EES;
var Text_ADS_EMN;
var Text_ADS_EMC;
var Text_ADS_AFN;
var Text_ADS_AFF;
var Text_ADS_Total;
var Text_ADS_Clics; 
var Text_ADS_Fecha;
//creamos las variables que van a contener el texto abreviado del tipo de anuncio
var neoclics_Text_ADS_EPR = null;
var neoclics_Text_ADS_EES = null;
var neoclics_Text_ADS_EMN = null;
var neoclics_Text_ADS_EMC = null;
var neoclics_Text_ADS_AFN = null;
var neoclics_Text_ADS_AFF = null;
var neoclics_Text_ADS_Total = null;
var neoclics_Text_ADS_Clics = null;
var neoclics_Text_ADS_Clics_2 = null;
var neoclics_Text_ADS_Fecha = null;
//texto a mostrar en la opcion del reseteo de los contadores
var ebp_TextMensL1 = "";
//***********************************************************************************
//*****dependiendo del idioma, colocamos el texto en los botones				*****
//***********************************************************************************
switch(neoclicsebp_Idioma)
{
    case "es": //Español
        neoclics_Text_ADS_EPR = 'ESPRO';
		neoclics_Text_ADS_EES = 'ESEST';
		neoclics_Text_ADS_EMN = 'EMINI';
		neoclics_Text_ADS_EMC = 'MICRO';
		neoclics_Text_ADS_AFN = 'FNARA';
		neoclics_Text_ADS_AFF = 'FFUCS';
		neoclics_Text_ADS_Clics = 'Total Clics:';
		neoclics_Text_ADS_Total = 'Ganado:';
		neoclics_Text_ADS_Clics_2 = 'Clics';
		neoclics_Text_ADS_Fecha = 'Fecha';
		ebp_TextMensL1 = 'Resetear Contadores a la hora local?';
    break;
    default: //por default se deja PT.
        neoclics_Text_ADS_EPR = 'Prolongados';
		neoclics_Text_ADS_EES = 'Normal';
		neoclics_Text_ADS_EMN = 'Mini';
		neoclics_Text_ADS_EMC = 'Micro';
		neoclics_Text_ADS_AFN = 'Fixos Laranja';
		neoclics_Text_ADS_AFF = 'Fixos Rosa';
		neoclics_Text_ADS_Clics = 'Total Cliques:';
		neoclics_Text_ADS_Total = 'Ganhos:';
		neoclics_Text_ADS_Clics_2 = 'Cliques';
		neoclics_Text_ADS_Fecha = 'Data';
		ebp_TextMensL1 = 'Contador reinicia na hora Local?';
    break;
}

//***********************************************************************************
//*****dependiendo del tipo de cuenta, actualizamos los valores de los anuncios *****
//***********************************************************************************
switch(neoebp_accountType)
{
    case "Standard":
        neoebp_ADS_EPR = "0.015";
		neoebp_ADS_EES = "0.010";
		neoebp_ADS_EMN = "0.005";
		neoebp_ADS_EMC = "0.001";
		neoebp_ADS_AFF = "0.001";
		neoebp_ADS_AFN = "0.001";
    break;
    case "Pioneer":
        neoebp_ADS_EPR = "0.015";
		neoebp_ADS_EES = "0.010";
		neoebp_ADS_EMN = "0.005";
		neoebp_ADS_EMC = "0.001";
		neoebp_ADS_AFF = "0.001";
		neoebp_ADS_AFN = "0.001";
    break;
    case "Golden":
        neoebp_ADS_EPR = "0.020";
		neoebp_ADS_EES = "0.010";
		neoebp_ADS_EMN = "0.005";
		neoebp_ADS_EMC = "0.001";
		neoebp_ADS_AFF = "0.001";
		neoebp_ADS_AFN = "0.010";
    break;
    case "Emerald":
        neoebp_ADS_EPR = "0.020";
		neoebp_ADS_EES = "0.012";
		neoebp_ADS_EMN = "0.005";
		neoebp_ADS_EMC = "0.001";
		neoebp_ADS_AFF = "0.001";
		neoebp_ADS_AFN = "0.012";
    break;
    case "Sapphire":
        neoebp_ADS_EPR = "0.020";
		neoebp_ADS_EES = "0.012";
		neoebp_ADS_EMN = "0.005";
		neoebp_ADS_EMC = "0.001";
		neoebp_ADS_AFF = "0.001";
		neoebp_ADS_AFN = "0.012";
    break;
    case "Platinum":
        neoebp_ADS_EPR = "0.020";
		neoebp_ADS_EES = "0.015";
		neoebp_ADS_EMN = "0.005";
		neoebp_ADS_EMC = "0.001";
		neoebp_ADS_AFF = "0.001";
		neoebp_ADS_AFN = "0.015";
    break;
    case "Diamond":
        neoebp_ADS_EPR = "0.020";
		neoebp_ADS_EES = "0.015";
		neoebp_ADS_EMN = "0.005";
		neoebp_ADS_EMC = "0.001";
		neoebp_ADS_AFF = "0.001";
		neoebp_ADS_AFN = "0.015";
    break;
    case "Ultimate":
        neoebp_ADS_EPR = "0.020";
		neoebp_ADS_EES = "0.020";
		neoebp_ADS_EMN = "0.005";
		neoebp_ADS_EMC = "0.001";
		neoebp_ADS_AFF = "0.001";
		neoebp_ADS_AFN = "0.020";
    break;
    default:
        neoebp_ADS_EPR = "0.015";
		neoebp_ADS_EES = "0.010";
		neoebp_ADS_EMN = "0.005";
		neoebp_ADS_EMC = "0.001";
		neoebp_ADS_AFF = "0.001";
		neoebp_ADS_AFN = "0.001";
    break;
}
//***********************************************************************************
//****esta función es para saber el tamaño de la ventana del navegador, si en la*****
//****misma, el tamaño horizontal es menor a 1204, crearemos los botones tipo 2 *****
//***********************************************************************************
function TamVentana() {  
  var Tamanyo = [0, 0];  
  if (typeof window.innerWidth != 'undefined')  
  {  
    Tamanyo = [  
        window.innerWidth,  
        window.innerHeight  
    ];  
  }  
  else if (typeof document.documentElement != 'undefined'  
      && typeof document.documentElement.clientWidth !=  
      'undefined' && document.documentElement.clientWidth != 0)  
  {  
 Tamanyo = [  
        document.documentElement.clientWidth,  
        document.documentElement.clientHeight  
    ];  
  }  
  else   {  
    Tamanyo = [  
        document.getElementsByTagName('body')[0].clientWidth,  
        document.getElementsByTagName('body')[0].clientHeight  
    ];  
  }  
  return Tamanyo;  
}  

//***********************************************************************************
//**** funcion que Crea la Cookie para la información del día actual y de los   *****
//****	ultimos 4 días (5 en total) 											*****
//**** las variables son (la copie del script NeoBuxOX de Proxen) 			    *****
//**** c_name: es el nombre de la cookie; value: es el valor (dato) que 		*****
//**** guardaremos en la cookie; exdays: es el tiempo que durara la cookie		*****
//**** value es de la forma: fecha-Ads_EPR-Ads_EES-Ads_EMN-Ads_EMC-Ads_AFF-Ads_AFN **
//***********************************************************************************
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    c_value = c_value + "; path=/";
    document.cookie=c_name + "=" + c_value;
}
//***********************************************************************************
//**** funcion que lee la Cookie para obtener la información 					*****
//**** las variables son (la copie del script NeoBuxOX de Proxen) 			    *****
//**** c_name: es el nombre de la cookie; 										*****
//***********************************************************************************
function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
	setCookie("ebp_data","0",365);
    return 0;
}
//***********************************************************************************
//**** funcion para validar la Cookie, si no existe, la creamos					*****
//**** regresa el valor de la fecha actual						 			    *****
//***********************************************************************************
function checkCookie(sfecha)
{
    //Cookie value: fecha-Ads_EPR-Ads_EES-Ads_EMN-Ads_EMC-Ads_AFF-Ads_AFN
	//al final se agrego un valor (el 6 elemento), si es 0, se resetean los contadores a la hora del
	//servidor, si es 1 se resetean a la hora local
	//revisamos si existe la cookie y verificamos la fecha, sino creamos una nueva cookie con la fecha del servidor
    var data=getCookie("ebp_data");
	
    if (data != null && data != "")
    {
		var DataActual = data.split("][");
		if(DataActual.length == 6) //Check for malformed cookie
        {
			data = DataActual[0].split("-");
			if(data[0] == sfecha)
            {
                return data[0];
            }else{
				//si la fecha es diferente, borramos la cookie vieja y creamos la nueva
				//If arrives here no cookie o malformed cookie. Remove cookie
				var d = new Date();
				document.cookie = "ebp_data=0;expires=" + d.toGMTString() + ";" + ";";
				//Create a new one
				var sValueCookie = sfecha + "-0-0-0-0-0-0";
				setCookie("ebp_data", sValueCookie + "][" + DataActual[0] + "][" + DataActual[1] + "][" + DataActual[2] + "][" + DataActual[3] + "][" + DataActual[5],365);
				//setCookie("ebp_data",sfecha + "-0-0-0-0-0-0",365);
				return sfecha;
			}
        }
    }
    //If arrives here no cookie o malformed cookie. Remove cookie
    var d = new Date();
    document.cookie = "ebp_data=0;expires=" + d.toGMTString() + ";" + ";";
    
    //Create a new one
	var sValueCookie = sfecha + "-0-0-0-0-0-0";
	setCookie("ebp_data", sValueCookie + "][" + sValueCookie + "][" + sValueCookie + "][" + sValueCookie + "][" + sValueCookie + "][0",365);
	return sfecha;
}
//***********************************************************************************
//**** estas funciones llaman a la funcion para sumar o restar uno al total     *****
//**** de clics de cada anuncio													*****
//***********************************************************************************
//llamamos a la funcion guardar clics para el anuncio EPR
function Guarda_Clics_EPR()
{
	Guarda_Clics(0,1);
}
//llamamos a la funcion guardar clics para el anuncio EES
function Guarda_Clics_EES()
{
	Guarda_Clics(1,1);
}
//llamamos a la funcion guardar clics para el anuncio EMN
function Guarda_Clics_EMN()
{
	Guarda_Clics(2,1);
}
//llamamos a la funcion guardar clics para el anuncio EMC
function Guarda_Clics_EMC()
{
	Guarda_Clics(3,1);
}
//llamamos a la funcion guardar clics para el anuncio AFN
function Guarda_Clics_AFN()
{
	Guarda_Clics(4,1);
}
//llamamos a la funcion guardar clics para el anuncio AFF
function Guarda_Clics_AFF()
{
	Guarda_Clics(5,1);
}
//llamamos a la funcion guardar clics para actualizar los totales
function Guarda_Clics_All()
{
	Guarda_Clics(99,0);
}
//llamamos a la funcion guardar clics para el anuncio EPR, restando uno
function Guarda_Clics_EPR_Menos()
{
	Guarda_Clics(0,0);
}
//llamamos a la funcion guardar clics para el anuncio EES, restando uno
function Guarda_Clics_EES_Menos()
{
	Guarda_Clics(1,0);
}
//llamamos a la funcion guardar clics para el anuncio EMN, restando uno
function Guarda_Clics_EMN_Menos()
{
	Guarda_Clics(2,0);
}
//llamamos a la funcion guardar clics para el anuncio EMC, restando uno
function Guarda_Clics_EMC_Menos()
{
	Guarda_Clics(3,0);
}
//llamamos a la funcion guardar clics para el anuncio AFN, restando uno
function Guarda_Clics_AFN_Menos()
{
	Guarda_Clics(4,0);
}
//llamamos a la funcion guardar clics para el anuncio AFF, restando uno
function Guarda_Clics_AFF_Menos()
{
	Guarda_Clics(5,0);
}
//llamamos a la funcion guardar clics para actualizar los totales, los coloca todos a 0
function Guarda_Clics_All_Menos()
{
	Guarda_Clics(99,-1);
}

//***********************************************************************************
//**** esta funcion permite sumar o restar uno al total de clics de cada anunico*****
//**** las variables son:														*****
//**** Tipo_Ads: para identificar el ADS que se va a sumar o restar				*****
//**** n_Valor: 0 para restar, 1 para sumar, -1 coloca todos a cero "0"			*****
//***********************************************************************************	
function Guarda_Clics(Tipo_Ads, n_Valor)
{
// Creamos las variables para ver el total de clics por tipo de anuncio
	var neoebp_Clics_EPR = 0;
	var neoebp_Clics_EES = 0;
	var neoebp_Clics_EMN = 0;
	var neoebp_Clics_EMC = 0;
	var neoebp_Clics_AFN = 0;
	var neoebp_Clics_AFF = 0;
	var sTextoValores = "";
	var anoActual = "";
	var mesActual = "";
	var diaActual = "";
	var sFechaDia = "";
	
	//Obtenemos la Fecha/hora del Servidor
	var neoebp_Fecha = document.evaluate("//td[@class='f_r sb']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	neoebp_Fecha = neoebp_Fecha.snapshotItem(neoebp_Fecha.snapshotLength-1).innerHTML;
	var posicion1 = neoebp_Fecha.indexOf('>'); // Inicio de la fecha
	var posicion2 = neoebp_Fecha.indexOf('</'); // fin de la fecha
	var porcion = neoebp_Fecha.substring(posicion1+1,posicion2); // porcion que contiene la fecha
	
	//obtenemos la informacion sobre la hora de reseteo de los contadores
    var DataActual = getCookie("ebp_data");
	var ebp_data_clics_Act = DataActual.split("][");
	var neoclicsebp_settings_checked = ebp_data_clics_Act[5];
	
	//Si la hora de reseteo de los contadores es la hora local, tomamos la fecha de la hora local, sino
	//tomamos la fecha del servidor
	if(neoclicsebp_settings_checked == 1)
	{
		var neoebp_today = new Date();
	}else{
		var neoebp_today = new Date(porcion);
	}
	
	anoActual = "A" + neoebp_today.getFullYear();
	mesActual = "M" + (neoebp_today.getMonth()+1);
	diaActual = "D" + neoebp_today.getDate();
	sFechaDia =  diaActual + mesActual + anoActual;
	sFechaDia = checkCookie(sFechaDia);
	
	//obtenemos la información de los clics del cookie
    var DataActual = getCookie("ebp_data");
	var ebp_data_clics_Act = DataActual.split("][");
	//los clics del día están en el primer argumento de la matriz
	var ebp_data_clics = ebp_data_clics_Act[0];
	ebp_data_clics = ebp_data_clics.split("-");
	neoebp_Clics_EPR = parseFloat(ebp_data_clics[1]);
	neoebp_Clics_EES = parseFloat(ebp_data_clics[2]);
	neoebp_Clics_EMN = parseFloat(ebp_data_clics[3]);
	neoebp_Clics_EMC = parseFloat(ebp_data_clics[4]);
	neoebp_Clics_AFN = parseFloat(ebp_data_clics[5]);
	neoebp_Clics_AFF = parseFloat(ebp_data_clics[6]);
	
	//ahora dependiendo del anuncio que se haya echo clic, le sumamos uno a esa variable y guardamos los datos
	switch(Tipo_Ads)
	{
		case 0:
			if(n_Valor > 0)
			{
				neoebp_Clics_EPR++;
			}else{
				neoebp_Clics_EPR = ((neoebp_Clics_EPR - 1) < 0)?0:(neoebp_Clics_EPR - 1);
			}
		break;
		case 1:
			if(n_Valor > 0)
			{
				neoebp_Clics_EES++;
			}else{
				neoebp_Clics_EES = ((neoebp_Clics_EES - 1) < 0)?0:(neoebp_Clics_EES - 1);
			}
		break;
		case 2:
			if(n_Valor > 0)
			{
				neoebp_Clics_EMN++;
			}else{
				neoebp_Clics_EMN = ((neoebp_Clics_EMN - 1) < 0)?0:(neoebp_Clics_EMN - 1);
			}
		break;
		case 3:
			if(n_Valor > 0)
			{
				neoebp_Clics_EMC++;
			}else{
				neoebp_Clics_EMC = ((neoebp_Clics_EMC - 1) < 0)?0:(neoebp_Clics_EMC - 1);
			}
		break;
		case 4:
			if(n_Valor > 0)
			{
				neoebp_Clics_AFN++;
			}else{
				neoebp_Clics_AFN = ((neoebp_Clics_AFN - 1) < 0)?0:(neoebp_Clics_AFN - 1);
			}
		break;
		case 5:
			if(n_Valor > 0)
			{
				neoebp_Clics_AFF++;
			}else{
				neoebp_Clics_AFF = ((neoebp_Clics_AFF - 1) < 0)?0:(neoebp_Clics_AFF - 1);
			}
		break;
		case 99:
		break;
	}
	//si n_valor = -1 significa que debemos colocar todos los contdores en "0"
	if(n_Valor == -1)
	{
		neoebp_Clics_EPR = 0;
		neoebp_Clics_EES = 0;
		neoebp_Clics_EMN = 0;
		neoebp_Clics_EMC = 0;
		neoebp_Clics_AFN = 0;
		neoebp_Clics_AFF = 0;
	}
		
	//Guardamos los datos en la cookie
	sTextoValores = neoebp_Clics_EPR + "-" + neoebp_Clics_EES + "-" + neoebp_Clics_EMN + "-" + neoebp_Clics_EMC + "-";
	sTextoValores = sTextoValores + neoebp_Clics_AFN + "-" + neoebp_Clics_AFF;
	sTextoValores = sFechaDia + "-" + sTextoValores;
	sTextoValores = sTextoValores + "][" + ebp_data_clics_Act[1] + "][" + ebp_data_clics_Act[2] + "][";
	sTextoValores = sTextoValores + ebp_data_clics_Act[3] + "][" + ebp_data_clics_Act[4] + "][" + ebp_data_clics_Act[5];
	setCookie("ebp_data",sTextoValores,365);
	//Ahora debemos actualizar el total de clics que aparece en los botones
	var TextoAnuncio = "";		
		
	if(TipoBoton == 1)
    {
        TextoAnuncio = neoclics_Text_ADS_EPR + " (" + neoebp_ADS_EPR + "$) [" + neoebp_Clics_EPR + "]";
		Text_ADS_EPR.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EES + " (" + neoebp_ADS_EES + "$) [" + neoebp_Clics_EES + "]";
		Text_ADS_EES.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EMN + " (" + neoebp_ADS_EMN + "$) [" + neoebp_Clics_EMN + "]";
		Text_ADS_EMN.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EMC + " (" + neoebp_ADS_EMC + "$) [" + neoebp_Clics_EMC + "]";
		Text_ADS_EMC.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_AFN + " (" + neoebp_ADS_AFN + "$) [" + neoebp_Clics_AFN + "]";
		Text_ADS_AFN.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_AFF + " (" + neoebp_ADS_AFF + "$) [" + neoebp_Clics_AFF + "]";
		Text_ADS_AFF.nodeValue = TextoAnuncio;
		
		var totalclics = neoebp_Clics_EPR + neoebp_Clics_EES + neoebp_Clics_EMN + neoebp_Clics_EMC + neoebp_Clics_AFN + neoebp_Clics_AFF;
		TextoAnuncio = neoclics_Text_ADS_Clics + " [" + totalclics + "]";
		Text_ADS_Clics.nodeValue = TextoAnuncio;
		
    }else{
		TextoAnuncio = neoclics_Text_ADS_EPR + " [" + neoebp_Clics_EPR + "]";
		Text_ADS_EPR.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EES + " [" + neoebp_Clics_EES + "]";
		Text_ADS_EES.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EMN + " [" + neoebp_Clics_EMN + "]";
		Text_ADS_EMN.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EMC + " [" + neoebp_Clics_EMC + "]";
		Text_ADS_EMC.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_AFN + " [" + neoebp_Clics_AFN + "]";
		Text_ADS_AFN.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_AFF + " [" + neoebp_Clics_AFF + "]";
		Text_ADS_AFF.nodeValue = TextoAnuncio;
		
		var totalclics = neoebp_Clics_EPR + neoebp_Clics_EES + neoebp_Clics_EMN + neoebp_Clics_EMC + neoebp_Clics_AFN + neoebp_Clics_AFF;
		TextoAnuncio = neoclics_Text_ADS_Clics_2 + "  [" + totalclics + "]";
		Text_ADS_Clics.nodeValue = TextoAnuncio;
	}
	totalclics = (neoebp_Clics_EPR * neoebp_ADS_EPR) + (neoebp_Clics_EES * neoebp_ADS_EES) + (neoebp_Clics_EMN * neoebp_ADS_EMN);
	totalclics = totalclics + (neoebp_Clics_EMC * neoebp_ADS_EMC) + (neoebp_Clics_AFN * neoebp_ADS_AFN) + (neoebp_Clics_AFF * neoebp_ADS_AFF);
	var original=parseFloat(totalclics);
	var result = Math.round(original*1000)/1000;
	TextoAnuncio = neoclics_Text_ADS_Total + " [" + result + "$]";
	Text_ADS_Total.nodeValue = TextoAnuncio;
	//para el texto de la fecha la mostramos en el formato mm/dd/aaaa
	var posicion1 = sFechaDia.indexOf('M'); // Inicio el mes
	var posicion2 = sFechaDia.indexOf('A'); // Inicio del Año
	var porcion = sFechaDia.substring(posicion1+1,posicion2); // porcion que contiene el mes
    var strFecha_Text = porcion + "/" + sFechaDia.substring(1,posicion1) + "/" + sFechaDia.substring(posicion2 + 1);
	TextoAnuncio = strFecha_Text;
	Text_ADS_Fecha.nodeValue = TextoAnuncio;
}
//***********************************************************************************
//**** estas funciones llaman a la función para mostrar los clics de un día     *****
//**** diferente al actual														*****
//***********************************************************************************
function Muestra_Clics_Siguiente()
{
	Muestra_Clics(1);
}
function Muestra_Clics_Anterior()
{
	Muestra_Clics(0);
}
//***********************************************************************************
//**** esta funcion actualiza el texto de los botones con la información del    *****
//**** anterior o siguiente dependiendo del botón presionado					*****
//**** el total de clics para una fecha diferente a la actual NO pueden ser		*****
//**** modificados, solamente se puede modificar los datos del día actual		*****
//***********************************************************************************
function Muestra_Clics(n_Valor)
{
// Creamos las variables para ver el total de clics por tipo de anuncio
	var neoebp_Clics_EPR = 0;
	var neoebp_Clics_EES = 0;
	var neoebp_Clics_EMN = 0;
	var neoebp_Clics_EMC = 0;
	var neoebp_Clics_AFN = 0;
	var neoebp_Clics_AFF = 0;
	var sTextoValores = "";
	var anoActual = "";
	var mesActual = "";
	var diaActual = "";
	var sFechaDia = "";
	var sDatosDiaSelect = "";
	
	//Obtenemos la Fecha del boton de Fecha
	var neoebp_today = new Date(Text_ADS_Fecha.nodeValue);
	var milisegundos = parseInt(1*24*60*60*1000);//pasando 1 dia a milisegundos
	var tiempo = neoebp_today.getTime(); //obtenemos el valor en milisegundos de la fecha actual.
	//le sumamos o restamos 1 día a la fecha
	if(n_Valor > 0)
	{
		var total = neoebp_today.setTime(parseInt(tiempo + milisegundos)); //sumamos el día a la fecha
	}else{
		var total = neoebp_today.setTime(parseInt(tiempo - milisegundos)); //restamos el día a la fecha
	}
	//creamos la nueva fecha
	anoActual = "A" + neoebp_today.getFullYear();
	mesActual = "M" + (neoebp_today.getMonth()+1);
	diaActual = "D" + neoebp_today.getDate();
	sFechaDia =  diaActual + mesActual + anoActual;
	//obtenemos la información de los clics del cookie
    var DataActual = getCookie("ebp_data");
	var ebp_data_clics_Act = DataActual.split("][");
	var ebp_data_clics = ebp_data_clics_Act[0].split("-");
	//Verificamos si la fecha solicitada existe, buscamos los clics para ese día y actualizamos el texto de los botones
	if(ebp_data_clics[0] == sFechaDia)
	{
		sDatosDiaSelect = ebp_data_clics_Act[0];
	}else{
		ebp_data_clics = ebp_data_clics_Act[1].split("-");
		if(ebp_data_clics[0] == sFechaDia)
		{
			sDatosDiaSelect = ebp_data_clics_Act[1];
		}else{
			ebp_data_clics = ebp_data_clics_Act[2].split("-");
			if(ebp_data_clics[0] == sFechaDia)
			{
				sDatosDiaSelect = ebp_data_clics_Act[2];
			}else{
				ebp_data_clics = ebp_data_clics_Act[3].split("-");
				if(ebp_data_clics[0] == sFechaDia)
				{
					sDatosDiaSelect = ebp_data_clics_Act[3];
				}else{
					ebp_data_clics = ebp_data_clics_Act[4].split("-");
					if(ebp_data_clics[0] == sFechaDia)
					{
						sDatosDiaSelect = ebp_data_clics_Act[4];
					}else{
						sDatosDiaSelect = sFechaDia + "-0-0-0-0-0-0";
					}
				}
			}
		}
	}
	
	ebp_data_clics = sDatosDiaSelect.split("-");
	neoebp_Clics_EPR = parseFloat(ebp_data_clics[1]);
	neoebp_Clics_EES = parseFloat(ebp_data_clics[2]);
	neoebp_Clics_EMN = parseFloat(ebp_data_clics[3]);
	neoebp_Clics_EMC = parseFloat(ebp_data_clics[4]);
	neoebp_Clics_AFN = parseFloat(ebp_data_clics[5]);
	neoebp_Clics_AFF = parseFloat(ebp_data_clics[6]);
	
	//Ahora debemos actualizar el total de clics que aparece en los botones
	var TextoAnuncio = "";
	
	if(TipoBoton == 1)
    {
		TextoAnuncio = neoclics_Text_ADS_EPR + " (" + neoebp_ADS_EPR + "$) [" + neoebp_Clics_EPR + "]";
		Text_ADS_EPR.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EES + " (" + neoebp_ADS_EES + "$) [" + neoebp_Clics_EES + "]";
		Text_ADS_EES.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EMN + " (" + neoebp_ADS_EMN + "$) [" + neoebp_Clics_EMN + "]";
		Text_ADS_EMN.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EMC + " (" + neoebp_ADS_EMC + "$) [" + neoebp_Clics_EMC + "]";
		Text_ADS_EMC.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_AFN + " (" + neoebp_ADS_AFN + "$) [" + neoebp_Clics_AFN + "]";
		Text_ADS_AFN.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_AFF + " (" + neoebp_ADS_AFF + "$) [" + neoebp_Clics_AFF + "]";
		Text_ADS_AFF.nodeValue = TextoAnuncio;
		
		var totalclics = neoebp_Clics_EPR + neoebp_Clics_EES + neoebp_Clics_EMN + neoebp_Clics_EMC + neoebp_Clics_AFN + neoebp_Clics_AFF;
		TextoAnuncio = neoclics_Text_ADS_Clics + " [" + totalclics + "]";
		Text_ADS_Clics.nodeValue = TextoAnuncio;
    }else{
		
		TextoAnuncio = neoclics_Text_ADS_EPR + " [" + neoebp_Clics_EPR + "]";
		Text_ADS_EPR.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EES + " [" + neoebp_Clics_EES + "]";
		Text_ADS_EES.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EMN + " [" + neoebp_Clics_EMN + "]";
		Text_ADS_EMN.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_EMC + " [" + neoebp_Clics_EMC + "]";
		Text_ADS_EMC.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_AFN + " [" + neoebp_Clics_AFN + "]";
		Text_ADS_AFN.nodeValue = TextoAnuncio;
		
		TextoAnuncio = neoclics_Text_ADS_AFF + " [" + neoebp_Clics_AFF + "]";
		Text_ADS_AFF.nodeValue = TextoAnuncio;
		
		var totalclics = neoebp_Clics_EPR + neoebp_Clics_EES + neoebp_Clics_EMN + neoebp_Clics_EMC + neoebp_Clics_AFN + neoebp_Clics_AFF;
		TextoAnuncio = neoclics_Text_ADS_Clics_2 + "  [" + totalclics + "]";
		Text_ADS_Clics.nodeValue = TextoAnuncio;
	}
	
	totalclics = (neoebp_Clics_EPR * neoebp_ADS_EPR) + (neoebp_Clics_EES * neoebp_ADS_EES) + (neoebp_Clics_EMN * neoebp_ADS_EMN);
	totalclics = totalclics + (neoebp_Clics_EMC * neoebp_ADS_EMC) + (neoebp_Clics_AFN * neoebp_ADS_AFN) + (neoebp_Clics_AFF * neoebp_ADS_AFF);
	var original=parseFloat(totalclics);
	var result=Math.round(original*1000)/1000;
	TextoAnuncio = neoclics_Text_ADS_Total + " [" + result + "$]";
	Text_ADS_Total.nodeValue = TextoAnuncio;
	//actualizamos la fecha del boton de fecha, en el formato MM/DD/YYYY
	var posicion1 = sFechaDia.indexOf('M'); // Inicio el mes
	var posicion2 = sFechaDia.indexOf('A'); // Inicio del Año
	var porcion = sFechaDia.substring(posicion1+1,posicion2); // porcion que contiene el mes
    var strFecha_Text = porcion + "/" + sFechaDia.substring(1,posicion1) + "/" + sFechaDia.substring(posicion2 + 1);
	TextoAnuncio = strFecha_Text;
	Text_ADS_Fecha.nodeValue = TextoAnuncio;
}
//***********************************************************************************
//**** esta funcion la usamos para pasar los datos de los clics a una ventana	*****
//**** nueva y que desde allí podamos copiar los datos como nosotros queramos	*****
//***********************************************************************************
function CopiarTextoClics() {
	// definicion de una ventana en formato cadena
	// para escribirla en la ventana que creamos con open
	var posicion1 = 0;
	var posicion2 = 1;
	var porcion = "";
	var mitexto = "";
	
	posicion1 = Text_ADS_EPR.nodeValue.indexOf('['); 
	posicion2 = Text_ADS_EPR.nodeValue.indexOf(']'); 
	porcion = Text_ADS_EPR.nodeValue.substring(posicion1+1,posicion2); 
	mitexto = 'Anuncios Prolongados:' + porcion + '\n';
	
	posicion1 = Text_ADS_EES.nodeValue.indexOf('[');
	posicion2 = Text_ADS_EES.nodeValue.indexOf(']'); 
	porcion = Text_ADS_EES.nodeValue.substring(posicion1+1,posicion2); 
	mitexto = mitexto + 'Anuncios Normais:' + porcion + '\n';
	
	posicion1 = Text_ADS_EMN.nodeValue.indexOf('[');
	posicion2 = Text_ADS_EMN.nodeValue.indexOf(']'); 
	porcion = Text_ADS_EMN.nodeValue.substring(posicion1+1,posicion2); 
	mitexto = mitexto + 'Anuncios Mini:' + porcion + '\n';
	
	posicion1 = Text_ADS_EMC.nodeValue.indexOf('[');
	posicion2 = Text_ADS_EMC.nodeValue.indexOf(']'); 
	porcion = Text_ADS_EMC.nodeValue.substring(posicion1+1,posicion2); 
	mitexto = mitexto + 'Anuncios Micro:' + porcion + '\n';
	
	posicion1 = Text_ADS_AFN.nodeValue.indexOf('[');
	posicion2 = Text_ADS_AFN.nodeValue.indexOf(']'); 
	porcion = Text_ADS_AFN.nodeValue.substring(posicion1+1,posicion2); 
	mitexto = mitexto + 'Anuncios Fixo Laranja:' + porcion + '\n';
	
	posicion1 = Text_ADS_AFF.nodeValue.indexOf('[');
	posicion2 = Text_ADS_AFF.nodeValue.indexOf(']'); 
	porcion = Text_ADS_AFF.nodeValue.substring(posicion1+1,posicion2); 
	mitexto = mitexto + 'Anuncios Fixo Rosa:' + porcion + '\n';
		
	//obtenemos el campo de los datos y le pasamos los mismos
	var ebpTextAreaDatos = document.getElementById('neoclics_export_field'); 
	ebpTextAreaDatos.innerHTML = mitexto;
	
	var el = document.getElementById('neoclics_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display, que oculta o muestra el div	
	var ebpdivDatos = document.getElementById('neoclicsebp_export_window'); //se define la variable "ebpdivDatos" igual a nuestro div interno
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display, que oculta o muestra el div
}
//***********************************************************************************
//**** esta funcion agrega los botones en la página, el tamaño y forma de los   *****
//**** botones va a depender si son el tipo 1 o tipo 2 (eso depende del tamaño	*****
//**** horizontal de la pantalla, esto es para que los botones en resoluciones	*****
//**** de 1024 se vean bien														*****
//***********************************************************************************
function add_buttons()
{   
	//Creamos los Botones
    var button_ADS_EPR = document.createElement('span');
	var button_ADS_EES = document.createElement('span');
	var button_ADS_EMN = document.createElement('span');
	var button_ADS_EMC = document.createElement('span');
	var button_ADS_AFN = document.createElement('span');
	var button_ADS_AFF = document.createElement('span');
	var button_ADS_Total = document.createElement('span');
	var button_ADS_Clics = document.createElement('span');
	var button_ADS_Fecha = document.createElement('span');
	var button_Espacio = 44;
	var button_Espacio_Fecha = 44;
	var button_Alinea_Izq = 152;
	var tmp_pix = 0;
	var tmp_pix_2 = 0;
	var tmp_pix_Gen = 0;
	var button_ADS_EPR_2 = document.createElement('span');
	var button_ADS_EES_2 = document.createElement('span');
	var button_ADS_EMN_2 = document.createElement('span');
	var button_ADS_EMC_2 = document.createElement('span');
	var button_ADS_AFN_2 = document.createElement('span');
	var button_ADS_AFF_2 = document.createElement('span');
	var button_ADS_Total_2 = document.createElement('span');
	var button_ADS_Fecha_Mas = document.createElement('span');
	var button_ADS_Fecha_Menos = document.createElement('span');
	var Tam = TamVentana();  
	//verificamos el tamaño de la pantalla
	if(Tam[0] > 1204)
    {
        var css_button_common = css_button_General;
		var css_button_total = css_button_Adicional;
		var css_button_FechaFin = css_button_Adicional;
		var Espacio_Grupos = 34;
		tmp_pix_Gen = bottom_pix;
    }else{
		var css_button_common = css_button_General_2;
		var css_button_total = css_button_General_2;
		var css_button_FechaFin = css_button_Fecha;
		var Espacio_Grupos = 8;
		TipoBoton = 22;
		button_Espacio = 45;
		button_Espacio_Fecha = 25;
		button_Alinea_Izq = 39;
		tmp_pix_Gen = bottom_pix_2;
	}
			
	var css_AFF_button = css_button_common
      + 'background-color:#FF00FF;bottom:' + tmp_pix_Gen.toString() + 'px;';
	
	tmp_pix = tmp_pix_Gen + button_Espacio + 15;
    var css_AFN_button = css_button_common
      + 'background-color:#DDAA00;bottom:' + tmp_pix.toString() + 'px;';
	
	//boton pequeño para restar uno a los anuncios AFF,alineado a la derecha
	tmp_pix_2 = tmp_pix - 15;
	var css_AFF_button_2 = css_button_Pequeno
      + 'right:3px; background-color:#FF00FF;bottom:' + tmp_pix_2.toString() + 'px;';
	
	//boton pequeño para restar uno a los anuncios AFN, alineado a la izquierda
    var css_AFN_button_2 = css_button_Pequeno
      + 'right:' + button_Alinea_Izq.toString()  + 'px; background-color:#DDAA00;bottom:' + tmp_pix_2.toString() + 'px;';
	 
    tmp_pix = tmp_pix + button_Espacio;
    var css_EMC_button = css_button_common
      + 'background-color:#808080;bottom:' + tmp_pix.toString() + 'px;';
	
	tmp_pix = tmp_pix + button_Espacio + 15; 
    var css_EMN_button = css_button_common
      + 'background-color:#0080FF;bottom:' + tmp_pix.toString() + 'px;';
	  
	//boton pequeño para restar uno a los anuncios EMC,alineado a la derecha
	tmp_pix_2 = tmp_pix - 15;
	var css_EMC_button_2 = css_button_Pequeno
      + 'right:3px; background-color:#808080;bottom:' + tmp_pix_2.toString() + 'px;';
	
	//boton pequeño para restar uno a los anuncios EMN, alineado a la izquierda
    var css_EMN_button_2 = css_button_Pequeno
      + 'right:' + button_Alinea_Izq.toString()  + 'px; background-color:#0080FF;bottom:' + tmp_pix_2.toString() + 'px;';
	  
	tmp_pix = tmp_pix + button_Espacio;
    var css_EES_button = css_button_common
      + 'background-color:#008000;bottom:' + tmp_pix.toString() + 'px;';
	
	tmp_pix = tmp_pix + button_Espacio + 15;
    var css_EPR_button = css_button_common
      + 'background-color:#008000;bottom:' + tmp_pix.toString() + 'px;';
	//boton pequeño para restar uno a los anuncios EES,alineado a la derecha
	tmp_pix_2 = tmp_pix - 15;
	var css_EES_button_2 = css_button_Pequeno
      + 'right:3px; background-color:#008000;bottom:' + tmp_pix_2.toString() + 'px;';
	
	//boton pequeño para restar uno a los anuncios EPR, alineado a la izquierda
    var css_EPR_button_2 = css_button_Pequeno
      + 'right:' + button_Alinea_Izq.toString()  + 'px; background-color:#008000;bottom:' + tmp_pix_2.toString() + 'px;';
	
	//estos son los botones que muestran el total clics y el total ganado
	tmp_pix = tmp_pix_Gen - (button_Espacio + Espacio_Grupos);
	var css_Clics_button = css_button_total
      + 'background-color:#000000;bottom:' + tmp_pix.toString() + 'px;';
	
	tmp_pix = tmp_pix - (button_Espacio);
    var css_Total_button = css_button_total
      + 'background-color:#000000;bottom:' + tmp_pix.toString() + 'px;';
	
	//boton pequeño para llevar todos los contadores a 0
	tmp_pix_2 = tmp_pix - 15;
	var css_Total_button_2 = css_button_Pequeno
      + 'right:3px; background-color:#000000;bottom:' + tmp_pix_2.toString() + 'px;';
	
	tmp_pix = tmp_pix - (button_Espacio_Fecha + 15);
    var css_Fecha_button = css_button_FechaFin
      + 'background-color:#000000;bottom:' + tmp_pix.toString() + 'px;';
	  
	//boton pequeño para sumar uno a la fecha mostrada y cargar los datos de esa fecha
	tmp_pix_2 = tmp_pix - 15;
	var css_Fecha_button_Mas = css_button_Pequeno
      + 'right:3px; background-color:#00CC00;bottom:' + tmp_pix_2.toString() + 'px;';
	
	//boton pequeño para restar uno a la fecha mostrada y cargar los datos de esa fecha
    var css_Fecha_button_Menos = css_button_Pequeno
      + 'right:' + button_Alinea_Izq.toString()  + 'px; background-color:#FF0000;bottom:' + tmp_pix_2.toString() + 'px;';
	
	var TextoSpan = "";
	var SaltoLinea = document.createElement("br");
	//dependiendo del tipo de boton, colocaremos el texto en los botones
	if(TipoBoton == 1)
    {
        TextoSpan = neoclics_Text_ADS_EPR + " (" + neoebp_ADS_EPR + ")";
		Text_ADS_EPR = document.createTextNode(TextoSpan);
		button_ADS_EPR.appendChild(Text_ADS_EPR);
		
		TextoSpan = neoclics_Text_ADS_EES + " (" + neoebp_ADS_EES + ")";
		Text_ADS_EES = document.createTextNode(TextoSpan);
		button_ADS_EES.appendChild(Text_ADS_EES);
		
		TextoSpan = neoclics_Text_ADS_EMN + " (" + neoebp_ADS_EMN + ")";
		Text_ADS_EMN = document.createTextNode(TextoSpan);
		button_ADS_EMN.appendChild(Text_ADS_EMN);
		
		TextoSpan = neoclics_Text_ADS_EMC + " (" + neoebp_ADS_EMC + ")";
		Text_ADS_EMC = document.createTextNode(TextoSpan);
		button_ADS_EMC.appendChild(Text_ADS_EMC);
		
		TextoSpan = neoclics_Text_ADS_AFN + " (" + neoebp_ADS_AFN + ")";
		Text_ADS_AFN = document.createTextNode(TextoSpan);
		button_ADS_AFN.appendChild(Text_ADS_AFN);
		
		TextoSpan = neoclics_Text_ADS_AFF + " (" + neoebp_ADS_AFF + ")";
		Text_ADS_AFF = document.createTextNode(TextoSpan);
		button_ADS_AFF.appendChild(Text_ADS_AFF);
		
		TextoSpan = neoclics_Text_ADS_Clics + " [0]";
		Text_ADS_Clics = document.createTextNode(TextoSpan);
		button_ADS_Clics.appendChild(Text_ADS_Clics);
		
		TextoSpan = neoclics_Text_ADS_Total + " [0]";
		Text_ADS_Total = document.createTextNode(TextoSpan);
		button_ADS_Total.appendChild(Text_ADS_Total);
    }else{
		TextoSpan = neoclics_Text_ADS_EPR + " [0]";
		Text_ADS_EPR = document.createTextNode(TextoSpan);
		//button_ADS_EPR.appendChild(SaltoLinea);
		button_ADS_EPR.appendChild(Text_ADS_EPR);
		
		TextoSpan = neoclics_Text_ADS_EES + " [0]";
		Text_ADS_EES = document.createTextNode(TextoSpan);
		//button_ADS_EES.appendChild(SaltoLinea);
		button_ADS_EES.appendChild(Text_ADS_EES);
		
		TextoSpan = neoclics_Text_ADS_EMN + " [0]";
		Text_ADS_EMN = document.createTextNode(TextoSpan);
		//button_ADS_EMN.appendChild(SaltoLinea);
		button_ADS_EMN.appendChild(Text_ADS_EMN);
		
		TextoSpan = neoclics_Text_ADS_EMC + " [0]";
		Text_ADS_EMC = document.createTextNode(TextoSpan);
		//button_ADS_EMC.appendChild(SaltoLinea);
		button_ADS_EMC.appendChild(Text_ADS_EMC);
		
		TextoSpan = neoclics_Text_ADS_AFN + " [0]";
		Text_ADS_AFN = document.createTextNode(TextoSpan);
		//button_ADS_AFN.appendChild(SaltoLinea);
		button_ADS_AFN.appendChild(Text_ADS_AFN);
		
		TextoSpan = neoclics_Text_ADS_AFF + " [0]";
		Text_ADS_AFF = document.createTextNode(TextoSpan);
		//button_ADS_AFF.appendChild(SaltoLinea);
		button_ADS_AFF.appendChild(Text_ADS_AFF);
		
		TextoSpan = neoclics_Text_ADS_Clics_2 + "  [0]";
		Text_ADS_Clics = document.createTextNode(TextoSpan);
		//button_ADS_Clics.appendChild(SaltoLinea);
		button_ADS_Clics.appendChild(Text_ADS_Clics);
		
		TextoSpan = neoclics_Text_ADS_Total + " [0]";
		Text_ADS_Total = document.createTextNode(TextoSpan);
		//button_ADS_Total.appendChild(SaltoLinea);
		button_ADS_Total.appendChild(Text_ADS_Total);
	}
	
	TextoSpan = neoclics_Text_ADS_Fecha;
	Text_ADS_Fecha = document.createTextNode(TextoSpan);
	button_ADS_Fecha.appendChild(Text_ADS_Fecha);
	
	button_ADS_EPR.style.cssText = css_EPR_button;
	button_ADS_EES.style.cssText = css_EES_button;
	button_ADS_EMN.style.cssText = css_EMN_button;
	button_ADS_EMC.style.cssText = css_EMC_button;
	button_ADS_AFN.style.cssText = css_AFN_button;
	button_ADS_AFF.style.cssText = css_AFF_button;
	button_ADS_Clics.style.cssText = css_Clics_button;
	button_ADS_Total.style.cssText = css_Total_button;
	button_ADS_AFF_2.style.cssText = css_AFF_button_2;
	button_ADS_AFN_2.style.cssText = css_AFN_button_2;
	button_ADS_EMC_2.style.cssText = css_EMC_button_2;
	button_ADS_EMN_2.style.cssText = css_EMN_button_2;
	button_ADS_EPR_2.style.cssText = css_EPR_button_2;
	button_ADS_EES_2.style.cssText = css_EES_button_2;
	button_ADS_Total_2.style.cssText = css_Total_button_2;
	button_ADS_Fecha.style.cssText = css_Fecha_button;
	//si son botones del tipo 2 (pequeños), cambiamos el tamaño del texto
	//del botón de fecha ya que de lo contrario no se vería bien en la
	//pantalla
	if(TipoBoton != 1)
	{
		button_ADS_Fecha.style.fontSize = 8+'px';
	}
	button_ADS_Fecha_Mas.style.cssText = css_Fecha_button_Mas;
	button_ADS_Fecha_Menos.style.cssText = css_Fecha_button_Menos;
	
    button_ADS_EPR.addEventListener('click', Guarda_Clics_EPR, false);
    button_ADS_EES.addEventListener('click', Guarda_Clics_EES, false);
	button_ADS_EMN.addEventListener('click', Guarda_Clics_EMN, false);
    button_ADS_EMC.addEventListener('click', Guarda_Clics_EMC, false);
	button_ADS_AFN.addEventListener('click', Guarda_Clics_AFN, false);
    button_ADS_AFF.addEventListener('click', Guarda_Clics_AFF, false);
	
	button_ADS_EPR_2.addEventListener('click', Guarda_Clics_EPR_Menos, false);
    button_ADS_EES_2.addEventListener('click', Guarda_Clics_EES_Menos, false);
	button_ADS_EMN_2.addEventListener('click', Guarda_Clics_EMN_Menos, false);
    button_ADS_EMC_2.addEventListener('click', Guarda_Clics_EMC_Menos, false);
	button_ADS_AFN_2.addEventListener('click', Guarda_Clics_AFN_Menos, false);
    button_ADS_AFF_2.addEventListener('click', Guarda_Clics_AFF_Menos, false);
	button_ADS_Total_2.addEventListener('click', Guarda_Clics_All_Menos, false);
	button_ADS_Fecha.addEventListener('click', CopiarTextoClics, false);
	button_ADS_Fecha_Mas.addEventListener('click', Muestra_Clics_Siguiente, false);
	button_ADS_Fecha_Menos.addEventListener('click', Muestra_Clics_Anterior, false);
	
    document.body.appendChild(button_ADS_EPR);
    document.body.appendChild(button_ADS_EES);
	document.body.appendChild(button_ADS_EMN);
    document.body.appendChild(button_ADS_EMC);
	document.body.appendChild(button_ADS_AFN);
    document.body.appendChild(button_ADS_AFF);
	document.body.appendChild(button_ADS_Clics);
	document.body.appendChild(button_ADS_Total);
	document.body.appendChild(button_ADS_AFF_2);
	document.body.appendChild(button_ADS_AFN_2);
	document.body.appendChild(button_ADS_EMC_2);
	document.body.appendChild(button_ADS_EMN_2);
	document.body.appendChild(button_ADS_EPR_2);
    document.body.appendChild(button_ADS_EES_2);
	document.body.appendChild(button_ADS_Total_2);
	document.body.appendChild(button_ADS_Fecha);
	document.body.appendChild(button_ADS_Fecha_Mas);
	document.body.appendChild(button_ADS_Fecha_Menos);

		//despues de crear los botones, actualizamos el texto de cada uno
	Guarda_Clics_All();
	//obtenemos la informacion sobre la hora de reseteo de los contadores
    var DataActual = getCookie("ebp_data");
	var ebp_data_clics_Act = DataActual.split("][");
	var neoclicsebp_settings_checked = ebp_data_clics_Act[5]
	var sOptionChecked = (neoclicsebp_settings_checked==1)?"checked":"";
	
	//Creamos el Div para los datos a exportar
	var d = document.createElement('div');
	d.setAttribute('id','neoclics_options_window');
	d.setAttribute('style','position: fixed; top: 100px; text-align: center; width: 100%; display: none;');
	d.innerHTML = '<div style="width: 200px; height: 200px; margin: 0 auto; background: #FFF; border: 1px solid #333; padding: 10px; display: none;" id="neoclicsebp_export_window"><table><tr><td><img src="http://c.nbx.bz/imagens/texto_32.png" width="26" border="0" /></td><td style="font-size: 14px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: left;" width="200">NeoCliques</td><td id="neoClics_export_close" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="190">Fechar</td></tr></table><textarea style="width: 190px; height: 135px;" id="neoclics_export_field" onMouseOver="this.select();" onMouseUp="this.select();" onMouseDown="this.select();"></textarea><table><tr><td style="font-size: 9px; font-weight: bold; font-family: Arial; text-align: right; cursor: pointer;">' + ebp_TextMensL1 + '</td><td><input id="neoclicsebp_settings" type="checkbox" name="neoclicsebp_settings" value="1" '+sOptionChecked+'/></td></tr></table></div>';
	
	// Lo insertas al final del body
	document.body.appendChild(d); 
	//agregamos las funciones para cerrar (ocultar) el div 
	var neoclicsbcierra = document.getElementById("neoClics_export_close");
	neoclicsbcierra.addEventListener('click', NeoClics_Datos_Cerrar, false);
	
	var ebpbOpciones = document.getElementById("neoclicsebp_settings");
	ebpbOpciones.addEventListener('click', EBP_Opciones_CheckBox, false);
		
}
//***********************************************************************************
//****esta función guarda la opcion de reseto de los clics						*****
//***********************************************************************************
function EBP_Opciones_CheckBox()
{
	var nbo_opt_checked = (document.getElementById('neoclicsebp_settings').checked)?1:0
	
	//obtenemos la información de los clics del cookie
    var DataActual = getCookie("ebp_data");
	var ebp_data_clics_Act = DataActual.split("][");
	//Guardamos los datos en la cookie
	var sTextoValores = ebp_data_clics_Act[0] + "][" + ebp_data_clics_Act[1] + "][" + ebp_data_clics_Act[2] + "][";
	sTextoValores = sTextoValores + ebp_data_clics_Act[3] + "][" + ebp_data_clics_Act[4] + "][" + nbo_opt_checked;
	setCookie("ebp_data",sTextoValores,365);
	
}
//***********************************************************************************
//****esta función oculta el div que contiene los datos a exportar				*****
//***********************************************************************************
function NeoClics_Datos_Cerrar()
{
	var ebpdivDatos = document.getElementById('neoclics_options_window'); //se define la variable "el" igual a nuestro div
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
	var el = document.getElementById('neoclicsebp_export_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}

add_buttons();