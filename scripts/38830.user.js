// PopmundoGM user script
// version 3.9
// 2009-01-01
// Copyright (c) 2009
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "PopmundoGM", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           PopmundoGM
// @namespace      http://PopmundoGM.somee.com
// @description    Features for popmundo
// @include        http://www*.popmundo.com/common/*
// @include        http://www*.popmundo.com/Common/*
// @version        3.9
// ==/UserScript==

var version = 3.9;
var URLMYSKILL    = 'CharacterDetails.asp?action=MySkills';
var URLMYSKILL2   = 'CharacterDetails.asp?action=SelectSkill';
var URLCITY       = 'City.asp?action=view';
var URLPOPULARITY = 'Artist.asp?action=Popularity';
var URLEQUIPMENT1 = 'TourSettings.asp?action=Equipment';
var URLEQUIPMENT2 = 'TourSettings.asp?action=TransferEquipment';
var URLEQUIPMENT3 = 'TourSettings.asp?action=PickUpEquipment';
var URLALBUM      = 'CharacterDetails.asp?action=Photos';
var URLSTOCK      = 'Company.asp?action=ManageProducts';
var URLCONCERTO   = 'PerformanceDetails.asp';
var URLCONCERTO_NO= 'ReadPerformance';
var URLXML        = 'http://spreadsheets.google.com/pub?key=pn5cnYCMmTjaDJKrAIhY9Tg&output=csv&gid=0';
var URLPG         = 'CharacterDetails.asp?action=view';
var URLAUTOSTRADA = 'Locale.asp?action=ViewCharacters';
var URLPAPA       = 'Charts.asp?action=PaparazziList';
var URLMYITEMS    = 'CHARACTERDETAILS.ASP?ACTION=VIEWITEMS';
var URLREPERTOIRE = 'action=ViewRepertoire';
var UPD_CHECK_URL = 'http://userscripts.org/scripts/review/38830?format=txt';
var LAST_SCRIPT_URL = 'http://userscripts.org/scripts/show/38830?versioncheck=';
var VERSION_CHECKED = 'update.checked';
var TIMEDIFF = 172800; // 60*60*24*2 = 2 giorni

// Checks for updated script on Userscripts website
function getOnlineRevision() {
  GM_xmlhttpRequest({
    method:'GET',
    url:UPD_CHECK_URL,
    onload: function(resp) {
      var text = resp.responseText;
      if (resp.status == 200) {
        var tmp = text.match( /.*version\s+?(\d+.?\d+)/i);
        if (tmp) {
          var online_ver = tmp[1];
          GM_log(online_ver);
          if (online_ver > version) {
            var duh = confirm('Lo script popomundoGM è stato cambiato.\n\nSi vuole aggiornarlo?')
            if (duh) {
              GM_openInTab(LAST_SCRIPT_URL);
            }
          }
          var checktime = Math.round(new Date().getTime() / 1000);
          GM_log('checktime: ' + checktime)
          GM_setValue(VERSION_CHECKED, checktime);
        }
      }
    }
  });
}

if (location.href.indexOf(URLMYSKILL) > 0 || location.href.indexOf(URLMYSKILL2) > 0)
{
  var formElement;
  var formElements = document.getElementsByTagName("form");
  
  if(formElements[0])
  {
    formElement = formElements[0];
    var newdiv = document.createElement('div');
    newdiv.innerHTML = '<a href="javascript:void(0)" onclick=" ' +
    'var formElements = document.getElementsByTagName(\'form\'); ' +
    'if(formElements[0]){ ' +
    'formElement = formElements[0]; ' +
    'bElements = document.evaluate(\'//form//b//a\', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); ' +
    'for (var i = 0; i < bElements.snapshotLength; i++) {next = bElements.snapshotItem(i); next.style.display = \'none\';}' +
    'brElements = formElement.getElementsByTagName(\'br\'); ' +
    'divElements = formElement.getElementsByTagName(\'div\'); ' +
    'for (var i = 0; i < brElements.length; i++) { ' +
      'y=brElements[i].nextSibling; ' +
      ' while (y.nodeType!=1) {' +
      '  y=y.nextSibling;}' +
      ' if ( y.nodeName != \'TABLE\' ) {brElements[i].style.display = \'none\'; }}' +               
    'for (var j = 0; j < divElements.length; j++) { ' +
      'divElements[j].style.display = \'block\';' +
      'divElements[j].style.marginBottom = \'0px\'; divElements[j].style.marginTop = \'0px\'; ' + 
      '}mydiv = formElement.previousSibling; mydiv.style.display= \'none\';}return false;">' +
    '<font color=\'#333333\'><u>  Apri tutti</u></font></a><br/><br/>';
    formElement.parentNode.insertBefore(newdiv,formElement);
      
  }
}

if (location.href.indexOf(URLCITY) > 0)
{
  var menutable = document.evaluate("//table[@class='menu']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(menutable.snapshotLength > 0)
  {
    var mytable = menutable.snapshotItem(0);    
    var newtr = mytable.insertRow(mytable.rows.length - 1);
    
    var newtd = document.createElement('td');
    var str = " var menulink = document.evaluate(\'//a[contains(@onclick, \\\'SubMenu46\\\')]\', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); " +
          " var a = menulink.snapshotItem(0).onclick.toString(); " + 
          " a = a.substr(a.indexOf('SubMenu')+ 'SubMenu'.length); " +
          " var id = a.substr(0, a.indexOf(')')-1); " + 
          " var _div = document.getElementById('SubMenu' + id); " + 
          " var anElements = _div.getElementsByTagName('a'); " +
          " for (var i = 0; i<anElements.length; i++) { if (anElements[i].href.indexOf('Locale.asp?action=view&LocaleID') > 0) " +
          " window.open(anElements[i].href); } ";
            
    newtd.innerHTML = ' <a href="javascript:void(0)" onclick="' + str + ';return false;"> Apri Negozi dell\'usato</a>';
    newtr.appendChild(newtd);
  }
}

if (location.href.indexOf(URLPOPULARITY) > 0)
{
  var URLSITO = document.location.href.substr(0, document.location.href.lastIndexOf('/') + 1);
  var menutable = document.evaluate("//tr[@class='DarkColumnHL']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var tblEl = menutable.snapshotItem(0).parentNode;
  
  if(tblEl.rows.length > 1)
  {
  var comune1 = '';
  
  comune1 += ' var menutable = document.evaluate(\'//tr[@class=\\\'DarkColumnHL\\\']\', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);';
  comune1 += ' var tblEl = menutable.snapshotItem(0).parentNode;';
  comune1 += ' var minVal, minIdx, testVal, titolo;';
  comune1 += ' var L = tblEl.rows.length;';
  comune1 += ' if(L > 1){';
  comune1 += '  for(var i = 2; i < L -1; i++){';

  var part1 = '';
  
  part1 += '   minIdx = i;';
  part1 += '   titolo = tblEl.rows[i].cells[0].textContent;';
  part1 += '   minVal = titolo;';
  part1 += '   for (j = i + 1; j < L; j++) {';
  part1 += '     titolo = tblEl.rows[j].cells[0].textContent;testVal = titolo;';
  part1 += '     if (minVal.toString() > testVal.toString()) {';
  part1 += '         minIdx = j;minVal = testVal;}}';
  part1 += '    if (minIdx > i){ tmpEl = tblEl.removeChild(tblEl.rows[minIdx]); ';
  part1 += '       tblEl.insertBefore(tmpEl, tblEl.rows[i]);}}';
  
  var part2 = '';
  
  part2 += '    minIdx = i;';
  part2 += '    titolo = tblEl.rows[i].cells[1].firstChild.title;';
  part2 += '    minVal = titolo.substr(titolo.lastIndexOf(\'/\') - 1, 1);';
  part2 += '    for (j = i + 1; j < L; j++) {';
  part2 += '      titolo = tblEl.rows[j].cells[1].firstChild.title;';
  part2 += '     testVal = titolo.substr(titolo.lastIndexOf(\'/\') - 1, 1);';
  part2 += '     if (minVal < testVal) {';
  part2 += '       minIdx = j; minVal = testVal; }}';
  part2 += '     if (minIdx > i) { tmpEl = tblEl.removeChild(tblEl.rows[minIdx]);';
  part2 += '     tblEl.insertBefore(tmpEl, tblEl.rows[i]); }}';

  var part3 = '';
  
  part3 += '    minIdx = i;';
  part3 += '    titolo = tblEl.rows[i].cells[2].getElementsByTagName(\'img\')[1].title;';
  part3 += '    minVal = parseInt(titolo.replace(\'%\', \'\'));';
  part3 += '    for (j = i + 1; j < L; j++) {';
  part3 += '      titolo = tblEl.rows[j].cells[2].getElementsByTagName(\'img\')[1].title;';
  part3 += '     testVal = parseInt(titolo.replace(\'%\', \'\'));';
  part3 += '     if (minVal < testVal) {';
  part3 += '       minIdx = j; minVal = testVal; }}';
  part3 += '     if (minIdx > i) { tmpEl = tblEl.removeChild(tblEl.rows[minIdx]);';
  part3 += '     tblEl.insertBefore(tmpEl, tblEl.rows[i]); }}';

  var comune2 = '';
  comune2 += '  for(var i = 2; i < L; i++) { ';
  comune2 += '    if(i % 2) tblEl.rows[i].className =\'DarkColumnHL\'; else tblEl.rows[i].className =  \'\'; }}';
    
    tmpEl = tblEl.rows[1].cloneNode(true);
    tmpEl.className = tblEl.rows[0].className;
    if(tmpEl.cells.length == 3)
    {
      var stringa = '<img src="http://3d2f.com/i/download-mini.gif" style="cursor:pointer;" onclick="' + comune1 + part1 + comune2;
      stringa += ';return false;"/>';
      tmpEl.cells[0].innerHTML = stringa;
      
      stringa = '<img src="http://3d2f.com/i/download-mini.gif" style="cursor:pointer;" onclick="' + comune1 + part2 + comune2;
      stringa += ';return false;"/>';
      tmpEl.cells[1].innerHTML = stringa;
      
      stringa = '<img src="http://3d2f.com/i/download-mini.gif" style="cursor:pointer;" onclick="' + comune1 + part3 + comune2;
      stringa += ';return false;"/>';
      tmpEl.cells[2].innerHTML = stringa;
      tmpEl.cells[2].align = "Center";
    }
    
    tblEl.insertBefore(tmpEl, tblEl.rows[1]);
    
  }
}

if (location.href.indexOf(URLEQUIPMENT1) > 0 || location.href.indexOf(URLEQUIPMENT2) > 0  || location.href.indexOf(URLEQUIPMENT3) > 0)
{
  var URLSITO = document.location.href.substr(0, document.location.href.lastIndexOf('/') + 1);

  var myform = document.evaluate("//form[@name='Equipmentform']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  
  if(myform)
  {
    var mytable = myform.parentNode;
    
    if(mytable)
    {
      while (mytable.nodeName!='TABLE' && mytable.nodeName != 'HTML')
      {
        mytable=mytable.parentNode;
      }
      if(mytable.nodeName != 'HTML')
      {
        var mytables = mytable.getElementsByTagName('table');
        for(var i = 0; i < mytables.length; i++)
        {
          for (var j = 0; j < mytables[i].rows.length; j++)
          {
            if(j%2 == 0)
              mytables[i].rows[j].className = "DarkColumnHL";
            else
              mytables[i].rows[j].className = "";
          }
        }
      }
      var myimg = mytable.getElementsByTagName('img');
      for (var i = 0; i < myimg.length; i++)
      {
        if(myimg[i].title == '' && myimg[i].alt != '')
        myimg[i].title = myimg[i].alt;
      }
    }
  }
}


if (location.href.indexOf(URLALBUM) > 0)
{
  var menulink = document.evaluate('//a[contains(@href, \'DeleteAllPhotos\')]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(menulink.snapshotLength > 0)
  {
var foot = menulink.snapshotItem(0).parentNode;
var mydiv = foot.parentNode;  
var mytables = mydiv.getElementsByTagName('table');
    if(mytables.length > 0)
    {
      var myhd = mytables[0];
      var tdpers = myhd.rows[0].cells[0];
      var tdstat = myhd.rows[0].cells[2];
      var tdqual = myhd.rows[0].cells[3];
      
      var str = "var menulink = document.evaluate(\'//a[contains(@href, \\\'DeleteAllPhotos\\\')]\', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); ";
      str = str + "var foot = menulink.snapshotItem(0).parentNode;";
      str = str + "var mydiv = foot.parentNode;";     
      str = str + "var phdivs = mydiv.getElementsByTagName(\'div\'); ";
      str = str + "for (var i = 0; i<phdivs.length; i++){phdivs[i].style.display = \'block\';}";
      
      foot.innerHTML = '<a href="javascript:void(0)" onclick="' + str + '; return false;">' +
                       ' Apri Tutte le foto </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + foot.innerHTML;       
      
      var comune1 = "var menulink = document.evaluate(\'//a[contains(@href, \\\'DeleteAllPhotos\\\')]\', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);";
      comune1 += "var foot = menulink.snapshotItem(0).parentNode;";
      comune1 += "var mydiv = foot.parentNode;var myarray = mydiv.childNodes;var L = myarray.length;";
      comune1 += "if(L > 7){for(i = 3; i < L - 4; i += 4){minIdx = i;";

      var part1 = "testo = myarray[i].textContent.replace(/^\\\s+/,\'\').split(\'\\n\')[0];"; 
      part1 += "minVal = testo;";
      part1 += "for (j = i + 4; j < L - 4; j += 4) {";
      part1 += "testo = myarray[j].textContent.replace(/^\\\s+/,\'\').split(\'\\n\')[0];if(testo.length > 0){";
      part1 += " testVal = testo;";
      part1 += "if (minVal.toString() > testVal.toString()) {";
      part1 += "minIdx = j;minVal = testVal;}}}";

      var part2 = "tbls1 = myarray[i+2].getElementsByTagName(\'table\');if(tbls1.length > 0){"; 
      part2 += "minVal = tbls1[0].rows[0].cells[3].childNodes.length - 1;";
      part2 += "for(h = 1; h < tbls1.length; h++){";
      part2 += "if (minVal < tbls1[h].rows[0].cells[3].childNodes.length - 1)";
      part2 += "minVal = tbls1[h].rows[0].cells[3].childNodes.length - 1;}";
      part2 += "for (j = i + 4; j < L - 4; j += 4) {";
      part2 += "tbls2 = myarray[j+2].getElementsByTagName('table');;if(tbls2.length > 0){";
      part2 += "testVal = tbls2[0].rows[0].cells[3].childNodes.length - 1;";
      part2 += "for(h = 1; h < tbls2.length; h++){";
      part2 += "if (testVal < tbls2[h].rows[0].cells[3].childNodes.length - 1)";
      part2 += "testVal = tbls2[h].rows[0].cells[3].childNodes.length - 1;}";
      part2 += "if (minVal < testVal){minIdx = j;minVal = testVal;}}}}";

      var comune2 = "if (minIdx > i){";
      comune2 += "tmpEl1 = mydiv.removeChild(myarray[minIdx + 3]);";
      comune2 += "tmpEl2 = mydiv.removeChild(myarray[minIdx + 2]);";
      comune2 += "tmpEl3 = mydiv.removeChild(myarray[minIdx + 1]);";
      comune2 += "tmpEl4 = mydiv.removeChild(myarray[minIdx]);";
      comune2 += "mydiv.insertBefore(tmpEl1, myarray[i]);";
      comune2 += "mydiv.insertBefore(tmpEl2, myarray[i]);";
      comune2 += "mydiv.insertBefore(tmpEl3, myarray[i]);";
      comune2 += "mydiv.insertBefore(tmpEl4, myarray[i]);}}}";
      
      tdpers.innerHTML = '<a href="javascript:void(0)" onclick="' + comune1 + part1 + comune2 + ';return false;">' + tdpers.innerHTML + '</a>';
      tdqual.innerHTML = '<a href="javascript:void(0)" onclick="' + comune1 + part2 + comune2 + ';return false;">' + tdqual.innerHTML + '</a>';
    }
  }
}

if (location.href.indexOf(URLSTOCK) > 0)
{

  var mytable = document.evaluate("//form[@name='form3']/table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  var somma = 0;
  var c1 = 0;
  var c2 = 0;
  if(mytable)
  {
    for (var i = 0; i < mytable.rows.length; i++)
    {
      if(mytable.rows[i].cells.length > 3)
      {
        c1 = mytable.rows[i].cells[1].textContent.replace(',','.');
        c2 = mytable.rows[i].cells[2].textContent.replace(',','.');
        if(!(isNaN(c1)) && (!isNaN(c2)))
        {
          somma = somma + (c1 * c2);
        }
      }
    }
    var newdiv = document.createElement('div');
    var nr = '' + somma;
    var nr = nr.replace('.',',');
    var point_pos = nr.indexOf (',');
    var int_nr = nr.substring (0, point_pos >= 0 ? point_pos : nr.length);
    var dec_nr = nr.substring (point_pos >= 0 ? (point_pos + 1) : nr.length, nr.length);
    
    var lt = int_nr.length
    while (lt > 3)
    {
      var th = int_nr.substring (lt - 3, int_nr.length);
      var rest = int_nr.substring (0, lt - 3);
      int_nr = rest + '.' + th;
      lt -= 3;
    }
    newdiv.innerHTML = '<b>Valore dello stock:</b> ' + int_nr + ',' + dec_nr;
    mytable.parentNode.insertBefore(newdiv,mytable.parentNode.lastChild);
  }
}

if (location.href.indexOf(URLCONCERTO) > 0)
{
  if(location.href.indexOf(URLCONCERTO_NO) < 1)
  {
    var tableElement;
    var indice = 0;
    var trElements = document.getElementsByTagName("tr");
    var nome, tipo, tdElements;
    
    for (var i = 0; i < trElements.length; i++)
    {
      if (trElements[i].className == 'DarkColumnHL')
      {
        tableElement = trElements[i].parentNode;
        break;
      }
    }
    if(tableElement)
    {
      getXML(tableElement);
    }
  }
}

function getXML(tableElement) 
{
  GM_xmlhttpRequest({
    method:'GET',
    url:URLXML,
    onload: function(resp) 
    {
      if (resp.status == 200) {
        var t = resp.responseText;

        var EventiArray = t.split('\n');
        var tipo,nome,TIPO, NOME, tp;
        
        trElements = tableElement.getElementsByTagName("tr");
        for (var j = 0; j < trElements.length; j++)
        {
          tdElements = trElements[j].getElementsByTagName("td");
          nome = tdElements[1];
          if(nome.getElementsByTagName("b").length == 0)
          {
            for (var i = 0; i < EventiArray.length; i++)
            {
              var riga = EventiArray[i].split(',');
              NOME = riga[1].replace(/^\s+|\s+$/g,"").toUpperCase();
              TIPO = riga[0].replace(/^\s+|\s+$/g,"").toUpperCase();
              ATTR = riga[2].replace(/^\s+|\s+$/g,"").toLowerCase();
              strABI = '';
              
              if(riga.length > 3)
              {
                ABI1 = riga[3].replace(/^\s+|\s+$/g,"").toLowerCase();
                if(ABI1.length > 0)
                  strABI = ' SKILL: ' + ABI1;
              }

              if(riga.length > 4)
              {
                ABI2 = riga[4].replace(/^\s+|\s+$/g,"").toLowerCase();
                if(ABI2.length > 0)
                  strABI  = strABI + ' / ' + ABI2;
              }               

              tp = 'attributo: ' + ATTR + strABI;
              if(nome.textContent.replace(/^\s+|\s+$/g,"").toUpperCase() == NOME)
              {
                nome.innerHTML = '<u>' + TIPO + '</u>&nbsp;' + nome.textContent;
                nome.title = tp;
                break;
              }
            }
          }
        }
    }
  }
  });
}

if (location.href.indexOf(URLPG) > 0)
{
  var doOnlineCheck = false;
  if (typeof(GM_getValue) != "undefined") {
    var lastcheck = GM_getValue(VERSION_CHECKED);
    if (!lastcheck) lastcheck = 0;
    var now = Math.round(new Date().getTime() / 1000) ;
    var diff = now - lastcheck;
    //diff = 172900;
    doOnlineCheck = (diff >= TIMEDIFF);
    if (doOnlineCheck) getOnlineRevision();
  }
  /*
  var pos = document.documentElement.innerHTML.indexOf('action=DistributeExp');
  
  if (pos > 0)
  {
    var URLSITO = document.location.href.substr(0, document.location.href.lastIndexOf('/') + 1);
    var menutable = document.evaluate("//table[@class='menu']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var menudiv = menutable.snapshotItem(0).parentNode;
    var headtable = menudiv.previousSibling.previousSibling;
    if(headtable)
    {
      var myheadtable = headtable.cloneNode(true);    
      if(myheadtable.childNodes.length == 2)
      {
        var _img = myheadtable.getElementsByTagName("img");
        if(_img.length > 0)
        {
          var sorgente = headtable.getElementsByTagName("img")[0].src;
          sorgente = sorgente.substr(0,sorgente.lastIndexOf('/') + 1);
          _img[0].src = sorgente + '../Achievements/AchIcon_82.gif';
        }
        var _div = myheadtable.getElementsByTagName("div");
        if(_div.length > 0)
        {
          _div[0].innerHTML = 'Custom';
        }       
      }
      menudiv.appendChild(myheadtable);
    }
    var mytable = menutable.snapshotItem(0).cloneNode(false);
    var newtr = document.createElement('tr');
    var newtd = document.createElement('td');
    newtd.innerHTML = '<a href="' + URLSITO + 'Charts.asp?action=PaparazziList">Lista Paparazzi</a>';
    newtr.appendChild(newtd);
    mytable.appendChild(newtr);
    menudiv.appendChild(mytable);
  }
  */
}

if (location.href.indexOf(URLAUTOSTRADA) > 0)
{
  var pos = document.documentElement.innerHTML.indexOf('Autostrada');

  if(pos > 0)
  {
    var stringa = '<a href="javascript:void(0)" onclick="' +
    'var menulink = document.evaluate(\'//a[contains(., \\\'Impegnato\\\')]\', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);' + 
    'for (var i = 0; i < menulink.snapshotLength; i++){window.open(menulink.snapshotItem(i));}' +
    ';return false;">Fai Chiappe</a>';

    var URLSITO = document.location.href.substr(0, document.location.href.lastIndexOf('/') + 1);
    var menutable = document.evaluate("//table[@class='menu']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var menudiv = menutable.snapshotItem(0).parentNode;
    var headtable = menudiv.previousSibling.previousSibling;
    if(headtable)
    {
      var myheadtable = headtable.cloneNode(true);    
      if(myheadtable.childNodes.length == 2)
      {
        var _img = myheadtable.getElementsByTagName("img");
        if(_img.length > 0)
        {
          var sorgente = headtable.getElementsByTagName("img")[0].src;
          sorgente = sorgente.substr(0,sorgente.lastIndexOf('/') + 1);
          _img[0].src = sorgente + '../Achievements/AchIcon_82.gif';
        }
        var _div = myheadtable.getElementsByTagName("div");
        if(_div.length > 0)
        {
          _div[0].innerHTML = 'Custom';
        }       
      }
      menudiv.appendChild(myheadtable);
    }
    var mytable = menutable.snapshotItem(0).cloneNode(false);
    var newtr = document.createElement('tr');
    var newtd = document.createElement('td');
    newtd.innerHTML = stringa;
    newtr.appendChild(newtd);
    mytable.appendChild(newtr);
    menudiv.appendChild(mytable);
  }
}


if (location.href.indexOf(URLPAPA) > 0)
{
  var mytables= document.evaluate("//div[@class='LightColumnHeader']/../table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(mytables.snapshotLength > 0)
  {
    var tbl = mytables.snapshotItem(0);

    if(tbl.rows.length > 1 )
    {
      if(tbl.rows[0].cells.length == 5)
      {
        var tdnum  = tbl.rows[0].cells[0];
        var tdpers = tbl.rows[0].cells[1];
        var tdcity = tbl.rows[0].cells[2];
        var tdtagl = tbl.rows[0].cells[3];
        var tdval  = tbl.rows[0].cells[4];
        
        var comune1 = "var mytables = document.evaluate(\'//div[@class=\\\'LightColumnHeader\\\']/../table\', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); ";
        comune1 += "var tblEl = mytables.snapshotItem(0);";
        comune1 += 'var L = tblEl.rows.length;';        
        comune1 += 'for(var i = 1; i < L -1; i++){minIdx = i;';
    
        part0 =  '   titolo = tblEl.rows[i].cells[0].textContent.replace(/^\\\s+/,\'\');';
        part0 += '   minVal = parseInt(titolo);';
        part0 += '   for (j = i + 1; j < L; j++) {';
        part0 += '     titolo = tblEl.rows[j].cells[0].textContent.replace(/^\\\s+/,\'\');testVal = parseInt(titolo);';
        part0 += '     if (minVal > testVal) {';
        part0 += '         minIdx = j;minVal = testVal;}}';
        part0 += '    if (minIdx > i){ var tblEl_N = tblEl.rows[minIdx].parentNode;tmpEl = tblEl_N.removeChild(tblEl.rows[minIdx]); ';
        part0 += '       tblEl_N.insertBefore(tmpEl, tblEl.rows[i]);}}';        

        part1 =  '   titolo = tblEl.rows[i].cells[1].textContent.replace(/^\\\s+/,\'\');';
        part1 += '   minVal = titolo;';
        part1 += '   for (j = i + 1; j < L; j++) {';
        part1 += '     titolo = tblEl.rows[j].cells[1].textContent.replace(/^\\\s+/,\'\');testVal = titolo;';
        part1 += '     if (minVal.toString() > testVal.toString()) {';
        part1 += '         minIdx = j;minVal = testVal;}}';
        part1 += '    if (minIdx > i){ var tblEl_N = tblEl.rows[minIdx].parentNode;tmpEl = tblEl_N.removeChild(tblEl.rows[minIdx]); ';
        part1 += '       tblEl_N.insertBefore(tmpEl, tblEl.rows[i]);}}';

        part2 =  '   titolo = tblEl.rows[i].cells[2].textContent.replace(/^\\\s+/,\'\');';
        part2 += '   minVal = titolo;';
        part2 += '   for (j = i + 1; j < L; j++) {';
        part2 += '     titolo = tblEl.rows[j].cells[2].textContent.replace(/^\\\s+/,\'\');testVal = titolo;';
        part2 += '     if (minVal.toString() > testVal.toString()) {';
        part2 += '         minIdx = j;minVal = testVal;}}';
        part2 += '    if (minIdx > i){ var tblEl_N = tblEl.rows[minIdx].parentNode;tmpEl = tblEl_N.removeChild(tblEl.rows[minIdx]); ';
        part2 += '       tblEl_N.insertBefore(tmpEl, tblEl.rows[i]);}}';

        part3 =  '   titolo = tblEl.rows[i].cells[3].textContent.replace(/\\\s+$/,\'\');';
        part3 += '   titolo = titolo.substr(0, titolo.lastIndexOf(\' \')).replace(/^\\\s+/,\'\').replace(/\\\s/g,\'\');';
        part3 += '   minVal = parseInt(titolo);';
        part3 += '   for (j = i + 1; j < L; j++) {';
        part3 += '     titolo = tblEl.rows[j].cells[3].textContent.replace(/\\\s+$/,\'\');';
        part3 += '     titolo = titolo.substr(0, titolo.lastIndexOf(\' \')).replace(/^\\\s+/,\'\').replace(/\\\s/g,\'\');';       
        part3 += '     testVal = parseInt(titolo);';
        part3 += '     if (minVal > testVal) {';
        part3 += '         minIdx = j;minVal = testVal;}}';
        part3 += '    if (minIdx > i){ var tblEl_N = tblEl.rows[minIdx].parentNode;tmpEl = tblEl_N.removeChild(tblEl.rows[minIdx]); ';
        part3 += '       tblEl_N.insertBefore(tmpEl, tblEl.rows[i]);}}';
                
        part4 =  '    titolo = tblEl.rows[i].cells[4].getElementsByTagName(\'img\').length;';
        part4 += '    minVal = titolo;';
        part4 += '    for (j = i + 1; j < L; j++) {';
        part4 += '      titolo = tblEl.rows[j].cells[4].getElementsByTagName(\'img\').length;';
        part4 += '     testVal = titolo;';
        part4 += '     if (minVal > testVal) {';
        part4 += '       minIdx = j; minVal = testVal; }}';
        part4 += '     if (minIdx > i) { var tblEl_N = tblEl.rows[minIdx].parentNode; tmpEl = tblEl_N.removeChild(tblEl.rows[minIdx]);';
        part4 += '     tblEl_N.insertBefore(tmpEl, tblEl.rows[i]); }}';
      
        var comune2 = '';
        comune2 += '  for(var i = 2; i < L; i++) { ';
        comune2 += '    if(i % 2) tblEl.rows[i].className =\'DarkColumnHL\'; else tblEl.rows[i].className =  \'\'; }';
        
        tdnum.innerHTML = '<a href="javascript:void(0)" onclick="' + comune1 + part0 + comune2 + ';return false;">' + tdnum.innerHTML + '</a>';
        tdpers.innerHTML = '<a href="javascript:void(0)" onclick="' + comune1 + part1 + comune2 + ';return false;">' + tdpers.innerHTML + '</a>';
        tdcity.innerHTML = '<a href="javascript:void(0)" onclick="' + comune1 + part2 + comune2 + ';return false;">' + tdcity.innerHTML + '</a>';
        tdtagl.innerHTML = '<a href="javascript:void(0)" onclick="' + comune1 + part3 + comune2 + ';return false;">' + tdtagl.innerHTML + '</a>';
        tdval.innerHTML = '<a href="javascript:void(0)" onclick="' + comune1 + part4 + comune2 + ';return false;">' + tdval.innerHTML + '</a>';
      }
    }
  }
}

function getStringa(id)
{
    var part = '';
    
    part += '   titolo = tblEl.rows[i].cells[' + id + '].textContent.replace(/^\\\s+/,\'\');';
    part += '   minVal = titolo;';
    part += '   for (j = i + 1; j < L; j++) {';
    part += '     titolo = tblEl.rows[j].cells[' + id + '].textContent.replace(/^\\\s+/,\'\');testVal = titolo;';
    part += '     if (minVal.toString() > testVal.toString()) {';
    part += '         minIdx = j;minVal = testVal;}}';
    part += '     if (minIdx > i){ var tblEl_N = tblEl.rows[minIdx].parentNode;tmpEl = tblEl_N.removeChild(tblEl.rows[minIdx]); ';
    part += '       tblEl_N.insertBefore(tmpEl, tblEl.rows[i]);}}';
    return part;
    
}

if (location.href.indexOf(URLREPERTOIRE) > 0)
{
  var myCheck = document.evaluate('//input[contains(@onclick, \'CheckSongs\')]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
  if(myCheck.snapshotLength == 1)
  {
    var mytable = document.evaluate("//form[@name='Repertoire']/table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if(mytable)
    {
      for (var i = 1; i < mytable.rows.length; i++)
      {
        if(mytable.rows[i].cells.length > 5)
        {
          
          toSearch = 'SongID=';
          pos = mytable.rows[i].cells[3].innerHTML.indexOf(toSearch);
          id = mytable.rows[i].cells[3].innerHTML.substring(pos + toSearch.length);
          pos = id.indexOf('&');
          id = id.substring(0, pos);
          
          var myCells = document.evaluate('img[@Title]', mytable.rows[i].cells[4], null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
          
          if(myCells.snapshotLength > 0)
          {
            myCell = myCells.snapshotItem(0);
            newValue = myCell.title.replace(/^\s+|\s+$/g,"").split('%', 1)[0];
            key = "REPERTOIRE_" + id;
            
            var oldValue = GM_getValue(key, 200);
            var stringa = "";
            if(oldValue != 200)
            {
              if(newValue > oldValue)
                stringa = '<img src="images/Charts/Chart_upp.gif" />';
              if(newValue < oldValue)
                stringa = '<img src="images/Charts/Chart_down.gif" />';
              
              //mytable.rows[i].cells[4].innerHTML = mytable.rows[i].cells[4].innerHTML + stringa;
              
            }
          }
          /*          
          if(dateNew > dateOld)
            GM_setValue(key, newValue);
            if (!GM_deleteValue) 
              alert('disastro');

            GM_deleteValue(key);
          */
        }
      }
    
	    var funzione = "var mytable = document.evaluate(\'//form[@name=\\\'Repertoire\\\']/table\', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);";
	    funzione += "if(mytable){for (var i = 1; i < mytable.rows.length; i++){if(mytable.rows[i].cells.length > 5){";
		  funzione += '  var col = mytable.rows[i].cells.length -2 ;  titolo = mytable.rows[i].cells[col].getElementsByTagName(\'img\')[1].title;';
		  funzione += '  var curVal = parseInt(titolo.replace(\'%\', \'\')); if(curVal < 0){mytable.rows[i].style.display = \'none\';}}}';
		  funzione += '  var k = 0; for (var j = 1; j < mytable.rows.length; j++) {if(mytable.rows[j].style.display != \'none\'){';
		  funzione += ' if(k % 2) mytable.rows[j].className =\'DarkColumnHL\'; else  mytable.rows[j].className =  \'\';  k++; }}}';
	    var bt = document.createElement('input');
			bt.setAttribute('type', "button");
			bt.setAttribute('value','Nascondi Canzoni Rosse');
			bt.setAttribute('onclick', funzione);
			var newtr = document.createElement('tr');
      var newtd = document.createElement('td');
      newtd.setAttribute('colspan',mytable.rows[1].cells.length -1 );
      newtd.appendChild(bt);
      newtr.appendChild(newtd);
      mytable.appendChild(newtr);
    }
  }
}

if (location.href.toUpperCase().indexOf(URLMYITEMS) > 0)
{
  var menulink = document.evaluate('//a[contains(@href, \'action=Undress\')]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(menulink.snapshotLength > 0)
  {
    var mytd, myanchor, itID;
    var myitems = document.evaluate('//a[contains(@href, \'action=drop\')]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < myitems.snapshotLength; i++)
    {
      myanchor = myitems.snapshotItem(i);
      mytd = myanchor.parentNode.parentNode;
      if(mytd == null)
        continue;
        
      var myCells = document.evaluate('a[contains(@onclick, \'DropItem\')]', mytd, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      var myCells2 = document.evaluate('a[contains(@href, \'action=drop\')]', mytd, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      
      if(myCells.snapshotLength > 0 || myCells2.snapshotLength > 0)
      {
        var pos = mytd.toString().indexOf('[object HTMLTableCellElement]');
  
        if(pos > -1)
        {
          var qs = myanchor.href;
          idID = '';
          a = qs.split("?");
          a = a[1].split("&");
          for(var j = 0; j < a.length; j++)
          {
            b = a[j].split("=");
            if(b[0] == 'ItemID')
              itID = b[1];
          }
          if(itID != '')
          {
            mytd.innerHTML +=  ' / <a alt="Trasferisci sul Bus" title="Trasferisci sul Bus" href="TourSettings.asp?action=TransferEquipment&ItemID=' + itID + '"><b>BUS</b></a>';
            mytd.style.whiteSpace="nowrap";
          }
          var mytr = mytd.parentNode;
          var myimg = mytr.getElementsByTagName('img');
          for (var k = 0; k < myimg.length; k++)
          {
            if(myimg[k].title == '' && myimg[k].alt != '')
            {
              myimg[k].title = myimg[k].alt;
            }
          }
        }
      }
    }
  }
}