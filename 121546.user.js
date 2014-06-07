// ==UserScript==
// @name           Ereglam's Test
// @namespace      http://www.ereglam.de
// @copyright      2010+, Ereglam (http://userscripts.org/users/Ereglam {135263})
// @license        GPL version 3 oder jede spätere Version; http://www.gnu.org/copyleft/gpl.html
// @description    Test for update mechanism
// @require        http://userscripts.org/scripts/source/121220.user.js
// @require        http://userscripts.org/scripts/source/121239.user.js
// @icon           http://www.feuerwache.net/favicon.ico
// @include        http://www.feuerwache.net/*
// @author         Ereglam
// @info           Test
// @version        1.0.1
// ==/UserScript==
const VERSION      = '1.0.1'
const USERSCRIPTID = '121546'; // diese Konstante ist anzupassen
const UPDATEURL="http://userscripts.org/scripts/show/"+USERSCRIPTID;
// unter welchem URL finde ich das Script als Installation?
const INSTALLURL="http://userscripts.org/scripts/source/"+USERSCRIPTID+".user.js";
// unter welchem URL finde ich die Metadaten zum Script?
const METAURL="http://userscripts.org/scripts/source/"+USERSCRIPTID+".meta.js";
var main = null;
var msgArea = $('msgArea');
var FahrzeugeLst = {
  'Kleinlöschfahrzeug' : {grp: 'LF',   speed: 60, groupVeh: true, regex: /Kleinlöschfahrzeug/, wiki: 'Kleinl%C3%B6schfahrzeug'},
  'LF 8'               : {grp: 'LF',   speed: 48, groupVeh: true, regex: /LF 8/, wiki: 'LF_8'},
  'LF 10/6'            : {grp: 'LF',   speed: 58, groupVeh: true, regex: /LF 10\/6/, wiki: 'LF_10/6'},
  'LF 20/16'           : {grp: 'LF',   speed: 60, groupVeh: true, regex: /LF 20\/16/, wiki: 'LF_20/16'},
  'HLF 10/6'           : {grp: 'LF',   speed: 58, groupVeh: true, regex: /HLF 10\/6/, wiki: 'HLF_10/6'},
  'HLF 20/16'          : {grp: 'LF',   speed: 60, groupVeh: true, regex: /HLF 20\/16/, wiki: 'HLF_20/16'},
  'HLF 24/14-S'        : {grp: 'HLFS', speed: 60, trainable: true , groupVeh: true, regex: /HLF 24\/14-S/, wiki: 'HLF_24/14-S'},
  'LF 16-TS'           : {grp: 'TS',   speed: 52, groupVeh: true, regex: /LF 16-TS/, wiki: 'LF_16-TS'},
  'DLA (K) 23/12'      : {grp: 'DLK',  speed: 63, regex: /Drehleiter|DLA [(]K[)] 23\/12/, wiki: 'DLA_(K)_23/12'},
  'RW'                 : {grp: 'RW',   speed: 49, regex: /Rüstwagen|RW/, wiki: 'RW'},
  'GW-Öl'              : {grp: 'GWÖl', speed: 51, regex: /GW-Öl/, wiki: 'GW-%C3%96l'},
  'GW-L2 - Wasser'     : {grp: 'GWL',  speed: 53, regex: /GW\s?-\s?L2\s?[-]?\s?Wasser/, wiki: 'GW-L2_Wasser'},
  'ELW 1'              : {grp: 'ELW',  speed: 77, regex: /ELW 1/, wiki: 'ELW_1'},
  'GW-A'               : {grp: 'GWA',  speed: 56, regex: /GW-A/, wiki: 'GW-A'},
  'TLF 16/25'          : {grp: 'TLF',  speed: 55, regex: /TLF 16\/25/, wiki: 'TLF_16/25'},
  'TLF 20/40 - SL'     : {grp: 'GTLF', speed: 49, regex: /TLF 20\/40 - SL/, wiki: 'TLF_20/40_SL'},
  'GW-Schiene'         : {grp: 'GWS',  speed: 57, regex: /GW-Schiene/, wiki: 'GW-Schiene'},
  'Kran'               : {grp: 'FwK',  speed: 55, regex: /Kran/, wiki: 'Kran'},
  'GW-Messtechnik'     : {grp: 'GWM',  speed: 40, trainable: true , regex: /GW-Messtechnic?k/, wiki: 'GW-M'},
  'GW-Gefahrgut'       : {grp: 'GWG',  speed: 46, trainable: true , regex: /GW-Gefahrgut/, wiki: 'GW-G'},
  'RTW'                : {grp: 'RTW',  speed: 75, trainable: true , regex: /RTW/, wiki: 'RTW'},
  'GW-Taucher'         : {grp: 'GWT',  speed: 62, trainable: true , regex: /GW-Taucher/, wiki: 'GW-T'},
  'GW-TUIS'            : {grp: 'TUIS', speed: 73, trainable: true , regex: /GW-TUIS/, wiki: 'GW-TUIS'},
  'ULF mit Löscharm'   : {grp: 'ULF',  speed: 40, regex: /ULF mit Löscharm|ULF/, wiki: 'ULF_mit_L%C3%B6scharm'},
'Flugfeldlöschfahrzeug': {grp: 'FLF',  speed: 110, trainable: true , regex: /Flugfeldlöschfahrzeug/, wiki: 'Flugfeldl%C3%B6schfahrzeug'},
  'Rettungstreppe'     : {grp: 'RTr',  speed: 65, trainable: true , regex: /Rettungstreppe/, wiki: 'Rettungstreppe'},
  'Feuerlöschboot'     : {grp: 'FLB',  speed: 60, trainable: true ,  regex: /Feuerlöschboot/, wiki: 'Loeschboot'},
  'Rettungsboot'       : {grp: 'RTB',  speed: 60, trainable: true ,  regex: /Rettungsboot/, wiki: 'Rettungsboot'},
};

var FhzGruppeLst = {
  'RTW' : {text: 'Rettungswagen',           seq:  1, ab: {BF: 10}, type: 'RTM'},
  'KLF' : {text: 'Kleinlöschfahrzeug',      seq:  2},
  'LF'  : {text: 'Löschgruppenfahrzeug',    seq:  3, type: 'LF'},
  'HLF' : {text: 'Hilfeleistungslöschgruppenfahrzeug', seq:  4},
  'HLFS': {text: 'Hilfeleistungslöschgruppenfahrzeug mit Schienenfahreinrichtung', seq:  23, ab: {FW: 65}},
  'TS'  : {text: 'LF mit Tragkraftspritze', seq:  5},
  'TLF' : {text: 'Tanklöschfahrzeug',       seq:  6, ab: {FW:  1}},
  'GTLF': {text: 'Großtanklöschfahrzeug',   seq:  7, ab: {FW:  7}},
  'ELW' : {text: 'Einsatzleitwagen',        seq:  8, ab: {FW:  5}},
  'DLK' : {text: 'Drehleiter (Korb)',       seq:  9, ab: {FW:  3}},
  'RW'  : {text: 'Rüstwagen',               seq: 10, ab: {FW:  4}},
  'GWL' : {text: 'Schlauchwagen',           seq: 11, ab: {FW:  5}},
  'GWÖl': {text: 'Gerätewagen Öl',          seq: 12, ab: {FW:  4}},
  'GWA' : {text: 'Gerätewagen Atemschutz',  seq: 13, ab: {FW:  6}},
  'GWS' : {text: 'Gerätewagen Schiene',     seq: 14, ab: {FW: 10}},
  'FwK' : {text: 'Feuerwehrkran',           seq: 15, ab: {FW: 25}},
  'GWG' : {text: 'Gerätewagen Gefahrgut',   seq: 16, ab: {BF:  2}},
  'GWM' : {text: 'Gerätewagen Messtechnik', seq: 17, ab: {BF:  2}},
  'GWT' : {text: 'Gerätewagen Taucher',     seq: 18, ab: {BF: 25}},
  'TUIS': {text: 'Gerätewagen Transport-Unfall-Information', seq: 19, ab: {FW: 64}},
  'ULF' : {text: 'Universallöschfahrzeug',  seq: 20, ab: {FW: 64}},
  'FLF' : {text: 'Flugfeldlöschfahrzeug',   seq: 21, ab: {BF: 59}},
  'RTr' : {text: 'Rettungstreppe',          seq: 22, ab: {BF: 59}},
  'FLB' : {text: 'Feuerlöschboot',          seq:  1, ab: {BF: 30}, onWater: true},
  'RTB' : {text: 'Rettungsboot',            seq:  2, ab: {FW: 50}, type: 'RTM', onWater: true},
};
var OptionLst = {
'global':
  {text: 'globale Einstellungen',
   opt:
{ checkForUpdates           : {valDef: true,  text: 'auf Updates prüfen'},
  dispStichwortColour       : {valDef: 'red', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe des Alarmierungsstichworts'},
  tooltipOnStationLink      : {valDef: true,  text: 'Tooltip-Information an Link zu Feuerwachen'},
  condenseVehicles          : {valDef: true,  text: 'Fahrzeuge zusammenfassen (LF, LF => 2LF)'},
  limit2neededVehicleGroups : {valDef: true,  text: 'nur nach Wachenanzahl benötigte Fahrzeuge anzeigen (z.B. DLK ab 3 FW)'},
  sortVehiclesByClass       : {valDef: true,  text: 'Fahrzeugliste nach Klassenreihenfolge sortieren'},
  disableSelectionDueToStorm: {valDef: false, text: 'Unwettermodus'},
  reducedSelectionVehicles  : {valDef: 'LF/HLFS/TS/TLF/RW/GTLF/TLF', type: OptType.string,  length: 20, valChkFunc: chkFunc.redSelVhc, text: 'Fahrzeug(e) für Unwettermodus'},
  reducedSelOptVehicles     : {valDef: '', type: OptType.string,  length: 20, valChkFunc: chkFunc.redSelVhc, text: 'optionale Fahrzeug(e) für Unwettermodus'},
  highlightUser             : {valDef: true,  text: 'Eigenen Namen in Toplisten hervorheben'},
  colorRemainingTimeBar     : {valDef: true,  text: 'farbige Anzeige der Restlaufzeit (altes Design)'},
  adjustMenus               : {valDef: true,  text: 'Menüs anpassen'},
}},
'eList':
  {text: 'Einsatzliste',
   opt:
{ showInfoKlasseInListe  : {valDef: true,  text: 'Alarmierungsstichwort anzeigen'},
  showInfoLangtextListe  : {valDef: false, text: 'Langtext zum Alarmierungsstichwort anzeigen'},
  showInfoVehiclesInListe: {valDef: true,  text: 'gemäß Alarmierungsstichwort zu alarmierende Fahrzeuge anzeigen'},
  alignInfoKlasseToRight : {valDef: true,  text: 'Einsatzart/Fahrzeuge rechtsbündig ausrichten'},
  highlightOrder         : {valDef: true,  text: 'Eigenen Einsatzauftrag hervorheben'},
  highlightOrderColor    : {valDef: 'green', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe des eigenen Einsatzauftrags'},
  highlightOrderBlink    : {valDef: true,  text: 'Blinkender Text beim eigenen Einsatzauftrag'},
  highlightVBOrder       : {valDef: true,  text: 'Verbandseinsatzaufträge hervorheben'},
  highlightVBOrderColor  : {valDef: 'blue', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der Verbandseinsatzaufträge'},
}},
'eInfo':
  {text: 'Einsatzanzeige',
   opt:
{ addWikiLink               : {valDef: true,  text: 'Einsatzmeldung mit Wiki-Link versehen'},
  moveSequenceInStation     : {valDef: 'normal',  type: OptType.list,  text: 'Abmarsch von gleicher Wache',
                               list: {'normal':'wie verfügbar', 'trupp':'Truppfahrzeuge zuerst', 'special':'Trupp-/Sonderfahrzeuge zuerst'}},
  markWhenAllianceCall      : {valDef: true,  text: 'Alarmierungsvorschlag bei Verbandsauftrag direkt markieren'},
  dispStw                   : {valDef: true,  text: 'Alarmierungsstichwort anzeigen'},
  dispStwText               : {valDef: true,  text: 'Langtext zum Alarmierungsstichwort anzeigen'},
  dispStwCallList           : {valDef: true,  text: 'Fahrzeuge gemäß Alarmierungsstichwort anzeigen'},
  dispCallList              : {valDef: true,  text: 'zu alarmierende Fahrzeuge anzeigen'},
  dispCallReqColour         : {valDef: 'red', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der benötigten Fahrzeuge'},
  dispCallSecColour         : {valDef: 'maroon', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der Fahrzeuge für zweiten Abmarsch'},
  dispCallOptColour         : {valDef: 'peru', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der optionalen Fahrzeuge'},
  dispStormInfoColour       : {valDef: 'darkred', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für Unwetterhinweis'},
  dispTime                  : {valDef: true,  text: 'Fahrzeiten anzeigen',},
  dispUnavailable           : {valDef: true,  text: 'nicht verfügbare Fahrzeuge anzeigen'},
  dispUnavailColour         : {valDef: 'darkorange', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe der nicht verfügbaren Fahrzeuge'},
  dispStatus                : {valDef: true,  text: 'Statusliste der Fahrzeuge anzeigen'},
  dispStatus6               : {valDef: false, text: 'Fahrzeuge im Status 6 anzeigen'},
  dispStatusDemand          : {valDef: true,  text: 'Nachgeforderte Fahrzeuge anzeigen'},
  dispStatusDemandNotAtScene: {valDef: true,  text: 'Nachgeforderte Fahrzeuge nur anzeigen, wenn nicht an Einsatzstelle'},
  callSurplusRTW            : {valDef: false, text: 'einen RTW mehr alarmieren, als von Verletztenzahl notwendig (mögliche Nachalarmierung)'},
  limitRTWcall              : {valDef: false, text: 'RTW Alarmierung zeitlich begrenzen'},
  limitRTWcallMin           : {valDef: 15,    type: OptType.integer, length: 3, valChkFunc: chkFunc.limTime, text: 'RTW bis maximal x Min. vorschlagen'},
  addLocationDescription    : {valDef: true,  text: 'textliche Lageangabe hinter Positionsangabe anhängen'},
  highlightCityExtension    : {valDef: true,  text: 'Einsatzposition in Stadterweiterung als Positionsangabe farblich hervorheben'},
  highlightCityExtColour    : {valDef: 'green', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für Positionsangabe'},
  highlightVehicleRequest   : {valDef: true,  text: 'Fahrzeugnachforderung in Rückmeldungen farblich hervorheben'},
  highlightVehReqColour     : {valDef: 'darkorange', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für Nachforderungen'},
  calledLineColour          : {valDef: 'darkgreen', type: OptType.colList, list: ColorLst, text: 'Farbe für Alarmfahrzeugzeile'},
  optionalLineColour        : {valDef: 'blue', type: OptType.colList, list: ColorLst, text: 'Farbe für opt. Fahrzeugzeile'},
  useDottedLine4FasterVeh   : {valDef: true,  text: 'Umrande schnellere Fahrzeuge mit gestrichelter Linie'},
  fasterVehicleColour       : {valDef: 'maroon', type: OptType.colList, list: ColorLst, text: 'Markierfarbe für langsameres Fahrzeug auf Anfahrt'},
  replacementVehicleColour  : {valDef: 'green', type: OptType.colList, list: ColorLst, text: 'Markierfarbe für schnelleres, verfügbares Fahrzeug'},
  dispStatusAsFMSDisplayEL  : {valDef: true,  text: 'Status als FMS-Gerät anzeigen'},
  dispFMSDisplayLinesEL     : {valDef: '1',   type: OptType.list, list: FMSlineArr, text: 'Zeilenanzahl der Statusgeberknöpfe'},
  reduceInVehRespListsOfVGSL: {valDef: '&NONE&', type: OptType.list,  text: 'VGSL: Fahrzeuglisten ausgerückter Fahrzeuge einklappen',
                               list: {'&OFF&':'kein Einklappen', '&ALL&':'zu Anfang alle Fahrzeuge anzeigen', '&NONE&':'zu Anfang keine Fahrzeuge anzeigen'}},
}},
'pList':
  {text: 'Personalliste',
   opt:
{ defaultTabSort         : {valDef: 'none', type: OptType.list, text: 'Standard-Sortierung',
                            list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  useMotivationColourCode: {valDef: true,  text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCode   : {valDef: true,  text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCode  : {valDef: true,  text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCode     : {valDef: true,  text: 'Schicht farblich hervorheben'},
  useStatusColourCode    : {valDef: true,  text: 'Status farblich hervorheben'},
}},
'school':
  {text: 'Schule',
   opt:
{ defaultTabSortSchool       : {valDef: 'none', type: OptType.list, text: 'Standard-Sortierung',
                                list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  removesNonSelectablesSchool: {valDef: true,  text: 'Nicht wählbare Mannschaft ausblenden'},
  useMotivColourCodeSchool   : {valDef: true,  text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCodeSchool : {valDef: true,  text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCodeSchool: {valDef: true,  text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCodeSchool   : {valDef: true,  text: 'Schicht farblich hervorheben'},
}},
'training':
  {text: 'Übungsgelände',
   opt:
{ defaultTabSortTraining       : {valDef: 'none', type: OptType.list, text: 'Standard-Sortierung',
                                list: {'none': "(unsortiert)", "Name": "Name", "Motivation": "Motivation", "Fähigkeiten": "Fähigkeiten", "Alter": "Alter", "Ausbildung": "Ausbildung", "Status": "Status", "Schicht": "Schicht"}},
  removesNonSelectablesTraining: {valDef: true,  text: 'Nicht wählbare Mannschaft ausblenden'},
  useMotivColourCodeTraining   : {valDef: true,  text: 'Motivationswerte farblich hervorheben'},
  useAbilityColourCodeTraining : {valDef: true,  text: 'Fähigkeitsswerte farblich hervorheben'},
  useTrainingColourCodeTraining: {valDef: true,  text: 'erhaltene Ausbildungen farblich hervorheben'},
  useShiftColourCodeTraining   : {valDef: true,  text: 'Schicht farblich hervorheben'},
}},
'fList':
  {text: 'Fahrzeugliste',
   opt:
{ showSummaryVehicleList  : {valDef: true,  text: 'Fahrzeugliste am Kopf der Seite zeigen (zusätzlich)'},
  showStatus7OnlyIfExists : {valDef: true,  text: 'Status 7 nur anzeigen, wenn nötig'},
  showStatusLangtext      : {valDef: true,  text: 'Text zum Status anzeigen'},
  showTotalkm             : {valDef: true,  text: 'Anzeige der gesamten km-Leistung je Fahrzeugtyp'},
  showAvgkm               : {valDef: true,  text: 'Anzeige der durchschnittlichen km-Leistung je Fahrzeugtyp'},
  showAvgDamage           : {valDef: true,  text: 'Anzeige des durchschnittlichen Schadens je Fahrzeugtyp'},
  showDamageList          : {valDef: true,  text: 'Zusammenfassung der beschädigten Fahrzeuge anzeigen'},
  limitDamage             : {valDef: true,  text: 'Anzeige beschädigter Fahrzeuge einschränken'},
  limitDamageTo           : {valDef: 100,   type: OptType.integer,  length:  3, valChkFunc: chkFunc.limDmg, text: 'Nur beschädigte Fahrzeuge mit weniger als x% anzeigen:'},
  showDamagedAtFirstCall  : {valDef: false, text: 'zu reparierende Fahrzeuge direkt aufklappen'},
  listHighLowKm           : {valDef: true,  text: 'Anzeige der höchste/niedrigste km-Leistungen'},
  dispStatusAsFMSDisplayFL: {valDef: true,  text: 'Status als FMS-Gerät anzeigen'},
  dispFMSDisplayLinesFL   : {valDef: '3',   type: OptType.list, list: FMSlineArr, text: 'Zeilenanzahl der Statusgeberknöpfe'},
}},
'fInfo':
  {text: 'Fahrzeuganzeige',
   opt:
{ dispStatusAsFMSDisplayFI: {valDef: true,  text: 'Status als FMS-Gerät anzeigen'},
  dispFMSDisplayLinesFI   : {valDef: '3',   type: OptType.list, list: FMSlineArr, text: 'Zeilenanzahl der Statusgeberknöpfe'},
}},
'wList':
  {text: 'Wachenliste',
   opt:
{ useOriginalVhcColorScheme: {valDef: false, text: 'Farbgestaltung für Fahrzeugbedarf im Original benutzen'},
  imgStationList           : {valDef: 'normal', type: OptType.radio,  text: 'Graphiken in Liste',
                              list: {'normal':'normale Graphik', 'small':'kleine Graphik', 'none':'Graphik nicht anzeigen'}},
  highlightManning         : {valDef: true,  text: 'prozentuale Sollstärke hervorheben'},
}},
'gList':
  {text: 'Gebäudeliste',
   opt:
{ imgBuildingList: {valDef: 'normal', type: OptType.radio,  text: 'Graphiken in Liste',
                    list: {'normal':'normale Graphik', 'small':'kleine Graphik', 'none':'Graphik nicht anzeigen'}},
}},
'lList':
  {text: 'Log',
   opt:
{ summarizeLog  : {valDef: true,  text: 'Zusammenfassung des Logs erstellen'},
  logColCallTCol: {valDef: 'white', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für Notrufe'},
  logColCallBCol: {valDef: 'red',   type: OptType.colList, list: ColorLst, text: 'Hintergrundfarbe für Notrufe'},
  logColFehlTCol: {valDef: 'black', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für Fehleinsätze'},
  logColFehlBCol: {valDef: 'yellow',type: OptType.colList, list: ColorLst, text: 'Hintergrundfarbe für Fehleinsätze'},
  logColDoneTCol: {valDef: 'darkgreen',type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für abgearbeitete Einsätze'},
  logColDoneBCol: {valDef: 'white', type: OptType.colList, list: ColorLst, text: 'Hintergrundfarbe für abgearbeitete Einsätze'},
  logColJobTCol : {valDef: 'green', type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für neu eingestellte Mannschaft'},
  logColJobBCol : {valDef: 'lightblue', type: OptType.colList, list: ColorLst, text: 'Hintergrundfarbe für neu eingestellte Mannschaft'},
  logColQuitTCol: {valDef: 'red',   type: OptType.colList, list: ColorLst, text: 'Schriftfarbe für gekündigte Mannschaft'},
  logColQuitBCol: {valDef: 'lightblue', type: OptType.colList, list: ColorLst, text: 'Hintergrundfarbe für gekündigte Mannschaft'},
}}
}
try
{ errLog.refresh();
  conf.init({opt: OptionLst,
     fhz: FahrzeugeLst,
     grp: FhzGruppeLst});
  main = new mainCls(conf);
  main.init();
  // console(conf.write());
}
catch(e)
{ errLog.addVarMsg('Initialising script', e);
  setMsg(errLog);
  errLog.refresh();
}

//try
{ errLog.refresh();
  main.main();
}
/* catch(e)
{ errLog.addVarMsg('running main function', e);
  setMsg(errLog);
  errLog.refresh();
}
 */
function setMsg(iNode, iType)
{ var type = '';
  var msgTitle = '';
  if(iType)
  { type = iType;
  }

  if (typeof(iNode) === 'string')
  { if(!type)
    { type = 'form_info';
    }
    var nodeDiv = new Element('div', {'class': type});
    nodeDiv.appendChild(createText(iNode));
    iNode = nodeDiv;
  }
  else if (objType(iNode) == 'logCls')
  { if (!type)
    { switch(iNode.getType())
      { case 'E':
          type = 'form_error';
          msgTitle = 'Fehler im Script:';
          break;
        case 'S':
          type = 'form_success';
          msgTitle = 'Erfolg:';
        default:
          type = 'form_info';
          msgTitle = 'Information:';
          break;
      }
    }
    else
    { type = 'form_error';
      msgTitle = 'Fehler im Script:';
    }
    var nodeDiv = new Element('div', {'class': type});
    if (msgTitle)
    { nodeDiv.appendChild(createText(msgTitle));
      nodeDiv.appendChild(new Element('br'));
    }
    for each (msg in iNode.getMsgs())
    { nodeDiv.appendChild(createText(msg));
      nodeDiv.appendChild(new Element('br'));
    }
    if (iNode.getType() == 'E')
    { iNode.display();// auf der Konsole ausgeben
    }
    iNode = nodeDiv;
  }

  if (!msgArea)
  { msgArea = new Element('div', {'style': 'color: white;',
                                  'id'   : 'msgArea'});
    $('container').insertBefore(msgArea, $('content'));
  }
  else
  { removeChildren(msgArea);
  }

  msgArea.appendChild(iNode);
}

// Laufzeitdaten
function mainCls(iConf)
{
  this.user = '';
  this.hasUpdate = getValue(GMVAL_PREF_SYS + 'hasUpdate', false);
  this.updVersion = getValue(GMVAL_PREF_SYS + 'updVersion', '');
  this.meta = {};
  var cnf = iConf;
  var checkInterval = 10*60; // einmal alle 10 Minuten [s]

  this.getClass = function()
  { return 'mainCls';
  }

  this.init = function()
  { var userNode = xPath.getSingle("//li/ul/li/a[contains(text(), 'Benutzer:')]", 'root');
    if (userNode) { this.user = userNode.innerHTML.trim().replace('Benutzer: ', ''); }

    this.checkUpdate();
  }

  this.checkUpdate = function()
  {
    var date = new Date;

    if (checkLastUpd(date) && !this.hasUpdate)
    { GM_xmlhttpRequest
      ( { method: 'GET',
          url: METAURL,
          headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
          onload:
            function(resp)
            { console('Checking for updates: responce status= '+resp.status);if (resp.status == 200)
              { this.meta = parseHeaders(resp.responseText);
                this.updVersion = this.meta.version;
                this.hasUpdate = (this.updVersion != getValue(GMVAL_PREF_SYS + 'version',''));

                setValue(GMVAL_PREF_SYS + 'hasUpdate', this.hasUpdate);
                setValue(GMVAL_PREF_SYS + 'updVersion', this.updVersion);
                setValue(GMVAL_PREF_SYS + 'description', this.meta.description);
                setUpdMsg(this.hasUpdate, this.updVersion);
              }
              else
              { setMsg('Kein Update möglich: Suche nach Versionsdaten auf userscript.org liefert Status "'+resp.status+'"', 'form_error');
                return;
              }
            }
        }
      )
      setValue(GMVAL_PREF_SYS + 'lastUpdate', date.toString());
    }
  }

  function checkLastUpd(iDate)
  { var lastUpd = getValue(GMVAL_PREF_SYS + 'lastUpdate', undefined);
    var date = new Date;
    if (!lastUpd)
    { return true; }
    else if (lastUpd.length == 8) // alte Datumsangabe
    { [,yearStr,monthStr,dayStr] = lastUpd.match(/(\d{4})(\d{2})(\d{2})/);
      date = new Date(parseInt(yearStr.replace(/^0*/,'')), parseInt(monthStr.replace(/^0*/,''))-1, parseInt(dayStr.replace(/^0*/,'')));
    }
    else
    { [,dStr] = lastUpd.match(/^\w{3}\s(.*)\s\w{3}\+\d{4}/); //Timezone entfernen
      date = new Date(dStr);
    }
    return (checkInterval < (Math.round(iDate.getTime()/1000) - Math.round(date.getTime()/1000)));
  }

  function parseHeaders(iMeta)
  { var headers = {};
    var line, name, prefix, header, key, value;

    for each (line in iMeta.split(/\n/))
    { delete name, value;
      try
      { [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
      }
      catch (e)
      { continue;
      }

      switch (name)
      { case "licence":
          name = "license";
          break;
      }

      [key, prefix] = name.split(/:/).reverse();

      if (prefix)
      { if (!headers[prefix])
        { headers[prefix] = new Object;
        }
        header = headers[prefix];
      }
      else
      { header = headers;
      }

      if (header[key] && !(header[key] instanceof Array))
      { header[key] = new Array(header[key]);
      }

      if (header[key] instanceof Array)
      { header[key].push(value);
      }
      else
      { header[key] = value;
      }
    }

    headers["licence"] = headers["license"];

    return headers;
  }

  function setUpdMsg(hasUpd, updVers)
  { if (hasUpd && (!$('divUpdateInfo')))
    { var nodeDiv = new Element('div', {'id'   : 'divUpdateInfo',
                                        'class': 'form_info'});

      nodeDiv.appendChild(new Element('b').appendChild(createText('Script-Update verfügbar (' + updVers + '): ')));
      var nodeA = new Element('a', {'href'  : UPDATEURL,
                                    'target': '_blank'});
      nodeA.appendChild(createText('Informationen'));
      nodeDiv.appendChild(nodeA);

      nodeDiv.appendChild(createText(' dazu oder direkt '));
      nodeA = new Element('a',
                          {'href'  : INSTALLURL,
                           'id'    : 'installURL',
                           'target': '_blank'});
      nodeA.appendChild(createText('installieren'));
      nodeDiv.appendChild(nodeA);
			
			if (getValue(GMVAL_PREF_SYS + 'description', undefined))
			{ nodeDiv.appendChild(new Element('br'));
			  nodeDiv.appendChild(createText('Beschreibung: '+getValue(GMVAL_PREF_SYS + 'description')));
			}

      setMsg(nodeDiv);
      // EventListener für anklicken des Install-Links
      $("installURL").addEventListener (
        "click" ,
        function(){ setValue(GMVAL_PREF_SYS + 'version',updVers); updVers=''; setValue(GMVAL_PREF_SYS + 'hasUpdate', false); } ,
        true )
    }
  }

  this.main = function()
  {
    setUpdMsg(this.hasUpdate, this.updVersion);

  }
}