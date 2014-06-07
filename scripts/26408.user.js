// ==UserScript==
// @name          Inactivos en Rojo para OGame ( Es )
// @namespace     http://
// @description	  Colorea los Usuarios Inactivos de OGame
// @include  http://uni*.ogame.com.es/game/index.php*  
// @include  http://uni*.ogame.org*
// ==/UserScript==
// alert("Esto es un mensaje de JavaScript")
   



   function str_replace(cadena, cambia_esto, por_esto) {

      return cadena.split(cambia_esto).join(por_esto);
}
    Overview = "Visi&oacute;n general";
    Merchant = "Mercader";
	Imperium = "Imperio";
	Buildings = "Edificios";
	Resources = "Recursos";
	Research = "Investigaci&oacute;n";
	Shipyard = "Hangar";
	infor_espio_de = "Informe espionaje de ";
	Fleet = "Flota";
	Pago= "Pago";
	Technology = "Tecnologia";
	Galaxy = "Galaxia";
	Defence = "Defensa";
	Alliance = "Alianza";
	Board = "Foro";
	Statistics = "Estadisticas";
	Search = "Buscar";
	Help = "Ayuda";
	Messages = "Mensajes";
	Notes = "Notas";
	Buddylist = "Compa&ntilde;eros";
	Options = "Opciones";
	Logout = "Salir";
	Rules = "Reglas";
	Legal_Notice = "Contactos";
	//--[Search]-------------------------
	playername = "Nombre del jugador";
	planetname = "Nombre del planeta";
	allytag = "Etiqueta de la alianza";
	allyname = "Nombre de la alianza";
	//--[Misc]---------------------------
	Metal = "Metal";
	Crystal = "Cristal";
	Deuterium = "Deuterio";
	Energy = "Energia";
	Time = "Tiempo";
	dTime = 'd';
	hTime = "h";
	mTime = "m";
	sTime = "s";
	Requires = 'Requiere';
	level = "nivel";
	Version = "Versi&oacute;n";
	Description = "Descripci&oacute;n";
	Players = 'Jugadores';
	Points = 'Puntos';
	Requirements = 'Requisitos';
	Ships = 'Naves espaciales';
	Lunar_Buildings = 'Construcciones especiales';
	Planet = 'Planeta';
	Moon = 'Luna';
	Debris = 'Escombros';
	Build = 'Construir';
	Upgrade = "Ampliar al";
	Investigate = 'Investigar';
	Planet_menu = "Menu del planeta";
	No_ships = 'Ninguna nave';
	All_ships = 'Todas las naves';
	maxShip = 'max';
	Max_resources = 'Max recursos';
	Attack = "Atacar";
	Transport = "Transportar";
	Move = "Desplazar";
	Fleet_Position = "Mantener posici&oacute;n";
	Spy = "Espiar";
	Harvest = "Recolectar";
	Destroy = "Destruir";
	//--[Message]---------------------------
	SpyPorcent = 'Oportunidad para defenderse del espionaje';
	IsApproaches = 'ha sido detectada cerca de tu planeta ';
	ARowExternalFleet = 'Una flota enemigo del planeta ';
	YourFleet = 'Una de tus flotas';
	ComeFrom = 'vuelve de';
	Returns = 'a';
	ReturnWithoutResources = 'La flota ha vuelto sin traer recursos.';
	Resources_in = 'Recursos en';
	Circular_message = 'Correo Circular';
	Fleet_Return = 'Retorno de una flota';
	Fleet_Order = 'Orden de la flota';
	Spy_Alert = 'Acci&oacute;n de espionaje';
	Space_Control = 'Control del espacio';
	Spy_Compact = 'Mostrar unicamente encabezado de los informes de espionaje';
	Delete_All = 'Borrar todos los mensajes';
	Delete_All_Shown = 'Borrar todos los mensajes mostrados';
	Delete_Non_Marked = 'Borrar todos los mensajes sin marcar';
	Delete_Marked = 'Borrar mensajes marcados';
	//--[id]---------------------------
	gid1 = "Mina de Metal";
	gid2 = "Mina de Cristal";
	gid3 = "Sintetizador de deuterio";
	gid4 = "Planta de energ&iacute;a solar";
	gid12 = "Fusion Reactor";
	gid14 = "F&aacute;brica de Robots";
	gid15 = "F&aacute;brica de Nanobots";
	gid21 = "Hangar";
	gid22 = "Almac&eacute;n de metal";
	gid23 = "Almac&eacute;n de cristal";
	gid24 = "Contenedor de deuterio";
	gid31 = "Laboratorio de investigaci&oacute;n";
	gid33 = "Terraformer";
	gid34 = "Dep&oacute;sito de la Alianza";
	gid41 = "Base lunar";
	gid42 = "Sensor Phalanx";
	gid43 = "Salto cu&aacute;ntico";
	gid44 = "Silo";
	gid106 = "Tecnolog&iacute;a de espionaje";
	gid108 = "Tecnolog&iacute;a de computaci&oacute;n";
	gid109 = "Tecnolog&iacute;a militar";
	gid110 = "Tecnolog&iacute;a de defensa";
	gid111 = "Tecnolog&iacute;a de blindaje";
	gid113 = "Tecnolog&iacute;a de energ&iacute;a";
	gid114 = "Tecnolog&iacute;a de hiperespacio";
	gid115 = "Motor de combusti&oacute;n";
	gid117 = "Motor de impulso";
	gid118 = "Propulsor hiperespacial";
	gid120 = "Tecnolog&iacute;a l&aacute;ser";
	gid121 = "Tecnolog&iacute;a i&oacute;nica";
	gid122 = "Tecnolog&iacute;a de plasma";
	gid123 = "Red de investigaci&oacute;n intergal&aacute;ctica";
	gid199 = "Tecnolog&iacute;a de gravit&oacute;n";
	gid202 = "Nave peque&ntilde;a de carga";
        gid202a = 'Nave peque&ntilde;a de carga';
	gid203 = "Nave grande de carga";
	gid204 = "Cazador ligero";
	gid205 = "Cazador pesado";
	gid206 = "Crucero";
	gid207 = "Nave de batalla";
	gid208 = "Colonizador";
	gid209 = "Reciclador";
	gid210 = "Sonda de espionaje";
	gid211 = "Bombardero";
	gid212 = "Sat&eacute;lite solar";
	gid213 = "Destructor";
	gid214 = "Estrella de la muerte";
	gid401 = "Lanzamisiles";
	gid402 = "L&aacute;ser peque&ntilde;o";
	gid403 = "L&aacute;ser grande";
	gid404 = "Ca&ntilde;&oacute;n Gauss";
	gid405 = "Ca&ntilde;&oacute;n i&oacute;nico";
	gid406 = "Ca&ntilde;&oacute;n de plasma";
	gid407 = "C&uacute;pula peque&ntilde;a de protecci&oacute;n";
	gid408 = "C&uacute;pula grande de protecci&oacute;n";
	gid502 = "Misil de intercepci&oacute;n";
	gid503 = "Misil interplanetario";
	//--[Reports]----------------
	Number = 'Numero';
	at = "a";

function replaceAll( str, from, to ) {
	    var idx = str.indexOf( from );
	
	
	    while ( idx > -1 ) {
	        str = str.replace( from, to ); 
	        idx = str.indexOf( from );
	    }
	
	    return str;
	}	
var aux=document.body.innerHTML;
aux=replaceAll(aux,"Малък Транспортьор",gid202)
document.body.innerHTML =aux;
                           //document.body.innerHTML = //document.body.innerHTML.replaceAll("Малък Транспортьор",gid202);


//}

	


////////Pone nombres de menu en galaxia
var hrefer = self.location.href;

if(hrefer.indexOf('galaxy')!=-1){
var div = document.getElementById('leftmenu');  
var a = div.getElementsByTagName('a');
for (var i = a.length - 1; i >= 0; i--) {
if(a[i].href.indexOf('overview&')!=-1) {
a[i].innerHTML = Overview;
}else
if(a[i].href.indexOf('b_building')!=-1) {
a[i].innerHTML = Buildings;
}else
		if(a[i].href.indexOf('resources')!=-1){
			a[i].innerHTML = Resources;
		}else
		if(a[i].href.indexOf('buildings')!=-1&&a[i].href.indexOf('&mode=Forschung')!=-1){
			a[i].innerHTML = Research;
		}else
		if(a[i].href.indexOf('buildings')!=-1&&a[i].href.indexOf('&mode=Flotte')!=-1){
			a[i].innerHTML = Shipyard;
		}else
		if(a[i].href.indexOf('flotten1')!=-1&&a[i].href.indexOf('&mode=Flotte')!=-1){
			a[i].innerHTML = Fleet;
		}else
		if(a[i].href.indexOf('techtree')!=-1){
			a[i].innerHTML = Technology;
		}else
		if(a[i].href.indexOf('galaxy')!=-1){
			a[i].innerHTML = Galaxy;
		}else
		if(a[i].href.indexOf('trader')!=-1){
			a[i].innerHTML = Merchant;
		}else
		if(a[i].href.indexOf('buildings')!=-1&&a[i].href.indexOf('&mode=Verteidigung')!=-1){
			a[i].innerHTML = Defence;
		}else
		if(a[i].href.indexOf('allianzen')!=-1){
			a[i].innerHTML = Alliance;
		}else
		if(a[i].href.indexOf('statistics')!=-1){
			a[i].innerHTML = Statistics;
		}else
		if(a[i].href.indexOf('suche')!=-1){
			a[i].innerHTML = Search;
		}else
		if(a[i].href.indexOf('http://tutorial.')!=-1){
			a[i].innerHTML = Help;
		}else
		if(a[i].href.indexOf('messages')!=-1){
			a[i].innerHTML = Messages;
		}else
		if(a[i].href.indexOf('notizen')!=-1){
			a[i].innerHTML = Notes;
		}else
		if(a[i].href.indexOf('buddy')!=-1){
			a[i].innerHTML = Buddylist;
		}else
		if(a[i].href.indexOf('options')!=-1){
			a[i].innerHTML = Options;
		}else
		if(a[i].href.indexOf('logout')!=-1){
			a[i].innerHTML = Logout;
		}else
		if(a[i].href.indexOf('micropayment')!=-1){
			a[i].innerHTML = Pago;
		}else
		if(a[i].href.indexOf('http://ogame')!=-1 || a[i].href.indexOf('http://board.ogame')!=-1){
			a[i].innerHTML = Rules;
		}else
		if(a[i].href.indexOf('impress&special')!=-1){
			a[i].innerHTML = Legal_Notice;
		}    

    
    }


}                                 
//funciosn de traducir mensajes


var div =document.getElementById('header_top'); 
var tds = div.getElementsByTagName('td');
	tds[9].getElementsByTagName('font')[0].innerHTML = Metal;
	tds[10].getElementsByTagName('font')[0].innerHTML = Crystal;
	tds[11].getElementsByTagName('font')[0].innerHTML = Deuterium;
	tds[13].getElementsByTagName('font')[0].innerHTML = Energy;
                                 
                                 
                                 
                               
///Pone nombres de menu en cualquier pantalla,para galaxia no funcionaba y e tenido que hacer otra
var div = document.getElementById('leftmenu');                                
                                 
                                                                                  
                                                                
var a = div.getElementsByTagName('a');
for (var i = a.length - 1; i >= 0; i--) {
if(a[i].href.indexOf('overview&')!=-1) {
a[i].innerHTML = Overview;
}else
if(a[i].href.indexOf('b_building')!=-1) {
a[i].innerHTML = Buildings;
}else
		if(a[i].href.indexOf('resources')!=-1){
			a[i].innerHTML = Resources;
		}else
		if(a[i].href.indexOf('buildings')!=-1&&a[i].href.indexOf('&mode=Forschung')!=-1){
			a[i].innerHTML = Research;
		}else
		if(a[i].href.indexOf('buildings')!=-1&&a[i].href.indexOf('&mode=Flotte')!=-1){
			a[i].innerHTML = Shipyard;
		}else
		if(a[i].href.indexOf('flotten1')!=-1&&a[i].href.indexOf('&mode=Flotte')!=-1){
			a[i].innerHTML = Fleet;
		}else
		if(a[i].href.indexOf('techtree')!=-1){
			a[i].innerHTML = Technology;
		}else
		if(a[i].href.indexOf('galaxy')!=-1){
			a[i].innerHTML = Galaxy;
		}else
		if(a[i].href.indexOf('trader')!=-1){
			a[i].innerHTML = Merchant;
		}else
		if(a[i].href.indexOf('buildings')!=-1&&a[i].href.indexOf('&mode=Verteidigung')!=-1){
			a[i].innerHTML = Defence;
		}else
		if(a[i].href.indexOf('allianzen')!=-1){
			a[i].innerHTML = Alliance;
		}else
		if(a[i].href.indexOf('statistics')!=-1){
			a[i].innerHTML = Statistics;
		}else
		if(a[i].href.indexOf('suche')!=-1){
			a[i].innerHTML = Search;
		}else
		if(a[i].href.indexOf('http://tutorial.')!=-1){
			a[i].innerHTML = Help;
		}else
		if(a[i].href.indexOf('messages')!=-1){
			a[i].innerHTML = Messages;
		}else
		if(a[i].href.indexOf('notizen')!=-1){
			a[i].innerHTML = Notes;
		}else
		if(a[i].href.indexOf('buddy')!=-1){
			a[i].innerHTML = Buddylist;
		}else
		if(a[i].href.indexOf('options')!=-1){
			a[i].innerHTML = Options;
		}else
		if(a[i].href.indexOf('logout')!=-1){
			a[i].innerHTML = Logout;
		}else
		if(a[i].href.indexOf('micropayment')!=-1){
			a[i].innerHTML = Pago;
		}else
		if(a[i].href.indexOf('http://ogame')!=-1 || a[i].href.indexOf('http://board.ogame')!=-1){
			a[i].innerHTML = Rules;
		}else
		if(a[i].href.indexOf('impress&special')!=-1){
			a[i].innerHTML = Legal_Notice;
		}
}


//Cambia nombre de naves

if(hrefer.indexOf('flotten1')!=-1){
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('noShips();')!=-1){
				a[i].innerHTML = No_ships;
			}else
			if(a[i].href.indexOf('maxShips()')!=-1){
				a[i].innerHTML = All_ships;
			}else
			if(a[i].href.indexOf('maxShip(\'')!=-1){
			  var numb = a[i].href.indexOf('\')');
			  var nShip = a[i].href.substring(numb,numb-3);
				a[i].innerHTML = maxShip;
				var aParent = a[i].parentNode.parentNode.getElementsByTagName('th')[0];
				aParent.getElementsByTagName('a')[0].innerHTML = eval('gid'+nShip);
			}
		}
	}




//Modifica los mensajes


if(hrefer.indexOf('messages')!=-1 && hrefer.indexOf('writemessages')==-1){
                                   
           var option = document.getElementsByTagName('option');
		   for (var i = option.length - 1; i >= 0; i--) {
			if(option[i].value=='deleteall'){
				option[i].innerHTML = Delete_All;
			}else if(option[i].value=='deleteallshown'){
				option[i].innerHTML = Delete_All_Shown;
			}else if(option[i].value=='deletenonmarked'){
				option[i].innerHTML = Delete_Non_Marked;
			}else if(option[i].value=='deletemarked'){
				option[i].innerHTML = Delete_Marked;
			}
		}                        
                                   
           var cnt = document.getElementById('content');  
           var m = cnt.getElementsByTagName('th');
           m[0].innerHTML = "Accion";
           m[1].innerHTML = "Fecha";
           m[2].innerHTML = "De";
           m[3].innerHTML = "Asunto";
       

var esp = cnt.getElementsByTagName('th');
  for (var i = esp.length - 1; i >= 0; i--) {
               var txt=esp[i].innerHTML;
               if(txt.indexOf('Управление на флота ')!=-1){
                                  esp[i].innerHTML="Informe de flota";     
                                       }else if(txt.indexOf('Команда на флотата ')!=-1){
                                        
                                         esp[i].innerHTML="Reporte de batalla"; 
                                         }

                                       }


           var s=cnt.getElementsByTagName('span');
           for(var i = s.length - 1; i >= 0; i--) {
                    if(s[i].className=="espionagereport"){
                               var aParent = s[i].parentNode;
                               var txt=aParent.innerHTML;
                               var lista=txt.split(" ");
                              
                               var lista2=lista[1].split('>');                      
                               lista2[1]=">Informe";
                               lista[1]=lista2[0]+lista2[1];
                               lista[2]="espionaje";
                               lista[3]="de";
                               txt= lista.join(" ");
                               aParent.innerHTML =txt;
                             
                                /*var numb = s[i].indexOf('<'); 
                                 alert("entra en espionaje2");
                                var numb22 = 48; 
                                alert("entra en espionaje3");
                                var nomplanet= s[i].substring(numb,numb-numb22);
                                alert(infor_espio_de+nomplanet);
                                s[i].innerHTML =infor_espio_de+nomplanet; */   
                                }
}
              
           
		


      
           
           
          
       
var esp = cnt.getElementsByTagName('td');
for (var i = esp.length - 1; i >= 0; i--) {
               var txt=esp[i].innerHTML;

if(txt.indexOf('Метал')!=-1){
                                  esp[i].innerHTML= Metal;   
               }else
if(txt.indexOf('Кристал')!=-1 && txt.indexOf('Мина за Кристал')==-1){
                                  esp[i].innerHTML= Crystal;   
               }else 
if(txt.indexOf('Деутериум')!=-1 && txt.indexOf('Синтезатор за Деутериум')==-1){
                                  esp[i].innerHTML= Deuterium;   
               }else
if(txt.indexOf('Енергия')!=-1){
                                  esp[i].innerHTML= Energy;   
               }else
if(txt.indexOf('Малък Транспортьор')!=-1){                           

                                  document.body.innerHTML = document.body.innerHTML.replace("Малък Транспортьор",gid202);  
               }else
if(txt.indexOf('Голям Транспортьор')!=-1){
                                  esp[i].innerHTML= gid203;   
               }else
if(txt.indexOf('Лек Изтребител')!=-1){
                                  esp[i].innerHTML= gid204;   
               }else
if(txt.indexOf('Тежък Изтребител')!=-1){
                                  esp[i].innerHTML= gid205;   
               }else
if(txt.indexOf('Кръстосвач')!=-1){
                                  esp[i].innerHTML= gid206;   
               }else
if(txt.indexOf('Боен Кораб')!=-1){
                                  esp[i].innerHTML= gid207;   
               }else
if(txt.indexOf('Колонизатор')!=-1){
                                  esp[i].innerHTML= gid208;   
               }else
if(txt.indexOf('Рециклатор')!=-1){
                                  esp[i].innerHTML= gid209;   
               }else
if(txt.indexOf('Шпионска сонда')!=-1){
                                  esp[i].innerHTML= gid210;   
               }else
if(txt.indexOf('Бомбардировач')!=-1){
                                  esp[i].innerHTML= gid211;   
               }else
if(txt.indexOf('Соларен сателит')!=-1){
                                  esp[i].innerHTML= gid212;   
               }else
if(txt.indexOf('Унищожител')!=-1){
                                  esp[i].innerHTML= gid213;   
               }else
if(txt.indexOf('Звезда на смъртта')!=-1){
                                  esp[i].innerHTML= gid214;   
               }else
if(txt.indexOf('Боен Кръстосвач')!=-1){
                                  esp[i].innerHTML= "Acorazado";   
               }else
if(txt.indexOf('Ракетна установка')!=-1){
                                  esp[i].innerHTML=gid401;

               }else
if(txt.indexOf('Лек лазер')!=-1){
                                  esp[i].innerHTML=gid402;

               }else
if(txt.indexOf('Тежък лазер')!=-1){
                                  esp[i].innerHTML=gid403;

               }else
if(txt.indexOf('Гаус оръдие')!=-1){
                                  esp[i].innerHTML=gid404;

               }else
if(txt.indexOf('Йонно оръдие')!=-1){
                                  esp[i].innerHTML=gid405;

              }else
if(txt.indexOf('Плазмено оръдие')!=-1){
                                  esp[i].innerHTML=gid406;

               }else
if(txt.indexOf('Малък щит')!=-1){
                                  esp[i].innerHTML=gid407;

               }else
if(txt.indexOf('Голям щит')!=-1){
                                  esp[i].innerHTML=gid408;

               }else
if(txt.indexOf('Анти-балистични ракети')!=-1){
                                  esp[i].innerHTML=gid502;

               }else
if(txt.indexOf('Междупланетарни ракети')!=-1){
                                  esp[i].innerHTML=gid503;

}else
if(txt.indexOf('Мина за метал')!=-1){
                                  esp[i].innerHTML=gid1;

}else
if(txt.indexOf('Мина за Кристал')!=-1){
                                  esp[i].innerHTML=gid2;

}else
if(txt.indexOf('Синтезатор за Деутериум')!=-1){
                                  esp[i].innerHTML=gid3;

}else
if(txt.indexOf('Соларен панел')!=-1){
                                  esp[i].innerHTML=gid4;

}else
if(txt.indexOf('Ядрен Реактор')!=-1){
                                  esp[i].innerHTML=gid12;

}else
if(txt.indexOf('Фабрика за роботи')!=-1){
                                  esp[i].innerHTML=gid14;

}else
if(txt.indexOf('Фабрика за наноботи')!=-1){
                                  esp[i].innerHTML=gid15;

}else
if(txt.indexOf('Докове')!=-1){
                                  esp[i].innerHTML=gid21;

}else
if(txt.indexOf('Склад за метал')!=-1){
                                  esp[i].innerHTML=gid22;

}else
if(txt.indexOf('Склад за кристали')!=-1){
                                  esp[i].innerHTML=gid23;

}else
if(txt.indexOf('Резервоар за деутериум')!=-1){
                                  esp[i].innerHTML=gid24;

}else
if(txt.indexOf('Изследователска лаборатория')!=-1){
                                  esp[i].innerHTML=gid31;

}else
if(txt.indexOf('Тераформер')!=-1){
                                  esp[i].innerHTML=gid33;

}else
if(txt.indexOf('Склад на съюза')!=-1){
                                  esp[i].innerHTML=gid34;

}else
if(txt.indexOf('Ракетен силоз')!=-1){
                                  esp[i].innerHTML=gid44;
}

}

           
}
