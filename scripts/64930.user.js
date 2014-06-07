// ==UserScript==
// @name          Travian NPC-AddIn 
// @version       1.0.0
// @namespace     http://travian.com.sa
// @description   Add-in for the NPC merchant
// @author        edited by soul eater
/////////////////////////////////////////////////////////////////////////////
// @include       http://*.travian.*/dorf*
// @include       http://travian.*/dorf*
// @include       http://*.travian.*/build*
// @include       http://travian.*/build*
// @include       http://*.travian.*/spieler*
// @include       http://travian.*/spieler*
// @include       http://*.travian.*/plus*
// @include       http://travian.*/plus*
// @include       http://*.travian.*/allianz*
// @include       http://travian.*/allianz*
// @include       http://*.travian.*/nachrichten*
// @include       http://travian.*/nachrichten*
// @include       http://*.travian.*/berichte*
// @include       http://travian.*/berichte*
/////////////////////////////////////////////////////////////////////////////
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////
// Einstellung der Sprachen abhaengig vom Server
///////////////////////////////////////////////////////////////////////////////

var localStr   = new Array();
var country;


// ----------
// Sa Arabic
// ----------
country = 'com.sa';
localStr[country] = new Array();
localStr[country]['npc'] = 'تاجر المبادلة';

localStr[country]['res'] = 'الموارد';
localStr[country]['re1'] = 'الخشب';
localStr[country]['re2'] = 'الطين';
localStr[country]['re3'] = 'الحديد';
localStr[country]['re4'] = 'القمح';

localStr[country]['ro_'] = 'الرومان';
localStr[country]['ro0'] = 'جندي أول';
localStr[country]['ro1'] = 'حراس الأمبراطور';
localStr[country]['ro2'] = 'جندي مهاجم';
localStr[country]['ro3'] = 'فرقة تجسس';
localStr[country]['ro4'] = 'سلاح الفرسان';
localStr[country]['ro5'] = 'فرسان قيصر';
localStr[country]['ro6'] = 'كبش';
localStr[country]['ro7'] = 'المقاليع النارية';
localStr[country]['ro8'] = 'حكيم';
localStr[country]['ro9'] = 'مستوطن';

localStr[country]['ga_'] = 'الأغريق';
localStr[country]['ga0'] = 'الكتيبه';
localStr[country]['ga1'] = 'مبارز';
localStr[country]['ga2'] = 'المستكشف';
localStr[country]['ga3'] = 'رعد الجرمان';
localStr[country]['ga4'] = 'فرسان السلت';
localStr[country]['ga5'] = 'فرسان الهيدوانر';
localStr[country]['ga6'] = 'محطمة الابواب الخشبية';
localStr[country]['ga7'] = 'المقلاع الحربي';
localStr[country]['ga8'] = 'رئيس';
localStr[country]['ga9'] = 'مستوطن';

localStr[country]['ge_'] = 'الجرمان';
localStr[country]['ge0'] = 'مقاتل بهراوة';
localStr[country]['ge1'] = 'مقاتل برمح';
localStr[country]['ge2'] = 'مقاتل بفأس';
localStr[country]['ge3'] = 'الكشاف';
localStr[country]['ge4'] = 'مقاتل القيصر';
localStr[country]['ge5'] = 'فرسان الجرمان';
localStr[country]['ge6'] = 'محطمة الابواب';
localStr[country]['ge7'] = 'المقلاع';
localStr[country]['ge8'] = 'الزعيم';
localStr[country]['ge9'] = 'مستوطن';

// ----------
// com english
// ----------
country = 'com';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC merchant';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romans';
localStr[country]['ro0'] = 'Legionnaire';
localStr[country]['ro1'] = 'Praetorian';
localStr[country]['ro2'] = 'Imperian';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Battering Ram';
localStr[country]['ro7'] = 'Fire Catapult';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Settler';

localStr[country]['ga_'] = 'Gauls';
localStr[country]['ga0'] = 'Phalanx';
localStr[country]['ga1'] = 'Swordsman';
localStr[country]['ga2'] = 'Pathfinder';
localStr[country]['ga3'] = 'Theutates Thunder';
localStr[country]['ga4'] = 'Druidrider';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'Ram';
localStr[country]['ga7'] = 'Trebuchet';
localStr[country]['ga8'] = 'Chiefain';
localStr[country]['ga9'] = 'Settler';

localStr[country]['ge_'] = 'Teutons';
localStr[country]['ge0'] = 'Clubswinger';
localStr[country]['ge1'] = 'Spearman';
localStr[country]['ge2'] = 'Axeman';
localStr[country]['ge3'] = 'Scout';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Teutonic Knight';
localStr[country]['ge6'] = 'Ram';
localStr[country]['ge7'] = 'Catapult';
localStr[country]['ge8'] = 'Chieftain';
localStr[country]['ge9'] = 'Settler';


///////////////////////////////////////////////////////////////////////////////
// Units: name, cost of wood / clay / iron / Cereals, total
///////////////////////////////////////////////////////////////////////////////
var einheit = new Array();

function einheitenFestlegen(country) {
  var volk = 'roemer';
  einheit[volk]   = new Array();
  einheit[volk][0]= new Array(localStr[country]['ro0'],120,100,180,40,440);
  einheit[volk][1]= new Array(localStr[country]['ro1'],100,130,160,70,460);
  einheit[volk][2]= new Array(localStr[country]['ro2'],150,160,210,80,600);
  einheit[volk][3]= new Array(localStr[country]['ro3'],140,160,20,40,360);
  einheit[volk][4]= new Array(localStr[country]['ro4'],550,440,320,100,1410);

  einheit[volk][5]= new Array(localStr[country]['ro5'],550,640,800,180,2170);
  einheit[volk][6]= new Array(localStr[country]['ro6'],900,360,500,70,1830);
  einheit[volk][7]= new Array(localStr[country]['ro7'],950,1350,600,90,2990);
  einheit[volk][8]= new Array(localStr[country]['ro8'],30750,27200,45000,37500,140450);
  einheit[volk][9]= new Array(localStr[country]['ro9'],5800,5300,7200,5500,23800);

  volk = 'gallier';
  einheit[volk]   = new Array();
  einheit[volk][0]= new Array(localStr[country]['ga0'],100,130,55,30,315);
  einheit[volk][1]= new Array(localStr[country]['ga1'],140,150,185,60,535);
  einheit[volk][2]= new Array(localStr[country]['ga2'],170,150,20,40,380);
  einheit[volk][3]= new Array(localStr[country]['ga3'],350,450,230,60,1090);
  einheit[volk][4]= new Array(localStr[country]['ga4'],360,330,280,120,1090);
  einheit[volk][5]= new Array(localStr[country]['ga5'],500,620,675,170,1965);
  einheit[volk][6]= new Array(localStr[country]['ga6'],950,555,330,75,1910);
  einheit[volk][7]= new Array(localStr[country]['ga7'],960,1450,630,90,3130);
  einheit[volk][8]= new Array(localStr[country]['ga8'],30750,45400,31000,37500,144650);
  einheit[volk][9]= new Array(localStr[country]['ga9'],5500,7000,5300,4900,22700);

  volk = 'germanen';
  einheit[volk]   = new Array();
  einheit[volk][0]= new Array(localStr[country]['ge0'],95,75,40,40,250);
  einheit[volk][1]= new Array(localStr[country]['ge1'],145,70,85,40,340);
  einheit[volk][2]= new Array(localStr[country]['ge2'],130,120,170,70,490);
  einheit[volk][3]= new Array(localStr[country]['ge3'],160,100,50,50,360);
  einheit[volk][4]= new Array(localStr[country]['ge4'],370,270,290,75,1005);
  einheit[volk][5]= new Array(localStr[country]['ge5'],450,515,480,80,1525);
  einheit[volk][6]= new Array(localStr[country]['ge6'],1000,300,350,70,1720);
  einheit[volk][7]= new Array(localStr[country]['ge7'],900,1200,600,60,2760);
  einheit[volk][8]= new Array(localStr[country]['ge8'],35500,26600,25000,27200,114300);
  einheit[volk][9]= new Array(localStr[country]['ge9'],7200,5500,5800,6500,25000);
}

///////////////////////////////////////////////////////////////////////////////
// Unicode characters and other characters
///////////////////////////////////////////////////////////////////////////////
var summenzeichen = '\u2211';
var fragezeichen  = '?';


///////////////////////////////////////////////////////////////////////////////
// Variables
///////////////////////////////////////////////////////////////////////////////
var vorrat = new Array();
var lager = new Array();
var elAllDiv, newTABLE, newTEXT, newTR, newTD, newB, newBR;


///////////////////////////////////////////////////////////////////////////////
// Features
///////////////////////////////////////////////////////////////////////////////
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
  if (localStr[sprache] == null) {sprache = 'com'}
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
  newIMG.src = 'http://help.travian.de/images/troops/tid'+ parseInt(addy) +'.gif';

  newBR = document.createElement('BR');

  elt.appendChild(newIMG);
  elt.appendChild(setupLink);
  elt.appendChild(newBR);
}

function insertRessiLink(r, elt) {
// Adds a Link
  var setupLink = document.createElement('A');
  setupLink.innerHTML = '<font size="-2"> '+ localStr[language()]['re'+r] +'</FONT>';
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
      newTABLE.setAttribute("style", "font-size:10pt; color:blue");
      newTABLE.className = 'f10';
      newDIVall.appendChild(newTABLE);

      newTR = document.createElement('TR');
      newTABLE.appendChild(newTR);

// Roemer
      newTD = document.createElement('TD');
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(localStr[language()]['ro_']);
      newB.appendChild(newTEXT);
      newTD.appendChild(newB);

      newBR = document.createElement('BR');
      newTD.appendChild(newBR);

      for (j=0;j<10;j++) {insertTruppenLink('roemer',j,newTD,j+1);}

// Gauls
      newTD = document.createElement('TD');
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(localStr[language()]['ga_']);
      newB.appendChild(newTEXT);
      newTD.appendChild(newB);

      newBR = document.createElement('BR');

      newTD.appendChild(newBR);

      for (j=0;j<10;j++) {insertTruppenLink('gallier',j,newTD,j+21);}

// Teutons
      newTD = document.createElement('TD');
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(localStr[language()]['ge_']);
      newB.appendChild(newTEXT);
      newTD.appendChild(newB);

      newBR = document.createElement('BR');
      newTD.appendChild(newBR);

      for (j=0;j<10;j++) {insertTruppenLink('germanen',j,newTD,j+11);}
      
// Commodities
      newTD = document.createElement('TD');
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(localStr[language()]['res']);
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
  newA.innerHTML = localStr[language()]['npc'];
  newA.setAttribute("style", "font-size:10pt; color:Red");
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

///////////////////////////////////////////////////////////////////////////////
// Main
///////////////////////////////////////////////////////////////////////////////

einheitenFestlegen(language());
if (seite() != '/') { // z.b. www.travian.de
  generiereNPCLink();
}
if (contains(seite_parameter(),'&t=3')) {
  ressisAuslesen();
  generiereNPCEintrag();
}      
