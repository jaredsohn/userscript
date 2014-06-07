// ==UserScript==
// @name          KOC Tuti Monkey
// @namespace     http://piom.bi
// @description   Kingdoms Of Camelot Tuti helper
// @include       http://*.kingdomsofcamelot.com/*main_src.php*
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

function ById(id) {
	return document.getElementById(id);
}
//2 parametros antes de "City" (largo = uid, corto = cid)

var KOCTutiHelper={
	isChrome:navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
	players:{
		federicocp:[5231985,47651],
		_escorpion:[4808179,19819],
		karroniero:[5164159,67856],
		oscar30b63:[5053418,65741],
		carabonita1969:[5028768,66072],
		diegobyt007:[5215963,43011],
		arielara:[5477963,66987],
		viviananunc:[5132346,24677],
		vangadora1:[3272043,68106],
		olivia22:[5345287,64338],
		zygor:[5164159,66700],
		hades:[5062340,65685]
	},
	GetSeed:function()
	{
		if(this.isChrome) {
			//~~~ get seed
			return this.seed;
		}
		return unsafeWindow.seed;
	},
	GetCurrentCityId:function()
	{
		if(!unsafeWindow.currentcityid) return null;
		return unsafeWindow.currentcityid;
	},		
		
	GetPlayerProps:function()
	{
		var username = this.GetSeed().player.name;
		console.log("username:"+username);
		var out = this.players[username.toLowerCase()];
		
		if(!out)
		{
			alert('Atencion! El jugador "'+username+'" no esta habilitado para tutiar!');
		}
		return out;
	},
		
	CheckTutiLinks:function() {
		var links = [];
		this.IterateMsgReports(function(a,tr,desc,x,y) {
			var onclick=a.getAttribute('onclick');
			if(!onclick) return false;
			onclick=onclick.trim().StripQuotes();
			
			//console.log("tuti link: "+onclick);
			//Messages.viewMarchReport("19563326",1,51,4,0,"Enemy","0","federicocp","M",4,328,615,1301709716,1,307,606);return false; //BARBARIAN
			//Messages.viewMarchReport("19595798",1,51,9,5208417,"Lord_Skopeos","M","federicocp","M",4,290,552,1301703927,1,307,606);return false; //CITY
			
			//onclick.split('Messages.viewMarchReport(').join('');
			var enabled = false 
			var inps=tr.getElementsByTagName('input');
			if(inps.length>=1) {
				enabled = (inps[0].checked == true);
			}
			if(enabled == true)
			{
				var params = onclick.split(',');
				links.push({mid:params[0].substr(params[0].indexOf('(')+1, params[0].length), eid:params[3], ename:params[4], uname:params[6]})
			}
			return true;
		});
		if(links.length > 0)
		{
			//var msg = JSON2.stringify(links);
			//console.log(msg);
			var html = "";
			var p = this.GetPlayerProps();
			
			for(var i = 0; i<links.length; i++)
			{
				var link = links[i];
				var url = 'http://apps.facebook.com/kingdomsofcamelot/?page=helpfriendtroops&tid=6&side=1&si=112';
				url += '&in=' + p[0] + '&sid=' + p[0];
				url += '&mid=' + link.mid;
				url += '&cid=' + p[1];		
				url += '&s=' + this.GetServerId();
				
				html += '<p><a href="'+url+'">'+url+'</a>' + '</p>';
			}
			
			ById('modal_msg_reports_tutidiv').innerHTML = html;
		}
	},
		
	AddTutiLinks:function() {
		console.log("addTutiLinks");
		//var msgBody=ById('modal_msg_reports');
		var msgBody=ById('modal_msg_reports_tablediv');
		if(!msgBody) return;
		
		var a=document.createElement('a');
		var t=this;
		a.addEventListener('click',function() {
			t.CheckTutiLinks();
		},false);
		a.className='buttonDown20';
		//a.style.paddingLeft='30px';
		a.innerHTML='<span>Tuti Links</span>';
		if(msgBody.nextSibling) {
			msgBody.nextSibling.insertBefore(a,msgBody.nextSibling.childNodes[0]);
			//msgBody.nextSibling.appendChild(a);
		} else {
			msgBody.appendChild(a);
		}
		
		var d = document.createElement('div');
		d.setAttribute('id', 'modal_msg_reports_tutidiv');
		d.setAttribute('style','padding-left:30px;padding-top:10px;');
		msgBody.appendChild(d);		
	},

	Listen:function() {
		var t=this;
		var withinDomInserted=false;
		document.body.addEventListener('DOMNodeInserted',function(e) {
			if(withinDomInserted) return;
	//		var isStatuses=(e.target.className && e.target.className=='statues')?true:false;
	//		if(isStatuses)
	//			t.pageLoaded=true;
			if(e.target.className && e.target.className.indexOf('modal_msg_reports')>=0) {
				withinDomInserted=true;
				setTimeout(function() {
					try {
						t.AddTutiLinks();
					} finally {
						withinDomInserted=false;
					}
				},0);
			}
		},false);
	},	
		
	IterateMsgReports:function(f) {
		return this.IterateReports('modal_msg_reports_tablediv',1,f);
	},

	IterateReports:function(id,colStart,f) {
		//this.RemoveEmptyReportsDivs();
		var msgs=ById(id);
		if(!msgs) return;
		var trs=msgs.getElementsByTagName('tr');
		for(var tUpto=0; tUpto<trs.length; tUpto++) {
			var tr=trs[tUpto];
			var a=nHtml.FindByXPath(tr,".//a[contains(@onclick,'modal_messages_viewreports') or contains(@onclick,'modal_alliance_report_view') or contains(@onclick,'viewMarchReport')]");
			if(!a) continue;
			if(tr.cells.length<(colStart+2)) continue;
			var descCol=tr.cells[colStart+1];
			var dateCol=tr.cells[colStart+0];
			var desc=descCol.textContent;
			var m=this.coordsRe.exec(desc);
			var x=null,y=null;
			if(m) {
				x=m[1]; y=m[2];
			}
			var onclick=a.getAttribute('onclick');
			if(onclick) {
				var m=this.onclickReportRe.exec(onclick);
				if(m) { x=m[11]; y=m[12]; }
			}
			
			if(!f.call(this,a,tr,desc,x,y)) break;
		}
	},	
	/*	
	RemoveEmptyReportsDivs:function() {
		var ss=document.evaluate("./div[@id='modal_msg_reports_tablediv']",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			var div=ss.snapshotItem(s);
			if(div.innerHTML=="") {
				div.parentNode.removeChild(div);
			}
		}
	},
	*/
	//<a onclick="Messages.viewMarchReport('19594293',1,51,9,4767585,'Pelado7387','M','federicocp','M',4,284,475,1301700915,1,284,448);return false;">View Report</a>	
	// target player name, target gender, player name, player gender, ?, target x, target y, report id, 0, x, y
	onclickReportRe:/(["0-9]+),(["0-9]+),(["0-9]+),(["0-9]+),(["0-9]+),("[^"]+"),("[^"]+"),("[^"]+"),("[^"]+"),(["0-9]+),(["0-9]+),(["0-9]+),/,
	coordsRe:/\(([0-9]+),([0-9]+)\)/,
	
	GetServerId:function() {
		var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
		if(!m) m=/s=([0-9]+)/.exec(document.location.search);
		if(m) {
			return m[1];
		}
		return -1;
	},

}

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
}
//startup

var mixpanelRemoved=false;
function DisableMixpanel() {
	if(unsafeWindow.cm) {
		unsafeWindow.cm.MixPanelTracker.track=function() { };
	}
	if(unsafeWindow.MixpanelLib) {
		unsafeWindow.MixpanelLib.prototype={
			register:function() { },
			track:function(t) {
			}
		};
	}
	if(!unsafeWindow.cm || !unsafeWindow.MixpanelLib) {
		window.setTimeout(function() {
			DisableMixpanel();
		},100);
	} else {
		GM_log('Mixpanel removed');
		mixpanelRemoved=true;
	}
}

DisableMixpanel();
unsafeWindow.cm.cheatDetector={detect:function() { }};


var startAllTimeout=null;
function StartAll() {
	var now=new Date().getTime();
	if(startAllTimeout==null) {
		startAllTimeout=now+5000;
	}
	if(mixpanelRemoved || startAllTimeout<now) {
		if(startAllTimeout<now) {
			GM_log("Did not remove mixpanel, starting anyways");
		}
		KOCTutiHelper.Listen();
		console.log(KOCTutiHelper.GetSeed());
		//SetupScripts();
	} else {
		window.setTimeout(function() { StartAll(); },200);
	}
}
/*
function AddScript(js) {
	var scr=document.createElement('script');
	scr.innerHTML=js;
	document.body.appendChild(scr);
}
function SetupScripts() {
	var options=KOCAttack.GetOptions();
	var scr=document.createElement('script');
	scr.innerHTML="CreateMsgDiv="+CreateMsgDiv+
		";\n"+
	//	SetupClearMessages+"\n; SetupClearMessages();\n"+
		";\n"+SetupQuickMarchButton+"\n; SetupQuickMarchButton("+options.retryMarch+"); \n";
	document.body.appendChild(scr);
}
*/

if(location.href.indexOf('apps.facebook.com/kingdomsofcamelot/')>=0) {
	window.setTimeout(function() {
		
	},10000);
} else {
	StartAll();
}	