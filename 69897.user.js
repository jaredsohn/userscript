// ==UserScript==
// @name           MyFreeFarm - time in title
// @namespace      Woems
// @description    Show in the Browser title when the first build is finished.
// @include        http://s*.myfreefarm.nl*
// ==/UserScript==




(function () {

name = new Object();
name[0] = "Coins";

typ = new Object();
typ[0] = "c"; //Coins
//v: pflanze
//e: tier
//u: unkraut
//z: zier

id = new Object();
id["Coins"] = 0;

//Hofpreise
hof = new Object(); 
hof[37] = 37.5; //Äpfel
hof[39] = 52.44; //Birnen
hof[24] = 3.69; //Blumenkohl
hof[35] = 15.63; //Brombeeren
hof[20] = 1.44; //Erdbeeren
hof[5] = 3.95; //Futterrüben
hof[1] = 0.5; //Getreide
hof[18] = 0.52; //Gurken
hof[32] = 5.19; //Heidelbeeren
hof[33] = 8.75; //Himbeeren
hof[34] = 6; //Johannisbeeren
hof[17] = 0.16; //Karotten
hof[26] = 4.38; //Kartoffeln
hof[40] = 51.75; //Kirschen
hof[3] = 1.34; //Klee
hof[8] = 18.5; //Kornblumen
hof[6] = 8.05; //Kräuter
hof[38] = 3.9; //Kürbisse
hof[2] = 1.1; //Mais
hof[36] = 16.88; //Mirabellen
hof[43] = 66.19; //Oliven
hof[41] = 60.25; //Pflaumen
hof[19] = 1.02; //Radieschen
hof[4] = 2.75; //Raps
hof[44] = 70.7; //Rotkohl
hof[7] = 17.8; //Sonnenblumen
hof[29] = 12.4; //Spargel
hof[23] = 3.8; //Spinat
hof[21] = 1.96; //Tomaten
hof[42] = 58.13; //Walnüsse
hof[31] = 3.49; //Zucchinis
hof[22] = 2.28; //Zwiebeln

//Marktpreise
gut = new Object();
gutSt = new Object();
gutSt[0] = 450; //Coins
gutSt[37] = 20; //Äpfel
gutSt[39] = 30; //Birnen
gutSt[24] = 3.5; //Blumenkohl
gutSt[35] = 10; //Brombeeren
gutSt[20] = 1.5; //Erdbeeren
gutSt[5] = 3.7; //Futterrüben
gutSt[1] = 0.55; //Getreide
gutSt[18] = 0.55; //Gurken
gutSt[32] = 4; //Heidelbeeren
gutSt[33] = 6; //Himbeeren
gutSt[34] = 4; //Johannisbeeren
gutSt[17] = 0.16; //Karotten
gutSt[26] = 3.6; //Kartoffeln
gutSt[40] = 26; //Kirschen
gutSt[3] = 1.48; //Klee
gutSt[8] = 10.5; //Kornblumen
gutSt[6] = 4.3; //Kräuter
gutSt[38] = 2.5; //Kürbisse
gutSt[2] = 1.21; //Mais
gutSt[36] = 10; //Mirabellen
gutSt[43] = 33; //Oliven
gutSt[41] = 30; //Pflaumen
gutSt[19] = 1.1; //Radieschen
gutSt[4] = 2.95; //Raps
gutSt[44] = 9; //Rotkohl
gutSt[7] = 10; //Sonnenblumen
gutSt[29] = 11.6; //Spargel
gutSt[23] = 3.7; //Spinat
gutSt[21] = 2; //Tomaten
gutSt[42] = 29; //Walnüsse
gutSt[31] = 3.49; //Zucchinis
gutSt[22] = 2.3; //Zwiebeln
gutSt[9] = 11; //Eier
gutSt[10] = 17; //Milch
gutSt[11] = 26; //Wolle
gutSt[12] = 160; //Honig
gutSt[25] = 55; //Mayonnaise
gutSt[27] = 120; //Käse
gutSt[28] = 220; //Wollknäuel
gutSt[30] = 250; //Bonbon


function $(ID) {return document.getElementById(ID)}

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
		var sep = (typeof thousands_sep == "undefined") ? ',' : thousands_sep;
		var dec = (typeof dec_point == "undefined") ? '.' : dec_point;
	 
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

function time2str(time)
{
	if (time%60>=10) str=time%60;
	else str="0"+time%60;
	time=time/60;
	if (time>=1){
		if (time%60>=10) str=Math.floor(time%60)+":"+str;
		else str="0"+Math.floor(time%60)+":"+str;
	}
	else str="00:"+str;
	time=time/60;
	if (time>=1) str=Math.floor(time%24)+":"+str;
	else str="0:"+str;
	time=time/24;
	if (time>=1) str=Math.floor(time)+"d "+str;
	return str;
}

function getData(){
	var arr = GM_getValue(server+"_myFreeFarm_gut");
	if(arr){
		arr=arr.split("|"); 
		for (var v in arr){
			help = arr[v].split("^");
			gut[parseInt(help[0],10)] = parseFloat(help[1]);
		}
	}
	for (var v in unsafeWindow.produkt_name) if(!isNaN(v)) {
		name[v]=unsafeWindow.produkt_name[v];
		typ[v]=unsafeWindow.produkt_category[v];
		id[name[v]]=v;
		if (!gut[v]){
			if (gutSt[v]) gut[v] = gutSt[v];
			else gut[v] = 0;
		}
	}
	saveData();
}

function loadData(){
	var arr = GM_getValue(server+"_myFreeFarm_name");
	if(arr){
		arr=arr.split("|"); 
		for (var v in arr){
			help = arr[v].split("^");
			name[parseInt(help[0],10)] = help[1];
			id[help[1]] = parseInt(help[0],10);
		}
	}
	var arr = GM_getValue(server+"_myFreeFarm_typ");
	if(arr){
		arr=arr.split("|"); 
		for (var v in arr){
			help = arr[v].split("^");
			typ[parseInt(help[0],10)] = help[1];
		}
	}
	var arr = GM_getValue(server+"_myFreeFarm_gut");
	if(arr){
		arr=arr.split("|"); 
		for (var v in arr){
			help = arr[v].split("^");
			gut[parseInt(help[0],10)] = parseFloat(help[1]);
		}
	}
}

function saveData(){
	var save="";
	for (var v in name) save += v+"^"+name[v]+"|";
	GM_setValue(server+"_myFreeFarm_name",save.slice(0,save.length-1));

	save="";
	for (var v in typ) save += v+"^"+typ[v]+"|";
	GM_setValue(server+"_myFreeFarm_typ",save.slice(0,save.length-1));

	save="";
	for (var v in gut) save += v+"^"+gut[v]+"|";
	GM_setValue(server+"_myFreeFarm_gut",save.slice(0,save.length-1));
}


//***********************************************************************************************************

function buildPreise(start){
	candtable[0].innerHTML = '<tr><td colspan="4" class="tnormal" align="center" style="color:#f0ffef;"><b>Prijzen</b></td></tr>';
	candtable[0].innerHTML += '<tr><td align="center" class="headercell"></td>'
			+'<td align="center" class="headercell">Produkt</td>'
			+'<td align="center" class="headercell">Handelsprijs</td>'
			+'<td align="center" class="headercell">Marktprijs</td>'
			+'<td align="center" class="headercell">abzgl Geb\u00FChr</td></tr>';
	for(var v=start;v<start+19;v++){
	if (name[v] && typ[v]!="u"){
		line = document.createElement('tr');
		line.setAttribute("style","color:white");
		candtable[0].appendChild(line);

		cell = document.createElement("td");
		pic = document.createElement("div");
		if(v>0) pic.setAttribute("class","kp"+v);
		else {	pic = document.createElement("img");
			pic.setAttribute("src","http://dqt9wzym747n.cloudfront.net/pics/menu/coins.gif");
			pic.setAttribute("height","15");
			pic.setAttribute("width","15");
		}		
		cell.appendChild(pic);
		line.appendChild(cell);	

		cell = document.createElement("td");
		link = document.createElement("a");
		link.innerHTML = name[v];
		link.setAttribute("class","link2");
		link.setAttribute("href", "markt.php?order=p&id="+v);
		cell.appendChild(link);	
		line.appendChild(cell);	

		cell = document.createElement('td');
		if (typ[v]=="v") cell.innerHTML = number_format(hof[v], 2, ',', '.'); else cell.innerHTML = "-";
		line.appendChild(cell);		

		cell = document.createElement('td');
		line.appendChild(cell);
	
		inp = document.createElement('input');
		inp.size="10";
		inp.id="inp"+v;
		inp.setAttribute("value",number_format(gut[v], 2, ',', '.'));
		cell.appendChild(inp);

		cell = document.createElement('td');
		cell.innerHTML = number_format(0.9*gut[v], 2, ',', '.');
		line.appendChild(cell);		
	}
	}

	candtable[0].innerHTML += '<tr><td></td><td id="Seite1"></td><td id="Seite2"></td><td id="Speichern"></td></tr>';
	link = document.createElement('a');
	link.innerHTML = "<b><< Vorige</b>";
	link.setAttribute('class','link2');
	link.addEventListener('click',function(){buildPreise(Math.max(0,start-19))},false);
	document.getElementById("Seite1").appendChild(link);

	link = document.createElement('a');
	link.innerHTML = "<b>Volgende >></b>";
	link.setAttribute('class','link2');
	link.addEventListener('click',function(){buildPreise(Math.min(start+19,4*19))},false);
	document.getElementById("Seite2").appendChild(link);

	link = document.createElement('a');
	link.innerHTML = "<b>Bewaren</b>";
	link.setAttribute('class','link2');
	link.addEventListener('click',function(){
		candinp=candtable[0].getElementsByTagName("input");
		for(var v=0;v<candinp.length;v++){
			gut[candinp[v].id.replace("inp","")]=parseFloat(candinp[v].value.replace(".","").replace(",","."));
		}
		saveData();
		alert("Prijzen opgeslagen");
		buildPreise(start);
	},false);
	document.getElementById("Speichern").appendChild(link);

	candtr=candtable[0].getElementsByTagName("tr");
	for (var v=2;v<candtr.length-1;v++){
		candtr[v].addEventListener("mouseover",function(){this.style.backgroundColor='#084200'},false);
		candtr[v].addEventListener("mouseout",function(){this.style.backgroundColor='transparent'},false);
	}
}


//***********************************************************************************************************

function do_markt(){
candtr = candtable[0].getElementsByTagName("tr");
candtr[1].innerHTML = '<td class="tnormal" align="center" style="color:#f0ffef;" id="Preise"></td>';
candtr[1].innerHTML += '<td colspan="4" class="tnormal" align="center" style="color:#f0ffef;"><b>Actueel aanbod</b></td>';

link = document.createElement('a');
link.innerHTML = "<b>Prijs</b>";
link.setAttribute('class','link2');
link.addEventListener('click',function(){buildPreise(0)},false);
document.getElementById("Preise").appendChild(link);

}

//***********************************************************************************************************

function do_main(){
//var username = $("username").innerHTML;
var keyware = /(.+)x (.+) /;
var keypreis = /Summe:&nbsp;(.*?) aD/;
var keyzeit = /(..):(..):(..) h*/;
var keygarten = /parent.cache_me\((.*?),/;
var farmNr = unsafeWindow.farm-1;
var lastGiess = 0;
var nie = 9999999999;
var nextTime = new Array();
for (var v=1;v<=18;v++){
	nextTime[v] = parseInt(GM_getValue(server+"_myFreeFarm_nextTime_"+v),10);
	if (!nextTime[v]){nextTime[v] = nie; GM_setValue(server+"_myFreeFarm_nextTime_"+v,nextTime[v].toString())};
}

werbediv = $("upsimtoolbar");
if (werbediv) werbediv.style.display = "none";





link = document.createElement("button");
link.style.textAlign = "center";
link.style.fontSize = "12pt";
link.style.marginLeft = "250px";
link.style.marginTop = "5px";

link.type = "button";
link.innerHTML = "Reset tijden ";
link.setAttribute("class","link2");
link.addEventListener("click",function(){
	for(var v=1;v<=18;v++){nextTime[v]=nie;GM_setValue(server+"_myFreeFarm_nextTime_"+v,nextTime[v].toString());}
},false);
all.appendChild(link);

link = document.createElement("button");
link.style.textAlign = "center";
link.style.fontSize = "12pt";
link.style.marginLeft = "20px";
link.style.marginTop = "5px";
link.type = "button";
link.innerHTML = "Script homepage";
link.setAttribute("class","link2");
link.addEventListener("click",function(){window.open(scriptUrl)},false);
all.appendChild(link);



valGiess = GM_getValue(server+"_myFreeFarm_valGiess");
if(valGiess==undefined) {valGiess=true;GM_setValue(server+"_myFreeFarm_valGiess", valGiess);}
inp = document.createElement("input");
inp.style.textAlign = "center";
inp.style.fontSize = "12pt";
inp.style.marginLeft = "10px";
inp.style.marginTop = "5px";
inp.type = "checkbox";
inp.checked = valGiess;
inp.id = "inputvalGiess";
inp.title = "Automatisch Water Geven";
inp.addEventListener("change",function(){valGiess=$("inputvalGiess").checked;GM_setValue(server+"_myFreeFarm_valGiess", valGiess);},false);
label1=document.createElement('label');
label1.style.fontSize = "12pt";
label1.innerHTML='Water Geven: ';
label1.style.marginLeft = "20px";
label1.style.marginTop = "5px";
all.appendChild(label1);
all.appendChild(inp);


popupGeven = GM_getValue(server+"_myFreeFarm_popupGeven");
if(popupGeven==undefined) {popupGeven=false;GM_setValue(server+"_myFreeFarm_popupGeven", popupGeven);}
inp2 = document.createElement("input");
inp2.style.textAlign = "center";
inp2.style.fontSize = "12pt";
inp2.style.marginLeft = "10px";
inp2.style.marginTop = "5px";
inp2.type = "checkbox";
inp2.checked = popupGeven;
inp2.id = "inputpopupGeven";
inp2.title = "Popup Geven bij KLAAR ( koppel een geluid hieraan) - EENMALIG";
inp2.addEventListener("change",function(){popupGeven=$("inputpopupGeven").checked;GM_setValue(server+"_myFreeFarm_popupGeven", popupGeven);},false);
label2=document.createElement('label');
label2.style.fontSize = "12pt";
label2.innerHTML='Popup Tonen(Zet windows sound, eenmalig): ';
label2.style.marginLeft = "20px";
label2.style.marginTop = "5px";
all.appendChild(label2);
all.appendChild(inp2);





//Einkaufsliste bearbeiten
document.getElementById("customerline").addEventListener("click",function(){
	var sum=0;

	canddiv=document.getElementById("cartcontent").getElementsByTagName("div");

	for(var v=0;v<canddiv.length;v++){
		if((canddiv[v].innerHTML!="")&&(canddiv[v].innerHTML.search("<div")==-1)){
		menge = keyware.exec(canddiv[v].innerHTML)[1];
		ware = keyware.exec(canddiv[v].innerHTML)[2];
		wert = menge*gut[id[ware]];
		sum += wert;		
		canddiv[v].innerHTML += "<span style='font-size:14px;font-weight:normal;'>("+number_format(Math.round(wert),0,',','.')+" aD)</span>";
		}
	}

	canddiv=document.getElementById("cartsubmit").getElementsByTagName("div");
	canddiv[1].innerHTML="";

	preis=keypreis.exec(canddiv[0].innerHTML)[1].replace(".","").replace(",",".");
	canddiv[0].innerHTML+= "<br><span style='font-size:15px;font-weight:normal;'>("+number_format(Math.round(sum),0,',','.')+" aD / "+Math.round(100*preis/sum)+"%)</span>";
},false);

//Zeiten
window.setInterval(function () {
    	var Now=Math.round((new Date()).getTime()/1000);
	
	
	//aufraeumen falls Farmwechsel
	if(farmNr != unsafeWindow.farm-1){
		farmNr = unsafeWindow.farm-1;
		for (var v=1;v<=6;v++){
			if($("zonebuttons"+v)) $("zonebuttons"+v)=null;
			if($("bulldozetooltip"+v)) $("bulldozetooltip"+v)=null;
			if($("emptyfieldtooltip"+v)) $("emptyfieldtooltip"+v)=null;
			lastGiess = 0;
		}
	}

	//Acker
	cand = keygarten.exec($("gardenarea").innerHTML);
    	if (cand && $("gardenmaincontainer").style.display=="block"){
		gartenNr = parseInt(cand[1],10);
		var zeitVerschiebung = unsafeWindow.Zeit.Verschiebung;
		nextTime[gartenNr+6*farmNr] = nie-zeitVerschiebung;
		var gegossen = true;
		for(var v=1;v<=120;v++) {
			z = unsafeWindow.garten_zeit[v];			
			if(z!=0){
				gegossen &= (unsafeWindow.garten_wasser[v]!=0);
				nextTime[gartenNr+6*farmNr] = Math.min(nextTime[gartenNr+6*farmNr],z);
			}
		}
		if(valGiess && !gegossen && (lastGiess!=gartenNr) && $("tooltipwaterall")) {
			unsafeWindow.waterGarden(gartenNr); 
			lastGiess = gartenNr;
		}

		nextTime[gartenNr+6*farmNr] += zeitVerschiebung;
		GM_setValue(server+"_myFreeFarm_nextTime_"+(gartenNr+6*farmNr),nextTime[gartenNr+6*farmNr].toString());

		//Klon des Anpflanzautomaten
		if($("gardencancel").childNodes.length==1 && $("autoplantbutton"+gartenNr)){
			cell = $("autoplantbutton"+gartenNr).parentNode.cloneNode(true);
			cell.addEventListener("click",function(){$("gardenmaincontainer").setAttribute("style","display:none")},false);
			$("gardencancel").appendChild(cell);
		}
	} else { lastGiess=0; }

	for (var v=1;v<=6;v++){
		if($("zonebuttons"+v)){ 
			//Stall
			cand = document.getElementById("timeevent"+v);
			if(cand){ 
				atime = keyzeit.exec(cand.innerHTML);
				if(atime) nextTime[v+6*farmNr] = Now+3600*parseInt(atime[1],10)+60*parseInt(atime[2],10)+parseInt(atime[3],10);
				else if (cand.innerHTML.search("Fertig") == 0) nextTime[v+6*farmNr] = Now;
				GM_setValue(server+"_myFreeFarm_nextTime_"+(v+6*farmNr),nextTime[v+6*farmNr].toString());
			}

			//Einzelzeit
			divzeit = $("zone"+v).getElementsByTagName("div")[1];
			if(divzeit){
			    if (nextTime[v+6*farmNr]<=Now)
                                {
                                  divzeit.innerHTML = "<center><span style='background-color:red; color:#FFFFFF; padding:2px'><b>KLAAR!</b></span></center>";

      if (popupGeven ) { 
            window.alert("Er is een product klaar!");
            popupGeven = false;
            GM_setValue(server+"_myFreeFarm_popupGeven", popupGeven);
            inp2.checked = popupGeven;


      }

}


				else if(nextTime[v+6*farmNr]<nie) divzeit.innerHTML = "<center><span style='background-color:#DE9008; color:#FFFFFF; padding:2px'><b>"+time2str(nextTime[v+6*farmNr]-Now)+"</b></span></center>";
				else divzeit.innerHTML = "<center><span style='background-color:#DE9008; color:#FFFFFF; padding:2px'><b>---</b></span></center>";
			}
		} else
		if($("bulldozetooltip"+v) || $("emptyfieldtooltip"+v)) {
			nextTime[v+6*farmNr] = nie;
			GM_setValue(server+"_myFreeFarm_nextTime_"+(v+6*farmNr),nextTime[v+6*farmNr].toString());
		}
	}

	//Gesamtzeit
	nextTime[0] = nextTime[1];
	for (var v=2;v<=18;v++) nextTime[0] = Math.min(nextTime[0],nextTime[v]);
	if (nextTime[0]<=Now) document.title="KLAAR ! - My Free Farm ";
	else document.title=time2str(nextTime[0]-Now)+" - My Free Farm ";
},500);

}

//***********************************************************************************************************

var loc = document.location; 
var reg = /http:\/\/s(.*?)\.myfreefarm\.nl\/(.*?)\.php/i;
var server = reg.exec(loc)[1];
var page = reg.exec(loc)[2];
all  = document.getElementsByTagName("body")[0];
candtable = document.getElementsByTagName("table");
var produkteUrl = "http://dqt9wzym747n.cloudfront.net/pics/maps/etikett_map.5.png";
var scriptUrl = "http://userscripts.org/scripts/show/69897";

if (unsafeWindow.produkt_name) getData();
else loadData();

switch (page) {
	case "stadt/markt": do_markt();break;
	case "main": do_main();break;
}

})();