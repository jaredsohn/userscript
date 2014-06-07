// ==UserScript==
// @name		Plunder Bot By basti1012 Version 1.3(Test Version)Pennergame 4.0 
// @namespace		basti1012  http://pennerhack.foren-city.de
// @description		Dieses Script Ermoeglich das Wechseln des Plunders egal wann und wo . Jeder Zeit das echsel auf den eingestellten Plunder moeglich .Weiterildung Fighten und sammeln wird automatisch erkannt und das Script wechselt die Plunder von alleine
// @version			1.3  (test Version)
// @include			http://*.pennergame.de/*
// @exclude			http://newboard.pennergame.de
// @exclude			http://change.pennergame.de/*
// @exclude			http://*.pennergame.de/logout/*
// @exclude			http://*.pennergame.de/redirect/?site=*
// ==/UserScript==
//GET /stock/plunder/use/44141929/









var time_box = document.createElement('div');
time_box.setAttribute('style', 'position:fixed; bottom:0; right:0; padding:4px; color:#000; background:#FFF; -moz-border-radius:6px; font:11px arial; z-index:99999;');
document.body.insertBefore(time_box, document.body.firstChild);







////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
///////////////UPDATE FUNKTION UM IMMER AUF DEN LAUFENDEN ZU BLEIBEN //////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
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



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////// FESTE POSITSION DES MENUES BEI NEU INSALLATION //////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

var Top = GM_getValue("Top");
if (Top == null){
Top = "133";};

var Left = GM_getValue("Left");
if (Left == null){
Left = "93";};

var hinter = GM_getValue("hinter");
if (hinter == null){
var hinter = "http://www.fotos-hochladen.net/hintergrundplundermj8ayd12.jpg";};

var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////// BEI NEU INSTALLATION WIRD HIER FESTER WERT ZUM ANZEIGE LASSE//////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
var einstell = GM_getValue("Einstellplunder1");
if (einstell == null){
einstell = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};

var AoutAll = GM_getValue("PlunderAoutAll1");
if (AoutAll == null){
AoutAll = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};

var PlunderW = GM_getValue("PlunderWerte1");
if (PlunderW == null){
PlunderW = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};

var Sammel = GM_getValue("SammelPlunder1");
if (Sammel == null){
Sammel = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};

var Fight = GM_getValue("FightPlunder1");
if (Fight == null){
Fight = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};

var Spenden = GM_getValue("SpendenPlunder1");
if (Spenden == null){
Spenden = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};

var Weiter = GM_getValue("WeiterPlunder1");
if (Weiter == null){
Weiter = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};

var Sammelz = GM_getValue("SammelzurueckPlunder1");
if (Sammelz == null){
Sammelz = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};

var Fightz = GM_getValue("FightzurueckPlunder1");
if (Fightz == null){
Fightz = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};

var Weiterz = GM_getValue("WeiterzurueckPlunder1");
if (Weiterz == null){
Weiterz = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};

var fest = GM_getValue("FestPlunder1");
if (fest == null){
fest = '<a href="http://www.pennergame.de/?PlunderBot-Einstellung"</a>';
};



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////// HERSTELLEN DES CSS DATEI UM EINE VOORAUSSETZUNG ZU MENUE ZU HABEN //////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
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


addGlobalStyle('div#new_container2 {position:absolute; top:'+Top+'px; left:'+Left+'px; margin-left:1px; width:330px;}')
addGlobalStyle('.inhalt_newcontainer2 { padding-top:8px; padding-bottom:10px; padding-left:2%; background: url('+hinter+'); font-weight:bold; color:whithe; font-size:12px; text-align:left; } ')



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
///////////////REQUESTE UM DIE ERFORDERLICHEN DATEN WIE ATT DEF UND PLUNDER//////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

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
        		var bcontent = responseDetails.responseText;
abfragen(bcontent,table6)
			}
	});
}




function abfragen(bcontent,table6){

var was = '-';

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

try{
var was16 = bcontent.split(GM_getValue("wechsel61"))[1];			
var was26 = was16.split('>')[1];
var was36 = was26.split('<')[0];
GM_setValue("was36", was36);}catch(e){GM_setValue("was36", was);}

try{
var was17 = bcontent.split(GM_getValue("wechsel71"))[1];			
var was27 = was17.split('>')[1];
var was37 = was27.split('<')[0];
GM_setValue("was37", was37);}catch(e){GM_setValue("was37", was);}
		

var table1 = bcontent.split('<h3>Angelegt</h3>')[1];			
var table12 = table1.split('class="submenu">')[0];

var table13 = table12.split('src="')[1];							
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



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
///////////////ANZEIGEN UND AUSBLENDEN DER EINZELNDEN PLUNDER EBENDEN //////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

if(GM_getValue("Einstellplunder1")==1){
var einstell ='';
}else{
var einstell ='<a href="/?PlunderBot-Einstellung" ><font align=\"center\" style=\"color:black; font-size:10px;\">PlunderBot Einstellungen</font></a>';
}

if(GM_getValue("PlunderAoutAll1")==1){
var AoutAll ='';
}else{
var AoutAll ='<select name="plunderid" id="plunderid">'+table6+'</select><input type="button" id="plunderX"  name="plunderX" value="wechseln" >';
}

if(GM_getValue("PlunderWerte1")==1){
var PlunderW ='';
}else{
var PlunderW ='Att: '+att+' Def : '+def+'  Ges : '+ges+' info :<a class="tooltip" >['+check2+']<span><b>Plunderdaten</b><br>'+eff+'</span></a><br>';
}

if(GM_getValue("SammelPlunder1")==1){
var Sammel ='';
}else{
var Sammel ='<input type="button" id="wechsel1" name="wechsel1" value="x">&nbsp;&nbsp;	<a href="'+link+'/activities/"><font align=\"center\" style=\"color:black; font-size:12px;\">Sammeln:</font></a>          		<a class="tooltip" ><strong name="status1" id="status1" </strong><span><b>Sammelzeit Counter</b><br>Das ist eine Kopie von der Sammelzeit.Wid ben&ouml;tigt um den Plunder bei ablauf der zeit wieder zum (immer Plunder ) zu wechseln</span></a> &nbsp;&nbsp;&nbsp;&nbsp;  			<font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was31")+'</b></font><br>';
}

if(GM_getValue("FightPlunder1")==1){
var Fight ='';
}else{
var Fight ='<input type="button" id="wechsel2" name="wechsel2" value="x">&nbsp;&nbsp;	<a href="'+link+'/fight/overview/"><font align=\"center\" style=\"color:black; font-size:12px;\">Fighten: </font></a>			<a class="tooltip" ><strong name="status2" id="status2" </strong><span><b>Fight Zeit Counter</b><br>Das ist eine Kopie von der Sammelzeit.Wid ben&ouml;tigt um den Plunder bei ablauf der zeit wieder zum (immer Plunder ) zu wechseln</span></a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;	<font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was32")+'</b></font><br>';
}

if(GM_getValue("SpendenPlunder1")==1){
var Spenden ='';
}else{
var Spenden ='<input type="button" id="wechsel3" name="wechsel3" value="x">&nbsp;&nbsp;	<a href="'+link+'/change_please/statistics/"><font align=\"center\" style=\"color:black; font-size:12px;\">Spenden:</font></a>			<a class="tooltip" ><strong name="status3" id="status3" </strong><span><b></b></span></a> &nbsp;&nbsp;  																							<font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was33")+'</b></font><br>';
}

if(GM_getValue("WeiterPlunder1")==1){
var Weiter ='';
}else{
var Weiter ='<input type="button" id="wechsel4" name="wechsel4" value="x">&nbsp;&nbsp;	<a href="'+link+'/skills/"><font align=\"center\" style=\"color:black; font-size:12px;\">WBilden:</font></a>			<a class="tooltip" ><strong name="status4" id="status4" </strong><span><b>Weiterbildung Zeit Counter</b><br>Das ist eine Kopie von der Sammelzeit.Wid ben&ouml;tigt um den Plunder bei ablauf der zeit wieder zum (immer Plunder ) zu wechseln</span></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was34")+'</b></font><br>';
}

if(GM_getValue("SammelzurueckPlunder1")==1){
var Sammelz ='';
}else{
var Sammelz ='<input type="button" id="wechsel5" name="wechsel5" value="x">&nbsp;&nbsp;	<a href="'+link+'/activities/"><font align=\"center\" style=\"color:black; font-size:12px;\">Sammeln zur&uuml;ck:</font></a>  		<a class="tooltip" ><strong name="status5" id="status5" </strong><span><b></b></span></a> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 													<font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was35")+'</b></font><br>';
}

if(GM_getValue("FightzurueckPlunder1")==1){
var Fightz ='';
}else{
var Fightz ='<input type="button" id="wechsel6" name="wechsel6" value="x">&nbsp;&nbsp;	<a href="'+link+'/fight/overview/"><font align=\"center\" style=\"color:black; font-size:12px;\">Fighten zur&uuml;ck:</font></a>		<a class="tooltip" ><strong name="status6" id="status6" </strong><span><b>Weiterbildung Zeit Counter</b><br>Das ist eine Kopie von der Sammelzeit.Wid ben&ouml;tigt um den Plunder bei ablauf der zeit wieder zum (immer Plunder ) zu wechseln</span></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("was36")+'</b></font><br>';
}

if(GM_getValue("WeiterzurueckPlunder1")==1){
var Weiterz ='';
}else{
var Weiterz ='<input type="button" id="wechsel7" name="wechsel7" value="x">&nbsp;&nbsp;	<a href="'+link+'/skills/"><font align=\"center\" style=\"color:black; font-size:12px;\">Weiterzur&uuml;ck: </font></a> 		<a class="tooltip" ><strong name="status7" id="status7" </strong><span><b></b></span></a><br>';
}


if(GM_getValue("FestPlunder1")==1){
var fest ='';
}else{
var fest ='<br><input type="button" id="fest1" name="fest1" value="[ 1 ]"><input type="button" id="fest2" name="fest2" value="[ 2 ]"><input type="button" id="fest3" name="fest3" value="[ 3 ]"><input type="button" id="fest4" name="fest4" value="[ 4 ]"><input type="button" id="fest5" name="fest5" value="[ 5 ]"><br>';
}







////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////// plunder bot zusammen bauen anzeuen lasysen auf jeder seite//////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
var tbody = document.createElement('div');
document.body.appendChild(tbody);
tbody.innerHTML += '<div id=\"new_container2\"><div class=\"inhalt_newcontainer2\">'
+'Auto Plunder wechsel Script  &nbsp;&nbsp;  '+GM_getValue("uinfo")+'&nbsp; <img style="margin-bottom:-3px" src="'+angelegt8+'"</img><br>'
+''+AoutAll+''
+''+PlunderW+' '
+''+Sammel+''
+''+Fight+''
+''+Spenden+''
+''+Weiter+''
+''+Sammelz+''
+''+Fightz+''
+''+Weiterz+''  
+''+fest+''
+''+einstell+''
+'</div></a></div>';


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////// Einzel button um fuer jeder akton den plunder manual wechseln//////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////


if(GM_getValue("PlunderAoutAll1")==0){
document.getElementsByName('plunderX')[0].addEventListener('click', function wechseln7() {
time_box.textContent = 'PlunderAoutAll1 geklickt wechsel Plunder';
var welcherplunder = document.getElementById('plunderid').value;
wechselgehen(welcherplunder);
},false);}


if(GM_getValue("SammelPlunder1")==0){
document.getElementsByName('wechsel1')[0].addEventListener('click', function wechseln6() {
time_box.textContent = 'SammelPlunder geklickt wechsel Plunder';
var welcherplunder = GM_getValue("wechsel11");
wechselgehen(welcherplunder);
},false);}

if(GM_getValue("FightPlunder1")==0){
document.getElementsByName('wechsel2')[0].addEventListener('click', function wechseln5() {
time_box.textContent = 'FightPlunder geklickt wechsel Plunder';
var welcherplunder = GM_getValue("wechsel21");
wechselgehen(welcherplunder);
},false);}

if(GM_getValue("SpendenPlunder1")==0){
document.getElementsByName('wechsel3')[0].addEventListener('click', function wechseln() {
time_box.textContent = 'SpendenPlunder geklickt wechsel Plunder';
var welcherplunder = GM_getValue("wechsel31");
wechselgehen(welcherplunder);
},false);}

if(GM_getValue("WeiterPlunder1")==0){
document.getElementsByName('wechsel4')[0].addEventListener('click', function fest1() {
time_box.textContent = 'WeiterPlunder geklickt wechsel Plunder';
var welcherplunder = GM_getValue("wechsel41");
wechselgehen(welcherplunder);
},false);}

if(GM_getValue("SammelzurueckPlunder1")==0){
document.getElementsByName('wechsel5')[0].addEventListener('click', function fest1() {
time_box.textContent = 'SammelzurueckPlunder geklickt wechsel Plunder';
var welcherplunder = GM_getValue("wechsel51");
wechselgehen(welcherplunder);
},false);}

if(GM_getValue("FightzurueckPlunder1")==0){
document.getElementsByName('wechsel6')[0].addEventListener('click', function fest2() {
time_box.textContent = 'FightzurueckPlunder geklickt wechsel Plunder';
var welcherplunder = GM_getValue("wechsel61");
wechselgehen(welcherplunder);
},false);}

if(GM_getValue("WeiterzurueckPlunder1")==0){
document.getElementsByName('wechsel7')[0].addEventListener('click', function fest1() {
time_box.textContent = 'WeiterzurueckPlunder geklickt wechsel Plunder';
var welcherplunder = GM_getValue("wechsel71");
wechselgehen(welcherplunder);
},false);}



















////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
///////////////5 manuale extra buttons um einen festen wert zu geben //////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

if(GM_getValue("FestPlunder1")==0){
document.getElementsByName('fest1')[0].addEventListener('click', function wechseln2() {
time_box.textContent = 'Button 1 Gedrueckt wechsel Plunder';
var welcherplunder = GM_getValue("festaa");
wechselgehen(welcherplunder);
},false);

document.getElementsByName('fest2')[0].addEventListener('click', function wechseln3() {
time_box.textContent = 'Button 2 Gedrueckt wechsel Plunder';
var welcherplunder = GM_getValue("festbb");
wechselgehen(welcherplunder);
},false);

document.getElementsByName('fest3')[0].addEventListener('click', function wechseln4() {
time_box.textContent = 'Button 3 Gedrueckt wechsel Plunder';
var welcherplunder = GM_getValue("festcc");
wechselgehen(welcherplunder);
},false);

document.getElementsByName('fest4')[0].addEventListener('click', function wechseln() {
time_box.textContent = 'Button 4 Gedrueckt wechsel Plunder';
var welcherplunder = GM_getValue("festdd");
wechselgehen(welcherplunder);
},false);

document.getElementsByName('fest5')[0].addEventListener('click', function wechseln5() {
time_box.textContent = 'Button 5 Gedrueckt wechsel Plunder';
var welcherplunder = GM_getValue("festee");
wechselgehen(welcherplunder);
},false);
}




































try{
if (url.indexOf("activities")>=0) {



if (GM_getValue("SammelzurueckPlunder1") == 2){

function endesammeln(){

			counter = document.getElementById("counter2").innerHTML.replace(/\:/g, "");

			if(counter>=100){
				document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:green; font-size:80%;\"><b>x</b></font>';
			}else
			if(counter>=10){
				document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\"><b>x</b></strong>';
			}else  
			if(counter<=10){
				document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:red; font-size:80%;\"><b>x</b></font>';
			}else 
			if(counter<=1){
				var welcherplunder = GM_getValue("wechsel51");
				wechselgehen(welcherplunder);
				document.getElementsByName("status5")[0].innerHTML = '<a style=\"color:red; font-size:80%;\">Wechsel Plunder</a>';   
			}
time_box.textContent = 'Status an ende der Zeit '+counter+'';
}

window.setInterval(endesammeln, 1000);
}

if (GM_getValue("SammelzurueckPlunder1") == 3){

time_box.textContent = 'Status sofort wechseln ';
			document.getElementsByClassName("captcha")[0].addEventListener('click', function postsuchesr() {
				var welcherplunder = GM_getValue("wechsel11");
				var check11 = '1';
				x=1;
				document.getElementsByName("status1")[0].innerHTML = '<font style=\"color:red; font-size:100%;\"><b>Plunder wird gewechselt</b></font>';

				wechselgehen(welcherplunder,check11,x);
			},false);
}

}
}catch(e){}


	

		


		 




























/*
if (url.indexOf("/fight/overview/")>=0) {
try{
document.getElementsByClassName("captcha")[0].addEventListener('click', function postsuchesr() {
var welcherplunder = GM_getValue("wechsel21");
var check11 = '2';
wechselgehen(welcherplunder,check11);
document.getElementsByName("status2")[0].innerHTML = '<font style=\"color:red; font-size:100%;\"><b>Plunder wird gewechselt</b></font>';
},false);}catch(e){}}



if (url.indexOf("/skills/")>=0) {
try{
document.getElementsByClassName("captcha")[0].addEventListener('click', function postsuchesr() {
var welcherplunder = GM_getValue("wechsel41");
var check11 = '3';
wechselgehen(welcherplunder,check11);
document.getElementsByName("status4")[0].innerHTML = '<font style=\"color:red; font-size:100%;\"><b>Plunder wird gewechselt</b></font>';
},false);}catch(e){}}









function counter_sammeln(){

	counter = document.getElementById("counter2").innerHTML.replace(/\:/g, "");

		if(counter>=100){
			document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:green; font-size:80%;\"><b>x</b></font>';
			}else
			if(counter>=10){
				document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\"><b>x</b></strong>';
			}else  
			if(counter<=10){
				document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:red; font-size:80%;\"><b>x</b></font>';
			}else 
			if(counter<=1){
				var welcherplunder = GM_getValue("wechsel51");
				wechselgehen(welcherplunder);
				document.getElementsByName("status5")[0].innerHTML = '<a style=\"color:red; font-size:80%;\">Wechsel Plunder</a>';   
				}
}





function counter_fighten(){
	counter1 = document.getElementById("counter1").innerHTML.replace(/\:/g, "");// fight counter
	if(counter1>=100){
		document.getElementsByName("status2")[0].innerHTML = '<a style=\"color:green; font-size:80%;\"><b>x</b></font>';
		}else
	if(counter1>=10){
		document.getElementsByName("status2")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\"><b>x</b></strong>';
		}else 
	if(counter1<=10){
		document.getElementsByName("status2")[0].innerHTML = '<a style=\"color:red; font-size:80%;\"><b>x</b></font>';
		}else
	if(counter<=1){
		document.getElementsByName("status6")[0].innerHTML = '<a style=\"color:red; font-size:80%;\">Wechsel Plunder</a>';   //document.getElementsByName("status1")[0].innerHTML = '<br><font style=\"color:black; font-size:80%;\"><b>'+counter+'</b></font>';
		var welcherplunder = GM_getValue("wechsel61");
		wechselgehen(welcherplunder);
	}
}
window.setInterval(counter_fighten, 1000);



function counter_bilden(){
	counter2 = document.getElementById("counter0").innerHTML.replace(/\:/g, "");// fight counter
	counter2 = counter2.replace(/\Tage/g, "");
	counter2 = counter2.replace(/\ /g, "");
	if(counter2>=100){
		document.getElementsByName("status4")[0].innerHTML = '<a style=\"color:green; font-size:80%;\"><b>x</b></font>';
		}else
	if(counter2>=10){
		document.getElementsByName("status4")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\"><b>x</b></strong>';
		}else 
	if(counter2<=10){
		document.getElementsByName("status4")[0].innerHTML = '<a style=\"color:red; font-size:80%;\"><b>x</b></font>';
		}else
	if(counter<=10){
		var welcherplunder = GM_getValue("wechsel71");
		wechselgehen(welcherplunder);
		document.getElementsByName("status7")[0].innerHTML = '<a style=\"color:red; font-size:80%;\">Wechsel Plunder</a>';   //document.getElementsByName("status1")[0].innerHTML = '<br><font style=\"color:black; font-size:80%;\"><b>'+counter+'</b></font>';
	}
}
window.setInterval(counter_bilden, 1000);



*/































function wechselgehen(welcherplunder,check11,x){
	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'/stock/plunder/change/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_plunder='+welcherplunder+''),
			onload: function(responseDetails){
time_box.textContent = 'Wechsel Plunder';
				GM_xmlhttpRequest({
					method: 'GET',
  					url: ''+link+'/activities/bottle/',
						onload: function(responseDetails) {
						var contentr = responseDetails.responseText;

						if(check11 == 3){
							document.getElementsByName("status4")[0].innerHTML = '<font style=\"color:green; font-size:100%;\"><b>Und zurueck</b></font>';

							var suche = contentr.search("bereits eine Weiterbildung");
							var anlegen = GM_getValue("wechsel71");
							}else{

						}

						if(check11 == 2){
							document.getElementsByName("status2")[0].innerHTML = '<font style=\"color:green; font-size:100%;\"><b>Und zurueck</b></font>';

							var suche = contentr.search("uft bereits auf");
							var anlegen = GM_getValue("wechsel61");
							}else{

						}

						if(check11 == 1){
time_box.textContent = 'Check Sammel zurueck Plunder';
							document.getElementsByName("status1")[0].innerHTML = '<font style=\"color:green; font-size:100%;\"><b>Und zurueck</b></font>';

							var suche = contentr.search("Du bist auf Pfandflaschensuche:");
							var anlegen = GM_getValue("wechsel51");
						}else{

						}

							if (suche != -1) {

								GM_xmlhttpRequest({
									method: 'POST',
									url: ''+link+'/stock/plunder/change/',
									headers: {'Content-type': 'application/x-www-form-urlencoded'},
									data: encodeURI('f_plunder='+anlegen+''),
										onload: function(responseDetails){}
								});
							}else{}
					}
				});//window.location.reload();
			}
	});
}


GM_setValue("table6", table6);
}










//************************************************************************************************
//****************  Einsttelbereich womit das einstellmenue gesteuert und gespeichert wird *******
//************************************************************************************************



if (url.indexOf('/?PlunderBot-Einstellung')>=0){
document.getElementsByTagName('html')[0].innerHTML = '<head><title>Basis PlunderBot Einstellbereich</title> <link rel="shortcut icon" href="http://static.pennergame.de/img/pv4/favicon.ico" /><link rel="stylesheet" type="text/css" href="http://static.pennergame.de/styles/pv4/pv4_modifiedFromV3.css" title="Main Stylesheet"  /><link rel="stylesheet" type="text/css" href="http://static.pennergame.de/styles/pv4/de_DE/screen_test.css" title="Main Stylesheet"  /></head>';

var Top = '<br>Von oben(px)<input name="Top" size="10" type="text" value="'+GM_getValue("Top")+'">';
var Left = '<br>Von Links(px)<input name="Left" type="text" size="10" value="'+GM_getValue("Left")+'" >';

var hinter ='<br>Rahmenbreite<select name="hinter" id="hinter">'
+'<option value="http://www.fotos-hochladen.net/hintergrundplundermj8ayd12.jpg">Pg 4.0 Style</option>'
+'<option value="">1</option>'
+'<option value="">2</option>'
+'<option value="">3</option>'
+'<option value="">4</option>'
+'<option value="">5</option>'
+'<option value="">6</option>'
+'<option value="">7</option>'
+'<option value="">8</option>'
+'<option value="">9</option>'
+'<option value="">10</option>'
+'<option value="">11</option>'
+'<option value="">12</option>'
+'<option value="">13</option>'
+'<option value=" ">14</option>'
+'<option value="">15</option>'
+'</select>';

var inhalt1 = 'Herzlichen Gl&uuml;ckwunsch zu den neu zugelegten PlunderBot-Skript By Basti1012<br>'
+'Hier unter den Einstellungen k&ouml;nnt ihr f&uuml;r  jeder Aktion die das Script macht einen Plunder fest Speichern '
+'und somit braucht ihr euch nicht mehr um den Plunder k&uuml;mmern ,'
+'das Automatische wechseln bei jeder Aktion wird von Script gemacht .<br><br><br>';

var inhalt2 = 'Hier sucht ihr euch den Plunder aus,dieser Plunder ist in euren besitz und so mit keine Falsche Plunder vergabe m&ouml;glich.<br>'
+'Einfach Plunder ausw&auml;hlen und dann auf den Btton klicken zu welcher Aktion der Plunder zugeh&ouml;ren soll<br><br>'
//+'<select name="plunderid" id="plunderid">'+GM_getValue("table6")+'</select><br>';

var inhalt3 = ''
+'<select name="plunderid1" id="plunderid1">'+GM_getValue("table6")+'</select>Plunder was vor den Sammeln angelget werden soll :           		<strong>'+GM_getValue("wechsel11")+'</strong><br>'
+'<select name="plunderid2" id="plunderid2">'+GM_getValue("table6")+'</select>Plunder was vor den K&auml;mpfen angelget werden soll :           		<strong>'+GM_getValue("wechsel21")+'</strong><br>'
+'<select name="plunderid3" id="plunderid3">'+GM_getValue("table6")+'</select>Plunder was vor den Spenden angelget werden soll :		  		<strong>'+GM_getValue("wechsel31")+'</strong><br>'
+'<select name="plunderid4" id="plunderid4">'+GM_getValue("table6")+'</select>Plunder was vor den Weiterbildungen angelget werden soll :	        		<strong>'+GM_getValue("wechsel41")+'</strong><br>'
+'<select name="plunderid5" id="plunderid5">'+GM_getValue("table6")+'</select>Plunder was angelegt werden soll wenn sammeln zuende ist  :	          	<strong>'+GM_getValue("wechsel51")+'</strong><br>'
+'<select name="plunderid6" id="plunderid6">'+GM_getValue("table6")+'</select>Plunder was angelegt werden soll wenn fighten zuende ist  :          	<strong>'+GM_getValue("wechsel61")+'</strong><br>'
+'<select name="plunderid7" id="plunderid7">'+GM_getValue("table6")+'</select>Plunder was angelegt werden soll wenn Weiterbildung zuende ist :          	<strong>'+GM_getValue("wechsel71")+'</strong><br><br>'
+'<input type="button" name="SchliessenExtraMenue" id="SchliessenExtraMenue" value="Speichern">'
+' <span align=\"center\" style=\"color:green;\">Hier k&ouml;nnt ihr euch noch 5 Extra Plunder auf Buttons Speichern ,somit habt ihr mit ein klick den Plunder angelegt den ihr hier Speichern tut.'
+' Die Buttons lassen sich ein oder ausblenden(einstellung weiter unten)wie ihr wollt.<br></span>'

+'<select name="plunderid8" id="plunderid8">'+GM_getValue("table6")+'</select>Plunder Button 1:<input type="button" id="fest11" name="fest11" value="Plunder Button 1">      <strong>'+GM_getValue("festaa")+'</strong><br>'
+'<select name="plunderid9" id="plunderid9">'+GM_getValue("table6")+'</select>Plunder Button 2:<input type="button" id="fest22" name="fest22" value="Plunder Button 2">      <strong>'+GM_getValue("festbb")+'</strong><br>'
+'<select name="plunderid10" id="plunderid10">'+GM_getValue("table6")+'</select>Plunder Button 3:<input type="button" id="fest33" name="fest33" value="Plunder Button 3">      <strong>'+GM_getValue("festcc")+'</strong><br>'
+'<select name="plunderid11" id="plunderid11">'+GM_getValue("table6")+'</select>Plunder Button 4:<input type="button" id="fest44" name="fest44" value="Plunder Button 4">      <strong>'+GM_getValue("festdd")+'</strong><br>'
+'<select name="plunderid12" id="plunderid12">'+GM_getValue("table6")+'</select>Plunder Button 5:<input type="button" id="fest55" name="fest55" value="Plunder Button 5">      <strong>'+GM_getValue("festee")+'</strong><br>'
+'<input type="button" name="SchliessenExtraMenue" id="SchliessenExtraMenue" value="Speichern">'
+'<br><br>'
+''+Top+Left+hinter+''
+'<br>';

var Speichererklarung1 = '<br><br><br><span align=\"center\" style=\"color:green;\"><b>Nach den klick auf Speichern wird neben der Einstellungen Zahlen angezeigt,<br>'
+'die euch anzeigen was ihr vorher gespeichert habt <br>'
+' 0 = Es werden die angeeene Einstellungen angezeigt <br>'
+' 1 = Es werden die sachen nicht angezeigt (deaktiviert)<br>'
+' 2 = Es wird der Plunder erst an ablauf der Zeit gewechselt<br>'
+' 3 = Es wird der Plunder direkt nach Starten der Aktion wieder zur&uuml;ck gewechselt</b></span><br><br><br>';

var PlunderAoutAll1 ='<br><h2>PlunderAoutAll</h2><select name="PlunderAoutAll" id="PlunderAoutAll">'
+'<option value="0">PlunderAoutAll anzeigen</option>'
+'<option value="1">PlunderAoutAll Ausblenden</option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("PlunderAoutAll1")+'</b></span>'

var PlunderWerte1 ='<br><h2>PlunderWerte</h2><select name="PlunderWerte" id="PlunderWerte">'
+'<option value="0">PlunderWerte anzeigen</option>'
+'<option value="1">PlunderWerte Ausblenden</option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("PlunderWerte1")+'</b></span>'

var FightPlunder1 ='<br><h2>FightPlunder</h2><select name="FightPlunder" id="FightPlunder">'
+'<option value="0">FightPlunder anzeigen</option>'
+'<option value="">FightPlunder Ausblenden</option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("FightPlunder1")+'</b></span>'

var SammelPlunder1 ='<br><h2>SammelPlunder</h2><select name="SammelPlunder" id="SammelPlunder">'
+'<option value="0"> SammelPlunder anzeigen </option>'
+'<option value=""> SammelPlunderAusblenden </option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("SammelPlunder1")+'</b></span>'

var SpendenPlunder1 ='<br><h2>SpendenPlunder</h2><select name="SpendenPlunder" id="SpendenPlunder">'
+'<option value="0"> SpendenPlunder anzeigen </option>'
+'<option value="1"> SpendenPlunder Ausblenden </option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("SpendenPlunder1")+'</b></span>'

var WeiterPlunder1 ='<br><h2>Weiterbildungs Plunder</h2><select name="WeiterPlunder" id="WeiterPlunder">'
+'<option value="0">WeiterPlunder anzeigen</option>'
+'<option value="1">WeiterPlunder Ausblenden</option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("WeiterPlunder1")+'</b></span><br>'

var SammelzurueckPlunder1 ='<br><h2>Sammel zur&uuml;ck Plunder</h2><select name="SammelzurueckPlunder" id="SammelzurueckPlunder">'
+'<option value="2">Sammel back  anzeigen und an ende der Zeit zur&uuml;ck wechseln</option>'
+'<option value="3">Sammel back  anzeigen und direkt nach starten der Aktion zur&uuml;ck wechseln</option>'
+'<option value="1">Sammel back  ausblenden</option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("SammelzurueckPlunder1")+'</b></span>'

var FightzurueckPlunder1 ='<br><h2>Fight zur&uuml;ck Plunder</h2><select name="FightzurueckPlunder" id="FightzurueckPlunder">'
+'<option value="2">Fight back  anzeigen und an ende der Zeit zur&uuml;ck wechseln</option>'
+'<option value="3">Fight back  anzeigen und direkt nach starten der Aktion zur&uuml;ck wechseln</option>'
+'<option value="1">Fight back  ausblenden</option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("FightzurueckPlunder1")+'</b></span>'

var WeiterzurueckPlunder1 ='<br><h2>Weiterbildungs zur&uuml;ck Plunder</h2><select name="WeiterzurueckPlunder" id="WeiterzurueckPlunder">'
+'<option value="2">Weiterbildungs back  anzeigen und an Ende der Zeit zur&uuml;ck wechseln</option>'
+'<option value="3">Weiterbildungs back  anzeigen und direkt nach starten der Aktion zur&uuml;ck wechseln</option>'
+'<option value="1">Weiterbildungs back  ausblenden</option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("WeiterzurueckPlunder1")+'</b></span><br>'

var Einstellplunder1 ='<br><h2>Einstell Button auslenden</h2><select name="Einstellplunder" id="Einstellplunder">'
+'<option value="0">Einstellbutton Anzeigen</option>'
+'<option value="1">Einstellbutton Ausblenden</option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("Einstellplunder1")+'</b></span><br>'


var FestPlunder1 ='<br><h2>SpendenPlunder</h2><select name="FestPlunder" id="FestPlunder">'
+'<option value="0"> Extra speicherbare Plunder Buttons anzeigen</option>'
+'<option value="1"> Extra Buttons ausblenden</option></select><span align=\"center\" style=\"color:green;\"><b>'+GM_getValue("FestPlunder1")+'</b></span>'






var inhalt4 = ''+Speichererklarung1+PlunderAoutAll1+PlunderWerte1+FightPlunder1+SammelPlunder1+SpendenPlunder1+WeiterPlunder1+SammelzurueckPlunder1+FightzurueckPlunder1+WeiterzurueckPlunder1+Einstellplunder1+FestPlunder1+'';

var inhalt5 = '<br><span align=\"center\" style=\"color:green;\">Bitte klicken sie auf schliessen</span><br>'
+'<span align="center" style="color;green;" ><input type="button" name="SchliessenExtraMenue" id="SchliessenExtraMenue" value="Speichern und zur&uuml;ck nach Pennergame"><br><br><br>Copyright By basti1012   <a href="http://pennerhack.foren-city.de">Homepage von Basti1012</a><br><br>  Ab hier ist test bitte nicht beachten ';

var body = document.createElement('body');
body.innerHTML = '<a href="/overview/"><- zur &Uuml;bersicht</a><br><center><h2 style="color: white;"><u>PlunderBot Einstellungen</u></h2></center>'+inhalt1+inhalt2+inhalt3+inhalt4+inhalt5+'';
document.getElementsByTagName('html')[0].appendChild(body);
var links = document.createElement('div');
body.appendChild(links);





















for(x = 0; x <= 2; x++){
document.getElementsByName('SchliessenExtraMenue')[x].addEventListener('click', function Schliessen () {

GM_setValue("Left", document.getElementsByName('Left')[0].value);
GM_setValue("Top", document.getElementsByName('Top')[0].value);
GM_setValue("hinter", document.getElementsByName('hinter')[0].value);
GM_setValue("PlunderAoutAll1", document.getElementsByName('PlunderAoutAll')[0].value);
GM_setValue("PlunderWerte1", document.getElementsByName('PlunderWerte')[0].value);
GM_setValue("SammelPlunder1", document.getElementsByName('SammelPlunder')[0].value);
GM_setValue("FightPlunder1", document.getElementsByName('FightPlunder')[0].value);
GM_setValue("SpendenPlunder1", document.getElementsByName('SpendenPlunder')[0].value);
GM_setValue("WeiterPlunder1", document.getElementsByName('WeiterPlunder')[0].value);
GM_setValue("SammelzurueckPlunder1", document.getElementsByName('SammelzurueckPlunder')[0].value);
GM_setValue("FightzurueckPlunder1", document.getElementsByName('FightzurueckPlunder')[0].value);
GM_setValue("WeiterzurueckPlunder1", document.getElementsByName('WeiterzurueckPlunder')[0].value);
GM_setValue("Einstellplunder1", document.getElementsByName('Einstellplunder')[0].value);
GM_setValue("FestPlunder1", document.getElementsByName('FestPlunder')[0].value);


GM_setValue("wechsel11", document.getElementsByName('plunderid1')[0].value);
GM_setValue("wechsel21", document.getElementsByName('plunderid2')[0].value);
GM_setValue("wechsel31", document.getElementsByName('plunderid3')[0].value);
GM_setValue("wechsel41", document.getElementsByName('plunderid4')[0].value);
GM_setValue("wechsel51", document.getElementsByName('plunderid5')[0].value);
GM_setValue("wechsel61", document.getElementsByName('plunderid6')[0].value);
GM_setValue("wechsel71", document.getElementsByName('plunderid7')[0].value);

GM_setValue("festaa", document.getElementsByName('plunderid8')[0].value);
GM_setValue("festbb", document.getElementsByName('plunderid9')[0].value);
GM_setValue("festcc", document.getElementsByName('plunderid10')[0].value);
GM_setValue("festdd", document.getElementsByName('plunderid11')[0].value);
GM_setValue("festee", document.getElementsByName('plunderid12')[0].value);
time_box.textContent = 'Alle einstellungen gespeichert';
//window.location.href = link;
window.location.reload();
},false);

}

















/*
						if(check11 == 3){
time_box.textContent = 'weiterbildungs Plunder zurueck status wird abgefragt ';
							document.getElementsByName("status4")[0].innerHTML = '<font style=\"color:green; font-size:100%;\"><b>Und zurueck</b></font>';

							var suche = contentr.search("bereits eine Weiterbildung");
							var anlegen = GM_getValue("wechsel71");
							}else{

						}

						if(check11 == 2){
time_box.textContent = 'Fight Plunder zurueck status wird abgefragt ';
							document.getElementsByName("status2")[0].innerHTML = '<font style=\"color:green; font-size:100%;\"><b>Und zurueck</b></font>';
							var suche = contentr.search("uft bereits auf");
							var anlegen = GM_getValue("wechsel61");
							}else{

						}

document.getElementsByName('save1')[0].addEventListener('click', function Schliessen1 () {
GM_setValue("wechsel11", document.getElementById('plunderid').value);
},false);

document.getElementsByName('save2')[0].addEventListener('click', function Schliessen2 () {
GM_setValue("wechsel21", document.getElementById('plunderid').value);
},false);

document.getElementsByName('save3')[0].addEventListener('click', function Schliessen3 () {
GM_setValue("wechsel31", document.getElementById('plunderid').value);
},false);

document.getElementsByName('save4')[0].addEventListener('click', function Schliessen4 () {
GM_setValue("wechsel41", document.getElementById('plunderid').value);
},false);

document.getElementsByName('save5')[0].addEventListener('click', function Schliessen5 () {
GM_setValue("wechsel51", document.getElementById('plunderid').value);
},false);

document.getElementsByName('save6')[0].addEventListener('click', function Schliessen6 () {
GM_setValue("wechsel61", document.getElementById('plunderid').value);
},false);

document.getElementsByName('save7')[0].addEventListener('click', function Schliessen7 () {
GM_setValue("wechsel71", document.getElementById('plunderid').value);
},false);

document.getElementsByName('fest11')[0].addEventListener('click', function Schliessen3 () {
GM_setValue("festaa", document.getElementById('plunderid').value);
},false);

document.getElementsByName('fest22')[0].addEventListener('click', function Schliessen4 () {
GM_setValue("festbb", document.getElementById('plunderid').value);
},false);

document.getElementsByName('fest33')[0].addEventListener('click', function Schliessen5 () {
GM_setValue("festcc", document.getElementById('plunderid').value);
},false);

document.getElementsByName('fest44')[0].addEventListener('click', function Schliessen6 () {
GM_setValue("festdd", document.getElementById('plunderid').value);
},false);

document.getElementsByName('fest55')[0].addEventListener('click', function Schliessen7 () {
GM_setValue("festee", document.getElementById('plunderid').value);
document.getElementsByName("HIN12")[0].innerHTML = '<font style=\"color:green; font-size:80%;\"><b>Save Id : '+GM_getValue("festee")+'</font>';
},false);
*/
}













// copyright By Basti1012 
// dieses Script darf nicht verender werden oder irgendwo im Netz angeboten werden.
// Wr dieses script endern will muss sich die erlaubnis von Basti1012 holen .

//window.location.reload();


