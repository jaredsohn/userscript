// ==UserScript==
// @name           Przyciski do zmiany rupieci (5x2Penergame Plunder Buttons)
// @description    Skrypt dodaje przyciski dzięki którym można szybko zmienić obecnego rupiecia na innego.
// @namespace      http://pennerhack.foren-city.de basti102
// @autor          Basti1012 & mikskape
// @version        1.3
// @include        http://*menelgame.pl*
// @exclude        http://*board.menelgame.pl*
// ==/UserScript==
// autor Basti1012
// orginalny skrypt http://userscripts.org/scripts/show/66015

var s_wersja = '1.3';
var s_info = 'http://userscripts.org/scripts/show/67704';
var s_url = 'http://userscripts.org/scripts/source/67704.user.js';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "Przyciski do zmiany rupieci (5x2Penergame Plunder Buttons)". \nProszę potwierdzić instalację.')
		window.location.href=s_url;
		}
	}
	});


var url = document.location.href;
var link = "http://www.menelgame.pl"
var town ='hamburg';

var jetzt = new Date();
var Stunde = jetzt.getHours();
var StundeA = ((Stunde < 10) ? "0" + Stunde : Stunde);
var Minuten = jetzt.getMinutes();
var MinutenA = ((Minuten < 10) ? "0" + Minuten : Minuten);
var Sek = jetzt.getSeconds();
var SekA = ((Sek < 10) ? "0" + Sek : Sek);

ll= GM_getValue("stundeende");
if(ll==StundeA){
 endtime = '-';
GM_setValue("endtime", endtime);
}


GM_xmlhttpRequest({
    method: 'GET',
    url: ''+link+'/fight/overview/',
    onload: function(responseDetails) {
				var content = responseDetails.responseText;
			  if(content.match(/warning/)){
endtime = '-';
GM_setValue("endtime", endtime);
				}
    }
});

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('div#new_container3 {position:absolute; top:104px; left:372px; margin-left:1px; width:173px;}')
addGlobalStyle('.inhalt_newcontainer3 {padding-top:8px; padding-bottom:10px; padding-left:2%; background: url(http://i35.tinypic.com/11qqpnp.jpg) ; font-weight:bold; color:black; font-size:15px; text-align:center; } ')

addGlobalStyle('div#new_container4 {position:absolute; top:234px; left:172px; margin-left:1px; width:473px;}')
addGlobalStyle('.inhalt_newcontainer4 {padding-top:8px; padding-bottom:10px; padding-left:2%; background-color:white; ; font-weight:bold; color:black; font-size:15px; text-align:left; } ')

if(document.getElementById("my-profile")){
var tbody = document.createElement('div');
document.body.appendChild(tbody);
//var tbody = document.getElementsByClassName('icon error zleft')[0];
tbody.innerHTML = ''
+'<div id=\"new_container3\"><div class=\"inhalt_newcontainer2\">'
+'<input type="button" id="button1" name="button1" value="'+GM_getValue("text1")+'" ><input type="button" id="button11" name="button11" value="'+GM_getValue("text11")+'" ><br>'
+'<input type="button" id="button2" name="button2" value="'+GM_getValue("text2")+'" ><input type="button" id="button22" name="button22" value="'+GM_getValue("text22")+'" ><br>'
+'<input type="button" id="button3" name="button3" value="'+GM_getValue("text3")+'" ><input type="button" id="button33" name="button33" value="'+GM_getValue("text33")+'" ><br>'
+'<input type="button" id="button4" name="button4" value="'+GM_getValue("text4")+'" ><input type="button" id="button44" name="button44" value="'+GM_getValue("text44")+'" ><br>'
+'<input type="button" id="button5" name="button5" value="'+GM_getValue("text5")+'" ><input type="button" id="button55" name="button55" value="'+GM_getValue("text55")+'" ><br>'
+'<button type="button" id="save""><img src="'+GM_getValue("plunderbild")+'" border="0" height="35" width="50" alt="Zapisz"><div id="kamp" ></button>';
}
document.getElementById('button1').addEventListener('click', function waschen(){
welcher = GM_getValue("plu1");
nazwa = GM_getValue("text1");
wechseln(welcher, nazwa, 'x')
},false);

document.getElementById('button2').addEventListener('click', function waschen(){
welcher = GM_getValue("plu2");
nazwa = GM_getValue("text2");
wechseln(welcher, nazwa, 'x')
},false);

document.getElementById('button3').addEventListener('click', function waschen(){
welcher = GM_getValue("plu3");
nazwa = GM_getValue("text3");
wechseln(welcher, nazwa, 'x')
},false);

document.getElementById('button4').addEventListener('click', function waschen(){
welcher = GM_getValue("plu4");
nazwa = GM_getValue("text4");
wechseln(welcher, nazwa, 'x')
},false);

document.getElementById('button5').addEventListener('click', function waschen(){
welcher = GM_getValue("plu5");
nazwa = GM_getValue("text5");
wechseln(welcher, nazwa, 'x')
},false);

document.getElementById('button11').addEventListener('click', function waschen(){
welcher = GM_getValue("plu11");
nazwa = GM_getValue("text11");
wechseln(welcher, nazwa, 'y')
},false);

document.getElementById('button22').addEventListener('click', function waschen(){
welcher = GM_getValue("plu22");
nazwa = GM_getValue("text22");
wechseln(welcher, nazwa, 'y')
},false);

document.getElementById('button33').addEventListener('click', function waschen(){
welcher = GM_getValue("plu33");
nazwa = GM_getValue("text33");
wechseln(welcher, nazwa, 'y')
},false);

document.getElementById('button44').addEventListener('click', function waschen(){
welcher = GM_getValue("plu44");
nazwa = GM_getValue("text44");
wechseln(welcher, nazwa, 'y')
},false);

document.getElementById('button55').addEventListener('click', function waschen(){
welcher = GM_getValue("plu55");
nazwa = GM_getValue("text55");
wechseln(welcher, nazwa, 'y')
},false);


function wechseln(welcher, nazwa, x){

	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'/stock/plunder/change/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_plunder='+welcher+''),
		onload: function(responseDetails)
{

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+link+"/stock/plunder/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table1 = acontent.split('<h3>Założony</h3>')[1];			
			var table12 = table1.split('class="submenu">')[0];								
			var table13 = table12.split('src="')[1];					
			var plunderbild1 = table13.split('"')[0];
			var plunderbild = plunderbild1;							
GM_setValue("plunderbild",plunderbild)
}});
if(x=='x'){var alrt = 'Założono rupieć:'} else {var alrt = 'Użyto rupiecia:'};
alert(alrt+"\nNazwa: "+nazwa+"\n\Id: "+welcher+"\nStrona zostanie odświeżona.");
window.location.href = url;
     	 }
 	 });
}

function wechseln1(welcher, nazwa){
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+link+"/stock/plunder/use/"+welcher+"/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			  if(acontent.match(welcher)){
    			var table1 = acontent.split(welcher)[1];			
			var table12 = table1.split(welcher)[0];	 
     
 			var was = table12.split(')">')[1].split('</a>')[0];
 if(table12.match(/Flaschensammeln: Partytime/)){    
        zeit = '6';
        was = 'Flaschensammeln: Partytime';
        zeitrechnen(zeit,was);
 }	
 if(table12.match(/Minibrunnen/)){       	
        zeit = '6';
        was = 'Minibrunnen';
        zeitrechnen(zeit,was);
 }	else
 if(table12.match(/Flaschenautomat-Attrappe/)){       	
        zeit = '6';
        was = 'Flaschenautomat-Attrappe';
     	  zeitrechnen(zeit,was);
 }		else
 if(table12.match(/rbiskopf/)){       	
        zeit = '12';
        was = 'K&uuml;rbiskopf';
     	  zeitrechnen(zeit,was);
 }else{
 

  GM_setValue("endtime",was)
  
 window.location.href = url;
}
}

function zeitrechnen(zeit,was){

var jetzt = new Date();
var Stunde = jetzt.getHours();
var StundeA = ((Stunde < 10) ? "0" + Stunde : Stunde);
var Minuten = jetzt.getMinutes();
var MinutenA = ((Minuten < 10) ? "0" + Minuten : Minuten);
var Sek = jetzt.getSeconds();
var SekA = ((Sek < 10) ? "0" + Sek : Sek);
gesamty = Number(StundeA)+Number(zeit);

if(gesamty>=23){
gesamt = gesamty-24;
}else{
gesamt = gesamty;
}
var stundeende = ((gesamt < 10) ? "0" + gesamt : gesamt);

endtime = ''+was+' Endet um Ca: <br>'+stundeende+':'+MinutenA+':'+SekA+'';
GM_setValue("stundeende",stundeende)
GM_setValue("endtime",endtime)
}
}});

alert("Użyto: "+welcher+"\nStrona zostanie odświeżona,");
			location.reload();

}

document.getElementById('save').addEventListener('click', function waschen(){

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+link+"/gang/stuff/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table = acontent.split('Odkładaj rupiecie:')[1];			
			var table2 = table.split('Ilość:')[0];	
			var table5 = table2.split('<select name="pid" id="pid">')[1];			
			var table6 = table5.split('</select>')[0];	
			var plunder = '<select name="plunderid" id="plunderid" >'+table6+'</select>';

GM_xmlhttpRequest({
	method: 'GET', 
	url: 'http://'+window.location.host+'/stock/plunder/',
		onload: function(gangresponseDetails) {
		var gangcontent = gangresponseDetails.responseText;

		for(x = 1; x <= 60 ; x++){
			try{
				scheckfeld = gangcontent.split('ztip trhover">')[x].split('</tr>')[0];
				plundername = scheckfeld.split('class="col2">')[1].split('<div')[0];
				plunderid = scheckfeld.split('/stock/plunder/sell/')[1].split('/')[0];
				var suche = scheckfeld.search('http://static.pennergame.de/img/pv4/icons/pl_PL/icon_use.png');

				if (suche != -1) {
//alert(x)
					//document.getElementById("logo")
					GM_setValue("plunderid" + x, plunderid);
					GM_setValue("plundername" + x, plundername);
				}else{
					GM_setValue("plunderid" + x, "SSSAAA");
					GM_setValue("plundername" + x, "SSSAAA");
				}
			}catch(e){
			GM_setValue("plundername" + x,"SSSAAA");
			GM_setValue("plunderid" + x,"SSSAAA");
			}
}
var selectin ='<select name=\"benutzplunder\">'
+'<option value="'+GM_getValue("plunderid1")+'">'+GM_getValue("plundername1")+'</option>'
+'<option value="'+GM_getValue("plunderid2")+'">'+GM_getValue("plundername2")+'</option>'
+'<option value="'+GM_getValue("plunderid3")+'">'+GM_getValue("plundername3")+'</option>'
+'<option value="'+GM_getValue("plunderid4")+'">'+GM_getValue("plundername4")+'</option>'
+'<option value="'+GM_getValue("plunderid5")+'">'+GM_getValue("plundername5")+'</option>'
+'<option value="'+GM_getValue("plunderid6")+'">'+GM_getValue("plundername6")+'</option>'
+'<option value="'+GM_getValue("plunderid7")+'">'+GM_getValue("plundername7")+'</option>'
+'<option value="'+GM_getValue("plunderid8")+'">'+GM_getValue("plundername8")+'</option>'
+'<option value="'+GM_getValue("plunderid9")+'">'+GM_getValue("plundername9")+'</option>'
+'<option value="'+GM_getValue("plunderid10")+'">'+GM_getValue("plundername10")+'</option>'

+'<option value="'+GM_getValue("plunderid11")+'">'+GM_getValue("plundername11")+'</option>'
+'<option value="'+GM_getValue("plunderid12")+'">'+GM_getValue("plundername12")+'</option>'
+'<option value="'+GM_getValue("plunderid13")+'">'+GM_getValue("plundername13")+'</option>'
+'<option value="'+GM_getValue("plunderid14")+'">'+GM_getValue("plundername14")+'</option>'
+'<option value="'+GM_getValue("plunderid15")+'">'+GM_getValue("plundername15")+'</option>'
+'<option value="'+GM_getValue("plunderid16")+'">'+GM_getValue("plundername16")+'</option>'
+'<option value="'+GM_getValue("plunderid17")+'">'+GM_getValue("plundername17")+'</option>'
+'<option value="'+GM_getValue("plunderid18")+'">'+GM_getValue("plundername18")+'</option>'
+'<option value="'+GM_getValue("plunderid19")+'">'+GM_getValue("plundername19")+'</option>'
+'<option value="'+GM_getValue("plunderid20")+'">'+GM_getValue("plundername20")+'</option>'

+'<option value="'+GM_getValue("plunderid21")+'">'+GM_getValue("plundername21")+'</option>'
+'<option value="'+GM_getValue("plunderid22")+'">'+GM_getValue("plundername22")+'</option>'
+'<option value="'+GM_getValue("plunderid23")+'">'+GM_getValue("plundername23")+'</option>'
+'<option value="'+GM_getValue("plunderid24")+'">'+GM_getValue("plundername24")+'</option>'
+'<option value="'+GM_getValue("plunderid25")+'">'+GM_getValue("plundername25")+'</option>'
+'<option value="'+GM_getValue("plunderid26")+'">'+GM_getValue("plundername26")+'</option>'
+'<option value="'+GM_getValue("plunderid27")+'">'+GM_getValue("plundername27")+'</option>'
+'<option value="'+GM_getValue("plunderid28")+'">'+GM_getValue("plundername28")+'</option>'
+'<option value="'+GM_getValue("plunderid29")+'">'+GM_getValue("plundername29")+'</option>'
+'<option value="'+GM_getValue("plunderid30")+'">'+GM_getValue("plundername30")+'</option>'

+'<option value="'+GM_getValue("plunderid31")+'">'+GM_getValue("plundername31")+'</option>'
+'<option value="'+GM_getValue("plunderid32")+'">'+GM_getValue("plundername32")+'</option>'
+'<option value="'+GM_getValue("plunderid33")+'">'+GM_getValue("plundername33")+'</option>'
+'<option value="'+GM_getValue("plunderid34")+'">'+GM_getValue("plundername34")+'</option>'
+'<option value="'+GM_getValue("plunderid35")+'">'+GM_getValue("plundername35")+'</option>'
+'<option value="'+GM_getValue("plunderid36")+'">'+GM_getValue("plundername36")+'</option>'
+'<option value="'+GM_getValue("plunderid37")+'">'+GM_getValue("plundername37")+'</option>'
+'<option value="'+GM_getValue("plunderid38")+'">'+GM_getValue("plundername38")+'</option>'
+'<option value="'+GM_getValue("plunderid39")+'">'+GM_getValue("plundername39")+'</option>'
+'<option value="'+GM_getValue("plunderid40")+'">'+GM_getValue("plundername40")+'</option>'

+'<option value="'+GM_getValue("plunderid41")+'">'+GM_getValue("plundername41")+'</option>'
+'<option value="'+GM_getValue("plunderid42")+'">'+GM_getValue("plundername42")+'</option>'
+'<option value="'+GM_getValue("plunderid43")+'">'+GM_getValue("plundername43")+'</option>'
+'<option value="'+GM_getValue("plunderid44")+'">'+GM_getValue("plundername44")+'</option>'
+'<option value="'+GM_getValue("plunderid45")+'">'+GM_getValue("plundername45")+'</option>'
+'<option value="'+GM_getValue("plunderid46")+'">'+GM_getValue("plundername46")+'</option>'
+'<option value="'+GM_getValue("plunderid47")+'">'+GM_getValue("plundername47")+'</option>'
+'<option value="'+GM_getValue("plunderid48")+'">'+GM_getValue("plundername48")+'</option>'
+'<option value="'+GM_getValue("plunderid49")+'">'+GM_getValue("plundername49")+'</option>'
+'<option value="'+GM_getValue("plunderid50")+'">'+GM_getValue("plundername50")+'</option>'

+'<option value="'+GM_getValue("plunderid51")+'">'+GM_getValue("plundername51")+'</option>'
+'<option value="'+GM_getValue("plunderid52")+'">'+GM_getValue("plundername52")+'</option>'
+'<option value="'+GM_getValue("plunderid53")+'">'+GM_getValue("plundername53")+'</option>'
+'<option value="'+GM_getValue("plunderid54")+'">'+GM_getValue("plundername54")+'</option>'
+'<option value="'+GM_getValue("plunderid55")+'">'+GM_getValue("plundername55")+'</option>'
+'<option value="'+GM_getValue("plunderid56")+'">'+GM_getValue("plundername56")+'</option>'
+'<option value="'+GM_getValue("plunderid57")+'">'+GM_getValue("plundername57")+'</option>'
+'<option value="'+GM_getValue("plunderid58")+'">'+GM_getValue("plundername58")+'</option>'
+'<option value="'+GM_getValue("plunderid59")+'">'+GM_getValue("plundername59")+'</option>'
+'<option value="'+GM_getValue("plunderid60")+'">'+GM_getValue("plundername60")+'</option>'

+'<option value="'+GM_getValue("plunderid61")+'">'+GM_getValue("plundername61")+'</option>'
+'<option value="'+GM_getValue("plunderid62")+'">'+GM_getValue("plundername62")+'</option>'
+'<option value="'+GM_getValue("plunderid63")+'">'+GM_getValue("plundername63")+'</option>'
+'<option value="'+GM_getValue("plunderid64")+'">'+GM_getValue("plundername64")+'</option>'
+'<option value="'+GM_getValue("plunderid65")+'">'+GM_getValue("plundername65")+'</option>'
+'<option value="'+GM_getValue("plunderid66")+'">'+GM_getValue("plundername66")+'</option>'
+'<option value="'+GM_getValue("plunderid67")+'">'+GM_getValue("plundername67")+'</option>'
+'<option value="'+GM_getValue("plunderid68")+'">'+GM_getValue("plundername68")+'</option>'
+'<option value="'+GM_getValue("plunderid69")+'">'+GM_getValue("plundername69")+'</option>'
+'<option value="'+GM_getValue("plunderid70")+'">'+GM_getValue("plundername70")+'</option>'

+'<option value="'+GM_getValue("plunderid71")+'">'+GM_getValue("plundername71")+'</option>'
+'<option value="'+GM_getValue("plunderid72")+'">'+GM_getValue("plundername72")+'</option>'
+'<option value="'+GM_getValue("plunderid73")+'">'+GM_getValue("plundername73")+'</option>'
+'<option value="'+GM_getValue("plunderid74")+'">'+GM_getValue("plundername74")+'</option>'
+'<option value="'+GM_getValue("plunderid75")+'">'+GM_getValue("plundername75")+'</option>'
+'<option value="'+GM_getValue("plunderid76")+'">'+GM_getValue("plundername76")+'</option>'
+'<option value="'+GM_getValue("plunderid77")+'">'+GM_getValue("plundername77")+'</option>'
+'<option value="'+GM_getValue("plunderid78")+'">'+GM_getValue("plundername78")+'</option>'
+'<option value="'+GM_getValue("plunderid79")+'">'+GM_getValue("plundername79")+'</option>'
+'<option value="'+GM_getValue("plunderid80")+'">'+GM_getValue("plundername80")+'</option>'
+'</select>';
selectin = selectin.replace(/<option value="SSS/g,"");
selectin = selectin.replace(/AAA</g,"");
selectin = selectin.replace(/AAA">SSS/g,"");
selectin = selectin.replace(/<option value="undefi/g,"");
selectin = selectin.replace(/ned</g,"");
selectin = selectin.replace(/ned">undefi/g,"");


		var suche1 = scheckfeld.search('68269533');
		if (suche1 != -1) {
		waswert = scheckfeld.split('class="line">')[2].split('</p>')[0];
		alert(waswert);
		}
		

var plu1x = GM_getValue("plu1");
if(plu1x == null | undefined){plu1x = "-"};
var plu2x = GM_getValue("plu2");
if(plu2x == null | undefined){plu2x = "-"};
var plu3x = GM_getValue("plu3");
if(plu3x == null | undefined){plu3x = "-"};
var plu4x = GM_getValue("plu4");
if(plu4x == null | undefined){plu4x = "-"};
var plu5x = GM_getValue("plu5");
if(plu5x == null | undefined){plu5x = "-"};
var plu11x = GM_getValue("plu11");
if(plu11x == null | undefined){plu11x = "-"};
var plu22x = GM_getValue("plu22");
if(plu22x == null | undefined){plu22x = "-"};
var plu33x = GM_getValue("plu33");
if(plu33x == null | undefined){plu33x = "-"};
var plu44x = GM_getValue("plu44");
if(plu44x == null | undefined){plu44x = "-"};
var plu55x = GM_getValue("plu55");
if(plu55x == null | undefined){plu55x = "-"};

var tbody = document.createElement('div');
document.body.appendChild(tbody);
//var tbody = document.getElementsByClassName('icon error zleft')[0];
tbody.innerHTML = ''
+'<div id=\"new_container4\"><div class=\"inhalt_newcontainer4\">'
+'<center>Zwykłe rupiecie '+plunder+'</center><br>'
+'Nazwa : <input type="text" id="text1" name="text1" value="'+GM_getValue("text1")+'">'
+'<input type="button" id="save1" name="save1" value="Ustaw przycisk 1" > Id: '+plu1x+'<br>'
+'Nazwa : <input type="text" id="text2" name="text2" value="'+GM_getValue("text2")+'">'
+'<input type="button" id="save2" name="save2" value="Ustaw przycisk 2" > Id: '+plu2x+'<br>'
+'Nazwa : <input type="text" id="text3" name="text3" value="'+GM_getValue("text3")+'">'
+'<input type="button" id="save3" name="save3" value="Ustaw przycisk 3" > Id: '+plu3x+'<br>'
+'Nazwa : <input type="text" id="text4" name="text4" value="'+GM_getValue("text4")+'">'
+'<input type="button" id="save4" name="save4" value="Ustaw przycisk 4" > Id: '+plu4x+'<br>'
+'Nazwa : <input type="text" id="text5" name="text5" value="'+GM_getValue("text5")+'">'
+'<input type="button" id="save5" name="save5" value="Ustaw przycisk 5" > Id: '+plu5x+'<br>'

+'<br><hr><br><center>Jednorazowe rupiecie '+selectin+'</center><br>'
+'Nazwa : <input type="text" id="text11" name="text11" value="'+GM_getValue("text11")+'">'
+'<input type="button" id="save11" name="save11" value="Ustaw przycisk 6" > Id: '+plu11x+'<br>'
+'Nazwa : <input type="text" id="text22" name="text22" value="'+GM_getValue("text22")+'">'
+'<input type="button" id="save22" name="save22" value="Ustaw przycisk 7" > Id: '+plu22x+'<br>'
+'Nazwa : <input type="text" id="text33" name="text33" value="'+GM_getValue("text33")+'">'
+'<input type="button" id="save33" name="save33" value="Ustaw przycisk 8" > Id: '+plu33x+'<br>'
+'Nazwa : <input type="text" id="text44" name="text44" value="'+GM_getValue("text44")+'">'
+'<input type="button" id="save44" name="save44" value="Ustaw przycisk 9" > Id: '+plu44x+'<br>'
+'Nazwa : <input type="text" id="text55" name="text55" value="'+GM_getValue("text55")+'">'
+'<input type="button" id="save55" name="save55" value="Ustaw przycisk 10" > Id: '+plu55x+'<br>';


document.getElementById('save1').addEventListener('click', function waschen(){
GM_setValue("text1", document.getElementsByName('text1')[0].value);
GM_setValue("plu1", document.getElementsByName('plunderid')[0].value);
alert("Zapisano:\nNazwa przycisku: "+document.getElementsByName('text1')[0].value+"\nID rupiecia: "+document.getElementsByName('plunderid')[0].value+"")
},false);

document.getElementById('save2').addEventListener('click', function waschen(){
GM_setValue("text2", document.getElementsByName('text2')[0].value);
GM_setValue("plu2", document.getElementsByName('plunderid')[0].value);
alert("Zapisano:\nNazwa przycisku: "+document.getElementsByName('text2')[0].value+"\nID rupiecia: "+document.getElementsByName('plunderid')[0].value+"")
},false);


document.getElementById('save3').addEventListener('click', function waschen(){
GM_setValue("text3", document.getElementsByName('text3')[0].value);
GM_setValue("plu3", document.getElementsByName('plunderid')[0].value);
alert("Zapisano:\nNazwa przycisku: "+document.getElementsByName('text3')[0].value+"\nID rupiecia: "+document.getElementsByName('plunderid')[0].value+"")
},false);

document.getElementById('save4').addEventListener('click', function waschen(){
GM_setValue("text4", document.getElementsByName('text4')[0].value);
GM_setValue("plu4", document.getElementsByName('plunderid')[0].value);
alert("Zapisano:\nNazwa przycisku: "+document.getElementsByName('text4')[0].value+"\nID rupiecia: "+document.getElementsByName('plunderid')[0].value+"")
},false);

document.getElementById('save5').addEventListener('click', function waschen(){
GM_setValue("text5", document.getElementsByName('text5')[0].value);
GM_setValue("plu5", document.getElementsByName('plunderid')[0].value);
alert("Zapisano:\nNazwa przycisku: "+document.getElementsByName('text5')[0].value+"\nID rupiecia: "+document.getElementsByName('plunderid')[0].value+"")
},false);

document.getElementById('save11').addEventListener('click', function waschen(){
GM_setValue("text11", document.getElementsByName('text11')[0].value);
GM_setValue("plu11", document.getElementsByName('benutzplunder')[0].value);
alert("Zapisano:\nNazwa przycisku: "+document.getElementsByName('text11')[0].value+"\nID rupiecia: "+document.getElementsByName('benutzplunder')[0].value+"")
},false);

document.getElementById('save22').addEventListener('click', function waschen(){
GM_setValue("text22", document.getElementsByName('text22')[0].value);
GM_setValue("plu22", document.getElementsByName('benutzplunder')[0].value);
alert("Zapisano:\nNazwa przycisku: "+document.getElementsByName('text22')[0].value+"\nID rupiecia: "+document.getElementsByName('benutzplunder')[0].value+"")
},false);


document.getElementById('save33').addEventListener('click', function waschen(){
GM_setValue("text33", document.getElementsByName('text33')[0].value);
GM_setValue("plu33", document.getElementsByName('benutzplunder')[0].value);
alert("Zapisano:\nNazwa przycisku: "+document.getElementsByName('text33')[0].value+"\nID rupiecia: "+document.getElementsByName('benutzplunder')[0].value+"")
},false);

document.getElementById('save44').addEventListener('click', function waschen(){
GM_setValue("text44", document.getElementsByName('text44')[0].value);
GM_setValue("plu44", document.getElementsByName('benutzplunder')[0].value);
alert("Zapisano:\nNazwa przycisku: "+document.getElementsByName('text44')[0].value+"\nID rupiecia: "+document.getElementsByName('benutzplunder')[0].value+"")
},false);

document.getElementById('save55').addEventListener('click', function waschen(){
GM_setValue("text55", document.getElementsByName('text55')[0].value);
GM_setValue("plu55", document.getElementsByName('benutzplunder')[0].value);
alert("Zapisano:\nNazwa przycisku: "+document.getElementsByName('text55')[0].value+"\nID rupiecia: "+document.getElementsByName('benutzplunder')[0].value+"")
},false);
	}
});
}});
},false);

// copyright by basti1012