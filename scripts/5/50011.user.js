// ==UserScript==
// @name           Kung Fu
// @namespace      Kung Fu
// @description    Farming Helper
// @author         Big W!
// @include        http://de*.die-staemme.de/game.php?*
// ==/UserScript==

/*
Copyright (c) 2009 Big W!

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

/* To make KungFu official legal. 
 * If true, the "farm"-button in the map view is removed.
 * DS Support accepts usage of this script only without this button!
 */
legalWay : true,

storeValue : function( name, value )
{
    window.setTimeout( storeIt, 0, name, value );
},

/**
 * Version for persistency of main configruation
 * (ONLY used for storage)
 * If changed, the configuration (stored in GM storage) is resetted
 * to prevend the script from crashing.
 * (The main script version canbe found in "_text" below).
 */
version : "0.3",

////////////////////////////////////////
// I18N: Language dependend texts.
// I don't plan to translate this texts
// but it doesn't hurt to be prepared)
////////////////////////////////////////

// TODO: Get current language from web domain
// (not from enviroment, because texts have to match the server language)
_lang  : "DE",

_texts :
{ "DE":
  {
    "version" :"Version 0.6.4",


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

    "options_title": "Farmtruppenkonfiguration", // Option form title

    "amount"    : "Anzahl",
    "substitute": "Ersatzeinheit",
    "MapConfig" : "Kartenkonfiguration:",

    "Help_TroopConfig" :
      "Hier wird der Zusammenbau der Farmtruppen konfiguriert.<br>"
    + "Stehen von einer Truppensorte nicht genug Einheiten zu Verf&uuml;gung, k&ouml;nnen "
    + "diese durch andere Einheiten ersetzt ODER ignoriert werden.<p>"
    + "<i>Beispiel:</i><br><pre>"
    + "Anzahl   Einheit  Ersatzregel   Ersatzfaktor<br>"
    + "1-1      Sp&auml;her   -ignoriere-   1    (alle k&ouml;nnen fehlen)<br>"
    + "600-800  lKav     bB&ouml;gen        1.6  (80 -> 50 Kapazit&auml;t)<br>"
    + "         bB&ouml;gen   sKav          1    (selbe Kapazit&aumlt)<br>"
    + "         sKav     Speer         2    (50 -> 25 Kapazit&aumlt)<br>"
    +"</pre>"
    + "<i>Erkl&auml;rung</i><p>"
    + "Die Werte unter Anzahl geben jeweils die minimale udn maximale Anzahl von Einheiten dieses Typs wieder."
    + "Sollten weniger als die minimale Anzahl von Einheiten verf&uuml;gbar sein, so wird \"Ersatzregel\" relevant. "
    + "Hier kann bestimmt werden, ob und welche Einheit als Ersatz f&uuml;r die noch fehlenden "
    + "Truppen verwendet werden soll.<p><ul>"
    + "<li>Ein leerer Wert f&uuml;hrt keine Ersetzung durch."
    + "<li><i>-ignoriere-</i> Ein Fehlen wird ohne Ersatz ignoriert."
    + "<li>Alle anderen Werte geben die jeweilige Ersatzeinheit an. <i>Faktor</i> gibt dann den Umrechnungsfaktor an."
    + "</ul><p>"
    + "Sind weniger als 600 lKav verf&uuml;gbar, wird das Skript versuchen, die fehlende Menge durch 1.6 x 600=960 bB&ouml;gen "
    + "auszugleichen. Diese Anzahl wird zur Anzahl bB&ouml;gen addiert. Diese Ersetzungen bilden im oberen Beispiel eine Kette, "
    + "an deren Ende die Speere stehen.<br>"
    + "Wird wie bei \"Speere\" nur der Minimalwert gesetzt, tritt eine Sonderregel in Kraft."
    + "Die berechnete Anzahl muss diesen Minimalwert &ubersteigen, ansonsten er vollst&auml;ndig ignoriert.<p>"
    + "Diese Sonderregel soll verhindern, dass der Farmtrupp durch kleine Truppenteile unn&ouml;ig verlangsamt wird.<br>"
    + "Wird ein solcher Wert aber zu hoch gesetzt, k&ouml;nnte der Farmtrupp zu schwach werden."
    + "<p>"
    + "Fehlen am Ende Einheiten, wird versucht den Angriff trotzdem auszuf&uuml;hren und der Server wird ein \"Nicht genug Einheiten\" melden.",

    "AttackOverlay"          : "Overlay f&uuml;r Angriffe<sup>*</sup>:",
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
    +"Ein Angriff mit maximalem Alter wird mit der minimalen Deckkraft angezeigt."
    +"<p><i>Funktioniert nur mit PA.</i>",

    "AutoFarmAttack"         : "Farmbewertungshilfe:",
    "AutoFarmMinPoints"      : "Punkteminimum",
    "AutoFarmMaxPoints"      : "Punktemaximum",

    "Help_AutoAttackPoints"  :
      "Mit \"Punkteminimum\" und \"Punktemaximum\" wird festgelegt "
    + "in welchem Punktebereich Farmen bewertet werden. "
    + "Die Werte h&auml;ngen stark vom jeweiligen Server ab und dienen dazu, "
    + "versehentliche Angriffe auf unlohnende oder zu starke D&ouml;rfer zu vermeiden.",

    "AutoFarmMinTime"        : "Minimale Zeit seit letztem Angriff in Stunden<sup>*</sup>",
    "AutoFarmTimeFactor"     : "Zeit-Faktor f&uuml;r Farmbewertung<sup>*</sup>",

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
    +"Die resultierenden Werte kann man auf der Karte &uuml;ber \"Farmbewertung\" anzeigen lassen."
    +"<p><i>Funktioniert nur mit PA.</i>",

    "MiscConfig"             : "Verschiedenes:",
    "ShowSumRow"             : "Summe in '&Uuml;bersicht Kombiniert' anzeigen",
    "ShowUnitSumRow"         : "Summe in '&Uuml;bersicht Truppen' anzeigen",
    "ShowResSumRow"          : "Summe in '&Uuml;bersicht Produktion' anzeigen",
    "UnitSums"               : "Summe Einheiten",
    "SumAll"                 : "Gesamt",

    "AutoFarm": "Farm!",      // Button in map screen to farm next barbarian. NOT USED!
    "AutoButton" :"KungFu!",  // Text is displayed in pages to activate KungFu Auto-Actions.

    // Config option on Map page.

    "MapOverlayOptions" : "Dorf Information:",

    "redirectOptions"        : "Klick auf Dorf:",
    "redirectVill2Place"     : "Geht zum Platz",
    "redirectVill2MapCenter" : "Zentriert Karte",
    "redirectVill2Vill"      : "Wechselt zu Dorf",
    "showLastAtt4BVill"      : "Angriffe [Barbaren]<sup>*</sup>",
    "showLastAtt4FVill"      : "Angriffe [Fremde D&ouml;rfer]<sup>*</sup>",
    "showPoints"             : "Punkte",
    "showMoral"              : "Moral",
    "showGroups"             : "Gruppen<sup>*</sup>",
    "showOwner"              : "Spieler",
    "showName"               : "Name",
    "showFarmRank"           : "Farmrang",
    "showFarmValue"          : "Farmbewert.",
    "showTribe"              : "Stamm",

    "Help_FarmRank" :
      "Der <i>Farmrang</i> gibt die Rangordnung der umliegenden Farmen entsprechend<br>"
    + "der berechneten Bewertung an.<p>"
    + "Die angezeigte Zahl enth&auml;lt einen Link zum Platz des aktuellen Dorfes<br>"
    + "mit den Zielkoordinaten des jeweiligen Farm-Dorfes.<br>",

    // Build config
    "BuildConfig": "[Konfig]",
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
    "no_option_found"   : "HF UserScript: Option forms not found!\nPlease get a newer version of this script!",
    "NoAutoFarmTargets" : "Keine weiteren Farmziele auf Karte."
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
 * Configuration:
 * read from GM storage
 */

config : null,

getDefaultConfig : function()
{
  var cfg =
  {
      units:[],
      combinedShowSumRow : true,
      unitsShowSumRow : true,
      resShowSumRow : true
  };

  for (var unit in this.units)
    cfg.units.push( {cmin:0,cmax:0,s:-2,x:1} );

  if (cfg.units[4]) cfg.units[4]={ cmin:1  ,cmax:1  ,s:-1,x:1 };  // Ignore
  if (cfg.units[5]) cfg.units[5]={ cmin:800,cmax:800,s:6,x:1.6 }; // marcher x 1.6
  if (cfg.units[6]) cfg.units[6]={ cmin:0  ,cmax:0,s:7,x:1 };     // heavy x 1
  if (cfg.units[7]) cfg.units[7]={ cmin:0  ,cmax:0,s:0,x:2 };     // spear x 1
  if (cfg.units[0]) cfg.units[0]={ cmin:200,cmax:0,s:-2,x:1 };

  return cfg;
},



////////////////////////////////
////// Common Helper Functions
////////////////////////////////

log : function ( msg )
{
    GM_log( msg );
},

loadValue : function( name )
{
    var value = GM_getValue( name );
    KungFu.log("Loaded "+name+" - "+value );
    return value;
},


/** Gets a copy of the unit configuration (see conmfig above). */
getUnitConfig : function()
{
  var copy;
  eval( "copy="+this.toString(this.config.units) );
  return copy;
},

getGameFrame : function () {
  // return this.getFrame( 'game.php' );

  /* in many other DS user scripts this will search the sub frame with the right URL
   * but because we assigned "KungFu" already to the right frame, we can use simply the local window.
   */
  return KungFu.unwrap(window);
},

getFrame : function (fname) {
    if (window.document.URL.indexOf(fname) < 0)
        for (var i=0;i<window.frames.length;i++)
        {
           if (window.frames[i].document.URL.indexOf(fname) > 0) return KungFu.unwrap(window.frames[i]);
        };
    return KungFu.unwrap(window);
},


_reloadTimerBackup : [],

/**
 * Stops all ds reload timer (to prevend from reloading page automatically)
 */
disableReloadTimer : function()
{
  var w = this.getGameFrame();
  if ( w.timers )
  {
    KungFu.log("Timers "+w.timers.length );
    for (var i=0; i<w.timers.length;i++)
    {
      if ( w.timers[i]['reload'] )
      {
        // Store the time for later re-activation
        KungFu._reloadTimerBackup.push( w.timers[i] );
        // Remove timer
        w.timers.splice(i,1);
        KungFu.log("Stopped reload timer "+KungFu._reloadTimerBackup[KungFu._reloadTimerBackup.length-1] );
      }
    }
  }

},

/**
 * Stops all ds reload timer (to prevend from reloading page automatically)
 */
enableReloadTimer : function()
{
  var w = this.getGameFrame();
  if ( w.timers )
  {
    for (var i=0; i<KungFu._reloadTimerBackup.length;i++) w.timers.push( KungFu._reloadTimerBackup[i] );
    KungFu._reloadTimerBackup = [];
  }
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
// Search the element manually:
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

unwrap : function (node)
{
  return (node && node.wrappedJSObject) ? node.wrappedJSObject : node;
},

$ : function(id)
{
  if (!id) return null;
  if ( "object" !== (typeof id) )
  {
    id = this.getGameFrame().document.getElementById( id );

  }
  return KungFu.unwrap(id);
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
    var cc=str.charCodeAt(i);
    if ((cc>=0x000 && cc<=0x01F) || (cc>=0x007F && cc<=0x09F))
    {
    KungFu.log("CHAR "+cc );
      // Use Unicode
      sb += "\\u";
      var hexval= cc.toString(16);
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

//////////////////////////////////////////////
// Dragging.
// On some pages mootools drag is not available.
// So we use this simple "drag" support.
//////////////////////////////////////////////
drag : {
   obj : null,

   init : function(oAnchor, oRoot )
   {
      var a = KungFu.$(oAnchor);
      var o = KungFu.$(oRoot);

      a.onmousedown = KungFu.drag.start;
      a.root = o ? o: a;

      if (isNaN(parseInt(a.root.style.left))) a.root.style.left= "0px";
      if (isNaN(parseInt(a.root.style.top ))) a.root.style.top = "0px";
   },

   start : function(e)
   {
      var o = KungFu.drag.obj = KungFu.unwrap(this);
      KungFu.log( this );
      var e = KungFu.drag.cbFix(e);
      var y = KungFu.pInt(o.root.style.top);
      var x = KungFu.pInt(o.root.style.left);
      o.lastMouseX   = e.clientX;
      o.lastMouseY   = e.clientY;

      var d = KungFu.getGameFrame().document;
      d.onmousemove = KungFu.drag.drag;
      d.onmouseup   = KungFu.drag.end;
      return false;
   },

   drag : function(e)
   {
      e = KungFu.drag.cbFix(e);
      var o = KungFu.drag.obj;
      var rt = o.root;

      var ey= e.clientY;
      var ex= e.clientX;
      var y = KungFu.pInt(rt.style.top);
      var x = KungFu.pInt(rt.style.left);
      var w = rt.offsetWidth;
      var nx, ny;

      nx = ex - o.lastMouseX;
      ny = ey - o.lastMouseY;

      var rtLeft = KungFu.getLeft(rt);
      var ww = window.innerWidth;

      x+=nx;
      if (x<0) x=0;
      if ((x+w)>ww) x=ww-w;

      y+=ny;
      if (y<0) y=0;

      rt.style.left = x+"px";
      rt.style.top  = y+"px";

      o.lastMouseX   = ex;
      o.lastMouseY   = ey;


      return false;
   },

   end : function()
   {
      var d = KungFu.getGameFrame().document;
      d.onmousemove = null;
      d.onmouseup   = null;
      KungFu.drag.obj = null;
   },

   cbFix : function(e)
   {  // Crossbrowser fix
      if (undefined == e) var e=KungFu.getGameFrame().event;
      if (undefined == e.layerX) e.layerX=e.offsetX;
      if (undefined == e.layerY) e.layerY=e.offsetY;
      return e;
   }
},

/**
 * Opens a pop-up with text
 * @param id     {String} ID fpr html node to use or create
 * @param title  {String} Title
 * @param text   {String} text
 * @param hook   {Node}   Element to center above (or null)
 * @param width  {Number} width in pixel
 * @param height {Number} height in pixel
 */
inlinePopup : function ( id, title, text, hook, width, height )
{
  // If dislaying a pop-up we disable reload timers.
  KungFu.disableReloadTimer();

  var x;
  var y;
  var w = this.getGameFrame();

  if ( hook )
  {
    x = this.getLeft(hook)+(hook.offsetWidth-width)/2;
    y = this.getTop(hook)+(hook.offsetHeight-height)/2;
  }
  else
  {
    x = (w.innerWidth-width)/2;
    y = (w.innerHeight-height)/2
  }

  if ((x+width )>w.innerWidth ) x=w.innerWidth-width;
  if ((y+height)>w.innerHeight) y=w.innerHeight-height;
  if (x<0) x=0;
  if (y<0) y=0;


  var d = w.document;
  var p = this.$(id);
  if ( !p )
  {
    p = d.createElement("div");
    p.id = id;
    p.style.position="absolute";
    p.style.display="none";
    p.style.zIndex=9999; // sometimes we need to put us above other (as in map)
    p.border="1px solid black";
    d.getElementsByTagName("BODY")[0].appendChild( p );
  }
  p.style.left  = x+"px";
  p.style.top   = y+"px";
  p.style.width = width +"px";
  p.style.height= height+"px";

  p.innerHTML = "<table height='100%' class='main'><tr><th width='100%' id='"+id+"_title'>"+title+"</th><th><a href=\"javascript:KungFu.closeInlinePopup('"+id+"');\">[X]</a></th></tr><tr><td colspan=2>"+text+"</td></tr></table>";
  p.style.display = 'block';
  w.setTimeout( this.drag.init, 100, id+'_title', id );
},

closeInlinePopup : function(id)
{
  // Reanable reload timers.
  KungFu.enableReloadTimer();

  var p = this.$(id);
  if (p)
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
    + "<input type='checkbox' id='KF_showLastAtt4FVill' "+(this.mapConfig.showLastAtt4FVill ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showLastAtt4FVill\");'>"
    + "<label for='KF_showLastAtt4FVill'>"+this.cf.text("showLastAtt4FVill")+"</label><br/>"

    + "<input type='checkbox' id='KF_showLastAtt4BVill' "+(this.mapConfig.showLastAtt4BVill ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showLastAtt4BVill\");'>"
    + "<label for='KF_showLastAtt4BVill'>"+this.cf.text("showLastAtt4BVill")+"</label>"

    + "<table width='100%' style='border-collapse:collapse;'><tr><td width='50%' style='vertical-align:bottom; padding:0px;'>"

    + "<input type='checkbox' id='KF_showGroups' "+(this.mapConfig.showGroups ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showGroups\");'>"
    + "<label for='KF_showGroups'>"+this.cf.text("showGroups")+"</label><br/>"

    + "<input type='checkbox' id='KF_showPoints' "+(this.mapConfig.showPoints ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showPoints\");'>"
    + "<label for='KF_showPoints'>"+this.cf.text("showPoints")+"</label><br/>"

    + "<input type='checkbox' id='KF_showName' "+(this.mapConfig.showName ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showName\");'>"
    + "<label for='KF_showName'>"+this.cf.text("showName")+"</label><br/>"

    + "<input type='checkbox' id='KF_showTribe' "+(this.mapConfig.showTribe ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showTribe\");'>"
    + "<label for='KF_showTribe'>"+this.cf.text("showTribe")+"</label><br/>"

    + "</td><td style='padding:0px; padding-left:10px; white-space:nowrap;'>"

    + "<input type='checkbox' id='KF_showFarmRank' "+(this.mapConfig.showFarmRank ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showFarmRank\");'>"
    + "<label for='KF_showFarmRank'>"+this.cf.text("showFarmRank")+"</label>"+this.cf.createHelpLink( "Help_FarmRank", 300,120 )+"<br/>"

    + "<input type='checkbox' id='KF_showFarmValue' "+(this.mapConfig.showFarmValue ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showFarmValue\");'>"
    + "<label for='KF_showFarmValue'>"+this.cf.text("showFarmValue")+"</label><br/>"

    + "<input type='checkbox' id='KF_showMoral' "+(this.mapConfig.showMoral ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showMoral\");'>"
    + "<label for='KF_showMoral'>"+this.cf.text("showMoral")+"</label><br/>"

    + "<input type='checkbox' id='KF_showOwner' "+(this.mapConfig.showOwner ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"showOwner\");'>"
    + "<label for='KF_showOwner'>"+this.cf.text("showOwner")+"</label><br/>"

    + "</td></tr></table>"
   + "</td>"
    + "</tr><tr><th>"+this.cf.text("redirectOptions")+"</th></tr><tr><td>"

    + "<input type='checkbox' id='KF_redirectVill2Place' "+(this.mapConfig.redirectVill2Place ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"redirectVill2Place\");'>"
    + "<label for='KF_redirectVill2Place'>"+this.cf.text("redirectVill2Place")+"</label><br/>"

    + "<input type='checkbox' id='KF_redirectVill2MapCenter' "+(this.mapConfig.redirectVill2MapCenter ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"redirectVill2MapCenter\");'>"
    + "<label for='KF_redirectVill2MapCenter'>"+this.cf.text("redirectVill2MapCenter")+"</label><br/>"

    + "<input type='checkbox' id='KF_redirectVill2Vill' "+(this.mapConfig.redirectVill2Vill ? "checked='checked'": "")+" onClick='KungFu.map.toggleMapOption(\"redirectVill2Vill\");'>"
    + "<label for='KF_redirectVill2Vill'>"+this.cf.text("redirectVill2Vill")+"</label><br/>"

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
    json += "/*v-"+this.mapVersion+"*/";

    KungFu.storeValue( 'mapCfg',json );
  },



  getDefaultMapConfig : function()
  {
    var cfg =
    {
        redirectVill2Place  : true,
        redirectVill2MapCenter: false,
        redirectVill2Vill : false,

        showLastAtt4BVill : true,
        showLastAtt4FVill : true,
        showGroups        : true,
        showPoints        : false,
        showName          : false,
        showTribe         : false,
        showFarmRank      : false,
        showFarmValue     : false,
        showMoral         : false,
        showOwner         : true,

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

    if ( opt == 'redirectVill2Place' ||
         opt == 'redirectVill2MapCenter' ||
         opt == 'redirectVill2Vill' )
    {
      if ( opt != "redirectVill2Place"    ) this.mapConfig.redirectVill2Place     = false;
      if ( opt != "redirectVill2MapCenter") this.mapConfig.redirectVill2MapCenter = false;
      if ( opt != "redirectVill2Vill"     ) this.mapConfig.redirectVill2Vill      = false;
    }

    if ( opt == 'showPoints' ||
         opt == 'showName'   ||
         opt == 'showMoral'  ||
         opt == 'showTribe'   ||
         opt == 'showOwner' )
    {
      // This options are exclusive.
      if ( opt != "showPoints") this.mapConfig.showPoints = false;
      if ( opt != "showName"  ) this.mapConfig.showName   = false;
      if ( opt != "showTribe" ) this.mapConfig.showTribe   = false;
      if ( opt != "showMoral" ) this.mapConfig.showMoral  = false;
      if ( opt != "showOwner" ) this.mapConfig.showOwner  = false;
    }

    if ( opt == 'showFarmRank' ||
         opt == 'showFarmValue'  )
    {
      if ( opt != "showFarmRank"  ) this.mapConfig.showFarmRank = false;
      if ( opt != "showFarmValue" ) this.mapConfig.showFarmValue= false;
    }

    this.storeMapConfig();
    this.modMapPage();
  },

  /**
   * In none PA mode we need the orginal links for retrieving the town-id.
   * After once modding the map this information is lost. So we have to store all
   * infos during the first mod. "getTownInfo" below will use this map if available.
   */
  townInfos : {},
  
  /**
   * Extracts informations about a town from a map html element
   * @param town : a town html element on map
   */
  getTownInfo: function(town)
  {
      var reMP = /onmouseover="map_popup\((.+?)\)"/;
      var mMP = reMP.exec(town.innerHTML);
      if (mMP) {
      
          // Argument list of the JS onMouseOver call  to map_popup ->
          //  0 title      
          //  1 bonus_image
          //  2 bonus_text 
          //  3 points     
          //  4 owner      
          //  5 ally       
          //  6 village_groups
          //  7 moral
          //  8 village_id
          //  9 source_id  
          // 10 last_attack_date
          // 11 last_attack_dot
          // 12 last_attack_max_loot
          // 13 newbie_protect
          
          // Some town infos are missing without PA. E.g. babarian-villarge:
          // map_popup('Town (123|456) K12', '', '', 12, null, null, false, false, false, false, false, false, false, false)          

          var tA = eval("[" + mMP[1] + "]");

          var koordRE = /(.+) \((\d+)\|(\d+)\) K(\d+)/;
          var koord = koordRE.exec( tA[0] );

          // Key for townInfo map x/y position.
          var townPos = ""+koord[2]+"/"+koord[3];
          tInfo = this.townInfos[ townPos ];
          if ( ! tInfo )
          {
          
          
              /* Transform the array in a human readable format
               * If DS change this format, please check the "map_popup" function
               * and ajust the following code:
               */
              tInfo = {
                name    : koord[1],
                x       : koord[2],
                y       : koord[3],
                k       : koord[4],
                bonusImg: tA[1],
                bonusTxt: tA[2],
                points  : tA[3],
                townGrps: tA[6],
                moral   : tA[7],
                townID  : tA[8],
                srcID   : tA[9],
                lastAtt : {
                  date    : this.cf.pDate( tA[10] ),
                  fightImg: tA[11],
                  resImg  : tA[12],
                  lost    : (tA[11] && (tA[11].indexOf("dots/red.png") >= 0)) // fight lost?
                }
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
              
              var tribeRE = /(.+) \((.+) (?:[A-Za-z]+)\)/;
              var tribe = tribeRE.exec( tA[5] );
              if ( tribe )
              {
                tInfo.tribe = {
                  name   : tribe[1],
                  points : parseInt(tribe[2] )
                };
              }
              else
              {
                tInfo.tribe = {
                  name   : tA[5],
                  points : 0
                };
              }              

              if ( isNaN( parseInt( tInfo.townId ) ) )
              {
                // Get townId from href. e.g. /game.php?village=123456&screen=info_village&id=123456
                var reHR = /href="\/game.php\?village=(\d+)&amp;screen=info_village&amp;id=(\d+)\"/;
                var mHR = reHR.exec(town.innerHTML);
                
                if ( mHR )
                {
                    tInfo.srcID  = mHR[1];
                    tInfo.townID = mHR[2];
                }
              }

              if ( tInfo.owner && isNaN( parseInt( tInfo.moral ) ) )
              {
                // Moral formular from wiki. Seems to match DS "moral calculator".
                tInfo.moral = (100*((tInfo.owner.points / this.userPoints)*3+0.3)).toFixed(0);
                if ( tInfo.moral > 100 ) tInfo.moral = 100;
              }
              
              tInfo.attacking = !!( town.innerHTML.indexOf( "map/axe_attack.png\"" )>0);
              
              this.townInfos[ townPos ] = tInfo;
          }

          return tInfo;
      }
      return null;
  },

  /**
   * Get a small overlay to display infos about the
   * last attack on a town inside the map.
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
   * Get a small overlay to display the tribe of a town inside the map
   * @param town : a town html element on map
   */
  getTribeOverlay: function(tInfo)
  {
    if ( tInfo )
    {
        var e = document.createElement("div");
        with(e.style)
        {
          lineHeight="9px";
          marginLeft="10px";
          fontStyle="italic";
          color="white";
          textAlign="left";
          fontSize="9px";
          position="absolute";
          width="30px";
          overflow="hidden";
        };
        e.innerHTML = this.cf.escapeHTML(tInfo.tribe.name,"<wbr>");

        return e;
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

    var xpath = d.evaluate(
                "//table[@class='map_container']", d, null
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

      var htCoord = koordRE.exec( d.title );
      if ( htCoord && htCoord.length>0)
      {
        homeX = htCoord[1];
        homeY = htCoord[2];
        var htXPath = d.evaluate(
                      "//td/a[contains(@onmouseover,' ("+homeX+"|"+homeY+") K')]", d, null
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
              KungFu.storeValue( 'user', this.user );
            }
            this.userPoints = tHomeInfo.owner.points;
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

      if (mcfg.redirectVill2MapCenter || mcfg.redirectVill2Vill )
      {
        // We need the current village-id.
        // Org: /game.php?village=ddd&screen=map&x=X&y=Y"
        var vidRe= /\?village=(\d+)&/;
        var htId = vidRe.exec( d.URL );
        if (htId)
          currId = htId[1];
        else
          KungFu.log("current village ID not found. URL="+ d.URL);
      }

      this.barbarian = [];

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
              var b = { id:tInfo.townID, x:tInfo.x, y:tInfo.y, l: attTime };
              // For farm helper overlays we need to store the town node.
              if ( mcfg.showFarmRank || mcfg.showFarmValue )
                b.node = a ;

              this.barbarian.push( b );
            }

            var own = !!(tInfo.owner && tInfo.owner.name==this.user);

            var lk = this.linkBackup[tInfo.townID];
            if ( !lk )
            {
              lk = a.href;
              this.linkBackup[tInfo.townID] = lk;
            }

            /* Redirect link */
            // Org: .../game.php?village=XXXX&screen=info_village&id=XXXXX
            if (mcfg.redirectVill2Place)
            {
              //... to command screen
              a.href = lk.replace(/&screen=info_village&id=/
                       , '&screen=place&mode=command&target=');

            } else if (mcfg.redirectVill2MapCenter || (mcfg.redirectVill2Vill && !own))
            { // ... to "map center"

              a.href = lk.replace(/\?village=\d+&screen=info_village&id=\d+/
                       , '?village='+currId+'&screen=map&x='+tInfo.x+'&y='+tInfo.y);

            } else if (mcfg.redirectVill2Vill)
            { // ... to "village"
              a.href = lk.replace(/\?village=\d+&screen=info_village&id=\d+/
                       , '?village='+tInfo.townID+'&screen=map');
            }
            else
              a.href = lk;


            var ol = null;

            /* Insert last attack overlay */
            if ( (mcfg.showLastAtt4BVill  && tInfo.lastAtt.date && !tInfo.owner) ||
                 (mcfg.showLastAtt4FVill  && tInfo.lastAtt.date && !own))
            {
              ol = this.getLastAttackOverlay(tInfo);
            }

            if (ol==null && mcfg.showGroups)
              ol = this.getGroupOverlay(tInfo);
            if (ol==null && mcfg.showPoints)
              ol = this.getPointOverlay(tInfo);
            if (ol==null && mcfg.showName)
              ol = this.getNameOverlay(tInfo);
            if (ol==null && mcfg.showTribe)
              ol = this.getTribeOverlay(tInfo);
            if (ol==null && mcfg.showMoral)
              ol = this.getMoralOverlay(tInfo);
            if (ol==null && mcfg.showOwner)
              ol = this.getOwnerOverlay(tInfo);

            if ( ol )
              this.addOverlay(a,ol);
            else
              this.removeOverlay(a.parentNode);
          }
        }
      }

      // Calculate Farm Rank.
      // Age is normalized. Oldest age gets 0, newest 1.
      {
        // Old attacts are only used up to an age of 3 days
        var maxPeriode = (3*24*60*60*1000);
        if( minTime < (minFarmAttTime-maxPeriode)) minTime = minFarmAttTime-maxPeriode;

        var minTimeNormFaktor = 1/(minFarmAttTime-minTime);
        for (var i=0;i<this.barbarian.length;i++)
        {
          var b= this.barbarian[i];
          var time = b.l-minTime;
          if (time<0) time = 0;

          b.l = minTimeNormFaktor * time;
          var xd = b.x-homeX;
          var yd = b.y-homeY;
          b.value= (b.l*mcfg.farmTimeFactor)+Math.sqrt( xd*xd + yd*yd );
        }

        if ( mcfg.showFarmValue || mcfg.showFarmRank )
        {
          var fsize = (mcfg.showFarmRank) ? 10 : 9; // Font size.

          if ( mcfg.showFarmRank )
          {
            // To display the rank we sort the villages.
            // This doesn't affect the other code, but we can simply use the array index as rank.
            this.barbarian.sort( function(a, b) {  return a.value - b.value; } );
          }

          for (var i=0;i<this.barbarian.length;i++)
          {
            var b= this.barbarian[i];

            if (b.node)
            {
              var devo = d.createElement("div");

              var xd = b.x-homeX;
              var yd = b.y-homeY;

              if ( mcfg.showFarmValue )
              {
                // Value
                var gf=(b.l*mcfg.farmTimeFactor)+Math.sqrt( xd*xd + yd*yd );
                devo.innerHTML = gf.toFixed(2);
              }
              else
              {
                // Farm ramk plus link to place.
                var lk = this.linkBackup[b.id];
                lk = lk.replace(/&screen=info_village&id=/, '&screen=place&mode=command&target=');
                devo.innerHTML = "<a style='color:white;' href='"+lk+"'>"+(i+1)+"</a>";
                devo.style.zIndex="1000";
              }

              with(devo.style){
                lineHeight= fsize+"px";
                textAlign ="left";
                fontSize  = fsize+"px";
                position  ="absolute";
                color     ="white";
                marginLeft="6px";
              }
              devo.id = "__hfOverlay";
              b.node.parentNode.insertBefore(devo, b.node.nextSibling);
            }
          }
        }
      }

      if ( KungFu.legalWay )
	  {
		  if ( (homeX || homeY) && !this.cf.$("_KF_farmCount") )
		  {

			var op = d.getElementsByTagName("H2");
			if ( op )
			{
			  op = op[0];
			  var span = d.createElement("span");
			  span.id = "_KF_farmCount";
			  span.style.textAlign= "right";

			  span.style.cssFloat= "right";

			  if ( this.barbarian.length )
				span.innerHTML = "<i>Farmziele:</i>"+this.barbarian.length;
			  else
				span.innerHTML = this.cf.text("NoAutoFarmTargets");
			  op.parentNode.insertBefore( span, op);
			}
		  }
      }
	  else
	  {
		/// BEGIN Banned Feature
		  if ( (homeX || homeY) && !this.cf.$("_KF_autoButton") )
		  {

			var op = d.getElementsByTagName("H2");
			if ( op )
			{
			  op = KungFu.unwrap(op[0]);
			  var span = KungFu.unwrap( d.createElement("span") );
			  span.id="_KF_autoButton";
			  span.style.textAlign= "right";

			  if ( mcfg.autoFarmButtXPos )
			  {
				span.style.position= "absolute";
				span.style.left= mcfg.autoFarmButtXPos+"px";
			  }
			  else
			  {
				span.style.cssFloat= "right";
			  }

			  if ( this.barbarian.length )
			  {
				span.innerHTML =
					"<i>Farmziele:</i><span id='afBarbCount'>"+this.barbarian.length+"</span>&nbsp;"
				  + "<a id='autoFarmButton' accesskey='k' style='font-size: 10pt;'"
				  + " onkeyup='KungFu.AutoFarm("+homeX+","+homeY+",event);KungFu.go(this);'"
				  + " onmouseup=\"KungFu.blockEvent(event);\""
				  + " onmousedown=\"KungFu.AutoFarm("+homeX+","+homeY+",event);\""
				  + " href='#' >"
				  + this.cf.text("AutoFarm")+"</a><br><font color='grey' size=-2>[Alt-Shift-K]</font>";

			  }
			  else
				span.innerHTML = this.cf.text("NoAutoFarmTargets");
			  op.parentNode.insertBefore( span, op);
			}
		  }
		/// END banned feature
	  }
	  
      var opParent = d.getElementById('inputx');
      while( opParent && opParent.tagName != "TBODY") opParent = opParent.parentNode;
      this.showMapConfig(opParent);
    }

  }
},

/// BEGIN None legal feature

blockEvent : function(event)
{
  // from prototype
  if (event.preventDefault)
  {
    event.preventDefault();
    event.stopPropagation();
  }
  else
  {
    event.returnValue = false;
    event.cancelBubble = true;
  }
  return false;
},

AutoFarm : function(x,y,event)
{
  var target = this.getNearestCoord(x,y,this.map.barbarian,this.map.mapConfig.farmTimeFactor);
  if ( target )
  {
    this.$("autoFarmButton").href   = this.getGameFrame().document.URL.replace( "screen=map", "&screen=place&mode=command&target="+target.id );
    this.$("afBarbCount").innerHTML = ""+this.map.barbarian.length;
    return true;
  }
  else
  {
    this.$('_KF_autoButton').innerHTML= KungFu.text("NoAutoFarmTargets");
    this.blockEvent(event);
    return false;
  }
},

// Get the koorindates next to the koordinates from the koords array
getNearestCoord : function (X,Y,koords,loadfactor)
{
  var minD = 10000;
  var minKoord = null;
  var minIndex = -1;
  for(var k=0;k<koords.length;k++ )
  {
    var ko = koords[k];
    var xd = ko.x-X;
    var yd = ko.y-Y;

    var d=(ko.l*loadfactor)+Math.sqrt( xd*xd + yd*yd );
    if (d<minD)
    {
      minIndex = k;
      minD=d;
      minKoord = ko;
    }
  }
  if (minIndex>=0)
  {
    koords.splice(minIndex,1);
  }

  return minKoord;
},
/// END None legal feature


/**
 * Fill in units into command form according to configuration
 */
fillInUnits : function( fm, config )
{
  var cfgs = this.getUnitConfig();
  var done = false;

  for (var i=0;i<cfgs.length;i++)
    cfgs[i].csub = 0;

  while( !done )
  {
    // Sometimes we have to loop again if some substitutions occure.
    done = true;
    for (var i=0;i<this.units.length;i++)
    {
      var cfg=cfgs[i];

      var f = this.getFormElement( fm, this.units[i] );

      var nb=cfg.cmin;
      var na=0;
      if ( cfg.cmax === 0)
      {
        // Special case, max==0 says "Replacement unit":
        // min gives the minimal value which should be send,
        // everthing below is ignored.
        if ( cfg.csub < nb )
        {
          nb = 0;
        }
        else
        {
          nb = cfg.csub;
        }
      }
      else
      {
        nb += cfg.csub;
        if (nb>cfg.cmax)
          nb = cfg.cmax;
      }
      if (nb > 0)
      {
        if ( f )
        {
          var fl=f;
          na=10000;
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
          if (cfg.s>=0 && cfg.s!=i)
          {
            cfgs[cfg.s].csub += Math.round( ((nb - na)*cfg.x) );
            cfg.cmin = na;
            cfg.csub = 0;
            nb = na;
            done = false;
          }
          if (cfg.s==-1)
          {
            nb = na;
          }
        }
        else
        {
          nb = na;
          if (cfg.cmax!==0 && nb>cfg.cmax)
            nb = cfg.cmax;
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
      td =  this.unwrap(td);

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
    KungFu.log( "Can't mod Overview Page: "+err );
  }

},

/**
 * Property inlinemenu patch. Adds KungFu settings link
 */
modPropertyInline: function()
{
  var d = KungFu.getGameFrame().document;

  // Don't do this in property screen
  if ( d.URL.indexOf( "screen=settings" )<0 )
  {
    var xpath = d.evaluate(
                "//a[contains(@href,'screen=settings')]/../table[@class='menu_column']/tbody", d, null
                ,XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    if (xpath.singleNodeValue)
    {
      var td = d.createElement("TD");
      td.innerHTML = "<a href='javascript:KungFu.showConfig(true);'>KungFu!</a>";
      var tr = d.createElement("TR");
      tr.appendChild(td);
      this.unwrap(xpath.singleNodeValue).appendChild( tr );
    }
  }
},

/**
 * Patchs property screen (adds KungFu settings link to left menu)
 */
modPropertyPage : function()
{
  try
  {
    var d = KungFu.getGameFrame().document;

    // Check if we are in property screen
    if ( d.URL.indexOf( "screen=settings" )>0 )
    {
      // Get left table to add settings link
      var xpath = d.evaluate(
                  "//h2/../table/tbody/tr/td/table/tbody", d, null
                  ,XPathResult.FIRST_ORDERED_NODE_TYPE, null);


      if (xpath.singleNodeValue)
      {
        var td = d.createElement("TD");
        td.width="100%";
        td.innerHTML = "<a href='javascript:KungFu.showConfig(false);'>KungFu!</a>";

        var tr = d.createElement("TR");
        tr.appendChild(td);
        this.unwrap(xpath.singleNodeValue).appendChild( tr );
      }
    }
  } catch ( err )
  {
    KungFu.log( "Can't mod Property Page: "+err );
  }
},

/**
 * Helper to create the generic used "auto" button.
 */
addAutoButton : function(d, onClick)
{
  var span = d.createElement("span");
  span.id="_KF_autoButton";
  span.style.cssFloat = "right";
  span.style.textAlign= "center";
  span.innerHTML = "<input accesskey='k' type='submit' style='font-size: 10pt;' value='"+this.text("AutoButton")+"' class='attack' onClick=\""+onClick+";return false;\"'><br><font color='grey' size=-2>[Alt-Shift-K]</font>";

  var xp= d.evaluate( "//p[@class='server_info']", d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  var p = KungFu.unwrap( xp.singleNodeValue );
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
    var p = this.unwrap(xp.singleNodeValue);
    if (p)
    {
      w.location.href = p.href;
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
      this.addAutoButton( d, "KungFu.goCommandLink()" );
    }
  } catch ( err )
  {
    KungFu.log( "Can't mod Village Info Page: "+err );
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
      this.unwrap( xp.singleNodeValue ).id = "KFAutoForm";
      // It's the place screen. Add the "auto" button at the top.
      var span = this.addAutoButton( d, "KungFu.sendTroops();" );

      // TODO: Add config button.
    }
  } catch ( err )
  {
    KungFu.log( "Can't mod Place page: "+err );
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
      this.unwrap( xp.singleNodeValue ).id = "KFAutoForm";
      // commit command screen. Add the "auto" button at the top.
      this.addAutoButton( d, "KungFu.getFormElement(KungFu.$('KFAutoForm'),'submit').click()" );
    }
  } catch ( err )
  {
    KungFu.log( "Can't mod Confirm page: "+err );
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
  KungFu.storeValue( 'trainCfg',json );
  KungFu.log("Stored "+json );
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


/**
 * Extracts informations about a town from a html row element in mass train
 * @param town : a town html row element from mass train page.
 */
getTrainTownInfo : function(tr)
{
  var txt = tr.innerHTML;

  txt = txt.replace(/<span class="grey">.<\/span>/ig,"");

  // The REs are compile sonly once, if the browser evaluates the script.
  var tInfoRE  = /<td><a href="game.php\?village=(\d+).*?">(.+) \((\d+)\|(\d+)\) K(\d+)<\/a><\/td>/;
  var tWoodRE  = /\/holz.png\?1".*?>(\d+)<br>/;
  var tStoneRE = /\/lehm.png\?1".*?>(\d+)<br>/;
  var tIronRE  = /\/eisen.png\?1".*?>(\d+)/;
  var tFarmRE  = /<td>(\d+)\/(\d+)<\/td>/;

  var tInfo = {};

  var tI = tInfoRE.exec(txt);
  if ( tI )
  {
    tInfo.townID = this.pInt(tI[1]);
    tInfo.name   = tI[2];
    tInfo.x      = this.pInt(tI[3]);
    tInfo.y      = this.pInt(tI[4]);
    tInfo.k      = this.pInt(tI[5]);
  }

  var tWood  = tWoodRE.exec(txt);
  if (tWood) tInfo.wood = this.pInt(tWood[1]);

  var tStone = tStoneRE.exec(txt);
  if (tStone) tInfo.stone = this.pInt(tStone[1]);

  var tIron  = tIronRE.exec(txt);
  if (tIron) tInfo.iron = this.pInt(tIron[1]);

  var tFarm  = tFarmRE.exec(txt);
  if (tFarm)
  {
    tInfo.farmUsed = this.pInt(tFarm[1]);
    tInfo.farmAvailable = this.pInt(tFarm[2]);
  }

  return tInfo;
},


modTrainMassPage : function()
{
  var d = this.getGameFrame().document;

  var xp = d.evaluate( "//table/tbody/tr[td/input[contains(@name,'units[')]]",d,null, XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);

  while( tr = xp.iterateNext() )
  {
     tr =  this.unwrap(tr);
     var tInfo = this.getTrainTownInfo( tr );

     KungFu.log( this.toString( tInfo ));
  }
},

modTrainPage : function()
{
  try {
    var d = this.getGameFrame().document;
    if ( d.URL.indexOf( "screen=train" )>0 )
    {
      this.setTrainConfig( KungFu.loadValue("trainCfg") );

      var modRE = /&mode=(\w+)&/;
      var trainMode = modRE.exec( d.URL );
      trainMode = trainMode?trainMode[1]:"train";
      switch( trainMode )
      { case "mass":
          this.modTrainMassPage();
          break;
        case "train":
          break;
      }
    }
  } catch ( err )
  {
    KungFu.log( "Can't mod Train Page: "+err );
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
    this.config.units[idx].cmin = this.pInt( this.$( unit+"CMin" ).value );
    this.config.units[idx].cmax = this.pInt( this.$( unit+"CMax" ).value );
    this.config.units[idx].s    = this.getSelectionValue( this.$(unit+"N"), -2 );
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

  KungFu.storeValue( 'Cfg',json );
  this.map.storeMapConfig();

  this.showConfig();
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
      KungFu.log(name+" configuration has wrong version. Resetting to defaults!");
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
        KungFu.log( err);
        KungFu.log(name+" configuration is invalid. Resetting to defaults!");
      }
    }
  }
  else
  {
      KungFu.log(name+" configuration not found. Resetting to defaults!");
  }

  return config;
},

setConfig : function( json )
{
  this.config = this.parseConfig( json, this.version, "Main" );
  if (!this.config)
  {
    this.config = this.getDefaultConfig();
  }
},

createHelpLink : function( id, width, height )
{
  return "&nbsp;&nbsp;<a id='"+id+"' "
         +"href=\"javascript:KungFu.inlinePopup( 'KF_inline_help', 'KungFu! Help',KungFu.text('"+id+"'), KungFu.$('"+id+"'),"+width+","+height+")\">[?]</a>";
},


/**
 * Handler for the option lists in unit configuration below.
 *
 * If user changes the "substitute" selection this
 * function enabled/disables the factor input.
 */
onSubChanged : function(e, unit)
{
  var factor = this.$( unit+"F" );
  factor.disabled = (e.value < 0);
},


/**
 * Adds or activates the configuration form.
 * Works also dynamically if the form was hidden via "display:none".
 */
showConfig : function(inline)
{

  /////////////////////////////////
  // Unit configuration

  // Head of the two columns.
  var head =
            "<tr style=\"vertical-align:bottom;\"><td>"
              +"</td><td>"
              +this.text("amount")+"</td><td colspan=2>"
              +this.text("substitute")
              +"</td></tr>";

  var html = "";

  if ( !inline )
  {
    html += "<font size='+1'>KungFu "+this.text("version")+"</font><p>";
  }
  html += "<form id='_hfConfigForm' action='javascript:;'><table class='vis'>"
  +"<tr><th colspan='10'>"+this.text("options_title")
  +this.createHelpLink( "Help_TroopConfig", 500,400 )+"</th></tr>"
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
     +"<td style='white-space:nowrap;'>"
     +"<input type='text' size=2 id='"+unit+"CMin' name='"+unit+"CMin' value='"+(u.cmin?u.cmin:"")+"'/>-"
     +"<input type='text' size=2 id='"+unit+"CMax' name='"+unit+"CMax' value='"+(u.cmax?u.cmax:"")+"'/>"
     +"</td>"

    // Substitute
     +"<td><select onChange='KungFu.onSubChanged(this,\""+unit+"\");' id='"+unit+"N' name='"+unit+"N'>";

    // Option list for substitute.
    html +=
      "<option value='-2'"+((-2==u.s)?" selected ":"")+">"+this.text("none"  )+"</option>"+
      "<option value='-1'"+((-1==u.s)?" selected ":"")+">"+this.text("ignore")+"</option>";

    for (var oidx=0;oidx<this.units.length;oidx++)
      html += "<option value='"+oidx+"'"+((oidx==u.s)?" selected ":"")+">"+this.text(this.units[oidx])+"</option>";

    // factor
    html += "</select></td>"+
     "<td style='white-space:nowrap;padding:0px;'>"
     +"x</span><input type='text' size=2 id='"+unit+"F' name='"+unit+"F' value='"+(u.x?u.x:"")+"' "
     +((u.s<0) ? "disabled=true" : "" )
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

  + "<input type='text' size=2 id='autoFarmMinPoints' value='"+(mcfg.farmMinPoints)+"'>"
  + "&nbsp;<label for='autoFarmMinPoints'>"+this.text("AutoFarmMinPoints")+"</label>"
  + this.createHelpLink( "Help_AutoAttackPoints", 440,120 )+"<br>"

  + "<input type='text' size=2 id='autoFarmMaxPoints' value='"+(mcfg.farmMaxPoints)+"'>"
  + "&nbsp;<label for='autoFarmMaxPoints'>"+this.text("AutoFarmMaxPoints")+"</label>"
  + this.createHelpLink( "Help_AutoAttackPoints", 440,120 )+"<br>"

  + "<input type='text' size=2 id='autoFarmMinTime' value='"+(mcfg.minFarmAttTime)+"'>"
  + "&nbsp;<label for='autoFarmMinTime'>"+this.text("AutoFarmMinTime")+"</label><br>"

  + "<input type='text' size=2 id='autoFarmTimeFactor' value='"+(mcfg.farmTimeFactor)+"'>"
  + "&nbsp;<label for='autoFarmTimeFactor'>"+this.text("AutoFarmTimeFactor")+"</label>"
  + this.createHelpLink( "Help_AutoFarmTimeFactor", 480,250 )
  + "</td></tr></table></tr><tr height='8px'/>";

  /////////////////////////////////
  // "Combines" configuration
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
   + "<input type='submit' class='support' value='"+this.text("save")+"' onClick='KungFu.storeConfig();"
   + (inline ?"KungFu.closeInlinePopup(\"KF_cfg\");":"")+"'>"
   + "</td></tr>"
   + "</table>"
   + "<sup>*</sup> <i>Funktioniert nur mit PA.</i>"
   + "</form>";

  /* Activate the configuration form. */
  var cf;
  if ( inline )
  {
    // use inline pop-up
    KungFu.inlinePopup( "KF_cfg", "KungFu! "+this.text("version"), "<div id='_hfConfigDiv'></div>", null, 670, 470 ) ;
    cf = this.$("_hfConfigDiv");
  }
  else
  {
    // use right part of property page
    cf = this.$("_hfConfigDiv");
    if ( !cf )
    {
      var d = this.getGameFrame().document;

      var xpath = d.evaluate( "//H2/../table/tbody/tr/td[last()]", d, null
                  ,XPathResult.FIRST_ORDERED_NODE_TYPE, null);

      var tohide = this.unwrap( xpath.singleNodeValue );
      if ( tohide )
      {
        var div = document.createElement("td");
        div.id= "_hfConfigDiv";

        // Hide it.
        tohide.style.display="none";
        tohide.parentNode.appendChild(div);
      }
      cf = this.$("_hfConfigDiv");
    }
  }
  cf.innerHTML = html;
  cf.style.display = "block";
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

// Workaround fpr security restrictions (see KungFu.storeValue).
storeIt = function (name, value)
{
    GM_setValue( name, value );
};

////////////////////////////////////////
///// Initialisation of config data ////
////////////////////////////////////////

KungFu.map.cf = KungFu;
var json = KungFu.loadValue("Cfg");
KungFu.setConfig( json );
json = KungFu.loadValue("mapCfg");
KungFu.map.setMapConfig( json );

////////////////////////////////////////
///// Initialisation of GUI ////////////
////////////////////////////////////////

// Read stored value of user (see modMapPage for details).
KungFu.map.user = KungFu.loadValue("user");
KungFu.map.userPoints = 1;

// make us visible to the page...
// This could be dangerous - TW could hack into your farming settings! ;)
unsafeWindow.KungFu = KungFu;


// Execute mods
KungFu.modOverviewPage();
KungFu.modPropertyInline();
KungFu.modPropertyPage();
KungFu.map.modMapPage();
KungFu.modVillageInfoPage();
KungFu.modPlacePage();
KungFu.modConfirmPage();
KungFu.modTrainPage();


