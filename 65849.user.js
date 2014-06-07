// ==UserScript==
// @name           Pennergame Extra-Ansicht (Pennergame 4.0 )
// @namespace      pennerhack basti1012
// @description    Zeigt viele extra funktionen an . hat einige funktionen eingebaut wie lose bot flawschen verkauf kampfwert anzeige  und vieles mehr.
// @include        *pennergame.de*
// ==/UserScript==


var url = document.location.href;

// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
}
// Linkadressen fuer Frankreich
if (url.indexOf("clodogame")>=0) {
var link = "http://www.clodogame.fr"
}
// Linkadressen fuer Spanien
if (url.indexOf("mendigogame")>=0) {
var link = "http://www.mendigogame.es"
}
// Linkadresse tuerkei
if (url.indexOf("serserionline")>=0) {
var link = "http://www.serserionline.com"
}
// Linkadresse dossergame
if (url.indexOf("dossergame.co.uk")>=0) {
var link = "http://www.dossergame.co.uk"
}
// Linkadresse menelgame
if (url.indexOf("menelgame.pl")>=0) {
var link = "http://www.menelgame.pl"
}
host = 'http://'+window.location.hostname;





	GM_xmlhttpRequest({
  		method: 'GET',
   		url: ""+link+"/stock/plunder/",
        	onload: function(responseDetails) {
        		var bcontent = responseDetails.responseText;


var table1 = bcontent.split('<h3>Angelegt</h3>')[1];			
var table12 = table1.split('class="submenu">')[0];

var table13 = table12.split('src="')[1];							
var angelegt8 = table13.split('"')[0];

GM_setValue("angelegt8", angelegt8);




			}
	});









/*
Anzahl der fights einbauen 
gewinn verlust bei kaufen der lose 

*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('div#new_container2 {position:absolute; top:90px; left:22px; margin-left:1px; width:730px;}')
addGlobalStyle('.inhalt_newcontainer2 { padding-top:8px; padding-bottom:10px; padding-left:2%; background: url(http://www.fotos-hochladen.net/neuerhaderehkl9umo.jpg) ; font-weight:bold; color:red; font-size:12px; text-align:center; } ')

var tbody = document.createElement('div');
document.body.appendChild(tbody);
tbody.innerHTML = ''
+'<div id=\"new_container2\"><div class=\"inhalt_newcontainer2\">'

// flaschen verkauf
+'<button type="button" id="flasch""><img src="http://media.pennergame.de/img/inventar/Pfandflasche.png"border="0" height="36" width="50"><div id="flaschens" ></button>'
// tier fights
+'<span id="tier"</span>'
//wascehn 25 euro 
+'<button type="button" id="wasch""><img src="http://t2.gstatic.com/images?q=tbn:qcquzf3_7j0VxM:http://media.berner-international.de/media/files/1/46/152/164/1218/haende_waschen.400.0.jpg"border="0" height="37" width="50""><div id="waschs" ></button>'
// lose kaufen bot    
+'<button type="button" id="lose""><img src="http://t3.gstatic.com/images?q=tbn:O1-r6D7rTnvhJM:http://www.bazar-shop.ch/images/gallery/gross/69077.jpg"border="0" height="50" width="50""><div id="loses" ></button>'
// bier kaufen 
+'<button type="button" id="bier""><img src="http://t0.gstatic.com/images?q=tbn:J5dICBl5R7MwVM:http://www.bier-ohne-gentechnik.de/fileadmin/user_upload/flasche_bier_ohne_gentechnik_bg.jpg"border="0" height="50" width="50""><div id="biers" ></button>'


// nLets fight 
+'<button type="button" id="nix""><img src="http://t2.gstatic.com/images?q=tbn:d9OmAvl4PbgUEM:http://www.stuecke.net/faust.jpg"border="0" height="35" width="50"><div id="kamp" ></button>'
// highscore suche merere tabs
+'<button type="button" id="suche""><img src="http://t1.gstatic.com/images?q=tbn:FOPleayp5Ey4fM:http://www.luftfahrt-online.de/images/lupe.gif"border="0" height="50" width="50"><div id="kamp" ></button>'
// angrifswarner rot
+'<a id="kampf">'
// plunder
+'<a href="/stock/plunder/"><img src="'+GM_getValue("angelegt8")+'"border="0" height="50" width="50"></a>'
// wiwu und wut anzeige
+'<span id="wiwuwut"</span>'
// spenden azeige
+'<span id="spendi"</span>'



// angrifswarner gelb 
//+'Waschen(25)<a href="/city/washhouse/"><img src="http://t0.gstatic.com/images?q=tbn:miy0x4VEni80gM:http://www.arbeitssicherheit-oberschwaben.de/assets/images/Achtung.jpg"border="0" height="50" width="50"></a>'










//+'<span id="time"</span>'
//document.getElementById('time').innerHTML = 'x'+timer1+'';





// fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+link+'/fight/pet/',
        onload: function(responseDetails) {
        	var contentl = responseDetails.responseText;
try{
			var tier = contentl.split('http://static.pennergame.de/img/pv4/shop/de_DE/tiere/')[1];
			var tier1 = tier.split('.jpg')[0];
}catch(e){}
			  if(contentl.match(/Offene Haustier/)){




document.getElementById('tier').innerHTML = '<a href="/fight/pet/"><img src="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/'+tier1+'.jpg"border="0" height="50" width="50"></a>'
}
}});


// zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz


GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+link+'/stock/bottle/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text11 = content.split('name="chkval" value="')[1];
			var kursaktuell = text11.split('"')[0];
			var text11 = content.split('name="max" value="')[1];
			var flaschenaktuell = text11.split('"')[0];

document.getElementById('flaschens').innerHTML = flaschenaktuell;


document.getElementById('flasch').addEventListener('click', function waschen(){
	document.getElementById('flasch').disabled = "disabled";


	var box=window.confirm("Wollen sie wirklich alle Flaschen( "+flaschenaktuell+") verkaufen ?\nNach den klick auf Ok werden alle Flaschen verkauft .\nKlicke abrechen um nix zu verkaufen ");
	if(box==true){

	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/bottle/sell/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('chkval=8&max=257554&sum='+flaschenaktuell+''),
		onload: function(responseDetails)
		{
document.getElementById('flaschens').innerHTML = 'Verkauft';
			location.reload();
		}
 	 });	
}

				
},false);
}});





//jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

GM_xmlhttpRequest({
    method: 'GET',
    url: ''+link+'/fight/overview/',
    onload: function(responseDetails) {
				var content = responseDetails.responseText;
			  if(content.match(/warning/)){
document.getElementById('kampf').innerHTML = '<a href="/fight/overview/"><img src="http://t3.gstatic.com/images?q=tbn:f2e3URZwCLTX8M:http://www.best-radio-station.de/brsjoomla2/images/stories/600px-achtung-schild_svg.png"border="0" height="50" width="50"></a>'


				}
    }
});



//jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

GM_xmlhttpRequest({
    method: 'GET',
    url: ''+link+'/gang/',
    onload: function(responseDetails) {
				var content = responseDetails.responseText;
			  if(content.match(/Wirtschaftswunder ist aktiv/)){
document.getElementById('wiwuwut').innerHTML = '<a href="/gang/"><img src="http://www.fotos-hochladen.net/wiwuaktivckt23v1q.jpg"border="0" height="50" width="50"></a>'
}


			  if(content.match(/Wutentfachung ist aktiv/)){
document.getElementById('wiwuwut').innerHTML = '<a href="/gang/"><img src="http://www.fotos-hochladen.net/wutaktivjoc8s71e.jpg" border="0" height="50" width="50"></a>'
}

    }
});


//gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg



document.getElementById('lose').addEventListener('click', function waschen(){
	document.getElementById('lose').disabled = "disabled";

		GM_xmlhttpRequest({
			method: 'GET',
			url: ""+link+"/city/games/",
			onload: function(responseDetails) {
				var body = responseDetails.responseText;
                                var lose = body.split('Du kannst heute noch ')[1];
				var lose1 = lose.split(' Lose kaufen')[0];

menge = lose1/10;
x=1;
verkaufe(menge,x)
}});

function verkaufe(menge,x){
if(x<=menge){
	GM_xmlhttpRequest({
		method: 'POST',
		url: link+'/city/games/buy/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('menge=10&id=1&preis=1.00&preis_cent=100&submitForm=F%C3%BCr+%E2%82%AC10.00+kaufen'),
		onload: function(responseDetails)
		{
		a=x*10;
		document.getElementById('loses').innerHTML = 'Verkauft<br>'+a+'';
		x++;
		verkaufe(menge,x)
		}
 	 });
}
if(x==menge){
location.reload();
}
}			
},false);




//ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

document.getElementById('wasch').addEventListener('click', function waschen(){
	document.getElementById('wasch').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/city/washhouse/buy/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=2'),
		onload: function(responseDetails)
		{
document.getElementById('waschs').innerHTML = '25 &euro;<br>Gewaschen';
			location.reload();
		}
 	 });					
},false);



		GM_xmlhttpRequest({
			method: 'GET',
			url: ""+link+"/overview/",
			onload: function(responseDetails) {
				var body = responseDetails.responseText;
                                var sauber = body.split('Sauberkeit: ')[1];
				var sauber1 = sauber.split('%')[0];

				var Spenden = body.split('Du hast heute')[1];
				var Spenden1 = Spenden.split('Spenden')[0];
document.getElementById('waschs').innerHTML = ''+sauber1+' %';
if(Spenden1<=49){
document.getElementById('spendi').innerHTML = '<font style=\"color:green; font-size:150%;\"><b>'+Spenden1+' / 50</b></font>';
}else{
document.getElementById('spendi').innerHTML = '<font style=\"color:red; font-size:150%;\"><b>'+Spenden1+' / 50</b></font>';
}




}});







//ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

document.getElementById('bier').addEventListener('click', function waschen(){
	document.getElementById('bier').disabled = "disabled";
Pos = document.getElementsByClassName("icon beer")[0].innerHTML.indexOf(".");
Alk = document.getElementsByClassName("icon beer")[0].innerHTML.substr(Pos - 1, 4).replace(".", "");
Benoetigtprozent = 299 - Alk;
Benoetigtbier = Math.floor(Benoetigtprozent/35);
Benoetigtbrot = Math.ceil(Alk/35);
	GM_xmlhttpRequest({
		method: 'POST',
		url: link+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=Bier&promille=35&id=1&menge='+Benoetigtbier),
		onload: function(responseDetails)
     	{
			
document.getElementById('biers').innerHTML = ''+Benoetigtbier+'<br>Bier<br>Gekauft';
location.reload();
      	}
  	});	

},false);





//ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd


Wunsch()

function Wunsch () {
for(a=0; a<=3;a++){
if(GM_getValue("Att") == null){
var Att  = window.prompt("Gebe einen Att Faktor ein (zb 0.76 ) um euren Kampfwert auszurechnen:", ""+GM_getValue("Att")+"");
GM_setValue("Att",Att);

}else
if(GM_getValue("Def") == null){
var Def  = window.prompt("Gebe einen Def Faktor ein (zb 0.76 ) um euren Kampfwert auszurechnen:", ""+GM_getValue("Def")+"");
GM_setValue("Def",Def);

}else
if(GM_getValue("Dex") == null){
var Dex  = window.prompt("Gebe einen Dex Faktor ein (zb 0.76 )(Gebe 0 in das  Feld wenn Dex nicht mit berecnet werden soll) um euren Kampfwert auszurechnen:", ""+GM_getValue("Dex")+"");
GM_setValue("Dex",Dex);

}else{
weiter()
}
}
}


function weiter(){

GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/activities/',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		dex = content.split('Deine Geschicklichkeit: ')[1].split('<')[0];

GM_xmlhttpRequest({
method: 'GET',
url: ''+link+'/fight/',
onload: function(responseDetails) { 
	var cont = responseDetails.responseText;

	id = cont.match(/avatare\/(\d+)_small\.jpg/)[1];
	
  	var newcont = cont.replace(/\s+/g,'');
	var vals = newcont.match(/>(\d+)<aclass="tooltip"/g);

	var att = vals[0].match(/(\d+)/)[0];

	var def = vals[1].match(/(\d+)/)[0];


a = GM_getValue("Dex");

if(a == 0){

	kampfwert = (Number(att)*GM_getValue("Att"))	+	(Number(def)*GM_getValue("Def"));
}else{

	kampfwert = (Number(att)*GM_getValue("Att"))    +	(Number(def)*GM_getValue("Def"))	+	(Number(dex)*GM_getValue("Dex"));
}
	
kampfwerta = Math.round(kampfwert*1)*1;


document.getElementById('kamp').innerHTML = kampfwerta;




}
});
}});
}



//hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh


document.getElementById('suche').addEventListener('click', function waschen(){
	document.getElementById('suche').disabled = "disabled";

var pkt = document.getElementById('my-profile');
//GM_setValue("pkt", pkt);


var userpoints= pkt.innerHTML.split('class="el2">')[3].split('</span>')[0];

      var angriffmax = Math.floor(userpoints*1.5);
      var angriffmin = Math.floor(userpoints*0.8);
      
      GM_setValue("angriffmax",angriffmax);
      GM_setValue("angriffmin",angriffmin);
      GM_setValue("userpoints",userpoints);

fenster1 = 'http://hamburg.pennerzone.de/highscore/?page=1&points_min='+angriffmin+'&points_max='+angriffmax+'&gang=egal&action=Suchen.&city=0&name_type=contains&name_text=&sDay=&sMonth=&sYear=&eDay=&eMonth=&eYear=';
fenster2 = 'http://mindf.org/content/pennergame-highscore-tool-hamburg'
window.location.href = 'http://www.pennergame.de/highscore/user/?min='+angriffmin+'&max='+angriffmax+''
	


window.open(fenster1, "Zweitfenster", "width=800,height=700,left=100,top=100");
window.open(fenster2, "Dritfenster", "width=800,height=700,left=100,top=100");
				
},false);


// fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff