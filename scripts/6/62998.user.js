// ==UserScript==
// @name           Cuota Semanal
// @namespace      accountcuota
// @description    Hace un cargo en todas las cuentas de 4000 euros
// @include        http://*mendigogame.es/gang/*
// ==/UserScript==

GM_setValue('foro', 'http://www.mendigogame.es/gang/forum/viewthread/14170/');
GM_setValue('cuota', '4000');

var link = document.createElement('a');
link.setAttribute('href', '#');
link.innerHTML = 'Cargo Cuota Semanal';
link.addEventListener('click', fclick, false);

var li = document.createElement('li');
li.appendChild(link);

var content = document.getElementById('content');
var menu = content.getElementsByTagName('ul')[0];
menu.appendChild(li);	

function fclick()
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
				var cuota = GM_getValue('cuota');				
				var accounts = new Array ();
				var newData = new Array ();
				
				var ahora = new Date();
				var fecha = ahora.getDate() + '.' + (ahora.getMonth() + 1) + '. ' + ahora.getHours() + ':' + ahora.getMinutes();
				
				var i=0;
				for (i=0; i<sides.length-1; i++) 
				{
					var tmp = sides[i].split('<b>- <span style="color:white">');
					var splitter = '</span>: <span style="color:#00C319">';
					if (tmp[1].indexOf('FF0000') != -1)
					{
						splitter = '</span>: <span style="color:#FF0000">';
					}	
					var sub1 = tmp[1].split(splitter);
					var sub2 = sub1[1].split(' €</span></b>');
					accounts[accounts.length] = new Array(sub1[0], sub2[0]);
					newData[newData.length] = new Array(sub1[0], fecha, '-' + cuota);
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
						
				if (newData.length > 0)
				{
					addTransactions(newData, accounts, statement, post);
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
	var i=0;
	var j=0;
	for (i=0; i<accounts.length; i++) 
	{	
		for (j=0; j<newData.length; j++) 
		{
			if (accounts[i][0] == newData[j][0])
			{				
				accounts[i][1] = parseFloat(accounts[i][1]) + parseFloat(newData[j][2]);			
			}
		}
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
		texto = texto + '[b]- [color=white]' + accounts[i][0] + '[/color]: [color=#' + color + ']' + accounts[i][1] + ' €[/color][/b]\r\n'; 
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
	
	var numTrans = 200;
	if ((newData.length + statement.length) < 200)
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


