// ==UserScript==
// @name          Travian NPC Merchant
// @version       5.0
// @description   Add NPC Merchant
// @author        ww_start_t
// @include       http://s*.travian.*/*
// ==/UserScript==

var Lang   = new Array();
var local;

//TW & HK 

local = 'tw';'hk';
Lang[local] = new Array();
Lang[local]['npc'] = 'NPC 商人';

Lang[local]['res'] = '資源';
Lang[local]['re1'] = '木柴';
Lang[local]['re2'] = '磚塊';
Lang[local]['re3'] = '鋼鐵';
Lang[local]['re4'] = '穀物';

Lang[local]['ro_'] = '羅馬';
Lang[local]['ro0'] = '古羅馬步兵';
Lang[local]['ro1'] = '禁衛兵';
Lang[local]['ro2'] = '帝國兵';
Lang[local]['ro3'] = '使者騎士';
Lang[local]['ro4'] = '帝國騎士';
Lang[local]['ro5'] = '將軍騎士';
Lang[local]['ro6'] = '衝撞車';
Lang[local]['ro7'] = '火焰投石機';
Lang[local]['ro8'] = '參議員';
Lang[local]['ro9'] = '開拓者';

Lang[local]['ga_'] = '高盧';
Lang[local]['ga0'] = '方陣兵';
Lang[local]['ga1'] = '劍士';
Lang[local]['ga2'] = '探路者';
Lang[local]['ga3'] = '雷法師';
Lang[local]['ga4'] = '德魯伊騎兵';
Lang[local]['ga5'] = '海頓聖騎';
Lang[local]['ga6'] = '衝撞車';
Lang[local]['ga7'] = '投石車';
Lang[local]['ga8'] = '族長';
Lang[local]['ga9'] = '開拓者';
Lang[local]['u99'] = '陷阱';

Lang[local]['ge_'] = '條頓';
Lang[local]['ge0'] = '棍棒兵';
Lang[local]['ge1'] = '矛兵';
Lang[local]['ge2'] = '斧頭兵';
Lang[local]['ge3'] = '偵察兵';
Lang[local]['ge4'] = '遊俠';
Lang[local]['ge5'] = '條頓騎士';
Lang[local]['ge6'] = '衝撞車';
Lang[local]['ge7'] = '投石車';
Lang[local]['ge8'] = '司令官';
Lang[local]['ge9'] = '開拓者';

//Germany

local = 'de';
Lang[local] = new Array();
Lang[local]['npc'] = 'NPC Merchant';

Lang[local]['res'] = 'Resources';
Lang[local]['re1'] = 'Holz';
Lang[local]['re2'] = 'Lehm';
Lang[local]['re3'] = 'Eisen';
Lang[local]['re4'] = 'Getreide';

Lang[local]['ro_'] = 'Römer';
Lang[local]['ro0'] = 'Legionär';
Lang[local]['ro1'] = 'Prätorianer';
Lang[local]['ro2'] = 'Imperianer';
Lang[local]['ro3'] = 'Equites Legati';
Lang[local]['ro4'] = 'Equites Imperatoris';
Lang[local]['ro5'] = 'Equites Caesaris';
Lang[local]['ro6'] = 'Rammbock';
Lang[local]['ro7'] = 'Feuerkatapult';
Lang[local]['ro8'] = 'Senator';
Lang[local]['ro9'] = 'Siedler';

Lang[local]['ga_'] = 'Gallier';
Lang[local]['ga0'] = 'Phalanx';
Lang[local]['ga1'] = 'Schwertkämpfer';
Lang[local]['ga2'] = 'Späher';
Lang[local]['ga3'] = 'Theutates Blitz';
Lang[local]['ga4'] = 'Druidenreiter';
Lang[local]['ga5'] = 'Haeduaner';
Lang[local]['ga6'] = 'Rammholz';
Lang[local]['ga7'] = 'Kriegskatapult';
Lang[local]['ga8'] = 'Häuptling';
Lang[local]['ga9'] = 'Siedler';
Lang[local]['u99'] = 'Falle';

Lang[local]['ge_'] = 'Germanen';
Lang[local]['ge0'] = 'Keulenschwinger';
Lang[local]['ge1'] = 'Speerkämpfer';
Lang[local]['ge2'] = 'Axtkämpfer';
Lang[local]['ge3'] = 'Kundschafter';
Lang[local]['ge4'] = 'Paladin';
Lang[local]['ge5'] = 'Teutonen Reiter';
Lang[local]['ge6'] = 'Ramme';
Lang[local]['ge7'] = 'Katapult';
Lang[local]['ge8'] = 'Stammesführer';
Lang[local]['ge9'] = 'Siedler';


//Arabic

local = 'ae';'eg';'sa';'sy';
Lang[local] = new Array();
Lang[local]['npc'] = 'تاجر المبادلة';

Lang[local]['res'] = 'الموارد';
Lang[local]['re1'] = 'الخشب';
Lang[local]['re2'] = 'الطين';
Lang[local]['re3'] = 'الحديد';
Lang[local]['re4'] = 'القمح';

Lang[local]['ro_'] = 'الرومان';
Lang[local]['ro0'] = 'جندي أول';
Lang[local]['ro1'] = 'حراس الأمبراطور';
Lang[local]['ro2'] = 'جندي مهاجم';
Lang[local]['ro3'] = 'فرقة تجسس';
Lang[local]['ro4'] = 'سلاح الفرسان';
Lang[local]['ro5'] = 'فرسان قيصر';
Lang[local]['ro6'] = 'كبش';
Lang[local]['ro7'] = 'المقاليع النارية';
Lang[local]['ro8'] = 'حكيم';
Lang[local]['ro9'] = 'مستوطن';

Lang[local]['ga_'] = 'الأغريق';
Lang[local]['ga0'] = 'الكتيبه';
Lang[local]['ga1'] = 'مبارز';
Lang[local]['ga2'] = 'المستكشف';
Lang[local]['ga3'] = 'رعد الجرمان';
Lang[local]['ga4'] = 'فرسان السلت';
Lang[local]['ga5'] = 'فرسان الهيدوانر';
Lang[local]['ga6'] = 'محطمة الابواب الخشبية';
Lang[local]['ga7'] = 'المقلاع الحربي';
Lang[local]['ga8'] = 'رئيس';
Lang[local]['ga9'] = 'مستوطن';
Lang[local]['u99'] = 'الأفخاخ';

Lang[local]['ge_'] = 'الجرمان';
Lang[local]['ge0'] = 'مقاتل بهراوة';
Lang[local]['ge1'] = 'مقاتل برمح';
Lang[local]['ge2'] = 'مقاتل بفأس';
Lang[local]['ge3'] = 'الكشاف';
Lang[local]['ge4'] = 'مقاتل القيصر';
Lang[local]['ge5'] = 'فرسان الجرمان';
Lang[local]['ge6'] = 'محطمة الابواب';
Lang[local]['ge7'] = 'المقلاع';
Lang[local]['ge8'] = 'الزعيم';
Lang[local]['ge9'] = 'مستوطن';

//com english

local = 'com';
Lang[local] = new Array();
Lang[local]['npc'] = 'NPC Merchant';

Lang[local]['res'] = 'Resources';
Lang[local]['re1'] = 'Wood';
Lang[local]['re2'] = 'Clay';
Lang[local]['re3'] = 'Iron';
Lang[local]['re4'] = 'Crop';

Lang[local]['ro_'] = 'Romans';
Lang[local]['ro0'] = 'Legionnaire';
Lang[local]['ro1'] = 'Praetorian';
Lang[local]['ro2'] = 'Imperian';
Lang[local]['ro3'] = 'Equites Legati';
Lang[local]['ro4'] = 'Equites Imperatoris';
Lang[local]['ro5'] = 'Equites Caesaris';
Lang[local]['ro6'] = 'Battering Ram';
Lang[local]['ro7'] = 'Fire Catapult';
Lang[local]['ro8'] = 'Senator';
Lang[local]['ro9'] = 'Settler';

Lang[local]['ga_'] = 'Gauls';
Lang[local]['ga0'] = 'Phalanx';
Lang[local]['ga1'] = 'Swordsman';
Lang[local]['ga2'] = 'Pathfinder';
Lang[local]['ga3'] = 'Theutates Thunder';
Lang[local]['ga4'] = 'Druidrider';
Lang[local]['ga5'] = 'Haeduan';
Lang[local]['ga6'] = 'Ram';
Lang[local]['ga7'] = 'Trebuchet';
Lang[local]['ga8'] = 'Chiefain';
Lang[local]['ga9'] = 'Settler';
Lang[local]['u99'] = 'Trap';

Lang[local]['ge_'] = 'Teutons';
Lang[local]['ge0'] = 'Clubswinger';
Lang[local]['ge1'] = 'Spearman';
Lang[local]['ge2'] = 'Axeman';
Lang[local]['ge3'] = 'Scout';
Lang[local]['ge4'] = 'Paladin';
Lang[local]['ge5'] = 'Teutonic Knight';
Lang[local]['ge6'] = 'Ram';
Lang[local]['ge7'] = 'Catapult';
Lang[local]['ge8'] = 'Chieftain';
Lang[local]['ge9'] = 'Settler';

//Units: name, cost of wood / clay / iron / Cereals, total

var einheit = new Array();

function einheitenFestlegen(local) {
  var volk = 'roemer';
  einheit[volk]   = new Array();
  einheit[volk][0] = new Array(Lang[local]['ro0'], 120, 100, 180, 40, 440);
  einheit[volk][1] = new Array(Lang[local]['ro1'], 100, 130, 160, 70, 460);
  einheit[volk][2] = new Array(Lang[local]['ro2'], 150, 160, 210, 80, 600);
  einheit[volk][3] = new Array(Lang[local]['ro3'], 140, 160, 20, 40, 360);
  einheit[volk][4] = new Array(Lang[local]['ro4'], 550, 440, 320, 100, 1410);

  einheit[volk][5] = new Array(Lang[local]['ro5'], 550, 640, 800, 180, 2170);
  einheit[volk][6] = new Array(Lang[local]['ro6'], 900, 360, 500, 70, 1830);
  einheit[volk][7] = new Array(Lang[local]['ro7'], 950, 1350, 600, 90, 2990);
  einheit[volk][8] = new Array(Lang[local]['ro8'], 30750, 27200, 45000, 37500, 140450);
  einheit[volk][9] = new Array(Lang[local]['ro9'], 5800, 5300, 7200, 5500, 23800);

  volk = 'gallier';
  einheit[volk]   = new Array();
  einheit[volk][0] = new Array(Lang[local]['ga0'], 100, 130, 55, 30, 315);
  einheit[volk][1] = new Array(Lang[local]['ga1'], 140, 150, 185, 60, 535);
  einheit[volk][2] = new Array(Lang[local]['ga2'], 170, 150, 20, 40, 380);
  einheit[volk][3] = new Array(Lang[local]['ga3'], 350, 450, 230, 60, 1090);
  einheit[volk][4] = new Array(Lang[local]['ga4'], 360, 330, 280, 120, 1090);
  einheit[volk][5] = new Array(Lang[local]['ga5'], 500, 620, 675, 170, 1965);
  einheit[volk][6] = new Array(Lang[local]['ga6'], 950, 555, 330, 75, 1910);
  einheit[volk][7] = new Array(Lang[local]['ga7'], 960, 1450, 630, 90, 3130);
  einheit[volk][8] = new Array(Lang[local]['ga8'], 30750, 45400, 31000, 37500, 144650);
  einheit[volk][9] = new Array(Lang[local]['ga9'], 5500, 7000, 5300, 4900, 22700);
  einheit[volk][10] = new Array(Lang[local]['u99'], 20, 30, 10, 20, 80);

  volk = 'germanen';
  einheit[volk]   = new Array();
  einheit[volk][0] = new Array(Lang[local]['ge0'], 95, 75, 40, 40, 250);
  einheit[volk][1] = new Array(Lang[local]['ge1'], 145, 70, 85, 40, 340);
  einheit[volk][2] = new Array(Lang[local]['ge2'], 130, 120, 170, 70, 490);
  einheit[volk][3] = new Array(Lang[local]['ge3'], 160, 100, 50, 50, 360);
  einheit[volk][4] = new Array(Lang[local]['ge4'], 370, 270, 290, 75, 1005);
  einheit[volk][5] = new Array(Lang[local]['ge5'], 450, 515, 480, 80, 1525);
  einheit[volk][6] = new Array(Lang[local]['ge6'], 1000, 300, 350, 70, 1720);
  einheit[volk][7] = new Array(Lang[local]['ge7'], 900, 1200, 600, 60, 2760);
  einheit[volk][8] = new Array(Lang[local]['ge8'], 35500, 26600, 25000, 27200, 114300);
  einheit[volk][9] = new Array(Lang[local]['ge9'], 7200, 5500, 5800, 6500, 25000);
}

//Unicode characters and other characters

var summenzeichen = '\u99';
var fragezeichen  = '?';


//Variables

var vorrat = new Array();
var lager = new Array();
var elAllDiv, newTABLE, newTEXT, newTR, newTD, newB, newBR;


// Features

function seite() {return window.location.pathname.substr(window.location.pathname.indexOf(fragezeichen)+1);}
// provides the referring site, without parameters

function seite_parameter() {return window.location.href.substr(window.location.href.indexOf(fragezeichen)+1);}
// provides the parameters of the referring page

function contains(a,b) { return (a.indexOf(b) != -1) }
// returns true if b is contained in a

function maxValue (arr) {
// returns the index number of the elmentem in the array 'arr' with the largest wert
  var maxV;
  if (arr.length > 0) { // If the array contains any elements
    maxV = 0;
    for (i = 1; i < arr.length; i++) {
      if (arr[i]>arr[maxV]) { maxV = i; }
    }
  } else {
    maxV = null
  }
  return maxV;  
}

function language() {
// provides the 'language' = XXX server address travian.XXX
  var host = window.location.host;
  var sprache = host.substr(host.indexOf('travian.')+8)
  if (Lang[sprache] == null) { sprache = 'com' }
  // if no translation exists for this server -> English
  return sprache;
}

function ressisAuslesen() {
// analyzes the original page and read the existing Ressis
  var elAllTD, kn;
  var cnt = 0;   // Counts the found Ressi species (max = 4: WoodLehm, Eisen, Getreide)
  vorrat[4] = 0; // the sum total here is going to come

  var elAllTD = document.getElementsByTagName('TD');
  for ( i=0; ((i<elAllTD.length) && (cnt<4));i++ ) { 
                              // Examine all the TD elements, until all 4 Ressi-Arten gefunden wurden
    kn = elAllTD[i].firstChild;
    while ((kn != null) && (cnt<4)){
      if (kn.nodeType == 3) { // if there is a text node
        zeile = kn.data;
        if (contains(zeile,'/')) { 
          vorrat[cnt] = parseInt(zeile.substr(0,zeile.indexOf('/')));
          lager[cnt] = parseInt(zeile.substr(zeile.indexOf('/')+1));            
          vorrat[4] += vorrat[cnt];
          cnt += 1;
        }
      }
      kn = kn.nextSibling;
    }
  }
}

function insertTruppenLink(v,nr,elt,addy) {
// Adds a Link
  var setupLink = document.createElement('A');
  setupLink.innerHTML = '<font size="-2"> (' + berechneAnzahl(v, nr, vorrat[4])  + ') ' + einheit[v][nr][0]+'</FONT>';
  setupLink.setAttribute("href", '#');
  setupLink.addEventListener("click", function() {berechneRessis (v, nr, vorrat[4]);},false);

  newIMG = document.createElement('IMG');
  newIMG.src = 'http://help.travian.com/img/un/u/' + parseInt(addy) + '.gif';

  newBR = document.createElement('BR');

  elt.appendChild(newIMG);
  elt.appendChild(setupLink);
  elt.appendChild(newBR);
}

function insertRessiLink(r, elt) {
// Adds a Link
  var setupLink = document.createElement('A');
  setupLink.innerHTML = '<font size="-2"> ' + Lang[language()]['re' + r] + '</FONT>';
  setupLink.setAttribute("href", '#');
  setupLink.addEventListener("click", function() {setRessisRessi(r-1,vorrat[4]);},false);

  newIMG = document.createElement('IMG');
  newIMG.src = '/img/un/r/'+ r +'.gif';

  newBR = document.createElement('BR');

  elt.appendChild(newIMG);
  elt.appendChild(setupLink);
  elt.appendChild(newBR);
  
}

function berechneAnzahl(v, nr, sum) {
// the maximum number of troops to be created
  var anzahl;
  anzahl = (sum / einheit[v][nr][5]);
  for (i=0; i<4; i++) {
    if ((anzahl * einheit[v][nr][i+1]) > lager[i]) {
      anzahl = lager[i] / einheit[v][nr][i+1];
    }
  }
  anzahl = Math.floor(anzahl)
  return anzahl
}

function setRessis (v, nr, anzahl, sum) {
  var rest = sum;
  var tmpRes = new Array(0,0,0,0);
  var resObj=document.getElementsByName("m2[]");
  var vorzeichen = '';
  for (i=0; i<4; i++) {
    tmpRes[i] = anzahl * einheit[v][nr][i+1]
    rest = rest - tmpRes[i];
  }

  // divide the remaining ressis
  while (rest > 0) {
    for (i=0; i<4;i++) {
      if (tmpRes[i] < lager[i]) {
        tmpRes[i] += 1;
        rest -= 1;
      }
    }
  }
  
  for (i=0; i<4; i++) {
    resObj[i].value = tmpRes[i];
    if ((tmpRes[i] - vorrat[i]) > 0) {vorzeichen = '+'} else {vorzeichen = ''}
    document.getElementById("diff"+i).innerHTML= vorzeichen + (tmpRes[i] - vorrat[i]);
  }
}

function setRessisRessi (r, sum) {
  var rest = sum;
  var tmpRes = new Array(0,0,0,0);
  var resObj=document.getElementsByName("m2[]");
  var vorzeichen = '';

  for (i=0; i<4; i++) { tmpRes[i] = 0}

  if (rest > lager[r]) {
    tmpRes[r] = lager[r]; 
    rest -= lager[r]
  } else {
    tmpRes[r] = rest;
    rest = 0;
  }

  // divide the remaining ressis
  while (rest > 0) {
    for (i=0; i<4;i++) {
      if (tmpRes[i] < lager[i]) {
        tmpRes[i] += 1;
        rest -= 1;
      }
    }
  }
  
  for (i=0; i<4; i++) {
    resObj[i].value = tmpRes[i];
    if ((tmpRes[i] - vorrat[i]) > 0) {vorzeichen = '+'} else {vorzeichen = ''}
    document.getElementById("diff"+i).innerHTML= vorzeichen + (tmpRes[i] - vorrat[i]);
  }
  
  document.getElementById("remain").innerHTML=0;
  document.getElementById("submitText").innerHTML="";
  document.getElementById("submitButton").style.display="block";
}

function berechneRessis (v, nr, sum) {
// calculates the individual Ressis for the maximum number of erschaffenden Truppen
  setRessis(v, nr, berechneAnzahl(v, nr, sum), sum);
  document.getElementById("newsum").innerHTML=sum;
  document.getElementById("remain").innerHTML=0;
  document.getElementById("submitText").innerHTML="";
  document.getElementById("submitButton").style.display="block";
}

function generiereNPCEintrag() {
// creates the entry on the page 
  elAllDiv = document.getElementsByTagName('P');
                     // all P elements are found

  for ( i=0; i<elAllDiv.length; i++ ) {
    if (i == 0 ) { elAllDiv[i].parentNode.removeChild(elAllDiv[i]); }
    if (i == 2 ) {
      elAllDiv[i].innerHTML = '';

      newDIVall = document.createElement('DIV');
      elAllDiv[i].parentNode.insertBefore(newDIVall, elAllDiv[i]); 

// Table
      newBR = document.createElement('BR');
      newDIVall.appendChild(newBR);

      newDIV = document.createElement('DIV');
      newDIV.className = 'f10 b';
      newDIVall.appendChild(newDIV);

      newTABLE = document.createElement('TH');
      newTABLE.setAttribute("style", "font-size:10pt; color:red");
      newTABLE.className = 'f10';
      newDIVall.appendChild(newTABLE);

      newTR = document.createElement('TR');
      newTABLE.appendChild(newTR);

// Roemer
      newTD = document.createElement('TD');
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(Lang[language()]['ro_']);
      newB.appendChild(newTEXT);
      newTD.appendChild(newB);

      newBR = document.createElement('BR');
      newTD.appendChild(newBR);

      for (j=0;j<10;j++) {insertTruppenLink('roemer',j,newTD,j+1);}

// Gauls
      newTD = document.createElement('TD');
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(Lang[language()]['ga_']);
      newB.appendChild(newTEXT);
      newTD.appendChild(newB);

      newBR = document.createElement('BR');

      newTD.appendChild(newBR);

      for (j=0;j<10;j++) {insertTruppenLink('gallier',j,newTD,j+21);}

// Teutons
      newTD = document.createElement('TD');
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(Lang[language()]['ge_']);
      newB.appendChild(newTEXT);
      newTD.appendChild(newB);

      newBR = document.createElement('BR');
      newTD.appendChild(newBR);

      for (j=0;j<10;j++) {insertTruppenLink('germanen',j,newTD,j+11);}
      
// Commodities
      newTD = document.createElement('TD');
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(Lang[language()]['res']);
      newB.appendChild(newTEXT);
      newTD.appendChild(newB);

      newBR = document.createElement('BR');
      newTD.appendChild(newBR);

      insertRessiLink(1,newTD);
      insertRessiLink(2,newTD);
      insertRessiLink(3,newTD);
      insertRessiLink(4,newTD);
    }
  }
}

function generiereNPCLink() {
// Creates the link in the menu bar
  elAllDiv = document.getElementsByTagName('A');
  newA = document.createElement('A');
  newA.href = '/build.php?gid=17&t=3';
  newA.innerHTML = Lang[language()]['npc'];
  newA.setAttribute("style", "font-size:10pt; color:Blue");
  elAllDiv[12].parentNode.insertBefore(newA, elAllDiv[12]); 
}
	//check if NPC page
	function isThisNPC()  {
		//var retValue = xpathResultEvaluate('//table[@id="npc"] | //tr[@class="rbg"]/td[@colspan="5"]').snapshotLength == 1 && document.getElementsByName('m2[]').length == 4;
		//if (retValue == false) retValue = document.getElementsByName("m2[]").length == 4;
		//return retValue;
		return xpathResultEvaluate('//table[@id="npc"] | //tr[@class="rbg"]/td[@colspan="5"]').snapshotLength == 1 && document.getElementsByName('m2[]').length == 4;
	}
	
	//check if NPC excluded
	function isThisNPCexcluded() {
		return (TB3O.boolUseNPCAssistant != '1' ||
			TB3O.boolIsThisNPC == true ||
			crtPage.indexOf("build.php") == -1 ||
			crtPage.match(/build.php\?(.*)&t=(\d+)/) != null ||
			get("map1") != null || find("//map[@name='map1']", XPFirst) != null);
	}

	//check if we are on the page where the NPC trade has been finished
	function boolIsThisPostNPC() {
		var xp = xpathResultEvaluate('//p/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[@class="res"]');
		return (xp.snapshotLength == 8);
	}

	//insert the NPC assistant back link
	function insertNPCHistoryLink() {
		var bname = getQueryParameters(urlNow, NPCbacklinkName);
		if (!bname) bname = "Go back";
		var div = get(dmid2);
		div.innerHTML += '<p>&nbsp;<a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a></p>';
	}

	//fill in the NPC Merchant fields
	function fillinNPCfields(aURL) {
		if (aURL.indexOf('&' + NPCResources) != NPCURL.length) return false;
		var needed = getQueryParameters(aURL, NPCResources).split(',');
		var inputs = document.getElementsByName('m2[]');
		for (var i = 0; i < 4; i++) {inputs[i].value = needed[i];}
		unsafeWindow.calculateRest();
	}

// Main

einheitenFestlegen(language());
if (seite() != '/') { // z.b. www.travian.de
  generiereNPCLink();
}
if (contains(seite_parameter(),'&t=3')) {
  ressisAuslesen();
  generiereNPCEintrag();
}      
