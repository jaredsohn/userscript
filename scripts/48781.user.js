// ==UserScript==
// @name PennerProfi Menue 4.0.1
// @namespace By OGGAdmin @ PennerProfi.de.vu
// @description erstellt 2 Menues zum steuern des Penners
// @include http://*pennergame.de/*
// @include http://pennerprofi.bplaced.net/viewpage.php?page_id=26*
// ==/UserScript==

//--------------------Copyright ? 2009 by The PennerProfi-Team ('',)------------------//

var url = document.location.href;
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
var wb_link = "berlin.pennergame.de/skills/";
var ov_link = "berlin.pennergame.de/overview/";
var activities_link = "berlin.pennergame.de/activities/";
var maxspenden1 = 10
var spenden1 = 9
var nach = 'Hamburg'
var pennerprofilinks = 'berlin'
var gangimagelink = 'http://imgberlin.pennergame.de/cache/bl_DE/gangicon/'
}
if (url.indexOf("http://www")>=0) {
var link = "http://www.pennergame.de"
var wb_link = "highscore.pennergame.de/skills/";
var ov_link = "www.pennergame.de/overview/";
var activities_link = "www.pennergame.de/activities/";
var maxspenden1 = 50
var spenden1 = 49
var nach = 'Berlin'
var pennerprofilinks = 'hamburg'
var gangimagelink = 'http://img.pennergame.de/cache/de_DE/gangicon/'
}
if (url.indexOf("http://pennergame")>=0) {
var link = "http://www.pennergame.de"
var wb_link = "highscore.pennergame.de/highscore";
var ov_link = "pennergame.de/overview/";
var activities_link = "www.pennergame.de/activities/";
var maxspenden1 = 50
var spenden1 = 49
var nach = 'Berlin'
var pennerprofilinks = 'hamburg'
var gangimagelink = 'http://img.pennergame.de/cache/de_DE/gangicon/'
}
var version_aktuell = "4";
		if (url.indexOf("http://pennerprofi.bplaced.net/viewpage.php?page_id=26")>=0) {
			var update_now = GM_getValue("update_now", "false");
				// wenn update geklickt wurde
				if (update_now == "true") {
					var version1 = document.getElementById("versionsnummer");
					var version = version1.value;
						if (version_aktuell < version) {
							alert("Neue Version gefunden \nAktuelle Version 4.0.1 \nNeue Version 5.0.1");
							GM_setValue("update_now","false");
							update_now = "false";
							}
							else
							{
							alert("keine neue Version gefunden \ngehe zur\u00fcck zu Pennergame");
							GM_setValue("update_now","false");
							update_now = "false";
							var link = GM_getValue("link", "http://pennerprofi.bplaced.net")
							top.location.href = link+"/overview/";
							}
				}
		}
GM_xmlhttpRequest({
  method: 'GET',
	url: ""+link+"/overview/",
	  onload: function( response ) {
		var content = response.responseText;
		var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
		var clean = content.match(/Sauberkeit:\s([0-9]+)/)[1];
		var prom2 = content.match(/\u003E([0-9]\.[0-9]+)\u0026permil\u003B\u003C/)[1];
		var spendenbisherpur = content.match(/Du hast heute ([0-9]+) Spenden erhalten/)[ 1 ];
		var Name = content.split('<img class="nickimg" src="http://www.pennergame.de/headline/')[1].split('/" />')[0];
		var kurs = content.split('<a href="/stock/bottle/"><span id="pfandflaschen_kurs_ajax">')[1].split('</span> Cent</a>')[0];	  
GM_xmlhttpRequest({
  method: 'GET',
	url: ""+link+"/dev/api/user."+userid+".xml",
	  onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var bandenid = content.split('<id>')[2].split('</id>')[0];
		var bandenname = content.split('<name>')[2].split('</name>')[0];
		var hs2 = content.split('<points>')[1].split('</points>')[0];
		function flaschen_click(ev) {
		GM_setValue("flaschen_save","true");
		top.location.href= '/activities/';}
		function waschen_click(ev) {
		GM_setValue("waschen_save", "true"); 
		top.location.href= '/city/washhouse/';}
		function drink_click(ev) {
		GM_setValue("drink_save","true");
		top.location.href= '/stock/';}
		function eat_click(ev) {
		GM_setValue("eat_save","true");
		top.location.href= '/stock/foodstuffs/food/';}
		function banden_image_click(ev) {
		top.location.href= '/profil/bande:'+bandenid+'/';}
		function kasse_click(ev) {
		var my_kasse_value = my_kasse_edit.value;
		GM_setValue("kasse_value", (my_kasse_value));
		GM_setValue("kasse_now", "true");
		top.location.href= '/gang/credit/';} 	
		function brot_inventar_click(ev) {
		top.location.href= '/stock/foodstuffs/food/';}
		function brot_kaufen_click(ev) {
		var my_brot_value = my_brot_edit.value;
		GM_setValue("brot_value", (my_brot_value));
		GM_setValue("brot_now", "true");
		top.location.href= '/city/supermarket/food/';}
		function bier_inventar_click(ev) {
		top.location.href= '/stock/';}
		function bier_kaufen_click(ev) {
		var my_bier_value = my_bier_edit.value;
		GM_setValue("bier_value", (my_bier_value));
		GM_setValue("bier_now", "true");
		top.location.href= '/city/supermarket/drinks/';}
		function logout_click(ev) {
		top.location.href= '/logout/';}
		function update_click(ev) {
		alert("Suche nach Update auf PennerProfi.de.vu");
		GM_setValue("update_now","true");
		GM_setValue("link",link);
		top.location.href= 'http://pennerprofi.bplaced.net/viewpage.php?page_id=26'; }
	if(document.getElementById("pfandflaschen_kurs_ajax_style")){
		Pos = document.getElementsByTagName("li")[2].innerHTML.indexOf(".");
		Alk = document.getElementsByTagName("li")[2].innerHTML.substr(Pos - 1, 4).replace(".", "");
		Benoetigtprozent = 281 - Alk;
		Benoetigtbier = Math.floor(Benoetigtprozent/35);
		Benoetigtbrot = Math.ceil(Alk/35); 
	var flaschen_now = GM_getValue("flaschen_save", "false");               
		if (flaschen_now  == "true") 
		{ 
		var flaschen_now = "false";
		GM_setValue("flaschen_save", "false");
		var flaschen_inputButton = document.getElementsByName("Submit2")[0];
		flaschen_inputButton.click(); 
		}
		else
		{
	var waschen_now = GM_getValue("waschen_save", "false");
		if (waschen_now  == "true")
		{
		var waschen_now = "false";
		GM_setValue("waschen_save", "false");	
		var waschen_inputButton = document.getElementsByName("submitForm")[1];
		waschen_inputButton.click();
		}
		else
		{
	var drink_now = GM_getValue("drink_save", "false");
		if (drink_now  == "true")
		{
			if (document.getElementById('lager_Bier'))
			{
			var lager_bier = document.getElementById("lager_Bier").value;
			}
			else
			{
			var lager_bier = "0";
			}
				if (lager_bier < Benoetigtbier)
				{
				var drink_now = "false";
				GM_setValue("drink_save", "false");	
				var wieviel_bier = ( Benoetigtbier - lager_bier);
				alert("Du hast im Moment "+lager_bier+" Flaschen Bier in deinem Lager! \nF\u00fcr einen Vollrausch ben\u00f6tigst du noch mindestens "+wieviel_bier+" weiter Flaschen");
				top.location.href= '/city/supermarket/drinks/';
				}
				else
				{
				var drink_now = "false";
				GM_setValue("drink_save", "false");	
				var drink_edit = document.getElementsByName("menge")[0];
				drink_edit.value = Benoetigtbier;
				var drink_inputButton = document.getElementById("drink_Bier");
				drink_inputButton.click();
				}
		}
		else
		{
	var eat_now = GM_getValue("eat_save", "false");
		if (eat_now  == "true")
		{
			if (document.getElementById('lager_Brot'))
			{
			var lager_brot = document.getElementById("lager_Brot").value;
			}
			else 
			{
			var lager_brot = "0";
			}
				if (lager_brot < Benoetigtbrot)
				{
				var eat_now = "false";
				GM_setValue("eat_save", "false");	
				var wieviel_brot = ( Benoetigtbrot - lager_brot);
				alert("Du hast im Moment "+lager_brot+" Brot(e) in deinem Lager! \nUm n\u00fcchtern zu werden ben\u00f6tigst du noch mindestens "+wieviel_brot+" weiter Brote");
				top.location.href= '/city/supermarket/food/';
				}
				else
				{
				var eat_now = "false";
				GM_setValue("eat_save", "false");	
				var eat_edit = document.getElementsByName("menge")[0];
				eat_edit.value = Benoetigtbrot;
				var eat_inputButton = document.getElementById("drink_Brot");
				eat_inputButton.click();
				}
		}
		else
		{
	var kasse_now = GM_getValue("kasse_now", "false");
		if (kasse_now  == "true") 
		{
		var my_kasse_value = GM_getValue("kasse_value", '1');
		my_gang_kasse_edit = document.getElementById("f_money");
		my_gang_kasse_edit.value = my_kasse_value
		my_gang_kasse_button = document.getElementsByName("Submit")[0];
		GM_setValue("kasse_now", "false")
		kasse_now = "false";
		my_gang_kasse_button.click();
		}
		else
		{
	var brot_now = GM_getValue("brot_now", "false");
		if (brot_now  == "true")
		{
		var brot_now = "false";
		GM_setValue("brot_now", "false");	
		var brot_menge = GM_getValue("brot_value", "1");
		var my_brot_edit = document.getElementById("menge0");
		my_brot_edit.value = brot_menge;
		var brot_kaufen_inputButton = document.getElementById("submitForm0");
		brot_kaufen_inputButton.click();
		}
		else
		{
		var bier_now = GM_getValue("bier_now", "false");
			if (bier_now  == "true")
			{
			var bier_now = "false";
			GM_setValue("bier_now", "false");	
			var bier_menge = GM_getValue("bier_value", "1");
			var bier_edit = document.getElementById("menge0");
			bier_edit.value = bier_menge;
			var bier_kaufen_inputButton = document.getElementById("submitForm0");
			bier_kaufen_inputButton.click();
			}
	else
	{
	}
}
}
}
}
}
}
if (window.location.hostname + window.location.pathname == wb_link) {
	if (document.getElementById('counter2')) {
		if (document.getElementById('counter3')) {
		var abbrechen = "true";}
	}
}
else
{
	if (document.getElementById('counter2')) {
	var abbrechen = "true";}
	if (window.location.hostname + window.location.pathname == ov_link) {
function removeElement( element ) {try{element.parentNode.removeChild( element );}catch( error ){}}
function remove_iframe_adds() {try{var adds = document.getElementsByTagName('iframe');for( var i = 0; i < adds.length; i++ ){removeElement(adds[ i ]);}} catch( error ) {stack.push( error );}}
function remove_flash_adds() {try{var adds = document.getElementsByTagName('object');for( var i = 0; i < adds.length; i++ ){removeElement(adds[ i ]);}} catch( error ) {stack.push( error );}}
function remove_layer_adds() {try{removeElement( document.getElementById('ad2gameslayer') );} catch( error ) {stack.push( error );}}
function init(){remove_iframe_adds();remove_flash_adds();remove_layer_adds();}
init();window.addEventListener("load", init, false);
	var content = document.getElementById('content');
	var ul = content.getElementsByTagName('ul')[9];
	ul.innerHTML = 
'<a href="/financial/"><img src="http://i39.tinypic.com/2ahiqyv.jpg"></a>'
+
'<a href = "/messages/"><img src="http://i40.tinypic.com/2icb5mp.jpg"></a>'
+
'<a href = "/friendlist/"><img src="http://i43.tinypic.com/nd3hpz.jpg"></a>'
+
'<a href = "/gang/"><img src="http://i41.tinypic.com/wlon4i.jpg"></a>'
+
'<a href = "/awards/"><img src="http://i41.tinypic.com/de4f0p.jpg"></a>'
+
'<a href = "/profil/id:'+userid+'/"><img src="http://i43.tinypic.com/10ymnm0.jpg"></a>'
+
'<a href = "/change_please/statistics/"><img src="http://i41.tinypic.com/2vmt3f5.jpg"></a>'
+
'<a href = "/premium/"><img src="http://i42.tinypic.com/29ly45v.jpg"></a>'
+
'<a href = "/faq/"><img src="http://i39.tinypic.com/345k304.jpg"></a>'
+
'<a href = "/manual/"><img src="http://i42.tinypic.com/mha9ar.jpg"></a>'
+
'<a href = "http://pennerprofi.de.vu" target="_blank"><img src="http://i44.tinypic.com/2irrbfa.jpg"></a>'
+
'<a href = "http://pennerprofi.bplaced.net/viewpage.php?page_id=26" style = "width: 140px; height: 140px"> <div id="div_update" style = "width: 140px; height: 140px"><img src="http://i39.tinypic.com/2lw635f.jpg" id="update_bild" title="jetzt nach einem Update suchen"></div></a>';
		my_update_bild = document.getElementById("update_bild");
		my_update_bild.addEventListener('click',update_click,false);
	var div = document.getElementById('summary');
	var navi = div.getElementsByTagName('h3')[0];
	navi.style.width="545px";
	var div = document.getElementById('summary');
	var div_new_msg = div.getElementsByTagName('div')[0];
	navi.appendChild(div_new_msg);
	var div_pennerprofi = document.createElement("ul");
	div_pennerprofi.style.display="block";
	div_pennerprofi.style.height="50px";  
	div_pennerprofi.style.width="540px"; 
	navi.appendChild(div_pennerprofi);
	my_pennerprofi_feld = document.createElement("li");
	my_pennerprofi_feld.innerHTML = '<img src="http://i43.tinypic.com/2sb7vk8.jpg" title="PennerProfi.de.vu"></img>';
	my_pennerprofi_feld.style.height="30px";
	div_pennerprofi.appendChild(my_pennerprofi_feld);
	navi.removeChild(navi.childNodes[0]);
	var div_wechsellink = document.createElement("div");
	div_wechsellink.style.display="block";
	div_wechsellink.style.height="20px";  
	div_wechsellink.style.width="120px"; 
	navi.appendChild(div_wechsellink);
	my_wechsellink = document.createElement("a");
	my_wechsellink.title = "nach "+nach+" wechseln";
	my_wechsellink.name = "nach "+nach;
	my_wechsellink.textContent = "nach "+nach;
	my_wechsellink.style.color = "#00BFFF";
	my_wechsellink.textSize = "10";
		if (url.indexOf("http://berlin")>=0) {
		my_wechsellink.href = "http://www.pennergame.de/overview/";
		}
		else
		{
		my_wechsellink.href = "http://berlin.pennergame.de/overview/";
		}
	div_wechsellink.appendChild(my_wechsellink);
	var div = document.getElementById('summary');
	var div_avatar = div.getElementsByTagName('div')[2];
	div_avatar.style.height = "155px";
	navi.appendChild(div_avatar);
	var div2 = document.getElementById('summary');
	var div_avatar2 = div.getElementsByTagName('div')[3];
	navi.appendChild(div_avatar2);
	var div3 = document.getElementById('summary');
	var navi3 = div.getElementsByTagName('h3')[0];
	var ov_menue = navi3.getElementsByTagName('div')[3];
	einstellungen = ov_menue.childNodes[7];
	ov_menue.removeChild(ov_menue.childNodes[5]);
	my_spenden = document.createElement("spawn");
		if (spendenbisherpur>spenden1) {
		my_spenden.style.color = "red";	
		my_spenden.style.width = "370px";
		my_spenden.textContent = "Dein Spendenbecher ist voll: "+spendenbisherpur+"/"+maxspenden1;
		ov_menue.appendChild(my_spenden);	
		}
		else
		{
		my_spenden.style.color = "green";
		my_spenden.textContent = "Dein Spendenbecher ist noch nicht voll: "+spendenbisherpur+"/"+maxspenden1;
		ov_menue.appendChild(my_spenden);
		}
	var kasse_zeile = document.createElement("ul");
	kasse_zeile.style.width="300px";
	ov_menue.appendChild(kasse_zeile);
			my_image_bande = document.createElement("img"); 
			my_image_bande.src = gangimagelink+bandenid+'.jpg';
			my_image_bande.style.width = "30px";
			my_image_bande.style.height = "15px";
			my_image_bande.alt = 'kasse';
			my_image_bande.setAttribute("hspace","5");
			my_image_bande.title = bandenname;
			my_image_bande.addEventListener('click',banden_image_click,false);
			kasse_zeile.appendChild(my_image_bande);
			my_kasse_edit = document.createElement("input");
			my_kasse_edit.type = 'input';
			my_kasse_edit.value = "1000";
			my_kasse_edit.size = '8';
			kasse_zeile.appendChild(my_kasse_edit);
			my_kasse_button = document.createElement("input");
			my_kasse_button.type = 'button';
			my_kasse_button.value = 'Bandenkasse einzahlen';
			my_kasse_button.addEventListener('click',kasse_click,false);
			kasse_zeile.appendChild(my_kasse_button);
	var suchen = document.createElement("ul");
	suchen.style.width="300px";
	suchen.innerHTML = '<form method=\"GET\" action=\"/highscore/search/\"><font <img src=\"http://i40.tinypic.com/ac6694.jpg\" hspace=\"5\" alt=\"user\" title=\"\"><font <input name=\"name\" type=\"text\" size=\"8\"><input class=\"formbutton\" type=\"submit\" value=\"Spieler suchen\"></form><div>';
	ov_menue.appendChild(suchen);
	var brot_zeile = document.createElement("ul");
	brot_zeile.style.width="300px";
	ov_menue.appendChild(brot_zeile);
			my_image_brot = document.createElement("img");
			my_image_brot.src = 'http://i43.tinypic.com/1040we9.jpg';
			my_image_brot.alt = 'brot';
			my_image_brot.setAttribute("hspace","5");
			my_image_brot.title = 'zum Inventar';
			my_image_brot.addEventListener('click',brot_inventar_click,false);
			brot_zeile.appendChild(my_image_brot);
			my_brot_edit = document.createElement("input");
			my_brot_edit.type = 'input';
			my_brot_edit.value = "10";
			my_brot_edit.size = '4';
			brot_zeile.appendChild(my_brot_edit);
			my_brot_button = document.createElement("input");
			my_brot_button.type = 'button';
			my_brot_button.value = 'Brot kaufen';
			my_brot_button.addEventListener('click',brot_kaufen_click,false);
			brot_zeile.appendChild(my_brot_button);
	var bier_zeile = document.createElement("ul");
	bier_zeile.style.width="300px";
	ov_menue.appendChild(bier_zeile);
			my_image_bier = document.createElement("img");
			my_image_bier.src = 'http://i42.tinypic.com/14wt8uu.jpg';
			my_image_bier.alt = 'bier';
			my_image_bier.setAttribute("hspace","5");
			my_image_bier.title = 'zum Inventar';
			my_image_bier.addEventListener('click',bier_inventar_click,false);
			bier_zeile.appendChild(my_image_bier);
			my_bier_edit = document.createElement("input");
			my_bier_edit.type = 'input';
			my_bier_edit.value = "10";
			my_bier_edit.size = '4';
			bier_zeile.appendChild(my_bier_edit);
			my_bier_button = document.createElement("input");
			my_bier_button.type = 'button';
			my_bier_button.value = 'Bier kaufen';
			my_bier_button.addEventListener('click',bier_kaufen_click,false);
			bier_zeile.appendChild(my_bier_button);
	var div = document.getElementById('summary');
	var div_avatar = div.getElementsByTagName('div')[2];
	var div_logout = div_avatar.cloneNode(false);
	div_logout.style.height = "23px";
	div_logout.style.width="540px"; 
	div_logout.setAttribute("align","right")
	navi.appendChild(div_logout);
		my_logout_button = document.createElement("input");
		my_logout_button.type = 'button';
		my_logout_button.value = 'Logout';
		my_logout_button.addEventListener('click',logout_click,false);
		div_logout.appendChild(my_logout_button);
	var div = document.getElementById('summary');
	var div_avatar = div.getElementsByTagName('div')[2];
	var div_setup = div_avatar.cloneNode(false);
	div_setup.style.height = "35px";
	div_setup.style.width="540px"; 
	div_setup.setAttribute("align","right")
	navi.appendChild(div_setup);
	div_setup.appendChild(einstellungen);
	var div = document.getElementById('summary');
	var div_avatar = div.getElementsByTagName('div')[2];
	var div_pennerlinks = div_avatar.cloneNode(false);
	div_pennerlinks.style.height = "50px";
	div_pennerlinks.style.width="540px"; 
	div_pennerlinks.innerHTML =
'<img src="http://i44.tinypic.com/9h6s1z.jpg">'
	+
'<input type=\"button\" name=\"haustier\" style="margin-right: 5px;" onclick=\"top.location.href= \'http://pennerprofi.bplaced.net/'+pennerprofilinks+'/haustiere/\';\" value=\"Haustier\">'
	+
'<input type=\"button\" name=\"eigenheim\" style="margin-right: 5px;" onclick=\"top.location.href= \'http://pennerprofi.bplaced.net/'+pennerprofilinks+'/eigenheime/\';\" value=\"Eigenheim\">'
	+
'<input type=\"button\" name=\"schnorrplatz\" style="margin-right: 5px;" onclick=\"top.location.href= \'http://pennerprofi.bplaced.net/'+pennerprofilinks+'/schnorrplaetze/\';\" value=\"Schnorrplatz\">'
	+
'<input type=\"button\" name=\"musik\" style="margin-right: 5px;" onclick=\"top.location.href= \'http://pennerprofi.bplaced.net/'+pennerprofilinks+'/musikinstrumente/\';\" value=\"Musikinstrument\">'
	+
'<input type=\"button\" name=\"awaffen\" style="margin-right: 5px;" onclick=\"top.location.href= \'http://pennerprofi.bplaced.net/'+pennerprofilinks+'/angriffswaffen/\';\" value=\"Angriffswaffe\">'
	+
'<input type=\"button\" name=\"vwaffen\" style="margin-right: 5px;" onclick=\"top.location.href= \'http://pennerprofi.bplaced.net/'+pennerprofilinks+'/verteidigungswaffen/\';\" value=\"Verteidigungswaffe\">'
	+
'<img src="http://i44.tinypic.com/9h6s1z.jpg">';
	navi.appendChild(div_pennerlinks);
	var div = document.getElementById('summary');
	var div_avatar = div.getElementsByTagName('div')[2];
	var new_div3 = div_avatar.cloneNode(false);
	new_div3.style.height = "30px";
	new_div3.style.width="530px"; 
	new_div3.setAttribute("align","right")
	navi.appendChild(new_div3);
	my_intervall_text1 = document.createElement("span");
	my_intervall_text1.style.color = "white"	
	my_intervall_text1.innerHTML = '<span style="visibility: hidden">Seite alle </span>';
	my_intervall_text2 = document.createElement("span");
	my_intervall_text2.style.color = "white"	
	my_intervall_text2.innerHTML = '<span style="visibility: hidden"> Minuten aktuallisieren </span>';
	my_intervall_edit = document.createElement("input");
	my_intervall_edit.type = 'hidden';
	var intervall2 = GM_getValue("intervall", '8');
	my_intervall_edit.value = intervall2;
	my_intervall_edit.size = '2';
	function intervall_click (ev){
	if (my_intervall_button.value == 'optionen'){
	my_intervall_edit.type = 'input';
	my_intervall_button.value = 'speichern';
	my_intervall_text1.innerHTML = '<span>Seite alle </span>';
	my_intervall_text2.innerHTML = '<span> Minuten aktuallisieren </span>';
	}
	else
	{
	my_intervall_button.value = 'optionen';
	var intervall3 =  my_intervall_edit.value;
	if (intervall3 < "1"){
	intervall3 = "1";
	}
	else
	{
	inertvall3 = intervall3;
	}
	GM_setValue("intervall", (intervall3));
	my_intervall_edit.type = 'hidden';
	my_intervall_text1.innerHTML = '<span style="visibility: hidden">Seite alle </span>';
	my_intervall_text2.innerHTML = '<span style="visibility: hidden"> Minuten aktuallisieren </span>';
	top.location.href= '';
	}
	}
	my_intervall_button = document.createElement("input");
	my_intervall_button.type = 'button';
	my_intervall_button.value = 'optionen';
	my_intervall_button.addEventListener('click',intervall_click,false);
	new_div3.appendChild(my_intervall_text1);	
	new_div3.appendChild(my_intervall_edit);
	new_div3.appendChild(my_intervall_text2);
	new_div3.appendChild(my_intervall_button);
	}
}
		var div_top = document.getElementById('infoscreen');
		var navi_top = div_top.getElementsByTagName('li')[6];
		navi_top.removeChild(navi_top.childNodes[0]);	
	a = document.createElement("a");
	a.id = "a";
	if (Benoetigtbier > "0"){ a.href = "/stock/";} else { a.href = "/stock/foodstuffs/food/";}	
	a.innerHTML = '<img src="http://i39.tinypic.com/2u5cphj.jpg" id="bb_bild"></img>';
	div_top = document.createElement("div");
	div_top.style.width = "175px";
	div_top.style.weight = "175px";
	div_top.innerHTML = 
	'<a href ="/activities/"><img src="http://i41.tinypic.com/29du892.jpg" id="sammeln_bild"></a>'
	+
	'<a href ="/city/washhouse/"><img src="http://i42.tinypic.com/311vsea.jpg" id="waschen_bild"></a>';
	div_top.appendChild(a);	
	navi_top.appendChild(div_top);
		my_image_flasche_top = document.getElementById("sammeln_bild");
			if ( abbrechen == "true") {
				var intervall = GM_getValue ("intervall", '8')
				window.setInterval ("top.location.href= ''", (intervall*60000));
				my_image_flasche_top.src = 'http://i41.tinypic.com/29du892.jpg';
				my_image_flasche_top.title = 'Das Flaschen sammeln abbrechen';
				}
				else
				{
				window.clearInterval ();
				my_image_flasche_top.src = 'http://i40.tinypic.com/10ofpxe.jpg';
				my_image_flasche_top.title = 'f\u00fcr 10 Minuten Flaschen sammeln gehen';
				}
		my_image_flasche_top.addEventListener('click',flaschen_click,false);
		my_image_flasche_top.alt = 'sammeln_top';
		my_image_waschen_top = document.getElementById("waschen_bild");
		my_image_waschen_top.src = 'http://i42.tinypic.com/311vsea.jpg';
		my_image_waschen_top.alt = 'waschen_top';
		my_image_waschen_top.title = 'f\u00fcr 25 Euro waschen gehen (100% Sauberkeit)';
		my_image_waschen_top.addEventListener('click',waschen_click,false);
		my_image_bier_brot_top = document.getElementById("bb_bild");
		my_image_bier_brot_top.alt = 'bier_brot_top';
			if (Benoetigtbier > "0"){
				var ob_bier_brot = "bier";
				my_image_bier_brot_top.addEventListener('click',drink_click,false);
				my_image_bier_brot_top.src = 'http://i39.tinypic.com/2u5cphj.jpg';
				my_image_bier_brot_top.title = 'Bier trinken bis 2,5 Promille erreicht sind';
				}
				else
				{
				var ob_bier_brot = "brot";
				my_image_bier_brot_top.addEventListener('click',eat_click,false);
				my_image_bier_brot_top.src = 'http://i40.tinypic.com/2d14x84.jpg';
				my_image_bier_brot_top.title = 'Brot essen bis 0 Promille erreicht sind';
				}
}
}
})
}
})





   

