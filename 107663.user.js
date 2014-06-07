// ==UserScript==
// @author         schizo85
// @name           Przeredagowana strona klanowa w Bloodwars
// @namespace      bw
// @description    Przeredagowana strona klanowa w Bloodwars
// @include        http://r*.bloodwars.interia.pl/?*
// @include        http://r*.bloodwars.interia.pl/index.php?*
// ==/UserScript==


///////////////////////////
//	LANGUAGE	//
/////////////////////////

var sAvgClan = 0;
var sNow = 1;

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
	if (RACE=="łapacz myśli"){
		CE++; 
	}
	if (RACE=="kultysta"){
		CULT++; 
	}
	if (RACE=="władca zwierząt"){
		SDB++; 
	}
	if (RACE=="ssak"){
		ABS++; 
	}
	if (RACE=="potępiony"){
		DAMN++; 
	}
}

function sexeCalc(SEXE){
	if (SEXE=="Mężczyzna"){
		MEN++; 
	}
	if (SEXE=="Kobieta"){
		WOM++; 
	}
}

function cropTime(data){
		myArray	= /(\d+\sd.\s?)?(\d+\sgodz.\s?)?(\d+\smin.\s?)?(\d+\ssek.)?/.exec(data);                
		jour	=/(\d+)?\sd./.exec(myArray[1]);
		heure	=/(\d+)?\sgodz./.exec(myArray[2]);
		minute	=/(\d+)?\smin./.exec(myArray[3]);
		seconde	=/(\d+)?\ssek./.exec(myArray[4]);
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
		img = "http://outils.teamvip.eu/bw/bw_time/out.gif";
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

	timea	= data.indexOf("onmouseover=\"return overlib('", 0);
	timeb	= data.indexOf(" ');\" onmouseout=\"nd();\"", timea);
	time	= data.substring(timea+29, timeb);
	if(start.length>4 && join.length>4){
		if ((start == strings[sNow]) && (join != strings[sNow])){
			imgsrc = 'http://outils.teamvip.eu/bw/e_2.gif'
		}else if((start != strings[sNow]) && (join == strings[sNow])){
			imgsrc = 'http://outils.teamvip.eu/bw/e_1.gif'
		}else if((start != strings[sNow]) && (join != strings[sNow])){
			imgsrc = 'http://outils.teamvip.eu/bw/e_3.gif'
		}else{
			imgsrc = 'http://outils.teamvip.eu/bw/e_0.gif'
		}
		img		= TRindex.getElementsByTagName("TD")[1].getElementsByTagName("IMG");
		img[1].src	= imgsrc;

		if (data.indexOf("unknown")==-1) {
		      img[0].src	= imgReturn(cropTime(time));			  
		}
	}
}

function dspProfile(){
	myClan = GM_getValue(location.hostname + "clanName");

	var TABLE	= document.getElementsByTagName("TABLE");
	var TD		= TABLE[3].getElementsByTagName("TD");
	var newRow	= TABLE[3].insertRow(6);

	var newCell	= newRow.insertCell(0);
	newCell.innerHTML = '<b>POZIOM</b>';
	newCell		= newRow.insertCell(1);
	newCell.innerHTML = levelCalc(parseInt(TD[10].innerHTML, ""));

	data	= TABLE[3].getElementsByTagName("TR")[3].getElementsByTagName("TD")[1].innerHTML;
	nba	= data.indexOf("\">", 0);
	nbb	= data.indexOf("</a>", nba);
	start	= data.substring(nba+2, nbb);
	if(myClan==start){
		RACE	= TABLE[3].getElementsByTagName("TR")[0].getElementsByTagName("TD")[1].innerHTML;
		NOM	= document.getElementsByClassName("profile-hdr")[0].innerHTML;
		nba	= NOM.indexOf("Profil wawpira ", 0);
		nbb	= NOM.length;
		NOM	= NOM.substring(nba+16, nbb-1);
		GM_setValue(location.hostname + "RACE_"+NOM, RACE);

		SEXE	= TABLE[3].getElementsByTagName("TR")[1].getElementsByTagName("TD")[1].innerHTML;
		GM_setValue(location.hostname + "SEXE_"+NOM, SEXE);
	}
}

function dspClan(){
	var ME		= document.getElementsByClassName("me")[0].innerHTML;

	var TABLE	= document.getElementsByTagName("TABLE");
	var nbTR	= TABLE[4].getElementsByTagName("TR").length;
	var TR		= TABLE[4].getElementsByTagName("TR");
	var newCellClan	= TR[0].insertCell(4);
	newCellClan.innerHTML = 'POZIOM';
	newCellClan.width = 50;

	if (GM_getValue(location.hostname + "clanName") != null && GM_getValue(location.hostname + "clanName") == getClan()){
		var newCellRace		= TR[0].insertCell(5);
		newCellRace.innerHTML	= 'RASA';
		newCellRace.width	= 133;

		var newCellSexe		= TR[0].insertCell(1);
		newCellSexe.innerHTML	= 'PŁEĆ';
		newCellSexe.width	= 30;

	}

	var clan;
	var totLevel = 0;
	for (i=1; i<nbTR; i++){
		user	= TR[i].getElementsByTagName("TD")[0].innerHTML;
		var td = TR[i].getElementsByTagName("TD")[5];
		var datt = td.innerHTML;
		td.innerHTML = datt.match(/.* /);
		nba	= user.indexOf("\">", 0);
		nbb	= user.indexOf("</a>", nba);
		user	= user.substring(nba+2, nbb);

		newCellClanPlayer		= TR[i].insertCell(4);
		newCellClanPlayer.innerHTML	= levelCalc(TR[i].getElementsByTagName("TD")[5].innerHTML,"");
		totLevel			+= (levelCalc(TR[i].getElementsByTagName("TD")[5].innerHTML, "Clan"));
		expePlayer(TR[i]);

		if (GM_getValue(location.hostname + "clanName") != null && GM_getValue(location.hostname + "clanName") == getClan()){
			newCellRacePlayer		= TR[i].insertCell(5);
			if(GM_getValue(location.hostname + "RACE_"+user)!= undefined){
				newCellRacePlayer.innerHTML	= '<span style="text-transform: capitalize;">'+GM_getValue(location.hostname + "RACE_"+user).toLowerCase()+'</span>';
				raceCalc(GM_getValue(location.hostname + "RACE_"+user).toLowerCase());
			}else{
				newCellRacePlayer.innerHTML	= 'N/C';
			}
			newCellRacePlayer.width		= 110;

			newCellSexePlayer		= TR[i].insertCell(1);
			if(GM_getValue(location.hostname + "SEXE_"+user)!= undefined){
				var Plec=""
				if (GM_getValue(location.hostname + "SEXE_"+user) == "Mężczyzna") {
					Plec = "Homme";
				} else {
					Plec = "Femme";
				}
				newCellSexePlayer.innerHTML	= '<img src="http://outils.teamvip.eu/bw/'+Plec+'.png" />';
				sexeCalc(GM_getValue(location.hostname + "SEXE_"+user));
			}else{
				newCellSexePlayer.innerHTML	= 'N/C';
			}
			newCellSexePlayer.width		= 30;
		}

		if(user==ME){
			clan = 1;
		}
	}

	var moyLevel		= Math.floor(totLevel/(nbTR-1));
	var newRow		= TABLE[5].insertRow(2);
	var newCell		= newRow.insertCell(0);
	newCell.innerHTML	= '<b>'+strings[sAvgClan]+'</b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+moyLevel+'</b>';

	newRow			= TABLE[5].insertRow(3);
	newCell			= newRow.insertCell(0);
	newCell.style.padding	= '5px 5px 5px 5px';
	newCell.innerHTML	= '';

	newRow			= TABLE[5].insertRow(4);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">Łapaczów Myśli</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+CE+'</b>';

	newRow			= TABLE[5].insertRow(5);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">Kultystów</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+CULT+'</b>';

	newRow			= TABLE[5].insertRow(6);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">Władców Zwierząt</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+SDB+'</b>';

	newRow			= TABLE[5].insertRow(7);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">Ssaków</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+ABS+'</b>';

	newRow			= TABLE[5].insertRow(8);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">Potępionych</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+DAMN+'</b>';

	newRow			= TABLE[5].insertRow(9);
	newCell			= newRow.insertCell(0);
	newCell.style.padding	= '5px 5px 5px 5px';
	newCell.innerHTML	= '';

	newRow			= TABLE[5].insertRow(10);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">Mężczyzn</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+MEN+'</b>';

	newRow			= TABLE[5].insertRow(11);
	newCell			= newRow.insertCell(0);
	newCell.innerHTML	= '<b><span style="text-transform: capitalize;">Kobiet</span></b>';
	newCell			= newRow.insertCell(1);
	newCell.style.padding	= '0 0 0 30px';
	newCell.innerHTML	= '<b>'+WOM+'</b>';

	if(clan==1){
		GM_setValue(location.hostname + "clanName", getClan());
	}
}

function getClan(){
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
	newCell.innerHTML = 'POZIOM';
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
var strings = new Array(
	"Średni poziom klanu: ",
	"TERAZ"
);

whereIam();