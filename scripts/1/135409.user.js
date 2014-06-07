// ==UserScript==
// @author         ΞViPΞ Team
// @name           levelCalc for BloodWars
// @namespace      bw
// @description    Ce script affiche le level de chaque joueur sur les pages profile, clan et classement. This script display the level for each player on profile, clan and rank page.
// @include        http://r*.fr.bloodwars.net/?*
// @include        http://r*.fr.bloodwars.net/index.php?*
// ==/UserScript==


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
		if (sec>0 && sec<=60){
			img = "http://outils.teamvip.eu/bw/bw_time/online.gif";
		}
		if (sec>60 && sec<=100){
			img = "http://outils.teamvip.eu/bw/bw_time/1.gif";
		}
		if (sec>100 && sec<=200){
			img = "http://outils.teamvip.eu/bw/bw_time/2.gif";
		}
		if (sec>200 && sec<=300){
			img = "http://outils.teamvip.eu/bw/bw_time/3.gif";
		}
		if (sec>300 && sec<=400){
			img = "http://outils.teamvip.eu/bw/bw_time/4.gif";
		}
		if (sec>400 && sec<=500){
			img = "http://outils.teamvip.eu/bw/bw_time/5.gif";
		}
		if (sec>500 && sec<=600){
			img = "http://outils.teamvip.eu/bw/bw_time/6.gif";
		}
		if (sec>600 && sec<=700){
			img = "http://outils.teamvip.eu/bw/bw_time/7.gif";
		}
		if (sec>700 && sec<=800){
			img = "http://outils.teamvip.eu/bw/bw_time/8.gif";
		}
		if (sec>800 && sec<=900){
			img = "http://outils.teamvip.eu/bw/bw_time/9.gif";
		}
	}
	else if(sec>=86400 && sec <=950400){
		if (sec>86400 && sec<=172800){
			img = "http://outils.teamvip.eu/bw/bw_time/a1.gif";
		}
		if (sec>172800 && sec<=259200){
			img = "http://outils.teamvip.eu/bw/bw_time/a2.gif";
		}
		if (sec>259200 && sec<=345600){
			img = "http://outils.teamvip.eu/bw/bw_time/a3.gif";
		}
		if (sec>345600 && sec<=432000){
			img = "http://outils.teamvip.eu/bw/bw_time/a4.gif";
		}
		if (sec>432000 && sec<=518400){
			img = "http://outils.teamvip.eu/bw/bw_time/a5.gif";
		}
		if (sec>518400 && sec<=604800){
			img = "http://outils.teamvip.eu/bw/bw_time/a6.gif";
		}
		if (sec>604800 && sec<=691200){
			img = "http://outils.teamvip.eu/bw/bw_time/a7.gif";
		}
		if (sec>691200 && sec<=777600){
			img = "http://outils.teamvip.eu/bw/bw_time/a8.gif";
		}
		if (sec>777600 && sec<=864000){
			img = "http://outils.teamvip.eu/bw/bw_time/a9.gif";
		}
		if (sec>864000 && sec<=950400){
			img = "http://outils.teamvip.eu/bw/bw_time/a10.gif";
		}
	}
	else if(sec>950400){
		if (sec<2678400){
			img = "http://outils.teamvip.eu/bw/bw_time/out.gif";
		}
		if (sec>2678400){
			img = "http://outils.teamvip.eu/bw/bw_time/dead.gif";
		}
	}
	else{
		img = "http://outils.teamvip.eu/bw/bw_time/offline.gif";
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
			imgsrc = 'http://outils.teamvip.eu/bw/e_2.gif'
		}else if((start != strings[sNow]) && (join == strings[sNow])){
			// on ne peut pas lancer mais seulement joindre
			imgsrc = 'http://outils.teamvip.eu/bw/e_1.gif'
		}else if((start != strings[sNow]) && (join != strings[sNow])){
			// on ne peut ni lancer ni joindre
			imgsrc = 'http://outils.teamvip.eu/bw/e_3.gif'
		}else{
			// on peut lancer et joindre
			imgsrc = 'http://outils.teamvip.eu/bw/e_0.gif'
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
				newCellSexePlayer.innerHTML	= '<img src="http://outils.teamvip.eu/bw/'+GM_getValue(location.hostname + "SEXE_"+user)+'.png" />';
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



	TR		= TABLE[7].insertRow(nbTR +1);
	newCell		= TR.insertCell(0);
	newCell.colSpan = 10;
	newCell.innerHTML= '<span style="padding-left: 86px;"><img src="http://outils.teamvip.eu/bw/bw_time/out.gif" /> Absent depuis plus de 10 jours, <img src="http://outils.teamvip.eu/bw/bw_time/dead.gif" /> Absent depuis plus de 30 jours</span>';

	TR		= TABLE[7].insertRow(nbTR +2);
	newCell		= TR.insertCell(0);
	newCell.colSpan = 10;
	newCell.innerHTML= '<span style="padding-left: 86px;"><img src="http://outils.teamvip.eu/bw/bw_time/a1.gif" /> Absent depuis 1 jour ....... <img src="http://outils.teamvip.eu/bw/bw_time/a10.gif" /> Absent depuis 10 jours</span>';

	TR		= TABLE[7].insertRow(nbTR +3);
	newCell		= TR.insertCell(0);
	newCell.colSpan = 10;
	newCell.innerHTML= '<span style="padding-left: 86px;"><img src="http://outils.teamvip.eu/bw/e_0.gif" /> Peux lancer et rejoindre l\'expédition, <img src="http://outils.teamvip.eu/bw/e_3.gif" /> Ni joindre / ni lancer, <img src="http://outils.teamvip.eu/bw/e_1.gif" /> Que joindre, <img src="http://outils.teamvip.eu/bw/e_2.gif" /> Que lancer</span>';


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

function whereIam(){
	var profilePage	= document.getElementsByClassName("profile-hdr")[0];
	if (profilePage != undefined) { dspProfile(); }

	var clanPage	= document.getElementsByClassName("clanOwner")[0];
	var clanPage1	= document.getElementsByClassName("clan-desc")[0];
	if (clanPage != undefined && clanPage1 != undefined) { dspClan(); }

	var rankPage	= document.getElementsByClassName("rank")[0];
	if (rankPage != undefined) { dspRank(); }
}


///////////////////////////
//	   MAIN		//
/////////////////////////
var strings;
strings = frenchStrings;

whereIam();