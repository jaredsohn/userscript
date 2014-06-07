// ==UserScript==
// @name           KcCAttack_fr
// @namespace      KoCAttack_fr
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


var KOCAttack={
startListenTime:null,
prevAttack:{'x':"333",'y':'111'},
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
	var div=ById('KOCAttackOptions');
	if(!div) {
		div=document.createElement('div');
		div.id='KOCAttackOptions';
		div.style.zIndex=100000;
		div.style.position='absolute';
		div.style.left='8px';
		div.style.top='8px';
		div.style.backgroundColor='#fff';
		div.style.border='3px solid #888';
		div.style.padding='10px';
		document.body.appendChild(div);
	}

	var okCitiesHtml="<span onmousedown='return false; '>";
	for(var c=1; c<=8; c++) {
		okCitiesHtml+=
			"<a style='font-size: 11px; padding: 2px; cursor: pointer; text-decoration: none' id='KOCAttackOkCities_"+c+"'>"+c+"</a>&nbsp;";
	}
	okCitiesHtml+='</span>';
	
	div.style.display='block';
	div.innerHTML='';
	this.options=this.GetOptions();
	div.innerHTML="<form><table>"+
		"<tr><td valign='top' align='center'><img src='img/units/unit_6_50.jpg' /></td><td valign='top'>"+
		"Ordre d'attaque: <select id='KOCAttackOrder'><option value='mostTroops'>Utilisez les premières troupes</option><option value='closest'>Cibles les plus proches</option></select><br />"+
		"Type d'attaque: <input type='checkbox' "+(this.options.attackTypeCamp?'checked':'')+" id='KOCAttackTypeCamp'>Camp barbare "+
		"<input type='checkbox' "+(this.options.attackTypeWild?'checked':'')+" id='KOCAttackTypeWild'>Terre sauvage "+
		"<input type='checkbox' "+(this.options.attackTypeCity?'checked':'')+" id='KOCAttackTypeCity'>Cité "+
		"<input type='checkbox' "+(this.options.attackTypeTransport?'checked':'')+" id='KOCAttackTypeTransport'>Transport<br> "+
		"<br />"+
		"<input id='KOCAttackDelay' value='"+this.options.attackDelay+"' size='3' /> secondes entre chaque envoi d'attaque<br />"+
		"Temps entre l'envoi sur la même cible...<br />"+
		"<div style='margin-left: 40px'>"+
		"Attaquer le camp:<input id='KOCAttackHoursSinceLastCamp' value='"+(this.options.attackSecsSinceLastCamp/(60*60))+"' size='3' />hrs<br />"+
		"Attaquer la terre sauvage:<input id='KOCAttackHoursSinceLastWild' value='"+(this.options.attackSecsSinceLastWild/(60*60))+"' size='3' />hrs<br />"+
		"Attaquer la cité:<input id='KOCAttackHoursSinceLastCity' value='"+(this.options.attackSecsSinceLastCity/(60*60))+"' size='3' />hrs<br />"+
		"Transport:<input id='KOCAttackMinsSinceLastTransport' value='"+(this.options.attackSecsSinceLastTransport/(60))+"' size='3' />mins"+
		"</div>"+
		"<br />"+
		"<input id='KOCAttackMaxDistance' value='"+(this.options.attackMaxDistance)+"' size='3' /> distance max. entre la ville et la cible<br />"+
		"<input disabled id='KOCAttackLockAttackFromCity' type='checkbox' "+(this.options.lockAttackFromCity?'checked':'')+" /> Only launch attacks from city they were first launched from.<br />"+
		"<br />"+
		"<input id='KOCAttackRetryMarch' type='checkbox' "+(this.options.retryMarch?'checked':'')+" /> Rééssayer la marche, erreur surplus de traffic (Recharger après avoir changé cette option).<br />"+
		"Ouvrez cette url dans un onglet quand nous sommes sous attaque...<br /><input id='KOCAttackImpendingAttackUrl' size='60' value='"+(this.options.impendingAttackUrl)+"' /><br />"+
		
		"</td></tr>"+

		//http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545

		"<tr><td valign='top' align='center'><img src='img/chrome_message_up.png' /></td><td valign='top'>"+
		"<input id='KOCAttackRemoveReports' type='checkbox' "+(this.options.autoRemoveReports?'checked':'')+" /> Supprimer automatiquement les rapports d'attaque des camps barbares/terres sauvages.<br />"+
		"<input id='KOCAttackKeepReports' value='"+this.options.keepReports+"' size='3' /> maximum de rapports d'attaques à garder.<br />"+
		"<input id='KOCAttackNoViewReports' type='checkbox' "+(this.options.noViewReports?'checked':'')+" /> Désactiver l'affichage des rapports, ça désactivera aussi les rapports pour la page d'attaque.<br />"+
		
		"</td></tr>"+
		"<tr><td valign='top' align='center'><img src='img/happiness.png' /></td><td valign='top'>"+
		"<input id='KOCAttackPercentOfPopToTrain' value='"+this.options.percentOfPopToTrain+"' size='3' />% de la population inactive disponibles avant de faire de la formation automatique.<br />"+
		"<input id='KOCAttackAutoGoldHappiness' value='"+this.options.autoGoldHappiness+"' size='3' />% de bonheurs avant que l'or soit récupérer automatiquement.<br />"+
		"</td></tr>"+
		
		"<tr><td valign='top' align='center'><img src='img/buildings/castle_lvl10.png' /></td><td valign='top'>"+
		"<input id='KOCAttackChangeCitySecs' value='"+(this.options.changeCitySecs)+"' size='3' /> seconds entre l'évolution des villes.<br />"+
		"Passer en revue toutes les villes <input id='KOCAttackCitiesDoneMax' value='"+(this.options.autoAttackCitiesDoneMax)+"' size='3' /> fois puis attendre "+
		"<input id='KOCAttackCitiesDelay' value='"+this.options.waitAfterCitiesDone+"' size='3' /> secondes avant d'actualiser.<br />"+
		"Attaquer les villes de: "+okCitiesHtml+'<br />'+

		"<tr><td valign='top' align='center'></td><td valign='top'>"+
		"<input id='KOCAttackRandom' value='"+this.options.randomPercent+"' size='3' />% de correction aléatoire de tous les retards (à regarder par vous).<br />"+
		"Importer/Exporter: Coller ou copier les paramètres ici...<br /><textarea id='KOCAttackImport'></textarea>"+
		"<a class='button20' id='KOCAttackImportButton'><span>Importer</span></a> <a class='button20' id='KOCAttackExportButton'><span>Exporter</span></a><br />"+
		"</td></tr>"+

		"</table>"+
		
		"<a id='KOCAttackOptionsSave' class='button20'><span>Sauver</span></a> <a id='KOCAttackOptionsCancel' class='button20'><span>Annuler</span></a> <a id='KOCAttackOptionsReset' class='button20'><span>Reset options</span></a> <a id='KOCAttackOptionsResetAll' class='button20'><span>Tous réinitialiser !</span></a></form>";
	var t=this;

	var importText=ById('KOCAttackImport');
	importText.addEventListener('focus',function() {
		importText.select();
	},false);
	ById('KOCAttackImportButton').addEventListener('click',function() {
		if(importText.value=="") return;
		t.ImportAllFromJSON(importText.value);
	},false);
	ById('KOCAttackExportButton').addEventListener('click',function() {
		importText.value=t.ExportAllToJSON();
	},false);
	
	nHtml.SetSelect(ById('KOCAttackOrder'),this.options.attackOrder);
	ById('KOCAttackOptionsCancel').addEventListener('click',function() {
		div.style.display='none';
	},false);
	ById('KOCAttackOptionsReset').addEventListener('click',function() {
		t.ClearOptions();
		this.options=t.GetOptions();
		div.style.display='none';
	},false);
	ById('KOCAttackOptionsResetAll').addEventListener('click',function() {
		t.FactoryReset();
		window.location.reload(true);
	},false);

	for(var c=1; c<=8; c++) {
		var sp=ById('KOCAttackOkCities_'+c);
		var SetCity=function(target,set) {
			target.style.border=set?'2px solid #080':'';
			target.style.margin=set?'2px':'4px';
		};
		sp.addEventListener('click',function(evt) { SetCity(evt.target,evt.target.style.border==''?true:false); },false);
		//sp.onmousedown=function() { return false; }
		SetCity(sp,t.options.okCities[c]);
	}
	

	ById('KOCAttackOptionsSave').addEventListener('click',function() {
		t.options.attackTypeCamp=ById('KOCAttackTypeCamp').checked;
		t.options.attackTypeCity=ById('KOCAttackTypeCity').checked;
		t.options.attackTypeWild=ById('KOCAttackTypeWild').checked;
		t.options.attackTypeTransport=ById('KOCAttackTypeTransport').checked;
		
		t.options.attackDelay=parseInt(ById('KOCAttackDelay').value);
		t.options.waitAfterCitiesDone=parseInt(ById('KOCAttackCitiesDelay').value);
		t.options.keepReports=parseInt(ById('KOCAttackKeepReports').value);
		t.options.changeCitySecs=parseInt(ById('KOCAttackChangeCitySecs').value);
		t.options.autoGoldHappiness=parseInt(ById('KOCAttackAutoGoldHappiness').value);
		t.options.percentOfPopToTrain=parseFloat(ById('KOCAttackPercentOfPopToTrain').value);
		
		t.options.attackSecsSinceLastCamp=parseFloat(ById('KOCAttackHoursSinceLastCamp').value)*60*60;
		t.options.attackSecsSinceLastWild=parseFloat(ById('KOCAttackHoursSinceLastWild').value)*60*60;
		t.options.attackSecsSinceLastCity=parseFloat(ById('KOCAttackHoursSinceLastCity').value)*60*60;
		t.options.attackSecsSinceLastTransport=parseFloat(ById('KOCAttackMinsSinceLastTransport').value)*60;
		t.options.randomPercent=parseFloat(ById('KOCAttackRandom').value);
		t.options.attackMaxDistance=parseFloat(ById('KOCAttackMaxDistance').value);
		t.options.autoAttackCitiesDoneMax=parseInt(ById('KOCAttackCitiesDoneMax').value);

		t.options.attackOrder=ById('KOCAttackOrder').value;

		
		t.options.lockAttackFromCity=ById('KOCAttackLockAttackFromCity').checked;
		t.options.autoRemoveReports=ById('KOCAttackRemoveReports').checked;
		t.options.retryMarch=ById('KOCAttackRetryMarch').checked;
		t.options.impendingAttackUrl=ById('KOCAttackImpendingAttackUrl').value;
		
		t.options.noViewReports=ById('KOCAttackNoViewReports').checked;
		
		for(var c=1; c<=8; c++) {
			var okcity=ById('KOCAttackOkCities_'+c);
			t.options.okCities[c]=okcity.style.border!=""?true:false;
		}

		t.SetOptions(t.options);
		div.style.display='none';
	},false);
},

AddOptionsLink:function() {
	var t=this;
	var a=ById('KOCAttackOptionsLink');
	if(a) return;

	a=this.AddTabLink('Options');
	if(!a) {
		window.setTimeout(function() {
			t.AddOptionsLink();
		},t.GetRandTime(250));
		return;
	}
	a.id='KOCAttackOptionsLink';
	a.addEventListener('click',function() {
		t.ShowOptionsDialog();
	},false);
},

AddTabLink:function(html) {
	var a=document.createElement('a');
	a.className='tab';
	a.style.color='#fff';
	a.innerHTML='<span>'+html+'</span>';
	var tabs=ById('KOCAttackTabs');
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
		tabs.id='KOCAttackTabs';
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

ToggleAutoAttack:function() {
	var t=this;
	var a=t.GetAutoAttack();
	if(!a) {
		t.SetAutoAttack({'barbarian':true,'cities':{}});
		t.RestartAutoAttack();
	} else {
		t.ClearAutoAttackTimeout();
		t.SetAutoAttack(null);
	}
/*
	// toggle for this city, 
	if(!a.cities) a.cities={};
	var city=t.GetCurrentCityId();
	a.cities[city]=a.cities[city]?undefined:true;
	var attackCities=0;
	for(city in a.cities) {
		attackCities++;
	}
	if(attackCities==0) {
		t.ClearAutoAttackTimeout();
		t.SetAutoAttack(null);
	}
*/			
	t.SetAttackStatusMessage();
},

SetAttackStatusMessage:function() {
	//var mess=this.GetStatusMessage();
	var toggle=ById('KOCAttackToggle');

	if(!toggle) {
		var t=this;
		toggle=this.AddTabLink('Auto Attack');
		if(!toggle) {
			window.setTimeout(function() {
				t.SetAttackStatusMessage();
			},t.GetRandTime(250));
			return;
		}
		toggle.id='KOCAttackToggle';
		toggle.addEventListener('click',function() {
			t.ToggleAutoAttack();
		},false);
	}
	var autoAttack=this.GetAutoAttack();
//	if(autoAttack && autoAttack.cities && autoAttack.cities[t.GetCurrentCityId()]) {
	if(autoAttack) {
		toggle.innerHTML='<span>Attaque automatique</span>';
	} else {
		toggle.innerHTML='<span>Pas d\'attaque automatique</span>';
	}
},

SetStatusMessage:function(str) {
	var mess=this.GetStatusMessage();
	var txt=ById('KOCAttackMessage');
	if(!txt) {
		txt=document.createElement('span');
		mess.appendChild(txt);
	}
	txt.innerHTML=str;
},
GetStatusMessage:function() {
	var mess=ById('KOCAttackStatus');
	if(!mess) {
		var timeHead=ById('kochead_time');
		mess=document.createElement('span');
		mess.id='KOCAttackStatus';
		timeHead.parentNode.appendChild(mess);
	}
	return mess;
},

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
	chrome.extension.sendRequest({func:"get","n":'KOCAttack'}, 
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
	
	var cookie='kocattack';
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
	document.cookie='kocattack='+escape(JSON2.stringify(this.valuesCache))+'; expires='+
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

ClearOptions:function() {
	this.SetValue('Options',JSON.stringify({}));
},
GetOptions:function() {
	var json=this.GetValue('Options','{}');
	if(json=='') json='{}';
	var options=JSON2.parse(json);
	var defOptions={"attackDelay":15,
		"attackTypeCamp":true,
		"attackOrder":"closest",
		"autoRemoveReports":true,
		"attackSecsSinceLastCity":60*60*12,
		"attackSecsSinceLastCamp":3600,
		"attackSecsSinceLastWild":3600,
		"attackSecsSinceLastTransport":60,
		"randomPercent":20,
		"keepReports":10,
		"attackMaxDistance":60,
		"waitAfterCitiesDone":15,
		"autoAttackCitiesDoneMax":3,
		"changeCitySecs":15,
		"retryMarch":true,
		"noViewReports":false,
		"chromeKeepReports":2,
		"percentOfPopToTrain":100,
		"autoGoldHappiness":99,
		"okCities":[1,1,1,1,1,1,1,1,1,1],
		'impendingAttackUrl':''};
	for(var n in defOptions) {
		if(options[n]!=undefined) { continue; }
		options[n]=defOptions[n];
	}
	return options;
},
SetOptions:function(v) {
	this.SetValue('Options',JSON2.stringify(v));
},

GetAttackName:function(x,y) {
	return 'attack_'+this.GetServerId()+'_'+x+','+y;
},
SetAttack:function(x,y,attack) {
	this.browser_setValue(this.GetAttackName(x,y),
		JSON2.stringify(attack));
},
GetAttack:function(x,y) {
	var str=this.browser_getValue(this.GetAttackName(x,y),'');
	if(!str) return null;
	return JSON2.parse(str);
},
DeleteAttack:function(x,y) {
	var str=this.browser_getValue(this.GetAttackName(x,y),'');
	if(!str) return;
	GM_deleteValue(this.GetAttackName(x,y));
},

IsFirstAttackAtLocation:function(x,y) {
	if(!this.prevAttack) return true;
	return ((this.prevAttack.x==x && this.prevAttack.y==y)?false:true);
},

GetGuiCoords:function() {
	var x=ById('modal_attack_target_coords_x');
	var y=ById('modal_attack_target_coords_y');
	if(!x || !y) {	
		this.Log("Aucunes coordonnées");
		return null;
	}
	return [x.value,y.value];
},

SetAttackFromGui:function(box) {
	var xy=this.GetGuiCoords();
	if(!xy) return null;
	return this.SetAttackFromGuiXY(xy[0],xy[1],box);
},

SetAttackFromGuiXY:function(x,y,box) {
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
	var comment=ById('KocAttackComment');
	var type=ById('modal_attack_atktype');
	if(!type) {
		throw("Aucunes attaques");
	}

	if(totalTroops<=0) {
		this.Log("Non sauvegardé, pas de troupes");
		return null;
	}

	// ignore anything other than attack
	if(type.selectedIndex==0) {
		var attack=this.GetAttack(x,y);
		if(!attack) attack={};
		attack.type=type.selectedIndex;
		if(comment)
			attack.comment=comment.value;
		var nowSecs=new Date().getTime()/1000;
		var firstAttack=this.IsFirstAttackAtLocation(x,y);

		if(totalTroops>0 && (troops[2]+troops[10])==totalTroops && firstAttack) {
			// nothing but militiamen/ballista, anti defence attack
			attack.militiaonly=troops;
		} else {
			attack.time=nowSecs;
			if(firstAttack) { attack.militiaonly=undefined; }
			attack.troops=troops;
		}
		
		if (this.options.lockAttackFromCity) {
			attack.fromCity=GetCurrentCityId();
		}

		//attack.ignore=undefined;
		this.prevAttack={'x':x,'y':y};
		this.SetAttack(x,y,attack);
		return attack;
	} else if(type.selectedIndex==1) {
		// try to parse transports
		var attack=this.GetAttack(x,y);
		if(!attack) attack={};
		attack.type=type.selectedIndex;
		//attack.ignore=true; // We set this to ignore for now until I can get the auto attack working
		if(comment)
			attack.comment=comment.value;
		var nowSecs=new Date().getTime()/1000;
		var firstAttack=this.IsFirstAttackAtLocation(x,y);

		attack.time=nowSecs;
		attack.troops=troops;

		var resources=[];
		var resourceTypes = new Array(
			'gold',
			'rec1',
			'rec2',
			'rec3',
			'rec4'
		);
		for(var res=0; res<resourceTypes.length; res++) {
			var resource=ById('modal_attack_'+resourceTypes[res]);
			if(!resource) continue;
			try {
				var v=parseInt(resource.value);
				resources[res]=v;
				totalResources+=v;
			} catch(e) {
				continue;
			}
		}
		attack.resources=resources;
		
		if (this.options.lockAttackFromCity) {
			attack.fromCity=GetCurrentCityId();
		}
		//attack.ignore=undefined;
		this.prevAttack={'x':x,'y':y};
		this.SetAttack(x,y,attack);
		return attack;
	} else {
		this.prevAttack=null;
	}
	return null;
},


BulkAddCoords:function(box,coordsText,force) {
	var coordRows=coordsText.split("\n");
	var added=0;
	for(var r=0; r<coordRows.length; r++) {
		var row=coordRows[r];
		var m=/^\s*([0-9]+)\s*,\s*([0-9]+)/.exec(row);
		if(!m) {
			m=/^\s*([0-9]+)\s+([0-9]+)/.exec(row);
			if(!m) continue;
		}
		var x=m[1];
		var y=m[2];
		var attack=this.GetAttack(x,y);
		if(attack && !force) {
			this.Log(x+','+y+' has already been added.');
			continue;
		}
		var attack=this.SetAttackFromGuiXY(x,y,box);
		if(attack) {
			attack.levelInfo={'type':'Camp','level':0};
			attack.time=0;
			attack.ignore=undefined;
			this.SetAttack(x,y,attack);
			this.Log(x+','+y+' attack setup');
			added++;
		}
	}
	return added;
},

BulkAddAttackLink:function(box) {
	var div=ById('BulkAddAttackDiv');
	var t=this;
	if(!div) {
		div=document.createElement('div');
		div.id='BulkAddAttackDiv';
		div.style.display='inline';
	}
	div.innerHTML='';
	
	var bulkAddDiv=document.createElement('div');
	bulkAddDiv.style.display='none';
	AddHtml(bulkAddDiv,"<br />Copier et coller les coordonnées ici (ex: 343,434) un par ligne...<br />Note: il ne fera qu'ajouter la cible en utilisant le nombre actuel de troupes sur cet écran.<br /><input id='KOCAttackBulkAddForce' type='checkbox' /> Ecraser les attaques existantes s'il en existent déjà.<br />");

	var coords=document.createElement('textarea');
	coords.wrap='off';
	coords.style.whiteSpace='nowrap';
	coords.cols=10;
	coords.rows=8;
	bulkAddDiv.appendChild(coords);
	AddHtml(bulkAddDiv,"<br />");
	var bulkAdd=document.createElement('a');
	bulkAdd.className='buttonDown20';
	bulkAdd.innerHTML='<span>Bulk Add</span>';
	bulkAddDiv.appendChild(bulkAdd);
	bulkAdd.addEventListener('click',function() {
		var added=t.BulkAddCoords(box,coords.value,ById('KOCAttackBulkAddForce').checked);
		bulkAddDiv.style.display='none'; 
		bulkAddAttackLink.style.display='inline';
		window.alert('Il y a '+added+' coordonées ajoutés');
	},false);
	AddHtml(bulkAddDiv,"<br />");

	var bulkAddAttackLink=document.createElement('a');
	bulkAddAttackLink.className='buttonDown20';
	bulkAddAttackLink.innerHTML='<span>Ajouter des coordonnées</span>';
	bulkAddAttackLink.addEventListener('click',function() { 
		bulkAddDiv.style.display='inline'; 
		bulkAddAttackLink.style.display='none'; 
	},false);
	div.appendChild(bulkAddDiv);
	div.appendChild(bulkAddAttackLink);
	return div;
},

HideAttackEfforts:function() {
	var items=ById('modal_attack_items');
	if(!items) return;
	var type=ById('modal_attack_atktype');
	if(!type) {
		throw("Aucunes attaques");
	}


	//items=items.parentNode.parentNode;
	var a=document.createElement('a');
	a.innerHTML='Hide/Show attack efforts';
	//a.href='javascript:;';
	a.style.cursor='pointer';
	items.style.display='none';
	a.addEventListener('click',function() {
		items.style.display=items.style.display=='none'?'block':'none';
	},false);
	return a;
},

SetResourceInput:function(num,resourceCount) {
	var resource=ById('modal_attack_'+num);
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
},

SetTroopInput:function(num,troopCount) {
	var troop=ById('modal_attack_unit_ipt'+num);
	if(!troop) return null;
	troop.value=troopCount;
	troop.style.backgroundColor='';

	// send a shift key so that it recalculates
	var evt = document.createEvent("KeyboardEvent");
	if(evt.initKeyboardEvent) {
		evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	} else {
		evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	}
	troop.dispatchEvent(evt);

	if(parseInt(troopCount)>0) {
		if(troop.value!=troopCount) {
			this.Log('Pas en mesure de compter le nombre de troupes:'+num+', rechercher:'+troopCount+', compter:'+troop.value);
			troop.style.backgroundColor='#f88';
			return 'notfull';
		} else {
			troop.style.backgroundColor='#ff8';
			return 'full';
		}
	}
	return 'none';
},

GetRandTime:function(millis) {
	var millisPerc=millis*(this.options.randomPercent/100);
	var randSecs=Math.floor((Math.random()*millisPerc*2)-millisPerc)+millis;
	return randSecs;
},

GetAutoGold:function() {
	return this.GetValue('AutoGold,'+this.GetCurrentCityId(),false);
},
SetAutoGold:function(v) {
	return this.SetValue('AutoGold,'+this.GetCurrentCityId(),v);
},

GetAbandonWilds:function() {
	return this.GetValue('AbandonWilds_'+this.GetCurrentCityId(),false);
},
SetAbandonWilds:function(v) {
	return this.SetValue('AbandonWilds_'+this.GetCurrentCityId(),v);
},

CheckAutoRaiseGold:function() {
	if(!this.GetAutoGold()) return;
	var happiness=parseInt(this.GetSeed().citystats["city" + this.GetCurrentCityId()].pop[2]);
	
	if(happiness>=this.options.autoGoldHappiness) {
		this.DoUnsafeWindow("modal_raise_gold();");
	}
},

CheckAbandonWilds:function() {
	if(!this.GetAbandonWilds()) return;
	var castle=ById('slot_0');
	nHtml.Click(castle);
	this.DoUnsafeWindow("changeCastleModalTabs(2);");
	var wildsWindow=ById('castle_2');
	var rows=wildsWindow.getElementsByTagName('tr');
	if (rows.length==1) { //no wilds
		this.DoUnsafeWindow("Modal.hideModal();");
		return;
	}
	var commands = new Array(rows.length);
	for (i=0;i<rows.length;i++) {
		var abandonButton=rows[i].getElementsByTagName('a')[0];
		if (abandonButton==undefined) {
			continue;
		}
		var command=abandonButton.getAttribute('onclick');
		command=command.substring(0,command.length-13);
		commands[i] = command;
	}
	this.DoUnsafeWindow("Modal.hideModal();");
	for (i=0;i<commands.length;i++) {
		this.DoUnsafeWindow(commands[i]);
	}
},
	

OnCastleBoxAppear:function(box) {
	var raiseGold=nHtml.FindByXPath(box,".//a[contains(@onclick,'raiseGold')]");
	var a=document.createElement('a');
	a.className='button25';
	var t=this;
	
	function SetAutoGoldA() {
		var str=t.GetAutoGold()?'Auto':'Pas auto';
		a.innerHTML='<span>'+str+'</span>';
	}
	a.addEventListener('click',function() {
		var autoGold=t.GetAutoGold();
		t.SetAutoGold(autoGold?false:true);
		SetAutoGoldA();
	},false);
	SetAutoGoldA();
	raiseGold.parentNode.insertBefore(a,raiseGold.nextSibling);
	
	var productionHeader=nHtml.FindByXPath(box,".//div[contains(@class,'prodtableheader')]");
	productionHeader=productionHeader.parentNode;
	var b=document.createElement('a');
	b.className='button25';
	
	function SetAbandonWildsA() {
		var str=t.GetAbandonWilds()?'Abandonner les terres sauvages':'Garder les terres sauvages';
		b.innerHTML='<span>'+str+'</span>';
	}
	b.addEventListener('click',function() {
		var abandonWilds=t.GetAbandonWilds();
		t.SetAbandonWilds(abandonWilds?false:true);
		SetAbandonWildsA();
	},false);
	SetAbandonWildsA();
	//raiseGold.parentNode.insertBefore(b,raiseGold.nextSibling);
	productionHeader.parentNode.insertBefore(b,productionHeader);
},

marketBoxTimeout:null,
OnMarketBoxAppear:function(box) {
	var marketBox=ById('marketmain_bdy');
	var t=this;
	if(marketBox) {
		window.setTimeout(function() {
			t.OnMarketBoxAppear();
		},250);
		var amt=ById('marketmod_amount');
		if(amt && amt.value=="0") amt.value='999000';
		var price=ById('marketmod_price');
		if(price && price.value=="0") price.value='1';
	}
	
},

nextAutoAttackTimeout:null,
onclickTimeRe:/,([0-9]+),[0-9]+,[0-9]+,[0-9]+[^,]*$/,
waitForAttackBoxAppear:null,
OnAttackBoxAppear:function(box) {
	var btnMarch=ById('btnMarch');
	var t=this;
	if(!btnMarch) { 
		this.Log('Pas de bouton de marche');
		window.setTimeout(function() {
			t.OnAttackBoxAppear(box);
		},1000);
		return; 
	}

	this.StopWaitForAttackBoxAppear();
	if(ById('KocAttackComment')) {
		this.Log("Vous avez déjà un rapport d'attaque ouvert");
		return;
	}
	
	btnMarch.addEventListener('click',function(e) {
		window.setTimeout(function() {
			t.SetAttackFromGui(box);
			t.SetValuesCache();
			// we want to keep the scroll bar at the same position, don't redraw
			//~~~ mmm... need to wait for attack to finish before the numbers will update.
			//t.DrawClosestFarms();
		},0);
	},false);
	
	var comment=document.createElement('input');
	comment.id='KocAttackComment';
	comment.size='30';

	var nowSecs=new Date().getTime()/1000;

	var div=document.createElement('div');
	div.style.overflow='scroll';
	div.style.height='280px';
	AddText(div,'Commentaire:');
	div.appendChild(document.createElement('br'));
	div.appendChild(comment);
	div.appendChild(document.createElement('br'));

	var div2=document.createElement('div');
	var ignore=document.createElement('input');
	ignore.type='checkbox';
	div2.appendChild(ignore);
	AddText(div2,'Ignorer la liste d\'attaques');
	var nextElement=ById('marchTypeDesc');
	nextElement.parentNode.insertBefore(div2, nextElement.nextSibling);
	//div.appendChild(document.createElement('br'));
	
	var xy=this.GetGuiCoords();
	var attack=null;
	if(xy) {
		attack=this.GetAttack(xy[0],xy[1]);
	}
	var notFullTroops=false;
	var notFullResources=false;

	var knightSelect=ById('modal_attack_knight')
	var totalTroops=0;
	var totalResources=0;
	if(attack) {
		ignore.checked=attack.ignore?true:false;
		if(attack.time) {
			AddHtml(div,'Dernière attaque il y a: '+SecsToStr(nowSecs-attack.time)+'<br />');
		}
		if(attack.comment)
			comment.value=attack.comment;
		
		var attackTypeSelect=ById('modal_attack_atktype');
		// only fill things in if we're in attack mode.
		if(attackTypeSelect.selectedIndex==0 && attack.type==0) {
//if(this.prevAttack)GM_log('militia:'+this.prevAttack.x+'=='+xy[0] +','+this.prevAttack.y+'=='+xy[1] );
			if(attack.militiaonly
				&& this.IsFirstAttackAtLocation(xy[0],xy[1])
			) {
				// anti traps attack
				if(typeof(attack.militiaonly)=="object") {
					for(var i=1; i<attack.militiaonly.length; i++) {
						this.SetTroopInput(i,attack.militiaonly[i]);
						totalTroops+=attack.militiaonly[i];
					}
				} else {
					this.SetTroopInput(2,attack.militiaonly);
					totalTroops+=attack.militiaonly;
				}
			} else if(attack.troops) {
				for(var tr=0; tr<attack.troops.length; tr++) {
					var troopCount=attack.troops[tr];
					if(!troopCount) continue;
					totalTroops+=troopCount;

					if(this.SetTroopInput(tr,troopCount)=='notfull') {
						notFullTroops=true;

					}
				}
			}

			//attackTypeSelect.selectedIndex=attack.type;
			knightSelect.selectedIndex=1+Math.floor(Math.random()*(knightSelect.options.length-1));
		} else if (attackTypeSelect.selectedIndex==1 && attack.type==1) {
			attackTypeSelect.selectedIndex=attack.type;
			var resourceTypes = new Array(
				'gold',
				'rec1',
				'rec2',
				'rec3',
				'rec4'
			);
			for(var tr=0; tr<attack.troops.length; tr++) {
				var troopCount=attack.troops[tr];
				if(!troopCount) continue;
				totalTroops+=troopCount;

				if(this.SetTroopInput(tr,troopCount)=='notfull') {
					notFullTroops=true;
				}
			}

			for(var res=0; res<attack.resources.length; res++) {
				var resourceCount=attack.resources[res];
				if(!resourceCount) continue;
				totalResources+=resourceCount;

				if(this.SetResourceInput(resourceTypes[res],resourceCount)=='notfull') {
					notFullResources=true;
				}
			}
			// We don't send a knight with transports
		}
		
		if(attack.messages) {
			div.appendChild(document.createElement('br'));
			for(var m=attack.messages.length-1; m>=0; m--) {
				var message=attack.messages[m];
				var ma=document.createElement('a');
				var mess=message[0];
				var timeNumM=this.onclickTimeRe.exec(message[1]);
				if(timeNumM) {
					var secs=nowSecs-parseInt(timeNumM[1]);
					mess=SecsToStr(secs)+' ago, '+mess;
					//mess=(new Date(parseFloat(timeNumM[1])*1000).toLocalString())+', '+mess;
				}
				ma.innerHTML=mess;
			
//{"time":1273315720.514,"troops":"test","type":0,"messages":[["Attack (326,97)  - Barbarian Camp Lv. 2 (NewCity4216)","modal_messages_viewreports_view(\"529747\",1,51,2,0,\"Enemy\",\"0\",\"niknah\",\"M\",4,326,97,1273312617,1,333,110);return false;"],["Attack (326,97)  - Barbarian Camp Lv. 2 (NewCity4216)","modal_messages_viewreports_view(\"529747\",1,51,2,0,\"Enemy\",\"0\",\"niknah\",\"M\",4,326,97,1273312617,0,333,110);return false;"]]}
			
				ma.setAttribute('onclick',"var m=CreateMsgDiv(); "+ message[1]+'');
				ma.href='javascript:;';
				div.appendChild(ma);
				div.appendChild(document.createElement('br'));
			}
			div.appendChild(document.createElement('br'));
		}
		var deleteBtn=document.createElement('a');
		deleteBtn.className='button25';
		deleteBtn.innerHTML='<span>Supprimer l\'attaque</span>';
		deleteBtn.addEventListener('click',function() {
			t.DeleteAttack(xy[0],xy[1]);
		},false);
	
		attackTypeSelect.parentNode.insertBefore(deleteBtn,attackTypeSelect.nextSibling);
	} 
	
	var ChangeAttack=function() {
		var xy=t.GetGuiCoords();
		var attack=null;
		var attackTypeSelect=ById('modal_attack_atktype');
		if(xy) {
			attack=t.GetAttack(xy[0],xy[1]);
		}
		if(!attack) attack={};
		if(attackTypeSelect.selectedIndex!=attack.type) {
			t.Log('Vous ne pouvez pas changer une attaque si le type est différent. Vous devez supprimer l\'attaque pour changer le type.');
			return;
		}
		
		attack.comment=comment.value;
		attack.ignore=ignore.checked?true:undefined;
		t.SetAttack(xy[0],xy[1],attack);
	}
	comment.addEventListener('change',function() { ChangeAttack(); },false);
	ignore.addEventListener('change',function() { ChangeAttack(); },false);
	
	var parentDiv=ById('modal_attack_items');
	parentDiv.parentNode.insertBefore(div,parentDiv);
	parentDiv.parentNode.insertBefore(this.HideAttackEfforts(),parentDiv);
	parentDiv.parentNode.insertBefore(this.BulkAddAttackLink(box),parentDiv);
	
	this.AttachXYPaste('modal_attack_target_coords_x','modal_attack_target_coords_y');
	
	var autoAttack=this.GetAutoAttack();
	if(autoAttack && autoAttack.x==xy[0] && autoAttack.y==xy[1] && !ignore.checked) {

		autoAttack.x=autoAttack.y=-1;
		this.SetAutoAttack(autoAttack);

		if(totalTroops>0 
		&& knightSelect.options.length>1
		&& !notFullTroops
		&& !notFullResources


		&& btnMarch.style.opacity!=0.5
		) {
			this.Log('Attaque automatique:'+xy[0]+','+xy[1]+', de la ville:'+this.autoAttackCityUpto);
			var t=this;
			window.setTimeout(function() {
				t.autoAttacksThisCity++;
				nHtml.Click(btnMarch);
				//t.ResetIdStatus();
				
				window.setTimeout(function() {
						var mist=nHtml.FindByXPath(document,".//div[@class='mistwarn']");
						if(mist) {
							t.DoUnsafeWindow("Modal.hideModal();");
							t.DoUnsafeWindow("modal_attack_do();");
						}
				},t.GetRandTime(200));
			
			},t.GetRandTime(1000));

			if(!this.nextAutoAttackTimeout) {
				this.nextAutoAttackTimeout=setTimeout(function() {
					// let's attack again in a few secs.
					t.nextAutoAttackTimeout=null;
					t.NextAutoAttack();
					
				},t.GetRandTime(1000*this.options.attackDelay));
			} else {
				this.Log('Impossible de continuer l\'attaque automatique, sur le point d\'attaque ou de changer la ville.');
			}
			return;
		} else {
			this.Log('Attaque automatique, pas assez de troupes/chevaliers: '+xy[0]+','+xy[1]+
				", prévaloir chevalier:"+(knightSelect.options.length-1)+", Pas assez de troupes/ressources:"+notFullTroops+'/'+notFullResources+', nécessaire:'+totalTroops+'/'+totalResources);
			this.DoUnsafeWindow("Modal.hideModal();");
			this.NextAutoAttackCity();
		}
	}
},

coordsRe:/\(([0-9]+),([0-9]+)\)/,
maptileRe:/modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/,

OnToolTipAppear:function(box) {
	var box1=box.childNodes[0].childNodes[0];
	var m=this.coordsRe.exec(box.innerHTML);
	if(!m || m.length==0) return;

	var x=m[1]; var y=m[2];

	var a=ById('l_'+x+'_t_'+y);
	if(a) {
		var onclick=a.getAttribute('onclick');
		if(onclick) {
			var titleM=this.maptileRe.exec(onclick);
			if(titleM && titleM[8].indexOf('null')<0) {
				AddHtml(box1,'Title: '+titleM[8].StripQuotes()+'<br />');
			}
		}
	}
	
	var attack=this.GetAttack(x,y);
	if(!attack) return;
	var troops=attack.troops;
	if(troops && troops.length>0) {
		var lastAttack=parseInt(attack.time);
		var nowSecs=new Date().getTime()/1000;
		var lastAttackStr='Last attack: '+SecsToStr(nowSecs-lastAttack)+' ago'+(attack.ignore?' <b>(ignore)</b> ':'');
		AddHtml(box1,lastAttackStr+'<br />');
		if(attack.comment) {
			AddHtml(box1,attack.comment+'<br />');
		}
	}
},


/*
// don't know why but messages get duped sometimes.
FixMessages:function(attack) {
	var fixed=0;
	var done={};
	for(var m=0; m<attack.messages.length; m++) {
		if(!done[attack.messages[m][1]]) {
			done[attack.messages[m][1]]=true;
GM_log('ffff:'+attack.messages[m][1]+'####'+typeof(attack.messages[m][1]));
		} else {
			attack.messages.splice(m,1);
			fixed++;
		}
	}
	return fixed;
},
*/

CalcXYDist:function(a,b) {
	var xdist=parseInt(a.x)-parseInt(b.x);
	xdist=Math.abs(xdist);
	if(xdist>=375) xdist=750-xdist;
	var ydist=parseInt(a.y)-parseInt(b.y);
	ydist=Math.abs(ydist);
	if(ydist>=375) ydist=750-ydist;
	return Math.sqrt((xdist*xdist)+(ydist*ydist));
},

//attackRe:/\s+(\S+)\s+Lv\.\s*([0-9]+)/,
squareTypeNums:{
'51':'Camps barbares',
'10':'Prairies',
'11':'Lacs',
'20':'Bois',
'30':'Collines',
'40':'Montagnes',
'50':'Plaines',
'0':'Marais'
},
FindLevelFromMessages:function(attack) {
	if(!attack || !attack.messages) return null;
	for(var a=0; a<attack.messages.length; a++) {
		var m=this.onclickReportRe.exec(attack.messages[a][1]);
		if(!m) continue;
		var typeNum=m[3].replace('"','');
		var type=this.squareTypeNums[typeNum];
		if(!type) continue;
		if(typeNum=="51" && m[5]!='0') {
			type='';
		}
		return {'type':type,'niveau':m[4]};
	}
	return null;
},

DrawLevelIcons:function() {
	var mapwindow=ById('mapwindow');
	if(!mapwindow) return;
	var levelIcons=ById('LevelIcons');
	if(levelIcons) return;

	var ss=document.evaluate(".//a[contains(@class,'slot')]",mapwindow,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var lvRe=/_([0-9]+)/;
	var idDone=false;
	for(var s=0; s<ss.snapshotLength; s++) {
		var a=ss.snapshotItem(s);
		var onclick=a.getAttribute('onclick');
		var owner='';
		if(onclick) {
			var onclickM=this.maptileRe.exec(onclick);
			if(onclickM && onclickM[6]!='"null"' && onclickM[12]!='"city"') {
				var might=onclickM[7].StripQuotes();
				//var alliance=onclickM[9].StripQuotes();
				//+"<br />"+(alliance=="null"?"":alliance);
				owner=" "+onclickM[6].StripQuotes()+'<br />Puissance:'+might;
			}
		}
		var m=lvRe.exec(a.className);
		if(!m) continue;
		var sp=a.getElementsByTagName('span');
		if(sp.length==0) continue;

		if(!idDone) { a.id='levelIcons'; idDone=true; }
		sp[0].style.color='#cc0';
		//sp[0].innerHTML='<center>'+m[1]+'</center>';
		sp[0].innerHTML='&nbsp;'+m[1]+owner;
	}

},

AttachXYPaste:function(xId,yId,func) {
	var x=ById(xId);
	if(!x) {
		this.Log('Impossible de trouver la coordonnées x: '+xId);
		return;
	}
	var attached=x.getAttribute('KOCpasteAttached');
	if(attached) return;
	x.setAttribute('maxlength','20');
	
	var onchange=function() {
		var xValue=x.value.trim();
		var xI=/^\s*([0-9]+)[\s,]+([0-9]+)/.exec(xValue); 		
		if(xI) {
			var y=ById(yId);
			x.value=xI[1]
			y.value=xI[2]

			if(func!=undefined) func(xI[0],xI[1]);
		}
	}
	x.setAttribute('KOCpasteAttached',true);
	x.addEventListener('keyup',function() { onchange(); },false);
	x.addEventListener('change',function() { onchange(); },false);
},


GetClosestAttacks:function(x,y) {
	var attacks=[];
	var t=this;
	this.IterateAttacks(function(name,value) {
		var nameI=name.split('_');
		if(nameI.length<3) return;
		var xy=nameI[2].split(',');
		if(value=="") return;
		var attack=JSON2.parse(value);
		if(!attack) return;
		if(attack.ignore) return;
		
		var dist=t.CalcXYDist({'x':xy[0],'y':xy[1]},{'x':x,'y':y});
		if (dist==0) { return; } // Don't attack yourself
		if(dist>=t.options.attackMaxDistance) { return; }
		attacks.push({'dist':dist,'x':xy[0],'y':xy[1],'a':attack});
	});
	attacks.sort(function(a,b) {
		return a.dist-b.dist;
	});
	return attacks;
},

IsEnoughTroops:function(currentTroops,neededTroops) {
	for(var t=0; t<neededTroops.length; t++) {
		if(!neededTroops[t]) continue;
		if(parseInt(neededTroops[t])>parseInt(currentTroops[t])) {
			return false;
		}
	}
	return true;
},

IsEnoughResources:function(currentResources,neededResources) {
	for(var t=0; t<neededResources.length; t++) {
		if(!neededResources[t]) continue;
		if(parseInt(neededResources[t])>parseInt(currentResources[t])) {
			return false;
		}
	}
	return true;
},

GetLevelInfo:function(attack) {
	if(!attack) throw('GetLevelInfo: l\'attaque est nulle');
	var levelI=attack.levelInfo;
	if((!levelI || levelI.level==0) && attack.messages && attack.messages.length>0) {
		levelI=this.FindLevelFromMessages(attack);
	}
	return levelI;
},

FindBiggestCampAttack:function(attacks,currentTroops,currentResources) {
	var bestAttack=null;
	var bestAttackSize=0;
	var bestAttackDist=10000;
	var nowSecs=new Date().getTime()/1000;

	var wilderness={
		'Lacs':1,
		'Montagnes':1,
		'Marais':1,
		'Bois':1,
		'Plaines':1,
		'Collines':1,
		'Prairies':1
	};
	for(var a=0; a<attacks.length; a++) {
		var attack=attacks[a];
		var levelInfo=this.GetLevelInfo(attack.a);
		if(!levelInfo) continue;
		
		if(levelInfo.type=='Camp') {
			if(this.options.attackTypeCamp!=true) {
				continue;
			}
		} else if(wilderness[levelInfo.type]) {
			if(this.options.attackTypeWild!=true) {
				continue;
			}
		} else if (levelInfo.type!='Camp' && !wilderness[levelInfo.type]) {
			var tempAttack=this.GetAttack(attack.x,attack.y);
			if(tempAttack.type==0) {
				if(this.options.attackTypeCity!=true) { continue; }
			} else if(tempAttack.type==1) {
				if(this.options.attackTypeTransport!=true) { continue; }
			}
		} else {
			if(levelInfo.type!='' && levelInfo.type!='Camp') { continue; }
		}

		if(!attack.a.troops) continue;
		if(attack.a.ignore) continue;
		if(attack.dist>=this.options.attackMaxDistance) { continue; }
		if(this.options.lockAttackFromCity) {
			this.Log('fromCity='+attack.a.fromCity+', currentCity='+this.GetCurrentCityId());
			//if(attack.a.fromCity!=undefined) {
			//	if(this.GetCurrentCityId()!=attack.a.fromCity) { continue; }
			//}
		}

		if(!this.IsEnoughTroops(currentTroops,attack.a.troops)) {
			continue;
		}
		if (attack.a.type==1) {
			if(!this.IsEnoughResources(currentResources,attack.a.resources)) {
				continue;
			}
		}
		var lastAttack;
		if(!attack.a.time) {
			lastAttack=60*60*24*31;
		} else {
			lastAttack=nowSecs-parseInt(attack.a.time);
		}
	
		if(levelInfo.type=='') {
			if(attack.a.type==0) {
				if(lastAttack<this.options.attackSecsSinceLastCity) continue;
			} else {
				if(lastAttack<this.options.attackSecsSinceLastTransport) continue;
			}
		} else if(levelInfo.type.toUpperCase()=='C') {
			if(lastAttack<this.options.attackSecsSinceLastCamp) continue;
		} else  {
			if(lastAttack<this.options.attackSecsSinceLastWild) continue;
		}
		var armySize=0;
		for(var t=0; t<attack.a.troops.length; t++) {
			if(!attack.a.troops[t]) continue;
			armySize+=parseInt(attack.a.troops[t]);
		}
		if(attack.a.militiaonly) {
			var militiaSize=0;
			for(var t=0; t<attack.a.militiaonly.length; t++) {
				if(!attack.a.militiaonly[t]) continue;
				militiaSize+=parseInt(attack.a.militiaonly[t]);
			}
			if(militiaSize<=0) {
				this.Log('Invalid militia attack size:'+attack.x+','+attack.y);
				continue;
			}
		}
		if(armySize<=0) {
			continue;
		}	
		

		var ok=0;
		if(this.options.attackOrder=='mostTroops') {
			if(bestAttackSize<armySize) {
				ok=1;
			}
		} else {
			if(this.options.attackOrder!='closest') {
				this.Log('Unknown order:'+this.options.attackOrder);
			}
			if(bestAttackDist>attack.dist) {  
				ok=1;  
				bestAttackDist=attack.dist; 
			}
		}
		if(ok) {
			bestAttack=attack;
			bestAttack.type=attack.a.type;
			bestAttackSize=armySize;
		}
	}
	return bestAttack;
},

IsMapperRunning:function() {
	if(ById('SendMap')) {
		//GM_log('mapper is running, do not auto attack');
		return true;
	}
	return false;
},
GetAutoAttack:function() {
	var aStr=this.GetValue('AutoAttack','');
	//var aStr=GM_getValue('AutoAttack_'+this.GetServerId(),'');
	if(aStr=='') {
		return null;
	}
	try {
		return JSON2.parse(aStr);
	} catch(e) {
		GM_log('Impossible d\'analyser attaque automatique:'+aStr);
		return null;
	}
},
SetAutoAttack:function(s) {
	if(s==null) {
		this.SetValue('AutoAttack','');
		//GM_setValue('AutoAttack_'+this.GetServerId(),'');
		return;
	} 
	this.SetValue('AutoAttack',JSON2.stringify(s));
	//GM_setValue('AutoAttack_'+this.GetServerId(),JSON.stringify(s));
},
ResetAutoAttackTarget:function() {
	var autoAttack=this.GetAutoAttack();
	if(autoAttack) {
		autoAttack.x=autoAttack.y=undefined;
		this.SetAutoAttack(autoAttack);
	}
},

GetCurrentMapCoord:function() {
	var xcoord=ById('mapXCoor');
	var ycoord=ById('mapYCoor');
	return {'x':xcoord.value,'y':ycoord.value};
},

hrsInput:null,
viewTypeOnly:"",
expandedInfo:false,
DrawClosestFarms:function() {
	this.SetAttackStatusMessage();
	var t=this;

	//unsafeWindow.statusupdate();
	var bookmark=ById('maparea_map');
	if(!bookmark) throw("Cannot find bookmark box");
	bookmark=nHtml.FindByXPath(bookmark.parentNode,".//div[@class='coords']");

	var div=ById('ClosestFarms');
	if(!div) {
		div=document.createElement('div');
		var titleA=document.createElement('a');
		titleA.innerHTML='Attaques ';
		titleA.title='Les attaques les plus proches ? heures depuis la dernière attaque';
		titleA.style.cursor='pointer';
		titleA.addEventListener('click',function() {
			div.style.display=div.style.display=='block'?'none':'block';
			setTimeout(function() {
				t.SetValue('ClosestFarmDisplay',div.style.display);
			},0);
		},false);
		
		var viewTypeOnlyInp=document.createElement('input');
		viewTypeOnlyInp.style.width='10px';
		viewTypeOnlyInp.style.fontSize="8px";
		viewTypeOnlyInp.title="Type of target. ex: P, W, M, P1";
		this.hrsInput=document.createElement('input');
		this.hrsInput.style.width='16px';
		this.hrsInput.value=this.GetMinHours();
		var hrsChanged=function() {
			var v=parseFloat(t.hrsInput.value);
			t.viewTypeOnly=viewTypeOnlyInp.value;
			if(v!=undefined && v!=NaN) {
				t.SetMinHours(t.hrsInput.value);
				t.DrawClosestFarms();
			}
		}
		this.hrsInput.addEventListener('change',function() {
			hrsChanged();
		},false);
		this.hrsInput.addEventListener('keyup',function() {
			hrsChanged();
		},false);
		viewTypeOnlyInp.addEventListener('keyup',function() {
			hrsChanged();
		},false);
		
		bookmark.appendChild(document.createElement('br'));
		bookmark.appendChild(titleA);
		AddText(bookmark,'>');
		bookmark.appendChild(this.hrsInput);
		AddText(bookmark,'hrs ');
		
		var expandA=document.createElement('a');
		expandA.innerHTML='E';
		expandA.title='Expand information';
		expandA.addEventListener('click',function() {
			t.expandedInfo=t.expandedInfo?false:true;
			t.DrawClosestFarms();
		},false);

		bookmark.appendChild(viewTypeOnlyInp);
		bookmark.appendChild(expandA);
		bookmark.appendChild(document.createElement('br'));
	}
	div.innerHTML='';
	div.id='ClosestFarms';
	div.style.overflow='scroll';
	div.style.height='200px';
	div.style.display=this.GetValue('ClosestFarmDisplay','block');

	var currentTroops=this.GetArmySize();
	var currentResources=this.GetResourcesSize();

	var mapCoord=this.GetCurrentMapCoord();
	var nowSecs=new Date().getTime()/1000;
	var attacks=this.GetClosestAttacks(mapCoord.x,mapCoord.y);
	//var bestAttack=this.FindBiggestCampAttack(attacks,currentTroops,currentResources);
	var GoClosestFarm=function(e) {
		var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
		t.DoUnsafeWindow("setBookmarkCoord("+xy[0]+","+xy[1]+");");
	};
	var AttackClosestFarm=function(e) {
		var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
		var attack=t.GetAttack(xy[0],xy[1]);
		if(!attack) throw("Cannot find:"+xy[0]+','+xy[1]);
		if(attack.type==0) {
			t.DoUnsafeWindow("modal_attack(4,"+xy[0]+","+xy[1]+");");
		} else if(attack.type==1) {
			t.DoUnsafeWindow("modal_attack(1,"+xy[0]+","+xy[1]+");");
		}
	};
	var IgnoreFarm=function(e) {
		var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
		var attack=t.GetAttack(xy[0],xy[1]);
		if(!attack) throw("Cannot find:"+xy[0]+','+xy[1]);
		attack.ignore=true;
		t.SetAttack(xy[0],xy[1],attack);
		setTimeout(function() {
			t.DrawClosestFarms();
		},0);
	};
	
	var aDone=0;
	var table=document.createElement('table');
	table.className='';
	var minHrsSinceAttack=parseFloat(this.hrsInput.value);

	var viewType=this.viewTypeOnly.trim().toUpperCase();


	for(var aUpto=0; aUpto<attacks.length; aUpto++) {
		var attackI=attacks[aUpto];
		try {
			//attackI.a.levelInfo=this.FindLevelFromMessages(attackI.a);
			//this.SetAttack(attackI.x,attackI.y,attackI.a);

			
			if(!attackI.a.time) {
				lastAttack=60*60*24*31;
			} else {
				lastAttack=nowSecs-parseInt(attackI.a.time);
			}
			if(lastAttack<(60*60*minHrsSinceAttack)) continue;

			var levelI=this.GetLevelInfo(attackI.a);
			var m=( (levelI!=null && levelI.type) ?(levelI.type.charAt(0)+levelI.level):'');
			if(this.viewTypeOnly!="") {
				if(this.viewTypeOnly==" ") {
					if(m!="") {
						continue;
					}
				} else if(viewType.length==0 || m.substring(0,viewType.length)!=viewType) {
					continue;
				}
			}

			var dist=this.CalcXYDist({'x':attackI.x,'y':attackI.y},mapCoord);
			if(dist>=this.options.attackMaxDistance) {
				break;
			}
			
			var tr=table.insertRow(-1);
			tr.setAttribute('xy',attackI.x+','+attackI.y);
			var td=tr.insertCell(-1);
			td.style.whiteSpace='nowrap';

			var a=document.createElement('a');
			a.style.fontSize='10px';
			a.innerHTML=attackI.x+','+attackI.y;
			a.addEventListener('click',function(e) { GoClosestFarm(e); },false);
			td.appendChild(a);

			AddText(td,' ');
			//td=tr.insertCell(-1);

			var attackA=document.createElement('a');
			attackA.style.fontSize='10px';
			/* ~~~ disabled: incorrect numbers due to having to wait for attack to update.
			if(bestAttack && attackI.x==bestAttack.x && attackI.y==bestAttack.y) {
				attackA.style.color='#f88';
			}
			*/
			attackA.title=(levelI!=null?(levelI.type+' '+levelI.level):'');
			if(attackI.a.comment) {
				attackA.title+=", "+attackI.a.comment;
			}
			if(attackI.a.time && !isNaN(lastAttack)) {
				// if we only scouted or transported to someone they won't have a last attack time.
				m=m+' @'+SecsToStr(lastAttack);
			}
			attackA.innerHTML=m;
			attackA.addEventListener('click',function(e) { AttackClosestFarm(e); },false);
			td.appendChild(attackA);		

			if(t.expandedInfo) {
				var troops=attackI.a.troops;
				if(troops) {
					for(var tupto=0; tupto<troops.length; tupto++) {
						var num=troops[tupto];
						if(attackI.a.militiaonly) {
							var am=attackI.a.militiaonly[tupto];
							if(am) num+=" ("+am+")";
						}
						AddText(tr.insertCell(-1),num);
					}
				}
			}
			
			var aDelete=document.createElement('a');
			aDelete.innerHTML='X';
			aDelete.title='Ignore';
			aDelete.addEventListener('click',function(e) { IgnoreFarm(e); },false);
			tr.insertCell(-1).appendChild(aDelete);
		
			aDone++;
		} catch(e) {
			this.Log('Error:'+e);
		}

	}

	div.appendChild(table);
	
	//bookmark.parentNode.insertBefore(div,bookmark);
	//bookmark.parentNode.appendChild(document.createElement('br'));
	bookmark.appendChild(div);

	this.AttachXYPaste('mapXCoor','mapYCoor');
},


// ?,1,square type, level, player id?, 
// target player name, target gender, player name, player gender, ?, target x, target y, report id, 0, x y
onclickReportRe:/(["0-9]+),(["0-9]+),(["0-9]+),(["0-9]+),(["0-9]+),("[^"]+"),("[^"]+"),("[^"]+"),("[^"]+"),(["0-9]+),(["0-9]+),(["0-9]+),/,
//modal_messages_viewreports_view("897422",0,51,9,2485358,"niknah","M","niknah","M",1,333,110,1275178036,1,286,181);

// remove the read/unread flag
onclickReadRe:/^(.*,)([0-9]+)(,[0-9]+,[0-9]+[^,]*)$/,
FixOnClick:function(a) {
	var m=this.onclickReadRe.exec(a);
	if(m) {
		return m[1]+"0"+m[3];
	}
	return a;
},



IterateArmy:function(f) {
	if(!this.GetSeed()) return;
	var armyDiv=ById('cityinfo_3');
	var units=this.GetSeed().units["city"+unsafeWindow.currentcityid];
	//var unitKeys=Object.keys(units);
	//for(var u=0; u<unitKeys; u++) {
	var uRe=/([0-9]+)$/;
	for(var u in units) {
		var m=uRe.exec(u);
		if(!m) continue;
		f.call(this,m[1],units[u]);
	}
	/*
	var ss=document.evaluate(".//div[@class='unit']",armyDiv,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var s=0; s<ss.snapshotLength; s++) {
		var unit=ss.snapshotItem(s);
		var amt=unit.textContent;
		f.call(s,amt);
	}
	*/
},

GetArmySize:function() {
	var troops=[];
	this.IterateArmy(function(s,amt) {
		troops[s]=amt;
	});
	return troops;
},

GetResourcesSize:function() {
	var resources=[];
	resources[0]=ById('stat_gold_num'); // Gold
	resources[1]=ById('stat_rec1_num'); // Food
	resources[2]=ById('stat_rec2_num'); // Wood
	resources[3]=ById('stat_rec3_num'); // Stone
	resources[4]=ById('stat_rec4_num'); // Ore
	return resources;
},

OpenViewReports:function() {
	this.Log('Open View Reports');
	this.DoUnsafeWindow("modal_messages();");
	this.DoUnsafeWindow('track_chrome_btn("messages_btn");');
	this.DoUnsafeWindow('modal_messages_viewreports();');
},

//autoAttackCitiesDoneMax:3,
autoAttackCitiesDone:0,
autoAttackCityUpto:1,
autoAttackModalWaiting:false,
autoAttackTimeout:null,
autoAttacksThisCity:0,
ClearAutoAttackTimeout:function() {
	if(this.autoAttackTimeout!=null) {
		this.Log('Recharger la page');
		window.clearTimeout(this.autoAttackTimeout);
		this.autoAttackTimeout=null;
	}
},
RestartAutoAttack:function() {
	this.autoAttacksThisCity=0;
	this.autoAttackCitiesDone=0;
	this.autoAttackCityUpto=1;
	this.autoAttackModalWaiting=false;

	this.NextAutoAttack();
},

StartReloadPageTimer:function(secs) {
	var t=this;
	if(!secs) secs=this.options.waitAfterCitiesDone;
	var refreshMSecs=t.GetRandTime(1000*secs);
	this.Log('Recharge dans '+(refreshMSecs/1000)+' secondes, fait pour toutes ces villes:'+this.autoAttackCityUpto);
	this.ClearAutoAttackTimeout();
	this.autoAttackTimeout=window.setTimeout(function() {
		if(t.autoAttackTimeout==null) return;
		t.autoAttackTimeout=null;
		if(t.IsMapperRunning()) {
			t.Log("En attente de la carte");
			// don't reload until the mapper has finished.
			window.setTimeout(function() {
				t.StartReloadPageTimer(10*60);
			},0);
			return;
		}
		t.SetValuesCache();
		window.location.reload();
	},refreshMSecs);
	this.Log('Rechargement de la page commencé');
},


ClickChangeCity:function(cityA,tries) {
	var t=this;
	nHtml.Click(cityA);
	t.nextAutoAttackWanted=window.setTimeout(function() {
		if(t.nextAutoAttackWanted!=null) {
			if(tries>4) {
				t.Log("Passer la ville, trop de tentatives");
				t.NextAutoAttackCity();
				return;
			}
			t.Log("Vous avez cliqué pour changer de ville, mais la ville n'a pas changé, essayer de nouveau");
			// Didn't change city
			t.ClickChangeCity(cityA,tries+1);
		}
	},10000);
},

lastOpenViewReports:0,
NextAutoAttackCity:function() {
	var t=this;
	var autoAttack=this.GetAutoAttack();
	if(!autoAttack) return;
	// change to next city
	this.autoAttacksThisCity=0;

	var cityA=null;
	while(true) {
		this.autoAttackCityUpto++;
		cityA=ById('citysel_'+this.autoAttackCityUpto);
//~~~ problem here when under attack, the city isn't marked as selected?
		if(cityA && cityA.className && cityA.className.indexOf('city_selected')>=0) {
			this.Log('Skip city, current city:'+this.autoAttackCityUpto);
			this.autoAttackCityUpto++;
			cityA=ById('citysel_'+this.autoAttackCityUpto);
		}
		break;
	}
	if(!cityA) {
		// go back to the 1st city
		//this.Log('Start from 1st city again');
		if(!this.options.noViewReports) {
			var nowSecs=new Date().getTime()/1000;
			if((this.lastOpenViewReports+(60*10))<nowSecs) {
				this.lastOpenViewReports=nowSecs;
				this.OpenViewReports();
				this.bringUpReports=true;
				if(this.options.autoRemoveReports) {
					this.autoAttackRemoveReports=true;
				}
				
			}
		}

		if(this.autoAttackCityUpto<=2) {
			// only one city.
		} else {
			this.autoAttackCityUpto=1;
			cityA=ById('citysel_'+this.autoAttackCityUpto);
		}
		this.autoAttackCitiesDone++;
	}

	if(!cityA || this.autoAttackCitiesDone>=this.options.autoAttackCitiesDoneMax) {
		// ran out of cities, let's refresh in a minute
		this.StartReloadPageTimer();

		return;
	} else {
		if(this.nextAutoAttackTimeout==null) {
			var secs=t.GetRandTime(1000*t.options.changeCitySecs);
			this.Log('change city:'+this.autoAttackCityUpto+', in '+(secs/1000)+'secs, loop:'+this.autoAttackCitiesDone);
			this.nextAutoAttackTimeout=setTimeout(function() {
				t.nextAutoAttackTimeout=null;
				t.SetValuesCache();
				t.ClickChangeCity(cityA,0);
			},secs);
		} else {
			this.Log('Impossible de changer de ville, attaque en cours ou changement de ville.');
		}
//		this.autoAttackCityUpto++;
	}
},


StopWaitForAttackBoxAppear:function() {
	if(this.waitForAttackBoxAppear!=null) {
		window.clearTimeout(this.waitForAttackBoxAppear);
		this.waitForAttackBoxAppear=null;
	}
},

OpenAttackDialog:function(bestAttack) {
	var t=this;
	t.StopWaitForAttackBoxAppear();
	t.waitForAttackBoxAppear=window.setTimeout(function() {
		if(t.waitForAttackBoxAppear==null) return;
		t.waitForAttackBoxAppear=null;
		t.DoUnsafeWindow('Modal.hideModalAll();');
		t.DoUnsafeWindow('Modal.hideModalAll();');
		try {
			// something in the script is triggering a bug in 
			t.DoUnsafeWindow('Modal.hideCurtain();');
			t.DoUnsafeWindow('Modal.hideWindow();');
		} catch(e) {
			// ignore
		}
		//window.location.reload(true);
		t.ResetIdStatus();
		t.Log("Attack box has not appeared, let's reopen");
		window.setTimeout(function() {
			t.OpenAttackDialog(bestAttack);
		},0);
	},15*1000);
	
	//~~~ strange things here, sometimes the attack dialog is on screen but modalid is not updated
	if(ById('modal_attack')) {
		try {
			var countOut=10;
			while(countOut-->=0) {
				t.Log('modal attck still up'+unsafeWindow.Modal.modalid);
				var maxi=0;
				for(var i=0; i<20; i++) {
					if(ById('modalBox'+i)) {
						maxi=i;
					}
				}
				t.Log('Closing: '+maxi);
				unsafeWindow.Modal.modalid=maxi;
				if(maxi>0) {
					unsafeWindow.Modal.hideCurtain();
					unsafeWindow.Modal.hideWindow();
				} else {
					break;
				}
			}
		}catch(e) {
			t.Log("Mmm..."+e);
		}
	} else {
		//t.Log('hide all: '+unsafeWindow.Modal.modalid);
		unsafeWindow.Modal.hideModalAll();
	}
	if (bestAttack.type==0) {
		unsafeWindow.modal_attack(4,bestAttack.x,bestAttack.y);
	} else if (bestAttack.type==1) {
		unsafeWindow.modal_attack(1,bestAttack.x,bestAttack.y);
	}
},

nextAutoAttackWanted:null,
NextAutoAttack:function() {
	if(this.nextAutoAttackWanted!=null) {
		window.clearTimeout(this.nextAutoAttackWanted);
		this.nextAutoAttackWanted=null;
	}

	var autoAttack=this.GetAutoAttack();
	
	if(!this.options.okCities[this.autoAttackCityUpto]) {
		this.Log('Skip city set in options:'+this.autoAttackCityUpto);
		this.NextAutoAttackCity();
		return;
	}
	
	
	if(!autoAttack || (autoAttack.x!=undefined && autoAttack.x!=-1)) return;
	if(this.IsMapperRunning()) {
		this.StartReloadPageTimer();
		return;
	}
	var currentTroops=this.GetArmySize();
	var currentResources=this.GetResourcesSize();
	var mapCoord=this.GetCurrentMapCoord();
	var attacks=this.GetClosestAttacks(mapCoord.x,mapCoord.y);
	var bestAttack=this.FindBiggestCampAttack(attacks,currentTroops,currentResources);
	if(bestAttack && this.autoAttacksThisCity<10) {
		// attack closest biggest barbarian
		autoAttack.x=bestAttack.x;
		autoAttack.y=bestAttack.y;
		this.SetAutoAttack(autoAttack);
		this.autoAttackModalWaiting=true;

		var t=this;
		// *** we need to wait until the current attack box is off first.
		var waitedCount=0;
		var startAttack=function() {
			waitedCount++;
			//t.Log('waiting'+waitedCount);
			if(waitedCount>20) {
				t.Log('Forcer la fermeture du rapport d\'attaque');
				t.DoUnsafeWindow('Modal.hideModalAll();');
			}
			var attackBox=document.getElementById('modal_attack');
			if(!attackBox) {
				t.OpenAttackDialog(bestAttack);
				/*
				attackBox=document.getElementById('modal_attack');
				if(attackBox) {
					//*** for some reason it doesn't trigger DOMInserted sometimes for the "modal_attack" div
					if(t.waitForAttackBoxAppear) {
						t.OnAttackBoxAppear(attackBox);
					}
				}
				*/
				return;
			}
			window.setTimeout(function() {
				startAttack();
			},250);
		}
		startAttack();
	} else {
		autoAttack.x=autoAttack.y=-1;
		this.SetAutoAttack(autoAttack);
		// no valid attacks for this city.
		this.Log("Aucun objectif valable, attaquer d'autres cibles ou attendez que les troupes reviennent.");
		this.NextAutoAttackCity();
	}
},

/////////////////////////

RemoveEmptyReportsDivs:function() {
	var ss=document.evaluate("./div[@id='modal_msg_reports_tablediv']",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var s=0; s<ss.snapshotLength; s++) {
		var div=ss.snapshotItem(s);
		if(div.innerHTML=="") {
			div.parentNode.removeChild(div);
		}
	}
},


IterateAllianceReports:function(f) {
	return this.IterateReports('modal_alliance_reports_tablediv',0,f);
},
IterateMsgReports:function(f) {
	return this.IterateReports('modal_msg_reports_tablediv',1,f);
},

IterateReports:function(id,colStart,f) {
	this.RemoveEmptyReportsDivs();
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



recordingReports:false,
replaceReturnRe:/return[^{}]*$/,
RecordReports:function() {
	try {
		if(this.recordingReports) return;
		this.recordingReports=true;
		this.IterateMsgReports(function(a,tr,desc,x,y) {
			if(x==null || y==null) return true;
			var onclick=a.getAttribute('onclick').trim();
			if(this.IsOnclickMyselfToMyself(onclick)) {
				return true;
			}
			var attack=this.GetAttack(x,y);
			if(!attack) attack={};
			if(!attack.messages) attack.messages=[];
			var onclickWithoutReturn=onclick.replace(this.replaceReturnRe,'');
			a.href='javascript:'+onclickWithoutReturn;
			onclick=this.FixOnClick(onclick);
			var addedAlready=false;
			for(var m=0; m<attack.messages.length; m++) {
				if(attack.messages[m][1]==onclick) {
					addedAlready=true;
					break;
				}
			}
			
			var changed=false;
			if(!addedAlready) {
				attack.messages.push([desc,onclick]);
				var li=this.GetLevelInfo(attack);
				if(li) attack.levelInfo=li;
				changed=true;
			}
			if(!attack.levelInfo) {
				// to fix up old scripts where this didn't work.
				attack.levelInfo=this.GetLevelInfo(attack);
				if(attack.levelInfo) changed=true;
			}
			if(changed) {
				this.SetAttack(x,y,attack);
			}
			return true;
		});
	} finally {
		this.recordingReports=false;
	}
},

IsOnclickMyselfToMyself:function(onclick) {
	if(!onclick) return false;
	var m=this.onclickReportRe.exec(onclick);
	if(m && m[6]==m[8] && m[7]==m[9]) {
		return true;
	}
	return false;
},
DeleteWildBarbAttacks:function() {
	var deletes=0;
	this.IterateMsgReports(function(a,tr,desc,x,y) {
		var onclick=a.getAttribute('onclick');
		if(!onclick) return false;
		onclick=onclick.trim();
		var m=this.onclickReportRe.exec(onclick);
		if(this.IsOnclickMyselfToMyself(onclick)) {
			// message to myself
		} else if(m && m[5]!='0') {
			return true;
		}
		var inps=tr.getElementsByTagName('input');
		if(inps.length>=1) {
			inps[0].checked=true;
		}
		
		deletes++;
		return true;
	});
	if(deletes>0) {
		this.DoUnsafeWindow('modal_messages_reports_chkdel();');
	}
	return deletes;
},

bringUpReports:false,
AddCheckBarbarians:function() {
	//var msgBody=ById('modal_msg_reports');
	var msgBody=ById('modal_msg_reports_tablediv');
	if(!msgBody) return;
	
	var t=this;
	var closeReports=true;
	if(this.autoAttackRemoveReports) {
		var reportsRemoved=this.DeleteWildBarbAttacks();
		if(reportsRemoved==0) {
			this.autoAttackRemoveReports=false;
		} else {
			closeReports=false;
		}
	}
	if(this.bringUpReports && closeReports) {
		window.setTimeout(function() {
			t.DoUnsafeWindow('Modal.hideModalAll();');
		},t.GetRandTime(3000));
		this.bringUpReports=false;
	}
	this.ClearMessages();
	
	var a=document.createElement('a');
	var t=this;
	a.addEventListener('click',function() {
		t.DeleteWildBarbAttacks();
	},false);
	a.className='buttonDown20';
	//a.style.paddingLeft='30px';
	a.innerHTML='<span>Delete Wild/Barb/Transp</span>';
	if(msgBody.nextSibling) {
		msgBody.nextSibling.insertBefore(a,msgBody.nextSibling.childNodes[0]);
		//msgBody.nextSibling.appendChild(a);
	} else {
		msgBody.appendChild(a);
	}
},

HighlightAllianceReports:function() {
	var mapCoord=this.GetCurrentMapCoord();
	var cities=this.GetSeed().cities;
	this.IterateAllianceReports(function(a,tr,desc,x,y) {
		if(x==null || y==null) return true;
		var closestDist=999999;
		var closestLoc=null;
		for(var c=0; c<cities.length; c++) {
			var city=cities[c];
			var cityLoc={'x':city[2],'y':city[3]};
			var dist=this.CalcXYDist({'x':x,'y':y},cityLoc);
			if(dist<closestDist) { closestDist=dist; closestLoc=cityLoc; }
		}
		var onclick=a.getAttribute('onclick');
		var m=this.onclickReportRe.exec(onclick);
		if(m && m[5]=='0') {
			tr.cells[1].style.color='#888';
		}
		if(closestLoc!=null) {
			var td=tr.insertCell(-1);
			td.style.textAlign='right';
			var loctd=tr.insertCell(-1);
			AddText(loctd,closestLoc.x+','+closestLoc.y);
			AddText(td,Math.floor(closestDist) );
		}
		return true;
	});
},



IterateAttacks:function(f) {
	if(this.isChrome) {
		return;
	}
	
	var names=this.browser_listValues();
	var attackPrefix='attack_'+this.GetServerId()+'_';
	for(var n=0; n<names.length; n++) {
		var name=names[n];
		if(name.substring(0,attackPrefix.length)!=attackPrefix) continue;
		f(name,this.browser_getValue(name));
	}
},

prevClearMessages:0,
ClearMessages:function() {
	var nowSecs=new Date().getTime()/1000;
	if((this.prevClearMessages+(10*60)) > nowSecs) {
		return;
	}
	this.prevClearMessages=nowSecs;
	
	var keepReports=this.isChrome?this.options.chromeKeepReports:this.options.keepReports;
	this.Log('Effacer les anciens messages, en gardant '+keepReports);
	if(keepReports<=0) { 
		// must keep at least 1 report to get level information.
		keepReports=1; 
	}
	var t=this;
	this.IterateAttacks(function(name,value) {
		var attack=JSON2.parse(value);
		if(attack.messages && attack.messages.length>keepReports) {
			attack.messages.splice(0,attack.messages.length-keepReports+1);
		}
		t.browser_setValue(name,JSON2.stringify(attack));
	});
},


SetupClearMessages:function() {
	var t=this;
	var cm=document.createElement('input');
	cm.type='button';
	cm.id='ClearMessages';
	cm.style.display='none';
	document.body.appendChild(cm);
	cm.addEventListener('click',function(e) {
		setTimeout(function() {
			t.ClearMessages();
		},0);
	},false);
},

trainTroopsOnclick:/\(([0-9]+)\)/,
AddTrainTroopsLink:function() {
	var startObj=ById('unit_btns_start');
	if(!startObj) return;
	
	var onclick=startObj.getAttribute('onclick');
	var m=this.trainTroopsOnclick.exec(onclick);
	if(!m) {
		return;
	}
	
	var t=this;
	var type=m[1];

	var pnode=startObj.parentNode;
	var a=document.createElement('a');
	a.className='button25';
	var setTrainTroopsA=function() {
		var trainTroops=JSON2.parse(t.GetValue('TrainTroops','{}'));
		a.innerHTML='<span>'+(trainTroops[t.GetCurrentCityId()]==type?'Formation automatique':'Pas de formation automatique')+'</span>';
	}
	a.addEventListener('click',function() {
		var trainTroops=JSON2.parse(t.GetValue('TrainTroops','{}'));
		trainTroops[t.GetCurrentCityId()]=trainTroops[t.GetCurrentCityId()]==type?undefined:type;
		t.SetValue('TrainTroops',JSON2.stringify(trainTroops));
		setTrainTroopsA();
	},false);
	setTrainTroopsA();

	//pnode.appendChild(document.createElement('br'));
	AddText(pnode,' ');
	pnode.appendChild(a);
},

GetCurrentCityId:function() {
	if(!unsafeWindow.currentcityid) return null;
	return unsafeWindow.currentcityid;
},

lastTrainTroops:{},
CheckTrainTroops:function() {
	var t=this;
	if(!this.GetSeed()) return;
	var cityid=this.GetCurrentCityId();

	var trainTroops=JSON2.parse(this.GetValue('TrainTroops','{}'));
	//var trainTroops=GM_getValue('TrainTroops_'+this.GetServerId(),0);
	if(!trainTroops || !trainTroops[cityid]) {
		return;
	}
	var trainTroopId=trainTroops[cityid];

//GM_log('buildTroops'+unsafeWindow.seed.citystats["city" +cityid ]["pop"][0]+"=="+unsafeWindow.seed.citystats["city" + cityid]["pop"][1]);
	var popAvail=parseInt(unsafeWindow.seed.citystats["city" +cityid ]["pop"][0]);
	var popTotal=parseInt(unsafeWindow.seed.citystats["city" + cityid]["pop"][1]);
	var labourTotal=parseInt(unsafeWindow.seed.citystats["city" + cityid]["pop"][3]);
	var idleTotal=popTotal-labourTotal;
	var popNeeded=((t.options.percentOfPopToTrain/100)*idleTotal)+labourTotal;
//GM_log('idleTotal:'+idleTotal+', labourTotal:'+labourTotal+', popneeded:'+popNeeded);	
	if(popAvail>0 && popAvail>=popNeeded) {
		// avoid over training.
		var lastTrain=this.lastTrainTroops[cityid];
		var nowSecs=new Date().getTime()/1000;
		if(nowSecs<(lastTrain+(3*60))) { return; }
		var startButton=ById('unit_btns_start');
		
		if(!startButton) {
			// let's bring up build troops
			this.DoUnsafeWindow('modal_barracks_train('+trainTroopId+');')
			return;
		} 
		var onclick=startButton.getAttribute('onclick');
		var onclickM=/\(([0-9]+)\)/.exec(onclick);
		if(!onclickM || trainTroopId!=onclickM[1]) {
			return;
		}
		this.lastTrainTroops[cityid]=nowSecs;
		// let's build troops
		var numInp=ById('modal_barracks_num');
		var maxObj=ById('modal_barracks_max_num');
		
		if(numInp && maxObj) {
			numInp.value=maxObj.textContent;
			var t=this;
			window.setTimeout(function() {
				if(numInp.value!=maxObj.textContent) {
					t.Log('Pas de formation des troupes:'+numInp.value+'!='+maxObj.textContent);
					return;
				}
//var n=unsafeWindow.modal_barracks_train_max(6);
				onclick=onclick.replace('return false;','');
				window.setTimeout(function() {
					eval('unsafeWindow.'+onclick);
				},t.GetRandTime(500));
			},t.GetRandTime(500));
		}
	}
},



OnImpendingAttack:function() {
	var t=this;
	this.Log("Attaque imminente");
	var url=t.options.impendingAttackUrl;
	if(url!=undefined && url !="") {
		GM_openInTab(url);
	}
},
CheckImpendingAttack:function() {
	var r=false;
	var seed=this.GetSeed();
	if(seed && seed.queue_atkinc) {
		var q=0;
//		if(unsafeWindow.Object.isArray(seed.queue_atkinc)) {
			
			var keys=unsafeWindow.Object.keys(seed.queue_atkinc);
			if(keys.length>0 && keys.length<16) {
//GM_log('impppp'+keys.length);			
				r=true;
			}
//		}
	}
//GM_log('imp'+r);	
	/*
	var topNav=ById('topnav_msg');
	if(!topNav || topNav.innerHTML.length==0) return;
	
	var redIdx=topNav.innerHTML.indexOf(': red');
	var r=redIdx>=0?true:false;
	if(!r) {
GM_log('tnav'+topNav.innerHTML);
	}
	*/

	var t=this;
	var impendingAttack=this.GetValue('ImpendingAttack',false);
	if(!impendingAttack && r) {
		window.setTimeout(function() {
			t.OnImpendingAttack();
		},0);
	}
	this.SetValue('ImpendingAttack',r);
	return r;
},


/*
current_modal_msg_list:"",
CheckMessageLoad:function(page) {
	var t=this;
	var msg=ById('modal_msg_list');
	if(msg && msg.innerHTML!=t.current_modal_msg_list) {
		t.current_modal_msg_list=msg.innerHTML;
		var messageLoad=ById('MessageLoad');
		if(!messageLoad) {
			messageLoad=document.createElement('div');
			messageLoad.id='MessageLoad';
			messageLoad.style.position='absolute';
			messageLoad.style.height='600px';
			messageLoad.style.overflow='scroll';
			messageLoad.style.top='10px';
			messageLoad.style.zIndex='900000';
			messageLoad.style.border='5px solid #000';
			messageLoad.style.backgroundColor='#fff';
			document.body.appendChild(messageLoad);
		}
		var m=document.createElement('div');
		m.innerHTML=msg.innerHTML;
		messageLoad.appendChild(m);
		page++;
		this.DoUnsafeWindow("modal_messages_listshow('inbox',page);");
	}
	window.setTimeout(function() {
		t.CheckMessageLoad(page);
	},200);
},

ReadEmails:function() {
	this.current_modal_msg_list='';
	this.CheckMessageLoad();
},

*/



FactoryReset:function() {
	var names=this.browser_listValues();
	for(var n=0; n<names.length; n++) {
		this.browser_setValue(names[n],null);
	}
	this.SetOptions({});
},
FactoryResetCurrentServer:function() {
	var names=this.browser_listValues();
	var serverId=this.GetServerId();
	for(var n=0; n<names.length; n++) {
		var name=names[n];
		var sid=this.GetServerIdFromName(name);
		if(sid!=serverId) continue;
		this.browser_setValue(name,null);
	}
},
GetServerIdFromName:function(n) {
	var nArr=n.split('_');
	if(nArr.length<2) return null;
	return nArr[1];
},
ExportAllToJSON:function() {
	var names=this.browser_listValues();
	var obj={};
	var serverId=this.GetServerId();
	for(var n=0; n<names.length; n++) {
		var name=names[n];
		var sid=this.GetServerIdFromName(name);
		if(sid!=serverId) continue;
		var v=this.browser_getValue(name,null);
		if(v!=null && v!=undefined && v!="")
			obj[name]=v;
	}
	return JSON2.stringify(obj);
},
ImportAllFromJSON:function(json) {
	try {
		var obj=JSON2.parse(json);
		if(!obj) { return; }
		this.FactoryResetCurrentServer();
		var serverId=this.GetServerId();
		for(var name in obj) {
			var sid=this.GetServerIdFromName(name);
			if(sid!=serverId) continue;
			this.browser_setValue(name,obj[name]);
		}
	} catch(e) {
		window.alert('Échec de l\'importation'+e);
	}
},

SetupMenu:function() {
	var t=this;
	GM_registerMenuCommand('KOCAttack - Options',function() {
		t.ShowOptionsDialog();
	});
	GM_registerMenuCommand('KOCAttack - Attaque automatique',function() {
		t.ToggleAutoAttack();
	});
	GM_registerMenuCommand('KOCAttack - Factory Reset!',function() {
		t.FactoryReset();
	});
},




/*
TimeoutZero:function(f,arg) {
	setTimeout(function() {
		f(arg);
	},0);
},
*/


pageLoaded:false,
prevCurrentCity:-1,
idStatus:{},
ResetIdStatus:function() {
	this.idStatus={};
},
Listen:function() {
	var t=this;
	t.SetupMenu();
	this.GetValuesCache();

	t.ResetAutoAttackTarget();
	this.options=this.GetOptions();
	this.startListenTime=new Date();
	window.setTimeout(function() {
		if(!t.pageLoaded && t.GetAutoAttack() && !t.IsMapperRunning()) {
			GM_log("Oups, problème le jeu ne s'est pas chargé au bout de 60 secondes. Rechargement.");
			t.SetValuesCache();
			window.location.reload(true);
			//window.history.go(0);
		}
	},t.GetRandTime(60*1000));
	
	if(t.GetAutoAttack()) {
		window.setTimeout(function() {
			// press start on the poc timer after we reload
			if(unsafeWindow.poctoggletimer && unsafeWindow.ispaused) {
				unsafeWindow.poctoggletimer();
			}
		},5000);
	}

	var domTickTimer=null;
	var domTickUpto=0;
	var domTick=function(e) {
		//if(e.target.className && !/(chat|city|slot)/.exec(e.target.className)) GM_log('xxx:'+e.target.className);
		//if(e.target.id && e.target.id!='tooltip' && e.target.id('_l_')<0 && e.target.id.substring(0,2)!='l_' && e.target.id.substring(0,8)!='citysel_') GM_log('id:'+e.target.id);
		var cityId=t.GetCurrentCityId();
		var cityChanged=cityId!=t.prevCurrentCity?true:false;
		if(cityChanged) {
			t.prevCurrentCity=cityId;
		}
		if((domTickUpto%20)==0) {
			t.CheckImpendingAttack();
		}

		if(cityChanged && cityId!=null) {
			// changed city
			setTimeout(function() {
				t.AddOptionsLink();
				t.DrawClosestFarms();
			},0);
			setTimeout(function() {
				t.CheckAutoRaiseGold();
				t.CheckAbandonWilds();
				t.CheckTrainTroops();
			},1000);
			setTimeout(function() {
				t.NextAutoAttack();
			},5000);
		} 
		//if(e.target.id) GM_log('ttt'+e.target.id);

		var funcsById={
			'castleModalTabs':function(target) {
				t.OnCastleBoxAppear(target.parentNode);
			},
			'marketmain_bdy':function(target) {
				t.OnMarketBoxAppear(target);
			},
			'modal_attack':function(target) {
				window.setTimeout(function() {
					t.OnAttackBoxAppear(target);
				},250);
			},
			'barracks_train':function(target) {
				t.AddTrainTroopsLink();
				t.CheckTrainTroops();
			},
		};
		
		/*
		if(e.target.id && funcsById[e.target.id]) {
			funcsById[e.target.id](e.target);
		} else 
		*/
		//if(e.target.className.indexOf('modalBox')>=0) {
		var funcCalled=0;
		if(funcCalled==0) {
			for(var id in funcsById) {
				var f=funcsById[id];
				var div=ById(id);

				if(!t.idStatus[id] && div) {
					var fcall=function(func,d) {
						funcCalled++;
						setTimeout(function() {
							try {
								func(d);
							} finally {
								funcCalled--;
							}
						},0);
					}
					fcall(f,div);

					//t.TimeoutZero(f,div);
				}
				var divStatus=div?true:false;
				if(divStatus!=t.idStatus[id]) {
					//t.Log("Status changed:"+id+","+divStatus);
				}
				t.idStatus[id]=divStatus;
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

	var withinDomInserted=false;
	document.body.addEventListener('DOMNodeInserted',function(e) {
		if(withinDomInserted) return;
		var isStatuses=(e.target.className && e.target.className=='statues')?true:false;
		if(isStatuses)
			t.pageLoaded=true;
		if(e.target.id && e.target.id=='tooltip') {
			withinDomInserted=true;
			setTimeout(function() {
				try {
					t.DrawLevelIcons();
					t.OnToolTipAppear(e.target);
				} finally {
					withinDomInserted=false;
				}
			},0);
		} else if(e.target.className && e.target.className.indexOf('modal_msg_reports')>=0) {
			withinDomInserted=true;
			setTimeout(function() {
				try {
					t.RecordReports();
					t.AddCheckBarbarians();
					t.HighlightAllianceReports();
				} finally {
					withinDomInserted=false;
				}
			},0);
		}
	},false);
	domTick();
},


/*
AClearMessages:function() {
	GM_log('ClearMessages');
	var names=GM_listValues();
	var attackPrefix='attack_'+this.GetServerId()+'_';
	for(var n=0; n<names.length; n++) {
		var name=names[n];
		if(name.substring(0,7)!="attack_") continue;
		GM_setValue(attackPrefix+name.substring(7),GM_getValue(name));
	}
}
*/


};

/*
if(location.href.indexOf('apps.facebook.com')>=0) {

var FixFacebook={

	FixIFrame:function() {
		var iframe=nHtml.FindByXPath(document,"//iframe[contains(@class,'canvas_iframe_util')]");
		while(iframe) {
			iframe.style.overflow='visible';
			iframe.style.width=window.innerWidth+'px';
			iframe=iframe.parentNode;
			if(iframe.tagName=='BODY') break;
//			if(iframe.id && iframe.id.indexOf('content')>=0) { break; }
//			if(iframe.className && iframe.className.indexOf('UIStandardFrame_Content')>=0) { break; }
		}
	}

};

FixFacebook.FixIFrame();

}
*/


KOCAttack.Listen();
KOCAttack.SetupClearMessages();





function SetupQuickMarchButton(useRetryMarch) {
/*
	var retryMarch='var retryMarch=function() { alert("retrying march"); new (Ajax.Request)(g_ajaxpath + "ajax/march.php" + g_ajaxsuffix, {'+
		'method: "post",'+
        'parameters: params,'+
        'onSuccess: function (transport) {'+
            'var rslt = eval("(" + transport.responseText + ")");'+
            'if (!rslt.ok) {'+
				'if(rslt.error_code==3) {'+
					'window.setTimeout(function() { retryMarch(); },1000); '+
				'} else {'+
					'alert("March Error:"+rslt.msg);'+
				'}'+
			'}'+
		'}'+
	'}); };';
*/
	var retryMarch='var retryMarch=function() { '+
		'new (Ajax.Request)(g_ajaxpath + "ajax/march.php" + g_ajaxsuffix, {'+
		'method: "post",'+
        'parameters: params,'+
        'onSuccess: function(transport) {  marchSuccess(transport); },'+
        'onFailure: function () {  Modal.hideModalAll(); }'+
	'}); };';
	if(!useRetryMarch) {
		retryMarch='var retryMarch=function() { return; };';
	}
	
	var modalAttackReplaces=[
		// *** it says "new Ajax" in the source but firefox converts it to new (Ajax
		['modal_attack_do','modal_attack_doOld'],
		['onSuccess:','onSuccess: marchSuccess='],
//		['Modal.showAlert(printLocalError(','if(rslt.error_code==3 || rslt.error_code==8) { try {retryMarch(); } catch(e) { alert("retry failed:"+e); }  } else { Modal.hideModalAll(); }  Modal.showAlert(printLocalError('],
		['Modal.showAlert(printLocalError(','if(rslt.error_code==3 || rslt.error_code==8) { try {window.setTimeout(function() { retryMarch(); },(3*1000)); } catch(e) { alert("retry failed:"+e); }  } else { Modal.hideModalAll(); }  Modal.showAlert(printLocalError(']
	];
	
	
	var attack_generatequeueReplaces=[
		['attack_generatequeue','attack_generatequeueOld'],
		['class=\\"army\\">" + g_js_strings.commonstr.army + ": "','style=\\"width: 145px !important\\" class=\\"army\\">"'],
		['class=\\"name','style=\\"width: 0px !important; display: none;\\" class=\\"name'],
		['var u = 0;','var u = "K:"+seed.knights["city" + currentcityid]["knt" + q].combat+", "; '],
		['u += parseInt','var x = parseInt'],
		['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+r][0]; u+=uname[0]+uname[uname.length-1]+":"+x+", "; } '],
		//[/123/g,'100']
	];
	
	if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		modalAttackReplaces.push(['new Ajax',"var marchSuccess=null; "+retryMarch+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew Ajax"]);
	} else {
		modalAttackReplaces.push(['new (Ajax',"var marchSuccess=null; "+retryMarch+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew (Ajax"]);
	}

	if(!useRetryMarch) modalAttackReplaces.push(['Modal.hideModalAll();','']);
	var replaceFunc=function(name,replaces) {
		var modalAttackFunc=window[name].toString();
		var nameOld=name+'Old';
		for(var a=0; a<replaces.length; a++) {
			var repI=replaces[a];
			var found=false;
			if(typeof(repI[0])=="object") {
				found=repI[0].exec(modalAttackFunc)?true:false;
			} else {
				found=modalAttackFunc.indexOf(repI[0])>=0?true:false;
			}
			if(!found) {
				alert("modalAttackReplace: cannot find: "+repI[0]+','+modalAttackFunc);
			}
			
			modalAttackFunc=modalAttackFunc.replace(repI[0],repI[1]);
		}

		try {
			window[nameOld]=eval(modalAttackFunc);
//alert(window[nameOld].toString());			
		} catch(e) {
			alert(e+', bad func:'+modalAttackFunc);
		}

		window[name]=function() {
			// let our stuff in addListener run first.
			window.setTimeout(function() {
				eval(nameOld+'();');
			},100);
		}
	};
	
	replaceFunc('modal_attack_do',modalAttackReplaces);
	replaceFunc('attack_generatequeue',attack_generatequeueReplaces);

/* BAD: updateSeed.php doesn't return cityUnits
    var params = Object.clone(g_ajaxparams);
    new Ajax.Request(g_ajaxpath + "ajax/updateSeed.php" + g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
alert(message.responseText);
		}
	});
*/
}

/*
function SetupClearMessages() {
	modal_messages_reports_chkdelOld=modal_messages_reports_chkdel;
	modal_messages_reports_chkdel=function(type) {
		var d=document.createElement('div');
		d.id='modal_msg_reports_tablediv';
		document.body.appendChild(d);
		modal_messages_reports_chkdelOld(type);
		if(type=='deleteAll') {
			document.getElementById('ClearMessages').click();
		}
	};
}
*/

function CreateMsgDiv() {
	var m=document.getElementById('KOCAttackMsgDiv'); 
	if(!m) { 
		var ml=document.getElementById('modal_msg_list'); 
		if(!ml) {
			ml=document.createElement('div'); 
			ml.id='modal_msg_list'; 
		}
		m=document.createElement('div'); 
		m.style.position='absolute';
		m.style.top='0px';
		m.style.left='0px';
		m.style.width='700px';
		m.style.zIndex='900000';
		m.style.border='5px solid #000';
		m.style.backgroundColor='#fff';
		//m.id='modal_attack';
		var close=document.createElement('a');
		close.addEventListener('click',function() {
			m.style.display='none';
			m.removeChild(ml);
		},false);
		close.innerHTML='Close';
		close.style.fontSize='20px';
		
		var center=document.createElement('center'); 
		center.appendChild(close);
		m.appendChild(center);
		m.appendChild(ml);
		
		if(!document.getElementById('modal_msg_list_pagination')) { 
			p=document.createElement('div'); p.id='modal_msg_list_pagination'; 
			ml.appendChild(p);
		}
		//document.body.insertBefore(m,document.body.childNodes[0]);
		document.body.appendChild(m);
	}
	m.style.display='block';
	return m;
}

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

SetupScripts();