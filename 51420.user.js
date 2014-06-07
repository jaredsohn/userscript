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
	var rmbm = "<span style='position:absolute;left:0px;font:0.75em;padding-left:1px;cursor:crosshair'>x </span>";
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
					'<tr><tr class="cbg1"><td> </td><td>Quantité requise</td><td>Temps requis</td></tr><tr>';
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
			noteHTML = div("<b>Notes:</b><br /><textarea class='fm' style='width:100%;padding: .5ex;margin: 0;height:480px;' id='note'>