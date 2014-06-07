// ==UserScript==
// @name DS TroopSums
// @description Version 0.0.7 Gesamtsummen der Truppen ermitteln und als Fusszeile anzeigen
// @author The Real Otto
// @namespace http://hypix.de/
// @include http://de*.die-staemme.de/game.php*
// ==/UserScript==

// Versionhistory:
// 0.0.1 erster Entwurf, abgekupfert von DS ResTrade von Hypix
// 0.0.2 doTroopSums() groesstenteils neu
// 0.0.3 Kompatibel mit verschiedenen Server-Konfigurationen (keine Bogis etc.)
// 0.0.4 Summen im Rekrutieren-Screen (Uebersicht)
// 0.0.5 Summen in ALLEN Rekrutieren-Screens (Uebersicht, Kaserne, Stall, Werkstatt)
// 0.0.6 Truppen summieren auch in "Alle"; kleine Optimierungen & Schoenheitskorrekturen
// 0.0.7 Bugfix: Html-Code wurde angehängt statt neu erzeugt (Redundante Anzeige gleicher Summen)

// Skript erzeugt Summen-Fusszeile in..:
// -------------------------------------
// Uebersichten - Kombiniert
// Uebersichten - Truppen - Alle (0.0.6)
// Uebersichten - Truppen - Eigene
// Uebersichten - Truppen - Im Dorf
// Uebersichten - Truppen - AuswÃ¤rts
// Uebersichten - Truppen - Unterwegs
// Uebersichten - Befehle
// Rekrutieren - alle 3 Rekrutierungs-Tabellen (Kaserne, Stall, Werkstatt) (0.0.4)
// Rekrutieren - Einheitenuebersicht: Summe nach Rekrutierung mit Datum & Zeit (0.0.4)
// Kaserne - Rekrutierungstabelle & Einheitenuebersicht
// Stall - Rekrutierungstabelle & Einheitenuebersicht
// Werkstatt - Rekrutierungstabelle & Einheitenuebersicht

(function(){
var version = "0.0.7";
var params = parseParams(location.href);
//var server = document.location.host.split('.')[0];

var units = [
  'Speertr\u00E4ger',
  'Schwertk\u00E4mpfer',
  'Axtk\u00E4mpfer',
  'Bogensch\u00FCtze',
  'Sp\u00E4her',
  'Leichte Kavallerie',
  'Berittener Bogensch\u00FCtze',
  'Schwere Kavallerie',
  'Rammbock',
  'Katapult',
  'Paladin',
  'Adelsgeschlecht'
];

var unitsPlural = [
  'Speertr\u00E4ger',
  'Schwertk\u00E4mpfer',
  'Axtk\u00E4mpfer',
  'Bogensch\u00FCtzen',
  'Sp\u00E4her',
  'Leichte Kavallerie',
  'Berittene Bogensch\u00FCtzen',
  'Schwere Kavallerie',
  'Rammb\u00F6cke',
  'Katapulte',
  'Paladine',
  'Adelsgeschlechter'
];

var unitIcon = [
  "graphic/unit/unit_spear.png?1",
  "graphic/unit/unit_sword.png?1",
  "graphic/unit/unit_axe.png?1",
  "graphic/unit/unit_archer.png?1",
  "graphic/unit/unit_spy.png?1",
  "graphic/unit/unit_light.png?1",
  "graphic/unit/unit_marcher.png?1",
  "graphic/unit/unit_heavy.png?1",
  "graphic/unit/unit_ram.png?1",
  "graphic/unit/unit_catapult.png?1",
  "graphic/unit/unit_knight.png?1",
  "graphic/unit/unit_snob.png?1" 
];

var sum = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]; // Summen der Einheiten
var tmp = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]; // Summen der Einheiten
var unitsDateTime = ["", "", "", "", "", "", "", "", "", "", "", "" ]; // Rekrutierung bis
var columns = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ]; // Spalten gefundener Einheiten

switch( params.screen )
{
  case "overview_villages":
    TroopSumsOverviews();
    break;
  case "train":
  case "barracks":
  case "stable":
  case "garage":
    TroopSumsTrain();
  default:
    break;
}

function TroopSumsTrain()
{
  var tab, headersArray, Zahl, x, y, unit_regexp, Now, Total;
  
  if(params.mode) return; // Massenrekrutierung
  
  tab = document.getElementsByTagName("Table");
  
  for(var i = 0; i < tab.length; i++) {
    if(tab[i].className == "vis") {
     headersArray = tab[i].getElementsByTagName("th");
      for (var j = 0; j < headersArray.length; j++) {
        var html = '<tr style="white-space: nowrap;"></tr><tr style="white-space: nowrap;">';
        if(headersArray[j].innerHTML.search("Ausbildung")!=-1) {
          for(var k = 1; k < tab[i].rows.length; k++) {
            Zahl = parseInt(tab[i].rows[k].cells[0].innerHTML);
            for(var l = 0; l < units.length; l++) {
              unit_regexp = '(\\d+)\\s';
              x=new RegExp(unit_regexp + units[l]);
              y=x.exec(tab[i].rows[k].cells[0].innerHTML);
              if(y==null) {
                x=new RegExp(unit_regexp + unitsPlural[l]);
                y=x.exec(tab[i].rows[k].cells[0].innerHTML);
              }
              if(y!=null) {
                //alert(units[l]+" ("+Zahl+") in tab["+i+"].rows["+k+"]");
                tmp[l]+=Zahl;
                sum[l]+=Zahl;
                unitsDateTime[l] = tab[i].rows[k].cells[2].innerHTML;
              }
            }
          }
          html += '<th style="text-align:left;" colspan="1">Gesamt:</th>';
          html += '<th style="text-align:left;" colspan="'+(headersArray.length-1)+'">';
          for(var k = 0; k < units.length; k++) {
            if(tmp[k] > 0) {
              html+=formatNumber(tmp[k], true, true)+' <img src="'+unitIcon[k]+'" alt="'+units[k][0]+'"/> ';
              tmp[k] = 0;
            }
          }
          html+='</th></tr>';
          //alert(html);
          tab[i].innerHTML += html;
        } else if(headersArray[j].innerHTML.search("Im Dorf/Insgesamt")!=-1) {
          headersArray[j].innerHTML="Im Dorf/Insgesamt (Insg. + Rek.)";
          for(var l = 0; l < units.length; l++) {
            for(var k = 1; k < tab[i].rows.length; k++) {
              if(tab[i].rows[k].cells[0].innerHTML.search(units[l])!=-1) {
                if(sum[l] > 0) {
                  Now = tab[i].rows[k].cells[j+3].innerHTML.split('/',2);
                  if(Now[1]) {
                    Total=sum[l]+parseInt(Now[1]);
                    tab[i].rows[k].cells[j+3].innerHTML+=" ("+unitsDateTime[l]+": "+Total+")";
                  }
                }
                break;
              }
            }
          }
        }
      }
    }
  }
}

function TroopSumsOverviews()
{
  var tab;
  var firstColumn = -1;
  var countColumns = 0;
  var headersArray;
  var begin = 0;
  var max = units.length;
  var Teiler = 1;
  var Text1=[" Dorf", " Dörfer"];
  var html = '<tr style="white-space: nowrap;"></tr><tr style="white-space: nowrap;">';
  
  
  if(params.type=="support_detail" || params.type=="away_detail") return;
  if(!params.type && params.mode!="units" && params.mode!="commands" && params.mode!="combined") return;
  tab = document.getElementById("units_table");
  if(!tab) tab = document.getElementById("commands_table");
  if(!tab) tab = document.getElementById("combined_table");
  if(!tab) return;  
  
  headersArray = tab.getElementsByTagName("th");
  
  for(var a = 0; a < units.length; a++) {
    for(var i = begin; i < headersArray.length; i++) {
      if(headersArray[i].innerHTML.search(units[a])!=-1) {
        if(columns[a] == -1) {
          if(firstColumn == -1) firstColumn = i;
          if(params.mode=="combined" || params.mode=="commands") columns[a] = i;
          else if(params.mode=="units") columns[a] = i-1;      
          countColumns++;
          begin = i+1;
          break;
        }
      }
    }
  }
  
  if(params.mode == "combined") max-=1;
  
  for(var i = 1; i < tab.rows.length; i++ ) {
    if(tab.rows[i].className != "units_there") {
      if(tab.rows[i].cells.length > countColumns) {
        for(var j = 0; j < columns.length; j++) {
          if(columns[j] != -1) {
            if(isNaN(parseInt(tab.rows[i].cells[columns[j]].innerHTML))) {
              var offset=tab.rows[i].cells[columns[j]].innerHTML.search(">")+1;
              sum[j]+=parseInt(tab.rows[i].cells[columns[j]].innerHTML[offset]);
            } else {
              sum[j]+=parseInt(tab.rows[i].cells[columns[j]].innerHTML);
            }
          }      
        }
      }
    }
  }
  
  if(params.mode=="commands") {
    Text1=[" Befehl", " Befehle"];
  } else if(params.mode=="units") {
    if(params.type && params.type != "complete") {
      Teiler=2;
    } else {
      Teiler=5;
    }
  }
  
  html+='<th style="text-align:left;" colspan="1">'+formatNumber((tab.rows.length-1)/Teiler, true, true);
  if((tab.rows.length-1)/Teiler==1) {
    html+=Text1[0];
  } else {
    html+=Text1[1];
  }
  html+='</th><th style="text-align:right;" colspan="'+(firstColumn-1)+'">Summe:</th>';
  for(var j = 0; j < columns.length; j++) {
    if(columns[j] != -1) {
      html += '<th style="text-align:right; padding-left: 5px; padding-right: 5px;">'+formatNumber(sum[j], true, true);
      html +='</th>';
    }
  }
  html += '</tr>';
  tab.innerHTML += html;
}

function formatNumber(nr, dotted, greyspan)
{
  var ret = nr;
  if( nr == 0 )
    ret = "0";
  else if( nr > 999999 )
  {
    var tmp = Math.round(nr / 10000);
    var tmp2 = tmp % 100;
    ret = formatNumber( parseInt(tmp / 100) ) + (greyspan ? '<span class="grey">,</span>' : ',') + (tmp2 < 10?'0':'') + tmp2 + ' Mio.';
  }
  else if( dotted )
  {
    ret = "";
    do
    {
      var tmp = "00" + nr%1000;
      ret = tmp.substr(tmp.length-3,3) + (greyspan ? '<span class="grey">.</span>' : ".") + ret;
      nr = Math.floor(nr/1000);
    } while( nr > 0 );
    ret = ret.replace(/^0*/g,"");
    if( greyspan )
      ret = ret.replace(/\<span class="grey">\.<\/span>$/g,"");
    else
      ret = ret.replace(/\.$/g,"");
  }
  return ret;
}

function parseParams(url)
{
  url = url.substring(url.indexOf("?")+1);
  url = url.replace( /&amp;/g, "&" );
  url = url.split("&");
  var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; }, };
  for( var i = 0; i < url.length; i++ )
  {
    var param = url[i].split("=");
    params[param[0]] = param[1];
  }
  return params;
}

})();