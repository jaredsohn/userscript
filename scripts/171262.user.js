// ==UserScript==
// @name          Andaloria Pimp Script
// @description   Ersetzt/erweitert das Andaloria-Menü mit Buttons, verfeinert die Bilanz, Bilanzexport, automatischer PHP-Map Import, PHP-Map Jumper
// @author        Tarmotim & Aeldra (based on decays http://decay.homeip.net/andaloriascript version 1.0.2.0, phpMapJumper von Hurry)
// @include       http://game1.andaloria.de/*
// @include       http://phpmap*.andaloria.de/map.php*
// @grant         GM_xmlhttpRequest
// @grant         GM_getValue
// @grant         GM_setValue
// @updateURL     http://userscripts.org/scripts/source/171262.meta.js
// @downloadURL   http://userscripts.org/scripts/source/171262.user.js
// @version       20130618001
// ==/UserScript==
  
var ANDAPIMP = {}; // create Namespace

ANDAPIMP.debug = function (msg) {
  if ( "function" === typeof(console.log) ) {
    console.log("ANDAPIMP: " + msg);
  } else {
    //alert(msg);
  }
};

ANDAPIMP.detectGM_APIs = function() {
  if ( "function" != typeof(GM_getValue) || "function" != typeof(GM_setValue) ) {
    return false;
  }

  // Strangely, GM_setValue *IS* defined in Chrome, but doesn't do anything.
  // So we have to test that it actually works.
  // This will display a message like "undefined is not supported" in Chrome's console log.
  GM_setValue("ANDAPIMPtest", 128);
  return ( 128 == GM_getValue("ANDAPIMPtest") );
};

ANDAPIMP.init = function () {

  // Find GM_ APIs (Greasemonkey)
  ANDAPIMP.bGM_API = ANDAPIMP.detectGM_APIs();

  // We need to cross the boundary in some cases (onclick, onbeforeunload).
  ANDAPIMP.window = ( ANDAPIMP.bGM_API ? unsafeWindow : window );
  ANDAPIMP.version = 20130618001;

  if (! ANDAPIMP.bGM_API ) {
    GM_getValue=function (key,def) {
      var hu = localStorage[key] || def;
      if (hu === "true")  { hu = true; }
      if (hu === "false") { hu = false; }
      return hu;
    };
    GM_setValue=function (key,value) {
      var hu = localStorage[key]=value;
      return hu;
    };
  }

  // show php map jumper
  if(document.location.href.search(/phpmap[1-2]*\.andaloria\.de\/map.php/) > 0) {
    ANDAPIMP.addPhpMapJumper();
  } else if (document.location.host === "game1.andaloria.de") {
    // main functions
    ANDAPIMP.loadConfig();
    if ( ANDAPIMP.b_hideBanner === true ) {
      ANDAPIMP.hideBanner();
    }
    // extend profile page for configuration
    ANDAPIMP.extendProfilePage();
  
    // extend balance page for display of additional values
    ANDAPIMP.extendBalancePage();

    // extend fightReport page for display of additional values
    ANDAPIMP.extendFightReportPage();

    // extend tech cost dialog
    ANDAPIMP.extendBuildingTechCost();
    ANDAPIMP.extendResearchTechCost();

    // other themes
    ANDAPIMP.mapThemes();

    // add Menu Buttons
    ANDAPIMP.addMenuButtons();
    
    // Autoimport phpMap
    if ((ANDAPIMP.b_import === true) && (ANDAPIMP.b_autoimport === true) && ((document.location.href.search('Map.php')) > 0)) { 
      ANDAPIMP.pageChecker.checkPage(document, ""); 
    };
   
    // check for new version
    ANDAPIMP.checkVersion();
  }
};

ANDAPIMP.in_array = function(a,p) {
  for (i=0;i<a.length;i++)
    if (a[i] == p) return true
  return false
}

ANDAPIMP.extendResearchTechCost = function () {
  if (document.location.href.search('Research.php') <= 0) return;

  // --- add additional script
  var th = document.getElementsByTagName('head')[0];
  var s = document.createElement('script');
  s.setAttribute('type','text/javascript');
  s.text='function refreshResearchTechCost() { var techcostTD = document.getElementById("tech_cost"); if (! techcostTD) { return; } var childrenArr = techcostTD.childNodes; for(i = 0; i < childrenArr.length; i++) { if ( childrenArr[i].childNodes[1]) { if ( childrenArr[i].className === "g0" && childrenArr[i].title) { var vg = childrenArr[i].childNodes[0].data; var missing = childrenArr[i].title.substring(11); childrenArr[i].childNodes[0].data = vg + "(fehlen: "+missing+")"; } } } }';
  th.appendChild(s);

  //-- add preprocessor script call
  var cl = 'tech0';
  var retnode = [];
  var myclass = new RegExp('\\b'+cl+'\\b');
  var elem = document.getElementsByTagName('*');
  for (var i = 0; i < elem.length; i++) {
    var classes = elem[i].className;
    if (myclass.test(classes)) retnode.push(elem[i]);
  }

  var links=retnode;
  for (i=0; i < links.length; i++) {
    var link=links[i];
    if (link.href && link.href == 'http://game1.andaloria.de/Research.php#') {
      var val = link.getAttributeNode("onclick").value;
      link.setAttribute("onClick", val+"refreshResearchTechCost();");
    }
  }
}

ANDAPIMP.extendBuildingTechCost = function () {
  if (document.location.href.search('Buildings.php') <= 0) return;
  
  // --- add additional script
  var th = document.getElementsByTagName('head')[0];
  var s = document.createElement('script');
  s.setAttribute('type','text/javascript');
  s.text='function refreshBuildingTechCost() { var techcostTD = document.getElementById("tech_cost"); if (! techcostTD) { return; } var childrenArr = techcostTD.childNodes; for(i = 0; i < childrenArr.length; i++) { if ( childrenArr[i].childNodes[1]) { if ( childrenArr[i].className === "g0" && childrenArr[i].title) { var vg = childrenArr[i].childNodes[0].data; var missing = childrenArr[i].title.substring(11); childrenArr[i].childNodes[0].data = vg + "(fehlen: "+missing+")"; } } } }';
  th.appendChild(s);

  //-- add preprocessor script call
  var linkContainer=document.getElementById('b_new');
  if (! linkContainer) { return; }
  
  var links=linkContainer.childNodes;

  for (i=0; i < links.length; i++) {
    var childList = links[i].childNodes;
    if (childList[1] && childList[1].childNodes[0]) {
      var link=childList[1].childNodes[0];
      if (link.href && link.href == 'http://game1.andaloria.de/Buildings.php#') {
        var val = link.getAttributeNode("onclick").value;
        link.setAttribute("onClick", val+"refreshBuildingTechCost();");
      }
    }
  }
}

ANDAPIMP.mapThemes = function () {
return;
  if (! ANDAPIMP.b_showSnowThemeDemo) { return; }

  if (document.location.href.search('Map.php') <= 0) return;
  
  var replace = document.getElementsByTagName('img');
  for (var i=0;i<replace.length;i++) {
    // normaly change every img from class 'terrain'
    if (replace[i].className !== 'terrain') continue;
    
    replace[i].src = replace[i].src.replace(/(.*)\/([0-9]-[0-9].*png)/, "http://andaloria.bloodsharks.org/theme/blizzard/$2");
  }
}
ANDAPIMP.hideBanner = function () {
  document.getElementById('top').style.height='37px';
  document.getElementById('logo').style.display='none';
  document.getElementById('premium').style.display='none';
  document.getElementById('restable').style.top='10px';
  document.getElementById('menu').style.top='37px';
  document.getElementById('body').style.top='87px';
  var mainIds = ['map', 'body'];
  for (var i = 0; i < mainIds.length; ++i) {
    var mm = mainIds[i];
    var mmelem = document.getElementById(mm);
    if (mmelem) {
      var h = mmelem.style.height;
      h = h.replace(/px/g,"");
      h = parseInt(h)+120;
      h = h+'px';
      mmelem.style.height=h;
    }
  }
}

ANDAPIMP.extendFightReportPage = function () {
  return;
  if (document.location.href.search('FightReport.php') <= 0) {
    return;
  }
  // close all other attack types
  var node;
  var elemArr = ['kindMagie', 'kindArtillerie', 'kindFernkampf', 'kindKavallerie', 'kindNahkampf'];
  for (i in elemArr) {
    var kind = elemArr[i];
    node = document.getElementById(kind+'Img');
    if (node && node.src.search('collapse.gif') > 0) {
      srs = node.src;
      srs = srs.replace('collapse.gif', 'expand.gif');
      node.src = srs;
      document.getElementById(kind).style.display='none';
    }
  }
  var findPattern = "//table//tbody//tr//td[2]//table//tbody//tr//td[2]//table";
  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
  var summaryPane = resultLinks.snapshotItem(0)
  if (! summaryPane) { return; }
  
  var summaryNode = document.createElement("div");
  summaryNode.innerHTML = "<h2>Zusammenfassung</h2>";
  summaryPane.appendChild(summaryNode);
  
  var foe    = new Array();
  var friend = new Array();
  var attack = new Array();
  
  var i=1;
  while ( (res = resultLinks.snapshotItem(i) ) !=null ){
    // alert(res.childNodes[1].childNodes.length);
    
    i++
  }
  // add Summary 

  // fill Summary

  // Xpath : /html/body/table/tbody/tr/td[2]/table/tbody/tr
}

ANDAPIMP.hideBuildings = function () {
  var imgs = document.getElementsByTagName('img');
  for (i = 0; i < imgs.length; ++i) {
    var img = imgs[i];
    if (img.src.search(/isomap\/buildings\/[a-z]_(gold|wood|stone|food|store|granary|iron)+/) > 0) {
      img.style.display="none";
    }
  }
}
 
ANDAPIMP.showBuildings = function () {
  var imgs = document.getElementsByTagName('img');
  for (i = 0; i < imgs.length; ++i) {
    var img = imgs[i];
    if (img.src.search(/isomap\/buildings\/[a-z]_(gold|wood|stone|food|store|granary|iron)+/) > 0) {
      img.style.display="block";
    }
  }
} 

ANDAPIMP.addPhpMapJumper = function () {
  function getUrlParameter( name ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if (results == null || results[1] == 0 || results[1] > 2000) return "1";
    return results[1];
  }
  var xCoordinate = getUrlParameter('x');
  var yCoordinate = getUrlParameter('y');
  var myLink = "http://game1.andaloria.de/Map.php?_x="+ xCoordinate + "&_y=" + yCoordinate;
  var openGameWindow = 'window.open("' + myLink + '")'; 
  var arrContent = document.getElementsByClassName('map_legend');
  var content = arrContent[0];
  var box = document.createElement('div');
  box.style.margin = '5px 5px';
  box.style.background = '#000000';
  box.style.color = '#000';
  box.style.padding = '5px';
  var input = document.createElement('input');
  input.setAttribute('id','jumperButton');
  input.setAttribute('name','jumperButton');
  input.type = 'button';
  input.value = 'zur Karte im Spiel';
  input.setAttribute('onclick', openGameWindow); 
  box.appendChild(input);
  content.insertBefore(box,content.firstChild);
}

ANDAPIMP.loadConfig = function () {
  // variables used for update
  ANDAPIMP.StartTime        = new Date().getTime();
  ANDAPIMP.scripturlbase    = 'http://andaloria.bloodsharks.org/script/';
  ANDAPIMP.scripturl        = ANDAPIMP.scripturlbase + 'currentVersion.txt';
  ANDAPIMP.scripturlcurrent = ANDAPIMP.scripturlbase + 'andaloriaPimp_current.user.js';
  // ---

  ANDAPIMP.b_showbuttons = GM_getValue('b_showbuttons', false); // show extra buttons
  ANDAPIMP.b_bilanz      = GM_getValue('b_bilanz', false);      // extend balance
  ANDAPIMP.i_taxes       = GM_getValue('i_taxes', '6');         // extend taxes
  ANDAPIMP.b_import      = GM_getValue('b_import', false);      // enable map support
  ANDAPIMP.strPHPMapUrl  = GM_getValue('strPHPMapUrl', '');     // Broker URL
  ANDAPIMP.strUsername   = GM_getValue('strUsername', '');      // MAP Username
  ANDAPIMP.strPassword   = GM_getValue('strPassword', '');      // MAP Password
  ANDAPIMP.strGuild      = GM_getValue('strGuild', '');         // MAP Guilde
  ANDAPIMP.b_autoimport  = GM_getValue('b_autoimport', false);  // Automatic map import
  ANDAPIMP.b_mapimport   = true; // GM_getValue('b_mapimport', false);   // import map informations 
  ANDAPIMP.b_hidebuild   = GM_getValue('b_hidebuild', false);   // hide buildings on the map 
  ANDAPIMP.b_betterMsg   = GM_getValue('b_betterMsg', false);   // show #msg next to letter icon 
  ANDAPIMP.strGuildUrl   = GM_getValue('strGuildUrl', '');      // URL for Guild link
  ANDAPIMP.b_hideBanner  = GM_getValue('b_hideBanner', false);  // show/hide the andaloria banner
  //ANDAPIMP.b_showSnowThemeDemo  = GM_getValue('b_showSnowThemeDemo', false);// demo blizzard theme support
  ANDAPIMP.b_showSnowThemeDemo  = false;// demo blizzard theme support

  if (ANDAPIMP.b_import === true) {
    if (ANDAPIMP.strPHPMapUrl === false || ANDAPIMP.strPHPMapUrl === '') {
      ANDAPIMP.b_import = false;
    }  
    if (ANDAPIMP.strUsername === false || ANDAPIMP.strUsername === '' ) {
      ANDAPIMP.b_import = false;
    }  
    if (ANDAPIMP.strPassword === false|| ANDAPIMP.strPassword === '' ) {
      ANDAPIMP.b_import = false;
    }  
    if (ANDAPIMP.strGuild === false || ANDAPIMP.strGuild === '') {
      ANDAPIMP.b_import = false;
    }
  }
  ANDAPIMP.configOptions = {
    'b_showbuttons' : {'bool':'Extra Buttons anzeigen ?'},
    'b_bilanz'      : {'bool':'Bilanz erweitern ?'},
    'b_hidebuild'   : {'bool':'Gebäude auf der Karte verstecken ?'},
    'i_taxes'       : {'number':'Steuersätze +/- ?'},
    'b_betterMsg'   : {'bool':'Nachrichtenanzahl anzeigen ?'},
    'HR1'           : {'sepa':'1'},
    'b_import'      : {'bool':'Kartenimport erm&ouml;glichen ?'},
    'strPHPMapUrl'  : {'textlong':'Adresse der phpmap (inklusive http:// aber OHNE Broker.php) \n Beispiel: http://phpmap1.andaloria.de'},
    'strUsername'   : {'text':'Benutzername auf der Karte'},
    'strPassword'   : {'text':'Password auf der Karte'},
    'strGuild'      : {'text':'Gildennamen auf der Karte'},
    'b_autoimport'  : {'bool':'Automatischer Kartenimport aktivieren ?'},
    //'b_mapimport'   : {'boollong':'Scannen von Gelände (Hügel, Wald, Wiese...) aktivieren (Nur für leere Karten nötig) ?'},
    'HR2'           : {'sepa':'1'},
    'strGuildUrl'  : {'textlong':'Gildenforum (inklusive http:// )'},
    'b_hideBanner'  : {'bool':'Bannerzeile verstecken ?'},
    //'b_showSnowThemeDemo'   : {'boollong':'DEMO - Anzeigen vom WDS Blizzard-Theme von Dagaz?<br>ACHTUNG hierbei werden die Bilder von andaloria.bloodsharks.org geladen! '},
    'HR3'           : {'sepa':'1'}
  };
  var imgPrefixPNG = 'data:image/png;base64,';
  ANDAPIMP.image = {
    "account":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAQCAYAAADAvYV+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ0SURBVHjafJJLSFRRHMb/93nu3Hu9Z67jNI6PooReCjIQhUYKRUYugmphtiiEkiBt08pN5CYFQYIRWvTYuImQNtEmpEVF1FBqKppiYzjj6Mw42czc0bnvjlIuIvoWh/Pn/DiH830fwF+iaYYKhUICxpiC/0kuKUHhoaGu5ZVEuvdOT5cgCNw/Qb/f7xkZGXnsEhV03V2YHXd7e7oHMPaiPwyztfA8zwzeDw+0X26/odkA0ZkIRGfHoO7A7sZgoAx/mpgdNQzD2YbbLrUdud3d8WhhKQGGBUBpcUguToFp21BV4T+W29AjM1+/zbOSJDGtLc23VOwB3iODUdRgPpsHjnFB31gHw6Hh4L7g3RIFv2JVL0ZeX2nDgyfPtMnxiYXO61fqisUCO/omAlPzq9OHa/zlkq+qnmNZkVUwRtn1tK//Xv/DWHxlOLYcP3Ohtanv6csP4WQ6P7xh1p5vaqzusW2LZiVZRn5V9u6pDhgEnhsfm4gGVM/ZnGYMku+k99bsP2cDbRmGbtOu4yISBFy7evFmMLirMpnK5J+/eH1qc1Nfqq09FGg4Wt+VWEklCWPTSECCVihCeZlXbm4IdTqOA9mcRjwBt+Xk8Q7LyHnJXKAocFhRFBXdtMF2TMCKfOK3944kipwi86fz+QIYprVqEh9pX6mquuRUK+pg2FY52bJb3kuSKPCIqbLJlTziSWdoh/6RycSWYnHIrP8EsPQAz7PbQakqRrIkVmbWshCPJyOmaVjs23fv51LpVGtFAIe1tZSOOJYkawFFOcUvk9NrHz/PTS1+T/RZluXuFInnOUQeFhia3p4R4kBRJJFjuZ3m/RJgAIYLDFZazIzGAAAAAElFTkSuQmCC',
    "balance":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAPjSURBVHjanFRbbBtFFD2zO7u2d2MHO05sJw6u8yw4SpoIRJSKUAlRRAWkiJ9C+eEhfqiEFPEJBT4Q4g/ELxJVBeIHhOCvICSiEtRWSojyoMFtcBInjte1HT/X630yLiIKVRGIkeZqdmfuuXPuuXd43GXE743KL8w8egzEqWWUYhP/dwz1x+VPP3rv280fLzqfnz/zXadX9PxXX+6ObxLu7Bjv8rc/tbq0hPWlxceCMr2P/SatTVEUyERiSA6HgvRfwTjCSUPx6OPE0mr7xRxIoGdXF7whwKGCINAzM09Of/zu62sfnHvmfb/sFu8EO4jA8zx99eyzr7wz+9KbeimLPa4biYmRnnSFnNtIK1t9saj79BMnvuRtI2hkb7zRF+C/Wqjjyt3AyNMnp4+/PfvihyIlWFAyaPe4EPG14fh4/6nv539pU1Xt2l5WKet2IfhbpqgY1BMG6i36zsGFWqZNluTzr5395IGRgdjcryv45tplhPw+jPV2Q/bwCPq9sUAwPDo+1Bv0oMYNjyZotmxuLq9vXmbu9uGckbGjfYn7j3ROq7US6rUiqtU8csUC6g0VPhePRyb6cWww3LajKNQf6kD/kah7aiz+HMtj8DDNVqro86emXj45mThhOhbmry/CMnWoRhOlegODHV3YUXLYzhTw9eISvAEJDw3E4JPEAFNMX03u/GxalnkbTHKJrpkHo291e61Yo9HAYvIm5pbXYGtN9EheNGoakuk8NnbzSN3KIRb2Y3I4DhdxMDoYebiuGcnl5M6K7TgOL/CcR6jnZ81GueOnlS3sbZcgGBQBTsJ+voqrqxtYS+7gxrYCSRJgixZkyY1YoB2FYhkW4RJXl1MXVK2pUz8LkbqlXtr4IVlVDTLW0A0qiQJYEKY1B8ch0JtNaLqBCB/ErmJj5fcU4rIXW0oJ+WJ1iAq0k7GsEpEn4DgiaoadmBwbuNjXGxnJFfZxfTMNq15Hd0AGJ4iwGSh1U8SjARztDcEybOQrGorVJuaXU1O7yv4VqlusTCxHv8crZ05PDXMjg1FkayY+u9REOrkJSSBoEg51VYPHsZHeLiC7V4bJ/FjtgbGDY5h9AuWuHHSAzSTJ3Fxvj7jrUGoCIm4X7EgXKipTlk1Nt1CpNxltQDeNBcrxCmOkWpa9yXp21ye7yZ9grI+9IuhCcq+czFV7Cg0HFaaiwOi1ypuy3LmJAMe2YZgWDIu7UFKNL5iCNbZtEmLaHIFD/rpZu5vneJ7zVTUjJPJcjIGEOOKEKcf52FqglGfITsWynS2BCnO1pplqNA3nb0/OPzxN5NA8OMdMi6XN6DmtxW1zaPwhwAAtoreN9cwbsAAAAABJRU5ErkJggg==',
    "barracks":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAPBSURBVHjaZFNtTFtlFD69923vvettSz/56KArbaXYFgSpERxbjICMxG2g6AxSf7hsP5boVDTBmPjDxH8YOheXyQ80GsVptrlhZuccuukSsrjxsSHIoBjb0o+19uP2g/b2Xi8jJIgnefO+Oec8zznnzXlEsMUwDAOLpQY5HDZlkQOYmp6OeZcWi5txWiaDmnonNNh0MDcfgIVoKaDNoNliQe8ODg60tbe/LyFIlGESkM7l7w+73btHTp9e2MzjeA4QQoBwDHBgN5y7jNX4tYkrt3nBRj/9jG96xMHbbVa+5+B+/pefPPxHH59yERQFYrEYWrr2i957dt9I98M2uvWpPYDjSAxvv/H6kd7new6PfXkGXj3+GrByR0jjdKUXA/n0hW9HUWdba2+tzT7l/9sXVesqO1f8oSG7rRrR0oIU1+vLsaOvvHxeqdPK3xkYgIKiId7e/4GvG1CZU/1QIWxoCp/9Yoh4qfeAyx8Mp+JB31mJwVppksPO8B1vEiMkEkTuIEsjoRj4YwkwPeFi93lnzD3f9NGunw+VHktFqux7j5OXfvBAXZ39cCgSpthkNJTiM7MBpSqCCX8iyq/lEQY8sJiYpRANxh/P0WR/HNA4gorVU2QjrkW3FhNAiDGDpsL4DEUSOzOTc0dSIRZhyRRTuHdv0S8rUYBOQaJ/4qsQ0FnYop8DXi8HpdQL5N3rTBpXMdlcFiQSfPLm9aszv8//5c5kWBaLJ1PcremZSxibh+amx2B56hyabO9jVjwmWGtZAvgVh7y5MUoReHotkwERzxGxWAy8bAFECAecK7LAZNklo770WOeBbhj/6hPkQ+rVaOML2fBCkbvZ3J/w1bei4O3P1bU11djc7NxIMBjwZYWRBUZhFwRLMen7cYbZ81x3j9FqsWCj7kF5TKYMhzv6I7GyCm5mfEhfLmOQUqWFK1cn3lrLZXPruEI+u0FQFNqJM9mLBSb55qG+F7GGulrs7m/fqUN3LtPReY9SvSMj6Xi6Cy6Mf39iZXn5/Nb1F20+DCYzIWLZnKO+Nuf+cJjEEQnzf/4BXJ4FtUYLwydP+L8eO2MWiuW2EjzQgkqtgcqqXScnb9xoS+U5qqOz6+KjTU5BH0ZIxFOQTKRgYuLa4HbwhgJxHFpa9+7WlVWMIbFY5Gx+8qCYoI4KIYlw5Ou3TKWrVZdXXsYQ+h8eDEYTMlttK+uJlJQGq6NxVipXVG3NIUgK9NUmD12iehzfTqLSaEUSkhI/mEcQFi0vUQpyFm0vRMsVSKZQKoUu/+P/V4ABAPKWf0NrOdrpAAAAAElFTkSuQmCC',
    "build_loop":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAB3ElEQVR4nGNgoDbg5+MH07z8fAyaWhqciorKXJbmFlpGpiZO+PQxwRiqKsrs2cmRBXnp8VlxCdGztbTtvsnKOXwVFZO6KsDHs4iDm4uRoCvSkuOK187p+b9r78r/VvYO/1lYpf4zMon+FxAU+i+vIG+FTy/YdBVVVdG63u5XzF9fMExfup7hyJadyGpWAnEEQe94eQd0nTl8miEzqxJsACMjK4OFqQWDvKzMe6B0AUFvqGtpirl6eP8HmgfELEDM9t/Fyen/nbMb/6+b13JfXExYlKAhIpJirMoaahu5eYShhjD9d7C32bFv8/QXL29v+N/fkr+Ml4uTC58Z4DCRlJJiZmJiLXn65KEhkNsOxFe1tTR0stLDd3s4GoqsWrlrcvvkJbnomj99+kQ4xkRFhWWaG3KP8vHx/Z/dXbFemJ+XF1keJE7QEJjCivKU9ZePL/s/saVosbCQIA+6PBMuzcg2TZu+KqB7+pp2GzvjmLqihDlsbCycyOpwGoLu1A0b9lTOW7a1wdbWKDwzLrCTnY2VE5deuAEwQ5BpEI6K8Crdsbz3f31p8npgmHHiDBdkCXQ2CAf5OUYtnl7zP8jbtoOkwEXmMzIxMRjoq2uCxKUlhNkIxzMOg0AAlk4ArrSdwXP4odoAAAAASUVORK5CYII=',
    "change_town_tax":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMfSURBVHjajFVNSBtBFJ7dmKxGjWBjraUtEQk1PZQeWvwppPGg0OLBQyV4khaDHnrpIdJAoTkVPFilWs9KVQQP4kEPASEISpQKSohU3YSqFYNR/Ikmaky238iujOanDjyWmffmm++9772EIzeWJEn0o4I9hFVRw5kvkUi4Y7FYYH19PVZeXk5uvSgg7ClsX0qzTk9Pa5eXl3ka393dTerq6jICcjAHc98DZu+j0ehr2LuLiwuX4jg7O/sRDAZLj46OKsfHx7lMDFvlOyLAKtfW1lSUidlsJi0tLdzAwICA1F/BH2OZ46wsHeB9JSgejzuGhoau/E1NTXxBQQFlw5tMpiyPx/OcBUWtw+lAq5igP9vb20aXy5W3tbVlDYfDw/h+7u3tpcKpDQaDEAgE7DT28PBwZH5+3kwfhHHXQI+Pj8nBwQGHGt1Dvb4AOIgS+ORHLtOFb8bpdD7CFcFms93p6uoy1NTU5On1egFnWXLHJNe3oqKCNDY2ks3NzVoKtLq62tbc3Fzkdrvf0v3S0lIbBYVpZBOYfZbCmGdB5+bmyOjoKDk5OQnRPcB/T01NRXw+n5/utVqtXqfTsWwk2ZLX7OwsWVxcJD09PZf7sbGx/PPzcy9NHfX7ipYS5R4Vp6enG1CGB+iK3JKSEo1KpVInpU/7E4oXAcAZiUSeWSyWy3MI8ASMXfDtQ6yZhYWFDysrK05F0FAo1I8HLNXV1QIj1BWoyHTIXzDTyQlwDocjZ3Bw0NDe3n4X+xyj0ajb2Nj4rgTv7e3119fXC6nUL2P7Dsx+eb3eYqvVysvBNC015j23s7PThEkapnHojlBfX1+p7L8OitoRpG6nI0kBmfQ+IuXKycnJx1D/pSiKnzCqIcU/MTHxprCwMIc+mNROVCS/30/FIWCYCzFGpAwLovnQIWaIlE9LAsuWgfmUfUpXR0eHBgxf7OzsfFOYIZPo7u7uT4xog91uL1ar1dkyoFb+ali2qZAVFfkbr0s3Ytgej8uWoHGqDD+vXNp0rp9LCpjy8P8usYzSxbKAGUFTgbNnUqZR5W7/Z5MyNuXc/xNgAC6QfB7Tl9BfAAAAAElFTkSuQmCC',
    "chat":    imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ6SURBVHjajFE9aBNhGH7ucn9JrmmahItpWmiJP0uHOlSoQnVxcBJEFAR1sODm4lBrRQfRQYQW3QVNS03aRcSuFhcRitCgYGmhSdtYm8vZ9NJr7i53+fwukEAdxGe7977n531ehhCCFvZNi3EcF2AYsaRXTxqmVZIlqSco8MMbWiXXp0RPFEraz2+FrczFU4OIdcrgWuTtXf04w+AJAWNS4mC/EhuwHQcNqt8hCeiUgwiIPMIBCT+Kv9jv2+rs6nwWjJegtLfP266zHkQjaZom/MEgXKcOlvU1xV3XRd22EInGIIoinEYDLzPvrt29dXOWM22HUfXqpd5YV3JPLSFfKOBIPI46dbcsCw36OBQKQVVVcLyAcDgMnufBmcZ94tQzbMU46E1Ewm9FloFerSJOyQe1WtM1SJOwLEsrYaAocRSLRayurMC2baSOpvrCnSGOXd9R1Z3fFceL1t3dDcMw4K3lueu6jkgk0hQs03SKoqAjkYQg0E54VgZxA6xPkCzNMJe9W8iy3HT1YntEv9/f3NmbeWt00VkDDLLvF3BvfKJQ0TQDk9Nz7MevuTXbMkkLuVyOLC0tkXw+TxYXF0m5XG7/+0Lnif5UmvpJ7fvH+o913R5/OLqlVXa9R2pZI7peJbQHQlchhY1N8iYzT169TpPhs+fWKCXQ4nIz02nwon+33hH9VK7ZTnrqxf7Ch4XPQ8OnxetXLo9YtQM8n5wy5+eyF2g5m/S+m5Rnt929wmqESOva3spMdo7Ekj0P6JiFj/cl+lJnovHEKP2Otgm0g0NoUIHlrdLjOxOPiOAP3KAjH/6JvwTGnj7DwMj5q5wgDOG/cFjgjwADAFcBQJ8mqhpNAAAAAElFTkSuQmCC',
    "diplomacy":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAINSURBVHjaYmYgAigqKjFPndpup6amKHn27JUXf/78/keMPoa4uEjP//+v///88dD/lOTIGmFhIVaCmjg4uNi2bp139P//U/+/vjvw/8ie+f8tLfU8CWp0cXE0+PL15P///4//v3Z69f/IMNf3jEwM4ng1MTGxMs+Y0Trj//8L/7+8O/i/ND/2PzMzszNQihGvRjVtLYUnL499////8v/Fcxr/8/FytwGFmfG7kZGRKSMxqu3uhbX/r1xa+19XS20fUJSbcBTIyKldcXH9fFhS5L+1ntproJAl0DBGIIZ4A5smAWERocaanEX8sjw8f5+/Ybh36dYRUQHBv156ehomUlLYA4afX5Bn0cLJu/7/v/f/0pVV/8NE+P8bMDCc0RYWrjEWFPQUZWWVw9DEzMzC0dNTNxcU2f//nPxfWZ78mYWZqc2CgWETBwODLNbQZGVlY29oKJv66/el/6Dg375u0n8+Hl5QKIrocnOHCDIxCWNo4uLiZm1qqmj7+/cqUNOZ/4+ubf3v4mDxAiglCpKXZmcX52NiEsDQmJeXHvnl03lw6vjy4vD/+oqU/xyc7AH4IhoUqoyS4hy+Xz4/BDL/Mxw9fYVhw/Yju398/7kdLIADgFPB69cfLz988izo0b2nfPv2n2TYd+Cc158/f17hTR+wZMLGxsErJSms/fvPr5/Pnr0Gufs/Po0AAQYAa0XY5R1wjAAAAAAASUVORK5CYII=',
    "fight":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJMSURBVHjaYmZAAYwMUhJijIxMTAw/f/5m4ODgZPj//z9Yhp+fn+Hv378MTHCljIwMzs7OmjmZSe3yMpJA8f8MTMxMDExAzSBNIMUgANYAEvT397eIiIq8dufhc+HL124xSEtKMHi5OTPx8vKAFfIAaZA6ZhDH1NRULCoq6gYvDw8DMxPz7zfv3l/xdndI//blI+Ppc5fva2mosiYnxpmdOXfhCQsPDw+jja1NPchJ//79Y9DS1jbPzBQ+9vHDB4Zrtx/+NTM1fpWbmVTHwydg+OfPHzUWHW1tIQ11jSxOLi4GISEhhk+fPjN8//aNgY2NnaGlubWcgeFfPQ8PH8P5M4cO/fv7i5FJRlpCVVxCnOHL508M58+fufX05fMPP379ZtDW0mQQFhbiYGJiYfj95zfD02cvr//4+fsfi7SYgNCDG5dudU+eHSTIziwV42q97vFvlh9aWlo/Pn36JPD37x+G9y9eM6xZt7n3799//5k+fvlxYNmqtQZPHj+65qihpPz76X2GZctX2i9ctLD49+8/DKIiIgx79uztP3v23B1wcHFz84AigUFPQVZ4TlrIf1stFX+QuL+fj9aNGzf+T548aacAPz8rSvyyMLMylPg59TWEuL5m5+Bk5eXlZpjQ02JdXVVWw4euGATsDXRkFmWF/zdWU3SA2MrFoKOlzsjGhqmWgZODg7E1wnN9sbfNVRY2dmYGAoDJy0TfVJyHM2DL5Qehf379/IuctrBqMFWSjDhw+3HDbWA4MxADJAV4GdlZWTDEcdkAEGAA0fLPNpkXy98AAAAASUVORK5CYII=',
    "forum":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMhSURBVHjahFNLaFNLGP7Oc3KSk+Tk0ZqmtVVstfi47S2It3ehoIgLhRZx58KVi+LaZXeCWxEVBLsRdCMIIrjxXqTXajdWqy1aHzHVJmlPTNLk5Jw85jxyJ6kguvEffmaGmf+bb/7/+wX8MC4gaSLvCbwLu9Xe/8Z/BO7ZPUh6kolYI7OqHtjcuEj3ji68c4VZyXPJ1t0WWq3vK7YQFMIVsrVmJCIY3wrr+Y/pHOVmrl66cGbiyLVHjxbQqygY/DMBjicsaGu0Kbmuy2YOfsWHwpuXeHr3MU5NT+Hy9ZmpKzMPbopWSU94kDA+OQ4tomL1zSKQe49wSAN1KXiO7zBxPYp0xcTyvI6Rk38jm3mLpXfpRPs3oijIYdO22Dt5fHmrI7ljFJWqBSJJEKJ+1MsGTBYskQAGxo4idlhBb1DB7P3bbYYRBiLwhaorfMzWGAsNnNqLxXQE5VY3mo0SXj98icxyAT4fwSYDArHQ2phHpbCIncMjED27k2CxbHn4Z6GK2ecN0MIakrFl9HT5oGfe49PjeRybOguJiviUaSJuOejp70K2qILXdiEUjTOIDxDDMqNqNbEvtoptCYKgasEJJZDqmcTp89MozT+E8WUNqxsa6q9MFL9uQuHSsKqvoResTonF7Qz53IQfX3NJ1JoNlPI2A+vF4b4ATGMBwt5+UH4dUVPGytwHTB4M4I9BDSVTx7MnWzoRqSOgVBNZ9gEfkcGLPmTyBoLbKBzHwkDfCDaKZUxEvgHjYVZHARZLRd7gWWIduVMdx6au6G2JKa5pKBohpKoEffUgXq3U8PlfHYeSKoZCTdQp0HB5UNsAz+ouS7LUAQkG/JWg34/U5xqMsoVcicNSuoWlOYoYKWN/PwVXS8CQFfBeizFhQiY+9AdCOPHX2NjcixVZzKXW9Fs3dNx78iybK27+JxKJNm3Zjip1pgCCO3UqxcNq8tC+4eMyzzSsSIiIBMNd3fC5/KimqYTrjodIo+nEqmbdZb1RY/ScTsN87y3mPHPCJB9n56rtusFoWO3aPzRwqlI1jZVU9uJP3fgb434BbpvHcfD+F2AADBZU5ppbm/MAAAAASUVORK5CYII=',
    "guild":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA4AAAATCAYAAACgADyUAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANHSURBVHjahFNdaBxVGD135u7Oz2667Xa3iSHUGFK0oUJSqD9U0AfBRwmCoCBFfbf4YB8UH33rY7UgCEK0WhXBFmI1rVnXaNsQSdTSTdiutNvdbHa72Zmd/587M94Nhr5YPHCZe7+5H+f7zrkfwX0QPBi7/5J/F4iqquTEiTem1EzmCcYiSZJSYuPuHeo4Lk2nJUEUifjIxKSkqnsIY6FHCDpzc5+eI8XiAWl+4ZfGgZGxgipJ4Am48v1HOFgwkM0qqNYtPDbzJiYPT8I0AnRaLbz+2uyMEEVRyrZMG3HM+WOe6GCpvArmrkNVq1heXkNvuwfCErAwRKu9CcPs76G8ZEGRZX/0oSzooIFQQr8foueGyEUx6nUTuYzEF8FQJoOt1n5QkYLGSYLG7Q1J73XQ131omgYv6KOrKUg3Y8hyhPmLl1Cp3AIRGXS9Cdc2QT03EP64ej4zJOv4vdKH6/kI/AA3/sygttGGSPh+7XPUqxTFXMTZPE7QBWW8HMbcaPaFNF55dRymKeLDj6so/boJsAj54SG8e/IQnj2mgHApPvu2xcNCTHmlie+7zDBDaL7Hy6CYOqSi0x1Cc8vF00/uw+1GCwgYlAjo8HYGUtBUSohT6iibX7KxvLqNMAxAiI6RERnjSgqbzQArazK3pohCTkV+L4GibEU0RQk7dvwlc3r6KF7mjriOh/ffeweWU8VwMYv1DQ9vvf0Bjj/zFCcSUV4qY+6baz51XS/UNa08MTF2ZFCD44QoFPKYeVTB0ccLONNu75z351XYdohadZ1ZltkVGMeFC9991W71AM7Inx0S/hUTH1IqQMh7G6g8wK1aHT+XFhdt2+4Ig8Bi6fLyDz9eWghDrlTMQ4TCMLin2wbiJORSEHDx+b0ruH5t6XSSJMFOomGY7tmzZ079dvW6F4QRBIHCsSLomgWHn0HSWFm5ifNfzl28171XHqgq7s5No9nomJZVPzI1M7te+QsqqWB0hKJ6V0FheBrnvvikfXlhfjaO423syHQfyd+16k1N6zsZ2XleFrl3Qoo/PYKfyjf0UmnhOd/3ag+cWMqdnRg/+OLDY8XVYj5r7stlv06n0+P/M+i7887HlVCF73IgnPY/8I8AAwCjBaRgQuQjjQAAAABJRU5ErkJggg==',
    "handbook":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAYAAABPeYUaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKxSURBVHjaTFNLTxNRFP7mzoNpS6nEUgoUS3lIJD5iEOIWdiYmJi7csDX8DpckrtzBxvggMVFRA9HoSt2xUsAIBQrysNAW6INOO7Qzc69nWlBPcnJnTs797ne+716JSRLaw2FV9/m8nDsyIAkqUUjgnKNcLqNB06BqCoTA32CM2YZhlFOptIMmTZU/Tz+ZLeTz4vBwT6TTv0Qms0W5I7a342L66SPxY2le5HJpcXSUoTyoZaGQExMTDx66pyncsjS5ag40BQIwSkVUTmxi4MAwTJcMhHOAQi6Ji/190LQG2qO4PGDbJhKJxFX3R+ESpBPBHe4YSCZ/wyxXanSDwSAOUimUCHhzfRX+piBaWs/TGDKOj4/R2tpBB5VrczMoChy/F0z2EjrD1ORzTE09g6r6cS4YAicd+voH0Nt/DTL1NGg6wuE2SJJMGtVFUhitXqbhpJxFcncDQ8NXMDMzh8XFefgb/ZBJ5eTOGnRvgAB5jVmsuxvNzSEa1amLLJgEm5AU1YORkVvQ9UaMj9/H6OhtdEZjrg2IRC+hIxLD7NwnvHr9HrbFSB8dglf/A/HIBEJsKhZ6e7rQE4uSyAZKxSKcagU2NWu6jqGhm8hmj7Gzu0csBLhZB1EkoqsoGqrVElbi3+Br9KKYP8L6WhEyU+jWAAf7e8h17iOfz8DjUSGjRN9ZUEMdxPWRSS69JnRFo2Qv0N5xoaZHNpvFd48HiqaiJRRCJNKOsbF7uH5jGOB0L21+KixjnGyTLasCny9Qu6mMqbAsgYWFJfxc3kRb52Uoso7BwUFyxDVUh5EvQpRMF0MolWq1Ojn5+MOLl+/umqZpS1KdomtfPL62ur6y/GVjq3TnzduvYc6tWt1tsSuOspRIfKRWLp09BUr1dD17Ie7qeshP63KN5r9w65bb90eAAQDrtT7ZVDjhnAAAAABJRU5ErkJggg==',
    "highscore":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAQXSURBVHjajFRbTBxVGP5mzsxeYdllgcLCgmWBBYRysaQUSm1KkYdWY9B4SazYh2L60Cam9QUTfbE1Rn3TGBueDBrByyaNVqENDYjYhbWAgthtcGVZLgWWxQWWvczu8cyi5dYHTzKZmTP/+ea7/OcQ7Bocx4EQHpTS+LsxSUNebCitqSrKtLjvr3gCwUhMnud5Dg8be2blwliMIkWn4qsPZJc9X19iKzCn5MiVkx7vTGfPeJN9zOOY867F/hegPE7VFac9WVfUbjWpGwRBQJTy8XlR4GUJmPhrqe/rm6Ov28fdjtWNWCwsbWGT7UCiQJBl1KovXTh97XRLy3EpLMHvW0I4tBG3QhDEOHuRi+QY1NJZAZLWsxy8EQxvAQqbvvHIy9IrakuyThwuMb1bmZ9Zwil1yDvUiIz8MkyP2bE048LC4hL+dM+yuxeEp9CqFQeiUSqrpA8AVUoF3m4932BWr3yog69A4HkQxgaREMLrAQSJFoXHmzDc242vbJchqjUQCIEgiojGQoE9GQgC4Zufbbz23LnzBY8dewpKTQLC4SCg1WJiyoPW1ncAtYqFxQRGJSgZEM9+KtNi7KRodGc2rD+YYpXS29nZjXlqRMXJV5CWZWHVEQTDEcwv+pigGDh2EcZM1iZ31EYwJDNNoxwhOwFZCc9k/zQ4gi87bPjkiy4YrKUAW6BP0KKq8lEGHmMgMRZIDBFJYsyiMOj1eLr+4NEr5060WbONCTtCkUGTdFqE1tbhZqbH9QSCsGZn4I1LLYxOKC6TMsDkpERY8yxITTHEkzebjM0VVlPzVdvQsY6bY71EIYrcxbMvvH/k8cPgeIJIOIyaQ2VAKLTZqIwNaBT7ci0wZ2Yiw6CBWqBx2TyrZz4iFAyARtZfujUyc4UFytyRotczUg1VR2oq02ury2WDtkxhvbng86OndxB1p55BenY+KCdgfXkeXp8PdyenMPq7kz2v+odd/veInFL/4OhsV89A24xn9vs0vf5gsl6XTrQqgDUxFArcnZ7D1Y/bMeeegkqnR15VLVzOP3Dj+nfwra6z5OXdxK057q188CChFf8atf8y5rnV72ibW1j6QUlIblpK8n5Rn4SFBS8GB+5AikhwTbrgvOeCZV8ihm7/CF1iYtxftv0COwDxb7t7fX/TgaFfPX23R9rn7y9+q+K5Ryxmk6WotBBuzxxCLCx5pxWadRh12JkAJXOFYwyhGHT6LpO9p83m0eVb8VPH6MRs/893Pnc6XR1VFcXFTzQe3Z/IUuaJCL0YwW/DdiRo1KyVKGaXg9+MT/k78TDA/87F7SMlOYl79eWmooGuT7upNE37PnuTvnbSRJvrs3vKc/XFGiXZvWQvoFywuyrVaOAvXjhT/dFbZ2zlOZpqBsRv//6PAAMAu4uzyHaiP7QAAAAASUVORK5CYII=',
    "import":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAtUlEQVR4nLVSMQ7DIAw0VQe6JT9oPsgX2Bn5YPID2NqhUutKINlggof2pBPYRufDYIAgxvgGJZxzpu6vZ0XEV9SQVWx20XY+Q+eEOBjlTFuQnFTr7eGa6xr85Dp/m4loGfhMWJ3du3067z2klMBaCyEEpki/Qjdpgh15J/GB3KSDo5k8isBR4lziXSuSkBb5JLlcBEUhSWRBvpC3sq/YiCOG0euMsErJ2T/Jk7pKZJnUVSIqfAAxaik0NEhvRgAAAABJRU5ErkJggg==',
    "logout":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAA4klEQVR4nK2SPQ7CMAxG3R+pC0tOwsxEjsDKxg1YywZiycpNGBnDxDU6cAkm+ApOa4U4XRrpKUpjvziNiWYYFc9vcAA1r7tMjgU7cANncCp54wUa0HKQzQgsxzWcN5zsxEYrkvyEwElJCNZEmsCnJCnREhhF8M2rRHLH8xOsOKGfF2CrCWQlsvS4ojUoNAHxZmrswUYI+ha4gyu4xMFl/IF+P9DwVYKg4LWhxPPH17H0/woPGv9R8vllJSmB4ys4yjRkPSHwNPYJkdJHUqL2AeX7aJDkBMOJiugYJFOCnGie8QGuEEkZCo35mAAAAABJRU5ErkJggg==',
    "map":    imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAPbSURBVHjafFTLa1xVHP7unXtnJnPnmU6aZIi1iUQTKLWgFfrygW60UpWAuFFxIdQsXLgSN/4BLkQsCG7EhRsFsQoiXRVNlLbEtNHJZDp5TJKZzEwyM/f9fvm7IxUD1d/iPjjnfL/v+853DoN/VS6Xx/MvXMTc3Mup0dLkSSaevmA5fkHS7ObG7sFvt28tVm79fNXaWL0T4r/q8dNn8NXX3wmion8YhKHZlYywWt8Py+utcGFpI/xpoRou3mk2flioXH718vtDqWzh0PpY9Dh74Wl8fOXz6XPnz20FnvdcT1S5VkdEt6+Ci7HwfR+pZAyFdDxbyKRenD115jU/Xfq2svSL4rv230CZXBafXPns6JPnT+902j1uq3EAUTEQ0CDHsog0ZNJJRB+yZkI3TPChOzz+4ENznZ785dbqkjUAenv+Xfb1N978XpX1yVq9A1E24PkBeC6GIwUBiTgPw7DR7irwvGAA7BFDPvTyTryQqZZ/v2Yo/YC9eOmVWcvBM8urO2gfKDAtFxIxclwfjuNjfXsfzX0JQioBjsBZhoHr+ZBVEyzi80fGp45FjFiHH5nfafbQEzWYtguDUFXDou4+hvMpFHIC+RRDMS8gmeARBOFAMs9z0BQdge/OEA7D7Yn+rKlLsGwHtNX0dpEVkhgrZokBi5nJUfQkbSBN1W2srDUxdaxIzVxoqgJdFlMRI84H67qeA4WMdNwQjueRPxwoAiTTgxMLBt2FoQT+qDZwu1yD6dio1bagKETANNmIEasYPv/o9Aimj4/DdqgLdd3vK1i528RuS4RO/5H5gpCAohowNAlr1U309pvQxA5JdZmBR/GYuVgaGcLJRybwxMlJpKizaTpYLu/g+o0qJFoczdza7WKn1Sd2tItqnyQdQO3vgWf8KEghu3a3/MXN2gFJM3Di4RImxvIDL2zHI2/0QRxYMtcm74gYOD4BhnZOU3po1MueZcirgxxJoiwzwzPHM0nuFMewWK7skjSZWFCigwCTE0UUC2mQZeSNj712D/1OHc3NP+FY2ke6Il4NgsCLSe3tMMEz1wvF/FvL5WZ6rbqOGBuL7KMceXigVKQYCFiptbDd6KK+WUG9chO2If1qav33bMtUImkDo4aEDB576tmSxZa+sRTpbLGQg5AZRoxPYnzsKHJZgUDa2N1cRatOTAzpmqZ035HF/jYt9yMM5p/Ty/HIjk6lhvKjL3EMPuBZnIiCF9AUnyLBBC4817hh6dKnqtz/0dA15R7IIaB7xSeSTFLIpinAE2EQDtMEPsKjbIqeYzV0XVMp3RHAoTuJwf/X/cbve6n9JcAAgr0a1gKib7cAAAAASUVORK5CYII=',
    "map_green":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAD/ElEQVR4nHVUW0xcRRj+5pyz17NLF3YXWGBpubhcIiLSLQlWaGlNgZTUthDbFLHWSmqCJtoXe4nAg0mf7Yt96Ys+1CcfTRRjU2ONadTaZbFs6aLZXS7Lnr2ze/Y247QJqLX9k8lMZv7vm3/+//uH4Bk2Mb6fOhoboDHLUIsFIF1ENKLg+rWvhKf5i09unDt7hE5OvTm9b+Qw2ne/BKerme1qa0VlnZM4GnbilYGej1/oaJy5/cOvs//GbbPvH+pjF2bPs7HJd8nIyQnS2tVNDOVWIuoNRG+UiWQtJ1VNDaT31YNkbOI0+fzGNXbuzAm6hZe2Fp39vTjy+ihslRUIxcOIJxRkcyo/YRBFAo3eAMZhqVwOFlnGc13PQ6vT4rPrN/6J6OT5MTY0cgDV9XYsBe5j0b+AVCYOSQPoNCJ3oig3aKGVBCjRCB4ElxFKh2B12fDJ1ctsm6hntxuNu+rgX/IhHA6jyIpIq1k+cyKjCYJoRDKRRDwaQ6lUhEYnosTJU7kMKp21jyMi70wdY0OnT8Bus2Jh0QuVFmAymzmAwWaphklroqlEBqViUtAY9CgIAs3RHF8TsEKRRgMp4ftvfoE4MNw3Xd/RgmhKQTQTA9NQqIUc8vk8HDYHrLKVGCWZCMjxPOkg6rUkkUtAY5JQYpQoGwk88IVApqbfpu6Rg8ioSSSzMRRJkZOoMGlk9HbsRaW+GsgwZAtRrPECxFgW94M+6MtEnj8tIg+TuPn1XZDJmTOse3AAajqJ9cQKVGzyOlFUWuzoad+DHXQHI5si9DIjUTWNhRU/++7OHNGZBZTpzUzxp4nnJx7R+IVTbHDsOOwGM7zBeQSifyKVT0A2GNFc0wa7xs6cVifMkkRUgeLm3R/Z3J1viVZmEApgCb9KIr4CpAJXkqw3o9XRhKLIcyNmkI9mkeS3zz/0wiLaIOllGORyKMk4AsEABIGgUFSRWI1AyskQqQjRe8sz+7L7xRltlQVagwiLxYCN1SAyca4jRlDiAqyqroBRKiPr8VUElGWk80kilHQoKALWfGvkj9seQh5p4OzUG7Rj+ABcLXXIC0nc+nkOkVgYhNeKlkQ20D+AFmsb2UisY375HltcXiLrgTiCnhBb9wbIxrIikK0WGb/8Putyt2GTxfiTfgPRcZEJwiM90f6+feh0tApKTIHH56Uez4Lg9/6F1fkVGvo98N/G7zs6yE59MMGG3zvM3G+52aGLh9jRK8fZa1dG6YdffkSvzn3KLn1xkR27NEq7RrvZzj31rL7Jsd20BE9Y595muklVrhMjHyYQkfeYRve4ivFoHLFwFGoshcC9laf+S/+zRlcFrXdZqdNVRWua7LS6vZbWtNTSZ/n/DaXIu5tm5YsBAAAAAElFTkSuQmCC',
    "hood": imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOsSURBVDhPfZQLTNNHHMf/rRCl9U8pW1Fbh5NaUQQEUdEhXYeZQzYXthjkEZfpMtPgMpmKU7LohCFumk2Dj61j8YHgHBUqiK6gRSitL8pDKmXlUctbRFGmbIjZd71jxCJml/xyl7v7ffL9Pe4YxmkIBB5MbFwCk6fO41UYq5boqxqTS4239+SVVG/c+4t2Qaxyp5vUbz7H2WfceuGipUzObxp+/8CTXY//Gn7699AwOnqfwGS9D6O5F+f0dpw3tPUXVVqUMcrtbjx34XjeG+EKxmhqkDV3Dw49GBhC571BNNofobSqB2fK2nDJ1ANNZQeKr3XhhqUP5fW9Xeu+Ojp9It/9OYwVuDPnS3RelvYBPHv2D+pa+lGg70B+RTsKDZ10ffF6NwzmPgocPVPrW+9GrN7wXNbGL5K5Le095V19g2ju/BPZJXdw8KwVqqIWCvtuxVTgPyN7xy7a6J2cklakHDqnevU1mQuVdaHMOO9y9V3Yuh8jq7gV32Q3ICPHQmfi4AwiQLL3q85OgalZRvgufseHgjSVTYdPldqoQyJGbMfPt7DlSC297AyquHWPhkZgJ7Q27M+tgywkIsqB4TBHihp1aSdvjwER2NajtSir6cW2SD9H9QYdSb6PvCttNOSPMq7j29MWpKhqIZ4VvJqCMous2rST5jGgNbuvIvGAiSaXgBruPKJF0N7sxqbMGoQkZOHDnQbHrIKnZE6MA8Rl0s9YdOnZZupwWNNML6xILseqFD2+Pm6mKkjFTNYHI2HaRywk7icERH4Jj2nSNRS0T12dll9ho6D61odUOoEpksqoEXWkh14EEdicsHiIxK9H09A+2ZPtU2D4A+ordpoTs+0htqvqsHRDPpYlFuPNTToKr2nqH6PI/91dEElkw6yHcDYFzVwQwf3swIXj3+fexKGCJtp8salXEbr+NIWFKQvxg9pKk01Uf7q/CiHxKnj7KeDpNX2vi6vrpJH25nCZ8FVrPdJ/zO35PEODlVt+R3BMJhatPUZhoR/nINVR1dEKvp1UDGlwFKZIfAz8yexUmp/R4cZnmWVR0eKF7yUa/OXxCFq+DvMjNyPg/TQEfrAP4cqziEwqRGj0DsycuxiSGbO1AqEnacQJ417uBBdXRijx5YnnyeO8/eX10kA5fIMUkAW9BR//cEj9lmCGLPDaFLF3Ao8/mbyx8RBnquvESRzW04vlC73m8gSiML5ApGCFIrnwFVEAy7JCLpdD3tb//0kv+bCIw4v20n/tX6W1ZzroMzSSAAAAAElFTkSuQmCC',
    "notes":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACMklEQVR4nMVSPWhTURT+3l9ekpc0aUKFtAkp0SiNTWyoQRfBDhGqEpFOWjtJdRL8gc7PSXCwLgpRFItOVgRxs5tDcRIHwaEgCgoiWqqxef/3el6LISGJk+CBe+87973z/Zx3gH8QUnsyM3+bVyaG9cyuqj5ZKeqj+apeLhf0XOG4Prm/pOdLs/rBA0X9zevVq+11YnuyaURgsWEM5YoIRtN0jgGhDLTRMQQSu6FmMvhsDWJl5QXvCwJNRGhnCUpiAEjtRSOqwkjnYWkqvscz+AoB66E81n9sdpQJ7Ul1fokH02GoAoPDRJiOA48LYMRlcwbLIU47jKmsjOtXplu1cjvIgOrip0kPigjHE/DL42AEIjCZQFw0bWoiA9592uivZO7SHf4lFIHJFOKW0HBNuMz/SNlSZNgeFDeAIZXj4pSMmZM1oUuJSFfTp0/h0b2nVMlguAAnCJF2jxGa44KbdIYjWF2T+imp84eL57HvwmN49Mr0mgQgQuEyGHNhWR5UR0IypiGpGni2OCv0BCmfPYel+nIHiEQ2SBgs10WgKSCmBSCrIhZODKJ27KjQYcePy+PClpKWxYYJfyg49+14YDbxiuRTieHVmtz9d/y48XZ7ju7Xn0D61sSfqeICFZMtRSUVYZF6ZOP9h4/bRL2U+CsqGkiktNYayWnI7pERD27gUCGOMxUTc0dG/q6kVzy/9QCpsIprC7WOXnaBvLx5tyfAjmQUh9MNTIxnsVzvy/Of4zdmZ8SnWI1k6AAAAABJRU5ErkJggg==',
    "research":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAARCAYAAAAG/yacAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJsSURBVHjadFNLa1NBGD0z95Hcm9w2pqnVWlu1RVsKUigVLYKIC6V201BacakrV4I/wJ/hxr0LocUupJX+AYWCi4JdKuKjSZqb5N4k9zUPJ5GWBNoZhmFmzmHO+eYMQU8jhMCybFA1h1FI1JbsrKXkaDZbJzi9l+RkHRSLxcz1G9OL9ZrrCA5fMLm/s7tT+nawL08lmaZB5hcWHq6vPtmQXMCrt7C5sfnGa9ReqmN2jKO9pCAM0fT8YQoJg6RQqbjY+7pnujWX9OL6boqiCG6l2g7aATQh0HDrCMOgqnTJM0mMMdQbXitucegyQRIk4EwGqkRnk7p6BcmIQCCIQrT9CDzhkIL3yevzZBpmavzS+G2pLLf8AGmaRt7JT2mabpxOIoQ+Xlq+f3dhcc2v1REpX45p4+bk3K3LF6/MdBDHUK3LpJSsrhTnX794tWU1knyz7CpJyk8YoZAdGJycmJiNknD/sFo6VL5llzQ3PXv+2b3lbX7wd9SvVJnOGA1LJbTLFbBymQ4lmLhmFZ665aPPP/3yDz2VTpGlB49W2Pfa5Nb7bRRGLujZrN0tQKJuayuZos1UNZEdi7V3Q7Bn9eFzBW3q6tQd2i5DMJWbkgvvdxWGpBCd8HUfWu9YRk6zRoZoZl6XQsovW5+8TCmCnXGgEa1rWaihMaL8EiRUIk4YfpEWGmGUIykzjWHNHs3BfDtm5pYysQGukiotxZICXHVBDRyFTfwR/m6FeWsnZbQt28qn7MUBmnouOJ9RB6b6I+Ccx5EQB55MPjTj4GOSxK3+IOo6GXQcgxJqCyEM+b+xmLFAJSRWe8qixD8BBgCrWDapMzV4egAAAABJRU5ErkJggg==',
    //"settings":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAABjElEQVR4nGNgoDbg5+MH07z8fAyaWhqciorKXJbmFlpGpiZORBmgqqLMXlWYUZCXHp+VnZ85eycDw387++T/p7mYgZjpLwc3FyMuvXCJtOS4YndLvR5eRVmG/87hDG5IihQU5K0fPnh4DK8hKqqqonW93a+Yv75gEInMQDFgFxC7I1mGDTCBCC/vgC6tqBCGKCQDdiEMkMRnANgQdS1NMe8J3QnGX/6g2A4y7Ou8lgfiYsJ/CRry9v3b90IcDH+QBYU4Gf/u3zz9ZWBSjUJFXsxEXi5OLkIGMUhKSTGf4WD4CYoRIFcfiFm0tTQMpk6sfw0U+N9enTVJgJeXm6BB2ICoqLBMc0PuUZBBs7sr1gvz8/KSZZCQoIBARXnKepBBE1uKFgsLCfKQZRAXNydXXFxQG8SgwhVsbCycZBkETCqs2RlR9SCD8lNCJ7GzsZJnEBcXF1tUhFcpyKD60uT1wDAj10UMzEF+jlEgg4K8bTtYmJnwpmacgJGJicFAX13T1c44WlpCmI1c16AAAP7VbLnfqpwNAAAAAElFTkSuQmCC',
    "techtree":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVHjadNNPKMNhHMfx32YzZvInDI3jEmczYjnghJuDs4Obg6LETTlQO7g6u0oOcljKjYMUOayoKWklDqSsyby/6/PTk/LUqz3P83u+v9/3eb7PvEql4jkSyKgfRCPCCGASve56m/TUQjhHCeNoxqGePWMYH+jHpx/gBicQQTuKiGEVSaSx4AdWm1KwDNZwhlYntazTD+m3XlvygnrHELaU9quTzZXT/8IAbjFiE37wNVKWCKYQRgabmNB4FIu4xJKfdhoR54Tj2ME8WjCHXXSiRnMlbFiAtSJqnf3toUn9mMYBjcOKqQRVjrhz8nVo0zlYuoOqQlTPyxjDdkAvyOEY93hDAbPa9wUO0KMX2CE+uqWaUSYrTknMutO3/e5rXcrm/FRP0Ie893/71g2zL9+4X/Z14whJdOFUFYgihzI6/PVuoJ3indLK4wkFlagBLxr/ViX05wbZPZ7Gsv4YdsfflW4WDzrtavsRYABgnoUwEEt7/gAAAABJRU5ErkJggg==',
    "town_builder":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKySURBVHjabJNLaBNhEMf/u/tlN0lbmrJJWkniIyqtpSAKai2Ighe1eCoIgngqCp48ijdPXr0IggdBPAs+QBCCuZVSqLTUNmlt1aavmEez2c0+si9na0WrDjvsx+zszO8/s8vlcjn8bWGyvr6+G6ZpTpfL5WlN08AYg67rcBxnTy5LJBL/FOB5/holPo1EIojH4zep0AufDP8xVq1W9wR2Oyy4rotoNIpkMvk8k8ncI5LzhmFQsg+BSeB4Bo7jwBYXF/cUSKfTsCxrirrerdfrj+iOVCo12N3dXVFVdUyUoi+XZz+gVpqFbWrgBCbA937SCYKA0dHRHc9msyCKx4qi3JFlOZgLmk314UKheH8u/wzMXENruwIhkPbLPc9DoVBAPp9H0FmSpHfUfYAGOOTYNuqK8qpQmFtplma7IxFBddsmSRF4eK73WwPpwh/zunjlMj98Zjg1OTGxWavWvQsjJyR7+fWIbRtrpmEUWYAdEkLgAwp64Vxmf/JQOHzM91zLIGnKp4I6XVzyFVXFx+/l0vH+tHEwmcw1KxunTFXZx4XEEEJMBKNkkbo/iPU8GTH025vwUAKHVSpcI6gNx8V7TWW+JLkD6ShOH41CMMsis0m3HayOkkKEkFeVpRlNNdcBrUlECoLFIWwCRTM42g5mvrZQWFXQKfltNiTHWX9Hl+w4rk1FpG2q8y2ZmGiZ1npLb80fkeVB0fWSBLh6AFy/xflbbY4TP5fLtZrWcth1KXLpluO82Wq3oRPFsu81Znge87adhRRpjjv+WZqGrHPcyQa48S8kbYsTUPP9qzXgLatora7JpoIVp40KeHI/Rg4ViAmxnrGpRqNXsQy0CK9B8V1JsIGOnaX1spAUdp3Duu9bgYadf4EuOtkuE1TB8zodzxcp7O0+A316kk6w5NYPAQYAXhFupGOInKMAAAAASUVORK5CYII=',
    "land_builder":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJDSURBVHjaYmRAAgICAowfPnz4zy8owCQtJcX54/tvRnFRYfmf//5IXL12dS8zEzMDNsACY6irqXKG+LhkfP76/fdfDi7DF8/+JL15/ZeBn/cDw5dv754yMTLJMTEz/8NpCBcXF6OjvXWOkZZyF6+iLENj8wyG08dvM/z9+5uBjw9oED9P+PcvX7EaAAdq6uriizZt+L90+Yz/tr4e/4FCcMzIwLCCgYGREa8BnJycjHkFpQvySqv/CwgLgzUyM7P/tzSz/K8gJ/seyJdiIATUtTTFXT28/zMxsgANYANijv+uzk7/75zd+H/dvJYHkhKi4oTMYGZiZf79/cc3g58//qv/+vUTKPSHQV5eepeBrgKPsbGyND8Pn/TxU5d3/vz1+xdOQ37++PGXnYVtDQcHx7fPn969Bfom7uHDxxPPXbq3m5tfONjL3cJcmI+f99zFm0e+//yJ3SB2DnYGVlZWYNBhhB2juLioXGtT/tF7V7f9n91TsV5UkJ8fq0tYWFgY/v//D4zOvxiSX79++3jp0u0NjCxM6p6u5gFyEpIyZy7d2vvt2/efWA359w97Mvj2/fv38xdvbP347Q9jSIBTtoKkqNKBY+e2//kDTETEGgICv4CBeunSzSNsHBx//L1sc9iYmHgvXr1zCGYQUYaAAFDN32vX7518/+XrpyB3mxp5OUmtG3efbAF6+TfRhkBc9OvP5at3Tv/48+emlalm1bev35jv3n+6jyRDoE76d/PO46v3Hr9cBczTTN9//LwJEGAAO7gXJu9BhzEAAAAASUVORK5CYII=',
    "trade":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAAougcOAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAASLSURBVHjanFRrbBRlFD3z2Pezu92l9LEtbS1IixQVF4NSbCgxGAgmxhjRqBFjbOI/EmIixF9qQqKJ/lD5h/4gGhM0JCQEVGgprUC3tPKybFu6bRf2Mdvt7szsPL/xq4BRgpZ4k5PMfJn7nTv3nnO5SLQGz+14we7zeExByMMwDPwtmDv4XxEOhfHxRwfA6YbJFIrlAVFSXozH4xkbzwr5fI5xebz+zV0b2zpWr4wlp2ZkiwawCFgPSuJ2udHV9Qx4YuhMuTTfEl/XXh1/pLmnvTkysX3T48fj7U2bwzZ5dSGXxhMrdp4gzsDk8Nj17woLNyaIqaVHLuV1kzDQdR2EkPuS3D3nTdPgOle3Oj94bTOU6XPQbWYLAemdvzyImew0CMsg5Fze43bXILzS/7YZ3QqGK11sXzW7SViIVobODRpzt27el8Rut4NlWfAMy9va6gPe+bFjSI/9CglOOBgNrEGQU20YFxy4JYswzATC9TEs66iFjVc6adMeOz04MJDPZe7O7K82hugswqEQuru3MKZJeD7o97KNEQf0coayMrAqDNJFBpJrGdytqyjpHGr8BEGewVi2gOTQz+h8uOrbguS/EWuoD3o9LgdDY2Z2tmzoulrf0GBf17m+jl4VV1St+8KF4Sgf8TksZyWH0bk5tFAhuQmLS6YPfFUTDNVArZeAE7JGalbDlMicdQZsB86cz5x9fmd3x8FPdh8vCFlFswg/OTWTHLl8JcHy9qcaGxra+vr7kUql4HJ7ihxhOVRskW3jRd5dkojTxdFBOR1Qi0XwpRQkQcGkqGmJonUyW7J2Kyq5WJgXFVkq290c3oiF/MG6YMAe8Xlqqr2edVs3Phles6IWDp5H34UEDGIucMSiIgB/KJ2TDl6fN/uzxNksKHq9KBMURAspzVAu55gvyjr7Hm17Wq5UiElM3MxkrIHziZn1j3aubayNBsd/v4poVQBOlsCSJCSujuNMYhTUIgu8pqqYmEiqdF45imP5It/vcblWMZYep7YwdcKOULX9pqmadNsrt1VJsezd3t6uni09dZV8Gn5/AG6PFxbDQpBlDI6MQZYrVInav7qZntOv/ymaxXebzW73rWhqbN25fcfLe998vTeTvEalysHtcIDleJRkDV99fwRHTw/QDDt0TZp7kJXBPNTa6n91166X6ECfdTlsbS2Njc0ujnMSUUBxYR6qLGF5dRA67Pjy8BH8+NOpw7UNTT9oWuUVIZ97ml+KgRqK3bd37/tbN2zYczM1BVNXUE5NIEtbIukSvHYnYsvrIFLnf3roGxw9+cs+URQ/002zvHbtmsFcNpNakiQYCDALgrBt8EwfHMQAQ1tTKi3Q3jHw+UKYnE7h4rVp9A0ncGro3DuyUvmaplVyuawVi8XmVFX7fMl2LRrN43FX10Qj+9Z3dLxVFQg6FVXB8Oioki0UT5iEjEoVeZYab8g0zSs0Rb+bu3//ftAzfsk/WVSUKEr5pCjtSU7e+JBW5bNur3+ZokihUZiL+/DeDU3rW9xdBv+AW9u6c9kt+pC5d1f9R4F/4g8BBgCvBDXcN8CIHwAAAABJRU5ErkJggg==',
    "sitting":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAcElEQVR4nGNgoBJgxCLWAMT1OORwAiYchjRS4iJyDWlANgjEiQNiRVJdAjODBdlUMl2EFYAM/I9kMNGAarE2PADWMGQmwyBQ2MHC8ACyIAxg2EIAwJIKWB8LmgSpAKangWouIgeANJKVaNEBVQzBCQATsRXP9spF+gAAAABJRU5ErkJggg==',
    "units":  imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAASdSURBVHjahFRLbFtFFD3zZt7z+8ROYueftkmaooYChVZqWqRCWSFBkSqEkBA7FpRu2XTBT6hsWCHBAhWJHRtWFAkWlSoVkPgsoFSkaZqmSZzasWM7ju34+34zj2u3ZVXRka5GGs2cO/fccy778N2zeLCUDKEJA7ougEjC3VyiXQGMIYoicPgpLfDe395unF4pNhUX7FsO9vnY3tkaj5m9Ow+WwMMWXdD1GDA4is30EpjGITTO3nrjlaszM2OHvVIJjTtprCysfHxlOfveVqs5YXN9J1LyEcDdRb/sG9qDWbQhpcJmoTw0NzN92NkzADgC41qIwUoZpVrTuHar8LrRCS8qpR4NLKWE1ZfAO2++BkswfPHNpTO1chVa2IDWaaOwmoPb8eHKCJ7vvzxli4vjtg6pov8H1rgGjx59/cOvaJXWmCac87//swFbuhjxKriZryGpXLRDCUeTp+ZsttcyWPY+LrSHU6xY2GkeCDv1oYq0UWqb0ZG5uaXnX5rH/IknEWcSjx97CsP9drcdMDlP7HQCb7XmYn3X64XGiMv/QtNIBKHhNiqf7pY27wSN0i1dtc8eOzaPmdFUZZS+kV3LoFDawXEnwCiVXmy6sC0nV44NlhvWIBrWQC+EJBHd7xaBSitolj9D6J4TQmA1Uxgizr4qbm1y89D+x2ZmJyGhMJxwsLGUxi93tqBrDOPJ/p/yuqM4u4fEiUaxuHD9noa7JcUMjMSNcyrw0FEactUOVjdyYGH7y6PTE7i7nocKfBQaHfAwoHKBrYaHvAoz48moJ1PWPduhJvuSISCVRHTihaqTKTfe9hVDtlzH7fUscvkCKrU6bqTzGB9N4ujBSRxIOmh6IeoeKUdn2DfkVIfjBvpNjvXsFlY28uB7p/fDrXczNMlsASKN/90KGW6vZV7YLhZhxUR2OGHXEgnu12q+c+3PRfy8mMaNQh2DxLFlSFQ156O7O+3cbwurKO62YQjeq6bLLZTbAlo1sGa5m+iCxfFqwrHKA31mad9I/3caZHnXl7h8M4+/MjuY35fCeFygHgRqedtbXkgX9WrT1YnfrhJIx/cIZ5FSU8Tzac/1TrXc6qTuhwMxIYyRfrsS0zHTZ8Y69AIpaveJZ2YwMRzHYmYDN0qeWi60frQ1eWjEiCBdfyng5icik81Bc3cv9DP3A0PoCMm+Prku7EYI5GrBESl0+8yBKTuVGMT007N47iA1cvsu8isRrhc9kdJxciyuoy/GoUJ5slhrXxITY2PI52V5u96Bxb0eNz45Lox4r6mtpjf07NwwLv9xG1LkECd1Xs1ug0cevl+owuYR9gyYPb71rgAoko6xJZIW4Dr8yo5rICLtBsRHoAJ4xHvSBGYtHdVSDZuVNnYDIElDb8AykG8rGJRkLB7DgKkjRuYiJ9AOUgpNw5TFmGb65y2bodxyseszDHIJnyaVbpiY7ErLlZTUwBNJQUAmss0AnUYLI7EIDqEHoerN7W7faApBU5Et2vXK8TiPXmRObC0gXj2mIYAOpjzKLMCptAoBm/QL6ibNjRBpmgkpmyoMOigThUbXclQp76mBTBJFmX8FGABG+E+ACuK/WQAAAABJRU5ErkJggg==',
    "showhide_show": imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLEwwaAPM6XzYAAAI3SURBVCjPzZI7aFNxGMXPvf97836Rh/FFjYRQsaGkSSlNmw5FF4cG8TUUHYQsKm46FZRCRaTFSZdubqI46CCUYIyYKrWNj4rV2tJKK7HWpDeJ9+be9L4cmhbBLuLi2b4ffB8f5xzgH0S2YQwAGwAFgN5gfgBqg22J+n0oVoWeV58WLy1wYpJYbKDJxm2RKyLctOtDZN+Oh16HdWDb5eEHWd2yczckgYck1UFDgywrIISGy+eHwhWRCPhysXCoZ+vtzOTbzq7+88ua2QJNUSCXfuBovGXUKnInYgf225dX1qKVahkWtw9fvpeauiItk0/TY3NU9uVU/PnC6guz1w+GZQFRwMnu1kGHxTii6ggRCkqFl9h7uTd5lTHBZLOByHUk24KD1PW7YzrjdMNqd2ClUMCRjnA2HvD13s7N1hVN/8zQ1PqFRHMsMz039Ozj0oB/z16oqgpKqoFhWANYo3nDZoYBoak7DQtKAMKbflscLsXllwEAiixDKK6Cmni/GJ2paXlR1cCXOTjMRkQ87PFQMPiEMKRNVdRlXpTOPJqavSpqOmwuN/QajwAt3aAA4Oat0cP21u60whogCgL4whKSiei18Uw6096ZOJv/Wj6tWe0gDIEJgFficn29HX2bURmuDA0fsja3PzZ6PGAMRkhCDUrtJ4xONwihwRpYrK9xoL/Nj1xM9V/+I+eJ19Pnxt/NpByBg1HNZIau66AoCnqNhwcqtErh/qljyRSA6t/U2NnohBn/hX4BSTzbA7k5VHwAAAAASUVORK5CYII=',
    "guildjump"    : imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLHRQ1FucYV/EAAAReSURBVDjLnZRbbFRVFIa/vc+Z+0yn7dB2KBRKxQimLQhIoUEsCSTGqA/6oNEHNZJAvIASJRENIURJ4MEnE41GY+KNB6OIAgmEFAQrrSGiLS1WC71DK51Oaadz5pyz9/YBJSFaYvyfVtaf9a+Vtf4smAHjZ08AkP3+kNW6c6M91tZs8R8gZyJKljdhjAln2888PXSxd+fA+fanAPycU3ThwP55AGfffvMfdeJW3Ywx6R+3PPBNR2fviprV955Kp0rfuZYZuz/vFOqSCxfvWLrplcNn3trJqm27ZxbsbW2huqGRzImDTW7vr02jbae25HNTJcF48ZRvEPmCEysog4nE+mctb3xx2cZtX7Xs20Hj9j03C04P9BKtqr4u2vbDbj068Lj77cdV2p0OChE0npTCExLXgAN4xqCEHEktadix8vnXPvzuje2sfX0foretheqVjQDkh/qr+7t7NidmRZ608NL5ri78k4eMMUZowFEGF4ErBZ62TEF7QlvhXGL+7ZvXvLrnkxsTmrFReaG9Y6lty5cTyWBDNBGrCZeUmVw2K8abj2C1tyCAaU/heOAJgQO4GuMqJUQo6sTTVc+sevalr63zx4/ZmbGrW0NBsTeZDK+Il5RUhGJxY5QvAqEgdmUVeU8jhi+BEBgEWlw3iBEIbYTxnXxAa3UfwUi7nZxdiaWdZDhkFkZiMYQl0W7+r91qoqEgctUaRoWFOH0EISwkFqCQWmMjhR8pRhaXv5sby7QKgLHfzy0PB62jAYtSYzRohfnbOmiEEXgFl8GWNtTpw3hIlGWTkxEmEymKF8whUZJcv+SxF47b129tppWbvzY1PloasAMEIjaBYBStfLRRSBHAloKKZXX0XRnG7+livChNZG6amvIokdIUViiuAWwAf2piIhK1B7svZar7egaJyDwPP7qBo0fP0d3ZQ8OaWurraxDKQVeU4SUizC+PEy8uIlZaZpyCEXmicwY9I2wA5+pQPlo+K5MqCpAJC/ycC1ozMTFN88lfmPQk9bWV4OUpLYsQkAFiyRRWvMgozxVObop8OPmc09H+pQ2gjcHzXFE1p5h02Z24joOTmyYUkljxFMFwCOF7aOVhtIexJL7voq5lhNIG381nCIkrFtLYADKcFJaQQmmFJYSJRsLC1x4FT2OiKaQdwlc+2vdRvkJ7HtpY2LbE9eSkH1/wWai0fG8isihvAwyPZCepqjxrq+nVQcsPByxjSV+GjB0WIpwEGcQoD6V9tFYYFJbnqAlVnJWz67cuWnH3pwA97T9jX2g+yKJ1D3nALmBXX/fFldnfWudWlMU3JeJiaVU6kIjEAkHfV5ZRCqU1yPDVrCz7PN30xN7ZCTF0fP/7rN3wCIFU6c3fpr/jJ+bV3gXAex8ckA/WXV5fcM2GgUt+/8I7Fqz1cxPVkzmnWyVv+6junnXHAC52dFFTu/jWX7fn1Bc3YteYBMDlkYlUx4nD8/s6O4v5v/hjZHhGbmp07F/zfwJeXARXYUl+rwAAAABJRU5ErkJggg==',
    "showhide_hide": imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLEwwiMMJ802EAAAJVSURBVCjPvZJdSFNxAMV/995d5z7c3NTEslkohjVTZxkiBfUmkgQRgWAQ+CCGCAVCLz4FBhoEGRhBRBD1YBCWIpQpmM6PFHOhpTnTQsK0qW130zv370kwocc6b+fA4TycH/wDKYC0w1t3edgZCLi3sh6qGf44d9kfCN9XzFZkRQEgHFjG7UqryM/Y05Zss+gCngKVO8u2voqqNd+VeiKhIJHIBjIxdD2KosgkpqRinnrPxcbrL0yzn89LoEsAb0bGc2eC8sTmpk7hkwf0lZ6j/GRBydfZmfHU/a787vHZfuO8n+NjQwxcqGR9crCsof5qp9TrfVfc518aMCWnYlBVCIeoKytu2Gi+dSdSW5esSOhxhZ4jo+7Cjv7KGuKtVhR9g/KCzL0G7/zKQLwzBbPFyvfFRUqL3NkSzHinv0U/dHqnMwd71dO+ibuRx888wamFMYvNxpYhjucjnxZlgxqHajQBYDAYUGTpJ8DYpeqlktbmHARZEtw22xK1xNQ0AKK6zuryEtKQb848qcVC4a0YwdUANpOR/CTVUVSYd07Y7bIwW1zKwnxLS9dwTzgm3NZEJ0ILckCOZMoncg9qgZHudDW6SYLDgbYlWGtsDoRzDptbbzb5RjtfP3xbfe1HQjDkTnA4MUngUnRP2Zli//ZVcsONJqvl0LG14lftLOd68Ge7iWq/MNqdKIpMXkcbX7JyWJf1o7VVFb7dkJiFLDcu70vvbH/0sisWb0IIgSRJCC1IElul5WdPZaia1iPB9B+oCWgS4PwLrvbtIQF1AtTdZSf/U78Bej7paVxFFaYAAAAASUVORK5CYII='
  };
};
  
ANDAPIMP.Config = new function () {
  this.booleanChecked = function () { 
    GM_setValue(this.value, this.checked);
  };
  this.textChanged = function () {
    GM_setValue(this.name, this.value);
  };
  this.numberChanged = function () {
    if (!isNaN(Number(this.value))) {
      GM_setValue(this.name, this.value);
    } else {
      this.value = GM_getValue(this.name, '6');;
    }    
  };
  this.isNumberKey = function (e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
  };  
   this.makeBooleanOption = function (value,text,checked) {
    var aRow = this.newRow("");
    var Cell1 = this.newCell(text,[["class","lbox"],["style","width: 140px;"]]);
    aRow.appendChild(Cell1);
    var Cell2 = this.newCell("",[["class","rbox"]]);
    aRow.appendChild(Cell2);
    var input = this.addElement(Cell2,"input");
    input.type="checkbox";
    input.name=value;
    input.value=value;
    input.checked=checked === true || checked === "true" ? true : false;
    input.addEventListener("change",ANDAPIMP.Config.booleanChecked,true);
    return aRow;
  };
  this.makeHRElement = function () {
    var aRow = this.newRow("");
    var Cell2 = this.newCell("",[["class","rbox"]]);
    Cell2.colSpan=2;
    aRow.appendChild(Cell2);
    optionDiv=document.createElement("div");
    optionDiv.style.marginTop="2px";
    optionDiv.style.marginBottom="2px";
    optionDiv.style.borderTop="1px solid black";
    Cell2.appendChild(optionDiv);
    return aRow;
  };
  this.makeTextOptionHeader = function (value) {
    var aRow = this.newRow("");
    var Cell2 = this.newCell(value,[["class","rbox"]]);
    Cell2.colSpan=2;
    aRow.appendChild(Cell2);
    return aRow;
  };
  this.makeTextOptionTextField = function (value,current,size) {
    var aRow = this.newRow("");
    var Cell2 = this.newCell("",[["class","rbox"]]);
    Cell2.colSpan=2;
    aRow.appendChild(Cell2);
    var input = this.addElement(Cell2,"input");
    if (size) {
      input.size=size;
    }
    input.type="input";
    input.name=value;
    input.value=current;
    input.addEventListener("change",ANDAPIMP.Config.textChanged,true);
    return aRow;
  };
  this.makeTextOption = function  (value,text,current,size) {
    var aRow = this.newRow("");
    var Cell1 = this.newCell(text,[["class","lbox"],["style","width: 140px;"]]);
    aRow.appendChild(Cell1);
    var Cell2 = this.newCell("",[["class","rbox"]]);
    aRow.appendChild(Cell2);
    var input = this.addElement(Cell2,"input");
    if (size) {
      input.size=size;
    }
    input.type="input";
    input.name=value;
    input.value=current;
    input.addEventListener("change",ANDAPIMP.Config.textChanged,true);

    return aRow;
  };
  this.makeNumberOption = function  (value,text,current,size) {
    var aRow = this.newRow("");
    var Cell1 = this.newCell(text,[["class","lbox"],["style","width: 140px;"]]);
    aRow.appendChild(Cell1);
    var Cell2 = this.newCell("",[["class","rbox"]]);
    aRow.appendChild(Cell2);
    var input = this.addElement(Cell2,"input");
    if (size) {
      input.size=size;
      input.maxLength=size;
    }
    input.type="input";
    input.name=value;
    input.value=current;
    input.style.textAlign="right";
    input.addEventListener('keypress',ANDAPIMP.Config.isNumberKey,true);
    input.addEventListener('change',ANDAPIMP.Config.numberChanged,true);

    return aRow;
  };  
  this.addElement = function (node,tag,text) {
    var newNode=document.createElement(tag);
    if (text) {
      newNode.appendChild(document.createTextNode(text));
    }
    node.appendChild(newNode);
    return newNode;
  };
  this.newTable = function (cAttribute) {
    var aTable = document.createElement("TABLE");
    if (cAttribute !== undefined) {
      for (var xi = 0; xi < cAttribute.length; xi++) aTable.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
    }
    return aTable;
  };
  this.newRow = function (iHTML, cAttribute) {
    var aRow = document.createElement("TR");
    aRow.innerHTML = iHTML;
    if (cAttribute !== undefined) {
      for (var xi = 0; xi < cAttribute.length; xi++) {
        aRow.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
        if (cAttribute[xi][0].toUpperCase() == 'TITLE') aRow.setAttribute('alt', cAttribute[xi][1]);
      }
    }
    return aRow;
  };
  this.newCell = function (iHTML, cAttribute) {
    var aCell = document.createElement("TD");
    aCell.innerHTML = iHTML;
    if (cAttribute !== undefined) {
      for (var xi = 0; xi < cAttribute.length; xi++) {
        aCell.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
        if (cAttribute[xi][0].toUpperCase() == 'TITLE') aCell.setAttribute('alt', cAttribute[xi][1]);
      }
    }
    return aCell;
  };
  this.newImage = function (cAttribute) {
    var aImg = document.createElement("IMG");
    if (cAttribute !== undefined) {
      for (var xi = 0; xi < cAttribute.length; xi++) {
        aImg.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
        if (cAttribute[xi][0].toUpperCase() == 'TITLE') aImg.setAttribute('alt', cAttribute[xi][1]);
      }
    }
    return aImg;
  };
  this.newLink = function (iHTML, cAttribute) {
    var aLink = document.createElement("A");
    aLink.innerHTML = iHTML;
    if (cAttribute !== undefined) {
      for (var xi = 0; xi < cAttribute.length; xi++) {
        aLink.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
        if (cAttribute[xi][0].toUpperCase() == 'TITLE') aLink.setAttribute('alt', cAttribute[xi][1]);
      }
    }
    return aLink;
  };
  this.newDiv = function (iHTML, cAttribute) {
    var aDiv = document.createElement("DIV");
    aDiv.innerHTML = iHTML;
    if (cAttribute !== undefined) {
      for (var xi = 0; xi < cAttribute.length; xi++) {
        aDiv.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
        if (cAttribute[xi][0].toUpperCase() == 'TITLE') aDiv.setAttribute('alt', cAttribute[xi][1]);
      }
    }
    return aDiv;
  };
  this.stripHTML = function (str) { 
    return str.replace(/<\/tr>/g,"\n").replace(/<[^>]*>/g, "").replace(/&nbsp;/g,'');
  };
  this.trim = function (str) {
    return str.replace(/[\n\r]/g, '').replace(/ +/g, ' ').replace(/^\s+/g, '').replace(/\s+$/g, '');
  };
  this.jsVoid = 'javaScript:void(0)';
};

ANDAPIMP.extendProfilePage = function () {
  // check for profile page
  if (document.location.href.search('Profile.php') <= 0) return; 

  var profile_form = document.getElementById("profile_form");
  if (profile_form) {
    var profileTD = profile_form.parentNode;
  }
  if (profileTD) {
    var SettingTable = ANDAPIMP.Config.newTable([["class", "main"],["style","width: 100%;"], ["cellpadding", "4"],["cellspacing","0"], ["align","center"]]);
    var aRow = ANDAPIMP.Config.newRow("",[["class","head"]]);
    var Cell1 = ANDAPIMP.Config.newCell("AndaloriaPimp Script",[["colspan","2"]]);
    aRow.appendChild(Cell1);
    SettingTable.appendChild(aRow);

    for (option in ANDAPIMP.configOptions) {
      var optionDiv;
      if (ANDAPIMP.configOptions[option]['bool']!=null) {
        optionDiv=ANDAPIMP.Config.makeBooleanOption(option,ANDAPIMP.configOptions[option]['bool'],GM_getValue(option, false));
        SettingTable.appendChild(optionDiv);
      }
      else if (ANDAPIMP.configOptions[option]['text']!=null) {
        optionDiv=ANDAPIMP.Config.makeTextOption(option,ANDAPIMP.configOptions[option]["text"],GM_getValue(option, ''));
        SettingTable.appendChild(optionDiv);
      }
      else if (ANDAPIMP.configOptions[option]['number']!=null) {
        optionDiv=ANDAPIMP.Config.makeNumberOption(option,ANDAPIMP.configOptions[option]['number'],GM_getValue(option, '1'),2);
        SettingTable.appendChild(optionDiv);
      }      
      else if (ANDAPIMP.configOptions[option]['textlong']!=null) {
        optionDiv=ANDAPIMP.Config.makeTextOptionHeader(ANDAPIMP.configOptions[option]["textlong"]);
        SettingTable.appendChild(optionDiv);
        optionDiv=ANDAPIMP.Config.makeTextOption(option,"",GM_getValue(option, ''));
        SettingTable.appendChild(optionDiv);
      }
      else if (ANDAPIMP.configOptions[option]['boollong']!=null) {
        optionDiv=ANDAPIMP.Config.makeTextOptionHeader(ANDAPIMP.configOptions[option]["boollong"]);
        SettingTable.appendChild(optionDiv);
        optionDiv=ANDAPIMP.Config.makeBooleanOption(option,"",GM_getValue(option, ''));
        SettingTable.appendChild(optionDiv);
      }
      else if (ANDAPIMP.configOptions[option]['sepa']!=null) {
        optionDiv=ANDAPIMP.Config.makeHRElement();
        SettingTable.appendChild(optionDiv);
      }
    }

    // version
    var aRow = ANDAPIMP.Config.newRow("");
    var Cell2 = ANDAPIMP.Config.newCell('Version : ' + ANDAPIMP.version + ' by Aeldra',[["class","rbox"]]);
    Cell2.colSpan=2;
    // --- UNCOMMENT TO PERFORMING UPDATE ---
    /*
    var ImportLink = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['techtree'] +'" alt="" />', [['title', 'Update'], ['href', ANDAPIMP.Config.jsVoid],["class","menu"]]);
    ImportLink.addEventListener("click", 
      function() {
        GM_setValue('last_update', '0');
        ANDAPIMP.checkVersion();
      } , 0);
    Cell2.appendChild(ImportLink);
    */
    aRow.appendChild(Cell2);
    SettingTable.appendChild(aRow);
    // ---

    profileTD.appendChild(SettingTable);
  }
};

ANDAPIMP.checkVersion = function () {
  // --- REMOVE FOR NOT PERFORMING UPDATE ---
  return;

  if ( window.opera ) {
    return; // no X-Site Scripting support in opera
  } 
    
  //get last update
  last_update = GM_getValue('last_update', '0');
  last_update *= 1;
  //check once per day
  if (last_update != '0' ) {
    var day = 1000*60*60*24;
    if (last_update+day > ANDAPIMP.StartTime) { return; };
  }

  //style for mid div
  var midstyle = 'z-index:10000; position: absolute; height: 90px; width: 200px; left: '+(window.innerWidth-200)/2+'px;  top: '+(window.innerHeight-50)/2+'px; background-color: #FFFFFF; text-align: center; font-weight: bold;';
  var divUpdate = ANDAPIMP.Config.newDiv("AndaloriaPimp Update ? ... (klicken zum schliessen) ...",[["style",midstyle]]);
  divUpdate.addEventListener("click", function() { this.style.display='none'; }, true);
  var a = document.body;
  try {
    GM_xmlhttpRequest({
      method: 'GET',
      url: ANDAPIMP.scripturl + '?timestamp='+ANDAPIMP.StartTime,  //shit on cache
      onload: function(result) {
        if (result.status != 200) {
          divUpdate.innerHTML=divUpdate.innerHTML+'<br />Fehler beim Update suchen';
          if (a) a.appendChild(divUpdate);
          return;
        }
        resp = result.responseText;
        if (!resp.match(/([\d.]+)/)) {
          divUpdate.innerHTML=divUpdate.innerHTML+'<br />Falsche Updatedatei gefunden';
          if (a) a.appendChild(divUpdate);
          return;
        }
        var theNewVersion = RegExp.$1;
        
        //set last updatecheck
        GM_setValue('last_update', new Date().getTime().toString());
        
        if (theNewVersion == ANDAPIMP.version) {
          //divUpdate.innerHTML=divUpdate.innerHTML+'<br />Keine neue AndaloriaScript Version' + ' (v ' + ANDAPIMP.version + ') !';
          return;
        } else if (theNewVersion < ANDAPIMP.version) {
          divUpdate.innerHTML=divUpdate.innerHTML+'<br />Du hast eine neuere Version als auf dem Server verfügbar! Wie kommt das?' + ' (v ' + ANDAPIMP.version + ') !';
          if (a) a.appendChild(divUpdate);
          return;
        } else {
          //update?
          //divUpdate.innerHTML=divUpdate.innerHTML+'<br />Neue AndaloriaScript Version' + ' (v ' + theNewVersion + ') gefunden !';
            if (window.confirm('Neue AndaloriaScript Version!' + 
              ' (v ' + theNewVersion + ')!\nAktuell: v '+
              ANDAPIMP.version+'\n\n' + 'Update?' + '\n')) {
            window.location.href = ANDAPIMP.scripturlbase+'andaloriaPimp_'+ theNewVersion+'.user.js';
          }
        }
      }
      /* bug in gm - onerror wird nicht aufgerufen!
      ,
      onerror: function (resp) {
        divUpdate.style.display = 'none';
        //alert(resp.status+" - "+ resp.statusText);
      }*/
    });
    //divUpdate.style.display = 'none';
  } catch (ex) { alert (ex); }
};

/****************************************************************************************************
 * @short Class to calculate best taxes.
 *
 * The @p Taxplaner class provides funcionality to get the best taxes for
 * the andaloria-folks :)\n\n
 * Initially set all data with @p set(), then use either @p taxCalc() or
 * @p getTax() to get a list of taxes and its corresponding effects. Use
 * @p getTaxDetails() to get details about a specific taxrate.
 *
 * @author Robert Vock <smir@andaloria.de>
 * @translate from php to javascript by decay
 */
ANDAPIMP.Taxplaner = new function () {
  this.intGrowth  = null; ///< growth infuence
  this.intInflTax = null; ///< influence on taxes
  this.intTax     = null; ///< taxrate
  this.intWorker  = 0;    ///< workers (not free workers)
  this.intFood    = 0;    ///< food production
  this.intUnit    = 0;    ///< unit slots
  this.intBuild   = 0;    ///< building slots
  this.intGold    = 0;    ///< gold production

  /**
   * constructor.
   */
  this.initialize = function() { };

  /**
   * set the needed values
   * @param $intGrowth  growth infuence
   * @param $intInflTax   influence on taxes
   * @param $intTax     taxrate
   * @param $intWorker  workers (not free workers)
   * @param $intFood    food production
   * @param $intUnit    unit slots
   * @param $intBuild   building slots
   * @param $intGold    gold production
   */
  this.set = function( intGrowth, intInflTax, intTax, intWorker, intFood, intUnit, intBuild, intGold )
  {
    this.intGrowth  = intGrowth;
    this.intGrowth  *= 1;
    this.intInflTax = intInflTax;
    this.intInflTax *= 1;
    this.intTax      = intTax;
    this.intTax      *= 1;
    this.intWorker  = intWorker;
    this.intWorker  *= 1;
    this.intFood    = intFood;
    this.intFood    *= 1;
    this.intUnit    = intUnit;
    this.intUnit    *= 1;
    this.intBuild    = intBuild;
    this.intBuild    *= 1;
    this.intGold    = intGold;
    this.intGold    *= 1;
  };

  /**
   * get an array with food and gold values in an specified intervall
   * @param $intStartTax start value of tax
   * @param $intEndTax   end value of tax
   * @return array (tax,food,gold)
   */
  
  /*taxCalc = function( intStartTax, intEndTax )
  {
    // check params
    $intStart = max( 10, min ( $intStartTax, $intEndTax ) );
    $intEnd   = min( 75, max ( $intStartTax, $intEndTax ) );
    $aReturn  = array();

    for ( $i = $intStart; $i<=$intEnd; $i++)
    {
      $aReturn[$i] = $this->getTax ( $i );
    }
    return $aReturn;
  }*/

  /**
   * get an array with food and gold values for a specific tax rate
   * @param $intTax tax rate, if not set, it will use the tax rate of the set() function
   * @return array
   */
  this.getTax = function( intTax ) 
  {
    if ( !intTax)
    {
      if ( !this.intTax )
      {
        // no tax value set
        return false;
      }
      intTax = this.intTax;
    }

    intTotalWorker = 650 - intTax * 25 + this.intGrowth * 10;
    intFreeWorker  = Math.max( 2, intTotalWorker - this.intWorker );
    intTaxIncome   = Math.round ( intFreeWorker * 1.5 * intTax / 100 * ( 1 + this.intInflTax / 100 ) );
    intFoodNeeded  = Math.round ( intFreeWorker / 2.5);
    intFood    = this.intFood - ( 5 * ( this.intBuild + this.intUnit ) + intFoodNeeded );
    intGold    = intTaxIncome + this.intGold - ( 5 * ( this.intBuild + this.intUnit ) );
    return { tax : intTax, gold : intGold, food : intFood };
  };

  /**
   * get details for a specific tax rate
   * @param $intTax tax rate, if not set, it will use the tax rate of the set() function
   * @return array
   */
  this.getTaxDetails = function ( intTax )
  {
    if ( !intTax)
    {
      if ( !this.intTax )
      {
        // no tax value set
        return false;
      }
      intTax = this.intTax;
    }
    intTotalWorker = 650 - intTax * 25 + this.intGrowth * 10;
    intFreeWorker  = Math.max( 2, intTotalWorker - this.intWorker );
    intTaxIncome   = Math.round ( intFreeWorker * 1.5 * intTax / 100 * ( 1 + this.intInflTax / 100 ) );
    intFoodNeeded  = Math.round ( intFreeWorker / 2.5);
    intFood    = this.intFood - ( 5 * ( this.intBuild + this.intUnit ) + intFoodNeeded );
    intGold    = intTaxIncome + this.intGold - ( 5 * ( this.intBuild + this.intUnit ) );

    return { 'workers_sum'  : intTotalWorker,
         'workers_free' : intFreeWorker,
         'tax_income'   : intTaxIncome,
         'food_production'  : this.intFood,
         'food_needed'    : intFoodNeeded,
         'food' : intFood,
         'gold' : intGold };
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Bilanz
ANDAPIMP.extendBalancePage = function () {
  if ((ANDAPIMP.b_bilanz !== true) || ((document.location.href.search('Balance.php')) <= 0)) { 
    return;
  }
  // get food and gold image
  var foodImg = "";
  var goldImg = "";
  var imgTest = document.getElementsByTagName('img');
  for (var x=0; x < imgTest.length; ++x) {
    if (imgTest[x].alt == "Nahrung") {
      foodImg = imgTest[x].src;
    }
    if (imgTest[x].alt == "Goldmünzen") {
      goldImg = imgTest[x].src;
    }
    if (foodImg != "" && goldImg != "") {
      break;
    }
  }
  //javascript in header einfuegen
  var jscript = 'function setTax ( newtax ){\n   if( ! Navigation.aTownList[Navigation.currentTown])\n   {\n    return;\n   }\n   Navigation.aTownList[Navigation.currentTown].tax = newtax;\n   var intTax = newtax.toInt();\n   \n    var AJAXcallback = function(oReply)\n    {\n    if(oReply.hasError())\n    {\n     MessageBox.warning(oReply.getErrorText());\n     return;\n    }\n    Navigation.aTownList[Navigation.currentTown].tax = oReply.getContent().tax;\n    if(location.href.match(\/Balance\\.php\/))\n    {\n     var elmForm = document.getElementById(\"nav_reload\");\n     elmForm._p.value = Navigation.paramLong;\n     elmForm.submit();\n     return;\n    }\n    MessageBox.information(\"Der Steuersatz wurde geändert.\");\n    }\n    .bind(Navigation);\n    RPC.call(\"town\",\n    {\n    tax : intTax, _p : Navigation.aTownList[Navigation.currentTown].param\n    }\n    , AJAXcallback);\n}';

  var headTag = document.getElementsByTagName('head')[0]; 
  script = document.createElement('script'); 
  script.id = 'hiddenScript'; 
  script.type = 'text/javascript'; 
  script.innerHTML = jscript; 
  headTag.appendChild(script);

  //-->>check url nur bei bilanz
  //if (allLinks[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
  var tp_infl_growth;
  for (var i = 0; i < document.forms.length; i++) {
    if (document.forms[i].elements.length==10) {
      for (var ei = 0; ei < document.forms[i].elements.length; ei++) {
        if (document.forms[i].elements[ei].name=='tp_infl_growth') {tp_infl_growth=document.forms[i].elements[ei].value;}
        if (document.forms[i].elements[ei].name=='tp_infl_tax')    {tp_infl_tax=document.forms[i].elements[ei].value;}
        if (document.forms[i].elements[ei].name=='tp_tax')         {tp_tax=document.forms[i].elements[ei].value;}
        if (document.forms[i].elements[ei].name=='tp_worker')      {tp_worker=document.forms[i].elements[ei].value;}
        if (document.forms[i].elements[ei].name=='tp_food')        {tp_food=document.forms[i].elements[ei].value;}
        if (document.forms[i].elements[ei].name=='tp_unit')        {tp_unit=document.forms[i].elements[ei].value;}
        if (document.forms[i].elements[ei].name=='tp_build')       {tp_build=document.forms[i].elements[ei].value;}
        if (document.forms[i].elements[ei].name=='tp_gold')        {intGold=document.forms[i].elements[ei].value;}
      }
      break;
    }
  }

  if (tp_infl_growth) {
    ANDAPIMP.Taxplaner.set(tp_infl_growth,tp_infl_tax,tp_tax,tp_worker,tp_food,tp_unit,tp_build,intGold);
    details = ANDAPIMP.Taxplaner.getTaxDetails();
    maintable = document.getElementById("body");
    tds = maintable.getElementsByTagName('td');
    for (var i = 0; i < tds.length; i++) {
      //eintragungen der zielwerte in die erste tabelle mit blauer schrift
      if (tds[i].innerHTML=="Neue Menge") {
        diff = tds[i+4].innerHTML; 
        diff = diff.replace(/\./g, '')  //. entfernen
        diff *=1; diff = details.workers_free - diff;
        (diff<0) ? sd = "" : sd = "+";
        tds[i+4].innerHTML+= "<font color=\"blue\">" + sd + diff +"</font>";
        tds[i+5].innerHTML+= " <font color=\"blue\">(" + details.workers_free +")</font>";
        tds[i+17].innerHTML+=" <font color=\"blue\">(" + details.food +")</font>";
        tds[i+37].innerHTML+=" <font color=\"blue\">(" + details.gold +")</font>";
      }
      
      //kleine tabelle mit +-plusminus werten
      if (tds[i].innerHTML=="Steuern") {
        var resTable = ANDAPIMP.Config.newTable([["cellspacing", "0"], ["cellpadding", "5"],["border","1"], ["rules","all"], ["align","center"], ["valign","middle"]]);
        var tdBorder = 'width: 30px; border: 1px #000000 solid; border-left: 0px #000000 none; border-right: 0px #000000 none; vertical-align:middle;';
        var plusminus = Number(ANDAPIMP.i_taxes);
        
        var aRow = ANDAPIMP.Config.newRow('');
        aRow.appendChild(ANDAPIMP.Config.newCell("<b>%</b>", [['style', tdBorder]]));
        resTable.appendChild(aRow);
        aRow = ANDAPIMP.Config.newRow("");
        aRow.appendChild(ANDAPIMP.Config.newCell('<img src="'+foodImg+'">', [['style', tdBorder], ['class', 'goodimg']]));
        resTable.appendChild(aRow);
        aRow = ANDAPIMP.Config.newRow("");
        aRow.appendChild(ANDAPIMP.Config.newCell('<img src="'+goldImg+'">', [['style', tdBorder], ['class', 'goodimg']]));
        resTable.appendChild(aRow);
                
        if (isNaN(plusminus) || plusminus <= 0 || plusminus > 20) plusminus = 6;

        tp_tax *= 1;
        var taxp = tp_tax + plusminus;
        var taxm = tp_tax - plusminus;
        
        if (taxp > 75) {
          taxm = taxm + (75 - taxp);
          taxp = 75;
        } else if (taxm < 10) {
          taxp = taxp + (10 - taxm);
          taxm = 10;
        }
        
        for (var j = taxm; j <= taxp; j++) {
          details2 = ANDAPIMP.Taxplaner.getTaxDetails(j);
          var tdFontW = '';
          var tdCol = '';
          if (j == tp_tax){
            tdCol = 'color: blue;';
            tdFontW = 'font-weight: bold;'
            var taxLink = ANDAPIMP.Config.newDiv(j, [['title', 'Steuer auf ' + j + '%'], ['style', tdFontW + tdCol]]);
          } else {
            var taxLink = ANDAPIMP.Config.newLink(j, [['title', 'Steuer auf ' + j + '%'], ['href', 'javascript:setTax('+ j +');']]);
          } 
          for (var k = 0; k < resTable.rows.length; k++) {
            var aCell = resTable.rows[k].insertCell(-1);
            if (k == 0) {
              aCell.appendChild(taxLink);
            } else if (k == 1) {
              aCell.appendChild(ANDAPIMP.Config.newDiv(details2.food, [['title', 'Nahrung' + (details2.food>0?' +':' ') + details2.food],['style', tdFontW + details2.food<0?'color: darkred;':tdCol]]));
            } else {
              aCell.appendChild(ANDAPIMP.Config.newDiv(details2.gold, [['title', 'Goldmünzen' + (details2.gold>0?' +':' ') + details2.gold],['style', tdFontW + details2.gold<0?'color: darkred;':tdCol]]));
            }
          }
        }
        tds[i+1].appendChild(resTable);        
        break;
      }
    }
  }
};

ANDAPIMP.importMap = function () {
  if (document.getElementById('TextCell')) document.getElementById('TextCell').innerHTML =""; 
  var found = 0;
  //suche div mit field_infos //nur die letzte aufgemachte stadt wird gescannt
  var allElems = document.getElementsByTagName('div');
  for (var i = 0; i < allElems.length; i++) {
    var thisElem = allElems[i];
    if (thisElem.className && thisElem.className == 'field_infos') {
      found = 1;
      //break; //-->nur die erste stadt
    }
  }  

  if (found == 1) {
    ANDAPIMP.pageChecker.checkPage(document, thisElem.innerHTML);
  } else {
    ANDAPIMP.pageChecker.checkPage(document, "");
  }
};

ANDAPIMP.addMenuButtons = function () {
  this.addCommonButtons = function (elem) {

    // messages 
    if (ANDAPIMP.b_betterMsg === true) {
      var bull = document.getElementById('bulletin');
      if (bull && bull.src.search('message_new.png') > 0) {
        // search for Spieler and Gildennachrichten                                                       
        var h = bull.parentNode.innerHTML;
        var suche = /.*\'(\d+).*Spielernachrichten.*/g;       
        suche.exec(h);
        var nuser= RegExp.$1;
        suche = /.*\<br\>(\d+).*Gildennachrichten.*/g;
        suche.exec(h);
        var nguild = RegExp.$1;
        // create new messages element
        var jk = document.createElement("div");
        var msgText = "<nobr>"+bull.parentNode.innerHTML+"<br>";
        if (nuser > 0) {msgText += "<font color='red' size='1'>"+nuser+"</font>";}
        else {msgText += "<font color='white' size='1'>"+nuser+"</font>";}
        msgText += "<font color='white' size='1'>/</font>";                                                         
        if (nguild > 0) {msgText += "<font color='red' size='1'>"+nguild+"</font>";}
        else {msgText += "<font color='white' size='1'>"+nguild+"</font>";}
        msgText += "</nobr>";
        // assign new messages
        bull.parentNode.innerHTML = msgText;
        // resize menu bar
        document.getElementById('menu_townbar').style.width = "320px";
      }
    }

    // guild link
    if (ANDAPIMP.strGuildUrl !== '') {
      var guildLink = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['guildjump'] +'" alt="" />', [['title', 'Gildenforum : '+ANDAPIMP.strGuildUrl], ['href', ANDAPIMP.strGuildUrl],["id","guildjump"],["class","menu"],["style",MenuStyle],["target","_blank"]]);
      elem.appendChild(guildLink);
    }

    //phpmap import
    if (ANDAPIMP.b_import === true && document.location.href.search('Map.php') > 0) {
      var ImportLink = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['import'] +'" alt="" />', [['title', 'PHPMap Import'], ['href', ANDAPIMP.Config.jsVoid],["class","menu"],["style",MenuStyle]]);
      ImportLink.addEventListener("click", 
        function() {
          ANDAPIMP.importMap();
        } , 0);
      elem.appendChild(ImportLink);
    }
    
    if (ANDAPIMP.b_hidebuild === true && document.location.href.search('Map.php') > 0) {
      var HideLink = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['showhide_hide'] +'" alt="" />', [['title', 'Hide'], ['href', ANDAPIMP.Config.jsVoid],["id","showhide_hide"],["class","menu"],["style",MenuStyle]]);
      var ShowLink = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['showhide_show'] +'" alt="" />', [['title', 'Show'], ['href', ANDAPIMP.Config.jsVoid],["id","showhide_show"],["class","menu"],["style",MenuStyle]]);
      HideLink.addEventListener("click", 
        function() {
          ANDAPIMP.hideBuildings();
          document.getElementById("showhide_show").style.display="block";
          document.getElementById("showhide_hide").style.display="none";
        } , 0);
      elem.appendChild(HideLink);
      ShowLink.addEventListener("click", 
        function() {
          ANDAPIMP.showBuildings();
          document.getElementById("showhide_show").style.display="none";
          document.getElementById("showhide_hide").style.display="block";
        } , 0);
      elem.appendChild(ShowLink);
    }

    //phpmap link
    if (document.location.href.search('Map.php') > 0) 
    {
      inhaltx = document.getElementById("coord_x").value;
      inhalty = document.getElementById("coord_y").value;
      var phpmapLink = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['map_green'] +'" alt="" />', [['title', 'PhpMap ' + inhaltx + ':' + inhalty], ['target','_blank'], ['href', ANDAPIMP.strPHPMapUrl + '/map.php?x=' + inhaltx + '&y=' + inhalty],["class","menu"],["style",MenuStyle]]);
    } else {
      var phpmapLink = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['map_green'] +'" alt="" />', [['title', 'PhpMap'], ['target','_blank'], ['href', ANDAPIMP.strPHPMapUrl + '/map.php'],["class","menu"],["style",MenuStyle]]);
    }
    elem.appendChild(phpmapLink);

    
    //update button
    if (document.location.href.search('Profile.php') > 0) 
    {
      var ImportLink = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['techtree'] +'" alt="" />', [['title', 'Update'], ['href', ANDAPIMP.Config.jsVoid],["class","menu"],["style",MenuStyle]]);
      ImportLink.addEventListener("click", 
        function() {
          GM_setValue('last_update', '0');
          ANDAPIMP.checkVersion();
        } , 0);
      elem.appendChild(ImportLink);
    }
    
    //bilanz button
    if (document.location.href.search('Balance.php') > 0) 
    {
      var ImportLink = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['techtree'] +'" alt="" />', [['title', 'Bilanz ins Forum'], ['href', ANDAPIMP.Config.jsVoid],["class","menu"],["style",MenuStyle]]);
      ImportLink.addEventListener("click", 
        function() {
          ANDAPIMP.ConvertBilanz();
        } , 0);
      elem.appendChild(ImportLink);
    }
  };
  
  var mmenu = document.getElementById('menu');
  var MenuStyle = "width:20px;height:20px;";
  if (mmenu) {
    // base64 coded images included in script
    if (ANDAPIMP.b_showbuttons === true) {
      tab = ANDAPIMP.Config.newTable([["cellspacing", "0"], ["cellpadding", "0"],["border","1"],["id","tech_tab"]]);
      var menu_tab = ANDAPIMP.Config.newTable(""); 
      var aRow = ANDAPIMP.Config.newRow("");
      
      //menu_tech
      if (document.getElementById('menu_tech')) document.getElementById('menu_tech').style.display = 'none';
      var Cell1 = ANDAPIMP.Config.newCell("",[["style","height:25px; overflow:hidden; font-size: 9px;"]]);
      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ ANDAPIMP.image['land_builder'] +'" alt="" />', [['title', 'LandBau'], ['href', 'javascript:Navigation.navigate(\'land_build\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1);

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['town_builder'] +'" alt="" />', [['title', 'StadtBau'], ['href', 'javascript:Navigation.navigate(\'town_build\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1);

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['research'] +'" alt="" />', [['title', 'Forschung'], ['href', 'javascript:Navigation.navigate(\'research\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1);

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['build_loop'] +'" alt="" />', [['title', 'Bauschleife'], ['href', 'javascript:Navigation.navigate(\'build_queue\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 
      aRow.appendChild(Cell1);
      
      //menu_town
      document.getElementById('menu_town').style.display = 'none';
      var Cell1 = ANDAPIMP.Config.newCell("");
      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['balance'] +'" alt="" />', [['title', 'Bilanz'], ['href', 'javascript:Navigation.navigate(\'balance\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1);

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['barracks'] +'" alt="" />', [['title', 'Kaserne'], ['href', 'javascript:Navigation.navigate(\'barracks\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1);

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['trade'] +'" alt="" />', [['title', 'Handel'], ['href', 'javascript:Navigation.navigate(\'trade\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1);

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['map'] +'" alt="" />', [['title', 'Karte'], ['href', 'javascript:Navigation.navigate(\'map\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['hood'] +'" alt="" />', [['title', 'Umgebung'], ['href', 'javascript:Navigation.navigate(\'hood\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['change_town_tax'] +'" alt="" />', [['title', 'Name ändern'], ['href', 'javascript:Navigation.changeTownName();'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      aRow.appendChild(Cell1);

      //menu_empire
      document.getElementById('menu_empire').style.display = 'none';
      var Cell1 = ANDAPIMP.Config.newCell("");
      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['units'] +'" alt="" />', [['title', 'Einheiten'], ['href', 'javascript:Navigation.navigate(\'unit\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['fight'] +'" alt="" />', [['title', 'Kämpfe'], ['href', 'javascript:Navigation.navigate(\'fightreport\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['guild'] +'" alt="" />', [['title', 'Gilde'], ['href', 'javascript:Navigation.navigate(\'guild\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['diplomacy'] +'" alt="" />', [['title', 'Diplomatie'], ['href', 'javascript:Navigation.navigate(\'diplomacy\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      aRow.appendChild(Cell1);
      
      //menu_extras
      document.getElementById('menu_extras').style.display = 'none';
      var Cell1 = ANDAPIMP.Config.newCell("");
      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['highscore'] +'" alt="" />', [['title', 'Highscore'], ['href', 'javascript:Navigation.navigate(\'highscore\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['account'] +'" alt="" />', [['title', 'Profil'], ['href', 'javascript:Navigation.navigate(\'profile\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['forum'] +'" alt="" />', [['title', 'Forum'], ['href', 'javascript:Navigation.navigate(\'forum\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['chat'] +'" alt="" />', [['title', 'Chat'], ['href', 'javascript:Navigation.navigate(\'chat\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 
      
      //Sitting links
      //suche sitting button
      submenu_extras = document.getElementById("submenu_extras");
      extralinks = submenu_extras.getElementsByTagName('a');
      for (var i = 0; i < extralinks.length; i++) {
        if ((extralinks[i].innerHTML.search('Accountwechsel') > -1) || (extralinks[i].innerHTML.search('Eigener Account') > -1))
        {
          var sittinglink=extralinks[i];
          break;
        }
      }
      if (sittinglink) {
        sittingtitle = sittinglink.title;
        sittinghref  = sittinglink.href;
        var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['sitting'] +'" alt="" />', [['title', 'Sitting '+sittingtitle], ['href', sittinghref],["class","menu"],["style",MenuStyle]]);
        Cell1.appendChild(Link1); 
      }

      aRow.appendChild(Cell1);

      //menu_help
      document.getElementById('menu_help').style.display = 'none';
      var Cell1 = ANDAPIMP.Config.newCell("");
      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['techtree'] +'" alt="" />', [['title', 'Techtree'], ['href', 'javascript:Navigation.navigate(\'techtree\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['handbook'] +'" alt="" />', [['title', 'Handbuch'], ['href', 'javascript:Navigation.navigate(\'manual\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['notes'] +'" alt="" />', [['title', 'Notizen'], ['href', 'javascript:Navigation.navigate(\'notes\');'],["class","menu"],["style",MenuStyle]]);
      Cell1.appendChild(Link1); 

      aRow.appendChild(Cell1);
      
      //Lastcell
      var LastCell = ANDAPIMP.Config.newCell("");

      //logout
      var Link1 = ANDAPIMP.Config.newLink('<img src="'+ANDAPIMP.image['logout'] +'" alt="" />', [['title', 'Logout'], ['href', 'javascript:Navigation.navigate(\'logout\');'],["class","menu"],["style",MenuStyle]]);
      LastCell.appendChild(Link1); 

      this.addCommonButtons(LastCell);

      //coords+townbar
      var Cell1 = ANDAPIMP.Config.newCell("");
      Cell1.appendChild(document.getElementById('menu_coords'));
      Cell1.appendChild(document.getElementById('menu_townbar'));
      aRow.appendChild(Cell1);

      //append lastcell
      aRow.appendChild(LastCell);

      var TextCell = ANDAPIMP.Config.newCell("");
      var TextDiv = ANDAPIMP.Config.newDiv("",[["id","TextCell"],["style","height:50px;width:50px; overflow:hidden; font-size: 9px;"]]);
      TextCell.appendChild(TextDiv);
      aRow.appendChild(TextCell);

      menu_tab.appendChild(aRow);
      mmenu.insertBefore(menu_tab, mmenu.firstChild);
    
    } //b_showbuttons
    else
    {  
      this.addCommonButtons(mmenu);

      var TextDiv = ANDAPIMP.Config.newDiv("",[["id","TextCell"],["style","height:50px;width:50px; overflow:hidden; font-size: 9px;"]]);
      mmenu.appendChild(TextDiv);
    }
    if (document.getElementById("showhide_show")) document.getElementById("showhide_show").style.display="none";
  } 
};

ANDAPIMP.pageChecker = new function () {
  this.booFeedback = false; // true;
  this.checkPage = function(doc, fieldinfo) {

    if( doc.location.host !== "game1.andaloria.de" ) {
      if( this.booFeedback ) {
        alert( "Andaloria Script für Map import: Ungültige Seite" );
      }
      return;
      }
      if( doc.location.pathname.search("Map.php") > -1 ) {
        if (fieldinfo !== "") {
          this.trackData(fieldinfo,"controlpad");
        } else {
          var src = doc.getElementsByTagName("html")[0].innerHTML;
          this.trackData( src, "map");
        }
        /* Guild import not supported at the moment
        } else if( doc.location.pathname.search("Guild.php") > -1 ) {
          var src = doc.getElementsByTagName("html")[0].innerHTML;
          if( src.indexOf("<td colspan=\"5\">Gildenmitglieder</td>") > -1 ) {
            ANDAPIMP.trackData(src, "guild");
          }
        */
      } else if( this.booFeedback ) {
        alert( "Andaloria Script funktioniert nur bei der Karte, den Feldinfos und bei Gildenmitgliedern." );
      }
    };

  this.trackData = function( src, pageFlag ) {
    if ( window.opera ) {
      return; // no X-Site Scripting support in opera
    } 

    if( pageFlag === "map" ) {
      src = src.replace(/\r/g, '' );
      src = src.replace(/\n/g, ' ' );
//      src = src.replace(/.*Clock.setServertime(.*?);/g, ""); // delete all before setServertime
//      src = src.replace(/<title>Andaloria Map.*<div style=".*?" id="map"/g, "" );
//      src = src.replace( /<style.*?<\/style>/g, "" );
//      src = src.replace( /<head>.*<\/head>/gm, "" );
//      src = src.replace( /.*<div style=".*?" id="map"/, "" );
      src = src.replace(/<img/g, "\n<img");
      src = src.replace(/aBuild/g, "\naBuild");
      src = src.replace(/aBorder/g, "\naBorder");
      src = src.replace(/aRoad/g, "\naRoad");
      src = src.replace(/aField/g, "\naField");
      src = src.replace(/aUnit/g, "\naUnit");
      src = src.replace(/aTown/g, "\naTown");
      src = src.replace(/ src=".*?terrain\/(\d.*?)" class=".*?" style=".*?" name=".*?" alt=".*?">/gm, ' src="$1"');

      var strFields  = "[Fields]\n" , strBuildings = "[Buildings]\n", strBorders = "[Borders]\n";
      var strStreets = "[Streets]\n", strUnits   = "[Units]\n";

      var aData = src.split(/\n/);
       for( var i=0; i<aData.length; ++i ) {
        if( ANDAPIMP.b_mapimport && aData[i].match(/<img/) ) {
          if( !( aResult = aData[i].match(/id="t:(\d+):(\d+)" src="(\d*)-(.*?)(f){0,1}\.png"/) ) ) {
            continue;
          }
          strFields += aResult[1] + " " + aResult[2] + " " + aResult[3] + " " + aResult[4] + " " + (aResult[5]?"1":"0") + "\n";
        } else if( aData[i].match(/aBorders/) ) {
          if( !( aResult = aData[i].match(/\["(\d*)", "(\d*)", "(\w)(\d*)"\]/) ) ) {
            continue;
          }
          strBorders += aResult[1] + " " + aResult[2] + " " + ( aResult[3] === "e" ? parseInt( aResult[4],10 ) | 16 : aResult[4] ) + "\n";
        } else if( aData[i].match(/aRoads/) ) {
           if( !( aResult = aData[i].match(/\["(\d*)", "(\d*)", "(\d*)"\]/) ) ) {
            continue;
          }
          strStreets += aResult[1] + " " + aResult[2] + " " + aResult[3] + "\n";
        } else if( aData[i].match(/aBuildings/) ) {
          if( !( aResult = aData[i].match(/\["(\d*)", "(\d*)", "(.*?)", "(.*?)".*\]/) ) ) {
            continue;
          }
          // 1->x, 2->y, 3->Name, 4->Bild
          strBuildings += aResult[1] + " " + aResult[2] + " " + aResult[4] + "\n";
        } else if( aData[i].match(/aUnitFields/) ) {
          if( !( aResult = aData[i].match(/\[(\d*), (\d*), "(.*)", "(\d*)", (\d*), "(\d*)"\]/) ) ) {
            continue;
          }
          // 1->x, 2->y, 3->Bild, 6->EinheitenAnzahl
          strUnits += aResult[1] + " " + aResult[2] + " " + aResult[3][0] + "\n";
        }
      }
      src = "Version 1.0\n"+ strFields+strBuildings+strBorders+strStreets+strUnits;
      if ( this.booFeedback ) {
      alert('Fields : '+(strFields.split("\n").length-2)+
        '\nBuildings : '+(strBuildings.split("\n").length-2)+
        '\nBorders : '+(strBorders.split("\n").length-2)+
        '\nUnits : '+(strUnits.split("\n").length-2));
      }
    } else {
      //preparsing: remove head, style and javascript
      //source = source.replace( /<head>.*?<\/head>/g, "" )
      //         .replace( /<script.*?<\/script>/g, "" )
      //         .replace( /<style.*?<\/style>/g, "" );
      
      //angriffs und verteidigungswerte separieren!

      src = src.replace( /(.*?Feldinformation)/g, "Feldinformation" );
      
      regionIndex = src.indexOf("Einheiten</th>");
      startString = "<tr>";
      endString = "Zum Kampfrechner";
      
      if (regionIndex != -1)
      {
        startIndex = src.indexOf(startString, regionIndex);
        endIndex = src.length;//indexOf(endString, regionIndex);

        if (startIndex != -1 && endIndex != -1)
        {
          var unitSource = src.substring(startIndex, endIndex);
          unitSource = unitSource.replace(/<td>A:<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td>/g, "A: $1 $2 $3 $4 $5");
          unitSource = unitSource.replace(/<td>V:<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td>/g, "V: $1 $2 $3 $4 $5");
          src = src.substring(0, startIndex);
          src = src + "<tr>" + unitSource;
        }
      }
      //alert(src);
    }

    var strBroker = ANDAPIMP.strPHPMapUrl;
    if (strBroker.search(/Broker\.php/) < 0)
      strBroker = strBroker.replace(/\/$/g,'') + '/Broker.php';
    
    //XsiteScripting
    GM_xmlhttpRequest({
      onreadystatechange: function (resp) {
        if( resp.readyState == 4 && resp.status != 200 ) {
          alert( "Andaloria Script-Error: " + resp.status + " - " + statusText + " (" + url + ")" );
        }
        if( resp.readyState != 4 || resp.status != 200 ) {
          return;
        }
        //readyState = 4, status = 200
/*        var intCode = this.getResponseHeader( "phpmap-ReturnCode" );
        var retStr  = this.getResponseHeader( "phpmap-ErrorMessage" );
        alert(intCode + " -rs: " + retStr)
        if( intCode === "" ) {
          // header was not present
          intCode = null;
        } else {
          intCode = parseInt( intCode, 10 );
        }
        if( retStr === null ) {
          retStr = "";
        }

        if( intCode || retStr ) {
          alert("ErrorCode: "+intCode+"\nErrorString: "+retStr+"\nResponse: "+resp.responseText);
        } else if( this.booFeedback && resp.responseText.trim() !== "" ) {
          alert( resp.responseText.trim() );
        }
*/
      },
      
      onload: function(response) {
        if (document.getElementById('TextCell')) {
          document.getElementById('TextCell').innerHTML = response.responseText;
        } else
        {
          alert(response.responseText);
        }
      },
    
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'PHPMAP_USER':     ANDAPIMP.strUsername,
        'PHPMAP_PASSWORD': ANDAPIMP.strPassword,
        'PHPMAP_GUILD':    ANDAPIMP.strGuild,
        'PLUGIN_VERSION': '0.1',
      },
      
      method: 'POST',
      url:  strBroker,
      data: "filename=" + pageFlag + "&source=" + encodeURIComponent(src) 
    });
    
  };

  //ist leider immernoch nicht fertig!! wird auch noch nicht benutzt!
  parseFieldInformation = function ( pageSource ) {
    //fields required
    var intX = -1;
    var intY = -1;
    var intTerrain = -1;

    //field owned by player
    var strPlayer = '';
    var strGuild = '';
    var strTown = '';
    var intRace = -1;
    var intType = -1;

    //field containts town of player
    var intTownFields = 0;
    var strCreationDate = '';
    var strBuildings = '';


    //Suche Koordinatenangaben
    if( aResult = pageSource.match(/Position.*\D+(\d+):(\d+)\D+/) )
    {
      intX = aResult[1];
      intY = aResult[2];
    }
    else
    {
      return false;
    }

    //Suche Terraininfo
    if( aResult = pageSource.match(/\'terrain(\d)\'/) )
    {
      intTerrain = aResult[1];
    }
    else
    {
      return false;
    }

    //Suche Herrscher
    if( aResult = pageSource.match(/Herrscher.*<td.*>([a-zA-Z0-9_\-öäüÖÄÜ ß]+)<.*\/td><\/tr>/) )
    {
      strPlayer = aResult[1];
    }

    //Suche Gildentag
    if( aResult = pageSource.match(/Gilde.*<td.*>\[([\[\]a-zA-Z0-9_\-öäüÖÄÜß²³]+)\]<.*\/td><\/tr>/) )
    {
      strGuild = aResult[1];
    }

    //Suche Stadtnamen
    if( aResult = pageSource.match(/Stadt.*<td.*>([a-zA-Z0-9_\-öäüÖÄÜ ß]+)<.*\/td><\/tr>/) )
    {
       strTown = aResult[1];
    }

    //Suche Rasse
    if( aResult = pageSource.match(/\'race(\d)\'/) )
    {
      intRace = aResult[1];
    }

    //Suche Typ
    if( aResult = pageSource.match(/\'type(\d)\'/) )
    {
      intType = aResult[1];
    }


    //Suche Ländereien
    if( aResult = pageSource.match(/Ländereien.*>+(\d+)<+/) )
    {
      intAcreage = aResult[1];
    }

    //Suche Gründungsdatum
    if( aResult = pageSource.match(/Gründung.*>+(\d+.\d+.\d+)<+/) )
    {
      strCreationDate = aResult[1];
    }

    //Suche Gebäude
    var regionIndex = pageSource.indexOf("Fertigstellung");
    var startString = "<tr>";
    var endString = "</table>";

    if (regionIndex != -1)
    {
      startIndex = pageSource.indexOf(startString, regionIndex);
      endIndex = pageSource.indexOf(endString, regionIndex);

      if (startIndex != -1 && endIndex != -1)
      {
        var buildingSource = pageSource.substring(startIndex, endIndex);

        buildingSource = buildingSource.replace(/<tr><td[^>]*>([^<]*)<\/td>(.*?)<\/tr>/g, "\n$1$2" );
        buildingSource = buildingSource.replace(/<b[^>]*>([^<]*)<\/b>/g, " $1" );
        buildingSource = buildingSource.replace(/<td[^>]*>([^<]*)<\/td>/g, "$1" );

        strBuildings = buildingSource;
      }
    }

    //Suche Einheiten
    regionIndex = pageSource.indexOf("Gruppen vor Ort");
    startString = "<tr>";
    endString = "</tbody>";

    if (regionIndex != -1)
    {
      startIndex = pageSource.indexOf(startString, regionIndex);
      endIndex   = pageSource.indexOf(endString, regionIndex);

      if (startIndex != -1 && endIndex != -1)
      {
        var unitSource = pageSource.substring(startIndex, endIndex);

        //TODO parse unit list
        //buildingSource = buildingSource.replace(/<tr><td[^>]*>([^<]*)<\/td>(.*?)<\/tr>/g, "\n$1$2" );
        //buildingSource = buildingSource.replace(/<b[^>]*>([^<]*)<\/b>/g, " $1" );
        //buildingSource = buildingSource.replace(/<td[^>]*>([^<]*)<\/td>/g, "$1" );
      }
    }



    //TODO return parsed data
    return pageSource;
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Convert Bilanz
ANDAPIMP.ConvertBilanz = function () {
  // Stadtnamen holen
  cityselect = document.getElementById("navTownList");
  selectedNr = cityselect.options.selectedIndex;
  cityname = cityselect.options[selectedNr].textContent;

  //Lagerverwaltung suchen
  maintable = document.getElementById("body");
  tabs = maintable.getElementsByTagName('table');
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].innerHTML.search('Lagerverwaltung') > 0) {
      var LagerTable=tabs[i];
      break;
    }
  }
  var s = LagerTable.innerHTML;
  
  s = s.replace(/[ /t]*Lagerverwaltung[ /t]*/g,'');
  s = s.replace(/<table[^>]*>/g,"[table]");
  s = s.replace(/<\/table>/g,"[/table]");
  s = s.replace(/<tr[^>]*>/g,"[tr]");
  s = s.replace(/<\/tr>/g,"[/tr]");
  s = s.replace(/<td[^>]*>/g,"[td]");
  s = s.replace(/<\/td>*>/g,"[/td]");
  s = s.replace(/<img[^>]*>/g,"");
  s = s.replace(/<font[^>]*>/g,"");
  s = s.replace(/<\/font[^>]*>/g,"");
  s = s.replace(/<tbody>/g,"");
  s = s.replace(/<\/tbody>/g,"");
  s = s.replace(/&nbsp;/g,'');

  s = s.replace(/\[td\]Gut/g,"[td][/td][td]Gut");
  s = s.replace(/\[td\]Freie /g,"[td]:leute:[/td][td]Freie ");
  s = s.replace(/\[td\]Arbeiter/g,"[td]:arbeiter:[/td][td]Arbeiter");
  s = s.replace(/\[td\]Nahrung/g,"[td]:nahrung:[/td][td]Nahrung");
  s = s.replace(/\[td\]Holz/g,"[td]:holz:[/td][td]Holz");
  s = s.replace(/\[td\]Stein/g,"[td]:stein:[/td][td]Stein");
  s = s.replace(/\[td\]Eisen/g,"[td]:eisen:[/td][td]Eisen");
  s = s.replace(/\[td\]Goldmünzen/g,"[td]:gold:[/td][td]Goldmünzen");
  s = s.replace(/\[td\]Mana/g,"[td]:mana:[/td][td]Mana");
  s = s.replace(/\[td\]Wissen/g,"[td]:wissen:[/td][td]Wissen");

  var dt = new Date();
  var day=dt.getDate(); day = day < 10 ? "0"+day:day;
  var mon=dt.getMonth()+1; mon = mon <10?"0"+mon:mon;
  var hrs=dt.getHours(); hrs = hrs <10?"0"+hrs:hrs;
  var mn=dt.getMinutes(); mn = mn <10?"0"+mn:mn;
  s = "[quote][center][b]"+cityname+"[/b][hr][b]Lagerverwaltung vom " + (day) + "." + (mon) + "." + (dt.getYear()+1900) + " - " + (hrs) + ":" + (mn) + "[/b][table]" + s;

  s = s + "[/table][/center][/quote]";
  s = s + "[size=8pt]erstellt mit dem [url="+ANDAPIMP.scripturlcurrent+"]AndaloriaPIMP Script by Tarmotim (decay based)[/url][/size]";
  
  alert(s);
};

( function () { ANDAPIMP.init(); } )();
