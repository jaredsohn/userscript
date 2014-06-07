// version 0.1.1 BUGFIX
// 7 Aug 2006
// Copyright (c) 2006, GaNoN
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Script de compactacion automatica de espionajes de OGame


// ==UserScript==
// @name Compactador-Espionaje-OGame
// @namespace http://nukezelda.shinranet.com/oscripts/
// @author GaNoN
// @description  Compactador de informes de espionaje del ogame al estilo mecahost
// @include     http://*/bericht.*
// ==/UserScript==

var contenido = '';
var separador = ' | ';

// FUNCTIONS
// Based on http://www.forosdelweb.com/showthread.php?t=412750&highlight=punto+miles


function separarmiles(numero){
	proceso = parseFloat(numero).toString();
	var texto = "";
	contador = 1;
	for(var i = proceso.length-1; i >= 0; i--)
	{
		texto = proceso.charAt(i) + texto;
		contador % 3 == 0 && i > 0 ? texto = "," + texto : texto = texto;
		contador == 3 ? contador = 1 : contador++;
	}
	return texto;
} 

// Copiado de http://dotnet.org.za/danieb/archive/2004/07/27/3020.aspx
function xreplace(checkMe,toberep,repwith)
{
	var temp = checkMe;
	var i = temp.indexOf(toberep);
	while(i > -1)
	{
		temp = temp.replace(toberep, repwith);
		i = temp.indexOf(toberep, i + repwith.length + 1);
	}
	return temp;
}

// Procesar
function hacer_compactacion()
{
	cuerpo = document.body;
	if(cuerpo.innerHTML.search('Recursos en') != -1)
	{
		nuevodiv = document.createElement("div");
		divbotones = document.createElement("div");
		textareacompacta = document.createElement("textarea");
		textareacompacta.style.width = "100%";
		divbotones.innerHTML = 'Foro de destino: <select id="tipoforo"><option value="phpbb" id="phpbb">phpBB</option><option value="ipb" id="ipb">IPB</option><option value="vbulletin" id="vbulletin">vBulletin</option><option value="punbb" id="punbb">punBB</option><option value="noformat" id="noformat">Sin formato</option><option value="html" id="html">HTML</option></select> Skin del foro: <select id="colorforo"><option value="foroclaro" id="foroclaro">Claro</option><option value="forooscuro" id="forooscuro">Oscuro</option></select> Color del skin: <select id="colorskin"><option value="skinclaro" id="skinclaro">Claro</option><option value="skinoscuro" id="skinoscuro">Oscuro</option></select><input type="button" id="buttoncompacta" value="Compactar">';
		cuerpo.appendChild(nuevodiv);
		cuerpo.appendChild(textareacompacta);
		cuerpo.appendChild(divbotones);
		buttoncompacta = document.getElementById("buttoncompacta");
		tipoforo = document.getElementById("tipoforo");
		colorforo = document.getElementById("colorforo");
		colorskin = document.getElementById("colorskin");
		buttoncompacta.addEventListener('click',function () {
			GM_setValue('tipoforospy', tipoforo.value);
			GM_setValue('colorforo', colorforo.value);
			GM_setValue('colorskin', colorskin.value);
			location.href = document.location;
		},false)

		tipoforoausar = GM_getValue('tipoforospy', 'phpbb');
		colorforoausar = GM_getValue('colorforo', 'forooscuro');
		colorskinausar = GM_getValue('colorskin', 'skinoscuro');

		document.getElementById(tipoforoausar).selected = 'selected';
		document.getElementById(colorforoausar).selected = 'selected';
		document.getElementById(colorskinausar).selected = 'selected';

		contenidoweb = document.getElementsByTagName('table');
		recursos = contenidoweb[1].getElementsByTagName('td');

		if (recursos)
		{
			// RECURSOS
			contenido += '[neg]' + recursos[0].innerHTML + '[/neg][br]Metal: [recstyle]' + separarmiles(recursos[2].innerHTML) + '[spanend]' + separador + 'Cristal: [recstyle]' + separarmiles(recursos[4].innerHTML) + '[spanend]' + separador + 'Deuterio: [recstyle]' + separarmiles(recursos[6].innerHTML) + '[spanend]' + separador + 'Energia: [recstyle]' + separarmiles(recursos[8].innerHTML) + '[spanend]';

			// LO PONGO AQUI PORQUE SI HAY INFORME, REPRESENTA Q SIEMPRE SALEN LOS RECURSOS...
			// FLOTA
			if (contenidoweb[2])
			{
				flota = contenidoweb[2].getElementsByTagName('td')
				if (flota.length > '1')
				{
					vecesbucle = (flota.length - 1) / 2;
					contenido += '[br][neg]Flotas[/neg][br]';
					for (i = 0; i < vecesbucle; i++)
					{
						if (i != 0)
						{
							separa = separador;
						}
						else
						{
							separa = '';
						}
						posiciontdcosa = 1 + i * 2;
						posiciontdnum = 2 + i * 2;
						contenido += separa + flota[posiciontdcosa].innerHTML + ' [flotastyle]' + flota[posiciontdnum].innerHTML + '[spanend]';
					}
				}
				else
				{
					contenido += '[br][neg]Flotas[/neg][br](Sin Flotas)';
				}
			}
			
			// DEFENSA
			if (contenidoweb[3])
			{
				defensa = contenidoweb[3].getElementsByTagName('td');
				if (defensa.length > '1')
				{
					vecesbucle = (defensa.length - 1) / 2;
					contenido += '[br][neg]Defensas[/neg][br]';
					for (i = 0; i < vecesbucle; i++)
					{
						if (i != 0)
						{
							separa = separador;
						}
						else
						{
							separa = '';
						}
						posiciontdcosa = 1 + i * 2;
						posiciontdnum = 2 + i * 2;
						contenido += separa + defensa[posiciontdcosa].innerHTML + ' [flotastyle]' + defensa[posiciontdnum].innerHTML + '[spanend]';
					}
				}
				else
				{
					contenido += '[br][neg]Defensas[/neg][br](Sin Defensas)';
				}

				// EDIFICIOS
				if (contenidoweb[4])
				{
					edificios = contenidoweb[4].getElementsByTagName('td');
					if (edificios.length > '1')
					{
						vecesbucle = (edificios.length - 1) / 2;
						contenido += '[br][neg]Edificios[/neg][br]';
						for (i = 0; i < vecesbucle; i++)
						{
							if (i != 0)
							{
								separa = separador;
							}
							else
							{
								separa = '';
							}
							posiciontdcosa = 1 + i * 2;
							posiciontdnum = 2 + i * 2;
							contenido += separa + edificios[posiciontdcosa].innerHTML + ' [edificiostyle]' + edificios[posiciontdnum].innerHTML + '[spanend]';
						}
					}
				}

				// INVESTIGACION
				if (contenidoweb[5])
				{
					investigacion = contenidoweb[5].getElementsByTagName('td');
					if (investigacion.length > '1')
					{
						vecesbucle = (investigacion.length - 1) / 2;
						contenido += '[br][neg]Investigaci&oacute;n[/neg][br]';
						for (i = 0; i < vecesbucle; i++)
						{
							if (i != 0)
							{
								separa = separador;
							}
							else
							{
								separa = '';
							}
							posiciontdcosa = 1 + i * 2;
							posiciontdnum = 2 + i * 2;
							contenido += separa + investigacion[posiciontdcosa].innerHTML + ' [edificiostyle]' + investigacion[posiciontdnum].innerHTML + '[spanend]';
						}
					}
				}
			}
		}

		if (colorforoausar == 'foroclaro')
		{
			recursoscolorforo = '#A144A1';
		}
		else
		{
			recursoscolorforo = '#FE875B';
		}
		if (colorskinausar == 'skinclaro')
		{
			recursoscolorhtml = '#A144A1';
		}
		else
		{
			recursoscolorhtml = '#FE875B';
		}
		var formathtml = Array(
			Array('[neg]', '<span style="font-weight: bold;">'),
			Array('[/neg]', '</span>'),
			Array('[recstyle]', '<span style="font-weight: bold; font-size: 17px; color: ' + recursoscolorhtml + '">'),
			Array('[flotastyle]', '<span style="font-weight: bold; font-size: 17px; color: red;">'),
			Array('[edificiostyle]', '<span style="font-weight: bold; font-size: 17px; color: blue;">'),
			Array('[spanend]', '</span>'),
			Array('[br]', '<br />'),
			Array('[copyright]', '<br /><br />Compactado con el <a href="http://userscripts.org/scripts/show/5118">Compactador autom&aacute;tico de espionajes</a>')		
		);
		if (tipoforoausar == "html")
		{
			var format = Array(
				Array('[neg]', '<span style="font-weight: bold;">'),
				Array('[/neg]', '</span>'),
				Array('[recstyle]', '<span style="font-weight: bold; font-size: 17px; color: ' + recursoscolorforo + '">'),
				Array('[flotastyle]', '<span style="font-weight: bold; font-size: 17px; color: red;">'),
				Array('[edificiostyle]', '<span style="font-weight: bold; font-size: 17px; color: blue;">'),
				Array('[spanend]', '</span>'),
				Array('[br]', '<br />'),
				Array('[copyright]', '<br /><br />Compactado con el <a href="http://userscripts.org/scripts/show/5118">Compactador autom&aacute;tico de espionajes</a>')
			);
		}
		else if (tipoforoausar == "phpbb" || tipoforoausar == "ipb")
		{
			var format = Array(
				Array('[neg]', '[b]'),
				Array('[/neg]', '[/b]'),
				Array('[recstyle]', '[b][size=17][color=' + recursoscolorforo + ']'),
				Array('[flotastyle]', '[b][size=17][color=red]'),
				Array('[edificiostyle]', '[b][size=17][color=blue]'),
				Array('[spanend]', '[/color][/size][/b]'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el [url=http://userscripts.org/scripts/show/5118]Compactador autom&aacute;tico de espionajes[/url]')		
			);
		}
		else if (tipoforoausar == 'vbulletin')
		{
			var format = Array(
				Array('[neg]', '[b]'),
				Array('[/neg]', '[/b]'),
				Array('[recstyle]', '[b][size=4][color=' + recursoscolorforo + ']'),
				Array('[flotastyle]', '[b][size=4][color=red]'),
				Array('[edificiostyle]', '[b][size=4][color=blue]'),
				Array('[spanend]', '[/color][/size][/b]'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el [url=http://userscripts.org/scripts/show/5118]Compactador autom&aacute;tico de espionajes[/url]')
			);
		}
		else if (tipoforoausar == 'punbb')
		{
			var format = Array(
				Array('[neg]', '[b]'),
				Array('[/neg]', '[/b]'),
				Array('[recstyle]', '[b][color=' + recursoscolorforo + ']'),
				Array('[flotastyle]', '[b][color=red]'),
				Array('[edificiostyle]', '[b][color=blue]'),
				Array('[spanend]', '[/color][/b]'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el [url=http://userscripts.org/scripts/show/5118]Compactador autom&aacute;tico de espionajes[/url]')
			);
		}
		else if (tipoforoausar == 'noformat')
		{
			var format = Array(
				Array('[neg]', '-'),
				Array('[/neg]', '-'),
				Array('[recstyle]', '('),
				Array('[flotastyle]', '('),
				Array('[edificiostyle]', '('),
				Array('[spanend]', ')'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el compactador autom&aacute;tico de espionajes (url=http://userscripts.org/scripts/show/5118)')	
			);
		}
		// contenido += '[copyright]';
		contenidotextarea = contenido;
		for (i = 0; i < formathtml.length; i++)
		{
			contenido = xreplace(contenido, formathtml[i][0], formathtml[i][1]);
			contenidotextarea = xreplace(contenidotextarea, format[i][0], format[i][1]);
		}
		nuevodiv.innerHTML = contenido;
		textareacompacta.value = contenidotextarea;
	}
}
hacer_compactacion();
