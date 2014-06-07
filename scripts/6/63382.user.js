// ==UserScript==
// @name           Punkte Spieler Namens Anzeige 
// @namespace      Halso 3 Crank
// @description    Punkte Spieler Namens Anzeige
// @author         Halo 3 Crank übernommen von BIG W
// @include        http://de*.die-staemme.de/game.php?*
// ==/UserScript==

/*
Copyright (c) 2010 Halo 3 crank!

Permission is hereby granted, free of charge, 
to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without 
restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject 
to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
*/

////////////////////////////////////////
////// Main Control Object
////////////////////////////////////////

var KungFu = {

/** 
 * Storage Version (ONLY needed for storage) 
 * If changed, the configuration (stored in GM storage) is resetted
 * to prevend the script from crashing.
 */
version : "1.1",

////////////////////////////////////////
// I18N: Language dependend texts.
// I don't plan to translate this texts
// but it doesn't hurt to be prepared)
////////////////////////////////////////

// TODO: Get current language from web domain 
// (not from enviroment, because some texts have to match the page language)
_lang  : "DE",

_texts : 
{ "DE":
  { 
    "version" :"Version 1.1",
  
  
    "spear"   :"Speer",
    "sword"   :"Schwert",
    "axe"     :"Axt",
    "archer"  :"Bogen",
    "spy"     :"Sp&auml;her",
    "light"   :"LKav",
    "marcher" :"bBogen",
    "heavy"   :"sKav",
    "ram"     :"Rammen",
    "catapult":"Katas",
    "knight"  :"Pala",
    "snob"    :"Adel",
    "save"    :"Speichern",
    "none"    :" ",
    "ignore"  :"-ignoriere-",
    
    "options_title": "Kung Fu:", // Option form title

    "amount"    : "Anzahl",
    "substitute": "Ersatz-<br>Einheit",
    "factor"    : "-Faktor",
    "MapConfig" : "Kartenkonfiguration:", 

    "Help_TroopConfig" : 
      "Hier wird der Zusammenbau der Farmtruppen konfiguriert.<br>"
    + "Stehen von einer Truppensorte nicht genug Einheiten zu Verf&uuml;gung, k&ouml;nnen "
    + "diese durch andere Einheiten ersetzt ODER ignoriert werden.<p>"
    + "<i>Beispiel:</i><br><pre>"
    + "Anzahl Einheit  Ersatzregel   Ersatzfaktor<br>"
    + "1      Sp&auml;her   -ignoriere-<br>"
    + "600    lKav     bB&ouml;gen        1.6  (80 -> 50 Kapazit&auml;t)<br>"
    + "       bB&ouml;gen   sKav          1    (selbe Kapazit&aumlt)<br>"
    + "       sKav     Speer         2    (50 -> 25 Kapazit&aumlt)<br>"
    +"</pre>"
    + "<i>Erkl&auml;rung</i><p>"
    + "Ist kein Sp&auml;her verf&uuml;gbar, wird das Skript diesen Wert auf \"0\" setzen. Ein Fehlen wird ignoriert.<br>"
    + "Sind weniger als 600 lKav verf&uuml;gbar, wird das Skript versuchen, die fehlende Menge durch 1.6 x bB&ouml;gen "
    + "auszugleichen. Diese Anzahl wird zur konfigurierten Anzahl bB&ouml;gen hinzugef&uuml;gt.<br>"
    + "Zuletzt wird versucht, die noch fehlenden Truppen durch Speere zu ersetzen.<br>"
    + "Fehlen am Ende Einheiten, wird der Angriff trotzdem ausgef&uuml;hrt und der Server wird ein \"Nicht genug Einheiten\" melden.",

    "AttackOverlay"          : "Overlay f&uuml;r Angriffe:", 
    "AttackOverlayMaxAge"    : "Max. Alter in Tagen",
    
    "AttackOverlayMinOpacity": "Min. Deckkraft [0,1 bis 1,0]",

    "Help_AttackOverlayOpacity": 
     "Um das Alter eines Angriffs optisch besser hervorzuheben, werden sehr alte Angriffe "
    +"total ausgeblendet. Alle anderen werden abh&auml;ngig vom Alter mehr oder weniger "
    +"transparent angezeigt. \"Max. Alter\" bestimmt wann Angriffe &uuml;berhaupt angezeigt werden.<br>"
    +"\"Min. Deckkraft\" bestimmt die minimale Deckkraft.<br>"
    +"<i>Formel:</i><pre>"
    +"  Deckkraft = 1 + (MinDeckkraft-1)*(Alter/MaxAlter)"
    +"</pre><br>"
    +"Ein Angriff mit maximalem Alter wird also mit der minimalen Deckkraft angezeigt.",
    
    "AutoFarmAttack"         : "Farmbewertungshilfe:",
    "AutoFarmMinPoints"      : "Punkteminimum",
    "AutoFarmMaxPoints"      : "Punktemaximum",
    
    "Help_AutoAttackPoints"  :
      "Mit \"Punkteminimum\" und \"Punktemaximum\" wird festgelegt "
    + "in welchem Punktebereich Farmen bewertet werden. "
    + "Die Werte h&auml;ngen stark vom jeweiligen Server ab und dienen dazu, "
    + "versehentliche Angriffe auf unlohnende oder zu starke D&ouml;rfer zu vermeiden.",
    
    "AutoFarmMinTime"        : "Minimale Zeit seit letztem Angriff in Stunden",
    "AutoFarmTimeFactor"     : "Zeit-Faktor f&uuml;r Farmbewertung",

    "Help_AutoFarmTimeFactor": 
     "Die Zeit in Stunden seit dem letztem Angriff wird mit diesem Faktor multipliziert "
    +"und auf die Distanz des Barbarendorfs addiert.<br>"
    +"<i>Formel:</i><p><pre>"
    +"  t  = Zeit des letzten Angriffs - Minimale Zeit laut Konfiguration<br>"
    +"  f  = Faktor<br>"
    +"  dx = Dorf-x-Position - Aktuelles Dorf-x-Position<br>"
    +"  dy = Dorf-y-Position - Aktuelles Dorf-y-Position<br><br>"
    +"  Bewertung = t * f + Sqrt( dx*dx + dy*dy )<br>"
    +"</pre><br>"
    +"Gute Werte liegen zwischen 5 und 10.<br>"
    +"Die resultierenden Werte kann man auf der Karte &uuml;ber \"Farmbewertung\" anzeigen lassen.",
    
    "MiscConfig"             : "Verschiedenes:",
    "ShowSumRow"             : "Summe in '&Uuml;bersicht Kombiniert' anzeigen",
    "ShowUnitSumRow"         : "Summe in '&Uuml;bersicht Truppen' anzeigen",
    "ShowResSumRow"          : "Summe in '&Uuml;bersicht Produktion' anzeigen",
    "UnitSums"               : "Summe Einheiten",
    "SumAll"                 : "Gesamt",


    // Config option on Map page.

    "MapOverlayOptions" : "Dorf Information:",

    "showPoints"             : "Punkte",
    "showName"               : "Name",
    "showOwner"              : "Spieler",

   


    // Build config
    "main"      : "Hauptgeb&auml;ude",
    "barracks"  : "Kaserne",
    "stable"    : "Stall",
    "garage"    : "Werkstatt",
    "snob"      : "Adelshof",
    "smith"     : "Schmied",
    "place"     : "Versammlungsplatz",
    "statue"    : "Statue",
    "market"    : "Markt",
    "wood"      : "Holzf&auml;ller",
    "stone"     : "Lehmgrube",
    "iron"      : "Eisenmine",
    "farm"      : "Bauernhof",
    "storage"   : "Lager",
    "hide"      : "Versteck",
    "wall"      : "Wall",

    // Messages
    "no_option_found"   : "HF UserScript: Option forms not found!\nPleas get a newer version of this script!",
    "NoAutoFarmTargets" : ""
  }
},

/**
 * Gets a language dependend text by ID.
 */
text : function(txt)
{
  return ( this._texts[this._lang][txt] ) ? this._texts[this._lang][txt] : txt;
},

/**
 * Units to handle. Remove entries to completly ignore them! Like "snob" ;)
 */
units : 
[ "spear"   ,
  "sword"   ,
  "axe"     ,
  "archer"  ,
  "spy"     ,
  "light"   ,
  "marcher" ,
  "heavy"   ,
  "ram"     ,
  "catapult",
  "knight"  ,
  "snob"
],

/**
 * Buildings to handle. Remove entries to completly ignore them!
 */
buildings : 
[ "main",
  "barracks",
  "stable",
  "garage",
  "snob",
  "smith",
  "place",
  "statue",
  "market",
  "wood",
  "stone",
  "iron",
  "farm",
  "storage",
  "hide",
  "wall"
],

/** 
 * Configuration:
 * Is read from GM storage
 */
 
config : null,

getDefaultConfig : function()
{
  var cfg = 
  {
      units:[],
      combinedShowSumRow : false,
      unitsShowSumRow : false,
      resShowSumRow : false
  };
  
  for (var unit in this.units)
    cfg.units.push( {c:0,subs:-2,x:1} );
    
  return cfg;
},



////////////////////////////////
////// Common Helper Functions
////////////////////////////////

/** Gets a copy of the unit configuration (see conmfig above). */
getUnitConfig : function()
{
  var copy;
  eval( "copy="+this.toString(this.config.units) );
  return copy;
},

/** Gets the current game frame (as seen in many other DS user scripts) */
getGameFrame : function () {
  return window;
  // return this.getFrame( 'game.php' );
},

getFrame : function (fname) {
    if (window.document.URL.indexOf(fname) < 0)
        for (var i=0;i<window.frames.length;i++)
        {
           if (window.frames[i].document.URL.indexOf(fname) > 0) return window.frames[i];
        };
    return window;
},

escapeHTML : function(c,sep)
{
  var r = "";
  if ( c )
  {
    if ( !sep ) sep ="";
    for(var i=0;i<c.length;i++)
    {
      var ch = c.charAt(i);
      switch (ch)
      {
        case '&': r += "&amp;"; break;
        case '<': r += "&lt;" ; break;
        case '>': r += "&gt;" ; break;
        default:
          r += ch+sep;
      }
    }
  }
  return r;
},

/**
 * Parse local format to date object.
 * TODO: is time format language dependend?
 */
pDate : function( dt )
{
    if ( dt && dt.length>0 )
    {
      // dt = dd.mm.yy hh:mm
      var d = new Date(
          2000+
          parseInt(dt.substr( 6,2),10)   // Year
        , parseInt(dt.substr( 3,2),10)-1 // Month
        , parseInt(dt.substr( 0,2),10)   // Day
        , parseInt(dt.substr( 9,2),10)   // Hours
        , parseInt(dt.substr(12,2),10)   // Minutes
        , 0, 0 
        );
      return d;
    }
    return null;
},

pFloat : function( txt, dft )
{
  var v=parseFloat( txt.replace(/,/g,"."));
  if (isNaN(v)) v=(dft===undefined)?0:dft;
  return v;
},

pInt : function( txt, dft )
{
  // TODO: Lang. dependend separators?
  var v=parseInt( txt, 10 );
  if (isNaN(v)) v=(dft===undefined)?0:dft;
  return v;
},

pad : function(number, digits)
{
  var x = ""+number;
  while(x.length<digits) x = "0"+x;
  return x;
},

// Format large integer values  
fInt : function( val )
{
  var txt = "";
  while( val >= 1000 )
  {
      var nv = Math.floor(val/1000);
      txt = "<span class='grey'>.</span>"+this.pad(val-(nv*1000),3)+txt;
      val = nv;
  }
  txt = ""+val+txt;
  
  return txt;
},

sumArray: function(arr)
{
  var sum = 0;
  if ( arr )
  {
    for (var i=0;i<arr.length;i++) sum += arr[i];
  }
  return sum;
},

getCookie : function(name)
{
  var kekse = this.getGameFrame().document.cookie.split(';');
  for(var i=0;i<kekse.length;i++) 
  {
    var keks = kekse[i];
    var ci=0;
    while (keks.charAt(ci)==' ') ci++;
    keks=keks.substr(ci);
    if (keks.indexOf(name+"=") == 0) 
      return keks.substr(name.length+1);
  }
  return null;
},

// The ...elements[ name ] tricks doesn't work in GM.
// Search the element for the unit manually:
getFormElement : function(form, name)
{
  for(var i=0; i<form.elements.length; i++)
  {
    if ( form.elements[i].name == name)
      return form.elements[i];
  }
  return null;
},

getSelectionValue : function(e,def)
{
  var subsOp = e.options;
  return (subsOp.selectedIndex>=0)?this.pInt(subsOp[subsOp.selectedIndex].value): def;
},

$ : function(id)
{
  return this.getGameFrame().document.getElementById( id );
},

/**
 * Escapes a string for use in object dumps,
 * without any prototype magic.
 */
escapeString : function(str)
{  var sb = "";
  for (var i=0;i<str.length;i++)
  {
    var c=str[i];
    if ((c>=0x000 && c<=0x01F) || (c>=0x007F && c<=0x09F))
    {
      // Use Unicode
      sb += "\\u";
      var hexval= str.charCodeAt(i).toString(16);
      while( hexval.length<2) hexval = "0"+hexval;
      sb += hexval;
    }
    else
      switch (c)
      {
        case "'" : sb += "\\'" ; break;
        case '"' : sb += "\\\""; break;
        case '\\': sb += "\\\\"; break;
        case '/' : sb += "\\/" ; break;
        case '\b': sb += "\\b" ; break;
        case '\f': sb += "\\f" ; break;
        case '\n': sb += "\\n" ; break;
        case '\r': sb += "\\r" ; break;
        case '\t': sb += "\\t" ; break;
        default  : sb += c     ; break;
      }
  }
  return sb;
},

/**
 * JSON like strinigify funtion.
 * Creates simple javascript source from objects, but not real JSON.
 */
toString : function(obj)
{
  if (obj===null) return 'null';
  
  switch (typeof obj) 
  {
    case 'undefined':
    case 'unknown'  : return '';
    case 'function' :
    case 'number'   :
    case 'boolean'  : return obj.toString();
    case 'string'   : 
      return '"'+this.escapeString(obj)+'"';
    case 'object':
      if (obj.nodeType != 1)
      {
        var x=[];
        if ('splice' in obj && 'join' in obj)
        { // Array
          for (var e in obj) 
            x.push(this.toString(obj[e]));
          return '['+x.join(',')+']';
        }
        else
        {
          for (var e in obj) 
            x.push( e+':'+this.toString(obj[e]));
          return '{'+x.join(',')+'}';
        }
      }
    break;
  }
  return obj.toString();
},

/** Get absolute top position inside the page. */
getTop : function(el)
{
   var y = 0;
   while( el != null ){  y += el.offsetTop; el = el.offsetParent; }
   return y;
},

/** Get absolute left position inside the page. */
getLeft : function (el) 
{
   var x = 0;
   while(el!=null){ x += el.offsetLeft; el = el.offsetParent;}
   return x;
},

/** 
 * Opens a pop-up with text
 * @param title  {String} Title
 * @param text   {String} text
 * @param hook   {Node}   Element to center above (or null)
 * @param width  {Number} width in pixel
 * @param height {Number} height in pixel
 */
inlinePopup : function (title, text, hook, width, height ) 
{
  var x = 200;
  var y = 200;
  
  if ( hook )
  {
    x = this.getLeft(hook);
    y = this.getTop(hook);
  }
  
  var p = this.$('KF_inline_popup');
  if ( !p )
  {
    var d = this.getGameFrame().document;
    p = d.createElement("div");
    p.id = "KF_inline_popup";
    p.style.position="absolute";
    p.style.display="none";
    p.border="1px solid black";
    d.getElementsByTagName("BODY")[0].appendChild( p );
  }
  p.style.left  = (x-width/2)+"px";
  p.style.top   = (y-height/2)+"px";
  p.style.width = width +"px";
  p.style.height= height+"px";
  
  p.innerHTML = "<table height='100%' class='main'><tr><th width='100%'>"+title+"</th><th><a href=\"javascript:KungFu.closeInlinePopup();\">[X]</a></th></tr><tr><td colspan=2>"+text+"</td></tr></table>";
  
  p.style.top = (y-200)+'px';
  p.style.left= (x-200)+'px';
  p.style.display = 'block';
},

closeInlinePopup : function()
{
  var p = this.$('KF_inline_popup');
  if ( p ) 
  {
      p.style.display="none";
  }
},

map : {

  // Back reference to parent
  cf : null,

  /**
   * Current user.
   * Currently a little bit hard to detect ("user" cookie is httpOnly, not accessible by JS).
   * So this value is "detected" if he map screen is displayed and stored in GM storage.
   * See "modMapPage" for details.
   */
  user : null, 

  /** 
   * Version (needed for storage) 
   * If changed, the configuration (stored in GM storage) is resetted
   * to prevend the script from crashing.
   */
  mapVersion : "0.1",
  mapConfig : null,
  
  setMapConfig : function( json )
  {
    this.mapConfig = this.cf.parseConfig( json, this.mapVersion, "Map" );
    if (this.mapConfig)
    {
      if ( this.mapConfig.farmMinPoints   === undefined) this.mapConfig.farmMinPoints =1500;
      if ( this.mapConfig.farmMaxPoints   === undefined) this.mapConfig.farmMaxPoints =3600;
      if ( this.mapConfig.minFarmAttTime  === undefined) this.mapConfig.minFarmAttTime=6;
      if ( this.mapConfig.farmTimeFactor  === undefined) this.mapConfig.farmTimeFactor=0;
      
    }
    else
    {
      this.mapConfig = this.getDefaultMapConfig();
    }
  },

  /**
   * Adds map option checkboxes 
   */
  showMapConfig : function(opParent)
  {
    var w = this.cf.getGameFrame();
    var d = w.document;
  
    var opHtml = 
      "<form action='javascript:;'><table><tr><th>"+this.cf.text("MapOverlayOptions")+"</th></tr><tr>"
    + "<td>"
    + "<input type='checkbox' id='KF_showPoints' "+(this.mapConfig.showPoints ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showPoints\");'>"
    + "<label for='KF_showPoints'>"+this.cf.text("showPoints")+"</label><br/>"

    + "<input type='checkbox' id='KF_showName' "+(this.mapConfig.showName ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showName\");'>"
    + "<label for='KF_showName'>"+this.cf.text("showName")+"</label><br/>"
   
    + "<input type='checkbox' id='KF_showOwner' "+(this.mapConfig.showOwner ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showOwner\");'>"
    + "<label for='KF_showOwner'>"+this.cf.text("showOwner")+"</label><br/>"

    + "</td></tr></table></form>";

    var odiv = d.getElementById('KF_mapOptions');
    if ( !odiv)
    {
      if ( opParent ) 
      {
        odiv = d.createElement("TD");
        odiv.colSpan=2;
        odiv.id = "KF_mapOptions";
        odiv.innerHTML = opHtml;
        var tr = d.createElement("TR");
        tr.appendChild( odiv );
        opParent.appendChild( tr );
      }
    }
    else
      odiv.innerHTML = opHtml;
  },

  /**
   * Stores current configuration to GM persistency.
   */
  storeMapConfig : function ()
  {
    var json = this.cf.toString( this.mapConfig );
    //GM_log( "JSON: "+json );
    json += "/*v-"+this.mapVersion+"*/";
  
    // Workaround for GM security restrictions.
    window.setTimeout( GM_setValue, 0, 'mapCfg',json );
  },
  
  getDefaultMapConfig : function()
  {
    var cfg = 
    {


        showPoints        : false,
        showName          : false,
        showOwner         : false,
        
        farmMinPoints     : 1500,
        farmMaxPoints     : 2500,
        minFarmAttTime    : 6,    // Minimal time (h) for a farm attack after last attack.
        farmTimeFactor    : 0,
        
        lastAttOL:
        {
          minOpacity : 0.4, // minimum opac value for attack overlays.
          maxAge     : 7   // maximum age of attack for overlays to display.
        }
    }
    return cfg;
  },

  toggleMapOption : function( opt )
  {
    this.mapConfig[opt] = !this.mapConfig[opt] ;
    
    if ( opt == 'showPoints' ||
         opt == 'showName'   ||
         opt == 'showOwner' )
    {
      // This options are exclusive.
      if ( opt != "showPoints") this.mapConfig.showPoints = false;
      if ( opt != "showName"  ) this.mapConfig.showName   = false;
      if ( opt != "showOwner" ) this.mapConfig.showOwner  = false;
    }    

    this.storeMapConfig();   
    this.modMapPage();
  },

  /**
   * Extracts informations about a town from a map html element
   * @param town : a town html element on map
   */
  getTownInfo: function(town) 
  {
      var reMP = /onmouseover="map_popup\((.+?)\)"/;
      var mMP = reMP.exec(town.innerHTML);
      if (mMP) {
          // eval the argument list of the JS onMouseOver pop-up call as array.
          var tA = eval("[" + mMP[1] + "]"),
  
          /* Transform the array in a human readable format 
           * If DS change this format, please check the "map_popup" function
           * and ajust the following code:
           */
          tInfo = {
            bonusImg: tA[1],
            bonusTxt: tA[2],
            points  : tA[3],
            tribe   : tA[5],
            townGrps: tA[6],
            moral   : tA[7],
            townID  : tA[8],
            srcID   : tA[9],
            lastAtt : {
              date    : this.cf.pDate( tA[10] ),
              
            }
          };
  
          var koordRE = /(.+) \((\d+)\|(\d+)\) K(\d+)/;
          koordRE.lastIndex = 0;
          var koord = koordRE.exec( tA[0] );
          if ( koord )
          {
            tInfo.name = koord[1];
            tInfo.x    = koord[2];
            tInfo.y    = koord[3];
            tInfo.k    = koord[4];
          };
  
          var ownerRE = /(.+) \((.+) (?:[A-Za-z]+)\)/;
          var owner = ownerRE.exec( tA[4] );
          if ( owner )
          {
            tInfo.owner = {
              name   : owner[1],
              points : parseInt( owner[2] ),
              color  : town.style.backgroundColor
            };
          }
          
          tInfo.attacking = !!( town.innerHTML.indexOf( "<img src=\"graphic/map/axe_attack.png\"" )>0);
          
          return tInfo;
      }
      return null;
  },
  
  /**
   * Get a small overlay to display infos about the 

   * Only for towns without owner. 
   * @param town : a town html element on map
   */
  getLastAttackOverlay : function(tInfo) 
  {
    if ( tInfo && tInfo.lastAtt.date )
    {
      var now = new Date();
      var age = now.getTime()-tInfo.lastAtt.date.getTime();
      
      age /= 86400000.0;
     
      var maxage = this.mapConfig.lastAttOL.maxAge;
      var minopa = this.mapConfig.lastAttOL.minOpacity;
     
      if (age<0) age=0;
      if (age <= maxage)
      { 
        var ageOpac = 1.0 + ((minopa-1)*(age/maxage));
      
        var e = document.createElement("div");
        with(e.style){
          opacity   = ageOpac.toFixed(1);
          lineHeight="9px";
          textAlign ="left";
          fontSize  ="9px";
          position  ="absolute";
          color     ="white";
          marginLeft="6px"; 
          marginTop ="10px";};
        with (tInfo){e.innerHTML =
           "<img style=\"background-color:#F7EED3;\" height=10 src='graphic/"+lastAtt.resImg+"'/>"
          +this.cf.pad(lastAtt.date.getDate(),2)+"."+this.cf.pad(lastAtt.date.getMonth()+1,2)+"<br/>"
          +"<img style=\"background-color:#F7EED3;\" height=10 src='graphic/"+lastAtt.fightImg+"'>"
          +this.cf.pad(lastAtt.date.getHours(),2)+":"+this.cf.pad(lastAtt.date.getMinutes(),2);}
        return e;
      }
    }
    return null;
  },
  
  /**
   * Get a small overlay to display groups on a town inside the map
   * @param town : a town html element on map
   */
  getGroupOverlay: function(tInfo) 
  {
    if ( tInfo )
    {
        if (tInfo.townGrps) {
            var e = document.createElement("div");
            with(e.style)
            {
              lineHeight="9px";
              marginLeft="10px";
              fontStyle="italic";
              color="yellow";
              textAlign="left";
              fontSize="9px";
              position="absolute";
              width="30px";
            };
            if ( tInfo.townID === tInfo.srcID )
              e.style.textDecoration="underline";
            e.innerHTML = this.cf.escapeHTML(tInfo.townGrps);
            return e;
        }
    }
    return null;
  },
  
  /**
   * Get a small overlay to display current points on a town inside the map
   * @param town : a town html element on map
   */
  getPointOverlay: function(tInfo) 
  {
    if ( tInfo )
    {
        if (tInfo.points) {
            var e = document.createElement("div");
            with(e.style)
            {
              lineHeight="9px";
              marginLeft="10px";
              color= "white";
              textAlign="right";
              fontSize="9px";
              position="absolute";
              width="30px";
              marginTop ="10px";
            };
            if (tInfo.owner && tInfo.owner.name == this.user) 
              e.style.color= tInfo.owner.color;
            if ( tInfo.townID === tInfo.srcID )
              e.style.textDecoration="underline";
            e.innerHTML = tInfo.points;
            return e;
        }
    }
    return null;
  },

  /**
   * Get a small overlay to display the name of a town inside the map
   * @param town : a town html element on map
   */
  getNameOverlay: function(tInfo) 
  {
    if ( tInfo )
    {
        // Name makes only sense for none-barbarians
        if (tInfo.name && tInfo.owner) {
            var e = document.createElement("div");
            var own = (tInfo.owner.name == this.user);
            with(e.style)
            {
              lineHeight="7px";
              marginLeft="10px";
              textAlign="left";
              fontSize="9px";
              // For own village, use color as text color.
              color= own? tInfo.owner.color : "white";
              position="absolute";
              width="45px";
              height="23px"
              paddingBottom ="2px";
              overflow = "hidden";
              // For foreign village, show color as underline.
              // Mark current village.
              if ( tInfo.townID === tInfo.srcID ) textDecoration="underline";
              if (!own)
              {
                borderBottomColor=tInfo.owner.color;
                borderBottomStyle="solid";
                borderBottomWidth="3px";
              }
            };
            e.innerHTML =  this.cf.escapeHTML(tInfo.name,"<wbr>");
            return e;
        }
    }
    return null;
  },

  /**
   * Get a small overlay to display current moral on a town inside the map
   * @param town : a town html element on map
   */
  getMoralOverlay: function(tInfo) 
  {
    if ( tInfo )
    {
        if (tInfo.moral && tInfo.owner && tInfo.owner.name != this.user) {
            var e = document.createElement("div");
            with(e.style)
            {
              lineHeight="12px";
              marginLeft="11px";
              color= "white";
              textAlign="right";
              fontSize="10px";
              position="absolute";
              width="28px";
              marginTop ="9px";
              borderBottomColor=tInfo.owner.color;
              borderBottomStyle="solid";
              borderBottomWidth="3px";
            };
            e.innerHTML = tInfo.moral+"%";
            return e;
        }
    }
    return null;
  },
  
  /**
   * Get a small overlay to display owners on a town inside the map.
   * @param town : a town html element on map
   */
  getOwnerOverlay: function(tInfo) 
  {
    if ( tInfo )
    {
        if (tInfo.owner && tInfo.owner.name != this.user) 
        {
            var e = document.createElement("div");
            with(e.style)
            {
              lineHeight="9px";
              marginLeft="10px";
              fontStyle="italic";
              color="white";
              borderBottomColor=tInfo.owner.color;
              borderBottomStyle="solid";
              borderBottomWidth="3px";
              textAlign="left";
              fontSize="9px";
              position="absolute";
              width="30px";
              overflow="hidden";
            };
            e.innerHTML = this.cf.escapeHTML(tInfo.owner.name,"<wbr>");
           
            return e;
        }
    }
    return null;
  },
  
  removeOverlay : function(el)
  {
    if (el.id == "__hfOverlay")
    {
      el.parentNode.removeChild(el);
      return true;
    }
    else
    {
      for (var i=0;i<el.childNodes.length;)
      {
          if ( !this.removeOverlay(el.childNodes[i]) ) i++;
      } 
      return false;
    }
  },
  
  addOverlay : function(town,ol)
  {
    if (ol) 
    {
      this.removeOverlay(town.parentNode);
      ol.id = "__hfOverlay";
      town.parentNode.insertBefore(ol, town.nextSibling);
    }
  },

  linkBackup : {},
  barbarian : [],

  modMapPage : function()
  {

    var d = this.cf.getGameFrame().document;
  
    // Test if we are on the map screen
    
    var xpath = w.document.evaluate(
                "//table[@class='map_container']", w.document, null
                ,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  
    if (xpath.singleNodeValue) 
    {
      var mcfg = this.mapConfig;
    
      /* Map screen. Show last attacks for b-villages and 
         redirect links of foreign villages to command screen 
         and own village to map link.
      */
      
      var koordRE = /\((\d+)\|(\d+)\)/;
      var homeX = 0;
      var homeY = 0;

      // maxmimum date for last attack to auto-attack again.
      var maxFarmAttDate = new Date().getTime()-(12*60*60*1000);

      /* Ok.. for some fancy functionality we need the users name.
       * But I know no easy way to get this information. The cookie is
       * httpOnly-protected (no way to access it from javascript).
       * TODO: Some simpler way?
       *
       * So I will search for a map town link with the same coordinates 
       * as used in frame title. The owner of this town should be our "user".
       */

      var htCoord = koordRE.exec( w.document.title );
      if ( htCoord && htCoord.length>0)
      {

        var htXPath = w.document.evaluate(
                      "//td/a[contains(@onmouseover,' ("+homeX+"|"+homeY+") K')]", w.document, null
                      ,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (htXPath.singleNodeValue)
        {
          var tHomeInfo = this.getTownInfo(htXPath.singleNodeValue.parentNode);
          // Paranoia check: src == town -> HOME!
          if ( tHomeInfo && tHomeInfo.townID == tHomeInfo.srcID )
          {
            if ( this.user != tHomeInfo.owner.name )
            {
              this.user = tHomeInfo.owner.name;
              window.setTimeout( GM_setValue, 0, 'user', this.user );
              // GM_log("Stored new user name '"+this.user+"'" );
            }
          }
        }
      }

      var modLinks = 
          mcfg.redirectVill2MapCenter || 
          mcfg.redirectVill2Vill || 
          mcfg.redirectVill2Vill;

      var currId = 0;
      var now = new Date().getTime();
      var minFarmAttTime = now-(this.mapConfig.minFarmAttTime*3600000);

      
      {
        // We need the current village-id.
        // Org: /game.php?village=ddd&screen=map&x=X&y=Y"
        var vidRe= /\?village=(\d+)&/; 
        var htId = vidRe.exec( w.document.URL );
        if (htId)
          currId = htId[1];
        else
          GM_log("current village ID not found. URL="+ w.document.URL);
      }
      
      this.barbarian = [];
      
      var barbVills = [];
      
      var as = xpath.singleNodeValue.getElementsByTagName("a");
      var minTime = now;
      for (var i=0;i<as.length;i++)
      { var a=as[i];
        if (a.href.indexOf("/game.php?village=") >= 0 && a.href.indexOf("http:") == 0) 
        {
          var town = a.parentNode;
          var tInfo = this.getTownInfo(town);
          if ( tInfo )
          {
            var attTime = (tInfo.lastAtt.date==null) ? 0 : tInfo.lastAtt.date.getTime();
          
            // Collect barbarians 
            if ( tInfo.x            &&                              // Must have koordinates (should always)
                 (!tInfo.owner)     &&                              // No owner (barbarians) 
                 (!tInfo.attacking) &&                              // not currently attacked
                 ((tInfo.lastAtt.date == null) || attTime <= minFarmAttTime) && // last attack is old enough
                 (tInfo.points >= mcfg.farmMinPoints) && (tInfo.points <= mcfg.farmMaxPoints) && // point range
                 (!tInfo.lastAtt.lost)                              // Not lost!
               ) 
            {
              if (minTime>attTime) minTime=attTime;
              if ( mcfg.showFarmRang )
                barbVills.push( a );

              this.barbarian.push( { id:tInfo.townID, x:tInfo.x, y:tInfo.y, l: attTime } );
            }
          
            var own = !!(tInfo.owner && tInfo.owner.name==this.user);
          
            var lk = this.linkBackup[tInfo.townID];
            if ( !lk )
            {
              lk = a.href;
              this.linkBackup[tInfo.townID] = lk;
            }



            var ol = null;

            /* Insert last attack overlay */
            if ( (mcfg.showLastAtt4BVill  && tInfo.lastAtt.date && !tInfo.owner) ||
                 (mcfg.showLastAtt4FVill  && tInfo.lastAtt.date && !own))
            {
              ol = this.getLastAttackOverlay(tInfo);
            } 
            
            if (ol==null && mcfg.showPoints)
              ol = this.getPointOverlay(tInfo);
            if (ol==null && mcfg.showName) 
              ol = this.getNameOverlay(tInfo);
            if (ol==null && mcfg.showOwner) 
              ol = this.getOwnerOverlay(tInfo);
            
            if ( ol )
              this.addOverlay(a,ol);
            else
              this.removeOverlay(a.parentNode);
          }
        }
      }
      
      // Normalize Age. Oldest age gets 0, newest gets 1.
      {
        // Max. 3 days
        var maxPeriode = (3*24*60*60*1000);
        if( minTime < (minFarmAttTime-maxPeriode)) minTime = minFarmAttTime-maxPeriode;
        
        var minTimeNormFaktor = 1/(minFarmAttTime-minTime);
        for (var i=0;i<this.barbarian.length;i++)
        {
          var b= this.barbarian[i];
          var time = b.l-minTime;
          if (time<0) time = 0;
          
          b.l = minTimeNormFaktor * time;
          
          if ( mcfg.showFarmRang )
          {
            var ba = barbVills[i];
            if (ba)
            {
              var devo = document.createElement("div");
              with(devo.style){
                lineHeight="9px";
                textAlign ="left";
                fontSize  ="9px";
                position  ="absolute";
                color     ="white";
                marginLeft="6px"; 
              }
              var xd = b.x-homeX;
              var yd = b.y-homeY;
              var gf=(b.l*mcfg.farmTimeFactor)+Math.sqrt( xd*xd + yd*yd );
              
              devo.innerHTML = gf.toFixed(2);
              devo.id = "__hfOverlay";
              ba.parentNode.insertBefore(devo, ba.nextSibling);
            }
          }          
        }
      }

      if ( (homeX || homeY) && !this.cf.$("_KF_autoButton") )
      {
         
        var op = d.getElementsByTagName("H2");
        if ( op )
        {
          op = op[0];
          var span = d.createElement("span");
          span.style.textAlign= "right";

          span.style.cssFloat= "right";
          
          if ( this.barbarian.length )
            span.innerHTML = "<i>Farmziele:</i>"+this.barbarian.length;
          else
            span.innerHTML = this.cf.text("NoAutoFarmTargets");
          op.parentNode.insertBefore( span, op);
        }
      }
      
      var opParent = d.getElementById('inputx');
      while( opParent && opParent.tagName != "TBODY") opParent = opParent.parentNode;
      this.showMapConfig(opParent);
    }
  }
},

/**
 * Fill in units into command form according to configuration
 */
fillInUnits : function( fm, config )
{
  var cfgs = this.getUnitConfig();
  var done = false;
  while( !done )
  {
    // Sometimes we have to loop again if some substitutions occure.
    done = true;
    for (var i=0;i<this.units.length;i++)
    {
      var cfg=cfgs[i];
    
      var f = this.getFormElement( fm, this.units[i] );
      
      if (cfg.c > 0) {
        var nb=cfg.c;
        if ( f )
        {
          var fl=f, na=10000;
          while (fl && !fl.href) fl=fl.nextSibling;
          if (fl) {
              var re = /(\w+),.20(\d+)/;
              mt=re.exec(fl.href);
              if (mt) if (mt[1] == f.name) na = parseInt(mt[2]);
          }
        }
        else
          na = 0;
        
        if (nb>na)
        {
          if (cfg.subs>=0 && cfg.subs!=i) 
          {
            cfgs[cfg.subs].c += Math.round( ((nb - na)*cfg.x) );
            cfgs[i].c = na;
            nb = na;
            done = false;
          }
          else if (cfg.subs==-1)
          {
            nb = na;
          }
        }
        if (f)
          f.value = nb;
      }
    }
  }
},

////////////////////////////////////////
// Mod functions for each page.
////////////////////////////////////////

modCombined : function(parentNode)
{
  var w = this.getGameFrame();
  var d = w.document;

  if ( this.config.combinedShowSumRow )
  {
  
    var sum = [];
    for (var i=0;i<30;i++) sum[i] = 0;

    // should find all td with snob values (to get the last entry in a row 
    // and to get only rows with values, without any decorations)
    var xp = d.evaluate( "//table/tbody/tr/td[a[contains(@href,'&screen=snob')]]",d,null,
                          XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);

    var td;
    var firstIdx =30;
    var lastIdx  =-1;

    var unitTableBody = null; 

    while( td = xp.iterateNext() )
    {
      td = td.wrappedJSObject;
      
      if (!unitTableBody) unitTableBody = td.parentNode.parentNode;
      while( td.previousSibling )
      {
        if (td.cellIndex)
        {
          var tval = td;
          while (tval.firstChild && tval.firstChild.tagName=="A") tval = tval.firstChild;
          
          if (td.cellIndex > lastIdx ) lastIdx = td.cellIndex;
          if (td.cellIndex < firstIdx) firstIdx= td.cellIndex;

          sum[td.cellIndex] += this.pInt( tval.innerHTML );

          if ( td.innerHTML.indexOf( "screen=farm" )>0 ) break;
          
          
        }
        td = td.previousSibling;
      }
    }
    
    if (unitTableBody)
    {
      sum = sum.slice( firstIdx, lastIdx+1 );
      var sumRow = d.createElement("tr");
      var td;
      sumRow.className="nowrap row_a";
      // innerHTML doesn't work on TR.
      sumRow.appendChild( td = d.createElement("TD") );
      td.colSpan = firstIdx;
      td.innerHTML = this.text("UnitSums");
      
      for (var i=0;i<sum.length;i++)
      {
        var c = sum[i];
        sumRow.appendChild( td = d.createElement("TD") );
        if (c==0) td.className = "hidden";
        td.align="right";
        td.innerHTML = c;
      }
      unitTableBody.appendChild( sumRow );
    }
  }
},

modUnits : function(parentNode)
{
  var w = this.getGameFrame();
  var d = w.document;

  if ( this.config.unitsShowSumRow )
  {

    // Subtype of unit overview
    var subType = "complete";

    {
      var subtRE = /&units_type=(\w+)/;
      var subt = subtRE.exec( d.URL );
      if ( subt && subt.length>1 )
        subType=subt[1].toLowerCase();
    }
    
    var sum = [];
    for (var i=0;i<30;i++) sum[i] = 0;

    // Rows are identified by their class.
    // The array contains all supported types. 
    // For each class one row is created
    // "toGlob" specifies if the row should be summerized.
    var rows = [
                 { className : "units_home"  , title: null, amount: null, toGlob : true  },
                 { className : "units_there" , title: null, amount: null, toGlob : false },
                 { className : "units_away"  , title: null, amount: null, toGlob : true  },
                 { className : "units_moving", title: null, amount: null, toGlob : true  }
              ];

    var unitTypes=0;
    var foundRows=0;
    var startIdx=0;
    var unitBody=null;
    var ri,ci;

    for (ri=0 ; ri<rows.length; ri++)
    {
      var r = rows[ri];
      var xp = d.evaluate( "//tr[@class='"+r.className+"']",d,null,
                          XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);

      var tr;
      while( tr = xp.iterateNext() )
      {
        if ( tr.cells.length >= 10)
        {
          if (!unitBody) 
          { 
            unitBody = tr.parentNode;
            // Number of unit-types on this server 
            // But this is true only for the first rows, so calc the valu eone once.
            switch (subType)
            { case "complete":       // All
                // First cell has row-title
                startIdx = 0;
                // last cell with link.
                unitTypes = tr.cells.length-2;
                break;
              case "support_detail": // Defense
                // Second cell has row-title
                startIdx = 1;
                // last cell with link.
                unitTypes = tr.cells.length-3;
                break;
              case "away_detail":    // Support
                // Second cell has row-title
                startIdx = 1;
                // last cell with link.
                unitTypes = tr.cells.length-3;
                break;
              default:
                // All other types are not supported (yet)
                // There is no class attribute to easily detect the rows.
                return;
            }
          }

          if ( !r.title )
          {
            r.title= tr.cells[startIdx].innerHTML;
            foundRows++;
          }

          if ( !r.amount )
          {
            r.amount = [];
            for (ci=0; ci<unitTypes;ci++) r.amount.push(0);
          }

          for (ci=0; ci<unitTypes;ci++) r.amount[ci] += this.pInt(tr.cells[startIdx+ci+1].innerHTML);
        }
      }
    }

    if (unitTypes>0 && foundRows>0)
    {
      // Helper to create number cells.
      setCell = function( td, c )
      {
        td.align="right";
        if (c==0) td.className = "hidden";
        td.innerHTML = c;
      };

      var sum = [];
      for (ci=0; ci<unitTypes;ci++) sum.push(0);

      var td;
      var tr = d.createElement("tr");
      tr.vAlign="top";
      // innerHTML doesn't work on TR.
      tr.appendChild( td = d.createElement("TD") );
      td.rowSpan =foundRows+3;
      td.innerHTML = "<b><i>"+this.text("UnitSums")+"</b></i>";
      unitBody.appendChild(tr);

      // One Result row for each category
      for (ri=0 ; ri<rows.length; ri++)
      {
        var r = rows[ri];
        if ( r.title )
        {
          var tr = d.createElement("tr");
          tr.className = r.className;
  
          tr.appendChild( td = d.createElement("TD") );
          td.innerHTML = r.title;

          for (ci=0; ci<unitTypes;ci++)
          {
            var c = r.amount[ci];
            if ( r.toGlob )
              sum[ci] += c;
            tr.appendChild( td = d.createElement("TD") );
            setCell( td, c );
          }
          // Most right cell contains sum of this row.
          tr.appendChild( td = d.createElement("TD") );
          setCell( td, this.sumArray(r.amount) );
          unitBody.appendChild( tr );
        }
      }
      
      var globSum = this.sumArray(sum);
      
      // Finally the sum for all rows
      if ( foundRows>1 )
      {
        var tr = d.createElement("tr");
        tr.appendChild( td = d.createElement("TD") );
        td.innerHTML = this.text("SumAll" );
        for (ci=0; ci<unitTypes;ci++)
        {
          tr.appendChild( td = d.createElement("TD") );
          td.style.borderTopWidth="3px";
          td.style.borderTopStyle="double";
          setCell( td, sum[ci] );
        }
        tr.appendChild( td = d.createElement("TD") );
        td.style.borderTopWidth="3px";
        td.style.borderTopStyle="double";
        td.align="right";
        setCell( td, globSum );
        unitBody.appendChild( tr );
      }
      
      // percentage
      if (globSum>0)
      {
        var tr = d.createElement("tr");
        tr.appendChild( td = d.createElement("TD") );
        for (ci=0; ci<unitTypes;ci++)
        {
          tr.appendChild( td = d.createElement("TD") );
          if (sum[ci]==0) td.className = "hidden";
          td.innerHTML = "<i>"+(100.0*sum[ci]/globSum).toFixed(1)+"%</i>";
        }
        tr.appendChild( td = d.createElement("TD") );
        unitBody.appendChild( tr );
      }
      
    }
  }
},

modProduction : function(parentNode)
{
  var w = this.getGameFrame();
  var d = w.document;

  if ( this.config.resShowSumRow )
  {

    // TODO: "holz", "lehm" ...?? are that names used on all servers? 
    //        Hu... a very old part of the game.
    var rows = [
                 { imgPattern : "holz.png" , url: null, amount:0},
                 { imgPattern : "lehm.png" , url: null, amount:0},
                 { imgPattern : "eisen.png", url: null, amount:0}
               ];

    var ri;

    var tabBody = null;

    for(ri=0;ri<rows.length;ri++)
    {
      var r = rows[ri];
      var xp = d.evaluate( "//td/img[contains(@src,'"+r.imgPattern+"')]", d, null
                ,XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
              
      var e;
      while( e = xp.iterateNext() )
      {
        if (!r.url) r.url = e.src;
        
        var c = 0;
        var el = e.nextSibling;
        while( el && el.tagName != "IMG" )
        {
          if ( !el.tagName )
            c = (c*1000)+this.pInt(el.nodeValue);
          el = el.nextSibling;
        }
        r.amount += c;
        while (e && !tabBody) 
        {
          if (e.tagName == "TBODY") tabBody = e ;
          e = e.parentNode;
        }
      }
    }
    
    if ( tabBody)
    {
      var tr = d.createElement("tr");
      tr.appendChild( td = d.createElement("TD") );
      td.colSpan = 3;
  
      var html = "<table><tr style='white-space:nowrap;'><td rowspan=2 width='100%' align='right' valign='center'><i><b>"+this.text("SumAll")+"</b></i></td>"
      var sum = 0;
      // sum row
      for(ri=0;ri<rows.length;ri++)
      {
        var r = rows[ri];
        sum += r.amount;
        html += "<td style='border-top:3px double black'><img alt='' src='"+r.url+"'/>"+this.fInt(r.amount)+"</td>";
      }
      // Percentage row
      html += "</tr><tr align='right'>";
      for(ri=0;ri<rows.length;ri++)
         html += "<td><i>"+(100.0*rows[ri].amount/sum).toFixed(1)+"%</i></td>";
        
      td.innerHTML =  html;
      
      tabBody.appendChild( tr );
    }
  }
},

modOverviewPage : function()
{
  try {
    // Test if we are on the overview screen
    var hiddenOV = this.$('overview');
    if ( hiddenOV && hiddenOV.tagName=="INPUT" )
    {
      switch( hiddenOV.value )
      { case "prod":
        {
          this.modProduction(hiddenOV.parentNode);
        } break;
        case "combined":
        {
          this.modCombined(hiddenOV.parentNode);
        } break;
   
       case "units":
        {
          this.modUnits(hiddenOV.parentNode);
        } break;
      }
      return;
    }
  } catch ( err )
  {
    GM_log( "Can't mod Overview Page: "+err );
  }
  
},

modPropertyPage : function()
{
  try
  {
    var d = KungFu.getGameFrame().document;
    
    // Check if we are in property screen
    if ( d.URL.indexOf( "screen=settings" )>0 )
    {
      // The next we can do also via xpath, but perhaps it's more fail safe to use "whiles".
      
      // Get heading
      var oparent = d.getElementsByTagName("H2");
      if ( oparent ) oparent = oparent[0];
      if ( oparent ) oparent = oparent.nextSibling;
      // Go to main table
      while( oparent && oparent.tagName != "TABLE") oparent=oparent.nextSibling;
      // Go to "TD"
      while( oparent && oparent.tagName != "TD") oparent=oparent.firstChild;
      // Go to last "TD"
      while( oparent.nextSibling && oparent.nextSibling.tagName == "TD") oparent=oparent.nextSibling;
      if ( oparent )
        KungFu.showConfig(oparent);
      else
        alert( KungFu.text("no_option_found") );
    }
  } catch ( err )
  {
    GM_log( "Can't mod Property Page: "+err );
  }
},

/**
 * Helper to create the gerneric used "auto" button.
 */
createAutoButton : function(d, onClick)
{
  var span = d.createElement("span");
  span.id="_KF_autoButton";
  span.style.cssFloat = "right";
  span.style.textAlign= "center";
  span.innerHTML = "<input accesskey='k' type='submit' style='font-size: 10pt;' value='"+this.text("AutoButton")+"' class='attack' onClick=\""+onClick+";return false;\"'><br><font color='grey' size=-2>[Alt-Shift-K]</font>";

  var xp= d.evaluate( "//p[@class='server_info']", d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  var p = xp.singleNodeValue;
  if (p)
  {
    p = p.parentNode;
    p.insertBefore( span, p.firstChild);
  }
  return span;
},

go : function(a)
{
  this.getGameFrame().location.href = a.href;
},

// Callback for "auto" button on village info screen.
goCommandLink : function()
{
  var as = this.getGameFrame().document.getElementsByTagName("a");
  for (var i=0;i<as.length;i++) 
  { var a=as[i];
    if (a.href.indexOf("screen=place&mode=command") >= 0 && a.href.indexOf("http:") == 0)
      this.go( a );
  }
},

sendTroops : function()
{
  var form=this.$('KFAutoForm');
  
  var x = this.getFormElement(form,'x').value;
  var y = this.getFormElement(form,'y').value;
  if ( x.length > 0 && y.length > 0 )
  {
    this.fillInUnits(form,KungFu.config);
    this.getFormElement(form,'attack').click();
  }
  else if ( x.length==0 && y.length==0 )
  {
    // End of "auto sequence".
   
    // Go back to map.
    var d = this.getGameFrame().document;
    var xp = d.evaluate( "//a[contains(@href,'screen=map')]", d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    var p = xp.singleNodeValue;
    if (p)
    {
      w.location.href = p.wrappedJSObject.href;
    }
  }
},


modVillageInfoPage : function()
{
  try {
    var d = this.getGameFrame().document;
    if ( d.URL.indexOf( "&screen=info_village" ) > 0 ) 
    {
        /* Village overview. Auto button should go to command screen */
      this.createAutoButton( d, "KungFu.goCommandLink()" );
    }
  } catch ( err )
  {
    GM_log( "Can't mod Village Info Page: "+err );
  }
},

modPlacePage : function()
{
  try {
    var d = this.getGameFrame().document;
    var xp= d.evaluate(
            "//form[contains(@action,'&try=confirm')]"
            ,d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (xp.singleNodeValue)
    {
      xp.singleNodeValue.wrappedJSObject.id = "KFAutoForm";
      // It's the place screen. Add the "auto" button at the top.
      var span = this.createAutoButton( d, "KungFu.sendTroops();" );
      
      // TODO: Add config button.
    }
  } catch ( err )
  {
    GM_log( "Can't mod Place page: "+err );
  }
},

modConfirmPage : function()
{
  try {
    var d = this.getGameFrame().document;
    var xp= d.evaluate(
            "//form[contains(@action,'screen=place&action=command')]"
            , d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (xp.singleNodeValue)
    {
      xp.singleNodeValue.wrappedJSObject.id = "KFAutoForm";
      // commit command screen. Add the "auto" button at the top.
      this.createAutoButton( d, "KungFu.getFormElement(KungFu.$('KFAutoForm'),'submit').click()" );
    }
  } catch ( err )
  {
    GM_log( "Can't mod Confirm page: "+err );
  }
},

//////////////////////////////////////////////
/// Train Mods and Configuration. TODO!
//////////////////////////////////////////////

// IN WORK

trainConfig : null,

trainVersion : "0.1",

showTrainConfig : function(parent)
{
},

storeTrainConfig : function()
{
  var json = this.toString( this.trainConfig );
  json += "/*v-"+this.trainVersion+"*/";

  // Workaround for GM security restrictions.
  window.setTimeout( GM_setValue, 0, 'trainCfg',json );
  GM_log("Stored "+json );
  this.showTrainConfig();
},

setTrainConfig : function(json)
{
  this.trainConfig = this.parseConfig( json, this.trainVersion, "Train" );
  if (!this.trainConfig)
  {
    this.trainConfig = this.getDefaultTrainConfig();
  }
},

getDefaultTrainConfig : function()
{
  var cfg = 
  {
  };
  return cfg;
},

modTrainMassPage : function()
{
  // TODO
},

modTrainPage : function()
{
  try {
    var d = this.getGameFrame().document;
    if ( d.URL.indexOf( "screen=train" )>0 )
    {
      this.setTrainConfig( GM_getValue("trainCfg") );
      
      var modRE = /&mode=(\w+)&/;
      var mod = modRE.exec( d.URL );
      switch( mod[1] )
      { case "mass":
          this.modTrainMassPage();
          break;
        case "train":
          break;
      }
    }
  } catch ( err )
  {
    GM_log( "Can't mod Train Page: "+err );
  }

},

//////////////////////////////////////////////
/// Build Mods and Configuration. TODO!
//////////////////////////////////////////////

// IN WORK

buildConfig : null,
buildConfigCurrentGrp : 0,

buildVersion : "0.1",

showBuildConfig : function(parent)
{
  var html = "<table><tr><th>Bauen</th></tr>";
  
  var gc = this.buildConfig.gc;
  
  html += "<tr><td><select id='_KF_BC_CHOICE' onchange='KungFu.showSubBuildConfig(this.value)'>";
  for (var gi=0;gi<gc.length;gi++)
  {
    html += "<option value='"+gi+"'"+((gi==this.currentGrp)?"selected='selected'":"")
         +  ">"+gc[gi].name+"</option>";
  }
  html += "</select> <-- <input type='text' id='_KF_BC_GROUPTXT' size=5><button onClick='KungFu.newBuildGroupConfig(KungFu.$('_KF_BC_GROUPTXT').value)'>Neu</button>";
  html += "</td></tr><tr><td id='_KF_BC_SUBAREA'></td></tr></table>";
  
  var d = this.getGameFrame().document;
  
  var div = d.getElementById("_KF_BC_SUBCFG");
  if ( !div )
  {
    div = d.createElement( "DIV" );
    div.id = "_KF_BC_SUBCFG";
    parent.appendChild( div );
  }  
  div.innerHTML = html;
  
  this.showSubBuildConfig(this.buildConfigCurrentGrp);
},

// Creates the list of buildings for one plan item
buildCfgBuildingSelector : function ( bcIndex, planIndex, itemIndex )
{
  var v = this.buildConfig.gc[bcIndex].plans[planIndex][itemIndex].t;
  
  var html = "<select onChange='KungFu.buildConfig.gc["+bcIndex+"].plans["+planIndex+"]["+itemIndex+"].t=this.value)'>";
  
  for (var b in this.buildings)
  {
    html += "<option value'"+b+"'"+(v==b?"selected='selected'":"")+">"+this.text(b)+"</option>";
  }
  html += "</select>";
  return html;

},

// Creates the list of building levels for one plan item
buildCfgBuildLevelSelector : function ( bcIndex, planIndex, itemIndex )
{
  var pi = this.buildConfig.gc[bcIndex].plans[planIndex][itemIndex];
  
  var html = "<select onChange='KungFu.buildConfig.gc["+bcIndex+"].plans["+planIndex+"]["+itemIndex+"].t=this.value)'>";
  
  for (var b in this.buildings)
  {
    html += "<option value'"+b+"'"+(v==b?"selected='selected'":"")+">"+this.text(b)+"</option>";
  }
  html += "</select>";
  return html;
  
},

showSubBuildConfig : function(index)
{
  var html = "<table>";
  var bc = this.buildConfig.gc[index];
  if ( bc )
  {
    for (var pi=0;pi<bc.plans.length;pi++)
    {
      var planC = bc.plans[pi].length;
      for (var pti=0;pti<planC;pti++)
      {
        html += "<tr>";
        if ( pti==0) html += "<td rowspan="+planC+">"+pi+"</td>";
        html += "<td><button onClick='KungFu.deleteBuildConfigPlanItem("+index+","+pi+","+pti+")'>Del</button></td>"
             +  "<td>"+this.buildCfgBuildingSelector(index,pi,pti)+"</td>"
             +  "<td>"+this.buildCfgBuildLevelSelector(index,pi,pti)+"</td></tr>";
      }
    }
  }
  html += "</table>";
  this.$("_KF_BC_SUBAREA").innerHTML = html;
},

deleteBuildConfigPlanItem : function( bcIndex, planIndex, itemIndex )
{
},

newBuildGroupConfig : function (newname)
{
  var gc = this.buildConfig.gc;
  for (var gi=0;gi<gc.length;gi++) 
  {
    if (gc[gi].name == newname) 
    { 
      this.showSubBuildConfig(gi); 
      return;
    }
    gc.push( { name : newname, plans:[] } );
    this.showSubBuildConfig(gc.length-1); 
  }

},

storeBuildConfig : function()
{
  var json = this.toString( this.trainConfig );
  json += "/*v-"+this.BuildVersion+"*/";

  // Workaround for GM security restrictions.
  window.setTimeout( GM_setValue, 0, 'buildCfg',json );
  GM_log("Stored "+json );
  this.showBuildConfig();
},

setBuildConfig : function(json)
{
  this.buildConfig = this.parseConfig( json, this.buildVersion, "Build" );
  if (!this.buildConfig)
  {
    this.buildConfig = this.getDefaultBuildConfig();
  }
},

getDefaultBuildConfig : function()
{
  var cfg = 
  {
    gc :  []
  };
  return cfg;
},

modBuildPage : function()
{
  try {
    var d = this.getGameFrame().document;
    
    if ( d.URL.indexOf( "&screen=main" )>0 )
    {
      this.setBuildConfig( GM_getValue("buildCfg") );
    }
  } catch ( err )
  {
    GM_log( "Can't mod Build Page: "+err );
  }

},

////////////////////////
/// Configuration

/**
 * Stores current configuration to GM persistency.
 */
storeConfig : function ()
{
  // First build unit configuration
  for (var idx=0;idx<this.units.length;idx++)
  {
    var unit = this.units[idx];
    this.config.units[idx].c    = this.pInt( this.$( unit+"C" ).value );
    this.config.units[idx].subs = this.getSelectionValue( this.$(unit+"N"), -2 ); 
    this.config.units[idx].x    = this.pFloat( this.$( unit+"F" ).value );
  }
  
  // Add attack overlay configurations
  var minOpa = this.pFloat( this.$("attOLMinOpac").value, 0.4 );
  var maxAge = this.pInt  ( this.$("attOLMaxAge" ).value, 99  );
  
  if (minOpa<0.1) minOpa=0.1;
  if (minOpa>1.0) minOpa=1;
  if (maxAge<0  ) maxAge=0;
  
  var mcfg = this.map.mapConfig;
  mcfg.lastAttOL.minOpacity = minOpa;
  mcfg.lastAttOL.maxAge     = maxAge;
  mcfg.farmMinPoints        = this.pInt( this.$( "autoFarmMinPoints" ).value );
  mcfg.farmMaxPoints        = this.pInt( this.$( "autoFarmMaxPoints" ).value );
  mcfg.minFarmAttTime       = this.pInt( this.$( "autoFarmMinTime"   ).value );
  mcfg.farmTimeFactor       = this.pInt( this.$( "autoFarmTimeFactor").value );

  this.config.combinedShowSumRow = this.$("combSumRow").checked ? true : false;
  this.config.unitsShowSumRow    = this.$("unitSumRow").checked ? true : false;
  this.config.resShowSumRow      = this.$("resSumRow").checked ? true : false;
  
  
  var json = this.toString( this.config );
  json += "/*v-"+this.version+"*/";

  // Workaround for GM security restrictions.
  window.setTimeout( GM_setValue, 0, 'Cfg',json );
  // GM_log("Stored "+json );
  this.map.storeMapConfig();
  
  this.showConfig(null);
},

// Helper to set config data structures from json data
parseConfig : function( json, version, name )
{
  var config = null;
  if ( json && json.length )
  {
    // Versions check
    var ver = json.substring( json.lastIndexOf("v-")+2, json.length-2 );
    if ( ver != version )
    {
      json=null;
      GM_log(name+" configuration has wrong version. Resetting to defaults!");
    }
    else
    {
      // testing if valid.
      try {
        eval( "config="+json );
      }
      catch (err)
      {
        config=null;
        GM_log( err);
        GM_log(name+" configuration is invalid. Resetting to defaults!");
      }
    }
  }
  else
  {
      GM_log(name+" configuration not found. Resetting to defaults!");
  }
  
  return config;
},

setConfig : function( json )
{
  this.config = this.parseConfig( json, this.version, "Main " );
  if (!this.config)
  {
    this.config = this.getDefaultConfig();
  }
},

/**
 * Handler for the option lists in unit configuration below.
 *
 * If user changes the "substitute" selection this 
 * function enabled/disables the factor input.
 */
onSubChanged : function(e)
{
  var unit = e.name.substring(0,e.name.length-1);
  
  var subs = this.getSelectionValue( e, -2 ); 
  var f = this.$( unit+"F" );
  f.disabled = (subs < 0);
},

createHelpLink : function( id, width, height )
{
  return "&nbsp;&nbsp;<a id='"+id+"' "
         +"href=\"javascript:KungFu.inlinePopup( 'KungFu! Help',KungFu.text('"+id+"'), KungFu.$('"+id+"'),"+width+","+height+")\">[?]</a>";
},

/**
 * Adds or activates the configuration form.
 * Works also dynamically if the form was hidden via "display:none".
 * @param parent {Node} - Parent node to place the form.
 */
showConfig : function(parent)
{

  /////////////////////////////////
  // Unit configuration

  // Head of the two columns.
  var head =  
            "<tr style=\"vertical-align:bottom;\"><td>"
              +"</td><td>"
              +this.text("amount")+"</td><td>"
              +this.text("substitute")+"</td><td>"
              +this.text("factor")
              +"</td></tr>";

  var html =
    "<p><form id='_hfConfigForm' action='javascript:;'><table class='vis'>"
  +"<tr><th colspan='10'>"+this.text("options_title")+" - "+this.text("version")
  +this.createHelpLink( "Help_TroopConfig", 440,400 )+"</th></tr>"
  +"<tr>";

  var cfgs = this.getUnitConfig();

  for (var idx=0;idx<this.units.length;idx++)
  {
    // Start new column after 5 rows.
    if (0==(idx % 4))
    {
      if (idx>0)
        html+="</table></td>";
      html += "<td style=\"vertical-align: top;\"><table>"+head;
    }
    
    var unit = this.units[idx];
    var u    = cfgs[idx];
    
    html +=
    "<tr>"+
     "<td><a href=\"javascript:popup_scroll('popup_unit.php?unit="+unit+"', 520, 520)\">"
     +"<img src='graphic/unit/unit_"+unit+".png?1'></a></td>"
     
    // Amount
     +"<td><input type='text' size=5 id='"+unit+"C' name='"+unit+"C' value='"+(u.c?u.c:"")+"'/></td>"

    // Substitute
     +"<td><select onChange='KungFu.onSubChanged(this);' id='"+unit+"N' name='"+unit+"N'>";

    // Option list for substitute.
    html +=
      "<option value='-2'"+((-2==u.subs)?" selected ":"")+">"+this.text("none"  )+"</option>"+
      "<option value='-1'"+((-1==u.subs)?" selected ":"")+">"+this.text("ignore")+"</option>";

    for (var oidx=0;oidx<this.units.length;oidx++)
      html += "<option value='"+oidx+"'"+((oidx==u.subs)?" selected ":"")+">"+this.text(this.units[oidx])+"</option>";

    // factor
    html += "</select></td>"+
     "<td><input type='text' size=4 id='"+unit+"F' name='"+unit+"F' value='"+(u.x?u.x:"")+"'"
     +(u.subs>=0 ? "" : "disabled")
     +"/></td></tr>";
  }
 
  html += "</table></td></tr><tr height='8px'/>";

  /////////////////////////////////
  // Map configuration
  
  var mcfg = this.map.mapConfig;
  
  html += 
    "<tr><th colspan=10>"
  + this.text("MapConfig")
  + "</th></tr><tr><td colspan=10><table><tr style='vertical-align:top;'><td>"
  + "<b>"+this.text("AttackOverlay")+"</b><p>"
  
  + "<input type='text' size=2 id='attOLMinOpac' value='"+(mcfg.lastAttOL.minOpacity)+"'>"
  + "&nbsp;<label for='attOLMinOpac'>"+this.text("AttackOverlayMinOpacity")+"</label>"
  + this.createHelpLink( "Help_AttackOverlayOpacity", 440,200 )+"<br>"
  
  + "<input type='text' size=2 id='attOLMaxAge' value='"+(mcfg.lastAttOL.maxAge)+"'>"
  + "&nbsp;<label for='attOLMaxAge'>"+this.text("AttackOverlayMaxAge")+"</label>"
  + this.createHelpLink( "Help_AttackOverlayOpacity", 440,200 )+"<br>"
  
  + "</td><td style='padding-left:10px'>"
  + "<b>"+this.text("AutoFarmAttack")+"</b><p>"
  

  + "</td></tr></table></tr><tr height='8px'/>";

  /////////////////////////////////
  // Combines configuration
  html +=
     "<tr><th colspan=10>"
   + this.text("MiscConfig")
   + "</th></tr><tr><td colspan=10>"

   + "<input type='checkbox' id='combSumRow' name='combSumRow'"
   + (this.config.combinedShowSumRow ?"checked='checked'":"")+">"+this.text("ShowSumRow")+"</input><br/>"

   + "<input type='checkbox' id='unitSumRow' name='unitSumRow'"
   + (this.config.unitsShowSumRow ?"checked='checked'":"")+">"+this.text("ShowUnitSumRow")+"</input><br/>"

   + "<input type='checkbox' id='resSumRow' name='resSumRow'"
   + (this.config.resShowSumRow ?"checked='checked'":"")+">"+this.text("ShowResSumRow")+"</input><br/>"
   
   + "</td>"
   + "</tr><tr height='8px'/>"
   + "<tr><td colspan=10>"
   + "<input type='submit' class='support' value='"+this.text("save")+"' onClick='KungFu.storeConfig();'>"
   + "</td></tr>"
   + "</table></form>";

  /* Activate the configuration form. */
  var d = this.$("_hfConfigDiv");
  if ( !d )
  {
    if ( parent )
    {
      /* Form was not created since the last reload . */
      var div = document.createElement("div");
      div.id= "_hfConfigDiv";
      parent.appendChild(div);
      d = this.$("_hfConfigDiv");
    }
    else
      return;
  }
  d.innerHTML = html;
  d.style.display = "block";
},

/*
 * TODO: Create a quick bar script from current settings.
 */
generateQuickBarScript : function()
{
  var code = "";
  return ""+this;
}

};

////////////////////////////////////////
///// Initialisation of config data ////
////////////////////////////////////////

KungFu.map.cf = KungFu;

var json = GM_getValue("Cfg");
KungFu.setConfig( json );
json = GM_getValue("mapCfg");
KungFu.map.setMapConfig( json );

////////////////////////////////////////
///// Initialisation of GUI ////////////
////////////////////////////////////////

var w = KungFu.getGameFrame();

// Read stored value of user (see modMapPage for details).
KungFu.map.user = GM_getValue("user");

// make us visible to the page...
// This could be dangerous - TW could hack into your farming settings! ;)
unsafeWindow.KungFu = KungFu;

// Execute mods

KungFu.map.modMapPage();
