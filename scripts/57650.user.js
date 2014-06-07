// ==UserScript==
// @name            Neuer pfandkurswarner by basti1012 berlin hamburg 
// @namespace       By basti1012 http://pennerhack.foren-city.de/
// @description     Ein neuer Pfandkurswarner fuer alle games .Der ist der modernste pfandkurwarner den es zur  zeit gibt last euch ueberraschen was der alles kannh .
// @include         http://*pennergame.de*
// @include         http://*berlin.pennergame.de*
// ==/UserScript==

var hoch = '40';
var breit = '300';

var url = document.location.href;

if (url.indexOf("http://berlin.pennergame")>=0) {

var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;
var Pfand = ' Pfandflaschen';
var link = "http://berlin.pennergame.de"
}
if (url.indexOf("http://www.pennergame")>=0) {
var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;
var Pfand = ' Pfandflaschen';
var link = "http://www.pennergame.de"
}
if (url.indexOf("http://pennergame")>=0) {
var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;
var Pfand = ' Pfandflaschen';
var link = "http://pennergame.de"
}
if (url.indexOf("http://www.dossergame")>=0) {
var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;
var Pfand = ' Junk';
var link = "http://www.dossergame.co.uk"
}
if (url.indexOf("http://www.menelgame")>=0) {
var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;
var Pfand = ' Fanty';
var link = "http://www.menelgame.pl"
}
if (url.indexOf("http://www.clodogame")>=0) {
var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;
var Pfand = ' Tickets de ';
var link = "http://www.clodogame.fr"
}


function setupForm(){

document.getElementById("content").innerHTML +=
'<span style="position:absolute;top:0px;left:0px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;">'+
'<div id="holder"><span>Bitte klicke auf die <b>Zahl</b></span><span class="captcha">'+
'<input  id="captcha_img" type="image" src="" name="captchacheck" style="width:205;height:200px" alt="Loading..." />'+
'<input type="button" value="Abbrechen" name="AbbrechenBtn" id="AbbrechenBtn"></span></div></span>';
+document.getElementById("content").innerHTML;

ziel ='activities/bottle/';
if(ziel == "cancel"){
document.getElementById("holder").style.height="0";
document.getElementById("holder").style.width="0";
document.getElementById("holder").style.visibility="hidden";
document.starten.action = "";
}else{
document.getElementById("captcha_img").src="/security/captcha1249514476.jpg";
document.getElementById("holder").style.height="320px";
document.getElementById("holder").style.width="268px";
document.getElementById("holder").style.visibility="visible";
document.starten.action = ziel;

}
}

/*
function capi (Ziel){
//capi (setupForm, Ziel);
document.getElementsByName('AbbrechenBtn')[0].addEventListener('click', function change_sammelncancel (){
window.location.reload();
},false);

*/


if (my_kurs == 5){
var farbe = '#660000';
}
 if (my_kurs == 6){
var farbe = '#990000';
}
 if (my_kurs == 7){
var farbe = '#FF0000';
}
 if (my_kurs == 8){
var farbe = '#FF3300';
}
 if (my_kurs == 9){
var farbe = '#FF6600';
}
 if (my_kurs == 10){
var farbe = '#FF9900';
}
 if (my_kurs == 11){
var farbe = '#FFFF00';
}
 if (my_kurs == 12){
var farbe = '#CCFF00';
}
 if (my_kurs == 13){
var farbe = '#99FF00';
}
 if (my_kurs == 14){
var farbe = '#33FF00';
}
 if (my_kurs == 15){
var farbe = '#00FF00';
}
 if (my_kurs == 16){
var farbe = '#33CC00';
}
 if (my_kurs == 17){
var farbe = '#009900';
}
 if (my_kurs == 18){
var farbe = 'red';
alert("Der kurs ist auf 18 Cent so hoch wird er selten sein .\nOhne wi-wu ist das selten\nAlso Verkauf deine Flaschen oder nicht .");
}
 if (my_kurs == 20){
var farbe = '#FF3300';
}

var gewinn = GM_getValue("gewinn");
 if (gewinn == null){
  gewinn = '1';
   GM_setValue("gewinn" , gewinn);
};

	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: ''+link+'/stock/bottle/',
		onload: function(responseDetails) 
		{
		var content = responseDetails.responseText;
		var text1 = content.split('<td align="left" width="250"><span>')[1];
		var bottel = text1.split(''+Pfand+'')[0];
		var menge = Math.round(bottel*my_kurs)/100 ;

GM_xmlhttpRequest(
	{
	method: 'GET',
	url: ''+link+'/activities/',
	onload: function(responseDetails) 
		{
		var content = responseDetails.responseText;
		var gesamt1 = content.split(': &euro;')[1];
		var gesamt = gesamt1.split('<br />')[0];
		//var menge = Math.round(bottel*my_kurs)/100 ;


var linkl = '<a class="tooltip"><font color="Black"><b> Kurs '+my_kurs+'</b><br><b>  Cent </b><br><b>('+menge+' &euro;)</b></font><span><small><br>'
	+'<font style=\"color:green; font-size:120%;\"><b>Im Inventar hast du </b></font><br>'
	 +'<font style=\"color:red; font-size:120%;\"><b>'+bottel+' Flaschen</b></font>'
	  +'<br><font style=\"color:green; font-size:120%;\"><b>Beim sofortigen verkauf </b></font><br>'
	   +'<font style=\"color:red; font-size:120%;\"><b>'+menge+' Euro</b></font><br>'
	    +'<font style=\"color:green; font-size:120%;\"><b>Flaschen verkaufen?</b></font><br>'
	     +'<font style=\"color:green; font-size:120%;\"><b>Menge</b></font><br><input id="flaschenmenge" type="text" value="" size="1">'
	      +'<input type="button" id="verkauf" value="Verkaufen"><br>'
	       //+'<font style=\"color:green; font-size:120%;\"><b>Sammeln gehen<br>(Dauer Auswahl ueber den capacha)</b></font><br>'
	        //+'<input type="button" id="sammeln" value="X-Minuten sammeln"><br>'
	         +'<font style=\"color:green; font-size:120%;\"><b><br>Letzte Aktion</b></font><br>'
	          +'<font style=\"color:red; font-size:120%;\"><b>'+GM_getValue("gewinn")+'</b></font>'
	         +'<font style=\"color:green; font-size:120%;\"><b><br>Durch Flaschen Verkaufen verdient</b></font>'
	        +'<font style=\"color:red; font-size:120%;\"><b><br>'+gesamt+' Euro</b></font><br>'
+'<br><font style=\"color:black; font-size:120%;\"><b>by basti1012 </b></a></font><br>'

+'</small></span>';
/*
+'<form name="xycoords" action="http://www.pennergame.de/activities/bottle/" method="post">'
+'Zeit:<select name="time" class="dropdown" onChange="FlaschenRechner(this.value)"><option value="10" selected>10 Minuten</option><option value="30">30 Minuten</option>'
+'<option value="60">1 Stunde</option> <option value="180">3 Stunden</option> <option value="360">6 Stunden</option><option value="540">9 Stunden</option><option value="720">12 Stunden</option></select><input type="hidden" name="type" value="1"> <br>'
+'<input type="button" id="verkaufa" value="Sammeln gehen"><br>'

*/

document.getElementById("header").innerHTML += '<span name="Bastispfandwarner" style="position:absolute;top:'+hoch+'px;right:'+breit+'px;background-color:'+farbe+'"><b>'+linkl+'</b></span></span>';
document.getElementById("verkauf").addEventListener('click', function flaschen () {
document.getElementById("verkauf").disabled= "disabled";
var flaschenzumverkauf = document.getElementById('flaschenmenge').value;
gewinn = Math.round(flaschenzumverkauf*my_kurs)/100
var gewinn = 'Du hattest  '+flaschenzumverkauf+' Flaschen Verkauft.Hast dadurch '+gewinn+'  Euro dran verdient .';
GM_setValue("gewinn" , gewinn);

GM_xmlhttpRequest(
  {
  method: 'POST',
  url: ''+link+'/stock/bottle/sell/',
  	headers: 
  	{'Content-type': 'application/x-www-form-urlencoded'},
  		data: encodeURI('chkval='+my_kurs+'&max='+bottel+'&sum='+flaschenzumverkauf+''),
      		onload: function(responseDetails) 
	 	{ 
	window.location.reload();
	alert ("du hast gerade "+flaschenzumverkauf+" Flaschen verkauf \nund hast dudurch "+gewinn+" Euro \ndran verdient\nViel spass bei neue suchen Mfg basti1012");
     	 }
});
},false);

document.getElementById("verkaufa").addEventListener('click', function flaschen () {
document.getElementById("verkaufa").disabled= "disabled";
setupForm('/activities/bottle/');

},false);




}});
}});






















/*







	GM_xmlhttpRequest({
    	method: 'GET',
    	url: 'http://pennergame.de/skills/pet/',
    	onload: function(responseDetails) {
			var tier_side = responseDetails.responseText;
			try{
				var time_tier = tier_side.split('style_skill">')[2].split('</span>')[0];
				var time_tier = time_tier.split('counter(')[1].split(')<')[0];
			} catch (err){
				var time_tier = 0;
			}
	





		var user_facts_counter = new Array(2);
		var user_facts_split = tier_side.split('<div id="infoscreen">');
		var user_facts_split_2 = user_facts_split[1].split('</form>');
		var user_facts_search = user_facts_split_2[0].replace(/href='/g, "href='http://pennergame.de");
		var user_facts_search_2 = user_facts_search.replace(/href="/g, 'href="http://pennergame.de');
		var user_facts_split_3 = user_facts_search_2.split("<script language='javascript'>counter(");
		var user_facts_split_4 = user_facts_split_3[1].split(')</script>');
		user_facts_counter[0] = user_facts_split_4[0];
		var user_facts_split_5 = user_facts_split_3[2].split(')</script>');
		user_facts_counter[1] = user_facts_split_5[0];
		try {
			var user_facts_split_6 = user_facts_split_3[3].split(')</script>');
			user_facts_counter[2] = user_facts_split_6[0];
		} catch (err){
			user_facts_counter[2] = 0;
		}
		user_facts_counter[3] = time_tier;
		
		var user_facts_cash = user_facts_split_2[0].split('&euro;')[1].split('</li>')[0];
		var user_facts_permil = user_facts_split_2[0].split('<li class="permil" style="')[1].split('</li>')[0];
		var user_facts_skill = user_facts_split_2[0].split('<li class="book"')[1].split('</li>')[0];

		var style_user_facts = 'height: 21px; width: 100px; background-repeat:no-repeat; margin-left:20px; padding-left:30px;'
		document.getElementById('content').style.backgroundImage = "url(http://media.pennergame.de/img/header/1.jpg)";
		
		var newul = document.createElement('ul');
		newul.setAttribute('style', 'list-style:none;margin:0;padding:0;');
		newul.innerHTML = '<li style="'+ style_user_facts +' background:transparent url(http://media.pennergame.de/de/img/cash.png) no-repeat scroll 0 0;">&euro;'+ user_facts_cash +'</li><li style="' + user_facts_skill +'</li>'
		document.getElementById('content').appendChild(newul);
		var newli = new Array();
		
		for(li = 0; li <= 3; li++){
			newli[li] = document.createElement('li');
			newli[li].style.backgroundRepeat = "no-repeat";
			if(li==0)newli[li].style.background = "transparent url(http://media.pennergame.de/de/img/book.png) no-repeat scroll 0 0";
			else if(li==1)newli[li].style.background = "transparent url(http://media.pennergame.de/de/img/att.png) no-repeat scroll 0 0";
			else if(li==2)newli[li].style.background = "transparent url(http://media.pennergame.de/de/img/crap.png) no-repeat scroll 0 0";
			else if(li==3)newli[li].style.background = "transparent url(http://media.clodogame.fr/img/plunder/icons/stofftier.gif) no-repeat scroll 0 0";
	
			newli[li].style.marginLeft = "20px";
			newli[li].style.paddingLeft = "30px";
			newli[li].style.height = "21px";
	
			newli[li].innerHTML ='hallo welt';
}
	

	

}});












GM_xmlhttpRequest({
  method: 'GET',
  url: "http://pennergame.de/overview/",
      onload: function( response ) {
      var content = response.responseText;
      var clean = content.match(/Sauberkeit:\s([0-9]+)/)[1];
      var table = document.getElementsByTagName('form')[0];
      var td = table.getElementsByTagName('li')[6];
      td.innerHTML = 








var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;

if(my_kurs > 12){
document.getElementById("pfandflaschen_kurs_ajax_style").style.border = "2px solid red";
}

if(my_kurs > 20){
document.getElementById("pfandflaschen_kurs_ajax_style").style.border = "2px solid yellow";
}

if(my_kurs > 28){
document.getElementById("pfandflaschen_kurs_ajax_style").style.border = "2px solid orange";
}

if(my_kurs > 35){
document.getElementById("pfandflaschen_kurs_ajax_style").style.border = "2px solid green";
}

if(my_kurs > 40){
alert('Achtung! Der Kurs steht bei '+my_kurs+' Cent!');
}



















tr[6].innerHTML = '<td colspan="3">Bei 16 Cent =  '+ Math.round(maximal*16)/100 +' &euro;</td>';
tr[7].innerHTML = '<td colspan="3">Bei 17 Cent =  '+ Math.round(maximal*17)/100 +' &euro;</td>';
tr[8].innerHTML = '<td colspan="3">Bei 18 Cent =  '+ Math.round(maximal*18)/100 +' &euro;</td>';
tr[9].innerHTML = '<td colspan="3">Bei 19 Cent =  '+ Math.round(maximal*19)/100 +' &euro;</td>';
*/