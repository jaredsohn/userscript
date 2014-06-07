// ==UserScript==
// @name           KOCAttack
// @namespace      KOCAttack
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @require http://sizzlemctwizzle.com/updater.php?id=76594
// ==/UserScript==


/*

* Shows you the "title" number when you mouse over a city instead of the name which doesn't always change with the title number and it's not easy to know which name is higher than which.

* You can right click on "view report" in your messages and pick "bookmark/copy link", you can use that link again when you're back in the message board or send it to other people.
	
* If you click "delete all" in your reports, it'll delete everything from the list of messages if you want to clear that.  You can delete individual reports and they'll still work in the attack dialog, I don't know when the server actually deletes them.

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

	div.style.display='block';
	div.innerHTML='';
	this.options=this.GetOptions();
	div.innerHTML="<form>"+
		"Attack Order: <select id='KOCAttackOrder'><option value='mostTroops'>Use most troops first</option><option value='closest'>Closest targets first</option></select><br />"+
		"Attack Type: <select id='KOCAttackType'><option value='Camp'>Camp</option><option value='CampCity'>Camp and City</option><option value='Wilderness'>Wilderness (may lose troops if the militiamen attack does not work)</option></select><br />"+
		"<input id='KOCAttackRemoveReports' type='checkbox' "+(this.options.autoRemoveReports?'checked':'')+" /> Auto remove barbarian/wilderness attack reports.<br />"+
		"<hr />"+
		"<input id='KOCAttackKeepReports' value='"+this.options.keepReports+"' size='3' /> attack reports to keep maximum in the attack dialog.<br />"+
		"<input id='KOCAttackRandom' value='"+this.options.randomPercent+"' size='3' />% random adjustment for all delays (to look more human).<br />"+
		"<input id='KOCAttackDelay' value='"+this.options.attackDelay+"' size='3' /> seconds inbetween sending each attack<br />"+
		"<input id='KOCAttackCitiesDelay' value='"+this.options.waitAfterCitiesDone+"' size='3' /> seconds to wait before refreshing after all cities have finished attacking.<br />"+
		"<input id='KOCAttackHoursSinceLastCamp' value='"+(this.options.attackSecsSinceLastCamp/(60*60))+"' size='3' /> hours inbetween attacking the same camp/wilderness<br />"+
		"<input id='KOCAttackHoursSinceLastCity' value='"+(this.options.attackSecsSinceLastCity/(60*60))+"' size='3' /> hours inbetween attacking the same city<br />"+
		"<input id='KOCAttackMaxDistance' value='"+(this.options.attackMaxDistance)+"' size='3' /> max distance away from city to attack.<br />"+
		"<input id='KOCAttackCitiesDoneMax' value='"+(this.options.autoAttackCitiesDoneMax)+"' size='3' /> max number of times to cycle thru all the cities before reloading the web page.<br />"+
		"<input id='KOCAttackRetryMarch' type='checkbox' "+(this.options.retryMarch?'checked':'')+" /> Retry march if it has unknown error (press reload after changing this option).<br />"+
		"<input id='KOCAttackNoViewReports' type='checkbox' "+(this.options.noViewReports?'checked':'')+" /> Disable viewing of reports, this will also disable collecting of reports for the attack page.<br />"+
		"<a id='KOCAttackOptionsSave' class='button20'><span>Save</span></a> <a id='KOCAttackOptionsCancel' class='button20'><span>Cancel</span></a> <a id='KOCAttackOptionsReset' class='button20'><span>Reset</span></a></form>";
	var t=this;

	nHtml.SetSelect(ById('KOCAttackType'),this.options.attackType);
	nHtml.SetSelect(ById('KOCAttackOrder'),this.options.attackOrder);
	ById('KOCAttackOptionsCancel').addEventListener('click',function() {
		div.style.display='none';
	},false);
	ById('KOCAttackOptionsReset').addEventListener('click',function() {
		t.ClearOptions();
		this.options=t.GetOptions();
		div.style.display='none';
	},false);
	

	ById('KOCAttackOptionsSave').addEventListener('click',function() {
		t.options.attackDelay=parseInt(ById('KOCAttackDelay').value);
		t.options.waitAfterCitiesDone=parseInt(ById('KOCAttackCitiesDelay').value);
		t.options.keepReports=parseInt(ById('KOCAttackKeepReports').value);
		
		t.options.attackSecsSinceLastCamp=parseFloat(ById('KOCAttackHoursSinceLastCamp').value)*60*60;
		t.options.attackSecsSinceLastCity=parseFloat(ById('KOCAttackHoursSinceLastCity').value)*60*60;
		t.options.randomPercent=parseFloat(ById('KOCAttackRandom').value);
		t.options.attackMaxDistance=parseFloat(ById('KOCAttackMaxDistance').value);
		t.options.autoAttackCitiesDoneMax=parseInt(ById('KOCAttackCitiesDoneMax').value);

		t.options.attackOrder=ById('KOCAttackOrder').value;
		t.options.attackType=ById('KOCAttackType').value;
		
		t.options.autoRemoveReports=ById('KOCAttackRemoveReports').checked;
		t.options.retryMarch=ById('KOCAttackRetryMarch').checked;
		t.options.noViewReports=ById('KOCAttackNoViewReports').checked;

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
	a.innerHTML='<span>'+html+'</span>';
	var tabs=ById('main_engagement_tabs');
	if(tabs) {
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
	var mess=this.GetStatusMessage();
	var toggle=ById('KOCAttackToggle');
	if(!toggle) {
		var t=this;
		toggle=document.createElement('a');
		toggle.id='KOCAttackToggle';
		toggle.style.color='#c00000';
		toggle.addEventListener('click',function() {
			var a=t.GetAutoAttack();
			if(!a) {
				t.SetAutoAttack({'barbarian':true});
				t.RestartAutoAttack();
			} else {
				t.ClearAutoAttackTimeout();
				t.SetAutoAttack(null);
			}
			t.SetAttackStatusMessage();
		},false);
		AddText(mess,' ');
		mess.appendChild(toggle);
	}
	var autoAttack=this.GetAutoAttack();
	if(autoAttack) {
		toggle.innerHTML='Auto attack'+(autoAttack.barbarian?' Barbarians':'');
	} else {
		toggle.innerHTML='No auto attack';
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

GetValue:function(prefix,def,func) {
	var n=prefix+'_'+this.GetServerId();
	if(this.isChrome) {
		chrome.extension.sendRequest({func:"get","n":n}, 
		function(response) {
			if(func) func(response);
		});
		return def;
	}
	return GM_getValue(n,def);
},
SetValue:function(prefix,val) {
	var n=prefix+'_'+this.GetServerId();
	if(this.isChrome) {
		chrome.extension.sendRequest({func:"set","n":n,"v":v}, 
		function(response) {
		});
		return;
	}
	GM_setValue(n,val);
},
GetMinHours:function() {
	return this.GetValue('MinHours',1);
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
	var defOptions={"attackDelay":15,"attackType":"Camp","attackOrder":"closest","autoRemoveReports":true,"attackSecsSinceLastCity":60*60*12,"attackSecsSinceLastCamp":3600,"randomPercent":20,"keepReports":10,"attackMaxDistance":60,"waitAfterCitiesDone":15,"autoAttackCitiesDoneMax":3,"changeCitySecs":5,"retryMarch":false,"noViewReports":false};
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
	GM_setValue(this.GetAttackName(x,y),
		JSON2.stringify(attack));
},
GetAttack:function(x,y) {
	if(this.isChrome) {
		return null;
	}
	var str=GM_getValue(this.GetAttackName(x,y),'');
	if(!str) return null;
	return JSON2.parse(str);
},

IsFirstAttackAtLocation:function(x,y) {
	if(!this.prevAttack) return true;
	return ((this.prevAttack.x==x && this.prevAttack.y==y)?false:true);
},

GetGuiCoords:function() {
	var x=ById('modal_attack_target_coords_x');
	var y=ById('modal_attack_target_coords_y');
	return [x.value,y.value];
},

SetAttackFromGui:function(box) {
	var xy=this.GetGuiCoords();
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
		throw("Cannot find attack type");
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

		if((troops[2]+troops[10])==totalTroops && firstAttack) {
			// nothing but militiamen/ballista, anti defence attack
			attack.militiaonly=troops;
		} else {
			attack.time=nowSecs;
			if(firstAttack) { attack.militiaonly=undefined; }
			attack.troops=troops;
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
			this.SetAttack(x,y,attack);
			this.Log(x+','+y+' attack setup');
		}
	}
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
	AddHtml(bulkAddDiv,"Copy and paste coords here (ie. 343,434) one on each line...<br />Note: it will only add the target using the current number of troops on this screen.<br /><input id='KOCAttackBulkAddForce' type='checkbox' /> Overwrite existing attack if one already exists<br />");

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
		t.BulkAddCoords(box,coords.value,ById('KOCAttackBulkAddForce').checked);
		bulkAddDiv.style.display='none'; 
		bulkAddAttackLink.style.display='inline'; 
	},false);
	AddHtml(bulkAddDiv,"<br />");

	var bulkAddAttackLink=document.createElement('a');
	bulkAddAttackLink.className='buttonDown20';
	bulkAddAttackLink.innerHTML='<span>Bulk add coords</span>';
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
		throw("Cannot find attack type");
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


SetTroopInput:function(num,troopCount) {
	var troop=ById('modal_attack_unit_ipt'+num);
	if(!troop) return null;
	troop.value=troopCount;
	troop.style.backgroundColor='';

	// send a shift key so that it recalculates
	var evt = document.createEvent("KeyboardEvent");
	evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	troop.dispatchEvent(evt);

	if(parseInt(troopCount)>0) {
		if(troop.value!=troopCount) {
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
	return this.GetValue('AutoGold_'+this.GetCurrentCityId(),false);
},
SetAutoGold:function(v) {
	return this.SetValue('AutoGold_'+this.GetCurrentCityId(),v);
},

CheckAutoRaiseGold:function() {
	if(!this.GetAutoGold()) return;
	var happiness=unsafeWindow.seed.citystats["city" + this.GetCurrentCityId()].pop[2];
	if(happiness>=99) {
		unsafeWindow.modal_raise_gold();
	}
},

OnCastleBoxAppear:function(box) {
	var raiseGold=nHtml.FindByXPath(box,".//a[contains(@onclick,'raiseGold')]");
	var a=document.createElement('a');
	a.className='button25';
	var t=this;
	function SetAutoGoldA() {
		var str=t.GetAutoGold()?'Auto':'No auto';
		a.innerHTML='<span>'+str+'</span>';
	}
	a.addEventListener('click',function() {
		var autoGold=t.GetAutoGold();
		t.SetAutoGold(autoGold?false:true);
		SetAutoGoldA();
	},false);
	SetAutoGoldA();
	raiseGold.parentNode.insertBefore(a,raiseGold.nextSibling);
},

OnMarketBoxAppear:function(box) {
	var amt=ById('marketmod_amount');
	if(amt) amt.value='999000';
	var price=ById('marketmod_price');
	if(price) price.value='1';
},

nextAutoAttackTimeout:null,
onclickTimeRe:/,([0-9]+),[0-9]+,[0-9]+,[0-9]+[^,]*$/,
waitForAttackBoxAppear:false,
OnAttackBoxAppear:function(box) {
	this.waitForAttackBoxAppear=false;
	if(ById('KocAttackComment')) {
		//this.Log("We already have an attack dialog opened");
		return;
	}

	var btnMarch=ById('btnMarch');
	var t=this;
	if(!btnMarch) { return; }
	btnMarch.addEventListener('click',function(e) {
		window.setTimeout(function() {
			t.SetAttackFromGui(box);
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
	AddText(div,'Comment:');
	div.appendChild(document.createElement('br'));
	div.appendChild(comment);
	div.appendChild(document.createElement('br'));

	var ignore=document.createElement('input');
	ignore.type='checkbox';
	div.appendChild(ignore);
	AddText(div,'Ignore in closest list');
	div.appendChild(document.createElement('br'));
	
	var xy=this.GetGuiCoords();
	var attack=this.GetAttack(xy[0],xy[1]);
	var notFull=false;
	var knightSelect=ById('modal_attack_knight')
	var totalTroops=0;
	if(attack) {
		ignore.checked=attack.ignore?true:false;
		if(attack.time) {
			AddHtml(div,'Last attack: '+SecsToStr(nowSecs-attack.time)+' ago<br />');
		}
		if(attack.comment)
			comment.value=attack.comment;
		
		var attackTypeSelect=ById('modal_attack_atktype');
		// only fill things in if we're in attack mode.
		if(attackTypeSelect.selectedIndex==0) {
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
						notFull=true;
					}
				}
			}

			//attackTypeSelect.selectedIndex=attack.type;
			knightSelect.selectedIndex=1+Math.floor(Math.random()*(knightSelect.options.length-1));
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
	} 
	
	var ChangeAttack=function() {
		var xy=t.GetGuiCoords();
		var attack=t.GetAttack(xy[0],xy[1]);
		if(!attack) attack={};
		
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
		if(totalTroops>0 && knightSelect.options.length>1
		&& !notFull 
		&& btnMarch.style.opacity!=0.5
		) {
			this.Log('Auto attack:'+xy[0]+','+xy[1]+', from city:'+this.autoAttackCityUpto);
			var t=this;
			window.setTimeout(function() {
				t.autoAttacksThisCity++;
				nHtml.Click(btnMarch);
				
				window.setTimeout(function() {
						var mist=nHtml.FindByXPath(document,".//div[@class='mistwarn']");
						if(mist) {
							unsafeWindow.Modal.hideModal();
							unsafeWindow.modal_attack_do();
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
				this.Log('Cannot continue auto attacking, about to attack or change city');
			}
			return;
		} else {
			this.Log('auto attack, not enough troops/knights: '+xy[0]+','+xy[1]);
			unsafeWindow.Modal.hideModal();
			this.NextAutoAttackCity();
		}
	}
},

coordsRe:/\(([0-9]+),([0-9]+)\)/,
maptileRe:/modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/,

OnToolTipAppear:function(box) {
	var box1=box.childNodes[0];
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
'51':'Camp',
'10':'Grassland',
'11':'Lake',
'20':'Forest',
'30':'Hills',
'40':'Mountains',
'50':'Plain',
'0':'Bog'
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
		return {'type':type,'level':m[4]};
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
				owner=" "+onclickM[6].StripQuotes()+'<br />Might:'+might;
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
		GM_log('Cannot find x coord box: '+xId);
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
		var attack=JSON2.parse(value);
		if(!attack) return;
		if(attack.ignore) return;
		
		var dist=t.CalcXYDist({'x':xy[0],'y':xy[1]},{'x':x,'y':y});
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

GetLevelInfo:function(attack) {
	if(!attack) throw('GetLevelInfo: attack is null');
	var levelI=attack.levelInfo;
	if(!levelI) {
		levelI=this.FindLevelFromMessages(attack);
	}
	return levelI;
},

FindBiggestCampAttack:function(attacks,currentTroops) {
	var bestAttack=null;
	var bestAttackSize=0;
	var bestAttackDist=10000;
	var nowSecs=new Date().getTime()/1000;

	var wilderness={
		'Lake':1,
		'Mountains':1,
		'Woods':1,
		'Plain':1,
		'Hills':1,
		'Grassland':1
	};
	for(var a=0; a<attacks.length; a++) {
		var attack=attacks[a];
		var levelInfo=this.GetLevelInfo(attack.a);
		if(!levelInfo) continue;
		if(this.options.attackType=='Camp') {
			if(levelInfo.type!='Camp') continue;
		} else if(this.options.attackType=='Wilderness') {
			if(!wilderness[levelInfo.type]) continue;
		} else {
			if(this.options.attackType!='CampCity') {
				this.Log("Unknown attack type:"+this.options.attackType);
			}
			if(levelInfo.type!='' && levelInfo.type!='Camp') continue;
		}
		if(!attack.a.troops) continue;
		if(attack.a.ignore) continue;
		if(attack.dist>=this.options.attackMaxDistance) { continue; }
		
		if(!this.IsEnoughTroops(currentTroops,attack.a.troops)) {
			continue;
		}
		var lastAttack=nowSecs-parseInt(attack.a.time);
	
		if(levelInfo.type=='') {
			if(lastAttack<this.options.attackSecsSinceLastCity) continue;
		} else {
			if(lastAttack<this.options.attackSecsSinceLastCamp) continue;
		}
		var armySize=0;
		for(var t=0; t<attack.a.troops.length; t++) {
			if(!attack.a.troops[t]) continue;
			armySize+=parseInt(attack.a.troops[t]);
		}
		if(armySize==0) continue;
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
	return JSON2.parse(aStr);
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

GetCurrentMapCoord:function() {
	var xcoord=ById('mapXCoor');
	var ycoord=ById('mapYCoor');
	return {'x':xcoord.value,'y':ycoord.value};
},

hrsInput:null,
viewTypeOnly:"",
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
		titleA.innerHTML='Attacks ';
		titleA.title='Closest attacks, more than ? hrs since last attack';
		titleA.style.cursor='pointer';
		titleA.addEventListener('click',function() {
			div.style.display=div.style.display=='block'?'none':'block';
			setTimeout(function() {
				GM_setValue('ClosestFarmDisplay',div.style.display);
			},0);
		},false);
		
		var viewTypeOnlyInp=document.createElement('input');
		viewTypeOnlyInp.style.width='10px';
		viewTypeOnlyInp.style.fontSize="8px";
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
		bookmark.appendChild(viewTypeOnlyInp);
		bookmark.appendChild(document.createElement('br'));
	}
	div.innerHTML='';
	div.id='ClosestFarms';
	div.style.overflow='scroll';
	div.style.height='200px';
	div.style.display=this.GetValue('ClosestFarmDisplay','block');

	var currentTroops=this.GetArmySize();

	var mapCoord=this.GetCurrentMapCoord();
	var nowSecs=new Date().getTime()/1000;
	var attacks=this.GetClosestAttacks(mapCoord.x,mapCoord.y);
	//var bestAttack=this.FindBiggestCampAttack(attacks,currentTroops);
	var GoClosestFarm=function(e) {
		var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
		unsafeWindow.setBookmarkCoord(xy[0],xy[1]);
	};
	var AttackClosestFarm=function(e) {
		var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
		unsafeWindow.modal_attack(4,xy[0],xy[1]);
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
	var minHrsSinceAttack=parseFloat(this.hrsInput.value);
	var viewType=this.viewTypeOnly.trim().toUpperCase();
	for(var aUpto=0; aDone<80 && aUpto<attacks.length; aUpto++) {
		var attackI=attacks[aUpto];

		//attackI.a.levelInfo=this.FindLevelFromMessages(attackI.a);
		//this.SetAttack(attackI.x,attackI.y,attackI.a);

		var lastAttack=nowSecs-parseInt(attackI.a.time);
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
		
		var aDelete=document.createElement('a');
		aDelete.innerHTML='X';
		aDelete.title='Ignore';
		aDelete.addEventListener('click',function(e) { IgnoreFarm(e); },false);
		tr.insertCell(-1).appendChild(aDelete);
		
		aDone++;
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
	if(!unsafeWindow.seed) return;
	var armyDiv=ById('cityinfo_3');
	var units=unsafeWindow.seed.units["city"+unsafeWindow.currentcityid];
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

OpenViewReports:function() {
	unsafeWindow.modal_messages();
	unsafeWindow.track_chrome_btn("messages_btn");
	unsafeWindow.modal_messages_viewreports();
},

//autoAttackCitiesDoneMax:3,
autoAttackCitiesDone:0,
autoAttackCityUpto:1,
autoAttackModalWaiting:false,
autoAttackTimeout:null,
ClearAutoAttackTimeout:function() {
	if(this.autoAttackTimeout) {
		this.Log('timer killed');
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
	this.Log('refreshing in '+secs+' secs, all cities done:'+this.autoAttackCityUpto);
	this.ClearAutoAttackTimeout();
	this.autoAttackTimeout=window.setTimeout(function() {
		t.autoAttackTimeout=null;
		if(t.IsMapperRunning()) {
			t.Log("Waiting for mapping to finish");
			// don't reload until the mapper has finished.
			window.setTimeout(function() {
				t.StartReloadPageTimer(10*60);
			},0);
			return;
		}
		window.location.reload();
	},t.GetRandTime(1000*secs));
},

NextAutoAttackCity:function() {
	var t=this;
	var autoAttack=this.GetAutoAttack();
	if(!autoAttack) return;
	// change to next city
	this.autoAttacksThisCity=0;

	var cityA=null;
	while(true) {
		cityA=ById('citysel_'+this.autoAttackCityUpto);
		if(cityA && cityA.className && cityA.className.indexOf('city_selected')>=0) {
			this.autoAttackCityUpto++;
		}
		break;
	}
	if(!cityA) {
		// go back to the 1st city
		//this.Log('Start from 1st city again');
		if(!this.options.noViewReports) {
			this.OpenViewReports();
			if(this.options.autoRemoveReports) {
				this.autoAttackRemoveReports=true;
			}
		}

		this.autoAttackCityUpto=1;
		this.autoAttackCitiesDone++;
		cityA=ById('citysel_'+this.autoAttackCityUpto);
	}
	if(!cityA || this.autoAttackCitiesDone>=this.options.autoAttackCitiesDoneMax) {
		// ran out of cities, let's refresh in a minute
		this.StartReloadPageTimer();

		return;
	} else {
		if(!this.nextAutoAttackTimeout) {
			this.Log('change city:'+this.autoAttackCityUpto+', loop:'+this.autoAttackCitiesDone);
			this.nextAutoAttackTimeout=setTimeout(function() {
				t.nextAutoAttackTimeout=null;
				nHtml.Click(cityA);
			},t.GetRandTime(1000*t.options.changeCitySecs));
		} else {
			this.Log('cannot change city, about to attack or change city');
		}
		this.autoAttackCityUpto++;
	}
},

NextAutoAttack:function() {
	var autoAttack=this.GetAutoAttack();
	if(!autoAttack) return;
	if(this.IsMapperRunning()) {
		this.StartReloadPageTimer();
		return;
	}
	
	var currentTroops=this.GetArmySize();
	var mapCoord=this.GetCurrentMapCoord();
	var attacks=this.GetClosestAttacks(mapCoord.x,mapCoord.y);
	var bestAttack=this.FindBiggestCampAttack(attacks,currentTroops);
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
			if(waitedCount>20) {
				unsafeWindow.Modal.hideModalAll();
			}
			var attackBox=document.getElementById('modal_attack');
			if(!attackBox) {
				t.waitForAttackBoxAppear=true;
				unsafeWindow.modal_attack(4,bestAttack.x,bestAttack.y);
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
		this.Log("No valid targets, need to attack more targets or wait for troops to return.");
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
		unsafeWindow.modal_messages_reports_chkdel();
	}
	return deletes;
},

AddCheckBarbarians:function() {
	//var msgBody=ById('modal_msg_reports');
	var msgBody=ById('modal_msg_reports_tablediv');
	if(!msgBody) return;
	
	var t=this;
	if(this.autoAttackRemoveReports) {
		if(this.DeleteWildBarbAttacks()==0) {
			this.autoAttackRemoveReports=false;
			window.setTimeout(function() {
				unsafeWindow.Modal.hideModalAll();
			},t.GetRandTime(1000));
		}
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
	var cities=unsafeWindow.seed.cities;
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
	
	var names=GM_listValues();
	var attackPrefix='attack_'+this.GetServerId()+'_';
	for(var n=0; n<names.length; n++) {
		var name=names[n];
		if(name.substring(0,attackPrefix.length)!=attackPrefix) continue;
		f(name,GM_getValue(name));
	}
},

prevClearMessages:0,
ClearMessages:function() {
	var nowSecs=new Date().getTime();
	if((this.prevClearMessages+(10*60))>nowSecs) {
		return;
	}
	this.prevClearMessages=nowSecs;
	
	var keepReports=this.options.keepReports;
	this.Log('Clear old messages, keeping '+keepReports);
	this.IterateAttacks(function(name,value) {
		var attack=JSON2.parse(value);
		if(attack.messages && attack.messages.length>keepReports) {
			attack.messages.splice(0,attack.messages.length-keepReports+1);
		}
		GM_setValue(name,JSON2.stringify(attack));
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
		a.innerHTML='<span>'+(t.GetValue('TrainTroops_'+t.GetCurrentCityId(),'')==type?'Auto training':'No auto training')+'</span>';
	}
	a.addEventListener('click',function() {
		var n='TrainTroops_'+t.GetCurrentCityId();
		t.SetValue(n,t.GetValue(n,'')==type?'':type);
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
	if(!unsafeWindow.seed) return;
	var cityid=this.GetCurrentCityId();

	var trainTroops=this.GetValue('TrainTroops_'+cityid,'');
	//var trainTroops=GM_getValue('TrainTroops_'+this.GetServerId(),0);
	if(!trainTroops) {
		return;
	}

//GM_log('buildTroops'+unsafeWindow.seed.citystats["city" +cityid ]["pop"][0]+"=="+unsafeWindow.seed.citystats["city" + cityid]["pop"][1]);
	var popAvail=parseInt(unsafeWindow.seed.citystats["city" +cityid ]["pop"][0]);
	var popTotal=parseInt(unsafeWindow.seed.citystats["city" + cityid]["pop"][1]);

	if(popAvail>0 && popAvail>=popTotal) {
		// avoid over training.
		var lastTrain=this.lastTrainTroops[cityid];
		var nowSecs=new Date().getTime()/1000;
		if(nowSecs<(lastTrain+(3*60))) { return; }
		var startButton=ById('unit_btns_start');
		
		if(!startButton) {
			// let's bring up build troops
			unsafeWindow.modal_barracks_train(trainTroops);
			return;
		} 
		var onclick=startButton.getAttribute('onclick');
		var onclickM=/\(([0-9]+)\)/.exec(onclick);
		if(!onclickM || trainTroops!=onclickM[1]) {
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
					t.Log('Not training troops:'+numInp.value+'!='+maxObj.textContent);
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

FactoryReset:function() {
	var names=GM_listValues();
	for(var n=0; n<names.length; n++) {
		GM_setValue(names[n],'');
	}
	this.SetOptions({});
},

SetupMenu:function() {
	var t=this;
	GM_registerMenuCommand('KOCAttack - Options',function() {
		t.ShowOptionsDialog();
	});
	GM_registerMenuCommand('KOCAttack - Auto Attack',function() {
		t.ToggleAutoAttack();
	});
	GM_registerMenuCommand('KOCAttack - Factory Reset!',function() {
		t.FactoryReset();
	});
},


TimeoutZero:function(f,arg) {
	setTimeout(function() {
		f(arg);
	},0);
},

pageLoaded:false,
Listen:function() {
	var t=this;
	t.SetupMenu();
	this.options=this.GetOptions();
	this.startListenTime=new Date();
	window.setTimeout(function() {
		if(!t.pageLoaded && t.GetAutoAttack() && !t.IsMapperRunning()) {
			GM_log("whoops, game not loaded after 60 secs problem. reloading.");
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
	var idStatus={};
	document.body.addEventListener('DOMNodeInserted',function(e) {
		//if(e.target.className && !/(chat|city|slot)/.exec(e.target.className)) GM_log('xxx:'+e.target.className);
		//if(e.target.id && e.target.id!='tooltip' && e.target.id('_l_')<0 && e.target.id.substring(0,2)!='l_' && e.target.id.substring(0,8)!='citysel_') GM_log('id:'+e.target.id);
		
		
		if(e.target.className && e.target.className=='statues') {
			// changed city
			t.pageLoaded=true;
			setTimeout(function() {
				t.AddOptionsLink();
				t.DrawClosestFarms();
			},0);
			setTimeout(function() {
				t.CheckAutoRaiseGold();
				t.CheckTrainTroops();
			},1000);
			setTimeout(function() {
				t.NextAutoAttack();
			},5000);
		} else if(e.target.className && e.target.className.indexOf('modal_msg_reports')>=0) {
				
			setTimeout(function() {
				t.RecordReports();
				t.AddCheckBarbarians();
				t.HighlightAllianceReports();
			},0);
		}
		if(e.target.id && e.target.id=='tooltip') {
			setTimeout(function() {
				t.DrawLevelIcons();
				t.OnToolTipAppear(e.target);
			},0);
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
				t.OnAttackBoxAppear(target);
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
			for(var id in funcsById) {
				var f=funcsById[id];
				var div=ById(id);

				if(!idStatus[id] && div) {
					t.TimeoutZero(f,div);
				}
				idStatus[id]=div?true:false;
			}
		//}
		
	},false);
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
		['Modal.showAlert(printLocalError(','if(rslt.error_code==3) { try {retryMarch(); } catch(e) { alert("retry failed:"+e); }  } else { Modal.hideModalAll(); }  Modal.showAlert(printLocalError('],
		['new (Ajax',"var marchSuccess=null; "+retryMarch+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew (Ajax"],
	];
	if(!useRetryMarch) modalAttackReplaces.push(['Modal.hideModalAll();','']);
	var modalAttackFunc=modal_attack_do.toString();
	for(var a=0; a<modalAttackReplaces.length; a++) {
		var repI=modalAttackReplaces[a];
		if(modalAttackFunc.indexOf(repI[0])<0) {
			alert("modalAttackReplace: cannot find: "+repI[0]);
		}
		
		modalAttackFunc=modalAttackFunc.replace(repI[0],repI[1]);
	}
	try {
		window.modal_attack_doOld=eval(modalAttackFunc);
	} catch(e) {
		alert(e+', bad func:'+modalAttackFunc);
	}

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
	window.modal_attack_do=function() {
		// let our stuff in addListener run first.
		setTimeout(function() {
			modal_attack_doOld();
		},100);
	}
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


