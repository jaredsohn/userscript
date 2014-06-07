// ==UserScript==
// @name           karinfo
// @namespace      namespace
// @description    Larkinor Karakter Infóra épülö, karakterek fejlödésének mérésére alkalmas srcipt.
// @include        http://wanderlust2.index.hu/cgi-bin/jatek.com?oldalTipus=otKarakterlap&melyik=*
// @include        http://larkinordb.index.hu/cgi-bin/karinfo.pl*
// (c) meditke (Glinka)
// ==/UserScript==


var title = searchDOM('//title').snapshotItem(0);

if(title.innerHTML.indexOf("Karakter Info")>0){
	var td = searchDOM('//td')
	var table = searchDOM('//table').snapshotItem(0);
	var body = searchDOM('//body').snapshotItem(0);

	var mustSave = false, divDatum, strDatum, divSave, aSave, strDiff, objDiff, tpDiff, differences, strTD, valueTD, nameTD;
	
	var strTD = td.snapshotItem(1).innerHTML;
	melyik = strTD.substring(strTD.indexOf(": ")+2,strTD.length);

	var unique=document.domain+"_"+melyik;

	var d = new Date();
	var strNow = d.getFullYear()+"-"+
			time00(d.getMonth()+1)+"-"+
			time00(d.getDate())+" "+
			time00(d.getHours())+":"+
			time00(d.getMinutes())+":"+
			time00(d.getSeconds());
			
	/******************** AUTOMATIKUS MENTÉS HA A KARIRÓL MÉG NINCS ADATUNK*
	if(!GM_getValue(unique+"datum")) mustSave = true;
	/*********************************************************************/

	divSave = document.createElement('DIV');
	divSave.className = "fent";
	table.parentNode.insertBefore(divSave,table);
	aSave = document.createElement('A');
	aSave.innerHTML = "aktuális adatok rögzítése: "+melyik+" ("+document.domain.substring(0,document.domain.indexOf("."))+")";
	aSave.className = "mentes";
	aSave.addEventListener('click', saveAll, true);
	aSave.addEventListener('mouseout', function() {this.blur();}, true);
	divSave.appendChild(aSave);

	diffAll();
}

function searchDOM(X){return document.evaluate(X,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}

function time00(i){if (i<10)i="0" + i; return i;}

function number1(s){
	if(document.domain == "larkinordb.index.hu"){
		return s.substring(0,s.indexOf(" ("));	
	}else{
		return s.substring(0,s.indexOf(" (")-1);
	}
}
function number2(s){
	if(document.domain == "larkinordb.index.hu"){
		return s.substring(s.indexOf(" (")+2,s.indexOf("%)"));	
	}else{
		return s.substring(s.indexOf(" (")+3,s.indexOf("%)"));	
	}
}

function diff(name,value,i){
	var r;
	value = replaceGlobal("&nbsp;"," ",value);
	value = replaceGlobal("<b>","",value);
	value = replaceGlobal("</b>","",value);
	value = replaceGlobal(String.fromCharCode(337),"ö",value); //ő
	value = replaceGlobal(String.fromCharCode(369),"ü",value); //ű
	value = replaceGlobal(String.fromCharCode(336),"Ö",value); //Ő
	value = replaceGlobal(String.fromCharCode(367),"Ü",value); //Ű
	if(GM_getValue(name)){
		var regi=GM_getValue(name);
		var uj=value;
		if(isNaN(uj-regi)){
			if(uj.indexOf("(")>0){	
				r1=number1(uj)-number1(regi); 
				r2=number2(uj)-number2(regi); 			
				if(i==24){ // +TP sora
					if(tpDiff!='') {r1=''; r2=100*tpDiff+r2;}
					r=r1+" ( "+r2+"%)";
				} else {r=100*r1+r2; r+="%"}
			}else{	
				r=regi+'&rarr;'+uj;	
			}
		}else{
			r=uj-regi;
		}
		if(uj==regi) r='';
	} else { 
		r='';
	}
	if(mustSave) save(name,value);
	return r; 
}
function diffAll(){
	var mentve=""; //"<br><span class='ok'>Adatok elmentve!</span>";
	if(GM_getValue(unique+"datum")){
		strDatum=GM_getValue(unique+"datum")+" &rarr; "+strNow;
		var duma="<br>Nem történt változás! <a href='"+window.location.href+"' class='frissits'>Frissítsd az oldalt!</a>";
	} else { 
		strDatum=strNow;
		var duma="<br>Adatok elmentve! <br>Mostantól figyelem a változásokat. <br><a href='"+window.location.href+"' class='frissits'>Frissítsd az oldalt!</a>";
	}
	
	if(mustSave) save(unique+"datum",strNow);

	divDatum=document.createElement('DIV');
	divDatum.innerHTML=strDatum;
	divDatum.id="divDatum";
	divDatum.className="fent";
	divSave.parentNode.insertBefore(divDatum, divSave);	
	
	differences = strDatum;
	for(var i=1; i<47; i++){
		strTD=td.snapshotItem(i).innerHTML;
		valueTD=strTD.substring(strTD.indexOf(": ")+2,strTD.length);
		strDiff=diff(unique+"td"+i,valueTD,i);	
		if(i==2) tpDiff=strDiff;
		if(mustSave && strDiff!=''){			
			nameTD=strTD.substring(0,strTD.indexOf(": "));
			differences += "<br><span class='label'>"+nameTD+":</span> "+strDiff;
		}
		objDiff=document.createElement('SPAN');
		objDiff.id="span"+i;
		objDiff.innerHTML=strDiff;
		objDiff.className="plusz";
		td.snapshotItem(i).appendChild(objDiff);
	}
	if(differences==strDatum) differences += duma;
	else differences += mentve;
}

function save(name, value){	
	GM_setValue(name,value);
}
function saveAll(){
	for(var i=1; i<47; i++){
		var span = document.getElementById('span'+i);
		td.snapshotItem(i).removeChild(span);
	}
	body.removeChild(divDatum);
	mustSave=true;
	diffAll();
	
	//var pipa = document.getElementById('pipa'); if(typeof(pipa)=='object') pipa.parentNode.removeChild(pipa);
	//var kul = document.getElementById('kul'); if(typeof(kul)=='object') kul.parentNode.removeChild(kul);
	
	
	objDiff=document.createElement('SPAN');
	objDiff.innerHTML="&radic;&nbsp;";
	objDiff.id="pipa";
	objDiff.className="ok";
	aSave.parentNode.insertBefore(objDiff,aSave);
	
	objDiff=document.createElement('DIV');
	objDiff.innerHTML=differences;
	objDiff.id="kul";
	objDiff.className="modosult";
	table.parentNode.insertBefore(objDiff,table);
	
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
function addCSS(cssString) {
	var style = document.createElement('STYLE');
	style.type = 'text/css';style.innerHTML = cssString;
	document.getElementsByTagName('HEAD')[0].appendChild(style);
}
addCSS('.plusz{color:#c00; font-weight: bold; margin-left: 10px;}');
addCSS('.fent{color:#fff; font-weight: bold; text-align: center; margin: auto;}');
addCSS('.ok{color:#3f6; font-weight: bold;}');
addCSS('.label{color:#007}');
addCSS('.frissits{color:#007}');
addCSS('.mentes{color:#77f; text-decoration: underline; cursor: pointer;text-align: center; margin: auto;}');
addCSS('.modosult{color:#fff; font-weight: bold; text-align: left; margin: 10px auto;  padding: 5px; width:300px; background-color: #77f;}');