// ==UserScript==
// @name Island_Control v3.3
// @author Phate
// @description    	A script for Ikariam v3.0.1 that colors leechers 
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

var lversion = "3.3";
var updatesite = "http://ikariamscript.forumfree.net/?f=7352142";

// Original script built by Wiisley (Leecher Checker v 1.2.3)

// Changelog:
// 	Formula di calcolo:	Legna da donare = ( Ql * lavoratori ) + ( Qm * Livello Municipio)
//	Per ogni bene di lusso o falegnameria si possono impostare le quote per lavoratori (Ql) e livello municipio (Qm).
//
//	Nella schermata dell'isola vengono salvati i giocatori in vacanza o inattivi
//	Nella schermata delle risorse all'inizio della tabella ci sono le statistiche.
//	Nella tabella vengono colorati i giocatori in base alle donazioni e nella colonna delle donazioni viene aggiunto 
//		il credito/debito del giocatore.
//
//	3.3		Nuova funzione che visualizza il nome dei giocatori nella visuale dell'isola.
//			Nella pagina opzioni e possibile scegliere se visualizzare o no i nomi dei giocatori nell'isola.
//			Bugfix: se nel riepilogo eventi recenti si cliccava su una citt� lo script restituiva un errore.
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


/**
*	Check to see if you have updated version!
*/
function check_for_update(lang)
{
GM_xmlhttpRequest(
{
	method:"GET",
	url:updatesite,
	headers:
	{
		"User-Agent":"monkeyagent",
		"Accept":"text/monkey,text/xml",
	},
	onload:function(details) 
	{
		if (details.readyState == 4) 
		{
			var update_version = details.responseText.split('content="Island_Control v')[1];
			update_version = update_version.split('"')[0];
			update_version = update_version.split(',')[0];
				
			if (update_version != lversion) 
				document.getElementById('updateVersion').innerHTML = "<a href='"+ updatesite +"' target='_blank'><font color='RED'>"+ lang.update + update_version +"</font></a>";
		}
	}
});
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/**
*	Parses a string of format 123,456 to an int in format 123456
*/
function toInt(string)
{
	var temp,result;
	temp = string.split(',');
	result = '';
	for(var i=0; i < temp.length; i++)
	{
		result += temp[i];
	}
	return parseInt(result);
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
function replaceNum(num)
{
	var string = String(num);
	var temp = "";
	var lentxt = string.length - ((String(Math.abs(num))).length) ; // different length between String and number 
	
	for ( j=string.length ; j > lentxt; j = j-3)
	{
		
		if (j-3 <= lentxt ) temp = string.substring(0 , j) + temp;
		else				temp = "," + string.substr(j-3, 3) + temp;
		
	}
	return temp;
}

/**
*	Depending on how well a person donates, he gets a color:
*/
function getLeecherStatus(donated, warker, score)
{	
	if (warker < 1) 
		return "";
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
function getParam(name,dflt,page)
{
	var idisle = getID(document.getElementById('breadcrumbs').innerHTML,"id=");	// ID of the island
	if (page == 'resource') var k = 'r ';	// select parameter of tradegood or resource
	else k = 't '	
	var temp = GM_getValue(k + idisle + "_" + name, dflt);
	return temp;
}

/**
 *	save parameter
*/
function setParam(name,value,page)
{
	var idisle = getID(document.getElementById('breadcrumbs').innerHTML,"id=");	// ID of the island
	if (page == 'resource') var k = 'r ';	// select parameter of tradegood or resource
	else k = 't '
	GM_setValue(k + idisle + "_" + name, value);
}

/**
 *	Colors players in the donation list accroding to their leeching
*/
function doLeecherChecker(page,recall,lang)
	{	
		var donationList = document.getElementById('resourceUsers').childNodes[3].getElementsByTagName("tbody")[0];
		var txtdate = "";	// text for date of island and other resource of island
		var thiscaption = document.getElementById('mainview').getElementsByTagName("h1")[0].firstChild.nodeValue	// caption of resource
		
		// If store data of other resourse save caption
		if (page == 'tradegood') var k = 'resource';	// search other island's resource 
		else k = 'tradegood';
		var chkDate = getParam("","NO DATE",k);
		if (chkDate != "NO DATE") var othercaption=chkDate.split("@")[1];
		
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
			addGlobalStyle('#recData {font-size: 10px;}');
			var ikMain = document.getElementById('setWorkers');
			if (ikMain == null) ikMain = document.getElementById('resourceUsers');	// if setworkers don't exist
			
			var ikNewElement = document.createElement('div');
			ikNewElement.setAttribute('id','recData');
			ikMain.parentNode.insertBefore(ikNewElement, ikMain); txtdate
			document.getElementById("recData").innerHTML = "<span id='dateIsland'></span><span id='dateResource'></span>";
		}
			
		var chkAlldnt = getParam("all",false,page);
		if (chkAlldnt == true && chkDate != "NO DATE")	// Add date store donation of other resource
		{		
			var chkdate = new Date(chkDate.split("@")[0]);
			caption = chkDate.split("@")[1];
			var txtdateRe = lang.dateresource + caption + ": " + (chkdate.toDateString()).split(" ")[2] + " " + (chkdate.toDateString()).split(" ")[1] + " " + (chkdate.toDateString()).split(" ")[3];
			document.getElementById("dateResource").innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;" + txtdateRe;
		}
		else 
		{
			document.getElementById("dateResource").innerHTML = "";	// cancel date of other resource
			if (chkAlldnt == true) setParam('all',false,page);
		}
			
		// Get value of parameter 
		var scorewrk = getParam('score_wrk','10',page);
		var scorelvl = getParam('score_lvl','100',page);
					
		// Get info of the player - totLevel townHall + totWarker + totDonated
		for ( var j = 0; j < donationList.rows.length; j+=1)
		{
			var donated = toInt(donationList.rows[j].cells[4].textContent);
			var warker = parseInt(donationList.rows[j].cells[3].innerHTML);
			var lvlcities = getNum_Txt(donationList.rows[j].cells[2].innerHTML);
			
			// Add level and warker of the player when + cities
			var city = donationList.rows[j].cells[1].innerHTML.split('<br>').length;
			if (city > 1)
			{
				for( var x = 1; x < city; x+=1)
				{
					warker += parseInt(donationList.rows[j].cells[3].innerHTML.split('<br>')[x]);
					lvlcities += getNum_Txt(donationList.rows[j].cells[2].innerHTML.split('<br>')[x]);
				}
			}
				
			var score = ((scorewrk * warker)+(scorelvl * lvlcities));	// Calcolate how player must donate
			var dntwood = donated - score;								// How player  donated in this resource

			// Save donation player
			var player = donationList.rows[j].cells[0].textContent;
			setParam(player,dntwood ,page);
				
			
				
			if (recall == false)		// when table recall, not insert new HTML
			{
				donationList.rows[j].cells[4].innerHTML= 
					"<tr>"+
						"<td width='40%'>"+ replaceNum(donated) +"</td>"+
						"<td width='30px'><img src='skin/resources/icon_wood.gif' alt='Legno' height='20' width='25'></td>"+
						"<td id='wooddnt"+ j +"' style='font-size:10px'  width='50%'></td>"+ 
					"</tr>";
			}
			
			// get other donation in tradegood or resource
			if (chkAlldnt == true && chkDate != "NO DATE")
			{
				var otherDnt = getParam(player,"",k);
				if ( !isNaN(otherDnt)) 	donated +=  otherDnt;			// How player  donated in all resources
			}					
			
			if ( (donationList.rows[j].style.color != "gray") && (donationList.rows[j].style.color != "royalblue") )	// if recall control, not color inactive or vacation player
			{ 
				donationList.rows[j].style.color = getLeecherStatus(donated, warker, score);	// Color leecher
			}
				
			addGlobalStyle('td.tooltip span {display:none; padding:2px 3px; margin-left:1px; width:150px;}');
			addGlobalStyle('td.tooltip:hover span{display:inline; position:absolute; background:#ffffff; border:1px solid #cccccc; color:#6c6c6c;}');
			if (chkAlldnt==true && chkDate != "NO DATE")	// control selection of donation
			{
				var txtTooltip = "<div id='thiscaption"+ j +"'>" + thiscaption + " = " + replaceNum(dntwood) + "</div>" +
								 "<div id='othercaption"+ j +"'>" + othercaption + " = " + replaceNum(otherDnt) + "</div>";
				
				document.getElementById('wooddnt'+ j ).innerHTML = "(" + replaceNum(donated - score) +")<span>"+ txtTooltip + "</span></a>";
				document.getElementById('wooddnt'+ j ).setAttribute('class','tooltip');
					
				if ( dntwood >= 0) document.getElementById('thiscaption'+ j ).style.color="green";		// color this donation tooltip
				else document.getElementById('thiscaption'+ j ).style.color="red";
				if ( otherDnt >= 0) document.getElementById('othercaption'+ j ).style.color="green";	// color other donation tooltip
				else document.getElementById('othercaption'+ j ).style.color="red";
			}
			else document.getElementById('wooddnt'+ j ).innerHTML = "("+ replaceNum(donated - score) +")";	// Add difference donated
		}
		
		// Save date of player's donation
		var d = new Date();
		setParam("", d.toDateString() + " @" + thiscaption,page);	// End of control save date
			
		if (recall == true) return;	// if recall not replace inactive or vacation player 
			
		// Search inactive or vacation Cities
		var idisle = getID(document.getElementById('breadcrumbs').innerHTML,"id=");	// ID of the island
		
		for ( x=1 ; x<=16 ; x ++)
		{			
			var recplayer = GM_getValue (idisle + " " + x); // get state of player
				
			if ( recplayer == null ) // exit if you don't visit island view
			{
				alert(lang.alertisland);
				break;
			}
			
			chkdate = new Date(recplayer);		
			if (!isNaN(chkdate))	// end of register
			{			
				// add Date of player's activity
				var txtdateIs = lang.dateisland + (chkdate.toDateString()).split(" ")[2] + " " + (chkdate.toDateString()).split(" ")[1] + " " + (chkdate.toDateString()).split(" ")[3] ;
				document.getElementById("dateIsland").textContent = txtdateIs
				 break;
			}
			
			for (j = 0; j < donationList.rows.length; j++)
			{
				player = donationList.rows[j].cells[0].textContent;
					
				if ((recplayer.substring(2)) == player)	// compare ID city
				{
					if ((recplayer.charAt(0)) == 'i')	// If player inactive
					{							
						donationList.rows[j].style.color = "gray";   					// color
						donationList.rows[j].cells[0].innerHTML = player + " (i)";	// tag
						break;
					}
					if ((recplayer.charAt(0)) == 'v') 	// If player in vacation
					{							
						donationList.rows[j].style.color = "royalblue";					// color
						donationList.rows[j].cells[0].innerHTML = player + " (v)";	// tag
						break;
					}						
				}
			}
		}			
	} 

/**
 *	Returns the leecher info text
*/
function getLeecherInfo(page,cities,lang)
{
	var imgw = "<img src='skin/resources/icon_wood.gif' alt='Legno' height='10' width='15'>"	// wood image
	var donationList = document.getElementById('resourceUsers').childNodes[3].getElementsByTagName("tbody")[0];
	var scorewrk = getParam('score_wrk','10',page);			// wood for every warker
	var scorelvl = getParam('score_lvl','100',page);		// wood for every level of the townHall	
		
	var donate = 0, Vdonate = 0, Adonate = 0;
	lvl_ary = new Array();
	wrk_ary = new Array();
	dnt_ary = new Array();
	var totlvl = 0, totwrk = 0;
	var chkAlldnt = getParam("all",false,page);
		
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
				if (chkAlldnt == true) Vdonate += getNegValue(toInt(document.getElementById('thiscaption'+ j ).textContent.split(" = ")[1]));
				else Vdonate += getNegValue(toInt(getPart(document.getElementById('wooddnt'+ j ).textContent,'(',')')));
			}
			else
			{
				if (chkAlldnt == true) Adonate += getNegValue(toInt(document.getElementById('thiscaption'+ j ).textContent.split(" = ")[1]));
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
		else												// calculate new score for next level
		{
			var K = scorelvl / scorewrk;					// factor lvl/wrk score	
			var nwscorewrk = parseInt(scorewrk);
				
			do		// Search new value for deposit Upgrading
			{
				var nwdonate = 0;
				nwscorewrk += 5;
				var nwscorelvl = Math.ceil(nwscorewrk * K);
				
				for ( j = 0; j < donationList.rows.length; j++)
				{				
					nwdonate += getNegValue(dnt_ary[j] - (lvl_ary[j] * nwscorelvl) - (wrk_ary[j] * nwscorewrk));					
				}
					
				if ( (nwscorewrk- parseInt(scorewrk)) >= 1000) break;	// esce dal loop
				
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

/**
 *	hide or show info leecher
*/
function infoHide(onClk)
{
	//var label = document.getElementById('infoButton').textContent
	var label = GM_getValue("infoHide","-");
	
	if ((label=="-" && onClk==true) || (label=="+" && onClk==false)) 	//Hide
	{
		//document.getElementById('infoButton').textContent = "+";
		document.getElementById('infoButton').innerHTML = "<img src='skin/layout/down-arrow.gif' alt='+' height='10' width='10'>";
		addGlobalStyle('#hideText {display:none;}');
		GM_setValue("infoHide","+");
	}
	if ((label=="+" && onClk==true) || (label=="-" && onClk==false))	//Show 
	{
		//document.getElementById('infoButton').textContent = "-";
		document.getElementById('infoButton').innerHTML = "<img src='skin/layout/up-arrow.gif' alt='-' height='10' width='10'>";
		addGlobalStyle('#hideText {display:table-row;}');
		GM_setValue("infoHide","-");
	}
} 

/**
 *	Control checkbox All Donation in island
*/
function chkAllDonation(page,lang)
{
	if (page == 'tradegood') var k = 'resource';	// search other island's resource 
	else k = 'tradegood';
	
	var chkDate = getParam("","NO DATE",k);
	if (chkDate != "NO DATE")
	{
		setParam('all',document.getElementById('allDonation').checked,page);
		doLeecherChecker(page,true,lang);
		document.getElementById('leecherInfo').innerHTML = getLeecherInfo(page,cities,lang);
	}
	else
	{		
		if (page == 'tradegood') var namemsg = lang.tradegood;	// search other island's resource 
		else namemsg = lang.resource;
		alert(lang.alertres1 + namemsg + ". \n "+ lang.alertres2);
		setParam('all',false,page);
		document.getElementById('allDonation').checked = false;
	}
}

window.addEventListener('load',  function() 
{ 
try
{
	// The id of the body tag contains which page you are on
	var page = document.getElementsByTagName('body')[0].id;
	var lang = getLanguage();
		
	// Check if you are at a resource deposit
	if ( (page == 'tradegood') || (page == 'resource') )
	{		
		// Style button for short/large info
		addGlobalStyle('#infoButton {position: absolute; width:15px; height:15px; left:660px; top:10px; display:block;}'); 
		var cities = document.getElementById('resourceUsers').childNodes[3].getElementsByTagName("tbody")[0].rows.length; // cities number
		var imgw = "<img src='skin/resources/icon_wood.gif' alt='Legno' height='15' width='20'>"	// wood image				
		var sethide = GM_getValue("infoHide","-");
		
		doLeecherChecker(page, false,lang);
		
		// get value of parameter
		var scorewrk = getParam('score_wrk','10',page);
		var scorelvl = getParam('score_lvl','100',page);
			
		var div = document.createElement('div');
		div.innerHTML = 
			"<div id='island_control' class='contentBox'>"+
				"<div id='infoButton'></div>"+
				"<h3 class='header'><span class='textLabel'>Island_Control v"+ lversion +" <a href='http://ikariamscript.forumfree.net/' target='_blank'>(by Phate)</a></span> "+
				"<span id=updateVersion></span></h3>"+
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
									"<td><input id='text_1' type='textfield' class='textfield' name='score_wrk' size='4' value="+scorewrk+" /> " + imgw + "</td>"+
									"<td>     </td>"+
									"<th>"+ lang.scorelvl +"</th>"+										
									"<td><input id='text_2' type='textfield' class='textfield' name='score_lvl' size='6' value="+scorelvl+" /> " + imgw + "</td>"+
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
							"<td colspan='3'><div id='leecherInfo'>"+ getLeecherInfo(page,cities,lang) +"</div></center></td>"+
						"</tr>"+
					"</table>"+
				"</div>"+
				"<div class='footer'></div>" +
			"</div>";			
		document.getElementById('mainview').insertBefore(div, document.getElementById("resourceUsers"));
		document.getElementById('text_1').addEventListener('change',function(event){setParam('score_wrk',document.getElementById('text_1').value,page); doLeecherChecker(page,true,lang); document.getElementById('leecherInfo').innerHTML = getLeecherInfo(page,cities,lang);},true);
		document.getElementById('text_2').addEventListener('change',function(event){setParam('score_lvl',document.getElementById('text_2').value,page); doLeecherChecker(page,true,lang); document.getElementById('leecherInfo').innerHTML = getLeecherInfo(page,cities,lang);},true);
		document.getElementById('allDonation').addEventListener('change',function(event){chkAllDonation(page,lang)},true,lang);
		document.getElementById('infoButton').addEventListener('click',function(event){infoHide(true)},true);
			
		// controll state of chekbox
		var chkAlldnt = getParam("all",false,page);
		if (chkAlldnt == true) document.getElementById('allDonation').checked = true;
		else document.getElementById('allDonation').checked = false;				
			
		infoHide(false);	// set button that hide or show info leecher
	}
		
	// Search in the island, player inactive or in vacation
	if (page == 'island')
	{		
		var idisle = getID(document.getElementById('islandfeatures').childNodes[1].innerHTML,"id=");	// ID of the island
		
			
		var player;
		var i = 1;
		// show name of the player in the island
		var NamePly = GM_getValue('NamePlayerView', true);
		
		if (isNaN(idisle) && NamePly==false) return; // exit if island isn't yours and you don't want show player's name
			
		for ( j=1 ; j < 33 ; j +=2)
		{
			var cityloc = document.getElementById('cities').childNodes[j]
			if (cityloc.innerHTML.split('class="claim"').length == 1)
			{
				player= trim((document.getElementById('cities').childNodes[j].getElementsByTagName('li')[2].textContent.split(":")[1]));
				var inactive = cityloc.innerHTML.split(class="inactivity").length; // Inactive cities
				var vacation = cityloc.innerHTML.split(class="vacation").length;   // Vacation cities
				var txtplayer = player;
					
				if  (inactive > 1)
				{
					if (!isNaN(idisle)) // if isle is yours
						{
						GM_setValue ( idisle + " " + i , "i " + player );
						i++;
						}
					txtplayer ="<span class='inactivity'>" + player + " (i)</span>";
				}
				else if (vacation > 1)
				{
					if (!isNaN(idisle)) // if isle is yours
						{
						GM_setValue ( idisle + " " + i , "v " + player );
						i++;
						}
					txtplayer ="<span class='palm'></span><span class='vacation'>" + player + " (v)</span>";
				}
					
				// Add name of the player in the island
				if (NamePly == true)
				{
					var ikNewElement = document.createElement('div');
					ikNewElement.setAttribute('id',"NamePlayer"+ j);
					ikNewElement.style.position = "relative";
					ikNewElement.style.top = "20px";
					cityloc.childNodes[1].insertBefore(ikNewElement,cityloc.childNodes[1].firstChild);
					document.getElementById("NamePlayer"+ j).innerHTML ="<span class='textLabel'>"+
																			"<span class='before'></span>"+ txtplayer + 
																			"<span class='after'></span>"+
																		"</span>";
				}
			}
		}
			
		if (!isNaN(idisle)) // if isle is yours
		{
			var d = new Date();		
			GM_setValue (idisle + " " + i, d.toDateString());	// End of control save date
		}
	}
		
	if (page == 'options')
	{
		var newElement = document.createElement("div");
		newElement.setAttribute('id','optionIsland');
		newElement.innerHTML = 
			"<div class='contentBox01h'>" +
				"<h3 class='header'><span class='textLabel'>Island_Control v"+ lversion +" <a href='http://ikariamscript.forumfree.net/' target='_blank'>(by Phate)</a></span> "+
				"<span id=updateVersion></span></h3>"+
				"<div class='content'>" +
					"<table cellpadding='0' cellspacing='0'>"+
						"<tbody>"+
							"<tr>" +
								"<th id='firsttxt'>"+ lang.optiontxt +"</th>" +
								"<td><input type='checkbox' id='optionNamePlayer'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='secondtxt'>"+ lang.optiontxt2 +"</th>" +
								"<td><input id='language' type='textfield' class='textfield' name='language' size='1' value="+ lang.txtlng +" /><span> en,it</span></td>"+
							"</tr>" +
						"</tbody>"+
					"</table>" +
                "<div class='footer'></div>" +
                "</div>";
		document.getElementById("mainview").insertBefore(newElement, document.getElementById("vacationMode"));
		document.getElementById('optionNamePlayer').addEventListener('change',function(event){GM_setValue('NamePlayerView', document.getElementById('optionNamePlayer').checked);},true,lang);
		document.getElementById('language').addEventListener('change',function(event){GM_setValue('Island_controlLang',document.getElementById('language').value);lang=getLanguage(); reloadOption(lang);},true);
		
		// controll state of chekbox
		var NamePly = GM_getValue('NamePlayerView', true);
		if (NamePly == false) document.getElementById('optionNamePlayer').checked = false;
		else document.getElementById('optionNamePlayer').checked = true;
			
		check_for_update(lang);	// check new version of Island_Control
	}
}
catch(er)
				{alert(lang.errortxt + er)}
},
    true);

// rewrite text of Island_control script in the option page
function reloadOption(lang)
{
		document.getElementById('firsttxt').textContent = lang.optiontxt;
		document.getElementById('secondtxt').textContent = lang.optiontxt2;
		check_for_update(lang);
}


function getLanguage()
{
	var lang = GM_getValue('Island_controlLang')
	
	if (lang == null)	{lang = navigator.language;}
	
	if (lang != "it") {lang = "en";}
	
	GM_setValue('Island_controlLang',lang);
	
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
			alertisland: "Si consiglia di visitare l'isola. \n In questo modo saranno visibili i giocatori in vacanza e inattivi.",
			dateisland: " Agg. Isola: ",
			alertres1: "Si consiglia di visitare ",
			alertres2: "In questo modo sara possibile fare una valutazione complessiva delle donazioni dell'isola.",
			tradegood: " la Falegnameria",
			resource: " il Bene di lusso",
			dateresource: " Agg. ",
			errortxt: "Island_Control ha generato un errore. Per favore contattatemi su http://ikariamscript.forumfree.net/ per risolvere il problema. Phate \n\n",
			update: "Nuova versione ",
			optiontxt: "Visualizza i nomi dei giocatori nelle citt&agrave; dell'isola: ",
			optiontxt2: "Seleziona la lingua: ",
			txtlng:"it",
		},
		en:
		{ // English traslate by Paul93
			infotext: "The players who use the resource of the island should contribute to its development donating building material according to "+
					"the number of workers and the size of the cities. The donation shares can be set " +
					"for every saw mille and luxury resource deposit." +
					"<center>The contribution that every player should donate is regulated by the following formula:<br />"+
					"<b>Donation = (Qw * worker) + (Qt * level of the town hall)</b><br />"+
					"<b>Qw</b> = Share by every worker | <b>Qm</b> = Share by every level of the town hall</center>"+
					"<center>Legend :</center>",
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
			alertisland: "You'd better visit the island. \ n In this way inactive and vacation mode players will be visible.",
			dateisland: " Update Island: ",
			alertres1: "You'd better visit ",
			alertres2: "In this way it will be possible to make a general evaluation of the donations of the island.",
			tradegood: " the saw mill",
			resource: " the luxury resource deposit",
			dateresource: " Update ",
			errortxt: "Island_Control has generated an error. Please you get through to me in http://ikariamscript.forumfree.net/ to solve the problem. Phate72 \n\n",
			update: "New version ",
			optiontxt: "Show the player's name in the island view: ",
			optiontxt2: "Select language:",
			txtlng:"en",
		},
	}
	return langs[lang]


