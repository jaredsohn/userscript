// ==UserScript==
// @name           DS MoveGroups
// @namespace      Domi
// @include        http://de*.die-staemme.de/game.php?*overview_villages*
// ==/UserScript==

// Storage-Klasse
// Autor: Hypix
// Zur freien Verwendung
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
var storage = new Storage('DS_movegroups', true);
//Funktionen:
function read_comb(table) {
    var vil_list = '';
    var count=0;
    for(var i = 1; i < table.rows.length; i++) {
        if(table.rows[i].style.display == 'none') {}
        else {
            if(table.rows[i].innerHTML.match('village=')) {
                vil_list = vil_list + table.rows[i].innerHTML.split('village=')[1].split('&')[0] + ',';
                count++
            }
        }
    }
    storage.setValue('list', vil_list);
    alert(count + ' Dörfer wurden erfolgreich gespeichert!');
}
function read_prod(table) {
    var vil_list = '';
    var count=0;
    for(var i = 1; i < table.rows.length-1; i++) {
        if(table.rows[i].style.display == 'none') {}
        else {
            if(table.rows[i].innerHTML.match('village=')) {
                vil_list = vil_list + table.rows[i].innerHTML.split('village=')[1].split('&')[0] + ',';
                count++
            }
        }
    }
    storage.setValue('list', vil_list);
    alert(count + ' Dörfer wurden erfolgreich gespeichert!');
}
function set_checks(table) {
    var vil_list = storage.getValue('list', '');
    for(var i = 1; i < table.rows.length/2; i++) {
        if(vil_list.match(table.rows[2*i-1].cells[0].getElementsByTagName('a')[0].href.split('village=')[1].split('&')[0]))
            table.rows[2*i-1].cells[0].getElementsByTagName('input')[0].checked = true;
        else
            table.rows[2*i-1].cells[0].getElementsByTagName('input')[0].checked = false;
    }
}
//Ausführen der Funktionen:
if(location.href.match('mode=combined')) {
    var table = document.getElementById('combined_table');
    var button = document.createElement('input');
    button.type = 'button';
    button.value = 'Dörfer einlesen!';
    button.addEventListener('click', function () {read_comb(table);}, false);
    table.parentNode.insertBefore(button, table);
}
if(location.href.match('mode=prod')) {
    var table = document.getElementById('production_table');
    var button = document.createElement('input');
    button.type = 'button';
    button.value = 'Dörfer einlesen!';
    if(table.rows[0].lastChild.textContent.match('X'))
        button.addEventListener('click', function () {read_prod(table);}, false);
    else
        button.addEventListener('click', function () {read_comb(table);}, false);
    table.parentNode.insertBefore(button, table);
}
if(location.href.match('mode=groups')) {
    var table = document.getElementById('group_assign_table');
    var button = document.createElement('input');
    button.type = 'button';
    button.value = 'Haken an gespeicherte Dörfer setzen!';
    button.addEventListener('click', function () {set_checks(table);}, false);
    table.parentNode.insertBefore(button, table);
}  