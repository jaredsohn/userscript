// ==UserScript==
// @name          Travian
// @namespace     travian
// @description   Embrace The power 
// @include http://travian.com.hr/*
// @include http://*.travian.com.hr/*
// @exclude http://forum.travian.*
// @exclude http://*.travian.*/index.php*
// @exclude http://*.travian.*/anleitung.php*
// @exclude http://*.travian.*/login.php*
// @exclude http://*.travian.*/chat/*
// @exclude http://*.travian.*/impressum.php*
// @exclude http://*.travian.*/karte2.php*
// ==/UserScript==

///////////// SETTINGS ////////////////
var defaultAttType = 3;              // napadi: 2=pojacanje, 3=normal, 4=pljacka
var mapStep        = 3;              // nombre de case dont la carte se decale a chauqe fois
var disablePlusBtn = true;          // retire le bouton plus dans la barre en haut
var disablePluspub = true;          // retire la pub sur le cote
var forumURL;     //  = "http://forum.travian.com.hr/index.php";
var travissimoimg;  //= 'http://ulzbug2.free.fr/img/'; // url pour les images supplementaires
var pos_notes      = "20px";		// position de la case notes
var temps          = 10;		// temps avant lequel les chiffres passent en rouge ( en heures )
var bouton_coche_tout = true;			//mettre false si vous avez deja cette fonctionnalite avec travian plus.
var skin = false;		//mettre l'url du skin s'il y a, sinon false

var notes_right = false; // move notes to the right, assuming you have space there

///////////////////////////////////////

function t_format2(s) {
	if (s > -1)  {
		stunden = Math.floor(s/3600);
		minuten = Math.floor(s/60) % 60;
		sekunden = s % 60;
		t = stunden + ":";
		if (minuten < 10) {
			t += "0";
		}
		t += minuten + ":";
		if (sekunden < 10){
			t += "0";
		}
		t += sekunden;
	} else {
		t = "0:00:0?";
	}
	return t;
}

function t_format1(myElement) {
	p = myElement.innerHTML.split(":");
	stunden = p[0];
	minuten =  p[1];
	sekunden = p[2];
	sek = stunden * 3600 + minuten * 60 + sekunden * 1;
	return sek;
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

var server = window.location.href.match(/(\w+).travian/)[1];
var travissimo_vars = new Array('liens', 'calculPC','Notes','haute_resolution','coche_tout','temps_ressources','Lien_village','rapport','daljina');

if (!skin)	skin='http://'+server+'.travian.com.hr/';

var cout = [
	[	[   120,   100,   180,    40],
		[   100,   130,   160,    70],
		[   150,   160,   210,    80],
		[   140,   160,    20,    40],
		[   550,   440,   320,   100],
		[   550,   640,   800,   180],
		[   900,   360,   500,    70],
		[   950,  1350,   600,    90],
		[ 30750, 27200, 45000, 37500],
		[  5800,  5300,  7200,  5500] ],
	[	[   100,   130,    55,    30],
		[   140,   150,   185,    60],
		[   170,   150,    20,    40],
		[   350,   450,   230,    60],
		[   360,   330,   280,   120],
		[   500,   620,   675,   170],
		[   950,   555,   330,    75],
		[   960,  1450,   630,    90],
		[ 30750, 45400, 31000, 37500],
		[  5500,  7000,  5300,  4900]],
	[	[    95,    75,    40,    40],
		[   145,    70,    85,    40],
		[   130,   120,   170,    70],
		[   160,   100,    50,    50],
		[   370,   270,   290,    75],
		[   450,   515,   480,    80],
		[  1000,   300,   350,    70],
		[   900,  1200,   600,    60],
		[ 35500, 26600, 25000, 27200],
		[  7200,  5500,  5800,  6500]]
	];

var Transport = [
	[ 40, 20, 50,  0, 100, 70, 0, 0, 0, 1600],
	[ 30, 45,  0, 75,  35, 65, 0, 0, 0, 1600],
	[ 60, 40, 50,  0, 110, 80, 0, 0, 0, 1600]
];

function elem(tag,content) {
	var ret = document.createElement(tag);
	ret.innerHTML = content;
	return ret;
}

function div(content) {
	return elem("div", content);
}

function get(id) {
	return document.getElementById(id);
}

function find(xpath,xpres) {
  var ret = document.evaluate(xpath,document,null,xpres,null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE,
    XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

function trim(s) {
	return s.replace(/^\s*(.*?)\s*$/,'$1');
}

function pad2(n) {
	return n<10 ? "0"+n : n;
}

function addBookmark(pr) {
	var bmtitle = prompt("Titl linka");
	if (pr)
		var loc =  prompt("Adresa linka?");
	else
		var loc = window.location.href
	if (bmtitle != null) {
		GM_setValue("bookmarks",
		  GM_getValue("bookmarks","") + "|<>|" + bmtitle + "@@@" + loc);
		window.location.reload( false );
	}
}

function removeBookmark(bookmark) {
	if (confirm("Obrisi " + bookmark + "?"))
		GM_setValue("bookmarks",
		  GM_getValue("bookmarks","") . replace(bookmark,""));
	window.location.reload( false );
}

// edit menu for bookmarks

var bmadd = elem("a","Dodaj u linkove");
bmadd.addEventListener("click", function() { addBookmark(false); }, 0);
var opts = elem("a","Opcije");
opts.href = "./spieler.php?s=5";
var hr = document.createElement("hr");
hr.size=1;
hr.color="ORANGE";
hr.style.marginLeft = "10px";

var menu = find("//td[@class='menu']",XPFirst);
if (menu) {
	menu.style.display = "none"; // tegen knipperen (?)
	menu.appendChild(hr);
	menu.appendChild(bmadd);
	menu.appendChild(opts);
	menu.appendChild(hr.cloneNode(false));
	var rmbm = "<span style='position:absolute;left:0px;font:0.75em;padding-left:1px;cursor:crosshair'>x&nbsp;</span>";
	var bmarks = GM_getValue("bookmarks","").split("|<>|");
	for (var bm in bmarks) {
		bm = bmarks[bm];
		if (trim(bm)=="")
			continue;
		var bmdata = bm.split("@@@");
		var link = elem("a",rmbm + "<span>" + bmdata[0] + "</span>");
		link.style.paddingTop = 0;
		link.style.paddingBottom = 1;
		link.setAttribute('bm',bm);
		link.href = bmdata[1];
		link.firstChild.addEventListener("click", function(e) { removeBookmark(e.target.parentNode.getAttribute('bm')); return false; }, 0);
		ct = elem('span','');
		ct.style.position = 'relative';
		ct.appendChild(link);
		menu.appendChild(ct);
	}
	menu.style.display = "table-cell";
} // if menu

// timer
function timerStart(id) {
	var tmr = get(id);
	if (!tmr)
		return;
	tmr.start = new Date().getTime();
	tmr.sec   = t_format1(tmr);
	timerUpdate(tmr);
}

function timerUpdate(tmr) {
	var sec = tmr.sec - Math.floor((new Date().getTime() - tmr.start) / 1000);
	if (sec < 0 && tmr.onzero)
		tmr.onzero();
	else {
		tmr.innerHTML = t_format2(sec);
		setTimeout(function() { timerUpdate(tmr); }, 500);
	}
}

function autre() {
	// aType d'attaque
	if (window.location.href.match(/a2b\.php/)) {
		find("//input[@value='" + defaultAttType + "']", XPFirst).checked = true;
	}

}

function modifieRapport(){
	// rapports :
	if (window.location.href.match(/berichte\.php/)) {
		try {
			var restr = find("//tr[@class='cbg1']/td[@class='s7']",XPFirst);
			var restr = restr.parentNode;
			var rescell = restr.getElementsByTagName("td")[1];
			var rescell2 = restr.getElementsByTagName("td")[0];
			var raj = 0;
			var x = document.getElementsByTagName("td");
			var attack = x[5 + raj].textContent, troops_kind = x[13 + raj].innerHTML;
			if (attack.indexOf("attaque") == -1){
				raj = 3;
				var attack = x[5 + raj].textContent;
				var troops_kind = x[13 + raj].innerHTML;
			}
			var res = trim(rescell.textContent).split(" ");
			var total = parseInt(res[0]) + parseInt(res[1]) + parseInt(res[2]) + parseInt(res[3]);
		} catch(e) {
			rescell = null;
		}

		if (rescell && (attack.indexOf("attaque") != -1)) {
			if (troops_kind.indexOf("gionnaire") != -1){
				var peuple = 0;
			}
			if (troops_kind.indexOf("gourdin") != -1){
				var peuple = 2;
			}
			if (troops_kind.indexOf("Phalange") != -1){
				var peuple = 1;
			}
			var total_carry = 0; // total_carry = sum (troops-losses * carry of troop type)
			var pertes_res = [ 0, 0, 0, 0];
			for (var i = 0; i < 10; ++i){
				total_carry += (parseInt(x[24 + i + raj].textContent) - parseInt(x[35 + i + raj].textContent)) * Transport[peuple][i];
				for (var j = 0; j < 4; ++j)
					pertes_res[j]+=cout[peuple][i][j]*parseInt(x[35+i+raj].textContent);
			}
			var pertes=pertes_res[0]+pertes_res[1]+pertes_res[2]+pertes_res[3];
			var affichage=total + "/" + total_carry + " [" + Math.round(total / total_carry * 1000) / 10 +
				"%]<br /><img src='" + skin + "img/un/r/1.gif' border='0' height='12' width='18'>"+
				pertes_res[0] + '<img src="' + skin + 'img/un/r/2.gif" border="0" height="12" width="18">'+
				pertes_res[1] + '<img src="' + skin + 'img/un/r/3.gif" border="0" height="12" width="18">'+
				pertes_res[2] + '<img src="' + skin + 'img/un/r/4.gif" border="0" height="12" width="18">'+
				pertes_res[3] + ' ('+pertes+')<br />';
			if (total > pertes)
				affichage+="Gain de ";
			else
				affichage+="Pertes de ";
			affichage += "<img src='" + skin + "img/un/r/1.gif' border='0' height='12' width='18'>" +
				(parseInt(res[0]) -pertes_res[0]) + '<img src="' + skin +
				'img/un/r/2.gif" border="0" height="12" width="18">'+
				(parseInt(res[1])-pertes_res[1])+'<img src="'+skin+
				'img/un/r/3.gif" border="0" height="12" width="18">'+
				(parseInt(res[2])-pertes_res[2])+'<img src="'+skin+
				'img/un/r/4.gif" border="0" height="12" width="18">'+
				(parseInt(res[3])-pertes_res[3]);
			if (total_carry != 0){
				rescell.appendChild(div(affichage));
				rescell2.innerHTML='Butin<br />Butin total<br />Pertes<br />Pertes totales';
			}

			//Pertes defenseur
			var pertes = find("//tr[@class='cbg1']/td[@class='c1 b']",XPFirst).parentNode.parentNode;
			var x = pertes.getElementsByTagName("tr")[3].getElementsByTagName("td");
			var pertesR = [0,0,0,0];
			for (var i = 1; i < 11; ++i){
				for (var j = 0; j < 4; ++j)
					pertesR[j] += cout[peuple][i-1][j] * parseInt(x[i].textContent);
			}

			var td1=elem('td','Pertes');
			var td2=elem('td',"<img src='"+skin+"img/un/r/1.gif' border='0' height='12' width='18'>"+
				pertesR[0]+'<img src="'+skin+'img/un/r/2.gif" border="0" height="12" width="18">'+
				pertesR[1]+'<img src="'+skin+'img/un/r/3.gif" border="0" height="12" width="18">'+
				pertesR[2]+'<img src="'+skin+'img/un/r/4.gif" border="0" height="12" width="18">'+pertesR[3]);
			td2.setAttribute('colspan', '10');
			td2.setAttribute('class', 's7');
			var tr1=elem('tr','');
			tr1.appendChild(td1);
			tr1.appendChild(td2);
			pertes.appendChild(tr1);
		}
		else
			if (!isNaN(total))
				rescell.appendChild(div("Total : " + total));
	}
}

function ressources(){
	var rtd = [], prod = [], store = [], storeMax = [], secFull = [];
	var capacite=0;
	if (window.location.pathname == '/dorf2\.php'){
		var capa_cachette=[0,100,130,170,220,280,360,460,600,770,1000];
		var bats = find("//map[@name='map1']",XPFirst);
		bat=bats.getElementsByTagName("area");

		for (var j = 0; j < bat.length; ++j) {
			if (bat[j].title.indexOf('Cachette')>=0){
				capacite += capa_cachette[parseInt(bat[j].title.replace(/[a-zA-z ]+/,''))];
			}
		}
		if (bats.innerHTML.indexOf('Palissade') >= 0)
			capacite = capacite*2;
	}
	for (var i = 0; i < 4; ++i) {
		rtd[i] = get("l"+(i+1));
		if (!rtd[i])
			break;
		prod[i] = parseInt(rtd[i].title);
		store[i] = parseInt(rtd[i].textContent.match(/(\d+)\//));
		storeMax[i] = parseInt(rtd[i].textContent.replace(/(\d+)\//,""));
		if (prod[i] > 0) {
			secFull[i] = (3600*(storeMax[i]-store[i])/prod[i]);
			var fullStr = t_format2(Math.ceil(Math.max(0,secFull[i]))).slice(0,-3);
			if (store[i]==storeMax[i])
				fullStr = "<b>" + fullStr + "</b>";
		}else if(prod[i]==0){ 
            secFull[i]= -1;
            fullstr="infini";
        }else {
			secFull[i] = 3600*store[i]/(-prod[i]);
			var fullStr = t_format2(Math.ceil(Math.max(0,secFull[i]))).slice(0,-3);
		}
		if ( temps*3600 >= secFull[i] && secFull[i]!=-1)
			fullStr = "<font color='red'>" + fullStr + "</font>";
		if (store[i]>capacite && capacite>0)
			fullStr = "<i>" + fullStr + "</i>";
		var insCell = rtd[i].previousSibling.previousSibling;
		insCell.style.position = "relative";
		insCell.appendChild(elem("span","<span style='font-size:8pt;position: absolute;top:13px;'>(" +
			(prod[i]<0?"":"+") + prod[i] + "," + fullStr +  ")</span>" ));
	}
	// build
	if (window.location.href.match(/build\.php/)) {
		// for each resource listing...
		var tbls = find("//table[@class='f10']",XPList);
		for (var j = 0; j < tbls.snapshotLength; ++j) {
			var tbl = tbls.snapshotItem(j);
			var cell = tbl.rows[0].firstChild;
			var cost = cell.textContent.split("|").splice(0,4);
			var hrs2go = 0;
			var lack = [];
			var hrs = [];
			if (cost.length != 4)
				continue; // not a resource cost table
			for (var i = 0; i < 4; ++i) {
				cost[i]  = parseInt(cost[i]);
				lack[i] = cost[i]-store[i];
				hrs[i] = lack[i] / Math.max(1e-8, prod[i]);
				if (hrs2go < hrs[i]) {
					needed = i;
					hrs2go = hrs[i];
				}
			}
			if (hrs2go != 0) {
				var dateBuild = new Date(new Date().getTime()+hrs2go*3600000);
				var timeBuild = pad2(dateBuild.getHours()) + ":" + pad2(dateBuild.getMinutes());
				var hrs2go = t_format2(Math.ceil(hrs2go*3600));
				var id = "timer" + j;
				var cell_html = '<table style="margin:5px 0px 3px 0px" cellspacing="1" cellpadding="2" class="tbg">'+
					'<tr class="rbg"><td colspan="3">Resources n\u00E9c\u00E9ssaires</td></tr>'+
					'<tr><tr class="cbg1"><td>&nbsp;</td><td>Quantit&eacute; requise</td><td>Temps requis</td></tr><tr>';
				for (var i = 0; i < 4; ++i)
					if (hrs[i]>0)
						cell_html += '<tr' +(i == needed?" style='font-weight:bold":"")+
							'><td><img src="'+skin+'img/un/r/'+(i+1)+'.gif"></td><td>'+
							lack[i]+'</td><td>'+(hrs[i]<10000?t_format2(Math.ceil(hrs[i]*3600)):'infini')+'</td></tr>';
						cell_html += "</table>";
						cell.appendChild(div(cell_html));
			}
		}
	}
}

// main overview
function saveNotes() {
	GM_setValue(server+"_notes",get('note').value);
	get('bn').value = "Notes sauv\u00E9es!";
	return false;
}

function afficheNotes(){
	var noteHTML = div("<b>Notes:</b><textarea class='fm' style='width:100%;height:110px;' id='note'></te"+"xtarea><br><input type=button id='bn' value='Sauvegarder les notes' class=fm style='width:100%;height:25px;margin-top:-3px;background:#eee;'>");
	function addNoteHandler() {
		get('bn').addEventListener("click",function(){ saveNotes(); }, true);
	}
	if (window.location.href.match(/dorf1\.php/) || notes_right) {
		if (notes_right) {
			noteHTML = div("<b>Notes:</b><br /><textarea class='fm' style='width:100%;padding: .5ex;margin: 0;height:480px;' id='note'></textarea><br /><input type=button id='bn' value='Sauvegarder les notes' class=fm style='width:100%;height:2.5em;margin:0;background:#eee;' />");
			noteHTML.style.margin = "0 0 0 20em";
			noteHTML.style.position = "absolute";
			noteHTML.style.right = "1em";
			noteHTML.style.top = "100px";
			noteHTML.style.left = "680px";
		} else {
			noteHTML.style.margin = "0px 20px";
			if (travissimo_set[3]){
				noteHTML.style.bottom = pos_notes;
				noteHTML.style.width= "90%";
				noteHTML.style.position= "absolute";
			}
		}
		document.body.appendChild(noteHTML);
		addNoteHandler();
		get('note').value = GM_getValue(server+"_notes","");
	}
	if (window.location.href.match(/karte?\.php/) && mapStep != 1) {
		var westLink = find("//area[@title='Ouest']",XPFirst);
		if (westLink) { // map view
			var loc = 1 + parseInt(westLink.href.match(/z=(\d+)/)[1]);
			var ts = ['Ouest','Est','Nord','Sud'];
			var fac = [-1,1,-512,512];
			for (var i = 0; i < 4; ++i) {
				var link = find("//area[@title='" + ts[i] + "']" ,XPFirst);
				link.href = link.href.replace(/z=(\d+)/,'z='+(loc+fac[i]*mapStep));
			}
		} else { // province view
			var loc = window.location.href.match(/d=(\d+)/)[1];
			find("//div/font/table[@class='f10']",XPFirst).parentNode.appendChild(noteHTML);
			addNoteHandler();
			get('note').value = GM_getValue(loc+"_notes","");
		}
	}
}

function coche(){
	for (var i = 1; i <= 10; i++){
		document.getElementsByName('n'+i)[0].checked = document.getElementsByName('coche_tout')[0].checked;
	}
}

function cocher_messages(){
	if (window.location.pathname=='/berichte.php'
		&& window.location.search.indexOf('id') == -1
		|| window.location.href.match(/nachrichten\.php/)){

		var bouton = find("//tr[@class='rbg']",XPList);
		if (window.location.href.match(/nachrichten\.php/) && bouton.snapshotItem(1).getElementsByTagName("td")[1].innerHTML=='Sujet')
			var raj = 1;
		else
			if (window.location.pathname=='/berichte.php'
				&& bouton.snapshotItem(1).getElementsByTagName("td")[0].innerHTML=='SUjet :')
				var raj = 1;
			else
				var raj = 0;
		bouton.snapshotItem(1 + raj).getElementsByTagName("td")[0].innerHTML =
			'<input type="checkbox" name="coche_tout" id="coche" />'+bouton.snapshotItem(1+raj).getElementsByTagName("td")[0].innerHTML;
		get('coche').addEventListener("click",function(){ coche(); }, 0);
		if (window.location.pathname=='/berichte.php')
			bouton.snapshotItem(0+raj).getElementsByTagName("td")[0].innerHTML='Sujet :';
	}
}

function tool_distance(){
	if (window.location.pathname=='/karte\.php' && window.location.search.indexOf('d')==-1){
		var disthtml=div('<table><tr><td>X </td><td> <input type="text" name="x1" value="" size="3" /></td>'+
		'<td></td><td>Y </td><td> <input type="text" name="y1" value="" size="3" /></td></tr>'+
		'<tr><td>X </td><td> <input type="text" name="x2" value="" size="3" /></td><td></td>'+
		'<td>Y </td><td> <input type="text" name="y2" value="" size="3" /></td></tr></table>'+
		'<select name="units">'+
			'<option value="6">L&eacute;gionnaire</option>'+
			'<option value="5">Pr&eacute;torien</option>'+
			'<option value="7">Imperian</option>'+
			'<option value="16">Equites Legati</option>'+
			'<option value="14">Equites Imperatoris</option>'+
			'<option value="10">Equites Caesaris</option>'+
			'<option value="4">B&eacute;lier</option>'+
			'<option value="3">Catapulte &agrave; feu</option>'+
			'<option value="4">S&eacute;nateur</option>'+
			'<option value="5">Colon</option>'+

			'<option value="7">Combattant au gourdin</option>'+
			'<option value="7">Combattant &agrave; la lance</option>'+
			'<option value="6">Combattant &agrave; la hache</option>'+
			'<option value="9">Eclaireur</option>'+
			'<option value="10">Paladin</option>'+
			'<option value="9">Cavalier Teuton</option>'+
			'<option value="4">B&eacute;lier</option>'+
			'<option value="3">Catapulte</option>'+
			'<option value="4">Chef de tribu</option>'+
			'<option value="5">Colon</option>'+

			'<option value="7">Phalange</option>'+
			'<option value="6">Combattant &agrave; l\'&eacute;p&eacute;e</option>'+
			'<option value="17">Avant-garde</option>'+
			'<option value="19">Eclair de Toutatis</option>'+
			'<option value="16">Cavalier druide</option>'+
			'<option value="13">H&eacute;douin</option>'+
			'<option value="4">B&eacute;lier</option>'+
			'<option value="3">Trebuchet</option>'+
			'<option value="5">Chef</option>'+
			'<option value="5">Colon</option>'+

			'<option value="24">Marchand gaulois</option>'+
			'<option value="16">Marchand romain</option>'+
			'<option value="12">Marchand germain</option>'+
		'</select><br />'+
		'Heure d\'arriv&eacute;e : '+
			'<input type="text" name="heures" size="2" value="0" />h:'+
			'<input type="text" name="minutes" size="2" value="0" />m:'+
			'<input type="text" name="secondes" size="2" value="0" />s'+
		'<br /><br /><input type="button" id="bouton" value="Calculer" onclick="calcul()" />'+
		'<br />'+
		'<table><tr><td>Distance : </td><td><div id="distance"></div></td></tr>'+
		'<tr><td>Temps : </td><td><div id="temps"></div></td></tr>'+
		'<tr><td>Heure de d&eacute;part : </td><td><div id="depart"></div></td></tr>');

		disthtml.style.margin = "0px 20px";
		if (travissimo_set[3]){
			disthtml.style.bottom = pos_notes;
			disthtml.style.width= "350px";
			disthtml.style.position= "absolute";
			disthtml.style.left= "300px";
			disthtml.style.bottom= "30px";
		}
		document.body.appendChild(disthtml);
		get("bouton").addEventListener("click",function(){ calcul_distances(); }, 0);
	}
}

function calcul_distances() {
	var vitesse=document.getElementsByName("units")[0].value;
	var distance=
		Math.sqrt(Math.pow(document.getElementsByName("x1")[0].value-document.getElementsByName("x2")[0].value,2)+
		Math.pow(document.getElementsByName("y1")[0].value-document.getElementsByName("y2")[0].value,2));
	var temps = distance/vitesse*3600;
	var j = Math.floor(temps/(24*3600));
	var h = Math.floor(temps/3600)%24;
	var m = Math.floor(temps/60)%60;
	var s = Math.floor(temps-3600*h-60*m-24*3600*j);
	var hd = document.getElementsByName("heures")[0].value - h;
	if (hd < 0)
		hd = hd + 24;
	var md = document.getElementsByName("minutes")[0].value-m;
	if (md < 0){
		md = md + 60;
		hd = hd - 1;
	}
	var sd = document.getElementsByName("secondes")[0].value-s;
	if (sd < 0){
		sd = sd + 60;
		md = md - 1;
		if (md < 0)
			hd = hd - 1;
	}
	if (hd<0)
		hd = hd + 24;
	get('distance').innerHTML = Math.round(distance, 1) + ' cases';
	get('temps').innerHTML = j + 'jours, ' + h + 'h:' + m + 'm:' + s+'s';
	get('depart').innerHTML = hd + 'h:' + md +'m:' + sd +'s';
}

function Distance_CapTus(){
	if (window.location.pathname=='/karte\.php' && window.location.search.indexOf('d')>=0) {
		// Recherche des coordonnýes du village ...
		var test = find("//body",XPList);
		var test = test.snapshotItem(0);
		var coordo = test.innerHTML.match(/<h1>([^\n]+) \(([\d\x2D]+)\|([\d\x2D]+)\)<\/h1>/);
		var x2 = coordo[2];
		var y2 = coordo[3];
		// Fin de recherche des coordonnýes
		// Recherche des coordonnýes du village de l'utilisateur
		var test2 = find("//table[@class='f10']",XPList);
		for ( var j = 0; j < test2.snapshotLength; ++j){
			var test23 = test2.snapshotItem(j);
			if (test23.innerHTML.match(/<li class[^\n]+<\/li>/)){
				var toutTR = test23.getElementsByTagName("tr");
				for ( var i = 0; i < toutTR.length; ++i)
					if (toutTR[i].innerHTML.match(/<li class[^\n]+<\/li>/)){
						var x1 = toutTR[i].innerHTML.match(/\(([\d\x2D]+)<\/td>/);
						var y1 = toutTR[i].innerHTML.match(/([\d\x2D]+)\)<a/);
					}
			}
		}
		
		var x1 = x1[1];
		var y1 = y1[1];
		// Fin de recherche des coordonnýes

		if (coordo[1] != 'Plaine dýlaissýe'){
			var vitesse=6;
			var distance=
				Math.sqrt(Math.pow(x1-x2,2)+
				Math.pow(y1-y2,2));
			var temps = distance/vitesse*3600;
			var j = Math.floor(temps/(24*3600));
			var h = Math.floor(temps/3600)%24;
			var m = Math.floor(temps/60)%60;
			var s = Math.floor(temps-3600*h-60*m-24*3600*j);
			test.innerHTML = test.innerHTML.replace(/<\/h1>/,'</h1><form name="form"><div style="font-size:8pt;position:absolute; width:450px; height:110px; border: 0px solid #000000; left:155px; top:165px"><b>Unitý la plus lente :</b><SELECT style="border:#FFFFFF solid;border-width: 1px;font-size:8pt;" name="units" onChange="var distance='+distance+';var vitesse=this.value;var temps = distance/vitesse*3600;var j = Math.floor(temps/(24*3600));var h = Math.floor(temps/3600)%24;var m = Math.floor(temps/60)%60;var s = Math.floor(temps-3600*h-60*m-24*3600*j);document.form.Temps.value=j+\' jours,\'+h+\'h:\'+m+\'m\'+s+\'s\';"><option value="6">L&eacute;gionnaire</option><option value="5">Pr&eacute;torien</option><option value="7">Imperian</option><option value="16">Equites Legati</option><option value="14">Equites Imperatoris</option><option value="10">Equites Caesaris</option><option value="4">B&eacute;lier</option><option value="3">Catapulte &agrave; feu</option><option value="4">S&eacute;nateur</option><option value="5">Colon</option><option value="7">Combattant au gourdin</option><option value="7">Combattant &agrave; la lance</option><option value="6">Combattant &agrave; la hache</option><option value="9">Eclaireur</option><option value="10">Paladin</option><option value="9">Cavalier Teuton</option><option value="4">B&eacute;lier</option><option value="3">Catapulte</option><option value="4">Chef de tribu</option><option value="5">Colon</option><option value="7">Phalange</option><option value="6">Combattant &agrave; l\'&eacute;p&eacute;e</option><option value="17">Avant-garde</option><option value="19">Eclair de Toutatis</option><option value="16">Cavalier druide</option><option value="13">H&eacute;douin</option><option value="4">B&eacute;lier</option><option value="3">Trebuchet</option><option value="5">Chef</option><option value="5">Colon</option><option value="24">Marchand gaulois</option><option value="16">Marchand romain</option><option value="12">Marchand germain</option></SELECT><br/><b>Temps pour aller ý ' + coordo[1] + ':</b><input type="text" size="30" style="border:#FFFFFF solid;border-width: 1px;font-size:8pt;" name="Temps" value="'+ j + 'jours, ' + h + 'h:' + m + 'm:' + s+'s"></div></form>');
		}else{
			var vitesse=5;
			var distance=
				Math.sqrt(Math.pow(x1-x2,2)+
				Math.pow(y1-y2,2));
			var temps = distance/vitesse*3600;
			var j = Math.floor(temps/(24*3600));
			var h = Math.floor(temps/3600)%24;
			var m = Math.floor(temps/60)%60;
			var s = Math.floor(temps-3600*h-60*m-24*3600*j);
			test.innerHTML = test.innerHTML.replace(/<\/h1>/,'</h1><div style="position:absolute; width:400px; height:110px; border: 0px solid #000000; left:155px; top:165px"><b>Temps pour coloniser ce village :</b> '+ j + 'jours, ' + h + 'h:' + m + 'm:' + s+'s</div>');
		}
	}
}

function profilVillages(){
	if (window.location.pathname == '/dorf2\.php'){
		var nomvil = find("//td[@class='s3']",XPFirst);
		nomvil = nomvil.getElementsByTagName("div")[0];
		nomvil.innerHTML='<a href="./spieler.php?s=1">'+nomvil.innerHTML+'</a>';
	} else
		if (window.location.pathname == '/dorf1\.php'){
			var nomvil = find("//td[@class='s3']",XPFirst);
			nomvil=nomvil.getElementsByTagName("h1")[0];
			nomvil.innerHTML='<a href="./spieler.php?s=1">'+nomvil.innerHTML+'</a>';
		}
}

// travissimo functions, based on the travissimo script
function travissimo_igmlinks() { // add message and attack links
	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++){
		var igmlink = null;
		if (links[i].href.search(/karte.php\?d=(\d+$)/)>0){
			igmlink = elem('a','<img src="'+travissimoimg+
				'att_all.gif" style="margin:3px 0px 1px 3px; display: inline" height="10" width="10"'+
				'title="Envoyer des troupes" alt="Envoyer des troupes" border="0" />');
			igmlink.href = 'a2b.php?z='+RegExp.$1;
		}
		if (igmlink) {
			if (links[i].hasAttribute('bm')) { // bookmark links
				igmlink.style.position = 'absolute';
				igmlink.style.backgroundImage = 'none !important';
				igmlink.style.cursor = 'crosshair';
				igmlink.style.padding = "0px";
				var c = links[i].childNodes[1];
				igmlink.style.left = links[i].childNodes[1].offsetWidth + 12;
				igmlink.style.top = -1;
				links[i].parentNodeappendChild
			}
			links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
		}
	}
	var coordx=[]
	var coordy=[]
	var coord=[];
	var xlist = find("//table[@class='f8']",XPList);
	for (var j = 0; j < xlist.snapshotLength; ++j) {
		coordx[j] = parseInt(xlist.snapshotItem(j).getElementsByTagName("td")[0].innerHTML.slice(1));
		coordy[j] = parseInt(xlist.snapshotItem(j).getElementsByTagName("td")[2].innerHTML);
		coord[j] = 512*(-coordy[j] + 256) + 256 + coordx[j] + 1;
		xlist.snapshotItem(j).getElementsByTagName("td")[2].innerHTML=xlist.snapshotItem(j).getElementsByTagName("td")[2].innerHTML+
			'<a href="./build.php?ze='+coord[j]+'&gid=17"><img src="'+travissimoimg+
			'commerce.png" style="margin:0px 0px 0px 0px; display: inline" height="10" width="10" border="0" alt="Envoyer un commer&ccedil;ant" /></a>'+
			'<a href="./a2b.php?z='+coord[j]+'"><img src="'+travissimoimg+
			'att_all.gif" style="margin:0px 0px 0px 0px; display: inline" height="10" width="10" title="Envoyer des troupes" alt="Att" border="0"/></a>';
		xlist.snapshotItem(j).getElementsByTagName("td")[2].width=55;
	}
}


function travissimo_navigationbar(){
	var n = find("//div[@class='div2']",XPFirst); // works better than divs[4]
	n.style.textAlign = 'left';
	n.style.paddingLeft = 70;
	n.style.width = 800;
	var p = find("//div[@class='plus']",XPFirst);
	if (disablePlusBtn)
		p.style.display = 'none';
	else 
		p.style.left = 850;
	var rs = find("//table[@class='tbg']",XPList);
	for (var j = 0; j < rs.snapshotLength; ++j) {
		var r = rs.snapshotItem(j);
		if (r.style.width=='140px' && disablePluspub)
			r.style.visibility = 'hidden';
	}
	var se = find("//div[@class='div3']",XPFirst);
	se.innerHTML=se.innerHTML.replace('dans','en');

	/* Markettplace */
	var marktmap = elem('map','<area shape=rect coords="0, 0, 70, 50"  href="build.php?gid=17"     title="March&eacute; : Envoyer">' +
				'<area shape=rect coords="0, 50, 35, 100"  href="build.php?gid=17&t=1" title="March&eacute; : Acheter">'  +
				'<area shape=rect coords="35, 50, 70, 100" href="build.php?gid=17&t=2" title="March&eacute; : Vendre">' );
	marktmap.name = 'markt';

	var marktimg = document.createElement('img');
	marktimg.src = travissimoimg+'markt.png';
	marktimg.width = 70;
	marktimg.height = 100;
	marktimg.border = 0;
	marktimg.setAttribute('usemap', '#markt');
	marktimg.style.marginLeft = 50;
	n.appendChild(marktmap);
	n.appendChild(marktimg);

	/* Military  */
	var milimap =  elem('map','<area shape=rect coords="0, 0, 35, 50"  href="build.php?gid=16"  title="Place de rassemblement">' +
				'<area shape=rect coords="35, 0, 70, 50"   href="build.php?gid=19"  title="Caserne">'    +
				'<area shape=rect coords="0, 50, 35, 100"  href="build.php?gid=20"  title="Ecurie">'  +
				'<area shape=rect coords="35, 50, 70, 100" href="build.php?gid=21"  title="Atelier">');
	milimap.setAttribute('name', 'mili');

	var miliimg = document.createElement('img');
	miliimg.src = travissimoimg+'mili.png';
	miliimg.width = 70;
	miliimg.height = 100;
	miliimg.border=0;
	miliimg.setAttribute('usemap', '#mili');

	n.appendChild(milimap);
	n.appendChild(miliimg);

	/* Alliance */
	var allimap = elem('map','<area shape=rect coords="0, 0, 35, 100"  href="allianz.php?s=3"  title="Attaques d\'alliances">' +
				'<area shape=rect coords="35, 0, 70, 100"  href="'+forumURL+'"     title="Forum">' );
	allimap.setAttribute('name', 'alli');

	var alliimg = document.createElement('img');
	alliimg.src = travissimoimg+'alli.png';
	alliimg.width = 70;
	alliimg.height = 100;
	alliimg.border=0;
	alliimg.setAttribute('usemap', '#alli');

	n.appendChild(allimap);
	n.appendChild(alliimg);
}

function travissimo_marktalli() {
	if (window.location.href.match(/build\.php.*t=1/)) {
		var m = find("//tr[@class='rbg']",XPFirst);
		if (m) {
			m = m.parentNode;
			var z = m.getElementsByTagName("tr");
			z[0].childNodes[1].setAttribute('colspan', '8');
			z[1].appendChild(elem('td','Alliance'));
			z[z.length-1].childNodes[0].setAttribute('colspan', '8');
			for (var i = 2; i < z.length - 1; i++){
				var offre = parseInt(z[i].getElementsByTagName("td")[1].innerHTML);
				var demande=parseInt(z[i].getElementsByTagName("td")[3].innerHTML);
				if (offre < demande){
					z[i].setAttribute('class', 'c');
				}
				var atd = document.createElement("td");
				atd.appendChild(document.createTextNode(z[i].childNodes[8].attributes[0].nodeValue));
				z[i].appendChild(atd);
			}
		}
	}
}


function travissimo_kpberechnung() { // first line is language-specific
	if (window.location.pathname == '/build.php'
		&& window.location.search.indexOf('s=2')>=0
		&& (document.getElementsByTagName("h1")[0].innerHTML.indexOf("Pal")>=0
		|| document.getElementsByTagName("h1")[0].innerHTML.indexOf("sidence")>=0)) {

		var b = document.getElementsByTagName('b');
		var prod = parseInt(b[2].innerHTML);
		var stand = parseInt(b[3].innerHTML);
		var not = parseInt(b[4].innerHTML);
		var nd = travissimo_kp2dorf(not);
		var text;

		if (not < stand){
			var md = travissimo_kp2dorf(stand);
			if (md == nd)
				text = 'Vous avez assez de points pour conqu&eacute;rir votre <b>' + nrfmt(nd) +'</b> village.';
			else
				text = 'Vous avez assez de points pour conqu&eacute;rir encore '+nrfmt(md-nd+1)+' villages.';
		} else {
			var sec = (not-stand)/prod*86400;
			text = 'Vous avez besoin d\'encore <b>'+(not-stand)+'</b> points, ';
			text = text+'assez de points dans <b>'+travissimo_sectodur(sec)+'</b>,  ('+travissimo_sectodate(sec) + ')';
		}
		var nxneeded = travissimo_dorf2kp(nd+1);
		var text2 = 'Vous pourrez fonder ou conqu&eacute;rir un nouveau village dans <b>'+
			(Math.ceil((nxneeded-stand)/prod))+'</b> jour(s).<br>(<b>' + nxneeded + '</b> points requis)';
		b[4].parentNode.innerHTML = b[4].parentNode.innerHTML + '<p>'+text+'</p><p>'+text2+'</p>';
  	}
}

function travissimo_sectodur(sec) { // seconds to days/hrs
	return (d=Math.floor(sec/86400))+' jours et '+Math.floor((sec-86400*d)/3600)+' heures';
}

function travissimo_sectodate(sec) { // returns formatted date : now + sec
	var d = new Date((new Date()).getTime()+sec*1000);
	return 'le ' + d.getDate()+'.'+(d.getMonth() + 1)+' &agrave; '+d.getHours()+':'+d.getMinutes();
}

function travissimo_kp2dorf(kp){
  return Math.floor(Math.sqrt(kp/2000)+1);
}

function travissimo_dorf2kp(anz){
  return Math.pow(anz-1,2)*2000;
}

function nrfmt(n) { // 3 -> 3rd , 21 -> 21st etc.
  if (n==1)
  	return n + "er";
  if (n==2)
  	return n + "nd";
  return n + "&egrave;me";
}
function travissimo_marktsenden(){
	if (window.location.pathname == '/build.php'
		&& window.location.search.indexOf('t') == -1
		&& document.getElementsByName('r1').length >= 1
		&& ((mc=find("//td[@colspan='2']",XPFirst).textContent).indexOf("Commer")>=0)) {
		var f = document.getElementsByTagName('input');
		var ex = f[5].parentNode.parentNode.parentNode;
		ex.innerHTML = ex.innerHTML +
			'<tr><td colspan="2">Commer&ccedil;ants</td><td id="travissimo_markttdh"></td></tr>'+
			'<tr><td colspan="2">Capacit&eacute; inutilis&eacute;e<br>Total libre</td><td id="travissimo_markttdk"></td></tr>';

		for (var i = 0; i < 4; i++){
			f[i+2].addEventListener("change", travissimo_marktshowhandler, false);
			f[i+2].addEventListener("keyup", travissimo_marktshowhandler, false);
			f[i+2].addEventListener("move", travissimo_marktshowhandler, false);
		}
		var a = document.getElementsByTagName('table')[3].getElementsByTagName("a");
		for (var i = 0; i < a.length; i++)
			a[i].addEventListener("mouseup", travissimo_marktshowhandler, false);
		for (var i = 0; i < 8; i++)
			f[i + 2].tabIndex = (i + 1);
		f[2].focus();
		travissimo_marktshowhandler();
	}

}

function travissimo_marktshowhandler(){
	var h = get('travissimo_markttdh'),k = get('travissimo_markttdk');
	var t = parseInt(document.getElementsByTagName('b')[4].innerHTML);
	var f = document.getElementsByTagName('input');
	var l = 0;
	var m = mc.match(/\d+/)[0];
	for (var i = 0; i < 4; i++)
		l = l + parseInt(f[i+2].value);
	if (Math.ceil(l/t) > parseInt(m))
		h.innerHTML = '<span style="color:red; font-weight:bold">'+Math.ceil(l/t)+'</span>';
	else
		h.innerHTML = Math.ceil(l/t);
	if (m * t - l < 0)
		k.innerHTML = "<span style=\"color:red; font-weight:bold\">-<br>" + m * t - l + "</span>";
	else
		k.innerHTML =  "" + (Math.ceil(l/t)*t-l)  + "<br>" + (m*t-l);
}

function BBCode(){
	if (window.location.pathname == '/allianz.php' || window.location.pathname == '/spieler.php') {
		var descr = find("//td[@class='slr3']",XPList);
		for (var j = 0; j < descr.snapshotLength; ++j) {
			var desc = descr.snapshotItem(j);
			//Balise [img][/img]
			while(desc.innerHTML.match(/\[img\](http\:\/\/[\.\w\x2D\/\?=]+(\.jpg|\.gif|\.png))\[\/img\]/))
			desc.innerHTML = desc.innerHTML.replace(/\[img\](http\:\/\/[\.\w\x2D\/\?=]+(\.jpg|\.gif|\.png))\[\/img\]/,'<img src="$1" alt="$1" name="$1"/>');
			//Balise [url][/url]
			while(desc.innerHTML.match(/\[url\](http\:\/\/([[%\.\w\x2D\/\?=]+))\[\/url\]/))
			desc.innerHTML = desc.innerHTML.replace(/\[url\](http\:\/\/([[%\.\w\x2D\/\?=]+))\[\/url\]/,'<a href="$1" target="_blank">$1</a>');
			//Balise [url=*****]***[/url]
			while(desc.innerHTML.match(/\[url=(http\:\/\/[[%\.\w\x2D\/\?=]+)\]([\w]+)\[\/url\]/))
			desc.innerHTML = desc.innerHTML.replace(/\[url=(http\:\/\/[[%\.\w\x2D\/\?=]+)\]([\w]+)\[\/url\]/,'<a href="$1" target="_blank">$2</a>');
		}
	}
}

function settings() {
	if (window.location.pathname == '/spieler.php'){
		var p = document.getElementsByTagName("p")[0];
		if (p.innerHTML.indexOf("Vue") == -1)
			var p = document.getElementsByTagName("p")[1];
		if (p.innerHTML.indexOf("Vue")>=0){
			p.innerHTML = p.innerHTML.replace('Paquet graphique','Skin');
			var strich = document.createTextNode(' | ');
			var linktext = document.createTextNode('Travissimo');
			var link = document.createElement('a');
			link.setAttribute('href', 'spieler.php?s=5');
			link.appendChild(linktext);
			p.appendChild(strich);
			p.appendChild(link);
			if (window.location.search.indexOf('s=5')>=0){
				if (window.location.search.indexOf('travissimo_save')>=0){
					savesettings();
					loadsettings();
				}
				showsettings(p);
			}
		}
	}
}

function showsettings(p) {
	var text = new Array(
		'Liens de messages et d\'attaque',
		'Calcul des points de culture',
		'Notes',
		'Haute resolution ( > 1024*768 ), ne pas cocher dans le doute',
		'Case pour cocher tous les messages',
		'Temps des ressources',
		'Lien vers le profil ( nom du village )',
		'Modification des rapports',
		'Calcul de distances sur la carte');

	var table = '<form action="spieler.php">'+
		'<input type="hidden" name="s" value="5">'+
		'<table cellspacing="1" cellpadding="2" class="tbg">'+
		'<tr>'+
		'<td class="rbg" colspan="2">Travissimo</td>'+
		'</tr>';

	for (var i=0; i < travissimo_vars.length; i++){
		table = table + '<tr class="s7"><td><input class="fm f110" type="checkbox" name="'+travissimo_vars[i]+'" ';
		if (travissimo_set[i]==1){
			table = table+'checked';
		}
		table += '></td><td>'+text[i]+'</td></tr>';
	}

	table += '</table>'+
		'<p><input type="text" name="travissimoimg" size="50" class="fm" value="'+travissimoimg+'"> Lien pour le skin</p>'+
		'<p><input type="text" name="forumURL" size="50" class="fm" value="'+forumURL+'"> Lien de forum</p>'+
		'<p>Attaque par defaut : <input type="radio" name="defaultAttType" value="2" ';

	if (defaultAttType==2)
		table+='checked="checked" ';
	table+='/>assistance | <input type="radio" name="defaultAttType" value="3"';
	if (defaultAttType==3)
		table+='checked="checked" ';
	table+='/>attaque normale | <input type="radio" name="defaultAttType" value="4"';
	if (defaultAttType==4)
		table+='checked="checked" ';
	table += ' />pillage</p>' 
		+ '<p align="center"><input type="image" value="" border="0" name="travissimo_save" src="img/un/b/s1.gif" width="80" height="20"></input></p>';


	p.innerHTML = p.innerHTML + table;
}

function savesettings(){
	var s = window.location.search;

	for (var i = 0; i < travissimo_vars.length; i++){
		if (s.indexOf(travissimo_vars[i])>=0){
			GM_setValue(travissimo_vars[i], 1);
		} else {
			GM_setValue(travissimo_vars[i], 0);
		}
	}
	if (s.match(/travissimoimg=([%\.\w]+)/)){
		var img = decodeURIComponent(RegExp.$1);
		GM_setValue('travissimoimg', img);
	}
	if (s.match(/forumURL=([%\.\w\x2D]+)/)){
		var forum = decodeURIComponent(RegExp.$1);
		GM_setValue('forumurl'+server, forum);
	}
	if (s.match(/defaultAttType=([%\.\w\x2D]+)/)){
		var default_attaque= decodeURIComponent(RegExp.$1);
		GM_setValue('defaultAttType', default_attaque);
	}
}

function loadsettings(){
	travissimo_set = new Array();

	for (var i=0; i<travissimo_vars.length; i++){
		travissimo_set[i] = GM_getValue(travissimo_vars[i], 1);
	}
	travissimoimg = GM_getValue('travissimoimg', 'http://ulzbug2.com.hree.com.hr/img/');
	forumURL = GM_getValue('forumurl'+server, 'http://'+server+'.travian.com.hr/allianz.php?s=2');
	defaultAttType =GM_getValue('defaultAttType', 3);
}


function travissimo_main() {
	loadsettings();
	settings();

	if (travissimo_set[0]==1){
		travissimo_igmlinks();
	}

	travissimo_navigationbar();
	if (travissimo_set[1]==1){
		travissimo_kpberechnung();
	}
	if (travissimo_set[2])
		afficheNotes();

	if (travissimo_set[4])
		cocher_messages();
	if (travissimo_set[5])
		ressources();
	if (travissimo_set[6])
		profilVillages();
	if (travissimo_set[7])
		modifieRapport()
	if (travissimo_set[8]){
		tool_distance();
		Distance_CapTus();
	}
	travissimo_marktalli();
	travissimo_marktsenden();
	BBCode();
	autre();

}

travissimo_main();
