// version 0.8
// 2007/09/18

// ==UserScript==
// @name           OGame - Calculo de cargas necesarios
// @namespace      http://userscripts.org/scripts/show/8329
// @description    Calcula los cargas necesarios para llevar recursos a un planeta. 
// @include        http://*ogame*/*
// ==/UserScript==

// constantes de contrucciones
const cMinaMetal          = "Mina de metal";
const br                  = "<br>";
const sp                  = "&nbsp;";
const cRequiereComandante = "<span class=\"noresources\">"
const cBarraB             = "</b>";
const cBarraSpan          = "</span>";

var sMetalName;
var sCristName;
var sDeutName;

var strHTML;
var strTemp;
var bComandante;
var iReqM;
var iReqC;
var iReqD;
var iReqTotal;
var iDispM;
var iDispC;
var iDispD;
//var regexCom   = '<a style="cursor: pointer" title="\-\b(\d{1,3}\.)?(\d{3,3}\.){0,2}\d{1,3}\b"><span class="noresources">';
var regexCom1  = /<span [^>]*>/g;
var regexCom2  = /<a [^>]*>/g;
var regexCom3  = /<\/span><\/a>/g;
var regexCom4  = /<font[^>]*>/g;


function LZ(x) {return(x<0||x>9?"":"0")+x};

function addDots(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}

function locate(xpath, xpres) {
  return document.evaluate(xpath, document, null, xpres, null);
}

function locateFirst(xpath) {
  // gracias SpitFire: http://userscripts.org/scripts/show/8555
  return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

function get_from_to(strLine, begin, end) {
  var strTemp;
  
  strTemp = strLine.substring(strLine.indexOf(begin) + begin.length, strLine.length);
  return strTemp.substring(0, strTemp.indexOf(end));
}

(function(){
  var table;
  
  // nombres de os recursos - multilanguaje
  table = document.getElementById('resources').childNodes[1].childNodes[2];
  for (i=0; i < table.childNodes.length; i++) {
    switch (i) {
      case 1: 
        //Metal
        sMetalName = table.childNodes[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
        break;
      case 3:
        //Cristal
        sCristName = table.childNodes[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
        break;
      case 5:
        //Deuterio
        sDeutName = table.childNodes[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
        break;
    };
  }
  
  //recursos actuales
  table = document.getElementById('resources').childNodes[1].childNodes[4];
  for (i=0; i < table.childNodes.length; i++) {
    switch (i) {
      case 1: 
        //Metal
        iDispM = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g,''));
        break;
      case 3:
        //Cristal
        iDispC = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g,''));
        break;
      case 5:
        //Deuterio
        iDispD = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g,''));
        break;
    };
  }
  
  if (location.href.search("building") != -1 ) {
    for (i=0; i < document.getElementsByTagName("td").length; i++) {
      
      //alert(iDispM + '-' + iDispC + '-' + iDispD);
      if (document.getElementsByTagName("td").item(i).className == "l"){
        strHTML = document.getElementsByTagName("td").item(i).innerHTML;

        //if (i == 53) alert(i + '$$' + strHTML);
        strHTML = strHTML.replace(regexCom1, '');
        strHTML = strHTML.replace(regexCom2, '<b>');
        strHTML = strHTML.replace(regexCom3, cBarraB);

        iReqM = parseInt(get_from_to(strHTML, cRequiereComandante, cBarraSpan).replace(/[.]/g,''));
        iReqM = parseInt(get_from_to(strHTML, sMetalName + ': <b>', cBarraB).replace(/[.]/g,''));
        iReqC = parseInt(get_from_to(strHTML, sCristName + ': <b>', cBarraB).replace(/[.]/g,''));
        iReqD = parseInt(get_from_to(strHTML, sDeutName + ': <b>', cBarraB).replace(/[.]/g,''));
        
        iReqTotal = 0;
        strTemp = "";
        if (!(isNaN(iReqM))) {
          if (iReqM < iDispM) {
            strTemp = strTemp + sMetalName + ": <b>0</b>" + sp;
          } else {
            iReqTotal += iReqM - iDispM;
            strTemp = strTemp + sMetalName + ": <b>" + addDots(iReqM - iDispM) + "</b>" + sp;
          };
        };
        if (!(isNaN(iReqC))) {
          if (iReqC < iDispC) {
            strTemp = strTemp + sCristName + ": <b>0</b>" + sp;
          } else {
            strTemp = strTemp + sCristName + ": <b>" + addDots(iReqC - iDispC) + "</b>" + sp;
            iReqTotal += iReqC - iDispC;
          };
        };
        if (!(isNaN(iReqD))) {
          //alert(iReqD + "-" + iDispD);
          if (iReqD < iDispD) {
            strTemp = strTemp + sDeutName + ": <b>0</b>" + sp;
          } else {
            strTemp = strTemp + sDeutName + ": <b>" + addDots(iReqD - iDispD) + "</b>" + sp;
            iReqTotal += iReqD - iDispD;
          };
        };
        if (iReqTotal != 0) {
          strTemp = strTemp + br + 
            "Cargas Grandes: <b>" + Math.ceil(iReqTotal / 25000) + "</b>"+ sp + sp + 
            "Pequeñas: <b>" + Math.ceil(iReqTotal / 25000 * 5) + "</b>";
        }; 
        if (strTemp.length != 0) {
          strTemp = 
            document.getElementsByTagName("td").item(i).innerHTML + 
            br +
            "Falta: " + strTemp;
          strTemp = strTemp.replace(/<br><br>/g, br);
          document.getElementsByTagName("td").item(i).innerHTML = strTemp;
        }
      }
    }
  } else if (location.href.search("flotten1") != -1) {
  
    var iDispT = iDispM + iDispC + iDispD;
    var infoRow = locateFirst('//div[@id="content"]/center/center/form/table[last()]').getElementsByTagName('tr');
    
    infoRow = infoRow[infoRow.length-1].firstChild;
    infoRow.innerHTML =
      '<a title="Cargas grandes necesarias para transportar todos los recursos">' + 
      'Cargas grandes: ' + Math.ceil(iDispT/25000) + '</a>' + '&nbsp;&nbsp;&nbsp;' + 
      '<a title="Cargas chicas necesarias para transportar todos los recursos">' + 
      'Cargas chicas: ' + Math.ceil(iDispT/5000) + '</a>';
  };    
})();