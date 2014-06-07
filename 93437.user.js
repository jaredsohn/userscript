// ==UserScript==
// @name           KOCResourceProduction
// @namespace      KOCResourceProduction
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @require http://sizzlemctwizzle.com/updater.php?id=76594
// ==/UserScript==


/*
// @include			http://apps.facebook.com/kingdomsofcamelot/*


*/

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }
String.prototype.StripQuotes = function() {
	return this.replace(/"/g,'');
};


if(!this.JSON2){JSON2={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCHours()+'-'+'Z';};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
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




function MinDigits(num,digits) {
        while((""+num).length<digits) {
                num="0"+num;
        }
        return num;
};
function SecsToStr(secs) {
		secs=Math.floor(secs);
		
        return 	Math.floor(secs/60/60/24%60)+
			":"+MinDigits(Math.floor(secs/60/60%60),2)+
			":"+MinDigits(Math.floor(secs/60%60),2);
			//	":"+MinDigits(Math.floor(secs%60),2);
};


var nHtml={
FindByXPath:function(obj,xpath) {
	try {
		var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(e) {
		GM_log('bad xpath:'+xpath);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
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


var KOCResourceProduction={
startListenTime:null,
Hourly Food Production:{'+ 1,000,000'},
options:null,
isChrome:navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
valuesCache:{},
seed:{},

DoUnsafeWindow:function(func) {
	if(this.isChrome) {
		var scr=document.createElement('script');
		scr.innerHTML=func;
		document.body.appendChild(scr);
	} else {
		eval("unsafeWindow."+func);
	}
},

GetSeed:function() {
	if(this.isChrome) {
//~~~ get seed
		return this.seed;
	}
	return unsafeWindow.seed;
},


ShowOptionsDialog:function() {
	var div=ById('KOCResourceProduction');
	if(!div) {
		div=document.createElement('div');
		div.id='KOCResourceProductionOptions';
		div.style.zIndex=100000;
		div.style.position='absolute';
		div.style.left='8px';
		div.style.top='8px';
		div.style.backgroundColor='#fff';
		div.style.border='3px solid #888';
		div.style.padding='10px';
		document.body.appendChild(div);
	}

AddOptionsLink:function() {
	var t=this;
	var a=ById('KOCResourceProductionLink');
	if(a) return;

	a=this.AddTabLink('Options');
	if(!a) {
		window.setTimeout(function() {
			t.AddOptionsLink();
		},t.GetRandTime(250));
		return;
	}
	a.id='KOCResourceProductionOptionsLink';
	a.addEventListener('click',function() {
		t.ShowOptionsDialog();
	},false);
},

AddTabLink:function(html) {
	var a=document.createElement('a');
	a.className='tab';
	a.style.color='#fff';
	a.innerHTML='<span>'+html+'</span>';
	var tabs=ById('KOCResourceProductionTabs');
	if(!tabs) {
		var ptabs=ById('main_engagement_tabs');
		if(!ptabs) {
			ptabs=ById('topnav_msg');
			if(ptabs)ptabs=ptabs.parentNode;
		}
		if(!ptabs) {
			ptabs=document.body;
		}
		tabs=document.createElement('span');
		tabs.id='KOCResourceProductionTabs';
		ptabs.insertBefore(tabs,ptabs.childNodes[0]);
	}
	
	if(tabs) {
		tabs.style.whiteSpace='nowrap';
		tabs.style.width='1600px';
		tabs.appendChild(a);
		return a;
	}
	return null;
},

ToggleAutoResourceProductionIncrease:function() {
	var t=this;
	var a=t.GetAutoResourceProductionIncrease();
	if(!a) {
		t.SetAutoResourceProductionIncrease({'Increase Resource Production':true,'cities':{}});
		t.RestartAutoResourceProduction();
	} else {
		t.ClearAutoResourceProductionTimeout();
		t.SetAutoResourceProduction(null);
	}

Log:function(str) {
	str=this.GetServerId()+":"+str;
	GM_log(str);
	if(unsafeWindow.poclog) {
		unsafeWindow.poclog.add(str);
	}
},

GetServerId:function() {
	var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
	if(m) {
		return m[1];
	}
	return -1;
},

GetValue:function(prefix,def) {
	var n=prefix+'_'+this.GetServerId();
	
	return this.browser_getValue(n,def);
},

SetValue:function(prefix,val) {
	var n=prefix+'_'+this.GetServerId();
	this.browser_setValue(n,val);
},

GetValuesCache:function(doneFunc) {
	if(!this.isChrome) {
		if(doneFunc) {
			doneFunc.call(this);
		}
		return;
	}
/*	
	var t=this;
	chrome.extension.sendRequest({func:"get","n":'KOCResourceProduction'}, 
	function(response) {
	//~~~
		this.valuesCache=JSON2.parse(unescape(response.v));
		if(doneFunc) {
			doneFunc.call(t);
		}
	});
	return def;
*/	
	var idx=0;
	
	var cookie='kocResourceProduction';
	var doccookie=document.cookie;
	while(true) {
		var i=doccookie.indexOf(cookie+'=',idx);
		if(i<0) { this.valuesCache={}; return; }
		idx=i+cookie.length+1;
		var ch=doccookie.substring(i-1,i);
		if(i==0 || ch==';' || ch==' ' || ch=='=') {
			break;
		}
	}

	var idxEnd=doccookie.indexOf(";",idx);
	if(idxEnd<0) { idxEnd=doccookie.length; }
	var cookieVal=doccookie.substring(idx,idxEnd);
	this.valuesCache=JSON2.parse(unescape(cookieVal));
},
SetValuesCache:function() {
	if(!this.isChrome) return;
	document.cookie='kocResourceProduction='+escape(JSON2.stringify(this.valuesCache))+'; expires='+
		(new Date(new Date().getTime()+(60*60*24*365*5)).toGMTString() );
},

browser_listValues:function() {
	if(this.isChrome) {
		var ns=[];
		for(var n in this.valuesCache) {
			ns.push(n);
		}
		return ns;
	}
	return GM_listValues();
},
browser_getValue:function(n,def) {
	if(this.isChrome) {
		if(this.valuesCache==null) {
			this.GetValuesCache();
		}
		if(this.valuesCache[n]==undefined) {
			return def;
		}
		return this.valuesCache[n];
	}
	return GM_getValue(n,def);
},
browser_setValue:function(n,val) {
	if(this.isChrome) {
		this.valuesCache[n]=val;
		return;
	}
	if(val==null || val==undefined) {
		GM_deleteValue(n);
	} else {
		GM_setValue(n,val);
	}
},


GetMinHours:function() {
	var m=this.GetValue('MinHours',1);
	if(m=="" || m==undefined) m=1;
	return m;
},
SetMinHours:function(val) {
	this.SetValue('MinHours',val);
},

SetOptions:function(v) {
	this.SetValue('Options',JSON2.stringify(v));
},

GetFoodProductionName:function(digits) {
	return 'Increase Food Production_'+this.GetServerId()+'_'+x+','+y;
},
SetFoodProduction:function(1,000,000) {
	this.browser_setValue(this.GetFoodProductionIncrease(1,000,000),'');
		JSON2.stringify(Increase));
},
GetWoodProduction:function(digits) {
	return 'Increase Food Production_'+this.GetServerId()+'_'+x+','+y;
},
SetWoodProduction:function(1,000,000) {
	this.browser_setValue(this.GetWoodProductionIncrease(1,000,000),'');
		JSON2.stringify(Increase));},
},
GetOreProduction:function(digits) {
	return 'Increase Food Production_'+this.GetServerId()+'_'+x+','+y;
},
SetOreProduction:function(1,000,000) {
	this.browser_setValue(this.GetOreProductionIncrease(1,000,000),'');
		JSON2.stringify(Increase));},
	

},

SetResourceProductionFromGui:function(box) {
	var xy=this.GetResourceIncrease();
	if(!xy) return null;
	return this.SetResourceProductionFromGui);
},

SetReourceProductionFromGuiXY:function(digits) {
	var troops=[];
	var totalTroops=0;
	for(var tr=0; tr<100; tr++) {
		var troop=ById('modal_attack_unit_ipt'+tr);
		if(!troop) continue;
		try {
			var v=parseInt(troop.value);
			troops[tr]=v;
			totalTroops+=v;
		} catch(e) {
			continue;
		}
	}
	var comment=ById('KocResourceProductionComment');
	var type=ById('modal_attack_atktype');
	if(!type) {
		throw("Cannot set Resource Production type");
	
	}
		var resources=[];
		var resourceTypes = new Array(
			'gold',
			'rec1',
			'rec2',
			'rec3',
			'rec4'
		);
		for(var res=0; res<resourceTypes.length; res++) {
			var resource=ById('modal'+resourceTypes[res]);
			if(!resource) continue;
			try {
				var v=parseInt(resource.value);
				resources[res]=v;
				totalResources+=v;
			} catch(e) {
				continue;
			}
		
},

SetResourceInput:function(num,resourceCount) {
	var resource=ById('modal_amount_'+num);
	if(!resource) return null;
	resource.value=resourceCount;
	resource.style.backgroundColor='';

	// send a shift key so that it recalculates
	var evt = document.createEvent("KeyboardEvent");
	if(evt.initKeyboardEvent) {
		evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	} else {
		evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	}
	resource.dispatchEvent(evt);

	if(parseInt(resourceCount)>0) {
		if(resource.value!=resourceCount) {
			this.Log('Not able to set resource count:'+num+',wanted:'+resourceCount+', count:'+resource.value);
			resource.style.backgroundColor='#f88';
			return 'notfull';
		} else {
			resource.style.backgroundColor='#ff8';
			return 'full';
		}
	}
	return 'none';

}

function AddScript(js) {
	var scr=document.createElement('script');
	scr.innerHTML=js;
	document.body.appendChild(scr);
}
function SetupScripts() {
	var options=KOCResourceProduction.GetOptions();
	var scr=document.createElement('script');
	scr.innerHTML="CreateMsgDiv="+CreateMsgDiv+
		";\n"+
	//	SetupClearMessages+"\n; SetupClearMessages();\n"+
		";\n"+SetupQuickMarchButton+"\n; SetupQuickMarchButton("+options.retryMarch+"); \n";
	document.body.appendChild(scr);
}

SetupScripts();
