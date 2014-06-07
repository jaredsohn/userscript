// ==UserScript==
// @name        Baidu++
// @namespace   http://www.5isharing.com
// @version     1.7.5
// @include     http://www.baidu.com/s?*
// @include     http://www.baidu.com/baidu?*
// @description 增强百度搜索结果页
// @copyright   2009+, chrisyue
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function() {

var version = "1.7.5";

// ==Functions==
// emulate greasemonkey api
if (!GM_setValue) {
  function GM_setValue(key, value) {
    localStorage.setItem(key, value);
  }
}

if (!GM_getValue) {
  function GM_getValue(key, def) {
    var ret = localStorage.getItem(key);
    if (ret == 'false') {
      ret = false;
    }
    if (!ret && ret !== false) {
      return def;
    }
    return ret;
  }
}

if (!GM_addStyle) {
  function GM_addStyle(css)
  {
    var style  = document.createElement("style");
    style.type = 'text/css';
    style.innerHTML = "/* <![CDATA[ */\n" + css + "\n/* ]]> */";
    document.getElementsByTagName('head')[0].appendChild(style);
  }
}

if (!GM_xmlhttpRequest) {
  function GM_xmlhttpRequest(obj, callbackKey, callbackValue)
  {
    window[callbackValue] = obj.onload;
    obj.url += "&" + callbackKey + "=" + callbackValue;
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = obj.url;
    document.body.appendChild(script);
  }
}
// sometimes they are not allowed
//var $          = document.getElementById;
//var n          = document.getElementsByName;
//var create     = document.createElement;
//var createText = document.createTextNode;
function $(id) {
  return document.getElementById(id);
}

function n(name) {
  return document.getElementsByName(name);
}

function create(elm) {
  return document.createElement(elm);
}

function createText(text) {
  return document.createTextNode(text);
}

function c(cls, parent)
{
  return (parent || document).getElementsByClassName(cls);
}

function t(tag, parent)
{
  return (parent || document).getElementsByTagName(tag);
}

function x(xpath, parent, type, result)
{
  return document.evaluate(
    xpath, 
    parent || document, 
    null,  
    type || 7, 
    result
  );
}

function remove(elm)
{
  if (elm.snapshotItem) {
    for (var i = 0; i < elm.snapshotLength; i++) {
      remove(elm.snapshotItem(i));
    }
  } else if (elm[0]) {
    while (elm[0]) {
      remove(elm[0]);
    }
  } else {
    elm.parentNode.removeChild(elm);
  }
}

function append(elm, parent, first)
{
  if (elm.snapshotItem) {
    for (var i = 0; i < elm.snapshotLength; i++) {
      append(elm.snapshotItem(i), parent, first);
    }
  } else if (elm[0]) {
    for (var i = 0; i < elm.length; i++) {
      append(elm[i], parent, first);
    }
  } else {
    if (first && parent.firstChild) {
      parent.insertBefore(elm, parent.firstChild);
    } else {
      parent.appendChild(elm);
    }
  }
}

function clear(elm)
{
  while (elm.firstChild) remove(elm.firstChild);
}

function before(n, o)
{
  o.parentNode.insertBefore(n, o);
}

function after(n, o)
{
  o.nextSibling ? before(n, o.nextSibling) : append(n, o.parentNode);
}

function prev(a)
{
  var p = a.previousSibling;
  if (p) {
    if (p.tagName) {
      return p;
    }
    return prev(p);
  }
}

function next(a)
{
  var n = a.nextSibling;
  if (n) {
    if (n.tagName) {
      return n;
    }
    return next(n);
  }
}

function gm(name, value)
{
  return GM_getValue(name, value);
}

function getTld(hostname)
{
  // a very easy way, not very accurate
  var hostParts = hostname.split(".");
  if (hostParts.length < 3) return hostname;

  // this info must be no mistake 'cause it is from wiki
  var gTLD = [
    "aero", "asia", "cat", "coop", "int", "com", "net", 
    "org", "gov", "edu", "biz", "info", "name", "jobs", 
    "mil", "mobi", "museum", "pro", "tel", "travel"
  ];
  var rootDomain = hostParts[hostParts.length - 2] 
    + "."
    + hostParts[hostParts.length - 1];
  if (gTLD.hasGot(hostParts[hostParts.length - 2])) {
    rootDomain = hostParts[hostParts.length - 3] 
      + "." 
      + rootDomain;
  }
  return rootDomain;
}

// use the new thumb site open.thumbshots.org
// so baidu++ works with autopager completely now
//function generateImageFromUrl(image, url, data)
//{
//  // this is the most interesting part ... I'm so cool :)
//  var request = {
//    method: "GET",
//    url: url,
//    overrideMimeType: 'text/plain; charset=x-user-defined',
//    onload: function(xhr) {
//      var data = xhr.responseText.toBinary();
//      var base64_data = btoa(data);
//      var data_url = 'data:' 
//        + getMimeFromData(data)
//        + ';base64,' 
//        + base64_data;
//      image.src = data_url;
//    }
//  }
//  
//  if (data) {
//    request.method = "POST";
//    request.headers = {'Content-type':'application/x-www-form-urlencoded'};
//    request.data = data;
//  }
//  
//  GM_xmlhttpRequest(request);
//}

//function getMimeFromData(data)
//{
//  switch (true) {
//    case 'GIF'  == data.substr(0, 3): return 'image/gif';
//    case 'PNG'  == data.substr(1, 3): return 'image/png';
//    case 'JFIF' == data.substr(6, 4): return 'image/jpg';
//  }
//}

function parseHeaders(metadataBlock)
{
  var headers = {};
  var line, name, prefix, header, key, value;

  var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
  for (var i = 0; i < lines.length; i++) {
    line = lines[i];
    [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);

    switch (name) {
      case "licence":
        name = "license";
        break;
    }

    [key, prefix] = name.split(/:/).reverse();

    if (prefix) {
      if (!headers[prefix]) headers[prefix] = new Object;
      header = headers[prefix];
    } else
      header = headers;

    if (header[key] && !(header[key] instanceof Array))
      header[key] = new Array(header[key]);

    if (header[key] instanceof Array)
      header[key].push(value);
    else
      header[key] = value;
  }

  headers["licence"] = headers["license"];

  return headers;
}

Array.prototype.hasGot = function(value) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == value) return true;
  }
  return false;
}

//String.prototype.toBinary = function() {
//  var bin = '';
//  var il = this.length
//  for (var i = 0; i < il; i++) {
//    bin += String.fromCharCode(this[i].charCodeAt(0) & 0xff);
//  }
//  return bin;
//}
// ==/Functions==

var baidu = {

  getResultsByCondition: function(condition) {
    var xpath = "//td[@class='f' or starts-with(@class, 'f ')]/../../../self::*##cond##"
      + "|//table[@id>0]##cond##";
    if (condition) {
      return x(xpath.replace(/##cond##/g, '[' + condition + ']'))
    } else {
      return x(xpath.replace(/##cond##/g, ''));
    }
  },

  resultCnt: function() {
    return this.getResultsByCondition(false).snapshotLength;
  },
  
  related: function() {
    return $('rs');
  },
  
  info: function() {
    return $('tool');
  },
  
  sideBarContainer: function() {
    var tmp;
    if ((tmp = c("r")) && tmp[0]) {
      return tmp[0].parentNode;
    }
  },

  sideBar: function() {
    var tmp;
    if (tmp = this.get("sideBarContainer")) {
      return tmp.parentNode.parentNode.parentNode.parentNode;
    }
  },
  
  promotions: function() {
    return x("//a[text()='推广']/../../../../..");
  },
  
  sponsors: function() {
    return x("//td[starts-with(@id, 'taw')]/ancestor::table");
  },
  
  brands: function() {
    return x("//a[text()='品牌推广']/ancestor::table[1]");
  },
  
  keyword: function() {
    return n("wd")[0].value;
  },
  
  tip: function() { //你要找的是不是
    return x("//div[@id='wrapper']/p[starts-with(@style, 'margin:')]");
  },
  
  body: function() {
    return document.body;
  },
  
  service: function() { // baidu's other service like zhidao, tieba
    return x("//div[@id='wrapper']/div[starts-with(@style, 'background:')]")
  },

  pagination: function() {
    return c("p")[0];
  },
  
  get: function(name, refresh) {
    var ret;
    var code = "\
      if (this._name == null || refresh) {\
        this._name = this.name();\
      }\
      ret = this._name;\
    ";
    eval(code.replace(/name/g, name));
    return ret;
  }
};

var image = {
  loading: "data:image/gif;base64,R0lGODlhIgAiAPQAADk5OVJSUlpaWmtra3t7e4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAgFAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIgAiAAAFhiAljmRJLYmprqx4AG1cBgb5yjjVCDacxxKBYnT7lQoI0mBA9BlHEOToIYC4nE9RNCUa1CjFLLTAdQQmYKyYshUJkodAVhFBQwkpB2OtSygYEVMFVnwjDSh0hSwSDX6EiioOj5CUJRIPEJiamJATERESn6CflaWmp6ipqqusra6vsLGys6ohACH5BAgFAAAALAAAAAAiACIAhCEhISkpKVpaWmNjY2tra3Nzc4SEhIyMjJSUlKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWTICWOZElJiqmuZkMqAiurUPHG4wNEM2ukIsWAJAj0SBPSwzASjiQA15HyUCRFEoPUKSIApqNF4kpBALkUwAIctoqWSW4BQGYv3BTDmhs4sEsKQAx%2BCjYJABBTDg91EwprKCQJBGwQixIjjg5%2FLBAPDhF1nCwRDw%2BJoz0SmKmtrq%2BwsbKztLW2t7i5uru8vb6%2FwL4hACH5BAgFAAAALAAAAAAiACIAhCEhISkpKTk5OUJCQkpKSlJSUlpaWmNjY3Nzc4SEhIyMjJSUlJycnK2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWT4CWOZCk6ZqqaFAkha5xSjJuQiiHHTTRCt1FBsltNGj%2BYaKEriiQTUoXRugBHB%2BSoEpBFoiMHRPQSPQqVEQUg2H3VNWswobxMAIOiBTrqXR43FQU%2BdnhOFxZvFxFIEAsXDE0SAASHIntRFYRmPpMFliOJVSkAn6BOQaeqq6ytrq%2BwsbKztLW2t7i5uru8vb6%2FwIchACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQlJSUlpaWnNzc4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWVICWOZCk2Zqqu4qOwcDk55JOQShGvTzS6JMNrl3o8frdWwUc0TR6T1pCCMJAag2YL0kpKCtyTYEqUHClASm6kGBy0I4fPJiqcGQOyFnKEvBYFUW0IcCQTTCIONHiEJBIMhSUSAo0iDAEAABKRJEwSCpkBBJwmDgKZBIikJAUBOquwsbKztLW2t7i5uru8vb6%2FwMHCsCEAIfkECAUAAAAsAAAAACIAIgCEISEhKSkpQkJCWlpaY2Nja2tre3t7hISEjIyMlJSUnJycra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYlgJY5kKU5mqq7nw76vBJGRAt%2FV5I4Ng8OyEWUh%2Bb0mM5FjQaIcjKWgSFE8GRJQkk70YJ4O2OxISrXaxKNJpNKlVCSHM7oUcbzjpQdhPsKfHAMDT3wVDVwGgQluhCIQBAMFcowiDAlrk5g4CZucnIt8AgEAogClAAiZqaqrrK2ur7CxsrO0tbavIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISEpKSlKSkpra2t7e3uEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFjCAljmRpnmiqriwbPW1cOpJsS7AtQxA5KbqUYzL6LYInSI4iURyRpkeN6YSaIg6RJMGwmiTEZte3tHJJkAOh4BVlmY8CIVH2QhCFArBdYiQafIE6BwaFBgSIBGNehAYIj48Lb4KUIgkElSQKAAADPZkUCgEAAgagFAwCnAOnEQsARKeys7S1tre4uYEhACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQkpKSlJSUlpaWmNjY2tra4yMjJSUlJycnK2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWEICWOZGmeaKqubOu%2BcCzP6EOvk2Pf6PRAvN4vePIBiSVjMkIcjiILRYIoEU0gUsaRGGEkFI4JcvRg7MboVYOxbrjd1WDiQK%2FTGen8ArFNPwoDBVNoYhQPCQQDCExBCgANIzmJBkQEAA4lEINBlph5IgMAZ3mhfWkCAKZoAQCfrq%2BwsS8hACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQkpKSlJSUlpaWnNzc4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWCYCWOZGmeaKqubOu%2BcCzPdG3feK7T1D5SkcfDN4E8IhId0Jj0SZC%2BaCoCqVqrucVCse0qHNLdgxGuPAwFxoQoghgMCUhOMmiMIgjDYVEzgBMDfCMTDQY1AQMiCQR2OggAaxWLgjkAlAuBOgUAJIAIcwCNIgsEOgIBZZuRUqFlPWUsIQAh%2BQQIBQAAACwAAAAAIgAiAIQxMTFSUlJaWlpjY2Nzc3OEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFgSAljmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8DgSRIhGosTHOTBbDIjwhvEAYQkFI2kD6JIMCA5BwEqiiwU2BqDmiiARxKrLHCgHAQiRIFsA9QlAVQUenw0fiIFBCN6En11FA4BfAgEWjOHIgMIJHo1mHYCljefFIE6pAZ4OaQ8B28uIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISEpKSlCQkJSUlJaWlpjY2Nra2tzc3N7e3uEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbW1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFkOAljmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgcVShAS0QyqfwskigSR2k4RRaKJDJtRRqkyOQCcXSxkhfgcHEg2gpR%2BSqDAJAOw2WSmEKsMwIDInkiCg4jfxYxEwAPhAUiDwmLkg6VLgwBIw6RIglpIw9gamyQnAk1diSdIxYJYzMBnoQEJAsLOg62T4gvIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISFaWlpjY2Nzc3N7e3uEhISMjIycnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFkeAkjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgs2hpAAiCCkjQkM6Vi4kiQHJDJw8GEDQDWycAwSSwmjKm20W19DyJIAHmYPhLdbVv1Hi0CIgdnZQ4jD2wrXwgkAXATCGoNYSJ6KgCOIg0BUBOCIwhZhkgvAgWfkwyTMhEBg2WuEqA0miQIqgqjOAquPQy5LSEAIfkECAUAAAAsAAAAACIAIgCEISEhMTExOTk5SkpKWlpaY2Nja2trc3Nze3t7hISEjIyMnJycra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABY%2BgJY5kaZ5oqq5s675wLM90bd94ru987%2F%2FAoHCIexgWPUQAIHjoJgYAoAARVXADaeMqigwit2ZJQkhYJNURhTuTDMyWRMPiAEvAs0m5m7gywBURbC8TAwgjC0gWDXgREzEUBAdqCXh%2FIhNpL5IkEHCLeBYRFDYJDCOXInc1EocjjJ2DMAqnqKFntzapPoIwIQAh%2BQQIBQAAACwAAAAAIgAiAIQ5OTlSUlJaWlpra2t7e3uEhISMjIyUlJScnJylpaWtra29vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFguAkjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F0DYAUAsEgO4xWHJZAaDEsSi9zAEBI7dYRAYNEQPnEEgIGRFiYLkJmhESOnsI6xLEOiK7%2BNtQxToDwkiDhB9fyMKDGCFNH50ExAKfA58M4cjCwojlDoSeZuMOBCCIw%2BhN4kknD%2BrPhGVLSEAIfkECAUAAAAsAAAAACIAIgCEISEhKSkpQkJCWlpaY2Nja2trc3Nze3t7hISEjIyMlJSUpaWlra2ttbW1vb29xsbG1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYRgJY5kaZ5oqq5s675wLM90bd94HgMOpZcEAAAB%2BZEMAYDAYRw9BkJmszI5LKY%2FCmPL5eIYA4K4QC4ksOhRhCH9NRIIRUQ3YSAQDIloflPciyMODDhyJYJ6FBM%2FDguKFRB6OQ0MjhMPOow%2Be3w3k5oVFBCONwyfFRKAUw%2BRTaFoq2mxNyEAIfkECAUAAAAsAAAAACIAIgCEISEhWlpaY2Njc3Nze3t7hISEjIyMnJycpaWlra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYLgJI5kaZ5oqq5s675wLJPAMLdIfbOHvqsK3w%2B1ABCGokakFBQgAwFBgxRkIBcF6AIiWiJFEoMgMHB8TQ1D4swmOQ4IBFyOWA8bi8RCwc8v2oApDwxmbQ0JCQpcXxIMdQ5eEkiICYsiD4U%2FSiWYXm2dgaCAmJKjkIETDpaorK2ur4AhACH5BAgFAAAALAAAAAAiACIAhCEhITExMTk5OVJSUlpaWmNjY2tra3Nzc3t7e4SEhIyMjJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWM4CWOZGmeaKqurDCw8PkAVWyPgHGrRD06gF3qMKCMKgCEEHUgGEWFwBKFKIoggMj0VJ2IArqpwktKDCQXiGLLSCQivkuCYNmSGu4FOm03QdoJZH0mFQ5ag4gnEg4ODYyODQ%2BDFhKVlpaJmTAWFHGJFJaefRMSEROidqQRdZoXEqytsbKztLW2t7i5tCEAOw%3D%3D"
};

var logo = '<span class="bpp-logo">'
  + '<span class="bpp-logo-B">B</span>'
  + '<span class="bpp-logo-a">a</span>'
  + '<span class="bpp-logo-i">i</span>'
  + '<span class="bpp-logo-d">d</span>'
  + '<span class="bpp-logo-u">u</span>'
  + '<span class="bpp-logo-plus">+</span>'
  + '<span class="bpp-logo-plus2">+</span>'
  + '</span>';

var shadow = {
  _getInst: function() {
    if (!this._created) {
      this._addCss();
      var _shadow = create('div');
      _shadow.id = 'bpp-shadow';
      var self = this;
      _shadow.addEventListener('click', function() {
        self.hide();
      }, false);
      append(_shadow, baidu.get("body"));
      this._inst = _shadow;
      this._created = true;
    }
    return this._inst;
  },
  _addCss: function() {
    GM_addStyle('#bpp-shadow {\
      background: #000;\
      opacity: .5;\
      position: fixed;\
      z-index: 1000;\
      top: 0;\
      left: 0;\
    }');
  },
  // public
  setBox: function(box) {
    this._box = box;
    return this;
  },
  getBox: function() {
    if (this._box) return this._box;
    var e = {
      message: 'box has not been set'
    };
    throw e;
  },
  show: function() {
    this._getInst().style.display 
      = this.getBox().style.display
      = 'block';
    // adjust size
    this._inst.style.width  = screen.availWidth + "px"; 
    this._inst.style.height = screen.availHeight + "px";
    // adjust box pos
    this.getBox().style.top  = document.documentElement.clientHeight / 2 
       - this.getBox().clientHeight / 2 
       + "px";
    this.getBox().style.left = document.documentElement.clientWidth / 2 
       - this.getBox().clientWidth  / 2 
       + "px";
    return this;
  },
  hide: function() {
    this._getInst().style.display 
      = this.getBox().style.display 
      = 'none';
    return this;
  }
};

var modules = {
  config: {
    groups: [
      { title: "广告", color: "#fdd" },
      { title: "界面", color: "#ffd" },
      { title: "模块", color: "#dfd" },
      { title: "外观", color: "#fdf" },
      { title: "其他", color: "#ddf" },
      { title: "关于", color: "#dff" }
    ],
    
    btn: function() {
      if (!this._btn) {
        this._btn = create("a");
        with (this._btn) {
          className = "bpp-config-btn";
          innerHTML = logo;
          href = "javascript:void(0)";
          addEventListener("click", function() {
            shadow.setBox(modules.config.panel()).show(); 
            modules.config.about();
          }, false);
        }
      }
      return this._btn;
    },
    
    about: function() {
      if (!this._about) {
        var helpBody = x(".//table[last()]/tbody[1]", this.options()).snapshotItem(0);
        var p = create("p"); this._about = p;
        with (p) {
          innerHTML = logo + "v" + modules.version.local() 
            + "<br />"
            + "<a target=\"_blank\""
            + "  href=\"http://hi.baidu.com/chrisyue/blog/item/0e6655df55ff401b48540341.html\">"
            + "  脚本发布页"
            + "</a>"
            + "<br />"
            + "<a target=\"_blank\"" 
            + "  href=\"http://userscripts.org/scripts/show/47560\">"
            + "  脚本发布页(userscripts.org)"
            + "</a>"
            + "<br />"
            + "<a target=\"_blank\"" 
            + "  href=\"http://www.firefox.net.cn/forum/viewtopic.php?t=26711\">"
            + "  脚本讨论页(www.firefox.net.cn)"
            + "</a>"
            + "<br />"
            + "<a href=\"mailto:blizzchris@gmail.com\">"
            + "  联系作者"
            + "</a>"
            + "<br />已获得成就：安装Baidu++";

          addEventListener("dblclick", function() { 
            // in loving memory of Michael Jackson the King of Pop ...
            alert("19588292009625"); 
          }, false);
        }
        var tr = create("tr"); append(tr, helpBody, true);
        var td = create("td"); append(td, tr);
        var td = create("td"); append(td, tr);
        append(p, td);
      }
    },
    
    panel: function() {
      if (!this._panel) {
        this._panel = create("div");
        this._panel.id = 'bpp-panel';

        append(this._panel, baidu.get("body"));
        var form = create("form"); 
        form.id = "bpp-config-form"; 
        append(form, this._panel);
        var css = "#bpp-panel {\
          width: 420px;\
          height: 420px;\
          border: 1px solid #ccf;\
          background: #fff;\
          position: fixed;\
          z-index: 2000;\
          -moz-border-radius: 10px;\
          -webkit-border-radius: 10px;\
          border-radius: 10px;\
          padding: 20px;\
        }\
        #bpp-config-form > div {\
          height: 350px; clear: both; padding: 10px;\
          -moz-box-shadow: 1px 1px 1px #aaa;\
          -webkit-box-shadow: 1px 1px 1px #aaa;\
          box-shadow: 1px 1px 1px #aaa;\
        }\
        #bpp-config-form ul {\
          list-style: none; font-size: 9pt; margin: 0; padding: 0;\
        }\
        #bpp-config-form li {\
          float: left;\
        }\
        #bpp-config-form li a {\
          text-decoration: none; color: #666; text-align: center; width: 50px;\
          display: block; padding:4px;\
          -moz-border-radius: 4px 4px 0 0;\
          border-radius: 4px 4px 0 0;\
        }\
        .bpp-config-tab-focus {\
          color: #000 !important;\
          -moz-box-shadow: 1px 0px 0px #aaa;\
          -webkit-box-shadow: 1px 0px 0px #aaa;\
          box-shadow: 1px 0px 0px #aaa;\
          margin-right: 1px;\
        }\
        #bpp-config-form li a:hover,\
        #bpp-config-form li a:focus,\
        .bpp-config-tab-focus {\
          font-weight: bold;\
        }\
        #bpp-config-form table {\
          display: none;\
        }\
        .bpp-config-table-selected {\
          display: table !important;\
        }\
        #bpp-config-form td {\
          padding: 3px 0;\
        }\
        #bpp-config-form td > a {\
          color: #0a0; margin: 0 3px;\
        }\
        #bpp-config-form td > a:hover {\
          color: #0e0; cursor: help;\
        }\
        #bpp-config-form td textarea {\
          display: block; font-size: 9pt; width:300px; height: 80px;\
        }\
        #bpp-config-form fieldset {\
          margin: 5px;\
        }\
        #bpp-config-form legend {\
          font-size: 9pt; color: #666;\
        }\
        #bpp-config-form fieldset p {\
          margin: 0; font-size: 9pt; color: #333;\
        }\
        #bpp-config-form > button {\
          float: right; margin: 10px;\
        }\
        #bpp-config-form > p {\
          font-size:8pt; color: #666;\
        }\
        #bpp-config-form > div > table > tbody > tr > td > p {\
          font-size:9pt; line-height: 200%;\
        }\
        #bpp-config-form > div > table > tbody > tr > td > p > a {\
          margin: 0;\
        }";
        GM_addStyle(css);
        append(modules.config.tabs(),     form);
        append(modules.config.options(),  form);
        append(modules.config.closeBtn(), form);
        append(modules.config.tip(),      form);
        modules.config.closeBtn().focus();
      }
      return this._panel;
    },
    
    fieldset: function() {
      if (!this._fieldset) {
        this._fieldset = create("fieldset");
        var legend = create("legend");
        legend.innerHTML = "帮助";
        append(legend, this._fieldset)
        var para = create("p");
        append(para, this._fieldset);
      }
      return this._fieldset;
    },
    
    tip: function() {
      if (!this._tip) {
        this._tip = create("p");
        this._tip.innerHTML = "如果您不想立刻刷新页面，请点击灰色阴影部分";
      }
      return this._tip
    },

    selectTab: function(tab) {
      if (this._selectedTab) {
        this._selectedTab.className = '';
      }
      tab.className = "bpp-config-tab-focus";
      this._selectedTab = tab;
    },
    
    tabs: function() {
      if (!this._tabs) {
        this._tabs = create("ul");
        var config = modules.config;
        var groups = config.groups;
        
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          var li = create("li"); append(li, this._tabs);
          var a  = create("a"); append(a, li);
          with (a) {
            href = "javascript:void(0)";
            innerHTML = group.title;
            className = "bpp-config-tab";
            setAttribute("order", i);
            style.backgroundColor = group.color;
            // events
            addEventListener("click", function() {
              config.selectTab(this);
              t("p", config.fieldset())[0].innerHTML = "";
              var options = config.options();
              var order = this.getAttribute("order");
              config.selectTable(options.tables[order]);
              options.style.background = groups[order].color;
              config.closeBtn().focus();
            }, false);
          }
          if (i == 0) {
            config.selectTab(a);
          }
        }
      }
      return this._tabs;
    },

    selectTable: function(table) {
      if (this._selectedTable) {
        this._selectedTable.className = '';
      }
      table.className = "bpp-config-table-selected";
      this._selectedTable = table;
    },
    
    options: function() {
      if (!this._options) {
        this._options = create("div");
        var config = modules.config; var groups = config.groups;
        this._options.style.background = groups[0].color;
        for (var i = 0; i < groups.length; i++) {
          var table = create("table"); append(table, this._options);
          var tbody = create("tbody"); append(tbody, table);
        }
        for (i in modules) {
          var mod = modules[i];
          var hasConfig = mod.enable || mod.value || mod.content;
          if (mod.config && hasConfig) {
            var tr = create("tr"); append(tr, t("tbody", this._options)[mod.cid]);
            if (mod.enable) {
              var td = create("td"); append(td, tr);
              append(config.createCheckbox(mod), td);
            }
            if (mod.name) {
              var td = create("td"); append(td, tr);
              append(config.createLabel(mod), td);
            }
            if (mod.value) {
              append(config.createTextbox(mod), tr.lastChild);
            }
            if (mod.help) {
              after(config.createHelpIcon(mod), mod.label);
            }
            if (mod.content) {
              var tr2 = create("tr"); 
              append(create("td"), tr2); append(create("td"), tr2);
              append(config.createTextarea(mod), tr2.lastChild);
              after(tr2, tr);
              tr2.lastChild.style.padding = 0;
            }
          }
        }
        append(config.fieldset(), this._options);
        
        this._options.tables = t("table", this._options);
        
        config.selectTable(this._options.tables[0]);
      }
      return this._options;
    },
    
    closeBtn: function() {
      if (!this._closeBtn) {
        var config = modules.config;
        this._closeBtn = create("button");
        with (this._closeBtn) {
          innerHTML = "确认&amp;重新载入页面";
          type = "button";
          addEventListener("click", function() {
            location.reload();
          }, false);
        }
      }
      return this._closeBtn;
    },
    
    createCheckbox: function(mod) {
      mod.checkbox = create("input");
      mod.checkbox.type    = "checkbox";
      mod.checkbox.id      = mod.config;
      mod.checkbox.checked = mod.enable();
      mod.checkbox.addEventListener("change", function() {
        GM_setValue(mod.config, this.checked);
      }, false);
      if (mod.dependsOn) {
        mod.checkbox.disabled = !mod.dependsOn().checkbox.checked;
        mod.dependsOn().checkbox.addEventListener("change", function() {
          mod.checkbox.checked = mod.enable();
          mod.label.style.color = this.checked ? "#000" : "#999";
          mod.checkbox.disabled = !this.checked;
        }, false);
      }
      return mod.checkbox;
    },
    
    createLabel: function(mod) {
      mod.label = create("label");
      with (mod.label) {
        htmlFor = mod.config;
        innerHTML = mod.name;
      }
      if (mod.dependsOn) {
        mod.label.style.color = mod.dependsOn().checkbox.checked ? "#000" : "#999";
      }
      return mod.label;
    },
    
    createTextbox: function(mod) {
      mod.textbox = create("input");
      with (mod.textbox) {
        type = "text";
        value = mod.value();
        disabled = !mod.enable();
        addEventListener("blur", function() {
          GM_setValue(mod.config2, this.value);
        }, false);
        switch (mod.valueType) {
          case "string":
            style.width = "250px";
            break;
          case "number":
            style.width = "40px";
            break;
          default:
        }
      }      
      mod.checkbox.addEventListener("change", function() {
        mod.textbox.disabled = !this.checked;
      }, false);
      if (mod.dependsOn) mod.dependsOn().checkbox.addEventListener("change", function() {
        mod.textbox.disabled = !mod.enable() || mod.checkbox.disabled;
      }, false);
      return mod.textbox;
    },
    
    createTextarea: function(mod) {
      mod.textarea = create("textarea");
      with (mod.textarea) {
        innerHTML = mod.content();
        disabled = !mod.enable();
        mod.checkbox.addEventListener("change", function() {
          mod.textarea.disabled = !this.checked;
        }, false);
        addEventListener("blur", function() {
          GM_setValue(mod.config2, this.value);
        }, false);
      }
      return mod.textarea;
    },
    
    createHelpIcon: function(mod) {
      mod.helpIcon = create("a");
      with (mod.helpIcon) {
        href = "javascript:void(0)";
        innerHTML = "[?]"; title = "点击显示帮助"
        addEventListener("click", function() {
          var content = mod.help;
          if (mod.dependsOn) {
            content += "<br />依赖于【" + mod.dependsOn().name + "】模块";
          }
          t("p", modules.config.fieldset())[0].innerHTML = content;
        }, false);
      }
      return mod.helpIcon;
    },

    enable: function() { return true; },
    
    run: function() {
      append(this.btn(), c("nv")[0]);
    }
  },

  autopagerize: {
  
    name: "Autopagerize兼容",
    
    config: "bpp-autopagerize",
    
    help: "把Autopagerize脚本放在Baidu++之前才能生效",
    
    cid: 4,
    
    enable: function() {
      return gm(this.config, true);
    },

    fixAutopagerizeError: function() {
      var form = x("//form[@name='f2'][count(*)>0][1]").snapshotItem(0);
      form && after(form.childNodes, form);
    },
    
    run: function() {
      var ap = this;
      // copy from favicon with google3, nice job
      var scrollHeight = document.documentElement.scrollHeight;
      document.addEventListener("scroll", function() {
        if( scrollHeight != document.documentElement.scrollHeight ) {
          scrollHeight = document.documentElement.scrollHeight;
          for(i in modules) {
            var mod = modules[i];
            mod.autopagerize && mod.enable() && mod.run();
          }
          modules.autopagerize.fixAutopagerizeError();
        }
      }, false);
    }
  },

  enhanceUi: {
    
    name: "外观改善",

    config: "bpp-eui",
    
    cid: 3,

    help: "可改善百度其他元素如分页栏等的显示",

    autopagerize: true,

    enable: function() {
      return gm(this.config, true);
    },

    firstRun: true,
    run: function() {
      if (this.firstRun) { // add some style
        this.enhancePagination();
        this.enhanceServices();
        this.enhanceTips();
        modules.autopagerize.enable() && this.enhanceAutopagerize();
        this.enhanceLineBreak();
        this.firstRun = false;
      }
      this.enhanceResults();
    },

    enhancePagination: function() {
      GM_addStyle("\
        .p {\
          padding: 10px;\
          border: 1px solid #eee;\
          text-align: center;\
          background: #fff;\
          -moz-border-radius: 10px;\
          border-radius: 10px;\
          display: table;\
          min-width: 539px;\
          margin: 0 10px 10px;\
        }\
        .p * {\
          font-size: 10pt;\
        }\
      ");
    }, 

    enhanceServices: function() {
      var services = baidu.get("service"), len = services.snapshotLength;
      if (len) {
        for (var i = 0; i < len; i++) {
          var elm = services.snapshotItem(i);
          with (elm.style) {
            border = "1px solid #eee";
            MozBorderRadius = "10px";
            borderRadius = "10px";
            margin = "0 10px 10px";
            padding = "10px";
            width = "509px";
            paddingLeft = "40px";
            backgroundPosition = "10px 10px";
          }
        }
      }
    },

    enhanceTips: function() {
      var tips = baidu.get("tip"), len = tips.snapshotLength;
      if (len) {
        for (var i = 0; i < len; i++) {
          with (tips.snapshotItem(i).style) {
            margin = "0 10px 10px";
            padding = "10px";
            border = "1px solid #eee";
            MozBorderRadius = "10px";
            borderRadius = "10px";
            width = "539px";
          }
        }
      }
    },

    enhanceAutopagerize: function() {
      GM_addStyle("\
        .autopagerize_page_info {\
          margin: 0 10px 10px;\
          padding: 10px;\
          border: 1px solid #eee;\
          text-align: center;\
          width: 539px;\
          -moz-border-radius: 10px;\
          border-radius: 10px;\
        }\
        .autopagerize_page_separator {\
          display: none;\
        }\
      ");
      // the last rule hide the form which autopager autoloaded
    },

    enhanceLineBreak: function() {
      // the best way to enhance br is no br
      GM_addStyle("#wrapper > br { display: none }");
    },

    enhanceResults: function() { 
      var rs = baidu.getResultsByCondition("not(@bpp-ui)");
      for (var i = 0; i < rs.snapshotLength; i++) {
        with (rs.snapshotItem(i).style) {
          border  = "1px solid #eee";
          padding = "10px";
          margin  = "0 10px 10px";
          MozBorderRadius = "10px";
          borderRadius = "10px";
        }
        t("td", rs.snapshotItem(i))[0].style.paddingLeft = 0;
        rs.snapshotItem(i).setAttribute('bpp-ui', 'bpp-ui');
      }
    }
  },
  
  sideBar: {
    name:   "显示右侧栏",
    config: "bpp-sidebar",
    cid:    1,
    help:   "chrome不可用",
    
    enable: function() {
      return !window.chrome && gm(this.config, true);
    },
    
    run: function() {
      var div = create("div");
      with (div.style) {
        cssFloat   = "right";
        padding    = "0 10px";
        borderLeft = "1px solid #e1e1e1";
      }
      before(div, baidu.get("sideBar"));
      baidu.sideBar2 = function() {
        return div;
      };
    }
  },

  adCleaner: {
    name:   "广告移除", 
    cid:    0,
    config: "bpp-removeAds",
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      if (baidu.get("sideBar")) {
        baidu.get("sideBar").style.display = "none";
      }
    }
  },
  
  prmtCleaner: {
  
    name: "推广移除",
    
    config: "bpp-removePromotions",
    
    cid: 0,
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      if ((cnt = baidu.get("promotions").snapshotLength) > 0) {
        remove(baidu.get("promotions"));
        util.notice("Baidu++成功屏蔽了" + cnt + "个推广！");
      }
    }
  },
  
  spnsrCleaner: {
  
    name: "推广链接(原赞助商连接)移除",
    
    config: "bpp-removeSponsors",
    
    cid: 0,
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      if ((cnt = baidu.get("sponsors").snapshotLength) > 0) {
        remove(baidu.get("sponsors"));
        util.notice("Baidu++成功屏蔽了" + cnt + "个推广链接！");
      }
    }
  },
  
  brandsCleaner: {
  
    name: "品牌推广移除",
    
    config: "bpp-removeBrands",
    
    cid: 0,
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      if ((cnt = baidu.get("brands").snapshotLength) > 0) {
        remove(baidu.get("brands"));
        util.notice("Baidu++成功屏蔽了" + cnt + "个品牌推广！");
      }
    }
  },
  
  enhanceLayout: {
  
    name: "布局改善",
    
    config: "bpp-layoutEnhance",
    
    config2: "bpp-columnCnt",
    
    valueType: "number",
    
    cid: 1,

    autopagerize: true,
    
    help: "可使用多列显示来改善整个页面的布局。\
      <br /> 输入框为列数，如果您有一个较宽的显示器，建议开启。",
    
    enable: function() {
      return gm(this.config, true);
    },
    
    value: function() {
      return Math.max(parseInt(gm(this.config2)), 2) || 2;
    },
    
    enhanceResults: function() {
      var res = baidu.getResultsByCondition("not(@bpp-layout)");
      var cnt = res.snapshotLength;

      if (this.value() > 1 && cnt) {
        var table = create("table"); 
        table.className = "bpp-frame";
        before(table, res.snapshotItem(0));
        var cols  = this.value(); 
        var trCnt = Math.ceil(cnt / cols);
        for (var i = 0; i < trCnt; i++) {
          var tr = create("tr"); 
          append(tr, table);
          for (var j = 0; j < cols; j++) {
            var r;
            if (r = res.snapshotItem(i * cols + j)) {
              var td = create("td"); 
              td.width = 100 / cols + "%";
              append(td, tr); 
              append(r, td);
              r.setAttribute("bpp-layout", "bpp-layout");
            } else {
              break;
            }
          }
        }
      }
    },

    addCss: function() {
      GM_addStyle("\
        .bpp-frame  td {\
          font-size: 100%;\
          height: 100%;\
          vertical-align: top;\
          overflow: hidden;\
        }\
        td.f {\
          width: auto;\
          max-width: 33.7em;\
        }\
        .bpp-frame {\
          border-spacing: 10px;\
          margin-top: -10px;\
          display: block;\
        }\
        .bpp-frame  table {\
          width:  100%;\
          height: 100%;\
          margin: 0 !important;\
          /*table-layout: fixed;*/\
        }\
      ");

      if (modules.sideBar.enable()) {
        GM_addStyle(".bpp-frame { margin-right: 323px }");
      }
    },

    firstRun: true,
    run: function() {
      if (baidu.get("resultCnt")) {
        if (this.firstRun) {
          this.addCss();
          this.enhanceResults();
          this.firstRun = false;
        } else {
          this.enhanceResults();
        }
      }
    }
  },

  colorful: {
    
    name: "炫彩背景色",
    
    config: "bpp-colorfulBg",
    
    cid: 3,
    
    help: "按根域名分组，类似ie8标签的效果。<br />\
      此模块已经独立出来为一个脚本，可用于google, yahoo, bing，\
      点击<a href=\"http://userscripts.org/scripts/show/52119\">这里</a>下载使用",

    colors: [],

    autopagerize: true,

    enable: function() {
      return gm(this.config, true);
    },

    run: function() {
      if (baidu.get("resultCnt") > 0) {
        var tables = baidu.getResultsByCondition("not(@bpp-color)");
        for (var i = 0; i < tables.snapshotLength; i++) {
          var table = tables.snapshotItem(i); 
          table.setAttribute("bpp-color", "bpp-color");
          var hostname = t("a", table)[0].hostname;
          var tld = getTld(hostname);
          
          if (!this.colors[tld]) {
            this.colors[tld] = [];
            var r = parseInt(Math.random() * 48) + 220;
            var g = parseInt(Math.random() * 48) + 220;
            var b = parseInt(Math.random() * 48) + 220;
            this.colors[tld]['bg'] = 'rgb(' + r + ',' + g + ',' + b + ')';
            this.colors[tld]['bd'] = 'rgb(' 
              + (r - 16) + ',' + (g - 16) + ',' + (b - 16) 
              + ')';
          }
          table.style.background  = this.colors[tld]['bg'];
          table.style.border = "1px solid " + this.colors[tld]['bd'];
        }
      }
    }
  },
  
  fixedSearch: {
    name: "固定搜索栏",
    cid: 1,
    config: "bpp-fixedSearch",
    help: "固定搜索框在顶部。可能会导致页面滚动变得有点卡",
    enable: function() {
      return gm(this.config, false);
    },
    run: function() {
      GM_addStyle("#head {\
        position: fixed;\
        z-index: 100;\
        background: #fff;\
        top: 0;\
        padding-top: 5px;\
        padding-bottom: 5px;\
        -moz-box-shadow: 0 2px 2px #999;\
        -webkit-box-shadow: 0 2px 2px #999;\
        box-shadow: 0 2px 2px #999;\
      }\
      #u {\
        position: fixed;\
        z-index: 101;\
      }\
      body {\
        margin-top: 66px;\
      }");
    }
  },

  hidePagination: {
    name:   "隐藏分页栏",
    cid:    1,
    config: "bpp-hidePagination",
    help:   "若使用如自动翻页等工具，建议将多余的分页栏隐藏掉",

    enable: function() {
      return gm(this.config, false);
    },

    run: function() {
      baidu.get("pagination").style.display = "none";
    }
  },

  classicLogo: {
    name:   "经典logo",
    config: "bpp-logo",
    cid:    3,
    help:   "虽然很多人不喜欢老版本的logo，但是我喜欢。如果你跟我一样喜欢以前的logo，请将此选项打开",

    enable: function() { 
      return gm(this.config, false); 
    },

    run: function() {
      GM_addStyle("\
        .bpp-logo {\
          background: #000;\
          -moz-border-radius: 3px;\
          border-radius: 3px;\
          padding: 0 2px;\
          letter-spacing: 1px;\
          text-shadow: 0 0 1px;\
        }\
        .bpp-logo-B {\
          color: #33f;\
        }\
        .bpp-logo-a {\
          color: #f33;\
        }\
        .bpp-logo-i {\
          color: #ff3;\
        }\
        .bpp-logo-d {\
          color: #33f;\
        }\
        .bpp-logo-u {\
          color: #3f3;\
        }\
        .bpp-logo-plus {\
          color: #ff3;\
        }\
        .bpp-logo-plus2 {\
          color: #3f3;\
        }\
      ");      
    }
  },

  numberResult: {
    name:         "搜索结果加序号",
    cid:          1,
    config:       "bpp-nubmerRs",
    autopagerize: true,
    
    enable: function() {
      return gm(this.config, false); 
    },

    run: function() {
      var rs = baidu.getResultsByCondition("not(@bpp-number)");
      var nb = rs.snapshotLength;

      if (!nb) return ;
      for (var i = 0; i < nb; i++) {
        var elm = rs.snapshotItem(i);
        var font = x(".//td/a/font[@size='3'][1]", elm).snapshotItem(0);
        if (!font) continue;
        if (this.current) {
          this.current++;
        } else {
          var s = location.search.match(/pn=(\d+)/);
          s && s[1] && (this.current = parseInt(s[1]) + 1) || (this.current = 1);
        }
        font.innerHTML = this.current + '. ' + font.innerHTML;
        elm.setAttribute('bpp-number', 'bpp-number');
      }
    }
  },

  customCss: {
  
    name: "自定义css",
    
    cid: 3,
    
    config: "bpp-customCss",
    
    config2: "bpp-css",
    
    help: "如果您会css，可以在这里添加自己的css样式。在<a href='http://userscripts.org/topics/38054'>这里</a>你能获得更多的样式。",
    
    enable: function() {
      return gm(this.config, false);
    },
    
    content: function() {
      var def = "/*在此添加您自己的css*/";
      return gm(this.config2, def);
    },
    
    run: function() {
      GM_addStyle(this.content());
    },
  },
  
  openSearch: {
  
    name: "Open Search",

    enable: function() { return true; },
    
    run: function() {
      var search = create("link");
      with (search) {
        rel = "search"; 
        title = "Baidu";
        type = "application/opensearchdescription+xml";
        href = "http://baiduplusplus.googlecode.com/files/baidu.xml";
      }
      append(search, t("head")[0]);
    }
  },
  
  wiki: {
    
    name: "Wikipedia模块",
    
    config: "bpp-wiki",
    
    cid: 2,
    
    title: "维基百科",
    
    help: "返回wiki可能有的定义或解释。chrome不可用",
    
    enable: function() {
      return !window.chrome && modules.sideBar.enable() && gm(this.config, true);
    },
    
    dependsOn: function() {
      return modules.sideBar;
    },
    
    run: function() {
      if (baidu.get('sideBar', true)) {
        var wiki = util.createSidePanel(this); wiki.className += " bpp-wiki";
        var loadingImage = util.createLoadingImage();
        append(loadingImage, wiki);
        
        GM_xmlhttpRequest({
          method: 'GET',
          url: "http://zh.wikipedia.org/w/api.php?action=opensearch&search=" 
             + encodeURIComponent(baidu.get("keyword")),
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html',
          },
          onload: function(response) {
            var r = response.responseText ? eval("(" + response.responseText + ")")[1] : response[1];
            var l;
            remove(loadingImage);
            if ((l = r.length) > 0) {
              var css = "\
                .bpp-wiki {\
                  background: #fff url(http://upload.wikimedia.org/wikipedia/zh/6/62/Wiki_zh-hans.png) right bottom no-repeat;\
                }\
                .bpp-wiki ul {\
                  list-style-image: url(http://zh.wikipedia.org/favicon.ico);\
                  margin: 10px 10px 40px 35px;\
                  padding: 0;\
                }\
                .bpp-wiki a {\
                  position: relative;\
                  top: -3px;\
                }\
              ";
              GM_addStyle(css);
              var ul = create("ul");
              append(ul, wiki);
              for (var i = 0; i < l; i++) {
                var li = create("li");
                append(li, ul);
                var link = create("a");
                link.href = "http://zh.wikipedia.org/wiki/" + r[i];
                link.innerHTML = r[i];
                append(link, li);
              }
            } else {
              var p = create("p");
              p.className = "bpp-no-content-msg";
              p.innerHTML += "无相关定义";
              append(p, wiki);
            }
          }
        }, "callback", "wikipedia");
      }
    }
  },
  
  flickr: {
  
    name: "Flickr相册搜索",
    
    config: "bpp-flickr",
    
    title: "Flickr",
    
    cid: 2,
    
    help: "在侧边栏开启flickr的图片相关结果。chrome不可用",
    
    enable: function() {
      return !window.chrome && modules.sideBar.enable() && gm(this.config, true);
    },
    
    run: function() {
      if (!baidu.sideBar2) return ;
      var flickr = util.createSidePanel(this);
      this.showData(1);  // First run
      GM_addStyle("\
        img.bpp-flickr {\
          width: 75px;\
          height: 75px;\
          border: 0;\
          vertical-align: middle;\
        }\
      ");
    },
    
    dependsOn: function() {
      return modules.sideBar;
    },
    
    showData: function(page) {
      var title = this.header;
      var flickr = this.body;
      var keyword = baidu.get("keyword");
      // clear paging container, 'cos i will recreate it later..
      if (title.firstChild.tagName == 'DIV') {
        remove(title.firstChild);
      }
      while (title.nextSibling) { // clear the result ..
        remove(title.nextSibling);
      }
      var loadingImage = util.createLoadingImage();
      append(loadingImage, flickr);
      
      // flickr api params
      // @link http://www.flickr.com/services/api/flickr.photos.search.html
      var param = [];
      param.push("method=flickr.photos.search");
      param.push("api_key=2d828cb62dd8467013a32cd0efed6ab1");
      param.push("text=" + encodeURIComponent(keyword));
      param.push("sort=relevance");
      param.push("per_page=16");
      param.push("page=" + page);
      param.push("format=json");
      window.opera || param.push("nojsoncallback=1");
      
      var api_url = "http://api.flickr.com/services/rest?" + param.join("&");

      var request = {
        method: 'GET',
        url: api_url,
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'text/html',
        },
        onload: function(response) {
          remove(loadingImage);
          var data = response.responseText ? eval("(" + response.responseText + ")") : response;
          if (data.photos.total == 0) { // No any photo ...
            var p = create("p");
            p.innerHTML = "无相关图片";
            p.className = "bpp-no-content-msg";
            append(p, flickr);
            return;
          }
          
          if (data.photos.pages > 1) { // If there are more than 1 pages ..
            var divPage = create("div");
            divPage.style.cssFloat = "right";
            before(divPage, title.firstChild);
            
            if (1 < page) { // If current page is not first
              var prev = create("a");
              with (prev) {
                href = "javascript:void(0)"; 
                title = "上一页"; 
                innerHTML = "&lt;";
                style.fontSize = "9pt";
                style.margin = "4px";
              }
              prev.addEventListener("click", function() {
                modules.flickr.showData(page - 1);
              }, false);
              append(prev, divPage);
            }
            var current = create("span");
            with (current) {
              innerHTML = page;
              style.fontSize = "9pt";
            }
            append(current, divPage);
            if (data.photos.pages > page) { // If current page is not last
              var next = create("a");
              with (next) {
                href = "javascript:void(0)"; 
                title = "下一页"; 
                innerHTML = "&gt;";
                style.fontSize = "9pt"; 
                style.margin = "4px";
              }
              next.addEventListener("click", function() {
                modules.flickr.showData(page + 1);
              }, false);
              append(next, divPage);
            }
          }
          
          var images = data.photos.photo;
          for (var i = 0; i < images.length; i++) {
            src = "http://farm" + images[i].farm
              + ".static.flickr.com/" + images[i].server
              + "/" + images[i].id + "_" + images[i].secret
              + "_s.jpg";
            url = "http://www.flickr.com/photos/" + images[i].owner
              + "/" + images[i].id;
            img = create("img");
            img.alt = "载入中...";
            img.src = src;
            img.className = "bpp-flickr";

            link = create("a");
            link.href = url; 
            link.target = "_blank";

            append(img, link);
            append(link, flickr);
          }
        }
      };
      
      GM_xmlhttpRequest(request, "jsoncallback", "flickr");
    }
  },
  
  altSearch: {
    
    name: "其他引擎搜索",
    
    config: "bpp-altSearch", 
    
    cid: 2,

    config2: "bpp-searchesJson",

    help: '显示其他搜索引擎的连接<br />如果您需要更多的搜索选择，请看<a href="http://userscripts.org/topics/38564">这里</a>',

    content: function() {
      return gm(this.config2) || "{name:\"谷歌\",query:\"http://www.google.com.hk/search?q=\",favicon:\"http://www.google.cn/favicon.ico\",show: 0},{name:\"必应\",query:\"http://cn.bing.com/search?q=\",favicon:\"http://cn.bing.com/favicon.ico\",show:0}"; 
    },
    
    engines: function() {
      return eval("[" + this.content() + "]");
    },
    
    enable: function() {
      return gm(this.config, true);
    },
    
    _getUl: function() {
      if (!this._ul) {
        var ul = create("ul"); 
        append(ul, baidu.get("sideBar2"), true);
        with (ul.style) {
          padding   = 0; 
          margin    = "0 0 10px"; 
          listStyle = "none";
          fontSize  = "10pt";
        }
        this._ul = ul;
      }

      return this._ul;
    },

    run: function() {
      if (!this.enable()) return ;
      var keyword = baidu.get("keyword");
      GM_addStyle("\
        img.bpp-favicon-img {\
          margin-right: 8px;\
          position: relative;\
          top: 1px;\
          margin-left: 4px;\
          border: 0;\
          width: 16px;\
          height: 16px;\
        }\
      ");
      
      var engines = this.engines();
      for (var i = 0; i < engines.length; i++) {
        var ico  = create("img");
        ico.alt     = "fav";
        ico.className = "bpp-favicon-img";
        if (engines[i].favicon) {
          ico.src = engines[i].favicon;
        } else {
          ico.src = "http://" + engines[i].query.split('/')[2] 
            + "/favicon.ico";
        }

        var link = create("a");
        link.href   = engines[i].query + encodeURIComponent(keyword);
        link.target = "_blank";

        if (engines[i].show && modules.sideBar.enable()) {
          var span = create("span");
          with (span) {
            style.color = "red"; 
            innerHTML = keyword;
          }

          link.innerHTML += "使用 <strong>" + engines[i].name + "</strong> 搜索";
          append(span, link);

          var li = create("li"); append(ico, li); append(link, li);
          append(li, this._getUl());
        } else {
          append(ico, link);
          append(link, baidu.get("info"));
        }
      }
    }
  },
  
  relatedToTop: {
    name:    "相关搜索到顶部",
    config:  "bpp-relatedToTop",
    cid:     1,
    help:    "将相关搜索复制一份放在页面顶部，使用自动翻页的同学建议开启",

    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      if (baidu.get("related")) {
        var clone = baidu.get("related").cloneNode(true);
        clone.className += 'gpp-related-to-top';
        before(clone, baidu.get("info"));
        GM_addStyle('#rs.gpp-related-to-top { padding-top: 0; margin-top: 0 }');
      }
    }
  },

  hideOriginalRelated: {
    name:   "隐藏底部相关搜索",
    config: "bpp-hideOriginalRelated",
    cid:    1,
    help:   "将原来位置的相关搜索隐藏掉",

    dependsOn: function() {
      return modules.relatedToTop;
    },

    enable: function() {
      return gm(this.config, true);
    },

    run: function() {
      baidu.get("related") 
        && (baidu.get("related").style.display = "none");
    }
  },
  
  favicon: {
  
    name: "网站图标",
    
    config: "bpp-favicon",
    
    cid: 1,

    autopagerize: true,
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      var tables = baidu.getResultsByCondition('not(@bpp-favicon)');
      var cnt = tables.snapshotLength;
      if (!cnt) return ;
      if (!this.icoCss) {
        this.icoCss = "\
          .bpp-favicon {\
            width: 16px;\
            height: 16px;\
            background: url(chrome://global/skin/icons/folder-item.png);\
            float: left;\
            margin: 0 5px 0 0 !important;\
            position: relative;\
            top: 1px;\
          }\
        ";
        GM_addStyle(this.icoCss);
      }
      for (var i = 0; i < cnt; i++) {
        var elm = tables.snapshotItem(i);
        var a = x(".//td/a/font[@size='3']/../self::*[1]", elm).snapshotItem(0); 
        if (!a) continue;
        var div = create("div"); 
        div.className = "bpp-favicon";
        var ico = create("img");
        with (ico) {
          alt = " "; 
          width = 16;
          src = "http://" + a.hostname + "/favicon.ico"; 
          style.background = '#eee';
        }
        append(ico, div);
        before(div, a);
        elm.setAttribute("bpp-favicon", "bpp-favicon");
      }
    }
  },
  
  preview: {
  
    name: "网站缩略图",
    
    config: "bpp-preview",
    
    cid: 1,
    
    help: "搜索结果旁显示网站缩略图",

    autopagerize: true,
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      var tables = baidu.getResultsByCondition("not(@bpp-preview)");
      var cnt = tables.snapshotLength;
      if (!cnt) return ;
      if (!this.previewCss) {
        this.previewCss = "\
          .bpp-preview {\
            display: block; float: left; margin: 0 8px 8px 0;\
          }\
          .bpp-preview > img {\
            border-color: #ddd;\
          }\
        ";
        GM_addStyle(this.previewCss);
      }
      for (var i = 0; i < cnt; i++) {
        var elm = tables.snapshotItem(i);
        this.addPreview(elm); // run it
      }
    },
    
    addPreview: function(elm) {
      var a = x(".//td/a/font[@size='3']/../self::*[1]", elm).snapshotItem(0); 
      if (!a) return ;
      var link = create("a");
      link.href = a.href;
      with (link) {
        target = "_blank"; 
        className = "bpp-preview";
      }
      // create a empty <img />
      //var image = util.createLoadingImage(); 
      var image = create('img');
      with (image) {
        width = 120;
        height = 90;
        alt = 'loading';
      }
      append(image, link);
      // these 2 lines are from GoogleMonkeyR, it seems images are stored in different servers by name
      var sl = a.href.match(/:\/\/www.(\w)|:\/\/(\w)/);
      sl = sl[1] || sl[2];
      // append it to td
      append(link, a.parentNode, true);
      // use the new thumb site "open.thumbshots.org"
      //var url = "http://" + sl + ".googlepreview.com/preview?s=" 
      //    + a.protocol + "//" + a.hostname;
      //generateImageFromUrl(image, url);
      image.src = 'http://open.thumbshots.org/image.pxf?url=http://' + a.hostname;
      elm.setAttribute("bpp-preview", "bpp-preview");
    }
  },
  
  hotkey: {
    name:   "快捷键",
    config: "bpp-hotkey",
    cid:    4,
    help:   '同vim风格：j下一条，k上一条，回车打开连接，?[shift+/]跳到搜索栏(如果只是/键与firefox默认快捷键有冲突)，Esc离开搜索栏',
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      var query = location.search.match(/pn=(\d+)/);
      var id = start = 0;
      query && query[1] && (id = start = parseInt(query[1]));
      var s = this;
      
      GM_addStyle("\
        .bpp-hl { font-weight: bold; text-shadow: 0 0 2px; }\
        .bpp-hl:before { content: \"»\"; }\
        .bpp-hl:after { content: \"«\"; }\
      ");

      document.addEventListener('keypress', function(e) {
        var kc = e.keyCode || e.which;
        if (kc != 27 && (e.target.tagName == "INPUT" || e.target.tagName == "TEXTAREA")) return ;
        switch (true) {
          case kc == 63: // ?
            n("wd")[0].focus(); 
            break;
          case kc == 27: // Esc
            if (id > start) {
              s._a(id).focus();
              setTimeout(
                function() {
                  window.scrollTo(0, s._getTop(s._a(id)) - document.documentElement.clientHeight / 2);
                }, 1
              );
            } else {
              s._hl(id = 1);
            }
            break;
          case kc == 74 || kc == 106: // j
            if ($(id + 1)) {
              $(id) && s._nohl(id);
              s._hl(++id);
            }
            break;
          case kc == 75 || kc == 107: // k
            if ($(id - 1)) {
              $(id) && s._nohl(id);
              s._hl(--id);
            } else if (id < start) {
              s._hl(id = start + 1);
            }
            break;
          default:
        }
      }, false);
    },
    
    _hl: function(id) {
      var a = this._a(id);
      a.className += ' bpp-hl';
      a.focus();
      window.scrollTo(0, this._getTop(a) - document.documentElement.clientHeight / 2);
    },
    
    _nohl: function(id) {
      this._a(id).className = this._a(id).className.replace('bpp-hl', '');
    },
    
    _a: function(id) {
      return x(".//a[count(img)=0][1]", $(id)).snapshotItem(0);
    },
    
    _getTop: function(obj) {
      var ret = obj.offsetTop;
      obj.offsetParent && (ret += this._getTop(obj.offsetParent));

      return ret;
    }
  },

  noTrace: {
    name:   "禁止点击跟踪",
    cid:    4,
    config: "bpp-noTrace",
    help:   "每点击百度的一个搜索结果，百度都会向服务器发送你浏览了哪一条结果的信息。可能百度需要这个信息来做统计，但如果担心自己的隐私也会因此受到影响，可以使用此功能阻止百度发送此信息",
    autopagerize: true,

    enable: function() {
      return gm(this.config, false);
    },

    run: function() {
      var tables = baidu.getResultsByCondition('not(@bpp-noTrace)');
      var cnt = tables.snapshotLength;
      if (!cnt) return ;
      for (var i = 0; i < cnt; i++) {
        var elm = tables.snapshotItem(i);
        var a   = x(".//td/a/font[@size='3']/../self::*[1]", elm).snapshotItem(0);
        if (!a) continue;
        a.removeAttribute("onmousedown");
        elm.setAttribute("bpp-noTrace", "bpp-noTrace");
      }
    }
  },
  
  version: {
  
    name: "版本更新检测",
    
    cid: 5,
    
    config: "bpp-version",
    
    config2: "bpp-checkInterval",
    
    valueType: "number",
    
    help: "输入框内容为版本检测周期，单位为天。Opera和chrome不可用",
    
    value: function() {
      return gm(this.config2, 2);
    },
    
    enable: function() {
      return !window.chrome && !window.opera && gm(this.config, true);
    },
    
    run: function() {
      var now = Math.ceil(Date.now() / 1000);
      if (now - gm("bpp-verCheckAt", 0) > this.value() * 86400) {
        GM_xmlhttpRequest({
          method: "GET",
          url:    "http://userscripts.org/scripts/source/47560.meta.js",
          headers: {
            "Accept":"text/javascript; charset=UTF-8"
          },
          overrideMimeType: "application/javascript; charset=UTF-8",
          onload: function(response) {
            var httpsMETA = parseHeaders(response.responseText);
            var remoteVersion = httpsMETA["version"] ? httpsMETA["version"] : "0.0.0";
            GM_setValue("bpp-remoteVersion", remoteVersion);
            GM_setValue("bpp-verCheckAt", now);
          }
        });
      }
      if (this.compare(this.local(), this.remote())) {
        this.showNotice(this.remote());
      }
    },
    
    local: function() {
      return version;
    },
    
    remote: function() {
      if (!this._remote) {
        this._remote = gm("bpp-remoteVersion", "0.0.0");
      }
      return this._remote;
    },
    
    compare: function(o, n) {
      var o = o.split(/\./); var n = n.split(/\./);
      for (var i = 0; i < 3; i++) {
        if (n > o) return true;
      }
      return false;
    },
    
    showNotice: function(version) {
      var a = create("a");
      with (a) {
        with (style) {
          color      = "#eee"; 
          background = "#000";
          display    = "block";
          textDecoration = "none";
          position   = "fixed";
          bottom = right = "10px";
          padding    = "0px 3px";
          MozBorderRadius = "3px";
          borderRadius = "3px";
        }
        href = "http://userscripts.org/scripts/show/47560";
        target = "_blank";
      }
      a.innerHTML = "检测到新版本" + logo + ' v' + version;
      append(a, baidu.get("body"));
    }
  }
};

var util = {
  notice: function(content) {
    var notice = create("div");
    notice.className = "bpp-notice";
    notice.innerHTML = content; 

    if (!this.noticeCss) {
      this.noticeCss = "\
        .bpp-notice {\
          text-align: center;\
          background: #dfd;\
          border: 1px solid #cec;\
          -moz-border-radius: 10px;\
          border-radius: 10px;\
          padding: 10px;\
          margin: 0 10px 10px;\
          color: #090;\
          width: 539px;\
        }\
      ";
      GM_addStyle(this.noticeCss);
    }
    after(notice, baidu.get("sideBar"));
  },
  
  firstRun: true,

  createSidePanel: function(module) {
    if (!baidu.sideBar2) return ;
    var titleText = module.title;
    var sideBar = baidu.get("sideBar2");
    var div = create("div"); 
    div.className = "bpp-sidePanel";
    module.body = div;
    var title = create("h3");
    module.header = title;
    append(createText(titleText), title);
    append(title, div);
    append(div, sideBar, true);
    if (this.firstRun) {
      GM_addStyle("\
        .bpp-sidePanel {\
          width: 300px;\
          margin-bottom: 10px;\
          border: 1px solid #EFF2FA;\
          -moz-box-shadow: 1px 1px 1px #ddd;\
          -webkit-box-shadow: 1px 1px 1px #ddd;\
          box-shadow: 1px 1px 1px #ddd;\
          font-size: 10pt;\
        }\
        .bpp-sidePanel > h3 {\
          background: #EFF2FA;\
          margin: 0;\
          padding: 5px;\
          font-size: 11pt;\
        }\
        .bpp-no-content-msg {\
          text-align: center\
        }\
      ");
      this.firstRun = false;
    }
    return div;
  },
  
  createLoadingImage: function() {
    var img = create("img");
    with (img) {
      alt = "loading"; 
      src = image.loading;
    }
    return img;
  }
}

var app = {
  run: function() {
    for(i in modules) {
      var mod = modules[i];
      mod.init && mod.init();
      mod.enable() && mod.run();
    }
  }
};

app.run();

})();