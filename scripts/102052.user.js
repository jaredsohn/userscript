// ==UserScript==
// @name 	Ikariam: CT tool
// @version	1.05
// @author 	Phate
// @description    	Once you visit the museum, you can look at players who have a CT with you.
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
//
// @history	1.05 aggiornato per le versione 0.5.3 di Ikariam.
// @history	1.04 aggiornato per le versione 0.5.1 di Ikariam.
// @history	1.03 Added CT in the member list of the embassy.
// @history	1.02 BugFix: highscore page does not display all players with CT.
// @history	1.01 Added CT in the member list of the alleance.
// ==/UserScript==
var CAT_loading;
var nCatEvent=[];		//array eventi
var listCAT;			//array lista accordi culturali

$(window).ready(function() 
{

	var page = $('body').attr('id');
	if(page=='city')	
	{
		$('body #js_tab_museumTreaties').live('click',function(){
			nCatEvent=[1];			//nel Museo controlla accordi culturali
			setEvent()
		});
		$('body #js_tabEmbassyMembers').live('click',function(){
			nCatEvent=[5];			//nell'Ambasciata inserisce gli accordi culturali nella lista membri
			setEvent()
		});
	}
	else if(page=='island')	
	{
		$('#cities').click(function()
		{
			nCatEvent=[4];			//pagina isola: nei dettagli inserisce icona accordo culturale
			setEvent()
		});
	}
	$('#GF_toolbar a[href*=highscore]').click(function() 
	{
		nCatEvent=[3];			//finestra classifica: inserisce icona accordi culturali
		setEvent()
	});
	$('body #allyInfoSidebar a.button').live('click',function(){
		nCatEvent=[5];				//lista membri alleanza inseirsce gli accordi culturali
		setEvent()
	});
	
});
// FUNZIONI PER EVENTI
function setEvent()					//imposta ciclo di 1 secondo per controllare la fine del caricamento finestra
{
	clearInterval(CAT_loading);
	if(nCatEvent.length>0)	CAT_loading = setInterval(mainEvent,1000,nCatEvent);
}

function mainEvent()				//alla fine del caricamento esegue le funzioni selezionate
{
	if ($('#loadingPreview').css('display')=='none')
	{
		clearInterval(CAT_loading);								//cancello ciclo tempo
		if ($.inArray(1,nCatEvent)>=0) museumSet()				//lista accordi culturali
		else if ($.inArray(2,nCatEvent)>=0) readCAT()			//cambiando pagina legge nuovi accordi culturali
		else if ($.inArray(3,nCatEvent)>=0) highscoreSet()		//finestra classifica: inserisce accordi culturali
		else if ($.inArray(4,nCatEvent)>=0) islandDetailSet()	//pagina isola: visualizza icona accrodi culturale nei dettagli giocatore
		else if ($.inArray(5,nCatEvent)>=0) listAllySet()		//finestra alleanza o finestra ambasciata: visualizza icona accrodi culturale nele azioni degli alleati
		nCatEvent=[]	//resetto eventi
	}
}

function museumSet()				//lista accordi culturali
{
	listCAT = eval(localStorage.getItem('CAT_list'));	//carica lista accordi culturali
	if ($.isArray(listCAT) == false) listCAT = [];
	readCAT();
	$('#tab_museumTreaties div.paginator a').click(function()
	{	
		nCatEvent.push(2);		//valore 2 per leggi lista accordi culturali
		setEvent()
	});
	//inserisco pulsante reset accordi culturali
	$('#tab_museumTreaties h3:first').append('<input id="CATreset" class="button" value="Reset CAT" style="position:absolute; width:75px; left:4px; top:8px">')
	$('#CATreset').click(function(){
		listCAT = [];
		readCAT();
	});
}

function readCAT()
{
	$('#tab_museumTreaties a.writeMsg').each(function(){
		var idPly = $(this).attr('href').replace(/(&receiverId=|&position=)/gi,'{').split('{')[1] *1;
		if ($.inArray(idPly,listCAT)<0) listCAT.push(idPly)	//se non esiste nell'array lo inserisce
	});
	localStorage.setItem('CAT_list',uneval(listCAT));				//salva lista accordi culturali
}

function highscoreSet()				//finestra classifica inserisce accordi culturali
{
	if ($.isArray(listCAT) == false) listCAT = eval(localStorage.getItem('CAT_list'));	//carica lista accordi culturali
	
	$('#tab_highscore a[href*=sendIKMessage]').each(function()
	{
		var idPly = $(this).attr('href').replace(/(&receiverId=|&backgroundView)/gi,'{').split('{')[1] *1;	//estraggo l'Id del giocatore
		if ($.inArray(idPly,listCAT)>=0)	$(this).before('<img src="/skin/museum/icon32_culturalgood.png" height="18" width="18" />');
	})
	$('#tab_highscore form').submit(function()	//evento click pulsante invia
	{
		nCatEvent=[3];			//finestra classifica: inserisce icona accordi culturali
		setEvent()
	});
	$('body #dropDown_js_highscoreOffsetContainer li').live('click',function(){		//evento click box numero classifica
		nCatEvent=[3];			//finestra classifica: inserisce icona accordi culturali
		setEvent()
	});
	$('body #dropDown_js_highscoreTypeContainer li').live('click',function(){		//evento click box tipo di classifiche
		nCatEvent=[3];			//finestra classifica: inserisce icona accordi culturali
		setEvent()
	});

}

function islandDetailSet()	//pagina isola: visualizza icona accrodi culturale nei dettagli giocatore
{
	var nodePly = $('#js_selectedCitySendMessage')
	if(nodePly.length > 0)
	{

		var idPly = nodePly.attr('href').replace(/(&receiverId=|&isMission)/gi,'{').split('{')[1] *1;
		if ($.isArray(listCAT) == false) listCAT = eval(localStorage.getItem('CAT_list'));	//carica lista accordi culturali
		if ($.inArray(idPly,listCAT)>=0) 
			$('#sidebar span.indicator:first').before('<img src="/skin/museum/icon32_culturalgood.png" style="position: absolute; left:5px; top:-3px"/>');
	}
}

function listAllySet()		//finestra alleanza: visualizza icona accrodi culturale nele azioni degli alleati
{
	if ($.isArray(listCAT) == false) listCAT = eval(localStorage.getItem('CAT_list'));	//carica lista accordi culturali
	$('#allyMemberList a.message').each(function()
	{
		var idPly = $(this).attr('href').replace(/(&receiverId=|&backgroundView)/gi,'{').split('{')[1] *1;	//estraggo l'Id del giocatore
		if ($.inArray(idPly,listCAT)>=0)	$(this).parent().append('<img src="/skin/museum/icon32_culturalgood.png" height="20" width="20" style="position:absolute; margin-left:4px"/>');
	})
	$('div.paginator').click(function()
	{
		nCatEvent=[5];			//lista alleati: inserisce icona accordi culturali
		setEvent()
	})

}
