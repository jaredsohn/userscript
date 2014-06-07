// ==UserScript==
// @name DS ReportReader
// @description Version 1.0.1 Automatisches Berichte einlesen
// @include http://de*.die-staemme.de/game.php*screen=map*
// @include http://de*.die-staemme.de/game.php*screen=info_village*
// @include http://de*.die-staemme.de/game.php*screen=report*
// @include http://de*.die-staemme.de/game.php*screen=place*
// @include http://de*.die-staemme.de/game.php*screen=settings&mode=settings
// ==/UserScript==

(function()
{

getGameData();
var storage = new Storage("reportreader",true);
var params = parseParams(location.search);
window.addEventListener( "keyup", keyUpHandler, true );

// PA-Only umgehen
var menu = document.getElementById("menu_row");
if( !/screen=memo/.test(menu.innerHTML) )
{
  var cell = menu.insertCell(menu.cells.length);
  cell.innerHTML="screen=memo";
  cell.style.display="none";
}

if( params.screen == "report" && (params.mode=="attack" || params.mode=="all") && params.get("view",0) > 0) 
{
  var server = document.location.host.split('.')[0];
  var tables = document.getElementsByClassName("vis");
  var table = tables[1];
  var a = table.getElementsByTagName("a");
  var dst;
  for( var i = a.length-1; i >= 0; i-- )
  {
    if( a[i].innerHTML.match(/&lt;&lt;/) )
    {
      dst = a[i];
      break;
    }
  }
  if( storage.getValue(server+"_all_"+game_data.player.id, "0" ) == "0"  && i >= 0)
  {
    table = tables[0];
    a = table.insertRow(table.rows.length).insertCell(0).appendChild(document.createElement("a"));
    a.href = "javascript:;";
    a.innerHTML = "Alle neueren einlesen";
    a.addEventListener("click", function() { storage.setValue(server+"_all_"+game_data.player.id, "1"); setTimeout(function() { location.href = dst; }, 250); }, false );
  }
  else
  {
    if( dst )
      setTimeout(function() { location.href = dst; }, 250 + Math.floor(Math.random()*1001));
    else
      storage.setValue( server+"_all_"+game_data.player.id, "0" );
  }
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

function keyUpHandler(event)
{
switch(event.keyCode) {
	
	case 27:
			storage.setValue( server+"_all_"+game_data.player.id, "0" );
			break;
}
}

function getGameData() {
if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox")>-1 ) {
	game_data = unsafeWindow.game_data;
} else {
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.textContent = 	"var input=document.createElement('input');" + 
						"input.type='hidden';" + 
						"input.value=JSON.stringify(game_data);"  + 
						"input.id='game_data';" + 
						"document.body.appendChild(input);";
	document.body.appendChild(script);
	document.body.removeChild(script);

	eval("game_data=" + document.getElementById("game_data").value + ";");
	return game_data;
}}

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
