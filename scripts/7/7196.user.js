// ==UserScript==
// @name Ogame IT : Standard buildings.php (Defense)
// @author Izcelion Traduzione: pippo1985
// @description Ogame IT : Standard buildings.php (Defense)
// @language IT
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

//===========================================
//Modifica per ritoccare con il CSS (pippo1985)
//===========================================
var css = new Array();
function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

addStyle("td.l a + br + b {color: #B5B5B5;}");
addStyle("td.l a + br + b + b {color: #95DBF9;}");
addStyle("td.l a + br + b + b + b {color: #00CC00;}");
addStyle("td.l a + br + b + b + b + b {color: #FFFF00;}");

// Writes CSS to the document
writeStyle(css);

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
	var UniCorrente="Error";
	var poshead = document.getElementsByTagName ('html')[0].innerHTML;
	var posID = poshead.search('serverID=');
	var posuser = poshead.search('&user');
	if ((posuser-posID-9)==2) UniCorrente = poshead[posID+9] + poshead[posID+10];
	else var UniCorrente = poshead[posID+9];
	return UniCorrente;
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
	//var headnode = document.getElementsByTagName('head');
	//var NewScript = document.createElement("script");
	//NewScript.setAttribute("language","JavaScript");
	//NewScript.setAttribute("src","http://127.0.0.1/greasemonkey/Script Ogame Fr v0.74b Standard/buildingsVerteidigung.js");	//<= VALUE TO MODIFY !!! //
	//headnode[0].appendChild(NewScript);
	
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
		if (tdnode[f].getAttribute("class")=="l" && (tdnode[f].innerHTML).indexOf("Richiede:",0)>=0 && (tdnode[f].innerHTML).indexOf("Tempo di produzione:",0)>=0){
	
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
			var sentence1 = "<br>Costruzione possibile in:";
			var sentence2 = "</span>";
			var pos1 = (tdnode[f].innerHTML).indexOf(sentence1,0);
			if (pos1>=0){
				var pos2 = (tdnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
				var SentenceConstructionBegin  = (tdnode[f].innerHTML).substring(pos1,pos2+sentence2.length);
				//alert(SentenceConstructionBegin);
				//tdnode[f].innerHTML = (tdnode[f].innerHTML).replace(SentenceConstructionBegin,"");
			}

			//===========================================
			// Check if building need ressource and how !
			//===========================================
			tdnode[f].innerHTML = CheckRessourcesCost("Metallo",tdnode[f].innerHTML,Tab_Resources[0])
			tdnode[f].innerHTML = CheckRessourcesCost("Cristallo",tdnode[f].innerHTML,Tab_Resources[1])
			tdnode[f].innerHTML = CheckRessourcesCost("Deuterio",tdnode[f].innerHTML,Tab_Resources[2])

		}
		f++;
	}
	
	//===============================================
	// Rebuild button "Send" with 3 columns and not 2
	//===============================================
	var inputnode = document.getElementsByTagName('input');
	var i=0;
	while(i<inputnode.length){
		if (inputnode[i].getAttribute("value")=="Invia" && inputnode[i].getAttribute("type")=="submit"){
			//alert(inputnode[i].parentNode.tagName);
			inputnode[i].parentNode.setAttribute("colspan",3);
		}
		i++;
	}
	
	//alert("Standard buildings.php (Defense)");

}

})();
