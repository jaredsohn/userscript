// ==UserScript==
// @name           MyFreeFarm Rackoverview
// @namespace      http://userscripts.org/scripts/show/85587
// @description    Gives an overview of your products
// @version        1.1.8
// @date           24.04.2012
// @include        http://s*.myfreefarm.*/main.php*
// @include        http://s*.mabelleferme.fr/main.php*
// @include        http://s*.wolnifarmerzy.pl/main.php*
// @include        http://s*.enkicsitanyam.hu/main.php*
// @include        http://s*.tr.myfreefarm.com/main.php*
// @include        http://s*.pt.myfreefarm.com/main.php*
// @include        http://s*.mojaderewnja.ru/main.php*
// @include        http://s*.veselaferma.com/main.php*
// @include        http://s*.migranjalinda.es/main.php*
// @require        http://userscripts.org/scripts/source/94946.user.js
// ==/UserScript==
//GM_log("Run Code Rackoverview :"+location.href);

const VERSION = "1.1.8";
const neededVersionBerater = "1.4.15";
const neededVersionFunctionFile = "1.0.30";
const USO_ID = "85587";
const USO_Home  ="http://userscripts.org/scripts/show/"+USO_ID; //GM_info["script"]["namespace"]
const USO_Source="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
const USO_Meta  ="http://userscripts.org/scripts/source/"+USO_ID+".meta.js";
if(NEVER==undefined){ 
	alert("Hi, I am the Rackoverview-Script.\nThe function-file is missing.\nPlease install me again.");
	location.href = USO_Source;
} else if(compareVersions(neededVersionFunctionFile,VERSIONfunctionFile)>0){
	alert("Hi, I am the Rackoverview-Script.\nThe function-file is too old.\nPlease install me again.");
	location.href = USO_Source;
}
var DEVMODE=GM_getValue("devmode",false);
var DEVMODE_EVENTS=GM_getValue("devmode_events",false);
var DEVMODE_FUNCTION=GM_getValue("devmode_function",false);

const EMPTYFILE = ["FARMNAME",0,[],0,1,1,0,[]];
var FARMNAME = null;
var FARMNR = null;
var bestand = new Array();
// bestand[int] = [farmName(string),money(int),rack(array of int),points(int),level(int),quest(int),quest-calc-to(int),missing amounts for quests(array of int)]
var prodTotal = new Array;
var productStatTime = 0;
var todayTime = new Date();
todayTime = Math.round(new Date(todayTime.getFullYear(),todayTime.getMonth(),todayTime.getDate(),0,0,0,0).getTime()/1000);

function showMarket(pid){
	var cell = $top("shop");
	if(cell){
		if (top.window.wrappedJSObject.city!=1){		
			top.document.addEventListener("gameCity1",function(){
				top.document.removeEventListener("gameCity1",arguments.callee,false);
				showMarket(pid);
			},false);
			click($top("citylineitem1"));
		} else if (cell.style.display!="block"){
			cell.style.display = "block";
			cell.style.visibility = "visible";
			cell = $top("transp3");
			cell.style.display = "block";
			cell.style.visibility = "visible";
			showMarket(pid);
		} else {
			$top("shopframe").src = "http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/markt.php"+(typeof pid!="undefined"?"?page=1&order=p&id="+pid+"&filter=1&guild=0":"");;
		}		
		//closeInfoPanel();		
	} else {
		location.href = "http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/markt.php"+(typeof pid!="undefined"?"?page=1&order=p&id="+pid+"&filter=1&guild=0":"");;
	}
}
function readProductStat(){
	GM_log("readProductStat "+LNG+"."+SERVER);
	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/stats.php?type=18&PAGE=1",
	  headers:{
	    'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; nl; rv:1.9.2.10) Gecko/20100914 Firefox/3.6.10 ( .NET CLR 3.5.30729; .NET4.0C)'
	  },
	  onerror: function(){
 			alert("error");
	  },
	  onload: function(response) {
	    if (response.responseText) {
	    try{
	     	//GM_log(response.responseText.match(/<div id=\"rankinghead\"(?:\s+(?:.|\n)*?)?>&nbsp;<\/div>((.|\n)*)<div id=\"rankingnavi\"/)[1]);
	     	newdiv = createElement("div");
	     	newdiv.innerHTML = response.responseText.match(/<div id=\"rankinghead\"(?:\s+(?:.|\n)*?)?>&nbsp;<\/div>((.|\n)*)<div id=\"rankingnavi\"/)[1].replace(/^\s+|\s+$/g,"").replace(/<\/br>/g,"");
	     	if (newdiv.firstElementChild.id == "rankingcontent"){
		     	for (var v=0;v<newdiv.firstElementChild.children.length;v++){
		     		var iprod = newdiv.firstElementChild.children[v].firstElementChild.innerHTML;
			     	//GM_log(prodId[iprod] + " : " + iprod);
			     	if(!top.unsafeData.prodId[0][iprod]) GM_log("error:" + iprod);
			    	try{
			     		prodTotal[top.unsafeData.prodId[0][iprod]] = newdiv.firstElementChild.children[v].children[2].innerHTML;
			     	}catch(err){
			     		GM_log("error:"+err+" iprod:"+iprod+" prodId[0][iprod]:"+top.unsafeData.prodId[0][iprod]);
			     	}
					}
				}
			//GM_log("prodTotal :" + print_r(prodTotal));
			//GM_log("todayTime :" + todayTime);
			productStatTime = todayTime;
			GM_setValue(LNG+"_"+SERVER+"_productStatTime", productStatTime);
			GM_setValue(LNG+"_"+SERVER+"_productStat", implode(prodTotal));
	    }catch(err){GM_log("error" + err);}
	    }
	  }
	});
}
function closeInfoPanel(){
	click($("infoPanelClose"));
}
function buildInfoPanel(mode,mode2){
	if(mode2==undefined){ mode2 = ""; }
	var container = $("infoPanel");
	if((container.style.zIndex=="101")&&(mode==container.getAttribute("mode"))&&(implode(mode2)==container.getAttribute("mode2"))){
		closeInfoPanel();
	} else {
		container.setAttribute("mode",mode);
		container.setAttribute("mode2",implode(mode2));
		container.style.display = "block";
		container.style.zIndex = "101";
    
		container = $("infoPanelInner");
		container.innerHTML = "";
		container.style.width = "90%";
		container.style.background = "";
		
		$("multiframe").style.zIndex = "99";
		$("transp100").style.display = "block";

		switch(mode){
		case "rackoverview":{
			if(mode2){ 
				GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_modeRackoverview",mode2);
			} else {
				mode2 = GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_modeRackoverview","cveoz"); 
			}
			
			var newdiv = createElement("div",{"id":"offertypeselector","class":"productSort","style":"position:absolute;top:0px;left:0px;-moz-user-select:none;"},container);
			newdiv.addEventListener("mouseover",function(event){
				var mouseOverText = event.target.getAttribute("mouseOverText");
				if(mouseOverText){
					mouseOverText = '<div>'+texte["click"]+'&nbsp;/&nbsp;'+texte["clickStrg"]+'</div><div>'+mouseOverText+'</div>';
					showToolTip(event,mouseOverText);
				}
			},false);
			var newdiv1 = createElement("div",{"mouseOverText":texte["category"]["v"],"class":"link","style":"float:left;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -10px 0px transparent;"},newdiv);
			if (mode2.match(/v/)) {
				newdiv1.style.backgroundPosition="-10px -20px";
			} else { 
				newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-10px 0px";},false); 
				newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-10px -20px";},false);
			}
			newdiv1.addEventListener("click",function(event){
				if(event.ctrlKey){
					if(mode2.match(/v/)){ mode2=mode2.replace(/v/,""); }
					else { mode2 += "v"; }
				} else { mode2 = "v"; }
				$("infoPanel").setAttribute("mode","");
				buildInfoPanel("rackoverview",mode2);
			},false);
			
			newdiv1 = createElement("div",{"mouseOverText":texte["category"]["c"]+"<br>"+texte["category"]["e"],"class":"link","style":"float:left;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -62px 0px transparent;"},newdiv);
			if (mode2.match(/c/)&&mode2.match(/e/)) {
				newdiv1.style.backgroundPosition="-62px -20px";
			} else { 
				newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-62px 0px";},false); 
				newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-62px -20px";},false);
			}
			newdiv1.addEventListener("click",function(event){
				if(event.ctrlKey){
					if(mode2.match(/ce/)){ mode2=mode2.replace(/ce/,""); }
					else { mode2 += "ce"; }
				} else { mode2 = "ce"; }
				$("infoPanel").setAttribute("mode","");
				buildInfoPanel("rackoverview",mode2);
			},false);
			
			newdiv1 = createElement("div",{"mouseOverText":texte["category"]["o"],"class":"link","style":"float:left;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -62px 0px transparent;"},newdiv);
			if (mode2.match(/o/)) {
				newdiv1.style.backgroundPosition="-62px -20px";
			} else { 
				newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-62px 0px";},false); 
				newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-62px -20px";},false);
			}
			newdiv1.addEventListener("click",function(event){
				if(event.ctrlKey){
					if(mode2.match(/o/)){ mode2=mode2.replace(/o/,""); }
					else { mode2 += "o"; }
				} else { mode2 = "o"; }
				$("infoPanel").setAttribute("mode","");
				buildInfoPanel("rackoverview",mode2);
			},false);
			
			newdiv1 = createElement("div",{"mouseOverText":texte["category"]["z"],"class":"link","style":"float:left;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -36px 0px transparent;"},newdiv);
			if (mode2.match(/z/)) {
				newdiv1.style.backgroundPosition="-36px -20px";
			} else { 
				newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-36px 0px";},false); 
				newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-36px -20px";},false);
			}
			newdiv1.addEventListener("click",function(event){
				if(event.ctrlKey){
					if(mode2.match(/z/)){ mode2=mode2.replace(/z/,""); }
					else { mode2 += "z"; }
				} else { mode2 = "z"; }
				$("infoPanel").setAttribute("mode","");
				buildInfoPanel("rackoverview",mode2);
			},false);
			
			var newtable = createElement("table",{"border":"1"},container);
			newtable.addEventListener("mouseover",function(event){
				var node = event.target;
				while((node!=this)&&(!node.getAttribute("mouseOverText"))){ node = node.parentNode; }
				if(node!=this){ showToolTip(event,node.getAttribute("mouseOverText"),this); }
			},false);
			var newtr = createElement("tr",{},newtable);
			var newtd = createElement("td",{},newtr);
			for(var farm=0;farm<bestand.length;farm++){
				createElement("td",{"style":"text-align:center;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,bestand[farm][0]);
			}
			if(bestand.length>1){
				createElement("td",{"style":"text-align:center;"},newtr,"\u03A3");
			}
			createElement("td",{"style":"text-align:center;",title:getDateStr(productStatTime/1000)},newtr,"Stat Total");
			createElement("td",{"style":"text-align:center;"},newtr,"Total");

			var oldclass = "c";

			newtr = createElement("tr",{},newtable);
			newtd = createElement("td",{},newtr,unsafeWindow.t_money);
			var sum = 0;
			for(var farm=0;farm<bestand.length;farm++){
				sum += bestand[farm][1];
				createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,numberFormat(bestand[farm][1]));
			}
			if(bestand.length>1){
				createElement("td",{"style":"text-align:right;"},newtr,numberFormat(sum));
			}

			newtr = createElement("tr",{},newtable);
			newtd = createElement("td",{},newtr,unsafeWindow.t_points);
			for(var farm=0;farm<bestand.length;farm++){
				createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,numberFormat(bestand[farm][3]));
			}
			if(bestand.length>1){
				createElement("td",{"style":"text-align:right;"},newtr,"");
			}

			newtr = createElement("tr",{},newtable);
			newtd = createElement("td",{},newtr,unsafeWindow.guildquestlist_level.replace(/:/,""));
			for(var farm=0;farm<bestand.length;farm++){
				createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,numberFormat(bestand[farm][4]));
			}
			if(bestand.length>1){
				createElement("td",{"style":"text-align:right;"},newtr,"");
			}

			newtr = createElement("tr",{},newtable);
			newtd = createElement("td",{},newtr,"Quest Farm 1");
			for(var farm=0;farm<bestand.length;farm++){
				createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,numberFormat(bestand[farm][5]));
			}
			if(bestand.length>1){
				createElement("td",{"style":"text-align:right;"},newtr,"");
			}

			newtr = createElement("tr",{},newtable);
			newtd = createElement("td",{},newtr,"Quest Farm 1 to");
			for(var farm=0;farm<bestand.length;farm++){
				if (FARMNR==farm){
					newtd = createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr);
					var newsel = createElement("select",{"id":"questselect","style":"width:100%;height:18px;direction:rtl"},newtd);
					createElement("option",{"value":0},newsel,"-");
					for(var i=bestand[farm][5];i<unsafeData.QUESTS["farm"]["1"].length;i++){
						createElement("option",{"value":i},newsel,i);
					}
					newsel.addEventListener("change",function(){
						bestand[FARMNR][6] = parseInt(this.value,10);
						bestand[FARMNR][7] = new Array();
						var item;
						for(var v=bestand[FARMNR][5];v<=bestand[FARMNR][6];v++) {
							for(var i=0;i<unsafeData.QUESTS["farm"]["1"][v][0].length;i++){
								item = unsafeData.getQuestBestAlternative(unsafeData.QUESTS["farm"]["1"][v][0][i]);
								if (!bestand[FARMNR][7][item[1]]) bestand[FARMNR][7][item[1]] = 0;
								bestand[FARMNR][7][item[1]] += item[2];
							}
						}
						item=null;
						GM_setValueCache(LNG+"_"+SERVER+"_rackoverview",implode(bestand));
						$("infoPanel").setAttribute("mode","");
						buildInfoPanel("rackoverview");
					},false);
					newsel.value = bestand[farm][6];
					newsel=null;i=null;
				}else{
					createElement("td",{"style":"text-align:right;"},newtr,numberFormat(bestand[farm][6]));
				}
			}
			if(bestand.length>1){
				createElement("td",{"style":"text-align:right;"},newtr,"");
			}
			for(var v=0;v<unsafeData.prodNameSort[0].length;v++){
				var w = unsafeData.prodNameSort[0][v];
				var showProduct = false;
				for(var farm=0;farm<bestand.length;farm++){
					if((!showProduct)&&(mode2.search(unsafeData.prodTyp[0][w])>-1)){
						if((bestand[farm][2][w]>-1)||(bestand[FARMNR][7][w]>0)){ showProduct = true; }
					}
				}
				if(showProduct){
					if(oldclass!=unsafeData.prodTyp[0][w]){
						createElement("td",{"colspan":bestand.length+3},createElement("tr",{},newtable));
						oldclass = unsafeData.prodTyp[0][w];
					}
					newtr = createElement("tr",{},newtable);
					newtd = createElement("td",{},newtr);
					produktPic(0,w,newtd);
					if (!unsafeData.prodBlock[0][w].match(/[lt]/)){ // if (unsafeData.prodBlock[w].match(/^[lt]*$/)) {
						newtd.setAttribute("mouseOverText",texte["goToMarketOfX"].replace("%1%",unsafeData.prodName[0][w]));
						newa = createElement("a",{"id":w},newtd,unsafeData.prodName[0][w]);
						newa.setAttribute("class","link");
						newa.addEventListener("click",function(){showMarket(this.id);},false);
					}else{
						createElement("span",{"id":w},newtd,unsafeData.prodName[0][w]);
					}
	
					sum = 0;
					for(var farm=0;farm<bestand.length;farm++){
GM_log(farm);					
GM_log(implode(bestand[farm]));					
						if(bestand[farm][2][w]>-1){ //product amount
							sum += bestand[farm][2][w];
							if (bestand[farm][7].length > 1){
								newtd = createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr);
								createElement("span",{"style":"text-align:right;"},newtd,numberFormat(bestand[farm][2][w]));
								if (!!bestand[farm][7][w] && bestand[farm][7][w]>0){
									if ((bestand[farm][2][w] - bestand[farm][7][w])<0){
										createElement("span",{"style":"color:#cc0000;"},newtd," ("+numberFormat(bestand[farm][2][w]-bestand[farm][7][w])+ ")");
									}else{
										createElement("span",{"style":"color:green;"},newtd," (+"+numberFormat(bestand[farm][2][w]-bestand[farm][7][w])+")");
									}
								}
							}else{
								createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,numberFormat(bestand[farm][2][w]));
							}
						} else {
							if (bestand[farm][7].length > 1){
								newtd = createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr);
								//createElement("span",{"style":"text-align:right;"},newtd,"--");
								createElement("span",{"style":"text-align:right;color:blue;padding:0px 2px 0px 2px;"},newtd,"Lvl&nbsp;" + unsafeWindow.produkt_level[w]);
								if (!!bestand[farm][7][w] && bestand[farm][7][w]>0){
									createElement("span",{"style":"color:#cc0000;"},newtd,"( -"+numberFormat(bestand[farm][7][w])+ " )");
								}
							}else{
								createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,"--");
							}
						}
					}
					if(bestand.length>1){
						createElement("td",{"style":"text-align:right;"},newtr,numberFormat(sum));
					}
					createElement("td",{"style":"text-align:right;"},newtr,numberFormat(prodTotal[w]));
					createElement("td",{"style":"text-align:right;"},newtr,numberFormat(sum/prodTotal[w]*10000,0)+" "+sign_basepoint);
				}
			}
			newtr = createElement("button",{"class":"link"},container,"Clear all data");
			newtr.addEventListener("click",function(){
				FARMNR = 0;
				bestand=[EMPTYFILE];
				bestand[FARMNR][0]=FARMNAME;
				for (var v=0;v<unsafeData.prodName[0].length;v++){
					bestand[FARMNR][2][v] = -1;
				}
				GM_setValue(LNG+"_"+SERVER+"_rackoverview",implode(bestand));
				closeInfoPanel();
			},false);
			newtable=null;newtr=null;newtd=null;newdiv=null;newdiv1=null;
			break;
		}
		default:
			break;
		}
	}
	container=null;
}//end buildinfo

function do_main(){
	TOOLTIP = $top("divToolTip");
	LOG_BUBBLE_BOX = $top("divLogBubbleBox");
	texte = unsafeData.texte;
	texte["rackoverview"] = new Object();
	LNG = unsafeData.LNG;
	SERVER = (new RegExp("s(\\d+)\\."+GAMEPAGES[LNG].replace(/\./g,"\\."),"i").exec(location.hostname))[1];
	PAGE = location.pathname.replace(/^\//,"").replace(/\.php.*$/,"");
	delimThou = unsafeData.delimThou;
	regDelimThou = new RegExp(unsafeData.regDelimThou,"g");
	delimDeci = unsafeData.delimDeci;
	regDelimDeci = new RegExp(unsafeData.regDelimDeci);

	switch (LNG){
		case "au":case "nz":case "uk":case "us": {
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "bu":{
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "de":{
			texte["rackoverview"]["msgUpdate"] = "Es liegt eine neue Script-Version vor rackoverview. Diese installieren?";
			texte["rackoverview"]["shouldUpdateBerater"] = "Du solltest das Berater-Script aktualisieren!<br>Der Rackoverview-Script wird nicht ordnungsgem"+a_dots+sz+" arbeiten.";
			break;}
		case "dk":{
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "es": {
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "fr":{
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "gr":{
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "hu":{
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "it":{
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "nl":{
			texte["rackoverview"]["msgUpdate"] = "Wil je de nieuwe script versie van rackoverview installeren?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "pl":{
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "ru": {
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "se": {
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
		case "tr":{
			texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
			texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
			break;}
	}

	// Updatecheck
	if((!unsafeData.beraterVersion)||(compareVersions(neededVersionBerater,unsafeData.beraterVersion)>0)){
		alert2(texte["rackoverview"]["shouldUpdateBerater"],texte["ok"]);
	}
	// time,version on server,last checked version
	var updateCheck=explode(GM_getValue("updateCheck"),"do_main/updateCheck",[0,VERSION,VERSION]);
	if(now-updateCheck[0]>1800){
		showInLogBubble("Checking for update (Rackoverview)");
		updateCheck[0] = now;
		GM_setValue2("updateCheck",implode(updateCheck));
		GM_xmlhttpRequest({
			method: "GET",
			url: USO_Meta,
			onload: function(response) {
				if(response.responseText.match(/@version\s+\d+\.\d+\.\d+/)){
					updateCheck[1] = (/@version\s+(\d+\.\d+\.\d+)/).exec(response.responseText)[1];
					if(VERSION==updateCheck[1]){
						// this script is the one of the server
						updateCheck[2] = updateCheck[1];
						GM_setValue2("updateCheck",implode(updateCheck));
					} else if (updateCheck[1]!=updateCheck[2]) {
						alert2(texte["rackoverview"]["msgUpdate"]+"<br>("+VERSION+"&nbsp;&rarr;&nbsp;"+updateCheck[1]+")",texte["yes"],texte["no"],function(){
							updateCheck[2] = updateCheck[1];
							GM_setValue2("updateCheck",implode(updateCheck));
							window.setTimeout(function(){
								location.href = USO_Source;
							},0);
						},function(){
							updateCheck[2] = updateCheck[1];
							GM_setValue2("updateCheck",implode(updateCheck));
						});
					}
				} else {
					GM_log("Update Check Rackoverview: Bad Response: "+response.responseText);
				}
			}
		});
	}	
	
	FARMNAME = $("username").innerHTML;
	bestand = explode(GM_getValue(LNG+"_"+SERVER+"_rackoverview"),"bestand",[]);
	if(!(bestand instanceof Array)){ bestand = new Array(); }
	// FARMNAME, cash, products, points, level, quest
	for(var v=0;v<bestand.length;v++){
		if(bestand[v] instanceof Array){ 
			if(bestand[v][0]==FARMNAME){
				if(FARMNR==null){
					FARMNR = v;
				} else {
					bestand.splice(v--,1);
				}
			}
		}else{
			bestand.splice(v--,1);
		}
	}
	if(FARMNR==null){
		FARMNR = bestand.length;
		bestand.push(EMPTYFILE);
		bestand[FARMNR][0]=FARMNAME;
		for (var v=0;v<unsafeData.prodName[0].length;v++){
			bestand[FARMNR][2][v] = -1;
		}
		GM_setValue(LNG+"_"+SERVER+"_rackoverview",implode(bestand));
	}else{
		if(!(bestand[FARMNR][2] instanceof Array)){ 
			bestand[FARMNR][2]=[];
			for (var v=0;v<unsafeData.prodName[0].length;v++){
				bestand[FARMNR][2][v] = -1;
			}			
		}
		if(!(bestand[FARMNR][7] instanceof Array)){ bestand[FARMNR][7]=[]; }
	}
	prodTotal = explode(GM_getValue(LNG+"_"+SERVER+"_productStat"),"productStat",[]);
	productStatTime = GM_getValue(LNG+"_"+SERVER+"_productStatTime",0);

	document.addEventListener("gameUpdateRack",function(){
		// Money
		bestand[FARMNR][1] = parseInt($("bar").innerHTML.replace(regDelimThou,""),10);
		// Coins
		bestand[FARMNR][2][0] = parseInt($("coins").innerHTML.replace(regDelimThou,""),10);
		// Rack
		for (var v=1;v<unsafeData.prodName[0].length;v++){
			if(unsafeData.prodBlock[0][v].match(/l/)){
				bestand[FARMNR][2][v] = -1;
			}else{
				bestand[FARMNR][2][v] = (unsafeData.prodStock[0][v]?unsafeData.prodStock[0][v]:0);
			}
		}
		// Points
		bestand[FARMNR][3] = parseInt($("pkt").innerHTML.replace(regDelimThou,""),10);
		// Level
		bestand[FARMNR][4] = parseInt($("levelnum").innerHTML.replace(regDelimThou,""),10);
		// Quest
		if((bestand[FARMNR][5]!=unsafeData.questData["farm"]["1"]["nr"])||(bestand[FARMNR][6]==undefined)){
			bestand[FARMNR][5] = unsafeData.questData["farm"]["1"]["nr"];
			if (bestand[FARMNR][6]==undefined){ //quest number to calc to
				bestand[FARMNR][6] = bestand[FARMNR][5]+1; //init
			} else if (bestand[FARMNR][6]<bestand[FARMNR][5]){
				bestand[FARMNR][6] = 0; //calc-to-quest passed
			}
			bestand[FARMNR][7] = new Array(); //
			var item;
			for(var v=bestand[FARMNR][5];v<=bestand[FARMNR][6];v++) {
				if(unsafeData.QUESTS["farm"]["1"][v]){
					for(var i=0;i<unsafeData.QUESTS["farm"]["1"][v][0].length;i++){
						item = unsafeData.getQuestBestAlternative(unsafeData.QUESTS["farm"]["1"][v][0][i]);
						if (!bestand[FARMNR][7][item[1]]) bestand[FARMNR][7][item[1]] = 0;
						bestand[FARMNR][7][item[1]] += item[2];
					}
				}
			}
			prod=null;
		}
		GM_setValueCache(LNG+"_"+SERVER+"_rackoverview",implode(bestand));

		todayTime = new Date();
		todayTime = Math.round(new Date(todayTime.getFullYear(),todayTime.getMonth(),todayTime.getDate(),0,0,0,0).getTime()/1000);
		if (productStatTime < todayTime){
			window.setTimeout(readProductStat,0);
		}
	},false);

	var newdiv = createElement("div",{"id":"divBeraterButtonsRackOverview","mouseOverText":"Rack Overview","class":"link beraterButtonIcon hoverBgRed"},$("divBeraterButtons"));
	createElement("img",{"src":GFX+"lager/sack1.png","style":"position:relative;top:5px;left:4px;width:22px;height:22px;"},newdiv);
	newdiv.addEventListener("click",function(){
		buildInfoPanel("rackoverview");
	},false);
	newdiv=null;
}

// init script
window.addEventListener("load",function(){
	if(unsafeData.beraterDone){ 
		do_main(); 
	} else {
		document.addEventListener("beraterDone",function(){
			do_main();
			document.removeEventListener("beraterDone",arguments.callee,false);
		},false);
	}
},false);