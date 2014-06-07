// ==UserScript==
// @name           arenazo
// @namespace      namespace
// @include        http://wanderlust2.index.hu/cgi-bin/jatek.com
// ==/UserScript==



/***************************************************/

var haztolFoterig="ny d d d";
var dbEladnivaloKincs=10;
var elegPenz=1500;

/***************************************************/

if(!GM_getValue("seta")) GM_setValue("seta", 0);


var msg="", info="";
var fonts = document.getElementsByTagName('font');
var divs = document.getElementsByTagName('div');
var body = document.getElementsByTagName('body')[0];
var objOldalTipus = searchDOM('//input[@name="oldalTipus"]').snapshotItem(0);
var oldalTipus=objOldalTipus.getAttribute('value')
var urlap = searchDOM('//form[@name="urlap"]').snapshotItem(0);
var Submit = searchDOM('//input[@name="Submit"]').snapshotItem(0);
var par1 = searchDOM('//input[@name="par1"]').snapshotItem(0);
var par2 = searchDOM('//input[@name="par2"]').snapshotItem(0);
var par3 = searchDOM('//input[@name="par3"]').snapshotItem(0);


var vanBizti=false; 
var vanRontas=false;
var vanDurex=false;
var imgs = document.getElementsByTagName('img');
for(var i=0; i<imgs.length; i++){
	var img=imgs[i];	
	if(img.src.indexOf("bizt_van.gif")>-1) {vanBizti=true; GM_setValue("vanBizti",true); continue;}
	if(img.title.indexOf("Varázsburok")>-1) {vanDurex=true; continue;}
	if(img.title.indexOf(" fert")>-1 || img.title.indexOf(" méreg")>-1 || img.title.indexOf(" paralízis")>-1 || img.title.indexOf(" átok")>-1) {vanRontas=true; break;}
}

//ÉPÜLETEK
var epArena = searchDOM('//input[@src="/ikon/arena.gif"]').snapshotItem(0)?true:false;
var epSajathaz = searchDOM('//input[@src="/ikon/sajathaz.gif"]').snapshotItem(0)?true:false;
var epPalota = searchDOM('//input[@src="/ikon/palota.gif"]').snapshotItem(0)?true:false;
//var epVegyesbolt = searchDOM('//input[@src="/ikon/vegyesbolt.gif"]').snapshotItem(0)?true:false;
//var epTemplom = searchDOM('//input[@src="/ikon/templom.gif"]').snapshotItem(0)?true:false;


if(oldalTipus=="otSajathaz"){	
	msg=fonts[1].innerHTML;
	if(msg.indexOf("közönsége hirtelen elhallgat")>-1) {info="meghaltál"; GM_setValue("vanBizti", false); katt("svHasznalSzek");}
	if(msg.indexOf("varázsszék")>-1) {info="varázsszék"; katt("svVissza");}
}
if(oldalTipus=="otVilag"){	
	var jatekos=fonts[102].innerHTML;
	msg=fonts[104].innerHTML;
	
	if(epArena){
		if(vanBizti && !vanRontas){		
			if(!vanDurex){ 
				if(msg.indexOf("indul")==-1 && msg.indexOf("követ")==-1){
					info="felveszem a burkot";
					katt("svSpecTev","burok");
				}else katt("svGoWest");
			}else katt("svEnterBuilding","otArena");	
		}
	}
	
	if(epSajathaz) GM_setValue("seta", 0);
	
	lepes=GM_getValue("seta"); 
	var aSeta = haztolFoterig.split(' '); sIrany=aSeta[lepes];
	
	if(epPalota){
		if(vanBizti && !vanRontas){
			katt("svGoEast");
		}else{		
			p=penz();
			if(p>elegPenz){
				info="van pénz:"+p;
				katt("svEnterBuilding","otTemplom");
			}else{
				info="nincs elég pénz:"+p;
				katt("svEnterBuilding","otVegyesbolt");
			}
		}
	}else{
		GM_setValue("seta", lepes+1);
		if(lepes<=aSeta.length)
	    switch (sIrany)
	    {
	      case "é":
	        katt("svGoNorth");
	        break;
	      case "k":
	        katt("svGoEast");
	        break;
	      case "d":
	        katt("svGoSouth");
	        break;
	      case "ny":
	        katt("svGoWest");
	        break;
	    }
	}
}
if(oldalTipus=="otVegyesbolt"){
	msg=divs[37].innerHTML; 
	if(msg.indexOf("Belépsz")>-1){
		info+="beleptem";
		if(searchDOM('//option[@value="622"]').snapshotItem(0)!=null){
			info="eladom a kincset";
			katt("svEladas",622,dbEladnivaloKincs);
		}
	}else if(msg.indexOf("veszel a hátizsákodból")>-1){
		info="ki";
		katt("svVissza");	
	}
	//info+=msg+","+searchDOM('//option[@value="622"]').snapshotItem(0);
}
if(oldalTipus=="otTemplom"){
	msg=fonts[1].innerHTML;
	if(msg.indexOf("Megkötötted")>-1){
		GM_setValue("vanBizti",true);
	}
	
	vanBizti=GM_getValue("vanBizti");
	vanRontas=fonts[4].innerHTML.indexOf("Semmi")==-1;
	info+=" bizti:"+vanBizti+" rontas: "+vanRontas+fonts[4].innerHTML;
	
	if(!vanBizti){
		info="biztit kötök";
		katt("svBiztositas");
	}else if(vanRontas){
		info="rontast leveszek";
		katt("svFizetes");
	}else katt("svVissza");	
}
if(oldalTipus=="otArena"){
	katt("svSzornyHarc");
}
if(oldalTipus=="otHarc"){
	msg=fonts[3].innerHTML;
	var jatekos=fonts[1].innerHTML;
	if(msg.indexOf("körnél tartasz")>-1){
		info="táv";
		katt("svAttack","bal");
	}else{		
		if(msg.indexOf("tapasztalati pont kell")>-1){
			info="ki";
			katt("svContinue");
		}else{
			info="közel";
			katt("svAttack","jobb");
		}
	}
}

//KIJELZŐ
var kijezo=newChild("DIV", body, oldalTipus+", "+jatekos+", "+info);
kijezo.className = "kijelzo"; addCSS('.kijelzo{position: absolute; z-index:4; left:30px; top: 40px;width: 500px;}');

function katt(sv,p1,p2,p3){
	var r=700+Math.floor(Math.random()*500);
	p1=p1?p1:""; p2=p2?p2:""; p3=p3?p3:"";
	Submit.setAttribute("value",sv); 
	par1.setAttribute("value",p1); 
	par2.setAttribute("value",p2); 
	par3.setAttribute("value",p3); 
	//alert(sv+","+p1+","+p2+","+p3);
	setInterval('urlap.submit()', r);
}

function penz(){
	var str=kozte("<br>Pénz: ","<br>Életpont:",divs[32].innerHTML);
	var p=str.replace(/&nbsp;/g, "");
	p=p.replace(/ /g, "");
	return parseInt(p);
}
function kozte(strNyito, strZaro, str){
	iNyito=str.indexOf(strNyito);
	iZaro=str.indexOf(strZaro); 
	r=str.substring(iNyito+strNyito.length,iZaro);
	return (iZaro>-1 && iNyito>-1 && iNyito<iZaro)?r:"";
}
function replaceGlobal(s1, s2, str){
	var tmpStr=str, newStr="", i;
	while(tmpStr.length>0){
		i=tmpStr.indexOf(s1);
		newStr+=tmpStr.substring(0,i);
		if(i==-1) {newStr+=tmpStr;tmpStr="";}
		else{newStr+=s2;}
		tmpStr=tmpStr.substring(i+s1.length);
	}
	return newStr;
}
function newChild(tag, parent, content){
	var child = document.createElement(tag);  
	child.innerHTML = content;  
	parent.appendChild(child);
	return child;
}
function searchDOM(X){return document.evaluate(X,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function addCSS(cssString) {
	var style, head;
	head = document.getElementsByTagName('HEAD')[0]; if (!head) { return; }
	style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = cssString;
	head.appendChild(style);
}