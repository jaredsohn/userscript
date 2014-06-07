// ==UserScript==
// @name           Dauer sammler 10 minuten version 2.0 alle games final ohne fehler fertige v ersion
// @namespace      by basti1012 finale version 10.6.2009
// @description    Nach ende des Sammelns kommt ein ffenster mit den hinweis ob du flaschen suchen willst oder nicht bei klick auf ok schickt er dich wieder sammeln  capascha muesst ihr dann nur noch anklicken beim betertten der Aktionsseite wird das sammeln auch angeklickt alle games 
// @version        test version bei basti1012 version 2.0
// @include        http://*pennergame.de/*
// @include        http://*berlin.pennergame.de/*
// @include        http://*menelgame.pl/*
// @include        http://*dossergame.co.uk/*
// ==/UserScript==

  var intervalTime = 5000;
  var time1 = String(new Date().getTime());
  var time2 = String(new Date().getTime());
  var time3 = String(new Date().getTime());
  var time5 = String(new Date().getTime());
  var done = " -/-";
  var done1 = " -/-";
  var done2 = " -/-";
  var done3 = " -/-";
  var alert = 'In Berlin ist das Sammeln beendet';
  var alert1 = 'Bottles collect ends ';
  var alert2 = 'Der Penner in Hamburg ist fertig mit Sammeln';
  var alert3 = 'Na koncu badania butelek ';
  var boxt = 'Willst du in Berlin weiter sammel klicke dann ok oder Abrechen ';
  var boxt1 = ' Go to collect ok otherwise please cancel press ';
  var boxt2 = 'Soll der Hambureger Penner weiter Sammeln gehen klicke auf OK';
  var boxt3 = 'Do kolekty jedziecie obsunac sie OK popelnia blad co ekspres wy przyjsc ';
  var pgurl = 'http://berlin.pennergame.de/';
  var pgurl1 = 'http://dossergame.co.uk/';
  var pgurl2 = 'http://www.pennergame.de/';
  var pgurl3 = 'http://menelgame.pl/';
  var blink1 = 'window.location.href == "http://berlin.pennergame.de/activities/"';
  var blink2 = 'window.location.href == "http://www.berlin.pennergame.de/activities/"';
  var blink3 = 'window.location.href == "berlin.pennergame.de/activities/"';
  var blink4 = 'window.location.href == "http://berlin.pennergame.de/activities/"';
  var blink5 = 'window.location.href == "http://www.berlin.pennergame.de/activities/"';
  var blink6 = 'window.location.href == "berlin.pennergame.de/activities/"';
  var blink7 = 'window.location.href == "http://dossergame.co.uk/activities/"';
  var blink8 = 'window.location.href == "http://www.dossergame.co.uk/activities/"';
  var blink9 = 'window.location.href == "dossergame.co.uk/activities/"';
  var blink10 = 'window.location.href == "http://dossergame.co.uk/activities/"';
  var blink11 = 'window.location.href == "http://www.dossergame.co.uk/activities/"';
  var blink12 = 'window.location.href == "dossergame.co.uk/activities/"';
  var blink13 = 'window.location.href == "http://pennergame.de/activities/"';
  var blink14 = 'window.location.href == "http://www.pennergame.de/activities/"';
  var blink15 = 'window.location.href == "pennergame.de/activities/"';
  var blink16 = 'window.location.href == "http://pennergame.de/activities/"';
  var blink17 = 'window.location.href == "http://www.pennergame.de/activities/"';
  var blink18 = 'window.location.href == "pennergame.de/activities/"';
  var blink19 = 'window.location.href == "http://menelgame.pl/activities/"';
  var blink20 = 'window.location.href == "http://www.menelgame.pl/activities/"';
  var blink21 = 'window.location.href == "menelgame.pl/activities/"';
  var blink22 = 'window.location.href == "http://menelgame.pl/activities/"';
  var blink23 = 'window.location.href == "http://www.menelgame.pl/activities/"';
  var blink24 = 'window.location.href == "menelgame.pl/activities/"';

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+pgurl+'/activities/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('name="')[15];
			var text2 = text1.split('"  onclick')[0];

GM_setValue("time1", time1);
try{var counter = document.getElementById('counter2').innerHTML;}
catch(err){}
if (counter != done){pfandCheckInterval1=window.setInterval(pfandCheck1,intervalTime);}
function pfandCheck1(){
	counter = document.getElementById('counter2').innerHTML;
	if(GM_getValue("time1")!=time1){ 
		clearInterval(pfandCheckInterval1);
		return 0;
	}
	if(counter==done)
	{     
	if(window.location.pathname=="/activities/" || window.location.pathname=="/activities/bottles/"){
	alert(''+alert+'.');
	window.location.replace(window.location.protocol+"//"+window.location.host+"/activities/");
	}
	else
	{  
	var box=window.confirm(""+boxt+"");
	if(box==true){
	window.location.href=window.location.protocol+"//"+window.location.host+"/activities/";
	document.getElementsByName('Submit2')[0].click();
	}
	}
	clearInterval(pfandCheckInterval1);
	}}
if('+blink1+' || '+blink2+' || '+blink3+' || '+blink4+' || '+blink5+' || '+blink6+' )
{document.getElementsByName(''+text2+'')[0].click();}
}});
}

if(document.location.href.indexOf('dossergame.co.uk/')>=0) {

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+pgurl1+'/activities/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('name="')[15];
			var text2 = text1.split('"')[0];

GM_setValue("time2", time2);
try{var counter = document.getElementById('counter2').innerHTML;}
catch(err){}
if (counter != done1){pfandCheckInterval2=window.setInterval(pfandCheck2,intervalTime);}
function pfandCheck2(){
	counter = document.getElementById('counter2').innerHTML;
	if(GM_getValue("time2")!=time2){ 
		clearInterval(pfandCheckInterval2);
		return 0;
	}
	if(counter==done1)
	{     
	if(window.location.pathname=="/activities/" || window.location.pathname=="/activities/bottles/"){
	alert(''+alert1+'.');
	window.location.replace(window.location.protocol+"//"+window.location.host+"/activities/");
	}
	else
	{  
	var box=window.confirm(""+boxt1+"");
	if(box==true){
	window.location.href=window.location.protocol+"//"+window.location.host+"/activities/";
	document.getElementsByName('Submit2')[0].click();
	}
	}
	clearInterval(pfandCheckInterval2);
	}
}
if('+blink7+' || '+blink8+' || '+blink9+' || '+blink10+' || '+blink11+' || '+blink12+' )
{ 
document.getElementsByName(''+text2+'')[0].click();}
}});
}

if(document.location.href.indexOf('pennergame.de/')>=0) {

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+pgurl2+'/activities/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('name="')[15];
			var text2 = text1.split('"')[0];
GM_setValue("time3", time3);
try{var counter = document.getElementById('counter2').innerHTML;}
catch(err){}
if (counter != done2){pfandCheckInterval3=window.setInterval(pfandCheck3,intervalTime);}
function pfandCheck3(){
	counter = document.getElementById('counter2').innerHTML;
	if(GM_getValue("time3")!=time3){ 
		clearInterval(pfandCheckInterval3);
		return 0;
	}
	if(counter==done2)
	{     
	if(window.location.pathname=="/activities/" || window.location.pathname=="/activities/bottles/"){
	alert(''+alert2+'.');
	window.location.replace(window.location.protocol+"//"+window.location.host+"/activities/");
	}
	else
	{  
	var box=window.confirm(""+boxt2+"");
	if(box==true){
	window.location.href=window.location.protocol+"//"+window.location.host+"/activities/";
	document.getElementsByName('Submit2')[0].click();
	}
	}
	clearInterval(pfandCheckInterval3);
	}
}
if('+blink13+' || '+blink14+' || '+blink15+' || '+blink16+' || '+blink17+' || '+blink18+' )
{ 
document.getElementsByName(''+text2+'')[0].click();}
}});
}

if(document.location.href.indexOf('menelgame.pl/')>=0) {

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+pgurl3+'/activities/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('name="')[15];
			var text2 = text1.split('"')[0];
GM_setValue("time5", time5);
try{var counter = document.getElementById('counter2').innerHTML;}
catch(err){}
if (counter != done3){pfandCheckInterval4=window.setInterval(pfandCheck4,intervalTime);}
function pfandCheck4(){
	counter = document.getElementById('counter2').innerHTML;
	if(GM_getValue("time5")!=time5){ 
		clearInterval(pfandCheckInterval4);
		return 0;
	}
	if(counter==done3)
	{     
	if(window.location.pathname=="/activities/" || window.location.pathname=="/activities/bottles/"){
	alert(''+alert3+'.');
	window.location.replace(window.location.protocol+"//"+window.location.host+"/activities/");
	}
	else
	{  
	var box=window.confirm(""+boxt3+"");
	if(box==true){
	window.location.href=window.location.protocol+"//"+window.location.host+"/activities/";
	document.getElementsByName('Submit2')[0].click();
	}
	}
	clearInterval(pfandCheckInterval4);
	}
}

if('+blink19+' || '+blink20+' || '+blink21+' || '+blink22+' || '+blink23+' || '+blink24+' )
{ 
document.getElementsByName(''+text2+'')[0].click();}
}});
}

// copiright by basti1012 fuer diese test version
