// ==UserScript==
// @name           Perfil de la Banda v1.0 
// @namespace      PerfilBanda
// @description    Perfil de la Banda.
// @include        http://*mendigogame.es/profil/bande:*
// ==/UserScript==

var userid1 = document.getElementsByTagName('html')[0].innerHTML.split("http://inodes.pennergame.de/es_ES/avatare/");
var userid2 = userid1[1].split('_');
var userid = userid2[0];
var siglink = "http://img.mendigogame.es/cache/bl_DE/signaturen/";

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
		GM_setValue("minpts",minpts);
		GM_setValue("maxpts",maxpts);
	}
});

var table = document.getElementsByTagName("table")[2];
table.setAttribute('cellspacing', '2');
table.setAttribute('cellpadding', '4'); 
var tr = table.getElementsByTagName("tr");
		
for (var x = 0; x <= tr.length; x++) 
{
	var text1 = tr[x].getElementsByTagName("td")[1].innerHTML.split('/profil/id:');
	tr[x].getElementsByTagName("td")[1].style.width = '100px';
	tr[x].style.valign = "middle";
	var id = text1[1].split('/">');
	var points = tr[x].getElementsByTagName('td')[2].textContent;
	var atacar = false;
	
	if (points >= GM_getValue("minpts") && points <= GM_getValue("maxpts")) 
	{
		tr[x].getElementsByTagName('td')[2].style.color = "#00FF00";
		atacar = true;
	}
	
	cargarInfoMiembro(id[0], x, atacar);	
}

function cargarInfoMiembro(id, x, atacar) 
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://www.mendigogame.es/dev/api/user.' + id + '.xml',
        onload: function(responseDetails) 
        {
			var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			try 
			{
        	 var cash = dom.getElementsByTagName('cash')[0].textContent;
			} 
			catch(err) 
			{
				var cash = -1;
			}
			var name = dom.getElementsByTagName('name')[0].textContent;
			var reg = dom.getElementsByTagName('reg_since')[0].textContent;
			var attref = 'http://www.mendigogame.es/fight/?to=' + name;
			var newtd = document.createElement('td');
			var newtd1 = document.createElement('td');			
			newtd1.style.width = "20px";
			var newtd5 = document.createElement('td');
			var newtd6 = document.createElement('td');

			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://mendigogame.es/profil/id:'+id+'/',
				onload: function(responseDetails,id) 
				{
					var content = responseDetails.responseText;					
					var baneado = content.indexOf('El jugador ha sido borrado o lo han baneado');
										
					var online ='Borrado';					
					var barrio = '-';					
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
							var location1 = content.split('Barrio</strong></td>')[1];
							var location2 = location1.split('<td bgcolor="#232323">')[1];
							barrio = location2.split('</td>')[0];
						}
						catch(err) 
						{
							barrio ='-';
						}
						
						try 
						{
							var side_split = content.split('http://media.mendigogame.es/img/tiere/');
							var side_split_2 = side_split[1].split('.jpg');
							petimage = side_split_2[0];
							petname = getPetName(petimage);
						} 
						catch (err) 
						{
							petname = '-';
						}
					}
										
					if (petimage != '-' && petname != '-')
	    			{   
						newtd5.style.color = "#DF3918";
						
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
					    				newtd5.style.color = colorpet; 
					    				newtd5.style.fontWeight = "bold";
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
						newtd5.appendChild(mascota);
					}
					else
					{						
						newtd5.innerHTML = '<div align="middle">' + petname + '</div>';
					}
			
					if (online == 'Offline') 
					{
						newtd1.innerHTML = '<div align="middle"><img src="http://i35.tinypic.com/xysz4.jpg></img></div>';						
					} 
					else if (online == 'Borrado') 
					{
						newtd1.innerHTML = '<div><font color="#FF0000"> (Borrado/Baneado)</font></div>';
					}
					else 
					{ 					
						newtd1.innerHTML='<div align ="middle"><img src="http://media.mendigogame.es/img/on.png></img></div>';
					}
		
					newtd6.innerHTML = '<div align="left">' + barrio + '</div>';
				}
			});		
			
			var newtd2 = document.createElement('td');
			var newtd3 = document.createElement('td');
			
			if (atacar)
			{
				var espada = document.createElement('img');
				espada.src = "http://media.pennergame.de/img/att.gif"				
				var fightLink = document.createElement('a');
				fightLink.setAttribute('href', attref); 
				fightLink.appendChild(espada);				
				newtd3.appendChild(fightLink);
			}
						
			newtd2.innerHTML = '<div align="middle">' + reg + '</div>';
			
			var newtd4 = document.createElement('td');
			var pskript = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="' 	+ siglink + id + '.jpg"></div></div>'						
			newtd4.innerHTML = pskript;
			
			if (cash >= 300000 && cash <= 500000) 
			{
				newtd.style.color = "#00FFFF";
				newtd.style.fontWeight = "bold";
			}
			else if (cash >= 500100 && cash <= 1000000) 
			{
				newtd.style.color = "#00FF00";
				newtd.style.fontWeight = "bold";
			}
			else if (cash >= 1000100 && cash <= 1500000)
			{
				newtd.style.color = "#FFAA00";
				newtd.style.fontWeight = "bold";
			}
			else if (cash >1500100) 
			{
				newtd.style.color = "#FFFF00";
				newtd.style.fontWeight = "bold";
			}    			
			if(cash.length >= 9)
			{
				newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) +""+"</div>";
			}
			else if (cash.length>=6)
			{
				newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + ""+ "</div>";
			}
			else if(cash.length>2)
			{
				newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + "</div>";
			}
			else if(cash.length==2)
			{
				newtd.innerHTML = '<div align="right">&euro;0,' + cash + ""+ "</div>";
			}
			else if(cash== -1)
			{
				newtd.innerHTML = '<div align="right">-</div>';
			}
			else 
			{
				newtd.innerHTML = '<div align="right">&euro;0,0' + cash + ""+ "</div>";
			}
						
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[4]);
			tr[x].insertBefore(newtd1, tr[x].getElementsByTagName('td')[5]);
			tr[x].insertBefore(newtd5, tr[x].getElementsByTagName('td')[6]);
			tr[x].insertBefore(newtd2, tr[x].getElementsByTagName('td')[7]);
			tr[x].insertBefore(newtd6, tr[x].getElementsByTagName('td')[8]);
			tr[x].insertBefore(newtd3, tr[x].getElementsByTagName('td')[9]);
			tr[x].insertBefore(newtd4, tr[x].getElementsByTagName('td')[10]);
						
			for (var y=0; y<=10; y++)
			{
				if (x%2 == 0)
				{
					tr[x].getElementsByTagName('td')[y].setAttribute('bgcolor', '#1F1F1F');
				}
				else
				{
					tr[x].getElementsByTagName('td')[y].setAttribute('bgcolor', '#313131');
				}
			}
			
		}
	});
}

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
}

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