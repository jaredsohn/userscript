// ==UserScript==
// @name           TextArea Improver
// @namespace      http://ideome.legtux.org
// @description    Improve the edition in textareas
// @include        *
// ==/UserScript==

// ! (Work in progress) !

var ENDLINE = "\n";
var TAB = "  ";
var PUCE_CHARS = " ->*#+=_";

function inArray(elem, array)
{ return array.indexOf(elem)>=0; }

function addEvent(elem, even, func)  
{  
  if (elem.addEventListener)  
    elem.addEventListener(even, func, false);  
  else  
    elem.attachEvent('on'+even, func);  
}

function stopEvent(event)
{
  if (event.stopPropagation)
    event.stopPropagation();
  else if(event.cancelBubble)
    event.cancelBubble=true;
  
  if (event.preventDefault)  
    event.preventDefault();  
  event.returnValue = false;
}

var toClipboard = function(str) {};

if (window.clipboardData)
  toClipboard = function(str) {window.clipboardData.setData(str);};
else
{
  try
  {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
    toClipboard = function(str) {gClipboardHelper.copyString(str);};
  }
  catch (e) {
    /*alert("Impossible d'accéder au presse-papier. Veuillez configurer votre navigateur.");*/ }
}

// On pourrait optimiser pour l'utilisation qu'il en est fait :
function nbOcc(subStr, str)
{
  var counter = 0;
  var pos = 0;
  var step = subStr.length;
  while ((pos = str.indexOf(subStr,pos)) >= 0)
  {
    counter++;
    pos += step;
  }
  return counter;
}

// TODO : regex & enum(Right|Left) à la place de caractère & incrément ?
function extendIncr(str, pos, incr, chEnd)
{
  if (chEnd == undefined)
    chEnd = ENDLINE;
  var maxPos = str.length;
  while (pos >= 0 && pos < maxPos && str[pos] != chEnd)
    pos += incr;
  return pos;
}

function extendLeft(str, pos, chEnd)
{ return extendIncr(str, pos-1, -1, chEnd)+1; }

function extendRight(str, pos, chEnd)
{ return extendIncr(str, pos, 1, chEnd); }

function extend(str, sel, chStart, chEnd)
{
  var ret = {
    start: extendLeft(str, sel.start, chStart),
    end: extendRight(str, sel.end, chEnd) };
  if (ret.start > ret.end)
    ret.start = ret.end;
  return ret;
}

function getPuce(str, pos)
{
  var sPuce = extendLeft(str, pos);
  
  var ePuce = sPuce;
  while (inArray(str[ePuce], PUCE_CHARS))
    ePuce++;
  ePuce = Math.min(ePuce, pos);
 
  return str.substr(sPuce,ePuce-sPuce);
}

function improveEdition(zone)
{
  if (zone.style.maxWidth == "")
    zone.style.maxWidth = "100%";
  
  if (zone.selectionStart == undefined) zone.selStart = function() {
    this.focus();
    var range = this.createTextRange();
    range.moveToBookmark(document.selection.createRange().getBookmark());
    range.moveEnd('character', this.value.length);
    return this.value.length - range.text.length;
  };
  else zone.selStart = function() {
    return zone.selectionStart;
  };

  if (zone.selectionEnd == undefined) zone.selEnd = function() {
    this.focus();
    var range = this.createTextRange();
    range.moveToBookmark(document.selection.createRange().getBookmark());
    range.moveEnd('character', this.value.length);
    return this.value.length - range.text.length;
  };
  else zone.selEnd = function() {
    return zone.selectionEnd;
  };

  if (zone.setSelectionRange == undefined) zone.setSelRange = function(start, end) {
    end = end || start;
    this.focus();
    var range = this.createTextRange();
    range.moveStart('character', start);
    range.moveEnd('character', - this.value.length + end);
    range.select();
  };
  else zone.setSelRange = function(start, end) {
    end = end || start;
    zone.setSelectionRange(start, end);
  }
  
  var nextSelection = {
    ALL: 0,
    START: 1,
    END: 2,
    DEFAULT: 3
  };
  
  zone.replace = function(start, end, nStr, nSel) {
    if (nSel == undefined || nSel == nextSelection.DEFAULT)
    {
      if (nbOcc(ENDLINE, nStr) < 2)
        nSel = nextSelection.END;
      else
        nSel = nextSelection.ALL;
    }
    var nEnd = start + nStr.length;
    var scroll = this.scrollTop;
    this.value = this.value.substring(0,start) + nStr + this.value.substring(end);
    this.setSelRange(nSel==nextSelection.END? nEnd : start, nSel==nextSelection.START? start : nEnd);
    this.scrollTop = scroll;
  }

  zone.getSel = function()
  { return { start:this.selStart(), end:this.selEnd() }; }
  
  zone.getSelExtend = function(cStart, cEnd)
  {
    var ret = extend(this.value, this.getSel(), cStart, cEnd);
    ret.val = this.value.substring(ret.start, ret.end); // incohérence...
    return ret;
  }
  
  // Fonctions suivantes en membres de zone pour plus de cohérence ?
  // Ajouter un niveau d'abstraction ?
  
  function indent()
  {
    var sel = zone.getSelExtend();
    sel.val = sel.val.replace(/^/mg, TAB);
    zone.replace(sel.start, sel.end, sel.val);
    
    return true;
  }

  function unindent()
  {
    var sel = zone.getSelExtend();
    sel.val = sel.val.replace(new RegExp("^"+TAB, "mg"), "");
    zone.replace(sel.start, sel.end, sel.val);
    
    return true;
  }

  function duplicate()
  {
    var sel = zone.getSelExtend();
    zone.replace(sel.end+1, sel.end, sel.val);
    
    return true;
  }
  
  function addLine()
  {
    var sel = zone.getSel();
    var puce = getPuce(zone.value, sel.start);
    zone.replace(sel.start, sel.end, ENDLINE+puce);
    
    return true;
  }

  function cutLine()
  {
    var sel = zone.getSelExtend();
    toClipboard(sel.val);
    zone.replace(sel.start, sel.end+1, "");
    
    return true;
  }
  
  function replaceLine()
  {
    var sel = zone.getSelExtend();
    zone.replace(sel.start, sel.end, "");
    
    return true;
  }
  
  function delLineLeft()
  {
    var sel = zone.getSel();
    zone.replace(extendLeft(zone.value,sel.start), sel.end, "");
    
    return true;
  }

  function delLineRight()
  {
    var sel = zone.getSel();
    zone.replace(sel.start, extendRight(zone.value,sel.end), "");
    
    return true;
  }
  
  function kPress(e)
  {
    e = e || window.event;
    var kCode = e.which || e.keyCode;
    var action = function() { return false; };
    
    switch (e.ctrlKey)
    {
      case false: switch (e.shiftKey)
      {
        case false: switch (kCode)
        {
          case 9: action = indent; break; // tabulation
          case 13: action = addLine; break; // saut de ligne
        } break;
        case true: switch (kCode)
        {
          case 9: action = unindent; break; // tabulation
        } break;
      } break;
      
      case true: switch (kCode)
      {
        case 100: action = duplicate; break; // d
        case 108: action = cutLine; break; // l
        case 107: action = replaceLine; break; // k
        case 98: action = delLineLeft; break; // b
        case 101: action = delLineRight; break; // e
      } break;
    }
    
    if (action())
      stopEvent(e);
  }
  
  addEvent(zone, "keypress", kPress);
}

var TAs = document.getElementsByTagName("textarea");
for (var iTA = 0, nbTA = TAs.length; iTA < nbTA; iTA++)
  improveEdition(TAs[iTA]);
