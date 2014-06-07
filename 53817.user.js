// ==UserScript==
// @name           Promille Hilfe(bot) Pennergame by_Basti1012
// @namespace      http://pennerhack.foren-city.de 
// @description    mit einen kliock lest sich die promille steigern oder senken egal ob maan bier gebkauft hat oder nicht und inventar leer ist . das script kauft automatisch bier un d brot wenn es noetig ist 
// @include        *pennergame.de*
// @include        *clodogame.fr*
// @include        *berlin.pennergame.de*
// @include        *menelgame.pl/gang/*
// @include        *dossergame.co.uk*
// @include        *mendigogame.es*
// @include        *serserionline.com*
// @include        *bumrise.com*
// @include        *muenchen.pennergame.de*
// @version        Dieses ist eine version die bei Pennergame erlaubt da es nicht automatisch ist und keine spiel vorteile macht 
// ==/UserScript==




farbe = 'green';
gross = '120';

farbe1 = 'red';
gross1 = '140';











host = 'http://'+window.location.hostname
s=0;
promillecheck(s)
promille = document.getElementsByClassName('icon beer')[0].innerHTML = '<li class="icon beer"><a href="/stock/" class="ttip" rel="Klicke hier, um etwas zu trinken"><b id="pro"</b> ‰</a></li>';


if(!GM_getValue("uhr0")||GM_getValue("uhr0")=='')
uhr0 = 210;
else
uhr0 = GM_getValue("uhr0");


if(!GM_getValue("uhr1")||GM_getValue("uhr1")=='')
uhr1 = 25;
else
uhr1 = GM_getValue("uhr1");

var dragspendenobjekt = null;
var dragx = 0;
var dragy = 0;
var posx = 0;
var posy = 0;
var spenden_cache;

if(!document.getElementById('spendendiv')){
	var spendendiv = document.createElement('div');
	spendendiv.setAttribute('id', 'spendendiv');
	spendendiv.setAttribute('align', 'middle');
	spendendiv.setAttribute('style', 'position:absolute; top:'+uhr0+'px; left:'+uhr1+'px; z-index:50; font-size:15px; cursor:move;');
	spendendiv.innerHTML = '<font style=\"color:'+farbe+'; font-size:'+gross+'%;\">Promille Hilfe</font><br><img id="hoch" src="http://t0.gstatic.com/images?q=tbn:uW48QZt6xAzbWM:http://kiko-koi-farm.de/roter-pfeil.gif" height="33" width="33"></img>'
	+'<img id="runter" src="http://t2.gstatic.com/images?q=tbn:5O3u9HNdA3h7PM:http://www.kolthoff-bunde.de/assets/images/Pfeil_unten.jpg" height="33" width="33"></img><p id="info"</p>';
	document.body.appendChild(spendendiv);
}else{
spendendiv = document.getElementById('spendendiv');
spendendiv.innerHTML = '<a id="uhr"</a><br><a id="datum"</a>';
}



document.getElementById('hoch').addEventListener('click', function einstell () {
document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">Promille aufw&auml;rts</font>';
	bierhoch()
},false);


document.getElementById('runter').addEventListener('click', function einstell () {
document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">Promille abw&auml;rts</font>';
	brotrunter()
},false);





function brotrunter(){
	GM_xmlhttpRequest({
		method: 'GET',
  		url: ''+host+'/stock/foodstuffs/',
		onload: function(responseDetails) {
			var con = responseDetails.responseText;
			try{
				menge= con.split('id="lager_Brot" value="')[1].split('"')[0];
document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">'+menge+' Brot im Inventar</font>';
				brot()
			}catch(e){
document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">Brot im Inventar alle</font>';
				brot_kaufen()
			}
		}
	});
}




function bierhoch(){
	GM_xmlhttpRequest({
		method: 'GET',
  		url: ''+host+'/stock/foodstuffs/',
		onload: function(responseDetails) {
			var con = responseDetails.responseText;
			try{
				menge= con.split('id="lager_Bier" value="')[1].split('"')[0];
document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">'+menge+' Bier im Inventar</font>';
				bier()
			}catch(e){
		document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">Bier im Inventar alle</font>';
				bier_kaufen()
				
			}
		}
	});
}


function bier_kaufen(){
	GM_xmlhttpRequest({
   		method: 'POST',
  	        url: ''+host+'/city/supermarket/buy/',
   		headers: 
   		{'Content-type': 'application/x-www-form-urlencoded'},
  	  	data: encodeURI('menge=1&id=1&cat=1&preis=0.85&preis_cent=85&inventar_name=bier&submitForm=F%C3%BCr+%E2%82%AC0%2C85+kaufen'),
      		onload: function(responseDetails) 
		{
		document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">1 Bier gekauft gehe jetzt Trinken</font>';
		bier()}
	});
}








function brot_kaufen(){
	GM_xmlhttpRequest({
   		 method: 'POST',
  		 url: ''+host+'/city/supermarket/buy/',
  		 headers: 
  		 {'Content-type': 'application/x-www-form-urlencoded'},
  	  	 data: encodeURI('menge=1&id=2&cat=2&preis=1.70&preis_cent=170&inventar_name=brot&submitForm=F%C3%BCr+%E2%82%AC1%2C70+kaufen'),
      		 onload: function(responseDetails) 
		 {
		 document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">1 Brot gekauft gehe jetzt Essen</font>';
		 brot()}
	});
}


function bier(){
	GM_xmlhttpRequest({
   		method: 'POST',
   		url: ''+host+'/stock/foodstuffs/use/',
   		headers: 
   		{'Content-type': 'application/x-www-form-urlencoded'},
  	  	data: encodeURI('item=Bier&promille=35&id=1&menge=1'),
      		onload: function(responseDetails){
		document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">1 Bier getrunken</font>';
		s=1;
		promillecheck(s)}
	});
}


function brot(){
	GM_xmlhttpRequest({
   		method: 'POST',
   		url: ''+host+'/stock/foodstuffs/use/',
   		headers: 
   		{'Content-type': 'application/x-www-form-urlencoded'},
  	 	data: encodeURI('item=Brot&promille=-35&id=2&menge=1'),
     		onload: function(responseDetails) {
		document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">1 Brot gegessen</font>';
		s=2;
		promillecheck(s)}
	});
}






function promillecheck(s){
GM_xmlhttpRequest({
	method: 'GET',
  	url: ''+host+'/stock/foodstuffs/',
	onload: function(responseDetails) {
		var con = responseDetails.responseText;
		menge= con.split('class="icon beer')[1].split('</li>')[0];

		Pos = menge.indexOf(".");
		Alk = menge.substr(Pos - 1, 4);//.replace(".", "");
		document.getElementById("pro").innerHTML = Alk;


		if(s==0){
			document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">Bot Aktiv</font>';
		}

		if(s==1){
			document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">Promille gesteigert um 0.35</font>';
		}

		if(s==	2){
			document.getElementById("info").innerHTML = '<font style=\"color:'+farbe1+'; font-size:'+gross1+'%;\">Promille veringert um 0.35</font>';
		}
	}
});
}




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


int_bewegung_spenden()






//var feld = document.getElementById("last_visit");
//var feld1 = feld.getElementsByClassName('visit_item')[1];

//id = feld1.split('profil/id;')[1].split('/')[0];


