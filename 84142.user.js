// ==UserScript==
// @name           vorherschende Banden Anzeige unter stadt
// @namespace      http://pennerhack.foren-city.de/   by basti1012
// @description    Anzeige aller vorherschende Banden. Alle banden sind zum Profil verlinkt .Stadtteile die ihr besitzen tut werden grün angezeigt .Die stadtteile die ihr besitzen tut könnt ihr von hiere aus auch hinziehen mit den button go 
// @include        http://*pennergame.de/city/*
// @exclude 	   http://newboard.pennergame.de/*
// @exclude 	   *berlin.pennergame*
// ==/UserScript==




var url = document.location.href;

// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
Stadtjanein = 'Einziehen';
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
Stadtjanein = 'Einziehen';
}
// Linkadressen fuer Frankreich
if (url.indexOf("clodogame")>=0) {
var link = "http://www.clodogame.fr"
Stadtjanein = 'Emm';
}
// Linkadressen fuer Spanien
if (url.indexOf("mendigogame")>=0) {
var link = "http://www.mendigogame.es"
Stadtjanein = 'Mudarse';
}
// Linkadresse tuerkei
if (url.indexOf("serserionline")>=0) {
var link = "http://www.serserionline.com"
Stadtjanein = 'Kup';
}
// Linkadresse dossergame
if (url.indexOf("dossergame.co.uk")>=0) {
var link = "http://www.dossergame.co.uk"
Stadtjanein = 'Move in';
}
// Linkadresse menelgame
if (url.indexOf("menelgame.pl")>=0) {
var link = "http://www.menelgame.pl"
Stadtjanein = 'Kup';
}





GM_xmlhttpRequest(
   {
	method: 'GET',
  	url: 'http://berlin.pennergame.de/city/district/',
	onload: function(responseDetails) 
	{
		var contenta = responseDetails.responseText;


		for(x=1;x<=104;x++){
			try{
				scheckfeld = contenta.split('action="/city/district/buy/">')[x].split('</form>')[0];
				stadtname = scheckfeld.split('city_name">')[1].split('</span>')[0];
				stadtid = scheckfeld.split('value="')[1].split('"')[0];
				var suche = scheckfeld.search(Stadtjanein);

				if (suche != -1) {
					GM_setValue("stadtid" + x, stadtid);
					GM_setValue("stadtname" + x, stadtname);
				}else{
					GM_setValue("stadtid" + x, "SSSAAA");
					GM_setValue("stadtname" + x, "SSSAAA");
				}
			}catch(e){
			GM_setValue("stadtname" + x,"SSSAAA");
			GM_setValue("stadtid" + x,"SSSAAA");
			}
		}
var content = responseDetails.responseText;



//function weiter(content){
GM_xmlhttpRequest({
   	 method: 'GET',
    	 url: 'http://berlin.pennergame.de/city_list/',
    	 onload: function(responseDetails) {
		var cont = responseDetails.responseText;



for(a=1;a<=104;a++) {
try{
var stadt = cont.split("&city"+a+"=")[1].split("&city_einwohner")[0];
var id = cont.split("&city_bande"+a+"=")[1].split("&")[0];
var bandenname = cont.split("city_bandenname"+a+"=")[1].split("&")[0];
kaufcheck(stadt,a,id,bandenname,content)
}catch(e){}
}

}});
//}










function kaufcheck(stadt,a,id,bandenname,content){

try{
var text1 = content.split('value="'+a+'"')[1];
var text2 = text1.split('form')[0];
var text3 = text2.split('value="')[1];
var text4 = text3.split('"')[0];
}catch(e){}
if (text4 == "Kaufen") {
document.getElementsByTagName("table")[3].innerHTML += "<tr><th>"+a+".</th><th><span style=\"color:whithe; font-size:100%;\"><b>"+stadt+"</b></span></th><th><a href=/profil/bande:"+id+"/>"+bandenname+"</a></th></tr>";
}else{
document.getElementsByTagName("table")[3].innerHTML += "<tr><th>"+a+".</th><th><span style=\"color:green; font-size:100%;\"><b>"+stadt+"</b></span></th><th><a href=/profil/bande:"+id+"/>"+bandenname+"</a></th></tr>";
}
}
















var selectin = ''
	+'<select id="wechseln" name="wechseln">'
	+'<option value="'+GM_getValue("stadtid1")+'">'+GM_getValue("stadtname1")+'</option>'
	+'<option value="'+GM_getValue("stadtid2")+'">'+GM_getValue("stadtname2")+'</option>'
	+'<option value="'+GM_getValue("stadtid3")+'">'+GM_getValue("stadtname3")+'</option>'
	+'<option value="'+GM_getValue("stadtid4")+'">'+GM_getValue("stadtname4")+'</option>'
	+'<option value="'+GM_getValue("stadtid5")+'">'+GM_getValue("stadtname5")+'</option>'
	+'<option value="'+GM_getValue("stadtid6")+'">'+GM_getValue("stadtname6")+'</option>'
	+'<option value="'+GM_getValue("stadtid7")+'">'+GM_getValue("stadtname7")+'</option>'
	+'<option value="'+GM_getValue("stadtid8")+'">'+GM_getValue("stadtname8")+'</option>'
	+'<option value="'+GM_getValue("stadtid9")+'">'+GM_getValue("stadtname9")+'</option>'
	+'<option value="'+GM_getValue("stadtid10")+'">'+GM_getValue("stadtname10")+'</option>'

+'<option value="'+GM_getValue("stadtid11")+'">'+GM_getValue("stadtname11")+'</option>'
+'<option value="'+GM_getValue("stadtid12")+'">'+GM_getValue("stadtname12")+'</option>'
+'<option value="'+GM_getValue("stadtid13")+'">'+GM_getValue("stadtname13")+'</option>'
+'<option value="'+GM_getValue("stadtid14")+'">'+GM_getValue("stadtname14")+'</option>'
+'<option value="'+GM_getValue("stadtid15")+'">'+GM_getValue("stadtname15")+'</option>'
+'<option value="'+GM_getValue("stadtid16")+'">'+GM_getValue("stadtname16")+'</option>'
+'<option value="'+GM_getValue("stadtid17")+'">'+GM_getValue("stadtname17")+'</option>'
+'<option value="'+GM_getValue("stadtid18")+'">'+GM_getValue("stadtname18")+'</option>'
+'<option value="'+GM_getValue("stadtid19")+'">'+GM_getValue("stadtname19")+'</option>'
+'<option value="'+GM_getValue("stadtid20")+'">'+GM_getValue("stadtname20")+'</option>'

+'<option value="'+GM_getValue("stadtid21")+'">'+GM_getValue("stadtname21")+'</option>'
+'<option value="'+GM_getValue("stadtid22")+'">'+GM_getValue("stadtname22")+'</option>'
+'<option value="'+GM_getValue("stadtid23")+'">'+GM_getValue("stadtname23")+'</option>'
+'<option value="'+GM_getValue("stadtid24")+'">'+GM_getValue("stadtname24")+'</option>'
+'<option value="'+GM_getValue("stadtid25")+'">'+GM_getValue("stadtname25")+'</option>'
+'<option value="'+GM_getValue("stadtid26")+'">'+GM_getValue("stadtname26")+'</option>'
+'<option value="'+GM_getValue("stadtid27")+'">'+GM_getValue("stadtname27")+'</option>'
+'<option value="'+GM_getValue("stadtid28")+'">'+GM_getValue("stadtname28")+'</option>'
+'<option value="'+GM_getValue("stadtid29")+'">'+GM_getValue("stadtname29")+'</option>'
+'<option value="'+GM_getValue("stadtid30")+'">'+GM_getValue("stadtname20")+'</option>'

+'<option value="'+GM_getValue("stadtid31")+'">'+GM_getValue("stadtname31")+'</option>'
+'<option value="'+GM_getValue("stadtid32")+'">'+GM_getValue("stadtname32")+'</option>'
+'<option value="'+GM_getValue("stadtid33")+'">'+GM_getValue("stadtname33")+'</option>'
+'<option value="'+GM_getValue("stadtid34")+'">'+GM_getValue("stadtname34")+'</option>'
+'<option value="'+GM_getValue("stadtid35")+'">'+GM_getValue("stadtname35")+'</option>'
+'<option value="'+GM_getValue("stadtid36")+'">'+GM_getValue("stadtname36")+'</option>'
+'<option value="'+GM_getValue("stadtid37")+'">'+GM_getValue("stadtname37")+'</option>'
+'<option value="'+GM_getValue("stadtid38")+'">'+GM_getValue("stadtname38")+'</option>'
+'<option value="'+GM_getValue("stadtid39")+'">'+GM_getValue("stadtname39")+'</option>'
+'<option value="'+GM_getValue("stadtid40")+'">'+GM_getValue("stadtname40")+'</option>'

+'<option value="'+GM_getValue("stadtid41")+'">'+GM_getValue("stadtname41")+'</option>'
+'<option value="'+GM_getValue("stadtid42")+'">'+GM_getValue("stadtname42")+'</option>'
+'<option value="'+GM_getValue("stadtid43")+'">'+GM_getValue("stadtname43")+'</option>'
+'<option value="'+GM_getValue("stadtid44")+'">'+GM_getValue("stadtname44")+'</option>'
+'<option value="'+GM_getValue("stadtid45")+'">'+GM_getValue("stadtname45")+'</option>'
+'<option value="'+GM_getValue("stadtid46")+'">'+GM_getValue("stadtname46")+'</option>'
+'<option value="'+GM_getValue("stadtid47")+'">'+GM_getValue("stadtname47")+'</option>'
+'<option value="'+GM_getValue("stadtid48")+'">'+GM_getValue("stadtname48")+'</option>'
+'<option value="'+GM_getValue("stadtid49")+'">'+GM_getValue("stadtname49")+'</option>'
+'<option value="'+GM_getValue("stadtid50")+'">'+GM_getValue("stadtname50")+'</option>'

+'<option value="'+GM_getValue("stadtid51")+'">'+GM_getValue("stadtname51")+'</option>'
+'<option value="'+GM_getValue("stadtid52")+'">'+GM_getValue("stadtname52")+'</option>'
+'<option value="'+GM_getValue("stadtid53")+'">'+GM_getValue("stadtname53")+'</option>'
+'<option value="'+GM_getValue("stadtid54")+'">'+GM_getValue("stadtname54")+'</option>'
+'<option value="'+GM_getValue("stadtid55")+'">'+GM_getValue("stadtname55")+'</option>'
+'<option value="'+GM_getValue("stadtid56")+'">'+GM_getValue("stadtname56")+'</option>'
+'<option value="'+GM_getValue("stadtid57")+'">'+GM_getValue("stadtname57")+'</option>'
+'<option value="'+GM_getValue("stadtid58")+'">'+GM_getValue("stadtname58")+'</option>'
+'<option value="'+GM_getValue("stadtid59")+'">'+GM_getValue("stadtname59")+'</option>'
+'<option value="'+GM_getValue("stadtid60")+'">'+GM_getValue("stadtname60")+'</option>'

+'<option value="'+GM_getValue("stadtid61")+'">'+GM_getValue("stadtname61")+'</option>'
+'<option value="'+GM_getValue("stadtid62")+'">'+GM_getValue("stadtname62")+'</option>'
+'<option value="'+GM_getValue("stadtid63")+'">'+GM_getValue("stadtname63")+'</option>'
+'<option value="'+GM_getValue("stadtid64")+'">'+GM_getValue("stadtname64")+'</option>'
+'<option value="'+GM_getValue("stadtid65")+'">'+GM_getValue("stadtname65")+'</option>'
+'<option value="'+GM_getValue("stadtid66")+'">'+GM_getValue("stadtname66")+'</option>'
+'<option value="'+GM_getValue("stadtid67")+'">'+GM_getValue("stadtname67")+'</option>'
+'<option value="'+GM_getValue("stadtid68")+'">'+GM_getValue("stadtname68")+'</option>'
+'<option value="'+GM_getValue("stadtid69")+'">'+GM_getValue("stadtname69")+'</option>'
+'<option value="'+GM_getValue("stadtid70")+'">'+GM_getValue("stadtname60")+'</option>'


+'<option value="'+GM_getValue("stadtid71")+'">'+GM_getValue("stadtname71")+'</option>'
+'<option value="'+GM_getValue("stadtid72")+'">'+GM_getValue("stadtname72")+'</option>'
+'<option value="'+GM_getValue("stadtid73")+'">'+GM_getValue("stadtname73")+'</option>'
+'<option value="'+GM_getValue("stadtid74")+'">'+GM_getValue("stadtname74")+'</option>'
+'<option value="'+GM_getValue("stadtid75")+'">'+GM_getValue("stadtname75")+'</option>'
+'<option value="'+GM_getValue("stadtid76")+'">'+GM_getValue("stadtname76")+'</option>'
+'<option value="'+GM_getValue("stadtid77")+'">'+GM_getValue("stadtname77")+'</option>'
+'<option value="'+GM_getValue("stadtid78")+'">'+GM_getValue("stadtname78")+'</option>'
+'<option value="'+GM_getValue("stadtid79")+'">'+GM_getValue("stadtname79")+'</option>'
+'<option value="'+GM_getValue("stadtid80")+'">'+GM_getValue("stadtname70")+'</option>'


+'<option value="'+GM_getValue("stadtid81")+'">'+GM_getValue("stadtname81")+'</option>'
+'<option value="'+GM_getValue("stadtid82")+'">'+GM_getValue("stadtname82")+'</option>'
+'<option value="'+GM_getValue("stadtid83")+'">'+GM_getValue("stadtname83")+'</option>'
+'<option value="'+GM_getValue("stadtid84")+'">'+GM_getValue("stadtname84")+'</option>'
+'<option value="'+GM_getValue("stadtid85")+'">'+GM_getValue("stadtname85")+'</option>'
+'<option value="'+GM_getValue("stadtid86")+'">'+GM_getValue("stadtname86")+'</option>'
+'<option value="'+GM_getValue("stadtid87")+'">'+GM_getValue("stadtname87")+'</option>'
+'<option value="'+GM_getValue("stadtid88")+'">'+GM_getValue("stadtname88")+'</option>'
+'<option value="'+GM_getValue("stadtid89")+'">'+GM_getValue("stadtname89")+'</option>'
+'<option value="'+GM_getValue("stadtid90")+'">'+GM_getValue("stadtname80")+'</option>'

+'<option value="'+GM_getValue("stadtid91")+'">'+GM_getValue("stadtname91")+'</option>'
+'<option value="'+GM_getValue("stadtid92")+'">'+GM_getValue("stadtname92")+'</option>'
+'<option value="'+GM_getValue("stadtid93")+'">'+GM_getValue("stadtname93")+'</option>'
+'<option value="'+GM_getValue("stadtid94")+'">'+GM_getValue("stadtname94")+'</option>'
+'<option value="'+GM_getValue("stadtid95")+'">'+GM_getValue("stadtname95")+'</option>'
+'<option value="'+GM_getValue("stadtid96")+'">'+GM_getValue("stadtname96")+'</option>'
+'<option value="'+GM_getValue("stadtid97")+'">'+GM_getValue("stadtname97")+'</option>'
+'<option value="'+GM_getValue("stadtid98")+'">'+GM_getValue("stadtname98")+'</option>'
+'<option value="'+GM_getValue("stadtid99")+'">'+GM_getValue("stadtname99")+'</option>'
+'<option value="'+GM_getValue("stadtid100")+'">'+GM_getValue("stadtname100")+'</option>'


	+'<option value="'+GM_getValue("stadtid101")+'">'+GM_getValue("stadtname101")+'</option>'
	+'<option value="'+GM_getValue("stadtid102")+'">'+GM_getValue("stadtname102")+'</option>'
	+'<option value="'+GM_getValue("stadtid103")+'">'+GM_getValue("stadtname103")+'</option>'
	+'<option value="'+GM_getValue("stadtid104")+'">'+GM_getValue("stadtname104")+'</option>'
	+'<option value="'+GM_getValue("stadtid105")+'">'+GM_getValue("stadtname105")+'</option>'
	+'</select><input type="button" id="UMZUG"  name="UMZUG" value="Go" >'
	+'</div></div>';

selectin = selectin.replace(/<option value="SSS/g,"");
selectin = selectin.replace(/AAA</g,"");
selectin = selectin.replace(/AAA">SSS/g,"");

selectin = selectin.replace(/<option value="undefi/g,"");
selectin = selectin.replace(/ned</g,"");
selectin = selectin.replace(/ned">undefi/g,"");


document.getElementsByTagName("table")[2].innerHTML += "<tr><h2> Vorherschende Banden </h2></tr><center>Umziehen nach "+selectin+"</center>";



	document.getElementById('UMZUG').addEventListener('click', function UMZIEEN(){

		var welcherplunder = document.getElementsByName('wechseln')[0].value;


		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://'+window.location.host+'/city/district/buy/',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('id='+welcherplunder+'&submitForm=Einziehen'),
			onload: function(responseDetails)
     			{
				location.reload();
     	 		}
 	 	});					
	},false);//weiter(content)
}});






















		//////////////////////////////////////////////////////
		////////// Copyright By Basti1012 ////////////////////
		// Visit By Http://www.pennerhack.foren-city.de///////
		//Kopiern und Verkaufen wird Strafrechtlich Verfolgt//
		//////////////////////////////////////////////////////
		//////////////////////////////////////////////////////