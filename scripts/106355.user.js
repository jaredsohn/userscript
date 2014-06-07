// ==UserScript==
// @name           MyFreeFarm Berater
// @namespace      http://userscripts.org/scripts/show/66964
// @description    Extends MyFreeFarm
// @date           07.08.2011
// @version        1.3.20
// @include        http://userscripts.org/scripts/show/66964
// @include        http://myfreefarm.*
// @include        http://wolnifarmerzy.pl*
// @include        http://mabelleferme.fr*
// @include        http://enkicsitanyam.hu*
// @include        http://tr.myfreefarm.com*
// @include        http://veselaferma.com*
// @include        http://fermavesela.ro*
// @include        http://mojaderewnja.ru*
// @include        http://migranjalinda.es*
// @include        http://*.myfreefarm.*
// @include        http://*.wolnifarmerzy.pl*
// @include        http://*.mabelleferme.fr*
// @include        http://*.enkicsitanyam.hu*
// @include        http://*.tr.myfreefarm.com*
// @include        http://*.pt.myfreefarm.com*
// @include        http://*.veselaferma.com*
// @include        http://*.fermavesela.ro*
// @include        http://*.mojaderewnja.ru*
// @include        http://*.migranjalinda.es*
// @exclude        http://*forum.*
// @exclude        http://*board.*
// @exclude        http://*farmpedia.*
// @exclude        http://*/dyn_bubbles.php*
// @exclude        http://*/nachrichten/bbhelp.php*
// @exclude        http://*/payment/*
// @require        http://userscripts.org/scripts/source/94946.user.js
// ==/UserScript==

//***********************************************************************************************************
// global variables
const VERSION="1.3.20";
const neededVersionFunctionFile="1.0.16";
const USO_ID="66964";
const USO_URL="http://userscripts.org/scripts/show/"+USO_ID;
if(NEVER==undefined){
	alert("Hi, I am the Berater-Script.\nThe function-file is missing.\nPlease install me again.");
	location.href="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
}else if(compareVersions(neededVersionFunctionFile,VERSIONfunctionFile)>0){
	alert("Hi, I am the Berater-Script.\nThe function-file is too old.\nPlease install me again.");
	location.href="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
}

var DEVMODE=GM_getValue("devmode",false);
var DEVMODE_EVENTS=GM_getValue("devmode_events",false);
var hotkeymap=null;
var regDelimThou2=null;
var regDelimThou3=null;

var FARMNAME=null;
var USERLEVEL=null;
const NPC=[,0.5,1.1,1.34,2.75,3.95,8.05,17.8,18.5,,,,,,,,,0.16,0.52,1.02,1.44,1.96,2.28,3.8,3.69,,4.38,,,12.4,,3.49,5.19,8.75,6,15.63,16.88,37.5,3.9,52.44,51.75,60.25,58.13,66.19,18.2,"c79",150,,1200,,1200,,,,,4500,,14400,1200,,"c125",,"c23",,4800,4200,,,,,,,,750,2100,"c25",,,,,,,10800,12000,,1500,3300,,,,,,,,5000,12000,"c10",,"c20",,"c5","c5","c5","c5",,"c5"];
var NPCSAISON={"94":false,"95":false,"96":false,"98":false,"100":false,"101":false,"102":false,"103":false,"105":false};

const forestryBuildingNames = new Array("sawmill","carpentry"); //TODO <-- add forestry buildingnames here.
const timerBuildingNames = new Array("sawmill","carpentry","forestry"); //TODO <-- add forestry buildingnames here.
var forestry_prodName = new Object(); //TODO -> merge with prodName/prodId/prodType/prodBlock in the future
var forestry_prodBestand = new Object();
var forestry_farmiNeeded = new Object();

var prodName=new Array();
var prodId=new Object();
var prodTyp=new Array(); //c:coins, v:plant, e:product, u:garbage, z:deco
var prodBlock=new Array(); //c:only by club, u:garbage, l:level too low, t:not tradable
var prodMinRackInit=new Array(); // initial minimal rack amounts
var prodMinRackAddon=new Array(); // additional minimal rack data from addons
// integer<0 is possible and means something like "product is produced"
// call: unsafeWindow.prodMinRackAddon.add(1,"Mill-Queue",20000);
// call: unsafeWindow.prodMinRackAddon.remove(1,"Mill-Queue");
unsafeWindow.prodMinRackAddon=new Object();
unsafeWindow.prodMinRackAddon.newdata=new Array();
unsafeWindow.prodMinRackAddon.busy=false;
var prodMinRack=new Array(); // + quest amount - field and powerup amounts
var prodNameSort=new Array(); //only non-blocked products, sorted by type(cvez)
var prodBestand=new Array();
var prodPlantSize=new Array();
var gut=new Array();
var gutBeob=new Array();

//***********************************************************************************************************
// developer functions
function compareObjectsExistance(obj1,obj2,pre){
	if(typeof(pre)=="undefined") pre="";
	for(i in obj1){
		if(!obj1.hasOwnProperty(i)){ continue; }
		if(typeof obj2[i] == "undefined"){
			GM_log("miss in 2: "+pre+i);
		}else{
			if(typeof obj1[i] == "object"){
				compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
			}
		}
	}
	for(i in obj2){
		if(!obj2.hasOwnProperty(i)){ continue; }
		if(typeof obj1[i] == "undefined"){
			GM_log("miss in 1: "+pre+i);
		}else{
			if(typeof obj2[i] == "object"){
				compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
			}
		}
	}
}
function compareTexteExistance(lng1,lng2){
	GM_log("compareTexteExistance "+lng1+":"+lng2);
	texte=new Object();
	texte["category"]=new Object();
	texte["hilfe"]=new Object();
	loadTexte(lng1);
	var texte1=texte.clone();

	texte=new Object();
	texte["category"]=new Object();
	texte["hilfe"]=new Object();
	loadTexte(lng2);
	var texte2=texte.clone();

	loadTexte(LNG);
	compareObjectsExistance(texte1,texte2);
	GM_log("compareTexteExistance "+lng1+":"+lng2+" ok");
}
//compareTexteExistance("de","us");

//***********************************************************************************************************
//*********************** FUNCTIONS *************************************************************************
// DOM
function SortableTable (sortRow){
	// Sortable HTML table inspired by http://www.webtoolkit.info/
	// example-call: new SortableTable(x);
	// sorting by value-attribute of td-elements
	// only cols with sortdir-attribute in the thead-cell
	function sortCol(cell){
		var tableEl=cell;
		while(tableEl.tagName!="TABLE"){ tableEl=tableEl.parentNode; }
		var tbody=tableEl.getElementsByTagName("tbody")[0];
		var sortRow=cell.parentNode;
		var newclass,oldclass,sortdir;
		// clone the rows
	    var newRows=new Array();
	    for(j=0; j < tbody.rows.length; j++){
			newRows[j]=tbody.rows[j];
		}
		//sort them
		newRows.sort(function(a,b){
			aa=parseFloat(a.cells[cell.cellIndex].getAttribute("value"),10);
			if (isNaN(aa)) aa=0;
			bb=parseFloat(b.cells[cell.cellIndex].getAttribute("value"),10);
			if (isNaN(bb)) bb=0;
			return (aa-bb);
		});
		// set classes of headercells
		if (cell.getAttribute("sortdir") == "Asc"){
			newRows.reverse();
			sortdir="Desc";
		}else{
			sortdir="Asc";
		}
		cell.setAttribute("sortdir",sortdir);
		for(var i=0; i<sortRow.cells.length; i++){
			oldclass=sortRow.cells[i].getAttribute("class");
			newclass=oldclass.replace(/sortableCol(.*)\b/,"sortableCol"+(i==cell.cellIndex?sortdir:""));
			if(oldclass!=newclass){ sortRow.cells[i].setAttribute("class",newclass); }
		}
		// rebuild table
		for(i=0;i<newRows.length;i++){
			tbody.appendChild(newRows[i]);
		}
		tableEl=null;tbody=null;sortRow=null;newRows=null;
 	}
	// constructor actions
	for(var i=0; i<sortRow.cells.length; i++){
		if(typeof(sortRow.cells[i].getAttribute("sortdir"))=="string"){
			var oldclass=sortRow.cells[i].getAttribute("class");
			sortRow.cells[i].setAttribute("class",(oldclass?oldclass+" ":"")+"sortableCol");
			sortRow.cells[i].addEventListener("click",function (){
				sortCol(this);
				return false;
			},false);
		}
	}
 }
function bar(size,markvalue,maxvalue){
	size=Math.floor(size);
	var mark=Math.floor(size*markvalue/maxvalue);
	var cell=createElement("div",{"style":"border:2px solid black; position:absolute;width:"+size+"px;height:12px;"});
     	createElement("div",{"style":"position:absolute;width:"+mark+"px;height:12px;background-color:#5555FF;"},cell);
	return cell;
}

function setSelRange(inputEl, selStart, selEnd){
 if (inputEl.setSelectionRange){
  inputEl.focus();
  inputEl.setSelectionRange(selStart, selEnd);
 }else if (inputEl.createTextRange){
  var range=inputEl.createTextRange();
  range.collapse(true);
  range.moveEnd('character', selEnd);
  range.moveStart('character', selStart);
  range.select();
 }
}

// Strings
function getKeySymbol(keyCode){
	if((46<keyCode)&&(keyCode<91)){ return String.fromCharCode(keyCode); }
	var codelist={"8":"backspace","9":"tab","13":"enter","16":"shift","17":"ctrl","18":"alt","19":"pause/break","20":"caps lock","27":"escape","33":"page up","34":"page down","35":"end","36":"home","37":"<-","38":"up arrow","39":"->","40":"down arrow","45":"insert","46":"delete","91":"left window key","92":"right window key","93":"select key","96":"numpad 0","97":"numpad 1","98":"numpad 2","99":"numpad 3","100":"numpad 4","101":"numpad 5","102":"numpad 6","103":"numpad 7","104":"numpad 8","105":"numpad 9","106":"*","107":"+","109":"-","110":"decimal point","111":"divide","112":"F1","113":"F2","114":"F3","115":"F4","116":"F5","117":"F6","118":"F7","119":"F8","120":"F9","121":"F10","122":"F11","123":"F12","144":"num lock","145":"scroll lock","186":"semi-colon","187":"equal sign","188":",","189":"dash","190":"period","191":"forward slash","192":"grave accent","219":"open bracket","220":"back slash","221":"close braket","222":"single quote"};
	return codelist[keyCode]?codelist[keyCode]:"key("+keyCode+")";
}

// Objects
function splitToFloat(str,del){
	var arr=new Array;
	if (str){
		var c=0;
		arr=str.split(del);
		for(var v=0;v<arr.length;v++){
			c=parseFloat("0"+arr[v],10);
			arr[v]=(isNaN(c)?0:c);
		}
	}
	return arr;
}
function splitToInt(str,del){
	var arr=new Array;
	if (str){
		var c;
		arr=str.split(del);
		for(var v=0;v<arr.length;v++){
			c=parseInt(arr[v],10);
			arr[v]=(isNaN(c)?0:c);
		}
	}
	return arr;
}

// Game
function igm(name,append,betreff){
	var link=createElement("span",{"mouseOverText":texte["nachrichtSchreiben"],"to":name,"subject":(betreff?betreff:""),"class":"link playerMsg"});
	createElement("div",{},link);
	link.addEventListener("click",function(){
		var pagedata=new Object();
		pagedata["to"]=this.getAttribute("to");
		pagedata["subject"]=this.getAttribute("subject");
		window.setTimeout(function(){
			GM_setValue(LNG+"_"+SERVER+"_pagedataNachrichtenNew",implode(pagedata));
			if($top("multiframe")){
				hideToolTip(this);
				$top("multiframe").src="http://s"+SERVER+"."+GAMEPAGES[LNG]+"/nachrichten/new.php";
				$top("multiframe").style.display="block";
			}else{
				window.open("http://s"+SERVER+"."+GAMEPAGES[LNG]+"/nachrichten/new.php");
			}
		},0);
	},false);
	link.addEventListener("mouseover",function(event){
		showToolTip(event,this.getAttribute("mouseOverText"),this);
	},false);
	if (append) append.appendChild(link);
	return link;
}
function vertrag(name,append){
	var link=createElement("span",{"to":name,"class":"link playerContract"});
	createElement("div",{},link);
	link.addEventListener("click",function(){
		var pagedata=new Object();
		pagedata["to"]=this.getAttribute("to");
		window.setTimeout(function(){
			GM_setValue(LNG+"_"+SERVER+"_pagedataVertraegeNew",implode(pagedata));
			if($top("multiframe")){
				hideToolTip(this);
				$top("multiframe").src="../vertraege/new.php";
				$top("multiframe").style.display="block";
			}else{
				window.open("../vertraege/new.php");
			}
		},0);
	},false);
	link.addEventListener("mouseover",function(event){
		showToolTip(event,texte["vertragSchicken"]);
	},false);
	if (append) append.appendChild(link);
	return link;
}
function stats(name,append){
	var link=createElement("span", {"mouseOverText":texte["statistik"],"class":"link playerStats","href":"../stadt/stats.php?search=1&searchterm="+name});
	createElement("div",{},link);
	if($top("shop")){
		link.addEventListener("click",function(){
			hideToolTip(this);
			showShopframePage(this.getAttribute("href"));
		},false);
	}else{
		link.addEventListener("click",function(){location.href=this.getAttribute("href");},false);
	}
	link.addEventListener("mouseover",function(event){
		showToolTip(event,this.getAttribute("mouseOverText"),this);
	},false);
	if (append) append.appendChild(link);
	return link;
}

function getData(){
	gut=splitToFloat(GM_getValue(LNG+"_"+SERVER+"_gut",""),"|");
	gutBeob=splitToFloat(GM_getValue(LNG+"_"+SERVER+"_gutBeob",""),"|");
	try{
		//USERLEVEL=parseInt($("levelnum").innerHTML,10); // only main.php can pass this
		USERLEVEL=parseInt(unsafeWindow.currentuserlevel,10); // only main.php can pass this
		prodBlock=['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','ct','','ct','','ct','ct','','ct','','','','','','','','','','ct','ct','ct','ct','ct','ct','ct','','','','','','','ct','','ct','','','ct','','','ct','ct','ct','','','','','','','','t','','','','','','','t','','t'];
		prodName[0]=texte["coins"];
		prodTyp[0]="c";
		prodId[prodName[0]]=0;
		prodBestand[0]=parseInt($("coins").innerHTML,10);
		prodPlantSize[0]=1;

		var help1=new Array();
		var help2=new Array();
		var help3=new Array();
		for(var v=1;v<unsafeWindow.produkt_name.length;v++){
			prodName[v]=unsafeWindow.produkt_name[v];
			if(isNaN(gut[v])){ gut[v]=0; }
			prodTyp[v]=unsafeWindow.produkt_category[v];
			prodId[prodName[v]]=v;
			var c=(unsafeWindow.rackElement[v]&&unsafeWindow.rackElement[v].number)?unsafeWindow.rackElement[v].number:0;
			prodBestand[v]=(c?parseInt(c,10):0);
			prodBlock[v]+=(USERLEVEL<unsafeWindow.produkt_level[v]?"l":"")+(prodTyp[v]=="u"?"ut":"");
			prodPlantSize[v]=unsafeWindow.produkt_x[v]*unsafeWindow.produkt_y[v];
			if (!prodBlock[v]){
				switch (prodTyp[v]){
				case "v": help1.push(v); break;
				case "e": help2.push(v); break;
				case "z": help3.push(v); break;
				}
			}
		}
		prodNameSort=["0"].concat(help1,help2,help3);
	} catch(err){
		try{ prodName=GM_getValue(LNG+"_"+SERVER+"_prodName").split("|");
			for(var v=0;v<prodName.length;v++){
				prodId[prodName[v]]=v;
			}
		} catch(err){}
		prodNameSort=GM_getValue(LNG+"_"+SERVER+"_prodNameSort","").split("|");
		prodTyp=GM_getValue(LNG+"_"+SERVER+"_prodTyp","").split("|");
		prodBestand=splitToInt(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_prodBestand",""),"|");
		prodMinRack=splitToInt(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_prodMinRack",""),"|");
		prodMinRackInit=splitToInt(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_prodMinRackInit",""),"|");
		prodPlantSize=splitToInt(GM_getValue(LNG+"_"+SERVER+"_prodPlantSize",""),"|");
		prodBlock=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_prodBlock","").split("|");
	}
	try{
		forestry_prodName=explode(GM_getValue(LNG+"_"+SERVER+"_forestry_prodName","{}"));
	}catch(err){
		forestry_prodName=new Object();
	}
	try{
		forestry_prodBestand=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_forestry_prodBestand","{}"));
	}catch(err){
		forestry_prodBestand=new Object();
	}
	try{
		forestry_farmiNeeded=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_forestry_farmiNeeded","{}"));
	}catch(err){
		forestry_farmiNeeded=new Object();
	}

	top.window.wrappedJSObject.GMprodName=prodName.slice(0);
	top.window.wrappedJSObject.GMprodNameSort=prodNameSort.slice(0);
	top.window.wrappedJSObject.GMprodTyp=prodTyp.slice(0);
	top.window.wrappedJSObject.GMprodBlock=prodBlock.slice(0);
	top.window.wrappedJSObject.GMgut=gut.slice(0);
	top.window.wrappedJSObject.GMpreisBeob=explode(GM_getValue(LNG+"_"+SERVER+"_preisBeob","[]")).slice(0);
	top.window.wrappedJSObject.GMforestry_prodName=forestry_prodName;
	top.window.wrappedJSObject.GMforestry_prodBestand=forestry_prodBestand;
	top.window.wrappedJSObject.GMforestry_farmiNeeded=forestry_farmiNeeded;
}
function saveData(){
	GM_setValue(LNG+"_"+SERVER+"_prodName",prodName.join("|"));
	GM_setValue(LNG+"_"+SERVER+"_prodNameSort",prodNameSort.join("|"));
	GM_setValue(LNG+"_"+SERVER+"_prodTyp",prodTyp.join("|"));
	GM_setValue(LNG+"_"+SERVER+"_prodPlantSize",prodPlantSize.join("|"));
	GM_setValue(LNG+"_"+SERVER+"_gut",gut.join("|"));
	GM_setValue(LNG+"_"+SERVER+"_gutBeob",gutBeob.join("|"));
	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_prodBlock",prodBlock.join("|"));

	//GM_setValue(LNG+"_"+SERVER+"_forestry_prodName",implode(forestry_prodName));
	//GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_forestry_prodBestand",implode(forestry_prodBestand));
	//GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_forestry_farmiNeeded",implode(forestry_farmiNeeded));

}
function checkRequest(request){
	if((request.readyState==4)&&(request.status==200)){
		var response=request.responseText;
		if(response!=0){
			var result=eval('('+response+')');
			if(result[0]!=0){
				return result;
			}
		}
	}
	return null;
}

function showMultiframePage(page){
//GM_log("showMultiframePage:"+page);
    top.window.wrappedJSObject.gclr();
    top.window.wrappedJSObject.clr();
    var i=0;
    while ($top("kunde" + i)){
        $top("kunde" + i).style.display="none";
        i++;
    }
	closeInfoPanel();
    $top("einkaufszettel").style.display="none";
    $top("popup_garden").style.display="block";
    $top("multiframe").style.display="block";
    $top("multiframe").src=page;
}
function showShopframePage(page){
	var cell=$top("shop");
	if(cell){
		if (top.window.wrappedJSObject.city!=1){
			top.document.addEventListener("gameCity1",function(){
				GM_log("showShopframePage:in stad 1");
				top.document.removeEventListener("gameCity1",arguments.callee,false);
				showShopframePage(page);
			},false);
			click($top("citylineitem1"));
		}else if (cell.style.display!="block"){
			cell.style.display="block";
			cell.style.visibility="visible";
			cell=$top("transp3");
			cell.style.display="block";
			cell.style.visibility="visible";
			showShopframePage(page);
		}else{
			$top("travel2city").style.display="none";
			$top("shopframe").src=page;
		}
		//closeInfoPanel();
	}else{
		location.href=page;
	}
	cell=null;
}
function showMessage(from,page,msg){
//GM_log("showMessage:"+from+":"+page+":"+msg);
	//click($top("menueimg1"));
	showMultiframePage("http://s"+SERVER+"."+GAMEPAGES[LNG]+"/nachrichten/read.php?from="+from+"&page="+page+"&msg="+msg+"&mass=0");
}
function showMarket(pid){
	showShopframePage("http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/markt.php"+(typeof pid!="undefined"?"?page=1&order=p&id="+pid+"&filter=1&guild=0":""));
}
function showMarketStall(pid){
	window.setTimeout(function(){
		if(!!pid||pid==0){
			GM_setValue(LNG+"_"+SERVER+"_pagedataStadtMarktstand",implode({"produkt":pid}));
		}
		showShopframePage("http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/marktstand.php");
	},0);
}
function showSGH(){
	top.document.addEventListener("gameCity1",function(){
		click($top("cityzone_1_2"));
		top.document.removeEventListener("gameCity1",arguments.callee,false);
	},false);
	click($top("citylineitem1"));
}
function showLottery(){
	var div=$top("citylineitem2");
	if(div&&($top("lotterycontainer"))){
		top.document.addEventListener("gameCity2",function(){
			click($top("cityzone_2_8"));
			top.document.removeEventListener("gameCity2",arguments.callee,false);
		},false);
		click(div);
	}
	div=null;
}

function showGoToMarketToolTip(event,prod,add1,add2){
	var str='<table class="white">';
	str += '<tr><th colspan="2" style="border-bottom:1px solid white">'+texte["goToMarketOfX"].replace(/%1%/,prodName[prod])+'</th></tr>';
	if(add1){
		str += add1;
		str += '<tr><td colspan="2" style="border-bottom:1px solid white"></td></tr>';
	}
	str += '<tr><td>'+texte["marktpreis"]+'</td><td style="text-align:right;">'+(gut[prod]>=100?moneyFormatInt(gut[prod]):moneyFormat(gut[prod]))+'</td></tr>';
	str += '<tr><td>'+texte["bestand"]+'</td><td style="text-align:right;">'+numberFormat(prodBestand[prod])+'</td></tr>';
	str += '<tr><td>'+texte["wert"]+'</td><td style="text-align:right;">'+moneyFormatInt(gut[prod]*prodBestand[prod])+'</td></tr>';
	if(add2){
		str += '<tr><td colspan="2" style="border-bottom:1px solid white"></td></tr>';
		str += add2;
	}
	str += '</table>';
	showToolTip(event,str);
	str=null;
}

function showStatisticFullscreen(prodId){
	var valStatistikNpc=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valStatistikNpc",true);
	var valStatistikTime=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valStatistikTime",120);
	var newdiv=createElement("div",{"style":"position:absolute;top:0;left:0;height:"+window.innerHeight+"px;width:"+window.innerWidth+"px;background-color:white;color:black;z-index:999;"},ALL,texte["loading"]+"...");
	var url="http://www."+STAT_SERVER[LNG]+"/chart.php?w="+window.innerWidth+"&h="+window.innerHeight+"&t=h"+valStatistikTime+"&shownpc="+(valStatistikNpc?1:0)+"&clip=1&server1="+SERVER+"&product1="+prodId+"&color1=green";
	var newobject=createElement("object",{"data":url,"type":"type=image/svg+xml","style":"position:absolute;top:0;left:0;","width":window.innerWidth+"px","height":window.innerHeight+"px"},newdiv);
	createElement("param",{"name":"src","value":url},newobject);
	var newimg=createElement("img",{"src":GFX+"close.jpg","class":"link","style":"position:absolute;top:30px;right:10px;z-index:2;"},newdiv);
	newimg.addEventListener("click",function(){removeElement(this.parentNode);},false);
	createElement("div",{"style":"position:absolute;top:0px;left:40%;padding:5px;z-index:2;font-weight:bold;border-width:0px 2px 2px 2px;border-style:solid;border-radius:0px 0px 10px 10px;background-color:white;"},newdiv,prodName[prodId]);
	newdiv=null;newobject=null;newimg=null;
}
//***********************************************************************************************************

function quicklinks (){
if (GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valQuicklinks",true)){
	var highlightProducts=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_highlightProducts","[-1,-1,false]"));
	var divquick=createElement("div",{"id":"quicklinks","style":"position:absolute;left:620px;top:40px;width:340px;background-color:white;z-index:10;"},ALL);
	if(self!=top){
		divquick.addEventListener("mouseover",function(){this.style.left="320px";},false);
		divquick.addEventListener("mouseout",function(){this.style.left="620px";},false);
	}

	var newtable=createElement("table",{"border":"3px solid black;"},divquick);
	var newtr=createElement("tr",{},newtable);
	var newtd=createElement("td",{},newtr);

	var newdiv=createElement("div",{"style":"float:right;height:30px;padding:2px;margin-right:20px;"},newtd);
	createElement("div",{"class":"v88"},newdiv);
	var newa=createElement("a",{"class":"link2","href":"markt.php","style":"position:relative;top:-30px;"},newdiv);
	newdiv=createElement("div",{"style":"width:30px;height:30px;background-color:green;opacity:0;"},newa);
	newdiv.addEventListener("mouseover",function(){this.style.opacity="0.3";$("quicklinksName").innerHTML=texte["aktuelleAngebote"];},false);
	newdiv.addEventListener("mouseout",function(){this.style.opacity="0";$("quicklinksName").innerHTML="";},false);
	createElement("div",{"id":"quicklinksName","style":"color:black;font-weight:bold;float:right;line-height:30px;padding:2px;margin-right:20px;"},newtd);

	var prodTypOld="c";
	for(var w=0;w<prodNameSort.length;w++){
		var v=prodNameSort[w];
		if (prodTypOld!=prodTyp[v]){
			newtr=createElement("tr",{},newtable);
			newtd=createElement("td",{},newtr);
			prodTypOld=prodTyp[v];
		}
		newdiv=createElement("div",{"style":"float:left;height:30px;"+(((highlightProducts[0]==v)||(highlightProducts[1]==v))?"border:2px solid blue;-moz-border-radius:10px;":"padding:2px;")},newtd);
		createElement("div",{"class":"v"+v},newdiv);
		newa=createElement("a",{"class":"link2","href":"markt.php?page=1&order=p&id="+v+"&filter=1&guild=0","style":"position:relative;top:-30px;"},newdiv);
		newdiv=createElement("div",{"id":v,"style":"width:30px;height:30px;background-color:blue;opacity:0;"},newa);
		newdiv.addEventListener("mouseover",function(){this.style.opacity="0.3";$("quicklinksName").innerHTML=prodName[this.id];},false);
		newdiv.addEventListener("mouseout",function(){this.style.opacity="0";$("quicklinksName").innerHTML="";},false);
	}
	divquick=null;newtable=null;newtr=null;newtd=null;newdiv=null;newa=null;
}
}
function buildPreise(modeStr,page,appendTo,fontColor,bgHover){
var posTop,posLeft;
	getData();
	var valNimmBeob=GM_getValue(LNG+"_"+SERVER+"_valNimmBeob",false);
	var showAll=GM_getValue(LNG+"_"+SERVER+"_buildPreiseShowAll",false);
	if(!modeStr){ modeStr=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeBuildPreise","cvez"); }
	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeBuildPreise",modeStr);
	if(showAll){
		var help1=new Array();
		var help2=new Array();
		var help3=new Array();
		for(var v=1;v<prodName.length;v++){ if (!prodBlock[v].match(/t/)){
			switch (prodTyp[v]){
			case "v": help1.push(v); break;
			case "e": help2.push(v); break;
			case "z": help3.push(v); break;
			}
		}}
		prodNameSort=[0].concat(help1,help2,help3);
	}

	//head line
	var newdiv=createElement("div",{"class":"tnormal","style":"position:relative;height:20px;width:100%;color:"+fontColor+";font-weight:bold;text-align:center;"},appendTo);
	var cellPreise=createElement("span",{"class":"tnormal","style":"position:relative;margin-right:80px;color:"+fontColor+";font-weight:bold;text-align:center;"},newdiv,page==1?texte["preise"]:texte["lagerwert"]);
	newdiv=createElement("div",{"id":"offertypeselector","class":"productSort","style":"position:absolute;top:0;right:0;"},newdiv);
	newdiv.addEventListener("mouseover",function(event){
		var mouseOverText=event.target.getAttribute("mouseOverText");
		if(mouseOverText){
			mouseOverText='<div>'+texte["click"]+'&nbsp;/&nbsp;'+texte["clickStrg"]+'</div><div>'+mouseOverText+'</div>';
			showToolTip(event,mouseOverText);
		}
	},false);
	var newdiv1=createElement("div",{"mouseOverText":texte["category"]["v"],"class":"link","style":"display:inline-block;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -10px 0px transparent;"},newdiv);
	if (modeStr.match(/v/)){
		newdiv1.style.backgroundPosition="-10px -20px";
		if (modeStr == "v"){
			cellPreise.innerHTML += "&nbsp;"+texte["category"]["v"];
		}
	}else{
		newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-10px 0px";},false);
		newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-10px -20px";},false);
	}
	newdiv1.addEventListener("click",function(event){
		if(event.ctrlKey){
			if(modeStr.match(/v/)){
				modeStr.replace(/v/,"");
			}else{
				modeStr += "v";
			}
		}else{
			modeStr="v";
		}
		appendTo.innerHTML="";
		buildPreise(modeStr,page,appendTo,fontColor,bgHover);
	},false);
	newdiv1=createElement("div",{"mouseOverText":texte["category"]["c"]+"<br>"+texte["category"]["e"],"class":"link","style":"display:inline-block;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -62px 0px transparent;"},newdiv);
	if (modeStr.match(/c/)&&modeStr.match(/e/)){
		newdiv1.style.backgroundPosition="-62px -20px";
		if (modeStr == "ce"){
			cellPreise.innerHTML += "&nbsp;"+texte["category"]["c"]+"/"+texte["category"]["e"];
		}
	}else{
		newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-62px 0px";},false);
		newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-62px -20px";},false);
	}
	newdiv1.addEventListener("click",function(event){
		if(event.ctrlKey){
			if(modeStr.match(/ce/)){
				modeStr.replace(/ce/,"");
			}else{
				modeStr += "ce";
			}
		}else{
			modeStr="ce";
		}
		appendTo.innerHTML="";
		buildPreise(modeStr,page,appendTo,fontColor,bgHover);
	},false);
	newdiv1=createElement("div",{"mouseOverText":texte["category"]["z"],"class":"link","style":"display:inline-block;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -36px 0px transparent;"},newdiv);
	if (modeStr.match(/z/)){
		newdiv1.style.backgroundPosition="-36px -20px";
		if (modeStr=="z"){
			cellPreise.innerHTML += "&nbsp;"+texte["category"]["z"];
		}
	}else{
		newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-36px 0px";},false);
		newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-36px -20px";},false);
	}
	newdiv1.addEventListener("click",function(event){
		if(event.ctrlKey){
			if(modeStr.match(/z/)){
				modeStr.replace(/z/,"");
			}else{
				modeStr += "z";
			}
		}else{
			modeStr="z";
		}
		appendTo.innerHTML="";
		buildPreise(modeStr,page,appendTo,fontColor,bgHover);
	},false);
	cellPreise=null;

	//the table
	newdiv=createElement("div",{"style":"height:"+(parseInt(window.getComputedStyle(appendTo,null).height,10)-85)+"px;width:100%;font-color:"+fontColor+";overflow:auto;"},appendTo);
	var newtable=createElement("table",{"border":"0","cellspacing":"0","style":"width:100%;"},newdiv);
	newtable.addEventListener("mouseover",function(event){
		var node=event.target;
		var mouseOverText=node.getAttribute("mouseOverText");
		while((node!=this)&&(!mouseOverText)){
			node=node.parentNode;
			mouseOverText=node.getAttribute("mouseOverText");
		}
		if(mouseOverText){ showToolTip(event,mouseOverText); }
		node=null;mouseOverText=null;
	},false);

	var newtablehead=createElement("thead",{},newtable);
	var newtablebody=createElement("tbody",{},newtable);

	var newtr=createElement("tr",{},newtablehead);
	var newtd=createElement("td",{"colspan":"7","class":"tnormal","align":"center","style":"color:"+fontColor+";font-weight:bold;"},newtr);

	newtr=createElement("tr",{},newtablehead);
	var sumwert=0;
	switch(page){
	case 1:{
		var preisBeob=explode(GM_getValue(LNG+"_"+SERVER+"_preisBeob","[]")); //isNotSent,time,min,max,amount
		if(!(preisBeob instanceof Array)){ preisBeob=new Array(); }
		createElement("td",{"colspan":"2","align":"center", "class":"headercell","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";"},newtr,texte["produkt"]);
		createElement("td",{"align":"right","class":"headercell","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";"},newtr,texte["bestand"]);
		createElement("td",{"align":"right","class":"headercell","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";"},newtr,"&nbsp;"+texte["hofpreis"]);
		createElement("td",{"align":"right","class":"headercell","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";"},newtr,"&nbsp;"+texte["beobachtet"]);
		createElement("td",{"align":"right","class":"headercell","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";"},newtr,texte["marktpreis"]);
		createElement("td",{"align":"right","class":"headercell","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";"},newtr,texte["abzglGebuehr"]);

		var prevTyp=null;
		var borderStr="";
		for(var w=0;w<prodNameSort.length;w++){
			v=prodNameSort[w];
			if (modeStr.search(prodTyp[v])!=-1){
				if (prodTyp[v]!="c"){ sumwert += prodBestand[v]*gut[v]; }
				if((prevTyp!=null)&&(prevTyp!=prodTyp[v])){
					borderStr="border-top:1px dashed "+fontColor+";";
				}else{
					borderStr="";
				}
				prevTyp=prodTyp[v];
				newtr=createElement("tr",{},newtablebody);
				newtr.addEventListener("mouseover",function(){this.style.backgroundColor=bgHover;},false);
				newtr.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);

				newdiv=createElement("td",{"style":borderStr},newtr);
				produktPic(v,newdiv);

				newdiv=createElement("td",{"style":borderStr},newtr);
				newa=createElement("a",{"id":v},newdiv,prodName[v]);
				if(prodBlock[v]){
					newtr.setAttribute("mouseOverText",texte["levelTooLow"]);
					newa.style.textDecoration="none";
				}else{
					newtr.setAttribute("mouseOverText",texte["wert"]+":&nbsp;"+moneyFormatInt(prodBestand[v]*gut[v]));
					newa.setAttribute("mouseOverText",'<table class="white tmenu"><tr><th colspan="2" style="border-bottom:1px solid white">'+texte["goToMarketOfX"].replace(/%1%/,prodName[v])+'</th></tr><tr><td>'+texte["wert"]+'</td><td style="text-align:right;">'+moneyFormatInt(prodBestand[v]*gut[v])+'</td></table>');
					newa.setAttribute("class","link");
					newa.addEventListener("click",function(){showMarket(this.id);},false);
				}

				createElement("td",{"style":"text-align:right;"+borderStr},newtr,prodBlock[v]?"<span style='color:red;'>---</span>":(prodBestand[v]?numberFormat(prodBestand[v],0):"-"));
				newtd=createElement("td",{"style":"text-align:right;"+borderStr},newtr);
				if(NPC[v]!=undefined){
					if(!isNaN(NPC[v])){
						newtd.innerHTML=numberFormat(NPC[v],2);
					}else if (NPC[v].match(/c(\d+)/)){
						coinsFormat(parseInt(NPC[v].replace("c",""),10),newtd);
					}
					if((NPCSAISON[v]!=undefined)&&(!NPCSAISON[v])){
						newtd.style.textDecoration="line-through";
						newtd.setAttribute("class","hoverNoTextDecoration");
					}
				}else{
					newtd.innerHTML="&nbsp;";
				}

				newtd=createElement("td",{"style":"text-align:right;"+borderStr},newtr,(gutBeob[v]?numberFormat(gutBeob[v],2):"&nbsp;"));
				if(preisBeob[v]){
					if(preisBeob[v][4]>0){
						newtd.setAttribute("mouseOverText",getFormattedDateStr(preisBeob[v][1])+"&nbsp;"+getDaytimeStr(preisBeob[v][1])+"<br>"+moneyFormat(preisBeob[v][2])+"&nbsp;-&nbsp;"+moneyFormat(preisBeob[v][3])+"<br>#"+numberFormat(preisBeob[v][4]));
					}else{
						newtd.setAttribute("mouseOverText",getFormattedDateStr(preisBeob[v][1])+"&nbsp;"+getDaytimeStr(preisBeob[v][1])+"<br>#"+numberFormat(preisBeob[v][4]));
						newtd.style.textDecoration="line-through";
						newtd.setAttribute("class","hoverNoTextDecoration");
					}
					if(now-preisBeob[v][1]>259200){ // 3 days
						if(now-preisBeob[v][1]>604800){ // 7 days
							newtd.style.color="red";
						}else{
							newtd.style.color="yellow";
						}
					}
				}else if(!prodBlock[v]){
					newtd.setAttribute("mouseOverText","---");
				}

				newtd=createElement("td",{"style":"text-align:right;"+borderStr},newtr);
				if(valNimmBeob){
					newtd.innerHTML=numberFormat(gut[v],2);
				}else{
					createElement("span",{"style":"font-size:0;"},newtd,numberFormat(gut[v],2));
					newinput=createElement("input",{"id":"inp"+v,"tabindex":parseInt(w,10)+1,"value":numberFormat(gut[v],2),"class":"text","size":"10","maxlength":"10","style":"text-align:right; background-color:transparent; color:"+fontColor+";"},newtd);
					newinput.addEventListener("focus",function(){this.style.backgroundColor=bgHover;},false);
					newinput.addEventListener("blur",function(){
						this.style.backgroundColor="transparent";
						this.value=numberFormat(gut[this.id.replace("inp","")],2);
					},false);
					newinput.addEventListener("change",function(){
						var currId=this.id.replace("inp","");
						var preis=Math.max(0,parseFloat(this.value.replace(regDelimThou,"").replace(regDelimDeci,"."),10));
						var thisNode=this;
						var yesFkt = function(){
							gut[currId]=preis;
							GM_setValue(LNG+"_"+SERVER+"_gut",gut.join("|"));
							raiseEventTop("gameChangedGut");
							thisNode.value=numberFormat(preis,2);
							thisNode.parentNode.nextSibling.innerHTML=numberFormat(0.9*preis,2);
							thisNode=null;
						};
						var noFkt = function(){
							thisNode.value=numberFormat(gut[currId],2);
							thisNode=null;
						};
						if(preis==0){
							alert2(texte["alertSetPriceNone"].replace(/%PRODUCT%/,prodName[currId]),texte["yes"],texte["no"],yesFkt,noFkt);
						}else if((!isNaN(NPC[currId]))&&(preis>NPC[currId])){
							alert2(texte["alertSetPriceOverNPC"].replace(/%PRODUCT%/,prodName[currId]).replace(/%PRICE%/,moneyFormat(preis)).replace(/%NPC%/,moneyFormat(NPC[currId])),texte["yes"],texte["no"],yesFkt,noFkt);
						}else if ((gutBeob[currId]!=undefined)&&(gutBeob[currId]>0)){
							if(preis<0.7*gutBeob[currId]){
								alert2(texte["alertSetPriceUnderObs"].replace(/%PRODUCT%/,prodName[currId]).replace(/%PRICE%/,moneyFormat(preis)).replace(/%OBS%/,moneyFormat(gutBeob[currId])),texte["yes"],texte["no"],yesFkt,noFkt);
							}else if (1.3*gutBeob[currId]<preis){
								alert2(texte["alertSetPriceOverObs"].replace(/%PRODUCT%/,prodName[currId]).replace(/%PRICE%/,moneyFormat(preis)).replace(/%OBS%/,moneyFormat(gutBeob[currId])),texte["yes"],texte["no"],yesFkt,noFkt);
							}else{
								yesFkt();
							}
						}else{
							yesFkt();
						}
						this.style.backgroundColor="transparent";
					},false);
				}
				createElement("td",{"style":"text-align:right;"+borderStr},newtr,numberFormat(0.9*gut[v],2));
			}
		}
	break;}
	case 2:{
		var valMinRackMan=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackMan",false);
		createElement("td",{"align":"center","class":"headercell","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";"},newtr,"&nbsp;");
		newtd=createElement("td",{"align":"left","class":"headercell link","sortdir":"Desc","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";"},newtr,texte["produkt"]);
		newtd.addEventListener("mouseover",function(){this.style.backgroundColor=bgHover;},false);
		newtd.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);
		newtd=createElement("td",{"align":"right","class":"headercell link","sortdir":"Asc","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";"},newtr,texte["bestand"]);
		newtd.addEventListener("mouseover",function(){this.style.backgroundColor=bgHover;},false);
		newtd.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);
		newtd=createElement("td",{"align":"right","class":"headercell link","sortdir":"Asc","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";"},newtr,"&nbsp;"+texte["wert"]);
		newtd.addEventListener("mouseover",function(){this.style.backgroundColor=bgHover;},false);
		newtd.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);
		createElement("td",{"align":"right","class":"headercell","style":"color:"+fontColor+";border-bottom:1px dashed "+fontColor+";padding-right:20px"},newtr,"&nbsp;"+texte["minRack"]);
		new SortableTable(newtr);

		for(var w=0;w<prodNameSort.length;w++){
			v=prodNameSort[w];
			if (modeStr.search(prodTyp[v])!=-1){
				if (prodTyp[v]!="c") sumwert+=prodBestand[v]*gut[v];
				newtr=createElement("tr",{},newtablebody);
				newtr.addEventListener("mouseover",function(){this.style.backgroundColor=bgHover;},false);
				newtr.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);

				newdiv=createElement("td",{},newtr);
				produktPic(v,newdiv);

				newdiv=createElement("td",{"value":w},newtr);
				newa=createElement("a",{"id":v},newdiv,prodName[v]);
				if(prodBlock[v]){
					newtr.setAttribute("mouseOverText",texte["levelTooLow"]);
					newa.style.textDecoration="none";
				}else{
					newtr.setAttribute("mouseOverText",texte["marktpreis"]+":&nbsp;"+moneyFormat(gut[v]));
					newa.setAttribute("mouseOverText",'<table class="white tmenu"><tr><th colspan="2" style="border-bottom:1px solid white">'+texte["goToMarketOfX"].replace(/%1%/,prodName[v])+'</th></tr><tr><td>'+texte["marktpreis"]+'</td><td style="text-align:right;">'+moneyFormat(gut[v])+'</td></table>');
					newa.setAttribute("class","link");
					newa.addEventListener("click",function(){showMarket(this.id);},false);
				}

				if(prodBlock[v]){
					createElement("td",{"align":"right","value":0},newtr,"<span style='color:red;'>---</span>");
					createElement("td",{"align":"right","value":0},newtr,"<span style='color:red;'>---</span>");
				}else if(prodBestand[v]){
					createElement("td",{"align":"right","value":prodBestand[v]},newtr,numberFormat(prodBestand[v]));
					createElement("td",{"align":"right","value":prodBestand[v]*gut[v]},newtr,numberFormat(prodBestand[v]*gut[v]));
				}else{
					createElement("td",{"align":"right","value":0},newtr,"-");
					createElement("td",{"align":"right","value":0},newtr,"-");
				}

				newtd=createElement("td",{"align":"right","style":"padding-right:20px"},newtr);
				if(valMinRackMan){
					newinput=createElement("input",{"id":"inp"+v,"tabindex":parseInt(w,10)+1,"value":numberFormat(prodMinRackInit[v]),"class":"text","size":"10","maxlength":"10","style":"text-align:right; background-color:transparent; color:"+fontColor+";"},newtd);
					newinput.addEventListener("focus",function(){this.style.backgroundColor=bgHover;},false);
					newinput.addEventListener("blur",function(){
						this.style.backgroundColor="transparent";
						this.value=numberFormat(prodMinRackInit[this.id.replace("inp","")]);
					},false);
					newinput.addEventListener("change",function(){
						var currId=this.id.replace("inp","");
						prodMinRackInit[currId]=parseInt(this.value.replace(regDelimThou,""),10);
						GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_prodMinRackInit",prodMinRackInit.join("|"));
						raiseEventTop("gameChangedProdMinRackInit");
						this.style.backgroundColor="transparent";
						var newdiv=$top("t"+currId);
						if(newdiv){ raiseDOMAttrModified(newdiv); }
						newdiv=null;
					},false);
				}else{
					createElement("span",{},newtd,numberFormat(prodMinRackInit[v]));
				}
			}
		}
	break;}
	}
	newtablebody.setAttribute("height",Math.min(361,19*newtablebody.childElementCount)+"px");

	//foot line
	newtable=createElement("table",{"border":"0","cellspacing":"0","style":"width:100%;"},appendTo);
	newtr=createElement("tr",{},newtable);
	newtd=createElement("td",{"align":"center","style":"border-top:1px dashed "+fontColor+";"},newtr);
	newdiv=createElement("input",{"type":"checkbox","class":"link","checked":showAll},newtd);
	newdiv.addEventListener("click",function(){
		GM_setValue(LNG+"_"+SERVER+"_buildPreiseShowAll",this.checked);
		appendTo.innerHTML="";
		buildPreise(modeStr,page,appendTo,fontColor,bgHover);
	},false);
	createElement("span",{},newtd,texte["showAll"]);

	if(page==1){
		if(!valNimmBeob){
			newtd=createElement("td",{"align":"center","style":"border-top:1px dashed "+fontColor+";"},newtr);
			newa=createElement("a",{"class":"link2","style":"font-weight:bold;"},newtd,texte["nimmPreise"]);
			newa.addEventListener("click",function(){
				alert2(texte["confirm_NimmBeob"],texte["yes"],texte["no"],function(){
					for(var v=0;v<gutBeob.length;v++){
						gut[v]=gutBeob[v];
						if(!isNaN(NPC[v])){ gut[v]=Math.min(gut[v],NPC[v]); }
					}
					GM_setValue(LNG+"_"+SERVER+"_gut",gut.join("|"));
					raiseEventTop("gameChangedGut");
					appendTo.innerHTML="";
					buildPreise(modeStr,page,appendTo,fontColor,bgHover);
				});
			},false);
		}

		newtd=createElement("td",{"align":"center","style":"border-top:1px dashed "+fontColor+";"},newtr);
		newa=createElement("a",{"class":"link2","style":"font-weight:bold;"},newtd,texte["lagerwert"]+":&nbsp;"+moneyFormatInt(sumwert));
		newa.addEventListener("click",function(){
			appendTo.innerHTML="";
			buildPreise(modeStr,2,appendTo,fontColor,bgHover);
		},false);
	}else{
		newtd=createElement("td",{"align":"center","style":"border-top:1px dashed "+fontColor+";"},newtr);
		newa=createElement("a",{"class":"link2","style":"font-weight:bold;"},newtd,texte["preise"]);
		newa.addEventListener("click",function(){
			appendTo.innerHTML="";
			buildPreise(modeStr,1,appendTo,fontColor,bgHover);
		},false);

		newtd=createElement("td",{"align":"center","style":"border-top:1px dashed "+fontColor+";"},newtr);
		createElement("span",{"style":"font-weight:bold;"},newtd,texte["lagerwert"]+":&nbsp;"+moneyFormatInt(sumwert));
	}

	//market buttons
	newdiv=createElement("div",{"class":"link hoverBlack","style":"position:absolute;bottom:0px;right:85px;width:80px;height:40px;font-size:8pt;background: url('"+GFX+"stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},appendTo);
	newdiv.addEventListener("click",function(){
		location.href="http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/markt.php?show=overview";
	},false);
	createElement("div",{"style":"position:absolute;top:7px;left:7px;width:67px;color:white;font-weight: bold;"},newdiv,texte["produktUebersicht"]);

	newdiv=createElement("div",{"class":"link hoverBlack","style":"position:absolute;bottom:0px;right:0px;width:80px;height:40px;font-size:8pt;background: url('"+GFX+"stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},appendTo);
	newdiv.addEventListener("click",function(){showMarket();},false);
	createElement("div",{"style":"position:absolute;top:7px;left:7px;width:67px;color:white;font-weight: bold;"},newdiv,texte["aktuelleAngebote"]);
	newtable=null;newtablehead=null;newtablebody=null;newtr=null;newtd=null;newdiv=null;newdiv1=null;
}
function calcObservedPrice(mode,data){
	// data=[[amount1,price1],[amount2,price2],...]
	switch(mode){
	case 1:{ // normal mode. fast market
		data=data.slice();
		// kick upper 20% quantile
		var sum=0;
		for(var v=0;v<data.length;v++){
			sum += data[v][0];
		}
		sum=Math.floor(0.2*sum);
		for(var v=data.length-1;0<=v;v--){
			if(data[v][0]<sum){
				sum -= data[v][0];
				data.splice(v,1);
			}else{
				data[v][0] -= sum;
				sum=0;
				break;
			}
		}

		// calc weighted mean
		var weights=[3,3,3,3,2,2,2,2,1,1,1,1];
		var count1=0;
		var count2=0;
		for(var v=0;v<data.length;v++){
			if (weights[v]!=undefined){
				count1 += weights[v]*data[v][0]*data[v][1];
				count2 += weights[v]*data[v][0];
			}
		}
		if(count2>0){
			return (Math.round(100*count1/count2)/100);
		}else{
			return 0;
		}
	break;}
	case 2:{ // decorations. slow market
		if(data.length>1){
			return data[1][1];
		}else if(data.length==1){
			return data[0][1];
		}else{
			return 0;
		}
	break;}
	}
}
function do_markt(){
/*
	var test=new Object();
	var help=GM_listValues();
	for(var v=help.length-1;v>-1;v--){
		if(help[v].match(/_prodName$/)){
			var curr=help[v].split("_");
			test[curr[0]]=GM_getValue(help[v]).split("|");
		}
	}
	GM_log(implode(test));
*/
	var valKauflimit=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valKauflimit","[[85,'990000'],110]"));
	var valKauflimitNPC=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valKauflimitNPC",true);
	var highlightProducts=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_highlightProducts","[-1,-1,false]"));
	var mode=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeMarket","cvez");
	var bargeld=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_bargeld",0);
	document.title=(numberFormat(bargeld)).replace(/&nbsp;/," ");

	GM_addStyle(
		"div.link2{color:#ffffff!important;}\n"+
		"div.link2:hover{color:#000000!important;}\n"+
		"a.link2:hover{color:#00ddff!important;}\n"+
		"#marketcontainer{overflow:hidden!important;height:325px!important;width:567px!important;}\n"+
		"#initsearchbutton{right:40px!important;}\n"
	);

	getData();
	var candtable=document.getElementsByTagName("table");
	var candtr=candtable[0].getElementsByTagName("tr");
	var canddiv,canda,candtd,newa,newinput,newspan,newdiv,newdiv1;

	// document.querySelectorAll('a[href^="javascript:f_view"]');
	// document.querySelectorAll('a[onclick*="javascript:f_view("][onclick*="_post"]')
	var marktButtons=new Array();
	marktButtons[0]=document.querySelector('div[onclick*="\'marktstand.php\'"]'); // market stall
	marktButtons[1]=document.querySelector('div[onclick*="\'markt.php?filter=1&guild=1\'"]');	// club offers
	marktButtons[2]=document.querySelector('div[onclick*="\'markt.php?show=overview\'"]');	// overview
	marktButtons[3]=document.querySelector('div[onclick*="\'markt.php\'"]');	// current offers
	for(var v=0;v<marktButtons.length;v++){
		if(marktButtons[v]){
			marktButtons[v].setAttribute("class","link hoverBlack");
		}
	}

	newdiv=createElement("div",{"id":"offertypeselector","class":"productSort","style":"position:absolute;top:0;left:500px;"},ALL);
	newdiv.addEventListener("mouseover",function(event){
		var mouseOverText=event.target.getAttribute("mouseOverText");
		if(mouseOverText){
			mouseOverText='<div>'+texte["click"]+'&nbsp;/&nbsp;'+texte["clickStrg"]+'</div><div>'+mouseOverText+'</div>';
			showToolTip(event,mouseOverText);
		}
	},false);
	var newdiv1=createElement("div",{"mouseOverText":texte["category"]["v"],"class":"link","style":"display:inline-block;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -10px 0px transparent;"},newdiv);
	if (mode.match(/v/)){
		newdiv1.style.backgroundPosition="-10px -20px";
	}else{
		newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-10px 0px";},false);
		newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-10px -20px";},false);
	}
	newdiv1.addEventListener("click",function(event){
		if(event.ctrlKey){
			if(mode.match(/v/)){
				mode.replace(/v/,"");
			}else{
				mode += "v";
			}
		}else{
			mode="v";
		}
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeMarket",mode);
		location.href=location.href;
	},false);

	newdiv1=createElement("div",{"mouseOverText":texte["category"]["c"]+"<br>"+texte["category"]["e"],"class":"link","style":"display:inline-block;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -62px 0px transparent;"},newdiv);
	if (mode.match(/c/)&&mode.match(/e/)){
		newdiv1.style.backgroundPosition="-62px -20px";
	}else{
		newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-62px 0px";},false);
		newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-62px -20px";},false);
	}
	newdiv1.addEventListener("click",function(event){
		if(event.ctrlKey){
			if(mode.match(/ce/)){
				mode.replace(/ce/,"");
			}else{
				mode += "ce";
			}
		}else{
			mode="ce";
		}
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeMarket",mode);
		location.href=location.href;
	},false);

	newdiv1=createElement("div",{"mouseOverText":texte["category"]["z"],"class":"link","style":"display:inline-block;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -36px 0px transparent;"},newdiv);
	if (mode.match(/z/)){
		newdiv1.style.backgroundPosition="-36px -20px";
	}else{
		newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-36px 0px";},false);
		newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-36px -20px";},false);
	}
	newdiv1.addEventListener("click",function(event){
		if(event.ctrlKey){
			if(mode.match(/z/)){
				mode.replace(/z/,"");
			}else{
				mode += "z";
			}
		}else{
			mode="z";
		}
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeMarket",mode);
		location.href=location.href;
	},false);


	if (pageZusatz["show"]=="overview"){
		// Overview page
		var headerline=null;
		candtd=candtable[1].getElementsByTagName("td");
		for(var v=0;v<candtd.length;v++){
			if(candtd[v].innerHTML == "&nbsp;"){
				candtd[v].innerHTML="";
				continue;
			}
			canda=candtd[v].getElementsByTagName("a");
			if(canda[0]){
				var currId=prodId[canda[0].innerHTML];
				if(currId!=undefined){
					if(mode.search(prodTyp[currId])!=-1){
						candtd[v].insertBefore(produktPic(currId),canda[0]);
						if((highlightProducts[0]==currId)||(highlightProducts[1]==currId)){ candtd[v].style.backgroundColor="#20b2aa"; }
					}else{
						GM_log(canda[0].innerHTML);
						candtd[v].parentNode.style.display="none";
						if(headerline){ headerline.style.display="none"; }
					}
				}
			}else{
				var currId=prodId[candtd[v].innerHTML];
				if(currId!=undefined){
					if(mode.search(prodTyp[currId])!=-1){
						candtd[v].innerHTML="";
						produktPic(currId,candtd[v]);
						createElement("span",{},candtd[v],prodName[currId]);
						if((highlightProducts[0]==currId)||(highlightProducts[1]==currId)){ candtd[v].style.backgroundColor="#20b2aa"; }
					}else{
						candtd[v].parentNode.style.display="none";
						if(headerline){ headerline.style.display="none"; }
					}
				}else if(candtd[v].getAttribute("colspan")=="6"){
					headerline=candtd[v].parentNode;
				}
			}
		}
	}else{
		// Market page
		var page=pageZusatz["page"]?parseInt(pageZusatz["page"],10):1;
		var pageId=(/order=p&id=(\d*)/).exec(location.href);
		var userId=(/order=v&id=(\d*)/).exec(location.href);
		var mode2=(pageId||userId)?"cvez":mode;
		var testPageId="";
		var nothingToBuy=true;
		var highlightUser=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_highlight","{}"));
		highlightUser[FARMNAME]="104e8b";
		var valNimmBeob=GM_getValue(LNG+"_"+SERVER+"_valNimmBeob",false);
		var marketcontainer=$("marketcontainer");

		// Page of a single product
		if(pageId){
			var preisKlasse=0;
			$("offertypeselector").style.display="none";

			// NPC price
			newdiv=candtr[1].getElementsByTagName("td")[0];
			newdiv.colSpan="4";
			if(NPC[pageId[1]]){
				if(!isNaN(NPC[pageId[1]])){
					newspan=createElement("span",{"style":"margin-left:5px;"},newdiv,"(NPC&nbsp;"+numberFormat(NPC[pageId[1]],2)+")");
				}else if (NPC[pageId[1]].match(/c(\d+)/)){
					newspan=createElement("span",{"style":"margin-left:5px;"},newdiv,"(NPC&nbsp;<span style='display:inline-block;vertical-align:bottom;'>"+coinsFormat(parseInt(NPC[pageId[1]].replace("c",""),10)).innerHTML+"</span>)");
					//coinsFormat(parseInt(NPC[pageId[1]].replace("c",""),10),newdiv).style.cssFloat="right";
				}
				if((NPCSAISON[pageId[1]]!=undefined)&&(!NPCSAISON[pageId[1]])){
					newspan.style.textDecoration="line-through";
					newspan.setAttribute("class","hoverNoTextDecoration");
					//newspan.addEventListener("mouseover",function(){ this.style.textDecoration="none"; },false);
					//newspan.addEventListener("mouseout",function(){ this.style.textDecoration="line-through"; },false);
				}
			}else{
				createElement("span",{"style":"margin-left:5px;"},newdiv,"(NPC&nbsp;--)");
			}

			// Link to previous/next product
			var c=0;
			while ((c<prodNameSort.length)&&(prodNameSort[c]!=pageId[1])) c++;
			var pageIdVor=prodNameSort[(c-1+prodNameSort.length)%(prodNameSort.length)];
			var pageIdNach=prodNameSort[(c+1)%(prodNameSort.length)];
			newtd=createElement("td",{"colspan":"2"});
			candtr[1].insertBefore(newtd,newdiv);
			newdiv=createElement("div",{"style":"display:inline-block;padding-right:2px;"},newtd);
			newa=createElement("a",{"id":"prevPage","class":"link2","style":"display:inline-block;","href":"markt.php?page=1&order=p&id="+pageIdVor+"&filter=1&guild=0","prod":pageIdVor},newdiv,"<<");
			newa.addEventListener("mouseover",function(event){ showToolTip(event,texte["goToMarketOfX"].replace(/%1%/,prodName[this.getAttribute("prod")])); },false);
			newa=createElement("a",{"id":"nextPage","class":"link2","style":"display:inline-block;","href":"markt.php?page=1&order=p&id="+pageIdNach+"&filter=1&guild=0","prod":pageIdNach},newdiv,">>");
			newa.addEventListener("mouseover",function(event){ showToolTip(event,texte["goToMarketOfX"].replace(/%1%/,prodName[this.getAttribute("prod")])); },false);
			produktPic(pageId[1],newtd);
			newa=createElement("div",{"style":"display:inline-block;"},newtd,numberFormat(prodBestand[pageId[1]],0));
			newa.addEventListener("mouseover",function(event){ showToolTip(event,texte["imLager"]); },false);


			// Checking the offers
			var sumTotal=0;
			var offers=new Array();
			if(marketcontainer.childElementCount==0){
				// no offers
				if (valNimmBeob){
					gut[pageId[1]]=0;
					GM_setValue(LNG+"_"+SERVER+"_gut",gut.join("|"));
					raiseEventTop("gameChangedGut");
				}
				var preisBeob=explode(GM_getValue(LNG+"_"+SERVER+"_preisBeob","[]")); //isNotSent,time,min,max,amount
				if(!(preisBeob instanceof Array)){ preisBeob=new Array(); }
				if(!(preisBeob[pageId[1]]&&preisBeob[pageId[1]][0])){
					preisBeob[pageId[1]]=[false,(Math.floor((new Date()).getTime()/1000)),,,0];
				}
				GM_setValue(LNG+"_"+SERVER+"_preisBeob",implode(preisBeob));
				raiseEventTop("gameChangedBeobPrice");
			}else{
				for(var v=0;v<marketcontainer.childElementCount;v++){
					canddiv=marketcontainer.children[v].getElementsByTagName("div");
					var menge=parseInt(canddiv[0].innerHTML,10);
					canddiv[0].setAttribute("sumTotal",sumTotal);
					canddiv[0].addEventListener("mouseover",function(event){ showToolTip(event,texte["davor"]+": "+numberFormat(this.getAttribute("sumTotal"))); },false);
					sumTotal += menge;
					if(LNG=="se"){
						canddiv[5].innerHTML=canddiv[5].innerHTML.replace(/\.(\d\d) /,",$1 ");
						canddiv[6].innerHTML=canddiv[6].innerHTML.replace(/\.(\d\d) /,",$1 ");
					}
					var preis=parseFloat((/(\d+\.\d+)/).exec(canddiv[5].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."))[1],10);
					offers.push([menge,preis]);
				}
				if(page==1){ // Price observing
					gutBeob[pageId[1]]=calcObservedPrice((prodTyp[pageId[1]]=="z"?2:1),offers);
					GM_setValue(LNG+"_"+SERVER+"_gutBeob",gutBeob.join("|"));
					if (valNimmBeob){
						gut[pageId[1]]=gutBeob[pageId[1]];
						if(!isNaN(NPC[pageId[1]])){ gut[pageId[1]]=Math.min(gut[pageId[1]],NPC[pageId[1]]); }
						GM_setValue(LNG+"_"+SERVER+"_gut",gut.join("|"));
						raiseEventTop("gameChangedGut");
					}
					var preisBeob=explode(GM_getValue(LNG+"_"+SERVER+"_preisBeob","[]")); //isNotSent,time,min,max,amount
					if(!(preisBeob instanceof Array)){ preisBeob=new Array(); }
					preisBeob[pageId[1]]=[true,(Math.floor((new Date()).getTime()/1000)),offers[0][1],offers[offers.length-1][1],sumTotal];
					GM_setValue(LNG+"_"+SERVER+"_preisBeob",implode(preisBeob));
					raiseEventTop("gameChangedBeobPrice");
					if(DEVMODE){ GM_log("price observed "+pageId[1]+":"+ preisBeob[pageId[1]]); }
				}
			}

			// Total amount of all offers
			newtd=createElement("td",{"align":"right","style":"border-top:1px solid;"});
			newtd.innerHTML=numberFormat(sumTotal,0);
			candtr[candtr.length-1].insertBefore(newtd,candtr[candtr.length-1].firstElementChild);

			// Set price field
			newinput=createElement("input",{"id":"setPreis","value":numberFormat(gut[pageId[1]],2),"class":"text","size":"10","maxlength":"10","style":"position:absolute;top:515px;left:545px;text-align:right;background-color:#589456;"},ALL);
			newinput.addEventListener("mouseover",function(event){ showToolTip(event,texte["preis"]+"<br>"+texte["beobachtet"]+":&nbsp;"+moneyFormat(gutBeob[pageId[1]])); },false);
			if(valNimmBeob){
				newinput.readOnly=true;
			}else{
				newinput.addEventListener("focus",function(){this.style.backgroundColor="white";},false);
				newinput.addEventListener("blur",function(){this.style.backgroundColor="589456";},false);
				newinput.addEventListener("change",function(){
					var currId=pageId[1];
					var preis=Math.max(0,parseFloat(this.value.replace(regDelimThou,"").replace(regDelimDeci,"."),10));
					var thisNode=this;
					var yesFkt = function(){
						gut[currId]=preis;
						GM_setValue(LNG+"_"+SERVER+"_gut",gut.join("|"));
						raiseEventTop("gameChangedGut");
						location.href=location.href;
					};
					var noFkt = function(){
						thisNode.value=numberFormat(gut[currId],2);
						thisNode=null;
					};
					if(preis==0){
						alert2(texte["alertSetPriceNone"].replace(/%PRODUCT%/,prodName[currId]),texte["yes"],texte["no"],yesFkt,noFkt);
					}else if((!isNaN(NPC[currId]))&&(preis>NPC[currId])){
						alert2(texte["alertSetPriceOverNPC"].replace(/%PRODUCT%/,prodName[currId]).replace(/%PRICE%/,moneyFormat(preis)).replace(/%NPC%/,moneyFormat(NPC[currId])),texte["yes"],texte["no"],yesFkt,noFkt);
					}else if ((gutBeob[currId]!=undefined)&&(gutBeob[currId]>0)){
						if(preis<0.7*gutBeob[currId]){
							alert2(texte["alertSetPriceUnderObs"].replace(/%PRODUCT%/,prodName[currId]).replace(/%PRICE%/,moneyFormat(preis)).replace(/%OBS%/,moneyFormat(gutBeob[currId])),texte["yes"],texte["no"],yesFkt,noFkt);
						}else if (1.3*gutBeob[currId]<preis){
							alert2(texte["alertSetPriceOverObs"].replace(/%PRODUCT%/,prodName[currId]).replace(/%PRICE%/,moneyFormat(preis)).replace(/%OBS%/,moneyFormat(gutBeob[currId])),texte["yes"],texte["no"],yesFkt,noFkt);
						}else{
							yesFkt();
						}
					}else{
						yesFkt();
					}
				},false);
			}

			// Produkt direct selling
			if(marktButtons[0]){
				marktButtons[0].removeAttribute("onclick");
				marktButtons[0].setAttribute("prod",pageId[1]);
				marktButtons[0].addEventListener("click",function(){
					var prod=this.getAttribute("prod");
					window.setTimeout(function(){
						if (!!prod||prod==0){
							GM_setValue(LNG+"_"+SERVER+"_pagedataStadtMarktstand",implode({"produkt":prod}));
						}
						location.href="marktstand.php";
					},0);
				},false);
			}

			// Statistic server
			if (STAT_SERVER[LNG]){
				newdiv=createElement("div",{"id":"showMarktstat","class":"link2 hoverBlack","style":"position:absolute;top:435px;left:545px;width:80px;height:40px;background: url('"+GFX+"stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},ALL);
				createElement("div",{"style":"position: absolute;top:13px;width:80px;font-weight:bold;text-align:center;"},newdiv,texte["statistik"]);
				newdiv.addEventListener("click",function(){
					showStatisticFullscreen(pageId[1]);
				},false);
			}
		}else{
			var preisKlasse=2;
			candtr[1].firstElementChild.colSpan="6";
		}

		// Redesign of table
		candtr[0].getElementsByTagName("div")[0].style.width="100%";
		candtd=candtr[2].getElementsByTagName("td");
		candtable[0].setAttribute("width","510px");
		candtd[5].innerHTML += texte["kauf"];
		for(var v=0;v<marketcontainer.childElementCount;v++){
			canddiv=marketcontainer.children[v].getElementsByTagName("div");
			var menge=parseInt(canddiv[0].innerHTML,10);
			canddiv[0].innerHTML=numberFormat(menge);
			var currId=/'(\d+)'/.exec(canddiv[3].getElementsByTagName("a")[0].href)[1];
			canddiv[0].parentNode.setAttribute("prod",currId);
			if(testPageId==""){ testPageId=currId; }
			else if(testPageId!=currId){ testPageId="-"; }
			if(mode2.search(prodTyp[currId])==-1){
				marketcontainer.children[v].style.display="none";
				continue;
			}
			var help =(/&nbsp;\[(.*?)\]&nbsp;/.exec(canddiv[4].innerHTML));
			if (help){
				canddiv[4].innerHTML=canddiv[4].innerHTML.replace(help[0],"");
				newspan=createElement("span");
				newspan.innerHTML="]&nbsp;";
				canddiv[4].insertBefore(newspan,canddiv[4].children[1]);
				newa=createElement("a",{"class":"link2"});
				newa.innerHTML=help[1];
				canddiv[4].insertBefore(newa,canddiv[4].children[1]);
				newspan=createElement("span");
				newspan.innerHTML="&nbsp;[";
				canddiv[4].insertBefore(newspan,canddiv[4].children[1]);
				newa.addEventListener("click",function(){
					showShopframePage("http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/stats.php?guildsearch="+this.innerHTML);
				},false);
			}
			if(LNG=="se"){
				canddiv[5].innerHTML=canddiv[5].innerHTML.replace(/\.(\d\d) /,",$1 ");
				canddiv[6].innerHTML=canddiv[6].innerHTML.replace(/\.(\d\d) /,",$1 ");
			}
			canddiv[5].innerHTML=canddiv[5].innerHTML.replace(" "+texte["waehrung"],"");
			canddiv[6].innerHTML=canddiv[6].innerHTML.replace(" "+texte["waehrung"],"");
			canddiv[7].style.textAlign="right";
			canddiv[7].style.width="60px";
			var preis=parseFloat(/(\d+\.\d+)/.exec(canddiv[5].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."))[1],10);

			canda=canddiv[7].getElementsByTagName("a");
			if (canda[0]){
				if(gut[currId]) canda[0].innerHTML=numberFormat(gut[currId],2); //GutPreis zeigen
			}else{
				canddiv[7].innerHTML=""; //eigenes Angebot oder zu wenig Geld
				canddiv[7].parentNode.style.opacity="0.7";
			}
			if (NPC[currId]&&((NPCSAISON[currId]==undefined)||(NPCSAISON[currId]))&&(preis>=NPC[currId])){
				if(preisKlasse<1){
					preisKlasse++;
					marketcontainer.children[v].style.borderTop="2px solid white";
				}
				if(canda[0] && valKauflimitNPC){ //zu teuer Link entfernen (NPC)
					canddiv[7].innerHTML=canda[0].innerHTML;
					canddiv[7].addEventListener("mouseover",function(event){ showToolTip(event,texte["ueberNPC"]+" ("+numberFormat(NPC[this.parentNode.getAttribute("prod")],2)+")"); },false);
				}
				canddiv[7].parentNode.style.opacity="0.5";
				canddiv[7].style.fontStyle="italic";
				if (0.9*preis>NPC[currId]){ //111% NPC
					marketcontainer.children[v].style.fontStyle="italic";
					if(preisKlasse<2){
						preisKlasse++;
						marketcontainer.children[v].style.borderTop="2px dashed white";
					}
				}
			}else if(gut[currId]!=0){
				var help=100*preis/gut[currId];
				if(help<=valKauflimit[0][0]){
					if(canda[0]){ canddiv[5].style.backgroundColor="#"+valKauflimit[0][1]; }//billig Angebot highlight
				}else if(help>valKauflimit[1]){ //zu teuer Link entfernen (Limit)
					if(canda[0]){
						canddiv[7].innerHTML=canda[0].innerHTML;
						canddiv[7].addEventListener("mouseover",function(event){ showToolTip(event,texte["ueberX"].replace(/%1%/,valKauflimit[1]+"%")); },false);
					}
					canddiv[7].parentNode.style.opacity="0.7";
				}
			}
			if(canda[0]){ nothingToBuy=false; }

			canda=canddiv[4].getElementsByTagName("a");
			if (canda[0]&&(highlightUser[canda[0].innerHTML])){ canddiv[4].style.backgroundColor="#"+highlightUser[canda[0].innerHTML]; }
			if ((highlightProducts[0]==currId)||(highlightProducts[1]==currId)){ canddiv[1].style.backgroundColor="#20b2aa"; }
		}

		if(pageId){
			//Link to NPC-Shop
			if(nothingToBuy && (page==1) && (prodTyp[pageId[1]]=="v") && $top("shop")){
				newdiv=createElement("div",{"id":"showNPC","class":"link2","style":"position:absolute;top:435px;left:460px;width:80px;height:40px;background: url('"+GFX+"stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},ALL);
				createElement("div",{"style":"position: absolute; top: 13px;width: 80px; font-weight: bold; text-align:center;"},newdiv,texte["SGH"]);
				newdiv.addEventListener("click",showSGH,false);
			}
			// no offers - create a line
			if(marketcontainer.childElementCount==0){
				var newdivline=createElement("div",{"class":"marketline"},marketcontainer);
				createElement("div",{"class":"c1"},newdivline,"0");
				newdiv=createElement("div",{"class":"c2"},newdivline);
				createElement("div",{"class":"c2_1 kp"+pageId[1]},newdiv);
				newdiv=createElement("div",{"class":"c2_2"},newdiv,"&nbsp;");
				createElement("a",{href:"javascript:orderBy('p','"+pageId[1]+"')","class":"link2"},newdiv,prodName[pageId[1]]);
				createElement("div",{"class":"c3"},newdivline,"---");
				newdiv=createElement("div",{"class":"c4"},newdivline);
				if(NPC[pageId[1]]){
					if(!isNaN(NPC[pageId[1]])){
						newdiv.innerHTML=numberFormat(NPC[pageId[1]],2);
					}else if (NPC[pageId[1]].match(/c(\d+)/)){
						coinsFormat(parseInt(NPC[pageId[1]].replace("c",""),10),newdiv).style.cssFloat="right";
					}
				}
				createElement("div",{"class":"c5"},newdivline,"---");
				createElement("div",{"class":"c6"},newdivline,"---");
				newdivline=null;
			}
		}

		// Page is product page but url is wrong (occurs after buying)
		if(!pageId && pageZusatz.isEmpty() && !isNaN(testPageId) && (!$("angebot_kaufen"))){
			location.href="markt.php?page=1&order=p&id="+testPageId+"&filter=1&guild=0";
		}

		// Page of a single user
		if(userId){
			canda=candtr[3].getElementsByTagName("a");
			if(canda[1]){ var thisUser=canda[1].innerHTML; }
			newtr=createElement("tr",{},candtable[0]);
			newtd=createElement("td",{},newtr);
			if (thisUser){igm(thisUser,newtd);}
			stats(userId[1],newtd);
		}
		marketcontainer=null;
	}

	newdiv=createElement("div",{"id":"showPreise","class":"link2 hoverBlack", "style":"position:absolute;top:475px;left:545px;width:80px;height:40px;background:url('"+GFX+"stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},ALL);
	newdiv.addEventListener("click",function(){
		var newdiv;
		if(newdiv=$("initsearchbutton")){ removeElement(newdiv); }
		if(newdiv=$("marktstat")){ removeElement(newdiv); }
		if(newdiv=$("showMarktstat")){ removeElement(newdiv); }
		if(newdiv=$("showNPC")){ removeElement(newdiv); }
		if(newdiv=$("setPreis")){ removeElement(newdiv); }
		if(newdiv=$("angebot_kaufen")){ removeElement(newdiv); }
		if(newdiv=$("offertypeselector")){ removeElement(newdiv); }
		if(marktButtons[2]){ removeElement(marktButtons[2]); }
		if(marktButtons[3]){ removeElement(marktButtons[3]); }
		var marketTable=document.getElementsByTagName("table")[0];
		newdiv=createElement("div",{"style":"position:absolute;height:470px;width:575px;top:45px;left:35px;padding-right:15px;font-color:#f0ffef;overflow:auto;"});
		marketTable.parentNode.replaceChild(newdiv,marketTable);
		buildPreise(pageId?prodTyp[pageId[1]]:null,1,newdiv,"#f0ffef","#084200");
		newdiv=null;marketTable=null;
		removeElement(this);
	},false);
	createElement("div",{"style":"position:absolute;top:13px;width:80px;font-weight:bold;text-align:center;"},newdiv,texte["preise"]);

	// buying progress
	/*
	newdiv=$("buy_menge");
	if(newdiv){
		var submitDone=false;
		//newdiv.parentNode.setAttribute("onsubmit","return false;")
		//GM_log(newdiv.parentNode.getAttribute("onsubmit"))
		newdiv.parentNode.addEventListener("submit",function(event){
			GM_log("addEventListener")

			return;
			if(submitDone){
				event.preventDefault();
				return;
			}
			submitDone=true;
			bargeld=Math.round(100*(bargeld-unsafeWindow.price*parseInt($("buy_menge").value,10)))/100;
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_bargeld",bargeld);
		},false);
	}
	*/

	quicklinks();
	canda=null;candtable=null;candtr=null;candtd=null;canddiv=null;newa=null;newinput=null;newspan=null;newdiv=null;newdiv1=null;
}

function do_marktstand(){
	GM_addStyle("#errorpopup{top:310px!important;left:375px!important;width:200px!important;}");
	var pagedata=new Object();
	try{ pagedata=explode(GM_getValue(LNG+"_"+SERVER+"_pagedataStadtMarktstand","{}")); }catch(err){}
	GM_setValue(LNG+"_"+SERVER+"_pagedataStadtMarktstand","{}");

	getData();
	document.title=numberFormat(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_bargeld",0));
	var valVerkaufLimitDown=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valVerkaufLimitDown",95);
	var valVerkaufLimitUp=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valVerkaufLimitUp",130);
	var valJoinPreise=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valJoinPreise",false);
	var lastOffer=new Array();
	try{ lastOffer=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lastOffer","[]")); }catch(err){}
	var oldPricesInserted=-1;
	var preisBeob=new Array(); //isNotSent,time,min,max,amount
	try{ preisBeob=explode(GM_getValue(LNG+"_"+SERVER+"_preisBeob","[]")); }catch(err){}
	if(!(preisBeob instanceof Array)){ preisBeob=new Array(); }
	var protectMinRack=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_protectMinRack",false);
	var marketOffers=new Object();

	// offer table
	var candtable=document.getElementsByTagName("table");
	if (!candtable[0]){
		createElement("tbody",{},createElement("table",{},document.querySelector("div[style*='position:absolute;top:45px;left:25px;']")));
	}
	//now=Math.floor((new Date()).getTime()/1000);
	var marketOfferTimes=new Object();
	try{ marketOfferTimes=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_marketOfferTimes","{}")); }catch(err){}
	var marketOfferTimesNew=new Object();
	candtable[0].parentNode.style.width="";//"300px";
	candtable[0].parentNode.style.paddingRight="17px";
	candtable[0].parentNode.style.zIndex="2";
	candtable[0].setAttribute("cellspacing","0");
	candtable[0].setAttribute("cellpadding","2");
	candtable[0].style.whiteSpace="nowrap";
	candtable[0].addEventListener("mouseover",function(event){
		var node=event.target;
		var mouseOverText=node.getAttribute("mouseOverText");
		while((node!=this)&&(!mouseOverText)){
			node=node.parentNode;
			mouseOverText=node.getAttribute("mouseOverText");
		}
		if(mouseOverText){ showToolTip(event,mouseOverText); }
		node=null;mouseOverText=null;
	},false);
	createElement("div",{"style":"position:absolute;top:6px;left:190px;height:247px;width:150px;background:"+ALL.style.backgroundImage+" -57px -6px;"},ALL);
	var candtr=candtable[0].getElementsByTagName("tr");
	var help=ALL.getElementsByTagName("span")[0];
	help.innerHTML=candtr.length+" "+help.innerHTML;
	var prod,amount,price,cand;
	var sum=0;
	for(var v=0;v<candtr.length;v++){
		cand=candtr[v].getElementsByTagName("td");
		help=new RegExp(texte["msgMarketplace"]).exec(cand[0].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,""));
		amount=parseInt(help[1],10);
		prod=prodId[help[2]];
		price=parseInt(help[3],10)/100;
		sum += amount*price;
		if(!marketOffers[prod]){ marketOffers[prod]=new Object(); }
		marketOffers[prod][price]=(marketOffers[prod][price]?marketOffers[prod][price]:0)+amount;

		cand[0].innerHTML=numberFormat(amount);
		cand[0].style.textAlign="right";
		createElement("td",{"style":"color:#f0ffef;"},candtr[v],prodName[prod]);
		createElement("td",{"style":"color:#f0ffef;text-align:right;"},candtr[v],moneyFormat(price)+":");
		createElement("td",{"style":"color:#f0ffef;text-align:right;"},candtr[v],moneyFormatInt(amount*price));

		help=cand[1].firstElementChild.getAttribute("onclick").replace(/\D+/g,"");
		if(!marketOfferTimes[help]){ marketOfferTimes[help]=now; }
		marketOfferTimesNew[help]=marketOfferTimes[help];
		cand[1].firstElementChild.setAttribute("mouseOverText",cand[1].firstElementChild.getAttribute("title"));
		cand[1].firstElementChild.setAttribute("title","");
		candtr[v].appendChild(cand[1]);

		candtr[v].setAttribute("prod",prod);
		candtr[v].setAttribute("price",price);
		candtr[v].addEventListener("mouseover",function(){this.style.backgroundColor='#084200';},false);
		candtr[v].addEventListener("mouseout",function(){this.style.backgroundColor='transparent';},false);
		help='<table class="white tmenu"><tr><th colspan="3" style="border-bottom:1px solid white;">'+texte["goToMarketOfX"].replace(/%1%/,prodName[prod])+'</th></tr><tr><td>'+texte["seitX"].replace(/%1%/,getTimeStr(now-marketOfferTimesNew[help]))+'</td></tr></table>';
		for(var w=0;w<4;w++){
			cand[w].setAttribute("class","link");
			cand[w].setAttribute("mouseOverText",help);
			cand[w].addEventListener("click",function(){ showMarket(this.parentNode.getAttribute("prod")); },false);
		}
	}

	// sort the table
	var tbody=candtable[0].getElementsByTagName("tbody")[0];
	// clone the rows
	   var newRows=new Array();
	   for(j=0; j < tbody.rows.length; j++){
		newRows[j]=tbody.rows[j];
	}
	//sort them
	newRows.sort(function(a,b){
		var prodA=parseInt(a.getAttribute("prod"),10);
		var prodB=parseInt(b.getAttribute("prod"),10);
		if(prodA==prodB){
			return(parseFloat(a.getAttribute("price"),10)-parseFloat(b.getAttribute("price"),10));
		}else if(prodTyp[prodA]==prodTyp[prodB]){
			return(prodA-prodB);
		}else{
			return({"c":0,"v":1,"e":2,"z":3}[prodTyp[prodA]]-{"c":0,"v":1,"e":2,"z":3}[prodTyp[prodB]]);
		}
	});
	// rebuild table
	var oldType=null;
	var newType=null;
	for(i=0;i<newRows.length;i++){
		tbody.appendChild(newRows[i]);
		newType=prodTyp[newRows[i].getAttribute("prod")];
		if((oldType!=null)&&(oldType!=newType)){ newRows[i].setAttribute("class","borderTop1dashedWhite"); }
		oldType=newType;
	}
	tbody=null;newRows=null;

	// sort the marketOffers-data
	marketOffers.sortObj(sortObjFunctions["productId"]);
	for(var v in marketOffers){
		if(!marketOffers.hasOwnProperty(v)){ continue; }
		marketOffers[v].sortObj(sortObjFunctions["float"]);
	}

	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_marketOffers",implode(marketOffers));
	raiseEventTop("gameChangedMarketOffers");
	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_marketOfferTimes",implode(marketOfferTimesNew));
	createElement("div",{"style":"position:absolute;top:250px;left:25px;padding:3px;background-color:#002300;color:white;border-top:1px dashed white;"},ALL,moneyFormat(sum));
	candtr=null;help=null;prod=null;amount=null;price=null;

	// products
	function checkPreis(){
		var currId=prodId[$("preisschild").getElementsByTagName("span")[0].innerHTML];
		if(oldPricesInserted==currId){ //old offer set
			lastOffer[currId]=[parseInt($("produkt_anzahl").value,10),parseInt($("produkt_preis1").value,10),parseInt($("produkt_preis2").value,10)];
			try{GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_lastOffer",implode(lastOffer));}catch(err){GM_log("checkPreis: "+currId+" not saved! "+err);}
		}else{
			oldPricesInserted=currId;
			if(lastOffer[currId]){
				$("produkt_anzahl").value=lastOffer[currId][0];
				$("produkt_preis1").value=lastOffer[currId][1];
				$("produkt_preis2").value=(lastOffer[currId][2]<10?"0":"")+lastOffer[currId][2];
				if($("produkt_preis_ganz")){ $("produkt_preis_ganz").value=lastOffer[currId][1]+delimDeci+(lastOffer[currId][2]<10?"0":"")+lastOffer[currId][2]; }
			}
		}
		var currPreis=parseFloat($("produkt_preis1").value+"."+$("produkt_preis2").value,10);
		var currAnzahl=parseInt($("produkt_anzahl").value,10);
		if(protectMinRack){ //rack amount protection
			prodBestand[currId]=parseInt($("lbl_produkt_max").innerHTML.replace(regDelimThou,""),10);
			if(currAnzahl>prodBestand[currId]-prodMinRack[currId]){
				currAnzahl=Math.max(0,prodBestand[currId]-prodMinRack[currId]);
				$("produkt_anzahl").value=currAnzahl;
			}
		}
		var newtable=createElement("table");
		var newtr;
		$("divBerInfo").replaceChild(newtable,$("divBerInfo").getElementsByTagName("table")[0]);
		if (gut[currId]){
			$("preisschild").querySelector("#verkaufe_markt").style.display=(((100*currPreis>valVerkaufLimitDown*gut[currId]) && (100*currPreis<valVerkaufLimitUp*gut[currId]))?"":"none");
			newtr=createElement("tr",{},newtable);
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["preis"]+": ");
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,moneyFormatLimit(gut[currId],100));
		}
		newtr=createElement("tr",{},newtable);
		createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["wert"]+": ");
		createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,moneyFormatLimit(currPreis*currAnzahl,100));

		newtable=createElement("table");
		$("divBerInfo2").replaceChild(newtable,$("divBerInfo2").getElementsByTagName("table")[0]);
		if (preisBeob[currId]){
			newtr=createElement("tr",{},newtable);
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,"min: ");
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,moneyFormatLimit(preisBeob[currId][2],100));
		}
		if (gutBeob[currId]){
			newtr=createElement("tr",{},newtable);
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["beobachtet"]+": ");
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,moneyFormatLimit(gutBeob[currId],100));
		}
		if (!isNaN(NPC[currId])){
			newtr=createElement("tr",{},newtable);
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["hofpreis"]+": ");
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,moneyFormatLimit(NPC[currId],100));
		}
		newtable=null;newtr=null;
	}
	if ($("produkt_preis1")){
		var newdiv=createElement("div",{"style":"position:absolute;top:175px;width:150px"},$("preisschild"));
		newdiv=createElement("div",{"id":"divBerInfo","style":"float:right;padding:3px;background-color:#002300;border:5px solid #594230;color:#f0ffef;font-weight:bold;"},newdiv);
		createElement("table",{},newdiv);
		newdiv=createElement("div",{"style":"position:absolute;top:175px;left:180px"},$("preisschild"));
		newdiv=createElement("div",{"id":"divBerInfo2","style":"float:left;padding:0;background-color:#002300;border:5px solid #594230;font-weight:bold;"},newdiv);
		createElement("table",{},newdiv);
		newdiv=null;

		$("lbl_produkt_max").setAttribute("class",$("lbl_produkt_max").getAttribute("class")+" link");
		$("lbl_produkt_max").addEventListener("click",function(){
			$("produkt_anzahl").value=this.innerHTML.replace(regDelimThou,"");
			keyup($("produkt_anzahl"));
		},false);
		$("produkt_anzahl").addEventListener("focus",checkPreis,false); // fired when offer-div opens
		$("preisschild").addEventListener("keyup",function(event){
			checkPreis();
			if (event.keyCode==13){
				var submitButton=$("preisschild").querySelector("#verkaufe_markt");
				if(submitButton.style.display!="none"){ click(submitButton); }
				submitButton=null;
			}
		},false);

		if(valJoinPreise){
			$("produkt_preis1").setAttribute("tabindex","0");
			$("produkt_preis2").setAttribute("tabindex","0");
			var newinput=createElement("input",{"id":"produkt_preis_ganz","type":"text","style":"position:absolute;left:0;top:0;background-color:#002300;color:#f0ffef;width:131px;text-align:right;border:1px solid #555;","tabindex":"2","maxlength":"9","name":"p_preis_ganz","class":"text thuge"},$("produkt_preis1").parentNode);
			newinput.addEventListener("keyup",function(event){
				if (event.keyCode==13){
					var submitButton=$("preisschild").querySelector("#verkaufe_markt");
					if(submitButton.style.display!="none"){ click(submitButton); }
					submitButton=null;
				}else{
					var preis=this.value.replace(regDelimThou,"").replace(regDelimDeci,".");
					var preis1=parseInt(preis,10);
					var preis2=(preis.search(/\./)!=-1?(preis+"00").substr(1+preis.search(/\./),2):"00");
					$("produkt_preis1").value=preis1;
					$("produkt_preis2").value=preis2;
					keyup($("produkt_preis1"));
				}
			},false);
			newinput=null;
		}
	}

	// coins
	function checkPreisCoins(){
		//GM_log("checkPreisCoins "+oldPricesInserted);
		window.setTimeout(function(){ // first let finish the functions
			if(oldPricesInserted==0){ //old offer set
				lastOffer[0]=[parseInt($("coinsanzahl").value,10),parseInt($("coinspreis").value,10),$("coinssollpreis").checked];
				try{GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_lastOffer",implode(lastOffer));}catch(err){GM_log("checkPreisCoins: 0 not saved! "+err);}
			}else{
				oldPricesInserted=0;
				if(lastOffer[0]){
					$("coinsanzahl").value=lastOffer[0][0];
					$("coinspreis").value=lastOffer[0][1];
					$("coinssollpreis").checked=lastOffer[0][2];
					unsafeWindow.chkAmount();
					unsafeWindow.calcMarketPrice();
				}
			}
			var currPreis=parseInt($("coinsmarktpreis").innerHTML,10);
			var currAnzahl=parseInt($("coinsanzahl").value,10);
			var currUserPreis=parseInt($("coinsuserpreis").innerHTML,10);

			if(protectMinRack){ //rack amount protection
				prodBestand[0]=parseInt($("lbl_produkt_max").innerHTML.replace(regDelimThou,""),10);
				if(currAnzahl>prodBestand[0]-prodMinRack[0]){
					currAnzahl=Math.max(0,prodBestand[0]-prodMinRack[0]);
					$("coinsanzahl").value=currAnzahl;
				}
			}
			var newtable=createElement("table");
			var newtr;
			$("divBerInfoCoins").replaceChild(newtable,$("divBerInfoCoins").getElementsByTagName("table")[0]);
			if (gut[0]){
				$("coinspreisschild").querySelector("#verkaufe_markt").style.display=(((100*currPreis>valVerkaufLimitDown*gut[0]) && (100*currPreis<valVerkaufLimitUp*gut[0]))?"":"none");
				newtr=createElement("tr",{},newtable);
				createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["preis"]+": ");
				createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,moneyFormatLimit(gut[0],100));
			}

			newtr=createElement("tr",{},newtable);
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["wert"]+": ");
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,moneyFormatLimit(currUserPreis*currAnzahl,100));

			newtr=createElement("tr",{},newtable);
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["commission"]+": ");
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,numberFormat(((currPreis-currUserPreis)/currUserPreis)*100,1)+"%");
			if (preisBeob[0]){
				newtr=createElement("tr",{},newtable);
				createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,"min: ");
				createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,moneyFormatLimit(preisBeob[0][2],100));
			}
			if (gutBeob[0]){
				newtr=createElement("tr",{},newtable);
				createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["beobachtet"]+": ");
				createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,moneyFormatLimit(gutBeob[0],100));
			}
			newtable=null;newtr=null;
		},200);
	}

	if($("coinsauflager")){
		$("coinsauflager").setAttribute("class",$("coinsauflager").getAttribute("class")+" link");
		$("coinsauflager").addEventListener("click",function(){
			$("coinsanzahl").value=this.innerHTML;
			keyup($("coinsanzahl"));
		},false);
	}
	if($("coinspreisschild")){
		var newdiv=createElement("div",{"style":"position:absolute;top:0;left:330px;width:150px"},$("coinspreisschild"));
		newdiv=createElement("div",{"id":"divBerInfoCoins","style":"float:left;padding:3px;background-color:#002300;border:5px solid #594230;color:#f0ffef;font-weight:bold;"},newdiv);
		createElement("table",{},newdiv);
		newdiv=null;

		$("coinsanzahl").addEventListener("keyup",function(){ this.value=this.value.replace(/\D/g,""); },false);
		$("coinspreis").addEventListener("keyup",function(){ this.value=this.value.replace(/\D/g,""); },false);
		$("coinspreisschild").addEventListener("click",checkPreisCoins,false);
		$("coinspreisschild").addEventListener("keyup",function(event){
			checkPreisCoins();
			if (event.keyCode==13){
				var submitButton=$("preisschild").querySelector("#verkaufe_markt");
				if(submitButton.style.display!="none"){ click(submitButton); }
				submitButton=null;
			}
		},false);

		// bugfix: no focus when coinspreisschild opens
		$("coinspreisschild").addEventListener("DOMAttrModified",function(event){
			if((event.target.id=="coinspreisschild")&&(event.attrName=="style")){
				if(event.newValue.match(/display\:\s*block/)){
					if(oldPricesInserted!=0){
						checkPreisCoins(); // fired when offer-div opens
					}
				}else{
					if(oldPricesInserted==0){ oldPricesInserted=-1; }
				}
			}
		}, false);
	}

	// instant open
	if (pagedata["produkt"]){
		if (cand=$("p"+pagedata["produkt"])){
			unsafeWindow.zeigePreisschild(unsafe$("p"+pagedata["produkt"]));
			//unsafeWindow.zeigePreisschild(cand); // -> security error
			cand.setAttribute("style","position: absolute; top: 380px; left: 515px; z-index: 0;");
		}
	}
	cand=null;candtable=null;
	quicklinks();
}

function do_shop(){
	if(pageZusatz["s"]=="3"){
		// Decoration - Shop
		NPCSAISON=new Object();
		try{ NPCSAISON=explode(GM_getValue(LNG+"_"+SERVER+"_NpcSaison")); }catch(err){}
		for(var v in NPCSAISON){
			if(!NPCSAISON.hasOwnProperty(v)){ continue; }
			NPCSAISON[v]=(document.getElementsByClassName("s"+v).length>0);
		}
		unsafeWindow.GMnpcSaison=NPCSAISON.clone();
	}
}

function do_stats(){
	var canddiv;
	var currStat="1";
	try{ currStat=pageZusatz["type"]; }
	catch(err){ currStat="1"; }
	if (typeof pageZusatz["search"]!="undefined"){ currStat="0"; }
	GM_addStyle("#rankingcontent{line-height:12px;}");

	if (typeof pageZusatz["guildsearch"]!="undefined"){
		unsafeWindow.initGuildsearch();
		$("guildname").value=pageZusatz["guildsearch"];
		unsafeWindow.stats_searchGuild();
	}

	switch (currStat){
	case "0": // Einzelspieler
		try {
			getData();
			GM_addStyle("div.hoverBgLightblue:hover{background-color:lightblue!important;}"); // TODO why is the "normal" declaration (without div) failing?

			var newdiv=$("spielerinfo");
			var newdiv1;
			for(var v=0;v<newdiv.childElementCount;v++){
				newdiv1=createElement("div",{"class":"hoverBgLightblue","style":"height:15px;width:100%;"});
				newdiv.insertBefore(newdiv1,newdiv.children[v]);
				newdiv1.appendChild(newdiv.children[v+1]); // left cell
				newdiv1.appendChild(newdiv.children[v+1]); // right cell
				removeElement(newdiv.children[v+1]); // br node
			}

			canddiv=$("spielerinfo").getElementsByClassName("cright3");
			var thisUser=/(.*?)&nbsp;/.exec(canddiv[0].firstElementChild.innerHTML+"&nbsp;")[1];
			canddiv[0].insertBefore(vertrag(thisUser),canddiv[0].firstElementChild);
			canddiv[0].insertBefore(stats(thisUser),canddiv[0].firstElementChild);
			canddiv[0].insertBefore(igm(thisUser),canddiv[0].firstElementChild);

			// see declaration of "QUESTS"
		const QUESTS = [,[[[17,43],[9,1]],1,142,[0,54]],[[[1,173],[9,2]],1,348,[0,145]],[[[18,192],[17,288]],1,255,[0,73]],[[[18,672],[9,10]],1,1883,[0,608]],[[[17,922],[9,19]],1,2304,[0,890]],[[[20,360],[18,960]],1,3300],[[[19,540],[20,720]],1,6413],[[[2,240],[21,245]],1,2895],[[[20,1440],[9,24]],1,11700,[1,47]],[[[21,1152],[9,48]],1,16200],[[[9,72],[22,1037]],1,16202],[[[20,3456],[10,27]],1,25476],[[[18,8064],[10,48]],1,15660],[[[23,3110],[9,144]],1,57240],[[[10,96],[9,180]],1,33930,[1,59]],[[[9,240],[6,1836]],1,62190],[[[10,384],[9,144]],1,70920],[[[10,192],[23,6739]],1,116280,[2,2]],[[[22,7518],[9,216]],1,108956],[[[11,150],[10,272]],1,34650],[[[7,1350],[12,50]],1,78375,[1,63]],[[[23,15552],[9,1008]],1,318600],[[[29,6552],[25,130]],1,373645,[3,2]],[[[1,51840],[27,55]],1,60579],[[[11,280],[12,210]],1,138705],[[[10,672],[12,210]],1,169785],[[[1,75600],[2,25000]],1,42131,[1,90]],[[[11,480],[12,272]],1,206760],[[[9,2688],[10,1024]],1,448320],[[[12,320],[11,560]],1,242160],[[[29,14742],[27,194]],1,836328,[2,3]],[[[20,77760],[12,383]],1,620831,[1,78]],[[[12,540],[32,14600]],1,449550],[[[32,50400],[25,432]],1,1208880],[[[10,1760],[11,1000]],1,481800,[3,3]],[[[9,4800],[12,595]],1,749738],[[[26,46550],[27,216]],1,933756,[1,77]],[[[1,259200],[30,216]],1,252960],[[[23,51840],[28,230]],1,856800],[[[9,5280],[10,1795]],1,849816],[[[25,475],[30,238]],1,1665576,[1,80]],[[[34,64152],[28,253]],1,1704780],[[[11,1320],[12,880]],1,615120],[[[27,238],[24,30294]],1,576923,[1,76]],[[[10,2304],[30,259]],1,538272],[[[9,5760],[10,2304]],1,976320],[[[37,13800],[25,518]],1,5559806,[1,61]],[[[9,5760],[10,1958]],1,927072],[[[28,276],[30,259]],1,417312],[[[12,1040],[30,281]],1,376253,[1,52]],[[[20,72000],[12,800]],1,732000,[4,23,15]],[[[12,4000],[10,1920]],1,1683600],[[[23,64800],[9,4800]],1,1395000],[[[25,432],[28,230]],1,373680,[4,24,15]],[[[24,72000],[27,216]],1,1135800],[[[7,18000],[10,1920]],1,1083600],[[[27,216],[11,1200]],1,423000,[4,31,15]],[[[31,103700],[30,216]],1,2965498],[[[11,1200],[25,432]],1,478080,[4,21,10]],[[[21,57600],[10,1920]],1,813600],[[[12,800],[27,216]],1,427800,[4,29,15]],[[[29,27300],[25,432]],1,1506635],[[[4,48000],[9,4800]],1,855000],[[[28,230],[27,216]],1,318600,[4,33,15]],[[[33,43200],[25,432]],1,1685880,[5,1]],[[[9,4800],[12,800]],1,822000,[4,22,10]],[[[8,18000],[28,230]],1,1792800],[[[10,1920],[11,1200]],1,550800,[4,34,15]],[[[34,64800],[30,216]],1,1704960],[[[6,10800],[28,230]],1,207000],[[[11,1200],[10,1920]],1,550800,[4,35,20]],[[[35,12950],[27,216]],1,932692],[[[25,432],[11,1200]],1,478080],[[[32,72000],[12,800]],1,1722000,[4,36,15]],[[[36,24500],[9,4800]],1,3235000],[[[27,216],[30,216]],1,320760,[4,7,10]],[[[26,66500],[28,230]],1,1298451],[[[12,800],[10,1920]],1,555600,[4,37,30]],[[[37,3833],[9,4800]],1,2017431],[[[28,230],[25,432]],1,373680],[[[33,43200],[12,800]],1,1767000,[4,38,15]],[[[38,108000],[30,216]],1,3594960],[[[9,4800],[28,230]],1,712800,[4,19,5]],[[[5,72000],[10,1920]],1,963600],[[[30,216],[9,4800]],1,714960,[4,39,30]],[[[39,2867],[12,800]],1,1834778],[[[10,1920],[25,432]],1,474480],[[[32,72000],[27,216]],1,1585800,[4,40,30]],[[[40,2250],[12,800]],1,1782000],[[[25,432],[11,1200]],1,478080,[4,20,10]],[[[3,64000],[30,216]],1,374960],[[[27,216],[11,1200]],1,423000,[4,41,30]],[[[41,1975],[10,1920]],1,1819998],[[[11,1200],[27,216]],1,423000,[4,8,15]],[[[24,72000],[10,1280]],1,1172400,[5,1]],[[[12,800],[9,4800]],1,822000,[4,26,15]],[[[36,24500],[28,230]],1,2867800],[[[31,103700],[10,1920]],1,3064138,[4,42,30]],[[[28,230],[25,432]],1,373680],[[[42,1680],[30,216]],1,1693960,[4,33,15]],[[[4,80000],[30,210]],2,722800],[[[6,48000],[12,300]],2,854400],[[[1,800000],[25,320]],2,998400,[4,32,10]],[[[35,64000],[32,12000]],2,1629600],[[[26,108000],[11,540]],2,1452600],[[[39,12000],[9,5600]],2,2160000,[4,43,30]],[[[43,10000],[27,600]],2,2556000],[[[24,184000],[25,480]],2,2248000],[[[9,10200],[10,24000]],2,2205600],[[[23,108000],[91,250]],2,1359600],[[[34,36936],[37,10580]],2,1959726],[[[29,78624],[26,5200]],2,2164176],[[[44,2016],[28,1600]],2,2059245],[[[10,12000],[12,1200]],2,1536000],[[[30,840],[30,0]],2,906800],[[[40,3240],[36,9800]],2,1265312],[[[91,750],[31,72590]],2,1233972],[[[26,113050],[27,600]],2,1874430],[[[38,7020],[42,2352]],2,2134942],[[[41,9480],[9,28800]],2,1886172,[5,1]],[[[23,174960],[22,98515]],2,2267541],[[[8,5040],[7,3780]],2,2022804],[[[32,27000],[10,24000]],2,2357400],[[[39,2580],[37,7935]],2,1525641,[1,99]],[[[33,51840],[35,20720]],2,2464720],[[[43,5000],[21,146880]],2,2139910],[[[31,60664],[26,100520]],2,1945541],[[[20,100800],[9,15360]],2,1216320,[4,44,20]],[[[10,10080],[11,4500]],2,1571400],[[[7,18900],[38,5400]],2,2239480],[[[40,3500],[35,12000]],2,1168200],[[[91,1000],[91,0]],2,600000],[[[44,4400],[26,22400]],2,1284560],[[[3,280000],[31,40000]],2,1328000],[[[12,1200],[39,3900]],2,1228860],[[[7,9800],[2,240000]],2,1003320],[[[26,60000],[1,275000]],2,1031000],[[[11,6400],[11,0]],2,1088000],[[[6,14444],[33,34000]],2,1158911],[[[27,625],[27,0]],2,1078125],[[[38,8600],[41,2900]],2,1056220],[[[43,4050],[7,5250]],2,1133280],[[[9,16200],[9,0]],2,453600,[5,1]],[[[25,900],[10,5400]],2,990000],[[[37,8600],[37,0]],2,1016520],[[[28,300],[10,7500]],2,1050000],[[[30,400],[42,3600]],2,1096880],[[[29,51000],[9,3600]],2,1069800],[[[91,175],[8,18200]],2,1087560],[[[36,10300],[41,3800]],2,1312700]];

			var nextQuest=parseInt(canddiv[5].innerHTML,10)+1;
			if(QUESTS_[nextQuest]){
				canddiv[5].parentNode.setAttribute("nextQuest",nextQuest);
				canddiv[5].parentNode.addEventListener("mouseover",function(event){
					var nextQuest=this.getAttribute("nextQuest");
					var str="<div style='border-bottom:1px solid white'>"+texte["quest"]+"&nbsp;"+nextQuest+"</div>";
					for(var v=0;v<QUESTS_[nextQuest][0].length;v++){
						str += "<div>"+numberFormat(QUESTS_[nextQuest][0][v][1])+"&nbsp;"+prodName[QUESTS_[nextQuest][0][v][0]]+"</div>";
					}
					showToolTip(event,str);
				},false);
			}
			nextQuest=null;
		} catch(err){}
		break;
	// Spielerlisten
	case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "10": case "11":
		if($("rankinghead")){
			canddiv=createElement("input",{"class":"text","maxlength":"5","style":"margin-left:10px;width:40px;"},$("rankinghead"));
			canddiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["geheZuPlatz"]); },false);
			canddiv.addEventListener("change",function(){
				var ranksPerPage=15;
				var targetPage=parseInt(this.value,10);
				if(targetPage>0){
					targetPage=Math.ceil(targetPage/ranksPerPage);
					location.href="stats.php?page="+targetPage+"&type="+currStat;
				}else{
					this.value="";
				}
			},false);
		}

		canddiv=$("rankingcontent").getElementsByClassName("stats_name");
		for(var v=0;v<canddiv.length;v++){
			thisUser=/(.*?)&nbsp;/.exec(canddiv[v].firstElementChild.innerHTML+"&nbsp;")[1];
			thisGuild=/&nbsp;\[(.*?)\]&nbsp;/.exec(canddiv[v].firstElementChild.innerHTML+"&nbsp;");
			var help=canddiv[v].firstElementChild.innerHTML.replace(thisUser,"<a href='stats.php?search=1&searchterm="+thisUser+"'>"+thisUser+"</a>");
			if(thisGuild) help=help.replace(thisGuild[0],"&nbsp;[<a href='stats.php?guildsearch="+thisGuild[1]+"'>"+thisGuild[1]+"</a>]&nbsp;");
			canddiv[v].firstElementChild.innerHTML=help;
			canddiv[v].insertBefore(igm(thisUser),canddiv[v].firstElementChild);
		}
		break;
	}
	canddiv=null;
}

function do_wettbewerb(){ // in .de not used anymore
	var candtd=document.getElementsByTagName("table")[1].getElementsByTagName("td");
	for(var v=6;v<candtd.length;v=v+3){
		var thisUser=/(.*?)&nbsp/.exec(candtd[v].firstElementChild.innerHTML+"&nbsp")[1];
		igm(thisUser,candtd[v]);
	}
	candtd=null;
}

//***********************************************************************************************************

function closeInfoPanel(){
	try{
		$top("infoPanel").setAttribute("mode","");
		$top("infoPanel").style.display="none";
		$top("infoPanelInner").innerHTML="";
		var multiframe=$top("multiframe");
		multiframe.style.zIndex="101";
		if(multiframe.style.display=="none"){ $("transp100").style.display="none"; }
		multiframe=null;
	} catch(err){}
}

function do_main(){
	if(DEVMODE){ showInLogBubble("Berater started"); }
	// Check if username is known
	if (!USERNAME){
		location.href="http://www."+GAMEPAGES[LNG]+"/login.php?start=1";
		return false;
	}
	// Check if browser is uptodate
	var newdiv,newdiv1;
	if(!createElement("div").children){
		newdiv=createElement("div",{"class":"alertbubble tbig link"},ALL,"Your browser could be too old.<br>This script uses functions which need Gecko&nbsp;1.9.1 (Firefox&nbsp;3.5).<br>You will get errors.");
		newdiv.addEventListener("click",function(){ removeElement(this); },false);
	}
	// Save session-id
	if (unsafeWindow.rid){	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_session",unsafeWindow.rid); }

	// Updatecheck
	var updateCheck=new Array(); // time,version on server,last checked version
	try{ updateCheck=explode(GM_getValue("updateCheck",'[0,"'+VERSION+'","'+VERSION+'"]')); }catch(err){}
	if(GM_getValue("valUpdate",true)&&(now-updateCheck[0]>1800)){
		showInLogBubble("Checking for update (Berater)");
		updateCheck[0]=now;
		GM_setValue2("updateCheck",implode(updateCheck));
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+USO_ID+".meta.js",
			onload: function(response){
				if(response.responseText.match(/@version\s+\d+\.\d+\.\d+/)){
					updateCheck[1]=(/@version\s+(\d+\.\d+\.\d+)/).exec(response.responseText)[1];
					if(VERSION==updateCheck[1]){
						// this script is the one of the server
						updateCheck[2]=updateCheck[1];
						GM_setValue2("updateCheck",implode(updateCheck));
						showInLogBubble("Update Check Berater: Script is up-to-date");
					}else if (updateCheck[1]!=updateCheck[2]){
						alert2(texte["msgUpdate"]+"<br>("+VERSION+"&nbsp;&rarr;&nbsp;"+updateCheck[1]+")",texte["yes"],texte["no"],function(){
							updateCheck[2]=updateCheck[1];
							GM_setValue2("updateCheck",implode(updateCheck));
							window.setTimeout(function(){
								location.href="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
							},0);
						},function(){
							updateCheck[2]=updateCheck[1];
							GM_setValue2("updateCheck",implode(updateCheck));
						});
					}else{
						showInLogBubble("Update Check Berater: Newer version available, but not wanted");
					}
				}else{
					showInLogBubble("Update Check Berater failed. Bad Response: "+response.responseText);
				}
			}
		});
	}
	GM_registerMenuCommand(texte["berater"]+" "+"Update", function(){
		location.href="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
	});

	// CSS
//		"#windmillBeraterTime.ready{"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_windmilltime_ready","background-color:red!important;")+"}\n"+
//		"div[id^=\"zonetime\"][state=\"ready\"]{"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_zonetime_ready","background-color:red!important;")+"}\n"+

	GM_addStyle(
		"#zonetime1,#zonetime2,#zonetime3,#zonetime4,#zonetime5,#zonetime6{z-index:3;position:absolute;padding:2px;"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_zonetime","background-color:#de9008;color:white;font-weight:bold;")+"}\n"+
		"#zonetime1.ready,#zonetime2.ready,#zonetime3.ready,#zonetime4.ready,#zonetime5.ready,#zonetime6.ready{"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_zonetime_ready","background-color:red!important;")+"}\n"+
		"#zonetimeWasser1,#zonetimeWasser2,#zonetimeWasser3,#zonetimeWasser4,#zonetimeWasser5,#zonetimeWasser6{z-index:3;position:absolute;padding:2px;background-color:blue;color:white;font-weight:bold;}\n"+
		"#timeHolder{position:absolute;z-index:25;padding:2px;"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_timeholder","width:10px;top:25px;right:0px;")+"}\n"+
		"#windmillBeraterTime{position:relative;float:right;margin:1px 0px;padding:2px;"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_windmilltime","background-color:#de9008;color:white;font-weight:bold;text-align:center;")+"}\n"+
		"#windmillBeraterTime[state=\"ready\"]{"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_windmilltime_ready","background-color:red!important;")+"}\n"+
		"#forestryBeraterTime{position:relative;float:right;margin:1px 0px;padding:2px;"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_forestrytime","background-color:#de9008;color:white;font-weight:bold;text-align:center;")+"}\n"+
		"#forestryBeraterTime[state=\"ready\"]{"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_forestrytime_ready","background-color:red!important;")+"}\n"
	);
	for(var i=0;i<timerBuildingNames.length;i++){
		bName=timerBuildingNames[i];
		GM_addStyle(
			"#"+bName+"BeraterTime{position:relative;float:right;margin:1px 0px;padding:2px;"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_"+bName+"time","background-color:#de9008;color:white;font-weight:bold;text-align:center;")+"}\n"+
			"#"+bName+"BeraterTime[state=\"ready\"]{"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_"+bName+"time_ready","background-color:red!important;")+"}\n"
		);
	}
	GM_addStyle(
		"#imgNeedWater1,#imgNeedWater2,#imgNeedWater3,#imgNeedWater4,#imgNeedWater5,#imgNeedWater6{position:absolute;right:25px;height:63px;width:63px;}\n"+
		"#zoneinfo1,#zoneinfo2,#zoneinfo3,#zoneinfo4,#zoneinfo5,#zoneinfo6{border:2px solid #6c441e;-moz-border-radius:10px;z-index:3;position:absolute;left:120px;top:20px;}\n"+
		"#divErnteInfo{position:relative;float:left;top:120px;left:620px;padding:2px;border:2px inset white;background-color:#FFB876;display:none;}\n"+
		"#ackerNavi,#zoneNavi{position:absolute;top:10px;left:20px;}\n"+
		"#ackerNavi div,#zoneNavi div{float:left;height:26px;width:35px;-moz-border-radius:15px;}\n"+
		"#questline,#questlineopener,#farmlinks,#guildlink,#cityline,#farmtooltip1,#farmtooltip2,#farmtooltip3,#guildlink_tt,#citytooltip1,#citytooltip2{z-index:110!important;}\n"+
		"#rackItems{-moz-user-select:none;}\n"+
		"#traveltransp{z-index:110!important;}\n"+
		"#farmlinks,#cityline{display:block!important;}\n"+
		"#friendslist{width:280px!important;}\n"+
		"#friendlistinfoblock li:hover{background-color:#e4b55d;}\n"+
		"#transp8,#destructinfo1,#destructinfo2,#destructinfo3,#destructinfo4,#destructinfo5,#destructinfo6,#buildinginfo1,#buildinginfo2,#buildinginfo3,#buildinginfo4,#buildinginfo5,#buildinginfo6,#bulldozetooltip1,#bulldozetooltip2,#bulldozetooltip3,#bulldozetooltip4,#bulldozetooltip5,#bulldozetooltip6,#emptyfieldtooltip1,#emptyfieldtooltip2,#emptyfieldtooltip3,#emptyfieldtooltip4,#emptyfieldtooltip5,#emptyfieldtooltip6{display:none!important;}\n"+
		"#cartsubmit{font-weight:bold!important;}\n"
		);
	//	"#fishani,#fishani2{z-index:3!important;}\n"+
	GM_addStyle(
		".alertbubble{position:absolute;top:0;left:0;width:340px;padding:30px;background-color:yellow;border:3px solid black;-moz-border-radius:10px;z-index:1000;}\n"+
		".alertbox{background-color:red;font-weight:bold;}\n"+
		".friendslineoptions{width:72px!important;}\n"
	);
	//	"#powerupcontainer{bottom:35px!important;}\n"+
	//	".beraterButtonIcon img{-moz-border-radius: 20px;}\n"+
	GM_addStyle(
		".beraterButtonIcon{float:left;margin-left:3px;width:30px;height:30px;overflow:hidden;background-color:#936b52;border:1px groove #4d240e;-moz-border-radius: 20px;}\n"+
		".leftarrow{background:url('"+GFX+"regal2.jpg');}\n"+
		".rightarrow{background:url('"+GFX+"regal2.jpg');background-position:35px 0px;}\n"+
		".formattedRackItem{position:absolute;top:3px;left:0;width:40px;font-size:7pt;color:#555555;text-align:center;}\n"+
		".lowrack{"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_lowrack","background-color:orangered;color:#000;")+"}\n"+
		".farmicart_lowrack td{"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_farmicart_lowrack","color:yellow!important;")+"}\n"+
		".farmicart_missing td{color:red!important;}\n"+
		".border1 td,.border1 th{border:1px solid black;}\n"+
		".borderTop2 td,.borderTop2 th{border-top:2px solid black;}\n"+
		".borderBottom2 td,.borderBottom2 th{border-bottom:2px solid black;}\n"+
		".fontWeightBold td,.fontWeightBold th{font-weight:bold;}\n"
	);

	// Container Divs
	var nodes=new Object();
	ALL.style.margin="5px";
	var upjersToolbarHeight=parseInt(($("uptoolbar") && $("uptoolbar").style.display!="none")?"30":"0",10);
	newdiv=createElement("div",{"id":"gameArea","align":"center","style":"margin-top:"+upjersToolbarHeight+"px;"},ALL);
	newdiv1=createElement("div",{"id":"divGame","style":"position:relative;top:0;left:0;"},newdiv);
	var content_table=document.getElementsByClassName("content_table")[0];
	newdiv1.appendChild(content_table);
	createElement("div",{"id":"divStatistik","style":"display:none;"},newdiv);
	createElement("div",{"id":"divSettings","style":"position:relative;"},newdiv);
	//createElement("div",{"id":"divBeraterButtons","style":"position:absolute;bottom:0;left:0;display:block;z-index:100;"},$("garten_komplett"));
	createElement("div",{"id":"transp100","style":"z-index:100;background-color:black;opacity:0.7;position:absolute;top:0;left:0;width:720px;height:640px;display:none;"},$("garten_komplett"));
	$("multiframe").addEventListener("DOMAttrModified",function(event){
		//GM_log("multiframe DOMAttrModified "+this.style.display);
		if(this.style.display=="none"){
			var infoPanel=$("infoPanel");
			infoPanel.style.zIndex="101";
			if(infoPanel.style.display=="none"){
				$("transp100").style.display="none";
			}else{
				$("transp100").style.display="block";
			}
			infoPanel=null;
		}else{
			$("transp100").style.display="block";
		}
	},false);
	$("shopframe").addEventListener("DOMAttrModified",function(event){
		//GM_log("shopframe DOMAttrModified "+this.parentNode.style.display);
		if(this.parentNode.style.display=="none"){
			$("transp3").style.display="none";
		}else{
			$("transp3").style.display="block";
			$("multiframe").style.display="none";
			closeInfoPanel();
		}
	},false);
	$("gamearea_spacer").innerHTML="";
	newdiv=createElement("div",{"style":"position:relative;height:100%;"},$("gamearea_spacer"));
	newdiv=createElement("div",{"id":"divBeraterButtons","style":"position:absolute;bottom:0;left:-9px;display:block;z-index:104;"},newdiv);
	newdiv.addEventListener("mouseover",function(event){
		var node=event.target;
		var mouseOverText=node.getAttribute("mouseOverText");
		while((node!=this)&&(!mouseOverText)){
			node=node.parentNode;
			mouseOverText=node.getAttribute("mouseOverText");
		}
		if(mouseOverText){ showToolTip(event,mouseOverText); }
		node=null;mouseOverText=null;
	},false);
	createElement("div",{"id":"divBeraterButtonsInfo","style":"position:absolute;top:-25px;white-space:nowrap;display:none;z-index:200;","class":"blackbox"},newdiv);
	newdiv=createElement("div",{"id":"fixedDivRight","style":"position:fixed;right:0;top:0;z-index:500;"},ALL);
	nodes["containerPowerupSymbols"]=new Object();
	nodes["containerPowerupSymbols"]["node"]=createElement("div",{"id":"containerPowerupSymbols"},newdiv);
	newdiv=createElement("div",{"style":"position:absolute;top:2px;left:210px;color:#f7bb87;z-index:10;"},$("headercontainer"));
	nodes["serverTime"]=new Object();
	nodes["serverTime"]["node"]=createElement("div",{"id":"serverTime","style":"float:left;margin-left:2px;"},newdiv);
	nodes["sessionTimeLeft"]=new Object();
	nodes["sessionTimeLeft"]["node"]=createElement("div",{"id":"sessionTimeLeft","style":"float:left;margin-left:2px;"},newdiv);
	if (window.innerWidth<1180) content_table.style.paddingRight="176px";
	if (window.innerHeight>830) ALL.style.overflowY="hidden";
	newdiv=$("errorboxgarden");
	newdiv.style.left="600px";
	newdiv.style.top="105px";
	$("popup_garden").style.top="";

	// Points earned at cropping
	const POINTS=[,3,17,10,44,64,128,267,600,750,950,1540,2350,,,,,1,7,24,42,63,52,88,92,3100,108,4500,5000,319,5400,179,133,229,157,405,733,2569,211,3611,4444,5220,6028,6769,1833,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,2500,,,,,,0,,,,,,,0,,];
	// Upgrade-data of buildings
	// BUILDING_UPGRADES[zoneType][levelNr-1][needed level,buildcost,bonus,animalamount]
	const BUILDING_UPGRADES=[,[[1,2000,0.95,0],[15,21500,0.9,0],[21,76000,0.85,0],[27,192300,0.8,0],[33,"c20",0.7,0]],[[2,2500,1,5],[7,15200,1,10],[12,32500,1,15],[23,134500,0.9,20],[29,350800,0.8,20]],[[11,3400,1,2],[13,16300,1,3],[17,50200,1,4],[25,159600,0.9,5],[32,441000,0.8,6]],[[14,6200,1,2],[18,33500,1,3],[20,76000,1,4],[28,210500,0.9,5],[34,482000,0.8,6]],[[19,6800,1,1],[22,44800,1,2],[26,128200,1,3],[31,230600,0.9,4],[35,482000,0.8,4]],[],[[16,5200,1,1],[19,33500,0.95,1],[25,106400,0.9,1],[30,230600,0.85,1],[33,441000,0.8,1]],[[18,6800,1,1],[21,38000,0.95,1],[27,128200,0.9,1],[31,230600,0.85,1],[35,482000,0.8,1]],[[27,8100,1,1],[30,53200,0.95,1],[33,140300,0.9,1],[36,264600,0.85,1]],[[30,9700,1,1],[33,70200,0.95,1],[34,153700,0.9,1],[37,289200,0.85,1]],[[16,10000,1,1],[20,85000,1,3],[24,200000,1,5],[28,"c22",0.9,6],[32,"c38",0.8,6]]];
	// produced thing -> production area
	const PRODUCT2BUILDING=[,1,1,1,1,1,1,1,1,2,3,4,5,,,,,1,1,1,1,1,1,1,1,7,1,8,9,1,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,11,,,,,,1,,,,,,,1,,];
	// produced thing <- production area
	const BUILDING2PRODUCT=[,,9,10,11,12,,25,27,28,30,91];
	// zoneTyp -> -/field/stable/factory
	const BUILDINGTYPE=[0,1,2,2,2,2,0,3,3,3,3,2,0];
	// Growing duration in min
	var growTime=[,20,45,45,90,120,240,480,960,240,720,1440,2880,,,,,15,90,240,480,600,500,800,720,1000,780,2000,3000,950,4000,1000,720,1200,800,2000,880,3000,960,4000,4800,5500,6200,6800,7200,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,2880,,,,,,720,,,,,,,720,,];
	// Needed "feed" of a zone
	const FEED={"9":[[1,600],[2,1200]],"10":[[3,900],[4,1800]],"11":[[5,2400],[6,4800]],"12":[[7,4800],[8,9600]],"25":[[9,30]],"27":[[10,12]],"28":[[11,8]],"30":[[12,5]],"91":[[92,14400],[93,28800]]};
	// price of an animal. formula: cost=Math.round(ANIMALCOST[zone][0]+nr*ANIMALCOST[zone][1])
	const ANIMALCOST=[,,[309,1000/19],[419,320],[529,320],[1599,2600/3],,,,,,[999,1000]];
	// sizes of Farmis [width,height,left,top] in px , taken from setFarmis()
	const FARMISIZE=[,[40,60,-1,-5],[30,40,0,0],[30,40,2,0],[33,45,2,0],[33,45,4,2],[40,65,2,-11],[40,65,-2,-20]];
	// QUESTS[nr]=[[[questproduct-id1,amount1],...],waitdays,points,more|undefined]
	// Quest nr 115 (only 1 product) expanded by a fake (0 bonbons77)
	// more: [keyNr,...]
	// 0,money
	// 1,id of gained product
	// 2,number of accessed rack
	// 3,number of accessed farm
	// 4,id of product,minutes this product grows faster
	// 5:additional farmi ('<img src=GFX+"adbonus.gif" style="border:0;height:15px;">')
	const QUESTS = [,[[[17,43],[9,1]],1,142,[0,54]],[[[1,173],[9,2]],1,348,[0,145]],[[[18,192],[17,288]],1,255,[0,73]],[[[18,672],[9,10]],1,1883,[0,608]],[[[17,922],[9,19]],1,2304,[0,890]],[[[20,360],[18,960]],1,3300],[[[19,540],[20,720]],1,6413],[[[2,240],[21,245]],1,2895],[[[20,1440],[9,24]],1,11700,[1,47]],[[[21,1152],[9,48]],1,16200],[[[9,72],[22,1037]],1,16202],[[[20,3456],[10,27]],1,25476],[[[18,8064],[10,48]],1,15660],[[[23,3110],[9,144]],1,57240],[[[10,96],[9,180]],1,33930,[1,59]],[[[9,240],[6,1836]],1,62190],[[[10,384],[9,144]],1,70920],[[[10,192],[23,6739]],1,116280,[2,2]],[[[22,7518],[9,216]],1,108956],[[[11,150],[10,272]],1,34650],[[[7,1350],[12,50]],1,78375,[1,63]],[[[23,15552],[9,1008]],1,318600],[[[29,6552],[25,130]],1,373645,[3,2]],[[[1,51840],[27,55]],1,60579],[[[11,280],[12,210]],1,138705],[[[10,672],[12,210]],1,169785],[[[1,75600],[2,25000]],1,42131,[1,90]],[[[11,480],[12,272]],1,206760],[[[9,2688],[10,1024]],1,448320],[[[12,320],[11,560]],1,242160],[[[29,14742],[27,194]],1,836328,[2,3]],[[[20,77760],[12,383]],1,620831,[1,78]],[[[12,540],[32,14600]],1,449550],[[[32,50400],[25,432]],1,1208880],[[[10,1760],[11,1000]],1,481800,[3,3]],[[[9,4800],[12,595]],1,749738],[[[26,46550],[27,216]],1,933756,[1,77]],[[[1,259200],[30,216]],1,252960],[[[23,51840],[28,230]],1,856800],[[[9,5280],[10,1795]],1,849816],[[[25,475],[30,238]],1,1665576,[1,80]],[[[34,64152],[28,253]],1,1704780],[[[11,1320],[12,880]],1,615120],[[[27,238],[24,30294]],1,576923,[1,76]],[[[10,2304],[30,259]],1,538272],[[[9,5760],[10,2304]],1,976320],[[[37,13800],[25,518]],1,5559806,[1,61]],[[[9,5760],[10,1958]],1,927072],[[[28,276],[30,259]],1,417312],[[[12,1040],[30,281]],1,376253,[1,52]],[[[20,72000],[12,800]],1,732000,[4,23,15]],[[[12,4000],[10,1920]],1,1683600],[[[23,64800],[9,4800]],1,1395000],[[[25,432],[28,230]],1,373680,[4,24,15]],[[[24,72000],[27,216]],1,1135800],[[[7,18000],[10,1920]],1,1083600],[[[27,216],[11,1200]],1,423000,[4,31,15]],[[[31,103700],[30,216]],1,2965498],[[[11,1200],[25,432]],1,478080,[4,21,10]],[[[21,57600],[10,1920]],1,813600],[[[12,800],[27,216]],1,427800,[4,29,15]],[[[29,27300],[25,432]],1,1506635],[[[4,48000],[9,4800]],1,855000],[[[28,230],[27,216]],1,318600,[4,33,15]],[[[33,43200],[25,432]],1,1685880,[5,1]],[[[9,4800],[12,800]],1,822000,[4,22,10]],[[[8,18000],[28,230]],1,1792800],[[[10,1920],[11,1200]],1,550800,[4,34,15]],[[[34,64800],[30,216]],1,1704960],[[[6,10800],[28,230]],1,207000],[[[11,1200],[10,1920]],1,550800,[4,35,20]],[[[35,12950],[27,216]],1,932692],[[[25,432],[11,1200]],1,478080],[[[32,72000],[12,800]],1,1722000,[4,36,15]],[[[36,24500],[9,4800]],1,3235000],[[[27,216],[30,216]],1,320760,[4,7,10]],[[[26,66500],[28,230]],1,1298451],[[[12,800],[10,1920]],1,555600,[4,37,30]],[[[37,3833],[9,4800]],1,2017431],[[[28,230],[25,432]],1,373680],[[[33,43200],[12,800]],1,1767000,[4,38,15]],[[[38,108000],[30,216]],1,3594960],[[[9,4800],[28,230]],1,712800,[4,19,5]],[[[5,72000],[10,1920]],1,963600],[[[30,216],[9,4800]],1,714960,[4,39,30]],[[[39,2867],[12,800]],1,1834778],[[[10,1920],[25,432]],1,474480],[[[32,72000],[27,216]],1,1585800,[4,40,30]],[[[40,2250],[12,800]],1,1782000],[[[25,432],[11,1200]],1,478080,[4,20,10]],[[[3,64000],[30,216]],1,374960],[[[27,216],[11,1200]],1,423000,[4,41,30]],[[[41,1975],[10,1920]],1,1819998],[[[11,1200],[27,216]],1,423000,[4,8,15]],[[[24,72000],[10,1280]],1,1172400,[5,1]],[[[12,800],[9,4800]],1,822000,[4,26,15]],[[[36,24500],[28,230]],1,2867800],[[[31,103700],[10,1920]],1,3064138,[4,42,30]],[[[28,230],[25,432]],1,373680],[[[42,1680],[30,216]],1,1693960,[4,33,15]],[[[4,80000],[30,210]],2,722800],[[[6,48000],[12,300]],2,854400],[[[1,800000],[25,320]],2,998400,[4,32,10]],[[[35,64000],[32,12000]],2,1629600],[[[26,108000],[11,540]],2,1452600],[[[39,12000],[9,5600]],2,2160000,[4,43,30]],[[[43,10000],[27,600]],2,2556000],[[[24,184000],[25,480]],2,2248000],[[[9,10200],[10,24000]],2,2205600],[[[23,108000],[91,250]],2,1359600],[[[34,36936],[37,10580]],2,1959726],[[[29,78624],[26,5200]],2,2164176],[[[44,2016],[28,1600]],2,2059245],[[[10,12000],[12,1200]],2,1536000],[[[30,840],[30,0]],2,906800],[[[40,3240],[36,9800]],2,1265312],[[[91,750],[31,72590]],2,1233972],[[[26,113050],[27,600]],2,1874430],[[[38,7020],[42,2352]],2,2134942],[[[41,9480],[9,28800]],2,1886172,[5,1]],[[[23,174960],[22,98515]],2,2267541],[[[8,5040],[7,3780]],2,2022804],[[[32,27000],[10,24000]],2,2357400],[[[39,2580],[37,7935]],2,1525641,[1,99]],[[[33,51840],[35,20720]],2,2464720],[[[43,5000],[21,146880]],2,2139910],[[[31,60664],[26,100520]],2,1945541],[[[20,100800],[9,15360]],2,1216320,[4,44,20]],[[[10,10080],[11,4500]],2,1571400],[[[7,18900],[38,5400]],2,2239480],[[[40,3500],[35,12000]],2,1168200],[[[91,1000],[91,0]],2,600000],[[[44,4400],[26,22400]],2,1284560],[[[3,280000],[31,40000]],2,1328000],[[[12,1200],[39,3900]],2,1228860],[[[7,9800],[2,240000]],2,1003320],[[[26,60000],[1,275000]],2,1031000],[[[11,6400],[11,0]],2,1088000],[[[6,14444],[33,34000]],2,1158911],[[[27,625],[27,0]],2,1078125],[[[38,8600],[41,2900]],2,1056220],[[[43,4050],[7,5250]],2,1133280],[[[9,16200],[9,0]],2,453600,[5,1]],[[[25,900],[10,5400]],2,990000],[[[37,8600],[37,0]],2,1016520],[[[28,300],[10,7500]],2,1050000],[[[30,400],[42,3600]],2,1096880],[[[29,51000],[9,3600]],2,1069800],[[[91,175],[8,18200]],2,1087560],[[[36,10300],[41,3800]],2,1312700]];

	var questNr=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_quest",1);
	unsafeWindow.GMquestNr=questNr;
	unsafeWindow.GMquestState=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_questState",0); // 0:not available, 1:not activated, 2:active
	var questTime=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_questTime",0);
	//LQUESTS["campaign"]["nr"][[type,id,amount],waittime,points,more|undefined]
	//more:
	//0,id of type 1 product
	//1,id of type 2 product
	//2,special name
	const LQUESTS=[,[,[[[1,4,3300],[1,19,4500],[1,24,1400]],,51520,[]],[[[1,5,2600],[1,17,8000],[1,91,50]],,50360,[]],[[[1,6,1250],[1,21,6600],[1,18,7300]],,0,[[1,1,5],[2,"Boomkwekerij"]]],[[[1,22,1400],[1,7,750]],,48630,[]],[[[1,25,64],[1,3,3200],[2,21,8]],,50800,[]],[[[1,8,650],[1,27,85],[1,4,4800],[1,91,25]],,0,[[2,"Zagerij"]]],[[[1,10,420],[1,19,1600]],,39360,[]],[[[1,2,6000],[1,22,2100],[1,21,1800]],,38980,[]],[[[1,24,1800],[2,21,12],[2,41,10]],,0,[[1,2,5]]],[[[1,3,3200],[1,5,3150],[1,20,1900]],,36200,[]],[[[1,27,40],[1,18,7700]],,39240,[]],[[[1,91,60],[2,22,30],[2,44,12]],,0,[[2,"Timmerwerkplaats"],[1,101,1]]],[[[1,8,300],[1,6,2000]],,39600,[]],[[[1,17,16000],[2,22,30],[2,42,10]],,34520,[]],[[[1,11,90],[2,101,6],[2,22,18]],,0,[[2,"Alles bewateren"]]],[[[1,22,800],[1,7,430],[1,2,2200]],,32642,[]],[[[1,10,380]],,30400,[]],[[[1,9,460],[2,41,20]],,0,[[1,102,1]]],[[[1,19,2600],[1,3,3000],[1,18,5400],[1,4,1200]],,31740,[]],[[[1,91,15],[1,26,1700]],,31420,[]],[[[1,25,35],[1,5,2800],[2,102,4]],,0,[[1,103,1]]],[[[1,24,1900],[1,6,1400]],,31060,[]],[[[1,20,1350],[1,23,1250],[1,1,4900]],,30230,[]],[[[1,12,75],[1,21,2500],[2,45,15]],,0,[[1,3,5]]],[[[1,8,310],[1,9,240]],,31520,[]],[[[1,7,130],[1,6,400],[1,27,30]],,32562,[]],[[[1,3,5400],[2,23,18],[2,103,3]],,0,[[1,104,1]]],[[[1,11,185]],,31450,[]],[[[1,22,1900],[1,91,22],[1,2,2600]],,30940,[]],[[[1,10,110],[2,41,32],[2,101,24]],,0,[[1,105,1]]],[[[1,25,55],[2,46,27]],,35025,[]],[[[1,20,2300],[1,23,1350],[2,43,36]],,34485,[]],[[[1,5,2000],[2,104,12],[2,47,72]],,0,[[1,106,1]]],[[[1,26,2100],[1,8,150]],,36600,[]],[[[1,3,2200],[1,18,4500],[1,19,3000],[1,4,1400],[1,17,2800]],,37520,[]],[[[1,9,600],[2,106,20]],,0,[[1,107,1]]],[[[1,7,700]],,37380,[]],[[[1,29,1400],[1,12,40]],,42000,[]],[[[1,1,45000],[2,107,52],[2,48,18]],,0,[[1,108,1]]],[[[1,5,3000],[1,11,240]],,44400,[]],[[[1,3,5800],[1,9,380],[1,21,2400]],,46970,[]],[[[1,6,1600],[2,102,12],[2,23,48]],,0,[[1,109,1]]],[[[1,25,75]],,48500,[]],[[[1,29,1200],[1,8,1300],[1,17,20000],[1,2,5600]],,50340,[]]]];

	var show=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_show","[true,false,false,true,false]"));
	// [questline,buyNotepad,marketoffersNotepad]
	valServerTimeOffset=GM_getValue(LNG+"_valServerTimeOffset",0);
	todayStr=getDateStr(now,2,false);
	serverNow=now+valServerTimeOffset;
	serverTodayStr=getDateStr(serverNow,2,false);
	getData();

	/*
	// SHOW QUEST DATA
	var div=createElement("div",{"style":"z-index:999;position:absolute;top:0;background-color:white;height:800px;overflow:auto;"},ALL);
	var tr,td,table=createElement("table",{"border":"1"},div);
	for(var v=1;v<QUESTS.length;v++){
		tr=createElement("tr",{},table);
		createElement("td",{},tr,v);
		td=createElement("td",{"style":"white-space:nowrap;"},tr);
			produktPic(QUESTS[v][0][0][0],td);
			createElement("span",{},td,numberFormat(QUESTS[v][0][0][1])+"&nbsp;"+prodName[QUESTS[v][0][0][0]]);
		td=createElement("td",{"style":"white-space:nowrap;"},tr);
		if(QUESTS[v][0][1]){
			produktPic(QUESTS[v][0][1][0],td);
			createElement("span",{},td,numberFormat(QUESTS[v][0][1][1])+"&nbsp;"+prodName[QUESTS[v][0][1][0]]);
		}
		td=createElement("td",{},tr,QUESTS[v][1]);
		td=createElement("td",{},tr,numberFormat(QUESTS[v][2]));
		td=createElement("td",{"style":"white-space:nowrap;"},tr);
			if(QUESTS[v][3]){
				switch(QUESTS[v][3][0]){
				case 0:{
					createElement("span",{},td,moneyFormat(QUESTS[v][3][1]));
				break;}
				case 1:{
					produktPic(QUESTS[v][3][1],td);
					createElement("span",{},td,prodName[QUESTS[v][3][1]]);
				break;}
				case 2:{
					createElement("span",{},td,QUESTS[v][3][1]+". rack");
				break;}
				case 3:{
					createElement("span",{},td,QUESTS[v][3][1]+". farm");
				break;}
				case 4:{
					produktPic(QUESTS[v][3][1],td);
					createElement("span",{},td,"-"+QUESTS[v][3][2]+"min "+prodName[QUESTS[v][3][1]]);
				break;}
				case 5:{
					createElement("img",{"src":GFX+"adbonus.gif","style":"border:0;height:15px;"},td);
					createElement("span",{},td,"+1 Farmi");
				break;}
				}
			}
	}
	*/

	/*
	// SHOW BUILDING DATA
	div=createElement("div",{"style":"z-index:999;position:absolute;top:0;background-color:white;height:800px;overflow:auto;"},ALL);
	table=createElement("table",{"border":"1"},div);
	tr=createElement("tr",{},table);
	createElement("th",{},tr);
	for(var w=1;w<unsafeWindow.buildinginfos[0][1].length;w++){
		createElement("th",{},tr,w);
	}
	for(var v in unsafeWindow.buildinginfos[0]){
		tr=createElement("tr",{},table);
		createElement("td",{},tr,v);
		for(var w=1;w<unsafeWindow.buildinginfos[0][v].length;w++){
			createElement("td",{},tr,unsafeWindow.buildinginfos[0][v][w]);
		}
	}
	*/

	var valMinRackMan=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackMan",false);
	var valMinRackFarmis=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackFarmis",true);
	var valMinRackGrowing=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackGrowing",true);
	var valMinRackQuest=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackQuest",true);
	var valFarmiLimits=[90,100];
	try{ valFarmiLimits=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiLimits","[90,100]")); }catch(err){}
	unsafeWindow.GMvalFarmiLimits=valFarmiLimits.clone();
	var valFarmiMiniInfo=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiMiniInfo",true);

	function calcProdMinRackInit(){
		if(valMinRackMan){
			prodMinRackInit=splitToInt(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_prodMinRackInit",""),"|");
		}else{
			// this calculates prodMinRackInit in the case that it is not entered by user
			var valMinRackV=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackV",200);
			var valMinRackP=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackP",false);
			var valMinRackE=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackE",50);
			for(var v=0;v<prodName.length;v++){
				if(prodBlock[v].match(/t/)){
					prodMinRackInit[v]=0;
				}else{
					if(prodTyp[v]=="v"){ prodMinRackInit[v]=valMinRackV/(valMinRackP?prodPlantSize[v]:1); }
					else if(prodTyp[v]=="e"){ prodMinRackInit[v]=valMinRackE; }
					else{ prodMinRackInit[v]=0; }
				}
			}
			GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_prodMinRackInit",prodMinRackInit.join("|"));
		}
		unsafeWindow.GMprodMinRackInit=prodMinRackInit.slice(0);
		calcProdMinRack();
	}
	function calcProdMinRack(){ // -> doBuyNotepad,doRack
		//if(DEVMODE){ GM_log("calcProdMinRack"); }
		prodMinRack=prodMinRackInit.slice();

		// Questproducts
		if(valMinRackQuest){
			calcTotalQuest();
			for(var k in totalQuest){
				if(!totalQuest.hasOwnProperty(k)){ continue; }
				prodMinRack[k] += totalQuest[k];
			}
		}

		// Farmis
		if(valMinRackFarmis){
			for(var k in totalFarmis){
				if(!totalFarmis.hasOwnProperty(k)){ continue; }
				prodMinRack[k] += totalFarmis[k];
			}
		}

		// Growing products
		if(valMinRackGrowing){
			calcTotalErnte();
			for(var k in totalErnte){
				if(!totalErnte.hasOwnProperty(k)){ continue; }
				prodMinRack[k] -= totalErnte[k];
			}
			for(var k in totalPowerups){
				if(!totalPowerups.hasOwnProperty(k)){ continue; }
				prodMinRack[k] -= totalPowerups[k];
			}
		}

		for(var k=0;k<prodMinRack.length;k++){
			// delete non-availables
			if(prodBlock[k].match(/l/)){
				prodMinRack[k]=0;
			}else{
				// Addons
				if(prodMinRackAddon[k]){
					for(var l in prodMinRackAddon[k]){
						if(!prodMinRackAddon[k].hasOwnProperty(l)){ continue; }
						prodMinRack[k] += prodMinRackAddon[k][l];
					}
				}
				// delete negatives
				if(prodMinRack[k]<0){
					prodMinRack[k]=0;
				}
			}
		}

		unsafeWindow.GMprodMinRack=prodMinRack.slice();
		unsafeWindow.GMprodMinRackSettings = {"growing":valMinRackGrowing,"quest":valMinRackQuest,"farmis":valMinRackFarmis};
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_prodMinRack",prodMinRack.join("|"));
		doBuyNotepad();
		doRack();
	}
	saveData();
	/*
	for(var v=0;v<prodName.length;v++){
		GM_log(v+":"+prodName[v]+":NPC "+NPC[v]+":typ "+prodTyp[v]+":block "+prodBlock[v]);
	}
	*/

	// Addons
	document.addEventListener("gameBotStarted",function(){
		valGiess=unsafeWindow.GMbotConfigData[0];
		valErnte=unsafeWindow.GMbotConfigData[1];
		valGiessNotw=unsafeWindow.GMbotConfigData[2];
	},false);
	document.addEventListener("gameBotStopped",function(){
		valGiess=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valGiess",true);
		valErnte=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valErnte",true);
		valGiessNotw=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valGiessNotw",true);
	},false);
	document.addEventListener("gameStatBotPostedData",function(){
		if (compareVersions(unsafeWindow.GMstatBotVersion,"1.1.0")>=0){
			window.setTimeout(function(){
				var preisBeob=new Array();//isNotSent,time,min,max,amount
				try{ preisBeob=explode(GM_getValue(LNG+"_"+SERVER+"_preisBeob","[]")); }catch(err){}
				if(!(preisBeob instanceof Array)){ preisBeob=new Array(); }
				var count=0;
				for(var v=0;v<unsafeWindow.GMstatBotpreisBeob.length;v++){
					if(unsafeWindow.GMstatBotpreisBeob[v]!=undefined){
						count++;
						preisBeob[v]=unsafeWindow.GMstatBotpreisBeob[v];
						if(unsafeWindow.GMstatBotgutBeob[v]!=undefined){
							gutBeob[v]=unsafeWindow.GMstatBotgutBeob[v];
						}
					}
				}
				GM_setValue(LNG+"_"+SERVER+"_preisBeob",implode(preisBeob));
				GM_setValue(LNG+"_"+SERVER+"_gutBeob",gutBeob.join("|"));
				raiseEventTop("gameChangedBeobPrice");

				if (GM_getValue(LNG+"_"+SERVER+"_valNimmBeob",false)){
					for(var v=0;v<gutBeob.length;v++){
						if(gutBeob[v]!=undefined){
							if(!isNaN(NPC[v])){
								gut[v]=Math.min(gutBeob[v],NPC[v]);
							}else{
								gut[v]=gutBeob[v];
							}
						}
					}
					GM_setValue(LNG+"_"+SERVER+"_gut",gut.join("|"));
					raiseEventTop("gameChangedGut");
				}
				showInLogBubble("Received "+count+" observed prices from StatBot");
			},0);
		}else{
			showInLogBubble("Update the statbot!");
		}
	},false);
	unsafeWindow.prodMinRackAddon.add = function(prodId,reason,amount){
		prodId=parseInt(prodId,10);
		amount=parseInt(amount,10);
		if(isNaN(prodId)||isNaN(amount)){
			GM_log("prodMinRackAddon.add wrong arguments:");
			GM_log([prodId,reason,amount]);
			return false;
		}
		unsafeWindow.prodMinRackAddon.newdata.push([prodId,reason,amount]);
		raiseEvent("gameChangedProdMinRackAddon");
	};
	unsafeWindow.prodMinRackAddon.remove = function(prodId,reason){
		unsafeWindow.prodMinRackAddon.newdata.push([prodId,reason,null]);
		raiseEvent("gameChangedProdMinRackAddon");
	};
	document.addEventListener("gameChangedProdMinRackAddon",function(){
		// test if calculation is running
		if(unsafeWindow.prodMinRackAddon.busy){ return false; }
		// set flag
		unsafeWindow.prodMinRackAddon.busy=true;
		// get data inside
		var helper=unsafeWindow.prodMinRackAddon.newdata;
		unsafeWindow.prodMinRackAddon.newdata=new Array();
		// calculate
		for(var k=0;k<helper.length;k++){
			var prodId=helper[k][0];
			var reason=helper[k][1];
			var amount=helper[k][2];
			if(prodMinRackAddon[prodId]){
				if(prodMinRackAddon[prodId][reason]){
					if(amount==null){ // delete existing entry
						delete prodMinRackAddon[prodId][reason];
						calcProdMinRack();
					}else if(prodMinRackAddon[prodId][reason]!=amount){ // update existing entry
						prodMinRackAddon[prodId][reason]=amount;
						calcProdMinRack();
					} // else the entry is correct
				}
			}else if(amount!=null){ // create new entry
				prodMinRackAddon[prodId]=new Object();
				prodMinRackAddon[prodId][reason]=amount;
				calcProdMinRack();
			} // else a non-existing entry should be deleted
		}
		// remove flag
		unsafeWindow.prodMinRackAddon.busy=false;
		// restart if new data meanwhile arrived
		if(unsafeWindow.prodMinRackAddon.newdata.length>0){
			arguments.callee();
		}
	},false);

	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_farmname",FARMNAME);
	const DOCTITLE=" - "+FARMNAME+" - s"+SERVER+" - "+document.title;
	var farmNr=null;
	var lastGiess=0;
	var lastErnte=0;
	var aktivAutomat=false;
	var zoneTyp=splitToInt(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneTyp",""),"|");
	/*
		 0: empty
		 1: Field
		 2: Stable  - Chickens
		 3: Stable  - Cows
		 4: Stable  - Sheep
		 5: Stable  - Bees
		 6: Clubhouse
		 7: Factory - Cheese
		 8: Factory - Mayo
		 9: Factory - Whool
		10: Factory - Bonbons
		11: Stable  - Fish
	*/
	var zoneBlock=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBlock","[]"));
	var zoneAnimals=splitToInt(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneAnimals",""),"|");
	var totalAnimals=[,,0,0,0,0,,,,,,0];
	var zoneBonus=splitToInt(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBonus",""),"|");
	var zoneBonusSpecialProduct=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBonusSpecialProduct","").split("|");
	var zoneBonusSpecialAmount=splitToInt(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBonusSpecialAmount",""),"|");
	function goToZone(mode){
		var c=parseInt(mode,10);
		var nextFarm=Math.ceil(c/6);
		top.window.wrappedJSObject.showMain();
		if (nextFarm != unsafeWindow.farm){
			if($("farmtooltip"+nextFarm)){ click($("farmtooltip"+nextFarm).parentNode);
			}else{
				if ((nextFarm=="2") && ($("farmpassage_r1").style.display!="none")) click($("farmpassage_r1").firstElementChild);
				if ((nextFarm=="1") && ($("farmpassage_l2").style.display!="none")) click($("farmpassage_l2").firstElementChild);
			}
			window.setTimeout(function(){click($("zone"+(((c-1)%6)+1)).firstElementChild.firstElementChild);},500);
		}else{click($("zone"+(((c-1)%6)+1)).firstElementChild.firstElementChild);}
	}
	var zoneNext=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneNext","").split("|");
	var zoneMainprod=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneMainprod","").split("|");
	var zoneErnte=new Array(); // zoneErnte[zoneNr]={"prodId1":[amount1,points1],"prodId2":[amount2,points2],...}

	function processZoneFieldData(zoneNrF){
		if(DEVMODE) GM_log("processZoneFieldData "+zoneNrF+": "+implode(zoneFieldData[zoneNrF]));
		if(zoneTyp[zoneNrF]!=1){ return false; }
		var nowServer=parseInt(unsafeWindow.Zeit.Server,10);
		zoneErnte[zoneNrF]=new Object();
		nextTime[zoneNrF]=NEVER;
		nextTimeWasser[zoneNrF]=NEVER;
		var c=0;
		zoneMainprod[zoneNrF]=undefined;
		zoneNext[zoneNrF]=undefined;

		if(!zoneBlock[zoneNrF]){
			for(var p in zoneFieldData[zoneNrF]){
				if(!zoneFieldData[zoneNrF].hasOwnProperty(p)){ continue; }
				if(prodTyp[p]=="v"){ // only plants
					for(var i=0;i<zoneFieldData[zoneNrF][p].length;i++){
						var z=zoneFieldData[zoneNrF][p][i][1];
						var w=zoneFieldData[zoneNrF][p][i][2];

						if (zoneMainprod[zoneNrF]==p){ c += zoneFieldData[zoneNrF][p][i][0]*prodPlantSize[p]; }
						else{ c -= zoneFieldData[zoneNrF][p][i][0]*prodPlantSize[p]; }
						if (c<1){
							zoneMainprod[zoneNrF]=p;
							c=zoneFieldData[zoneNrF][p][i][0]*prodPlantSize[p];
						}

						if (!zoneErnte[zoneNrF][p]){ zoneErnte[zoneNrF][p]=[0,0]; }
						zoneErnte[zoneNrF][p][0] += zoneFieldData[zoneNrF][p][i][0]*(unsafeWindow.produkt_ernte[p]+((currentPowerup[p]&&(z<currentPowerup[p][0]))?currentPowerup[p][1]:0));
						zoneErnte[zoneNrF][p][1] += zoneFieldData[zoneNrF][p][i][0]*(POINTS[p]+((currentPowerup[p]&&(z<currentPowerup[p][0]))?currentPowerup[p][2]:0));

						if(w){
							nextTimeWasser[zoneNrF]=Math.min(nextTimeWasser[zoneNrF],w);
							if(valGiessAnnehm&&(nowServer<=z)){
								// calculate future watering
								// w<nowServer means that now can be watered. because it isnt watered, assume that watering is not wanted
								if ((nowServer<w)&&(w<z)){
									w=Math.max(0,Math.min(86400,w-nowServer)); // time till watering
									z -= nowServer; // remaining time
									z=nowServer+w+calcDauer(z-w,(100-zoneBonus[zoneNrF]-(p==zoneBonusSpecialProduct[zoneNrF]?zoneBonusSpecialAmount[zoneNrF]:0))/100);
								}
							}
						}

						if (z < nextTime[zoneNrF]){
							nextTime[zoneNrF]=z;
							zoneNext[zoneNrF]=p;
						}
					}
				}
			}

			// too many empty fields
			if (zoneFieldData[zoneNrF]&&zoneFieldData[zoneNrF]["-"]&&(zoneFieldData[zoneNrF]["-"][1]>valLeereFelderLimit)){
				nextTime[zoneNrF]=NEVER;
				zoneNext[zoneNrF]=undefined;
			}

			// check if GMreadyZone is still correct
			if(unsafeWindow.GMreadyZone[zoneNrF]){
				if(nextTime[zoneNrF]==NEVER){
					if(unsafeWindow.GMreadyZone[zoneNrF][1]!="e"){ unsafeWindow.GMreadyZone[zoneNrF][1]="e"; }
				}else if(nextTime[zoneNrF]<nowServer){
					if(unsafeWindow.GMreadyZone[zoneNrF][1]!="r"){ unsafeWindow.GMreadyZone[zoneNrF][1]="r"; }
				}else if (valGiessNotw&&(nextTimeWasser[zoneNrF]<nowServer)){
					if(unsafeWindow.GMreadyZone[zoneNrF][1]!="w"){ unsafeWindow.GMreadyZone[zoneNrF][1]="w"; }
				}else{
					GM_log("2delete unsafeWindow.GMreadyZone["+zoneNrF+"]");
					delete unsafeWindow.GMreadyZone[zoneNrF];
				}
			}
		}

		// saving
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_nextTime_"+zoneNrF,nextTime[zoneNrF]);
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_nextTimeWasser_"+zoneNrF,nextTimeWasser[zoneNrF]);
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneErnte_"+zoneNrF,implode(zoneErnte[zoneNrF]));
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneMainprod",zoneMainprod.join("|"));
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneNext",zoneNext.join("|"));
	}
	var zoneFieldData=new Array();
	// zoneFieldData[zoneNr]={"id1":*,"id2":*,...}
	// case plants : *=[[amount1,croptime1,nextwatertime1],[amount2,croptime2,nextwatertime2],...]
	// - amount : count of plants with these times
	// - croptime : time of cropping (without future waterings)
	// - nextwatertime : undefined if not possible to water in future
	// case deco : *=[[amount1,time1],[amount2,time2],...]
	// case garbage : *=amount
	// case current empty (id="-") : *=[,1,2,,4] free places for planting with that size
	// case "space" : *=[,1,2,,4] possible amount of planting with that size (cropped field)
	for(var v=1;v<19;v++){
		zoneErnte[v]=new Object();
		try{ zoneErnte[v]=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneErnte_"+v,"{}")); }catch(err){}
		zoneFieldData[v]=new Object();
		try{ zoneFieldData[v]=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneFieldData_"+v,"{}")); }catch(err){}
		if(zoneAnimals[v]>0){
			totalAnimals[zoneTyp[v]] += zoneAnimals[v];
		}
	}

	var totalErnte=new Object(); // Value of products the farm currently produces
	var totalFarmis=new Object(); // Value of products the farmis want
	var totalPowerups=new Object(); // Value of powerups creating products
	var totalQuest=new Object(); // Value of products the quest needs
	function calcTotalErnte(){
		totalErnte=new Object();
		for(var zF=0;zF<zoneErnte.length;zF++){
			for(var k in zoneErnte[zF]){
				if(!zoneErnte[zF].hasOwnProperty(k)){ continue; }
				if (!totalErnte[k]){ totalErnte[k]=0; }
				totalErnte[k] += zoneErnte[zF][k][0];
			}
		}
	}
	function calcTotalFarmis(){ // -> calcProdMinRack -> doBuyNotepad,doRack
		totalFarmis=new Object();
		var farmiNr=-1;
		if(top.window.wrappedJSObject.farmisinfo&&top.window.wrappedJSObject.farmisinfo[0]){
			while (top.window.wrappedJSObject.farmisinfo[0][++farmiNr]){ // loop through all farmis...
				if (!top.window.wrappedJSObject.farmisaway[farmiNr]){ // ...which are waiting...
					// {"id":integer(string),"pic":integer(string),"verkauft":"0","price":float(string),"p1":prodId(string),"a1":amount(string),...,"p7":...,"a7":...}
					if(valFarmiLimits[0]<=top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"]){ // ...and pay enough
						for(var i=1 ; i <= 7 ; i++){ // 7=max-amount of products per farmi
							var pid=top.window.wrappedJSObject.farmisinfo[0][farmiNr]["p"+i];
							var amount=parseInt(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["a"+i],10);
							if((pid > 0) && (amount > 0)){
								if (totalFarmis[pid]) totalFarmis[pid] += amount;
								else totalFarmis[pid]=amount;
							}
						}
					}
				}
			}
		}
		calcProdMinRack();
	}
	function calcTotalPowerups(){
		totalPowerups=new Object();
		if(unsafeWindow.powerupcontent){
			for(var v=0;v<unsafeWindow.powerupcontent.length;v++){
				if(unsafeWindow.powerupcontent[v][5] && unsafeWindow.powerupcontent[v][5][0]){ //problem in the game made this visible
					var k=parseInt(unsafeWindow.powerupcontent[v][5][0][0],10);
					totalPowerups[k]=parseInt(unsafeWindow.powerupcontent[v]["rack"],10)*parseInt(unsafeWindow.powerupcontent[v][5][0][1],10);
				}
			}
		}
	}
	calcTotalPowerups();
	function calcTotalQuest(){
		totalQuest=new Object();
		if(QUESTS[questNr]){
			for(var v=0;v<QUESTS[questNr][0].length;v++){
				totalQuest[QUESTS[questNr][0][v][0]]=QUESTS[questNr][0][v][1];
			}
		}
	}

	// Value of active powerup for a field
	// currentPowerup[plantNr]=[time,+value,+points]
	var currentPowerup=new Object;
	function calcCurrentPowerup(){
		currentPowerup=new Object;
		if(unsafeWindow.powerupcontent){
			for(var i=0 ; i < unsafeWindow.powerupcontent.length ; i++){
				var item=unsafeWindow.powerupcontent[i];
				if((item[5])&&(item["remain"]>0)){
					if(item[5][1]){
						currentPowerup[item[5][1][0]]=[item["remain"]+unsafeWindow.Zeit.Server,item[5][1][1],0];
						var newdiv=$("powerupSymbol"+item["0"]);
						if(!newdiv){
							newdiv=createElement("div",{"id":"powerupSymbol"+item["0"],"style":"position:relative;width:60px;height:87px;","end":item["remain"]+unsafeWindow.Zeit.Server},nodes["containerPowerupSymbols"]["node"]);
							newdiv.addEventListener("mouseover",function(event){
								var end=parseInt(this.getAttribute("end"),10);
								var endDay=countDays(now,end);
								showToolTip(event,(texte["day"+endDay]?texte["day"+endDay]:(new Date(1000*end).toLocaleString()))+"<br>"+getDaytimeStr(end));
							},false);
							createElement("img",{"src":GFX+"powerup2.png","border":"0"},newdiv);
							createElement("div",{"style":"position:absolute;top:3px;left:6px;","class":"kp"+item[5][1][0]},newdiv);
							createElement("div",{"style":"position:absolute;top:3px;left:22px;font-weight:bold;color:black;"},newdiv,"+"+item[5][1][1]);
							createElement("div",{"style":"position:absolute;top:64px;right:0;font-weight:bold;","class":"blackbox"},newdiv,getTimeStr(item["remain"]));
						}
						newdiv=null;
					}
					if(item[5][2]){
						currentPowerup[item[5][2][0]]=[item["remain"]+unsafeWindow.Zeit.Server,0,item[5][2][1]];
						var newdiv=$("powerupSymbol"+item["0"]);
						if(!newdiv){
							newdiv=createElement("div",{"id":"powerupSymbol"+item["0"],"style":"position:relative;width:60px;height:87px;","end":item["remain"]+unsafeWindow.Zeit.Server},nodes["containerPowerupSymbols"]["node"]);
							newdiv.addEventListener("mouseover",function(event){
								var end=parseInt(this.getAttribute("end"),10);
								var endDay=countDays(now,end);
								showToolTip(event,(texte["day"+endDay]?texte["day"+endDay]:(new Date(1000*end).toLocaleString()))+"<br>"+getDaytimeStr(end));
							},false);
							createElement("img",{"src":GFX+"powerup3.png","border":"0"},newdiv);
							createElement("div",{"style":"position:absolute;top:3px;left:6px;","class":"kp"+item[5][2][0]},newdiv);
							createElement("div",{"style":"position:absolute;top:3px;left:22px;font-weight:bold;color:black;"},newdiv,"+"+item[5][2][1]);
							createElement("div",{"style":"position:absolute;top:64px;right:0;font-weight:bold;","class":"blackbox"},newdiv,getTimeStr(item["remain"]));
						}
						newdiv=null;
					}
				}
			}
		}
		unsafeWindow.GMcurrentPowerup=currentPowerup.clone();
	}
	calcCurrentPowerup();

	// powerup-data is updated
	unsafeWindow._fillPowerupsResponse=unsafeWindow.fillPowerupsResponse;
	unsafeWindow.fillPowerupsResponse = function(request){
		unsafeWindow._fillPowerupsResponse(request);
		var result=checkRequest(request);
		if(result){
			if(!result[1]){ unsafeWindow.powerupcontent=new Array(); }
			calcTotalPowerups();
			raiseEvent("gamePowerupcontentUpdated");
		}
	};

	unsafeWindow._activatePowerup=unsafeWindow.activatePowerup;
	unsafeWindow.activatePowerup = function(formula){
		unsafeWindow._activatePowerup(formula);
		document.addEventListener("gamePowerupcontentUpdated",function(){
			calcCurrentPowerup();
			for(var v=1;v<19;v++){ processZoneFieldData(v); }
			calcProdMinRack();
			raiseEvent("gamePowerupActivated");
			this.removeEventListener("gamePowerupcontentUpdated",arguments.callee,false);
		},false);
	};
	var recipeNameToId=null;
	var windmillRecipe=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_windmillRecipe",0);
	var windmillTimeEnd=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_windmillTimeEnd",NEVER);
	var sawmillProductId=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_sawmillProductId",0);
	var sawmillTimeEnd=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_sawmillTimeEnd",NEVER);
	var carpentryProductId=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_carpentryProductId",0);
	var carpentryTimeEnd=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_carpentryTimeEnd",NEVER);

	var nextTime=new Array();
	for(var v=0;v<=18;v++){ nextTime[v]=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nextTime_"+v,NEVER); }
	var nextTimeWasser=new Array();
	for(var v=1;v<=18;v++){ nextTimeWasser[v]=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nextTimeWasser_"+v,NEVER); }

	var forestryNextTime=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_forestryNextTime",NEVER);
	var forestryNextTimeWasser=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_forestryNextTimeWasser",NEVER);

	var valGlobaltimeWindmill=GM_getValue(LNG+"_"+SERVER+"_valGlobaltimeWindmill",false);
	var valGlobaltimeForestry=GM_getValue(LNG+"_"+SERVER+"_valGlobaltimeForestry",false);
	var valGlobaltimeSawmill=GM_getValue(LNG+"_"+SERVER+"_valGlobaltimeSawmill",false);
	var valGlobaltimeCarpentry=GM_getValue(LNG+"_"+SERVER+"_valGlobaltimeCarpentry",false);

	var lodgeTimeEnd=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lodgeTimeEnd",NEVER);
	var lodgeQuestNr=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lodgeQuestNr",1);
	var lodgeCampaignNr=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lodgeCampaignNr",1);
	var lodgeQuestData=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lodgeQuestData","{}"));

	var valGiess=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valGiess",true);
	var valGiessNotw=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valGiessNotw",true);
	var valGiessAnnehm=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valGiessAnnehm",true);
	var valErnte=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valErnte",true);
	var valErnteMsg=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valErnteMsg",false);
	var valLeereFelderLimit=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valLeereFelderLimit",3);
	if(typeof GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valKauflimit",110)=="number"){ GM_deleteValue(LNG+"_"+SERVER+"_"+USERNAME+"_valKauflimit"); }
	var valKauflimit=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valKauflimit","[[85,'990000'],110]"));
	var valStatistik=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valStatistik",!!STAT_SERVER[LNG]);
	var valClickErrorbox=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valClickErrorbox",false);
	var valSpoilerZoneUpdate=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valSpoilerZoneUpdate",true);
	var valGlobaltimeShowCroppedZone=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valGlobaltimeShowCroppedZone",true);

	unsafeWindow.GMnextTime=nextTime.slice();
	unsafeWindow.GMreadyZone=new Object;
	unsafeWindow.GMvalGlobaltimeWindmill=valGlobaltimeWindmill;
	unsafeWindow.GMzoneAnimals=zoneAnimals.slice();
	unsafeWindow.GMzoneBonus=zoneBonus.slice();
	unsafeWindow.GMzoneBonusSpecialProduct=zoneBonusSpecialProduct.slice();
	unsafeWindow.GMzoneBonusSpecialAmount=zoneBonusSpecialAmount.slice();
	unsafeWindow.GMzoneErnte=zoneErnte.slice();
	unsafeWindow.GMzoneFieldData=zoneFieldData.clone();
	unsafeWindow.GMzoneTyp=zoneTyp.slice();
	unsafeWindow.GMzoneBlock=zoneBlock.slice();

	function calcDauer(dauer,bonus){ //dauer in sek, bonus zB 0.85
		var gesamtdauer=0;
		while(dauer>0){
			dauer *= bonus;
			var help=Math.min(dauer,86400);
			dauer -= help;
			gesamtdauer += help;
		}
		return Math.round(gesamtdauer);
	}
	function calcGrowTimes(dauer,gesamtdauer,bonus){
		return gesamtdauer/calcDauer(dauer,bonus);
	}

	// Werbung
	var upjersWerbung=new Array();
	for(var v in unsafeWindow.welcomeblurb){
		if(!unsafeWindow.welcomeblurb.hasOwnProperty(v)){ continue; }
		if(v!="1"){
			upjersWerbung.push(unsafeWindow.welcomeblurb[v]);
			delete unsafeWindow.welcomeblurb[v];
		}
	}
	unsafeWindow.gclr();
	newdiv=createElement("img",{"style":"position:absolute;top:0;right:0;height:15px;width:15px;","class":"link","src":GFX+"points.gif"},$("headercontainer"));
	newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["upjersWerbung"]); },false);
	newdiv.addEventListener("click",function(){ buildInfoPanel("upjersWerbung"); },false);
	$("notepad").style.zIndex=111; // Notizen on top
	unsafeWindow.shredderCommit = function(){return;}; // Schredder weg

	// Dragging
	if(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valDrag",false)){
		$("gameArea").style.position="absolute";
		$("gameArea").style.top="5px";
		$("gameArea").style.left="5px";
		makeDraggable($("notepad"));
		makeDraggable($("divGame"),true,false);
		//makeDraggable("gardenmaincontainer");
		//makeDraggable("innermaincontainer");
		$("globaltransp").style.height="0";
		//$("transp").style.height="0";
	}

	// Button-Leiste
	var newbutton=createElement("button",{"type":"button","class":"link2","style":"margin-left:3px;"},$("divSettings"),texte["scriptHomepage"]);
	newbutton.addEventListener("click",function(){window.open(USO_URL);},false);
	newbutton=createElement("button",{"id":"berateroptionen","type":"button","class":"link2","style":"margin-left:3px;"},$("divSettings"),texte["optionen"]);
	newbutton.addEventListener("click",function(){buildInfoPanel("options");},false);

	// Farmlinks
	unsafeWindow.createFarmLinks = function (){
	try{
		var content='';
		for(var i=1 ; i <= unsafeWindow.farmamount; i++)
		{
			var useid='farmlinkitem';
			if(unsafeWindow.farm == i){
				useid='farmlinkitemactivate';
			}
			var onclick='initZones(' + i + '); showMain();';
			if(unsafeWindow.forestry_unlock==undefined){
				content += '<div class="link" id="' + useid + '" onclick="' + onclick + '" ';
			}else{
				content += '<div class="link ' + useid + '" id="quicknavifarm' + i + '" onclick="' + onclick + '" ';
			}
			content += 'onmouseover="showDiv(\'farmtooltip' + i + '\');" onmouseout="hideDiv(\'farmtooltip' + i + '\');">';
			content += i;
			content += '<div id="farmtooltip' + i + '" onmouseover="showDiv(\'farmtooltip' + i + '\');" onmouseout="hideDiv(\'farmtooltip' + i + '\');">' + unsafeWindow.farmname + i + '</div>';
			content += '</div>';
		}

		if(unsafeWindow.forestry_unlock!=undefined){
			content += '<div id="quicknavifarmforestry" style="float:left; background:url(' + GFX + ')forestrylink.png) top left no-repeat; width:40px; height:29px; margin-left:5px;" ';
			content += 'onclick="initForestry()" onmouseover="showDiv(\'forestrytooltip\');" onmouseout="hideDiv(\'forestrytooltip\');">';
			content += '<div id="forestrytooltip">' + unsafeWindow.cityzone_quicknavi + '</div>';
			content += '</div>';
		}

		content += '<div style="clear:both;"></div>';
		$('farmlinks').innerHTML=content;

		if(unsafeWindow.forestry_unlock!=undefined){
			if(unsafeWindow.forestry_quicknavi == 1){
				for(var i = 1 ; i <= unsafeWindow.farmamount ; i++){
					if($('quicknavifarm' + i)) $('quicknavifarm' + i).className = 'link farmlinkitem';
				}
				if($('quicknavifarmforestry')) $('quicknavifarmforestry').style.background = 'url(' + GFX + 'forestryactivate.png) no-repeat';
			}else{
				if($('quicknavifarmforestry')) $('quicknavifarmforestry').style.background = 'url(' + GFX + 'forestrylink.png) no-repeat';  // hier forestry deaktivieren
			}
			if(unsafeWindow.forestry_unlock){
				unsafeWindow.showDiv('quicknavifarmforestry');
			}else{
				unsafeWindow.hideDiv('quicknavifarmforestry');
			}
		}
	}catch(err){GM_log("ERROR CreateFarmLinks farm:"+unsafeWindow.farm+"\n"+err);}
	};
	unsafeWindow.createFarmLinks();

	unsafeWindow.createGuildLinks = function(){
		if(unsafeWindow.userfarminfos[unsafeWindow.farm]){
			if(unsafeWindow.userfarminfos[unsafeWindow.farm]['guild'] > 0){
				if(unsafeWindow.farm == 1){
					unsafeWindow.showDiv('guildbicycle');
					if(unsafeWindow.userfarminfos[unsafeWindow.farm]['guildquest']){
						var questaniimg='guildpassagequestani.gif';
						$('guildpassagequestani').style.backgroundImage='url(' + GFX + questaniimg + ')';
						unsafeWindow.showDiv('guildpassagequestani');
					}else{
						unsafeWindow.hideDiv('guildpassagequestani');
					}
				}else{
					unsafeWindow.hideDiv('guildbicycle');
					unsafeWindow.hideDiv('guildpassagequestani');
				}
				if(unsafeWindow.inguild == 1) $('guildlink').style.backgroundImage="url(" + GFX + "guildlink.png)";
				else $('guildlink').style.backgroundImage="url(" + GFX + "guildlink_off.png)";
				unsafeWindow.showDiv('guildlink');
			}else{
				unsafeWindow.hideDiv('guildbicycle');
				unsafeWindow.hideDiv('guildlink');
				unsafeWindow.hideDiv('guildpassagequestani');
			}
		}
	};
	unsafeWindow.createGuildLinks();

	unsafeWindow.createCityLinks = function (){
		var content='';
		for(var i=1 ; i <= unsafeWindow.cities ; i++)
		{
			var onclick='initCity(' + i + ');';
			var bgimage='citylink.png';
			if(i == unsafeWindow.city) bgimage='citylinkactivate.png';
			var name=unsafeWindow.cityname1;
			if(i == 2){
				name=unsafeWindow.cityname2;
				if(unsafeWindow.premium!=1) onclick='travel2City2();';
			}

			content += '<div class="link" id="citylineitem' + i + '" style="background:url(' + GFX + bgimage + ') left top no-repeat;" ';
			content += 'onclick="' + onclick + '" onmouseover="showDiv(\'citytooltip' + i + '\');" onmouseout="hideDiv(\'citytooltip' + i + '\');">';
			content += i;
			content += '<div id="citytooltip' + i + '" onmouseover="showDiv(\'citytooltip' + i + '\');" onmouseout="hideDiv(\'citytooltip' + i + '\');">' + name + '</div>';
			content += '</div>';
		}
		content += '<div style="clear:both;"></div>';
		$('cityline').innerHTML=content;
		if(unsafeWindow.forestry_unlock!=undefined){
			if(unsafeWindow.forestry_quicknavi == 1){
				for(var i = 1 ; i <= unsafeWindow.cities ; i++){
					if($('citylineitem' + i)) $('citylineitem' + i).style.background = 'url(' + GFX + 'citylink.png) no-repeat';
				}
			}
			if(unsafeWindow.forestry_unlock){
				unsafeWindow.showDiv('quicknavifarmforestry');
			}else{
				unsafeWindow.hideDiv('quicknavifarmforestry');
			}
		}
	};
	unsafeWindow.createCityLinks();

	unsafeWindow.travel2City2 = function(){
		switch(unsafeWindow.city){
			case 2:
			case 1: unsafeWindow.initCity(2); break;
			default: {
				document.addEventListener("gameCity1",function(){
					unsafeWindow.initCity(2);
					document.removeEventListener("gameCity1",arguments.callee,false);
				},false);
				unsafeWindow.initCity(1);
			}
		}
	};

	// andere ServerAccounts
	var farmNamen=new Object;
	try{farmNamen=explode(GM_getValue(LNG+"_"+SERVER+"_farmNamen","{}"));}catch(err){}
	farmNamen[USERNAME]=FARMNAME;
	if(farmNamen[USERNAME].toLowerCase()!=USERNAME){
		newdiv=createElement("div",{"class":"userinfositem link","style":"font-weight: bold;"});
		newdiv.innerHTML="("+USERNAME+")";
		newdiv1=$("userinfoscontainer");
		newdiv1.insertBefore(newdiv,newdiv1.children[1]);
	}
	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_farmNamen",implode(farmNamen));

	var otherAccs=new Array();
	var min=[NEVER,];
	try{var help=explode(GM_getValue("logindata","[]"));
		for(var v=0;v<help.length;v++){
			help[v][3]=v;
			if((help[v][4]) && (help[v][0]==LNG) && (help[v][1]==SERVER)){
				if(help[v][2].toLowerCase()==USERNAME){
					help[v][3]=-1; // this account
				}else{
					help[v][5]=GM_getValue(help[v][0]+"_"+help[v][1]+"_"+help[v][2].toLowerCase()+"_nextTime_0",NEVER);
					if(help[v][5]<min[0]){
						min[0]=help[v][5];
						min[1]=v;
					}
				}
				otherAccs.push(help[v]);
			}
			if(!farmNamen[help[v][2]]){ farmNamen[help[v][2]]=help[v][2]; }
		}
	}catch(err){}

	function testOtherAccReady(){
		var found=-1;
		for(var v=0;v<otherAccs.length;v++){ if(otherAccs[v][3]>-1){
			if (otherAccs[v][5]+unsafeWindow.Zeit.Verschiebung<now){
				found=v;
				break;
			}
		}}
		if(found>-1){
			var cell=$("bubble_adtext");
			if(!cell){ cell=$("sprcontent"); }
			cell.innerHTML="";
			cell=createElement("a",{"id":"linkOtherAccReady","class":"link","dologin":otherAccs[found][3],"href":"#","style":"font-weight:bold;"},createElement("div",{"style":"height:50px;"},cell),farmNamen[otherAccs[found][2]]+" "+texte["fertig"].toLowerCase()+"!");
			cell.addEventListener("click",function(){
				var dologin=parseInt(this.getAttribute("dologin"),10);
				window.setTimeout(function(){
					var help=explode(GM_getValue(LNG+"_pagedataLogin","{}"));
					if(!(help["dologin"]&&(typeof help["dologin"]=="object"))){
						help["dologin"]=new Object();
					}
					help["dologin"][dologin]=true;
					GM_setValue(LNG+"_pagedataLogin",implode(help));
					location.href="http://www."+GAMEPAGES[LNG]+"/login.php?start=1";
				},0);
			},false);
			cell=null;
			raiseEvent("gameOtherAccReady");
		}else{
			window.setTimeout(testOtherAccReady,5000);
		}
	}
	if (otherAccs.length>1){
		newdiv=createElement("div",{"id":"divOtherAccountsTimes","class":"blackbox","style":"position:absolute;top:5px;right:150px;border:2px solid black;padding:2px;z-index:300;display:none;"},$("headercontainer"));
		newdiv.addEventListener("mouseout",function(){this.style.display="none";},false);
		newdiv.addEventListener("mouseover",function(){this.style.display="";},false);
		newdiv=createElement("div",{"style":"position:absolute;top:4px;right:150px;font-size:11px;color:#f7bb87;","class":"link"},$("headercontainer"));
		createElement("div",{"style":"display:inline-block;margin-bottom:2px;margin-right:2px;text-decoration:underline;vertical-align:top;font-size:11px;"},newdiv,texte["umloggen"]);
		newdiv1=createElement("div",{"style":"display:inline-block;"},newdiv);
		createElement("img",{"border":"0","src":GFX+"menu/logout.gif"},newdiv1);
		newdiv.addEventListener("mouseout",function(){$("divOtherAccountsTimes").style.display="none";},false);
		function fillDivOtherAccountsTimes(){
			divOtherAccountsTimes=$("divOtherAccountsTimes");
			if(divOtherAccountsTimes.style.display=="none"){
				divOtherAccountsTimes.innerHTML="";
			}else{
				var newtable=createElement("table",{},newdiv);
				var newtr;
				for(var v=0;v<otherAccs.length;v++){
					if(otherAccs[v][3]>-1){
						newtr=createElement("tr",{"class":"link hoverBgCc9","dologin":otherAccs[v][3]},newtable);
						newtr.addEventListener("click",function(){
							var dologin=parseInt(this.getAttribute("dologin"),10);
							window.setTimeout(function(){
								var help=explode(GM_getValue(LNG+"_pagedataLogin","{}"));
								if(!(help["dologin"]&&(typeof help["dologin"]=="object"))){
									help["dologin"]=new Object();
								}
								help["dologin"][dologin]=true;
								GM_setValue(LNG+"_pagedataLogin",implode(help));
								location.href="http://www."+GAMEPAGES[LNG]+"/login.php?start=1";
							},0);
						},false);
					}else{
						newtr=createElement("tr",{"class":"fontWeightBold"},newtable);
						otherAccs[v][5]=nextTime[0];
					}
					createElement("td",{},newtr,farmNamen[otherAccs[v][2]]);
					var help=unsafeWindow.Zeit.Verschiebung+otherAccs[v][5];
					if (help>now){ createElement("td",{},newtr,getTimeStr(help-now)); }
					else{ createElement("td",{},newtr,texte["fertig"].toLowerCase()+"!"); }
				}
				divOtherAccountsTimes.innerHTML="";
				divOtherAccountsTimes.appendChild(newtable);
				newtable=null;newtr=null;
				window.setTimeout(fillDivOtherAccountsTimes,1000);
			}
			divOtherAccountsTimes=null;
		}
		newdiv.addEventListener("mouseover",function(){
			$("divOtherAccountsTimes").style.display="";
			fillDivOtherAccountsTimes();
		},false);
		if(min[0]<NEVER){
			window.setTimeout(testOtherAccReady,Math.max(0,min[0]+unsafeWindow.Zeit.Verschiebung-now));
		}
	}

	// SessionEnd
	//window.setTimeout('top.location.href="main.php?page=logout";','4457000');  in the gamepage
	function timerSessionEnd(sec){
		if(sec<1){
			var help=explode(GM_getValue(LNG+"_pagedataLogin","{}"));
			if(!(help["doserver"]&&(typeof help["doserver"]=="object"))){
				help["doserver"]=new Object();
			}
			help["doserver"][SERVER]=true;
			GM_setValue(LNG+"_pagedataLogin",implode(help));
			location.href="http://www."+GAMEPAGES[LNG]+"/login.php?start=1";
		}else{
			window.setTimeout(function(){ timerSessionEnd(sec-1); },1000);
			$("divSessionEndTime").innerHTML=sec;
		}
	}
	var valSessionTimeOut=(/window\.setTimeout\('top\.location\.href=\"main\.php\?page=logout\";','(\d+)'/i).exec(ALL.innerHTML);
	var valSessionEndtime=null;
	if (valSessionTimeOut){
		valSessionTimeOut=parseInt(valSessionTimeOut[1],10);
		valSessionEndtime=Math.floor(now+valSessionTimeOut/1000);
		window.setTimeout(function(){
			var newdiv=createElement("div",{"id":"divSessionEnd","class":"alertbubble tbig link"},ALL,texte["relogin"].replace(/%1%/,"<span id='divSessionEndTime'>0</span>"));
			newdiv.addEventListener("click",function(){
				window.setTimeout(function(){
					var help=explode(GM_getValue(LNG+"_pagedataLogin","{}"));
					if(!(help["doserver"]&&(typeof help["doserver"]=="object"))){
						help["doserver"]=new Object();
					}
					help["doserver"][SERVER]=true;
					GM_setValue(LNG+"_pagedataLogin",implode(help));
					location.href="http://www."+GAMEPAGES[LNG]+"/login.php?start=1";
				},0);
			},false);
			timerSessionEnd(Math.max(0,Math.min(120,valSessionEndtime-now-60)));
			newdiv=null;
			raiseEvent("gameSessionEnds");
		},Math.max(1,valSessionTimeOut-180000));
	}

	// Statistik
	if (STAT_SERVER[LNG]){
		function buildStatistik(mode){
			getData();
			var container=$("divStatistik");
			container.innerHTML="";

			// Header
			var newdiv=createElement("div",{"style":"width:100%;margin-bottom:3px;border:2px solid black;color:black;background-color:#ccf;"},container);
			var newselect=createElement("select",{"class":"link","style":"margin-right:20px;"},newdiv);
			createElement("option",{"value":"24"},newselect,texte["stat_days1"]);
			createElement("option",{"value":"72"},newselect,texte["stat_days3"]);
			createElement("option",{"value":"120"},newselect,texte["stat_days5"]);
			createElement("option",{"value":"168"},newselect,texte["stat_days7"]);
			var valStatistikTime=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valStatistikTime",120);
			newselect.value=valStatistikTime;
			newselect.addEventListener("change",function(){
				GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valStatistikTime",parseInt(this.value,10));
				buildStatistik(mode);
			},false);

			var valStatistikNpc=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valStatistikNpc",true);
			var newbutton=createElement("input",{"type":"checkbox","class":"link","checked":valStatistikNpc},newdiv);
			newbutton.addEventListener("click",function(){
				GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valStatistikNpc",this.checked);
				buildStatistik(mode);
			},false);
			createElement("span",{"style":"margin-right:20px;"},newdiv,texte["NPC"]);

			for(var v in texte["category"]){
				if(!texte["category"].hasOwnProperty(v)){ continue; }
				newbutton=createElement("button",{"type":"button","class":"link2","style":"width:150px","name":v},newdiv,texte["category"][v]);
				newbutton.addEventListener("click",function(){ buildStatistik(this.getAttribute("name")); },false);
				if (mode==v){ newbutton.style.backgroundColor="lightblue";}
			}

			// Body
			newdiv=createElement("div",{"style":"width:100%;height:"+(window.innerHeight-70-upjersToolbarHeight)+"px;overflow-y:auto;overflow-x:hidden;border:2px solid black;color:black;background-color:#ccf;"},container);
			if (mode!=""){
				var newdiv1,newimg,newobject;
				for(var v in prodName){
					if(!prodName.hasOwnProperty(v)){ continue; }
					if ((prodTyp[v]==mode) && (!prodBlock[v])){
						newdiv1=createElement("div",{"id":"stat"+v,"class":"link","style":"position:relative;float:left;height:214px;margin:5px;background-color:#bbe;"},newdiv);
						createElement("div",{"style":"height:14px;font-weight:bold;"},newdiv1,prodName[v]+", "+numberFormat(prodBestand[v],0)+", "+moneyFormat(gut[v])+", "+moneyFormat(gutBeob[v]));
						var url="http://www."+STAT_SERVER[LNG]+"/chart.php?w=400&h=200&t=h"+valStatistikTime+"&shownpc="+(valStatistikNpc?1:0)+"&clip=1&server1="+SERVER+"&product1="+v+"&color1=green";
						newobject=createElement("object",{"data":url,"type":"type=image/svg+xml","width":"400px","height":"200px"},newdiv1);
						createElement("param",{"name":"src","value":url},newobject);
						createElement("div",{"class":"v"+v,"style":"position:absolute;bottom:10px;left:10px;z-index:2;"},newdiv1);
						createElement("div",{"style":"position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;"},newdiv1);
						newdiv1.addEventListener("click",function(){
							//buildStatistik(this.id.replace("stat",""));
							showStatisticFullscreen(this.id.replace("stat",""));
						},false);
					}
				}
				/*
				if (isNaN(mode)){
				}else{
					newdiv1=createElement("div",{"style":"margin:5px;"},newdiv);
					createElement("div",{"style":"font-weight:bold"},newdiv1,prodName[mode]+", "+numberFormat(prodBestand[mode],0)+", "+moneyFormat(gut[mode])+", "+moneyFormat(gutBeob[mode]));
					var breit=(window.innerWidth-60);
					var hoch=(window.innerHeight-130);
					var url="http://www."+STAT_SERVER[LNG]+"/chart.php?w="+breit+"&h="+hoch+"&t=h"+time+"&shownpc="+(valStatistikNpc?1:0)+"&clip=1&server1="+SERVER+"&product1="+mode+"&color1=green";
					newobject=createElement("object",{data:url,"type":type="image/svg+xml","width":breit+"px","height":hoch+"px"},newdiv1);
					createElement("param",{"name":"src","value":url},newobject);
					createElement("div",{"class":"v"+mode,"style":"position:relative;top:-40px;left:10px;z-index:2"},newdiv1);
				}
				*/
				newdiv1=null;newimg=null;newobject=null;
			}
			container=null;newdiv=null;newselect=null;newselect=null;newbutton=null;
		}
		function sendStatData (){
			var prodStr="";
			var preisBeob=explode(GM_getValue(LNG+"_"+SERVER+"_preisBeob","[]")); //isNotSent,time,min,max,amount
			var preisBeobChanged=false;
			if(!(preisBeob instanceof Array)){
				preisBeob=new Array();
				preisBeobChanged=true;
			}
			gutBeob=splitToFloat(GM_getValue(LNG+"_"+SERVER+"_gutBeob",""),"|");
			var c=0;
			var neededTime=now-300; // Data max 5min old
			for(var v=0;v<preisBeob.length;v++){
				if(preisBeob[v] && preisBeob[v][0] && (neededTime<preisBeob[v][1]) && (0<preisBeob[v][2]) && (preisBeob[v][2]<=gutBeob[v]) && (gutBeob[v]<=preisBeob[v][3])){
					prodStr += ',\"product'+(++c)+'\":{\"product_id\":'+v+',\"avg_price\":'+gutBeob[v]+',\"min_price\":'+preisBeob[v][2]+',\"max_price\":'+preisBeob[v][3]+'}';
					preisBeob[v][0]=false;
					preisBeobChanged=true;
				}
			}
			if(preisBeobChanged){
				GM_setValue2(LNG+"_"+SERVER+"_preisBeob",implode(preisBeob));
				raiseEventTop("gameChangedBeobPrice");
			}

			if (c>0){
				showInLogBubble("sendStatData: sending "+c+" observed prices to server");
				//GM_log("sendStatData sending: " + 'json={\"server\":'+SERVER+',\"productcount\":'+c+prodStr+'}')
				GM_xmlhttpRequest({
				method: "POST",
				url: "http://www."+STAT_SERVER[LNG]+"/add.php",
				data: 'json={\"server\":'+SERVER+',\"productcount\":'+c+prodStr+'}',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response){
					showInLogBubble("sendStatData: "+response.responseText);
				}
				});
			}
		}
		newbutton=createElement("button",{"type":"button","class":"link2","style":"margin-left:3px;"},$("divSettings"),texte["stat_stats"]);
		newbutton.addEventListener("click",function(){
			if ($("divGame").style.display==""){
				$("divGame").style.display="none";
				$("fixedDivRight").style.display="none";
				$("divStatistik").style.display="";
				this.innerHTML=texte["stat_gamefield"];
				buildStatistik("");
			}else{
				$("divGame").style.display="";
				$("fixedDivRight").style.display="";
				$("divStatistik").style.display="none";
				this.innerHTML=texte["stat_stats"];
			}
		},false);
		if (valStatistik){
			sendStatData();
			window.setInterval(function (){
				sendStatData();
			},310000);
		}
	}

	// Spieler suchen
	newinput=createElement("input",{"value":texte["spielerSuchen"],"class":"text","style":"position:absolute;top:97px;left:125px;width:85px;background:transparent;border:1px solid black;"},$("rackBottom"));
	newinput.addEventListener("click",function(){this.value="";},false);
	newinput.addEventListener("blur",function(){this.value=texte["spielerSuchen"];},false);
	newinput.addEventListener("keyup",function(event){
		if (event.keyCode==13){
			showShopframePage("http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/stats.php?search=1&searchterm="+this.value);
		}
	},false);

	// InfoPanel
	newdiv=createElement("div",{"id":"infoPanel","mode":"","style":"position:absolute;top:50px;left:20px;width:660px;height:580px;background-color:#b8a789;z-index:100;display:none;"},$("garten_komplett"));
	createElement("img",{"src":GFX+"guild/help_back.jpg","style":"position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;"},newdiv);
	createElement("div",{"id":"infoPanelInner","class":"tnormal","style":"position:absolute;width:90%;height:89%;margin:5%;overflow:auto;"},newdiv);
	var newimg=createElement("img",{"id":"infoPanelClose","class":"link","src":GFX+"close.jpg","style":"position:absolute;top:8px;right:8px;width:20px;height:20px;"},newdiv);
	newimg.addEventListener("click",closeInfoPanel,false);
	if ($("farmlinks")) $("farmlinks").addEventListener("click",closeInfoPanel,false);
	if ($("cityline")) $("cityline").addEventListener("click",closeInfoPanel,false);
	function buildInfoPanel(mode,mode2){
		if(mode2==undefined){ mode2=""; }
		var newdiv=$("infoPanel");
		if((newdiv.style.zIndex=="101")&&(mode==newdiv.getAttribute("mode"))&&(implode(mode2)==newdiv.getAttribute("mode2"))){
			closeInfoPanel();
		}else{
			getData();
			var newtable,newthead,newtbody,newtfoot,newtr,newtd,newtd1,newdiv1,newinput;

			newdiv.setAttribute("mode",mode);
			newdiv.setAttribute("mode2",implode(mode2));
			newdiv.style.display="block";
			newdiv.style.zIndex="101";

			infoPanelInner=$("infoPanelInner");
			infoPanelInner.innerHTML="";
			infoPanelInner.style.width="595px"; //~90%
			infoPanelInner.style.background="";

			$("multiframe").style.zIndex="99";
			$("transp100").style.display="block";
			//$("transp").style.display="block";
			//newdiv=$("transp3");
			//newdiv.style.display="block";
			//newdiv.style.visibility="visible";

			switch(mode){
			case "level":{
				newdiv=createElement("div",{"style":"height:400px;overflow:auto;color:black;"},infoPanelInner);
				//todayStr=getDateStr(now,2,false);
				if(levelLog[serverTodayStr]==undefined){ levelLog[serverTodayStr]=[0,null,0,0,0]; }
				levelLog[serverTodayStr][0]=parseInt($("pkt").innerHTML.replace(/\D/g,""),10);
				var totalumsatz=[0,0,[0,0]];

				newtable=createElement("table",{"border":"1"},newdiv); //scrollTable
				newthead=createElement("thead",{},newtable);
				newtbody=createElement("tbody",{"class":"hoverRowBgCc9","style":"height:348px;"},newtable);
				newtfoot=createElement("tfoot",{},newtable);

				newtr=createElement("tr",{"class":"borderBottom2"},newthead);
				createElement("th",{"class":"link","sortdir":"Asc","style":"border-right:2px solid black;"},newtr,texte["tag"]);
				createElement("th",{"class":"link","sortdir":"Asc"},newtr,texte["punkte"]);
				createElement("th",{"class":"link","sortdir":"Asc"},newtr,"+");
				createElement("th",{"class":"link","sortdir":"Asc","style":"border-right:2px solid black;"},newtr,texte["platz"]);
				createElement("th",{"class":"link","sortdir":"Asc"},newtr,texte["markt"]);
				createElement("th",{"class":"link","sortdir":"Asc"},newtr,texte["vertrag"]);
				createElement("th",{"class":"link","sortdir":"Asc"},newtr,unsafeWindow.customerarecalled.replace(/%FARMI%/,""));
				new SortableTable(newtr);

				var firstDay=null;
				var secondDay=null;
				var prevDay=null;
				for(var v in levelLog){
					if(!levelLog.hasOwnProperty(v)){ continue; }
					if(firstDay==null){
						firstDay=v;
					}else if(secondDay==null){
						secondDay=v;
					}
					if(v.match(/^\d+\.\d+$/)){
						var day=("1."+v).split(/\./);
						var days=(new Date(parseInt(day[2],10),parseInt(day[2],10),0)).getDate();
					}else{
						var day=v.split(/\./);
						var days=1;
						if(levelLog[v.replace(/^(\d+\.)/,"")]!=undefined){ days=0; } // doubling with month-entry
					}

					newtr=createElement("tr",{"align":"right"},newtbody);

					// Sundays
					if ((new Date(parseInt(day[2],10),parseInt(day[1],10)-1,parseInt(day[0],10)).getDay())==0){
						newtr.setAttribute("class","borderBottom2");
					}

					createElement("td",{"value":levelLog[v][0],"style":"text-align:right;border-right:2px solid black;"},newtr,v==todayStr?texte["day0"]:v);
					createElement("td",{"value":levelLog[v][0]},newtr,numberFormat(levelLog[v][0]));
					if(prevDay==null){
						createElement("td",{"value":0},newtr);
					}else{
						createElement("td",{"value":(levelLog[v][0]-levelLog[prevDay][0])},newtr,numberFormat(levelLog[v][0]-levelLog[prevDay][0]));
					}
					createElement("td",{"value":levelLog[v][1],"style":"border-right:2px solid black;"},newtr,levelLog[v][1]?numberFormat(levelLog[v][1]):"");
					for(var w=0;w<=1;w++){
						createElement("td",{"value":levelLog[v][w+2]},newtr,numberFormat(levelLog[v][w+2]));
						totalumsatz[w] += levelLog[v][w+2];
					}
					if(levelLog[v][4]>0){
						createElement("td",{"value":levelLog[v][4]},newtr,numberFormat(levelLog[v][4]));
						totalumsatz[2][0] += days;
						totalumsatz[2][1] += levelLog[v][4];
					}else{
						createElement("td",{"value":0},newtr,"-");
					}
					prevDay=v;
				}
				newtbody.scrollTop=newtbody.scrollHeight;
				//if (newdiv.scrollTop ==0) newdiv.scrollTop=(newdiv.scrollHeight < newdiv.clientHeight)?0:newdiv.scrollHeight - newdiv.clientHeight;

				newtr=createElement("tr",{"class":"borderTop2","align":"right"},newtfoot);
				createElement("td",{"style":"border-right:2px solid black;"},newtr,sign_average);
				createElement("td",{},newtr);
				if(secondDay){
					var daycount=1+Math.round((now-getTime(secondDay))/86400);
					createElement("td",{},newtr,numberFormat((levelLog[prevDay][0]-levelLog[firstDay][0])/daycount));
				}else{
					createElement("td",{},newtr);
				}
				createElement("td",{"style":"border-right:2px solid black;"},newtr);
				var daycount=1+Math.round((now-getTime(firstDay))/86400);
				for(var w=0;w<2;w++){
					createElement("td",{},newtr,numberFormat(totalumsatz[w]/daycount));
				}
				createElement("td",{},newtr,numberFormat(totalumsatz[2][1]/totalumsatz[2][0]));

				newdiv=createElement("div",{"style":"height:106px;margin-top:10px;overflow:auto;color:black;"},infoPanelInner);
				for(var w=0;w<prodNameSort.length;w++){
					var v=prodNameSort[w];
					if(0<prodMinRack[v]){
						if (prodBestand[v]==0){
							newdiv1=createElement("div",{"class":"link hoverBgCc9","prod":v,"style":"line-height:16px;"},newdiv);
							newdiv1.addEventListener("mouseover",function(event){ showGoToMarketToolTip(event,this.getAttribute("prod")); },false);
							newdiv1.addEventListener("click",function(){ showMarket(this.getAttribute("prod")); },false);
							produktPic(v,newdiv1);
							createElement("span",{"style":"font-weight:bold;"},newdiv1,texte["lagerFehlt"].replace(/%1%/,prodName[v]));
						}else if(prodBestand[v]<prodMinRack[v]){
							newdiv1=createElement("div",{"class":"link hoverBgCc9","prod":v,"style":"line-height:16px;"},newdiv);
							newdiv1.addEventListener("mouseover",function(event){ showGoToMarketToolTip(event,this.getAttribute("prod")); },false);
							newdiv1.addEventListener("click",function(){ showMarket(this.getAttribute("prod")); },false);
							produktPic(v,newdiv1);
							createElement("span",{"style":"font-weight:bold;"},newdiv1,texte["lagerNiedrig"].replace(/%1%/,prodName[v])+" ("+numberFormat(prodBestand[v])+")");
						}
					}
				}
			}
			break;
			case "options":{
				//$("infoPanelInner").style.width="600px";
				createElement("div",{"id":"infoPanelT","align":"center","style":"line-height:30px;"},infoPanelInner);
				newdiv=createElement("div",{"id":"infoPanelL","style":"position:absolute;top:30px;left:0;width:105px;overflow:auto;height:485px;border-right:2px solid #685338;"},infoPanelInner);
				newdiv.addEventListener("click",function(event){
					if((event.target.parentNode==this)&&(event.target.getAttribute("class").match(/(\s|^)link(\s|$)/))){
						for(var v=0;v<this.childElementCount;v++){
							this.children[v].style.backgroundColor=(event.target==this.children[v])?"lightblue":"";
						}
					}
				},false);
				createElement("div",{"style":"padding-top:5px;border-bottom:1px solid #685338;font-weight:bold;"},$("infoPanelL"),texte["berater"]);
				createElement("div",{"id":"infoPanelR","style":"position:absolute;top:30px;left:110px;width:480px;overflow:auto;height:485px;"},infoPanelInner);

				newdiv=createElement("div",{"class":"link hoverBgLightbrown","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),texte["optionen"]);
				newdiv.addEventListener("click",function(){
					var newdiv=$("infoPanelT");
					newdiv.innerHTML="<span><b>"+texte["optionen"]+"</b>&nbsp;-&nbsp;"+texte["berater"]+"&nbsp;"+VERSION+"</span>";
					if(VERSION!=updateCheck[1]){
						newdiv=createElement("span",{"class":"link","style":"margin-left:4px;"},newdiv,"(&rarr;"+updateCheck[1]+")");
						newdiv.addEventListener("click",function(){
							location.href="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
						},false);
					}
					$("infoPanelR").innerHTML="";
					var newtable=createElement("table",{"style":"width:100%;","border":"1","class":"hoverRowBgCc9"},$("infoPanelR"));

					newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
					newtd=createElement("th",{"colspan":"3"},newtr,texte["farm"]);

					var newtr=createElement("tr",{},newtable);
					var newtd=createElement("td",{"align":"center"},newtr);
					var newinput=createElement("input",{"id":"inputvalGiess","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valGiess",true)},newtd);
					newinput.addEventListener("click",function(){
						valGiess=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valGiess", valGiess);
					},false);
					createElement("td",{},newtr,texte["valGiess"][0]);
					createElement("td",{},newtr,texte["valGiess"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalGiessAnnehm","type":"checkbox","class":"link","checked":valGiessAnnehm},newtd);
					newinput.addEventListener("click",function(){
						valGiessAnnehm=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valGiessAnnehm", valGiessAnnehm);
					},false);
					createElement("td",{},newtr,texte["valGiessAnnehm"][0]);
					createElement("td",{},newtr,texte["valGiessAnnehm"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalErnte","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valErnte",true)},newtd);
					newinput.addEventListener("click",function(){
						valErnte=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valErnte", valErnte);
					},false);
					createElement("td",{},newtr,texte["valErnte"][0]);
					createElement("td",{},newtr,texte["valErnte"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalGiessNotw","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valGiessNotw",true)},newtd);
					newinput.addEventListener("click",function(){
						valGiessNotw=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valGiessNotw", valGiessNotw);
					},false);
					createElement("td",{},newtr,texte["valGiessNotw"][0]);
					createElement("td",{},newtr,texte["valGiessNotw"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalErnteMsg","type":"checkbox","class":"link","checked":valErnteMsg},newtd);
					newinput.addEventListener("click",function(){
						valErnteMsg=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valErnteMsg", valErnteMsg);
					},false);
					createElement("td",{},newtr,texte["valErnteMsg"][0]);
					createElement("td",{},newtr,texte["valErnteMsg"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalLeereFelderLimit","value":valLeereFelderLimit,"class":"text","maxlength":"2","size":"2px","style":"background-color:transparent;text-align:center;"},newtd);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("keyup",function(){
						valLeereFelderLimit=parseInt(this.value,10);
						if (isNaN(valLeereFelderLimit)){
							this.value="";
						}else{
							this.value=valLeereFelderLimit;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valLeereFelderLimit", valLeereFelderLimit);
							for(var v=1;v<19;v++){ processZoneFieldData(v); }
						}
					},false);
					createElement("td",{},newtr,texte["valLeereFelderLimit"][0]);
					createElement("td",{},newtr,texte["valLeereFelderLimit"][1]);

					newtr=createElement("tr",{},newtable);
					createElement("td",{"align":"center"},newtr);
					createElement("td",{},newtr,texte["valMoveAnimals"][0]);
					newtd=createElement("td",{},newtr,texte["valMoveAnimals"][1]);
					for(var v=0;v<animalMove.length;v++){ if(animalMove[v]){
						newspan=createElement("span",{"style":"display:inline-block;margin-right:15px;"},newtd);
						produktPic(BUILDING2PRODUCT[v],newspan);
						newinput=createElement("input",{"id":"inputvalMoveAnimals"+v,"type":"checkbox","class":"link","checked":valMoveAnimals[v]},newspan);
						newinput.addEventListener("click",function(){
							valMoveAnimals[this.id.replace("inputvalMoveAnimals","")]=this.checked;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valMoveAnimals", implode(valMoveAnimals));
						},false);
					}}

					if(unsafeWindow.formulas){
						newtr=createElement("tr",{},newtable);
						newtd=createElement("td",{"align":"center"},newtr);
						newinput=createElement("input",{"id":"inputvalGlobaltimeWindmill","type":"checkbox","class":"link","checked":valGlobaltimeWindmill},newtd);
						newinput.addEventListener("click",function(){
							valGlobaltimeWindmill=this.checked;
							unsafeWindow.GMvalGlobaltimeWindmill=valGlobaltimeWindmill;
							GM_setValue2(LNG+"_"+SERVER+"_valGlobaltimeWindmill", valGlobaltimeWindmill);
						},false);
						createElement("td",{},newtr,texte["valGlobaltimeWindmill"][0]);
						createElement("td",{},newtr,texte["valGlobaltimeWindmill"][1]);
					}

					if(unsafeWindow.unlock!=undefined){
						for(var i=0;i<timerBuildingNames.length;i++){
							BName = timerBuildingNames[i].capitalize();
							newtr=createElement("tr",{},newtable);
							newtd=createElement("td",{"align":"center"},newtr);
							newinput=createElement("input",{"id":"inputvalGlobaltime"+BName,"type":"checkbox","class":"link","checked":eval("valGlobaltime"+BName)},newtd);
							newinput.addEventListener("click",function(){
								var BName=this.id.replace("input","");
								eval("unsafeWindow.GMvalGlobaltime"+BName+"=(valGlobaltime"+BName+"=this.checked)");
								GM_setValue2(LNG+"_"+SERVER+"valGlobaltime"+BName, eval("valGlobaltime"+BName));
							},false);
							createElement("td",{},newtr,texte["valGlobaltime"+BName][0]);
							createElement("td",{},newtr,texte["valGlobaltime"+BName][1]);
						}
					}

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalGlobaltimeShowCroppedZone","type":"checkbox","class":"link","checked":valGlobaltimeShowCroppedZone},newtd);
					newinput.addEventListener("click",function(){
						valGlobaltimeShowCroppedZone=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_valGlobaltimeShowCroppedZone", valGlobaltimeShowCroppedZone);
					},false);
					createElement("td",{},newtr,texte["valGlobaltimeShowCroppedZone"][0]);
					createElement("td",{},newtr,texte["valGlobaltimeShowCroppedZone"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalContractLogAmount","value":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valContractLogAmount",200),"class":"text","maxlength":"5","size":"5px","style":"background-color:transparent;text-align:center;"},newtd);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("keyup",function(){
						var valContractLogAmount=parseInt(this.value,10);
						if (isNaN(valContractLogAmount)){
							this.value="";
						}else{
							this.value=valContractLogAmount;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valContractLogAmount", valContractLogAmount);
						}
					},false);
					createElement("td",{},newtr,texte["valContractLogAmount"][0]);
					createElement("td",{},newtr,texte["valContractLogAmount"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalSpoilerZoneUpdate","type":"checkbox","class":"link","checked":valSpoilerZoneUpdate},newtd);
					newinput.addEventListener("click",function(){
						valSpoilerZoneUpdate=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_valSpoilerZoneUpdate", valSpoilerZoneUpdate);
					},false);
					createElement("td",{},newtr,texte["valSpoilerZoneUpdate"][0]);
					createElement("td",{},newtr,texte["valSpoilerZoneUpdate"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newdiv=createElement("div",{"style":"white-space:nowrap;"},newtd);
					newinput=createElement("input",{"id":"inputvalFarmiLimits0","value":valFarmiLimits[0],"class":"text","maxlength":"3","size":"3px","style":"background-color:transparent;text-align:center;"},newdiv);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("change",function(){
						var help=parseInt(this.value,10);
						if (isNaN(help)){
							this.value="";
						}else{
							help=Math.max(0,Math.min(999,Math.min(help,valFarmiLimits[1])));
							valFarmiLimits[0]=help;
							doFarmis();
							this.value=help;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiLimits", implode(valFarmiLimits));
							unsafeWindow.GMvalFarmiLimits=valFarmiLimits.clone();
						}
					},false);
					createElement("span",{},newdiv,"%");
					newdiv=createElement("div",{"style":"white-space:nowrap;"},newtd);
					newinput=createElement("input",{"id":"inputvalFarmiLimits1","value":valFarmiLimits[1],"class":"text","maxlength":"3","size":"3px","style":"background-color:transparent;text-align:center;"},newdiv);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("change",function(){
						var help=parseInt(this.value,10);
						if (isNaN(help)){
							this.value="";
						}else{
							help=Math.max(0,Math.min(999,Math.max(help,valFarmiLimits[0])));
							valFarmiLimits[1]=help;
							doFarmis();
							this.value=help;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiLimits", implode(valFarmiLimits));
							unsafeWindow.GMvalFarmiLimits=valFarmiLimits.clone();
						}
					},false);
					createElement("span",{},newdiv,"%");
					createElement("td",{},newtr,texte["valFarmiLimits"][0]);
					createElement("td",{},newtr,texte["valFarmiLimits"][1]+" ("+texte["default"]+":&nbsp;90,100)");

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalFarmiMiniInfo","type":"checkbox","class":"link","checked":valFarmiMiniInfo},newtd);
					newinput.addEventListener("click",function(){
						valFarmiMiniInfo=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiMiniInfo", valFarmiMiniInfo);
						doFarmis();
					},false);
					createElement("td",{},newtr,texte["valFarmiMiniInfo"][0]);
					createElement("td",{},newtr,texte["valFarmiMiniInfo"][1]);

					// *****
					newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
					newtd=createElement("th",{"colspan":"3"},newtr,texte["minRackamount"]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalMinRackMan","type":"checkbox","class":"link","checked":valMinRackMan},newtd);
					newinput.addEventListener("click",function(){
						valMinRackMan=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackMan",valMinRackMan);
						var cand=$("infoPanelR").getElementsByClassName("minRackConfig");
						if(valMinRackMan){
							for(var v=0;v<cand.length;v++){
								cand[v].disabled=true;
								cand[v].parentNode.parentNode.style.opacity=0.6;
							}
						}else{
							for(var v=0;v<cand.length;v++){
								cand[v].disabled=false;
								cand[v].parentNode.parentNode.style.opacity=1;
							}
							calcProdMinRackInit();
						}
						cand=null;
					},false);
					createElement("td",{},newtr,texte["valMinRackMan"][0]);
					newtd=createElement("td",{"class":"link"},newtr,texte["valMinRackMan"][1]);
					newtd.addEventListener("click",function(){
						buildInfoPanel("preise2");
					},false);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalMinRackV","class":"text minRackConfig","value":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackV",200),"maxlength":"4","size":"5px","style":"background-color:transparent;text-align:center;"},newtd);
					if(valMinRackMan){
						newinput.disabled=true;
						newtr.style.opacity=0.6;
					}
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("keyup",function(){
						var help=parseInt(this.value,10);
						if (isNaN(help)){
							this.value="";
						}else{
							this.value=help;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackV", help);
							calcProdMinRackInit();
						}
					},false);
					createElement("td",{},newtr,texte["valMinRackV"][0]);
					createElement("td",{},newtr,texte["valMinRackV"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalMinRackP","class":"text minRackConfig","type":"checkbox","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackP",false)},newtd);
					if(valMinRackMan){
						newinput.disabled=true;
						newtr.style.opacity=0.6;
					}
					newinput.addEventListener("click",function(){
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackP",this.checked);
						calcProdMinRackInit();
					},false);
					createElement("td",{},newtr,texte["valMinRackP"][0]);
					createElement("td",{},newtr,texte["valMinRackP"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalMinRackE","class":"minRackConfig","value":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackE",50),"maxlength":"4","size":"5px","style":"background-color:transparent;text-align:center;"},newtd);
					if(valMinRackMan){
						newinput.disabled=true;
						newtr.style.opacity=0.6;
					}
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("keyup",function(){
						var help=parseInt(this.value,10);
						if (isNaN(help)){
							this.value="";
						}else{
							this.value=help;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackE", help);
							calcProdMinRackInit();
						}
					},false);
					createElement("td",{},newtr,texte["valMinRackE"][0]);
					createElement("td",{},newtr,texte["valMinRackE"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalMinRackGrowing","type":"checkbox","class":"link","checked":valMinRackGrowing},newtd);
					newinput.addEventListener("click",function(){
						valMinRackGrowing=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackGrowing",valMinRackGrowing);
						calcProdMinRack();
					},false);
					createElement("td",{},newtr,texte["valMinRackGrowing"][0]);
					createElement("td",{},newtr,texte["valMinRackGrowing"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalMinRackQuest","type":"checkbox","class":"link","checked":valMinRackQuest},newtd);
					newinput.addEventListener("click",function(){
						valMinRackQuest=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackQuest",valMinRackQuest);
						calcProdMinRack();
					},false);
					createElement("td",{},newtr,texte["valMinRackQuest"][0]);
					createElement("td",{},newtr,texte["valMinRackQuest"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalMinRackFarmis","type":"checkbox","class":"link","checked":valMinRackFarmis},newtd);
					newinput.addEventListener("click",function(){
						valMinRackFarmis=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valMinRackFarmis",valMinRackFarmis);
						calcProdMinRack();
					},false);
					createElement("td",{},newtr,texte["valMinRackFarmis"][0]);
					createElement("td",{},newtr,texte["valMinRackFarmis"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputprotectMinRack","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_protectMinRack",false)},newtd);
					newinput.addEventListener("click",function(){
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_protectMinRack",this.checked);
					},false);
					createElement("td",{},newtr,texte["protectMinRack"][0]);
					createElement("td",{},newtr,texte["protectMinRack"][1]);

					// *****
					newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
					newtd=createElement("th",{"colspan":"3"},newtr,texte["markt"]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalKauflimit00","value":valKauflimit[0][0],"class":"text","maxlength":"3","size":"2px","style":"background-color:transparent;text-align:center;"},newtd);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("keyup",function(){
						var help=parseInt(this.value,10);
						if (isNaN(help)){
							this.value="";
						}else{
							valKauflimit[0][0]=help;
							this.value=valKauflimit[0][0];
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valKauflimit",implode(valKauflimit));
						}
					},false);
					createElement("span",{},newtd,"%");
					createElement("td",{},newtr,texte["valKauflimitDown"][0]);
					newtd=createElement("td",{},newtr,texte["valKauflimitDown"][1]);
					newinput=createElement("input",{"id":"inputvalKauflimit01","value":valKauflimit[0][1],"class":"text","maxlength":"6","size":"10px","style":"background-color:#"+valKauflimit[0][1]+";color:#F0FFEF;"},newtd);
					newinput.addEventListener("keyup",function(){
						this.value=this.value.replace(/[^0-9a-f]/ig,"");
						this.style.backgroundColor="#"+this.value;
					},false);
					newinput.addEventListener("change",function(){
						var color=this.value;
						if(!color.match(/^([0-9a-f]{3}){1,2}$/i)){
							color="990000";
							this.value=color;
						}
						this.style.backgroundColor="#"+this.value;
						valKauflimit[0][1]=this.value;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valKauflimit",implode(valKauflimit));
					},false);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalKauflimit1","value":valKauflimit[1],"class":"text","maxlength":"3","size":"2px","style":"background-color:transparent;text-align:center;"},newtd);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("keyup",function(){
						var help=parseInt(this.value,10);
						if (isNaN(help)){
							this.value="";
						}else{
							if(help<0){ help*=-1; }
							valKauflimit[1]=help;
							this.value=valKauflimit[1];
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valKauflimit",implode(valKauflimit));
						}
					},false);
					createElement("span",{},newtd,"%");
					createElement("td",{},newtr,texte["valKauflimit"][0]);
					createElement("td",{},newtr,texte["valKauflimit"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalKauflimitNPC","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valKauflimitNPC",true)},newtd);
					newinput.addEventListener("click",function(){
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valKauflimitNPC",this.checked);
					},false);
					createElement("td",{},newtr,texte["valKauflimitNPC"][0]);
					createElement("td",{},newtr,texte["valKauflimitNPC"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalVerkaufLimitDown","value":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valVerkaufLimitDown",95),"class":"text","maxlength":"3","size":"2px","style":"background-color:transparent;text-align:center;"},newtd);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("change",function(){
						var valVerkaufLimitDown=parseInt(this.value,10);
						var valVerkaufLimitUp=parseInt($("inputvalVerkaufLimitUp").value,10);
						valVerkaufLimitDown=Math.min(valVerkaufLimitDown,valVerkaufLimitUp);
						if (isNaN(valVerkaufLimitDown)){
							this.value="";
						}else{
							this.value=valVerkaufLimitDown;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valVerkaufLimitDown", valVerkaufLimitDown);
						}
					},false);
					createElement("span",{},newtd,"%");
					newinput=createElement("input",{"id":"inputvalVerkaufLimitUp","value":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valVerkaufLimitUp",130),"class":"text","maxlength":"3","size":"2px","style":"background-color:transparent;text-align:center;"},newtd);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("change",function(){
						var valVerkaufLimitDown=parseInt($("inputvalVerkaufLimitDown").value,10);
						var valVerkaufLimitUp=parseInt(this.value,10);
						valVerkaufLimitUp=Math.max(valVerkaufLimitDown,valVerkaufLimitUp);
						if (isNaN(valVerkaufLimitUp)){
							this.value="";
						}else{
							this.value=valVerkaufLimitUp;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valVerkaufLimitUp", valVerkaufLimitUp);
						}
					},false);
					createElement("span",{},newtd,"%");
					createElement("td",{},newtr,texte["valVerkaufLimit"][0]);
					createElement("td",{},newtr,texte["valVerkaufLimit"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalJoinPreise","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valJoinPreise",false)},newtd);
					newinput.addEventListener("click",function(){ GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valJoinPreise", this.checked); },false);
					createElement("td",{},newtr,texte["valJoinPreise"][0]);
					createElement("td",{},newtr,texte["valJoinPreise"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalQuicklinks","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valQuicklinks",true)},newtd);
					newinput.addEventListener("click",function(){GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valQuicklinks", this.checked);},false);
					createElement("td",{},newtr,texte["valQuicklinks"][0]);
					createElement("td",{},newtr,texte["valQuicklinks"][1]);

					function drawDivHighlightUser(name,color,parent){
						newdiv=createElement("div",{},parent);
						newinput=createElement("input",{"value":name,"class":"text","maxlength":"20","size":"25px","style":"background-color:transparent;"},newdiv);
						newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
						newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
						newinput=createElement("input",{"value":color,"class":"text","maxlength":"6","size":"10px","style":"background-color:#"+color+";color:#F0FFEF;"},newdiv);
						newinput.addEventListener("keyup",function(){
							this.value=this.value.replace(/[^0-9a-f]/ig,"");
							this.style.backgroundColor="#"+this.value;
						},false);
						newdiv.addEventListener("change",function(){
							var tableCell=this.parentNode;
							var candinput=tableCell.getElementsByTagName("input");
							var highlightUser=new Object();
							for(var v=0;v<candinput.length;v+=2){
								var name=candinput[v].value;
								if(highlightUser[name]){
									// remove duplicate
									removeElement(candinput[v].parentNode);
									v-=2;
								}else{
									var color=candinput[v+1].value;
									if(!color.match(/^([0-9a-f]{3}){1,2}$/i)){
										color="20b2aa";
										candinput[v+1].value=color;
										candinput[v+1].style.backgroundColor="#"+color;
									}
									highlightUser[name]=color;
								}
							}
							if(highlightUser[""]==undefined){
								drawDivHighlightUser("","20b2aa",tableCell);
							}else{
								delete highlightUser[""];
							}
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_highlight",implode(highlightUser));
							candinput=null;tableCell=null;
						},false);
					}
					var highlightUser=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_highlight","{}"));
					highlightUser[""]="20b2aa";
					newtr=createElement("tr",{},newtable);
					createElement("td",{"align":"center"},newtr);
					createElement("td",{},newtr,texte["highlightUser"]);
					newtd=createElement("td",{},newtr);
					for(var name in highlightUser){
						if(!highlightUser.hasOwnProperty(name)){ continue; }
						drawDivHighlightUser(name,highlightUser[name],newtd);
					}

					newtr=createElement("tr",{},newtable);
					createElement("td",{"align":"center"},newtr);
					createElement("td",{},newtr,texte["highlightProducts"]);
					newtd=createElement("td",{},newtr);
					newdiv=createElement("div",{},newtd);
					newinput=createElement("input",{"type":"checkbox","class":"link","checked":highlightProducts[2]},newdiv);
					newinput.addEventListener("click",function(){
						highlightProducts[2]=this.checked;
						if(QUESTS[questNr] && highlightProducts[2]){
							highlightProducts[0]=QUESTS[questNr][0][0]?-1:QUESTS[questNr][0][0][0];
							highlightProducts[1]=QUESTS[questNr][0][1]?-1:QUESTS[questNr][0][1][0];
						}
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_highlightProducts",implode(highlightProducts));
						$("highlightProducts0").disabled=highlightProducts[2];
						$("highlightProducts1").disabled=highlightProducts[2];
						$("highlightProducts0").value=highlightProducts[0];
						$("highlightProducts1").value=highlightProducts[1];
					},false);
					createElement("span",{},newdiv,texte["useQuestProducts"]);
					for(var i=0;i<2;i++){
						newinput=createElement("select",{"id":"highlightProducts"+i,"class":"link2"},newtd);
						if(highlightProducts[2]){ newinput.disabled=true; }
						createElement("option",{"value":"-1"},newinput,"--");
						for(var v=0;v<prodNameSort.length;v++){
							createElement("option",{"value":prodNameSort[v]},newinput,prodName[prodNameSort[v]]);
						}
						newinput.value=highlightProducts[i];
						newinput.addEventListener("change",function(){
							highlightProducts[this.id.replace("highlightProducts","")]=parseInt(this.value,10);
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_highlightProducts",implode(highlightProducts));
						},false);
					}

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalNimmBeob","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_valNimmBeob",false)},newtd);
					newinput.addEventListener("click",function(){ GM_setValue2(LNG+"_"+SERVER+"_valNimmBeob",this.checked); },false);
					createElement("td",{},newtr,texte["valNimmBeob"][0]);
					createElement("td",{},newtr,texte["valNimmBeob"][1]);

					// *****
					newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
					newtd=createElement("th",{"colspan":"3"},newtr,texte["messages"]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalNachr","value":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valPrivNachr",100),"class":"text","maxlength":"5","size":"5px","style":"background-color:transparent;text-align:center;"},newtd);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("keyup",function(){
						var valPrivNachr=parseInt(this.value,10);
						if (isNaN(valPrivNachr)){
							this.value="";
						}else{
							this.value=valPrivNachr;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valPrivNachr", valPrivNachr);
						}
					},false);
					createElement("td",{},newtr,texte["valPrivNachr"][0]);
					createElement("td",{},newtr,texte["valPrivNachr"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalNachr","value":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valNachr",100),"class":"text","maxlength":"5","size":"5px","style":"background-color:transparent;text-align:center;"},newtd);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput.addEventListener("keyup",function(){
						var valNachr=parseInt(this.value,10);
						if (isNaN(valNachr)){
							this.value="";
						}else{
							this.value=valNachr;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valNachr", valNachr);
						}
					},false);
					createElement("td",{},newtr,texte["valNachr"][0]);
					createElement("td",{},newtr,texte["valNachr"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalMessageRe","type":"checkbox","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMessageRe",true),"class":"link"},newtd);
					newinput.addEventListener("click",function(){ GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valMessageRe", this.checked); },false);
					createElement("td",{},newtr,texte["valMessageRe"][0]);
					createElement("td",{},newtr,texte["valMessageRe"][1]);

					// *****
					newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
					newtd=createElement("th",{"colspan":"3"},newtr,texte["allgemein"]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalAutoLogin","type":"checkbox","class":"link","checked":GM_getValue("valAutoLogin",false)},newtd);
					newinput.addEventListener("click",function(){GM_setValue2("valAutoLogin", this.checked);},false);
					createElement("td",{},newtr,texte["valAutoLogin"][0]);
					createElement("td",{},newtr,texte["valAutoLogin"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalUpdate","type":"checkbox","class":"link","checked":GM_getValue("valUpdate",true)},newtd);
					newinput.addEventListener("click",function(){GM_setValue2("valUpdate", this.checked);},false);
					createElement("td",{},newtr,texte["valUpdate"][0]);
					createElement("td",{},newtr,texte["valUpdate"][1]);

					if (STAT_SERVER[LNG]){
						newtr=createElement("tr",{},newtable);
						newtd=createElement("td",{"align":"center"},newtr);
						newinput=createElement("input",{"id":"inputvalStatistik","type":"checkbox","class":"link","checked":valStatistik},newtd);
						newinput.addEventListener("click",function(){
							valStatistik=this.checked;
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valStatistik", valStatistik);
						},false);
						createElement("td",{},newtr,texte["valStatistik"][0]);
						createElement("td",{},newtr,texte["valStatistik"][1]);
					}

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{},newtr);
					createElement("td",{},newtr,texte["valServerTimeOffset"][0]);
					newtd=createElement("td",{},newtr);
					newinput=createElement("button",{"type":"button","class":"link2"},newtd,"-");
					newinput.addEventListener("click",function(){
						valServerTimeOffset=Math.max(-86400,valServerTimeOffset-3600);
						GM_setValue(LNG+"_valServerTimeOffset",valServerTimeOffset);
						serverNow=now+valServerTimeOffset;
						this.parentNode.children[1].innerHTML=(valServerTimeOffset<0?"":"+")+Math.round(valServerTimeOffset/3600)+"h";
						this.parentNode.children[3].innerHTML=getFormattedDateStr(serverNow)+"&nbsp;"+getDaytimeStr(serverNow);
					},false);
					createElement("span",{"style":"margin-right:5px;"},newtd,(valServerTimeOffset<0?"":"+")+Math.round(valServerTimeOffset/3600)+"h");
					newinput=createElement("button",{"type":"button","class":"link2"},newtd,"+");
					newinput.addEventListener("click",function(){
						valServerTimeOffset=Math.min(86400,valServerTimeOffset+3600);
						GM_setValue(LNG+"_valServerTimeOffset",valServerTimeOffset);
						serverNow=now+valServerTimeOffset;
						this.parentNode.children[1].innerHTML=(valServerTimeOffset<0?"":"+")+Math.round(valServerTimeOffset/3600)+"h";
						this.parentNode.children[3].innerHTML=getFormattedDateStr(serverNow)+"&nbsp;"+getDaytimeStr(serverNow);
					},false);
					createElement("span",{"style":"margin-left:10px;"},newtd,getFormattedDateStr(serverNow)+"&nbsp;"+getDaytimeStr(serverNow));

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalGamecursor","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valGamecursor",true)},newtd);
					newinput.addEventListener("click",function(){GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valGamecursor", this.checked);},false);
					createElement("td",{},newtr,texte["valGamecursor"][0]);
					createElement("td",{},newtr,texte["valGamecursor"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalDrag","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valDrag",false)},newtd);
					newinput.addEventListener("click",function(){GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valDrag", this.checked);},false);
					createElement("td",{},newtr,texte["valDrag"][0]);
					createElement("td",{},newtr,texte["valDrag"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalDrag","type":"checkbox","class":"link","checked":valClickErrorbox},newtd);
					newinput.addEventListener("click",function(){
						valClickErrorbox=this.checked;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valClickErrorbox", valClickErrorbox);
					},false);
					createElement("td",{},newtr,texte["valClickErrorbox"][0]);
					createElement("td",{},newtr,texte["valClickErrorbox"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputvalHotkey","type":"checkbox","class":"link","checked":GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valHotkey",true)},newtd);
					newinput.addEventListener("click",function(){GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valHotkey", this.checked);},false);
					createElement("td",{},newtr,texte["valHotkeys"][0]);
					createElement("td",{},newtr,texte["valHotkeys"][1]);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"colspan":"2","align":"center"},newtr);
					newinput=createElement("button",{"type":"button","class":"link2"},newtd,texte["cacheReset"][0]);
					newinput.addEventListener("click",function(){
						alert2(texte["cacheReset"][1],texte["yes"],texte["no"],function(){
							for(var i=1000; i >=0; --i){unsafeWindow.clearInterval(i);}
							window.setTimeout(function(){
								var protect={"kauf":1,"farmiLog":1,"vertraegeIn":1,"vertraegeOut":1,"levelLog":1,"nachrichten":1};
								var help=GM_listValues();
								for(var v=help.length-1;v>-1;v--){
								if(help[v].match(LNG+"_"+SERVER+"_"+USERNAME+"_")){
									var curr=help[v].replace(LNG+"_"+SERVER+"_"+USERNAME+"_","");
									if(!protect[curr]){ GM_deleteValue(help[v]); }
								}
								}
								top.location.href=top.location.href;
							},500);
						});
					},false);
					createElement("td",{},newtr,texte["cacheReset"][1]);

					// *****
					newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
					newtd=createElement("th",{"colspan":"3"},newtr,"Developing");

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputDevmode","type":"checkbox","class":"link","checked":DEVMODE},newtd);
					newinput.addEventListener("click",function(){GM_setValue2("devmode",DEVMODE=this.checked);},false);
					createElement("td",{},newtr,"Developer Mode");
					createElement("td",{},newtr);

					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"align":"center"},newtr);
					newinput=createElement("input",{"id":"inputDevmodeEvents","type":"checkbox","class":"link","checked":DEVMODE_EVENTS},newtd);
					newinput.addEventListener("click",function(){GM_setValue2("devmode_events",DEVMODE_EVENTS=this.checked);},false);
					createElement("td",{},newtr,"Developer Mode");
					createElement("td",{},newtr,"Show events (reload page)");

					 GM_getValue("devmode",false);
					newtable=null;newtr=null;newtd=null;newdiv=null;newinput=null;
					raiseEvent("gameInfoPanelOptions");
				},false);
				click(newdiv);

				// Accounts
				newdiv=createElement("div",{"class":"link hoverBgLightbrown","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),texte["accounts"]);
				newdiv.addEventListener("click",function(){
					var newdiv=$("infoPanelT");
					newdiv.innerHTML="<span><b>"+texte["accounts"]+"</b>&nbsp;-&nbsp;"+texte["berater"]+"&nbsp;"+VERSION+"</span>";
					if(VERSION!=updateCheck[1]){
						newdiv=createElement("span",{"class":"link","style":"margin-left:4px;"},newdiv,"(&rarr;"+updateCheck[1]+")");
						newdiv.addEventListener("click",function(){
							location.href="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
						},false);
					}
					$("infoPanelR").innerHTML="";
					//createElement("div",{"align":"center","style":"line-height:30px;font-weight:bold;"},$("infoPanelR"),texte["accounts"]);
					createElement("table",{"id":"tableAutologin","align":"center"},$("infoPanelR"));
					function buildLoginTable(showPW){
						var logindata=new Array();
						try{ logindata=explode(GM_getValue("logindata","[]")); }catch(err){}

						function saveLogin(){
							GM_setValue2("logindata",implode(logindata));
						}
						var newtable=createElement("table",{"align":"center"});
						$("tableAutologin").parentNode.replaceChild(newtable,$("tableAutologin"));
						newtable.id="tableAutologin";
						newtable.addEventListener("change",saveLogin,false);
						var newtr=createElement("tr",{},newtable);
						createElement("th",{},newtr,texte["server"]);
						createElement("th",{},newtr,texte["name"]);
						createElement("th",{},newtr,texte["passwort"]);
						var newtd,newinput,newselect,newdiv;
						for(var v=0;v<logindata.length;v++){
							newtr=createElement("tr",{},newtable);
							newtd=createElement("td",{},newtr);
							newinput=createElement("input",{"id":"loginActive"+v,"type":"checkbox","class":"link","checked":logindata[v][4]},newtd);
							newinput.addEventListener("mouseover",function(event){ showToolTip(event,texte["accountAktiv"]); },false);
							newinput.addEventListener("change",function(){ logindata[this.id.replace("loginActive","")][4]=this.checked; },false);
							newinput=createElement("input",{"id":"loginServer"+v,"class":"text","style":"width:20px","maxlength":"2"},newtd);
							if (isNaN(logindata[v][1])){ logindata[v][1]="0";}
							if (logindata[v][1]!="0"){ newinput.value=logindata[v][1]; }
							newinput.addEventListener("change",function(){
								var readin=parseInt(this.value,10);
								if (isNaN(readin) || (readin<1)){alert2(texte["ungueltigerServer"],texte["ok"]); this.value="";}
								else{
									this.value=readin;
									logindata[this.id.replace("loginServer","")][1]=readin;
								}
							},false);
							newselect=createElement("select",{"id":"loginLng"+v},newtd);
							for(var w in GAMEPAGES){
								if(!GAMEPAGES.hasOwnProperty(w)){ continue; }
								createElement("option",{"value":w},newselect,w);
							}
							newselect.value=logindata[v][0];
							newselect.addEventListener("change",function(){ logindata[this.id.replace("loginLng","")][0]=this.value; },false);

							newtd=createElement("td",{},newtr);
							newinput=createElement("input",{"id":"loginName"+v,"value":logindata[v][2],"class":"text","style":"width:140px","maxlength":"20"},newtd);
							newinput.addEventListener("change",function(){ logindata[this.id.replace("loginName","")][2]=this.value; },false);

							newtd=createElement("td",{},newtr);
							newinput=createElement("input",{"id":"loginPW"+v,"value":logindata[v][3],"class":"text","style":"width:140px","maxlength":"20"},newtd);
							if (!showPW){ newinput.type="password"; }
							newinput.addEventListener("change",function(){ logindata[this.id.replace("loginPW","")][3]=this.value; },false);

							newtd=createElement("td",{},newtr);
							if (v>0){
								newdiv=createElement("div",{"id":"loginUp"+v,"class":"link2","style":"width:14px;height:10px;"},newtd);
								createElement("img",{"src":GFX+"quest_up.gif","style":"width:14px;height:10px;"},newdiv);
								newdiv.addEventListener("mouseover",function(){this.style.backgroundColor="blue";},false);
								newdiv.addEventListener("mouseout",function(){this.style.backgroundColor="transparent";},false);
								newdiv.addEventListener("click",function(){
									var currLine=parseInt(this.id.replace("loginUp",""),10);
									logindata.splice(currLine-1,2,logindata[currLine],logindata[currLine-1]);
									saveLogin();
									buildLoginTable(showPW);
								},false);
							}
							if (v<logindata.length-1){
								newdiv=createElement("div",{"id":"loginDown"+v,"class":"link2","style":"width:14px;height:10px;"},newtd);
								createElement("img",{"src":GFX+"quest_down.gif","style":"width:14px;height:10px;"},newdiv);
								newdiv.addEventListener("mouseover",function(){this.style.backgroundColor="blue";},false);
								newdiv.addEventListener("mouseout",function(){this.style.backgroundColor="transparent";},false);
								newdiv.addEventListener("click",function(){
									var currLine=parseInt(this.id.replace("loginDown",""),10);
									logindata.splice(currLine,2,logindata[currLine+1],logindata[currLine]);
									saveLogin();
									buildLoginTable(showPW);
								},false);
							}

							newtd=createElement("td",{"id":"loginDelete"+v},newtr);
							createElement("img",{"src":GFX+"popin/contracts/anullieren.gif","class":"link2","style":"width: 16px;height: 16px;"},newtd);
							newtd.addEventListener("mouseover",function(event){
								showToolTip(event,texte["loeschen"]);
								this.style.backgroundColor="blue";
							},false);
							newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent";},false);
							newtd.addEventListener("click",function(){
								var currLine=this.id.replace("loginDelete","");
								logindata.splice(currLine,1);
								saveLogin();
								buildLoginTable(showPW);
							},false);
						}

						newtr=createElement("tr",{},newtable);
						newtd=createElement("td",{"colspan":"5","class":"link","style":"font-weight:bold;font-size:16px;text-align:right;"},newtr,"+");
						newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue";},false);
						newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent";},false);
						newtd.addEventListener("click",function(){
							logindata.push([LNG,"0","","","false"]); // neue leere zeile
							saveLogin();
							buildLoginTable(showPW);
						},false);
						newtable=null;newtr=null;newtd=null;newinput=null;newselect=null;newdiv=null;
					}
					buildLoginTable(false);
					newdiv=createElement("div",{"align":"center"},$("infoPanelR"));
					var newinput=createElement("input",{"type":"checkbox","class":"link","checked":false},newdiv);
					newinput.addEventListener("click",function(){buildLoginTable(this.checked);},false);
					createElement("span",{},newdiv,texte["zeigePasswoerter"]);

					//paypal
					newdiv=createElement("div",{"align":"center","style":"margin-top:10px;"},$("infoPanelR"));
					var newform=createElement("form",{"id":"paypalForm","action":"https://www.paypal.com/cgi-bin/webscr","method":"post"},newdiv);
					createElement("input",{"type":"hidden","name":"cmd","value":"_donations"},newform);
					createElement("input",{"type":"hidden","name":"business","value":"jessica_holtkamp@web.de"},newform);
					createElement("input",{"type":"hidden","name":"lc","value":((LNG=="de")?"DE":"US")},newform);
					createElement("input",{"type":"hidden","name":"item_name","value":"MyFreeFarm Script"},newform);
					createElement("input",{"type":"hidden","name":"no_note","value":"0"},newform);
					createElement("input",{"type":"hidden","name":"currency_code","value":"EUR"},newform);
					createElement("input",{"type":"hidden","name":"bn","value":"PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest"},newform);
					createElement("input",{"type":"image","border":"0","src":"https://www.paypal.com/"+((LNG=="de")?"de_DE/DE":"en_US")+"/i/btn/btn_donate_LG.gif","name":"submit",alt:"PayPal"},newform);
					createElement("img",{"alt":"","border":"0","src":"https://www.paypal.com/en_US/i/scr/pixel.gif","width":"1","height":"1"},newform);
					newdiv=null;newinput=null;newform=null;
				},false);

				// Hotkeys
				newdiv=createElement("div",{"class":"link hoverBgLightbrown","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),texte["hotkeys"]);
				newdiv.addEventListener("click",function(){
					var newdiv=$("infoPanelT");
					newdiv.innerHTML="<span><b>"+texte["hotkeys"]+"</b>&nbsp;-&nbsp;"+texte["berater"]+"&nbsp;"+VERSION+"</span>";
					if(VERSION!=updateCheck[1]){
						newdiv=createElement("span",{"class":"link","style":"margin-left:4px;"},newdiv,"(&rarr;"+updateCheck[1]+")");
						newdiv.addEventListener("click",function(){
							location.href="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
						},false);
					}
					$("infoPanelR").innerHTML="";
					var newtable=createElement("table",{"align":"center","border":"1","class":"hoverRowBgCc9"},$("infoPanelR"));
					var newtr,newtd,newinput;
					for(var tr in texte["hotkeymap"]){
						if(!texte["hotkeymap"].hasOwnProperty(tr)){ continue; }
						newtr=createElement("tr",{},newtable);
						newtd=createElement("td",{},newtr);
						newinput=createElement("input",{"id":"hotkey"+tr,"value":getKeySymbol(hotkeymap[tr]),"class":"text","style":"width:80px;"},newtd);
						newinput.addEventListener("keyup",function(event){
							this.value=getKeySymbol(event.keyCode);
							hotkeymap[this.id.replace("hotkey","")]=event.keyCode;
							GM_setValue2("hotkeymap",implode(hotkeymap));
						},false);
						createElement("td",{},newtr,texte["hotkeymap"][tr]);
					}
					newtable=null;newtr=null;newtd=null;newinput=null;newdiv=null;
				},false);

				//CSS
				newdiv=createElement("div",{"class":"link hoverBgLightbrown","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),"CSS");
				newdiv.addEventListener("click",function(){
					var newdiv=$("infoPanelT");
					newdiv.innerHTML="<span><b>CSS</b>&nbsp;-&nbsp;"+texte["berater"]+"&nbsp;"+VERSION+"</span>";
					if(VERSION!=updateCheck[1]){
						newdiv=createElement("span",{"class":"link","style":"margin-left:4px;"},newdiv,"(&rarr;"+updateCheck[1]+")");
						newdiv.addEventListener("click",function(){
							location.href="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
						},false);
					}
					$("infoPanelR").innerHTML="";
					var cssArr=new Object();
					cssArr["css_systemMsg_marketsale"]=[[],""];
					cssArr["css_systemMsg_contractsale"]=[[],"font-style:italic;"];
					cssArr["css_zonetime"]=[[],"background-color:#de9008;color:white;font-weight:bold;"];
					cssArr["css_zonetime_ready"]=[["css_zonetime"],"background-color:red!important;"];
					cssArr["css_lowrack"]=[[],"background-color:orangered;color:#000;"];
					cssArr["css_farmicart_lowrack"]=[[],"color:yellow!important;"];
					cssArr["css_timeholder"]=[[],"width:25px;top:25px;right:0px;"];
					cssArr["css_windmilltime"]=[[],"background-color:#de9008;color:white;font-weight:bold;text-align:center;"];
					cssArr["css_windmilltime_ready"]=[["css_windmilltime"],"background-color:red!important;"];
					cssArr["css_forestrytime"]= [[],"background-color:#de9008;color:white;font-weight:bold;text-align:center;"];
					cssArr["css_forestrytime_ready"]=[["css_forestrytime"],"background-color:red!important;"];
					cssArr["css_carpentrytime"]= [[],"background-color:#de9008;color:white;font-weight:bold;text-align:center;"];
					cssArr["css_carpentrytime_ready"]=[["css_carpentrytime"],"background-color:red!important;"];
					cssArr["css_sawmilltime"]= [[],"background-color:#de9008;color:white;font-weight:bold;text-align:center;"];
					cssArr["css_sawmilltime_ready"]=[["css_sawmilltime"],"background-color:red!important;"];

					var newtable=createElement("table",{"align":"center"},$("infoPanelR"));
					var newtr,newtd,newinput;
					for(var v in cssArr){
						if(!cssArr.hasOwnProperty(v)){ continue; }
						newtr=createElement("tr",{},newtable);
						createElement("td",{},newtr,v);
						newtd=createElement("td",{},newtr);
						var help=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_"+v,cssArr[v][1]);
						newinput=createElement("input",{"name":v,"value":help,"class":"text","style":"width:250px;"},newtd);
						newinput.addEventListener("keyup",function(){
							var v=this.getAttribute("name");
							if(this.value==""){ this.value=cssArr[v][1]; }
							GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_"+v,this.value);
							cssArr[v][1]=this.value;
							var help=cssArr[v][1];
							for(var w=0;w<cssArr[v][0].length;w++){ help=cssArr[cssArr[v][0][w]][1]+help; }
							this.parentNode.nextSibling.firstElementChild.setAttribute("style",help);
						},false);
						newtd=createElement("td",{},newtr);
						for(var w=0;w<cssArr[v][0].length;w++){ help=cssArr[cssArr[v][0][w]][1]+help; }
						newdiv=createElement("div",{"style":help},newtd,"test");
					}
					newtable=null;newtr=null;newtd=null;newinput=null;newdiv=null;
				},false);

				//Data Import
				newdiv=createElement("div",{"class":"link hoverBgLightbrown","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),"Import/Export");
				newdiv.addEventListener("click",function(){
					function showExportData(showData,onlyThisAccount){
						// if (showData&&(!onlyThisAccount)){
						// 	if(!confirm("Attention! Showing all data of all accounts can slow down your browser. Continue?")){
						// 		showData=false;
						// 	}
						// }
						var container=$("beraterDataImportContainer");
						container.innerHTML="";
						createElement("div",{},container,"Click the lines to remove them.");

						var newdiv=createElement("div",{},container);
						var newinput=createElement("input",{"type":"checkbox","checked":showData},newdiv);
						newinput.addEventListener("click",function(){
							showExportData(this.checked,onlyThisAccount);
						},false);
						createElement("span",{},newdiv,"Show the data");

						newdiv=createElement("div",{},container);
						newinput=createElement("input",{"type":"checkbox","checked":onlyThisAccount},newdiv);
						newinput.addEventListener("click",function(){
							showExportData(showData,this.checked);
						},false);
						createElement("span",{},newdiv,"Only this account");

						newinput=createElement("button",{"class":"link"},container,"Create string!");
						newinput.addEventListener("click",function(){
							var save="";
							var help=$("beraterDataImportContainer").getElementsByTagName("tr");
							for(var v=0;v<help.length;v++){
								var help2=help[v].getElementsByTagName("td");
								save += help2[0].innerHTML+":"+help2[1].innerHTML+":"+help2[2].firstElementChild.innerHTML+"::";
							}
							prompt("Copy this string to a text-file", save.slice(0,save.length-2));
						},false);
						var newtable=createElement("table",{"border":"1","class":"hoverRowBgCc9","style":"width:100%"},container);
						var newtr,newtd;
						var help=GM_listValues();
						help.sort();
						if(onlyThisAccount){
							for(var v=0;v<help.length;v++){
								if(help[v].search(LNG+"_"+SERVER+"_"+USERNAME)!=-1){
									var help2=GM_getValue(help[v]);
									var help3="s";
									if(help2==""){ help2=" "; }
									if(typeof help2=="number"){ help3="n"; }
									else if(typeof help2=="boolean"){ help3="b"; }
									else{ help2=help2.replace(/(:+)/g,":"); }
									newtr=createElement("tr",{},newtable);
									newtr.addEventListener("click",function(){ removeElement(this); },false);
									createElement("td",{},newtr,help[v].replace(LNG+"_"+SERVER+"_"+USERNAME+"_",""));
									createElement("td",{},newtr,help3);
									newtd=createElement("td",{"style":(showData?"":"display:none;")},newtr);
									createElement("div",{"style":"max-height:100px;width:270px;overflow:auto;"},newtd,help2);
								}
							}
						}else{
							for(var v=0;v<help.length;v++){
								var help2=GM_getValue(help[v]);
								var help3="s";
								if(help2==""){ help2=" "; }
								if(typeof help2=="number"){ help3="n"; }
								else if(typeof help2=="boolean"){ help3="b"; }
								else{ help2=help2.replace(/(:+)/g,":"); }
								newtr=createElement("tr",{},newtable);
								newtr.addEventListener("click",function(){ removeElement(this); },false);
								createElement("td",{},newtr,help[v]);
								createElement("td",{},newtr,help3);
								newtd=createElement("td",{"style":(showData?"":"display:none;")},newtr);
								createElement("div",{"style":"max-height:100px;width:270px;overflow:auto;"},newtd,help2);
							}
						}
						container=null;newdiv=null;newtable=null;newtr=null;newtd=null;newinput=null;
					}
					function showImportData(showData,onlyThisAccount){
						var container=$("beraterDataImportContainer");
						container.innerHTML="";
						createElement("div",{},container,"Click the lines to remove them.");

						var newdiv=createElement("div",{},container);
						var newinput=createElement("input",{"type":"checkbox","checked":showData},newdiv);
						newinput.addEventListener("click",function(){
							showImportData(this.checked,onlyThisAccount);
						},false);
						createElement("span",{},newdiv,"Show the data");

						newdiv=createElement("div",{},container);
						newinput=createElement("input",{"type":"checkbox","checked":onlyThisAccount},newdiv);
						newinput.addEventListener("click",function(){
							showImportData(showData,this.checked);
						},false);
						createElement("span",{},newdiv,"Only this account");

						newinput=createElement("button",{"class":"link"},container,"Enter data-string");
						newinput.addEventListener("click",function(){
							var promptdata=prompt("Please enter the data-string","");
							if(promptdata){
								var container=$("beraterDataImportContainer");
								var newtable=container.getElementsByTagName("table");
								if(newtable[0]){ removeElement(newtable[0]); }
								newtable=createElement("table",{"border":"1","class":"hoverRowBgCc9","style":"width:100%"},container);
								var newtr,newtd;
								var help=promptdata.split("::");
								for(var v=0;v<help.length;v++){
									var help2=help[v].split(":");
									var impName=(onlyThisAccount?LNG+"_"+SERVER+"_"+USERNAME+"_":"")+help2.splice(0,1)[0];
									var impType=help2.splice(0,1)[0];
									var impContent=help2.join(":");
									if(impContent==" "){ impContent=""; }
									if((impType=="n")||(impType=="b")||(impType=="s")){
										newtr=createElement("tr",{},newtable);
										newtr.addEventListener("click",function(){ removeElement(this); },false);
										createElement("td",{},newtr,impName);
										createElement("td",{},newtr,impType);
										newtd=createElement("td",{"style":(showData?"":"display:none;")},newtr);
										createElement("div",{"style":"max-height:100px;width:280px;overflow:auto;"},newtd,impContent);
									}
								}
								container=null;newtable=null;newtr=null;newtd=null;
							}
						},false);
						newinput=createElement("button",{"class":"link"},container,"Import this!");
						newinput.addEventListener("click",function(){
							var help=$("beraterDataImportContainer").getElementsByTagName("tr");
							for(var v=0;v<help.length;v++){
								var help2=help[v].getElementsByTagName("td");
								switch(help2[1].innerHTML){
								case "n": GM_setValue2(help2[0].innerHTML,parseInt(help2[2].getElementsByTagName("div")[0].innerHTML,10));break;
								case "b": GM_setValue2(help2[0].innerHTML,help2[2].getElementsByTagName("div")[0].innerHTML=="true");break;
								case "s": GM_setValue2(help2[0].innerHTML,help2[2].getElementsByTagName("div")[0].innerHTML);break;
								}
							}
							alert2("done",texte["ok"]);
						},false);
					}
					var newdiv=$("infoPanelT");
					newdiv.innerHTML="<span><b>Settings Import/Export</b>&nbsp;-&nbsp;"+texte["berater"]+"&nbsp;"+VERSION+"</span>";
					if(VERSION!=updateCheck[1]){
						newdiv=createElement("span",{"class":"link","style":"margin-left:4px;"},newdiv,"(&rarr;"+updateCheck[1]+")");
						newdiv.addEventListener("click",function(){
							location.href="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
						},false);
					}
					$("infoPanelR").innerHTML="";
					var newinput=createElement("div",{"id":"beraterDataImportModeExport","class":"link","style":"display:inline-block;width:49%;text-align:center;border:1px solid black;"},$("infoPanelR"),"Export");
					newinput.addEventListener("click",function(){
						this.style.backgroundColor="green";
						$("beraterDataImportModeImport").style.backgroundColor="";
						showExportData(false,true);
					},false);
					newinput=createElement("div",{"id":"beraterDataImportModeImport","class":"link","style":"display:inline-block;width:49%;text-align:center;border:1px solid black;"},$("infoPanelR"),"Import");
					newinput.addEventListener("click",function(){
						this.style.backgroundColor="green";
						$("beraterDataImportModeExport").style.backgroundColor="";
						showImportData(false,true);
					},false);
					createElement("div",{"id":"beraterDataImportContainer"},$("infoPanelR"));
					newinput=null;newdiv=null;
				},false);
			}
			break;
			case "zonen":{
				var totalPunkte=0;

				newtable=createElement("table",{"style":"width:100%" ,"border":"1"},infoPanelInner);
				for(var farms=0;farms<top.window.wrappedJSObject.farmamount;farms++){
					newtr=createElement("tr",{},newtable);
					newtd=createElement("th",{"colspan":"6","class":"link hoverBgCc9"},newtr,texte["farm"]+" "+(farms+1));
					newtd.addEventListener("click",function(){
						closeInfoPanel();
						top.window.wrappedJSObject.initZones(this.innerHTML.replace(texte["farm"]+" ",""));
						top.window.wrappedJSObject.showMain();
					},false);
					for(var z=1;z<7;z++){
						var zf=z+6*farms;
						if (z%3==1) newtr=createElement("tr",{},newtable);
						newtd=createElement("td",{"colspan":"2","style":"width:33%;","id":zf},newtr);
						if (zoneTyp[zf]!=0){
							newdiv=createElement("div",{"style":"position:relative;top:0;height:60px;overflow:hidden;"},newtd);
							createElement("div",{"class":"bm"+zoneTyp[zf],"style":"position:absolute;top:-20px;opacity:0.3;z-index:-1;"},newdiv);
							newdiv1=createElement("div",{"style":"position:absolute;top:0;height:60px;width:100%;overflow:auto;"},newdiv);
							newdiv=createElement("div",{},newdiv1);
							if (!zoneBlock[zf]&&(BUILDINGTYPE[zoneTyp[zf]]>0)){
								newtd.setAttribute("class","link hoverBgCc9");
								newtd.addEventListener("click",function(){
									closeInfoPanel();
									goToZone(this.id);
								},false);
								if (nextTime[zf]!=NEVER){
									var endDay=countDays(now,nextTime[zf]);
									if (endDay == 0) newdiv.innerHTML=getDaytimeStr(nextTime[zf],1)+"&nbsp;"+texte["uhr"];
									else if (texte["day"+endDay]) newdiv.innerHTML=texte["day"+endDay]+" "+getDaytimeStr(nextTime[zf],1)+"&nbsp;"+texte["uhr"];
									else newdiv.innerHTML=new Date(1000*nextTime[zf]).toLocaleString();
								}else{ newdiv.innerHTML=texte["unbeschaeftigt"];}
								if (nextTime[zf]<now){
									newdiv.style.textDecoration="blink";
									newdiv.style.fontWeight="bold";
								}
								var points=0;
								for(var k in zoneErnte[zf]){
									if(!zoneErnte[zf].hasOwnProperty(k)){ continue; }
									newdiv=createElement("div",{"style":"line-height:16px;"},newdiv1);
									produktPic(k,newdiv);
									createElement("div",{"style":"display:inline-block;"},newdiv,zoneErnte[zf][k][0]+" "+prodName[k]);
									points += zoneErnte[zf][k][1];
								}
								pointsFormat(points,"div",newdiv1);
								totalPunkte += points;
							}else{
								newdiv.innerHTML="---";
							}
						}else{
							newtd.innerHTML="---";
						}
					}
				}

				newtr=createElement("tr",{},newtable);
				createElement("th",{"colspan":"3"},newtr,texte["total"]);
				newtd=createElement("th",{"colspan":"3","class":"link hoverBgCc9"},newtr,texte["fehlt"]);
				newtd.addEventListener("mouseover",function(event){ showToolTip(event,texte["zumSGH"]); },false);
				newtd.addEventListener("click",showSGH,false);
				newtr=createElement("tr",{},newtable);
				newtd=createElement("td",{"colspan":"3"},newtr);
				calcTotalErnte();
				for(var k in totalErnte){
					if(!totalErnte.hasOwnProperty(k)){ continue; }
					newdiv=createElement("div",{"style":"height:16px"},newtd);
					produktPic(k,newdiv);
					createElement("div",{"style":"display:inline-block;"},newdiv,numberFormat(totalErnte[k])+" "+prodName[k]);
				}
				pointsFormat(totalPunkte,"div",newtd);

				var newtdfehlt=createElement("td",{"colspan":"3"},newtr);

				//Farmi-Uebersicht
				newtable=createElement("table",{"style":"margin-top:10px;width:100%","border":"1"});
				newtr=createElement("tr",{"style":"color:black"},newtable);
				createElement("th",{},newtr,texte["farmi"]);
				createElement("th",{},newtr,texte["produkte"]);
				createElement("th",{},newtr,texte["geld"]);
				createElement("th",{"colspan":"2"},newtr,texte["wert"]);
				var farmiNr=-1;
				var farmiCount=0;
				var farmiSum=new Object;
				var farmiCash=0;
				var farmiWert=0;
				while (top.window.wrappedJSObject.farmisinfo[0][++farmiNr]){
					if (!top.window.wrappedJSObject.farmisaway[farmiNr]){
					farmiCount++;
					newtr=createElement("tr",{},newtable);
					newtd=createElement("td",{"class":"link hoverBgCc9","name":farmiNr},newtr);
					var farmiGfxNr=top.window.wrappedJSObject.farmisinfo[0][farmiNr]["pic"];
					createElement("img",{"src":GFX+"verkauf/kunde_"+farmiGfxNr+"_still.gif","style":"width:"+FARMISIZE[farmiGfxNr][0]+"px;height:"+FARMISIZE[farmiGfxNr][1]+"px;"},newtd);
					newtd.addEventListener("click",function(){
						closeInfoPanel();
						if ($("citymaincontainer").style.display=="block"){
							unsafeWindow.initZones(1);
							unsafeWindow.showMain();
						}
						unsafeWindow.showCart(parseInt(this.getAttribute("name"),10));
					},false);
					newtd=createElement("td",{},newtr);
					var cash=parseFloat(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["price"],10);
					var wert=0;
					for(var i=1 ; i <= 7 ; i++){ // 7=maxanzahl produkte pro farmi
						var pid=parseInt(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["p"+i],10);
						var amount=parseInt(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["a"+i],10);
						if((pid > 0) && (amount > 0)){
							newdiv=createElement("div",{},newtd);
							produktPic(pid,newdiv);
							newdiv1=createElement("div",{"class":"link hoverBgCc9","style":"display:inline-block;"+(prodBestand[pid]<amount?"color:red;":""),"prod":pid},newdiv,numberFormat(amount)+"&nbsp;"+prodName[pid]);
							newdiv1.addEventListener("mouseover",function(event){ showGoToMarketToolTip(event,this.getAttribute("prod")); },false);
							newdiv1.addEventListener("click",function(){showMarket(this.getAttribute("prod"));},false);
							if (farmiSum[pid]) farmiSum[pid] += amount;
							else farmiSum[pid]=amount;
							wert += amount*gut[pid];
						}
					}
					farmiCash += cash;
					farmiWert += wert;
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						createElement("div",{},newtd,moneyFormat(cash));
						createElement("div",{},newtd,numberFormat(100*cash/wert,1)+"%");
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						newdiv=createElement("div",{},newtd,moneyFormat(wert));
						newdiv.addEventListener("mouseover",function(event){ showToolTip(event,"100%"); },false);
						newdiv=createElement("div",{},newtd,moneyFormat(0.9*wert));
						newdiv.addEventListener("mouseover",function(event){ showToolTip(event,"90%"); },false);
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						newdiv=createElement("div",{},newtd,(cash>wert?"+":"")+moneyFormatInt(cash-wert));
						newdiv.addEventListener("mouseover",function(event){ showToolTip(event,"100%"); },false);
						newdiv=createElement("div",{},newtd,(cash>0.9*wert?"+":"")+moneyFormatInt(cash-0.9*wert));
						newdiv.addEventListener("mouseover",function(event){ showToolTip(event,"90%"); },false);
					}
				}
				if (farmiCount>0){
					infoPanelInner.appendChild(newtable);
					if (farmiCount>1){
						newtr.setAttribute("class","borderBottom2");
						newtr=createElement("tr",{"class":"borderTop2"},newtable);
						createElement("td",{},newtr);
						newtd=createElement("td",{},newtr);
						for(var v in farmiSum){
							if(!farmiSum.hasOwnProperty(v)){ continue; }
							newdiv=createElement("div",{},newtd);
							produktPic(v,newdiv);
							createElement("div",{"style":"display:inline-block;"},newdiv,numberFormat(farmiSum[v])+"&nbsp;"+prodName[v]);
						}
						newtd=createElement("td",{"style":"text-align:right;"},newtr);
							createElement("div",{},newtd,moneyFormat(farmiCash));
							createElement("div",{},newtd,numberFormat(100*farmiCash/farmiWert,1)+"%");
						newtd=createElement("td",{"style":"text-align:right;"},newtr);
							newdiv=createElement("div",{},newtd,moneyFormat(farmiWert));
							newdiv.addEventListener("mouseover",function(event){ showToolTip(event,"100%"); },false);
							newdiv=createElement("div",{},newtd,moneyFormat(0.9*farmiWert));
							newdiv.addEventListener("mouseover",function(event){ showToolTip(event,"90%"); },false);
						newtd=createElement("td",{"style":"text-align:right;"},newtr);
							newdiv=createElement("div",{},newtd,(farmiCash>farmiWert?"+":"")+moneyFormatInt(farmiCash-farmiWert));
							newdiv.addEventListener("mouseover",function(event){ showToolTip(event,"100%"); },false);
							newdiv=createElement("div",{},newtd,(farmiCash>0.9*farmiWert?"+":"")+moneyFormatInt(farmiCash-0.9*farmiWert));
							newdiv.addEventListener("mouseover",function(event){ showToolTip(event,"90%"); },false);
					}
				}
				for(var w=0;w<prodNameSort.length;w++){
					var v=prodNameSort[w];
					var amount1=(farmiSum[v]?farmiSum[v]:0)-prodBestand[v];
					var amount=amount1+prodMinRack[v];
					if (amount>0){
						newdiv=createElement("div",{},newtdfehlt);
						produktPic(v,newdiv);
						newdiv1=createElement("div",{"style":"display:inline-block;","class":"link hoverBgCc9","name":v},newdiv,numberFormat(amount)+(amount1>0?"&nbsp;("+numberFormat(amount1)+")":"")+"&nbsp;"+prodName[v]);
						newdiv1.addEventListener("mouseover",function(event){showGoToMarketToolTip(event,this.getAttribute("name"));},false);
						newdiv1.addEventListener("click",function(){showMarket(this.getAttribute("name"));},false);
					}
				}
				newtdfehlt=null;
			}
			break;
			case "profit":{
				// data
				//var imgStarBlack="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAIAAAB7HQGFAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATUlEQVR4nJ2RQQrAQAgDN/7/z9OD0C6NtGE9jnEgKGAFU44kRbnI1zJXpr6V9ADqN9rb+rbevByN5Ml5x50MfQF3q1GfvtY71Pl/x7kAn0stADSCq8MAAAAASUVORK5CYII=";
				var imgStarGrey="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAIAAAB7HQGFAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVklEQVR4nJ2RUQrAMAhDp3fMKT1k9iGs0tgiy4/wGqNFI/kM5IoiYuQb5WWYRk7zjGS7UBUAz3I3rbkn68ddUUuWT7espPkvAM22vFu2bs8V2v/7tnoB7YUnCmjChpYAAAAASUVORK5CYII=";
				var perc=0.9;
				var showAll=false;
				var sortMode=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeProfittable","gut");

				newdiv=createElement("div",{"style":"text-align:center;height:20px;width:100%;"},infoPanelInner);
				createElement("span",{"style":"font-weight:bold;"},newdiv,texte["profitTable"]);
				newspan=createElement("span",{"style":"margin-left:50px;"},newdiv);
				newinput=createElement("input",{"type":"checkbox","class":"link","checked":(perc==0.9)},newspan);
				newinput.addEventListener("click",function(){
					perc=this.checked?0.9:1;
					buildProfitTable();
				},false);
				createElement("span",{},newspan,"90%");
				newinput=createElement("input",{"type":"checkbox","class":"link","checked":showAll},newdiv);
				newinput.addEventListener("click",function(){
					showAll=this.checked;
					buildProfitTable();
				},false);
				createElement("span",{},newdiv,texte["showAll"]);
				newdiv=createElement("div",{"style":"height:495px;width:100%;overflow:auto;"},infoPanelInner);
				createElement("table",{},newdiv);
				function buildProfitTable(jumpTo){
					//GM_log("buildProfitTable "+sortMode+":"+perc+":"+showAll+":"+jumpTo);
					var sterne=new Array();
					try{ sterne=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_ProfittableSterne","[]")); }catch(err){}
					if(!(sterne instanceof Array)){ sterne=new Array(); }
					if(!sterne[1]){ sterne[1]=0; }
					if(!showAll){
						while((sterne[1]>0)&&(USERLEVEL<BUILDING_UPGRADES[1][sterne[1]][0])){ sterne[1]--; }
					}
					var valFutterMode=new Object(); // [sort 0/1,fullfed bool]
					try{ valFutterMode=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_ProfittableFutterMode","{}")); }catch(err){}
					var profit=new Array();
					var c=-1;
					var currBuilding;
					for(var v=0;v<prodName.length;v++){ if((showAll||(!prodBlock[v])) && (growTime[v])){
						if (prodTyp[v]=="v"){
							profit[++c]=new Object();
							profit[c]["id"]=v;
							profit[c]["dauer"]=calcDauer(60*growTime[v],BUILDING_UPGRADES[1][sterne[1]][2]);
							profit[c]["menge"]=calcGrowTimes(60*growTime[v],86400,BUILDING_UPGRADES[1][sterne[1]][2])*120/prodPlantSize[v];
							profit[c]["punkte"]=Math.round(POINTS[v]*profit[c]["menge"]);
							profit[c]["menge"] *= (top.window.wrappedJSObject.produkt_ernte[v]-1);
							profit[c]["gut"]=perc*gut[v]*profit[c]["menge"];
							profit[c]["gutBeob"]=perc*gutBeob[v]*profit[c]["menge"];
						}else if (prodTyp[v]=="e"){
							profit[++c]=new Object();
							profit[c]["id"]=v;
							currBuilding=PRODUCT2BUILDING[v];
							if(!sterne[currBuilding]){ sterne[currBuilding]=0; }
							profit[c]["level"]=sterne[currBuilding];
							profit[c]["maxlevel"]=BUILDING_UPGRADES[currBuilding].length-1;
							if(!showAll){
								while((profit[c]["maxlevel"]>0)&&(USERLEVEL<BUILDING_UPGRADES[currBuilding][profit[c]["maxlevel"]][0])){ profit[c]["maxlevel"]--; }
								profit[c]["level"]=Math.min(profit[c]["level"],profit[c]["maxlevel"]);
							}
							var bonus=BUILDING_UPGRADES[currBuilding][profit[c]["level"]][2];
							profit[c]["dauer"]=60*growTime[v]*bonus;
							profit[c]["menge"]=86400/profit[c]["dauer"];
							if(FEED[v].length==1){
								var currFutter=FEED[v][0][0];
								var menge=profit[c]["menge"]*FEED[v][0][1];
								var preis=(NPC[currFutter]?Math.min(NPC[currFutter],gut[currFutter]):gut[currFutter]);
								var preisBeob=(NPC[currFutter]?Math.min(NPC[currFutter],gutBeob[currFutter]):gutBeob[currFutter]);
								profit[c]["futter"]=[currFutter,menge,menge*preis,menge*preisBeob];
								var help=profit[c]["futter"];
							}else{
								if(!valFutterMode[v]){ valFutterMode[v]=[0,true]; }
								profit[c]["futter"]=[[],[]];
								for(var i=0;i<2;i++){
									var currFutter=FEED[v][i][0];
									var menge=profit[c]["menge"];
									var preis=(NPC[currFutter]?Math.min(NPC[currFutter],gut[currFutter]):gut[currFutter]);
									var preisBeob=(NPC[currFutter]?Math.min(NPC[currFutter],gutBeob[currFutter]):gutBeob[currFutter]);
									profit[c]["futter"][i][0]=[currFutter,menge,menge*preis,menge*preisBeob];
									var menge=profit[c]["menge"]*Math.floor(profit[c]["dauer"]*BUILDING_UPGRADES[currBuilding][profit[c]["level"]][3]/FEED[v][i][1]);
									profit[c]["futter"][i][1]=[currFutter,menge,menge*preis,menge*preisBeob];
								}
								if(valFutterMode[v][1]){
									profit[c]["dauer"] *= 0.5;
									profit[c]["menge"] *= 2;
									var help=profit[c]["futter"][valFutterMode[v][0]][1];
								}else{
									var help=profit[c]["futter"][valFutterMode[v][0]][0];
								}
							}
							profit[c]["menge"] *= BUILDING_UPGRADES[currBuilding][profit[c]["level"]][3]*top.window.wrappedJSObject.produkt_ernte[v];
							profit[c]["punkte"]=Math.round(profit[c]["menge"]*POINTS[v]);
							profit[c]["gut"]=Math.round((profit[c]["menge"]*perc*gut[v])-help[2]);
							profit[c]["gutBeob"]=Math.round((profit[c]["menge"]*perc*gutBeob[v])-help[3]);
						}
					}}

					profit.sort(function (a,b){return b[sortMode] - a[sortMode];});

					var oldtable=$("infoPanelInner").getElementsByTagName("table")[0];
					var newtable=createElement("table",{"cellspacing":"0","border":"1","width":"100%;"});
					oldtable.parentNode.replaceChild(newtable,oldtable);
					oldtable=null;
					newtable.addEventListener("mouseover",function(event){
						var node=event.target;
						var mouseOverText=node.getAttribute("mouseOverText");
						while((node!=this)&&(!mouseOverText)){
							node=node.parentNode;
							mouseOverText=node.getAttribute("mouseOverText");
						}
						if(mouseOverText){ showToolTip(event,mouseOverText); }
						node=null;mouseOverText=null;
					},false);
					var newthead=createElement("thead",{},newtable);
					var newtbody=createElement("tbody",{},newtable);

					var newtr=createElement("tr",{"style":"color:black;"},newthead);
					var newtd=createElement("th",{"mouseOverText":"<table class='white' cellspacing=0><tr><th style='border-bottom:1px solid white;'>"+unsafeWindow.buildinginfos[0][1][10]+"</th></tr><tr><td>"+(unsafeWindow.garden_waterbonus.replace(/%BONUS%/,"").replace(/\%/g,"").replace(/:/g,""))+"</td></tr><tr><td>("+texte["clickToChange"]+")</td></tr></table>","class":"link"},newtr,Math.round(100*(1-BUILDING_UPGRADES[1][sterne[1]][2]))+"%");
					newtd.addEventListener("click",function(){
						var c=BUILDING_UPGRADES[1].length-1;
						if(!showAll){
							while((c>0)&&(USERLEVEL<BUILDING_UPGRADES[1][c][0])){ c--; }
						}
						sterne[1]=(sterne[1]+1)%(c+1);
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_ProfittableSterne",implode(sterne));
						buildProfitTable();
					},false);
					for(var v=0;v<BUILDING_UPGRADES[1].length;v++){
						if(showAll||(USERLEVEL>=BUILDING_UPGRADES[1][v][0])){
							createElement("img",{"mouseOverText":"<table class='white' cellspacing=0><tr><th style='border-bottom:1px solid white;'>"+unsafeWindow.buildinginfos[0][1][10]+"</th></tr><tr><td>"+texte["ausbaustufe"]+"</td></tr><tr><td>("+texte["clickToChange"]+")</td></tr></table>","src":v<=sterne[1]?GFX+"star.png":imgStarGrey},newtd);
						}
					}
					newtd=createElement("th",{"class":"link hoverBgCc9"+(sortMode=="dauer"?" sortableColDesc":"")},newtr,texte["dauer"]);
					newtd.addEventListener("click",function(){
						sortMode="dauer";
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_modeProfittable",sortMode);
						buildProfitTable();
					},false);
					newtd=createElement("th",{},newtr);
					newtd=createElement("th",{"class":"link hoverBgCc9"+(sortMode=="punkte"?" sortableColDesc":"")},newtr,texte["punkte"]);
					newtd.addEventListener("click",function(){
						sortMode="punkte";
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_modeProfittable",sortMode);
						buildProfitTable();
					},false);
					newtd=createElement("th",{"class":"link hoverBgCc9"+(sortMode=="gut"?" sortableColDesc":"")},newtr,texte["preise"]);
					newtd.addEventListener("click",function(){
						sortMode="gut";
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_modeProfittable",sortMode);
						buildProfitTable();
					},false);
					newtd=createElement("th",{"class":"link hoverBgCc9"+(sortMode=="gutBeob"?" sortableColDesc":"")},newtr,texte["beobachtet"]);
					newtd.addEventListener("click",function(){
						sortMode="gutBeob";
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_modeProfittable",sortMode);
						buildProfitTable();
					},false);

					var newspan,newdiv,newtable1,newtr1,newtd1;
					for(var v=0;v<profit.length;v++){
						var buildingNr=PRODUCT2BUILDING[profit[v]["id"]];
						newtr=createElement("tr",{"nr":v,"class":"hoverBgCc9","style":"color:black;"},newtbody);
						newtd=createElement("td",{},newtr);
						newtd=createElement("div",{"style":"position:relative;height:100%;"},newtd);
						produktPic(profit[v]["id"],newtd);
						newspan=createElement("span",{"class":"link","mouseOverText":"<table class='white' cellspacing=0><tr><th colspan=2 style='border-bottom:1px solid white'>"+texte["goToMarketOfX"].replace(/%1%/,prodName[profit[v]["id"]])+"</th></tr><tr><td>"+texte["bestand"]+"</td><td>"+numberFormat(prodBestand[profit[v]["id"]])+"</td></tr><tr><td>"+texte["ertrag"]+"</td><td>"+numberFormat(profit[v]["menge"],1)+"</td></tr></table>"},newtd,prodName[profit[v]["id"]]);
						newspan.addEventListener("click",function(){showMarket(profit[this.parentNode.parentNode.parentNode.getAttribute("nr")]["id"]);},false);
						if(typeof profit[v]["level"]=="number"){
							newspan=createElement("span",{"mouseOverText":"<table class='white' cellspacing=0><tr><th style='border-bottom:1px solid white;'>"+unsafeWindow.buildinginfos[0][buildingNr][10]+"</th></tr><tr><td>"+texte["ausbaustufe"]+"</td></tr><tr><td>("+texte["clickToChange"]+")</td></tr></table>","class":"link"},newtd); // ,"mouseOverText":"max "+profit[v]["maxlevel"]
							for(var w=0;w<=profit[v]["maxlevel"];w++){ createElement("img",{"src":w<=profit[v]["level"]?GFX+"star.png":imgStarGrey},newspan); }
							newspan.addEventListener("click",function(){
								var currNr=this.parentNode.parentNode.parentNode.getAttribute("nr");
								sterne[PRODUCT2BUILDING[profit[currNr]["id"]]]=(profit[currNr]["level"]+1)%(profit[currNr]["maxlevel"]+1);
								GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_ProfittableSterne",implode(sterne));
								buildProfitTable(profit[currNr]["id"]);
							},false);

							if(FEED[profit[v]["id"]].length>1){
								newspan=produktPic(FEED[profit[v]["id"]][valFutterMode[profit[v]["id"]][0]][0],newtd);
								newdiv=createElement("div");
								newtable1=createElement("table",{"cellspacing":0,"class":"white"},newdiv);
								newtr1=createElement("tr",{},newtable1);
								createElement("th",{"colspan":2,"style":"border-bottom:1px solid white;"},newtr1,unsafeWindow.buildinginfos[0][buildingNr][10]);
								newtr1=createElement("tr",{},newtable1);
								createElement("td",{"colspan":2},newtr1,texte["futter"]+":");
								for(var i=0;i<profit[v]["futter"].length;i++){
									for(var j=0;j<2;j++){
										newtr1=createElement("tr",{},newtable1);
										var help=((valFutterMode[profit[v]["id"]][0]==i)&&(valFutterMode[profit[v]["id"]][1]==(j==1)))?"background-color:#BB6600;":"";
										createElement("td",{"style":"text-align:right;"+help},newtr1,numberFormat(profit[v]["futter"][i][j][1],1));
										createElement("td",{"style":help},newtr1,prodName[profit[v]["futter"][i][j][0]]);
									}
								}
								newtr1=createElement("tr",{},newtable1);
								createElement("td",{"colspan":2},newtr1,"("+texte["clickToChange"]+")");
								newspan.setAttribute("mouseOverText",newdiv.innerHTML);
								newspan.setAttribute("class",newspan.getAttribute("class")+" link");
								newspan.addEventListener("click",function(){
									var currId=profit[this.parentNode.parentNode.parentNode.getAttribute("nr")]["id"];
									if(valFutterMode[currId][1]){
										valFutterMode[currId][0]=(valFutterMode[currId][0]+1)%FEED[currId].length;
										valFutterMode[currId][1]=false;
									}else{
										valFutterMode[currId][1]=true;
									}
									GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_ProfittableFutterMode",implode(valFutterMode));
									buildProfitTable(currId);
								},false);
							}else{
								newspan=produktPic(FEED[profit[v]["id"]][0][0],newtd);
								newdiv=createElement("div");
								newtable1=createElement("table",{"cellspacing":0,"class":"white"},newdiv);
								newtr1=createElement("tr",{},newtable1);
								createElement("th",{"colspan":2,"style":"border-bottom:1px solid white;"},newtr1,unsafeWindow.buildinginfos[0][buildingNr][10]);
								newtr1=createElement("tr",{},newtable1);
								createElement("td",{"colspan":2},newtr1,texte["bedarf"]+":&nbsp;"+numberFormat(profit[v]["futter"][1],1)+"&nbsp;"+prodName[profit[v]["futter"][0]]);
								newspan.setAttribute("mouseOverText",newdiv.innerHTML);
							}
						}
						createElement("td",{"style":"text-align:right;"},newtr,getTimeStr(profit[v]["dauer"],1));
						createElement("td",{"style":"text-align:right;"},newtr,getDaytimeStr(now+profit[v]["dauer"],1)+"&nbsp;"+texte["uhr"]);
						createElement("td",{"style":"text-align:right;"},newtr,numberFormat(profit[v]["punkte"]));

						newdiv=createElement("div");
						newtable1=createElement("table",{"cellspacing":0,"class":"white"},newdiv);
						newtr1=createElement("tr",{},newtable1);
						createElement("th",{"colspan":4,"style":"border-bottom:1px solid white;"},newtr1,unsafeWindow.buildinginfos[0][buildingNr][10]);
						if (typeof profit[v]["level"]=="number"){
							if(FEED[profit[v]["id"]].length>1){
								var help=profit[v]["futter"][valFutterMode[profit[v]["id"]][0]][valFutterMode[profit[v]["id"]][1]?1:0];
							}else{
								var help=profit[v]["futter"];
							}
							newtr1=createElement("tr",{},newtable1);
							createElement("td",{"style":"text-align:right;"},newtr1,numberFormat(profit[v]["menge"],1));
							createElement("td",{},newtr1,prodName[profit[v]["id"]]);
							createElement("td",{"style":"text-align:right;"},newtr1,moneyFormatInt(profit[v]["gut"]+help[2]));
							createElement("td",{"style":"text-align:right;"},newtr1,"("+moneyFormat(perc*gut[profit[v]["id"]])+")");
							newtr1=createElement("tr",{},newtable1);
							createElement("td",{"style":"text-align:right;"},newtr1,numberFormat(help[1],1));
							createElement("td",{},newtr1,prodName[help[0]]);
							createElement("td",{"style":"text-align:right;"},newtr1,moneyFormatInt(-help[2]));
							createElement("td",{"style":"text-align:right;"},newtr1,"("+moneyFormat(help[2]/help[1])+")");
						}else{
							newtr1=createElement("tr",{},newtable1);
							createElement("td",{"style":"text-align:right;"},newtr1,numberFormat(profit[v]["menge"],1));
							createElement("td",{},newtr1,prodName[profit[v]["id"]]);
							createElement("td",{"style":"text-align:right;"},newtr1,moneyFormatInt(profit[v]["gut"]));
							createElement("td",{"style":"text-align:right;"},newtr1,"("+moneyFormat(perc*gut[profit[v]["id"]])+")");
						}
						createElement("td",{"style":"text-align:right;","mouseOverText":newdiv.innerHTML},newtr,moneyFormatInt(profit[v]["gut"]));

						newdiv=createElement("div");
						newtable1=createElement("table",{"cellspacing":0,"class":"white"},newdiv);
						newtr1=createElement("tr",{},newtable1);
						createElement("th",{"colspan":4,"style":"border-bottom:1px solid white;"},newtr1,unsafeWindow.buildinginfos[0][buildingNr][10]);
						if (typeof profit[v]["level"]=="number"){
							if(FEED[profit[v]["id"]].length>1){
								var help=profit[v]["futter"][valFutterMode[profit[v]["id"]][0]][valFutterMode[profit[v]["id"]][1]?1:0];
							}else{
								var help=profit[v]["futter"];
							}
							newtr1=createElement("tr",{},newtable1);
							createElement("td",{"style":"text-align:right;"},newtr1,numberFormat(profit[v]["menge"],1));
							createElement("td",{},newtr1,prodName[profit[v]["id"]]);
							createElement("td",{"style":"text-align:right;"},newtr1,moneyFormatInt(profit[v]["gutBeob"]+help[3]));
							createElement("td",{"style":"text-align:right;"},newtr1,"("+moneyFormat(perc*gutBeob[profit[v]["id"]])+")");
							newtr1=createElement("tr",{},newtable1);
							createElement("td",{"style":"text-align:right;"},newtr1,numberFormat(help[1],1));
							createElement("td",{},newtr1,prodName[help[0]]);
							createElement("td",{"style":"text-align:right;"},newtr1,moneyFormatInt(-help[3]));
							createElement("td",{"style":"text-align:right;"},newtr1,"("+moneyFormat(help[3]/help[1])+")");
						}else{
							newtr1=createElement("tr",{},newtable1);
							createElement("td",{"style":"text-align:right;"},newtr1,numberFormat(profit[v]["menge"],1));
							createElement("td",{},newtr1,prodName[profit[v]["id"]]);
							createElement("td",{"style":"text-align:right;"},newtr1,moneyFormatInt(profit[v]["gutBeob"]));
							createElement("td",{"style":"text-align:right;"},newtr1,"("+moneyFormat(perc*gutBeob[profit[v]["id"]])+")");
						}
						createElement("td",{"style":"text-align:right;","mouseOverText":newdiv.innerHTML},newtr,moneyFormatInt(profit[v]["gutBeob"]));

						if(jumpTo==profit[v]["id"]){
							newtbody.scrollTop=newtr.offsetTop;
							newspan=createElement("div",{"id":"vanishDiv","style":"position:absolute;top:0;left:0;height:15px;width:100%;background-color:blue;opacity:0.7;"},newtr.firstElementChild.firstElementChild);
							var intervalVanishDiv=window.setInterval(function(){
								var opac=parseFloat($("vanishDiv").style.opacity,10)-0.05;
								if(opac>0){ $("vanishDiv").style.opacity=opac; }
								else{ try{
									removeElement($("vanishDiv"));
									window.clearInterval(intervalVanishDiv);
								}catch(err){}}
							},100);
						}
					}
					//makeTablebodyScrollable(newtable,"470px");
					newtable=null;newthead=null;newtbody=null;newtr=null;newtd=null;newspan=null;newdiv=null;newtable1=null;newtr1=null;newtd1=null;
				}
				buildProfitTable();
			}
			break;
			case "farmiLog":{
				var newFarmiumsatz=new Object();
				var farmiOk=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_farmiOk",95);
				var totalPrice=0;
				var totalWert=0;
				var totalPriceOk=0;
				var totalWertOk=0;
				var countFarmisOk=0;
				var countFarmisAll=0;
				var totalProducts=new Object();

				infoPanelInner.style.width="626px";

				newdiv=createElement("div",{"style":"height:100%;width:595px;overflow:auto;"},infoPanelInner);
				newtable=createElement("table",{"style":"width:100%","border":"1"},newdiv); //scrollTable
				newtable.addEventListener("mouseover",function(event){
					var node=event.target;
					var mouseOverText=node.getAttribute("mouseOverText");
					while((node!=this)&&(!mouseOverText)){
						node=node.parentNode;
						mouseOverText=node.getAttribute("mouseOverText");
					}
					if(mouseOverText){ showToolTip(event,mouseOverText); }
					node=null;mouseOverText=null;
				},false);
				newthead=createElement("thead",{},newtable);
				newtbody=createElement("tbody",{"style":"height:480px;overflow-y:auto;overflow-x:hidden"},newtable);

				// selection bar on the right side
				newdiv1=createElement("div",{"class":"link","style":"position:absolute;top:0;right:0;border:1px solid black;"},infoPanelInner);
				newdiv1.addEventListener("mouseover",function(event){
					var node=event.target;
					var mouseOverText=node.getAttribute("mouseOverText");
					while((node!=this)&&(!mouseOverText)){
						node=node.parentNode;
						mouseOverText=node.getAttribute("mouseOverText");
					}
					if(mouseOverText){ showToolTip(event,mouseOverText); }
					node=null;mouseOverText=null;
				},false);
				for(var v=200;v>-1;v--){
					newdiv=createElement("div",{"class":"hoverBgRed","style":"width:20px;height:2.5px;","mouseOverText":v+"%"},newdiv1);
					if (v<=farmiOk){ newdiv.style.backgroundColor="blue"; }
					if (v==90||v==100) newdiv.style.borderTop="1px solid black";
					newdiv.addEventListener("click",function(){
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_farmiOk",parseInt(this.getAttribute("mouseOverText"),10));
						$("infoPanel").setAttribute("mode","");
						buildInfoPanel("farmiLog");
					},false);
				}

				// Farmi table
				newtr=createElement("tr",{},newthead);
				createElement("th",{"style":"border-bottom:2px solid black;"},newtr,"");
				createElement("th",{"style":"border-bottom:2px solid black;"},newtr,texte["produkte"]);
				createElement("th",{"style":"border-bottom:2px solid black;"},newtr,texte["geld"]);
				createElement("th",{"style":"border-bottom:2px solid black;","colspan":"2"},newtr,texte["wert"]);

				var borderTop;
				var c=0;
				var prev=null;
				for(var v in farmiLog){
					if(!farmiLog.hasOwnProperty(v)){ continue; }
					countFarmisAll++;
					newtr=createElement("tr",{"class":"hoverBgCc9"},newtbody);
					if (prev==null){
						borderTop="2px solid black;";
						newtd1=createElement("td",{"style":"border-top:"+borderTop},newtr,farmiLog[v][0]);
						c=1;
					}else if (farmiLog[v][0]!=farmiLog[prev][0]){
						borderTop="2px solid black;";
						newtd1.innerHTML += "<br>("+c+")";
						newtd1=createElement("td",{"style":"border-top:"+borderTop},newtr,farmiLog[v][0]);
						c=1;
					}else{
						borderTop="1px solid black;";
						newtd1.rowSpan=++c;
					}
					newtd=createElement("td",{"style":"border-top:"+borderTop},newtr);
					var wert=0;
					for(var w in farmiLog[v][2]){
						if(!farmiLog[v][2].hasOwnProperty(w)){ continue; }
						newdiv=createElement("div",{"style":"line-height:16px;"},newtd);
						produktPic(w,newdiv);
						createElement("div",{"style":"display:inline-block;"},newdiv,numberFormat(farmiLog[v][2][w])+"&nbsp;"+prodName[w]);
						wert += farmiLog[v][2][w]*gut[w];
					}
					totalPrice += farmiLog[v][1];
					totalWert += wert;
					newtd=createElement("td",{"style":"text-align:right;border-top:"+borderTop},newtr);
						createElement("div",{},newtd,moneyFormatInt(farmiLog[v][1]));
						newdiv=createElement("div",{},newtd,numberFormat(100*farmiLog[v][1]/wert,1)+"%");
						if (100*farmiLog[v][1]>farmiOk*wert){
							countFarmisOk++;
							for(var w in farmiLog[v][2]){
								if(!farmiLog[v][2].hasOwnProperty(w)){ continue; }
								if(totalProducts[w]==undefined){ totalProducts[w]=[0,0]; }
								totalProducts[w][0]++;
								totalProducts[w][1]+=farmiLog[v][2][w];
							}
							totalPriceOk += farmiLog[v][1];
							totalWertOk += wert;

						}else{ newdiv.style.backgroundColor="red"; }
					newtd=createElement("td",{"style":"text-align:right;border-top:"+borderTop},newtr);
						createElement("div",{"mouseOverText":"100%"},newtd,moneyFormatInt(wert));
						createElement("div",{"mouseOverText":"90%"},newtd,moneyFormatInt(0.9*wert));
					newtd=createElement("td",{"style":"text-align:right;border-top:"+borderTop},newtr);
						createElement("div",{"mouseOverText":"100%"},newtd,(farmiLog[v][1]>wert?"+":"")+moneyFormatInt(farmiLog[v][1]-wert));
						createElement("div",{"mouseOverText":"90%"},newtd,(farmiLog[v][1]>0.9*wert?"+":"")+moneyFormatInt(farmiLog[v][1]-0.9*wert));
					if(!newFarmiumsatz[farmiLog[v][0]]){ newFarmiumsatz[farmiLog[v][0]]=0; }
					newFarmiumsatz[farmiLog[v][0]] += farmiLog[v][1];
					prev=v;
				}
				if(countFarmisAll>0){ newtd1.innerHTML += "<br>("+c+")"; }
				for(var v in newFarmiumsatz){
					if(!newFarmiumsatz.hasOwnProperty(v)){ continue; }
					newFarmiumsatz[v]=Math.round(100*newFarmiumsatz[v])/100;
					if(levelLog[v]!=undefined){ levelLog[v][4]=newFarmiumsatz[v]; } //dont override all because data could be joined to monthly
				}
				GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_levelLog",implode(levelLog));
				for(var v in totalProducts){
					if(!totalProducts.hasOwnProperty(v)){ continue; }
					totalProducts[v][2]=totalProducts[v][1]/totalProducts[v][0];
				}

				if(countFarmisAll>0){
					newtr=createElement("tr");
					newtbody.insertBefore(newtr,newtbody.firstElementChild);
					createElement("td",{},newtr,texte["total"]+"<br>("+countFarmisOk+")");
					newtd=createElement("td",{"id":"tdTotalProducts"},newtr);
					function buildTotalProducts(mode){
						$("tdTotalProducts").innerHTML="";
						var newtable=createElement("table",{cellspacing:"0",cellpadding:"0"},$("tdTotalProducts"));
						var newtr=createElement("tr",{},newtable);
						var newtd=createElement("td",{"class":"link hoverBgLightblue","style":"text-align:center;padding-right:3px;border-bottom:1px solid black;"},newtr,texte["produkt"]);
						if (mode==0){
							newtd.style.backgroundColor="lightblue";
							totalProducts.sortObj(sortObjFunctions["int"],true);
						}else{
							newtd.addEventListener("click",function(){buildTotalProducts(0);},false);
							totalProducts.sortObj(function(mode){return function(a,b){return (a[1][mode-1]-b[1][mode-1]);}}(mode),true);
						}
						newtd=createElement("td",{"class":"link hoverBgLightblue","style":"text-align:center;border-left:1px solid black;border-bottom:1px solid black;padding-left:3px;padding-right:3px;"},newtr,sign_mult);
						if (mode==1){ newtd.style.backgroundColor="lightblue"; }
						else{
							newtd.addEventListener("click",function(){buildTotalProducts(1);},false);
						}
						newtd=createElement("td",{"class":"link hoverBgLightblue","style":"text-align:center;border-left:1px solid black;border-bottom:1px solid black;padding-left:3px;padding-right:3px;"},newtr,sign_sum);
						if (mode==2){ newtd.style.backgroundColor="lightblue"; }
						else{
							newtd.addEventListener("click",function(){buildTotalProducts(2);},false);
						}
						newtd=createElement("td",{"class":"link hoverBgLightblue","style":"text-align:center;border-left:1px solid black;border-bottom:1px solid black;padding-left:3px;padding-right:3px;"},newtr,sign_sum+"/"+sign_mult);
						if (mode==3){ newtd.style.backgroundColor="lightblue"; }
						else{
							newtd.addEventListener("click",function(){buildTotalProducts(3);},false);
						}
						for(var v in totalProducts){
							if(!totalProducts.hasOwnProperty(v)){ continue; }
							//newdiv=createElement("div",{"style":"line-height:16px;"},newtd);
							newtr=createElement("tr",{"class":"hoverBgCc9"},newtable);
							newtd=createElement("td",{"style":"padding-right:3px;"},newtr);
							produktPic(v,newtd);
							createElement("div",{"style":"display:inline-block;"},newtd,prodName[v]);
							createElement("td",{"style":"text-align:right;border-left:1px solid black;padding-left:3px;padding-right:3px;"},newtr,numberFormat(totalProducts[v][0]));
							createElement("td",{"style":"text-align:right;border-left:1px solid black;padding-left:3px;padding-right:3px;"},newtr,numberFormat(totalProducts[v][1]));
							createElement("td",{"style":"text-align:right;border-left:1px solid black;padding-left:3px;padding-right:3px;"},newtr,numberFormat(totalProducts[v][2]));
						}
						newtable=null;newtr=null;newtd=null;
					}
					buildTotalProducts(0);
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						createElement("div",{},newtd,moneyFormatInt(totalPriceOk));
						createElement("div",{},newtd,numberFormat(100*totalPriceOk/totalWertOk,1)+"%");
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						createElement("div",{"mouseOverText":"100%"},newtd,moneyFormatInt(totalWertOk));
						createElement("div",{"mouseOverText":"90%"},newtd,moneyFormatInt(0.9*totalWertOk));
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						createElement("div",{"mouseOverText":"100%"},newtd,(totalPriceOk>totalWertOk?"+":"")+moneyFormatInt(totalPriceOk-totalWertOk));
						createElement("div",{"mouseOverText":"90%"},newtd,(totalPriceOk>0.9*totalWertOk?"+":"")+moneyFormatInt(totalPriceOk-0.9*totalWertOk));

					newtr=createElement("tr",{"class":"hoverBgCc9"});
					newtbody.insertBefore(newtr,newtbody.children[1]);
					newtd=createElement("td",{},newtr);
						createElement("div",{},newtd,sign_average+" ("+countFarmisOk+")");
					newtd=createElement("td",{},newtr,"");
						createElement("div",{},newtd,">"+numberFormat(farmiOk)+"%");
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						createElement("div",{},newtd,moneyFormatInt(totalPriceOk/countFarmisOk));
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						createElement("div",{"mouseOverText":"100%<br>"+sign_average+"[>"+numberFormat(farmiOk)+"%]"},newtd,moneyFormatInt(totalWertOk/countFarmisOk));
						createElement("div",{"mouseOverText":" 90%<br>"+sign_average+"[>"+numberFormat(farmiOk)+"%]"},newtd,moneyFormatInt(0.9*totalWertOk/countFarmisOk));
						createElement("div",{"mouseOverText":"100%<br>"+sign_sum+"[>"+numberFormat(farmiOk)+"%]/"+texte["alle"],"style":"border-top:1px solid black;"},newtd,moneyFormatInt(totalWertOk/countFarmisAll));
						createElement("div",{"mouseOverText":" 90%<br>"+sign_sum+"[>"+numberFormat(farmiOk)+"%]/"+texte["alle"]},newtd,moneyFormatInt(0.9*totalWertOk/countFarmisAll));
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						createElement("div",{"mouseOverText":"100%"},newtd,(totalPriceOk>totalWertOk?"+":"")+moneyFormatInt((totalPriceOk-totalWertOk)/countFarmisOk));
						createElement("div",{"mouseOverText":" 90%"},newtd,(totalPriceOk>0.9*totalWertOk?"+":"")+moneyFormatInt((totalPriceOk-0.9*totalWertOk)/countFarmisOk));
						createElement("div",{"mouseOverText":"100%","style":"border-top:1px solid black;"},newtd,(totalPriceOk>totalWertOk?"+":"")+moneyFormatInt((totalPriceOk-totalWertOk)/countFarmisAll));
						createElement("div",{"mouseOverText":" 90%"},newtd,(totalPriceOk>0.9*totalWertOk?"+":"")+moneyFormatInt((totalPriceOk-0.9*totalWertOk)/countFarmisAll));

					newtr=createElement("tr",{"class":"hoverBgCc9"});
					newtbody.insertBefore(newtr,newtbody.children[2]);
					newtd=createElement("td",{},newtr);
						createElement("div",{},newtd,sign_average+" ("+countFarmisAll+")");
					newtd=createElement("td",{},newtr);
						createElement("div",{},newtd,texte["alle"]);
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						createElement("div",{},newtd,moneyFormatInt(totalPrice/countFarmisAll));
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						createElement("div",{"mouseOverText":"100%"},newtd,moneyFormatInt(totalWert/countFarmisAll));
						createElement("div",{"mouseOverText":"90%"},newtd,moneyFormatInt(0.9*totalWert/countFarmisAll));
					newtd=createElement("td",{"style":"text-align:right;"},newtr);
						createElement("div",{"mouseOverText":"100%"},newtd,(totalPrice>totalWert?"+":"")+moneyFormatInt((totalPrice-totalWert)/countFarmisAll));
						createElement("div",{"mouseOverText":"90%"},newtd,(totalPrice>0.9*totalWert?"+":"")+moneyFormatInt((totalPrice-0.9*totalWert)/countFarmisAll));
				}
			}
			break;
			case "preise":{
				//$("infoPanelInner").style.background="url('"+GFX+"stadt/markt2.jpg') no-repeat scroll left top transparent";
				buildPreise(null,1,infoPanelInner,"black","#bb8");
			}
			break;
			case "preise2":{
				//$("infoPanelInner").style.background="url('"+GFX+"stadt/markt2.jpg') no-repeat scroll left top transparent";
				buildPreise(null,2,infoPanelInner,"black","#bb8");
			}
			break;
			case "formulas":{
				// unsafeWindow.formulas[0][id]:
				// 0: id
				// 1: needed level
				// 2: name
				// 3: ingredients [[id,amount],[id,amount],[id,amount]]
				// 4: baking time in sek
				// 5: gain [0|[prod,amount],0|[prod,+val,time in sek],0|[prod,+pts,time in sek]]
				// 6: price money
				// 7: price coins
				// 8: points for baking
				// 9: [0,1,2,3,4,5,6]
				//10: ?
				//endremain: time to end
				//end: date until recipe is buyable
				if(mode2==""){
					//show all levels,show products,show crop amount,show crop points
					mode2=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_infoPanelFormulas","[false,true,true,true]"));
				}
				function buildInfoPanelFormulas(){
					GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_infoPanelFormulas",implode(mode2));
					var infoPanelInner=$("infoPanelInner");
					infoPanelInner.innerHTML="";
					var newdiv=createElement("div",{"style":"height:23px;width:100%;"},infoPanelInner);

					var newinput=createElement("input",{"type":"checkbox","class":"link","checked":mode2[0]},newdiv);
					newinput.addEventListener("click",function(){
						mode2[0]=this.checked;
						buildInfoPanelFormulas();
					},false);
					createElement("span",{"style":"margin-right:10px;"},newdiv,texte["showAll"]);

					for(var v=0;v<=2;v++){
						newinput=createElement("div",{"style":"display:inline-block;width:70px;text-align:center;border:1px inset black;"+(mode2[v+1]?"background-color:lightblue;":""),"class":"link hoverBgLightbrown","v":v},newdiv,texte["formulaType"][v]);
						newinput.addEventListener("mouseover",function(event){
							showToolTip(event,texte["click"]+'&nbsp;/&nbsp;'+texte["clickStrg"]);
						},false);
						newinput.addEventListener("click",function(event){
							var v=parseInt(this.getAttribute("v"),10);
							if(!event.ctrlKey){
								for(var w=1;w<=3;w++){ mode2[w]=false; }
							}
							mode2[v+1]=!mode2[v+1];
							buildInfoPanelFormulas();
						},false);
					}

					newdiv=createElement("div",{"style":"height:492px;width:100%;overflow:auto;"},infoPanelInner);
					var newtable=createElement("table",{"style":"line-height:16px;width:100%","border":"1"},newdiv); //scrollTable
					var newthead=createElement("thead",{},newtable);
					var newtbody=createElement("tbody",{"class":"hoverRowBgLightbrown","style":"height:465px;"},newtable);

					var newtr=createElement("tr",{"class":"borderBottom2"},newthead);
					var newtd,newtd1;
					createElement("th",{"sortdir":"Asc","class":"link"},newtr,texte["nr"]);
					createElement("th",{"sortdir":"Asc","class":"link"},newtr,texte["lvl"]);
					createElement("th",{"sortdir":"Asc","class":"link"},newtr,texte["title"]);
					createElement("th",{"sortdir":"Asc","class":"link"},newtr,texte["ingredients"]);
					createElement("th",{"sortdir":"Asc","class":"link"},newtr,texte["time"]);
					createElement("th",{"sortdir":"Asc","class":"link"},newtr,texte["gain"]);
					createElement("th",{"sortdir":"Asc","class":"link"},newtr,texte["price"]);
					new SortableTable(newtr);

					for(var v in unsafeWindow.formulas[0]){
						if(!unsafeWindow.formulas[0].hasOwnProperty(v)){ continue; }
						if(mode2[0]||((USERLEVEL>=unsafeWindow.formulas[0][v][1])&&(unsafeWindow.formulas[0][v]["endremain"]>=0))){
							if((mode2[1]&&(unsafeWindow.formulas[0][v][5][0]!=0))||(mode2[2]&&(unsafeWindow.formulas[0][v][5][1]!=0))||(mode2[3]&&(unsafeWindow.formulas[0][v][5][2]!=0))){
								newtr=createElement("tr",{},newtbody);
								createElement("td",{"value":unsafeWindow.formulas[0][v][0],"style":(unsafeWindow.formulas[0][v]["endremain"]>=0?"":"background-color:red;")},newtr,unsafeWindow.formulas[0][v][0]);
								createElement("td",{"value":unsafeWindow.formulas[0][v][1],"style":(USERLEVEL>=unsafeWindow.formulas[0][v][1]?"":"background-color:red;")},newtr,unsafeWindow.formulas[0][v][1]);
								// Title
								newtd1=createElement("td",{},newtr,unsafeWindow.formulas[0][v][2]);
								// Ingredients
								newtd=createElement("td",{},newtr);
								var sum1=0;
								var sumPts=0;
								var preis=0;
								for(var w=0;w<unsafeWindow.formulas[0][v][3].length;w++){
									preis=!isNaN(NPC[unsafeWindow.formulas[0][v][3][w][0]])?Math.min(NPC[unsafeWindow.formulas[0][v][3][w][0]],gut[unsafeWindow.formulas[0][v][3][w][0]]):gut[unsafeWindow.formulas[0][v][3][w][0]];
									sum1 += unsafeWindow.formulas[0][v][3][w][1]*preis;
									newdiv=createElement("div",{"class":"link hoverBgLightblue","prod":unsafeWindow.formulas[0][v][3][w][0],"value":preis*unsafeWindow.formulas[0][v][3][w][1]},newtd);
									newdiv.addEventListener("mouseover",function(event){showGoToMarketToolTip(event,this.getAttribute("prod"),null,'<tr><td>'+sign_sum+'</td><td style="text-align:right;">'+moneyFormatInt(parseInt(this.getAttribute("value"),10))+'</td></tr>');},false);
									newdiv.addEventListener("click",function(){showMarket(this.getAttribute("prod"));},false);
									produktPic(unsafeWindow.formulas[0][v][3][w][0],newdiv);
									newdiv=createElement("span",{},newdiv,numberFormat(unsafeWindow.formulas[0][v][3][w][1]));
								}
								newtd.setAttribute("value",sum1);
								createElement("div",{},newtd,"("+moneyFormatInt(sum1)+")");
								var sum=-sum1;
								// Time
								createElement("td",{"value":unsafeWindow.formulas[0][v][4]},newtr,getTimeStr(unsafeWindow.formulas[0][v][4],1)+"h");
								// Gain
								newtd=createElement("td",{"style":"width:80px;"},newtr);
								if(unsafeWindow.formulas[0][v][5][0]!=0){
									// Products
									preis=!isNaN(NPC[unsafeWindow.formulas[0][v][5][0][0]])?Math.min(NPC[unsafeWindow.formulas[0][v][5][0][0]],gut[unsafeWindow.formulas[0][v][5][0][0]]):gut[unsafeWindow.formulas[0][v][5][0][0]];
									sum1=unsafeWindow.formulas[0][v][5][0][1]*preis;
									sum += sum1;
									newdiv=createElement("div",{"class":"link hoverBgLightblue","prod":unsafeWindow.formulas[0][v][5][0][0],"value":sum1},newtd);
									newdiv.addEventListener("mouseover",function(event){showGoToMarketToolTip(event,this.getAttribute("prod"));},false);
									newdiv.addEventListener("click",function(){showMarket(this.getAttribute("prod"));},false);
									produktPic(unsafeWindow.formulas[0][v][5][0][0],newdiv);
									createElement("span",{},newdiv,unsafeWindow.formulas[0][v][5][0][1]);
									createElement("div",{},newtd,"("+moneyFormatInt(sum1)+")");
								}else if(unsafeWindow.formulas[0][v][5][1]!=0){
									// Crop amount boost
									createElement("div",{},newtd,getTimeStr(unsafeWindow.formulas[0][v][5][1][2],1)+"h");
									newdiv=createElement("div",{"class":"link hoverBgLightblue","prod":unsafeWindow.formulas[0][v][5][1][0],"style":"white-space:nowrap;"},newtd);
									newdiv.addEventListener("mouseover",function(event){showGoToMarketToolTip(event,this.getAttribute("prod"));},false);
									newdiv.addEventListener("click",function(){showMarket(this.getAttribute("prod"));},false);
									produktPic(unsafeWindow.formulas[0][v][5][1][0],newdiv);
									createElement("span",{},newdiv,"+"+unsafeWindow.formulas[0][v][5][1][1]+"val&nbsp;(+"+numberFormat(100*unsafeWindow.formulas[0][v][5][1][1]/(unsafeWindow.produkt_ernte[unsafeWindow.formulas[0][v][5][1][0]]-1))+"%)");
									sum1=0;
									for(var zoneNr=1;zoneNr<zoneTyp.length;zoneNr++){ if((zoneTyp[zoneNr]==1)&&(!zoneBlock[zoneNr])){
										preis=!isNaN(NPC[unsafeWindow.formulas[0][v][5][1][0]])?Math.min(NPC[unsafeWindow.formulas[0][v][5][1][0]],gut[unsafeWindow.formulas[0][v][5][1][0]]):gut[unsafeWindow.formulas[0][v][5][1][0]];
										sum1 += preis*unsafeWindow.formulas[0][v][5][1][1]*Math.ceil(calcGrowTimes(60*growTime[unsafeWindow.formulas[0][v][5][1][0]],unsafeWindow.formulas[0][v][5][1][2],1-(zoneBonus[zoneNr]/100)))*120/prodPlantSize[unsafeWindow.formulas[0][v][5][1][0]];
									}}
									sum += sum1;
									createElement("div",{},newtd,"("+moneyFormatInt(sum1)+")");
									newtd.setAttribute("value",sum1);
								}else if(unsafeWindow.formulas[0][v][5][2]!=0){
									// Crop points boost
									createElement("div",{},newtd,getTimeStr(unsafeWindow.formulas[0][v][5][2][2],1)+"h");
									newdiv=createElement("div",{"class":"link hoverBgLightblue","prod":unsafeWindow.formulas[0][v][5][2][0],"style":"white-space:nowrap;"},newtd);
									newdiv.addEventListener("mouseover",function(event){showGoToMarketToolTip(event,this.getAttribute("prod"));},false);
									newdiv.addEventListener("click",function(){showMarket(this.getAttribute("prod"));},false);
									produktPic(unsafeWindow.formulas[0][v][5][2][0],newdiv);
									createElement("span",{},newdiv,"+");
									pointsFormat(unsafeWindow.formulas[0][v][5][2][1],"span",newdiv);
									createElement("span",{},newdiv,"&nbsp;(+"+numberFormat(100*unsafeWindow.formulas[0][v][5][2][1]/POINTS[unsafeWindow.formulas[0][v][5][2][0]])+"%)");

									sum1=0;
									for(var zoneNr=1;zoneNr<zoneTyp.length;zoneNr++){ if((zoneTyp[zoneNr]==1)&&(!zoneBlock[zoneNr])){
										sum1 += unsafeWindow.formulas[0][v][5][2][1]*Math.ceil(calcGrowTimes(60*growTime[unsafeWindow.formulas[0][v][5][2][0]],unsafeWindow.formulas[0][v][5][2][2],1-(zoneBonus[zoneNr]/100)))*120/prodPlantSize[unsafeWindow.formulas[0][v][5][2][0]];
									}}
									sumPts=sum1;
									newdiv=createElement("div",{},newtd);
									createElement("span",{},newdiv,"(");
									pointsFormat(sum1,"span",newdiv);
									createElement("span",{},newdiv,")");
									newtd.setAttribute("value",0);
								}
								pointsFormat(unsafeWindow.formulas[0][v][8],"div",newtd);
								sumPts += unsafeWindow.formulas[0][v][8];
								// Price
								newtd=createElement("td",{},newtr);
								if(unsafeWindow.formulas[0][v][6]>0){
									sum1=unsafeWindow.formulas[0][v][6];
									sum -= sum1;
									newspan=createElement("div",{},newtd,moneyFormatInt(sum1));
									newtd.setAttribute("value",sum1);
								}
								if(unsafeWindow.formulas[0][v][7]>0){
									sum1=unsafeWindow.formulas[0][v][7]*gut[0];
									sum -= sum1;
									newspan=createElement("div",{"class":"link hoverBgLightblue"},newtd,coinsFormat(unsafeWindow.formulas[0][v][7],createElement("div")).parentNode.innerHTML);
									newspan.addEventListener("mouseover",function(event){showGoToMarketToolTip(event,"0");},false);
									newspan.addEventListener("click",function(){showMarket("0");},false);
									createElement("div",{"style":"clear:both;"},newtd,"("+moneyFormatInt(sum1)+")");
									newtd.setAttribute("value",sum1);
								}
								//createElement("td",{},newtr,unsafeWindow.formulas[0][v][8]);
								//createElement("td",{},newtr,unsafeWindow.formulas[0][v][9]);
								// Title
								createElement("div",{},newtd1,moneyFormatInt(sum));
								newtd1.setAttribute("value",sum);
								pointsFormat(sumPts,"div",newtd1);
							}
						}
					}
					infoPanelInner=null;
					newtable=null;newthead=null;newtbody=null;newtr=null;newtd=null;newtd1=null;newdiv=null;newinput=null;
				}
				buildInfoPanelFormulas();
			}
			break;
			case "lotteryLog":{
				var lotteryLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryLog","{}"));
				// implode data older than last month
				var stichtag=new Date();
				stichtag=Math.round(((new Date(stichtag.getFullYear(),stichtag.getMonth()-1,1)).getTime())/1000);
				var changed=false;
				for(var v in lotteryLog){
					if(!lotteryLog.hasOwnProperty(v)){ continue; }
					if(v.match(/\d+\.\d+\.\d+/)){
						if(getTime(v)<stichtag){
							changed=true;
							var w=v.replace(/\d+\./,"");
							if(!lotteryLog[w]){
								lotteryLog[w]=[[],[],{},[]];
							}
							if(lotteryLog[v][0]>0){
								if(lotteryLog[v][1]&&(!lotteryLog[v][1].isEmpty())){
									if(!lotteryLog[w][1][lotteryLog[v][0]]){ lotteryLog[w][1][lotteryLog[v][0]]=0; }
									lotteryLog[w][1][lotteryLog[v][0]]++;
									for(var p in lotteryLog[v][1]){
										if(!lotteryLog[v][1].hasOwnProperty(p)){ continue; }
										if(!lotteryLog[w][2][p]){ lotteryLog[w][2][p]=0; }
										lotteryLog[w][2][p] += lotteryLog[v][1][p];
									}
								}else{
									if(!lotteryLog[w][0][lotteryLog[v][0]]){ lotteryLog[w][0][lotteryLog[v][0]]=0; }
									lotteryLog[w][0][lotteryLog[v][0]]++;
								}
							}
							lotteryLog[w][2].sortObj(sortObjFunctions["productId"]);
							if(lotteryLog[v][2]){
								for(var p=0;p<lotteryLog[v][2].length;p++){
									if(!lotteryLog[w][3][lotteryLog[v][2][p]]){ lotteryLog[w][3][lotteryLog[v][2][p]]=0; }
									lotteryLog[w][3][lotteryLog[v][2][p]]++;
								}
							}
							delete lotteryLog[v];
						}
					}
				}
				if(changed){
					lotteryLog.sortObj(sortObjFunctions["date"]);
					GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryLog",implode(lotteryLog));
				}

// {"14.2.2011":[10,{"92":1,"26":86}],"15.2.2011":[10],"16.2.2011":[9,{"29":45,"22":7,"37":1}],"17.2.2011":[8],"18.2.2011":[10],"19.2.2011":[10],"20.2.2011":[9,{"31":89}],"21.2.2011":[8],"22.2.2011":[8,{"23":38}],"23.2.2011":[4,{"6":98,"91":2}],"24.2.2011":[3,{"19":470}],"25.2.2011":[9,{"10":17,"92":1}],"26.2.2011":[8,{"40":1,"39":2,"7":10,"32":7,"36":2}],"27.2.2011":[10],"28.2.2011":[8,{"31":60}],"1.3.2011":[4,{"18":1603,"29":12,"37":1}],"2.3.2011":[9,{"25":4,"91":1,"34":7,"40":1}],"3.3.2011":[7,{"20":74}],"4.3.2011":[8,{"92":4}],"5.3.2011":[9,{"42":3}],"6.3.2011":[10],"7.3.2011":[8,{"12":3,"6":79}],"8.3.2011":[9,{"40":4}],"9.3.2011":[4,{"8":29,"4":3}],"10.3.2011":[8,{"35":30,"32":8,"21":32,"93":1}],"11.3.2011":[9,{"38":44,"20":105,"19":63,"39":1}],"12.3.2011":[8,{"17":7858,"33":39,"4":3,"37":1}],"13.3.2011":[6,{"22":98,"32":14,"7":3}],"14.3.2011":[7,{"21":252,"9":3}],"15.3.2011":[6,{"41":1}],"16.3.2011":[9,{"10":17}],"17.3.2011":[9,{"23":72}],"18.3.2011":[5,{"7":25}],"19.3.2011":[10],"20.3.2011":[10],"21.3.2011":[10],"22.3.2011":[10],"24.3.2011":[7,{"35":5,"38":18,"26":12,"21":48}],"25.3.2011":[7,{"11":6,"32":27}],"26.3.2011":[9,{"10":4,"27":2,"39":1,"3":10,"1":197}],"27.3.2011":[6,{"91":1}],"28.3.2011":[4],"29.3.2011":[6,{"42":2,"5":55,"39":1}],"31.3.2011":[6,{"11":8}],"1.4.2011":[7],"2.4.2011":[10],"3.4.2011":[9,{"40":4,"20":1}],"4.4.2011":[9,{"22":116,"33":52,"23":1}],"5.4.2011":[10],"6.4.2011":[10],"7.4.2011":[10],"8.4.2011":[10],"9.4.2011":[10],"10.4.2011":[10],"11.4.2011":[8],"12.4.2011":[10],"13.4.2011":[7],"14.4.2011":[8],"16.4.2011":[6,{"27":2,"92":1}],"17.4.2011":[9,{"27":1,"2":550,"7":8}],"18.4.2011":[5,{"43":3}],"19.4.2011":[7],"20.4.2011":[9,{"23":83,"4":190,"26":19}],"22.4.2011":[8],"23.4.2011":[10],"24.4.2011":[10],"25.4.2011":[7],"26.4.2011":[10],"27.4.2011":[10],"28.4.2011":[4],"30.4.2011":[9,{"2":869,"3":12,"28":1}],"1.5.2011":[10],"2.5.2011":[9,{"12":1,"10":2}],"3.5.2011":[7],"4.5.2011":[7,{"24":38,"19":378,"5":23,"8":6}],"5.5.2011":[8],"6.5.2011":[9,{"41":3,"3":170,"7":2}],"7.5.2011":[10],"8.5.2011":[4]}

				var modeLotteryLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeLotteryLog","{}"));

				newdiv=createElement("div",{"style":"text-align:center;height:20px;width:100%;"},infoPanelInner);
				createElement("span",{"style":"font-weight:bold;"},newdiv,texte["lotteryLog"]);
				newinput=createElement("input",{"type":"checkbox","class":"link","checked":modeLotteryLog["total"],"style":"margin-left:50px;"},newdiv);
				newinput.addEventListener("click",function(){
					modeLotteryLog["total"]=this.checked;
					GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeLotteryLog",implode(modeLotteryLog));
					buildLotteryLogTable();
				},false);
				createElement("span",{},newdiv,texte["total"]);
				newdiv=createElement("div",{"style":"height:495px;width:100%;overflow:auto;"},infoPanelInner);
				createElement("table",{},newdiv);

				function buildLotteryLogTable(){
					var oldtable=$("infoPanelInner").getElementsByTagName("table")[0];
					//var newtable=createElement("table",{"cellspacing":"0","border":"1","width":"100%;"});
					var newtable=createElement("table",{"style":"line-height:16px;width:100%","border":"1"}); // scrollTable
					oldtable.parentNode.replaceChild(newtable,oldtable);
					oldtable=null;

					var newthead=createElement("thead",{},newtable);
					var newtbody=createElement("tbody",{"class":"hoverRowBgLightbrown","style":"height:465px;"},newtable);
					var newtd,newdiv,newtable1,newtr1;
					var newtr=createElement("tr",{},newthead);
					if(modeLotteryLog["total"]){
						// prepare data
						var lotteryLogTotal=[[],[],{},[]];
						for(var v in lotteryLog){
							if(!lotteryLog.hasOwnProperty(v)){ continue; }
							if(v.match(/\d+\.\d+\.\d+/)){
								if(lotteryLog[v][0]>0){
									if(lotteryLog[v][1]&&(!lotteryLog[v][1].isEmpty())){
										if(!lotteryLogTotal[1][lotteryLog[v][0]]){ lotteryLogTotal[1][lotteryLog[v][0]]=0; }
										lotteryLogTotal[1][lotteryLog[v][0]]++;
										for(var p in lotteryLog[v][1]){
											if(!lotteryLog[v][1].hasOwnProperty(p)){ continue; }
											if(!lotteryLogTotal[2][p]){ lotteryLogTotal[2][p]=0; }
											lotteryLogTotal[2][p] += lotteryLog[v][1][p];
										}
									}else{
										if(!lotteryLogTotal[0][lotteryLog[v][0]]){ lotteryLogTotal[0][lotteryLog[v][0]]=0; }
										lotteryLogTotal[0][lotteryLog[v][0]]++;
									}
								}
								lotteryLogTotal[2].sortObj(sortObjFunctions["productId"]);
								if(lotteryLog[v][2]){
									for(var p=0;p<lotteryLog[v][2].length;p++){
										if(!lotteryLogTotal[3][lotteryLog[v][2][p]]){ lotteryLogTotal[3][lotteryLog[v][2][p]]=0; }
										lotteryLogTotal[3][lotteryLog[v][2][p]]++;
									}
								}
							}else{
								for(var j=0;j<4;j++){
								if(j==2){ continue; }
									for(var i=0;i<lotteryLog[v][j].length;i++){
										if(lotteryLog[v][j][i]>0){
											if(!lotteryLogTotal[j][i]){ lotteryLogTotal[j][i]=0; }
											lotteryLogTotal[j][i] += lotteryLog[v][j][i];
										}
									}
								}

								for(var prod in lotteryLog[v][2]){
									if(!lotteryLog[v][2].hasOwnProperty(prod)){ continue; }
									if(!lotteryLogTotal[2][prod]){ lotteryLogTotal[2][prod]=0; }
									lotteryLogTotal[2][prod] += lotteryLog[v][2][prod];
								}
							}
						}
						// plot table
						createElement("th",{"style":"white-space:nowrap;"},newtr,texte["dailyTicket"]);
						createElement("th",{"style":"white-space:nowrap;"},newtr,texte["boughtTickets"]);

						newtr=createElement("tr",{},newtbody);
						newtd=createElement("td",{},newtr);
						newdiv=createElement("div",{"style":"margin-bottom:3px;"},newtd);
						newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["keptLots"]); },false);
						var c=0;
						for(var i=0;i<lotteryLogTotal[0].length;i++){
							if(lotteryLogTotal[0][i]>0){
								c += lotteryLogTotal[0][i];
								newdiv1=createElement("div",{"style":"position:relative;display:inline-block;margin-right:2px;"},newdiv);
								createElement("img",{"style":"width:20px;border:0;","src":GFX+"city/"+i+".jpg"},newdiv1);
								createElement("span",{},newdiv1,lotteryLogTotal[0][i]);
							}
						}
						if(c>0){ createElement("div",{"style":"position:relative;display:inline-block;"},newdiv,"&nbsp;=&nbsp;"+c+sign_mult); }

						var changedLots=0;
						newdiv=createElement("div",{"style":""},newtd);
						newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["exchangedLots"]); },false);
						for(var i=0;i<lotteryLogTotal[1].length;i++){
							if(lotteryLogTotal[1][i]>0){
								changedLots += lotteryLogTotal[1][i];
								newdiv1=createElement("div",{"style":"position:relative;display:inline-block;margin-right:2px;"},newdiv);
								createElement("img",{"style":"width:20px;border:0;","src":GFX+"city/"+i+".jpg"},newdiv1);
								createElement("span",{},newdiv1,lotteryLogTotal[1][i]);
							}
						}
						if(changedLots>0){ createElement("div",{"style":"position:relative;display:inline-block;"},newdiv,"&nbsp;=&nbsp;"+changedLots+sign_mult); }

						var c,sum=0;
						newtable1=createElement("table",{"style":"display:inline-block;padding-right:5px;margin-right:5px;","border":"0","cellspacing":"0"},newtd);
						for(var prod in lotteryLogTotal[2]){
							if(!lotteryLogTotal[2].hasOwnProperty(prod)){ continue; }
							newtr1=createElement("tr",{"class":"link hoverBgLightblue","prod":prod},newtable1);
							newtr1.addEventListener("mouseover",function(event){ showGoToMarketToolTip(event,this.getAttribute("prod")); },false);
							newtr1.addEventListener("click",function(){showMarket(this.getAttribute("prod"));},false);
							produktPic(prod,createElement("td",{},newtr1));
							createElement("td",{"style":"text-align:right;"},newtr1,numberFormat(lotteryLogTotal[2][prod]));
							createElement("td",{"style":"padding-right:5px;"},newtr1,prodName[prod]);
							c=lotteryLogTotal[2][prod]*gut[prod];
							sum += c;
							createElement("td",{"style":"text-align:right;"},newtr1,moneyFormat(c));
						}
						newtr1=createElement("tr",{},newtable1);
						createElement("td",{"colspan":"2"},newtr1);
						createElement("td",{"style":"border-top:1px solid black;"},newtr1,sign_sum);
						createElement("td",{"style":"border-top:1px solid black;text-align:right;"},newtr1,moneyFormat(sum));
						newtr1=createElement("tr",{},newtable1);
						createElement("td",{"colspan":"2"},newtr1);
						createElement("td",{},newtr1,sign_average);
						createElement("td",{"style":"text-align:right;"},newtr1,moneyFormat(sum/changedLots));

						c=0;
						newtd=createElement("td",{},newtr);
						for(var i=0;i<lotteryLogTotal[3].length;i++){
							if(lotteryLogTotal[3][i]>0){
								c += lotteryLogTotal[3][i];
								newdiv1=createElement("div",{"style":"position:relative;display:inline-block;margin-right:2px;"},newdiv);
								createElement("img",{"style":"width:20px;border:0;","src":GFX+"city/"+i+".jpg"},newdiv1);
								createElement("span",{},newdiv1,lotteryLogTotal[3][i]);
							}
						}
						if(c>0){ createElement("div",{"style":"position:relative;display:inline-block;"},newdiv,"&nbsp;=&nbsp;"+c+sign_mult); }




					}else{
						createElement("th",{"style":"white-space:nowrap;"},newtr,texte["tag"]);
						createElement("th",{"style":"white-space:nowrap;"},newtr,texte["dailyTicket"]);
						createElement("th",{"style":"white-space:nowrap;"},newtr,texte["boughtTickets"]);

						for(var v in lotteryLog){
							if(!lotteryLog.hasOwnProperty(v)){ continue; }
							newtr=createElement("tr",{},newtbody);
							createElement("td",{},newtr,v);

							if(v.match(/\d+\.\d+\.\d+/)){
								newtd=createElement("td",{},newtr);
								newdiv=createElement("div",{"style":"display:inline-block;margin-right:3px;vertical-align:top;"},newtd);
								if(lotteryLog[v][0]>0){ createElement("img",{"style":"width:20px;border:0;","src":GFX+"city/"+lotteryLog[v][0]+".jpg"},newdiv); }
								if(lotteryLog[v][1]){
									var c,sum=0;
									newtable1=createElement("table",{"style":"display:inline-block;border-right:1px solid black;padding-right:5px;margin-right:5px;","border":"0","cellspacing":"0"},newtd);
									for(var prod in lotteryLog[v][1]){
										if(!lotteryLog[v][1].hasOwnProperty(prod)){ continue; }
										newtr1=createElement("tr",{"class":"link hoverBgLightblue","prod":prod},newtable1);
										newtr1.addEventListener("mouseover",function(event){ showGoToMarketToolTip(event,this.getAttribute("prod")); },false);
										newtr1.addEventListener("click",function(){showMarket(this.getAttribute("prod"));},false);
										produktPic(prod,createElement("td",{},newtr1));
										createElement("td",{"style":"text-align:right;"},newtr1,numberFormat(lotteryLog[v][1][prod]));
										createElement("td",{"style":"padding-right:5px;"},newtr1,prodName[prod]);
										c=lotteryLog[v][1][prod]*gut[prod];
										sum += c;
										createElement("td",{"style":"text-align:right;"},newtr1,moneyFormat(c));
									}
									createElement("div",{"style":"display:inline-block;vertical-align:bottom;"},newtd,moneyFormat(sum));
								}

								newtd=createElement("td",{},newtr);
								if(lotteryLog[v][2]){
									for(var w=0;w<lotteryLog[v][2].length;w++){
										createElement("img",{"style":"width:20px;border:0;","src":GFX+"city/"+lotteryLog[v][2][w]+".jpg"},newtd);
									}
								}
							}else{
								newtd=createElement("td",{},newtr);
								newdiv=createElement("div",{"style":"margin-bottom:3px;"},newtd);
								newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["keptLots"]); },false);
								var c=0;
								for(var i=0;i<lotteryLog[v][0].length;i++){
									if(lotteryLog[v][0][i]>0){
										c += lotteryLog[v][0][i];
										newdiv1=createElement("div",{"style":"position:relative;display:inline-block;margin-right:2px;"},newdiv);
										createElement("img",{"style":"width:20px;border:0;","src":GFX+"city/"+i+".jpg"},newdiv1);
										createElement("span",{},newdiv1,lotteryLog[v][0][i]);
									}
								}
								if(c>0){ createElement("div",{"style":"position:relative;display:inline-block;"},newdiv,"&nbsp;=&nbsp;"+c+sign_mult); }

								var changedLots=0;
								newdiv=createElement("div",{"style":""},newtd);
								newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["exchangedLots"]); },false);
								for(var i=0;i<lotteryLog[v][1].length;i++){
									if(lotteryLog[v][1][i]>0){
										changedLots += lotteryLog[v][1][i];
										newdiv1=createElement("div",{"style":"position:relative;display:inline-block;margin-right:2px;"},newdiv);
										createElement("img",{"style":"width:20px;border:0;","src":GFX+"city/"+i+".jpg"},newdiv1);
										createElement("span",{},newdiv1,lotteryLog[v][1][i]);
									}
								}
								if(changedLots>0){ createElement("div",{"style":"position:relative;display:inline-block;"},newdiv,"&nbsp;=&nbsp;"+changedLots+sign_mult); }

								var sum=0;
								for(var prod in lotteryLog[v][2]){
									if(!lotteryLog[v][2].hasOwnProperty(prod)){ continue; }
									newdiv=createElement("div",{"class":"link hoverBgLightblue","prod":prod,"style":"position:relative;display:inline-block;margin-right:3px;"},newtd);
									newdiv.addEventListener("mouseover",function(event){ showGoToMarketToolTip(event,this.getAttribute("prod")); },false);
									newdiv.addEventListener("click",function(){showMarket(this.getAttribute("prod"));},false);
									produktPic(prod,newdiv);
									createElement("span",{"style":"text-align:right;"},newdiv,numberFormat(lotteryLog[v][2][prod]));
									c=lotteryLog[v][2][prod]*gut[prod];
									sum += c;
								}
								createElement("div",{},newtd,moneyFormat(sum)+"&nbsp;("+sign_average+moneyFormat(sum/changedLots)+")");

								c=0;
								newtd=createElement("td",{},newtr);
								for(var i=0;i<lotteryLog[v][3].length;i++){
									if(lotteryLog[v][3][i]>0){
										c += lotteryLog[v][3][i];
										newdiv1=createElement("div",{"style":"position:relative;display:inline-block;margin-right:2px;"},newdiv);
										createElement("img",{"style":"width:20px;border:0;","src":GFX+"city/"+i+".jpg"},newdiv1);
										createElement("span",{},newdiv1,lotteryLog[v][3][i]);
									}
								}
								if(c>0){ createElement("div",{"style":"position:relative;display:inline-block;"},newdiv,"&nbsp;=&nbsp;"+c+sign_mult); }
							}
						}
					}
					newthead=null;newtable=null;newtbody=null;newtd=null;newdiv=null;newtable1=null;newtr1=null;newtr=null;
				}
				buildLotteryLogTable();
			}
			break;
			case "upjersWerbung":{
				createElement("div",{"align":"center","style":"font-weight:bold;line-height:30px;"},infoPanelInner,texte["upjersWerbung"]);
				for(var v=0;v<upjersWerbung.length;v++){
					createElement("div",{"style":"padding:5px;margin:5px;border:1px solid black;"},infoPanelInner,upjersWerbung[v]);
				}
			}
			break;
			}
			raiseEvent("gameInfoPanelOpen");
			infoPanelInner=null;
			newtable=null;newthead=null;newtbody=null;newtfoot=null;newtr=null;newtd=null;newtd1=null;newdiv1=null;newinput=null;
		}
		newdiv=null;
	}

	// Profit
	newdiv=createElement("div",{"id":"divBeraterButtonsProfit","class":"link beraterButtonIcon hoverBgGreen","mouseOverText":texte["profitTable"]},$("divBeraterButtons"));
	createElement("img",{"src":GFX+"farmhouse/items/76_1.png","style":"position:relative;top:-5px;left:-5px;width:40px;height:40px;"},newdiv);
	newdiv.addEventListener("click",function(){buildInfoPanel("profit");},false);

	// Preise
	newdiv=createElement("div",{"id":"divBeraterButtonsPreise","class":"link beraterButtonIcon hoverBgGold","mouseOverText":texte["preise"]},$("divBeraterButtons"));
	createElement("img",{"src":GFX+"money.gif","style":"width:30px;height:30px;"},newdiv);
	newdiv.addEventListener("click",function(){buildInfoPanel("preise");},false);

	// Recipes and Powerups
	if(unsafeWindow.formulas){
		newdiv=createElement("div",{"id":"divBeraterButtonsFormulas","class":"link beraterButtonIcon hoverBgBlue","mouseOverText":texte["rezepte"]},$("divBeraterButtons"));
		createElement("img",{"src":GFX+"farmhouse/catalogue.gif","style":"position:relative;top:3px;left:3px;width:24px;height:24px;"},newdiv);
		newdiv.addEventListener("click",function(){buildInfoPanel("formulas");},false);

		unsafeWindow._showPowerUps=unsafeWindow.showPowerUps;
		unsafeWindow.showPowerUps = function showPowerUps(){
			unsafeWindow._showPowerUps();
			var cand=$("powerselectorcontent").getElementsByClassName("blackbox");
			for(var v=0;v<cand.length;v++){
				if(cand[v].id.match(/^formulatimer\d+$/)){
					cand[v].style.top="47px";
				}
			}
			cand=null;
		};
		unsafeWindow.showPowerUps();

	}

	/*// Uebersicht
newdiv=$("titlepig");
newdiv.setAttribute("class","link");
newdiv.addEventListener("click",function(){ buildInfoPanel("zonen"); },false);
newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["uebersicht"]); },false);*/

	// Farmpedia
	newdiv=createElement("a",{"href":texte["farmpediaUrl"],"target":"_blank","style":"position:absolute;top:90px;left:100px;z-index:2;","class":"link"},$("rackBottom"));
	createElement("img",{"style":"width:25px;height:25px;border:none;","src":GFX+"points.gif"},newdiv);
	newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["zurFarmpedia"]); },false);

	// Quest
	// missing product amounts
	$("questline").addEventListener("mouseover",function(event){
		var newdiv=createElement("div");
		var newtable=createElement("table",{"class":"white","border":"0","cellspacing":"0","cellpadding":"3","style":"line-height:16px;"},newdiv);
		var newtr=createElement("tr",{},newtable);
		var newtd=createElement("td",{"colspan":"3","style":"text-align:center;border-bottom:1px solid white;"},newtr,questNr+".");
		createElement("td",{"colspan":"2","style":"text-align:center;border-bottom:1px solid white;border-left:1px solid white;"},newtr,texte["fehlt"]);
		createElement("td",{"colspan":"2","style":"text-align:center;border-bottom:1px solid white;border-left:1px solid white;"},newtr,texte["total"]);

		var sumWertTotal=0;
		var sumWert=0;
		for(var v=0;v<QUESTS[questNr][0].length;v++){
			var questWare=QUESTS[questNr][0][v][0];
			var questMengeTotal=QUESTS[questNr][0][v][1];
			var questMenge=Math.max(0,questMengeTotal-prodBestand[questWare]);
			var preis=!isNaN(NPC[questWare])?Math.min(gut[questWare],NPC[questWare]):gut[questWare];
			var wertTotal=questMengeTotal*preis;
			var wert=questMenge*preis;
			sumWertTotal += wertTotal;
			sumWert += wert;
			newtr=createElement("tr",{},newtable);
			newtd=createElement("td",{},newtr);
			produktPic(questWare,newtd);
			createElement("td",{},newtr,prodName[questWare]);
			createElement("td",{"style":"text-align:right;"},newtr,numberFormat(100*(questMengeTotal-questMenge)/questMengeTotal)+"%");
			createElement("td",{"style":"text-align:right;border-left:1px solid white;"},newtr,numberFormat(questMenge));
			createElement("td",{"style":"text-align:right;padding-left:10px;"},newtr,moneyFormatInt(wert));
			createElement("td",{"style":"text-align:right;border-left:1px solid white;"},newtr,numberFormat(questMengeTotal));
			createElement("td",{"style":"text-align:right;padding-left:10px;"},newtr,moneyFormatInt(wertTotal));
		}

		newtr=createElement("tr",{},newtable);
		createElement("td",{"colspan":"2","style":"border-top:1px solid white;"},newtr);
		createElement("td",{"style":"text-align:right;border-top:1px solid white;"},newtr,numberFormat(100*(sumWertTotal-sumWert)/(sumWertTotal))+"%");
		createElement("td",{"style":"text-align:right;border-top:1px solid white;","colspan":"2"},newtr,moneyFormatInt(sumWert));
		createElement("td",{"style":"text-align:right;border-top:1px solid white;","colspan":"2"},newtr,moneyFormatInt(sumWertTotal));

		showToolTip(event,newdiv.innerHTML,this);
		newdiv=null;newtable=null;newtr=null;newtd=null;
	},false);

	var highlightProducts=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_highlightProducts","[-1,-1,false]"));
	if(QUESTS[questNr] && highlightProducts[2]){
		highlightProducts[0]=QUESTS[questNr][0][0]?-1:QUESTS[questNr][0][0][0];
		highlightProducts[1]=QUESTS[questNr][0][1]?-1:QUESTS[questNr][0][1][0];
		GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_highlightProducts",implode(highlightProducts));
	}

	// Questspoiler
	unsafeWindow._showQuests=unsafeWindow.showQuests;
	unsafeWindow.showQuests = function(){
		// GM_log("showQuests");
		// unsafeWindow.userquests=explode('{"21":{"0":2,"1":[[[7,1350,"Sonnenblumen"],[12,50,"Honig"]],0,0,0],"2":[78375,0,0,0,0,63,0],"3":0,"4":20,"5":1,"6":"Quest: Cereal Bars (21)","7":"BlaBla.","8":86400,"9":0,"10":0,"iname63":"Katze","11":"0","12":"0"}}');
		// GM_log(implode(unsafeWindow.userquests));
		unsafeWindow._showQuests();
		var div;
		if(unsafeWindow.userquests){
			// a quest is active, the questline is plotted
			for(var v in unsafeWindow.userquests){
				if(!unsafeWindow.userquests.hasOwnProperty(v)){ continue; }
				// save quest-state
				unsafeWindow.GMquestState=2;
				var help=parseInt(v,10);
				if(help!=questNr){
					questNr=help;
					unsafeWindow.GMquestNr=questNr;
					GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_quest",questNr);
					if(QUESTS[questNr] && highlightProducts[2]){
						highlightProducts[0]=QUESTS[questNr][0][0]?-1:QUESTS[questNr][0][0][0];
						highlightProducts[1]=QUESTS[questNr][0][1]?-1:QUESTS[questNr][0][1][0];
						GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_highlightProducts",implode(highlightProducts));
					}
					calcProdMinRack();
				}
				if(questTime!=0){
					questTime=0;
					GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_questTime",questTime);
				}
				// change the questline
				var questline=$("questline");
				// needed products
				for(var w=0;w<unsafeWindow.userquests[v][1][0].length;w++){
					questline.children[w+1].children[1].innerHTML=numberFormat(unsafeWindow.userquests[v][1][0][w][1],0,"","").replace(/(\d{3,})(\d{3})/,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2");
					questline.children[w+1].setAttribute("class","link");
					questline.children[w+1].addEventListener("click",function(){
						showMarket(this.getElementsByTagName("div")[0].getAttribute("class").replace(/(kp|main_float_left| )/ig,""));
						//showMarket(this.getElementsByTagName("img")[0].getAttribute("class").replace("kp",""));
					},false);
					div=$("qinfo"+v+w);
					div.innerHTML=texte["goToMarketOfX"].replace(/%1%/,div.innerHTML);
				}
				// awarded points
				div=questline.children[unsafeWindow.userquests[v][1][0].length+1].children[1];
				div.innerHTML=numberFormat(unsafeWindow.userquests[v][2][0],0,"","").replace(/(\d{3,})(\d{3})/,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2");
				div.style.top="0px";
				div.style.fontSize="11px";
				questline=null;
				raiseEvent("gameQuestActive");
				raiseEvent("gameQuestSolvable");
			}
		}else if((div=$("tutorialline"))&&(div.style.display!="none")){
			unsafeWindow.GMquestNr=0;
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_quest",questNr);
			questTime=now;
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_questTime",questTime);
			$("questlineopener").style.display="none";
			$("questlineback").style.display="none";
		}else{
			//questNr=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_quest",1);
			if (questTime==0){
				unsafeWindow.GMquestNr=++questNr; //assume old quest solved
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_quest",questNr);
				questTime=now+(86400*QUESTS[questNr][1]); //set 24h/48h cooldown assuming quest just solved
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_questTime",questTime);
				if(QUESTS[questNr] && highlightProducts[2]){
					highlightProducts[0]=QUESTS[questNr][0][0]?-1:QUESTS[questNr][0][0][0];
					highlightProducts[1]=QUESTS[questNr][0][1]?-1:QUESTS[questNr][0][1][0];
					GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_highlightProducts",implode(highlightProducts));
				}
				calcProdMinRack();
			}
			if(QUESTS[questNr]){
				div=$("questlineopener");
				div.style.display="block";
				div.style.height="25px";
				//$("questlineback").style.display=show[0]?"block":"none";
				$("questlineback").style.height="25px";
				var questline=$("questline");
				//questline.style.display=show[0]?"block":"none";
				questline.style.height="25px";
				questline.innerHTML="";

				if(questTime<now){
					unsafeWindow.GMquestState=1;
					createElement("div",{"style":"position:absolute;top:5px;left:5px;width:95px;height:15px;"},questline,"");
					//GM_log("questTime:"+getDateStr(questTime) + " " + getDaytimeStr(questTime));
					raiseEvent("gameQuestNewAvailable");
				}else{
					unsafeWindow.GMquestState=0;
					createElement("div",{"style":"position:absolute;top:5px;left:5px;width:95px;height:15px;"},questline,getDaytimeStr(questTime,1)+"&nbsp;"+texte["uhr"]);
				}

				var newdiv=createElement("div",{"class":"link","style":"position:absolute;top:5px;left:100px;width:40px;height:15px;","onmouseover":"showDiv('qinfo"+questNr+"0')","onmouseout":"hideDiv('qinfo"+questNr+"0')"},questline);
				newdiv.addEventListener("click",function(){
					showMarket(this.getElementsByTagName("img")[0].getAttribute("class").replace("kp",""));
				},false);
				var newdiv1=createElement("div",{"style":"position:absolute;top:0;left:0;height:15px;width:15px;overflow:hidden;"},newdiv);
				createElement("img",{"style":"position:absolute;","class":"kp"+QUESTS[questNr][0][0][0]},newdiv1);
				if(QUESTS[questNr][0][0][1]<100000){
					createElement("div",{"style":"position: absolute; left: 18px; top: 0px;"},newdiv,numberFormat(QUESTS[questNr][0][0][1]));
				}else{
					createElement("div",{"style":"position: absolute; left: 18px; top: 0px;"},newdiv,numberFormat(QUESTS[questNr][0][0][1]/1000)+"k");
				}

				if(QUESTS[questNr][0][1]){
					newdiv=createElement("div",{"class":"link","style":"position:absolute;top:5px;left:162px;width:40px;height:15px;","onmouseover":"showDiv('qinfo"+questNr+"1')","onmouseout":"hideDiv('qinfo"+questNr+"1')"},questline);
					newdiv.addEventListener("click",function(){
						showMarket(this.getElementsByTagName("img")[0].getAttribute("class").replace("kp",""));
					},false);
					newdiv1=createElement("div",{"style":"position:absolute;top:0;left:0;height:15px;width:15px;overflow:hidden;"},newdiv);
					createElement("img",{"style":"position:absolute;","class":"kp"+QUESTS[questNr][0][1][0]},newdiv1);
					if(QUESTS[questNr][0][1][1]<100000){
						createElement("div",{"style":"position: absolute; left: 18px; top: 0px;"},newdiv,numberFormat(QUESTS[questNr][0][1][1]));
					}else{
						createElement("div",{"style":"position: absolute; left: 18px; top: 0px;"},newdiv,numberFormat(QUESTS[questNr][0][1][1]/1000)+"k");
					}
				}

				newdiv=createElement("div",{"style":"position:absolute;top:5px;left:224px;width:40px;height:15px;","onmouseover":"showDiv('02qinfo');","onmouseout":"hideDiv('02qinfo');"},questline);
				newdiv1=createElement("div",{"style":"position:absolute;top:0px;left:0px;height:15px;width:15px;"},newdiv);
				createElement("img",{"src":GFX+"points.gif","width":"15","border":"0","height":"15"},newdiv1);
				createElement("div",{"style":"position:absolute;left:20px;top:0px;"},newdiv,numberFormat(QUESTS[questNr][2]));
				newdiv1=createElement("div",{"style":"position:absolute;left:10px;top:-1px;"},newdiv);
				createElement("img",{"src":GFX+"quest_up.gif","border":"0"},newdiv1);

				createElement("div",{"id":"qinfo"+questNr+"0","class":"blackbox","style":"position:absolute;display:none;z-index:100;top:-20px;left:100px;"},questline,texte["goToMarketOfX"].replace(/%1%/,prodName[QUESTS[questNr][0][0][0]]));
				if(QUESTS[questNr][0][1]){
					createElement("div",{"id":"qinfo"+questNr+"1","class":"blackbox","style":"position:absolute;display:none;z-index:100;top:-20px;left:162px;"},questline,texte["goToMarketOfX"].replace(/%1%/,prodName[QUESTS[questNr][0][1][0]]));
				}
				createElement("div",{"id":"02qinfo","class":"blackbox","style":"position:absolute;display:none;z-index:100;top:-20px;left:224px;"},questline,texte["punkte"]);

				questline=null;newdiv=null;newdiv1=null;
			}
		}
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_questState",unsafeWindow.GMquestState);
		div=null;
		unsafeWindow.showquestline=show[0]?0:1;
		unsafeWindow.handleQuestLine();
	};
	unsafeWindow.showQuests();

	unsafeWindow._getInitQuestResponse=unsafeWindow.getInitQuestResponse;
	unsafeWindow.getInitQuestResponse = function(request,usecity,questbox){
		//GM_log("getInitQuestResponse");
		unsafeWindow._getInitQuestResponse(request,usecity,questbox);
		if( request.readyState == 4 && request.status == 200 ){
			var response=request.responseText;
			if(response == 0){
				// no quest
				unsafeWindow.showQuests();
			}else{
				// quest can be activated
				if(unsafeWindow.unsolvedquests){
					for(var v in unsafeWindow.unsolvedquests){
						questNr=parseInt(v,10);
						unsafeWindow.GMquestNr=questNr;
						GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_quest",questNr);
						break;
					}
					unsafeWindow.showQuests();
				}
			}
		}
	};

	unsafeWindow._getQuestsResponse=unsafeWindow.getQuestsResponse;
	unsafeWindow.getQuestsResponse = function(request){
		//GM_log("getQuestsResponse");
		unsafeWindow._getQuestsResponse(request);
		if( request.readyState == 4 && request.status == 200 ){
			var response=request.responseText;
			if(response == 0){ // no quest
				unsafeWindow.showQuests();
			}
		}
	};

	// solving quest
	unsafeWindow._finishQuestResponse=unsafeWindow.finishQuestResponse;
	unsafeWindow.finishQuestResponse = function(request,quest){
		unsafeWindow._finishQuestResponse(request,quest);
		if(checkRequest(request)){
			unsafeWindow.GMquestNr=++questNr; // old quest solved
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_quest",questNr);
			questTime=now+(86400*QUESTS[questNr][1]); //set 24h/48h cooldown
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_questTime",questTime);
			unsafeWindow.showQuests();
			raiseEvent("gameQuestFinished");
		}
	};

	unsafeWindow._setQuestResponse=unsafeWindow.setQuestResponse;
	unsafeWindow.setQuestResponse = function(request,quest){
		unsafeWindow._setQuestResponse(request,quest);
		if(checkRequest(request)){
			raiseEvent("gameQuestAccepted");
		}
	};
	// correct opening of the questline
	unsafeWindow._handleQuestLine=unsafeWindow.handleQuestLine;
	unsafeWindow.handleQuestLine = function(){
		//GM_log("handleQuestLine");
		unsafeWindow._handleQuestLine();
		show[0]=(unsafeWindow.showquestline==1);
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_show",implode(show));
	};
	unsafeWindow.showquestline=show[0]?0:1;
	unsafeWindow.handleQuestLine();

	// quest growtime-boni
	var farmiZahl=6;
	/*
	if(questNr>51){ growTime[23]-=15;
	if(questNr>54){ growTime[24]-=15;
	if(questNr>57){ growTime[31]-=15;
	if(questNr>59){ growTime[21]-=10;
	if(questNr>61){ growTime[29]-=15;
	if(questNr>64){ growTime[33]-=15;
	if(questNr>65){ farmiZahl++;
	if(questNr>66){ growTime[22]-=10;
	if(questNr>68){ growTime[34]-=15;
	if(questNr>71){ growTime[35]-=20;
	if(questNr>74){ growTime[36]-=15;
	if(questNr>76){ growTime[7]-=10;
	if(questNr>78){ growTime[37]-=30;
	if(questNr>81){ growTime[38]-=15;
	if(questNr>81){ growTime[19]-=5;
	if(questNr>85){ growTime[39]-=30;
	if(questNr>88){ growTime[40]-=30;
	if(questNr>90){ growTime[20]-=10;
	if(questNr>92){ growTime[41]-=30;
	if(questNr>94){ growTime[8]-=15;
	if(questNr>95){ farmiZahl++;
	if(questNr>96){ growTime[26]-=15;
	if(questNr>98){ growTime[42]-=30;
	if(questNr>100){ growTime[33]-=15;
	if(questNr>103){ growTime[32]-=10;
	if(questNr>106){ growTime[43]-=10;
	}}}}}}}}}}}}}}}}}}}}}}}}}}
	*/
	for(var v=1;v<questNr;v++){
		if(QUESTS[v][3]){
			if(QUESTS[v][3][0]==4){
				growTime[QUESTS[v][3][1]]-=QUESTS[v][3][2];
			}else if(QUESTS[v][3][0]==5){
				farmiZahl++;
			}
		}
	}
	unsafeWindow.GMgrowTime=growTime.slice();

	/*
	// SHOW PLANT DATA
	var div=createElement("div",{"style":"z-index:999;position:absolute;top:0;background-color:white;height:800px;overflow:auto;padding-right:20px;"},ALL);
	var table=createElement("table",{"border":"1"},div);
	var tr=createElement("tr",{},table);
	var td=createElement("td",{"style":"white-space:nowrap;"},tr,"prodName");
	createElement("td",{"style":"white-space:nowrap;"},tr,"prodName");
	createElement("td",{},tr,"prodTyp");
	createElement("td",{},tr,"prodBestand");
	createElement("td",{},tr,"prodMinRack");
	createElement("td",{},tr,"prodMinRackInit");
	createElement("td",{},tr,"prodPlantSize");
	createElement("td",{},tr,"prodBlock");
	createElement("td",{},tr,"growTime");
	createElement("td",{},tr,"POINTS");

	for(var v=0;v<prodName.length;v++){
		tr=createElement("tr",{},table);
		createElement("td",{},tr,v);
		td=createElement("td",{"style":"white-space:nowrap;"},tr);
			produktPic(v,td);
			createElement("span",{},td,prodName[v]);
		td=createElement("td",{},tr,prodTyp[v]);
		td=createElement("td",{},tr,prodBestand[v]);
		td=createElement("td",{},tr,prodMinRack[v]);
		td=createElement("td",{},tr,prodMinRackInit[v]);
		td=createElement("td",{},tr,prodPlantSize[v]);
		td=createElement("td",{},tr,prodBlock[v]);
		td=createElement("td",{},tr,growTime[v]);
		td=createElement("td",{},tr,POINTS[v]);
	}
	*/

	// Notepad for Non-Premium
	newdiv=$("friendlistbeside");
	if(!newdiv.innerHTML.match(/initNotepad\(\)/)){
		newdiv=createElement("img",{"id":"beraterNotepad","class":"link","style":"margin-bottom:10px;"},newdiv);
		createElement("img",{"src":GFX+"guild/contract.gif","style":"width:15px;height:15px;"},newdiv);
		newdiv.addEventListener("mouseover",function(event){ showToolTip(event,unsafeWindow.lng_t_notizen); },false);
		newdiv.addEventListener("click",function(){
			$("notepadentry").value=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_notepad","");
			unsafeWindow.calcNotepadLetters();
			unsafeWindow.showDiv("notepad");
		},false);
		newdiv=$("notepadheader");
		newdiv.getElementsByTagName("img")[0].removeAttribute("onclick");
		newdiv.getElementsByTagName("img")[0].addEventListener("click",function(){
			GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_notepad",$("notepadentry").value);
			unsafeWindow.hideDiv("notepad");
		},false);
	}

	// BuyNotepad
	var modeBuyNotepad=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeBuyNotepad",0);
	function doBuyNotepad(){
		if(!show[1]){ return false; } // no calculation if table is hidden
		var newdiv=$("buyNotepad");
		if(newdiv){
			var prodMissing=new Object();
			var drawProductLines=false;
			// calculate missing products
			for(var v=0;v<prodNameSort.length;v++){
				var prod=prodNameSort[v];
				var amount=prodMinRack[prod]-prodBestand[prod];
				if (amount>0){
					prodMissing[prod]=[amount,amount*(gut[prod]?gut[prod]:0)];
				}
			}
			// sorting
			switch(modeBuyNotepad){
			case 0:	drawProductLines=true; break;
			case 1:	drawProductLines=true;
			prodMissing.sortObj(function(a,b){
				if(prodTyp[a[0]]==prodTyp[b[0]]){
					return(b[1][0]-a[1][0]);
				}else{
					return({"c":0,"v":1,"e":2,"z":3}[prodTyp[a[0]]]-{"c":0,"v":1,"e":2,"z":3}[prodTyp[b[0]]]);
				}
			}); break;
			case 2:	drawProductLines=true;
			prodMissing.sortObj(function(a,b){
				if(prodTyp[a[0]]==prodTyp[b[0]]){
					return(a[1][0]-b[1][0]);
				}else{
					return({"c":0,"v":1,"e":2,"z":3}[prodTyp[a[0]]]-{"c":0,"v":1,"e":2,"z":3}[prodTyp[b[0]]]);
				}
			}); break;
			case 3:	prodMissing.sortObj(function(a,b){return (a[1][0]-b[1][0]);}); break;
			case 4:	prodMissing.sortObj(function(a,b){return (a[1][0]-b[1][0]);},true); break;
			case 5:	prodMissing.sortObj(function(a,b){return (a[1][1]-b[1][1]);}); break;
			case 6:	prodMissing.sortObj(function(a,b){return (a[1][1]-b[1][1]);},true); break;
			}

			// creating table
			newdiv.innerHTML="";
			var newtable=createElement("table",{"border":"0","cellspacing":"0","cellpadding":"0"},newdiv);
			var newtr=createElement("tr",{"class":"link"},newtable);
			newtr.addEventListener("click",function(){
				modeBuyNotepad=(modeBuyNotepad+1)%7;
				GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_modeBuyNotepad",modeBuyNotepad);
				doBuyNotepad();
			},false);
			newtr.addEventListener("mouseover",function(event){showToolTip(event,"Sortingmode: "+["Producttype, id","Producttype, amount","Producttype, amount descending","amount","amount descending","value","value descending"][modeBuyNotepad]+"<br>Click to change");},false);
			var newtd=createElement("td",{"colspan":"4","style":"border-bottom:1px solid black;text-align:center;"},newtr,texte["fehlt"]);

			var oldType=null;
			var newType=null;
			for(var prod in prodMissing){
				if(!prodMissing.hasOwnProperty(prod)){ continue; }
				var amountForFarmis=valMinRackFarmis?((totalFarmis[prod]?totalFarmis[prod]:0)-prodBestand[prod]):0;
				var str='<table class="white">';
				str += '<tr><th colspan="3" style="border-bottom:1px solid white;">'+texte["goToMarketOfX"].replace(/%1%/,prodName[prod])+'</th></tr>';
				str += '<tr><td>'+texte["minRack"]+'</td><td></td><td style="text-align:right;">'+numberFormat(prodMinRackInit[prod])+'</td></tr>';
				if(valMinRackQuest&&totalQuest[prod]){ str += '<tr><td>'+texte["quest"]+'</td><td>+</td><td style="text-align:right;">'+numberFormat(totalQuest[prod])+'</td></tr>'; }
				if(valMinRackFarmis&&totalFarmis[prod]){ str += '<tr><td>'+unsafeWindow.customerarecalled.replace(/%FARMI%/,"")+'</td><td>+</td><td style="text-align:right;">'+numberFormat(totalFarmis[prod])+'</td></tr>'; }
				str += '<tr><td>'+texte["bestand"]+'</td><td>-</td><td style="text-align:right;">'+numberFormat(prodBestand[prod])+'</td></tr>';
				if(valMinRackGrowing){
					if(totalErnte[prod]){
						amountForFarmis -= totalErnte[prod];
						str += '<tr><td>'+texte["produktion"]+'</td><td>-</td><td style="text-align:right;">'+numberFormat(totalErnte[prod])+'</td></tr>';
					}
					if(totalPowerups[prod]){
						amountForFarmis -= totalPowerups[prod];
						str += '<tr><td>'+texte["powerups"]+'</td><td>-</td><td style="text-align:right;">'+numberFormat(totalPowerups[prod])+'</td></tr>';
					}
				}
				if(prodMinRackAddon[prod]){
					for(var k in prodMinRackAddon[prod]){
						if(!prodMinRackAddon[prod].hasOwnProperty(k)){ continue; }
						str += '<tr><td>'+k+'</td><td>'+(prodMinRackAddon[prod][k]>0?'+':'-')+'</td><td style="text-align:right;">'+numberFormat(prodMinRackAddon[prod][k])+'</td></tr>';
					}
				}
				str += '<tr><td colspan="3" style="border-bottom:1px solid white;"></td></tr>';
				str += '<tr><td>'+texte["marktpreis"]+'</td><td></td><td style="text-align:right;">'+moneyFormat(gut[prod])+'</td></tr>';
				str += '<tr><td>'+texte["wert"]+'</td><td></td><td style="text-align:right;">'+moneyFormatInt(prodMissing[prod][1])+'</td></tr>';
				str += '</table>';

				newType=prodTyp[prod];
				newtr=createElement("tr",{"class":"link hoverBgCc9"+((drawProductLines&&(oldType!=null)&&(oldType!=newType))?" borderTop1dashedBlack":""),"prodId":prod,"mouseOverText":str},newtable);
				oldType=newType;
				newtr.addEventListener("click",function(){showMarket(this.getAttribute("prodId"));},false);
				newtr.addEventListener("mouseover",function(event){showToolTip(event,this.getAttribute("mouseOverText"));},false);
				newtd=createElement("td",{},newtr);
				produktPic(prod,newtd);
				createElement("td",{"style":"text-align:right;"},newtr,numberFormat(prodMissing[prod][0]));
				if(amountForFarmis>0){
					createElement("td",{"style":"padding-left:3px;text-align:right;"},newtr,"("+numberFormat(amountForFarmis)+")");
				}else{
					createElement("td",{},newtr);
				}
				createElement("td",{"style":"padding-left:3px;"},newtr,prodName[prod]);
			}
			if(newtable.childElementCount==1){
				newtr=createElement("tr",{},newtable);
				createElement("td",{"colspan":"4","style":"text-align:center;"},newtr,"---");
			}
			newtable=null;newtr=null;newtd=null;
		}
		newdiv=null;
	}
	newdiv=ALL.getElementsByClassName("rahmen_hoch")[2];
	newdiv.firstElementChild.style.marginBottom="-90px";
	newdiv=createElement("div",{"style":"position:relative;display:block;white-space:nowrap;"},newdiv);
	newdiv1=createElement("div",{"id":"buyNotepadOpener","class":"link","style":"display:inline-block;vertical-align:top;height:25px;width:20px;background:no-repeat scroll center top #000000;"},newdiv);
	createElement("div",{"id":"buyNotepad","style":"display:"+(show[1]?"inline-block":"none")+";vertical-align:top;border:2px inset black;background-color:white;padding:3px;"},newdiv);
	newdiv1.style.backgroundImage="url('"+GFX+"arrow_"+(show[1]?"left":"right")+".png')";
	newdiv1.addEventListener("click",function(){
		show[1]=!show[1];
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_show",implode(show));
		if(show[1]){
			this.style.backgroundImage="url('"+GFX+"arrow_left.png')";
			$("buyNotepad").style.display="inline-block";
			doBuyNotepad();
		}else{
			this.style.backgroundImage="url('"+GFX+"arrow_right.png')";
			$("buyNotepad").style.display="none";
		}
	},false);
	calcProdMinRackInit(); // this calls finally doBuyNotepad!

	// MarketoffersNotepad
	function doMarketoffersNotepad(){
		if(!show[2]){ return false; } // no calculation if table is hidden
		var newdiv=$("marketoffersNotepad");
		if(newdiv){
			var marketOffers=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_marketOffers","{}"));
			newdiv.innerHTML="";
			var newtable=createElement("table",{"border":"0","cellspacing":"0","cellpadding":"0"},newdiv);
			var newtr=createElement("tr",{"class":"link"},newtable);
			var newtd=createElement("td",{"colspan":"5","style":"border-bottom:1px solid black;text-align:center;"},newtr,texte["marktstand"]);
			newtr.addEventListener("mouseover",function(event){
				var str='<table class="white">';
				str += '<tr><th colspan="2" style="border-bottom:1px solid white">'+texte["zumMarktstand"]+'</th></tr>';
				str += '<tr><td>'+sign_sum+'</td><td style="text-align:right;">'+moneyFormatInt(parseInt(this.getAttribute("value"),10))+'</td></tr>';
				str += '</table>';
				showToolTip(event,str);
			},false);
			newtr.addEventListener("click",function(){showMarketStall();},false);

			var sumTotal=0;
			var oldType=null;
			var newType=null;
			for(var prod in marketOffers){
				if(!marketOffers.hasOwnProperty(prod)){ continue; }
				newType=prodTyp[prod];
				for(var elem in marketOffers[prod]){
					if(!marketOffers[prod].hasOwnProperty(elem)){ continue; }
					var price=parseFloat(elem,10);
					sumTotal += marketOffers[prod][price]*price;
					newtr=createElement("tr",{"class":"link hoverBgCc9"+(((oldType!=null)&&(oldType!=newType))?" borderTop1dashedBlack":""),"prodId":prod,"value":(marketOffers[prod][price]*price)},newtable);
					oldType=newType;
					newtr.addEventListener("mouseover",function(event){
						showGoToMarketToolTip(event,this.getAttribute("prodId"),null,'<tr><td>'+sign_sum+'</td><td style="text-align:right;">'+moneyFormatInt(parseInt(this.getAttribute("value"),10))+'</td></tr>');
					},false);
					newtr.addEventListener("click",function(){showMarket(this.getAttribute("prodId"));},false);
					newtd=createElement("td",{},newtr);
					produktPic(prod,newtd);
					createElement("td",{"style":"text-align:right;"},newtr,numberFormat(marketOffers[prod][price]));
					createElement("td",{"style":"padding-left:3px;"},newtr,prodName[prod]);
					createElement("td",{"style":"padding-left:3px;text-align:right;"},newtr,numberFormat(Math.floor(price)));
					createElement("td",{"style":""},newtr,numberFormat(price,2).slice(-3).replace("00","--"));
				}
			}

			newtable.firstElementChild.setAttribute("value",sumTotal);
			if(newtable.childElementCount==1){
				newtr=createElement("tr",{},newtable);
				createElement("td",{"colspan":"5","style":"text-align:center;"},newtr,"---");
			}
			newtable=null;newtr=null;newtd=null;
		}
		newdiv=null;
	}
	newdiv=createElement("div",{"style":"position:relative;margin-top:5px;display:block;white-space:nowrap;"},ALL.getElementsByClassName("rahmen_hoch")[2]);
	newdiv=createElement("div",{"id":"marketoffersNotepadOpener","class":"link","style":"display:inline-block;vertical-align:top;height:25px;width:20px;background:no-repeat scroll center top #000000;"},newdiv);
	createElement("div",{"id":"marketoffersNotepad","style":"display:"+(show[2]?"inline-block":"none")+";vertical-align:top;border:2px inset black;background-color:white;padding:3px;"},$("marketoffersNotepadOpener").parentNode);
	newdiv.style.backgroundImage="url('"+GFX+"arrow_"+(show[2]?"left":"right")+".png')";
	newdiv.addEventListener("click",function(){
		show[2]=!show[2];
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_show",implode(show));
		if(show[2]){
			this.style.backgroundImage="url('"+GFX+"arrow_left.png')";
			$("marketoffersNotepad").style.display="inline-block";
		}else{
			this.style.backgroundImage="url('"+GFX+"arrow_right.png')";
			$("marketoffersNotepad").style.display="none";
		}
		doMarketoffersNotepad();
	},false);
	doMarketoffersNotepad();
	document.addEventListener("gameChangedMarketOffers",function(){window.setTimeout(doMarketoffersNotepad,0);},false);
	// Points and level
	var levelLog=new Object(); // levelLog[day]=[points,rank,market sales,contract sales,farmi money]
	try{ levelLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_levelLog","{}")); } catch(err){}
	// correct data (since 18.1.2011)
	for(var v in levelLog){
		if(!levelLog.hasOwnProperty(v)){ continue; }
		if(levelLog[v][0]==undefined){
			levelLog[v][0]=0;
		}else{
			if(isNaN(levelLog[v][0])){
				levelLog[v][0]=undefined;
			}else{
				levelLog[v][0]=parseInt(levelLog[v][0],10);
			}
		}
		if(levelLog[v][1]!=undefined){
			if(isNaN(levelLog[v][1])){
				levelLog[v][1]=undefined;
			}else{
				levelLog[v][1]=parseInt(levelLog[v][1],10);
			}
		}
		for(var w=2;w<5;w++){
			if(levelLog[v][w]==undefined){
				levelLog[v][w]=0;
			}else{
				if(isNaN(levelLog[v][w])){
					levelLog[v][w]=0;
				}else{
					levelLog[v][w]=Math.round(100*levelLog[v][w])/100;
				}
			}
		}
	}
	// get old data management (since 10.1.2011)
		for(var v in levelLog){
			if(!levelLog.hasOwnProperty(v)){ continue; }
			if(typeof levelLog[v]=="number"){ levelLog[v]=[levelLog[v],null,0,0,0]; }
		}
		try{
			var tagesumsatz=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_tagesumsatz"));
			for(var v in tagesumsatz){
				if(!tagesumsatz.hasOwnProperty(v)){ continue; }
				if(levelLog[v]){
					for(var i=0;i<3;i++){
						levelLog[v][i+2]=tagesumsatz[v][i];
					}
				}
			}
			GM_deleteValue(LNG+"_"+SERVER+"_"+USERNAME+"_tagesumsatz");
		} catch(err){}
		try{
			var rankLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_rankLog"));
			for(var v in rankLog){
				if(!rankLog.hasOwnProperty(v)){ continue; }
				if(levelLog[v]){ levelLog[v][1]=rankLog[v]; }
			}
			GM_deleteValue(LNG+"_"+SERVER+"_"+USERNAME+"_rankLog");
		} catch(err){}

	const LEVEL_POINTS=[0,0,58,2420,6620,15620,27900,58700,101700,163100,211900,276900,359000,467000,730000,1190000,1750000,2680000,3900000,5660000,7850000,10590000,15300000,20640000,26020000,37340000,50030000,65160000,85030000,108900000,139150000,175520000,222430000,276920000,345930000,429330000,535520000,669000000,797010000,927020000,1205126000,1566663800,2036662940,2647661820,3441960360,4500000000,4500000001];
	if(levelLog[serverTodayStr]==undefined){ levelLog[serverTodayStr]=[0,null,0,0,0]; }
	levelLog[serverTodayStr][0]=parseInt($("pkt").innerHTML.replace(/\D/g,""),10);
	function getDailyRanking(){
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/stats.php?type=1&self=1",
			headers: {"Content-type": "application/x-www-form-urlencoded"},
			onload: function(response){
				if(levelLog[serverTodayStr]==undefined){ levelLog[serverTodayStr]=[0,null,0,0,0]; }
				var help=(new RegExp(";psbn&"+FARMNAME.reverse()+">.*?<\\.(\\d+)>")).exec(response.responseText.replace(/\s+/g,"").reverse());
				if(help){
					levelLog[serverTodayStr][1]=parseInt(help[1].reverse(),10);
				}else{
					help=(new RegExp(">.*?<\\.(\\d+)>")).exec(response.responseText.replace(/\s+/g,"").reverse());
					if(help){
						levelLog[serverTodayStr][1]=parseInt(help[1].reverse(),10);
					}
				}
				GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_levelLog",implode(levelLog));
			}
		});
	}
	if(!levelLog[serverTodayStr][1]){ getDailyRanking(); }
	function plotLevelProgressBar(){
		//todayStr=getDateStr(now,2,false);
		if(levelLog[serverTodayStr]==undefined){ levelLog[serverTodayStr]=[0,null,0,0,0]; }
		levelLog[serverTodayStr][0]=parseInt($("pkt").innerHTML.replace(/\D/g,""),10);
		var levelsum=LEVEL_POINTS[USERLEVEL+1]-LEVEL_POINTS[USERLEVEL-1];
		var levelSize=959;
		var newdiv=$("levelProgressBar");
		if(newdiv){ removeElement(newdiv); }
		if(USERLEVEL<LEVEL_POINTS.length){
			newdiv=createElement("div",{"class":"link","id":"levelProgressBar","style":"float:left;width:"+levelSize+"px;position:relative;top:-2px;left:18px;"},content_table.firstElementChild.children[2].firstElementChild);
			newdiv.addEventListener("click",function(){buildInfoPanel("level");},false);
			newdiv.addEventListener("mouseover",function(event){
				var node=event.target;
				var mouseOverText=node.getAttribute("mouseOverText");
				while((node!=this)&&(!mouseOverText)){
					node=node.parentNode;
					mouseOverText=node.getAttribute("mouseOverText");
				}
				if(mouseOverText){ showToolTip(event,mouseOverText); }
				node=null;mouseOverText=null;
			},false);

			var newdiv1=bar(levelSize*(LEVEL_POINTS[USERLEVEL]-LEVEL_POINTS[USERLEVEL-1])/levelsum,1,1);
			newdiv1.style.cssFloat="left";
			newdiv1.setAttribute("mouseOverText",texte["level"]+" "+(USERLEVEL-1)+": "+numberFormat(LEVEL_POINTS[USERLEVEL-1],0)+"-"+numberFormat(LEVEL_POINTS[USERLEVEL],0));
			newdiv.appendChild(newdiv1);

			newdiv1=bar(levelSize*(LEVEL_POINTS[USERLEVEL+1]-LEVEL_POINTS[USERLEVEL])/levelsum,levelLog[serverTodayStr][0]-LEVEL_POINTS[USERLEVEL],LEVEL_POINTS[USERLEVEL+1]-LEVEL_POINTS[USERLEVEL]);
			newdiv1.style.cssFloat="left";
			newdiv1.style.marginLeft=Math.ceil(2+levelSize*(LEVEL_POINTS[USERLEVEL]-LEVEL_POINTS[USERLEVEL-1])/levelsum)+"px";
			newdiv1.setAttribute("mouseOverText",texte["level"]+" "+(USERLEVEL)+": "+numberFormat(LEVEL_POINTS[USERLEVEL],0)+"-"+numberFormat(LEVEL_POINTS[USERLEVEL+1],0));
			newdiv.appendChild(newdiv1);

			for(var v in levelLog){
				if(!levelLog.hasOwnProperty(v)){ continue; }
				if((LEVEL_POINTS[USERLEVEL-1]<levelLog[v][0])&&(levelLog[v][0]<LEVEL_POINTS[USERLEVEL+1])){
					// save full data for the last 2 levels
					newdiv1=createElement("div",{"mouseOverText":v+"<br>"+numberFormat(levelLog[v][0]),"style":"position:absolute;width:0;margin-top:2px;height:12px;border-right:1px solid white;"},newdiv);
					if (levelLog[v][0]<LEVEL_POINTS[USERLEVEL]) newdiv1.style.marginLeft=Math.floor(2+levelSize*(levelLog[v][0]-LEVEL_POINTS[USERLEVEL-1])/levelsum)+"px";
					else newdiv1.style.marginLeft=Math.floor(4+levelSize*(levelLog[v][0]-LEVEL_POINTS[USERLEVEL-1])/levelsum)+"px";
					help=v.split(".");
					if (new Date(parseInt(help[2],10),parseInt(help[1],10)-1,parseInt(help[0],10)).getDay()=="0") newdiv1.style.borderColor="red";
				}else{
					// join data to monthly
					if(v.match(/^\d+\.\d+\.\d+$/)){
						var w=v.replace(/^(\d+\.)/,"");
						if(levelLog[w]==undefined){
							levelLog[w]=[0,,0,0,0];
							levelLog.sortObj(sortObjFunctions["date"]);
						}
						if(levelLog[w][0]<levelLog[v][0]){
							levelLog[w][0]=levelLog[v][0];
							levelLog[w][1]=levelLog[v][1];
						}
						levelLog[w][2] += levelLog[v][2];
						levelLog[w][3] += levelLog[v][3];
						levelLog[w][4] += levelLog[v][4];
						delete levelLog[v];
					}
				}
			}
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_levelLog",implode(levelLog));
			newdiv1=null;
		}
		newdiv=null;
	}
	plotLevelProgressBar();
	unsafeWindow._updateMenuHandler=unsafeWindow.updateMenuHandler;
	unsafeWindow.updateMenuHandler = function(){
		unsafeWindow._updateMenuHandler();
		window.setTimeout(function(){
			//calcTotalFarmis(); // TODO needed here?
			if(USERLEVEL<parseInt(unsafeWindow.currentuserlevel,10)){
				getData();
				plotLevelProgressBar();
				calcProdMinRackInit();
				raiseEvent("gameUserlevelUp");
			}
		},0);
	};

	// Farmis
	$("customerstats").setAttribute("class","link");
	$("customerstats").addEventListener("click",function(){buildInfoPanel("farmiLog");},false);
	var farmiLog=new Object(); // farmiLog[farmiId]=[date,money,{prod1:amount,...}]
	try{ farmiLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_farmiLog"),"{}");
	}catch(err){
		GM_log("explode farmiLog "+err);
		// catch old data (since 15.1.11)
		var help=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_farmiLog");
		if (help){
			var help2=help.split("|");
			for(var v=0;v<help2.length;v++){
				var help3=help2[v].split("~");
				farmiLog[help3[0]]=[help3[2],parseFloat(help3[1],10),{}];
				for(var w=3;w+1<help3.length;w+=2){
					farmiLog[help3[0]][2][help3[w]]=parseInt(help3[w+1],10);
				}
			}
		}
	}

	// kick farmis older than 1 month, set this value optional? TODO
	var dayLastMonth=new Date();
	dayLastMonth=Math.round(((new Date(dayLastMonth.getFullYear(),dayLastMonth.getMonth()-1,dayLastMonth.getDate())).getTime())/1000);
	for(var v in farmiLog){
		if(!farmiLog.hasOwnProperty(v)){ continue; }
		if (getTime(farmiLog[v][0])<=dayLastMonth){
			delete farmiLog[v];
		}
	}

	unsafeWindow._handleFarmiResponse=unsafeWindow.handleFarmiResponse;
	unsafeWindow.handleFarmiResponse = function(request,farmi,status){
		unsafeWindow._handleFarmiResponse(request,farmi,status);
		//window.setTimeout(calcTotalFarmis,0);
		window.setTimeout(doFarmis,0);
		raiseEvent("gameFarmiResponse");
	};

	function doFarmis(){ // -> calcTotalFarmis
		// calculate costs of the farmis
		for(var farmiNr=0;farmiNr<$("customerline").childElementCount;farmiNr++){
			var wert=0;
			var priceMissing=false;
			for(var i=1;i<=7;i++){ // 7=max-amount of products per farmi
				if(priceMissing){ continue; }
				var pid=top.window.wrappedJSObject.farmisinfo[0][farmiNr]["p"+i];
				var amount=parseInt(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["a"+i],10);
				if((pid>0)&&(amount>0)){
					if(gut[pid]>0){
						wert += amount*gut[pid];
					}else{
						priceMissing=true;
					}
				}
			}
			top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"]=(priceMissing?null:(100*parseFloat(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["price"],10)/wert));
			top.window.wrappedJSObject.farmisinfo[0][farmiNr]["marketValue"]=priceMissing?0:wert;
		}
		calcTotalFarmis();

		//this can't go in the above loop because the amountMinRack are needed to be calculated first
		var missing,belowminvalue;
		for(var farmiNr=0;farmiNr<$("customerline").childElementCount;farmiNr++){
			missing=false;belowminvalue=false;
			for(var i=1;i<=7;i++){ // 7=max-amount of products per farmi
				var pid=top.window.wrappedJSObject.farmisinfo[0][farmiNr]["p"+i];
				var amount=parseInt(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["a"+i],10);
				if((pid > 0) && (amount > 0)){
					missing=missing || (prodBestand[pid]<amount);
					belowminvalue=belowminvalue || (prodBestand[pid]-amount<prodMinRack[pid]-((valMinRackFarmis&&totalFarmis[pid])?totalFarmis[pid]:0));
				}
			}
			top.window.wrappedJSObject.farmisinfo[0][farmiNr]["missing"]=missing?1:0;
			top.window.wrappedJSObject.farmisinfo[0][farmiNr]["belowminvalue"]=belowminvalue?1:0;
		}
		missing=null;belowminvalue=null;

		var cell;
		if(unsafeWindow.farm==1){
			for(var farmiNr=0;farmiNr<$("customerline").childElementCount;farmiNr++){
				if (!$("farmiInfo"+farmiNr)){ // assure that this code is run only once per farmi. else eventlisteners are stacked
					// prepare the additional farmi-info-bubble
					createElement("div",{"id":"farmiInfo"+farmiNr,"style":"position:absolute;height:35px;top:-47px;-moz-border-radius:5px;padding:5px;color:black;font-size:0.8em;"},$("blase"+farmiNr));
					createElement("div",{"id":"farmiMiniInfo"+farmiNr,"style":"position:absolute;top:45px;right:15px;height:7px;width:7px;display:block;-moz-border-radius:5px;"},$("kunde_"+farmiNr));
					// fill the bubble when shown
					$("kunde_"+farmiNr).addEventListener("mouseover",function(){
						var farmiNr=this.id.replace("kunde_","");
						var cash=parseFloat(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["price"],10);
						var wert = parseFloat(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["marketValue"],10);
						var cell=$("blase"+farmiNr).firstElementChild.firstElementChild;
						var ppid, amount;
						for(var i=1;i<=7;i++){ // 7=maxanzahl produkte pro farmi
							if(cell.style.clear=="both"){ // line break after 4 products
								cell=cell.nextElementSibling;
								if(!cell){ break; }
							}
							pid=top.window.wrappedJSObject.farmisinfo[0][farmiNr]["p"+i];
							amount=parseInt(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["a"+i],10);
							if((pid>0)&&(amount>0)){
								if(prodBestand[pid]<amount){
									// not enough in rack
									cell.style.border="1px red solid";
								}else if(prodBestand[pid]-amount<prodMinRack[pid]-((valMinRackFarmis&&totalFarmis[pid])?totalFarmis[pid]:0)){
									// selling this farmi will push the rack below the min-value
									cell.style.border="1px blue solid";
								}else{
									cell.style.border="";
								}
							}
							cell=cell.nextElementSibling;
							if(!cell){ break; }
						}
						cell=$("farmiInfo"+farmiNr);
						if(!top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"]){
							// a price is missing. can't calculate, so display white
							cell.innerHTML=moneyFormatInt(cash);
							cell.style.border="1px solid black";
							cell.style.backgroundColor="white";
						}else if(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"]<valFarmiLimits[0]){
							// low case
							cell.innerHTML=moneyFormatInt(cash)+"<br>"+numberFormat(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"],1)+"&nbsp;%<br>"+moneyFormatInt(cash-wert)+"&nbsp;|&nbsp;"+moneyFormatInt(cash-0.9*wert);
							cell.style.border="2px solid red";
							cell.style.backgroundColor="#fdd";
						}else if(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"]<valFarmiLimits[1]){
							// middle case
							cell.innerHTML=moneyFormatInt(cash)+"<br>"+numberFormat(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"],1)+"&nbsp;%<br>"+moneyFormatInt(cash-wert)+"&nbsp;|&nbsp;+"+moneyFormatInt(cash-0.9*wert);
							cell.style.border="2px solid #ff8c00";
							cell.style.backgroundColor="#ffe87c";
						}else{
							// high case
							cell.innerHTML=moneyFormatInt(cash)+"<br>"+numberFormat(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"],1)+"&nbsp;%<br>+"+moneyFormatInt(cash-wert)+"&nbsp;|&nbsp;+"+moneyFormatInt(cash-0.9*wert);
							cell.style.border="2px solid green";
							cell.style.backgroundColor="#dfd";
						}
						cell=null;
					},false);
					// farmi is new=not in the FarmiLog
					if (farmiLog[unsafeWindow.farmisinfo[0][farmiNr].id]==undefined){
						raiseEvent("gameFarmiNew");
						//todayStr=getDateStr(now,2,false);
						// add this new farmi
						farmiLog[unsafeWindow.farmisinfo[0][farmiNr]["id"]]=[todayStr,parseFloat(unsafeWindow.farmisinfo[0][farmiNr]["price"],10),{}];
						for(var w=1;w<8;w++){
							if (unsafeWindow.farmisinfo[0][farmiNr]["p"+w]!="0"){
								farmiLog[unsafeWindow.farmisinfo[0][farmiNr]["id"]][2][unsafeWindow.farmisinfo[0][farmiNr]["p"+w]]=parseInt(unsafeWindow.farmisinfo[0][farmiNr]["a"+w],10);
							}
						}
						farmiLog.sortObj(function(a,b){return (getTime(a[1][0])-getTime(b[1][0]));},true);
						if(levelLog[serverTodayStr]==undefined){ levelLog[serverTodayStr]=[0,null,0,0,0]; }
						levelLog[serverTodayStr][4] += farmiLog[unsafeWindow.farmisinfo[0][farmiNr]["id"]][1];
						levelLog[serverTodayStr][4]=Math.round(100*levelLog[serverTodayStr][4])/100;
						// saving
						GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_farmiLog",implode(farmiLog));
						GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_levelLog",implode(levelLog));
						window.setTimeout(doBuyNotepad,0);
					}
				}
				cell=$("farmiMiniInfo"+farmiNr);
				if((!valFarmiMiniInfo)||(!top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"])){
					// a price is missing. can't calculate, so don't display
					// or not wanted
					cell.style.border="";
					cell.style.backgroundColor="";
				}else if(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"]<valFarmiLimits[0]){
					// low case
					cell.style.border="1px solid red"; //TODO color
					cell.style.backgroundColor="#fdd"; //top.window.wrappedJSObject.farmisinfo[0][farmiNr]["missing"]?"#FF4040":(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["belowminvalue"]?"#0080ff":"#fdd");
				}else if(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["costQuotient"]<valFarmiLimits[1]){
					// middle case
					cell.style.border="1px solid #ff8c00";
					cell.style.backgroundColor=top.window.wrappedJSObject.farmisinfo[0][farmiNr]["missing"]?"#FF4040":(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["belowminvalue"]?"#0080ff":"#ffe87c");
				}else{
					// high case
					cell.style.border="1px solid green";
					cell.style.backgroundColor=top.window.wrappedJSObject.farmisinfo[0][farmiNr]["missing"]?"#FF4040":(top.window.wrappedJSObject.farmisinfo[0][farmiNr]["belowminvalue"]?"#0080ff":"#dfd");
				}
			}
			// Advertising end
			if((unsafeWindow.customerstats)&&(unsafeWindow.customerstats["adstart"])&&(unsafeWindow.customerstats[4])&&(unsafeWindow.customerstats[4]["date"]==unsafeWindow.customerstats["adstart"])&&(unsafeWindow.adrun)&&(parseInt(unsafeWindow.customerstats[1]["count"],10)>=(farmiZahl+2*unsafeWindow.adrun))){
				cell=$("alertAdvertEnd");
				if(!cell){
					createElement("div",{"id":"alertAdvertEnd","style":"position:absolute;top:50px;left:0;color:white;font-weight:bold;background-color:red;padding:2px;white-space:nowrap;"},$("customerstats"),texte["adEnds"]);
					window.setTimeout(function(){
						var newdiv;
						if(newdiv=$("alertAdvertEnd")){ removeElement(newdiv); }
						newdiv=null;
					},1000*(getTime(getDateStr(now,2,false))+86400-now)); // time till midnight
				}
			}else{
				cell=$("alertAdvertEnd");
				if(cell){ removeElement(cell); }
			}
		}else{
			cell=$("alertAdvertEnd");
			if(cell){ removeElement(cell); }
		}
		cell=null;
	}
	// Removing Advertising end on Advertising Abort
	unsafeWindow._cancelAdResponse=unsafeWindow.cancelAdResponse;
	unsafeWindow.cancelAdResponse = function(request){
		if(checkRequest(request)){
			var cell=$("alertAdvertEnd");
			if(cell){ removeElement(cell); }
			cell=null;
		}
		unsafeWindow._cancelAdResponse(request);
	};

	// Sprechblase
	createElement("div",{"id":"sprcontent2","style":"position:absolute;top:35px;left:323px;z-index:100;width:200px;height:80px;overflow:auto;display:none;"},$("sprcontent").parentNode);//same style as #sprcontent
	function hideBlase(){
		$("sprcontent").style.display="";
		$("sprcontent2").innerHTML="";
		$("sprcontent2").style.display="none";
	}
	function showBlase(zoneNr){
		var zoneNrF=zoneNr+(6*farmNr);
		$("sprcontent").style.display="none";
		var bubble=$("sprcontent2");
		bubble.style.display="";
		bubble.innerHTML="";
		var newdiv;
		if(zoneTyp[zoneNrF]==6){
			createElement("div",{"class":"tnormal","style":"font-weight:bold;"},bubble,unsafeWindow.buildinginfos[0][6][10]);
		}else if(BUILDINGTYPE[zoneTyp[zoneNrF]]>0){
			if(zoneNext[zoneNrF]){
				createElement("div",{"class":"tt"+zoneNext[zoneNrF],"style":"float:left;margin-top:5px;margin-right:5px;"},bubble);
				createElement("font",{"class":"tnormal","style":"font-weight:bold;"},bubble,prodName[zoneNext[zoneNrF]]+"<br>");
				newdiv=createElement("div",{"class":"tnormal"},bubble);
				if (nextTime[zoneNrF]<=now){
					newdiv.innerHTML=texte["fertigSeitX"].replace(/%1%/,getDaytimeStr(nextTime[zoneNrF])+"&nbsp;"+texte["uhr"]);
				}else if (nextTime[zoneNrF]<NEVER){
					var endDay=countDays(now,nextTime[zoneNrF]);
					if (endDay == 0){
						newdiv.innerHTML=texte["fertigUmX"].replace(/%1%/,getDaytimeStr(nextTime[zoneNrF])+"&nbsp;"+texte["uhr"]);
					}else if (texte["day"+endDay]){
						newdiv.innerHTML=texte["YfertigUmX"].replace(/%1%/,getDaytimeStr(nextTime[zoneNrF])+"&nbsp;"+texte["uhr"]).replace(/%2%/,texte["day"+endDay]);
					}else{
						newdiv.innerHTML=new Date(1000*nextTime[zoneNrF]).toLocaleString();
					}
				}
			}else{
				createElement("font",{"class":"tnormal","style":"font-weight:bold;"},bubble,texte["feldLeer"]);
			}
		}else{
			createElement("div",{"class":"tnormal","style":"font-weight:bold;"},bubble,"---");
			if (zoneBlock[zoneNrF]){
				createElement("div",{"class":"tnormal"},bubble,unsafeWindow.inforequirepremium);
			}
		}
		bubble=null;newdiv=null;
	}
	function showBlaseWindmill(){
		$("sprcontent").style.display="none";
		var bubble=$("sprcontent2");
		bubble.style.display="";
		bubble.innerHTML="";
		if(windmillRecipe){
			createElement("div",{"class":"fm"+windmillRecipe,"style":"position:absolute;top:5px;left:0;"},bubble);
			var newdiv=createElement("div",{"style":"position:absolute;top:5px;left:55px;"},bubble);
			createElement("font",{"class":"tnormal","style":"font-weight:bold;"},createElement("div",{},newdiv),unsafeWindow.formulas[0][windmillRecipe][2]);
			var newfont=createElement("font",{"class":"tnormal"},createElement("div",{},newdiv));
			if (windmillTimeEnd<=now){
				newfont.innerHTML=texte["fertigSeitX"].replace(/%1%/,getDaytimeStr(windmillTimeEnd)+"&nbsp;"+texte["uhr"]);
			}else{if (windmillTimeEnd<NEVER){
				var endDay=countDays(now,windmillTimeEnd);
				if (endDay == 0) newfont.innerHTML=texte["fertigUmX"].replace(/%1%/,getDaytimeStr(windmillTimeEnd)+"&nbsp;"+texte["uhr"]);
				else if (texte["day"+endDay]) newfont.innerHTML=texte["YfertigUmX"].replace(/%1%/,getDaytimeStr(windmillTimeEnd)+"&nbsp;"+texte["uhr"]).replace(/%2%/,texte["day"+endDay]);
				else newfont.innerHTML=new Date(1000*windmillTimeEnd).toLocaleString();
				}
			}
			newdiv=null;newfont=null;
		}else{
			createElement("font",{"class":"tnormal","style":"font-weight:bold;"},$("sprcontent2"),texte["muehleUnbeschaeftigt"]);
		}
		bubble=null;
	}

	// Lager / Rack
	newdiv=createElement("div",{"style":"display:none;"},$("lager_info"));//position:absolute;top:50px;left:58px;display:none;
	createElement("img",{"src":GFX+"adtime.gif","style":"float:left;width:14px;height:14px;margin:3px 0 0 5px;"},newdiv);
	createElement("div",{"id":"lager_zeit_ziel","class":"tnormal","style":"float:left;margin:3px 0 0 5px;"},newdiv);
	newdiv=createElement("div",{"class":"link playerContract","style":"position:absolute;top:120px;left:10px;"},$("lager").firstElementChild);
	createElement("div",{},newdiv);
	newdiv.addEventListener("mouseover",function(event){
		if(prodBlock[unsafeWindow.selected].match(/t/)){
			showToolTip(event,"---");
		}else{
			showToolTip(event,texte["XmitVertragAuslagern"].replace(/%1%/,prodName[unsafeWindow.selected]));
		}
	},false);
	newdiv.addEventListener("click",function(event){
		if(!prodBlock[unsafeWindow.selected].match(/t/)){
			var thisdata=new Object();
			thisdata["to"]=FARMNAME;
			thisdata["fillContract"]=new Object();
			thisdata["fillContract"][unsafeWindow.selected]=[prodBestand[unsafeWindow.selected],1];
			GM_setValue(LNG+"_"+SERVER+"_pagedataVertraegeNew",implode(thisdata));
			showMultiframePage("vertraege/new.php");
		}
	},false);
	function doLagerZeit(zoneNr){
		//GM_log("doLagerZeit "+zoneNr);
		if(unsafeWindow.userfarminfos[farmNr+1][zoneNr]["buildingid"]!="1"){ return false; }
		var divLagerZeitZiel=$("lager_zeit_ziel");
		if ((unsafeWindow.mode==0)&&(prodTyp[unsafeWindow.selected]=="v")){
			var bonus=unsafeWindow.userfarminfos[farmNr+1][zoneNr]["waterbonus"];
			if(unsafeWindow.selected==unsafeWindow.userfarminfos[farmNr+1][zoneNr]["specialwaterbonus"][0]){ bonus += unsafeWindow.userfarminfos[farmNr+1][zoneNr]["specialwaterbonus"][1]; }
			bonus=1-(bonus/100);
			var growtime=calcDauer(unsafeWindow.rackElement[unsafeWindow.selected].duration/1000,bonus);
			$("lager_zeit").innerHTML=getTimeStr(growtime)+"&nbsp;h";
			if (divLagerZeitZiel.parentNode.style.display == "none"){ divLagerZeitZiel.parentNode.style.display=""; }
			divLagerZeitZiel.innerHTML="=&nbsp;"+getDaytimeStr(now+growtime)+"&nbsp;"+texte["uhr"];
		}else{
			if (divLagerZeitZiel.parentNode.style.display!="none"){ divLagerZeitZiel.parentNode.style.display="none"; }
		}
		divLagerZeitZiel=null;
	}
	unsafeWindow.__neues_teil=unsafeWindow._neues_teil;
	unsafeWindow._neues_teil = function(nt_class,nt_name,nt_zeit,nt_id,wz,anz_ernte,x,y,kat){
		unsafeWindow.__neues_teil(nt_class,nt_name,nt_zeit,nt_id,wz,anz_ernte,x,y,kat);
		if($("gardenmaincontainer").style.display!="none"){
			var zoneNr=/parent.cache_me\((\d+?),120/.exec($("gardenarea").innerHTML);
			if(zoneNr){
				zoneNr=parseInt(zoneNr[1],10);
				//if($("n_produkt").value.substring(1)==unsafeWindow.selected){
				if((nt_class!="")&&(nt_class!="-1")){
					doLagerZeit(zoneNr);
				}
			}
		}
	};
	function doRack(){
		var cand=$("rackItems").getElementsByClassName("tklein2");
		for(var v=0;v<cand.length;v++){
			var cell=$(cand[v].id+"format");
			if(!cell){
				cell=cand[v].parentNode.parentNode;
				cell.setAttribute("class",(cell.getAttribute("class")+" link").replace(/(^|\s+)link\s+/g," ").replace(/^\s+/,""));
				cand[v].style.display="none";
				cell=createElement("div",{"id":cand[v].id+"format","class":"formattedRackItem"},cand[v].parentNode);
			}
			var currProd=parseInt(cand[v].id.replace("t",""),10);
			var str=numberFormat(prodBestand[currProd],0,"","").replace(/(\d{3,})(\d{3})/,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2");
			if(cell.innerHTML!=str){ cell.innerHTML=str; }
			str="formattedRackItem"+(prodBestand[currProd]<prodMinRack[currProd]?" lowrack":"");
			if(cell.getAttribute("class")!=str){ cell.setAttribute("class",str); }
			cell=null;
		}
		cand=null;
	}
	if(unsafeWindow.userracks>1){
		// rack switch arrows
		GM_addStyle("#racknavileft,#racknaviright{display:none!important;}");
		newdiv=createElement("div",{"style":"position:relative; left:-3px; float:left;","class":"racknavi"});
		newdiv1=createElement("div",{"onmouseout":"hideDiv('racknavileftinfo1');","onmouseover":"$('racknavileftinfo1').innerHTML=rackname+(1+((userracks-1+parseInt(_currRack,10))%userracks));showDiv('racknavileftinfo1');","onclick":"updateRack((userracks-1+parseInt(_currRack,10))%userracks);","class":"link racknavi"},newdiv);
		createElement("div",{"style":"position:absolute;white-space:nowrap;display:none;top:25px;left:0;","class":"blackbox","id":"racknavileftinfo1"},newdiv1);
		$("racknavileft").parentNode.insertBefore(newdiv,$("racknavileft"));

		newdiv=createElement("div",{"style":"position:relative; right:-3px; float:right;","class":"racknavi"});
		newdiv1=createElement("div",{"onmouseout":"hideDiv('racknavirightinfo1');","onmouseover":"$('racknavirightinfo1').innerHTML=rackname+(1+((1+parseInt(_currRack,10))%userracks));showDiv('racknavirightinfo1');","onclick":"updateRack((1+parseInt(_currRack,10))%userracks);","class":"link racknavi"},newdiv);
		createElement("div",{"style":"position:absolute;white-space:nowrap;display:none;top:25px;right:0;","class":"blackbox","id":"racknavirightinfo1"},newdiv1);
		$("racknaviright").parentNode.insertBefore(newdiv,$("racknaviright"));
	}

	var valMoveAnimals=new Array;
	try{ valMoveAnimals=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMoveAnimals","[]")); }catch(err){}
	var animalMove=[,,[false,0,0,255,10,10,505],[false,0,0,280,1,0,525],[false,0,0,280,1,25,500],,,,,,,[false,2,20,120,4,0,200]];
	// executed,speedvert,top,bottom,speedhor,left,right
	function moveAnimals(mode){
		//GM_log("moveAnimals "+mode);
		if(($("innermaincontainer").style.display == "block")&&($("animalline"+mode))){
			var cand=$("animalline"+mode).getElementsByTagName("img");
			for(var v=0;v<cand.length;v++){
				cand[v].style.top=(Math.max(animalMove[mode][2],Math.min(animalMove[mode][3],parseInt(cand[v].style.top,10)+animalMove[mode][1]*getRandom(-1,1))))+"px";
				cand[v].style.left=(Math.max(animalMove[mode][5],Math.min(animalMove[mode][6],parseInt(cand[v].style.left,10)+animalMove[mode][4]*getRandom(-1,1))))+"px";
			}
			cand=null;
			window.setTimeout(function(){moveAnimals(mode);},100);
		}else{
			animalMove[mode][0]=false;
		}
	}

	// events general =============================================================================
	$("errorbox").addEventListener("DOMAttrModified", function(){
		if(valClickErrorbox){ // hide errorbox
			if($("errorbox").style.display=="block"){
				$("errorbox").style.display="none";
				$("transp").style.display="none";
				$("transp3").style.display="none";
			}
		}
	},false);

	// rack
	for(var v in unsafeWindow.rackElement){
		if(!unsafeWindow.rackElement.hasOwnProperty(v)){ continue; }
		if ("undefined" === typeof(unsafeWindow.rackElement[v].id)) continue;   // remove empty elements
		if ("undefined" === typeof(unsafeWindow.rackElement[v].number)) continue; // remove elements which have no stock available
		prodBestand[v]=parseInt(unsafeWindow.rackElement[v].number,10);
	}
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_prodBestand",prodBestand.join("|"));
	unsafeWindow.updateRackBusy=false;
	unsafeWindow._updateRack=unsafeWindow.updateRack;
	unsafeWindow.updateRack = function(rack,init){
		var cell=$("divUpdateRack");
		if(!cell){
			cell=createElement("div",{"id":"divUpdateRack","class":"blackbox","style":"position:absolute;top:20%;left:50%;font-weight:bold;"},$("rackItems"),"Rack updating");
			cell.style.marginLeft=(-(cell.offsetWidth)/2)+"px";
		}
		cell.style.display="block";
		cell=null;
		unsafeWindow.updateRackBusy=true;
		unsafeWindow._updateRack(rack, init);
	};
	unsafeWindow._updateRackHelper=unsafeWindow.updateRackHelper;
	unsafeWindow.updateRackHelper = function(rack){
		// save rack amounts
		for(var v in unsafeWindow.rackElement){
			if(!unsafeWindow.rackElement.hasOwnProperty(v)){ continue; }
			if ("undefined" === typeof(unsafeWindow.rackElement[v].id)) continue;   // remove empty elements
			if ("undefined" === typeof(unsafeWindow.rackElement[v].number)) continue; // remove elements which have no stock available
			prodBestand[v]=parseInt(unsafeWindow.rackElement[v].number,10);
		}
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_prodBestand",prodBestand.join("|"));
		unsafeWindow._updateRackHelper(rack);
		var cell=$("divUpdateRack");
		if(cell){ cell.style.display="none"; }
		cell=null;
		window.setTimeout(function(){
			calcProdMinRack(); // -> doBuyNotepad,doRack
			unsafeWindow.updateRackBusy=false;
			raiseEvent("gameUpdateRack");
		},0);
	};
	unsafeWindow._sortRack=unsafeWindow.sortRack;
	unsafeWindow.sortRack = function(type){
		unsafeWindow._sortRack(type);
		doRack();
	};
	newdiv=$("rackItems");
	newdiv.addEventListener("dblclick",function(event){
		var currId=/(\d+)/.exec(event.target.id);
		if(currId&&(!prodBlock[currId[1]].match(/t/))){ showMarket(currId[1]); }
	},false);
	unsafeWindow._linfo=unsafeWindow.linfo;
	unsafeWindow.linfo = function(title,amount,id,offset,felder,kategorie){
		unsafeWindow._linfo(title,amount,id,offset,felder,kategorie);
		var newdiv;
		var rackPopup=$("rackPopup");
		if (!isNaN(NPC[id])){
			newdiv=createElement("div",{"class":"tmenu","style":"position:relative;height:13px;width:172px;top:-78px;padding-left:20px;background: url('"+GFX+"lager/flaeche.gif') left top transparent;background-position:0px -155px;"},rackPopup);
			createElement("span",{"style":"float:left;width:60px;"},newdiv,texte["hofpreis"]+": ");
			createElement("span",{"style":"float:left;width:100px;text-align:right;"},newdiv,moneyFormat(NPC[id]));
		}
		if(!prodBlock[id].match(/t/)){
			newdiv=createElement("div",{"class":"tmenu","style":"position:relative;height:13px;width:172px;top:-78px;padding-left:20px;background: url('"+GFX+"lager/flaeche.gif') left top transparent;background-position:0px -155px;"},rackPopup);
			createElement("div",{"style":"display:inline-block;width:60px;"},newdiv,texte["marktpreis"]+": ");
			createElement("div",{"style":"display:inline-block;width:100px;text-align:right;"},newdiv,moneyFormat(gut[id]));
			newdiv=createElement("div",{"class":"tmenu","style":"position:relative;height:13px;width:172px;top:-78px;padding-left:20px;background: url('"+GFX+"lager/flaeche.gif') left top transparent;background-position:0px -155px;"},rackPopup);
			createElement("div",{"style":"display:inline-block;width:60px;"},newdiv,texte["wert"]+": ");
			createElement("div",{"style":"display:inline-block;width:100px;text-align:right;"},newdiv,moneyFormatInt(gut[id]*prodBestand[id]));
			newdiv=createElement("div",{"class":"tmenu","style":"position:relative;height:25px;width:172px;top:-78px;padding-left:20px;background: url('"+GFX+"lager/flaeche.gif') left top transparent;background-position:0px -155px;"},rackPopup);
			createElement("div",{"style":"width:160px;"},newdiv,texte["clickDouble"]+": "+texte["goToMarket"]);
		}
		newdiv=null;rackPopup=null;
	};

	if(newdiv=$("coins")){
		newdiv1=newdiv.cloneNode(true);
		newdiv1.id="coinsFormat";
		newdiv1.innerHTML=numberFormat(prodBestand[0]);
		newdiv.style.display="none";
		newdiv.parentNode.appendChild(newdiv1);
		newdiv.parentNode.setAttribute("class","link");
		newdiv.parentNode.addEventListener("mouseover",function(event){ showGoToMarketToolTip(event,0); },false);
		newdiv.parentNode.addEventListener("click",function(){ showMarket(0); },false);
	}

	if(LNG=="se"){ $("bar").innerHTML=$("bar").innerHTML.replace(/\.(\d\d) /,",$1 "); }
	unsafeWindow._updatePlayerInfo=unsafeWindow.updatePlayerInfo;
	unsafeWindow.updatePlayerInfo = function(money,coins,points,level,deco){
		unsafeWindow._updatePlayerInfo(money,coins,points,level,deco);
		if(money){
			if(LNG=="se"){
				money=money.replace(/\.(\d\d) /,",$1 ");
				$("bar").innerHTML=money;
			}
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_bargeld",money.replace(texte["waehrung"],"").replace(/\s+/g,"").replace(regDelimThou,"").replace(regDelimDeci,"."));
		}
		if(coins){
			var c=parseInt(coins,10);
			if(!isNaN(c)){
				prodBestand[0]=c;
				$("coinsFormat").innerHTML=numberFormat(c);
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_prodBestand",prodBestand.join("|"));
			}
		}
	};
	document.addEventListener("gameDoGetData",function(){
		window.setTimeout(getData,0);
	},false);
	document.addEventListener("gameChangedBeobPrice",function(){
		window.setTimeout(function(){
			GM_log("publish GMpreisBeob");
			top.window.wrappedJSObject.GMpreisBeob=explode(GM_getValue(LNG+"_"+SERVER+"_preisBeob","[]")).slice(0);
		},0);
	},false);
	document.addEventListener("gameChangedGut",function(){
		window.setTimeout(function(){
			gut=splitToFloat(GM_getValue(LNG+"_"+SERVER+"_gut",""),"|");
			top.window.wrappedJSObject.GMgut=gut.slice(0);
		},0);
	},false);
	document.addEventListener("gameChangedLevelLog",function(){
		window.setTimeout(function(){
			levelLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_levelLog","{}"));
		},0);
	},false);
	document.addEventListener("gameChangedProdMinRackInit",function(){
		window.setTimeout(function(){
			//if(valMinRackMan){ prodMinRackInit=splitToInt(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_prodMinRackInit",""),"|"); }
			calcProdMinRackInit();
		},0);
	},false);

	// events farm ================================================================================
	function doGameFarmSwitch(){ // farm switched
		//GM_log("doGameFarmSwitch start");
		try{
			if(!unsafeWindow.userfarminfos[unsafeWindow.farm]){ return false; }
			farmNr=unsafeWindow.farm-1;
			for(var v=1;v<7;v++){
				var vf=v+6*farmNr;
				zoneTyp[vf]=parseInt(unsafeWindow.userfarminfos[farmNr+1][v]["buildingid"],10);
				nodes["zonetime"+v]["state"]="farmChange";
	
				//if (zoneTyp[vf]==0){ zoneBlock[vf]=true; } //empty zone
				//else if (zoneTyp[vf]==6){ zoneBlock[vf]=true; } //Club
				if ((unsafeWindow.premium!=1) && (unsafeWindow.userfarminfos[farmNr+1][v]["premium"]==1)){ zoneBlock[vf]=true; } //Premiumzone
				else{ zoneBlock[vf]=false; }
	
				if (BUILDINGTYPE[zoneTyp[vf]]==1){
					// Field
					zoneAnimals[vf]=0;
					zoneBonus[vf]=parseInt(unsafeWindow.userfarminfos[farmNr+1][v]["waterbonus"],10); // the normal waterbonus
					zoneBonusSpecialProduct[vf]=unsafeWindow.userfarminfos[farmNr+1][v]["specialwaterbonus"][0]; // the id of special plant
					zoneBonusSpecialAmount[vf]=parseInt(unsafeWindow.userfarminfos[farmNr+1][v]["specialwaterbonus"][1],10); // additional bonus for special plant
				}else if (BUILDINGTYPE[zoneTyp[vf]]>1){
					// Stables and Factories
					zoneAnimals[vf]=parseInt(unsafeWindow.userfarminfos[farmNr+1][v]["animals"],10);
					zoneBonus[vf]=unsafeWindow.userfarminfos[farmNr+1][v]["time"];
				}
			}
			lastGiess=0;
			lastErnte=0;
			updateZoneTimers();
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneTyp",zoneTyp.join("|"));
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBlock",implode(zoneBlock));
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneAnimals",zoneAnimals.join("|"));
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBonus",zoneBonus.join("|"));
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBonusSpecialProduct",zoneBonusSpecialProduct.join("|"));
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBonusSpecialAmount",zoneBonusSpecialAmount.join("|"));
			unsafeWindow.GMzoneTyp=zoneTyp.slice();
			unsafeWindow.GMzoneBlock=zoneBlock.slice();
			unsafeWindow.GMzoneAnimals=zoneAnimals.slice();
			unsafeWindow.GMzoneBonus=zoneBonus.slice();
			unsafeWindow.GMzoneBonusSpecialProduct=zoneBonusSpecialProduct.slice();
			unsafeWindow.GMzoneBonusSpecialAmount=zoneBonusSpecialAmount.slice();
			//GM_log("doGameFarmSwitch end");
		}catch(err){GM_log("test \n"+err);}
	}
	function updateZoneTimers(){
		var cell;
		for(var zoneNr=1;zoneNr<7;zoneNr++){
			var zoneNrF=zoneNr+6*farmNr;
			if ((!zoneBlock[zoneNrF])&&(BUILDINGTYPE[zoneTyp[zoneNrF]]>0)){
				if((nodes["zonetime"+zoneNr]["state"]=="hidden")||(nodes["zonetime"+zoneNr]["state"]=="farmChange")){
					nodes["zonetime"+zoneNr]["node"].style.display="";
				}
				//Zeit
				//if(!$("zonetime"+zoneNr)){createElement("div",{"id":"zonetime"+zoneNr},$("zone"+zoneNr));}
				var help=nextTime[zoneNrF]+unsafeWindow.Zeit.Verschiebung;
				var help2=nextTimeWasser[zoneNrF]+unsafeWindow.Zeit.Verschiebung;
				if (help<=now){
					nodes["zonetime"+zoneNr]["node"].setAttribute("endtime",now);
					if(nodes["zonetime"+zoneNr]["state"]!="ready"){
						nodes["zonetime"+zoneNr]["state"]="ready";
						nodes["zonetime"+zoneNr]["node"].setAttribute("class","ready");
						nodes["zonetime"+zoneNr]["node"].innerHTML=texte["fertig"].toUpperCase()+"!";
					}

					if(zoneTyp[zoneNrF]==1){
						cell=$("zoneinfo"+zoneNr);
						if (cell&&(cell.childElementCount==0)){ createElement("img",{"src":GFX+"incoming.gif","style":"position:absolute;top:30px;"},cell); }
					}

					if(nodes["zonetimeWasser"+zoneNr]["state"]!="hidden"){
						nodes["zonetimeWasser"+zoneNr]["state"]="hidden";
						nodes["zonetimeWasser"+zoneNr]["node"].style.display="none";
						nodes["zonetimeWasser"+zoneNr]["node"].setAttribute("endtime","");
					}

					if(nodes["imgNeedWater"+zoneNr]){
						if(nodes["imgNeedWater"+zoneNr]["node"]){ removeElement(nodes["imgNeedWater"+zoneNr]["node"]); }
						delete nodes["imgNeedWater"+zoneNr];
					}
				}else if (nextTime[zoneNrF]==NEVER){
					nodes["zonetime"+zoneNr]["node"].setAttribute("endtime",now);
					if(nodes["zonetime"+zoneNr]["state"]!="empty"){
						nodes["zonetime"+zoneNr]["state"]="empty";
						nodes["zonetime"+zoneNr]["node"].setAttribute("class","");
						nodes["zonetime"+zoneNr]["node"].innerHTML="---";
					}

					if(zoneTyp[zoneNrF]==1){
						cell=$("zoneinfo"+zoneNr);
						if (cell&&(cell.childElementCount==0)){ createElement("img",{"src":GFX+"incoming.gif","style":"position:absolute; top:30px;"},cell); }
					}

					if(nodes["zonetimeWasser"+zoneNr]["state"]!="hidden"){
						nodes["zonetimeWasser"+zoneNr]["state"]="hidden";
						nodes["zonetimeWasser"+zoneNr]["node"].style.display="none";
						nodes["zonetimeWasser"+zoneNr]["node"].setAttribute("endtime","");
					}

					if(nodes["imgNeedWater"+zoneNr]){
						if(nodes["imgNeedWater"+zoneNr]["node"]){ removeElement(nodes["imgNeedWater"+zoneNr]["node"]); }
						delete nodes["imgNeedWater"+zoneNr];
					}
				}else{
					if(nodes["zonetime"+zoneNr]["state"]!="busy"){
						nodes["zonetime"+zoneNr]["state"]="busy";
						nodes["zonetime"+zoneNr]["node"].setAttribute("class","");
						nodes["zonetime"+zoneNr]["node"].setAttribute("endtime",help);
					}
					nodes["zonetime"+zoneNr]["node"].innerHTML=getTimeStr(help-now);
					if(zoneTyp[zoneNrF]==1){
						cell=$("zoneinfo"+zoneNr);
						if (cell&&cell.firstElementChild){ removeElement(cell.firstElementChild); }
					}
					if ((zoneTyp[zoneNrF]==1)&&(help2>now)&&(help>help2)){
						if(nodes["zonetimeWasser"+zoneNr]["state"]!="busy"){
							nodes["zonetimeWasser"+zoneNr]["state"]="busy";
							nodes["zonetimeWasser"+zoneNr]["node"].style.display="";
							nodes["zonetimeWasser"+zoneNr]["node"].setAttribute("endtime",help2);
						}
						nodes["zonetimeWasser"+zoneNr]["node"].innerHTML=getTimeStr(help2-now);
					}else{
						if(nodes["zonetimeWasser"+zoneNr]["state"]!="hidden"){
							nodes["zonetimeWasser"+zoneNr]["state"]="hidden";
							nodes["zonetimeWasser"+zoneNr]["node"].style.display="none";
							nodes["zonetimeWasser"+zoneNr]["node"].setAttribute("endtime","");
						}
					}

					if (valGiessNotw){ //watering needed
						if(help2<now){
							if(nodes["imgNeedWater"+zoneNr]&&nodes["imgNeedWater"+zoneNr]["node"]){
								if(nodes["imgNeedWater"+zoneNr]["state"]==""){
									nodes["imgNeedWater"+zoneNr]["state"]="hidden";
									nodes["imgNeedWater"+zoneNr]["node"].style.display="none";
								}else{
									nodes["imgNeedWater"+zoneNr]["state"]="";
									nodes["imgNeedWater"+zoneNr]["node"].style.display="";
								}
							}else{
								cell=$("zone"+zoneNr).firstElementChild;
								if(cell){ // check if the zone is filled
									nodes["imgNeedWater"+zoneNr]=new Object();
									nodes["imgNeedWater"+zoneNr]["state"]="";
									nodes["imgNeedWater"+zoneNr]["node"]=createElement("img",{"id":"imgNeedWater"+zoneNr,"src":GFX+"garten/gegossen_static.gif"},cell.firstElementChild);
								}
							}
						}else if(nodes["imgNeedWater"+zoneNr]){
							if(nodes["imgNeedWater"+zoneNr]["node"]){ removeElement(nodes["imgNeedWater"+zoneNr]["node"]); }
							delete nodes["imgNeedWater"+zoneNr];
						}
					}else if(nodes["imgNeedWater"+zoneNr]){
						if(nodes["imgNeedWater"+zoneNr]["node"]){ removeElement(nodes["imgNeedWater"+zoneNr]["node"]); }
						delete nodes["imgNeedWater"+zoneNr];
					}
				}
			}else{
				if(nodes["zonetime"+zoneNr]["state"]!="hidden"){
					nodes["zonetime"+zoneNr]["state"]="hidden";
					nodes["zonetime"+zoneNr]["node"].style.display="none";
				}
				if(zoneTyp[zoneNrF]==1){
					cell=$("zoneinfo"+zoneNr);
					if (cell&&cell.firstElementChild){ removeElement(cell.firstElementChild); }
				}
				if(nodes["zonetimeWasser"+zoneNr]["state"]!="hidden"){
					nodes["zonetimeWasser"+zoneNr]["state"]="hidden";
					nodes["zonetimeWasser"+zoneNr]["node"].style.display="none";
					nodes["zonetimeWasser"+zoneNr]["node"].setAttribute("endtime","");
				}
				if(nodes["imgNeedWater"+zoneNr]){
					if(nodes["imgNeedWater"+zoneNr]["node"]){ removeElement(nodes["imgNeedWater"+zoneNr]["node"]); }
					delete nodes["imgNeedWater"+zoneNr];
				}
			}
		}
		cell=null;
	}

	// Farm filling
	// initZones > getUserFarmInfos > userFarmInfosResponse > getTimeEvents >
	unsafeWindow._timeEventsResponse=unsafeWindow.timeEventsResponse;
	unsafeWindow.timeEventsResponse = function(request){
		unsafeWindow._timeEventsResponse(request);
		var result = checkRequest(request);
		if(result){
			//GM_log("timeEventsResponse start");
			var cell=$("timeHolder");//windmillBeraterTime
			if(cell){ $("buildingmain").appendChild(cell); }
			cell=null;
			raiseEvent("gameUpdateFarm");
			//GM_log("timeEventsResponse end");
		}
	};

	function drawZoneNavi(zoneNrF){
		var newdiv=$("zoneNavi");
		if(newdiv){ removeElement(newdiv); }
		newdiv=createElement("div",{"id":"zoneNavi"},$("innermaincontainer"));
		var newdiv1;
		var c1=zoneNrF-1;
		while(zoneBlock[c1]||(zoneTyp[c1]!=zoneTyp[zoneNrF])){c1=((c1+16)%18)+1;}
		var c2=zoneNrF+1;
		while(zoneBlock[c2]||(zoneTyp[c2]!=zoneTyp[zoneNrF])){c2=(c2%18)+1;}
		if (c1!=zoneNrF){
			if (c1!=c2){
			newdiv1=createElement("div",{"class":"link leftarrow","name":c1},newdiv);
			newdiv1.addEventListener("click",function(){
				goToZone(this.getAttribute("name"));
				removeElement($("zoneNavi"));
			},false);
			}
			newdiv1=createElement("div",{"class":"link rightarrow","name":c2},newdiv);
			newdiv1.addEventListener("click",function(){
				goToZone(this.getAttribute("name"));
				removeElement($("zoneNavi"));
			},false);
		}
		newdiv=null;newdiv1=null;
	}

	function doZone(zoneNr){
		//GM_log("Begin doZone "+zoneNr);
		if(unsafeWindow.farm){
			var divZone=$("zone"+zoneNr);
			if(farmNr!=unsafeWindow.farm-1){
				doGameFarmSwitch();
				//GM_log("doZone "+zoneNr+" continue");
			}
			var zoneNrF=zoneNr+6*farmNr;
			var buildinginfoname=(zoneTyp[zoneNrF]==1&&unsafeWindow.userfarminfos[farmNr+1]["forestry"]!=undefined?(zoneNr%3==0?'buildinginfo_right':'buildinginfo_left'):'buildinginfo');

			if(zoneBlock[zoneNrF]){
				// zone is premium-only and account not
				divZone.style.opacity=0.5;
				nextTime[zoneNrF]=NEVER;
				nextTimeWasser[zoneNrF]=NEVER;
				zoneErnte[zoneNrF]=new Object;
			}else{
				divZone.style.opacity=1;
			}

			if(zoneTyp[zoneNrF]==0){
				if(unsafeWindow.userfarminfos[farmNr+1][zoneNr]["bulldozecost"]){
					// rocked zones
					if(!$("bulldozecost"+zoneNr)){
						createElement("div",{"id":"bulldozecost"+zoneNr,"class":"blackbox","style":"position:absolute;"},divZone,moneyFormatInt(unsafeWindow.userfarminfos[farmNr+1][zoneNr]["bulldozecost"]));
					}
					// Zone-MouseOver
					newdiv=divZone.getElementsByTagName("div")[0];
					newdiv.setAttribute("mouseOverText",$("bulldozetooltip"+zoneNr).innerHTML);
					newdiv.addEventListener("mouseover",function(event){
						showToolTip(event,this.getAttribute("mouseOverText"),this);
					},false);
				}else{
					// unbuild zones
					// Zone-MouseOver
					newdiv=divZone.getElementsByTagName("img")[0];
					newdiv.setAttribute("mouseOverText",$("emptyfieldtooltip"+zoneNr).innerHTML);
					newdiv.addEventListener("mouseover",function(event){
						showToolTip(event,this.getAttribute("mouseOverText"),this);
					},false);
				}
				nextTime[zoneNrF]=NEVER;
				nextTimeWasser[zoneNrF]=NEVER;
				zoneErnte[zoneNrF]=new Object;
			}else if (BUILDINGTYPE[zoneTyp[zoneNrF]]==0){
				// club
				var newdiv;
				// Reallocate Button
				if(newdiv=$("reallocatebuildingbutton"+zoneNr)){ removeElement(newdiv.parentNode); }

				// Zone-MouseOver
				newdiv=divZone.getElementsByTagName("div")[0];

				newdiv.setAttribute("mouseOverText",$(buildinginfoname+zoneNr).getElementsByTagName("div")[0].innerHTML);
				newdiv.addEventListener("mouseover",function(event){
					showToolTip(event,this.getAttribute("mouseOverText"),this);
				},false);

				nextTime[zoneNrF]=NEVER;
				nextTimeWasser[zoneNrF]=NEVER;
				zoneErnte[zoneNrF]=new Object;
				newdiv=null;
			}else{
				var newdiv;
				if(!$("zone"+zoneNr+"Berater")){
					createElement("h1",{"id":"zone"+zoneNr+"Berater","style":"display:none;"},divZone);
					if(newdiv=$("buildingdestructbutton"+zoneNr)){ removeElement(newdiv); }
					var help=divZone.querySelector("#levelstars").getElementsByTagName("img").length;
					// Upgrade-Button
					if(BUILDING_UPGRADES[zoneTyp[zoneNrF]]&&BUILDING_UPGRADES[zoneTyp[zoneNrF]][help]){
						var newdiv1=$("updateinfo"+zoneNr);
						if (newdiv1){
							newdiv1.innerHTML="";
							createElement("div",{"style":"font-weight:bold;"},newdiv1,texte["ausbauenFuerX"].replace(/%1%/,(isNaN(BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][1]))?BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][1].replace("c","")+"&nbsp;"+texte["coins"]:moneyFormatInt(BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][1])));
						}else if(valSpoilerZoneUpdate){
							newdiv=createElement("div",{"id":"zoneupdatebutton"},$("zonebuttons"+zoneNr));
							createElement("img",{"id":"buildingupdatebutton"+zoneNr,"src":GFX+"buildingupdatebutton_off.png","style":"width:25px;height:25px;"},newdiv);
							createElement("div",{"style":"position:absolute;top:0;left:0;width:19px;height:19px;border:3px solid #117711;-moz-border-radius:15px;","onmouseout":"changeButton('buildingupdatebutton"+zoneNr+"',0,"+zoneNr+");hideDiv('updateinfo"+zoneNr+"');","onmouseover":"changeButton('buildingupdatebutton"+zoneNr+"',1,"+zoneNr+"); showDiv('updateinfo"+zoneNr+"');"},newdiv);
							newdiv1=createElement("div",{"id":"updateinfo"+zoneNr,"style":"display:none;position:absolute;top:75px;left:35px;z-index:100;","class":"blackbox"},divZone);
							createElement("div",{"style":"font-weight:bold;border-bottom:1px solid white;"},newdiv1,texte["levelXBenoetigt"].replace(/%1%/,BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][0])+"<br>");
							createElement("div",{},newdiv1,texte["ausbauenFuerX"].replace(/%1%/,(isNaN(BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][1]))?BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][1].replace("c","")+"&nbsp;"+texte["coins"]:moneyFormatInt(BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][1])));
						}
						if(newdiv1){
							var help2=BUILDING_UPGRADES[zoneTyp[zoneNrF]][help-1][2]-BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][2];
							if(help2>0){
								if(zoneTyp[zoneNrF]==1){
									if(help>3){
										createElement("div",{"style":"border-top:1px solid white;"},newdiv1,unsafeWindow.updatetext[7].replace(/%MORE%/,numberFormat(100*help2)));
									}else{
										createElement("div",{"style":"border-top:1px solid white;"},newdiv1,unsafeWindow.updatetext[6].replace(/%MORE%/,numberFormat(100*(1-BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][2]))));
									}
								}else{
									createElement("div",{"style":"border-top:1px solid white;"},newdiv1,unsafeWindow.updatetext[2].replace(/%MORE%/,numberFormat(100*help2)));
								}
							}
							help2=BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][3]-BUILDING_UPGRADES[zoneTyp[zoneNrF]][help-1][3];
							if(help2>0){ // more animals
								createElement("div",{"style":"border-top:1px solid white;"},newdiv1,unsafeWindow.updatetext[1].replace(/%MORE%/,numberFormat(BUILDING_UPGRADES[zoneTyp[zoneNrF]][help][3])));
								var animalCost=0;
								for(var nr=1;nr<=help2;nr++){
									animalCost += Math.round(ANIMALCOST[zoneTyp[zoneNrF]][0]+(totalAnimals[zoneTyp[zoneNrF]]+nr)*ANIMALCOST[zoneTyp[zoneNrF]][1]);
								}
								createElement("div",{},newdiv1,"(+"+help2+",&nbsp;"+moneyFormatInt(animalCost)+")");
							}
						}
						newdiv1=null;
					}

					// Zone-MouseOver
					divZone.getElementsByTagName("div")[0].setAttribute("mouseOverText","");
					if(zoneBlock[zoneNrF]){ createElement("div",{"style":"font-weight:bold;color:red;"},$(buildinginfoname+zoneNr).getElementsByTagName("div")[0],unsafeWindow.inforequirepremium); }

					if(zoneTyp[zoneNrF]!=1){ //TODO FIX IT for forestry -- there is a double mouseover for the fiels if this is on.
						divZone.getElementsByTagName("div")[0].addEventListener("mouseover",function(event){
							var zoneNr=parseInt(containerId(this).replace("zone",""),10);
							doLagerZeit(zoneNr);
							if(!this.getAttribute("mouseOverText")){
								var zoneNrF=zoneNr+6*farmNr;
								var buildinginfoname=(zoneTyp[zoneNrF]==1&&unsafeWindow.userfarminfos[farmNr+1]["forestry"]!=undefined?(zoneNr%3==0?'buildinginfo_right':'buildinginfo_left'):'buildinginfo');
								var newdiv=createElement("div",{},false,$(buildinginfoname+zoneNr).getElementsByTagName("div")[0].innerHTML);
								var newdiv1;
								var points=0;
								for(var k in zoneErnte[zoneNrF]){
									if(!zoneErnte[zoneNrF].hasOwnProperty(k)){ continue; }
									points += zoneErnte[zoneNrF][k][1];
								}
								pointsFormat(points,"div",newdiv);
								if(FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]]){
									newdiv1=createElement("div",{"style":"line-height:16px;white-space:nowrap;"},newdiv);
									if(FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]].length==1){
										produktPic(FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]][0][0],newdiv1);
										createElement("span",{},newdiv1,FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]][0][1]+"&nbsp;"+prodName[FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]][0][0]]);
									}else{
										var time=60*growTime[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]]*(100-unsafeWindow.userfarminfos[farmNr+1][zoneNr]["time"])*unsafeWindow.userfarminfos[farmNr+1][zoneNr]["animals"];
										if(unsafeWindow.premium==0 && USERLEVEL>9){ time -= 1; } // small hack. non-premiums cant feed completely
										produktPic(FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]][0][0],newdiv1);
										createElement("span",{},newdiv1,Math.floor(time/(2*100*FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]][0][1]),1)+"&nbsp;"+prodName[FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]][0][0]]);
										newdiv1=createElement("div",{"style":"line-height:16px;white-space:nowrap;"},newdiv);
										produktPic(FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]][1][0],newdiv1);
										createElement("span",{},newdiv1,Math.floor(time/(2*100*FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]][1][1]),1)+"&nbsp;"+prodName[FEED[unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"]][1][0]]);
									}
								}
								this.setAttribute("mouseOverText",newdiv.innerHTML);
								newdiv=null;newdiv1=null;
							}
							showToolTip(event,this.getAttribute("mouseOverText"),this);
						},false);
					}
					// Replacing the SpecialWater Icon (else its mouseover is overlayered by zone mouseover)
					if(help=(/changeGardenSpecial\(\d+,(\d+)\)/).exec(divZone.innerHTML)){
						newdiv=divZone.getElementsByClassName("stt"+help[1])[0];
						newdiv.parentNode.parentNode.appendChild(newdiv);
					}
					// more animals
					if (zoneTyp[zoneNrF]==1){
						if(zoneFieldData[zoneNrF]["space"]&&(zoneFieldData[zoneNrF]["space"][1]<120)){
							createElement("div",{"class":"blackbox","style":"position:absolute;top:50px;left:50px;padding:4px;font-weight:bold;"},divZone.firstElementChild.firstElementChild,numberFormat(100*zoneFieldData[zoneNrF]["space"][1]/120)+"%");
						}
					}else if (zoneTyp[zoneNrF]==2){
						createElement("img",{"src":GFX+"chickenmapani2.gif","style":"position:absolute;top:30px;left:10px;"},divZone.firstElementChild.firstElementChild);
						createElement("img",{"src":GFX+"chickenmapani2.gif","style":"position:absolute;top:30px;left:50px;"},divZone.firstElementChild.firstElementChild);
						createElement("img",{"src":GFX+"chickenmapani1.gif","style":"position:absolute;top:50px;left:70px;"},divZone.firstElementChild.firstElementChild);
						createElement("img",{"src":GFX+"chickenmapani1.gif","style":"position:absolute;top:60px;left:30px;"},divZone.firstElementChild.firstElementChild);
						createElement("img",{"src":GFX+"chickenmapani1.gif","style":"position:absolute;top:80px;left:30px;"},divZone.firstElementChild.firstElementChild);
						createElement("img",{"src":GFX+"chickenmapani2.gif","style":"position:absolute;top:100px;left:50px;"},divZone.firstElementChild.firstElementChild);
					}else if (zoneTyp[zoneNrF]==4){
						createElement("img",{"src":GFX+"sheep_ani01.gif","style":"position:absolute;top:60px;left:30px;"},divZone.firstElementChild.firstElementChild);
						createElement("img",{"src":GFX+"sheep_ani02.gif","style":"position:absolute;top:30px;left:10px;"},divZone.firstElementChild.firstElementChild);
					}
					raiseEvent("nodeModifiedZone"+zoneNr);
				}
				// Reallocate Button
				if(newdiv=$("reallocatebuildingbutton"+zoneNr)){ removeElement(newdiv.parentNode); }

				var divZoneInfo=$("zoneinfo"+zoneNr);
				if(!divZoneInfo){
					divZoneInfo=createElement("div",{"id":"zoneinfo"+zoneNr},divZone);
					createElement("div",{"id":"timeevent"+zoneNr,"class":"blackbox"},divZone);
					divZoneInfo.addEventListener("mouseover",function(){
						var currId=parseInt(this.id.replace("zoneinfo",""),10);
						var divtimeevent=$("timeevent"+currId);
						divtimeevent.innerHTML="";
						var newdiv=createElement("div",{},divtimeevent,texte["ertrag"]+":");
						for(var k in zoneErnte[currId+6*farmNr]){
							if(!zoneErnte[currId+6*farmNr].hasOwnProperty(k)){ continue; }
							newdiv=createElement("div",{"style":"height:15px"},divtimeevent);
							produktPic(k,newdiv);
							createElement("span",{},newdiv,numberFormat(zoneErnte[currId+6*farmNr][k][0])+"&nbsp;"+prodName[k]);
						}
						divtimeevent.style.display="block";
						newdiv=null;divtimeevent=null;
					},false);
					divZoneInfo.addEventListener("mouseout",function(){$(this.id.replace("zoneinfo","timeevent")).style.display="none";},false);
				}

				if(!zoneBlock[zoneNrF]){
					if (zoneTyp[zoneNrF]==1){
						// Field
						divZoneInfo.setAttribute("class","v"+zoneMainprod[zoneNrF]);
						if (nextTime[zoneNrF]<=now){
							if (divZoneInfo.childElementCount==0){ createElement("img",{"src":GFX+"incoming.gif", "style":"position:absolute; top:30px;"},divZoneInfo); }
						}else{
							if (divZoneInfo.childElementCount>0){ removeElement(divZoneInfo.firstElementChild); }
						}
					}else{
						// Stable and Factory
						zoneNext[zoneNrF]=unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"];
						zoneErnte[zoneNrF]=new Object;
						if ((!isNaN(unsafeWindow.run[zoneNr]))&&(parseInt(unsafeWindow.run[zoneNr],10)>0)){
							if (!isNaN(unsafeWindow.time[zoneNr])){
								nextTime[zoneNrF]=1+parseInt(unsafeWindow.time[zoneNr],10)+now-unsafeWindow.Zeit.Verschiebung;
								if(unsafeWindow.time[zoneNr]>=0){
									// running
// GM_log("check "+zoneNrF+": case running : "+unsafeWindow.run[zoneNr]+"("+(typeof unsafeWindow.run[zoneNr])+") : "+unsafeWindow.time[zoneNr]+"("+(typeof unsafeWindow.time[zoneNr])+")")
									if(unsafeWindow.GMreadyZone[zoneNrF]){ delete unsafeWindow.GMreadyZone[zoneNrF]; }
								}else{
									// finished
// GM_log("check "+zoneNrF+": case finished? : "+unsafeWindow.run[zoneNr]+"("+(typeof unsafeWindow.run[zoneNr])+") : "+unsafeWindow.time[zoneNr]+"("+(typeof unsafeWindow.time[zoneNr])+")")
									if(unsafeWindow.GMreadyZone[zoneNrF]&&(unsafeWindow.GMreadyZone[zoneNrF][1]!="r")){ unsafeWindow.GMreadyZone[zoneNrF][1]="r"; }
								}
							}else{
								// running interval but no time set
								GM_log("doZone BAD DATA zoneNrF="+zoneNrF+": run="+unsafeWindow.run[zoneNr]+"("+(typeof unsafeWindow.run[zoneNr])+") : time="+unsafeWindow.time[zoneNr]+"("+(typeof unsafeWindow.time[zoneNr])+")");
							}
							var menge=unsafeWindow.produkt_ernte[zoneNext[zoneNrF]]*((unsafeWindow.userfarminfos[farmNr+1][zoneNr]["animals"]>0)?(parseInt(unsafeWindow.userfarminfos[farmNr+1][zoneNr]["animals"],10)):1);
							zoneErnte[zoneNrF][zoneNext[zoneNrF]]=(currentPowerup[zoneNext[zoneNrF]]&&(nextTime[zoneNrF]<currentPowerup[zoneNext[zoneNrF][0]]))?[menge*(1+currentPowerup[zoneNext[zoneNrF]][1]),menge*(POINTS[zoneNext[zoneNrF]]+currentPowerup[zoneNext[zoneNrF]][2])]:[menge,menge*POINTS[zoneNext[zoneNrF]]];
						}else{
							// empty
// GM_log("check "+zoneNrF+": case empty : "+unsafeWindow.run[zoneNr]+"("+(typeof unsafeWindow.run[zoneNr])+") : "+unsafeWindow.time[zoneNr]+"("+(typeof unsafeWindow.time[zoneNr])+")")
							nextTime[zoneNrF]=NEVER;
							if(unsafeWindow.GMreadyZone[zoneNrF]&&(unsafeWindow.GMreadyZone[zoneNrF][1]!="e")){ unsafeWindow.GMreadyZone[zoneNrF][1]="e"; }
						}
						nextTimeWasser[zoneNrF]=NEVER;
					}
				}
				newdiv=null;divZoneInfo=null;
			}
			// saving
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_nextTime_"+zoneNrF,nextTime[zoneNrF]);
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_nextTimeWasser_"+zoneNrF,nextTimeWasser[zoneNrF]);
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneErnte_"+zoneNrF,implode(zoneErnte[zoneNrF]));
			divZone=null;
		}
		//GM_log("End doZone "+zoneNr);
	}

	unsafeWindow._updateZone=unsafeWindow.updateZone;
	unsafeWindow.updateZone = function(position,buildingid,level,empty,animals,status){
		//GM_log("updateZone "+position+":"+buildingid+":"+level+":"+empty+":"+animals+":"+status);
		unsafeWindow._updateZone(position,buildingid,level,empty,animals,status);
		doZone(parseInt(position,10));
	};

	// field
	function checkFieldTimes(){
		if(DEVMODE) GM_log("checkFieldTimes");
		var zoneNr=parseInt(/parent.cache_me\((\d+?),120/.exec($("gardenarea").innerHTML)[1],10);
		var zoneNrF=zoneNr+6*farmNr;
		var newData=new Object();

		// save garden-informations
		var helpArray=new Array();
		var helpArray2=new Array();
		for(var v=1;v<=120;v++){
			var z=parseInt(unsafeWindow.garten_zeit[v],10);
			var p=unsafeWindow.garten_prod[v];
			switch(unsafeWindow.garten_kategorie[v]){
			case "v":{ // plants
				helpArray[v]=true;
				helpArray2[v]=false;
				if (z>0){
					if ((unsafeWindow.garten_x[v]==1)&&(unsafeWindow.garten_y[v]==1)){ // only first part of a plant
						var w=parseInt(unsafeWindow.garten_wasser[v],10)+86400;
						w=(w==86400)?1:(w<z?w:undefined); // watertime:undefined
						if(!newData[p]){ newData[p]=new Array(); }
						var notfound=true;
						for(var i=0;i<newData[p].length;i++){
							if(notfound&&(newData[p][i][1]==z)&&(newData[p][i][2]==w)){
								newData[p][i][0]++;
								notfound=false;
							}
						}
						if(notfound){ newData[p].push([1,z,w]); }
					}
					// only show one sprinkler
					if ((unsafeWindow.garten_x[v]==2)||(unsafeWindow.garten_y[v]!=unsafeWindow.garten_max_y[v])){
						if ($("w"+v).style.display!="none") $("w"+v).style.display="none";
					}else{
						if ($("w"+v).style.display!="") $("w"+v).style.display="";
					}
				}else{
					helpArray[v]=true;
					helpArray2[v]=true;
				}
			break;}
			case "z":{ // decorations
				helpArray[v]=false;
				helpArray2[v]=false;
				if ((unsafeWindow.garten_x[v]==1)&&(unsafeWindow.garten_y[v]==1)){ // only first part
					if(!newData[p]){ newData[p]=new Array(); }
					var notfound=true;
					for(var i=0;i<newData[p].length;i++){
						if(notfound&&(newData[p][i][1]==z)){
							newData[p][i][0]++;
							notfound=false;
						}
					}
					if(notfound){ newData[p].push([1,z]); }
				}
			break;}
			case "u":{ // garbage
				helpArray[v]=false;
				helpArray2[v]=false;
				if(!newData[p]){ newData[p]=1; }
				else{ newData[p]++; }
			break;}
			default:{ // empty fields , p==0
				helpArray[v]=true;
				helpArray2[v]=true;
			break;}
			}
		}

		// calculate current space
		newData["-"]=[,0,0,,0];
		for(var v=1;v<helpArray2.length;v++){
			if(helpArray2[v]){ newData["-"][1]++; }
		}
		var help=helpArray2.slice();
		for(var v=1;v<help.length;v++){
			if((v%12!=0)&&help[v]&&help[v+1]){
				help[v+1]=false;
				newData["-"][2]++;
			}
		}
		var help=helpArray2.slice();
		for(var v=1;v<help.length;v++){
			if((v%12!=0)&&help[v]&&help[v+1]&&help[v+12]&&help[v+13]){
				help[v+1]=false;
				help[v+12]=false;
				help[v+13]=false;
				newData["-"][4]++;
			}
		}

		// calculate possible space
		newData["space"]=[,0,0,,0];
		for(var v=1;v<helpArray.length;v++){
			if(helpArray[v]){ newData["space"][1]++; }
		}
		var help=helpArray.slice();
		for(var v=1;v<help.length;v++){
			if((v%12!=0)&&help[v]&&help[v+1]){
				help[v+1]=false;
				newData["space"][2]++;
			}
		}
		var help=helpArray.slice();
		for(var v=1;v<help.length;v++){
			if((v%12!=0)&&help[v]&&help[v+1]&&help[v+12]&&help[v+13]){
				help[v+1]=false;
				help[v+12]=false;
				help[v+13]=false;
				newData["space"][4]++;
			}
		}

		zoneFieldData[zoneNrF]=newData;
		newData=null;
		if(DEVMODE){ GM_log("zoneFieldData["+zoneNrF+"]= "+ implode(zoneFieldData[zoneNrF])); }
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneFieldData_"+zoneNrF,implode(zoneFieldData[zoneNrF]));
		unsafeWindow.GMzoneFieldData=zoneFieldData.clone();

		// calculate garden-informations
		processZoneFieldData(zoneNrF);
		// auto-watering
		if(valGiess && (nextTimeWasser[zoneNrF]<unsafeWindow.Zeit.Server) && (lastGiess!=zoneNr) && $("tooltipwaterall")){
			unsafeWindow.waterGarden(zoneNr);
			lastGiess=zoneNr;
		}
		//auto-cropping
		if(valErnte && (nextTime[zoneNrF]<unsafeWindow.Zeit.Server) && (lastErnte!=zoneNr)){
			unsafeWindow.cropGarden(zoneNr);
			lastErnte=zoneNr;
		}
		// update zone-icons
		doZone(zoneNr);
		// show croppings of this field
		var cell=$("currentFieldZoneErnte");
		var newdiv;
		if(cell){ cell.innerHTML=""; }
		else{ cell=createElement("div",{"id":"currentFieldZoneErnte","style":"position:absolute;top:40px;left:0;","class":"blackbox"},$("gardenmaincontainer")); }
		for(var k in zoneErnte[zoneNrF]){
			if(!zoneErnte[zoneNrF].hasOwnProperty(k)){ continue; }
			newdiv=createElement("div",{"style":"height:15px"},cell);
			produktPic(k,newdiv);
			createElement("span",{},newdiv,numberFormat(zoneErnte[zoneNrF][k][0])+"&nbsp;"+prodName[k]);
		}
		cell=null;newdiv=null;
	}
	document.addEventListener("gameFieldModified",checkFieldTimes,false);

	document.addEventListener("gameOpenField",function(){
		var zoneNr=parseInt(/parent.cache_me\((\d+?),120/.exec($("gardenarea").innerHTML)[1],10);
		var zoneNrF=zoneNr+6*farmNr;
		//GM_log("event: gameOpenField "+zoneNrF);
		//Log(unsafeWindow.gartenshortinfo);
		var newdiv;
		if (!$("divErnteInfo")){ createElement("div",{"id":"divErnteInfo"},$("gardenmaincontainer")); }
		if (!$("ackerNavi")){
			newdiv=createElement("div",{"id":"ackerNavi"},$("gardenmaincontainer"));
			var c1=zoneNrF-1;
			while(zoneBlock[c1]||(zoneTyp[c1]!=1)){c1=((c1+16)%18)+1;}
			var c2=zoneNrF+1;
			while(zoneBlock[c2]||(zoneTyp[c2]!=1)){c2=(c2%18)+1;}
			if (c1!=zoneNrF){
				if (c1!=c2){
				newdiv1=createElement("div",{"class":"link leftarrow","name":c1},newdiv);
				newdiv1.addEventListener("click",function(){
					goToZone(this.getAttribute("name"));
					removeElement($("ackerNavi"));
				},false);
				}
				newdiv1=createElement("div",{"class":"link rightarrow","name":c2},newdiv);
				newdiv1.addEventListener("click",function(){
					goToZone(this.getAttribute("name"));
					removeElement($("ackerNavi"));
				},false);
			}
		}

		doLagerZeit(zoneNr);

		//Klon des Anpflanzautomaten
		if($("gardencancel").childElementCount==1 && $("autoplantbutton"+zoneNr)){
			newdiv=$("autoplantbutton"+zoneNr).parentNode.cloneNode(true);
			newdiv.addEventListener("click",function(){$("gardenmaincontainer").setAttribute("style","display:none");},false);
			$("gardencancel").appendChild(newdiv);
		}
		newdiv=null;

	},false);
	unsafeWindow._getGardenInfoResponse=unsafeWindow.getGardenInfoResponse;
	unsafeWindow.getGardenInfoResponse = function(request,position){
		unsafeWindow._getGardenInfoResponse(request,position);
		if((request.readyState==4)&&(request.status==200)){
			//GM_log("getGardenInfoResponse "+position);
			raiseEvent("gameOpenField");
			raiseEvent("gameFieldModified");
		}
	};
	/*
	unsafeWindow._getGardenInfoProcessResponse=unsafeWindow.getGardenInfoProcessResponse;
	unsafeWindow.getGardenInfoProcessResponse = function getGardenInfoProcessResponse(request,position){
		unsafeWindow._getGardenInfoProcessResponse(request,position);
		if((request.readyState==4)&&(request.status==200)){
			GM_log("getGardenInfoProcessResponse "+position);
		}
	};
	*/
	unsafeWindow._PflanzResponse=unsafeWindow.PflanzResponse;
	unsafeWindow.PflanzResponse = function(request){
		unsafeWindow._PflanzResponse(request);
		if((request.readyState==4)&&(request.status==200)){
			//GM_log("PflanzResponse");
			raiseEvent("gameFieldModified");
		}
	};
	unsafeWindow._WasserResponse=unsafeWindow.WasserResponse;
	unsafeWindow.WasserResponse = function(request){
		unsafeWindow._WasserResponse(request);
		if((request.readyState==4)&&(request.status==200)){
			//GM_log("WasserResponse");
			raiseEvent("gameFieldModified");
		}
	};
	unsafeWindow._ErnteResponse=unsafeWindow.ErnteResponse;
	unsafeWindow.ErnteResponse = function(request){
		unsafeWindow._ErnteResponse(request);
		if((request.readyState==4)&&(request.status==200)){
			//GM_log("ErnteResponse");
			raiseEvent("gameFieldModified");
		}
	};
	unsafeWindow._AbrissResponse=unsafeWindow.AbrissResponse;
	unsafeWindow.AbrissResponse = function(request){
		unsafeWindow._AbrissResponse(request);
		if((request.readyState==4)&&(request.status==200)){
			//GM_log("AbrissResponse");
			raiseEvent("gameFieldModified");
		}
	};

	$("gardenmaincontainer").addEventListener ("DOMAttrModified", function(event){
		if(this==event.target){
			//GM_log("gardenmaincontainer DOMAttrModified "+event.target.id+":"+event.attrName+":"+event.newValue);
			if(this.style.display!="block"){
				lastGiess=0;
				lastErnte=0;
				if ($("divErnteInfo")) removeElement($("divErnteInfo"));
				if ($("ackerNavi")) removeElement($("ackerNavi"));
				//if ($("lager_zeit_ziel").parentNode.style.display == "") $("lager_zeit_ziel").parentNode.style.display="none";
			}
		}
	},false);

	unsafeWindow._errorboxgarden=unsafeWindow.errorboxgarden;
	unsafeWindow.errorboxgarden = function(text,onclick){
		unsafeWindow._errorboxgarden(text,onclick);
		$("divErnteInfo").innerHTML=$("errorboxcontentgarden").innerHTML;
		$("divErnteInfo").style.display="block";
		if (valErnteMsg){ $("errorboxgarden").style.display="none"; }
		var zoneNr=/refreshGarden\((\d)\)/.exec($("errorboxfootergarden").parentNode.innerHTML);
		if(zoneNr){
			zoneNr=zoneNr[1];
			unsafeWindow.refreshGarden(zoneNr);
		}
	};

	$("commitbox").addEventListener ("DOMAttrModified", function(event){
		if(this==event.target){
			if(this.style.display!="none"){
				if ($("autoplantproduct")){ // Anpflanzautomat vordefinieren
					if (!aktivAutomat && (unsafeWindow.kategorie=="v")){ $("autoplantproduct").value=unsafeWindow.selected; }
					aktivAutomat=true;
				}
			}else{ aktivAutomat=false; }
		}
	},false);

	// Farmhouse
	unsafeWindow._initFarmhouseResponse=unsafeWindow.initFarmhouseResponse;
	unsafeWindow.initFarmhouseResponse = function(request){
		unsafeWindow._initFarmhouseResponse(request);
		if(unsafeWindow.reallocatebuildinghead&&!$("reallocatebuildingbutton")){
			var newdiv=createElement("div",{"onclick":"initReallocateBuilding();showDiv('transp');","style":"position:absolute;top:70px;right:20px;","class":"link"},$("farmhousecontainer"));
			createElement("img",{"id":"reallocatebuildingbutton","onmouseout":"this.src=_GFX+'reallocatebuildingbutton_off.png';hideDiv('reallocatebuildinginfo');","onmouseover":"this.src=_GFX+'reallocatebuildingbutton_on.png';showDiv('reallocatebuildinginfo');","src":GFX+"reallocatebuildingbutton_off.png","class":"link","style":"width:25px;height:25px;"},newdiv);
			createElement("div",{"id":"reallocatebuildinginfo","style":"display:none;position:absolute;top:70px;right:50px;","class":"blackbox"},$("farmhousecontainer"),unsafeWindow.reallocatebuildinghead);
			newdiv=null;
		}
	};
	unsafeWindow._feedAnimalResponse=unsafeWindow.feedAnimalResponse;
	unsafeWindow.feedAnimalResponse = function(request,position,product,amount){
		unsafeWindow._feedAnimalResponse(request,position,product,amount);
		if(checkRequest(request)){
			showBlase(position); // update the shown producing time
		}
	};
	// stable and factory
	document.addEventListener("gameOpenStable",function(){
		//GM_log("gameOpenStable "+unsafeWindow.currentposition);
		var zoneNr=parseInt($("innermaincontainer").firstElementChild.firstElementChild.id.replace("button_cancel",""),10);
		var zoneNrF=zoneNr+6*farmNr;
		showBlase(zoneNr);
		$("sprcontent2").addEventListener("DOMAttrModified",function(event){
			if(this==event.target){
				if($("innermaincontainer").style.display=="block"){
					if(this.style.display!=""){
						var zoneNr=parseInt($("innermaincontainer").firstElementChild.firstElementChild.id.replace("button_cancel",""),10);
						showBlase(zoneNr);
					}
				}else{
					removeEventListener("DOMAttrModified",arguments.callee,false);
				}
			}
		},false);
		drawZoneNavi(zoneNrF);
		var cand;
		cand=$("innercontent").getElementsByClassName("feedproduct");
		for(var v=0;v<cand.length;v++){
			var currProd=parseInt(cand[v].getElementsByTagName("div")[1].getAttribute("class").replace("l",""),10);
			var str="blackbox"+(prodBestand[currProd]<prodMinRack[currProd]?" lowrack":"");
			newdiv=$(cand[v].id+"_rackamount");
			if(!newdiv){
				newdiv=createElement("div",{"id":cand[v].id+"_rackamount","style":"position:absolute;top:-25px;left:-2px;font-weight:bold;"},cand[v]);
			}
			if(newdiv.getAttribute("class")!=str){ newdiv.setAttribute("class",str); }
			newdiv.innerHTML=numberFormat(prodBestand[currProd],0,"","").replace(/(\d{3,})(\d{3})/,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2");
		}
		if (valErnte && ($("commitboxcrop").style.display=="block")){ click($("commitboxfootercrop").firstElementChild); }

		for(var v=0;v<animalMove.length;v++){ if((valMoveAnimals[v])&&(!animalMove[v][0])&&($("animalline"+v))){
			animalMove[v][0]=true;
			moveAnimals(v);
			break;
		}}
		cand=null;
	},false);
	$("commitboxinner").addEventListener ("DOMAttrModified", function(event){
		if ((this==event.target)&&(this.style.display == "block")){
			if (!$("feedMax")){
				var cand=createElement("a",{"id":"feedMax","class":"link","style":"font-weight:bold;"});
				cand.innerHTML="max";
				$("commitboxcontentinner").firstElementChild.insertBefore(cand,$("feedamount").nextSibling);
				cand.addEventListener("click",function(){$("feedamount").value=216;keyup($("feedamount"));},false);
				cand=null;
			}
		}
	},false);

	document.addEventListener("gameOpenFactory",function(){
		//GM_log("gameOpenFactory "+unsafeWindow.currentposition);
		var zoneNr=parseInt($("innermaincontainer").firstElementChild.firstElementChild.id.replace("button_cancel",""),10);
		var zoneNrF=zoneNr+6*farmNr;
		showBlase(zoneNr);
		$("sprcontent2").addEventListener("DOMAttrModified",function(event){
			if(this==event.target){
				if($("innermaincontainer").style.display=="block"){
					if(this.style.display!=""){
						var zoneNr=parseInt($("innermaincontainer").firstElementChild.firstElementChild.id.replace("button_cancel",""),10);
						showBlase(zoneNr);
					}
				}else{
					removeEventListener("DOMAttrModified",arguments.callee,false);
				}
			}
		},false);
		drawZoneNavi(zoneNrF);
		var cand,newdiv;
		if(!$("articleline"+unsafeWindow.locationinfo[6])){
			cand=createElement("div",{"id":"articleline"+unsafeWindow.locationinfo[6]},$("innercontent"));
			cand=createElement("div",{"id":(farmNr+1)+"_"+zoneNr+"_article"+unsafeWindow.locationinfo["in"],"class":"feedproduct","style":"position:absolute;top:54px;left:55px;border:2px solid black;z-index:11;"},cand);
			createElement("div",{"id":"articleimg"+unsafeWindow.locationinfo["in"],"style":"position:absolute;","class":"l"+unsafeWindow.locationinfo["in"]},createElement("div",{"style":"position:absolute;top:5px;left:5px;width:40px;height:40px;overflow:hidden;"},cand));
			cand.addEventListener("mouseover",function(event){ showToolTip(event,unsafeWindow.locationinfo["need"]+"x "+prodName[unsafeWindow.locationinfo["in"]]); },false);
		}

		var cand=$("innercontent").getElementsByClassName("feedproduct");
		for(var v=0;v<cand.length;v++){
			var currProd=parseInt(cand[v].getElementsByTagName("div")[1].getAttribute("class").replace("l",""),10);
			var str="blackbox"+(prodBestand[currProd]<prodMinRack[currProd]?" lowrack":"");
			if(!$(cand[v].id+"_rackamount")){ createElement("div",{"id":cand[v].id+"_rackamount","style":"position:absolute;top:-25px;left:-2px;font-weight:bold;"},cand[v]); }
			newdiv=$(cand[v].id+"_rackamount");
			if(newdiv.getAttribute("class")!=str){ newdiv.setAttribute("class",str); }
			newdiv.innerHTML=numberFormat(prodBestand[currProd],0,"","").replace(/(\d{3,})(\d{3})/,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2");
		}
		if (valErnte && ($("commitboxcrop").style.display=="block")){ click($("commitboxfootercrop").firstElementChild); }
		cand=null;newdiv=null;
	},false);
	/*
	$("innermaincontainer").addEventListener ("DOMAttrModified", function(event){
		if(this==event.target){
			GM_log("innermaincontainer DOMAttrModified "+event.target.id+":"+event.attrName+":"+event.newValue);
			if(this.style.display=="block"){
				// unsafeWindow.locationinfo is set before displaying
				if($("innermaincontainer").style.display == "block"){
					if(unsafeWindow.locationinfo["in"]){ raiseEvent("gameOpenFactory"); }
					else{ raiseEvent("gameOpenStable"); }
				}else{
					if($("zoneNavi")){ removeElement($("zoneNavi")); }
				}
			}
		}
	},false);

	var test=0;
	$("innercontent").addEventListener ("DOMNodeInserted", function(event){
		GM_log("innercontent DOMNodeInserted "+event.target.id);
	},false);
	*/

	unsafeWindow._innerInfosResponse=unsafeWindow.innerInfosResponse;
	unsafeWindow.innerInfosResponse = function(request,position){
		unsafeWindow._innerInfosResponse(request,position);
		if($("innermaincontainer").style.display == "block"){
			if(unsafeWindow.locationinfo["in"]){ raiseEvent("gameOpenFactory"); }
			else{ raiseEvent("gameOpenStable"); }
		}
	};

	// Club
	// Clubquest direct show
	var lastGuildQuestRequest=0;
	function clubQuestToolTip(data){
		var container=$("guildlink_tt_quest");
		container.innerHTML="";
		var newdiv=createElement("div",{"style":"position:absolute;top:5px;left:5px;"},container);
		var newspan=createElement("span",{"style":"margin-right:2px;"},newdiv);
		if(data!=0){
			createElement("img",{"src":GFX+'adtime.gif'},newspan);
			createElement("span",{"style":"font-weight:bold;"},newdiv,getTimeStr(data['remain']));
			if(data['questtype'] == 1 || data['questtype'] == 2){  // produkte oder geld in vorgegebener zeit
				var top=25;
				var left=0;
				var newdiv1;
				for(var i=1 ; i <= 2 ; i++){
					if(data['product' + i] > 0){
						data['sum' + i]=parseInt(data['sum' + i],10);
						data['amount' + i]=parseInt(data['amount' + i],10);
						var barleft=parseInt(Math.round((data['sum' + i] * 100) / data['amount' + i])-100,10);

						if(data['questtype'] == 2){
							data['sum' + i]=moneyFormat(data['sum' + i]);
							data['amount' + i]=moneyFormat(data['amount' + i]);
						}

						newdiv=createElement("div",{"style":'position:absolute; top:' + top + 'px; left:' + left + 'px;width:40px;height:15px;'},container);
						if(data['questtype'] == 1){
							newdiv1=createElement("div",{"style":"position:absolute; top:0; left:5px;height:15px;width:15px; overflow:hidden;"},newdiv);
							createElement("img",{"class":"kp" + data['product' + i], "style":"position:absolute;"},newdiv1);
						}
						else if(data['questtype'] == 2){
							newdiv1=createElement("div",{"style":"position:absolute; top:0; left:5px;height:15px;width:15px;"},newdiv);
							createElement("img",{"src":GFX+"money.gif","height":"15","width":"15"},newdiv1);
						}
						newdiv1=createElement("div",{"style":"position:absolute;top:0;left:23px;border:1px solid #000;background-color:#fff;width:100px;height:15px;overflow:hidden;"},newdiv);
						createElement("div",{"style":"position:absolute;top:0;left:"+barleft+"px;background-color:#f00;width:100px;height:25px;"},newdiv1);
						createElement("div",{"style":"position:absolute;top:0;left:0;width:100px;height:15px;color:black;font-weight:bold;text-align:center;"},newdiv1,numberFormat(data['sum' + i]));
						createElement("div",{"style":"position:absolute;top:20px;white-space:nowrap;left:5px;"},newdiv,(data['amount' + i]==data['sum' + i])?"":('<b>' + numberFormat(data['amount' + i]-data['sum' + i]) + '/' + numberFormat(data['amount' + i]) + '</b>'));
				top += 40;
				}	}
				newdiv1=null;
			}
		}else{
			newspan.innerHTML="---";
		}
		container=null;newdiv=null;newspan=null;
	}
	if((newdiv=$("guildlink"))&&(newdiv1=$("guildlink_tt"))){
		var str=newdiv1.innerHTML;
		newdiv1.innerHTML="";
		createElement("div",{"style":"border-bottom:1px solid white;"},newdiv1,str);
		createElement("div",{"id":"guildlink_tt_quest","style":"position:relative;width:130px;height:100px;"},newdiv1,"---");
		newdiv.addEventListener("mouseover",function(){
			if (now-lastGuildQuestRequest>30){ // 30 seconds delay to next request
				lastGuildQuestRequest=now;
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://s"+SERVER+"."+GAMEPAGES[LNG]+"/guild/ajax/initguild.php?rid="+unsafeWindow.rid,
					headers: {"Content-type": "application/x-www-form-urlencoded"},
					onload: function(response){
						if(response.responseText!=0){
							var result=eval('(' + response.responseText + ')');
							if(result[0]!=0){
								clubQuestToolTip(result[0][2]);
							}
						}
					}
				});
			}
		},false);
	}

	// Clubquest updated
	unsafeWindow._setGuildQuestResponse=unsafeWindow.setGuildQuestResponse;
	unsafeWindow.setGuildQuestResponse = function(request){
		unsafeWindow._setGuildQuestResponse(request);
		var result=checkRequest(request);
		if(result){
			lastGuildQuestRequest=now;
			clubQuestToolTip(result[1]);
		}
	};

	// Clubdata loaded
	unsafeWindow._initGuildResponse=unsafeWindow.initGuildResponse;
	unsafeWindow.initGuildResponse = function(request){
		unsafeWindow._initGuildResponse(request);
		var result=checkRequest(request);
		if(result){
			lastGuildQuestRequest=now;
			clubQuestToolTip(result[0][2]);
		}
	};

	// Memberlist
	unsafeWindow._openMultiBox=unsafeWindow.openMultiBox;
	unsafeWindow.openMultiBox = function(id){
		if(id==5){
			$('guildmultiboxheader').innerHTML='<img class="link" src="' + unsafeWindow.imgpath + 'button_cancel_off.png" onclick="hideDiv(\'transp9\'); hideDiv(\'guildmultibox\');" onmouseover="this.src=\'' + unsafeWindow.imgpath + 'button_cancel_on.png\';" onmouseout="this.src=\'' + unsafeWindow.imgpath + 'button_cancel_off.png\';"></div>';
			$('guildmultiboxcontent').innerHTML='';
			unsafeWindow.showGuildQuestStats(2,1,0);
			for(var i=1;i<=3;i++){
				$('guildmultiboxmenue'+i).style.backgroundImage="url(" + unsafeWindow.imgpath + "leer.gif)";
			}
			$('guildmultiboxmenue4').style.backgroundImage="url(" + unsafeWindow.imgpath + "multiscreen_reiter4.jpg)";
			$('guildmultiboxheadline').innerHTML=unsafeWindow.guildmultibox_headline4;
			unsafeWindow.hideDiv('guildnewsticker');
			unsafeWindow.showDiv('transp9');
			unsafeWindow.showDiv('guildmultibox');
		}else{
			unsafeWindow._openMultiBox(id);
		}
	};
	$("guildmultiboxmenue4").setAttribute("onclick","openMultiBox(5)");

	unsafeWindow._getGuildMembersResponse=unsafeWindow.getGuildMembersResponse;
	unsafeWindow.getGuildMembersResponse = function(request){
		unsafeWindow._getGuildMembersResponse(request);
		if(request.readyState == 4 && request.status == 200){
			var canddiv=Array.prototype.slice.call($("guildmultiboxcontent").getElementsByClassName("guildmemberlist_even")).concat(Array.prototype.slice.call($("guildmultiboxcontent").getElementsByClassName("guildmemberlist_uneven")));
			var newdiv,newspan,newa;
			for(var v=0;v<canddiv.length;v++){
				newdiv=canddiv[v].children[1].firstElementChild;
				var thisUser=/(.*?)&nbsp;/.exec(newdiv.innerHTML);
				newdiv.innerHTML=newdiv.innerHTML.replace(thisUser[0],"");
				newspan=createElement("span");
				newspan.innerHTML="&nbsp;";
				newdiv.insertBefore(newspan,newdiv.firstElementChild);
				newa=createElement("a",{"class":"link2"});
				newa.innerHTML=thisUser[1];
				newdiv.insertBefore(newa,newdiv.firstElementChild);
				newa.addEventListener("click",function(){
					showShopframePage("http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/stats.php?search=1&searchterm="+this.innerHTML);
				},false);
				//newdiv.insertBefore(igm(thisUser[1]),newdiv.firstElementChild);
			}
			newdiv=null;newspan=null;newa=null;canddiv=null;
		}
	};
	// Questhistory
	unsafeWindow._showGuildQuestStatsResponse=unsafeWindow.showGuildQuestStatsResponse;
	unsafeWindow.showGuildQuestStatsResponse = function(request,type,page,self){
		unsafeWindow._showGuildQuestStatsResponse(request,type,page,self);
		if(checkRequest(request)){
			window.setTimeout(function(){
				if(DEVMODE){ GM_log("showGuildQuestStatsResponse "+request+":"+type+"("+typeof type+"):"+page+"("+typeof self+"):"+self+"("+typeof self+")"); };

				var newdiv=$("chg_guildqueststats");
				newdiv.setAttribute("onchange","");
				newdiv.addEventListener("change",function(){
					var type=parseInt($("chg_guildqueststats").value,10);
					if(type<4){
						unsafeWindow.showGuildQuestStats(type,1,0);
					}else{
						showGuildQuestStatsLastDays(7);
					}
				},false);
				createElement("option",{"value":"4"},newdiv,texte["stat_days7"]);
				if(type>3){
					newdiv.value=type;
					newdiv.nextElementSibling.style.display="none";
				}

				//todayStr=getDateStr(now,2,false);
				var clubmemberLog=new Object();
				try{ clubmemberLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_clubmemberLog","{}")); }catch(err){}
				for(var u in clubmemberLog){
					if(!clubmemberLog.hasOwnProperty(u)){ continue; }
					for(var v in clubmemberLog[u]){
						if(!clubmemberLog[u].hasOwnProperty(v)){ continue; }
						if(v=="0"){ continue; }
						// join old data
						var w=null;
						if(v.match(/^\d+\.\d+\.\d+$/)){
							if(now-getTime(v)>604800){ // 1 week (7*86400)
								w=v.replace(/^(\d+\.)/,"");
							}
						}else if(v.match(/^\d+\.\d+$/)){
							if(now-getTime(v)>16070400){ // 6 months (6*31*86400)
								w=v.replace(/^(\d+\.)/,"");
							}
						}
						if(w!=null){
							if(clubmemberLog[u][w]==undefined){
								clubmemberLog[u][w]=[0,{}];
								clubmemberLog[u].sortObj(sortObjFunctions["date"]);
							}
							clubmemberLog[u][w][0] += clubmemberLog[u][v][0];
							for(var prod in clubmemberLog[u][v][1]){
								if(!clubmemberLog[u][v][1].hasOwnProperty(prod)){ continue; }
								if(clubmemberLog[u][w][1][prod]==undefined){
									clubmemberLog[u][w][1][prod]=0;
									clubmemberLog[u][w][1].sortObj(sortObjFunctions["productId"]);
								}
								clubmemberLog[u][w][1][prod] += clubmemberLog[u][v][1][prod];
							}
							delete clubmemberLog[u][v];
						}
					}
				}

				var clubmembers=new Object();
				var clubmemberLogSum=new Object();
				for(var u in clubmemberLog){
					if(!clubmemberLog.hasOwnProperty(u)){ continue; }
					clubmemberLogSum[u]=[0,{}];
					for(var v in clubmemberLog[u]){
						if(!clubmemberLog[u].hasOwnProperty(v)){ continue; }
						if(v==todayStr){ continue; }
						clubmemberLogSum[u][0] += clubmemberLog[u][v][0];
						for(var w in clubmemberLog[u][v][1]){
							if(!clubmemberLog[u][v][1].hasOwnProperty(w)){ continue; }
							if(clubmemberLogSum[u][1][w]==undefined){
								clubmemberLogSum[u][1][w]=0;
								clubmemberLogSum[u][1].sortObj(sortObjFunctions["productId"]);
							}
							clubmemberLogSum[u][1][w] += clubmemberLog[u][v][1][w];
						}
					}
				}
				var container=$("guildmultiboxcontent");
				var newtable,newtable1,newtr,newtr1,newtd,newdiv1,cell;
				for(var v=0;v<container.childElementCount;v++){
					if(container.children[v].id.match(/^line\d+$/)){
						var lineNr=parseInt(/^line(\d+)$/.exec(container.children[v].id)[1],10);

						var thisUser=container.children[v].children[1].innerHTML;
						var thisPoints=parseInt(container.children[v].children[3].innerHTML,10);
						container.children[v].children[3].innerHTML=numberFormat(thisPoints);

						clubmembers[thisUser]=[thisPoints,{}];

						// reformat of info bubble
						cell=$("bartt"+lineNr);
						cell.style.whiteSpace="nowrap";
						cell.style.left="";
						cell.style.right="30px";
						for(var w=0;w+1<cell.childElementCount;w++){
							if(cell.children[w].style.clear == "both"){ continue; }
							var help=parseInt(cell.children[w].getAttribute("class").replace(/kp/,""),10);
							var help1=parseInt(cell.children[++w].innerHTML.replace(/&nbsp;/g,""),10);
							clubmembers[thisUser][1][help]=help1;
						}
						cell.innerHTML="";

						clubmembers[thisUser][1].sortObj(sortObjFunctions["productId"]);

						newtable=createElement("table",{"cellspacing":"0","class":"white","style":"display:inline-block;vertical-align:top;"},cell);
						var c=2;
						for(var w in clubmembers[thisUser][1]){
							if(!clubmembers[thisUser][1].hasOwnProperty(w)){ continue; }
							if(c==2){
								c=0;
								newtr=createElement("tr",{},newtable);
							}
							c++;
							newtd=createElement("td",{"class":"link hoverBgDarkgreen","style":"text-align:right;padding-right:5px;","prod":w},newtr);
							newtd.addEventListener("mouseover",function(event){
								showGoToMarketToolTip(event,this.getAttribute("prod"));
							},false);
							newtd.addEventListener("click",function(){
								showMarket(this.getAttribute("prod"));
							},false);
							produktPic(w,newtd).style.cssFloat="left";
							createElement("span",{},newtd,numberFormat(clubmembers[thisUser][1][w]));
						}

						if(type==2){ // all quests
							if(clubmemberLog[thisUser]==undefined){
								clubmemberLog[thisUser]=new Object();
								clubmemberLog[thisUser]["0"]=clubmembers[thisUser];
								clubmemberLogSum[thisUser]=clubmembers[thisUser];
							}
							if(clubmemberLog[thisUser][todayStr]==undefined){
								clubmemberLog[thisUser][todayStr]=[0,{}];
								clubmemberLog[thisUser].sortObj(sortObjFunctions["date"]);
							}
							clubmemberLog[thisUser][todayStr][0]=thisPoints-clubmemberLogSum[thisUser][0];
							for(var w in clubmembers[thisUser][1]){
								if(!clubmembers[thisUser][1].hasOwnProperty(w)){ continue; }
								var help=clubmembers[thisUser][1][w]-(clubmemberLogSum[thisUser][1][w]==undefined?0:clubmemberLogSum[thisUser][1][w]);
								if(help>0){
									if(clubmemberLog[thisUser][todayStr][1][w]==undefined){
										clubmemberLog[thisUser][todayStr][1][w]=help;
										clubmemberLog[thisUser][todayStr][1].sortObj(sortObjFunctions["productId"]);
									}else{
										clubmemberLog[thisUser][todayStr][1][w]=help;
									}
								}
							}
						}

						newtable=createElement("table",{"cellspacing":"0","class":"white","style":"display:inline-block;margin-left:5px;vertical-align:top;"},cell);
						var sum=0;
						for(var w in clubmemberLog[thisUser]){
							if(!clubmemberLog[thisUser].hasOwnProperty(w)){ continue; }
							sum += clubmemberLog[thisUser][w][0];
							if(w=="0"){ continue; }
							newtr=createElement("tr",{"class":"hoverBgDarkgreen"});
							newtable.insertBefore(newtr,newtable.firstElementChild);
							newdiv=createElement("div");
								newtable1=createElement("table",{"cellspacing":"0","class":"white","style":"display:inline-block;vertical-align:top;"},newdiv);
								var c=2;
								//var pkte=0;
								for(var prod in clubmemberLog[thisUser][w][1]){
									if(!clubmemberLog[thisUser][w][1].hasOwnProperty(prod)){ continue; }
									if(c==2){
										c=0;
										newtr1=createElement("tr",{},newtable1);
									}
									newtd=createElement("td",{"style":"text-align:right;padding-right:5px;"},newtr1);
									c++;
									produktPic(prod,newtd).style.cssFloat="left";
									createElement("span",{},newtd,numberFormat(clubmemberLog[thisUser][w][1][prod]));
									//pkte += POINTS[prod]*clubmemberLog[thisUser][w][1][prod];
								}
								//createElement("div",{},newdiv,numberFormat(0.05*Math.round(pkte)));
							if(newtable1.childElementCount>0){
								newtr.setAttribute("mouseOverText",newdiv.innerHTML);
								newtr.addEventListener("mouseover",function(event){ showToolTip(event,this.getAttribute("mouseOverText")); },false);
							}
							createElement("td",{"style":"text-align:right;padding-right:5px;border-left:1px solid white;"},newtr,w);
							createElement("td",{"style":"text-align:right;padding-right:5px;"},newtr,numberFormat(sum));
							createElement("td",{"style":"text-align:right;padding-right:5px;"},newtr,(clubmemberLog[thisUser][w][0]>0)?("+"+numberFormat(clubmemberLog[thisUser][w][0])):"");
						}
					}
				}
				cell=null;newtable=null;newtable1=null;newtr=null;newtr1=null;newtd=null;newdiv1=null;
				GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_clubmemberLog",implode(clubmemberLog));
				container=null;newdiv=null;
			},0);
		}
	};
	// New mode for questhistory
	function showGuildQuestStatsLastDays(days){
	//GM_log("showGuildQuestStatsLastDays "+days);
		//todayStr=getDateStr(now,2,false);
		var startDay=new Date();
		startDay=((new Date(startDay.getFullYear(),startDay.getMonth(),startDay.getDate()-days)).getTime())/1000;

		var obj=[0,[],0,1,0];
		var clubmemberLog=new Object();
		try{ clubmemberLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_clubmemberLog","{}")); }catch(err){}
		var clubmemberLogSum=new Object();
		for(var u in clubmemberLog){
			if(!clubmemberLog.hasOwnProperty(u)){ continue; }
			var p=0;
			var help=new Object();
			for(var v in clubmemberLog[u]){
				if(!clubmemberLog[u].hasOwnProperty(v)){ continue; }
				if(v=="0"){ continue; }
				if(startDay<=getTime(v)){
					p += clubmemberLog[u][v][0];
					for(var w in clubmemberLog[u][v][1]){
						if(!clubmemberLog[u][v][1].hasOwnProperty(w)){ continue; }
						help[w]=(help[w]==undefined?0:help[w])+clubmemberLog[u][v][1][w];
					}

				}
			}
			var help2=new Array();
			for(var w in help){
				if(!help.hasOwnProperty(w)){ continue; }
				help2.push({"p":w,"a":help[w]});
			}
			obj[0]=1;
			obj[1].push({"n":u,"p":p,"products":help2,"c":(u==FARMNAME?1:0)});
			obj[2]++;
			obj[4]=Math.max(obj[4],p);
		}
		if(obj[0]==0){
			obj[1]="No data";
		}else{
			obj[1].sort(function(a,b){return (b["p"]-a["p"]);});
		}

		var request=new Object();
		request.readyState=4;
		request.status=200;
		request.responseText=implode(obj);
		//GM_log("responseText= "+implode(obj));
		unsafeWindow.showGuildQuestStatsResponse(request,4,1,0); //type,page,self
		/*
		request: [1,[
			{"n":"name1","p":17049,"products":[{"p":"id","a":amount},...],"c":1},
			...
		],nameCounter,pageNr,highestPoints]
		on error: [0,text]
		*/
	}

	// Clubquest reformat
	$("guildquestbox").addEventListener ("DOMAttrModified", function(event){
		if ((this==event.target)&&(this.style.display == "block")){
			if(!$("guildquestboxBerater")){

				createElement("h1",{"id":"guildquestboxBerater","style":"display:none;"},$("guildquestboxcontent"));
				var cand=$("questobjectives").getElementsByClassName("link");
				var newdiv;
				for(var v=0;v<cand.length;v++){
					newdiv=cand[v].getElementsByTagName("b")[0];
					var help=/(\d+)\/(\d+)/.exec(newdiv.innerHTML.replace(regDelimThou,""));
					help[1]=parseInt(help[1],10);
					help[2]=parseInt(help[2],10);
					newdiv.innerHTML=((help[1]==help[2])?"":(numberFormat(help[2]-help[1])+"/"+numberFormat(help[2])));
					createElement("div",{"style":"position:absolute;top:0;left:0;width:100px;height:15px;color:black;font-weight:bold;text-align:center;"},cand[v].getElementsByTagName("div")[2],numberFormat(help[1]));
				}
				cand=null;newdiv=null;
			}
		}
	},false);
	// Clubquest product submitting
	$("commitboxguild").addEventListener ("DOMAttrModified", function(event){
		if ((this==event.target)&&(this.style.display == "block")){
			if(!$("commitboxguildBerater")){
				createElement("h1",{"id":"commitboxguildBerater","style":"display:none;"},$("commitboxcontentguild"));
				if((help=$("commitboxguildokbutton").getAttribute("onclick")).match(/guildQuestAddProducts\((\d+)\)/)){
					var currProd=/guildQuestAddProducts\((\d+)\)/.exec(help)[1];
					var cand=$("commitboxcontentguild").getElementsByTagName("input")[0];
					cand.setAttribute("prod",currProd);
					// maximal value according to minRack
					cand.value=Math.max(0,Math.min(cand.value,prodBestand[currProd]-prodMinRack[currProd]));
					createElement("div",{"id":"commitboxguildLowrack","class":"blackbox alertbox","style":"display:none;position:absolute;top:135px;left:0;"},$("commitboxcontentguild"),texte["alertWillLowRack"]);
					cand.addEventListener("keyup",function(){
						// warning if more than minRack allows
						var currProd=this.getAttribute("prod");
						var help=(prodBestand[currProd]-parseInt(this.value,10)<prodMinRack[currProd]?"block":"none");
						var cell=$("commitboxguildLowrack");
						if(cell.style.display!=help){ cell.style.display=help; }
						cell=null;
					},false);
					cand=null;
				}
			}
		}
	},false);

	/*
	// wanna see all clubhouses ? ^^
	unsafeWindow._setBeauties=unsafeWindow.setBeauties;
	unsafeWindow.setBeauties = function setBeauties(){
		for(var v=0;v<15;v++){ // <- edit the 18 (=max) to see the steps
			unsafeWindow.guilddata[4][v]=v+1;
		}
		unsafeWindow._setBeauties();
	}
	*/

	// Friendslist
	unsafeWindow._showfriendslist=unsafeWindow.showfriendslist;
	unsafeWindow.showfriendslist = function(status){
		unsafeWindow._showfriendslist(status);
		var cand=$("friendslistcon").getElementsByClassName("friendslinename");
		for(var v=0;v<cand.length;v++){
			var player=cand[v].getElementsByTagName("div")[0].innerHTML.replace(/&nbsp;.*/g,"");
			newspan=vertrag(player,cand[v].nextSibling);
		}
		cand=$("friendslistcon").getElementsByTagName("img");
		for(var v=0;v<cand.length;v++){
			if(cand[v].getAttribute("src").match(/\/guild\/1\.gif/)){
				cand[v].addEventListener("mouseover",function(event){ showToolTip(event,unsafeWindow.guildrank[1]); },false);
			}else if(cand[v].getAttribute("src").match(/\/guild\/2\.gif/)){
				cand[v].addEventListener("mouseover",function(event){ showToolTip(event,unsafeWindow.guildrank[2]); },false);
			}else if(cand[v].getAttribute("src").match(/\/star\.png/)){
				cand[v].addEventListener("mouseover",function(event){ showToolTip(event,unsafeWindow.lng_t_premium); },false);
			}
		}
		cand=null;
	};

	// Friendpage loaded
	unsafeWindow._setFriendInfoContent=unsafeWindow.setFriendInfoContent;
	unsafeWindow.setFriendInfoContent = function(status,sel){
		unsafeWindow._setFriendInfoContent(status,sel);
		if(status == 1){
			var container=$("friendlistinfoblock");
			var cand=container.getElementsByTagName("li");
			var nextQuest=parseInt(cand[5].children[1].innerHTML,10)+1;
			if(QUESTS[nextQuest]){
				cand[5].setAttribute("nextQuest",nextQuest);
				cand[5].addEventListener("mouseover",function(event){
					var nextQuest=this.getAttribute("nextQuest");
					var str="<div style='border-bottom:1px solid white'>"+texte["quest"]+"&nbsp;"+nextQuest+"</div>";
					for(var v=0;v<QUESTS[questNr][0].length;v++){
						str += "<div>"+numberFormat(QUESTS[nextQuest][0][v][1])+"&nbsp;"+prodName[QUESTS[nextQuest][0][v][0]]+"</div>";
					}
					showToolTip(event,str);
				},false);
			}
			cand=null;container=null;
		}
	};

	// Farmis
	// Buylist opening
	unsafeWindow._showCart=unsafeWindow.showCart;
	unsafeWindow.showCart = function(farmi){
		unsafeWindow._showCart(farmi);
		var cand=$top("cartheader").getElementsByTagName("span")[0];
		cand.style.fontWeight="bold";
		cand.setAttribute("class","link");
		cand.addEventListener("mouseover",function(event){ showToolTip(event,texte["zumSGH"]); },false);
		cand.addEventListener("click",showSGH,false);
        cand=null;
		createElement("div",{"id":"cartsubmitPerc","style":"position:absolute;top:-35px;width:70px;padding:2px;text-align:right;font-size:20px;font-weight:bold;"},$("cartsubmit"));

		// get farmi data
		var preis=parseFloat(unsafeWindow.farmisinfo[0][farmi]['price'],10);
		var thisFarmiData=new Array();
		for(var i=1;i<=7;i++){
			var prod=parseInt(unsafeWindow.farmisinfo[0][farmi]['p'+i],10);
			var menge=parseInt(unsafeWindow.farmisinfo[0][farmi]['a'+i],10);
			if((prod>0)&&(menge>0)){
				var wert=menge*gut[prod];
				thisFarmiData.push([prod,menge,wert]);
			}
		}

		// rebuild the table
		function showCartBuildTable(){
			var cartContent=$("cartcontent");
			cartContent.innerHTML="";
			var priceMissing=false;
			thisFarmiData.sort(function(a,b){return (b[2]-a[2]);});

			var newtr,newtd;
			var newtable=createElement("table",{"border":"0","cellspacing":"0","cellpadding":"2","style":"width:270px;"},cartContent);
			var sum=0;
			for(var v=0;v<thisFarmiData.length;v++){
				var prod=thisFarmiData[v][0];
				var menge=thisFarmiData[v][1];
				var wert=thisFarmiData[v][2];
				sum += wert;
				newtr=createElement("tr",{"class":((prodBestand[prod]<menge)?("farmicart_missing"):((prodBestand[prod]-menge<prodMinRack[prod]-((valMinRackFarmis&&totalFarmis[prod])?totalFarmis[prod]:0))?"farmicart_lowrack":"")),"prod":prod},newtable);
				produktPic(prod,createElement("td",{},newtr));
				createElement("td",{"style":"text-align:right;color:#336;font-size:16px;font-weight:bold;"},newtr,numberFormat(menge));
				newtd=createElement("td",{"class":"link","style":"color:#336;font-size:16px;font-weight:bold;"},newtr,prodName[prod]);
				newtd.addEventListener("mouseover",function(event){ showGoToMarketToolTip(event,this.parentNode.getAttribute("prod")); },false);
				newtd.addEventListener("click",function(){showMarket(this.parentNode.getAttribute("prod"));},false);
				newtd=createElement("td",{"class":"link","nr":v,"style":"text-align:right;color:#336;font-size:14px;"},newtr);
				if(wert>0){
					newtd=createElement("div",{"style":"position:relative;height:100%;padding-left:5px;padding-right:5px;"},newtd);
					createElement("div",{"style":"position:absolute;left:0;height:100%;width:"+Math.ceil(100*wert/thisFarmiData[0][2])+"%;background-color:grey;opacity:0.6;z-index:-1;"},newtd);
					createElement("span",{"style":"width:100%;"},newtd,moneyFormatInt(wert));
				}else{
					newtd.style.backgroundColor="red";
					priceMissing=true;
				}
				newtd.addEventListener("mouseover",function(event){ showToolTip(event,texte["editPrice"]); },false);
				newtd.addEventListener("click",function(){
					var cell=this;
					while(cell.nodeName!="TD"){ cell=cell.parentNode; }
					var v=cell.getAttribute("nr");
					cell=$("cartcontentEditPrice");
					if(cell){ removeElement(cell); }
					var newtable=createElement("div",{"id":"cartcontentEditPrice","style":"z-index:10;position:absolute;right:0;top:0;display:block;border-radius:5px;","class":"blackbox"},$("cartcontent"));
					var newtable=createElement("table",{"cellspacing":"0","cellpadding":"0","border":"0","nr":v},newtable);
					var newtr=createElement("tr",{},newtable);
					createElement("td",{"colspan":"2","style":"color:black;text-align:center;padding-bottom:2px;white-space:nowrap;"},newtr,texte["editPrice"]);
					newtr=createElement("tr",{},newtable);
					createElement("td",{"colspan":"2","style":"color:black;border-bottom:1px solid black;text-align:center;padding-bottom:2px;white-space:nowrap;"},newtr,numberFormat(thisFarmiData[v][1])+"&nbsp;"+prodName[thisFarmiData[v][0]]);
					newtr=createElement("tr",{},newtable);
					createElement("td",{"style":"color:black;text-align:left;padding-top:2px;padding-right:10px;"},newtr,texte["marktpreis"]);
					createElement("td",{"style":"color:black;text-align:right;padding-top:2px;"},newtr,moneyFormat(gut[thisFarmiData[v][0]]));
					newtr=createElement("tr",{},newtable);
					createElement("td",{"style":"color:black;text-align:left;padding-right:10px;"},newtr,texte["hofpreis"]);
					createElement("td",{"style":"color:black;text-align:right;"},newtr,NPC[thisFarmiData[v][0]]?moneyFormat(NPC[thisFarmiData[v][0]]):"-");
					newtr=createElement("tr",{"style":"height:22px;"},newtable);
					createElement("td",{"style":"color:black;text-align:left;padding-right:10px;"},newtr,texte["einzel"]);
					var newtd=createElement("td",{},newtr);
					cell=createElement("input",{"class":"text","type":"text","style":"color:black;text-align:right;width:60px;","value":numberFormat(thisFarmiData[v][2]/thisFarmiData[v][1],2),"maxlength":"8"},newtd);
					cell.addEventListener("change",function(){
						var help=parseFloat(this.value,10);
						if(!isNaN(help)){
							if(help<0){ help*=-1; }
							help=Math.round(100*help)/100;
							this.value=numberFormat(help,2);
							var v=this.parentNode.parentNode.parentNode.getAttribute("nr");
							thisFarmiData[v][2]=help*thisFarmiData[v][1];
							this.parentNode.parentNode.nextElementSibling.children[1].firstElementChild.value=numberFormat(thisFarmiData[v][2],2);
						}
					},false);
					newtr=createElement("tr",{"style":"height:22px;"},newtable);
					createElement("td",{"style":"color:black;text-align:left;padding-right:10px;"},newtr,texte["total"]);
					newtd=createElement("td",{},newtr);
					cell=createElement("input",{"class":"text","type":"text","style":"color:black;text-align:right;width:60px;","value":numberFormat(thisFarmiData[v][2],2),"maxlength":"9"},newtd);
					cell.addEventListener("change",function(){
						var help=parseFloat(this.value,10);
						if(!isNaN(help)){
							if(help<0){ help*=-1; }
							help=Math.round(100*help)/100;
							this.value=numberFormat(help,2);
							var v=this.parentNode.parentNode.parentNode.getAttribute("nr");
							thisFarmiData[v][2]=help;
							this.parentNode.parentNode.previousElementSibling.children[1].firstElementChild.value=numberFormat(thisFarmiData[v][2]/thisFarmiData[v][1],2);
						}
					},false);
					newtr=createElement("tr",{"style":"height:22px;"},newtable);
					newtd=createElement("td",{"colspan":"2","style":"color:black;border-top:1px solid black;text-align:center;padding-top:2px;"},newtr);
					cell=createElement("button",{"class":"link","type":"button","style":"color:black;"},newtd,texte["ok"]);
					cell.addEventListener("click",function(){
						removeElement(this.parentNode.parentNode.parentNode.parentNode);
						showCartBuildTable();
					},false);
					cell=null;newtable=null;newtr=null;newtd=null;
				},false);
			}

			newtr=createElement("tr",{},newtable);
			createElement("td",{"colspan":"2"},newtr);
			createElement("td",{"style":"text-align:right;color:#336;font-size:14px;"},newtr,"100%:");
			createElement("td",{"style":"padding-left:5px;padding-right:5px;border-top:1px solid #336;text-align:right;color:#336;font-size:14px;"},newtr,moneyFormatInt(sum));

			newtr=createElement("tr",{},newtable);
			createElement("td",{"colspan":"2"},newtr);
			createElement("td",{"style":"text-align:right;color:#336;font-size:14px;"},newtr,"90%:");
			createElement("td",{"style":"padding-left:5px;padding-right:5px;text-align:right;color:#336;font-size:14px;"},newtr,moneyFormatInt(0.9*sum));

			newtd=$("cartsubmitPerc");
			if(priceMissing){
				newtd.style.border="4px inset #336";
				newtd.style.color="#336";
				newtd.style.backgroundColor="transparent";
				newtd.innerHTML="--%";
			}else{
				if(100*preis<valFarmiLimits[0]*sum){ var col="red";var col2="#fcc"; }
				else if(100*preis<valFarmiLimits[1]*sum){ var col="#d80";var col2="#ff9"; }
				else{ var col="green";var col2="#80ff80"; }
				newtd.style.border="4px inset "+col;
				newtd.style.color=col;
				newtd.style.backgroundColor=col2;
				newtd.innerHTML=Math.round(100*preis/sum)+"%";
			}
			cartContent=null;newtable=null;newtr=null;newtd=null;
		}
		showCartBuildTable();
	};
	// Farmis displayed
	unsafeWindow._setFarmis=unsafeWindow.setFarmis;
	unsafeWindow.setFarmis = function(){
		unsafeWindow._setFarmis();
		doFarmis();
	};

	// Reallocate Buildings
	document.addEventListener("gameReallocateBuilding",function(){
		if(DEVMODE){ GM_log("Begin gameReallocateBuilding"); }
		try{
			var building1=unsafeWindow.GMreallocateBuildingSet[0];
			var building2=unsafeWindow.GMreallocateBuildingSet[1];
			var help;

			help=nextTime[building1].clone();
			nextTime[building1]=nextTime[building2].clone();
			nextTime[building2]=help;
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_nextTime_"+building1,nextTime[building1]);
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_nextTime_"+building2,nextTime[building2]);

			help=nextTimeWasser[building1].clone();
			nextTimeWasser[building1]=nextTimeWasser[building2].clone();
			nextTimeWasser[building2]=help;
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_nextTimeWasser_"+building1,nextTimeWasser[building1]);
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_nextTimeWasser_"+building2,nextTimeWasser[building2]);

			help=zoneErnte[building1].clone();
			zoneErnte[building1]=zoneErnte[building2].clone();
			zoneErnte[building2]=help;
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneErnte_"+building1,implode(zoneErnte[building1]));
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneErnte_"+building2,implode(zoneErnte[building2]));

			zoneTyp[building1]=zoneTyp.splice(building2,1,zoneTyp[building1])[0]; // this is a "swap"
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneTyp",zoneTyp.join("|"));

			zoneBlock[building1]=zoneBlock.splice(building2,1,zoneBlock[building1])[0]; // this is a "swap"
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBlock",zoneBlock.join("|"));

			zoneAnimals[building1]=zoneAnimals.splice(building2,1,zoneAnimals[building1])[0]; // this is a "swap"
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneAnimals",zoneAnimals.join("|"));

			zoneBonus[building1]=zoneBonus.splice(building2,1,zoneBonus[building1])[0]; // this is a "swap"
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBonus",zoneBonus.join("|"));

			zoneBonusSpecialProduct[building1]=zoneBonusSpecialProduct.splice(building2,1,zoneBonusSpecialProduct[building1])[0]; // this is a "swap"
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBonusSpecialProduct",zoneBonusSpecialProduct.join("|"));

			zoneBonusSpecialAmount[building1]=zoneBonusSpecialAmount.splice(building2,1,zoneBonusSpecialAmount[building1])[0]; // this is a "swap"
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneBonusSpecialAmount",zoneBonusSpecialAmount.join("|"));

			zoneNext[building1]=zoneNext.splice(building2,1,zoneNext[building1])[0]; // this is a "swap"
			zoneNext=GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneNext",zoneNext.join("|"));

			zoneMainprod[building1]=zoneMainprod.splice(building2,1,zoneMainprod[building1])[0]; // this is a "swap"
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneMainprod",zoneMainprod.join("|"));
		}catch(err){GM_log("ERROR: gameReallocateBuilding \n"+err);}
		if(DEVMODE){ GM_log("End  gameReallocateBuilding"); }
	},false);
	unsafeWindow._reallocateBuilding=unsafeWindow.reallocateBuilding;
	unsafeWindow.reallocateBuilding = function(set){
		unsafeWindow._reallocateBuilding(set);
		//reallocateBuilding('farm1,zone1,farm2,zone2');
		unsafeWindow.GMreallocateBuildingSet=[(6*set[0])+set[1],(6*set[2])+set[3]];
		raiseEvent("gameReallocateBuilding");
	};

	// events forestry ==============================================================================

	/*
	$("globalcommitbox").addEventListener ("DOMAttrModified", function(event){
		try{
		var help;
		if ((this==event.target)&&(this.style.display == "block") && (help=$("forestry_questentry_value"))){
			var max = $("globalcommitbox").innerHTML.match(/chkForestryQuestEntryValue\(\d+,\d+,(\d+)\)/i);
			GM_log("max:"+implode(max));
			if (max && max[1]){
				help.value = max[1];
				keyup(help);
			}
		}
	}catch(err){GM_log("ERROR globalcommitbox \n"+err);}
	},false);
	*/
	unsafeWindow._initForestryResponse=unsafeWindow.initForestryResponse;
	unsafeWindow.initForestryResponse = function(request,uprack,upmenu,action,pos,tutorialstep){
	try{
		unsafeWindow._initForestryResponse(request,uprack,upmenu,action,pos,tutorialstep);
		var result = checkRequest(request);
		if(result){
			if(DEVMODE){ GM_log("initForestryResponse"); }
			unsafeWindow.farm=""; //Hack for the scripts
			unsafeWindow.city=""; //Hack for the scripts
			var cell=$("timeHolder");//windmillBeraterTime
			if(cell){ $("forestry_container").appendChild(cell); }
			cell=null;
			raiseEvent("gameForestry");

			//GM_log("forestry: result:"+implode(result));
			//GM_log("forestry: result:"+print_r(result));

			if(unsafeWindow.forestry_unlock){
				var endTime, productId;
				for(var i in result[2]){
					if(!result[2].hasOwnProperty(i)){continue;}
					endTime=NEVER;
					productId=0;

					if(result[2][i]['ready']){
						if(result[2][i]['ready']==2){ // still busy
							endTime=parseFloat(result[2][i]['remain']) + now;
						}else if(result[2][i]['ready']==1){ // prodcution done
							endTime=now;
						}
						productId=parseInt(result[2][i]['productid'],10);
					}

					if(eval(forestryBuildingNames[i]+"TimeEnd!="+endTime) || eval(forestryBuildingNames[i]+"ProductId!="+productId)){
						eval(forestryBuildingNames[i]+"TimeEnd="+endTime);
						eval(forestryBuildingNames[i]+"ProductId="+productId);
						raiseEvent("nodeModified"+forestryBuildingNames[i]+"BeraterTime");
						GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_"+forestryBuildingNames[i]+"TimeEnd",endTime);
						GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_"+forestryBuildingNames[i]+"ProductId",productId);
					}
					if(result[2][i]['ready']==1){
						raiseEvent("game"+forestryBuildingNames[i]+"Ready");
					}
				}

				var hfnt=NEVER,hfntw=NEVER,pos;
				for(var i=0 ; i < result[1].length ; i++){
					if(pos=result[1][i]){
						if(pos['category']>0 && pos['block']==0){
							hfnt = Math.min(hfnt,pos['remain']);
							hfntw = Math.min(hfntw,pos['waterremain']);
						}
					}
				}
				forestryNextTime = hfnt + now;
				forestryNextTimeWasser = hfntw + now;
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_forestryNextTime",forestryNextTime);
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_forestryNextTimeWasser",forestryNextTimeWasser);

			try{
				//make forestry_prodName
				var camp,fId,boolNameAdded=false;
				for(var camp in result[4]){ //forestry_production_products
					if (!result[4].hasOwnProperty(camp)){ continue; }
					for(var fId in result[4][camp]){
						if (!result[4][camp].hasOwnProperty(fId)){ continue; }
						if (!forestry_prodName[fId]){
							forestry_prodName[fId] = result[4][camp][fId][9];
							boolNameAdded=true;
						}
					}
				}
				camp=null;fId=null;

				//make forestry_prodName && forestry_stock
				var store, fId, boolNameAdded=false;
				forestry_prodBestand= new Object();
				for(store in result[3]){ //forestry_stock
					if (!result[3].hasOwnProperty(store)){ continue; }
					for(fId in result[3][store]){
						if (!result[3][store].hasOwnProperty(fId)){ continue; }
						if (!forestry_prodName[fId]){
							forestry_prodName[fId] = result[3][store][fId]["name"];
							boolNameAdded=true;
						}
						if(!forestry_prodBestand[fId]) forestry_prodBestand[fId]=0;
						forestry_prodBestand[fId] += parseInt(result[3][store][fId]["amount"],10);
					}
				}
				store=null;fId=null;
				forestry_prodBestand.sortObj();
				GM_log("initCampaignsResponse forestry_prodBestand:"+implode(forestry_prodBestand));
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_forestry_prodBestand",implode(forestry_prodBestand));

				//TODO forestry_farmis
				var farmi, i;
				forestry_farmiNeeded= new Object();
				for(farmi in result[5]){
					if (!result[5].hasOwnProperty(farmi)){ continue; }
					for(i in result[5][farmi]["products"]){
						if (!result[5][farmi]["products"].hasOwnProperty(i)){ continue; }
						fId = result[5][farmi]["products"][i]["product"];
						if (!forestry_prodName[fId]){
							forestry_prodName[fId] = result[5][farmi]["products"][i]["name"];
							boolNameAdded=true;
						}
						if(!forestry_farmiNeeded[fId]) forestry_farmiNeeded[fId]=0;
						forestry_farmiNeeded[fId] += parseInt(result[5][farmi]["products"][i]["amount"],10);
					}
				}
				forestry_farmiNeeded.sortObj();
				GM_log("initForestryResponse forestry_farmiNeeded:"+implode(forestry_farmiNeeded));
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_forestry_farmiNeeded",implode(forestry_farmiNeeded));

				if(boolNameAdded){
					forestry_prodName.sortObj();
					GM_log("initCampaignsResponse -> forestry_prodName"+implode(forestry_prodName));
					GM_setValueCache(LNG+"_"+SERVER+"_forestry_prodName",implode(forestry_prodName));
				}
				doForestryFarmi();
			}catch(err){GM_log("ERROR initCampaignsResponse \n"+err);}

				//TODO forestry_production_products
/*
{1}{1}{0} = 36000 // Time
{1}{1}{1} = 30
{1}{1}{2} = 1
{1}{1}{3} = 1
{1}{1}{4}{0} = 1
{1}{1}{4}{1} = 3
{1}{1}{5} = 21 //What can i make of this for index 1,2. {0:product,1:amount}
{1}{1}{6} = 0  //What can i make of this for index 3. {0:product,1:amount}
{1}{1}{7} = 3
{1}{1}{8} = 0
{1}{1}{9} = Fijnspar //NAME
{1}{1}{10}{0} = 1
{1}{1}{10}{1} = 2
{1}{1}{11} = 0
{1}{1}{12} = 0 //item for in the farmbuilding
*/
			}
		}
		}catch(err){GM_log("ERROR initForestryResponse \n"+err);}
	};

	unsafeWindow._initCampaignsResponse=unsafeWindow.initCampaignsResponse;
	unsafeWindow.initCampaignsResponse = function(request,update){
	try{
		unsafeWindow._initCampaignsResponse(request,update);
		var result = checkRequest(request);
		if(result){
			if(DEVMODE){ GM_log("initCampaignsResponse"); }
			//GM_log("campaign: result:"+implode(result));
			if(DEVMODE){ GM_log("campaign: result:"+print_r(result)); }
			var quests = result[1];
			var newlodgeCampaignNr=1,newlodgeQuestNr=1;
			for(campaign in quests){
				if(!quests.hasOwnProperty(campaign)){continue;}
				//GM_log("campaign: result:"+print_r(quests[campaign]));
				if(quests[campaign]['remain']){
					lodgeTimeEnd = quests[campaign]['remain'] + now;
				}else{
					lodgeTimeEnd = now;
				}
				newlodgeCampaignNr = campaign;
				newlodgeQuestNr = quests[campaign]['questid'];
				
				lodgeQuestData = new Object();
				for(var type in quests[campaign]["entries"]){
					if(!quests[campaign]["entries"].hasOwnProperty(type)){continue;}
					for(var i=0;i<quests[campaign]['entries'][type].length;i++){
						fId = quests[campaign]["entries"][type][i]["productid"];
						lodgeQuestData[fId] = new Object();
						lodgeQuestData[fId]["type"] = type;
						lodgeQuestData[fId]["max"] = quests[campaign][1][(type-1)][fId];
						lodgeQuestData[fId]["sum"] = quests[campaign]["entries"][type][i]["sum"];
					}
				}
/*
[1]{1}{1}[0]{8} = 300
[1]{1}{1}[0]{6} = 2000
[1]{1}{entries}{1}[0]{productid} = 8
[1]{1}{entries}{1}[0]{sum} = 300
[1]{1}{entries}{1}[0]{type} = 1

[1]{1}{1}[0]{24} = 1800
[1]{1}{1}[1]{21} = 12
[1]{1}{1}[1]{41} = 10
[1]{1}{entries}{1}[0]{productid} = 24
[1]{1}{entries}{1}[0]{sum} = 1800
[1]{1}{entries}{1}[0]{type} = 1
[1]{1}{entries}{2}[0]{productid} = 21
[1]{1}{entries}{2}[0]{sum} = 12
[1]{1}{entries}{2}[0]{type} = 2
[1]{1}{entries}{2}[1]{productid} = 41
[1]{1}{entries}{2}[1]{sum} = 9
[1]{1}{entries}{2}[1]{type} = 2
*/
			
				break;
			}
			
			GM_log("campaign: "+lodgeCampaignNr+" lodgeQuestNr:"+lodgeQuestNr+" lodgeQuestData:"+implode(lodgeQuestData));
			//GM_log("campaign: "+lodgeCampaignNr+"lodgeTimeEnd:"+lodgeTimeEnd+" now:"+now);
			if(lodgeCampaignNr!=newlodgeCampaignNr || lodgeQuestNr!=newlodgeQuestNr){
				lodgeCampaignNr!=newlodgeCampaignNr;
				lodgeQuestNr=newlodgeQuestNr;
				lodgeQuestLine();
			}
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_lodgeQuestData",implode(lodgeQuestData));
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_lodgeCampaignNr",lodgeCampaignNr);
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_lodgeQuestNr",lodgeQuestNr);
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_lodgeTimeEnd",lodgeTimeEnd);

			//GM_log("onclick:"+$('forestry_quest_entry' + lodgeCampaignNr + '_' + lodgeQuestNr + '_1_6').onclick);

			//make forestry_prodName && forestry_stock
			try{
				var store, fId, boolNameAdded=false;
				for(store in result[3]){ //forestry_stock
					if (!result[3].hasOwnProperty(store)){ continue; }
					for(fId in result[3][store]){
						if (!result[3][store].hasOwnProperty(fId)){ continue; }
						if (!forestry_prodName[fId]){
							forestry_prodName[fId] = result[3][store][fId]["name"];
							boolNameAdded=true;
						}
						forestry_prodBestand[fId] = parseInt(result[3][store][fId]["amount"],10);
					}
				}
				store=null;fId=null;
				if(boolNameAdded){
					forestry_prodName.sortObj();
					GM_log("initCampaignsResponse -> forestry_prodName"+implode(forestry_prodName));
					GM_setValueCache(LNG+"_"+SERVER+"_forestry_prodName",implode(forestry_prodName));
				}
				forestry_prodBestand.sortObj();
				GM_log("initCampaignsResponse forestry_prodBestand:"+implode(forestry_prodBestand));
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_forestry_prodBestand",implode(forestry_prodBestand));
			}catch(err){GM_log("ERROR initCampaignsResponse \n"+err);}
		}
	}catch(err){GM_log("ERROR initCampaignsResponse \n"+err);}
	};

	function handleLodgeQuestLine(reset){
		if(reset){
			show[3]=!show[3];
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_show",implode(show));
		}else{
			lodgeQuestLine(); //only first time after load use
		}
		if(!show[3]){
			$('lodgequestline').style.display = "none";
			$('lodgequestlineback').style.display = "none";
			$('lodgequestlineopener').style.backgroundImage = "url(" + GFX + "arrow_left.png)";
		}else{
			lodgeQuestLine();
			$('lodgequestline').style.display = "block";
			$('lodgequestlineback').style.display = "block";
			$('lodgequestlineopener').style.backgroundImage = "url(" + GFX + "arrow_right.png)";
		}
	}

	GM_addStyle(
		"#lodgequestlineopener { position:absolute; z-index:110; bottom:0px; right:0px; width:20px; color:#fff; background:url("+GFX+"arrow_right.png) #000 top center no-repeat; } \n"+
		"#lodgequestlineback,#lodgequestline {position:absolute;z-index:110;display:none;bottom:0px;right:20px;height:25px;width:400px;color:#fff;} \n"+
		"#lodgequestlineback { background-color:#000; filter:alpha(opacity=70); -moz-opacity: 0.70; opacity: 0.70; }\n"
	);
	newdiv = createElement("div",{"class":"link","id":"lodgequestlineback","style":"height:25px;display:none;"},$("garten_komplett"));
	newdiv = createElement("div",{"class":"link","id":"lodgequestline","style":"height:25px;display:none;"},$("garten_komplett"));
	newdiv.addEventListener("mouseover",function(event){
		var newdiv=createElement("div");
		var newtable=createElement("table",{"class":"white","border":"0","cellspacing":"0","cellpadding":"3","style":"line-height:16px;"},newdiv);
		var newtr=createElement("tr",{},newtable);
		var newtd=createElement("td",{"colspan":"3","style":"text-align:center;border-bottom:1px solid white;"},newtr,lodgeCampaignNr+"_"+lodgeQuestNr);
		createElement("td",{"colspan":"3","style":"text-align:center;border-bottom:1px solid white;border-left:1px solid white;"},newtr,"Given"); // TODO texte
		createElement("td",{"colspan":"2","style":"text-align:center;border-bottom:1px solid white;border-left:1px solid white;"},newtr,texte["fehlt"]);
		createElement("td",{"colspan":"2","style":"text-align:center;border-bottom:1px solid white;border-left:1px solid white;"},newtr,texte["total"]);

		var lqDone, lqType, lqTotal, lqId, lqAmntTogo, lqVal;
		for(var i=0;i<LQUESTS[lodgeCampaignNr][lodgeQuestNr][0].length;i++){
			lqType=LQUESTS[lodgeCampaignNr][lodgeQuestNr][0][i][0];
			lqTotal=LQUESTS[lodgeCampaignNr][lodgeQuestNr][0][i][2];
			lqId=parseInt(LQUESTS[lodgeCampaignNr][lodgeQuestNr][0][i][1],10);
			lqDone=(lodgeQuestData[lqId]?lodgeQuestData[lqId]["sum"]:0);

			newtr=createElement("tr",{},newtable);
			newtd=createElement("td",{},newtr);
			if(lqType==1){
				lqAmntTogo=Math.max(0,lqTotal-lqDone-prodBestand[lqId]);
				lqVal=(gut[lqId]?gut[lqId]:0);
				produktPic(lqId,newtd);
				createElement("td",{},newtr,prodName[lqId]);
			}else if(lqType==2){
				lqAmntTogo=Math.max(0,lqTotal-lqDone-forestry_prodBestand[lqId]);
				lqVal=null;
				createElement("div",{"class":"main_float_left f_m_symbol"+lqId},newtd);
				createElement("td",{},newtr,forestry_prodName[lqId]);
			}
			createElement("td",{"style":"text-align:right;"},newtr,numberFormat(100*(lqTotal-lqAmntTogo)/lqTotal)+"%");
			createElement("td",{"style":"text-align:right;border-left:1px solid white;"},newtr,numberFormat(100*lqDone/lqTotal)+"%");
			createElement("td",{"style":"text-align:right;"},newtr,(lodgeQuestData[lqId]?numberFormat(lqDone):"data not fetched"));
			createElement("td",{"style":"text-align:right;"},newtr,(lqVal!=null?moneyFormat(lqDone*(gut[lqId]?gut[lqId]:0)):""));
			createElement("td",{"style":"text-align:right;border-left:1px solid white;"},newtr,numberFormat(lqAmntTogo));
			createElement("td",{"style":"text-align:right;"},newtr,(lqVal!=null?moneyFormat(lqDone*(gut[lqId]?gut[lqId]:0)):""));
			createElement("td",{"style":"text-align:right;border-left:1px solid white;"},newtr,numberFormat(lqTotal));
			createElement("td",{"style":"text-align:right;"},newtr,(lqVal!=null?moneyFormat(lqDone*(gut[lqId]?gut[lqId]:0)):""));
		}

		showToolTip(event,newdiv.innerHTML,this);
		newdiv=null;newtable=null;newtr=null;newtd=null;
	},false);
	newdiv = createElement("div",{"class":"link","id":"lodgequestlineopener","style":"height:25px;display:block;"},$("garten_komplett"));
	newdiv.addEventListener("click", function(){
		handleLodgeQuestLine(true);
	},false);

	function lodgeQuestLine(){
		if(LQUESTS[lodgeCampaignNr][lodgeQuestNr]){
			var lodgequestline=$("lodgequestline");
			lodgequestline.innerHTML="";

			for(var h=0;h<LQUESTS[lodgeCampaignNr][lodgeQuestNr][3].length;h++){
				newdiv=createElement("div",{"style":"position:absolute;top:"+((h*25)+5)+"px;left:5px;width:200px;height:15px;"},lodgequestline);
				switch(LQUESTS[lodgeCampaignNr][lodgeQuestNr][3][h][0]){
					case 0:
						createElement("div",{"class":"main_float_left kp" + LQUESTS[lodgeCampaignNr][lodgeQuestNr][3][h][1]},newdiv);
						createElement("div",{"class":"upimg"},newdiv);
						createElement("div",{"class":"main_float_left"},newdiv, prodName[LQUESTS[lodgeCampaignNr][lodgeQuestNr][3][h][1]]);
						break;
					case 1:
						createElement("div",{"class":"main_float_left f_m_symbol" + LQUESTS[lodgeCampaignNr][lodgeQuestNr][3][h][1]},newdiv);
						createElement("div",{"class":"upimg"},newdiv);
						createElement("div",{"class":"main_float_left"},newdiv, forestry_prodName[LQUESTS[lodgeCampaignNr][lodgeQuestNr][3][h][1]]);
						break;
					case 2:
						createElement("div",{"class":"main_float_left"},newdiv, $("forestry_quest_reward"+lodgeCampaignNr+"_"+lodgeQuestNr).children[(h+1)].children[0].innerHTML);
						break;
				}
			}

			if(lodgeTimeEnd<=now){
				var stdwidth = 140;
				var title = $("forestry_questlist_item"+lodgeCampaignNr+"_"+lodgeQuestNr).getElementsByClassName("forestry_questlist_item_title")[0].innerHTML.match(/\d+\. (.*)/i)[1];
				if (title.length>12) title = title.substr(0,9)+"...";
				newdiv = createElement("span",{"style":"position:absolute;top:"+((h*25)+5)+"px;left:5px;width:135px;height:15px;"},lodgequestline,"LQuest: "+title);
				newdiv.addEventListener("click", function(){
					document.addEventListener("gameCity2",function(){
						document.removeEventListener("gameCity2",arguments.callee,false);
							click($("cityzone_2_9"));
					},false);
					click($top("citylineitem2"));
				},false);
			}else{
				var stdwidth = 95;
				createElement("span",{"style":"position:absolute;top:"+((h*25)+5)+"px;left:5px;width:135px;height:15px;"},lodgequestline,getDaytimeStr(lodgeTimeEnd,1)+"&nbsp;"+texte["uhr"]);
			}
			//LQUESTS["campaign"]["nr"][[type,id,amount],waittime,points,more|undefined]
			var info,newdiv, newdiv1;
			for(var i=0;i<LQUESTS[lodgeCampaignNr][lodgeQuestNr][0].length;i++){
				info = LQUESTS[lodgeCampaignNr][lodgeQuestNr][0][i];
				switch(info[0]){
					case 1: //standard
						newdiv=createElement("div",{"prod":info[1],"class":"link","style":"position:absolute;top:"+((h*25)+5)+"px;left:"+(stdwidth+(62*i))+"px;width:65px;height:15px;","onmouseover":"showDiv('lqinfo"+lodgeQuestNr+i+"')","onmouseout":"hideDiv('lqinfo"+lodgeQuestNr+i+"')"},lodgequestline);
						newdiv.addEventListener("click",function(){
							showMarket(this.getAttribute("prod"));
						},false);
						newdiv1=createElement("div",{"class":"main_float_left kp"+info[1]},newdiv);
						createElement("div",{"class":"downimg"},newdiv1);
						createElement("div",{"id":"lqinfo"+lodgeQuestNr+i,"class":"blackbox","style":"position:absolute;display:none;z-index:100;top:"+((h*25)+25)+"px;left:"+(stdwidth+(62*i))+"px;"},lodgequestline,texte["goToMarketOfX"].replace(/%1%/,prodName[info[1]]));
					break;
					case 2: //forestry
						newdiv=createElement("div",{"prod":info[1],"class":"link","style":"position:absolute;top:"+((h*25)+5)+"px;left:"+(stdwidth+(62*i))+"px;width:65px;height:15px;","onmouseover":"showDiv('lqinfo"+lodgeQuestNr+i+"')","onmouseout":"hideDiv('lqinfo"+lodgeQuestNr+i+"')"},lodgequestline);
						newdiv1=createElement("div",{"class":"main_float_left f_m_symbol"+info[1]},newdiv);
						createElement("div",{"class":"downimg"},newdiv1);
						createElement("div",{"id":"lqinfo"+lodgeQuestNr+i,"class":"blackbox","style":"position:absolute;display:none;z-index:100;top:"+((h*25)+25)+"px;left:"+(stdwidth+(62*i))+"px;"},lodgequestline,forestry_prodName[info[1]]);
					break;
				}
				if(info[2]<100000){
					createElement("span",{"style":"position:relative;"},newdiv,numberFormat(info[2]));
				}else{
					createElement("span",{"style":"position:relative;"},newdiv,numberFormat(info[2]/1000)+"k");
				}
			}
			if(LQUESTS[lodgeCampaignNr][lodgeQuestNr][2]){
				newdiv=createElement("div",{"style":"position:absolute;top:"+((h*25)+5)+"px;left:"+(stdwidth+(62*i))+"px;width:65px;height:15px;","onmouseover":"showDiv('lqinfo');","onmouseout":"hideDiv('lqinfo');"},lodgequestline);
				newdiv1=createElement("div",{"class":"main_float_left"},newdiv);
				createElement("img",{"src":GFX+"points.gif","width":"15","border":"0","height":"15"},newdiv1);
				createElement("div",{"class":"upimg"},newdiv1);
				createElement("span",{"style":"main_float_left"},newdiv,numberFormat(LQUESTS[lodgeCampaignNr][lodgeQuestNr][2],0,"","").replace(/(\d{3,})(\d{3})/,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2"));
				createElement("div",{"id":"lqinfo","class":"blackbox","style":"position:absolute;display:none;z-index:100;top:"+((h*25)+25)+"px;left:224px;"},lodgequestline,texte["punkte"]);
				i++;
			}
			h++;
			$("lodgequestlineback").style.width = (stdwidth+(62*i)+12)+"px";
			$("lodgequestline").style.width = (stdwidth+(62*i)+12)+"px";

			$("lodgequestlineback").style.height = (h*25)+"px";
			$("lodgequestline").style.height = (h*25)+"px";
			$("lodgequestlineopener").style.height = (h*25)+"px";

			lodgequestline=null;newdiv=null;newdiv1=null;info=null;
		}
	};
	handleLodgeQuestLine(false);
	//unsafeWindow.showQuests();

	newdiv=createElement("div",{"style":"position:relative;margin-top:5px;display:block;white-space:nowrap;"},ALL.getElementsByClassName("rahmen_hoch")[2]);
	newdiv=createElement("div",{"id":"forestryMakeNotepadOpener","class":"link","style":"display:inline-block;vertical-align:top;height:25px;width:20px;background:no-repeat scroll center top #000000;"},newdiv);
	createElement("div",{"id":"forestryMakeNotepad","style":"display:"+(show[4]?"inline-block":"none")+";vertical-align:top;border:2px inset black;background-color:white;padding:3px;"},$("forestryMakeNotepadOpener").parentNode);
	newdiv.style.backgroundImage="url('"+GFX+"arrow_"+(show[4]?"left":"right")+".png')";
	newdiv.addEventListener("click",function(){
		show[4]=!show[4];
		GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_show",implode(show));
		if(show[4]){
			this.style.backgroundImage="url('"+GFX+"arrow_left.png')";
			$("forestryMakeNotepad").style.display="inline-block";
		}else{
			this.style.backgroundImage="url('"+GFX+"arrow_right.png')";
			$("forestryMakeNotepad").style.display="none";
		}
		doForestryFarmi();
	},false);
	doForestryFarmi();

	// BuyNotepad
	function doForestryFarmi(){
		if(!show[4]){ return false; } // no calculation if table is hidden
		var newdiv=$("forestryMakeNotepad");
		if(newdiv){

			var prodMissing=new Object();
			// calculate missing products
			for(var fId in forestry_farmiNeeded){
				if(!forestry_farmiNeeded.hasOwnProperty(fId)){ continue; }
				var amount=forestry_farmiNeeded[fId]-(forestry_prodBestand[fId]?forestry_prodBestand[fId]:0);
				if (amount>0){
					prodMissing[fId]=[amount,0]; //'0'==price
				}
			}

			// creating table
			newdiv.innerHTML="";
			var newtable=createElement("table",{"border":"0","cellspacing":"0","cellpadding":"0"},newdiv);
			var newtr=createElement("tr",{"class":"link"},newtable);
			var newtd=createElement("td",{"colspan":"4","style":"border-bottom:1px solid black;text-align:center;"},newtr,"Forestry: "+texte["fehlt"]);

			for(var fId in prodMissing){
				if(!prodMissing.hasOwnProperty(fId)){ continue; }

				newtr=createElement("tr",{"class":"link hoverBgCc9","prodId":fId},newtable);
				newtd=createElement("td",{},newtr);
				createElement("div",{"class":"main_float_left f_m_symbol"+fId},newtd);
				createElement("td",{"style":"text-align:right;"},newtr,numberFormat(prodMissing[fId][0]));
				createElement("td",{"style":"padding-left:3px;"},newtr,forestry_prodName[fId]);
			}
			if(newtable.childElementCount==1){
				newtr=createElement("tr",{},newtable);
				createElement("td",{"colspan":"4","style":"text-align:center;"},newtr,"---");
			}
			newtable=null;newtr=null;newtd=null;
		}
		newdiv=null;
	}

	// events city 1 ==============================================================================
	unsafeWindow._cityArrived=unsafeWindow.cityArrived;
	unsafeWindow.cityArrived = function(questbox){
		unsafeWindow._cityArrived(questbox);
		farmNr=null;
		var cell=$("timeHolder");//windmillBeraterTime
		if(cell){ $("citymaincontainer").appendChild(cell); }
		cell=null;
		raiseEvent("gameCity"+unsafeWindow.city);
	};

	// Werbung
	unsafeWindow._fillAdColumn=unsafeWindow.fillAdColumn;
	unsafeWindow.fillAdColumn = function(){
		unsafeWindow._fillAdColumn();
		var images=$("adzonetooltip1").getElementsByTagName("img");

		if(LNG=="se"){
			$("adzonetooltip1").firstElementChild.innerHTML=$("adzonetooltip1").firstElementChild.innerHTML.replace(/\.(\d\d) /,",$1 ");
		}

		var preis=parseFloat(/&nbsp;(.*)/.exec($("adzonetooltip1").firstElementChild.innerHTML)[1].replace(regDelimThou,"").replace(regDelimDeci,"."),10);
		createElement("div",{},$("adzonetooltip1"),"<img width='12' height='12' src='"+images[0].getAttribute("src")+"'>/<img width='12' height='12' src='"+images[2].getAttribute("src")+"'>&nbsp;"+moneyFormatInt(preis/8));

		var preis=gut[0]*parseInt(/&nbsp;(\d*)/.exec($("adzonetooltip2").firstElementChild.innerHTML)[1],10);
		createElement("div",{},$("adzonetooltip2"),"<img width='12' height='12' src='"+images[0].getAttribute("src")+"'>/<img width='12' height='12' src='"+images[2].getAttribute("src")+"'>&nbsp;"+moneyFormatInt(preis/16));
		$("adzonetooltip2").firstElementChild.innerHTML +="&nbsp;("+moneyFormatInt(preis)+")";

		var preis=gut[0]*parseInt(/&nbsp;(\d*)/.exec($("adzonetooltip3").firstElementChild.innerHTML)[1],10);
		createElement("div",{},$("adzonetooltip3"),"<img width='12' height='12' src='"+images[0].getAttribute("src")+"'>/<img width='12' height='12' src='"+images[2].getAttribute("src")+"'>&nbsp;"+moneyFormatInt(preis/24));
		$("adzonetooltip3").firstElementChild.innerHTML +="&nbsp;("+moneyFormatInt(preis)+")";
		images=null;
	};

	// Marktschreier
	$("marktschreierinner").addEventListener ("DOMAttrModified", function(event){
		if ((this==event.target)&&(this.style.display == "block")){
			if(!$("marktschreierinnercontentBerater")){
				createElement("h1",{"id":"marktschreierinnercontentBerater","style":"display:none;"},$("marktschreierinnercontent"));
				for(var v=0;v<$("marktschreierinnercontent").childElementCount;v++){
					if($("marktschreierinnercontent").children[v].nodeName=="DIV"){
						var newdiv=$("marktschreierinnercontent").children[v].getElementsByTagName("div")[1];
						var player=(/\?to=(.*)';/).exec(newdiv.getElementsByTagName("img")[0].getAttribute("onclick"))[1];
						stats(player,newdiv);
						newdiv=null;
					}
				}
			}
		}
	},false);

	// Competition
	unsafeWindow._setCityWBWContentResponse=unsafeWindow.setCityWBWContentResponse;
	unsafeWindow.setCityWBWContentResponse = function(request){
		unsafeWindow._setCityWBWContentResponse(request);
		var result=checkRequest(request);
		if(result){
			window.setTimeout(function(){
				if(result[1]['open']==1){
					var product=parseInt(result[1]['wettbewerb_produkt'],10);
					GM_setValue(LNG+"_"+SERVER+"_competition",implode([product,result[1]['wettbewerb_ende']]));
				}else{
					var help=new Array();
					try{ help=explode(GM_getValue(LNG+"_"+SERVER+"_competition","[]")); }catch(err){}
					if(help[1]==result[1]["wettbewerb_ende"]){
						var product=help[0];
					}else{
						var product=-1;
					}
				}
				if(product>-1){
					$('localwbwproduct').innerHTML='<div class="kp' + product + '" style="position:absolute; width:15px; height:15px;"></div>';
					$('localwbwproductname').innerHTML=prodName[product];
				}

				cand=document.querySelectorAll("#wbwcontent2ranking>div");
				var newdiv,c,sum=0;
				for(var v=1;v<cand.length;v++){
					newdiv=cand[v].getElementsByTagName("div");
					igm(newdiv[2].innerHTML.replace(/&nbsp;.*/,""),newdiv[2]);
					newdiv[newdiv.length-2].style.textAlign="right";
					c=parseInt(newdiv[newdiv.length-2].innerHTML,10);
					newdiv[newdiv.length-2].innerHTML=numberFormat(c);
					sum += c;
				}
				if(cand.length>1){ cand[1].style.borderBottom="1px solid black"; }
				if(cand.length>15){ cand[15].style.borderBottom="1px solid black"; }
				if(cand.length>50){ cand[50].style.borderBottom="1px solid black"; }
				newdiv=null;
				$("localwbwproductname").innerHTML += "&nbsp;("+sign_sum+"&nbsp;"+numberFormat(sum)+")";
				if(result[1]['open']!=1){
					nextproduct=parseInt(result[1]['wettbewerb_produkt'],10);
					if(nextproduct>0){
						$("localwbwproductname").innerHTML += "&nbsp;(&rarr;"+prodName[nextproduct]+"?)";
					}
				}
			},0);
		}
	};

	// events city 2 ==============================================================================
	if(unsafeWindow.cities&&(unsafeWindow.cities>1)){
		function saveWindmillData(){
			//GM_log("saveWindmillData:city "+unsafeWindow.city+":"+unsafeWindow.cityzones[3]+":recipeName "+unsafeWindow.cityzones[4]+":"+unsafeWindow.windmilltime+":"+unsafeWindow.windmillrun);
			if(unsafeWindow.windmilltime>0){
				// still baking
				if(recipeNameToId==null){
					recipeNameToId=new Object();
					for(var v in unsafeWindow.formulas[0]){
						if(!unsafeWindow.formulas[0].hasOwnProperty(v)){ continue; }
						recipeNameToId[unsafeWindow.formulas[0][v][2]]=parseInt(v,10);
					}
				}
				windmillTimeEnd=now+unsafeWindow.windmilltime;
				windmillRecipe=recipeNameToId[unsafeWindow.cityzones[4]];
			// else if(unsafeWindow.cityzones[3]==0)
			}else if(($("windmill_readyani"))&&($("windmill_readyani").style.display!="block")){
				// empty
				windmillTimeEnd=NEVER;
				windmillRecipe=0;
			}else if(unsafeWindow.cityzones[4]!=""){
				// baking done
				if(recipeNameToId==null){
					recipeNameToId=new Object();
					for(var v in unsafeWindow.formulas[0]){
						if(!unsafeWindow.formulas[0].hasOwnProperty(v)){ continue; }
						recipeNameToId[unsafeWindow.formulas[0][v][2]]=parseInt(v,10);
					}
				}
				if((windmillTimeEnd==0)||(windmillTimeEnd==NEVER)){ windmillTimeEnd=now; }
				windmillRecipe=recipeNameToId[unsafeWindow.cityzones[4]];
			}
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_windmillTimeEnd",windmillTimeEnd);
			GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_windmillRecipe",windmillRecipe);
		}

		// arrival in city2
		document.addEventListener("gameCity2",function(){
			saveWindmillData();
			/*
			//MAKE LQUESTS
			try{
				var cand,camp,qnr,inf,maxi,help,help2, forest_quest=new Array();
				var cells = $("forestry_questlist_container").querySelectorAll("div[id^=\"forestry_questlist_item\"]");
				for(var i=0;i<cells.length;i++){
					inf = cells[i].id.replace("forestry_questlist_item","").split("_");
					camp = inf[0];
					qnr = inf[1];
					if (!forest_quest[camp]) forest_quest[camp]= new Array();
					if (!forest_quest[camp][qnr]) forest_quest[camp][qnr]= [[],,0,[]];
					cand = $("forestry_quest_require"+camp+"_"+qnr);
					for(var k=0;k<cand.childElementCount;k=k+2){
						inf = cand.children[k].id.replace("forestry_quest_entry","").split("_");
						maxi = $("forestry_quest_amount_max"+camp+"_"+qnr+"_"+inf[2]+"_"+inf[3]).innerHTML;
						forest_quest[camp][qnr][0].push([parseInt(inf[2],10),parseInt(inf[3],10),parseInt(maxi,10)]);
						//$("forestry_tt_"+camp+"_"+qnr+"_"+inf[2]+"_"+inf[3])
					}
					cand = $("forestry_quest_reward"+camp+"_"+qnr);
					for(var k=1;k<cand.childElementCount;k++){
						cand2 = cand.children[k];
						if(cand2.childElementCount==1){
							forest_quest[camp][qnr][3].push([2,cand2.children[0].innerHTML]);
						}else if(cand2.childElementCount==3){
							if(help = cand2.children[0].className.match(/kp(\d+)/i)){//Not used yet
								maxi = cand2.children[1].innerHTML.match(/&nbsp;(\d+)x ([A-z]*)/i);
								forest_quest[camp][qnr][3].push([0,parseInt(help[1],10),parseInt((maxi&&maxi[1]?maxi[1]:1),10)]);
							}else if(help = cand2.children[0].className.match(/f_m_symbol(\d+)/i)){
								maxi = cand2.children[1].innerHTML.match(/&nbsp;(\d+)x ([A-z]*)/i);
								forest_quest[camp][qnr][3].push([1,parseInt(help[1],10),parseInt((maxi&&maxi[1]?maxi[1]:1),10)]);
							}else if(help=cand2.children[1].innerHTML.match(/\&nbsp;(\d+)\&nbsp;punten/i)){
								forest_quest[camp][qnr][2]=parseInt(help[1],10);
							}
						}
					}
				}
				cells=null;cand=null;inf=null;help=null;cand2=null;
				GM_log("forest_quest"+implode(forest_quest));
			}catch(err){GM_log("ERROR city2 \n"+err+"\n"+cand.innerHTML);}
			*/

			//make forestry naming
			try{
				var cand,camp,qnr,inf,maxi,help,help2,boolNameAdded=false;
				var cells = $("forestry_questlist_container").querySelectorAll("div[id^=\"forestry_questlist_item\"]");
				for(var i=0;i<cells.length;i++){
					inf = cells[i].id.replace("forestry_questlist_item","").split("_");
					camp = inf[0];
					qnr = inf[1];
					cand = $("forestry_quest_require"+camp+"_"+qnr);
					for(var k=0;k<cand.childElementCount;k=k+2){
						inf = cand.children[k].id.replace("forestry_quest_entry","").split("_");
						if(inf[2]==2){
							forestry_prodName[inf[3]] = $("forestry_tt_"+camp+"_"+qnr+"_"+inf[2]+"_"+inf[3]).innerHTML;
							boolNameAdded=true;
						}
					}
				}
				cells=null;cand=null;inf=null;help=null;
				if(boolNameAdded){
					forestry_prodName.sortObj();
					GM_log("city2 -> forestry_prodName"+implode(forestry_prodName));
					GM_setValueCache(LNG+"_"+SERVER+"_forestry_prodName",implode(forestry_prodName));
				}
			}catch(err){GM_log("ERROR city2 \n"+err+"\n"+cand.innerHTML);}
		},false);
		// open windmill
		unsafeWindow._initWindmillResponse=unsafeWindow.initWindmillResponse;
		unsafeWindow.initWindmillResponse = function(request){
			unsafeWindow._initWindmillResponse(request);
			if(checkRequest(request)){
				saveWindmillData();
				raiseEvent("gameOpenWindmill");
			}
		};
		// start baking
		unsafeWindow._startWindmillProductionResponse=unsafeWindow.startWindmillProductionResponse;
		unsafeWindow.startWindmillProductionResponse = function(request){
			unsafeWindow._startWindmillProductionResponse(request);
			if(checkRequest(request)){
				saveWindmillData();
			}
		};
		// cancel baking
		unsafeWindow._cancelWindmillProductionResponse=unsafeWindow.cancelWindmillProductionResponse;
		unsafeWindow.cancelWindmillProductionResponse = function(request){
			unsafeWindow._cancelWindmillProductionResponse(request);
			if(checkRequest(request)){
				saveWindmillData();
			}
		};

		// Recipedealer
		document.addEventListener("gameUpdateFormuladealerOffers", function(event){
			var newdiv,newtable,newtr,newtd;
			for(var v=1;v<4;v++){
				newdiv=$("formuladealerproduct"+v);
				newdiv.setAttribute("class","");

				newdiv=newdiv.getElementsByTagName("div")[0];
				var str=newdiv.getAttribute("class");
				newdiv.setAttribute("class","link "+str);
				var formula=parseInt(str.replace("fm",""),10);

				newdiv=$("formuladealerproduct"+v+"berater");
				if(newdiv){
					newdiv.innerHTML="";
				}else{
					newdiv=createElement("div",{"id":"formuladealerproduct"+v+"berater","class":"blackbox","style":"position:absolute;top:70px;"},$("formuladealerproduct"+v));
				}
				var sum=0;

				newtable=createElement("table",{"cellspacing":"0","style":"text-align:right;"},newdiv);
				newtr=createElement("tr",{"class":"hoverBgCc9"},newtable);
				newtr.addEventListener("mouseover",function(event){ showToolTip(event,texte["preis"]); },false);
				createElement("td",{},newtr,"-");
				newtd=createElement("td",{},newtr);
				if(unsafeWindow.formulas[0][formula][6]>0){
					newtd.innerHTML=numberFormat(unsafeWindow.formulas[0][formula][6]);
					sum -= unsafeWindow.formulas[0][formula][6];
				}else if(unsafeWindow.formulas[0][formula][7]>0){
					newtd.innerHTML=numberFormat(unsafeWindow.formulas[0][formula][7]*gut[0]);
					sum -= unsafeWindow.formulas[0][formula][7]*gut[0];
				}
				var sum1=0;
				str='<table class="white">';
				str += '<tr><th colspan="4" style="border-bottom:1px solid white">'+texte["ingredients"]+'</th></tr>';
				for(var w=0;w<unsafeWindow.formulas[0][formula][3].length;w++){
					sum1 += unsafeWindow.formulas[0][formula][3][w][1]*gut[unsafeWindow.formulas[0][formula][3][w][0]];
					str += '<tr><td>'+produktPic(unsafeWindow.formulas[0][formula][3][w][0],createElement("div")).parentNode.innerHTML+'</td>';
					str += '<td style="text-align:right;">'+numberFormat(unsafeWindow.formulas[0][formula][3][w][1])+'&nbsp;'+sign_mult+'</td>';
					str += '<td style="text-align:right;">'+moneyFormat(gut[unsafeWindow.formulas[0][formula][3][w][0]])+'&nbsp;=</td>';
					str += '<td style="text-align:right;">'+moneyFormatInt(unsafeWindow.formulas[0][formula][3][w][1]*gut[unsafeWindow.formulas[0][formula][3][w][0]])+'</td></tr>';
				}
				str += '</table>';

				newtr=createElement("tr",{"class":"hoverBgCc9","mouseOverText":str},newtable);
				newtr.addEventListener("mouseover",function(event){ showToolTip(event,this.getAttribute("mouseOverText")); },false);
				createElement("td",{},newtr,"-");
				createElement("td",{},newtr,numberFormat(sum1));
				sum -= sum1;

				if(unsafeWindow.formulas[0][formula][5][0]!=0){
					sum1=unsafeWindow.formulas[0][formula][5][0][1]*gut[unsafeWindow.formulas[0][formula][5][0][0]];
					sum += sum1;
					str='<table class="white">';
					str += '<tr><th colspan="3" style="border-bottom:1px solid white">'+texte["gain"]+'</th></tr>';
					str += '<tr><td>'+produktPic(unsafeWindow.formulas[0][formula][5][0][0],createElement("div")).parentNode.innerHTML+'</td>';
					str += '<td style="text-align:right;">'+numberFormat(unsafeWindow.formulas[0][formula][5][0][1])+'&nbsp;'+sign_mult+'</td>';
					str += '<td style="text-align:right;">'+moneyFormat(gut[unsafeWindow.formulas[0][formula][5][0][0]])+'</td>';
					str += '</table>';
					newtr=createElement("tr",{"class":"hoverBgCc9","mouseOverText":str},newtable);
					newtr.addEventListener("mouseover",function(event){ showToolTip(event,this.getAttribute("mouseOverText")); },false);
					createElement("td",{},newtr,"+");
					createElement("td",{},newtr,numberFormat(sum1));
				}
				if(unsafeWindow.formulas[0][formula][5][1]!=0){
					var c=0;
					for(var zoneNr=1;zoneNr<zoneTyp.length;zoneNr++){ if((!zoneBlock[zoneNr])&&(zoneTyp[zoneNr]==1)){
						c += Math.ceil(calcGrowTimes(60*growTime[unsafeWindow.formulas[0][formula][5][1][0]],unsafeWindow.formulas[0][formula][5][1][2],1-(zoneBonus[zoneNr]/100)))*120/prodPlantSize[unsafeWindow.formulas[0][formula][5][1][0]];
					}}
					sum1=c*unsafeWindow.formulas[0][formula][5][1][1]*gut[unsafeWindow.formulas[0][formula][5][1][0]];
					sum += sum1;
					str='<table class="white">';
					str += '<tr><th colspan="4" style="border-bottom:1px solid white">'+texte["gain"]+'</th></tr>';
					str += '<tr><td>'+produktPic(unsafeWindow.formulas[0][formula][5][1][0],createElement("div")).parentNode.innerHTML+'</td>';
					str += '<td style="text-align:right;">'+numberFormat(c)+'&nbsp;'+sign_mult+'</td>';
					str += '<td style="text-align:right;">'+numberFormat(unsafeWindow.formulas[0][formula][5][1][1])+'&nbsp;'+sign_mult+'</td>';
					str += '<td style="text-align:right;">'+moneyFormat(gut[unsafeWindow.formulas[0][formula][5][1][0]])+'</td>';
					str += '</table>';
					newtr=createElement("tr",{"class":"hoverBgCc9","mouseOverText":str},newtable);
					newtr.addEventListener("mouseover",function(event){ showToolTip(event,this.getAttribute("mouseOverText")); },false);
					createElement("td",{},newtr,"+");
					createElement("td",{},newtr,numberFormat(sum1));
				}

				newtr=createElement("tr",{},newtable);
				createElement("td",{"colspan":"2","style":"border-top:1px solid black;"},newtr,numberFormat(sum));
				if(unsafeWindow.formulas[0][formula][5][2]!=0){
					var c=0;
					for(var zoneNr=1;zoneNr<zoneTyp.length;zoneNr++){ if((!zoneBlock[zoneNr])&&(zoneTyp[zoneNr]==1)){
						c += Math.ceil(calcGrowTimes(60*growTime[unsafeWindow.formulas[0][formula][5][2][0]],unsafeWindow.formulas[0][formula][5][2][2],1-(zoneBonus[zoneNr]/100)))*120/prodPlantSize[unsafeWindow.formulas[0][formula][5][2][0]];
					}}
					sum1=c*unsafeWindow.formulas[0][formula][5][2][1];
					str='<table class="white">';
					str += '<tr><th colspan="2" style="border-bottom:1px solid white">'+texte["punkte"]+'</th></tr>';
					str += '<tr><td style="text-align:right;">'+numberFormat(c)+'&nbsp;'+sign_mult+'</td>';
					str += '<td style="text-align:right;">'+pointsFormat(unsafeWindow.formulas[0][formula][5][2][1],"span",createElement("div")).parentNode.innerHTML+'</td>';
					str += '</table>';
					newtr=createElement("tr",{"class":"hoverBgCc9","mouseOverText":str},newtable);
					newtr.addEventListener("mouseover",function(event){ showToolTip(event,this.getAttribute("mouseOverText")); },false);
					newtd=createElement("td",{"colspan":"2"},newtr);
					pointsFormat(sum1,"div",newtd);
				}

				newtr=createElement("tr",{"class":"hoverBgCc9"},newtable);
				newtd=createElement("td",{"colspan":"2"},newtr);
				pointsFormat(unsafeWindow.formulas[0][formula][8],"div",newtd);
			}

			// Powerups
			if(unsafeWindow.powerupcontent){
				newdiv=$("powerups");
				if(newdiv){
					newdiv.innerHTML="";
				}else{
					createElement("div",{id:"powerupsbackground",style:"background-color:black;width:560px;right:0;opacity:0.5;position:absolute;bottom:0;height:80px;"},$("formuladealer"));
					newdiv=createElement("div",{id:"powerups",style:"height:80px;bottom:0;right:0;position:absolute;vertical-align:top;"},$("formuladealer"));
				}
				var newRID;
				for(var v=0;v<unsafeWindow.powerupcontent.length;v++){
					aMount=parseInt(unsafeWindow.powerupcontent[v]["rack"],10);
					rId=parseInt(unsafeWindow.powerupcontent[v][0],10);
					newRID=createElement("div",{onmouseout:"$('formuladealerproductinfo').innerHTML=''; hideDiv('formuladealerproductinfo');",onmouseover:"$('formuladealerproductinfo').innerHTML=showFormulaInfos("+rId+"); showDiv('formuladealerproductinfo');",style:"height: 25px; width: 25px; position: relative; margin-top: 7px; float: right; margin-right: 10px;"});
					newdiv.insertBefore(newRID, newdiv.firstElementChild);
					createElement("div", {"class":"fmm"+rId},newRID);
					createElement("div", {style:"position:absolute;bottom:-2px;right:-2px;font-weight:normal;color:white;"},newRID,aMount);
				}
				newRID=null;
			}
			newdiv=null;newtable=null;newtr=null;newtd=null;
		},false);
		unsafeWindow._setFormulaDealerFormulas=unsafeWindow.setFormulaDealerFormulas;
		unsafeWindow.setFormulaDealerFormulas = function(){
			unsafeWindow._setFormulaDealerFormulas();
			raiseEvent("gameUpdateFormuladealerOffers");
		};
		unsafeWindow._setFormulaDealerRack=unsafeWindow.setFormulaDealerRack;
		unsafeWindow.setFormulaDealerRack = function(rack){
			unsafeWindow._setFormulaDealerRack(rack);
			raiseEvent("gameUpdateFormuladealerRack");
		};

		// Windmill Recipe Submit
		$("windmillpaper").addEventListener("DOMAttrModified",function(event){
			if($("windmillpaper").style.display=="block"){
				if(!$("windmillpaperBerater")){
					createElement("h1",{"id":"windmillpaperBerater","style":"display:none;"},$("windmillpaperheadline"));
					var low=false,currAmount,currProd;
					var cand;
					for(var v=0;v<3;v++){
						cand=$("windmillproduct"+v);
						currProd=/l(\d+)/.exec(cand.getAttribute("class"))[1];
						currAmount=parseInt(cand.getElementsByTagName("div")[0].innerHTML,10);
						if(prodBestand[currProd]-currAmount<prodMinRack[currProd]){ low=true;break; }
					}
					cand=null;
					if(low){
						createElement("div",{"class":"blackbox alertbox","style":"position:absolute;left:20px;top:20px;"},$("windmillproduction"),texte["alertWillLowRack"]);
					}
				}
			}
		},false);

		// Lottery
		// lotteryLog[day]=[id of daily lot,exchanged products|null|undefined,id's of bought lots|undefined]
		if($top("lotterycontainer")){
			/*
			function blinkGoToLottery(count){
				count=count%20;
				var newdiv=$("divGoToLottery");
				if(newdiv){
					if(count==1){
						raiseEvent("gameLotteryDailyLotAvailable");
					}
					newdiv.style.opacity=(newdiv.style.opacity=="1"?"0.3":"1");
					window.setTimeout(function(){ blinkGoToLottery(++count); },500);
				}
				newdiv=null;
			}
			*/
			// TODO event only once !?
			function blinkGoToLottery(){
				var newdiv=$("divGoToLottery");
				if(newdiv){
					newdiv.style.opacity=(newdiv.style.opacity=="1"?"0.3":"1");
					window.setTimeout(function(){ blinkGoToLottery(); },500);
				}
				newdiv=null;
			}
			function showGoToLottery(){
				var newdiv=createElement("div",{"id":"divGoToLottery","class":"link","style":"height:70px;width:70px;background:url('"+GFX+"city/city2_back2.jpg') 440px 430px;border:2px solid black;-moz-border-radius:35px;opacity:1;","mouseOverText":"Go to lottery"});
				var newdiv1=$("fixedDivRight");
				newdiv1.insertBefore(newdiv,newdiv1.firstElementChild);
				newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["goToLottery"]); },false);
				newdiv.addEventListener("click",function(event){ showLottery(); },false);
				newdiv=null;newdiv1=null;
				blinkGoToLottery(1);
				raiseEvent("gameLotteryDailyLotAvailable"); // TODO if once
			}
			if(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryLastLot")!=todayStr){ showGoToLottery(); }

			function hideGoToLottery(){
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryLastLot",todayStr);
				var newdiv=$("divGoToLottery");
				if(newdiv){ removeElement(newdiv); }
				newdiv=null;
			}

			unsafeWindow._updateLotRack=unsafeWindow.updateLotRack;
			unsafeWindow.updateLotRack = function(){
				unsafeWindow._updateLotRack();
				window.setTimeout(function(){
					try{
					if(unsafeWindow.GMlotteryCollectForPrize){
						var lotteryCollectForPrize=unsafeWindow.GMlotteryCollectForPrize.clone();
					}else{
						var lotteryCollectForPrize=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryCollectForPrize", "{}"));
					}
					if (!lotteryCollectForPrize["total"]){ lotteryCollectForPrize["total"]=new Array(); }
					var newdiv;
					var lrack=$("lotsrack");
					for(var v=0;v<lrack.childElementCount;v++){
						var lotid=lrack.children[v].style.backgroundImage.match(/lot_(\d+).png/i)[1];
						if (!lotteryCollectForPrize["total"][lotid]){ lotteryCollectForPrize["total"][lotid]=0; }
						//if (!$("lotlack"+lotid)){
						newdiv=createElement("div",{"id":"lotlack"+lotid,"style":"position:absolute;right:8px;top:5px;font-size:14px;font-weight:bold;color:#fff;padding:2px;"},lrack.children[v]);
						var help=(unsafeWindow.lotrack[lotid]?unsafeWindow.lotrack[lotid]:0)-lotteryCollectForPrize["total"][lotid];
						if(help<=0){
							newdiv.innerHTML=help;
							newdiv.style.backgroundColor="#AA0000";
						}else{
							newdiv.innerHTML="+"+help;
							newdiv.style.backgroundColor="green";
						}
					}
					lrack=null;
					newdiv=null;

					}catch(err){GM_log("updateLotRack error:"+err);}
				},0);
			};
			unsafeWindow._updateLotteryPrizes=unsafeWindow.updateLotteryPrizes;
			unsafeWindow.updateLotteryPrizes = function(item){
				unsafeWindow._updateLotteryPrizes(item);
				window.setTimeout(function(){
					if(unsafeWindow.GMlotteryCollectForPrize){
						var lotteryCollectForPrize=unsafeWindow.GMlotteryCollectForPrize.clone();
					}else{
						var lotteryCollectForPrize=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryCollectForPrize", "{}"));
					}
					// delete collecting of missing prizes
					for(var v in lotteryCollectForPrize){
						if(!lotteryCollectForPrize.hasOwnProperty(v)){ continue; }
						if(isNaN(v)){ continue; }
						if(!unsafeWindow.lotteryprizes[v]){
							lotteryCollectForPrize[v]=false;
							//Calc new totals
							lotteryCollectForPrize["total"]=new Array();
							for(var prizeId in unsafeWindow.lotteryprizes){
								if(!unsafeWindow.lotteryprizes.hasOwnProperty(prizeId)){ continue; }
								if (lotteryCollectForPrize[prizeId]){
									for(var v in unsafeWindow.lotteryprizes[prizeId][1]){
										if(!unsafeWindow.lotteryprizes[prizeId][1].hasOwnProperty(v)){ continue; }
										var flid=unsafeWindow.lotteryprizes[prizeId][1][v][0];
										if (!lotteryCollectForPrize["total"][flid]) lotteryCollectForPrize["total"][flid]=0;
										lotteryCollectForPrize["total"][flid] += unsafeWindow.lotteryprizes[prizeId][1][v][1];
										flid=null;
									}
									v=null;
								}
							}
						}
					}

					var divLotteryprizes=$("lotteryprizes");
					var cell;
					for(var v=0;v<divLotteryprizes.childElementCount;v++){
						if(!divLotteryprizes.children[v].id.match(/lotteryprize\d+/)){ continue; }
						var prizeId=parseInt(divLotteryprizes.children[v].id.replace("lotteryprize",""),10);
						if (lotteryCollectForPrize[prizeId]==undefined){ lotteryCollectForPrize[prizeId]=false; }
						cell=createElement("input",{"id":"inputLotteryCollectForPrize"+prizeId,"class":"link","type":"checkbox","checked":lotteryCollectForPrize[prizeId],"style":"position:absolute;top:35px;left:10px;"},divLotteryprizes.children[v].firstElementChild);
						cell.addEventListener("click",function(){
							var prizeId=parseInt(this.id.replace("inputLotteryCollectForPrize",""),10);
							var lotteryCollectForPrize=unsafeWindow.GMlotteryCollectForPrize.clone();
							lotteryCollectForPrize[prizeId]=this.checked;

							//Calc new totals
							lotteryCollectForPrize["total"]=new Array();
							for(var prizeId in unsafeWindow.lotteryprizes){
								if(!unsafeWindow.lotteryprizes.hasOwnProperty(prizeId)){ continue; }
								if (lotteryCollectForPrize[prizeId]){
									for(var v in unsafeWindow.lotteryprizes[prizeId][1]){
										if(!unsafeWindow.lotteryprizes[prizeId][1].hasOwnProperty(v)){ continue; }
										var flid=unsafeWindow.lotteryprizes[prizeId][1][v][0];
										if (!lotteryCollectForPrize["total"][flid]) lotteryCollectForPrize["total"][flid]=0;
										lotteryCollectForPrize["total"][flid] += unsafeWindow.lotteryprizes[prizeId][1][v][1];
										flid=null;
									}
									v=null;
								}
							}
							prizeId=null;
							lotteryCollectForPrize.sortObj();
							GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryCollectForPrize", implode(lotteryCollectForPrize));
							unsafeWindow.GMlotteryCollectForPrize=lotteryCollectForPrize.clone();
							unsafeWindow.updateLotRack();
						},false);
						// position:absolute; top:0px; left:0px; width:40px; height:40px;
						// mouseover-div
						cell=divLotteryprizes.children[v].children[1].firstElementChild;
						for(var w=0;w<unsafeWindow.lotteryprizes[prizeId][1].length;w++){
							var help=(unsafeWindow.lotrack[unsafeWindow.lotteryprizes[prizeId][1][w][0]]?unsafeWindow.lotrack[unsafeWindow.lotteryprizes[prizeId][1][w][0]]:0);
							// cell.children[w].children[1].innerHTML += "<br>"+help;
							help=Math.min(100,Math.round(100*help/unsafeWindow.lotteryprizes[prizeId][1][w][1]));
							createElement("div",{"style":"position:absolute;top:0;left:0;height:5px;width:"+help+"%;background:green;"},cell.children[w]);
							createElement("div",{"style":"position:absolute;top:0;right:0;height:5px;width:"+(100-help)+"%;background:#c00;"},cell.children[w]);
						}
					}
					divLotteryprizes=null;
					cell=null;
					unsafeWindow.GMlotteryCollectForPrize=lotteryCollectForPrize.clone();
				},0);
			};
			unsafeWindow._initLotteryResponse=unsafeWindow.initLotteryResponse;
			unsafeWindow.initLotteryResponse = function(request){
				unsafeWindow._initLotteryResponse(request);
				var result=checkRequest(request);
				if(result){
					window.setTimeout(function(){
						try{
							// [1(isOk), [...](lotrack), 1(dailyLotTaken), 0(id), {...}(lotteryprizes), 0(won products)]
							if(result[2]!=0){
								hideGoToLottery();
							}
							// Log-Button
							var button=createElement("button",{"class":"link","style":"position:absolute;bottom:120px;right:30px;"},$("lotterycontainer"),texte["lotteryLog"]);
							button.addEventListener("click",function(){ buildInfoPanel("lotteryLog"); },false);
							button=null;
							//unsafeWindow.updateLotRack();
						}catch(err){GM_log("initLotteryResponse error:"+err);}
						raiseEvent("gameLotteryOpen");
					},0);
				}
			};
			unsafeWindow._dailyLotResponse=unsafeWindow.dailyLotResponse;
			unsafeWindow.dailyLotResponse = function(request){
				unsafeWindow._dailyLotResponse(request);
				var result=checkRequest(request);
				if(result){
					//GM_log("dailyLotResponse: "+implode(result));
					hideGoToLottery();
					window.setTimeout(function(){
						var lotteryLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryLog","{}"));
						if(lotteryLog[todayStr]==undefined){ lotteryLog[todayStr]=[null]; }
						lotteryLog[todayStr][0]=result[3];
						GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryLog",implode(lotteryLog));
						raiseEvent("gameLotteryGotDailyLot");
					},0);
				}
			};
			unsafeWindow._showLotDecision=unsafeWindow.showLotDecision;
			unsafeWindow.showLotDecision = function(lotid){
				//GM_log("showLotDecision: "+lotid);
				unsafeWindow._showLotDecision(lotid);
				window.setTimeout(function(){
					if(unsafeWindow.GMlotteryCollectForPrize){
						var lotteryCollectForPrize=unsafeWindow.GMlotteryCollectForPrize.clone();
					}else{
						var lotteryCollectForPrize=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryCollectForPrize", "{}"));
					}
					if(!lotteryCollectForPrize["total"]){ lotteryCollectForPrize["total"]=new Array(); }
					if(!lotteryCollectForPrize["total"][lotid]){ lotteryCollectForPrize["total"][lotid]=0; }
					var newdiv=createElement("div",{"id":"currentlotAdvise","style":"position:absolute;right:8px;top:5px;font-size:14px;font-weight:bold;color:#fff;padding:2px;"},$("currentlot"));
					var help=(unsafeWindow.lotrack[lotid]?unsafeWindow.lotrack[lotid]:0)-lotteryCollectForPrize["total"][lotid];
					if(help<=0){
						newdiv.innerHTML=help;
						newdiv.style.backgroundColor="#AA0000";
					}else{
						newdiv.innerHTML="+"+help;
						newdiv.style.backgroundColor="green";
					}
					newdiv=null;

					raiseEvent("gameLotteryGotLot");
				},0);
			};
			unsafeWindow._lotGetPrizeResponse=unsafeWindow.lotGetPrizeResponse;
			unsafeWindow.lotGetPrizeResponse = function(request){
				unsafeWindow._lotGetPrizeResponse(request);
				var result=checkRequest(request);
				if(result){
					//GM_log("lotGetPrizeResponse: "+implode(result));
					if(result[5]){
						window.setTimeout(function(){
							var lotteryLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryLog","{}"));
							if(lotteryLog[todayStr]==undefined){ lotteryLog[todayStr]=[null,null]; }
							lotteryLog[todayStr][1]=result[5];
							lotteryLog[todayStr][1].sortObj(sortObjFunctions["productId"]);
							raiseEvent("gameLotteryGotPrize");
							GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryLog",implode(lotteryLog));
						},0);
					}
				}
			};
			unsafeWindow._buyNewLotResponse=unsafeWindow.buyNewLotResponse;
			unsafeWindow.buyNewLotResponse = function(request){
				unsafeWindow._buyNewLotResponse(request);
				var result=checkRequest(request);
				if(result){
					//GM_log("buyNewLotResponse: "+implode(result));
					if(result[5]){
						window.setTimeout(function(){
							var lotteryLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryLog","{}"));
							if(lotteryLog[todayStr]==undefined){ lotteryLog[todayStr]=[null,null,null]; }
							if(!lotteryLog[todayStr][2]){ lotteryLog[todayStr][2]=[]; }
							lotteryLog[todayStr][2].push(result[3]);
							raiseEvent("gameLotteryGotPrize");
							GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_lotteryLog",implode(lotteryLog));
						},0);
					}
				}
			};
		}
	}

	// on load execute ============================================================================
	newdiv1=$("buildingmain");
	var newdiv2;
	for(var zoneNr=1;zoneNr<7;zoneNr++){
		newdiv=$("zone"+zoneNr);
		newdiv.addEventListener("mouseout",function(){
			hideBlase();
			$("lager_zeit_ziel").parentNode.style.display="none";
			if((prodTyp[unsafeWindow.selected]=="v")&&(unsafeWindow.mode==0)&&(unsafeWindow.rackElement[unsafeWindow.selected])){ $("lager_zeit").innerHTML=unsafeWindow.rackElement[unsafeWindow.selected].hrs; }
		},false);
		newdiv.addEventListener("mouseover",function(){
			showBlase(parseInt(this.id.replace("zone",""),10));
		},true);
		nodes["zonetime"+zoneNr]=new Object();
		nodes["zonetime"+zoneNr]["state"]="hidden";
		nodes["zonetime"+zoneNr]["node"]=createElement("div",{"id":"zonetime"+zoneNr,"style":"display:none;top:"+(newdiv.offsetTop-16)+"px;left:"+newdiv.offsetLeft+"px;"},newdiv1);
		nodes["zonetime"+zoneNr]["node"].addEventListener("mouseover",function(event){
			var help=this.getAttribute("endtime");
			if(help){
				help=parseInt(help,10)-unsafeWindow.Zeit.Verschiebung;
				showToolTip(event,getDaytimeStr(help)+"&nbsp;"+texte["uhr"]);
			}
		},false);
		offsetRight=newdiv1.offsetWidth-newdiv.offsetWidth-newdiv.offsetLeft;
		nodes["zonetimeWasser"+zoneNr]=new Object();
		nodes["zonetimeWasser"+zoneNr]["state"]="hidden";
		nodes["zonetimeWasser"+zoneNr]["node"]=createElement("div",{"id":"zonetimeWasser"+zoneNr,"style":"display:none;top:"+(newdiv.offsetTop-16)+"px;right:"+(offsetRight-10)+"px;"},newdiv1);
		nodes["zonetimeWasser"+zoneNr]["node"].addEventListener("mouseover",function(event){
			var help=this.getAttribute("endtime");
			if(help){
				help=parseInt(help,10)-unsafeWindow.Zeit.Verschiebung;
				showToolTip(event,getDaytimeStr(help)+"&nbsp;"+texte["uhr"]);
			}
		},false);
	}
	doGameFarmSwitch();
	doFarmis();
	for(var zoneNr=1;zoneNr<7;zoneNr++){
		if($("zone"+zoneNr).childElementCount>0){ doZone(zoneNr); } // zone is already filled
	}

	if(LNG=="se"){ $("bar").innerHTML=$("bar").innerHTML.replace(/\.(\d\d) /,",$1 "); }
	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_bargeld",$("bar").innerHTML.replace(" "+texte["waehrung"],"").replace(regDelimThou,"").replace(regDelimDeci,"."));

	createElement("div",{"id":"timeHolder"},$("buildingmain"));

	// windmill timer
	if(unsafeWindow.cities&&(unsafeWindow.cities>1)){
		nodes["windmillBeraterTime"]=new Object();
		nodes["windmillBeraterTime"]["state"]="";
		nodes["windmillBeraterTime"]["node"]=createElement("div",{"id":"windmillBeraterTime"},$("timeHolder"),"---");
		nodes["windmillBeraterTime"]["node"].addEventListener("mouseover",function(event){
			showBlaseWindmill();
			var help=this.getAttribute("endtime");
			if(help){
				help=parseInt(help,10);//-unsafeWindow.Zeit.Verschiebung;
				showToolTip(event,texte["YfertigUmX"].replace(/%1%/,getDaytimeStr(help)+"&nbsp;"+texte["uhr"]).replace(/%2%/,"Windmill"));
			}
		},false);
		nodes["windmillBeraterTime"]["node"].addEventListener("mouseout",hideBlase,false);
		raiseEvent("nodeInsertedWindmillBeraterTime");
	}
	if(unsafeWindow.forestry_unlock!=undefined){
		for(var i=0;i<timerBuildingNames.length;i++){
			bName=timerBuildingNames[i];

			nodes[bName+"BeraterTime"]=new Object();
			nodes[bName+"BeraterTime"]["state"]="empty";
			nodes[bName+"BeraterTime"]["node"]=createElement("div",{"id":bName+"BeraterTime"},$("timeHolder"),"---");
			nodes[bName+"BeraterTime"]["node"].addEventListener("mouseover",function(event){
				//showBlaseSawmill();//TODO
				var help=this.getAttribute("endtime");
				if(help){
					help=parseInt(help,10);//-unsafeWindow.Zeit.Verschiebung;
					showToolTip(event,texte["YfertigUmX"].replace(/%1%/,getDaytimeStr(help)+"&nbsp;"+texte["uhr"]).replace(/%2%/,this.id.replace("BeraterTime","").capitalize()));
				}
			},false);
			nodes[bName+"BeraterTime"]["node"].addEventListener("mouseout",hideBlase,false);
			raiseEvent("nodeInserted"+bName.capitalize()+"BeraterTime");
		}
	}

	// looping ====================================================================================
	function loop1(){
		// test session
		if (unsafeWindow.rid!=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_session","")){ unsafeWindow.initZones(1); }
		else{ GM_setValue2(LNG+"_"+SERVER+"_sessionlost",false); }

		now=Math.floor((new Date()).getTime()/1000);
		todayStr=getDateStr(now,2,false);
		serverNow=now+valServerTimeOffset;
		var help=getDateStr(serverNow,2,false);
		if(help!=serverTodayStr){
			serverTodayStr=help;
			getDailyRanking();
			showGoToLottery();
			raiseEvent("gameNewDay");
		}
		unsafeWindow.GMnextTime=nextTime.slice();
		unsafeWindow.GMzoneErnte=zoneErnte.slice();

		// clock
		nodes["serverTime"]["node"].innerHTML=serverTodayStr+"&nbsp;"+getDaytimeStr(serverNow);
		if(valSessionEndtime){ nodes["sessionTimeLeft"]["node"].innerHTML="("+getTimeStr(valSessionEndtime-now)+")"; }

		// powerupsymbols
		for(var v=nodes["containerPowerupSymbols"]["node"].childElementCount-1;v>=0;v--){
			var help=parseInt(nodes["containerPowerupSymbols"]["node"].children[v].getAttribute("end"),10)-unsafeWindow.Zeit.Server;
			if(help>0){ nodes["containerPowerupSymbols"]["node"].children[v].lastElementChild.innerHTML=getTimeStr(help); }
			else{ removeElement(nodes["containerPowerupSymbols"]["node"].children[v]); }
		}

		nextTime[0]=NEVER;

		// windmill
		if(unsafeWindow.cities&&(unsafeWindow.cities>1)){
			if(windmillTimeEnd<=now){
				nodes["windmillBeraterTime"]["node"].setAttribute("endtime",now);
				if(nodes["windmillBeraterTime"]["state"]!="ready"){
					nodes["windmillBeraterTime"]["state"]="ready";
					nodes["windmillBeraterTime"]["node"].setAttribute("state","ready");
					//nodes["windmillBeraterTime"]["node"].setAttribute("class","ready");
					nodes["windmillBeraterTime"]["node"].setAttribute("recipe",windmillRecipe);
					nodes["windmillBeraterTime"]["node"].innerHTML=texte["fertig"].toUpperCase()+"!";
					raiseEvent("nodeModifiedWindmillBeraterTime");
					raiseEvent("gameWindmillReady");
				}
			}else if(windmillTimeEnd==NEVER){
				nodes["windmillBeraterTime"]["node"].setAttribute("endtime",now);
				if(nodes["windmillBeraterTime"]["state"]!="empty"){
					nodes["windmillBeraterTime"]["state"]="empty";
					nodes["windmillBeraterTime"]["node"].setAttribute("state","empty");
					nodes["windmillBeraterTime"]["node"].setAttribute("recipe","");
					//nodes["windmillBeraterTime"]["node"].setAttribute("class","");
					nodes["windmillBeraterTime"]["node"].innerHTML="---";
					raiseEvent("nodeModifiedWindmillBeraterTime");
				//raiseEvent("gameWindmillReady"); // TODO rename. needed?
				}
			}else{
				if(nodes["windmillBeraterTime"]["state"]!="busy"){
					nodes["windmillBeraterTime"]["state"]="busy";
					nodes["windmillBeraterTime"]["node"].setAttribute("state","busy");
					//nodes["windmillBeraterTime"]["node"].setAttribute("class","");
					nodes["windmillBeraterTime"]["node"].setAttribute("endtime",windmillTimeEnd);
					nodes["windmillBeraterTime"]["node"].setAttribute("recipe",windmillRecipe);
					raiseEvent("nodeModifiedWindmillBeraterTime");
				}
				nodes["windmillBeraterTime"]["node"].innerHTML=getTimeStr(windmillTimeEnd-now);
			}
			if(valGlobaltimeWindmill){ nextTime[0]=Math.min(nextTime[0],windmillTimeEnd); }
		}

		if(unsafeWindow.forestry_unlock){
			var EndTime=NEVER;
			var ProductId=0;
			for(var i=0;i<forestryBuildingNames.length;i++){
				bName=forestryBuildingNames[i];
				eval("EndTime="+forestryBuildingNames[i]+"TimeEnd");
				eval("productId="+forestryBuildingNames[i]+"ProductId");
				if(EndTime==NEVER){
					nodes[bName+"BeraterTime"]["node"].setAttribute("endtime",now);
					if(nodes[bName+"BeraterTime"]["state"]!="empty"){
						nodes[bName+"BeraterTime"]["state"]="empty";
						nodes[bName+"BeraterTime"]["node"].setAttribute("state","empty");
						nodes[bName+"BeraterTime"]["node"].setAttribute("product","");
						nodes[bName+"BeraterTime"]["node"].innerHTML="---";
						raiseEvent("nodeModified"+bName.capitalize()+"BeraterTime");
					//raiseEvent("game"+bName+"Ready"); // TODO rename. needed?
					}
				}else if(EndTime<=now){
					nodes[bName+"BeraterTime"]["node"].setAttribute("endtime",now);
					if(nodes[bName+"BeraterTime"]["state"]!="ready"){
						nodes[bName+"BeraterTime"]["state"]="ready";
						nodes[bName+"BeraterTime"]["node"].setAttribute("state","ready");
						nodes[bName+"BeraterTime"]["node"].setAttribute("product",productId);
						nodes[bName+"BeraterTime"]["node"].innerHTML=texte["fertig"].toUpperCase()+"!";
						raiseEvent("nodeModified"+bName.capitalize()+"BeraterTime");
						raiseEvent("game"+bName.capitalize()+"Ready");
					}
				}else{
					nodes[bName+"BeraterTime"]["node"].innerHTML=getTimeStr(EndTime-now);
					if(nodes[bName+"BeraterTime"]["state"]!="busy"){
						nodes[bName+"BeraterTime"]["state"]="busy";
						nodes[bName+"BeraterTime"]["node"].setAttribute("state","busy");
						nodes[bName+"BeraterTime"]["node"].setAttribute("endtime",EndTime);
						nodes[bName+"BeraterTime"]["node"].setAttribute("product",productId);
						raiseEvent("nodeModified"+bName.capitalize()+"BeraterTime");
					}
				}
				if(eval("valGlobaltime"+bName.capitalize())){ nextTime[0]=Math.min(nextTime[0],EndTime); }
			}

			if(forestryNextTime==NEVER){
				nodes["forestryBeraterTime"]["node"].setAttribute("endtime",now);
				if(nodes["forestryBeraterTime"]["state"]!="empty"){
					nodes["forestryBeraterTime"]["state"]="empty";
					nodes["forestryBeraterTime"]["node"].setAttribute("state","empty");
					nodes["forestryBeraterTime"]["node"].innerHTML="---";
					raiseEvent("nodeModifiedForestryBeraterTime");
				//raiseEvent("gameForestryReady"); // TODO rename. needed?
				}
			}else if(forestryNextTime<=now){
				nodes["forestryBeraterTime"]["node"].setAttribute("endtime",now);
				if(nodes["forestryBeraterTime"]["state"]!="ready"){
					nodes["forestryBeraterTime"]["state"]="ready";
					nodes["forestryBeraterTime"]["node"].setAttribute("state","ready");
					nodes["forestryBeraterTime"]["node"].innerHTML=texte["fertig"].toUpperCase()+"!";
					raiseEvent("nodeModifiedForestryBeraterTime");
					raiseEvent("gameForestryReady");
				}
			}else{
				nodes["forestryBeraterTime"]["node"].innerHTML=getTimeStr(forestryNextTime-now); //TODO
				if(nodes["forestryBeraterTime"]["state"]!="busy"){
					nodes["forestryBeraterTime"]["state"]="busy";
					nodes["forestryBeraterTime"]["node"].setAttribute("state","busy");
					nodes["forestryBeraterTime"]["node"].setAttribute("endtime",forestryNextTime);
					raiseEvent("nodeModifiedForestryBeraterTime");
				}
			}

			//TODO needed when automat is ready
			forestryNrF=0;
			var readyForestryAdded=false;
			var valGiessForestryNotw=false;
			if (forestryNextTime==NEVER){
				if (valGlobaltimeForestry && valGlobaltimeShowCroppedZone){
					nextTime[0]=-1;
				}
				if(!(unsafeWindow.GMreadyForestry&&unsafeWindow.GMreadyForestry[1]=="e")){
					readyForestryAdded=true;
					unsafeWindow.GMreadyForestry=new Array("forestry","e");
				}
			}else{
				if(valGlobaltimeForestry){ nextTime[0]=Math.min(nextTime[0],forestryNextTime); }
				if(valGiessForestryNotw&&(forestryNextTimeWasser<NEVER)){ nextTime[0]= Math.min(nextTime[0],forestryNextTimeWasser); }
				if((nextTime+unsafeWindow.Zeit.Verschiebung)<now){
					if(!(unsafeWindow.GMreadyForestry&&unsafeWindow.GMreadyForestry[1]=="r")){
						readyForestryAdded=true;
						unsafeWindow.GMreadyForestry=new Array("forestry","r");
					}
				}else if (valGiessForestryNotw&&((forestryNextTimeWasser+unsafeWindow.Zeit.Verschiebung)<now)){
					if(!(unsafeWindow.GMreadyForestry&&unsafeWindow.GMreadyForestry[1]=="w")){
						readyForestryAdded=true;
						unsafeWindow.GMreadyForestry=new Array("forestry","w");
					}
				}else if ((forestryNextTime+unsafeWindow.Zeit.Verschiebung)>now && unsafeWindow.GMreadyForestry){
					delete unsafeWindow.GMreadyForestry;
				}
			}
			if(readyZoneAdded){
				raiseEvent("gameForestryReady");
				if(DEVMODE){ GM_log("GMreadyForestry "+implode(unsafeWindow.GMreadyForestry)); }
			}
		}
		// visible zones
		updateZoneTimers();

		// all zones
		var readyZoneAdded=false;
		for(var zoneNrF=1;zoneNrF<=6*parseInt(unsafeWindow.farmamount,10);zoneNrF++){
			if ((!zoneBlock[zoneNrF])&&(BUILDINGTYPE[zoneTyp[zoneNrF]]>0)){
				if (nextTime[zoneNrF]==NEVER){
					if (valGlobaltimeShowCroppedZone){
						nextTime[0]=-1;
					}
					if(!(unsafeWindow.GMreadyZone[zoneNrF]&&unsafeWindow.GMreadyZone[zoneNrF][1]=="e")){
						readyZoneAdded=true;
						unsafeWindow.GMreadyZone[zoneNrF]=new Array(Math.ceil(zoneNrF/6),"e");
					}
				}else{
					nextTime[0]=Math.min(nextTime[0],nextTime[zoneNrF]);
					if(valGiessNotw&&(nextTimeWasser[zoneNrF]<NEVER)){ nextTime[0]= Math.min(nextTime[0],nextTimeWasser[zoneNrF]); }
					if((nextTime[zoneNrF]+unsafeWindow.Zeit.Verschiebung)<now){
						if(!(unsafeWindow.GMreadyZone[zoneNrF]&&unsafeWindow.GMreadyZone[zoneNrF][1]=="r")){
							readyZoneAdded=true;
							unsafeWindow.GMreadyZone[zoneNrF]=new Array(Math.ceil(zoneNrF/6),"r");
						}
					}else if (valGiessNotw&&((nextTimeWasser[zoneNrF]+unsafeWindow.Zeit.Verschiebung)<now)){
						if(!(unsafeWindow.GMreadyZone[zoneNrF]&&unsafeWindow.GMreadyZone[zoneNrF][1]=="w")){
							readyZoneAdded=true;
							unsafeWindow.GMreadyZone[zoneNrF]=new Array(Math.ceil(zoneNrF/6),"w");
						}
					}else if ((nextTime[zoneNrF]+unsafeWindow.Zeit.Verschiebung)>now && unsafeWindow.GMreadyZone[zoneNrF]){
						delete unsafeWindow.GMreadyZone[zoneNrF];
					}
				}
			}
		}
		//GM_log(implode(unsafeWindow.GMreadyZone))
		if(readyZoneAdded){
			raiseEvent("gameZoneReady");
			if(DEVMODE){ GM_log("GMreadyZone "+implode(unsafeWindow.GMreadyZone)); }
		}
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nextTime_0",nextTime[0]);
		if (nextTime[0]==-1){
			document.title=texte["cropped"].toUpperCase()+($("mainmenuecontainer").innerHTML.match(/incoming\.gif/)?" - !":"")+DOCTITLE;
		}else{
			nextTime[0] += unsafeWindow.Zeit.Verschiebung;
			document.title=((nextTime[0]<=now)?texte["fertig"].toUpperCase():getTimeStr(nextTime[0]-now))+($("mainmenuecontainer").innerHTML.match(/incoming\.gif/)?" - !":"")+DOCTITLE;
		}

		//raising events of other pages
		var raisedEvents=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_raisedEvents","{}"));
		for(var v in raisedEvents){
			if(!raisedEvents.hasOwnProperty(v)){ continue; }
			raiseEvent(v);
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_raisedEvents","{}");
		}
	}

	function loop60(){
		unsafeWindow.updateRack(unsafeWindow._currRack,0);
		unsafeWindow.updateMenu();
		plotLevelProgressBar();
	}

	window.setInterval(loop1,1000);
	window.setInterval(loop60,60000);

	// First run
	if (GM_getValue("tutorial",0)==0){
		click($("menueimg4"));
	}
	newinput=null;newdiv=null;newdiv1=null;newbutton=null;newimg=null;
}

//***********************************************************************************************************

function do_nachrichten_read(){
	//GM_log("do_nachrichten_read "+implode(pageZusatz)+" readstate:"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doreadState",0));
	var candtable=document.getElementsByTagName("table");
	if (!candtable[0]){
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doreadState",0);
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doread","");
		location.href="http://s"+SERVER+"."+GAMEPAGES[LNG]+"/nachrichten/system.php?page=1";
	}
	var currMsgId=pageZusatz["msg"];
	var msgIdRead=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doread","").split("|");
	for(var v=msgIdRead.length-1;v>-1;v--){if((msgIdRead[v]=="")||(msgIdRead[v]==currMsgId)){ msgIdRead.splice(v,1); break;}}
	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doread",msgIdRead.join("|"));
	var candtr=candtable[2].getElementsByTagName("tr");
	var absender=null;
	var betreff="";
	var currPage=pageZusatz["page"]?pageZusatz["page"]:1;
	var msgBox=candtr[3].getElementsByTagName("div")[0];
	var newdiv,newinput;

	switch(pageZusatz["from"]){
	case "inbox":{
		$("btn_inbox").bgColor="#cc9";
		absender=candtr[0].getElementsByTagName("td")[1].firstElementChild.innerHTML;
		//candtd.children[1].setAttribute("style","float:left");
		var sendTime=candtr[1].getElementsByTagName("td")[1].innerHTML;
		betreff="Re: "+candtr[2].getElementsByTagName("td")[1].firstElementChild.innerHTML;

		var valPrivNachr=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valPrivNachr",100);
		var nachrichten=new Array();
		removeElement(msgBox.getElementsByTagName("hr")[0]);
		removeElement(msgBox.getElementsByTagName("span")[0]);
		var currMsg=" "+msgBox.innerHTML;
		while(currMsg.search(/\s\d{4,}/)!=-1){currMsg=currMsg.replace(/(\s\d+)(\d{3})/g,"$1"+delimThou+"$2");}
		currMsg=currMsg.slice(1,currMsg.length);
		msgBox.innerHTML=currMsg;
		nachrichten[0]=new Array();
		nachrichten[0][0]=currMsgId;
		nachrichten[0][1]=absender;
		nachrichten[0][2]="<u>->>&nbsp;"+sendTime+"</u><br>"+currMsg;

		try{ var save=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten").split("&nbsp;|");
			for(var v=0;v<save.length;v++){
				nachrichten[v+1]=save[v].split("&nbsp;~");
				if ((nachrichten[v+1][1]==absender) && (nachrichten[v+1][0]!=currMsgId)){
					createElement("hr",{"style":"height:1px;width:96%;border-right:0px none;border-width:1px 0px 0px;border-style:solid none none;border-color:#aaa -moz-use-text-color -moz-use-text-color;"},msgBox);
					createElement("span",{},msgBox,nachrichten[v+1][2]);
				}
				if (v>valPrivNachr) break;
			}
		} catch(err){}

		nachrichten.sort(function (a,b){return parseInt(b[0],10) - parseInt(a[0],10);});
		if (nachrichten.length>1){
			for(var v=nachrichten.length-2;v>=0;v--){ if (nachrichten[v][0]==nachrichten[v+1][0]){ nachrichten.splice(v+1,1);}}
		}

		var save="";
		for(var v=0;v<nachrichten.length;v++){ save+=nachrichten[v].join("&nbsp;~")+"&nbsp;|";}
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten",save.slice(0,save.length-7));
	break;}
	case "outbox":{
		$("btn_inbox").parentNode.children[2].bgColor="#cc9";
		absender=candtr[0].getElementsByTagName("td")[1].firstElementChild.innerHTML;
		//candtr[0].getElementsByTagName("td")[1].childNodes[3].setAttribute("style","float:left");
		betreff="Re: "+candtr[2].getElementsByTagName("td")[1].firstElementChild.innerHTML;

		var nachrichten=new Array();
		try{ save=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten").split("&nbsp;|");
			for(var v=0;v<save.length;v++){
				nachrichten[v+1]=save[v].split("&nbsp;~");
				if ((nachrichten[v+1][1]==absender) && (nachrichten[v+1][0]!=currMsgId)){
					createElement("hr",{"style":"height:1px;width:96%;border-right:0px none;border-width:1px 0px 0px;border-style:solid none none;border-color:#aaa -moz-use-text-color -moz-use-text-color;"},msgBox);
					createElement("span",{},msgBox,nachrichten[v+1][2]);
				}
			}
		} catch(err){}
	break;}
	case "system":{
		getData();
		$("btn_sysinbox").bgColor="#cc9";
		if(help=new RegExp(texte["msgFriend"]).exec(candtr[2].getElementsByTagName("div")[0].innerHTML)){
			//Friendship message
			absender=help[1];
		}else{
			var kauf=new Object();
			try{ kauf=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_kauf")); }catch(err){}

			var valNachr=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valNachr",100);
			var c=0;
			for(var v in kauf){
				if(!kauf.hasOwnProperty(v)){ continue; }
				if(c>valNachr){ delete kauf[v]; }
				else{ c++; }
			}

			var currMsg=msgBox.innerHTML.replace("&amp;uuml;",u_dots);
			var help=currMsg.replace(/\s+/,"");
			// Market sale
			var help2=new RegExp(texte["msgMarketsaleContent"]).exec(help);
			//GM_log(help);
			if (help2){
				if (LNG=="tr"){ help2.push(help2.splice(2,1).toString());}
				if(LNG=="se"){
					help2[4]=help2[4].replace(/\.(\d\d) /,",$1 ");
					help2[4]=help2[4].replace(/\.(\d\d)$/,",$1");
				}

				var prod=prodId[help2[3]];
				var amount=parseInt(help2[2],10);
				var money=parseFloat(help2[4].replace(regDelimThou,"").replace(regDelimDeci,"."),10);

				if(!kauf[currMsgId]){
					var day=parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(candtr[1].children[1].innerHTML)[1],10);
					var month=parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(candtr[1].children[1].innerHTML)[1],10);
					var year=parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace(".","\\."))).exec(candtr[1].children[1].innerHTML)[1],10);
					if(year<100){ year+=2000; }
					var dayStr=day+"."+month+"."+year;
					var levelLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_levelLog","{}"));
					if(levelLog[dayStr]==undefined){ levelLog[dayStr]=[0,null,0,0,0]; }
					levelLog[dayStr][2] += money;
					levelLog[dayStr][2]=Math.round(100*levelLog[dayStr][2])/100;
					GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_levelLog",implode(levelLog));
					raiseEventTop("gameChangedLevelLog");

					var price=Math.round(100*money/amount)/100;
					var marketOffers=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_marketOffers","{}"));
					if(marketOffers[prod]&&marketOffers[prod][price]){
						marketOffers[prod][price] -= amount;
						if(marketOffers[prod][price]<1){ delete marketOffers[prod][price]; }
					}
					GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_marketOffers",implode(marketOffers));
					raiseEventTop("gameChangedMarketOffers");
					marketOffers=null;
				}

				kauf[currMsgId]=new Array();
				kauf[currMsgId][0]=help2[1];
				absender=help2[1];
				kauf[currMsgId][1]=[prod,amount];
				betreff=help2[3];
				kauf[currMsgId][2]=money;
			}
			// Contract sale
			help2=new RegExp(texte["msgContractsaleContent"]).exec(help);
			//GM_log(help);
			if (help2){
				if(LNG=="se"){
					help2[3]=help2[3].replace(/\.(\d\d) /,",$1 ");
					help2[3]=help2[3].replace(/\.(\d\d)$/,",$1");
				}
				var money=parseFloat(help2[3].replace(regDelimThou,"").replace(regDelimDeci,"."),10);
				if(!kauf[currMsgId]){
					var day=parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(candtr[1].children[1].innerHTML)[1],10);
					var month=parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(candtr[1].children[1].innerHTML)[1],10);
					var year=parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace(".","\\."))).exec(candtr[1].children[1].innerHTML)[1],10);
					if(year<100){ year+=2000; }
					var dayStr=day+"."+month+"."+year;
					var levelLog=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_levelLog","{}"));
					if(levelLog[dayStr]==undefined){ levelLog[dayStr]=[0,null,0,0,0]; }
					levelLog[dayStr][3] += money;
					levelLog[dayStr][3]=Math.round(100*levelLog[dayStr][3])/100;
					GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_levelLog",implode(levelLog));
					raiseEventTop("gameChangedLevelLog");
				}
				kauf[currMsgId]=new Array();
				kauf[currMsgId][0]=help2[1];
				kauf[currMsgId][1]=new Array();
				absender=help2[1];
				var help3;
				var help4=new Array();
				while(help3=new RegExp(texte["msgContractsaleList"]).exec(help2[2])){
					help2[2]=help2[2].replace(help3[0],"");
					kauf[currMsgId][1].push([prodId[help3[2]],parseInt(help3[1],10)]);
				}
				if(kauf[currMsgId][1].length==1){ betreff=prodName[kauf[currMsgId][1][0][0]]; }
				kauf[currMsgId][2]=money;
			}

			while(currMsg.search(/\s\d{4}/)!=-1){currMsg=currMsg.replace(/(\s\d+)(\d{3})/g,"$1"+delimThou+"$2");}
			if(betreff){msgBox.innerHTML=currMsg+"<br><br>"+texte["stueckpreis"]+": "+moneyFormat(kauf[currMsgId][2]/(typeof kauf[currMsgId][1][0]=="object"?kauf[currMsgId][1][0][1]:kauf[currMsgId][1][1]));}

			kauf.sortObj(sortObjFunctions["int"],true);
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_kauf",implode(kauf));

			var msgId=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_system","").split("|");
			if (msgId.length>1){
				for(var d=0;d<msgId.length;d++){if(msgId[d]==currMsgId){ break;}}
			}else{
				var d=0;
			}
			newdiv=candtable[1].getElementsByTagName("tr")[5].getElementsByTagName("td")[0];
			newdiv.getElementsByTagName("input")[0].addEventListener("click",function(){GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doreadState",1);},false);
			newinput=createElement("input",{"type":"button","value":texte["vorigeNachricht"],"class":"link msg_input","href":"read.php?from=system&page="+currPage+"&msg="+msgId[d-1]+"&mass=0"},newdiv);
			newinput.addEventListener("click",function(){location.href=this.getAttribute("href");},false);
			if(d==0){
				newinput.disabled=true;
				newinput.style.color="transparent";
			}else{
				newinput.setAttribute("class","link2 msg_input");
			}
			newinput=createElement("input",{"type":"button","value":texte["naechsteNachricht"],"class":"link msg_input","href":"read.php?from=system&page="+currPage+"&msg="+msgId[d+1]+"&mass=0"},newdiv);
			newinput.addEventListener("click",function(){location.href=this.getAttribute("href");},false);
			if (d==msgId.length-1){newinput.disabled=true;newinput.style.color="transparent";}else{newinput.setAttribute("class","link2 msg_input");}

			// alle lesen
			if (GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doreadState",0)==2){
				if (msgIdRead.length>0){
					newdiv=createElement("div",{"style":"position:absolute;z-index:200;right:0px;top:50px;width:100px;height:40px;background-color:yellow;border:3px solid black;border-radius:10px;text-align:center;color:black;font-weight:bold;"},ALL);
					createElement("p",{"style":"vertical-align:middle;"},newdiv,implode(msgIdRead.length));
					location.href="read.php?from=system&page="+currPage+"&msg="+msgIdRead[msgIdRead.length-1]+"&mass=0";
				}else{
					GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doreadState",0);
					location.href="http://s"+SERVER+"."+GAMEPAGES[LNG]+"/nachrichten/system.php?page="+currPage;
				}
			}
		}
	break;}
	}

	if(absender){
		absender=absender.replace(/^\s+/,"");
		newdiv=candtr[0].getElementsByTagName("td")[1];
		newdiv.innerHTML="";
		igm(absender,newdiv,betreff.replace(/&nbsp;/g," "));
		stats(absender,newdiv);
		vertrag(absender,newdiv);
		createElement("a",{"href":"javascript:addContact('"+absender+"')","class":"link"},newdiv,absender);
	}

	//show last message
	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_letzte","<u>"+betreff+"</u><br>"+msgBox.innerHTML);
	if (msgIdRead.length>0){
		newdiv=createElement("div",{"class":"link","href":"read.php?from=system&page="+currPage+"&msg="+msgIdRead[msgIdRead.length-1]+"&mass=0","style":"position:absolute;bottom:0;right:0;height:26px;width:35px;background:url('"+GFX+"regal2.jpg');background-position:35px 0px;-moz-border-radius:15px;"},ALL);
		newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["naechsteNachricht"]); },false);
		newdiv.addEventListener("click",function(){location.href=this.getAttribute("href");},false);
	}
	candtable=null;candtr=null;msgBox=null;newdiv=null;newinput=null;
}

function do_nachrichten_new(){
	var pagedata=explode(GM_getValue(LNG+"_"+SERVER+"_pagedataNachrichtenNew","{}"));
	GM_setValue(LNG+"_"+SERVER+"_pagedataNachrichtenNew","{}");
	$("btn_inbox").parentNode.children[0].bgColor="#cc9";

	var newdiv=$("msg_subject");
	if(pagedata["subject"]){ newdiv.value=pagedata["subject"]; }
	if(newdiv && GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMessageRe",true)){
		var help=newdiv.value;
		while(help.match(/Re:\s*Re:/)){
			help=help.replace(/Re:\s*Re:/g,"Re:");
		}
		newdiv.value=help;
	}

	newdiv=$("msg_to");
	if(pagedata["to"]){ newdiv.value=pagedata["to"]; }
	if (newdiv && newdiv.value!=""){
		newdiv.style.width="350px";
		stats(newdiv.value,newdiv.parentNode);
	}

	newdiv=$("msg_body");
	if (newdiv){
		var formatMsgNumbers = function (){
			var msgBody=$("msg_body");
			var posStart=msgBody.selectionStart;
			var posEnd=msgBody.selectionEnd;
			if (posStart==posEnd){
				var help=msgBody.value+" ";
				var c;
				while((c=help.search(/\d{4}\D/))!=-1){
					help=help.replace(/(\d)(\d{3}\D)/,"$1"+delimThou+"$2"); //missing sep
					if(c+1<posStart) posStart++;
				}
				while((c=help.search(new RegExp(regDelimThou2)))!=-1){
					help=help.replace(new RegExp(regDelimThou2),"$1"+delimThou+"$2$3"); //shift sep
				}
				while((c=help.search(new RegExp(regDelimThou3)))!=-1){
					help=help.replace(new RegExp(regDelimThou3),"$1$2$3"); //delete sep
					if(c+1<posStart) posStart--;
				}

				msgBody.value=help.slice(0,help.length-1);
				setSelRange(msgBody,posStart,posStart);
				msgBody=null;
			}
		};
		newdiv.value=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichtvorlage","");
		var newa=createElement("a",{"class":"link"},newdiv.parentNode,texte["vorlage"]);
		newa.addEventListener("click",function(){
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichtvorlage",$("msg_body").value);
		},false);

		var valMsgFormat=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMsgFormat",true);
		var newspan=createElement("span",{"style":"line-height:18px;"},newdiv.parentNode.previousSibling.previousSibling,texte["formatiereZahlen"]);
		var newinput=createElement("input",{"type":"checkbox","class":"link","checked":valMsgFormat,"style":"float:left;"},newspan);
		newinput.addEventListener("click",function(){
			if (this.checked){ $("msg_body").addEventListener("keyup",formatMsgNumbers,false); }
			else{ try{$("msg_body").removeEventListener("keyup",formatMsgNumbers,false);}catch(err){} }
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_valMsgFormat",this.checked);
		},false);

		if (valMsgFormat){ newdiv.addEventListener("keyup",formatMsgNumbers,false);	}

		ALL.getElementsByTagName("input")[4].tabIndex="4";
		ALL.getElementsByTagName("input")[4].addEventListener("click",function(){
			now=Math.floor((new Date()).getTime()/1000);
			var save=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten","");
			if (save){
				save=(parseInt(save,10)+1)+"&nbsp;~"+$("msg_to").value+"&nbsp;~<u><<-&nbsp;"+getFormattedDateStr(now,2,false)+",&nbsp;"+getDaytimeStr(now,1)+"&nbsp;"+texte["uhr"]+"</u><br>"+$("msg_body").value+"<br>&nbsp;|"+save;
			}else{
				save="1&nbsp;~"+$("msg_to").value+"&nbsp;~<u><<-&nbsp;"+getFormattedDateStr(now,2,false)+",&nbsp;"+getDaytimeStr(now,1)+"&nbsp;"+texte["uhr"]+"</u><br>"+$("msg_body").value+"<br>";
			}
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten",save);
		},false);
		newa=null;newspan=null;newinput=null;
	}else{
		var msgIdRead=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doread","").split("|");
		if (msgIdRead[0]!=""){
			newdiv=createElement("div",{"class":"link","href":"read.php?from=system&page=1&msg="+msgIdRead[msgIdRead.length-1]+"&mass=0","style":"position:absolute;bottom:0;right:0;height:26px;width:35px;background:url('"+GFX+"regal2.jpg');background-position:35px 0px;-moz-border-radius:15px;"},ALL);
			newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["naechsteNachricht"]); },false);
			newdiv.addEventListener("click",function(){location.href=this.getAttribute("href");},false);
		}
	}

	newdiv=createElement("div",{"id":"lastMessage","style":"position:absolute;top:110px;right:-403px;width:413px;height:134px;padding:5px;background-color:#b8a789;border:2px solid black;-moz-border-radius:10px 0px 0px 10px;z-index:101;z-index:15;color:black;overflow:auto;"},ALL,GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_letzte",""));
	newdiv.addEventListener("mouseover",function(){this.style.right="0";},false);
	newdiv.addEventListener("mouseout",function(){this.style.right="-403px";},false);
	newdiv=null;
}

function do_nachrichten_inbox(){
	if($("btn_inbox").getAttribute("class").search("green")==-1){
		$("btn_inbox").bgColor="#cc9";
		if ($("btn_sysinbox").getAttribute("class").search("green")!=-1){
			window.location.href="http://s"+SERVER+"."+GAMEPAGES[LNG]+"/nachrichten/system.php";
		}
	}
	valServerTimeOffset=GM_getValue(LNG+"_valServerTimeOffset",0);

	var candtable=document.getElementsByTagName("table");
	if(candtable[2]){
		var candtr=candtable[2].getElementsByTagName("tr");
		var cand;
		for(var v=1;v<candtr.length;v++){
			cand=candtr[v].getElementsByTagName("td");
			if(valServerTimeOffset!=0){
				candtr[v].addEventListener("mouseover",function(event){
					var time=getFormattedTime(this.children[1].innerHTML)-valServerTimeOffset;
					showToolTip(event,getFormattedDateStr(time,1)+",&nbsp;"+getDaytimeStr(time,1)+"&nbsp;"+texte["uhr"]);
				},false);
			}
			cand[2].firstElementChild.style.width="230px";
		}
		if(candtable[3]){
			cand=candtable[3].getElementsByTagName("span");
			cand[0].id="prevPage";
			cand[1].id="nextPage";
		}
		cand=null;candtr=null;
	}
	candtable=null;
}

function do_nachrichten_outbox(){
	$("btn_inbox").nextElementSibling.bgColor="#cc9";
	valServerTimeOffset=GM_getValue(LNG+"_valServerTimeOffset",0);
	var candtable=document.getElementsByTagName("table");
	if(candtable[2]){
		var cand,candtr;
		if(valServerTimeOffset!=0){
			candtr=candtable[2].getElementsByTagName("tr");
			for(var v=1;v<candtr.length;v++){
				cand=candtr[v].getElementsByTagName("td");
				candtr[v].addEventListener("mouseover",function(event){
					var time=getFormattedTime(this.firstElementChild.innerHTML)-valServerTimeOffset;
					showToolTip(event,getFormattedDateStr(time,1)+",&nbsp;"+getDaytimeStr(time,1)+"&nbsp;"+texte["uhr"]);
				},false);
			}
		}
		if(candtable[3]){
			cand=candtable[3].getElementsByTagName("span");
			cand[0].id="prevPage";
			cand[1].id="nextPage";
		}
		cand=null;candtr=null;
	}
	candtable=null;
}

function do_nachrichten_contact(){
	$("btn_inbox").nextElementSibling.nextElementSibling.bgColor="#cc9";
}

function do_nachrichten_system(){
	//GM_log("do_nachrichten_system "+implode(pageZusatz));
	getData();
	GM_addStyle(".systemMsg_marketsale{"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_systemMsg_marketsale","")+"}");
	GM_addStyle(".systemMsg_contractsale{"+GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_css_systemMsg_contractsale","font-style:italic;")+"}");
	valServerTimeOffset=GM_getValue(LNG+"_valServerTimeOffset",0);
	var kauf=new Object();
	// market: "id":[name,[prodId,amount],money]
	// contract: "id":[name,[[prodId,amount],...],money]
	var msgId=new Array();
	var msgIdUnknown=splitToInt(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doread",""),"|");
	var pageIsKnown=false;
	var candtable=document.getElementsByTagName("table");
	if(candtable[3]){
		var candspan=candtable[3].getElementsByTagName("span");
		candspan[0].id="prevPage";
		candspan[1].id="nextPage";
		candspan=null;
	}

	if($("btn_sysinbox").getAttribute("class").search("green")==-1){
		$("btn_sysinbox").bgColor="#cc9";
	}

	var arr=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_kauf","");
	if(arr.match(/~\d+~/)){ // TODO delete. conversion since 18.12.
		try{
			for(var v=0;v<top.window.wrappedJSObject.produkt_name;v++){ prodId[top.window.wrappedJSObject.produkt_name[v]]=v; }
			var kauf=new Object();
			arr=arr.split("|");
			for(var v=0;v<arr.length;v++){
				var help=arr[v].split("~");
				if(help[5]=="undefined"){ continue; }
				kauf[help[0]]=new Array();
				kauf[help[0]].push(help[1]);
				if(help[5]=="m"){
					kauf[help[0]].push([prodId[help[3]],parseInt(help[2],10)]);
				}else{
					if(help[2]>0){
						var help2=[[prodId[help[3]],parseInt(help[2],10)]];
					}else{
						var help2=help[3].split("<br>");
						for(var w=0;w<help2.length;w++){
							help2[w]=help2[w].split("x ");
							help2[w]=[prodId[help2[w][1]],parseInt(help2[w][0],10)];
						}
					}
					kauf[help[0]].push(help2);
				}
				kauf[help[0]].push(parseFloat(help[4],10));
				GM_log(implode(kauf[help[0]]));
			}
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_kauf",implode(kauf));
		} catch(err){}
	}
	arr=null;

	try{ kauf=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_kauf","{}")); } catch(err){}

	candtable[2].parentNode.style.overflow="hidden";
	if(candtable[3]){
		var candtr=candtable[2].getElementsByTagName("tr");
		candtr[0].getElementsByTagName("td")[0].innerHTML=""; // the "New" in headline
		var colgroup=candtable[2].getElementsByTagName("col");
		//colgroup[0].width="20px";
		//colgroup[1].width="150px";
		//colgroup[2].width="360px";
		colgroup[3].width="20px";
		colgroup=null;

		candtable[2].addEventListener("mouseover",function(event){
			var node=event.target;
			var mouseOverText=node.getAttribute("mouseOverText");
			while((node!=this)&&(!mouseOverText)){
				node=node.parentNode;
				mouseOverText=node.getAttribute("mouseOverText");
			}
			if(mouseOverText){ showToolTip(event,mouseOverText); }
			node=null;mouseOverText=null;
		},false);

		var canda,cell,pic;
		for(var v=0;v<candtr.length-1;v++){
			var time="";
			if(valServerTimeOffset){
				cell=candtr[v+1].getElementsByTagName("td")[1];
				time=getFormattedTime(cell.innerHTML)-valServerTimeOffset;
				time=getFormattedDateStr(time,1)+",&nbsp;"+getDaytimeStr(time,1)+"&nbsp;"+texte["uhr"]+"<br>";
			}
			canda=candtr[v+1].getElementsByTagName("a");
			var help=/javascript:showMessage\('(\d+)',(\d+)\)/.exec(canda[0].href);
			if (help[2]=="0"){
				msgId[v]=help[1];
				if (kauf[msgId[v]]){
					// known sell message
					pageIsKnown=true;
					canda[0].parentNode.style.width="360px"; //130+150+80 (old 380)
					canda[0].innerHTML="";
					canda[0].setAttribute("style","text-decoration:none");
					if (typeof(kauf[msgId[v]][1][0])!="object"){ igm(kauf[msgId[v]][0],canda[0].parentNode,prodName[kauf[msgId[v]][1][0]].replace(/&nbsp;/g," ")); }
					else if(kauf[msgId[v]][1].length==1){ igm(kauf[msgId[v]][0],canda[0].parentNode,prodName[kauf[msgId[v]][1][0][0]].replace(/&nbsp;/g," ")); }
					else{ igm(kauf[msgId[v]][0],canda[0].parentNode); }
					createElement("span",{"style":"position:absolute;width:130px;"},canda[0],kauf[msgId[v]][0]);
					if(typeof(kauf[msgId[v]][1][0])=="object") canda[0].parentNode.setAttribute("class","systemMsg_contractsale");
					else canda[0].parentNode.setAttribute("class","systemMsg_marketsale");
					cell=createElement("span",{"style":"position:absolute;left:130px;width:150px;text-align:right;"},canda[0]);
					if(typeof(kauf[msgId[v]][1][0])!="object"){
						candtr[v+1].setAttribute("mouseOverText",time+canda[0].parentNode.getAttribute("title")+"<br>"+texte["stueckpreis"]+": "+moneyFormat(kauf[msgId[v]][2]/kauf[msgId[v]][1][1]));
						cell.innerHTML=numberFormat(kauf[msgId[v]][1][1])+"&nbsp;"+prodName[kauf[msgId[v]][1][0]]+"&nbsp;";
						produktPic(kauf[msgId[v]][1][0],cell);
					}else if(kauf[msgId[v]][1].length==1){
						candtr[v+1].setAttribute("mouseOverText",time+canda[0].parentNode.getAttribute("title")+"<br>"+texte["stueckpreis"]+": "+moneyFormat(kauf[msgId[v]][2]/kauf[msgId[v]][1][0][1]));
						cell.innerHTML=numberFormat(kauf[msgId[v]][1][0][1])+"&nbsp;"+prodName[kauf[msgId[v]][1][0][0]]+"&nbsp;";
						produktPic(kauf[msgId[v]][1][0][0],cell);
					}else{
						cell.innerHTML="...";
						var str=canda[0].parentNode.getAttribute("title");
						for(var i=0;i<kauf[msgId[v]][1].length;i++){
							str += "<br>"+kauf[msgId[v]][1][i][1]+"&nbsp;"+prodName[kauf[msgId[v]][1][i][0]];
						}
						candtr[v+1].setAttribute("mouseOverText",time+str);
					}
					canda[0].parentNode.setAttribute("title","");

					createElement("span",{"style":"position:absolute;left:280px;width:80px;text-align:right;"},canda[0],moneyFormat(kauf[msgId[v]][2]));
				}else{
					var help2=canda[0].innerHTML.replace("<b>","").replace("</b>","");
					if (help2==texte["msgMarketsale"]){
						msgIdUnknown.push(msgId[v]);
						candtr[v+1].setAttribute("mouseOverText",time+canda[0].parentNode.getAttribute("title"));
					}else if(help2==texte["msgContractsale"]){
						msgIdUnknown.push(msgId[v]);
						candtr[v+1].setAttribute("mouseOverText",time+canda[0].parentNode.getAttribute("title"));
					}else if(time!=""){
						candtr[v+1].setAttribute("mouseOverText",time);
					}
				}
			}else{
				canda[0].innerHTML=canda[0].innerHTML.replace(/<b>/g,"");
			}
		}
	}else{
		msgIdUnknown=new Array();
	}

	try{ msgIdAll=msgId.concat(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_system").split("|")); }
	catch(err){ msgIdAll=msgId; }

	function NumsortDesc (a, b){return parseInt(b,10) - parseInt(a,10);}
	msgIdAll.sort(NumsortDesc);
	if (msgIdAll.length>1){
		for(var v=msgIdAll.length-2;v>-1;v--){
			if (msgIdAll[v]==msgIdAll[v+1]) msgIdAll.splice(v+1,1);
		}
	}

	msgIdUnknown.sort(NumsortDesc);
	for(var v=msgIdUnknown.length-1;v>-1;v--){
		if (msgIdUnknown[v]==msgIdUnknown[v+1]) msgIdUnknown.splice(v+1,1);
		if (kauf[msgIdUnknown[v]] || isNaN(msgIdUnknown[v]) ) msgIdUnknown.splice(v,1);
	}

	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_system",msgIdAll.join("|"));
	GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doread",msgIdUnknown.join("|"));

	if(!candtable[3]){
		cell=createElement("div",{"style":"width:550px;position:absolute;left:25px;top:320px;"},candtable[1].getElementsByTagName("td")[0]);
		cell=createElement("table",{"cellspacing":"0","cellpadding":"0","style":"width:550px;"},cell);
		createElement("td",{},createElement("tr",{},cell));
		createElement("td",{},createElement("tr",{},cell));
	}
	cell=createElement("input",{"type":"button","class":"link msg_input", "value":texte["zeigeLog"]},candtable[3].getElementsByTagName("td")[1]);
	cell.addEventListener("click",init_log,false);

	if (msgIdUnknown.length>0){
		switch(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doreadState",0)){
		case 3:{
			if (!pageIsKnown && (candtable[3].getElementsByTagName("span")[1].getAttribute("onclick"))){
				click(candtable[3].getElementsByTagName("span")[1]);
			}else{
				GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doreadState",2); //alle lesen
				unsafeWindow.showMessage(msgIdUnknown[msgIdUnknown.length-1],0);
			}
		break;}
		case 1:{
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doreadState",0); // eine lesen
			unsafeWindow.showMessage(msgIdUnknown[msgIdUnknown.length-1],0);
		break;}
		default:{
			cell=createElement("input",{"type":"button","class":"link msg_input", "value":texte["alleLesen"]},candtable[3].getElementsByTagName("td")[1]);
			cell.addEventListener("click",function(){
				GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doreadState",3); //alle lesen vorbereiten
				do_nachrichten_system();
			},false);
		}
		}
	}else{
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doreadState",0);
	}
	candtable=null;candtr=null;canda=null;cell=null;pic=null;
	//*********************
	function init_log(){
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_system","");
		for(var v in kauf){
			if(!kauf.hasOwnProperty(v)){ continue; }
			kauf[v][3]=new Object;
			if(typeof kauf[v][1][0]!="object"){
				kauf[v][3][kauf[v][1][0]]=[kauf[v][1][1],kauf[v][2],Math.round(100*kauf[v][2]/kauf[v][1][1])/100];
			}else{
				var sum=0;
				for(var i=0;i<kauf[v][1].length;i++){
					kauf[v][3][kauf[v][1][i][0]]=[kauf[v][1][i][1],kauf[v][1][i][1]*gut[kauf[v][1][i][0]]];
					sum += kauf[v][1][i][1]*gut[kauf[v][1][i][0]];
				}
				sum /= kauf[v][2];
				for(var i in kauf[v][3]){
					if(!kauf[v][3].hasOwnProperty(i)){ continue; }
					kauf[v][3][i][1] /= sum;
					kauf[v][3][i][2]=Math.round(100*kauf[v][3][i][1]/kauf[v][3][i][0])/100;
				}
			}
		}
		build_log("",null);
	}
	function build_log(filterPlayer,filterProduct){
		//GM_log("build_log :"+filterPlayer+":"+filterProduct);
		var cell=ALL.getElementsByClassName("error");
		if(cell[0]){ removeElement(cell[0]); }
		var filterPlayerLow=filterPlayer.toLowerCase();
		var umsatz=0;
		var newtable=createElement("table",{"style":"width:100%;"});
		var candtable=document.getElementsByTagName("table");
		candtable[2].parentNode.replaceChild(newtable,candtable[2]);
		var newtablebody=createElement("tbody",{"class":"hoverRowBgCc9","style":"overflow-y:scroll; overflow-x:hidden;height: 228px;"},newtable);
		var newtablefoot=createElement("tfoot",{},newtable);
		var newtr,newtd;
		var kaufArrayHelper=new Array();
		for(var v in kauf){
			if(!kauf.hasOwnProperty(v)){ continue; }
			if ((kauf[v][0].toLowerCase().search(filterPlayerLow)!=-1) && ((filterProduct==null)||(kauf[v][3][filterProduct]))){
				umsatz += kauf[v][2];
				kaufArrayHelper.push(v);
			}
		}

		function build_logPlot(){
			var newtablebody=document.getElementsByTagName("table")[2].getElementsByTagName("tbody")[0];
			var start=newtablebody.getElementsByTagName("tr").length;
			var end=Math.min(start+100,kaufArrayHelper.length);
			//GM_log("build_logPlot "+start+":"+(end-1));
			var newtr,newtd,newdiv;
			for(var w=start;w<end;w++){
				var v=kaufArrayHelper[w];
				newtr=createElement("tr",{"kaufId":v},newtablebody);
				if(typeof kauf[v][1][0]=="object") newtr.style.fontStyle="italic";
				newtd=createElement("td",{"class":"link"},newtr,kauf[v][0]);
				newtd.addEventListener("mouseover",function(event){ showToolTip(event,texte["filtern"].replace(/%1%/,kauf[this.parentNode.getAttribute("kaufId")][0])); },false);
				newtd.addEventListener("click",function(){build_log(kauf[this.parentNode.getAttribute("kaufId")][0],null);},false);
				newtd=createElement("td",{},newtr);
				for(var i in kauf[v][3]){
					if(!kauf[v][3].hasOwnProperty(i)){ continue; }
					newdiv=createElement("div",{"class":"link","style":"height:16px","prod":i},newtd);
					produktPic(i,newdiv);
					createElement("span",{},newdiv,numberFormat(kauf[v][3][i][0])+" "+prodName[i]);
					newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["filtern"].replace(/%1%/,prodName[this.getAttribute("prod")])); },false);
					newdiv.addEventListener("click",function(){build_log("",this.getAttribute("prod"));},false);
				}
				newtd=createElement("td",{"class":"link","align":"right","href":"read.php?from=system&page=1&msg="+v+"&mass=0"},newtr);
				newtd.addEventListener("mouseover",function(event){ showToolTip(event,texte["zurNachricht"]); },false);
				newtd.addEventListener("click",function(){location.href=this.getAttribute("href");},false);
				for(var i in kauf[v][3]){
					if(!kauf[v][3].hasOwnProperty(i)){ continue; }
					createElement("div",{"style":"height:16px"},newtd,moneyFormat(kauf[v][3][i][1]));
				}
				newtd=createElement("td",{"class":"link","align":"right","href":"read.php?from=system&page=1&msg="+v+"&mass=0"},newtr);
				newtd.addEventListener("mouseover",function(event){ showToolTip(event,texte["zurNachricht"]); },false);
				newtd.addEventListener("click",function(){location.href=this.getAttribute("href");},false);
				for(var i in kauf[v][3]){
					if(!kauf[v][3].hasOwnProperty(i)){ continue; }
					createElement("div",{"style":"height:16px;padding-right:20px;"},newtd,moneyFormat(kauf[v][3][i][2]));
				}
			}
			$("kaufDataCount").innerHTML=numberFormat(end)+"/"+numberFormat(kaufArrayHelper.length);
			newtablebody=null;newtr=null;newtd=null;newdiv=null;
		}

		newtablebody.addEventListener("scroll",function(){
			if((parseInt(this.scrollTop,10)+parseInt(this.style.height,10))>0.95*parseInt(this.scrollHeight,10)){
				build_logPlot();
			}
		},false);

		newtr=createElement("tr",{},newtablefoot);
		createElement("td",{"id":"kaufDataCount"},newtr);
		createElement("td",{},newtr);
		createElement("td",{"align":"right", "style":"border-top:1px solid"},newtr,moneyFormat(umsatz));
		build_logPlot();

		newtable=createElement("table",{"style":"width: 530px;"});
		candtable[3].parentNode.replaceChild(newtable,candtable[3]);
		newtr=createElement("tr",{},newtable);
		createElement("td",{},newtr,texte["waren"]+":");
		newtd=createElement("td",{},newtr);
		cell=createElement("input",{"type":"button","class":"link msg_input", "value":texte["summiere"]},newtd);
		cell.addEventListener("click",function(){build_log_sumWaren(filterPlayer);},false);

		createElement("span",{"style":"padding-left:10px;"},newtd,texte["filter"]+":");
		cell=createElement("select",{"class":"link2"},newtd);
		createElement("option",{"value":"null"},cell,"");
		for(var v=0;v<prodNameSort.length;v++){ createElement("option",{"value":prodNameSort[v]},cell,prodName[prodNameSort[v]]);	}
		cell.value=filterProduct;
		cell.addEventListener("change",function(){ build_log(filterPlayer,this.value=="null"?null:this.value);},false);

		newtr=createElement("tr",{},newtable);
		createElement("td",{},newtr,texte["kaeufer"]+":");
		newtd=createElement("td",{},newtr);
		var cell=createElement("input",{"type":"button","class":"link msg_input", "value":texte["summiere"]},newtd);
		cell.addEventListener("click",function(){build_log_sumKaeufer(filterProduct,"gewinn");},false);

		createElement("span",{"style":"padding-left:10px;"},newtd,texte["filter"]+":");
		cell=createElement("input",{"value":filterPlayer,"class":"link","style":"width:100px","maxlength":"20"},newtd);
		cell.addEventListener("change",function(){ build_log(this.value,filterProduct);},false);

		candtable=null;newtable=null;newtablebody=null;newtablefoot=null;newtr=null;newtd=null;cell=null;
	}
	function build_log_sumWaren(filterPlayer){
		//GM_log("build_log_sumWaren :"+filterPlayer);
		var filterPlayerLow=filterPlayer.toLowerCase();
		var kaufSum1=new Object();
		for(var v in kauf){
			if(!kauf.hasOwnProperty(v)){ continue; }
			if((kauf[v][0].toLowerCase().search(filterPlayerLow)!=-1)){
				for(var prod in kauf[v][3]){
					if(!kauf[v][3].hasOwnProperty(prod)){ continue; }
					if(!kaufSum1[prod]){
						kaufSum1[prod]=[prod,0,0,0];
					}
					kaufSum1[prod][1] += kauf[v][3][prod][0];
					kaufSum1[prod][2] += kauf[v][3][prod][1];
					kaufSum1[prod][3] += (typeof kauf[v][1][0]=="object"?1:0.9)*kauf[v][3][prod][1];
				}
			}
		}

		var kaufSum=new Array();
		for(var v in kaufSum1){
			if(!kaufSum1.hasOwnProperty(v)){ continue; }
			kaufSum.push(kaufSum1[v]);
		}
		kaufSum.sort(function(a,b){return b[2]-a[2];});

		var candtable=document.getElementsByTagName("table");
		var newtable=createElement("table",{"style":"width: 100%;"});
		candtable[2].parentNode.replaceChild(newtable,candtable[2]);
		var newtablehead=createElement("thead",{},newtable);
		var newtablebody=createElement("tbody",{"class":"hoverRowBgCc9","style":"overflow-y:auto; overflow-x:hidden;height: 209px;"},newtable);
		var newtablefoot=createElement("tfoot",{},newtable);
		var newtr=createElement("tr",{},newtablehead);
		var newtd=createElement("th",{},newtr,texte["produkt"]);
		createElement("th",{},newtr,texte["menge"]);
		createElement("th",{},newtr,texte["umsatz"]);
		createElement("th",{},newtr,sign_average);
		createElement("th",{},newtr,texte["gewinn"]);
		createElement("th",{},newtr,sign_average);
		var umsatz=0;
		var gewinn=0;
		for(var v=0;v<kaufSum.length;v++){
			umsatz+=kaufSum[v][2];
			gewinn+=kaufSum[v][3];
			newtr=createElement("tr",{"kaufSumId":v,"class":"link"},newtablebody);
			newtr.addEventListener("mouseover",function(event){ showToolTip(event,texte["filtern"].replace(/%1%/,prodName[kaufSum[this.getAttribute("kaufSumId")][0]])); },false);
			newtr.addEventListener("click",function(){build_log("",kaufSum[this.getAttribute("kaufSumId")][0]);},false);
			newtd=createElement("td",{},newtr);
			produktPic(kaufSum[v][0],newtd);
			createElement("span",{},newtd,prodName[kaufSum[v][0]]);
			createElement("td",{"align":"right","style":"padding-right:3px;border-right:1px solid black"},newtr,numberFormat(kaufSum[v][1],0));
			createElement("td",{"align":"right"},newtr,numberFormat(kaufSum[v][2]));
			createElement("td",{"align":"right","style":"padding-right:3px;border-right:1px solid black"},newtr,numberFormat(kaufSum[v][2]/kaufSum[v][1],2));
			createElement("td",{"align":"right"},newtr,numberFormat(kaufSum[v][3]));
			createElement("td",{"align":"right","style":"padding-right:20px;"},newtr,numberFormat(kaufSum[v][3]/kaufSum[v][1],2));
		}
		newtr=createElement("tr",{},newtablefoot);
		createElement("td",{},newtr);
		createElement("td",{},newtr);
		createElement("td",{"align":"right", "style":"border-top:1px solid"},newtr,numberFormat(umsatz));
		createElement("td",{},newtr);
		createElement("td",{"align":"right", "style":"border-top:1px solid"},newtr,numberFormat(gewinn));

		newtable=createElement("table",{"style":"width: 530px;"});
		candtable[3].parentNode.replaceChild(newtable,candtable[3]);
		newtr=createElement("tr",{},newtable);
		newtd=createElement("td",{"colspan":"2"},newtr);
		var cell=createElement("input",{"type":"button","class":"link msg_input", "value":texte["zeigeLog"]},newtd);
		cell.addEventListener("click",function(){ build_log(filterPlayer,null);},false);

		newtr=createElement("tr",{},newtable);
		createElement("td",{},newtr,texte["kaeufer"]+":");
		newtd=createElement("td",{},newtr);
		var cell=createElement("input",{"type":"button","class":"link msg_input", "value":texte["summiere"]},newtd);
		cell.addEventListener("click",function(){build_log_sumKaeufer(null,"gewinn");},false);

		createElement("span",{"style":"padding-left:10px;"},newtd,texte["filter"]+":");
		cell=createElement("input",{"value":filterPlayer,"class":"link","style":"width:100px","maxlength":"20"},newtd);
		cell.addEventListener("change",function(){ build_log_sumWaren(this.value); },false);

		candtable=null;newtable=null;newtablehead=null;newtablebody=null;newtablefoot=null;newtr=null;newtd=null;cell=null;
	}
	function build_log_sumKaeufer(filterProduct,mode){
		//GM_log("build_log_sumKaeufer :"+filterProduct+":"+mode);
		var kaufSum1=new Object();
		for(var v in kauf){
			if(!kauf.hasOwnProperty(v)){ continue; }
			if((filterProduct==null)||(kauf[v][3][filterProduct])){
				if(!kaufSum1[kauf[v][0]]){
					kaufSum1[kauf[v][0]]=new Object();
					kaufSum1[kauf[v][0]]["kaeufer"]=kauf[v][0];
					kaufSum1[kauf[v][0]]["v"]=new Object();
					kaufSum1[kauf[v][0]]["m"]=new Object();
					kaufSum1[kauf[v][0]]["umsatz"]=0;
					kaufSum1[kauf[v][0]]["gewinn"]=0;
				}
				for(var prod in kauf[v][3]){
					if(!kauf[v][3].hasOwnProperty(prod)){ continue; }
					var typ=typeof kauf[v][1][0]=="object"?"v":"m";
					if(!kaufSum1[kauf[v][0]][typ][prod]){ kaufSum1[kauf[v][0]][typ][prod]=[0,0];}
					kaufSum1[kauf[v][0]][typ][prod][0] += kauf[v][3][prod][0];
					kaufSum1[kauf[v][0]][typ][prod][1] += kauf[v][3][prod][1];
					kaufSum1[kauf[v][0]]["umsatz"] += kauf[v][3][prod][1];
					kaufSum1[kauf[v][0]]["gewinn"] += (typ=="v"?1:0.9)*kauf[v][3][prod][1];
				}
			}
		}

		var kaufSum=new Array();
		for(var v in kaufSum1){
			if(!kaufSum1.hasOwnProperty(v)){ continue; }
			kaufSum.push(kaufSum1[v]);
		}
		kaufSum.sort(function(a,b){return b[mode]-a[mode];});

		var candtable=document.getElementsByTagName("table");
		var newtable=createElement("table",{"style":"width: 100%;line-height:16px;"});
		candtable[2].parentNode.replaceChild(newtable,candtable[2]);
		var newtablehead=createElement("thead",{},newtable);
		var newtablebody=createElement("tbody",{"class":"hoverRowBgCc9","style":"overflow-y:auto; overflow-x:hidden;height: 209px;"},newtable);
		var newtablefoot=createElement("tfoot",{},newtable);
		var newtr=createElement("tr",{},newtablehead);
		var newtd=createElement("th",{},newtr,texte["kaeufer"]);
		createElement("th",{},newtr,texte["produkt"]);
		createElement("th",{},newtr,texte[mode]);
		createElement("th",{},newtr,sign_average);
		var help=(mode=="gewinn"?0.9:1);
		var sum=0;
		for(var v=0;v<kaufSum.length;v++){
			sum += kaufSum[v][mode];
			newtr=createElement("tr",{"kaufSumId":v},newtablebody);
			newtd=createElement("td",{"class":"link"},newtr,kaufSum[v]["kaeufer"]);
			newtd.addEventListener("mouseover",function(event){ showToolTip(event,texte["filtern"].replace(/%1%/,this.innerHTML)); },false);
			newtd.addEventListener("click",function(){build_log(this.innerHTML,null);},false);
			newtd=createElement("td",{},newtr);
			for(var prod in kaufSum[v]["m"]){
				if(!kaufSum[v]["m"].hasOwnProperty(prod)){ continue; }
				newdiv=createElement("div",{"prod":prod,"class":"link"},newtd);
				produktPic(prod,newdiv);
				createElement("span",{},newdiv,numberFormat(kaufSum[v]["m"][prod][0])+"&nbsp;"+prodName[prod]);
				newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["filtern"].replace(/%1%/,prodName[this.getAttribute("prod")])); },false);
				newdiv.addEventListener("click",function(){build_log_sumKaeufer(this.getAttribute("prod"),mode);},false);
			}
			for(var prod in kaufSum[v]["v"]){
				if(!kaufSum[v]["v"].hasOwnProperty(prod)){ continue; }
				newdiv=createElement("div",{"prod":prod,"class":"link"},newtd);
				produktPic(prod,newdiv);
				createElement("span",{"style":"font-style:italic;"},newdiv,numberFormat(kaufSum[v]["v"][prod][0])+"&nbsp;"+prodName[prod]);
				newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["filtern"].replace(/%1%/,prodName[this.getAttribute("prod")])); },false);
				newdiv.addEventListener("click",function(){build_log_sumKaeufer(this.getAttribute("prod"),mode);},false);
			}
			newtd=createElement("td",{"align":"right"},newtr);
			for(var prod in kaufSum[v]["m"]){
				if(!kaufSum[v]["m"].hasOwnProperty(prod)){ continue; }
				createElement("div",{},newtd,numberFormat(help*kaufSum[v]["m"][prod][1]));
			}
			for(var prod in kaufSum[v]["v"]){
				if(!kaufSum[v]["v"].hasOwnProperty(prod)){ continue; }
				createElement("div",{"style":"font-style:italic;"},newtd,numberFormat(kaufSum[v]["v"][prod][1]));
			}
			newtd=createElement("td",{"align":"right"},newtr);
			for(var prod in kaufSum[v]["m"]){
				if(!kaufSum[v]["m"].hasOwnProperty(prod)){ continue; }
				createElement("div",{},newtd,numberFormat(help*kaufSum[v]["m"][prod][1]/kaufSum[v]["m"][prod][0],2));
			}
			for(var prod in kaufSum[v]["v"]){
				if(!kaufSum[v]["v"].hasOwnProperty(prod)){ continue; }
				createElement("div",{"style":"font-style:italic;"},newtd,numberFormat(kaufSum[v]["v"][prod][1]/kaufSum[v]["v"][prod][0],2));
			}
			createElement("td",{"align":"right","style":"padding-right:20px;"},newtr,numberFormat(kaufSum[v][mode]));

		}
		newtr=createElement("tr",{},newtablefoot);
		createElement("td",{"colspan":"2"},newtr);
		createElement("td",{"align":"right", "style":"border-top:1px solid"},newtr,numberFormat(sum));
		createElement("td",{"colspan":"2"},newtr);

		newtable=createElement("table",{"style":"width: 530px;"});
		candtable[3].parentNode.replaceChild(newtable,candtable[3]);
		newtr=createElement("tr",{},newtable);
		newtd=createElement("td",{"colspan":"2"},newtr);
		var cell=createElement("input",{"type":"button","class":"link msg_input", "value":texte["zeigeLog"]},newtd);
		cell.addEventListener("click",function(){ build_log("",filterProduct);},false);
		cell=createElement("input",{"type":"button","class":"link msg_input","id":(mode=="gewinn"?"umsatz":"gewinn"),"value":texte[(mode=="gewinn"?"umsatz":"gewinn")]},newtd);
		cell.addEventListener("click",function(){ build_log_sumKaeufer(filterProduct,this.id);},false);

		newtr=createElement("tr",{},newtable);
		createElement("td",{},newtr,texte["waren"]+":");
		newtd=createElement("td",{},newtr);
		var cell=createElement("input",{"type":"button","class":"link msg_input", "value":texte["summiere"]},newtd);
		cell.addEventListener("click",function(){build_log_sumWaren("");},false);
		createElement("span",{"style":"padding-left:10px;"},newtd,texte["filter"]+":");
		cell=createElement("select",{"class":"link2"},newtd);
		createElement("option",{"value":"null"},cell,"");
		for(var v=0;v<prodNameSort.length;v++){ createElement("option",{"value":prodNameSort[v]},cell,prodName[prodNameSort[v]]);	}
		cell.value=filterProduct;
		cell.addEventListener("change",function(){ build_log_sumKaeufer(this.value=="null"?null:this.value,mode); },false);

		candtable=null;newtable=null;newtablehead=null;newtablebody=null;newtablefoot=null;newtr=null;newtd=null;cell=null;
	}
}

//***********************************************************************************************************

function do_vertraege_head(){
	//GM_log("do_vertraege_head");
	var candtr=document.getElementsByTagName("table")[0].getElementsByTagName("tr");
	for(var v=0;v<candtr[0].childElementCount;v++){
		candtr[0].children[v].setAttribute("class","bordered link hoverBgLightbrown");
		candtr[0].children[v].firstElementChild.setAttribute("class","link");
	}
	var newtd=createElement("td",{"class":"bordered link hoverBgLightbrown","align":"center"},candtr[0]);
	var newa=createElement("a",{"style":"font-weight:bold;"},newtd,texte["alte"]);
	newa.addEventListener("click",function(){
		window.setTimeout(function(){
			GM_setValue(LNG+"_"+SERVER+"_pagedataVertraegeOverview",implode({"contractview":"old"}));
			if (PAGE=="vertraege/overview"){ do_vertraege_overview(); }
			else{ location.href="overview.php"; }
		},0);
	},false);
	candtr=null;newtd=null;newa=null;
}

function do_vertraege_new(){
	getData();
	var candtable=document.getElementsByTagName("table");
	candtable[0].firstElementChild.firstElementChild.firstElementChild.bgColor="lightblue";
	var contractPrices=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegePreise","[]"));

	var candinput=candtable[1].getElementsByTagName("input");
	candtable=null;
	if (candinput.length>0){
		// contract submit page
		var vertraegeOut=new Object();
		try{ vertraegeOut=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeOut","{}")); }catch(err){}
		var valContractLogAmount=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valContractLogAmount",200);
		var neuvertrag=new Array();
		neuvertrag[0]= Math.round((new Date()).getTime()/1000);
		neuvertrag[2]=new Array();
		for(var v=0;v<candinput.length;v++){
			if (candinput[v].name=="contract_to"){
				neuvertrag[1]=candinput[v].value;
				GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_lastContractTo",candinput[v].value);
			}
			else if (candinput[v].name.search("prod")!=-1){ neuvertrag[2][/(\d+)/.exec(candinput[v].name)[1]]=[parseInt(candinput[v].value,10),,]; }
			else if (candinput[v].name.search("anz")!=-1){ neuvertrag[2][/(\d+)/.exec(candinput[v].name)[1]][1]=parseInt(candinput[v].value,10); }
			else if (candinput[v].name.search("preis")!=-1){ neuvertrag[2][/(\d+)/.exec(candinput[v].name)[1]][2]=parseFloat(candinput[v].value,10); }
		}

		var help=[];
		for(var v in vertraegeOut){
			if(!vertraegeOut.hasOwnProperty(v)){ continue; }
			help.push(parseInt(v,10));
		}
		help.sort(function(a,b){return(b-a);});
		for(var v=valContractLogAmount-1;v<help.length;v++){
			delete vertraegeOut[help[v]];
		}
		if(help.length==0){ help.push(0); }
		vertraegeOut[help[0]+1]=neuvertrag;
		vertraegeOut.sortObj(sortObjFunctions["int"],true);
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeOut",implode(vertraegeOut));

		for(var v=0;v<neuvertrag[2].length;v++){ contractPrices[neuvertrag[2][v][0]]=neuvertrag[2][v][2]; }
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegePreise",implode(contractPrices));

		// multi submit
		var submitButton=document.getElementsByName("confirm_contract")[0];
		submitButton.style.display="none";
		var newdiv=createElement("div",{"style":"position:absolute;width:300px;height:50px;bottom:135px;left:150px;text-align:center;"},document.getElementsByName("form_confirmcontract")[0].parentNode);
		var newbutton=createElement("input",{"type":"button","class":"link msg_input","id":"multiSubmit","name":"1","value":submitButton.value},newdiv);
		newbutton.addEventListener("click",function(){
			var submitForm=document.getElementsByName("form_confirmcontract")[0];
			var help=submitForm.getElementsByTagName("input");
			var str="";
			for(var v=0;v<help.length;v++){ str += help[v].getAttribute("name")+"="+help[v].value+"&"; }
			str=str.slice(0,str.length-1);
			var c=parseInt(this.getAttribute("name"),10);
			var sentContracts=1;
			for(var d=1;d<c;d++){
				window.setTimeout(function(){
					GM_xmlhttpRequest({
					method: "POST",
					url: "http://s"+SERVER+"."+GAMEPAGES[LNG]+submitForm.getAttribute("action"),
					headers: {"Content-type": "application/x-www-form-urlencoded"},
					data: str,
					onload: function(response){
						showInLogBubble("Sent duplicate contract Nr "+(++sentContracts));
					}
					});
				},d*100);
			}
			window.setTimeout(function(){
				var submitButton=document.getElementsByName("confirm_contract")[0];
				click(submitButton);
				submitButton=null;submitForm=null;
			},c*100);
		},false);
		createElement("div",{},newdiv);
		newbutton=createElement("input",{"type":"button","class":"link msg_input","value":"-"},newdiv);
		newbutton.addEventListener("click",function(){
			var submitButton=document.getElementsByName("confirm_contract")[0];
			var multiSubmitButton=$("multiSubmit");
			multiSubmitButton.setAttribute("name",Math.max(1,parseInt(multiSubmitButton.getAttribute("name"),10)-1));
			if (multiSubmitButton.getAttribute("name")=="1"){ multiSubmitButton.value=submitButton.value; }
			else{ multiSubmitButton.value=multiSubmitButton.getAttribute("name")+"x "+submitButton.value; }
			submitButton=null;multiSubmitButton=null;
		},false);
		newbutton=createElement("input",{"type":"button","class":"link msg_input","value":"+"},newdiv);
		newbutton.addEventListener("click",function(){
			var submitButton=document.getElementsByName("confirm_contract")[0];
			var multiSubmitButton=$("multiSubmit");
			multiSubmitButton.setAttribute("name",parseInt(multiSubmitButton.getAttribute("name"),10)+1);
			multiSubmitButton.value=multiSubmitButton.getAttribute("name")+"x "+submitButton.value;
			submitButton=null;multiSubmitButton=null;
		},false);
		newdiv=null;newbutton=null;submitButton=null;
	}else{
		// contract edit page
		var pagedata=explode(GM_getValue(LNG+"_"+SERVER+"_pagedataVertraegeNew","{}"));
		GM_setValue(LNG+"_"+SERVER+"_pagedataVertraegeNew","{}");

		var candtr=$("addproduct").getElementsByTagName("tr");
		var newtr=createElement("tr");
		candtr[4].parentNode.insertBefore(newtr,candtr[4]);
		createElement("td",{},newtr);
		createElement("td",{},newtr,texte["wert"]);
		var newtd=createElement("td",{"align":"left"},newtr);
		newinput=createElement("input",{"id":"addproductWert","class":"text msg_input","type":"text","style":"width: 100px;border: 1px solid #aaa;"},newtd);
		newinput.addEventListener("keyup",function(event){
			var preis=parseFloat($("neu_preis").value.replace(regDelimDeci,"."),10);
			if (preis>0){
				$("neu_anzahl").value=Math.floor(0.01+parseFloat(this.value.replace(regDelimThou,"").replace(regDelimDeci,"."),10)/preis);
			}
			if (event.keyCode==13) click($("btn_add_product"));
		},false);
		newinput.addEventListener("focus",function(){this.style.border="1px solid #555555";},false);
		newinput.addEventListener("blur",function(){this.value=numberFormat(parseInt($("neu_anzahl").value,10)*parseFloat($("neu_preis").value.replace(regDelimDeci,"."),10),2);this.style.border="1px solid #aaa";},false);
		$("neu_anzahl").addEventListener("focus",function(){this.style.border="1px solid #555555";},false);
		$("neu_anzahl").addEventListener("keyup",function(event){
			var anzahl=parseInt($("neu_anzahl").value.replace(/\D/g,""),10);
			$("addproductWert").value=numberFormat(anzahl*parseFloat($("neu_preis").value.replace(regDelimDeci,"."),10),2);
			this.value=(anzahl>0?anzahl:"");
			if (event.keyCode==13) click($("btn_add_product"));
		},false);
		$("neu_anzahl").addEventListener("blur",function(){this.style.border="1px solid #aaa";},false);
		$("neu_preis").addEventListener("focus",function(){this.style.border="1px solid #555";},false);
		$("neu_preis").addEventListener("keyup",function(event){
			$("addproductWert").value=numberFormat(parseInt($("neu_anzahl").value,10)*parseFloat($("neu_preis").value.replace(regDelimDeci,"."),10),2);
			if (event.keyCode==13) click($("btn_add_product"));
		},false);
		$("neu_preis").addEventListener("blur",function(){this.style.border="1px solid #aaa";},false);

		// selected products
		for(var v=0;v<=7;v++){
			$("delbtn_"+v).addEventListener("mouseover",function(event){
				showToolTip(event,texte["loeschen"]);
			},false);
			$("platzhalter_"+v).addEventListener("mouseover",function(event){
				var currNr=this.id.replace(/platzhalter_/,"");
				prod=parseInt($("produkt_"+currNr).value,10);
				var amount=parseInt($("anzahl_"+currNr).value,10);
				var price=parseFloat($("preis_"+currNr).value.replace(regDelimDeci,"."),10);

				var str='<table class="white" cellspacing="0">';
				str += '<tr><th colspan="2" style="border-bottom:1px solid white;">'+prodName[prod]+'</td></tr>';
				str += '<tr><td style="text-align:right;">'+numberFormat(amount)+'&nbsp;'+sign_mult+'</td><td style="text-align:right;">'+moneyFormat(price)+'</td></tr>';
				str += '<tr><td style="text-align:right;">=</td><td style="text-align:right;">'+moneyFormat(amount*price)+'</td></tr>';

				str += '</table>';
				showToolTip(event,str);
			},false);

		}
		var currContract=new Object();
		createElement("div",{"id":"preis_total","style":"position:absolute;top:180px;left:310px;color:black"},ALL);
		function calcCurrContract(){
			var sum=0;
			currContract=new Object();
			for(var v=0;v<=7;v++){
				var prod=$("produkt_"+v).value;
				if(prod!=""){
					prod=parseInt(prod,10);
					var amount=parseInt($("anzahl_"+v).value,10);
					var price=parseFloat($("preis_"+v).value.replace(regDelimDeci,"."),10);
					currContract[prod]=[amount,price];
					sum += amount*price;
				}
			}
			$("preis_total").innerHTML=texte["total"]+":<br>"+moneyFormat(sum);
		}
		unsafeWindow._addproduct=unsafeWindow.addproduct;
		unsafeWindow.addproduct = function addproduct(){
			unsafeWindow._addproduct();
			calcCurrContract();
		};
		unsafeWindow._editproduct=unsafeWindow.editproduct;
		unsafeWindow.editproduct = function editproduct(pl){
			unsafeWindow._editproduct(pl);
			calcCurrContract();
		};
		unsafeWindow._deleteproduct=unsafeWindow.deleteproduct;
		unsafeWindow.deleteproduct = function deleteproduct(pl){
			unsafeWindow._deleteproduct(pl);
			calcCurrContract();
		};

		// Filling data
		unsafeWindow.fillContract = function(player,data){
			// player: string or null
			// data: {prodId:[amount,single-price],...}
			// set receiver
			if(player){ $("to_player").value=player; }
			// clear
			for(var v=7;v>=0;v--){
				if($("produkt_"+v).value!=""){
					unsafeWindow.deleteproduct(v);
				}
			}
			// fill
			for(var v in data){
				if(!data.hasOwnProperty(v)){ continue; }
				if(prodBestand[v]>0){
					$("neu_anzahl").value=Math.min(prodBestand[v],data[v][0]);
					$("neu_preis").value=numberFormat(data[v][1],2,delimDeci,"");
					$("neu_produkt").value=v;
					$("neu_maxanzahl").value=prodBestand[v];
					var cand=document.getElementsByClassName("v"+v);
					var obj=null;
					for(var w=0;w<cand.length;w++){
						if(cand[w].id.match(/img_\d+/)){
							obj=cand[w];
						}
					}
					if(obj){
						$("neu_objname").value=obj.id;
						unsafeWindow.addproduct();
					}
				}
			}
		};
		var newinput=$("to_player");
		if (newinput){
			if(pagedata["to"]){
				newinput.value=pagedata["to"];
			}else if(newinput.value==""){
				newinput.value=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_lastContractTo","");
			}
		}
		if(pagedata["fillContract"]){
			unsafeWindow.fillContract(null,pagedata["fillContract"]);
		}

		// last message panel
		var newdiv=createElement("div",{"id":"lastMessage","style":"position:absolute;top:110px;right:-403px;width:413px;height:134px;padding:5px;background-color:#b8a789;border:2px solid black;-moz-border-radius:10px 0px 0px 10px;z-index:101;z-index:15;color:black;overflow:auto;"},ALL,GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_letzte",""));
		newdiv.addEventListener("mouseover",function(){this.style.right="0";},false);
		newdiv.addEventListener("mouseout",function(){this.style.right="-403px";},false);

		// set remembered price
		$("addproduct").addEventListener("DOMAttrModified",function(event){
			if((this==event.target)&&(this.style.display!="none")){
				var cell=$("neu_preis");
				if(!cell.value){
					var new_produkt=parseInt($("neu_produkt").value,10);
					if(contractPrices[new_produkt]){
						cell.value=numberFormat(contractPrices[new_produkt],2,delimDeci,"");
						keyup(cell);
					}else if(gut[new_produkt]){
						cell.value=numberFormat(gut[new_produkt],2,delimDeci,"");
						keyup(cell);
					}else if(!isNaN(NPC[new_produkt])){
						cell.value=numberFormat(NPC[new_produkt],2,delimDeci,"");
						keyup(cell);
					}
				}
				cell=null;
			}
		},false);

		// save contract
		var contractSave=new Array(); // [target user,{"prod":[amount,price],...}]
		try{ contractSave=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_contractSave","[]")); }catch(err){}
		var top=345;
		var right=120;
		for(var v=0;v<10;v++){
			right -= 20;
			if(right<=0){
				top += 20;
				right=100;
			}
			newdiv=createElement("div",{"id":"contractSave"+v,"class":"link hoverBgLightblue","style":"position:absolute;top:"+top+"px;right:"+right+"px;width:13px;padding:1px;color:black;text-align:center;border:2px inset black;-moz-border-radius:10px;"+(contractSave[v]?"background-color:#bb7;":"")},ALL,v+1);
			newdiv.addEventListener("mouseover",function(event){
				var currNr=parseInt(this.id.replace(/contractSave/,""),10);
				var str='<table class="white" cellspacing="0" cellpadding="0" style="width:100%;">';
				if(contractSave[currNr]){
					str += '<tr><td>'+texte["click"]+':&nbsp;</td><td>'+texte["laden"]+'</td></tr>';
 				}
				str += '<tr><td style="border-bottom:1px solid white;">'+texte["clickStrg"]+':&nbsp;</td><td style="border-bottom:1px solid white;">'+texte["speichern"]+'</td></tr>';
				str += '</table><table class="white" cellspacing="0" cellpadding="0" style="line-height:15px;width:100%;">';
				if(contractSave[currNr]){
					if(contractSave[currNr][0]!=""){
						str += '<tr><td colspan="3">&rarr;&nbsp;'+contractSave[currNr][0]+'</td></tr>';
					}
					for(var v in contractSave[currNr][1]){
						if(!contractSave[currNr][1].hasOwnProperty(v)){ continue; }
						str += '<tr><td style="text-align:right;padding-right:3px;">'+numberFormat(contractSave[currNr][1][v][0])+'</td><td style="padding-right:3px;">'+produktPic(v,createElement("div")).parentNode.innerHTML+prodName[v]+'</td><td style="text-align:right;">'+moneyFormat(contractSave[currNr][1][v][1])+'</td></tr>';
					}
				}else{
					str += '<tr><td colspan="3">---</td></tr>';
				}
				str += '</table>';
				showToolTip(event,str);
			},false);
			newdiv.addEventListener("click",function(event){
				var currNr=parseInt(this.id.replace(/contractSave/,""),10);
				if(event.ctrlKey){
					// save this contract
					contractSave[currNr]=[$("to_player").value,currContract];
					if((contractSave[currNr][0]=="")&&(contractSave[currNr][1].isEmpty())){
						delete contractSave[currNr];
						this.style.backgroundColor="";
					}else{
						this.style.backgroundColor="#bb7";
					}
					GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_contractSave",implode(contractSave));
					adjustToolTip(this);
				}else{
					// load contract
					if(contractSave[currNr]){
						unsafeWindow.fillContract(contractSave[currNr][0]==""?null:contractSave[currNr][0],contractSave[currNr][1]);
					}
				}
			},false);
		}
		newdiv=null;newinput=null;newtr=null;newtd=null;candtr=null;candinput=null;
		raiseEventTop("gameWindowContractNew");
	}
}

function do_vertraege_overview(){
	//GM_log("do_vertraege_overview");
	var pagedata=explode(GM_getValue(LNG+"_"+SERVER+"_pagedataVertraegeOverview","{}"));
	GM_setValue(LNG+"_"+SERVER+"_pagedataVertraegeOverview","{}");
	getData();
	var vertraegeIn=new Object();
	var vertraegeOut=new Object();
	// vertraegeInX[id]=[time,person,[[prod,amount,single price],...]]
	var valContractLogAmount=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valContractLogAmount",200);

	var save=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeIn","");
	if (save.match(/~\d+~/)){ //conversion since 18.12.
		try{
			var arr=save.split("|");
			var c=-1;
			for(var v=0;v<arr.length;v++){ if (c<100){
				var help=arr[v].split("~");
				c++;
				vertraegeIn[help[0]]=new Array();
				vertraegeIn[help[0]][0]=parseInt(help[1],10); //time
				vertraegeIn[help[0]][1]=help[2]; //person
				vertraegeIn[help[0]][2]=new Array(); //[prod,amount,price]
				for(var w=0;3*w+5<help.length;w++){
					if((!help[3*w+3].match(/NaN/))&&(!help[3*w+3].match(/function/))){
						vertraegeIn[help[0]][2].push([prodId[help[3*w+4]],parseInt(help[3*w+3],10),parseFloat(help[3*w+5],10)]);
					}
				}
			}}
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeIn",implode(vertraegeIn));
		} catch(err){}
	}
	var save=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeOut","");
	if (save.match(/~\d+~/)){ //conversion since 18.12.
		try{
			var arr=save.split("|");
			var c=-1;
			for(var v=0;v<arr.length;v++){ if (c<100){
				var help=arr[v].split("~");
				c++;
				vertraegeOut[c]= new Array();
				vertraegeOut[c][0]=parseInt(help[0],10);
				vertraegeOut[c][1]=help[1];
				vertraegeOut[c][2]=new Array();
				for(var w=0;3*w+4<help.length;w++){
					if((!help[3*w+2].match(/NaN/))&&(!help[3*w+2].match(/function/))){
						vertraegeOut[c][2].push([prodId[help[3*w+3]],parseInt(help[3*w+2],10),parseFloat(help[3*w+4],10)]);
					}
				}
			}}
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeOut",implode(vertraegeOut));
		} catch(err){}
	}
	save=null;

	try{ vertraegeIn=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeIn","{}")); }catch(err){}
	try{ vertraegeOut=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeOut","{}")); }catch(err){}

	var candtable=document.getElementsByTagName("table");
	candtable[1].parentNode.style.height="310px";
	var candtd=candtable[0].getElementsByTagName("td");
	if (pagedata["contractview"]){
		candtd[1].bgColor="";
		candtd[2].bgColor="lightblue";
		buildAlteVertraege("In");
	}else{
		candtd[1].bgColor="lightblue";
		var candtr=candtable[1].getElementsByTagName("tr");
		var canda;
		var sumTotalOut=0;
		for(var v=0;v<candtr.length;v++){
			candtd=candtr[v].getElementsByTagName("td");
			canda=candtr[v].getElementsByTagName("a");
			if (canda[0]){
				var help=/'(\d+)',%20'(.*?)'%20/.exec(canda[0].href);
				if (help[2] == "in"){
					if(LNG=="se"){
						candtd[3].innerHTML=candtd[3].innerHTML.replace(/\.(\d\d)&/,",$1&");
					}
					if (vertraegeIn[help[1]]){
						vertraegeIn[help[1]][0]=getFormattedTime(candtd[0].innerHTML);
					}else{
						vertraegeIn[help[1]]= new Array();
						vertraegeIn[help[1]][0]=getFormattedTime(candtd[0].innerHTML);
						vertraegeIn[help[1]][1]=/(.*?)&nbsp;/.exec(candtd[2].innerHTML+"&nbsp;")[1];

						var help2=candtd[1].firstElementChild.innerHTML.replace(' style=""',"").replace("<b>","").replace("</b>","");
						var preis=parseFloat(candtd[3].innerHTML.replace(/&nbsp;/g+texte["waehrung"],"").replace(regDelimThou,"").replace(regDelimDeci,"."),10);
						if (help2.search(",")==-1){
							var help3=help2.split(" x ");
							vertraegeIn[help[1]][2]=[[prodId[help3[1]],parseInt(help3[0],10),preis/parseInt(help3[0],10)]];
						}else{
							vertraegeIn[help[1]][2]=preis;
						}
					}
				}else if(help[2] == "out"){
					if(LNG=="se"){
						candtd[3].innerHTML=candtd[3].innerHTML.replace(/\.(\d\d)&/,",$1&");
					}
					sumTotalOut += parseFloat(candtd[3].innerHTML.replace(regDelimThou,"").replace(regDelimDeci),10);
				}
			}
		}
		createElement("td",{"colspan":"3"},candtable[1]);
		createElement("td",{"style":"border-top:1px solid black;text-align:right;"},candtable[1],moneyFormatInt(sumTotalOut));
		vertraegeIn.sortObj(sortObjFunctions["int"],true);
		var c=0;
		for(var v in vertraegeIn){
			if(!vertraegeIn.hasOwnProperty(v)){ continue; }
			if(++c>valContractLogAmount){
				delete vertraegeIn[v];
			}
		}
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeIn",implode(vertraegeIn));

		candtr=null;canda=null;
	}
	candtable=null;candtd=null;

	function buildAlteVertraege(mode){
		//GM_log("buildAlteVertraege:"+mode);
		if (mode=="In"){ vertraege=vertraegeIn; }
		else{ vertraege=vertraegeOut; }
		var container=document.getElementsByTagName("table")[1].parentNode;
		container.innerHTML="";
		var newtable=createElement("table",{"style":"width:100%;margin-bottom:3px;"},container);
		var newtr=createElement("tr",{},newtable);
		var newtd=createElement("td",{"class":"link tnormal hoverBgLightbrown","align":"center","style":"color:black;font-weight:bold;"},newtr,texte["erhalteneVertraege"]);
		if (mode=="In"){ newtd.bgColor="lightblue"; }
		newtd.addEventListener("click",function(){buildAlteVertraege("In");},false);
		newtd=createElement("td",{"class":"link tnormal hoverBgLightbrown","align":"center","style":"color:black;font-weight:bold;"},newtr,texte["gesendeteVertraege"]);
		if (mode=="Out"){ newtd.bgColor="lightblue"; }
		newtd.addEventListener("click",function(){buildAlteVertraege("Out");},false);

		newdiv=createElement("div",{"style":"width:100%;height:280px;overflow-x:hidden;overflow-y:scroll;"},container);
		newtable=createElement("table",{"style":"width:100%;","cellspacing":"0"},newdiv);
		var newtablehead=createElement("thead",{},newtable);
		var newtablebody=createElement("tbody",{"class":"hoverRowBgLightbrown","style":"height:290px;overflow-x:hidden;overflow-y:scroll;"},newtable);
		var newtd1,newtd2,newimg;
		var help=((mode=="Out")&&($top("multiframe")));
		for(var v in vertraege){
			if(!vertraege.hasOwnProperty(v)){ continue; }
			newtr=createElement("tr",{"nr":v},newtablebody);
			newtd=createElement("td",{},newtr);
			if(help){
				newtd.setAttribute("class","link borderTop");
				newtd.addEventListener("mouseover",function(event){ showToolTip(event,texte["vertragNochmalSchicken"]); },false);
				newtd.addEventListener("click",function(){
					var help=vertraege[this.parentNode.getAttribute("nr")];
					var thisdata=new Object();
					thisdata["to"]=help[1];
					thisdata["fillContract"]=new Object();
					for(var v=0;v<help[2].length;v++){
						thisdata["fillContract"][help[2][v][0]]=[help[2][v][1],help[2][v][2]];
					}
					GM_setValue(LNG+"_"+SERVER+"_pagedataVertraegeNew",implode(thisdata));
					location.href="http://s"+SERVER+"."+GAMEPAGES[LNG]+"/vertraege/new.php";
				},false);
			}else{
				newtd.setAttribute("class","borderTop");
			}
			if (vertraege[v][0]>0){
				newtd.innerHTML=getFormattedDateStr(vertraege[v][0])+",<br>"+getDaytimeStr(vertraege[v][0],1)+"&nbsp;"+texte["uhr"];
			}else{
				newtd.innerHTML="---";
			}

			newtd=createElement("td",{"class":"borderTop"},newtr,vertraege[v][1]);
			newdiv=createElement("div",{},newtd);
			igm(vertraege[v][1],newdiv);
			stats(vertraege[v][1],newdiv);
			vertrag(vertraege[v][1],newdiv);

			newtd=createElement("td",{"class":"borderTop"},newtr);
			newtd1=createElement("td",{"class":"borderTop","style":"text-align:right;"},newtr);
			newtd2=createElement("td",{"class":"borderTop","style":"text-align:right;"},newtr);
			if(typeof vertraege[v][2]=="object"){
				var sum=0;
				for(var w=0;w<vertraege[v][2].length;w++){
					newdiv=createElement("div",{"class":"link hoverBgLightblue","style":"line-height:16px;white-space:nowrap;","prod":vertraege[v][2][w][0]},newtd);
					newdiv.addEventListener("mouseover",function(event){ showGoToMarketToolTip(event,this.getAttribute("prod")); },false);
					newdiv.addEventListener("click",function(){showMarket(this.getAttribute("prod"));},false);
					produktPic(vertraege[v][2][w][0],newdiv);
					createElement("span",{},newdiv,numberFormat(vertraege[v][2][w][1],0) +"&nbsp;"+ prodName[vertraege[v][2][w][0]]);
					createElement("div",{"style":"line-height:16px;white-space:nowrap;"},newtd1,moneyFormat(vertraege[v][2][w][2]));
					createElement("div",{"style":"line-height:16px;white-space:nowrap;"},newtd2,moneyFormatInt(vertraege[v][2][w][1]*vertraege[v][2][w][2]));
					sum += vertraege[v][2][w][1]*vertraege[v][2][w][2];
				}
				if (vertraege[v][2].length>1){
					createElement("div",{},newtd,"&nbsp;");
					createElement("div",{},newtd1,"&nbsp;");
					createElement("div",{"style":"border-top:1px solid black;text-align:right;"},newtd2,moneyFormatInt(sum));
				}
			}else{
				createElement("div",{"style":"line-height:16px;white-space:nowrap;"},newtd2,moneyFormatInt(vertraege[v][2]));
			}
			newtd=createElement("td",{"class":"borderTop","style":"text-align:right;padding-right:20px;"},newtr);
			newimg=createElement("img",{"objId":v,"src":GFX+"popin/contracts/anullieren.gif","class":"link2","style":"width:16px;height:16px;"},newtd);
			newimg.addEventListener("mouseover",function(event){ showToolTip(event,texte["loeschen"]); },false);
			newimg.addEventListener("click",function(){
				var objId=this.getAttribute("objId");
				alert2(texte["loeschen"]+"?",texte["yes"],texte["no"],function(){
					if (mode=="In"){
						delete vertraegeIn[objId];
						GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeIn",implode(vertraegeIn));
					}else{
						delete vertraegeOut[objId];
						GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeOut",implode(vertraegeOut));
					}
					buildAlteVertraege(mode);
				});
			},false);
		}
		container=null;newtable=null;newtablehead=null;newtablebody=null;newtr=null;newtd=null;newtd1=null;newtd2=null;newimg=null;newdiv=null;
	}
}

function do_vertraege_show(){
	var spanError=ALL.getElementsByClassName("error");
	if (spanError.length>0){
		spanError[0].parentNode.style.height="25px";
		spanError[0].parentNode.style.top="262px";
	}
	spanError=null;

	getData();
	if (pageZusatz["typ"]=="in"){
		var vertraegeIn=new Object();
		try{ vertraegeIn=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeIn","[]")); }catch(err){}
	}
	var candtable=document.getElementsByTagName("table");
	var candtr=candtable[1].getElementsByTagName("tr");
	var candtd;
	candtable[1].previousElementSibling.appendChild(candtable[1]);
	candtable[1].setAttribute("style","height:250px;margin-left:auto;margin-right:auto;"); //centering the table
	removeElement(candtable[1].getElementsByTagName("colgroup")[0]);
	candtable[1].firstElementChild.insertBefore(createElement("tr",{"style":"height: 20px;"}),candtable[1].firstElementChild.firstElementChild);
	createElement("td",{"colspan":"3","style":"border-top:1px solid #aaa;padding-right:5px;padding-left:5px;"},candtr[0]);
	createElement("td",{"colspan":"2","style":"border-top:1px solid #aaa;border-left:1px dashed black;padding-right:5px;padding-left:5px;"},candtr[0],texte["preis"]);
	createElement("td",{"style":"border-top:1px solid #aaa;border-left:1px dashed black;padding-right:5px;padding-left:5px;"},candtr[0]);
	createElement("td",{"colspan":"2","style":"border-top:1px solid #aaa;border-left:1px dashed black;padding-right:5px;padding-left:5px;"},candtr[0],texte["marktpreis"]);
	if (pageZusatz["typ"]=="in"){
		if(!vertraegeIn[pageZusatz["v"]]){
			vertraegeIn[pageZusatz["v"]]=new Array();
			vertraegeIn[pageZusatz["v"]][0]=now;
			vertraegeIn[pageZusatz["v"]][1]=/\s*(.*)&nbsp;/.exec(candtable[1].parentNode.innerHTML)[1];
		}
		vertraegeIn[pageZusatz["v"]][2]=new Array();
	}
	var sum=0;
	var borderStr;
	for(var w=1;w<candtr.length-2;w++){
		candtr[w].setAttribute("class","hoverBgLightbrown");
		candtd=candtr[w].getElementsByTagName("td");
		if(LNG=="se"){ candtd[4].innerHTML=candtd[4].innerHTML.replace(/\.(\d\d)\&/,",$1&"); }
		var thisData=[prodId[candtd[2].innerHTML],parseInt(candtd[0].innerHTML,10),parseFloat(candtd[4].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."),10)];
		if (pageZusatz["typ"]=="in"){
			vertraegeIn[pageZusatz["v"]][2][w-1]=thisData;
		}
		borderStr="border-bottom:"+candtd[0].style.borderBottom+";border-top:"+candtd[0].style.borderTop+";";
		candtd[0].innerHTML=numberFormat(thisData[1]);
		candtd[0].style.paddingRight="5px";
		candtd[1].innerHTML="";
		produktPic(thisData[0],candtd[1]);
		removeElement(candtd[3]);
		candtd[2].style.paddingRight="5px";
		candtd[3].style.borderLeft="1px dashed black";
		candtd[3].style.paddingLeft="5px";
		candtd[3].style.paddingRight="5px";
		candtd[3].innerHTML=numberFormat(thisData[2],2)+"&nbsp;:";
		createElement("td",{"style":borderStr+"padding-right:5px;padding-left:5px;text-align:right;"},candtr[w],numberFormat(thisData[1]*thisData[2],2));
		createElement("td",{"style":borderStr+"border-left:1px dashed black;padding-right:5px;padding-left:5px;text-align:right;"},candtr[w],numberFormat(100*thisData[2]/gut[thisData[0]],1)+"%");
		createElement("td",{"style":borderStr+"border-left:1px dashed black;padding-right:5px;padding-left:5px;text-align:right;"},candtr[w],numberFormat(gut[thisData[0]],2)+"&nbsp;:");
		var help=thisData[1]*gut[thisData[0]];
		createElement("td",{"style":borderStr+"padding-right:5px;padding-left:5px;text-align:right;"},candtr[w],numberFormat(help,2));
		sum += help;
	}
	candtd=candtr[candtr.length-2].getElementsByTagName("td");
	//removeElement(candtd[0]);
	candtd[0].style.paddingRight="5px";
	candtd[0].align="left";
	var preis=parseFloat(candtd[1].firstElementChild.innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."),10);
	candtd[1].firstElementChild.innerHTML=numberFormat(preis,2);
	candtd[1].style.paddingRight="5px";
	createElement("td",{"style":"border-left:1px dashed black;padding-right:5px;padding-left:5px;text-align:right;"},candtr[w],numberFormat(100*preis/sum,1)+"%");
	createElement("td",{"style":"border-left:1px dashed black;padding-right:5px;padding-left:5px;text-align:right;","colspan":"2"},candtr[w],numberFormat(sum,2));

	if (pageZusatz["typ"]=="in"){
		vertraegeIn.sortObj(sortObjFunctions["int"],true);
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_vertraegeIn",implode(vertraegeIn));
	}
	candtable=null;canddiv=null;candtr=null;candtd=null;
}

//***********************************************************************************************************

function do_hilfe(){
	var canddiv=new Array();
	for(var v=0;v<ALL.childElementCount;v++){ if(ALL.children[v].id=="") canddiv.push(ALL.children[v]); }
	canddiv[1].id="helpmenu";
	canddiv[1].style.left="0";
	canddiv[1].style.width="155px";
	canddiv[1].style.overflowX="hidden";
	canddiv[1].style.overflowY="auto";
	canddiv[2].id="helpbody";
	canddiv=$("helpmenu").getElementsByTagName("div");
	for(var v=0;v<canddiv.length;v++){ if(canddiv[v].getAttribute("class")=="list_header"){ break; }}
	var newdiv=createElement("div",{"id":"helpmenuLinks","style":"margin-bottom:10px;"});
	$("helpmenu").insertBefore(newdiv,canddiv[v]);
	newdiv=createElement("div",{},newdiv);
	var newa=createElement("a",{"class":"list_header","href":"#"},newdiv,texte["berater"]);
	newa.addEventListener("click",function(){
		var cell=$("helpbody");
		cell.innerHTML="";
		createElement("div",{"class":"tnormal"},cell,"<b>"+texte["berater"]+"</b><br>");
		for(var w in texte["hilfe"]){
			if(!texte["hilfe"].hasOwnProperty(w)){ continue; }
			if (Number(w) != w) createElement("div",{"class":"tmenu"},cell,"<b>"+w+"</b>");
			createElement("p",{"class":"tmenu"},cell,texte["hilfe"][w]);
		}
	},false);
	if (GM_getValue("tutorial",0)==0){
		click(newa);
		GM_setValue("tutorial",1);
	}

	switch(pageZusatz["item"]){
	case "18":{ // Questlist
		getData();
		removeElement(document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0]);
		GM_addStyle(".divCurrentQuest{background-color:lightblue!important;}");
		$("questinfos").style.display="block";
		var questNr=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_quest",1);
	/*
	// QUESTS[nr]=[[[questproduct-id1,amount1],...],waitdays,points,more|undefined]
	// Quest nr 115 (only 1 product) expanded by a fake (0 bonbons77)
	// more: [keyNr,...]
	// 0,money
	// 1,id of gained product
	// 2,number of accessed rack
	// 3,number of accessed farm
	// 4,id of product,minutes this product grows faster
	// 5:additional farmi ('<img src=GFX+"adbonus.gif" style="border:0;height:15px;">')

		var normal_quest=new Array();
		var cand, canddiv, qnr=0;
		for(var v=0;v<$("questinfos").childElementCount;v++){
			try{
				cand = $("questinfos").children[v];
				qnr = parseInt(cand.children[0].innerHTML.replace(".",""),10);
				if(!normal_quest[qnr]){ normal_quest[qnr]= new Array();	}
				if(!normal_quest[qnr][0]){ normal_quest[qnr][0] = new Array(); }
				if(!normal_quest[qnr][3]){ normal_quest[qnr][3] = new Array(); }

				canddiv=cand.children[1];//.getElementsByTagName("div");
				normal_quest[qnr][0][0] = [parseInt(canddiv.children[0].getAttribute("class").replace("kp",""),10),parseInt(canddiv.children[1].innerHTML.replace(/[x*|&nbsp;|\.]/gi,""),10)];
				if(canddiv.children[4]){
					normal_quest[qnr][0][1] = [parseInt(canddiv.children[4].getAttribute("class").replace("kp",""),10),parseInt(canddiv.children[5].innerHTML.replace(/[x*|&nbsp;|\.]/gi,""),10)];
				}else{
					normal_quest[qnr][0][1] = [normal_quest[qnr][0][0][0],0];
				}
				normal_quest[qnr][1] = (v<100?1:2);

				for(var k=0;k<cand.children[2].childElementCount;k++){
					canddiv = cand.children[2].children[k];
					if(canddiv.innerHTML.indexOf("points.gif")>=0){
						normal_quest[qnr][2] = parseInt(canddiv.innerHTML.replace(/.*&nbsp;/,"").replace(/\./g,""),10);
					}else if(canddiv.innerHTML.indexOf("money.gif")>=0){
						//normal_quest[qnr][3].push([0,parseInt(canddiv.innerHTML.replace(/.*&nbsp;/,"").replace(/\./g,""),10)]);
						normal_quest[qnr][3]=[0,parseInt(canddiv.innerHTML.replace(/.*&nbsp;/,"").replace(/\./g,""),10)];
					}else if(canddiv.innerHTML.indexOf("adbonus.gif")>=0){
						//normal_quest[qnr][3].push([5,1]);
						normal_quest[qnr][3]=[5,1];
					}else if(canddiv.className.indexOf("kp")>=0 && cand.children[2].children[k+1].innerHTML.toLowerCase().indexOf("minuten")>=0){  //change to language where reading
						//normal_quest[qnr][3].push([4,parseInt(canddiv.className.replace("kp",""),10),parseInt(cand.children[2].children[k+1].innerHTML.replace(/[A-z ] /,""),10)]);
						normal_quest[qnr][3]=[4,parseInt(canddiv.className.replace("kp",""),10),parseInt(cand.children[2].children[k+1].innerHTML.replace(/[A-z ] /,""),10)];
						k++;
					}else if(canddiv.innerHTML.toLowerCase().indexOf("boerderij")>=0){ //change to language where reading
						//normal_quest[qnr][3].push([3,parseInt(canddiv.innerHTML.replace(/\.[A-z ] /,""),10)]);
						normal_quest[qnr][3]=[3,parseInt(canddiv.innerHTML.replace(/\.[A-z ] /,""),10)];
					}else if(canddiv.innerHTML.toLowerCase().indexOf("voorraadkast")>=0){  //change to language where reading
						//normal_quest[qnr][3].push([2,parseInt(canddiv.innerHTML.replace(/\.[A-z ] /,""),10)]);
						normal_quest[qnr][3]=[2,parseInt(canddiv.innerHTML.replace(/\.[A-z ] /,""),10)];
					}else if(canddiv.className.indexOf("kp")>=0){
						//normal_quest[qnr][3].push([1,parseInt(canddiv.className.replace("kp",""),10)]);
						normal_quest[qnr][3]=[1,parseInt(canddiv.className.replace("kp",""),10)];
					}
					//if (qnr==51){GM_log("qnr:"+qnr+" normal_quest:"+implode(normal_quest[qnr]));}
				}
				if(normal_quest[qnr][3].length==0){ delete normal_quest[qnr][3];}
				//if (qnr==51){GM_log("qnr:"+qnr+" cand:"+canddiv.innerHTML+" "+canddiv.className);}
			}catch(err){GM_log("ERROR at quest nr:"+qnr+" k:"+k+"\n"+err+"\n"+cand.children[2].innerHTML);}
		}
		GM_log("Questlist: "+implode(normal_quest));
		*/

		var cand,help;
		// initial prepare of the table
		for(var v=0;v<$("questinfos").childElementCount;v++){
			cand=$("questinfos").children[v];
			cand.addEventListener("click",function(){
				questNr=parseInt(this.getElementsByTagName("div")[0].innerHTML,10);
				GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_quest",questNr);
				do_hilfe_questlist();
			},false);
			cand=cand.children[1].getElementsByTagName("div");

			help=cand[1].innerHTML.replace("x","");
			cand[1].setAttribute("value",parseInt(help.replace(/&nbsp;/g,""),10));
			cand[1].innerHTML=help.replace(/(\d{3,})(\d{3})/,"$1k").replace(/(\d{2,})000/,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2");
			createElement("span",{"style":"color:red;"},cand[2]);

			if(cand[5]){
				help=cand[5].innerHTML.replace("x","");
				cand[5].setAttribute("value",parseInt(help.replace(/&nbsp;/g,""),10));
				cand[5].innerHTML=help.replace(/(\d{3,})(\d{3})/,"$1k").replace(/(\d{2,})000/,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2");
				createElement("span",{"style":"color:red;"},cand[6]);
			}
		}

		createElement("div",{"id":"questcalculation","style":"position:fixed;top:7px;right:3px;width:80px;"},$("helpbody"));
		var newsel=createElement("select",{"id":"questselect","style":"position:absolute;top:7px;left:0;width:50px;height:18px;"},$("questcalculation"));
		createElement("div",{"id":"queststocks","style":"position:absolute;top:28px;left:0;width:80px;height:220px;border:1px solid #6c441e;overflow-y:auto;overflow-x:hidden;"},$("questcalculation"));
		var newinp=createElement("input",{"id":"questvsrack","type":"checkbox","class":"link","checked":true,"style":"position:absolute;top:250px;right:3px;"},$("questcalculation"));
		newdiv.addEventListener("mouseover",function(event){ showToolTip(event,texte["zeigeFehlendeProdukte"]); },false);
		newinp.addEventListener("click",function(){change($("questselect"));},false);

		newsel.addEventListener("change",function(){
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_helpQuestinfoCalcTo",this.value);
			var cell=$("queststocks");
			cell.innerHTML="";
			var prd=new Object();
			var canddiv,help=null;
			for(var v=questNr-1;v<this.value;v++){
				canddiv=$("questinfos").children[v].children[1].getElementsByTagName("div");
				help=canddiv[0].getAttribute("class").replace("kp","");
				if (!prd[help]) prd[help]=0;
				prd[help] += parseInt(canddiv[1].getAttribute("value"),10);
				if(canddiv[4]){
					help=canddiv[4].getAttribute("class").replace("kp","");
					if (!prd[help]) prd[help] =0;
					prd[help] += parseInt(canddiv[5].getAttribute("value"),10);
				}
			}
			var counter=0;
			for(var v=0;v<prodNameSort.length;v++){
				//if ($("questvsrack").checked && (prodBestand[v] > prd[v])) continue;
				if(prd[v]){
					var newdiv= createElement("div",{"style":"display:inline-block;width:100%;background-color:"+(prodBlock[v]?"red":((counter%2)?"#ad9e7d;":"#a59574;"))},cell);
					produktPic(v,newdiv);
					if($("questvsrack").checked){
						if(prodBestand[v] < prd[v]){
							createElement("span",{"style":"color:"+(prodBlock[v]?"black":"red")+ ";"},newdiv,"-"+numberFormat(prd[v]-prodBestand[v]));
						}else{
							createElement("span",{"style":"color:black;"},newdiv,"+"+numberFormat(prodBestand[v]-prd[v]));
						}
					}else{
						createElement("span",{"style":"color:black;"},newdiv,numberFormat(prd[v]));
					}
					counter++;
				}
			}
			cell=null;newdiv=null;v=null;prd=null;counter=null;canddiv=null;help=null;
		},false);

		function do_hilfe_questlist(){
			var cell,cand;
			for(var v=0;v<questNr-1;v++){
				cell=$("questinfos").children[v];
				if(cell.style.opacity!="0.5"){ cell.style.opacity="0.5"; }
				if(cell.getAttribute("class")!="hoverBgCc9"){ cell.setAttribute("class","hoverBgCc9"); }
				cand=cell.getElementsByTagName("div");
				if(cand[1].style.backgroundColor!=""){ cand[1].style.backgroundColor=""; }
				if(cand[2].style.backgroundColor!=""){ cand[2].style.backgroundColor=""; }
				if(cand[5].style.backgroundColor!=""){ cand[5].style.backgroundColor=""; }
				if(cand[6].style.backgroundColor!=""){ cand[6].style.backgroundColor=""; }
			}

			if(questNr<=$("questinfos").childElementCount){
				var newsel=$("questselect");
				newsel.innerHTML="";
				var prodcounter=new Object();
				for(var v=questNr-1;v<$("questinfos").childElementCount;v++){
					createElement("option",{"value":v+1},newsel,v+1);
					cell=$("questinfos").children[v];
					if(cell.style.opacity!="1"){ cell.style.opacity="1"; }
					if(cell.getAttribute("class")!="hoverBgCc9"){ cell.setAttribute("class","hoverBgCc9"); }
					cand=cell.children[1].getElementsByTagName("div");

					help=cand[0].getAttribute("class").replace("kp","");
					if (!prodcounter[help]) prodcounter[help]=0;
					prodcounter[help] += parseInt(cand[1].getAttribute("value"),10);
					if(prodBlock[help]){
						cand[1].style.backgroundColor="red";
						cand[2].style.backgroundColor="red";
					}else if (prodBestand[help] < prodcounter[help]){
						cand[2].getElementsByTagName("span")[0].innerHTML="&nbsp;(" + numberFormat(prodcounter[help]-prodBestand[help]) + ")";
					}

					if(cand[4]){
						help=cand[4].getAttribute("class").replace("kp","");
						if (!prodcounter[help]) prodcounter[help]=0;
						prodcounter[help] += parseInt(cand[5].getAttribute("value"),10);
						if(prodBlock[help]){
							cand[5].style.backgroundColor="red";
							cand[6].style.backgroundColor="red";
						}else if (prodBestand[help] < prodcounter[help]){
							cand[6].getElementsByTagName("span")[0].innerHTML="&nbsp;(" + numberFormat(prodcounter[help]-prodBestand[help]) + ")";
						}
					}
				}

				$("questinfos").children[questNr-1].setAttribute("class","divCurrentQuest");
				document.getElementsByTagName("table")[0].parentNode.scrollTop=$("questinfos").children[questNr-1].offsetTop+$("helpbody").getElementsByTagName("table")[0].offsetTop;
				newsel.value=Math.max(questNr,Math.min($("questinfos").childElementCount,GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_helpQuestinfoCalcTo",10)));
				change(newsel);
				newsel=null;
			}else{
				document.getElementsByTagName("table")[0].parentNode.scrollTop=$("questinfos").lastChildElement.offsetTop+$("helpbody").getElementsByTagName("table")[0].offsetTop;
			}
			cell=null;
		}
		do_hilfe_questlist();

		newsel=null;prodcounter=null;newinp=null;
	break; }
	}

	newdiv=null;newa=null;canddiv=null;
}

//***********************************************************************************************************

function do_multiframe(){
	var cell=$top("infoPanel");
	if(cell&&(cell.style.display=="block")){ cell.style.zIndex="99"; }

	cell=$top("multiframe");
	if(cell){
		if(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valDrag",false)){ makeDraggable(ALL,true,true,"multiframe"); }
		cell.style.zIndex="101";
		cell.style.display="block";
		cell.style.visibility="visible";
	}
	cell=null;
}

//***********************************************************************************************************
// Dragging
var valMouseXY=["",0,0,0,0];
var dragPos=new Object();
var doDrag=new Object();
function makeDraggable(appendTo,doDragX,doDragY,dragObjId){
	if(typeof(doDragX)!="boolean") doDragX=true;
	if(typeof(doDragY)!="boolean") doDragY=true;
	if(typeof(dragObjId)!="string") dragObjId=appendTo.id;
	//GM_log("makeDraggable:"+appendTo+":"+doDragX+":"+doDragY+":"+dragObjId);
	doDrag[dragObjId]=[doDragX,doDragY];
	var help=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_dragPos_"+dragObjId,"");
	var dragObj=$top(dragObjId);
	if (help){
		dragPos[dragObjId]=help.split("|");
		if(doDragX) dragObj.style.left=dragPos[dragObjId][0]+"px";
		if(doDragY) dragObj.style.top=dragPos[dragObjId][1]+"px";
		dragObj.style.margin="";
		dragObj.style.marginLeft="";
		dragObj.style.marginTop="";
	}else{
		x=parseInt(dragObj.style.left+"0",10)+parseInt(dragObj.style.marginLeft+"0",10);
		y=parseInt(dragObj.style.top+"0",10)+parseInt(dragObj.style.marginTop+"0",10);
		if(doDragX) dragObj.style.left=x+"px";
		if(doDragY) dragObj.style.top=y+"px";
		dragObj.style.margin="";
		dragObj.style.marginLeft="";
		dragObj.style.marginTop="";
		dragPos[dragObjId]=[x,y];
	}

	var newdiv=createElement("div",{"id":dragObjId+"Drag","style":"cursor:move;position:absolute;top:0;left:0;width:10px;height:20px;background-color:blue;opacity:0.4;"},appendTo);
	newdiv.addEventListener("mousedown", function(event){
		valMouseXY=[this.id.replace("Drag",""),"x","y"];
		top.window.addEventListener("mousemove", mousemoveDrag ,false);
		top.window.addEventListener("mouseup", mouseupDrag ,false);
		var dragObj=$top(valMouseXY[0]);
		createElement("div",{"id":"divDragHelper","style":"position:absolute;display:block;z-index:200;height:"+dragObj.style.height+";width:"+dragObj.style.width+";top:"+dragObj.style.top+";left:"+dragObj.style.left+";background-color:blue;"},dragObj.parentNode);
		dragObj=null;
	},false);
	dragObj=null;newdiv=null;
}
mousemoveDrag = function(event){
//GM_log("mousemoveDrag");
	if (valMouseXY[0] != ""){
		if(valMouseXY[1]=="x") valMouseXY=[valMouseXY[0],event.pageX,event.pageY]; // init
		var dragObj=$top(valMouseXY[0]);
		var divDragHelper=$top("divDragHelper");
		if(doDrag[valMouseXY[0]][0]){
			dragObj.style.left=(parseInt(dragObj.style.left+"0",10) + (event.pageX - valMouseXY[1]))+'px';
			divDragHelper.style.left=dragObj.style.left;
		}
		if(doDrag[valMouseXY[0]][1]){
			dragObj.style.top= (parseInt(dragObj.style.top+"0",10) + (event.pageY - valMouseXY[2]))+'px';
			divDragHelper.style.top=dragObj.style.top;
		}
		valMouseXY=[valMouseXY[0],event.pageX,event.pageY];
		dragObj=null;divDragHelper=null;
	}
};
mouseupDrag = function(event){
//GM_log("mouseupDrag");
	top.window.removeEventListener("mousemove", mousemoveDrag ,false);
	if (valMouseXY[0] != ""){
		var dragObj=$top(valMouseXY[0]);
		dragPos[valMouseXY[0]]=[parseInt(dragObj.style.left+"0",10),parseInt(dragObj.style.top+"0",10)];
		GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_dragPos_"+valMouseXY[0],dragPos[valMouseXY[0]].join("|"));
		removeElement($top("divDragHelper"));
		dragObj=null;
	}
	valMouseXY=["",0,0,0,0];
	top.window.removeEventListener("mouseup", mouseupDrag ,false);
};

//***********************************************************************************************************

function do_login(){
	if(top!=self){ return; }
	// var loc=new RegExp(regUrl,"i").exec(location.href);
	// if(!loc){
	// 	// case should not happen
	// 	if(GAMEPAGES[LNG]){
	// 		window.setTimeout(function(){ location.href="http://www."+GAMEPAGES[LNG]+"/login.php?start=1"; },100);//auf login-seite leiten
	// 	}
	// }else{
		// if(loc[1].match(/forum/)||loc[1].match(/board/)){
		// 	// do not board
		// 	return false;
		// }else if(loc[1].match(/farmpedia/)){
		// 	// do not farmpedia
		// 	return false;
		// }else
		if(!location.pathname.match(/^\/login\.php/)){
			window.setTimeout(function(){ location.href="http://www."+GAMEPAGES[LNG]+"/login.php?start=1"; },100);//auf login-seite leiten
		}else if (!(pageZusatz["start"]&&(pageZusatz["start"]=="1"))){
			location.href="http://www."+GAMEPAGES[LNG]+"/login.php?start=1";
		}else{
			//paypal
			var newform=createElement("form",{"id":"paypalForm","action":"https://www.paypal.com/cgi-bin/webscr","method":"post","style":"position:absolute;top:30px;left:100px;"},ALL);
			createElement("input",{"type":"hidden","name":"cmd","value":"_donations"},newform);
			createElement("input",{"type":"hidden","name":"business","value":"jessica_holtkamp@web.de"},newform);
			createElement("input",{"type":"hidden","name":"lc","value":((LNG=="de")?"DE":"US")},newform);
			createElement("input",{"type":"hidden","name":"item_name","value":"MyFreeFarm Script"},newform);
			createElement("input",{"type":"hidden","name":"no_note","value":"0"},newform);
			createElement("input",{"type":"hidden","name":"currency_code","value":"EUR"},newform);
			createElement("input",{"type":"hidden","name":"bn","value":"PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest"},newform);
			createElement("input",{"type":"image","border":"0","src":"https://www.paypal.com/"+((LNG=="de")?"de_DE/DE":"en_US")+"/i/btn/btn_donate_LG.gif","name":"submit",alt:"PayPal"},newform);
			createElement("img",{"alt":"","border":"0","src":"https://www.paypal.com/en_US/i/scr/pixel.gif","width":"1","height":"1"},newform);
			newform=null;

			//login
			var logindata=new Array();
			try{ logindata=explode(GM_getValue("logindata","[]")); }catch(err){}
			var c=0;
			var servers=new Object(); // servers["language_serverNr"]=[logindataNr,logindataNr,...]
			for(var v=0;v<logindata.length;v++){ if(logindata[v][4]){
				c++;
				if(!servers[logindata[v][0]+"_"+logindata[v][1]]){ servers[logindata[v][0]+"_"+logindata[v][1]]=new Array(); }
				servers[logindata[v][0]+"_"+logindata[v][1]].push(v);
			}}

			$("login_container").querySelector("#submitlogin").addEventListener("click",function(){
				var currServer=$("login_container").getElementsByTagName("select")[0].value;
				var currUser=$("login_container").querySelector("#username").value.toLowerCase();
				GM_setValue(LNG+"_"+currServer+"_username",currUser);
			},false);

			function submit_login(accNr){
				if(logindata[accNr][0]==LNG){
					var login_container=$("login_container");
					login_container.getElementsByTagName("select")[0].value=logindata[accNr][1];
					login_container.querySelector("#username").value=logindata[accNr][2];
					login_container.querySelector("#password").value=logindata[accNr][3];
					login_container.querySelector("#submitlogin").click();
					login_container=null;
				}else{
					var help=explode(GM_getValue(logindata[accNr][0]+"_pagedataLogin","{}"));
					if(!(help["dologin"]&&(typeof help["dologin"]=="object"))){
						help["dologin"]=new Object();
					}
					help["dologin"][accNr]=true;
					GM_setValue(logindata[accNr][0]+"_pagedataLogin",implode(help));
					location.href="http://www."+GAMEPAGES[logindata[accNr][0]]+"/login.php?start=1";
				}
			}

			var currDoLogin=null;
			var currDoServer=null;
			var pagedata=explode(GM_getValue(LNG+"_pagedataLogin","{}"));
			GM_log("This is do_login@"+location.href+". pagedata:"+implode(pagedata));
			if(pagedata["doserver"]){
				if(typeof pagedata["doserver"]=="object"){
					for(var v in pagedata["doserver"]){
						if(!pagedata["doserver"].hasOwnProperty(v)){ continue; }
						currDoServer=v;
						delete pagedata["doserver"][v];
						break;
					}
					if(pagedata["doserver"].isEmpty()){ delete pagedata["doserver"]; }
				}else{
					delete pagedata["doserver"];
				}
			}else if(pagedata["dologin"]){
				if(typeof pagedata["dologin"]=="object"){
					for(var v in pagedata["dologin"]){
						if(!pagedata["dologin"].hasOwnProperty(v)){ continue; }
						currDoLogin=v;
						delete pagedata["dologin"][v];
						break;
					}
					if(pagedata["dologin"].isEmpty()){ delete pagedata["dologin"]; }
				}else{
					delete pagedata["dologin"];
				}
			}
			GM_setValue(LNG+"_pagedataLogin",implode(pagedata));

			if(currDoServer!=null){
				var help=GM_getValue(LNG+"_"+currDoServer+"_username","");
				for(var v=0;v<logindata.length;v++){
					if((logindata[v][4])&&(logindata[v][0]==LNG)&&(logindata[v][1]==currDoServer)&&(logindata[v][2].toLowerCase()==help)){
						currDoLogin=v;
						break;
					}
				}
				if(currDoLogin!=null){
					for(var v=0;v<logindata.length;v++){
						if((logindata[v][4])&&(logindata[v][0]==LNG)&&(logindata[v][1]==currDoServer)){
							currDoLogin=v;
							break;
						}
					}
				}
			}

			if(currDoLogin!=null){
				submit_login(currDoLogin);
			}else{
				var newdiv=createElement("div",{"style":"position:relative;top:-400px;left:300px;"},$("login_container"));
				var newbutton;
				GM_addStyle(".loginbutton{background-color:white;color:black;text-align:center;font-weight:bold;width:250px;line-height:20px;margin:3px;border:3px solid #6c441e;-moz-border-radius:10px;}");
				GM_addStyle(".loginbutton:hover{background-color:lightblue;}");
				for(var v=0;v<logindata.length;v++){ if(logindata[v][4]){
					newbutton=createElement("div",{"class":"link loginbutton","id":"autologin"+v},newdiv,texte["server"]+"&nbsp;"+logindata[v][1]+"."+logindata[v][0]+":&nbsp;"+logindata[v][2]);
					newbutton.addEventListener("click",function(){
						if($("divInfo")){ removeElement($("divInfo")); }
						submit_login(this.id.replace("autologin",""));
					},false);
				}}

				//Autologin
				var lastbusy=GM_getValue("loginbusy",0);
				if (isNaN(lastbusy) || now<lastbusy){ lastbusy=0; }
				if (GM_getValue("valAutoLogin",false) && (c>0) && (now-lastbusy>15)){
					GM_setValue("loginbusy",now);
					// if (c==1){
					// 	//Soloaccount
					// 	for(var v=0;v<logindata.length;v++){ if(logindata[v][4]){
					// 		submit_login(v);
					// 	}}
					// }else{
						//Multiaccount
						newdiv=createElement("div",{"id":"divInfo","style":"position:absolute;top:190px;left:455px;height:200px;width:280px;background-color:#842;border:4px solid black;z-index:200;"},$("main_container"),"<h1>"+texte["autologinChecking"].replace(/%1%/,"5")+"</h1>");
						newdiv.addEventListener("click",function(){
							removeElement(this);
						},false);

						for(var v in servers){
							if(!servers.hasOwnProperty(v)){ continue; }
							GM_setValue(v+"_sessionlost",true);
						}
						var counter=5;
						function autologinLoop(){
							counter -= 0.5;
							if(!$("divInfo")){ return false; }
							if(counter>0){
								$("divInfo").innerHTML="<h1>"+texte["autologinChecking"].replace(/%1%/,Math.ceil(counter))+"</h1>";
								var c=0;
								for(var v in servers){
									if(!servers.hasOwnProperty(v)){ continue; }
									if (GM_getValue(v+"_sessionlost",true)){
										c++;
									}else{
										var help=GM_getValue(v+"_username","");
										for(var w=0;w<servers[v].length;w++){
											$("autologin"+servers[v][w]).style.backgroundColor=(logindata[servers[v][w]][2].toLowerCase()==help?"#00ff00":"#008800");
										}
										//delete servers[v];
									}
								}
								if(c==0){ counter=0; }
								window.setTimeout(autologinLoop,500);
							}else{
								var c=null;
								for(var v in servers){
									if(!servers.hasOwnProperty(v)){ continue; }
									if (GM_getValue(v+"_sessionlost",true)){
										if (c==null){
											c=servers[v][0];
										}else{
											var help=explode(GM_getValue(logindata[servers[v][0]][0]+"_pagedataLogin","{}"));
											if(!(help["dologin"]&&(typeof help["dologin"]=="object"))){
												help["dologin"]=new Object();
											}
											help["dologin"][servers[v][0]]=true;
											GM_setValue(logindata[servers[v][0]][0]+"_pagedataLogin",implode(help));
											window.open("http://www."+GAMEPAGES[logindata[servers[v][0]][0]]+"/login.php?start=1");
										}
									}
								}

								if (c==null){
									// all logged in
									$("divInfo").innerHTML="<h1>"+texte["autologinAllOk"]+"</h1>";
									window.setTimeout(function(){
										for(var v in servers){
											if(!servers.hasOwnProperty(v)){ continue; }
											for(var w=0;w<servers[v].length;w++){
												$("autologin"+servers[v][w]).style.backgroundColor="white";
											}
											GM_setValue(v+"_sessionlost",true);
										}
										now=Math.floor((new Date()).getTime()/1000);
										GM_setValue("loginbusy",now);
										counter=5;
										autologinLoop();
									},5000);
								}else{
									GM_setValue("loginbusy",0);
									submit_login(c);
								}
							}
						}
						window.setTimeout(autologinLoop,500);
					// }
				}
				newdiv=null;newbutton=null;
			}
		}
	// }
}

//***********************************************************************************************************

window.addEventListener("load",function(){
unsafeWindow.GMberaterVersion=VERSION;
if(location.href==USO_URL){
		switch(compareVersions(/<p><b>Version:<\/b>(\d+\.\d+\.\d+)<\/p>/gi.exec($("root").innerHTML.replace(/\s/gi,""))[1],VERSION)){
		case -1:
		case 0:
			$("install_script").firstElementChild.innerHTML="Already installed";
			break;
		case 1:
			$("install_script").firstElementChild.innerHTML="Install newer version";
			break;
		}
	return false;
}
// Multilingual
if(top.window.wrappedJSObject.GMtexte==undefined){
	texte=new Object();
	if (location.hostname.match(GAMEPAGES["au"])){
		LNG="au";
		delimThou=",";
		regDelimThou=",";
		regDelimThou2="([\\d\\.])(\\d),(\\d{1,2}\\D)";
		regDelimThou3="(\\d),(,*)(\\d{1,2}\\D)";
		delimDeci=".";
		regDelimDeci="\\.";
		texte["waehrung"]="pD";
		texte["coins"]="Coins";
		texte["msgMarketsale"]="Marketplace";
		texte["msgMarketsaleContent"]="(.*) bought\\s*(\\d+)x (.*?) for\\s*<br>\\s*(.*?) pD from you\\.";
		texte["msgContractsale"]="A contract has been accepted";
		texte["msgContractsaleContent"]="(.*) has signed a contract of yours!<br><br>\\s*The following products have been sold:<br>([\\S\\s]*)\\s*<br>\\s*The amount of (.*?) pD has been credited to your account\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) would like to add you as a friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+for(\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["br"])){
		LNG="br";
		delimThou=",";
		regDelimThou=",";
		regDelimThou2="([\\d,])(\\d),(\\d{1,2}\\D)";
		regDelimThou3="(\\d),(,*)(\\d{1,2}\\D)";
		delimDeci=".";
		regDelimDeci="\\.";
		texte["waehrung"]="pD";
		texte["coins"]="Moedas";
		texte["msgMarketsale"]="Mercado";
		texte["msgMarketsaleContent"]="(.*) comprou a voc"+e_circumflex+" \\s*(\\d+)x (.*?) por\\s*<br>\\s*(.*?) pD\\.";
		texte["msgContractsale"]="Um contrato foi aceite";
		texte["msgContractsaleContent"]="(.*) assinou um contrato com voc"+e_circumflex+"!<br><br>\\s*Foram vendidos os seguintes produtos:<br>([\\S\\s]*)\\s*<br>\\s*Foram creditados (.*?) pD na sua conta\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) gostaria de adicionar voc"+e_circumflex+" como";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+para (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["bu"])){
		LNG="bu";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]=cyr_ka+cyr_De;
		texte["coins"]="К"+cyr_er+"е"+cyr_de+cyr_i+cyr_te+cyr_i;
		texte["msgMarketsale"]=cyr_Pe+"а"+cyr_ze+"а"+cyr_er;
		texte["msgMarketsaleContent"]="(.*) "+cyr_ze+"а"+cyr_ka+cyr_u+cyr_pe+cyr_i+"\\s*(\\d+)x (.*?) "+cyr_ze+cyr_a+"<br>\\s*(.*?) "+cyr_ka+cyr_De+" "+cyr_o+cyr_te+" "+cyr_te+cyr_ie+cyr_be+"\\.";
		texte["msgContractsale"]=cyr_Pe+cyr_er+cyr_i+"е"+cyr_te+" "+cyr_de+cyr_o+cyr_ghe+cyr_o+cyr_ve+cyr_o+cyr_er;
		texte["msgContractsaleContent"]="(.*) е "+cyr_pe+cyr_o+cyr_de+cyr_pe+cyr_i+"са"+cyr_el+" "+cyr_ve+"а"+cyr_sha+" "+cyr_de+cyr_o+cyr_ghe+cyr_o+cyr_ve+cyr_o+cyr_er+"!<br><br>\\s*С"+cyr_el+"е"+cyr_de+cyr_en+cyr_i+cyr_te+"е "+cyr_pe+cyr_er+cyr_o+cyr_de+cyr_u+cyr_ka+cyr_te+cyr_i+" "+cyr_es+cyr_a+" "+cyr_be+cyr_i+cyr_el+cyr_i+" "+cyr_pe+cyr_er+cyr_o+cyr_de+"а"+cyr_de+"е"+cyr_en+cyr_i+":<br>([\\S\\s]*)\\s*<br>\\s*С"+cyr_u+cyr_em+"а"+cyr_te+"а "+cyr_o+cyr_te+" (.*?) "+cyr_ka+cyr_De+" е "+cyr_pe+cyr_er+"е"+cyr_ve+"е"+cyr_de+"е"+cyr_en+"а "+cyr_ve+cyr_hardsign+cyr_ve+" "+cyr_ve+"а"+cyr_sha+cyr_i+cyr_ya+cyr_te+" а"+cyr_ka+"а"+cyr_u+cyr_en+cyr_te+"\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) wants to add you as friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+"+cyr_ze+cyr_a+" (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["de"])){
		LNG="de";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]="kT";
		texte["coins"]="Coins";
		texte["msgMarketsale"]="Marktplatz";
		texte["msgMarketsaleContent"]="(.*) hat am Marktplatz\\s*(\\d+)x (.*?) von dir<br>\\s*f"+u_dots+"r (.*?) kT gekauft\\.";
		texte["msgContractsale"]="Ein Vertrag wurde angenommen";
		texte["msgContractsaleContent"]="(.*) hat einen Vertrag von dir unterzeichnet!<br><br>\\s*Folgende Produkte wurden verkauft:<br>([\\S\\s]*)\\s*<br>\\s*Die Vertragssumme von (.*?) kT wurde deinem Konto gutgeschrieben\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) m"+o_dots+"chte dich als Freund hinzuf"+u_dots+"gen";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+zu je (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["dk"])){
		LNG="dk";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]="kD";
		texte["coins"]="Coins";
		texte["msgMarketsale"]="Markedsplads";
		texte["msgMarketsaleContent"]="(.*) har ved markedspladsen k"+o_stroke+"bt\\s*(\\d+)x (.*?) af dig<br>\\s*for(.*?) kD\\.";
		texte["msgContractsale"]="En kontrakt blev accepteret";
		texte["msgContractsaleContent"]="(.*) har underskrevet en kontrakt fra dig!<br><br>\\s*F"+o_stroke+"lgende produkter blev solgt:<br>([\\S\\s]*)\\s*<br>\\s*Kontraktsummen p"+a_ring+" (.*?) kD blev indsat p"+a_ring+" din konto\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) m"+o_dots+"chte dich als Freund hinzuf"+u_dots+"gen";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+til hver (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["es"])){
		LNG="es";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]="MG";
		texte["coins"]="Coins";
		texte["msgMarketsale"]="Mercado";
		texte["msgMarketsaleContent"]="(.*) te ha comprado\\s*(\\d+) (.*?)\\s*<br>\\s*por (.*?) MG en el mercado\\.";
		texte["msgContractsale"]="Un contrato ha sido aceptado";
		texte["msgContractsaleContent"]=invert_exclamation+"(.*) ha firmado un contrato tuyo!<br><br>\\s*Los siguientes productos se han vendido:<br>([\\S\\s]*)\\s*<br>\\s*El importe del contrato de (.*?) MG se ha sumado a tu cuenta\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) would like to add you as a friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+por (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["fr"])){
		LNG="fr";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]="fL";
		texte["coins"]="Coins";
		texte["msgMarketsale"]="March"+e_ac;
		texte["msgMarketsaleContent"]="(.*) a achet"+e_ac+"\\s*(\\d+)x (.*?) pour\\s*(.*?) fL\\.";
		texte["msgContractsale"]="Un contrat a "+e_ac+"t"+e_ac+" accept"+e_ac;
		texte["msgContractsaleContent"]="(.*) a sign"+e_ac+" un de tes contrats!<br><br>\\s*Les produits suivants ont "+e_ac+"t. vendu:<br>([\\S\\s]*)\\s*<br>\\s*Le total de (.*?) fL a "+e_ac+"t"+e_ac+" cr"+e_ac+"dit"+e_ac+" "+a_grave+" ton compte\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) souhaite t'ajouter "+a_grave+" ses amis";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+"+a_grave+" (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["gr"])){
		LNG="gr";
		delimThou=",";
		regDelimThou=",";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=".";
		regDelimDeci="\\.";
		texte["waehrung"]="pD";
		texte["coins"]=greek_Kappa+greek_epsilon_tonos+greek_rho+greek_mu+greek_alpha+greek_tau+greek_alpha;
		texte["msgMarketsale"]=greek_Alpha+greek_gamma+greek_omicron+greek_rho+greek_alpha_tonos;
		texte["msgMarketsaleContent"]="(.*) "+greek_alpha+greek_gamma+greek_omicron_tonos+greek_rho+greek_alpha+greek_sigma+greek_epsilon+"\\s*(\\d+)x (.*?) "+greek_gamma+greek_iota+greek_alpha+"<br>\\s*(.*?) pD "+greek_alpha+greek_pi+greek_omicron+" "+greek_epsilon+greek_sigma+greek_epsilon_tonos+greek_nu+greek_alpha+"\\.";
		texte["msgContractsale"]="Ein Vertrag wurde angenommen";
		texte["msgContractsaleContent"]="(.*) "+greek_upsilon+greek_pi+greek_epsilon_tonos+greek_gamma+greek_rho+greek_alpha+greek_psi+greek_epsilon+" "+greek_tau+greek_eta+" "+greek_sigma+greek_upsilon_tonos+greek_mu+greek_beta+greek_alpha+greek_sigma+greek_eta_tonos+" "+greek_sigma+greek_omicron+greek_upsilon+"!<br><br>\\s*"+greek_Tau+greek_alpha+" "+greek_alpha+greek_kappa+greek_omicron_tonos+greek_lambda+greek_omicron+greek_upsilon+greek_theta+greek_alpha+" "+greek_pi+greek_rho+greek_omicron+greek_iota_dialytika +greek_omicron_tonos+greek_nu+greek_tau+greek_alpha+" "+greek_pi+greek_omicron+greek_upsilon+greek_lambda+greek_eta_tonos+greek_theta+greek_eta+greek_kappa+greek_alpha+greek_nu+":<br>([\\S\\s]*)\\s*<br>\\s*"+greek_Tau+greek_omicron+" "+greek_pi+greek_omicron+greek_sigma+greek_omicron_tonos+" "+greek_tau+greek_omega+greek_nu+" (.*?) pD "+greek_Pi+greek_iota+greek_sigma+greek_tau+greek_omega_tonos+greek_theta+greek_eta+greek_kappa+greek_epsilon+" "+greek_sigma+greek_tau+greek_omicron+" "+greek_lambda+greek_omicron+greek_gamma+greek_alpha+greek_rho+greek_iota+greek_alpha+greek_sigma+greek_mu+greek_omicron_tonos+" "+greek_sigma+greek_omicron+greek_upsilon+"\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) "+greek_theta+greek_epsilon_tonos+greek_lambda+greek_epsilon+greek_iota+" "+greek_nu+greek_alpha+" "+greek_sigma+greek_epsilon+" "+greek_pi+greek_rho+greek_omicron+greek_sigma+greek_theta+greek_epsilon_tonos+greek_sigma+greek_epsilon+greek_iota+" "+greek_sigma+greek_alpha+" "+greek_phi+greek_iota_tonos+greek_lambda+greek_omicron;
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+"+greek_gamma+greek_iota+greek_alpha+" (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["hu"])){
		LNG="hu";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]="kT";
		texte["coins"]=E_ac+"rme";
		texte["msgMarketsale"]="Piact"+e_ac+"r";
		texte["msgMarketsaleContent"]="(.*) a piact"+e_ac+"ren\\s*(\\d+) darabot v"+a_ac+"s"+a_ac+"rolt t"+o_ac_double+"led a (.*?) term"+e_ac+"kb"+o_ac_double+"l\\s*<br>\\s*(.*?) kT "+o_dots+"sszeg"+e_ac+"rt\\.";
		texte["msgContractsale"]="Egy szerz"+o_tilde+"d"+e_ac+"st elfogadtak";
		texte["msgContractsaleContent"]="(.*) al"+a_ac+i_ac+"rta a szerz"+o_tilde+"d"+e_ac+"sed!<br>\\s*<br>\\s*Az al"+a_ac+"bbi term"+e_ac+"kek ker"+u_dots+"ltek "+e_ac+"rt"+e_ac+"kes"+i_ac+"t"+e_ac+"sre:\\s*<br>([\\S\\s]*)\\s*<br>\\s*A szerz"+o_tilde+"d"+e_ac+"sben szerepl"+o_tilde+" (.*?) kT "+o_dots+"sszeget j"+o_ac+"v"+a_ac+i_ac+"r"+a_ac+"sra ker"+u_dots+"lt a sz"+a_ac+"ml"+a_ac+"don\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) szeretne a bar.tod lenni";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+darabja (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["it"])){
		LNG="it";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]="pD";
		texte["coins"]="Coin";
		texte["msgMarketsale"]="Mercato";
		texte["msgMarketsaleContent"]="(.*) ha comprato\\s*(\\d+)x (.*?) che avevi messo in vendita al mercato\\. Ti ha versato (.*?) pD\\.";
		texte["msgContractsale"]="Un contratto "+e_grave+" stato accettato";
		texte["msgContractsaleContent"]="(.*) ha firmato uno dei tuoi contratti!<br><br>\\s*Hai venduto i seguenti prodotti:<br>([\\S\\s]*)\\s*<br>\\s*Ti "+e_grave+" stato accreditato l'importo di (.*?) pD\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) would like to add you as a friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+al prezzo unitario di (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["nl"])){
		LNG="nl";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]="aD";
		texte["coins"]="Coins";
		texte["msgMarketsale"]="Marktplaats";
		texte["msgMarketsaleContent"]="(.*) heeft op de marktplaats\\s*(\\d+)\\s*x\\s*(.*?) van jou gekocht voor (.*?)\\s*aD\\.";
		texte["msgContractsale"]="Een contract is geaccepteerd";
		texte["msgContractsaleContent"]="(.*) heeft een contract geaccepteerd!<br><br>\\s*De volgende producten zijn verkocht:<br>([\\S\\s]*)\\s*<br>\\s*Het bedrag (.*?) aD is bijgeschreven op je rekening\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) wil je als vriend toevoegen";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+per stuk (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["nz"])){
		LNG="nz";
		delimThou=",";
		regDelimThou=",";
		regDelimThou2="([\\d,])(\\d),(\\d{1,2}\\D)";
		regDelimThou3="(\\d),(,*)(\\d{1,2}\\D)";
		delimDeci=".";
		regDelimDeci="\\.";
		texte["waehrung"]="pD";
		texte["coins"]="Coins";
		texte["msgMarketsale"]="Marketplace";
		texte["msgMarketsaleContent"]="(.*) bought\\s*(\\d+)x (.*?) for\\s*<br>\\s*(.*?) pD from you\\.";
		texte["msgContractsale"]="A contract has been accepted";
		texte["msgContractsaleContent"]="(.*) has signed a contract of yours!<br><br>\\s*The following products have been sold:<br>([\\S\\s]*)\\s*<br>\\s*The amount of (.*?) pD has been credited to your account\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) would like to add you as a friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+for(\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["pl"])){
		LNG="pl";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]="ft";
		texte["coins"]="Monety";
		texte["msgMarketsale"]="Targ";
		texte["msgMarketsaleContent"]="(.*) zakupi"+l_stroke+" od Ciebie na targu\\s*(\\d+)x (.*?) za kwot"+e_ogonek+"\\s*<br>\\s*(.*?) ft\\.";
		texte["msgContractsale"]="Umowa zosta"+l_stroke+"a podpisana";
		texte["msgContractsaleContent"]="(.*) podpisa"+l_stroke+" wys"+l_stroke+"an"+a_ogonek+" mu przez Ciebie umow"+e_ogonek+"!<br>\\s*<br>\\s*Sprzeda"+l_stroke+"e"+s_ac+" nast"+e_ogonek+"puj"+a_ogonek+"ce produkty:\\s*<br>([\\S\\s]*)\\s*<br>\\s*Nale"+z_dot+"no"+s_ac+c_ac+" za produkty w wysoko"+s_ac+"ci (.*?) ft zosta"+l_stroke+"a przelana na Twoje konto\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) wants to add you as friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+-za sztuk"+e_ogonek+": (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["pt"])){
		LNG="pt";
		delimThou=",";
		regDelimThou=",";
		regDelimThou2="([\\d,])(\\d),(\\d{1,2}\\D)";
		regDelimThou3="(\\d),(,*)(\\d{1,2}\\D)";
		delimDeci=".";
		regDelimDeci="\\.";
		texte["waehrung"]="pD";
		texte["coins"]="Moedas";
		texte["msgMarketsale"]="Mercado";
		texte["msgMarketsaleContent"]="(.*) comprou a voc"+e_circumflex+" \\s*(\\d+)x (.*?) por\\s*<br>\\s*(.*?) pD\\.";
		texte["msgContractsale"]="Um contrato foi aceite";
		texte["msgContractsaleContent"]="(.*) assinou um contrato com voc"+e_circumflex+"!<br><br>\\s*Foram vendidos os seguintes produtos:<br>([\\S\\s]*)\\s*<br>\\s*Foram creditados (.*?) pD na sua conta\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) gostaria de adicionar voc"+e_circumflex+" como";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+para (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["ro"])){
		LNG="ro";
		delimThou=",";
		regDelimThou=",";
		regDelimThou2="([\\d,])(\\d),(\\d{1,2}\\D)";
		regDelimThou3="(\\d),(,*)(\\d{1,2}\\D)";
		delimDeci=".";
		regDelimDeci="\\.";
		texte["waehrung"]="pD";
		texte["coins"]="Monede";
		texte["msgMarketsale"]="Marketplace";
		texte["msgMarketsaleContent"]="(.*) cump"+a_tilde+"r"+a_tilde+" \\s*(\\d+)x (.*?) pentru\\s*<br>\\s*(.*?) pD de la tine\\.";
		texte["msgContractsale"]="Un contract a fost acceptat";
		texte["msgContractsaleContent"]="(.*) a semnat unul dintre contractele tale!<br><br>\\s*Urm"+a_tilde+"toarele produse au fost v"+a_circumflex+"ndute:<br>([\\S\\s]*)\\s*<br>\\s*Cantitatea de (.*?) pD a fost ad"+a_tilde+"ugat"+a_tilde+" "+i_circumflex+"n contul t"+a_tilde+"u\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) would like to add you as a friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+pentru (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["ru"])){
		LNG="ru";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]=cyr_ka+cyr_Te;
		texte["coins"]="Coins";
		texte["msgMarketsale"]="Р"+cyr_yeru+cyr_en+cyr_o+cyr_che+cyr_en+cyr_a+cyr_ya+" "+cyr_pe+cyr_el+cyr_o+cyr_shcha+cyr_a+cyr_de+cyr_softsign;
		texte["msgMarketsaleContent"]="(.*) "+cyr_ka+cyr_u+cyr_pe+cyr_i+cyr_el+"/"+cyr_a+" "+cyr_u+" "+cyr_te+cyr_ie+cyr_be+cyr_ya+" "+cyr_en+cyr_a+" "+cyr_er+cyr_yeru+cyr_en+cyr_ka+cyr_ie+"\\s*(\\d+)x (.*?)\\s*<br>\\s*"+cyr_ze+cyr_a+" (.*?) "+cyr_ka+cyr_Te+"\\.";
		texte["msgContractsale"]=cyr_De+cyr_o+cyr_ghe+cyr_o+cyr_ve+cyr_o+cyr_er+" "+cyr_pe+cyr_er+cyr_i+cyr_en+cyr_ya+cyr_te;
		texte["msgContractsaleContent"]="(.*) "+cyr_pe+cyr_o+cyr_de+cyr_pe+cyr_i+cyr_es+cyr_a+cyr_el+"/"+cyr_a+" "+cyr_te+cyr_ve+cyr_o+cyr_i_short+" "+cyr_de+cyr_o+cyr_ghe+cyr_o+cyr_ve+cyr_o+cyr_er+"!"+"<br><br>\\s*"+cyr_Es+cyr_el+cyr_ie+cyr_de+cyr_u+cyr_yu+cyr_shcha+cyr_i+cyr_ie+" "+cyr_pe+cyr_er+cyr_o+cyr_de+cyr_u+cyr_ka+cyr_te+cyr_yeru+" "+cyr_be+cyr_yeru+cyr_el+cyr_i+" "+cyr_pe+cyr_er+cyr_o+cyr_de+cyr_a+cyr_en+cyr_yeru+":<br>([\\S\\s]*)\\s*<br>\\s*"+cyr_Es+cyr_u+cyr_em+cyr_em+cyr_a+" "+cyr_de+cyr_o+cyr_ghe+cyr_o+cyr_ve+cyr_o+cyr_er+cyr_a+" "+cyr_ve+cyr_ie+cyr_el+cyr_i+cyr_che+cyr_i+cyr_en+cyr_o+cyr_i_short+" "+cyr_ve+" (.*?) "+cyr_ze+cyr_a+cyr_che+cyr_i+cyr_es+cyr_el+cyr_ie+cyr_en+cyr_a+" "+cyr_en+cyr_a+" "+cyr_te+cyr_ve+cyr_o+cyr_i_short+" "+cyr_es+cyr_che+cyr_io+cyr_te+"\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) would like to add you as a friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+"+cyr_ze+cyr_a+" "+cyr_sha+cyr_te+" (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["se"])){
		LNG="se";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		dateFormatDM="day/month";
		dateFormatDMY="day/month year";
		texte["waehrung"]="dlr";
		texte["coins"]="Mynt";
		texte["msgMarketsale"]="Torgmarknad";
		texte["msgMarketsaleContent"]="(.*) k"+o_dots+"pte (\\d+) st (.*?) f"+o_dots+"r<br>\\s*(.*?) dlr av dig\\.";
		texte["msgContractsale"]="Ett kontrakt har accepterats";
		texte["msgContractsaleContent"]="(.*) har signerat ett av dina kontrakt!<br><br>\\s*F"+o_dots+"ljande produkter har s"+a_ring+"lts:<br>([\\S\\s]*)\\s*<br>\\s*Kontraktsbeloppet (.*?) dlr har krediterats ditt konto\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) wants to add you as friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+"+a_grave+" (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["tr"])){
		LNG="tr";
		delimThou=".";
		regDelimThou="\\.";
		regDelimThou2="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
		regDelimThou3="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
		delimDeci=",";
		regDelimDeci=",";
		texte["waehrung"]="KL";
		texte["coins"]="Coin";
		texte["msgMarketsale"]="Pazar Yeri";
		texte["msgMarketsaleContent"]="(.*) Pazar yerinde sizden (.*?) KL "+o_dots+"deyerek\\s*(\\d+) adet (.*?) <br>\\s*sat"+i_dotless+"n ald"+i_dotless+"\\.";
		texte["msgContractsale"]="S"+o_dots+"zle"+s_cedilla+"melerinizden biri kabul edildi";
		texte["msgContractsaleContent"]="(.*) s"+o_dots+"zle"+s_cedilla+"menizi imzalad"+i_dotless+"<br><br>\\s*"+S_cedilla+"u "+u_dots+"r"+u_dots+"nler sat"+i_dotless+"ld"+i_dotless+":<br>([\\S\\s]*)\\s*<br>\\s*(.*) KL Hesab"+i_dotless+"na yat"+i_dotless+"r"+i_dotless+"ld"+i_dotless+"\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) wants to add you as friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+tanesi (\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["uk"])){
		LNG="uk";
		delimThou=",";
		regDelimThou=",";
		regDelimThou2="([\\d,])(\\d),(\\d{1,2}\\D)";
		regDelimThou3="(\\d),(,*)(\\d{1,2}\\D)";
		delimDeci=".";
		regDelimDeci="\\.";
		texte["waehrung"]="pD";
		texte["coins"]="Coins";
		texte["msgMarketsale"]="Marketplace";
		texte["msgMarketsaleContent"]="(.*) bought\\s*(\\d+)x (.*?) for\\s*<br>\\s*(.*?) pD from you\\.";
		texte["msgContractsale"]="A contract has been accepted";
		texte["msgContractsaleContent"]="(.*) has signed a contract of yours!<br><br>\\s*The following products have been sold:<br>([\\S\\s]*)\\s*<br>\\s*The amount of (.*?) pD has been credited to your account\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) would like to add you as a friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+for(\\d+)";
	}
	else if (location.hostname.match(GAMEPAGES["us"])){
		LNG="us";
		delimThou=",";
		regDelimThou=",";
		regDelimThou2="([\\d,])(\\d),(\\d{1,2}\\D)";
		regDelimThou3="(\\d),(,*)(\\d{1,2}\\D)";
		delimDeci=".";
		regDelimDeci="\\.";
		texte["waehrung"]="pD";
		texte["coins"]="Coins";
		texte["msgMarketsale"]="Market";
		texte["msgMarketsaleContent"]="(.*) bought\\s*(\\d+)x (.*?) for\\s*<br>\\s*(.*?) pD from you\\.";
		texte["msgContractsale"]="A contract has been accepted";
		texte["msgContractsaleContent"]="(.*) has signed a contract of yours!<br><br>\\s*The following products have been sold:<br>([\\S\\s]*)\\s*<br>\\s*The amount of (.*?) pD has been credited to your account\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) would like to add you as a friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+for(\\d+)";
	}

	texte["category"]=new Object();
	texte["category"]["c"]=texte["coins"];
	texte["hilfe"]=new Object();

	function loadTexte(LNG){
	switch (LNG){
	case "au":case "nz":case "uk":case "us": { // translation thanks to mym
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Plants";
	texte["category"]["e"]="Advanced products";
	texte["category"]["z"]="Decoration";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow";
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "br": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Plants";
	texte["category"]["e"]="Advanced products";
	texte["category"]["z"]="Decoration";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow";
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "bu": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]=cyr_Er+cyr_a+cyr_es+cyr_te+cyr_ie+cyr_en+cyr_i+cyr_ya;
	texte["category"]["e"]=cyr_U+cyr_ka+cyr_er+cyr_a+cyr_sha+cyr_ie+cyr_en+cyr_i+cyr_ya;
	texte["category"]["z"]=cyr_Pe+cyr_er+cyr_o+cyr_de+cyr_u+cyr_ka+cyr_te+cyr_i;
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow"; //comment it if not used in the language
	texte["fertigUmX"]="Finished at %1%";
	texte["YfertigUmX"]="%2% finished at %1%";
	texte["fertigSeitX"]="Finished since %1%";
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Protect while selling at market",""];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "de": {
	texte["berater"]="Berater";
	texte["yes"]="Ja";
	texte["no"]="Nein";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Ermittle aktive Sessions. Bitte %1% Sekunden warten<br>...";
	texte["autologinAllOk"]="Alle Accounts eingeloggt.";
	texte["umloggen"]="Umloggen";
	texte["farm"]="Farm";
	texte["city"]="Stadt";
	texte["marktplatz"]="Marktplatz";
	texte["marktstand"]="Marktstand";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistik";
	texte["stat_days1"]="1 Tag";
	texte["stat_days3"]="3 Tage";
	texte["stat_days5"]="5 Tage";
	texte["stat_days7"]="7 Tage";
	texte["stat_gamefield"]="Spielfeld zeigen";
	texte["stat_stats"]="Statistik zeigen";
	texte["geheZuSeite"]="gehe zu Seite";
	texte["geheZuPlatz"]="Gehe zu Platz";
	texte["goToLottery"]="Zur Lotterie";
	texte["uebersicht"]=U_dots+"bersicht";
	texte["scriptHomepage"]="Scripthomepage";
	texte["optionen"]="Optionen";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit pro Zone pro Tag";
	texte["rezepte"]="Rezepte";
	texte["muehleUnbeschaeftigt"]="Windm"+u_dots+"hle unbesch"+a_dots+"ftigt";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Pflanzen";
	texte["category"]["e"]="Fortgeschrittene Produkte";
	texte["category"]["z"]="Zierprodukte";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Achtung! Dies wird deinen Lagerbestand unter den Minimalwert bringen!";
	texte["newLevelReached"]="Herzlichen Gl"+u_dots+"ckwunsch!<br>Du bist ein Level aufgestiegen!";
	texte["shouldReload"]="Du solltest die Seite neu laden.";
	texte["editPrice"]="Preis "+a_dots+"ndern";
	texte["loading"]="Lade";
	texte["lotteryLog"]="Lotterie Log";
	texte["dailyTicket"]="T"+a_dots+"gliches Ticket";
	texte["boughtTickets"]="Gekaufte Tickets";
	texte["keptLots"]="Behaltene Lose";
	texte["exchangedLots"]="Eingel"+o_dots+"ste Lose";
	// market
	texte["goToMarket"]="Zum Markt";
	texte["goToMarketOfX"]="Zum %1%-Markt";
	texte["zumMarktstand"]="Zum Marktstand";
	texte["zumSGH"]="Zum Saatguth"+a_dots+"ndler";
	texte["produktUebersicht"]="Produkt "+U_dots+"bersicht";
	texte["aktuelleAngebote"]="Aktuelle Angebote";
	texte["davor"]="davor";
	texte["ueberNPC"]=u_dots+"ber NPC-Preis";
	texte["ueberX"]=u_dots+"ber %1%";
	texte["kauf"]="Kauf";
	texte["preis"]="Preis";
	texte["preise"]="Preise";
	texte["stueckpreis"]="St"+u_dots+"ckpreis";
	texte["alle"]="Alle";
	texte["produkt"]="Produkt";
	texte["bestand"]="Bestand";
	texte["hofpreis"]="NPC-Preis";
	texte["beobachtet"]="beobachtet";
	texte["marktpreis"]="Marktpreis";
	texte["abzglGebuehr"]="abzgl Geb"+u_dots+"hr";
	texte["nimmPreise"]="Nimm beobachtete Preise";
	texte["lagerwert"]="Lagerwert";
	texte["minRack"]="Min&nbsp;Lager";
	texte["alertSetPriceNone"]="M"+o_dots+"chtest du wirklich keinen Preis f"+u_dots+"r %PRODUCT% setzen?";
	texte["alertSetPriceOverNPC"]="M"+o_dots+"chtest du wirklich den Preis %PRICE% f"+u_dots+"r %PRODUCT% setzen?<br>Dieser ist h"+o_dots+"her als der NPC-Preis %NPC%.";
	texte["alertSetPriceOverObs"]="M"+o_dots+"chtest du wirklich den Preis %PRICE% f"+u_dots+"r %PRODUCT% setzen?<br>Dieser ist viel h"+o_dots+"her als der beobachtete Preis %OBS%.";
	texte["alertSetPriceUnderObs"]="M"+o_dots+"chtest du wirklich den Preis %PRICE% f"+u_dots+"r %PRODUCT% setzen?<br>Dieser ist viel niedriger als der beobachtete Preis %OBS%.";
	texte["click"]="Klick";
	texte["clickDouble"]="Doppel-Klick";
	texte["clickAlt"]="Alt+Klick";
	texte["clickStrg"]="Strg+Klick";
	texte["laden"]="Laden";
	texte["speichern"]="Speichern";
	texte["commission"]	= "Geb"+u_dots+"hr";
	// main
	texte["ausbauenFuerX"]="ausbauen&nbsp;f"+u_dots+"r&nbsp;%1%";
	texte["feldLeer"]="Feld leer!";
	texte["day0"]="Heute";
	texte["day1"]="Morgen";
	texte["day2"]=U_dots+"bermorgen";
	texte["fertigUmX"]="Fertig um %1%";
	texte["YfertigUmX"]="%2% fertig um %1%";
	texte["fertigSeitX"]="Fertig seit %1%";
	texte["seitX"]="seit %1%";
	texte["uhr"]="Uhr";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Dein Level ist zu niedrig";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;ben"+o_dots+"tigt";
	texte["fertig"]="Fertig";
	texte["cropped"]="Geerntet";
	texte["spielerSuchen"]="Spielersuche";
	texte["relogin"]="Session endet bald.<br>Neuer Login in %1% sek.";
	texte["adEnds"]="Werbung endet heute";
	texte["upjersWerbung"]="Upjers-Werbung";
	texte["markt"]="Markt";
	texte["quest"]="Quest";
	texte["vertrag"]="Vertrag";
	texte["ausbaustufe"]="Ausbaustufe";
	texte["clickToChange"]="Klick um zu "+a_dots+"ndern";
	// messages
	texte["nachrichtSchreiben"]="Nachricht schreiben";
	texte["vorlage"]="als Vorlage speichern";
	texte["zurNachricht"]="zur Nachricht";
	texte["vorigeNachricht"]="vorige Nachricht";
	texte["naechsteNachricht"]="n"+a_dots+"chste Nachricht";
	texte["formatiereZahlen"]="Formatiere Zahlen";
	// contracts
	texte["vertragSchicken"]="Vertrag schicken";
	texte["vertragNochmalSchicken"]="Vertrag noch einmal schicken";
	texte["erhalteneVertraege"]="Erhaltene Vertr"+a_dots+"ge";
	texte["gesendeteVertraege"]="Gesendete Vertr"+a_dots+"ge";
	texte["alte"]="Alte";
	texte["XmitVertragAuslagern"]="%1% im Vertrag auslagern";
	// system messages
	texte["zeigeLog"]="Zeige Log";
	texte["alleLesen"]="Alle lesen";
	texte["menge"]="Menge";
	texte["umsatz"]="Umsatz";
	texte["gewinn"]="Gewinn";
	texte["filtern"]="Nach %1% filtern";
	texte["summiere"]="Summiere";
	texte["filter"]="Filter";
	texte["kaeufer"]="K"+a_dots+"ufer";
	texte["waren"]="Waren";
	// score history
	texte["tag"]="Tag";
	texte["punkte"]="Punkte";
	texte["platz"]="Platz";
	texte["imLager"]="im Lager";
	texte["lagerFehlt"]="Lagerbestand %1% fehlt!!!";
	texte["lagerNiedrig"]="Lagerbestand %1% niedrig";
	// overview
	texte["farmi"]="Farmi";
	texte["produkte"]="Produkte";
	texte["geld"]="Geld";
	texte["wert"]="Wert";
	texte["fehlt"]="Fehlt";
	texte["ertrag"]="Ertrag";
	texte["produktion"]="Produktion";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Einzel";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="unbesch"+a_dots+"ftigt !!";
	texte["dauer"]="Dauer";
	texte["futter"]="Futter";
	texte["bedarf"]="Bedarf";
	// recipe table
	texte["showAll"]="Alle zeigen";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Titel";
	texte["ingredients"]="Zutaten";
	texte["time"]="Zeit";
	texte["gain"]="Erzeugnis";
	texte["price"]="Preis";
	// options panel
	texte["valGiess"]=["Automatisch gie"+sz+"en","Sagt ja der Name schon: Nach dem Pflanzen wird automatisch gegossen, wenn du den 'Alles gie"+sz+"en' besitzt (Premium)."];
	texte["valGiessAnnehm"]=["Gie"+sz+"en annehmen","Dies ist wichtig f"+u_dots+"r Pflanzen, die l"+a_dots+"nger als 24h wachsen. Die Berechnung der Ernte-Zeit nimmt an, dass stets gegossen wird."];
	texte["valErnte"]=["Automatisch ernten","Wie zuvor auch: Es wird beim "+O_dots+"ffnen der Ackers geerntet, falls n"+o_dots+"tig."];
	texte["valGiessNotw"]=["Gie"+sz+"en n"+o_dots+"tig","Soll angezeigt werden, dass dein Acker nicht gegossen ist?"];
	texte["valErnteMsg"]=["Erntemeldung klicken","Du magst die l"+a_dots+"stige Erntemeldung mit dem Schwein nicht? Hier wirst du sie los."];
	texte["valLeereFelderLimit"]=["Leere Felder","Es werden unbepflanzte Felder auf deinem Acker erkannt. Sind dies mehr als hier angegeben, wird der Acker als unbenutzt gemeldet."];
	texte["valMoveAnimals"]=["Bewege Tiere",""];
	texte["valContractLogAmount"]=["Anzahl gemerkte Vertr"+a_dots+"ge","Deine letzten erhaltenen und gesendeten Vertr"+a_dots+"ge werden gespeichert und somit kann ein Verlauf angezeigt werden."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zonen-Update","Zeigt das n"+a_dots+"chste Update an, wenn dein Level noch nicht ausreicht."];
	texte["valFarmiLimits"]=["Farmi Grenzen","Die Farmis sind in 3 F"+a_dots+"lle markiert, je nachdem wie gut ihre Bezahl-Rate ist."];
	texte["valFarmiMiniInfo"]=["Farmi Mini Info","Zeigt einen kleinen Kreis unter jedem Farmi mit der jeweiligen Klasse der Bezahl-Rate."];
	texte["minRackamount"]="Minimaler Lagerbestand";
	texte["valMinRackMan"]=["Detail Konfiguration","Du editierst die Anzahl selbst *hier*"];
	texte["valMinRackV"]=["Pflanzen","Eine Pflanze wird markiert, falls ihr Lagerbestand unter diese Grenze f"+a_dots+"llt."];
	texte["valMinRackP"]=["Pflanzengr"+o_dots+sz+"e einrechnen","Zum Beispiel braucht Getreide nur den halben Bestand."];
	texte["valMinRackE"]=["Produkte","... selbiges f"+u_dots+"r die anderen Produkte"];
	texte["valMinRackGrowing"]=["Ernteprodukte","Beachtet zus"+a_dots+"tzlich die Produkte in Produktion und in den fertigen Powerups."];
	texte["valMinRackQuest"]=["Quest-Produkte","Beachtet zus"+a_dots+"tzlich die Menge der Questprodukte."];
	texte["valMinRackFarmis"]=["Farmi-Produkte","Beachtet zus"+a_dots+"tzlich die Menge der Produkte, die deine Farmis verlangen. Dabei gelten nur diejenigen, die besser als die untere Grenze bezahlen."];
	texte["protectMinRack"]=["Marktschutz","Verhindert, dass die Warenmenge beim Marktverkauf den minimalen Lagerbestand unterschreitet."];
	texte["valKauflimitDown"]=["Untere Kaufmarkierung",""];
	texte["valKauflimit"]=["Obere Kaufgrenze","Du kannst am Markt nur Produkte kaufen die maximal der Prozentgrenze entsprechen. Dies sch"+u_dots+"tzt dich vor dem versehentlichen Kauf "+u_dots+"bertrieben teurer Waren."];
	texte["valKauflimitNPC"]=["Nur billiger als NPC kaufen",""];
	texte["valVerkaufLimit"]=["Verkaufgrenzen","Auch dein Verkauf wird gesch"+u_dots+"tzt, so dass du weder zu billig noch zu teuer verkaufst."];
	texte["valJoinPreise"]=["Ein Preisfeld","Verbindet die Preis-Eingabefelder beim Marktstand"];
	texte["valQuicklinks"]=["Quicklinks am Markt anzeigen","Quicklinks am Markt anzeigen"];
	texte["highlightUser"]="User am Markt markieren";
	texte["highlightProducts"]="Produkte am Markt markieren";
	texte["useQuestProducts"]= "Nimm aktuelle Quest-Waren";
	texte["valNimmBeob"]=["Benutze beobachtete Preise","Wenn du dich durch den Markt klickst, werden die Preise beobachtet. Ein berechneter Preis ist in der Preisliste zu sehen. Soll dieser automatisch "+u_dots+"bernommen werden?"];
	texte["confirm_NimmBeob"]="Es werden die beobachteten Preise eingetragen. Die eigenen gehen dabei verloren ...";
	texte["valStatistik"]=["Sende Statistiken","Unterst"+u_dots+"tze den <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>. Es werden keine privaten Daten gesendet!"];
	texte["messages"]="Nachrichten";
	texte["valPrivNachr"]=["Anzahl gemerkte Privatnachrichten","Deine letzten privaten Nachrichten werden gespeichert und somit kann ein Nachrichten-Verlauf mit einem Kontakt angezeigt werden."];
	texte["valNachr"]=["Anzahl gemerkte Marktnachrichten","Es bleiben auch alte System-Nachrichten in diesem Speicher, selbst wenn sie "+a_dots+"lter als die maximalen 7&nbsp;Tage sind."];
	texte["valMessageRe"]=["Betreff k"+u_dots+"rzen","Ersetzt im Betreff \"Re:Re:\" durch \"Re:\", wenn du eine Antwort schreibst."];
	texte["allgemein"]="Allgemein";
	texte["valAutoLogin"]=["Automatisch einloggen","Sobald Nutzerdaten und Passwort eingegeben sind, werden die Accounts wieder eingeloggt. Somit kann wieder gef"+u_dots+"ttert, geerntet, gegossen und gepflanzt werden. Es m"+u_dots+"ssen Popups erlaubt werden bei mehreren Accounts."];
	texte["valUpdate"]=["Update","Es wird gepr"+u_dots+"ft, ob eine neuere Version dieses Scriptes verf"+u_dots+"gbar ist."];
	texte["valServerTimeOffset"]=["Zeit des Servers",""];
	texte["valGamecursor"]=["Spiel-Cursor","Benutze die spieleigenen Cursor an Stelle deiner System-Cursor."];
	texte["valDrag"]=["Verschieben","Erlaube das Bewegen der Fenster (obere linke Ecke)."];
	texte["valClickErrorbox"]=["Verstecke Fehlerbox","Einige Spieler haben Probleme mit der Fehlerbox. Beachte, dass diese Meldung normalerweise sinnvoll ist!"];
	texte["valHotkeys"]=["Hotkeys","Benutze Hotkeys um schnell durch das Spiel zu navigieren. Schau in die Hilfe."];
	texte["hotkeymap"]={"prevPage":"vorige Nachricht, Zone, ...","nextPage":"n"+a_dots+"chste Nachricht, Zone, ...","farm1":"1. Farm","farm2":"2. Farm","farm3":"3. Farm","guild":"Club","city1":"Klein Muhstein","city2":"Teichlingen","farmilog":"Farmi-Log","help":"Hilfe","market":"Marktplatz","marketstand":"Marktstand","messages":"Nachrichten","options":"Optionen","profit":"Profit Kalkulation","sgh":"Saatguth"+a_dots+"ndler","overview":U_dots+"bersicht","contract":"Vertr"+a_dots+"ge","systemmessage":"(n"+a_dots+"chste ungelesene) Systemnachricht"};
	texte["valGlobaltimeWindmill"]=["Beachte Windm"+u_dots+"hle","Soll die Zeit der Windm"+u_dots+"hle in die globale Zeit einbezogen werden?"];
	texte["valGlobaltimeShowCroppedZone"]=["Beachte geerntete Zonen","Sollen geerntete Zonen in die globale Zeit einbezogen werden?"];
	texte["cacheReset"]=["Cache reset","Alle Informationen "+u_dots+"ber deine Zonen werden gel"+o_dots+"scht ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Ungueltiger Server";
	texte["name"]="Name";
	texte["passwort"]="Passwort";
	texte["loeschen"]="L"+o_dots+"schen";
	texte["msgUpdate"]="Es liegt eine neue Script-Version des Beraters vor. Diese installieren?";
	texte["zeigePasswoerter"]="zeige Passw"+o_dots+"rter";
	//help
	texte["zeigeFehlendeProdukte"]="Zeige fehlende Produkte";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "dk": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Plants";
	texte["category"]["e"]="Advanced products";
	texte["category"]["z"]="Decoration";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow";
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "es": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Plantas";
	texte["category"]["e"]="Productos avanzados";
	texte["category"]["z"]="Productos de adorno";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow";
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "fr": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="March"+e_ac;
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Plantes";
	texte["category"]["e"]="Produits avanc"+e_ac+"s";
	texte["category"]["z"]="Objets de d"+e_ac+"coration";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow"; //comment it if not used in the language
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contrat";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "gr": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Plants";
	texte["category"]["e"]="Advanced products";
	texte["category"]["z"]="Decoration";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow";
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "hu": { // translation thanks to EnKicsiTanyam
	texte["berater"]="Tan"+a_ac+"csad"+o_ac;
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Folyamatok ellenorz"+e_ac+"se. V"+a_ac+"rj %1% m"+a_ac+"sodpercet<br>...";
	texte["autologinAllOk"]="Minden fi"+o_ac+"kba be vagy jelentkezve.";
	texte["umloggen"]="Bel"+e_ac+"p"+e_ac+"s";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Piac";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statisztika";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Oldalra";
	texte["geheZuPlatz"]="Rangsorra";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="Gazdas"+a_ac+"gi "+a_ac+"ttekint"+e_ac+"s";
	texte["scriptHomepage"]="Szkript honlap";
	texte["optionen"]="Be"+a_ac+"ll"+i_ac+"t"+a_ac+"sok";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit / z"+o_ac+"na / nap";
	texte["rezepte"]="Receptek";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="FarmPedia megnyit"+a_ac+"sa";
	texte["category"]["v"]="N"+o_dots+"v"+e_ac+"nyek megjelen"+i_ac+"t"+e_ac+"se";
	texte["category"]["e"]=A_ac+"llati term"+e_ac+"kek megjelen"+i_ac+"t"+e_ac+"se";
	texte["category"]["z"]="D"+i_ac+"szt"+a_ac+"rgyak megjelen"+i_ac+"t"+e_ac+"se";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="%1% v"+a_ac+"s"+a_ac+"rl"+a_ac+"sa a piacon";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Ell"+a_ac+"togat"+a_ac+"s a term"+e_ac+"nyboltba";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Aktu"+a_ac+"lis aj"+a_ac+"nlatok";
	texte["davor"]="felett";
	texte["ueberNPC"]="NPC-"+a_ac+"rak felett";
	texte["ueberX"]="felett %1%";
	texte["kauf"]="V"+e_ac+"tel";
	texte["preis"]=A_ac+"ra";
	texte["preise"]=A_ac+"rlista";
	texte["stueckpreis"]="Egys"+e_ac+"g"+a_ac+"r";
	texte["alle"]="Szuk"+i_ac+"t"+e_ac+"s felold"+a_ac+"sa";
	texte["produkt"]="Term"+e_ac+"k";
	texte["bestand"]="Darabsz"+a_ac+"m";
	texte["hofpreis"]="NPC-"+A_ac+"r";
	texte["beobachtet"]="Megfigyelt&nbsp;"+a_ac+"r";
	texte["marktpreis"]="Piaci&nbsp;"+A_ac+"r";
	texte["abzglGebuehr"]="Ad"+o_ac+"&nbsp;n"+e_ac+"lk"+u_dots+"l";
	texte["nimmPreise"]="A megfigyelt "+a_ac+"rak tart"+a_ac+"sa";
	texte["lagerwert"]="A polcod "+e_ac+"rt"+e_ac+"ke";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="A&nbsp;fejleszt"+e_ac+"s&nbsp;"+a_ac+"ra&nbsp;%1%";
	texte["feldLeer"]=U_dots+"res mezo!";
	texte["day0"]="Ma";
	texte["day1"]="Holnap";
	texte["day2"]="Holnaput"+a_ac+"n";
	texte["fertigUmX"]="Elk"+e_ac+"sz"+u_dots+"l ma %1%";
	texte["YfertigUmX"]="%2% k"+e_ac+"sz"+u_dots+"l el %1%";
	texte["fertigSeitX"]="M"+a_ac+"r elk"+e_ac+"sz"+u_dots+"lt %1%";
	texte["seitX"]=o_ac+"ta %1%";
	texte["uhr"]=o_ac+"rakor";
	texte["stunden"]="h";
	texte["level"]="Szint";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="A&nbsp;sz"+u_dots+"ks"+e_ac+"ges&nbsp;sz"+i_ac+"nt:&nbsp;%1%.";
	texte["fertig"]="K"+e_ac+"sz";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="J"+a_ac+"t"+e_ac+"kos keres"+e_ac+"se";
	texte["relogin"]="Hamarosan v"+e_ac+"ge a munkamenetnek.<br>"+U_ac+"j bejelentkez"+e_ac+"s %1% mp.";
	texte["adEnds"]="H"+i_ac+"rdet"+e_ac+"sed ma lej"+a_ac+"r";
	texte["upjersWerbung"]="Upjers-H"+i_ac+"rdet"+e_ac+"s";
	texte["markt"]="Piac";
	texte["quest"]="Quest";
	texte["vertrag"]="Szerzod"+e_ac+"s";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]=U_dots+"zenet "+i_ac+"r"+a_ac+"sa";
	texte["vorlage"]="Ment"+e_ac+"s sablonk"+e_ac+"nt";
	texte["zurNachricht"]=U_dots+"zenethez";
	texte["vorigeNachricht"]="Elozo "+u_dots+"zenet";
	texte["naechsteNachricht"]="K"+o_dots+"vetkezo "+u_dots+"zenet";
	texte["formatiereZahlen"]="Sz"+a_ac+"mform"+a_ac+"tum";
	// contracts
	texte["vertragSchicken"]="Szerzod"+e_ac+"s k"+u_dots+"ld"+e_ac+"se";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Kapott szerzod"+e_ac+"sek";
	texte["gesendeteVertraege"]="K"+u_dots+"ld"+o_dots+"tt szerzod"+e_ac+"sek";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Log mutat"+a_ac+"sa";
	texte["alleLesen"]="Mind olvasott";
	texte["menge"]="Mennyis"+e_ac+"g";
	texte["umsatz"]="Forgalom";
	texte["gewinn"]="Profit";
	texte["filtern"]="Szuro erre: %1%";
	texte["summiere"]=O_dots+"sszes"+i_ac+"t"+e_ac+"s";
	texte["filter"]="Szuro";
	texte["kaeufer"]="V"+a_ac+"s"+a_ac+"rl"+o_ac+"k";
	texte["waren"]=A_ac+"ruk";
	// score history
	texte["tag"]="Nap";
	texte["punkte"]="Kapott pontsz"+a_ac+"m";
	texte["platz"]="Rank";
	texte["imLager"]="a polcon";
	texte["lagerFehlt"]="Nincs %1% a polcaidon!";
	texte["lagerNiedrig"]="Kev"+e_ac+"s %1% van a polcaidon!";
	// overview
	texte["farmi"]="V"+a_ac+"s"+a_ac+"rl"+o_ac+"k";
	texte["produkte"]="Bev"+a_ac+"s"+a_ac+"rl"+o_ac+"lista";
	texte["geld"]="K"+i_ac+"n"+a_ac+"lt "+a_ac+"r";
	texte["wert"]="Piaci "+e_ac+"rt"+e_ac+"k";
	texte["fehlt"]="K"+e_ac+"szlethi"+a_ac+"ny";
	texte["ertrag"]="Nyeres"+e_ac+"g";
	texte["produktion"]="Termel"+e_ac+"s";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]=O_dots+"sszesen";
	texte["unbeschaeftigt"]="T"+e_ac+"tlen !";
	texte["dauer"]="Idotartam";
	texte["futter"]="Etet"+e_ac+"s";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automata "+o_dots+"nt"+o_dots+"z"+e_ac+"s","Meg"+o_dots+"nt"+o_dots+"zi a n"+o_dots+"v"+e_ac+"nyeid "+u_dots+"ltet"+e_ac+"s ut"+a_ac+"n, ha van "+o_dots+"nz"+o_dots+"zoseg"+e_ac+"ded (pr"+e_ac+"mium funkci"+o_ac+")."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automata betakar"+i_ac+"t"+a_ac+"s","A sz"+a_ac+"nt"+o_ac+"f"+o_dots+"lded megnyit"+a_ac+"sa ut"+a_ac+"n betermeli a megtermelt n"+o_dots+"v"+e_ac+"nyeid."];
	texte["valGiessNotw"]=[O_ac+"nt"+o_dots+"z"+e_ac+"s sz"+u_dots+"ks"+e_ac+"ges","V"+i_ac+"zcseppel jelzi, ha "+o_dots+"nt"+o_dots+"zni kell a sz"+a_ac+"nt"+o_ac+"f"+o_dots+"ld"+o_dots+"n."];
	texte["valErnteMsg"]=["Betakar"+i_ac+"t"+a_ac+"s "+o_dots+"sszes"+i_ac+"t"+o_ac_double+" bez"+a_ac+"r"+a_ac+"sa","Nem szeretn"+e_ac+"d, hogy a betakar"+i_ac+"t"+a_ac+"sr"+o_ac+"l "+o_dots+"sszes"+i_ac+"t"+e_ac+"s jelenjen meg? Jel"+o_dots+"ld be a n"+e_ac+"gyzetet!"];
	texte["valLeereFelderLimit"]=[U_dots+"res ter"+u_dots+"letek","Ha a bevezetlen ter"+u_dots+"letek sz"+a_ac+"ma meghaladja ezt az "+e_ac+"rt"+e_ac+"ket, a sz"+a_ac+"nt"+o_ac+"d "+u_dots+"resnek fogja jelezni a tan"+a_ac+"don."];
	texte["valMoveAnimals"]=["Mozg"+o_ac+" "+a_ac+"llatok",A_ac+"llatfajt"+a_ac+"nk"+e_ac+"nt "+a_ac+"ll"+i_ac+"thatod be, hogy mozogjanak e."];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Elv"+a_ac+"rt term"+e_ac+"ny mennyis"+e_ac+"g","Ha az itt megadott darabsz"+a_ac+"m al"+a_ac+" esik egy adott n"+o_dots+"v"+e_ac+"ny mennyis"+e_ac+"ge a polcodon, akkor pirosan kiemeli sz"+a_ac+"modra."];
	texte["valMinRackP"]=["Szempont a n"+o_dots+"v"+e_ac+"ny t"+i_ac+"pusa","P"+e_ac+"ld"+a_ac+"ul magasabb szinteken b"+u_ac+"z"+a_ac+"b"+o_ac+"l m"+a_ac+"r a fele mennyis"+e_ac+"g is elegendo."];
	texte["valMinRackE"]=["Elv"+a_ac+"rt term"+e_ac+"k mennyis"+e_ac+"g","...nem n"+o_dots+"v"+e_ac+"nyi term"+e_ac+"kekre vonatkoz"+o_ac+" "+e_ac+"rt"+e_ac+"k"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Olcs"+o_ac+" term"+e_ac+"kek megjel"+o_dots+"l"+e_ac+"se sz"+i_ac+"nnel",""];
	texte["valKauflimit"]=["Dr"+a_ac+"ga term"+e_ac+"kek megv"+e_ac+"tel"+e_ac+"nek tilt"+a_ac+"sa","Csak az itt megadott "+e_ac+"rt"+e_ac+"k erej"+e_ac+"ig v"+a_ac+"s"+a_ac+"rolhatsz a piaci aj"+a_ac+"nlatok k"+o_dots+"z"+u_dots+"l. A lehetos"+e_ac+"g megv"+e_ac+"d a t"+u_ac+"ls"+a_ac+"gosan magas piaci "+a_ac+"ron val"+o_ac+" v"+a_ac+"s"+a_ac+"rl"+a_ac+"st"+o_ac+"l."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Elad"+a_ac+"si korl"+a_ac+"t","Ez szint"+e_ac+"n seg"+i_ac+"t, hogy ne j"+a_ac+"rj p"+o_ac+"rul: Csak az itt be"+a_ac+"ll"+i_ac+"tott hat"+a_ac+"r"+e_ac+"rt"+e_ac+"kek k"+o_dots+"z"+o_dots+"tt tehetsz ki "+a_ac+"rut a piacra, "+i_ac+"gy biztos nem lesz t"+u_ac+"l olcs"+o_ac+" vagy eladhatatlanul dr"+a_ac+"ga."];
	texte["valJoinPreise"]=[A_ac+"rak kit"+o_dots+"lt"+e_ac+"se","A piaci standodn"+a_ac+"l kit"+o_dots+"lti helyetted a term"+e_ac+"k "+a_ac+"r"+a_ac+"t."];
	texte["valQuicklinks"]=["Piaci gyorslinkek mutat"+a_ac+"sa","K"+o_dots+"zvetlen k"+e_ac+"pes linkek a term"+e_ac+"kekre a piacon"];
	texte["highlightUser"]="Felhaszn"+a_ac+"l"+o_ac+" kiemel"+e_ac+"s a piacon";
	texte["highlightProducts"]="Term"+e_ac+"kek kiemel"+e_ac+"se a piacon";
	texte["useQuestProducts"]= "Aktu"+a_ac+"lis feladat term"+e_ac+"keinek haszn"+a_ac+"lata";
	texte["valNimmBeob"]=["Megfigyelt "+a_ac+"rak haszn"+a_ac+"lata","Ha a piacon megn"+e_ac+"zed egy adott "+a_ac+"r"+u_ac+" aktu"+a_ac+"lis "+a_ac+"r"+a_ac+"t, akkor a megfigyelt "+a_ac+"rak list"+a_ac+"ja ezzel a lehetos"+e_ac+"ggel aut"+o_ac+"matikusan friss"+u_dots+"l, "+i_ac+"gy nem kell neked k"+e_ac+"zzel be"+i_ac+"rnod. Viszont "+i_ac+"gy nem adhatsz meg egyedi "+a_ac+"rakat az "+a_ac+"rlist"+a_ac+"don."];
	texte["confirm_NimmBeob"]="Az akti"+a_ac+"lisan megfigyelt piaci "+a_ac+"rak fel"+u_dots+"l"+i_ac+"rj"+a_ac+"k az elozoleg mentett piaci "+a_ac+"rakat ...";
	texte["valStatistik"]=["Statisztika k"+u_dots+"ld"+e_ac+"se","A <a href='http://www.mff.i24.cc/' target='_blank'>Statisztikai szerver</a> haszn"+a_ac+"lata.  Nem gyujt"+u_dots+"nk szem"+e_ac+"lyes adatokat!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Megtartand"+o_ac+" priv"+a_ac+"t "+u_dots+"zenetek sz"+a_ac+"ma","A j"+a_ac+"t"+e_ac+"kossal v"+a_ac+"ltott "+u_dots+"zeneteid, szerzod"+e_ac+"seid, t"+o_dots+"rt"+e_ac+"n"+e_ac+"seid visszamenoleg meg tudod n"+e_ac+"zni."];
	texte["valNachr"]=["Megtartand"+o_ac+" piac "+u_dots+"zenetek sz"+a_ac+"ma","A J"+a_ac+"t"+e_ac+"k 7 nap ut"+a_ac+"n t"+o_dots+"rli az "+u_dots+"zeneteid. Itt megadhatod, hogy a r"+e_ac+"gebbi "+u_dots+"zenetek k"+u_dots+"z"+u_dots+"l h"+a_ac+"nyat ments"+u_dots+"nk el az arch"+i_ac+"vumba."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automata bel"+e_ac+"p"+e_ac+"s","Egyszer elegendo be"+a_ac+"ll"+i_ac+"tanod a felhaszn"+a_ac+"l"+o_ac+"i neveket "+e_ac+"s jelszavakat, a script bel"+e_ac+"p valamennyi fi"+o_ac+"kodba. Ezut"+a_ac+"n egyszeruen tudsz etetni, betermelni, "+o_dots+"nt"+o_dots+"zni, "+u_dots+"ltetni. A felugr"+o_ac+" ablakok enged"+e_ac+"lyez"+e_ac+"se sz"+u_dots+"ks"+e_ac+"ges a funkci"+o_ac+" haszn"+a_ac+"lat"+a_ac+"hoz."];
	texte["valUpdate"]=["Friss"+i_ac+"t"+e_ac+"s","Ellenorzi, hogy van e "+u_ac+"jabb el"+e_ac+"rheto verzi"+o_ac+" az "+E_ac+"n Kicsi Tany"+a_ac+"m Tan"+a_ac+"csad"+o_ac+"b"+o_ac+"l. Felk"+i_ac+"n"+a_ac+"lja az egy kattint"+a_ac+"sos friss"+i_ac+"t"+e_ac+"st."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Vonszol"+a_ac+"s","Lehetov"+e_ac+" teszi az ablakok mozgat"+a_ac+"s"+a_ac+"t a bal felso sarokba kattintva."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Gyorsbillentyuk","Gyorsbillentyuk haszn"+a_ac+"lata a j"+a_ac+"t"+e_ac+"kbeli egyszerubb navig"+a_ac+"l"+a_ac+"s"+e_ac+"rt. R"+e_ac+"szletek"+e_ac+"rt n"+e_ac+"zd meg a s"+u_ac+"g"+o_ac+"t."];
	texte["hotkeymap"]={"prevPage":"Elozo "+u_dots+"zenet, z"+o_ac+"na, ...","nextPage":"K"+o_dots+"vetkezo "+u_dots+"zenet, z"+o_ac+"na, ...","farm1":"Elso tanya","farm2":"M"+a_ac+"sodik tanya","farm3":"Harmadik tanya","guild":"Klubbh"+a_ac+"z","city1":"Ist"+a_ac+"l"+o_ac+"sfalv"+a_ac+"ra utaz"+a_ac+"s","city2":"Feh"+e_ac+"rt"+o_ac+"ra utaz"+a_ac+"s","farmilog":"V"+a_ac+"s"+a_ac+"rl"+o_ac+"k napl"+o_ac+"ja","help":"Seg"+i_ac+"ts"+e_ac+"g, s"+u_ac+"g"+o_ac,"market":"Piact"+e_ac+"r","marketstand":"Piaci standod","messages":U_dots+"zenetek","options":"Be"+a_ac+"ll"+i_ac+"t"+a_ac+"sok","profit":"Profit kalkul"+a_ac+"tor","sgh":"Term"+e_ac+"nybolt megl"+a_ac+"togat"+a_ac+"sa","overview":"Gazdas"+a_ac+"gi "+a_ac+"ttekint"+e_ac+"s","contract":"Szerzod"+e_ac+"sek","systemmessage":"(K"+o_dots+"vetkezo olvasatlan) Rendszer"+u_dots+"zenet"};
	texte["valGlobaltimeWindmill"]=["Sz"+e_ac+"lmalom be"+e_ac+"p"+i_ac+"t"+e_ac+"se","Szeretn"+e_ac+"d a sz"+e_ac+"lmalom idej"+e_ac+"t a glob"+a_ac+"lis idotartamba belevonni?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Adatok "+u_dots+"r"+i_ac+"t"+e_ac+"se","Minden, a farmoddal kapcsolatos adat "+e_ac+"s inform"+a_ac+"ci"+o_ac+" t"+o_dots+"rl"+e_ac+"se..."];
	texte["accounts"]="Felhaszn"+a_ac+"l"+o_ac+"k";
	texte["accountAktiv"]="Akt"+i_ac+"v a felhaszn"+a_ac+"l"+o_ac+"?";
	texte["server"]="Szerver";
	texte["ungueltigerServer"]="Hib"+a_ac+"s szerver";
	texte["name"]="Felhaszn"+a_ac+"l"+o_ac+"i n"+e_ac+"v";
	texte["passwort"]="Jelsz"+o_ac;
	texte["loeschen"]="T"+o_dots+"rl"+e_ac+"s";
	texte["msgUpdate"]=U_ac+"j verzi"+o_ac+" "+e_ac+"rheto el az "+E_ac+"n Kicsi Tany"+a_ac+"m Tan"+a_ac+"csad"+o_ac+"b"+o_ac+"l. Friss"+i_ac+"ted?";
	texte["zeigePasswoerter"]="Jelsz"+o_ac+" mutat"+a_ac+"sa";
	//help
	texte["zeigeFehlendeProdukte"]=A_ac+"ruhi"+a_ac+"ny mutat"+a_ac+"sa";
	texte["hilfe"][0]="A S"+u_ac+"g"+o_ac+"t nem szeretn"+e_ac+"m leford"+i_ac+"tani. "+U_ac+"gy v"+e_ac+"lem a script haszn"+a_ac+"lata egy"+e_ac+"rtelmu, valamint az eredeti s"+u_ac+"g"+o_ac+" is elavult, sok val"+o_ac+"tlan vagy m"+a_ac+"r nem "+u_ac+"gy muk"+o_dots+"do lehetos"+e_ac+"get eml"+i_ac+"t (a k"+e_ac+"sz"+i_ac+"to is "+i_ac+"rja, hogy nem friss"+u_dots+"l folyamatosan.). Ha valamit nem "+e_ac+"rtesz, k"+e_ac+"rj seg"+i_ac+"ts"+e_ac+"get a Script honlapj"+a_ac+"n.<br /><br /><br />This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "it": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Plants";
	texte["category"]["e"]="Advanced products";
	texte["category"]["z"]="Decoration";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow";
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "nl": { // translation thanks to DrNapoleon, DrBOB101, JanHans, Stampy and tabasco
	texte["berater"]="Adviseur";
	texte["yes"]="Ja";
	texte["no"]="Nee";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Bepaal actieve sessies. %1% seconden wachten A.U.B.<br>...";
	texte["autologinAllOk"]="Alle accounts zijn ingelogd";
	texte["umloggen"]="Login";
	texte["farm"]="Boerderij";
	texte["city"]="Stad";
	texte["marktplatz"]="Marktplaats";
	texte["marktstand"]="Marktkraam";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistieken";
	texte["stat_days1"]="1 Dag";
	texte["stat_days3"]="3 Dag";
	texte["stat_days5"]="5 Dag";
	texte["stat_days7"]="7 Dag";
	texte["stat_gamefield"]="Bekijk spel";
	texte["stat_stats"]="Bekijk statistieken";
	texte["geheZuSeite"]="Ga naar pagina";
	texte["geheZuPlatz"]="Ga naar score";
	texte["goToLottery"]="Ga naar de lotterij";
	texte["uebersicht"]="Overzicht";
	texte["scriptHomepage"]="Script homepage";
	texte["optionen"]="Opties";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Winst per akker per dag";
	texte["rezepte"]="Recepten";
	texte["muehleUnbeschaeftigt"]="Windmolen inactief";
	texte["farmpediaUrl"]="http://www.farmpedia.coolix.com/";
	texte["zurFarmpedia"]="Ga naar Farmpedia";
	texte["category"]["v"]="Planten";
	texte["category"]["e"]="Dierlijke-, gefabriceerde producten";
	texte["category"]["z"]="Decoraties";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Opgelet! Dit verlaagt je voorraad onder de minimale waarde!";
	texte["newLevelReached"]="Gefeliciteerd!<br>Je bent een level gestegen!";
	texte["shouldReload"]="Herlaadt de pagina.";
	texte["editPrice"]="Bewerk prijs";
	texte["loading"]="Laden";
	texte["lotteryLog"]="Lotterij historie";
	texte["dailyTicket"]="Dagelijks lot";
	texte["boughtTickets"]="Gekochte loten";
	texte["keptLots"]="Bewaarde loten";
	texte["exchangedLots"]="Ingewisselde loten";
	// market
	texte["goToMarket"]="Ga naar de markt";
	texte["goToMarketOfX"]="Ga naar de markt van %1%";
	texte["zumMarktstand"]="Ga naar de marktkraam";
	texte["zumSGH"]="Ga naar de winkel";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Actuele aanbod";
	texte["davor"]="voor";
	texte["ueberNPC"]="boven de NPC-Prijs";
	texte["ueberX"]="boven %1%";
	texte["kauf"]="Kopen";
	texte["preis"]="Prijs";
	texte["preise"]="Prijzen";
	texte["stueckpreis"]="Stukprijs";
	texte["alle"]="Alles tonen";
	texte["produkt"]="Produkt";
	texte["bestand"]="Voorraad";
	texte["hofpreis"]="NPC-Prijs";
	texte["beobachtet"]="Gevonden";
	texte["marktpreis"]="Marktprijs";
	texte["abzglGebuehr"]="minus kosten";
	texte["nimmPreise"]="Neem gevonden prijs over";
	texte["lagerwert"]="Waarde voorraad";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Wil je echt geen prijs bepalen voor %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Wil je echt de prijs voor %PRODUCT% instellen op %PRICE%?<br>Dit is hoger dan de NPC-waarde %NPC%.";
	texte["alertSetPriceOverObs"]="Wil je echt de prijs voor %PRODUCT% instellen op %PRICE%?<br>Dit is hoger dan de gevonden markt-waarde %OBS%.";
	texte["alertSetPriceUnderObs"]="Wil je echt de prijs voor %PRODUCT% instellen op %PRICE%?<br>Dit is lager dan de gevonden markt-waarde %OBS%.";
	texte["click"]="Klik";
	texte["clickDouble"]="Dubbel-Click";
	texte["clickAlt"]="Alt+Klik";
	texte["clickStrg"]="Ctrl+Klik";
	texte["laden"]="Laden";
	texte["speichern"]="Opslaan";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="Upgraden&nbsp;kost:&nbsp;%1%";
	texte["feldLeer"]="Leeg akker!";
	texte["day0"]="Vandaag";
	texte["day1"]="Morgen";
	texte["day2"]="Overmorgen";
	texte["fertigUmX"]="Klaar om %1%";
	texte["YfertigUmX"]="%2% klaar om %1%";
	texte["fertigSeitX"]="Klaar sinds %1%";
	texte["seitX"]="sinds %1%";
	texte["uhr"]="uur";
	texte["stunden"]="uur";
	texte["level"]="Level";
	texte["levelTooLow"]="Je level is te laag";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;nodig";
	texte["fertig"]="Klaar";
	texte["cropped"]="Geoogst";
	texte["spielerSuchen"]="Zoek Speler";
	texte["relogin"]="Sessie eindigt binnenkort.<br>Opnieuw inloggen in %1% sec.";
	texte["adEnds"]="Reclame eindigt vandaag";
	texte["upjersWerbung"]="Upjers-Reclame";
	texte["markt"]="Markt";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Klik om te veranderen";
	// messages
	texte["nachrichtSchreiben"]="Bericht schrijven";
	texte["vorlage"]="Opslaan als sjabloon";
	texte["zurNachricht"]="naar bericht";
	texte["vorigeNachricht"]="vorig bericht";
	texte["naechsteNachricht"]="volgend bericht";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Contract versturen";
	texte["vertragNochmalSchicken"]="Verstuur contract opnieuw";
	texte["erhalteneVertraege"]="Ontvangen contracten";
	texte["gesendeteVertraege"]="Verzonden contracten";
	texte["alte"]="Oude";
	texte["XmitVertragAuslagern"]="Bewaar %1% in contract";
	// system messages
	texte["zeigeLog"]="Toon Log";
	texte["alleLesen"]="Alles lezen";
	texte["menge"]="Aantal";
	texte["umsatz"]="Omzet";
	texte["gewinn"]="Winst";
	texte["filtern"]="Op %1% filteren";
	texte["summiere"]="Overzicht";
	texte["filter"]="Filter";
	texte["kaeufer"]="Koper";
	texte["waren"]="Product";
	// score history
	texte["tag"]="dag";
	texte["punkte"]="Punten";
	texte["platz"]="Score";
	texte["imLager"]="op voorraad";
	texte["lagerFehlt"]="Geen voorraad voor %1%!!!";
	texte["lagerNiedrig"]="Te weinig voorraad van %1%!!!";
	// overview
	texte["farmi"]="Klanten";
	texte["produkte"]="Producten";
	texte["geld"]="Geld";
	texte["wert"]="Waarde";
	texte["fehlt"]="Mist";
	texte["ertrag"]="opbrengst";
	texte["produktion"]="Productie";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Totaal";
	texte["unbeschaeftigt"]="nutteloos !!";
	texte["dauer"]="Duur";
	texte["futter"]="Voeren";
	texte["bedarf"]="Nodig";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Titel";
	texte["ingredients"]="Ingredienten";
	texte["time"]="Tijd";
	texte["gain"]="Voordeel";
	texte["price"]="Prijs";
	// options panel
	texte["valGiess"]=["Automatisch water geven","Automatisch akkers water geven"];
	texte["valGiessAnnehm"]=["Ga uit van<br>bewatering?","Dit is belangrijk voor planten die langer dan 24 uur groeien. Het berekenen van de groei tijd gaat uit van de bewatering wanneer deze nodig is."];
	texte["valErnte"]=["Automatisch oogsten","Indien nodig wordt er meteen geoogst als de akker geopend wordt"];
	texte["valGiessNotw"]=["Bewatering nodig","Behoefte van bewatering tonen?"];
	texte["valErnteMsg"]=["Oogst melding klikken","De oogst-melding wordt automatisch weg geklikt"];
	texte["valLeereFelderLimit"]=["Lege velden","Geeft aan hoeveel lege velden een akker mag hebben voordat deze als nutteloos wordt beschouwd"];
	texte["valMoveAnimals"]=["Beweeg dieren",""];
	texte["valContractLogAmount"]=["Aantal bewaarde contracten","Het aantal laatst verzonden en ontvangen contracten dat wordt bewaard in de contract geschiedenis."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Laat de volgende update zien van de zone als het juiste level nog niet is behaald."];
	texte["valFarmiLimits"]=["Farmie Limieten","The farmies worden in drie groepen verdeeld afhankelijk van de opbrengst percentage."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimale aantal in de voorraadkast";
	texte["valMinRackMan"]=["Detail minimale hoeveelheden","Configureer per product het minimale aantal benodigde producten. <b>*klik hier*</b>"];
	texte["valMinRackV"]=["Planten","Als er minder planten in de voorraadkast liggen dan deze waarde wordt de plant gemarkeerd."];
	texte["valMinRackP"]=["Plant ratio","Er wordt rekening gehouden met de ratio van de geplante planten. Bv: Graan heeft maar de helft nodig van bovenstaande waarde."];
	texte["valMinRackE"]=["Producten","...hetzelfde als bij planten."];
	texte["valMinRackGrowing"]=["Productie producten","Bereken inclusief het aantal producten dat in productie is of uit powerups komen."];
	texte["valMinRackQuest"]=["Inclusief quest benodigde producten","Hou rekening met de benodigde producten van de huidige quest."];
	texte["valMinRackFarmis"]=["Farmie producten","Voeg de gevraagde producten toe als de farmie opbrengst percentage boven het laagste limiet ligt."];
	texte["protectMinRack"]=["Verkoop bescherming","Voorkom het verkopen van producten op de markt beneden het minimale schap hoeveelheid."];
	texte["valKauflimitDown"]=["Onderste koopgrens markeren",""];
	texte["valKauflimit"]=["Bovenste koop-grens","Koop-bescherming voor de markt: Je kunt op de markt alleen zaken kopen waarvan de prijs maximaal het percentage van de huidige prijs is"];
	texte["valKauflimitNPC"]=["Koop beneden NPC prijs","Koop alleen platen of producten die beneden de NPC prijs liggen. Blokkeer de rest."];
	texte["valVerkaufLimit"]=["Verkoop-grenzen","Je verkoop wordt beschermd zodat je niet te goedkoop, of te duur, kunt verkopen"];
	texte["valJoinPreise"]=["Enkel prijsveld","Prijs invoer velden op markt samenvoegen."];
	texte["valQuicklinks"]=["Quick-links op de markt tonen","Quick-link blok tonen bij de markt"];
	texte["highlightUser"]="Markeer gebruiker op markt";
	texte["highlightProducts"]="Producten op de markt markeren";
	texte["useQuestProducts"]="Markeer huidige quest producten";
	texte["valNimmBeob"]=["Gebruik gevonden prijzen","Marktprijzen worden opgeslagen terwijl je door de markt heen klikt. De gemiddelde prijs staat in de prijslijst. Moeten de standaard prijzen overschreven worden?"];
	texte["confirm_NimmBeob"]="De zelf-ingevoerde prijzen gaan verloren";
	texte["valStatistik"]=["Verstuur Statistieken","Ondersteun de <a href='http://www.mff.i24.cc/'>Statistiek-Server</a>. Er worden geen priv"+e_ac+" gegevens verstuurd!"];
	texte["messages"]="Berichten";
	texte["valPrivNachr"]=["Aantal prive berichten bewaren","Je laatste prive berichten worden bewaard zodat je een bericht geschiedenis van een contact kunt zien"];
	texte["valNachr"]=["Aantal gemarkeerde marktberichten","Geef aan hoeveel berichten er standaard blijven bestaan. Deze worden dan niet gewist na 7 dagen"];
	texte["valMessageRe"]=["Inkorten onderwerp","Vervang \"Re:Re:\" met \"Re:\" in het onderwerp als je gereageerd op een bericht."];
	texte["allgemein"]="Algemeen";
	texte["valAutoLogin"]=["Automatisch inloggen","Als de gebruikersnaam en wachtwoord ingevoerd zijn (zie onder), worden de accounts automatisch ingelogd"];
	texte["valUpdate"]=["Update","Er wordt gecontroleerd of er een nieuwe script versie beschikbaar is"];
	texte["valServerTimeOffset"]=["Tijd van de server",""];
	texte["valGamecursor"]=["Spel cursor","Gebruik de cursor van het spel inplaats van die van het systeem."];
	texte["valDrag"]=["Slepen","Sta het toe elementen te verplaatsen via het slepen van de bovenste linker hoek."];
	texte["valClickErrorbox"]=["Klik errorbox weg","Somige gebruikers hebben problemen met de error box. Hou er rekening mee dat deze informatie normaal nuttig is!"];
	texte["valHotkeys"]=["Sneltoetsen","Gebruik sneltoetsen om sneller door het spel te navigeren. Zie er help."];
	texte["hotkeymap"]={"prevPage":"Vorig bericht, Zone, ...","nextPage":"Volgend bericht, Zone, ...","farm1":"1ste boederij","farm2":"2de boederij","farm3":"3de boederij","guild":"Club","city1":"Drop: Bloemendaal","city2":"Drop: De Mallemolen","farmilog":"Farmi-Log","help":"Help","market":"Markt","marketstand":"Marktkraam","messages":"Berichten","options":"Opties","profit":"Winst Berekening","sgh":"Zaden handelaar","overview":"Overzicht","contract":"Contracten","systemmessage":"(volgend ongelezen) systeem bericht"};
	texte["valGlobaltimeWindmill"]=["Integreer windmolen","Moet de tijd van de windmolen worden opgenomen in de algemene tijd?"];
	texte["valGlobaltimeShowCroppedZone"]= ["Intergreer geoogste velden","Moet de tijd van geoogste velden worden opgenomen in de algeme tijd?"];
	texte["cacheReset"]=["Cache reset","Alle informatie over je zones gaat verloren"];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account activeren";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Foute server";
	texte["name"]="Naam";
	texte["passwort"]="Wachtwoord";
	texte["loeschen"]="Verwijderen";
	texte["msgUpdate"]="Wil je de nieuwe script versie of the Adviser installeren?";
	texte["zeigePasswoerter"]="Toon wachtwoorden";
	//help
	texte["zeigeFehlendeProdukte"]="Bekijk product tekort";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "pl": { // translation thanks to robert197648 and Bonizaur
	texte["berater"]="Doradca";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Sprawdzenie aktywnych sesji. Prosz"+e_ogonek+" odczeka"+c_ac+" %1% sekund<br>...";
	texte["autologinAllOk"]="Wszystkie konta zalogowane.";
	texte["umloggen"]="Login";
	texte["farm"]="Farma";
	texte["city"]="City";
	texte["marktplatz"]="Rynek";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statystyki";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Przejd"+z_dot+" do strony";
	texte["geheZuPlatz"]="Przejd"+z_dot+" do pozycji";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="Przegl"+a_ogonek+"d";
	texte["scriptHomepage"]="Strona skryptu";
	texte["optionen"]="Opcje";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Kalkulacja zysk"+o_ac+"w dziennych";
	texte["rezepte"]="Przepisy";
	texte["muehleUnbeschaeftigt"]="Przerwa w pracy M"+l_stroke+"yna";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Do niemieckiej Farmpedii";
	texte["category"]["v"]="Ro"+s_ac+"liny";
	texte["category"]["e"]="Prod. zwierz"+e_ogonek+"ce";
	texte["category"]["z"]="Dekoracje";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="UWAGA! Na regale zostanie ci mniej ni"+z_dot+" ustalone minimum!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Id"+z_ac+" na targ po %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Id"+z_ac+" do sklepu";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Aktualne promocje";
	texte["davor"]="Suma prod. powy"+z_dot+"ej";
	texte["ueberNPC"]="wi"+e_ogonek+"cej ni"+z_dot+" NPC";
	texte["ueberX"]="wi"+e_ogonek+"cej %1%";
	texte["kauf"]="Kupuj";
	texte["preis"]="Cena";
	texte["preise"]="Ceny";
	texte["stueckpreis"]="Cena jedn.";
	texte["alle"]="Wszystko";
	texte["produkt"]="Produkt";
	texte["bestand"]="Zapasy";
	texte["hofpreis"]="Sklepowa";
	texte["beobachtet"]=S_ac+"rednia rynkowa";
	texte["marktpreis"]="Na&nbsp;targu&nbsp;po";
	texte["abzglGebuehr"]="-10%";
	texte["nimmPreise"]="Przyjmij "+s_ac+"redni"+a_ogonek+" rynkow"+a_ogonek;
	texte["lagerwert"]="Warto"+s_ac+c_ac+"&nbsp;towaru";
	texte["minRack"]="Min&nbsp;ilo"+s_ac+c_ac;
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Zapisz";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="Rozbudowa&nbsp;za&nbsp;%1%";
	texte["feldLeer"]="Puste!";
	texte["day0"]="Dzisiaj";
	texte["day1"]="Jutro";
	texte["day2"]="Pojutrze";
	texte["fertigUmX"]="Gotowe o %1%";
	texte["YfertigUmX"]="%2% gotowe o %1%";
	texte["fertigSeitX"]="Gotowe za %1%"; //Ready since 2:15h
	texte["seitX"]="od %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Poziom";
	texte["levelXBenoetigt"]="Wymagany&nbsp;%1%&nbsp;poziom";
	texte["fertig"]="Gotowe";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Szukaj gracza";
	texte["relogin"]="Zbli"+z_dot+"a si"+e_ogonek+" koniec sesji.<br>Nowe logowanie za %1% sek.";
	texte["adEnds"]="Kampania reklamowa ko"+n_ac+"czy si"+e_ogonek+" dzi"+s_ac;
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Umowa";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="Wy"+s_ac+"lij wiadomo"+s_ac+c_ac;
	texte["vorlage"]="Zapisz jako szablon";
	texte["zurNachricht"]="do wiadomo"+s_ac+"ci";
	texte["vorigeNachricht"]="Nast"+e_ogonek+"pna wiadomo"+s_ac+c_ac;
	texte["naechsteNachricht"]="Poprzednia wiadomo"+s_ac+c_ac;
	texte["formatiereZahlen"]="Format liczb";
	// contracts
	texte["vertragSchicken"]="Wys"+l_stroke+"a"+c_ac+" umow"+e_ogonek;
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Umowy otrzymane";
	texte["gesendeteVertraege"]="Umowy wys"+l_stroke+"ane";
	texte["alte"]="Poprzednie";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Poka"+z_dot+" log";
	texte["alleLesen"]="Wszystkie przeczytane";
	texte["menge"]="Ilo"+s_ac+c_ac;
	texte["umsatz"]="Twoja sprzeda"+z_dot;
	texte["gewinn"]="Warunki rynkowe";
	texte["filtern"]="Filtrowanie %1%";
	texte["summiere"]="Analiza obrot"+o_ac+"w";
	texte["filter"]="Filtr";
	texte["kaeufer"]="Kupcy";
	texte["waren"]="Towary";
	// score history
	texte["tag"]="Dzie"+n_ac;
	texte["punkte"]="Punkt"+o_ac+"w";
	texte["platz"]="Pozycja";
	texte["imLager"]="w magazynie";
	texte["lagerFehlt"]="Brakuje produktu %1%!!!";
	texte["lagerNiedrig"]="Ma"+l_stroke+"o produktu %1%";
	// overview
	texte["farmi"]="Klient";
	texte["produkte"]="Produkty";
	texte["geld"]="Oferuje";
	texte["wert"]="Warto"+s_ac+c_ac;
	texte["fehlt"]="Brakuje";
	texte["ertrag"]="Plon";
	texte["produktion"]="Produkcja";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Og"+o_ac+l_stroke+"em";
	texte["unbeschaeftigt"]="Le"+z_dot+"y od"+l_stroke+"ogiem!!";
	texte["dauer"]="Czas prod.";
	texte["futter"]="Karmienie";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Poka"+z_dot+" wszystko";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Nazwa";
	texte["ingredients"]="Sk"+l_stroke+"adniki";
	texte["time"]="Czas";
	texte["gain"]="Daje";
	texte["price"]="Cena";
	// options panel
	texte["valGiess"]=["Automatyczne podlewanie","Ro"+s_ac+"liny b"+e_ogonek+"d"+a_ogonek+" automatycznie podlewane (je"+s_ac+"li masz konto Premium)."];
	texte["valGiessAnnehm"]=["Kontynuuj podlewanie","Jest to wa"+z_dot+"+ne dla ro"+s_ac+"lin rosn"+a_ogonek+"cych d"+l_stroke+"u"+z_dot+"ej ni"+z_dot+" 24h. Na podstawie przewidywanego czasu zbioru je"+s_ac+"li podlewanie jest mo"+z_dot+"liwe, to jest kontynuowane."];
	texte["valErnte"]=["Automatyczne zbiory","Po wej"+s_ac+"ciu na pole wszystkie plony zostan"+a_ogonek+" automatycznie zebrane."];
	texte["valGiessNotw"]=["Info o podlewaniu","Czy ma by"+c_ac+" wy"+s_ac+"wietlana ikona informuj"+a_ogonek+"ca o niepodlanym polu?"];
	texte["valErnteMsg"]=["Autozamykanie zbior"+o_ac+"w","Zaznacz je"+s_ac+"li denerwuje ci"+e_ogonek+" wyskakuj"+a_ogonek+"ca plansza z ilo"+s_ac+"ci"+a_ogonek+" zebranych plon"+o_ac+"w."];
	texte["valLeereFelderLimit"]=["Puste miejsca","Je"+s_ac+"li ilo"+s_ac+c_ac+" pustych miejsc przekroczy t"+a_ogonek+" warto"+s_ac+c_ac+", to pole b"+e_ogonek+"dzie oznaczone jako puste."];
	texte["valMoveAnimals"]=["Ruchome zwierzaki",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimalna ilo"+s_ac+c_ac+" w regale";
	texte["valMinRackMan"]=["Minimalne ilo"+s_ac+"ci","Mo"+z_dot+"esz ustali"+s_ac+" dok"+l_stroke+"adn"+a_ogonek+" ilo"+s_ac+c_ac+" *tutaj*"];
	texte["valMinRackV"]=["Ro"+s_ac+"lin","Ro"+s_ac+"lina zostanie zaznaczona, gdy jej ilo"+s_ac+c_ac+" w regale spadnie poni"+z_dot+"ej tego poziomu"];
	texte["valMinRackP"]=["Uwzgl"+e_ogonek+"dnij rozmiar sadzonki","Przyk"+l_stroke+"adowo zbo"+z_dot+"e potrzebuje tylko po"+l_stroke+"ow"+e_ogonek+" powy"+z_dot+"szej warto"+s_ac+"ci."];
	texte["valMinRackE"]=["Produkt"+o_ac+"w","...to samo dla produkt"+o_ac+"w zwierz"+e_ogonek+"cych"];
	texte["valMinRackGrowing"]=["Produkcja w toku","Uwzgl"+z_dot+"dnia ilo"+s_ac+c_ac+" produkt"+o_ac+"w b"+e_ogonek+"d"+a_ogonek+"cych w trakcie produkcji/wzrostu i gotowych przez bonusy."];
	texte["valMinRackQuest"]=["Produkty do Quest"+o_ac+"w","Uwzgl"+z_dot+"dnia ilo"+s_ac+c_ac+" potrzebn"+a_ogonek+" do wykonania Questa."];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Ochrona sprzeda"+z_dot+"y","Sprzedaj"+a_ogonek+"c na targu zostawi w regale ustalone minimum towaru"];
	texte["valKauflimitDown"]=["Pod"+s_ac+"wietlenie ceny poni"+z_dot+"ej minimum",""];
	texte["valKauflimit"]=["G"+o_ac+"rny limit zakupu","Zaznaczasz do jakiej granicy chcesz kupowa"+c_ac+" na targu. To chroni przed zakupem zbyt drogich produkt"+o_ac+"w na targu."];
	texte["valKauflimitNPC"]=["Pozw"+o_ac+"l na zakupy tylko do ceny NPC",""];
	texte["valVerkaufLimit"]=["Limity sprzeda"+z_dot+"y","Zakres w jakim twoja sprzeda"+z_dot+" b"+e_ogonek+"dzie chroniona, aby"+s_ac+" nie sprzeda"+l_stroke+" swoich plon"+o_ac+"w zbyt tanio lub za drogo.."];
	texte["valJoinPreise"]=["Upro"+s_ac+c_ac+" sprzeda"+z_dot,"Po"+l_stroke+a_ogonek+"czy w jedno pola ceny na twoim straganie (u"+l_stroke+"atwia wprowadzanie cen)."];
	texte["valQuicklinks"]=["Szybki przegl"+a_ogonek+"d rynku (ikony)","Pokazuje wysuwany pasek z ikonami dost"+e_ogonek+"pnych towar"+o_ac+"w (z prawej)"];
	texte["highlightUser"]="Pod"+s_ac+"wietl farmera na targu";
	texte["highlightProducts"]="Pod"+s_ac+"wietl produkty na targu";
	texte["useQuestProducts"]= "U"+z_dot+"yj towar"+o_ac+"w z bie"+z_dot+a_ogonek+"cego Questa";
	texte["valNimmBeob"]=["U"+z_dot+"yj "+s_ac+"rednich cen","Podczas przegl"+a_ogonek+"dania cen na targu s"+a_ogonek+" one notowane i u"+s_ac+"redniona cena jest wykazywana w tabeli cen. Czy automatycznie ma ona by"+c_ac+" przyjmowana jako rynkowa?"];
	texte["confirm_NimmBeob"]="Czy przyj"+a_ogonek+c_ac+" "+s_ac+"redni"+a_ogonek+" rynkow"+a_ogonek+" jako ceny na targu?";
	texte["valStatistik"]=["Send statistics",""];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Ilo"+s_ac+c_ac+" zachowanych prywatnych wiadomo"+s_ac+"ci","Liczba prywatnych wiadomo"+s_ac+"ci, kt"+o_ac+"re zostan"+a_ogonek+" zachowane, aby umo"+z_dot+"liwi"+c_ac+" przegl"+a_ogonek+"d historii danej umowy"];
	texte["valNachr"]=["Ilo"+s_ac+c_ac+" zachowanych rynkowych wiadomo"+s_ac+"ci","Zaznacz ile wiadomo"+s_ac+"ci ma by"+c_ac+" przechowywanych, nawet je"+s_ac+"li s"+a_ogonek+" starsze ni"+z_dot+" maksymalnie 7 dni."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="Og"+o_ac+"lne";
	texte["valAutoLogin"]=["Automatyczne logowanie","Po wprowadzeniu nazwy u"+z_dot+"ytkownika i has"+l_stroke+"a nast"+e_ogonek+"puje automatyczne logowanie. Pozwala to zachowa"+c_ac+" ci"+a_ogonek+"g"+l_stroke+"o"+s_ac+c_ac+" grania. Przy wielu kontach musi by"+c_ac+" dozwolone wyskakiwanie okienek."];
	texte["valUpdate"]=["Aktualizacja","Automatycznie sprawdza czy jest nowsza wersja tego skryptu."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Przesuwanie","Pozwala na przesuwanie okien po klikni"+e_ogonek+"ciu na lewy g"+o_ac+"rny r"+o_ac+"g."];
	texte["valClickErrorbox"]=["Ukryj okno b"+l_stroke+e_ogonek+"du","Niekt"+o_ac+"rzy u"+z_dot+"ytkownicy maj"+a_ogonek+" problemy z oknem b"+l_stroke+e_ogonek+"du. Pami"+e_ogonek+"taj jednak, "+z_dot+"e zasadniczo jest ono przydatne!"];
	texte["valHotkeys"]=["Hotkeys","U"+z_dot+"ywanie klawiszy pozwala na szybsze poruszanie si"+e_ogonek+" po grze."];
	texte["hotkeymap"]={"prevPage":"poprzednia wiadomo"+s_ac+c_ac+", pole, ...","nextPage":"nast"+e_ogonek+"pna wiadomo"+s_ac+c_ac+", pole, ...","farm1":"1-sza farma","farm2":"2-ga farma","farm3":"3-cia farma","guild":"Klub","city1":"Pierwsze miasto","city2":"Drugie miasto","farmilog":"Farmi-Log","help":"Pomoc","market":"Targ","marketstand":"Market stand","messages":"Wiadomo"+s_ac+"ci","options":"Opcje","profit":"Kalkulator zysk"+o_ac+"w","sgh":"Sklep z nasionami","overview":"Przegl"+a_ogonek+"d","contract":"Umowy","systemmessage":"wiadomo"+s_ac+"ci systemowe"};
	texte["valGlobaltimeWindmill"]=["Zintegruj m"+l_stroke+"yn","Czy czas mielenia ma by"+c_ac+" doliczany do og"+o_ac+"lnego czasu?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","Usuwanie wszystkich danych zapisanych przez ten skrypt..."];
	texte["accounts"]="Konta";
	texte["accountAktiv"]="Konto aktywne";
	texte["server"]="Serwer";
	texte["ungueltigerServer"]="B"+l_stroke+e_ogonek+"dny serwer";
	texte["name"]="Login";
	texte["passwort"]="Has"+l_stroke+"o";
	texte["loeschen"]="Usu"+n_ac;
	texte["msgUpdate"]="Jest nowa wersja skryptu 'Doradca Farmera'. Czy chcesz j"+a_ogonek+" zainstalowa"+c_ac+"?";
	texte["zeigePasswoerter"]="Poka"+z_dot+" has"+l_stroke+"o";
	//help
	texte["zeigeFehlendeProdukte"]="Poka"+z_dot+" braki produktAw";
	texte["hilfe"][0]="Oto skr"+o_ac+"cona instrukcja funkcji dost"+e_ogonek+"pnych w Doradcy Farmera. Nie s"+a_ogonek+" tu opisane wszystkie, gdy"+z_dot+" skrypt stale si"+e_ogonek+" rozwija. Aby odkry"+c_ac+" niekt"+o_ac+"re wystarczy najecha"+c_ac+" na nie myszk"+a_ogonek+". <br>Na dole strony wida"+c_ac+" przycisk do <a href=\""+USO_URL+"\" target=\"_blank\">strony skryptu</a>.<br> Obok niego jest przycisk opcji, mo"+z_dot+"esz tam dopasowa"+c_ac+" skrypt do swoicj wymaga"+n_ac+".<br> Generalnie skrypt wie tylko tyle ile zobaczy i ustalisz, wi"+e_ogonek+"c w razie jakich"+s_ac+" problem"+o_ac+"w radz"+e_ogonek+" tam zajrze"+c_ac;
	texte["hilfe"]["Pola"]="Po wej"+s_ac+"ciu na pole skrypt zapisuje co jest produkowane, czas produkcji oraz czy ro"+s_ac+"liny s"+a_ogonek+" podlane. Informacje s"+a_ogonek+" p"+o_ac+z_ac+"niej wy"+s_ac+"wietlane w widoku farmy. Ka"+z_dot+"de pole ma w"+l_stroke+"asny licznik czasu, odliczaj"+a_ogonek+"cy czas do zbioru.<br> Je"+s_ac+"li masz w"+l_stroke+a_ogonek+"czon"+a_ogonek+" pomoc w sianiu to jest ona dost"+e_ogonek+"pna pod ikonk"+a_ogonek+" kwiatka. Na g"+o_ac+"rze pola s"+a_ogonek+" umieszczone strza"+l_stroke+"ki pozwalaj"+a_ogonek+"ce na przemieszczanie si"+e_ogonek+" mi"+e_ogonek+"dzy polami";
	texte["hilfe"]["Przegl"+a_ogonek+"d"]="Klikni"+e_ogonek+"cie na "+s_ac+"wink"+e_ogonek+" na g"+o_ac+"rze ekranu wy"+s_ac+"wietla przegl"+a_ogonek+"d informacji o ca"+l_stroke+"ej farmie. Opisane jest tu ka"+z_dot+"de pole, jego obecny stan (produkcja, punkty oraz czas zako"+n_ac+"czenia). Podawana jest te"+z_dot+" suma wszystkich zbior"+o_ac+"w.<br> Poni"+z_dot+"ej wy"+s_ac+"wietlany jest spis brakuj"+a_ogonek+"cych produkt"+o_ac+"w "+z_dot+a_ogonek+"danych przez klient"+o_ac+"w. Za"+s_ac+" ni"+z_dot+"ej szczeg"+o_ac+l_stroke+"owe zestawienie zam"+o_ac+"wie"+n_ac+", w kt"+o_ac+"rym wyliczone s"+a_ogonek+" "+z_dot+a_ogonek+"dane produkty (braki oznaczone na czerwono), sugerowana cena, warto"+s_ac+c_ac+" rynkowa i nasz zysk.<br> Klikaj"+a_ogonek+"c na dany produkt (w zestawieniu brak"+o_ac+"w lub indywidualnym) przeniesiesz si"+e_ogonek+" prosto na targ, aby"+s_ac+" m"+o_ac+"g"+l_stroke+" go kupi"+c_ac+".<br> Mo"+z_dot+"esz te"+z_dot+" przej"+s_ac+c_ac+" do wybranego pola lub klienta po klikaj"+a_ogonek+"c na nie.";
	texte["hilfe"]["Niebieski pasek"]="Zdobywane punkty s"+a_ogonek+" codziennie zliczane, a ich ilo"+s_ac+c_ac+" pokazywana na niebieskim pasku u do"+l_stroke+"u ekranu. Czarna kreska oddziela poziom poprzedni i bie"+z_dot+a_ogonek+"cy, kreski bia"+l_stroke+"e oddzielaj"+a_ogonek+" dni, za"+s_ac+" czerwona oznacza niedziel"+e_ogonek+".<br> Klikni"+e_ogonek+"cie na ten pasek wy"+s_ac+"wietli tabel"+e_ogonek+" zdobywanych punkt"+o_ac+"w oraz braki w produktach";
	texte["hilfe"]["Rega"+l_stroke]="Przedstawione tu informacje zosta"+l_stroke+"y rozszerzone o ceny oraz warto"+s_ac+c_ac+" towaru. Kolorem zaznaczone s"+a_ogonek+" towary, kt"+o_ac+"rych jest za ma"+l_stroke+"o do zrealizowania zam"+o_ac+"wienia klient"+o_ac+"w.";
	texte["hilfe"]["Kalkulator zysk"+o_ac+"w"]="U do"+l_stroke+"u planszy jest znaczek <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px; height: 15px;\">. Klikni"+e_ogonek+"cie na niego otwiera tabel"+e_ogonek+" zawieraj"+a_ogonek+"c"+a_ogonek+" wyliczony czas zbior"+o_ac+"w, ilo"+s_ac+c_ac+" zdobywanych punkt"+o_ac+"w oraz przewidywane zyski. Klikni"+e_ogonek+"cie na gwiazdki zwi"+e_ogonek+"ksza poziom dla danego towaru, za"+s_ac+" na nag"+l_stroke+o_ac+"wki kolum - sortuje dane wzgl"+e_ogonek+"dem danej kolumny";
	texte["hilfe"]["Klienci"]="Dymki nad klientami zosta"+l_stroke+"y rozszerzone o kalkulacj"+e_ogonek+" czy zam"+o_ac+"wienie jest op"+l_stroke+"acalne. Towary, kt"+o_ac+"rych jest za ma"+l_stroke+"o s"+a_ogonek+" oznaczone czerwon"+a_ogonek+" ramk"+a_ogonek+".<br> Na niebieskim pasku z prawej mo"+z_dot+"esz ustali"+c_ac+" poziom op"+l_stroke+"acalno"+s_ac+c_ac+"i poni"+z_dot+"ej kt"+o_ac+"rego klienci s"+a_ogonek+" odsy"+l_stroke+"ani. <br>Tabela pozwala si"+e_ogonek+" zorientowa"+c_ac+" jakie zyski osi"+a_ogonek+"gni"+e_ogonek+"to z handlu z klientami";
	texte["hilfe"]["Hotkeys"]="Mo"+z_dot+"esz szybko przenosi"+c_ac+" si"+e_ogonek+" przy u"+z_dot+"yciu klawisza <i>Alt</i>+... zobacz w Opcjach!";
	texte["hilfe"]["Targowisko"]="Na targu jeste"+s_ac+" \"chroniony\", co znaczy, "+z_dot+"e nie mo"+z_dot+"esz kupi"+c_ac+" towaru dro"+z_dot+"ej ni"+z_dot+" w sklepie lub poza ustalonym w opcjach przedzia"+l_stroke+"em. Je"+s_ac+"li w"+l_stroke+a_ogonek+"czony jest 'szybki przegl"+a_ogonek+"d rynku', to mo"+z_dot+"esz przej"+s_ac+c_ac+" do wybranego towaru przez wysuwane boczne okno.<br> Z lewej u g"+o_ac+"ry s"+a_ogonek+" strza"+l_stroke+"ki pozwalaj"+a_ogonek+"ce zmienia"+c_ac+" towar oraz wy"+s_ac+"wietlana jest ilo"+s_ac+c_ac+" danego towaru.<br> Na dole za"+s_ac+" jest bardzo wa"+z_dot+"ny przycisk: CENY.<br> Zawiera on zestawienie ilo"+s_ac+"ci towar"+o_ac+"w oraz Arednich cen po jakich jest on wystawiany oraz ustalanej przez ciebie. Ceny te s"+a_ogonek+" wykorzystywane w wielu miejscach, wi"+e_ogonek+"c dbaj by by"+l_stroke+"y aktualne.\" "+S_ac+"rednia rynkowa\" jest ustalana, gdy odwiedzasz stron"+e_ogonek+" danego towaru. Na twoim straganie wy"+s_ac+"wietlane jest kilka przydatnych informacji, zapami"+e_ogonek+"tywana jest te"+z_dot+" twoja ostatnia oferta.";
	texte["hilfe"]["Wiadomo"+s_ac+"ci"]="Twoja sprzeda"+z_dot+" jest monitorowana i wy"+s_ac+"wietlana od razu, wi"+e_ogonek+"c nie trzeba klika"+c_ac+" dwa razy.<br> Przydatny na pewno b"+e_ogonek+"dzie przycisk \"Wszystkie przeczytane\" pozwalaj"+a_ogonek+"cy za jednym klikni"+e_ogonek+"ciem oznaczy"+c_ac+" wszystkie wiadomo"+s_ac+"ci. <br> Za"+s_ac+" przycisk \"Log\" zawiera zestawienie zapami"+e_ogonek+"tanych wiadomo"+s_ac+"ci oraz analizy sprzeda"+z_dot+"y towar"+o_ac+"w na targu. <br>Twoje wiadomo"+s_ac+"ci prywatne s"+a_ogonek+" r"+o_ac+"wnie"+z_dot+" zapami"+e_ogonek+"tywane, wi"+e_ogonek+"c znacznie "+l_stroke+"atiwej obs"+l_stroke+"uguje si"+e_ogonek+" umowy.";
	texte["hilfe"]["Umowy"]="S"+a_ogonek+" r"+o_ac+"wnie"+z_dot+" zapami"+e_ogonek+"tywane. Podczas tworzenia umowy w bocznym oknie wy"+s_ac+"wietlana jest wiadomo"+s_ac+c_ac+" "+z_ac+"r"+o_ac+"d"+l_stroke+"owa, aby "+l_stroke+"atwiej by"+l_stroke+"o skompletowa"+c_ac+" towar. Na bie"+z_dot+a_ogonek+"co pokazywana jest warto"+s_ac+c_ac+" wysy"+l_stroke+"anego towaru. Mo"+z_dot+"na wysy"+l_stroke+"a"+c_ac+" wiele razy t"+a_ogonek+" sam"+a_ogonek+" umow"+e_ogonek+".";
	texte["hilfe"]["Obs"+l_stroke+"uga kont"]="Mo"+z_dot+"esz zapisa"+c_ac+" wszystkie swoje konta w opcjach. Pozwala to na "+l_stroke+"atwe logowanie przy pomocy przycisk"+o_ac+"w wy"+s_ac+"wietlanych na stronie startowej. Dzi"+e_ogonek+"ki temu mo"+z_dot+"esz prze"+l_stroke+a_ogonek+"cza"+c_ac+" si"+e_ogonek+" mi"+e_ogonek+"dzy kontami na tym samym serwerze.";
	break;}
	case "pt": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Plants";
	texte["category"]["e"]="Advanced products";
	texte["category"]["z"]="Decoration";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow";
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "ro": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Plants";
	texte["category"]["e"]="Advanced products";
	texte["category"]["z"]="Decoration";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow";
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "ru": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]=cyr_Er+cyr_a+cyr_es+cyr_te+cyr_ie+cyr_en+cyr_i+cyr_ya;
	texte["category"]["e"]=cyr_Pe+cyr_er+cyr_o+cyr_de+cyr_u+cyr_ka+cyr_te+cyr_yeru+" "+cyr_er+cyr_a+cyr_ze+cyr_ve+cyr_i+cyr_te+cyr_o+cyr_ghe+cyr_o+" х"+cyr_o+cyr_ze+cyr_ya+cyr_i_short+cyr_es+cyr_te+cyr_ve+cyr_a;
	texte["category"]["z"]=cyr_pe+cyr_er+cyr_ie+cyr_de+cyr_em+cyr_ie+cyr_te+cyr_yeru+" "+cyr_de+cyr_ie+cyr_ka+cyr_o+cyr_er+cyr_a;
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow";
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "se": { // I need a translation :(
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["umloggen"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marktplatz"]="Market place";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Go to page";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["optionen"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Plants";
	texte["category"]["e"]="Advanced products";
	texte["category"]["z"]="Decoration";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="Current offers";
	texte["davor"]="above";
	texte["ueberNPC"]="over NPC-price";
	texte["ueberX"]="over %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Price";
	texte["preise"]="Prices";
	texte["stueckpreis"]="Unit price";
	texte["alle"]="All";
	texte["produkt"]="Product";
	texte["bestand"]="Inventory";
	texte["hofpreis"]="NPC-Price";
	texte["beobachtet"]="Observed";
	texte["marktpreis"]="Market&nbsp;Price";
	texte["abzglGebuehr"]="After Fee";
	texte["nimmPreise"]="Take observed prices";
	texte["lagerwert"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["feldLeer"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow";
	texte["fertigUmX"]="Ready at %1%"; //Ready at 2:15h
	texte["YfertigUmX"]="%2% ready at %1%"; //Tomorrow ready at 2:15h
	texte["fertigSeitX"]="Ready since %1%"; //Ready since 2:15h
	texte["seitX"]="since %1%";
	texte["uhr"]="h";
	texte["stunden"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Finished";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="write message";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="to message";
	texte["vorigeNachricht"]="previous message";
	texte["naechsteNachricht"]="next message";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Send contract";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Contracts received";
	texte["gesendeteVertraege"]="Contracts sent";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Show log";
	texte["alleLesen"]="Read all";
	texte["menge"]="Quantity";
	texte["umsatz"]="Turnover";
	texte["gewinn"]="Profit";
	texte["filtern"]="Filter for %1%";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="Day";
	texte["punkte"]="Points";
	texte["platz"]="Rank";
	texte["imLager"]="in stock";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]="Products";
	texte["geld"]="Offered";
	texte["wert"]="Value";
	texte["fehlt"]="Need";
	texte["ertrag"]="Yield";
	texte["produktion"]="Production";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Total";
	texte["unbeschaeftigt"]="idle !!";
	texte["dauer"]="duration";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLeereFelderLimit"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Invalid Server";
	texte["name"]="Name";
	texte["passwort"]="Password";
	texte["loeschen"]="Erase";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["zeigePasswoerter"]="show passwords";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	case "tr": { // translation thanks to Cilek Kocak
	texte["berater"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["autologinChecking"]="Aktif oturumlar kontrol ediliyor.  L"+u_dots+"tfen %1%sn bekleyiniz!<br>...";
	texte["autologinAllOk"]="B"+u_dots+"t"+u_dots+"n hesaplardan girildi.";
	texte["umloggen"]="Giri"+s_cedilla;
	texte["farm"]=C_cedilla+"iftlik";
	texte["city"]="City";
	texte["marktplatz"]="Pazar";
	texte["marktstand"]="Market stall";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistik"]=I_dot+"statistikler";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["geheZuSeite"]="Sayfaya git";
	texte["geheZuPlatz"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["uebersicht"]=o_dots+"zet";
	texte["scriptHomepage"]="Betik Anasayfas"+i_dotless;
	texte["optionen"]="Se"+c_cedilla+"enekler";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="G"+u_dots+"nl"+u_dots+"k alan kar"+i_dotless;
	texte["rezepte"]="Recipes";
	texte["muehleUnbeschaeftigt"]="Windmill idle";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["zurFarmpedia"]="Zur FarmPedia";
	texte["category"]["v"]="Bitkiler";
	texte["category"]["e"]=I_dot+s_cedilla+"lenmi"+s_cedilla+" "+u_dots+"r"+u_dots+"nler";
	texte["category"]["z"]="S"+u_dots+"s "+u_dots+"r"+u_dots+"nleri";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["zumMarktstand"]="Go to market stall";
	texte["zumSGH"]="Go to shop";
	texte["produktUebersicht"]="Product overview";
	texte["aktuelleAngebote"]="G"+u_dots+"ncel teklifler";
	texte["davor"]="y"+u_dots+"ksek";
	texte["ueberNPC"]="NPC-fiyat"+i_dotless+"n"+i_dotless+"n "+u_dots+"st"+u_dots+"nde";
	texte["ueberX"]="fazla %1%";
	texte["kauf"]="Buy";
	texte["preis"]="Fiyat";
	texte["preise"]="Fiyatlar";
	texte["stueckpreis"]="Birim Fiyat"+i_dotless;
	texte["alle"]="Hepsi";
	texte["produkt"]=U_dots+"r"+u_dots+"n";
	texte["bestand"]="Stok";
	texte["hofpreis"]="NPC-fiyat"+i_dotless;
	texte["beobachtet"]="G"+o_dots+"zlenen";
	texte["marktpreis"]="Pazar&nbsp;Fiyat"+i_dotless;
	texte["abzglGebuehr"]="Kesinti sonras"+i_dotless;
	texte["nimmPreise"]="G"+o_dots+"zlenen fiyatlar"+i_dotless+" kullan";
	texte["lagerwert"]="Stok de"+g_breve+"eri";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickStrg"]="Ctrl+Click";
	texte["laden"]="Load";
	texte["speichern"]="Kaydet";
	texte["commission"]	= "Commission";
	// main
	texte["ausbauenFuerX"]="y"+u_dots+"kseltme&nbsp;"+u_dots+"creti&nbsp;%1%";
	texte["feldLeer"]="Bo"+s_cedilla+" alan!";
	texte["day0"]="Bug"+u_dots+"n";
	texte["day1"]="Yar"+i_dotless+"n";
	texte["day2"]="Ertesi g"+u_dots+"n";
	texte["fertigUmX"]="Hazir %1%";
	texte["YfertigUmX"]="%2% hazir %1%";
	texte["fertigSeitX"]="Finished since %1%";
	texte["seitX"]="since %1%";
	texte["uhr"]="saat";
	texte["stunden"]="h";
	texte["level"]="Seviye";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXBenoetigt"]="Level&nbsp;%1%&nbsp;needed";
	texte["fertig"]="Hazir";
	texte["cropped"]="Cropped";
	texte["spielerSuchen"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1% sec.";
	texte["adEnds"]="Advertising ends today";
	texte["upjersWerbung"]="Upjers-Advertising";
	texte["markt"]="Market";
	texte["quest"]="Quest";
	texte["vertrag"]="Contract";
	texte["ausbaustufe"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["nachrichtSchreiben"]="mesaj yaz";
	texte["vorlage"]="Save as template";
	texte["zurNachricht"]="mesaja git";
	texte["vorigeNachricht"]=o_dots+"nceki mesaj";
	texte["naechsteNachricht"]="sonraki mesaj";
	texte["formatiereZahlen"]="Format numbers";
	// contracts
	texte["vertragSchicken"]="Kontrat yolla";
	texte["vertragNochmalSchicken"]="Send contract again";
	texte["erhalteneVertraege"]="Al"+i_dotless+"nan kontratlar";
	texte["gesendeteVertraege"]="Yollanan kontratlar";
	texte["alte"]="Old";
	texte["XmitVertragAuslagern"]="Store %1% in contract";
	// system messages
	texte["zeigeLog"]="Log g"+o_dots+"ster";
	texte["alleLesen"]="Hepsini oku";
	texte["menge"]="Miktar";
	texte["umsatz"]="Devir";
	texte["gewinn"]="Kar";
	texte["filtern"]="%1% i"+c_cedilla+"in filtrele";
	texte["summiere"]="Summarize";
	texte["filter"]="Filter";
	texte["kaeufer"]="Buyers";
	texte["waren"]="Goods";
	// score history
	texte["tag"]="G"+u_dots+"n";
	texte["punkte"]="Puan";
	texte["platz"]="Rank";
	texte["imLager"]="stokta";
	texte["lagerFehlt"]="Stock %1% missing!!!";
	texte["lagerNiedrig"]="Stok %1% d"+u_dots+s_cedilla+u_dots+"k";
	// overview
	texte["farmi"]="Farmie";
	texte["produkte"]=U_dots+"r"+u_dots+"nler";
	texte["geld"]="Teklif";
	texte["wert"]="De"+g_breve+"er";
	texte["fehlt"]=I_dot+"htiya"+c_cedilla;
	texte["ertrag"]="Verim";
	texte["produktion"]=U_dots+"retim";
	texte["powerups"]="Power-Ups";
	texte["einzel"]="Single";
	texte["total"]="Toplam";
	texte["unbeschaeftigt"]="bo"+s_cedilla+"ta !!";
	texte["dauer"]="s"+u_dots+"re";
	texte["futter"]="Feed";
	texte["bedarf"]="Need";
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valGiess"]=["Otomatik sulama","E"+g_breve+"er 'Hepsini sula' (Premium) varsa, bitkiler dikildikten sonra sulanacaklar."];
	texte["valGiessAnnehm"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valErnte"]=["Otomatik hasat","Tarla a"+c_cedilla+i_dotless+"ld"+i_dotless+g_breve+i_dotless+"nda gerekti"+g_breve+"inde hasat otomatik toplanacak"];
	texte["valGiessNotw"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valErnteMsg"]=["Hasat mesaj"+i_dotless+"n"+i_dotless+" g"+o_dots+"sterme","Kuzunun hasat sonras"+i_dotless+" raporlar"+i_dotless+"ndan rahats"+i_dotless+"z m"+i_dotless+" oluyorsunuz? Buradan kapatabilirsiniz."];
	texte["valLeereFelderLimit"]=["Bo"+s_cedilla+" alan","Bir tarlada ki ekilmemi"+s_cedilla+" alan burada verilen say"+i_dotless+"y"+i_dotless+" ge"+c_cedilla+"erse, o tarla bo"+s_cedilla+" g"+o_dots+"z"+u_dots+"kecek."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRackV"]=["Plants","A plant is marked if its amount in your rack is falling below this value."];
	texte["valMinRackP"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackE"]=["Products","...same for the other products"];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valKauflimitDown"]=["Bottom buy highlight",""];
	texte["valKauflimit"]=["Top Buy limit","Pazardan sadece verilen limit fiyat"+i_dotless+"na kadar "+u_dots+"r"+u_dots+"n alabileceksiniz.  Bu sizin yanl"+i_dotless+s_cedilla+"l"+i_dotless+"kla y"+u_dots+"ksek fiyatl"+i_dotless+" "+u_dots+"r"+u_dots+"nleri alman"+i_dotless+"z"+i_dotless+" engeller."];
	texte["valKauflimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valVerkaufLimit"]=["Sat"+i_dotless+s_cedilla+" limitleri","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPreise"]=["Tek giri"+s_cedilla,"Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valNimmBeob"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirm_NimmBeob"]="The observed prices will overwrite previously saved market prices ...";
	texte["valStatistik"]=["Send statistics","Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivNachr"]=["Number privat messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valNachr"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["allgemein"]="General";
	texte["valAutoLogin"]=["Otomatik giri"+s_cedilla,"Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["G"+u_dots+"ncelle","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valGlobaltimeWindmill"]=["Integrate windmill","Shall the time of the windmill be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache s"+i_dotless+"f"+i_dotless+"rla","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountAktiv"]="Account aktiv";
	texte["server"]="Server";
	texte["ungueltigerServer"]="Hatal"+i_dotless+" server";
	texte["name"]=I_dot+"sim";
	texte["passwort"]=S_cedilla+"ifre";
	texte["loeschen"]="Sil";
	texte["msgUpdate"]="Beti"+g_breve+"in yeni versiyonu bulundu of the Adviser. Kurulsun mu?";
	texte["zeigePasswoerter"]=s_cedilla+"ifreleri g"+o_dots+"ster";
	//help
	texte["zeigeFehlendeProdukte"]="Show product shortage";
	texte["hilfe"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+USO_URL+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["hilfe"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["hilfe"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["hilfe"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["hilfe"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["hilfe"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["hilfe"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["hilfe"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["hilfe"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["hilfe"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["hilfe"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["hilfe"]["Account Manageing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
	break;}
	}
	}
	loadTexte(LNG);

	top.window.wrappedJSObject.GMtexte=texte;
	top.window.wrappedJSObject.GMlng=LNG;
	top.window.wrappedJSObject.GMdelimThou=delimThou;
	top.window.wrappedJSObject.GMregDelimThou=regDelimThou;
	top.window.wrappedJSObject.GMregDelimThou2=regDelimThou2;
	top.window.wrappedJSObject.GMregDelimThou3=regDelimThou3;
	top.window.wrappedJSObject.GMdelimDeci=delimDeci;
	top.window.wrappedJSObject.GMregDelimDeci=regDelimDeci;
	top.window.wrappedJSObject.GMdateFormatDM=dateFormatDM;
	top.window.wrappedJSObject.GMdateFormatDMY=dateFormatDMY;
}else{
	texte=top.window.wrappedJSObject.GMtexte;
	LNG=top.window.wrappedJSObject.GMlng;
	delimThou=top.window.wrappedJSObject.GMdelimThou;
	regDelimThou=top.window.wrappedJSObject.GMregDelimThou;
	regDelimThou2=top.window.wrappedJSObject.GMregDelimThou2;
	regDelimThou3=top.window.wrappedJSObject.GMregDelimThou3;
	delimDeci=top.window.wrappedJSObject.GMdelimDeci;
	regDelimDeci=top.window.wrappedJSObject.GMregDelimDeci;
	dateFormatDM=top.window.wrappedJSObject.GMdateFormatDM;
	dateFormatDMY=top.window.wrappedJSObject.GMdateFormatDMY;
}
regDelimThou=new RegExp(regDelimThou,"g");
regDelimDeci=new RegExp(regDelimDeci);
if(LNG==null){ return false; }

// Events
if(DEVMODE_EVENTS&&(self==top)){
	var allEvents=new Array();
	// list of events:
	allEvents.push("gameWindowContractNew");			// "create new contract"-frame is loaded
	allEvents.push("gameChangedProdMinRackInit");		// prodMinRackInit	is saved (rack amount detail configuration, market-frame)
	allEvents.push("gameChangedProdMinRackAddon");		// prodMinRackAddon	is saved
	allEvents.push("gameChangedGut");					// gut is saved (market-frame)
	allEvents.push("gameChangedBeobPrice");				// beobPrice is saved (market-frame)
	allEvents.push("gameChangedMarketOffers");			// marketOffers is saved (market-frame)
	allEvents.push("gameChangedLevelLog");				// levelLog is saved (message-frame)
	allEvents.push("gameOtherAccReady");				// another account needs to be worked
	allEvents.push("gameSessionEnds");					// the session ends soon (max 120s)
	allEvents.push("gameInfoPanelOpen");				// the infoPanel is opened and filled
	allEvents.push("gameInfoPanelOptions");				// the infoPanel has the option-tab loaded
	allEvents.push("gameUpdateRack");					// the rack has loaded
	allEvents.push("gameUpdateFarm");					// a farm is loaded
	allEvents.push("gameFieldModified");				// the plants on the opened field are loaded
	allEvents.push("gameFarmiNew");						// a new farmi is appeared
	allEvents.push("gameFarmiResponse");			// a farmi is been rejected or accepted.
	allEvents.push("gameOpenField");					// a field is opened
	allEvents.push("gameOpenStable");					// a stable is opened
	allEvents.push("gameOpenFactory");					// a factory is opened
	allEvents.push("gameOpenWindmill");					// the windmill is opened
	allEvents.push("gameCity1");						// city 1 is opened
	allEvents.push("gameCity2");						// city 2 is opened
	allEvents.push("gameLotteryOpen");					// lottery frame is opened
	allEvents.push("gameLotteryGotDailyLot");			// daily lot is taken
	allEvents.push("gameLotteryGotLot");				// lot decision question is shown
	allEvents.push("gameLotteryGotPrize");				// got price
	allEvents.push("gameLotteryDailyLotAvailable");		//
	allEvents.push("gameQuestNewAvailable"); 			// There is a new quest that can be played
	allEvents.push("gameQuestAccepted"); 				// Quest is accepted
	allEvents.push("gameQuestActive"); 					// There is an activated quest
	allEvents.push("gameQuestFinished"); 				// Quest is finished
	allEvents.push("gameQuestSolvable");
	allEvents.push("gameNewDay");						// a new day started
	allEvents.push("gameWindmillReady");				// the windmill is ready
	allEvents.push("gameZoneReady"); 					// a zone is ready. GMreadyZone is set
	allEvents.push("gameUpdateFormuladealerOffers");	// the formuladealer has filled the offers
	allEvents.push("gameUpdateFormuladealerRack");		// the formuladealer has filled the recipes rack
	allEvents.push("gamePowerupActivated");				// a powerup has been executed
	allEvents.push("gameReallocateBuilding");			// 2 buildings are swapped. GMreallocateBuildingSet is set [1..18,1..18]
	allEvents.push("gameUserlevelUp");					// a new level is reached
	allEvents.push("nodeInsertedWindmillBeraterTime");	// the node 'windmillBeraterTime' is created
	allEvents.push("nodeModifiedWindmillBeraterTime");	// the node 'windmillBeraterTime' has changed one of its attributes
	for(var i=0;i<timerBuildingNames.length;i++){
		BName=timerBuildingNames[i].capitalize();
		allEvents.push("nodeInserted"+BName+"BeraterTime");	// the node 'xxxBeraterTime' is created
		allEvents.push("nodeModified"+BName+"BeraterTime");	// the node 'xxBeraterTime' has changed one of its attributes
	}
	allEvents.push("nodeModifiedZone1");				// the 1. zone-area is loaded (not opened)
	allEvents.push("nodeModifiedZone2");
	allEvents.push("nodeModifiedZone3");
	allEvents.push("nodeModifiedZone4");
	allEvents.push("nodeModifiedZone5");
	allEvents.push("nodeModifiedZone6");
	allEvents.push("beraterDone");						// script successfully executed

	for(var v=0;v<allEvents.length;v++){
		document.addEventListener(allEvents[v],function(event){ showInLogBubble("Event:&nbsp;"+event.type,10,"#099"); },false);
	}
	allEvents=null;
}

var loc=new RegExp("s(\\d+)\\."+GAMEPAGES[LNG].replace(/\./g,"\\."),"i").exec(location.hostname);
if(loc){
	SERVER=loc[1];
	PAGE=location.pathname.replace(/^\//,"").replace(/\.php.*$/,"");
	if(DEVMODE){ GM_log("PAGE:"+PAGE+" location.pathname:"+location.pathname); }

	_GM_log=GM_log;
	GM_log = function(txt){
		_GM_log(LNG.toUpperCase()+"-"+SERVER+": "+txt);
	};
	TOOLTIP=$top("divToolTip");
	if((TOOLTIP==null)&&(self==top)){
		TOOLTIP=createElement("div",{"id":"divToolTip","style":"z-index:999;position:absolute;overflow:visible;display:none;-moz-border-radius:5px;","class":"blackbox"},ALL);
	}else{
		hideToolTip(); // important when a frame loads while tooltip opened
	}
	window.addEventListener("mousemove",function(evt){
		if(TOOLTIP.style.display!="none"){
			var help=getOffset(frameElement);
			var cleft=(evt.pageX+help.left-(TOOLTIP.offsetWidth/3));
			var mleft=Math.min(0,(top.document.body.clientWidth - cleft - TOOLTIP.offsetWidth));
			TOOLTIP.style.left=cleft + mleft + "px";
			TOOLTIP.style.top=(((top.document.body.clientHeight - evt.pageY+help.top - 25 - TOOLTIP.offsetHeight)<0)?(evt.pageY+help.top-25-TOOLTIP.offsetHeight):(evt.pageY+help.top+25)) + "px";
		}
	},false);

	LOG_BUBBLE_BOX=$top("divLogBubbleBox");
	if((LOG_BUBBLE_BOX==null)&&(self==top)){
		LOG_BUBBLE_BOX=createElement("div",{"id":"divLogBubbleBox","style":"position:fixed;right:0;bottom:0;z-index:999;","isMouseOver":"0"},ALL);
		LOG_BUBBLE_BOX.addEventListener("DOMNodeInserted",function(event){
			if((!clearLogBubbleActive)&&(event.target.parentNode==this)){ clearLogBubble(); }
		},false);
		LOG_BUBBLE_BOX.addEventListener("mouseover",function(event){
			this.setAttribute("isMouseOver","1");
		},false);
		LOG_BUBBLE_BOX.addEventListener("mouseout",function(event){
			this.setAttribute("isMouseOver","0");
		},false);
	}

	USERNAME=GM_getValue(LNG+"_"+SERVER+"_username","");
	unsafeWindow.GMusername=USERNAME;
	FARMNAME=$top("username")?$top("username").innerHTML:GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_farmname","");
	try{ NPCSAISON=explode(GM_getValue(LNG+"_"+SERVER+"_NpcSaison")); }catch(err){}

	// CSS
	GM_addStyle(
		"input:hover{background-color:#cc9!important;}\n"+
		"button:hover{background-color:#cc9!important;}\n"+
		"button:hover{background-color:#cc9!important;}\n"+
		".headercell {border-bottom:1px dashed #f0ffef;color:#f0ffef;font-weight:bold;}\n"+
		"table.white td {color:white!important;}\n"+
		"table.white th {color:white!important;border-bottom:1px solid white;}\n"+
		"table.white a {color:white!important;}\n"+
		"th{font-weight:bold;}\n"+
		".borderTop1dashedWhite td,.borderTop1dashedWhite th{border-top:1px dashed white!important;}\n"+
		".borderTop1dashedBlack td,.borderTop1dashedBlack th{border-top:1px dashed black!important;}\n"
	);
	//	".sortableCol{}\n"+
	//	".scrollTable>thead>tr>th:last-child,.scrollTable>tbody>tr>td:last-child,.scrollTable>tfoot>tr>td:last-child{padding-right:20px;}\n"+
	//	".scrollTable>tbody{overflow-y:auto;overflow-x:hidden;}\n"+
	GM_addStyle(
		".sortableColAsc{background-color:lightblue!important;}\n"+
		".sortableColDesc{background-color:lightblue!important;}\n"+

		".hoverBlack:hover,div.hoverBlack:hover div{color:black!important;}\n"+
		".hoverRowBgCc9 tr:hover{background-color:#cc9!important;}\n"+
		".hoverRowBgLightblue>tr:hover{background-color:lightblue!important;}\n"+
		".hoverRowBgLightbrown>tr:hover{background-color:#e4b55d!important;}\n"+
		".hoverBgBlue:hover{background-color:blue!important;}\n"+
		".hoverBgCc9:hover{background-color:#cc9!important;}\n"+
		".hoverBgDarkgreen:hover{background-color:#084200!important;}\n"+
		".hoverBgGreen:hover{background-color:green!important;}\n"+
		".hoverBgGold:hover{background-color:gold!important;}\n"+
		".hoverBgLightblue:hover{background-color:lightblue!important;}\n"+
		".hoverBgLightbrown:hover{background-color:#e4b55d!important;}\n"+
		".hoverBgRed:hover{background-color:red!important;}\n"
	);
	GM_addStyle(".hoverNoTextDecoration:hover,td.hoverNoTextDecoration:hover,span.hoverNoTextDecoration:hover{text-decoration:none!important;}"); // TODO
	GM_addStyle(".v97{background-position: -240px -120px!important;}"); // bugfix Weihnachtsstern
	GM_addStyle(".v104{background-position: -180px -300px!important;}"); // bugfix Osterglocke
	GM_addStyle(
		".playerMsg{float:left;margin-right:7px;background-image:url('"+GFX+"guild/mail.gif');background-position:0px -3px;}\n"+
		".playerMsg div{width:15px;height:12px;opacity:0.5;}\n"+
		".playerMsg div:hover{background-color:blue;}\n"+
		".playerContract{float:left;margin-right:5px;background-image:url('"+GFX+"guild/contract.gif');background-position:-2px 0px;}\n"+
		".playerContract div{width:11px;height:15px;opacity:0.5;}\n"+
		".playerContract div:hover{background-color:blue;}\n"+
		".playerStats{float:left;margin-right:5px;background-image:url('"+GFX+"stadt/stats_sf_black.gif');background-repeat:no-repeat;background-position:0px 2px;}\n"+
		".playerStats div{position:relative;top:1px;width:11px;height:9px;opacity:0.5;-moz-border-radius:5px;}\n"+
		".playerStats div:hover{background-color:blue;}\n"
	);

	if(!GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valGamecursor",true)){
		GM_addStyle(
			"BODY,.normal,.normal2{cursor:default;}\n"+
			".link,.link2{cursor:pointer!important;;}\n"+
			"TEXTAREA,.text,.text2{cursor:text!important;}\n"
		);
	}

// **************************************************

// ChangeData
/*
if(GM_getValue("changedata",99)<4){

	GM_setValue("changedata",4);
}
*/

// **************************************************

	hotkeymap=explode(GM_getValue("hotkeymap",'{"prevPage":37,"nextPage":39,"farm1":49,"farm2":50,"farm3":51,"guild":52,"city1":53,"city2":54,"farmilog":70,"help":72,"market":77,"marketstand":188,"messages":78,"options":79,"profit":80,"sgh":83,"overview":85,"contract":86,"systemmessage":88}'));
	//Hotkeys
	if (GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valHotkey",true)){
		window.addEventListener("keydown",function(event){
			if(event.keyCode==27){  // Esc
				if(unsafeWindow.city){ top.window.wrappedJSObject.initCity(unsafeWindow.city); event.preventDefault(); }
				else{ top.window.wrappedJSObject.showMain(); event.preventDefault(); }
				closeInfoPanel();
			}
			if (event.altKey){
			switch (event.keyCode){
			case hotkeymap["prevPage"]: if(($top("ackerNavi"))&&($top("ackerNavi").firstElementChild)){ click($top("ackerNavi").firstElementChild); event.preventDefault();}
					else if(($top("zoneNavi"))&&($top("zoneNavi").firstElementChild)){ click($top("zoneNavi").firstElementChild); event.preventDefault();}
					else if($top("prevPage")){ click($top("prevPage")); event.preventDefault();}
					else if($("prevPage")){ click($("prevPage")); event.preventDefault();}
			break;
			case hotkeymap["nextPage"]: if(($top("ackerNavi"))&&($top("ackerNavi").lastChild)){ click($top("ackerNavi").lastChild); event.preventDefault();}
					else if(($top("zoneNavi"))&&($top("zoneNavi").lastChild)){ click($top("zoneNavi").lastChild); event.preventDefault();}
					else if($top("nextPage")){ click($top("nextPage")); event.preventDefault();}
					else if($("nextPage")){ click($("nextPage")); event.preventDefault();}
			break;
			case hotkeymap["farm1"]: top.window.wrappedJSObject.initZones(1); top.window.wrappedJSObject.showMain(); event.preventDefault(); break; // 1:Farm 1
			case hotkeymap["farm2"]: if(parseInt(top.window.wrappedJSObject.farmamount,10)>1){ top.window.wrappedJSObject.initZones(2); top.window.wrappedJSObject.showMain(); event.preventDefault(); } break; // 2:Farm 2
			case hotkeymap["farm3"]: if(parseInt(top.window.wrappedJSObject.farmamount,10)>2){ top.window.wrappedJSObject.initZones(3); top.window.wrappedJSObject.showMain(); event.preventDefault(); } break; // 3:Farm 3
			case hotkeymap["guild"]: top.window.wrappedJSObject.showMain(); top.window.wrappedJSObject.initGuild(); event.preventDefault(); break; // 4:Club
			case hotkeymap["city1"]:
				if($top("citylineitem1")){ click($top("citylineitem1")); }
				else{
					if($top("citymaincontainer").style.display=="block"){
						if($top("cityzone_2_3")){ click($top("cityzone_2_3")); }
					}else{
						click($top("menueimg0"));
					}
				}
				event.preventDefault(); break; // 5:Dorf1
			case hotkeymap["city2"]:
				if($top("citylineitem2")){ click($top("citylineitem2")); }
				else{
					if($top("citymaincontainer").style.display=="block"){
						if($top("cityzone_1_9")){ click($top("cityzone_1_9")); }
					}else{
						click($top("menueimg0"));
						var gotocitytimeout=window.setInterval(function(){
							if($top("cityzone_1_9")){
								click($top("cityzone_1_9"));
								clearTimeout(gotocitytimeout);
							}
						},200);
					}
				}
				event.preventDefault(); break; // 6:Dorf2
			case hotkeymap["farmilog"]: click($top("customerstats")); event.preventDefault(); break; // F:FarmiLog
			case hotkeymap["help"]: click($top("menueimg4")); event.preventDefault(); break; // H:Hilfe
			case hotkeymap["market"]: showMarket(); event.preventDefault(); break; // M:Markt
			case hotkeymap["marketstand"]: showMarketStall(); event.preventDefault(); break; // ,:Marktstand
			case hotkeymap["messages"]: click($top("menueimg1")); event.preventDefault(); break; // N:Nachrichten
			case hotkeymap["options"]: click($top("berateroptionen")); event.preventDefault(); break; // O:Optionen
			case hotkeymap["profit"]: click($top("profitcalc")); event.preventDefault(); break; // P:Profit
			case hotkeymap["sgh"]: showSGH(); event.preventDefault(); break; // S:SGH
			case hotkeymap["overview"]: click($top("titlepig")); event.preventDefault(); break; // U:Uebersicht
			case hotkeymap["contract"]: click($top("menueimg2")); event.preventDefault(); break; // V:Vertrag
			case hotkeymap["systemmessage"]: if (GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doread","")){
						var help=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_nachrichten_doread","").split("|");
						showMessage("system","1",help[help.length-1],0);
					}else{
						showMultiframePage("nachrichten/system.php");
					} event.preventDefault(); break; // X:next Message/Systemmessages
			}
			}
		},false);
	}
	if(DEVMODE){ GM_log("loading page:"+PAGE); }
	switch (PAGE){
		case "stadt/markt":			do_markt();break;
		case "stadt/marktstand":	do_marktstand();break;
		case "stadt/shop":			do_shop();break;
		case "stadt/stats":			do_stats();break;
		case "stadt/wettbewerb":	do_wettbewerb();break;
		case "main":				do_main();break;
		case "nachrichten/read":	do_multiframe();do_nachrichten_read();break;
		case "nachrichten/new":		do_multiframe();do_nachrichten_new();break;
		case "nachrichten/inbox":	do_multiframe();do_nachrichten_inbox();break;
		case "nachrichten/outbox":	do_multiframe();do_nachrichten_outbox();break;
		case "nachrichten/contact":	do_multiframe();do_nachrichten_contact();break;
		case "nachrichten/system":	do_multiframe();do_nachrichten_system();break;
		case "vertraege/new":		do_multiframe();do_vertraege_head();do_vertraege_new();break;
		case "vertraege/overview":	do_multiframe();do_vertraege_head();do_vertraege_overview();break;
		case "vertraege/show":		do_multiframe();do_vertraege_head();do_vertraege_show();break;
		case "nutzer/profil":		do_multiframe();break;
		case "nutzer/usecoins":		do_multiframe();break;
		case "hilfe":				do_multiframe();do_hilfe();break;
		case "login":				do_login();break;
	}
}else{
	do_login();
}
unsafeWindow.GMberaterDone=true;
raiseEvent("beraterDone");
},false);
