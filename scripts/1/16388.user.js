// ==UserScript==
// @name           SMF-Foren-Outfit
// @namespace      http://*.sektenausstieg.net/*
// @description    SMF-Foren-Outfit klarer machen
// ==/UserScript==

mpatterns = new Array("infolink international","Religion und Menschen","Offtopic","Abstellgleis");

kategorienpatterns = new Array("Mormonen","Neuapostolische Kirche");

// Details zu den einzelnen Forenmitgliedern bei jedem Beitrag ausblenden = 1
forenmitgliederdetailsausblenden = 1;

var ignoreuserspatterns = new Array(
"Irgendein User Name",
"Noch ein User Name"
);

var patterns = new Array(
"//hr[@class='hrcolor']", // blaue Zwischenlinien zwischen Beitr‰gen ausblenden;  zum Ausschalten // an den Zeilenbeginn schreiben
"//div[@id='SiteHeader']",  // Oberen Header ausblenden; zum Ausschalten // an den Zeilenbeginn schreiben
"//div[@id='footerarea']",     // Unteren Footer ausblenden; zum Ausschalten // an den Zeilenbeginn schreiben
"//tr[@class='titlebg']", // Zeichenerkl‰rung auf ‹bersichtsseite ausblenden; zum Ausschalten // an den Zeilenbeginn schreiben
"//a[contains(@href,'index.php?action=sendtopic;topic=')]",
"//a[contains(@href,'index.php?action=printpage;topic=')]",
"//a[contains(@href,'index.php?action=reporttm;topic=')]",
"//img[contains(@src,'Themes/InfoLink/images/topic/normal_post.gif')]",
"//div[@style='font-weight: bold;']",
"//img[contains(@src,'/Themes/InfoLink/images/post/xx.gif')]",
"//img[contains(@src,'/Themes/InfoLink/images/ip.gif')]",
"//img[contains(@src,'http://www.cosgan.de/images/more/bigs/')]",
"//a[contains(@href,'/index.php?action=helpadmin;help=see_member_ip')]"

);

var results;
for (var i = 0; i < patterns.length; i++) {
    results = document.evaluate(patterns[i], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var j = 0; j < results.snapshotLength; j++) {
        results.snapshotItem(j).style.display = "none";
    }
}

if (forenmitgliederdetailsausblenden) {
  suchtext = "//div[@class='smalltext']";
  results = document.evaluate(suchtext, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var j = 0; j < results.snapshotLength; j++) {
    if (String(results.snapshotItem(j).innerHTML).search('Beitr‰ge')>-1) {
      results.snapshotItem(j).innerHTML = "";
      results.snapshotItem(j).style.display = "none"; 
    }
  }
}

suchtext = "//a[contains(@title,'Profil anzeigen von')]"
results = document.evaluate(suchtext, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var j = 0; j < results.snapshotLength; j++) {
  results.snapshotItem(j).target = "_blank";
}


results = document.evaluate("//tr[@class='windowbg2']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var j = 0; j < results.snapshotLength; j++) {
  for (var i = 0; i < mpatterns.length; i++) {
    if (String(results.snapshotItem(j).innerHTML).search(mpatterns[i])>-1) {
      results.snapshotItem(j).innerHTML = "";
      results.snapshotItem(j).style.display = "none";  
    }
  }
}
results = document.evaluate("//div[@class='tborder']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var j = 0; j < results.snapshotLength; j++) {
  for (var i = 0; i < kategorienpatterns.length; i++) {
    if (String(results.snapshotItem(j).innerHTML).search(kategorienpatterns[i])>-1) {
    results.snapshotItem(j).innerHTML = "";
    results.snapshotItem(j).style.display = "none";  

    }
  }
}

for (var j = 0; j < results.snapshotLength; j++) {
  for (var i = 0; i < kategorienpatterns.length; i++) {
    if (String(results.snapshotItem(j).innerHTML).search(kategorienpatterns[i])>-1) {
    results.snapshotItem(j).innerHTML = "";
    results.snapshotItem(j).style.display = "none";  

    }
  }
}

// Zeichenerkl‰rungen Normales/Heiﬂes Thema etc.; zum Ausschalten // an den Zeilenbeginn schreiben

smalltextpatterns = new Array("index.php?action=reporttm","Fixiertes Thema", "Heiﬂes Thema","Gehe zu");//("Themen","Thema");

results = document.evaluate("//td[@class='smalltext']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var j = 0; j < results.snapshotLength; j++) {
  for (var i = 0; i < smalltextpatterns.length; i++) {
    if (String(results.snapshotItem(j).innerHTML).search(smalltextpatterns[i])>-1) {
    results.snapshotItem(j).innerHTML = "";
    results.snapshotItem(j).style.display = "none";  

    }
  }
}


// Gehe Zu Dropdownbox lˆschen

suchtext ="//div[@style='margin-bottom: 1ex;']";
results = document.evaluate(suchtext, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var j = 0; j < results.snapshotLength; j++) {
  results.snapshotItem(j).innerHTML = "";
  results.snapshotItem(j).style.display = "none";  
}

suchtext = "//td[contains(@style,'padding: 1px 1px')]";
results = document.evaluate(suchtext, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var j = 0; j < results.snapshotLength; j++) {
  for (var i = 0; i < ignoreuserspatterns.length; i++) {
    if (String(results.snapshotItem(j).innerHTML).search(ignoreuserspatterns[ i ]+'">'+ignoreuserspatterns[ i ]+'</a></b>')>-1) {
      results.snapshotItem(j).innerHTML = "";
      results.snapshotItem(j).style.display = "none";  
    }
  }
}



function conprom2 (e) {
 var test = window.getSelection();
 // alert(test);
//  alert(GM_getValue("Ignorieren"));
  GM_setValue("Ignorieren", (prompt('Mute Nicknames eingeben, Werte mit ; trennen',test+';'+GM_getValue("Ignorieren"))));
//  alert(GM_getValue("Ignorieren"));
//  GM_setValue("Ignorieren", test+';'+GM_getValue("Ignorieren"));
}
GM_registerMenuCommand("Ignorieren", conprom2);


//alert(GM_getValue("Ignorieren"));

if(GM_getValue("Ignorieren") != "") {
  var suchsuch = "subject_" + GM_getValue("Ignorieren").split(";").join('|subject_');
  //alert(suchsuch);
  suchtext = "//td[contains(@style,'padding: 1px 1px')]";
  results = document.evaluate(suchtext, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var j = 0; j < results.snapshotLength; j++) {
    for (var i = 0; i < ignoreuserspatterns.length; i++) {
      if (String(results.snapshotItem(j).innerHTML).search(suchsuch)>-1) {
        results.snapshotItem(j).innerHTML = "";
        results.snapshotItem(j).style.display = "none";  
      }
    }
  }
}

var temp_body = String(document.body.innerHTML);



var mpre="<font color='darkblue'>";
var mpost="</font>";

temp_body = temp_body.replace(/,/g,', ');
temp_body = temp_body.replace(/Mitgliederversammlung/g,mpre+"MV"+mpost);
temp_body = temp_body.replace(/Wachtturmgesellschaft/g,mpre+"WTG"+mpost);
temp_body = temp_body.replace(/\bwachtturm/g,mpre+"WT"+mpost);
temp_body = temp_body.replace(/\bWachtturm/g,mpre+"WT"+mpost);
temp_body = temp_body.replace(/\bWT-CD\b/g,mpre+"WTLIB"+mpost);
temp_body = temp_body.replace(/\bErwachet\b/g,mpre+"EW"+mpost);
temp_body = temp_body.replace(/"Unser Kˆnigreichsdienst"/g,mpre+"km"+mpost);
temp_body = temp_body.replace(/\bKˆnigreichsdienst\b/g,mpre+"km"+mpost);
temp_body = temp_body.replace(/\bWahait\b/g,mpre+"Wahrheit"+mpost);

temp_body = temp_body.replace(/\bJehofa ohne Sofa\b/g,mpre+"Jehova"+mpost);



var ZJ = mpre+"ZJ"+mpost;
temp_body = temp_body.replace(/\bZeuge Jehovas\b/gi,ZJ);
temp_body = temp_body.replace(/\bZeugen Jehovas\b/gi,ZJ);
temp_body = temp_body.replace(/\bJehovas Zeugen\b/gi,ZJ);
temp_body = temp_body.replace(/\bJehovas Zeuge\b/gi,ZJ);
temp_body = temp_body.replace(/\bzj\b/gi,ZJ);
temp_body = temp_body.replace(/\bjz\b/gi,ZJ);
temp_body = temp_body.replace(/\bZotti\b/gi,ZJ);
temp_body = temp_body.replace(/\bZottis\b/gi,ZJ);
temp_body = temp_body.replace(/\bzotties\b/gi,ZJ);

var EXZJ = mpre+"EXZJ"+mpost;
temp_body = temp_body.replace(/\EX-ZJ\b/gi,EXZJ);
temp_body = temp_body.replace(/\ExZJ\b/gi,EXZJ);

temp_body = temp_body.replace(/<br>\s<div/g,"<div");


temp_body = temp_body.replace('/index.php?action=help">Hilfe</a>','/index.php?action=pm">PMs</a> | <a href="http://forum.sektenausstieg.net/index.php?action=unreadreplies">Ungelesene Nachrichten</a> | <a href="http://forum.sektenausstieg.net/index.php?action=unreadreplies">Ungelesene Antworten</a>');

temp_body = temp_body.replace(/<div style="font-weight: bold; display: none;" id="subject_([0-9]*)">/ig,'- $1 -<div style="font-weight:bold;display:none;" id="subject_$1">');

document.body.innerHTML = temp_body;


function aKeyWasPressed(e) {
 var key = e.keyCode;
// alert(key);
// alert(String.fromCharCode(key));
 var thechar = String.fromCharCode(key);
	GM_log("Taste " + thechar + " wurde gedr√ºckt!");
	switch (key){
	case 27:
 var test = window.getSelection();
 //alert(String(test).length);
 if (String(test).length==6) {
   GM_setValue("Ignorieren", test+';'+GM_getValue("Ignorieren"));
//   location.reload();
//   alert(GM_getValue("Ignorieren"));
}
	
	}
}

document.addEventListener('keyup', aKeyWasPressed, false);	