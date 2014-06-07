// ==UserScript==
// @name           FW.Net: generell functions
// @namespace      http://www.ereglam.de
// @copyright      2010+, Ereglam (http://userscripts.org/users/ereglam)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description    generell functions to handle DOM and XPath and other basic needs (not intended to be installed)
// @exclude        *
// @grant          GM_log
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @author         Ereglam
// @info           defines a set of functions
// @version        1.1.5
// ==/UserScript==

/***************************************************************
  versions
***************************************************************/
var versions = {'FW.Net: generell functions': '1.1.5'};
/***************************************************************
  constants
***************************************************************/
var OptType = {
  bool: 'BOOL',
  radio: 'RAD',
  color: 'COLR',
  colList: 'CLST',
  list: 'LIST',
  integer: 'INT',
  string: 'STR',
  range: 'RNGE'
};

// Farbliste für Optionen
var ColorLst = {
  ''     : 'keine Farbe',
  red    : 'rot',
  darkred  : 'dunkelrot',
  blue   : 'blau',
  cyan   : 'blaugrün',
  brown  : 'braun',
  maroon : 'Kastanienbraun',
  yellow : 'gelb',
  beige  : 'beige',
  peru   : 'dunkelbeige', //#cd853f
  gray   : 'grau',
  green  : 'grün',
  darkgreen  : 'dunkelgrün',
  lime   : 'hellgrün',
  purple : 'lila',
  lightblue: 'hellblau',
  navy   : 'marineblau',
  olive  : 'olivgrün',
  orange : 'orange',
  darkorange: 'dunkelorange',
  teal   : 'petrol',
  fuchsia: 'pink',
  black  : 'schwarz',
  silver : 'silber',
  white  : 'weiß'
};

/***************************************************************
  functions
***************************************************************/
// add functionality to standard objects
if (typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}
if (typeof String.prototype.removeTags !== 'function') {
  String.prototype.removeTags = function () {
    return this.replace(/<.*>/g, '').trim();
  };
}
if (typeof String.prototype.insertAt !== 'function') {
  String.prototype.insertAt = function (loc, strChunk) {
    return (this.valueOf().substr(0, loc)) + strChunk + (this.valueOf().substr(loc));
  };
}
//*** This code is copyright 2004 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
//*** Reuse or modification is free provided you abide by the terms of that license.
//*** (Including the first two lines above in your source code mostly satisfies the conditions.)

// Rounds a number to a specified number of decimals (optional)
// Inserts the character of your choice as the thousands separator (optional)
// Uses the character of your choice for the decimals separator (optional)
//
// It's not a highly optimized speed demon, but it gives the right result...
// ...do you really care how speedy it is? :)
//
// !!Note!! IEWin gets (-0.007).format(2) WRONG, claiming that it's "0.00"
// This is a bug in IEWin's Number.toFixed() function.

Number.prototype.format = function (decimalPoints, thousandsSep, decimalSep) {
  var step = 3,
    off = 0,
    val = this.toString(),
    re = /^(-?)(\d+)/,
    num = '',
    denom = '';
  if (decimalPoints !== null) {
    val = this.toFixed(decimalPoints);
  }
  [num, denom] = val.split('.');
  if (thousandsSep && re.exec(num)) {
    for (off = num.length - step; off >= 1; off -= step) {
      num = num.insertAt(off, thousandsSep);
    }
  }
  if (denom) {
    if (decimalSep) {
      decimalSep = ',';
    }
    denom = decimalSep + denom;
  } else {
    denom = '';
  }
  return num + denom;
};

(function () {
  if (typeof Number.prototype.toFixed !== 'function' || (0.9).toFixed() === '0' || (0.007).toFixed(2) === '0.00') {
    Number.prototype.toFixed = function (f) {
      var k = '',
        z = '',
        a = '',
        b = '';
      if (isNaN(f *= 1) || f < 0 || f > 20) {
        f = 0;
      }
      var s = '', x = this.valueOf(), m = '';
      if (this < 0) {
        s = '-';
        x = x * -1;
      }
      if (x >= Math.pow(10, 21)) {
        m = x.toString();
      } else {
        m = Math.round(Math.pow(10, f) * x).toString();
        if (f !== 0) {
          k = m.length;
          if (k <= f) {
            z = '00000000000000000000'.substring(0, f + 1 - k);
            m = z + m;
            k = f + 1;
          }
          a = m.substring(0, k - f);
          b = m.substring(k - f);
          m = a + '.' + b;
        }
      }
      if (m === '0') {
        s = '';
      }
      return s + m;
    };
  }
}());

var $ = unsafeWindow.$;
var Element = unsafeWindow.Element;
var jQuery = j$ = unsafeWindow.jQuery;

// determine type of object (for lack of instanceof function in Greasemonkey)
function objType(iObj) {
  var type = '';

  if (typeof (iObj) !== 'undefined') {
    if (typeof iObj.getClass === 'function') {
      type = iObj.getClass();
    } else {
      if (iObj.nodeName) {
        type = iObj.nodeName;
      } else {
        type = typeof (iObj);
      }
    }
  } else {
    type = typeof (iObj);
  }
  return type;
}

// creates a text node
function createText(text) {
  return document.createTextNode(text);
}

// remove all child elements of node
function removeChildren(node) {
  var i = 0,
    len = 0;
  // get initial number of elements
  if (!node) {
    return;
  }
  len = node.childNodes.length;
  for (i = 1; i <= len; i++) {
    node.removeChild(node.childNodes[0]);
  }
}

// add an entity string to a node
function addEntityText(node, text) {
  node.innerHTML += text;
}

// returns the HTML code in including it's own tag
function outerHTML(iNode) {
  var div = new Element('div');
  div.appendChild(iNode);
  return div.innerHTML;
}

// returns list of parent nodes
function getParents(iNode) {
  var list = [],
    node;

  node = iNode;
  if (node.id) {
    list.push(node.nodeName + '@' + node.id);
  } else {
    list.push(node.nodeName);
  }
  while (node.parentNode) {
    node = node.parentNode;
    if (node.id) {
      list.push(node.nodeName + '@' + node.id);
    } else {
      list.push(node.nodeName);
    }
  }
  return list.reverse();
}

// posts a message on the javascript console
function writeStr(iMsg) {
  var now = new Date(),
    msg = now.toLocaleString(),
    logMsg;
  switch (objType(iMsg)) {
    case 'logCls':
      for each (logMsg in iMsg.getMsgs()) {
        msg += "\n" + logMsg;
      }
      break;
    default:
      msg += "\n" + iMsg;
      break;
  }

  if (isOpera()) {
    opera.postError(msg);
  } else if (isSafari()) {
    // according to the docs, GM_log is supported
    if (typeof(GM_log) !== undefined){
      GM_log(msg);
    }
  } else {
    GM_log(msg);
  }
}

function writeStack(e) {
  writeStr('\nERROR: '+e.message+'\nStack:\n'+e.stack);
}

// make an AJAX call
function xmlhttpRequest(iRequest) {
  if (isOpera() || isChrome() || isSafari()) {
    // not supported at this time
  } else {
    return GM_xmlhttpRequest(iRequest);
  }
}

// get the list of values
function listValues() {
  if (isOpera() || isChrome() || isSafari()) {
    // not supported at this time
  } else {
    return GM_listValues();
  }
}

// save a value in the script's memory
function setValue(name, val) {
  if (isOpera() || isChrome() || isSafari()) {
    var lifeTime = 31536000;
    document.cookie = escape(name) + "=" + escape(val) +
      ";expires=" + (new Date((new Date()).getTime() + (1000 * lifeTime))).toGMTString() + ";path=/";
  } else {
    GM_setValue(name, val);
  }
}

// loads a value from the script's memory
function getValue(name, def) {
  if (isOpera() || isChrome() || isSafari()) {
    var cookieJar = document.cookie.split("; "),
      key = '',
      value = '',
      footm = '';
    for(var x = 0; x < cookieJar.length; x++) {
      var [key, value] = cookieJar[x].split("=");
      if(key == escape(name)) {
        try {
          eval('footm = '+unescape(value));
          return footm;
        } catch(e) {
          return def; }
      }
    }
    return def;
  } else {
    return GM_getValue(name, def);
  }
}

// deletes a value from the script's memory
function delValue(name) {
  if(isOpera() || isChrome() || isSafari()) {
    var cookieJar = document.cookie.split("; ");
    for(var x = 0; x < cookieJar.length; x++) {
      var [key, value] = cookieJar[x].split( "=" );
      if( key == escape(name) ) {
        delete cookieJar[x];
        break;
      }
    }
  } else {
    return GM_deleteValue(name);
  }
}

function addStyle(iCssStr) {
  if(isOpera() || isChrome() || isSafari()){
    // to be developed
  } else {
    return GM_addStyle(iCssStr);
  }
}

// determines the browser to be Opera
function isOpera() {
  return typeof(opera) !== "undefined";
}

// determines the browser to be Apple's Safari
function isSafari() {
  return typeof(safari) !== "undefined" || /apple/i.test(navigator.vendor) || /safari/i.test(navigator.userAgent);
}

// determines the browser to be Google Crome
function isChrome() {
  return typeof(chrome) != "undefined";
}

function convertRGBDecimalToHex(rgb) {
  var regex = /rgb *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3}) *\)/;
  var values = regex.exec(rgb);
  if (values.length != 4) {
    return rgb; // fall back to what was given.
  }
  var r = Math.round(parseFloat(values[1]), 10);
  var g = Math.round(parseFloat(values[2]), 10);
  var b = Math.round(parseFloat(values[3]), 10);
  return "#"
      + (r + 0x10000).toString(16).substring(3).toUpperCase()
      + (g + 0x10000).toString(16).substring(3).toUpperCase()
      + (b + 0x10000).toString(16).substring(3).toUpperCase();
}

/***************************************************************
  classes
***************************************************************/
// XPath class masking functions
var xPath = (function XPathCls() {
  return {
  // define static elements of class xPathCls
  // declare shorter names for XPathResult elements
  type: {
    ANY:               XPathResult.ANY_TYPE,
    NUMBER:            XPathResult.NUMBER_TYPE,
    STRING:            XPathResult.STRING_TYPE,
    BOOL:              XPathResult.BOOLEAN_TYPE,
    ITERATOR:          XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
    ITERATOR_ORDERED:  XPathResult.ORDERED_NODE_ITERATOR_TYPE,
    SNAPSHOT:          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    SNAPSHOT_ORDERED:  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    ANY_NODE:          XPathResult.ANY_UNORDERED_NODE_TYPE,
    FIRST_ORDERED:     XPathResult.FIRST_ORDERED_NODE_TYPE,
  },

  // set the class name
  getClass: function() {
    return 'XPathCls';
  },

  // searches for nodes using XPath
  getXPath: function (xPathStr, root, resType) {
    return document.evaluate(xPathStr, ((root)?$(root):document), null, resType, null);
  },

  // get a single node using XPath
  getSingle: function (xPathStr, root) {
    return this.getXPath(xPathStr, root, this.type.FIRST_ORDERED).singleNodeValue;
  },

  // get a list of nodes as a snapshot using XPath
  getNodes: function (xPathStr, root) {
    return this.getXPath(xPathStr, root, this.type.SNAPSHOT_ORDERED);
  }
}
}());

//Application log
function logCls(iType) {
  var msgs = [];
  var type = '';

  // Typen mit kürzeren Bezeichnern deklarieren
  this.type = {
    success: 'S',
    info:    'I',
    error:   'E',
  };

  this.getClass = function() {
    return 'logCls';
  }

  this.getType = function() {
    return type;
  }

  this.setType = function(iType) {
    type = iType;
  }

  this.addMsg = function(iMsg) {
    msgs.push(iMsg);
  }

  this.addVarMsg = function(iText, iVal, iVar) {
    if(iVar === undefined) {
      iVar = iVal
    }
    this.addMsg(iText+' "'+iVal+'" ('+objType(iVar)+')');
  }

  this.getMsgs = function() {
    return msgs;
  }

  this.refresh = function() {
    msgs = [];
  }

  this.getCount = function() {
    return msgs.length;
  }

  this.display = function() {
    var msgStr = '';
    for each (msg in msgs) {
      msgStr += msg + '\n';
    }
    writeStr(msgStr);
  }

  if(iType) {
    this.setType(iType);
  }
}

//Exception class
function exceptCls(iMsg) {
  var msg = '';
  var paths = [];

  this.getClass = function() {
    return 'exceptCls';
  }

  this.setMsg = function(iMsg) {
    msg = iMsg
  }

  this.getMsg = function() {
    return msg;
  }

  this.addPath = function(iPath) {
    paths.push(iPath);
  }

  this.getPaths = function() {
    return paths;
  }

  this.pathsDel = function() {
    paths = [];
  }

  this.getCount = function() {
    return paths.length;
  }

  if(iMsg) {
    this.setMsg(iMsg);
  }
}

// HTML table cell
function tableCellCls(iAttrib, iIsHeadCell) {
  var attrib = {};
  if (typeof(iAttrib) == 'object') {
    attrib = iAttrib;
  }
  var node = new Element(((iIsHeadCell)?'th':'td'), attrib);

  this.getClass = function() {
    return 'tableCellCls';
  }

  this.addChild = function(iNode) {
    node.appendChild(iNode);
  }

  this.addText = function(iText) {
    node.appendChild(createText(iText));
  }

  // add an entity string to a node element
  this.addEntityText = function(iText) {
    node.innerHTML += iText;
  }

  this.addClass = function(iClassStr) {
    node.className += ((node.className)?' ':'') + iClassStr;
  }

  this.setClass = function(iClassStr) {
    node.className = iClassStr;
  }

  this.getStyle = function() {
    return node.style;
  }

  this.getColspan = function() {
    return node.colSpan?parseInt(node.colSpan):1;
  }

  this.setColspan = function(iColspan) {
    return node.colSpan = iColspan;
  }

  this.getDOM = function() {
    return node;
  }
}

// HTML table row
function tableRowCls(iAttrib){
  var attrib = {};
  var cells = [];

  this.getClass = function() {
    return 'tableRowCls';
  }

  this.addCell = function(iCell) {
    cells.push(iCell);
    return iCell;
  }

  this.getNewCell = function(iAttrib, iIsHeadCell) {
    return this.addCell(new tableCellCls(iAttrib, iIsHeadCell));
  }

  this.addClass = function(iClassStr) {
    if (!attrib.class) {
      attrib.class = '';
    }
    attrib.class += ((attrib.class)?' ':'') + iClassStr;
  }

  this.setClass = function(iClassStr) {
    if (!attrib.class) {
      attrib.class = '';
    }
    attrib.class = ((attrib.class)?' ':'') + iClassStr;
  }

  this.getColumns = function() {
    var cols = 0;
    for each (cell in cells) {
      cols += cell.getColspan();
    }
    return cols;
  }

  this.getDOM = function() {
    nodeTR = new Element('tr', attrib);
    for each (cell in cells) {
      nodeTR.appendChild(cell.getDOM());
    }

    return nodeTR;
  }

  if (typeof(iAttrib) === 'object') {
    attrib = iAttrib;
  }
}

// HTML table
function tableCls(iAttrib) {
  const location = {BODY: 'b', HEAD: 'h', FOOT: 'f'};
  var head = [];
  var body = [];
  var foot = [];
  var caption = '';
  var attrib = {};

  this.getClass = function() {
    return 'tableCls';
  }

  this.addBodyRow = function(iRow) {
    return this.addRow(iRow, location.BODY);
  }

  this.addHeadRow = function(iRow) {
    return this.addRow(iRow, location.HEAD);
  }

  this.addFootRow = function(iRow) {
    return this.addRow(iRow, location.FOOT);
  }

  this.getNewBodyRow = function(iAttrib) {
    return this.addRow(new tableRowCls(iAttrib), location.BODY);
  }

  this.getNewHeadRow = function(iAttrib) {
    return this.addRow(new tableRowCls(iAttrib), location.HEAD);
  }

  this.getNewFootRow = function(iAttrib) {
    return this.addRow(new tableRowCls(iAttrib), location.FOOT);
  }

  this.addRow = function(iRow, loc) {
    switch (loc) {
      case undefined:
      case location.BODY:
        body.push(iRow);
        break;
      case location.HEAD:
        head.push(iRow);
        break;
      case location.FOOT:
        foot.push(iRow);
        break;
    }
    return iRow;
  }

  this.setCaption = function(iCaption) {
    caption = iCaption;
  }

  this.getColumns = function() {
    var cols = 0;
    for each (section in [head, foot, body]) {
      if (section.length > 0) {
        cols = section[0].getColumns();
        break;
      }
    }
    return cols;
  }

  this.getDOM = function() {
    var nodeTBody;
    var nodeTable = new Element('table',
                                attrib);

    if (head.length > 0 || caption) {
      nodeTBody = new Element('thead');
      nodeTable.appendChild(nodeTBody);

      if (caption) {
        var row = new tableRowCls({'class': 'caption'});
        var cell = row.getNewCell({}, true);
        cell.setColspan(this.getColumns());
        cell.addText(caption);
        var nodeTR = row.getDOM();
        if (head.length > 0) {
          nodeTR.style.borderBottomWidth = '0px';
        }
        nodeTBody.appendChild(nodeTR);
      }

      for each(row in head) {
        nodeTBody.appendChild(row.getDOM());
      }
    }

    if (foot.length > 0) {
      nodeTBody = new Element('tfoot');
      nodeTable.appendChild(nodeTBody);

      for each(row in foot) {
        nodeTBody.appendChild(row.getDOM());
      }
    }

    nodeTBody = new Element('tbody');
    nodeTable.appendChild(nodeTBody);

    for each(row in body) {
      nodeTBody.appendChild(row.getDOM());
    }

    return nodeTable;
  }

  if (typeof(iAttrib) == 'object') {
    attrib = iAttrib;
  }
}

// Liste der Optionen
function optListCls() {
  // 'private' Variablen
  var list = {}; // Liste der Optionen

  this.getClass = function() {
    return 'optListCls';
  }

  this.addOpt = function(iOpt) {
    list[iOpt.getName()] = iOpt;
  }

  this.getOpt = function(iOptStr) {
    return list[iOptStr];
  }

  this.getOptVal = function(iOptStr) {
    return this.getOpt(iOptStr).getValue();
  }

  this.getList = function() {
    return list;
  }

  this.save = function() {
    var success = true;
    applLog.refresh();
    for each (opt in list) {
      if (!opt.save()) {
        success = false;
      }
    }
    writeStr(applLog);
    applLog.refresh();
    return success;
  }

  this.write = function() {
    var result = '';
    for each(opt in list) {
      result += opt.write() + '\n';
    }
    return result;
  }
}

// Option
// Parameter: Name, Option (als OptionLst-Element), Optionsgruppe (als OptGrpCls)
function optCls(iName, iOpt, iGrp) {
  // 'private' Variablen
  this.GMVAL_PREF_OPT = 'opt_';
  var name   = '';
  var value;  //kein Initialwert
  var valDef; //kein Initialwert
  var group  = {};
  var type   = '';
  var length = 0;
  var chkFuncDummy = function (iVal, iOpt){ return true }; //leere Funktion
  var chkFunc = chkFuncDummy; //leere Funktion
  var text   = '';
  var valList = new optValListCls('undef'); //enthält Liste von Optionen bei Radiobutton und DropDown-Liste
  var isMod  = false;
  var gmKey  = '';

  this.getClass = function() {
    return 'optCls';
  }

  this.getName = function() {
    return name;
  }

  this.setName = function(iName) {
    name = iName;
  }

  this.getValue = function() {
    return value;
  }

  this.setValue = function(iVal) {
    value = iVal;
    isMod = (value != valDef);
  }

  this.getGroup = function() {
    return group;
  }

  this.setGroup = function(iGrp) {
    group = iGrp;
  }

  this.getType = function() {
    return type;
  }

  this.setType = function(iType) {
    type = iType;
  }

  this.getLen = function() {
    return length;
  }

  this.setLen = function(iLen) {
    length = iLen;
  }

  this.getChkFunc = function() {
    return chkFunc;
  }

  this.hasChkFunc = function() {
    return (typeof(chkFunc) == 'function') && (chkFunc !== chkFuncDummy);
  }

  this.setChkFunc = function(iChkFunc) {
    if (typeof(iChkFunc) == 'function') {
      chkFunc = iChkFunc;
    } else {
      chkFunc = chkFuncDummy; //leere Funktion
    }
  }

  this.execChkFunc = function(iVal) {
    return chkFunc(iVal, this);
  }

  this.hasValList = function() {
    return (valList.hasContent());
  }

  this.getList = function() {
    return valList.getList();
  }

  this.getListVal = function(iKey) {
    return valList.getOptVal(iKey);
  }

  this.addToList = function(key, value) {
    valList.addOptVal(new optValCls(key, value));
  }

  this.clearList = function() {
    valList = {};
  }

  this.getText = function() {
    return text;
  }

  this.setText = function(iTxt) {
    text = iTxt;
  }

  this.isModified = function() {
    return isMod;
  }

  this.load = function(iVal) {
    valDef = iVal;
    this.setValue(getValue(gmKey, valDef));
  }

  this.save = function() {
    if (isMod) {
      applLog.addMsg('speichere ' + this.getName() + ', Wert = ' + this.getValue());
      setValue(gmKey, value);
    } else {
      if (getValue(gmKey, '##') != '##') {// notwendig wegen Boolean-Werten
        applLog.addMsg('entferne ' + this.getName());
        delValue(gmKey);
      }
    }
    return true;
  }

  var isLenReq = function() {
    var isReq = true;
    switch(type)  {
      case OptType.bool:
      case OptType.radio:
      case OptType.colList:
      case OptType.list:
        isReq = false;
        break;
      default :
        break;
    }
    return isReq;
  }

  this.write = function() {
    return ((this.isModified())?'*':' ') + this.getName() + ' (' + this.getText() + '), Gruppe ' + this.getGroup() + ', vom Typ ' +
            this.getType() + ((isLenReq())?'(' + this.getLen().toString() + ')':'') + ' = ' +
            this.getValue() + ((this.isModified())?'(' + valDef + ')':'') +
            ((this.hasValList())?'\nOptionsliste ' + valList.write():'');
  }

  gmKey = this.GMVAL_PREF_OPT + iName;
  this.setName(iName);
  this.load(iOpt.valDef);
  mod = false;
  this.setGroup(iGrp);
  this.setType((iOpt.type)?iOpt.type:OptType.bool);
  this.setLen((iOpt.length)?iOpt.length:1);
  this.setChkFunc(iOpt.valChkFunc);
  switch(this.getType()) {
    case OptType.radio:
    case OptType.colList:
    case OptType.list:
      this.setText(iOpt.text);
      valList = new optValListCls(this.getText());
      for (opt in iOpt.list) {
        this.addToList(opt, iOpt.list[opt]);
      }
      break;
    default:
      this.setText(iOpt.text);
  }
}

function optValListCls(iName) {
  // 'private' Variablen
  var name = '';
  var list = {}; //Liste der Optionen zur Gruppe
  var hasVals = false;

  this.getClass = function() {
    return 'optValListCls';
  }

  this.addOptVal = function(iOptVal) {
    list[iOptVal.getKey()] = iOptVal;
    hasVals = true;
  }

  this.clearValList = function() {
    list = {};
    hasVals = false;
  }

  this.getList = function() {
    return list;
  }

  this.getOptVal = function(iKey) {
    return list[iKey];
  }

  this.getName = function() {
    return name;
  }

  this.setName = function(iName) {
    name = iName;
  }

  this.hasContent = function() {
    return (hasVals);
  }

  this.toString = function() {
    var optArr = new Array;
    for each(optVal in list) {
      optArr.push(optVal);
    }
    return ((optArr.length > 0)?optArr.join('; '):'');
  }

  this.write = function() {
    var optArr = new Array;
    for each(optVal in list) {
      optArr.push(optVal.write());
    }
    return this.getName() + ((optArr.length > 0)?': {' + optArr.join('; ') + '}':'');
  }

  this.setName(iName);
  this.clearValList();
}

function optValCls(iKey, iVal) {
  // 'private' Variablen
  var key   = '';
  var value = '';

  this.getClass = function() {
    return 'optValCls';
  }

  this.setKey = function(iKey) {
    key = iKey;
  }

  this.getKey = function() {
    return key;
  }

  this.setVal = function(iVal) {
    value = iVal;
  }

  this.getVal = function() {
    return value;
  }

  this.toString = function() {
    return this.getKey() + '= ' + this.getVal();
  }

  this.write = function() {
    return this.getKey() + '= ' + this.getVal();
  }

  this.setKey(iKey);
  this.setVal(iVal);
}

// Liste der Optionsgruppen
function optGrpListCls() {
  // 'private' Variablen
  var list = {}; // Liste der Optionsgruppen

  this.getClass = function() {
    return 'optGrpListCls';
  }

  this.addOptGrp = function(iOptGrp) {
    list[iOptGrp.getName()] = iOptGrp;
  }

  this.getOptGrp = function(iOptGrpStr) {
    return list[iOptGrpStr];
  }

  this.getList = function() {
    return list;
  }

  this.write = function() {
    var result = '';
    for each(grp in list)
    { result += grp.write() + '\n';
    }
    return result;
  }
}

// Optionsgruppe
// Parameter: Name, Text
function optGrpCls(iName, iTxt) {
  // 'private' Variablen
  var name = '';
  var text = '';
  var list = {}; //Liste der Optionen zur Gruppe

  this.getClass = function() {
    return 'optGrpCls';
  }

  this.addOpt = function(iOpt) {
    list[iOpt.getName()] = iOpt;
  }

  this.getOptList = function() {
    return list;
  }

  this.getName = function() {
    return name;
  }

  this.setName = function(iName) {
    name = iName;
  }

  this.getText = function() {
    return text;
  }

  this.setText = function(iTxt) {
    text = iTxt;
  }

  this.write = function() {
    var result = this.getName() + ' (' + this.getText() + ')';
    var optArr = new Array;
    for each(opt in list) {
      optArr.push(opt.getName());
    }
    return result + ((optArr.length > 0)?', Optionen: {' + optArr.join(', ') + '}':'');
  }

  this.setName(iName);
  this.setText(iTxt);
}

var ValueLstCls = function ValueLstCls(lst) {
  this.list = lst;
};

ValueLstCls.prototype = {
  getList: function () {return this.list;},
  find: function find (val) {
      var entry, v, sVal = 0, maxVal = 0, list = this.list;
      for (v in list) {
        if (list.hasOwnProperty(v)) {
          sVal = parseInt(v, 10);
          if (val >= sVal && sVal > maxVal) {
            entry = list[v];
            maxVal = sVal;
          } else {
            //break;
          };
        };
      };

      return entry;
    }
};
