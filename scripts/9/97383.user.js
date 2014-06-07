// ==UserScript==
// @name		DSStorageBalancer
// @namespace	DSLife
// @description	Version 1.29.25 | Das Skript erweitert den Marktplatz um neue Funktionen und gibt außerdem Vorschläge zum Speicherausgleich, angepasst auf Version 7.0
// @author		knish3r
// @include		http://*.die-staemme.de/*
// @include		http://*.staemme.ch/*
// @include		http://*.voyna-plemyon.ru/*
// @exclude		http://forum.die-staemme.de/*
// @exclude		http://forum.staemme.ch/*
// @exclude		http://forum.voyna-plemyon.ru/*
// ==/UserScript==

/* changing script needs permission from the author! */

(function() {
if( !document.getElementById("quickbar_inner") ) return;

var lib = new Knish3rDSLib("DSStorageBalancer");

/*global objects*/
var gui = {
	version: "1.29.25",
	de: {
		DSStorageBalancer: "DSStorageBalancer ",
		minRes: "Rohstoffe im Dorf übrig lassen:",
		maxRes: "Maximal den Speicher füllen bis:",
		pointsFilterFrom: "Dörfer rausfiltern ab Punktezahl:",
		pointsFilterTo: "Dörfer rausfiltern bis Punktezahl:",
		changePointsFilter: "Punktefilter umkehren",
		farmFilterFrom: "Dörfer rausfiltern ab BH-Platz:",
		farmFilterTo: "Dörfer rausfiltern bis BH-Platz:",
		distanceFilter: "max. Entfernung bei Lieferungen:",
		saveInput: "Eingabe gespeichert!",
		saveButton: "Speichern",
		saveMessage: "Die Werte wurden gespeichert!",
		deleteButton: "Daten löschen",
		confirm_delAll: "Sollen die Daten der aktuellen Welt wirklich gelöscht werden?",
		allDataDeleted: "Alle Daten gelöscht!",
		submitButton: "OK [↵]",
		okButton: "OK [x]",
		distanceFilterCheckbox: "max. Entfernung berücksichtigen",
		getTrades: "» Ankommende Transporte einlesen [L]",
		getTradesAgain: "» Ankommende Transporte erneut einlesen [L]",
		gotTrades: "Ankommende Transporte wurden eingelesen!",
		filter: "Filtern",
		readIn: "Einlesen",
		deleted: "Dörferpool löschen",
		confirm_delete: "Wollen Sie den Dörferpool, aus dem die Zieldörfer des DSStorageBalancers berechnet werden, löschen?",
		pooldataDeleted: "Der Dörferpool wurde gelöscht!",
		fractionalReadin: "seitenweises Einlesen",
		fm: "Der DSStorageBalancer muss vor dem Farmmanager ausgeführt werden, sonst wird es zu (Auslese-)Fehlern kommen!",
		readedVillages: ["- Rohstoffe von ", " Dörfern eingelesen -"],
	   	cantReadIn: "Keine Dörfer zum Einlesen vorhanden",
		last: "» Letztes [Z]",
		dsStorageOffer: "DSStorageBalancer Vorschlag:",
		offer: "Biete:",
		require: "Für:",
		value: "Wert: ",
		maxLengthOfTime: "Max. Dauer:",
		offerNumber: "Anzahl:",
		wood: "Holz",
		clay: "Lehm",
		iron: "Eisen",
		hours: " Stunden",
		storageBalanced: "ausgeglichen",
		noOffer: "kein Vorschlag",
		offerBorder: "Händlergrenze beim Verschicken:",
		ownOfferBorder:"Händlergrenze eigene Angebote:",
		disableOfferBorder:"Händlergrenze deaktivieren",
		disableFilter:"Deaktivieren",
		changeFarmFilter: "BH-Filter umkehren",
		maxResPerCent:"Prozentanzeige",
		minResPerCent:"Prozentanzeige",
		headOwnOffer: "Eigene/ Fremde Angebote:",
		headSendResources: "Rohstoffe verschicken:",
		headProductionTable: "Produktionsübersicht:",
		fadeOutEnemies: "Angebote von feindlichen Stämmen ausblenden:",
		readInAllyContracts: "Lese diplomatische Verhältnisse des Stamms ein ",
		readedAllyContracts: "Die Feinde des Stamms wurden ausgelesen!",
		noTribe: "Du bist in keinem Stamm!",
		close: "Schließen",
		forum: ["Forum","Ins Forum zum Thema","wechseln"],
		noOffer: "Kein Vorschlag verfügbar",
		notEnoughMarketeers: "Zu wenig Händler",
		field: "Feld",
		fields: "Felder",
		otherOffer: "Anderer Vorschlag [V]",
		available: "Im Zieldorf vorhanden:",
		sendRes: "Verschicke:",
		coords: "x|y",
		distanceShort: "Entf.",
		eq:  "EQ",
		send: "Verschicke:",
		sendTo: "Nach:",
		availableIn: "Vorhanden:",
		distance: "Entfernung:",
		runtime: "Laufzeit",
		groups: "Gruppen:",
		lastReadIn: "Eingelesen am:",
		noReadIn: ["nichts","eingelesen"],
		villagePool: "Dörferpool:",
		village: "Dorf",
		villages: "Dörfer",
		storageBalancerOffer: "DSStorageBalancer Vorschlag zum Verschicken:",
		maxButton: "Max.",
	},
	ch: {
		DSStorageBalancer: "DSStorageBalancer ",
		minRes: "Rohstoff im Dorf übrig laa:",
		maxRes: "De Spicher maximau fülle:",
		pointsFilterFrom: "Dörfer usefiltere abere Punktzahl:",
		pointsFilterTo: "Dörfer usefiltere bis zunre Punktezahl:",
		changePointsFilter: "Dr Punktefilter umchere",
		farmFilterFrom: "Dörfer usefiltere abem BH-Platz:",
		farmFilterTo: "Dörfer usefiltere bis BH-Platz:",
		distanceFilter: "maximali Entfernig binere Lieferig:",
		saveInput: "Iigab gspeicheret!",
		saveButton: "Speichere",
		saveMessage: "D'Wert sind gspeicheret worde!",
		deleteButton: "Date lösche",
		confirm_delAll: "Sölled d'Date vodr aktuelle Welt würklech glöscht werde?",
		allDataDeleted: "Alli Date glöscht!",
		submitButton: "OK [?]",
		okButton: "OK [x]",
		distanceFilterCheckbox: "maximali Entfernig berücksichtige",
		getTrades: "» Achömedi Transport iläse [L]",
		getTradesAgain: "» Achömedi Transpört erneut iläse [L]",
		gotTrades: "Achömedi Transpört sind ingläse worde!",
		filter: "Filtere",
		readIn: "iläse",
		deleted: "Dörferpool lösche",
		confirm_delete: "Wänd Sie de Dörferpool, aus dem d'Zieldörfer vom DSStorageBalancers berechnet werded, lösche?",
		pooldataDeleted: "Dä Dörferpool isch glöscht worde!",
		fractionalReadin: "sitewiises iilese",
		fm: "De DSStorageBalancer mues vorem Farmmanager usgfüehrt werde, suscht wird's zu (Usläse-)Fehler cho!",
		readedVillages: ["- Rohstoff vo ", " Dörfer igläse -"],
		cantReadIn: "Kei Dörfer zum iläse vorhande",
		last: "» Letscht's [Z]",
		dsStorageOffer: "DSStorageBalancer Vorschlag:",
		offer: "Biet:",
		require: "Für:",
		value: "Wert: ",
		maxLengthOfTime: "Maximali Duur:",
		offerNumber: "Azahl:",
		wood: "Houz",
		clay: "Lehm",
		iron: "Ise",
		hours: " Stunde",
		storageBalanced: "usgliche",
		noOffer: "ken Vorschlag",
		offerBorder: "Händlergrenze bim Verschicke:",
		ownOfferBorder:"Händlergrenze eigni Agebot:",
		disableOfferBorder:"Händlergrenze deaktiviere",
		disableFilter:"Deaktiviere",
		changeFarmFilter: "BH-Filter umchehre",
		maxResPerCent:"Prozentanzeig",
		minResPerCent:"Prozentanzeig",
		headOwnOffer: "Eigeni/ Fremdi Angebot:",
		headSendResources: "Rohstoff verschicke:",
		headProductionTable: "Produktionsübersicht:",
		fadeOutEnemies: "Angebot vo feindliche Stämm usblände:",
		readInAllyContracts: "Di diplomatische Verhältniss vom Stamm iläse ",
		readedAllyContracts: "D'Feinde vom Stamm sind usgläse worde!",
		noTribe: "Du bisch i keim Stamm!",
		close: "Schliesse",
		forum: ["Forum","Is Forum zum Thema","wechsle"],
		noOffer: "Kein Vorschlag verfüegbar",
		notEnoughMarketeers: "Z'wenig Händler",
		field: "Feld",
		fields: "Felder",
		otherOffer: "Anderer Vorschlag [V]",
		available: "Im Zieldorf vorhanden:",
		sendRes: "Verschicke:",
		coords: "x|y",
		distanceShort: "Entf.",
		eq: "EQ",
		send: "Verschicke:",
		sendTo: "Nach:",
		availableIn: "Vorhande:",
		distance: "Entfernig:",
		runtime: "Laufzit",
		groups: "Gruppe:",
		lastReadIn: "igläse am:",
		noReadIn: ["nüt","igläse"],
		villagePool: "Dörferpool:",
		village: "Dorf",
		villages: "Dörfer",
		storageBalancerOffer: "DSStorageBalancer Vorschlag zum Verschicke:",
		maxButton: "Max.",
	},
	ru: {
		DSStorageBalancer: "ВП Баланс ресурсов",
		minRes: "Минимум сырья которое должно остаться:",
		maxRes: "Максимум сырья которое можно отправить:",
		pointsFilterFrom: "Фильтрация по очкам:",
		pointsFilterTo: "Фильтрация по крестьянскому двору:",
		changePointsFilter: "Фильтровать в обратном направлении",
		farmFilterFrom: "Фильтровать по крестьянскому двору до...:",
		farmFilterTo: "Фильтровать по крестьянскому двору от...:",
		distanceFilter: "Максимальная дистанция отправки:",
		saveInput: "Eingabe gespeichert!",
		saveButton: "Сохранить",
		saveMessage: "Сохранено!",
		deleteButton: "Сброс",
		confirm_delAll: "Все данные будут сброшены. Вы уверены?",
		allDataDeleted: "Данные сброшены",
		submitButton: "OK [↵]",
		okButton: "OK [x]",
		distanceFilterCheckbox: "Включить",
		getTrades: "» Посмотреть прибывающие обозы [L]",
		getTradesAgain: "» Ankommende Transporte erneut einlesen [L]",
		gotTrades: "Ankommende Transporte wurden eingelesen!",
		filter: "Фильтр",
		readIn: "чтение всех деревень",
		deleted: "Удалить данные",
		confirm_delete: "Вы действительно хотите удолить сохранённые данные Баланс ресурсов?",
		pooldataDeleted: "Данные были удалены!",
		fractionalReadin: "Чтение выбранной группы",
		fm: "Der DSStorageBalancer muss vor dem Farmmanager ausgeführt werden, sonst wird es zu (Auslese-)Fehlern kommen!",
		readedVillages: ["- Отправка возможна из ", " Деревень -"],
	   	cantReadIn: "Keine Dörfer zum Einlesen vorhanden",
		last: "» Последняя [Z]",
		dsStorageOffer: "ВП Баланс предложений",
		offer: "Имеются:",
		require: "В обмен на:",
		value: "Кол-во: ",
		maxLengthOfTime: "Максимальный срок доставки:",
		offerNumber: "Кол-во партий:",
		wood: "Дерево",
		clay: "Глина",
		iron: "Железо",
		hours: " Часов",
		storageBalanced: "ausgeglichen",
		noOffer: "kein Vorschlag",
		offerBorder: "Количество купцов для отправки:",
		ownOfferBorder:"Ограничить предложения:",
		disableOfferBorder:"Отключить",
		disableFilter:"Отключить",
		changeFarmFilter: "Переключить фильтр",
		maxResPerCent:"В процентном соотношении",
		minResPerCent:"В процентном соотношении",
		headOwnOffer: "Свои/чужие предложения",
		headSendResources: "Предложения сырья:",
		headProductionTable: "Настройка фильтров:",
		fadeOutEnemies: "Скрыть предложения враждебных племён:",
		readInAllyContracts: "Чтение и запись дипломатии",
		readedAllyContracts: "Враги племени записаны!",
		noTribe: "Du bist in keinem Stamm!",
		close: "Schließen",
		forum: ["Forum","Ins Forum zum Thema","wechseln"],
		noOffer: "Нет доступных деревень",
		notEnoughMarketeers: "Слишком мало купцов",
		field: "Поле",
		fields: "Полей",
		otherOffer: "Другие предложения [V]",
		available: "В целевой деревне имеется",
		sendRes: "Отправить:",
		coords: "x|y",
		distanceShort: "Раст.",
		eq:  "EQ",
		send: "Отправить:",
		sendTo: "Куда:",
		availableIn: "Количество:",
		distance: "Дистанция:",
		runtime: "Продолжительность:",
		groups: "Группа:",
		lastReadIn: "Время прибытия:",
		noReadIn: ["nichts","eingelesen"],
		villagePool: "Поставщики:",
		village: "Деревня",
		villages: "Деревень",
		storageBalancerOffer: "ВП Баланс отправки:",
		maxButton: "Max.",
	},
}

var regExp = {
	de: {
		fm: /▲▼/,
		allVillages: /&gt;alle&lt/g,
		groupAllIsActive: /alle/,
		village: /Dorf/,
		points: /Punkte/,
		res: /Rohstoffe/,
		storage: /Speicher/,
		farm:/Bauernhof/,
		today: /heute/,
		tomorrow: /morgen/,
		arrivalAt: "um",
		clock: "Uhr",
		wood: "holz",
		clay: "lehm",
		iron: "eisen",
		cancel: "abbrechen",
	},
	ch: {
		fm: /▲▼/,
		allVillages: /&gt;aui&lt/g,
		groupAllIsActive: /aui/,
		village: /Dorf/,
		points: /Pünkt/,
		res: /Rohstoffe/,
		storage: /Spicher/,
		farm:/Burehof/,
		today: /hüt/,
		tomorrow: /morn/,
		arrivalAt: "um",
		clock: "Uhr",
		wood: "holz",
		clay: "lehm",
		iron: "eisen",
		cancel: "abbräche",
	},
	ru: {
		fm: /▲▼/,
		allVillages: /&gt;все&lt/g,
		groupAllIsActive: /все/,
		village: /Деревня/,
		points: /Очки/,
		res: /Сырьё/,
		storage: /Склад/,
		farm:/Усадьба/,
		today: /сегодня/,
		tomorrow: /завтра/,
		arrivalAt: " в ",
		clock: "Uhr",
		wood: "holz",
		clay: "lehm",
		iron: "eisen",
		cancel: "отменить",
	},
}




/*defaultSettings*/
if( lib.storage.getValue("ServerCfg","") == "" ) {var XmlHttp = new XMLHttpRequest(); if(XmlHttp) {
	XmlHttp.open("GET", "interface.php?func=get_config", true);
 	XmlHttp.onreadystatechange = function() {            
    if( XmlHttp.readyState == 4 ) {
        var xml = XmlHttp.responseXML; var speed = xml.getElementsByTagName("speed");
        var unit_speed = xml.getElementsByTagName("unit_speed");
        var values= {speed: speed[0].firstChild.nodeValue, unit_speed: unit_speed[0].firstChild.nodeValue };
        lib.storage.setValue("ServerCfg",values);}}; XmlHttp.send(null,false);}}
var defaultFilterSettings = {minRes: 250000, minResPerCent: 60, maxResPerCent: 90, maxRes: 250000, 
    pointsFilter: 9900, farmFilter: 23600, distanceFilter: 50, offerBorder: 10, ownOfferBorder: 10, allyEnemies:"",};
var defaultCheckboxSettings = {filterCheckbox: false, readInCheckbox: false, fractionalReadInCheckbox: false, disableMinRes: true, 
    disableMaxRes: true, minResPerCent: false, maxResPerCent: false, distanceFilterCheckbox: false, disablePointsFilter: false, 
    changePointsFilterCheckbox: false, disableFarmFilter: false, changeFarmFilterCheckbox: false, getIncomingTradesCheckbox: false, 
    tradesReaded: false, disableOfferBorder:true, disableOwnOfferBorder:true, offerWood:true, offerClay:true, offerIron:true, 
    requireWood:true, requireClay:true, requireIron:true, fadeOutEnemies:false,fadeOutTable:false,fadeOutOwnOfferTable:false,}
var defaultOwnOfferValues = {resSell: 1000, resBuy: 1000, maxTime: 40,}

/*global hotkeys*/
lib.hotkeys.keys.push( { key: 77, href: lib.game_data.link_base.replace("screen=","screen=market") } );
var container = document.getElementById("menu_row2"); var a = container.getElementsByTagName("a");
for( var j = 0; j < a.length; j++ ) {
       if( a[j].accessKey == "d" )  {var href = a[j].href; lib.hotkeys.keys.push( { key: 107, href: href } ); lib.hotkeys.keys.push( { key: 61, href: href } );}
       if( a[j].accessKey == "a" )  {var href = a[j].href; lib.hotkeys.keys.push( { key: 109, href: href } );}
}


/*Reads the resources from each village and stores them via storage*/
if ( document.getElementById('production_table') ) {
	var filterCheckbox = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).filterCheckbox;
	var readInCheckbox = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).readInCheckbox;
	var fractionalReadInCheckbox = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).fractionalReadInCheckbox;
	var checkboxes=lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
	if( checkboxes.disablePointsFilter && checkboxes.disableFarmFilter ) {
		checkboxes.filterCheckbox = false;
		lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}

	if( readInCheckbox || fractionalReadInCheckbox) {
	var fm = false, cellNames = document.getElementById("production_table").getElementsByTagName("tr")[0].getElementsByTagName("th");
	for(var e = 0; e < cellNames.length; e++ ) {if( cellNames[e].textContent.match(regExp[lib.lang].fm) ) fm = true;}
	if( fm ) {alert(gui[lib.lang].fm); var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
	checkboxes.readInCheckbox=false; checkboxes.fractionalReadInCheckbox = false; readInCheckbox=false; fractionalReadInCheckbox = false;
	lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes)}}

	if( readInCheckbox || fractionalReadInCheckbox) {
		var table, villageCell=0, pointsCell=1, resCell=2, storageCell=3,farmCell=5, counter=0, nothing=false;
		var rows = lib.xPath('//tr[contains(@class, "row_")]');
		if( rows.length == 0 ) nothing=true;
		if( readInCheckbox ) {
            var vals = lib.storage.listValues();
            for(var i = 0; i < vals.length; i++ ) {
            if( vals[i].match("DestinationVillage_player.id"+lib.game_data.player.id) && !nothing)
                lib.storage.deleteValue(vals[i]);}}
		var minfarm = parseInt(lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).farmFilter);
		var filterPoints = parseInt(lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).pointsFilter);
		var now = new Date(), group = document.getElementsByTagName("strong")[0].textContent.replace(/[<>]/g,""); group=group.substring(1,group.length-1);
		if( fractionalReadInCheckbox ) {
			var last = lib.storage.getValue("LastReadIn_player.id"+lib.game_data.player.id,"");
			if( last != "" ) {
				if( last.group != group ) group=last.group+";"+group;}
		}
		var serverDate = document.getElementById("serverDate").innerHTML.split("/");
		var serverTime = document.getElementById("serverTime").innerHTML.split(":");
		now.setFullYear( serverDate[2] ); now.setMonth( serverDate[1]-1 );
		now.setDate( serverDate[0] ); now.setHours( serverTime[0] );
		now.setMinutes( serverTime[1] ); now.setSeconds( serverTime[2] );
		var timeValue = {time: now.getTime(), group: group};
		if( !nothing ) lib.storage.setValue("LastReadIn_player.id"+lib.game_data.player.id, timeValue);
		var cellNames = document.getElementById("production_table").getElementsByTagName("tr")[0].getElementsByTagName("th");
		for(var i=0 ; i<cellNames.length ; i++) {
			if( cellNames[i].textContent.match(regExp[lib.lang].village) ) villageCell=i;
			if( cellNames[i].textContent.match(regExp[lib.lang].points) ) pointsCell=i;
			if( cellNames[i].textContent.match(regExp[lib.lang].res) ) resCell=i;
			if( cellNames[i].textContent.match(regExp[lib.lang].storage) ) storageCell=i;
			if( cellNames[i].textContent.match(regExp[lib.lang].farm) ) farmCell=i;
		}
		
		for(var i = 0; i < rows.length; i++) {
			var row = rows[i];
			if (i==0) table=row.parentNode.parentNode;
			var readvillage = true;
			var farm = parseInt(row.getElementsByTagName("td")[farmCell].innerHTML.split("/")[0]);
			var points = parseInt(row.getElementsByTagName("td")[pointsCell].textContent.replace(/\.|\s$|^\s/g, ""));
			var conditionFilter = false;
			if ( filterCheckbox ) {

			if( checkboxes.changePointsFilterCheckbox && !checkboxes.changeFarmFilterCheckbox
				&&!checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter)
				conditionFilter = farm >= minfarm && points <= filterPoints;
			if( checkboxes.changePointsFilterCheckbox && !checkboxes.changeFarmFilterCheckbox 
				&&checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter)
				conditionFilter = farm >= minfarm;
			if( checkboxes.changePointsFilterCheckbox && !checkboxes.changeFarmFilterCheckbox
				&&!checkboxes.disablePointsFilter&&checkboxes.disableFarmFilter)
				conditionFilter = points <= filterPoints;

			if( checkboxes.changePointsFilterCheckbox && checkboxes.changeFarmFilterCheckbox 
				&&!checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
				conditionFilter = farm <= minfarm && points<= filterPoints;
			if( checkboxes.changePointsFilterCheckbox && checkboxes.changeFarmFilterCheckbox 
				&&checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
				conditionFilter = farm <= minfarm;
			if( checkboxes.changePointsFilterCheckbox && checkboxes.changeFarmFilterCheckbox 
				&&!checkboxes.disablePointsFilter&&checkboxes.disableFarmFilter )
				conditionFilter = points<= filterPoints;

			if( !checkboxes.changePointsFilterCheckbox
				&& !checkboxes.changeFarmFilterCheckbox&&!checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
				conditionFilter = farm >= minfarm && points >= filterPoints;
			if( !checkboxes.changePointsFilterCheckbox 
				&& !checkboxes.changeFarmFilterCheckbox&&checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
				conditionFilter = farm >= minfarm;
			if( !checkboxes.changePointsFilterCheckbox
				&& !checkboxes.changeFarmFilterCheckbox&&!checkboxes.disablePointsFilter&&checkboxes.disableFarmFilter )
				conditionFilter = points >= filterPoints;

			if( !checkboxes.changePointsFilterCheckbox && checkboxes.changeFarmFilterCheckbox 
				&&!checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
				conditionFilter = farm <= minfarm && points >= filterPoints;
			if( !checkboxes.changePointsFilterCheckbox && checkboxes.changeFarmFilterCheckbox 
				&&checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
				conditionFilter = farm <= minfarm;
			if( !checkboxes.changePointsFilterCheckbox && checkboxes.changeFarmFilterCheckbox 
				&&!checkboxes.disablePointsFilter&&checkboxes.disableFarmFilter )
				conditionFilter = points >= filterPoints;

			if (conditionFilter) {
				readvillage = false;
				row.parentNode.removeChild(row);
			}
		}
		

		if ( readvillage && !nothing) {
			var values = {villageName: "", villageCoord: "", wood: 0, clay: 0, iron: 0, storage: 400000};
			values.villageName=row.getElementsByTagName("td")[villageCell].textContent.replace (/^\s+/, '').replace (/\s+$/, '');
			if( lib.lang != "ru" ) {values.villageCoord=values.villageName.match(/\((\d{1,3})\|(\d{1,3})\) K(\d+)$/)[0].split("(")[1].split(")")[0];}
			else {values.villageCoord = values.villageName.split("("); values.villageCoord = values.villageCoord[values.villageCoord.length-1].split(")")[0];}
			var res=row.getElementsByTagName("td")[resCell].textContent.replace(/\.|\s$|^\s/g, "").split(" ");
			values.wood+=parseInt(res[0],10);
			values.clay+=parseInt(res[1],10);
			values.iron+=parseInt(res[2],10);
			values.storage = row.getElementsByTagName("td")[storageCell].textContent;
			counter++;
            
			lib.storage.setValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+values.villageCoord.replace("|","_"),values);
		}
	}
	var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
	checkboxes.readInCheckbox=false; checkboxes.fractionalReadInCheckbox = false; checkboxes.tradesReaded = false;
	lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
	}
	
	/*buttons on production_table*/
	var tables = document.getElementsByTagName('table');
	var table_cb = null;
	for (var i = 0; i < tables.length; i++) {
		if (tables[i].className == 'vis') {
			table_cb = tables[i+2];
			break;}
	}
	var newElement = document.createElement('tr');
	table_cb.parentNode.insertBefore(newElement, table_cb);
	var cell = document.createElement('td');
	newElement.appendChild(cell);

	var input = document.createElement("input");
	input.type = "checkbox";
	input.id = "filterCheckbox";
	input.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).filterCheckbox;
	input.addEventListener("click", function(){ 
					var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
					if( this.checked ) {checkboxes.filterCheckbox=true;	
							lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
					else {checkboxes.filterCheckbox=false;		
							lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
	}, false);

	cell.appendChild(input);
	var cell2 = document.createElement('td');
	newElement.appendChild(cell2);
	cell2.innerHTML = "<b>"+gui[lib.lang].filter+"</b><span style='white-space:pre'>&#9;</span>";
	var cell3 = document.createElement('td');
	var readIn = document.createElement("input");
	readIn.type = "checkbox";
	readIn.id = "readInCheckbox";
	readIn.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).readInCheckbox;
	readIn.addEventListener("click", function(){ 
					var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
					if( this.checked ) {checkboxes.readInCheckbox=true;	
							lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
					else {checkboxes.readInCheckbox=false;		
							lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
					window.location.href = lib.game_data.link_base.replace("screen=","screen=overview_villages&mode=prod&group=0&page=-1");
	}, false);

	newElement.appendChild(cell3);
	cell3.appendChild(readIn);
	var cell4 = document.createElement('td');
	newElement.appendChild(cell4);
    
    var pages = document.getElementById("paged_view_content").getElementsByTagName("tr")[1].innerHTML;
    var activeGroup = document.getElementById("paged_view_content").getElementsByTagName("strong")[0].textContent;
    var boolean = true; if( ( !regExp[lib.lang].groupAllIsActive.test(pages)|| regExp[lib.lang].allVillages.test(pages) ) && regExp[lib.lang].groupAllIsActive.test(activeGroup) ) boolean = false;
    cell4.innerHTML = "<b>"+gui[lib.lang].readIn+"</b><span style='white-space:pre'>&#9;</span>";
    
    var cell5 = document.createElement('td');
    var deleteButton = document.createElement('input');
    deleteButton.type = 'checkbox';
    deleteButton.id = 'deleteCheckbox';
    deleteButton.addEventListener("click", function(){
        if( deleteButton.checked ) {
            if( confirm( gui[lib.lang].confirm_delete ) ) {
                var vals = lib.storage.listValues();
                for(var i = 0; i < vals.length; i++ ) {
                if( vals[i].match("DestinationVillage_player.id"+lib.game_data.player.id) && !nothing) lib.storage.deleteValue(vals[i]);}
		lib.storage.deleteValue("LastReadIn_player.id"+lib.game_data.player.id);
                alert( gui[lib.lang].pooldataDeleted );}
             else deleteButton.checked = false;}
    }, false);
        
    cell5.appendChild(deleteButton);
    var cell6 = document.createElement('td');
    cell6.innerHTML = "<b>"+gui[lib.lang].deleted+"</b><span style='white-space:pre'>&#9;</span>";
    if( !boolean ) cell6.innerHTML += "<span style='white-space:pre'>&#9;</span>";
    newElement.appendChild(cell5);
    newElement.appendChild(cell6);
    
    if( boolean ) {
        var cell7 = document.createElement('td');  
        var fractionalReadIn = document.createElement('input');
        fractionalReadIn.type = 'checkbox';
        fractionalReadIn.id = 'fractionalReadInCheckbox';
        fractionalReadIn.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).fractionalReadInCheckbox;
        fractionalReadIn.addEventListener("click", function(){ 
                    var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
					if( this.checked ) {checkboxes.fractionalReadInCheckbox=true;	
							lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
					else {checkboxes.fractionalReadInCheckbox=false;		
							lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
					window.location.reload();
        }, false);
        newElement.appendChild(cell7);
    	cell7.appendChild(fractionalReadIn);
        var cell8 = document.createElement('td');
        cell8.innerHTML = "<b>"+gui[lib.lang].fractionalReadin+"</b><span style='white-space:pre'>&#9;</span><span style='white-space:pre'>&#9;</span>";
        newElement.appendChild(cell8);
    }
    
    if( counter > 0 || nothing) {
        var cell9 = document.createElement('td');
        newElement.appendChild(cell9);
        if( counter > 0 ) {
        var html = '<input type="text" onselect="this.select();" id="readedVillages" value="'+gui[lib.lang].readedVillages[0]+ counter;
        html += gui[lib.lang].readedVillages[1]+'" size="35" style="border:0; background-color:inherit;"></input>';}
        else {var html='<input type="text" onselect="this.select();" id="readedVillages" value="'+gui[lib.lang].cantReadIn;
        html += '" size="35" style="border:0; background-color:inherit;"></input>';}
        cell9.innerHTML = html;
        document.getElementById("readedVillages").select();
    }
}

/*read incoming trades on 'mode=trader'*/
	if ( document.getElementById("trades_table") || ( location.href.match(/screen=overview_villages/) && location.href.match(/mode=trader/) ) ) {
    
        var getIncTrades = function () {
            window.location.href = lib.game_data.link_base.replace("amp;","").replace("screen=","screen="+lib.game_data.screen+"&mode=trader&group=0&type=inc&page=-1");
            var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
            checkboxes.getIncomingTradesCheckbox=true;
            lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
            var vals = lib.storage.listValues();
            for(var i = 0; i < vals.length; i++ ) {
                if( vals[i].match("Trade_player.id"+lib.game_data.player.id) )
                	lib.storage.deleteValue(vals[i]);}
        }
        
        var parseIncTrades = function () {
            var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
            var rows = lib.xPath('//tr[contains(@class, "row_")]');

            /*generate object with data*/
            for( var i=0 ; i<rows.length ; i++ ) {
                var time = new Date();
                var serverDate = document.getElementById("serverDate").innerHTML.split("/");
                var serverTime = document.getElementById("serverTime").innerHTML.split(":");
                time.setFullYear( serverDate[2] ); time.setMonth( serverDate[1]-1 );
                time.setDate( serverDate[0] ); time.setHours( serverTime[0] );
                time.setMinutes( serverTime[1] ); time.setSeconds( serverTime[2] );
                var destinationName = rows[i].getElementsByTagName("td")[3].textContent.split("(");
                destinationName = destinationName[destinationName.length-1].split(")")[0].toString().replace("|","_");
                var tradeValues = {wood: 0, clay: 0, iron: 0, dateOfArrival:""};
		var arrayLength = tradeValues.wood.length+1;
                var arrival = rows[i].getElementsByTagName("td")[4].textContent;
                arrival=arrival.split(regExp[lib.lang].arrivalAt);
                if( arrival[0].match(regExp[lib.lang].today) || arrival[0].match(regExp[lib.lang].tomorrow) ) {
                    if( arrival[0].match(regExp[lib.lang].tomorrow) ) time.setTime(time.getTime() + (1000*60*60*24));
                    var year = time.getFullYear(), month = (time.getMonth()+1).toString(), date = time.getDate().toString();
                    if( month.length == 1 ) month = "0"+month;
                    if( date.length == 1 ) date = "0"+date;
                    var hoursMinutes = arrival[1].split(regExp[lib.lang].clock)[0].replace(/\s/g,"");
                    tradeValues.dateOfArrival = year+"-"+month+"-"+date+"_"+hoursMinutes;
                } else {
                    var year = time.getFullYear(), actualMonth = time.getMonth()+1;
                    var hoursMinutes = arrival[1].split(regExp[lib.lang].clock)[0].replace(/\s/g,"");
                    var month = parseInt(arrival[0].split(".")[1],10);
                    if( actualMonth < month ) year += 1;
                    if( month.toString().length == 1 ) month = "0"+month;
                    var date = arrival[0].split(".")[0].replace(/[a-zA-Z]/g,"").replace(/\s/g,"");
                    tradeValues.dateOfArrival = year+"-"+month+"-"+date+"_"+hoursMinutes;
                }
		
                var resName = rows[i].getElementsByTagName("td")[7].getElementsByTagName("img");
                var resValue = rows[i].getElementsByTagName("td")[7].textContent.split(" ");
                    for( var r=0 ; r<resName.length ; r++ ) {
                        if( resName[r].getAttribute("title") == gui[lib.lang].wood )
                            tradeValues.wood = parseInt(resValue[r].replace(".","") );
                        if( resName[r].getAttribute("title") == gui[lib.lang].clay )
                            tradeValues.clay = parseInt(resValue[r].replace(".","") );
                        if( resName[r].getAttribute("title") == gui[lib.lang].iron ) 
                            tradeValues.iron = parseInt(resValue[r].replace(".","") );
                    }	
		if( tradeValues.wood.length < arrayLength ) tradeValues.wood.push( 0 );
		if( tradeValues.clay.length < arrayLength ) tradeValues.clay.push( 0 );
		if( tradeValues.iron.length < arrayLength ) tradeValues.iron.push( 0 );
		var trades = {wood: [], clay: [], iron: [], dateOfArrival:[]};
		var trade = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,trades);
		trade.wood.push(tradeValues.wood); trade.clay.push(tradeValues.clay); trade.iron.push(tradeValues.iron); trade.dateOfArrival.push(tradeValues.dateOfArrival);
		lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,trade);
            }
            checkboxes.getIncomingTradesCheckbox=false; checkboxes.tradesReaded=true;
            lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
            alert(gui[lib.lang].gotTrades);
        }

	if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).getIncomingTradesCheckbox )
		var newTrades = new parseIncTrades();
        var tab = document.getElementById("paged_view_content").getElementsByClassName("vis")[2];
        var a = tab.parentNode.insertBefore(document.createElement("a"),tab);
        if( !lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).tradesReaded )
        	a.innerHTML = gui[lib.lang].getTrades;
	else a.innerHTML = gui[lib.lang].getTradesAgain;
        a.href = "javascript:;";
        a.id = "getTrades";
        a.addEventListener("click", function() {var newTrades = new getIncTrades();}, false );
        lib.hotkeys.keys.push( { key: 76, event: { id: "getTrades", event: "click" } } );
}


/*settings: 'mode=settings'*/
if (location.href.match("screen=settings&mode=settings")) {
    
	var tr = new Array(12);
	for( var i=0 ; i<tr.length ; i++ )
		tr[i] = document.createElement("tr");

	var th = new Array(4);
    	for( var i=0 ; i<th.length ; i++ )
        	th[i] = document.createElement("th");

	var td = new Array(16);
    	for( var i=0 ; i<td.length ; i++ )
        	td[i] = document.createElement("td");
	
	th[0].setAttribute("colspan", "4");
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=144514' target='"+gui[lib.lang].forum[0]+"' title='"+gui[lib.lang].forum[1]+" \"" 
	+ gui[lib.lang].DSStorageBalancer + "\" "+gui[lib.lang].forum[2]+"'><u>" + gui[lib.lang].DSStorageBalancer + gui.version + "</u></a>";

	th[1].setAttribute("colspan", "2");
	th[1].innerHTML = gui[lib.lang].headProductionTable;

	th[2].setAttribute("colspan", "2");
	th[2].innerHTML = gui[lib.lang].headSendResources;

	th[3].setAttribute("colspan", "2");
	th[3].innerHTML = gui[lib.lang].headOwnOffer;

	if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).changePointsFilterCheckbox )
		td[0].innerHTML += gui[lib.lang].pointsFilterTo;
	else td[0].innerHTML += gui[lib.lang].pointsFilterFrom;
	td[1].setAttribute("style", "vertical-align:top;");
	td[1].innerHTML += "<input type='text' id='pointsFilter' value='" + lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).pointsFilter + "'><font color='#f7eed3'>%</font>";

	var disablePointsFilter = td[1].appendChild(document.createElement("input"));
	disablePointsFilter.type="checkbox";
	disablePointsFilter.setAttribute("style", "margin-left:1em;");
  	disablePointsFilter.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).disablePointsFilter;
	td[1].appendChild(document.createTextNode(gui[lib.lang].disableFilter));
	if( disablePointsFilter.checked ) tr[2].style.color = "#A9A9A9";
	disablePointsFilter.addEventListener( "click", function(){if( this.checked ) tr[2].style.color = "#A9A9A9";
			else tr[2].style.color = "#000000";}, false);  

	var changePointsFilter = td[1].appendChild(document.createElement("input"));
	changePointsFilter.type="checkbox";
	changePointsFilter.setAttribute("style", "margin-left:2em;");
  	changePointsFilter.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).changePointsFilterCheckbox;
	changePointsFilter.addEventListener( "click", function(){ 
			if( this.checked ) td[0].innerHTML = gui[lib.lang].pointsFilterTo;
			else td[0].innerHTML = gui[lib.lang].pointsFilterFrom;}, false);    

	td[1].appendChild(document.createTextNode(gui[lib.lang].changePointsFilter));
    
	td[2].setAttribute("style", "vertical-align:top;");
	if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).changeFarmFilterCheckbox )
		td[2].innerHTML += gui[lib.lang].farmFilterTo;
	else td[2].innerHTML += gui[lib.lang].farmFilterFrom;
	td[3].setAttribute("style", "vertical-align:top;");
	td[3].innerHTML += "<input type='text' id='farmFilter' value='" + lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).farmFilter + "'><font color='#f7eed3'>%</font>";

	var disableFarmFilter = td[3].appendChild(document.createElement("input"));
	disableFarmFilter.type="checkbox";
	disableFarmFilter.setAttribute("style", "margin-left:1em;");
  	disableFarmFilter.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).disableFarmFilter;
	td[3].appendChild(document.createTextNode(gui[lib.lang].disableFilter));
	if( disableFarmFilter.checked ) tr[3].style.color = "#A9A9A9";
	disableFarmFilter.addEventListener( "click", function(){if( this.checked ) tr[3].style.color = "#A9A9A9";
			else tr[3].style.color = "#000000";}, false); 

	var changeFarmFilter = td[3].appendChild(document.createElement("input"));
	changeFarmFilter.type="checkbox";
	changeFarmFilter.setAttribute("style", "margin-left:2em;");
  	changeFarmFilter.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).changeFarmFilterCheckbox;
	changeFarmFilter.addEventListener( "change", function(){ 
			if( this.checked ) td[2].innerHTML = gui[lib.lang].farmFilterTo;
			else td[2].innerHTML = gui[lib.lang].farmFilterFrom;}, false);    
	td[3].appendChild(document.createTextNode(gui[lib.lang].changeFarmFilter));

	td[4].innerHTML += gui[lib.lang].minRes;
	if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).minResPerCent ) {
			var perCent = "<font id='minResPerCentColor' color='#000000'>%</font>";
			var minResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).minResPerCent;
            if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).disableMinRes ) 
                perCent = "<font id='minResPerCentColor' color='#A9A9A9'>%</font>";
	} else {
			var perCent = "<font id='minResPerCentColor' color='#f7eed3'>%</font>";
			var minResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).minRes;}
	td[5].innerHTML += "<input type='text' id='minRes' value='" + minResValue + "'>"+perCent;

	var disableMinRes = td[5].appendChild(document.createElement("input"));
	disableMinRes.type="checkbox";
	disableMinRes.setAttribute("style", "margin-left:1em;");
  	disableMinRes.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).disableMinRes;
	td[5].appendChild(document.createTextNode(gui[lib.lang].disableFilter));
	if( disableMinRes.checked ) tr[5].style.color = "#A9A9A9";
	disableMinRes.addEventListener( "click", function(){if( this.checked ) tr[5].style.color = "#A9A9A9"; else tr[5].style.color = "#000000";
                if( document.getElementById("minResPerCent").checked ) {
                    if( this.checked ) document.getElementById("minResPerCentColor").color = "#A9A9A9";
                    else document.getElementById("minResPerCentColor").color = "#000000";}
                else { if( this.checked ) document.getElementById("minResPerCentColor").color = "#f7eed3";
                    else document.getElementById("minResPerCentColor").color = "#f7eed3";}}, false); 

	var minResPerCent = td[5].appendChild(document.createElement("input"));
	minResPerCent.type="checkbox";
	minResPerCent.setAttribute("style", "margin-left:2em;");
	minResPerCent.id = "minResPerCent";
  	minResPerCent.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).minResPerCent;
	minResPerCent.addEventListener( "change", function(){ 
		if( this.checked ) {
            if( disableMinRes.checked ) perCent = "#A9A9A9"; else perCent = "#000000"; 
            minResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).minResPerCent;
		} else { perCent = "#f7eed3";
			minResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).minRes};
		document.getElementById("minRes").value=minResValue;
		document.getElementById("minResPerCentColor").color=perCent;
	}, false);  
	td[5].appendChild(document.createTextNode(gui[lib.lang].minResPerCent));

   	td[6].innerHTML += gui[lib.lang].maxRes;
	if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).maxResPerCent ) {
			var maxPerCent = "<font id='maxResPerCentColor' color='#000000'>%</font>";
			var maxResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).maxResPerCent;
            if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).disableMaxRes ) 
                maxPerCent = "<font id='maxResPerCentColor' color='#A9A9A9'>%</font>";
	} else {
	var maxPerCent = "<font id='maxResPerCentColor' color='#f7eed3'>%</font>";
	var maxResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).maxRes;}
   	td[7].innerHTML += "<input type='text' id='maxRes' value='" + maxResValue + "'>"+maxPerCent;

	var disableMaxRes = td[7].appendChild(document.createElement("input"));
	disableMaxRes.type="checkbox";
	disableMaxRes.setAttribute("style", "margin-left:1em;");
  	disableMaxRes.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).disableMaxRes;
	td[7].appendChild(document.createTextNode(gui[lib.lang].disableFilter));
	if( disableMaxRes.checked ) tr[6].style.color = "#A9A9A9";
	disableMaxRes.addEventListener( "click", function(){if( this.checked ) tr[6].style.color = "#A9A9A9"; else tr[6].style.color = "#000000";
                if( document.getElementById("maxResPerCent").checked ) {
                    if( this.checked ) document.getElementById("maxResPerCentColor").color = "#A9A9A9";
                    else document.getElementById("maxResPerCentColor").color = "#000000";}
                else { if( this.checked ) document.getElementById("maxResPerCentColor").color = "#f7eed3";
                    else document.getElementById("maxResPerCentColor").color = "#f7eed3";}}, false); 

	var maxResPerCent = td[7].appendChild(document.createElement("input"));
	maxResPerCent.type="checkbox";
	maxResPerCent.setAttribute("style", "margin-left:2em;");
	maxResPerCent.id = "maxResPerCent";
  	maxResPerCent.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).maxResPerCent;
	maxResPerCent.addEventListener( "change", function(){ 
			if( this.checked ) {
                if( disableMaxRes.checked ) maxPerCent = "#A9A9A9"; else maxPerCent = "#000000";
                maxResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).maxResPerCent;
                if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).disableMaxRes ) 
                maxPerCent = "<font id='maxResPerCentColor' color='#A9A9A9'>%</font>";
			} else { maxPerCent = "#f7eed3";
                maxResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).maxRes};
            document.getElementById("maxRes").value=maxResValue;
            document.getElementById("maxResPerCentColor").color=maxPerCent;
	}, false);
	td[7].appendChild(document.createTextNode(gui[lib.lang].maxResPerCent));

	td[8].setAttribute("style", "vertical-align:top;");
	td[8].innerHTML += gui[lib.lang].distanceFilter;

	td[9].setAttribute("style", "vertical-align:top;");
	td[9].innerHTML += "<input type='text' id='distanceFilter' value='" + lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).distanceFilter 
				+ "'><font color='#f7eed3'>%</font>";

	var distanceCheck = td[9].appendChild(document.createElement("input"));
  	distanceCheck.type="checkbox";
	distanceCheck.setAttribute("style", "margin-left:1em;");
  	distanceCheck.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).distanceFilterCheckbox;
	td[9].appendChild(document.createTextNode(gui[lib.lang].distanceFilterCheckbox));  
	if( !distanceCheck.checked ) tr[7].style.color = "#A9A9A9";
	distanceCheck.addEventListener( "click", function(){if( !this.checked ) tr[7].style.color = "#A9A9A9";
        else tr[7].style.color = "#000000";}, false); 

	td[10].innerHTML += gui[lib.lang].offerBorder;
	td[11].setAttribute("style", "vertical-align:top;");
	td[11].innerHTML += "<input type='text' id='offerBorder' value='" + lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).offerBorder + "'><font color='#f7eed3'>%</font>";

	var disableOfferBorder = td[11].appendChild(document.createElement("input"));
	disableOfferBorder.type="checkbox";
	disableOfferBorder.setAttribute("style", "margin-left:1em;");
  	disableOfferBorder.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).disableOfferBorder;
	td[11].appendChild(document.createTextNode(gui[lib.lang].disableOfferBorder));
	if( disableOfferBorder.checked ) tr[8].style.color = "#A9A9A9";
	disableOfferBorder.addEventListener( "click", function(){if( this.checked ) tr[8].style.color = "#A9A9A9";
        else tr[8].style.color = "#000000";}, false);
        
	td[12].innerHTML += gui[lib.lang].ownOfferBorder;
	td[12].setAttribute("style", "vertical-align:top;");
	td[13].innerHTML += "<input type='text' id='ownOfferBorder' value='" + lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).ownOfferBorder + "'><font color='#f7eed3'>%</font>";

	var disableOwnOfferBorder = td[13].appendChild(document.createElement("input"));
	disableOwnOfferBorder.type="checkbox";
	disableOwnOfferBorder.setAttribute("style", "margin-left:1em;");
  	disableOwnOfferBorder.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).disableOwnOfferBorder;
	td[13].appendChild(document.createTextNode(gui[lib.lang].disableOfferBorder));
	if( disableOwnOfferBorder.checked ) tr[10].style.color = "#A9A9A9";
	disableOwnOfferBorder.addEventListener( "click", function(){if( this.checked ) tr[10].style.color = "#A9A9A9";
        else tr[10].style.color = "#000000";}, false); 

	td[14].setAttribute("style", "vertical-align:top;");
	var save = td[14].appendChild(document.createElement("input"));
	save.type = "button";
	save.value = gui[lib.lang].saveButton;
	save.id = "saveButtonlib.storageBalancer";
	save.addEventListener("click", function(){
		var checkboxes =  lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
		var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
		checkboxes.disablePointsFilter = disablePointsFilter.checked ? true : false; checkboxes.changePointsFilterCheckbox = changePointsFilter.checked ? true : false;
		checkboxes.disableFarmFilter = disableFarmFilter.checked ? true : false; checkboxes.changeFarmFilterCheckbox = changeFarmFilter.checked ? true : false;
		checkboxes.disableMinRes = disableMinRes.checked ? true : false; checkboxes.minResPerCent = minResPerCent.checked ? true : false;
		checkboxes.disableMaxRes = disableMaxRes.checked ? true : false; checkboxes.maxResPerCent = maxResPerCent.checked ? true : false;
		checkboxes.distanceFilterCheckbox = distanceCheck.checked ? true : false; checkboxes.disableOwnOfferBorder = disableOwnOfferBorder.checked ? true : false;
		checkboxes.disableOfferBorder = disableOfferBorder.checked ? true : false;
		lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
		if( minResPerCent.checked )
			filter.minResPerCent = document.getElementById("minRes").value; 
		else filter.minRes = document.getElementById("minRes").value; 
		if( maxResPerCent.checked )
			filter.maxResPerCent = document.getElementById("maxRes").value;
		else filter.maxRes = document.getElementById("maxRes").value;
		filter.pointsFilter = document.getElementById("pointsFilter").value; filter.farmFilter = document.getElementById("farmFilter").value;
		filter.distanceFilter = document.getElementById("distanceFilter").value; filter.offerBorder = document.getElementById("offerBorder").value;
		filter.distanceFilter = document.getElementById("distanceFilter").value; filter.ownOfferBorder = document.getElementById("ownOfferBorder").value;
		lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);
		alert(gui[lib.lang].saveMessage);
	}, false);

	td[14].setAttribute("style", "vertical-align:top;");
	var del = td[14].appendChild(document.createElement("input"));
	del.type = "button";
	del.value = gui[lib.lang].deleteButton;
	del.addEventListener("click", function(){
			if( confirm( gui[lib.lang].confirm_delAll ) ) {
				var vals = lib.storage.listValues();
				for(var i = 0; i < vals.length; i++ )
				lib.storage.deleteValue(vals[i]); alert( gui[lib.lang].allDataDeleted );}}, false);

	if( !lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).allyEnemies )
		 var dot = '/graphic/dots/red.png?1';
	else var dot = '/graphic/dots/green.png?1';

	td[15].innerHTML+="   <img src=" + dot + ">"; 

	var linkContracts = td[15].appendChild(document.createElement("a"));
	linkContracts.innerHTML = gui[lib.lang].readInAllyContracts;
	linkContracts.setAttribute("style", "margin-left:0.5em;");
	linkContracts.href = "javascript:;";
	linkContracts.addEventListener( "click", function(){ 
			var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
			checkboxes.readInContracts=true;
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
			window.location.href= lib.game_data.link_base.replace("screen=","screen=ally&mode=contracts").replace("amp;","");
	}, false);

	tr[0].appendChild(th[0]);
	tr[1].appendChild(th[1]);
	tr[2].appendChild(td[0]);
	tr[2].appendChild(td[1]);
	tr[3].appendChild(td[2]);
	tr[3].appendChild(td[3]);
	tr[4].appendChild(th[2]);
	tr[5].appendChild(td[4]);
	tr[5].appendChild(td[5]);
   	tr[6].appendChild(td[6]);
	tr[6].appendChild(td[7]);
   	tr[7].appendChild(td[8]);
	tr[7].appendChild(td[9]);
	tr[8].appendChild(td[10]);
	tr[8].appendChild(td[11]);
	tr[9].appendChild(th[3]);
	tr[10].appendChild(td[12]);
	tr[10].appendChild(td[13]);
	tr[11].appendChild(td[14]);
	tr[11].appendChild(td[15]);
    
    for( var i=0 ; i<tr.length ; i++ ) {
        document.getElementsByClassName("vis settings")[0].appendChild(tr[i]);
    }
}

/*screen=ally&mode=contracts*/
if( location.href.match(/screen=ally&mode=contracts/) ) {
		if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).readInContracts ) {
			if( document.getElementById("enemies") != null )
				var tr=document.getElementById("enemies").getElementsByTagName("tr");
			else {alert( gui[lib.lang].noTribe ); return; }
			var enemies = "";
			for( var i=1 ; i<tr.length ; i++ ) {
				enemies += tr[i].getElementsByTagName("td")[0].textContent +";";}
			enemies = enemies.substr(0,enemies.length-1);
			var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
			filter.allyEnemies = enemies;
			lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);
			var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
			checkboxes.readInContracts=false;
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);			
			alert(gui[lib.lang].readedAllyContracts);
		}
}

/*screen=market*/
if (location.href.match(/screen=market/)) {

   	/*get time*/
    	var newDate = function() { 
		var now = new Date();
    		var serverDate = document.getElementById("serverDate").innerHTML.split("/");
    		var serverTime = document.getElementById("serverTime").innerHTML.split(":");
    		now.setFullYear( serverDate[2] ); now.setMonth( serverDate[1]-1 );
    		now.setDate( serverDate[0] ); now.setHours( serverTime[0] );
    		now.setMinutes( serverTime[1] ); now.setSeconds( serverTime[2] );
		return now;
	}; var now = new newDate();

	/*suggest new own offer*/
	if( location.href.match(/mode=own_offer/) ) {

        var NewOffer = function() {
        	var wood=new Number(document.getElementById('wood').innerHTML);
        	var clay=new Number(document.getElementById('stone').innerHTML);
       		var iron=new Number(document.getElementById('iron').innerHTML);

		if( lib.storage.getValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"
			+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],"") != "") {
			var value = {villageName: lib.game_data.village.name, villageCoord: lib.game_data.village.coord, wood: wood, clay: clay, iron: iron, storage: 400000};
			value.storage = new Number(document.getElementById('storage').innerHTML);
			lib.storage.setValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"
				+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],value);
		}
		
		var trade = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],"");
		if( trade != "" )  {
			for( var e=0 ; e<trade.wood.length ; e++ ) {
				for( var h=0 ; h<trade.dateOfArrival.length ; h++ ) {
					var dateOfArrival = trade.dateOfArrival[h].split("_"); var boolean = false;
					var dateSplit = dateOfArrival[0].split("-"), timeSplit = dateOfArrival[1].split(":");
					if( parseInt(dateSplit[0],10)<=now.getFullYear() ) {
               					if( parseInt(dateSplit[0],10)<now.getFullYear() ) {boolean=true;}
               					else if( parseInt(dateSplit[1],10)<=now.getMonth()+1 ) {
                    					if( parseInt(dateSplit[1],10)<now.getMonth()+1 ) {boolean=true;}
                    					else if( parseInt(dateSplit[2],10)<=now.getDate() ) {
                        					if( parseInt(dateSplit[2],10)<now.getDate() ) {boolean=true;}
                       						else if( parseInt(timeSplit[0],10)<=now.getHours() ) {
                       							if( parseInt(timeSplit[0],10)<now.getHours() ) {boolean=true;}
                       							else if( parseInt(timeSplit[1],10)<=now.getMinutes() ) {boolean=true;}
                       						}
               						}
               					}
            				}
					if( boolean ) {
						if( lib.storage.getValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"
							+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],"") != "") {
							var value = {villageName: lib.game_data.village.name, villageCoord: lib.game_data.village.coord, wood: wood, clay: clay, iron: iron, storage: 400000};
							value.storage = new Number(document.getElementById('storage').innerHTML);
							lib.storage.setValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"
								+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],value);
						}
						var key = "Trade_player.id"+lib.game_data.player.id+"_"+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1];
						trade.wood.splice(h,1);trade.clay.splice(h,1);trade.iron.splice(h,1);trade.dateOfArrival.splice(h,1);
						if( trade.wood.length ==0 ) lib.storage.deleteValue(key);
						else lib.storage.setValue(key,trade);
						e--;
					} else {wood += parseInt(trade.wood[e],10); clay += parseInt(trade.clay[e],10); iron += parseInt(trade.iron[e],10)};
				}			
			}				
		}

		var forms=document.getElementsByTagName('form');  
		var table="",own_offer="";
		for(i=0;i<forms.length&&table=="";i++)   {    
		 	if(forms[i].action.indexOf('action=modify_offers')!=-1)     
				table=forms[i].getElementsByTagName('table')[0];}   
		
		for(i=1;table!=""&&i<table.rows.length-1;i++)   {     
			child=table.rows[i].getElementsByTagName("td")[2].childNodes;  
			child2=table.rows[i].getElementsByTagName("td")[1].childNodes;
			res=child[0].title;  
			res2=child2[0].title + ";";
			own_offer += res2;
			num="";     

			for(j=0;j<child.length;j++){     
				value=child[j].nodeValue;     
				if(value != null)num+=value;}     
			num=num.substring(0,num.length-1);   
			num*=new Number(table.rows[i].cells[3].innerHTML);    
			if(res==gui[lib.lang].wood) wood+=num;     
			if(res==gui[lib.lang].clay) clay+=num;     
			if(res==gui[lib.lang].iron) iron+=num;   
		}  

		var tables=document.getElementsByClassName('vis'); var marketeers=0;
		var tradertxt = vistables[1].getElementsByTagName("th")[0].textContent;
		var marketeers = parseInt(tradertxt.substring(tradertxt.indexOf(':')+2, tradertxt.indexOf('/')),10);

		var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
		this.conditionMaxWood = wood>=clay&&wood>=iron;
		this.conditionMaxClay = clay>=wood&&clay>=iron;
            this.conditionMaxIron = iron>=wood&&iron>=clay;
            this.conditionMinWood = wood<clay&&wood<iron;
            this.conditionMinClay = clay<wood&&clay<iron;
            this.conditionMinIron = iron<wood&&iron<clay;
            var max, min; this.offers = 0;

            if( !checkboxes.offerWood ) {this.conditionMaxClay = clay>=iron; this.conditionMaxIron = iron>=clay;}
            if( !checkboxes.offerClay ) {this.conditionMaxWood = wood>=iron; this.conditionMaxIron = iron>=wood;}
            if( !checkboxes.offerIron ) {this.conditionMaxWood = wood>=clay; this.conditionMaxClay = clay>=wood;}
            
            if( !checkboxes.requireWood ) {this.conditionMinClay = clay<iron; this.conditionMinIron = iron<clay;}
            if( !checkboxes.requireClay ) {this.conditionMinWood = wood<iron; this.conditionMinIron = iron<wood;}
            if( !checkboxes.requireIron ) {this.conditionMinWood = wood<clay; this.conditionMinClay = clay<wood;}
            
            if( !checkboxes.offerWood && !checkboxes.offerClay ) this.conditionMaxIron=true;
            if( !checkboxes.offerWood && !checkboxes.offerIron ) this.conditionMaxClay=true;
            if( !checkboxes.offerIron && !checkboxes.offerClay ) this.conditionMaxWood=true;
            
            if( !checkboxes.requireWood && !checkboxes.requireClay ) this.conditionMinIron=true;
            if( !checkboxes.requireWood && !checkboxes.requireIron ) this.conditionMinClay=true;
            if( !checkboxes.requireIron && !checkboxes.requireClay ) this.conditionMinWood=true; 

            if(this.conditionMaxWood&&checkboxes.offerWood) max="wood";  
            if(this.conditionMaxClay&&checkboxes.offerClay) max="clay";   
            if(this.conditionMaxIron&&checkboxes.offerIron) max="iron"; 

            if(this.conditionMinWood&&checkboxes.requireWood) min="wood";   
            if(this.conditionMinClay&&checkboxes.requireClay) min="clay";
            if(this.conditionMinIron&&checkboxes.requireIron) min="iron";
            
            wood=Math.round(wood/1000); clay=Math.round(clay/1000); iron=Math.round(iron/1000);   
            balancedOffers=Math.floor(Math.round((wood+clay+iron)/3)); 

            if( max=="wood") { 
                if( min=="clay" ) this.offers = wood-balancedOffers;
                if( min=="iron" ) this.offers=wood-balancedOffers;}  
            if(max=="clay") {     
                if(min=="wood") this.offers=clay-balancedOffers; 
                if(min=="iron") this.offers=clay-balancedOffers;}   
            if( max=="iron" ) {    
                if(min=="wood") this.offers=iron-balancedOffers;
                if(min=="clay") this.offers=iron-balancedOffers;}   
            if( min=="wood" ) { if( wood+this.offers>balancedOffers ) this.offers=balancedOffers-wood;}
            if( min=="clay" ) { if( clay+this.offers>balancedOffers ) this.offers=balancedOffers-clay;}
            if( min=="iron" ) { if( iron+this.offers>balancedOffers ) this.offers=balancedOffers-iron;}
			
            if( marketeers < this.offers ) this.offers = marketeers;

            if( !lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).disableOfferBorder ) {
                var offerBorder = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).ownOfferBorder;
                if( marketeers-offerBorder< this.offers ) {
                    this.offers = marketeers-offerBorder;
                        if( this.offers<0) this.offers=0;
                }
            }

            var resSell = lib.storage.getValue("OwnOfferValue_player.id" + lib.game_data.player.id,defaultOwnOfferValues).resSell;
            if( resSell > 1000 ) {
                var needed = resSell/1000;
                if( Math.round(needed,0)*1000 < resSell ) needed += 1;
                this.offers = Math.ceil(this.offers/needed)-1;
            }

            this.balanced = 0;
            if( this.conditionMaxWood&&checkboxes.offerWood ) this.res_sell = "  <img src='/graphic/"+regExp[lib.lang].wood+".png?1'> "+gui[lib.lang].wood; 
            if( this.conditionMaxClay&&checkboxes.offerClay ) this.res_sell = "  <img src='/graphic/"+regExp[lib.lang].clay+".png?1'> "+gui[lib.lang].clay; 
            if( this.conditionMaxIron&&checkboxes.offerIron ) this.res_sell = "  <img src='/graphic/"+regExp[lib.lang].iron+".png?1'> "+gui[lib.lang].iron; 
            if( this.conditionMinWood&&checkboxes.requireWood ) this.res_buy = "  <img src='/graphic/"+regExp[lib.lang].wood+".png?1'> "+gui[lib.lang].wood; 
            if( this.conditionMinClay&&checkboxes.requireClay ) this.res_buy = "  <img src='/graphic/"+regExp[lib.lang].clay+".png?1'> "+gui[lib.lang].clay; 
            if( this.conditionMinIron&&checkboxes.requireIron ) this.res_buy = " <img src='/graphic/"+regExp[lib.lang].iron+".png?1'> "+gui[lib.lang].iron;

            var resource_offered = ""; own_offer = own_offer.split(";");
            for( var i=0 ; i<own_offer ; i++ ) {
                if( this.res_sell.match( own_offer[i] ) )
                    resource_offered = 1;
            }
            
            if( this.res_sell == this.res_buy ) this.offers = 0;

            if( this.offers <= 0 || resource_offered==1 || this.res_buy == undefined || this.res_sell == undefined ) {
                this.res_buy = "<img id='img_noOffer' src='/graphic/buildings/market.png?'> "+gui[lib.lang].noOffer;
                this.res_sell = "<img id='img_noOffer' src='/graphic/buildings/market.png?'> "+gui[lib.lang].noOffer;
                this.balanced = 1;
            }
            
            if( iron == clay || iron==clay-1 || iron==clay-2 || iron==clay+1 || iron==clay+2 ) {var condition1 = true;}
            else var condition1 = false;
            if( iron == wood || iron==wood-1 || iron==wood-2 || iron==wood+1 || iron== wood+2 ) var condition2 = true;
            else var condition2 = false;
            if( condition1 && condition2 ) {
                this.res_buy = "<img id='img_balanced' src='/graphic/buildings/market.png?'> "+gui[lib.lang].storageBalanced;
                this.res_sell = "<img id='img_balanced' src='/graphic/buildings/market.png?'> "+gui[lib.lang].storageBalanced;
                this.balanced = 1;
            }
            
            this.values = lib.storage.getValue("OwnOfferValue_player.id" + lib.game_data.player.id,defaultOwnOfferValues);
            this.maxTimeText = this.values.maxTime + gui[lib.lang].hours;
            this.inputSell = '<input id="inputSell" name="inputSell" size="5" value="' + this.values.resSell + '" type="text">';
            this.inputBuy = '<input id="inputBuy" name="inputBuy" size="5" value="' + this.values.resBuy + '" type="text">';
            this.inputMaxTime = '<input id="inputMaxTime" name="inputMaxTime" size="5" value="' + this.values.maxTime + '" type="text">';
            
            if( this.balanced == 1 ) {
                this.values.resSell = "";
                this.values.resBuy = "";
                this.offers=0;
            }
        }    

	var guiOwnOffer = function(newOffer) {
		this.tr = document.createElement("tr"); 
		this.tr.style.whiteSpace = "noWrap";      
		var tr1 = new Array(5);
        	for( var i=0 ; i<tr1.length ; i++ ) {
			tr1[i] = document.createElement("tr");}
        	var td = new Array(25);
        	for( var i=0 ; i<td.length ; i++ ) {
			td[i] = document.createElement("td");}
            
        	var point = "<font color='#f7eed3'>.</font>";
		td[0].innerHTML = "<span id='newOffer'><b>"+gui[lib.lang].offer+"</b>";
		td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; 
		td[2].innerHTML = "<i>"+gui[lib.lang].value+"</i>" + newOffer.inputSell;
		td[2].style.textAlign = "right";

		td[3].innerHTML = "<b>"+gui[lib.lang].require+"</b>"
		td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
		td[5].innerHTML = "<i>"+gui[lib.lang].value+"</i>" + newOffer.inputBuy;
		td[5].style.textAlign = "right";

		td[6].innerHTML = "<b>"+gui[lib.lang].maxLengthOfTime+"</b>";
		td[7].innerHTML = point+newOffer.maxTimeText;
		td[8].innerHTML = "<i>"+gui[lib.lang].value+"</i>" + newOffer.inputMaxTime;
		td[8].style.textAlign = "right";
	
		td[9].innerHTML = "<b>"+gui[lib.lang].offerNumber+"</b>";
		td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
		td[11].style.width = "91px";
		td[12].innerHTML = "<b>"+gui[lib.lang].offer+"</b>";
		td[12].style.width = "40px";
		td[12].style.textAlign = "right";
  	      
		var FadingOutWoodOffer = td[14].appendChild(document.createElement("input"));
  		FadingOutWoodOffer.type="checkbox";
  		FadingOutWoodOffer.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).offerWood;
		FadingOutWoodOffer.addEventListener("click", function(){ 
				var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
				if( this.checked ){checkboxes.offerWood=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.offerWood=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);};
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);
	
		var imgWood = document.createElement("img");
		imgWood.src = "/graphic/"+regExp[lib.lang].wood+".png?1";
		var textnode = document.createTextNode("");
		imgWood.appendChild(textnode);
		td[14].appendChild(imgWood);

		var FadingOutClay = td[15].appendChild(document.createElement("input"));
  		FadingOutClay.type="checkbox";
  		FadingOutClay.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).offerClay;
		FadingOutClay.addEventListener("click", function(){ 
				var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
				if( this.checked ){checkboxes.offerClay=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.offerClay=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);};
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);
  	      
		var imgClay = document.createElement("img");
		imgClay.src = "/graphic/"+regExp[lib.lang].clay+".png?1";
		imgClay.appendChild(textnode);
		td[15].appendChild(imgClay);

		var FadingOutIron = td[16].appendChild(document.createElement("input"));
  		FadingOutIron.type="checkbox";
  		FadingOutIron.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).offerIron;
		FadingOutIron.addEventListener("click", function(){ 
				var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
				if( this.checked ){checkboxes.offerIron=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.offerIron=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);};
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);
	
		var imgIron = document.createElement("img");
		imgIron.src = "/graphic/"+regExp[lib.lang].iron+".png?1";
		imgIron.appendChild(textnode);
		td[16].appendChild(imgIron);
	
		var button;				
		button = td[17].appendChild( document.createElement("input") );
		button.type = "button";
		button.id = "dssb_button";
		button.value = gui[lib.lang].okButton;
		if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) {
			button.disabled = true; var container = document.getElementById("menu_row2"); var a = container.getElementsByTagName("a");
                	for( var j = 0; j < a.length; j++ ) { if( a[j].accessKey == "d" )  var href = a[j].href; }
                      	lib.hotkeys.keys.push( { key: 88, href: href } );
		}
  	 	button.addEventListener("click", function(){
			var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
			var newValues = {   resSell: document.getElementById("inputSell").value,
				resBuy: document.getElementById("inputBuy").value,
				maxTime: document.getElementById("inputMaxTime").value,};
			if( newOffer.balanced == 0 )	{	
			lib.storage.setValue("OwnOfferValue_player.id" + lib.game_data.player.id, newValues);
  	              var bow = 1;
  	              for( var i = offers ; i>0 ; i-- ) {
  	                  if( newValues.resSell*i/values.resSell <= offers && bow == 1 ) {
  	                      offers = i;bow = 0;}
  	              }
			/*insert new offer*/
			document.getElementById('res_sell_wood').checked=newOffer.conditionMaxWood&&checkboxes.offerWood;   
			document.getElementById('res_sell_stone').checked=newOffer.conditionMaxClay&&checkboxes.offerClay;   
			document.getElementById('res_sell_iron').checked=newOffer.conditionMaxIron&&checkboxes.offerIron;   
			document.getElementById('res_buy_wood').checked=newOffer.conditionMinWood&&checkboxes.requireWood;   
			document.getElementById('res_buy_stone').checked=newOffer.conditionMinClay&&checkboxes.requireClay;  
			document.getElementById('res_buy_iron').checked=newOffer.conditionMinIron&&checkboxes.requireIron;   
 			document.getElementsByName('multi')[0].value=Math.abs(newOffer.offers);
			document.getElementsByName('max_time')[0].value= newValues.maxTime;
			document.getElementsByName('sell')[0].value= newValues.resSell;  
			document.getElementsByName('buy')[0].value=newValues.resBuy;
			var coords = lib.game_data.village.coord.split("|");
			var sourceVillage = lib.storage.getValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+coords[0]+"_"+coords[1],"");
			if( sourceVillage != "" ) {
				if( document.getElementById('res_sell_wood').checked ) 
					sourceVillage.wood = parseInt(sourceVillage.wood,10)-(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resSell,10));
				if( document.getElementById('res_sell_stone').checked ) 
					sourceVillage.clay = parseInt(sourceVillage.clay,10)-(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resSell,10));
				if( document.getElementById('res_sell_iron').checked ) 
					sourceVillage.iron = parseInt(sourceVillage.iron,10)-(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resSell,10));
				if( document.getElementById('res_buy_wood').checked ) 
					sourceVillage.wood = parseInt(sourceVillage.wood,10)+(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resBuy,10)/2);
				if( document.getElementById('res_buy_stone').checked ) 
					sourceVillage.clay = parseInt(sourceVillage.clay,10)+(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resBuy,10)/2);
				if( document.getElementById('res_buy_iron').checked ) 
					sourceVillage.iron = parseInt(sourceVillage.iron,10)+(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resBuy,10)/2);
				lib.storage.setValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+coords[0]+"_"+coords[1],sourceVillage);			
			}
  	          	document.getElementById("submit").click();
  	      }}, false);
  	      
		td[19].style.width = "91px";
		td[20].innerHTML = "<b>"+gui[lib.lang].require+"</b>";
		td[20].style.width = "40px";
		td[20].style.textAlign = "right";
  	      
		var FadingOutWoodRequire = td[22].appendChild(document.createElement("input"));
  		FadingOutWoodRequire.type="checkbox";
  		FadingOutWoodRequire.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).requireWood;
		FadingOutWoodRequire.addEventListener("click", function(){ 
				var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
				if( this.checked ){checkboxes.requireWood=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.requireWood=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);};
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);
        
		imgWood = document.createElement("img");
		imgWood.src = "/graphic/holz.png?1";
		textnode = document.createTextNode("");
		imgWood.appendChild(textnode);
		td[22].appendChild(imgWood);
        
		var FadingOutClayRequire = td[23].appendChild(document.createElement("input"));
  		FadingOutClayRequire.type="checkbox";
  		FadingOutClayRequire.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).requireClay;
		FadingOutClayRequire.addEventListener("click", function(){ 
				var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
				if( this.checked ){checkboxes.requireClay=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.requireClay=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);};
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);
        
		var imgClay = document.createElement("img");
		imgClay.src = "/graphic/lehm.png?1";
		imgClay.appendChild(textnode);
		td[23].appendChild(imgClay);
        
		var FadingOutIronRequire = td[24].appendChild(document.createElement("input"));
		FadingOutIronRequire.type="checkbox";
		FadingOutIronRequire.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).requireIron;
		FadingOutIronRequire.addEventListener("click", function(){ 
				var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
				if( this.checked ){checkboxes.requireIron=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.requireIron=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);

		var imgIron = document.createElement("img");
		imgIron.src = "/graphic/eisen.png?1";
		imgIron.appendChild(textnode);
		td[24].appendChild(imgIron);
      
		tr1[0].appendChild(td[0]);
	        tr1[0].appendChild(td[1]);
	        tr1[0].appendChild(td[2]);
	        tr1[1].appendChild(td[3]);
	        tr1[1].appendChild(td[4]);
	        tr1[1].appendChild(td[5]);
	        tr1[2].appendChild(td[6]);
	        tr1[2].appendChild(td[7]);
	        tr1[2].appendChild(td[8]);
	        tr1[3].appendChild(td[9]);
	        tr1[3].appendChild(td[10]);
	        td[10].appendChild(td[11]);
	        td[10].appendChild(td[12]);
	        tr1[3].appendChild(td[10]);
	        tr1[4].appendChild(td[17]);	
        	tr1[4].appendChild(td[18]);
	        td[18].appendChild(td[19]);
	        td[18].appendChild(td[20]);
	        tr1[3].appendChild(td[13]);
	        td[13].appendChild(td[14]);
	        td[13].appendChild(td[15]);
	        td[13].appendChild(td[16]);
	        tr1[4].appendChild(td[21]);
        	td[21].appendChild(td[22]);
        	td[21].appendChild(td[23]);
        	td[21].appendChild(td[24]);
        	table.appendChild(this.tr);
        	this.tr.style.backgroundColor = '#f7eed3'; 
        	this.tr.appendChild(tr1[0]);
			this.tr.appendChild(tr1[1]);
        	this.tr.appendChild(tr1[2]);
        	this.tr.appendChild(tr1[3]);
        	this.tr.appendChild(tr1[4]);
	}   
	
	var inputs = document.getElementsByTagName("form")[0].getElementsByTagName("input");
	var input = inputs[inputs.length-1];   
	input.value = gui[lib.lang].submitButton;
	input.id = "submit";
	input.addEventListener("click",function() {
			var coords = lib.game_data.village.coord.split("|");
			var sourceVillage = lib.storage.getValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+coords[0]+"_"+coords[1],"");
			if( sourceVillage != "" ) {
				var offers = parseInt(document.getElementsByName('multi')[0].value,10);
				if( document.getElementById('res_sell_wood').checked ) 
					sourceVillage.wood = parseInt(sourceVillage.wood,10)-(offers*parseInt(document.getElementsByName('sell')[0].value,10));
				if( document.getElementById('res_sell_stone').checked ) 
					sourceVillage.clay = parseInt(sourceVillage.clay,10)-(offers*parseInt(document.getElementsByName('sell')[0].value,10));
				if( document.getElementById('res_sell_iron').checked ) 
					sourceVillage.iron = parseInt(sourceVillage.iron,10)-(offers*parseInt(document.getElementsByName('sell')[0].value,10));
				if( document.getElementById('res_buy_wood').checked ) 
					sourceVillage.wood = parseInt(sourceVillage.wood,10)+(offers*parseInt(document.getElementsByName('buy')[0].value,10)/2);
				if( document.getElementById('res_buy_stone').checked ) 
					sourceVillage.clay = parseInt(sourceVillage.clay,10)+(offers*parseInt(document.getElementsByName('buy')[0].value,10)/2);
				if( document.getElementById('res_buy_iron').checked ) 
					sourceVillage.iron = parseInt(sourceVillage.iron,10)+(offers*parseInt(document.getElementsByName('buy')[0].value,10)/2);
				lib.storage.setValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+coords[0]+"_"+coords[1],sourceVillage);			
			}
	}, false);

        var th = document.createElement("th");
		th.style.width="386.2px";
		th.innerHTML = "<u>"+gui[lib.lang].dsStorageOffer+"</u>";
        var vistables = lib.xPath('//table[contains(@class, "vis")]');
        var table = document.createElement("table");
        table.setAttribute("class", "vis");
		table.id = "DSStorageBalancerPreview";
        table.style.width = "386.2px";
        table.appendChild(th);
        vistables[2].parentNode.insertBefore(table, vistables[2].nextSibling);

	var img = th.appendChild(document.createElement("img"));
	img.src = "/graphic/sorthandle.png?1";
	img.setAttribute("style", "margin-left:1em;");
	img.style.cursor = "pointer";
	img.addEventListener("click",function() {
		var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
		var preview = document.getElementById("DSStorageBalancerPreview");
		if( checkboxes.fadeOutOwnOfferTable ) {
        		var newOffer = new NewOffer();
			var ownGUI = new guiOwnOffer(newOffer);
			document.getElementById("DSStorageBalancerPreview").appendChild(ownGUI.tr);
			checkboxes.fadeOutOwnOfferTable = false; lib.hotkeys.keys.push( { key: 88, event: { id: "dssb_button", event: "click" } } );
		} else {
			var tabletr = preview.getElementsByTagName("tr")[0]; preview.removeChild(tabletr);
			checkboxes.fadeOutOwnOfferTable=true; 
			for( var i=0 ; i<lib.hotkeys.keys.length ; i++) {
				if( lib.hotkeys.keys[i].key == 88 ) lib.hotkeys.keys.splice(i,1);}
				var container = document.getElementById("menu_row2"); var a = container.getElementsByTagName("a");
                		for( var j = 0; j < a.length; j++ ) { if( a[j].accessKey == "d" )  var href = a[j].href; }
                      		lib.hotkeys.keys.push( { key: 88, href: href } );
		}
		lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
	},false);


	if( !lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).fadeOutOwnOfferTable ) {
        var newOffer = new NewOffer();
		var ownGUI = new guiOwnOffer(newOffer); 
		lib.hotkeys.keys.push( { key: 88, event: { id: "dssb_button", event: "click" } } );
	} else {
		var container = document.getElementById("menu_row2"); var a = container.getElementsByTagName("a");
		for( var j = 0; j < a.length; j++ ) { if( a[j].accessKey == "d" )  var href = a[j].href; }
		lib.hotkeys.keys.push( { key: 88, href: href } );
	}

        
        if( document.getElementById("img_noOffer") || document.getElementById("img_balanced") ) {
            var container = document.getElementById("menu_row2"); var a = container.getElementsByTagName("a");
            for( var j = 0; j < a.length; j++ ) {
                if( a[j].accessKey == "d" ) var href = a[j].href;}	
            lib.hotkeys.keys.push( { key: 88, href: href } );} 
        lib.hotkeys.keys.push( { key: 13, event: { id: "submit", event: "click" } } );

	}

	/*mode=send*/
	if( location.href.match(/screen=market/) && !document.getElementById("inputx") && !location.href.match(/mode=other_offer/) && !location.href.match(/mode=own_offer/) ) {
        	var inputs = document.getElementsByTagName("input");
        	var submit = "";
       		for( var i=0 ; i<inputs.length ; i++ ) {
            		if( inputs[i].type == "submit" ) submit = inputs[i];}
        	submit.value=gui[lib.lang].submitButton;
        	submit.addEventListener("click",function() {
			var table = document.getElementsByClassName("vis")[0];
			var destinationPlayer = table.getElementsByTagName("td")[3].textContent;
			if( lib.game_data.player.name == destinationPlayer ) {
				var destinationName = table.getElementsByTagName("td")[1].textContent.split("(");
				destinationName = destinationName[destinationName.length-1].split(")")[0].toString().replace("|","_");
				var tradesDefault = {wood: [], clay: [], iron: [], dateOfArrival:[]};
				var tradeValues = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradesDefault);
				var arrayLength = tradeValues.wood.length+1;
				var resName = table.getElementsByTagName("td")[5].getElementsByTagName("img");
				var resValue = table.getElementsByTagName("td")[5].textContent.split(" ");
				for( var r=0 ; r<resName.length ; r++ ) {
					if( resName[r].getAttribute("title") == gui[lib.lang].wood )
						tradeValues.wood.push( parseInt(resValue[r].replace(".",""),10 ) );
					if( resName[r].getAttribute("title") == gui[lib.lang].clay )
						tradeValues.clay.push( parseInt(resValue[r].replace(".",""),10 ) );
					if( resName[r].getAttribute("title") == gui[lib.lang].iron ) 
						tradeValues.iron.push( parseInt(resValue[r].replace(".",""),10 ) );
                    		}
				if( tradeValues.wood.length < arrayLength ) tradeValues.wood.push( 0 );
				if( tradeValues.clay.length < arrayLength ) tradeValues.clay.push( 0 );
				if( tradeValues.iron.length < arrayLength ) tradeValues.iron.push( 0 );
				var time = new Date();
				var serverDate = document.getElementById("serverDate").innerHTML.split("/");
				var serverTime = document.getElementById("serverTime").innerHTML.split(":");
                		time.setFullYear( serverDate[2] ); time.setMonth( serverDate[1]-1 );
               			time.setDate( serverDate[0] ); time.setHours( serverTime[0] );
               			time.setMinutes( serverTime[1] ); time.setSeconds( serverTime[2] );
               			var lengthOfTime = table.getElementsByTagName("td")[9].textContent.split(":");
				var timeMs = (parseInt(lengthOfTime[2]) + lengthOfTime[1]*60 + lengthOfTime[0]*3600)*1000;
               			time = new Date(time.getTime()+timeMs);
               			var year = time.getFullYear(), month = (time.getMonth()+1).toString(), date = time.getDate().toString();
               			var hours = time.getHours().toString(), minutes = time.getMinutes().toString();
               			if( month.length == 1 ) month = "0"+month; if( date.length == 1 ) date = "0"+date;
               			if( hours.length == 1 ) hours = "0"+hours; if( minutes.length == 1 ) minutes = "0"+minutes;
               			tradeValues.dateOfArrival.push(year+"-"+month+"-"+date+"_"+hours+":"+minutes);
				lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradeValues);
			}
			var coords = lib.game_data.village.coord.split("|");
			var updateDestination=lib.storage.getValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+coords[0]+"_"+coords[1],"");
			if( updateDestination != "" ) {
				var resName = table.getElementsByTagName("td")[5].getElementsByTagName("img");
				var resValue = table.getElementsByTagName("td")[5].textContent.split(" ");
				for( var r=0 ; r<resName.length ; r++ ) {
					if( resName[r].getAttribute("title") == gui[lib.lang].wood )
						updateDestination.wood -= parseInt(resValue[r].replace(".","") );
					if( resName[r].getAttribute("title") == gui[lib.lang].clay )
						updateDestination.clay -= parseInt(resValue[r].replace(".","") );
					if( resName[r].getAttribute("title") == gui[lib.lang].iron ) 
						updateDestination.iron -= parseInt(resValue[r].replace(".","") );
                    		}
				lib.storage.setValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+coords[0]+"_"+coords[1],updateDestination);
			}
   		}, false);
        submit.id="submits";
        lib.hotkeys.keys.push( { key: 13, event: { id: "submits", event: "click" } } );
        lib.hotkeys.keys.push( { key: 88, event: { id: "submits", event: "click" } } );
    }

    /*screen=market: last village link */
    if( location.href.match(/screen=market/) && document.getElementById("inputx") ) {
        var inputs = document.getElementsByTagName("form")[0].getElementsByTagName("input");
        inputs[inputs.length-1].value = gui[lib.lang].submitButton;
        inputs[inputs.length-1].removeAttribute("style");
        inputs[inputs.length-1].id = "submit";
        inputs[inputs.length-1].addEventListener("click",function() {
                        var values = {  wood: inputs[0].value, clay: inputs[1].value, iron: inputs[2].value,
                                        x: inputs[inputs.length-4].value, y: inputs[inputs.length-3].value,};
                        lib.storage.setValue("LastMarketInput_player.id"+lib.game_data.player.id,values);},false);
        lib.hotkeys.keys.push( { key: 13, event: { id: "submit", event: "click" } } );
        var a = document.createElement("a");
        a.setAttribute("href","javascript:;"); a.setAttribute("id","DSStorageBalancer_lastActionLink");
        a.appendChild(document.createTextNode(gui[lib.lang].last));
        a.addEventListener("click",function() {
                        var defaultValues = {wood: 0, clay: 0, iron: 0, x: "0", y: "0",};
                        var values = lib.storage.getValue("LastMarketInput_player.id"+lib.game_data.player.id,defaultValues);
                        if( inputs[inputs.length-4].value != values.x && inputs[inputs.length-3].value != values.y ) {inputs[inputs.length-4].value = values.x; inputs[inputs.length-3].value = values.y;}
                        else {var inputsA = document.getElementsByTagName("form")[0].getElementsByTagName("a");
                            if( parseInt(inputsA[0].textContent.replace(/[()]/g,""),10) < values.wood ) 
                                    inputs[0].value = inputsA[0].textContent.replace(/[()]/g,"");
                            else inputs[0].value = values.wood; 
                            if( parseInt(inputsA[1].textContent.replace(/[()]/g,""),10) < values.clay ) 
                                    inputs[1].value = inputsA[1].textContent.replace(/[()]/g,"");
                            else inputs[1].value = values.clay; 
                            if( parseInt(inputsA[2].textContent.replace(/[()]/g,""),10) < values.iron ) 
                                    inputs[2].value = inputsA[2].textContent.replace(/[()]/g,"");
                            else inputs[2].value = values.iron;}
        },false);
        lib.hotkeys.keys.push( { key: 90, event: { id: "DSStorageBalancer_lastActionLink", event: "click" } } );

	inputs[4].parentNode.parentNode.style.whiteSpace = "noWrap";
        var node = inputs[4].parentNode.parentNode.getElementsByTagName("td")[1];
        for( var i=0 ; i<node.childNodes.length-2 ; i++ ) {
            if( node.childNodes[i].nodeName == "BR" )
                inputs[4].parentNode.parentNode.getElementsByTagName("td")[1].removeChild(node.childNodes[i]);}
        var hrefs = inputs[4].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("a");
        var tr = new Array(2); var td = new Array(4);
        for( var i=0 ;i<tr.length ; i++ ) {
            tr[i] = document.createElement("tr");
            inputs[4].parentNode.parentNode.getElementsByTagName("td")[1].appendChild(tr[i]);}
        for( var i=0 ;i<td.length ; i++ ) {
            td[i] = document.createElement("td");
            tr[Math.floor(i/tr.length)].appendChild(td[i]);
            if( i<td.length-1 ) td[i].appendChild(hrefs[0]);
            else td[i].appendChild(a);
        }
    }
	/*screen=market: send resources*/
	if( location.href.match(/screen=market/) && document.getElementById("inputx") && document.getElementById("quickbar_inner") ) {
		var vistables = lib.xPath('//table[contains(@class, "vis")]');
       		var th = document.createElement("th");
		th.colSpan="2";
        	var tr = new Array(6);
       		for( var i=0 ; i<tr.length ; i++ ) {
            		tr[i] = document.createElement("tr");
			tr[i].style.whiteSpace = "noWrap";
		}
        	var td = new Array(26);
       		for( var i=0 ; i<td.length ; i++ ) {
            		td[i] = document.createElement("td");
		}
		var offerList=[];

		var newList = function() {
    			var vals = lib.storage.listValues();
                var sourceWood=new Number(document.getElementById('wood').innerHTML);
                var sourceClay=new Number(document.getElementById('stone').innerHTML);
                var sourceIron=new Number(document.getElementById('iron').innerHTML);

			if( lib.storage.getValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"
				+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],"") != "") {
				var value = {villageName: lib.game_data.village.name, villageCoord: lib.game_data.village.coord, wood: sourceWood, 
						clay: sourceClay, iron: sourceIron, storage: 400000};
				value.storage = new Number(document.getElementById('storage').innerHTML);
				lib.storage.setValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"
					+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],value);
			}

			var destinationVillages = [], trades = [], tradesVillages=[];	
			for( var i=0 ;i<vals.length ; i++ ) {
				if( vals[i].match("DestinationVillage_player.id"+lib.game_data.player.id) ) {
					tradesVillages.push(vals[i]);
					var village = lib.storage.getValue(vals[i],"");
					/* if trade == destinationVillage */
					var trade = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+village.villageCoord.split("|")[0]+"_"+village.villageCoord.split("|")[1],"");
					if( trade != "" ) {
						for( var e=0 ; e<trade.wood.length ; e++ ) {
							village.wood += parseInt(trade.wood[e],10); village.clay += parseInt(trade.clay[e],10); village.iron += parseInt(trade.iron[e],10);}
					}
					/* if destination == source */
					if( village.villageCoord.split("|")[0] == lib.game_data.village.coord.split("|")[0]  && village.villageCoord.split("|")[1] == lib.game_data.village.coord.split("|")[1] ) 							continue;
					destinationVillages.push(village);
				}
				else if( vals[i].match("Trade_player.id"+lib.game_data.player.id) ) trades.push(vals[i]);
			}
			/* if trade == source */
			trade = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],"");
			if( trade != "" )  {
				for( var e=0 ; e<trade.wood.length ; e++ ) {
					sourceWood += parseInt(trade.wood[e],10); sourceClay += parseInt(trade.clay[e],10); sourceIron += parseInt(trade.iron[e],10);}				
			}

			/* updates trades */
			for( var i=0 ; i<trades.length ; i++ ) {
				var values = lib.storage.getValue(trades[i],""); if( values == "" ) break;
				for( var h=0 ; h<values.dateOfArrival.length ; h++ ) {
					var dateOfArrival = values.dateOfArrival[h].split("_"); var boolean = false;
					var dateSplit = dateOfArrival[0].split("-"), timeSplit = dateOfArrival[1].split(":");
					if( parseInt(dateSplit[0],10)<=now.getFullYear() ) {
               					if( parseInt(dateSplit[0],10)<now.getFullYear() ) {boolean=true;}
               					else if( parseInt(dateSplit[1],10)<=now.getMonth()+1 ) {
                    					if( parseInt(dateSplit[1],10)<now.getMonth()+1 ) {boolean=true;}
                    					else if( parseInt(dateSplit[2],10)<=now.getDate() ) {
                        					if( parseInt(dateSplit[2],10)<now.getDate() ) {boolean=true;}
                       						else if( parseInt(timeSplit[0],10)<=now.getHours() ) {
                       							if( parseInt(timeSplit[0],10)<now.getHours() ) {boolean=true;}
                       							else if( parseInt(timeSplit[1],10)<=now.getMinutes() ) {boolean=true;}
                       						}
               						}
               					}
            				}
					if( boolean ) {
						var trade=trades[i].split("_"), destination = tradesVillages.length >0 ? tradesVillages[0].split("_") : "";
						for( var e=0 ; e< tradesVillages.length ; e++ ) {
							var destination = tradesVillages[e].split("_");
							if( trade[trade.length-2] == destination[destination.length-2] && trade[trade.length-1] == destination[destination.length-1] ) {
								var tradeValues = values, destinationValues = lib.storage.getValue( tradesVillages[e],"");
								if( destinationValues != "" ) {	
									destinationValues.wood += tradeValues.wood[h]; destinationValues.clay += tradeValues.clay[h]; 
									destinationValues.iron += tradeValues.iron[h]; lib.storage.setValue( tradesVillages[e], destinationValues );
								}
							}
						}
						values.wood.splice(h,1);values.clay.splice(h,1);values.iron.splice(h,1);values.dateOfArrival.splice(h,1);
						if( values.wood.length ==0 ) lib.storage.deleteValue(trades[i]);
						else lib.storage.setValue(trades[i],values);
						h--;
					}
				}
			}

			if( destinationVillages.length > 0 ) {	
				var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);	
				var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
				var tradertxt = vistables[1].getElementsByTagName("th")[0].textContent;
				var trader = parseInt(tradertxt.substring(tradertxt.indexOf(':')+2, tradertxt.indexOf('/')),10);

				/* offer border */
				if( !checkboxes.disableOfferBorder )
					trader -= parseInt(filter.offerBorder,10);					

				if( trader > 0 ) {
					/* minRes border */
 					if( !checkboxes.disableMinRes ) {
						if( checkboxes.minResPerCent ) {
							var stor = parseInt(document.getElementById("storage").textContent,10);
							var minRes = parseInt(filter.minResPerCent,10)/100*stor;}
						else var minRes = parseInt(filter.minRes,10);
						if (parseInt(minRes) > 0) {
							sourceWood = (sourceWood > minRes) ? (sourceWood-minRes) : 0;
							sourceClay = (sourceClay > minRes) ? (sourceClay-minRes) : 0;
							sourceIron = (sourceIron > minRes) ? (sourceIron-minRes) : 0;
						}
					}

					/* generate offer res */
					var loopWood = sourceWood, loopClay = sourceClay, loopIron = sourceIron;
					var wood = 0, clay = 0, iron = 0, high = 0;
					while ( clay+wood+iron < (trader*1000) ) {
						high=0;
						if (loopWood >= loopClay && loopWood >= loopIron &&loopWood>0) {
							wood+=1000;loopWood -= 1000;high=1;}
						if( clay+wood+iron >= (trader*1000) ) break;
						if (loopClay >= loopWood && loopClay >= loopIron &&loopClay>0) {
							clay+=1000;loopClay -= 1000;high=1;}
						if( clay+wood+iron >= (trader*1000) ) break;
						if (loopIron >= loopWood && loopIron >= loopClay &&loopIron>0) {
							iron+=1000;loopIron -= 1000;high=1;}
						if ( high==0 ) {clay+=333;wood+=333;iron+=333;}
					}
					if (wood>sourceWood) wood=sourceWood;
					if (clay>sourceClay) clay=sourceClay;
					if (iron>sourceIron) iron=sourceIron;
					while ( clay+wood+iron > trader*1000 ) {
						if (wood>=clay && wood>=iron) wood-=1000; 
						else if (clay>=wood&& clay>=iron) clay-=1000;
						else iron-=1000;
					}

					this.offerList = [];
					var sourceCoords = lib.game_data.village.coord.split("|");
					for( var i=0 ; i<destinationVillages.length ; i++ ) {
						if( wood+clay+iron < 3000 ) continue;
						var destinationVillage = {villageName: destinationVillages[i].villageName, villageCoord: destinationVillages[i].villageCoord, 
							villageWood: destinationVillages[i].wood, villageClay: destinationVillages[i].clay, villageIron: destinationVillages[i].iron,
							wood: wood, clay: clay, iron: iron, storage: destinationVillages[i].storage};

						/* check distance */
						if( checkboxes.distanceFilterCheckbox ) {
							var maxDistance = parseInt( filter.distanceFilter , 10 );
							var coords = destinationVillages[i].villageCoord.split("|");
							var distance = Math.sqrt( Math.pow(parseInt(sourceCoords[0],10)-parseInt(coords[0],10),2)
										+Math.pow(parseInt(sourceCoords[1],10)-parseInt(coords[1],10),2) );
							if( maxDistance < distance ) continue;
						}

						/* maxStorage */
						if( !checkboxes.disableMaxRes) {
							var villageStorage = parseInt(destinationVillages[i].storage,10);
							if( checkboxes.maxResPerCent )
								var maxStorage = Math.floor(villageStorage*(parseInt(filter.maxResPerCent,10)/100));
							else var maxStorage = parseInt(filter.maxRes,10) <= villageStorage ? parseInt(filter.maxRes,10) : villageStorage;
						} else var maxStorage = Math.floor(parseInt(destinationVillages[i].storage,10)*0.95);
						if( parseInt(destinationVillages[i].wood,10) + wood > maxStorage ) 
						destinationVillage.wood = (maxStorage-parseInt(destinationVillages[i].wood,10)) >= 0 ? Math.floor(maxStorage-parseInt(destinationVillages[i].wood,10)) : 0;
						if( parseInt(destinationVillages[i].clay,10) + clay > maxStorage ) 
							destinationVillage.clay = (maxStorage-parseInt(destinationVillages[i].clay,10)) >= 0 ? Math.floor(maxStorage-parseInt(destinationVillages[i].clay,10)) : 0;
						if( parseInt(destinationVillages[i].iron,10) + iron > maxStorage ) 
							destinationVillage.iron = (maxStorage-parseInt(destinationVillages[i].iron,10)) >= 0 ? Math.floor(maxStorage-parseInt(destinationVillages[i].iron,10)) : 0;
						if( destinationVillage.wood+destinationVillage.clay+destinationVillage.iron < 5000 ) continue;

						if( destinationVillage.wood > new Number(document.getElementById('wood').innerHTML) ) continue;
						if( destinationVillage.clay > new Number(document.getElementById('stone').innerHTML) ) continue;
						if( destinationVillage.iron > new Number(document.getElementById('iron').innerHTML) ) continue;

						/* calculate efficiency, create offerListArray */
						var w = parseInt(destinationVillage.villageWood,10), c = parseInt(destinationVillage.villageClay,10), ir=parseInt(destinationVillage.villageIron,10);
                        //var vsum = w+c+ir; var sum = destinationVillages[i].wood+destinationVillages[i].clay+destinationVillages[i].iron;
                        var vmax = Math.max(w,c,ir);
                        var w1 = w+destinationVillage.wood, c1= c+destinationVillage.clay, ir1= ir+destinationVillage.iron;
                        var vmax1 = Math.max(w1,c1,ir1);
                        if( vmax1 > vmax ) {
                            vmax1 = vmax;
                            if( w1 > vmax ) w1 = vmax; 
                            if( c1 > vmax ) c1 = vmax;
                            if( ir1 > vmax ) ir1 = vmax;  
                        }
                        var value1 = ( (w/(3*vmax)) + (c/(3*vmax)) + (ir/(3*vmax))  )*10;
                        var value2 = ( (w1/(3*vmax1)) + (c1/(3*vmax1)) + (ir1/(3*vmax1))  )*10;
                        if( Math.round((value2-value1)) <= 0 ) value = 0;
                        else value = Math.round((value2-value1)*10);
                        if( value <= 0 ) continue;
						/*var value = (((destinationVillages[i].wood/sum)*((destinationVillages[i].wood/sum*100)-(w/vsum*100)))
								+((destinationVillages[i].clay/sum)*((destinationVillages[i].clay/sum*100)-(c/vsum*100)))
								+((destinationVillages[i].iron/sum)*((destinationVillages[i].iron/sum*100)-(ir/vsum*100))));
						if( vsum == 0 ) continue;*/
						destinationVillage.efficiency = value;
							this.offerList.push( [value, destinationVillage] );
						this.offerList.sort(function(a,b) {return b[0]-a[0]});
						if( this.offerList.length > 10 ) this.offerList.pop();
					}
					for( var i=0 ; i<this.offerList.length ; i++ )
						this.offerList[i]=this.offerList[i][1];
					if( this.offerList.length == 0) this.offerList.push({wood: "-", clay: "-", iron: "-", villageName: gui[lib.lang].noOffer, villageWood: "", 
						villageClay: "", villageIron: "", storage: "", villageCoord: lib.game_data.village.coord, efficiency:0,});
				} else {this.offerList = [];
					this.offerList.push({wood: "-", clay: "-", iron: "-", villageName: gui[lib.lang].notEnoughMarketeers, villageWood: "", villageClay: "", villageIron: "", storage: "", 
						villageCoord: lib.game_data.village.coord, efficiency:0,});var sourceCoords = lib.game_data.village.coord.split("|");}
			} else {this.offerList = [];
				this.offerList.push({wood: "-", clay: "-", iron: "-", villageName: gui[lib.lang].noOffer, villageWood: "", villageClay: "", villageIron: "", storage: "", 
					villageCoord: lib.game_data.village.coord, efficiency:0,});var sourceCoords = lib.game_data.village.coord.split("|");}	

			var serverConfig = lib.storage.getValue("ServerCfg","");
			for( var i=0 ; i<this.offerList.length ; i++ ) {		
				/* calculate distance */
				var coords = this.offerList[i].villageCoord.split("|");
				this.offerList[i].distance = Math.sqrt( Math.pow(parseInt(sourceCoords[0],10)-parseInt(coords[0],10),2)
					+Math.pow(parseInt(sourceCoords[1],10)-parseInt(coords[1],10),2) );

				/*calculate time*/
				var distanceSec = ( parseInt( 360/( parseFloat(serverConfig.speed) * parseFloat(serverConfig.unit_speed) ),10 ) ) * parseInt(this.offerList[i].distance,10);
				var distH = 0; var distMin = 0;

				while( distanceSec/3600 >= 1 ) {distanceSec-=3600; distH += 1;}
				while( distanceSec/60 >= 1 ) {distanceSec-=60; distMin += 1;}
				distanceSec = Math.round(distanceSec);
				if( distanceSec == 60 ) {distanceSec -=60; distMin += 1;}
				if( distMin == 60 ) {distMin -=60; distH += 1;}
				distMin += ""; distanceSec += "";
				if( distMin.length == 1 ) distMin = "0" + distMin;
				if( distanceSec.length == 1 ) distanceSec = "0" + distanceSec;
				this.offerList[i].runtime = distH + ":" + distMin + ":" + distanceSec + "h";
			}

			offerList=this.offerList;
			var offerGui = function(num,td) {
				td[2].innerHTML = "<img src='/graphic/holz.png?1'> " + offerList[num].wood; td[2].width = "80";
				td[3].innerHTML = "<img src='/graphic/lehm.png?1'> " + offerList[num].clay; td[3].width = "80";
				td[4].innerHTML = "<img src='/graphic/eisen.png?1'> " + offerList[num].iron; td[4].width = "184"; 
				td[7].innerHTML = "<b>"+offerList[num].villageName+"</b>"; td[7].width="240";
				td[10].innerHTML = "(<img src='/graphic/holz.png?1'>"+offerList[num].villageWood
					+" <img src='/graphic/lehm.png?1'>"+offerList[num].villageClay;
				td[10].innerHTML +=" <img src='/graphic/eisen.png?1'>" + offerList[num].villageIron+", "+" <img src='graphic/buildings/storage.png?1'>";
				td[10].innerHTML+= offerList[num].storage+")";
				if( offerList[num].wood == "-" ) td[10].innerHTML = "-";  td[10].width = "356";
				var area = offerList[num].distance != 1 ? gui[lib.lang].fields : gui[lib.lang].field;
				td[13].innerHTML = Math.round(offerList[num].distance*10)/10 + " " + area; td[13].width="165";
				td[15].innerHTML = offerList[num].runtime; td[15].width = "100"; td[16].width = "464";
			}
			td[25].innerHTML = "";
			var a = td[25].appendChild(document.createElement("a"));
			a.href = "javascript:;"; 
			a.innerHTML = gui[lib.lang].otherOffer;
			a.id= "otherOffer";
			lib.hotkeys.keys.push( { key: 86, event: { id: "otherOffer", event: "click" } } );
			a.addEventListener("click",function() {
				isSorted = [0,0,0,0,0,0,0,0];
				var popup = document.getElementById("inline_popup");
    				popup.style.width="600px";
				popup.whiteSpace = "noWrap";
				var close = document.getElementById("inline_popup_menu").getElementsByTagName("a")[0];
				close.id="closepopup";
				close.addEventListener("click", function() {
					document.getElementById("inline_popup").style.display="none";
				}, false);
				lib.hotkeys.keys.push( { key: 27, event: { id: "closepopup", event: "click" } } );
				var content = document.getElementById("inline_popup_main");
				content = document.getElementById("inline_popup_content");
				content.style.width="100%";
				content.innerHTML = "";
				popup.style.display = "block";
				popup.style.left = Math.round(Math.max(0,self.pageXOffset + (self.innerWidth-popup.offsetWidth)/2)) +"px";
				popup.style.top = Math.round(Math.max(0,self.pageYOffset + (self.innerHeight-popup.offsetHeight)/2)) + "px";
				var tab = content.appendChild( document.createElement("table") );	
				tab.className = "vis";
    				tab.style.width = "100%";
				var row = tab.insertRow(0);
				var cell = row.appendChild(document.createElement("th"));
				cell.colSpan="2";
				cell = row.appendChild(document.createElement("th"));
				cell.colSpan="3";
				cell.innerHTML = gui[lib.lang].available; cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				cell.colSpan="3";
				cell.innerHTML = gui[lib.lang].sendRes; cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				cell.colSpan="3";
				var row = tab.insertRow(1);
    				cell = row.appendChild(document.createElement("th"));
				cell.innerHTML = gui[lib.lang].coords;
				cell.colSpan=2;
				cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				var a = cell.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.innerHTML = '<img src="/graphic/holz.png" alt="'+gui[lib.lang].wood+'" title="'+gui[lib.lang].wood+'"/>';
				a.addEventListener("click", function(e) {
					var trPopup = popup.getElementsByTagName("tr"); var sorted=[];
					for( var i=2 ; i<trPopup.length ; i++ ) {
						var value = trPopup[i].getElementsByTagName("td")[2].textContent;
						sorted.push( [value, trPopup[i] ] );
					}
					if( isSorted[0]== 0 ) {
						sorted.sort(function(a,b) {return b[0]-a[0]}); isSorted[0]=1}
					else {sorted.sort(function(a,b) {return a[0]-b[0]}); isSorted[0]=0}
					for( var i=0 ; i< sorted.length ; i++ )
						tab.appendChild(sorted[i][1]);
				}, false );
				cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				a = cell.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.innerHTML = '<img src="/graphic/lehm.png" alt="'+gui[lib.lang].clay+'" title="'+gui[lib.lang].clay+'"/>';
				a.addEventListener("click", function(e) {
					var trPopup = popup.getElementsByTagName("tr"); var sorted=[];
					for( var i=2 ; i<trPopup.length ; i++ ) {
						var value = trPopup[i].getElementsByTagName("td")[3].textContent;
						sorted.push( [value, trPopup[i] ] );
					}
					if( isSorted[0]== 0 ) {
						sorted.sort(function(a,b) {return b[0]-a[0]}); isSorted[0]=1}
					else {sorted.sort(function(a,b) {return a[0]-b[0]}); isSorted[0]=0}
					for( var i=0 ; i< sorted.length ; i++ )
						tab.appendChild(sorted[i][1]);
				}, false );
				cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				a = cell.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.innerHTML = '<img src="/graphic/eisen.png" alt="'+gui[lib.lang].iron+'" title="'+gui[lib.lang].iron+'"/>';
				a.addEventListener("click", function(e) {
					var trPopup = popup.getElementsByTagName("tr"); var sorted=[];
					for( var i=2 ; i<trPopup.length ; i++ ) {
						var value = trPopup[i].getElementsByTagName("td")[4].textContent;
						sorted.push( [value, trPopup[i] ] );
					}
					if( isSorted[0]== 0 ) {
						sorted.sort(function(a,b) {return b[0]-a[0]}); isSorted[0]=1}
					else {sorted.sort(function(a,b) {return a[0]-b[0]}); isSorted[0]=0}
					for( var i=0 ; i< sorted.length ; i++ )
						tab.appendChild(sorted[i][1]);
				}, false );
				cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				var a = cell.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.innerHTML = '<img src="/graphic/holz.png" alt="'+gui[lib.lang].wood+'" title="'+gui[lib.lang].wood+'"/>';
				a.addEventListener("click", function(e) {
					var trPopup = popup.getElementsByTagName("tr"); var sorted=[];
					for( var i=2 ; i<trPopup.length ; i++ ) {
						var value = trPopup[i].getElementsByTagName("td")[5].textContent;
						if( value == "-" ) value = 0;
						sorted.push( [value, trPopup[i] ] );
					}
					if( isSorted[0]== 0 ) {
						sorted.sort(function(a,b) {return b[0]-a[0]}); isSorted[0]=1}
					else {sorted.sort(function(a,b) {return a[0]-b[0]}); isSorted[0]=0}
					for( var i=0 ; i< sorted.length ; i++ )
						tab.appendChild(sorted[i][1]);
				}, false );
				cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				a = cell.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.innerHTML = '<img src="/graphic/lehm.png" alt="'+gui[lib.lang].clay+'" title="'+gui[lib.lang].clay+'"/>';
				a.addEventListener("click", function(e) {
					var trPopup = popup.getElementsByTagName("tr"); var sorted=[];
					for( var i=2 ; i<trPopup.length ; i++ ) {
						var value = trPopup[i].getElementsByTagName("td")[6].textContent;
						if( value == "-" ) value = 0;
						sorted.push( [value, trPopup[i] ] );
					}
					if( isSorted[0]== 0 ) {
						sorted.sort(function(a,b) {return b[0]-a[0]}); isSorted[0]=1}
					else {sorted.sort(function(a,b) {return a[0]-b[0]}); isSorted[0]=0}
					for( var i=0 ; i< sorted.length ; i++ )
						tab.appendChild(sorted[i][1]);
				}, false );
				cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				a = cell.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.innerHTML = '<img src="/graphic/eisen.png" alt="'+gui[lib.lang].iron+'" title="'+gui[lib.lang].iron+'"/>';
				a.addEventListener("click", function(e) {
					var trPopup = popup.getElementsByTagName("tr"); var sorted=[];
					for( var i=2 ; i<trPopup.length ; i++ ) {
						var value = trPopup[i].getElementsByTagName("td")[7].textContent;
						if( value == "-" ) value = 0;
						sorted.push( [value, trPopup[i] ] );
					}
					if( isSorted[0]== 0 ) {
						sorted.sort(function(a,b) {return b[0]-a[0]}); isSorted[0]=1}
					else {sorted.sort(function(a,b) {return a[0]-b[0]}); isSorted[0]=0}
					for( var i=0 ; i< sorted.length ; i++ )
						tab.appendChild(sorted[i][1]);
				}, false );
				cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				a = cell.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.innerHTML = gui[lib.lang].distanceShort;
				a.addEventListener("click", function(e) {
					var trPopup = popup.getElementsByTagName("tr"); var sorted=[];
					for( var i=2 ; i<trPopup.length ; i++ ) {
						var value = trPopup[i].getElementsByTagName("td")[8].textContent;
						if( value == "-" ) value = 0;
						sorted.push( [value, trPopup[i] ] );
					}
					if( isSorted[0]== 0 ) {
						sorted.sort(function(a,b) {return b[0]-a[0]}); isSorted[0]=1}
					else {sorted.sort(function(a,b) {return a[0]-b[0]}); isSorted[0]=0}
					for( var i=0 ; i< sorted.length ; i++ )
						tab.appendChild(sorted[i][1]);
				}, false );
				cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				a = cell.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.innerHTML = gui[lib.lang].eq;
				a.addEventListener("click", function(e) { 
					var trPopup = popup.getElementsByTagName("tr"); var sorted=[];
					for( var i=2 ; i<trPopup.length ; i++ ) {
						var value = trPopup[i].getElementsByTagName("td")[9].textContent;
						sorted.push( [value, trPopup[i] ] );
					}
					if( isSorted[7]== 0 ) {
						sorted.sort(function(a,b) {return a[0]-b[0]}); isSorted[7]=1}
					else {sorted.sort(function(a,b) {return b[0]-a[0]}); isSorted[7]=0}
					for( var i=0 ; i< sorted.length ; i++ )
						tab.appendChild(sorted[i][1]);
				}, false );
				cell.style.textAlign = "center";
				for( var i=0 ; i<offerList.length ; i++ ) {
					if( offerList[i].wood == "-" ) break;
					var row = tab.appendChild( document.createElement("tr") );
					var tdPopup = new Array(10);
        				for( var e=0 ; e<tdPopup.length ; e++ ) {
						tdPopup[e] = row.appendChild( document.createElement("td") );}
					tdPopup[0].innerHTML = (i+1)+".";
					var a = tdPopup[1].appendChild( document.createElement("a") );
					a.href= "javascript:;";
					a.innerHTML = offerList[i].villageCoord;
					a.addEventListener("click",function() {		
						var num = parseInt( this.parentNode.parentNode.getElementsByTagName("td")[0].textContent.replace(".",""), 10 )-1;
						var FillIn = new offerGui(num,td);
						var okButton = new button(list,num);
						popup.style.display="none";
					}, false);
					tdPopup[2].innerHTML = offerList[i].villageWood;
					tdPopup[3].innerHTML = offerList[i].villageClay;
					tdPopup[4].innerHTML = offerList[i].villageIron;
					tdPopup[5].innerHTML = offerList[i].wood == 0 ? "-" : offerList[i].wood;
					tdPopup[6].innerHTML = offerList[i].clay == 0 ? "-" : offerList[i].clay;
					tdPopup[7].innerHTML = offerList[i].iron == 0 ? "-" : offerList[i].iron;
					tdPopup[8].innerHTML = Math.floor(offerList[i].distance);
					tdPopup[9].innerHTML = Math.floor(offerList[i].efficiency);		
				}
			},false);

			var firstFillIn = new offerGui(0,td);
			td[1].innerHTML = "<b>"+gui[lib.lang].send+"</b>"; td[1].width = "100";
			td[6].innerHTML = "<b>"+gui[lib.lang].sendTo+"</b>"; td[6].width = "100";
			td[9].innerHTML = "<b>"+gui[lib.lang].availableIn+"</b>"; td[9].width = "100";
			td[12].innerHTML = "<b>"+gui[lib.lang].distance+"</b>"; td[12].width = "100";
			td[14].innerHTML = "<b>"+gui[lib.lang].runtime+"</b>"; td[14].width = "80";
			td[18].innerHTML = "<b>"+gui[lib.lang].groups+"</b>";
			var lastReadIn = lib.storage.getValue("LastReadIn_player.id"+lib.game_data.player.id,"");
			if( navigator.appName == "Opera" ) {
				if( lastReadIn != "" ) var date = new Date(lastReadIn.time).toGMTString().split(" ");
			} else if( lastReadIn != "" ) {var date = new Date(lastReadIn.time).toLocaleString().split(" ");}
			var groups = lastReadIn != "" ? lastReadIn.group.split(";") : "";
			if( groups.length > 3 ) groups[Math.floor(groups.length/2)]+="<br/>"; var group="";
			for( var i=0 ; i<groups.length-1 ; i++)  {group += groups[i].match(/<br/) ? groups[i] : groups[i]+", "}; group+= groups[groups.length-1];
			td[19].innerHTML = lastReadIn != "" ? group  : "-";
			td[21].innerHTML = "<b>"+gui[lib.lang].lastReadIn+"</b>";
			td[22].innerHTML = lastReadIn != "" ? date[0]+" "+date[1]+" "+date[2]+" "+date[3]+"<br/>"+date[4]  : (gui[lib.lang].noReadIn[0]
				+"<br/>"+gui[lib.lang].noReadIn[1]);
			td[23].innerHTML = "<b>"+gui[lib.lang].villagePool+"</b>";
			var destVillagePool = destinationVillages.length;
			if( lib.storage.getValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"
				+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],"") != "") destVillagePool++;
			td[24].innerHTML = destVillagePool == 1 ? destVillagePool+ " "+gui[lib.lang].village : destVillagePool+" "+gui[lib.lang].villages;

			table.style.backgroundColor = '#f7eed3'; 
			table.whiteSpace = "noWrap";

			tr[1].appendChild(td[0]);
			td[0].appendChild(td[1]);
			td[0].appendChild(td[2]);
			td[0].appendChild(td[3]);
			td[0].appendChild(td[4]);
			td[0].appendChild(td[25]);
			tr[2].appendChild(td[5]);
			td[5].appendChild(td[6]);
			td[5].appendChild(td[7]);
			tr[3].appendChild(td[8]);
			td[8].appendChild(td[9]);
			td[8].appendChild(td[10]);
			td[8].appendChild(td[23]);
			td[8].appendChild(td[24]);
			tr[4].appendChild(td[11]);
			td[11].appendChild(td[12]);
			td[11].appendChild(td[13]);
			td[11].appendChild(td[14]);
			td[11].appendChild(td[15]);
			td[11].appendChild(td[18]);
			td[11].appendChild(td[19]);
			tr[5].appendChild(td[20]);
			td[20].appendChild(td[16]);
			td[20].appendChild(td[21]);
			td[20].appendChild(td[22]);
			table.appendChild(tr[1]);
			table.appendChild(tr[2]);
			table.appendChild(tr[3]);
			table.appendChild(tr[4]);
			table.appendChild(tr[5]);
		};
		
		var button = function(target,num) {
			if( !lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).fadeOutTable ) {
				td[16].innerHTML = "";
				this.button = td[16].appendChild( document.createElement("input") );
				this.button.type = "button";
				this.button.value = gui[lib.lang].okButton;
				this.button.id = "dssb_button";
				if( target.offerList[0].wood == "-" ) {
					this.button.disabled = true;
					var container = document.getElementById("menu_row2"); var a = container.getElementsByTagName("a");
					for( var i=0 ; i<lib.hotkeys.keys.length ; i++) {
						if( lib.hotkeys.keys[i].key == 88 ) lib.hotkeys.keys.splice(i,1);}
                			for( var j = 0; j < a.length; j++ ) { if( a[j].accessKey == "d" )  var href = a[j].href; }
                      			lib.hotkeys.keys.push( { key: 88, href: href } );
				}
				else {this.button.disabled = false;
				lib.hotkeys.keys.push( { key: 88, event: { id: "dssb_button", event: "click" } } );}
				this.button.addEventListener("click", function(){
					var x = 0;
                    if (/Version[\/\s](\d+\.\d+)/.test(navigator.userAgent) && navigator.appName == "Opera" ){
                        var oprversion=new Number(RegExp.$1);
                        if (oprversion<=10) var x = 1;
                    }
					document.getElementsByName('wood')[x].value = Math.floor(target.offerList[num].wood);
					document.getElementsByName('stone')[x].value = Math.floor(target.offerList[num].clay);
					document.getElementsByName('iron')[x].value = Math.floor(target.offerList[num].iron);
					document.getElementById('inputx').value =target.offerList[num].villageCoord.split("|")[0];
					document.getElementById('inputy').value = target.offerList[num].villageCoord.split("|")[1];
					var values = {  wood: Math.floor(target.offerList[num].wood), clay: Math.floor(target.offerList[num].clay), iron: Math.floor(target.offerList[num].iron),
							x: target.offerList[num].villageCoord.split("|")[0], y: target.offerList[num].villageCoord.split("|")[1],};
					lib.storage.setValue("LastMarketInput_player.id"+lib.game_data.player.id,values);
					document.getElementById("submit").click();
                		}, false);
			}
		}

		td[17].colSpan="2";
		table = document.createElement("table");
		table.id = "DSStorageBalancerPreview";
		if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).fadeOutTable ) 
			table.style.display = "none";
		else table.style.display = "block";
		th.innerHTML = "<u>"+gui[lib.lang].storageBalancerOffer+"</u>";

		var img = th.appendChild(document.createElement("img"));
		img.src = "/graphic/sorthandle.png?1";
		img.setAttribute("style", "margin-left:1em;");
		img.style.cursor = "pointer";
		img.addEventListener("click",function() {
			var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
			var preview = document.getElementById("DSStorageBalancerPreview");
			if( preview.style.display=="none" ) {
				if( document.getElementById("dssb_button") != null ) document.getElementById("dssb_button").disabled=false;
				checkboxes.fadeOutTable = false;
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
				table.style.display="block"; 
				var list = new newList();
				var okButton = new button(list,0);
			} else {preview.style.display = "none"; checkboxes.fadeOutTable=true;
				if( document.getElementById("dssb_button") != null ) document.getElementById("dssb_button").disabled=true;
				var container = document.getElementById("menu_row2"); var a = container.getElementsByTagName("a");
				for( var i=0 ; i<lib.hotkeys.keys.length ; i++) {
					if( lib.hotkeys.keys[i].key == 88 ) lib.hotkeys.keys.splice(i,1);}
                		for( var j = 0; j < a.length; j++ ) { if( a[j].accessKey == "d" )  var href = a[j].href; }
                      		lib.hotkeys.keys.push( { key: 88, href: href } );
			}
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
		},false);

		vistables[3].appendChild(th);
		vistables[3].appendChild(tr[0]);
		tr[0].appendChild(td[17]);
		td[17].appendChild(table);

		if( !lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).fadeOutTable ) {
			var list = new newList();
			var okButton = new button(list,0);
			//lib.hotkeys.keys.push( { key: 88, event: { id: "dssb_button", event: "click" } } );
		} else {
                	var container = document.getElementById("menu_row2"); var a = container.getElementsByTagName("a");
                	for( var j = 0; j < a.length; j++ ) {
                    		if( a[j].accessKey == "d" )  var href = a[j].href;}
                       lib.hotkeys.keys.push( { key: 88, href: href } );
		} 

		if( document.getElementsByTagName("h3").length > 1 ) {
			var vis = document.getElementsByClassName("vis");
			var vistr = vis[vis.length-1].getElementsByTagName("tr");
			for( var i=1 ; i<vistr.length ; i++ ) {
				var tdTable = vistr[i].getElementsByTagName("td");
				if( tdTable[tdTable.length-1].textContent == regExp[lib.lang].cancel ) {
					tdTable[tdTable.length-1].addEventListener("click",function() {
						var thistd = this.parentNode.getElementsByTagName("td");
						var coords = thistd[0].getElementsByTagName("a")[0].textContent.split("(");
						coords = coords[coords.length-1].split(")")[0].split("|");
						var trades = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+coords[0]+"_"+coords[1],"");
						if( trades != "" ) {
							var time = new newDate();
							var arrival = thistd[4].textContent;
							arrival=arrival.split(regExp[lib.lang].arrivalAt);
							if( arrival[0].match(regExp[lib.lang].today) || arrival[0].match(regExp[lib.lang].tomorrow) ) {
								if( arrival[0].match(regExp[lib.lang].tomorrow) ) time.setTime(time.getTime() + (1000*60*60*24));
								var year = time.getFullYear(), month = (time.getMonth()+1).toString(), date = time.getDate().toString();
								if( month.length == 1 ) month = "0"+month;
                   						if( date.length == 1 ) date = "0"+date;
								var hoursMinutes = arrival[1].split(regExp[lib.lang].clock)[0].replace(/\s/g,"");
								var dateOfArrival = year+"-"+month+"-"+date+"_"+hoursMinutes; 
							} else {
								var year = time.getFullYear(), actualMonth = time.getMonth()+1;
                    						var hoursMinutes = arrival[1].split(regExp[lib.lang].clock)[0].replace(/\s/g,"");
                    						var month = parseInt(arrival[0].split(".")[1],10);
                   						if( actualMonth < month ) year += 1;
								if( month.toString().length == 1 ) month = "0"+month;
								var date = arrival[0].split(".")[0].replace(/[a-zA-Z]/g,"").replace(/\s/g,"");
								var dateOfArrival = year+"-"+month+"-"+date+"_"+hoursMinutes; 
							}
							var boolean = false; var num = "";
							for( var i=0 ; i<trades.dateOfArrival.length ; i++ ) {
								if( trades.dateOfArrival[i].match(dateOfArrival) ) {
									boolean=true; num=i; break;}
							}
							if( !boolean ) {
								var tradeValues = {wood: 0, clay: 0, iron:0 };
								var resName = thistd[1].getElementsByTagName("img");
								var resValue = thistd[1].textContent.split(" ");
								for( var r=0 ; r<resName.length ; r++ ) {
									if( resName[r].getAttribute("title") == gui[lib.lang].wood )
										tradeValues.wood = parseInt(resValue[r].replace(".","") );
									 if( resName[r].getAttribute("title") == gui[lib.lang].clay )
										tradeValues.clay = parseInt(resValue[r].replace(".","") );
									if( resName[r].getAttribute("title") == gui[lib.lang].iron ) 
										tradeValues.iron = parseInt(resValue[r].replace(".","") );
									if( tradeValues.wood.length == 0 ) tradeValues.wood.push( 0 );
									if( tradeValues.clay.length == 0 ) tradeValues.clay.push( 0 );
									if( tradeValues.iron.length == 0 ) tradeValues.iron.push( 0 );
								}
								for( var i=0 ; i<trades.wood.length; i++ ) {
									if( tradeValues.wood == trades.wood[i] && tradeValues.clay == trades.clay[i] && tradeValues.iron == trades.iron[i] ) {
										num=i; break;}
								}
							}
							if( num != "" ) {
								trades.wood.splice(num,1);trades.clay.splice(num,1);trades.iron.splice(num,1);trades.dateOfArrival.splice(num,1);
								if( trades.wood.length == 0 ) lib.storage.deleteValue("Trade_player.id"+lib.game_data.player.id+"_"+coords[0]+"_"+coords[1]);
								else lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+coords[0]+"_"+coords[1],trades);
							}
						}
					},false);
				}
			}
		
		}}
	}

		/*mode=other_offer*/
		if( location.href.match(/mode=other_offer/) ) {
            		if( document.getElementById("quickbar_inner") ) {
			var tabs = document.getElementById("content_value").getElementsByClassName("vis");
			var trader = tabs[1].rows[0].cells[0].innerHTML.match(/: (\d+)\/\d+/)[1];		
            		var newElement = document.createElement('tr');
			tabs[2].rows[2].parentNode.insertBefore(newElement, tabs[2].rows[2].nextSibling);
			newElement.innerHTML = '<td colspan="4">'+gui[lib.lang].fadeOutEnemies+'</td>';
			var td=document.createElement("td");
			var fadeOutEnemies = td.appendChild(document.createElement("input"));
  			fadeOutEnemies.type="checkbox";
  			fadeOutEnemies.checked = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).fadeOutEnemies;
			fadeOutEnemies.addEventListener("click", function(){ 
				var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
				if( this.checked ){checkboxes.fadeOutEnemies=true;			
						lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);window.location.reload();}
				else {checkboxes.fadeOutEnemies=false;			
						lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);window.location.reload();}
			}, false);
			newElement.appendChild(td);
			var inputs = tabs[2].getElementsByTagName("input");
			for (var h=0 ; h<inputs.length ; h++ ) {
				if( inputs[h].type== "submit" ) inputs[h].parentNode.rowSpan=5;}
            
			var tab = tabs[tabs.length-1];
			var res = { holz: "wood", lehm: "stone", eisen: "iron" }
			if (trader >= 0 && tab) {
                		var boolean=false;
				for( var i = 1; i < tab.rows.length; i++ ) {
                    			if( lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings).fadeOutEnemies ) {
                       				var offerer = tab.rows[i].cells[2].textContent;
                        			var allyEnemies = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).allyEnemies.replace(/\*/g,"").split(";")
                        			for( var e=0 ; e< allyEnemies.length ; e++ ) {
                           				if( offerer.match(allyEnemies[e]) && allyEnemies[e]!="" ) {
                                				tab.rows[i].parentNode.removeChild(tab.rows[i]);
                                				boolean=true; break;}
                        			} if( boolean ) {i--; boolean=false; continue;}
                    			}
					var offers = parseInt(tab.rows[i].cells[5].innerHTML.split(" ")[0],10);
					var toSend = parseInt(tab.rows[i].cells[1].innerHTML.replace(/<[^>]+>/g, "").replace(/\./g,""),10);
					var available = document.getElementById(res[tab.rows[i].cells[1].innerHTML.match(/graphic\/([^\.]+)\.png/)[1]]).innerHTML;
					var maxTraders = Math.min(trader,Math.ceil(Math.min( offers * toSend, available ) / 1000));
					if( maxTraders * 1000 > available )
	        				maxTraders--;
					var maxOffers = Math.min(offers,Math.floor(maxTraders*1000/toSend));	
					if( maxOffers >= 0 ) {
						var cell = tab.rows[i].insertCell(-1);
						var input = cell.appendChild(document.createElement("input"));
						input.type = "hidden";
						input.value = maxOffers;
						var input = cell.appendChild(document.createElement("input"));
						input.type = "button";
						input.id = "maxOffer_"+i;
						input.style.width = "7em";
						input.value = gui[lib.lang].maxButton+" ("+ maxOffers + ")";
						input.addEventListener("click", function(e) {
								var row = this.parentNode.parentNode;
								var max = parseInt(this.parentNode.firstChild.value,10);
								var tradesDefault = {wood: [], clay: [], iron: [], dateOfArrival:[]};
								var destinationName=lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1];
								var tradeValues = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradesDefault);
								var arrayLength = tradeValues.wood.length+1;
								var offer = this.parentNode.parentNode.getElementsByTagName("td")[0];
								var resNameOffer = offer.getElementsByTagName("img")[0];
								var resValueOffer = offer.textContent;
								if( resNameOffer.getAttribute("title") == gui[lib.lang].wood )
									tradeValues.wood.push( parseInt(resValueOffer.replace(".",""),10 )*max );
								if( resNameOffer.getAttribute("title") == gui[lib.lang].clay )
									tradeValues.clay.push( parseInt(resValueOffer.replace(".",""),10 )*max );
								if( resNameOffer.getAttribute("title") == gui[lib.lang].iron ) 
									tradeValues.iron.push( parseInt(resValueOffer.replace(".",""),10 )*max );
								if( tradeValues.wood.length < arrayLength ) tradeValues.wood.push( 0 );
								if( tradeValues.clay.length < arrayLength ) tradeValues.clay.push( 0 );
								if( tradeValues.iron.length < arrayLength ) tradeValues.iron.push( 0 );

								var runtime = this.parentNode.parentNode.getElementsByTagName("td")[3].textContent.split(":");
								var ms = parseInt(runtime[0],10)*3600000; ms += parseInt(runtime[1],10)*60000;
								ms+= parseInt(runtime[2],10)*1000; ms += parseInt(now.getTime() ); now.setTime(ms);
								var year = now.getFullYear(), month = (now.getMonth()+1).toString(), date = now.getDate().toString();
               							var hours = now.getHours().toString(), minutes = now.getMinutes().toString();
               							if( month.length == 1 ) month = "0"+month; if( date.length == 1 ) date = "0"+date;
               							if( hours.length == 1 ) hours = "0"+hours; if( minutes.length == 1 ) minutes = "0"+minutes;
               							tradeValues.dateOfArrival.push(year+"-"+month+"-"+date+"_"+hours+":"+minutes);
								lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradeValues);
								var updateSource =  lib.storage.getValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+destinationName,"");
								if( updateSource != "" ) {
									var srch = this.parentNode.parentNode.getElementsByTagName("td")[1];
									var resName = srch.getElementsByTagName("img")[0];
									var resValue = srch.textContent;
									if( resName.getAttribute("title") == gui[lib.lang].wood )
										updateSource.wood = parseInt(updateSource.wood,10) - parseInt(resValue.replace(".",""),10 )*max;
									if( resName.getAttribute("title") == gui[lib.lang].clay )
										updateSource.clay = parseInt(updateSource.clay,10) - parseInt(resValue.replace(".",""),10 )*max;
									if( resName.getAttribute("title") == gui[lib.lang].iron ) 
										updateSource.iron = parseInt(updateSource.iron,10) - parseInt(resValue.replace(".",""),10 )*max;
									lib.storage.setValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+destinationName,updateSource);
								}
								var form = row.cells[6].getElementsByTagName("form")[0];
								form.getElementsByTagName("input")[0].value = max;
								form.submit();
						}, false );
						var inputs = input.parentNode.parentNode.getElementsByTagName("input");
						for( var h=0 ; h<inputs.length ; h++ ) {
							if( inputs[h].type == "submit" ) {
								var submitButton = inputs[h];
								submitButton.addEventListener("click",function() {
									var max = inputs[0].value;
									var tradesDefault = {wood: [], clay: [], iron: [], dateOfArrival:[]};
									var destinationName=lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1];
									var tradeValues = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradesDefault);
									var arrayLength = tradeValues.wood.length+1;
									var offer = this.parentNode.parentNode.parentNode.getElementsByTagName("td")[0];
									var resNameOffer = offer.getElementsByTagName("img")[0];
									var resValueOffer = offer.textContent;
									if( resNameOffer.getAttribute("title") == gui[lib.lang].wood )
										tradeValues.wood.push( parseInt(resValueOffer.replace(".",""),10 )*max );
									if( resNameOffer.getAttribute("title") == gui[lib.lang].clay )
										tradeValues.clay.push( parseInt(resValueOffer.replace(".",""),10 )*max );
									if( resNameOffer.getAttribute("title") == gui[lib.lang].iron ) 
										tradeValues.iron.push( parseInt(resValueOffer.replace(".",""),10 )*max );
									if( tradeValues.wood.length < arrayLength ) tradeValues.wood.push( 0 );
									if( tradeValues.clay.length < arrayLength ) tradeValues.clay.push( 0 );
									if( tradeValues.iron.length < arrayLength ) tradeValues.iron.push( 0 );

									var runtime = this.parentNode.parentNode.parentNode.getElementsByTagName("td")[3].textContent.split(":");
									var ms = parseInt(runtime[0],10)*3600000; ms += parseInt(runtime[1],10)*60000;
									ms+= parseInt(runtime[2],10)*1000; ms += parseInt(now.getTime() ); now.setTime(ms);
									var year = now.getFullYear(), month = (now.getMonth()+1).toString(), date = now.getDate().toString();
               								var hours = now.getHours().toString(), minutes = now.getMinutes().toString();
               								if( month.length == 1 ) month = "0"+month; if( date.length == 1 ) date = "0"+date;
               								if( hours.length == 1 ) hours = "0"+hours; if( minutes.length == 1 ) minutes = "0"+minutes;
               								tradeValues.dateOfArrival.push(year+"-"+month+"-"+date+"_"+hours+":"+minutes);
									lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradeValues);
									var updateSource =  lib.storage.getValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+destinationName,"");
									if( updateSource != "" ) {
										var srch = this.parentNode.parentNode.parentNode.getElementsByTagName("td")[1];
										var resName = srch.getElementsByTagName("img")[0];
										var resValue = srch.textContent;
										if( resName.getAttribute("title") == gui[lib.lang].wood )
											updateSource.wood = parseInt(updateSource.wood,10) - parseInt(resValue.replace(".",""),10 )*max;
										if( resName.getAttribute("title") == gui[lib.lang].clay )
											updateSource.clay = parseInt(updateSource.clay,10) - parseInt(resValue.replace(".",""),10 )*max;
										if( resName.getAttribute("title") == gui[lib.lang].iron ) 
											updateSource.iron = parseInt(updateSource.iron,10) - parseInt(resValue.replace(".",""),10 )*max;
										lib.storage.setValue("DestinationVillage_player.id"+lib.game_data.player.id+"_"+destinationName,updateSource);
									}
								},false);
							}
						}
                    				if( trader == 0 || maxOffers == 0) input.disabled = true;
                   				if( 48+i <= 57 ) lib.hotkeys.keys.push( { key: 48+i, event: { id: input.id, event: "click" } } );
                   				else lib.hotkeys.keys.push( { key: 48, event: { id: input.id, event: "click" } } );
                   				if( 96+i <= 105 ) lib.hotkeys.keys.push( { key: 96+i, event: { id: input.id, event: "click" } } );
                    				else lib.hotkeys.keys.push( { key: 96, event: { id: input.id, event: "click" } } );
                    			}
				}
			}
        }
}


function Knish3rDSLib(prefix) {
    //Hypix's storage-class; thanks for providing!
    this.StorageHandler = function(prefix,forceGM){
        var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
        var win = gm ? unsafeWindow : window;
        var ls = false;
        var intGetValue;
        var intSetValue;
        var prefix = prefix;
        try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
        if( !ls && !gm )
            throw("Keine geeignete Speichermöglichkeit gefunden");
            if( forceGM && gm || !ls) {
                if( gm ) {
                    prefix = prefix + "_" + document.location.host.split('.')[0];
                    intSetValue = function(key,value) {
                        GM_setValue(prefix+"_"+key,value);
                    };
                    intGetValue = function(key,defaultValue) {
                        return GM_getValue(prefix+"_" + key, defaultValue);
                    }     
                    this.deleteValue = function(key) {
                        GM_deleteValue(prefix+"_"+key);
                    }
                    this.listValues = function(re) {
                    var allkeys = GM_listValues();
                    var serverKeys = [];
                    var rePrefix = new RegExp("^"+prefix+"_(.*)$");
                    if( typeof(re) != "undefined" )
                    var reKey = new RegExp(re);
                    for( var i = 0; i < allkeys.length; i++ ) {
                        var res = allkeys[i].match(rePrefix);
                        if( res ) {
                            if( reKey ) {
                                res = res[1].match(reKey);
                                if( res ) serverKeys.push(res);
                            } else serverKeys.push(res[1]);
                        }
                    } return serverKeys;
                }
            }
        } else if( ls ) {
            intSetValue = function(key,value) {
                localStorage.setItem(prefix+"_"+key, value );};    
            intGetValue = function(key,defaultValue) {
                var value = localStorage.getItem(prefix+"_"+key);
                if( value ) return value;
                else return defaultValue;
            };
            this.deleteValue = function(key) {
                localStorage.removeItem(prefix+"_"+key);}
            this.listValues = function() {
                var keys = []; var key;
	        try{
         		 for(var i = 0 ; ; i++) {
           			 key = window.localStorage.key(i);
            			if(!key){ break; }
               			if( typeof(re) != "undefined") {
                    			var reKey = new RegExp(re);
					if( key.match(prefix) && key.match(reKey) )
            					keys.push(key);
				} else if( key.match(prefix) ) {
					key=key.replace(prefix+"_","");
            				keys.push(key);}}
        	} catch(e) {}
		return keys;
            }
        }
        this.clear = function(re) {
            var keys = this.listValues(re);
            for( var i = 0; i < keys.length; i++ )
                this.deleteValue(keys[i]);
        }
        this.setValue = function(key,value) {
            switch( typeof(value) ) {
                case "object":
                case "function": intSetValue(key,"j"+JSON.stringify(value)); break;
                case "number": intSetValue(key,"n"+value); break;
                case "boolean": intSetValue(key,"b" + (value ? 1 : 0)); break;
                case "string": intSetValue(key,"s" + value ); break;
                case "undefined": intSetValue(key,"u"); break;
            }
        }  
        this.getValue = function(key,defaultValue){
            var str = intGetValue(key);
            if( typeof(str) != "undefined" ) {
                switch( str[0] ) {
                    case "j": return JSON.parse(str.substring(1));
                    case "n": return parseFloat(str.substring(1));
                    case "b": return str[1] == "1";
                    case "s": return str.substring(1);
                    default: this.deleteValue(key);
                }
            } return defaultValue;
        }
        this.getString = function(key) {
            return intGetValue(key);}
        this.setString = function(key,value){
            intSetValue(key,value);}
    }
    var self = this;
    this.hotkeys = {
	keys: [],
        doIt: function() {
            window.addEventListener("keyup", this.keyUpHandler, false );},
        keyUpHandler : function(e) {
            if( e.target.nodeName.toUpperCase() == "INPUT" && (e.target.value != "PASSWORD" || e.target.type == "text" ) )
                return;
            if( e.target.nodeName.toUpperCase() != "TEXTAREA" ) {
                for( var i = 0; i < self.hotkeys.keys.length; i++ ) {
                    if( self.hotkeys.keys[i].key == e.keyCode ) {
                        if( self.hotkeys.keys[i].href ) {
                            location.href = self.hotkeys.keys[i].href; break;}
                        if( self.hotkeys.keys[i].event ) {
                            self.fireEvent( document.getElementById(self.hotkeys.keys[i].event.id), self.hotkeys.keys[i].event.event ); break;}
                    }
                }
            }
        },
    }
    this.xPath = function(path, context) {
        if(!context) var context = document;	
        var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var nodes = [];
        for(var x = 0; x < XPath.snapshotLength; x++)
            nodes.push(XPath.snapshotItem(x));
        return nodes;
    }
    this.getGameData = function() {
        var game_data;
        if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox")>-1)
            game_data = unsafeWindow.game_data;
        if(!game_data) {
            var script = document.createElement("script");
            script.type = "application/javascript";
            script.textContent = 	"var input=document.createElement('input');" +
                                    "input.type='hidden';" +
                                    "input.value=JSON.stringify(game_data);"  +
                                    "input.id='game_data';" +
                                    "document.body.appendChild(input);";
            document.body.appendChild(script);
            var input = document.getElementById("game_data");
            if( input ) eval("game_data=" + input.value + ";");
            document.body.removeChild(script);
        }
        if( game_data ) game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
        return game_data;
    }
    this.fireEvent = function(node,evt) {
        if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "CHECKBOX" )
            node.checked = !node.checked;
        if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "SUBMIT" ) {
            node.focus(); node.click();}
        else{ var evObj = document.createEvent('HTMLEvents');
        evObj.initEvent( evt, true, true );
        node.dispatchEvent(evObj);}
    }
    this.game_data = this.getGameData();
    this.storage = new this.StorageHandler(prefix,true);
    this.hotkeys.doIt();
    if( !this.game_data ) return;
    this.lang = this.game_data.world.replace(/[0-9]/g,"");
    if( this.lang == "des" || this.lang == "dec" || (this.lang == "ch" && this.game_data.world.replace(/[^0-9]/) < 4) || this.lang == "chs" )
	this.lang = "de";
}

})();
