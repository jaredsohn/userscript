// ==UserScript==
// @name          	A Bit Better RTM
// @namespace		http://www.rememberthemilk.com
// @description    	Small improvements for Remember The Milk: display list tabs to the left; display tasks count; GoTo & MoveTo list quickly;
// @include       	http://www.rememberthemilk.com/*
// @include       	https://www.rememberthemilk.com/*
// ==/UserScript==

//region String

/**
 * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, no newlines are added.
 *
 * @param utf8encode optional parameter, if set to true Unicode string is encoded to UTF8 before 
 *                   conversion to base64; otherwise string is assumed to be 8-bit characters
 * @return           base64-encoded string
 */ 
var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

String.prototype.encodeBase64 = function(utf8encode) {  // http://tools.ietf.org/html/rfc4648
  utf8encode =  (typeof utf8encode == 'undefined') ? false : utf8encode;
  var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c, plain, coded;
   
  plain = utf8encode ? this.encodeUTF8() : this;
  
  c = plain.length % 3;  // pad string to length of multiple of 3
  if (c > 0) { while (c++ < 3) { pad += '='; plain += '\0'; } }
  // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars
   
  for (c=0; c<plain.length; c+=3) {  // pack three octets into four hexets
    o1 = plain.charCodeAt(c);
    o2 = plain.charCodeAt(c+1);
    o3 = plain.charCodeAt(c+2);
      
    bits = o1<<16 | o2<<8 | o3;
      
    h1 = bits>>18 & 0x3f;
    h2 = bits>>12 & 0x3f;
    h3 = bits>>6 & 0x3f;
    h4 = bits & 0x3f;

    // use hextets to index into b64 string
    e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  coded = e.join('');  // join() is far faster than repeated string concatenation
  
  // replace 'A's from padded nulls with '='s
  coded = coded.slice(0, coded.length-pad.length) + pad;
   
  return coded;
}

/**
 * Decode string from Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, newlines are not catered for.
 *
 * @param utf8decode optional parameter, if set to true UTF8 string is decoded back to Unicode  
 *                   after conversion from base64
 * @return           decoded string
 */ 
String.prototype.decodeBase64 = function(utf8decode) {
  utf8decode =  (typeof utf8decode == 'undefined') ? false : utf8decode;
  var o1, o2, o3, h1, h2, h3, h4, bits, d=[], plain, coded;

  coded = utf8decode ? this.decodeUTF8() : this;
  
  for (var c=0; c<coded.length; c+=4) {  // unpack four hexets into three octets
    h1 = b64.indexOf(coded.charAt(c));
    h2 = b64.indexOf(coded.charAt(c+1));
    h3 = b64.indexOf(coded.charAt(c+2));
    h4 = b64.indexOf(coded.charAt(c+3));
      
    bits = h1<<18 | h2<<12 | h3<<6 | h4;
      
    o1 = bits>>>16 & 0xff;
    o2 = bits>>>8 & 0xff;
    o3 = bits & 0xff;
    
    d[c/4] = String.fromCharCode(o1, o2, o3);
    // check for padding
    if (h4 == 0x40) d[c/4] = String.fromCharCode(o1, o2);
    if (h3 == 0x40) d[c/4] = String.fromCharCode(o1);
  }
  plain = d.join('');  // join() is far faster than repeated string concatenation
   
  return utf8decode ? plain.decodeUTF8() : plain; 
}

/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters 
 * (BMP / basic multilingual plane only) (instance method extending String object).
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 * @return encoded string
 */
String.prototype.encodeUTF8 = function() {
  // use regular expressions & String.replace callback function for better efficiency 
  // than procedural approaches
  var str = this.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  str = str.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0); 
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return str;
}

/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 * (instance method extending String object).
 *
 * @return decoded string
 */
String.prototype.decodeUTF8 = function() {
  var str = this.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  str = str.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); 
        return String.fromCharCode(cc); }
    );
  return str;
}

//endregion

//region Utility

function Utility(configuration)
{
	this.location = new Utility.Location(configuration);
}

Utility.addGlobalCssStyle = function(css)
{
    var head = document.getElementsByTagName('head')[0];
    if (!head) 
	{ 
		return; 
	}
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};

Utility.appendToMethod = function(owner, methodName, appendOwner, appendMethodName)
{
	if (owner)
	{
		var oldMethod = owner[methodName];
		owner["original" + methodName] = oldMethod;

		owner[methodName] = function(param1, param2, param3, param4, param5)
		{
			oldMethod.call(owner, param1, param2, param3, param4, param5);
			appendMethodName.call(appendOwner);
		}
	}
}

Utility.Location = function(configuration)
{
    this.mbn = this.getUniqueMessageBusName();
	this.configuration = configuration;

	if (this.configuration.getUniqueURLForListAndTask())
	{
		if (history.length > 1 && location.hash.indexOf("section.tasks") >= 0)
		{
			history.back();

			if (location.hash.indexOf("section.tasks") < 0)
			{
				history.forward();
			}
		}
		this.locationHash = location.hash;

		var that = this;
		var checkIfLocationHashChanged = function()
		{
			if (that.locationHash != location.hash)
			{
				window.messageBus.broadcast(that, that.mbn + "locationHashChanged");
				that.locationHash = location.hash;
			}
		}
		setInterval(checkIfLocationHashChanged, 500);
	}
}

Utility.Location.prototype.getUniqueMessageBusName = function()
{
	return "abitbetterrtm.utility.location.";
}

Utility.Location.prototype.getListID = function()
{
	var hashParams = this.getHashParams();

	if (hashParams)
	{
		if (hashParams.indexOf("list=") > -1)
		{
			var start = hashParams.indexOf("list=") + 5;
			var end = hashParams.indexOf("/", start);
			return hashParams.substring(start, end);
		}
	}

	return null;
}

Utility.Location.prototype.getTaskID = function(url)
{
	var hashParams = this.getHashParams();

	if (hashParams)
	{
		if (hashParams.indexOf("task=") > -1)
		{
			var start = hashParams.indexOf("task=") + 5;
			var end = hashParams.indexOf("/", start);
			return hashParams.substring(start, end);
		}
	}

	return null;
}

Utility.Location.prototype.setTaskID = function(taskID)
{
	var hashParams = this.getHashParams();

	if (taskID)
	{
		if (hashParams.indexOf("task=") >= 0 || hashParams.indexOf("list=") >= 0)
		{
			hashParams = hashParams.replace(/\/(task|list)=\d+\//, "/task=" + taskID + "/");
		}
		else
		{
			hashParams = "/task=" + taskID + "/";
		}
	}
	else
	{
		hashParams = hashParams.replace(/\/task=\d+\//, "");
	}

	this.setHashParams(hashParams);
}

Utility.Location.prototype.setListID = function(listID)
{
	var hashParams = this.getHashParams();

	if (listID)
	{
		if (hashParams.indexOf("list=") >= 0 || hashParams.indexOf("task=") >= 0)
		{
			hashParams = hashParams.replace(/\/(list|task)=\d+\//, "/list=" + listID + "/");
		}
		else
		{
			hashParams += "/list=" + listID + "/";
		}
	}
	else
	{
		hashParams = hashParams.replace(/\/list=\d+\//, "");
	}

	this.setHashParams(hashParams);
}

Utility.Location.prototype.getHashParams = function()
{
	var hashParts = location.hash.split('/');

	if (hashParts[1])
	{
		return hashParts[1].decodeBase64();
	}

	return "";
}

Utility.Location.prototype.setHashParams = function(hashParams)
{
	var locationHash = location.hash.split('/')[0];

	if (hashParams)
	{
		locationHash += "/" + hashParams.encodeBase64();
	}

	location.hash = this.locationHash = locationHash;
}

//endregion

//region Initialize

window = window.wrappedJSObject;

function aBitBetterRTMLoad()
{
	window.aBitBetterRTM = new ABitBetterRTM();
}

window.addEventListener('load', aBitBetterRTMLoad, false);

//endregion

//region JSON parse an stringify

if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+String.replace(escapable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(typeof value.length==='number'&&!value.propertyIsEnumerable('length')){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}})();

//endregion

//region Configuration

function Configuration()
{
	this.displayTabsToTheLeft = (GM_getValue("displayTabsToTheLeft", "") !== "false");	
	this.hiddenLists = GM_getValue("hiddenLists", "");
	this.showTasksCount = (GM_getValue("showTasksCount", "") !== "false");
	this.quickAddList = (GM_getValue("quickAddList", "") !== "false");
	this.uniqueURLForListAndTask = (GM_getValue("uniqueURLForListAndTask", "") !== "false");
}

Configuration.prototype.makeListHidden = function(listEntry)
{
	this.hiddenLists = (this.hiddenLists || "") + listEntry[0] + ",";

	GM_setValue("hiddenLists", this.hiddenLists);
};

Configuration.prototype.makeListVisible = function(listEntry)
{
	this.hiddenLists = this.hiddenLists.replace(listEntry[0], "");
	this.hiddenLists = this.hiddenLists.replace(",,", ",");

	GM_setValue("hiddenLists", this.hiddenLists);
};

Configuration.prototype.isListHidden = function(listID)
{
	if (this.hiddenLists)
	{
		return this.hiddenLists.indexOf(listID) >= 0;
	}

	return false;
}

Configuration.prototype.getDisplayTabsToTheLeft = function()
{
	return this.displayTabsToTheLeft;
};

Configuration.prototype.setDisplayTabsToTheLeft = function(value)
{
	if (value === true)
	{
		GM_setValue("displayTabsToTheLeft", "true");
	}
	else
	{
		GM_setValue("displayTabsToTheLeft", "false");
	}

	this.displayTabsToTheLeft = value;
};

Configuration.prototype.getShowTasksCount = function()
{
	return this.showTasksCount;
};

Configuration.prototype.setShowTasksCount = function(value)
{
	if (value === true)
	{
		GM_setValue("showTasksCount", "true");
	}
	else
	{
		GM_setValue("showTasksCount", "false");
	}

	this.showTasksCount = value;
};

Configuration.prototype.getQuickAddList = function()
{
	return this.quickAddList;
};

Configuration.prototype.setQuickAddList = function(value)
{
	if (value === true)
	{
		GM_setValue("quickAddList", "true");
	}
	else
	{
		GM_setValue("quickAddList", "false");
	}

	this.quickAddList = value;
};

Configuration.prototype.getUniqueURLForListAndTask = function()
{
	return this.uniqueURLForListAndTask;
};

Configuration.prototype.setUniqueURLForListAndTask = function(value)
{
	if (value === true)
	{
		GM_setValue("uniqueURLForListAndTask", "true");
	}
	else
	{
		GM_setValue("uniqueURLForListAndTask", "false");
	}

	this.quickAddList = value;
};

//endregion

//region ListAutocompleteStore

function ListAutocompleteStore(listTabs)
{
	this.listTabs = listTabs;	
}

ListAutocompleteStore.prototype.getCompletions = function(text)
{
	if (this.listTabs)
	{
		var completions = [];
		var entries = this.listTabs.getEntries();
		var data = this.listTabs.getData();

		if (entries && data)
		{
			for (var i = 0; i < entries.length; ++i)
			{
				if (entries[i].toLowerCase().indexOf(text.toLowerCase()) === 0 && !this.listTabs.parent.configuration.isListHidden(data[i][1]))
				{
					completions.push(entries[i]);
				}
			}
		}

		return completions;
	}

	return null;
};

//endregion

//region AutocompleteList

function AutocompleteList(inputField, autocompleteStore, parent)
{
	this.inputField = inputField;
	this.autocompleteStore = autocompleteStore;
	this.parent = parent;
	this.output = null;
	this.completions = null;
	this.position = -1;
	this.isVisible = false;
}

AutocompleteList.prototype.createOutput = function()
{
	if (!this.inputField)
	{
		return;
	}

	this.output = document.createElement('div');
	this.output.setAttribute('id','autoCompleteList_' + this.inputField.id);
	this.output.style.border = "solid 1px black";
	this.output.style.background = "white";
	this.output.style.position = "absolute";
	this.output.style.width = "150px";
	this.output.style.visibility = "hidden";

	this.inputField.parentNode.insertBefore(this.output, this.inputField.nextSibling);
};

AutocompleteList.prototype.showOutput = function()
{
	if (this.output)
	{
	   this.output.style.visibility = "visible";
	}

	this.isVisible = true;
};

AutocompleteList.prototype.hideOutput = function()
{
	if (this.output)
	{
		this.output.style.visibility = "hidden";
	}

	this.isVisible = false;
};

AutocompleteList.prototype.clearOutput = function()
{
	while(this.output && this.output.childNodes.length)
	{
		this.output.removeChild(this.output.firstChild);
	}

	this.position = -1;
	this.hideOutput();
};

AutocompleteList.prototype.addCompletion = function(completion)
{
	var autocompleteList = this;

	var _mouseOverHandler = function(event)
	{
		autocompleteList.position = this.position;
		autocompleteList.highlightCompletion();
	};

	var _mouseClickHandler = function(event)
	{
		autocompleteList.parent.doCallback();
	};

	var completionBox = document.createElement("div");
	completionBox.style.textAlign = "left";
	completionBox.style.paddingLeft = "2px";
	completionBox.appendChild(document.createTextNode(completion));
	completionBox.wrappedJSObject.position = this.output.childNodes.length;
 	completionBox.addEventListener("mouseover", _mouseOverHandler, false);
 	completionBox.addEventListener("click", _mouseClickHandler, false);
	this.output.appendChild(completionBox);
};

AutocompleteList.prototype.highlightCompletion = function()
{
	if (this.output && this.output.childNodes)
	{
		for (var i = 0; i < this.output.childNodes.length; ++i)
		{
			if (i == this.position)
			{
				this.output.childNodes[i].style.color = "white";
				this.output.childNodes[i].style.background = "#316ac5";
			}
			else
			{
				this.output.childNodes[i].style.color = "black";
				this.output.childNodes[i].style.background = "white";
			}
		}
	}
};

AutocompleteList.prototype.highlightNextCompletion = function()
{
	if (this.completions && this.completions.length > 0 && this.position < this.completions.length - 1)
	{
		++this.position;
		this.highlightCompletion();
	}
};

AutocompleteList.prototype.highlightPreviousCompletion = function()
{
	if (this.completions && this.completions.length > 1 && this.position > 0)
	{
		--this.position;
		this.highlightCompletion();
	}
};

AutocompleteList.prototype.getCurrentCompletion = function()
{
	if (this.completions && this.completions.length > 0)
	{
		return this.completions[this.position];
	}

	return null;
};

AutocompleteList.prototype.update = function()
{
	if (this.inputField.value.length > 0)
	{
		this.completions = this.autocompleteStore.getCompletions(this.inputField.value);
		if (this.completions && this.completions.length > 0)
		{
			this.clearOutput();
			for (var i = 0; i < this.completions.length; ++i)
			{
				this.addCompletion(this.completions[i]);
			}

			this.showOutput();
			this.highlightNextCompletion();
		}
		else
		{
			this.hideOutput();
			this.position = -1;
		}
	}
	else
	{
		this.hideOutput();
		this.position = -1;
	}
};

//endregion

//region Autocomplete

function Autocomplete(name, autocompleteStore, owner, callback)
{
	var autocompleteBox = document.createElement('div');
	autocompleteBox.setAttribute("id", "autocompleteBox_" + name);
	autocompleteBox.style.width = "240px";
	autocompleteBox.style.position = "absolute";
	autocompleteBox.innerHTML = '<div class="white_rbroundbox"> <div class="white_rbtop"> <div> <div></div> </div> </div> <div class="white_rbcontentwrap"> <div class="white_rbcontent"> <div class="taskcloudcontent" style="padding: 0px 5px 0px 5px; height: 17px;" id="listtabscontainer"><div style="width: 70px; font-weight: bold; float: left; height: 17px; padding-top: 1px;">' + name + '</div><div style="text-align: right; float: right; width: 155px; padding-right: 2px;"><input type="text" id="autocompleteInputField_' + name + '" name="text" style="width: 151px;  ";/></div> </div> </div> </div> <div class="white_rbbot"> <div><div></div> </div> </div> </div> ';

	document.body.appendChild(autocompleteBox);

	this.inputField = document.getElementById("autocompleteInputField_" + name);
	this.box = document.getElementById("autocompleteBox_" + name);
	this.autocompleteList = new AutocompleteList(this.inputField, autocompleteStore, this);
	this.owner = owner;
	this.callback = callback;
	this.hide();
	this.bind();
	
	function _centerAutoCompleteBox()
	{
		var left = window.innerWidth / 2 - 120 + window.scrollX;
		var top = window.innerHeight / 2 - 10 + window.scrollY;

		autocompleteBox.style.left = left + "px";
		autocompleteBox.style.top = top + "px";
	}

	_centerAutoCompleteBox();
	window.addEventListener("scroll", _centerAutoCompleteBox, false);
	window.addEventListener("resize", _centerAutoCompleteBox, false);

	return this;
}

Autocomplete.prototype.show = function()
{
	this.box.wrappedJSObject.style.display = "block";
	if (this.inputField)
	{
		this.inputField.focus();
	}
};

Autocomplete.prototype.hide = function()
{
	this.box.wrappedJSObject.style.display = "none";
	if (this.inputField)
	{
		this.inputField.value = "";
	}
	
	this.autocompleteList.clearOutput();
};

Autocomplete.prototype.doCallback = function()
{
	var completion = this.autocompleteList.getCurrentCompletion();
	this.hide();

	if (this.owner)
	{
		this.callback.call(this.owner, completion);
	}
	else
	{
		this.callback(completion);
	}
};

Autocomplete.prototype.bind = function()
{
	var autocompleteList = this.autocompleteList;
	var inputField = this.inputField;
	var currentText = "";

	var _handleKeyPressEvent = function(event)
	{
		currentText = inputField.value;
		if (event.keyCode == 9) // Tab
		{
			if (window.utility)
			{
				window.utility.stopEvent(event);
			}

			return false;
		}
		else if (autocompleteList.isVisible)
		{
			if (event.keyCode == 13)// Enter
			{
				autocompleteList.parent.doCallback();
			}
			if (event.keyCode == 40)// Key down
			{
				autocompleteList.highlightNextCompletion();
			}
			else if (event.keyCode == 38)  // Key up
			{
				autocompleteList.highlightPreviousCompletion();
			}
			else if (event.keyCode == 27) // Esc
			{
				autocompleteList.clearOutput();
			}
		}
		else if (event.keyCode == 27)
		{
			autocompleteList.parent.hide();
		}
	
		return true;
	};
	var _handleKeyUpEvent = function(event)
	{
		if (currentText === null || currentText != inputField.value)
		{
			autocompleteList.update();
		}
	};
	var _handleClickEvent = function(event)
	{
		if (autocompleteList.isVisible)
		{
			autocompleteList.hideOutput();
		}

		if (window.utility)
		{
			window.utility.stopEvent(event);
		}
	};

	this.inputField.setAttribute("autocomplete", "off");
	this.inputField.addEventListener("keypress", _handleKeyPressEvent, false);
	this.inputField.addEventListener("keyup", _handleKeyUpEvent, false);
	this.box.addEventListener("click", _handleClickEvent, false);
	this.autocompleteList.createOutput();
};

//endregion

//region LeftColumn

function LeftColumn(configuration)
{
	this.RTM_listTabs = window.listTabs;
	this.RTM_taskCloud = window.taskCloud;
	this.configuration = configuration;
	this.id = "leftColumn";
	this.div = document.createElement("div");
	this.appView = document.getElementById("appview");
	this.listBox = document.getElementById("listbox");
	this.content = document.getElementById("content");
	this.children = [];

	this.div.setAttribute("id", this.id);
	this.div.style.cssFloat = "left";
	this.div.style.paddingLeft = "5px";
	this.div.style.paddingRight = "8px";

	if (this.appView && this.listBox)
	{
		this.appView.insertBefore(this.div, this.listBox);
	}

	var that = this;
    var handleViewChanged = function(d, e) 
	{
		if (e[0][1] == "Tasks")
		{
			that.hide();
		}
		else if (e[1][1] == "Tasks")
		{
			that.show();
		}
    };

	if (window.messageBus)
	{
		window.messageBus.subscribe(handleViewChanged, window.view.getUniqueMessageBusName() + "viewChanged");
	}

	Utility.appendToMethod(this.RTM_listTabs, "blitDiv", this, this.blitDiv);
	Utility.appendToMethod(this.RTM_taskCloud, "update", this.RTM_listTabs, this.RTM_listTabs.blitDiv);
}

LeftColumn.prototype.hide = function()
{
	this.div.style.display = "none";
	this.content.style.width = "980px";
};

LeftColumn.prototype.show = function()
{
	this.div.style.display = "block";
};

LeftColumn.prototype.blitDiv = function()
{
	if (window.view.selected === 1) //Tasks
	{
		this.show();
		if (this.children)
		{
			for (var i = 0; i < this.children.length; ++i)
			{
				this.children[i].blitDiv();
			}
		}

		if (this.children[0] && this.children[0].getWidth)
		{
			this.div.style.width = this.children[0].getWidth() + "px";
			this.content.style.width = (973 + this.div.clientWidth) + "px";
		}
	}
}

LeftColumn.prototype.appendChild = function(child)
{
	if (this.div && child)
	{
		this.div.appendChild(child.div);
		child.container = this;
		this.children.push(child);
	}
}

//endregion

//region Frame

function Frame(id)
{
	this.id = id;
	this.container;
	this.div = document.createElement('div');	
	this.div.innerHTML = '<div class="white_rbroundbox"> <div class="white_rbtop"> <div> <div></div> </div> </div> <div class="white_rbcontentwrap"> <div class="white_rbcontent"> <table><tr><td><div class="taskcloudcontent" style="padding: 0px 5px 0px 5px;" id="frame_' + id + '"> </div></td></tr></table> </div> </div> <div class="white_rbbot"> <div><div></div> </div> </div> </div> ';
	this.childPlaceHolder;
	this.children = [];
}

Frame.prototype.appendChild = function(child)
{
 	this.childPlaceHolder = document.getElementById("frame_" + this.id);
	if (this.childPlaceHolder && child)
	{
		this.childPlaceHolder.appendChild(child.div);
		child.container = this;
		this.children.push(child);
	}
};

Frame.prototype.blitDiv = function()
{
	if (this.children)
	{
		for (var i = 0; i < this.children.length; ++i)
		{
			this.children[i].blitDiv();
		}

		if (this.children[0] && this.children[0].getWidth)
		{
			this.div.style.width = Math.round(this.children[0].getWidth() + 15) + "px";
		}
	}
};

Frame.prototype.getWidth = function()
{
	return this.div.clientWidth;
}

//endregion

//region ListAdder

function ListAdder(parent)
{
	this.parent = parent;
	this.RTM_utility = window.utility;
	this.RTM_T = window._T;
	this.RTM_statusBox = window.statusBox;
	this.RTM_transMgr = window.transMgr;
	this.div = document.createElement('div');
	this.div.cssClass = "addEntryTask";
	this.div.style.padding = "0px 0px 10px 3px";
	this.div.id = "listAdder";
	this.div.innerHTML = '<div style="padding-bottom: 2px;"><img class="taskaddicon" src="http://static.rememberthemilk.com/img/ico/ico_add.gif" alt="Add task"><a title="Add list" href="#" class="taskadd" style="text-decoration: underline;">Add List</a></div>';
	this.progressBar = document.createElement('img');
	this.progressBar.src = '/img/busy.gif';
	this.progressBar.width = '10';
	this.progressBar.height = '10';
	this.progressBar.style.display = 'none';
	this.div.firstChild.appendChild(this.progressBar);
	this.listEntryBox = document.createElement('input');
	this.listEntryBox.type = "text";
	this.div.appendChild(this.listEntryBox);
	this.listEntryBox.style.width = (this.parent.getWidth() - 5) + "px";
	this.listEntryBox.style.display = "none";

	var that = this;
	var handleLostFocus = function(ev)
	{
		that.hideListEntryBox();
	};

	var handleAddListClick = function(ev)
	{
		that.showListEntryBox();
		that.RTM_utility.stopEvent(ev);
	};

	var handleKeyPressEvent = function(event)
	{
		if (event.keyCode === 13)// Enter
		{
			that.showProgressBar();
			that.addList(that.listEntryBox.value);
		}
		else if (event.keyCode === 27) // Esc
		{
			that.clearListEntryBox();
			that.hideListEntryBox();
		}

		return true;
	};

	var handleAddingListSuccess = function()
	{
		that.clearListEntryBox();
		that.hideListEntryBox();
		that.hideProgressBar();
	}

	this.listEntryBox.addEventListener('keypress', handleKeyPressEvent, false);
	this.listEntryBox.addEventListener('blur', handleLostFocus, false);
	this.div.addEventListener('click', handleAddListClick, false);

	Utility.appendToMethod(window.control, "addingListAddSuccess", null, handleAddingListSuccess);
}

ListAdder.prototype.showProgressBar = function()
{
	this.progressBar.style.display = 'inline';
};

ListAdder.prototype.hideProgressBar = function()
{
	this.progressBar.style.display = 'none';
};

ListAdder.prototype.showListEntryBox = function()
{
	this.listEntryBox.style.display = "block"; 
	this.listEntryBox.focus();
};

ListAdder.prototype.hideListEntryBox = function()
{
	this.listEntryBox.style.display = "none"; 
};

ListAdder.prototype.clearListEntryBox = function()
{
	this.listEntryBox.value = ""; 
}

ListAdder.prototype.addList = function(listName)
{
	if (listName.toLowerCase() == "inbox" || listName.toLowerCase() == "sent" || listName.toLowerCase() == this.RTM_T("INTERFACE_TASKS_INBOX").toLowerCase() || listName.toLowerCase() == this.RTM_T("INTERFACE_TASKS_SENT").toLowerCase()) 
	{
		this.RTM_statusBox.setText(this.RTM_T("INTERFACE_STATUS_CANT_CALL_LIST", {"LIST_NAME" : listName}), false, true);
		return false
	}

	this.RTM_transMgr.request("lists.add", this.RTM_utility.encodeJavaScript( { "name" : listName, "id" : ""}))
}

//endregion

//region ListTabs

function ListTabs(parent, configuration)
{
	this.configuration = configuration;
	this.parent = parent;
	this.container;
	this.blitted = false;
	this.RTM_control = window.control;
	this.RTM_listTabs = window.listTabs;
	this.RTM_listList = window.listList;
	this.RTM_taskCloud = window.taskCloud;
	this.RTM_overviewList = window.overviewList;
	this.RTM_stateMgr = window.stateMgr;
	this.RTM_format = window.format;
	this.tasksCountCache = {};

	if (this.RTM_listTabs)
	{
		if (this.configuration.getDisplayTabsToTheLeft())
		{
			if (this.configuration.getQuickAddList())
			{
				this.listAdder = new ListAdder(this);
			}
			this.div = document.createElement('div');	
			this.RTM_listTabs.div.className = "";
			this.RTM_listTabs.div.style.width = "100%";
			this.div.appendChild(this.RTM_listTabs.div);
		}
		this.overrideSelectLeft();
		this.overrideSelectRight();
	}

	var that = this;
    var handleViewChanged = function(d, e) 
	{
		if (e[1][1] == "Tasks")
		{
			that.RTM_listTabs.blitDiv();
		}
    };

	var handleTabChanged = function(d, e)
	{
		if (that.configuration.getUniqueURLForListAndTask() === true)
		{
			that.parent.utility.location.setListID(e[2][1]);
		}

		if (that.configuration.getShowTasksCount() === true)
		{
			setTimeout(that.backgroundTasksCountUpdate, 1000, d.selected, that);
		}
	}

	var handleLocationHashChanged = function(d, e)
	{
		if (window.view.entries[window.view.selected][0] === "Tasks")
		{
			var taskID = that.parent.utility.location.getTaskID();

			if (taskID)
			{
				that.parent.taskList.selectTaskByID(taskID);
			}
			else
			{
				var selectedTaskID = that.parent.taskList.getSelectedTaskID();
				
				if (selectedTaskID)
				{
					that.parent.utility.location.setTaskID(selectedTaskID);
				}
				else
				{
					var listID = that.parent.utility.location.getListID();

					if (listID)
					{
						that.selectListByID(that.parent.utility.location.getListID());
					}
					else
					{
						that.parent.utility.location.setListID(that.getSelectedListID());
					}
				}
			}
		}
	}

	if (this.configuration.getUniqueURLForListAndTask())
	{
		handleLocationHashChanged();
	}

	var handleSelectFinished = function()
	{
		if (window.view.entries[window.view.selected][0] === "Tasks")
		{
			if (!that.parent.taskList.getSelectedTaskID())
			{
				that.parent.utility.location.setListID(that.getSelectedListID());
			}
		}
	};

	if (window.messageBus)
	{
		window.messageBus.subscribe(handleViewChanged, window.view.getUniqueMessageBusName() + "viewChanged");
		window.messageBus.subscribe(this.RTM_listTabs.blitDiv, this.RTM_listList.mbn + "setFilterSuccess");
		window.messageBus.subscribe(handleTabChanged, this.RTM_listTabs.mbn + "tabChanged");

		if (this.configuration.getUniqueURLForListAndTask())
		{
   			window.messageBus.subscribe(handleSelectFinished, window.taskList.list.getUniqueMessageBusName() + "selectFinished");
			window.messageBus.subscribe(handleLocationHashChanged, this.parent.utility.location.mbn + "locationHashChanged");
		}
	}

	this.appendCodeToExistingMethods();

	var tools_spacer = document.getElementById("tools_spacer");
	if (tools_spacer)
	{
		tools_spacer.style.paddingTop = "1px";
		tools_spacer.style.borderTop = "1px solid #CACACA";
	}

	var sorting = document.getElementById("sorting");
	if (sorting)
	{
		sorting.style.marginTop = "0px";
	}

	var tools = document.getElementById("tools");
	if (tools)
	{
		tools.style.paddingTop = "5px";
	}
}

ListTabs.prototype.appendCodeToExistingMethods = function()
{
	if (this.configuration.getShowTasksCount() === true)
	{
		Utility.appendToMethod(this.RTM_taskCloud, "update", this, this.backgroundTasksCountUpdate);
	}

	if (this.configuration.getDisplayTabsToTheLeft() !== true)
	{
		Utility.appendToMethod(this.RTM_listTabs, "blitDiv", this, this.blitDiv);
		Utility.appendToMethod(this.RTM_taskCloud, "update", this.RTM_listTabs, this.RTM_listTabs.blitDiv);
	}
};

ListTabs.prototype.getWidth = function()
{
	var maxListEntryName = "";

	for (var i = 0; i < this.RTM_listTabs.entries.length; ++i)
	{
		if (this.RTM_listTabs.entries[i].length > maxListEntryName.length)
		{
			maxListEntryName = this.RTM_listTabs.entries[i];
		}
	}

	return maxListEntryName.length * 9 + 4;
}

ListTabs.prototype.getEntries = function()
{
	if (this.RTM_listTabs)
	{
		return this.RTM_listTabs.entries;
	}

	return null;
}

ListTabs.prototype.getData = function()
{
	if (this.RTM_listTabs)
	{
		return this.RTM_listTabs.data;
	}

	return null;
}

ListTabs.prototype.showTasksCount = function()
{
	if (this.RTM_listTabs)
	{
		var listItems = this.RTM_listTabs.div.getElementsByTagName("li");

		for (var i = 0; this.RTM_listTabs.data && this.RTM_listTabs.data[i]; ++i)
		{
			if (this.RTM_listTabs.data[i][2])
			{
				this.smartListTasksCountUpdate(this.RTM_listTabs.data[i][1], this.RTM_listTabs.data[i][2], listItems[i], this.tasksCountCache, false, this.getListNameWithTasksCount);
			}
			else
			{
				this.regularListTasksCountUpdate(this.RTM_listTabs.data[i][1], listItems[i], this.tasksCountCache, false, this.getListNameWithTasksCount);
			}
		}
	}
};

ListTabs.prototype.hideTasksCount = function()
{
	if (this.RTM_listTabs)
	{
		var listItems = this.RTM_listTabs.div.getElementsByTagName("li");

		for (var i = 0; this.RTM_listTabs.data && this.RTM_listTabs.data[i]; ++i)
		{
			listItems[i].firstChild.innerHTML = this.getListNameWithoutTasksCount(listItems[i].firstChild.innerHTML);
		}
	}
}

ListTabs.prototype.backgroundTasksCountUpdate = function(selectedListNumber, that)
{
	if (that === undefined)
	{
		that = this;
	}

	if (that.RTM_listTabs)
	{
		if (selectedListNumber !== undefined && selectedListNumber != that.RTM_listTabs.selected)
		{
			return;
		}

		var listItems = that.RTM_listTabs.div.getElementsByTagName("li");
		var timeout = 300;

		for (var i = 0; that.RTM_listTabs.data && that.RTM_listTabs.data[i]; ++i)
		{
			if (selectedListNumber !== undefined && i != selectedListNumber)
			{
				continue;
			}

			if (that.RTM_listTabs.data[i][2])
			{
				setTimeout(that.smartListTasksCountUpdate, timeout, that.RTM_listTabs.data[i][1], that.RTM_listTabs.data[i][2], listItems[i], that.tasksCountCache, true, that.getListNameWithTasksCount);
			}
			else
			{
				setTimeout(that.regularListTasksCountUpdate, timeout, that.RTM_listTabs.data[i][1], listItems[i], that.tasksCountCache, true, that.getListNameWithTasksCount);
			}

			timeout += 300;
		}
	}
};

ListTabs.prototype.regularListTasksCountUpdate = function(listID, listItem, cache, reloadCache, getListNameCallback)
{
	var tasksCount = cache[listID];

	if (tasksCount === undefined || reloadCache === true)
	{
		if (window.format)
		{
			tasksCount = window.format.getListStatistics(listID)[5];
		}
	}

	if (listItem && getListNameCallback)
	{
		listItem.firstChild.innerHTML = getListNameCallback(listItem.firstChild.innerHTML, tasksCount);
	}

	cache[listID] = tasksCount;
};

ListTabs.prototype.getListNameWithoutTasksCount = function(listName)
{
	if (listName)
	{
		var regExp = /\(\d+\)$/;
		
		if (regExp.test(listName))
		{
			listName = listName.replace(regExp, "");
		}
	}

	return listName;
}

ListTabs.prototype.getListNameWithTasksCount = function(listName, tasksCount)
{
	if (listName)
	{
		var regExp = /\(\d+\)$/;
		
		if (regExp.test(listName))
		{
			listName = listName.replace(regExp, "(" + tasksCount + ")");
		}
		else
		{
			listName = listName + " (" + tasksCount + ")";
		}

		if (!tasksCount || tasksCount == 0)
		{
			listName = listName.replace(regExp, "");
		}
	}

	return listName;
};

ListTabs.prototype.smartListTasksCountUpdate = function(listID, filter, listItem, cache, reloadCache, getListNameCallback)
{
	var tasksCount = cache[listID];

	if (tasksCount === undefined || reloadCache === true)
	{
		if (filter && filter.indexOf("status:") < 0)
		{
			filter = "(" + filter + ") and (status:incomplete)";
		}

		if (window.overviewList && filter)
		{
			tasksCount = window.overviewList.getFilteredList(filter).length;
		}
	}

	if (listItem && getListNameCallback)
	{
		listItem.firstChild.innerHTML = getListNameCallback(listItem.firstChild.innerHTML, tasksCount);
	}

	cache[listID] = tasksCount;
};

ListTabs.prototype.hideDisabledLists = function(listItems)
{
	var listItems = this.RTM_listTabs.div.getElementsByTagName("li");
	for (var i = 0; i < this.RTM_listTabs.data.length; ++i)
	{
		if (listItems[i] && this.RTM_listTabs.data[i] && this.parent.configuration.isListHidden(this.RTM_listTabs.data[i][1]))
		{
			listItems[i].style.display = "none";
		}
	}
}

ListTabs.prototype.blitDiv = function()
{
	if (window.view.entries[window.view.selected][0] === "Tasks")
	{
		if (this.configuration.getDisplayTabsToTheLeft())
		{
			this.RTM_listTabs.div.firstChild.style.listStyle = "none";
			this.RTM_listTabs.div.firstChild.style.padding = "0px 5px 0px 5px";
			this.RTM_listTabs.div.firstChild.style.whiteSpace = "nowrap";

			var listItems = this.RTM_listTabs.div.getElementsByTagName("li");
			for (var i = 0; i < this.RTM_listTabs.data.length; ++i)
			{
				if (!this.RTM_listTabs.data[i][2])
				{
					listItems[i].firstChild.style.color = "black";
				}
			}
		}

		this.hideDisabledLists();

		if (this.configuration.getShowTasksCount() === true)
		{
			this.showTasksCount();
		}

		if (!this.blitted && this.listAdder)
		{
			this.div.insertBefore(this.listAdder.div, this.div.firstChild);
		}
	}
};

ListTabs.prototype.selectNextList = function()
{
	if (this.RTM_listTabs)
	{
		this.RTM_listTabs.selectRight();
	}
};

ListTabs.prototype.selectPreviousList = function()
{
	if (this.RTM_listTabs)
	{
		this.RTM_listTabs.selectLeft();
	}
};

ListTabs.prototype.selectListByName = function(text)
{
	if (!this.RTM_listTabs || !this.RTM_listTabs.entries)
	{
		return;
	}

	for (var i = 0; i < this.RTM_listTabs.entries.length; ++i)
	{
		if (this.RTM_listTabs.entries[i].toLowerCase() == text.toLowerCase())
		{
			this.RTM_listTabs.selectTabByPosition(i);
		}
	}
};

ListTabs.prototype.selectListByID = function(listID)
{
	if (this.RTM_listTabs && listID)
	{
		this.RTM_listTabs.selectTabByData(listID);
	}
};

ListTabs.prototype.moveSelectedTasksToListByName = function(text)
{
	if (!this.RTM_listTabs || !this.RTM_listTabs.entries || !this.RTM_control)
	{
		return;
	}

	for (var i = 0; i < window.listTabs.entries.length; ++i)
	{
		if (this.RTM_listTabs.entries[i].toLowerCase() == text.toLowerCase())
		{
			this.RTM_control.tasksSelectionChanged("", ["", "tasks.moveTo." + window.listTabs.data[i][1]]);
		}
	}
};

ListTabs.prototype.overrideSelectLeft = function()
{
	var that = this;
	if (this.RTM_listTabs)
	{
		this.RTM_listTabs.selectLeft = function()
		{
			var position = this.selected - 1; 

			while (true)
			{
				if (position >= 0)
				{
					if (!that.parent.configuration.isListHidden(this.data[position][1]))
					{
						break;
					}

					--position;
				}
				else
				{
					position = this.entries.length - 1;
				}
			}

			this.selectTabByPosition(position);
		};	
	}
};

ListTabs.prototype.overrideSelectRight = function()
{
	var that = this;
	if (this.RTM_listTabs)
	{
		this.RTM_listTabs.selectRight = function()
		{
			var position = this.selected + 1; 

			while (true)
			{
				if (position < this.entries.length)
				{
					if (!that.parent.configuration.isListHidden(this.data[position][1]))
					{
						break;
					}

					++position;
				}
				else
				{
					position = 0;
				}
			}

			this.selectTabByPosition(position);
		};	
	}
};

ListTabs.prototype.getSelectedListID = function()
{
	return this.RTM_listTabs.data[this.RTM_listTabs.selected][1];
}

//endregion

//region Shortcut

function Shortcut(key, owner, method, ctrlKey, shiftKey, altKey)
{
	this.key = key;
	this.owner = owner;
	this.method = method;
	this.ctrlKey = ctrlKey;
	this.shiftKey = shiftKey;
	this.altKey = altKey;
}

Shortcut.prototype.run = function()
{
	if (this.method)
	{
		if (this.owner)
		{
			this.method.call(this.owner);	
		}
		else
		{
			this.method();
		}
	}
};

//endregion

//region TaskList

function TaskList(parent)
{
	this.parent = parent;
	this.RTM_taskList = window.taskList;
	this.RTM_control = window.control;

	var that = this;
	var handleSelectFinished = function()
	{
		that.parent.utility.location.setTaskID(that.getSelectedTaskID());
	};

   	window.messageBus.subscribe(handleSelectFinished, window.taskList.list.getUniqueMessageBusName() + "selectFinished");

}

TaskList.prototype.getSelectedTaskID = function()
{
	if (this.RTM_taskList)
	{
		var selectedTasks = this.RTM_taskList.getViewList().getSelected();

		if (selectedTasks && selectedTasks.length > 0)
		{
			return selectedTasks[selectedTasks.length - 1];
		}
	}

	return null;
};

TaskList.prototype.selectTaskByID = function(taskID)
{
	if (this.RTM_control)
	{
		this.RTM_control.showTaskById(taskID);
	}
};

//endregion

//region ListList

function ListList(configuration)
{
	this.configuration = configuration;
	this.RTM_listList = window.listList;
	this.RTM_utility = window.utility;
	this.RTM_stateMgr = window.stateMgr;
	this._overrideListListUpdateEntry();
}

ListList.prototype._overrideListListUpdateEntry = function()
{
	if (this.RTM_listList)
	{
		var oldListListUpdateEntry = this.RTM_listList.list.updateEntry;
		var that = this;

		this.RTM_listList.list.updateEntry = function(entry, D)
		{
			oldListListUpdateEntry.call(that.RTM_listList.list, entry, D);

			var index = that.RTM_listList.list.map[entry[0]];
			var row = that.RTM_listList.list.table.rows[index];

			row.entry = entry;
			row.rowText.innerHTML = "<div id='listName_" + entry[0] + "' style='float: left;'>" + entry[1] + "</div><div style='align: right; float: right;'><a href=\"# \" id='displayListLink_" + entry[0] + "'></a></div>";

			var displayListLink = document.getElementById('displayListLink_' + entry[0]);
			var listName = document.getElementById('listName_' + entry[0]);

			var listClickHandler = function(event)
			{
				if (that.configuration.isListHidden(entry[0]))
				{
					that.makeListVisible(entry);
				}
				else
				{
					that.makeListHidden(entry);
				}

				if (that.RTM_utility)
				{
					that.RTM_utility.stopEvent(event);
				}
			};

			displayListLink.addEventListener('click', listClickHandler, false);

			if (!that.isListArchived(entry[0]))
			{
				if (that.configuration.isListHidden(entry[0]))
				{
					displayListLink.innerHTML = "show";
					listName.style.color = "#cacaca";
				}
				else
				{
					displayListLink.innerHTML = "hide";
					listName.style.color = "";
				}
			}
		};

		this.RTM_listList.doStyles();
	}
};

ListList.prototype.isListArchived = function(listID)
{
	if (this.RTM_stateMgr.lists[listID] && this.RTM_stateMgr.lists[listID].archived)
	{
		return true;
	}

	return false;
};

ListList.prototype.makeListHidden = function(listEntry)
{
	this.configuration.makeListHidden(listEntry);
	this.RTM_listList.list.updateEntry(listEntry);
};

ListList.prototype.makeListVisible = function(listEntry)
{
	this.configuration.makeListVisible(listEntry);
	this.RTM_listList.list.updateEntry(listEntry);
};

//endregion

//region Settings

function Settings(configuration)
{
	this.mbn = this.getUniqueMessageBusName();
	this.configuration = configuration;
	this.div = document.createElement("div");

	var generalSettings = document.getElementById("general");
	if (generalSettings)
	{
		generalSettings.parentNode.appendChild(this.div);
	}

	this.div.style.display = "none";
	this.div.innerHTML = '<div style="padding: 12px 25px 21px;" class="contentboxwrap"><form id="abitbetterrtmform" autocomplete="off"><table style="width: 100%;"><tr><td class="label"><label>Tasks count</label></td><td class="field" colspan="2"><span><input id="abbrtm_taskscount_on" name="showtaskscount" type="radio" /><label for="abbrtm_taskscount_on" style="font-weight: normal;">On</label></span><span style="padding-left: 9px;"><input id="abbrtm_taskscount_off" name="showtaskscount" type="radio" /><label for="abbrtm_taskscount_off" style="font-weight: normal;">Off</label></span></td></tr><tr><td class="label"><label>Tabs on the left</label></td><td class="field" colspan="2"><span><input id="abbrtm_tabsontheleft_on" name="abbrtm_tabsontheleft" type="radio" /><label for="abbrtm_tabsontheleft_on" style="font-weight: normal;">On</label></span><span style="padding-left: 9px;"><input id="abbrtm_tabsontheleft_off" name="abbrtm_tabsontheleft" type="radio" /><label for="abbrtm_tabstotheleft_off" style="font-weight: normal;">Off</label></span></td></tr><tr><td class="label"><label>Quick add list</label></td><td class="field" colspan="2"><span><input id="abbrtm_quickaddlist_on" name="abbrtm_quickaddlist" style="font-weight: normal;" type="radio">On</label></span><span style="padding-left: 9px;"><input id="abbrtm_quickaddlist_off" name="abbrtm_quickaddlist" type="radio" /><label for="abbrtm_quickaddlist_off" style="font-weight: normal;">Off</label></span></td></tr><tr><td class="label"><label>Unique URL for list/task</label></td><td class="field" colspan="2"><span><input id="abbrtm_uniqueurl_on" name="abbrtm_uniqueurl" style="font-weight: normal;" type="radio">On</label></span><span style="padding-left: 9px;"><input id="abbrtm_uniqueurl_off" name="abbrtm_uniqueurl" type="radio" /><label for="abbrtm_uniqueurl_off" style="font-weight: normal;">Off</label></span></td></tr><tr><td class="hiddenlabel"><label for="settingssubmit">Save Changes</label></td><td class="field" colspan="2"><input id="abbrtm_settingssubmit" name="settingssave" type="button" value="Save Changes" /><label for="settingscancel" style="display: none;">Cancel</label><input id="abbrtm_settingscancel" name="settingscancel" type="button" value="Cancel" /></td></tr></table></form></div>';

	this.tasksCount_on = document.getElementById("abbrtm_taskscount_on");
	this.tasksCount_off = document.getElementById("abbrtm_taskscount_off");
	this.tabsOnTheLeft_on = document.getElementById("abbrtm_tabsontheleft_on");
	this.tabsOnTheLeft_off = document.getElementById("abbrtm_tabsontheleft_off");
	this.quickAddList_on = document.getElementById("abbrtm_quickaddlist_on");
	this.quickAddList_off = document.getElementById("abbrtm_quickaddlist_off");
	this.uniqueURL_on = document.getElementById("abbrtm_uniqueurl_on");
	this.uniqueURL_off = document.getElementById("abbrtm_uniqueurl_off");
	this.settingsSave = document.getElementById("abbrtm_settingssubmit");
	this.settingsCancel = document.getElementById("abbrtm_settingscancel");
	this.settingsSave.disabled = true;
	this.settingsCancel.disabled = true;

	this.loadSettings();

	var that = this;
	var optionClickHandler = function()
	{
		that.settingsSave.disabled = false;
		that.settingsCancel.disabled = false;
	}

	var cancelClickHandler = function(event)
	{
		that.loadSettings();
		that.settingsSave.disabled = true;
		that.settingsCancel.disabled = true;
		return false;
	}

	var saveClickHandler = function()
	{
		that.saveSettings();
		that.settingsSave.disabled = true;
		that.settingsCancel.disabled = true;
		
		location.reload(true);
	}

	this.tasksCount_on.addEventListener("click", optionClickHandler, false);
	this.tasksCount_off.addEventListener("click", optionClickHandler, false);
	this.tabsOnTheLeft_on.addEventListener("click", optionClickHandler, false);
	this.tabsOnTheLeft_off.addEventListener("click", optionClickHandler, false);
	this.quickAddList_on.addEventListener("click", optionClickHandler, false);
	this.quickAddList_off.addEventListener("click", optionClickHandler, false);
	this.uniqueURL_on.addEventListener("click", optionClickHandler, false);
	this.uniqueURL_off.addEventListener("click", optionClickHandler, false);
	this.settingsCancel.addEventListener("click", cancelClickHandler, false);;
	this.settingsSave.addEventListener("click", saveClickHandler, false);;
}

Settings.prototype.getUniqueMessageBusName = function()
{
	return "abitbetterrtm.settings.";
}

Settings.prototype.loadSettings = function()
{
	if (this.configuration.getShowTasksCount() === true)
	{
		this.tasksCount_on.checked = 'true';
	}
	else
	{
		this.tasksCount_off.checked = 'true';
	}

	if (this.configuration.getDisplayTabsToTheLeft() === true)
	{
		this.tabsOnTheLeft_on.checked = 'true';
	}
	else
	{
		this.tabsOnTheLeft_off.checked = 'true';
	}

	if (this.configuration.getQuickAddList() === true)
	{
		this.quickAddList_on.checked = 'true';
	}
	else
	{
		this.quickAddList_off.checked = 'true';
	}

	if (this.configuration.getUniqueURLForListAndTask() === true)
	{
		this.uniqueURL_on.checked = 'true';
	}
	else
	{
		this.uniqueURL_off.checked = 'true';
	}
}

Settings.prototype.saveSettings = function()
{
	this.configuration.setShowTasksCount(this.tasksCount_on.checked);
	this.configuration.setDisplayTabsToTheLeft(this.tabsOnTheLeft_on.checked);
	this.configuration.setQuickAddList(this.quickAddList_on.checked && this.tabsOnTheLeft_on.checked);
	this.configuration.setUniqueURLForListAndTask(this.uniqueURL_on.checked);
}

Settings.prototype.hide = function()
{
	this.div.style.display = "none";
}

Settings.prototype.show = function()
{
	this.div.style.display = "";
}

//endregion

//region ABitBetterRTM

function ABitBetterRTM()
{
	this.configuration = new Configuration();
	this.utility = new Utility(this.configuration);
	this.settings = new Settings(this.configuration);
	this.taskList = new TaskList(this);
	this.listList = new ListList(this.configuration);
	this.listTabs = new ListTabs(this, this.configuration);

	if (this.configuration.getDisplayTabsToTheLeft())
	{
		this.leftColumn = new LeftColumn(this.configuration);
		this.leftColumn.hide();
		this.leftColumn.appendChild(new Frame('listTabsFrame'));
		this.leftColumn.children[0].appendChild(this.listTabs);
	}

	if (window.view.entries[window.view.selected][0] === "Tasks")
	{
		if (this.configuration.getDisplayTabsToTheLeft())
		{
			this.leftColumn.blitDiv();
		}
		else
		{
			this.listTabs.blitDiv();
		}
	}

	this.autocompletes = {};
	this.shortcuts = [];

	this._initAutocompletes();
	this._initShortcuts();
	this._overrideBodyKeyPressHandler();

	Utility.addGlobalCssStyle('html { overflow: scroll; overflow-x: auto; }');

    window.settingsTabs.addEntry("A Bit Better RTM");
    window.settingsView.addState("A Bit Better RTM", [this.settings], window.settingsTabs);
	window.settingsTabs.blitDiv();
}

ABitBetterRTM.prototype._initShortcuts = function()
{
	this.shortcuts.push(new Shortcut(74, this.listTabs, this.listTabs.selectNextList, false, true, false));
	this.shortcuts.push(new Shortcut(75, this.listTabs, this.listTabs.selectPreviousList, false, true, false));
	this.shortcuts.push(new Shortcut(103, this.autocompletes.goTo, this.autocompletes.goTo.show, true, false, false));
	this.shortcuts.push(new Shortcut(109, this.autocompletes.moveTo, this.autocompletes.moveTo.show, true, false, false));

	if (this.configuration.getDisplayTabsToTheLeft() && this.configuration.getQuickAddList())
	{
		this.shortcuts.push(new Shortcut(113, this.listTabs.listAdder, this.listTabs.listAdder.showListEntryBox, false, false, false));
	}
};

ABitBetterRTM.prototype._initAutocompletes = function()
{
	this.autocompletes.goTo = new Autocomplete("GO TO: ", new ListAutocompleteStore(this.listTabs), this.listTabs, this.listTabs.selectListByName);
	this.autocompletes.moveTo = new Autocomplete("MOVE TO: ", new ListAutocompleteStore(this.listTabs), this.listTabs, this.listTabs.moveSelectedTasksToListByName);
}

ABitBetterRTM.prototype._overrideBodyKeyPressHandler = function()
{
	var that = this;
	var handleKeyPressEvent = function(ev, ignoreCombo)
	{
		if (!ev)
		{
			ev = window.event;
		}

		if (ev === null)
		{
			return;
		}

		var target = null;
		
		if (window.utility)
		{
			target = window.utility.getEventTarget(ev);
		}

		if (target === null) 
		{
			return true;
		}

		var pressed = (ev.charCode) ? ev.charCode: ((ev.which) ? ev.which: ev.keyCode);

		if (target !== null && target.type !== null && target.type !== undefined && (target.type == "textarea" || target.type == "input" || target.type.indexOf("select") === 0 || target.type == "button" || target.type === "submit" || target.type == "text" || target.type == "password" || (target.id !== null && target.id == "map"))) 
		{
			return true;
		}

		var tabs = null;

		if (window.view)
		{
			tabs = window.view.getViewTabs();
		}

		if (tabs)
		{
			for (var i = 0; i < that.shortcuts.length; ++i)
			{
				if ((that.shortcuts[i].key === pressed) && (that.shortcuts[i].ctrlKey === ev.ctrlKey) && (that.shortcuts[i].shiftKey === ev.shiftKey) && (that.shortcuts[i].altKey === ev.altKey) && (ev.metaKey === false))
				{
					that.shortcuts[i].run();

					if (window.utility)
					{
						window.utility.stopEvent(ev);
					}

					return false;
				}
			}
		}

		return true;
	}

	if (window.eventMgr)
	{
		var oldBodyKeyPressHandler = window.eventMgr.bodyKeyPressHandler;

		window.eventMgr.bodyKeyPressHandler = function(ev, ignoreCombo)
		{
			if (handleKeyPressEvent(ev, ignoreCombo))
			{
				return oldBodyKeyPressHandler.call(window.eventMgr, ev, ignoreCombo);
			}

			return true;
		};	
	}
}

//endregion

