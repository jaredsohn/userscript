// ==UserScript==
// @name          (T4.5)مبادله گر تراوین نسخه
// @version       4.0.0
// @namespace     http://travian.هق
// @description   افزودن برای مبادلات
// @author        Dream1
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
// ae FARSI
// ----------
country = 'FR';
localStr[country] = new Array();
localStr[country]['npc'] = 'مبادله تاجرها';

localStr[country]['res'] = 'موارد';
localStr[country]['re1'] = 'چوب';
localStr[country]['re2'] = 'خشت';
localStr[country]['re3'] = 'آهن';
localStr[country]['re4'] = 'گندوم';

localStr[country]['ro_'] = 'نژاد رومن';
localStr[country]['ro0'] = 'سرباز لژیون';
localStr[country]['ro1'] = 'محافظ';
localStr[country]['ro2'] = 'شمشیرزن';
localStr[country]['ro3'] = 'جاسوس';
localStr[country]['ro4'] = 'شوالیه';
localStr[country]['ro5'] = 'شوالیه سزار';
localStr[country]['ro6'] = 'دژکوب';
localStr[country]['ro7'] = 'منجنیق';
localStr[country]['ro8'] = 'سناتور';
localStr[country]['ro9'] = 'هیروی رومی';

localStr[country]['ga_'] = 'نژاد گول';
localStr[country]['ga0'] = 'سرباز پیاده';
localStr[country]['ga1'] = 'شمشیرزن';
localStr[country]['ga2'] = 'جاسوس گول';
localStr[country]['ga3'] = 'سرباز رعد';
localStr[country]['ga4'] = 'کاهن سواره';
localStr[country]['ga5'] = 'شوالیه گول';
localStr[country]['ga6'] = 'دژکوب';
localStr[country]['ga7'] = 'منجنیق';
localStr[country]['ga8'] = 'رئيس';
localStr[country]['ga9'] = 'هیروی گول';

localStr[country]['ge_'] = 'نژاد توتون';
localStr[country]['ge0'] = 'گرزدار';
localStr[country]['ge1'] = 'نیزه دار';
localStr[country]['ge2'] = 'تبرزن';
localStr[country]['ge3'] = 'ردیاب';
localStr[country]['ge4'] = 'دلاور';
localStr[country]['ge5'] = 'شولیه توتون';
localStr[country]['ge6'] = 'دژکوب';
localStr[country]['ge7'] = 'منجنیق';
localStr[country]['ge8'] = 'رئیس';
localStr[country]['ge9'] = 'هیروی توتون';

// ----------
// com english
// ----------
country = 'com';
localStr[country] = new Array();
localStr[country]['npc'] = 'مبادله گر تاجرها';

localStr[country]['res'] = 'منابع';
localStr[country]['re1'] = 'چوب';
localStr[country]['re2'] = 'خشت';
localStr[country]['re3'] = 'آهن';
localStr[country]['re4'] = 'گندوم';

localStr[country]['ro_'] = 'نژاد روم';
localStr[country]['ro0'] = 'سرباز لژیون';
localStr[country]['ro1'] = 'محافظ';
localStr[country]['ro2'] = 'شمشیرزن';
localStr[country]['ro3'] = 'جاسوس رومی';
localStr[country]['ro4'] = 'شوالیه';
localStr[country]['ro5'] = 'شوالیه سزار';
localStr[country]['ro6'] = 'دژکوب';
localStr[country]['ro7'] = 'منجنیق آتشین';
localStr[country]['ro8'] = 'سناتور';
localStr[country]['ro9'] = 'مهاجر رومی';

localStr[country]['ga_'] = 'نژاد گول';
localStr[country]['ga0'] = 'سربازپیاده';
localStr[country]['ga1'] = 'شمشیرزن گول';
localStr[country]['ga2'] = 'جاسوس گول';
localStr[country]['ga3'] = 'سرباز رعد';
localStr[country]['ga4'] = 'کاهن سواره';
localStr[country]['ga5'] = 'شوالیه گول';
localStr[country]['ga6'] = 'دژکوب';
localStr[country]['ga7'] = 'منجنیق';
localStr[country]['ga8'] = 'رئیس';
localStr[country]['ga9'] = 'مهاجر گول';

localStr[country]['ge_'] = 'نژاد توتون';
localStr[country]['ge0'] = 'گرزدار';
localStr[country]['ge1'] = 'نیزه دار';
localStr[country]['ge2'] = 'تبرزن';
localStr[country]['ge3'] = 'ردیاب توتونی';
localStr[country]['ge4'] = 'دلاور';
localStr[country]['ge5'] = 'شوالیه گول';
localStr[country]['ge6'] = 'دژکوب';
localStr[country]['ge7'] = 'منجنیق';
localStr[country]['ge8'] = 'رئیس';
localStr[country]['ge9'] = 'مهاجر توتونی';


///////////////////////////////////////////////////////////////////////////////
// Einheiten: Name, Kosten Holz/Lehm/Eisen/Getreide, Gesamtkosten
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
// Unicode Sonderzeichen und sonstige Zeichen
///////////////////////////////////////////////////////////////////////////////
var summenzeichen = '\u2211';
var fragezeichen  = '?';


///////////////////////////////////////////////////////////////////////////////
// Variablen
///////////////////////////////////////////////////////////////////////////////
var vorrat = new Array();
var lager = new Array();
var elAllDiv, newTABLE, newTEXT, newTR, newTD, newB, newBR;


///////////////////////////////////////////////////////////////////////////////
// Funktionen
///////////////////////////////////////////////////////////////////////////////
function seite() {return window.location.pathname.substr(window.location.pathname.indexOf(fragezeichen)+1);}
// liefert die aufgerufene seite ohne parameter

function seite_parameter() {return window.location.href.substr(window.location.href.indexOf(fragezeichen)+1);}
// liefert die parameter der aufgerufene seite 

function contains(a,b) { return (a.indexOf(b) != -1) }
// liefert true, wenn b in a enthalten ist

function maxValue (arr) {
// liefert die indexnummer des elmentes im array 'arr' mit dem groessten wert
  var maxV;
  if (arr.length > 0) { // wenn das array ueberhaupt elemente enthaelt
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
// liefert die 'Sprache' XXX = Server-Adresse travian.XXX
  var host = window.location.host;
  var sprache = host.substr(host.indexOf('travian.')+8)
  if (localStr[sprache] == null) {sprache = 'com'}
  // falls noch keine Uebersetzung fuer diesen Server vorliegt -> English
  return sprache;
}

function ressisAuslesen() {
// analysiert die Original-Seite und liest die vorhandenen Ressis ein
  var elAllTD, kn;
  var cnt = 0;   // Zaehlt die gefundenen Ressi-Arten (max = 4: Holz, Lehm, Eisen, Getreide)
  vorrat[4] = 0; // hier kommt die Gesamtsumme rein

  var elAllTD = document.getElementsByTagName('TD');
  for ( i=0; ((i<elAllTD.length) && (cnt<4));i++ ) { 
                              // untersuche alle TD-Elemente, bis alle 4 Ressi-Arten gefunden wurden
    kn = elAllTD[i].firstChild;
    while ((kn != null) && (cnt<4)){
      if (kn.nodeType == 3) { // falls es ein Text-Knoten ist
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
// fuegt einen Link ein
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
// fuegt einen Link ein
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
// die maximale Anzahl der zu erschaffenden Truppen
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

  // die restlichen ressis aufteilen
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

  // die restlichen ressis aufteilen
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
// berechnet die einzelnen Ressis fuer die maximale Anzahl der zu erschaffenden Truppen
  setRessis(v, nr, berechneAnzahl(v, nr, sum), sum);
  document.getElementById("newsum").innerHTML=sum;
  document.getElementById("remain").innerHTML=0;
  document.getElementById("submitText").innerHTML="";
  document.getElementById("submitButton").style.display="block";
}

function generiereNPCEintrag() {
// erzeugt den Eintrag auf der Seite 
  elAllDiv = document.getElementsByTagName('P');
                     // alle P Elemente finden

  for ( i=0; i<elAllDiv.length; i++ ) {
    if (i == 0 ) { elAllDiv[i].parentNode.removeChild(elAllDiv[i]); }
    if (i == 2 ) {
      elAllDiv[i].innerHTML = '';

      newDIVall = document.createElement('DIV');
      elAllDiv[i].parentNode.insertBefore(newDIVall, elAllDiv[i]); 

// Tabelle
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

// Gallier
      newTD = document.createElement('TD');
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(localStr[language()]['ga_']);
      newB.appendChild(newTEXT);
      newTD.appendChild(newB);

      newBR = document.createElement('BR');

      newTD.appendChild(newBR);

      for (j=0;j<10;j++) {insertTruppenLink('gallier',j,newTD,j+21);}

// Germanen
      newTD = document.createElement('TD');
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(localStr[language()]['ge_']);
      newB.appendChild(newTEXT);
      newTD.appendChild(newB);

      newBR = document.createElement('BR');
      newTD.appendChild(newBR);

      for (j=0;j<10;j++) {insertTruppenLink('germanen',j,newTD,j+11);}
      
// Rohstoffe
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
// erzeugt den Link in der Menu-Leiste
  elAllDiv = document.getElementsByTagName('A');
  newA = document.createElement('A');
  newA.href = '/build.php?gid=17&t=3';
  newA.innerHTML = localStr[language()]['npc'];
  newA.setAttribute("style", "font-size:10pt; color:Red");
  elAllDiv[12].parentNode.insertBefore(newA, elAllDiv[12]); 
}

///////////////////////////////////////////////////////////////////////////////
// Hauptprogramm
///////////////////////////////////////////////////////////////////////////////

einheitenFestlegen(language());
if (seite() != '/') { // z.b. www.travian.de
  generiereNPCLink();
}
if (contains(seite_parameter(),'&t=3')) {
  ressisAuslesen();
  generiereNPCEintrag();
}      
