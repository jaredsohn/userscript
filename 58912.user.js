// ==UserScript==
// @name 	Ikariam: Handling
// @author 	Phate
// @version	0.37
// @description    	Ikariam script to manage the movement of goods troops and fleets 
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// @require 		http://www.betawarriors.com/bin/gm/57756user.js
// @require			http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
//
// @history	0.37	Now you can select which cities to view. (all towns, my towns, deployed troops, occupied towns)
// @history	0.36	BugFix: does not display the selector if there aren't players on the list.
// @history	0.36	BugFix: missing texts in translation.
// @history	0.36	Compatibility with Ikariam CAT Indicator.
// @history	0.35	Alliance page, I added button to update the list handling.
// @history	0.35	improved options page.
// @history	0.35	In the title of the window shows the selected travel.
// @history	0.35	City names without coordinates, the coordinates are in a tooltip.
// @history	0.35	Added defend the city and port for the Allies.
// @history	0.35	Improved display of the cities list.
// @history	0.35	BugFix: if you loading null List player, generated error.
// @history	0.34	Drag&Drop Icon.
// @history	0.34	Add Link for change town with handling's window.
// @history	0.34	Use Jquery for the script.
// @history	0.33	Hack script 57756.
// @history	0.32	BugFix: Changing code for ikariam version 0.4.0.
// @history	0.32	Add some translation.
// @history	0.31	BugFix: Changing the display resolution, change the position of the icon and the window.
// @history	0.3		Deleted the option of viewing the bottom of the screen.
// @history	0.3		Deleted the delete function list movements abandonment ally.
// @history	0.3		BugFix: Displaying the list handling moving the side sections.
// @history	0.3		In page options, changes the language selection.
// @history	0.3		Improved the code for saving data.
// @history	0.3		BugFix: In the Options page window Handling was not displayed correctly.
// @history	0.3		Changed the icon to open the window Handling.
// @history	0.21	Update the script with userscripts.org.
// @history	0.21	Add Vietnamese translation.
// ==/UserScript==

const lversion = "0.37";
ScriptUpdater.check(58912, lversion);
const ltyp = ['dk','de','es','en','gr','it','lv','pl','ro','ua','vn']
const langs = 
{ 	//LANGUAGES
	dk:
	{// Danish translation by lovebug
		errortxt: "Handling har genereret en fejl. venligst komme igennem til mig for at løse problemet. Phate72 \ n \ n",
		optiontxt: "Vælg sprog",
		goods: 'Transport varer',
		army: 'indsætte tropper',
		fleet: 'Station flåder',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Tilføj spiller ved Håndtering liste',
		memberrem: 'Fjern-afspiller fra Håndtering liste',
		updateCity: 'Update Handling',
		allmemberadd: 'Tilføj alle spillere på Handling liste ',
		allmemberrem: 'Fjern alle spillere fra Håndtering liste',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		optRst: 'Reset',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
	de:
	{ // German translation by Lamadecke
		errortxt: "Ein Fehler ist aufgetreten. Bitte lass es mich wissen, damit ich diesen lösen kann. Phate72 \n\n",
		optiontxt: "Sprache auswählen",
		goods:'Verschicke Güter',
		army:'Stationiere Truppen',
		fleet:'Stationiere Flotten',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Füge Spieler zur Handelsliste hinzu',
		memberrem: 'Lösche Spieler von der Handelsliste',
		updateCity: 'Update Handling',
		allmemberadd: 'Füge alle Spieler von der Handelsliste',
		allmemberrem: 'Lösche alle Spieler von der Handelsliste',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		optRst: 'Reset',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
	it:
	{ // Italian texts by myself
		errortxt: "Handling ha generato un errore. Per favore contattatemi per risolvere il problema. Phate \n\n",
		optiontxt: "Seleziona la lingua",
		goods:'Trasporto merci',
		army:'Schiera esercito',
		fleet:'Schiera flotta',
		defendTown:'Difendi la città!',
		defendPort:'Difendi il porto!',
		memberadd: 'Aggiunge il giocatore alla lista movimenti',
		memberrem: 'Rimuove il giocatore dalla lista movimenti',
		updateCity: 'Aggiorna Handling',
		allmemberadd: 'Aggiunge tutti i giocatori nella lista Movimenti',
		allmemberrem: 'Rimuove tutti i giocatori dalla lista Movimenti',
		head_ico: 'Tipo di ancoraggio icona',
		scr_ico: ' schermo',
		page_ico: ' pagina',
		optRst: 'Reset',
		validDrop: "Vuoi spostare l'icona?",
		selCity: ['Tutte le città','Città proprie','Truppe schierate','Città Occupate']
	},
	es:
	{ // Spanish translation by Rohcodom
		errortxt: "Handling ha generado un error. Por favor contacto para informarme. Phate72 \n\n",
		optiontxt: "Seleciona el idioma",
		goods:'Transportar bienes',
		army:'Apostar tropas',
		fleet:'Apostar flotas',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Agregar jugador a la lista de gestión',
		memberrem: 'Eliminar jugador de la lista de gestión',
		updateCity: 'Update Handling',
		allmemberadd: 'Agregar todos los jugadores a la lista de gestión',
		allmemberrem: 'Eliminar todos los jugadores de la lista de gestión',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		optRst: 'Reset',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
	en:
	{ // English translation by myself
		errortxt: "Handling has generated an error. Please get through to me to solve the problem. Phate72 \n\n",
		optiontxt: "Select language",
		goods:'Transport goods',
		army:'Deploy troops',
		fleet:'Station fleets',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Add player at Handling list',
		memberrem: 'Remove player from Handling list',
		updateCity: 'Update Handling',
		allmemberadd: 'Add all players at Handling list',
		allmemberrem: 'Remove all players from Handling list',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		optRst: 'Reset',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
	gr:
	{ // Greek translation by mindfox
		errortxt: "Το script εντόπισε σφάλμα. Παρακαλώ επικοινώνησε μαζί μου για την επίλυσή του. Phate72 \n\n",
		optiontxt: "Επιλογή γλώσσας",
		goods:'Μεταφορά αγαθών',
		army:'Μεταφορά στρατού',
		fleet:'Στάθμευση στόλου',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Προσθήκη παίκτη στη λίστα του Handling',
		memberrem: 'Αφαίρεση παίκτη από τη λίστα του Handling',
		updateCity: 'Update Handling',
		allmemberadd: 'Προσθήκη όλων των παικτών στη λίστα του Handling',
		allmemberrem: 'Αφαίρεση όλων των παικτών από τη λίστα του Handling',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		optRst: 'Reset',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
	lv:
	{ // Latvian translation
		errortxt: "Rīkošanas tabula ir pieļāvusi kļūdu. Lūdzu sazināties ar mani lai to atrisinātu. Phate72 \n\n",
		optiontxt: "Izvēlieties valodu",
		goods:'Transportēt resursus',
		army:'Izvietot vienības',
		fleet:'Pārvietot kuģus',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Pievienot spēlētāju Rīkošanas tabulas sarakstā',
		memberrem: 'Izdzēst spēlētāju no Rīkošanas tabulas saraksta',
		updateCity: 'Update Handling',
		allmemberadd: 'Pievienot visus spēlētājus Rīkošanas tabulas sarakstā',
		allmemberrem: 'Izdzēst visus spēlētājus no Rīkošanas tabulas saraksta',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		optRst: 'Reset',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
	nl:
	{ // Dutch translation by Jumper
		errortxt: "Er ging iets fout in Handling. Raporteer dit probleem aub. Phate72 \n\n",
		optiontxt: "Selecteer taal",
		goods:'Transporteer goederen',
		army:'Verplaats troepen',
		fleet:'Stationeer vloot',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Voeg speler toe aan Handling lijst',
		memberrem: 'Verwijderen speler van Handling lijst',
		updateCity: 'Update Handling',
		allmemberadd: 'Voeg alle spelers toe aan Handling lijst',
		allmemberrem: 'Verwijder alle spelers van Handling lijst',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		optRst: 'Reset',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
	pl:
	{ // Polish translation by Fajap
		errortxt: "Wsparcie generuje błąd. Proszę skontaktuj się ze mną dla rozwiązania problemu. Phate72 \n\n",
		optiontxt: "Wybierz język",
		goods: 'Transport surowców',
		army:'Stacjonuj wojsko',
		fleet:'Stacjonuj flotę',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Dodaj gracza do listy',
		memberrem: 'Usuń gracza z listy',
		updateCity: 'Update Handling',
		allmemberadd: 'Dodaj wszystkich graczy',
		allmemberrem: 'Usuń wszystkich graczy',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		optRst: 'Reset',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
	ro:
	{ // Traducere in romana de michiuco
		errortxt: "Aplicatia a generat o eroare. Va rugam apelati la mine pentru rezolvarea acesteia. Phate72 \n\n",
		optiontxt: "Alegeti limba",
		goods:'Transporta bunuri',
		army:'Transporta trupe',
		fleet:'Muta flota',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Adauga jucator la lista ',
		memberrem: 'Elimina jucator din lista ',
		updateCity: 'Update Handling',
		allmemberadd: 'Adauga toti jucatorii la lista',
		allmemberrem: 'Elimina toti jucatorii din lista',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		optRst: 'Reset',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
	ua:
	{ // Ukrainian Translate by feelimon
		errortxt: "Скрипт викликав помилку. Будь-ласка, повідомте мене про проблему. Phate72 \n\n",
		optiontxt: "Вибір мови",
		goods:'Транспортувати товари',
		army:'Розгорнути війска',
		fleet:'Перемістити флот',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Додати гравця до списку транспортувань',
		memberrem: 'Видалити гравця зі списку транспортувань',
		updateCity: 'Update Handling',
		allmemberadd: 'Додати всіх гравців до списку траспортувань',
		allmemberrem: 'Видалити всіх гравців зі списку транспортувань',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		optRst: 'Reset',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
	vn:
	{ // Vietnamese translation by Unloseking
		errortxt: "Có lỗi. Vui lòng truy cập để sửa lỗi. Phate72 \n\n",
		optiontxt: "Chọn ngôn ngữ",
		goods:'Vận chuyển hàng hóa',
		army:'Triển khai quân đội',
		fleet:'Triển khai chiến hạm',
		defendTown:'Defend town!',
		defendPort:'Defend port!',
		memberadd: 'Thêm người chơi vào danh sách',
		memberrem: 'Xóa người chơi vào danh sách',
		updateCity: 'Update Handling',
		allmemberadd: 'Thêm tất cả người chơi vào danh sách',
		allmemberrem: 'Xóa tất cả người chơi vào danh sách',
		head_ico: 'Type of anchor icon',
		scr_ico: ' screen',
		page_ico: ' page',
		validDrop: 'Change the position of the icon?',
		selCity: ['All towns','My towns','Stations troops','Occupy towns']
	},
}

const url=String(window.location).split('?')[0];
const urlId = document.domain.split('.')[0] + document.domain.split('.')[2]
var Hand_lang, Hand_opt, hIco;

$(window).ready(function()  
{ 
try
{
	if ($('#citySelect').length <= 0){return;} // exit if this is an error page
		
	getOpt(false)
	Hand_lang = getLanguage();
	if (!hIco)
	{
		hIco=		{
            hand:		'skin/characters/fleet/40x40/ship_transport_r_40x40.gif',
			all: 		"data:image/png;base64,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",
			my:			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAiCAYAAAAd6YoqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAABKtJREFUWEfNWTtv1EAQXj/uwiXpgIoKCgIpEBWiQIBCgfgFtChCqSioKCiQgA4aCioKBDU/gIIOgYRCQ8WroEPiESh45HJ3fjDfrOdu7V2f1xdeI062Z+f1zcyO1yG4fG4lX9qzS7ko7oZO/p9iJsNsbBq+pz1DUGQerL9WMRhnTy87Y4tiXv5vKE2ScSyITZ7vP3qugYCu3X383wTcJpArq8dZvJTyaotVyysO6vhmueuCmabrY19k0E6HjC1h9c7nU9fVMJn0apvs/FXZ9bMldxaQgJa7cchgzCu0RkmqOnE0vqZZrlSeqTDUQ2GUpipSuQqjWCVprgIYIwoDyICXqTgKFfSwFIaFAN1nWUa/hGRDFYTkg/RjWjdlJCZXwhrHEsBoEBmDyClwBJPnOTmmoAlEQBHj18UGBJQsJRnwlIo42IgDxT30wMJaRvdCaIKQmEgCZMQvfAgJz9UxtUDmCgCSMxjBfUAZyylzCHyuU4AAn355SlMFgVIwWAeXr/TPBIyAwY9wLel1dAWLCiecqEnVBFCvG1lFsVoL+Nl4cYWG+cwtESDrmUoRJAUeFI4BoENtBB70n50/UHJ47O4bznYuPVesVvUAFCTJM43ArlklWXPuEROE3Jfygmxym3CJSlmjHKqnq0tWxsB4UvABSGd+YhV6/GS0m8uIJLW6ZgHpdSI1oE3pImQTLQFf2LAAo1tI0+Nz+516VaYAOn7v7XhJ7yWQ3Uo+Rhs3O4LvD0bcEggaALD/RgQWgMAHzxeEGRR00CZs09jUYtPVQnWgrIpUqwH73U7M4xi5oqnI1KUJBt762kGfhNXKSHWO3HlFUxHTkPzQQJFRyyPeoEnlyia5IuaZSrLTH6YKPxjED/YwRYQGo3TbIMxQkBDYHCb5+IUsvs2rxFXNTGNrmQp6f9DU0T21rUo4lbkas+0Rbi3zVAn0XzYH7AdlzjHLo/Lclv2y79YL9e7i4XFMeAbNyvu6hdPt5IRbl6md83PWklURAQFJ9KqA4CoUhDe3BtpcFZdMk17TuhmjxGTtEZ9+wQvMRU0B+NhmGZwQWpLVWh++6baqI1QDhzreI5V+/vh9aKn58my/0+OoOmr/CUjtxm2F1qtY44NkOmqZy98j7gTy+cdWTevoGW/SgvGw8VNn0eR9+t5n2IuGnNg35ep8ugLZvbjDYlubvR6EXQP/PTHbSK2rlStGr9aScWsa9uXN+l5o23BOIP3NTS87u26fKckt3jxp6S3cOOHN27jw0Mtvb36+ubVmBeEVQYNQNTF14q4YvVrLZRDZkz0i7TM55stxX1+rVKe3nWTUAkn6P7zsmhu+CmiagVn1YDPumTNQe7He7ADQBkSe6FFtgsjpXYJPYT5gFseZLBmM7zUIXS2rmqTXRK74rDd7k5HSOj624h2l9uHg4u5EjL7vOWOxPujxHyiYUT6ICiD5/m8VB6rkUoCzAH+WMa6c9YJXBqPf8kIsQ6dm+uQriVm6VCnRc9qt2mw4f5WAvHm/oXovL7VNxj+R5xdE9U+m5hfi0eW9/ySwWZ1K7OM9cnVtZaotfHw1/TeDjwyc+Mq1kQ1Wjuxt/jqaNV1/Ue8XhIJ+Qw55VwMAAAAASUVORK5CYII=",
			occupy:		'/skin/actions/occupy.gif',
            trans:		'/skin/actions/transport.gif',
            transDis:	'/skin/actions/transport_disabled.gif',
			transOvr:	'/skin/actions/transport_over.gif',
			army: 		'/skin/actions/move_army.gif',
            armyDis: 	'/skin/actions/move_army_disabled.gif',
			armyOvr: 	'/skin/actions/move_army_over.gif',
            fleet: 		'/skin/actions/move_fleet.gif',
            fleetOvr:	'/skin/actions/move_fleet_over.gif',
			defTwn: 	'/skin/actions/defend.gif',
			defTwnDis: 	'/skin/actions/defend_disabled.gif',
			defTwnOvr: 	'/skin/actions/defend_over.gif',
			defPort: 	'/skin/actions/defend_port.gif',
			defPortOvr: '/skin/actions/defend_port_over.gif',
			delPly:		'/skin/layout/icon-treaty-break.gif',
			rightLnk: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAUCAYAAACu0kzYAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sCChISKPOzWn8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA/klEQVQYV3WRW0vDQBCFz262bUKi2GoxioIPFS/4z/tz+mKhYKWifRCLl5BUe/GcJas+xIHJ7p4zw+yXNZ93Q8C2YGwbiGIoqrKE5brDbDEziSyQm9jVsnjj5ohZ+HJgqY99mY7wPp/cb9Zf5zxHtVk5bcrFk3Kc5ZdIDy9OpXkjxMf8lgWzWbw/iDS8MX46TOSQ9gfI8qu4LF63NAySbo7d42tHjk1od72zG7hkTyxrYdRGJ8yQIbHH3DKrwPFIDokK3/WX47nmOKG+aOJ4IIf5j8M2cXTJQapfjnb9HivdLHAc8CAh/F3jXCdNKPg3YPAZUenKmiFRayD3c78B/IVReQgxJXkAAAAASUVORK5CYII=",
			leftLnk: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAUCAYAAACu0kzYAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sCChYUNy/oWNAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABAklEQVQYV22P3U7CQBCFp+1aupbGFJFAvMQLfArvfGMfgjfQRG7U4E9Qo7BKKdv1nLKNaDrJye78zxcsZ1eSaC212bW4aiNSlRLC1UEYJ7uMdKEDKGOCVvjX4B1tC/Op8Fn7YFTZcrx6vr35fn8UJk6dq8S8zO5XT9e+RkRtzet8cTe1tuCUX2t2/AnSCVV67E7OL5PucCJBxMk7azo26WAcDiYXSucjhIN6eWfvXJsNzzJ91F+yg+c6qFeXAo6jmqEMCDh64Jg3HIfgyMHx8J/jCxymjaOVhRwROPI2jhJ7P8ARgyPe56gv8ieTow+OBedTTMa+4E11Uk2OyAeYpOgXP3d2XinChIWJAAAAAElFTkSuQmCC",
			// member list
			inply: 		'/skin/icons/stage_returning.gif',
			outply:  	'/skin/icons/stage_gotoforeign.gif'
		}
	}
	var page = $('body:first').attr('id');
		
	if (page == 'options'){pageOption()}	
	if (page == 'diplomacyAdvisorAlly') {selectMember()}			// check ally's player
		
	// HANDLING WINDOW
	var listStg = loadItem();	// load list of saves players
	if ($('select#citySelect option').length < 2 && listStg.length > 0) {return;} // exit if you haven't 2 cities and members in ally
		
	// Handling box		
	$('body:first').append(
		"<img id='open_handling' src='"+ hIco.hand +"'>"+
		"<div id='handling'>"+
			"<h3 id='handling_head'>"+ nameCity($('select#citySelect option:selected').text(),true)[0] +"<span id='Hand_h3city'></span></h3>"+
			"<div id='handlingContent'>"+
				"<div id='Handling_menberList'></div>"+
				"<div id='Handling_mycity'>"+
					"<img src="+ hIco.all +" value='all' title='"+ Hand_lang.selCity[0] +"'>"+
					"<img src="+ hIco.my +" value='my'  title='"+ Hand_lang.selCity[1] +"'>"+
					"<img src="+ hIco.army +" value='deploy' title='"+ Hand_lang.selCity[2] +"'>"+
					"<img src="+ hIco.occupy +" value='occupy' title='"+ Hand_lang.selCity[3] +"'>"+
				"</div>"+
				"<table id='hand_listcity'>"+
					"<tbody>"+
					"</tbody>"+
				"</table>"+
			"</div>"+
			"<div class='footer'></div>"+
		"</div>");
	
	// Type of my city view All, My, Occupied
	$('#Handling_mycity img').click(function()
		{
			Hand_opt.myCity= $(this).attr('value')
			setOpt()
			myCity()
			updateLink();
			Hand_css()
		});
	$('#Handling_mycity').hide();
	
	if (localStorage.getItem("Handlig_ChgCity"))	// change town in handling window
	{
		$('#handling').show();
		localStorage.removeItem("Handlig_ChgCity")
	}
	else	{$('#handling').hide();}
		
	$('#handling_head').click(function(){$('#handling').hide()});
	$('#open_handling').click(function(){$('#handling').hide()});
	$('#open_handling').mouseover(function(){$('#handling').show()});
		
	redrawSelPly()	// insert 'select' player HTML
	
	// botton open Handling
	$('#open_handling').css({'position': Hand_opt.typIco,'top': Hand_opt.posIco.y+'px','left': Hand_opt.posIco.x+'px','z-index':'2000'});
	// drag&drop icon 	
	var icon = document.createElement('img');
	icon.src = hIco.hand;
	$('#open_handling').attr('draggable', 'true')
		.bind('dragstart', function(ev) {
			$('#handling').hide();
			var dt = ev.originalEvent.dataTransfer;
			dt.setData("id_Hand", this.id);
			dt.setDragImage(icon, 0, 0);
			return true;
		})
		.bind('dragend', function(ev) {return false;});
	$('body:first')
		.bind('dragenter', function(ev) {
			$(ev.target).addClass('dragover');
			return false;
		})
		.bind('dragleave', function(ev) {
		$(ev.target).removeClass('dragover');
			return false;
		})
		.bind('dragover', function(ev) {
			return false;
		})
		.bind('drop', function(ev) {
			var dt = ev.originalEvent.dataTransfer;
			if ( dt.getData("id_Hand") == "open_handling")
			{
				if(confirm(Hand_lang.validDrop))
				{
					if(Hand_opt.typIco == 'fixed') 
					{
						var bottomX = ev.pageX - document.body.scrollLeft;
						var bottomY = ev.pageY - document.body.scrollTop;
						$('#open_handling').css({'left':bottomX ,'top': bottomY})
						Hand_opt.posIco = {x: bottomX, y: bottomY}
					}
					else 
					{
						$('#open_handling').css({'left':ev.pageX ,'top': ev.pageY,})
						Hand_opt.posIco = {x: ev.pageX, y: ev.pageY};
					}
					setOpt()
					posHand();
				}
			}
			return false;
		});
	// Handling window
	Hand_css()
}
catch(er) 				
	{infoError("function Main ",er)}
},true);

function Hand_css()	// css handling's window
{ 
	// Handling window
	$('#handling').css({'position': Hand_opt.typIco,'z-index':'1999','width':'228px','margin':'2px 0 0 18px','background':'url(/skin/layout/bg_sidebox.gif) repeat-y'});
	$('#handling_head').css({'height':'24px','padding-top':'2px','line-height':'24px','font-weight':'bold','text-align':'center','background':'url(/skin/layout/bg_sidebox_header.jpg) no-repeat'});
	$('#handlingContent').css({'margin':'0px 5px','padding':'2px'});
	$('#handling div.footer').css({'height':'5px','overflow':'hidden','background':'url(/skin/layout/bg_sidebox_footer.gif) no-repeat','clear':'left'});
	$('#Handling_menberList').css('margin','1px 0px 3px 0px');
	$('#hand_listcity , #hand_listcity td').css({'width':'auto','height':'auto','padding':'0px'}); //resize in option page
	$('#hand_listcity td.hand_namecity').css({'width':'150px','padding':'0px 8px 0px 3px','text-align':'left'});
	$('#hand_listcity td.occupiedCities')		// css occupy town
		.css({'background-color':'#ffc6bd'})
		.hover(	function(){$(this).css('background-color','#e1ad62')},
				function(){$(this).css('background-color','#ffc6bd')});
	$('#hand_listcity td.deployedCities')		// css deploy town
		.css({'background-color':'#bff5a9'})
		.hover(	function(){$(this).css('background-color','#e1ad62')},
				function(){$(this).css('background-color','#bff5a9')});
	
	$('#hand_listcity tr').css('height','24px')
		.hover(
			function(){
				$(this).css('background-color','#e1ad62');
				$('#Hand_h3city').text(' >> '+ $(this).text());
			},
			function(){$(this).css('background-color',$('#Handling_mycity').css('background-color'))});
	$('#hand_listcity img').css('margin','3px 1px 0px 1px');
	// selector type view my city
	$('#Handling_mycity').css({'margin':'2px'});
	$('#Handling_mycity img').css({'cursor':'pointer','margin':'3px','padding':'3px','width':'28px','height':'18px'});
	$('#Handling_mycity img[value='+ Hand_opt.myCity +']').css({'background-color':'#ffff51'})
	$('#Handling_mycity img[value!='+ Hand_opt.myCity +']').css({'background-color':'#f6ebbc'})
	

	posHand();
}

function posHand()	// position handling's window 
{
	// control resolution screen
	var scrX = parseInt(window.screen.width /4*3);
	var scrY = parseInt(window.screen.height /2);
	
	if (Hand_opt.posIco.y > scrY)	
	{
		var bottomY = Hand_opt.posIco.y - $('#handling').outerHeight()
		$('#handling').css('top', bottomY +'px')
	}
	else							{$('#handling').css('top',(Hand_opt.posIco.y + 40)+'px')}
		
	if (Hand_opt.posIco.x > scrX)	{$('#handling').css('left', (Hand_opt.posIco.x-228) +'px')}
	else							{$('#handling').css('left', Hand_opt.posIco.x+'px')}
}

function nameCity(string, my)
{
	var title='';
	var temp = my? string.split(']') : string.split('[');
	if (temp[1])
	{
		name = my? $.trim(temp[1]): $.trim(temp[0]);
		title = my? temp[0] + ']': '[' + temp[1];
	}
	else name = string
	return [name,title]
}

function loadItem()	// load list player
{ 
	var ary = localStorage.getItem('Handling_'+ urlId);
	if (!ary) ary='[]';
	return eval(ary);
}

function saveItem(ary)	// save list player
{ 
	localStorage.setItem('Handling_'+ urlId,uneval(ary));
}

Array.prototype.sortName = function ()	// sort list of player from A to Z
	{
		 if (this.length < 2) {return;}
		
		var less = 1;
		for (j=0 ; j < this.length-1 ; j++)
		{
			for (jj=less ; jj< this.length ; jj++)
			{
				if ((this[j].nameP).toLowerCase() > (this[jj].nameP).toLowerCase())
				{
					tmp = this[jj];
					this[jj] = this[j];
					this[j] = tmp
				}
			}
			less++;
		}
	}

/** Function for Hanling windows **/
function redrawSelPly()		// add player in 'select' into handling window
{ 
try
{
	$('#Handling_menberList').html('');
	var listHand = loadItem();
	if(listHand.length > 0)
	{
		var listPly ='';
		$(listHand).each(function(num)
		{
			listPly +="<option value='"+ num +"'>"+ this.nameP +"</option>";
		});
		$('#Handling_menberList').html(
			"<select id='destinationPlayer'>"+
				"<option value='' selected='selected'>"+  localStorage.getItem('Handling_myName_'+ urlId,'my ACCOUNT') +"</option>"+
				listPly +
		    "</select>"+
			"<div><a id='hand_delplayer' href=# title='"+ Hand_lang.memberrem +"'><img src="+ hIco.delPly +"></a></div>"
		);
		$('#hand_delplayer').hide();
		$('#hand_delplayer').click(function(){removeMember($(this),false,false)});
		$('#destinationPlayer').change(function(){changePly();});
	}
	myCity();
	updateLink();
}
catch(er) 				
	{infoError("function redrawSelPly ",er)}
}

function myCity()	// search yuor cities in CitySelect
{ 
try
{
	var html ='';
	var typCity =''; //all city
	if ($('#citySelect option.occupiedCities').length>0 || $('#citySelect option.deployedCities').length>0) // Check if I occupied towns
	{
		$('#Handling_mycity').show()
		if (Hand_opt.myCity == 'my') typCity ='[class=coords]'			//only my city
		else if (Hand_opt.myCity == 'occupy') typCity ='.occupiedCities'	//only occupied city
		else if (Hand_opt.myCity == 'deploy') typCity ='.deployedCities'	//only deployed city
	}
	else $('#Handling_mycity').hide()
	$('#citySelect option' + typCity).each(function(num)
	{
		var nick = nameCity($(this).text(),true);
		var idPly = $(this).attr('value');
		var typeCity = ''	// type of city 'occupy' or 'deploy'
		if ($(this).attr('class')=='occupiedCities coords')			typeCity = " occupiedCities";
		else if ($(this).attr('class')=='deployedCities coords')	typeCity = " deployedCities";
			
		html += $(this).attr('selected')?	"<tr><td class='hand_namecity"+ typeCity +"' title='"+ nick[1] +"'>"+ nick[0] +"</td><td colspan='3' id='handlingtime'></td></tr>":
				"<tr>"+
					"<td class='hand_namecity"+ typeCity +"' title='"+ nick[1] +"'><a class='hand_namecity' value='"+ num +"' href='#'>"+ nick[0] +"</a></td>"+
					"<td><a href='"+ url +"?view=transport&destinationCityId="+ idPly +"' class='hand_goods' title='"+ Hand_lang.goods +"'><img class='icons'></a></td>"+
					"<td><a href='"+ url +"?view=deployment&deploymentType=army&destinationCityId="+ idPly +"' class='hand_army ' title='"+ Hand_lang.army +"'><img class='icons'></a></td>"+
					"<td><a href='"+ url +"?view=deployment&deploymentType=fleet&destinationCityId="+ idPly +"' class='hand_fleet' title='"+ Hand_lang.fleet +"'><img class='icons'></a></td>"+
				"</tr>";
	});
	$('#hand_listcity').html(html);
	
	$('#hand_listcity a.hand_namecity').click(function(){
		var s = document.getElementById('citySelect');
		s.selectedIndex = String(this.getAttribute('value'));
		s.form.submit(); 
		localStorage.setItem("Handlig_ChgCity",true);
	});
}
catch(er) 				
	{infoError("function myCity ",er)}
}

function changePly()	// display cities when change player in 'select player
{ 
try
{
	var id = parseInt($('#destinationPlayer').attr('value'));
	if (isNaN(id)) 	// if name is yuors
	{
		myCity();
		updateLink();
		$('#hand_delplayer').hide();
		// Handling window
		Hand_css()
		return;
	}
	$('#Handling_mycity').hide()
	var html ='';
	var listHand = loadItem();
	var item = listHand[id].cities;
	$(item).each(function()
	{
		html += "<tr>"+
					"<td class='hand_namecity' title='"+ this.name[1] +"'>"+ this.name[0] +"</td>"+
					"<td><a href='"+ url +"?view=transport&destinationCityId="+ this.id +"' class='hand_goods' title='"+ Hand_lang.goods +"'><img class='icons'></a></td>"+
					"<td><a href='"+ url +"?view=deployment&deploymentType=army&destinationCityId="+ this.id +"' value='"+ this.id +"' name='hand1st' class='hand_army' title='"+ Hand_lang.army +"'><img class='icons'></a></td>"+
					"<td><a href='"+ url +"?view=deployment&deploymentType=fleet&destinationCityId="+ this.id +"' value='"+ this.id +"' name='hand2nd' class='hand_fleet' title='"+ Hand_lang.fleet +"'><img class='icons'></a></td>"+
					"<td class='hand_link'><img src='"+ hIco.rightLnk +"'></td>"+
				"</tr>";
	});
	$('#hand_listcity').html(html);
	updateLink();
	$('#hand_delplayer').attr('value', parseInt(listHand[id].idP));
	$('#hand_delplayer').show();
	// Handling window
	$('#hand_listcity td.hand_link').css('padding','1px')
	$('#hand_listcity td.hand_link img')
		.hover(
			function(){$(this).css({'background-color':'#fdf9bb','cursor':'pointer'})},
			function(){$(this).css({'background-color':'transparent','cursor':'auto'})})
		.click(function(){memberLink($(this))});
	Hand_css();
}
catch(er) 				
	{infoError("function changePly ",er)}
}

function updateLink()
{ 
try
{	
	var typImg = parseInt($('#globalResources li.transporters span:last').text()) > 0
	// style immage into action icons
	$('#hand_listcity a.hand_goods img.icons').attr('src',typImg? hIco.trans : hIco.transDis)	// transport
		.hover(
			function(){$(this).attr('src',typImg? hIco.transOvr : hIco.transDis)},
			function(){$(this).attr('src',typImg? hIco.trans : hIco.transDis)});
	
	$('#hand_listcity a.hand_army img.icons').attr('src',typImg? hIco.army : hIco.armyDis)		// army
		.hover(
			function(){$(this).attr('src',typImg? hIco.armyOvr : hIco.armyDis)},
			function(){$(this).attr('src',typImg? hIco.army : hIco.armyDis)});
	
	$('#hand_listcity a.hand_defT img.icons').attr('src',typImg? hIco.defTwn : hIco.defTwnDis)	// Defend Town
		.hover(
			function(){$(this).attr('src',typImg? hIco.defTwnOvr : hIco.defTwnDis)},
			function(){$(this).attr('src',typImg? hIco.defTwn : hIco.defTwnDis)});
	
	$('#hand_listcity a.hand_fleet img.icons').attr('src',hIco.fleet)							// move fleet
		.hover(
			function(){$(this).attr('src',hIco.fleetOvr)},
			function(){$(this).attr('src',hIco.fleet)});
	
	$('#hand_listcity a.hand_defP img.icons').attr('src',hIco.defPort)							// defend port
		.hover(
			function(){$(this).attr('src',hIco.defPortOvr)},
			function(){$(this).attr('src',hIco.defPort)});
	
	$('#hand_listcity img.icons').css({'width':'26px','height':'18px'})
}
catch(er) 				
	{infoError("function updateLink ",er)}
}

function memberLink(lnk)
{ 
try
{
	var first = lnk.parents('tr:first').find('a[name=hand1st]')
	var second = lnk.parents('tr:first').find('a[name=hand2nd]')
	if (lnk.attr('src') == hIco.rightLnk)
	{
		first
			.attr('class','hand_defT')
			.attr('href', url +"?view=defendCity&destinationCityId="+ first.attr('value'))
			.attr('title', Hand_lang.defendTown);
		second
			.attr('class','hand_defP')
			.attr('href', url +"?view=defendPort&destinationCityId="+ second.attr('value'))
			.attr('title', Hand_lang.defendPort);
		lnk.attr('src',hIco.leftLnk);
	}
	else
	{
		first
			.attr('class','hand_army')
			.attr('href', url +"?view=deployment&deploymentType=army&destinationCityId="+ first.attr('value'))
			.attr('title', Hand_lang.army);
		second
			.attr('class','hand_fleet')
			.attr('href', url +"?view=deployment&deploymentType=fleet&destinationCityId="+ second.attr('value'))
			.attr('title', Hand_lang.fleet);
		lnk.attr('src',hIco.rightLnk);
	}
	updateLink()
}
catch(er) 				
	{infoError("function memberLink ",er)}
}
/** END Function for Hanling windows **/

/** Function for Member list into Diplomacy Advisor **/
function selectMember()	// check players into memberlist of diplomacy Advisor Ally
{ 
try
{
	var myName = $('#memberList tr.1 td.cityInfo').prev().text();
	if (myName) localStorage.setItem('Handling_myName_'+ urlId,myName);	// save my name
	
	var listHand = uneval(loadItem());	// Storage member's Ally
	$('#memberList a.message').each(function(){
		var idPly= parseInt($(this).attr('href').split('receiverId=')[1]);
		if (!isNaN(idPly))
		{
			var boolList = listHand.indexOf('idP:"'+ idPly +'"') > 0
			var imgPly = boolList? hIco.outply: hIco.inply;
			var titlePly = boolList? Hand_lang.memberrem: Hand_lang.memberadd;
			var classPly = boolList? "removeplayer": "addplayer";
			$(this).after('<a class="'+ classPly +'" href="#" value='+ idPly +' style="margin:0px 5px"><img src="'+ imgPly +'" title="'+ titlePly +'" alt=""/></a>');
		}
	});
	//Add select/unselect all member
	$("<div id='all_player'>"+
		"<input id='HandUpdate' value='"+ Hand_lang.updateCity +"' type='button' class='button' style='margin: 0px 3px; padding:0px ; font-size:10px ; border-style:solid; border-width:1px'>"+
		"<a href='#' id='allAdd'  title='"+ Hand_lang.allmemberadd +"' style='margin:0px 3px; padding:2px'><img src='"+ hIco.inply +"'><img src='"+ hIco.inply +"'></a>"+
		"<a href='#' id='allRem'  title='"+ Hand_lang.allmemberrem +"' style='margin:0px 3px; padding:2px'><img src='"+ hIco.outply +"'><img src='"+ hIco.outply +"'></a>"+
	  "</div>").appendTo($('#memberList').parent().prev('h3'))
		.css({'position':'absolute','top':'9px','right':'6px','display':'block'});
	all_link()
		
	// event
	$('#memberList a.addplayer').click(function(){addMember($(this),true)})
		.hover(
			function(){$(this).css('background-color','green')},
			function(){$(this).css('background-color',$(this).parent().css('background-color'))});
	$('#memberList a.removeplayer').click(function(){removeMember($(this),true,false)});
	
	$('#HandUpdate').click(function()	//update list of town
	{
		$('#memberList a.removeplayer').each(function()
		{
			removeMember($(this),true,true)
			addMember($(this),false)
		});
		var listHand = loadItem();
		listHand.sortName();
		saveItem(listHand);	// save storage player
		location.reload();
	});
	$('#allAdd').click(function()		//add all player
	{
		$('#memberList a.addplayer').each(function(){addMember($(this),false)});
		var listHand = loadItem();
		listHand.sortName();
		saveItem(listHand);	// save storage player
		location.reload();
	});
	$('#allRem').click(function()		//delete all player
	{
		$('#memberList a.removeplayer').each(function(){removeMember($(this),true,false)});
		location.reload();
	});
	// css event
	$('#memberList a.addplayer , #memberList a.removeplayer , #allAdd , #allRem').hover(
			function(){$(this).css('background-color','white')},
			function(){$(this).css('background-color',$(this).parent().css('background-color'))});
}
catch(er) 				
	{infoError("function selectMember",er)}
}

function all_link ()
{
	if($('#memberList a.addplayer').length > 0) $('#allAdd').show();
	else $('#allAdd').hide();
	if($('#memberList a.removeplayer').length > 0) 
		{
			$('#allRem').show();
			$('#HandUpdate').show();
		}
	else
		{
			$('#allRem').hide();
			$('#HandUpdate').hide();
		}
}

function addMember(nodePly,sort,replace)	// save cities of the member alliance
{ 
try
{
	var listHand = loadItem();	// Storage member's Ally
	var list = {nameP: nodePly.parents('tr').find('td.cityInfo').prev().text(), idP: nodePly.attr('value'), cities:[]};
	nodePly.parents('tr').find('td.cityInfo a').each(function()
		{list.cities.push({name: nameCity($(this).text(),false), id: parseInt($(this).attr('href').split('selectCity=')[1])})});
	listHand.push(list);
	
	if (sort)	listHand.sortName();	// sort list
	saveItem(listHand)					// save storage player
	if (sort)	
	{	
		nodePly.find('img').attr('src',hIco.outply).attr('title',Hand_lang.memberrem);
		nodePly.attr('class',"removeplayer");
		redrawSelPly();
		all_link();
	}
}
catch(er) 				
	{infoError("function addMember ",er)}
}

function removeMember(nodePly,pageAlly,replace)	// delete cities of the member alliance
{ 
try
{
	var listHand = loadItem();	// load storege player
	var idPly = nodePly.attr('value');		// ID Player
	$(listHand).each(function(num)
	{
		if(this.idP == idPly)
		{
			listHand.splice(num,1);
			return false;
		}
	});
	saveItem(listHand)	// save storage player
	if (!replace)	// if you don't update town
	{	
		if (pageAlly)	
		{
			nodePly.find('img').attr('src',hIco.inply).attr('title',Hand_lang.memberadd);
			nodePly.attr('class',"addplayer");
			all_link()
		}
		redrawSelPly();
	}
}
catch(er) 				
	{infoError("function removeMember ",er)}
}
/** END Function for Member list into Diplomacy Advisor **/

function pageOption()
{ 
try
{
	var myName = $('#options_userData input:first').attr('value');
	if (myName) localStorage.setItem('Handling_myName_'+ urlId,myName);
		
	if ($('#options_debug').length > 0)
	{
		$('#mainview div.content:first').before(
			"<div class='content'>" +
				"<h3>"+
						"<a href='http://userscripts.org/scripts/show/58912' target='_blank'>Handling v "+ lversion +"</a>"+
						"<span style='font-size:10px;'>  by <a href='http://userscripts.org/users/95943' target='_blank'>Phate72</a></span>"+
				"</h3>"+
				"<table cellpadding='0' cellspacing='0'>"+
					"<tbody>"+
						"<tr>" +
							"<th id='Hand_position' style='vertical-align: middle'>"+ Hand_lang.head_ico +" </th>" +
							"<td><input type='radio' name='Hand_pos' value='fixed'><span id='Hand_fixed'> "+ Hand_lang.scr_ico +"</span></td>"+
							"<td><input type='radio' name='Hand_pos' value='absolute'><span id='Hand_absolute'> "+ Hand_lang.page_ico +"</span></td>"+
						"</tr>" +
						"<tr>" +
							"<th>Debug</th>" +
							"<td><input type='checkbox' id='Hand_debug'></td>"+
						"</tr>" +

						"<tr>" +
							"<th id='Handlanguage'>"+ Hand_lang.optiontxt +"</th>" +
							"<td><select id='Hand_selectLanguage'></select></td>"+
						"</tr>" +
					"</tbody>"+
				"</table>" +
				"<div><center><input id='Hand_Reset' class='button' value='"+ Hand_lang.optRst +"' type='button'></center></div>" +
				"<div class='footer'></div>" +
			"</div>");
		// add language in Select element
		var selLang = document.getElementById('Hand_selectLanguage');
		for (var l=0; l < ltyp.length; l++)
		{
			 var selOpt = false;
			 if (ltyp[l] == Hand_opt.lang){selOpt = true;}
			 selLang.add(new Option(ltyp[l], ltyp[l],false,selOpt),  null);
		}
		$("input[value='"+ Hand_opt.typIco +"']:radio").attr('checked',true);
		$("input[name='Hand_pos']:radio").click(function(){Hand_opt.typIco = $(this).val()})
		$('#Hand_debug').bind('change',function(){Hand_opt.debug = this.checked}).attr('checked',Hand_opt.debug);
		$('#Hand_selectLanguage').bind('change',function(){changeLanguage(this.value);});
		$('#Hand_Reset').bind('click',function(){getOpt(true);location.reload()});
		
		$(window).unload(function() {setOpt()});
	}
}
catch(er) 				
	{infoError("function pageOption ",er)}
}

function getOpt(reset)	// get option parameter
{
	Hand_opt = eval(localStorage.getItem("Hand_opt"+ urlId));//options
	if (Hand_opt == null || reset) 	// Init parameter
	{
		Hand_opt = {};
		Hand_opt.posIco = {x:0,y:0};
		Hand_opt.typIco = 'fixed';
		Hand_opt.debug = true;
		Hand_opt.lang = navigator.language;
		setOpt()
	}
}
function setOpt() 	// save option parameter
{
	localStorage.setItem("Hand_opt"+ urlId,uneval(Hand_opt));
}

function infoError(name,er)	//with error open forum page
{ 
try
{
	if (!Hand_opt.debug) return; // exit if you don't want debug script
		
	if(confirm(Hand_lang.errortxt + name + " " +  er + Hand_lang.errortxt1))
	{
		window.open("http://userscripts.org/scripts/show/58912");
	}
}
catch(er1) 				
	{alert(er1);}
}

function changeLanguage(newLang)
{ 
try
{	
	Hand_opt.lang = newLang
	Hand_lang = getLanguage();
		
	// change text to option page
	$('#Handlanguage').text(Hand_lang.optiontxt);
	$('#Hand_position').text(Hand_lang.head_ico);
	$('#Hand_fixed').text(Hand_lang.scr_ico);
	$('#Hand_absolute').text(Hand_lang.page_ico);
}
catch(er)
				{infoError("function changeLanguage",er)}
}

function getLanguage()
{ 
try
{
	if (typeof(langs[Hand_opt.lang]) == 'undefined') 
	{
		alert("End_Time. The language is not supported. The script sets the default language (en). In the options page you can change it.");
		Hand_opt.lang ='en';
		setOpt()
	}
	return langs[Hand_opt.lang];
}
catch(er)
		{infoError("function getLanguage",er)}
}