// ==UserScript==
// @name           Actualización Cuenta de la Banda
// @namespace      accountupdate
// @description    Actualiza los movimientos de la cuenta de la banda
// @include        http://*mendigogame.es/gang/*
// ==/UserScript==

GM_setValue('foro', 'http://www.mendigogame.es/gang/forum/viewthread/14894/');
GM_setValue('baja', '-');
GM_setValue('alta', '-');

var link = document.createElement('a');
link.setAttribute('href', '#');
link.innerHTML = '<span class="btn-right"><span class="btn-left">Actualizar Cuentas</span></span>';
link.addEventListener('click', fclick, false);

var li = document.createElement('li');
li.appendChild(link);

var menu = document.getElementById('nav-1');
menu.appendChild(li);	

function fclick()
{
	GM_xmlhttpRequest(
		{
		   	method: 'GET',
		   	url: 'http://www.mendigogame.es/gang/credit/?showall=1',
		   	onload: function(responseDetails) 
			{
				var content = responseDetails.responseText;				
				var text = content.split('&nbsp;<a href="/profil/id:');
				var data = new Array ();
				var init = true;
				var i=1;
				for (i=1; i<text.length; i++) 
				{
					var splits1 = text[i].split('/">');
					if ((splits1[1].indexOf('empezó el día') == -1) && (splits1[1].indexOf('Has comprado una cuenta para la banda') == -1))
					{
						var splitter = '</a> transfirió el día ';
						if (splits1[1].indexOf('obtuvo el día') != -1)
						{
							splitter = '</a> obtuvo el día ';
						}
						var splits2 = splits1[1].split(splitter);
						var splits3 = splits2[1].split('</span>');
						var splits4 = (splits3[1].split('style="float:right"> '))[1].split(' &euro;');
						data[data.length] = new Array (splits2[0].toUpperCase(), splits3[0], splits4[0]);
					}	
				}
				
				if (data.length > 0)
				{					
					checkTransactions(data);
				}
				else
				{
					alert('No hay transacciones');
				}
			}
		});
}

function checkTransactions(data)
{
	var foro = GM_getValue('foro');
	GM_xmlhttpRequest(
		{
		   	method: 'GET',
		   	url: foro,
		   	onload: function(responseDetails) 
			{
				var content = responseDetails.responseText;	
				var parts = content.split('/gang/forum/editpost/');
				var post = (parts[1].split("/'>Editar</a>"))[0];
					
				var text = content.split('<div align="center"><b><span style="color:yellow"><u>TRANSACCIONES</u></span></b></div><br />');				
				var sides = (text[0].split('<div align="center"><b><span style="color:yellow"><u>CUENTAS</u></span></b></div><br />'))[1].split('<br />');
				var accounts = new Array ();
				var i=0;
				for (i=0; i<sides.length-1; i++) 
				{
					var tmp = sides[i].split('<b>- <span style="color:white">');
					var iniSplitter = '</span>:</b> ';
					if (tmp[1].indexOf('</span>:</b> ') == -1)
					{
						iniSplitter = '</span>: ';
					}
					var splitter = iniSplitter + '<span style="color:#00C319">';
					if (tmp[1].indexOf('FF0000') != -1)
					{
						splitter = iniSplitter + '<span style="color:#FF0000">';
					}	
					var sub1 = tmp[1].split(splitter);
					var sub2 = sub1[1].split(' €</span>');
					var baja = GM_getValue('baja');
					if (baja == '-' || (baja.toUpperCase() != sub1[0].toUpperCase()))
					{
						accounts[accounts.length] = new Array(sub1[0], sub2[0]);
					}
				}
								
				var splits = (text[1].split('</p>'))[0].split('<br />');				
				var statement = new Array ();
				var i=0;
				for (i=0; i<splits.length; i++) 
				{
					var temp = splits[i].split('<span style="color:cyan">');
					var splitter = '</span> transfirió el día <span style="color:white">';
					var color = '00C319';
					if (temp[1].indexOf('obtuvo el día') != -1)
					{
						splitter = '</span> obtuvo el día <span style="color:white">';
						color = 'FF0000';
					}					
					var sub1 = temp[1].split(splitter);
					var sub2 = sub1[1].split('</span> <span style="color:#' + color + '">');
					var sub3 = sub2[1].split(' €</span>');
					statement[statement.length] = new Array (sub1[0].toUpperCase(), sub2[0], sub3[0]);					
				}
				
				var newData = new Array ();
				var found = false;
				
				var i=0;
				var j=0;
				for (i=0; i<data.length; i++) 
				{	
					for (j=0; j<statement.length; j++) 
					{						
						if ((data[i][0] == statement[j][0]) && (data[i][1] == statement[j][1]) && (data[i][2] == statement[j][2]))
						{														
							found = true;
							break;
						}						
					}	
					if (found)
					{	
						break;
					}
					else
					{
						newData[newData.length] = new Array (data[i][0], data[i][1], data[i][2]);
					}
				}				
				if (newData.length > 0)
				{
					if (confirm('Hay ' + newData.length + ' transacciones nuevas. ¿Deseas continuar?')) 
					{
						addTransactions(newData, accounts, statement, post);
					}
				}
				else
				{
					alert('No hay transacciones nuevas');
				}				
			}
		});	
}

function addTransactions(newData, accounts, statement, post)
{
	var alta = GM_getValue('alta');	
	if (alta != '-')
	{
		accounts[accounts.length] = new Array(alta.toUpperCase(), '0');
	}
	var i=0;
	var j=0;
	for (i=0; i<accounts.length; i++) 
	{	
		var amount = parseFloat(accounts[i][1].replace('.', ''));
		for (j=0; j<newData.length; j++) 
		{
			if (accounts[i][0] == newData[j][0])
			{						
				amount = amount + parseFloat(newData[j][2]);
			}
		}
		accounts[i][1] = numFormat(amount + '');
	}	
	var texto =	'[center][b][color=yellow][u]CUENTAS[/u][/color][/b][/center]\r\n';
	var i=0;
	for (i=0; i<accounts.length; i++) 
	{
		var color = '00C319';
		if (accounts[i][1] < 0)
		{
			color = 'FF0000';
		}	
		texto = texto + '[b]- [color=white]' + accounts[i][0] + '[/color]:[/b] [color=#' + color + ']' + accounts[i][1] + ' €[/color]\r\n'; 
	}
	
	texto = texto + '[center][b][color=yellow][u]TRANSACCIONES[/u][/color][/b][/center]\r\n';
	
	var i=0;
	for (i=0; i<newData.length; i++) 
	{
		var word = 'transfirió';
		var color = '00C319';
		if (newData[i][2].indexOf('-') != -1)
		{
			word = 'obtuvo';
			color = 'FF0000';
		}	
		texto = texto + '[color=cyan]'+ newData[i][0] + '[/color] ' + word + ' el día [color=white]'+ newData[i][1] + '[/color] [color=#' + color + ']'+ newData[i][2] + ' €[/color]\r\n'; 
	}
	
	var numTrans = 100;
	if ((newData.length + statement.length) < 100)
	{
		numTrans = statement.length;
	}
	
	var i=0;
	for (i=0; i<numTrans; i++) 
	{
		var word = 'transfirió';
		var color = '00C319';
		if (statement[i][2].indexOf('-') != -1)
		{
			word = 'obtuvo';
			color = 'FF0000';
		}	
		texto = texto + '[color=cyan]'+ statement[i][0] + '[/color] ' + word + ' el día [color=white]'+ statement[i][1] + '[/color] [color=#' + color + ']'+ statement[i][2] + ' €[/color]\r\n'; 
	}
	
	texto = texto + '\r\n';
	
	var form = document.createElement('form');
	form.setAttribute('name', 'form1');
	form.setAttribute('method', 'post');
	form.setAttribute('action', '/gang/forum/editpost/' + post + '/submit/');
	form.innerHTML = '<textarea name="f_text" id="f_text">' + texto + '</textarea><input type="submit" name="Submit" value="Mandar">';
		
	var content = document.getElementById('content');
	content.appendChild(form);
	
	form.submit();	
}


function numFormat(numero)
{
	var separador_miles = '.';
	var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
    while(miles.test(numero)) 
    {
    	numero=numero.replace(miles, "$1" + separador_miles + "$2");
    }
    return numero;
}
