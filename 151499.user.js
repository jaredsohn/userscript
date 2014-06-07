// ==UserScript==
// @name        FrenchUnMod
// @namespace   http://mega.szajb.us/juenizer/unmod/
// @description Advanced Bloodwars MODIFICATIONS
// @include     http://r*.fr.bloodwars.net/*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==


// made by juen @ o2 . pl
// zapraszam: http://nakoz.org, http://szajb.us, http://cdlabel.info

var a = location.search;
var id = location.host.split(".")[0];

//Base de levelcalc

///////////////////////////
//	LANGUAGE	//
/////////////////////////

var sAvgClan = 0;
var sNow = 1;
var frenchStrings = new Array(
	"La moyenne des level du clan: ",
	"MAINTENANT"
);

var CE	= 0;
var CULT= 0;
var SDB	= 0;
var ABS = 0;
var DAMN= 0;

var MEN = 0;
var WOM = 0;

///////////////////////////
//	FUNCTIONS	//
/////////////////////////

function raceCalc(RACE){
	if (RACE=="capteur d`esprit"){
		CE++; 
	}
	if (RACE=="cultiste"){
		CULT++; 
	}
	if (RACE=="seigneur des bêtes"){
		SDB++; 
	}
	if (RACE=="absorbeur"){
		ABS++; 
	}
	if (RACE=="damné"){
		DAMN++; 
	}
}

function sexeCalc(SEXE){
	if (SEXE=="Homme"){
		MEN++; 
	}
	if (SEXE=="Femme"){
		WOM++; 
	}
}

function cropTime(data){
		myArray	= /(\d+\sj.\s?)?(\d+\sh\s?)?(\d+\smin\s?)?(\d+\ss)?/.exec(data);                
		jour	=/(\d+)?\sj/.exec(myArray[1]);
		heure	=/(\d+)?\sh/.exec(myArray[2]);
		minute	=/(\d+)?\smin/.exec(myArray[3]);
		seconde	=/(\d+)?\ss/.exec(myArray[4]);
		time	=(((verif(jour)*24+verif(heure))*60)+verif(minute))*60+verif(seconde);
		return time;
}

function verif(data){
	if(data==null) {return 0;}
	else return parseInt(data[1]);
}

function imgReturn(sec){
	if (sec<=900){
		if (sec>=0 && sec<=60){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/online.gif";
		}
		if (sec>60 && sec<=100){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/1.gif";
		}
		if (sec>100 && sec<=200){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/2.gif";
		}
		if (sec>200 && sec<=300){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/3.gif";
		}
		if (sec>300 && sec<=400){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/4.gif";
		}
		if (sec>400 && sec<=500){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/5.gif";
		}
		if (sec>500 && sec<=600){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/6.gif";
		}
		if (sec>600 && sec<=700){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/7.gif";
		}
		if (sec>700 && sec<=800){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/8.gif";
		}
		if (sec>800 && sec<=900){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/9.gif";
		}
	}
	else if(sec>=86400 && sec <=950400){
		if (sec>86400 && sec<=172800){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a1.gif";
		}
		if (sec>172800 && sec<=259200){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a2.gif";
		}
		if (sec>259200 && sec<=345600){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a3.gif";
		}
		if (sec>345600 && sec<=432000){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a4.gif";
		}
		if (sec>432000 && sec<=518400){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a5.gif";
		}
		if (sec>518400 && sec<=604800){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a6.gif";
		}
		if (sec>604800 && sec<=691200){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a7.gif";
		}
		if (sec>691200 && sec<=777600){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a8.gif";
		}
		if (sec>777600 && sec<=864000){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a9.gif";
		}
		if (sec>864000 && sec<=950400){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a10.gif";
		}
	}
	else if(sec>950400){
		if (sec<2678400){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/out.gif";
		}
		if (sec>2678400){
			img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/dead.gif";
		}
	}
	else{
		img = "http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/offline.gif";
	}
	return img;
}

function levelCalc(pts, type){
	var niveau = Math.floor(Math.log(1.1 * pts) / Math.log(1.1));
	if (type=="Clan"){ return niveau; }
	var niveauSup = Math.floor(Math.log(0.0011 * (pts*1000+999)) / Math.log(1.1));
	if (niveau != niveauSup) niveau = niveau + "-" + niveauSup;
	return niveau;
}

function expePlayer(TRindex){
	data = TRindex.getElementsByTagName("TD")[1].innerHTML;

	nba	= data.indexOf("<b>", 0);
	nbb	= data.indexOf("</b>", nba);
	start	= data.substring(nba+3, nbb);

	nbaa	= data.indexOf("<b>", nbb);
	nbbb	= data.indexOf("</b>", nbaa);
	join	= data.substring(nbaa+3, nbbb);

	nba1	= data.indexOf("<b>", nbbb);
	nbb1	= data.indexOf("</b>", nba1);

	nba2	= data.indexOf("<b>", nbb1);
	nbb2	= data.indexOf("</b>", nba2);

	nbardc	= data.indexOf("<b>", nbb2);
	nbbrdc	= data.indexOf("</b>", nbardc);
	startrdc= data.substring(nbardc+3, nbbrdc);

	nbaardc	= data.indexOf("<b>", nbbrdc);
	nbbbrdc	= data.indexOf("</b>", nbaardc);
	joinrdc	= data.substring(nbaardc+3, nbbbrdc);

	timea	= data.indexOf("onmouseover=\"return overlib('", 0);
	timeb	= data.indexOf(" ');\" onmouseout=\"nd();\"", timea);
	time	= data.substring(timea+29, timeb);


		//Expéditions
	if(start.length>8 && join.length>8){
		if ((start == strings[sNow]) && (join != strings[sNow])){
			// on peut lancer mais pas joindre
			imgsrc = 'http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_2.gif'
		}else if((start != strings[sNow]) && (join == strings[sNow])){
			// on ne peut pas lancer mais seulement joindre
			imgsrc = 'http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_1.gif'
		}else if((start != strings[sNow]) && (join != strings[sNow])){
			// on ne peut ni lancer ni joindre
			imgsrc = 'http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_3.gif'
		}else{
			// on peut lancer et joindre
			imgsrc = 'http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_0.gif'
		}
		img		= TRindex.getElementsByTagName("TD")[1].getElementsByTagName("IMG");
		img[1].src	= imgsrc;
	}


		// Rdc
	if(startrdc.length>8 && joinrdc.length>8){
		if ((startrdc == strings[sNow]) && (joinrdc != strings[sNow])){
			// on peut lancer mais pas joindre
			imgsrcrdc = 'http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/r_2.gif'
		}else if((startrdc != strings[sNow]) && (joinrdc == strings[sNow])){
			// on ne peut pas lancer mais seulement joindre
			imgsrcrdc = 'http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/r_1.gif'
		}else if((startrdc != strings[sNow]) && (joinrdc != strings[sNow])){
			// on ne peut ni lancer ni joindre
			imgsrcrdc = 'http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/r_3.gif'
		}else{
			// on peut lancer et joindre
			imgsrcrdc = 'http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/r_0.gif'
		}
		img		= TRindex.getElementsByTagName("TD")[1].getElementsByTagName("IMG");
		img[2].src	= imgsrcrdc;
	}

		// changement de l'image away time
	if (data.indexOf("unknown")==-1) {
	      img[0].src	= imgReturn(cropTime(time));
	}

}

function dspProfile(){
	myClan = GM_getValue(location.hostname + "clanName");

	var TABLE	= document.getElementsByTagName("TABLE");
	var TD		= TABLE[3].getElementsByTagName("TD");
	var newRow	= TABLE[3].insertRow(6);

// 	Récupération de la race si la personne est de son clan
	data	= TABLE[3].getElementsByTagName("TR")[3].getElementsByTagName("TD")[1].innerHTML;
	nba	= data.indexOf("\">", 0);
	nbb	= data.indexOf("</a>", nba);
	start	= data.substring(nba+2, nbb);
		// on recupere la race et le nom du joueur
		RACE	= TABLE[3].getElementsByTagName("TR")[0].getElementsByTagName("TD")[1].innerHTML;
		NOM	= document.getElementsByClassName("profile-hdr")[0].innerHTML;
		nba	= NOM.indexOf("Profil du vampire ", 0);
		nbb	= NOM.length;
		NOM	= NOM.substring(nba+18, nbb-1);
		GM_setValue(location.hostname + "RACE_"+NOM, RACE);

		// on recupere le sexe
		SEXE	= TABLE[3].getElementsByTagName("TR")[1].getElementsByTagName("TD")[1].innerHTML;
		GM_setValue(location.hostname + "SEXE_"+NOM, SEXE);
}

function dspClan(){

	var ME		= document.getElementsByClassName("me")[0].innerHTML;

	var TABLE	= document.getElementsByTagName("TABLE");
	var nbTR	= TABLE[5].getElementsByTagName("TR").length;
	var TR		= TABLE[5].getElementsByTagName("TR");

		// INSERT LA RACE
		var newCellRace		= TR[0].insertCell(5);
		newCellRace.innerHTML	= 'RACE';
		newCellRace.width	= 170;

		// INSERT LE SEXE
		var newCellSexe		= TR[0].insertCell(1);
		newCellSexe.innerHTML	= 'SEXE';
		newCellSexe.width	= 30;


	var clan;
	var totLevel = 0;
	for (i=1; i<nbTR; i++){
		user	= TR[i].getElementsByTagName("TD")[0].innerHTML;
		nba	= user.indexOf("\">", 0);
		nbb	= user.indexOf("</a>", nba);
		user	= user.substring(nba+2, nbb);

		nbLevel	= TR[i].getElementsByTagName("TD")[4].innerHTML;
		nba	= nbLevel.indexOf("<b>", 0);
		nbb	= nbLevel.indexOf("</b>", nba);
		totLevel= totLevel+parseInt(nbLevel.substring(nba+3, nbb));


	var a = location.search;
	if (a=="?a=aliance" && a!="?a=aliance&") {
		expePlayer(TR[i]);
	}


			// insert la race
			newCellRacePlayer		= TR[i].insertCell(5);
			if(GM_getValue(location.hostname + "RACE_"+user)!= undefined){
				newCellRacePlayer.innerHTML	= '<span style="text-transform: capitalize;">'+GM_getValue(location.hostname + "RACE_"+user).toLowerCase()+'</span>';
				raceCalc(GM_getValue(location.hostname + "RACE_"+user).toLowerCase());
			}else{
				newCellRacePlayer.innerHTML	= 'N/C';
			}
			newCellRacePlayer.width		= 230;

			// insert le sexe
			newCellSexePlayer		= TR[i].insertCell(1);
			if(GM_getValue(location.hostname + "SEXE_"+user)!= undefined){
				newCellSexePlayer.innerHTML	= '<img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/'+GM_getValue(location.hostname + "SEXE_"+user)+'.png" />';
				sexeCalc(GM_getValue(location.hostname + "SEXE_"+user));
			}else{
				newCellSexePlayer.innerHTML	= 'N/C';
			}
			newCellSexePlayer.width		= 30;
		TR[i].getElementsByTagName("TD")[2].width = 170;
		TR[i].getElementsByTagName("TD")[4].width = 200;
		if(user==ME){
			clan = 1;
		}
	}

	var moyLevel		= Math.floor(totLevel/(nbTR-1));
	var newRow		= TABLE[6].insertRow(2);
	var newCell		= newRow.insertCell(0);
	newCell.innerHTML	= '<b>'+strings[sAvgClan]+'</b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+moyLevel+'</b>';

	newRow			= TABLE[6].insertRow(3);
	newCell			= newRow.insertCell(0);
	newCell.style.padding	= '5px 5px 5px 5px';
	newCell.innerHTML	= '';

	newRow			= TABLE[6].insertRow(4);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">capteurs d\'esprits</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+CE+'</b>';

	newRow			= TABLE[6].insertRow(5);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">cultistes</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+CULT+'</b>';

	newRow			= TABLE[6].insertRow(6);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">seigneurs des bêtes</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+SDB+'</b>';

	newRow			= TABLE[6].insertRow(7);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">absorbeurs</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+ABS+'</b>';

	newRow			= TABLE[6].insertRow(8);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">damnés</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+DAMN+'</b>';

	newRow			= TABLE[6].insertRow(9);
	newCell			= newRow.insertCell(0);
	newCell.style.padding	= '5px 5px 5px 5px';
	newCell.innerHTML	= '';

	newRow			= TABLE[6].insertRow(10);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">hommes</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+MEN+'</b>';

	newRow			= TABLE[6].insertRow(11);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">femmes</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+WOM+'</b>';


	if(a.substr(0,18)!="?a=aliance&do=view") {
		var DIVS = document.getElementsByTagName("div");
		DIVS[37+corrNbDivs].innerHTML = '<b>Légende:</b><span style="padding-left: 30px;"><img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/out.gif" /> Absent depuis plus de 10 jours, <img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/dead.gif" /> Absent depuis plus de 30 jours</span>';
		DIVS[37+corrNbDivs].innerHTML += '<br /><span style="padding-left: 8px;"><img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a1.gif" /> Absent depuis 1 jour         <img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a10.gif" /> Absent depuis 10 jours</span>';
		DIVS[37+corrNbDivs].innerHTML += '<br /><span style="padding-left: 86px;"><img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_0.gif" /> Peux lancer et rejoindre l\'expédition, <img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_3.gif" /> Ni joindre / ni lancer, <img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_1.gif" /> Que joindre, <img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_2.gif" /> Que lancer</span>';
	}
}


function getClan(){
	// on recupere le tag de son clan
	var TABLE	= document.getElementsByTagName("TABLE");
	var clanName	= TABLE[3].getElementsByTagName("TR")[1].getElementsByTagName("TD")[1].innerHTML;
	nba 		= clanName.indexOf("<b>", 0);
	nbb 		= clanName.indexOf("</b>", nba);
	clanName	= clanName.substring(nba+3, nbb);
	return clanName;
}

function dspRank(){
	var TABLE	= document.getElementsByClassName("rank")[0];
	var TR		= TABLE.getElementsByTagName("TR")
	var newCell	= TR[0].insertCell(8);
	newCell.innerHTML = 'LEVEL';
	var nbTR	= TABLE.getElementsByTagName("TR").length;

	for(i=1; i<nbTR; i++){
		newCell		 = TR[i].insertCell(8);
		newCell.innerHTML= levelCalc(TR[i].getElementsByTagName("TD")[7].innerHTML, "");
	}
}

///////////////////////////
//	   MAIN		//
/////////////////////////
var strings;
strings = frenchStrings;


//unmod

if (a=="?a=settings") {
	div = document.getElementsByClassName('hr720')[0];
	opcje="<br /><br /><b>UnMod</b>, french version - <i>simply made by JUEN/gg:1008732 ; translation and adaptation by Amendil</i><br>";
	opcje+="Include <b>levelCalc</b>, <i>made by ΞViPΞTeam ; update, enhance and adapted for UnMod by Amendil</i><br><BR>";
	opcje+='<center><table width="90%" style="text-align: left; margin-top: 5px; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Helvetica, Arial;">';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_unmodon", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_unmodon"> activer French UnMod (vous pouvez désactiver French UnMod pour ce serveur)</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_levelcalc", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_levelcalc"> activer levelcalc (Si vous voyez un N/C en page clan, regarder le profil de la personne concernée. /!\\ Ne fonctionne pas sur chrome)</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_mysort", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_mysort"> reclasse la page de classement où je me trouve (par possibilité d`attaque)</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_shop1", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_shop1"> affiche les propriétés des ouu lors de leurs achats dans le magasin</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_fightstat", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_fightstat"> affiche des stats à la fin des combats</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_ukryj", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_ukryj"> cacher la description publique de votre clan</td></tr>';
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_ukryj2", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_ukryj2"> cacher la description privée de votre clan</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_notesEverywhere", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_notesEverywhere"> afficher un bouton en haut à gauche sur toutes les pages pour voir des notes</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_youtube", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_youtube"> affiche un lecteur sous les liens youtube de la shoutbox</td></tr>';
		
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_mysort1", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_mysort1"> reclasse la 1ère page de classement (par possibilité d`attaque)</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_mysort2", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_mysort2"> reclasse la 2ème page de classement (par possibilité d`attaque)</td></tr>';
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_mysort3", false)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_mysort3"> reclasse toutes les pages de classement (par possibilité d`attaque)</td></tr>';
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_fastzk", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_fastzk"> clic rapide sur les items de l`armurerie</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_zkkrew", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_zkkrew"> mettre en évidence le stuff sang en ac (nécessaire d`activer le clic rapide sur les items de l`armurerie)</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_klansort", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_klansort"> reclasse les membres du clan (par points)</td></tr>'
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_shoutboxclan", false)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_shoutboxclan"> ouvre automatiquement la fenêtre de chat clanique et la règle en transparent</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_donesound", false)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_donesound"> jouer un son lorsqu`une quête/attaque est finie <input type="text" id="UM_urlsound" value="'+GM_getValue(id+'UM_urlsound','http://soundimpress.pl/audio/download/103/soundimpress.pl_click_sfx_synth_a01.mp3')+'"></td></tr>';
		
	opcje+='<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	opcje+='(cliquer sur EFFACER, à côté d`INVERSER) vendre les items de l`étagère 1 valant moins de (LOL): <input type="text" id="UM_zkclean" value="'+GM_getValue(id+'UM_zkclean','2000')+'"></td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_alarm", false)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_alarm"> alarme à: ';
	opcje+='<select id="UM_OP_alarm_h"><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select>';
	opcje+='&nbsp;h&nbsp;<select id="UM_OP_alarm_m">';
	for (i=0; i<60;i++) { if (i<10) i2="0"+i; else i2=i; opcje+='<option value="'+i+'">'+i2+'</option>'; }
	opcje+='</select> (vous devez avoir au moins une fenêtre ouverte contenant bloodwars dans votre navigateur)';
	opcje+='</td></tr>';

	opcje+='<tr><td style="text-align: left;">';
	opcje+='<tr><td><br><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_polki", false)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_polki"> ';
	opcje+='nom des étagères: <br><br>';
	opcje+='10:<input type="text" style="width: 100px;" id="UM_OP_polka10" value="'+GM_getValue(id+"UM_OP_polka10", "Étagère 10")+'">';
	opcje+='&nbsp;9: <input type="text" style="width: 100px;" id="UM_OP_polka9" value="'+GM_getValue(id+"UM_OP_polka9", "Étagère 9")+'">';
	opcje+='&nbsp;8: <input type="text" style="width: 100px;" id="UM_OP_polka8" value="'+GM_getValue(id+"UM_OP_polka8", "Étagère 8")+'">';
	opcje+='&nbsp;7: <input type="text" style="width: 100px;" id="UM_OP_polka7" value="'+GM_getValue(id+"UM_OP_polka7", "Étagère 7")+'">';
	opcje+='&nbsp;6: <input type="text" style="width: 100px;" id="UM_OP_polka6" value="'+GM_getValue(id+"UM_OP_polka6", "Étagère 6")+'">';
	opcje+='<br>&nbsp;5: <input type="text" style="width: 100px;" id="UM_OP_polka5" value="'+GM_getValue(id+"UM_OP_polka5", "Étagère 5")+'">';
	opcje+='&nbsp;4: <input type="text" style="width: 100px;" id="UM_OP_polka4" value="'+GM_getValue(id+"UM_OP_polka4", "Étagère 4")+'">';
	opcje+='&nbsp;3: <input type="text" style="width: 100px;" id="UM_OP_polka3" value="'+GM_getValue(id+"UM_OP_polka3", "Étagère 3")+'">';
	opcje+='&nbsp;2: <input type="text" style="width: 100px;" id="UM_OP_polka2" value="'+GM_getValue(id+"UM_OP_polka2", "Étagère 2")+'">';
	opcje+='&nbsp;1: <input type="text" style="width: 100px;" id="UM_OP_polka1" value="'+GM_getValue(id+"UM_OP_polka1", "Étagère 1")+'">';
	opcje+='</td></tr>';	


	opcje+='<tr><td style="color: red;"><BR><b><center>Avec cette modification, n`oubliez pas de d`arrêter tout les script GreaseMonkey pour BW, comme la dernière fois!</center>';
	opcje+='</td></tr>';	
	opcje+='<tr><td style=""><BR><b style=""><center>Table des fonctionnalités (de la plus récente à la plus ancienne)</center></b><BR>';
	opcje+='- ajout de notes visibles sur toutes les pages<br>';
	opcje+='- ajout d`un message sur la page de quête indiquant les sondages et infos importantes<br>';
	opcje+='- ajout du script levelcalc<br>';
	opcje+='- statistiques à la fin des combats; ceux qui ont lancé le plus d`attaque ou fais le plus de critique son encadré.<br>';
	opcje+='- le lien du chat instantané est modifié pour choisir son pseudo plutôt que de prendre automatiquement le pseudo du jeu<br>';
	opcje+='- sur le profil d`un joueur, «ATTAQUER» est barré si vous avez déjà attaqué cette personne deux fois. Si vous avez déjà attaqué cette personne une fois il est écrit «ATTAQUER UNE SECONDE FOIS»<br>';
	opcje+='- sur les pages de classements où les joueurs sont affichés par ordre de disponibilité d`attaque, les personnes disponibles mais que vous avez déjà attaqué aujourd`hui voient leurs icones devenir transparente (faible transparence si attaqué une fois, forte transparence si attaqué deux fois)<br>';
	opcje+='- informations pour réussir les missions<br>';
	opcje+='- possibilité de cacher les descriptions publique et privée de son clan<br>';
	opcje+='- changement rapide des stuff enregistrés (menu déroulant à côté des shoutbox)<br>';
	opcje+='- possibilité de renommer les étagères<br>';
	opcje+='- affichage complet des informations des ouu dans le magasin<br>';
	opcje+='- les dates en haut de l`écran sont désormais affichée dans l`armurerie et la vue de la cité<br>';
	opcje+='- conversion des liens youtube dans la shoutbox vers un player<br>';
	opcje+='- amélioration de la page des enchères qui concerne les ferrailles en cours de vente<br>';
	opcje+='- parmi les enchères observées, affiche le temps restant de la prochaine enchère qui va se terminer. L`affichage est dupliqué en haut de l`écran (il faut repasser voir les enchères observées pour mettre à jour)<br>';
	opcje+='- prise en charge de ALT + flèche haut/bas: changer de page de classement<br>';
	opcje+='- ajout de la date exacte de la fin d`une construction<br>';
	opcje+='- affiche le nombre de niveaux qui peuvent encore être accepté en expé et rdc<br>';
	opcje+='- prend en compte la différence de fuseaux horaires<br>';
	opcje+='- le temps restant pour finir une construction est placé à côté des annonces bw<br>';
	opcje+='- alarme<br>';
	opcje+='- possibilité de désactiver UnMod sur un serveur sans le désactiver sur les autres serveurs<br>';
	opcje+='- sélection et vente rapide d`items de moindre qualité (de base, items de moins de 2000 LOL)<br>';
	opcje+='- tri du classement selon les possibilités d`attaques<br>';
	opcje+='- dans les enchères, mets en évidence les objets de qualité légendaire<br>';
	opcje+='- sur le classement/la vue sur la cité, il y a un E à côté du pseudo si le joueur vous rapporte au moins 1 PE (affiché même si vous n`êtes pas acte 3)<br>';
	opcje+='- option pour choisir l`adresse URL du signal sonore<br>';
	opcje+='- sur les pages de rdc, expé et embuscade, s`il y a une action en cours, le nom de l`onglet affiche le temps restant avant la fin de l`action<br>';
	opcje+='- ajout du cout total des stats sur la page d`entrainement<br>';
	opcje+='- ajout d`une option pour que le chat clanique soit automatiquement ouvert<br>';
	opcje+='- votre choix d`options de ce script est propre à chaque serveur<br>';
	opcje+='- ajout d`une note sur le profil de chaque joueur!<br>';
	opcje+='- ajout d`une option pour jouer un son lorsqu`une quête se termine (si l`onglet de la page de quête est ouvert)<br>';
	opcje+='</td></tr>';	
	
	opcje+='</table></center><BR><BR>';
	
	div.innerHTML+=opcje;
	wyb = GM_getValue(id+"UM_OP_alarm_h", 0);
	if (parseInt(wyb)>=12) wyb-=12; else wyb=parseInt(wyb)+12;
	document.getElementById("UM_OP_alarm_h").options[wyb].selected=true;
	wyb = GM_getValue(id+"UM_OP_alarm_m", 0);
	document.getElementById("UM_OP_alarm_m").options[wyb].selected=true;

	document.getElementById('content-mid').style.minHeight="1320px";
	document.getElementById('UM_OP_notesEverywhere').addEventListener('click', function() {GM_setValue(id+"UM_OP_notesEverywhere",this.checked);}, false);
	document.getElementById('UM_OP_youtube').addEventListener('click', function() {GM_setValue(id+"UM_OP_youtube",this.checked);}, false);
	document.getElementById('UM_OP_shoutboxclan').addEventListener('click', function() {GM_setValue(id+"UM_OP_shoutboxclan",this.checked);}, false);
	document.getElementById('UM_OP_donesound').addEventListener('click', function() {GM_setValue(id+"UM_OP_donesound",this.checked);}, false);
	document.getElementById('UM_OP_unmodon').addEventListener('click', function() {GM_setValue(id+"UM_OP_unmodon",this.checked);}, false);
	document.getElementById('UM_OP_levelcalc').addEventListener('click', function() {GM_setValue(id+"UM_OP_levelcalc",this.checked);}, false);
	document.getElementById('UM_OP_shop1').addEventListener('click', function() {GM_setValue(id+"UM_OP_shop1",this.checked);}, false);
	document.getElementById('UM_OP_fightstat').addEventListener('click', function() {GM_setValue(id+"UM_OP_fightstat",this.checked);}, false);
	document.getElementById('UM_OP_ukryj').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj",this.checked);}, false);
	document.getElementById('UM_OP_ukryj2').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj2",this.checked);}, false);
	document.getElementById('UM_OP_zkkrew').addEventListener('click', function() {GM_setValue(id+"UM_OP_zkkrew",this.checked);}, false);
	document.getElementById('UM_OP_mysort').addEventListener('click', function() {GM_setValue(id+"UM_OP_mysort",this.checked);}, false);
	document.getElementById('UM_OP_mysort1').addEventListener('click', function() {GM_setValue(id+"UM_OP_mysort1",this.checked);}, false);
	document.getElementById('UM_OP_mysort2').addEventListener('click', function() {GM_setValue(id+"UM_OP_mysort2",this.checked);}, false);
	document.getElementById('UM_OP_mysort3').addEventListener('click', function() {GM_setValue(id+"UM_OP_mysort3",this.checked);}, false);
	document.getElementById('UM_OP_fastzk').addEventListener('click', function() {GM_setValue(id+"UM_OP_fastzk",this.checked);}, false);
	document.getElementById('UM_OP_alarm').addEventListener('click', function() {GM_setValue(id+"UM_OP_alarm",this.checked);}, false);
	document.getElementById('UM_OP_alarm_h').addEventListener('change', function() {GM_setValue(id+"UM_OP_alarm_h",this.value);}, false);
	document.getElementById('UM_OP_alarm_m').addEventListener('change', function() {GM_setValue(id+"UM_OP_alarm_m",this.value);}, false);
	document.getElementById('UM_OP_polki').addEventListener('click', function() {GM_setValue(id+"UM_OP_polki",this.checked);}, false);
	document.getElementById('UM_OP_klansort').addEventListener('click', function() {GM_setValue(id+"UM_OP_klansort",this.checked);}, false);
	document.getElementById('UM_OP_polka1').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka1",this.value);}, false);
	document.getElementById('UM_OP_polka2').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka2",this.value);}, false);
	document.getElementById('UM_OP_polka3').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka3",this.value);}, false);
	document.getElementById('UM_OP_polka4').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka4",this.value);}, false);
	document.getElementById('UM_OP_polka5').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka5",this.value);}, false);
	document.getElementById('UM_OP_polka6').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka6",this.value);}, false);
	document.getElementById('UM_OP_polka7').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka7",this.value);}, false);
	document.getElementById('UM_OP_polka8').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka8",this.value);}, false);
	document.getElementById('UM_OP_polka9').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka9",this.value);}, false);
	document.getElementById('UM_OP_polka10').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka10",this.value);}, false);
	document.getElementById('UM_urlsound').addEventListener('keyup', function() {GM_setValue(id+"UM_urlsound",this.value);}, false);
	document.getElementById('UM_urlsound').addEventListener('change', function() {GM_setValue(id+"UM_urlsound",this.value);}, false);
	document.getElementById('UM_zkclean').addEventListener('keyup', function() {GM_setValue(id+"UM_zkclean",this.value);}, false);

}

if (GM_getValue(id+"UM_OP_unmodon", true)) {
	// mod notki everywhere
	x = document.createElement('span');
	x.id="x";
	x.style.display="none";
	y = document.createElement('span');
	y.id="y";
	y.style.display="none";
	document.getElementsByTagName('body')[0].appendChild(x); 
	document.getElementsByTagName('body')[0].appendChild(y); 	
	chmurka = document.createElement('div');
	chmurka.id="chmurka";
	chmurka.style.display="none";
	chmurka.style.x="300px";
	chmurka.style.zIndex="30000";
	chmurka.style.position="fixed";
	chmurka.style.borderColor="white";
	chmurka.style.borderWidth="2px";
	chmurka.style.borderStyle="solid";
	chmurka.style.padding="4px";
	chmurka.style.backgroundColor="black";
	document.getElementsByTagName('body')[0].appendChild(chmurka); 
	var scriptCode = new Array();
	scriptCode.push('	function getMouseXY(e) {');
	scriptCode.push('		document.getElementById(\'x\').innerHTML=e.clientX;');
	scriptCode.push('		document.getElementById(\'y\').innerHTML=e.clientY+10;');
	scriptCode.push('	}');
	scriptCode.push('	document.onmousemove = getMouseXY;');
	var script = document.createElement('script');
	script.innerHTML = scriptCode.join('\n');
	scriptCode.length = 0;
	document.getElementsByTagName('head')[0].appendChild(script); 

	test = document.getElementsByClassName('menulink');
	for (t = 0; t < test.length; t++) {
		if (test[t].innerHTML=='Chat instantané') { test[t].href='http://webchat.quakenet.org/?channels=bloodwars-fr'; break; }
	}

	if (a.substring(0,8)=="?a=equip") {
		if (GM_getValue(id+"UM_OP_polki", false)) {
			// mod wlasne nazwy polek

			sel = document.getElementById('newTab');
			options = sel.getElementsByTagName('option');
			options[0].innerHTML=GM_getValue(id+"UM_OP_polka10", "10");
			options[1].innerHTML=GM_getValue(id+"UM_OP_polka9", "9");
			options[2].innerHTML=GM_getValue(id+"UM_OP_polka8", "8");
			options[3].innerHTML=GM_getValue(id+"UM_OP_polka7", "7");
			options[4].innerHTML=GM_getValue(id+"UM_OP_polka6", "6");
			options[5].innerHTML=GM_getValue(id+"UM_OP_polka5", "5");
			options[6].innerHTML=GM_getValue(id+"UM_OP_polka4", "4");
			options[7].innerHTML=GM_getValue(id+"UM_OP_polka3", "3");
			options[8].innerHTML=GM_getValue(id+"UM_OP_polka2", "2");
			options[9].innerHTML=GM_getValue(id+"UM_OP_polka1", "1");

			el = document.getElementsByClassName('itemTab');
			for (l=0; l<el.length; l++) {

				el[l].innerHTML = el[l].innerHTML.replace("Étagère 10",GM_getValue(id+"UM_OP_polka10", "Étagère 10"));
				el[l].innerHTML = el[l].innerHTML.replace("Étagère 9",GM_getValue(id+"UM_OP_polka9", "Étagère 9"));
				el[l].innerHTML = el[l].innerHTML.replace("Étagère 8",GM_getValue(id+"UM_OP_polka8", "Étagère 8"));
				el[l].innerHTML = el[l].innerHTML.replace("Étagère 7",GM_getValue(id+"UM_OP_polka7", "Étagère 7"));
				el[l].innerHTML = el[l].innerHTML.replace("Étagère 6",GM_getValue(id+"UM_OP_polka6", "Étagère 6"));
				el[l].innerHTML = el[l].innerHTML.replace("Étagère 5",GM_getValue(id+"UM_OP_polka5", "Étagère 5"));
				el[l].innerHTML = el[l].innerHTML.replace("Étagère 4",GM_getValue(id+"UM_OP_polka4", "Étagère 4"));
				el[l].innerHTML = el[l].innerHTML.replace("Étagère 3",GM_getValue(id+"UM_OP_polka3", "Étagère 3"));
				el[l].innerHTML = el[l].innerHTML.replace("Étagère 2",GM_getValue(id+"UM_OP_polka2", "Étagère 2"));
				el[l].innerHTML = el[l].innerHTML.replace("Étagère 1",GM_getValue(id+"UM_OP_polka1", "Étagère 1"));
				}
		}


		if (GM_getValue(id+"UM_OP_fastzk", true)) {
			// mod fast zk
			
			unsafeWindow.clk_stock = function(event, stock) {
			} 
			unsafeWindow.clk_zk = function(event, stock) {
			} 
			unsafeWindow.clk_equip = function(event, stock) {
			} 
			
			var itemS = document.getElementsByClassName('item');

			for (var i=0; i<itemS.length; i++) {
				ta = itemS[i].getElementsByTagName('table');
				krew = false;
				if (GM_getValue(id+"UM_OP_zkkrew", true)) if (ta[0].innerHTML.search('Ours')>0 || ta[0].innerHTML.search('Chamanis')>0 || ta[0].innerHTML.search('Osseu')>0 || ta[0].innerHTML.search('Élastique')>0 || ta[0].innerHTML.search('Du Sang')>0) { 
					ta[0].style.backgroundColor="#aa0000";
					if (itemS[i].innerHTML.search('Propriétaire')!=-1) krew=true; 
				} 

				if (krew==true) {
					ta[0].addEventListener('mousedown', function() {
						var itemS = document.getElementsByClassName('item');
						for (var i=0; i<itemS.length; i++) {
							var ta = itemS[i].getElementsByTagName('table');
							if (ta[0].style.backgroundColor=="rgb(170, 0, 0)" && ta[0].innerHTML.search('Propriétaire')!=-1) {
								ta[0].getElementsByClassName('checkbox')[0].click();
							}
						}
					}, false);
				}
				if (!krew) ta[0].addEventListener('mousedown', function() {this.getElementsByClassName('checkbox')[0].click();}, false);
				itemS[i].getElementsByTagName('td')[1].width="13%";	
			}

			var itemS = document.getElementsByClassName('checkbox');
			for (var i=0; i<itemS.length; i++) itemS[i].style.display="none";
		}	

		// mod clean-zk
		polka = document.getElementById('hc_c0');
		input = polka.getElementsByTagName('input')[0];
		input.value="INVERSER";
		input.style.width="90px";
		
		nowy = document.createElement("INPUT");
		nowy.type="button";
		nowy.value="EFFACER";
		nowy.className="button";
		nowy.style.width="90px";
		nowy.style.marginLeft="10px";
		nowy.id="nowy";

		if (input.nextSibling) input.parentNode.insertBefore(nowy, input.nextSibling); else input.parentNode.appendChild(nowy);
		document.getElementById('nowy').addEventListener('click', function() { 
			polka = document.getElementById('hc_c0');
			items = polka.getElementsByClassName('item');
			for (i=0; i<items.length; i++) {
				itemLink = items[i].getElementsByTagName('TD')[2].innerHTML;
				itemLink = itemLink.replace(/&lt;/gi,"<");
				itemLink = itemLink.replace(/&gt;/gi,">");
				itemLink = itemLink.replace("PLN","");
				koszt = (itemLink.substring((itemLink.search('<b>')+3),itemLink.search('</b>')).replace(/ /gi,""));
				if (parseInt(koszt)<GM_getValue(id+'UM_zkclean','2000') && parseInt(koszt)>49) {
					sellItem = items[i].getElementsByTagName('TD')[1].getElementsByTagName('INPUT')[0];
					sellItem.click();
				}
			}
			document.getElementsByClassName('sellButton')[1].click();
		}, false);
	} 
	if (a=="?a=swr") {
		table = document.getElementsByTagName('table')[4];
		if (table.innerHTML.length<500) table = document.getElementsByTagName('table')[5];
		kw = false;
		tr = table.getElementsByTagName('tr');
		for (i=1; i<tr.length; i++) {
			td = tr[i].getElementsByTagName('td')[5];
			sum = tr[i].getElementsByTagName('td')[2];
			akt = parseInt(sum.getElementsByTagName('SPAN')[sum.getElementsByTagName('SPAN').length-1].innerHTML);
			sum = parseInt(sum.innerHTML.substring(sum.innerHTML.length-8,sum.innerHTML.length));
			if (sum-akt) { 
				tr[i].getElementsByTagName('td')[2].innerHTML+=" (<span class=\"lnk\">"+(sum-akt)+"</span>)";
				tr[i].getElementsByTagName('td')[2].style.width="100px";
			}
			if (td.innerHTML.length>100 && td.innerHTML.length<186 || td.innerHTML.length>232) {
				t = td.getElementsByTagName('input');
				if (t.length==0) {
					kw = true;
					break;
				}
			}
		}
		if (kw) {
			czas = tr[i].getElementsByClassName('itemstacked1');
			if (czas.length) {
				czas = tr[i].getElementsByClassName('itemstacked1')[0].innerHTML; 
				var rok = czas.split('-')[0];
				var miesiac = czas.split('-')[1];
				var dzien = czas.split('-')[2].split(' ')[0];
				var godzina = czas.split(' ')[1].split(':')[0];
				var minuty = czas.split(' ')[1].split(':')[1];
				var sekundy= czas.split(' ')[1].split(':')[2];
				pozniej = new Date(rok,miesiac-1,dzien,godzina,minuty,sekundy);
			} else {
				c = tr[i].getElementsByTagName('td')[4].getElementsByTagName('div')[0].innerHTML;
				go=c.split(':')[0];
				mi=c.split(':')[1];
				se=c.split(':')[2];
				mi++; mi--; se++; se--; go++; go--;
				pozniej = new Date();
				pozniej.setTime(pozniej.getTime()+unsafeWindow.timeDiff*1000);
				if (go>0) pozniej.setHours(pozniej.getHours()+go); 
				if (mi>0) pozniej.setMinutes(pozniej.getMinutes()+mi); 
				if (se>0) pozniej.setSeconds(pozniej.getSeconds()+se); 
				rok = pozniej.getFullYear();
				miesiac = pozniej.getMonth()+1;
				dzien = pozniej.getDate();
				godzina = pozniej.getHours();
				minuty = pozniej.getMinutes();
				sekundy = pozniej.getSeconds();
			}
			var teraz = new Date();
			teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
			GM_setValue(id+'UM_krok',rok);
			GM_setValue(id+'UM_kmiesiac',miesiac);
			GM_setValue(id+'UM_kdzien',dzien);
			GM_setValue(id+'UM_kgodzina',godzina);
			GM_setValue(id+'UM_kminuty',minuty);
			GM_setValue(id+'UM_ksekundy',sekundy);
			var roznica = pozniej.getTime() - teraz.getTime();
			var i = setInterval(function () {
					roznica-=1000;
					if (roznica<=0) {
						document.title=id.replace('r','R')+' - TERMINÉ!';
						roznica=0;
					} else {
						time=roznica;
						var days = Math.floor(time / 86400000);
						var hours = Math.floor( (time - (86400000 * days)) / 3600000); 
						if (hours<10) hours="0"+hours;
						var minutes = Math.floor( (time - (86400000 * days) - (3600000 * hours)) / 60000); 
						if (minutes<10) minutes="0"+minutes;
						var seconds = ( time - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
						seconds=Math.floor(seconds);
						if (seconds<10) seconds="0"+seconds;
						document.title=id.replace('r','R')+' - '+hours+':'+minutes+':'+seconds;
					}
				},1000);
		} else {
			GM_setValue(id+'UM_krok',-1);
			GM_setValue(id+'UM_kmiesiac',0);
			GM_setValue(id+'UM_kdzien',0);
			GM_setValue(id+'UM_kgodzina',0);
			GM_setValue(id+'UM_kminuty',0);
			GM_setValue(id+'UM_ksekundy',0);
		}
		
	}

	if (a=="?a=townshop" && GM_getValue(id+"UM_OP_shop1", true)) {
		sklep = document.getElementsByClassName('item-link');
		for (i=sklep.length-1; i>sklep.length-46; i--) {
			txt = String(sklep[i].onclick);
			txt = txt.substring(txt.search('<table'),txt.search('</table')+8);
			sklep[i].innerHTML+=txt.replace(/\\/g,"").replace(/OBJETS A USAGE UNIQUE/g,"").replace("<br>","");
		}
	}
	if (a=="?a=arena") {
		table = document.getElementsByTagName('table')[4];
		tr = table.getElementsByTagName('tr');
		for (i=1; i<tr.length; i++) {
			sum= tr[i].getElementsByTagName('td')[2];
			akt = parseInt(sum.getElementsByTagName('SPAN')[sum.getElementsByTagName('SPAN').length-1].innerHTML);
			sum= parseInt(sum.innerHTML.substring(sum.innerHTML.length-7,sum.innerHTML.length));
			if (sum-akt) { 
				tr[i].getElementsByTagName('td')[2].innerHTML+=" (<span class=\"lnk\">"+(sum-akt)+"</span>)";
				tr[i].getElementsByTagName('td')[2].style.width="100px";
			}
		}		
	}
	if (a=="?a=cevent") {
		table = document.getElementsByTagName('table')[4];
		exp = false;
		tr = table.getElementsByTagName('tr');
		for (i=1; i<tr.length; i++) {
			td = tr[i].getElementsByTagName('td')[5];
			sum= tr[i].getElementsByTagName('td')[2];
			akt = parseInt(sum.getElementsByTagName('SPAN')[sum.getElementsByTagName('SPAN').length-1].innerHTML);
			sum= parseInt(sum.innerHTML.substring(sum.innerHTML.length-8,sum.innerHTML.length));
			if (sum-akt) { 
				tr[i].getElementsByTagName('td')[2].innerHTML+=" (<span class=\"lnk\">"+(sum-akt)+"</span>)";
				tr[i].getElementsByTagName('td')[2].style.width="100px";
			}
			if (td.innerHTML.length>100 && td.innerHTML.length<189 || td.innerHTML.length>232) {
				t = td.getElementsByTagName('input');
				if (t.length==0) {
					exp = true;
					break;
				}
			}
		}
		if (exp) {
			czas = tr[i].getElementsByClassName('itemstacked1');
			if (czas.length) {
				czas = tr[i].getElementsByClassName('itemstacked1')[0].innerHTML; 
				var rok = czas.split('-')[0];
				var miesiac = czas.split('-')[1];
				var dzien = czas.split('-')[2].split(' ')[0];
				var godzina = czas.split(' ')[1].split(':')[0];
				var minuty = czas.split(' ')[1].split(':')[1];
				var sekundy= czas.split(' ')[1].split(':')[2];
				pozniej = new Date(rok,miesiac-1,dzien,godzina,minuty,sekundy);
			} else {
				c = tr[i].getElementsByTagName('td')[4].getElementsByTagName('div')[0].innerHTML;
				go=c.split(':')[0];
				mi=c.split(':')[1];
				se=c.split(':')[2];
				go++; go--; mi++; mi--; se++; se--;
				pozniej = new Date();
				pozniej.setTime(pozniej.getTime()+unsafeWindow.timeDiff*1000);
				if (go>0) pozniej.setHours(pozniej.getHours()+go); 
				if (mi>0) pozniej.setMinutes(pozniej.getMinutes()+mi); 
				if (se>0) pozniej.setSeconds(pozniej.getSeconds()+se); 
				rok = pozniej.getFullYear();
				miesiac = pozniej.getMonth()+1;
				dzien = pozniej.getDate();
				godzina = pozniej.getHours();
				minuty = pozniej.getMinutes();
				sekundy = pozniej.getSeconds();
			}

			var teraz = new Date();
			teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
			GM_setValue(id+'UM_erok',rok);
			GM_setValue(id+'UM_emiesiac',miesiac);
			GM_setValue(id+'UM_edzien',dzien);
			GM_setValue(id+'UM_egodzina',godzina);
			GM_setValue(id+'UM_eminuty',minuty);
			GM_setValue(id+'UM_esekundy',sekundy);
			var roznica = pozniej.getTime() - teraz.getTime();
			var i = setInterval(function () {
					roznica-=1000;
					if (roznica<=0) {
						document.title=id.replace('r','R')+' - FINISH!';
						roznica=0;
					} else {
						time=roznica;
						var days = Math.floor(time / 86400000);
						var hours = Math.floor( (time - (86400000 * days)) / 3600000); 
						if (hours<10) hours="0"+hours;
						var minutes = Math.floor( (time - (86400000 * days) - (3600000 * hours)) / 60000); 
						if (minutes<10) minutes="0"+minutes;
						var seconds = ( time - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
						seconds=Math.floor(seconds);
						if (seconds<10) seconds="0"+seconds;
						document.title=id.replace('r','R')+' - '+hours+':'+minutes+':'+seconds;
					}
				},1000);
		} else {
			GM_setValue(id+'UM_erok',-1);
			GM_setValue(id+'UM_emiesiac',0);
			GM_setValue(id+'UM_edzien',0);
			GM_setValue(id+'UM_egodzina',0);
			GM_setValue(id+'UM_eminuty',0);
			GM_setValue(id+'UM_esekundy',0);
		}
		
	} 
	if (a=="?a=aliance") {

		var corrNbDivs = 0; //Sert à l`affichage de la légende pour levelCalc

		if (document.getElementsByTagName("tr")[6].getElementsByTagName("TD")[0].innerHTML.indexOf("leadership") !=-1) { //new leadership proposal
			corrNbDivs++;
		}

		if (GM_getValue(id+"UM_OP_ukryj", true)) {
			opis = document.getElementsByClassName('clan-desc');
			if (opis.length) {
				opis = opis[0];
				opis.innerHTML='<center><a id="UM_OP_ukryj" href="javascript:">DESACTIVER L`OPTION QUI CACHE CE CADRE !</a></center>';
				document.getElementById('UM_OP_ukryj').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj",false); location.reload();}, false);
			}
		} else {
			opis = document.getElementsByClassName('clan-desc');
			if (opis.length) {
				opis = opis[0];
				opis.innerHTML='<center><a id="UM_OP_ukryj" href="javascript:">(Cliquer pour cacher la description)</a></center>'+opis.innerHTML;
				document.getElementById('UM_OP_ukryj').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj",true); location.reload();}, false);
				corrNbDivs = corrNbDivs+2;
			}

		}

		if (GM_getValue(id+"UM_OP_ukryj2", true)) {
			opis = document.getElementsByClassName('clan-desc');
			if (opis.length) {
				opis = opis[1];
				opis.innerHTML='<center><a id="UM_OP_ukryj2" href="javascript:">DESACTIVER L`OPTION QUI CACHE CE CADRE !</a></center>';
				document.getElementById('UM_OP_ukryj2').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj2",false); location.reload();}, false);
			}
		} else {
			opis = document.getElementsByClassName('clan-desc');
			if (opis.length) {
				opis = opis[1];
				opis.innerHTML='<center><a id="UM_OP_ukryj2" href="javascript:">(Cliquer pour cacher la description)</a></center>'+opis.innerHTML;
				document.getElementById('UM_OP_ukryj2').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj2",true); location.reload();}, false);
				corrNbDivs++;
			}
		}


		if (GM_getValue(id+"UM_OP_klansort", true) && GM_getValue(id+"UM_OP_levelcalc", true)) {
			// mod sort klan

			var ME		= document.getElementsByClassName("me")[0].innerHTML;
			var clan;
			var totLevel = 0;

			var nowe = new Array(); var x=0; var cells = document.getElementsByTagName("tr");
			for (var i = 0; i < cells.length; i++) {
					cel_tst = cells[i].innerHTML; 
					tst = cel_tst.search(' de lancer la prochaine ');
					if (tst!=-1) {
						tds=cells[i].getElementsByTagName("td");
						nowe[x]= new Array(9);

						user	= tds[0].innerHTML;
						nba	= user.indexOf("\">", 0);
						nbb	= user.indexOf("</a>", nba);
						user	= user.substring(nba+2, nbb);

						nbLevel	= tds[4].innerHTML;
						nba	= nbLevel.indexOf("<b>", 0);
						nbb	= nbLevel.indexOf("</b>", nba);
						totLevel= totLevel+parseInt(nbLevel.substring(nba+3, nbb));

						expePlayer(cells[i]);


						if(GM_getValue(location.hostname + "RACE_"+user)!= undefined){
							race = '<span style="text-transform: capitalize;">'+GM_getValue(location.hostname + "RACE_"+user).toLowerCase()+'</span>';
							raceCalc(GM_getValue(location.hostname + "RACE_"+user).toLowerCase());
						}else{
							race = 'N/C';
						}

						if(GM_getValue(location.hostname + "SEXE_"+user)!= undefined){
							sexe = '<img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/'+GM_getValue(location.hostname + "SEXE_"+user)+'.png" />';
							sexeCalc(GM_getValue(location.hostname + "SEXE_"+user));
						} else {
							sexe = 'N/C';
						}

						if(user==ME){
							clan = 1;
						}


						pkt = tds[5].innerHTML;
						for (pkts = 6 - pkt.length;pkts>0; pkts--) pkt="0"+pkt;
						nowe[x][0]=pkt;
						nowe[x][1]=tds[0].innerHTML; //nom
						nowe[x][2]=tds[1].innerHTML; //en ligne
						nowe[x][3]=tds[3].innerHTML; //grade
						nowe[x][4]=tds[2].innerHTML; //adresse
						nowe[x][5]=tds[4].innerHTML; //niveau
						nowe[x][6]=tds[6].innerHTML; //date inscription
						nowe[x][7]=sexe; //sexe
						nowe[x++][8]=race; //race
					}
			}
			nowe.sort();
			nowe.reverse();
			tabela="                                <tr class=\"tblheader\">\
													<td>&nbsp;&nbsp;Rang&nbsp;&nbsp;</td>\
													<td>NIVEAU</td>\
													<td width=\"130\" style=\"padding: 5px;\">Nom</td>\
													<td width=\"30\">SEXE</td>\
													<td width=\"170\">En Ligne</td>\
													<td width=\"200\">Grade</td>\
													<td width=\"80\">ADRESSE</td>\
													<td width=\"270\">RACE</td>\
													<td width=\"50\">POINTS</td>\
													<td width=\"150\">Date d`inscription</td></tr>"


			lp = 1;
			for (var i = 0; i < nowe.length; i++) {
				if (i%2==0) tabela+="<tr align=center>"; else  tabela+="<tr align=center class=even>";
				tabela+="<td style=\"color: gray;\">"+lp+"</td>";
				lp++;
				tabela+="<td>"+nowe[i][5]+"</td>";
				tabela+="<td>"+nowe[i][1]+"</td>";
				tabela+="<td>"+nowe[i][7]+"</td>";
				tabela+="<td>"+nowe[i][2]+"</td>";
				tabela+="<td>"+nowe[i][3]+"</td>";
				tabela+="<td>"+nowe[i][4]+"</td>";
				tabela+="<td>"+nowe[i][8]+"</td>";
				tabela+="<td>"+(nowe[i][0]-0)+"</td>";
				tabela+="<td>"+nowe[i][6]+"</td>";
				tabela+="</tr>";
			}

			miejsce=document.getElementsByTagName('table');
			miejsce[5].innerHTML=tabela;


			var TABLE	= document.getElementsByTagName("TABLE");
			var nbTR	= TABLE[5].getElementsByTagName("TR").length;
			var TR		= TABLE[5].getElementsByTagName("TR");

			var moyLevel		= Math.floor(totLevel/(nbTR-1));
			var newRow		= TABLE[6].insertRow(2);
			var newCell		= newRow.insertCell(0);
			newCell.innerHTML	= '<b>'+strings[sAvgClan]+'</b>';
			newCell			= newRow.insertCell(1);
			newCell.style.padding	= '0 0 0 30px';
			newCell.innerHTML	= '<b>'+moyLevel+'</b>';

			newRow			= TABLE[6].insertRow(3);
			newCell			= newRow.insertCell(0);
			newCell.style.padding	= '5px 5px 5px 5px';
			newCell.innerHTML	= '';

			newRow			= TABLE[6].insertRow(4);
			newCell			= newRow.insertCell(0);
			newCell.innerHTML	= '<b><span style="text-transform: capitalize;">capteurs d\'esprits</span></b>';
			newCell			= newRow.insertCell(1);
			newCell.style.padding	= '0 0 0 30px';
			newCell.innerHTML	= '<b>'+CE+'</b>';

			newRow			= TABLE[6].insertRow(5);
			newCell			= newRow.insertCell(0);
			newCell.innerHTML	= '<b><span style="text-transform: capitalize;">cultistes</span></b>';
			newCell			= newRow.insertCell(1);
			newCell.style.padding	= '0 0 0 30px';
			newCell.innerHTML	= '<b>'+CULT+'</b>';

			newRow			= TABLE[6].insertRow(6);
			newCell			= newRow.insertCell(0);
			newCell.innerHTML	= '<b><span style="text-transform: capitalize;">seigneurs des bêtes</span></b>';
			newCell			= newRow.insertCell(1);
			newCell.style.padding	= '0 0 0 30px';
			newCell.innerHTML	= '<b>'+SDB+'</b>';

			newRow			= TABLE[6].insertRow(7);
			newCell			= newRow.insertCell(0);
			newCell.innerHTML	= '<b><span style="text-transform: capitalize;">absorbeurs</span></b>';
			newCell			= newRow.insertCell(1);
			newCell.style.padding	= '0 0 0 30px';
			newCell.innerHTML	= '<b>'+ABS+'</b>';

			newRow			= TABLE[6].insertRow(8);
			newCell			= newRow.insertCell(0);
			newCell.innerHTML	= '<b><span style="text-transform: capitalize;">damnés</span></b>';
			newCell			= newRow.insertCell(1);
			newCell.style.padding	= '0 0 0 30px';
			newCell.innerHTML	= '<b>'+DAMN+'</b>';

			newRow			= TABLE[6].insertRow(9);
			newCell			= newRow.insertCell(0);
			newCell.style.padding	= '5px 5px 5px 5px';
			newCell.innerHTML	= '';

			newRow			= TABLE[6].insertRow(10);
			newCell			= newRow.insertCell(0);
			newCell.innerHTML	= '<b><span style="text-transform: capitalize;">hommes</span></b>';
			newCell			= newRow.insertCell(1);
			newCell.style.padding	= '0 0 0 30px';
			newCell.innerHTML	= '<b>'+MEN+'</b>';

			newRow			= TABLE[6].insertRow(11);
			newCell			= newRow.insertCell(0);
			newCell.innerHTML	= '<b><span style="text-transform: capitalize;">femmes</span></b>';
			newCell			= newRow.insertCell(1);
			newCell.style.padding	= '0 0 0 30px';
			newCell.innerHTML	= '<b>'+WOM+'</b>';



			var DIVS = document.getElementsByTagName("div");
			DIVS[37+corrNbDivs].innerHTML = '<b>Légende:</b><span style="padding-left: 30px;"><img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/out.gif" /> Absent depuis plus de 10 jours, <img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/dead.gif" /> Absent depuis plus de 30 jours</span>';
			DIVS[37+corrNbDivs].innerHTML += '<br /><span style="padding-left: 8px;"><img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a1.gif" /> Absent depuis 1 jour         <img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/a10.gif" /> Absent depuis 10 jours</span>';
			DIVS[37+corrNbDivs].innerHTML += '<br /><span style="padding-left: 86px;"><img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_0.gif" /> Peux lancer et rejoindre l\'expédition, <img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_3.gif" /> Ni joindre / ni lancer, <img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_1.gif" /> Que joindre, <img src="http://amendil.free.fr/bloodwars/grease%20monkey/levelcalc/e_2.gif" /> Que lancer</span>';


		} else {
			if (GM_getValue(id+"UM_OP_levelcalc", true)) { dspClan(); }
			if (GM_getValue(id+"UM_OP_klansort", true)) {
				// mod sort klan
				var nowe = new Array(); var x=0; var cells = document.getElementsByTagName("tr");
				for (var i = 0; i < cells.length; i++) {
						cel_tst = cells[i].innerHTML; 
						tst = cel_tst.search(' do kolejnej ekspedycji ');
						if (tst==-1) tst = cel_tst.search('to join an expedition in');
						if (tst==-1) tst = cel_tst.search(' de lancer la prochaine ');
						if (tst!=-1) {
							tds=cells[i].getElementsByTagName("td");
							nowe[x]= new Array(7);
							pkt = tds[5].innerHTML;
							for (pkts = 6 - pkt.length;pkts>0; pkts--) pkt="0"+pkt;
							nowe[x][0]=pkt;
							nowe[x][1]=tds[0].innerHTML;
							nowe[x][2]=tds[1].innerHTML;
							nowe[x][3]=tds[3].innerHTML;
							nowe[x][4]=tds[2].innerHTML;
							nowe[x][5]=tds[4].innerHTML;
							nowe[x++][6]=tds[6].innerHTML;
						}
				}
				nowe.sort();
				nowe.reverse();
				tabela="                                <tr class=\"tblheader\">\
														<td>&nbsp;&nbsp;Rang&nbsp;&nbsp;</td>\
														<td>NIVEAU</td>\
														<td width=\"130\" style=\"padding: 5px;\">Nom</td>\
														<td width=\"60\">En Ligne</td>\
														<td width=\"110\">Grade</td>\
														<td width=\"80\">ADRESSE</td>\
														<td width=\"50\">POINTS</td>\
														<td width=\"150\">Date d`inscription</td></tr>"
				lp = 1;
				for (var i = 0; i < nowe.length; i++) {
					if (i%2==0) tabela+="<tr align=center>"; else  tabela+="<tr align=center class=even>";
					tabela+="<td style=\"color: gray;\">"+lp+"</td>";
					lp++;
					tabela+="<td>"+nowe[i][5]+"</td>";
					tabela+="<td>"+nowe[i][1]+"</td>";
					tabela+="<td>"+nowe[i][2]+"</td>";
					tabela+="<td>"+nowe[i][3]+"</td>";
					tabela+="<td>"+nowe[i][4]+"</td>";
					tabela+="<td>"+(nowe[i][0]-0)+"</td>";
					tabela+="<td>"+nowe[i][6]+"</td>";
					tabela+="</tr>";
				}
				miejsce=document.getElementsByTagName('table');
				miejsce[5].innerHTML=tabela;
			} 
		}
	}

	if(a.substr(0,18)=="?a=aliance&do=view") {
		//on lance levelcalc
		if (GM_getValue(id+"UM_OP_levelcalc", true)) { dspClan(); }
	}


	if (a=="?a=auction" || a.substr(0,21)=="?a=auction&do=watched") {
		test = document.getElementsByClassName('tblheader')[document.getElementsByClassName('tblheader').length-1];
		test.getElementsByTagName('td')[4].style.width="";
		aukcja = false;
		test = document.getElementsByTagName('TR');
		GM_setValue(id+'UM_arok',-1);
		GM_setValue(id+'UM_amiesiac',0);
		GM_setValue(id+'UM_adzien',0);
		GM_setValue(id+'UM_agodzina',0);
		GM_setValue(id+'UM_aminuty',0);
		GM_setValue(id+'UM_asekundy',0);
		for (xi in test) {
			if (test[xi].id.substr(0,3)=='au_') {
				tst = test[xi].getElementsByTagName('TD');
				if (tst[4].className=='error') continue;
				czas = tst[4].innerHTML.replace('<br>',' ');
				var rok = czas.split('-')[0];
				var miesiac = czas.split('-')[1];
				var dzien = czas.split('-')[2].split(' ')[0];
				var godzina = czas.split(' ')[1].split(':')[0];
				var minuty = czas.split(' ')[1].split(':')[1];
				var sekundy= czas.split(' ')[1].split(':')[2];
				pozniej = new Date(rok,miesiac-1,dzien,godzina,minuty,sekundy);

				tst[4].innerHTML=tst[4].innerHTML.replace('<br>',' ')+'<br>'+'<span id="aukcjaLicznik'+xi+'">&nbsp;</span>';
				var teraz = new Date();
				teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
				var roznica = pozniej.getTime() - teraz.getTime();

				GM_setValue(id+'UM_arok',rok);
				GM_setValue(id+'UM_amiesiac',miesiac);
				GM_setValue(id+'UM_adzien',dzien);
				GM_setValue(id+'UM_agodzina',godzina);
				GM_setValue(id+'UM_aminuty',minuty);
				GM_setValue(id+'UM_asekundy',sekundy);
			
				function aukcjeLicz(xi) { 
					roznica-=1000;
					if (roznica<=0) {
						roznica=0;						
						GM_setValue(id+'UM_arok',-1);
						GM_setValue(id+'UM_amiesiac',0);
						GM_setValue(id+'UM_adzien',0);
						GM_setValue(id+'UM_agodzina',0);
						GM_setValue(id+'UM_aminuty',0);
						GM_setValue(id+'UM_asekundy',0);
					} else {
						time=roznica;
						var days = Math.floor(time / 86400000);
						var hours = Math.floor( (time - (86400000 * days)) / 3600000); 
						if (hours<10) hours="0"+hours;
						var minutes = Math.floor( (time - (86400000 * days) - (3600000 * hours)) / 60000); 
						if (minutes<10) minutes="0"+minutes;
						var seconds = ( time - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
						seconds=Math.floor(seconds);
						if (seconds<10) seconds="0"+seconds;
						if(days>0) {
							document.getElementById('aukcjaLicznik'+xi).innerHTML=days+'j '+hours+':'+minutes+':'+seconds;
						} else {
							document.getElementById('aukcjaLicznik'+xi).innerHTML=hours+':'+minutes+':'+seconds;
						}
						document.title=id.replace('r','R')+' - '+hours+':'+minutes+':'+seconds;
					}
				}
				var i = setInterval(function() { aukcjeLicz(xi); },1000);					
				break;
			}
		}
	}
	if (a.substring(0,22)=="?a=auction&do=itemlist") {
		items = document.getElementsByClassName('item-link');
		for (i=0; i<items.length; i++) {
			items[i].innerHTML=items[i].innerHTML.replace('Légendaire','<span class="enabled">Légendaire</span>');
		}
	}
	if ((a.substring(0,7)=="?a=rank" && GM_getValue(id+"UM_OP_mysort3", false)) || (a=="?a=rank" && GM_getValue(id+"UM_OP_mysort", true)) || (a=="?a=rank&page=1" && GM_getValue(id+"UM_OP_mysort1", true)) || (a=="?a=rank&page=2" && GM_getValue(id+"UM_OP_mysort2", true)) ) {
		// mod sort rank
		table = document.getElementsByClassName('rank')[0];
		poz = table.getElementsByTagName('tr');
		nowe = new Array();
		for (x=1; x<poz.length; x++) {
			nowe[x-1]=new Array(10);
			td = poz[x].getElementsByTagName('td');
			yes = td[4].getElementsByTagName('img')[0].alt;
			if (yes<0 || yes>8) yes=9;
			nowe[x-1][0]=yes;
			nowe[x-1][9]=td[0].innerHTML;
			nowe[x-1][1]=td[0].innerHTML; 
			if (nowe[x-1][1].length<3) nowe[x-1][1]='0'+nowe[x-1][1]
			if (nowe[x-1][1].length<4) nowe[x-1][1]='0'+nowe[x-1][1]

			nowe[x-1][2]=td[1].innerHTML;
			nowe[x-1][3]=td[2].innerHTML;
			if (td[3].innerHTML=="H") nowe[x-1][4]='<span style="color: #006BAD;">'+td[3].innerHTML+'</span>';
			else nowe[x-1][4]='<span style="color: #AD00A5;">'+td[3].innerHTML+'</span>';
			nowe[x-1][5]=td[4].innerHTML;
			nowe[x-1][6]=td[5].innerHTML;
			nowe[x-1][7]=td[6].innerHTML;
			nowe[x-1][8]=td[7].innerHTML;
		}
		nowe.sort();
		table.innerHTML='<tr class="tblheader"><td width="60">PLACE</td><td width="160">NOM</td><td width="120">RACE</td><td width="50">SEXE</td><td><img src="http://r12.bloodwars.interia.pl/gfx/lhx/msg3.gif" alt="ATTAQUER"></td><td width="80">ADRESSE</td><td width="90">CLAN</td><td width="70">POINTS</td></tr>';
		for (x=0; x<nowe.length; x++) {
			if (x%2==0) even="even"; else even="";
			uid = nowe[x][2].substring(nowe[x][2].search('uid=')+4,nowe[x][2].search('">'));
			
			teraz = new Date();
			teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
			teraz = teraz.getDate()+'/'+(teraz.getMonth()+1)+'/'+teraz.getFullYear();

			testa = GM_getValue(id+'UM_1_'+uid, "A:B").split(':')[1];
			testb = GM_getValue(id+'UM_2_'+uid, "A:B").split(':')[1];
			atakowany = "";
			if (testa == testb && testb == teraz) atakowany='style="filter: alpha(opacity=10); opacity: .1;"';
			else if (testa == teraz || testb == teraz && testa != testb) atakowany='style="filter: alpha(opacity=65); opacity: .65;"';
			table.innerHTML+='<tr class="'+even+'" onmouseover="this.className=\'selectedItem\';" onmouseout="this.className=\''+even+'\';" align="center"><td class="townview" style="text-align: center;">'+nowe[x][9]+'</td><td>'+nowe[x][2]+'</td><td>'+nowe[x][3]+'</td><td>'+nowe[x][4]+'</td><td '+atakowany+'>'+nowe[x][5]+'</td><td>'+nowe[x][6]+'</td><td>'+nowe[x][7]+'</td><td>'+nowe[x][8]+'</td></tr>';
		}	
	}
	if (a.substring(0,7)=="?a=rank") {

		//On lance levelcalc
		if (GM_getValue(id+"UM_OP_levelcalc", true)) { dspRank(); }

		//on reprend unmod
		window.addEventListener('keydown', 	function (e) {
			var KeyID = (window.event) ? event.keyCode : e.keyCode;
			if (a.search('page=')>0) {
				page = a.substring(a.search('page=')+5,a.length);
				page = parseInt(page);
				if (page == 0) page = 1;
			} else page = 1;
			if (e.altKey) switch(KeyID) {
				case 38:
				if (page>1) page--;
				window.location="?a=rank&page="+page;
				break;
				case 40:	
				page++;
				window.location="?a=rank&page="+page;
				break;
			}
		}, true);
	}

if (("?a=msg"==a.substring(0,6) || "?mid="==a.substring(0,5)) && GM_getValue(id+"UM_OP_fightstat", true)) {
		rlc = document.getElementsByClassName('rlc');
		if (rlc.length) {
			var stan = new Array();
			var wyprowadzonych = new Array();
			var kolor = new Array();
			var unik = new Array();
			var kryty = new Array();
			var otrzymane = new Array();
			var uniknione = new Array();
			s=-1;
			rlc=rlc[0];

			walka = rlc.getElementsByClassName('atkHit');
			for (i=0; i<walka.length; i++) {
				kto=walka[i].getElementsByTagName('B')[0].innerHTML;
				if (s==-1) { s=0; } else {
					for (s=0;s<stan.length;s++) {
						if (stan[s]==kto) break;
					}
				}
				stan[s]=kto; 
				if (walka[i].innerHTML.search('Ardeur du Sang')<1) {
					if (wyprowadzonych[s] == undefined) wyprowadzonych[s]=1; else wyprowadzonych[s]++;
					if (unik[s] == undefined) unik[s]=0;
					if (walka[i].innerHTML.search(' obtient des dommages')>0) { 
						komu=walka[i].getElementsByTagName('b')[walka[i].getElementsByTagName('b').length-2].innerHTML;
						for (d=0;d<stan.length;d++) {
							if (stan[d]==komu) break;
						}
						stan[d]=komu;
						kolor[d]="defHit";
						if (wyprowadzonych[d] == undefined) wyprowadzonych[d]=0;
						if (kryty[d] == undefined) kryty[d]=0;
						if (unik[d] == undefined) unik[d]=0;
						if (otrzymane[d] == undefined) otrzymane[d]=0;
						otrzymane[d]++;					
					} else
					if (walka[i].innerHTML.search(' évite ')>0) { 
						unik[s]++;
						komu=walka[i].getElementsByTagName('b')[walka[i].getElementsByTagName('b').length-1].innerHTML;
						for (d=0;d<stan.length;d++) {
							if (stan[d]==komu) break;
						}
						stan[d]=komu;
						kolor[d]="defHit";
						if (wyprowadzonych[d] == undefined) wyprowadzonych[d]=0;
						if (kryty[d] == undefined) kryty[d]=0;
						if (unik[d] == undefined) unik[d]=0;
						if (uniknione[d] == undefined) uniknione[d]=0;
						uniknione[d]++;
					}
					if (kryty[s] == undefined) kryty[s]=0;
					if (walka[i].innerHTML.search('un coup critique')>0) kryty[s]++; 
				}
				kolor[s]="atkHit";
			}

			walka = rlc.getElementsByClassName('defHit');
			for (i=0; i<walka.length; i++) {
				kto=walka[i].getElementsByTagName('B')[0].innerHTML;
				if (s==-1) { s=0; } else {
					for (s=0;s<stan.length;s++) {
						if (stan[s]==kto) break;
					}
				}
				stan[s]=kto; 
				if (walka[i].innerHTML.search('Ardeur du Sang')<1) {
					if (wyprowadzonych[s] == undefined) wyprowadzonych[s]=1; else wyprowadzonych[s]++;
					if (unik[s] == undefined) unik[s]=0;
					if (walka[i].innerHTML.search(' obtient des dommages')>0) { 
						komu=walka[i].getElementsByTagName('b')[walka[i].getElementsByTagName('b').length-2].innerHTML;
						for (d=0;d<stan.length;d++) {
							if (stan[d]==komu) break;
						}
						stan[d]=komu;
						kolor[d]="atkHit";
						if (wyprowadzonych[d] == undefined) wyprowadzonych[d]=0;
						if (kryty[d] == undefined) kryty[d]=0;
						if (unik[d] == undefined) unik[d]=0;
						if (otrzymane[d] == undefined) otrzymane[d]=0;
						otrzymane[d]++;					
					} else
					if (walka[i].innerHTML.search(' évite ')>0) {
						unik[s]++;
						komu=walka[i].getElementsByTagName('b')[walka[i].getElementsByTagName('b').length-1].innerHTML;
						for (d=0;d<stan.length;d++) {
							if (stan[d]==komu) break;
						}
						stan[d]=komu;
						kolor[d]="atkHit";
						if (wyprowadzonych[d] == undefined) wyprowadzonych[d]=0;
						if (kryty[d] == undefined) kryty[d]=0;
						if (unik[d] == undefined) unik[d]=0;
						if (uniknione[d] == undefined) uniknione[d]=0;
						uniknione[d]++;
					}
					if (kryty[s] == undefined) kryty[s]=0;
					if (walka[i].innerHTML.search('un coup critique')>0) kryty[s]++; 
				}
				kolor[s]="defHit";
			}

			sum=document.getElementsByClassName('ambsummary');
			if (!sum.length) {
				sum=document.getElementsByClassName('result')[document.getElementsByClassName('result').length-1];
				raport="<br><table border=\"0\" style=\"border-collapse: collapse; background: black; text-align: center;\" width=\"100%\"><tr>";
			} else { 
				raport="<br><table border=\"0\" style=\"border-collapse: collapse; text-align: center;\" width=\"95%\"><tr>";
				sum=sum[0];
			}
			for (i=0; i<stan.length; i++) {
				if (i%3==0) raport+="</tr><tr>";
				niceOne="";
				niceKryty=true;
				niceIlosc=true;
				for (x=0; x<stan.length; x++) {
					if (x!=i) {
						if (kryty[x]>kryty[i]) niceKryty=false;
						if (wyprowadzonych[x]>wyprowadzonych[i]) niceIlosc=false;
					}
				}
				if (niceKryty || niceIlosc) niceOne="border: 2px white dotted;";
				raport+="<td style=\""+niceOne+" padding: 6px; text-align: center;\"><b class=\""+kolor[i]+"\">"+stan[i]+"</b><BR>";
				raport+="Touche: <b>"+(parseInt(wyprowadzonych[i])-parseInt(unik[i]))+"</b> / <b>"+wyprowadzonych[i]+"</b> ";
				if ((wyprowadzonych[i]-unik[i])/wyprowadzonych[i]*100) raport+="("+(((wyprowadzonych[i]-unik[i])/wyprowadzonych[i]*100).toFixed(2))+"%)";
				raport+="<br>Critique: <b>"+kryty[i]+"</b> ";
				if (kryty[i]) raport+="("+(((kryty[i])/(wyprowadzonych[i]-unik[i])*100).toFixed(2))+"%)";
				if (uniknione[i] == undefined) uniknione[i]=0;
				if (otrzymane[i] == undefined) otrzymane[i]=0;
				raport+="<br>Coups reçu: <b>"+otrzymane[i]+"</b> / <b>"+(otrzymane[i]+uniknione[i])+"</b>";
				if (otrzymane[i]/(otrzymane[i]+uniknione[i])*100) raport+=" ("+(otrzymane[i]/(otrzymane[i]+uniknione[i])*100).toFixed(2)+"%)";
				raport+="</td>";
			}
			sum.innerHTML+=raport+"</tr></table>";
		}
	}

	if ("?a=rank"==a.substring(0,7)) {
		stats = document.getElementsByClassName('stats-player')[0].innerHTML;
		stats = stats.replace(/&lt;/gi,"<");
		stats = stats.replace(/&gt;/gi,">");
		pts = (stats.substring((stats.search('<strong>')+8),stats.search('</strong>')).replace(/ /gi,"")) / 1000;
		lev = Math.floor(Math.log(0.0011*(pts*1000+999))/Math.log(1.1));
		table = document.getElementsByClassName('rank')[0];
		poz = table.getElementsByTagName('tr');
		t_lev = Math.ceil(lev / 100 * 84.5);
		for (x=1; x<poz.length; x++) {
			td = poz[x].getElementsByTagName('td');
			e_pts = td[7].innerHTML;
			e_lev = Math.floor(Math.log(0.0011*(e_pts*1000+999))/Math.log(1.1));
			if (e_lev>=t_lev) td[1].getElementsByTagName('b')[0].innerHTML+=' <span style="color: gray; float: right;">E</span>';
			taga = td[1].getElementsByTagName('a')[0];
			taga.onmouseover=function() {
				document.getElementById('chmurka').style.display="";
				document.getElementById('chmurka').style.left=parseInt(document.getElementById('x').innerHTML)+"px";
				document.getElementById('chmurka').style.top=parseInt(document.getElementById('y').innerHTML)+10+"px";
				document.getElementById('chmurka').innerHTML='NOTES: '+this.innerHTML+"<br/><br/>"+GM_getValue(id+"UM_notka"+this.id.substring(1), "aucune (ajouter sur le profil du joueur)").replace(/\n/g,'<br />');
			}
			taga.onmouseout=function() {
			document.getElementById('chmurka').style.display="none";			
			}
		}
	}
	if (a.substring(0,11)=="?a=auction&" && a.search('&t=69')>0) {
		if (a.search('addfav=')>0) 
			table = document.getElementsByTagName('TABLE')[6];
		else
			table = document.getElementsByTagName('TABLE')[5];
		
		if (document.getElementsByTagName('TABLE')[3].innerHTML.search('Ton offre ')>0) {
			table = document.getElementsByTagName('TABLE')[6];
		}
		tr = table.getElementsByTagName('TR');
		for (i=1; i<tr.length; i++) {
			td = tr[i].getElementsByTagName('TD');
			sztuk = td[1].innerHTML.substring(td[1].innerHTML.search(':')+1).replace('</span>','');
			oferta = td[3].innerHTML.replace(' ','');

			bid = td[6].innerHTML.substring(td[6].innerHTML.search('showBidForm')+12);
			bid = bid.substr(0,bid.search(';')-1);
			if (td[2].innerHTML=="0") 
				td[1].innerHTML+=" ("+unsafeWindow.auData[parseInt(bid)].minPrize+" - "+(Math.round(unsafeWindow.auData[parseInt(bid)].minPrize/sztuk))+"/fer)";
			else
				td[1].innerHTML+=" ("+unsafeWindow.auData[parseInt(bid)].minPrize+")";
			
			
			if (parseInt(oferta)>0) {
				td[3].innerHTML+=' - '+(Math.round(oferta/sztuk))+'/fer';
				td[6].innerHTML=td[6].innerHTML.replace(/ENCHÉRIR/g,'ENCHÉRIR <b>'+(Math.round(oferta/sztuk*1.05))+'</b>/fer');
			}
		}
	}
	if (a.substring(0,11)=="?a=townview") {
		var scriptCode = new Array();
		scriptCode.push('function showSector(str, sec) {');
		scriptCode.push('	if (str < 1) str = 1;');
		scriptCode.push('	if (str > 5) str = 5;');
		scriptCode.push('	var maxSectors = getMaxSectors(str);');
		scriptCode.push('	if (sec < 1) sec = maxSectors;');
		scriptCode.push('	if (sec > maxSectors) sec = 1;');
		scriptCode.push('	if (str == strefa && sec == sektor) return false;');
		scriptCode.push('	strefa = str;');
		scriptCode.push('	sektor = sec;');
		scriptCode.push('	document.getElementById(\'please_wait\').style.visibility = \'visible\';');
		scriptCode.push('	for (x = 1; x <= 5; x++) document.getElementById(\'btn_\'+x).disabled = true;');
		scriptCode.push('	getFile(\'_ajaxTownView.php?strefa=\'+strefa+\'&sektor=\'+sektor);');
		
		scriptCode.push('	setTimeout(function () { stats = document.getElementsByClassName(\'stats-player\')[0].innerHTML;');
		scriptCode.push('	stats = stats.replace(/&lt;/gi,"<");');
		scriptCode.push('	stats = stats.replace(/&gt;/gi,">");');
		scriptCode.push('	pts = (stats.substring((stats.search(\'<strong>\')+8),stats.search(\'</strong>\')).replace(/ /gi,"")) / 1000;');
		scriptCode.push('	lev = Math.floor(Math.log(0.0011*(pts*1000+999))/Math.log(1.1));');
		scriptCode.push('	t_lev = Math.ceil(lev / 100 * 84.5);');
		scriptCode.push('	s = document.getElementsByClassName(\'panel-cell\')[0].innerHTML;');
		scriptCode.push('	a = parseInt(s.split(\'/\')[0])+1;');
		scriptCode.push('	ns = ((parseInt((s.split(\'/\')[1]-1)*12))+parseInt(s.split(\'/\')[2]));');
		scriptCode.push('	tr = document.getElementsByTagName(\'tr\');');
		scriptCode.push('	for (i=0; i<tr.length; i++) {');
		scriptCode.push('		if (tr[i].style.height=="16px") {');
		scriptCode.push('			td = tr[i].getElementsByTagName(\'td\');');
		scriptCode.push('			e_pts = td[3].getElementsByTagName(\'b\')[0].innerHTML;');
		scriptCode.push('			e_lev = Math.floor(Math.log(0.0011*(e_pts*1000+999))/Math.log(1.1));');
		scriptCode.push('			if (e_lev>=t_lev) td[1].innerHTML+=\' <span style="color: gray; float: right;">E</span>\';');
		scriptCode.push('			if (s.split(\'/\')[0]!=5) if (td[8].innerHTML.length==27) td[8].innerHTML=\'<a href="?a=townview&amp;strefa=\'+a+\'&amp;sektor=\'+ns+\'">\'+a+\'/\'+ns+\'</a>\';');
		scriptCode.push('		}');
		scriptCode.push('	} },250);');
		scriptCode.push('}');
		var script = document.createElement('script');
		script.innerHTML = scriptCode.join('\n');
		scriptCode.length = 0;
		document.getElementsByTagName('head')[0].appendChild(script); 
		
		stats = document.getElementsByClassName('stats-player')[0].innerHTML;
		stats = stats.replace(/&lt;/gi,"<");
		stats = stats.replace(/&gt;/gi,">");
		pts = (stats.substring((stats.search('<strong>')+8),stats.search('</strong>')).replace(/ /gi,"")) / 1000;
		lev = Math.floor(Math.log(0.0011*(pts*1000+999))/Math.log(1.1));
		t_lev = Math.ceil(lev / 100 * 84.5);
		s = document.getElementsByClassName('panel-cell')[0].innerHTML;
		aj = parseInt(s.split('/')[0])+1;
		ns = ((parseInt((s.split('/')[1]-1)*12))+parseInt(s.split('/')[2]));		
		tr = document.getElementsByTagName('tr');
		for (i=0; i<tr.length; i++) {
			if (tr[i].style.height=="16px") {				
				td = tr[i].getElementsByTagName('td');
				if (td[3].getElementsByTagName('b').length) {
				e_pts = td[3].getElementsByTagName('b')[0].innerHTML;
				e_lev = Math.floor(Math.log(0.0011*(e_pts*1000+999))/Math.log(1.1));
				if (e_lev>=t_lev) td[1].innerHTML+=' <span style="color: gray; float: right;">E</span>';
				if (s.split('/')[0]!=5) if (td[8].innerHTML.length==27) td[8].innerHTML='<a href="?a=townview&amp;strefa='+a+'&amp;sektor='+ns+'">'+aj+'/'+ns+'</a>';
				taga = td[1].getElementsByTagName('a');
				if (taga.length) {
					taga = taga[0];
					taga.onmouseover=function() {
						document.getElementById('chmurka').style.display="";
						document.getElementById('chmurka').style.left=parseInt(document.getElementById('x').innerHTML)+"px";
						document.getElementById('chmurka').style.top=parseInt(document.getElementById('y').innerHTML)+10+"px";
						document.getElementById('chmurka').innerHTML='NOTES: '+this.innerHTML+"<br/><br/>"+GM_getValue(id+"UM_notka"+this.id.substring(1), "aucune (ajouter sur le profil du joueur)");
					}
					taga.onmouseout=function() {
						document.getElementById('chmurka').style.display="none";			
					}
				}
				}
			}
		}
	} 
	if ("?a=build"==a.substring(0,8)) {
		bld = document.getElementsByClassName('bldprogress');
		if (bld.length) {
			GM_setValue(id+"UM_bld",true);
			script = bld[0].getElementsByTagName('SCRIPT')[0];
			bldtime = script.innerHTML.substring(script.innerHTML.search('timeFields.bld_action = ')+24,script.innerHTML.search(';'));
			var pozniej = new Date();
			pozniej.setTime(pozniej.getTime()+unsafeWindow.timeDiff*1000);
			pozniej.setSeconds(pozniej.getSeconds()+parseInt(bldtime)); 
			rok = pozniej.getFullYear();
			miesiac = pozniej.getMonth()+1;
			dzien = pozniej.getDate();
			godzina = pozniej.getHours();
			minuty = pozniej.getMinutes();
			sekundy = pozniej.getSeconds();
			GM_setValue(id+'UM_brok',rok);
			GM_setValue(id+'UM_bmiesiac',miesiac);
			GM_setValue(id+'UM_bdzien',dzien);
			GM_setValue(id+'UM_bgodzina',godzina);
			GM_setValue(id+'UM_bminuty',minuty);
			GM_setValue(id+'UM_bsekundy',sekundy);

			pozniej = new Date();
			pozniej.setTime(pozniej.getTime()+(unsafeWindow.timeDiff*1000)+(unsafeWindow.timeFields.bld_action*1000));
			bld[0].innerHTML+="<br>Date de fin: <span class=\"bldtimeleft\">"+pozniej+"</span>";
		} else {
			GM_setValue(id+'UM_brok',-1);
			GM_setValue(id+'UM_bmiesiac',0);
			GM_setValue(id+'UM_bdzien',0);
			GM_setValue(id+'UM_bgodzina',0);
			GM_setValue(id+'UM_bminuty',0);
			GM_setValue(id+'UM_bsekundy',0);
			GM_setValue(id+"UM_bld",false);
		}		
	}
	if ("t"!=a[a.length-1] && "?a=profile&uid="==a.substring(0,15)) {
		//On lance levelcalc
		if (GM_getValue(id+"UM_OP_levelcalc", true)) { dspProfile(); }

		//On reprend unmod

		divs = document.getElementsByTagName('div');
		user = a.substring(15);
		i=29;
		if(divs[i].innerHTML.length<400) i++;
		divs[i].innerHTML+='<fieldset class="profile" style="text-align: center; height: 150px;"><legend class="profile">NOTES</legend><textarea id="UM_notka'+user+'" style="width: 100%; height: 96%;">'+GM_getValue(id+"UM_notka"+user, "")+'</textarea></fieldset>';
		teraz = new Date();
		teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
		teraz = teraz.getDate()+'/'+(teraz.getMonth()+1)+'/'+teraz.getFullYear();
		testa = GM_getValue(id+'UM_1_'+user, "A:B").split(':')[1];
		testb = GM_getValue(id+'UM_2_'+user, "C:D").split(':')[1];
		if (testa == testb && testb == teraz) document.getElementsByTagName('BODY')[0].innerHTML=document.getElementsByTagName('BODY')[0].innerHTML.replace('ATTAQUER','<s>ATTAQUER</s>');
		else if (testa == teraz || testb == teraz && testa != testb) document.getElementsByTagName('BODY')[0].innerHTML=document.getElementsByTagName('BODY')[0].innerHTML.replace('ATTAQUER','ATTAQUER UNE SECONDE FOIS');

		document.getElementById('UM_notka'+user).addEventListener('keyup', function() {GM_setValue(id+"UM_notka"+user,this.value);}, false);
	} 
	if (a=="?a=training" || a=="?a=training&do=stats") {
		// mod zliczanie kosztu trenu
		suma=0;
		for (var i=1; i<=document.getElementById('stat_0').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_1').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_2').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_3').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_4').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_5').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_6').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_7').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_8').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		t = 0; suma2="";
		suma=suma+"";
		for (i=suma.length-1; i>=0; i--) {
			suma2=suma[i]+suma2;
			t++;
			if (t==3) { t=0; suma2=" "+suma2; }
		}
		version = document.getElementById('content-mid');
		ver2 = document.createElement('SPAN');
		ver2.innerHTML='<br><center>COÛT TOTAL DE L`ENTRAINEMENT: &nbsp;&nbsp;&nbsp;<b>'+suma2+'</b></center>';
		version.appendChild(ver2,version.firstChild);
	}
	if (GM_getValue(id+"UM_OP_donesound",false)) {
		unsafeWindow.refLinks.quest_timeleft+='<embed src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" height=0 width=1>';
		unsafeWindow.refLinks.atkTime+='<embed src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" height=0 width=1>';
	}
	if (GM_getValue(id+"UM_OP_shoutboxclan", false)) {
		// mod shoutboxa
		document.getElementById('sbox_icons_clan').click();
		document.getElementById('sbox_msg_clan').style.opacity="0.85";
		document.getElementById('sbox_msg_global').style.opacity="0.85";
	}
	// mod czas exp i kw wszedzie
	krok = GM_getValue(id+'UM_krok',-1);
	k = false;
	var teraz = new Date();
	teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
	if (krok!=-1) {		
		pozniejk = new Date(GM_getValue(id+'UM_krok',0),GM_getValue(id+'UM_kmiesiac',0)-1,GM_getValue(id+'UM_kdzien',0),GM_getValue(id+'UM_kgodzina',0),GM_getValue(id+'UM_kminuty',0),GM_getValue(id+'UM_ksekundy',0));
		var roznicak = pozniejk.getTime() - teraz.getTime();
		if (roznicak>0) {
			k = true;
			var i2 = setInterval(function () {
				roznicak-=1000;
				if (roznicak<=0) {
					document.getElementById('kw').innerHTML='FINISH!';
					roznicak=0;
				} else {
					timek=roznicak;
					var days = Math.floor(timek / 86400000);
					var hours = Math.floor( (timek - (86400000 * days)) / 3600000); 
					if (hours<10) hours="0"+hours;
					var minutes = Math.floor( (timek - (86400000 * days) - (3600000 * hours)) / 60000); 
					if (minutes<10) minutes="0"+minutes;
					var seconds = ( timek - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
					seconds=Math.floor(seconds);
					if (seconds<10) seconds="0"+seconds;
					document.getElementById('kw').innerHTML=hours+':'+minutes+':'+seconds;
				}
			},1000);
		}
	}

	erok = GM_getValue(id+'UM_erok',-1);
	e = false;
	if (erok!=-1) {		
		poznieje = new Date(GM_getValue(id+'UM_erok',0),GM_getValue(id+'UM_emiesiac',0)-1,GM_getValue(id+'UM_edzien',0),GM_getValue(id+'UM_egodzina',0),GM_getValue(id+'UM_eminuty',0),GM_getValue(id+'UM_esekundy',0));
		var roznicae = poznieje.getTime() - teraz.getTime();
		if (roznicae>0) {
			e = true;
			var i = setInterval(function () {
				roznicae-=1000;
				if (roznicae<=0) {
					document.getElementById('exp').innerHTML='FINISH!';
					roznicae=0;
				} else {
					timee=roznicae;
					var days = Math.floor(timee / 86400000);
					var hours = Math.floor( (timee - (86400000 * days)) / 3600000); 
					if (hours<10) hours="0"+hours;
					var minutes = Math.floor( (timee - (86400000 * days) - (3600000 * hours)) / 60000); 
					if (minutes<10) minutes="0"+minutes;
					var seconds = ( timee - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
					seconds=Math.floor(seconds);
					if (seconds<10) seconds="0"+seconds;
					document.getElementById('exp').innerHTML=hours+':'+minutes+':'+seconds;
				}
			},1000);
		}
	}

	brok = GM_getValue(id+'UM_brok',-1);
	b = false;
	if (brok!=-1) {		
		poznieje = new Date(GM_getValue(id+'UM_brok',0),GM_getValue(id+'UM_bmiesiac',0)-1,GM_getValue(id+'UM_bdzien',0),GM_getValue(id+'UM_bgodzina',0),GM_getValue(id+'UM_bminuty',0),GM_getValue(id+'UM_bsekundy',0));
		var roznicab = poznieje.getTime() - teraz.getTime();
		if (roznicab>0) {
			b = true;
			var i = setInterval(function () {
				roznicab-=1000;
				if (roznicab<=0) {
					document.getElementById('unmodbld').innerHTML='FINISH!';
					roznicab=0;
				} else {
					timeb=roznicab;
					var days = Math.floor(timeb / 86400000);
					var hours = Math.floor( (timeb - (86400000 * days)) / 3600000); 
					if (hours<10) hours="0"+hours;
					var minutes = Math.floor( (timeb - (86400000 * days) - (3600000 * hours)) / 60000); 
					if (minutes<10) minutes="0"+minutes;
					var seconds = ( timeb - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
					seconds=Math.floor(seconds);
					if (seconds<10) seconds="0"+seconds;
						if (days) document.getElementById('unmodbld').innerHTML=days+'d '+hours+':'+minutes+':'+seconds;
						else document.getElementById('unmodbld').innerHTML=hours+':'+minutes+':'+seconds;
				}
			},1000);
		}
	}

	arok = GM_getValue(id+'UM_arok',-1);
	au = false;
	if (arok!=-1) {		
		poznieje = new Date(GM_getValue(id+'UM_arok',0),GM_getValue(id+'UM_amiesiac',0)-1,GM_getValue(id+'UM_adzien',0),GM_getValue(id+'UM_agodzina',0),GM_getValue(id+'UM_aminuty',0),GM_getValue(id+'UM_asekundy',0));
		var roznicaa = poznieje.getTime() - teraz.getTime();
		if (roznicaa>0) {
			au = true;
			var i = setInterval(function () {
				roznicaa-=1000;
				if (roznicaa<=0) {
					document.getElementById('unmodauk').innerHTML='FINISH?';
					roznicaa=0;
				} else {
					timea=roznicaa;
					var days = Math.floor(timea / 86400000);
					var hours = Math.floor( (timea - (86400000 * days)) / 3600000); 
					if (hours<10) hours="0"+hours;
					var minutes = Math.floor( (timea - (86400000 * days) - (3600000 * hours)) / 60000); 
					if (minutes<10) minutes="0"+minutes;
					var seconds = ( timea - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
					seconds=Math.floor(seconds);
					if (seconds<10) seconds="0"+seconds;
						if (days) document.getElementById('unmodauk').innerHTML=days+'j '+hours+':'+minutes+':'+seconds;
						else document.getElementById('unmodauk').innerHTML=hours+':'+minutes+':'+seconds;
				}
			},1000);
		}
	}


	div = document.getElementsByClassName('remark')[0];
	div.innerHTML+='&nbsp;';
	if (e) div.innerHTML+='<a href="?a=cevent"><span style="color: red;">&nbsp;EXPE:</span> <span style="color: red;" id="exp">00:00:00</span></a>&nbsp;&nbsp;';
	if (k) div.innerHTML+='<a href="?a=swr"><span style="color: red;">RDC:</span> <span style="color: red;" id="kw">00:00:00</span></a>&nbsp;&nbsp;';
	if (b) div.innerHTML+='<a href="?a=build"><span style="color: red;">CONSTRUCTION:</span> <span style="color: red;" id="unmodbld">00:00:00</span></a>&nbsp;&nbsp;';
	if (au) div.innerHTML+='<a href="?a=auction"><span style="color: red;">ENCHÈRE:</span> <span style="color: red;" id="unmodauk">00:00:00</span></a>&nbsp;&nbsp;';
	if (GM_getValue(id+'UM_OP_alarm',false)) {
		i0=""; if (GM_getValue(id+'UM_OP_alarm_h',0)<10) i0="0";
		i1=""; if (GM_getValue(id+'UM_OP_alarm_m',0)<10) i1="0";
		div.innerHTML+='<span id="alarm" style="color: red;">ALARME: '+i0+GM_getValue(id+'UM_OP_alarm_h',0)+':'+i1+GM_getValue(id+'UM_OP_alarm_m',0)+'</span>';
		setInterval( function () { 
			if (GM_getValue(id+'UM_OP_alarm',false)) {
				teraz = new Date();
				teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
				h=teraz.getHours(); 	
				m=teraz.getMinutes(); 	
				if (parseInt(h)==GM_getValue(id+'UM_OP_alarm_h',0) && GM_getValue(id+'UM_OP_alarm_m',0)==parseInt(m)) {
					GM_setValue(id+'UM_OP_alarm_on',true);
					GM_setValue(id+'UM_OP_alarm',false);
				}
			}
		}, 1000);
	}
	if (a=="?a=training&do=evo") {
		
	}
	if (a=="?a=tasks") {

		function juenOpis(text,text2) {
			document.getElementsByTagName('BODY')[0].innerHTML=document.getElementsByTagName('BODY')[0].innerHTML.replace(text,'<span class="lnk" onmouseover="return overlib(\''+text2+'\',HAUTO,WIDTH,500,CAPTIONFONTCLASS,\'action-caption\',TEXTFONTCLASS,\'overlibText overlibExtended\',VAUTO,CAPTION,\'Description de la mission\');" onmouseout="nd();">'+text+'</span>');
		}
		
		// s1
		juenOpis('Le prestige entre les vampires, ce n’est pas seulement la richesse et le pouvoir. Seul un grand guerrier inspire le respect. Gagne 15 embuscades consécutives. Les défenses ne comptent pas.','Réussir 15 attaques consécutives.');
		juenOpis('Malgré les avertissements donnés par tes conseillers, de temps en temps tu te promènes seul aux alentours de la ville. Tu te remémore les jours où tu étais un novice dans le monde des vampires, un novice qui rêvait de gloire et de pouvoir.','Combat en un contre un dans une quête dans les environs de La Cité.');
		juenOpis('Atteints le 89-ième niveau d`expérience. ','Gagner un niveau qui fait monter au moins au niveau 89.');
		juenOpis('Toutes les sombres et mystérieuses histoires sont soudain devenues claires. À la porte de la ville une armée de puissants sorciers n`ayant qu`un but, la destruction totale de la ville et la "libération" des esclaves opprimés par les vampires, s’apprêtait à donner l’assaut. Le temps est venu pour tous les vampires de se liguer contre l`ennemi commun.','Lancer un siège. Très difficile mais le nombre d`ennemis varie beaucoup et aléatoirement.');


		// s2 (opisy zbieral Prime Lust - https://docs.google.com/document/d/1eMFHEc0ieY_254Qsjs-90peIv2olOjEYpvsVYC1wQSU/edit?pli=1	
		juenOpis('Atteints le 80-ième niveau d`expérience. ','Gagner un niveau qui fait monter au moins au niveau 80.');
		juenOpis('Prouve ton talent pour les affaires. Fais bâtir Le Cimetière et La Banque de Sang. ','Construire le cimetière et la banque du sang. Si l`un des deux est déjà construit, il suffit de construire l`autre. Si les deux sont déjà construit, il suffit de monter le niveau de l`un d`eux.');
		juenOpis('Conquiers les cours et les esprits de la foule. Acquis 50 points de charisme','Monter le charisme à 50 ou plus.');
		juenOpis('L`Ordre de Saint Benoît a envoyé un assassin à ta trousse. Trouve le dans les environs de La Cité.','Combat en un contre un dans une quête dans les environs de La Cité.');
		juenOpis('Deviens le maître des plus obscures coins de La Cité. Acquis 55 points de réputation.','Monter la réputation à 55 ou plus.');
		juenOpis('Ton quartier a été assailli par les paladins de l`Ordre de Saint Benoît. Prépare-toi à l`ultime bataille entre les deux forces opposées... ','Effectuez un siege contre votre quartier, attention tous les ennemis utilisent l`arcane absorption de force.');
		juenOpis('Le Grand Maître de l`Ordre a échappé à la mort pendant la dernière bataille. Tu le trouvera quelque part dans l`impitoyable désert. Vas-y et offre-lui l`opportunité de rencontrer son dieu...','Combat en un contre deux dans une quête de type pèlerinage.');
		juenOpis('Deviens Le Maître de la Cité. Là et maintenant.','Passer en zone 1.');
		juenOpis('Le Seigneur de l’Obscurité veut que dans sa Cathédrale on ne manque pas de sang. Etant un membre de Cercle Intérieur tu es obligé de faire un sacrifice. Accumule 800 000 litres de sang et sacrifie 10% de cette réserve au Seigneur.','Cliquer sur «Cliquez ici pour donnez les ressources» une fois les 800 000 litres de sang sur soi.');
		juenOpis('Une véritable expérience ne peut s’acquérir qu`en parcourant les voies dangereuse. Fait au moins 15 pèlerinages (réussis) vers l`inconnu.','Réussir 15 pèlerinages en z2. Le jeu conserve le nombre de pèlerinage réussi même si on descend ou monte de zone entre deux sessions d`essais.');
		juenOpis('Tu as été informé d`une anomalie étrange située quelque part dans le désert. Trouve et explique ce phénomène mystérieux.','Réussir un pèlerinage avec comme test ??? qui est une moyenne entre votre intelligence et votre savoir.');
		juenOpis('Tes agents t`ont signalé que près d`un pillard tué aux alentours d`une ville ils ont trouvés une lettre. Cette lettre indique que ton arrière-petite-fille, Anhala est emprisonnée sur les Champs de Couvoirs. Organise une expédition de secours.','Lancer n`importe quelle expédition, 1 gargouille de 6-8K PV par participant (minimum 3 gargouilles). Assez difficile, il est conseillé d`avoir plus de 90 d`agilité pour esquiver leurs attaques.');
		juenOpis('La ville entière observe les membres du Conseil. Montre ta puissance et assure le sang pour tes protégés. Développe l`Hôpital jusqu`au niveau 7 et la Boucherie jusqu`au niveau 22.','Construire l`hôpital au niveau 7 et la boucherie au niveau 22. Si l`un des deux est déjà construit à un niveau suffisant, il suffit de construire l`autre au niveau requis. Si les deux sont déjà construit aux niveaux requis, il suffit de monter le niveau de l`un d`eux.');
		juenOpis('La réputation ce n`est pas tout, les vampires ne suivent que les plus puissants. Atteins le 84-ième niveau d`expérience.','Gagner un niveau qui fait monter au moins au niveau 84.');

		// s3 (opisy zbieral Prime Lust - https://docs.google.com/document/d/1eMFHEc0ieY_254Qsjs-90peIv2olOjEYpvsVYC1wQSU/edit?pli=1
		juenOpis('Accomplis tous les Pèlerinages vers L`Inconnu.','Réussir un pèlerinage qui complète la série des 9 pèlerinages à accomplir dans l`ordre. Dans le cas où vous les auriez déjà complétés, il suffit de réussir un pèlerinage.')
		juenOpis('Dans un coin inconnu du désert le Roi Des Loups rassemble des troupes pour régler ton compte. Trouve sa demeure et épargne-lui cette peine en l`achevant. La légende dit qu`il ne peut être tué seulement à l`aide de balles en argent... ','Combat en un contre trois ou quatre dans une quête de type pèlerinage.')
		juenOpis('Atteints le 50-ième niveau d`expérience. ','Gagner un niveau qui fait monter au moins au niveau 50.')
		juenOpis('Fais bâtir toutes les constructions de la troisième zone. ','Construire le quotidien local et l`hôpital. Si l`un des deux est déjà construit, il suffit de construire l`autre. Si les deux sont déjà construit, il suffit de monter le niveau de l`un d`eux.')
		juenOpis('Depuis toujours, les règles de guerre disent que la meilleur forme de défense c`est l`attaque. Développe le Magasin D`Armes jusqu`au niveau 5.','Construire le magasin d`armes au niveau 5 ou plus.')
		juenOpis('Depuis toujours, les règles de guerre disent que la meilleure forme de défense c`est l`attaque. Développe le Magasin D`Armes jusqu`au niveau 5.','Construire le magasin d`armes au niveau 5 ou plus.') 
		juenOpis('Dernièrement, tes rivaux ont toujours une longueur d`avance sur toi. Développe le Quotidien Local jusqu`au niveau 4 pour mieux réagir aux activités des espions adverses.','Construire le quotidien local au niveau 4 ou plus.')
		juenOpis('Tes agents de sécurité ont découvert une clique d`espions. Ils occupent un des immeubles dans ton quartier. Organise un siège et extermine les comme des termites.','Lancer un siège. Plutôt simple.')
		juenOpis('Depuis toujours, tu étais sûr que ce jour arriverait bien à un moment ou un autre... Passe à la Deuxième Zone et deviens l`un des membres du Conseil!','Passer en zone 2.')
		juenOpis('Chaque vampire étant au premier rang doit envoyer les gens pour servir dans une Cathédrale. Rassemble 500 000 esclaves et fait en le sacrifice de 10% au Maitre.','Cliquer sur «Cliquez ici pour donnez les ressources» une fois les 500 000 de population sur soi.')
		juenOpis('Chaque vampire étant au premier rang doit envoyer les gens pour servir dans une Cathédrale. Rassemble 500 000 esclaves et fais en le sacrifice de 10% au Maitre.','Cliquer sur «Cliquez ici pour donnez les ressources» une fois les 500 000 de population sur soi.')
		juenOpis('Beaucoup de jours ce sont écouler depuis que ton fils est parti en expédition vers l`inconnu et tu n`as reçu aucune nouvelle de lui. Plein d`inquiétude, tu as décidé de commencer les recherches.','Réussir un pèlerinage avec comme test ??? qui est une moyenne entre votre intelligence et votre perception.')
		juenOpis('Le prestige, le pouvoir, la splendeur ... pour maintenir tout cela tu as besoin d`argents. Tu dois agrandir tes revenus. Développe la Maison Close jusqu`au niveau 14.','Construire la maison close au niveau 14 ou plus.')
		juenOpis('Ton pouvoir et ta réputation t’ont permis de devenir l’un des vampires le plus influent de la ville. Un des membres du Conseil t`a demandé de l`aider pour détruire la bande de mutants qui ravage les routes commerciales.','Combat en un contre un dans une quête de lointaine. Il y a plusieurs type de mutant, ne vous découragez pas au premier venu. Il est conseillé d`y aller avec un gros stuff cac.')
		juenOpis('Fait un acte héroïque. Seul cet acte attirera sous ton drapeau les vampires puissants.','Réussir un pèlerinage qui complète la série des 9 pèlerinages à accomplir dans l`ordre. Dans le cas où vous les auriez déjà complétés, il suffit de réussir un pèlerinage.')
		juenOpis('Fais un acte héroïque. Seul cet acte attirera sous ton drapeau les vampires puissants.','Réussir un pèlerinage qui complète la série des 9 pèlerinages à accomplir dans l`ordre. Dans le cas où vous les auriez déjà complétés, il suffit de réussir un pèlerinage.')

		// s4 (opisy zbieral Prime Lust - https://docs.google.com/document/d/1eMFHEc0ieY_254Qsjs-90peIv2olOjEYpvsVYC1wQSU/edit?pli=1	
		juenOpis('Il y a quelques solutions pour acquérir du respect dans le monde des morts-vivants. L`une d`elles c`est de posséder de puissants artefacts. Accomplis 4 Pèlerinages vers l`Inconnu.','Réussir votre 4ème pèlerinage. Dans le cas où vous l`auriez déjà complété, il suffit de réussir un pèlerinage.');
		juenOpis('Tu as l`argent et tu sais comment le gagner. Maintenant tu dois gagner le respect auprès de la foule. Développe L`Agence d`Emploi jusqu`au 15-ième niveau. ','Construire l`agence d`emploi au niveau 15 ou plus.');
		juenOpis('Le chefs d`une meute de loups-garous a juré de venger la bande que tu as achevé sur ton quartier. Tu trouvera sa cachette quelque part loin de la Cité si tu veux terminer sa misérable existence.','Combat en un contre deux ou trois dans une quête lointaine. Il est déconseillé d`y aller avec une arme à feu.');
		juenOpis('Tu as remarqué une chaîne de contaminations d`une étrange maladie parmi la population de ton quartier. Tes espions suggèrent de chercher la cause dans les environs de La Cité. ','Trois combat en un contre un dans une quête dans les environs de La Cité. Pensez à prévoir assez de sang pour tenir trois combats d`affilé.');
		juenOpis('Atteints le 35-ième niveau d`expérience. ','Gagner un niveau qui fait monter au moins au niveau 35.');
		juenOpis('Pendant que tu menais ta dernière quête, un vampire-usurpateur a pris de force ton siège général. Avec l`aide de ton clan regagne ta place.','Lancer un siège. Plutôt simple.');
		juenOpis('Fais bâtir toutes les constructions de la quatrième zone.','Construire la garnison, le trafiquant d`armes, les urgences et le mont de piété. Si certains d`entre d`eux sont déjà construit, il suffit de construire les autres. S`ils sont tous déjà construit, il suffit de monter le niveau de l`un d`eux.');
		juenOpis('Le Pouvoir!! Avance jusqu`à la troisième zone et prends part au Cercle Intérieur.','Passer en zone 3.');
		juenOpis('La tradition veut que chaque nouveaux Inquisiteur fait un festin auquel il invite tous les habitants de la ville. Le vampire avec ta rang doit montrer sa richesse et être généreux. Accumule sur ton compte 5 000 000 et faire le sacrifice de 10% de cette somme.','Cliquer sur «Cliquez ici pour donnez les ressources» une fois les 5 000 000 de LOL sur soi.');
		juenOpis('Tes éclaireurs t`ont informé des phénomènes étranges sur une Grande Steppe. Ils suggerent que tu devrais verifier la situation avant qu`il soit trop tard.','Une fois que vous aurez la médaille du chasseur de têtes (tuer l`hydre), lorsque vous lancerez une expédition sur la Grande Steppe, vous aurez une chance de tomber contre l`Esprit de l`Inquisitrice.<br />Prévoyer de bons cogneurs car celle-ci a pas mal de vie et esquive pas mal de coup. Son agilité est très variable, il est conseillé d`avoir plus de 170 d`agilité pour les cac. Pour les gunner 95 de perception sera suffisant.');
		juenOpis('Les personnages importants ont toujours beaucoup plus d`ennemis ce pourquoi tu as besoin d`avoir de la protection supplémentaire. Développe le Poste de Police et la Maison de Refuge jusqu`au niveau 18.','Construire le poste de police au niveau 18 et la maison du refuge au niveau 14 (le texte de la quête n`est pas à jour). Si l`un des deux est déjà construit à un niveau suffisant, il suffit de construire l`autre au niveau requis. Si les deux sont déjà construit aux niveaux requis, il suffit de monter le niveau de l`un d`eux.');
		juenOpis('Les corps massacrés sans les têtes, sans les entrailles. Qu`est-ce qu`il se passe? Envoie les espions vers ton quartier et verifie qui est derriere ça. ','Espionner son propre quartier, quel que soit le stuff utilisé et le nombre d`espions envoyés, il y aura toujours 1% de chance de réussir cet espionnage.');
		juenOpis('Les informations obtenues d`un jeune homme vous dirigent vers une auberge au dehors de la ville. Avec la groupe des autres vampires vérifiez ce qui se passe.','Lancer un siège.');
		juenOpis('Soirée, quand tu t`es réveillé, tu as trouvé une lettre étrange sur ton bureau. Barbouillé de sang il n`a contenu que les trois mots: "Sauve", "Emprisonnée", "Loin" - écrits sur le parchemin avec précipitation, en désordre. Qu`est-ce que cela peut signifier?','Réussir une quête lointaine avec comme test ??? qui est une moyenne entre votre intelligence et votre agilité.');
		juenOpis('Fait preuve de courage. Seulement cela attirera sous ton drapeau les meilleurs chasseurs.','Réussir une quête lointaine «Charisme».');

		// s5 
		juenOpis('Ta situation financière nous inquiète, Acolyte. Développe La Maison Close jusqu`au niveau 3.','Construire la maison close au niveau 3 ou plus.');
		juenOpis('Le sang est la source de notre force. Bâtis 5 niveaux de La Boucherie sur ton quartier.','Construire la boucherie au niveau 5 ou plus.');
		juenOpis('Atteints le 10-ième niveau d`expérience.','Gagner un niveau qui fait monter niveau 10.');
		juenOpis('Un dangereux mutant a pénétré jusqu`à la zone extérieure de La Cité, il doit être arrêté avant qu`il ne cause plus de dégâts. Il a été repéré récemment dans les environs de La Cité.','Combat en un contre un dans une quête dans les environs de La Cité. Il est conseillé de monter agilité et perception.');
		juenOpis('Examines soigneusement les environs de La Cité.','Réussir toutes les quêtes dans les environs de La Cité.');
		juenOpis('Chaque vampire qui se respecte doit posséder une collection d`artefacts. Accomplis toutes les quêtes lointaines.','Réussir toutes les quêtes lointaines. Si c`est déjà fait, il suffit de réussir une quête lointaine.');
		juenOpis('Il n`y a que les meilleurs de tous qui valent cette mission et qui possèdent des objets puissants. Accomplis un Pèlerinage vers l`Inconnu.','Réussir un pèlerinage.');
		juenOpis('Une bande de loups-garous rode dans les parages. Il faut l`éliminer en menant une offensive sur ton quartier.','Lancer un siège. Siège simple avec l`aide de son clan.');
		juenOpis('L`argent et le trafique d`armes c`est les facteurs, qui te permettront de survivre. Pour stabiliser ta situation développes La Maison Close jusqu`au niveau 10 et fais construire le  Marché Noir.','Construire la maison close niveau 10 et le marché noir. Si l`un des deux est déjà construit, il suffit de construire l`autre. Si les deux sont déjà construit, il suffit de monter le niveau de l`un d`eux.')
		juenOpis('Tu es né pour avancer. Prouve-le en joignant la IV zone.','Passer en zone 4.');
		juenOpis('Augmente ton pouvoir dans le monde de l`obscurité en recrutant un vassal (tu peux le faire en utilisant le lien de reference qui se trouve dans la salle du trone).','Demander à quelqu`un de s`inscrire sur le jeu en utilisant le lien de référence.');

		// moria/necro mix (+s1)
		juenOpis('Pieniądze i handel bronią to czynniki, które pozwolą Ci przetrwać. Osiągnij stabilizację, rozbudowując Dom Publiczny na 8 poziom oraz Postój Taxi na 2 poziom.','Wybuduj Dom publiczny na poziom 8 oraz Postój Taxi na poziom 2. Jeśli już masz te budynki, wystarczy podnieść jeden z nich o poziom');
		juenOpis('Prestiż wśród wampirów to nie tylko bogactwo i władza. Tylko wielki wojownik wzbudza prawdziwy respekt.','Wygraj 15 walk pod rząd urządzając zasadzkę. Walki w obronie się nie liczą.');
		juenOpis('Pomimo ostrzeżeń doradców, wyprawiasz się czasami na samotne spacery w okolice miasta. Przypominają Ci czasy, kiedy byłeś młodym wampirem, który przybył do miasta marząc o sławie i władzy.','Należy pokonać assasyna na bliskiej wyprawie');
		juenOpis('Pomimo ostrzeżeń doradców, wyprawiasz się czasami na samotne spacery w okolice miasta. Przypominają Ci czasy, kiedy byłaś młodym wampirem, który przybył do miasta marząc o sławie i władzy.','Należy pokonać assasyna na bliskiej wyprawie');
		juenOpis('Zdobądź 89 poziom.','Zdobądź 89 poziom.');
		juenOpis('Wszystkie zagadkowe historie nagle stały się jasne. U wrót miasta stanęła armia potężnych magów, mających przed sobą tylko jeden cel - doszczętne zniszczenie miasta i "wyzwolenie" ludzi od gnębiących ich wampirów. Czas, by wszystkie wampiry zjednoczyły się w walce przeciwko wspólnemu wrogowi.','Oblężenie na własny kwadrat przeciw Bractwu Chaosu.');
		
	}
	if (a=="?a=profile") {

		//On lance levelcalc
		if (GM_getValue(id+"UM_OP_levelcalc", true)) { dspProfile(); }

		//On reprend unmod

		ref = document.getElementsByClassName('content-mid')[0].getElementsByTagName('A')[1].innerHTML;
		num = ref.substring(ref.search('uid=')+4);
		div = document.getElementsByClassName('profile')[0];
		div.innerHTML+='<BR>Signature <a href="http://zk.nakoz.org/'+num+id+'lfr.png">http://zk.nakoz.org/'+num+id+'lfr.png</a>:<br><img width="328" src="http://zk.nakoz.org/'+num+id+'lfr.png">';
	}
	if (a=="?a=quest") {

		version = document.getElementById('content-mid');
		ver2 = document.createElement('SPAN');
		ver2.innerHTML='<br><center><iframe scrolling=no src="http://amendil.free.fr/bloodwars/UnMod/frenchUnmod_sondages.html" width="800" style="margin-top: -20px;" frameborder=0 height="56"></iframe></center>';
		version.insertBefore(ver2,version.firstChild);

	}

	if (a=="?a=ambush") {
		test = document.getElementsByClassName('players');
		i = test.length-1;
		if (test.length && test[i].href != null) {
			uid = test[i].href.substr(test[i].href.search('uid=')+4);	

			sid=3;
			for (sid=3; sid<document.getElementsByTagName('script').length; sid++) {
				if (document.getElementsByTagName('script')[sid].innerHTML.search("refLinks.atkTime")!=-1) break;
			}
			if (document.getElementsByTagName('script')[sid].innerHTML.search("refLinks.atkTime")!=-1) {

			
				mid = document.getElementsByTagName('script')[sid].innerHTML.substr(document.getElementsByTagName('script')[sid].innerHTML.search('a=msg&do=view&mid=')+18);
				mid = mid.substr(0,mid.search('"'));
				teraz = new Date();
				teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
				teraz = teraz.getDate()+'/'+(teraz.getMonth()+1)+'/'+teraz.getFullYear();
				if (GM_getValue(id+'UM_1_'+uid, "A:B")!=mid+':'+teraz && GM_getValue(id+'UM_2_'+uid, "A:B")!=mid+':'+teraz) {			
					GM_setValue(id+'UM_2_'+uid, GM_getValue(id+'UM_1_'+uid, "A:B"));
					GM_setValue(id+'UM_1_'+uid, mid+':'+teraz);
				}
			}
		}
		
	}

	setInterval( function () { 
		if (GM_getValue(id+'UM_OP_alarm_on',false)) {
			if (document.getElementById('alm')) {
			} else {
				d = document.getElementById('content-mid');
				span = document.createElement('SPAN');
				span.id="alm";
				span.innerHTML='<center style="font-size: 20px; font-weight: bold;"><a class="active" id="_alarm" href="javascript:">ALARME (cliquez pour désactiver)</a><embed src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" height=0 width=1></center><br>';
				d.insertBefore(span,d.firstChild);
				document.getElementById('_alarm').addEventListener('click', function() {GM_setValue(id+"UM_OP_alarm_on",false); document.getElementById('alm').innerHTML=""; document.getElementById('alm').style.display="none";}, false);
			}
		} else {
			if (document.getElementById('alm')) {
				document.getElementById('alm').innerHTML=""; document.getElementById('alm').style.display="none";
			}
		}
	}, 2000);

	if (GM_getValue(id+"UM_OP_youtube", true)) {
	var i = setInterval(function () {
	sb = document.getElementById('sbox_global_container');
	a = sb.getElementsByTagName('a');
	for (i=0; i<a.length; i++) {
		if (a[i].href.substring(0,22)=="http://www.youtube.com" && a[i].id != "done") {
			a[i].id="done";
			iframe = document.createElement('IFRAME');
			iframe.width="265";
			iframe.height="199";
			iframe.frameBorder="0";
			iframe.allowfullscreen=true;
			iframe.src="http://www.youtube.com/embed/" + a[i].href.substring(a[i].href.search("v=")+2,a[i].href.search("v=")+2+11);
			a[i].appendChild(iframe);
			unsafeWindow.scrollSbox('global');
		}
	}		
	sb = document.getElementById('sbox_clan_container');
	a = sb.getElementsByTagName('a');
	for (i=0; i<a.length; i++) {
		if (a[i].href.substring(0,22)=="http://www.youtube.com" && a[i].id != "done") {
			a[i].id="done";
			iframe = document.createElement('IFRAME');
			iframe.width="265";
			iframe.height="199";
			iframe.frameBorder="0";
			iframe.allowfullscreen=true;
			iframe.src="http://www.youtube.com/embed/" + a[i].href.substring(a[i].href.search("v=")+2,a[i].href.search("v=")+2+11);
			a[i].appendChild(iframe);
			unsafeWindow.scrollSbox('clan');
		}
	}			
	},1000);
	}


	//menu list to easily choose the set you want to wear
	div='<div id="quick_tools" style="width: auto; float: right; border: 1px solid gray; padding: 2px 10px; margin: 2px; cursor: pointer;"><select style="height: 20px; font-size: 10px;" name="toolbar" onchange="document.location.href=\'?a=equip&amp;eqset=\'+this.value;"><option value="0">&gt;</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div>';
	divs = document.getElementsByTagName('DIV');
	mydiv=divs[divs.length-4];
	if (mydiv.innerHTML.search("&nbsp;")!=-1) mydiv=divs[divs.length-1];
	mydiv.innerHTML+=div;


	//notes on every pages
	if(GM_getValue(id+"UM_OP_notesEverywhere", true)) {
		divs = document.getElementsByClassName('top');
		div='<div id="notesEverywhere" style="position: relative; z-index: 1; background-color: black; width: auto; float: left; border: 1px solid gray; padding: 2px 10px; margin-top: -20px; margin-left: -180px; cursor:pointer;">Notes</div>';
		divAddNotes='<div id="notesEverywhere2" style="display: none; float: left; width: 100px; margin-top: 30px; margin-left: -180px;"><fieldset class="profile" style="text-align: center; height: 150px; width: 200px;"><textarea id="UM_notka0" style="width: 100%; height: 96%;">'+GM_getValue(id+"UM_notka0")+'</textarea></fieldset>';
		divs[0].innerHTML+=div+divAddNotes;
	
		var button = document.getElementById('notesEverywhere');
		button.onclick = function() {
		    var div = document.getElementById('notesEverywhere2');
		    if (div.style.display !== 'none') {
			divs[0].style.zIndex = 3;
		        div.style.display = 'none';
		    }
		    else {
			divs[0].style.zIndex = 5;
		        div.style.display = 'block';
		    }
		};
		document.getElementById('UM_notka0').addEventListener('keyup', function() {GM_setValue(id+"UM_notka0",this.value);}, false);
	};
} //unmodon

