// ==UserScript==
// @name           lets fight sender version 2 pennergame 4.0
// @namespace      http://pennerhack.foren-city.de/
// @description    sendet den vorgespeiocherten text an den leuten die online oder ofline sind
// @include        http://*pennergame.de/*
// @exclude 	   http://newboard.pennergame.de/*
// @exclude 	   *berlin.pennergame*
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var pgurl = 'http://dossergame.co.uk/';
};

spenden_date = new Array(8);
//Abstand oben
if(!GM_getValue("spendendaten0")||GM_getValue("spendendaten0")=='')
	spenden_date0 = 10;
else
	spenden_date0 = GM_getValue("spendendaten0");
//Abstand links
if(!GM_getValue("spendendaten1")||GM_getValue("spendendaten1")=='')
	spenden_date1 = 825;
else
	spenden_date1 = GM_getValue("spendendaten1");


GM_deleteValue("gesend1");
var gesend1 = 0;
	var gesend = GM_getValue("gesend");
if (gesend == null){gesend = 1;};
	var azztime = GM_getValue("azztime");
if (azztime == null){azztime = "6000000";};
	var vonr = GM_getValue("vonr");
if (vonr == null){vonr = 1;};


	var vonr1 = GM_getValue("vonr1");
if (vonr1 == null){vonr1 = 111;};

	var betreff = GM_getValue("betreff");
if (betreff == null){
	betreff = "Bitte Angreifen Danke";
	GM_setValue("betreff" , betreff);
}

var text = GM_getValue("text");
if (text == null){
	text = "Habe dich durch das Lets Fight Gegner suche Script gefunden,du liegst in meinen Punktebereich und k�nntest mich Runterfighten.Also wenn du lust und Zeit hast Fighte mich bitte runter Danke.(Das Script ist Geil solltest du dir auch holen zum Gegner suchen ,sehr zu empfehlen.)Mein Att = 235 mein Def = 265 mfg ich";
	GM_setValue("text" , text);
}

var dragspendenobjekt = null;
var dragx = 0;
var dragy = 0;
var posx = 0;
var posy = 0;
var spenden_cache;

if(!document.getElementById("newman_setting")){
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'newman_setting');
	newdiv.setAttribute('style', 'height:0px;');
	newdiv.innerHTML = '<div id="setting_buttons"></div><div id="setting_text"></div>';
	document.getElementsByTagName('body')[0].appendChild(newdiv);
}
var newspan = document.createElement('span');
newspan.setAttribute('id', 'setting_spenden');
newspan.innerHTML = '<input type="button" name="spenden_setting" id="spenden" value="Sende Option" />';
document.getElementById("setting_buttons").appendChild(newspan);

var table_spenden = '<table width="100%" style="border-color:#000000; border:5px; border-style:groove; color:#ffffff " cellspacing="0"><tr>'
+'<th colspan="4" style="border-bottom: 5px groove;">Settingbereich des Lets fight senders by basti1012/th></tr>'
+'<tr><th style="border-right: 3px groove;">Position</th>'
+'<th>Reloadzeit</th><th>von bis id</th></tr>'
+'<tr><td style="border-right: 3px groove; border-bottom: 5px groove;" align="left">&nbsp;Abstand oben:&nbsp;'
+'<input name="spendendaten0"id="a_s_top" type="text" size="5" maxlength="15" value="'+spenden_date0+'">&nbsp;px<br />&nbsp;Abstand links:'
+'&nbsp;<input name="spendendaten1" id="a_s_left" type="text" size="5" maxlength="15" value="'+spenden_date1+'">&nbsp;px</td>'
+'<td style="border-bottom: 5px groove;" align="left">&nbsp;<input name="azztime" id="azztime" type="text" size="5" value="'+azztime+'"> Sekunden</td>'
+'<td style="border-bottom: 3px groove; border-bottom: 5px groove;" align="left">&nbsp;id min:&nbsp;'
+'<input name="vonr"id="vonr" type="text" size="5" maxlength="15" value="'+vonr+'">&nbsp;px<br />&nbsp;id max:'
+'&nbsp;<input name="vonr1" id="vonr1" type="text" size="5" maxlength="15" value="'+vonr1+'">&nbsp;px</td>'
+'</tr>'
+'<tr><th colspan="4">Betreff und text eingabe</th></tr><tr><td colspan="4" style="border-bottom: 5px groove;">&nbsp;'
+'<br>Betreff eingeben:<br><textarea rows="1" cols="20" name="betreff" id="betreff">'+betreff+'</textarea>'
+'<br>Nachricht Eingeben:<br><textarea rows="5" cols="50" name="text" id="text">'+text+'</textarea>'
+'<br> Senden an :'
+'<select name=\"was\">'
+'<option value=\"1\">Online</option>'
//+'<option value=\"2\">Geld</option>'
//+'<option value=\"3\">Tiere</option>'
+'<option value=\"4\">Bande</option>'
//+'<option value=\"5\">sonstiges</option>'
+'<option value=\"6\">Punkte</option></select>'
+'<br> Aktueller sende Status ;'+GM_getValue("was")+' siehe unten .'
+'</td></tr>'
+'<tr><td colspan="2" style="border-bottom: 5px groove;"><input type="button" name="save_spenden_setting" id="save_spenden" value="Save Spenden Setting" /></td>'
+'<td colspan="2" style="border-bottom: 5px groove;"></td></tr><tr><td colspan="4" align="left">'
+'Beschreibung'
+'Gesendet an <br><div id="test2" </div></td></tr></table>';

var newspan2 = document.createElement('span');
newspan2.setAttribute('id', 'text_spenden');
newspan2.setAttribute('style', 'display:none;');
newspan2.innerHTML = table_spenden;
document.getElementById("setting_text").appendChild(newspan2);



document.getElementById('spenden').addEventListener('click', function Setting_spenden(){
	if(document.getElementById('text_spenden').style.display == ""){
		document.getElementById('text_spenden').style.display = 'none';
		document.getElementById('spenden').value = 'Spenden Setting';
	}else if(document.getElementById('text_spenden').style.display == "none"){
		document.getElementById('text_spenden').style.display = '';
		document.getElementById('spenden').value = 'Close sende Setting';
	}
},false);


document.getElementById('save_spenden').addEventListener('click', function save_spenden () {
GM_setValue("spendendaten0", document.getElementsByName("spendendaten0")[0].value);
GM_setValue("spendendaten1", document.getElementsByName("spendendaten1")[0].value);

GM_setValue("betreff", document.getElementsByName("betreff")[0].value);
GM_setValue("text", document.getElementsByName("text")[0].value);
GM_setValue("azztime", document.getElementsByName("azztime")[0].value);
GM_setValue("was", document.getElementsByName("was")[0].value);
GM_setValue("vonr", document.getElementsByName("vonr")[0].value);
GM_setValue("vonr1", document.getElementsByName("vonr1")[0].value);
location.reload();
},false);


	if(!document.getElementById('spendendiv')){

		var spendendiv = document.createElement('span');
		spendendiv.setAttribute('id', 'spendendiv');
		spendendiv.setAttribute('align', 'middle');
		spendendiv.setAttribute('style', 'position:absolute; top:'+spenden_date[0]+'px; left:'+spenden_date[1]+'px; z-index:50; font-size:15px; cursor:move;');
		spendendiv.innerHTML = '<input type="button" name="los" id="los" value="sender aktivieren" ><br><div id="test1" </div><br>';
		document.body.appendChild(spendendiv);
	}else{
		spendendiv = document.getElementById('spendendiv');
		spendendiv.innerHTML = '<input type="button" name="los" id="los" value="sender aktivieren" ><br><div id="test1" </div><br>';	}
		spendendiv.style.color = 'green';


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
		spenden_date[1] = posx - dragx;//left
		spenden_date[0] = posy - dragy;//top
		dragspendenobjekt.style.left = spenden_date[1] + "px";
		dragspendenobjekt.style.top = spenden_date[0] + "px";
		document.getElementById("spendendiv").style.left = spenden_date[1] + "px";
		document.getElementById("spendendiv").style.top = spenden_date[0] + "px";
		GM_setValue("spendendaten1", spenden_date[1]);
		GM_setValue("spendendaten0", spenden_date[0]);
		document.getElementById("a_s_left").value = spenden_date[1];
		document.getElementById("a_s_top").value = spenden_date[0];	
	}
}


document.getElementById('los').addEventListener('click', function save_spenden () {
int_bewegung_spenden();

GM_xmlhttpRequest({
	method:"GET",
	url: ''+pgurl+'/fight/overview/',
   		onload:function(responseDetails) {
     			content = responseDetails.responseText;
     	 		ziea = content.split('Dein Ziel muss ')[1];
 	      		mins = ziea.split('bis ')[0];
      	  		ziec = content.split('bis ')[1];
        		maxs = ziec.split('Punkte haben.')[0];
        		mypoints = Math.round(mins*1.25)// original punkte von mir
			document.getElementById('test1').innerHTML = 'Bereite vor ....';
				start();
	}
});


var save;
function suchen(){
	save = 0;
	vonr++;
	GM_setValue("vonr",vonr);

if(vonr<=vonr1){
	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+pgurl+'/dev/api/user.'+vonr+'.xml',
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			try{
				var id = dom.getElementsByTagName('id')[0].textContent;
			}catch(e){
				id='0';
			}
			try{
				var band1 = dom.getElementsByTagName('name')[1].textContent;
			}catch(e){
				var band1 = '-';
			}
			try{
				var id1 = dom.getElementsByTagName('id')[1].textContent;
			}catch(e){
				id1='0';
			}
				var status = dom.getElementsByTagName('status')[0].textContent;

			try{
				var points1 = dom.getElementsByTagName('points')[0].textContent;
			}catch(e){
				var points1 = '-';
			}
			try{
				var name1 = dom.getElementsByTagName('name')[0].textContent;
			}catch(e){
				var name1 = '-';
			}

			try{
				var cash = dom.getElementsByTagName('cash')[0].textContent / 100;
				var promille = "<div style='overflow: hidden; width: 40px; height: 15px;'><img style='position: relative; top: -40px; left: -120px;' src='http://img.pennergame.de/cache/de_DE/signaturen/" + id + ".jpg'></div>";
			}catch(e){
				var cash = '-';
				var promille = '-';
			}

			if (cash <= 1000000){
				farbe1 = "black";}
			if (cash <= 900000){
				var farbe1 = "gray";}
			if (cash <= 800000){
				farbe1 = "blue";}
			if (cash <= 700000){
				var farbe1 = "cyan";}
			if (cash <= 600000){
				farbe1 = "red";}
			if (cash <= 500000){
				var farbe1 = "green";}
			if (cash <= 400000){
				farbe1 = "magenta";}
			if (cash <= 300000){
				farbe1 = "orange";}
			if (cash <= 200000){
				var farbe1 = "yellow";}
			if (cash <= 100000){
				var farbe1 = "white";}


			try{
				var platz = dom.getElementsByTagName('position')[0].textContent;
			}catch(e){
				var platz = '-';
			}
			try{
				var reg = dom.getElementsByTagName('reg_since')[0].textContent;
			}catch(e){
				var reg = '-';
			}

			var fight ='<a href="/fight/?to='+name+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
			var sms ='<a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';


			GM_xmlhttpRequest({
				method: 'GET',
				url: ''+pgurl+'/profil/id:' + id + '/',
				onload: function(responseDetails) {
					var content = responseDetails.responseText;
					try{
    						var hausi5 = content.split('margin-top:12px;">')[1];
    						var hausi3 = hausi5.split('</div>')[0];
    						var hausi4 = hausi3.split('<img src="')[1];
    						var hausi2 = hausi4.split('"')[0];

	if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/94826.jpg'){var petname = 'Elefant';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/25834.jpg'){var petname = 'Nashorn';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/14896.jpg'){var petname = 'Eisb&auml;r';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/12536.jpg'){var petname = '&Auml;ffchen';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/43703.jpg'){var petname = 'Tiger';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73953.jpg'){var petname = 'Krokodil';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/98962.jpg'){var petname  = "Giraffe";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/64220.jpg'){var petname  = "Nilpferd";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/90385.jpg'){var petname  = "Pferd";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/32563.jpg'){var petname  = "Chihuahua";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/62456.jpg'){var petname  = "Cockerspaniel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/15240.jpg'){var petname  = "Pitbull";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/09051.jpg'){var petname  = "Sch&auml;ferhund";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/48263.jpg'){var petname  = "Adler";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/12758.jpg'){var petname  = "Pudel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/62474.jpg'){var petname  = "Hausziege";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/61402.jpg'){var petname  = "Schlange";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/89386.jpg'){var petname  = "Falke";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73735.jpg'){var petname  = "Katze";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/21903.jpg'){var petname  = "Frettchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/77310.jpg'){var petname  = "Hase";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73684.jpg'){var petname  = "Ratte";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/31451.jpg'){var petname  = "Taube";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/52483.jpg'){var petname  = "Wellensittich";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73308.jpg'){var petname  = "Hamster";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/11836.jpg'){var petname  = "Maus";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/68930.jpg'){var petname  = "Goldfisch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/00001.jpg'){var petname  = "Kakerlake";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/48264.jpg'){var petname  = "Silberfisch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/75284.jpg'){var petname  = "Grasfrosch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/92653.jpg'){var petname  = "Rotkelchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/02634.jpg'){var petname  = "Clownfisch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/01743.jpg'){var petname  = "Erdm&auml;nnchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11542.jpg'){var petname  = "M&ouml;we";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/66294.jpg'){var petname  = "Opossum";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11634.jpg'){var petname  = "Streifenh&ouml;rnchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11743.jpg'){var petname  = "Igel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/47838.jpg'){var petname  = "Hausschwein";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/94652.jpg'){var petname  = "Schneeeule";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/65384.jpg'){var petname  = "Bisamratte";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/18540.jpg'){var petname  = "Moorschnucke";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/76538.jpg'){var petname  = "Yorkshire Terrier";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/64133.jpg'){var petname  = "Habicht";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/48256.jpg'){var petname  = "Collie";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/98641.jpg'){var petname  = "Dogge";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/28463.jpg'){var petname  = "Retriever";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/32563.jpg'){var petname  = "Mops";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/96242.jpg'){var petname  = "Elch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/85242.jpg'){var petname  = "Zebra";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/99624.jpg'){var petname  = "Kamel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/13323.jpg'){var petname  = "Riesenschildkr&ouml;te";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/83290.jpg'){var petname  = "Leopard";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/37551.jpg'){var petname  = "Waschb?r";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/73933.jpg'){var petname  = "Maus (Geld)";}

	var suche = content.search("selbsterstelltes Haustier");
	if (suche != -1) {
  		  var hausi55 = content.split('selbsterstelltes Haustier')[2];
  		  var hausi33 = hausi55.split('Haustier zu erstellen')[0];
   		  var hausi555 = hausi33.split('<b>')[1];
   		  var hausi33 = hausi555.split('</b>')[0];
		  var petname = '<a class="tooltip" href="/premium/"><font style=\"color:green; font-size:100%;\">[Premium]</font><span><b>selbsterstelltes Haustier</b><br>Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <font style=\"color:green; font-size:100%;\"><b>'+hausi33+'</b></font><br><br>Klicke hier um auch Dir ein eigenes Haustier zu erstellen</span></a>';
	}
}catch(e){
var petname = '--';
}

					try{
     						var location1 = content.split('Stadtteil</strong></td>')[1];
     						var location3 = location1.split('</td>')[0];
					}catch(e){
						var location3 = '<font style=\"color:green; font-size:100%;\"><b>premium</b></font>';
					}
					try{
						var geschlecht2 = content.split('http://static.pennergame.de/img/pv4/icons/')[1];
						var geschlecht  = geschlecht2.split('.jpg"')[0];
						var suche = content.search("male");
						if (suche != -1) {
							var geschlecht_image = '<div style="display:inline-block;"><img src="http://static.pennergame.de/img/pv4/icons/male.jpg" height="12" width="12"></img></div>&nbsp;&nbsp;';
						}
						var suche1 = content.search("female");
						if (suche1 != -1) {
							var geschlecht_image = '<div style="display:inline-block;"><img src="http://static.pennergame.de/img/pv4/icons/female.jpg" height="12" width="12"></img></div>&nbsp;&nbsp;';
						}
					} catch(err) {
						var suche1 = content.search("scht oder vom Spiel verbannt!");
						if (suche1 != -1) {
							var geschlecht_image = '<font style=\"color:green; font-size:100%;\">[X]</font>';
						}
					}
					var suche = content.search("Ist gerade Online");
					try{
						if (suche != -1) {
							on = '1';
							var online2a = "<img src='http://media.pennergame.de/img/on.gif'></img>";
						}else {
							on = '2';
							var online2a = "<img src='http://media.pennergame.de/img/off.gif'></img>";
						}
					}catch(e){
						on = '3';
						var online2a = '<font style=\"color:black; font-size:100%;\"><b>geloescht</b></font>';
					}


					var suche1 = content.search("scht oder vom Spiel verbannt!");
					if (suche1 != -1) {
						fabee = 'red';
					}else{
						fabee = '';
					}

					document.getElementById('test1').innerHTML = ''
					+'<br>Von id = '+vonr+''
					+'<br>Name :<a href="/profil/id:' + id + '/">' + name1 + '</a>'
					+'<br>Punkte :'+points1+''
					+'<br>Bande : <a href="/profil/bande:' + id1 + '/">' + band1 + '</a>'
					+'<br>Angreifen :<a href="/fight/?to=' + name1 + '"><img src="http://media.pennergame.de/img/att.gif" border="0"></img></a>'
					+'<br>Anschreiben :<a href="/messages/write/?to=' + id + '"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0"></img></a>'
					+'<br>Geld :' + cash +''
					+'<br>Promille : '+  promille +''
					+'<br>Gesendete Nachrichten : '+gesend+''
					+'<br>Tagesz&auml;hler : '+gesend1+''
					+'<br>Onlinestatus : '+online2a+''
					+'<br>Mann/Frau : '+geschlecht_image+''
					+'<br>Stadt : '+location3+''
					+'<br>Tier : '+petname+'';



was = GM_getValue("was");
// online
if(was==1){
	if(points1<=Number(maxs) && points1>=Number(mins)) {
		if(on == 1){
		losgehtes()
		}
	}
}
// geld
if(was==2){
	losgehtes()
}

// tiere
if(was==3){
	losgehtes()
}
// Bandewe
if(was==4){
	if(points1<=Number(maxs) && points1>=Number(mins)) {
		if(status ==0){
			losgehtes()
		}
	}
}
// sonstiges
if(was==5){
	losgehtes()
}
// punkte
if(was==6){
	if(points1<=Number(maxs) && points1>=Number(mins)) {
		losgehtes()
	}
}




function losgehtes(){						
gesend1++;
					document.getElementById('test2').innerHTML +='<table class="list" border="1" width="960"><tbody>'
					+'<tr bgcolor="'+fabee+'">'
					+'<th scope="col" align="center" width="10">'+vonr+'</th>'
					+'<th scope="col" align="center" width="100">'+platz+'</th>'
					+'<th scope="col" align="center" width="200"><a href="/profil/id:' + id + '/">' + name1 + '</a></th>'
					+'<th scope="col" align="center" width="200">'+band1+'</th>'
					+'<th scope="col" align="center" width="100">'+points1+'</th>'
					+'<th scope="col" align="center" width="100">'+location3+'</th>'
					+'<th scope="col" align="center" width="100">'+reg+'</th>'
					+'<th scope="col" align="center" width="100"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+' &euro;</font></th>'
					+'<th scope="col" align="center" width="10">'+promille+'</th>'
					+'<th scope="col" align="center" width="10">'+online2a+'</th>'
					+'<th scope="col" align="center" width="10">'+geschlecht_image+'</th>'
					+'<th scope="col" align="center" width="10">'+fight+'</th>'
					+'<th scope="col" align="center" width="10">'+sms+'</th>'
					+'</tr>';
							senden(pgurl, vonr)

					}
				}});
		}});
}
}

function start(){
	var abcd = GM_getValue("azztime");
	window.setInterval(suchen, abcd);
}


function senden(pgurl, vonr){
	gesend++;
	GM_setValue("gesend",gesend);		 		
	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+pgurl+'/messages/write/send/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_toname=id:'+vonr+'&f_subject='+betreff+'&f_text='+text+'&f_did=&submit=Nachricht+verschicken'),
		onload: function(responseDetails){}
	});      
}	
},false);

