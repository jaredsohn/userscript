// ==UserScript==
// @name           KapiBados Berater
// @namespace      http://userscripts.org/scripts/show/82840
// @date           17.04.2011
// @include        http://*kapibados.de/*
// @include        http://*kapibados.fr/*
// @include        http://*kapibados.hu/*
// @include        http://*kapibados.nl/*
// @include        http://*zagubionawyspa.pl/*
// @include        http://*tr.kapibados.com/*
// @exclude        http://forum.kapibados.de/*
// @exclude        http://forum.kapibados.fr/*
// @exclude        http://forum.kapibados.hu/*
// @exclude        http://forum.kapibados.nl/*
// @exclude        http://forum.zagubionawyspa.pl/*
// @exclude        http://forum.tr.kapibados.com/*
// ==/UserScript==

window.addEventListener("load",function(){

// ********* funtions ********************************************************************
// Umlaute
const ae = "\u00E4";	const oe = "\u00F6";	const ue = "\u00FC";
const Ae = "\u00C4";	const Oe = "\u00D6";	const Ue = "\u00DC";
const sz = "\u00DF";

function $(ID) {return document.getElementById(ID)}
function $top(ID) {return top.document.getElementById(ID)}
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

function change(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("change", true, true);
	A.dispatchEvent(B);
	if (A.href){ document.location.href = A.href; }
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

// ********** Multilingual *****************************************************

if (document.location.href.search("kapibados.de")!=-1) {
	var lng = "de";
	var gamepage = ".kapibados.de";
	var reg = /http:\/\/s(\d+)\.kapibados\.de\/(.*?)\.php/i;
	var reg2 = /http:\/\/(.*)kapibados\.de\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
else if (document.location.href.search("kapibados.fr")!=-1) {
	var lng = "fr";
	var gamepage = ".kapibados.fr";
	var reg = /http:\/\/s(\d+)\.kapibados\.fr\/(.*?)\.php/i;
	var reg2 = /http:\/\/(.*)kapibados\.fr\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
else if (document.location.href.search("kapibados.hu")!=-1) {
	var lng = "hu";
	var gamepage = ".kapibados.hu";
	var reg = /http:\/\/s(\d+)\.kapibados\.hu\/(.*?)\.php/i;
	var reg2 = /http:\/\/(.*)kapibados\.hu\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
else if (document.location.href.search("zagubionawyspa.pl")!=-1) {
	var lng = "pl";
	var gamepage = ".zagubionawyspa.pl";
	var reg = /http:\/\/s(\d+)\.zagubionawyspa\.pl\/(.*?)\.php/i;
	var reg2 = /http:\/\/(.*)zagubionawyspa\.pl\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
else if (document.location.href.search("kapibados.nl")!=-1) {
	var lng = "nl";
	var gamepage = ".kapibados.nl";
	var reg = /http:\/\/s(\d+)\.kapibados\.nl\/(.*?)\.php/i;
	var reg2 = /http:\/\/(.*)kapibados\.nl\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
else if (document.location.href.search("tr.kapibados.com")!=-1) {
	var lng = "tr";
	var gamepage = ".tr.kapibados.com";
	var reg = /http:\/\/s(\d+)\.tr\.kapibados\.com\/(.*?)\.php/i;
	var reg2 = /http:\/\/(.*)tr\.kapibados\.com\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}

var texte = new Object();
switch (lng) {
case "de": {
texte["optionen"] = "Optionen";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Alles bepflanzen";
texte["uhrFertig"] = "%1% Uhr fertig";
texte["geheZuGartenX"] = "Gehe zu Garten %1%";
//settings
texte["anzahlGaerten"] = "Anzahl deiner G"+ae+"rten";
texte["schaedlingeKlickbar"] = "Ich will keine Kolibris anklicken k"+oe+"nnen.";
texte["giessbonus"] = "Dein Gie"+sz+"-Bonus";
texte["knappeBestaende"] = "Knappe Best"+ae+"nde hervorheben ab...";
texte["accountAktiv"] = "Account aktiv";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Passwort";
texte["loeschen"] = "l"+oe+"schen";
texte["zeigePasswoerter"] = "zeige Passw"+oe+"rter";
break;}
case "fr": {
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
//settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the colibris.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "hu": {
const hu_A = "\u00C1";
const hu_a = "\u00E1";
const hu_E = "\u00C9";
const hu_e = "\u00E9";
const hu_i = "\u00ED";
const hu_O_dots = "\u00D6";
const hu_o = "\u00F3";
const hu_o_double = "\u0151";
const hu_o_dots = "\u00F6";
const hu_U = "\u00DA";
const hu_U_dots = "\u00DC";
const hu_u = "\u00FA";
const hu_u_double = "\u0171";
const hu_u_dots = "\u00FC";
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
//settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the colibris.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
case "nl": {
texte["optionen"] = "Opties";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Alles planten";
texte["uhrFertig"] = "Planten om %1% uur klaar";
texte["geheZuGartenX"] = "Go to garden %1%";
//settings
texte["anzahlGaerten"] = "Aantal van uw stranden";
texte["schaedlingeKlickbar"] = "Ik wil geen kolibries kunnen aanklikken.";
texte["giessbonus"] = "Uw bewaterings-bonus";
texte["knappeBestaende"] = "Highlight lage voorraad aantal bij ...";
texte["accountAktiv"] = "Actieve account";
texte["server"] = "Server";
texte["name"] = "Naam";
texte["passwort"] = "Paswoord";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "Paswoord tonen";
break;}
case "pl": { //thanks to ireun PL
const pl_a = "\u0105";
const pl_c = "\u0107";
const pl_e = "\u0119";
const pl_l = "\u0142";
const pl_n = "\u0144";
const pl_o = "\u00F3";
const pl_s = "\u015B";
const pl_S = "\u015A";
const pl_z = "\u017C";
const pl_x = "\u017A";
texte["optionen"] = "Opcje";
texte["scriptHomepage"] = "Strona domowa skryptu";
texte["allesBepflanzen"] = "Posad"+pl_x+" wszystko";
texte["uhrFertig"] = "W %1% gotowe";
texte["geheZuGartenX"] = "Id"+pl_x+" do ogrodu %1%";
//settings
texte["anzahlGaerten"] = "Ilo"+pl_s+pl_c+" twoich ogrod"+pl_o+"w";
texte["schaedlingeKlickbar"] = "Nie chce klika"+pl_c+" w przeszkody";
texte["giessbonus"] = "Tw"+pl_o+"j bonus podlewania";
texte["knappeBestaende"] = "Minimalna ilo"+pl_s+pl_c+" produkt"+pl_o+"w w regale ...";
texte["accountAktiv"] = "Konto aktywne";
texte["server"] = "Serwer";
texte["name"] = "Login";
texte["passwort"] = "Has"+pl_l+"o";
texte["loeschen"] = "usu"+pl_n+" ";
texte["zeigePasswoerter"] = "Poka"+pl_z+" has"+pl_l+"o";
break;}
case "tr": {
const tr_g = "\u011F";
const tr_G = "\u011E";
const tr_s = "\u015F";
const tr_S = "\u015E";
const tr_c = "\u00E7";
const tr_C = "\u00C7";
const tr_dotless_i = "\u0131";
const tr_dotted_I = "\u0130";
const tr_dotted_o = "\u00F6";
texte["optionen"] = "Options";
texte["scriptHomepage"] = "Script-Homepage";
texte["allesBepflanzen"] = "Plant all";
texte["uhrFertig"] = "at %1% ready";
texte["geheZuGartenX"] = "Go to garden %1%";
//settings
texte["anzahlGaerten"] = "Amount of your gardens";
texte["schaedlingeKlickbar"] = "I don't want to click the colibris.";
texte["giessbonus"] = "Your watering bonus";
texte["knappeBestaende"] = "Highlight low rack amount at ...";
texte["accountAktiv"] = "Account active";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["loeschen"] = "delete";
texte["zeigePasswoerter"] = "show passwords";
break;}
}

// *****************************************************************************

const scriptUrl = "http://userscripts.org/scripts/show/82840";
const gamepages = {"de":"http://www.kapibados.de","fr":"http://www.kapibados.fr","nl":"http://www.kapibados.nl","pl":"http://www.zagubionawyspa.pl","tr":"http://www.tr.kapibados.com","hu":"http://www.kapibados.hu"};
var loc =  reg.exec(document.location.href);
if(loc){
	var server = loc[1];
	var page = loc[2];
	var username = GM_getValue(lng+"_"+server+"_username","");
	if(username==""){ document.location.href="http://www"+gamepage; }
	
	var valSchutz = GM_getValue(server+"_"+username+"_valSchutz",true);
	var valGartencount = GM_getValue(server+"_"+username+"_valGartencount",1);
	var valGiess = GM_getValue(server+"_"+username+"_valGiess",5);
	var valRackLow = GM_getValue(server+"_"+username+"_valRackLow",0);
	
	var Wndw = window;
	var all = document.getElementsByTagName("body")[0];
	var settings = top.document.getElementsByClassName("rahmen_quer")[0];
	var fr = top.document.getElementsByTagName("iframe");
	function getFrameByName(a,b){
		for (var v=0;v<b.length;v++){
			if (b[v].name == a) return v;
		}
	}
	
	//CSS
	GM_addStyle("table.hovercc9 tr:hover{background-color:#cc9;}");
	GM_addStyle(".hoverblue:hover{background-color:blue;}");
	
	switch (page) {
	case "main"	  : do_main();break;
	case "garten_map" : do_garten_map();break;
	case "verkauf_map": do_verkauf_map();break;
	}
} else { do_login(); }

// *****************************************************************************

function closeInfoPanel(){
	try{
		$top("infoPanel").setAttribute("name","");
		$top("infoPanel").style.display = "none";
	} catch(err){}
}

function do_main () {
	var canddiv = document.getElementsByTagName("div");
	var candspan = document.getElementsByTagName("span");
	var lager_zeit = $("lager_zeit");
	var candimg = document.getElementsByTagName("img");
	var rackInfo = $("rackInfo");
	
	werbediv = $top("upsimtoolbar");
	if (werbediv) werbediv.style.display = "none";
	document.body.style.margin="0px";
	
	if(valGartencount>1){
		for(var v=1;v<=valGartencount;v++){ createElement("span",{"title":texte["geheZuGartenX"].replace(/%1%/,v),"style":"position:fixed;top:"+(40*v-35)+"px;left:0px;width:40px;height:36px;z-index:500;"},all,'<a href="javascript:waehleGarten('+v+')"><img border="0" src="http://wurzelgrafik3.de1.cc/pics/popin/map_auto/garten_out.gif"></a>'); }
	}
	
	// ********* settings ******************************************************************
	createElement("div",{"id":"infoPanel","name":"","style":"position:absolute;top:50px;left:50px;width:620px;height:580px;background-color:#b8a789;border:2px solid black;-moz-border-radius: 10px;z-index:101;display:none;"},$("garten_komplett"));
	function buildInfoPanel(mode){
		if(mode==$("infoPanel").getAttribute("name")){ closeInfoPanel(); }
		else {
			$("infoPanel").setAttribute("name",mode);
			$("infoPanel").innerHTML = "";
			$("infoPanel").style.display = "block";
			var divInfo = createElement("div",{"class":"tnormal","style":"position:absolute;width:560px;height:560px;margin:10px;overflow:auto;"},$("infoPanel"));
			var newimg = createElement("img",{"class":"link","src":"http://dqt9wzym747n.cloudfront.net/pics/close.jpg","style":"position:absolute;top:10px;right:10px;width: 20px;height: 20px;"},$("infoPanel"));
			newimg.addEventListener("click",closeInfoPanel,false);
			
			var newtable,newtr,newtd,newtd1,newdiv,newdiv1,newinput;
			switch(mode){
			case "options":{	
				createElement("div",{"align":"center","style":"line-height:30px;font-weight:bold;"},divInfo,texte["optionen"]);
				newtable = createElement("table",{"style":"width:100%;","border":"1","class":"hovercc9"},divInfo);
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("select",{"id":"selectvalGartencount"},newtd);
				for(var w=1;w<5;w++){ createElement("option",{"value":w},newinput,w); }
				newinput.value = valGartencount;
				newinput.addEventListener("change",function(){
					GM_setValue(server+"_"+username+"_valGartencount",this.value);
				},false);
				createElement("td",{},newtr,texte["anzahlGaerten"]);

				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalSchutz","type":"checkbox","checked":valSchutz},newtd);
				newinput.addEventListener("click",function(){
					GM_setValue(server+"_"+username+"_valSchutz",this.checked);
				},false);
				createElement("td",{},newtr,texte["schaedlingeKlickbar"]);
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalGiess","style":"width:21px;text-align:center;","value":valGiess,"maxlength":2},newtd);
				newinput.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					if(help>4){
						this.value=help;
						GM_setValue(server+"_"+username+"_valGiess",help);
						rdytime();
					} else {
						this.value="";
					}
				},false);
				createElement("td",{},newtr,texte["giessbonus"]);
						
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalRackLow","style":"width:50px;text-align:center;","value":valRackLow,"maxlength":5},newtd);
				newinput.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					if(help>=0){
						this.value=help;
						GM_setValue(server+"_"+username+"_valRackLow",help);
					} else {
						this.value="";
					}
				},false);
				createElement("td",{},newtr,texte["knappeBestaende"]);
				
				//AutoLogin
				createElement("div",{"align":"center","style":"line-height:30px;margin-top:20px;font-weight:bold;"},divInfo,"AutoLogin");
				newtable=createElement("table",{"id":"tableAutologin","align":"center"},divInfo);
				function buildLoginTable(showPW) {
					var logindata = new Array();
					try{ logindata = explode(GM_getValue("logindata","[]")); }catch(err){}
		
					function saveLogin(){
						GM_setValue("logindata",implode(logindata));
					}
					var newtable = createElement("table",{"align":"center"});
					$("tableAutologin").parentNode.replaceChild(newtable,$("tableAutologin"));
					newtable.id = "tableAutologin";
					newtable.addEventListener("change",saveLogin,false);
					var newtr = createElement("tr",{},newtable);
					createElement("th",{},newtr,texte["server"]);
					createElement("th",{},newtr,texte["name"]);
					createElement("th",{},newtr,texte["passwort"]);
					var newtd,newinput,newselect,newdiv
					for (var v=0;v<logindata.length;v++){
						newtr = createElement("tr",{},newtable);
						newtd = createElement("td",{},newtr);
						newinput = createElement("input",{"id":"loginActive"+v,"type":"checkbox","title":texte["accountAktiv"],"checked":logindata[v][4]},newtd);
						newinput.addEventListener("change",function(){ logindata[this.id.replace("loginActive","")][4] = this.checked; },false);				
						newinput = createElement("input",{"id":"loginServer"+v,"style":"width:20px","maxlength":"2"},newtd);
						if (isNaN(logindata[v][1])){ logindata[v][1]="0";}
						if (logindata[v][1]!="0"){ newinput.value = logindata[v][1]; }
						newinput.addEventListener("change",function(){
							var readin = parseInt(this.value,10);
							if (isNaN(readin) || (readin<1)) {alert("Ung"+ue+"ltiger Server!"); this.value="";}
							else { 
								this.value = readin; 
								logindata[this.id.replace("loginServer","")][1] = readin;
							}
						},false);
						newselect = createElement("select",{"id":"loginLng"+v},newtd);
						for(var w in gamepages)	createElement("option",{"value":w},newselect,w);
						newselect.value = logindata[v][0];
						newselect.addEventListener("change",function(){ logindata[this.id.replace("loginLng","")][0] = this.value; },false);				
		
						newtd = createElement("td",{},newtr);
						newinput = createElement("input",{"id":"loginName"+v,"style":"width:150px","value":logindata[v][2],"maxlength":"20"},newtd);
						newinput.addEventListener("change",function(){ logindata[this.id.replace("loginName","")][2] = this.value; },false);				
						
						newtd = createElement("td",{},newtr);
						newinput = createElement("input",{"id":"loginPW"+v,"style":"width:150px","value":logindata[v][3],"maxlength":"20"},newtd);
						if (!showPW){ newinput.type = "password"; }
						newinput.addEventListener("change",function(){ logindata[this.id.replace("loginPW","")][3] = this.value; },false);				
		
						newtd=createElement("td",{},newtr);
						if (v>0) {
							newdiv = createElement("div",{"id":"loginUp"+v,"class":"hoverblue link2","style":"width:14px;height:10px;"},newtd);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/quest_up.gif","style":"width:14px;height:10px;"},newdiv);
							newdiv.addEventListener("click",function(){
								var currLine=parseInt(this.id.replace("loginUp",""),10);
								logindata.splice(currLine-1,2,logindata[currLine],logindata[currLine-1]);
								saveLogin();
								buildLoginTable(showPW);
							},false);
						}
						if (v<logindata.length-1) {
							newdiv = createElement("div",{"id":"loginDown"+v,"class":"hoverblue link2","style":"width:14px;height:10px;"},newtd);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/quest_down.gif","style":"width:14px;height:10px;"},newdiv);
							newdiv.addEventListener("click",function(){
								var currLine=parseInt(this.id.replace("loginDown",""),10);
								logindata.splice(currLine,2,logindata[currLine+1],logindata[currLine]);
								saveLogin();
								buildLoginTable(showPW);
							},false);
						}
						
						newtd = createElement("td",{"class":"hoverblue","title":texte["loeschen"],"id":"loginDelete"+v},newtr);
						createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/popin/contracts/anullieren.gif","class":"link2","style":"width: 16px;height: 16px;"},newtd);
						newtd.addEventListener("click",function(){
							var currLine=this.id.replace("loginDelete","");
							logindata.splice(currLine,1);
							saveLogin();
							buildLoginTable(showPW);
						},false);
					}
					
					newtr = createElement("tr",{},newtable);
					newtd = createElement("td",{colspan:"5","class":"link","style":"font-weight:bold;font-size:16px;text-align:right;"},newtr,"+");
					newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
					newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
					newtd.addEventListener("click",function(){
						logindata.push([lng,"0","","",false]); // neue leere zeile
						saveLogin();
						buildLoginTable(showPW);
					},false);
					newtable=null;newtr=null;newtd=null;newinput=null;newselect=null;newdiv=null;
				}
				buildLoginTable(false);
				var newdiv = createElement("div",{"align":"center"},divInfo);
				newinput = createElement("input",{"type":"checkbox","class":"link","checked":false},newdiv);
				newinput.addEventListener("click",function(){buildLoginTable(this.checked);},false);
				createElement("span",{},newdiv,texte["zeigePasswoerter"]);
				
			}
			}
		}
	}
		
	var newbutton = createElement("button",{"type":"button","class":"link"},settings,texte["optionen"]);
	newbutton.addEventListener("click",function(){ buildInfoPanel("options"); },false);	
	var newbutton = createElement("button",{"type":"button","class":"link"},settings,texte["scriptHomepage"]);
	newbutton.addEventListener("click",function(){ window.open(scriptUrl); },false);
	
	// ********* lager ******************************************************************
	
	rdytime();
	function rdytime(){
		var jetzt = new Date();
		jetzt = (jetzt.getHours()*60 + jetzt.getMinutes())*60+jetzt.getSeconds();
		giess = 1-valGiess*0.01;
		var Ausdruck = /(\d+):(\d+):(\d\d)/;
		Ausdruck.exec(lager_zeit.innerHTML);
		zeit = RegExp.$1 *3600 + RegExp.$2 *60 + RegExp.$3 *1;
		zeit = zeit * giess;
		while (zeit > 86400) { zeit = (zeit - 86400) *giess; }
		zeit = Math.round((zeit+jetzt) % 86400);
		zeitstr = Math.floor(zeit/3600)+':';
		zeit = zeit % 3600;
		neu = Math.floor(zeit/60);
		if (neu<10) {zeitstr += "0"+ neu} else {zeitstr += neu};
		$("bedientext").innerHTML = "<font color='blue'>"+texte["uhrFertig"].replace(/%1%/,zeitstr)+"</font>";
	}
	
	all.addEventListener("load",function(){
	rdytime();
	for (var v=14;v<canddiv.length;v++){
	a = parseInt(canddiv[v].innerHTML);
	if (!isNaN(a)){
		if (a<valRackLow) {
			canddiv[v].setAttribute("style","position:relative; top:3px;text-decoration:blink;color:red;");
		}
		else {
			canddiv[v].setAttribute("style","position:relative; top:3px;");
		}
	}
	}
	},true);
	//$top("rackItems").addEventListener("click",rdytime,false);
	
}


// **************************************************************************

function do_garten_map(){
	
	var jetzt = new Date();
	jetzt = Math.round(jetzt.getTime()/1000);
	
	for (var i=1; i<205;i++) {
		feld = $("f"+i);
		// u Maulwurf, v Pflanze , z Deko , " leer
		if (valSchutz && unsafeWindow.garten_kategorie[i]=="u"){ feld.removeAttribute("onclick");	}
	
		if (unsafeWindow.garten_kategorie[i]=="v"){
			if (unsafeWindow.garten_zeit[i]>0){
				nextGiess = 86400 + unsafeWindow.garten_wasser[i];
				if (jetzt<nextGiess && nextGiess<unsafeWindow.garten_zeit[i]) { 
					nextGiess = Math.floor((nextGiess-jetzt)/60);
					h = Math.floor(nextGiess/60);
					m = nextGiess - h*60;
					if (m<10) { newstr= h+":0"+m;}
					else {newstr = h+":"+m;};
					feld.title = newstr;
					if (unsafeWindow.garten_x[i]*unsafeWindow.garten_y[i]==1) { feld.innerHTML += newstr;}
				}
			}
		}
	}
	
	allbtn = createElement("button",{"type":"button","class":"link","style":"position:fixed;top:0px;left:0px;height:20px;"},all,texte["allesBepflanzen"]);
	allbtn.addEventListener("click",function(){
		for (var i=1;i<205;i++){
			if ((unsafeWindow.garten_kategorie[i]!="u") && (unsafeWindow.garten_kategorie[i]!="z")){
				parent.window.wrappedJSObject.cache_me(i, unsafeWindow.garten_prod[i], unsafeWindow.garten_kategorie[i]);
				if (top.window.wrappedJSObject.global_x=="2"){ 
					i++;
					if (i%17==16){ i+=17*(top.window.wrappedJSObject.global_y-1)+1; }
					else if (i%17==0){ i+=17*(top.window.wrappedJSObject.global_y-1); }
				}
			}
		}
	},true); 
}

// *****************************************************************************

function do_verkauf_map(){
	
	candspan = document.getElementsByTagName("span");
	
	function giess () {
		fr[getFrameByName('garten',fr)].src='garten_map.php?giesse=alles';
	}
	
	function giess2 () {
		fr[getFrameByName('garten',fr)].src='garten_map.php?giesse=alles';
	}
	
	function ernte() {
		fr[getFrameByName('garten',fr)].src='garten_map.php?ernte=alles';
		window.setTimeout('top.location.href="javascript: updateRack(0, true)"',3000);
	}
	
	for (var v=0;v<candspan.length;v++){
		if (candspan[v].style.background.search(/kannenzwerg/) != -1) {
			kanne = candspan[v];
			kanne.removeAttribute("onclick");
			kanne.addEventListener('click',giess,true);
		}
		if (candspan[v].style.background.search(/sensenzwerg/) != -1) {
			sense = candspan[v];
			sense.removeAttribute("onclick");
			sense.addEventListener('click',ernte,true);
		}
	}
}

// *****************************************************************************

function do_login(){
	if(top.document.location!=document.location) return;
GM_log("login");
	var loc = reg2.exec(document.location.href);
	if (loc[2].search("logout")!=-1) {
		window.setTimeout(function(){ document.location.href="http://www"+gamepage+"/"; },100);//auf start-seite leiten
	} else { 
		//paypal
		var newform = createElement("form",{"id":"paypalForm","action":"https://www.paypal.com/cgi-bin/webscr","method":"post","style":"position:absolute;top:30px;left:100px;"},all);
		createElement("input",{"type":"hidden","name":"cmd","value":"_donations"},newform);
		createElement("input",{"type":"hidden","name":"business","value":"jessica_holtkamp@web.de"},newform);
		createElement("input",{"type":"hidden","name":"lc","value":((lng=="de")?"DE":"US")},newform);
		createElement("input",{"type":"hidden","name":"item_name","value":"MyFreeFarm Script"},newform);
		createElement("input",{"type":"hidden","name":"no_note","value":"0"},newform);
		createElement("input",{"type":"hidden","name":"currency_code","value":"EUR"},newform);
		createElement("input",{"type":"hidden","name":"bn","value":"PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest"},newform);
		createElement("input",{"type":"image","border":"0","src":"https://www.paypal.com/"+((lng=="de")?"de_DE/DE":"en_US")+"/i/btn/btn_donate_LG.gif","name":"submit",alt:"PayPal"},newform);
		createElement("img",{"alt":"","border":"0","src":"https://www.paypal.com/en_US/i/scr/pixel.gif","width":"1","height":"1"},newform);
		newform=null;

		
		//login
		var Now = Math.floor((new Date()).getTime()/1000);
		var keydologin = /dologin=(\d+)/;
		var keydoserver = /doserver=(\d+)/;
		var logindata = new Array();
		try{ logindata = explode(GM_getValue("logindata","[]")); }catch(err){}
		var c=0;
		var servers = new Object();
		for (var v=0;v<logindata.length;v++) if(logindata[v][4]){ 
			c++;
			servers[logindata[v][0]+"_"+logindata[v][1]] = v;
		}

		document.getElementsByClassName("login_button")[0].addEventListener("click",function(){
			var currServer = 1+$("server_log").options.selectedIndex;
			var currUser = $("login").value.toLowerCase();
			GM_setValue(lng+"_"+currServer+"_username",currUser);
		},false);
		
		function submit_login(accNr){
			if(logindata[accNr][0]==lng){
				$("server_log").selectedIndex=logindata[accNr][1]-1;
				change($("server_log"));
				$("login").value=logindata[accNr][2];
				$("password").value=logindata[accNr][3];
				document.getElementsByClassName("login_button")[0].click();	
			} else {
				document.location.href = gamepages[logindata[accNr][0]]+"/login.php?start=1&ref=&wid=&dologin="+accNr;
			}
		}
		var currDoLogin = keydologin.exec(document.location.href);
		var currDoServer = keydoserver.exec(document.location.href);
		if(currDoServer){
			var help = GM_getValue(lng+"_"+currDoServer[1]+"_username","");
			for (var v=0;v<logindata.length;v++){
				if((logindata[v][4])&&(logindata[v][0]==lng)&&(logindata[v][1]==currDoServer[1])&&(logindata[v][2].toLowerCase()==help)){ 
					currDoLogin = [,v]; 
					break;
				}
			}
			if(!currDoLogin){
				for (var v=0;v<logindata.length;v++){
					if((logindata[v][4])&&(logindata[v][0]==lng)&&(logindata[v][1]==currDoServer[1])){ 
						currDoLogin = [,v]; 
						break;
					}
				}				
			}
		}
		if(currDoLogin){
			submit_login(currDoLogin[1]);
		} else {
			var newdiv=createElement("div",{"style":"position:absolute;top:-30px;left:-150px;"},$("login_div"));
			var newbutton;
			GM_addStyle(".loginbutton{background-color:white;color:black;text-align:center;font-weight:bold;width:250px;line-height:20px;margin:3px;border:3px solid #6c441e;-moz-border-radius:10px;}");
			GM_addStyle(".loginbutton:hover{background-color:lightblue;}");
			for (var v=0;v<logindata.length;v++) if(logindata[v][4]){
				newbutton = createElement("div",{"class":"link loginbutton","id":"autologin"+v},newdiv,"Server "+logindata[v][1]+"."+logindata[v][0]+": "+logindata[v][2]);
				newbutton.addEventListener("click",function(){
					submit_login(this.id.replace("autologin",""));
				},false);
			}
		
			//Autologin
			var lastbusy = GM_getValue("loginbusy",0);
			if (isNaN(lastbusy) || Now<lastbusy) { lastbusy = 0; }
			if (GM_getValue("valAutoLogin",false) && (c>0) && (Now-lastbusy>15)){
				GM_setValue("loginbusy",Now);
				if (c==1) {
					//Soloaccount
					for (var v=0;v<logindata.length;v++) if(logindata[v][4]){ 
						submit_login(v);
					}
				} else {
					//Multiaccount
					createElement("div",{"id":"divInfo","style":"position:absolute;top:190px;left:455px;height:200px;width:280px;background-color:#842;border:4px solid black;z-index:99;"},$("loginlayer"));
					$("divInfo").innerHTML = "<h1>"+"Ermittle aktive Sessions. Bitte 5 Sekunden warten<br>..."+"</h1>";
		
					for (var v in servers) {
						GM_setValue(v+"_sessionlost",true);
					}
					window.setTimeout(function(){
						var c = -1;
						for (var v in servers) {
							if (GM_getValue(v+"_sessionlost",true)) {
								if (c==-1) {c=servers[v];}
								else {window.open(gamepages[logindata[servers[v]][0]]+"/login.php?start=1&ref=&wid=&dologin="+servers[v]);}
							}
						}
						GM_setValue("loginbusy",0);
						if (c==-1) {
							//window.close(); <-- funzt nicht :(
							$("divInfo").innerHTML = "<h1>"+"Alle Accounts eingeloggt."+"</h1>";
							window.setTimeout(function(){document.location=document.location},5000);
						} else { submit_login(c); }
					},5000);
				}
			}
			newdiv=null;newbutton=null;
		}
	}
}

},false);