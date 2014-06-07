// ==UserScript==
// @name           Facebook - Automatically Accept All Kingdoms of Camelot Gifts
// @version        0.1
// @namespace      KOCQuickWidgets-AutoAcceptGifts
// @homepage       http://userscripts.org/
// @description    This script will automatically accept all of your Kingdoms of Camelot gifts in your Facebook Game Requests. Works even if you play on multiple domains!

// @include        *kingdomsofcamelot.com/fb/e2/src/claimGift_src.php*
// @include        *kingdomsofcamelot.com/fb/e2/src/claimDailyGift_src.php*

// @require        http://sizzlemctwizzle.com/updater.php?id=92054
// ==/UserScript==


String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }
String.prototype.StripQuotes = function() {
	return this.replace(/"/g,'');
};

if(!this.JSON2){JSON2={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON2.stringify!=='function'){JSON2.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON2.parse!=='function'){JSON2.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}})();

if(!this.GM_log) {
	GM_log=function(m) {
		console.log(m);
	}
	GM_registerMenuCommand=function(text,f) {
	}
	
}

if(!this.unsafeWindow) {
//~~~ need helper to return values?
	unsafeWindow={};
}

function AddScript(script){
    var a = document.createElement('script');
    a.innerHTML = script;
    document.getElementsByTagName('head')[0].appendChild(a);
    return;
}

function inspect(obj, maxLevels, level){
  var str = '', type, msg;

    // Start Input Validations
    // Don't touch, we start iterating at level zero
    if(level == null)  level = 0;

    // At least you want to show the first level
    if(maxLevels == null) maxLevels = 1;
    if(maxLevels < 1)     
        return '<font color="red">Error: Levels number must be > 0</font>';

    // We start with a non null object
    if(obj == null)
    return '<font color="red">Error: Object <b>NULL</b></font>';
    // End Input Validations

    // Each Iteration must be indented
    str += '<ul>';

    // Start iterations for all objects in obj
    for(property in obj)
    {
      try
      {
          // Show "property" and "type property"
          type =  typeof(obj[property]);
          str += '<li>(' + type + ') ' + property + 
                 ( (obj[property]==null)?(': <b>null</b>'):(': '+obj[property])) + '</li>';

          // We keep iterating if this property is an Object, non null
          // and we are inside the required number of levels
          if((type == 'object') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1);
      }
      catch(err)
      {
        // Is there some properties in obj we can't access? Print it red.
        if(typeof(err) == 'string') msg = err;
        else if(err.message)        msg = err.message;
        else if(err.description)    msg = err.description;
        else                        msg = 'Unknown';

        str += '<li><font color="red">(Error) ' + property + ': ' + msg +'</font></li>';
      }
    }

      // Close indent
      str += '</ul>';

    return str;
}


var nHtml={
	FindByXPath:function(obj,xpath,nodetype) {
		if(!nodetype){
			nodetype = XPathResult.FIRST_ORDERED_NODE_TYPE;
		}
		try {
			var q=document.evaluate(xpath,obj,null,nodetype,null);
		} catch(e) {
			GM_log('bad xpath:'+xpath);
		}
		if(nodetype == XPathResult.FIRST_ORDERED_NODE_TYPE){
			if(q && q.singleNodeValue) { return q.singleNodeValue; }
		}else{
			if(q){
				return q;
			}
		}
		return null;
	},
	ClickWin:function(win,obj,evtName) {
		var evt = win.document.createEvent("MouseEvents");
		evt.initMouseEvent(evtName, true, true, win,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		return !obj.dispatchEvent(evt);
	},
	Click:function(obj) {
		return this.ClickWin(window,obj,'click');
	},
	ClickTimeout:function(obj,millisec) {
		window.setTimeout(function() {
			return nHtml.ClickWin(window,obj,'click');
		},millisec+Math.floor(Math.random()*500));
	},

	SetSelect:function(obj,v) {
		for(var o=0; o<obj.options.length; o++) {
			if(v==obj.options[o].value) { obj.options[o].selected=true; return true; }
		}
		return false;
}

};

function ById(id) {
	return document.getElementById(id);
}

function ByName(name) {
	return document.getElementsByName(name);
}

function AddText(box1,txt) {
	var txtObj;
	box1.appendChild(txtObj=document.createTextNode(txt));
	return txtObj;
}

function AddHtml(box1,txt) {
	var txtObj;
	var sp=document.createElement('span');
	sp.innerHTML=txt;
	box1.appendChild(sp);
	return txtObj;
}


var KOCAutoAcceptGifts={
	startListenTime:null,
	options:null,
	isChrome:navigator.userAgent.toLowerCase().indexOf('chrome') > -1,

	DoUnsafeWindow:function(func, execute_by_embed) {
		if(this.isChrome || execute_by_embed) {
			var scr=document.createElement('script');
			scr.innerHTML=func;
			document.body.appendChild(scr);
		} else {
			eval("unsafeWindow."+func);
		}
	},

	Log:function(str) {
		GM_log(str);
	},

	GetValue:function(name,default_val) {
		return GM_getValue(name,default_val);
	},

	SetValue:function(name,val) {
		if(val==null || val==undefined) {
			GM_deleteValue(name);
		}else{
			return GM_setValue(name,val);
		}
	},
	
	ListValues:function() {
		return GM_listValues();
	},

	ClearOptions:function() {
		this.SetValue('Options',JSON.stringify({}));
	},
	
	GetOptions:function() {
		var json=this.GetValue('Options','{}');
		if(json=='') json='{}';
		var options=JSON2.parse(json);
		var defOptions={
			"number_example":15,
			"booleanval_example":true,
			"string_example":"sdfsdfds",
			"array_example":[1,1,1,1,1,1,1,1,1,1]
		};
		for(var n in defOptions) {
			if(options[n]!=undefined) { continue; }
			options[n]=defOptions[n];
		}
		return options;
	},
	
	SetOptions:function(v) {
		this.SetValue('Options',JSON2.stringify(v));
	},

	FactoryReset:function() {
		var stored_values=this.ListValues();
		for(var n=0; n<stored_values.length; n++) {
			GM_deleteValue(stored_values[n],null);
		}
		this.SetOptions({});
	},


	pageLoaded:false,
	giftAccepted:false,
	Listen:function() {
		var t=this;

		this.options=this.GetOptions();
		this.startListenTime=new Date();

		var domTickTimer=null;
		var domTickUpto=0;
		var domTick=function(e) {
		
			if(!t.giftAccepted) {
				// Find the gift claiming container div
				var claim_gift = ById('claimgift');
				if(claim_gift){
					// Look for the select drop-down
					var domain_selector = ById('serverid');
					// Look for the next button
					var next_button1 = nHtml.FindByXPath(claim_gift,".//a[contains(@onclick,'checkServer')]");
					var next_button2 = nHtml.FindByXPath(claim_gift,".//a[@class='nextbtn']");
					if(domain_selector && (next_button1 || next_button2)){
						for(var i=0; i<domain_selector.options.length; i++){
							if(domain_selector.options[i].value == "212"){
								domain_selector.selectedIndex = i;
								if(next_button1){
									nHtml.Click(next_button1);
								}else{
									nHtml.Click(next_button2);
								}
								t.giftAccepted=true;
								t.Log("Gift accepted!");
								break;
							}
						}
					}
				}
			}

			if(!domTickTimer) {
				domTickTimer=window.setTimeout(function() {
					domTickTimer=null;
					domTick();
					domTickUpto++;
				},250);
			}
		};

		domTick();
	}

};

KOCAutoAcceptGifts.Listen();


