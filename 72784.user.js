// ==UserScript==
// @name           MFF-Voer-en-Water
// @namespace      http://s*.myfreefarm.nl/main.php
// @description    MyFreeFarm automaat
// @date           28.3.2010
// @include        http://s*.myfreefarm.nl/main.php
// ==/UserScript==


window.addEventListener("load",function(){

function $(ID) {return document.getElementById(ID)}
function getRandom( min, max ) {
	if( min > max ) {return( -1 );	}
	if( min == max ) {return( min );}
        return( min + parseInt( Math.random() * ( max-min+1 ) ) );
}

// Umlaute
var ae = '\u00E4';	var oe = '\u00F6';	var ue = '\u00FC';
var Ae = '\u00C4';	var Oe = '\u00D6';	var Ue = '\u00DC';
var sz = '\u00DF';

function removeElement(node){node.parentNode.removeChild(node)}

function createElement(type, attributes, append){
	var node = document.createElement(type);
	for (var attr in attributes) {
		if (attr=="checked") node.checked=attributes[attr];
		else if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	}
	if (append) append.appendChild(node);
	return node;
} 

function auto(v){
//GM_log("auto"+v);
	$("busydiv").innerHTML = "Beplanten...";
	if (v<121) {
	if (!unsafeWindow.garten_kategorie[v] || (unsafeWindow.garten_kategorie[v]=="v" && unsafeWindow.garten_zeit[v]=="0")) { 
		window.setTimeout(function(){
			unsafeWindow.cache_me(gartenNr,v,unsafeWindow.garten_prod[v],unsafeWindow.garten_kategorie[v]);
			if(v%12==0) v++;
			else v+=unsafeWindow.global_x;
			auto(v);
		},getRandom(tmin,tmax));
	} else auto(v+1);
	} else {
		removeElement($("busydiv")); 
	}
}

function autogiess(v){
//GM_log("autogiess"+v);
	$("busydiv").innerHTML = "Water geven...";
	if (v<121) {
	if (unsafeWindow.garten_kategorie[v] && unsafeWindow.garten_kategorie[v]=="v" && (unsafeWindow.garten_wasser[v]=="0"||unsafeWindow.garten_wasser[v]==""))  { 
		window.setTimeout(function(){
			unsafeWindow.cache_me(gartenNr,v,unsafeWindow.garten_prod[v],unsafeWindow.garten_kategorie[v]);
			autogiess(v+parseInt(unsafeWindow.garten_max_x[v],10));
		},getRandom(tmin,tmax));
	} else autogiess(v+1);
	} else {
		removeElement($("busydiv")); 
	}
}

function autofutter(sorte){
	$("busydiv").innerHTML = "Voederen...";
	if ($("errorboxinner").style.display!="block") {
		window.setTimeout(function(){
			unsafeWindow.feedAnimals(sorte);
			autofutter(sorte);
		},getRandom(tmin,tmax));
	} else {
		removeElement($("busydiv")); 
		unsafeWindow.hideDiv('transp2');
		unsafeWindow.hideDiv('errorboxinner');
	}
}

// ***************************************************************************************************

var reg = /http:\/\/s(.*?)\.myfreefarm\.nl\/(.*?)\.php(.*)/i;
reg.exec(document.location);
var server = RegExp.$1;
var keygarten = /parent.cache_me\((.*?),/;
all  = document.getElementsByTagName("body")[0];

window.setInterval(function () {
cand = keygarten.exec($("gardenarea").innerHTML);
if (valAutoPflanz && cand && $("gardenmaincontainer").style.display=="block"){
	gartenNr = parseInt(cand[1],10);
	if($("gardencancel").childNodes.length==1){
		newimg = createElement("img",{id:"autoplantbutton",title:"Beplantautomaat",class:"link",style:"width: 25px; height: 25px;",src:"http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png"},$("gardencancel"));
		newimg.addEventListener("mouseover",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_on.png"},false);
		newimg.addEventListener("mouseout",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png"},false);
		newimg.addEventListener("click",function(){
			createElement("div",{id:"busydiv",style:"position:absolute; top:10px; left: 480px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("gardenmaincontainer"));
			unsafeWindow.jsTimeStamp = unsafeWindow.Zeit.Client - unsafeWindow.Zeit.Verschiebung;
			if($("bedientext").innerHTML=="gie"+sz+"en") autogiess(1);
			else auto(1);
		},false);
	}
for (var v=1;v<121;v++) $("f"+v).setAttribute("title",v+"|"+unsafeWindow.garten_kategorie[v]+"|"+unsafeWindow.garten_zeit[v]+"|"+unsafeWindow.garten_wasser[v]+"|"+unsafeWindow.garten_prod[v]);
}

if (valAutoFutter && $("innermaincontainer").style.display=="block"){
	for (var v=1;v<10;v++) if($("articleimg"+v)){
	if (!$(v)) {
		newimg = createElement("img",{id:v,class:"link",style:"position:absolute;top:50px;width: 25px; height: 25px;",src:"http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png"},$("articleimg"+v).parentNode.parentNode);
		newimg.addEventListener("mouseover",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_on.png"},false);
		newimg.addEventListener("mouseout",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png"},false);
		newimg.addEventListener("click",function(){
			createElement("div",{id:"busydiv",style:"position:absolute; top:2px; left: 503px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("innermaincontainer"));
			this.style.display="none";
			position = unsafeWindow.position;
			autofutter(this.id);
		},false);
	}
	}
}

},500);

tmin = parseInt(GM_getValue("myFreeFarm_automat_tmin"),10);
if(isNaN(tmin)) {tmin=300;GM_setValue("myFreeFarm_automat_tmin", tmin);alert(tmin);}
tmax = parseInt(GM_getValue("myFreeFarm_automat_tmax"),10);
if(isNaN(tmax)) {tmax=700;GM_setValue("myFreeFarm_automat_tmax", tmax);}

divsetting = createElement("div",{style:"float:left;"},all);

valAutoPflanz = GM_getValue(server+"_myFreeFarm_valAutoPflanz"); 
if(valAutoPflanz==undefined) {valAutoPflanz=true;GM_setValue(server+"_myFreeFarm_valAutoPflanz", valAutoPflanz);}
inp = createElement("input",{id:"inputvalAutoPflanz",type:"checkbox",checked:valAutoPflanz,title:"Pflanz-Automat",style:"float:left;margin-left:3px;"},divsetting);
inp.addEventListener("change",function(){valAutoPflanz=$("inputvalAutoPflanz").checked;GM_setValue(server+"_myFreeFarm_valAutoPflanz", valAutoPflanz);},false);

valAutoFutter = GM_getValue(server+"_myFreeFarm_valAutoFutter"); 
if(valAutoFutter==undefined) {valAutoFutter=true;GM_setValue(server+"_myFreeFarm_valAutoFutter", valAutoFutter);}
inp = createElement("input",{id:"inputvalAutoFutter",type:"checkbox",checked:valAutoFutter,title:"Futter-Automat",style:"float:left;margin-left:3px;"},divsetting);
inp.addEventListener("change",function(){valAutoFutter=$("inputvalAutoFutter").checked;GM_setValue(server+"_myFreeFarm_valAutoFutter", valAutoFutter);},false);

inp = createElement("input",{id:"inputtmin",value:tmin,title:"Pflanzautomat: Minimale Klickzeit in ms",size:"5px",style:"float:left;margin-left:3px;background-color:transparent;color:white;"},divsetting);
inp.addEventListener("change",function(){tmin=this.value;GM_setValue("myFreeFarm_automat_tmin", tmin);},false);

inp = createElement("input",{id:"inputtmax",value:tmax,title:"Pflanzautomat: Maximale Klickzeit in ms",size:"5px",style:"float:left;margin-left:3px;background-color:transparent;color:white;"},divsetting);
inp.addEventListener("change",function(){tmax=this.value;GM_setValue("myFreeFarm_automat_tmax", tmax);},false);

},false);