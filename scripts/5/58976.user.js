// ==UserScript==
// @name           Highscore v1.0
// @namespace      Highscore
// @description    Highscore Para Mendigogame
// @include        http://*mendigogame.es/highscore/*
// @exclude        http://*mendigogame.es/highscore/gang/*
// ==/UserScript==

var newdiv = document.createElement('div');
newdiv.innerHTML = '<script>function irPag() {var num = document.getElementById("numPag").value;if (num != "" && parseInt(num) > 0) { window.location.href = "/highscore/" + parseInt(num) + "/";}}</script><br/>Página: <input type="text" style="width:50px;" maxlength="5" id="numPag" name="numPag"/> <a href="javascript:irPag()">Ir</a><br/>';

var divs = document.getElementsByTagName('div');
divs[8].appendChild(newdiv);

var table = document.getElementsByTagName('table')[0];
table.setAttribute('width', '100%');

var tr = table.getElementsByTagName('tr');

var numColumnas = tr.length;

var newth_1 = document.createElement('th');
newth_1.setAttribute('align', 'left');
newth_1.setAttribute('nowrap', 'nowrap');
newth_1.innerHTML = 'Dinero';
tr[0].insertBefore(newth_1, tr[0].getElementsByTagName('th')[2]);

var newth_2 = document.createElement('th');
newth_2.setAttribute('align', 'left');
newth_2.setAttribute('nowrap', 'nowrap');
newth_2.innerHTML = 'Puntos (Banda)';
tr[0].insertBefore(newth_2, tr[0].getElementsByTagName('th')[4]);

var newth_3 = document.createElement('th');
newth_3.setAttribute('align', 'left');
newth_3.setAttribute('nowrap', 'nowrap');
newth_3.innerHTML = 'Alcohol';
tr[0].insertBefore(newth_3, tr[0].getElementsByTagName('th')[7]);

var newth_4 = document.createElement('th');
newth_4.setAttribute('align', 'left');
newth_4.setAttribute('nowrap', 'nowrap');
newth_4.innerHTML = 'Fecha Registro';
tr[0].insertBefore(newth_4, tr[0].getElementsByTagName('th')[8]);

var newth_5 = document.createElement('th');
newth_5.setAttribute('align', 'left');
newth_5.innerHTML = 'Mascota';
tr[0].insertBefore(newth_5, tr[0].getElementsByTagName('th')[9]);

var newth_6 = document.createElement('th');
newth_6.setAttribute('align', 'left');
newth_6.innerHTML = 'Status';
tr[0].insertBefore(newth_6, tr[0].getElementsByTagName('th')[10]);

var newth_7 = document.createElement('th');
newth_7.setAttribute('align', 'left');
newth_7.innerHTML = 'Rango';
tr[0].insertBefore(newth_7, tr[0].getElementsByTagName('th')[11]);

for (var x = 1; x<=numColumnas-1; x++)
{
	var td = tr[x].getElementsByTagName('td');
	var id1 = td[1].innerHTML.split('/profil/id:');
	var id = id1[1].split('/"');
	loadTable(id[0], x);
}


var br1 = document.createElement('br');
var br2 = document.createElement('br');
var br3 = document.createElement('br');
var br4 = document.createElement('br');
var br5 = document.createElement('br');
var table = document.getElementsByTagName('table')[0];
table.parentNode.insertBefore(br1, table);
table.parentNode.insertBefore(br2, table);
table.parentNode.insertBefore(br3, table);
table.parentNode.insertBefore(br4, table);
table.parentNode.insertBefore(br5, table);

function cargarBarrio(id) 
{
	var result = "-";
	switch (parseInt(id)) 
	{
		case 1: result = 'Arganzuela'; break;
		case 2: result = 'Retiro'; break;
		case 3: result = 'Chamartin'; break;
		case 4: result = 'Tetuán'; break;
		case 5: result = 'Chamberí'; break;
		case 6: result = 'Fuencarral-El Pardo'; break;
		case 7: result = 'Moncloa-Aravaca'; break;
		case 8: result = 'La Latina'; break;
		case 9: result = 'Carabanchel'; break;
		case 10: result = 'Usera'; break;
		case 11: result = 'Puente de Vallecas'; break;
		case 12: result = 'Moratalaz'; break;
		case 13: result = 'Ciudad Lineal'; break;
		case 14: result = 'Hortaleza'; break;
		case 15: result = 'Villaverde'; break;
		case 16: result = 'Villa de Vallecas'; break;
		case 17: result = 'Vicálvaro'; break;
		case 18: result = 'San Blas'; break;
		case 19: result = 'Salamanca'; break;
		case 20: result = 'Barajas'; break;
		case 21: result = 'Centro'; break;
		default: result = '-';
	}
	return result;
}

function loadTable(id, x) 
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://www.mendigogame.es/dev/api/user.' + id + '.xml',
		
        onload: function(responseDetails) 
        	{				
        		var parser = new DOMParser();
        		var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
        		var reg = dom.getElementsByTagName('reg_since')[0].textContent;
        		var id_gang = dom.getElementsByTagName('id')[1].textContent;
        		var name = dom.getElementsByTagName('name')[0].textContent;
        		var status = dom.getElementsByTagName('status')[0].textContent;
        		        		        		
        		var newtd_1 = document.createElement('td');        		
        		try
        		{
                	cash = dom.getElementsByTagName('cash')[0].textContent;
        			if (cash >= 300000 && cash <= 500000) 
        			{
        				newtd_1.style.color = "#00FFFF";
        				newtd_1.style.fontWeight = "bold";
        			}
        			else if (cash >= 500100 && cash <= 1000000) 
        			{
        				newtd_1.style.color = "#00FF00";
        				newtd_1.style.fontWeight = "bold";
        			}
        			else if (cash >= 1000100 && cash <= 1500000)
        			{
        				newtd_1.style.color = "#FFAA00";
        				newtd_1.style.fontWeight = "bold";
        			}
        			else if (cash >1500100) 
        			{
        				newtd_1.style.color = "#FFFF00";
        				newtd_1.style.fontWeight = "bold";
        			}     
        			
        			if(cash.length >= 9)
        			{
        				newtd_1.innerHTML = "&euro;" + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length);
        			}
        			else if (cash.length >= 6)
        			{
        				newtd_1.innerHTML = "&euro;" + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length);
        			}
        			else if(cash.length > 2)
        			{
        				newtd_1.innerHTML = "&euro;" + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length);
        			}
        			else if(cash.length == 2)
        			{
        				newtd_1.innerHTML = "&euro;0," + cash;
        			}
        			else
        			{
        				newtd_1.innerHTML = "&euro;0,0" + cash;
        			}
        		}
        		catch(err)
        		{
        			newtd_1.innerHTML = "-";
        		}
        		        		
        		var newtd_2 = document.createElement('td');    			
    			if (id_gang != 0 && id_gang != 'None') 
    			{
    				GM_xmlhttpRequest(
    				{
    					method: 'GET',
    					url: 'http://www.mendigogame.es/dev/api/gang.' + id_gang +'.xml',
    					onload: function(responseDetails) 
    						{
    							var parser_gang = new DOMParser();
    							var dom_gang = parser_gang.parseFromString(responseDetails.responseText, "application/xml");
    							try
    							{
    								var points = dom_gang.getElementsByTagName('points')[0].textContent;
    							} 
    							catch (err)
    							{
    								var points = "-";
    							}    					
    							newtd_2.innerHTML = points;    							
    						}
    				});
    			}
    			else {
    				newtd_2.innerHTML = '-';
    			}
    			
    			var newtd_3 = document.createElement('td');        		
        		try
        		{
        			var siglink = "http://img.mendigogame.es/cache/bl_DE/signaturen/";
        			var bac = '<div style="overflow: hidden; width: 40px; height: 11px;"><img style="position: relative; top: -44px; left: -120px;" src="' + siglink + id + '.jpg"></div>';
        			newtd_3.innerHTML = bac;        			
        		}
        		catch(err)
        		{
        			newtd_3.innerHTML = "-";
        		}	    			
    			
    			var newtd_4 = document.createElement('td');    			
    			newtd_4.innerHTML = reg;
    			
    			var temp = document.createElement('td');
    			var newtd_5 = document.createElement('td');
    			var newtd_6 = document.createElement('td');
    			GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://mendigogame.es/profil/id:'+id+'/',
					onload: function(responseDetails,id) 
					{
						var content = responseDetails.responseText;					
						var baneado = content.indexOf('El jugador ha sido borrado o lo han baneado');
											
						var online ='Borrado';				
						var petname = '-';	
						var petimage = '-';
						
						if (baneado == -1)		
						{
							try 
							{
								var onlineText = content.split('Está online')[1];
								online = onlineText.split('</')[0];			
							} 
							catch(err) 
							{
								online ='Offline';
							}
														
							try 
							{
								var side_split = content.split('http://media.mendigogame.es/img/tiere/fr');
								var side_split_2 = side_split[1].split('.jpg');
								petimage = 'fr' + side_split_2[0];
								petname = getPetName(petimage);
							} 
							catch (err) 
							{
								petname = '-';
							}
						}
								    			
		    			if (petimage != '-' && petname != '-')
		    			{   
			    			GM_xmlhttpRequest(
							{
								method: 'GET',
								url: 'http://www.mendigogame.es/overview/',
								onload: function(responseDetails) 
									{
										var content = responseDetails.responseText;			
										var side_split = content.split('http://media.mendigogame.es/img/tiere/fr');
										var side_split_2 = side_split[1].split('.jpg');
										var yourpet =  'fr' + side_split_2[0];
										var colorpet = getPetColor(yourpet, petimage);
										
										if (colorpet != '-')
						    			{
						    				newtd_5.style.color = colorpet; 
						    				newtd_5.style.fontWeight = "bold";
						    			}
									}
							});
		    			}		    			
						
						if (petimage != '-' && petname == '-')
						{
							var mascota = document.createElement('img');
							mascota.src = "http://media.mendigogame.es/img/tiere/" + petimage + ".jpg"
							mascota.style.width = '40px';
							mascota.style.height = '45px';	
							newtd_5.appendChild(mascota);
						}
						else
						{
							newtd_5.innerHTML = '<div align="middle">' + petname + '</div>';
						}
				
						if (online == 'Offline') 
						{
							newtd_6.innerHTML = '<div><font color="#FF0000">Offline</font></div>';						
						} 
						else if (online == 'Borrado') 
						{
							newtd_6.innerHTML = '<div><font color="#FFAA00">Borrado/Baneado</font></div>';
						}
						else 
						{ 					
							newtd_6.innerHTML = '<div><font color="#00FF00">Online</font></div>';
						}
					}
				});		
    			
    			var newtd_7 = document.createElement('td');
    			if (status == '3')
    			{
    				newtd_7.style.fontWeight = "bold";
    				newtd_7.innerHTML = '<font color="#00FFFF">admin</font>';
    			}
    			else if (status == '2')
    			{
    				newtd_7.style.fontWeight = "bold";
    				newtd_7.innerHTML = '<font color="#FFAA00">co-admin</font>';
    			}    			    			
    			
    			var idBarrio = tr[x].getElementsByTagName('td')[3].innerHTML;
    			tr[x].getElementsByTagName('td')[3].innerHTML = cargarBarrio(idBarrio);
    			
    			tr[x].insertBefore(newtd_1, tr[x].getElementsByTagName('td')[2]);
    			tr[x].insertBefore(newtd_2, tr[x].getElementsByTagName('td')[4]);
				tr[x].insertBefore(newtd_3, tr[x].getElementsByTagName('td')[7]);
				tr[x].insertBefore(newtd_4, tr[x].getElementsByTagName('td')[8]);
    			tr[x].insertBefore(newtd_5, tr[x].getElementsByTagName('td')[9]);
    			tr[x].insertBefore(newtd_6, tr[x].getElementsByTagName('td')[10]); 	
    			tr[x].insertBefore(newtd_7, tr[x].getElementsByTagName('td')[11]); 
        	}	
	});

};

function getPetName(image)
{
	var petname = '-';
	
	if(image == 'fr8142')
	{
		petname = 'Toro';
	}
	if(image == 'fr1256')
	{
		petname = 'Elefante';
	}
	else if(image == 'fr0385')
	{
		petname = 'Caballo';
	}
	else if(image == 'fr2474')
	{
		petname = 'Cabra';
	}
	else if(image == 'fr4263')
	{
		petname = 'Águila';
	}
	else if(image == 'fr2536')
	{
		petname = 'Monito';
	}
	else if(image == 'fr1456')
	{
		petname  = "Cocker Spaniel";
	}
	else if(image == 'fr8569')
	{
		petname  = "Rinoceronte";
	}
	else if(image == 'fr5687')
	{
		petname  = "Tigre";
	}
	else if(image == 'fr4843')
	{
		petname  = "Cocodrilo";
	}
	else if(image == 'fr2563')
	{
		petname  = "Jirafa";
	}
	else if(image == 'fr4220')
	{
		petname  = "Hipopótamo";
	}
	else if(image == 'fr7563')
	{
		petname  = "Chihuahua";
	}
	else if(image == 'fr5240')
	{
		petname  = "Pitbull";
	}
	else if(image == 'fr9051')
	{
		petname  = "Pastor Alemán";
	}
	else if(image == 'fr7760')
	{
		petname  = "Gallo";
	}
	else if(image == 'fr1482')
	{
		petname  = "Serpiente";
	}
	else if(image == 'fr9386')
	{
		petname  = "Halcón";
	}
	else if(image == 'fr3735')
	{
		petname  = "Gato";
	}
	else if(image == 'fr1903')
	{
		petname  = "Hurón";
	}
	else if(image == 'fr7730')
	{
		petname  = "Conejo";
	}
	else if(image == 'fr4591')
	{
		petname  = "Canario";
	}
	else if(image == 'fr3684')
	{
		petname  = "Rata";
	}
	else if(image == 'fr1451')
	{
		petname  = "Paloma";
	}
	else if(image == 'fr5423')
	{
		petname  = "Hamster";
	}
	else if(image == 'fr8795')
	{
		petname  = "Ratón";
	}
	else if(image == 'fr8930')
	{
		petname  = "Pez Rojo";
	}
	else if(image == 'fr8596')
	{
		petname  = "Cucaracha";
	} 			
	return petname
};

function getPetColor(yourpet, petimage)
{
	var win = '#00FF00';
	var draw = '#FFAA00';
	var lose = '#FF0000';
	
	if (yourpet == petimage)
	{
		return draw;
	}	
	if (yourpet == 'fr8596') //cucaracha 0
	{
		return lose;
	}
	if (petimage == 'fr8596')
	{
		return win;
	}
	if (yourpet == 'fr8930') // pez rojo 1
	{
		return lose;
	}
	if (petimage == 'fr8930')
	{
		return win;
	}
	if (yourpet == 'fr8795') // ratón 2
	{
		return lose;
	}
	if (petimage == 'fr8795')
	{
		return win;
	}
	if (yourpet == 'fr5423') // hamster 5
	{
		return lose;
	}
	if (petimage == 'fr5423')
	{
		return win;
	}
	if (yourpet == 'fr1451') // paloma 7
	{
		return lose;
	}
	if (petimage == 'fr1451')
	{
		return win;
	} 
	if (yourpet == 'fr3684') // rata 8
	{
		return lose;
	}
	if (petimage == 'fr3684')
	{
		return win;
	}
	if (yourpet == 'fr4591') // canario 10
	{
		return lose;
	}
	if (petimage == 'fr4591')
	{
		return win;
	}
	if (yourpet == 'fr7730') // conejo 13
	{
		return lose;
	}
	if (petimage == 'fr7730')
	{
		return win;
	}
	if (yourpet == 'fr1903') // hurón 18
	{
		return lose;
	}
	if (petimage == 'fr1903')
	{
		return win;
	}
	if (yourpet == 'fr3735') // gato 25
	{
		return lose;
	}
	if (petimage == 'fr3735')
	{
		return win;
	}
	if (yourpet == 'fr9386') // halcón 27
	{
		return lose;
	}
	if (petimage == 'fr9386')
	{
		return win;
	}
	if (yourpet == 'fr9051') // pastor alemán 28
	{
		return lose;
	}
	if (petimage == 'fr9051')
	{
		return win;
	}
	if (yourpet == 'fr1482') // serpiente 31
	{
		return lose;
	}
	if (petimage == 'fr1482')
	{
		return win;
	}	
	if (yourpet == 'fr7760') // gallo 36
	{
		return lose;
	}
	if (petimage == 'fr7760')
	{
		return win;
	}
	if (yourpet == 'fr5240') // pitbull 39
	{
		return lose;
	}
	if (petimage == 'fr5240')
	{
		return win;
	}
	if (yourpet == 'fr4843') // cocodrilo 44
	{
		return lose;
	}
	if (petimage == 'fr4843')
	{
		return win;
	}
	if (yourpet == 'fr2474') // Cabra 52
	{
		return lose;
	}
	if (petimage == 'fr2474')
	{
		return win;
	}
	if (yourpet == 'fr7563') // chihuahua 55
	{
		return lose;
	}
	if (petimage == 'fr7563')
	{
		return win;
	}
	if (yourpet == 'fr2563') // jirafa 59
	{
		return lose;
	}
	if (petimage == 'fr2563')
	{
		return win;
	}
	if (yourpet == 'fr5687') //tigre 62
	{
		return lose;
	}
	if (petimage == 'fr5687')
	{
		return win;
	}
	if (yourpet == 'fr4220') // hipopótamo 65
	{
		return lose;
	}
	if (petimage == 'fr4220')
	{
		return win;
	}
	if (yourpet == 'fr8569') // rinoceronte 71
	{
		return lose;
	}
	if (petimage == 'fr8569')
	{
		return win;
	}
	if (yourpet == 'fr1456') // cocker spaniel 74
	{
		return lose;
	}
	if (petimage == 'fr1456')
	{
		return win;
	}
	if (yourpet == 'fr2536') // monito 95
	{
		return lose;
	}
	if (petimage == 'fr2536')
	{
		return win;
	}
	if (yourpet == 'fr0385') // caballo 100
	{
		return lose;
	}
	if (petimage == 'fr0385')
	{
		return win;
	}
	if (yourpet == 'fr1256') // elefante 110
	{
		return lose;
	}
	if (petimage == 'fr1256')
	{
		return win;
	}
	if (yourpet == 'fr4263') // águila 136
	{
		return lose;
	}
	if (petimage == 'fr4263')
	{
		return win;
	}
	if (yourpet == 'fr8142') // toro 138
	{
		return lose;
	}
	if (petimage == 'fr8142')
	{
		return win;
	}
	
	return draw;
};