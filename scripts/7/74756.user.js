var meta = <><![CDATA[
// ==UserScript==
// @name 		Travian Att Analyseur
// @author		2fre
// @namespace 	TAA3
// @version 	1.0.0.3
// @description	Travian Att Analyseur
// @source 		http://userscripts.org/scripts/show/74756
// @identifier 	http://userscripts.org/scripts/show/74756.user.js
// @copyright	© 2fre, 2008-2010 
// @license 	No License
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
]]></>.toString();

	
function functionMain(e) 
{
	var crtPage = window.location.href;
	var TAA = eval(GM_getValue("attInfo", '({})'));
	if (GM_getValue("ListAtt") == undefined)
		var listAtt = new Array(new Array);
	else
		var listAtt = eval(GM_getValue("ListAtt"));
	var M35 = 0;
	var listAttTmp = new Array;
	var dNow = new Date();
	var actVillageId;
	dmid2 = 'mid';
	romain = 1;
	germain = 2;
	gaulois = 3;
	
	var multiplicateur = 3;
	var host;
	var text = '';
	var lo;
	
	//Training cost for each unit (4), 
	//load capacity (1), attack power (1), 
	//def power infantery (1), def power cavalery (1), 
	//speed (1) - for normal servers, crop consumption(1)
	var uc = new Array();
	//Romans
	uc[1] = [6, 'Legionnaire'];
	uc[2] = [5, 'Pretorien'];
	uc[3] = [7, 'Imperian'];
	uc[4] = [16, 'Legati'];
	uc[5] = [14, 'Imperatoris'];
	uc[6] = [10, 'Caesaris'];
	uc[7] = [4, 'Bélier'];
	uc[8] = [3, 'Cata'];
	uc[9] = [4, 'Senateur'];
	uc[10] = [50, 'Colon'];

	//Teutons
	uc[11] = [7, 'Gourdin'];
	uc[12] = [7, 'Lance'];
	uc[13] = [6, 'Hache'];
	uc[14] = [90, 'Espion'];
	uc[15] = [10, 'Paladin'];
	uc[16] = [9, 'Teuton'];
	uc[17] = [4, 'Bélier'];
	uc[18] = [3, 'Cata'];
	uc[19] = [4, 'Chef'];
	uc[20] = [50, 'Colon'];
	
	//Gauls
	uc[21] = [7, 'Phalange'];
	uc[22] = [6, 'Epée'];
	uc[23] = [17, 'Eclaireur'];
	uc[24] = [19, 'Toutatis'];
	uc[25] = [16, 'Druide'];
	uc[26] = [13, 'Hedouin'];
	uc[27] = [4, 'Bélier'];
	uc[28] = [3, 'Cata'];
	uc[29] = [5, 'Chef'];
	uc[30] = [50, 'Colon'];

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterator = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	var altK,ctrlK,shiftK;
	function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
	function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);};//returns the element with the aID id (wrapper for getElementById)
	function $a(iHTML, att) {var aLink = document.createElement("A"); aLink.innerHTML = iHTML; $at(aLink, att); return aLink;};
	function $d(iHTML, att) {var aDiv = document.createElement("DIV"); aDiv.innerHTML = iHTML; $at(aDiv, att); return aDiv;};
	function toSeconds(hTime) {p = hTime.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);};//Compute the seconds for a given human time
	function createTooltip() {var ttD = $d("", [["id", "tb_tooltip"]]); document.body.appendChild(ttD); document.addEventListener("mousemove", updateTooltip, 0); return ttD;};
	function $t(att) {var aTb = document.createElement("TABLE"); $at(aTb, att);	return aTb;};
	function $r(att) {var aRow = document.createElement("TR"); $at(aRow, att); return aRow;};
	function $c(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; $at(aCell, att); return aCell;};
	function $e(aType, iHTML){var ret = document.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;};//Create a new element of the DOM (type, innerHTML)	
	function xy2id(x, y) {return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));};//get the vID of the cell having the x,y coordinates
	function id2xy(vid) {var arrXY = new Array; var ivid = parseInt(vid); arrXY[0] = (ivid%801?(ivid%801)-401:400); arrXY[1] = 400 - (ivid - 401 - arrXY[0]) / 801; return arrXY;};//Inverse function for xy2id(x,y) => id2xy(vid) - fr3nchlover
	
	// Selecting language
	function checkLang()
	{
	  host = window.location.hostname;
	  hosts = host.split(".");
	  Xlang = hosts[hosts.length-1];
	}
	
	Xlang="com";
	checkLang();
	var aLangAttackType;
	switch (Xlang) 
	{
		case "cn":
			aLangAttackType = ["??", "??"];
			break;		
		case "hk":
			aLangAttackType = ["??", "??"];
			break;
		case "tw":
			aLangAttackType = ["??", "??"];
			break;
		case "fi":
			aLangAttackType = ["Hyökkäys", "Ryöstö"];
			break;
		case "us":
		case "au":	
		case "uk":	
		case "in":
		case "com":
		default:
			aLangAttackType = ["Attack", "Raid"];
			break;
		case "pl":
			aLangAttackType = ["Atak normalny", "Grabiez"];
			break;
		case "ua":
			aLangAttackType = ["?????", "?????"];
			break;
		case "tr":
			aLangAttackType = ["Saldiri: Normal", "Saldiri: Yagma"];
			break;		
		case "br":
			aLangAttackType = ["Ataque", "Assalto"];
			break;           
	       	case "pt":
			aLangAttackType = ["Ataque", "Assalto"];
			break;        
	       	case "my":
			aLangAttackType = ["Serangan: Normal", "Serangan: Serbuan"];
			break;
	        case "nl":
	                aLangAttackType = ["Aanval", "Overval"];  
	                break;
		case "hu":
			aLangAttackType = ["Támadás", "Rablás"];
			break;		
	        case "lv":
			aLangAttackType = ["Uzbrukums", "Iebrukums"];
			break;
		case "cl":
		case "mx":
		case "net":
			aLangAttackType = ["Ataque", "Atraco"];
			break;
		case "se":
			aLangAttackType = ["Normal", "Plundring"];
			break;
		case "it":
			aLangAttackType = ["Attacco", "Raid"];
			break;                
		case "fr":
			aLangAttackType = ["Attaque", "Pillage"];
			break;		
		case "si":
			aLangAttackType = ["Napad", "Ropanje"];
			break;		
		case "vn":
			aLangAttackType = ["T?n công", "Cu?p bóc"];
			break;
		case "ru":
			aLangAttackType = ["?????????", "?????"];
			break;  
		case "rs":
			aLangAttackType = ["????????", "??????"];
			break;
		case "ba":
			aLangAttackType = ["Normalan", "Pljacka"];
			break;
		case "org":
		case "de":
			aLangAttackType = ["Angriff: Normal","Angriff: Raubzug"];
			break;
		case "ir":
			aLangAttackType = ["???? ????", "???? ????"];
			break;
		case "ae":
			aLangAttackType = ["????: ????", "????: ?????"];
			break;
		case "dk":
			aLangAttackType = ["Angreb", "Plyndringstogt"];
			break;
	}

	function formatTime(sec, aFormat){
		//aFormat: 0 = h:mm:ss (h = 0->... can be more than 24); 1 = days, h:mm:ss; 2 = h:mm:ss (h = 0->23:59:59 = only time)
		if (sec > -1) {
			var h = Math.floor(sec/3600);
			var m = Math.floor(sec/60) % 60;
			var s = parseInt(sec % 60);
			var ht = "";
			switch (aFormat) {
				case 1: var d = Math.floor(h/24); h = h - d * 24; ht += d + ", "; break;
				case 2: h = h % 24; break;
			};
			ht += h + ":" + (m > 9 ? m: '0' + m) + ":" + (s > 9 ? s : '0' + s);
		} else ht = "0:00:0?";
		h = null; m = null; s = null; d = null;
		return ht;
	};
	
	function xAttaque(aNameVillageAtt, vIDAtt, vIDDef, race, restTime, ImpactTime, lastUpdateTime, Id) {
		this.vIDDef = vIDDef;
		this.vNameAtt = aNameVillageAtt;
		this.vIDAtt = vIDAtt;
		this.vRace = race;
		this.vRestTime = restTime;
		this.vImpactTime = ImpactTime;
		this.vlastUpdateTime = lastUpdateTime;
		this.vUniqueId = Id;
		this.incomingTroop = new Array;
		this.incomingTroop[0] = 0;
		this.incomingTroopType = new Array;
		this.place = new Array;
		this.place[0] = 0;
		return this;
	};
	
	function VillageComp(village1, village2) {
		
		if ( (village1.vIDDef == village2.vIDDef) 		&&
			(village1.vNameAtt == village2.vNameAtt) 	&&
			(village1.vIDAtt == village2.vIDAtt)		&&
			(village1.vRace == village2.vRace)			&&
			(village1.vImpactTime == village2.vImpactTime) &&
			(village1.vUniqueId == village2.vUniqueId) )
			return true;
		else
			return false;
	};
	
	function format(valeur,decimal) {
		// formate un chiffre avec 'decimal' chiffres après la virgule
		var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ;
		var val=Math.floor(Math.abs(valeur));
		if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
		var val_format=val+"";
		var nb=val_format.length;
		for (var i=1;i<4;i++) {
			if (val>=Math.pow(10,(3*i))) {
				val_format=val_format.substring(0,nb-(3*i))+val_format.substring(nb-(3*i));
			}
		}
		if (decimal>0) {
			var decim="";
			for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
			deci=decim+deci.toString();
			val_format=val_format+"."+deci;
		}
		if (parseFloat(valeur)<0) {val_format="-"+val_format;}
		return val_format;
	} 
	
	function $xf(xpath, xpt, startnode, aDoc) {
		if (!aDoc) aDoc = document; 
		if (!startnode) startnode = document; 
		var xpres = XPFirst; 
		switch (xpt) {
			case 'i': xpres = XPIterator; 
				break; 
			case 'l': xpres = XPList; 
				break; 
			case 'r': xpres = XPResult; 
				break;
		}; 
		var ret = aDoc.evaluate(xpath, startnode, null, xpres, null); 
		return (xpres == XPFirst ? ret.singleNodeValue : ret);
	};
	
	//get the active village from the villageList
	function getActiveVillage() {
		var aV = $xf("//td[@class='dot hl'] | //div[@id='vlist']//table[@class='vlist']//tr[@class='sel']//a | //a[@class='active_vl']/../../td/table/tbody/tr/td");
		var v = [-1000, -1000];
		if (aV) {
			if (M35 == 2) {
				var tr = aV.parentNode;
				if (tr.cells.length > 3) {
					v[0] = tr.cells[2].textContent.replace("(", "");
					v[1] = tr.cells[4].textContent.replace(")", "");
					actVillageId = xy2id(v[0], v[1]);
				} else {
					var tmpC = tr.cells[2].textContent.replace("(", "").replace(")", "").split("|");
					v[0] = parseInt(tmpC[0]);
					v[1] = parseInt(tmpC[1]);
					actVillageId = xy2id(v[0], v[1]);
				};
			} else if (M35 == 0) {
				v[0] = aV.textContent.replace("(", "");
				aV = $xf('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]');
				v[1] = aV.textContent.replace(")", "");
				actVillageId = xy2id(v[0], v[1]);
			} else if (M35 == 1) {
				v[0] = aV.parentNode.parentNode.cells[2].textContent.replace("(", "");
				v[1] = aV.parentNode.parentNode.cells[4].textContent.replace(")", "");
				actVillageId = xy2id(v[3], v[4]);
			};
		}
		v = null; aV = null;
	};

	function getPlusStatus() {
		var iP = $g("logo");
		var ahref;
		if (iP) {
			if (iP.nodeName == "A") {
				M35 = 2;
			} else if (iP.nodeName == "IMG") {
				M35 = 1;
			};
		};
		iP = null;
	};
	
	function processDorf3() {
		//On récupére la table overview
		var vTable = $g('overview');
		
		vTable = $xf("//table[@id='overview']");

		// Iteration sur toutes les lignes de la table
		for (var i = 2; i < vTable.rows.length; i++) {
			v = vTable.rows[i];
			vCell = v.cells[1];
			var aCell = vCell.childNodes[0];
			var iCell = aCell.childNodes[0];
			// Si c'est une attaque
			if (iCell.className == 'att1') {
				// Récupération du titre et on parse le nombre d'attaque pour l'afficher
				var text = iCell.title;
				if (text != undefined) {
					var iText = iCell.title.split("x");
					var nP = null;
					if (TAA[i] != undefined) {
						if (TAA[i] < parseInt(iText[0])) {
							nP = $e("TEXTNODE", "<B>↑" + iText[0] + " </B>");
						}
						else if (TAA[i] > parseInt(iText[0])) {
							nP = $e("TEXTNODE", "<B>↓" + iText[0] + " </B>");
						}
						else {
							nP = $e("TEXTNODE", "<B>→" + iText[0] + " </B>");
						}
					}
					else {
						nP = $e("TEXTNODE", "<B>" + iText[0] + " </B>");
					}
					nP.setAttribute("style", "font-size:12pt; text-align: right")
					vCell.insertBefore(nP, vCell.firstChild);
					// Sauvegarde des résultats
					TAA[i] = parseInt(iText[0]);
				}
			}
			else
				TAA[i] = 0;
		};
	};

	function processAttackAnalyse() {
		//On récupére les tables troop_details
		var allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='troop_details']//a[contains(@href, " + actVillageId + ")]/../../../..", 'r');
		var Id;
		
		for (var i = 0; i < allTables.snapshotLength; i++) {
			if ( (allTables.snapshotItem(i).rows[0].cells[1].innerHTML.search(aLangAttackType[0]) != -1) ||
				(allTables.snapshotItem(i).rows[0].cells[1].innerHTML.search(aLangAttackType[1]) != -1) ){
				var stime = allTables.snapshotItem(i);

				//Temps restant avant impact
				var restTime = stime.getElementsByTagName("SPAN")[0].textContent;

				//Heure d'impact
				var ImpactTime = stime.getElementsByTagName("DIV")[1].textContent;
				ImpactTime = ImpactTime.split(" ");
				ImpactTime = ImpactTime[1];

				//Nom du village attaquant
				var attVillage = stime.getElementsByTagName("A")[0].textContent;

				//Id du village attaquant et transformation en coordonnées
				var attIdVillage = stime.getElementsByTagName("A")[0].href;
				attIdVillage = attIdVillage.split("?d=");
				attIdVillage = attIdVillage[1];
				attIdVillage = attIdVillage.split("&");
				attIdVillage = attIdVillage[0];
				 if (attIdVillage != actVillageId) {
					//Id du village attaqué et transformation en coordonnées
					var IdVillageAtt = stime.getElementsByTagName("A")[2].href;
					IdVillageAtt = IdVillageAtt.split("?d=");
					IdVillageAtt = IdVillageAtt[1];
					IdVillageAtt = IdVillageAtt.split("&");
					IdVillageAtt = IdVillageAtt[0];
					
					//Récupération de la race
					var race = stime.getElementsByTagName("IMG")[1].className;
					if (race == 'unit u1') {
						race = romain;
					}
					else if (race == 'unit u11') {
						race = germain;					
					}
					else if (race == 'unit u21') {
						race = gaulois;					
					}
					
					//Création d'un Identifiant
					Id = IdVillageAtt + attIdVillage + attVillage + ImpactTime + race;
					//Stockage des données dans une liste temporaire
					var tmpVillage = new xAttaque(attVillage, attIdVillage, IdVillageAtt, race, restTime, ImpactTime, dNow.getTime(), Id);
					listAttTmp[listAttTmp.length] = tmpVillage;
				}
			}
		};

		//On regarde s'il y a de nouvelles attaques
		if (listAtt[actVillageId] !=undefined) {
			for (var i = 0 ; i < listAtt[actVillageId].length ; i++) {
				for (var j = 0 ; j < listAttTmp.length ; j++) {
					if (VillageComp(listAtt[actVillageId][i], listAttTmp[j])) {
						listAttTmp[j].incomingTroop = listAtt[actVillageId][i].incomingTroop;
						listAttTmp[j].incomingTroopType = listAtt[actVillageId][i].incomingTroopType;
						listAttTmp[j].place = listAtt[actVillageId][i].place;
					}
				};
			};
		}
		
		//Traitement des données
		for (var j = 0 ; j < listAttTmp.length ; j++) {
			if (listAttTmp[j].incomingTroop[0] == 0) {
				var coordAtt = id2xy(listAttTmp[j].vIDAtt);
				var coordDef = id2xy(listAttTmp[j].vIDDef);
				var dist = Math.sqrt((coordAtt[0]-coordDef[0])*(coordAtt[0]-coordDef[0])+(coordAtt[1]-coordDef[1])*(coordAtt[1]-coordDef[1]));
				dist = format(dist,2);
				var trouve = false
				if (dist <= 30) {
					var vitesseMax = toSeconds(listAttTmp[j].vRestTime) / dist + 0.1;
					var vitesseMin = (toSeconds(listAttTmp[j].vRestTime)  + (dNow.getTime() - lastUpdate[actVillageId])/1000) / dist;
					var deplacementMax = toSeconds("01:00:00") / vitesseMax;
					var deplacementMin = toSeconds("01:00:00") / vitesseMin;
					var count = 0;
					for (var i = (listAttTmp[j].vRace-1)*10+1 ; i < (listAttTmp[j].vRace)*10 ; i++) {
						if (parseInt(uc[i][0]*2*artevitesse) <= deplacementMax && parseInt(uc[i][0]*2*artevitesse) >= deplacementMin) {
							listAttTmp[j].incomingTroop[count] = i;
							listAttTmp[j].incomingTroopType[count] = uc[i][1];
							listAttTmp[j].place[count] = 0;
							count++;
							trouve = true;
						}
					}
					if (!trouve) {
						listAttTmp[j].incomingTroop[0] = -1;
						listAttTmp[j].incomingTroopType[0] = "?";
						listAttTmp[j].place[0] = -1;
					}
				}
				else if (dist > 30) {
					for (var pt = 0 ; pt < 21 ; pt++) {
						var a = (3 * pt + parseInt(dist));
						a = a / (1 + pt / 10);
						var Tmin = toSeconds(listAttTmp[j].vRestTime);
						var Tmax = toSeconds(listAttTmp[j].vRestTime)  + (dNow.getTime() - lastUpdate[actVillageId])/1000;
						var vitesseMax = (a * 3600 / Tmin) + 0.1; 
						var vitesseMin = (a * 3600 / Tmax);
						var count = 0;
						for (var i = (listAttTmp[j].vRace-1)*10+1 ; i < (listAttTmp[j].vRace)*10 ; i++) {
							if (parseInt(uc[i][0]*multiplicateur) <= vitesseMax && parseInt(uc[i][0]*multiplicateur) >= vitesseMin) {
								listAttTmp[j].incomingTroop[count] = i;
								listAttTmp[j].incomingTroopType[count] = uc[i][1];
								listAttTmp[j].place[count] = pt;
								count++;
								trouve = true;
							}
						}
					}
					if (!trouve) {
						listAttTmp[j].incomingTroop[0] = -1;
						listAttTmp[j].incomingTroopType[0] = "?";
						listAttTmp[j].place[0] = 0;
					}
				}
			}
		}	
		// Affichage des résultats
		var j = 0;
		for (var i = 0; i < allTables.snapshotLength; i++) {
			if ( (allTables.snapshotItem(i).rows[0].cells[1].innerHTML.search(aLangAttackType[0]) != -1) ||
				(allTables.snapshotItem(i).rows[0].cells[1].innerHTML.search(aLangAttackType[1]) != -1) ) {
				if ( j < listAttTmp.length ) {
					var stime = allTables.snapshotItem(i);
					var attVillage = stime.getElementsByTagName("A")[1].textContent;
					var listTroop = "";
					for (k = 0 ; k < listAttTmp[j].incomingTroopType.length ; k++) {
						listTroop = listTroop + listAttTmp[j].incomingTroopType[k] + "-" + listAttTmp[j].place[k] + "-";
					}
	
					stime.getElementsByTagName("A")[2].textContent =  stime.getElementsByTagName("A")[2].textContent + attVillage + " -> " + listTroop.substring(0, listTroop.length-1);
					j++;
				}
			}
		}
		
		// Sauvegarde de la liste
		listAtt[actVillageId] = listAttTmp;
	};
	getPlusStatus();
	getActiveVillage();
	
	if (GM_getValue("LastUpdate") == undefined) {
		var lastUpdate = new Array;
		lastUpdate[actVillageId] = dNow.getTime();
	}
	else if (GM_getValue("LastUpdate")[actVillageId] == undefined) {
		var lastUpdate = new Array;
		lastUpdate[actVillageId] = dNow.getTime();
	}
	else
		var lastUpdate = eval(GM_getValue("LastUpdate"));

	if (crtPage.match(/dorf3.php/)) { processDorf3(); }
	if (crtPage.match(/gid=16/) || crtPage.match(/\?id=39/) || crtPage.match(/&id=39/)) { processAttackAnalyse(); }
	if (crtPage.match(/login.php/)) { process(); }
	GM_setValue("attInfo", uneval(TAA)); 
	GM_setValue("ListAtt", uneval(listAtt)); 
	lastUpdate[actVillageId] = dNow.getTime();
	GM_setValue("LastUpdate", uneval(lastUpdate)); 
};

window.addEventListener('load', functionMain, false);
document.body.setAttribute("onbeforeunload", '{TAA = null;}');
