// ==UserScript==
// @name           DS_Reminder
// @version 	   0.9c BETA
// @namespace      Die Stämme
// @description    Erlaubt das setzten von Erinerungsmarkern
// @include        http://*.die-staemme.de/*
// @exclude		   http://*.die-staemme.de/groups.php*
// @author 	   Lukas R. (LudwigXXXXXV)
// ==/UserScript==

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

/*
Durchsucht einen Array oder einen Array -Index oder assoziierten Begrif als zweiten 
Parameter übergeben- in einem Array auf einen übergebenen String und gibt einen neuen 
gefilterten Array zurück. Made by Lukas R.
*/
Array.prototype.filter_arr = function (str,i) {	try {
													var rearr = new Array();
													for (var a=0; a<this.length;a++) {
														if (this[a][i].match(str))
															rearr.push(this[a])
														}
													return rearr;
													} catch(e) {
													try {
														var rearr = new Array();
														for (var a=0; a<this.length;a++) {
															if (this[a].match(str))
																rearr.push(this[a])
															}
														return rearr;
														} catch(e) {
														return null;
														}
													}};
/*
Gespeicherte Daten laden
*/
var VERSION = "0.9d";

var GM = new Storage("DSReminder", true);

var welt = document.URL.split(".")[0].split("//")[1];

var contentholder = null;

var mansetholder = null;

	//Standart
var pos = new Object;
	pos["x"]="0px";
	pos["y"]="0px";
	pos["o"]=false;
var sound = new Object();
	//Standart
	sound["on"] = true;
	sound["loop"] = false;
var fresh;
	//Standart
	fresh = false;
var setting = new Object();
	//Standart
	setting["welt"] = false;
	setting["overwork"] = false;

var data = new Array();

var akutData;

var get = getValues();

/*
Weitere Grundvariablen
*/

//Monate
var m_arr	=	["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
var m = {	Jan	:	"january",
			Feb	:	"february",
			Mär	:	"march",
			Apr	:	"april",
			Mai	:	"may",
			Jun	:	"june",
			Jul	:	"july",
			Aug	:	"august",
			Sep	:	"september",
			Okt	:	"october",
			Nov	:	"november",
			Dez	:	"december"	};

//Slider

var aktiv = new Array();

var timerlen = 7;
var slideAniLen = 700;

var timerID = new Array();
var startTime = new Array();
var obj = new Array();
var endHeight = new Array();
var moving = new Array();
var dir = new Array();

//Drag
var dragobjekt = null;

var dragx = 0;
var dragy = 0;

var posx = 0;
var posy = 0;

//Styles 288
var styles = {	holder	: "z-index:200;position:absolute; left:"+pos['x']+"; top:"+pos['y']+"; width:"+((pos['o']==true) ? "330px" : "220px")+";",
				opener	: "font-size:9pt; font-weight:bold; color:#804000; text-align:center; width:"+((pos['o']==true) ? "310px" : "200px")+"; height:14px; background-color:#F7EED3; border:2px solid; border-color:#997733 #FFDD99 #FFEECC #BB9955;",
				content	: "background-image:url('http://de8.die-staemme.de/graphic/background/content.jpg'); display:"+((pos['o']==true) ? "block" : "none")+"; width:312px; height:500px; border:1px solid #804000; overflow-y:scroll;",
				head	: "font-size:9pt; font-weight:normal; color:#804000; text-align:left; width:293px; background-color:#DFCCA6; border:1px solid #F6EBCA;",
				detail	: "font-size:9pt; font-weight:normal; color:#804000; text-align:left; overflow:hidden; display:none; width:293px; height:42px; background-color:#FBF4DD;",
				mansetholder	: "z-index:201; position: absolute; height: 235px; width: 250px; left: "+(window.innerWidth/2-125)+"px; top: "+(innerHeight/2-110)+"px; font-size: 9pt; font-weight: normal; color: rgb(128, 64, 0); text-align: left; background-color: rgb(247, 238, 211); border-width: 2px; border-style: solid; border-color: rgb(153, 119, 51) rgb(255, 221, 153) rgb(255, 238, 204) rgb(187, 153, 85);",
				input	: "color:#804000; background-color:#F7EED3; border:1px solid; border-color:#804000;",
				contextmenu	: "z-index:202; position: absolute; left:"+(parseInt(pos['x'])+30)+"px; top:"+(parseInt(pos['y'])+5)+"px; height: 30px; width: 100px; font-size:9pt; font-weight:bold; color:#804000; text-align:center; background-color:#F7EED3; border:2px solid; border-color:#997733 #FFDD99 #FFEECC #BB9955;"};
		
//Zeitstufen + dazugehörige Pics				
var zeitStufen = [	[0,"http://de8.die-staemme.de/graphic/dots/grey.png","<0min"],
					[300000,"http://de8.die-staemme.de/graphic/dots/red.png","<5min"],
					[1800000,"http://de8.die-staemme.de/graphic/dots/green.png","<30min"],
					[3600000,"http://de8.die-staemme.de/graphic/dots/blue.png","<1h"],
					[86400000,"http://de8.die-staemme.de/graphic/dots/yellow.png","<24h"]	];

//Typen + dazugehörige Pics
var typarr = ["support", "attack", "deffback", "attback", "gebaude", "ressis", "schmied", "markt", "troupsmade", "infmade", "kavmade", "artmade", "agmade"];				
var types = {	support		:["http://de8.die-staemme.de/graphic/command/support.png","Unterstützung",0],
				attack		:["http://de8.die-staemme.de/graphic/command/attack.png","Angriff",1],
				deffback	:["http://de8.die-staemme.de/graphic/command/other_back.png","Rückkehr(Unterstützung)",2],
				attback		:["http://de8.die-staemme.de/graphic/command/cancel.png","Rückkehr(Angriff)",3],
				gebaude		:["http://de8.die-staemme.de/graphic/buildings/main.png","Gebäude fertiggestellt",4],
				ressis		:["http://de8.die-staemme.de/graphic/buildings/storage.png","Rohstoffe vorhanden",5],
				schmied		:["http://de8.die-staemme.de/graphic/buildings/smith.png","Erforschung abgeschlossen",6],
				markt		:["http://de8.die-staemme.de/graphic/buildings/market.png","Händler wieder verfügbar",7],
				troupsmade	:["http://de8.die-staemme.de/graphic/buildings/barracks.png","Truppen fertiggestellt",8],
				infmade		:["http://de8.die-staemme.de/graphic/unit/unit_sword.png","Infanterie fertiggestellt",9],
				kavmade		:["http://de8.die-staemme.de/graphic/buildings/stable.png","Kavallerie fertiggestellt",10],
				artmade		:["http://de8.die-staemme.de/graphic/buildings/garage.png","Artillerie fertiggestellt",11],
				agmade		:["http://de8.die-staemme.de/graphic/unit/unit_snob.png","Adelsgeschlecht fertiggestellt",12]	};

/*
Funktionen
*/


//Main
function main(a) {

	//Refresh?
	if(a!=undefined) { 
	data = new Array();
	get = getValues();
	} else {
 		//Erstellen der Holderobjekte
		contentholder = makeholder();
		//Neuer Eintrag starten mit Tastenkombination
		document.addEventListener("keydown",tastatur,false);
	}
	
	//Reset
	contentholder.innerHTML = "";
	
	if (get==-1 || get!=data.length) {
		contentholder.align = "center";
		contentholder.appendChild(document.createTextNode("Schwerwiegender Fehler beim Laden der Daten!"));
		return;
	}	
		
	if (get==0) {
	//Keine Ereignisse gespeichert
		contentholder.align = "center";
		contentholder.appendChild(document.createTextNode("Keine Ereignisse gespeichert!"));
		return;
	}
	
	//Schreiben der Einträge
	writeData();
	
	//Alarm scharfmachen
	tmp = new Date();
	window.clearTimeout(aktiv["ALARM"]);
	aktiv["ALARM"] = window.setTimeout(alarm_start,data[0].time-tmp.getTime(),0);
	
/*	//Filtern für aktuellen Link
	akutData = data.filter_arr(document.URL,"link");
	
	if (akutData != "" || akutData.length != 0) {
	//Ereignisse für diese Adresse
		writeAkut();
	}*/
	
	if (fresh==true && a==undefined) {
		aktiv["main"] = window.setInterval(main,30000,1); // Aktuallisierung
	}
}

/*
Hilfsfunktionen
*/

function makeholder() {
	/*
	holder
		opener
		content
			#head
				#detail
	*/
	var tmp;
	
	//Holder
	var holder = document.createElement("div");
	holder.id = "DSRMholder";
	holder.setAttribute("style", styles['holder']);
	//Move
	tmp = document.createElement("div");
	tmp.setAttribute("style","background-image:url('http://pafnetmod.cwsurf.de/DS/pics/move.gif'); cursor:move; margin-top:1px; float:right; width:13px; height:13px;");
	tmp.addEventListener("mousedown",function(){dragstart(this.parentNode);},false);
	holder.appendChild(tmp);
	
	//Opener
	var opener = document.createElement("div");
	opener.setAttribute("style", styles['opener']);
	opener.addEventListener("mouseover", function(){aktiv[this.id] = window.setTimeout(slidedown, 750, "DSRMcontent");}, false);
	opener.addEventListener("mouseout", function(){window.clearTimeout(aktiv[this.id]); slideup("DSRMcontent");}, false);
	tmp = document.createElement("img");
	tmp.name = "DSRMblink";
	tmp.src = "http://pafnetmod.cwsurf.de/DS/pics/blink.gif";
	tmp.alt = "READY";
	tmp.setAttribute("style","display:none; float:left; height:14px; cursor:pointer;");
	tmp.addEventListener("click",function(){window.clearTimeout(aktiv["ALARM"]); alarm_stop();},false);
	opener.appendChild(tmp);
	opener.appendChild(document.createTextNode("DS - Reminder"));
	tmp = document.createElement("img");
	tmp.name = "DSRMblink";
	tmp.src = "http://pafnetmod.cwsurf.de/DS/pics/blink.gif";
	tmp.alt = "READY";
	tmp.setAttribute("style","display:none; float:right; height:14px; cursor:pointer;");
	tmp.addEventListener("click",function(){window.clearTimeout(aktiv["ALARM"]); alarm_stop();},false);
	opener.appendChild(tmp);
	
	holder.appendChild(opener);
	
	//Holder für Sound und Refresh
	tmp3 = document.createElement("div");
	tmp3.setAttribute("style","float:right");
	holder.appendChild(tmp3);
	//Sound
	tmp = document.createElement("div");
	tmp.id = "DSRMsound";
	tmp.title = "Sound: An/Aus/Loop";
	tmp.setAttribute("style","background-image:url('http://pafnetmod.cwsurf.de/DS/pics/sound.png'); cursor:pointer; margin-top:1px; width:13px; height:13px;");
	tmp.addEventListener("click",tog_sound,false);
	tmp3.appendChild(tmp);
	var tmp2 = document.createElement("img");
	if (sound["loop"]==true)
		tmp2.src = "http://pafnetmod.cwsurf.de/DS/pics/loop.png"
	else {
		tmp2.src = "http://pafnetmod.cwsurf.de/DS/pics/no.png";
		if (sound["on"]==true)
			tmp2.setAttribute("style","display:none;");
	}
	tmp.appendChild(tmp2);
	//Refresh
	tmp = document.createElement("div");
	tmp.id = "DSRMfresh";
	tmp.title = "Refresh: An/Aus";
	tmp.setAttribute("style","background-image:url('http://pafnetmod.cwsurf.de/DS/pics/refresh.png'); cursor:pointer; margin-top:5px; width:13px; height:13px;");
	tmp.addEventListener("click",tog_fresh,false);
	tmp3.appendChild(tmp);
	var tmp2 = document.createElement("img");
	tmp2.src = "http://pafnetmod.cwsurf.de/DS/pics/no.png";
	if (fresh==true)
		tmp2.setAttribute("style","display:none;");
	tmp.appendChild(tmp2);
	//Optionen
	var optionlist = document.createElement("div");
	optionlist.id = "DSRMOpt";
	optionlist.setAttribute("style", styles['opener']);
	optionlist.style.display = (pos['o']==true) ? "block" : "none";
	tmp = document.createElement("div");
	tmp.setAttribute("style","float: left; font-weight: normal; width:140px; height:14px;");
	tmp.title = "Ereignisse anderer Welten mit anzeigen [!Nur Firefox!]";
	tmp2 = document.createElement("label");
	tmp2.setAttribute("style","cursor:pointer;");
	tmp2.setAttribute("for","DSRMcheck1");
	tmp2.appendChild(document.createTextNode("Für alle Welten: "));
	tmp.appendChild(tmp2);
	tmp2 = document.createElement("input");
	tmp2.id = "DSRMcheck1";
	tmp2.setAttribute("style","cursor:pointer; margin: 0.5px;");
	tmp2.type = "checkbox";
	tmp2.checked = setting["welt"];
	tmp2.addEventListener("click", function(){if(setting["welt"]==true) {
													setting["welt"]=false;
												} else {
													setting["welt"]=true;
												}
												GM.setValue("set", setting);
												main(1);},false);
	tmp.appendChild(tmp2);
	optionlist.appendChild(tmp);
	
	tmp = document.createElement("div");
	tmp.setAttribute("style","float: left; width:30px; text-align:center; height:14px; border-color: black; border-left: 2px; border-right: 2px;");
	tmp2 = document.createElement("img");
	tmp2.setAttribute("style","cursor:pointer; margin: 0.5px;");
	tmp2.src = "http://pafnetmod.cwsurf.de/DS/pics/plus.png";
	tmp2.title = "Neuer Eintrag(STRG+LEERTASTE) || Doppelklick: Import/Export";
	tmp2.addEventListener("click",function(){mshfunc("open");},false);
	//Weitere Einstellungen
	tmp2.addEventListener("dblclick",function(e){mshfunc("close"); weitereOpt(e);},false);
	tmp.appendChild(tmp2);
	optionlist.appendChild(tmp);
	
	tmp = document.createElement("div");
	tmp.setAttribute("style","float: right; font-weight: normal; width:140px; height:14px;");
	tmp.title = "In dieser Version noch nicht verfügbar";
	tmp2 = document.createElement("label");
	tmp2.setAttribute("style","cursor:pointer;");
	tmp2.setAttribute("for","DSRMcheck2");
	tmp2.appendChild(document.createTextNode("Nachbearbeiten: "));
	tmp.appendChild(tmp2);
	tmp2 = document.createElement("input");
	tmp2.id = "DSRMcheck2";
	tmp2.setAttribute("style","cursor:pointer; margin: 0.5px;");
	tmp2.type = "checkbox";
	tmp2.checked = setting["overwork"];
	tmp2.addEventListener("click", function(){if(setting["overwork"]==true) {
													setting["overwork"]=false; 
												} else {
													setting["overwork"]=true;
												}
												GM.setValue("set", setting);
												main(1);},false);
	tmp.appendChild(tmp2);
	optionlist.appendChild(tmp);
	
	//Content
	var content = document.createElement("div");
	content.id = "DSRMcontent";
	content.setAttribute("style", styles['content']);
	
	//Werbung
	var werbung = document.createElement("div");
	werbung.setAttribute("style", styles['opener']);
	tmp = document.createElement("a");
	tmp.href = "#";
	tmp.addEventListener("dblclick",function(){window.open(src="http://forum.die-staemme.de/member.php?u=34402",target="_blank");},false)
	tmp.title = "Doppelklick: Skript im DSForum";
	tmp.appendChild(document.createTextNode("by LudwigXXXXXV"))
	werbung.appendChild(tmp);
	
	//Zusammensetzten
	holder.appendChild(content);
	holder.appendChild(optionlist);
	holder.appendChild(werbung);
	
	//Einbinden
	document.getElementById("ds_body").appendChild(holder);
	
	//Drag
	document.getElementById("ds_body").addEventListener("mouseup",dragstop,false);
	document.getElementById("ds_body").addEventListener("mousemove",drag,false);
	
	return content;
}

// Manueller Eintrag - Holder
function makemansetholder() {
	if (mansetholder==null) {
		var tmp;
		mansetholder = document.createElement("div");
		mansetholder.setAttribute("style",styles["mansetholder"]);
		var head = document.createElement("div");
		tmp = document.createElement("input");
		tmp.setAttribute("style","font-weight:bold; margin-top:4px; margin-left:3px; font-size:10pt;"+styles["input"]);
		tmp.value = "Neuer Eintrag";
		tmp.size = 25;
		tmp.addEventListener("click",function(){this.value="";},false);
		head.appendChild(tmp);
		tmp = document.createElement("div");
		tmp.setAttribute("style","background-image:url('http://pafnetmod.cwsurf.de/DS/pics/move.gif');cursor:move; margin-top:8px; margin-right: 1px; float:right; width:13px; height:13px;");
		tmp.addEventListener("mousedown",function(){dragstart(this.parentNode);},false);
		mansetholder.appendChild(tmp);
		tmp = document.createElement("div");
		tmp.setAttribute("style","background-image:url('http://pafnetmod.cwsurf.de/DS/pics/abbr.gif');cursor:pointer; margin:8px 5px 3px 1px; float:right; width:13px; height:13px;");
		tmp.title = "Abbrechen";
		tmp.addEventListener("click",function(){if (confirm("Wirklich abbrechen und Eingaben verwerfen?")) {mshfunc("close");}},false);
		mansetholder.appendChild(tmp);
		mansetholder.appendChild(head);
		mansetholder.appendChild(document.createElement("hr"));
		mansetholder.appendChild(document.createTextNode("Uhrzeit: "));
		tmp = document.createElement("input");
		tmp.setAttribute("style","display:none");
		mansetholder.appendChild(tmp);
		var sel = document.createElement("select");
		sel.title = "Stunde";
		sel.setAttribute("style",styles["input"]);
		sel.addEventListener("change",function() {mansetholder.getElementsByTagName("input")[1].value = time("ms",this.parentNode);},false);
		for (var i = 0; i<24; i++) {
			tmp = document.createElement("option");
			tmp.value = (String(i).length != 2) ? "0"+String(i):String(i);
			tmp.appendChild(document.createTextNode(tmp.value));
			sel.appendChild(tmp);
		}
		mansetholder.appendChild(sel);
		for (var j = 0; j<2; j++) {
			var sel = document.createElement("select");
			sel.title = (j==0) ? "Minute" : "Sekunde";
			sel.setAttribute("style",styles["input"]);
			sel.addEventListener("change",function() {mansetholder.getElementsByTagName("input")[1].value = time("ms",this.parentNode);},false);
			for (var i = 0; i<60; i++) {
				tmp = document.createElement("option");
				tmp.value = (String(i).length != 2) ? "0"+String(i):String(i);
				tmp.appendChild(document.createTextNode(tmp.value));
				sel.appendChild(tmp);
			}
			mansetholder.appendChild(sel);
		}
		mansetholder.appendChild(document.createElement("br"));
		mansetholder.appendChild(document.createTextNode("Datum: "));
		var sel = document.createElement("select");
		sel.title = "Tag";
		sel.setAttribute("style",styles["input"]);
		sel.addEventListener("change",function() {mansetholder.getElementsByTagName("input")[1].value = time("ms",this.parentNode);},false);
		for (var i = 1; i<32; i++) {
			tmp = document.createElement("option");
			tmp.value = (String(i).length != 2) ? "0"+String(i):String(i);
			tmp.appendChild(document.createTextNode(tmp.value));
			sel.appendChild(tmp);
		}
		mansetholder.appendChild(sel);
		var sel = document.createElement("select");
		sel.title = "Monat";
		sel.setAttribute("style",styles["input"]);
		sel.addEventListener("change",function() {mansetholder.getElementsByTagName("input")[1].value = time("ms",this.parentNode);},false);
		for (var i = 0; i<12; i++) {
			tmp = document.createElement("option");
			tmp.value = m[m_arr[i]];
			tmp.appendChild(document.createTextNode(m_arr[i]));
			sel.appendChild(tmp);
		}
		mansetholder.appendChild(sel);
		var sel = document.createElement("select");
		sel.title = "Jahr";
		sel.setAttribute("style",styles["input"]);
		sel.addEventListener("change",function() {mansetholder.getElementsByTagName("input")[1].value = time("ms",this.parentNode);},false);
		for (var i = 2010; i<2015; i++) {
			tmp = document.createElement("option");
			tmp.value = String(i);
			tmp.appendChild(document.createTextNode(tmp.value));
			sel.appendChild(tmp);
		}
		mansetholder.appendChild(sel);
		mansetholder.appendChild(document.createElement("br"));
		mansetholder.appendChild(document.createTextNode("Link: "));
		tmp = document.createElement("input");
		tmp.value = document.URL;
		tmp.size = 38;
		tmp.setAttribute("style","height:15px; width:211px;"+styles["input"]);
		mansetholder.appendChild(tmp);
		mansetholder.appendChild(document.createElement("br"));
		mansetholder.appendChild(document.createTextNode("Type: "));
		tmp = document.createElement("img");
		tmp.src = types[typarr[0]][0];
		tmp.title = types[typarr[0]][1];
		tmp.setAttribute("style","height:14px;");
		mansetholder.appendChild(tmp);
		var sel = document.createElement("select");
		sel.setAttribute("style","width:194px;"+styles["input"]);
		var tmp2;
		for (var i=0; i<typarr.length; i++) {
			tmp = document.createElement("option");
			tmp2 = document.createElement("img");
			tmp2.src = types[typarr[i]][0];
			tmp2.setAttribute("style","height:14px;");
			tmp.appendChild(tmp2);
			tmp.value = typarr[i];
			tmp.appendChild(document.createTextNode(types[typarr[i]][1]));
			sel.appendChild(tmp);
		}
		sel.addEventListener("change",function(){this.parentNode.getElementsByTagName("img")[0].src = types[this.value][0]; this.parentNode.getElementsByTagName("img")[0].title = types[this.value][1];},false);
		mansetholder.appendChild(sel);
		mansetholder.appendChild(document.createElement("br"));
		mansetholder.appendChild(document.createTextNode("Beschreibung:"));
		mansetholder.appendChild(document.createElement("br"));
		tmp = document.createElement("textarea");
		tmp.cols = 28;
		tmp.rows = 3;
		tmp.setAttribute("style","margin-left:3px;"+styles["input"]);
		mansetholder.appendChild(tmp);
		mansetholder.appendChild(document.createElement("br"));
		mansetholder.appendChild(document.createElement("hr"));
		var foot = document.createElement("div");
		foot.setAttribute("style","text-align:center;");
		tmp = document.createElement("input");
		tmp.setAttribute("style","display:none;");
		foot.appendChild(tmp);
		tmp = document.createElement("input");
		tmp.type = "button";
		tmp.value = "SAVE";
		tmp.setAttribute("style",styles["input"]+"font-weight:bold; text-align:center; cursor:pointer;");
		tmp.addEventListener("click",function(){mshfunc("check");},false);
		foot.appendChild(tmp);
		mansetholder.appendChild(foot);
		
		document.getElementById("ds_body").appendChild(mansetholder);
	} else {
		mansetholder.style.display = "block";
	}
	mshfunc("clean"); //Datum setzten
	mansetholder.getElementsByTagName("input")[1].value = time("ms",mansetholder);
}
// Daten schreiben
function writeData() {
	data.sort(function (a,b) {return a.time - b.time;});
	for (var i=0; i<data.length; i++) {
		var tmp;

		var head = document.createElement("div");
		head.id = "DSRM_head_"+data[i].prefix+"_#"+i;
		head.setAttribute("style",styles["head"]);
		head.addEventListener("mouseover", function(){
														aktiv[this.id.split("head_")[1]] = window.setTimeout(slidedown, 500, "DSRM_detail_"+this.id.split("head_")[1].split("_#")[0]);
													}, false);
		head.addEventListener("mouseout", function(){
														window.clearTimeout(aktiv[this.id.split("head_")[1]]);
														slideup("DSRM_detail_"+this.id.split("head_")[1].split("_#")[0]);
													}, false);

		head.appendChild(time("img",data[i].time));
		
		tmp = document.createElement("img");
		tmp.src = types[data[i].type][0];
		tmp.title = types[data[i].type][1];
		tmp.alt = types[data[i].type][1].split(" ")[0];
		tmp.setAttribute("style","margin-left:5px; margin-right:5px; cursor:help;");
		head.appendChild(tmp);
		
		tmp = document.createElement("a");
		tmp.href = data[i].link;
		tmp.title = "Ziellink";
		tmp.appendChild(document.createTextNode(data[i].name));
		head.appendChild(tmp);
		
		tmp = document.createElement("div");
		tmp.setAttribute("style","background-image:url('http://pafnetmod.cwsurf.de/DS/pics/abbr.gif'); cursor:pointer; margin-right:3px; margin-top:1px; float:right; width:13px; height:13px;");
		tmp.title = "Löschen";
		tmp.addEventListener("click", function() {
													if(confirm("Dieses Ereignis wirklich löschen?")) {
														GM.deleteValue(this.parentNode.id.split("head_")[1].split("_#")[0]);
														this.parentNode.style.display='none';
													}
												},false);
		head.appendChild(tmp);
		
		tmp = document.createElement("div");
		tmp.setAttribute("style","background-image:url('http://de8.die-staemme.de/graphic/rename.png'); cursor:pointer; margin-right:4px; margin-top:1px; float:right; width:10px; height:12px;");
		tmp.title = "Bearbeiten";
		tmp.addEventListener("click",function() {
													mshfunc("open",data[this.parentNode.id.split("_#")[1]]);
												},false);
		head.appendChild(tmp);
		
		if(data[i].detail != null) {		
			var detail = document.createElement("div");
			detail.id = "DSRM_detail_"+data[i].prefix;
			detail.setAttribute("style",styles["detail"]);
			detail.addEventListener("mouseout", function(){slideup(this.id);}, false);
			detail.appendChild(document.createTextNode(data[i].detail));
			head.appendChild(detail);
		}
		
		contentholder.appendChild(head);
	}
}
// Daten laden
function getValues() {
	var c = 0;
	var tmp = (GM.getValue("set") == undefined || GM.getValue("set")["welt"] == false) ? welt+"_info" : "info";
	if (GM.listValues() == "" || GM.listValues().length == 0 || GM.listValues() == undefined)
		return c--;
	var prefixArr = GM.listValues();
	for (var i=0; i<prefixArr.length; i++) {
		var prefix = prefixArr[i];
		var value = new Object();
		try {
			value = GM.getValue(prefix);
		} catch(e) {}
		if (prefix=="set") {
			setting = value;
		}
		if (prefix=="pos") {
			pos = value;
		}
		if (prefix=="sound") {
			sound = value;
		} 
		if (prefix=="fresh") {
			fresh = true;
		}
		if (typeof(prefix) != "function" && prefix.match(tmp)) {
			value["prefix"] = prefix;
			data.push(value);
			c++;
		}
	}
	return c;
}

//Datensatz speichern
function saveValue(d, pre) {
	if ((pre == null || pre == undefined) && GM.listValues() != "") {
		var now = new Date();
		var pre = welt+"_info_"+now.getTime();
	}
	GM.setValue(pre,d);
	return true;
}

//Soundoptionen umstellen
function tog_sound() {
	var tmp = stop_sound();
	var img = document.getElementById("DSRMsound").getElementsByTagName("img")[0];
	if (sound["on"]==true) {
		if (sound["loop"]==true) {
			sound["on"] = false;
			sound["loop"] = false;
			GM.setValue("sound",sound);
			img.src = "http://pafnetmod.cwsurf.de/DS/pics/no.png";
			img.setAttribute("style","display:block;");
		} else if (sound["loop"]==false) {
			sound["on"] = true;
			sound["loop"] = true;
			GM.setValue("sound",sound);
			img.src = "http://pafnetmod.cwsurf.de/DS/pics/loop.png";
			img.setAttribute("style","display:block;");
		}
	} else if (sound["on"]==false) {
		sound["on"] = true;
		sound["loop"] = false;
		GM.setValue("sound",sound);
		img.setAttribute("style","display:none;");
	}
	if(tmp==1) //Wenn Sound an war restarten
		play_sound();
}
//Refresh umstellen
function tog_fresh() {
	var img = document.getElementById("DSRMfresh").getElementsByTagName("img")[0];
	if (fresh==true) {
		window.clearInterval(aktiv["main"]);
		img.style.display = 'block';
		fresh = false;
		GM.deleteValue("fresh");
	} else if (fresh==false) {
		main(1);
		aktiv["main"] = window.setInterval(main,30000,1);
		img.style.display = 'none';
		fresh = true;
		GM.setValue("fresh",true);
	}
}
//ManSetHolders Funktionen
function mshfunc(w,d) {
	if (w=="clean") {
		var tmp = mansetholder.getElementsByTagName("input");
		tmp[0].value = "Neuer Eintrag";
		var da = new Date();
		var t = time("to_opt",da.getTime());
		mansetholder.getElementsByTagName("select")[0].selectedIndex = t[0];
		mansetholder.getElementsByTagName("select")[1].selectedIndex = t[1];
		mansetholder.getElementsByTagName("select")[2].selectedIndex = t[2];
		mansetholder.getElementsByTagName("select")[3].selectedIndex = t[3];
		mansetholder.getElementsByTagName("select")[4].selectedIndex = t[4];
		mansetholder.getElementsByTagName("select")[5].selectedIndex = t[5];
		tmp[2].value = document.URL;
		tmp[1].value = time("ms",mansetholder);
		tmp[3].value = "";
		tmp = mansetholder.getElementsByTagName("img")[0];
		tmp.src = types[typarr[0]][0];
		tmp.title = types[typarr[0]][1];
		mansetholder.getElementsByTagName("select")[6].selectedIndex = 0;
		mansetholder.getElementsByTagName("textarea")[0].value = "";
	} 
	if (w=="open") {
		makemansetholder();
		mshfunc("clean");
	}
	if (w=="close") {
		mansetholder.style.display = "none";
		mshfunc("clean");
	}
	if (w=="check") {
		var dataArr = new Object();
		var fehler = "";
		var da = new Date();
		var tmp = mansetholder.getElementsByTagName("input");
		//Name
		if (tmp[0].value == "")
			fehler += "Kein Name für Eintrag zugewiesen! \n";
		else
			dataArr["name"] = tmp[0].value;
		//Zeit
		if (tmp[1].value == "" || typeof(parseInt(tmp[1].value)) != "number")
			fehler += "Fehler bei der Zeit/Datums Angabe! \n";
		else if (tmp[1].value < da.getTime())
			fehler += "Zeitpunkt liegt in der Vergangenheit!\n";
		else
			dataArr["time"] = parseInt(tmp[1].value);
		//Link
		if (tmp[2].value == "")
			fehler += "Kein Link angegeben! \n";
		else if (tmp[2].value.match("javascript:")) {
			fehler += "VERSUCHTER MISSBRAUCH! (Keine Javascriptanweisungen als Link!) \n";
			tmp[2].value = "";
		}
		else if (tmp[2].value.match("&h=")) {
			fehler += "VERSUCHTER MISSBRAUCH! (Keine Aktionen als Link!) \n"
			tmp[2].value = "";
		}
		else
			dataArr["link"] = tmp[2].value;
		//Type	
		if (mansetholder.getElementsByTagName("select")[6].value == "") {
			fehler += "Kein Ereignistyp ausgewählt! \n";
			mansetholder.getElementsByTagName("option")[6].selected = "selected";
		}
		else
			dataArr["type"] = mansetholder.getElementsByTagName("select")[6].value;
		//Details
		if (mansetholder.getElementsByTagName("textarea")[0].value == "")
			dataArr["detail"] = null;
		else
			dataArr["detail"] = mansetholder.getElementsByTagName("textarea")[0].value;
		//prefix?
		if (tmp[3].value != "" && !tmp[3].value.match("_info_")) {
			alert("Finger weg von versteckten Inputs!");
			mshfunc("clean");
			return;
		}
		if (fehler == "") {
			var s = saveValue(dataArr, (tmp[3].value=="")? null : tmp[3].value);
			if (s)
				mshfunc("close");
			else
				alert("Es ist ein Fehler beim Speichern aufgetreten!\nVersuchen sie es noch einmal und kontaktieren sie den Skript-Autor über das DS-Forum");
			main(1);
		} else
			alert(fehler);
	}
	if (d != undefined) {
		var tmp = mansetholder.getElementsByTagName("input");
		tmp[0].value = d["name"];
		tmp[1].value = d["time"];
		var t = time("to_opt",d["time"]);
		mansetholder.getElementsByTagName("select")[0].selectedIndex = t[0];
		mansetholder.getElementsByTagName("select")[1].selectedIndex = t[1];
		mansetholder.getElementsByTagName("select")[2].selectedIndex = t[2];
		mansetholder.getElementsByTagName("select")[3].selectedIndex = t[3];
		mansetholder.getElementsByTagName("select")[4].selectedIndex = t[4];
		mansetholder.getElementsByTagName("select")[5].selectedIndex = t[5];
		tmp[2].value = d["link"];
		tmp[3].value = (d["prefix"] != undefined) ? d["prefix"] : "";
		tmp = mansetholder.getElementsByTagName("img")[0];
		tmp.src = types[d["type"]][0];
		tmp.title = types[d["type"]][1];
		mansetholder.getElementsByTagName("select")[6].selectedIndex = types[d["type"]][2];;
		mansetholder.getElementsByTagName("textarea")[0].value = d["detail"];
	}
}

//Time Funktionen
function time(w,t) {
	if (w == "img") {
		var d = new Date();
		var nt = t-d.getTime();
		var re = document.createElement("img");
		re.src = "http://de8.die-staemme.de/graphic/dots/brown.png";
		re.alt = ">1Tag";
		for (var i = 0; i<zeitStufen.length; i++) {
			if (zeitStufen[i][0] >= nt) {
				re.src = zeitStufen[i][1];
				break;
			}
		}
		re.title = time("ms_str",t);
		re.alt = re.src.split(".png")[0].split("dots/")[1];
		re.setAttribute("style","cursor:help;");
		return re;
	}
	if (w == "ms_str") {
		var d = new Date(t);
		return d.toLocaleString();
	}
	if (w == "str_ms") { //Noch ohne Nutzen
		/*Samstag, 4. September 2010 05:36:44
		Monat Tag, Jahr Stunden:Minuten:Sekunden
		ff: Dienstag, 23. November 2010 19:14:32
		opera: 23.11.2010 19:13:52*/
		var str = t.split(" ");
		str = m[str[2]]+" "+str[1].replace(".","")+", "+str[3]+" "+str[4];
		var d = new Date(str);
		return d.getTime();
	}
	if (w == "ms") {
		t = t.getElementsByTagName("select");
		var str = t[4].value+" "+t[3].value+", "+t[5].value+" "+t[0].value+":"+t[1].value+":"+t[2].value;
		var d = new Date(str);
		return d.getTime();
	}
	if (w=="to_opt") {
		var d = new Date(t);
		var re = new Array();
		re[0] = d.getHours();
		re[1] = d.getMinutes();
		re[2] = d.getSeconds();
		re[3] = d.getDate()-1;
		re[4] = d.getMonth();
		re[5] = d.getFullYear()-2010;
		return re;
	}
}

//Playsound
function play_sound() {
	if(document.getElementById("DSRM_soundplayer") == undefined) {
	var tmp = document.createElement("div");
	tmp.id = "DSRM_soundplayer";
	document.body.appendChild(tmp);
	}
	if(document.getElementById("DSRM_soundplayer").innerHTML != "" || sound["on"]==false)
		return;
		
	var buffer = document.createElement('embed');
	buffer.setAttribute("title", "Sound");
	buffer.setAttribute("src", "http://www.soundjay.com/phone/telephone-ring-1.mp3");
	buffer.setAttribute("autostart", "true");
	buffer.setAttribute("autoplay", "true");
	buffer.setAttribute("cache", "true");
	buffer.setAttribute("hidden", "true");
	buffer.setAttribute("width", "0");
	buffer.setAttribute("height", "0");
	buffer.setAttribute("loop", (sound["loop"]==true) ? "true" : "false");
	buffer.setAttribute("volume", 80);
	//buffer.setAttribute("type", 'audio/x-wav');
	//buffer.setAttribute("type", 'audio/mid');
	buffer.setAttribute("type", 'audio/mpeg');
	//buffer.setAttribute("type", 'audio/x-ms-wma');
	document.getElementById("DSRM_soundplayer").appendChild(buffer);
}

function stop_sound() {
	if(document.getElementById("DSRM_soundplayer") != undefined) {
		document.getElementById("DSRM_soundplayer").innerHTML = "";
		return 1;
	}
	return 0;
}

//Alarm

function alarm_start(alarmstillrunning) {
	var tmp = document.getElementsByName("DSRMblink");
	tmp[0].style.display = "block";
	tmp[1].style.display = "block";
	if (alarmstillrunning==undefined||alarmstillrunning==0) {
		play_sound();
	}
}

function alarm_stop() {
	var tmp = document.getElementsByName("DSRMblink");
	tmp[0].style.display = "none";
	tmp[1].style.display = "none";
	stop_sound();
}

//Tastatur
function tastatur(e) {
	if(e.ctrlKey && e.which==32)
		mshfunc("open");
}
//Maus 
function weitereOpt(e) {
	if(document.getElementById("DSRMcontextmenu") == undefined) {
		var ctm = document.createElement("div");
		ctm.id = "DSRMcontextmenu";
		ctm.setAttribute("style",styles["contextmenu"]);
		ctm.style.left = e.pageX+"px";
		ctm.style.top = e.pageY+"px";
		tmp = document.createElement("div");
		tmp.appendChild(document.createTextNode("Exportieren"));
		tmp.setAttribute("style",styles["input"]+" cursor:pointer;");
		tmp.addEventListener("click",function(){exportieren();},false);
		ctm.appendChild(tmp);
		tmp = document.createElement("div");
		tmp.appendChild(document.createTextNode("Importieren"));
		tmp.setAttribute("style",styles["input"]+" cursor:pointer;");
		tmp.addEventListener("click",function(){importieren();},false);
		ctm.appendChild(tmp);
		document.getElementById("ds_body").appendChild(ctm);
		document.addEventListener("click",function(){document.getElementById("DSRMcontextmenu").style.display = "none";},false);
	}
	document.getElementById("DSRMcontextmenu").style.display = "block";
}
//Import
function importieren() {
	var tmp = document.createElement("div");
	tmp.setAttribute("style",styles["mansetholder"]);
	tmp.style.height = "70px";
	tmp.style.textAlign= "center";
	
	var tmp2 = document.createElement("textarea");
	tmp2.rows = "2";
	tmp2.cols = "27";
	tmp2.setAttribute("style",styles["input"]);
	tmp2.addEventListener("change",function(){this.readOnly = true;},false);
	tmp.appendChild(tmp2);
	
	tmp2 = document.createElement("input");
	tmp2.setAttribute("style",styles["input"]+" cursor:pointer;");
	tmp2.type = "button";
	tmp2.value = "Ipmortieren"
	tmp2.addEventListener("click",function(){try{importieren2(this.parentNode.getElementsByTagName("textarea")[0].value);}catch(e){alert("Fehler beim Einlesen!");}; this.parentNode.style.display="none";},false);
	tmp.appendChild(tmp2);
	
	tmp2 = document.createElement("input");
	tmp2.setAttribute("style",styles["input"]+" cursor:pointer;");
	tmp2.type = "button";
	tmp2.value = "Zurücksetzten"
	tmp2.addEventListener("click",function(){this.parentNode.getElementsByTagName("textarea")[0].value=""; this.parentNode.getElementsByTagName("textarea")[0].readOnly = false;},false);
	tmp.appendChild(tmp2);
	
	document.getElementById("ds_body").appendChild(tmp);
}
//eigentlicher Import
function importieren2(d) {
	var importData = JSON.parse(d);
	if(VERSION != importData.version)
		alert("Der Import kann nicht durchgeführt werden!\n Unkompatible Versionen sind der Grund dafür.\nIhre Version: "+VERSION+"\nImportdaten: "+d.version+"\n Akktuelle Version finden sie im DS-Forum.");
	else {
		if(!confirm("Bereits gespeicherte Ereignisse behalten? \n Bei Abbrechen werden die alten Ereignisse und Einstellungen vollständig entfernt!")) {
			GM.clear();
		}
		for(var i=0;i<importData.size;i++) {
			saveValue(importData.data[i],importData.data[i].prefix);
		}
	} main(1);
}
//Export
function exportieren() {
	var exportData = new Object();
	exportData.data = data;
	exportData.size = data.length;
	exportData.version = VERSION;
	var exportString = JSON.stringify(exportData);
	
	var tmp = document.createElement("div");
	tmp.setAttribute("style",styles["mansetholder"]);
	tmp.style.height = "70px";
	tmp.style.textAlign= "center";
	
	var tmp2 = document.createElement("textarea");
	tmp2.rows = "2";
	tmp2.cols = "27";
	tmp2.value = exportString;
	tmp2.setAttribute("style",styles["input"]);
	tmp2.readOnly = true;
	tmp2.addEventListener("click",function(){this.select();},false);
	tmp.appendChild(tmp2);
	
	tmp2 = document.createElement("input");
	tmp2.setAttribute("style",styles["input"]+" cursor:pointer;");
	tmp2.type = "button";
	tmp2.value = "Schliesen";
	tmp2.addEventListener("click",function(){this.parentNode.style.display="none";},false);
	tmp.appendChild(tmp2);
	
	document.getElementById("ds_body").appendChild(tmp);
}

//Sliderfunktionen - Anfang
function slidedown(objname){

        if(moving[objname] || document.getElementById(objname) == undefined)
                return;

        if(document.getElementById(objname).style.display != "none")
                return; // cannot slide down something that is already visible

        moving[objname] = true;
        dir[objname] = "down";
        startslide(objname);
}

function slideup(objname){
        if(moving[objname] || document.getElementById(objname) == undefined)
                return;

        if(document.getElementById(objname).style.display == "none")
                return; // cannot slide up something that is already hidden

        moving[objname] = true;
        dir[objname] = "up";
        startslide(objname);
}

function startslide(objname){
        obj[objname] = document.getElementById(objname);

        endHeight[objname] = parseInt(obj[objname].style.height);
        startTime[objname] = (new Date()).getTime();

        if(dir[objname] == "down"){
                obj[objname].style.height = "1px";
        }
        //Größer machen wenn down
		if(objname=="DSRMcontent") {
			if(dir[objname]=="down") {
				var tmp = document.getElementById("DSRMholder");
				tmp.style.width = "330px";
				tmp.getElementsByTagName("div")[1].style.width = "310px";
				tmp.getElementsByTagName("div")[tmp.getElementsByTagName("div").length-1].style.width = "310px";
				document.getElementById("DSRMOpt").style.width = "310px"; //Wird kleiner wenn anfangs geschlossen
			}
		}
        obj[objname].style.display = "block";

        timerID[objname] = setInterval(function () {slidetick(objname);},timerlen);
}

function slidetick(objname){
        var elapsed = (new Date()).getTime() - startTime[objname];

        if (elapsed > slideAniLen)
                endSlide(objname)
        else {
                var d =Math.round(elapsed / slideAniLen * endHeight[objname]);
                if(dir[objname] == "up")
                        d = endHeight[objname] - d;

                obj[objname].style.height = d + "px";
        }

        return;
}

function endSlide(objname){
        clearInterval(timerID[objname]);

        if(dir[objname] == "up")
                obj[objname].style.display = "none";

        obj[objname].style.height = endHeight[objname] + "px";

		//Untere Optionsleiste & Open speichern & kleiner machen wenn up
		if(objname=="DSRMcontent") {
			if(dir[objname]=="up") {
				var tmp = document.getElementById("DSRMholder");
				tmp.style.width = "220px";
				tmp.getElementsByTagName("div")[1].style.width = "200px";
				tmp.getElementsByTagName("div")[tmp.getElementsByTagName("div").length-1].style.width = "200px";
			}
			if(document.getElementById("DSRMOpt").style.display=="none") {
				document.getElementById("DSRMOpt").style.display = "block";
				pos["o"] = true;
				GM.setValue("pos",pos);
			} else {
				document.getElementById("DSRMOpt").style.display = "none";
				pos["o"] = false;
				GM.setValue("pos",pos);
			}
		}		
        delete(moving[objname]);
        delete(timerID[objname]);
        delete(startTime[objname]);
        delete(endHeight[objname]);
        delete(obj[objname]);
        delete(dir[objname]);

        return;
}
//Sliderfunktionen - Ende

//Dragfunktionen - Anfang

function dragstart(element) {
   //Wird aufgerufen, wenn ein Objekt bewegt werden soll.
  dragobjekt = element;
  dragx = posx - dragobjekt.offsetLeft;
  dragy = posy - dragobjekt.offsetTop;
}

function dragstop() {
  //Wird aufgerufen, wenn ein Objekt nicht mehr bewegt werden soll.
  if (dragobjekt != null && dragobjekt.id == "DSRMholder") {
  	pos["x"] = dragobjekt.style.left;
  	pos["y"] = dragobjekt.style.top;
	GM.setValue("pos",pos);
  }
  dragobjekt=null;
}

function drag(ereignis) {
  //Wird aufgerufen, wenn die Maus bewegt wird und bewegt bei Bedarf das Objekt.
  posx = document.all ? window.event.clientX : ereignis.pageX;
  posy = document.all ? window.event.clientY : ereignis.pageY;

  if(dragobjekt != null) {
    dragobjekt.style.left = (posx - dragx) + "px";
    dragobjekt.style.top = (posy - dragy) + "px";
  }
}
//Dragfunktionen - Ende

//Storageklasse von Hypix
function Storage(prefix,forceGM) {
	var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
	var win = gm ? unsafeWindow : window;
	var ls = false;
	var intGetValue;
	var intSetValue;
	var prefix = prefix;
	try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
	if(!ls && !gm)
		throw("Keine geeignete Speichermöglichgkeit gefunden");
	if(forceGM && gm || !ls) {
		if(gm) {
			intSetValue = function(key,value) {
				GM_setValue(prefix+"_"+key,value);
			};
			intGetValue = function(key,defaultValue) {
				return GM_getValue(prefix+"_" + key, defaultValue);
			}
			this.deleteValue = function(key) {
				GM_deleteValue(prefix+"_"+key);
			}
			this.listValues = function(re) {
				var allkeys = GM_listValues();
				var serverKeys = [];
				var rePrefix = new RegExp("^"+prefix+"_(.*)$");
				if(typeof(re) != "undefined")
					var reKey = new RegExp(re);
				for(var i = 0; i < allkeys.length; i++) {
					var res = allkeys[i].match(rePrefix);
					if(res) {
						if(reKey) {
							res = res[1].match(reKey);
							if(res)
								serverKeys.push(res);
						} else {
							serverKeys.push(res[1]);
						}
					}
				}
				return serverKeys;
			}
		}
	} else if(ls) {
		intSetValue = function(key,value) {
			localStorage.setItem(prefix+"_"+key, value );
		};    
		intGetValue = function(key,defaultValue) {
			var value = localStorage.getItem(prefix+"_"+key);
			if(value)
				return value;
			else
				return defaultValue;
		};
		this.deleteValue = function(key) {
			localStorage.removeItem(prefix+"_"+key);
		}
		this.listValues = function(re) {
			var keys = [];
			var rePrefix = new RegExp("^"+prefix+"_(.*)$");
			if(typeof(re) != "undefined")
				var reKey = new RegExp(re);
			for(var i = 0; i < win.localStorage.length; i++) {
				var res = localStorage.key(i).match(rePrefix);
				if(res) {
					if(reKey) {
						res = res[1].match(reKey);
						if(res)
							keys.push(res);
					} else {
						keys.push(res[1]);
					}
				}
			}
			return keys;
		}
	}
	this.clear = function(re) {
		var keys = this.listValues(re);
		for( var i = 0; i < keys.length; i++ )
			this.deleteValue(keys[i]);
	}
	this.setValue = function(key,value) {
		switch(typeof(value)) {
			case "object":
			case "function":
				intSetValue(key,"j"+JSON.stringify(value));
				break;
			case "number":
				intSetValue(key,"n"+value);
				break;
			case "boolean":
				intSetValue(key,"b" + (value ? 1 : 0));
				break;
			case "string":
				intSetValue(key,"s" + value );
				break;
			case "undefined":
				intSetValue(key,"u");
				break;
		}
	}  
	this.getValue = function(key,defaultValue) {
		var str = intGetValue(key);
		if(typeof(str) != "undefined") {
			switch(str[0]) {
				case "j":
					return JSON.parse(str.substring(1));
				case "n":
					return parseFloat(str.substring(1));
				case "b":
					return str[1] == "1";
				case "s":
					return str.substring(1);
				default:
					this.deleteValue(key);
			}
		}
		return defaultValue;
	}
	this.getString = function(key) {
		return intGetValue(key);
	}
	this.setString = function(key,value) {
		intSetValue(key,value);
	}
}
//Ende
if (!document.URL.match("forum.php")) {
	main();
}