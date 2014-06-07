// ==UserScript==
// @name           KOCAttack
// @namespace      KOCAttack
// @description    Kingdoms of Camelot attacker
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @require http://sizzlemctwizzle.com/updater.php?id=76594
// ==/UserScript==


/*
// @include			http://apps.facebook.com/kingdomsofcamelot/*

// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js 

*/

var kocattack_version='2010-04-02';

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
FindAllByXPath:function(obj,xpath) {
	var ss=document.evaluate(xpath,obj,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var iconEdits=[];
	for(var s=0; s<ss.snapshotLength; s++) {
		var a=ss.snapshotItem(s);
		iconEdits.push(a);
	}
	return iconEdits;
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

	ShowImportExportBox:function() {
		var div=ById('ImportExportBoxDiv');
		if(!div) {
			div=document.createElement('div');
			div.id='KOCAttackViewAttacks';
			div.style.zIndex=100000;
			div.style.position='absolute';
			div.style.left='8px';
			div.style.top='8px';
			div.style.backgroundColor='#fff';
			div.style.border='3px solid #888';
			div.style.padding='10px';
			document.body.appendChild(div);
		}
		
		div.innerHTML = '';
		
		var m = '<a id="ImportBoxCancel" class="button20"><span>Cancel</span></a>';
		m += '<a id="ImportData" class="button20"><span>Import</span></a>';
		m += '<a id="ExportData" class="button20"><span>Export</span></a>&nbsp;';
		
		var cities=this.GetSeed().cities;
		//WinLog.write(inspect(cities));
		var citysel ='<select id=srcCity>';
		//citysel += '<option value=All>All Cities</option>';
		for(var c=0; c<cities.length; c++) {
			citysel += '<option value="'+cities[c][0]+'">'+cities[c][1]+'</option>';
		}
		citysel += '<option value=options>Options</option>';		
		citysel += '</select>';
		
		m += citysel;
		m += '<br><textarea id="ImportExportArea" rows=25 cols=60></textarea>';
		div.innerHTML = m;
		
		ById('ImportBoxCancel').addEventListener('click',function() {
		  div.innerHTML = '';
		  div.style.display='none';
		},false);
		
		ById('ImportData').addEventListener('click',function() {

		},false);
		
		ById('ExportData').addEventListener('click',function() {
		  var x;
    	  var names=KOCAttack.browser_listValues();
		  var obj={};
		  var serverId=KOCAttack.GetServerId();
		  for(var n=0; n<names.length; n++) {	
		    var name=names[n];
			var a = name.substring(0,11);
			var b = 'attack_'+serverId+'_';			
			if (a==b ) {
  		      var sid=KOCAttack.GetServerIdFromName(name);
		      if(sid!=serverId) continue;
		      var v=KOCAttack.browser_getValue(name,null);
			  if(v!=null && v!=undefined && v!=""){			  
			    x = JSON2.parse(v);
			    if (x.fromCity == ById('srcCity').value) {
			      obj[name]=v;
			    }
		      }
			}
			else if (ById('srcCity').value == 'options') {
  		      var sid=KOCAttack.GetServerIdFromName(name);
		      if(sid!=serverId) continue;
		      var v=KOCAttack.browser_getValue(name,null);
			  if(v!=null && v!=undefined && v!=""){			  
				obj[name]=v;
			   }
			}
		  }
		  ById('ImportExportArea').value = JSON2.stringify(obj);
		},false);			
	
	},	
	
		ShowViewAttacksDialog:function() {
		var t=this;
		t.attacks=[];
		var div=ById('KOCAttackViewAttacks');
		if(!div) {
			div=document.createElement('div');
			div.id='KOCAttackViewAttacks';
			div.style.zIndex=100000;
			div.style.position='absolute';
			div.style.left='8px';
			div.style.top='8px';
			div.style.backgroundColor='#fff';
			div.style.border='3px solid #888';
			div.style.padding='10px';
			document.body.appendChild(div);
		}
		var cities=this.GetSeed().cities;
		//WinLog.write(inspect(cities));
		var citysel ='<select id=srcCity>';
		citysel += '<option value=All>All Cities</option>';
		for(var c=0; c<cities.length; c++) {
			citysel += '<option value="'+cities[c][1]+'">'+cities[c][1]+'</option>';
		}		
		citysel += '</select>';
		
		var levelsel ='<select id=srcLevel>';
		levelsel += '<option value="All">All Levels</option>';
		for(var c=1; c<=11; c++) {
			levelsel += '<option value="'+c+'">Level '+c+'</option>';
		}
		levelsel += '</select>';
		
		var typesel ='<select id=srcAttackType>';
		typesel += '<option value="All">All</option>';
		typesel += '<option value="normal">Attacks</option>';
		typesel += '<option value="transport">Transports</option>';
		typesel += '<option value="bulkadded">Bulk Adds</option>';
		typesel += '</select>';
		
		div.style.display='block';
		div.innerHTML='';
		var m = '<DIV id="srcAttackOpts" style="height:30px">\
		<TABLE><TR valign=bottom><TD class=xtab width=100 align=center>Search for: </td><TD align=left>\
		<SELECT id=srcAttack>\
		<OPTION value=All>All</option>\
		<OPTION value=Camp>Barb Camp</option>\
		<OPTION value=Wilderness>Wilderness</option>\
		<OPTION value=Grassland>Grassland</option>\
		<OPTION value=Lake>Lake</option>\
		<OPTION value=Mountains>Mountains</option>\
		<OPTION value=Forest>Woods</option>\
		<OPTION value=Hills>Hills</option>\
		<OPTION value=Plain>Plains</option>\
		<OPTION value=City>City</option>\
		</select></td>\
		<td class=xtab width=100 align=center>Select City: &nbsp; </td>\
		 <td align=left><span id=ptattackcity></span></td>\
		 <td class=xtab width=100 align=center>Select Level: &nbsp; </td>\
		 <td align=left><span id=ptattacklevel></span></td>\
		 <td class=xtab width=100 align=center>Select Type: &nbsp; </td>\
		 <td align=left><span id=ptattacktype></span></td></tr>\
		</table></div>\
		<a id="KOCAttackViewAttacksCancel" class="button20"><span>Close</span></a>\
		<a id="KOCAttackViewAttacksList" class="button20"><span>List Attacks</span></a>\
		<a id="KOCAttackViewAttacksClearList" class="button20"><span>Clear List</span></a>\
		<a id="KOCAttackViewAttacksDelete" class="button20"><span>Delete Selected</span></a>\
		<a id="KOCAttackViewAttacksIgnore" class="button20"><span>Ignore/UnIgnore</span></a>\
		<a id="KOCAttackViewAttacksImportExport" class="button20"><span>Import / Export</span></a>\
		<br><br><DIV id="srcAttackResults" style="height:470px; max-height:470px; overflow-y:auto;"></div>\
		';
		
		var srcAttackResults = ById("srcAttackResults");
		if (srcAttackResults != null){
		  ById('KOCAttackViewAttacksClearList').click();
		}		
		div.innerHTML = m;
		ById('ptattackcity').innerHTML = citysel;
		ById('ptattacklevel').innerHTML = levelsel;
		ById('ptattacktype').innerHTML = typesel;

		ById('KOCAttackViewAttacksClearList').addEventListener('click',function() {
			ById('srcAttackResults').innerHTML='';
		},false);										
		
		ById('KOCAttackViewAttacksCancel').addEventListener('click',function() {
			div.style.display='none';
		},false);
		
		ById('KOCAttackViewAttacksImportExport').addEventListener('click',function() {
			t.ShowImportExportBox();
		},false);
				
		ById('KOCAttackViewAttacksList').addEventListener('click',function() {
		  t.attacks=[];
		  t.DetailAttacks();
		  //WinLog.write(inspect(t.attacks,10));
		  
		  var typeQuery = ById('srcAttackType').value;
		  var cityQuery = ById('srcCity').value;
		  var levelQuery = ById('srcLevel').value;
		  var attackQuery = ById('srcAttack').value;
		  
		  var h = '<table>';
		  h += '<tr><td><input type=checkbox id=selAllAttacks></td><td>&nbsp;</td><td>City</td><td>Coords</td><td nowrap>What</td>';
		  h += '<td>Type</td><td>Attack Troops</td><td>Suicide Troops/Resources</td><td>Time</td><td>Ignore</td></tr>';
		  var tableRows= '';
		  var count = 1
		  for(var a=0; a<t.attacks.length; a++) {
			var levelInfo=t.GetLevelInfo(t.attacks[a]);
			if (levelInfo==undefined) levelInfo='';
			var type;
			if (levelInfo.type){
			  type = levelInfo.type;
			}
			else {
			  type = 'City';
			}

			var displayRow = '';
			if (cityQuery != 'All'){
			  if (t.GetCityName(t.attacks[a]['fromCity']) != cityQuery){
			    continue;
			  }
			}
			if (levelQuery != 'All'){
			  if (levelInfo.level != levelQuery){
			    continue;
			  }
			}
			
			if (typeQuery != 'All'){
			  if (t.attacks[a].currenttattackwavetype != typeQuery){
			    continue;
			  }
			}			
			if (attackQuery != 'All'){
			  if (type != attackQuery){
			    continue;
			  }
			}					
			tableRows += '<tr id=row'+count+' style="display: '+displayRow+';">';
			tableRows += '<td><input type=checkbox id=sel'+count+'>';
			tableRows += '<td>'+count+'</td><td>'+t.GetCityName(t.attacks[a]['fromCity'])+'</td>';
			tableRows += '<td id=coords'+count+' onclick="aaGotoMapHide('+t.attacks[a].xy[0]+','+t.attacks[a].xy[1]+')">'+t.attacks[a].xy[0]+','+t.attacks[a].xy[1]+'</td>';
			tableRows += '<td nowrap>'+type+' Level '+levelInfo.level+'</td>';
			tableRows += '<td>'+t.attacks[a].currenttattackwavetype+'</td>';

            		tableRows += '<td>';
			
			if(typeof(t.attacks[a].troops)=="object") {
			  var troops='';
			  for(var i=1; i<t.attacks[a].troops.length; i++) {
			    troops += t.attacks[a].troops[i]+',';
   			}
			  troops = troops.substring(0, troops.length - 1);
			  tableRows += troops;
  		}
			else{
			  tableRows += '&nbsp;';
			}
      tableRows += '</td>';

      tableRows += '<td>';

			if(typeof(t.attacks[a].suicidewave)=="object") {
			  var suicide='';
			  for(var i=1; i<t.attacks[a].suicidewave.length; i++) {
			    suicide += t.attacks[a].suicidewave[i]+',';
   			}
			  suicide = suicide.substring(0, suicide.length - 1);
			  tableRows += suicide;
			}
			else if (typeof(t.attacks[a].resources)=="object"){
			  var resources='';
			  for(var i=1; i<t.attacks[a].resources.length; i++) {
			    resources += t.attacks[a].resources[i]+',';
   			}
			  resources = resources.substring(0, resources.length - 1);
			  tableRows += resources;
			}
			else {
			  tableRows += '&nbsp;';
			}
      tableRows += '</td>';
			var nowSecs=new Date().getTime()/1000;
			tableRows += '<td>'+SecsToStr(nowSecs-t.attacks[a].time)+'</td>';
			
			var ignChecked = '';
			if (t.attacks[a].ignore == null || t.attacks[a].ignore==undefined){
			  ignChecked = '';  
			}else{
			  ignChecked = 'CHECKED';
			}
			
			tableRows += '<td><input type=checkbox name=chkIgnore id='+count+' '+ignChecked+'></td>';
		 
			tableRows += '</tr>';	
		    	count++;
		}
		  
		  h += tableRows + '</table>';
		  ById('srcAttackResults').innerHTML = h;

          ById('KOCAttackViewAttacksDelete').addEventListener('click',function() {
			for (var i=1; i<count; i++){
			  var row = 'sel'+i;
			  if (ById(row) == undefined) continue;
			  if (ById(row).checked == true){
			    //ById(row).checked == false;
			    var c = ById('coords'+i).innerHTML;
			    var xy = c.split(",");
			    GM_log('Coords '+xy[0]+' '+xy[1]);
			    t.DeleteAttack(xy[0],xy[1]);
			  }
			}
			var listBtn=ById('KOCAttackViewAttacksList');
			nHtml.Click(listBtn);
		  },false);
		  
		  for (var i=1; i<count; i++){
		    var ignore = i;
			t.addEvent(ById(ignore), "click", t.ChangeIgnore);
		  }	
		  
		  		  	  
		  ById('selAllAttacks').addEventListener('click',function() {
		    var myChecked = true;
			
			if (ById('selAllAttacks').checked == false){
			  myChecked = false;
			}
			
			for (var i=1; i<count; i++){
			  var row = 'sel'+i;
			  ById(row).checked=myChecked;
			}
    	  },false);	
		    
 	   },false);
	},
	
	addEvent:function(obj, type, fn){
	  if (obj.attachEvent) {
	    obj['e' + type + fn] = fn;
        obj[type + fn] = function(){obj['e' + type + fn](window.event);}
        obj.attachEvent('on' + type, obj[type + fn]);
      } 
      else{
         obj.addEventListener(type, fn, false);
      }	
	},
	
	ChangeIgnore:function(e){
	  var c = ById('coords'+e.target.id).innerHTML;
	  var xy = c.split(",");
	  var serverID = this.GetServerId();
	  	  
	  var attackname = 'attack_'+ServerId+'_'+xy[0]+','+xy[1];
	  var str = GM_getValue(attackname,'') 

	  if(!str) return null;
	  attack= JSON2.parse(str);
	  attack.ignore=e.target.checked?true:undefined;
	  //WinLog.write (inspect(attack,10));
	  GM_setValue(attackname,JSON2.stringify(attack));
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
		"<tr><td valign='top' align='center'><img src='img/units/unit_6_50.jpg' /></td><td valign='top'>Version: "+kocattack_version+"<br />"+
		"Attack Order: <select id='KOCAttackOrder'><option value='mostTroops'>Use most troops first</option><option value='closest'>Closest targets first</option></select><br />"+
		"Attack Type: <input type='checkbox' "+(this.options.attackTypeCamp?'checked':'')+" id='KOCAttackTypeCamp'>Camp "+
		"<input type='checkbox' "+(this.options.attackTypeWild?'checked':'')+" id='KOCAttackTypeWild'>Wilderness "+
		"<input type='checkbox' "+(this.options.attackTypeCity?'checked':'')+" id='KOCAttackTypeCity'>City "+
		"<input type='checkbox' "+(this.options.attackTypeTransport?'checked':'')+" id='KOCAttackTypeTransport'>Transport<br> "+
		"<br />"+
		"<input id='KOCAttackDelay' value='"+this.options.attackDelay+"' size='3' /> seconds inbetween sending each attack<br />"+
		"Time inbetween sending to the <u>same target</u>...<br />"+
		"<div style='margin-left: 40px'>"+
		"Attacking camp:<input id='KOCAttackHoursSinceLastCamp' value='"+(this.options.attackSecsSinceLastCamp/(60*60))+"' size='3' />hrs<br />"+
		"Attacking wilderness:<input id='KOCAttackHoursSinceLastWild' value='"+(this.options.attackSecsSinceLastWild/(60*60))+"' size='3' />hrs<br />"+
		" Attacking city:<input id='KOCAttackHoursSinceLastCity' value='"+(this.options.attackSecsSinceLastCity/(60*60))+"' size='3' />hrs<br />"+
		" Transporting:<input id='KOCAttackMinsSinceLastTransport' value='"+(this.options.attackSecsSinceLastTransport/(60))+"' size='3' />mins"+
		"</div>"+
		"<br />"+
		"<input id='KOCAttackMaxDistance' value='"+(this.options.attackMaxDistance)+"' size='3' /> max distance away from city to attack.<br />"+
		"<input id='KOCAttackLockAttackFromCity' type='checkbox' "+(this.options.lockAttackFromCity?'checked':'')+" /> Only launch attacks from city they were last launched from.<br />"+
		"<input id='KOCAttackRemoteAttack' type='checkbox' "+(this.options.remoteAttack?'checked':'')+" /> Enable remote attack features.<br />"+
		"<input id='KOCAttackRetryMarch' type='checkbox' "+(this.options.retryMarch?'checked':'')+" /> Retry march if it has unknown/excess traffic error (press reload after changing this option).<br />"+
		"Open up this url in a tab when we're under attack...<br /><input id='KOCAttackImpendingAttackUrl' size='60' value='"+(this.options.impendingAttackUrl)+"' /><br />"+
		
		"</td></tr>"+

		//http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545

		"<tr><td valign='top' align='center'><img src='img/chrome_message_up.png' /></td><td valign='top'>"+
		"<input id='KOCAttackRemoveReports' type='checkbox' "+(this.options.autoRemoveReports?'checked':'')+" /> Auto remove barbarian/wilderness attack reports.<br />"+
		"<input id='KOCAttackKeepReports' value='"+this.options.keepReports+"' size='3' /> attack reports to keep maximum in the attack dialog.<br />"+
		"<input id='KOCAttackNoViewReports' type='checkbox' "+(this.options.noViewReports?'checked':'')+" /> Disable viewing of reports, this will also disable collecting of reports for the attack page.<br />"+
		
		"</td></tr>"+
		"<tr><td valign='top' align='center'><img src='img/happiness.png' /></td><td valign='top'>"+
		"<input id='KOCAttackPercentOfPopToTrain' value='"+this.options.percentOfPopToTrain+"' size='3' />% of idle population available before we do auto training.<br />"+
		"<input id='KOCAttackAutoGoldHappiness' value='"+this.options.autoGoldHappiness+"' size='3' />% happiness before we click auto gold.<br />"+
		"</td></tr>"+
		
		"<tr><td valign='top' align='center'><img src='img/chome_alliance_up.png' /></td><td valign='top'>"+
			"<input id='KOCAttackHideAllianceHelpRequests' type='checkbox' "+(this.options.hideAllianceHelpRequests?'checked':'')+" /> Hide alliance help requests/reports in chat.<br />"+
			"</td></tr>"+
		"<tr><td valign='top' align='center'><img src='img/buildings/castle_lvl10.png' /></td><td valign='top'>"+
		"<input id='KOCAttackChangeCitySecs' value='"+(this.options.changeCitySecs)+"' size='3' /> seconds inbetween changing cities.<br />"+
		"Cycle thru all the cities <input id='KOCAttackCitiesDoneMax' value='"+(this.options.autoAttackCitiesDoneMax)+"' size='3' /> times and then wait "+
		"<input id='KOCAttackCitiesDelay' value='"+this.options.waitAfterCitiesDone+"' size='3' />secs before refreshing.<br />"+
		"Cities to attack from: "+okCitiesHtml+'<br />'+

		"<tr><td valign='top' align='center'></td><td valign='top'>"+
		"<input id='KOCAttackRandom' value='"+this.options.randomPercent+"' size='3' />% random adjustment for all delays (to look more human).<br />"+
		"Import/Export: Paste or copy the settings here...<br /><textarea id='KOCAttackImport'></textarea>"+
		"<a class='button20' id='KOCAttackImportButton'><span>Import</span></a> <a class='button20' id='KOCAttackExportButton'><span>Export</span></a><br />"+
		"</td></tr>"+

		"</table>"+
		
		"<a id='KOCAttackOptionsSave' class='button20'><span>Save</span></a> <a id='KOCAttackOptionsCancel' class='button20'><span>Cancel</span></a> <a id='KOCAttackOptionsReset' class='button20'><span>Reset options</span></a> <a id='KOCAttackOptionsResetAll' class='button20'><span>Reset all!</span></a></form>";
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
		t.ReloadWindow();
//		window.history.go(0);
//		window.location.reload(true);
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
		
		t.options.hideAllianceHelpRequests=ById('KOCAttackHideAllianceHelpRequests').checked;
		
		t.options.attackSecsSinceLastCamp=parseFloat(ById('KOCAttackHoursSinceLastCamp').value)*60*60;
		t.options.attackSecsSinceLastWild=parseFloat(ById('KOCAttackHoursSinceLastWild').value)*60*60;
		t.options.attackSecsSinceLastCity=parseFloat(ById('KOCAttackHoursSinceLastCity').value)*60*60;
		t.options.attackSecsSinceLastTransport=parseFloat(ById('KOCAttackMinsSinceLastTransport').value)*60;
		t.options.randomPercent=parseFloat(ById('KOCAttackRandom').value);
		t.options.attackMaxDistance=parseFloat(ById('KOCAttackMaxDistance').value);
		t.options.autoAttackCitiesDoneMax=parseInt(ById('KOCAttackCitiesDoneMax').value);

		t.options.attackOrder=ById('KOCAttackOrder').value;

		
		t.options.lockAttackFromCity=ById('KOCAttackLockAttackFromCity').checked;
		t.options.remoteAttack=ById('KOCAttackRemoteAttack').checked;
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

AddViewAttacksLink:function() {
		var t=this;
		var a=ById('KOCAttackViewAttacksLink');
		if(a) return;

		a=this.AddTabLink('View Attacks');
		if(!a) {
			window.setTimeout(function() {
				t.AddViewAttacksLink();
			},t.GetRandTime(250));
			return;
		}
		a.id='KOCAttackViewAttacksLink';
		a.addEventListener('click',function() {
			t.ShowViewAttacksDialog();
		},false);
	},	

AddTabLink:function(html) {
	var a=document.createElement('a');
	a.className='navTab';
//	a.style.color='#fff';
	a.innerHTML='<span>'+html+'</span>';
	var tabs=ById('main_engagement_tabs');
	/*
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
	*/
	
	if(tabs) {
//		tabs.style.whiteSpace='nowrap';
//		tabs.style.width='1600px';
		tabs.insertBefore(a,tabs.childNodes[0]);
		return a;
	}
	return null;
},

GetCityName:function(cityid) {  
	  var cityName;
	  for(var a=0; a<unsafeWindow.seed.cities.length; a++) {
	    if(unsafeWindow.seed.cities[a][0] == cityid){
		  var cityName = unsafeWindow.seed.cities[a][1];
		}
	  }
	  return cityName;
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
		toggle.innerHTML='<span>Auto attack</span>';
	} else {
		toggle.innerHTML='<span>No auto attack</span>';
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
	if(!m) m=/s=([0-9]+)/.exec(document.location.search);
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
		'remoteAttackTypeAllowed':[0,1,1,1,1],
		'remoteAttack':true,
		'impendingAttackUrl':''
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
		this.Log("Cannot find gui coords");
		return null;
	}
	return [x.value,y.value];
},

SetAttackFromGui:function(box) {
	var xy=this.GetGuiCoords();
	if(!xy) return null;
	return this.SetAttackFromGuiXY(xy[0],xy[1],box);
},


// new: 0=transport, 1=reinforce, 2=scout, 3=attack, 4=reassign,
// old???  0=attack, 1=transport, 2=scout, 3=reinforce, 4=reassign
newAttackTypeToOld:[1,3,2,0,4],
GetAttackTypeFromGui:function() {
	var type=ById('modal_attack_atktype');
	if(!type) return null;
	if(!ById('modal_attack_tab_1')) {
		// old interface
		return type.selectedIndex;
	}
	return this.newAttackTypeToOld[type.selectedIndex];
},
SetOldAttackTypeToGui:function(type) {
	var t=this;
	if(!ById('modal_attack_tab_1')) {
		// old interface
		ById('modal_attack_atktype').selectedIndex=type;
	}
	// new interface
	for(var a=0; a<t.newAttackTypeToOld.length; a++) {
		if(t.newAttackTypeToOld[a]==type) {
			nHtml.Click(ById('modal_attack_tab_'+(a+1)));
			ById('modal_attack_atktype').selectedIndex=a;
		}
	}
},


GetAttackFromGui:function() {
	var comment=ById('KocAttackComment');
	var type=this.GetAttackTypeFromGui();
	if(type==null || type==undefined) {
		throw("Cannot find attack type");
	}

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
			//totalResources+=v;
		} catch(e) {
			continue;
		}
	}

	var xy=this.GetGuiCoords();
	var attack={
		'x':xy[0],'y':xy[1],
		'type':type,
		'comment':'',
		'troops':troops,
		'resources':resources,
		'totalTroops':totalTroops
	};
	
	if(comment)
		attack.comment=comment.value;
		
	return attack;
},
SetAttackFromGuiXY:function(x,y,box) {
	var attackInfo=this.GetAttackFromGui();

	if(attackInfo.totalTroops<=0) {
		this.Log("No troops, not saving attack");
		return null;
	}
	var troops=attackInfo.troops;
	

	// ignore anything other than attack
	if(attackInfo.type==0) {
		var attack=this.GetAttack(x,y);
		if(!attack) attack={};
		
		attack.type=attackInfo.type;
		attack.comment=attackInfo.comment;
		
		var nowSecs=new Date().getTime()/1000;
		var firstAttack=this.IsFirstAttackAtLocation(x,y);

		if(attackInfo.totalTroops>0 && (troops[2]+troops[10])==attackInfo.totalTroops && firstAttack) {
			// nothing but militiamen/ballista, anti defence attack
			attack.militiaonly=troops;
		} else {
			attack.time=nowSecs;
			if(firstAttack) { attack.militiaonly=undefined; }
			attack.troops=troops;
		}
		
		//if (this.options.lockAttackFromCity) {
			attack.fromCity=this.GetCurrentCityId();
		//}

		//attack.ignore=undefined;
		this.prevAttack={'x':x,'y':y};
		this.SetAttack(x,y,attack);
		return attack;
	} else if(attackInfo.type==1) {
		// try to parse transports
		var attack=this.GetAttack(x,y);
		if(!attack) attack={};
		
		attack.type=attackInfo.type;
		//attack.ignore=true; // We set this to ignore for now until I can get the auto attack working
		attack.comment=attackInfo.comment;
		var nowSecs=new Date().getTime()/1000;
		var firstAttack=this.IsFirstAttackAtLocation(x,y);

		attack.time=nowSecs;
		attack.troops=attackInfo.troops;
		attack.resources=attackInfo.resources;
		
		//if (this.options.lockAttackFromCity) {
			attack.fromCity=this.GetCurrentCityId();
		//}
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

	var bulkAddTable=document.createElement('table');
	bulkAddTable.style.background='transparent';
	var bulkAddDiv=document.createElement('div');
	bulkAddTable.insertRow(-1).insertCell(-1).appendChild(bulkAddDiv);
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
		var added=t.BulkAddCoords(box,coords.value,ById('KOCAttackBulkAddForce').checked);
		bulkAddDiv.style.display='none'; 
		bulkAddAttackLink.style.display='inline';
		window.alert('Bulk added '+added+' coords');
	},false);
	AddHtml(bulkAddDiv,"<br />");

	var bulkAddAttackLink=document.createElement('a');
	bulkAddAttackLink.className='buttonDown20';
	bulkAddAttackLink.innerHTML='<span>Bulk add coords</span>';
	bulkAddAttackLink.addEventListener('click',function() { 
		bulkAddDiv.style.display='inline'; 
		bulkAddAttackLink.style.display='none'; 
	},false);
	div.appendChild(bulkAddTable);
	div.appendChild(bulkAddAttackLink);
	return div;
},

HideAttackEfforts:function() {
	var items=ById('modal_attack_attack_boost');
	if(!items) return;
	var defense=ById('modal_attack_defense_boost');
	var march=ById('modal_attack_march_boost');
	var speed=ById('modal_attack_speed_boost');
	if(!defense || !march || !speed) {
		throw("Cannot find defense");
	}
	
	var est=nHtml.FindByXPath(speed,".//div[contains(@class,'estimated')]");
	if(est)
		speed.parentNode.appendChild(est);

	//items=items.parentNode.parentNode;
	var a=document.createElement('a');
	a.innerHTML='Hide/Show attack boosts';
	//a.href='javascript:;';
	a.style.cursor='pointer';
	items.style.display='none';
	defense.style.display='none';
	march.style.display='none';
	speed.style.display='none';
	a.addEventListener('click',function() {
		items.style.display=items.style.display=='none'?'block':'none';
		defense.style.display=defense.style.display=='none'?'block':'none';
		march.style.display=march.style.display=='none'?'block':'none';
		speed.style.display=speed.style.display=='none'?'block':'none';
	},false);
	return a;
},

SetResourceInputs:function(resources) {
	var resourceTypes = new Array(
		'gold',
		'rec1',
		'rec2',
		'rec3',
		'rec4'
	);
	var notFullResources=false;
	var totalResources=0;
	for(var res=0; res<resources.length; res++) {
		var resourceCount=resources[res];
		if(!resourceCount) continue;
		totalResources+=resourceCount;

		if(this.SetResourceInput(resourceTypes[res],resourceCount)=='notfull') {
			notFullResources=true;
		}
	}
	return {'totalResources':totalResources,'notFullResources':notFullResources};
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


SetTroopInputs:function(troops) {
	var totalTroops=0;
	var notFullTroops=false;
	for(var tr=0; tr<troops.length; tr++) {
		var troopCount=troops[tr];
		if(!troopCount) continue;
		totalTroops+=troopCount;

		if(this.SetTroopInput(tr,troopCount)=='notfull') {
			notFullTroops=true;
		}
	}
	return {'totalTroops':totalTroops,'notFullTroops':notFullTroops};
},
SetTroopInput:function(num,troopCount) {
	var troop=ById('modal_attack_unit_ipt'+num);
	if(!troop) return null;
	if(troop.disabled) return 'notfull';
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

	var maxNumObj=troop.parentNode.previousSibling;

	var maxNum=0;
	if(maxNumObj) {
		maxNum=parseInt(maxNumObj.textContent);
	}
	if(parseInt(troopCount)>parseInt(maxNum)) {
	//if(parseInt(troopCount)>0) {
		if(troop.value!=troopCount) {
			this.Log('Not able to set troop count:'+num+',wanted:'+troopCount+', count:'+troop.value);
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
	
HandleChatPane:function() {
		var t=this;
		
		// Process chat pane
		var AllianceChatBox=ById('mod_comm_list2');
		if(AllianceChatBox){
		
			var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			if(chatPosts){
				// Loop through each post
				for (var i = 0; i < chatPosts.snapshotLength; i++) {
				thisPost = chatPosts.snapshotItem(i);
					if(this.options.hideAllianceHelpRequests){
						// Look for any alliance assist links in this current post item
						var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
						if(helpAllianceLinks){
							for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
								thisLink = helpAllianceLinks.snapshotItem(j);
								// Delete the post item from the DOM
								thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
							}
						}
					}
					if(this.options.hideAllianceHelpRequests){
						// Look for any alliance assist links in this current post item
						var myregexp1 = /You are # [1-5] of 5 to help/i;
						var myregexp2 = /\'s Kingdom does not need help\./i;
						var myregexp3 = /\'s project has already been completed\./i;
						var myregexp4 = /\'s project has received the maximum amount of help\./i;
						if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4)) {
							// Delete the post item from the DOM
							thisPost.parentNode.removeChild(thisPost);
						}
					}
				}
			}
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
	
	var productionHeader=nHtml.FindByXPath(box,".//div[contains(@class,'prodtableheader')]");
	productionHeader=productionHeader.parentNode;
	var b=document.createElement('a');
	b.className='button25';
	
	function SetAbandonWildsA() {
		var str=t.GetAbandonWilds()?'Abandon Wilds':'Keep Wilds';
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

AddRemoteAttackButton:function(box) {
	var t=this;
	if(!t.options.remoteAttack) return;
	var div=document.createElement('div');
	var player=document.createElement('input');
	var city=document.createElement('input');
	var remoteAttack=document.createElement('a');
	remoteAttack.className='button25';
	remoteAttack.innerHTML='<span>Remote Attack</span>';
	
	div.appendChild(document.createTextNode('Remote Player:'));
	div.appendChild(player);
	div.appendChild(document.createTextNode(' Remote City:'));
	div.appendChild(city);
	div.appendChild(remoteAttack);
	
	remoteAttack.addEventListener('click',function() {
		window.setTimeout(function() {
			var attack=t.GetAttackFromGui();
			var playerName=player.value.trim();
			var cityName=city.value.trim();
			if(playerName=="" || cityName=="") {
				window.alert("Must pick another player + city");
				return;
			}
			t.SendChat(playerName,"attack?"+JSON2.stringify({'city':cityName,'attack':attack}));
			t.DoUnsafeWindow("Modal.hideModalAll();");
		},0);
	},false);
	
	var btnMarch=ById('btnMarch');
	btnMarch.parentNode.insertBefore(div,btnMarch);
},


/*
MakeTroopBoxesUnlimited:function() {
	for(var tr=0; tr<100; tr++) {
		var id='modal_attack_unit_ipt'+tr;
		var troop=ById(id);
		if(!troop) continue;

		var troopNew=document.createElement('input');
		troopNew.name=tr;
		troopNew.id=id;
		
		var p=troop.parentNode;
		p.removeChild(troop);
		p.insertBefore(troop,p.childNodes[0]);
	}
},
*/

nextAutoAttackTimeout:null,
onclickTimeRe:/,([0-9]+),[0-9]+,[0-9]+,[0-9]+[^,]*$/,
waitForAttackBoxAppear:null,
knightmarchid:0,
OnAttackBoxAppear:function(box) {
	var btnMarch=ById('btnMarch');
	var t=this;
	if(!btnMarch) { 
		this.Log('no march button');
		window.setTimeout(function() {
			t.OnAttackBoxAppear(box);
		},1000);
		return; 
	}
	var attackType=t.GetAttackTypeFromGui();
	//var attackTypeSelect=ById('modal_attack_atktype');
	
	var troopmax = ById('modal_attack_maxunt');
	troopmax.innerHTML = addCommasInt(troopmax.innerHTML);
	
	this.StopWaitForAttackBoxAppear();
	
	
	if(ById('KocAttackComment')) {
		this.Log("We already have an attack dialog opened");
		return;
	}
	var autoAttack=this.GetAutoAttack();
	var knightSelect=ById('modal_attack_knight')

	//this.MakeTroopBoxesUnlimited();
	this.AddRemoteAttackButton(box);
	var cityName=t.GetCurrentCityName();
	var remoteAttack=t.GetValue('RemoteAttack_'+cityName,'');
	if(autoAttack && remoteAttack!="") {
		var attack=JSON2.parse(remoteAttack);
		t.Log('Remote attack:'+JSON2.stringify(attack));
		var setTroops=t.SetTroopInputs(attack.troops);
		if(setTroops.notfullTroops) {
			t.SendChat(attack.fromPlayer,"attack.Not enough troops");
		} else {
			this.SetOldAttackTypeToGui(attack.type);
			if(attack.type==0) {
				knightSelect.selectedIndex=1+Math.floor(Math.random()*(knightSelect.options.length-1));
			}
		
			// set resources + target
			var x=ById('modal_attack_target_coords_x');
			var y=ById('modal_attack_target_coords_y');
			x.value=attack.x;
			y.value=attack.y;
			if(attack.resources) {
				var setResources=t.SetResourceInputs(attack.resources);
				if(setResources.notfullResources) {
					t.SendChat(attack.fromPlayer,"attack.Not enough resources");
					return;
				}
			}
			t.SendChat(attack.fromPlayer,"attack.Attempted");
			nHtml.Click(btnMarch);
			t.SetValue('RemoteAttack_'+cityName,undefined);
			
			window.setTimeout(function() {
				autoAttack.x=autoAttack.y=-1;
				t.SetAutoAttack(autoAttack);
				t.NextAutoAttack();
			},1000);
			return;
		}
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
	AddText(div,'Comment:');
	div.appendChild(document.createElement('br'));
	div.appendChild(comment);
	div.appendChild(document.createElement('br'));

	var div2=document.createElement('div');
	var ignore=document.createElement('input');
	ignore.type='checkbox';
	div2.appendChild(ignore);
	AddText(div2,'Ignore in the attack list');
	var nextElement=ById('modal_attack_attack_boost');
	nextElement.parentNode.insertBefore(div2, nextElement);
	//div.appendChild(document.createElement('br'));
	var div3=document.createElement('div');
		var deletefarmno=document.createElement('input');
		deletefarmno.type='checkbox';
		div3.appendChild(deletefarmno);
		AddText(div3,'Do not delete this report');
		div2.appendChild (div3);
	
	var xy=this.GetGuiCoords();
	var attack=null;

	
	if(xy) {
		attack=this.GetAttack(xy[0],xy[1]);
	}
	
	
	//var notFullTroops=false;
	var setTroops={'totalTroops':0};
	var setResources={};

	if(attack) {
		ignore.checked=attack.ignore?true:false;
		deletefarmno.checked=attack.deletefarmno?true:false;
		if(attack.time) {
			AddHtml(div,'Last attack: '+SecsToStr(nowSecs-attack.time)+' ago<br />');
		}
		if(attack.comment)
			comment.value=attack.comment;
		
		// only fill things in if we're in attack mode.
		if(attackType==0 && attack.type==0) {
//if(this.prevAttack)GM_log('militia:'+this.prevAttack.x+'=='+xy[0] +','+this.prevAttack.y+'=='+xy[1] );
			if(attack.militiaonly
				&& this.IsFirstAttackAtLocation(xy[0],xy[1])
			) {
				// anti traps attack
				if(typeof(attack.militiaonly)=="object") {
					setTroops=this.SetTroopInputs(attack.militiaonly);
					/*
					for(var i=1; i<attack.militiaonly.length; i++) {
						this.SetTroopInput(i,attack.militiaonly[i]);
						setTroops.totalTroops+=attack.militiaonly[i];
					}
					*/
				} else {
					this.SetTroopInput(2,attack.militiaonly);
					setTroops.totalTroops+=attack.militiaonly;
				}
			} else if(attack.troops) {
				setTroops=this.SetTroopInputs(attack.troops);
			}

			//attackTypeSelect.selectedIndex=attack.type;knightmarchid
			if(this.knightmarchid == knightSelect.options[knightSelect.selectedIndex].value)
				knightSelect.selectedIndex = 1+Math.floor(Math.random()*(knightSelect.options.length-1)); //Select random knight if last knight didn't go out
		} else if (attackType==1 && attack.type==1) {
			t.SetOldAttackTypeToGui(attack.type);
			setTroops=t.SetTroopInputs(attack.troops);
			setResources=t.SetResourceInputs(attack.resources);

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
		deleteBtn.innerHTML='<span>Delete Attack</span>';
		deleteBtn.addEventListener('click',function() {
			t.DeleteAttack(xy[0],xy[1]);
			t.DoUnsafeWindow('Modal.hideModalAll();');
		},false);
	
		var unitList=ById('modal_attack_unitlist');
		if(unitList) {
			unitList.parentNode.insertBefore(deleteBtn,unitList.nextSibling);
		} else {
			var attackTypeSelect=ById('modal_attack_atktype');
			if(attackTypeSelect)
				attackTypeSelect.parentNode.insertBefore(deleteBtn,attackTypeSelect.nextSibling);
		}
	} 
	
	
	var ChangeAttack=function() {
		var xy=t.GetGuiCoords();

		var attack=null;
		var attackType=GetAttackTypeFromGui();
		//var attackTypeSelect=ById('modal_attack_atktype');
		if(xy) {
			attack=t.GetAttack(xy[0],xy[1]);
		}
		if(!attack) attack={};
		if(attackType!=attack.type) {
			t.Log('We wont change an attack if the type is different. You must delete the attack to change the type');
			return;
		}
		
		attack.comment=comment.value;
		attack.ignore=ignore.checked?true:undefined;
		attack.deletefarmno=deletefarmno.checked?true:undefined;
		t.SetAttack(xy[0],xy[1],attack);
	}
	comment.addEventListener('change',function() { ChangeAttack(); },false);
	ignore.addEventListener('change',function() { ChangeAttack(); },false);
	deletefarmno.addEventListener('change',function() { ChangeAttack(); },false);
	
	var parentDiv=ById('modal_attack_attack_boost');
	parentDiv.parentNode.insertBefore(div,parentDiv);
	parentDiv.parentNode.insertBefore(this.HideAttackEfforts(),parentDiv);
	parentDiv.parentNode.insertBefore(this.BulkAddAttackLink(box),parentDiv);
	
	this.AttachXYPaste('modal_attack_target_coords_x','modal_attack_target_coords_y');
	
	if(autoAttack && autoAttack.x==xy[0] && autoAttack.y==xy[1] && !ignore.checked) {

		autoAttack.x=autoAttack.y=-1;
		this.SetAutoAttack(autoAttack);

		if(setTroops.totalTroops>0 
		&& knightSelect.options.length>1
		&& !setTroops.notFullTroops
		&& !setResources.notFullResources
		&& btnMarch.style.opacity!=0.5
		) {
			this.Log('Auto attack:'+xy[0]+','+xy[1]+', from city:'+this.autoAttackCityUpto);
			var t=this;
			window.setTimeout(function() {
				t.autoAttacksThisCity++;
				nHtml.Click(btnMarch);
				//t.ResetIdStatus();
				this.knightmarchid = knightSelect.options[knightSelect.selectedIndex].value;
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
				this.Log('Cannot continue auto attacking, about to attack or change city');
			}
			return;
		} else {
			this.Log('auto attack, not enough troops/knights: '+xy[0]+','+xy[1]+
				", knights avail:"+(knightSelect.options.length-1)+", Not enough troops/resources:"+setTroops.notFullTroops+'/'+setResources.notFullResources+', needed:'+setTroops.totalTroops+'/'+setResources.totalResources);
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
		this.Log('Cannot find x coord box: '+xId);
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
	if(!attack) throw('GetLevelInfo: attack is null');
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
		'Lake':1,
		'Mountains':1,
		'Woods':1,
		'Forest':1,
		'Plain':1,
		'Hills':1,
		'Grassland':1
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
			//this.Log('fromCity='+attack.a.fromCity+', currentCity='+this.GetCurrentCityId());
			if(attack.a.fromCity!=undefined) {
				if(this.GetCurrentCityId()!=attack.a.fromCity) { continue; }
			}
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
		} else if(levelInfo.type=='Camp') {
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
		GM_log('failed to parse autoattack:'+aStr);
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
		titleA.innerHTML='Attacks ';
		titleA.title='Closest attacks, more than ? hrs since last attack';
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
		this.Log('reload page timer killed');
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
	this.Log('refreshing in '+(refreshMSecs/1000)+' secs, all cities done:'+this.autoAttackCityUpto);
	this.ClearAutoAttackTimeout();
	this.autoAttackTimeout=window.setTimeout(function() {
		if(t.autoAttackTimeout==null) return;
		t.autoAttackTimeout=null;
		if(t.IsMapperRunning()) {
			t.Log("Waiting for mapping to finish");
			// don't reload until the mapper has finished.
			window.setTimeout(function() {
				t.StartReloadPageTimer(10*60);
			},0);
			return;
		}
		t.SetValuesCache();
		t.ReloadWindow();
	},refreshMSecs);
	this.Log('reload page timer started');
},


ClickChangeCity:function(cityA,tries) {
	var t=this;
	nHtml.Click(cityA);
	t.nextAutoAttackWanted=window.setTimeout(function() {
		if(t.nextAutoAttackWanted!=null) {
			if(tries>4) {
				t.Log("Skip city, too many retries");
				t.NextAutoAttackCity();
				return;
			}
			t.Log("We clicked change city but the city did not change, trying again");
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
			this.Log('cannot change city, about to attack or change city');
		}
//		this.autoAttackCityUpto++;
	}
},


StopWaitForAttackBoxAppear:function() {
	if(this.waitForAttackBoxAppear!=null) {
		window.clearTimeout(this.waitForAttackBoxAppear);
		this.waitForAttackBoxAppear=null;
		return true;
	}
	return false;
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
				t.Log('Force close the attack dialog');
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
		this.DoUnsafeWindow('modal_messages_reports_chkdel();');
	}
	return deletes;
},
GetDisplayName:function(){
	var DisplayName = ById('topnavDisplayName');
	if(DisplayName){
		DisplayName = DisplayName.innerHTML;
	}else{
		DisplayName = null;
	}
	return DisplayName
},
DeleteFarmAttacks:function() {
	var deletes=0;
	this.IterateMsgReports(function(a,tr,desc,x,y) {
		var DisplayName = this.GetDisplayName();
		DisplayName = /([^"]+) ([^"]+)/.exec(DisplayName);
		var Name = '"'+DisplayName[2]+'"';
			
		var onclick=a.getAttribute('onclick');
		if(!onclick) return false;
		onclick=onclick.trim();
		var m=this.onclickReportRe.exec(onclick);
		if(this.IsOnclickMyselfToMyself(onclick)) {
			return true; //Don't select transports
		} else if(m && m[5]=='0') {
			return true; //Don't select barbs
		} else if(m && m[11]=='0' && m[12]=='0') {
			return true; //Don't select if empty
		} else if(m && m[8]!=Name)  {
			return true; //Don't select if attacker is not yourself
		}
		var attack = this.GetAttack(m[11],m[12]); //Check if attack exists in system
		if(!attack)	return true;
		if(attack.deletefarmno) return true; //Don't select if checked not to delete
		if(!attack.troops) return true; //Sometimes the script will record reports but u don't want them deleted
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
		reportsRemoved += this.DeleteFarmAttacks();
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
	
	var a=document.createElement('a');
	var t=this;
	a.addEventListener('click',function() {
		t.DeleteFarmAttacks();
	},false);
	a.className='buttonDown20';
	//a.style.paddingLeft='30px';
	a.innerHTML='<span>Delete Farm</span>';
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
	this.Log('Clear old messages, keeping '+keepReports);
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
		a.innerHTML='<span>'+(trainTroops[t.GetCurrentCityId()]==type?'Auto training':'No auto training')+'</span>';
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
GetCurrentCityName:function() {
	var t=this;
	var h=t.GetCitiesHash(t.GetSeed().cities);
	return h[t.GetCurrentCityId()][1];
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



OnImpendingAttack:function() {
	var t=this;
	this.Log("impending attack");
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



SendChat:function(name,mess) {
//  <div class="postaction"><input id="mod_comm_input" autocomplete="off" type="text"><a class="button20"><input                    value="SEND" style="display: none;" type="submit"><span>Chat</span></a></div>
// div id=mod_comm_list2
	var t=this;
	var inp=document.getElementById('mod_comm_input');
	inp.value="@"+name+' '+mess;
	t.Log('Send chat:'+mess);
	unsafeWindow.Chat.sendChat();
},


GetLatestChatStr:function(chatObj) { 
	return chatObj.name+'#'+chatObj.time+'#'+chatObj.text.split(/[\.\?]/)[0]; 
},
GetLatestChat:function(h) {
	var t=this;
	var latestChats=JSON2.parse(t.GetValue('LatestChat','[]'));
	if(latestChats.length>25) {
		latestChats.splice(0,1);
	}
	for(var c=0; c<latestChats.length; c++) {
		var chatObj=latestChats[c];
		h[t.GetLatestChatStr(chatObj)]=1;
	}
	return latestChats;
},
SetLatestChat:function(chatObj) {
	var t=this;
	t.SetValue('LatestChat',JSON2.stringify(chatObj));
},

GetChatTimeNum:function(time) {
	var tarr=time.split(':');
	if(!time) return undefined;
	var timeNum=(tarr[0]*60)+tarr[1];
	return timeNum;
},
GetChatObj:function(htmlObj) {
	var nm=nHtml.FindByXPath(htmlObj,".//a[contains(@class,'nm')]");
	var fromMe=nHtml.FindByXPath(htmlObj,".//span[contains(@class,'nm')]");
	var time=nHtml.FindByXPath(htmlObj,".//span[contains(@class,'time')]");
	var tx=nHtml.FindByXPath(htmlObj,".//div[contains(@class,'tx')]");
	if(!nm || !time || !tx) { return undefined; }
	var nameArr=nm.innerHTML.split(' ',2);
	return { 
		'obj':htmlObj,'textObj':tx, 'name':nm.innerHTML,
		'time':time.innerHTML,'text':tx.innerHTML,
		'shortName':nameArr[1],
		'timeNum':this.GetChatTimeNum(time.innerHTML),'fromMe':fromMe?1:0
	};
},

IterateChat:function(func) {
	var t=this;
	var comm=document.getElementById('mod_comm_list2');
	var directs=nHtml.FindAllByXPath(comm,".//div[contains(@class,'direct')]");
	var chats=[];
	for(var d=directs.length-1; d>=0; d--) {
		var direct=directs[d];
		var chatObj=this.GetChatObj(direct);
		//t.CleanChat(chatObj);
		if(chatObj) {
			chats.push([direct,chatObj]);
		}
	}
	var latestChatFound=null;
	var lastNotProcessed=null;
	//var chatsOk=[];

	var latestChatsH={};
	var latestChats=t.GetLatestChat(latestChatsH);
	for(var c=0; c<chats.length; c++) {
		var chatObj=chats[c][1];

		var cstr=t.GetLatestChatStr(chatObj);
		if(!latestChatsH[cstr]) {
			chatObj.notProcessed=true;
			latestChatsH[cstr]=chatObj;
			latestChats.push(chatObj);
		}
	}
	t.SetLatestChat(latestChats);

	for(var c=0; c<chats.length; c++) {
		var chatI=chats[c];
		var direct=chatI[0];
		var chatObj=chatI[1];
		func.call(this,direct,chatObj);
	}
},


//latestChat:0,
/*
HideChat:function() {
	this.IterateChat(function(direct,chatObj) {
		if(chatObj.latestChat>t.latestChat) {
			t.latestChat=chatObj.latestChat;
			if(chatObj.text.substr(0,1)=='#') {
				direct.style.display='none';
			}
		}
	});
},
*/

AddChatButtons:function() {
	var t=this;
	if(document.getElementById('KOCAttackChat')) return;
	var inp=document.getElementById('mod_comm_input');
	var div=document.createElement('div');
	div.id='KOCAttackChat';
	div.style.display='none';
	
	
	var remoteControl=document.createElement('a');

	var onlyNonAttacks=document.createElement('input');
	onlyNonAttacks.type='checkbox';
	onlyNonAttacks.checked=t.options.remoteAttackTypeAllowed[0]?false:true;
	function onlyNonAttacksChanged() { 
		t.options=t.GetOptions();
		t.options.remoteAttackTypeAllowed=onlyNonAttacks.checked?[0,1,1,1,1,1]:[1,1,1,1,1,1];
		t.SetOptions(t.options);
	}
	onlyNonAttacks.addEventListener('click',function() {
		onlyNonAttacksChanged();
	},false);
	onlyNonAttacks.addEventListener('change',function() {
		onlyNonAttacksChanged();
	},false);

	div.appendChild(document.createElement("br"));
	div.appendChild(onlyNonAttacks);
	div.appendChild(document.createTextNode("Only allow non attacks"));
	
	var allowUserBox=document.createElement('textarea');
	allowUserBox.cols='20'; allowUserBox.rows='6';
	var allowUsersHash=JSON2.parse(t.GetValue('AllowUsersRemoteControl','{}'));
	var txt='';
	for(var user in allowUsersHash) {
		txt+=user+"\n";
	}
	allowUserBox.value=txt;

	var player=document.createElement('input');
	
	var status=document.createElement('a');
	status.innerHTML='<span>Status</span>';
	status.className='button25';
	status.href='javascript:;';
	status.addEventListener('click',function() {
		t.SendChat(player.value,"units?");
	},false);

	function ChangeAllowUserBox() {
		var users=allowUserBox.value.split("\n");
		var usersHash={};
		for(var u=0; u<users.length; u++) {
			var user=users[u].trim();
			if(user!="") {
				usersHash[user]=1;
			}
		}
		t.SetValue('AllowUsersRemoteControl',JSON2.stringify(usersHash));
		t.allowUsersHash=null;
	}
	allowUserBox.addEventListener('change',function() {ChangeAllowUserBox();},false);
	allowUserBox.addEventListener('keyup',function() {ChangeAllowUserBox();},false);
	div.appendChild(document.createElement("br"));
	div.appendChild(document.createTextNode("Allow these players to control you..."));
	div.appendChild(allowUserBox);
	
	remoteControl.innerHTML='<span>Remote control</span>';
	remoteControl.className='button25';
	div.appendChild(document.createElement("br"));
	div.appendChild(document.createTextNode("Player:"));
	div.appendChild(player);
	div.appendChild(status);

	remoteControl.addEventListener('click',function() {
		div.style.display=div.style.display=='none'?'block':'none';
	},false);
	
	inp.parentNode.appendChild(remoteControl);
	inp.parentNode.appendChild(div);
},

GetCitiesHash:function(arr) {
	var h={};
	for(var a=0; a<arr.length; a++) {
		var city=arr[a];
		var newA=[]
		Array.prototype.push.apply(newA, city);

		h[city[0]]=newA;
	}
	return h;
},

ChatFuncs:{
	'attack':{
		'question':function(chatObj,info) {
			// save an attack
			var t=this;
			if(info!="" && info.substr(0,1)=="{") {
				var i=JSON2.parse(info);
				i.attack.fromPlayer=chatObj.shortName;
				chatObj.textObj.innerHTML="attack?To:"+i.attack.x+','+i.attack.y+', Troops:'+i.attack.troops.join(',').replace('null','');
			}
			if(!chatObj.notProcessed) { return; }
			
			if(!t.options.remoteAttackTypeAllowed[i.attack.type]) {
				t.Log("Remote attack type "+i.attack.type+" not allowed");
				t.SendChat(chatObj.shortName,"attack.Failed, attack type not allowed");
				return;
			}

			t.Log("Remote attack for:"+i.city+', from:'+chatObj.shortName);
			t.SetValue('RemoteAttack_'+i.city,JSON2.stringify(i.attack));
			
			var autoAttack=this.GetAutoAttack();
			if(!autoAttack) {
				//~~~ we have to move to the correct city??
			}
		},
		'answer':function(chatObj,info) {
			if(chatObj.textObj.innerHTML!=chatObj.text) {
				chatObj.textObj.innerHTML=chatObj.text;
			}
		}
	},
	'units':{
		'question':function(chatObj,info) {
			if(!chatObj.notProcessed) { return; }
			var t=this;
			var seed=t.GetSeed();
			
			t.SendChat(chatObj.shortName,"units."+JSON2.stringify({
				'cities':t.GetCitiesHash(seed.cities),
				'units':seed.units,
			}));
		},
		'answer':function(chatObj,info) {
			var t=this;
			// {"city24479":{"tick":1297589617,"rec1":"[756220044, 2592000000, 7100, 3033]","rec2":"[539696566, 1836000000, 5000, 0]","rec3":"[191319892, 1548000000, 4200, 0]","rec4":"[4512787, 1512000000, 4100, 0]"}}
			var infoObj=JSON2.parse(info);
			var res=infoObj.units;
			var cities=infoObj.cities;
			
			chatObj.textObj.innerHTML='';
			var table=document.createElement('table');
			//table.className='direct';
			function AddCell(tr) {
				var td=tr.insertCell(-1);
				//td.className='direct';
				td.style.backgroundColor='#ffde75';
				td.style.textAlign='right';
				return td;
			}
			for(var city in res) {
				var resObj=res[city];
				
				var tr=table.insertRow(-1);
				//var cityTd=tr.insertCell(-1);
				var cityTd=AddCell(tr);
				cityTd.colspan='4';
				cityTd.style.fontWeight='bold';
				var cityM=/([0-9]+)$/.exec(city);
				var cityObj=cities[cityM[1]];
				if(!cityObj) {
					t.Log('Cannot find city:'+cityM[1]);
					continue; 
				}
				
				cityTd.innerHTML=cityObj[1];
				//for(var r=1; r<=4; r++ ) {
				for(var unt in resObj) {
					//var rarr=JSON2.parse(resObj['rec'+r].replace(' ',''));
					var units=parseInt(resObj[unt]);
					
					if(units<=0) continue;
					var tr=table.insertRow(-1);
					AddCell(tr).innerHTML=unsafeWindow.unitcost[unt][0];
					AddCell(tr).innerHTML=units;
				}
			}
			chatObj.textObj.appendChild(table);
		},
	}
},

allowUsersHash:null,
allowUsersHashCount:0,
ChatAdded:function(chatObj) {
	var t=this;
	if(chatObj) {
		if(t.allowUsersHash==null) {
			t.allowUsersHashCount=0;
			t.allowUsersHash=JSON2.parse(t.GetValue('AllowUsersRemoteControl','{}'));
			for(var u in t.allowUsersHash) {
				t.allowUsersHashCount++;
			}
		}
		if(t.allowUsersHashCount==0) { return; }

		var cArr=/^([^\?\.]+)([\.\?])(.*)$/.exec(chatObj.text);
		if(!cArr) {
			return;
		}
		var cmd=cArr[1]
		var info=cArr[3];
		var question=false;
		
		if(chatObj.fromMe) {
			chatObj.obj.style.borderBottom='1px solid #0f0';
		}
		if(chatObj.notProcessed) {
			chatObj.obj.style.borderLeft='1px solid #ff0';
			//chatObj.obj.appendChild(document.createTextNode(' notprocessed '));
		}
		
		var cmdInfo=t.ChatFuncs[cmd];

		if(cArr[2]=='?') {
			question=true;
		} else {
		}
		
		if(cmdInfo) {
			// hide unreadable requests that are json
			var shortCmd=(cmd+cArr[2]);

			if(chatObj.textObj.innerHTML!=shortCmd && info.substr(0,1)=='{') {
				chatObj.textObj.innerHTML=shortCmd;
			}
		}
		
		if(chatObj.fromMe) {
			return;
		}
		var done=0;

		// process chat
		if(chatObj.notProcessed) {
			t.Log('remote command:'+cmd+cArr[2]+', not processed:'+chatObj.notProcessed);
		}
		if(cmdInfo) {
			window.setTimeout(function() {
				if(question) {
					if(t.allowUsersHash[chatObj.shortName]) {
						cmdInfo['question'].call(t,chatObj,info);
					} else {
						chatObj.obj.appendChild(document.createTextNode("Player does not have permission: "+chatObj.shortName));
					}
				} else {
					cmdInfo['answer'].call(t,chatObj,info);
				}
			},0);				
		}
	} else {
		t.Log('Chat object failed');
	}
	return true;
},
CheckChat:function() {
	var t=this;
	var comm=document.getElementById('mod_comm_list2');
	var firstChatRecv=false;
	var firstTimeout=null;
	if(!t.options.remoteAttack) { return; }
	if(comm) {
		t.AddChatButtons();
		comm.addEventListener('DOMNodeInserted',function(e) {
			window.setTimeout(function() {
				if(firstTimeout==null) {
					firstTimeout=window.setTimeout(function() {
						t.IterateChat(function(direct,chatObj) {
							t.ChatAdded(chatObj);
						});
						firstTimeout=null;
					},200);
				} else {
//						t.Log("Maybe too many chat messages, chat already processing.");
				}
			},0);
		},false);
	
		return;
	}
	window.setTimeout(function() {
		t.CheckChat();
	},2000);
},




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
DeleteTransports:function() {
		var t=this;
		this.IterateAttacks(function(name,value) {
			var nameI=name.split('_');
			if(nameI.length<3) return;
			var xy=nameI[2].split(',');
			if(value=="") return;
			var attack=JSON2.parse(value);
			if(!attack) return;
			var attackX = xy[0];
			var attackY = xy[1];
			if(attack.type == 1){				
			t.DeleteAttack(attackX, attackY);
			}
			return true;
		});
		window.alert("All stored transports for this domain have been deleted.\nClick the ok button to reload.");
	},
	ListTransports:function() {
		var t=this;
		var fTransport = 0;
		this.IterateAttacks(function(name,value) {
			var nameI=name.split('_');
			if(nameI.length<3) return;
			var xy=nameI[2].split(',');
			if(value=="") return;
			var attack=JSON2.parse(value);
			if(attack.type == 1){
				WinLog.write ("Name: "+name+" Value: "+value);
				fTransport = 1;
				return true;
			}
		});
		if (!fTransport){
			WinLog.write ("No Transports Found\n");
			return true;
		}				
	},
	ListAttacks:function() {
		var t=this;
		this.IterateAttacks(function(name,value) {
			WinLog.write (name+" "+value);
			return true;
		});
	},
	DetailAttacks:function() {
	  var t=this;
	  
	  var names=GM_listValues();
	  var currentServerId = t.GetServerId();
	  var attackPrefix='attack_'+currentServerId+'_';
	  for(var n=0; n<names.length; n++) {
		var name=names[n];
		var nameI=name.split('_');
		if(nameI.length<3) continue;
		var xy=nameI[2].split(',');
		if(name.substring(0,attackPrefix.length)!=attackPrefix) continue;
		var value = GM_getValue(name);
		if(value=="") continue;
		var attack=JSON2.parse(value);
		attack.xy=xy;
		if(!attack) continue;					
		t.attacks.push(attack);
	  }
	},
ExportAllToJSON:function() {
	var t=this;
	var names=this.browser_listValues();
	var obj={};
	var serverId=this.GetServerId();
	for(var n=0; n<names.length; n++) {
		var name=names[n];
		var sid=this.GetServerIdFromName(name);
		if(sid!=serverId) continue;
		var v=this.browser_getValue(name,null);
		if(v!=null && v!=undefined && v!="") {
			var ch=v.substr(0,1);
			if(ch=='[' || ch=='{') {
				try {
					obj[name]=JSON2.parse(v);
				} catch(e) {
					t.Log('Bad value for export:'+name+'='+v);
					obj[name]=v;
				}
			} else {
				obj[name]=v;
			}
		}
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
			var v=obj[name];
			if(typeof(v)=='object') {
				v=JSON2.stringify(v);
			}
			this.browser_setValue(name,v);
		}
	} catch(e) {
		window.alert('Import failed'+e);
	}
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
			GM_log("whoops, game not loaded after 60 secs problem. reloading.");
			t.SetValuesCache();
			//window.location.reload(true);
			t.ReloadWindow();
//			window.history.go(0);
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
		if(cityId!=null) t.pageLoaded=true;
		var cityChanged=cityId!=t.prevCurrentCity?true:false;
		if(cityChanged) {
			t.prevCurrentCity=cityId;
		}
		if((domTickUpto%10)==0) {
			t.HandleChatPane();
		}
		if((domTickUpto%20)==0) {
			t.CheckImpendingAttack();
		}

		if(cityChanged && cityId!=null) {
		
			// changed city
			setTimeout(function() {
				t.AddOptionsLink();
				t.DrawClosestFarms();
				t.AddViewAttacksLink();
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

	this.CheckChat();

	var withinDomInserted=false;
	document.body.addEventListener('DOMNodeInserted',function(e) {
		if(withinDomInserted) return;
//		var isStatuses=(e.target.className && e.target.className=='statues')?true:false;
//		if(isStatuses)
//			t.pageLoaded=true;
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



ReloadWindow:function (){
	var serverId=this.GetServerId();
	if (serverId == null || serverId <1){
		history.go(0);
		return;
	}
	var go = 'http://apps.facebook.com/kingdomsofcamelot/?s='+serverId;
	var t = '<FORM target="_top" action="'+ go +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=s value="'+ serverId +'"</form>';
	var e = document.createElement ('div');
	e.innerHTML = t;
	document.body.appendChild (e);
	setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
},

/*
WaitForReload:function() {
	var reload=this.GetValue('reload',0);
	if(reload) {
		this.SetValue('reload',0);

		GM_log('reload domain:'+this.GetServerId()+','+window.location.href);
		window.location.href=window.location.href;
	}
	
	var t=this;
	window.setTimeout(function() {
		t.WaitForReload();
	},2000);
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
function addCommasInt(n){
  nStr = parseInt(n) + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) {
    nStr = nStr.replace(rgx, '$1' + ',' + '$2');
  }
  return nStr;
}

function coordLink (x, y){
  var m = [];
  m.push ('(<a onclick="aaGotoMapHide (');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('); return false">');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('</a>)');  
  return m.join('');
}

unsafeWindow.aaGotoMapHide = function (x, y){
  try {
    unsafeWindow.Modal.hideModal();
  } catch (e){ }
  try {
    Modal.hideModal();
  } catch (e){ }
  unsafeWindow.aaGotoMap (x, y);  
}

unsafeWindow.aaGotoMap = function (x, y){
	var close = document.getElementById('KOCAttackViewAttacksCancel');
	nHtml.Click(close);
  setTimeout (function (){ 
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    var a = document.getElementById("mod_views").getElementsByTagName("a");
    for (var b = 0; b < a.length; b++) {
        a[b].className = ""
    }
    document.getElementById('mod_views_map').className = "sel";
    document.getElementById("maparea_city").style.display = 'none';
    document.getElementById("maparea_fields").style.display = 'none';
    document.getElementById("maparea_map").style.display = 'block';
    unsafeWindow.tutorialClear()
  }, 0);
};



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

var addCommasInt = function addCommasInt(n){  nStr = parseInt(n) + '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(nStr)) {    nStr = nStr.replace(rgx, '$1' + ',' + '$2');  }  return nStr;};

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
		[['modal_attack_do','modal_attack_doOld']],
		[['onSuccess:','onSuccess: marchSuccess=']],
		[['Modal.showAlert(printLocalError(','if(rslt.error_code==3 || rslt.error_code==8) { try {window.setTimeout(function() { retryMarch(); },(3*1000)); } catch(e) { alert("retry failed:"+e); }  } else { Modal.hideModalAll(); }  Modal.showAlert(printLocalError(']]
	];

	// make the attack troop boxes unlimited
	var modalAttackUpdateNumReplaces=[
		[['modal_attack_update_num','modal_attack_update_numOld']],
		[['e.value = d','']]
	];
	
	var attack_generatequeueReplaces=[
		[['attack_generatequeue','attack_generatequeueOld']],
		[
			['class=\\"army\\">" + g_js_strings.commonstr.army + ": "','style=\\"width: 145px !important\\" class=\\"army\\">"'],
			['class=\\"army\\">" + g_js_strings.commonstr.army + ": <span>"','style=\\"width: 145px !important\\" class=\\"army\\"><span style=\'display: inline\'>"']
		],
		[['class=\\"name','style=\\"width: 0px !important; display: none;\\" class=\\"name']],
		//[/123/g,'100']
	];

	var attack_generatequeueReplacesU=[
		[['var u = 0;','var u = "K:"+seed.knights["city" + currentcityid]["knt" + q].combat+", "; ']],
		[['u += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+r][0]; u+=uname[0]+uname[uname.length-1]+":"+x+", "; } ']],
	];
	var attack_generatequeueReplacesR=[
		[['var r = 0;','var r = "K:"+seed.knights["city" + currentcityid]["knt" + t].combat+", "; ']],
		[['r += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+p][0]; r+=uname[0]+uname[uname.length-1]+":"+x+", "; } ']],
	];
	var attack_generatequeueReplacesS=[
		[['var s = 0;','var s = "K:"+seed.knights["city" + currentcityid]["knt" + u].combat+", "; ']],
		[['s += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+q][0]; s+=uname[0]+uname[uname.length-1]+":"+x+", "; } ']],
	];
	var attack_generatequeueReplacesT=[
		[['var t = 0;','var t = "K:"+seed.knights["city" + currentcityid]["knt" + w].combat+", "; ']],
		[['t += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+q][0]; t+=uname[0]+uname[uname.length-1]+":"+x+", "; } ']],
	];
	var attack_generatequeueReplacesV=[
		[['var v = 0;','var v = "K:"+seed.knights["city" + currentcityid]["knt" + y].combat+", "; ']],
		[['v += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+q][0]; v+=uname[0]+uname[uname.length-1]+":"+x+", "; } ']],
	];


	if(!useRetryMarch) modalAttackReplaces.push(['Modal.hideModalAll();','']);
	var replaceFunc=function(name,replaces) {
		var modalAttackFunc=window[name].toString();
		var nameOld=name+'Old';
		var foundFailed=false;
		for(var a=0; a<replaces.length; a++) {
			var found=false;
			var repArr=replaces[a];
			for(var ra=0; ra<repArr.length; ra++) {
				var repI=repArr[ra];
				if(typeof(repI[0])=="object") {
					found=repI[0].exec(modalAttackFunc)?true:false;
				} else {
					found=modalAttackFunc.indexOf(repI[0])>=0?true:false;
				}
				if(found) break;
			}
			if(!found) {
				var err="modalAttackReplace: cannot find: "+repI[0]+','+modalAttackFunc;
				var sp=document.createElement('span');
				sp.style.color='#ccc';
				sp.appendChild(document.createTextNode(err));
				//document.body.insertBefore(sp,document.body.childNodes[0]);
				document.body.appendChild(sp);
				foundFailed=true;
				break;
			}
			
			modalAttackFunc=modalAttackFunc.replace(repI[0],repI[1]);
		}
		if(foundFailed) return;

		try {
			window[nameOld]=eval(modalAttackFunc);
//alert(window[nameOld].toString());		
		} catch(e) {
			alert(e+', bad func:'+modalAttackFunc);
		}

		window[name]=function(e) {
			// let our stuff in addListener run first.
			window.setTimeout(function() {
				eval(nameOld+'(e);');
			},100);
		}
	};
	
	var attackFuncStr=window['modal_attack_do'].toString();
	//if(attackFuncStr.indexOf('ajax.Request')<0) {
		modalAttackReplaces.push([
			['new (Ajax',"var marchSuccess=null; "+retryMarch+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew (Ajax"],
			['new Ajax',"var marchSuccess=null; "+retryMarch+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew Ajax"],
			['ajax.Request',"var marchSuccess=null; "+retryMarch+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\najax.Request"]
		]);
	//}
	replaceFunc('modal_attack_do',modalAttackReplaces);
	function AddArray(to,from) {
		for(var c=0; c<from.length; c++) { to.push(from[c]); }
	}
	
	var arr=[];
	AddArray(arr,attack_generatequeueReplaces);
	var funcStr=window['attack_generatequeue'].toString();
	if(funcStr.indexOf(' var v = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesV);
	} else if(funcStr.indexOf('; var u = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesU);
	} else if(funcStr.indexOf('; var r = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesR);
	} else if(funcStr.indexOf('; var s = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesS);
	} else if(funcStr.indexOf(' var t = 0;')>=0) {
		// camelotmain-150
		AddArray(arr,attack_generatequeueReplacesT);
	} else {
		var err="Unknown attack queue func: "+location.href+"\n"+funcStr;
		document.body.appendChild(document.createTextNode(err));
		GM_log(err);
	}
	replaceFunc('attack_generatequeue',arr);

	replaceFunc('modal_attack_update_num',modalAttackUpdateNumReplaces);


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

checkWhiteScreen();
DisableMixpanel();
unsafeWindow.cm.cheatDetector={
detect:function() { }
};

function checkWhiteScreen (){
	window.setTimeout(function() {
		GM_log("Check iFrame");
		var checknumber = 0;
		function checkiFrame() {
		var iFrame = null;
		var e = document.getElementById('app_content_130402594779').firstChild.firstChild;
		for (var c=0; c<e.childNodes.length; c++){
		  if (e.childNodes[c].tagName=='SPAN' && e.childNodes[c].firstChild.className == 'canvas_iframe_util'){
			iFrame = e.childNodes[c].firstChild; 
			break;
		  }
		}
		if (!iFrame){
		  var iframes = document.getElementsByTagName('iframe');
		  for (var i=0; i<iframes.length; i++){
			if (iframes[i].className=='canvas_iframe_util'){
			  iFrame = iframes[i];
			  break; 
			}
		  }
		}
		if (!iFrame && checknumber<10){
		  setTimeout (checkiFrame, 1000);
		  checknumber++;
		  return;
		} else if (checknumber>=10){
			KOCAttack.ReloadWindow();
			//window.history.go(0);
		}
		return;
		}
		checkiFrame();
	},10000);
}

function checkStrangeMagic (){
  if (!document.getElementById("kochead")){
  window.setTimeout ( function() { GM_log ("checkStrangeMajik REloading..."); KOCAttack.ReloadWindow(); }, 5000);
    popup (100,100,500,275, "<BR><CENTER>checkStrangeMajik <BR><BR>KofC NOT FOUND<BR>Refreshing in 5 seconds ...<BR><BR>");
  }  
}

function popup (left, top, width, height, content){
   var div = document.createElement('div');
   if (width)
       div.style.width = width;
   if (height) 
       div.style.height = height;
   if (left || top) {
       div.style.position = "relative";
       if (left)
           div.style.left = left;
       if (top)
           div.style.top = top;
   }
   if (content)
       div.innerHTML = content;
       
  div.style.background = "#ffc";
  div.style.border = "2px solid #000";
  div.style.zIndex = "999999";        // KOC modal is 100210 ?
  div.style.display = 'block';
  window.document.body.insertBefore(div, window.document.body.childNodes[0]);
  return div;
}

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
		KOCAttack.Listen();
		KOCAttack.SetupClearMessages();
		window.setTimeout(function(){checkStrangeMagic()}, 15000);
		SetupScripts();
	} else {
		window.setTimeout(function() { StartAll(); },200);
	}
}

if(location.href.indexOf('apps.facebook.com/kingdomsofcamelot/')>=0) {
	window.setTimeout(function() {
		
	},10000);
} else {
	StartAll();
}

