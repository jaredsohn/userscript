// ==UserScript==
// @name           Ally Museum Control
// @namespace      WTFack
// @description    Organize your museums easier than ever!
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @exclude        http://support.ikariam.*/*
// ==/UserScript==


//v1.2 	Multilanguage feature included
//	Easy setup which does not require editing included
//v1.0 	First Release

var version = 'v1.2.1';


function getLanguage()
{
	var lang = GM_getValue('AMC_Lang');
	
	if (lang == null)	{
		
	  	if(navigator.language == 'es-ES') { lang = 'esES'; }
		if(navigator.language == 'en-US') { lang = 'enUS'; }
		if(navigator.language == 'en-GB') { lang = 'enUS'; }
		if(navigator.language == 'ca-CA') { lang = 'caCA'; }
		}
		
	if (lang == null) {lang = "enUS";}
	
	GM_setValue('AMC_Lang',lang);
	
	var langs = 
	{ 
		esES: // Spanish (Spain) Original by WTFack
		{ 
		welcome: 'Enhorabuena, ha instalado Ally Museum Control satisfactoriamente.\n\n¿Desea configurarlo ahora?\n\nSi no es el primer AMC que instala se recomienda encarecidamente configurarlo desde aquí, pero si es el primero y no sabe que tiene que poner haga click en Cancelar y posteriormente en Opciones de Ikariam encontrará información más detallada.\n\nEn cualquier caso puede intentar continuar con la configuración y si en algún paso no sabe que poner simplemente dejelo en blanco.',
		nickrequest: "Introduzca el nick de AMC (No tiene porque ser el mismo de Ikariam)",
		passrequest:'Introduzca la contraseña de AMC (OJO! NO LA DE IKARIAM sino la del foro de tu alianza o una que te proporcione la persona que haya instalado el servidor, preguntele)',
		serverrequest:'Introduzca la dirección del PHP (Servidor)\n\nConsulte con el que haya instalado el servidor en su alianza sobre lo que tiene que introducir aquí',
		playeridrequest:'Introduzca su Player-ID.\n\nSi no sabe cual es, simplemente dejelo en blanco',
		worldnowrequest:'¿Quiere configurar el script para el mundo actual ',
		worldrequest:'Introduzca el NÚMERO de mundo (1-alpha, 2-beta...)',
		nowallyrequest: 'Por favor inserte el nombre COMPLETO de su alianza (si no lo hace simplemente visite la embajada o la pagina de alianza/diplomacia)',
		myalliesrequest: 'Por favor inserte, si es que hay, los nombres completos de las alianzas aliadas con las que comparte el script separandolas mediante ||| (no ponga espacios entre ellas, solo |||)',
		countryrequest_1: '¿Quiere usar el script en este servidor (.',
		countryrequest_2: 'Por favor inserte las letras que identifican el servidor en el que quiere usar este script',
		thanks1:'Gracias por instalar Ally Museum Control para el mundo ',
		thanks2:'.\n\nPodrá comprobar su correcto funcionamiento en la vista de museo, de alianza o de distribución de bienes culturales donde aparecerán mensajes confirmando la actualización de los datos o la información sobre huecos disponibles en caso de que los tenga.',
		sthmissing:"Ha completado la instalación de AMC satisfactoriamente pero debe pasarse por las Opciones de Ikariam para completar la información ya que ha saltado uno o más pasos",
		setuplater:'Puede elegir el mundo y configurar el script cuando quiera en opciones, hasta que no lo haga no funcionará y si tiene más de uno puede que tenga problemas para editarlos.\n\nSi es así desactivelos mediante GreaseMonkey y vaya activando y configurando de uno en uno.',
		cnftitle: "Configuración del Script Ally Museum Control",
		nowallytext: 'Nombre Completo de su Alianza',
		xplnplayerid_1: "(Puede no ser el mismo valor que aparece arriba en Debug Data, si tiene problemas pulse ",
		xplnplayerid_2:	"aquí",
		xplnplayerid_3: "'En algunas ocasiones, tras baneos o similares circunstancias, el valor que aparece en opciones se ve modificado, para saber el valor original debemos pedirle a un compañero que vaya a mandarnos un privado y en la URL le aparecerán unos numeros que son nuestra ID'",
		xplnnick_1: "(<b>NO se refiere al nick y la contraseña de Ikariam</b> sino los de Ally Museum Control. Más info ",
		xplnnick_2:	"aquí",
		xplnnick_3: "'Ally Museum Control requiere de la configuración de un servidor que administre los usuarios con acceso al script, puede que esté adaptado al foro de tu alianza o que haya unos datos estándar que te proporcionara el que haya instalado el servidor de Ally Museum Control. Si tiene dudas, consulte a esa persona.'",
		xplnserver_1: "(Si no sabe que poner en este campo, por favor haga click ",
		xplnserver_2: "aquí",
		xplnserver_3: "'Ally Museum Control requiere de la configuración de un servidor, pregunte a la persona que lo haya instalado en su alianza por la dirección del servidor.'",
		xplnworld: 'Instale el script una vez por cada mundo en el que necesita que funcione',
		xplnnowally: 'Por favor introduzca el nombre completo (largo) de su alianza, puede mirarlo en la embajada o en la pagina de Alianza/Diplomacia',
		xplncountry: "Mira en la URL despues de sXX.ikariam. y encontraras un par de letras como org, es, de o similar",
		xplnmyallies_1: 'Nombres completos separados con ||| simplemente, nada de espacios. Más info ',
		xplnmyallies_2: 'aquí',
		xplnmyallies_3: "Si introduces aquí otras alianzas que usan el mismo script (y el mismo server) tal y como se indica (p.ej. sería, sin las comillas: `-13 Titanes-|||Armada Invencible|||Magnum Empire´) te aparecerá también para mandarles pactos a ellos",
		servertext: 'Direccion del PHP (Servidor)',
		countrytext: 'Servidor de Ikariam (Pais)',
		lngtext: 'Idioma',
		worldtext: 'Mundo',
		myalliestext: 'Otras alianzas amigas',
		scriptoff: 'Desactivado',
		savecnf: 'Guardar configuración de AMC',
		datasaved: "Datos guardados satisfactoriamente.",
		nodatasaved: "No se han guardado los datos.",
		confirmworldchange_1: 'Estás seguro de que quieres cambiar el mundo a ',
		confirmworldchange_2: "? Si aceptas no podrás volverlo a cambiar salvo desde el mundo que hayas seleccionado.",
		confirmdeactivate: "Estas seguro de que quieres desactivar el script? Una vez lo hagas aparecerá en todos los mundos hasta que selecciones uno nuevo.",
		txtlng:"es",
		needupdate: 'Su versión de Ally Museum Control está obsoleta, haga click en Aceptar si quiere actualizarla ahora o en Cancelar si prefiere hacerlo manualmente desde: http://userscripts.org/scripts/show/54490',
		
		},
		
		caCA: // Catalan (Catalonia, Spain) Translation by dave96
				{
		welcome: "Felicitats, ha instal·lat Ally Museum Control amb èxit.\n\nDesitja configurarlo ara?\n\nSi no es el primer AMC que instal·la es recomana molt configurarlo des de aqui, però si es el primer y no sap que te que posar cliqui en Cancelar y després en Opciones d'Ikariam trobarà informació més concreta.\n\nEn cualsevol cas pot intentar continuar amb la configuració i si en un pas no sabeu que posar simplement deixeulo en blanc.",
		nickrequest: "Tecleja el teu nick d'AMC (NO te perquè ser el d'Ikariam)",
		passrequest:"Tecleja la teva contrasenya d'AMC (VIGILEU! NO HA DE SER LA D'IKARIAM! si no la del fòrum de la teva alliança o una que el doni la persona que hagi instal·lat el servidor, pregunteu-li)",
		serverrequest:'Tecleja la direcció del php (Servidor).\n\n Consulteu amb el que hagi instal·lat el servidor en la vostra alliança el que teniu que posar aqui',
		playeridrequest:'Tecleja la teva id de jugador\n\nSi no la saps, deixa-ho en blanc',
		worldnowrequest:"Vol configurar l'script en el mon actual ",
		worldrequest: "Tecleji el numero de món on vols configurar l'script (1-alpha, 2-beta...)",
		nowallyrequest: "Siusplau, posi el nom COMPLET de la vostra alliança (Si no ho fa visiti les opcions o vagi a la pàgina de l'alliança/diplomancia)",
		myalliesrequest: 'Siusplau, posi el noms de les alliances amigues separades per ||| (NO POSI ESPAIS ENTRE ELLES, SOL |||)',
		countryrequest_1: "Vol utilitzar l'script al servidor actual (.",
		countryrequest_2: "Siusplau, fiqui les lletres que identifiquen el servidor on vol configurar l'script",
		thanks1:'Gracies per instal·lar aquest script al món ',
		thanks2:".\n\nPot comprobar el seu funcionament anant al museu, al menu de l'alliança o de distribució de bens culturals on apareixeran missatges confirmant l'actualització de les dades o l'informació sobre llocs disponibles si els te.",
		sthmissing:"Felicitats! Ha configurat AMC correctament, vagi a opcions per completar l'instalació",
		setuplater:"Pot escollir el món i configurar l'script a opciones, fins que no ho fagi no el podrà utilitzar i si te més d'un pot que tingui problemes per editar-los.\n\nSi es així desactivals pel GreaseMonkey i ves activant i configurant-los d'un en un.",
		cnftitle: "Configuració de l'script Ally Museum Control",
		nowallytext: 'Nom complet de la seva alliança',
		xplnplayerid_1: "(Pot que no sigui el mateix de debugdata, si te problemes fagi clic ",
		xplnplayerid_2:"aqui",
		xplnplayerid_3: "'En alguns casos, després de bandejos o coses semblants, en numero de les opcions canvia, per aconseguir la nostra id hem de dirli a un amic que vagi a enviar-nos un privat i en l`URL sortiran uns nombres que són la nostra ID'",
		xplnnick_1: "(<b>NO SON EL NICK I LA CONTRASENYA D'IKARIAM</b> si no els de Ally Museum Control. Més info ",
		xplnnick_2:"aqui",
		xplnnick_3: "'Ally Museum Control necessita la configuració d`un servidor que administri els usuaris amb accés a l`script, pot que estigui adaptat al fòrum de la teva alliança o que hagi unes dades estandar que et donarà el que hagi instal·lat el servidor d`Ally Museum Control. Si te dubtes, consulti a aquella persona.'",
		xplnserver_1: "(Si no sap que posar fagi clic ",
		xplnserver_2: "aqui",
		xplnserver_3: "'Ally Museum Control necessita la configuració d`un servidor, pregunti-li a la persona que l`hagi instal·lat a la seva alliança per la direcció del server.'",
		xplnworld: "Instal·li l'script una vegada per cada món en el que necessita que funcioni.",
		xplnnowally: "Siusplau, fiqui el nom COMPLET (llarg) de la seva alliança, pot mirar-ho a l'embaixada o a la pàgina de l'alliança/Diplomancia.",
		xplncountry: "Mira l'URL després de sXX.ikariam. i trobaras un parell de lletres com .org, .es o altres.",
		xplnmyallies_1: "Noms complets separats per ||| simplement, res d'espais. Més info ",
		xplnmyallies_2: 'aqui',
		xplnmyallies_3: "'Si introdueix aqui alliances que utilitzen el mateix script (i el mateix server) com s`indica (p.ej. seria: -13 Titanes-|||Armada Invencible|||Ira de Titanes) et sortirà per enviar-lis acords a ells'",
		servertext: 'Direcció del PHP (Servidor)',
		countrytext: "Server d'ikariam (Pais)",
		lngtext: 'Idioma',
		worldtext: 'Món',
		myalliestext: 'Alliances amigues',
		scriptoff: 'Desactivat',
		savecnf: "Guardar la configuració d'AMC",
		datasaved: "Dades guardades amb èxit.",
		nodatasaved: "NNo s'han guardat les dades.",
		confirmworldchange_1: 'Està segur de canviar el món a ',
		confirmworldchange_2: "? Si acceptes sol podrás utilitzar l'script en aquell món.",
		confirmdeactivate: "Estas segur de que vols desactivar l'script? Si ho fas sortirá a tots els mons fins que en posis un de nou.",
		txtlng:"es",
		needupdate: "Hi ha una nova versió d'Ally Museum Control, fagi clic en Acceptar per actualitzarla ara o en Cancelar si vol fer-ho manualment des de: http://userscripts.org/scripts/show/54490",

		}, 
		
		enUS: // English (US) Translation by WTFack
		{ 
		welcome: "Congratulations, you've succesfully installed Ally Museum Control.\n\nDo you want to set it up now?\n\nIf this is NOT the first AMC you install it's highly recommended to configure it trough this setup wizard. Otherwise, if it's the first one and you don't know what to input you can click Cancel and do this later on Ikariam Setup page.\n\nIn any case you can try to go on and leave blank all the things you don't know.",
		nickrequest: "Enter the nick of AMC (It DOESN'T have to be the same than in Ikariam)",
		passrequest:"Enter the password of AMC (Not the Ikariam Password but the one from AMC, might be your ally forum or a standard password, ask the administrator of AMC)",
		serverrequest:"Enter here the adress of the PHP (Server)\n\nAsk the one who has installed AMC if you don't know what to input here",
		playeridrequest:"Enter your Player-ID.\n\nIf you don't know it, just leave it blank",
		worldnowrequest:'Do you want to set this script for this world ',
		worldrequest:'Insert the NUMBER of world (1-alpha, 2-beta...)',
		nowallyrequest: "Please insert the FULL name of your ally (if you don't, just visit the embassy or ally/diplomacy page)",
		myalliesrequest: "Please insert the FULL name of friend allys using the script, separated only by ||| (don't put spaces between them)",
		countryrequest_1: 'Do you want to use the script in this server (.',
		countryrequest_2: 'Please insert the few letters that identifies the server you want to use this script',
		thanks1:'Thank you for installing Ally Museum Control for ',
		thanks2:' world.\n\nYou can check that it works properly in the museum view, the alliance view or the cultural assingments view where there will appear messages confirming the data update or info about new sockets in case you have available.',
		sthmissing:"You've successfully completed installation of AMC but you need to complete the info in Ikariam Setup because you have skipped one or more steps",
		setuplater:"You can choose the world and set up the script whenever you want in Ikariam Setup, it won't work until you do it and if you have more than one you might have trouble when changing options.\n\nIn that case deactivate them by GreaseMonkey and activate them and set them up one by one.",
		cnftitle: "Ally Museum Control Script Setup",
		nowallytext: 'Your Ally Full Name',
		xplnplayerid_1: "(It can be different to the one over [in Debug Data], if you have any trouble click ",
		xplnplayerid_2:	"here",
		xplnplayerid_3: "'It`s possible that after a ban or similar, the value which appears in setup is modified, in order to know the actual value we must ask a partner to send a PM to you and in the view of the message, see in the URL a number which is actually your palyer ID'",
		xplnnick_1: "(<b>It's NOT the nick and password of Ikariam</b> but the one from Ally Museum Control. More info ",
		xplnnick_2:	"here",
		xplnnick_3: "'Ally Museum Control requires the set up of a server which administrates the users with access to the script, it can be adapted to a forum or be of manual insertion. If you have any doubt, ask the one who has set up Ally Museum Control in your alliance.'",
		xplnserver_1: "(If you don't know what comes in this spot, please click ",
		xplnserver_2:	"here",
		xplnserver_3: "'Ally Museum Control requires the set up of a server, ask the one who has installed it in your alliance for a server adress.'",
		xplnworld: 'Install one script for each world you need it running',
		xplnnowally: 'Please insert the FULL name of your alliance, you can see it in the embassy or ally/diplomacy page',
		xplncountry: "Look at the URL after sXX.ikariam. and you'll find a few letters like org, es, de or similar",
		xplnmyallies_1: 'Full names separated by ||| only, no spaces. More info ',
		xplnmyallies_2: 'here',
		xplnmyallies_3: "If you insert here other allys using the same script (and same server) just like it says (for example, without quotation marks: `-13 Titanes-|||Armada Invencible|||Magnum Empire´) it will appear you their members to send them pacts",
		servertext: 'PHP Adresss (Server)',
		countrytext: 'Ikariam Server (Country)',
		lngtext: 'Language',
		worldtext: 'World',
		myalliestext: 'Other allied alliances',
		scriptoff: 'Deactivated',
		savecnf: 'Save AMC Config',
		datasaved: "Data saved successfully.",	
		nodatasaved: "No data has been saved.",	
		confirmworldchange_1: 'Are you sure you want to change the world to ',
		confirmworldchange_2: "? If you agree you won't be able to change it again but from the selected world.",
		confirmdeactivate: "Are you sure you want to deactivate the script? Once you do it it will appear in all the worlds until you select a new one.",
		txtlng:"en",
		needupdate: 'Your version of Ally Museum Control is old, you need to update it. If you want to update now please click Accept, if you prefer to do it later visit: http://userscripts.org/scripts/show/54490',
		
		},
	}
	return langs[lang];
}

var lang = getLanguage();

function check_version(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 

		if(xhr.responseText[0]== 'v') { if(xhr.responseText!= version) { if(confirm(lang.needupdate)) { location.href = 'http://userscripts.org/scripts/show/54490'; } }  }
		
		
		}
    });
}

check_version('http://www.13titanes.co.cc/check_amc_version.php', '');


var url_now = location.href;
var url_split1 = url_now.split('http://s');
var url_split2 = url_split1[1].split('.');
var world_now = url_split2[0];
var url_split3 =  url_now.split('ikariam.');
var url_split4 = url_split3[1].split('/');
var country_now = url_split4[0];


var world_array = new Array ('none','Alpha','Beta','Gamma','Delta','Epsilon','Zeta','Etas','Theta','Iota','Kappa','Lambda','My','Ny','Omicron');

if(GM_getValue('AMC_first')!= 1) { 

if (confirm(lang.welcome)) {
	
var nickvalue = prompt(lang.nickrequest);
var passvalue = prompt(lang.passrequest);
var servervalue = prompt(lang.serverrequest);
var playeridvalue = prompt(lang.playeridrequest);
var worldvalue = 'a';
if(confirm(lang.worldnowrequest + '(' + world_array[world_now] + ')?')) {
var worldvalue = world_now; } else { 
do {var worldvalue = prompt(lang.worldrequest); } while (isNaN(worldvalue))
}
if(confirm(lang.countryrequest_1 + country_now + ')?')) {
var countryvalue = country_now; } else { 
var countryvalue = prompt(lang.countryrequest_2); }
var nowallyvalue = prompt(lang.nowallyrequest);
var myalliesvalue = prompt(lang.myalliesrequest);

if(worldvalue!=null) {
	GM_setValue('AMC_worldselect',worldvalue);
}
if(playeridvalue!=null) {
	GM_setValue('AMC_playerid',playeridvalue);
}
if(nickvalue!=null) {
	GM_setValue('AMC_nick',nickvalue);
}
if(passvalue!=null) {
	GM_setValue('AMC_pass',passvalue);
}
if(servervalue!=null) {

	GM_setValue('AMC_serveradress',servervalue);
}
if(countryvalue!=null) {
	GM_setValue('AMC_country',countryvalue);
}
if(nowallyvalue!=null) {
	GM_setValue('AMC_nowally',nowallyvalue);
}
if(myalliesvalue!=null) {
	GM_setValue('AMC_myallies',myalliesvalue);
}

if(worldvalue!=null && playeridvalue!=null && nickvalue!=null && passvalue!=null && servervalue!=null && countryvalue!=null && worldvalue!=null) {
	alert(lang.thanks1 + world_array[worldvalue] + lang.thanks2);
} else {
	alert(lang.sthmissing);
}
	

	} else { alert(lang.setuplater); }
	
GM_setValue('AMC_first',1); 

}

if((GM_getValue('AMC_country') ==country_now || GM_getValue('AMC_country') == null || GM_getValue('AMC_country') == '')  && (GM_getValue('AMC_worldselect')== world_now || GM_getValue('AMC_worldselect')== 0 || GM_getValue('AMC_worldselect')== null || GM_getValue('AMC_worldselect')=='')) { 


var full_text = document.getElementById("mainview").innerHTML;
var ally = /id="memberList"/;
var museum = /id="val_culturalGoodsDeposit"/;
var cultural = /id="moveCulturalGoodsForm"/;
var option = /id="options_userData"/;

if(ally.test(full_text)) { 

var diplomacy = /<div id="alliance">/;
if(diplomacy.test(full_text)) {
var ally_now = document.getElementById("allyinfo").getElementsByTagName("td")[1].innerHTML;
} else {
var ally_now = document.getElementById("mainview").getElementsByTagName("td")[1].innerHTML;
}

if(GM_getValue('AMC_nowally')!= ally_now) { 
	GM_setValue('AMC_nowally',ally_now);
}

function post_ally(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 

		document.getElementById("mainview").getElementsByTagName("span")[1].innerHTML = document.getElementById("mainview").getElementsByTagName("span")[1].innerHTML + ' - ' + xhr.responseText;
		
		}
    });
}

var already_assigned = full_text.split('class="message" href="?view=sendIKMessage&amp;receiverId=');
var id_mate = "";
for(i=1;i<already_assigned.length;i++) {
	var obtain_id = already_assigned[i].split('"')[0];
	if(i>1) { id_mate += ","; }
	id_mate += obtain_id;
	}
	id_mate += ',' + GM_getValue('AMC_playerid');
	stringtosend = "";
	stringtosend += "ally=";
	stringtosend += id_mate;
	stringtosend += "&playerid=";
	stringtosend += GM_getValue('AMC_playerid');
	stringtosend += "&nick=";
	stringtosend += GM_getValue('AMC_nick');
	stringtosend += "&pass=";
	stringtosend += GM_getValue('AMC_pass');
	stringtosend += "&nowally=";
	stringtosend += GM_getValue('AMC_nowally');
	stringtosend += "&world=";
	stringtosend += GM_getValue('AMC_worldselect');
	stringtosend += "&lang=";
	stringtosend += GM_getValue('AMC_Lang');
	stringtosend += "&server=";
	stringtosend += GM_getValue('AMC_country');
	stringtosend += "&type=ally";

	
	
post_ally(GM_getValue('AMC_serveradress'), stringtosend);

}

if(museum.test(full_text)) { 

function post_actualassignments(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 
		
		document.getElementById("mainview").getElementsByTagName("span")[4].innerHTML = document.getElementById("mainview").getElementsByTagName("span")[4].innerHTML + ' - ' + xhr.responseText;
	
		}
    });
}


var full_code = document.body.innerHTML;
var already_assigned = full_code.split('&amp;msgType=81"');
var id_mate = "";
for(i=0;i<already_assigned.length-1;i++) {
	var obtain_id = already_assigned[i].split('<a class="cancelTreaty" href="?view=sendIKMessage&amp;receiverId=');
	var obtain_length = obtain_id.length-1;
	var obtain_id2 = obtain_id[obtain_length];
	if(i>0) { id_mate += ","; }
	id_mate += obtain_id2;
	
	}
	stringtosend = "";
	stringtosend += "idmate=";
	stringtosend += id_mate;
	stringtosend += "&playerid=";
	stringtosend += GM_getValue('AMC_playerid');
	stringtosend += "&nick=";
	stringtosend += GM_getValue('AMC_nick');
	stringtosend += "&pass=";
	stringtosend += GM_getValue('AMC_pass');
	stringtosend += "&world=";
	stringtosend += GM_getValue('AMC_worldselect');
	stringtosend += "&lang=";
	stringtosend += GM_getValue('AMC_Lang');
	stringtosend += "&server=";
	stringtosend += GM_getValue('AMC_country');
	stringtosend += "&type=museum";
	
	var already_asked = full_code.split('&amp;msgType=78"');
var id_asked = "";
for(i=0;i<already_asked.length-1;i++) {
	var obtain_asked = already_asked[i].split('<a class="cancelTreaty" href="?view=sendIKMessage&amp;receiverId=');
	var obtain_asked_length = obtain_asked.length-1;
	var obtain_asked2 = obtain_asked[obtain_asked_length];
	if(i>0) { id_asked += ","; }
	id_asked += obtain_asked2;
	}
	if(id_asked!= "") {

	stringtosend += "&idsent=";
	stringtosend += id_asked;
	
	}

var already_asked = full_code.split('&amp;msgType=80"');
var id_asked = "";
for(i=0;i<already_asked.length-1;i++) {
	var obtain_asked = already_asked[i].split('<a class="cancelTreaty" href="?view=sendIKMessage&amp;receiverId=');
	var obtain_asked_length = obtain_asked.length-1;
	var obtain_asked2 = obtain_asked[obtain_asked_length];
	if(i>0) { id_asked += ","; }
	id_asked += obtain_asked2;
	}
	
	if(id_asked!= "") {

	stringtosend += "&idasked=";
	stringtosend += id_asked;
	
	}


post_actualassignments(GM_getValue('AMC_serveradress'), stringtosend);



}

if(cultural.test(full_text)) { 

function post_freeassignments(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 

		document.getElementById("mainview").getElementsByTagName("span")[0].innerHTML = document.getElementById("mainview").getElementsByTagName("span")[0].innerHTML + ' - ' + xhr.responseText;
				
		}
    });
}

function post_free(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 
		
		var logo = document.createElement("div");
logo.innerHTML = '<br/><br/><br/><b>ACUERDOS QUE PUEDES OFRECER:</b><br/><br/>' + xhr.responseText + '<br/><br/></div>';



var div = document.createElement('div');

div.innerHTML = xhr.responseText + '</div><div class="footer"></div></div>';

var mainv = document.getElementById('mainview');
mainv.appendChild(div);



		}
    });
}

var total_assignments_text = document.getElementById("assignCulturalGoods").innerHTML;
var total_assignments = total_assignments_text.split('</span>')[1];
total_assignments = total_assignments.split('</div>')[0];
total_assignments = parseInt(total_assignments);

var all_cities = document.getElementById("mainview").innerHTML;
var city = all_cities.split('maxValue : ');
var number_assignments = 0;
for(i=1;i<city.length;i++) {
	var obtain_number = city[i].split(',')[0];
	obtain_number = parseInt(obtain_number);
	number_assignments = number_assignments + obtain_number;
		
	}
var free_asignments = number_assignments - total_assignments;

	stringtosend = "";
	stringtosend += "freeasignments=";
	stringtosend += free_asignments;
	stringtosend += "&playerid=";
	stringtosend += GM_getValue('AMC_playerid');
	stringtosend += "&nick=";
	stringtosend += GM_getValue('AMC_nick');
	stringtosend += "&pass=";
	stringtosend += GM_getValue('AMC_pass');
	stringtosend += "&world=";
	stringtosend += GM_getValue('AMC_worldselect');
	stringtosend += "&lang=";
	stringtosend += GM_getValue('AMC_Lang');
	stringtosend += "&server=";
	stringtosend += GM_getValue('AMC_country');
	stringtosend += "&type=cultural";
	
post_freeassignments(GM_getValue('AMC_serveradress'), stringtosend);

if(free_asignments>0) {
	stringtosend = "";
	stringtosend += "playerid=";
	stringtosend += GM_getValue('AMC_playerid');
	stringtosend += "&nick=";
	stringtosend += GM_getValue('AMC_nick');
	stringtosend += "&pass=";
	stringtosend += GM_getValue('AMC_pass');
	stringtosend += "&world=";
	stringtosend += GM_getValue('AMC_worldselect');
	stringtosend += "&lang=";
	stringtosend += GM_getValue('AMC_Lang');
	stringtosend += "&server=";
	stringtosend += GM_getValue('AMC_country');
	stringtosend += "&type=asking";
	stringtosend += "&myallies=";
	stringtosend += GM_getValue('AMC_nowally') + '|||' + GM_getValue('AMC_myallies');
	
	

	
post_free(GM_getValue('AMC_serveradress'), stringtosend);
}

}

if(option.test(full_text)) { 

function accept_data_change() {
	
var worldvalue = document.getElementById("AMC_worldselect").value;
var playeridvalue = parseInt(document.getElementById("AMC_playerid").value);
var langvalue = document.getElementById("AMC_langselect").value;
var countryvalue = document.getElementById("AMC_country").value;
var nickvalue = document.getElementById("AMC_nick").value;
var passvalue = document.getElementById("AMC_pass").value;
var servervalue = document.getElementById("AMC_serveradress").value;
var nowallyvalue = document.getElementById("AMC_nowally").value;
var myalliesvalue = document.getElementById("AMC_myallies").value;

GM_setValue('AMC_worldselect',worldvalue);
GM_setValue('AMC_playerid',playeridvalue);
GM_setValue('AMC_Lang',langvalue);
GM_setValue('AMC_country',countryvalue);
GM_setValue('AMC_nick',nickvalue);
GM_setValue('AMC_pass',passvalue);
GM_setValue('AMC_serveradress',servervalue); 
GM_setValue('AMC_nowally',nowallyvalue); 
GM_setValue('AMC_myallies',myalliesvalue); 


}
	
function save_settings() {

var worldvalue = document.getElementById("AMC_worldselect").value;

if(GM_getValue('AMC_worldselect')!= worldvalue) { 

if(worldvalue==0) { var question = lang.confirmdeactivate; } else { var question = lang.confirmworldchange_1 + world_array[worldvalue] + lang.confirmworldchange_2; }

if(confirm(question)) {
	
accept_data_change();	
alert(lang.datasaved);

} else {
	
alert(lang.nodatasaved);

}
} else {
	accept_data_change();
	alert(lang.datasaved); 
	}
}

var direct_playerid2 = document.getElementById("options_debug").getElementsByTagName("td")[0].innerHTML;
var direct_playerid = parseInt(direct_playerid2);

if(isNaN(GM_getValue('AMC_playerid'))) { GM_setValue('AMC_playerid',direct_playerid); }

var full_text_modified = full_text.replace(/<div class="contentBox01h" id="vacationMode">/, '<div class="contentBox01h"><h3 class="header"><span class="textLabel">'+ lang.cnftitle+ '</span></h3><div class="content"><form  action="#" method="POST"><table cellpadding="0" cellspacing="0">        <tr>          <th>' + lang.worldtext + ':</th>         <td style="vertical-align:middle"><select name="AMC_worldselect" id="AMC_worldselect" size="1"><option value="0">'+ lang.scriptoff +'</option><option value="1">Alpha</option><option value="2">Beta</option><option value="3">Gamma</option><option value="4">Delta</option><option value="5">Epsilon</option><option value="6">Zeta</option><option value="7">Etas</option><option value="8">Theta</option><option value="9">Iota</option><option value="10">Kappa</option><option value="11">Lambda</option><option value="12">My</option><option value="13">Ny</option><option value="14">Omicron</option></select></td><td ><span style="font-size:10px;"> '+ lang.xplnworld + '</span></td>       </tr><tr>          <th>Player-ID:</th>         <td style="vertical-align:middle"><input type="text" class="textfield" name="AMC_playerid" id="AMC_playerid" size="15" value="'+ GM_getValue('AMC_playerid') +'"/></td><td><span style="font-size:10px;"> '+ lang.xplnplayerid_1 +'<a href="javascript:alert(' + lang.xplnplayerid_3 + ')">' + lang.xplnplayerid_2 + '</a>)</span></td>       </tr>        <tr>          <th>'+ lang.lngtext +': </th><td><select name="AMC_langselect" id="AMC_langselect" size="1"><option value="esES">Español (España)</option><option value="enUS">English (US)</option><option value="caCA">Català (Catalunya)</option></select></td></tr><tr>          <th>'+ lang.countrytext +':</th>         <td style="vertical-align:middle"><input type="text" class="textfield" id="AMC_country" name="AMC_country" size="15" value="'+GM_getValue("AMC_country")+'"/></td><td ><span style="font-size:10px;"> '+ lang.xplncountry +'</span></td>       </tr><tr>          <th>AMC Nick:</th>         <td style="vertical-align:middle"><input type="text" class="textfield" id="AMC_nick" name="AMC_nick" size="15" value="'+GM_getValue("AMC_nick")+'"/></td><td rowspan="2"><span style="font-size:10px;"> '+ lang.xplnnick_1 +'<a href="javascript:alert(' + lang.xplnnick_3 + ')">' + lang.xplnnick_2 + '</a>)</span></td>       </tr><tr>          <th>AMC Password:</th>         <td style="vertical-align:middle"><input type="password" class="textfield" name="AMC_pass" id="AMC_pass" size="15" value="'+GM_getValue("AMC_pass")+'"/></td>  </tr><tr>          <th>' + lang.servertext + ':</th>         <td style="vertical-align:middle"><input type="text" class="textfield" id="AMC_serveradress" name="AMC_serveradress" size="15" value="'+GM_getValue("AMC_serveradress")+'"/></td><td ><span style="font-size:10px;"> '+ lang.xplnserver_1 +'<a href="javascript:alert(' + lang.xplnserver_3 + ')">' + lang.xplnserver_2 + '</a>)</span></td>       </tr><tr>          <th>' + lang.nowallytext + ':</th>         <td style="vertical-align:middle"><input type="text" class="textfield" id="AMC_nowally" name="AMC_nowally" size="15" value="'+GM_getValue("AMC_nowally")+'"/></td><td ><span style="font-size:10px;"> '+ lang.xplnnowally +'</span></td>       </tr><tr>          <th>' + lang.myalliestext + ':</th>         <td style="vertical-align:middle"><input type="text" class="textfield" id="AMC_myallies" name="AMC_myallies" size="15" value="'+GM_getValue("AMC_myallies")+'"/></td><td ><span style="font-size:10px;"> '+ lang.xplnmyallies_1 +'<a href="javascript:alert(' + lang.xplnmyallies_3 + ')">' + lang.xplnmyallies_2 + '</a>)</span></td>       </tr></table><div class="centerButton"><input type="button" id="AMC_save_settings" class="button" value="' + lang.savecnf + '"></div></form></div><div class="footer"></div></div><div class="contentBox01h" id="vacationMode">');

if(GM_getValue('AMC_worldselect')!= null) { 
	var worldoption = '<option value="' + GM_getValue('AMC_worldselect');
	var worldoptionmodified = '<option selected="selected" value="' + GM_getValue('AMC_worldselect');
	var full_text_modified = full_text_modified.replace(worldoption,worldoptionmodified);
}

	var langoption = '<option value="' + GM_getValue('AMC_Lang');
	var langoptionmodified = '<option selected="selected" value="' + GM_getValue('AMC_Lang');
	var full_text_modified = full_text_modified.replace(langoption,langoptionmodified);
		
document.getElementById("mainview").innerHTML = full_text_modified;

var addonclick = document.getElementById('AMC_save_settings');
addonclick.addEventListener("click", save_settings, true);

}

}