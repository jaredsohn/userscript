// ==UserScript==
// @name DS CheckVillages
// @namespace  http://hypix.de/
// @description Checkboxen für Dörfer in Übersicht "Produktion" zum Übertrag nach "Gruppen"
// @author The Real Otto
// @include http://de*.die-staemme.de/game.php*
// ==/UserScript==

// -------------------------------------------------------------------------
// Versionhistory:
// 0.0.1 erster Entwurf
// -------------------------------------------------------------------------




(function(){
  var version = "0.0.1";
  var storage = new Storage("checkvillages", false); // Storage von Hypix
  var params = parseParams(location.href);
  
  switch( params.screen )
  {
    case "overview_villages":
      if(params.mode == "prod") {
        CheckVillages();
      } else if(params.mode == "groups") {
        FillBoxes();
      }
      break;
    default:
      break;
  }

// -------------------------------------------------------------------------
// Tabelle Produktionsübersicht erweitern (Hauptfunktion 1):
// -------------------------------------------------------------------------
  function CheckVillages() {
    var tab = document.getElementById("production_table");
    if(!tab) return;
    
    var Label;
    var ID;
    // Überschrift zusätzliche Spalte
    AddHead(tab.rows[0], "Merken");
    
    // Dorf-IDs auslesen:
    for(var i = 1; i < tab.rows.length; i++ ) {      
      Label = tab.rows[i].cells[0].innerHTML.search("label_");
      if(Label) {
        ID = parseInt(tab.rows[i].cells[0].innerHTML.substr(Label+6,5));
        if(!isNaN(ID)) {
          // Checkbox für jedes Dorf mit ID erzeugen:
          var chk = InsertCheckbox(tab.rows[i], "chk_"+ID);
        }
      } else {
        AddHead(tab.rows[i], "");
      }
    }
    // Fusszeile mit Master-Checkbox & Button:
    AddFoot(tab);
  }

// -------------------------------------------------------------------------
// Checkboxen in Gruppenverwaltung setzen (Hauptfunktion 2):
// -------------------------------------------------------------------------
  function FillBoxes() {
    var Boxes = document.getElementsByName("village_ids[]");
    var Label, Del;
    
    for(var i = 0; i < Boxes.length; i++) {
      // Wurde die Dorf-ID gespeichert?
      Label = storage.getValue(Boxes[i].value);
      if(Label) {
        // Dann Checkbox aktivieren:
        Boxes[i].checked = true;
      }
    }
    // Speicher löschen:
    Del = storage.listValues();
    for(var i = 0; i < Del.length; i++ ) {
      storage.deleteValue(Del[i]);
    }
  }

// -------------------------------------------------------------------------
// th-Tag als erste Zelle der row erzeugen und den Text eintragen:
// -------------------------------------------------------------------------
  function AddHead(row, txt) {
    var th = document.createElement("th");
    var Text = document.createTextNode(txt);
    
    th.appendChild(Text);    
    row.insertBefore(th, row.cells[0]);
  }

// -------------------------------------------------------------------------
// Fusszeile am Ende der Tabelle erzeugen:
// -------------------------------------------------------------------------
  function AddFoot(tab) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var Text = document.createTextNode("Alle auswählen");
    
    td.align = "left";
    td.style.fontWeight = "bold";
    td.style.backgroundColor = "#DFCCA6";
    td.colSpan = tab.rows[1].cells.length-1;
    td.appendChild(Text);
    tr.appendChild(td);
    
    InsertCheckbox(tr, "0");
    // Master-Checkbox und Text:
    tab.appendChild(tr);
    // Button:
    InsertButton(tab);
  }

// -------------------------------------------------------------------------
// Checkbox in erster Zelle der row erzeugen:
// -------------------------------------------------------------------------
  function InsertCheckbox(row, ID) {
    var td = document.createElement("td");
    var chk = document.createElement("input");
    
    td.align = "center";
    td.style.backgroundColor = "#DFCCA6";
    chk.id = ID;
    chk.type = "checkbox";
    
    if(ID == 0) {
      chk.addEventListener("click", SelectAll, false);
      chk.name="AllCheckbox";
    } else {
      chk.name="VillageCheckbox";
    }
    
    td.appendChild(chk);
    row.insertBefore(td, row.cells[0]);
  }

// -------------------------------------------------------------------------
// Eventhandler: Master-Checkbox "Alle auswählen" wurde geändert:
// -------------------------------------------------------------------------
  function SelectAll() {
    var Boxes = document.getElementsByName("VillageCheckbox");
    
    for(i = 0; i < Boxes.length; i++) {
      // Alle Checkboxen wie Master-Checkbox setzen
      Boxes[i].checked = this.checked;
    }
  }
  
// -------------------------------------------------------------------------
// Button "Markierungen in Gruppenverwaltung übertragen" am Ende der Tabelle erzeugen:
// -------------------------------------------------------------------------
  function InsertButton(tab) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var btn = document.createElement("input");
    
    btn.id = "CommitButton";
    btn.type="button";
    btn.value = "Markierungen in Gruppenverwaltung übertragen";
    btn.addEventListener("click", CommitChange, false);
    td.align = "left";
    td.style.backgroundColor = "#DFCCA6";
    td.colSpan = tab.rows[1].cells.length;
    
    td.appendChild(btn);
    tr.appendChild(td);
    tab.appendChild(tr);
  }

// -------------------------------------------------------------------------
// Button "Markierungen in Gruppenverwaltung übertragen" wurde betätigt:
// -------------------------------------------------------------------------
  function CommitChange() {
    var Boxes = document.getElementsByName("VillageCheckbox");
    
    for(var i = 0; i < Boxes.length; i++) {
      if(Boxes[i].checked) {
        // Dorf-IDs speichern wenn Checkbox aktiviert:
        storage.setValue(Boxes[i].id.substring(4), true);
      }
    }
    // Gruppenverwaltung aufrufen:
    location.href = GroupLink();
  }

// -------------------------------------------------------------------------
// Link zur Gruppenverwaltung zusammenbauen:
// -------------------------------------------------------------------------
  function GroupLink() {
    var x = new GETParameter();
    Link="http://"+document.location.host.split('.')[0]+".die-staemme.de/game.php?";
    Link+="village=";
    Link+=x.getAssoc()['village'];
    Link+="&screen=overview_villages&mode=groups&";
    // Urlaubsverwaltung:
    if(x.getParameter('t')) {
      Link+="t=";
      Link+=x.getAssoc()['t'];
      Link+="&";
    }
    // Heereslager:
    if(x.getParameter('army_camp')) {
      Link+="army_camp=";
      Link+=x.getAssoc()['army_camp'];
      Link+="&";
    }
    // Heereslager:
    if(x.getParameter('army_camp_enabled')) {
      Link+="army_camp_enabled=";
      Link+=x.getAssoc()['army_camp_enabled'];
    }
    return Link;
  }  





// -------------------------------------------------------------------------
// Diverse geklaute Hilfsfunktionen (URL-Parameter, Storage):
// -------------------------------------------------------------------------

  function parseParams(url)
  {
    url = url.substring(url.indexOf("?")+1);
    url = url.replace( /&amp;/g, "&" );
    url = url.split("&");
    var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; },  };
    for( var i = 0; i < url.length; i++ )
    {
      var param = url[i].split("=");
      params[param[0]] = param[1];
    }
    return params;
  }
  
  function GETParameter(fd,nd,as) {
    this.input = (window.location.search.length>0)? window.location.search : '?para1=1&para2=2&para3=3 1';
    this.firstDelim = fd || '?';
    this.nextDelim = nd || '&';
    this.assignment = as || '=';
    this.getParameter = _GETPARAMETER;
    this.getAssoc = _GETASSOC;
    this.getValues = _GETVALUES;
    this.getKeys = _GETKEYS;
    this.debug = _DEBUG;
  }

  function _GETASSOC() {
    var url = this.input;
    if(url.indexOf('=') == -1 || url.indexOf(this.firstDelim) == -1) {
      return false;
    }
    var temp = url.split(this.nextDelim);
    var result = new Array();
    var key = '';
    var val = '';
    for(var x=0; x<temp.length; x++) {
      if(x==0) {
        key = temp[x].substring(1,temp[x].indexOf(this.assignment));
      } else {
        key = temp[x].substring(0,temp[x].indexOf(this.assignment));
      }
      val = temp[x].substring(temp[x].indexOf(this.assignment)+1,temp[x].length);
      result[unescape(key)] = unescape(val);
    }
    return result;
  }

  function _GETVALUES() {
    var url = this.input;
    if(url.indexOf('=') == -1 || url.indexOf(this.firstDelim) == -1) {
      return false;
    }
    var temp = url.split(this.nextDelim);
    var result = new Array();
    var val = '';
    for(var x=0; x<temp.length; x++) {
      val = temp[x].substring(temp[x].indexOf(this.assignment)+1,temp[x].length);
      result[x] = unescape(val);
    }
    return result;
  }

  function _GETPARAMETER(para) {
    return this.getAssoc()[para];
  }

  function _GETKEYS() {
    var url = this.input;
    if(url.indexOf('=') == -1 || url.indexOf(this.firstDelim) == -1) {
      return false;
    }
    var temp = url.split(this.nextDelim);
    var result = new Array();
    var val = '';
    for(var x=0; x<temp.length; x++) {
      if(x==0) {
        key = temp[x].substring(1,temp[x].indexOf(this.assignment));
      } else {
        key = temp[x].substring(0,temp[x].indexOf(this.assignment));
      }
      result[x] = unescape(key);
    }
    return result;
  }

  function _DEBUG(url,para) {
    this.input = url;
    var x = 0;
    var temp = '';
    for (var elem in this.getAssoc()) {
      x++;
      temp += elem+' | ';
    }
  }


function Storage(prefix,forceGM)
{
  var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1
  var win = gm ? unsafeWindow : window;
  var ls = false;
  var intGetValue;
  var intSetValue;
  var prefix = prefix;
  try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
  if( !ls && !gm )
    throw("Keine geeignete Speichermöglichgkeit gefunden");
  if( forceGM && gm || !ls)
  {
    if( gm )
    {
      prefix = prefix + "_" + document.location.host.split('.')[0];
      intSetValue = function(key,value) 
      {
        GM_setValue(prefix+"_"+key,value);
      };
      intGetValue = function(key,defaultValue)
      {
        return GM_getValue(prefix+"_" + key, defaultValue);
      }
      this.deleteValue = function(key)
      {
        GM_deleteValue(prefix+"_"+key);
      }
      this.listValues = function(re)
      {
        var allkeys = GM_listValues();
        var serverKeys = [];
        var rePrefix = new RegExp("^"+prefix+"_(.*)$");
        if( typeof(re) != "undefined" )
          var reKey = new RegExp(re);
        for( var i = 0; i < allkeys.length; i++ )
        {
          var res = allkeys[i].match(rePrefix);
          if( res )
          {
            if( reKey ) 
            {
              res = res[1].match(reKey);
              if( res )
                serverKeys.push(res);
            }
            else
              serverKeys.push(res[1]);
          }
        }
        return serverKeys;
      }
    }
  }
  else if( ls )
  {
    intSetValue = function(key,value) 
    {
      localStorage.setItem(prefix+"_"+key, value );
    };    
    intGetValue = function(key,defaultValue)
    {
      var value = localStorage.getItem(prefix+"_"+key);
      if( value )
        return value;
      else
        return defaultValue;
    };
    this.deleteValue = function(key)
    {
      localStorage.removeItem(prefix+"_"+key);
    }
    this.listValues = function(re)
    {
      var keys = [];
      var rePrefix = new RegExp("^"+prefix+"_(.*)$");
      if( typeof(re) != "undefined")
        var reKey = new RegExp(re);
      for( var i = 0; i < win.localStorage.length; i++ )
      {
        var res = localStorage.key(i).match(rePrefix);
        if( res )
        {
          if( reKey ) 
          {
            res = res[1].match(reKey);
            if( res )
              keys.push(res);
          }
          else
            keys.push(res[1]);
        }
      }
      return keys;
    }
  }
  this.clear = function(re)
  {
    var keys = this.listValues(re);
    for( var i = 0; i < keys.length; i++ )
      this.deleteValue(keys[i]);
  }
  this.setValue = function(key,value)
  {
    switch( typeof(value) )
    {
      case "object":
      case "function":
        intSetValue(key,"j"+JSON.stringify(value));
        break;
      case "number":
        intSetValue(key,"n"+value);
        break;
      case "boolean":
        intSetValue(key,"b" + (value ? 1 : 0));
        break;
      case "string":
        intSetValue(key,"s" + value );
        break;
      case "undefined":
        intSetValue(key,"u");
        break;
    }
  }  
  this.getValue = function(key,defaultValue)
  {
    var str = intGetValue(key);
    if( typeof(str) != "undefined" )
    {
      switch( str[0] )
      {
        case "j":
          return JSON.parse(str.substring(1));
        case "n":
          return parseFloat(str.substring(1));
        case "b":
          return str[1] == "1";
        case "s":
          return str.substring(1);
        default:
          this.deleteValue(key);
      }
    }
    return defaultValue;
  }
  this.getString = function(key)
  {
    return intGetValue(key);
  }
  this.setString = function(key,value)
  {
    intSetValue(key,value);
  }
}
})();