// ==UserScript==
// @name Ogame FR : Standard buildings.php (Defense)
// @author Izcelion
// @description Ogame FR : Standard buildings.php (Defense)
// @language FR
// @include http://*/game/buildings.php*mode=Verteidigung*
// @exclude http://*/game/allianzdepot.php*
// @exclude http://*/game/allianzen.php*
// @exclude http://*/game/b_building.php*
// @exclude http://*/game/bericht.php*
// @exclude http://*/game/bewerbungen.php*
// @exclude http://*/game/buddy.php*
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

//===========================================
// Get Metal, Crystal, Deuterium in the Stock
//===========================================
function GetMCD(){
	var tablenode = document.getElementsByTagName('table');
	var i=0;
	var Tab_Resources = new Array();
	var Cpt_Tab_Res = 0;
	var ResourcesNoFound = true;
	while(i<tablenode.length && ResourcesNoFound){

		//=================================
		// Find <TABLE> in ressources title
		//=================================
		if (tablenode[i].getAttribute("border")=="0" && tablenode[i].getAttribute("cellpadding")=="0" && tablenode[i].getAttribute("cellspacing")=="0" && tablenode[i].getAttribute("width")=="100%"){

			var trnode = tablenode[i].getElementsByTagName('tr');
			var tdnode = trnode[1].getElementsByTagName('td');
			var sentence2;
			var t=0;
			
			//======================
			// Scan column <td></td>
			//======================
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
			
			if (Tab_Resources.length==3) ResourcesNoFound=false;

		}

		i++;
	}
	return Tab_Resources;
}

//============================
// Add Point "." in a sentence
//============================
function AddPoint(Sentence){
	var SentenceModified = '';
	var Rest = '';
	while (Sentence >= 1000 || Sentence <= -1000) {
		Rest = Sentence - Math.floor(Sentence/1000)*1000;
		if (Rest<10) Rest='00'+Rest;
		else if (Rest<100) Rest='0'+Rest;
		Sentence = Math.floor(Sentence/1000);
		SentenceModified = '.'+Rest+SentenceModified;
	}
	return (Sentence+SentenceModified);
}

//===============================
// Remove Point "." in a sentence
//===============================
function RemovePoint(Sentence){
	var SentenceModified = Sentence;
	SentenceModified=SentenceModified.replace('.','');
	while (Sentence != SentenceModified){
		Sentence = SentenceModified;
		SentenceModified=SentenceModified.replace('.','');
	}
	return parseInt(Sentence);
}

//=====================================
// Check if you have enought Ressources
//=====================================
function CheckRessourcesCost(Ressource,NodeHTML,ActualRessource){
	var sentence1 = Ressource+": <b>";
	var sentence2 = "</b>";
	var pos1 = NodeHTML.indexOf(sentence1,0);
	if (pos1>=0){
		var pos2 = NodeHTML.indexOf(sentence2,pos1+sentence1.length);
		var SentenceRessource  = RemovePoint(NodeHTML.substring(pos1+sentence1.length,pos2));
		//alert(SentenceRessource);
				
		//===================
		// Ressource needed ?
		//===================
		var Difference = ActualRessource - SentenceRessource;
		if(Difference<0){
			var sentence3 = Ressource+": <a style=\"cursor: pointer;\" title=\""+AddPoint(Difference)+"\"><span class=\"noresources\">"+AddPoint(SentenceRessource)+"</span></a>"
			var sentence4 = NodeHTML.substring(pos1,pos2+sentence2.length);
			NodeHTML = NodeHTML.replace(sentence4,sentence3);
		}
	}
	return NodeHTML;
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
	var WidthTableNeeded = 700;

	//==============================================================================
	// Insert script for calculate max defense
	//		MODIFY PATH OF : http://127.0.0.1/greasemonkey/buildingsVerteidigung.js
	//==============================================================================
	var headnode = document.getElementsByTagName('head');
	var NewScript = document.createElement("script");
	NewScript.setAttribute("language","JavaScript");
	NewScript.setAttribute("src","http://127.0.0.1/greasemonkey/Script Ogame Fr v0.74b Standard/buildingsVerteidigung.js");	//<= VALUE TO MODIFY !!! //
	headnode[0].appendChild(NewScript);
	
	//==================
	// Resize all images
	//==================
	var imgnode = document.getElementsByTagName('img');
	var pixel = 40;
	var u=0;
	while(u<imgnode.length){
		if(imgnode[u].getAttribute("height")==120 && imgnode[u].getAttribute("width")==120 && imgnode[u].getAttribute("align")=="top" && imgnode[u].getAttribute("border")==0){
			imgnode[u].setAttribute("height",pixel);
			imgnode[u].setAttribute("width",pixel);
			imgnode[u].setAttribute("align","middle");
			var td_ParentNode = imgnode[u].parentNode.parentNode
			if((td_ParentNode.tagName).toUpperCase()=="TD"){
				td_ParentNode.setAttribute("width",pixel);
				td_ParentNode.setAttribute("height",pixel);
				td_ParentNode.setAttribute("valign","middle");
				td_ParentNode.setAttribute("align","center");
			}
		}
		u++;
	}
	//alert("Standard buildings.php (Defense) => Resize Image");
	
	//==================
	// Resize Main Table
	//==================
	var tablenode = document.getElementsByTagName('table');
	var u=0;
	while(u<tablenode.length){
		if(tablenode[u].getAttribute("width")==530) tablenode[u].setAttribute("width",WidthTableNeeded);
		u++;
	}
	
	//==========================================================
	// Rebuild text in each buildings. Remove non necessary text
	//==========================================================
	var Tab_Resources = GetMCD();
	var tdnode = document.getElementsByTagName('td');
	var f=0;
	while (f<tdnode.length){
		if (tdnode[f].getAttribute("class")=="l" && (tdnode[f].innerHTML).indexOf("Ressources n"+eaigu+"cessaires :",0)>=0 && (tdnode[f].innerHTML).indexOf("Dur"+eaigu+"e de construction :",0)>=0){
	
			//===================
			// Remove description
			//===================
			var sentence1 = "<br>";
			var sentence2 = "<br>";
			var pos1 = (tdnode[f].innerHTML).indexOf(sentence1,0);
			if (pos1>=0) {
				var pos2 = (tdnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
				var SentenceDescription  = (tdnode[f].innerHTML).substring(pos1,pos2+sentence2.length);
				//alert(SentenceDescription);
				tdnode[f].innerHTML = (tdnode[f].innerHTML).replace(SentenceDescription,"<br>");
			}
	
			//===============================
			// Remove "Research can begin in"
			// (Account Commandant)
			//===============================
			var sentence1 = "<br>Construction can begin in";
			var sentence2 = "</span>";
			var pos1 = (tdnode[f].innerHTML).indexOf(sentence1,0);
			if (pos1>=0){
				var pos2 = (tdnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
				var SentenceConstructionBegin  = (tdnode[f].innerHTML).substring(pos1,pos2+sentence2.length);
				//alert(SentenceConstructionBegin);
				tdnode[f].innerHTML = (tdnode[f].innerHTML).replace(SentenceConstructionBegin,"");
			}

			//===========================================
			// Check if building need ressource and how !
			//===========================================
			tdnode[f].innerHTML = CheckRessourcesCost("M"+eaigu+"tal",tdnode[f].innerHTML,Tab_Resources[0])
			tdnode[f].innerHTML = CheckRessourcesCost("Cristal",tdnode[f].innerHTML,Tab_Resources[1])
			tdnode[f].innerHTML = CheckRessourcesCost("Deut"+eaigu+"rium",tdnode[f].innerHTML,Tab_Resources[2])

		}
		f++;
	}
	
	//===============================================
	// Rebuild button "Send" with 3 columns and not 2
	//===============================================
	var inputnode = document.getElementsByTagName('input');
	var i=0;
	while(i<inputnode.length){
		if (inputnode[i].getAttribute("value")=="Envoyer" && inputnode[i].getAttribute("type")=="submit"){
			//alert(inputnode[i].parentNode.tagName);
			inputnode[i].parentNode.setAttribute("colspan",3);
		}
		i++;
	}
	
	//alert("Standard buildings.php (Defense)");

}

})();