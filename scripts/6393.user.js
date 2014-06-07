// ==UserScript==
// @name Ogame FR : Standard overview.php (Overview)
// @author Izcelion
// @description Ogame FR : Standard overview.php (Overview)
// @language FR
// @include http://*/game/overview.php*
// @exclude http://*/game/allianzdepot.php*
// @exclude http://*/game/allianzen.php*
// @exclude http://*/game/b_building.php*
// @exclude http://*/game/bericht.php*
// @exclude http://*/game/bewerbungen.php*
// @exclude http://*/game/buddy.php*
// @exclude http://*/game/buildings.php*
// @exclude http://*/game/flotten1.php*
// @exclude http://*/game/flotten2.php*
// @exclude http://*/game/flottenversand.php*
// @exclude http://*/game/galaxy.php*
// @exclude http://*/game/imperium.php*
// @exclude http://*/game/infos.php*
// @exclude http://*/game/leftmenu.php*
// @exclude http://*/game/logout.php*
// @exclude http://*/game/messages.php*
// @exclude http://*/game/notizen.php*
// @exclude http://*/game/options.php*
// @exclude http://*/game/raketenangriff.php*
// @exclude http://*/game/redir.php*
// @exclude http://*/game/renameplanet.php*
// @exclude http://*/game/resources.php*
// @exclude http://*/game/stat.php*
// @exclude http://*/game/suche.php*
// @exclude http://*/game/techtree.php*
// @exclude http://*/game/writemessages.php*
// ==/UserScript==

//====================
// Get Player Name
//====================
function GetPlayerName (){
	var PlayerName = "Inconnu";
	var sentence1 = "U_fr"+GetUniverse()+":";
	var sentence2 = "=";
	var pos1 = (document.cookie).indexOf(sentence1,0);
	if (pos1>=0) {
		var pos2 = (document.cookie).indexOf(sentence2,pos1+sentence1.length);
		PlayerName  = (document.cookie).substring(pos1+sentence1.length,pos2);
		//alert(PlayerName);
	}
	return PlayerName;
}
	
//===========================
// Get value in a cookie
//===========================
function getCookieVal(offset) {
	var endstr=document.cookie.indexOf (";", offset);
	if (endstr==-1)
      		endstr=document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

//======================================
// Get the value of variable in a cookie
//======================================
function GetCookie (name) {
	var arg=name+"=";
	var alen=arg.length;
	var clen=document.cookie.length;
	var i=0;
	while (i<clen) {
		var j=i+alen;
		if (document.cookie.substring(i, j)==arg)
                        return getCookieVal (j);
                i=document.cookie.indexOf(" ",i)+1;
                        if (i==0) break;}
	return null;
}

//===========================
// Get Server Name
//===========================
function GetServerName(){
	var ServerName = "";
	var sentenceIni = window.location.href;
	var sentence1 = "http://";
	var sentence2 = "/game/";
	var pos1 = sentenceIni.indexOf(sentence1,0);
	if (pos1 >= 0 ){
		var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
		ServerName = sentenceIni.substring(pos1+sentence1.length,pos2);
	}
	//alert(ServerName);
	return ServerName;
}

//===========================
// Get Session ID
//===========================
function GetSessionID(){
	var SessionID = "";
	var sentenceIni = window.location.href;
	var sentence1 = "session=";
	var pos1 = sentenceIni.indexOf(sentence1,0);
	if (pos1 >= 0 ){
		SessionID  = sentenceIni.substring(pos1+sentence1.length,pos1+sentence1.length+12);
	}
	//alert(SessionID);
	return SessionID;
}

//===========================
// Get Universe
//===========================
function GetUniverse(){
	var Universe="Error";
	var ServerName = GetServerName();
	switch(ServerName) {
		case "ogame312.de":
			Universe=1;
			break;
		case "ogame290.de":
			Universe=2;
			break;
		case "ogame199.de":
			Universe=3;
			break;
		case "ogame235.de":
			Universe=4;
			break;
		case "ogame333.de":
			Universe=5;
			break;
		case "ogame200.de":
			Universe=6;
			break;
		case "ogame316.de":
			Universe=7;
			break;
		case "ogame259.de":
			Universe=8;
		case "ogame124.de":
			Universe=9;
			break;
		case "ogame250.de":
			Universe=10;
			break;
		case "ogame251.de":
			Universe=11;
			break;
		case "ogame190.de":
			Universe=12;
			break;
		case "81.169.184.163":
			Universe=13;
			break;
		case "ogame317.de":
			Universe=14;
			break;
		case "ogame215.de":
			Universe=15;
			break;
		case "ogame170.de":
			Universe=16;
			break;
		case "ogame181.de":
			Universe=17;
			break;
		case "ogame186.de":
			Universe=18;
			break;
		case "ogame193.de":
			Universe=19;
			break;
		case "ogame221.de":
			Universe=20;
			break;
		case "ogame208.de":
			Universe=21;
			break;
		case "ogame140.de":
			Universe=22;
			break;
		case "ogame123.de":
			Universe=23;
			break;
		case "ogame286.de":
			Universe=24;
			break;
		case "ogame525.de":
			Universe=25;
			break;
		case "ogame240.de":
			Universe=26;
			break;
		case "ogame213.de":
			Universe=27;
			break;
		case "ogame447.de":
			Universe=28;
			break;
		case "ogame135.de":
			Universe=29;
			break;
		case "ogame338.de":
			Universe=30;
			break;
		case "ogame311.de":
			Universe=31;
			break;
		case "ogame216.de":
			Universe=32;
			break;
		case "ogame388.de":
			Universe=33;
			break;
		case "81.169.184.253":
			Universe=34;
			break;
		case "ogame380.de":
			Universe=35;
			break;
		case "s058.gfsrv.net":
			Universe=36;
			break;
		case "81.169.131.155":
			Universe=37;
			break;
		case "ogame391.de":
			Universe=38;
			break;
		case "ogame449.de":
			Universe=39;
			break;
		case "ogame444.de":
			Universe=40;
			break;
		case "ogame464.de":
			Universe=41;
			break;
		case "ogame474.de":
			Universe=42;
			break;
		case "ogame496.de":
			Universe=43;
			break;
		case "ogame501.de":
			Universe=44;
			break;
		case "ogame544.de":
			Universe=45;
			break;
		case "ogame396.de":
			Universe=46;
			break;
		default:
			Universe="Error";
			break;
	};
	//alert(Universe);
	return Universe;
}

//==========================
// Calculate the expire time
//==========================
function CalcTime(TimeLeft){
	v = new Date();
	var time = v.getTime();
	var ar_time = new Date(time+TimeLeft*1000);
	var ard = ar_time.getDay()+'';
	var armm = ar_time.getMonth()+'';
	var arh = ar_time.getHours()+'';
	var arm = ar_time.getMinutes()+'';
	var ars = ar_time.getSeconds()+'';

	var nw_time = new Date(time);
	var nwd = nw_time.getDay()+'';
	var nwmm = nw_time.getMonth()+'';
	
	var datearrival,timearrival;
	if (nwd==ard && nwmm==armm) {
		datearrival = ''
	} else {
		datearrival = ard+"/"+armm+" ";
	}
	
	timearrival = arh+":"+((arm.length == 1)? "0"+arm:arm)+":"+((ars.length == 1)? "0"+ars:ars);
	return datearrival+timearrival;
}

(function(){

//=================================
// Check if it's a French Universe
//=================================
if (isFinite(GetUniverse())){

	var egrave = String.fromCharCode(232);
	var eaigu = String.fromCharCode(233);
	var ocirconflexe = String.fromCharCode(244);
	var agrave = String.fromCharCode(224);
	
	//==========================================================
	// Get/Save Planet/Moon list
	//==========================================================
	//tabAllPlanet[CptPlanet][0]=Nom
	//tabAllPlanet[CptPlanet][1]=xyz
	//tabAllPlanet[CptPlanet][2]=URL
	//tabAllPlanet[CptPlanet][3]=Construction en cours
	//tabAllPlanet[CptPlanet][4]=URL
	//tabAllPlanet[CptPlanet][5]=Construction en cours
	var optionnode = document.getElementsByTagName('option');
	var tabAllPlanet = new Array();
	var CptPlanet = 0;
	for(var i=0;i<optionnode.length;i++){
		tabAllPlanet[CptPlanet] = new Array();
		tabtmp = (optionnode[i].innerHTML).split("    ");
		tabtmp[1] = (tabtmp[1].replace("[","")).replace("]","");
		if(CptPlanet==0){
			tabAllPlanet[CptPlanet][0] = tabtmp[0];
			tabAllPlanet[CptPlanet][1] = tabtmp[1];
			tabAllPlanet[CptPlanet][2] = ((optionnode[i].getAttribute("value")).replace("/game/","")).replace("&mode=&gid=&messageziel=&re=0","");
			tabAllPlanet[CptPlanet][3] = "???";
			tabAllPlanet[CptPlanet][4] = "";
			tabAllPlanet[CptPlanet][5] = "???";
			CptPlanet++;
		} else {
			var PlanetFind = false;
			var v=0;
			while(v<CptPlanet && PlanetFind==false){
				if(tabAllPlanet[v][1]==tabtmp[1]) PlanetFind = true;
				v++;
			}
	
			if(PlanetFind==true) v=v-1;
			else {
				v=CptPlanet;
				CptPlanet++;
			}
	
			//alert(CptPlanet+"/"+PlanetFind+"/"+v);
	
			if (tabtmp[0]=="Lune" || PlanetFind==true){
				tabAllPlanet[v][1] = tabtmp[1];
				tabAllPlanet[v][4] = ((optionnode[i].getAttribute("value")).replace("/game/","")).replace("&mode=&gid=&messageziel=&re=0","");
			} else {
				tabAllPlanet[v][0] = tabtmp[0];
				tabAllPlanet[v][1] = tabtmp[1];
				tabAllPlanet[v][2] = ((optionnode[i].getAttribute("value")).replace("/game/","")).replace("&mode=&gid=&messageziel=&re=0","");
				tabAllPlanet[v][3] = "???";
				tabAllPlanet[v][4] = "";
				tabAllPlanet[v][5] = "???";
			}
	
		}
	}
	
	
	//==========================================================
	// Resize table at 100%
	//==========================================================
	var tablenode = document.getElementsByTagName('table');
	for(var i=0;i<tablenode.length;i++){
		if(tablenode[i].getAttribute("width")=="519" && (tablenode[i].innerHTML).indexOf("Heure du serveur",0)) tablenode[i].setAttribute("width","100%");
	}
	
	//==========================================================
	// Add arrival datetime - fleet
	//==========================================================
	var trnode = document.getElementsByTagName('tr');
	for(var i=0;i<trnode.length;i++){
		if(trnode[i].getAttribute("class")=="flight" || trnode[i].getAttribute("class")=="return"){
			var divnode = trnode[i].getElementsByTagName('div');
			TimeLeft = CalcTime(divnode[0].getAttribute("title"));
			var thnode = trnode[i].getElementsByTagName('th');
			thnode[0].innerHTML += " <em><small>( <font color=orange>"+TimeLeft+"</font> )</small></em>";
		}
	}
	
	//==========================================================
	// Save characteristics of planet selected
	//==========================================================
	var trnode = document.getElementsByTagName('tr');
	var i = 0;
	var status = true;
	var tabPlanetCharacteristics = new Array();
	var cpt = 0;
	while (i<trnode.length) {
		var thnode = trnode[i].getElementsByTagName('th');
		if(thnode.length==2) {
			if((thnode[0].innerHTML).indexOf("Diam"+egrave+"tre",0)>=0 || (thnode[0].innerHTML).indexOf("Temp"+eaigu+"rature",0)>=0 || (thnode[0].innerHTML).indexOf("Position",0)>=0 || (thnode[0].innerHTML).indexOf("Points",0)>=0) {
				tabPlanetCharacteristics[cpt] = new Array();
				tabPlanetCharacteristics[cpt][0] = thnode[0].innerHTML;
				tabPlanetCharacteristics[cpt][1] = thnode[1].innerHTML;
				status = false;
				cpt++;
			}
		}
		if (status) i++;
		else {
			trnode[i].parentNode.removeChild(trnode[i]);
			trnode = document.getElementsByTagName('tr');
			status = true;
		}
	}
	
	//==========================================================
	// Put/write planet characteristics
	//==========================================================
	var thnode = document.getElementsByTagName('th');
	var tableConstruct="";
	for(var i=0;i<thnode.length;i++){
		if(thnode[i].getAttribute("colspan")=="2"){
			var imgnode = thnode[i].getElementsByTagName('img');
			if(imgnode.length==1){
				if(imgnode[0].getAttribute("height")=="200" && imgnode[0].getAttribute("width")=="200"){
					imgnode[0].setAttribute("height","150");
					imgnode[0].setAttribute("width","150");
					for(u=0;u<4;u++){
						tableConstruct += "<tr>";
						tableConstruct += "<td class=\"c\">"+tabPlanetCharacteristics[u][0]+"</td>";
						tableConstruct += "<th>"+tabPlanetCharacteristics[u][1]+"</th>";
						tableConstruct += "</tr>";
					}
					tableConstruct ="<table width=\"100%\">"+tableConstruct+"</table>";
					thnode[i].innerHTML += tableConstruct;
				}
			}
		}
	}
	
	//==========================================================
	// Rebuild planets list with construction
	//==========================================================
	var tablenode = document.getElementsByTagName('table');
	var construction = "";
	for(var i=0;i<tablenode.length;i++){
		if(tablenode[i].getAttribute("class")=="s" && tablenode[i].getAttribute("align")=="top" && tablenode[i].getAttribute("border")=="0"){
			var trnode = tablenode[i].getElementsByTagName('tr');
			var j = 0;
			var status = true;
			var cpt = 0;
			while (j<trnode.length) {
				var thnode = trnode[j].getElementsByTagName('th');
				//if(thnode.length==2){
					for(g=0;g<thnode.length;g++){
						var ahrefnode = thnode[g].getElementsByTagName('a');
						var centernode = thnode[g].getElementsByTagName('center');
						//alert(centernode[0].innerHTML);
						if ((centernode[0].innerHTML).indexOf("non active",0)>=0) construction="-";
						else construction = centernode[0].innerHTML;
						for(s=0;s<CptPlanet;s++){
							if(tabAllPlanet[s][2]==ahrefnode[0].getAttribute("href")) tabAllPlanet[s][3]=construction;
							if(tabAllPlanet[s][4]==ahrefnode[0].getAttribute("href")) tabAllPlanet[s][5]=construction;
						}
						status = false;
						cpt++;
					}
				//}
	
				if (status) j++;
				else {
					trnode[j].parentNode.removeChild(trnode[j]);
					trnode = tablenode[i].getElementsByTagName('tr');
					status = true;
				}
			}
	
			//=======================================================
			// Write new tag <table></table>
			//=======================================================
			tablenode[i].setAttribute("width","100%");
			tablenode[i].innerHTML = "";
			tablenode[i].innerHTML += "<tr><td class=\"c\">[G:S:P]</td><td class=\"c\">Plan"+egrave+"tes</td><td class=\"c\">Construction</td><td class=\"c\">Lune</td><td class=\"c\">Construction</td></tr>";
			for(s=0;s<CptPlanet;s++){
				if(tabAllPlanet[s][4].length>0) tablenode[i].innerHTML += "<tr><td class=\"c\">"+tabAllPlanet[s][1]+"</td><td class=\"c\"><a href='"+tabAllPlanet[s][2]+"'>"+tabAllPlanet[s][0]+"</a></td><th>"+tabAllPlanet[s][3]+"</th><td class=\"c\"><a href='"+tabAllPlanet[s][4]+"'>Lune</a></td><th>"+tabAllPlanet[s][5]+"</th></tr>";
				else tablenode[i].innerHTML += "<tr><td class=\"c\">"+tabAllPlanet[s][1]+"</td><td class=\"c\"><a href='"+tabAllPlanet[s][2]+"'>"+tabAllPlanet[s][0]+"</a></td><th>"+tabAllPlanet[s][3]+"</th><td class=\"c\">&nbsp;-&nbsp;</td><th>&nbsp;-&nbsp;</th></tr>";
			}
		}
	}
	
	//alert("Standard overview.php (Overview)");

}

})();