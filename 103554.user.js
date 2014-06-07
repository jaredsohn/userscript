// ==UserScript==
// @name           Fleet_mod
// @description    Modification of Fleet overview
// @version        1.5.8
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==
	var version = "1.5.8";
	
	var ChangTimeD= "true";
	var showFleetD= "true";
	var reversalD= "true";
	var transparentD= "true";
	var overviewD= GM_getValue("overviewD","true");
	var opacityD= "28";
	var alertnativD = "";
	var prangerD = "false";
	var savekbD = "false";
	
	var standartshD = "true";
	var standartshoeheD = "5";
	var expobD = "true";
	var koordsD = "true";
	var koords1D = "1:1:1";
	var koords2D = "2:2:2";
	var koords3D = "3:3:3";
	var koords1Z = "1";
	var koordserD = "true";
	var speedD = "true";
	var sendfleetD = "true";
	var aktivekoordsD = "true";
	var RessStat = "true";
	var RessStat2 = "false";
	var ReadyTimeD = "true";
	var constructionD = "true";
	var movementD = "true";
	
	var angriffD= "#66CC33";
	var stationierenD= "#666666";
	var expeditionD= "#5555BB";
	var spionageD= "#FFCC66";
	var transportD= "#A0FFA0";
	var tfAbbauenD= "#CEFF68";
	var haltenD= "#80A0C0";
	var kolonisierenD= "#C1C1C1";
	var verbandD= "#CC6666";
	var defaultD= "#A0FFA0";
	
	var galaxyRank10 = '#FFFF40';
	var galaxyRank50 = '#FFDF00';
	var galaxyRank100 = '#FFBF00';
	var galaxyRank200 = '#FF8F00';
	var galaxyRank800 = '#33FF33';
	var galaxyRank0 = '#305060';
	var tfbackD = GM_getValue("tfbackD","10000");
	var tfcolD= GM_getValue("tfcolD","red");
	var galaxyD = "true";
	var maxSpielerScore = "false";
	var fleet1Info = "true";
	var SpioAnal = GM_getValue("SpioAnal","true");
	var MessInBu = GM_getValue("MessInBu","true");
	var BaumatShow = GM_getValue("BaumatShow","true");
	
	var feindgD = "none";
	var freundgD = "none";
	var freund2D ="orange";
	var feindg2D ="red";
	
	var language=GM_getValue("FleetModLan","ger");
	var ltext= new Array();
	
	var OUni=document.location.href.split(".ogame.")[0].split("http://")[1];
	
	var MessRessBu = GM_getValue(("MessRessBu"+OUni),"100000");
	
function language_ger(){
//Optoinen
	ltext[0]	=	"EventBox Optionen";
	ltext[1]	=	"Alternative EventBox";
	ltext[2]	=	"EventBox nur in der &Uuml;bersicht";
	ltext[3]	=	"Ankunftszeit verschieben";
	ltext[4]	=	"Flotten anzeigen";
	ltext[5]	=	"(R) bei zur&uuml;ck kommenden Flotten";
	ltext[6]	=	"Zur&uuml;ck kommende Flotten Transparent";
	ltext[7]	=	"St&auml;rke der Verdunklung (0-100)";

	ltext[8]	=	"Farbwahl";
	ltext[9]	=	"Angriff";
	ltext[10]	=	"Stationieren";
	ltext[11]	=	"Expedition";
	ltext[12]	=	"Spionage";
	ltext[13]	=	"Transport";
	ltext[14]	=	"TF-Abbauen";
	ltext[15]	=	"Halten";
	ltext[16]	=	"Verband";
	ltext[17]	=	"Kolonisieren";
	ltext[18]	=	"Standard";
	ltext[19]	=	"Feindlicher Angriff Hintergrund";
	ltext[20]	=	"Feindlicher Angriff Text Farbe";
	ltext[21]	=	"Friedliche Flotten Hintergrund";
	ltext[22]	=	"Friedliche Flotten Text Farbe";
	
	ltext[23]	=	"Flottenpages";
	ltext[24]	=	"Neue Standardflotten";
	ltext[25]	=	"H&ouml;he Anpassen (-x bis +x)";
	ltext[26]	=	"Expo Shortcut";
	ltext[27]	=	"Koordinaten Shortcut - Format xx:xx:xx";
	ltext[28]	=	"Quick Koords Shortcut";
	ltext[29]	=	"Koordinaten";
	ltext[30]	=	"Erweiterte Koordinaten Shortcuts";
	ltext[31]	=	"Aktiven Plani in Koordinaten Aufnehmen (Achtung gibt es auch in Antigame)";
	ltext[32]	=	"Geschwindigkeits Shortcuts";
	ltext[33]	=	"Flottenliste";
	
	ltext[34]	=	"Galaxie";
	ltext[35]	=	"Galaxie modifikation";
	ltext[36]	=	"TF Gr&ouml;ße für highlight";
	ltext[37]	=	"Farbe der highlight vom TF";
	
	ltext[38]	=	"Allgemeines";
	ltext[39]	=	"Pranger Button im oberen Menu";
	ltext[40]	=	"SaveKB Button im linken Menu";
	
	ltext[41]	=	"Standard Einstellungen";
	ltext[42]	=	"Einstellungen Speichern";
// optionen Saved--Reset	
	ltext[43]	=	"Zur&uuml;ck";
	ltext[44]	=	"Gespeichert";
// FLeetPage3
	ltext[45]	=	"Kleiner Transporter";
	ltext[46]	=	"Großer Transporter";
	ltext[47]	=	"Leichter Jäger";
	ltext[48]	=	"Schwerer Jäger";
	ltext[49]	=	"Kreuzer";
	ltext[50]	=	"Schlachtschiff";
	ltext[51]	=	"Kolonieschiff";
	ltext[52]	=	"Recycler";
	ltext[53]	=	"Spionagesonde";
	ltext[54]	=	"Bomber";
	ltext[55]	=	"Zerstörer";
	ltext[56]	=	"Todesstern";	
	ltext[57]	=	"Schlachtkreuzer";
//Allgemein Button	
	ltext[58]	=	"Pranger";
	
	ltext[59]	=	"Plani";
	ltext[60]	=	"TF";
	ltext[61]	=	"Mond";
	
	ltext[62]	=	"Ress Prod im Linken Menu";
	ltext[73]	=	"Alternative Position";
	ltext[63]	=	"Anzeige wann Schiffe/Forschung/Geb&auml;ude fertig werden";
	ltext[64]	=	"#1 Hat mehr als 5M Punkte";
	ltext[65]	=	"Erweiterte Info Ansicht FleetPage1";
	ltext[66]	=	"Zeigt an Plani Koords an was gebaut wird";
	ltext[67]	=	"Flotten Movement Page änderungen"
	
//message
	ltext[68]	=	"Ressourcen";
	ltext[69]	=	"Summe",
	ltext[70]	=	"Eroberung";
	ltext[71]	=	"GT";
	ltext[72]	=	"KT";
	ltext[74]	=	"Nachrichten";
	ltext[75]	=	"Spionage Analyse";
	
	ltext[76]	=	"Alle Angezeigten Nachrichten als gelesen markieren";
	ltext[77]	=	"Markierte Nachrichten löschen";
	ltext[78]	=	"Alle Angezeigten Nachrichten löschen";
	ltext[79]	=	"Shortcuts für Aktionen";
	ltext[80]	=	"Lösche Spios mit weniger als "+format(MessRessBu)+" Gewinn";
	ltext[81]	=	"Spionage Berichte lösche mit weniger als x Reesourcen Gewinn";
	
	ltext[82]	=	"Anzeige wie viele Ress & GT/KT für das Object gebraucht wird";
	ltext[83]	=	"Baumenü";
	
	ltext[84]
	ltext[85]
}
function lang(){
	switch(language) {
	case ('ger'): language_ger(); break;
	default: language_ger();
	}
}
function getVal(key, def){
	return GM_getValue(key,def);
}
function setVal(key,value){
	return localStorage.setItem(key, value);
}
function delVal(key){
	return localStorage.removeItem(key);
}
function initalCheckbox(coll){
	if(coll=="ChangTimeD"){ 
		var x = getVal("ChangTimeD", ChangTimeD);
			if(x=="true" ){ var y = new Array(ChangTimeD,"checked");}
			else{ var y = new Array(ChangTimeD,"");}
		return y;
	}
	if(coll=="showFleetD"){
		var x = getVal("showFleetD", showFleetD);
			if(x=="true"){ var y = new Array(showFleetD,"checked");}
			else{ var y = new Array(showFleetD,"");}
		return y;
	}
	if(coll=="reversalD"){
		var x = getVal("reversalD", reversalD);
			if(x=="true" ){ var y = new Array(reversalD,"checked");}
			else{ var y = new Array(reversalD,"");}
		return y;
	}
	if(coll=="transparentD"){
		var x = getVal("transparentD", transparentD);
			if(x=="true" ){ var y = new Array(transparentD,"checked");}
			else{ var y = new Array(transparentD,"");}
		return y;
	}
	if(coll=="overviewD"){
		var x = getVal("overviewD", overviewD);
			if(x=="true" ){ var y = new Array(overviewD,"checked");}
			else{ var y = new Array(overviewD,"");}
		return y;
	}
	if(coll=="alertnativD"){
		var x = getVal("alertnativD", alertnativD);
			if(x=="true" ){ var y = new Array(alertnativD,"checked");}
			else{ var y = new Array(alertnativD,"");}
		return y;
	}
	if(coll=="standartshD"){
		var x = getVal("standartshD", standartshD);
			if(x=="true" ){ var y = new Array(standartshD,"checked");}
			else{ var y = new Array(standartshD,"");}
		return y;
	}
	if(coll=="expobD"){
		var x = getVal("expobD", expobD);
			if(x=="true" ){ var y = new Array(expobD,"checked");}
			else{ var y = new Array(expobD,"");}
		return y;
	}
	if(coll=="koordsD"){
		var x = getVal("koordsD", koordsD);
			if(x=="true" ){ var y = new Array(koordsD,"checked");}
			else{ var y = new Array(koordsD,"");}
		return y;
	}
	if(coll=="savekbD"){
		var x = getVal("savekbD", savekbD);
			if(x=="true" ){ var y = new Array(savekbD,"checked");}
			else{ var y = new Array(savekbD,"");}
		return y;
	}
	if(coll=="prangerD"){
		var x = getVal("prangerD", prangerD);
			if(x=="true" ){ var y = new Array(prangerD,"checked");}
			else{ var y = new Array(prangerD,"");}
		return y;
	}
	if(coll=="koordserD"){
		var x = getVal("koordserD", koordserD);
			if(x=="true" ){ var y = new Array(koordserD,"checked");}
			else{ var y = new Array(koordserD,"");}
		return y;
	}
	if(coll=="speedD"){
		var x = getVal("speedD", speedD);
			if(x=="true" ){ var y = new Array(speedD,"checked");}
			else{ var y = new Array(speedD,"");}
		return y;
	}
	if(coll=="sendfleetD"){
		var x = getVal("sendfleetD", sendfleetD);
			if(x=="true" ){ var y = new Array(sendfleetD,"checked");}
			else{ var y = new Array(sendfleetD,"");}
		return y;
	}
	if(coll=="aktivekoordsD"){
		var x = getVal("aktivekoordsD", aktivekoordsD);
			if(x=="true" ){ var y = new Array(aktivekoordsD,"checked");}
			else{ var y = new Array(aktivekoordsD,"");}
		return y;
	}
	if(coll=="galaxyD"){
		var x = getVal("galaxyD", galaxyD);
			if(x=="true" ){ var y = new Array(galaxyD,"checked");}
			else{ var y = new Array(galaxyD,"");}
		return y;
	}
	if(coll=="RessStat"){
		var x = getVal("RessStat", RessStat);
			if(x=="true" ){ var y = new Array(RessStat,"checked");}
			else{ var y = new Array(RessStat,"");}
		return y;
	}
	if(coll=="RessStat2"){
		var x = getVal("RessStat2", RessStat2);
			if(x=="true" ){ var y = new Array(RessStat2,"checked");}
			else{ var y = new Array(RessStat2,"");}
		return y;
	}
	if(coll=="ReadyTimeD"){
		var x = getVal("ReadyTimeD", ReadyTimeD);
			if(x=="true" ){ var y = new Array(ReadyTimeD,"checked");}
			else{ var y = new Array(ReadyTimeD,"");}
		return y;
	}
	if(coll=="maxSpielerScore"){
		var x = getVal("maxSpielerScore", maxSpielerScore);
			if(x=="true" ){ var y = new Array(maxSpielerScore,"checked");}
			else{ var y = new Array(maxSpielerScore,"");}
		return y;
	}
	if(coll=="fleet1Info"){
		var x = getVal("fleet1Info", fleet1Info);
			if(x=="true" ){ var y = new Array(fleet1Info,"checked");}
			else{ var y = new Array(fleet1Info,"");}
		return y;
	}
	if(coll=="constructionD"){
		var x = getVal("constructionD", constructionD);
			if(x=="true" ){ var y = new Array(constructionD,"checked");}
			else{ var y = new Array(constructionD,"");}
		return y;
	}
	if(coll=="movementD"){
		var x = getVal("movementD", movementD);
			if(x=="true" ){ var y = new Array(movementD,"checked");}
			else{ var y = new Array(movementD,"");}
		return y;
	}
	if(coll=="SpioAnal"){
		var x = getVal("SpioAnal", SpioAnal);
			if(x=="true" ){ var y = new Array(SpioAnal,"checked");}
			else{ var y = new Array(SpioAnal,"");}
		return y;
	}
	if(coll=="MessInBu"){
		var x = getVal("MessInBu", MessInBu);
			if(x=="true" ){ var y = new Array(MessInBu,"checked");}
			else{ var y = new Array(MessInBu,"");}
		return y;
	}
	if(coll=="BaumatShow"){
		var x = getVal("BaumatShow", BaumatShow);
			if(x=="true" ){ var y = new Array(BaumatShow,"checked");}
			else{ var y = new Array(BaumatShow,"");}
		return y;
	}
}
function select(coll, val){
	if(coll=="koords1Z"){
		var x = getVal(("koords1Z"+OUni), koords1Z);
			if(x==val ) var y = "selected";
			else var y = "";
		return y;
	}
	if(coll=="koords2Z"){
		var x = getVal(("koords2Z"+OUni), koords1Z);
			if(x==val ) var y = "selected";
			else var y = "";
		return y;
	}
	if(coll=="koords3Z"){
		var x = getVal(("koords3Z"+OUni), koords1Z);
			if(x==val ) var y = "selected";
			else var y = "";
		return y;
	}
}
function setColor(col){
	if(col=="angriffD") return angriffD;
	if(col=="stationierenD") return stationierenD;
	if(col=="expeditionD") return expeditionD;
	if(col=="spionageD") return spionageD;
	if(col=="transportD") return transportD;
	if(col=="tfAbbauenD") return tfAbbauenD;
	if(col=="haltenD") return haltenD;
	if(col=="kolonisierenD") return kolonisierenD;
	if(col=="verbandD") return verbandD;
	if(col=="defaultD") return defaultD;
	if(col=="feindgD") return feindgD;
	if(col=="freundgD") return freundgD;
	if(col=="freund2D") return freund2D;
	if(col=="feindg2D") return feindg2D;
	if(col=="tfcolD") return tfcolD;
}
function format(zahl, TZ){
    if(!TZ) TZ = '.';
    var new_string = [];
    var tmp = parseInt(zahl) + '';
    while( tmp.length > 3)
    {
        new_string[new_string.length] = tmp.substr(tmp.length - 3 ) ;
        tmp = tmp.substr(0, tmp.length -3 )
    }
    if(tmp)  new_string[new_string.length] = tmp;
    return new_string.reverse().join(TZ);
}
function FleetMod_Ajax(){

	if(overviewD=="true" && document.location.href.split("?")[1].split("&")[0].split("=")[1]!="overview"){
		document.getElementById('eventboxContent').style.display="none";
	}else{	
		//var url = document.location.href;
		//var s =url.split("session=");
		var FleetModUrl ='/game/index.php?page=eventList&ajax=1'; //&session='+s[1].split("&")[0]+'&ajax=1';
			http_request = false;
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType) {
				http_request.overrideMimeType('text/xml');
			}
			http_request.onreadystatechange = show;
			http_request.open('GET', '/game/index.php?page=eventList&ajax=1' , true);
			http_request.send(null); 
	}
}		
function show() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200){
			FleetMod();
		}
	}
}
function FleetMod(){
	var duration = new Array();
	var eventList = document.getElementById('eventboxContent');
	eventList.style.display="block";
	duration=eventList.getElementsByTagName("tr");

	for (var i = 0; i <duration.length;i++){
		
		var mission = duration[i].children[2].children[0].src.match(/gfsrv.net\/(.+)\.gif/)[1];
		//var mission = duration[i].children[2].children[0].src.match(/icon\-(.+)\.gif/)[1];
		
		var check = duration[i].getElementsByClassName('arrivalTime')[0];
		if(check){
			var friendly = duration[i].children[2].children[0].title.match(/(.+)\|/)[1];
		}
		var url=duration[i].children[6].children[0].getAttribute('href');
			/* Fuck GF
			switch(mission) {
				case ('angriff'): duration[i].style.color=getVal("angriffD",setColor("angriffD")); break;
				case ('stationieren'): duration[i].style.color=getVal("stationierenD",setColor("stationierenD")); break;
				case ('expedition'): duration[i].style.color=getVal("expeditionD",setColor("expeditionD")); break;
				case ('spionage'): duration[i].style.color=getVal("spionageD",setColor("spionageD")); break;
				case ('transport'): duration[i].style.color=getVal("transportD",setColor("transportD")); break;
				case ('tf-abbauen'): duration[i].style.color=getVal("tfAbbauenD",setColor("tfAbbauenD")); break;
				case ('halten'): duration[i].style.color=getVal("haltenD",setColor("haltenD")); break;
				case ('kolonisieren'): duration[i].style.color=getVal("kolonisierenD",setColor("kolonisierenD")); break;
				case ('verband'): duration[i].style.color=getVal("verbandD",setColor("verbandD")); break;
				default: duration[i].style.color=getVal("defaultD",setColor("defaultD"));
			}
			*/
			switch(mission.split("/")[1]) {
				case ('cd360bccfc35b10966323c56ca8aac'): duration[i].style.color=getVal("angriffD",setColor("angriffD")); break;
				case ('4dab966bded2d26f89992b2c6feb4c'): duration[i].style.color=getVal("stationierenD",setColor("stationierenD")); break;
				case ('892b08269e0e0bbde60b090099f547'): duration[i].style.color=getVal("expeditionD",setColor("expeditionD")); break;
				case ('60a018ae3104b4c7e5af8b2bde5aee'): duration[i].style.color=getVal("spionageD",setColor("spionageD")); break;
				case ('2af2939219d8227a11a50ff4df7b51'): duration[i].style.color=getVal("transportD",setColor("transportD")); break;
				case ('26dd1bcab4f77fe67aa47846b3b375'): duration[i].style.color=getVal("tfAbbauenD",setColor("tfAbbauenD")); break;
				case ('b20ddc3fdb2486567ce20d24d3889d'): duration[i].style.color=getVal("haltenD",setColor("haltenD")); break;
				case ('0bbcbc3a6d6b102c979413d82bac47'): duration[i].style.color=getVal("kolonisierenD",setColor("kolonisierenD")); break;
				case ('87d615c4fb395b75ec902b66b7757e'): duration[i].style.color=getVal("verbandD",setColor("verbandD")); break;
				default: duration[i].style.color=getVal("defaultD",setColor("defaultD"));
			}
		if(initalCheckbox("alertnativD")[1]!="checked")
			duration[i].children[3].style.color="white";
		if(check){
			if(duration[i].children[2].firstChild.getAttribute('title').match(/\(R\)/)){
				if(getVal("transparentD",initalCheckbox("transparentD")[0])=="true")
					duration[i].style.opacity = (getVal("opacityD",opacityD)/100);
				duration[i].style.fontStyle = 'oblique';
				if(getVal("reversalD",initalCheckbox("reversalD")[0])=="true"){
					var span=document.createElement('span');
					duration[i].children[3].appendChild(span);
					span.innerHTML=" (R)";
				}
			}
		}
		if(initalCheckbox("alertnativD")[1]!="checked"){
			duration[i].style.verticalAlign="top";
			ChangeTime(duration[i]);
			if(initalCheckbox("showFleetD")[1]=="checked") sendRequest(duration[i], url);			
		}else{
			var span = document.createElement('span');
			duration[i].children[3].appendChild(span);
			span.innerHTML=duration[i].children[4].innerHTML;
			duration[i].children[4].style.display="none";
			
			var span2 = document.createElement('span');
			duration[i].children[7].appendChild(span2);
			span2.innerHTML=duration[i].children[8].innerHTML;
			duration[i].children[8].style.display="none";
			
			duration[i].children[6].style.backgroundPosition="center";
			duration[i].insertBefore(duration[i].children[2], duration[i].children[0]);
			duration[i].insertBefore(duration[i].children[5], duration[i].children[3]);
		}
		if(friendly=="Feindliche Flotte"){
			duration[i].className=duration[i].className+" feind";
		}
		if(friendly=="Friedliche Flotte"){
			duration[i].className=duration[i].className+" freund";
		}	
	}
		var cssValue="#eventboxContent table{border-spacing:0;border-collapse:collapse;} #eventboxContent tr.feind td{background-color:"+getVal("feindgD",setColor("feindgD"))+";color:"+getVal("feindg2D",setColor("feindg2D"))+"} #eventboxContent tr.freund td{background-color: "+getVal("freundgD",setColor("freundgD"))+";color:"+getVal("freund2D",setColor("freund2D"))+"}";
		var style = document.createElement('style');
		style.type = "text/css";
		document.getElementById('eventboxContent').appendChild(style);
		style.innerHTML=cssValue;
		
	if(initalCheckbox("alertnativD")[1]=="checked"){
		var cssValue="#eventboxContent td{border:2px solid white;height:25px;}";
		var style = document.createElement('style');
		document.getElementById('eventboxContent').appendChild(style);
			style.innerHTML=cssValue;
	}
}
function sendRequest(element, url) {
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: url,
		onload: function(response) 
		{
			showFleet(element, response.responseText);
		}
	}); 
}
function showFleet(element, text){
	text = text
		.replace(/<th colspan="2">.+?<\/th>/gi, '')
		.replace(/(<.+?>\s*)+/gi,' ')
		.replace(' &nbsp; ','<br/><br/>')
		.replace(/^\s/,'')
	;
	var td = document.createElement('td');
		td.className='axyz';
		td.style.overflow='visible';
		td.style.maxWidth='0';
	element.appendChild(td);
	element.insertBefore(td, element.firstChild);
		td.innerHTML='<div style="position:relative; left:142px; top:0; width:400px; font-size:9px; padding-bottom: 2px; line-height: 9px; margin-top:3em; text-align:left;">'+text+'</div>';
}
function ChangeTime(duration){
	if(initalCheckbox("ChangTimeD")[1]=="checked"){
			var inhalt=" ";
			if(duration.getElementsByClassName('arrivalTime')[0]){
				inhalt=duration.children[1].innerHTML;
				duration.children[1].style.display="none";	
			}
			else inhalt=" ";
			var td = document.createElement('td');
					td.className='axyz';
					td.style.overflow='visible';
					td.style.maxWidth='0';
				duration.appendChild(td);
			duration.insertBefore(td, duration.children[0]);
					td.innerHTML='<div style="position:relative; left:20px; top:0; width:120px;  padding-bottom: 2px; margin-top:2em; text-align:left; color:white;">'+inhalt+'</div>';
	}else{
		duration.children[1].style.color="white";
	}
}
function FleetModiDom(e){
	if(!e || !e.target || !e.target.id || e.target.id != "eventListWrap") return;
		FleetMod_Ajax();
}
function FleetModi(){
	var eventListWrap = document.getElementById('eventListWrap');
	if(eventListWrap){
		FleetMod_Ajax();
	}else{
		var eventboxContent = document.getElementById('eventboxContent');
		if (eventboxContent) 
			eventboxContent.addEventListener('DOMNodeInserted', FleetModiDom, false);
	}
}
function getVal2(key, def){
	var retValue = localStorage.getItem(key);
	if ( !retValue ){
		return def;
	}
	return retValue;
}
function OptionsMenu(){
	localStorage.setItem("ChangTimeD",GM_getValue("ChangTimeD",ChangTimeD));
	localStorage.setItem("showFleetD",GM_getValue("showFleetD",showFleetD));
	localStorage.setItem("reversalD",GM_getValue("reversalD",reversalD));
	localStorage.setItem("transparentD",GM_getValue("transparentD",transparentD));
	localStorage.setItem("overviewD",GM_getValue("overviewD",overviewD));
	localStorage.setItem("opacityD",GM_getValue("opacityD",opacityD));
	localStorage.setItem("alertnativD",GM_getValue("alertnativD",alertnativD));
	localStorage.setItem("prangerD",GM_getValue("prangerD",prangerD));
	localStorage.setItem("savekbD",GM_getValue("savekbD",savekbD));

	localStorage.setItem("standartshD",GM_getValue("standartshD",standartshD));
	localStorage.setItem("standartshoeheD",GM_getValue("standartshoeheD",standartshoeheD));
	localStorage.setItem("expobD",GM_getValue("expobD",expobD));
	localStorage.setItem("koordsD",GM_getValue("koordsD",koordsD));
	localStorage.setItem("koords1D",GM_getValue(("koords1D"+OUni),koords1D));
	localStorage.setItem("koords2D",GM_getValue(("koords2D"+OUni),koords2D));
	localStorage.setItem("koords3D",GM_getValue(("koords3D"+OUni),koords3D));
	localStorage.setItem("koords1Z",GM_getValue(("koords1Z"+OUni),koords1Z));
	localStorage.setItem("koords2Z",GM_getValue(("koords2Z"+OUni),koords1Z));
	localStorage.setItem("koords3Z",GM_getValue(("koords3Z"+OUni),koords1Z));
	localStorage.setItem("speedD",GM_getValue("speedD",speedD));
	localStorage.setItem("sendfleetD",GM_getValue("sendfleetD",sendfleetD));
	localStorage.setItem("aktivekoordsD",GM_getValue("aktivekoordsD",aktivekoordsD));
	localStorage.setItem("RessStat",GM_getValue("RessStat",RessStat));
	localStorage.setItem("RessStat2",GM_getValue("RessStat2",RessStat2));
	localStorage.setItem("ReadyTimeD",GM_getValue("ReadyTimeD",ReadyTimeD));

	localStorage.setItem("angriffD",GM_getValue("angriffD",angriffD));
	localStorage.setItem("stationierenD",GM_getValue("stationierenD",stationierenD));
	localStorage.setItem("expeditionD",GM_getValue("expeditionD",expeditionD));
	localStorage.setItem("spionageD",GM_getValue("spionageD",spionageD));
	localStorage.setItem("transportD",GM_getValue("transportD",transportD));
	localStorage.setItem("tfAbbauenD",GM_getValue("tfAbbauenD",tfAbbauenD));
	localStorage.setItem("haltenD",GM_getValue("haltenD",haltenD));
	localStorage.setItem("verbandD",GM_getValue("verbandD",verbandD));
	localStorage.setItem("kolonisierenD",GM_getValue("kolonisierenD",kolonisierenD));
	localStorage.setItem("defaultD",GM_getValue("defaultD",defaultD));
	localStorage.setItem("maxSpielerScore",GM_getValue("maxSpielerScore",maxSpielerScore));
	localStorage.setItem("fleet1Info",GM_getValue("fleet1Info",fleet1Info));
	localStorage.setItem("constructionD",GM_getValue("constructionD",constructionD));
	localStorage.setItem("movementD",GM_getValue("movementD",movementD));
	localStorage.setItem("SpioAnal",GM_getValue("SpioAnal",SpioAnal));
	localStorage.setItem("MessInBu",GM_getValue("MessInBu",MessInBu));
	localStorage.setItem("BaumatShow",GM_getValue("BaumatShow",BaumatShow));
	
	localStorage.setItem("feindgD",GM_getValue("feindgD",feindgD));
	localStorage.setItem("freundgD",GM_getValue("freundgD",freundgD));
	localStorage.setItem("freund2D",GM_getValue("freund2D",freund2D));
	localStorage.setItem("feindg2D",GM_getValue("feindg2D",feindg2D));
	
	localStorage.setItem("galaxyD",GM_getValue("galaxyD",galaxyD));
	localStorage.setItem("tfbackD",GM_getValue("tfbackD",tfbackD));
	localStorage.setItem("MessRessBu",GM_getValue(("MessRessBu"+OUni),MessRessBu));
	
	var div = document.createElement('div');
		div.className='content';
		div.style.width = "100%";
		div.style.color="white";
	document.getElementById('content').getElementsByClassName('contentzs')[0].appendChild(div);
			var inhalt = new Array();
			inhalt[0]="<div class='tabwrapper' style='text-align:center;font-size:24px'><a href='http://userscripts.org/scripts/show/103554' style='color:orange;text-decoration:none;' target='_blank'>Fleet_Mod v."+version+"</a></div><div style='padding-left:30px'>";
			inhalt[1]="<div><span style='font-size:25px'>"+ltext[0]+"</span></div>";
			inhalt[2]='<input type="checkbox" id="alertnativD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("alertnativD")[1]+'> '+ltext[1]+'<br>';
			inhalt[3]='<input type="checkbox" id="overviewD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("overviewD")[1]+'> '+ltext[2]+'<br>';
			inhalt[4]='<input type="checkbox" id="ChangTimeD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("ChangTimeD")[1]+'> '+ltext[3]+'<br>';
			inhalt[5]='<input type="checkbox" id="showFleetD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("showFleetD")[1]+'> '+ltext[4]+'<br>';
			inhalt[6]='<input type="checkbox" id="reversalD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("reversalD")[1]+'> '+ltext[5]+'<br>';
			inhalt[7]='<input type="checkbox" id="transparentD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("transparentD")[1]+'> '+ltext[6]+'<br>';
			inhalt[8]='<input type="text" id="opacityD" onchange="localStorage.setItem(this.id,this.value);" style="margin-left:100px;width:50px" value="'+getVal("opacityD",opacityD)+'"> '+ltext[7]+'<br>';
			inhalt[9]="<br><div><span style='font-size:25px'>"+ltext[8]+"</span></div>";
			inhalt[10]='<input type="text" id="angriffD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("angriffD",setColor("angriffD"))+'"> '+ltext[9]+'<br>';
			inhalt[11]='<input type="text" id="stationierenD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("stationierenD",setColor("stationierenD"))+'"> '+ltext[10]+'<br>';
			inhalt[12]='<input type="text" id="expeditionD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("expeditionD",setColor("expeditionD"))+'"> '+ltext[11]+'<br>';
			inhalt[13]='<input type="text" id="spionageD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("spionageD",setColor("spionageD"))+'"> '+ltext[12]+'<br>';
			inhalt[14]='<input type="text" id="transportD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("transportD",setColor("transportD"))+'"> '+ltext[13]+'<br>';
			inhalt[15]='<input type="text" id="tfAbbauenD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("tfAbbauenD",setColor("tfAbbauenD"))+'"> '+ltext[14]+'<br>';
			inhalt[16]='<input type="text" id="haltenD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("haltenD",setColor("haltenD"))+'"> '+ltext[15]+'<br>';
			inhalt[17]='<input type="text" id="verbandD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("verbandD",setColor("verbandD"))+'"> '+ltext[16]+'<br>';
			inhalt[18]='<input type="text" id="kolonisierenD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("kolonisierenD",setColor("kolonisierenD"))+'"> '+ltext[17]+'<br>';
			inhalt[19]='<input type="text" id="defaultD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("defaultD",setColor("defaultD"))+'"> '+ltext[18]+'<br>';
			inhalt[20]='<br><input type="text" id="feindgD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("feindgD",setColor("feindgD"))+'"> '+ltext[19]+'<br>';
			inhalt[21]='<input type="text" id="feindg2D" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("feindg2D",setColor("feindg2D"))+'"> '+ltext[20]+'<br>';
			inhalt[22]='<br>';
			inhalt[23]='<input type="text" id="freundgD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("freundgD",setColor("freundgD"))+'"> '+ltext[21]+'<br>';
			inhalt[24]='<input type="text" id="freund2D" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" value="'+getVal("freund2D",setColor("freund2D"))+'"> '+ltext[22]+'<br>';
			
			inhalt[25]="<br><div><span style='font-size:25px'>"+ltext[23]+"</span></div>";
			inhalt[26]='<input type="checkbox" id="maxSpielerScore" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("maxSpielerScore")[1]+'> '+ltext[64]+'<br>';
			inhalt[28]='<input type="checkbox" id="standartshD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("standartshD")[1]+'> '+ltext[24]+'<br>';
			inhalt[27]='<input type="checkbox" id="fleet1Info" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("fleet1Info")[1]+'> '+ltext[65]+'<br>';
			inhalt[29]='<input type="text" id="standartshoeheD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" style="margin-left:100px;width:50px" value="'+getVal("standartshoeheD",standartshoeheD)+'"> '+ltext[25]+'<br>';
			inhalt[30]='<br><input type="checkbox" id="expobD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("expobD")[1]+'> '+ltext[26]+'<br>';
			
			inhalt[31]=ltext[27]+"<br>";
			inhalt[32]='<input type="checkbox" id="koordsD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("koordsD")[1]+'> '+ltext[28]+'<br>';
			inhalt[33]='<input type="text" id="koords1D" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" style="margin-left:50px;width:60px" value="'+getVal2("koords1D",koords1D)+'"> '+ltext[29]+' 1 ';
			inhalt[34]='<select name="koords1Z" size="1" style="width:70px" onchange="localStorage.setItem(this.name,this.value);"><option value="3" '+select("koords1Z","3")+'>'+ltext[61]+'</option><option value="2" '+select("koords1Z","2")+'>'+ltext[60]+'</option><option value="1" '+select("koords1Z","1")+'>'+ltext[59]+'</option></select><br>';
			inhalt[35]='<input type="text" id="koords2D" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" style="margin-left:50px;width:60px" value="'+getVal2("koords2D",koords2D)+'"> '+ltext[29]+' 2 ';
			inhalt[36]='<select name="koords2Z" size="1" style="width:70px" onchange="localStorage.setItem(this.name,this.value);"><option value="3" '+select("koords2Z","3")+'>'+ltext[61]+'</option><option value="2" '+select("koords2Z","2")+'>'+ltext[60]+'</option><option value="1" '+select("koords2Z","1")+'>'+ltext[59]+'</option></select><br>';
			inhalt[37]='<input type="text" id="koords3D" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" style="margin-left:50px;width:60px" value="'+getVal2("koords3D",koords3D)+'"> '+ltext[29]+' 3 ';									
			inhalt[38]='<select name="koords3Z" size="1" style="width:70px" onchange="localStorage.setItem(this.name,this.value);"><option value="3" '+select("koords3Z","3")+'>'+ltext[61]+'</option><option value="2" '+select("koords3Z","2")+'>'+ltext[60]+'</option><option value="1" '+select("koords3Z","1")+'>'+ltext[59]+'</option></select><br>';
			inhalt[39]='<input type="checkbox" id="koordserD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("koordserD")[1]+'> '+ltext[30]+'<br>';
			inhalt[40]='<input type="checkbox" id="aktivekoordsD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("aktivekoordsD")[1]+'> '+ltext[31]+'<br>';
			inhalt[41]='<input type="checkbox" id="speedD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("speedD")[1]+'> '+ltext[32]+'<br>';
			inhalt[42]='<br><input type="checkbox" id="sendfleetD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("sendfleetD")[1]+'> '+ltext[33]+'<br>';
			inhalt[43]='<br><input type="checkbox" id="movementD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("movementD")[1]+'> '+ltext[67]+'<br>';
						
			inhalt[44]="<br><div><span style='font-size:25px'>"+ltext[34]+"</span></div>";
			inhalt[45]='<input type="checkbox" id="galaxyD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("galaxyD")[1]+'> '+ltext[35]+'<br>';
			inhalt[46]='<input type="text" id="tfbackD" onchange="localStorage.setItem(this.id,this.value);" style="width:60px" value="'+getVal2("tfbackD",tfbackD)+'"> '+ltext[36]+'<br>';
			inhalt[47]='<input type="text" id="tfcolD" onchange="this.style.backgroundColor=this.value; localStorage.setItem(this.id,this.value);" style="width:60px" value="'+getVal("tfcolD",setColor("tfcolD"))+'"> '+ltext[37]+'<br>';
	
			inhalt[48]="<br><div><span style='font-size:25px'>"+ltext[74]+"</span></div>";
			inhalt[49]='<input type="checkbox" id="SpioAnal" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("SpioAnal")[1]+'> '+ltext[75]+'<br>';
			inhalt[50]='<input type="checkbox" id="MessInBu" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("MessInBu")[1]+'> '+ltext[79]+'<br>';
			inhalt[51]='<input type="text" id="MessRessBu" onchange="localStorage.setItem(this.id,this.value);" style="width:60px" value="'+MessRessBu+'"> '+ltext[81]+'<br>';
			
			inhalt[52]="<br><div><span style='font-size:25px'>"+ltext[83]+"</span></div>";
			inhalt[53]='<input type="checkbox" id="BaumatShow" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("BaumatShow")[1]+'> '+ltext[82]+'<br>';
			
			inhalt[54]="<br><div><span style='font-size:25px'>"+ltext[38]+"</span></div>";
			inhalt[55]='<input type="checkbox" id="prangerD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("prangerD")[1]+'> '+ltext[39]+'<br>';
			inhalt[56]='<input type="checkbox" id="savekbD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("savekbD")[1]+'> '+ltext[40]+'<br>';
		
			inhalt[57]='<input type="checkbox" id="RessStat" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("RessStat")[1]+'> '+ltext[62]+'<br>';
			inhalt[58]='<input type="checkbox" id="RessStat2" style="margin-left:75px" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("RessStat2")[1]+'> '+ltext[73]+'<br>';

			inhalt[59]='<input type="checkbox" id="ReadyTimeD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("ReadyTimeD")[1]+'> '+ltext[63]+'<br>';
			inhalt[60]='<input type="checkbox" id="constructionD" onchange="localStorage.setItem(this.id,this.checked);" value="1" '+initalCheckbox("constructionD")[1]+'> '+ltext[66]+'<br>';
		
			inhalt[61]="<br><a href='"+document.location.href+"&fleetmod=reset"+"' style='color:orange;margin-left:25px;padding:2px;border: 4px groove orange;text-decoration:none'>"+ltext[41]+"</a> ";
			inhalt[62]="<a href='"+document.location.href+"&fleetmod=save"+"' style='color:orange;margin-left:25px;padding:2px;border: 4px groove orange;text-decoration:none'>"+ltext[42]+"</a><br>&nbsp;</div>";

			var text="";
			for(i=0;i<inhalt.length;i++){
				text=text+inhalt[i];
			}
		div.innerHTML= text;
		changeColor();
}
function changeColor(){
	var id = new Array("angriffD","stationierenD","expeditionD","spionageD","transportD","tfAbbauenD","haltenD","verbandD","kolonisierenD","defaultD","feindgD","freundgD","feindg2D","freund2D","tfcolD");
	for(i=0;i<id.length;i++)
	{
		document.getElementById(id[i]).style.backgroundColor=document.getElementById(id[i]).value;
	}
}
function OptionsReset(){
	localStorage.removeItem("ChangTimeD");
	localStorage.removeItem("showFleetD");
	localStorage.removeItem("reversalD");
	localStorage.removeItem("transparentD");
	localStorage.removeItem("overviewD");
	localStorage.removeItem("opacityD");
	localStorage.removeItem("alertnativD");
	localStorage.removeItem("prangerD");
	localStorage.removeItem("savekbD");

	localStorage.removeItem("standartshD");
	localStorage.removeItem("standartshoeheD");
	localStorage.removeItem("expobD");
	localStorage.removeItem("koordsD");
	localStorage.removeItem("koords1D");
	localStorage.removeItem("koords2D");
	localStorage.removeItem("koords3D");
	localStorage.removeItem("koords1Z");
	localStorage.removeItem("koords2Z");
	localStorage.removeItem("koords3Z");
	localStorage.removeItem("koordserD");
	localStorage.removeItem("speedD");
	localStorage.removeItem("sendfleetD");
	localStorage.removeItem("aktivekoordsD");
	
	localStorage.removeItem("angriffD");
	localStorage.removeItem("stationierenD");
	localStorage.removeItem("expeditionD");
	localStorage.removeItem("spionageD");
	localStorage.removeItem("transportD");
	localStorage.removeItem("tfAbbauenD");
	localStorage.removeItem("haltenD");
	localStorage.removeItem("verbandD");
	localStorage.removeItem("kolonisierenD");
	localStorage.removeItem("defaultD");
	localStorage.removeItem("RessStat");
	localStorage.removeItem("RessStat2");
	localStorage.removeItem("ReadyTimeD");
	localStorage.removeItem("maxSpielerScore");
	localStorage.removeItem("fleet1Info");
	localStorage.removeItem("constructionD");
	localStorage.removeItem("movementD");
	localStorage.removeItem("SpioAnal");
	localStorage.removeItem("MessInBu");

	localStorage.removeItem("feindgD");
	localStorage.removeItem("freundgD");
	localStorage.removeItem("freund2D");
	localStorage.removeItem("feindg2D");
	
	localStorage.removeItem("galaxyD");
	localStorage.removeItem("tfbackD");
	localStorage.removeItem("tfcolD");
	localStorage.removeItem("MessRessBu");
	localStorage.removeItem("BaumatShow");
	
	GM_deleteValue("BaumatShow");
	GM_deleteValue("ChangTimeD");
	GM_deleteValue("showFleetD");
	GM_deleteValue("reversalD");
	GM_deleteValue("transparentD");
	GM_deleteValue("overviewD");
	GM_deleteValue("opacityD");
	GM_deleteValue("alertnativD");
	GM_deleteValue("prangerD");
	GM_deleteValue("savekbD");

	GM_deleteValue("standartshD");
	GM_deleteValue("standartshoeheD");
	GM_deleteValue("expobD");
	GM_deleteValue("koordsD");
	GM_deleteValue(("koords1D"+OUni));
	GM_deleteValue(("koords2D"+OUni));
	GM_deleteValue(("koords3D"+OUni));
	GM_deleteValue(("koords1Z"+OUni));
	GM_deleteValue(("koords2Z"+OUni));
	GM_deleteValue(("koords3Z"+OUni));
	GM_deleteValue("koordserD");
	GM_deleteValue("speedD");
	GM_deleteValue("sendfleetD");
	GM_deleteValue(("MessRessBu"+OUni));
	GM_deleteValue(("MessRessBu"+OUni));
	
	GM_deleteValue("angriffD");
	GM_deleteValue("stationierenD");
	GM_deleteValue("expeditionD");
	GM_deleteValue("spionageD");
	GM_deleteValue("transportD");
	GM_deleteValue("tfAbbauenD");
	GM_deleteValue("haltenD");
	GM_deleteValue("verbandD");
	GM_deleteValue("kolonisierenD");
	GM_deleteValue("defaultD");
	GM_deleteValue("aktivekoordsD");
	GM_deleteValue("RessStat");
	GM_deleteValue("RessStat2");
	GM_deleteValue("ReadyTimeD");
	GM_deleteValue("maxSpielerScore");
	GM_deleteValue("fleet1Info");
	GM_deleteValue("constructionD");
	GM_deleteValue("movementD");
	GM_deleteValue("SpioAnal");
	GM_deleteValue("MessInBu");
	
	GM_deleteValue("feindgD");
	GM_deleteValue("freundgD");
	GM_deleteValue("freund2D");
	GM_deleteValue("feindg2D");
	
	GM_deleteValue("galaxyD");
	GM_deleteValue("tfbackD");
	GM_deleteValue("tfcolD");
	
	var div = document.createElement('div');
		div.className='FleetModOption';
		div.style.width = "100%";
		div.style.backgroundColor="black";
		div.style.color="white";
		div.style.height="200px";
		div.style.textAlign="center";
		div.style.paddingTop="100px";
	document.getElementById('inhalt').appendChild(div);
		div.innerHTML="<a href='"+document.location.href.split("session=")[0]+"session="+document.location.href.split("session=")[1].split("&")[0]+"'><span style='color:orange;font-size:26px'>"+ltext[43]+"</span></a>";
}
function OptionsSave(){

	GM_setValue("ChangTimeD",getVal2("ChangTimeD",ChangTimeD));
	GM_setValue("showFleetD",getVal2("showFleetD",showFleetD));
	GM_setValue("reversalD",getVal2("reversalD",reversalD));
	GM_setValue("transparentD",getVal2("transparentD",transparentD));
	GM_setValue("overviewD",getVal2("overviewD",overviewD));
	GM_setValue("opacityD",getVal2("opacityD",opacityD));
	GM_setValue("alertnativD",getVal2("alertnativD",alertnativD));
	GM_setValue("prangerD",getVal2("prangerD",prangerD));
	GM_setValue("savekbD",getVal2("savekbD",savekbD));

	GM_setValue("standartshD",getVal2("standartshD",standartshD));
	GM_setValue("standartshoeheD",getVal2("standartshoeheD",standartshoeheD));
	GM_setValue("expobD",getVal2("expobD",expobD));
	GM_setValue("koordsD",getVal2("koordsD",koordsD));
	GM_setValue(("koords1D"+OUni),getVal2("koords1D",koords1D));
	GM_setValue(("koords2D"+OUni),getVal2("koords2D",koords2D));
	GM_setValue(("koords3D"+OUni),getVal2("koords3D",koords3D));
	GM_setValue(("koords1Z"+OUni),getVal2("koords1Z",koords1Z));
	GM_setValue(("koords2Z"+OUni),getVal2("koords2Z",koords1Z));
	GM_setValue(("koords3Z"+OUni),getVal2("koords3Z",koords1Z));
	GM_setValue("koordserD",getVal2("koordserD",koordserD));
	GM_setValue("speedD",getVal2("speedD",speedD));
	GM_setValue("sendfleetD",getVal2("sendfleetD",sendfleetD));
	
	GM_setValue("angriffD",getVal2("angriffD",angriffD));
	GM_setValue("stationierenD",getVal2("stationierenD",stationierenD));
	GM_setValue("expeditionD",getVal2("expeditionD",expeditionD));
	GM_setValue("spionageD",getVal2("spionageD",spionageD));
	GM_setValue("transportD",getVal2("transportD",transportD));
	GM_setValue("tfAbbauenD",getVal2("tfAbbauenD",tfAbbauenD));
	GM_setValue("haltenD",getVal2("haltenD",haltenD));
	GM_setValue("verbandD",getVal2("verbandD",verbandD));
	GM_setValue("kolonisierenD",getVal2("kolonisierenD",kolonisierenD));
	GM_setValue("defaultD",getVal2("defaultD",defaultD));
	GM_setValue("aktivekoordsD",getVal2("aktivekoordsD",aktivekoordsD));
	GM_setValue("RessStat",getVal2("RessStat",RessStat));
	GM_setValue("RessStat2",getVal2("RessStat2",RessStat2));
	GM_setValue("ReadyTimeD",getVal2("ReadyTimeD",ReadyTimeD));
	GM_setValue("maxSpielerScore",getVal2("maxSpielerScore",maxSpielerScore));
	GM_setValue("fleet1Info",getVal2("fleet1Info",fleet1Info));
	GM_setValue("constructionD",getVal2("constructionD",constructionD));
	GM_setValue("movementD",getVal2("movementD",movementD));
	GM_setValue("SpioAnal",getVal2("SpioAnal",SpioAnal));
	GM_setValue("MessInBu",getVal2("MessInBu",MessInBu));
	GM_setValue(("MessRessBu"+OUni),getVal2("MessRessBu",MessRessBu));
	
	GM_setValue("feindgD",getVal2("feindgD",feindgD));
	GM_setValue("freundgD",getVal2("freundgD",freundgD));
	GM_setValue("freund2D",getVal2("freund2D",freund2D));
	GM_setValue("feindg2D",getVal2("feindg2D",feindg2D));
	
	GM_setValue("galaxyD",getVal2("galaxyD",galaxyD));
	GM_setValue("tfbackD",getVal2("tfbackD",tfbackD));
	GM_setValue("tfcolD",getVal2("tfcolD",tfcolD));
	GM_setValue("BaumatShow",getVal2("BaumatShow",BaumatShow));
	
	var div = document.createElement('div');
		div.className='FleetModOption';
		div.style.width = "100%";
		div.style.backgroundColor="black";
		div.style.color="white";
		div.style.height="200px";
		div.style.textAlign="center";
		div.style.paddingTop="100px";
	document.getElementById('inhalt').appendChild(div);
		div.innerHTML="<a href='"+document.location.href.split("session=")[0]+"session="+document.location.href.split("session=")[1].split("&")[0]+"'><span style='color:orange;font-size:26px'>"+ltext[44]+"</span></a>";
}
function fleet2(){
	if(initalCheckbox("expobD")[1]=="checked"){
		var img = document.createElement('img');
			img.style.position="relative";
			img.style.top="4px";
			img.src = "http://gf1.geo.gfsrv.net/f7/892b08269e0e0bbde60b090099f547.gif";
			img.setAttribute("onclick","$('#position').focus(); $('#position').val('16');updateVariables();");
		document.getElementById('target').children[2].appendChild(img);
	}
	if(initalCheckbox("koordsD")[1]=="checked"){
		var kor1 = getVal(("koords1D"+OUni),koords1D);
		var kor2 = getVal(("koords2D"+OUni),koords2D);
		var kor3 = getVal(("koords3D"+OUni),koords3D);

		var cssValue="#slPanel{padding-top:3px;background: transparent url(http://destroygraph.power-heberg.com/skin_ogame/w7-redesign/bg_coord-envoi-flotte_antigame.png) no-repeat; width: 647px !important;} ul.fleetShort,.fleetShort li{float:left;list-style-type:none;text-align:center;} ul.fleetShort li{margin-left:2px;width:6em;padding:3px;border:1px dashed orange;} ul.fleetShort{margin-left:20px}  ul.fleetShort li:hover{border-style:solid}";
		var ul = document.createElement('div');
			ul.id = "slPanel";
		document.getElementById('inhalt').appendChild(ul);
		var li="<ul class='fleetShort'><style type='text/css'>"+cssValue+"</style>";
		var jskor0='$("#galaxy").val('+kor1.split(":")[0]+'); $("#system").val('+kor1.split(":")[1]+'); $("#position").focus(); $("#position").val('+kor1.split(":")[2]+');setTType('+getVal(("koords1Z"+OUni),koords1Z)+');updateVariables()';
		var jskor1='$("#galaxy").val('+kor2.split(":")[0]+'); $("#system").val('+kor2.split(":")[1]+'); $("#position").focus(); $("#position").val('+kor2.split(":")[2]+');setTType('+getVal(("koords2Z"+OUni),koords1Z)+');updateVariables()';
		var jskor2='$("#galaxy").val('+kor3.split(":")[0]+'); $("#system").val('+kor3.split(":")[1]+'); $("#position").focus(); $("#position").val('+kor3.split(":")[2]+');setTType('+getVal(("koords3Z"+OUni),koords1Z)+');updateVariables();';
		ul.innerHTML="<span style='margin-left:15px;'>Flotten Shortcut</span><br>"+li+"<li onclick='"+jskor0+"'>"+kor1+"</li><li onclick='"+jskor1+"'>"+kor2+"</li><li onclick='"+jskor2+"'>"+kor3+"</li></ul><div style='clear:both'></div>";

		if(initalCheckbox("koordserD")[1]=="checked"){
			var element = document.getElementById("slbox");
			
			if(initalCheckbox("aktivekoordsD")[1]=="checked"){
				var target=document.getElementById('start').innerHTML.split('class="coords">')[1].split("</span")[0].split(">")[1];
				var target2=document.getElementById('start').innerHTML.split('_selected')[0].split("tips ")[1];
				var name=document.getElementById('start').innerHTML.split('class="planet">')[1].split("</div>")[0];
				
				if(target2=="planet"){
					var target3 = document.createElement('option');
					element.appendChild(target3);
					target3.setAttribute("value",target.split(":")[0]+"#"+target.split(":")[1]+"#"+target.split(":")[2]+"#"+"1#"+name);
					target3.innerHTML=name+"["+target+"]";
				}else{
					var target3 = document.createElement('option');
					element.appendChild(target3);
					target3.setAttribute("value",target.split(":")[0]+"#"+target.split(":")[1]+"#"+target.split(":")[2]+"#"+"3#"+name);
					target3.innerHTML=name+"["+target+"]";
				}
				var aktivpos=document.getElementById('rechts').innerHTML.split('class="planet-koords">[');
					var childin=1;
					for(i=1;i<aktivpos.length;i++){
						if(aktivpos[i].split(']</span>')[0]==target)
							childin=i+1;
					}
				element.insertBefore(target3,element.children[childin]);
			}
			
			var li = "<li><span>Planeten</span></li>";
			var li2 = "<li><span>Mond</span></li>";
			var li3 = "<li><span>Kampfverb&auml;nde</span></li>";
			var mon = new Array();
			var mon2 = new Array();
			var y=1;
			for(i=1;i<element.children.length;i++){
				var koords = element.children[i].value.split("#");
				var jsscript='$("#galaxy").val('+koords[0]+'); $("#system").val('+koords[1]+'); $("#position").focus(); $("#position").val('+koords[2]+');setTType('+koords[3]+');updateVariables()';
				if(koords[3]!="3"){
					li=li+"<li onclick='"+jsscript+"' title=\"|"+koords[0]+":"+koords[1]+":"+koords[2]+"\" class=\"tipsStandard\">"+koords[4]+"</li>";
					mon[y]=koords[0]+"#"+koords[1]+"#"+koords[2];
					y++;
				}
			}
			
			for(i=1;i<element.children.length;i++){
			var koords = element.children[i].value.split("#");
				var jsscript='$("#galaxy").val('+koords[0]+'); $("#system").val('+koords[1]+'); $("#position").focus(); $("#position").val('+koords[2]+');setTType('+koords[3]+');updateVariables()';
				if(koords[3]=="3"){
					for(j=1;j<mon.length;j++){
						if(mon[j]===(koords[0]+"#"+koords[1]+"#"+koords[2]))
							mon2[j]="<li onclick='"+jsscript+"'  title=\"|"+koords[0]+":"+koords[1]+":"+koords[2]+"\" class=\"tipsStandard\">"+koords[4]+"</li>";
					}
				}
			}
			for(i=1;i<mon2.length;i++){
				 if(!mon2[i]) li2=li2+"<li style='border-color:transparent !important'>&nbsp;</li>";
				if(mon2[i])li2=li2+mon2[i];
			}
			var element2 = document.getElementById("aksbox");
			for(i=1;i<element2.children.length;i++){
				var koords = element2.children[i].value.split("#");
				var jsscript='$("#galaxy").val('+koords[0]+'); $("#system").val('+koords[1]+'); $("#position").focus(); $("#position").val('+koords[2]+');setTType('+koords[3]+');updateVariables();document.details.union.value = '+koords[5]+';document.details.mission.value = missionUnionattack;';
					li3=li3+"<li onclick='"+jsscript+"'  title=\"|"+koords[0]+":"+koords[1]+":"+koords[2]+"\" class=\"tipsStandard\">"+element2.children[i].innerHTML+"</li>";

			}
			
			var csscode = ".clear{clear:both} ul#slPlani, ul#slMond, ul#slVerband{float:left;margin-top:5px;margin-left:20px;text-align:center;list-style-type:none;} ul#slPlani li, ul#slMond li, ul#slVerband li{margin-top:1px;padding:1px;width:10em;} ul#slPlani span, ul#slMond span, ul#slVerband span{font-weight:bold;}";
			var csscode=csscode+"ul#slPlani li{border:1px dashed green;} ul#slMond li{border:1px dashed blue;} ul#slVerband li{border:1px dashed red;} ul#slPlani li:hover, ul#slMond li:hover, ul#slVerband li:hover{border-style:solid}";
			var addto = ul;
			var style = document.createElement('style');
				style.setAttribute("type","text/css");
			addto.appendChild(style);	
				style.innerHTML=csscode;
			var Plani = document.createElement('ul');
				Plani.id = "slPlani";
			addto.appendChild(Plani);
				Plani.innerHTML=li;
			var Mond = document.createElement('ul');
				Mond.id = "slMond";
			addto.appendChild(Mond);
				Mond.innerHTML=li2;
			var Verband = document.createElement('ul');
				Verband.id = "slVerband";
			addto.appendChild(Verband);
				Verband.innerHTML=li3;
			var clear = document.createElement('div');
				clear.className="clear";
			addto.appendChild(clear);
				clear.innerHTML="&nbsp;";
		}
	}
	if(initalCheckbox("speedD")[1]=="checked"){
		var style2 = document.createElement('style');
			style2.setAttribute("type","text/css");
			document.getElementById("inhalt").appendChild(style2);
			style2.innerHTML="li.FleetModSpeed{position:relative;top:30px;left:0; margin-top:-30px} .FleetModSpeed a{text-decoration:none; margin-right:2px;font-weight:normal !important} .FleetModSpeed a:hover{color:#6F9FC8}";
		var ulSpeed = document.createElement('li');
			ulSpeed.className="FleetModSpeed";
			document.getElementById("fleetBriefingPart1").appendChild(ulSpeed);
		var ulInhalt = "";
			for(i=1;i<=10;i++)
				ulInhalt=ulInhalt+'<a href="javascript:void(0);" rel="'+i+'" onclick="'+"$('#speed').attr('value',this.getAttribute('rel'));updateVariables();"+'">'+(i*10)+'%</a>';
			ulSpeed.innerHTML=ulInhalt;
	}
}
var Schiffe=new Array();
function ShipsOb(id, name , kapa , verb, exp){
	var ships = new Object();
		ships.id = id;
		ships.name = name;
		ships.kapa = kapa;
		ships.verb = verb;
		ships.exp = exp;
	Schiffe[id] = ships;
}
function fleet1(){
	if(initalCheckbox("standartshD")[1]=="checked"){
		if(document.getElementById('allornone').getElementsByClassName('combatunits')[0]){
			var cssValue="ul.fleetShort,.fleetShort li{float:left;list-style-type:none;text-align:center;} ul.fleetShort{margin-left:25px;position:absolute;top:-"+getVal("standartshoeheD",standartshoeheD)+"px;left:0;} ul.fleetShort li{margin-left:2px;min-width:7em;padding:3px;border:1px dashed orange;} ul.fleetShort li:hover{border-style:solid}";
			var ul = document.createElement('ul');
				ul.className = "fleetShort";
			document.getElementById('allornone').children[0].appendChild(ul);
			var li="<style type='text/css'>"+cssValue+"</style>";
			var sh=document.getElementById('allornone').getElementsByClassName('combatunits')[0];
			for(i=0;i<sh.length;i++){
				if(sh.children[i].value != "-"){
					li=li+'<li onclick="setTemplate(shipTemplates['+sh.children[i].value+'],maxShips);'+" checkShips('shipsChosen'); $('#continue').focus();"+';">'+sh.children[i].innerHTML+'</li>';
				}
			}
			ul.innerHTML=li;
		}
	}
	if(initalCheckbox("fleet1Info")[1]=="checked"){
		if(document.getElementById('allornone')){
			// id, Kapazität, Verbrauch, exp-punkte
			ShipsOb(202, ltext[45],	5000,	20,		12);
			ShipsOb(203, ltext[46],	25000,	50,		47);
			ShipsOb(204, ltext[47],	50,		0,		12);
			ShipsOb(205, ltext[48],	100,	0,		110);
			ShipsOb(206, ltext[49],	800,	0,		47);
			ShipsOb(207, ltext[50],	1500,	0,		160);
			ShipsOb(208, ltext[51],	7500,	0,		30);
			ShipsOb(209, ltext[52],	20000,	300, 	16);
			ShipsOb(210, ltext[53],	0,		0,		1);
			ShipsOb(211, ltext[54],	500,	0,		75);
			ShipsOb(213, ltext[55],	2000,	0,		110);
			ShipsOb(214, ltext[56],	1000000,0,		9000);
			ShipsOb(215, ltext[57],	750,	0,		70);
			
			var inp = new Array(202,203,204,205,206,207,208,209,210,211,213,214,215);
			for(i=0;i<inp.length;i++){
				id="ship_"+inp[i];
				document.getElementById(id).addEventListener('focus', function(){ fleet1Dyn(); },false );
			}
			document.getElementById('buttonz').addEventListener('click', function(){ fleet1Dyn(); },false );
			//##############################################################
				var Ressget= new Array("metal_box","crystal_box","deuterium_box");
				var RessType2 = new Array();
				var RessIn=0;
				for(i=0;i<Ressget.length;i++){
					var node = document.getElementById(Ressget[i]);
					if (!node || !node.title){
					}else {
						RessType2.push(node.title.replace(/\|/g,""));
					}
				}
				
				for(i=0;i<RessType2.length;i++){
					if(RessType2[i].match(/<span(.*?)<\/span>/g))
						RessIn=parseInt(RessIn)+parseInt(RessType2[i].match(/<span(.*?)<\/span>/g)[0].replace(/[^0-9]/g,""));
				}
			//##############################################################
			var style=document.createElement('style');
			style.type = "text/css";
			document.getElementById("allornone").children[0].appendChild(style);
			style.innerHTML="table#FleetMod{margin-left:100px;} table#FleetMod td{padding-left:5px;} #inhalt{margin-bottom:75px !important;}";
			
			var table=document.createElement('table');
			table.id="FleetMod";
				var tr=document.createElement('tr');
				tr.id="FleetModRess";
				table.appendChild(tr);
				tr.innerHTML="<td>Ress: </td><td>"+format(RessIn)+"</td>";
				
				var tr=document.createElement('tr');
				tr.id="FleetModKapa";
				table.appendChild(tr);
				tr.innerHTML="<td>Kapazität: </td><td><span style=\"color:green\">0</span></td>";
				
				var tr=document.createElement('tr');
				tr.id="FleetModKT";
				table.appendChild(tr);
				tr.innerHTML="<td>"+ltext[45]+": </td><td>"+format(Math.ceil(RessIn/5000))+"</td>";
				
				var tr=document.createElement('tr');
				tr.id="FleetModGT";
				table.appendChild(tr);
				tr.innerHTML="<td>"+ltext[46]+": </td><td>"+format(Math.ceil(RessIn/25000))+"</td>";
				
				var tr=document.createElement('tr');
				tr.id="FleetModStats";
				table.appendChild(tr);
				tr.innerHTML="<td>Expopunkte: </td><td>0</td>";
			document.getElementById("allornone").children[0].appendChild(table);
		}
	}
}
function inputChe(){
	var inp = new Array(202,203,204,205,206,207,208,209,210,211,213,214,215);
		var ex=0;
		var kapa=0;
		for(i=0;i<inp.length;i++){
			id="ship_"+inp[i];
			ex=ex+document.getElementById(id).value*Schiffe[inp[i]].exp;
			kapa=kapa+document.getElementById(id).value*Schiffe[inp[i]].kapa;
		}
		document.getElementById("FleetModStats").innerHTML="<td>Expopunkte: </td><td><span>"+format(ex)+"</span></td>";
		document.getElementById("FleetModKapa").innerHTML="<td>Kapazität: </td><td><span style=\"color:green\">"+format(kapa)+"</span></td>";
		
		var maxpts = 9000;
		if(initalCheckbox("maxSpielerScore")[1]=="checked")	maxpts=12000;
		if (ex > maxpts)
			document.getElementById("FleetModStats").children[1].className = "overmark";
        else if (ex < maxpts)
			document.getElementById("FleetModStats").children[1].className = "undermark";
		else
			document.getElementById("FleetModStats").children[1].className = "middlemark";
}
function fleet1Dyn(){
	if(document.activeElement.id.split("_")[0]=="ship"){
		inputChe();
		timer = setTimeout(fleet1Dyn,500);
	}
	else{
		inputChe();
	}
}
function fleet3(){
	if(initalCheckbox("sendfleetD")[1]=="checked"){
		var shipssend = new Array();
		var ships = new Array();
			if(document.getElementsByName("am202")[0]){
				shipssend.push(document.getElementsByName("am202")[0].value);
				ships.push(ltext[45]);
			}
			if(document.getElementsByName("am203")[0]){
				shipssend.push(document.getElementsByName("am203")[0].value);
				ships.push(ltext[46]);
			}
			if(document.getElementsByName("am204")[0]){
				shipssend.push(document.getElementsByName("am204")[0].value);
				ships.push(ltext[47]);
			}
			if(document.getElementsByName("am205")[0]){
				shipssend.push(document.getElementsByName("am205")[0].value);
				ships.push(ltext[48]);
			}
			if(document.getElementsByName("am206")[0]){
				shipssend.push(document.getElementsByName("am206")[0].value);
				ships.push(ltext[49]);
			}
			if(document.getElementsByName("am207")[0]){
				shipssend.push(document.getElementsByName("am207")[0].value);
				ships.push(ltext[50]);
			}
			if(document.getElementsByName("am208")[0]){
				shipssend.push(document.getElementsByName("am208")[0].value);
				ships.push(ltext[51]);
			}
			if(document.getElementsByName("am209")[0]){
				var recycler = shipssend.push(document.getElementsByName("am209")[0].value);
				ships.push(ltext[52]);
			}
			if(document.getElementsByName("am210")[0]){
				var spio = shipssend.push(document.getElementsByName("am210")[0].value);
				ships.push(ltext[53]);
			}
			if(document.getElementsByName("am211")[0]){
				var bomber = shipssend.push(document.getElementsByName("am211")[0].value);
				ships.push(ltext[54]);
			}
			if(document.getElementsByName("am213")[0]){
				var zerri = shipssend.push(document.getElementsByName("am213")[0].value);
				ships.push(ltext[55]);
			}
			if(document.getElementsByName("am214")[0]){
				var rip = shipssend.push(document.getElementsByName("am214")[0].value);
				ships.push(ltext[56]);
			}
			if(document.getElementsByName("am215")[0]){
				var sxer = shipssend.push(document.getElementsByName("am215")[0].value);	
				ships.push(ltext[57]);
			}
		var cssrule="#slPanel{background: transparent url(http://destroygraph.power-heberg.com/skin_ogame/w7-redesign/bg_coord-envoi-flotte_antigame.png) no-repeat; width: 647px !important;} table.fleetmod{margin:20px;} table.fleetmod td{color:#6F9FC8;padding:2px 25px 0 0}";
		var div = document.createElement('div');
			div.id = "slPanel";
			
			document.getElementById("inhalt").appendChild(div);
		var style = document.createElement('style');
			style.type = "text/css";
			div.appendChild(style);
			style.innerHTML=cssrule;
		var ul = document.createElement('table');
			ul.className = "fleetmod";
			div.appendChild(ul);
		var inhalt="<tr>";
		for(i=0;i<ships.length;i++){
			if((i%3)==0 && i>0)
			inhalt=inhalt+"</tr><tr>";
			inhalt=inhalt+"<td>"+ships[i]+": "+shipssend[i]+"</td>";
		}
		ul.innerHTML=inhalt+"</tr>";
	}
}
function topbar(){
//SaveKB

	if(initalCheckbox("savekbD")[1]=="checked"){
		
		var menu = document.getElementById("menuTable");
		var span = document.createElement('span');
			span.setAttribute('class', 'menu_icon');
		var img = document.createElement('img');
			img.setAttribute('src', 'img/navigation/navi_ikon_trader_a.gif');
			span.appendChild(img);
		var a =document.createElement('a');
		var span2 = document.createElement('span');
			span2.setAttribute('class', 'textlabel');
			a.appendChild(span2);
			a.setAttribute('class','menubutton');
			a.setAttribute('target','_blank')
			a.setAttribute('href','http://savekb.de');
			span2.innerHTML="SaveKB";
		var li = document.createElement('li');
		
			li.appendChild(span);
			li.appendChild(a);
			menu.appendChild(li);
			
	}
	
//Pranger
	if(initalCheckbox("prangerD")[1]=="checked"){
		var element = document.getElementById('bar').children[0];
		var pranger = document.createElement('li');
				element.appendChild(pranger);
		pranger.innerHTML="<a href='pranger.php' target='_blank'>"+ltext[58]+"</a>";
		element.insertBefore(pranger, element.children[4]);
	}

//update cheack;
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/103554.meta.js',
		onload: function(response) 
		{
			var userscript = response.responseText;
			var x = userscript.split('@version')[1].split('//')[0];
			if(x.replace(/(^\s*)|(\s*$)/g,'')>version){
				var li = document.createElement('div');
					li.className = "fleetShort";
						document.getElementById('bar').appendChild(li);
					li.innerHTML="<a href='http://userscripts.org/scripts/show/103554' style='position:relative; top:-20px;left:-15px;' target='_blank'><img src='http://ambrosia60.dnsalias.net/pro_wi/images/update.gif'></a>";
			}
		}
	});
// Ress Stats im linken Menu
	if(initalCheckbox("RessStat")[1]=="checked"){
		var Ressget= new Array("metal_box","crystal_box","deuterium_box","darkmatter_box","energy_box");
		var RessType = new Array();
		var RessType2 = new Array();
		var RessIn="";
		for(i=0;i<Ressget.length;i++){
			var node = document.getElementById(Ressget[i]);
			if (!node || !node.title){
			}else {
				RessType2.push(node.title.replace(/\|/g,""));
				RessType.push(node.title.match(/(.*?):/i)[1]);
			}
		}
		if(initalCheckbox("RessStat2")[1]=="checked"){
			var div2=document.createElement('div');
			document.getElementById("links").appendChild(div2);
				div2.setAttribute("style","position:absolute;left:-140px;top:150px;width:150px;");
				div2.innerHTML="<ul></ul>";
		}		
		for(i=0;i<RessType2.length;i++){
			if(RessType2[i].match(/<span(.*?)<\/span>/g) && i<3){
				RessIn=RessType[i]+":<br>"+RessType2[i].match(/<span(.*?)<\/span>/g)[0]+" / "+RessType2[i].match(/<span(.*?)<\/span>/g)[1]+"<br>("+RessType2[i].match(/<span(.*?)<\/span>/g)[2]+")";
				
				if((RessType2[i].match(/<span(.*?)<\/span>/g)[1].replace(/[^0-9]/g,"")-RessType2[i].match(/<span(.*?)<\/span>/g)[0].replace(/[^0-9]/g,""))>0 && RessType2[i].match(/<span(.*?)<\/span>/g)[0].replace(/[^0-9]/g,"")>0){
					var date = new Date();
					var servertime = new Date();
					date.setTime( servertime.getTime() + (RessType2[i].match(/<span(.*?)<\/span>/g)[1].replace(/[^0-9]/g,"")-RessType2[i].match(/<span(.*?)<\/span>/g)[0].replace(/[^0-9]/g,""))/RessType2[i].match(/<span(.*?)<\/span>/g)[2].replace(/[^0-9]/g,"")*3600*1000,10);
						var stunden = date.getHours(); stunden<10 ? stunden="0"+stunden :"";
						var minuten = date.getMinutes(); minuten<10 ? minuten="0"+minuten :"";
						var sekunden = date.getSeconds(); sekunden<10 ? sekunden="0"+sekunden :"";
						var tag	= date.getDate(); tag<10 ? tag="0"+tag :"";
						var monat = date.getMonth()+1; monat<10 ? monat="0"+monat :"";
					RessIn=RessIn+"<br><span style=\"color:green;\">"+tag + '/' + monat +' ' +stunden + ':' + minuten + ':' + sekunden+"</span>";
				}
			}
			if(RessType2[i].match(/<span(.*?)<\/span>/g) && i>3)
				RessIn=RessType[i]+":<br>"+RessType2[i].match(/<span(.*?)<\/span>/g)[0]+"<br>"+RessType2[i].match(/<span(.*?)<\/span>/g)[1];
			if(RessType2[i].match(/<span(.*?)<\/span>/g) && i<3 || RessType2[i].match(/<span(.*?)<\/span>/g) && i>3){
				
				var li=document.createElement('li');
				if(initalCheckbox("RessStat2")[1]=="checked"){
					div2.children[0].appendChild(li);
				}else{
					document.getElementById("menuTable").appendChild(li);
				}
					li.setAttribute("class","antires FleetModLi");
					li.setAttribute("rel",RessType[i]+"|"+RessType2[i].match(/<span(.*?)<\/span>/g)[0].replace(/[^0-9]/gi,""));
					li.innerHTML=RessIn;
			}
		}

		var style=document.createElement('style');
		document.getElementById("menuTable").appendChild(style);
		style.innerHTML=".FleetModLi {margin: 2px !important; padding: 4px !important; display: block; width: 80% !important; height: auto !important; float: left !important; background: #0D1014 !important; border: 1px solid #606060 !important; text-align: center !important; font-size: 10px !important; list-style: none outside !important; }";
	}
//Zeit anzeige für Fertigwerden von gebäuden	
	if(initalCheckbox("ReadyTimeD")[1]=="checked"){
		var ress = document.getElementById('box').innerHTML.match(/baulisteCountdown\(getElementByIdWithCache\(["']\w+["']\)\,\s*\d*/gi);
		if (ress)
			for (var i=0; i<ress.length; i++)
			{
				var res = ress[i].match(/["'](\w+)["']\)\,\s*(\d*)/i);
				ReadyTime(res[1], res[2]);
			}
		ress = document.getElementById('box').innerHTML.match(/shipCountdown\((\s*getElementByIdWithCache\(["']\w+["']\)\,)+(\s*\d*\,){3,3}/i);
		if (ress) {
			ress[2] = ress[2].match(/(\d+)/)[0];
			ReadyTime("shipAllCountdown", ress[2]);
		}
	}
	if(initalCheckbox("constructionD")[1]=="checked"){
		var element = document.getElementById('rechts').getElementsByClassName('smallplanet');
		for(i=0;i<element.length;i++){
			if(element[i].getElementsByClassName('constructionIcon')[0]){
				var construction = element[i].getElementsByClassName('constructionIcon')[0].title.replace(/\|/,"");
				var span=document.createElement('span');
				element[i].appendChild(span);
				span.setAttribute("style","position:relative; top:-13px;color: grey;font-size: 10px;");
				span.innerHTML=construction;
			}
		}
	}
}
function galaxyrankcol(rank){
	if(rank<=10)
		return galaxyRank10;
	else if(rank<=50)
		return galaxyRank50;
	else if(rank<=100)
		return galaxyRank100;
	else if(rank<=200)
		return galaxyRank200;
	else if(rank<=800)
		return galaxyRank800;
	else
		return "white";
}
function galaxyInit(e) {
	if(!e || !e.target || !e.target.id || e.target.id != "galaxytable") return;
	
	var rows=e.target.getElementsByClassName("playername");
	for(i=0;i<rows.length;i++){
		if(rows[i].getElementsByClassName("rank")[0]){
			var rank=rows[i].getElementsByClassName("rank")[0].innerHTML.split(": ")[1];
			if(rank>0){
			var span=document.createElement('span');
			rows[i].appendChild(span);
			span.setAttribute("style","color:"+galaxyrankcol(rank)+"");
			span.innerHTML="#"+rank;
			}
		}
	}
	var rows=e.target.getElementsByClassName("allytag");
	for(i=0;i<rows.length;i++){
		if(rows[i].getElementsByClassName("rank")[0]){
			var rank=rows[i].getElementsByClassName("rank")[0].innerHTML.split(": ")[1];
			if(rank>0){
			var span=document.createElement('span');
			rows[i].appendChild(span);
			span.setAttribute("style","color:white");
			span.innerHTML="#"+rank;
			}
		}
	}
	var rows=e.target.getElementsByClassName("debris");
	for(i=0;i<rows.length;i++){
		if(rows[i].getElementsByClassName("ListLinks")[0]){
			var rank=rows[i].getElementsByClassName("ListLinks")[0].getElementsByClassName("debris-content");
			var met=rank[0].innerHTML;
			var kris=rank[1].innerHTML;
			
			var ress=parseInt(met.split(": ")[1].replace(/\./g,""))+parseInt(kris.split(": ")[1].replace(/\./g,""));
			var backcol="none";

			if(ress>=tfbackD)
				backcol=tfcolD;
			var TFrow=rows[i].getElementsByClassName("tipsGalaxy")[0];
			TFrow.innerHTML="<div style='position:relative;top:0px;left:0px;background-color:"+backcol+"'>"+met.split(": ")[1]+"<br>"+kris.split(": ")[1]+"</div>";
			TFrow.style.textDecoration="none";
			TFrow.style.color="white";
			rows[i].style.overflow="visible";
		}
	}
}
function ReadyTime(id , time){
	if(id && time){
		var date = new Date();
		var servertime = new Date();
		date.setTime( servertime.getTime() + parseInt(time)*1000,10);
			var stunden = date.getHours(); stunden<10 ? stunden="0"+stunden :"";
			var minuten = date.getMinutes(); minuten<10 ? minuten="0"+minuten :"";
			var sekunden = date.getSeconds(); sekunden<10 ? sekunden="0"+sekunden :"";
			var tag	= date.getDate(); tag<10 ? tag="0"+tag :"";
			var monat = date.getMonth()+1; monat<10 ? monat="0"+monat :"";
			
		var element = document.getElementById(id).parentNode.parentNode.parentNode;
	
		var newtr = document.createElement('tr');
		newtr.className = 'data';
		newtr.appendChild(document.createElement('td'));
		newtr.appendChild(document.createElement('td'));
			
		newtr.firstChild.className = 'text_align_right';
		newtr.lastChild.innerHTML =  tag + '/' + monat +' ' +stunden + ':' + minuten + ':' + sekunden;
		newtr.lastChild.setAttribute('style',' padding-left: 12px ; color: green; ');
		element.appendChild(newtr);
	}
}
function movement(){
	if(initalCheckbox("movementD")[1]=="checked"){
			var style=document.createElement('style');
			document.getElementById('inhalt').appendChild(style);
				style.type = "text/css";
			// 22
			var css = ".detailsOpened .starStreak  {background:none;} .starStreak .route a{display:none}";
				css	= css + ".FleetModDetails2 {position:absolute ; top:0px !important}";
				css	= css + ".FleetModDetails {position:absolute ; top:0px !important; width:290px; white-space:normal; padding:0px 3px; font-size:0.9em; text-align:left; line-height:1.2em}";
				css = css + ".Transport{color: "+getVal("transportD",setColor("transportD"))+"}";
				css = css + ".Kolonisieren{color: "+getVal("kolonisierenD",setColor("kolonisierenD"))+"}";
				css = css + ".Expedition{color: "+getVal("expeditionD",setColor("expeditionD"))+"}";
				css = css + ".Abbau{color: "+getVal("tfAbbauenD",setColor("tfAbbauenD"))+"}";
				css = css + ".Angreifen{color: "+getVal("angriffD",setColor("angriffD"))+"}";
				css = css + ".Verbandsangriff{color: "+getVal("verbandD",setColor("verbandD"))+"}";
				css = css + ".Spionage{color: "+getVal("spionageD",setColor("spionageD"))+"}";
				css = css + ".Halten{color: "+getVal("haltenD",setColor("haltenD"))+"}";
				css = css + ".Stationieren{color: "+getVal("stationierenD",setColor("stationierenD"))+"}";
				css = css + ".Zerstören{color: "+getVal("defaultD",setColor("defaultD"))+"}";
			style.innerHTML = css;
			
		var element = document.getElementById('inhalt').getElementsByClassName('fleetDetails');
		for(i=0;i<element.length;i++){

			var text = element[i].getElementsByClassName('fleetinfo')[0].innerHTML;
			text = text
				.replace(/<th colspan="2">.+?<\/th>/gi, '')
				.replace(/(<.+?>\s*)+/gi,' ')
				.replace(' &nbsp; ','<br/><br/>')
				.replace(/^\s/,'')
			;
			var Insert = element[i].getElementsByClassName('starStreak')[0].getElementsByClassName('route')[0];
				Insert.className = "FleetModDetails2 "+Insert.className;
			var typ = element[i].getElementsByClassName('mission')[0].innerHTML;
			
			var div=document.createElement('div');
					Insert.appendChild(div);
				div.innerHTML = text;
				div.className = "FleetModDetails "+typ;
				
			var hohe = div.offsetHeight;
			if(element[i].getElementsByClassName('starStreak')[0].offsetHeight<hohe){
				element[i].getElementsByClassName('starStreak')[0].style.height = hohe+"px ";
				element[i].style.height= hohe+22+"px";
			}
			
			if(element[i].getElementsByClassName('nextMission')[0]){
				var div=document.createElement('div');
					element[i].appendChild(div);
				div.setAttribute("style","position:absolute;top:45px;left:555px;");
				div.className = "FleetModRev";
			}
			if(element[i].getElementsByClassName('destinationCoords')[0]){
				var div=document.createElement('div');
					element[i].appendChild(div);
				div.setAttribute("style","position:absolute;top:45px;left:7px;color:green");
				div.className = "FleetModTar";
				div.innerHTML = element[i].getElementsByClassName('destinationCoords')[0].title.replace(/\|/gi,"");
			}
		}
		movementRecall();
		//  <span class="reversal tipsTitleSmall" title="Rückruf:|24.06.2011&lt;br&gt;07:56:29">
	}
}
function movementRecall(){
	var element = document.getElementById('inhalt').getElementsByClassName('fleetDetails');
	var reT = document.getElementById('OGameClock').innerHTML.match(/(.+)<span>(.+)<\/span>/i);
	var reTDate = reT[1].split(".");
	var reTTime = reT[2].split(":");
	var date2 = new Date(reTDate[2], reTDate[1], reTDate[0], reTTime[0], reTTime[1], reTTime[2]);

	for(i=0;i<element.length;i++){
		if(element[i].getElementsByClassName('reversal')[0]){
			var retime = element[i].getElementsByClassName('nextTimer')[0].title.match(/\|(.+) (.+)/i);
			var retimeDate = retime[1].split(".");
			var retimeTime = retime[2].split(":");
			var Time = new Date(retimeDate[2], retimeDate[1], retimeDate[0], retimeTime[0], retimeTime[1], retimeTime[2]);
			
			var Timer = element[i].getElementsByClassName('timer')[0].title.match(/\|(.+) (.+)/i);
			var TimerDate = Timer[1].split(".");
			var TimerTime = Timer[2].split(":");
			var Time2 = new Date(TimerDate[2], TimerDate[1], TimerDate[0], TimerTime[0], TimerTime[1], TimerTime[2]);
			
			var date = new Date();
			date.setTime(Time.getTime()-2*(Time2.getTime()-date2.getTime()));
				var stunden = date.getHours(); stunden<10 ? stunden="0"+stunden :"";
				var minuten = date.getMinutes(); minuten<10 ? minuten="0"+minuten :"";
				var sekunden = date.getSeconds(); sekunden<10 ? sekunden="0"+sekunden :"";
				var tag	= date.getDate(); tag<10 ? tag="0"+tag :"";
				var monat = date.getMonth(); monat<10 ? monat="0"+monat :"";
			element[i].getElementsByClassName('FleetModRev')[0].innerHTML=tag+"/"+monat+" "+stunden+":"+minuten+":"+sekunden;
		}
	}
	setTimeout(movementRecall,1000);
}
function messageChe(){
	if(SpioAnal=="true"){
		if(document.getElementById('messagebox').getElementsByClassName('material')){
			var spy = document.getElementById('messagebox').getElementsByClassName('material');
			for(i=0;i<spy.length;i++){
				var ress = spy[i].getElementsByClassName('fragment')[0].innerHTML.match(/<td>(.*?)<\/td>/g);
				var resssum = 0;
				for(j=0;j<(ress.length-1);j++){
					resssum = resssum + parseInt(ress[j].replace(/[^0-9]/g,""));
				}
				var elementid = spy[i].parentNode.parentNode.parentNode.id.split("_")[1];
				
				var inTab = "<tr><td colspan=\"4\" class=\"area FleetModMessHead\">"+ltext[68]+"</td></tr>";
					inTab = inTab + "<tr><td>"+ltext[69]+"</td><td class=\"FleetModRessGet\" rel='FL_"+elementid+"|"+(resssum/2)+"'>"+format(resssum)+"</td><td>"+ltext[70]+"</td><td>"+format(resssum/2)+"</td></tr>";
					inTab = inTab + "<tr><td>"+ltext[71]+"</td><td>"+format(Math.ceil(resssum/50000+1))+"</td><td>"+ltext[72]+"</td><td>"+format(Math.ceil(resssum/10000+5))+"</td></tr>";
				var table = document.createElement('table');
					table.className = "FleetModMess";
					spy[i].parentNode.appendChild(table);
					table.innerHTML = inTab;
			}
			var style = document.createElement('style');
				style.type = "text/css";
			document.getElementById('messagebox').appendChild(style);
				style.innerHTML = ".FleetModMess td{border: 1px dashed orange !important; padding:5px !important;} .FleetModMessHead{ text-align:center !important;}";
		}
	}
}
function message(e){
	if(!e || !e.target || e.target.tagName != 'FORM' || e.target.name != 'delMsg' ) return;
	if(MessInBu=="true"){
		var buttonMes = new Array(ltext[76],ltext[77],ltext[80],ltext[78]);
		var value = new Array("V","X","Xx","XX");
		
		var style = document.createElement('style');
			style.type = "text/css";
		document.getElementsByName('delMsg')[0].appendChild(style);
		var cssIn ='.FleetModeInput input { background:transparent url(./img/layout/formular_buttons.gif) no-repeat scroll -88px -54px; border:0 none;' 
			cssIn = cssIn +	'color:#0D1023; cursor:pointer; font-size:11px; font-weight:700; text-align:center; height: 28px; width: 42px; }'
			cssIn = cssIn +	 '.FleetModeInput input:hover { background:transparent url(./img/layout/formular_buttons.gif) no-repeat scroll -88px -80px;}'
			cssIn = cssIn +	 '.FleetModeInput input[value="XX"]{color:#A10205} .FleetModeInput input[value="Xx"]{color:#CF4244} .FleetModeInput input[value="X"]{color:#700709} .FleetModeInput input[value="V"]{color:#00FA15}';
			style.innerHTML=cssIn;
		var span = document.createElement('span');
			span.className="FleetModeInput";
		document.getElementsByName('delMsg')[0].appendChild(span);
	
		for(i=0;i<value.length;i++){
			var buttonM = document.createElement('input');
				buttonM.type = 'button';
			span.appendChild(buttonM);
				buttonM.value = value[i];
				buttonM.title = buttonMes[i];
				if(value[i]=="V")
					buttonM.addEventListener('click', function(){ messageButton("12"); },false );
				if(value[i]=="X")
					buttonM.addEventListener('click', function(){ messageButton("7"); },false );
				if(value[i]=="XX")
					buttonM.addEventListener('click', function(){ messageButton("9"); },false );
				if(value[i]=="Xx")
					buttonM.addEventListener('click', function(){ messageButton("-7"); },false );
		}
		var span = document.createElement('span');
			span.className="FleetModeInput";
		document.getElementsByName('delMsg')[0].insertBefore(span, document.getElementsByName('delMsg')[0].firstChild);
		
		for(i=0;i<value.length;i++){
			var buttonM = document.createElement('input');
				buttonM.type = 'button';
			span.appendChild(buttonM);
				buttonM.value = value[i];
				buttonM.title = buttonMes[i];
				if(value[i]=="V")
					buttonM.addEventListener('click', function(){ messageButton("12"); },false );
				if(value[i]=="X")
					buttonM.addEventListener('click', function(){ messageButton("7"); },false );
				if(value[i]=="XX")
					buttonM.addEventListener('click', function(){ messageButton("9"); },false );
				if(value[i]=="Xx")
					buttonM.addEventListener('click', function(){ messageButton("-7"); },false );	
		} 
	}
	if(SpioAnal=="true"){
		if(document.getElementById('inhalt').getElementsByClassName('material')){
			var spy = document.getElementById('inhalt').getElementsByClassName('material');
			for(i=0;i<spy.length;i++){
				var ress = spy[i].getElementsByClassName('fragment')[0].innerHTML.match(/<td>(.*?)<\/td>/g);
				var resssum = 0;
				for(j=0;j<(ress.length-1);j++){
					resssum = resssum + parseInt(ress[j].replace(/[^0-9]/g,""));
				}
				var elementid = spy[i].parentNode.parentNode.parentNode.id.split("_")[1];
				
				var inTab = "<tr><td colspan=\"4\" class=\"area FleetModMessHead\">"+ltext[68]+"</td></tr>";
					inTab = inTab + "<tr><td>"+ltext[69]+"</td><td class=\"FleetModRessGet\" rel='FL_"+elementid+"|"+(resssum/2)+"'>"+format(resssum)+"</td><td>"+ltext[70]+"</td><td>"+format(resssum/2)+"</td></tr>";
					inTab = inTab + "<tr><td>"+ltext[71]+"</td><td>"+format(Math.ceil(resssum/50000+1))+"</td><td>"+ltext[72]+"</td><td>"+format(Math.ceil(resssum/10000+5))+"</td></tr>";
				var table = document.createElement('table');
					table.className = "FleetModMess";
					spy[i].parentNode.appendChild(table);
					table.innerHTML = inTab;
			}
			var style = document.createElement('style');
				style.type = "text/css";
			document.getElementById('inhalt').appendChild(style);
				style.innerHTML = ".FleetModMess td{border: 1px dashed orange !important; padding:5px !important;} .FleetModMessHead{ text-align:center !important;}";
		}
	}
}
function messageButton(mod){
	var id = new Array();
	if(mod=="9"){
		var element = document.getElementById('inhalt').getElementsByClassName('entry');
		for(i=0;i<element.length;i++){
			id.push(element[i].id.replace(/[^0-9]/gi,""));
		}
	}
	if(mod=="7"){
		var element = document.getElementById('inhalt').getElementsByClassName('entry');
		for(i=0;i<element.length;i++){
			if(element[i].getElementsByClassName('checker')[0].checked==true)
				id.push(element[i].id.replace(/[^0-9]/gi,""));
		}
	}
	if(mod=="12"){
		var element = document.getElementById('inhalt').getElementsByClassName('entry');
		for(i=0;i<element.length;i++){
			id.push(element[i].id.replace(/[^0-9]/gi,""));
		}
	}
	if(mod=="-7"){
		var element = document.getElementById('inhalt').getElementsByClassName('FleetModRessGet');
		for(i=0;i<element.length;i++){
			if(element[i].getAttribute("rel").split("|")[1]<parseInt(MessRessBu)){
				id.push(element[i].getAttribute("rel").split("|")[0].split("_")[1]);
			}
		}
		mod="7";
	}
	unsafeWindow.executeAction(id,mod);
}
function Baumaterial(e){
	if(!e || !e.target || !e.target.id || e.target.id != "content") return;
	var element = document.getElementById("content").getElementsByClassName("metal");
	var ressNeed = "";
	var ressSumme = 0;
	for(i=0;i<element.length;i++){
		var resscost = element[i].title.replace(/[^0-9]/g,"");
		var resshave = document.getElementById("links").getElementsByClassName("FleetModLi");
		var ressName = element[i].title.replace(/[0-9|. ]/gi,"");

		for(j=0;j<resshave.length;j++){
			if(resshave[j].getAttribute("rel").match(/(.*?)\|/i)[1]==ressName){
				var ressSub = 0;
				if(resscost-resshave[j].getAttribute("rel").replace(/[^0-9]/g,"")>0)
					ressSub = resscost-resshave[j].getAttribute("rel").replace(/[^0-9]/g,"");
				ressNeed = ressNeed+ressName+":<br>"+format(ressSub)+"<br>";
					ressSumme= ressSumme+ressSub;
			}
		}
	}
	if(ressSumme>0 && BaumatShow == "true"){
		ressNeed = ressNeed+"<br>"+ltext[45]+":<br>"+format(Math.ceil(ressSumme/5000))+"<br>"+ltext[46]+":<br>"+format(Math.ceil(ressSumme/25000));
		var div = document.createElement('div');
		document.getElementById('content').appendChild(div);
			div.className="FleetModRessList ";
			div.setAttribute("style","position:absolute;top:0;left:0;");
			div.innerHTML=ressNeed;
		var style = document.createElement('style');
			style.type = "text/css";
		document.getElementById('content').appendChild(style);
			style.innerHTML = ".FleetModRessList{background-color:rgba(105, 105, 105, 0.8);padding:5px;border:1px dashed orange}";
	}
}

function initalisierung(){

	lang();
	topbar();
	FleetModi();
	
	var url=document.location.href.split("?")[1].split("&")[0].split("=")[1];
	if(url=="fleet1")
		fleet1();
	if(url=="fleet2")
		fleet2();
	if(url=="fleet3")
		fleet3();
	if(url=="movement")
		movement();
	if(url=="preferences" && !document.location.href.split("?")[1].split("&")[2]){
		OptionsMenu();
	}
	if(url=="messages" || url=="showmessage")
		document.addEventListener("DOMNodeInserted", message, false);
	if(url=="showmessage")
		messageChe();
	if(url=="preferences"){
		if(document.location.href.split("?")[1].split("&")[2]){
			if(document.location.href.split("?")[1].split("&")[2].split("=")[1]=="reset")
				OptionsReset();
			if(document.location.href.split("?")[1].split("&")[2].split("=")[1]=="save");	
				OptionsSave();
		}
	}
	if(url=="galaxy")
		if(initalCheckbox("galaxyD")[1]=="checked"){
			document.addEventListener("DOMNodeInserted", galaxyInit, false);
		}
			
	if(url=="resources" || url=="station" || url=="research" || url=="shipyard" || url=="defense"){
		document.addEventListener("DOMNodeInserted", Baumaterial, false);
	}
	
}
initalisierung();
