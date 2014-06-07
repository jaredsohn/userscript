// ==UserScript==
// @name           MyFreeFarm++
// @namespace      myfreefarm
// @include        http://*.myfreefarm.de/main.php
// ==/UserScript==
window.setTimeout(function(){
produkt 	= new Object();
produkt[37] = {order:1,aktuell:produktInfo(37)["vorhanden"],name:"Äpfel",punkte:2569,felder:4,ertrag:9,zeit:50.00}; 			//Aepfel
produkt[39] = {order:2,aktuell:produktInfo(39)["vorhanden"],name:"Birnen",punkte:3611,felder:4,ertrag:9,zeit:66.40}; 		//Birnen
produkt[24] = {order:3,aktuell:produktInfo(24)["vorhanden"],name:"Blumenkohl",punkte:92,felder:1,ertrag:4,zeit:12.00}; 		//Blumenkohl
produkt[35] = {order:5,aktuell:produktInfo(35)["vorhanden"],name:"Brombeeren",punkte:405,felder:1,ertrag:4,zeit:33.20}; 		//Brombeeren
produkt[20] = {order:7,aktuell:produktInfo(20)["vorhanden"],name:"Erdbeeren",punkte:42,felder:1,ertrag:5,zeit:8.00}; 		//Erdbeeren
produkt[5] 	= {order:8,aktuell:produktInfo(5)["vorhanden"],name:"Futterrüben",punkte:64,felder:4,ertrag:3,zeit:2.00}; 		//Futterrueben
produkt[1] 	= {order:9,aktuell:produktInfo(1)["vorhanden"],name:"Getreide",punkte:3,felder:2,ertrag:2,zeit:0.20}; 			//Getreide
produkt[18] = {order:10,aktuell:produktInfo(18)["vorhanden"],name:"Gurken",punkte:7,felder:1,ertrag:3,zeit:1.30}; 			//Gurken
produkt[32] = {order:11,aktuell:produktInfo(32)["vorhanden"],name:"Heidelbeeren",punkte:133,felder:1,ertrag:4,zeit:12.00};	//Heidelbeeren
produkt[33] = {order:12,aktuell:produktInfo(33)["vorhanden"],name:"Himbeeren",punkte:229,felder:1,ertrag:4,zeit:20.00}; 		//Himbeeren
produkt[34] = {order:14,aktuell:produktInfo(34)["vorhanden"],name:"Johannisbeeren",punkte:157,felder:1,ertrag:4,zeit:13.20}; //Johannisbeeren
produkt[17] = {order:15,aktuell:produktInfo(17)["vorhanden"],name:"Karotten",punkte:1,felder:1,ertrag:3,zeit:0.15}; 			//Karotten
produkt[26] = {order:16,aktuell:produktInfo(26)["vorhanden"],name:"Kartoffeln",punkte:108,felder:1,ertrag:4,zeit:13.00}; 		//Kartoffeln
produkt[40] = {order:16,aktuell:produktInfo(40)["vorhanden"],name:"Kirschen",punkte:4444,felder:4,ertrag:11,zeit:80.00}; 		//Kirschen
produkt[3] 	= {order:17,aktuell:produktInfo(3)["vorhanden"],name:"Klee",punkte:10,felder:2,ertrag:2,zeit:0.45}; 				//Klee
produkt[8] 	= {order:18,aktuell:produktInfo(8)["vorhanden"],name:"Kornblumen",punkte:600,felder:4,ertrag:5,zeit:16.00}; 		//Kornblumen
produkt[6] 	= {order:19,aktuell:produktInfo(6)["vorhanden"],name:"Kräuter",punkte:128,felder:4,ertrag:4,zeit:4.00}; 			//Kraeuter
produkt[38] = {order:21,aktuell:produktInfo(38)["vorhanden"],name:"Kürbisse",punkte:211,felder:1,ertrag:7,zeit:16.00}; 		//Kuerbisse
produkt[2] 	= {order:22,aktuell:produktInfo(2)["vorhanden"],name:"Mais",punkte:17,felder:4,ertrag:3,zeit:0.45}; 				//Mais
produkt[36] = {order:25,aktuell:produktInfo(36)["vorhanden"],name:"Mirabellen",punkte:733,felder:4,ertrag:6,zeit:14.40}; 		//Mirabellen
produkt[43] = {order:26,aktuell:produktInfo(43)["vorhanden"],name:"Oliven",punkte:6769,felder:4,ertrag:13,zeit:113.20}; 		//Oliven
produkt[41] = {order:27,aktuell:produktInfo(41)["vorhanden"],name:"Pflaumen",punkte:5220,felder:4,ertrag:11,zeit:91.40}; 		//Pflaumen
produkt[19] = {order:28,aktuell:produktInfo(19)["vorhanden"],name:"Radiesschen",punkte:24,felder:1,ertrag:4,zeit:4.00}; 		//Radieschen
produkt[4] 	= {order:29,aktuell:produktInfo(4)["vorhanden"],name:"Raps",punkte:44,felder:4,ertrag:3,zeit:1.30}; 				//Raps
produkt[44] = {order:30,aktuell:produktInfo(44)["vorhanden"],name:"Rotkohl",punkte:1833,felder:1,ertrag:13,zeit:120.00}; 		//Rotkohl
produkt[7] 	= {order:31,aktuell:produktInfo(7)["vorhanden"],name:"Sonnenblumen",punkte:300,felder:4,ertrag:3,zeit:8.00}; 		//Sonnenblumen
produkt[29] = {order:32,aktuell:produktInfo(29)["vorhanden"],name:"Spargel",punkte:319,felder:2,ertrag:4,zeit:15.50}; 		//Spargel
produkt[23] = {order:33,aktuell:produktInfo(23)["vorhanden"],name:"Spinat",punkte:88,felder:1,ertrag:4,zeit:13.20}; 			//Spinat
produkt[21] = {order:34,aktuell:produktInfo(21)["vorhanden"],name:"Tomaten",punkte:63,felder:1,ertrag:5,zeit:10.00}; 			//Tomaten
produkt[42] = {order:35,aktuell:produktInfo(42)["vorhanden"],name:"Walnüsse",punkte:6028,felder:4,ertrag:13,zeit:103.20}; 	//Walnuesse
produkt[31] = {order:38,aktuell:produktInfo(31)["vorhanden"],name:"Zucchinis",punkte:179,felder:1,ertrag:7,zeit:16.40}; 		//Zucchinis
produkt[22] = {order:39,aktuell:produktInfo(22)["vorhanden"],name:"Zwiebeln",punkte:52,felder:1,ertrag:4,zeit:8.20}; 			//Zwiebeln

produkt[9] 	= {order:6,aktuell:produktInfo(9)["vorhanden"],name:"Eier",punkte:750,zeit:4.00}; 					//Eier
produkt[10] = {order:24,aktuell:produktInfo(10)["vorhanden"],name:"Milch",punkte:950,zeit:12.00}; 				//Milch
produkt[11] = {order:36,aktuell:produktInfo(11)["vorhanden"],name:"Wolle",punkte:1540,zeit:24.00};				//Wolle
produkt[12] = {order:13,aktuell:produktInfo(12)["vorhanden"],name:"Honig",punkte:2350,zeit:48.00}; 				//Honig
produkt[25] = {order:23,aktuell:produktInfo(25)["vorhanden"],name:"Mayonaise",punkte:3100,zeit:16.40,ertrag:15}; 	//Mayonnaise
produkt[27] = {order:20,aktuell:produktInfo(27)["vorhanden"],name:"Käse",punkte:4500,zeit:33.20}; 				//Kaese
produkt[28] = {order:37,aktuell:produktInfo(28)["vorhanden"],name:"Wollknäuel",punkte:5000,zeit:50.00,ertrag:24};	//Wollknaeuel
produkt[30] = {order:4,aktuell:produktInfo(30)["vorhanden"],name:"Bonbon",punkte:5400,zeit:66.40,ertrag:30}; 	//Bonbon

produkt[59] = {aktuell:produktInfo(59)["vorhanden"],name:"Fahrrad"}; 	// Fahrrad

	var posLeft	=	mffpp_getPosition($("rackInfo")).x-20;
	var posTop	=	mffpp_getPosition($("rackInfo")).y-5;
	var myToolbar	=	createElement("DIV",{Style:"Position:Absolute;Top:" + posTop + "px;Left:" + posLeft + "px;z-index:100;Height:20px;Width:259px;Overflow:Hidden;Background:#FFFFFF;Border:1px Solid Black;"},false);
	var dontMinime	=	false;
	createElement("Iframe",{Id:"mffpp_if",Style:"display:none;"},document.getElementsByTagName("Body")[0]);
	myToolbar.addEventListener("mouseover",function(){
		this.style.height = "645px";
	},false);
	myToolbar.addEventListener("mouseout",function(){
		if(dontMinime){return true;}else{this.style.height = "20px";return true;}
	},false)
	// Header
	myToolbarHeader = createElement("Div",{Style:"Width:100%;Background:#CD661D;Font-Size:15px;Font-Weight:Bold;Padding:2px;Text-Align:Center;Color:#000000;"},false);
		myToolbarHeader.addEventListener("click",function(){
		switch (dontMinime)
		{
			case false:
				dontMinime	=	true; break;
			case true:
				dontMinime	=	false; break;
		}
	},false);
	myToolbarHeader.appendChild(document.createTextNode("MyFreeFarm++"))
	myToolbar.appendChild(myToolbarHeader);
	myToolbarJumper	=	createElement("Div",{Style:"Color:#000000;Padding:1px;Border:1px Solid #808080;Background-Color:#DDDDDD;Cursor:Pointer;Margin:3px;"},false);
	myToolbarJumper.addEventListener("click",function(){window.open("http://userscripts.org/scripts/show/74930");},false);
	myToolbarJumper.appendChild(document.createTextNode("MyFreeFarm++ Scripthomepage"));
	myToolbar.appendChild(myToolbarJumper);
	// Berater
	myToolbarBerater 		= 	createElement("Div","",false);
	myToolbarBeraterDFStyle	=	"Width:100%;overflow:hidden;Padding:2px;Color:Black;Margin:1px;";
	if(checkBeraterInstalliert()==true){
		myToolbarBerater.setAttribute("Style",myToolbarBeraterDFStyle+"Background-Color:#EEFFFF;");
		myToolbarBeraterText 					=	"Der Berater ist betriebsbereit."; 
	}else{
		myToolbarBerater.setAttribute("Style",myToolbarBeraterDFStyle+"Background-Color:#FFEEEE;Cursor:Pointer;");
		myToolbarBerater.addEventListener("click",function(){window.open("http://userscripts.org/scripts/source/66964.user.js");},false);
		myToolbarBeraterText 					=	"Der Berater ist nicht installiert bzw. aktiv."; 
	}
	myToolbarBerater.appendChild(document.createTextNode(myToolbarBeraterText));
	for(zaehler=0;zaehler<=59;zaehler++){
		if(produktInfo(zaehler)["vorhanden"]!=0){
			element	=	createElement("Div",{ID:"fmmpp_Produkt_"+zaehler,Style:"Padding-Left:10px;"},false);
			element.appendChild(document.createTextNode(produkt[zaehler]["name"] + ": " + produktInfo(zaehler)["vorhanden"]));
			myToolbarBerater.appendChild(element);
		}
	}
	myToolbar.appendChild(myToolbarBerater);
	// Automat
	myToolbarAutomat 		= 	createElement("Div","",false);
	myToolbarAutomatDFStyle	=	"Width:100%;overflow:hidden;Padding:2px;Color:Black;Margin:1px;";
	if($("inputautoPflanze")){
		// Automatscript ist vorhanden
		myToolbarAutomat.setAttribute("Style",myToolbarAutomatDFStyle+"Background-Color:#EEFFFF;");
		myToolbarAutomatText					=	"Der Automat ist betriebsbereit.";
	}else{
		// Automatscript ist nicht vorhanden
		myToolbarAutomat.setAttribute("Style",myToolbarAutomatDFStyle+"Background-Color:#FFEEEE;");
		myToolbarAutomatText					=	"Der Automat ist nicht installiert bzw. aktiv.";
	}
	myToolbarAutomat.appendChild(document.createTextNode(myToolbarAutomatText));
	myToolbar.appendChild(myToolbarAutomat);
	// Questinfo
	myToolbarQuestinfo	=	new mffpp_Questinfo(myToolbar);
	myToolbarQuestinfo.show();
	// Punkte & Co
	var punkte = new mffpp_status();
	window.setInterval(function(){
		myToolbarQuestinfo.update();
		for(zaehler=0;zaehler<=59;zaehler++){
			if(produktInfo(zaehler)["vorhanden"]!=0){
				$("fmmpp_Produkt_"+zaehler).firstChild.nodeValue = produkt[zaehler]["name"] + ": " + produktInfo(zaehler)["vorhanden"];
			}
		}
		punkte.update();
	}, 1000);
	//--------
	document.getElementsByTagName("Body")[0].appendChild(myToolbar);
},1500);

function $(ID){return document.getElementById(ID);}

function mffpp_status(){
	/*stumpf drauf losprogrammiert, DRINGEND überarbeiten*/
	$("userinfoscontainer").setAttribute("Style","Height:120px;Width:216px;");
	restpunkte	=	document.createElement("b");
	restpunkte.setAttribute("Style","Position:Absolute;Top:70px;Left:10px;Color:#000000;");
	restpunkteText = document.createTextNode("Restpunkte: " + $("remainpoints").firstChild.nodeValue);
	restpunkte.appendChild(restpunkteText);
	$("userinfoscontainer").appendChild(restpunkte);
	this.update = function(){
		try{restpunkte.firstChild.nodeValue = "Restpunkte: " + $("remainpoints").firstChild.nodeValue;}catch(e){return true;}
		//restpunkte.firstChild.nodeValue = "Restpunkte: " + $("remainpoints").firstChild.nodeValue;
	}
}
function mffpp_getPosition(obj) {
	/*In Zukunft zwingend erforderlich*/
	var pos = { x:0, y:0 };
	do {
		pos.x += obj.offsetLeft;
		pos.y += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return pos;
}

function mffpp_Questinfo(toolbar){
	var questinfo	=	createElement("Div","",false);
	var bgColor		=	"#EEFFFF";
	var defaultStyle=	"Width:100%;overflow:hidden;Padding:2px;Color:#000000;Margin:1px;";
	var headText	=	"xyz";
	questinfo.setAttribute("Style",defaultStyle);
	questinfo.appendChild(document.createTextNode(headText));
	
	this.update = function(){
		if($("questline").getElementsByTagName("Div").length>=2){
			// Quest gefunden
			bgColor	=	"#EEFFFF";
			headText = "Aktuelles Quest ermittelt.";
		}else{
			// Quest nicht gefunden
			bgColor	=	"#FFEEEE";
			headText = "Kein aktuelles Quest ermittelt.";
		}
		questinfo.style.backgroundColor	=	bgColor;
		questinfo.firstChild.nodeValue 	=	headText;
	}
	
	this.show = function(){
	toolbar.appendChild(questinfo);
	}
}

function checkBeraterInstalliert(){
	if($("divStatistik")){
		return true;
	}else{
		return false;
	}
}

function produktInfo(prodId){
	if($("t"+prodId)){
	var anzahl = $("t"+prodId).firstChild.nodeValue;
	}else{
	var anzahl = 0;
	}
	return {vorhanden:anzahl};	
}

function createElement(Tagname,Attribute,parentNode){
	element	=	document.createElement(Tagname);
	for(tmp in Attribute)
	{
		element.setAttribute(tmp,Attribute[tmp]);
	}
	if(parentNode)
		{parentNode.appendChild(element);}
	else
		{return element;}
}