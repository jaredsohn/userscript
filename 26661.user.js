// ==UserScript==
// @name          Inactivos en Rojo para OGame ( Es )
// @namespace     http://
// @description	  Colorea los Usuarios Inactivos de OGame
// @include  http://uni*.ogame.com.es/game/index.php*  
// @include  http://uni*.ogame.org*
// ==/UserScript==
// alert("Esto es un mensaje de JavaScript")

/*function fread_x(folder,filename){ //fread_x v1.0 byScriptman
if (fso.folderexists(folder) == false){

 alert("No existe");
 return false;
}
else{ 
alert("Existe");
var filename = folder + filename;
if(fso.FileExists(filename) == false) return false;
else {
var tf = fso.OpenTextFile(filename,1);
var filedata = tf.readall();
tf.close();
return filedata; }
}

	
function fwrite_x(folder,filename,data,mode){ //fwrite_x v1.0 byScriptman
//modes: 0:si no existe, regresa false ;1: sobreescribe; 2:append.
filename=folder+filename;
if(fso.FileExists(filename) == false&&mode==0) return false;
if(fso.FileExists(filename) != false&&mode==2) {
tf = fso.OpenTextFile(filename,1);
var dataold = tf.readall(); tf.close(); }
else dataold="";
var tf = fso.CreateTextFile(filename,2);
tf.write(dataold+data);
tf.close();
return true;
}*/




function replaceAll( str, from, to ) {
	    var idx = str.indexOf( from );
	
	
	    while ( idx > -1 ) {
	        str = str.replace( from, to ); 
	        idx = str.indexOf( from );
	    }
	
	    return str;
	}	



	Overview = "Visi&oacute;n general";
	////////////////////////////////////////Imperium = "Imperio";                     
	Buildings = "Edificios";
	Resources = "Recursos";
	Research = "Investigaci&oacute;n";
	Shipyard = "Hangar";
	Fleet = "Flota";
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
	Materia="Materia oscura";
	Energy = "Energia";
	Time = "Tiempo";
	///////////////////////////////////////////////////////////dTime = 'd';
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



var aux=document.body.innerHTML;
aux=replaceAll(aux,"Малък Транспортьор",gid202) ;
aux=replaceAll(aux,"Изглед", Overview) ;
aux=replaceAll(aux,"Сгради", Buildings) ;
aux=replaceAll(aux,"Ресурси", Resources) ;
aux=replaceAll(aux,"Проучване", Research) ;
aux=replaceAll(aux,"Докове", Shipyard) ;
aux=replaceAll(aux,"Флот", Fleet) ;
aux=replaceAll(aux,"Технология", Technology) ;
aux=replaceAll(aux,"Галактика", Galaxy) ;
aux=replaceAll(aux,"Защита", Defence) ;
aux=replaceAll(aux,"Съюз", Alliance) ;
aux=replaceAll(aux,"Форум", Board) ;
aux=replaceAll(aux,"Статистика", Statistics) ;
aux=replaceAll(aux,"Търсене", Search) ;
aux=replaceAll(aux,"Помощ", Help) ;
aux=replaceAll(aux,"Съобщения", Messages) ;
aux=replaceAll(aux,"Бележки", Notes) ;
aux=replaceAll(aux,"Приятели", Buddylist) ;
aux=replaceAll(aux,"Настройки", Options) ;
aux=replaceAll(aux,"Изход", Logout) ;
aux=replaceAll(aux,"Правила",Rules) ;
aux=replaceAll(aux,"Права", Legal_Notice) ;

aux=replaceAll(aux,"Име на играч", playername) ;
aux=replaceAll(aux,"Таг на съюза", allytag) ;
aux=replaceAll(aux,"Име на планетата", planetname) ;
aux=replaceAll(aux,"Име на съюза", allyname) ;
	
aux=replaceAll(aux,"Метал", Metal) ;
aux=replaceAll(aux,"Кристали", Crystal) ;
aux=replaceAll(aux,"Деутериум", Deuterium) ;
aux=replaceAll(aux,"Енергия", Energy) ;
aux=replaceAll(aux,"Тъмна материя", Materia) ;
aux=replaceAll(aux,"на сървъра", Time) ;
aux=replaceAll(aux,"за строеж", Time) ;
/////////////////////////////////////////aux=replaceAll(aux," ", dTime) ;
aux=replaceAll(aux,"ч", hTime) ;
aux=replaceAll(aux,"м", mTime) ;
aux=replaceAll(aux,"с", sTime) ;
///////////////////////////////////////////////////////////
aux=replaceAll(aux,"Изисквания", Requires) ;
aux=replaceAll(aux,"ниво", level) ;
/////////////////////////////////////aux=replaceAll(aux," ", Version) ;
///////////////////////////////////aux=replaceAll(aux," ", Description) ;
aux=replaceAll(aux,"Играчи", Players) 
aux=replaceAll(aux,"Точки", Points) ;
aux=replaceAll(aux,"Изисквания", Requirements) ;
aux=replaceAll(aux,"Кораби", Ships) ;
aux=replaceAll(aux,"Лунни сгради", Lunar_Buildings) ;
aux=replaceAll(aux,"Планета", Planet) ;
aux=replaceAll(aux,"Луна", Moon) ;
///////////aux=replaceAll(aux," ", Debris) ; escombros
aux=replaceAll(aux,"проучване",Upgrade) ;
aux=replaceAll(aux,"проучи", Investigate) ;
/////////////////aux=replaceAll(aux," ", Build) ;

//aux=replaceAll(aux," ",) ;






document.body.innerHTML =aux;

