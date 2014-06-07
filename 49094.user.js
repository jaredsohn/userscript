// ==UserScript==
// @name           Darwin's Lib
// @namespace      Darwin's Lib
// @description    Libreria de Darwin's.
// @author         Monkey
// ==/UserScript==

String.prototype.Trim = function() { return this.replace(/(^\s*)|(\s*$)/g, ""); }
String.prototype.LTrim = function() { return this.replace(/(^\s*)/g, ""); }
String.prototype.RTrim = function() { return this.replace(/(\s*$)/g, ""); }
String.prototype.TrimHTML = function() { return this.replace(/(<[^>]*>)/g, ""); }

function isString(s) { return "string" == typeof s; }
function isNumber(n) { return "number" == typeof n; }
function isObject(o) { return "object" == typeof o; }
function isInteger(s) { var n = trim(s); return n.length > 0 && !(/[^0-9-]/).test(n); }
function isFloat(s) { var n = trim(s); return n.length>0 && !(/[^0-9.-]/).test(n) && (/\.\d/).test(n); }
function trim(s) { return s.toString().replace(/^\s+|\s+$/g, ""); }
function rand(min,max) { return Math.floor(Math.random()*(max-min+1)+min); }

function serialize(txt) {
	return uneval(txt); //new version
}
function unserialize(txt){
  if (txt.substr(0,1) == "(") { //new version
    return eval(txt);
  }
  var level=0,arrlen=new Array(),del=0,final=new Array(),key=new Array(),save=txt;
  while(1){
    switch(txt.substr(0,1)){
    case 'N':
      del = 2;
      ret = null;
    break;
    case 'b':
      del = txt.indexOf(';')+1;
      ret = (txt.substring(2,del-1) == '1')?true:false;
    break;
    case 'i':
      del = txt.indexOf(';')+1;
      ret = Number(txt.substring(2,del-1));
    break;
    case 'd':
      del = txt.indexOf(';')+1;
      ret = Number(txt.substring(2,del-1));
    break;
    case 's':
      del = txt.substr(2,txt.substr(2).indexOf(':'));
      ret = txt.substr( 1+txt.indexOf('"'),del);
      del = txt.indexOf('"')+ 1 + ret.length + 2;
    break;
    case 'a':
      del = txt.indexOf(':{')+2;
      ret = new Object();
      arrlen[level+1] = Number(txt.substring(txt.indexOf(':')+1, del-2))*2;
    break;
    case 'O':
      txt = txt.substr(2);
      var tmp = txt.indexOf(':"')+2;
      var nlen = Number(txt.substring(0, txt.indexOf(':')));
      name = txt.substring(tmp, tmp+nlen );
      //log(name);
      txt = txt.substring(tmp+nlen+2);
      del = txt.indexOf(':{')+2;
      ret = new Object();
      arrlen[level+1] = Number(txt.substring(0, del-2))*2;
    break;
    case '}':
      txt = txt.substr(1);
      if(arrlen[level] != 0){log('var missed : '+save); return undefined;};
      //log(arrlen[level]);
      level--;
    continue;
    default:
      if(level==0) return final;
      log('syntax invalid(1) : '+save+"\nat\n"+txt+"level is at "+level);
      return undefined;
    }
    if(arrlen[level]%2 == 0){
      if(typeof(ret) == 'object'){log('array index object no accepted : '+save);return undefined;}
      if(ret == undefined){log('syntax invalid(2) : '+save);return undefined;}
      key[level] = ret;
    } else {
      var ev = '';
      for(var i=1;i<=level;i++){
        if(typeof(key[i]) == 'number'){
          ev += '['+key[i]+']';
        }else{
          ev += '["'+key[i]+'"]';
        }
      }
      eval('final'+ev+'= ret;');
    }
    arrlen[level]--;//log(arrlen[level]-1);
    if(typeof(ret) == 'object') level++;
    txt = txt.substr(del);
    continue;
  }
}

function get(url, fn , tag) {
	GM_xmlhttpRequest({
        method: "GET",
           url: url,
       headers: {
          'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-TW; rv:1.9.0.3) Gecko/2008092417 Firefox/3.0.3',
             'Referer': 'http://' + location.host + '/index.php',
              'Cookie': document.cookie
                },
        onload: function(responseDetails) { fn(responseDetails.responseText, tag); } });
}

function getDocument(responseText) {
	var html = document.createElement("html");
	html.innerHTML = responseText;
	var response = document.implementation.createDocument("", "", null);
	response.appendChild(html);
	return response;
}

function getArrValue(arr, key, defaultValue) {
	if (arr == undefined || arr[key] == undefined)
		return defaultValue;
	return arr[key];
}

function $(id) {
	return document.getElementById(id);
}

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
		result.push( next );
      return result;
  }
}
function postUrl(strurl) {
	return postWrap(url(strurl));
}

function getLocalTime(milliseconds) {
	var currenttime = new Date().getTime();
	return currenttime + milliseconds;
}

function twodigit(val) {
	val = val%100;
	if(val < 10) {
		return "0"+val;
	}
	return val;
}
function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getNode(path) {
	var value = xpath(path);
	log("path: "+path+", size:"+value.snapshotLength);
	if (value.snapshotLength == 1)
    	return value.snapshotItem(0);
	for(var i = 0; i < value.snapshotLength; i++) {
		log(i+".: "+getPath(value.snapshotItem(i)));
	}
	return null;
}
function getPath(node) {
	if (node == null || node == undefined)
		return "/";
	return getPath(node.parentNode) + "/" + node.nodeName + "["+node.id+"]";
}
function getNode_value(path, defaultValue) {
	var value = getNode(path);
	if (value != null)
		return value.value;
	return defaultValue;
}

function getNodeValue(path, defaultValue) {
	var value = getNode(path);
	if (value != null)
		return value.textContent;
	return defaultValue;
}

function getNodeTitle(path, defaultValue) {
	var value = getNode(path);
	if (value != null) {
		if (value.title != "" && value.title != undefined)
    		return value.title;
	}
	return defaultValue;
}

function getIntValue(str, defaultValue) {
	if (str == undefined)  return defaultValue;
	var temp = str.toString();
	temp = temp.replace(/[^0-9]+/g, "");
	temp = parseInt(temp);
	if (defaultValue != undefined && (temp == undefined || (temp == "NaN"))) {
		return defaultValue;
	}
	return temp;
}

function getFloatValue(str, defaultValue) {
	if (str == undefined)  return defaultValue;
	var temp = str.toString();
	temp = temp.replace(/[^0-9.-]+/g, "");
	temp = parseFloat(temp);
	if (defaultValue != undefined && (temp == undefined || (temp == "NaN"))) {
		return defaultValue;
	}
	return temp;
}

function getNextNode(node) {
	var n = node.nextSibling;
	while (n != undefined && n != null && n.nodeName == "#text") {
		n = n.nextSibling;
	}
	return n;
}

function getPreviousNode(node) {
	var n = node.previousSibling;
	while (n != undefined && n != null && n.nodeName == "#text") {
		n = n.previousSibling;
	}
	return n;
}
function insertNodeAfter(newNode,targetNode) {
    var parent = targetNode.parentNode;
    if(parent.lastchild == targetNode) {
        parent.appendChild(newNode);
    } else {
        parent.insertBefore(newNode, targetNode.nextSibling);
    }
}
function url(query) {
	return (location.search || "").replace(/([#?].*)?$/, query||"");
}