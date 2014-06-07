// ==UserScript==
// @name           Ikariam Multi General
// @version        0.0.4
// @namespace      krwq_ikariam
// @description    Ikariam Multi General

// @include        http://s*.*.ikariam.com/*

// ==/UserScript==

unsafeWindow.version = 2;

unsafeWindow.scriptCount = 0;
unsafeWindow.onAllScriptsLoaded = new function()
{
  var functions = [];
  this.append = function(callback)
    {
      functions.push(callback);
    }
  this.callAll = function()
    {
      for (var i=0; i<functions.length; i++)
        {
          functions[i]();
        }
    }
};

var gmScope = this;
unsafeWindow.runnerWrapper = new function()
{
  var greaseMonkey = 'function' === typeof GM_xmlhttpRequest;
  var scope = gmScope;
  this.setValue = function(name, value)
    {
      if (greaseMonkey)
        {
          setTimeout(function()
            {
              GM_setValue(name, value);
            },0);
        }
    };
  this.setValues = function(values)
    {
      if (greaseMonkey)
        {
          setTimeout(function()
            {
              for (var name in values)
                GM_setValue(name,values[name]);
            },0);
        }
    };
  this.getValue = function(name, callback, defaultValue)
    {
      if (greaseMonkey)
        {
          setTimeout(function()
            {
              callback(GM_getValue(name, defaultValue));
            },0);
        }
    };
  this.getValues = function(names, callback)
    {
      if (greaseMonkey)
        {
          setTimeout(function()
            {
              var output = {};
              for (var name in names)
                {
                  var defaultValue = names[name];
                  output[name] = GM_getValue(name, defaultValue);
                }
              callback(output);
            },0);
        }
    };
  this.deleteValue = function(name)
    {
      if (greaseMonkey)
        {
          setTimeout(function()
            {
              GM_deleteValue(name);
            },0);
        }
    };
  this.registerMenuCommand = function(caption, commandFunc, accessKey)
    {
      if (greaseMonkey)
        {
          setTimeout(function()
            {
              GM_registerMenuCommand(caption, commandFunc, accessKey);
            },0);
        }
    };
  this.xmlhttpRequest = function(details)
    {
      if (greaseMonkey)
        {
          setTimeout(function()
            {
              GM_xmlhttpRequest(details);
            },0);
        }
    };
  this.postJSON = function(url, json, callback)
    {
      details =
        {
          data: JSON.stringify(json),
          method: "POST",
          onload: function(resp){callback(resp.responseText);},
          url: url
        };
      this.xmlhttpRequest(details);
    };
};

loadScript('http://jquery.com/src/jquery-latest.min.js');
loadScript('http://krwq.nstrefa.pl/ikariam/js/multigeneral.js');

function onScriptLoaded()
{
  unsafeWindow.scriptCount--;
  if (unsafeWindow.scriptCount == 0)
    { 
      unsafeWindow.onAllScriptsLoaded.callAll();
    }
}

// modified:
// http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
function loadScript(url)
{
    unsafeWindow.scriptCount++;

    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState)
      {  //IE
        script.onreadystatechange = function()
          {
            if (   script.readyState == "loaded"
                || script.readyState == "complete")
              {
                script.onreadystatechange = null;
                onScriptLoaded();
              }
          };
      }
    else
      { //Others
        /*script.onload = function()
          {
            onScriptLoaded();
          };*/
        script.addEventListener('load',function(){onScriptLoaded();},false);
      }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

//Javascript sprintf from http://www.webtoolkit.info/
sprintfWrapper = {
 
	init : function () {
 
		if (typeof arguments == "undefined") { return null; }
		if (arguments.length < 1) { return null; }
		if (typeof arguments[0] != "string") { return null; }
		if (typeof RegExp == "undefined") { return null; }
 
		var string = arguments[0];
		var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
		var matches = new Array();
		var strings = new Array();
		var convCount = 0;
		var stringPosStart = 0;
		var stringPosEnd = 0;
		var matchPosEnd = 0;
		var newString = '';
		var match = null;
 
		while (match = exp.exec(string)) {
			if (match[9]) { convCount += 1; }
 
			stringPosStart = matchPosEnd;
			stringPosEnd = exp.lastIndex - match[0].length;
			strings[strings.length] = string.substring(stringPosStart, stringPosEnd);
 
			matchPosEnd = exp.lastIndex;
			matches[matches.length] = {
				match: match[0],
				left: match[3] ? true : false,
				sign: match[4] || '',
				pad: match[5] || ' ',
				min: match[6] || 0,
				precision: match[8],
				code: match[9] || '%',
				negative: parseInt(arguments[convCount]) < 0 ? true : false,
				argument: String(arguments[convCount])
			};
		}
		strings[strings.length] = string.substring(matchPosEnd);
 
		if (matches.length == 0) { return string; }
		if ((arguments.length - 1) < convCount) { return null; }
 
		var code = null;
		var match = null;
		var i = null;
 
		for (i=0; i<matches.length; i++) {
 
			if (matches[i].code == '%') { substitution = '%' }
			else if (matches[i].code == 'b') {
				matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
				substitution = sprintfWrapper.convert(matches[i], true);
			}
			else if (matches[i].code == 'c') {
				matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
				substitution = sprintfWrapper.convert(matches[i], true);
			}
			else if (matches[i].code == 'd') {
				matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
				substitution = sprintfWrapper.convert(matches[i]);
			}
			else if (matches[i].code == 'f') {
				matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
				substitution = sprintfWrapper.convert(matches[i]);
			}
			else if (matches[i].code == 'o') {
				matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
				substitution = sprintfWrapper.convert(matches[i]);
			}
			else if (matches[i].code == 's') {
				matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length)
				substitution = sprintfWrapper.convert(matches[i], true);
			}
			else if (matches[i].code == 'x') {
				matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
				substitution = sprintfWrapper.convert(matches[i]);
			}
			else if (matches[i].code == 'X') {
				matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
				substitution = sprintfWrapper.convert(matches[i]).toUpperCase();
			}
			else {
				substitution = matches[i].match;
			}
 
			newString += strings[i];
			newString += substitution;
 
		}
		newString += strings[i];
 
		return newString;
 
	},
 
	convert : function(match, nosign){
		if (nosign) {
			match.sign = '';
		} else {
			match.sign = match.negative ? '-' : match.sign;
		}
		var l = match.min - match.argument.length + 1 - match.sign.length;
		var pad = new Array(l < 0 ? 0 : l).join(match.pad);
		if (!match.left) {
			if (match.pad == "0" || nosign) {
				return match.sign + pad + match.argument;
			} else {
				return pad + match.sign + match.argument;
			}
		} else {
			if (match.pad == "0" || nosign) {
				return match.sign + match.argument + pad.replace(/0/g, ' ');
			} else {
				return match.sign + match.argument + pad;
			}
		}
	}
};
 
sprintf = unsafeWindow.sprintf = sprintfWrapper.init;

/*
Queue.js
A function to represent a queue
Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:
http://creativecommons.org/publicdomain/zero/1.0/legalcode
+ few little modifications by krwq
*/
unsafeWindow.Queue = function()
  {
    var q=[];
    var L=0;
    this.getLength = function(){return (q.length-L);};
    this.isEmpty   = function(){return (q.length==0);};
    this.enqueue   = function(e){q.push(e);};
    this.dequeue=function()
      {
        if (q.length==0)
            return undefined;
        var t=q[L];
        if (++L*2>=q.length)
          {
            q = q.slice(L);
            L = 0;
          }
        return t;
      };
    this.peek = function(){return (q.length>0?q[L]:undefined);};
    this.push = this.enqueue;
    this.pop  = this.dequeue;
};
