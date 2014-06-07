// ==UserScript==
// @name         Pennerganme uhr erinstellbar pennergame 4.0 
// @namespace    basti1012 
// @description  Eine neue alte uhr fuer pennergame 4.0 positsion farbe und groesse der uhr ist einstellbar und per drop und down frei positsionierbar .
// @version		 v3
// @include      http://*.pennergame.de/*
// @exclude		*.pennergame.de/redirect/?site=*
// ==/UserScript==




spenden_date = new Array(8);
//Abstand oben
if(!GM_getValue("uhr0")||GM_getValue("uhr0")=='')
uhr0 = 10;
else
uhr0 = GM_getValue("uhr0");
//Abstand links


if(!GM_getValue("uhr1")||GM_getValue("uhr1")=='')
uhr1 = 825;
else
uhr1 = GM_getValue("uhr1");


var gross = GM_getValue("gross");
if (gross == null){gross = 122;};

var fabe1 = GM_getValue("fabe1");
if (fabe1 == null){fabe1 = "green";};

var fabe2 = GM_getValue("fabe2");
if (fabe2 == null){fabe2 = "green";};

var fabe3 = GM_getValue("fabe3");
if (fabe3 == null){fabe3 = "green";};

var fabe4 = GM_getValue("fabe4");
if (fabe4 == null){fabe4 = "green";};

var fabe5 = GM_getValue("fabe5");
if (fabe5 == null){fabe5 = "green";};






var grossa = GM_getValue("grossa");
if (grossa == null){grossa = 122;};

var fabe1a = GM_getValue("fabe1a");
if (fabe1a == null){fabe1a = "green";};

var fabe2a = GM_getValue("fabe2a");
if (fabe2a == null){fabe2a = "green";};

var fabe3a = GM_getValue("fabe3a");
if (fabe3a == null){fabe3a = "green";};

var fabe4a = GM_getValue("fabe4a");
if (fabe4a == null){fabe4a = "green";};

var fabe5a = GM_getValue("fabe5a");
if (fabe5a == null){fabe5a = "green";};













var relod = GM_getValue("relod");
if (relod == null){relod = 1;};

var dragspendenobjekt = null;
var dragx = 0;
var dragy = 0;
var posx = 0;
var posy = 0;
var spenden_cache;

if(!document.getElementById("basti_setting")){
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'basti_setting');
	newdiv.setAttribute('style', 'height:0px;');
	newdiv.innerHTML = '<div id="basti_buttons"></div><div id="basti_text"></div>';
	document.getElementsByTagName('body')[0].appendChild(newdiv);
}
var newspan = document.createElement('span');
newspan.setAttribute('id', 'setting_spenden');
newspan.innerHTML = '<input type="button" name="spenden_setting" id="spenden" value="uhr Option" />';
document.getElementById("basti_buttons").appendChild(newspan);

var table_uhr_uhr = '<table width="100%" style="border-color:#000000; border:5px; border-style:groove; color:#ffffff " cellspacing="0"><tr>'
+'<th colspan="4" style="border-bottom: 5px groove;">Settingbereich uhr by basti1012</th></tr>'




+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'<h1><b>Positsions Eintellungen</b></h1>'
+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'

+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'&nbsp;Abstand oben:&nbsp;'

+'<input name="uhr0"id="uhrtop" type="text" size="5" maxlength="15" value="'+uhr0+'">&nbsp;px<br />&nbsp;Abstand links:'
+'&nbsp;<input name="uhr1" id="uhrleft" type="text" size="5" maxlength="15" value="'+uhr1+'">&nbsp;px'



+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'







+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'<h1><b>Relod Zeit der Uhr in Sekunden</b></h1>'
+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'


+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'&nbsp;<input name="relod" id="relod" type="text" size="5" value="'+relod+'"> Sekunden</td>'
+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'


















+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'<h1><b>Einstellung groesse uhr datum</b></h1>'
+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'









+'<tr><td colspan="2" style="border-bottom: 5px groove;">'

+' <center>Gr&ouml;sse Datum<input name="grossa"  id="vgrossa" type="text" size="5" maxlength="15" value="'+grossa+'">&nbsp;px&nbsp;'
+'&nbsp;Gr&ouml;sse Uhr &nbsp;<input name="gross"  id="vgross" type="text" size="5" maxlength="15" value="'+gross+'">&nbsp;px'
+'</center>'




+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'







+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'<input type="button" name="save_spenden_setting" id="save_spenden" value="Speichern" />'
+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'











+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'<h1><b>Farbeinstellung der Uhr</b></h1>'
+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'


+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'Stundenfarbe : <input name="fabe1" id="fabe1" type="text" size="5" maxlength="15" value="'+fabe1+'">&nbsp;'
+'Doppüelpunktfarbe : <input name="fabe2" id="fabe2" type="text" size="5" maxlength="15" value="'+fabe2+'">&nbsp;'
+'Minutenfarbe : <input name="fabe3" id="fabe3" type="text" size="5" maxlength="15" value="'+fabe3+'">&nbsp;'
+'Doppüelpunktfarbe : <input name="fabe4" id="fabe4" type="text" size="5" maxlength="15" value="'+fabe4+'">&nbsp;'
+'Sekundenfarbe : <input name="fabe5" id="fabe5" type="text" size="5" maxlength="15" value="'+fabe5+'">&nbsp;'
+'</td>'


+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'<h1><b>Farbeinstellung des Datums</b></h1>'
+'</td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'


//+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'Tagfarbe : <input name="fabe1a" id="fabe1a" type="text" size="5" maxlength="15" value="'+fabe1a+'">&nbsp;'
+'punktfarbe : <input name="fabe2a" id="fabe2a" type="text" size="5" maxlength="15" value="'+fabe2a+'">&nbsp;'
+'Monatfarbe : <input name="fabe3a" id="fabe3a" type="text" size="5" maxlength="15" value="'+fabe3a+'">&nbsp;'
+'punktfarbe : <input name="fabe4a" id="fabe4a" type="text" size="5" maxlength="15" value="'+fabe4a+'">&nbsp;'
+'Jahrefarbe : <input name="fabe5a" id="fabe5a" type="text" size="5" maxlength="15" value="'+fabe5a+'">&nbsp;'
+'</td>'



+'<tr><td colspan="2" style="border-bottom: 5px groove;">'

+'Teste Anzeige Uhr und Datum<input type="button" name="testuhr" id="testuhr" value="teste uhr einstellungen" /><br><div id="testuhrr" </div><div id="testdatum" </div></td></tr></table>';

var newspan2 = document.createElement('span');
newspan2.setAttribute('id', 'uhr_uhr');
newspan2.setAttribute('style', 'display:none;');
newspan2.innerHTML = table_uhr_uhr;
document.getElementById("basti_text").appendChild(newspan2);



document.getElementById('spenden').addEventListener('click', function Setting_spenden(){
	if(document.getElementById('uhr_uhr').style.display == ""){
		document.getElementById('uhr_uhr').style.display = 'none';
		document.getElementById('spenden').value = 'Spenden Setting';
	}else if(document.getElementById('uhr_uhr').style.display == "none"){
		document.getElementById('uhr_uhr').style.display = '';
		document.getElementById('spenden').value = 'Close uhr Setting';
	}
},false);


document.getElementById('save_spenden').addEventListener('click', function save_spenden () {
GM_setValue("uhr0", document.getElementsByName("uhr0")[0].value);
GM_setValue("uhr1", document.getElementsByName("uhr1")[0].value);

GM_setValue("relod", document.getElementsByName("relod")[0].value);

GM_setValue("fabe1", document.getElementsByName("fabe1")[0].value);
GM_setValue("fabe2", document.getElementsByName("fabe2")[0].value);
GM_setValue("fabe3", document.getElementsByName("fabe3")[0].value);
GM_setValue("fabe4", document.getElementsByName("fabe4")[0].value);
GM_setValue("fabe5", document.getElementsByName("fabe5")[0].value);
GM_setValue("gross", document.getElementsByName("gross")[0].value);

GM_setValue("fabe1a", document.getElementsByName("fabe1a")[0].value);
GM_setValue("fabe2a", document.getElementsByName("fabe2a")[0].value);
GM_setValue("fabe3a", document.getElementsByName("fabe3a")[0].value);
GM_setValue("fabe4a", document.getElementsByName("fabe4a")[0].value);
GM_setValue("fabe5a", document.getElementsByName("fabe5a")[0].value);
GM_setValue("grossa", document.getElementsByName("grossa")[0].value);




location.reload();
},false);

document.getElementById('testuhr').addEventListener('click', function save_spenden () {

GM_setValue("fabe1", document.getElementsByName("fabe1")[0].value);
GM_setValue("fabe2", document.getElementsByName("fabe2")[0].value);
GM_setValue("fabe3", document.getElementsByName("fabe3")[0].value);
GM_setValue("fabe4", document.getElementsByName("fabe4")[0].value);
GM_setValue("fabe5", document.getElementsByName("fabe5")[0].value);

GM_setValue("fabe1a", document.getElementsByName("fabe1a")[0].value);
GM_setValue("fabe2a", document.getElementsByName("fabe2a")[0].value);
GM_setValue("fabe3a", document.getElementsByName("fabe3a")[0].value);
GM_setValue("fabe4a", document.getElementsByName("fabe4a")[0].value);
GM_setValue("fabe5a", document.getElementsByName("fabe5a")[0].value);
GM_setValue("grossa", document.getElementsByName("grossa")[0].value);

GM_setValue("gross", document.getElementsByName("gross")[0].value);
uhrtesten ()


},false);



	if(!document.getElementById('spendendiv')){
		var spendendiv = document.createElement('div');
		spendendiv.setAttribute('id', 'spendendiv');
		spendendiv.setAttribute('align', 'middle');
		spendendiv.setAttribute('style', 'position:absolute; top:'+uhr0+'px; left:'+uhr1+'px; z-index:50; font-size:15px; cursor:move;');
		spendendiv.innerHTML = '<a id="uhr"</a><br><a id="datum"</a>';
		document.body.appendChild(spendendiv);
	}else{
		spendendiv = document.getElementById('spendendiv');
		spendendiv.innerHTML = '<a id="uhr"</a><br><a id="datum"</a>';	}
		//spendendiv.style.color = 'green';


function int_bewegung_spenden(){
	document.getElementById("spendendiv").addEventListener('mousedown', dragspendenstart, false);
	document.addEventListener('mousemove', dragspenden, false);
	document.addEventListener('mouseup', dragspendenstop, false);

}

function dragspendenstart() {
	//Wird aufgerufen, wenn ein Objekt bewegt werden soll.
	element = document.getElementById("spendendiv");
	dragspendenobjekt = element;
	dragx = posx - dragspendenobjekt.offsetLeft;
	dragy = posy - dragspendenobjekt.offsetTop;
}

function dragspendenstop() {
	//Wird aufgerufen, wenn ein Objekt nicht mehr bewegt werden soll.
	dragspendenobjekt=null;
}
function dragspenden(ereignis) {
	//Wird aufgerufen, wenn die Maus bewegt wird und bewegt bei Bedarf das Objekt.
	posx = document.all ? window.event.clientX : ereignis.pageX;
	posy = document.all ? window.event.clientY : ereignis.pageY;
	if(dragspendenobjekt != null) {
		uhr1 = posx - dragx;//left
		uhr0 = posy - dragy;//top
		dragspendenobjekt.style.left = uhr1 + "px";
		dragspendenobjekt.style.top = uhr0 + "px";
		document.getElementById("spendendiv").style.left = uhr1 + "px";
		document.getElementById("spendendiv").style.top = uhr0 + "px";
		GM_setValue("uhr1", uhr1);
		GM_setValue("uhr0", uhr0);
		document.getElementById("uhrleft").value = uhr1;
		document.getElementById("uhrtop").value = uhr0;	
	}
}



function uhr (){
int_bewegung_spenden();
var jetzt = new Date();
var Stunde = jetzt.getHours();
var StundeA = ((Stunde < 10) ? "0" + Stunde : Stunde);
var Minuten = jetzt.getMinutes();
var MinutenA = ((Minuten < 10) ? "0" + Minuten : Minuten);
var Sek = jetzt.getSeconds();
var SekA = ((Sek < 10) ? "0" + Sek : Sek);
var Jahr = jetzt.getFullYear();
var Tag = jetzt.getDate();
var TagA = ((Tag < 10) ? "0" + Tag : Tag);
var Jahresmonat = jetzt.getMonth();
var Monat = (Number (Jahresmonat) + Number (1))
var MonatA = ((Monat < 10) ? "0" + Monat : Monat);


document.getElementById("datum").innerHTML = ''
+'<span style=\"color:'+GM_getValue("fabe1a")+'; font-size:'+GM_getValue("grossa")+'%;\"><b>'+TagA+'</b></span>'
+'<span style=\"color:'+GM_getValue("fabe2a")+'; font-size:'+GM_getValue("grossa")+'%;\"><b>.</b></span>'
+'<span style=\"color:'+GM_getValue("fabe3a")+'; font-size:'+GM_getValue("grossa")+'%;\"><b>'+MonatA+'</b></span>'
+'<span style=\"color:'+GM_getValue("fabe4a")+'; font-size:'+GM_getValue("grossa")+'%;\"><b>.</b></span>'
+'<span style=\"color:'+GM_getValue("fabe5a")+'; font-size:'+GM_getValue("grossa")+'%;\"><b>'+Jahr+'</b></span>';


document.getElementById("uhr").innerHTML = ''
+'<span style=\"color:'+GM_getValue("fabe1")+'; font-size:'+GM_getValue("gross")+'%;\"><b>'+StundeA+'</b></span>'
+'<span style=\"color:'+GM_getValue("fabe2")+'; font-size:'+GM_getValue("gross")+'%;\"><b>:</b></span>'
+'<span style=\"color:'+GM_getValue("fabe3")+'; font-size:'+GM_getValue("gross")+'%;\"><b>'+MinutenA+'</b></span>'
+'<span style=\"color:'+GM_getValue("fabe4")+'; font-size:'+GM_getValue("gross")+'%;\"><b>:</b></span>'
+'<span style=\"color:'+GM_getValue("fabe5")+'; font-size:'+GM_getValue("gross")+'%;\"><b>'+SekA+'</b></span>';
}


	var abcd = GM_getValue("relod")*1000;
	window.setInterval(uhr, abcd);




function uhrtesten (){

var jetzt = new Date();
var Stunde = jetzt.getHours();
var StundeA = ((Stunde < 10) ? "0" + Stunde : Stunde);
var Minuten = jetzt.getMinutes();
var MinutenA = ((Minuten < 10) ? "0" + Minuten : Minuten);
var Sek = jetzt.getSeconds();
var SekA = ((Sek < 10) ? "0" + Sek : Sek);
var Jahr = jetzt.getFullYear();
var Tag = jetzt.getDate();
var TagA = ((Tag < 10) ? "0" + Tag : Tag);
var Jahresmonat = jetzt.getMonth();
var Monat = (Number (Jahresmonat) + Number (1))
var MonatA = ((Monat < 10) ? "0" + Monat : Monat);
document.getElementById("testdatum").innerHTML = ''
+'<span style=\"color:'+GM_getValue("fabe1a")+'; font-size:'+GM_getValue("grossa")+'%;\"><b>'+TagA+'</b></span>'
+'<span style=\"color:'+GM_getValue("fabe2a")+'; font-size:'+GM_getValue("grossa")+'%;\"><b>.</b></span>'
+'<span style=\"color:'+GM_getValue("fabe3a")+'; font-size:'+GM_getValue("grossa")+'%;\"><b>'+MonatA+'</b></span>'
+'<span style=\"color:'+GM_getValue("fabe4a")+'; font-size:'+GM_getValue("grossa")+'%;\"><b>.</b></span>'
+'<span style=\"color:'+GM_getValue("fabe5a")+'; font-size:'+GM_getValue("grossa")+'%;\"><b>'+Jahr+'</b></span>';

document.getElementById("testuhrr").innerHTML = ''
+'<span style=\"color:'+GM_getValue("fabe1")+'; font-size:'+GM_getValue("gross")+'%;\"><b>'+StundeA+'</b></span>'
+'<span style=\"color:'+GM_getValue("fabe2")+'; font-size:'+GM_getValue("gross")+'%;\"><b>:</b></span>'
+'<span style=\"color:'+GM_getValue("fabe3")+'; font-size:'+GM_getValue("gross")+'%;\"><b>'+MinutenA+'</b></span>'
+'<span style=\"color:'+GM_getValue("fabe4")+'; font-size:'+GM_getValue("gross")+'%;\"><b>:</b></span>'
+'<span style=\"color:'+GM_getValue("fabe5")+'; font-size:'+GM_getValue("gross")+'%;\"><b>'+SekA+'</b></span>';
//window.setInterval(uhrtesten, abcd);
}


//copyright by basti1012