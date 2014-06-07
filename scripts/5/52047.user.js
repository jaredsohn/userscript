// ==UserScript==
// @name		Ikariam: Island_Control
// @version		5.01
// @author		Phate
// @description	script per Ikariam ver 0.5.0: calcola la data di fine costruzione e non solo.
// @downloadURL	https://userscripts.org/scripts/source/52047.user.js
// @updateURL	https://userscripts.org/scripts/source/52047.meta.js
// @include		http://s*.ikariam.*/*
// @exclude		http://board.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @require     http://flot.googlecode.com/svn/trunk/jquery.flot.js
//
//
// @history 5.01 data 27 Ottobre 2012
// @history 5.01	Nella legenda, puntando il mouse sul nome del giocatore si visualizzano tutti i dati raccolti e il calcolo del totale donato.
// @history 5.01	Per ogni punto del grafico è possibile vedere il valore passandoci sopra con il mouse.
// @history 5.01	Nella legenda è possibile selezionare i giocatori da visualizzare nel grafico.
// @history 5.01	Inserito grafico storico donazioni con salvataggio personalizzato a richiesta con un massimo 10 salvataggi.
// @history 5.01	Inserito grafico donazioni con salvataggio automatico ogni 5 giorni per un massimo di 34gg.
// @history 5.01	Quando si valutano tutte le donazioni dell'isola nella titolo della tabella viene inserita la data ultima visita all'altra risorsa.
// @history 5.01	Integrato eventi barra risorse dello script End Time.
// @history 5.01	Quando si cambia isola rielabora la nuova tabella donazioni.
// @history 5.01	Sistemato calcolo quote per fare l'upgrade delle risorse.
// @history 5.00 data 11 Ottobre 2012
// @history 5.00	Inizio update.
// @history 5.00	Inserite solo le funzioni base.
// @history 5.00	Lo script è stato riscritto completamente, in questa versione non ci sono i trend e il messaggio all'agorà.

// ==/UserScript==

const verScript='5.01';
var IsC_lang;		//testi script
var IsC_loading;	//ciclo tempo eventi
var nIsCEvent=[];	//array eventi
var idIsle;			//id dell'isola
var islePar;		//parametri per calcolo donatori
var typFrame;		//tipo di finestra aperta (falegnameria o bene di lusso)
var playerPar={};	//dati dei giocatori nella falegnameria o bene di lusso;

$(window).load(function() 
{
	if (!unsafeWindow.LocalizationStrings && !unsafeWindow.dataSetForView) return; 
	var page = $('body').attr('id');
	if(page=='island')	
	{
		idIsle = $('#js_islandBread').attr('href').replace(/(&islandId=|&oldBackgroundView)/gi,'{').split('{')[1];	// id isola
		//carica lingua
		const typLang={es:['ar','cl','mx','pe','ve'],pt:['br'],ru:['by']}
		const langs = 	//matrice lingua
		{ 	//Testi script
		en:
			{ // English translate by myself
			thousand:"k",
			titleTab:['info Island Control','Real Trend','Historical Trend','Agora message'],
			infotxt:["The players who use the resource of the island should contribute to its development donating building material according to "+
				"the number of workers and the size of the cities. The donation shares can be set " +
				"for every resource and tradegood.",
				"The contribution that every player should donate is regulated by the following formula:",
				"Donation = (Qw * worker) + (Qt * level of the town hall)",
				"Qw",
				" = Share by every worker | ",
				"Qm",
				" = Share by every level of the town hall",
				"Legend:"],
			infoico:["Very well!",
				"Bloodsucker, but only the 10% remains to be donated.",
				"True bloodsucker."],
			scorewrk: "Share by worker",
			scorelvl: "Share by level of the town hall",
			chkboxvl: " Estimate all player's donations in the island",
			valid:	  "Save settings",
			titlestat:"Stats",
			statinfo:["In the island there are",
						"cities and the average level of the town hall is",
						"The","players","of which","are on vacation","and","are inactive",",",
						"have donated ","and they do work","citizens."
					 ],
			statupgrd1:["The level","is under construction."],
			stat:["To upgrade to level",
					 "remain",
						["and enough donations missing.",
						 "and need donations of the players on vacation.",
							["and you need to increase the odds of donation.",
							 " for every worker.",
							 " for every level of the town hall."]
						]
				 ],
			nodate: "You must visit the other resource",
			dateresource:"Update ",
			month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
			his_button: ['Delete historical data', 'Save historical data'],
			msgSure: ['Are you sure?','Yes','Cancel'],
			tot_trend:["Donated "," in "," days"],
			tab_head:['Date','Donation','Δ Don'],
			
			msgAgora: "Creating message for AGORA",
			msg_share: 'Add shares',
			msg_info: 'Add the statistics',
			msg_ply: 'Players',
			msg_ply1: 'All',
			msg_ply2: 'Debt',
			msg_ply3: 'Credit',
			msg_ply4: 'None',
			msg_compile: 'Compile',
			msg_subject: 'Subject',
			msg_message: 'Message',
			msg_yes:'Create new post',
			msg_cancel:'Back',
			msg_chr:' Chars',
			msg_sh: "Share ",
			msg_allDon:"In the island are evaluated all player's donations.",
			msg_hdPly:['Debits',' and ','Credits',' of the players:']
				},
		it:
			{ // Italian texts by myself
			//unità delle migliaia
			thousand:"k",
			//titoli menu a scomparsa
			titleTab: ['Parametri Island Control','Grafico attuale','Grafico Storico','Messaggio Agorà'],
			//tabella parametri script
			infotxt: ["I giocatori che sfruttano le risorse dell'isola devono contribuire al loro sviluppo donando legname in base "+
						"ai lavoratori e alla grandezza delle citt&agrave;. Le quote di donazione si possono impostare per " +
						"ogni falegnameria e bene di lusso.",
						"Il contributo che ogni giocatore deve donare &egrave; regolato dalla seguente formula:",
						"Donazione = (Ql * Lavoratori) + (Qm * LivelloMunicipio)",
						"Ql",
						" = quota per ogni lavoratore | ",
						"Qm",
						" = quota per ogni livello del municipio",
						"Legenda:"],
			infoico: ["Ha donato legna a sufficenza",
					"vicino alla minima quota donazioni.",
					"Sfrutta le donazioni altrui"],
			scorewrk: "Quota lavoratori",
			scorelvl: "Quota livello Municipio",
			chkboxvl: " Valutare tutte le donazioni fatte dai giocatori nell'isola",
			valid:	  "Salva impostazioni",
			//tabella statistiche script
			titlestat:"Statistiche",
			statinfo:  ["Nell'isola sono presenti",
						"citt&agrave; con un livello medio del Municipio di ",
						"I","giocatori",", di cui","in vacanza","e","inattivi",",",
						"hanno donato","e fanno lavorare","cittadini."],
			statupgrd: ["Il livello", "&egrave in costruzione."],
			stat:	["Per raggiungere il livello",
					 "mancano",
						["e bastano le donazioni mancanti dei giocatori attivi.",
						 "e servono anche le donazioni mancanti dei giocatori in vacanza.",
							["ed &eacute; necessario aumentare le quote di donazione.",
							 " per ogni lavoratore. ",
							 " per ogni livello del municipio."]
						]
					],
			//voci da inserire nel titolo tabella donazioni quando si valutano tutte le donazioni dell'isola
			nodate: "Visitare l'altra risorsa",
			dateresource:"Agg. ",
			//mesi per la scala del grafico
			month: ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],
			//pulsanti per reset e salvataggio dati storico
			his_button: ['Cancella i dati storici','Salva dati storici'],
			//messaggio di conferma
			msgSure: ['Sei sicuro?','Si','Annulla'],
			//tooltip con valori del giocatore nel grafico
			tot_trend:["Donato "," in "," giorni"],
			tab_head:['Data','Donazione','Δ Don'],
			
			msgAgora: "Creazione messaggio per AGORA",
			msg_share:'Aggiungi le Quote.',
			msg_info:'Aggiungi le statistiche.',
			msg_ply:'Giocatori',
			msg_ply1:'Tutti',
			msg_ply2:'Debitori',
			msg_ply3:'Creditori',
			msg_ply4:'Nessuno',
			msg_compile: 'Compila',
			msg_subject: 'Oggetto:',
			msg_message: 'Messaggio:',
			msg_yes:'Crea un nuovo post',
			msg_cancel:'Indietro',
			msg_chr:' Caratteri',
			msg_sh: "Quote ",
			msg_allDon:"Nell'isola vengono valutate tutte le donazioni del giocatore.",
			msg_hdPly:['Debiti',' e ','Crediti',' dei giocatori:']
			},
		}
		var indexLang = unsafeWindow.LocalizationStrings.language	//lingua della pagina
		$.each(typLang,function(id,value){							//imposta lingua per paesi che usano la stessa lingua
			if ($.inArray(indexLang,value)>=0) {
				indexLang = id;
				return false
			}
		})
		//se la lingua non supportata carica l'inglese
		IsC_lang = langs[indexLang] != null ? langs[indexLang] : langs['en']
		//evento clicco sulle risorse
		$('#islandresource, #islandtradegood').click(function(){
			nIsCEvent=[1];
			setEvent()
		});
		//barra risorse dello script END TIME
		$('#container').on('click','#ETresourcebar a',function()
		{
			nIsCEvent=[1];
			setEvent()
		});
		//evento 'cambio città'
		$('#container').on('click','#dropDown_js_citySelectContainer li',function(){
			nIsCEvent=[1];
			setEvent()
		});
	}
});
// FUNZIONI PER EVENTI
function setEvent()					//imposta ciclo di 1 secondo per controllare la fine del caricamento finestra
{
	clearInterval(IsC_loading);
	if(nIsCEvent.length>0)	IsC_loading = setInterval(mainEvent,1000,nIsCEvent);
}

function mainEvent()				//alla fine del caricamento esegue le funzioni selezionate
{
	if ($('#loadingPreview').css('display')=='none')
	{
		clearInterval(IsC_loading);			//cancello ciclo tempo
		if ($.inArray(1,nIsCEvent)>=0) mainSet();
		nIsCEvent=[]						//resetto eventi
	}
}

function mainSet()
{
	typFrame = $('div.mainContentBox').attr('id')
	islePar = getParIsle(false);	//carica paramentri isola
	checkLeecher();		//assegna ai giocatori un colore in base alle donazioni
	sidetab();			//inserisce un menu a scoparsa per le varie sezioni dello script
}

function checkLeecher()		//assegna ai giocatori un colore in base alle donazioni
{
	//inserisce colonna calcolo donazioni
	$('#donationTableContainer th:eq(4)').after('<th></th>')
	
	//preleva tutti i dati della tabella
	var actPly, idPly, statePly;
	var lvl = 0;
	var wrk = 0;
	var wood =0;
	$('#donationTableContainer td.ownerName').each(function(id){
		var ply = $(this).text()													//nome giocatore
		var nameCity = $(this).nextAll('td.cityName').text()						//nome città (tolgo gli spazi nel nome danno dei problemi !!!DA RISOLVERE)
		if(ply.length != 1)		//se è presente un nome nella cella
		{
			if (id !=0)	savePly(actPly, idPly, statePly, lvl, wrk, wood, 0, 0, '')	//salvo i dati del giocatore precedente
			actPly = ply;															//nuovo giocatore
			wood = $(this).nextAll('td.ownerDonation').text().replace(/\D/g,'') *1;	//donazione legna
			var hrefPly = $(this).nextAll('td.actions').find('a').attr('href');
			idPly = hrefPly != null? hrefPly.replace(/(&receiverId=|&backgroundView)/gi,'{').split('{')[1]  :'@mine@';;
			lvl=0;
			wrk=0;
		}

		//calcoli livello città
		var actLvl = $(this).nextAll('td.cityLevel').text().replace(/\D/g,'') *1;	//livello della città
		lvl += actLvl;																//somma dei livelli città
		//calcoli lavoratori giocatore
		wrk += $(this).nextAll('td.cityWorkers').text().replace(/\D/g,'') *1;;		//somma lavoratori giocatore
		$(this).nextAll('td.ownerDonation').after('<td class="IsCscore"></td>');	//aggiunge cella per calcolo leecher
		//stato del giocatore Normal Inactive Vacation
		if(ply.length != 1)		//se è presente un nome nella cella controlla lo stato del giocatore
		{
			statePly = 'on';
			if(		$('div.vacation.level'+ actLvl +':has(a[title="'+ nameCity +'"])').length == 1) statePly = 'vacation'	//se il giocatore è in vacanza
			else if($('div.inactive.level'+ actLvl +':has(a[title="'+ nameCity +'"])').length == 1) statePly = 'inactive';	//se il giocatore non è inattivo
		}
	});
	savePly(actPly, idPly, statePly, lvl, wrk, wood, 0, 0, '')	//salvo i dati dell'ultimo giocatore
	calcLeecher()												//calcola donazioni e colora tabella
}

function calcLeecher()	//calcola donazioni e colora tabella
{
	//carico dati donazioni altra risorsa se è fleggato calcola tutte le donazioni
	if (islePar.allDonation)
	{
		var othFrame = typFrame == 'resource'? 'tradegood':'resource';
		var othDonation = eval(localStorage.getItem(idIsle +"_"+ othFrame));	//carico dati altra risorsa
		if (othDonation == null)  var othDate = IsC_lang.nodate
		else
		{
			var dAgg = new Date (othDonation.date*1000);
			othDate = IsC_lang.dateresource +' '+ dAgg.getDate() +'.'+ IsC_lang.month[dAgg.getMonth()] +'.'+ dAgg.getFullYear();
		}
		
		$('#resourceUsers h3').append('<span id="IsCdateOtherResource">'+ othDate +'<span>');
		$('#IsCdateOtherResource').css({'position':'absolute','right':'4px','padding-left':'28px'})
	}
	//calcola le donazioni e i colori da assegnare ai giocatori
	$.each(playerPar,function(){
		if(this.state != 'inactive')
		{
			var calcWood = islePar[typFrame].wrk * this.wrk + islePar[typFrame].lvl * this.lvl					//calcola legno da donare
			this.donation = this.wood - (islePar[typFrame].wrk * this.wrk + islePar[typFrame].lvl * this.lvl);	//calcola la differenza
			var actDon = this.donation;
			//se fleggata calcola tutte le donazioni dell'isola e il dato è valido
			actDon += islePar.allDonation && othDonation != null && isNaN(othDonation[this.id])==false?  othDonation[this.id] : 0;
			this.alldon = actDon;
			if (this.state == 'vacation') this.color = 'IsCblue'
			else if (actDon >= 0) this.color = 'IsCgreen'
			else if (actDon >= (0-(calcWood * 0.10))) this.color = 'IsCorange'
			else this.color = 'IsCred';
		}
		else	{this.color='IsCgrey'}	//colora il giocatore inattivo
	});	
	//colora la tabella
	var color;	//colore della linea tabella
	$('#donationTableContainer tr').removeClass('alt')
	var altClass = '';
	var imgw = "<img src='skin/resources/icon_wood.png'>"	// wood image
	$('#donationTableContainer td.ownerName').each(function(id){
		var ply = $(this).text()							//nome giocatore
		if(ply.length != 1)									//se è presente un nome nella cella
		{
			color = playerPar[ply].color									
			altClass = altClass == ''? 'alt':'';								//imposto classe per colore riga
			if (color == 'IsCgrey') $(this).append('<span> (i)</span>')			//inserisco testo inattivo
			else if (color == 'IsCblue') $(this).append('<span> (v)</span>');	//inserisco testo in vacanza
			if (color != 'IsCgrey') //aggiunge il valore della legna da donare nella cella se il giocatore non è inattivo
			{
				$(this).nextAll('td.IsCscore').html(replaceNum(playerPar[ply].alldon,false) +' '+ imgw);
				if (islePar.allDonation)	//inserisce dati donazioni contando tutte quelle fatte nell'isola
				{
					var class1 = playerPar[ply].donation>0? "IsCgreen":"IsCred";	//classe prima colonna
					var class2 = "";
					var txtdon = 'N.D.';
					if (othDonation != null && isNaN(othDonation[playerPar[ply].id]) == false)
					{
						txtdon = replaceNum(othDonation[playerPar[ply].id],false);
						class2 = othDonation[playerPar[ply].id]>0? "IsCgreen":"IsCred";	//classe seconda colonna 
					}
					$(this).nextAll('td.IsCscore').append(
						'<div class="tooltip infotip" style="line-height:13px;" updated="true">'+
							'<p class="'+ class1 +' '+ typFrame +'">'+ replaceNum(playerPar[ply].donation,false) +' '+ imgw +'</p>'+
							'<p class="'+ class2 +' '+ othFrame +'">'+ txtdon +' '+ imgw +'</p>'+
						'</div>');
				}
			}
		}
		$(this).parent().addClass(color)							//aggiunge classe colore riga
		if(altClass == 'alt') $(this).parent().addClass(altClass)	//aggiunge classe sfondo riga

	});

	
	//sostituisce classe proprie città
	$('#donationTableContainer tr.own').removeClass('own').addClass('IsCown')
	//classi colori tabella
	$('#donationTableContainer tr.IsCown').css({'background-color':'#FDF7A7'});							//CSS proprie città
	$('#donationTableContainer tr.IsCgrey').css('color','#999999');										//CSS inattivo
	$('#donationTableContainer tr.IsCblue').css('color','royalblue');									//CSS vacanza
	$('#donationTableContainer tr.IsCgreen, #donationTableContainer p.IsCgreen').css('color','#006600');//CSS buon donatore e tooltip
	$('#donationTableContainer tr.IsCorange').css('color','darkorange');								//CSS vicino alla quota
	$('#donationTableContainer tr.IsCred, #donationTableContainer p.IsCred').css('color','#AA0303');	//CSS cattivo donatore e tooltip
	//migliorie grafiche
	$('#donationTableContainer img[src*="wood"]').css({'height':'14px','width':'19px','margin':'3px','vertical-align':'middle'});
	$('#donationTableContainer td.IsCscore').css('font-size','11px');
	//tootip stile ed eventi
	if(islePar.allDonation)
	{
		$('#donationTableContainer td.IsCscore').hover(
			function(){
				var tooltip = $(this).find('div.tooltip')
				$(this).find('div.tooltip').css('display','inline');
			},
			function(){
				$(this).find('div.tooltip').css('display','none');
			});
		var idtradegood = $('#islandtradegood a').attr('href').replace(/(&type=|&islandId=)/gi,'{').split('{')[1] *1;
		// array immagini tooltip
		const imgTradegood =[	
			'icon_wood',	//falegnameria
			'icon_wine',	//vigna
			'icon_marble',	//cava marmo
			'icon_glass',	//cava critallo
			'icon_sulfur'];	//cava zolfo
		$('#donationTableContainer td.IsCscore div.tooltip').css({'background-color':'#FAE0AE','border':'1px solid #E4B873','position':'absolute','right':'150px','text-align':'rigth','padding':'5px','z-index':'110000'})
		$('#donationTableContainer td.IsCscore div.tooltip p').css({'font-size':'10px','padding-left':'30px','margin':'1px 0px'});
		$('#donationTableContainer td.IsCscore div.tooltip img[src*="wood"]').css({'height':'10px','width':'14px','margin':'0px'});
		$('#donationTableContainer td.IsCscore div.tooltip p.resource').css({'background':'url("/skin/resources/icon_wood.png") no-repeat'});
		$('#donationTableContainer td.IsCscore div.tooltip p.tradegood').css({'background':'url("/skin/resources/'+ imgTradegood[idtradegood] +'.png") no-repeat'});
		//data nel titolo della tabella
		var othIcon = othFrame == 'tradegood'? idtradegood : 0;
		$('#IsCdateOtherResource').css({'background':'url("/skin/resources/'+ imgTradegood[othIcon] +'.png") no-repeat'});
	}	
	//salvo dati per quando si calcolano tutte le donazioni dell'isola
	var dataPly ={date: unsafeWindow.dataSetForView.serverTime}
	$.each(playerPar,function(){dataPly[this.id] = this.donation});
	localStorage.setItem(idIsle +"_"+ typFrame,uneval(dataPly));		//salvo i dati in localstorage
	//salvo dati per il real trend
	saveItemRealTrend(6)
}
	
function savePly(name,id,state,lvl,wrk,wood,don, alldon, color)	//salvataggio dati giocatori
{
	// name = nome del giocatore
	// id = numero univoco per identificare il giocatore
	// state = giocatore attivo, inattivo o in vacanza
	// lvl = somma livelli città
	// wrk = somma lavoratori falegnameria o bene di lusso
	// wood = legno donato
	// donation = calcolo legna da donare per non essere sfruttatore
	// alldon = calcolo della legna da donare contando tutte le donazioni dell'isola
	// color = classe da assegnare alla riga tabella per colorarla
	playerPar[name]= {name: name, id: id, state: state, lvl: lvl, wrk: wrk, wood: wood, donation: don, alldon: alldon, color: color};	//salvo i dati
}

// MENU LATERALE
function sidetab()	//inserisce schede per aprire le varie sezioni di Island Control
{
	icoRtrend = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AoWFR8RK+0p4QAAAEVpVFh0Q29tbWVudAAAAAAAQ1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODgKroanfwAABDdJREFUWMPtV29IW1cU/928vKcx/8Q0LlFSkdhQh1OqEsXoQggUHMbNth8sfpBMtI4VQokR0ZWVDgsb0m1+cHOiuO6PsDFXtINuc6tjjAqd0q52xVXaMQVny7bWqW2zvHf2IXnBRGyb1spgPXDh3XfOued3fvfe884Dnsj/TVpbWwEAlZWV65WBQCD6nJOTs2lBu7q6YuYFnZ35Gxr39vbmp6am0mYFH7RYhEtA0vMej29Vper9TqslAi7KemW8w8zMTDnRpsUH4zj/X0bjsZOjowCAZwEiQJT1ingHSZJCkiQBAERRfKTgx/V66HJy3nCo1ZqfdLqbMqa1NusAcBwHmQGO4+4Z4Lddu/CWy8UBwEB6+jr9TlFEzdiY+LZSOZ6/tJQaAqSQUin9IAjYcAsYY2CM3Te70tJSbJ+YwB/Z2XVKs9nw4sLCm2v1I8nJeG55GaMaTU/V7GzxTcZwUqV6hbfZ2M6ZGe+GC7e0tDRptdoHOwT19Rk/K5UkAvSe1+vIzMwEAPT39wMATqhUhym855II9MtuRx2OTxIC4PP5Yq9VSQkAYNZsniVAlABpkufHQBRl9JLT6SWApDCAiwQwAnCivBzOI0c0GwLw+/0xAK4VFwMAyvr6st51u6N2r5WVHRfDixMBdJsxumEyHQWAj12ul4KCQARIBCxKjOnXk1d/fwB1dXVhEIWF9ZNZWSuyzdfV1XkytX/yfOgfxkIE0C2lMuiw2z3XNRqSItlfcTqfTujqBAKBGAZqS0oK5UzP5OZeAIDv09IuRLKjTwsK2ocMBq/I80QAzXEcESASQOfd7hYA+D03N6Fa3aTT6aIAfs3IkCLZSBJA5w2Gq8QYEUArRmP0MH1lNE7IoAig01VV5wDgx5qaxIpHR0dHk1qtJgC4zdiAvOAqY+LaAHcZW9Hv3m29arfD4/GAgOS/w/tO0zbbLAB8VlubePVqbm4+tH3Hjlff2bfv0C2FQj5kN46ZzU2LYZqlO4JA16zW/fG+HxYXH5i0WJYOtrZahvbsebjy2dDQoJyz27eFIjSvJifTZbfbBAABq/VACKBTGs3peL8elwtBAL0VFUmP9vUg4r7Q68/IdH+UkdGHqSk4nU4AwJdm87fU2JheVFT0eBqGX/LyBoKR7EMpKafi9S/MzaU8tm7lg7S07FUgSADdUSiCh/fufSahK/TQrAPo7O5+6qzBsBI5dOLLFot3S3o0h8MBALiblPS+XN2mbbZxAHjdZNqaRtFfULD/euTKTaekLGNwcNuWdqpDJlPPCkAUrukWp8s1ulWxo53Huezsb8bT0xe1jY3dfp/v7PDwcMXCwoL5QZqTREQURUEQhKm2trbL8/Pz4ZfV1dVRg/b29oM8zxNjLGYoFIp7jnj7eD95DoD0ej3FtGQjIyNRAIIgfK5Wq68QkbTZ2cvC83zwyS/af0b+BSmfvwCl1RP6AAAAAElFTkSuQmCC";
	icoHtrend = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AoWFR4kZEXcgwAAAEVpVFh0Q29tbWVudAAAAAAAQ1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODgKroanfwAABTVJREFUWMPtV11MU2cYfr7vO6eUjtFCKdgipUCF2YpDJ7JNGjN1RNI1bCamJg4So+gutgvnQnBGMs0SUbJhs11siQuZu9wgBmNiCJFsbg6RoGZmxC0ziNuCfwPlZ2Lb790F59SKUFy24MX2Jm/O6TlP39/v/TnAEyQievpJKsf/9K9SZ2cnAMDv9/vdbveTMWLnzp2vmkymO/9Y0OcDA5a/+5+Ojg6r0+kkzjnl5uZ+Pf19a2srAGD79u1zC7vm812QjH0sgTVzYU+fPg0igt1ubwcgOeeSMUZer3dLXl7eQ9i9e/duA4Du7u7EQiVAGk8SMCoZezcRvry8PMgYI1VVSQih8z0AyM/Pj+EyMjJuB4PBJQmVD+fkZBBAOktA6vcRRTkWVdX13zc2GnR8S0tLrt1uJ845GY3G3+rr6180Go2kKAo5HI5+v99fFggEnl+7du1ym832h91up2Aw+OysBtz0ePI1xWEJnNSjEW/U1TVrXrhQXw8igsPhOM85J1VVqbCw0AMAZWVlLVOBBGVnZ9PChQvJ6XSSqqoEQFqt1ttVVVVuq9X6sPL+YBAELKYpr0ckIAhQCXgvKoRugLy+bNlXWujfZ4wR55wKCgo+0eU0NTUl6VEBQIwx0lOkKAoBkBaL5cMZIzBUUvIFAXTD670CAMOlpbF31wOBWgJoMjOTdjU2utPT00kIQSkpKT8CQE9PTwx7+PDh4rS0tMH09PTBjIyMQZvNNqgoyn0A5HK5fiIi/kgEAGAiK+sKATSelbVPayyoqal5jjEWALCqXVWjHQDl5eaOMsakwWAgl8uVFS+joaEBABAKhdzNzc3u5uZm98GDB11ms/n3kpKSMQDKnBVAwDv6s+Tk5LtCiCjnPKoqiuSMSSEEAaDS0tKG6d7PRh6P515FRcVTswKur16dpR+0XURWAPD5fCWKopCiKMQ5J0UIgqIQFIWSTaYuADh79uyM8r49dSp2f+LECfT39zsSWnjX6VysVUBsVloslhGtrq8mJSW1CqPxywBj4xsA+nTLFn8ieSf7+nBr6dJjwAOBoVAoYQPySUCGk5IiAHDo0KGXhRDEGKMdO3YEY+fEav0uyrm85fV+BgD9mzbFZHxTV4dry5ezy+vWsYu7d3MJhAmoAoBhpzNxjiZstg+0FNzRcj+gl87GjRtNoVAIbW1tuLh58+sabuxaZWVFvIdDxcUfjTgc7TcLCtrH09KOSyBKAN3weAJzHpLhRYvOEUARg2F4xapVXs45CSGk1+sdnI6dTEkhOdUdJ8dcrre1CL5C05qW3k2jnIdHrdYFidekBxVw1e12x5rH/v37K6fhMFBZ+Wa8kttFRUfjfofjWBJAw0VFtI/IMKvynoYGmy6gz2wOAyAhhDQYDARAHDlyJIbt7e0FAPzq8224bzKNxrXq6H2jMUrASwSs1zhMwERnX581ofc3V64sJoCIc8q2WIgxJjnn5HQ6L884/w8cAAD8UlOzhIB7pOV6IjV1wwxRXQEAXV1dCSqA89cIkD8kJxNnLDZWa2try+fccIGkkbw8CqvqI92oe8+e9sfaaO66XE0EUEFODgkhiHNOnPPo424xBCQTkBq/bJ+rq3vompAmLZZTP0+NS51lcXExtbW1zc9COZ6TQ15tuulGbN269a15UX78zJnU3tRUgpZ7bcZHAKC6unoePpOAZ5YtWEBcWy4URZGZmZmT8+E8B4DqbdtWnB8aGiNgDMAYEf3pcDjemA8DGACYzebMwsJCdzgcBgBEIhFcunTpzH/ik+4vw6pJ0/07PL8AAAAASUVORK5CYII=";

	$('#sidebar').append('<div id="IsCmenu">'+
							'<ul>'+
								'<li id="infoIsC" class="IsCtab">'+
									'<div class="image slot0"></div>'+
									'<div class="name"><span>'+ IsC_lang.titleTab[0] +'</span></div>'+
								'</li>'+
								'<li id="trendIsC" class="IsCtab">'+
									'<div class="image slot1"></div>'+
									'<div class="name"><span>'+ IsC_lang.titleTab[1] +'</span></div>'+
								'</li>'+
								'<li id="historyIsC" class="IsCtab">'+
									'<div class="image slot2"></div>'+
									'<div class="name"><span>'+ IsC_lang.titleTab[2] +'</span></div>'+
								'</li>'+
								'<li id="magIsC" class="IsCtab">'+
									'<div class="image slot3"></div>'+
									'<div class="name"><span>'+ IsC_lang.titleTab[3] +'</span></div>'+
								'</li>'+
							'</ul>'+
						'</div>');
	//css per menu a scomparsa
	$('#sidebarWidget').css({'position':'relative','z-index':'1000'});
	$('#IsCmenu').css({'position':'absolute','left':'80px','top':'-1px','z-index':'999'});
	$('#IsCmenu li.IsCtab').css({'display':'block','position':'relative','width':'199px','height':'40px','cursor':'pointer','background':'url("/skin/friends/slot-left.png") no-repeat scroll right top transparent'})
			.hover(	function(){$(this).animate({left:'146px'},'high')},
					function(){$(this).animate({left:'0px'},'high')})
	$('#IsCmenu div.image').css({'position':'relative','left':'151px','height':'32px','width':'32px','top':'4px'});
	$('#IsCmenu div.slot0').css({'background':'url("/skin/minimized/options.png") no-repeat','left':'148px','top':'0px'});
	$('#IsCmenu div.slot1').css({'background':'url("'+ icoRtrend +'") no-repeat'});
	$('#IsCmenu div.slot2').css({'background':'url("'+ icoHtrend +'") no-repeat'});
//	$('#IsCmenu div.slot3').css({'background':'url("/skin/interface/icon_message_write.png") no-repeat'});
	$('#IsCmenu div.name').css({'display':'table','position':'absolute','top':'0px','height':'100%','max-width':'146px','right':'70px'});
	$('#IsCmenu div.name span').css({'display':'table-cell','text-align':'center','vertical-align':'middle','font-weight':'bold'});
	
	$('#sidebar span.indicator:first').click(function(){
		if($(this).parent().attr('class') == 'accordionTitle') 
		{
			$('#IsCmenu').hide('slow');				//nasconde menuTab
			$('#info_IslandControl').hide('slow')	//nasconde finestra informazioni se presente
		}
		else 
		{
			$('#IsCmenu').show('slow')
			$('#info_IslandControl').show('slow')
		}
	});
	
	//eventi menu a scomparsa
	$('#infoIsC').click(infoIslandControl)
	$('#trendIsC').click(openRealTrend)
	$('#historyIsC').click(openHistoryTrend)
	
}

// Funzioni FINESTRA INFORMAZIONI E PARAMENTRI
function infoIslandControl()	//finestra informazioni e parametri per lo script
{
	if ($('#IsCinfo').length > 0) return	//esce se esiste gia la finestra info e parametri
	
	$('#IsCmenu li[id!=infoIsC]').hide('slow');		//nasconde tutte le schede del menu a scomparsa tranne quella cliccata
	windowTabMenu(IsC_lang.titleTab[0])				//inserisce finestra principale
	
	//tabella parametri Island Control
	var imgw = "<img src='skin/resources/icon_wood.png' height='14' width='19'>"	// wood image				
	$('#IsCwindow div.mainContent').append(
		"<div class='contentBox01h'>"+
			"<h3 class='header'>"+
				"<a href='http://userscripts.org/scripts/show/52047' target='_blank'><b>Island_Control v "+ verScript +"</b></a>"+
				"<span style='font-size:10px;'>  by <a href='http://userscripts.org/users/95943' target='_blank'>Phate72</a></span>"+
			"</h3>"+
			"<div id='IsCinfo' class='content'>"+
				"<p>"+ IsC_lang.infotxt[0] +"<br /><br />"+
					"<center>"+ IsC_lang.infotxt[1] +"<br />"+
					"<b>"+ IsC_lang.infotxt[2] +"</b><br />"+
					"<b>"+ IsC_lang.infotxt[3] +"</b>"+ IsC_lang.infotxt[4] +"<b>"+ IsC_lang.infotxt[5] +"</b>"+ IsC_lang.infotxt[6] +"<br /><br />"+
					IsC_lang.infotxt[7] +"</center>"+
				"</p>"+
				"<ul>"+
					"<li class='green'>"+ IsC_lang.infoico[0] +"</li>"+
					"<li class='orange'>"+ IsC_lang.infoico[1] +"</li>"+
					"<li class='red'>"+ IsC_lang.infoico[2] +"</li>"+
				"</ul>"+
				"<div style='padding-top: 5px'>"+
					"<div class='IsCscore'>"+
						"<label>"+ IsC_lang.scorewrk +"</label>"+
						"<input id='wrkShare' class='textfield' type='text' size='6' value="+ islePar[typFrame].wrk +" /> " + imgw + 
					"</div>"+
					"<div class='IsCscore'>"+
						"<label>"+ IsC_lang.scorelvl +"</label>"+										
						"<input id='lvlShare' class='textfield' type='text' size='6' value="+ islePar[typFrame].lvl +" /> " + imgw + 
					"</div>"+
				"</div>"+
				"<div class='IsCscore'>"+
					"<input type='checkbox' id='IsCdon' /><label>"+ IsC_lang.chkboxvl +"</label>"+
				"</div>"+
				"<div class='IsCscore'>"+
					"<input id='IsCvalid' class='button' value='"+ IsC_lang.valid +"' type='button' />"+
				"</div>"+
			"</div>"+
			"<div class='footer'></div>"+
		"</div>");
	$('#IsCdon').prop("checked",islePar.allDonation);	//imposta flag donazioni
	//stile parametri	
	$('#IsCinfo li').css({'display':'inline-block','padding-top':'40px','width':'33%','text-align':'center'});
	$('#IsCinfo li.green').css({'background':'url("/skin/smilies/ecstatic_x32.png") no-repeat scroll 50% 0'});
	$('#IsCinfo li.orange').css({'background':'url("/skin/smilies/happy_x32.png") no-repeat scroll 50% 0','color':'darkorange'});
	$('#IsCinfo li.red').css({'background':'url("/skin/smilies/outraged_x32.png") no-repeat scroll 50% 0'});
	$('#IsCinfo div.IsCscore').css({'text-align':'center','margin':'5px 0px','font-weight':'bold'});
	$('#IsCinfo div.IsCscore label').css({'margin':'0px 10px','vertical-align':'middle'});
	$('#IsCinfo img, #IsCinfo input').css({'vertical-align':'middle'});
	//eventi
	$('#IsCvalid').click(function(){			//convalida i dati imputati
		var wrk = $('#wrkShare').val().replace(/\D/g,'') *1;	//preleva quota lavoratori
		var lvl = $('#lvlShare').val().replace(/\D/g,'') *1;	//preleva quota livelli città
		//controlla che siano numeri
		if(isNaN(wrk)) wrk=0;					
		if(isNaN(lvl)) lvl=0;
		//imposta nuovi dati e li salva
		islePar[typFrame].wrk=wrk
		islePar[typFrame].lvl=lvl
		islePar.allDonation = $('#IsCdon').prop("checked")
		localStorage.setItem(idIsle + "_isle",uneval(islePar));		//salvo i parametri dell'isola
		$('#IsCwindow div.close').trigger('click');					//chiude finestra info e parametri
		//cancello vecchi colori tabella
		$('#donationTableContainer tr.IsCgrey').removeClass('IsCgrey');				//cancella classe inattivo
		$('#donationTableContainer tr.IsCblue').removeClass('IsCblue');				//cancella classe vacanzato
		$('#donationTableContainer tr.IsCgreen').removeClass('IsCgreen');			//cancella classe buon donatore
		$('#donationTableContainer tr.IsCorange').removeClass('IsCorange');			//cancella classe vicino alla quota
		$('#donationTableContainer tr.IsCred').removeClass('IsCred');				//cancella classe cattivo donatore
		$('#donationTableContainer td.ownerName span').remove()						//rimuove vecchi indici
		calcLeecher()																//ricalcolo donazioni
	})
	
	//tabella statistiche Island Control
	var woodUpgrade = $('#sidebarWidget div.resUpgrade li.wood:first').text().replace(/\D/g,'');	//legno necessario per l'upgrade
	var woodDonate = $('#sidebarWidget div.resUpgrade li.wood:last').text().replace(/\D/g,'');		//legno donato
	var woodRemaing = woodUpgrade - woodDonate														//legno che deve essere donato
	var cities = $('#donationTableContainer td.cityName').length									//numero città
	var players = $('#donationTableContainer tr.avatar').length										//numero giocatori
	var totlvl = 0;																					//somma livelli
	var totwrk = 0;																					//somma lavoratori
	var plyInactive = 0;																			//giocatori inattivi
	var plyVacation = 0;																			//giocatori in vaqcanza
	$.each(playerPar,function(){
		totlvl += this.lvl;																			//somma livello della città
		totwrk += this.wrk;																			//somma lavoratori giocatore
		if (this.state == 'inactive') plyInactive++													//conta giocatori inattivi
		if (this.state == 'vacation') plyVacation++													//conta giocatori in vacanza
	});
	var avglvl = parseInt(totlvl/cities);															//livello medio città

	//testo tabella statistiche
	var html ='<p>'+ IsC_lang.statinfo[0] +																
		' <b>'+ cities + '</b> '+ IsC_lang.statinfo[1] +' <b>'+ avglvl +'</b>. '+
		IsC_lang.statinfo[2] +' <b>'+ players  +'</b> '+ IsC_lang.statinfo[3];
	if (plyVacation > 0 && plyInactive > 0)
	{
		html += IsC_lang.statinfo[4] +' <b>'+ plyVacation  +'</b> '+ IsC_lang.statinfo[5] +' '+
			IsC_lang.statinfo[6] +' <b>'+ plyInactive  +'</b> '+ IsC_lang.statinfo[7] + IsC_lang.statinfo[8];
	}
	else if (plyInactive > 0)
	{
		html += IsC_lang.statinfo[4] +' <b>'+ plyInactive  +'</b> '+ IsC_lang.statinfo[7] + IsC_lang.statinfo[8];
	}	
	else if (plyInactive > 0)
	{
		html += IsC_lang.statinfo[4] +' <b>'+ plyVacation  +'</b> '+ IsC_lang.statinfo[5] + IsC_lang.statinfo[8];
	}		
	html += ' '+ IsC_lang.statinfo[9] +' <b>'+ replaceNum(woodDonate,true) +'</b> '+ imgw +' '+
		IsC_lang.statinfo[10] +' <b>'+ replaceNum(totwrk,true) + '</b> '+ IsC_lang.statinfo[11];
	
	//testo statistiche se livello è in upgradde o no
	if ($('#upgradeCountDown').length > 0)	//livello in upgrade
	{
		html += ' '+ IsC_lang.statupgrd[0] +' <b>'+ $('#sidebarWidget div.resUpgrade p.headline_huge').text() +
			'</b> '+ IsC_lang.statupgrd[1] +'</p>';
	}
	else									//livello non in upgrade
	{
		html += ' '+ IsC_lang.stat[0] +' <b>'+ $('#sidebarWidget div.resUpgrade p.headline_huge').text() +
			'</b> '+ IsC_lang.stat[1] +' <b>'+ replaceNum(woodRemaing,true) + '</b> '+ imgw;
		//calcolo donazioni mancanti
		var notWood = 0;				//donazioni mancanti di giocatori attivi
		var notWoodVacation = 0;		//donazioni mancanti di giocatori in vacanza
		$.each(playerPar,function(){	//calcola il totale delle donazioni mancanti
			if (this.donation < 0 && this.state == 'on') notWood += this.donation
			else if (this.donation < 0 && this.state == 'vacation') notWoodVacation += this.donation
		});
		if ((woodRemaing + notWood) <=0)						//servono solo le donazioni dei giocatori attivi
		{
			html += ' '+ IsC_lang.stat[2][0] +'</p>';
		}
		else if ((woodRemaing + notWood + notWoodVacation) <=0)	//servono anche le donazioni dei giocatori in vacanza
		{
			html += ' '+ IsC_lang.stat[2][1] +'</p>';
		}
		else													//bisogna aumentare le quote se si vuole fare l'upgrade
		{
			html += ' '+ IsC_lang.stat[2][2][0] +'</p>';
			var share = calcNewShare(woodRemaing)	//calcolo nuove quote donazione legna
			if ( share[0].replace(/\D/g,'')*1 > 0 || share[1].replace(/\D/g,'')*1 > 0)	//se almeno una delle due quote è valida
			{
				html +=	'<div class="IsCnewShare"><b>'+ share[0] +'</b>' + imgw +' '+ IsC_lang.stat[2][2][1] +'</div>'+
						'<div class="IsCnewShare"><b>'+ share[1] +'</b>' + imgw +' '+ IsC_lang.stat[2][2][2] +'</div>';
			}
		}
	}
	$('#IsCwindow div.mainContent').append(			//inserisco tabella statistiche nella finestra
			"<div class='contentBox01h'>"+
				"<h3 class='header'>"+ IsC_lang.titlestat +"</h3>"+
				"<div id='IsCstat' class='content'>"+
				html +
				"</div>"+
				"<div class='footer'></div>"+
			"</div>");
	$('#IsCstat div').css({'padding-left':'240px'});
	classFooter()	//posiziona cornice destra
}

function calcNewShare(wood)		//calcola le nuove quote per le statistiche dello script (finestra informazioni e parametri)
{
	if (islePar[typFrame].wrk > 0 || islePar[typFrame].lvl > 0)	// controlla che ci sia almeno una quota valida
		{
			var newWrk = islePar[typFrame].wrk;	//base di partenza quota lavoratori
			var newLvl = islePar[typFrame].lvl;	//base di partenza quota livelli
			var index =0;
			var Kwrk = islePar[typFrame].wrk *0.02; //aggiunge un 2% ogni step
			var Klvl = islePar[typFrame].lvl *0.02;
			
			do		//cerco nuove quote che rendano possibile l'upgrade
			{
				var nwdon = 0;
				newWrk += Kwrk;
				newLvl += Klvl;
				
				$.each(playerPar,function()				//calcola nuove donazioni
				{
					if(this.state != 'inactive')
					{
						var score = parseInt(this.wood -(newWrk * this.wrk) -(newLvl * this.lvl));
						nwdon += score < 0? score : 0;
					}
				});
				if (index >= 10000) return ['>'+ replaceNum(Math.ceil(newWrk)),'>'+ replaceNum(Math.ceil(newLvl))]	//sopra ad un aumento del 100% esce
				index++;
			} while ((wood + nwdon) >= 0);
			return[replaceNum(Math.ceil(newWrk)) , replaceNum(Math.ceil(newLvl))]									//nuove quote per raggiungere l'upgrade
		}
	else return [0,0]
} 

//Funzioni REAL TREND
function openRealTrend()			//apre finestra real trend
{
	if ($('#IsCtrend').length > 0) return	//esce se esiste gia la finestra info e parametri
	$('#IsCmenu li[id!=trendIsC]').hide('slow');	//nasconde tutte le schede del menu a scomparsa tranne quella cliccata
	windowTabMenu(IsC_lang.titleTab[1]);				//inserisce finestra principale	
	var realTrend = eval(localStorage.getItem(idIsle + typFrame +"_realtrend"));	//carica dati trend
	if(lastItem(realTrend,0)) extractDataTrend(realTrend);							//inserisce dati attuali se non presenti
	plotTrend(realTrend)	//costruisce grafico
	classFooter()			//posiziona cornice destra
}

function saveItemRealTrend(maxItem)	//salva i dati del real trend
{
	var realTrend = eval(localStorage.getItem(idIsle + typFrame +"_realtrend"));	//carica dati trend
	if (realTrend == null)															//se non esistono dati salvati
	{	
		realTrend={};	// inizializzo parametri, la risorsa dell'isola non è mai stata visitata
	}
	else																			//se esistono dati effettua controlli
	{
		if(lastItem(realTrend,5))	//controlla se l'ultimo dato è stato salvato almeno 5 giorni fa
		{
			realTrend = deleteItem(realTrend,maxItem);	//cancella e ripulisce la serie da dati vecchi
		}
		else
		{
			return //esce se non deve salvare i dati
		}
	}
	extractDataTrend(realTrend)	//inserisce dati donazioni
	localStorage.setItem(idIsle + typFrame +"_realtrend",uneval(realTrend));	//salva dati
}

//Funzioni HISTORY TREND
function openHistoryTrend()			//apre finestra real trend
{
	if ($('#IsCtrend').length > 0) return			//esce se esiste gia la finestra info e parametri
	$('#IsCmenu li[id!=historyIsC]').hide('slow');	//nasconde tutte le schede del menu a scomparsa tranne quella cliccata
	windowTabMenu(IsC_lang.titleTab[2]);				//inserisce finestra principale	
	var hisTrend = eval(localStorage.getItem(idIsle + typFrame +"_historytrend"));	//carica dati trend
	var saveData = false															//non salva se i dati sono recenti (1gg)
	if (hisTrend == null)															//se non esistono dati salvati
	{	
		hisTrend={};				// inizializzo parametri, nessun dato salvato
		extractDataTrend(hisTrend)	//inserisce dati donazioni
		localStorage.setItem(idIsle + typFrame +"_historytrend",uneval(hisTrend));	//salva dati
	}
	else
	{
		saveData = lastItem(hisTrend,1)
		extractDataTrend(hisTrend)	//carica i dati attuali
	}
	plotTrend(hisTrend)		//costruisce grafico
	$('#IsCLegend').after(	'<div id="IsCsaveHis">'+
								'<input id="HisReset" class="button" value="'+ IsC_lang.his_button[0] +'" type="button">'+
								'<input id="HisSave" class="button" value="'+ IsC_lang.his_button[1] +'" type="button">'+
							'</div>');
	$("#IsCsaveHis input").css({'margin':'3px'});
	$("#HisReset")
		.css({position:'relative',left: '450px'})
		.click(function(e){
			messageSure(e);
		});
	//si possono salvare se non sono presenti dati di oggi già salvati
	if (saveData) 
		$("#HisSave").click(function(e){
			hisTrend = deleteItem(hisTrend,10);											//controlla dati da salvare
			localStorage.setItem(idIsle + typFrame +"_historytrend",uneval(hisTrend));	//salva dati
			$(this)
				.css({'color':'#999999','border-color':'#999999'})
				.unbind();
		})
	else	$("#HisSave").css({'color':'#999999','border-color':'#999999'});
	classFooter()			//posiziona cornice destra
}

function messageSure(event)			//messaggio di conferma reset dati storici
{
	$('<span class="bubble_tip">'+
		'<div class="feedbackTip bubbleTooltip yellowTip" style="opacity: 0.9;">'+
			'<div class="top"></div>'+
			'<div class="repeat">'+
				'<div>'+ IsC_lang.msgSure[0] +'</div>'+
				'<div class="centerButton">'+
					'<a id="IsCyes" class="button">'+ IsC_lang.msgSure[1] +'</a>'+
					'<a id="IsCno" class="button" >'+ IsC_lang.msgSure[2] +'</a>'+
				'</div>'+
			'</div>'+
			'<div class="bottom"></div>'+
		'</div>'+
	'</span>')
		.css({'position':'absolute','z-index':'6520000','left': event.pageX - 190 +'px','top': event.pageY +'px'})
		.appendTo('body')
		.fadeIn(200);
	$('#IsCyes').click(function()	//resetta dati trend storico
	{
		var hisTrend={};			// inizializzo parametri, nessun dato salvato
		extractDataTrend(hisTrend)	//inserisce dati donazioni
		localStorage.setItem(idIsle + typFrame +"_historytrend",uneval(hisTrend));	//salva dati
		$('span.bubble_tip').remove()
		$('#IsCwindow').remove()	//rimuove finestra storico vecchio
		openHistoryTrend()			//riapre finestra storico nuovo
	});
	$('#IsCno').click(function(){$('span.bubble_tip').remove()});	//rimuove il messaggio di conferma
}

//Funzioni CREA GRAFICO
function plotTrend(arrayData)		//crea Grafico
{
	//tabella parametri Island Control			
	$('#IsCwindow div.mainContent').append(	"<div id='IsCtrend' style='height:400px; width:680px; margin:5px'></div>"+
											"<div id='miniature'>"+
												"<ul id='IsCLegend'></ul>"+
											"</div>");
	
	var data = [];					//array dati grafico
	var plot;						//dati grafico
	$.each(arrayData, function()	//carica dati su array per il grafico
	{
		data.push(this);
	});
	//opzioni grafico
	var options ={ 
		series: {	lines: { show: true, steps: true},
					points: { show: true, radius:3, fillColor:"#FFFBEC" }
				},
		grid: 	{ 	hoverable: true,
					mouseActiveRadius: 10,
					backgroundColor: "#FFFBEC"
				},
		legend: {	show: false,
					sorted: "ascending",
					position:"nw"
				},
		xaxis:	{	mode: "time",
					timeformat: "%d %b",
					minTickSize: [1,'day']
				},
		yaxis:	{	min: 0,
					tickFormatter:  function suffixFormatter(val, axis) 
						{
							if (val >= 1000)
							return (val / 1000).toFixed(axis.tickDecimals) + " k";
							else
							return val.toFixed(axis.tickDecimals) + "";
						},
				},	
		}
	options.xaxis.monthNames = IsC_lang.month;
	//html per scegliere le serire da visualizzare nel gafico
	var i=0;
	$.each(data, function() {
			this.color = i;
			++i;
			l = this.label;
			$('#IsCLegend').append('<li>'+
										'<div class="IsCcolor">'+
											'<input name="' + l + '" id="' + l + '" type="checkbox" checked="checked" />'+
										'</div>'+ l +
									'</li>');
	});
	$('#IsCLegend li').css({'display':'inline-block','margin':'0px 2px','width':'80px','overflow':'hidden','text-overflow':'ellipsis','white-space':'nowrap'});
	$('#IsCLegend li div.IsCcolor').css({'display':'inline','height':'14px','width':'24px','margin':'1px','border':'1px solid #ccc','padding':'1px'});
	$('#IsCLegend li div.IsCcolor input').css({'margin':'5px 2px 6px 2px','vertical-align':'middle'});
	//evento scelta dati
	function plotChecked() {
		var checkedData = [];
		$('#IsCLegend input:checked').each(function() {
			for (var i = 0; i < data.length; i++) {
				if (data[i].label === this.name) {
					checkedData.push(data[i]);
					return true;
				}
			}
		});
		plot = $.plot($('#IsCtrend'), checkedData, options);
	}
	//quando il mouse passa sopra ad un punto del grafico visualizza il dato
	var previousPoint = null;
	$('#IsCtrend').bind("plothover", function(event, pos, item) {
		if (item) {
			if (previousPoint != item.datapoint)
			{
				previousPoint = item.datapoint;
				$("#IsCtooltipFlot").remove();
				var html = 	'<div>'+ item.series.label +'</div>'+
							'<div>'+ displayDate(item.datapoint[0]) +' ' + replaceNum(item.datapoint[1],true) + '<img src="skin/resources/icon_wood.png" height="10px" width="15px">' ;
				showTooltip(item.pageX, item.pageY, html,item.series.color);
			}
		} 
		else 
		{
			$("#IsCtooltipFlot").remove();
			previousPoint = null;
		}
	});
	//scrive tooltip del grafico
	function showTooltip(x, y, contents, color) {
		$('<div id="IsCtooltipFlot">' + contents + '</div>')
			.css({position:'absolute', display:'none', top: y + 5, left: x + 15, border:'1px solid #fdd', padding:'2px', backgroundColor: color, color:'#000', opacity:0.80, 'z-index':'100000',})
			.appendTo("body")
			.fadeIn(200);
	}
	plotChecked();										//inserisce le serire nel grafico
	$('#IsCLegend input').change(plotChecked);			//evento cambia dati nel grafico
	var j = 0;
	var dataSeries = plot.getData();
	$('#IsCLegend li div.IsCcolor').each(function(){	//mette il colore nella scelta dati
		$(this).css({'background-color': dataSeries[j].color});
		j++;
	});
	//visualizza tabella con tutti dati quando nella legenda passi sopra ad un giocatore
	$('#IsCLegend li').hover(
		function(){
			var imgW = '<img src="skin/resources/icon_wood.png" height="8px" width="12px">';
			var namePly = $(this).text();
			var offset = $(this).offset();
			var htmlTot ='';	//totali tabella
			var html='<table>'+
						'<tr>'+
							'<th>'+ IsC_lang.tab_head[0] +'</th>'+
							'<th>'+ IsC_lang.tab_head[1] +'</th>'+
							'<th>'+ IsC_lang.tab_head[2] +'</th>'+
						'</tr>';
			$.each(data,function(){
				if(this.label == namePly)
				{
					var prevItem = this.data[0][1];	//donazione precedente impostata con primo valore serie
					var diff;						//differenza donazioni
					$.each(this.data,function(){	//estrapolo i dati dalla serire selezionata
						diff = this[1] - prevItem;
						diff = diff <= 0? '': replaceNum(diff,true) + imgW;
						html += '<tr>'+			//creo linea tabella
									'<td >'+ displayDate(this[0]) +'</td>'+
									'<td class="IsCdon">'+ replaceNum(this[1],true) + imgW +'</td>'+
									'<td class="IsCdon">'+ diff +'</td>'+
								'</tr>';
						prevItem = this[1];
					});
					//calcola il tempo e le donazioni fatte nel grafico
					var lstItem = this.data.length-1														//ultimo dato
					var incDay =  Math.round((this.data[lstItem][0] - this.data[0][0])/(1000*60*60*24));	//differenza giorni
					var incDon = Math.ceil(this.data[lstItem][1] - this.data[0][1]);						//differenza donazioni
					if (incDay > 0)
					{
						htmlTot += '<div class="IsCtotal">'+ IsC_lang.tot_trend[0]+  
							' <span style="font-weight: bold">'+ replaceNum(incDon,true) + imgW +'</span>'+
							IsC_lang.tot_trend[1]+
							' <span style="font-weight: bold">'+ incDay +'</span>'+
							IsC_lang.tot_trend[2] +'</div>';
					}			
					return false;	//esce dal ciclo una volta che ha trovato il giocatore
				}
			});
			html +='</table>'+ htmlTot;

			$('<div id="IsCtablePlayer">'+ html +'</div>')
				.css({position:'absolute', display:'none', border:'1px solid #fdd', padding:'2px', backgroundColor: $(this).find('div.IsCcolor').css('background-color'), color:'#000', opacity:0.90, 'z-index':'100000'})
				.appendTo($('body'))
				.fadeIn(200);
			var heightTable = parseInt($('#IsCtablePlayer').css('height'));
			$('#IsCtablePlayer ').css({left: offset.left-10 +'px', top: (offset.top - heightTable -10) +'px'})				
			$('#IsCtablePlayer td').css({'padding':'0px 2px','width':'70px'});
			$('#IsCtablePlayer td.IsCdon').css({'text-align':'right'});
			$('#IsCtablePlayer th,#IsCtablePlayer div.IsCtotal').css({'text-align':'center'});
		},
		function()	{$('#IsCtablePlayer').remove()}
	);
	
}

//Funzioni UTILITA' GRAFICO
function lastItem(aryTr,nDay)		//controlla se si può salvare un altro dato
{ 
	var lstDt=0;
	$.each(aryTr, function() //cerca ultima data
	{
		var itemData= this.data[this.data.length-1][0];
		if (lstDt < itemData) lstDt = itemData;
	});
	
	lstDt = lstDt + (nDay *24*60*60*1000);	//aggiungo i giorni di intervallo
	var actDate = unsafeWindow.dataSetForView.serverTime * 1000
	
	//  ;
	var lastDate = new Date(lstDt)
	lastDate = new Date(lastDate.getFullYear(),lastDate.getMonth(),lastDate.getDate(),0,0,0)
	return lastDate.getTime() < actDate		//true se bisogna salvare le donazioni
}

function extractDataTrend(rTrend)	//estrapola dall'array playerPar i dati necessari al Trend
{
	var actDate = unsafeWindow.dataSetForView.serverTime * 1000
	$.each(playerPar, function()	//controlla il numero dei dati esistenti e salva la data per eliminare i dati
	{
		if (!rTrend[this.id])	//inizializza trend player
		{
			rTrend[this.id] = {data:[]};
		}
		rTrend[this.id]['data'].push([actDate,this.wood]);	//donazione giocatore
		rTrend[this.id]['label'] = this.name;	//nome giocatore
	});
}

function deleteItem(arrayT,maxItem)	//controlla quantità dati trend salvati
{
	//controllo la quantità dei dati inseriti
	var delData = 0;
	$.each(arrayT, function()	//controlla il numero dei dati esistenti e salva la data per eliminare i dati
	{
		if(this.data.length > maxItem) 
		{
			delData = this.data[0][0]
			return false;
		}
	});
	if (delData > 0)	//cancella il più vecchio valore se si supera il massimo dei valori da registrare
	{
		$.each(arrayT, function()	//cancella la data più vecchia
		{
			if(this.data[0][0] <= delData) this.data.shift()

		});
		var arrayR={};
		$.each(arrayT, function(id,val)	//cancella serie di dati vuoti
		{
			if(this.data.length > 0) arrayR[id]= val;	//se la serie contiene dati la copia
		});
		return arrayR		//array ripulito da giocatori senza dati
	}
	return arrayT
}

// Funzioni FINESTRA MENU LATERALE
function windowTabMenu(titleTab)	//crea finestra del menu a scomparsa
{			
	$('#IsCmenu').after(""+
	"<div id='IsCwindow' class='mainContentBox'>"+
		"<div class='header mainHeader'>"+
			"<h3>"+ titleTab +"</h3>"+
			"<div class='close'></div>"+
		"</div>"+
		"<div class='scroll_disabled'></div>"+
		"<div class='mainContent'></div>"+
		"<div id='IsCfooter' class='ft footer'></div>"+
	"</div>");
	//stile pulsanti ed eventi
	$('#IsCwindow').css({'position':'absolute','left':'229px','top':'39px'});
	$('#IsCwindow div.mainHeader h3').css({'font-weight':'bold','color':'#7E4A21'});
	$('#IsCwindow .mainHeader').css({'font-weight':'bold','line-height':'20px'});
	$('#IsCwindow div.close').css({'position':'absolute','top':'5px','left':'705px','background-position':'-161px 0px'})
		.hover( function(){$(this).css({'background-position':'-161px -17px'})},
				function(){$(this).css({'background-position':'-161px 0px'})})
		.click(function(){
			$('#IsCwindow').remove()
			$('#IsCmenu li').show('slow');
		});
}

function classFooter()	//posiziona la cornice destra
{
	var footer = $('#IsCfooter').position()		//posizione cornice inferiore per sapere l'altezza finestra
	$('#IsCwindow .scroll_disabled').css({'position':'absolute','height': (footer.top - 26) +'px' ,'top':'26px','left':'722px'});
}

//Funzioni UTILITA'
function getParIsle(reset)	// get parameter of the island DA VALUTARE SE ELIMINARE
{
	var Par = eval(localStorage.getItem(idIsle + "_isle"));
	if (Par == null || reset==true) 	// Init parameter
	{
		Par={resource:{wrk:10, lvl:100},tradegood:{wrk:10, lvl:100},allDonation: false};
	}
	return Par;
}

function displayDate(nDate)	//da numero Data crea stringa giorno mese anno ed ora in apice con testo piccolo
{
	var dt = new Date(nDate);
	return dt.getDate() +'.'+ IsC_lang.month[dt.getMonth()] +' <sup style="font-size:9px">'+ numDate(dt.getHours()) +":"+ numDate(dt.getMinutes())+'</sup>';
}

function numDate(num)			//imposta i numeri sempre a due caratteri 1=01 12=12
{
	if (num < 10) num = "0" + num;
	return num
}

function replaceNum(num,apx) 					// trasforma un numero 123456 in una stringa con formato 123,456 
{
	separator = unsafeWindow.LocalizationStrings.thousandSeperator;
	var sign=(num < 0)? '-':'';
	var multi ='';
	if (apx && num> 1000000)
	{
		num= parseInt(num/1000);
		multi = IsC_lang.thousand;
	}
	num = Math.abs(num);
	var string = String(Math.abs(num));
	for ( j=string.length-3 ; j > 0; j = j-3)
		{string = string.substring(0 , j) + separator + string.substring(j , string.length)}
	return sign + string + multi;
}