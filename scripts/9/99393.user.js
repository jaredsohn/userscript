// ==UserScript==
// @name           Kapi hospital bot
// @namespace      D:\skrypt\Kapi.hospital.bot.js
// @include        http://*kapihospital.com/*
// ==/UserScript==

window.addEventListener("load",function(){

// Umlaute
var ae = "\u00E4";	var oe = "\u00F6";	var ue = "\u00FC";
var Ae = "\u00C4";	var Oe = "\u00D6";	var Ue = "\u00DC";
var sz = "\u00DF";

// Multilingual
var texte = new Object();
function loadLanguage(lang){
switch (lang) {
case "de": {
texte["berater"] = "Doradca";
texte["autologin1"] = "Sprawdzenie aktywnych sesji. Prosze odczekac 5 sekund<br>...";
texte["autologin2"] = "Wszystkie konta zalogowane.";
texte["optionen"] = "Opcje";
texte["fertig"] = "Gotowe";
texte["shopHeuteNichtErreichbar"] = "Sklep jest teraz niedostepny";
texte["noch"] = "Pozostalo";
// options panel
texte["set_ScriptHomepage"] = "Strona domowa skryptu";
texte["set_AutoLogin"] = "Automatyczne logowanie";
texte["set_Update"] = "Aktualizacja";
texte["set_RackLow"] = "Minimalna ilosc lekarstw w regale";
texte["set_valGlobalClockInTitle"] = "Czas w tytule karty.";
texte["info_AutoLogin"] = "Po wprowadzeniu nazwy uzytkownika i hasla nastepuje automatyczne logowanie. Pozwala to zachowac ciaglosc grania. Przy wielu kontach musi byc dozwolone wyskakiwanie okienek.";
texte["info_Update"] = "Automatycznie sprawdza czy jest nowsza wersja tego skryptu.";
texte["info_RackLow"] = "Produkt zostanie zaznaczony, gdy jego ilosc w regale spadnie ponizej tego poziomu";
texte["info_valGlobalClockInTitle"] = "Czas globalny jest wyswietlany w pasku tytulowym okna.";
texte["confirmUpdate"] = "Jest nowa wersja skryptu Doradca Kapi Hospital. Czy chcesz ja zainstalowac?";
texte["zeigePasswoerter"] = "Pokaz haslo";
texte["autoLogin"] = "Automatyczne logowanie";
texte["accountAktiv"] = "Konto aktywne";
texte["server"] = "Serwer";
texte["ungueltigerServer"] = "Bledny serwer";
texte["name"] = "Login";
texte["passwort"] = "Haslo";
texte["speichern"] = "Zapisz";
texte["loeschen"] = "Usun";
// patients panel
texte["zeigeGeheilteKrankheiten"] = "Zeige geheilte Krankheiten";
texte["minipics"] = "Minipics";
texte["frei"] = "Wolny";
texte["inBehandlung"] = "Leczony";
texte["waitingroom"] = "Poczekalnia";
// boerse
texte["showUncurable"] = "Pokaz nieuleczalnych";
//Systemwords
texte["waehrung"] = "hT"; //Global._KH_CURRENCY
texte["coins"] = "Monety";
break;}
}}

if (document.location.href.search("kapihospital.de")!=-1) {
	var lng = "de";
	var gamepage = ".kapihospital.de";
	var reg = /http:\/\/s(\d+)\.kapihospital\.de\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.de\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
loadLanguage(lng);
var gamepages = new Object();
gamepages["de"] = "http://www.kapihospital.de";

//***********************************************************************************************************

var scriptUrl = "http://userscripts.org/scripts/show/86222";
var Global = unsafeWindow.Global;
var loc = reg.exec(document.location.href);
var all  = document.getElementsByTagName("body")[0];
var now = Math.floor((new Date()).getTime()/1000);
var nie = 2147483000;

if(loc){
	var server = loc[1];
	var page = loc[2];
	var pageZusatz = loc[3];
	var developer = (pageZusatz=="?dev");
	var candtable = document.getElementsByTagName("table");
	var username = GM_getValue(lng+"_"+server+"_username","");

	switch (page) {
		case "main":	do_main();break;
		case "logout": do_login();break;
	}
} else do_login();

//***********************************************************************************************************

function $(ID) {return document.getElementById(ID)}
function removeElement(node){node.parentNode.removeChild(node)}
function createElement(type, attributes, append, inner){
	var node = document.createElement(type);
	for (var attr in attributes) {
		if (attr=="checked") node.checked=attributes[attr];
		else if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	}
	if (append) append.appendChild(node);
	if (inner) node.innerHTML = inner;
	return node;
}
function click(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("click", true, true);
	A.dispatchEvent(B);
	if (A.href){ document.location.href = A.href; }
}
function mousedown(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("mousedown", true, true);
	A.dispatchEvent(B);
}
function mousemove(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("mousemove", true, true);
	A.dispatchEvent(B);
}

function number_format(number,decimals,dec_point,thousands_sep){
	// http://kevin.vanzonneveld.net
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +     bugfix by: Michael White (http://getsprink.com)
	// +     bugfix by: Benjamin Lupton
	// +     bugfix by: Allan Jensen (http://www.winternet.no)
	// +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +     bugfix by: Howard Yeend
	// +    revised by: Luke Smith (http://lucassmith.name)
	// +     bugfix by: Diogo Resende
	// +     bugfix by: Rival
	// %        note 1: For 1000.55 result with precision 1 in FF/Opera is 1,000.5, but in IE is 1,000.6
	// *     example 1: number_format(1234.56);
	// *     returns 1: '1,235'
	// *     example 2: number_format(1234.56, 2, ',', ' ');
	// *     returns 2: '1 234,56'
	// *     example 3: number_format(1234.5678, 2, '.', '');
	// *     returns 3: '1234.57'
	// *     example 4: number_format(67, 2, ',', '.');
	// *     returns 4: '67,00'
	// *     example 5: number_format(1000);
	// *     returns 5: '1,000'
	// *     example 6: number_format(67.311, 2);
	// *     returns 6: '67.31'

	var n = number, prec = decimals;
	n = !isFinite(+n) ? 0 : +n;
	prec = !isFinite(+prec) ? 0 : Math.abs(prec);
	var sep = (typeof thousands_sep == "undefined") ? delimThou : thousands_sep; // changed!
	var dec = (typeof dec_point == "undefined") ? delimDeci : dec_point; // changed!

	var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

	var abs = Math.abs(n).toFixed(prec);
	var _, i;

	if (abs >= 1000) {
		_ = abs.split(/\D/);
		i = _[0].length % 3 || 3;

		_[0] = s.slice(0,i + (n < 0)) +
			  _[0].slice(i).replace(/(\d{3})/g, sep+'$1');

		s = _.join(dec);
	} else {
		s = s.replace('.', dec);
	}
	return s;
}
function hT_format(number){return number_format(number,2)+"&nbsp;"+Global._KH_CURRENCY;}
function hT_formatgr(number){return number_format(number,0)+"&nbsp;"+Global._KH_CURRENCY;}

function time2str(time,mode){
	str="";
	time = Math.max(0,time);
	if (!mode) {
		if (time%60>=10) str+=":"+Math.floor(time%60);
		else str+=":0"+Math.floor(time%60);
	}
	time=time/60;
	if (time>=1){
		if (time%60>=10) str=":"+Math.floor(time%60)+str;
		else str=":0"+Math.floor(time%60)+str;
	}
	else str=":00"+str;
	time=time/60;
	if (time>=1) str=Math.floor(time%24)+str;
	else str="0"+str;
	time=time/24;
	if (time>=1) str=Math.floor(time)+"d "+str;
	return str;
}
function uhrzeit(time,mode){
	var help = new Date(time*1000);
	if (help.getHours()<10) { var str = "0"+help.getHours(); }
	else { var str = help.getHours(); }
	if (help.getMinutes()<10) { str += ":0"+help.getMinutes(); }
	else { str += ":"+help.getMinutes(); }
	if (!mode) {
		if (help.getSeconds()<10) { str += ":0"+help.getSeconds(); }
		else { str += ":"+help.getSeconds(); }
	}
	return str;
}

function explode(str){
//GM_log("Begin explode "+ str);
if (str == "") throw("Explode error Argument empty");
if (str=="undefined") throw ("Explode error Argument is undefined");
if (typeof str != "string") throw ("Explode error Argument not a String");

try{
return eval('(' + str + ')');
} catch(err){
GM_log("Explode error : " + err);
throw ("Explode error : " + err);
}
}

function implode(arr){//--- function written by Jan-Hans
 try{
   var line = new String();
   var InternalCounter = -1;
   var NoKey = new Boolean(false);
   if (typeof arr != "object") throw("Argument not a Object or Array" + typeof arr +"<br>");
   var type = (arr instanceof Array); //true->array | false->object

   line = (type)?"[":"{";
   for(var i in arr ){
    if (typeof arr[i] == "function") continue;
    InternalCounter++;
if (type){
while (i>InternalCounter){
line += ",";
InternalCounter++;
}
}else{ //arr == object
       line += "\"" + i + "\"";
       line += ":";
     }
     if (typeof arr[i] == "number" || typeof arr[i] == "boolean"){
       line +=  arr[i];
     } else if (typeof arr[i] == "string"){
       line +=  "\"" + arr[i] + "\"";
     } else if(typeof arr[i] == "undefined"){
       line += '';
     } else {
       line += implode(arr[i]);
     }
     line += ",";
   }
   var endChar = line.substring(line.length-1,line.length);
 return line.substring(0,line.length-1) + (("{[".indexOf(endChar)!=-1)? endChar:"")+ ((type)?"]":"}");
 } catch (err){
   GM_log("Implode error : " + err);
   throw ("Implode error : " + err);
 }
}

function Log(obj,pre){
	if(developer){
		if(typeof(pre)=="undefined") pre="";
		if(typeof(obj)=="object"){
			//GM_log("______________________________ object");
			for(var v in obj) Log(obj[v],pre+v+" : ");
			//GM_log("______________________________ object end");
		} else {
			GM_log(pre+obj);
		}
	}
}

//***********************************************************************************************************

function do_main(){
	//if (!username) document.location.href = "http://www"+gamepage;
	// CSS
	GM_addStyle("tr:hover{background-color:lightblue;}");
	GM_addStyle("table.hoveryellow tr:hover{background-color:yellow;}");
	GM_addStyle("div.hoverlightblue:hover{background-color:lightblue;}");
	GM_addStyle("div.hoverblue:hover{background-color:blue;}");
	GM_addStyle("#quicklinks{position:fixed;right:-100px;top:0px;width:100px;height:100%;padding-left:15px;background-color:#999;z-index:200;}");
	GM_addStyle("#quicklinks:hover{right:0px;!important}");
	GM_addStyle("#quicklinks>div{float:left;}");
	GM_addStyle("#quicklinks>div>div{position:relative;width:50px;height:50px;}");
	GM_addStyle(".miniicon{font-weight:bold;padding:2px;border:1px inset white;}");
	GM_addStyle(".allcured{border:3px solid green!important;}");
	GM_addStyle(".needminitreatment{border:3px solid yellow;border-left:3px solid yellow!important;}");
	GM_addStyle(".unhealable{border:3px solid red;border-top:3px solid red!important;border-right:3px solid red!important;}");
	GM_addStyle(".racklow{"+GM_getValue(lng+"_"+server+"_"+username+"_css_racklow","background-color:orangered;")+"}");

	// Updatecheck
	if (GM_getValue("valUpdate",true)) {
		valLastUpdate = GM_getValue("valLastUpdate","");
		if(valLastUpdate=="") {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://userscripts.org/scripts/source/79243.meta.js",
				onload: function(response) {
					keyusoversion = /uso:version\s+(\d+)/;
					serverversion = keyusoversion.exec(response.responseText)[1];
					GM_setValue("valLastUpdate",serverversion);
				}
			});
		} else {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://userscripts.org/scripts/source/79243.meta.js",
				onload: function(response) {
					keyusoversion = /uso:version\s+(\d+)/;
					serverversion = keyusoversion.exec(response.responseText)[1];
					if (valLastUpdate!=serverversion) {
						GM_setValue("valLastUpdate",serverversion);
						if(confirm(texte["confirmUpdate"])) {
							document.location.href = "http://userscripts.org/scripts/source/79243.user.js";
						}
					}
				}
			});
		}
	}

	var documentTitle = document.title;
	try{var maincontainer = $("border4").parentNode;}catch(err){var maincontainer=all;}
	try{var werbecontainer = document.getElementsByTagName("form")[0].parentNode;}catch(err){var werbecontainer=all;}
	var lastXmlRequest = 0;
	var rooms = new Array();
	var patients = new Array();
	var roomTimes = new Object();
	roomTimes["global"] = [0,0];
	roomTimes["allrooms"] = [0,0];
	roomTimes["emptyrooms"] = [0,0];
	var medi = new Object();
	for(var v in Global.availableMedics._object){ medi[Global.availableMedics._object[v]["diseases"]] = Global.availableMedics._object[v]; }
	if (developer) createElement("div",{id:"help1",style:"z-index:2;position:absolute;top:0px;left:0px;background-color:#CCC;border:2px solid black;padding:3px;"},all);
	var valRackLimit = GM_getValue(lng+"_"+server+"_"+username+"_valRackLimit",50);
	var valGlobalClockInTitle = GM_getValue(lng+"_"+server+"_"+username+"_valGlobalClockInTitle",true);
	var questTime = GM_getValue(lng+"_"+server+"_"+username+"_questTime",0);

	// punkte
	var userlevel = [0,50,200,500,1000,3000,12000,17000,40000,70000,115000,175000,280000,350000,550000,800000,1500000,2500000,3600000,5000000,7500000,10000000,12500000,15000000,17500000,20000000,25000000,30000000,35000000,40000000,45000000,50000000,55000000,60000000,65000000,70000000,75000000,80000000,85000000,90000000,95000000,99999999];
	$("pkt").addEventListener("mouseover",function(){
		var punkte = parseInt(this.innerHTML.replace(regDelimThou,""),10);
		for(var level=0;level<userlevel.length;level++) if(punkte<userlevel[level]) break;
		this.title = texte["noch"]+" "+number_format(userlevel[level]-punkte);
	},false);
	
	patientDiseases = new Object(); 
	// patientDiseases[patientId][diseaseNr]: heartbeat,cured,notreatment,comesnext,""=ill
	// patientDiseases[patientId][room]: current room (type)
	// patientDiseases[patientId][floor]: current floor
	// patientDiseases[patientId][roomX]: needed room to go (type)
	// patientDiseases[patientId][m]: count of needed minitreatments
	// patientDiseases[patientId][state]: 0=waitingroom,1=bed,2=nurse,3=in room,4=treatment,5=cured
	// patientDiseases[patientId][unhealable]: if not healable
	try{ patientDiseases = explode(GM_getValue(lng+"_"+server+"_"+username+"_patientDiseases","{}")); }catch(err){}
	for(var pat in patientDiseases){
		if(!Global.refPatients.get("p"+pat)){ delete patientDiseases[pat]; }
		else {
			if(!patientDiseases[pat]["state"]){ patientDiseases[pat]["state"]=1; }
			if(!patientDiseases[pat]["room"]){ patientDiseases[pat]["room"]=6; }
			if(!patientDiseases[pat]["floor"]){ patientDiseases[pat]["floor"]=1; }
		}
	}
	if(developer){

		$("garten_komplett").addEventListener("mouseover",function(event){
			$("help1").innerHTML  = "";
			var roomId = 0;
			var patientId=0;
			if(!isNaN(event.target.id.replace("r",""))){
				roomId = event.target.id.replace("r","");
				patientId = Global.refRooms.get(event.target.id).patient;
			}
			else if(!isNaN(event.target.id.replace("p",""))){
				roomId = (Global.refPatients.get(event.target.id).room+"").replace("r","");
				patientId = event.target.id.replace("p","");
			}
			if(patientId!=0){
				var help = Global.refPatients.get("p"+patientId);
				for(var v in help){
					if(typeof(help[v])!="function") $("help1").innerHTML += "<br>"+v+" : "+help[v];
				}
				$("help1").innerHTML += "<br>"
				if(patientDiseases[patientId]){
					for(var v in patientDiseases[patientId]){
						$("help1").innerHTML += "<br>"+v+" : "+patientDiseases[patientId][v];
					}
				}

				$("help1").innerHTML += "<br>"
			}
			if(roomId!=0){
				var help = Global.refRooms.get("r"+roomId);
				for(var v in help){
					if(typeof(help[v])!="function") $("help1").innerHTML += "<br>"+v+" : "+help[v];
					//else $("help1").innerHTML += "<br>"+v+" : Fkt";
				}
				$("help1").innerHTML += "<br>"
				var help = Global.availableRooms[help["roomid"]];
				for(var v in help){
					if(typeof(help[v])!="function") $("help1").innerHTML += "<br>"+v+" : "+help[v];
				}

			}
		},false);

			help = Global.availableRooms[1];
			help = Global.availableDiseases[6];
			help = Global.availableMedics._object["med6"];
			help = Global.availableMedics._object;
			//Log(help);



		// Cleaner
		/*
		//Log(unsafeWindow.Element("cleaner"));
		//Global.refRooms.get("r55")._onDrop = function(a,b,c){	alert(a);	alert(b);	alert(c); }
		//Log(Global.refRooms.get("r55")._onDrop);
		$("cleaner").addEventListener("click",function(){
		//Log(unsafeWindow.Draggables["drags"]["1"]);
		//Log($("cleaner").hasClassName("cleaner"));
		//Log(unsafeWindow.Cleaner);
		for(var v=unsafeWindow.Draggables["drags"].length-1;v>=0;v--) if(unsafeWindow.Draggables["drags"][v]["element"].id=="cleaner")break;
		var cleaner = unsafeWindow.Draggables["drags"][v];
		//Log(cleaner.hasClassName("cleaner"));
			rooms = Global.refRooms.values();
			for(var v=0;v<rooms.length;v++){
				if ((Global.rooms[v].cleanup) && (Global.rooms[v].ends==0)){
					//Log("cleaner "+Global.rooms[v].topleft);
					//Log(Global.refRooms.get("r"+Global.rooms[v].topleft)._onDrop);
					Global.refRooms.get("r"+Global.rooms[v].topleft)._onDrop(cleaner,"","");
				}
			}
		//Log(cleaner["element"].id);
		//Log(cleaner["handle"].id);
		//Log(cleaner["options"]);
		//http://s1.kapihospital.de/service.room.php?mode=cleaner&position=157&level=1
		//new Ajax.Request('', {method: 'get', parameters: {mode: 'cleaner', position: this.topleft, level: Global.selectedFloor}, onSuccess: this._handleCleaning.bind(this), onFailure: this._handleFailure.bind(this)});

		},false);
		*/

	}

	var newdiv, newdiv1, newbutton;
	// Werbung
	if (werbecontainer) {
		werbecontainer.style.display = "";
		maincontainer.style.marginTop = "5px";
	}
	if ($("getcoinsnow")) { $("getcoinsnow").style.display = "none"; }
	if ($("nicelink")) { $("nicelink").style.display = "none"; }
	newdiv = document.getElementsByTagName("div");
	for(var v=0;v<newdiv.length;v++) if(newdiv[v].hasAttribute("onclick")&&newdiv[v].getAttribute("onclick").search("facebook")!=-1) newdiv[v].style.display = "none";

	// MiniIcons
	newdiv = createElement("div",{id:"berater_miniicons ",style:"color:white;height:50px;position:absolute;width:16px;z-index:10;top:176px;left:2px;"},maincontainer);
	newdiv1 = createElement("div",{class:"miniicon hoverblue cursorclickable"},newdiv,"P");
	newdiv1.addEventListener("click",function(){buildInfoPanel("patients");},false);
	createElement("div",{style:"height:10px;"},newdiv);

	/*
	var floors = 2;
	for(var v=floors;v>0;v--){
		newdiv1 = createElement("div",{id:"miniiconSelectFloor"+v,class:"miniicon hoverblue cursorclickable"},newdiv,v);
		newdiv1.addEventListener("click",function(){unsafeWindow.Map.jumpTo("floor"+this.id.replace("miniiconSelectFloor",""));miniiconSelectFloor();},false);
	}
	function miniiconSelectFloor(){
		for(var v=1;v<=floors;v++) $("miniiconSelectFloor"+v).style.backgroundColor = (v==parseInt(Global.selectedFloor,10)?"blue":"");
	}
	miniiconSelectFloor();
	*/

	// Button-Leiste
	newdiv = createElement("div",{style:"position:absolute;top:784px;display:inline;"},maincontainer);
	newbutton = createElement("button",{type:"button",class:"cursorclickable",style:"margin-left:3px;"},newdiv,texte["set_ScriptHomepage"]);
	newbutton.addEventListener("click",function(){window.open(scriptUrl)},false);
	newbutton.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
	newbutton.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);
	newbutton = createElement("button",{id:"berateroptionen",type:"button",class:"cursorclickable",style:"margin-left:3px;"},newdiv,texte["optionen"]);
	newbutton.addEventListener("click",function(){buildInfoPanel("options");},false);
	newbutton.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
	newbutton.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);

	// InfoPanel
	createElement("div",{id:"infoPanel",name:"",style:"position:absolute;top:184px;left:252px;width:600px;height:500px;background-image:url('http://pics.kapihospital.de/bg_referral_01.jpg');z-index:101;display:none;"},all);
	function closeInfoPanel(){
		$("infoPanel").setAttribute("name","");
		$("infoPanel").style.display = "none";
	}
	function buildInfoPanel(mode){
		if(mode==$("infoPanel").getAttribute("name")){ closeInfoPanel(); }
		else {
		$("infoPanel").setAttribute("name",mode);
		$("infoPanel").innerHTML = "";
		$("infoPanel").style.display = "block";
		divInfo = createElement("div",{style:"position:absolute;left:20px;top:80px;width:570px;height:400px;overflow:auto;"},$("infoPanel"));
		newdiv = createElement("img",{class:"cursorclickable",style:"font-size:10px;position:absolute;height:35px;width:35px;right:10px;top:2px;"},$("infoPanel"));
		newdiv.addEventListener("click",closeInfoPanel,false);

		if (mode=="options"){
			createElement("div",{align:"center",style:"line-height:30px;font-weight:bold;"},divInfo,texte["optionen"]);
			newtable = createElement("table",{style:"width:100%;",border:"1"},divInfo);

			//newtr = createElement("tr","",newtable);
			//newtd = createElement("td",{align:"center"},newtr);
			//var valAutoLogin = GM_getValue("valAutoLogin",false);
			//inp = createElement("input",{id:"inputvalAutoLogin",type:"checkbox",class:"link",checked:valAutoLogin},newtd);
			//inp.addEventListener("click",function(){valAutoLogin=this.checked;GM_setValue("valAutoLogin", valAutoLogin);},false);
			//createElement("td","",newtr,texte["set_AutoLogin"]);
			//createElement("td","",newtr,texte["info_AutoLogin"]);

			newtr = createElement("tr","",newtable);
			newtd = createElement("td",{align:"center"},newtr);
			var valUpdate = GM_getValue("valUpdate",true);
			inp = createElement("input",{id:"inputvalUpdate",type:"checkbox",class:"link",checked:valUpdate},newtd);
			inp.addEventListener("click",function(){valUpdate=this.checked;GM_setValue("valUpdate", valUpdate);},false);
			createElement("td","",newtr,texte["set_Update"]);
			createElement("td","",newtr,texte["info_Update"]);
			
			newtr = createElement("tr","",newtable);
			newtd = createElement("td",{align:"center"},newtr);
			inp = createElement("input",{id:"inputvalGlobalClockInTitle",type:"checkbox",class:"link",checked:valGlobalClockInTitle},newtd);
			inp.addEventListener("click",function(){valGlobalClockInTitle=this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valGlobalClockInTitle",valGlobalClockInTitle);},false);
			createElement("td","",newtr,texte["set_valGlobalClockInTitle"]);
			createElement("td","",newtr,texte["info_valGlobalClockInTitle"]);
			
			newtr = createElement("tr","",newtable);
			newtd = createElement("td",{align:"center"},newtr);
			newinput = createElement("input",{id:"inputvalRackLimit",value:valRackLimit,maxlength:"5",size:"5px",style:"background-color:transparent;"},newtd);
			newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
			newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
			newinput.addEventListener("keyup",function(){
				valRackLimit=parseInt(this.value,10);
				if (!isNaN(valRackLimit)) { GM_setValue(lng+"_"+server+"_"+username+"_valRackLimit", valRackLimit); }
				this.value = (isNaN(valRackLimit)?"":valRackLimit);
			},false);
			createElement("td","",newtr,texte["set_RackLow"]);
			createElement("td","",newtr,texte["info_RackLow"]);			

			//AutoLogin
			createElement("div",{align:"center",style:"line-height:30px;margin-top:20px;font-weight:bold;"},divInfo,texte["autoLogin"]);
			newtable=createElement("table",{id:"tableAutologin",align:"center"},divInfo);
			function buildLoginTable(showPW) {
				function saveLogin(){
					GM_setValue("logindata",implode(logindata));
				}
				try{ var logindata = explode(GM_getValue("logindata","[]")); }
				catch(err){ var logindata= new Array; }
				newtable = createElement("table",{align:"center"});
				$("tableAutologin").parentNode.replaceChild(newtable,$("tableAutologin"));
				newtable.id = "tableAutologin";
				newtable.addEventListener("change",saveLogin,false);
				newtr = createElement("tr",{},newtable);
				createElement("th",{},newtr,texte["server"]);
				createElement("th",{},newtr,texte["name"]);
				createElement("th",{},newtr,texte["passwort"]);
				for (var v=0;v<logindata.length;v++){
					newtr = createElement("tr","",newtable);
					newtd = createElement("td","",newtr);
					newinp = createElement("input",{id:"loginActive"+v,type:"checkbox",title:texte["accountAktiv"],checked:logindata[v][4]},newtd);
					newinp.addEventListener("change",function(){ logindata[this.id.replace("loginActive","")][4] = this.checked; },false);
					newinp = createElement("input",{id:"loginServer"+v,style:"width:20px",maxlength:"2"},newtd);
					if (isNaN(logindata[v][1])){ logindata[v][1]="0";}
					if (logindata[v][1]!="0"){ newinp.value = logindata[v][1]; }
					newinp.addEventListener("change",function(){
						var readin = parseInt(this.value,10);
						if (isNaN(readin) || (readin<1)) {alert(texte["ungueltigerServer"]); this.value="";}
						else {
							this.value = readin;
							logindata[this.id.replace("loginServer","")][1] = readin;
						}
					},false);
					newselect = createElement("select",{id:"loginLng"+v},newtd);
					for(var w in gamepages)	createElement("option",{value:w},newselect,w);
					newselect.value = logindata[v][0];
					newselect.addEventListener("change",function(){ logindata[this.id.replace("loginLng","")][0] = this.value; },false);

					newtd = createElement("td","",newtr);
					newinput = createElement("input",{id:"loginName"+v,style:"width:150px",value:logindata[v][2],maxlength:"20"},newtd);
					newinput.addEventListener("change",function(){ logindata[this.id.replace("loginName","")][2] = this.value; },false);

					newtd = createElement("td",{},newtr);
					newinput = createElement("input",{id:"loginPW"+v,style:"width:150px",value:logindata[v][3],maxlength:"20"},newtd);
					if (!showPW){ newinput.type = "password"; }
					newinput.addEventListener("change",function(){ logindata[this.id.replace("loginPW","")][3] = this.value; },false);

					newtd=createElement("td","",newtr);
					if (v>0) {
						newdiv = createElement("div",{id:"loginUp"+v,class:"link2",style:"width:14px;height:10px;"},newtd);
						createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/quest_up.gif",style:"width:14px;height:10px;"},newdiv);
						newdiv.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
						newdiv.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
						newdiv.addEventListener("click",function(){
							var currLine=parseInt(this.id.replace("loginUp",""),10);
							logindata.splice(currLine-1,2,logindata[currLine],logindata[currLine-1]);
							saveLogin();
							buildLoginTable(showPW);
						},false);
					}
					if (v<logindata.length-1) {
						newdiv = createElement("div",{id:"loginDown"+v,class:"link2",style:"width:14px;height:10px;"},newtd);
						createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/quest_down.gif",style:"width:14px;height:10px;"},newdiv);
						newdiv.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
						newdiv.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
						newdiv.addEventListener("click",function(){
							var currLine=parseInt(this.id.replace("loginDown",""),10);
							logindata.splice(currLine,2,logindata[currLine+1],logindata[currLine]);
							saveLogin();
							buildLoginTable(showPW);
						},false);
					}

					newtd=createElement("td",{title:texte["loeschen"],id:"loginDelete"+v},newtr);
					createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/popin/contracts/anullieren.gif",class:"link2",style:"width: 16px; height: 16px;"},newtd);
					newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
					newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
					newtd.addEventListener("click",function(){
						var currLine=this.id.replace("loginDelete","");
						logindata.splice(currLine,1);
						saveLogin();
						buildLoginTable(showPW);
					},false);
				}

				newtr = createElement("tr","",newtable);
				newtd = createElement("td",{colspan:"5",class:"link",style:"font-weight:bold;font-size:16px;text-align:right;"},newtr,"+");
				newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
				newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
				newtd.addEventListener("click",function(){
					logindata.push([lng,"0","","","true"]); // neue leere zeile
					saveLogin();
					buildLoginTable(showPW);
				},false);
			}
			buildLoginTable(false);
			newdiv = createElement("div",{align:"center"},divInfo);
			newinput = createElement("input",{type:"checkbox",class:"cursorclickable",checked:false},newdiv);
			newinput.addEventListener("click",function(){buildLoginTable(this.checked);},false);
			newspan = createElement("span","",newdiv,texte["zeigePasswoerter"]);
			
							
			//CSS
			var cssArr = new Object();
			cssArr["css_racklow"] = [[],"background-color:orangered;"];
			createElement("div",{align:"center",style:"line-height:30px;margin-top:20px;font-weight:bold;"},divInfo,"CSS");
			newtable = createElement("table",{align:"center"},divInfo);
			for(var v in cssArr){
				newtr = createElement("tr","",newtable);
				createElement("td","",newtr,v);
				newtd = createElement("td","",newtr);
				var help = GM_getValue(lng+"_"+server+"_"+username+"_"+v,cssArr[v][1]);
				newinput = createElement("input",{id:v,value:help,style:"width:300px;"},newtd);
				newinput.addEventListener("keyup",function(){
					if(this.value=="") this.value = cssArr[this.id][1];
					GM_setValue(lng+"_"+server+"_"+username+"_"+this.id,this.value);
					cssArr[this.id][1] = this.value;
					var help = cssArr[this.id][1];
					for(var w=0;w<cssArr[this.id][0].length;w++){ help = cssArr[cssArr[this.id][0][w]][1]+help; }
					this.parentNode.nextSibling.firstChild.setAttribute("style",help);
				},false);
				newtd = createElement("td","",newtr);
				for(var w=0;w<cssArr[v][0].length;w++){ help = cssArr[cssArr[v][0][w]][1]+help; }
				newdiv = createElement("div",{style:help},newtd,"test");
			}
		}
		if (mode=="patients"){
			function buildPatientsTable(mode,showCured,minipic){
				divInfo.innerHTML = "";
				patients = Global.refPatients.values();
				newtable = createElement("table",{border:"1",width:"100%"},divInfo);
				newtablehead=createElement("thead","",newtable);
				newtablebody=createElement("tbody",{style:"overflow-y:auto;overflow-x:hidden;height:365px;"},newtable);

				newtr = createElement("tr","",newtablehead);
				newth = createElement("th",{colspan:"4"},newtr);
				newspan = createElement("span",{style:"margin-right:3px"},newth);
				newinput = createElement("input",{type:"checkbox",checked:showCured,class:"cursorclickable"},newspan);
				newinput.addEventListener("click",function(){ buildPatientsTable(mode,this.checked,minipic); },false);
				createElement("span","",newspan,texte["zeigeGeheilteKrankheiten"]);
				newspan = createElement("span",{style:"margin-right:3px"},newth);
				newinput = createElement("input",{type:"checkbox",checked:minipic,class:"cursorclickable"},newspan);
				newinput.addEventListener("click",function(){ buildPatientsTable(mode,showCured,this.checked); },false);
				createElement("span","",newspan,texte["minipics"]);
				newinput = createElement("input",{type:"button",style:"margin-right:3px",value:"Patienten",class:"cursorclickable"},newth);
				newinput.addEventListener("click",function(){ buildPatientsTable(1,showCured,minipic); },false);
				newinput = createElement("input",{type:"button",style:"margin-right:3px",value:"R"+ae+"ume",class:"cursorclickable"},newth);
				newinput.addEventListener("click",function(){ buildPatientsTable(2,showCured,minipic); },false);

				if(mode==1){
					for(var posi=0;posi<3;posi++){
					for(var pat in patientDiseases){
						switch(patientDiseases[pat]["state"]){
							case 1: case 2: if(posi==0){
								newtr = createElement("tr",{"id":pat,"class":"cursorclickable","onclick":'show_page("medical",this)'},newtablebody);
								newtr.addEventListener("click",closeInfoPanel,false);
								createElement("td","",newtr,pat);
								createElement("td",{colspan:"2"},newtr,Global.availableRooms[6]["name"]);
								newtd = createElement("td",{style:"padding-right:30px"},newtr);
								plotPatient(newtd,pat,showCured,minipic);
							} break;
							case 3: case 4: if(posi==1){
								newtr = createElement("tr",{"id":pat,"class":"cursorclickable","onclick":'show_page("medical",this)'},newtablebody);
								newtr.addEventListener("click",closeInfoPanel,false);
								createElement("td","",newtr,pat);
								createElement("td","",newtr,patientDiseases[pat]["floor"]);
								createElement("td","",newtr,Global.availableRooms[patientDiseases[pat]["room"]]["name"]);
								newtd = createElement("td",{style:"padding-right:30px"},newtr);
								plotPatient(newtd,pat,showCured,minipic);
							} break;
							case 0: if(posi==2){
								newtr = createElement("tr",{"id":pat,"class":"cursorclickable","onclick":'show_page("medical",this)'},newtablebody);
								newtr.addEventListener("click",closeInfoPanel,false);
								createElement("td","",newtr,pat);
								createElement("td",{colspan:"2"},newtr,texte["waitingroom"]);
								newtd = createElement("td",{style:"padding-right:30px"},newtr);
								plotPatient(newtd,pat,showCured,minipic);
							} 
						}
					}
					newtr = createElement("tr","",newtablebody);
					createElement("td",{colspan:"4"},newtr,"");
					}
				} else if(mode==2){
					var sumDiseases = new Object();
					for(var pat in patientDiseases){
						for(var disease in patientDiseases[pat]) if(!isNaN(disease)){
							var currRoom = Global.availableDiseases[disease]["room"][0];
							if(!sumDiseases[currRoom]){ sumDiseases[currRoom] = new Object(); }
							if(!sumDiseases[currRoom][disease]){ sumDiseases[currRoom][disease]=[0,0,0,0,0,0]; }
							switch(patientDiseases[pat]["state"]){
								case 1: case 2: 
									sumDiseases[currRoom][disease][0]++;
									if((patientDiseases[pat][disease]!="cured")&&(patientDiseases[pat][disease]!="heartbeat")) sumDiseases[currRoom][disease][1]++;
								break; case 3: case 4:
									sumDiseases[currRoom][disease][2]++;
									if((patientDiseases[pat][disease]!="cured")&&(patientDiseases[pat][disease]!="heartbeat")) sumDiseases[currRoom][disease][3]++;
								break; case 0:
									sumDiseases[currRoom][disease][4]++;
									if((patientDiseases[pat][disease]!="cured")&&(patientDiseases[pat][disease]!="heartbeat")) sumDiseases[currRoom][disease][5]++;
							}
						}
					}

					newtr = createElement("tr","",newtablebody);
					newtd = createElement("td","",newtr);
					newtd = createElement("td","",newtr,texte["frei"]);
					newtd = createElement("td","",newtr,texte["inBehandlung"]);
					newtd = createElement("td","",newtr,texte["waitingroom"]);
					for(var r in sumDiseases){
						newtr = createElement("tr","",newtablebody);
						newtd = createElement("td","",newtr,Global.availableRooms[r].name);
						for(var v=0;v<3;v++){
							var totalTime = 0;
							newtd = createElement("td",{style:(v==2?"padding-right:15px;":"")},newtr);
							for(var disease in sumDiseases[r]) if(sumDiseases[r][disease][2*v]>0){
								newdiv = createElement("div",{style:"float:left;margin-right:2px;"},newtd);
								createElement("div",{class:"d_a_30 d_"+disease+"_30"},newdiv);
								createElement("div","",newdiv,time2str(Global.availableDiseases[disease]["basetime"],1));
								createElement("div","",newdiv,sumDiseases[r][disease][2*v+1]+"/"+sumDiseases[r][disease][2*v]);
								totalTime += sumDiseases[r][disease][2*v+1]*Global.availableDiseases[disease]["basetime"];
							}
							newdiv = createElement("div",{style:"float:left;margin-right:2px;font-weight:bold;padding-top:20px;"},newtd,time2str(totalTime,1));
						}
					}
				}
			}
			buildPatientsTable(1,true,false);
		}
		}
	}

	// Quicklinks
	var arrQuicklinks = [[],
	["Apotheke Pillenexpress","shop1",1,1],[Ae+"rztevereinigung und Wettbewerb","guildhouse",3,1],["Rathaus","townhall",3,1],["Medizinischer Gro"+sz+"handel","shop2",1,1],["Zeitungsredaktion","editoraloffice",3,1],
	["Autoh"+ae+"ndler","ambulancestore",3,2],["Forschungszentrum","rcenter",3,2],[],["Internetcafe","shop3",1,2],["Architekturb"+ue+"ro","architect",3,2],
	["Tante-Emma-Laden","shop4",1,2],["Bushaltestelle","busstop",3,1],["Speakers Corner","speakers",3,1],["Garage","garage",2,1],["Bank","bank",3,1],
	["Patientenb"+oe+"rse","exchange",2,1],["Fr"+ae+"ulein Rosenwasser","goodgirl",3,1],["Dr. Knievel","badboy",3,2]];
	newdiv = createElement("div",{id:"quicklinks"},all);
	var day = (new Date()).getDay();
	var city2Allowed = (Global.ISPREMIUM || (day==3) || (day==6));
	for(var mode=1;mode<4;mode++){
		for(var v=1;v<arrQuicklinks.length;v++) if(arrQuicklinks[v][2]==mode){
			var newdiv1 = createElement("div",{id:v,class:"hoverlightblue",title:arrQuicklinks[v][0]},newdiv);
			createElement("div",{class:"cursorclickable c1_a_50 c1_"+v+"_50",title:arrQuicklinks[v][0]},newdiv1);
			if((arrQuicklinks[v][3]==1) || city2Allowed){
				newdiv1.addEventListener("click",function(){
					unsafeWindow.show_page(arrQuicklinks[this.id][1]);
				},false);
			} else {
				newdiv1.style.opacity = "0.3";
			}
		}
		createElement("div",{style:"clear:both;"},newdiv);
		createElement("div",{style:"height:20px;width:100px;"},newdiv);
	}
	
	// Hotkeys
	if (GM_getValue(lng+"_"+server+"_"+username+"_valHotkey",true)){
		window.addEventListener("keydown",function(event){
			if (event.altKey){
			switch (event.keyCode) {
			case 49: if($("floor_jump_1")){ closeInfoPanel();click($("floor_jump_1")); } event.preventDefault(); break; // Ebene 1
			case 50: if($("floor_jump_2")){ closeInfoPanel();click($("floor_jump_2")); } event.preventDefault(); break; // Ebene 2
			case 51: if($("floor_jump_3")){ closeInfoPanel();click($("floor_jump_3")); } event.preventDefault(); break; // Ebene 3
			case 52: if($("floor_jump_4")){ closeInfoPanel();click($("floor_jump_4")); } event.preventDefault(); break; // Ebene 3
			case 66: unsafeWindow.show_page("exchange"); event.preventDefault(); break; // B:Boerse
			case 71: unsafeWindow.show_page("garage"); event.preventDefault(); break; // G:Garage
			case 80: buildInfoPanel("patients"); event.preventDefault(); break; // P:Patients
			}
			}
		},false);
	}

	function initPatient(patientId){
	Log("initPatient "+patientId);
		if(!patientDiseases[patientId]){
			patientDiseases[patientId] = new Object;
			patientDiseases[patientId]["m"] = 0;
			patientDiseases[patientId]["floor"] = 1;
			//patientDiseases[patientId]["xml"] = 0;
			var help = Global.refPatients.get("p"+patientId);
			if(help){
				patientDiseases[patientId]["floor"] = help["floor"];
				for(var v=0;v<help["diseases"].length;v++){
					patientDiseases[patientId][help["diseases"][v]] = "";
					patientDiseases[patientId]["room"+Global.availableDiseases[help["diseases"][v]]["room"][0]] = 1;
				}
			}
			calcPatientState(patientId);
		}
	}

	function calcPatientState(patientId){
		var help = Global.refPatients.get("p"+patientId);
		var help2 = null;
		if(help){ help2 = Global.refRooms.get(help["room"]); }
		if($("p"+patientId)){
			if($("p"+patientId).getAttribute("class").search("waitingpatient")!=-1){
				patientDiseases[patientId]["state"]=0;
				patientDiseases[patientId]["room"]=0;
			} else {
				if(help2){
					patientDiseases[patientId]["state"]=(help2["roomid"]==6)?1:3;
					patientDiseases[patientId]["room"]=help2["roomid"];
				} else {
					patientDiseases[patientId]["state"]=1;
					patientDiseases[patientId]["room"]=6;
				}				
			}
		} else {
			if(help2){
				patientDiseases[patientId]["state"]=(help2["roomid"]==6)?2:4;
				patientDiseases[patientId]["room"]=help2["roomid"];
			} else {
				patientDiseases[patientId]["state"]=2;
				patientDiseases[patientId]["room"]=6;
			}
		}			
	}

	function plotPatient(target,currPatientId,showCured,minipic){ //(target) , (target,showCured)
		if(!isNaN(currPatientId)){
			if(typeof(showCured)!="boolean"){ showCured = true; }
		} else {
			if(typeof(currPatientId)=="boolean"){ showCured = currPatientId; }
			else { showCured = true; }
			currPatientId = parseInt(target.getAttribute("name"),10);
		}
		if(typeof(minipic)!="boolean"){ minipic = false; }
		Log("plotPatient "+currPatientId+" "+showCured+" "+minipic);
		target.innerHTML = "";
		if(!patientDiseases[currPatientId]){ initPatient(currPatientId); }
		Log(patientDiseases[currPatientId]);
		// diseases
		var usedRooms = new Object();
		var newdiv;
		for(var disease in patientDiseases[currPatientId]) if(!isNaN(disease)){
			if(showCured || patientDiseases[currPatientId][disease]!="cured"){
				newdiv = createElement("div",{style:"float:left;"},target);
				if(minipic){
					newdiv1 = createElement("div",{class:"d_a_15 d_"+disease+"_15"},newdiv);
					if(patientDiseases[currPatientId][disease]=="cured"){
						createElement("div",{class:"treatment_icon_15 treatment_icon_15_1"},newdiv1);
					}
				} else {
					newdiv1 = createElement("div",{class:"d_a_30 d_"+disease+"_30"},newdiv);
					if(patientDiseases[currPatientId][disease]){
						createElement("div",{class:"treatmenticons "+patientDiseases[currPatientId][disease]+"s"},newdiv1);
					}
					if(patientDiseases[currPatientId][disease]!="cured"){
						newdiv2 = createElement("div","",newdiv,time2str(Global.availableDiseases[disease]["basetime"],1));
						if (!usedRooms[Global.availableDiseases[disease]["room"][0]]){
							usedRooms[Global.availableDiseases[disease]["room"][0]] = 1;
							newdiv2.style.fontWeight = "bold";
						}
					}
				}
			}
		}
		// nurse
		if(patientDiseases[currPatientId]["m"]==4){
			if(minipic){
				newdiv = createElement("div",{style:"position:relative;float:left;width:15px;height:15px;"},target);
				createElement("div",{class:"treatment_icon_15 treatment_icon_15_1"},newdiv);
			} else {
				newdiv = createElement("div",{style:"position:relative;float:left;width:30px;height:30px;"},target);
				createElement("div",{class:"treatmenticons cureds"},newdiv);
			}
		}
		newdiv=null;
	}

	function highlightPatients(roomid){
	Log("highlightPatients "+roomid);
		// Patients
		var canddiv = $("garten_komplett").getElementsByClassName("patient");
		for(var v=0;v<canddiv.length;v++){
			canddiv[v].style.border="";
			var currPatientId = parseInt(canddiv[v].id.replace("p",""),10);
			if(patientDiseases[currPatientId]){
				if(patientDiseases[currPatientId]["room"+roomid]){
					canddiv[v].style.border="3px solid blue";
				}
			} else { initPatient(currPatientId); }
		}
		// in Rooms
		var canddiv = $("garten_komplett").getElementsByClassName("room");
		for(var v=0;v<canddiv.length;v++){
			canddiv[v].style.backgroundColor="";
			var currPatientId = Global.refRooms.get(canddiv[v].id)["patient"];
			if(currPatientId){
				if(!$("p"+currPatientId)){
					if(patientDiseases[currPatientId]){
						if(patientDiseases[currPatientId]["room"+roomid]){
							canddiv[v].style.backgroundColor="blue";
						}
					} else { initPatient(currPatientId); }
				}
			}
		}
		canddiv=null;
	}
	function unhighlightPatients(){
		Log("unhighlightPatients");
		var canddiv = $("garten_komplett").getElementsByClassName("patient");
		for(var v=0;v<canddiv.length;v++){
			canddiv[v].style.border="";
		}
		var canddiv = $("garten_komplett").getElementsByClassName("room");
		for(var v=0;v<canddiv.length;v++){
			canddiv[v].style.backgroundColor="";
		}
		canddiv=null;
	}

	function calcCurrDisease(patientId){ // returns current treatment
		var result = null;
		if(patientDiseases[patientId]){
			for(var v in patientDiseases[patientId]) if((!isNaN(v)) && (patientDiseases[patientId][v]=="heartbeat")){
				result = v; break;
			}
			if(!result){ // no treatment found, set one
				var currPatient = Global.refPatients.get("p"+patientId);
				var currRoom = Global.refRooms.get(currPatient["room"]);
				if(currRoom){
					if(patientDiseases[patientId]["room"+currRoom.roomid]) delete patientDiseases[patientId]["room"+currRoom.roomid];
					for(var disease in patientDiseases[patientId]) if((!isNaN(disease))&&(patientDiseases[patientId][disease]!="cured")) {
						for(var roomDiseaseNr=0;roomDiseaseNr<Global.availableRooms[currRoom.roomid]["diseases"][roomDiseaseNr];roomDiseaseNr++){
							if(disease==Global.availableRooms[currRoom.roomid]["diseases"][roomDiseaseNr]){
								if(!result){
									patientDiseases[patientId][disease] = "heartbeat";
									result = disease;
								} else {
									patientDiseases[patientId]["room"+currRoom.roomid]=1;
								}
							}
						}
					}
				}
			}
		} else { initPatient(patientId);result=calcCurrDisease(patientId); }
		calcComesNext(patientId);
		return result;
	}

	function calcComesNext(patientId){
		Log("calcComesNext "+patientId);
		if(patientDiseases[patientId]){
			var currRoomId = null;
			for(var disease in patientDiseases[patientId]) if(!isNaN(disease) && (patientDiseases[patientId][disease] == "heartbeat")){
				currRoomId = Global.availableDiseases[disease]["room"][0]; break;
			}
			if(currRoomId){
				for(var disease in patientDiseases[patientId]) if(!isNaN(disease) && (patientDiseases[patientId][disease] == "") && (currRoomId == Global.availableDiseases[disease]["room"])){
					patientDiseases[patientId][disease] = "comesnext";
				}
			}
		} else { initPatient(patientId); }
	}
	
	function calcEndTreatment(patientId){
		Log("calcEndTreatment "+patientId);
		if(patientDiseases[patientId]){
			var cured = true;
			for(var v in patientDiseases[patientId]) if(!isNaN(v)){
				var currDiseaseRoom = Global.availableDiseases[v]["room"][0];
				if(patientDiseases[patientId][v]=="heartbeat"){ 
					patientDiseases[patientId][v]="cured";
					if(patientDiseases[patientId]["room"+currDiseaseRoom]){ delete patientDiseases[patientId]["room"+currDiseaseRoom]; }
				} else {
					if(patientDiseases[patientId][v]=="comesnext"){ patientDiseases[patientId][v]=""; }
					if(patientDiseases[patientId][v]!="cured"){ 
						cured=false; 
						patientDiseases[patientId]["room"+currDiseaseRoom] = 1;
					}
				}
			}
			if(cured&&(patientDiseases[patientId]["m"]>3)){ patientDiseases[patientId]["state"] = 5; }
		} else { initPatient(patientId); }	
	}

	window.setInterval(function(){
		now = Math.floor((new Date()).getTime()/1000);
		rooms = Global.refRooms.values();
		patients = Global.refPatients.values();
		var currPatientId = 0;
		var currRoom = null;
		if(!roomTimes[Global.selectedFloor]){ roomTimes[Global.selectedFloor] = new Object; }
		var calcGlobalTime = false;
		roomTimes["allrooms"][Global.selectedFloor] = 0;
		// Rooms
		var cand = document.getElementsByClassName("room");
		if(Global.nonEmptyFields[0]){
			for(var v=0;v<cand.length;v++){
				if(currRoom = Global.refRooms.get(cand[v].id)){ 
					if(currRoom["roomid"]==6){ // Bed
						if(currPatientId = parseInt(currRoom["patient"],10)){
							if(patientDiseases[currPatientId]){
								if(!$("p"+currPatientId)){
									patientDiseases[currPatientId]["state"] = 2; 
									patientDiseases[currPatientId]["floor"] = 1;
									patientDiseases[currPatientId]["room"] = 6;
								}
							} else { initPatient(currPatientId); }
						} 
					} else if((Global.availableRooms[currRoom["roomid"]])&&(Global.availableRooms[currRoom["roomid"]]["diseases"].length>0)){ // Behandlungsraum
						roomTimes["allrooms"][Global.selectedFloor]++;
						if(currRoom["state"]==3){
							if((!roomTimes[Global.selectedFloor][currRoom["topleft"]])||(currRoom["ends"]!=roomTimes[Global.selectedFloor][currRoom["topleft"]][0])){
								roomTimes[Global.selectedFloor][currRoom["topleft"]] = [currRoom["ends"],now+currRoom["ends"],3];
								calcGlobalTime = true;
							}
							if($("gradient_r"+currRoom["topleft"])){
								if(currPatientId = parseInt(currRoom["patient"],10)){
									if(patientDiseases[currPatientId]){
										patientDiseases[currPatientId]["state"] = 4; 
										patientDiseases[currPatientId]["floor"] = Global.selectedFloor;
										patientDiseases[currPatientId]["room"] = currRoom["roomid"];
									} else { initPatient(currPatientId); }
								} 
								if(!$("timeinfo_"+currRoom.topleft)){ createElement("div",{id:"timeinfo_"+currRoom.topleft,style:"position:absolute;bottom:23px;left:13px;font-weight:bold;background-color:white;"},$("r"+currRoom.topleft)); }
								$("timeinfo_"+currRoom.topleft).innerHTML = time2str(roomTimes[Global.selectedFloor][currRoom["topleft"]][1]-now);
		
								// Medis
								if($("alert"+currRoom.topleft)){
									var currDisease = null;
									if(currDisease = calcCurrDisease(currRoom["patient"])){
										if(!$("mediinfo_"+currRoom.topleft)){ createElement("div",{id:"mediinfo_"+currRoom.topleft,style:"position:absolute;top:5px;left:5px;font-weight:bold;background-color:white;-moz-border-radius:5px;"},$("r"+currRoom.topleft)); }
										$("mediinfo_"+currRoom.topleft).setAttribute("class","m_a_30 m_"+medi[currDisease]["id"]+"_30");
									}
								} else {
									if($("mediinfo_"+currRoom.topleft)){ removeElement($("mediinfo_"+currRoom.topleft)); }
								}
							} else {
								if($("timeinfo_"+currRoom.topleft)){ removeElement($("timeinfo_"+currRoom.topleft)); }
								if($("mediinfo_"+currRoom.topleft)){ removeElement($("mediinfo_"+currRoom.topleft)); }
							}
						} else {
							if((!roomTimes[Global.selectedFloor][currRoom["topleft"]])||(currRoom["state"]!=roomTimes[Global.selectedFloor][currRoom["topleft"]][2])){ calcGlobalTime = true; }
							roomTimes[Global.selectedFloor][currRoom["topleft"]] = [0,0,currRoom["state"]];
							if($("timeinfo_"+currRoom.topleft)){ removeElement($("timeinfo_"+currRoom.topleft)); }
							if($("mediinfo_"+currRoom.topleft)){ removeElement($("mediinfo_"+currRoom.topleft)); }
						}
					}
				}
			}
		}
	//Log(roomTimes);	

		if(roomTimes["global"][0]<=now){ calcGlobalTime = true; }
		if(calcGlobalTime){
			Log("calcGlobalTime");
			roomTimes["global"][0] = nie;
			//roomTimes["allrooms"][0] = 0;
			roomTimes["emptyrooms"][0] = 0;
			roomTimes["global"][Global.selectedFloor] = nie;
			for(var floor=1;floor<roomTimes["global"].length;floor++){
				roomTimes["global"][floor] = nie;
				roomTimes["emptyrooms"][floor] = 0;
				for(var help in roomTimes[floor]){ 
					if(roomTimes[floor][help][1]<=now){ roomTimes["emptyrooms"][floor]++; }
					else { roomTimes["global"][floor] = Math.min(roomTimes["global"][floor],roomTimes[floor][help][1]); }
				}
				roomTimes["global"][0] = Math.min(roomTimes["global"][0],roomTimes["global"][floor]); 
				//roomTimes["allrooms"][0] += roomTimes["allrooms"][floor];
				roomTimes["emptyrooms"][0] += roomTimes["emptyrooms"][floor];
			}
		}
		if(valGlobalClockInTitle){
			document.title = (roomTimes["global"][0]<nie?time2str(roomTimes["global"][0]-now):texte["fertig"].toUpperCase())+" - "+roomTimes["emptyrooms"][0]+" - "+documentTitle;
		} else {
			if(!$("globalclock")){ createElement("div",{id:"globalclock",title:"global time",style:"position:absolute;top:0px;left:0px;font-weight:bold;background-color:white;"},all); }
			$("globalclock").innerHTML = (roomTimes["global"][0]<nie?time2str(roomTimes["global"][0]-now):texte["fertig"].toUpperCase())+" - "+roomTimes["emptyrooms"][0];
		}
		if(!$("floorclock")){ createElement("div",{id:"floorclock",title:"floor time",style:"position:absolute;top:5px;left:20px;font-weight:bold;background-color:white;"},$("hospital_content")); }
		$("floorclock").innerHTML = ((roomTimes["allrooms"][Global.selectedFloor]>0)?(roomTimes["global"][Global.selectedFloor]<nie?time2str(roomTimes["global"][Global.selectedFloor]-now):texte["fertig"].toUpperCase()):"---")+" - "+roomTimes["emptyrooms"][Global.selectedFloor];
		
		// Patients Divs
		var canddiv = $("hospital_content").getElementsByClassName("patient");
		for(var pat=0;pat<canddiv.length;pat++){
			currPatientId = parseInt(canddiv[pat].id.replace("p",""),10);
			if(patientDiseases[currPatientId]){
				patientDiseases[currPatientId]["floor"] = Global.refPatients.get("p"+currPatientId)["floor"];
				var classStr = canddiv[pat].getAttribute("class").replace(" allcured","").replace(" unhealable","").replace(" needminitreatment","");
				if(patientDiseases[currPatientId]["state"]!=5){
					if(patientDiseases[currPatientId]["state"]==2){
						patientDiseases[currPatientId]["m"]++;
						calcEndTreatment(currPatientId);
					} else if(patientDiseases[currPatientId]["state"]==4){
						calcEndTreatment(currPatientId);
					}
					if(patientDiseases[currPatientId]["state"]!=5){
						patientDiseases[currPatientId]["room"] = Global.refRooms.get(Global.refPatients.get("p"+currPatientId)["room"])["roomid"];
						if(patientDiseases[currPatientId]["room"]==6){ patientDiseases[currPatientId]["state"] = 1; }
						else { patientDiseases[currPatientId]["state"] = 3; }
					}
					if(patientDiseases[currPatientId]["m"]<4){ classStr += " needminitreatment"+(patientDiseases[currPatientId]["unhealable"]?" unhealable":""); }
					else if(patientDiseases[currPatientId]["unhealable"]){ classStr += " unhealable"; }
				} else {
					classStr += " allcured";
				}
				canddiv[pat].setAttribute("class",classStr);
			} else { initPatient(currPatientId); }
		}

		// waiting patients
		canddiv = $("waitingroom").getElementsByClassName("waitingpatient");
		for(var pat=0;pat<canddiv.length;pat++){
			canddiv[pat].style.opacity = ((Global.refPatients.get(canddiv[pat].id).referred!=0)?"0.4":"1"); //verkaufte
			var currPatientId = parseInt(canddiv[pat].id.replace("p",""),10);
			if(patientDiseases[currPatientId]){
				patientDiseases[currPatientId]["floor"] = 0;
				patientDiseases[currPatientId]["room"] = 0;
				if(patientDiseases[currPatientId]["unhealable"]){ canddiv[pat].setAttribute("class",canddiv[pat].getAttribute("class").replace(" unhealable","")+" unhealable"); }
				if(patientDiseases[currPatientId]["state"]>0){ patientDiseases[currPatientId]["state"]=0; }
			} else { initPatient(currPatientId); }
		}
		canddiv=null;
		
		// QuestClock
		if(!$("questclock")){ createElement("div",{id:"questclock",title:"quest time",style:"position:absolute;bottom:0px;right:0px;font-weight:bold;background-color:white;"},$("waitingroom")); }
		$("questclock").innerHTML = ((questTime>now)?time2str(questTime-now):texte["fertig"].toUpperCase());
	},1000);

	window.setInterval(function(){ // leaving patient
		var cand = $("goingpatient").getElementsByClassName("patient");
		for(var v=0;v<cand.length;v++){
			var currPatientId = parseInt(cand[v].id.replace("p",""),10)
			if(patientDiseases[currPatientId]){ delete patientDiseases[currPatientId]; }
		}
		//<div style="position: absolute; left: 46px; width: 25px; height: 36px; top: 31px; 
		//background-image: url(&quot;http://pics.kapihospital.de/patient3_walksaway.gif&quot;); z-index: 1000;" 
		//class="patient cursordrag allcured" id="p9233468"></div>
	},500);
	
	window.setInterval(function(){
		var cand = $("rackItems").getElementsByClassName("medamount");
		for(var v in cand){
			var help = cand[v].getAttribute("class");
			if(parseInt(cand[v].innerHTML,10)<valRackLimit){
				if(help.search(" racklow")==-1){ cand[v].setAttribute("class",help+" racklow"); }
			} else {
				if(help.search(" racklow")!=-1){ cand[v].setAttribute("class",help.replace(" racklow","")); }
			}
		}
		for(var pat in patientDiseases){
			if((patientDiseases[pat]["state"]==0)&&(!$("p"+pat))){ // waiting+gone
				delete patientDiseases[pat];
			}
		}
		GM_setValue(lng+"_"+server+"_"+username+"_patientDiseases",implode(patientDiseases));
		cand=null;
	},5000);
	
	// Patient-MouseOver Diseases
	var beraterDiseaseBubble = createElement("div",{id:"beraterDiseaseBubble",style:"z-index:2000;position:absolute;top:0px;left:0px;background-color:#CCC;-moz-border-radius:10px;border:2px solid black;padding:3px;margin-left:40px;"},all);
	hiddenPatientDiv = createElement("div",{id:"hiddenPatientDiv",style:"display:;"},all);
	$("garten_komplett").addEventListener("mouseover",function(event){
		Log("MOUSEOVER "+event.target.id);
		var patientId=0;
		if(!isNaN(event.target.id.replace("r",""))){
			var currRoom = Global.refRooms.get(event.target.id);
			highlightPatients(currRoom.roomid);
			patientId = currRoom.patient;
		}
		else if(!isNaN(event.target.id.replace("p",""))){
			patientId = event.target.id.replace("p","");
		}
		beraterDiseaseBubble.innerHTML = "";
		if(patientId!=0){
			beraterDiseaseBubble.style.display="block";
			beraterDiseaseBubble.setAttribute("name",patientId);
			plotPatient(beraterDiseaseBubble);
			//getPatientData(patientId);
		}
	},false);
	$("garten_komplett").addEventListener("mousemove",function(event){
		beraterDiseaseBubble.style.left = event.pageX+"px";
		beraterDiseaseBubble.style.top = event.pageY+"px";
	},false);
	$("garten_komplett").addEventListener("mouseout",function(event){
		beraterDiseaseBubble.style.display="none";
		unhighlightPatients();
	},false);

	// Frame Observer
	newswindowObserver = window.setInterval(function(){
		if(($("newswindow").style.display!="none")&&(!$("newswindowObserver"))){
			createElement("h1",{id:"newswindowObserver"},$("newswindow"));
			if($("msgwindow")){
				var help = $("msgwindow").getAttribute("style");
				if(help.search("medicalrecord_1.png")!=-1){ do_Patientenblatt(); }
				else if(help.search("bg_exchange2.jpg")!=-1){ do_Patientenboerse(); }
				else if(help.search("bg_notes.png")!=-1){ do_Notepad(); }
				else if(help.search("bg_questfinished")!=-1){ do_Quest(); }
				else if(help.search("bg_garage")!=-1){ do_Quest(); }
				else if(help.search("quest_bg")!=-1){ do_Quest(); }
				else if(help.search("bg_shop")!=-1){ do_Shop(); }
				else if(help.search("bg_mail")!=-1){ do_Mail(); }
			}
		}
	},200);

	// Rack
	$("rackItems").addEventListener("dblclick",function(event){
		var shop = Global.availableMedics._object["med"+event.target.getAttribute("medid")]["shop"];
		if((shop<3)||city2Allowed){
			unsafeWindow.show_page("shop"+shop);
		} else {
			alert(texte["shopHeuteNichtErreichbar"]);
		}
	},false);

	newdiv=null;newdiv1=null;newbutton=null;

	function do_Patientenblatt(){
		var currPatientId = parseInt((/MedicalRecord\.\_onclick\(this, (\d+)/).exec($("msgwindow").innerHTML)[1],10);
		var currPatient = Global.refPatients.get("p"+currPatientId);
		// diseases
		var canddiv = $("msgwindow").getElementsByTagName("div");
		for(var v=0;v<canddiv.length;v++){if(canddiv[v].id=="medi_diseases")break;}
		patientDiseases[currPatientId] = new Object;
		var cured = true;
		for(var w=0;w<canddiv[v].childNodes.length-3;w++){
			var disease = (/d_(\d+)_50/).exec(canddiv[v].childNodes[w].childNodes[1].getAttribute("class"))[1];
			if(canddiv[v].childNodes[w].childNodes[1].firstChild){
				patientDiseases[currPatientId][disease] = (/(.+) (.+)/).exec(canddiv[v].childNodes[w].childNodes[1].firstChild.getAttribute("class"))[2];
				if(patientDiseases[currPatientId][disease]=="notreatment"){ patientDiseases[currPatientId]["unhealable"] = 1; }
				if(patientDiseases[currPatientId][disease]!="cured"){ cured=false; }
			} else {
				patientDiseases[currPatientId][disease] = "";
				patientDiseases[currPatientId]["room"+Global.availableDiseases[disease]["room"][0]] = 1;
				cured = false;
			}
		}
		// nurse
		var canddiv = $("msgwindow").getElementsByClassName("minitreatment");
		patientDiseases[currPatientId]["m"] = 4;
		for(var v=0;v<canddiv.length;v++) if(canddiv[v].style.backgroundImage==""){ 
			patientDiseases[currPatientId]["m"]--; 
			cured=false;
		}
		if(cured){ patientDiseases[currPatientId]["state"]=5; }
		else {
			calcComesNext(currPatientId);
			calcPatientState(currPatientId);
		}
		var maxprice = parseFloat($("med_price").getElementsByTagName("span")[0].innerHTML.split("-")[1].replace(Global._KH_THOUSANDSEPERATOR,"").replace(Global._KH_DECIMALSEPERATOR,"."),10)
		createElement("div",{"style":"position:absolute;top:380px;right:130px;color:red;"},$("ref_divdetailsbig"),"85%: "+hT_formatgr(0.85*maxprice)+", 90%: "+hT_formatgr(0.9*maxprice)+", 95%: "+hT_formatgr(0.95*maxprice));
		
		var newimg = createElement("img",{"style":"position:absolute;top:440px;left:219px;width:16px;height:16px;","src":"http://pics.kapihospital.de/addressbook.gif","class":"cursorclickable","title":"Adressbuch"},$("ref_divdetailsbig"));
		newimg.addEventListener("click",function(){
			var newdiv = createElement("div",{"id":"refAdressBook","style":"top:70px;width:265px;height:350px;position:absolute;z-index:30;right:0px;background:url('http://pics.kapihospital.de/addressbook_newmsg.gif') no-repeat scroll left top transparent;overflow:visible;"},$("ref_divdetails"));
			var newdiv1 = createElement("div",{"style":"position:absolute;left:12px;top:5px;z-index:2;width:15px;height:10px;","class":"cursorclickable","title":"schlie"+sz+"en"},newdiv);
			newdiv1.addEventListener("click",function(){
				removeElement($("refAdressBook"));
			},false);	
			createElement("div",{"style":"z-index:1;position:absolute;width:165px;top:15px;left:45px;right:15px;text-align:center;font-weight:bold;font-size:medium;"},newdiv,"Adressbuch");
			newdiv1 = createElement("div",{"style":"position:absolute;width:180px;height:225px;top:50px;left:45px;right:0px;overflow-y:auto;overflow-x:hidden;"},newdiv);
			var newtable = createElement("table",{"cellspacing":"0"},newdiv1);
			contacts = explode(GM_getValue(lng+"_"+server+"_"+username+"_contacts","[]"));
			for(var v=0;v<contacts.length;v++){
				newdiv1 = createElement("div",{"class":"cursorclickable"},createElement("td",{},createElement("tr",{},newtable)),contacts[v]);
				newdiv1.addEventListener("click",function(){
					$("ref_recipient").value = this.innerHTML;
					removeElement($("refAdressBook"));
				},false);
			}
			newdiv=null;newdiv1=null;newtable=null;newdiv1=null;
		},false);
		canddiv=null;newimg=null;
	}
	
	function do_Quest(){
		Log("do_Quest");
		if($("ga_running")){
			if($("ga_running").style.display != "none"){
				questTime = now+unsafeWindow.Garage["ends"];
				GM_setValue(lng+"_"+server+"_"+username+"_questTime",questTime);
			} else {
				window.setTimeout(do_Quest,200);
			}
		}
	}	
}

function do_Mail(){
	var keyMsgShow = /showMessage\(['|\s]*(\d+)['|\s]*,'(.*?)'\)/;
	var keyMsgDelete = /deleteMessage\(['|\s]*(\d+)['|\s]*,\s*this,\s*'(.*?)'\)/;
	var candtable = $("msgwindow").getElementsByTagName("table");
	var cand = null;
	var help = null;
	if(candtable[0]){
		cand = candtable[0].getElementsByTagName("a");
		if(cand[0]&&(help = keyMsgShow.exec(cand[0].href))){
			if (help[2]=="inbox"){
				// Inbox
				var msgIdIn = new Array;
				for(var v=0;v<cand.length;v++){
					help = keyMsgShow.exec(cand[v].href);
					if(help){ msgIdIn.push(help[1]); }
				}
				GM_setValue(lng+"_"+server+"_"+username+"msgIdIn",implode(msgIdIn));
				cand = candtable[0].getElementsByTagName("input");
				for(var v=0;v<cand.length;v++){
					cand[v].setAttribute("title","Alt+Klick um alle Gleichen zu markieren");
					cand[v].addEventListener("click",function(event){
						if(event.altKey){
							var cand = this.parentNode.parentNode.getElementsByTagName("a");
							var cand2=null;
							var help = [this.checked,cand[0].innerHTML,cand[1].innerHTML];
							cand = this.parentNode.parentNode.parentNode.getElementsByTagName("tr");
							for(var v=0;v<cand.length;v++){
								cand2 = cand[v].getElementsByTagName("a");
								if((help[1]==cand2[0].innerHTML)&&(help[2]==cand2[1].innerHTML)){
									cand[v].getElementsByTagName("input")[0].checked = help[0];
								}
							}
							cand=null;cand2=null;help=null;
						}
					},false);
				}
			}
		} else {
			cand = $("msgNavigation").getElementsByTagName("input");
			if(cand.length>1){ 
				// InMessage
				var help = keyMsgDelete.exec(cand[cand.length-2].getAttribute("onclick"));
				if(help){
					if (help[2]=="inbox"){
						var msgIdIn = explode(GM_getValue(lng+"_"+server+"_"+username+"msgIdIn","[]"));
						for(var c=0;c<msgIdIn.length;c++) if(msgIdIn[c]==help[1]) break;
						if(c>0) createElement("input",{"type":"button","value":"vorige Nachricht","onclick":"javascript:Messages.showMessage("+msgIdIn[c-1]+",'inbox');","class":"cursorclickable msg_input"},$("msgNavigation"));
						if(c<msgIdIn.length-1) createElement("input",{"type":"button","value":"n"+ae+"chste Nachricht","onclick":"javascript:Messages.showMessage("+msgIdIn[c+1]+",'inbox');","class":"cursorclickable msg_input"},$("msgNavigation"));
					}
				}
			}
			if($("deleteContact")){
				// contacts
				var contacts = new Array();
				cand = candtable[0].getElementsByTagName("tr");
				for(var tr=1;tr<cand.length-3;tr++){
					contacts.push(/(.*?)&nbsp;/.exec(cand[tr].getElementsByTagName("td")[0].innerHTML)[1]);
				}
				GM_setValue(lng+"_"+server+"_"+username+"_contacts",implode(contacts));
			}
		}
	}
	candtable=null;cand=null;
}

function do_Notepad(){
	removeElement($("premiumicon"));
	$("msg_body").disabled = "";
	$("msg_body").value = GM_getValue(lng+"_"+server+"_"+username+"_notepad","");
	$("msg_body").addEventListener("keyup",function(){
		GM_setValue(lng+"_"+server+"_"+username+"_notepad",this.value);
	},false);
}

function do_Patientenboerse(){
Log("do_Patientenboerse");
	createElement("div",{style:"z-index:0;position:absolute;top:0px;right:0px;height:500px;width:250px;background-image: url('http://pics.kapihospital.de/bg_exchange2.jpg');background-position:250px 0px;"},$("msgwindow"));
	$("msgwindow").style.width = "750px";
	$("ex_bubble").style.width="";
	$("ex_bubble").style.zIndex="1";
	var newdiv = createElement("div",{style:"position:absolute;bottom:0px;left:20px;"},$("msgwindow"));
	var valShowUncurable = GM_getValue(lng+"_"+server+"_"+username+"_valShowUncurable",false);
	var highlightBoerse=new Object;
	var highlightBoerse1=new Object;
	try{highlightBoerse = explode(GM_getValue(lng+"_"+server+"_"+username+"_highlightBoerse","{}"));}catch(err){}
	try{highlightBoerse1 = explode(GM_getValue(lng+"_"+server+"_"+username+"_highlightBoerse1","{}"));}catch(err){}
	var blockBoerse = explode(GM_getValue(lng+"_"+server+"_"+username+"_blockBoerse","{}"));
	var newdiv1 = createElement("div",{style:"display:block;"},newdiv);
	var newinput = createElement("input",{"id":"valShowUncurable","type":"checkbox","checked":valShowUncurable},newdiv1);
	newinput.addEventListener("click",function(){
		GM_setValue(lng+"_"+server+"_"+username+"_valShowUncurable",this.checked);
		click($("ex_navi").getElementsByTagName("div")[1]);
	},false);
	createElement("span",{},newdiv1,texte["showUncurable"]);
	var newdiv1 = createElement("div",{style:"display:block;background-color:green;"},newdiv);
	var newdiv2 = createElement("div",{style:"display:block;background-color:yellow;"},newdiv);
	var newdiv3 = createElement("div",{style:"display:block;background-color:#900;"},newdiv);
	for(var r in Global.availableRooms) if(Global.availableRooms[r].diseases.length>0){
		newinput = createElement("input",{"id":"hl"+r,"type":"checkbox","checked":highlightBoerse[r],"title":Global.availableRooms[r].name,"style":"margin-right:0px;margin-left:1px;"},newdiv1);
		newinput.addEventListener("click",function(){
			highlightBoerse[this.id.replace("hl","")] = this.checked;
			GM_setValue(lng+"_"+server+"_"+username+"_highlightBoerse",implode(highlightBoerse));
			click($("ex_navi").getElementsByTagName("div")[1]);
		},false);		
		newinput = createElement("input",{"id":"hl1"+r,"type":"checkbox","checked":highlightBoerse1[r],"title":Global.availableRooms[r].name,"style":"margin-right:0px;margin-left:1px;"},newdiv2);
		newinput.addEventListener("click",function(){
			highlightBoerse1[this.id.replace("hl1","")] = this.checked;
			GM_setValue(lng+"_"+server+"_"+username+"_highlightBoerse1",implode(highlightBoerse1));
			click($("ex_navi").getElementsByTagName("div")[1]);
		},false);		
		newinput = createElement("input",{"id":"bl"+r,"type":"checkbox","checked":blockBoerse[r],"title":Global.availableRooms[r].name,"style":"margin-right:0px;margin-left:1px;"},newdiv3);
		newinput.addEventListener("click",function(){
			blockBoerse[this.id.replace("bl","")] = this.checked;
			GM_setValue(lng+"_"+server+"_"+username+"_blockBoerse",implode(blockBoerse));
			click($("ex_navi").getElementsByTagName("div")[1]);
		},false);		
	}
	var candtable = $("msgwindow").getElementsByTagName("table");
	candtable[0].style.width="650px";
	candtable[0].setAttribute("class","hoveryellow");
	var candtr = candtable[0].getElementsByTagName("tr");
	var candtd = candtr[0].getElementsByTagName("td");
	candtd[5].innerHTML = "Kaufen";
	createElement("td",{style:"text-align:right;"},candtr[0],"Differenz");
	createElement("td",{style:"text-align:right;"},candtr[0],"Restzeit");
	createElement("td","",candtr[0],"");
	for(var tr=1;tr<candtr.length;tr++){
		candtr[tr].setAttribute("onmouseover","");
		candtr[tr].setAttribute("onmouseout","");
		candtd = candtr[tr].getElementsByTagName("td");
		var restlicheZeit = 0;
		var help = null;
		var uncurable = false;
		var buyable = false;
		var unwanted = false;
		var mark1 = false;
		for(var c=0;c<candtd[2].childNodes.length;c++){
			var disease = Global.availableDiseases[(/d_(\d+?)_15/).exec(candtd[2].childNodes[c].getAttribute("class"))[1]];
			help = candtd[2].childNodes[c].firstChild.getAttribute("class").slice(-1);
			if(help!="1"){
				restlicheZeit += disease["basetime"];
				if(help=="2"){ uncurable = true; }
				else if(help=="0"){
					buyable = true;
					if(highlightBoerse[disease["room"][0]]){ candtd[2].style.backgroundColor="green"; }
					if(highlightBoerse1[disease["room"][0]]){ mark1 = true; }
					if(blockBoerse[disease["room"][0]]){ unwanted = true; }
				}
			}
		}
		if(uncurable){
			candtd[2].style.backgroundColor="red"; 
			if(unwanted||!buyable||!valShowUncurable){ candtr[tr].style.display="none"; }
		} else {
			if(unwanted||!buyable){ candtr[tr].style.display="none"; }
			else if( mark1 ){ candtd[2].style.backgroundColor="yellow"; }
		}
		var priceMax = parseFloat(candtd[3].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."),10)
		candtd[3].innerHTML = "&nbsp;"+number_format(priceMax,2);
		candtd[3].style.textAlign="right";
		candtd[4].style.textAlign="right";
		candtd[5].style.textAlign="right";
		var price = parseFloat(candtd[4].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."),10)
		candtd[4].innerHTML = "&nbsp;"+number_format(price,2);
		candtd[5].getElementsByTagName("a")[0].innerHTML = "&nbsp;"+number_format(100*price/priceMax)+"%";
		candtd[5].getElementsByTagName("a")[0].addEventListener("click",function(){
			clickYes = window.setInterval(function(){
				if(($("dlg_message").style.display!="none") && ($("btn_yes"))){
					click($("btn_yes"));
					clearInterval(clickYes);
				}
			},50);
		},false);
		createElement("td",{style:"text-align:right;"},candtr[tr],"&nbsp;"+(price>priceMax?"+":"")+number_format(price-priceMax,2));
		createElement("td",{style:"text-align:right;"},candtr[tr],"&nbsp;"+time2str(restlicheZeit,1)+"h");
		createElement("td",{style:"text-align:right;"},candtr[tr],"&nbsp;"+(price>priceMax?"---":number_format((priceMax-price)*3600/restlicheZeit)));
	}

	var canddiv = $("ex_navi").getElementsByTagName("div");
	canddiv[1].addEventListener("mouseover",function(){
		this.style.backgroundColor="blue";
		click(this);
	},false);
	newdiv=null;newselect=null;newselect1=null;candtable=null;candtr=null;candtd=null;canddiv=null;
}

function do_Shop(){
	var cand = $("dropzonesource").getElementsByTagName("div");
	for(var v in cand){
		cand[v].addEventListener("mousedown",function(){
			$("dropzonetarget").style.border = "2px solid red";
		},false);
		cand[v].addEventListener("mouseup",function(){
			$("dropzonetarget").style.border = "";
		},false);
	}
	cand=null;
}

//***********************************************************************************************************

function do_login(){
	var loc = reg2.exec(document.location.href);
	if (loc[2].search("logout")!=-1) {
		window.setTimeout(function(){ document.location.href="http://www"+gamepage; },100);//auf login-seite leiten
	} else {
		//paypal
		var newform = createElement("form",{id:"paypalForm",action:"https://www.paypal.com/cgi-bin/webscr",method:"post",style:"position:absolute;top:30px;left:100px;"},all);
		createElement("input",{type:"hidden",name:"cmd",value:"_donations"},newform);
		createElement("input",{type:"hidden",name:"business",value:"jessica_holtkamp@web.de"},newform);
		createElement("input",{type:"hidden",name:"lc",value:((lng=="de")?"DE":"US")},newform);
		createElement("input",{type:"hidden",name:"item_name",value:"KapiHospital Script"},newform);
		createElement("input",{type:"hidden",name:"no_note",value:"0"},newform);
		createElement("input",{type:"hidden",name:"currency_code",value:"EUR"},newform);
		createElement("input",{type:"hidden",name:"bn",valu:"PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest"},newform);
		var newinput = createElement("input",{type:"image",border:"0",src:"https://www.paypal.com/"+((lng=="de")?"de_DE/DE":"en_US")+"/i/btn/btn_donate_LG.gif",name:"submit",alt:"PayPal"},newform);
		createElement("img",{alt:"",border:"0",src:"https://www.paypal.com/en_US/i/scr/pixel.gif",width:"1",height:"1"},newform);
		newform=null;
		if (loc[2]=="?paypal"){
			click(newinput);
		} else {
			//login
			try{ var logindata = explode(GM_getValue("logindata","[]")); }
			catch(err){ var logindata= new Array; }
				
			unsafeWindow.showDiv("login_div");
			$("login_div").style.zIndex = "20";
			$("login_div").getElementsByClassName("kh_btn")[0].addEventListener("click",function(){
				var currServer = $("l_server").value;
				var currUser = $("l_loginname").value.toLowerCase();
				GM_setValue(lng+"_"+currServer+"_username",currUser);
			},false);
	
			function submit_login(currUserNr){
				$("l_server").value=logindata[currUserNr][1];
				$("l_loginname").value=logindata[currUserNr][2];
				$("l_password").value=logindata[currUserNr][3];
				$("login_div").getElementsByClassName("kh_btn")[0].click();
			} 
			
			var newdiv = createElement("div",{style:"position:absolute;top:0px;left:0px;width:412px;padding:10px;background-color:#999;-moz-border-radius:10px;"},$("login_div"));
			var newbutton;
			for (var v=0;v<logindata.length;v++) if (logindata[v][1]!="0") {
				newbutton=createElement("button",{type:"button",class:"cursorclickable",id:"autologin"+v,style:"width:200px;height:20px;margin:3px;"},newdiv,texte["server"]+" "+logindata[v][1]+"."+logindata[v][0]+": "+logindata[v][2]);
				newbutton.addEventListener("click",function(){
					submit_login(this.id.replace("autologin",""));
				},false);
			}
			newdiv=null;newbutton=null;
		}
		newinput=null;
	}
}

},false);