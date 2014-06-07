// ==UserScript==
// @name        MiniJobs_Ranking_CR
// @namespace   by_Bigpetroman
// @description Rankig de MiniJobs de CristianRef 
// @include     http://www.neobux.com/forum/?/1/301124/*
// @include     http://www.neobux.com/forum/?/48/344435/*
// @version     2
// ==/UserScript==

//Con esta línea, estamos declarando una función llamada trim() en la clase String, esto es para eliminar
//los espacios al inicio y final de cada linea
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };

//var bottom_pix para determinar la posición de los botones, 
var bottom_pix = window.innerHeight/2;
var bottom_pix_2 = window.innerHeight/2; 
//esta variable la colocamos en 2 si la resolucion horizontal de la ventana es menor a 1205
var TipoBoton = 1;

// common button style, estas variables permiten determinar la forma, color, tamaño, etc, de los botones
var css_button_General = 'cursor:pointer;width:140px; height:32px; -moz-border-radius:20px; -webkit-border-radius:20px; color:#fff;  line-height:32px; text-align:center; position:fixed;right:3px;';
// common button style; para los botones pequeños cuando la pantalla tiene un ancho menor a 1204
var css_button_General_2 = 'cursor:pointer;width:56px; height:32px; -moz-border-radius:20px; color:#fff; line-height:32px; text-align:center; position:fixed;right:3px;';

//estas variables es para cambiar las palabras ayer y hoy por su fecha respectiva
var sFechaHoyIng = "Today";
var sFechaHoyEsp = "Hoy";
var sFechaAyerEsp = "Ayer";
var ebp_isToday_all = null;
var ebp_isToday = null;
var ebp_isYesterday = null;
var ebp_isYesterday_all = null;
var ebp_isYesterday_all_Adic = null;
var ebp_isToday_all_Adic = null;
var ebp_IniGeneral = null;
var ebp_Achievements = null;

//estos son los datos a obtener de cada mensaje
var ebp_NumPost = 0;
var ebp_Nombre = "";
var ebp_Membrecia = "";
var ebp_Fecha = "";
var ebp_TipoUser = "";
var ebp_Contry = "";
var ebp_MiniJobs = 0;
var ebp_Bonus = 0;
var ebp_Comision = 0;
var Achievements = "";	
var Porcentaje = 0;
var Tot_MiniJobs = 0;
var Puntos = 0;

var ebp_LinkPost = 0;
var mitexto = "";

ebp_isToday_all = "Today;Hoy;Hoje;Σήμερα;Hari ini;Tänään;Idag;Heute;Aujourd'hui";
ebp_isYesterday_all = "Yesterday;Ayer;Ontem;Χθες;Kemarin;Eilen;Igår;Gestern;Hier";
ebp_isToday_all_Adic = "today;hoy";
ebp_isYesterday_all_Adic = "yesterday;ayer";
ebp_IniGeneral = "update";
ebp_Achievements = "bronze;gold;silver;dedicated;sentiment;sharpshooter;wordsmith"

ebp_isToday = "Today";
ebp_isYesterday = "Yesterday";
   
//***********************************************************************************
//****funcion para eliminar cualquier codigo html de una cadena de texto		*****
//***********************************************************************************
function stripHTML(cadena)
{
	var cadena_temp = "";
	cadena_temp = cadena.replace(/<[^>]+>/g,'');
	cadena_temp = cadena_temp.replace(/\[/g,'<');
	cadena_temp = cadena_temp.replace(/\]/g,'>');
	cadena_temp = cadena_temp.replace(/<[^>]+>/g,'');
	return cadena_temp;
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
//****esta función es para regresar un dato tipo fecha en caso de que la fecha  *****
//****tenga el texto ayer o hoy													*****
//***********************************************************************************
function EBP_Retorna_Fecha(sTextoFechaOriginal, d_FechaActual, ntipo)
{
	//tenemos la fecha del día
	if(ntipo == 1)
	{
		var neolfebp_Fecha = new Date(d_FechaActual);
	}else{
		var neolfebp_Fecha = new Date();
	}
	
	var neolfFecha = new Date();
	var milisegundos = parseInt(1*24*60*60*1000);
	
	var posicion1 = sTextoFechaOriginal.indexOf(' ');
	sTextoFecha = sTextoFechaOriginal.substring(0,posicion1);
	sTextoFecha = sTextoFecha.trim();
	
	if(ebp_isYesterday_all.indexOf(sTextoFecha) != -1 || ebp_isYesterday_all_Adic.indexOf(sTextoFecha) != -1)
	{
		//obtenemos el valor en milisegundos de la fecha actual.
		var tiempo = neolfebp_Fecha.getTime();
		//Ajustamos la fecha Tempo al día
		var total = neolfFecha.setTime(tiempo);
		//restamos un día a la fecha
		var total = neolfFecha.setTime(parseInt(tiempo - milisegundos)); 
		
		if(neolfFecha.getDate() < 10)
		{
			var sTextDia = "0" + neolfFecha.getDate();
		}else{
			var sTextDia = neolfFecha.getDate();
		}
		if(neolfFecha.getMonth() < 9)
		{
			var sTextMes = "0" + (neolfFecha.getMonth() + 1);
		}else{
			var sTextMes = (neolfFecha.getMonth() + 1);
		}
		
		var sTextFecha = neolfFecha.getFullYear() + '/' + sTextMes + '/' + sTextDia;
		posicion1 = sTextoFechaOriginal.indexOf(':');
		posicion1 = posicion1 - 2;
		sTextoFecha = sTextoFechaOriginal.substring(posicion1);
		sTextoFecha = sTextoFecha.trim();
		sTextoFecha = sTextFecha + " " + sTextoFecha;
	}else{
		if(ebp_isToday_all.indexOf(sTextoFecha) != -1 || ebp_isToday_all_Adic.indexOf(sTextoFecha) != -1)
		{
			//obtenemos el valor en milisegundos de la fecha actual.
			var tiempo = neolfebp_Fecha.getTime();
			//Ajustamos la fecha Tempo al día
			var total = neolfFecha.setTime(tiempo);
			if(neolfFecha.getDate() < 10)
			{
				var sTextDia = "0" + neolfFecha.getDate();
			}else{
				var sTextDia = neolfFecha.getDate();
			}
			if(neolfFecha.getMonth() < 9)
			{
				var sTextMes = "0" + (neolfFecha.getMonth() + 1);
			}else{
				var sTextMes = (neolfFecha.getMonth() + 1);
			}
			
			var sTextFecha = neolfFecha.getFullYear() + '/' + sTextMes + '/' + sTextDia;
			posicion1 = sTextoFechaOriginal.indexOf(':');
			posicion1 = posicion1 - 2;
			sTextoFecha = sTextoFechaOriginal.substring(posicion1);
			sTextoFecha = sTextoFecha.trim();
			sTextoFecha = sTextFecha + " " + sTextoFecha;
		}else{
			//como ya es una fecha, simplemente quitamos la palabra "a las"
			posicion1 = sTextoFechaOriginal.indexOf(':');
			posicion1 = posicion1 - 2;
			sTextoFecha = sTextoFechaOriginal.substring(posicion1);
			sTextoFecha = sTextoFecha.trim();
			var sTextFecha = sTextoFechaOriginal.substring(0,10);
			sTextoFecha = sTextFecha + " " + sTextoFecha;
		}
	}
	return sTextoFecha;
}
//***********************************************************************************
//**** Leemos la información de la página del tema								*****
//***********************************************************************************
function EBP_Leer_Topic()
{
	//tenemos la fecha del día
	var neolfebp_Fecha = new Date();
	var neolfFecha = new Date();
	var milisegundos = parseInt(1*24*60*60*1000);
						
	//Obtenemos la tabla de los mensajes
	var EBP_TablaMs = document.documentElement.innerHTML;
	var posicion1 = EBP_TablaMs.indexOf('document.write(f_ff');
	var posicion2 = EBP_TablaMs.indexOf(',]))</script>');
	EBP_TablaMs = EBP_TablaMs.substring(posicion1+21,posicion2);
    
	//obtenemos cada uno de los mensajes
	var EBP_Mensajes = EBP_TablaMs.split("],[");
	var EBP_SubMensaje = "";
	var EBP_SubMensaje_Indiv = "";
	var EBP_SubMensaje_Membre = "";
	
	for(var i=0; i<EBP_Mensajes.length; i++)
    {
		EBP_SubMensaje = EBP_Mensajes[i].split("','");
		for(var j=0; j<EBP_SubMensaje.length; j++)
		{
			EBP_SubMensaje_Indiv = EBP_SubMensaje[j].split(",");
			switch(j)
			{
				case 0: //obtenemos el link y el usuario
					ebp_LinkPost = EBP_SubMensaje_Indiv[1];
					ebp_Nombre = EBP_SubMensaje_Indiv[2];
					ebp_Nombre = ebp_Nombre.replace(/'/g, '');
				break;
				case 1: //obtenemos el país
					ebp_Contry = EBP_SubMensaje_Indiv[2];
					ebp_Contry = ebp_Contry.replace(/'/g, '');			
				break;
				case 2: //obtenemos la membresia y la fecha
					// //dividimos el texto por '
					EBP_SubMensaje_Membre = EBP_SubMensaje[j].split("'");
					
					ebp_Membrecia = EBP_SubMensaje_Membre[2];
					ebp_Membrecia = ebp_Membrecia.replace(/'/g, '');
					ebp_Fecha = EBP_SubMensaje_Membre[4];
					ebp_Fecha = ebp_Fecha.replace(/'/g, '');
					//ebp_Fecha = ebp_Fecha.replace(" a las", '');
					//ebp_Fecha = ebp_Fecha.replace(" at", '');
					//obtenemos la fecha de creacion del mensaje
					ebp_Fecha = EBP_Retorna_Fecha(ebp_Fecha, neolfebp_Fecha, 0);
				break;
				case 6: //obtenemos el número del post y los datos reportados por los usuarios
					
					ebp_NumPost = EBP_SubMensaje_Indiv[EBP_SubMensaje_Indiv.length-2];
					
					var ebp_TextMensaje = "";
					for(var h=0; h<EBP_SubMensaje_Indiv.length-2; h++)
					{
						ebp_TextMensaje = ebp_TextMensaje + EBP_SubMensaje_Indiv[h] + ", "; 	
					}
					
					if(i==EBP_Mensajes.length)
					{
						alert(ebp_TextMensaje);
						end;
					}
					EBP_Obtiene_Datos(ebp_TextMensaje);
				break;
				default:
				break;
			}
		}
	}
	
	//obtenemos el campo de los datos y le pasamos los mismos
	
	var ebpTextAreaDatos = document.getElementById('MiniJobs_export_field'); 
	ebpTextAreaDatos.innerHTML = mitexto;
	mitexto = "";
	var el = document.getElementById('MiniJobs_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display, que oculta o muestra el div	
	var ebpdivDatos = document.getElementById('MiniJobs_export_window'); //se define la variable "ebpdivDatos" igual a nuestro div interno
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display, que oculta o muestra el div
}

function EBP_Obtiene_Datos(MyTexto)
{
	ebp_AdPrize = 0;
	var sTextTempo = "";
	var sTextLinea = "";
	//estas variables es para determinar si ya se obtuvo el valor de un campo
	var b_ebp_TotNP = false;
	var b_ebp_TotSaldo = false;
	var b_ebp_TotCG = false;
	var b_ebp_TotTotal = false;
	//estas variables es para determinar si hay actualizacion
	var b_ebp_IniGeneral = false;
	var b_ebp_FinDatos = false;

	//Revisamos cuantos quote hay en el texto, para así eliminarlos y quedarnos
	//solamente con el texto real
    var fraseQueBuscar = '<fieldset class=';
    var MyTextDivide = MyTexto.split(fraseQueBuscar);
	var total = MyTextDivide.length;
	total = total-1;
	if (total != -1)
	{
		for(var i=0; i<total; i++)
		{
			MyTexto = EBP_Limpia_Texto(MyTexto)
		}
	}
	
	
	MyTextDivide = MyTexto.split('<br>');
	ebp_TipoAct = 3;
	ebp_MiniJobs = 0;
	ebp_Bonus = 0;
	ebp_Comision = 0;
	Achievements = "";	
	Porcentaje = 0;
	Tot_MiniJobs = 0;
	Puntos = 0;

	for(var i=0; i<MyTextDivide.length; i++)
	{
		//buscamos los datos que faltan: primero determinamos si es una actualización mensual o general, hasta que
		//no se consiga dicha indicación no tomamos ningún dato
		sTextLinea = MyTextDivide[i];
		//eliminamos los espacios al inicio y final de la línea, y convertimos el texto a minuscula
		sTextLinea = sTextLinea.trim();
		var sTextLineaMinusc = sTextLinea;
		sTextLineaMinusc = stripHTML(sTextLineaMinusc);
		sTextLineaMinusc = sTextLineaMinusc.toLowerCase();
		var sTextLineaBusca = sTextLineaMinusc;
		sTextLineaBusca = sTextLineaBusca.replace(":", '');
		//eliminamos todos los salto de página y todos los espacios en blanco
		sTextLineaBusca = sTextLineaBusca.replace(/\\t/gi, ' ');
		sTextLineaBusca = sTextLineaBusca.replace(/\s{2,}/g, ' ');
		sTextLineaBusca = sTextLineaBusca.trim();
		
		sTextLinea = stripHTML(sTextLinea);
		ebp_FechaAdPrize = "";
		ebp_AdPrize = "";
		
		if(sTextLinea != "" && b_ebp_FinDatos == false)
		{			
			
			if((ebp_IniGeneral.indexOf(sTextLineaBusca) != -1) && (b_ebp_IniGeneral == false))
			{
				b_ebp_IniGeneral = true;
				ebp_TipoAct = 2;
			}
			if((ebp_TipoAct != 3) && (sTextLinea != ""))
			{
				//buscamos en la línea el texto mini o petits (todos los leguajes menos el frances tienen la palabra mini, el frances tiene petits)
				//si la palabra existe determinamos si es el bonus buscando el caracter "("
				if((sTextLineaMinusc.indexOf('mini') != -1 ) || (sTextLineaMinusc.indexOf('petits') != -1 ))
				{
					sTextLineaMinusc = sTextLineaMinusc.replace(/\\t/gi, ' ');
					sTextLineaMinusc = sTextLineaMinusc.replace(/\s{2,}/g, ' ');
					sTextLineaMinusc = sTextLineaMinusc.trim();
		
					var MontoTempo = "";
					var posicion1 = sTextLineaMinusc.indexOf(':');
					MontoTempo = sTextLineaMinusc.substring(posicion1+1);
					MontoTempo = MontoTempo.trim();
					MontoTempo = MontoTempo.replace("$", '');
					MontoTempo = MontoTempo.replace("=", '');
					MontoTempo = MontoTempo.replace(/\s{2,}/g, ' ');
					MontoTempo = MontoTempo.trim();
					
					//si en la línea está el caracter "(" el monto es del bonus, sino, es del minijobs
					if(sTextLinea.indexOf('(') != -1 )
					{						
						ebp_Bonus = MontoTempo;
					}else{
						ebp_MiniJobs = MontoTempo;
					}
				}else{
				//si no están esas palabras buscamos las siguentes; comisiones; logros, inicio, porcentaje total minijobs, puntos
				//Accuracy, jobs, points
					sTextLineaMinusc = sTextLineaMinusc.replace(/\\t/gi, ' ');
					sTextLineaMinusc = sTextLineaMinusc.replace(/\s{2,}/g, ' ');
					sTextLineaMinusc = sTextLineaMinusc.trim();
					var MontoTempo = "";
					var posicion1 = sTextLineaMinusc.indexOf(':');
					MontoTempo = sTextLineaMinusc.substring(posicion1+1);
					MontoTempo = MontoTempo.trim();
					MontoTempo = MontoTempo.replace("$", '');
					MontoTempo = MontoTempo.replace("=", '');
					MontoTempo = MontoTempo.replace("%", '');
					MontoTempo = MontoTempo.replace("'", '');
					
					if(sTextLineaMinusc.indexOf('accuracy') != -1 || sTextLineaMinusc.indexOf('porcentaje') != -1)
					{						
						Porcentaje = MontoTempo;
					}else if(sTextLineaMinusc.indexOf('comision') != -1 || sTextLineaMinusc.indexOf('commissions') != -1)
					{
						ebp_Comision = MontoTempo;
					}else if(sTextLineaMinusc.indexOf('achievements') != -1 || sTextLineaMinusc.indexOf('logros') != -1)
					{
						Achievements = MontoTempo;
					}else if(sTextLineaMinusc.indexOf('trabajos') != -1 || sTextLineaMinusc.indexOf('jobs') != -1)
					{
						Tot_MiniJobs = MontoTempo;
					}else if(sTextLineaMinusc.indexOf('puntos') != -1 || sTextLineaMinusc.indexOf('points') != -1)
					{
						Puntos = MontoTempo;
					}
				}
			}
		}else{
			if(b_ebp_IniGeneral == true)
			{
				b_ebp_FinDatos = true;
			}
		}
	}
	if(b_ebp_IniGeneral == true)
	{
	
	//ahora pasamos el dato para mostrarlo
	mitexto = mitexto + ebp_NumPost + ";" + ebp_Nombre + ";" + ebp_Membrecia + ";" + ebp_Fecha + ";" + ebp_Contry + ";" + ebp_MiniJobs + ";" + ebp_Bonus + ";" + ebp_Comision + ";" + Achievements + ";" + Porcentaje + ";" + Tot_MiniJobs + ";" + Puntos + "\n";
	}
}

function EBP_Limpia_Texto(MyNewTexto)
{
	//Eliminamos el texto que haya entre las 2 fraces que estamos buscando
	
	var fraseBusca2 = '</fieldset>';
	
    var Posicion_1 = MyNewTexto.lastIndexOf('<fieldset class=');
	var posicion_2 = MyNewTexto.indexOf('</fieldset>',Posicion_1);
	
	var TextTemporal = MyNewTexto.substring(0,Posicion_1) + " " + MyNewTexto.substring(posicion_2+11,MyNewTexto.length);
	return TextTemporal;
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
    var button_Leer_Topic = document.createElement('span');
	var button_Espacio = 36;
	var tmp_pix = 0;
	var tmp_pix_Gen = 0;
	
	var Tam = TamVentana();  
	//verificamos el tamaño de la pantalla
	if(Tam[0] > 1204)
    {
        var css_button_common = css_button_General;
		tmp_pix_Gen = bottom_pix;
    }else{
		var css_button_common = css_button_General_2;
		TipoBoton = 2;
		tmp_pix_Gen = bottom_pix_2;
	}
			
	var css_Leer_Topic = css_button_common
      + 'background-color:#A4A4A4;bottom:' + tmp_pix_Gen.toString() + 'px;';
	  
	var TextoSpan = "";
	var SaltoLinea = document.createElement("br");
	//dependiendo del tipo de boton, colocaremos el texto en los botones
	if(TipoBoton == 1)
    {
        TextoSpan = "Leer Mensajes";
		var Text_Leer_Topic = document.createTextNode(TextoSpan);
		button_Leer_Topic.appendChild(Text_Leer_Topic);
    }else{
		TextoSpan = "Read";
		var Text_Leer_Topic = document.createTextNode(TextoSpan);
		button_Leer_Topic.appendChild(Text_Leer_Topic);
	}
	
	button_Leer_Topic.style.cssText = css_Leer_Topic;
    button_Leer_Topic.addEventListener('click', EBP_Leer_Topic, false);
    document.body.appendChild(button_Leer_Topic);
	
	//Creamos el Div para los datos
	var d = document.createElement('div');
	d.setAttribute('id','MiniJobs_options_window');
	d.setAttribute('style','position: fixed; top: 100px; text-align: center; width: 100%; display: none;');
	d.innerHTML = '<div style="width: 800px; height: 400px; margin: 0 auto; background: #FFF; border: 1px solid #333; padding: 10px; display: none;" id="MiniJobs_export_window"><table><tr><td><img src="http://c.nbx.bz/imagens/texto_32.png" width="26" border="0" /></td><td style="font-size: 14px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: left;" width="800">MiniJobs</td><td id="MiniJobs_export_close" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="190">Close</td></tr></table><textarea style="width: 790px; height: 365px;" id="MiniJobs_export_field" onMouseOver="this.select();" onMouseUp="this.select();" onMouseDown="this.select();"></textarea></style></div>';
	// Lo insertas al final del body
	document.body.appendChild(d); 
	//agregamos las funciones para cerrar (ocultar) el div 
	var MiniJobscierra = document.getElementById("MiniJobs_export_close");
	MiniJobscierra.addEventListener('click', MiniJobs_Datos_Cerrar, false);
}
//***********************************************************************************
//****esta función oculta el div que contiene los datos a exportar				*****
//***********************************************************************************
function MiniJobs_Datos_Cerrar()
{
	var ebpdivDatos = document.getElementById('MiniJobs_options_window'); //se define la variable "el" igual a nuestro div
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
	var el = document.getElementById('MiniJobs_export_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}

add_buttons();
