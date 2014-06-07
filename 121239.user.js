// ==UserScript==
// @name           FW.Net: support classes
// @namespace      http://www.ereglam.de
// @copyright      2010+, Ereglam (http://userscripts.org/users/ereglam)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description    basic support classes for user scripts of feuerwache.net (not intended to be installed)
// @exclude        *
// @grant          none
// @author         Ereglam
// @info           defines a set of classes to handle objects for the game feuerwache.net
// @version        1.1.8
// ==/UserScript==

versions['FW.Net: support classes'] = '1.1.8';
/***************************************************************
  Konstanten
***************************************************************/
// Präfixe für Werte in GM-Ablage
const GMVAL_PREF_SYS = 'sys_'; //Systemeinstellungen
const GMVAL_PREF_MEL = 'mel_'; //neue Meldungen
const GMVAL_PREF_UFW = 'ufw_'; //Feuerwachenliste zum User
const GMVAL_PREF_EST = 'est_'; //Feuerwachen

const STW_UNDEF   = 'undef'; //Stichwort für unbekannte Einsätze
const MLD_UNKNOWN = 'unknown'; //Dummy-Meldung für unbekannte Einsätze
const GRP_UNKNOWN = 'noGrp'; //Gruppe wenn Fahrzeug nicht bekannt
const TRN_UNKNOWN = '{unbekannt}'; //Gruppe wenn Fahrzeug nicht bekannt
const WikiURL = 'http://wiki.feuerwache.net/wiki/';

/***************************************************************
  Variablen
***************************************************************/
var applLog = new logCls('I');
var errLog = new logCls('E');
var conf = null;
var premUser = unsafeWindow.user_has_premium || false;

try {
  errLog.refresh();
  conf  = new confCls(unsafeWindow.feuerwache_layout);
} catch(e) {
  errLog.addVarMsg('Initialising configuration class', e);
}

// Zeilenzahl für FMS-Anzeige
var FMSlineArr = {
  '1': 'einzeilig',
  '2': 'zweizeilig',
  '3': 'dreizeilig',
  '4': 'vierzeilig',
};

// FMS-Status: wird von der Fahrzeugübersicht benutzt
// Syntax: Text (max 12), Textfarbe in Fahrzeugübersicht, Hintergrundfarbe in Fahrzeugübersicht, Status immer anzeigen
var FMSStatusLst = {
  'I' : {tcol: 'white',   bcol: 'black',   text: 'Relais I',     dispInList: false},
  'II': {tcol: 'white',   bcol: 'black',   text: 'Relais II',    dispInList: false},
  '0' : {tcol: 'white',   bcol: 'red',     text: 'Notruf',       dispInList: false},
  '1' : {tcol: '#D6D6D6', bcol: '#0000F8', text: 'frei',         dispInList: true,  dispAlways: true},
  '2' : {tcol: 'black',   bcol: '#00FF2D', text: 'auf Wache',    dispInList: true,  dispAlways: true},
  '3' : {tcol: 'black',   bcol: '#FFCC27', text: 'auf Anfahrt',  dispInList: true,  dispAlways: true},
  '4' : {tcol: 'white',   bcol: '#FF5A19', text: 'E-Stelle an',  dispInList: true,  dispAlways: true},
  '5' : {tcol: 'black',   bcol: 'red',     text: 'Sprechwunsch', dispInList: false},
  '6' : {tcol: 'black',   bcol: '#BABABA', text: 'nicht bereit', dispInList: true,  dispAlways: true},
  '7' : {tcol: 'black',   bcol: '#DAD815', text: 'mit Patient',  dispInList: true,  dispAlways: false},
  '8' : {tcol: 'black',   bcol: 'lightgreen', text: 'am Transportziel', dispInList: false},
  '9' : {tcol: 'black',   bcol: 'teal',    text: 'Handquittung', dispInList: false},
};

/***************************************************************
  Funktionen
***************************************************************/
// Prüfroutinen für Einstelloptionen
var chkFunc = {
  // Signatur: BOOL func(value, option)
  limDmg : function(iValue, iOpt) {
    var lim = {low: 1, high: 100};
    try {
      if (!/^\s*\d+\s*$/.test(iValue)) {
        errLog.addMsg(iOpt.getText()+' Erwarte statt "'+iValue+'" eine Zahl zwischen '+lim.low+' - '+lim.high);
        return false;
      }
      var intVal = parseInt(iValue.trim());
      if (!(intVal >= lim.low && intVal <= lim.high)) {
        errLog.addMsg(iOpt.getText()+' Erwarte statt "'+iValue+'" eine Zahl zwischen '+lim.low+' - '+lim.high);
        return false;
      }
      return true;
    } catch(e) {
      errLog.addMsg(iOpt.getText()+' Erwarte eine Zahl zwischen '+lim.low+' - '+lim.high);
      return false;
    }
  },

  limTime: function(iValue, iOpt) {
    var lim = {low: 0, high: 999};
    try {
      if (!/^\s*\d+\s*$/.test(iValue)) {
        errLog.addMsg(iOpt.getText()+' Erwarte statt "'+iValue+'" eine Zahl zwischen '+lim.low+' - '+lim.high);
        return false;
      }
      var intVal = parseInt(iValue.trim());
      if (!(intVal >= lim.low && intVal <= lim.high)) {
        errLog.addMsg(iOpt.getText()+' Erwarte statt "'+iValue+'" eine Zahl zwischen '+lim.low+' - '+lim.high);
        return false;
      }
      return true;
    } catch(e) {
      errLog.addMsg(iOpt.getText()+' Erwarte eine Zahl zwischen '+lim.low+' - '+lim.high);
      return false;
    }
  },

  limAlpha: function(iValue, iOpt) {
    try {
      if (!/^[A-Za-z]*$/.test(iValue)) {
        errLog.addMsg(iOpt.getText()+' Erwarte statt "'+iValue+'" Buchstaben');
        return false;
      }
      return true;
    } catch(e) {
      errLog.addMsg(iOpt.getText()+' Erwarte Buchstaben');
      return false;
    }
  },

  limAlphaNum: function(iValue, iOpt) {
    try {
      if (!/^[0-9A-Za-z]*$/.test(iValue)) {
        errLog.addMsg(iOpt.getText()+' Erwarte statt "'+iValue+'" Ziffern und Buchstaben');
        return false;
      }
      return true;
    } catch(e) {
      errLog.addMsg(iOpt.getText()+' Erwarte Ziffern und Buchstaben');
      return false;
    }
  },

  limAlphaUnderscore: function(iValue, iOpt) {
    try {
      if (!/^[A-Za-z_]*$/.test(iValue)) {
        errLog.addMsg(iOpt.getText()+' Erwarte statt "'+iValue+'" Buchstaben und Unterstrich');
        return false;
      }
      return true;
    } catch(e) {
      errLog.addMsg(iOpt.getText()+' Erwarte Buchstaben');
      return false;
    }
  },

  limAlphaNumUnderscore: function(iValue, iOpt) {
    try {
      if (!/^[0-9A-Za-z_]*$/.test(iValue)) {
        errLog.addMsg(iOpt.getText()+' Erwarte statt "'+iValue+'" Ziffern, Buchstaben und Unterstrich');
        return false;
      }
      return true;
    } catch(e) {
      errLog.addMsg(iOpt.getText()+' Erwarte Ziffern, Buchstaben und Unterstrich');
      return false;
    }
  },

  redSelVhc : function(iValue, iOpt) {
    try {
      // Eingabe prüfen
      new fhzColCls(iValue, conf);
      return true;
    } catch(e) {
      errLog.addVarMsg(iOpt.getText()+' Fahrzeugliste "'+iValue+'" enthält Fehler: "'+e+'"', e);
      return false;
    }
  },
}

function buildFMS(node, lines) {
  var FMSStatus = '';
   var linksArr = {};

  // möglichen Link merken
  var nodeA = xPath.getSingle("./a[1]", node);
  if (nodeA) {
    nodeA = nodeA.cloneNode(true);
    if (/.*\/vehicle_to_user\/driveBack\/vehicle_to_user_id\/\d+$/.test(nodeA.href)) {
      linksArr['1'] = nodeA;
    } else if (/.*\/vehicle_to_user\/changeState\/fms\/(\d+)\/vehicle_to_user_id\/\d+$/.test(nodeA.href)) {
      linksArr[RegExp.$1] = nodeA;
    }
  }

  // Knotentext zerlegen
  var texts = node.innerHTML.split('<');
  var text = texts[0].trim();
  switch (text) {
    case "Frei (Dienstfahrt)":
      FMSstatus = '1';
      break;
    case "Einsatzbereit auf Wache":
      FMSstatus = '2';
      break;
    case "Auf dem Weg zum Einsatz":
      FMSstatus = '3';
      break;
    case "Ankunft am Einsatzort":
      FMSstatus = '4';
      break;
    case "Nicht einsatzbereit":
    case "Außer Dienst":
      FMSstatus = '6';  // zählt Beides als nicht einsatzbereit
      break;
    case "Patient aufgenommen":
      FMSstatus = '7';
      break;
    default:
      break;
  }

  var table = new tableCls({'class':'raised','style': 'width: 100%;'});
  var row = new tableRowCls();
  table.addBodyRow(row);
  switch (lines) {
    case '1':
      var cell = new tableCellCls();
      cell.setClass('pressed');
      row.addCell(cell);
      cell.addChild(FMSkeyPad(FMSstatus, linksArr, lines, true)); //FMSTastatur

      cell = new tableCellCls({'rowspan' : 2, 'style' : 'width: 100%;'});
      cell.setClass('pressed');
      row.addCell(cell);
      cell.addText(text);

      row = new tableRowCls();
      table.addBodyRow(row);

      cell = new tableCellCls({'style' : 'font-family: courier; font-size: smaller;'});
      cell.setClass('pressed');
      row.addCell(cell);
      cell.addText('STATUS_' + FMSstatus);
      break;
    case '2':
    case '3':
    case '4':
      var cell = new tableCellCls({'rowspan': 2});
      cell.setClass('pressed');
      row.addCell(cell);
      cell.addChild(FMSkeyPad(FMSstatus, linksArr, lines, true)); //FMSTastatur

      cell = new tableCellCls({'style' : 'font-family: courier; width: 100%;'});
      cell.setClass('pressed');
      row.addCell(cell);
      cell.addText('STATUS_' + FMSstatus);

      row = new tableRowCls();
      table.addBodyRow(row);

      cell = new tableCellCls({'style' : 'font-size: smaller;'});
      cell.setClass('pressed');
      row.addCell(cell);
      cell.addText(text);
      break;
    default:
      break
  }

  return table.getDOM();
}

function FMSkeyPad(status, linksArr, lines, noTableBorder) {
  var orientationArr = {
    '1': {cells: 12, array: ['0', 'I', 'II', '1', '2', '3', '4', '5', '6', '7', '8', '9']},
    '2': {cells:  6, array: ['I', '0', '1', '2', '3', '4', 'II', '5', '6', '7', '8', '9']},
    '3': {cells:  4, array: ['I', '1', '2', '3', 'II', '4', '5', '6', '0', '7', '8', '9']},
    '4': {cells:  3, array: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'I', '0', 'II']}
  };
  var orientation = orientationArr[lines];
  var cnt = 0;

  var table = new tableCls({'class': 'FMS',
                            'style': (noTableBorder?'border: none;':';')});
  var row = new tableRowCls();
  table.addBodyRow(row);
  for each(fms in orientation.array) {
    if (cnt == orientation.cells) {
      row = new tableRowCls();
      table.addBodyRow(row);
      cnt = 0;
    }
    cnt++;

    var cell = new tableCellCls({'title': FMSStatusLst[fms].text});
    row.addCell(cell);
    cell.setClass('raised');

    var linkStatus = '';
    if (linksArr[fms]) {
      linkStatus = fms;
    }
    switch (fms) {
      case status :
        cell.getStyle().color = FMSStatusLst[fms].tcol;
        cell.getStyle().backgroundColor = FMSStatusLst[fms].bcol;
        cell.addText(fms);
        cell.setClass('pressed');
        break;
      case linkStatus:
        cell.getStyle().color = FMSStatusLst[fms].tcol;
        cell.getStyle().backgroundColor = FMSStatusLst[fms].bcol;
        var nodeA = linksArr[fms];
        nodeA.title = nodeA.innerHTML;
        removeChildren(nodeA);
        nodeA.appendChild(createText(fms));
        nodeA.style.color = FMSStatusLst[fms].tcol;
        cell.addChild(nodeA);
        break;
      case '0' :
        cell.getStyle().color = FMSStatusLst[fms].tcol;
        cell.getStyle().backgroundColor = FMSStatusLst[fms].bcol;
        var nodeA = new Element('a');
        nodeA.title = FMSStatusLst[fms].text;
        nodeA.href = 'javascript:alert("Du hast den Notruf ausgelöst! Nun wird das Funkgerät für 30 Sekunden durchgeschaltet.")';
        nodeA.appendChild(createText(fms));
        nodeA.style.color = FMSStatusLst[fms].tcol;
        cell.addChild(nodeA);
        break;
      case 'I' :
      case 'II':
        cell.getStyle().color = FMSStatusLst[fms].tcol;
        cell.getStyle().backgroundColor = FMSStatusLst[fms].bcol;
        cell.addText(fms);
        break;
      default :
        cell.addText(fms);
    }
  }
  return table.getDOM();
}

// Menü für die Konfiguration
function createAAOConfigMenu(iMenus) {
  function getMenuNode(chkPath, text) {
    var nodeAB = new Element('a', {'href': chkPath});
    nodeAB.appendChild(createText(text));

    return nodeAB;
  }

  var nodeDiv = new Element('div', {'id': 'aaoMenu'});
  var nodeUl = new Element('ul');
  nodeDiv.appendChild(nodeUl);
  for each (menu in iMenus) {
    var nodeLi = new Element('li');
    nodeUl.appendChild(nodeLi);
    nodeLi.appendChild(getMenuNode(menu.link, menu.text));
  }
  nodeDiv.appendChild(new Element('br'));
  nodeDiv.appendChild(new Element('br'));

  return nodeDiv;
}

function displayConfPage(iPage, iMenus) {
  var contentNode = $('content');
  removeChildren(contentNode);

  // Navigationsmenü
  contentNode.appendChild(createAAOConfigMenu(iMenus));

  // Überschrift
  document.title = 'Ereglam\'s AAO: ' + iPage.title;
  var nodeH1 = new Element('h1');
  var nodeA = new Element('a', {'href'  : 'http://userscripts.org/users/ereglam', 'target': '_blank'});
  nodeH1.appendChild(nodeA);
  nodeA.appendChild(createText("Ereglam"));
  nodeH1.appendChild(createText("\'s AAO: " + iPage.heading));
  contentNode.appendChild(nodeH1);
  contentNode.appendChild(iPage.text);

  // weiter Informationen
  contentNode.appendChild(new Element('br'));
  var nodeDiv = new Element('div');
  contentNode.appendChild(nodeDiv);
  nodeDiv.appendChild(createText("Weitere Informationen unter "));
  var nodeA = new Element('a', {'href'  : conf.intConf.url.update, 'target': '_blank'});
  nodeA.appendChild(createText(conf.intConf.url.update));
  nodeDiv.appendChild(nodeA);

  for each (tableSet in iPage.tables) {
    var table = new tableCls({'class': 'ereglamTable'});
    if (tableSet.caption) {
      table.setCaption(tableSet.caption);
    }
    if (tableSet.headRow) {
      var row = new tableRowCls();
      table.addHeadRow(tableSet.headRow);
    }

    var rowCnt = 0;
    for each(row in tableSet.rows) {
      row.addClass('row' + (rowCnt++)%2);
      table.addBodyRow(row);
    }
    contentNode.appendChild(table.getDOM());
  }

  // Button Speichern
  if (objType(iPage.saveFunc) == 'function') {
    contentNode.appendChild(new Element('br'));
    nodeDiv = new Element('div');
    nodeDiv.id = 'ereglamsInfo';
    contentNode.appendChild(nodeDiv);
    var saveConfigNode = new Element('input', {'type' : 'button', 'class': 'button', 'name' : 'commit', 'value': ' ' + iPage.title + ' speichern '});
    saveConfigNode.addEventListener('click', iPage.saveFunc, false);
    contentNode.appendChild(saveConfigNode);
  }

  var table = new tableCls({'class': 'ereglamTable fontSmall'});
  table.setCaption('Scriptversionen');
  var row = table.getNewHeadRow();
  var cell = row.getNewCell({}, true);
  cell.addText('Script');
  cell = row.getNewCell({}, true);
  cell.addText('Version');

  var rowCnt = 0;
  for (version in versions) {
    row = table.getNewHeadRow({'class': 'row'+(rowCnt++)%2});
    cell = row.getNewCell({}, true);
    cell.addText(version);
    cell = row.getNewCell();
    cell.addText(versions[version]);
  }
  contentNode.appendChild(table.getDOM());
}

/***************************************************************
  Klassen
***************************************************************/
// Konfigurationsdaten
function confCls(iLayout) {
  this.world = 0;
  this.optList = new optListCls();
  this.optGrpList = new optGrpListCls();
  this.fhzList = new fhzListCls(this);
  this.fhzGrpList = new fhzGrpListCls(this);
  this.cntList = new ContainerListCls(this);
  this.stwList = new stwListCls(this);
  this.mldList = new mldListCls(this);
  this.stationList = new stationListCls(this);
  this.redVhcListCnf = {
    'mission_vehicle': '',
    'driving_vehicle': '',
    'waiting_vehicle': '',
  };
  this.specFGrp = {
    lf  : {},
    tlf : {},
    wlf : {},
    rtw : {},
    nef : {},
    rtb : {}
  };
  var newMlds = []; //neue Meldungen

  // interne Konfiguration für abhängige Klassen
  this.intConf = {
    url : { update: '',
            install: '',
            meta: '',
    },
    sortVehiclesByClass : true,
    condenseVehicles : true,
    limit2neededVehicleGroups : true,
  };
  // Layoutdesign holen
  var layout = iLayout || 'light';

  this.getClass = function() {
    return 'confCls';
  }

  this.getLayout = function() {
    return layout;
  }

  this.isNewLayout = function() {
    return layout == 'light';
  }

  this.init = function(iData) {
    this.intConf.url.update = iData.url.update;
    this.intConf.url.install = iData.url.install;
    this.intConf.url.meta = iData.url.meta;

    var worldNode = xPath.getSingle("//li/ul/li/a[contains(text(), 'Welt')]", 'root');
    if (worldNode) {
      /Welt\s+(\d+)/.exec(worldNode.innerHTML);
      this.world = parseInt(RegExp.$1);
    }

    try {
      for (var grp in iData.opt) {
        try {
          var optGrp = new optGrpCls(grp, iData.opt[grp].text);
          this.optGrpList.addOptGrp(optGrp);
          for (var optStr in iData.opt[grp].opt) {
            try {
              var opt = new optCls(optStr, iData.opt[grp].opt[optStr], optGrp.getName());
              optGrp.addOpt(opt);
              this.optList.addOpt(opt);
            } catch(e) {
              throw 'Loading Option "'+ optStr +'": '+e;
            }
          }
        } catch(e) {
          throw 'Loading Optionsgruppe "'+grp+'": '+e;
        }
      }
      this.intConf.sortVehiclesByClass = this.getOptVal('sortVehiclesByClass')?this.getOptVal('sortVehiclesByClass'):true;
      this.intConf.condenseVehicles = this.getOptVal('condenseVehicles')?this.getOptVal('condenseVehicles'):true;
      this.intConf.limit2neededVehicleGroups = this.getOptVal('limit2neededVehicleGroups')?this.getOptVal('limit2neededVehicleGroups'):true;

      for (grp in iData.grp) {
        try {
          this.fhzGrpList.addFhzGrp(new fhzGrpCls(grp, iData.grp[grp], this));
        } catch(e) {
          throw 'Loading Fahrzeuggruppe "'+ grp +'": '+e;
        }
      }

      for (fhzStr in iData.fhz) {
        try {
          var fhzGrp = this.fhzGrpList.getFhzGrp(iData.fhz[fhzStr].grp);
          if (fhzGrp) {
            var fhz = new fhzCls(fhzStr, fhzGrp, iData.fhz[fhzStr], this);
            fhzGrp.addFhz(fhz);
            this.fhzList.addFhz(fhz);
          } else {
            throw 'Fahrzeuggruppe "'+ fhzGrp +'" unbekannt';
          }
        } catch(e) {
          throw 'Loading Fahrzeug "'+ fhzStr +'": '+e;
        }
      }

      for (cntStr in iData.cnt) {
        try {
          this.cntList.addContainer(new ContainerCls(cntStr, iData.cnt[cntStr], this));
        } catch(e) {
          throw 'Loading Container "'+ cntStr +'": '+e;
        }
      }

      // zu unbekannten Einsätzen wird per Default ein LF/TS geschickt
      try {
        this.stwList.addStw(new stwCls(STW_UNDEF, {txt: 'unbekanntes Stichwort', vhc: 'LF/TS/TLF', internal: true}, this));
      } catch(e) {
        throw 'Loading Stichwort "'+ STW_UNDEF +'": '+e;
      }
      for (stw in iData.stw) {
        try {
          this.stwList.addStw(new stwCls(stw, iData.stw[stw], this));
        } catch(e) {
          throw 'Loading Stichwort "'+ stw +'": '+e;
        }
      }

      try {
        this.mldList.addMld(new mldCls(MLD_UNKNOWN, {mld: STW_UNDEF , storm: false, ab: {FW: 0}}, this));
      } catch(e) {
        throw 'Loading Meldung "'+ MLD_UNKNOWN +'": '+e;
      }
      for (mld in iData.mld) {
        try {
          this.mldList.addMld(new mldCls(mld, iData.mld[mld], this));
        } catch(e) {
          throw 'Loading Meldung "'+ mld +'": '+e;
        }
      }

      //Fahrzeuglistenvorauswahl setzen
      var val = this.getOptVal('reduceInVehRespListsOfVGSL') || '&OFF&';
      for each (section in ['mission_vehicle','driving_vehicle','waiting_vehicle']) {
        this.redVhcListCnf[section] = val;
      }

      //Spezialfahrzeuggruppen ermitteln
      try {
        this.specFGrp.lf  = this.getFhzGrp('LF');
        this.specFGrp.tlf = this.getFhzGrp('TLF');
        this.specFGrp.wlf = this.getFhzGrp('WLF');
        this.specFGrp.rtw = this.getFhzGrp('RTW');
        this.specFGrp.nef = this.getFhzGrp('NEF');
        this.specFGrp.rtb = this.getFhzGrp('RTB');
        if (!this.specFGrp.lf) throw 'kein LF';
        if (!this.specFGrp.tlf) throw 'kein TLF';
        if (!this.specFGrp.wlf) throw 'kein WLF';
        if (!this.specFGrp.rtw) throw 'kein RTW';
        if (!this.specFGrp.nef) throw 'kein NEF';
        if (!this.specFGrp.rtb) throw 'kein RTB';
      } catch(e) {
        throw 'Determining special vehicles: '+e;
      }

      if (! $('ereglamsAAOConfig')) {
        var isNewLayout = this.isNewLayout();
        // eigene StyleSheets anlegen
        addStyle('\
div#aaoMenu ul li\n\
{\n\
'+ (isNewLayout?'  background-image: url("/images/menu.png");':'')+'\
  color: #FFF8D7;\
  float: left;\
'+ (isNewLayout?'  font-weight: bold;':'')+'\
  height: 28px;\
  line-height: 28px;\
  list-style: none outside none;\
  margin: 0 1px 0 0;\
  text-align: center;\
  width: 140px;\
}\n\
div#aaoMenu ul li a:link,\n\
div#aaoMenu ul li a:visited,\n\
div#aaoMenu ul li a:hover,\n\
div#aaoMenu ul li a:active\n\
{\n\
    color: '+ (isNewLayout?'#D22222':'#FFF8D7')+';\
    display: block;\
    height: 28px;\
    text-decoration: '+ (isNewLayout?'none':'underline')+';\
}\n\
div#aaoMenu ul li a\n\
{\n\
    font-size: 12px;\
'+ (isNewLayout?'  text-transform: uppercase;':'')+'\
}\n\
table.ereglamTable\n\
{\n\
'+ (isNewLayout?'  color: #0D2A44':'  border:1px solid #56616C')+';\
  border-collapse: collapse;\
  margin:5px 0;\
  width:100%;\
}\n\
table.ereglamTable tr\n\
{\n\
'+ (isNewLayout?'  background-color: #D0D0D0;':'')+'\
'+ (isNewLayout?'  line-height: 23px':'  border:1px solid #56616C')+';\
}\n\
table.ereglamTable tr.row1\n\
{\n\
'+ (isNewLayout?'  background-color: #EEEEEE':'  border:1px solid #56616C')+';\
}\n\
table.ereglamTable tr.rowWhite\n\
{\n\
  background-color:'+ (isNewLayout?' #EEEEEE':'#424D58')+';\
'+ (isNewLayout?'  border-top: 1px solid #0D2A44;':'')+'\
}\n\
table.ereglamTable th\n\
{\n\
  background-color:'+ (isNewLayout?'#FFFFFF':'#424D58')+';\
'+ (isNewLayout?'  line-height: 18px;':'')+'\
'+ ((!isNewLayout)?'  border:1px solid #56616C;':'border-bottom: 1px solid #0D2A44;')+'\
  text-align: left;\
  font-weight: bold;\
}\n\
table.ereglamTable thead tr.caption th,\n\
table.ereglamTable thead tr.caption td\n\
{\n\
  font-size: 150%;\
  text-align: center;\
}\n\
table.ereglamTable tr.row0 th\n\
{\n\
  background-color:'+ (isNewLayout?'#D0D0D0':'#424D58')+';\
'+ ((!isNewLayout)?'  border:1px solid #56616C':'  border-bottom: none')+';\
}\n\
table.ereglamTable tr.row1 th\n\
{\n\
  background-color:'+ (isNewLayout?'#EEEEEE':'#424D58')+';\
'+ ((!isNewLayout)?'  border:1px solid #56616C':'  border-bottom: none')+';\
}\n\
table.ereglamTable td\n\
{\n\
'+ ((!isNewLayout)?'  border:1px solid #56616C;':'')+'\
  padding:1px 5px;\
  text-align:left;\
}\n\
table.ereglamTable tr.row0 td\n\
{\n\
'+ (isNewLayout?'  background-color: #D0D0D0;':'')+'\
}\n\
table.ereglamTable tr.row1 td\n\
{\n\
'+ (isNewLayout?'  background-color: #EEEEEE;':'')+'\
}\n\
div#content table.ereglamTable a:link,\
div#content table.ereglamTable a:hover,\
div#content table.ereglamTable a:active,\
div#content table.ereglamTable a:visited\n\
{\n\
  color: '+ (isNewLayout?'#0D2A44':'#D6D6D6')+';\
}\n\
table.ereglamTable .txtLeft\
{ text-align:left; }\
table.ereglamTable .txtCenter\
{ text-align:center; }\
table.ereglamTable .txtRight\
{ text-align:right; }\
\n\
table.fhzTable\n\
{\n\
  border: 1px solid '+ ((!isNewLayout)?'#56616C':'#0D2A44')+';\
  border-collapse:collapse;\
  margin:0px;\
  width:100%;\
}\n\
table.fhzTable tr\n\
{\n\
'+ (isNewLayout?'  background-color: #D0D0D0;':'')+'\
  border-style: none;\
  line-height: 16px;\
  font-size: 10px;\
}\n\
table.fhzTable tr.row1\n\
{\n\
'+ (isNewLayout?'  background-color: #EEEEEE;':'')+'\
}\n\
table.fhzTable tr.rowWhite\n\
{\n\
  background-color:'+ (isNewLayout?' #EEEEEE':'#424D58')+';\
}\n\
table.fhzTable th\n\
{\n\
  background-color:'+ (isNewLayout?' #FFFFFF':'#424D58')+';\
'+ (isNewLayout?'  border-bottom: 1px solid #0D2A44;':'')+'\
  text-align: center;\
  font-size: inherit;\
  line-height: inherit;\
}\n\
table.fhzTable td\n\
{\n\
  border: 0px none;\
  text-align: center;\
  font-size: inherit;\
  line-height: inherit;\
}\n\
table.fhzTable tr.row0 th\n\
{\n\
'+ ((!isNewLayout)?'  border:1px solid #56616C':'  border-bottom: none')+';\
}\n\
table.fhzTable tr.row1 th\n\
{\n\
'+ ((!isNewLayout)?'  border:1px solid #56616C':'  border-bottom: none')+';\
}\n\
table.fhzTable td.null\n\
{\n\
  color: '+ (isNewLayout?'#999999':'#333333')+';\
}\n\
table.fhzTable .txtLeft\
{ text-align:left; }\
table.fhzTable .txtCenter\
{ text-align:center; }\
table.fhzTable .txtRight\
{ text-align:right; }\
.null\
{color:#666666;}\
\
table.FMS\n\
{\n\
  border:1px solid;\
  border-color: '+ (isNewLayout?'black white white black':'black lightgray lightgray black')+';\
  border-radius: 3px;\
  -moz-border-radius: 3px;\
}\n\
table.raised\n\
{\n\
  border:1px solid;\
  border-color: '+ (isNewLayout?'white black black white':'lightgray black black lightgray')+';\
  border-radius: 7px;\
  -moz-border-radius: 7px;\
}\n\
table.FMS tr\n\
{\n\
  border: none;\
}\n\
table.FMS td\n\
{\n\
  border: none;\
  padding:1px 4px;\
  font-family: arial;\
  font-size: smaller;\
  text-align: center;\
}\n\
table td.pressed\n\
{\n\
  border:1px solid;\
  border-color: '+ (isNewLayout?'black white white black':'black lightgray lightgray black')+';\
  border-radius: 7px;\
  -moz-border-radius: 7px;\
  line-height: 13px;\
}\n\
table td.raised\n\
{\n\
  border:1px solid;\
  border-color: '+ (isNewLayout?'white black black white':'lightgray black black lightgray')+';\
  border-radius: 7px;\
  -moz-border-radius: 7px;\
  line-height: 13px;\
}\n'+
((!isNewLayout)?
'div.statusbar\n\
{\n\
  background-color: green;\
}\n\
div.statusbar_inner\n\
{\n\
  background-color: darkred;\
}\n':'')+
'.WikiLink\n\
{\n\
  font-size: 10px;\
  padding: 4px;\
  border: 1px solid;\
  border-color: '+ (isNewLayout?'white black black white':'lightgray black black lightgray')+';\
  border-radius: 5px;\
  -moz-border-radius: 5px;\
  background-color: #424D58;\
}\n\
.WikiLinkDark\n\
{\n\
  font-size: 10px;\
  padding: 3px;\
  border: 1px solid;\
  border-color: '+ (isNewLayout?'white black black white':'lightgray black black lightgray')+';\
  border-radius: 3px;\
  -moz-border-radius: 3px;\
  background-color: #1A1B1F;\
}\n\
div#content span.WikiLinkDark a:link,\
div#content span.WikiLinkDark a:hover,\
div#content span.WikiLinkDark a:active,\
div#content span.WikiLinkDark a:visited\n\
{\n\
  color: #FEFEFE;\
}\n\
div.ereglamSlider\n\
{\n\
  width: 256px;\
  margin: 10px 0px 10px 0px;\
  background-color: darkgrey;\
  height: 1px;\
  position: relative;\
}\n\
div.ereglamSlider div.ereglamHandle\n\
{\n\
  width: 2em;\
  height: 9px;\
  margin-top: -5px;\
  border: dotted 1px black;\
  cursor:move;\
  position: absolute;\
  padding-bottom: 3px;\
  font-size: 9px;\
  text-align: center;\
  border-radius: 3px;\
  -moz-border-radius: 3px;\
}\n\
!important');
        // Link zu den Optionen setzen
        var nodeP = new Element('p', {'id'  : 'ereglamsAAOConfig'});
        var nodeA = new Element('a', {'href': '/ereglamsAAOConfig'});
        nodeP.appendChild(nodeA);
        nodeA.appendChild(createText(' Ereglam\'s AAO Einstellungen'));
        var footer = $(isNewLayout?'footerLeft':'footer');
        if (footer) {
          footer.appendChild(new Element('br'));
          footer.appendChild(nodeP);
        }
      }
    } catch(e) {
      errLog.addMsg(e);
      setMsg(errLog);
    }
  }

  this.write = function() {
    return 'Optionen:\n' +
           this.optList.write() + '\n\n' +
           'Optionsgruppen:\n' +
           this.optGrpList.write() + '\n\n' +
           'Fahrzeuge:\n' +
           this.fhzList.write() + '\n\n' +
           'Fahrzeuggruppen:\n' +
           this.fhzGrpList.write() + '\n\n' +
           'Container:\n' +
           this.cntList.write() + '\n\n' +
           'Meldungen:\n' +
           this.mldList.write() + '\n\n' +
           'Stichworte:\n' +
           this.stwList.write() + '\n\n' +
           'Spezialfahrzeuge:\n' +
           'LF : ' + this.specFGrp.lf.write() + '\n' +
           'TLF: ' + this.specFGrp.tlf.write() + '\n' +
           'WLF: ' + this.specFGrp.wlf.write() + '\n' +
           'RTW: ' + this.specFGrp.rtw.write() + '\n' +
           'RTB: ' + this.specFGrp.rtb.write() + '\n' +
           'NEF: ' + this.specFGrp.nef.write();
  }

  this.getOptVal = function(iOpt) {
    return this.optList.getOptVal(iOpt);
  }

  this.getFhz = function(iFhz) {
    return this.fhzList.getFhz(iFhz);
  }

  this.getFhzByID = function(iID) {
    return this.fhzList.getFhzByID(iID);
  }

  this.getContainerByID = function(iID) {
    return this.cntList.getContainerByID(iID);
  }

  this.getFhzGrp = function(iFhzGrp) {
    return this.fhzGrpList.getFhzGrp(iFhzGrp);
  }

  this.getStw = function(iStw) {
    return this.stwList.getStw(iStw);
  }

  this.getMld = function(iMld) {
    return this.mldList.getMld(iMld);
  }
}

// Liste der Feuerwachen
function stationListCls(iConf) {
  var user = '';
  var list = {};
  var cnf = iConf;
  var cnt = {
    FW : 0,
    BF : 0,
    crew: 0,
    crewBF: 0,
    fhz: 0,
    maxFhz: 0,
    ab: 0,
    maxAb: 0,
    RTW: 0,
    maxRTW: 0,
    NEF: 0,
    maxNEF: 0,
  };

  this.getClass = function() {
    return 'stationListCls';
  }

  this.setUser = function(iUser) {
    user = iUser;
  }

  this.addStation = function(iStation) {
    var s = this.getStation(iStation.getNumber());
    if (s) {
      cnt.FW--;
      cnt.BF   -= s.isBF()?1:0;
      cnt.crew -= s.getCrew();
      cnt.crewBF -= s.isBF()?s.getCrew():0;
      cnt.fhz  -= s.getFhz();
      cnt.maxFhz  -= s.getMaxFhz();
      cnt.ab  -= s.getAB();
      cnt.maxAb  -= s.getMaxAB();
      cnt.RTW  -= s.getRTW();
      cnt.maxRTW  -= s.getMaxRTW();
      cnt.NEF  -= s.getNEF();
      cnt.maxNEF  -= s.getMaxNEF();
    }

    list[iStation.getNumber()] = iStation;
    cnt.FW++;
    cnt.BF   += iStation.isBF()?1:0;
    cnt.crew += iStation.getCrew();
    cnt.crewBF += iStation.isBF()?iStation.getCrew():0;
    cnt.fhz  += iStation.getFhz();
    cnt.maxFhz  += iStation.getMaxFhz();
    cnt.ab  += iStation.getAB();
    cnt.maxAb  += iStation.getMaxAB();
    cnt.RTW  += iStation.getRTW();
    cnt.maxRTW  += iStation.getMaxRTW();
    cnt.NEF  += iStation.getNEF();
    cnt.maxNEF  += iStation.getMaxNEF();
  }

  this.getStation = function(iNum) {
    return list[iNum];
  }

  this.buildStation = function(iNum, iPosX, iPosY) {
    if (!list[iNum]) {
      var station = new stationCls(iNum);
      station.setName('???');
      station.setCrew(20);
      station.setFhz(1);
      this.addStation(station);
      this.serialize();
    }
  }

  this.removeStation = function(iNum) {
    var s = this.getStation(iNum);

    if (s) {
      cnt.FW--;
      cnt.BF   -= s.isBF()?1:0;
      cnt.crew -= s.getCrew();
      cnt.crewBF -= s.isBF()?s.getCrew():0;
      cnt.fhz  -= s.getFhz();
      cnt.maxFhz  -= s.getMaxFhz();
      cnt.ab  -= s.getAB();
      cnt.maxAb  -= s.getMaxAB();
      cnt.RTW  -= s.getRTW();
      cnt.maxRTW  -= s.getMaxRTW();
      cnt.NEF  -= s.getNEF();
      cnt.maxNEF  -= s.getMaxNEF();
      s.delete();
      delete list[iNum];

      var fwArr = [];
      for each (s in list) {
        fwArr.push(s.getNumber());
      }
      setValue(GMVAL_PREF_UFW+escape(user), 'stations='+fwArr.toString());
    }
  }

  this.hasStation = function(iNum) {
    return (this.getStation(iNum) != undefined);
  }

  this.isInScope = function(iAb) {
    if (cnt.FW > 0) {
      return cnt.FW >= iAb.getFW() && cnt.BF >= iAb.getBF();
    } else {
      return true;
    }
  }

  this.getList = function() {
    return list;
  }

  this.getCntFW = function() {
    return cnt.FW;
  }

  this.getCntBF = function() {
    return cnt.BF;
  }

  this.setCntFW = function(iFW) {
    cnt.FW = iFW;
  }

  this.setCntBF = function(iBF) {
    cnt.BF = iBF;
  }

  this.getCntFhz = function(iAll) {
    if (iAll) {
      return cnt.fhz + cnt.RTW + cnt.NEF;
    } else {
      return cnt.Fhz;
    }
  }

  this.getCntMaxFhz = function(iAll) {
    if (iAll) {
      return cnt.maxFhz + cnt.maxRTW + cnt.maxNEF;
    } else {
      return cnt.maxFhz;
    }
  }

  this.getCntAB = function() {
    return cnt.ab;
  }

  this.getCntMaxAB = function() {
    return cnt.maxAb;
  }

  this.getCntRTW = function() {
    return cnt.RTW;
  }

  this.getCntMaxRTW = function() {
    return cnt.maxRTW;
  }

  this.getCntNEF = function() {
    return cnt.NEF;
  }

  this.getCntMaxNEF = function() {
    return cnt.maxNEF;
  }

  this.getCntCrew = function() {
    return cnt.crew;
  }

  this.getCntCrewBF = function() {
    return cnt.crewBF;
  }

  this.isBFReady = function() {
    return cnt.FW >= 10;
  }

  this.refresh = function() {
    for each (station in list) {
      station.delete();
    }
    list = {};
    delValue(GMVAL_PREF_UFW+escape(user));
    cnt.FW =
    cnt.BF   =
    cnt.crew =
    cnt.crewBF =
    cnt.fhz  =
    cnt.maxFhz =
    cnt.ab  =
    cnt.maxAb =
    cnt.RTW  =
    cnt.maxRTW =
    cnt.NEF  =
    cnt.maxNEF = 0;
  }

  this.serialize = function() {
    var str = '';
    var fwArr = [];
    for each (station in list) {
      station.save();
      str += station.serialize()+'\n';
      fwArr.push(station.getNumber());
    }
    setValue(GMVAL_PREF_UFW+cnf.world+'_'+escape(user), 'stations='+fwArr.toString());
    return str;
  }

  this.toString = function() {
    var lCntFhz = this.getCntFhz(true);
    var lCntMaxFhz = this.getCntMaxFhz(true);
    var lCntAB = this.getCntAB();
    var lCntMaxAB = this.getCntMaxAB();
    var str = cnt.FW+' Feuerwache'+((cnt.FW>1)?'n':'')+((cnt.BF>0)?', davon '+cnt.BF+' Berufsfeuerwehr'+((cnt.BF>1)?'en':''):'');
    str += ', mit '+(lCntFhz)+((lCntFhz!=lCntMaxFhz)?'/'+(lCntMaxFhz):'')+' Fahrzeug'+(((lCntFhz)>1)?'en':'')+((cnt.RTW>0)?', davon '+cnt.RTW+' Rettungswagen':'')+((cnt.NEF>0)?((cnt.RTW>0)?' und ':', davon ')+cnt.NEF+' Notarztwagen':'');
    str += ', sowie '+(lCntAB)+((lCntAB!=lCntMaxAB)?'/'+(lCntMaxAB):'')+' Abrollbehälter'+(((lCntAB)>1)?'n':'');
    str += ' und '+cnt.crew+' Feuerwehrleuten'+((cnt.crew!=cnt.crewBF)?' ('+cnt.crewBF+' BF)':'');
    return str;
  }

  this.write = function(iVerbose) {
    var str = '';
    for each (station in list) {
      str += ((iVerbose)?station.write():station)+'\n';
    }
    return str + '\n' + this;
  }
}

// Feuerwache
function stationCls(iNode, iName, iLevel) {
  var maxVal = {0: {fhz: 0, rtw: 0, nef: 0}, 1: {fhz: 1, rtw: 0, nef: 0}, 2: {fhz: 2, rtw: 0, nef: 0}, 3: {fhz: 3, rtw: 0, nef: 0}, 4: {fhz: 4, rtw: 0, nef: 1}, 5: {fhz: 4, rtw: 1, nef: 1}, 6: {fhz: 6, rtw: 2, nef: 1}};
  var name = '';
  var number = 0;
  var pos = ['0','0'];
  var cur = {
    fhz : 0,
    rtw : 0,
    nef : 0,
    ab  : 0,
    crew: 0,
  };
  var level = 0;
  var max = {
    crew: 0,
    nef: 0,
    ab : 0,
  };

  this.getClass = function() {
    return 'stationCls';
  }

  this.parse = function(iNode, iCol) {
    var evalTD = xPath.getNodes("./td", iNode);
    var [, numberStr, name] = /wachen\/(\d+)">([^<]*)</.exec(evalTD.snapshotItem(iCol['Bezeichnung']-1).innerHTML.trim());
    var [, posX, posY] = /startseite\/(\d+)\/(\d+)">.*</.exec(evalTD.snapshotItem(iCol['Position']-1).innerHTML.trim());
    var [, fhzStr, fhzMaxStr] = /autos">(\d+)<\/a>\s*\/\s*(\d+)/.exec(evalTD.snapshotItem(iCol['Fahrzeuge']-1).innerHTML.trim());
    var [, rtwStr, rtwMaxStr] = /(\d+)\s*\/\s*(\d+)/.exec(evalTD.snapshotItem(iCol['RTW']-1).innerHTML.trim());
    var [, nefStr, nefMaxStr] = /(\d+)\s*\/\s*(\d+)/.exec(evalTD.snapshotItem(iCol['NEF']-1).innerHTML.trim());
    var [, abStr,  abMaxStr]  = /(\d+)\s*\/\s*(\d+)/.exec(evalTD.snapshotItem(iCol['Abrollbehälter']-1).innerHTML.trim());
    var [, crewStr] = /leute">(.*)</.exec(evalTD.snapshotItem(iCol['Personen']-1).innerHTML.trim());
    try {
      var [, crewMaxStr] = /Soll\:\s*(\d+)/.exec(evalTD.snapshotItem(iCol['Personen']-1).innerHTML.trim());
      if (crewMaxStr) {
        this.setMaxCrew(parseInt(crewMaxStr));
      }
    } catch(e) {
    }

    try {
      this.setNumber(parseInt(numberStr));
      this.setFhz(parseInt(fhzStr));
      this.setRTW(parseInt(rtwStr));
      this.setNEF(parseInt(nefStr));
      this.setMaxNEF(parseInt(nefMaxStr));
      this.setAB(parseInt(abStr));
      this.setMaxAB(parseInt(abMaxStr));
      this.setCrew(parseInt(crewStr));
      this.setLevel(parseInt(evalTD.snapshotItem(iCol['Stufe']-1).innerHTML.trim()));
      this.setPosition(posX, posY);
    } catch(e) {
      errLog.addMsg(e);
    }
  }

  this.getName = function() {
    return name;
  }

  this.setName = function(iName) {
    name = iName;
  }

  this.getNumber = function() {
    return number;
  }

  this.setNumber = function(iNum) {
    number = iNum;
  }

  this.getLevel = function() {
    return level;
  }

  this.setLevel = function(iLevel) {
    level = iLevel;
    max.fhz = maxVal[level].fhz;
    max.rtw = maxVal[level].rtw;
  }

  this.getPosition = function() {
    return pos;
  }

  this.setPosition = function(iPos, iPosY) {
    if (iPosY) {
      pos[0] = iPos;
      pos[1] = iPosY;
    } else if (iPos.length) {
      for (var i = 0; i < iPos.length; i++) {
        pos[i] = iPos[i];
      }
    }
  }

  this.isBF = function() {
    return level > 3;
  }

  this.getFhz = function(iAll) {
    return cur.fhz + ((iAll)?cur.rtw:0);
  }

  this.setFhz = function(iFhz) {
    cur.fhz = iFhz;
  }

  this.getMaxFhz = function(iAll) {
    return maxVal[level].fhz + ((iAll)?(this.getMaxRTW() + this.getMaxNEF()):0);
  }

  this.getRTW = function() {
    return cur.rtw;
  }

  this.setRTW = function(iRTW) {
    cur.rtw = iRTW;
  }

  this.getMaxRTW = function() {
    return maxVal[level].rtw;
  }

  this.getNEF = function() {
    return cur.nef;
  }

  this.setNEF = function(iNEF) {
    cur.nef = iNEF;
  }

  this.setMaxNEF = function(iNEF) {
    max.nef = iNEF;
  }

  this.getMaxNEF = function() {
    return max.nef;
  }

  this.getAB = function() {
    return cur.ab;
  }

  this.setAB = function(iAB) {
    cur.ab = iAB;
  }

  this.setMaxAB = function(iAB) {
    max.ab = iAB;
  }

  this.getMaxAB = function() {
    return max.ab;
  }

  this.getCrew = function() {
    return cur.crew;
  }

  this.setCrew = function(iCrew) {
    cur.crew = iCrew;
  }

  this.getMaxCrew = function() {
    return max.crew;
  }

  this.setMaxCrew = function(iCrew) {
    max.crew = iCrew;
  }

  this.serialize = function() {
    var str = 'number='+number.toString()+';name='+encodeURIComponent(name)+';position='+pos.join('/')+';level='+level+';vehicles='+cur.fhz+';ambulances='+cur.rtw+';doctor='+cur.nef+';MaxDoctor='+max.nef+';AB='+cur.ab+';maxAB='+max.ab+';crew='+cur.crew;
    if (max.crew > 0) {
      str += ';maxCrew='+max.crew;
    }
    return str;
  }

  this.deserialize = function(iStr) {
    var elems = iStr.split(';');

    for (i = 0; i < elems.length; i++) {
      [key, value] = elems[i].split('=');
      switch(key) {
        case 'number':
          this.setNumber(parseInt(value));
          break;
        case 'name':
          this.setName(unescape(value));
          break;
        case 'level':
          this.setLevel(parseInt(value));
          break;
        case 'position':
          this.setPosition(value.split('/'));
          break;
        case 'vehicles':
          this.setFhz(parseInt(value));
          break;
        case 'ambulances':
          this.setRTW(parseInt(value));
          break;
        case 'doctor':
          this.setNEF(parseInt(value));
          break;
        case 'MaxDoctor':
          this.setMaxNEF(parseInt(value));
          break;
        case 'AB':
          this.setAB(parseInt(value));
          break;
        case 'maxAB':
          this.setMaxAB(parseInt(value));
          break;
        case 'crew':
          this.setCrew(parseInt(value));
          break;
        case 'maxCrew':
          this.setMaxCrew(parseInt(value));
          break;
        default:
          break;
      }
    }
  }

  this.load = function() {
    this.deserialize(getValue(GMVAL_PREF_EST+this.getNumber(), this.serialize()));
  }

  this.save = function() {
    setValue(GMVAL_PREF_EST+this.getNumber(), this.serialize());
  }

  this.delete = function() {
    delValue(GMVAL_PREF_EST+this.getNumber());
  }

  this.write = function() {
    return name +' ('+number+' @'+pos.join('/')+')\nFahrzeuge: '+cur.fhz+'('+max.fhz+')\nRTW: '+cur.rtw+'('+max.rtw+')\nNEF: '+cur.nef+'('+max.nef+')\nAbrollbehälter: '+cur.ab+'('+max.ab+')'+
           '\nMannschaft: '+cur.crew+((max.crew > 0)?'('+max.crew+')':'')+'\nStufe: '+level;
  }

  this.toString = function() {
    return name +' ('+number+' @'+pos.join('/')+') level: '+level;
  }

  // Hinweis: iNode ist undefined beim Laden vom GM-Memory
  if (iNode) {
    if (iNode.nodeType) {
      this.parse(iNode, iName);//iName enthält dann die Spalten
    } else {
      this.setNumber(iNode);
      this.setName(iName);
      this.setLevel(iLevel?iLevel:1);
    }
  }
}

// Liste der Fahrzeuge
function fhzListCls(iConf) {
  // 'private' Variablen
  var cnf = iConf;
  var list = {}; // Liste der Fahrzeuge

  this.getClass = function() {
    return 'fhzListCls';
  }

  this.addFhz = function(iFhz) {
    list[iFhz.getName()] = iFhz;
  }

  this.getFhz = function(iFhzStr) {
    return list[iFhzStr];
  }

  this.getFhzByID = function(iID) {
    for each (fhz in list) {
      if (fhz.getID() == iID) {
        return fhz;
      }
    }
    return;
  }

  this.getList = function() {
    return list;
  }

  this.getSortedList = function() {
    var sortList = [];
    for each (fhz in list) {
      sortList.push(fhz);
    }
    if (cnf.intConf.sortVehiclesByClass) {
      sortList.sort(function(a, b) { return (a.getGrp().isOnWater() == b.getGrp().isOnWater())?a.getGrp().getSequence() - b.getGrp().getSequence():((a.getGrp().isOnWater())?1:-1); });
    } else {
      sortList.sort(function(a, b) { return (a.getName() > b.getName()); });
    }

    return sortList;
  }

  this.write = function() {
    var result = '';
    for each(fhz in list) {
      result += fhz.write() + '\n';
    }
    return result;
  }
}

// Fahrzeug
// Parameter: Name, Fahrzeuggruppe, ab Wache anforderbar, Geschwindigkeit, ist LF-artig, benötigt Ausbildung, Suchemaske für Nachforderung, Wiki-Link
function fhzCls(iName, iGrp, iValues, iConf) {
  // 'private' Variablen
  var cnf = iConf;
  var id     = 0;
  var name   = '';
  var grp    = {};
  var ab     = {};
  var speed  = 0;
  var lGrpFhz = false; //ist Löschgruppenfahrzeug
  var training = false; //benötigt Besatzung mit Ausbildung
  var regex  = /.*/;
  var wiki   = '';
  var gmKey  = '';

  this.getClass = function() {
    return 'fhzCls';
  }

  this.getID = function() {
    return id;
  }

  this.setID = function(iID) {
    id = iID;
  }

  this.getName = function() {
    return name;
  }

  this.setName = function(iName) {
    name = iName;
  }

  this.getGrp = function() {
    return grp;
  }

  this.setGrp = function(iGrp) {
    if (objType(grp) === 'fhzGrpCls') {
      grp.removeFhz(this);
      iGrp.addFhz(this);
    }
    grp = iGrp;
  }

  this.getAb = function() {
    return ab;
  }

  this.setAb = function(iAb) {
    ab = new abWacheCls(iAb, cnf);
  }

  this.getSpeed = function() {
    return speed;
  }

  this.setSpeed = function(iSpeed) {
    speed = iSpeed;
  }

  this.isLGrpFhz = function() {
    return lGrpFhz;
  }

  this.setLGrpFhz = function(iLGrpFhz) {
    lGrpFhz = iLGrpFhz;
  }

  this.needsTraining = function() {
    return training;
  }

  this.setTraining = function(iTrain) {
    training = iTrain;
  }

  this.getRegex = function() {
    return regex;
  }

  this.setRegex = function(iRegex) {
    regex = new RegExp(iRegex);
  }

  this.getWiki = function() {
    return (wiki != '')? WikiURL + wiki:'#';
  }

  this.setWiki = function(iWiki) {
    wiki = iWiki;
  }

  this.toString = function() {
    return this.getName() + ' (@' + this.getID() + ': ' + this.getGrp().getName() + ')';
  }

  this.write = function() {
    return this.getName() + ' (@' + this.getID() + ': ' + this.getGrp().getName() + ')' + ((this.isLGrpFhz())?' als Löschgruppenfahrzeug':'') + ((this.needsTraining())?', benötigt ausgebildete Besatzung':'')  + ', fährt ' + this.getSpeed() + 'km/h und tritt ab ' + this.getAb().write() + ' auf, RegExp = /' +  this.getRegex().source + '/';
  }

  this.setName(iName.trim());
  this.setGrp(iGrp);
  this.setID(iValues.id);
  this.setAb(iValues.ab || {FW: 1});
  this.setSpeed(iValues.speed);
  if (iValues.groupVeh !== undefined) {
    this.setLGrpFhz(iValues.groupVeh);
  }
  if (iValues.trainable !== undefined) {
    this.setTraining(iValues.trainable);
  }
  this.setRegex(iValues.regex);
  this.setWiki(iValues.wiki);
}

// Liste der Fahrzeuggruppen
function fhzGrpListCls(iConf) {
  // 'private' Variablen
  var cnf = iConf;
  var list = {}; // Liste der Fahrzeuggruppen
  var cnt  = 0;

  this.getClass = function() {
    return 'fhzGrpListCls';
  }

  this.addFhzGrp = function(iFhzGrp) {
    list[iFhzGrp.getName()] = iFhzGrp;
    cnt++;
  }

  this.getFhzGrp = function(iFhzGrpStr) {
    return list[iFhzGrpStr];
  }

  this.getCount = function() {
    return cnt;
  }

  this.findDemand = function(msg) {
    for each (fGrp in this.getList()) {
      if (fGrp.getRegex().source.length == 0) {
        continue;
      }
      if (fGrp.getRegex().test(msg)) {
        return fGrp;
      }
    }
  }

  this.getList = function(iOnWater) {
    var grpOutList = {};
    var grpList = [];
    var limitList = false;

    if (iOnWater !== undefined) {
      limitList = true;
    }
    for each(grp in list) {
      if (limitList && (grp.isOnWater() != iOnWater || grp.getRegex().source.length == 0)) {
        continue;
      }
      grpList.push(grp);
    }

    if (cnf.intConf.sortVehiclesByClass) {
      grpList.sort(function(a, b) { return (a.isOnWater() == b.isOnWater())?(a.getSequence() - b.getSequence()):((a.isOnWater())?1:-1); });
    } else {
      grpList.sort(function(a, b) { return (a.getName() > b.getName()); });
    }

    for (i = 0; i < grpList.length; i++) {
      grpOutList[grpList[i].getName()] = grpList[i];
    }

    return grpOutList;
  }

  this.save = function() {
    for each (fGrp in list) {
      if (!fGrp.save()) {
        return false;
      }
    }
    return true;
  }

  this.write = function() {
    var result = '';
    for each(fhzGrp in this.getList()) {//sortiert
      result += fhzGrp.write() + '\n';
    }
    return result;
  }
}

// Fahrzeuggruppe
// Parameter: Name, Text, Sortierung
function fhzGrpCls(iName, iValues, iConf) {
  this.GMVAL_PREF_FGR = 'fgr_';
  var cnf = iConf;
  var list = {}; // Liste der zugeordneten Fahrzeuge
  var name   = '';
  var type   = '';
  var cur = {
    text   : '',
    seq    : 0 };
  var def = {
    text   : '',
    seq    : 0  };
  var mod = {
    text   : false,
    seq    : false };
  var onWater = false;
  var visible = true;
  var ab     = {};
  var regex  = new RegExp('');
  var gmKey  = '';

  this.getClass = function() {
    return 'fhzGrpCls';
  }

  this.addFhz = function(iFhz) {
    list[iFhz.getName()] = iFhz;
    regex = new RegExp(((regex.source.length > 0)?regex.source + '|':'') + iFhz.getRegex().source);
  }

  this.removeFhz = function(iFhz) {
    delete list[iFhz.getName()];
    for each (var fhz in list) {
      regex = new RegExp(((regex.source.length > 0)?regex.source + '|':'') + fhz.getRegex().source);
    }
  }

  this.getFhzList = function() {
    return list;
  }

  this.getFhzNameArr = function() {
    var fhzArr = [];
    for each (var fhz in list) {
      fhzArr.push(fhz.getName());
    }
    return fhzArr;
  }

  this.hasFhz = function() {
    return (this.getFhzNameArr().length > 0);
  }

  this.getName = function() {
    return name;
  }

  this.setName = function(iName) {
    name = iName;
  }

  this.getType = function() {
    return type;
  }

  this.setType = function(iType) {
    type = iType;
  }

  this.isInScope = function() {
    return cnf.stationList.isInScope(this.getAb());
  }

  this.getRegex = function() {
    return regex;
  }

  this.setRegex = function(iRegexStr) {
    regex = new RegExp(iRegexStr);
  }

  this.getSequence = function() {
    return cur.seq;
  }

  this.setSequence = function(iSequence) {
    cur.seq = iSequence;
    if (cur.seq != def.seq) {
      mod.seq = true;
    }
  }

  this.isOnWater = function() {
    return onWater;
  }

  this.setOnWater = function(iOnWater) {
    onWater = iOnWater;
  }

  this.getVisible = function() {
    return visible;
  }

  this.setVisible = function(iVisible) {
    visible = iVisible;
  }

  this.getAb = function() {
    return ab;
  }

  this.setAb = function(iAb) {
    ab = new abWacheCls(iAb, cnf);
  }

  this.getText = function() {
    return cur.text;
  }

  this.getSortKey = function() {
    var str = cur.seq.toString();
    if (str.length == 1) {
      str = '0' + str;
    }
    return str;
  }

  this.setText = function(iText) {
    cur.text = iText;
    if (cur.text != def.text) {
      mod.text = true;
    }
  }

  this.isModTxt = function() {
    return mod.text;
  }

  this.isModSeq = function() {
    return mod.seq;
  }

  this.isModified = function() {
    return this.isModTxt() || this.isModSeq();
  }

  this.load = function(iSeq, iTxt) {
    def.seq = iSeq;
    def.text = iTxt;
    var gmVal = getValue(gmKey);
    var seqStr = iSeq.toString();
    var txtStr = iTxt;
    if (gmVal) {
      var attrs = gmVal.split(';');
      for each (attr in attrs) {
        var [key, value] = attr.trim().split('=');
        switch(key.trim()) {
          case 'sequence' :
            seqStr = value.trim();
            break;
          case 'text'     :
            txtStr = value.trim();
            break;
          default         :
            //Fehler in den Daten
            break;
        }
      }
    }
    this.setSequence(parseInt(seqStr));
    this.setText(txtStr);
    this.setOnWater(onWater);
  }

  this.save = function() {
    if (this.isModified()) {
      var gmVal = '';
      if (this.isModSeq()) {
        gmVal = 'sequence=' + this.getSeq().toString();
      }
      if (this.isModTxt()) {
        if (gmVal != '') {
          gmVal += ';';
        }
        gmVal += 'text=' + this.getText();
      }
      writeStr('speichere ' + this.getName() + ': ' + gmKey + '...');
      setValue(gmKey, gmVal);
    } else {
      if (getValue(gmKey)) {
        writeStr('entferne ' + this.getName());
        delValue(gmKey);
      }
    }
    return true;
  }

  this.resetSeq = function() {
    cur.seq = def.seq;
  }

  this.resetText = function() {
    cur.text = def.text;
  }

  this.reset = function() {
    this.resetSeq();
    this.resetText();
  }

  this.toString = function() {
    return this.getName();
  }

  this.write = function() {
    var result = this.getSequence() + '. ' + this.getName() + ' (' + this.getText() + '), RegExp = /' + this.getRegex().source + '/';
    var fhzArr = new Array();
    for each(fhz in list) {
      fhzArr.push(fhz.getName());
    }
    return result + ((fhzArr.length > 0)?', Fahrzeuge: {' + fhzArr.join(', ') + '}':'');
  }

  if (iName.trim()) {
    gmKey = this.GMVAL_PREF_FGR + iName.trim();
    this.setName(iName.trim());
  } else {
    throw 'name: ' + iName.trim();
  }

  if (iValues.type) {
    type = iValues.type;
  }

  if (iValues.onWater) {
    onWater = iValues.onWater;
  }

  this.setAb(iValues.ab || {FW: 1});
  this.load(iValues.seq, iValues.text);
  if (iValues.visible != undefined) {
    this.setVisible(iValues.visible);
  }
}

// Liste der Container
function ContainerListCls(iConf) {
  // 'private' Variablen
  var cnf = iConf;
  var list = {}; // Liste der Fahrzeuge

  this.getClass = function() {
    return 'fhzListCls';
  }

  this.addContainer = function(iCnt) {
    list[iCnt.getName()] = iCnt;
  }

  this.getContainer = function(iCntStr) {
    return list[iCntStr];
  }

  this.getContainerByID = function(iID) {
    for each (var cnt in list) {
      if (cnt.getID() == iID) {
        return cnt;
      }
    }
    return;
  }

  this.getList = function() {
    return list;
  }

  this.getSortedList = function() {
    var sortList = [];
    for each (var cnt in list) {
      sortList.push(cnt);
    }
    sortList.sort(function(a, b) { return (a.getName() > b.getName()); });

    return sortList;
  }

  this.write = function() {
    var result = '';
    for each (var cnt in list) {
      result += cnt.write() + '\n';
    }
    return result;
  }
}

function ContainerCls(iName, iValues, iConf) {
  // 'private' Variablen
  var cnf = iConf;
  var id     = 0;
  var name   = '';
  var actAs  = 0; //verhält sich wie Fahrzeug
  var wiki   = '';
  var gmKey  = '';

  this.getClass = function() {
    return 'fhzCls';
  }

  this.getID = function() {
    return id;
  }

  this.setID = function(iID) {
    id = iID;
  }

  this.getActAs = function() {
    return actAs;
  }

  this.getActAsFhz = function() {
    return (actAs > 0)?cnf.getFhzByID(actAs):undefined;
  }

  this.setActAs = function(iActAs) {
    actAs = iActAs;
  }

  this.getName = function() {
    return name;
  }

  this.setName = function(iName) {
    name = iName;
  }

  this.getText = function() {
    return text;
  }

  this.setText = function(iText) {
    text = iText;
  }

  this.getWiki = function() {
    return (wiki != '')? WikiURL + wiki:'#';
  }

  this.setWiki = function(iWiki) {
    wiki = iWiki;
  }

  this.toString = function() {
    return this.getName() + ' (@' + this.getID() + ')';
  }

  this.write = function() {
    return this.getName() + ' (@' + this.getID() +')' + ((this.getActAs() !== 0)?' ersetzt '+((this.getActAs()>0)?this.getActAsFhz().getName():'kein Fahrzeug'):'');
  }

  this.setName(iName.trim());
  this.setText(iValues.text.trim());
  this.setID(iValues.id);
  this.setActAs(iValues.actAs);
  this.setWiki(iValues.wiki);
}

// Liste der Alarmierungsstichworte
function stwListCls(iConf) {
  var cnf = iConf;
  var list = {}; // Liste der Stichworte

  this.getClass = function() {
    return 'stwListCls';
  }

  this.addStw = function(iStw) {
    list[iStw.getName()] = iStw;
  }

  this.getStw = function(iStwStr) {
    var stw = list[iStwStr];
    return (stw != undefined)?stw:list[STW_UNDEF];
  }

  this.getList = function(iFull) {
    var tmpList = [];

    if (iFull) {
      tmpList = list;
    } else {
      for each (stw in list) {
        if (stw.getName() == STW_UNDEF) {
          continue;
        }
        tmpList.push(stw);
      }
    }

    return tmpList;
  }

  this.getSortedList = function(iFull) {
    var sortList = this.getList(false); // ohne STW_UNDEF
    sortList.sort(function(a,b){ return a.getName() > b.getName(); });
    // Element undef am Anfang der Liste einfügen
    if (iFull) {
      sortList.unshift(this.getStw(STW_UNDEF));
    }

    return sortList;
  }

  this.save = function() {
    for each (stw in list) {
      if (!stw.save()) {
        return false;
      }
    }
    return true;
  }

  this.write = function() {
    var result = '';
    for each(stw in list) {
      result += stw.write() + '\n';
    }
    return result;
  }
}

// Alarmierungsstichworte
// Parameter: Name, Text, Liste der zu alarmierenden Fahrzeuge
function stwCls(iName, iValues, iConf) {
  this.GMVAL_PREF_STW = 'ecl_';
  var cnf = iConf;
  var name = '';
  var internal = false;
  // aktuelle Daten
  var cur = {
    text : '',
    fhze : new fhzColCls('', cnf),
  };
  // Defaultdaten
  var def = {
    text : '',
    fhze : new fhzColCls('', cnf),
  };
  // Modifikationsflags
  var mod = {
    text : false,
    fhze : false,
  };
  var gmKey  = '';

  this.getClass = function() {
    return 'stwCls';
  }

  this.getName = function() {
    return name;
  }

  this.setName = function(iName) {
    name = iName;
  }

  this.getText = function() {
    return cur.text;
  }

  this.getTextDef = function() {
    return def.text;
  }

  this.setText = function(iText) {
    cur.text = iText;
    mod.text = (cur.text != def.text);
  }

  this.getFhze = function() {
    return cur.fhze;
  }

  this.getFhzList = function() {
    return cur.fhze.getList();
  }

  this.getFhzeDef = function() {
    return def.fhze;
  }

  this.getFhzDefList = function() {
    return def.fhze.getList();
  }

  this.setFhze = function(iFhz) {
    cur.fhze = new fhzColCls(iFhz, cnf);
    mod.fhze = !cur.fhze.compare(def.fhze);
  }

  this.isModFhze = function() {
    return mod.fhze;
  }

  this.isModTxt = function() {
    return mod.text;
  }

  this.isModified = function() {
    return this.isModTxt() || this.isModFhze();
  }

  this.load = function(iFhzStr, iTxt) {
    def.text = iTxt;
    def.fhze = new fhzColCls(iFhzStr, cnf);
    var gmVal = getValue(gmKey);
    var fhzStr = iFhzStr;
    var txtStr = iTxt;
    if (gmVal) {
      if (/[=;]/.test(gmVal)) {
        var attrs = gmVal.split(';');
        for each (attr in attrs) {
          var [key, value] = attr.trim().split('=');
          switch(key.trim()) {
            case 'vehicles':
              fhzStr = value.trim();
              break;
            case 'text':
              txtStr = value.trim();
              break;
            default:
              //Fehler in den Daten
              break;
          }
        }
      } else if (gmVal.length > 0) {//noch nach alter Art gespeichert
        fhzStr = gmVal;
      }
    }
    this.setText(txtStr);
    this.setFhze(fhzStr);
  }

  this.save = function() {
    if (this.isModified()) {
      var gmVal = '';
      if (this.isModFhze()) {
        gmVal = 'vehicles=' + this.getFhze().getList().toString();
      }
      if (this.isModTxt()) {
        if (gmVal != '') {
          gmVal += ';';
        }
        gmVal += 'text=' + this.getText();
      }
      writeStr('speichere ' + this.getName() + '...');
      setValue(gmKey, gmVal);
    } else {
      if (getValue(gmKey)) {
        writeStr('entferne ' + this.getName());
        delValue(gmKey);
      }
    }
    return true;
  }

  this.resetFhze = function() {
    cur.fhze = def.fhze;
  }

  this.resetText = function() {
    cur.text = def.text;
  }

  this.reset = function() {
    this.resetFhze();
    this.resetText();
  }

  this.write = function() {
    return this.getName() + ' (' + ((this.isModTxt())?'*':' ') + this.getText() + ') alarmiert ' + ((this.isModFhze())?'*':' ') + '\'' + this.getFhze().toString() + '\'';
  }

  this.toString = function() {
    return this.getName();
  }

  gmKey = this.GMVAL_PREF_STW + iName.trim();
  this.setName(iName.trim());
  if (iValues.internal !== undefined) {
    internal = iValues.internal;
  }
  this.load(iValues.vhc, iValues.txt);
}

// Liste der Alarmierungsmeldungen
function mldListCls(iConf) {
  var cnf = iConf;
  var list = {}; // Liste der Stichworte

  this.getClass = function() {
    return 'mldListCls';
  }

  this.addMld = function(iMld) {
    list[iMld.getName()] = iMld;
  }

  this.getList = function(iFull) {
    var tmpList = [];
    for each (mld in list) {
      if (mld.getName() == MLD_UNKNOWN) {
        continue;
      }
      tmpList.push(mld);
    }

    return tmpList;
  }

  this.getSortedList = function(iFull) {
    var sortList = this.getList(false); // ohne MLD_UNKNOWN
    sortList.sort(function(a,b){ return a.getName() > b.getName(); })
    // Element unknown am Anfang der Liste einfügen
    if (iFull) {
      sortList.unshift(this.getMld(MLD_UNKNOWN));
    }

    return sortList;
  }

  this.getMld = function(iMldStr) {
    var mld = list[iMldStr];
    return (mld != undefined)?mld:list[MLD_UNKNOWN];
  }

  this.save = function() {
    for each (mld in list) {
      if (!mld.save()) {
        return false;
      }
    }
    return true;
  }

  this.write = function() {
    var result = '';
    for each(mld in list) {
      result += mld.write() + '\n';
    }
    return result;
  }
}

// Alarmierungsmeldung
function mldCls(iName, iValues, iConf) {
  this.GMVAL_PREF_EME = 'eme_';
  var cnf = iConf;
  var name  = '';
  // aktuelle Daten
  var cur = {
    aao    : {},
    storm  : false,
    onWater: false,
    vbOrder: false,
  };
  // Defaultdaten
  var def = {
    aao    : {},
    storm  : false,
    onWater: false,
    vbOrder: false,
  };
  // Modifikationsflags
  var mod = {
    aao    : false,
    storm  : false,
    onWater: false,
    vbOrder: false,
  };
  var ab    = {};
  var wiki  = '';
  var gmKey = '';

  this.getClass = function() {
    return 'mldCls';
  }

  this.getName = function() {
    return name;
  }

  this.setName = function(iName) {
    name = iName;
  }

  this.getAao = function() {
    return cur.aao;
  }

  this.getStw = function() {
    return cur.aao.getStw();
  }

  this.getAaoDef = function() {
    return def.aao;
  }

  this.setAao = function(iAao) {
    switch(objType(iAao)) {
      case 'string':
        cur.aao = new aaoCls(iAao, cnf);
        break;
      case 'aaoCls':
        cur.aao = iAao;
        break;
      default:
        // Fehler
        break;
    }
    mod.aao = !cur.aao.compare(def.aao);
  }

  this.isModAao = function() {
    return mod.aao;
  }

  this.isModStorm = function() {
    return mod.storm;
  }

  this.isModOnWater = function() {
    return mod.onWater;
  }

  this.isModVBOrder = function() {
    return mod.vbOrder;
  }

  this.isModified = function() {
    return this.isModAao() || this.isModStorm() || this.isModOnWater();
  }

  this.isStorm = function() {
    return cur.storm;
  }

  this.setStorm = function(iStorm) {
    cur.storm = iStorm;
    mod.storm = (cur.storm != def.storm);
  }

  this.isOnWater = function() {
    return cur.onWater;
  }

  this.setOnWater = function(iOnWater) {
    cur.onWater = iOnWater;
    mod.onWater = (cur.onWater != def.onWater);
  }

  this.isVBOrder = function() {
    return cur.vbOrder;
  }

  this.isVBOrderDef = function() {
    return def.vbOrder;
  }

  this.setVBOrder = function(iVBOrder) {
    switch(objType(iVBOrder)) {
      case 'string':
        cur.vbOrder = (iVBOrder === 'true');
        break;
      case 'boolean':
          cur.vbOrder = iVBOrder;
        break;
      default:
        break;
    }
    mod.vbOrder = (cur.vbOrder != def.vbOrder);
  }

  this.getWiki = function() {
    return (wiki != '')?WikiURL + wiki:'#';
  }

  this.setWiki = function(iWiki) {
    wiki = iWiki;
  }

  this.getAb = function() {
    return ab;
  }

  this.setAb = function(iAb) {
    ab = new abWacheCls(iAb,cnf);
  }

  this.load = function(iMld, iStorm, iOnWater) {
    def.aao = new aaoCls(iMld, cnf);
    def.storm = iStorm;
    def.onWater = iOnWater;
    def.vbOrder = false;
    var gmVal = getValue(gmKey);
    var mldStr = iMld;
    var storm = iStorm;
    var onWater = iOnWater;
    var vbOrderStr = false;

    if (gmVal) {
      if (/[=;]/.test(gmVal)) {
        var attributes = gmVal.split(';');
        for each (attr in attributes) {
          var [key, value] = attr.trim().split('=');
          switch(key.trim()) {
            case 'class':
              mldStr = value.trim();
              break;
            case 'storm':
              switch(value.trim()) {
                case 'true':
                  storm = true;
                case 'false':
                  storm = false;
                default:
                  //Fehler in den Daten
                  break;
              }
              break;
            case 'onWater':
              switch(value.trim()) {
                case 'true':
                  onWater = true;
                case 'false':
                  onWater = false;
                default         :
                  //Fehler in den Daten
                  break;
              }
              break;
            case 'vbOrder':
              vbOrderStr = value.trim();
              break;
            default         :
              //Fehler in den Daten
              break;
          }
        }
      } else {
        //alte Art der Werteablage
        mldStr = gmVal;
      }
    }
    this.setAao(mldStr);
    this.setStorm(storm);
    this.setOnWater(onWater);
    this.setVBOrder(vbOrderStr);
  }

  this.save = function() {
    if (this.isModified() || this.isModVBOrder()) {
      var gmVal = '';
      if (this.isModAao()) {
        gmVal = 'class=' + this.getAao().toString(true);
      }
      if (this.isModStorm()) {
        if (gmVal != '') {
          gmVal += ';';
        }
        gmVal += 'storm=' + this.isStorm();
      }
      if (this.isModOnWater()) {
        if (gmVal != '') {
          gmVal += ';';
        }
        gmVal += 'onWater=' + this.isOnWater();
      }
      if (this.isModVBOrder()) {
        if (gmVal != '') {
          gmVal += ';';
        }
        gmVal += 'vbOrder=' + this.isVBOrder();
      }
      writeStr('speichere ' + this.getName() + ': ' + gmKey + '...');
      setValue(gmKey, gmVal);
    } else {
      if (getValue(gmKey)) {
        writeStr('entferne ' + this.getName());
        delValue(gmKey);
      }
    }
    return true;
  }

  this.resetAao = function() {
    cur.aao = def.aao;
  }

  this.resetStorm = function() {
    cur.storm = def.storm;
  }

  this.resetOnWater = function() {
    cur.onWater = def.onWater;
  }

  this.resetVBOrder = function() {
    cur.vbOrder = def.vbOrder;
  }

  this.reset = function() {
    this.resetAao();
    this.resetStorm();
    this.resetOnWater();
    this.resetVBOrder();
  }

  this.write = function() {
    return ((this.isModified())?'*':' ') + '\'' + this.getName() + '\':' + ((this.isStorm())?' ist ein Unwettereinsatz,':'') + ' alarmiert nach \'' + this.getAao().write(false) + '=>' + this.getAao().getFhzeStr(false) + '\'' + ' und tritt ab ' + this.getAb().write() + ' auf.';
  }

  this.toString = function() {
    return this.getName();
  }

  if (iName.trim()) {
    gmKey = this.GMVAL_PREF_EME + iName.trim();
    this.setName(iName.trim());
  } else {
    throw 'name: ' + iName.trim();
  }

  if (!iValues.storm) {
    iValues.storm = false;
  }

  if (!iValues.onWater) {
    iValues.onWater = false;
  }

  if (iValues.mld) {
    this.load(iValues.mld, iValues.storm, iValues.onWater);
  } else {
    throw 'aao: ' + iValues.mld
  }

  if (iValues.ab) {
    this.setAb(iValues.ab);
  } else {
    throw 'ab: ' + iValues.ab;
  }

  if (iValues.wiki) {
    this.setWiki(iValues.wiki);
  }
}

// Wachengültigkeit
function abWacheCls(iAb, iConf)  {
  var cnf = iConf;
  var ab  = {
    'FW': 0,
    'BF': 0,
    'MG': 0,
  };

  this.getClass = function() {
    return 'abWacheCls';
  }

  this.getFW = function() {
    return ab.FW;
  }

  this.getBF = function() {
    return ab.BF;
  }

  this.getMG = function() {
    return ab.MG;
  }

  this.write = function() {
    var abStr = '';
    for (fw in ab) {
      if (ab[fw] == 0) {
        continue;
      }
      if (abStr) {
        abStr += ', ';
      }
      abStr += ab[fw] + ' ';
      switch(fw) {
        case 'FW':
          abStr += 'Feuerwache' + ((ab[fw] > 1)?'n':'');
          break;
        case 'BF':
          abStr += 'Berufsfeuerwehr' + ((ab[fw] > 1)?'en':'');
          break;
        case 'MG':
          abStr += 'Verbandsspieler' + ((ab[fw] > 1)?'n':'');
          break;
        default:
          break;
      }
    }
    return abStr;
  }

  this.toString = function() {
    var abStr = '';
    for (fw in ab) {
      if (ab[fw] == 0) {
        continue;
      }
      if (abStr) {
        abStr += ', ';
      }
      abStr += ab[fw] + ' ' +fw;
    }
    return abStr;
  }

  for (var fw in iAb) {
    ab[fw] = iAb[fw];
  }
}

// Fahrzeugalarmierung
function aaoCls(iAaoStr, iConf) {
  var cnf = iConf;
  var stw  = {};
  var add  = new fhzColCls('', cnf);
  var opt  = new fhzColCls('', cnf);
  var text = '';

  function splitAao(iAao) {
    try {
      // zunächst eventuell optionale Fahrzeuge ermitteln
      [stwAddStr, optStr] = iAao.split('|');
      if (optStr && optStr.length > 0) {
        opt = new fhzColCls(optStr.trim(), cnf);
      }

      // dann eventuell zusätzliche Fahrzeuge ermitteln
      [stwStr, addStr] = stwAddStr.split('+');
      if (addStr && addStr.length > 0) {
        add = new fhzColCls(addStr.trim(), cnf);
      }

      // zum Schluss haben wir das Alarmierungsstichwort
      if (stwStr) {
        stw = cnf.getStw(stwStr.trim());
      } else {
        throw 'Kein Stichwort in AAO "'+iAao+'" gefunden';
      }
    } catch(e) {
      writeStr('Fehler bei AAO '+iAao+': '+e);
      throw(iAao+': '+e);
    }
  }

  this.getClass = function() {
    return 'aaoCls';
  }

  this.clone = function() {
    return new aaoCls(this.toString(), cnf);
  }

  this.getStw = function() {
    return stw;
  }

  this.setStw = function(iStw) {
    stw = iStw;
  }

  this.getAdd = function() {
    try {
      return add;
    } catch(e) {
      writeStr('Fehler bei '+stw.getName()+': '+e);
    }
  }

  this.getAddStr = function(condense) {
    try {
      if (condense) {
        return this.getAdd().toString();
      } else {
        return this.getAdd().getList().toString();
      }
    } catch(e) {
      writeStr('Fehler bei '+stw.getName()+': '+e);
    }
  }

  this.getOpt = function() {
    try {
      return opt;
    } catch(e) {
      writeStr('Fehler bei '+stw.getName()+': '+e);
    }
  }

  this.getOptStr = function(condense) {
    try {
      if (condense) {
        return this.getOpt().toString();
      } else {
        return this.getOpt().getList().toString();
      }
    } catch(e) {
      writeStr('Fehler bei '+stw.getName()+': '+e);
    }
  }

  this.getText = function() {
    return text;
  }

  this.getFhzeStrWithoutOfScopes = function(addExtra) {
    //Fahrzeugliste des Stichworts mit zusätzlichen Fahrzeugen vereinen, aber nur nach Wachenzahl bedürftige
    var fhzListe = '';
    if(addExtra) {
      fhzListe = stw.getFhze().getWithoutOfScopes().toString();
      if (add.getCount() > 0) {
        var addTmp = add.getWithoutOfScopes();
        if (addTmp.getCount() > 0) {
          fhzListe += '+' + addTmp.toString();
        }
      }
    } else {
      fhzListe = this.getFhze(false).getWithoutOfScopes().toString();
    }
    if (opt.getCount() > 0) {
      var optTmp = opt.getWithoutOfScopes();
      if (optTmp.getCount() > 0) {
        fhzListe += '|' + optTmp.toString();
      }
    }

    return fhzListe;
  }

  this.getFhze = function(iWithOpt) {
    try {
      var fhze = null;

      fhze = stw.getFhze();

      if (add.getCount() > 0) {
        fhze = fhze.concat(add);
      }

      if (iWithOpt && (opt.getCount() > 0)) {
        fhze = fhze.concat(opt);
      }

      return fhze;
    } catch(e) {
      errLog.addMsg('Fehler bei '+stw.getName()+': '+e);
    }
  }

  this.getFhzeStr = function(addExtra) {
    //Fahrzeugliste des Stichworts mit zusätzlichen Fahrzeugen vereinen
    var fhzListe = '';
    if(addExtra) {
      fhzListe = stw.getFhze().toString();
      if (add.getCount() > 0) {
        fhzListe += '+' + add.toString()
      }
    } else {
      fhzListe = this.getFhze(false).toString();
    }
    if (opt.getCount() > 0) {
      fhzListe += '|' + opt.toString()
    }

    return fhzListe;
  }

  this.toString = function(noCondense) {
    //Stichwort mit zusätzlichen Fahrzeugen vereinen
    var fhzListe = stw.getName();
    if (add.getCount() > 0) {
      fhzListe += '+' + (noCondense?add.getList().toString():add.toString());
    }
    if (opt.getCount() > 0) {
      fhzListe += '|' + (noCondense?opt.getList().toString():opt.toString());
    }

    return fhzListe;
  }

  this.write = function(onlyStw) {
    var outText = stw.getName() + ': ' + stw.getText();
    if (!onlyStw) {
      // eventuell zusätzliche Fahrzeuge
      outText += ((add.getCount() > 0)?' + ' + add.toString():'');
      // eventuell optionale Fahrzeuge
      outText += ((opt.getCount() > 0)?', opt: ' + opt.toString():'');
    }

    return outText;
  }

  this.compare = function(iAao) {
    return (this.toString() == iAao.toString())
  }

  splitAao(iAaoStr);
}

// Sammlung von Fahrzeugen z.B. für Alarmierungen
function fhzColCls(iFhz, iConf) {
  var cnf = iConf;
  var collection = [];

  this.getClass = function() {
    return 'fhzColCls';
  }

  this.concat = function(iColTo) {
    var fCol = new fhzColCls('', cnf);

    for each (fAlt in collection) {
      fCol.addFhz(fAlt);
    }
    for each (fAlt in iColTo.getList()) {
      fCol.addFhz(fAlt);
    }
    return fCol;
  }

  this.clone = function(iFull) {
    var fCol = new fhzColCls('', cnf);
    for each (fAlt in this.getList()) {
      fCol.addFhz((iFull)?fAlt.clone():fAlt);
    }
    return fCol;
  }

  this.remove = function(iFhz) {
    var tmpCol = [];
    var found = false;

    switch(objType(iFhz)) {
      case 'fhzGrpCls':
        for each(fAlt in collection) {
          if (found || !fAlt.isIn(iFhz)) {
            tmpCol.push(fAlt);
          } else {
            found = true;
          }
        }
        break;
      case 'fhzAltCls':
        for each(fGrp in iFhz.getList()) {
          for each(fAlt in collection) {
            if (found || !fAlt.isIn(fGrp)) {
              tmpCol.push(fAlt);
            } else {
              found = true;
            }
          }
        }
        break;
    }
    collection = tmpCol;
    return found;
  }

  this.clear = function() {
    collection = [];
  }

  this.contains = function(iFhz) {
    var found = false;

    switch(objType(iFhz)) {
      case 'string':
        return this.contains(cnf.getFhzGrp(iFhz));
        break;
      case 'fhzGrpCls':
        for each(fAlt in collection) {
          if(fAlt.isIn(iFhz)) {
            return true;
          }
        }
        break;
      case 'fhzAltCls':
        for each(fGrp in iFhz.getList()) {
          return this.contains(fGrp);
        }
        break;
      case 'fhzColCls':
        // jedes Element muss vorhanden sein
        found = true;
        for each(fAlt in iFhz.getList()) {
          if(!this.contains(fAlt)) {
            return false;
          }
        }
        break;
    }
    return found;
  }

  this.condense = function() {
    var cumArr = [];
    var seqArr = [];
    var liste = [];

    if (cnf.intConf.condenseVehicles) {
      // Einträge je Fahrzeuggruppe zählen (Fahrzeuggruppen mit Alternativen werden separat gezählt)
      // für Alternativen bestimmen, wo sie einsortiert werden sollen
      for each (var fGrp in this.getList()) {
        if (!cumArr[fGrp]) {
          cumArr[fGrp] = {};
          cumArr[fGrp].count = 1;
          cumArr[fGrp].vehicles = fGrp;
        } else {
          cumArr[fGrp].count++;
        }
      }

      for each (var cum in cumArr) {
        if (cum.count == 1) {
          liste.push(cum.vehicles.toString());
        } else {
          liste.push(cum.count.toString() + '*' + cum.vehicles.toString());
        }
      }
    } else {
      liste = collection;
    }

    return liste;
  }

  this.addFhz = function(iFhz) {
    switch(objType(iFhz)) {
      case 'string':
        if(!iFhz) {
          return;
        }
        var fArr = iFhz.split(',');
        for each (fhz in fArr) {
          if (fhz) {
            collection.push(new fhzAltCls(fhz.trim(), cnf));
          }
        }
        break;
      case 'fhzAltCls':
        collection.push(iFhz);
        break;
      case 'fhzColCls':
        for each (fAlt in iFhz.getList()) {
          collection.push(fAlt);
        }
        break;
      case 'fhzGrpCls':
        this.addFhz(new fhzAltCls(iFhz, cnf));
        break;
      case 'fhzCls':
        this.addFhz(new fhzAltCls(iFhz.getGrp(), cnf));
        break;
      case 'object':
        for each (fhz in iFhz) {
          this.addFhz(fhz);
        }
        break;
      default:
        applLog.addMsg(iFhz+'='+objType(iFhz));
    }
  }

  this.getWithoutOfScopes = function() {
    var fCol = new fhzColCls('', cnf);
    for each (fAlt in collection) {
      var fAltTmp = fAlt.getWithoutOfScopes();
      if (fAltTmp.getCount() > 0) {
        fCol.addFhz(fAltTmp);
      }
    }
    return fCol;
  }

  this.getList = function() {
    var tmpList = [];
    if (cnf.intConf.sortVehiclesByClass) {
      var sortKeys = {};
      var sortArr = [];
      for each (fAlt in collection) {
        var sortStr = fAlt.getSortStr();
        if (!sortKeys[sortStr]) {
          if (fAlt.getList().length == 0) {
            continue;
          }
          //Sortierschlüsselinformation sammeln
          sortKeys[sortStr] = fAlt.getSortStr();
          sortArr.push(sortStr);
        }
      }
      // und nun die Fahrzeugliste gemäß Sortierreihenfolge sortiert aufbauen
      for each (sortStr in sortArr.sort()) {
        for each (fAlt in collection) {
          if (sortKeys[sortStr] == fAlt.getSortStr()) {
            tmpList.push(fAlt);
          }
        }
      }
    } else {
      for each(fAlt in collection) {
        if (fAlt.getList().length == 0) {
          continue;
        }
        tmpList.push(fAlt);
      }
    }
    return tmpList;
  }

  this.setList = function(iFhz) {
    collection = [];
    switch(typeof iFhz) {
      case 'string':
        this.addFhz(iFhz.trim());
        break;
      case 'object':
        this.addFhz(iFhz);
        break;
    }
  }

  this.getCount = function() {
    return collection.length;
  }

  this.toString = function() {
    return this.condense().toString();
  }

  this.compare = function(iFhzCol) {
    return (this.toString() == iFhzCol.toString())
  }

  this.setList(iFhz);
}

function fhzAltCls(iFhz, iConf) {
  var cnf = iConf;
  var collection = [];

  this.getClass = function() {
    return 'fhzAltCls';
  }

  this.clone = function() {
    return new fhzAltCls(this, cnf);
  }

  this.isIn = function(iFhz) {
    switch(objType(iFhz)) {
      case 'fhzGrpCls':
        for each (fGrp in collection) {
          if (fGrp.getName() == iFhz.getName()) {
            return true;
          }
        }
        break;
      case 'fhzAltCls':
        for each (fGrp in iFhz.getList()) {
          if (this.isIn(fGrp)) {
            return true;
          }
        }
        break;
    }
    return false;
  }

  this.addFhz = function(iFhz) {
    switch(objType(iFhz)) {
      case 'string':
        try {
          if (iFhz) {
            var fhzArr = iFhz.split('/');
            for each (fhz in fhzArr) {
              if(!fhz) {
                throw fhz;
              }
              var fGrp = cnf.getFhzGrp(fhz.trim());
              if(!fGrp) {
                throw fhz;
              }
              collection.push(fGrp);
            }
          }
        } catch(e) {
          writeStr('Fahrzeuggruppe "'+iFhz+'" nicht bekannt: "'+e+'"');
          throw e;
        }
        break;
      case 'fhzAltCls':
        for each (alt in iFhz.getList) {
          collection.push(alt);
        }
        break;
      case 'fhzGrpCls':
        collection.push(iFhz);
        break;
      case 'fhzCls':
        collection.push(iFhz.getGrp());
        break;
      case 'object':
        // wahrscheinlich ein Array
        for each (fhz in iFhz) {
          this.addFhz(fhz);
        }
        break;
      default:
        applLog.addMsg(iFhz+'='+objType(iFhz));
    }
  }

  this.getList = function() {
    return collection;
  }

  this.getWithoutOfScopes = function() {
    var fAlt = new fhzAltCls('', cnf);
    for each(fhzGrp in collection) {
      if (fhzGrp.isInScope()) {
        fAlt.addFhz(fhzGrp);
      }
    }
    return fAlt;
  }

  this.setList = function(iFhz) {
    collection = [];
    switch(typeof iFhz) {
      case 'string':
        this.addFhz(iFhz.trim());
        break;
      case 'object':
        this.addFhz(iFhz);
        break;
    }
  }

  this.getSortStr = function() {
    var sortStr = '';
    for each (fGrp in collection) {
      sortStr += fGrp.getSortKey();
    }
    return sortStr;
  }

  this.getCount = function() {
    return collection.length;
  }

  this.toString = function() {
    return this.getList().join('/');
  }

  this.setList(iFhz);
}