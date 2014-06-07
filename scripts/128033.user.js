// ==UserScript==
// @name          NeoLeeForum
// @namespace     by_Bigpetroman
// @description   Script para ayudar en el manejo del ranking internacional de NeoPuntos de NeoBux
// @author 		  Bigpetroman
// @include       http://www.neobux.com/forum/?/7/227875/*
// @include 	  http://www.neobux.com/forum/?/7/257728/I-need-help-with-the-Rankings/*
// @version       1.2
// ==/UserScript==

//Con esta línea, estamos declarando una función llamada trim() en la clase String
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
var sFechaAyerIng = "Yesterday";
var sFechaHoyIng = "Today";
var sFechaHoyEsp = "Hoy";
var sFechaAyerEsp = "Ayer";
//estos son los datos a obtener de cada mensaje
var ebp_NumPost = 0;
var ebp_Nombre = "";
var ebp_Membrecia = "";
var ebp_Fecha = "";
var ebp_TipoUser = "";
var ebp_Contry = "";
var ebp_Reg25Mar = "";
var ebp_Neopuntos = 0;
var ebp_AdPrize = 0;
var ebp_NPOffers = 0;
var ebp_LinkPost = 0;
var mitexto = "";

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
					switch(EBP_SubMensaje_Indiv.length)
					{
						case 11: //no tiene membresia o tiene una sola
							ebp_Membrecia = EBP_SubMensaje_Indiv[2];
							ebp_Membrecia = ebp_Membrecia.replace(/'/g, '');
							ebp_Fecha = EBP_SubMensaje_Indiv[4];
							ebp_Fecha = ebp_Fecha.replace(/'/g, '');
						break;
						case 12: //tiene 2 membresias, golden y cualquier otro paquete
							ebp_Membrecia = EBP_SubMensaje_Indiv[2] + ',' + EBP_SubMensaje_Indiv[3];
							ebp_Membrecia = ebp_Membrecia.replace(/'/g, '');
							ebp_Fecha = EBP_SubMensaje_Indiv[5];
							ebp_Fecha = ebp_Fecha.replace(/'/g, '');
						break;
						case 13: //tiene 3 membresias, golden y cualquier otro paquete y pionner
							ebp_Membrecia = EBP_SubMensaje_Indiv[2] + ',' + EBP_SubMensaje_Indiv[3] + ',' + EBP_SubMensaje_Indiv[4];
							ebp_Membrecia = ebp_Membrecia.replace(/'/g, '');
							ebp_Fecha = EBP_SubMensaje_Indiv[6];
							ebp_Fecha = ebp_Fecha.replace(/'/g, '');
						break;
						case 14: //tiene 3 membresias, golden y cualquier otro paquete y pionner y moderador
							ebp_Membrecia = EBP_SubMensaje_Indiv[2] + ',' + EBP_SubMensaje_Indiv[3] + ',' + EBP_SubMensaje_Indiv[4] + ',' + EBP_SubMensaje_Indiv[5];
							ebp_Membrecia = ebp_Membrecia.replace(/'/g, '');
							ebp_Fecha = EBP_SubMensaje_Indiv[7];
							ebp_Fecha = ebp_Fecha.replace(/'/g, '');
						break;
						case 15: //tiene 3 membresias, golden y cualquier otro paquete y pionner y moderador y admin
							ebp_Membrecia = EBP_SubMensaje_Indiv[2] + ',' + EBP_SubMensaje_Indiv[3] + ',' + EBP_SubMensaje_Indiv[4] + ',' + EBP_SubMensaje_Indiv[5] + ',' + EBP_SubMensaje_Indiv[6];
							ebp_Membrecia = ebp_Membrecia.replace(/'/g, '');
							ebp_Fecha = EBP_SubMensaje_Indiv[8];
							ebp_Fecha = ebp_Fecha.replace(/'/g, '');
						break;
						default:
							ebp_Membrecia = EBP_SubMensaje_Indiv[2];
							ebp_Membrecia = ebp_Membrecia.replace(/'/g, '');
							ebp_Fecha = EBP_SubMensaje_Indiv[4];
							ebp_Fecha = ebp_Fecha.replace(/'/g, '');
						break;
					}
					
					if(ebp_Fecha.indexOf(sFechaAyerIng) != -1)
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
						ebp_Fecha = ebp_Fecha.replace(sFechaAyerIng, sTextFecha);
					}else{
						if(ebp_Fecha.indexOf(sFechaHoyIng) != -1)
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
							ebp_Fecha = ebp_Fecha.replace(sFechaHoyIng, sTextFecha);
						}else{
							if(ebp_Fecha.indexOf(sFechaHoyEsp) != -1)
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
								ebp_Fecha = ebp_Fecha.replace(sFechaHoyEsp, sTextFecha);
							}else{
								if(ebp_Fecha.indexOf(sFechaAyerEsp) != -1)
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
									ebp_Fecha = ebp_Fecha.replace(sFechaAyerEsp, sTextFecha);
								}
							}
						}
					}
					ebp_Fecha = ebp_Fecha.substring(0,10);
				break;
				case 6: //obtenemos el número del post y los datos reportados por los usuarios
					ebp_NumPost = EBP_SubMensaje_Indiv[EBP_SubMensaje_Indiv.length-2];
					
					var ebp_TextMensaje = "";
					for(var h=0; h<EBP_SubMensaje_Indiv.length-2; h++)
					{
						ebp_TextMensaje = ebp_TextMensaje + EBP_SubMensaje_Indiv[h] + ", "; 	
					}
					EBP_Obtiene_Datos(ebp_TextMensaje);
				break;
				default:
				break;
			}
		}
	}
	
	//obtenemos el campo de los datos y le pasamos los mismos
	var ebpTextAreaDatos = document.getElementById('neoleeforum_export_field'); 
	ebpTextAreaDatos.innerHTML = mitexto;
	mitexto = "";
	var el = document.getElementById('neoleeforum_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display, que oculta o muestra el div	
	var ebpdivDatos = document.getElementById('neoleeforum_export_window'); //se define la variable "ebpdivDatos" igual a nuestro div interno
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display, que oculta o muestra el div
}

function EBP_Obtiene_Datos(MyTexto)
{
	ebp_TipoUser = "na";
	ebp_Reg25Mar = "";
	ebp_Neopuntos = "";
	ebp_AdPrize = "";
	ebp_NPOffers = "";
	var sTextTempo = "";
	var sTextLinea = "";
	var ebp_NeopuntosTemp = "";
	//estas variables es para determinar si ya se obtuvo el valor de un campo
	var b_ebp_TipoUser = false;
	var b_ebp_Reg25Mar = false;
	var b_ebp_Neopuntos = false;
	var b_ebp_AdPrize = false;
	var b_ebp_NPOffers = false;
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
	
	for(var i=0; i<MyTextDivide.length; i++)
	{
		//buscamos los datos que faltan:
		//sTextLinea = MyTextDivide[i].replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g,"");
		sTextLinea = MyTextDivide[i];
		//eliminamos los espacios al inicio y final de la línea
		sTextLinea = sTextLinea.trim();
	
		sTextLinea = sTextLinea.toLowerCase();
		if((sTextLinea.indexOf('new user') == 0 ) && (b_ebp_TipoUser == false))
		{
			ebp_TipoUser = "New User";
			b_ebp_TipoUser = true;
		}else{
			if((sTextLinea.indexOf('update') == 0) && (b_ebp_TipoUser == false))
			{
				ebp_TipoUser = "Update";	
				b_ebp_TipoUser = true;
			
				sTextTempo = "";
				//reemplazamos todos los caracteres y dejamos solamente los números
				sTextTempo = sTextLinea.replace(/[^0-9]+/g, '');  
				sTextTempo = sTextTempo.trim();
				ebp_NeopuntosTemp = sTextTempo;
					
			}else{
				if((sTextLinea.indexOf('current neopoints') == 0 || sTextLinea.indexOf('total neopoint') == 0 || sTextLinea.indexOf('neopoint') == 0 || sTextLinea.indexOf('total') == 0) && (b_ebp_Neopuntos == false))
				{
					b_ebp_Neopuntos = true;
					sTextTempo = "";
					//reemplazamos todos los caracteres y dejamos solamente los números
					sTextTempo = sTextLinea.replace(/[^0-9]+/g, '');  
					sTextTempo = sTextTempo.trim();
					ebp_Neopuntos = sTextTempo;
				}else{
					if((sTextLinea.indexOf('total adprize') == 0 || sTextLinea.indexOf('adprize') == 0) && (b_ebp_AdPrize == false))
					{
						b_ebp_AdPrize = true;
						sTextTempo = "";
						sTextTempo = sTextLinea.replace(/[^0-9]+/g, '');  
						sTextTempo = sTextTempo.trim();
						ebp_AdPrize = sTextTempo;
					}else{
						if((sTextLinea.indexOf('total neopoint offer') == 0 || sTextLinea.indexOf('neopoint offer') == 0 || sTextLinea.indexOf('offer') == 0) && (b_ebp_NPOffers == false))
						{
							b_ebp_NPOffers = true;
							sTextTempo = "";
							sTextTempo = sTextLinea.replace(/[^0-9]+/g, '');  
							sTextTempo = sTextTempo.trim();
							ebp_NPOffers = sTextTempo;
						}else{
							if(sTextLinea.indexOf('registered before 25 march 2011') == 0 && b_ebp_Reg25Mar == false)
							{
								b_ebp_Reg25Mar = true;
								sTextTempo = "";
								sTextTempo = sTextLinea.replace('registered before 25 march 2011','');
								sTextTempo = sTextTempo.replace(':','');
								sTextTempo = sTextTempo.replace('.','');
								sTextTempo = sTextTempo.replace("'",'');
								sTextTempo = sTextTempo.replace(',','');
								sTextTempo = sTextTempo.trim();
								sTextTempo = sTextTempo.charAt(0).toUpperCase() + sTextTempo.substr(1).toLowerCase();
								ebp_Reg25Mar = sTextTempo;
							}
						}
					}
				}
			}
		}
	}
	//si no se reportaron los neopuntos, se toma
	if(b_ebp_Neopuntos == false)
	{
		ebp_Neopuntos = ebp_NeopuntosTemp;
	}
	
					
	mitexto = mitexto + ebp_NumPost + ";" + ebp_Nombre + ";" + ebp_Membrecia + ";" + ebp_Fecha + ";" + ebp_TipoUser + ";" + ebp_Contry + ";" + ebp_Reg25Mar + ";" + ebp_Neopuntos + ";" + ebp_AdPrize + ";" + ebp_NPOffers + ";" + ebp_LinkPost + "\n";
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
        TextoSpan = "Read Page";
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
	d.setAttribute('id','neoleeforum_options_window');
	d.setAttribute('style','position: fixed; top: 100px; text-align: center; width: 100%; display: none;');
	d.innerHTML = '<div style="width: 800px; height: 400px; margin: 0 auto; background: #FFF; border: 1px solid #333; padding: 10px; display: none;" id="neoleeforum_export_window"><table><tr><td><img src="http://c.nbx.bz/imagens/texto_32.png" width="26" border="0" /></td><td style="font-size: 14px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: left;" width="800">NeoLeeForum</td><td id="neoleeforum_export_close" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="190">Close</td></tr></table><textarea style="width: 790px; height: 365px;" id="neoleeforum_export_field" onMouseOver="this.select();" onMouseUp="this.select();" onMouseDown="this.select();"></textarea></style></div>';
	// Lo insertas al final del body
	document.body.appendChild(d); 
	//agregamos las funciones para cerrar (ocultar) el div 
	var neoleeforumcierra = document.getElementById("neoleeforum_export_close");
	neoleeforumcierra.addEventListener('click', NeoLeeForum_Datos_Cerrar, false);
}
//***********************************************************************************
//****esta función oculta el div que contiene los datos a exportar				*****
//***********************************************************************************
function NeoLeeForum_Datos_Cerrar()
{
	var ebpdivDatos = document.getElementById('neoleeforum_options_window'); //se define la variable "el" igual a nuestro div
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
	var el = document.getElementById('neoleeforum_export_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}

add_buttons();

