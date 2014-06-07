// ==UserScript==
// @name 	Ikariam: Ada Kontrol v.1
// @author 	Phate
// @version	3.4
// @description    	www.ikariam.forumm.biz daha çok içerik ve eklenti için
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// @require 		http://userscripts.org/scripts/source/57756.user.js
//
// @history	3.4 Add link to agora'
// @history	3.4 Update the script with userscripts.org.
// @history	3.4 Improve the code for saving data and the structure of the script.
// ==/UserScript==

var lversion = "3.4";
var urlscript = "http://userscripts.org/scripts/show/52047";
ScriptUpdater.check(52047, '3.4');

// Original script made by Wiisley (Leecher Checker v 1.2.3)

// Changelog:
// 	Formula di calcolo:	Legna da donare = ( Ql * lavoratori ) + ( Qm * Livello Municipio)
//	Per ogni bene di lusso o falegnameria si possono impostare le quote per lavoratori (Ql) e livello municipio (Qm).
//
//	Nella schermata dell'isola vengono salvati i giocatori in vacanza o inattivi
//	Nella schermata delle risorse all'inizio della tabella ci sono le statistiche.
//	Nella tabella vengono colorati i giocatori in base alle donazioni e nella colonna delle donazioni viene aggiunto 
//		il credito/debito del giocatore.
//
//	3.4		Inserito collegamento ad agorà dell'isola
//			Aggiornamento dello script con userscripts.org.
//			Migliorato il codice per il salvataggio dati e la struttura dello script.
//
//	3.3.5	Inserita lingua francese.
//			BugFix: errore sull'isola in caso di errore nella pagina.
//
//	3.3.4	Migliorato la ricerca della risorsa di lusso dell'isola per il link.
//			Rivisto nelle statistiche il calcolo delle quote per ragiiungere il prossimo livello.
//			BugFix: Nel caso si inserissero in entrambe le quote il valore zero, lo script si bloccava.
//			Inserito nuovo link per il tempio vicino all'icona Mostra Isola.
//			Compatibile con la versione 0.3.2 di Ikariam.
//
//	3.3.3	BugFix: lo script non aggiornava i giocatori inattivi o in vacanza se non si visualizzavano i nomi dei giocatori nell'isola.
//			Inserita nuova function myIsland per la ricerca delle proprie isole.
//			Migliorato il codice per la ricerca dell'ID isola.
//			BugFix: Nelle Quote per inserimento valori non numerici o 0, non eseguiva i calcoli correttamente.
//			BugFix: Quando un player ha piu' di una citta' sbagliava i calcoli delle donazioni.
//			BugFix: Errore su funzione MyIsland e Main per messaggio di errore su visualizzazzione Isola.
//
//	3.3.2	Fix testi in spagnolo.
//
//	3.3.1	Aggiunto link diretto alle risorse dell'isola nell'icona della visualizzazione isola.
//			Modificato il controllo dell'update. Adesso avviene 1 volta al giorno e avvisa l'utente tramite messaggio in tutte le pagine.
//			Inserita la possibilita di evitare il debug.
//			BugFix: Corretto l'errata visualizzazione del nome del player quando la citta e occupata.
//			Aggiunta lingua spagnola, polacca e russa.
//
//	3.3		Nuova funzione che visualizza il nome dei giocatori nella visuale dell'isola.
//			Nella pagina opzioni e possibile scegliere se visualizzare o no i nomi dei giocatori nell'isola.
//			Bugfix: se nel riepilogo eventi recenti si cliccava su una citta lo script restituiva un errore.
//			Bugfix: corretto errore di testo nella lingua italiana.
//			Il controllo di versioni recenti adesso avviene solo nella pagina delle opzioni.
//			Modificato pulsante che nasconde info nella tabbella donazioni.
//
//	3.2.1	ID non piu disponibili nella versione finale di Ikariam 0.3.1, adesso per salvare i dati si usa il nome del player.
//			BugFix: selezionando una citta diversa da quella presente nell'isola, entrando nelle risorse generava un errore.
//				In questo caso la data di aggiornamento non viene messa sopra la selezione dei lavoratori ma sopra le info dello script.
//			Aggiunto linguaggio Italiano e Inglese by paul93.
//			Aggiunto richiesta controllo versione script.
//
//	3.2		Possibilita di valutare le donazioni complessive nell'isola con un flag in pagina resource o tradegood.
//				Il chekbox non fa altro che sommare le donazione dele due risorse dell'isola e dare un valutazione 
//				totale delle donazioni del player in essa.
//			Inserita nella tabella in alto a sx, la data dell'ultima visita all'altra risorsa dell'isola.
//
//	3.1.1	Aggiornato script per la versione su testserver di Ikariam v0.3.1
//			Modificato e snellito il salvataggio dei player inattivi e in vacanza.
//			Per salvare i dati dell'isola si usano gli ID e non piu il nome del player.
//			BugFix errata interpretazione dell'ampliamento di Falegnameria, Miniera, Vigna, o cava.
//			Modifiche dei testi.
//			Inserito pulsante per nascondere o visualizzare le informazioni iniziali.
//			Inserita nella tabella in alto a sx, la data dell'ultima visita all'isola
//			Migliorato la visualizzazione dei dati donazione e differenza legno. Adesso sono in colonna per bene.
//
//	3.1 	Prima stesura

function infoError(name,er)	//with error open forum page
{ 
try
{
	var debug = GM_getValue('island_control_debug',true);
	
	if (debug != true ) return; // exit if you don't want debug script
	
	if(confirm(lang.errortxt + name + " " +  er + lang.errortxt1))
	{
		window.open("http://ikariamscript.forumfree.net/?f=7352193");
	}
}
catch(er1) 				
	{confirm(er1);}
}

/**
*	Parses a string of format 123,456 to an int in format 123456
*/
function toInt(string)	// Parses a string of format 123,456 to an int in format 123456
{
	var num=0;
	if (unitSeparator == '.')	{num = parseInt(string.replace(/\./g,""));}
	else						{num = parseInt(string.replace(/\,/g,""));}
	return num;
}

/**
*	Get number from a string
*/
function getNum_Txt(string)
{
	var temp = string.split(' '); 
	var num = 0;
	
	for( var x = 0; x <= temp.length ; x++)
	{
		if(!isNaN(parseInt(temp[x]))) 
		{
			num = parseInt(temp[x]);
			return num;
		}
	}
	return num;
}

/**
*	Search multivalue in HTML code
*/
function getMultiValue(string)
{
	var num = 0;
	var temp;
		
	temp = string.split('<br>');	
	for ( var j=0 ; j < temp.length; j++)
	{
		temp1= temp[j].split(' ');
		num += getNum_Txt(temp[j]) 
	}
	return num;
}

/**
*	Parses a string of format 123456 to an int in format 123,456 
*/
function replaceNum(num) // Parses an int of format 123456 to an string in format 123,456 
{
	var string = String(num);
	var temp = "";
	var lentxt = string.length - ((String(Math.abs(num))).length) ; // different length between String and number 
	
	for ( j=string.length ; j > lentxt; j = j-3)
	{
		if (j-3 <= lentxt ) {temp = string.substring(0 , j) + temp}
		else				{temp = unitSeparator + string.substr(j-3, 3) + temp}
	}
	return temp;
}

/**
*	Depending on how well a person donates, he gets a color:
*/
function getLeecherStatus(donated, warker, score)
{	
	if ( donated >= score ) 
		return "green";
	if ( donated >= (score - (score * 0.10))) 
		return "orange";
	return 'red';	
}

/**
 *	Returns if this number is an even number
*/
function even(number)
{
	return (number % 2) == 0
}

/**
 *	Puts cities of one person in 1 row
*/
function groupPlayers(donationList,newList)
{ 
try
{
	for (var i=0; i < donationList.rows.length; i++)
	{
		var playerName = donationList.rows[i].cells[0].innerHTML;
		if (playerName != '&nbsp;') // City belongs to previous player
		{
			newList[newList.length] = donationList.rows[i].cloneNode(true);
		}
		else // Add data to previos row
		{
			for (var j=1; j < donationList.rows[i].cells.length; j++)
			{
				if (j != 4) // Add data to row, except for donated wood
					newList[newList.length-1].cells[j].innerHTML += "<br>" +  donationList.rows[i].cells[j].innerHTML;
			}
		}
	}
}
catch(er) 				
	{infoError("function groupPlayers ",er)}
}

/**
 *	get string between two characters
*/
function getPart(string,cin,cout)
{
	var temp = string.substring((string.indexOf(cin))+1,string.indexOf(cout));	
	return temp;				
}

/**
 *	get only negative value
*/
function getNegValue(num)
{
	var temp = 0;
	
	if (num < 0) temp=num; 
	return temp;				
}

/**
 *	Search island's ID
*/
function getID(string, character)
{
		var temp= string.replace(character,"@");
		var numID = parseInt(temp.split('@')[1]);
		return numID;
}

/**
 *	trim string
*/
function trim(string)
{
	var newstring=string.replace(/\s+$|^\s+/g,"")
	return newstring
}

/**
 *	get parameter
*/
function getParam()
{	
	var Par;
	if ((GM_getValue(idisle + "_isle")) == null || (GM_getValue(idisle + "_isle")) == "") 	// Init parameter
	{
		Par={};
		Par['resource'] = {};
		Par['tradegood'] = {};
		Par['island'] = {};
		
		// Resource
		Par['resource']['wrk'] = 10;
		Par['resource']['lvl'] = 100;
		Par['resource']['date'] = '@';
		Par['resource']['typ'] = '@';
		// Tradegood
		Par['tradegood']['wrk'] = 10;
		Par['tradegood']['lvl'] = 100;
		Par['tradegood']['date'] = '@';
		Par['tradegood']['typ'] = '@';
		// Island
		Par['allDon'] = false;
		Par['island']['date'] = '@';
		Par['island']['inactive'] = {};
		Par['island']['vacation'] = {};
			
		setParam(Par);
	}
	else											// Load parameter
	{
		Par = eval(GM_getValue(idisle + "_isle"));
	}	
	return Par;
}

/**
 *	save parameter
*/
function setParam(Par)
{
	GM_setValue(idisle + "_isle",uneval(Par));
}

/**
 *	register today date
*/
function setDate()
{
	var d = new Date();
	return (d.toDateString()).split(" ")[2] + " " + (d.toDateString()).split(" ")[1] + " " + (d.toDateString()).split(" ")[3];	// format gg mmm yyyy
}


/**
 *	Colors players in the donation list accroding to their leeching
*/
function doLeecherChecker(recall)
{ 
try
{	
	var donationList = document.getElementById('resourceUsers').getElementsByTagName("tbody")[0];
	var txtdate = "";	// text for date of island and other resource of island
		
	if (recall == false)		// when table recall, not delete
	{
		newList = new Array();
		groupPlayers(donationList, newList);
		
		// empty donationList
		while (donationList.rows.length > 0)
		{
			donationList.deleteRow(0);
		}
		// Put the sorted and grouped list back
		for (var i = 0; i < newList.length; i+=1)
		{
			var newRow = donationList.insertRow(-1);
			newRow.innerHTML = newList[i].innerHTML;
			if (even(i))
				newRow.className = "alt avatar ";
			else
				newRow.className = "avatar ";
		}
			
		// Add line for date of the script
		GM_addStyle('#recData {font-size: 10px;}');
		var ikMain = document.getElementById('setWorkers');
		if (ikMain == null) ikMain = document.getElementById('resourceUsers');	// if setworkers don't exist
		
		var ikNewElement = document.createElement('div');
		ikNewElement.setAttribute('id','recData');
		ikMain.parentNode.insertBefore(ikNewElement, ikMain); txtdate
		document.getElementById("recData").innerHTML = "<span id='dateIsland'></span><span id='dateResource'></span>";
	}
		
	islePar[page]['typ'] = document.getElementById('mainview').getElementsByTagName("h1")[0].textContent	// caption of resource
		
	// If store data of other resourse save caption
	if (page == 'tradegood') {var othpage = 'resource';}	// search other island's resource 
	else {othpage = 'tradegood';}
		
	if (islePar['allDon'] == true && islePar[othpage]['date'] != "@")	// Add date store donation of other resource
	{
		var txtdateRe = lang.dateresource + islePar[othpage]['typ'] + ": " + islePar[othpage]['date'];
		document.getElementById("dateResource").innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;" + txtdateRe;
	}
	else 
	{
		document.getElementById("dateResource").innerHTML = "";	// cancel date of other resource
		islePar['allDon'] = false;
	}
		
	// Get info of the player - totLevel townHall + totWarker + totDonated
	islePar[page]['player']={};	// delete old value
	for ( var j = 0; j < donationList.rows.length; j++)
	{
		var donated = toInt(donationList.rows[j].cells[4].textContent);
		var warker =0;		
		var lvlcities =0; 	
			
		// Add level and warker of the player when + cities
		var city = donationList.rows[j].cells[3].innerHTML.split('<br>');
		for( var jj = 0; jj < city.length; jj++)
		{
			warker += parseInt(city[jj]);
			lvlcities += getNum_Txt(donationList.rows[j].cells[2].innerHTML.split('<br>')[jj]);
		}
			
		// Save donation player
		var player = donationList.rows[j].cells[0].textContent;
		var score = ((islePar[page]['wrk'] * warker)+(islePar[page]['lvl'] * lvlcities));	// Calcolate how player must donate
		islePar[page]['player'][player] = donated - score;									// How player  donated in this resource
			
		if (recall == false)		// when table recall, not insert new HTML
		{
			donationList.rows[j].cells[4].innerHTML= 
				"<tr>"+
					"<td width='40%'>"+ replaceNum(donated) +"</td>"+
					"<td width='30px'><img src='skin/resources/icon_wood.gif' height='20' width='25'></td>"+
					"<td id='wooddnt"+ j +"' style='font-size:10px'  width='50%'></td>"+ 
				"</tr>";
		}
			
		GM_addStyle('td.tooltip span {display:none; padding:2px 3px; margin-left:1px; width:150px;}');
		GM_addStyle('td.tooltip:hover span{display:inline; position:absolute; background:#ffffff; border:1px solid #cccccc; color:#6c6c6c;}');
			
		// get other donation in tradegood or resource
		if (islePar['allDon'] == true)
		{
			if ( !isNaN(islePar[othpage]['player'][player])) 	donated +=  islePar[othpage]['player'][player];		// How player  donated in all resources
		}					
			
		if ( (donationList.rows[j].style.color != "gray") && (donationList.rows[j].style.color != "royalblue") )	// if recall control, not color inactive or vacation player
		{ 
			donationList.rows[j].style.color = getLeecherStatus(donated, warker, score);	// Color leecher
		}
			
		if (islePar['allDon'] ==true)	// control selection of donation
		{
			var txtTooltip = "<div id='thiscaption"+ j +"'>" + islePar[page]['typ'] + " = " + replaceNum(islePar[page]['player'][player]) + "</div>" +
							 "<div id='othercaption"+ j +"'>" + islePar[othpage]['typ'] + " = " + replaceNum(islePar[othpage]['player'][player]) + "</div>";
			
			document.getElementById('wooddnt'+ j ).innerHTML = "(" + replaceNum(donated - score) +")<span>"+ txtTooltip + "</span></a>";
			document.getElementById('wooddnt'+ j ).setAttribute('class','tooltip');
				
			if ( islePar[page]['player'][player] >= 0) document.getElementById('thiscaption'+ j ).style.color="green";		// color this donation tooltip
			else document.getElementById('thiscaption'+ j ).style.color="red";
			if ( islePar[othpage]['player'][player] >= 0) document.getElementById('othercaption'+ j ).style.color="green";	// color other donation tooltip
			else document.getElementById('othercaption'+ j ).style.color="red";
		}
		else document.getElementById('wooddnt'+ j ).innerHTML = "("+ replaceNum(donated - score) +")";	// Add difference donated
	}
		
	// Save date of player's donation
	var d = new Date();
	islePar[page]['date'] = setDate(); // date restore donation
		
	// Save parameter of the island
	setParam(islePar);
		
	if (recall == true) return;	// if recall not replace inactive or vacation player 
	
	if (islePar['island']['date'] == '@') // exit if you don't visit island view
	{
		alert(lang.alertisland);
		return;
	}
	else
	{
		// add Date of player's activity
		var txtdateIs = lang.dateisland + islePar['island']['date'] ;
		document.getElementById("dateIsland").textContent = txtdateIs
	}
		
	// Search inactive or vacation Cities		
	for (j = 0; j < donationList.rows.length; j++)
	{
		player = donationList.rows[j].cells[0].textContent;
			
		// Inactive player
		for ( var ji=0; ji< islePar['island']['inactive'].length; ji++)
		{
			if (player == islePar['island']['inactive'][ji])	// If player inactive
			{							
				donationList.rows[j].style.color = "gray";   				// color
				donationList.rows[j].cells[0].innerHTML = player + " (i)";	// tag
				break;
			}
		}
			
		// Vacation player
		for ( var jv=0; jv< islePar['island']['vacation'].length; jv++)
		{
			if (player == islePar['island']['vacation'][jv])	// If player inactive
			{							
				donationList.rows[j].style.color = "royalblue";				// color
				donationList.rows[j].cells[0].innerHTML = player + " (v)";	// tag
				break;
			}
		}
	}
}
catch(er) 				
	{infoError("function doLeecherChecker ",er)}
} 

/**
 *	Returns the leecher info text
*/
function getLeecherInfo(cities)
{ 
try
{	
	var imgw = "<img src='skin/resources/icon_wood.gif' height='10' width='15'>"	// wood image
	var donationList = document.getElementById('resourceUsers').childNodes[3].getElementsByTagName("tbody")[0];
		
	var donate = 0, Vdonate = 0, Adonate = 0;
	lvl_ary = new Array();
	wrk_ary = new Array();
	dnt_ary = new Array();
	var totlvl = 0, totwrk = 0;
		
	for (var j = 0; j < donationList.rows.length; j++)
	{		
		lvl_ary[j] = getMultiValue(donationList.rows[j].cells[2].innerHTML);
		wrk_ary[j] = getMultiValue(donationList.rows[j].cells[3].innerHTML);
		dnt_ary[j] = toInt(donationList.rows[j].cells[4].textContent);
			
		// all donated
		donate += dnt_ary[j];
		if ((donationList.rows[j].cells[0].innerHTML.split('(i)').length) <= 1 )
		{
			if ((donationList.rows[j].cells[0].innerHTML.split('(v)').length) > 1 )
			{ 	
				if (islePar['allDon'] == true) Vdonate += getNegValue(toInt(document.getElementById('thiscaption'+ j ).textContent.split(" = ")[1]));
				else Vdonate += getNegValue(toInt(getPart(document.getElementById('wooddnt'+ j ).textContent,'(',')')));
			}
			else
			{
				if (islePar['allDon'] == true) Adonate += getNegValue(toInt(document.getElementById('thiscaption'+ j ).textContent.split(" = ")[1]));
				else Adonate += getNegValue(toInt(getPart(document.getElementById('wooddnt'+ j ).textContent,'(',')')));
			}
				
			// total warkers and level townHall
			totlvl += lvl_ary[j];
			totwrk += wrk_ary[j];
		}
		else
		{
			// Player inactive
			lvl_ary[j] = 0;
			wrk_ary[j] = 0;
			dnt_ary[j] = 0;
		}
	}  
		
	var avglvl = parseInt(totlvl / cities);			// avarage level of the townHall	
	var Reslvl = parseInt(document.getElementById('resUpgrade').childNodes[3].childNodes[3].innerHTML.split("</span>")[1]);	// Check deposite level
		
	if ( !isNaN(Reslvl) ) // Deposit not upgrade
	{
		var txtwood;	
		var wood = document.getElementById('resUpgrade').childNodes[3].childNodes[11].innerHTML.split("</span>")[1];	// Check wood donated
		var woodlvl = document.getElementById('resUpgrade').childNodes[3].childNodes[7].innerHTML.split("</span>")[1];	// Check wood for next level
		var wooddiff = toInt(woodlvl) - toInt(wood);		// necessary wood for next level
		
	
		txtwood = lang.stat1 +" <b>" + (Reslvl+1) + "</b> "+ lang.stat2 +" <b>"+ replaceNum(wooddiff) +"</b> "+ imgw + " ";
			
		if ((wooddiff + Adonate) <= 0)						// only donated wood of active player 
		{
			txtwood += lang.stat31;
		}
		else if ((wooddiff + Adonate + Vdonate) <= 0)		// donated wood of the player active and vacation  
		{
			txtwood += lang.stat32;
		}
		else 												// calculate new score for next level
		{
			if (islePar[page]['wrk'] <= 0 || islePar[page]['lvl'] <= 0) {return;}	// if yuor share is all 0 value
				
			var nwscorewrk = islePar[page]['wrk'];
			var nwscorelvl = islePar[page]['lvl']
			if (islePar[page]['wrk'] > 0) {var K = islePar[page]['lvl'] / islePar[page]['wrk'];}// factor lvl/wrk score	
				
			do		// Search new value for deposit Upgrading
			{
				var nwdonate = 0;
				if (islePar[page]['wrk'] > 0) 
				{
					nwscorewrk += 5;
					nwscorelvl = Math.round(nwscorewrk * K);
				}
				else
				{
					nwscorelvl += 5;
				}
				
				//if (scorelvl > 0) {nwscorelvl += 5;}
				
				for ( j = 0; j < donationList.rows.length; j++)
				{				
					nwdonate += getNegValue(dnt_ary[j] - (lvl_ary[j] * nwscorelvl) - (wrk_ary[j] * nwscorewrk));					
				}
					
				if ( (nwscorewrk - islePar[page]['wrk']) >= 1000 || (nwscorelvl - islePar[page]['lvl']) >= 1000) break;	// exit loop
				
			} while ((wooddiff + nwdonate) > 0 ); 
			
			txtwood += lang.stat33 +"<br />"+
						"<b>" + replaceNum(nwscorewrk) + "</b> " + imgw + lang.stat33wrk +
						"<b>" + replaceNum(nwscorelvl) + "</b> " + imgw + lang.stat33lvl;
		}
	}
	else	// deposit is upgrading
	{
		Reslvl = parseInt(document.getElementById('resUpgrade').childNodes[3].childNodes[5].innerHTML.split("</span>")[1]);
		txtwood = lang.statupgrd1 +" <b>" + (Reslvl+1) + "</b> "+ lang.statupgrd2;
	}
		

		
	var info = "<center>"+ lang.statinfo1 +" <b>" + cities + "</b> "+ lang.statinfo2 +" <b>" + avglvl +
		"</b>. "+ lang.statinfo3 +" <b>"+ replaceNum(donate) +"</b> " + imgw + lang.statinfo4 +" <b>" + 
		replaceNum(totwrk) + "</b> "+ lang.statinfo5 + txtwood + "</center>";
		
		
	return info;
}
catch(er) 				
	{infoError("function getLeecherInfo ",er)}
} 

/**
 *	hide or show info leecher
*/
function infoHide(onClk)
{ 
try
{
	var label = GM_getValue("infoHide","-");
	
	if ((label=="-" && onClk==true) || (label=="+" && onClk==false)) 	//Hide
	{
		document.getElementById('infoButton').innerHTML = "<img src='skin/layout/down-arrow.gif' alt='+' height='10' width='10'>";
		GM_addStyle('#hideText {display:none;}');
		GM_setValue("infoHide","+");
	}
	if ((label=="+" && onClk==true) || (label=="-" && onClk==false))	//Show 
	{
		document.getElementById('infoButton').innerHTML = "<img src='skin/layout/up-arrow.gif' alt='-' height='10' width='10'>";
		GM_addStyle('#hideText {display:table-row;}');
		GM_setValue("infoHide","-");
	}
}
catch(er) 				
	{infoError("function infoHide ",er)}
}

/**
 *	Control checkbox All Donation in island
*/
function chkAllDonation(cities)
{ 
try
{
	islePar['allDon'] = document.getElementById('allDonation').checked;	// store selection of 'all donation'
	
	if (page == 'tradegood') var othpage = 'resource';	// search other island's resource 
	else othpage = 'tradegood';
		
	if (islePar[othpage]['date'] == "@" && islePar['allDon'] == true)
	{		
		islePar['allDon'] = false;
		document.getElementById('allDonation').checked = false;
		if (page == 'tradegood') var namemsg = lang.tradegood;	// search other island's resource 
		else namemsg = lang.resource;
		alert(lang.alertres1 + namemsg + ". \n "+ lang.alertres2);	//***** MIGLIORARE IL MESSAGGIO ******
	}
		
	setParam(islePar);
		
	doLeecherChecker(true);
	document.getElementById('leecherInfo').innerHTML = getLeecherInfo(cities);
}
catch(er) 				
	{infoError("function chkAllDonation ",er)}
}

function getIdIsland()	// get ID island
{ 
try
{
	var idisle = String(window.location).split('d&id=')[1] *1;
	if (isNaN(idisle))	{idisle = String(window.location).split('e&id=')[1] *1;}
	// id island into link Island view	
	if (isNaN(idisle) && document.getElementById('changeCityForm') != null)	
		{idisle = parseInt(document.getElementById('changeCityForm').innerHTML.split('?view=island&amp;id=')[1]);}
	return idisle;
}
catch(er) 	{infoError("function getIdIsland ",er)}
}

function myIsland()	// search if island is yours
{ 
try
{
	var myisle=false;
	var island = document.getElementById('cities').innerHTML;
		
	if (island == null)	{return false;}	// exit for error page
		
	var mycity = document.getElementById('citySelect').getElementsByTagName('option');
	for (var j=0; j < mycity.length ; j++) 
	{
		if (island.indexOf('city_'+ mycity[j].value) > 0) 
		{
			myisle=true;
			break;
		}
	}		
	return myisle;
}
catch(er) 	{infoError("function myIsland ",er)}
}

function getNodeViewIsland() // get main node of the icon Island view
{ 
try
{
	if (document.getElementById('cityNav')==null){return null;}
	
	var mainNode = document.getElementById('cityNav').getElementsByTagName('li')
	
	for (var j=0; j< mainNode.length; j++)
	{
		
		if (mainNode[j].getAttribute('class')=='viewIsland') {return mainNode[j];}
	}
}
catch(er) 	{infoError("function getNodeViewIsland ",er)}
}

function addlinkResource()
{ 
try
{
	var showlinkResource = GM_getValue('Island_Control_showlinkResouce',true);
	if (showlinkResource == false) {return;}	// exit if you don't want link
	
	// wood style
	GM_addStyle('div#wood_Island {position: absolute; left:1px; top:1px; display:block;}');
	GM_addStyle('div#wood_Island img {position: absolute; left:1px; top:1px; height:14px; width:17px; display:block;}');
	GM_addStyle('div#wood_Island img:hover {position: absolute; left:0px; top:0px; height:20px; width:25px; display:block;}');
	// tradegood style
	GM_addStyle('div#tradegood_Island {position: absolute; left:56px; top:1px; display:block;}');
	GM_addStyle('div#tradegood_Island img {position: absolute; left:6px; top:1px; height:14px; width:17px; display:block;}');
	GM_addStyle('div#tradegood_Island img:hover {position: absolute; left:1px; top:1px; height:20px; width:25px; display:block;}');
	// temple style
	GM_addStyle('div#temple_Island {position: absolute; left:27px; top:-20px; display:block;}');
	GM_addStyle('div#temple_Island img {position: absolute; left:3px; top:1px; height:23px; width:28px; display:block;}');
	GM_addStyle('div#temple_Island img:hover {position: absolute; left:1px; top:0px; height:29px; width:34px; display:block;}');
	
	var mainNode = getNodeViewIsland();
	if (mainNode == null) {return} // exit for invalid node HTML
	
	var idislandview = parseInt(document.getElementById('changeCityForm').innerHTML.split('?view=island&amp;id=')[1]);
	var scriptRsc = document.getElementsByTagName('script');
	for(var j=0 ; j< scriptRsc.length; j++)
	{ 
		if (scriptRsc[j].innerHTML.indexOf('tradegoodCounter') >= 0)	{var tradegood = scriptRsc[j].innerHTML.split('tradegoodCounter')[1].split('value_')[1].split('"')[0];}
	}
	if (tradegood==null) { tradegood = "gold"; }
	
	// add icon of saw mill
	var newElement = document.createElement('div');
	newElement.setAttribute('id','wood_Island');
	newElement.innerHTML = "<img src='skin/resources/icon_wood.gif'>"	
	mainNode.appendChild(newElement);
	
	// add icon of tradegood
	var newElement1 = document.createElement('div');
	newElement1.setAttribute('id','tradegood_Island');
	newElement1.innerHTML = "<img src='skin/resources/icon_"+ tradegood +".gif'>";
	mainNode.appendChild(newElement1);
	
	// add icon of temple
	var newElement1 = document.createElement('div');
	newElement1.setAttribute('id','temple_Island');
	newElement1.innerHTML = "<img src='skin/buildings/y100/temple.gif'>";
	mainNode.appendChild(newElement1);
	
	var url=String(window.location).split('?')[0];
	document.getElementById('wood_Island').addEventListener('click',function(){location.replace(url +'?view=resource&type=resource&id='+ idislandview);},true);
	document.getElementById('tradegood_Island').addEventListener('click',function(){location.replace(url +'?view=tradegood&type=tradegood&id='+ idislandview);},true);
	document.getElementById('temple_Island').addEventListener('click',function(){location.replace(url +'?view=wonder&id='+ idislandview);},true);
}
catch(er) 	{infoError("function addlinkResource ",er)}
}

// The id of the body tag contains which page you are on
var page = document.getElementsByTagName('body')[0].id;
var lang = getLanguage();
var idisle = getIdIsland()
var islePar; // = getParam();
if (unsafeWindow.LocalizationStrings != null){var unitSeparator =  unsafeWindow.LocalizationStrings['thousandSeperator'];}
else{unitSeparator = ","}

window.addEventListener('load',  function() 
{ 
try
{
	addlinkResource()		// add link of the resources on the icon island view
		
	// Check if you are at a resource deposit
	if ( (page == 'tradegood') || (page == 'resource') )
	{		
		// load parameter of the island
		islePar = getParam();
		
		// Style button for short/large info
		GM_addStyle('#infoButton {position: absolute; width:15px; height:15px; left:660px; top:10px; display:block;}');
		GM_addStyle('#msgAgora {position: absolute; left: 8px; top:8px; display:block;}');
		var cities = document.getElementById('resourceUsers').childNodes[3].getElementsByTagName("tbody")[0].rows.length; // cities number
		var imgw = "<img src='skin/resources/icon_wood.gif' height='15' width='20'>"	// wood image				
		var sethide = GM_getValue("infoHide","-");
			
		doLeecherChecker(false);
			
		var div = document.createElement('div');
		div.innerHTML = 
			"<div id='island_control' class='contentBox'>"+
				"<div id='msgAgora'><a href= '"+ String(window.location).split('?')[0] +"?view=islandBoard&id="+ idisle +"&show=1' title='"+ lang.msgAgora +"'><img src='/skin/interface/icon_message_write.gif'></a></div>"+
				"<div id='infoButton'></div>"+
				"<h3 class='header'>"+
					"<span class='textLabel'>Island_Control v"+ lversion +" <a href='"+ urlscript +"' target='_blank'>(by Phate)</a></span> "+
				"</h3>"+
				"<div class='content'>"+
					"<table>"+
						"<tr id='hideText'>"+
							"<td id='hideInfo' colspan='3'>"+ lang.infotext +"</td>"+
						"</tr>"+
						"<tr>"+
							"<td width='33%'><center><img src='/skin/smilies/ecstatic_x32.gif' /></center></td>"+
							"<td width='33%'><center><img src='/skin/smilies/happy_x32.gif' /></center></td>"+
							"<td width='33%'><center><img src='/skin/smilies/outraged_x32.gif' /></center></td>"+
						"</tr>"+
						"<tr id='hideText'>"+
							"<td style='color: green;'><center>"+ lang.info1ico +"</center></td>"+
							"<td style='color: orange;'><center>"+ lang.info2ico +"</center></td>"+
							"<td style='color: red;'><center>"+ lang.info3ico +"</center></td>"+
						"</tr>"+
							"<table cellpadding='0' cellspacing='0'>"+
								"<tr>"+
									"<th>"+ lang.scorewrk +"</th>"+
									"<td><input id='text_1' type='textfield' class='textfield' name='score_wrk' size='4' value="+ islePar[page]['wrk'] +" /> " + imgw + "</td>"+
									"<td>     </td>"+
									"<th>"+ lang.scorelvl +"</th>"+										
									"<td><input id='text_2' type='textfield' class='textfield' name='score_lvl' size='6' value="+ islePar[page]['lvl'] +" /> " + imgw + "</td>"+
								"</tr>"+
							"</table>"+
						"</tr>"+
						"<tr>"+
							"<td colspan='3'><center><input type='checkbox' id='allDonation'><b>"+ lang.chkboxvl +"</b></center></td>"+
						"</tr>"+
						"<tr>"+
							"<td colspan='3'><center>_____________________________________________________</center></td>"+						
						"</tr>"+
						"<tr>"+
							"<td colspan='3'><div id='leecherInfo'>"+ getLeecherInfo(cities) +"</div></center></td>"+
						"</tr>"+
					"</table>"+
				"</div>"+
				"<div class='footer'></div>" +
			"</div>";			
		document.getElementById('mainview').insertBefore(div, document.getElementById("resourceUsers"));
		document.getElementById('text_1').addEventListener('change',function(event){recallShare('text_1',cities);},true);
		document.getElementById('text_2').addEventListener('change',function(event){recallShare('text_2',cities);},true);
		document.getElementById('allDonation').addEventListener('change',function(event){chkAllDonation(cities)},true);
		document.getElementById('infoButton').addEventListener('click',function(event){infoHide(true)},true);
			
		// controll state of chekbox
		var chkAlldnt = islePar['allDon'];
		if (chkAlldnt == true) document.getElementById('allDonation').checked = true;
		else document.getElementById('allDonation').checked = false;				
			
		infoHide(false);	// set button that hide or show info leecher
	}
		
	// Search in the island, player inactive or in vacation
	if (page == 'island')
	{	
		// load parameter of the island
		islePar = getParam();
		
		var i = 1;	// index saves player
		var NamePly = GM_getValue('Island_Control_namePlayerView', true);	// show name of the player in the island
		var toppx = GM_getValue('Island_Control_pos_name',20);				// position the name in the icon of the city
		
		var myisle = myIsland()
		
		if (myisle == false && NamePly == false) return; // exit if island isn't yours and you don't want show player's name
		
		if (myisle == true) // reset old store of inactive and vacation player
		{
			islePar['island']['inactive'] = {};
			islePar['island']['vacation'] = {};
			islePar['island']['date'] = setDate();
			inactiveply = new Array();
			vacationply = new Array();
		}
			
		for ( j=1 ; j < 33 ; j +=2)
		{
			if (document.getElementById('cities').childNodes[j] == null)	{break}	// exit for error page
				
			var cityloc = document.getElementById('cities').childNodes[j]
				
			if (cityloc.innerHTML.split('class="claim"').length == 1)
			{
				var player = trim((document.getElementById('cities').childNodes[j].getElementsByTagName('li')[2].textContent.split(":")[1]));
				var inactive = cityloc.innerHTML.split(class="inactivity").length; // Inactive cities
				var vacation = cityloc.innerHTML.split(class="vacation").length;   // Vacation cities
				var txtplayer = player;
					
				if  (inactive > 1)
				{
					if (myisle== true) // if isle is yours
						{inactiveply.push(player);}
						
					txtplayer ="<span class='inactivity'>" + player + " (i)</span>";
				}
				else if (vacation > 1)
				{
					if (myisle== true) // if isle is yours
						{vacationply.push(player);}
						
					txtplayer ="<span class='palm'></span><span class='vacation'>" + player + " (v)</span>";
				}
					
				// Add name of the player in the island
				if (NamePly == true)
				{
					// possibile valore top da -50 -40 -30 -20 e 20
					// var toppx = new Array(-50,-40,-30,-20,20)
					GM_addStyle('#NamePlayer'+ j +' {position: relative; left:0px; top:'+ toppx +'px; display:block;}');
					var ikNewElement = document.createElement('div');
					ikNewElement.setAttribute('id',"NamePlayer"+ j);					
					cityloc.appendChild(ikNewElement);
					document.getElementById("NamePlayer"+ j).innerHTML ="<span class='textLabel'>"+
																			"<span class='before'></span>"+ txtplayer + 
																			"<span class='after'></span>"+
																		"</span>";
				}
			}
		}
			
		// Save Island Parameter
		if (myisle == true) 
		{
			islePar['island']['inactive'] = inactiveply;
			islePar['island']['vacation'] = vacationply;
			setParam(islePar);
		}
	}
		
	if (page == 'options')
	{		
		var newElement = document.createElement("div");
		newElement.setAttribute('id','optionIsland');
		newElement.innerHTML = 
			"<div class='contentBox01h'>" +
				"<h3 class='header'>"+
					"<span class='textLabel'>Island_Control v"+ lversion +" <a href='"+ urlscript +"' target='_blank'>(by Phate)</a></span> "+
				"</h3>"+
				"<div class='content'>" +
					"<table cellpadding='0' cellspacing='0'>"+
						"<tbody>"+
							"<tr>" +
								"<th id='Island_firsttxt'>"+ lang.optiontxt1 +"</th>" +
								"<td><input type='checkbox' id='optionNamePlayer'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='Island_secondtxt'>"+ lang.optiontxt2 +"</th>" +
								"<td><input type='checkbox' id='optionLinkResouce'></td>"+
							"</tr>" +
							"<tr>" +
								"<th>Debug</th>" +
								"<td><input type='checkbox' id='Island_Control_debug'></td>"+
							"</tr>" +
						"</tbody>"+
					"</table>" +
				"</div>" +
				"<div class='centerButton'>"+	
					"<span class='button'id='Islandlanguage'>"+ lang.optiontxt +"</span>"+	
				"</div>"+
                "<div class='footer'></div>" +
            "</div>";
			
		document.getElementById("mainview").insertBefore(newElement, document.getElementById("vacationMode"));
		document.getElementById('optionNamePlayer').addEventListener('change',function(event){GM_setValue('Island_Control_namePlayerView', document.getElementById('optionNamePlayer').checked);},true);
		document.getElementById('optionLinkResouce').addEventListener('change',function(event){GM_setValue('Island_Control_showlinkResouce', document.getElementById('optionLinkResouce').checked);},true);
		document.getElementById('Island_Control_debug').addEventListener('change',function(){GM_setValue('island_control_debug', document.getElementById('Island_Control_debug').checked);},true);
		document.getElementById('Islandlanguage').addEventListener('click',function(){changeLanguage();},true);
			
		// controll state of chekbox
		setChekbox('Island_Control_namePlayerView','optionNamePlayer');
		setChekbox('Island_Control_showlinkResouce','optionLinkResouce');
		setChekbox('island_control_debug','Island_Control_debug');
	}
}
catch(er) 	{infoError("Main ",er)}
},true);

function recallShare(idshare,cities) // Control value in share and recall new donation
{ 
try
{
	var share = document.getElementById(idshare).value;
	var numShare = parseInt(share);
	if (isNaN(numShare) || numShare < 0) {numShare = 0;}
	if (share != numShare) {document.getElementById(idshare).value = numShare;}
		
	if (idshare == 'text_1') {islePar[page]['wrk'] = numShare;}
	if (idshare == 'text_2') {islePar[page]['lvl'] = numShare;}
		
	setParam(islePar);
		
	doLeecherChecker(true);
	document.getElementById('leecherInfo').innerHTML = getLeecherInfo(cities);
}
catch(er) 	{infoError("function recallShare ",er)}
}

function setChekbox(idsave,id)	// control state of the checkbox
{
		var savevalue = GM_getValue(idsave,true);
		if (savevalue == false) document.getElementById(id).checked = false;
		else document.getElementById(id).checked = true;
}

function changeLanguage()
{	
	var savelang = GM_getValue('Island_controlLang')
	var inputLang = prompt(lang.optiontxt +"?            en, es, fr, it, pl, ru",savelang);
	if (inputLang == null){return;}
	
	inputLang = inputLang.toLowerCase();

	if (inputLang!="it" && inputLang!="es" && inputLang!="pl" && inputLang !="ru" && inputLang !="fr" && inputLang !="en") 
	{
		alert("The Language "+ inputLang +" is not supported")
		inputLang = "en";
	}
	GM_setValue('Island_controlLang',inputLang);
	lang = getLanguage();
	document.getElementById('Islandlanguage').textContent = lang.optiontxt
	document.getElementById('Island_firsttxt').textContent = lang.optiontxt1;
	document.getElementById('Island_secondtxt').textContent = lang.optiontxt2;
}

function getLanguage()
{
	idlang = GM_getValue('Island_controlLang')	// check storage language
	if (idlang == null)		// check browser language
	{
		idlang = navigator.language;
		GM_setValue('Island_controlLang',idlang);
	}
	if (idlang!="it" && idlang!="es" && idlang!="pl" && idlang!="ru" && idlang!="fr") {idlang = "en";}
	
	var langs = 
	{ 
		it:
		{ // Italian texts by myself:
			infotext: "I giocatori che sfruttano le risorse dell'isola devono contribuire al suo sviluppo donando legname in base "+
					"ai lavoratori e alla grandezza delle citt&agrave;. Le quote di donazione si possono impostare per " +
					"ogni falegnameria e bene di lusso." +
					"<center>Il contributo che ogni giocatore deve donare &egrave; regolato dalla seguente formula:<br />"+
					"<b>Donazione = (Ql * Lavoratori) + (Qm * LivelloMunicipio)</b><br />"+
					"<b>Ql</b> = quota per ogni lavoratore | <b>Qm</b> = quota per ogni livello del municipio</center>"+
					"<center>Legenda:</center>",
			info1ico: "Ha donato legna a sufficenza",
			info2ico: "Ha donato meno legna del dovuto, ma gli resta solo il 10% da donare.",
			info3ico: "Sfrutta le donazioni altrui",
			scorewrk: "Quota lavoratori",
			scorelvl: "Quota livello Municipio",
			chkboxvl: " Valutare tutte le donazioni fatte nell'isola dai giocatori",
			stat1:	"Per raggiungere il livello",
			stat2:	"mancano",
			stat31:	"e bastano le donazioni mancanti dei giocatori attivi.",
			stat32:	"e servono anche le donazioni mancanti dei giocatori in vacanza.",
			stat33: "ed &eacute; necessario aumentare le quote di donazione.",
			stat33wrk: " per ogni lavoratore. ",
			stat33lvl: " per ogni livello del municipio",
			statupgrd1: " Il livello",
			statupgrd2: "&egrave in costruzione.",
			statinfo1: "Nell'isola esistono",
			statinfo2: "citt&agrave; e il livello medio del municipio &eacute;",
			statinfo3: "I giocatori hanno donato in totale",
			statinfo4: " e ci sono",
			statinfo5: "lavoratori. ",
			alertisland: "Si consiglia di visitare l'isola.\n In questo modo saranno visibili i giocatori in vacanza e inattivi.",
			dateisland: " Agg. Isola: ",
			alertres1: "Si consiglia di visitare ",
			alertres2: "In questo modo sara possibile fare una valutazione complessiva delle donazioni dell'isola.",
			tradegood: " la Falegnameria",
			resource: " il Bene di lusso",
			dateresource: " Agg. ",
			errortxt: "Island_Control ha generato un errore. Per favore contattatemi su http://ikariamscript.forumfree.net/ per risolvere il problema. Phate \n\n",
			update: "nuova versione ",
			optiontxt1: "Visualizza i nomi dei giocatori nelle citt&agrave; dell'isola: ",
			optiontxt2: "Visualizza i link delle risorse nell'icona mostra isola: ",
			optiontxt: "Seleziona la lingua",
			msgAgora: "Spedisci messaggio in Agorà",
		},
			
		es:
		{ // Spanish traslate by Rohcodom
			infotext: "Los jugadores que usen los recursos de la isla, deberían contribuir a su crecimiento donando material de construcción de acuerdo a "+
					"la cantidad de trabajadores y al tamaño de sus ciudades. Las donaciones puedes ser configuradas para cada " +
					"aserradero y cada cantera de bienes de lujo." +
					"<center>La contribución que cada jugador debe donar está regulada por la siguiente fórmula:<br />"+
					"<b>Donación = (Qw * trabajador) + (Qt * nivel del muro de la ciudad)</b><br />"+
					"<b>Qw</b> = Porción por cada trabajador | <b>Qt</b> = Porción por cada nivel del muro de la ciudad</center>"+
					"<center>Simbología:</center>",
			info1ico: "¡Muy bien!",
			info2ico: "Sanguijuela, pero está a 10% de hacer lo correcto.",
			info3ico: "Sanguijuela total",
			scorewrk: "Porción por trabajador",
			scorelvl: "Porción por nivel del muro de la ciudad",
			chkboxvl: " Tomar en cuenta las donaciones globales de los jugadores en la isla",
			stat1:	"A fin de alcanzar el nivel",
			stat2:	"faltan",
			stat31:	"y los valores de las porciones actuales son los correctos.",
			stat32:	"y también se consideran las donaciones de los jugadores en modo vacaciones.",
			stat33: "y es necesario incrementar los valores de las porciones actuales:",
			stat33wrk: " por cada trabajador. ",
			stat33lvl: " por cada nivel del muro de la ciudad",
			statupgrd1: " El nivel",
			statupgrd2: " está en construcción.",
			statinfo1: "En la isla hay",
			statinfo2: "ciudades y el promedio de nivel de los muros de las ciudades es",
			statinfo3: "En total, los jugadores han donado ",
			statinfo4: " y tienen",
			statinfo5: "trabajadores. ",
			alertisland: "Es mejor que visites la isla.\n De esta forma, los jugadores inactivos y en modo vacaciones serán tomados en cuenta.",
			dateisland: " Actualización de la isla: ",
			alertres1: "Es mejor que visites ",
			alertres2: "de esta forma, será posible hacer una evaluación general de las donaciones en la isla.",
			tradegood: " el aserradero",
			resource: " la cantera de bienes de lujo",
			dateresource: " Actualizado ",
			errortxt: "Island_Control ha generado un error. Visita http://ikariamscript.forumfree.net para informar del problema. Phate72 \n\n",
			update: "Nueva versión ",
			optiontxt1: "Mostrar el nombre del jugador en la vista de la isla: ",
			optiontxt2: "Mostrar enlaces a los recursos en el icono de la isla: ",
			optiontxt: "Elegir idioma",
			// english
			msgAgora: "Send message to Agora",
		},
		
		fr:
		{ // Francais traduit par BorisLeHachoir
			infotext: "Les joueurs qui utilisent les ressources de l'île devraient contribuer à son développement par un don de matériaux de construction en fonction "+
					"du nombre de travailleurs et de la taille des villes. Les dons peuvent être configurés "+
					"pour chaque scierie et chaque tas de produits de luxe." +
					"<center>La contribution de chaque joueur est régulée par la formule suivante :<br />"+
					"<b>Donation = (Qw * travailleur) + (Qt * niveau de la ville)</b><br />"+
					"<b>Qw</b> = Partager par chaque travailleur | <b>Qm</b> = partager par chaque ville"+
					"<center>Légende :</center>",
			info1ico: "Très bien !",
			info2ico: "Radin, mais seulement 10% des ressources peuvent être données.",
			info3ico: "Gros radin.",
			scorewrk: "Donné pour chaque travailleurs",
			scorelvl: "Donné pour chaque niveau de ville ville",
			chkboxvl: "Estimer tous les dons de joueur dans l'île",
			stat1:	"Afin d'atteindre le niveau",
			stat2:	"il reste",
			stat31:	"et les dons sont suffisants.",
			stat32:	"and they serve also the donations lacking the players in vacation mode.",
			stat33: "et il est nécessaire d'ajouter les dons suivants.",
			stat33wrk: " pour chaque travailleur. ",
			stat33lvl: " tout niveau de ville",
			statupgrd1: " Le niveau",
			statupgrd2: "est en construction.",
			statinfo1: "Sur l'île, il y a",
			statinfo2: "villes et le niveau moyen des villes est de",
			statinfo3: "Les joueurs ont donné sur le tas ",
			statinfo4: " et il y a ",
			statinfo5: "travailleurs. ",
			alertisland: "Tu ferais mieux de visiter l'ile, pour que les joueurs inactifs mode vacances seront visibles.",
			dateisland: " Mise a jour de l'ile ",
			alertres1: "Tu ferais mieux de visiter ",
			alertres2: " dans le but de faire une évaluation générale de la donation de l'île.",
			tradegood: " la scierie",
			resource: " le dépot des ressources de luxe.",
			dateresource: " Mise à jour ",
			errortxt: "Il y a eu un bug. Merci de prévenir sur http://ikariamscript.forumfree.net/ pour résoudre le problème. Phate72 \n\n",
			update: "nouvelle version ",
			optiontxt1: "Afficher le nom du joueur sur l'île: ",
			optiontxt2: "Afficher les liens vers les ressources sur l'icône pour l'île: ",
			optiontxt: "Choisir la langue",
			// english
			msgAgora: "Send message to Agora",
		},
		
		ru:
		{ // Russian translate by Disfated
			infotext:     "Игроки добывающие ресурсы этого острова должны участвовать в разработке месторождений острова через пожертвования стройматериала в соответсвии с количеством рабочих, добывающих ресурсы, и размером городов.<center>Размеры пожертвований, которые должен вносить каждый игрок, определяются по следующей формуле:<br /><br /><b>Пожертвование = (Q<sub>w</sub> × ЧислоРабочих) + (Q<sub>t</sub> × УроверьРатуши)</b><br /><b>Q<sub>w</sub></b> – Взнос за каждого рабочего<br /><b>Q<sub>t</sub></b> – Взнос за каждый уровень ратуши</center><br /><center>Обозначения:</center>",
			info1ico:     "Пример для подражания!",
			info2ico:     "Халявщик (задолжал не более 10%)",
			info3ico:     "Паразитирующий дармоед",
			scorewrk:     "Взнос за каждого рабочего",
			scorelvl:     "Взнос за каждый уровень ратуши",
			chkboxvl:     " Расчитывать взносы в общем по острову",
			stat1:        "Для следующего уровня месторождения (",
			stat2:        ") необходимо ",
			stat31:       ".<br /><span style='color: green'>Текущая общая задолженность по взносам активных игроков достаточна для этого.</span>",
			stat32:       ".<br /><span style='color: orange'>Текущая общая задолженность по взносам всех игроков, включая неактивных, достаточна для этого.</span>.",
			stat33:       ".<br /><b style='color: red'>Необходимо увеличить размеры пожертвований до уровня:</b>",
			stat33wrk:    " за каждого рабочего.<br />",
			stat33lvl:    " за каждый уровень ратуши.",
			statupgrd1:   " В процессе улучшения до уровня ",
			statupgrd2:   "!",
			statinfo1:    "На острове расположено ",
			statinfo2:    " городов со средним уровнем ратуши ",
			statinfo3:    "<br />На данном месторождение за все время было пожертвовано ",
			statinfo4:    ", на нем занято ",
			statinfo5:    "рабочих.<br />",
			alertisland:  "Для отображения неактивных игроков и игроков находящихся в режиме отпуска необходимо зайти на страницу острова.",
			dateisland:   " Актуальность Остров: ",
			alertres1:    "Для того, чтобы расчитать взносы на всем острове необходимо зайти на страницу",
			alertres2:    "",
			tradegood:    " лесопилки этого острова",
			resource:     " добычи дополнительного ресурса этого острова",
			dateresource: " Актуальность ",
			errortxt:	"Во время выполнения скрипта Island_Control произошла ошибка. Пожалуйста, свяжитесь с автором для решения этой проблемы по адресу http://ikariamscript.forumfree.net/. Phate72 \n\n",
			update:	"Новая версия ",
			optiontxt1: "Показывать имена игроков на карте острова: ",
			optiontxt2: "Показывать ссылки на месторождения над изображением острова: ",
			optiontxt: "Выбрать язык",
			// english
			msgAgora: "Send message to Agora",
		},
		
		pl:
        { // Na Polski przetłumaczył Qasq
			infotext: "Gracze korzystający z wyspowych dóbr powinni składać datki na ich rozbudowę "+
				"w zależności od ilości robotników oraz poziomu ratusza. Datki należy składać na każde z dóbr z osobna tj: " +
				"na każdy tartak i kopalnię/winnicę." +
				"<center>Wysokość wpłat jest wyznaczana na podstawie formuły:<br />"+ 
				"<b>Wys. Wpłaty = (Qw * pracownik) + (Qm * poziom ratusza)</b><br />"+
				"<b>Qw</b> = Współczynnik wydobycia na pracownika | <b>Qm</b> = Współczynnik wydobycia na poziom ratusza</center>"+
				"<center>Legend:</center>",
			info1ico: "Wyśmienicie!",
			info2ico: "Krwiopijca, brakuje 10% wpłaty.",
			info3ico: "Prawdziwa pijawa.",
			scorewrk: "Wydobycie na pracownika",
			scorelvl: "Wydobycie na poziom ratusza",
			chkboxvl: " Szacowana suma datków wszystkich graczy",
			stat1:	"Potrzeba do rozbudowy na kolejny poziom",
			stat2:	"brakuje",
			stat31:	"i suma wpłat jest adekwatna do ilości aktywnych graczy.",
			stat32:	"i suma wpłat pokrywa także braki związane z obecnością urlopowiczów.",
			stat33: "i jest koniecznym zwiększyć wpłaty.",
			stat33wrk: " na każdego pracownika. ",
			stat33lvl: " na każdy poziom ratuszal",
			statupgrd1: " Poziom",
			statupgrd2: "jest ruzbudowywany/a.",
          	statinfo1: "Na wyspie są",
          	statinfo2: "Miasta i średni poziom ratuszy to",
          	statinfo3: "W sumie sponsorzy przeznaczyli ",
          	statinfo4: " i są jeszcze",
          	statinfo5: "pracownicy/ków. ",
          	alertisland: "Lepiej odwiedź wyspę. \n Dzięki temu idlerzy oraz urlopowicze zostaną uwzględnieni na liście.",
          	dateisland: " Zaktualizuj dane Wyspy: ",
          	alertres1: "Lepiej odwiedź ",
          	alertres2: "Tym sposobem zbierzesz podstawowe informacje na temat graczy i ich wpłat.",
          	tradegood: " tartak",
          	resource: " miejsce składowania/wydobycia surowca luksusowego",
          	dateresource: " Aktualizacja ",
          	errortxt: "Island_Control otrzymał kod błędu. Daj znać poprzez http://ikariamscript.forumfree.net/ w celu rozwiązania problemu. Phate72 \n\n",
          	update: "nowa wersja ",
          	optiontxt1: "Pokaż imiona graczy: ",
          	optiontxt2: "Wyświetl przydatne linki/skróty do tartaku i kopalń obok nazwy Wyspy: ",
          	optiontxt: "Wybierz język",
			// english
			msgAgora: "Send message to Agora",
		},
		
		en:
		{ // English traslate by Paul93
			infotext: "The players who use the resource of the island should contribute to its development donating building material according to "+
					"the number of workers and the size of the cities. The donation shares can be set " +
					"for every saw mille and luxury resource deposit." +
					"<center>The contribution that every player should donate is regulated by the following formula:<br />"+
					"<b>Donation = (Qw * worker) + (Qt * level of the town hall)</b><br />"+
					"<b>Qw</b> = Share by every worker | <b>Qm</b> = Share by every level of the town hall</center>"+
					"<center>Legend:</center>",
			info1ico: "Very well!",
			info2ico: "Bloodsucker, but only the 10% remains to be donated.",
			info3ico: "True bloodsucker.",
			scorewrk: "Share by worker",
			scorelvl: "Share by level of the town hall",
			chkboxvl: " Estimate all player's donations in the island",
			stat1:	"In order to reach the next level",
			stat2:	"remain",
			stat31:	"and the donations lacking the active players are enough.",
			stat32:	"and they serve also the donations lacking the players in vacation mode.",
			stat33: "and it is necessary to increase the donation shares.",
			stat33wrk: " for every worker. ",
			stat33lvl: " for every level of the town hall",
			statupgrd1: " The level",
			statupgrd2: "is under construction.",
			statinfo1: "In the island there are",
			statinfo2: "cities and the average level of the town hall is",
			statinfo3: "On the whole the players have donated ",
			statinfo4: " and there are",
			statinfo5: "workers. ",
			alertisland: "You'd better visit the island. \n In this way inactive and vacation mode players will be visible.",
			dateisland: " Update Island: ",
			alertres1: "You'd better visit ",
			alertres2: "In this way it will be possible to make a general evaluation of the donations of the island.",
			tradegood: " the saw mill",
			resource: " the luxury resource deposit",
			dateresource: " Update ",
			errortxt: "Island_Control has generated an error. Please you get through to me in http://ikariamscript.forumfree.net/ to solve the problem. Phate72 \n\n",
			update: "new version ",
			optiontxt1: "Show the player's name in the island view: ",
			optiontxt2: "Show links towards the resources over the icon for the Isle: ",
			optiontxt: "Select language",
			msgAgora: "Send message to Agora",
		},
	}
	return langs[idlang]
}

