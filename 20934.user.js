// ==UserScript==
// @name           Ryanair
// @author         Paul Lenz
// @description    Search for Ryanair destinations reached by 2 flights on 1 day
// @include        http://www.ryanair.com/*
// @include        http://www.bookryanair.com/*
// ==/UserScript==

// INSTRUCTIONS
// ============
// This GreaseMonkey script collects all destinations which can be reached by two flights with Ryanair
// from a selected start airport in one day.
// This means, it should be possible to fly from A to B and later on the same day from B to C
// and on another day it should be possible to fly back from C to A via B on the same day.
// This script considers at least 90 minutes in B for leaving the first plane and check in for the second flight.
//
// USE:
// Go to www.ryanair.com and click on "Timetables". If the script is correctly installed,
// you will find a new button "Select Start Location and Dates for Spidering!"
// Select these items, the button will turn orange, click it and wait...


// ANWEISUNGEN
// ===========
// Dieses GreaseMonkey-Script sammelt alle Ziele, die durch zwei Flüge mit Ryanair von einem
// ausgewählten Startflughafen an einem Tag erreicht werden können.
// Das bedeutet, dass es möglich sein muss, von A nach B zu fliegen und später am selben Tag
// von B nach C, und an einem anderen Tag muss es möglich sein, von C nach A vie B zurück zu fliegen.
// Dieses Script berücksichtigt mindestens 90 Minuten zum Verlassen des ersten Fliegers und zum
// Einchecken für den zweiten Flug.
//
// BENUTZUNG:
// www.ryanair.de aufrufen und auf "Flugpläne" klicken. Wenn das Script richtig installiert wurde,
// erscheint dort ein neuer Button "Wählen Sie Abflughafen und Daten zum Durchsuchen!"
// Wählen Sie die gewünschten Daten aus, der Button wird orange, klicken Sie ihn und warten Sie...

//               Script written by Paul Lenz 22.1.2008            paul@lenz-online.de
//
// ########################################################################################################


var checktime    =  90;      // Checkin Time (minutes)
var locations    = 200;      // alle Flugplätze
var destinations = 120;      // max. Ziele pro Flughafen

msg = new Array(15);
for (var i = 0; i < 2; i++) {msg[i] = new Array(9)}
msg[0][0] = "Select Start Location and Dates for Spidering!";
msg[1][0] = "Wählen Sie Abflughafen und Daten zum Durchsuchen!";
msg[0][1] = "Spider all flights from ";
msg[1][1] = "Untersuche alle Flüge von ";
msg[0][2] = "checking ";
msg[1][2] = "überprüfe ";
msg[0][3] = " fom ";
msg[1][3] = " von ";
msg[0][4] = " via ";
msg[1][4] = " via ";
msg[0][5] = " to ";
msg[1][5] = " nach ";
msg[0][6] = "skipping ";
msg[1][6] = "überspringe ";
msg[0][7] = "Spidering finished, all flights checked.";
msg[1][7] = "Untersuchung beendet, alle Flüge untersucht.";
msg[0][8] = "Spidering stopped.";
msg[1][8] = "Untersuchung gestoppt.";
msg[0][9] = " trips";
msg[1][9] = " Reisen";
msg[0][10] = "1 trip";
msg[1][10] = "1 Reise";
msg[0][11] = "No trips";
msg[1][11] = "Keine Reisen";
msg[0][12] = " found.";
msg[1][12] = " gefunden.";
msg[0][13] = "Ryanair Destinations found:";
msg[1][13] = "Ryanair-Ziele gefunden:";
msg[0][14] = "Skip this \"via\"";
msg[1][14] = "Dieses \"via\" überspringen";
msg[0][15] = "Stop";
msg[1][15] = "Stop";
lng = 0;                                                  // English
if (document.URL.indexOf("site\/DE") > 0) {lng = 1}       // Deutsch


loc = new Array(locations);
for (var lc = 0; lc < locations; lc++) {loc[lc] = new Array(destinations)}
erg = new Array(9);          // Ergebnisse
zeit = 0;

if (document.URL.match(/bookryanair/)) {window.setTimeout(function() { readTimes() }, 1000)}


if (document.URL.match(/sched\.php/) < 1) {return}


if (document.referrer.match(/sched\.php/) < 1)    // New start of program
{
  GM_setValue("RyanSpider", "Step0");
}

switch(GM_getValue("RyanSpider"))
{
  case "Step0":
    Prepare(1);
    zeit = window.setInterval(function() { getStartLoc() }, 100);
    break;
  case "Step1":
    initSpider();
    tryNextFlights();
    break;
}



//###################################################################################
//### functions for www.ryanair.com                                               ###
//###################################################################################


function Prepare(neu)
{
  var fo;
  for (var i = 0; i < 10; i++)
  {
    var inv = document.forms[i];
    if (inv && inv.name == "sched") {fo = inv}
  }
  var ta = fo.firstChild;
  var tb = ta.firstChild;
  var newtr = document.createElement("tr");
  var newtd = document.createElement("td");
  var newfo = document.createElement("form");
  var newin = document.createElement("input");
  tb.appendChild(newtr);
  newtr.appendChild(newtd);
  newtd.appendChild(newfo);
  newtd.setAttribute("colspan", "2");
  newtd.setAttribute("align", "center");
  newfo.appendChild(newin);
  newin.setAttribute("type",  "submit");
  newin.setAttribute("value", msg[lng][0]);
  newin.setAttribute("name",  "spiderbutton");
  newin.setAttribute("class", "submitlg");
  newin.setAttribute("style", "width: 100%; height:25px");
  newin.setAttribute("disabled", "true");
  if (neu > 0)
  {
    newin.style.backgroundColor = "#EE7700";
    GM_setValue("Startplatz", "#EE7700");
    zeit = window.setTimeout(function() { fade() }, 1000);
  }
  else
  {
    newin.style.backgroundColor = "#DDBB99";
  }
  GM_setValue("Flug", "");
}



window.getStartLoc = function()
{
  var ti;
  var orig = document.getElementsByName("sector1_o")[1];
  var dest = document.getElementsByName("sector1_d")[1];
  var bu = document.getElementsByName("spiderbutton")[0];
  var oval = orig.value;
  //  Orign selected AND Dest List is updated
  if (oval == "XXX" || dest.length == orig.length) {} else
  {
    oval = getSelect(orig);
    GM_setValue("Startplatz", oval);
    GM_setValue("RyanSpider", "Step1");

    ti = document.getElementsByName("sector_1_d")[1];
    GM_setValue("Tag1", getSelect(ti));
    ti = document.getElementsByName("sector_1_m")[1];
    GM_setValue("Mon1", getSelect(ti));
    ti = document.getElementsByName("sector_2_d")[1];
    GM_setValue("Tag2", getSelect(ti));
    ti = document.getElementsByName("sector_2_m")[1];
    GM_setValue("Mon2", getSelect(ti));

    bu.setAttribute("value", msg[lng][1] + oval);
    bu.style.backgroundColor = "#EE7700";
    bu.removeAttribute("disabled");
  }
}


function initSpider()
{
  var oloc, zloc, dloc, l1, l2, d1, d2;
  makeButtons();
  getConnections();
  oloc = GM_getValue("Startplatz");
  oloc = oloc.substr(oloc.length - 4, 3);
  GM_setValue("Flug", "");
  for (d1 = 1; d1 <= loc[0][0]; d1++) {if (loc[d1][0] == oloc) {l1 = d1}}
  for (d1 = 0; d1 < loc[l1][2]; d1++)
  {
    GM_setValue("1Starts", loc[l1][2]);
    GM_setValue("1done", 0);
    zloc = loc[l1][d1 + 3];
    GM_setValue("Flug", GM_getValue("Flug") + oloc + "-" + zloc + "|");
    for (d2 = 1; d2 <= loc[0][0]; d2++) {if (loc[d2][0] == zloc) {l2 = d2}}
    for (d2 = 0; d2 < loc[l2][2]; d2++)
    {
      dloc = loc[l2][d2 + 3];
      if (dloc != oloc)
      {
        GM_setValue("Flug", GM_getValue("Flug") + zloc + "-" + dloc + "|");
      }
    }
  }
}


function getName(lnam)
{
  var nam;
  for (var i = 1; i <= loc[0][0]; i++) {if (loc[i][0] == lnam) {nam = loc[i][1]}}
  return nam;
}






function tryNextFlights()
{
  var i, sta, zil;
  var flu = GM_getValue("Flug");
  var oloc = GM_getValue("Startplatz");
  oloc = oloc.substr(oloc.length - 4, 3);
  if (flu.length > 3)
  {
    i = flu.indexOf("|");
    str = flu.substr(0, i);
    flu = flu.substr(i + 1);
    GM_setValue("Flug", flu);
    GM_setValue("Strecke", str);
    sta = str.substr(0, 3);
    zil = str.substr(4, 3);
    if (sta == oloc)
    {
      writeInfo("", 2);
      GM_setValue("Flug1Hin", "NEU");
      GM_setValue("Flug1Zur", "NEU");
      GM_setValue("Flug2Hin", "NEU");
      GM_setValue("Flug2Zur", "NEU");
      GM_setValue("1done", GM_getValue("1done") + 1);
      GM_setValue("2done", 0);
      i = flu.indexOf(oloc);
      if (i < 0) {i = flu.length}      // letztes Via
      GM_setValue("2Starts", i / 8);
      writeInfo(msg[lng][2] + GM_getValue("1done") + "/" + GM_getValue("1Starts") + msg[lng][3] + sta + msg[lng][4] + zil + ":", 1);
      writeInfo("", 3);
      zeit = window.setInterval(function() { setDesti(sta, zil) }, 1000);
    }
    else
    {
      GM_setValue("2done", GM_getValue("2done") + 1);
      if (GM_getValue("Flug1Hin") == "NEU")
      {
        writeInfo("NOfl", 2);
        writeInfo(msg[lng][6] + GM_getValue("2done") + "/" + GM_getValue("2Starts") + msg[lng][4] + sta + msg[lng][5] + zil + ":", 3);
        window.setTimeout(function() { tryNextFlights() }, 100);
      }
      else
      {
        writeInfo("OK", 2);
        writeInfo(msg[lng][2] + GM_getValue("2done") + "/" + GM_getValue("2Starts") + msg[lng][4] + sta + msg[lng][5] + zil + ":", 3);
        zeit = window.setInterval(function() { setDesti(sta, zil) }, 1000);
      }
    }
  }
  else
  {
    flu = msg[lng][7];
    if (GM_getValue("Tag1") == "stop") {flu = msg[lng][8]}
    writeInfo(flu, 1);
    writeInfo("", 2);
    i = document.getElementsByName("FlightCounter").length;
    flu = i + msg[lng][9];
    if (i < 2) {flu = msg[lng][10]}
    if (i < 1) {flu = msg[lng][11]}
    writeInfo(flu + msg[lng][12], 3);
    writeInfo("", 4);
    i = document.getElementsByName('ctrlrow')[0];
    if (i) {i.parentNode.removeChild(i)}
    GM_setValue("RyanSpider", "Step0");
    Prepare(0);
    zeit = window.setInterval(function() { getStartLoc() }, 100);
  }
}



function setDesti(org, dst)
{
  org = getName(org) + " (" + org + ")";
  dst = getName(dst) + " (" + dst + ")";
  var orig = document.getElementsByName("sector1_o")[1];
  var dest = document.getElementsByName("sector1_d")[1];
  var i;
  var ok1 = setSelect(orig, org)
  var ok2 = setSelect(dest, dst)
  if (ok1 * ok2 > 0)
  {
    window.clearInterval(zeit);
    ti = document.getElementsByName("sector_1_d")[1];
    ti.removeAttribute("onchange");
    setSelect(ti, GM_getValue("Tag1"));
    ti = document.getElementsByName("sector_1_m")[1];
    ti.removeAttribute("onchange");
    setSelect(ti, GM_getValue("Mon1"));
    ti = document.getElementsByName("sector_2_d")[1];
    ti.removeAttribute("onchange");
    setSelect(ti, GM_getValue("Tag2"));
    ti = document.getElementsByName("sector_2_m")[1];
    ti.removeAttribute("onchange");
    setSelect(ti, GM_getValue("Mon2"));
    GM_setValue("TimeRead", "WAIT");
    zeit = window.setInterval(function() { saveTime() }, 1000);
    submitclick();
  }
}




function saveTime()
{
//  writeInfo(GM_getValue("TimeRead")+" "+GM_getValue("Flug1Hin")+" "+GM_getValue("Flug2Hin")+" | "+GM_getValue("Flug2Zur")+" "+GM_getValue("Flug1Zur"));
  writeInfo(GM_getValue("TimeRead"), 4);
  var zg, tx, pl;
  switch (document.getElementsByName('control')[0].value)
  {
    case "skip":
      document.getElementsByName('control')[0].value = "";
      var flu  = GM_getValue("Flug");
      var oloc = GM_getValue("Startplatz");
      oloc = oloc.substr(oloc.length - 4, 3);
      zg = flu.indexOf(oloc);
      if (zg < 0) {GM_setValue("Flug", "")}                // skip letztes Via --> skip alles
      if (zg > 0) {GM_setValue("Flug", flu.substr(zg))}    // skip Via
      break;
    case "stop":
      GM_setValue("Flug", "");
      GM_setValue("Tag1", "stop");
      break;
  }
  if (GM_getValue("TimeRead") == "WAIT") {return}
  window.clearInterval(zeit);
  if (GM_getValue("TimeRead") == "OK" && GM_getValue("Flug2Zur") != "NEU")
  {
    erg[0] = GM_getValue("Startplatz");
    pl = GM_getValue("Strecke").substr(0, 3);
    erg[1] = getName(pl) + " (" + pl + ")";
    pl = GM_getValue("Strecke").substr(4, 3);
    erg[2] = getName(pl) + " (" + pl + ")";
    erg[3] = GM_getValue("Flug1Hin");
    erg[4] = GM_getValue("Flug2Hin");
    erg[5] = GM_getValue("Flug2Zur");
    erg[6] = GM_getValue("Flug1Zur");
    erg[7] = GM_getValue("Tag1") + ". " + GM_getValue("Mon1");
    erg[8] = GM_getValue("Tag2") + ". " + GM_getValue("Mon2");
    writeResults();
  }
  tryNextFlights();
}




function submitclick()
{
  var fo;
  for (var i = 0; i < 10; i++)
  {
    var inv = document.forms[i];
    if (inv && inv.name == "sched") {fo = inv}
  }
//  var spb = document.getElementsByName("spiderbutton")[0];
//  spb.removeAttribute("name");
//  spb.removeAttribute("value");
  var ta = fo.firstChild;
  var tb = ta.firstChild;
  var tr = tb.firstChild;
  var tr = tr.nextSibling;
  var tr = tr.nextSibling;
  var td = tr.firstChild;
  td.firstChild.click()
}


function getSelect(obj)
{
  var sel;
  for (var i = 0; i < obj.length; i++)
  {
    if (obj.options[i].selected == true) {sel = obj.options[i].text}
  }
  return sel;
}


function setSelect(obj, val)
{
  var opt = "ERROR";
  for (var i = 0; i < obj.length; i++)
  {
    if (obj.options[i].text == val)
    {
      obj.options[i].setAttribute("selected", "true");
      opt = obj.options[i].value;
    }
    else
    {
      obj.options[i].removeAttribute("selected");
    }
  }
  if (opt == "ERROR") 
  {
    return 0;
  }
  else
  {
    obj.value = opt;
    return 1;
  }
}



function getConnections()
{
  var i, sc, tx, ze, lf, l, z, p;
  if (document.URL.match(/bookryanair/)) {return}
  for (i = 0; i < document.getElementsByTagName("script").length; i++)
  {
    sc = document.getElementsByTagName("script")[i];
    tx = sc.firstChild
    if (tx) {tx = tx.data}
    if (tx && tx.indexOf("sAAR") > 0)
    {
      ze = "DUMMY";
      l = 0;
      while (ze.indexOf("STOP HIDING") < 0)
      {
        lf = tx.indexOf("\n");
        ze = tx.substr(0, lf);
        tx = tx.substr(lf + 1);
        if (ze.match(/s[A-Z]{3}=/))
        {
          l++;
          loc[l][0] = ze.substr(1, 3);
          loc[l][1] = ze.substr(6, ze.length - 8);
        }
        if (ze.match(/a[A-Z]{3}=/))
        {
          z = 0;
          p = 7;
          while (p + 4 < ze.length)
          {
            z++;
            loc[l][z + 2] = ze.substr(p, 3)
            p = p + 6;
          }
          loc[l][2] = z;
        }
      }
      loc[0][0] = l;
    }
  }
}



function writeInfo(txt, no)
{
  var info1 = top.document.getElementsByName("info")[0];
  if (! info1)
  {
    var fo;
    for (var i = 0; i < document.forms.length; i++)
    {
      var inv = document.forms[i];
      if (inv && inv.name == "sched") {fo = inv}
    }
    var td = fo.parentNode;
    var tr = td.parentNode;
    var th = tr.parentNode;
    var newtr = document.createElement("tr");
    var info1 = document.createElement("td");
    info1.setAttribute("name", "info");
    var newtx = document.createTextNode("");
    th.appendChild(newtr);
    newtr.appendChild(info1);
    info1.appendChild(newtx);
    var info2 = document.createElement("td");
    info2.setAttribute("name", "info");
    info2.setAttribute("align", "right");
    var newtx = document.createTextNode("");
    newtr.appendChild(info2);
    info2.appendChild(newtx);
    var newtr = document.createElement("tr");
    var info3 = document.createElement("td");
    info3.setAttribute("name", "info");
    var newtx = document.createTextNode("");
    th.appendChild(newtr);
    newtr.appendChild(info3);
    info3.appendChild(newtx);
    var info4 = document.createElement("td");
    info4.setAttribute("name", "info");
    info4.setAttribute("align", "right");
    var newtx = document.createTextNode("");
    newtr.appendChild(info4);
    info4.appendChild(newtx);

    var ta = th.parentNode;
    var td = ta.parentNode;
    var nta2 = document.createElement("table");
    var ntb2 = document.createElement("tbody");
    td.insertBefore(nta2, ta);
    nta2.appendChild(ntb2);
    nta2.setAttribute("cellpadding", "0");
    nta2.setAttribute("bgcolor", "#FFFFEE");
    nta2.setAttribute("width", "100%");
    ntb2.setAttribute("name", "ResultTab");
  }
  top.document.getElementsByName("info")[no - 1].firstChild.data = txt;
}



function writeResults()
{
  var tr3, td3, h23, tx3, ta3, tb3;
  var rtb = top.document.getElementsByName("ResultTab")[0];
  if (rtb.childNodes.length < 1)
  {
    tr3 = document.createElement("tr");
    td3 = document.createElement("td");
    h23 = document.createElement("h2");
    tx3 = document.createTextNode(msg[lng][13]);
    rtb.parentNode.setAttribute("border", "1");
    rtb.appendChild(tr3);
    tr3.appendChild(td3);
    td3.setAttribute("align", "center");
    td3.appendChild(h23);
    h23.appendChild(tx3);
  }
  var rtb = top.document.getElementsByName("ResultTab")[0];
  tr3 = document.createElement("tr");
  td3 = document.createElement("td");
  ta3 = document.createElement("table");
  tb3 = document.createElement("tbody");
  rtb.appendChild(tr3);
  tr3.appendChild(td3);
  td3.setAttribute("bgcolor", "#DDDDFF");
  td3.appendChild(ta3);
  ta3.appendChild(tb3);
  ta3.setAttribute("width", "100%");
  ta3.setAttribute("cellpadding", "3");
  writeResultHead(tb3);
  writeResultLine(tb3, 1);
  writeResultLine(tb3, 2);
  writeResultLine(tb3, 3);
  writeResultLine(tb3, 4);
  writeResultLine(tb3, 5);
  writeResultLine(tb3, 6);
}


function writeResultHead(tb)
{
  var tr, td, bb, tx;
  tr = document.createElement("tr");
  td = document.createElement("td");
  bb = document.createElement("b");
  tx = document.createTextNode(okl(erg[0]) + " - " + okl(erg[2]));
  tb.appendChild(tr);
  tr.setAttribute("bgcolor", "#FFCCCC");
  tr.setAttribute("name", "FlightCounter");
  tr.appendChild(td);
  td.setAttribute("colspan", "3");
  td.appendChild(bb);
  bb.appendChild(tx);
}

function writeResultLine(tb, flag)
{
  var tr = document.createElement("tr");
  tb.appendChild(tr);
  tr.setAttribute("bgcolor", "#FFFFAA");
  switch(flag)
  {
  case 1:
    writeCol(tr, "Your trip on:");
    writeCol(tr, erg[7]);
    writeCol(tr, erg[8]);
    break;
  case 2:
    writeCol(tr, "Start:");
    writeCol(tr, erg[0]);
    writeCol(tr, erg[2]);
    break;
  case 3:
    writeCol(tr, "1. flight:");
    writeCol(tr, erg[3]);
    writeCol(tr, erg[5]);
    break;
  case 4:
    writeCol(tr, "via:");
    writeCol(tr, erg[1]);
    writeCol(tr, erg[1]);
    break;
  case 5:
    writeCol(tr, "2. flight");
    writeCol(tr, erg[4]);
    writeCol(tr, erg[6]);
    break;
  case 6:
    writeCol(tr, "Destination:");
    writeCol(tr, erg[2]);
    writeCol(tr, erg[0]);
    break;
  }
}

function writeCol(tr, tx)
{
  var td = document.createElement("td");
  var tn = document.createTextNode(tx);
  tr.appendChild(td);
  td.appendChild(tn);
}

function okl(tx)
{
  return tx.substr(0, tx.length - 6);
}




function makeButtons()
{
  var fo;
  for (var i = 0; i < 10; i++)
  {
    var inv = document.forms[i];
    if (inv && inv.name == "sched") {fo = inv}
  }
  var ta = fo.firstChild;
  var tb = ta.firstChild;
  var newtr = document.createElement("tr");
  var newtd = document.createElement("td");
  var newfo = document.createElement("form");
  var newi1 = document.createElement("input");
  var newi2 = document.createElement("input");
  var newi4 = document.createElement("input");
  tb.appendChild(newtr);
  newtr.setAttribute("name", "ctrlrow");
  newtr.appendChild(newtd);
  newtd.appendChild(newfo);
  newtd.setAttribute("colspan", "2");
  newtd.setAttribute("align", "center");
  newfo.appendChild(newi1);
  addba(newi1);
  newi1.setAttribute("value", msg[lng][14]);
  newi1.setAttribute("onclick", "document.getElementsByName('control')[0].value='skip'");
  newi1.setAttribute("align", "left");
  newi1.setAttribute("style", "width: 185px; background-color:#FF0000");
  newfo.appendChild(document.createTextNode(" "));
  newfo.appendChild(newi2);
  addba(newi2);
  newi2.setAttribute("value", msg[lng][15]);
  newi2.setAttribute("onclick", "document.getElementsByName('control')[0].value='stop'");
  newi2.setAttribute("align", "right");
  newi2.setAttribute("style", "width: 185px; background-color:#FF0000");
  newfo.appendChild(newi4);
  newi4.setAttribute("type",  "hidden");
  newi4.setAttribute("value", "nix");
  newi4.setAttribute("name",  "control");
}


function addba(bu)
{
  bu.setAttribute("type",  "button");
  bu.setAttribute("class", "submitlg");
  bu.setAttribute("style", "margin-top: 8px; margin-bottom: 0pt; width: 30%;");
  bu.style.backgroundColor = "#FF0000";
}


function fade()
{
  var bu = document.getElementsByName("spiderbutton")[0];
  var co = GM_getValue("Startplatz");
  if (co == "#DDB790") {co = "#DDBB99"}
  if (co == "#DEB387") {co = "#DDB790"}
  if (co == "#DFAF7E") {co = "#DEB387"}
  if (co == "#E0AB75") {co = "#DFAF7E"}
  if (co == "#E1A76C") {co = "#E0AB75"}
  if (co == "#E2A363") {co = "#E1A76C"}
  if (co == "#E49F5A") {co = "#E2A363"}
  if (co == "#E59B51") {co = "#E49F5A"}
  if (co == "#E69748") {co = "#E59B51"}
  if (co == "#E7933F") {co = "#E69748"}
  if (co == "#E88F36") {co = "#E7933F"}
  if (co == "#E98B2D") {co = "#E88F36"}
  if (co == "#EA8724") {co = "#E98B2D"}
  if (co == "#EB831B") {co = "#EA8724"}
  if (co == "#EC7F12") {co = "#EB831B"}
  if (co == "#ED7B09") {co = "#EC7F12"}
  if (co == "#EE7700") {co = "#ED7B09"}
  bu.style.backgroundColor = co;
  GM_setValue("Startplatz", co);
  if (co >  "#DDBBA0")
  {
    zeit = window.setTimeout(function() { fade() }, 100);
  }
}



//###################################################################################
//### functions for www.bookryanair.com                                           ###
//###################################################################################


function readTimes()
{
  var ti, mi;
  if (document.getElementsByTagName("a").length < 1)
  {
    window.setTimeout(function() { readTimes() }, 1000);
    return;                                     // noch keine HREFs eingebaut
  }
  if (document.getElementsByTagName("span").length < 2)
  {
    GM_setValue("TimeRead", "NOfl");
    return;                                     // keine 2 Richtungen gefunden
  }
  ti = 0;
  if (document.getElementsByTagName("span")[0].getAttribute("class") == "white") {ti++}
  if (document.getElementsByTagName("span")[1].getAttribute("class") == "white") {ti++}
  if (ti < 2)
  {
    GM_setValue("TimeRead", "NOfl");
    return;                                     // keine 2 Richtungen gefunden
  }

  ti = collectTimes(document.getElementsByTagName("span")[1]);
  if (ti < "0")
  {
    window.setTimeout(function() { readTimes() }, 1000);
    return;                                     // noch keine Zeiten eingebaut
  }

  ti = collectTimes(document.getElementsByTagName("span")[0]);
  var hin = GM_getValue("Flug1Hin");
  if (hin == "NEU")
  {
    ti = ti.substr(0, 11);                     // frühester Hinflug
    GM_setValue("Flug1Hin", ti);
  }
  else
  {
    hin = minut(hin.substr(6, 5));             // 1. Ankunft
    mi = minut(ti.substr(ti.length - 12, 5));  // spätester 2. Start
    if (mi - hin < checktime)
    {
      GM_setValue("TimeRead", "NO1");          // 2. Flug zu früh
      return;
    }
    ti = ti.substr(ti.length - 12, 11);
    GM_setValue("Flug2Hin", ti);
  }
  ti = collectTimes(document.getElementsByTagName("span")[1]);
  var zur = GM_getValue("Flug1Zur");
  if (zur == "NEU")
  {
    ti = ti.substr(ti.length - 12, 11);        // spätester Rückflug zum Ausgangspunkt
    GM_setValue("Flug1Zur", ti);
  }
  else
  {
    zur = minut(zur.substr(0, 5));             // 2. Start
    mi = minut(ti.substr(6, 5));               // 1. Akunft
    if (zur - mi < checktime)
    {
      GM_setValue("TimeRead", "NO2");          // 1. Flug zu spät
      return;
    }
    ti = ti.substr(0, 11);
    GM_setValue("Flug2Zur", ti);
  }
  GM_setValue("TimeRead", "OK");
}




function collectTimes(sp)
{
  var ta, tb, tr, td, fo, tx;
  var ti = "";
  do
  {
    sp = sp.parentNode;
  } while (sp.getAttribute("colspan") < 4);
  ze = sp.parentNode;                 // Tabellenzeile
  while (ze.nextSibling && ze.nextSibling.nextSibling)
  {
    tx = ze.nextSibling;              // text
    ze = tx.nextSibling;              // Tabellenzeile TR
    tx = ze.firstChild;               //   text
    td = tx.nextSibling;              //   TD
    tx = td.firstChild;               //     text
    ta = tx.nextSibling;              //     TABLE
    tx = ta.firstChild;               //       text
    tb = tx.nextSibling;              //       TBODY
    tr = tb.firstChild;               //         TR
    tx = tr.firstChild;               //           text
    td = tx.nextSibling;              //           TD
    tx = td.nextSibling;              //           text
    td = tx.nextSibling;              //           TD
    tx = td.firstChild;               //             text
    ta = tx.nextSibling;              //             TABLE
    tx = ta.firstChild;               //               text
    tb = tx.nextSibling;              //               TBODY
    tr = tb.firstChild;               //                 TR
    tx = tr.firstChild;               //                   text
    td = tx.nextSibling;              //                   TD
    fo = td.firstChild;               //                     font
    tx = fo.firstChild;               //                       text
    ti = ti + tx.data.substr(0, 5) + "-";
    tx = tr.nextSibling;              //                 text
    tr = tx.nextSibling;              //                 TR
    tx = tr.firstChild;               //                   text
    td = tx.nextSibling;              //                   TD
    fo = td.firstChild;               //                     font
    tx = fo.firstChild;               //                       text
    ti = ti + tx.data.substr(0, 5) + "|";
  }
  return ti;
}


function minut(hm)
{
  var h = hm.substr(0, 2);
  var m = hm.substr(3, 2);
  m = h * 60.0 + m * 1.0;
  return m;
}


