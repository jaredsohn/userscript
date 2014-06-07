// ==UserScript==
// @name           	Busca Ricos $$$ 
// @namespace      	buscarricos
// @description    	Busca mendigos pijos
// @include 	   	*://*mendigogame.es/fight/overview/*
// ==/UserScript==

GM_setValue("ptsMax", 0);
GM_setValue("ptsMin", 0);
GM_setValue("points", 0);
GM_setValue("numCalls", 1);
GM_setValue("numPantallas", 50);
GM_setValue("mostrado", false);
var totalMendigos = 20 * GM_getValue("numPantallas");
GM_setValue("totalMendigos", totalMendigos);

var vect = new Array ();
vect[0] = new Array (0, 0, '', '', '', '');
vect[1] = new Array (0, 0, '', '', '', '');
vect[2] = new Array (0, 0, '', '', '', '');
vect[3] = new Array (0, 0, '', '', '', '');
vect[4] = new Array (0, 0, '', '', '', '');
vect[5] = new Array (0, 0, '', '', '', '');
vect[6] = new Array (0, 0, '', '', '', '');
vect[7] = new Array (0, 0, '', '', '', '');
vect[8] = new Array (0, 0, '', '', '', '');
vect[9] = new Array (0, 0, '', '', '', '');
vect[10] = new Array (0, 0, '', '', '', '');
vect[11] = new Array (0, 0, '', '', '', '');
vect[12] = new Array (0, 0, '', '', '', '');
vect[13] = new Array (0, 0, '', '', '', '');
vect[14] = new Array (0, 0, '', '', '', '');
vect[15] = new Array (0, 0, '', '', '', '');
vect[16] = new Array (0, 0, '', '', '', '');
vect[17] = new Array (0, 0, '', '', '', '');
vect[18] = new Array (0, 0, '', '', '', '');
vect[19] = new Array (0, 0, '', '', '', '');

var pantalla = document.getElementsByTagName('table')[0];

setupPoints(pantalla.rows[13].cells[0].innerHTML);

var tr_ini = pantalla.rows[7];
var tr_fin = pantalla.rows[8];

var tr_1 = tr_ini.cloneNode(true);
var tr_2 = tr_ini.cloneNode(true);

var line = document.createElement('hr');
line.size = '1';
tr_1.cells[0].appendChild(line);

var span = document.createElement('span');
span.setAttribute('class', 'tiername');
span.innerHTML = 'Mendigos con más pasta dentro de tus límites';
tr_1.cells[0].appendChild(span);

var br1 = document.createElement("br");
var br2 = document.createElement("br");

var sbutton = document.createElement("input");
sbutton.type = 'button';
sbutton.value = 'Comenzar Búsqueda';
sbutton.addEventListener('click', start, false);

var botondiv = document.createElement('div');
botondiv.id = 'botondiv'
botondiv.setAttribute('style', 'background-color:#3A3A3A; width:450px; height:80px; text-align:center;');
botondiv.appendChild(br1);
botondiv.appendChild(br2);
botondiv.appendChild(sbutton);
tr_1.cells[0].appendChild(botondiv);

tr_fin.parentNode.insertBefore(tr_1, tr_fin);
tr_fin.parentNode.insertBefore(tr_2, tr_fin);

function setupPoints(texto)
{
	var txt2 = (texto.split('Tu objeto de ataque tiene que tener entre '))[1].split(' y ');
	var txt3 = txt2[1].split(' puntos.');
	
	var max = parseFloat(txt3[0]);
	var min = parseFloat(txt2[0]);
	var pts = Math.floor(max / 1.5)

	GM_setValue("ptsMax", max);
	GM_setValue("ptsMin", min);
	GM_setValue("points", pts);
}

function start(event) 
{	
	var mytr = pantalla.getElementsByTagName('tr')[8];
	divToDel = document.getElementById('botondiv');
	mytr.cells[0].removeChild(divToDel);
	
	var div = document.createElement('div');
	div.id = 'searchingdiv'
	div.setAttribute('style', 'background-color:#3A3A3A; width:450px; height:100px;');
	div.innerHTML = '<br><br><div id="processbar" class="processbar_bg_ov" style="width:100%;"><div id="barra" style="width: 0%;" class="processbar_clean"/><center><b><span id="nivelproceso">0%</span></b></center></div><br><div style="text-align:center;"><center><p><blink><font color="yellow">Buscando mendigos pijos...</font></blink></p></center></div>';				
	mytr.cells[0].appendChild(div);

	var fbutton = document.createElement("input");
	fbutton.type = 'button';
	fbutton.value = 'Forzar Resultados';
	fbutton.addEventListener('click', fclick, false);

	var botondiv = document.createElement('div');
	botondiv.id = 'botondiv'
	botondiv.setAttribute('style', 'background-color:#3A3A3A; width:450px; height:30px; text-align:center;');
	botondiv.appendChild(fbutton);
	mytr.cells[0].appendChild(botondiv);
	
	definePosition(vect, pantalla);
}

function definePosition(vect, pantalla) 
{
	var max = GM_getValue("ptsMax");
	var min = GM_getValue("ptsMin");
	GM_xmlhttpRequest(
		{
		   	method: 'GET',
		   	url: 'http://www.mendigogame.es/highscore/range/?max_points=' + max + '&min_points=' + min,
		   	onload: function(responseDetails) 
			{
				var content = responseDetails.responseText;
				var side1 = content.split('<td align="left" valign="bottom" ><strong>');
				var side2 = side1[1].split('.</strong></td>');	
				var pos = side2[0];
				populateVector(pos, vect, pantalla);
			}
		});
}


function populateVector(pos, vect, pantalla) 
{
	var page = Math.ceil(pos / 20);
	var numPantallas = GM_getValue("numPantallas");
				
	var i=0;
	for (i=0; i<numPantallas; i++) 
	{
		var count = page - i;
		if (count > 0)
		{
			var myurl = 'http://www.mendigogame.es/highscore/' + count + '/';					
			GM_xmlhttpRequest(
					{
					   	method: 'GET',
					   	url: myurl,
					   	onload: function(responseDetails) 
						{								
							var content = responseDetails.responseText;
							var splits = content.split('/profil/id:');
							var j=1;
							for (j=1; j<splits.length; j++) 
							{
								var userid = (splits[j].split('/"'))[0];
								var buscar = true;
								var m=0;
								for (m=0; m<vect.length; m++) 
								{
									if (vect[m][0] == userid)
									{	
										buscar = false;
										break;
									}
								}										
								if (buscar)
								{
									GM_xmlhttpRequest(
											{
											   	method: 'GET',
											   	url: 'http://www.mendigogame.es/dev/api/user.' + userid + '.xml',
											    onload: function(responseDetails) 
											    {
													var parser = new DOMParser();
													var dom = parser.parseFromString(responseDetails.responseText, "application/xml");														
													try
									        		{
														var max = GM_getValue("ptsMax");
														var min = GM_getValue("ptsMin");
														var points = dom.getElementsByTagName('points')[0].textContent;
														if (points > min && points < max)
														{															
															var iduser = dom.getElementsByTagName('id')[0].textContent;
															var name = dom.getElementsByTagName('name')[0].textContent;															
															var cash = parseInt(dom.getElementsByTagName('cash')[0].textContent);
															var gangid = dom.getElementsByTagName('gang')[0].getElementsByTagName('id')[0].textContent;															
															var gang = dom.getElementsByTagName('gang')[0].getElementsByTagName('name')[0].textContent;
															var k=0;
															for (k=0; k<vect.length; k++) 
															{
																if (vect[k][0] == 0)
																{																	 
																	vect[k][0] = cash;
																	vect[k][1] = points;
																	vect[k][2] = name;
																	vect[k][3] = iduser;		
																	vect[k][4] = gangid;		
																	vect[k][5] = gang;
																	break;
																}
																else if (vect[k][0] < cash)
																{																			
																	var cash_temp = vect[k][0];
																	var points_temp = vect[k][1];
																	var name_temp = vect[k][2];
																	var userid_temp = vect[k][3];
																	var gangid_temp = vect[k][4];
																	var gang_temp = vect[k][5];
																	
																	vect[k][0] = cash;
																	vect[k][1] = points;
																	vect[k][2] = name;
																	vect[k][3] = iduser;		
																	vect[k][4] = gangid;		
																	vect[k][5] = gang;	
																	
																	cash = cash_temp;
																	points = points_temp;
																	name = name_temp;
																	iduser = userid_temp;		
																	gangid = gangid_temp;		
																	gang = gang_temp;
																}
															}																
														}
									        		}
									        		catch(err)
									        		{
									        			
									        		}											        		
									        		comprobarFin(pantalla, vect);
											    }
											});
								}
								else
								{
									comprobarFin(pantalla, vect);
								}
							}
						}
					});
		}
	}
}

function comprobarFin(pantalla, vect)
{
	var mostrado = GM_getValue("mostrado");
	var numCalls = GM_getValue("numCalls");
	var numPantallas = GM_getValue("numPantallas");
	var totalMendigos = GM_getValue("totalMendigos");										        		
	var percent = Math.floor(((numCalls * 100) / totalMendigos));
															
	refreshProcessBar(percent);
	
	if ((numCalls == totalMendigos) && !mostrado)
	{															
		mostrarVector(vect, pantalla);
	}
	GM_setValue("numCalls", numCalls + 1);
}

function refreshProcessBar(percent)
{	
	try
	{
		var span = document.getElementById('nivelproceso');
		span.innerHTML = percent + '% ';
		
		var div = document.getElementById('barra');
		div.setAttribute('style', 'width: ' + percent + '%');
	}
	catch(e)
	{
	}
}

function fclick(ev) {	
	mostrarVector(vect, pantalla);	
}

function mostrarVector(vect, pantalla)
{		
	GM_setValue("mostrado", true);
	
	var mytr = pantalla.getElementsByTagName('tr')[8];		
	var divToDel = document.getElementById('searchingdiv');		  
	mytr.cells[0].removeChild(divToDel);
	divToDel = document.getElementById('botondiv');
	mytr.cells[0].removeChild(divToDel);
	
	var table_new = crearTabla(vect);
	mytr.cells[0].appendChild(table_new);
}

function crearTabla(vect) 
{
    var table = document.createElement('table');
    table.id = 'pijos';
	table.border = '0';
	table.setAttribute('width', '480px');
	table.setAttribute('cellpadding', '1');
	table.setAttribute('cellspacing', '0');	 
	table.setAttribute('bgcolor', '#363636');
	table.setAttribute('style', '-moz-border-radius: 2px;');
	
	var td_0_0 = document.createElement('td');
	td_0_0.style.width = '155px';
	td_0_0.setAttribute('bgcolor', '#232323');
	td_0_0.innerHTML = '<strong>Jugador</strong>';

	var td_0_1 = document.createElement('td');
	td_0_1.style.width = '80px';
	td_0_1.setAttribute('bgcolor', '#232323');
	td_0_1.innerHTML = '<strong>Dinero</strong>';

	var td_0_2 = document.createElement('td');
	td_0_2.style.width = '170px';
	td_0_2.setAttribute('bgcolor', '#232323');
	td_0_2.innerHTML = '<strong>Banda</strong>';
	
	var td_0_3 = document.createElement('td');
	td_0_3.style.width = '65px';
	td_0_3.setAttribute('bgcolor', '#232323');
	td_0_3.innerHTML = '<strong>Puntos</strong>';

    header = document.createElement('tr');
	header.appendChild(td_0_0);
	header.appendChild(td_0_1);
	header.appendChild(td_0_2);
	header.appendChild(td_0_3);
        
	table.appendChild(header);

    var i=0;
	for (i=0; i<vect.length; i++) 
	{
		td1 = document.createElement('td');
		insertMendigo(td1, vect[i][3], vect[i][2]);
        td2 = document.createElement('td');
		insertCash(td2, vect[i][0]);
		td3 = document.createElement('td');
		insertBanda(td3, vect[i][4], vect[i][5]);
		td4 = document.createElement('td');
		insertPoints(td4, vect[i][1], vect[i][2]);
		
        tr = document.createElement('tr');
        tr.id = vect[i][3];
        tr.setAttribute('style', '-moz-border-radius: 2px;');
        tr.setAttribute('onMouseOut', "table_out('" + vect[i][3] + "');");
        tr.setAttribute('onMouseOver', "table_hover('" + vect[i][3] + "');");		
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		
		table.appendChild(tr);
	}
	return table;
}

function insertMendigo(mytd, iduser, name)
{	
	mytd.innerHTML = '<a href="http://www.mendigogame.es/fight/?to=' + name + '"><img src="http://media.pennergame.de/img/att.gif"></a>&nbsp;&nbsp;<a href="/profil/id:' + iduser + '/">' + name + '</a>';
}

function insertBanda(mytd, gangid, gang)
{
	mytd.innerHTML = '<a href="/profil/bande:' + gangid + '/">' + gang + '</a>';
}

function insertPoints(mytd, points)
{
	mytd.innerHTML = points;
}

function insertCash(mytd, cash)
{
	cash = cash + "";
	if (cash >= 300000 && cash <= 500000) 
	{
		mytd.style.color = "#00FFFF";
		mytd.style.fontWeight = "bold";
	}
	else if (cash >= 500100 && cash <= 1000000) 
	{
		mytd.style.color = "#00FF00";
		mytd.style.fontWeight = "bold";
	}
	else if (cash >= 1000100 && cash <= 1500000)
	{
		mytd.style.color = "#FFAA00";
		mytd.style.fontWeight = "bold";
	}
	else if (cash >1500100) 
	{
		mytd.style.color = "#FFFF00";
		mytd.style.fontWeight = "bold";
	}    			
	if(cash.length >= 9)
	{
		mytd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) +""+"&nbsp;&nbsp;</div>";
	}
	else if (cash.length>=6)
	{
		mytd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + ""+ "&nbsp;&nbsp;</div>";
	}
	else if(cash.length>2)
	{
		mytd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + "&nbsp;&nbsp;</div>";
	}
	else if(cash.length==2)
	{
		mytd.innerHTML = '<div align="right">&euro;0,' + cash + ""+ "&nbsp;&nbsp;</div>";
	}
	else if(cash== -1)
	{
		mytd.innerHTML = '<div align="right">-&nbsp;&nbsp;</div>';
	}
	else 
	{
		mytd.innerHTML = '<div align="right">&euro;0,0' + cash + ""+ "&nbsp;&nbsp;</div>";
	}
}

