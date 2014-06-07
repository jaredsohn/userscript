// ==UserScript==
// @name           MyFreeFarm StatBot
// @namespace      http://userscripts.org/scripts/show/75373
// @description    Beobachtet den Markt
// @date           04.06.2010
// @include        http://s4.myfreefarm.*/main.php*
// @include        http://s4.wolnifarmerzy.pl/main.php*
// @include        http://s4.enkicsitanyam.hu/main.php*
// @include        http://s4.tr.myfreefarm.com/main.php*
// @include        http://s4.veselaferma.com/main.php*
// ==/UserScript==

window.addEventListener("load",function(){

function $(ID) {return document.getElementById(ID)}
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
}

var texte = new Object();
if (document.location.href.search("veselaferma.com")!=-1) {
	var lng = "bu";
	var gamepage = ".veselaferma.com";
	var reg = /http:\/\/s(.*?)\.veselaferma\.com\/main\.php(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	texte["lese0"]="Read market";
	texte["lese1"]="Reading...";
	texte["botStop"]="Stop Stat-Bot";
	texte["botStart"]="Start Stat-Bot";
	texte["info"]="Stat-Bot waiting delay in sek (minimal 3sek)";
	texte["waehrung"] = "\u043A"+"\u0414";
}
if (document.location.href.search("myfreefarm.co.uk")!=-1) {
	var lng = "co.uk";
	var gamepage = ".myfreefarm.co.uk";
	var reg = /http:\/\/s(.*?)\.myfreefarm\.co\.uk\/main\.php(.*)/i;
	var delimThou = ",";
	var regDelimThou = /,/g;
	var delimDeci = ".";
	texte["lese0"]="Read market";
	texte["lese1"]="Reading...";
	texte["botStop"]="Stop Stat-Bot";
	texte["botStart"]="Start Stat-Bot";
	texte["info"]="Stat-Bot waiting delay in sek (minimal 3sek)";
	texte["waehrung"] = "pD";
}
if (document.location.href.search("myfreefarm.de")!=-1) {
	var lng = "de";
	var gamepage = ".myfreefarm.de";
	var reg = /http:\/\/s(.*?)\.myfreefarm\.de\/main\.php(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	texte["lese0"]="Marktplatz auslesen";
	texte["lese1"]="lese...";
	texte["botStop"]="Stat-Bot stoppen";
	texte["botStart"]="Stat-Bot starten";
	texte["info"]="Stat-Bot Wartezeit in sek (minimal 3sek)";
	texte["waehrung"] = "kT";
}
if (document.location.href.search("enkicsitanyam.hu")!=-1) {
	var lng = "hu";
	var gamepage = ".enkicsitanyam.hu";
	var reg = /http:\/\/s(.*?)\.enkicsitanyam\.hu\/main\.php(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	texte["lese0"]="Read market";
	texte["lese1"]="Reading...";
	texte["botStop"]="Stop Stat-Bot";
	texte["botStart"]="Start Stat-Bot";
	texte["info"]="Stat-Bot waiting delay in sek (minimal 3sek)";
	texte["waehrung"] = "kT";
}
if (document.location.href.search("myfreefarm.nl")!=-1) {
	var lng = "nl";
	var gamepage = ".myfreefarm.nl";
	var reg = /http:\/\/s(.*?)\.myfreefarm\.nl\/main\.php(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	texte["lese0"]="Lees markt";
	texte["lese1"]="Lezen...";
	texte["botStop"]="Stop Stat-Bot";
	texte["botStart"]="Start Stat-Bot";
	texte["info"]="Stat-Bot update tijd in sec. (minimaal 3sec)";
	texte["waehrung"] = "aD";
}
if (document.location.href.search("wolnifarmerzy.pl")!=-1) {
	var lng = "pl";
	var gamepage = ".wolnifarmerzy.pl";
	var reg = /http:\/\/s(.*?)\.wolnifarmerzy\.pl\/main\.php(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	var pl_a = "\u0105";
	var pl_l = "\u0142";
	var pl_z = "\u017A";
	texte["lese0"]="Sprawd"+pl_z+" ceny";
	texte["lese1"]="Sprawdzam...";
	texte["botStop"]="Zatrzymaj Stat-Bota";
	texte["botStart"]="Startuj Stat-Bota";
	texte["info"]="Zw"+pl_l+"oka Stat-Bota w sek (minimum 3sek)";
	texte["waehrung"] = "ft";
}
if (document.location.href.search("tr.myfreefarm.com")!=-1) {
	var lng = "tr";
	var gamepage = ".tr.myfreefarm.com";
	var reg = /http:\/\/s(.*?)\.tr\.myfreefarm\.com\/main\.php(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
	texte["lese0"]="Read market";
	texte["lese1"]="Reading...";
	texte["botStop"]="Stop Stat-Bot";
	texte["botStart"]="Start Stat-Bot";
	texte["info"]="Stat-Bot waiting delay in sek (minimal 3sek)";
	texte["waehrung"] = "KL";
}

var loc = reg.exec(document.location);
if(loc){
var server = loc[1];

var id = ["0"];
var gutBeob = new Array();
var minBeob = new Array();
var maxBeob = new Array();

var block = new Object();
block[70]=true;
block[72]=true;
block[51]=true;
block[87]=true;
block[81]=true;
block[84]=true;
block[53]=true;
block[54]=true;
block[56]=true;
block[89]=true;
block[79]=true;
block[49]=true;
block[66]=true; 
block[67]=true; 
block[68]=true; 
block[69]=true; 
block[71]=true; 
block[88]=true; 

var levelnum=parseInt(top.document.getElementById("levelnum").innerHTML,10);
for (var v in unsafeWindow.produkt_name) if((!isNaN(v)) && (!block[v]) && (unsafeWindow.produkt_category[v]!="u") && (levelnum>=unsafeWindow.top.produkt_level[v])) id.push(v);

function parseMarket(currId) { 
//GM_log("parsing "+id[currId]);
GM_xmlhttpRequest({
	method: "GET",
	url: "http://s"+server+gamepage+"/stadt/markt.php?page=1&order=p&id="+id[currId],
	onload: function(response) {
		reg1 = /<div id="marketcontainer">(.*)<form name="form_markt_anull"/;
		regpId = /<a href="javascript:orderBy\('p','(\d+)'\)/;
		regc1 = /<div class="c1">(\d+)</;
		regc4 = /<div class="c4">(.*?)</;
		var gutBeobCount1 = 0;
		var gutBeobCount2 = 0;
		
		help = reg1.exec(response.responseText.replace(/\s+/g," "))[1];
		help2 = help.split('<div class="marketline"');
		if (help2.length>1) {
		pId = regpId.exec(help2[1])[1];
		if (unsafeWindow.produkt_category[pId]=="z"){
			gutBeobCount2 = 1;
			if (help2.length==2) {gutBeobCount1 = parseFloat(regc4.exec(help2[1])[1].replace(regDelimThou,"").replace(delimDeci,"."),10);}
			else {gutBeobCount1 = parseFloat(regc4.exec(help2[2])[1].replace(regDelimThou,"").replace(delimDeci,"."),10);}
		} else{
			for (var v=1;v<help2.length;v++) {
				menge = parseInt(regc1.exec(help2[v])[1],10);
				preis = parseFloat(regc4.exec(help2[v])[1].replace(regDelimThou,"").replace(delimDeci,"."),10);
				if (v<5) {gutBeobCount1 += preis*menge; gutBeobCount2 += menge; }
				if (v<9) {gutBeobCount1 += preis*menge; gutBeobCount2 += menge; }
				if (v<13) {gutBeobCount1 += preis*menge; gutBeobCount2 += menge; }
			}
		}
		gutBeob[pId] = Math.round(100*gutBeobCount1/gutBeobCount2,0)/100;
		minBeob[pId] = parseFloat(regc4.exec(help2[1])[1].replace(regDelimThou,"").replace(delimDeci,"."),10);
		maxBeob[pId] = parseFloat(regc4.exec(help2[help2.length-1])[1].replace(regDelimThou,"").replace(delimDeci,"."),10);
		//GM_log(unsafeWindow.produkt_name[pId]+":"+gutBeob[pId]);
		}
		
		currId = (currId+1)%(id.length);
		if (currId==0) {
			postStatData();
			if (runOnce) {
				$("inputRunOnce").disabled = false;
				$("inputRunOnce").innerHTML = texte["lese0"];
				$("inputvalStatBot").disabled = false;
				runOnce = false;
			}
		}
		
		if (valStatBot || runOnce) {
			window.setTimeout(function () {
				parseMarket(currId);
			},valDelay*1000);
		}
	}
});
}

function postStatData () {
GM_log("StatBot: posting Data");
	$("GMstatBotVersion").value=1;
	$("GMminBeob").value = minBeob.join("|");
	$("GMmaxBeob").value = maxBeob.join("|");
	$("GMgutBeob").value = gutBeob.join("|");
	click($("GMgutBeob"));
	gutBeob = new Array();
	minBeob = new Array();
	maxBeob = new Array();
}

var valStatBot = !!GM_getValue(lng+"_"+server+"_myFreeFarmStatBot_valStatBot"); 
var runOnce = false;
var valDelay = parseInt(GM_getValue(lng+"_"+server+"_myFreeFarmStatBot_valDelay"),10); 
if (isNaN(valDelay)) { valDelay = 5; }
if (valStatBot) parseMarket(0);

divsetting = createElement("div",{style:"display:inline;"},document.body);
inp = createElement("input",{id:"inputvalStatBot",class:"link",type:"checkbox",checked:valStatBot,title:texte["botStart"],style:"margin-left:3px;"},divsetting);
inp.addEventListener("click",function(){
	valStatBot=this.checked;
	GM_setValue(lng+"_"+server+"_myFreeFarmStatBot_valStatBot", valStatBot);
	runOnce = false;
	gutBeob = new Array();
	minBeob = new Array();
	maxBeob = new Array();
	if (valStatBot) {
		parseMarket(0);
		this.title = texte["botStop"];
	} else this.title = texte["botStart"];
},false);
if (valStatBot) inp.title = texte["botStop"];
inp = createElement("input",{id:"inputvalDelay",value:valDelay,title:texte["info"],style:"margin-left:3px;width:30px;"},divsetting);
inp.addEventListener("keyup",function(){
	valDelay=Math.max(3,parseInt(this.value,10));
	GM_setValue(lng+"_"+server+"_myFreeFarmStatBot_valDelay", valDelay);
},false);
inp.addEventListener("blur",function(){
	this.value = valDelay;
},false);
inp = createElement("button",{id:"inputRunOnce",class:"link",style:"margin-left:3px;"},divsetting,texte["lese0"]);
inp.addEventListener("click",function(){
	this.disabled = true;
	this.style.backgroundColor="";
	this.innerHTML = texte["lese1"];
	valStatBot = false;
	$("inputvalStatBot").disabled = true;
	$("inputvalStatBot").value = valStatBot;
	runOnce = true;
	gutBeob = new Array();
	minBeob = new Array();
	maxBeob = new Array();
	parseMarket(0);
},false);
inp.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
inp.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);
}

},false);