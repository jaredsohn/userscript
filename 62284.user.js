// ==UserScript==
// @name           	Easy War v1.0
// @namespace      	easywar
// @description    	Te ayuda en la lucha de bandas
// @include 	   	*://*mendigogame.es/gang/
// ==/UserScript==

var content = document.getElementById('content');
var menu = content.getElementsByTagName('ul')[0];
var opcion = menu.getElementsByTagName('li')[6];
var enlaceBanda = opcion.getElementsByTagName('a')[0].href;

var bandas = new Array ();

GM_setValue('myBandaUrl', enlaceBanda);
GM_setValue('myBanda', '');

GM_xmlhttpRequest(
{
   	method: 'GET',
   	url: 'http://www.mendigogame.es/gang/fight/',
   	onload: function(responseDetails) 
	{
		var content = responseDetails.responseText;
		var side1 = content.split('<td height="29" style="vertical-align:middle;">&nbsp;');
		if (side1[1].indexOf('No hay luchas de bandas en este momento') == -1)
		{
			var listaProv = new Array ();	
			var i=1;
			for (i=1; i<side1.length; i++) 
			{
				var side2 = side1[i].split('</td>');		
				var side3 = side2[1].split('<strong>');			
				var side4 = side3[1].split('</strong>');
				var side5 = side2[2].split('/gang/fight/view/');
				var side6 = side5[1].split('/">');
				listaProv[listaProv.length] = new Array (side2[0], side4[0], side6[0]);
			}
			prepareInfo(listaProv);
		}
	}
});

function prepareInfo(listaProv)			
{
	var myBandaUrl = GM_getValue("myBandaUrl");
	GM_xmlhttpRequest(
		{
		   	method: 'GET',
		   	url: myBandaUrl,
		   	onload: function(responseDetails) 
			{				
				var content = responseDetails.responseText;
				var splits = content.split('/profil/bande:');
				var i=1;
				for (i=1; i<splits.length; i++) 
				{
					var details = splits[i].split('/">');
					var idBanda = details[0]; 
					var name = (details[1].split('</a>'))[0];
					for (j=0; j<listaProv.length; j++) 
					{
						if (name.toLowerCase() == listaProv[j][0].toLowerCase())
						{
							bandas[bandas.length] = new Array (idBanda, name, listaProv[j][1], listaProv[j][2]);							
						}
					}
				}
				if (bandas.length > 0)
				{
					showWarning(bandas);
				}
			}
		});	
}

function showWarning(bandas)  
{
	var table = document.getElementsByTagName('table')[0];
	var myBanda = table.getElementsByTagName('tr')[0].cells[0].getElementsByTagName('span')[0].innerHTML;
	
	GM_setValue('myBanda', myBanda);
	
	var td = table.getElementsByTagName('tr')[2].cells[0];
	
	var i=0;
	for (i=0; i<bandas.length; i++) 
	{
		var message = '';
		var numbers = bandas[i][2].split(':');
		if (parseInt(numbers[0]) < parseInt(numbers[1]))
		{
			message = '¡A por ellos que vamos perdiendo!';
		}
		else if (parseInt(numbers[0]) == parseInt(numbers[1]))
		{
			message = '¡A romper el empate!';
		}
		
		var divTitle = document.createElement('div');
		divTitle.id = 'div_war_title' + i;
		divTitle.setAttribute('align', 'center');
		divTitle.setAttribute('style', 'background-color:#ff0000; -moz-border-radius:4px; width:100%; height: 18px;');
		divTitle.innerHTML = '<b><span style="color: white;">¡En guerra contra ' + bandas[i][1] + '! <blink>' + message + '</blink></span></b><div id="infoIcon"></div>';
		
		var table = document.createElement('table');
		table.border = '0';
		table.setAttribute('width', '100%');
		
		var td1 = document.createElement('td');
		td1.setAttribute('width', '48%');
		td1.setAttribute('style', 'text-align: right;');
		td1.innerHTML = '<span style="color: yellow;"><b>' + myBanda + '</b></span>';
		
		var td2 = document.createElement('td');
		td2.setAttribute('width', '4%');
		td2.setAttribute('style', 'text-align: center;');
		td2.innerHTML = '<span style="color: white;"><b>vs</b></span>';
		
		var td3 = document.createElement('td');
		td3.setAttribute('width', '48%');
		td3.setAttribute('style', 'text-align: left;');
		td3.innerHTML = '<a href="/profil/bande:' + bandas[i][0] + '/"><b><span style="color: yellow;">' + bandas[i][1] + '</span></b></a>';
		
		var td4 = document.createElement('td');
		td4.setAttribute('width', '48%');
		td4.setAttribute('style', 'text-align: right;');
		td4.innerHTML = '';
		
		var td5 = document.createElement('td');
		td5.setAttribute('width', '4%');
		td5.setAttribute('style', 'text-align: center;');
		td5.innerHTML = '<a href="/gang/fight/view/' + bandas[i][3] + '/"><b><span style="color: white; font-size: 16px;">' + bandas[i][2] + '</span></b></a>';
		
		var td6 = document.createElement('td');
		td6.setAttribute('width', '48%');
		td6.setAttribute('style', 'text-align: left;');
		td6.innerHTML = '';
		
		var tr1 = document.createElement('tr');
		var tr2 = document.createElement('tr');
		
		tr1.appendChild(td1);		
		tr1.appendChild(td2);
		tr1.appendChild(td3);
		tr2.appendChild(td4);
		tr2.appendChild(td5);
		tr2.appendChild(td6);
		table.appendChild(tr1);
		table.appendChild(tr2);
					
		var divScore = document.createElement('div');
		divScore.id = 'div_war_score' + i;
		divScore.setAttribute('align', 'center');
		divScore.setAttribute('style', 'background-color:#232323; -moz-border-radius:4px; height: 40px;');
		divScore.appendChild(table);
			
		var divContainer = document.createElement('div');
		divContainer.id = 'div_war_container' + i;
		divContainer.setAttribute('style', '-moz-border-radius:4px; width:98%; padding:5px; height: 60px;');	
		divContainer.appendChild(divTitle);
		divContainer.appendChild(divScore);
		
		var sbutton = document.createElement("input");
		sbutton.id = 'buttonControl' + i;
		sbutton.type = 'button';
		sbutton.value = 'Panel de Lucha';
		sbutton.addEventListener('click', start, false);
		
		var divButton = document.createElement('div');
		divButton.id = 'div_button' + i;
		divButton.setAttribute('align', 'center');
		divButton.setAttribute('style', '-moz-border-radius:4px; width:100%;');	
		divButton.appendChild(sbutton);
		
		var br = document.createElement("br");
		
		td.appendChild(divContainer);	
		td.appendChild(divButton);
		td.appendChild(br);
	}
}

function start(event) 
{	
	var idSelected = this.id;
	GM_xmlhttpRequest(
		{
		   	method: 'GET',
		   	url: 'http://www.mendigogame.es/fight/overview/',
		   	onload: function(responseDetails) 
			{
				var content = responseDetails.responseText;			
				var side_split = content.split('Tu objeto de ataque tiene que tener entre ');		
				var side_split_2 = side_split[1].split(' y ');		
				var side_split_3 = side_split_2[1].split(' puntos.');
				var minpts = side_split_2[0];
				var maxpts = side_split_3[0];	
				GM_setValue("ptsMin", minpts);
				GM_setValue("ptsMax", maxpts);
				selectMendigos((idSelected.split('buttonControl'))[1], minpts, maxpts);
			}
		});	
}

function selectMendigos(idSelected, minpts, maxpts)
{
	var idBanda = bandas[idSelected][0];
	GM_xmlhttpRequest(
		{
		   	method: 'GET',
		   	url: 'http://www.mendigogame.es/profil/bande:' + idBanda + '/',
		   	onload: function(responseDetails) 
			{
				var content = responseDetails.responseText;
				var splits1 = content.split('/profil/id:');				
				var todos = new Array ();
				var i=1;
				for (i=1; i<splits1.length; i++) 
				{
					var splits2 = splits1[i].split("/' >");
					var splits3 = splits2[1].split('</a></td>');
					var splits4 = splits3[1].split('<td width="216"><div align="right">');
					var splits5 = splits4[1].split('</div>');
					todos[i-1] = new Array(splits2[0], splits3[0], splits5[0]);					
				}
				populatetInfo(idSelected, todos);
			}
		});	
}

function populatetInfo(idSelected, todos)
{	
	var max = parseFloat(GM_getValue("ptsMax"));
	var min = parseFloat(GM_getValue("ptsMin"));
	var mendigos = new Array ();
	var i = todos.length-1;
	for (i=todos.length-1; i>=0; i--) 
	{		
		var points = parseFloat(todos[i][2]);
		if (points >= min && points <= max)
		{
			mendigos = addData(mendigos, todos[i][0], todos[i][1], points);			
		}
	}
	
	mostrarPanel(idSelected, mendigos);
}

function addData(mendigos, idMendigo, name, points)
{	
	var i=0;
	for (i=0; i<mendigos.length; i++) 
	{
		if (mendigos[i][2] > points)
		{
			var id_temp = mendigos[i][0];
			var name_temp = mendigos[i][1];
			var points_temp = mendigos[i][2];
			
			mendigos[i][0] = idMendigo;
			mendigos[i][1] = name;
			mendigos[i][2] = points;
			
			idMendigo = id_temp;
			name = name_temp; 
			points = points_temp;			
		}
	}	
	mendigos[mendigos.length] = new Array(idMendigo, name, points);
	return mendigos;
}

function mostrarPanel(idSelected, mendigos)
{	
	var tableMendigos = crearTabla(mendigos);
	
	var divTitle = document.getElementById('div_war_title' + idSelected);
	divTitle.setAttribute('style', '');
	var divScore = document.getElementById('div_war_score' + idSelected);
	
	var divContainer = document.getElementById('div_war_container' + idSelected);	
	divContainer.setAttribute('style', 'background-color:#ff0000; -moz-border-radius:4px; width:98%; padding:5px;');
	divContainer.removeChild(divScore);
	
	var table = document.createElement('table');
	table.border = '0';
	table.setAttribute('width', '100%');
	
	var td1 = document.createElement('td');
	td1.setAttribute('width', '45%');
	td1.setAttribute('style', 'text-align: right;');
	td1.innerHTML = '<span style="color: yellow;"><b>' + (GM_getValue('myBanda')).toUpperCase() + '</b></span>';
	
	var td2 = document.createElement('td');
	td2.setAttribute('width', '10%');
	td2.setAttribute('style', 'text-align: center;');
	td2.innerHTML = '<span style="color: white; font-size: 12px;"><b>&nbsp;' + bandas[idSelected][2] + '&nbsp;</b></span>';
	
	var td3 = document.createElement('td');
	td3.setAttribute('width', '45%');
	td3.setAttribute('style', 'text-align: left;');
	td3.innerHTML = '<a href="/profil/bande:' + bandas[idSelected][0] + '/"><b><span style="color: yellow;">' + (bandas[idSelected][1]).toUpperCase() + '</span></b></a>';
	
	var td4 = document.createElement('td');
	td4.setAttribute('width', '1px');
	td4.setAttribute('style', 'text-align: left;');
	td4.innerHTML = '<a href="/gang/fight/view/' + bandas[idSelected][3] + '/"><img border="0" src="http://media.mendigogame.es/img/icons/fightinfo.gif"/></a>';
		
	var tr = document.createElement('tr');
	
	tr.appendChild(td4);
	tr.appendChild(td1);		
	tr.appendChild(td2);
	tr.appendChild(td3);
		
	table.appendChild(tr);
	
	var divHeader = document.createElement('div');
	divHeader.id = 'div_header';
	divHeader.setAttribute('align', 'center');
	divHeader.setAttribute('style', 'height: 20px; width: 100%; background-color:#232323;');
	divHeader.appendChild(table);
	
	
	
	var button = document.getElementById('buttonControl' + idSelected);		  
	var divButton = document.getElementById('div_button' + idSelected);	
	divButton.removeChild(button);
	divButton.appendChild(divHeader);
	divButton.appendChild(tableMendigos);
	
	if (mendigos.length > 0)
	{
		var divFooter = document.createElement('div');
		divFooter.id = 'div_footer';
		divFooter.setAttribute('align', 'center');
		divFooter.setAttribute('style', 'height: 20px; width: 100%; background-color:#232323;');
		divFooter.innerHTML = '<span style="color: white;  font-size: 10px;">>> atacad siguiendo el orden <<</span>';
		divButton.appendChild(divFooter);
	}
}

function crearTabla(mendigos) 
{
	var table = document.createElement('table');
	table.id = 'enemigos';
	table.border = '0';
	table.setAttribute('width', '100%');
	table.setAttribute('cellpadding', '1');
	table.setAttribute('cellspacing', '0');	 
	table.setAttribute('bgcolor', '#363636');
	table.setAttribute('style', '-moz-border-radius: 2px;');
	
	if (mendigos.length == 0)
	{
		td = document.createElement('td');
		td.setAttribute('style', 'text-align: center;');
		td.innerHTML = 'No hay jugadores a los que puedas atacar';
		
		tr = document.createElement('tr');
        tr.id = '0';
        tr.setAttribute('style', '-moz-border-radius: 2px;');
        tr.setAttribute('onMouseOut', "table_out('0');");
        tr.setAttribute('onMouseOver', "table_hover('0');");
        
        tr.appendChild(td);		
		table.appendChild(tr);
	}
	else
	{
	    var i=0;
		for (i=0; i<mendigos.length; i++) 
		{
			var color = '#1f1f1f';
			if (i % 2 == 0)
			{
				color = '#313131';
			}
			
			td0 = document.createElement('td');
			td0.setAttribute('bgcolor', color);
			td0.setAttribute('width', '1px');
			td0.setAttribute('style', 'text-align: right;');
			td0.innerHTML = (i + 1) + '&nbsp;';
			
			td1 = document.createElement('td');
			td1.setAttribute('bgcolor', color);
			insertMendigo(td1, mendigos[i][0], mendigos[i][1]);
			
			td2 = document.createElement('td');
			td2.setAttribute('bgcolor', color);
			insertPoints(td2, mendigos[i][2]);
			
			td3 = document.createElement('td');
			td3.setAttribute('bgcolor', color);
			
	        tr = document.createElement('tr');
	        tr.setAttribute('style', '-moz-border-radius: 2px;');
	        
	        tr.appendChild(td0);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			
			table.appendChild(tr);
		}
	}
	return table;
}


function insertMendigo(mytd, iduser, name)
{	
	mytd.innerHTML = '<a href="http://www.mendigogame.es/fight/?to=' + name + '"><img src="http://media.pennergame.de/img/att.gif"></a>&nbsp;<a href="/profil/id:' + iduser + '/">' + name + '</a>';
}

function insertPoints(mytd, points)
{
	var mypoints = (parseFloat(GM_getValue("ptsMax")) / 1.5);
	var max = Math.floor(mypoints * 1.2);
	var min = Math.floor(mypoints * 0.95);
	var color = '#FFFF00';
	if (points < min)
	{
		color = '#00FF00';
	}
	else if (points > max)
	{
		color = '#D80C00';
	}	
	mytd.innerHTML = '<b><span style="color: ' + color + ';">' + points + '</span></b>';
}




	