// ==UserScript==
// @name Ogame FR : Standard Format Resources Head
// @author Izcelion
// @description Ogame FR : Standard Format Resources Head
// @language FR
// @include http://*/game/allianzen.php*
// @exclude http://*/game/allianzdepot.php*
// @include http://*/game/b_building.php*
// @exclude http://*/game/bericht.php*
// @exclude http://*/game/bewerbungen.php*
// @include http://*/game/buddy.php*
// @include http://*/game/buildings.php*
// @include http://*/game/flotten1.php*
// @include http://*/game/flotten2.php*
// @exclude http://*/game/flottenversand.php*
// @include http://*/game/galaxy.php*
// @exclude http://*/game/imperium.php*
// @exclude http://*/game/infos.php*
// @exclude http://*/game/leftmenu.php*
// @exclude http://*/game/logout.php*
// @include http://*/game/messages.php*
// @include http://*/game/notizen.php*
// @include http://*/game/options.php*
// @include http://*/game/overview.php*
// @exclude http://*/game/raketenangriff.php*
// @exclude http://*/game/redir.php*
// @include http://*/game/renameplanet.php*
// @include http://*/game/resources.php*
// @include http://*/game/stat.php*
// @exclude http://*/game/suche.php*
// @include http://*/game/techtree.php*
// @include http://*/game/writemessages.php*
// ==/UserScript==

//=========================
// Remove "." in a sentence
//=========================
function RemovePoint(Sentence){
	var SentenceModified = Sentence;
	SentenceModified=SentenceModified.replace('.','');
	while (Sentence != SentenceModified){
		Sentence = SentenceModified;
		SentenceModified=SentenceModified.replace('.','');
	}
	return parseInt(Sentence);
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

(function(){

//=================================
// Check if it's a French Universe
//=================================
if (isFinite(GetUniverse())){

	var egrave = String.fromCharCode(232);
	var eaigu = String.fromCharCode(233);
	var ocirconflexe = String.fromCharCode(244);
	var agrave = String.fromCharCode(224);

	//===============================================
	// Reformat Resources Head without title
	//===============================================
	var trnode = document.getElementsByTagName('tr');
	var i = 0;
	var expM = new RegExp("<td align=\"center\" width=\"85\"><i><b><font color=\"#ffffff\">M"+eaigu+"tal</font></b></i></td>","g");
	var expC = new RegExp("<td align=\"center\" width=\"85\"><i><b><font color=\"#ffffff\">Cristal</font></b></i></td>","g");
	var expD = new RegExp("<td align=\"center\" width=\"85\"><i><b><font color=\"#ffffff\">Deut"+eaigu+"rium</font></b></i></td>","g");
	var expE = new RegExp("<td align=\"center\" width=\"85\"><i><b><font color=\"#ffffff\">Energie</font></b></i></td>","g");
	while (i<trnode.length) {
		var trnodesentence = trnode[i].innerHTML;
		if (i==3 && expM.test(trnodesentence) && expC.test(trnodesentence) && expD.test(trnodesentence) && expE.test(trnodesentence)) {
			trnode[i].parentNode.removeChild(trnode[i]);
			trnode = document.getElementsByTagName('tr');
		} else i++;
	}
	
	//=============================================================
	// Put/Write the nomber of Small Cargo or Large Cargo necessary
	//=============================================================
	var tablenode = document.getElementsByTagName('table');
	var i=0;
	var Tab_Resources = new Array();
	var Cpt_Tab_Res = 0;
	while(i<tablenode.length){
		//<table border="0" cellpadding="0" cellspacing="0" width="100%">
		if (tablenode[i].getAttribute("border")=="0" && tablenode[i].getAttribute("cellpadding")=="0" && tablenode[i].getAttribute("cellspacing")=="0" && tablenode[i].getAttribute("width")=="100%"){
			var tbobynode = tablenode[i].getElementsByTagName('tbody');
			var trnode = tablenode[i].getElementsByTagName('tr');
			var tdnode = trnode[1].getElementsByTagName('td');
			var sentence2;
			var t=0;
			while(t<tdnode.length){
				sentence2 = tdnode[t].innerHTML;
				sentence2 = sentence2.replace('<font color="#ff0000">','');
				sentence2 = sentence2.replace("<font color='#ff0000'>","");
				sentence2 = sentence2.replace('</font>','');
	
				if(tdnode[t].getAttribute("align")=="center" && tdnode[t].getAttribute("width")=="85" && sentence2.indexOf("/",1)==-1){
					Tab_Resources[Cpt_Tab_Res] = RemovePoint(sentence2);
					Cpt_Tab_Res++;
				}
				t++;
			}
		}
		i++;
	}
	
	var TotalResources = 0 ;
	for(h=0;h<Tab_Resources.length;h++){
		TotalResources += Tab_Resources[h];
	}
	tbobynode[0].innerHTML += '<tr><td colspan=6 align="center"><b><font color="red">Transporter les ressources = '+parseInt(Math.ceil(TotalResources/5000))+' PT / '+parseInt(Math.ceil(TotalResources/25000))+' GT</font></b></td></tr>';
	
	//alert("Standard Format Resources Head");

}

})();