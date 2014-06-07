// ==UserScript==
// @name Ogame FR : Standard allianzen.php (Membres)
// @author Izcelion
// @description Ogame FR : Standard allianzen.php (Membres)
// @language FR
// @include http://*/game/allianzen.php*&a=4*
// @exclude http://*/game/allianzdepot.php*
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
// @exclude http://*/game/overview.php*
// @exclude http://*/game/raketenangriff.php*
// @exclude http://*/game/redir.php*
// @exclude http://*/game/renameplanet.php*
// @exclude http://*/game/resources.php*
// @exclude http://*/game/stat.php*
// @exclude http://*/game/suche.php*
// @exclude http://*/game/techtree.php*
// @exclude http://*/game/writemessages.php*
// ==/UserScript==

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

	var eaigu = String.fromCharCode(233);

	//===========================
	// Rebuilding table
	//===========================
	var tbodynode = document.getElementsByTagName('tbody');
	var i = 0;
	var status = true;
	while (i<tbodynode.length){
		if (i==3){
			var trnode = tbodynode[i].getElementsByTagName('tr');
			var j = 0;
			while (j<trnode.length){

				switch(j) {
					case 0:
						trnode[j].innerHTML = (trnode[j].innerHTML).replace('colspan="8"','colspan="9"');
						break;
					case 1:
						trnode[j].innerHTML += "<th>Evolution</th>";
						break;
					default:
						var thnode = trnode[j].getElementsByTagName('th');
						var PlayerName = thnode[1].innerHTML;
						trnode[j].innerHTML += '<th><a href="http://infranova.free.fr/detail.php?pseudo='+escape(PlayerName)+'&uni='+GetUniverse()+'" target="Hauptframe"><img src="http://img144.imageshack.us/img144/5875/icongrowthog3.gif" alt="See evolution" border="0" width="13" Height="11"></a></th>';
						break;
				}

				j++;
			}
		}		
		i++;
	}

	//alert("Standard allianzen.php (Membres)");
}

})();