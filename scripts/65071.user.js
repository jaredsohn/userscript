// ==UserScript==
// @name		Plunder Bot By basti1012 1.1(besser als mofamotor script)Pennergame 4.0 
// @namespace		basti1012  http://pennerhack.foren-city.de
// @description		Dieses Script Ermoeglich das Wechseln des Plunders egal wann und wo . Jeder Zeit das echsel auf den eingestellten Plunder moeglich .Weiterildung Fighten und sammeln wird automatisch erkannt und das Script wechselt die Plunder von alleine
// @version			2.5
// @include			http://*.pennergame.de/*
// @exclude			http://newboard.pennergame.de
// @exclude			http://change.pennergame.de/*
// @exclude			http://*.pennergame.de/logout/*
// @exclude			http://*.pennergame.de/redirect/?site=*
// ==/UserScript==

	GM_xmlhttpRequest({
		method: 'GET', 
		url: 'http://userscripts.org/scripts/admin/65071', 
		onload: function(responseDetails) {
			var acontent = responseDetails.responseText;
			var plunderbot1= acontent.split('version')[1];			
			var plunderbot2 = plunderbot1.split('(besser als mofamotor')[0];

				if (plunderbot2 != 1.1) {
					Scriptinfo1 = '<font style=\"color:red; font-size:100%;\"><b>Neue Version verf&uuml;gbar !!</b></font>';
					Scriptinfo = '<a class="tooltip"  href="http://userscripts.org/scripts/source/65071.user.js"  >['+Scriptinfo1+']<span><b>Bitte klicke hier um die Nee version zu instllieren.Es erscheint ein Installations Fenster .Nach den Update sind alle funktion sofort abrufbar.</span></a><br>'
					GM_setValue("uinfo",Scriptinfo);
					//alert("Hinweiss bitte beachen ,es ist ein neues Update verfuegbar ,bitte klicke auf den Hinweiss um das update zu starten.Der Hinweis kommt nur einmal an Tag wenn eine neue verson verfuegbar ist ");
				}else{
					Scriptinfoa = 'Version ('+plunderbot2+')';
					GM_setValue("uinfo",Scriptinfoa)
				}

			}
	});
var MenueTop3 = GM_getValue("MenueTop3");
if (MenueTop3 == null){
MenueTop3 = "133";};

var MenueLeft3 = GM_getValue("MenueLeft3");
if (MenueLeft3 == null){
MenueLeft3 = "93";};


var MenueTop1 = GM_getValue("MenueTop1");
if (MenueTop1 == null){
MenueTop1 = "333";};

var MenueLeft1 = GM_getValue("MenueLeft1");
if (MenueLeft1 == null){
MenueLeft1 = "393";};


var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}

// css-style in html einfuegen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle('div#new_container2 {position:absolute; top:'+MenueTop3+'px; left:'+MenueLeft3+'px; margin-left:1px; width:330px;}')
addGlobalStyle('.inhalt_newcontainer2 { padding-top:8px; padding-bottom:10px; padding-left:2%; background: url(http://www.fotos-hochladen.net/hintergrundplundermj8ayd12.jpg) ; font-weight:bold; color:whithe; font-size:12px; text-align:left; } ')

addGlobalStyle('div#new_container1 {position:absolute; top:'+MenueTop1+'px; left:'+MenueLeft1+'px; margin-left:1px; width:330px;}')
addGlobalStyle('.inhalt_newcontainer1 { padding-top:8px; padding-bottom:10px; padding-left:2%; background: url(http://www.fotos-hochladen.net/hintergrundplundermj8ayd12.jpg) ; font-weight:bold; color:whithe; font-size:12px; text-align:left; } ')





GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+link+"/gang/stuff/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table = acontent.split('Plunder einzahlen')[1];			
			var table2 = table.split('Anzahl:')[0];	
			var table5 = table2.split('<select name="pid" id="pid">')[1];			
			var table6 = table5.split('</select>')[0];
			table6 = table6.replace(/\,/g,"");
			//table6 = table6.replace(/\[x/g, "");
			table6 = table6.replace(/\]/g, "");
			table6 = table6.replace(/\[x0/g, "");
			table6 = table6.replace(/\[x1/g, "");
			table6 = table6.replace(/\[x2/g, "");
			table6 = table6.replace(/\[x3/g, "");
			table6 = table6.replace(/\[x4/g, "");
			table6 = table6.replace(/\[x5/g, "");
			table6 = table6.replace(/\[x6/g, "");
			table6 = table6.replace(/\[x7/g, "");
			table6 = table6.replace(/\[x8/g, "");
			table6 = table6.replace(/\[x9/g, "");


			plunderabfrage(table6)
		}
});






function plunderabfrage(table6){
	GM_xmlhttpRequest({
  		method: 'GET',
   		url: ""+link+"/stock/plunder/",
        	onload: function(responseDetails) {
        		var acontent = responseDetails.responseText;
			
GM_setValue("bcontent", acontent);
abfragen(acontent,table6);
			}
	});
}




function abfragen(acontent,table6){
			var table1 = acontent.split('<h3>Angelegt</h3>')[1];			
			var table12 = table1.split('class="submenu">')[0];

			var table13 = table1.split('src="')[1];							
			var angelegt8 = table13.split('"')[0];

			var check1 = angelegt8.split('/plunder/')[1];								
			var check2 = check1.split('.')[0];

			var info = table12.split('<ul class="zclear">')[1];					
			var info1 = info.split('</ul>')[0];


var suche = info1.search("ATT:");
if (suche != -1) {
	var att1 = info1.split('ATT:')[1];
	var att = att1.split('</li>')[0];
	}else{
	var att ='-';
}

var suche1 = info1.search("DEF:");
if (suche1 != -1) {
	var def1 = info1.split('DEF:')[1];
	var def = def1.split('</li>')[0];
	}else{
	var def ='-';
}

var suche1 = info1.search("Geschick:");
if (suche1 != -1) {
	var ges1 = info1.split('Geschick:')[1];
	var ges = ges1.split('</li>')[0];
	}else{
	var ges ='-';
}


var suche1 = info1.search("Effekt:");
if (suche1 != -1) {
	var eff1 = info1.split('<li>Effekt:')[1];
	var eff = eff1.split('</li>')[0];
	}else{
	var eff ='-';
}




































var tbody = document.createElement('div');
document.body.appendChild(tbody);
tbody.innerHTML += '<div id=\"new_container2\"><div class=\"inhalt_newcontainer2\">'
+'Auto Plunder wechsel Script  &nbsp;&nbsp;  '+GM_getValue("uinfo")+'<div id="counter0"</div>'
+'<select name="plunderid" id="plunderid">'+table6+'</select>&nbsp;&nbsp;&nbsp;'
+'&nbsp; <img style="margin-bottom:-3px" src="'+angelegt8+'"</img><br>Att: '+att+' Def : '+def+'  Ges : '+ges+' info :<a class="tooltip" >['+check2+']<span><b>Plunderdaten</b><br>'+eff+'</span></a> <br>'
+'<input type="button" id="plunderX"  name="plunderX" value="wechseln" ><br>'
+'<input type="button" id="wechsel1" name="wechsel1" value="x">&nbsp;&nbsp;Sammeln:             <a class="tooltip" ><strong name="status1" id="status1" </strong><span><b>Sammelzeit Counter</b><br>Das ist eine Kopie von der Sammelzeit.Wid ben&ouml;tigt um den Plunder bei ablauf der zeit wieder zum (immer Plunder ) zu wechseln</span></a> &nbsp;&nbsp;&nbsp;&nbsp;  <font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was31")+'</b></font><br>'
+'<input type="button" id="wechsel2" name="wechsel2" value="x">&nbsp;&nbsp;Fighten: 		<a class="tooltip" ><strong name="status2" id="status2" </strong><span><b>Fight Zeit Counter</b><br>Das ist eine Kopie von der Sammelzeit.Wid ben&ouml;tigt um den Plunder bei ablauf der zeit wieder zum (immer Plunder ) zu wechseln</span></a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was32")+'</b></font><br>'
+'<input type="button" id="wechsel3" name="wechsel3" value="x">&nbsp;&nbsp;Spenden Status:	<a class="tooltip" ><strong name="status3" id="status3" </strong><span><b></b></span></a> &nbsp;&nbsp;  <font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was33")+'</b></font><br>'
+'<input type="button" id="wechsel4" name="wechsel4" value="x">&nbsp;&nbsp;WBilden:		<a class="tooltip" ><strong name="status4" id="status4" </strong><span><b>Weiterbildung Zeit Counter</b><br>Das ist eine Kopie von der Sammelzeit.Wid ben&ouml;tigt um den Plunder bei ablauf der zeit wieder zum (immer Plunder ) zu wechseln</span></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was34")+'</b></font><br>'
+'<input type="button" id="wechsel5" name="wechsel5" value="x">&nbsp;&nbsp;Immer:  		<a class="tooltip" ><strong name="status5" id="status5" </strong><span><b></b></span></a> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was35")+'</b></font><br>'
+'<input type="button" id="einstell3" name="einstell3" value="Einstellungen">'
+'<strong align="left" name="aaaa" id="aaaa"</strong>'
+'</div></a></div>';




document.getElementsByName('einstell3')[0].addEventListener('click', function einstell3 () {
document.getElementsByName("aaaa")[0].innerHTML = '<br><a class="tooltip" >[Anleitung klick hier]<span><b>Einstellungs anleitung</b><br>ausw&auml;hlen und dann auf den zugeh&ouml;rigen Speicher Button klicken .Sobald ihr alle Buttons zugeordnet habt einfach nur den Schliessen Button klicken und fertig .Danach werden die Plunders immer automatisch gewechselt sobald ihr eine Aktion Startet.</span></a><br>'
+'<input type="button" id="save1" name="save1" value="Sammel Plunder Speichern">           <strong name="HIN1" id=HNI1" </strong><br>'
+'<input type="button" id="save2" name="save2" value="Fight  Plunder Speichern">           <strong name="HIN2" id=HNI2" </strong><br>'
+'<input type="button" id="save3" name="save3" value="Spenden Plunder Speichern">          <strong name="HIN3" id=HNI3" </strong><br>'
+'<input type="button" id="save4" name="save4" value="Bildungs Plunder Speichern">         <strong name="HIN4" id=HNI4" </strong><br>'
+'<input type="button" id="save5" name="save5" value="Immer Plunder Speichern">            <strong name="HIN5" id=HNI5" </strong><br>'
+'<span align=\"center\" style=\"color:red;\">Alles Gespeichert ?</span><br>'
+'<span align=\"center\" style=\"color:green;\">Bitte klicken sie auf schliessen</span><br>'
+'<span align=\"center\" style=\"color:black; font-size:8px;\">Copyright By Basti1012</span><br>'
+'<input type=\"submit\" class=\"formbutton\" name=\"SchliessenExtraMenue\" value=\"Schlie&szlig;en\" /><br>'
+'</div></a></div>';


























document.getElementsByName('SchliessenExtraMenue')[0].addEventListener('click', function Schliessen () {
var was = '-';
var bcontent = GM_getValue("bcontent");

try{
var was11 = bcontent.split(GM_getValue("wechsel11"))[1];			
var was21 = was11.split('>')[1];
var was31 = was21.split('<')[0];
GM_setValue("was31", was31);}catch(e){GM_setValue("was31", was);}


try{
var was12 = bcontent.split(GM_getValue("wechsel21"))[1];			
var was22 = was12.split('>')[1];
var was32 = was22.split('<')[0];
GM_setValue("was32", was32);}catch(e){GM_setValue("was32", was);}


try{
var was13 = bcontent.split(GM_getValue("wechsel31"))[1];			
var was23 = was13.split('>')[1];
var was33 = was23.split('<')[0];
GM_setValue("was33", was33);}catch(e){GM_setValue("was33", was);}


try{
var was14 = bcontent.split(GM_getValue("wechsel41"))[1];			
var was24 = was14.split('>')[1];
var was34 = was24.split('<')[0];
GM_setValue("was34", was34);}catch(e){GM_setValue("was34", was);}

try{
var was15 = bcontent.split(GM_getValue("wechsel51"))[1];			
var was25 = was15.split('>')[1];
var was35 = was25.split('<')[0];
GM_setValue("was35", was35);}catch(e){GM_setValue("was35", was);}

window.location.reload();
},false);



document.getElementsByName('save1')[0].addEventListener('click', function Schliessen1 () {
GM_setValue("wechsel11", document.getElementById('plunderid').value);
document.getElementsByName("HIN1")[0].innerHTML = '<font style=\"color:green; font-size:80%;\"><b>Save Id : '+GM_getValue("wechsel11")+'</font>';
},false);

document.getElementsByName('save2')[0].addEventListener('click', function Schliessen2 () {
GM_setValue("wechsel21", document.getElementById('plunderid').value);
document.getElementsByName("HIN2")[0].innerHTML = '<font style=\"color:green; font-size:80%;\"><b>Save Id : '+GM_getValue("wechsel21")+'</font>';
},false);

document.getElementsByName('save3')[0].addEventListener('click', function Schliessen3 () {
GM_setValue("wechsel31", document.getElementById('plunderid').value);
document.getElementsByName("HIN3")[0].innerHTML = '<font style=\"color:green; font-size:80%;\"><b>Save Id : '+GM_getValue("wechsel31")+'</font>';
},false);

document.getElementsByName('save4')[0].addEventListener('click', function Schliessen4 () {
GM_setValue("wechsel41", document.getElementById('plunderid').value);
document.getElementsByName("HIN4")[0].innerHTML = '<font style=\"color:green; font-size:80%;\"><b>Save Id : '+GM_getValue("wechsel41")+'</font>';
},false);

document.getElementsByName('save5')[0].addEventListener('click', function Schliessen5 () {
GM_setValue("wechsel51", document.getElementById('plunderid').value);
document.getElementsByName("HIN5")[0].innerHTML = '<font style=\"color:green; font-size:80%;\"><b>Save Id : '+GM_getValue("wechsel51")+'</font>';

},false);
},false);

























document.getElementsByName('wechsel5')[0].addEventListener('click', function wechseln() {
var welcherplunder = GM_getValue("wechsel51");
wechselgehen(welcherplunder);
},false);

document.getElementsByName('wechsel4')[0].addEventListener('click', function wechseln() {
var welcherplunder = GM_getValue("wechsel41");
wechselgehen(welcherplunder);
},false);

document.getElementsByName('wechsel3')[0].addEventListener('click', function wechseln() {
var welcherplunder = GM_getValue("wechsel31");
wechselgehen(welcherplunder);
},false);

document.getElementsByName('wechsel2')[0].addEventListener('click', function wechseln() {
var welcherplunder = GM_getValue("wechsel21");
wechselgehen(welcherplunder);
},false);

document.getElementsByName('wechsel1')[0].addEventListener('click', function wechseln() {
var welcherplunder = GM_getValue("wechsel11");
wechselgehen(welcherplunder);
},false);

document.getElementsByName('plunderX')[0].addEventListener('click', function wechseln() {
var welcherplunder = document.getElementById('plunderid').value;
wechselgehen(welcherplunder);
},false);



























if (url.indexOf("/activities/")>=0) {
try{
document.getElementsByClassName("captcha")[0].addEventListener('click', function postsuchesr() {
var welcherplunder = GM_getValue("wechsel11");
wechselgehen(welcherplunder);
document.getElementsByName("status1")[0].innerHTML = '<br><font style=\"color:red; font-size:150%;\"><b>Plunder wird gewechselt</b></font>';
},false);}catch(e){}}



if (url.indexOf("/fight/overview/")>=0) {
try{
document.getElementsByClassName("captcha")[0].addEventListener('click', function postsuchesr() {
var welcherplunder = GM_getValue("wechsel21");
wechselgehen(welcherplunder);
document.getElementsByName("status2")[0].innerHTML = 'Plunder wird gewechselt';
},false);}catch(e){}}



if (url.indexOf("/skills/")>=0) {
try{
document.getElementsByClassName("captcha")[0].addEventListener('click', function postsuchesr() {
var welcherplunder = GM_getValue("wechsel41");
wechselgehen(welcherplunder);
document.getElementsByName("status4")[0].innerHTML = 'Plunder wird gewechselt';
},false);}catch(e){}}































function counter_sammeln(){
counter = document.getElementById("counter2").innerHTML.replace(/\:/g, "");// fight counter
if(counter>=100){
document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:green; font-size:80%;\"><b>'+counter+'</b></font>';
}else
if(counter>=10){
document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\"><b>'+counter+'</b></strong>';
}else 
if(counter<=10){
document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:red; font-size:80%;\"><b>'+counter+'</b></font>';
}else
if(counter<=1){
var welcherplunder = GM_getValue("wechsel51");
wechselgehen(welcherplunder);
document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:red; font-size:80%;\">Wechsel Plunder</a>';   //document.getElementsByName("status1")[0].innerHTML = '<br><font style=\"color:black; font-size:80%;\"><b>'+counter+'</b></font>';
}}window.setInterval(counter_sammeln, 1000);



function counter_fighten(){
counter1 = document.getElementById("counter1").innerHTML.replace(/\:/g, "");// fight counter
if(counter1>=100){
document.getElementsByName("status2")[0].innerHTML = '<a style=\"color:green; font-size:80%;\"><b>'+counter1+'</b></font>';
}else
if(counter1>=10){
document.getElementsByName("status2")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\"><b>'+counter1+'</b></strong>';
}else 
if(counter1<=10){
document.getElementsByName("status2")[0].innerHTML = '<a style=\"color:red; font-size:80%;\"><b>'+counter1+'</b></font>';
}else
if(counter<=1){
document.getElementsByName("status2")[0].innerHTML = '<a style=\"color:red; font-size:80%;\">Wechsel Plunder</a>';   //document.getElementsByName("status1")[0].innerHTML = '<br><font style=\"color:black; font-size:80%;\"><b>'+counter+'</b></font>';
var welcherplunder = GM_getValue("wechsel51");
wechselgehen(welcherplunder);
}}window.setInterval(counter_fighten, 1000);





function counter_bilden(){
counter2 = document.getElementById("counter0").innerHTML.replace(/\:/g, "");// fight counter
counter2 = counter2.replace(/\Tage/g, "");
counter2 = counter2.replace(/\ /g, "");
if(counter2>=100){
document.getElementsByName("status4")[0].innerHTML = '<a style=\"color:green; font-size:80%;\"><b>'+counter2+'</b></font>';
}else
if(counter2>=10){
document.getElementsByName("status4")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\"><b>'+counter2+'</b></strong>';
}else 
if(counter2<=10){
document.getElementsByName("status4")[0].innerHTML = '<a style=\"color:red; font-size:80%;\"><b>'+counter2+'</b></font>';
}else
if(counter<=10){
//var welcherplunder = GM_getValue("wechsel51");
//wechselgehen(welcherplunder);
document.getElementsByName("status4")[0].innerHTML = '<a style=\"color:red; font-size:80%;\">Wechsel Plunder</a>';   //document.getElementsByName("status1")[0].innerHTML = '<br><font style=\"color:black; font-size:80%;\"><b>'+counter+'</b></font>';
}}window.setInterval(counter_bilden, 1000);





























function wechselgehen(welcherplunder){

	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'/stock/plunder/change/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_plunder='+welcherplunder+''),
		onload: function(responseDetails)
     	{
			//location.reload();//alert("habe plunder gewechselt auf "+welcherplunder+"");
     	 }
 	 });
window.location.reload();

}
}


// copyright By Basti1012 
// dieses Script darf nicht verender werden oder irgendwo im Netz angeboten werden.
// Wr dieses script endern will muss sich die erlaubnis von Basti1012 holen .