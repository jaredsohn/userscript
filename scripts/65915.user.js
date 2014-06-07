// ==UserScript==
// @name           Penergame Plunder Buttons ( Speicherbar ) Pennergame 4.0 By Basti1012
// @namespace      http://pennerhack.foren-city.de basti102
// @include        *pennergame.de*
// @exclude *board*
// ==/UserScript==

var url = document.location.href;
// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var town ='hamburg';
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
var town ='berlin';
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('div#new_container3 {position:absolute; top:94px; left:672px; margin-left:1px; width:73px;}')
addGlobalStyle('.inhalt_newcontainer3 {padding-top:8px; padding-bottom:10px; padding-left:2%; background: url(http://i35.tinypic.com/11qqpnp.jpg) ; font-weight:bold; color:black; font-size:15px; text-align:center; } ')

addGlobalStyle('div#new_container4 {position:absolute; top:234px; left:372px; margin-left:1px; width:473px;}')
addGlobalStyle('.inhalt_newcontainer4 {padding-top:8px; padding-bottom:10px; padding-left:2%; background: url(http://i35.tinypic.com/11qqpnp.jpg) ; font-weight:bold; color:black; font-size:15px; text-align:center; } ')




















var tbody = document.createElement('div');
document.body.appendChild(tbody);
//var tbody = document.getElementsByClassName('icon error zleft')[0];
tbody.innerHTML = ''
+'<div id=\"new_container3\"><div class=\"inhalt_newcontainer2\">'
+'<input type="button" id="button1" name="button1" value="'+GM_getValue("text1")+'" ><br>'
+'<input type="button" id="button2" name="button2" value="'+GM_getValue("text2")+'" ><br>'
+'<input type="button" id="button3" name="button3" value="'+GM_getValue("text3")+'" ><br>'
+'<input type="button" id="button4" name="button4" value="'+GM_getValue("text4")+'" ><br>'
+'<input type="button" id="button5" name="button5" value="'+GM_getValue("text5")+'" ><br>'
//+'<input type="button" id="save" name="save" value="xx" >'+GM_getValue("plunderbild")+'';

+'<button type="button" id="save""><img src="'+GM_getValue("plunderbild")+'" border="0" height="35" width="50"><div id="kamp" ></button>';

document.getElementById('button1').addEventListener('click', function waschen(){
welcher = GM_getValue("plu1");
wechseln(welcher)
},false);

document.getElementById('button2').addEventListener('click', function waschen(){
welcher = GM_getValue("plu2");
wechseln(welcher)
},false);

document.getElementById('button3').addEventListener('click', function waschen(){
welcher = GM_getValue("plu3");
wechseln(welcher)
},false);

document.getElementById('button4').addEventListener('click', function waschen(){
welcher = GM_getValue("plu4");
wechseln(welcher)
},false);

document.getElementById('button5').addEventListener('click', function waschen(){
welcher = GM_getValue("plu5");
wechseln(welcher)
},false);


function wechseln(welcher){
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
			var table1 = acontent.split('<h3>Angelegt</h3>')[1];			
			var table12 = table1.split('class="submenu">')[0];								
			var table13 = table12.split('src="')[1];					
			var plunderbild1 = table13.split('"')[0];
			var plunderbild = plunderbild1;					




GM_setValue("plunderbild",plunderbild)


}});


















alert("Plunder gewechselt auf Id : "+welcher+" \n Das Bild wird dir den wechseln  Zeigen\n Seite wird relodet");
			location.reload();
     	 }
 	 });
}


















document.getElementById('save').addEventListener('click', function waschen(){

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+link+"/gang/stuff/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table = acontent.split('Plunder einzahlen')[1];			
			var table2 = table.split('Anzahl:')[0];	
			var table5 = table2.split('<select name="pid" id="pid">')[1];			
			var table6 = table5.split('</select>')[0];	
			var plunder = '<select name="plunderid" id="plunderid" >'+table6+'</select>';

var tbody = document.createElement('div');
document.body.appendChild(tbody);
//var tbody = document.getElementsByClassName('icon error zleft')[0];
tbody.innerHTML = ''
+'<div id=\"new_container4\"><div class=\"inhalt_newcontainer2\">'
+'Plunder auswahl '+plunder+'<br>'
+'Name : <input type="text" id="text1" name="text1" value="'+GM_getValue("text1")+'">'
+'<input type="button" id="save1" name="save1" value="Plunder 1 Speichern" >'+GM_getValue("plu1")+'<br>'
+'Name : <input type="text" id="text2" name="text2" value="'+GM_getValue("text2")+'">'
+'<input type="button" id="save2" name="save2" value="Plunder 2 Speichern" >'+GM_getValue("plu2")+'<br>'
+'Name : <input type="text" id="text3" name="text3" value="'+GM_getValue("text3")+'">'
+'<input type="button" id="save3" name="save3" value="Plunder 3 Speichern" >'+GM_getValue("plu3")+'<br>'
+'Name : <input type="text" id="text4" name="text4" value="'+GM_getValue("text4")+'">'
+'<input type="button" id="save4" name="save4" value="Plunder 4 Speichern" >'+GM_getValue("plu4")+'<br>'
+'Name : <input type="text" id="text5" name="text5" value="'+GM_getValue("text5")+'">'
+'<input type="button" id="save5" name="save5" value="Plunder 5 Speichern" >'+GM_getValue("plu5")+'<br>'

document.getElementById('save1').addEventListener('click', function waschen(){
GM_setValue("text1", document.getElementsByName('text1')[0].value);
GM_setValue("plu1", document.getElementsByName('plunderid')[0].value);
alert("Dein Text \n "+document.getElementsByName('text1')[0].value+"\nId des Plunders : "+document.getElementsByName('plunderid')[0].value+" \nGespeichert")
},false);

document.getElementById('save2').addEventListener('click', function waschen(){
GM_setValue("text2", document.getElementsByName('text2')[0].value);
GM_setValue("plu2", document.getElementsByName('plunderid')[0].value);
alert("Dein Text \n "+document.getElementsByName('text2')[0].value+"\nId des Plunders : "+document.getElementsByName('plunderid')[0].value+" \nGespeichert")
},false);


document.getElementById('save3').addEventListener('click', function waschen(){
GM_setValue("text3", document.getElementsByName('text3')[0].value);
GM_setValue("plu3", document.getElementsByName('plunderid')[0].value);
alert("Dein Text \n "+document.getElementsByName('text3')[0].value+"\nId des Plunders : "+document.getElementsByName('plunderid')[0].value+" \nGespeichert")
},false);

document.getElementById('save4').addEventListener('click', function waschen(){
GM_setValue("text4", document.getElementsByName('text4')[0].value);
GM_setValue("plu4", document.getElementsByName('plunderid')[0].value);
alert("Dein Text \n "+document.getElementsByName('text4')[0].value+"\nId des Plunders : "+document.getElementsByName('plunderid')[0].value+" \nGespeichert")
},false);

document.getElementById('save5').addEventListener('click', function waschen(){
GM_setValue("text5", document.getElementsByName('text5')[0].value);
GM_setValue("plu5", document.getElementsByName('plunderid')[0].value);
alert("Dein Text \n "+document.getElementsByName('text5')[0].value+"\nId des Plunders : "+document.getElementsByName('plunderid')[0].value+" \nGespeichert")
},false);
}});
},false);














































	GM_xmlhttpRequest({
		method: 'GET', 
		url: ''+link+'/stock/plunder/',
		onload: function(gangresponseDetails) {
			//var gangcontent = gangresponseDetails.responseText;
			//smsfel0 = gangcontent.split('Nachricht lesen')[1].split('/messages/delete/')[0];
			//smsfel1 = smsfel0.split('href="/profil/')[1].split('/a>')[0];
			//id1 = smsfel1.split('id:')[1].split('/')[0];
			//name = smsfel1.split('/">')[1].split('<')[0];
			//nachricht = smsfel0.split('<p>')[1].split('</p>')[0];
			//betreff = smsfel0.split('<strong>')[1].split('</strong>')[0];




}});





//+'<div style="top: 130px;" id="notifyme" class="zabsolute zleft">'
//+'<div class="icon ok zleft" id="nicon">&nbsp;</div>'
//+'<div class="zleft right" id="ntext">'



//+'<div id=\"new_container2\"><div class=\"inhalt_newcontainer2\">'
//+'<h2>Nachricht von '
//+'<a href="'+link+'/profil/id:'+id1+'/"><span style=\"color:orange;"><b>'+name+'</b></span></a></h2>'
//+'<a href="'+link+'/messages/read/'+id+'/"><span style=\"color:orange;"><b>Betreff :</b></span><span style=\"color:black;"><b> '+betreff+'</b></span><br>'
//+'<span style=\"color:orange;"><b>Nachricht :</b></span><span style=\"color:black;"><b>'+nachricht+'</b></span></a>'
//+'</div></div>';
