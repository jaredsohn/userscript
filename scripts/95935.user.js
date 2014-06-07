// ==UserScript==
// @name             KOCAttack - Hoyt Edition
// @version          0.7.8
// @namespace        KOCAttack-Extra
// @homepage         http://userscripts.org/scripts/show/89473
// @description      Same as the KOCAttack script from niknah (as of Oct. 24, 2010), but with some extra features.

// @include          *apps.facebook.com/kingdomsofcamelot*
// @include          *kingdomsofcamelot.com/*main_src.php*
// @include          *kingdomsofcamelot.com/*newgame_src.php*
// @include          *facebook.com/connect/uiserver.php*

// @require          http://sizzlemctwizzle.com/updater.php?id=89473
// ==/UserScript==

// Override the default alert functionality of the web browser (which causes the script to pause)
// Instead of displaying alert popups, messages will be displayed in the firefox console
unsafeWindow.alert = function(message) {
	console.info("Javascript Alert: "+message);
	if(typeof(GM_log)=="function"){
		GM_log("Javascript Alert: "+message);
	}
}
alert = unsafeWindow.alert;

// String prototypes
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }
String.prototype.StripQuotes = function() {
	return this.replace(/"/g,'');
};

/*
// Array remove function (found at http://ejohn.org/blog/javascript-array-remove/)
	Examples:
	Remove the second item from the array:
		ArrayRemoveItem(array, 1);
	Remove the second-to-last item from the array:
		ArrayRemoveItem(array, -2);
	Remove the second and third items from the array:
		ArrayRemoveItem(array, 1,2);
	Remove the last and second-to-last items from the array:
		ArrayRemoveItem(array, -2,-1);
*/
ArrayRemoveItem = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
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


var KOCAttack={
	startListenTime:null,
	prevAttack:{'x':"350",'y':'350'},
	options:null,
	iframeCommunicator:{},
	isChrome:navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
	valuesCache:{},
	seed:{},
	currentPage:null,

	DoUnsafeWindow:function(func, execute_by_embed) {
		if(this.isChrome || execute_by_embed) {
			var scr=document.createElement('script');
			scr.innerHTML=func;
			document.body.appendChild(scr);
		} else {
			try {  
				eval("unsafeWindow."+func);
			} catch (error) {
				this.Log("A javascript error has occurred when executing a function via DoUnsafeWindow. Error description: "+error.description);
			}
		}
	},

	GetSeed:function() {
		return unsafeWindow.seed;
	},

	ReloadWindow:function() {
		//this.DoUnsafeWindow('window.location.href=window.location.href.toString().replace(/&current_time=[0-9]*/i, "")+"&current_time="+Math.round(new Date().getTime() / 1000);');
		if(this.options.useAlternateReloadMethod){
			setTimeout (function (){window.location.href=window.location.href.toString().replace(/&current_time=[0-9]*/i, "")+"&current_time="+Math.round(new Date().getTime() / 1000);}, 0); 
		}else{
			//this.DoUnsafeWindow('window.location.reload(true);');
			this.DoUnsafeWindow('history.go(0);');
		}
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
			"<input id='KOCAttackLockAttackFromCity' type='checkbox' "+(this.options.lockAttackFromCity?'checked':'')+" /> Only launch attacks from city they were first launched from.<br />"+
			"<br />"+
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
			"<input id='KOCAttackDisableInviteFriends' type='checkbox' "+(this.options.disableInviteFriends?'checked':'')+" /> Disable the annoying \"Invite Friends\" popup dialog in-game.<br />"+
			"<input id='KOCAttackAutoHelpAlliance' type='checkbox' "+(this.options.autoHelpAlliance?'checked':'')+" /> Automatically help alliance members with building/researching.<br />"+
			"<input id='KOCAttackHideAllianceHelpRequests' type='checkbox' "+(this.options.hideAllianceHelpRequests?'checked':'')+" /> Hide alliance help requests/reports in chat (if above is checked, then after helping).<br />"+
			"<input id='KOCAttackAutoPublishGamePopups' type='checkbox' "+(this.options.autoPublishGamePopups?'checked':'')+" /> Automatically publish game popups (such as help requests) to facebook wall.<br />"+
			"If above is checked, what privacy setting should we use? <select id='KOCAttackAutoPublishPrivacy'><option value='80'>Everyone</option><option value='50'>Friends of Friends</option><option value='40'>Friends Only</option><option value='10'>Only Me</option></select><br />"+
			"</td></tr>"+
			
			"</td></tr>"+
			"<tr><td valign='top' align='center'><img src='img/gems.png' /></td><td valign='top'>"+
			"<input id='KOCAttackAutoLogBackIn' type='checkbox' "+(this.options.autoLogBackIn?'checked':'')+" /> Automatically log back into domain if disconnected due to maintenance or server down-time.<br />"+
			"<input id='KOCAttackUseAlternateReload' type='checkbox' "+(this.options.useAlternateReloadMethod?'checked':'')+" /> Use alternate reload method (potentially useful if you keep getting the \"To display this page, Firefox must send information that will repeat any action\" error message).<br />"+
			"<input id='KOCAttackEnableLogging' type='checkbox' "+(this.options.enableLogging?'checked':'')+" /> Enable diagnostic logging in the Firefox error console messages window (useful if trying to debug a problem or if you are submitting details along with a bug report).<br />"+
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
			
			"<a id='KOCAttackOptionsSave' class='button20'><span>Save</span></a> <a id='KOCAttackOptionsCancel' class='button20'><span>Cancel</span></a> <a id='KOCAttackOptionsReset' class='button20'><span>Reset options</span></a> <a id='KOCAttackOptionsResetAll' class='button20'><span>Reset all!</span></a> <a id='KOCAttackDeleteAllStoredAttacks' class='button20'><span>Delete all stored attacks</span></a></form>";
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
			//window.location.reload(true);
			t.ReloadWindow();
		},false);
		ById('KOCAttackDeleteAllStoredAttacks').addEventListener('click',function() {
			t.DeleteAllStoredAttacks();
			//window.location.reload(true);
			t.ReloadWindow();
		},false);
		nHtml.SetSelect(ById('KOCAttackAutoPublishPrivacy'),this.options.autoPublishPrivacySetting);

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
			
			var prev_disableInviteFriends = t.options.disableInviteFriends;
			t.options.disableInviteFriends=ById('KOCAttackDisableInviteFriends').checked;
			if(prev_disableInviteFriends != t.options.disableInviteFriends){
				alert("You changed the option for disabling/enabling the \"Invite Friends\" feature.\nPlease note: You will need to refresh the entire game window for the new setting to take effect!");
			}
			
			t.options.autoHelpAlliance=ById('KOCAttackAutoHelpAlliance').checked;
			t.options.hideAllianceHelpRequests=ById('KOCAttackHideAllianceHelpRequests').checked;
			t.options.autoPublishGamePopups=ById('KOCAttackAutoPublishGamePopups').checked;
			t.options.autoPublishPrivacySetting=ById('KOCAttackAutoPublishPrivacy').value;
			
			t.options.autoLogBackIn=ById('KOCAttackAutoLogBackIn').checked;
			t.options.useAlternateReloadMethod=ById('KOCAttackUseAlternateReload').checked;
			t.options.enableLogging=ById('KOCAttackEnableLogging').checked;

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
		// Resize main tab bar container
		var tab_container = ById("main_engagement_tabs");
		tab_container.style.width = "715px";
		// Create new tab
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
			toggle.innerHTML='<span>Auto Attack - On</span>';
		} else {
			toggle.innerHTML='<span>Auto Attack - Off</span>';
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
		if(this.options.enableLogging){
			str=this.GetServerId()+":"+str;
			GM_log(str);
		}
	},

	currentServerId:-1,
	GetServerId:function() {
		var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
		if(m) {
			this.currentServerId = m[1];
		}
		// Attempt to pull current server id from greasemonkey cache for cross-domain calls
		if(this.currentServerId<0){
			this.currentServerId = GM_getValue("KOCAttackLastKnownServerID",-1);
		}
		return this.currentServerId;
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
			"randomPercent":10,
			"keepReports":10,
			"attackMaxDistance":60,
			"lockAttackFromCity":true,
			"waitAfterCitiesDone":20,
			"autoAttackCitiesDoneMax":2,
			"changeCitySecs":20,
			"retryMarch":true,
			"noViewReports":false,
			"chromeKeepReports":2,
			"percentOfPopToTrain":75,
			"autoGoldHappiness":99,
			"disableInviteFriends":true,
			"autoHelpAlliance":true,
			"hideAllianceHelpRequests":false,
			"autoPublishGamePopups":false,
			"autoPublishPrivacySetting":"80",
			"autoLogBackIn":true,
			"useAlternateReloadMethod":false,
			"enableLogging":false,
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
	
	ClearCrossIframeCommands:function() {
		this.SetValue('CrossIframeCommands',JSON.stringify({}));
	},
	GetCrossIframeCommands:function() {
		var json=this.GetValue('CrossIframeCommands','{}');
		if(json=='') json='{}';
		var commands=JSON2.parse(json);
		if(!commands.queue || commands.queue instanceof Array !== true){
			commands.queue = new Array();
		}
		return commands;
	},
	SetCrossIframeCommands:function(v) {
		this.SetValue('CrossIframeCommands',JSON2.stringify(v));
	},
	AddCrossIframeCommand:function(pageName, functionCall, functionParameters) {
		var command = {};
		command.pageName = pageName;
		command.functionCall = functionCall;
		var commands = this.GetCrossIframeCommands();
		commands.queue.push(command);
		this.SetCrossIframeCommands(commands);
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

	isSuicideAttackDefinedAtLocation:function(x,y) {
		var attack=this.GetAttack(x,y);
		if(!attack){ return false; }
		if(attack.suicidewave) { return true; }
		if(attack.a && attack.a.suicidewave){ return true; }
		return false;
	},

	IsFirstAttackAtLocation:function(x,y) {
		if(this.prevAttack.x && this.prevAttack.y){
			if(this.prevAttack.x==x && this.prevAttack.y==y) {
				this.Log("Previous attack matches current attack. This is not first attack!");
				return false;
			}
		}
		var attack=this.GetAttack(x,y);
		if(!attack){
			this.Log("Previous attack not defined. This is first attack!");
			return true;
		}
		if(attack.a) { attack = attack.a; }
		if(!attack.suicidewavetime || !attack.time){
			this.Log("Suicide wave time: "+attack.suicidewavetime+". Attack time: "+attack.time+". This is first attack!");
			return true;
		}
		var nowSecs=new Date().getTime()/1000;
		// If the suicide attack was launched before the attack time allowed beween the same 
		// camp/wilderness/city/transport, and the normal attack was launched *after* the suicide attack,
		// then we can safely re-launch the suicide attack by pretending that this is the "First Attack" again.
		var attackDelay=this.GetAttackDelay(attack);
		//this.Log("Attack Delay for ("+x+","+y+"): "+attackDelay);
		if( attack.suicidewavetime <= (nowSecs-(this.options.attackDelay+attackDelay)) && attack.time > attack.suicidewavetime && attack.time < nowSecs-attackDelay){
			this.Log("Suicide wave attack timer expired. This is first attack!");
			return true;
		}
		return false;
		//if(!this.prevAttack) return true;
		//return ((this.prevAttack.x==x && this.prevAttack.y==y)?false:true);
	},

	GetCommandHistory:function(history_log_name) {
		if(!history_log_name){
			var history_log_name = "default";
		}
		var json=this.GetValue('PreviousCommandHistory_'+history_log_name,'{}');
		if(json=='') json='{}';
		var json_object=JSON2.parse(json);
		if(!json_object['items']){
			json_object['items'] = Array();
		}
		return json_object;
	},

	AddToCommandHistory:function(command_string, history_log_name, log_length_limit) {
		if(!command_string){ return false; }
		if(!history_log_name){ var history_log_name = "default"; }
		// Default to a history length of 20 commands
		if(!log_length_limit){ var log_length_limit = 20; }
		// Get the previous history of commands
		var previous_commands = this.GetCommandHistory(history_log_name);
		var items = previous_commands['items'];
		// Add the new command
		items.push(command_string);
		// Limit the history length
		if(items.length>log_length_limit){
			items = items.slice(items.length-log_length_limit);
		}
		previous_commands['items'] = items;
		this.SetValue('PreviousCommandHistory_'+history_log_name,JSON2.stringify(previous_commands));
	},

	FindInCommandHistory:function(command_string, history_log_name) {
		if(!command_string){ return false; }
		if(!history_log_name){ var history_log_name = "default"; }
		// Get the previous history of commands
		var previous_commands = this.GetCommandHistory(history_log_name);
		var items = previous_commands['items'];
		for(var i=0; i<items.length; i++){
			if(items[i] == command_string){
				return true;
			}
		}
		return false;
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

	AttackLastSentTime:0,	
	UpdateAttackLastSentTime:function(){
		this.AttackLastSentTime = new Date().getTime()/1000;
		this.SetValue('AttackLastSentTime',this.AttackLastSentTime);
	},
	
	SendingMultipleWaves:false,
	IsCurrentlySendingMultipleWaves:function() {
		if(this.AttackLastSentTime == 0){
			this.AttackLastSentTime = this.GetValue('AttackLastSentTime',0);
		}
		var nowSecs = new Date().getTime()/1000;
		var waveTimerDelay = this.options.attackDelay*2;
		var timeDifference = nowSecs-this.AttackLastSentTime;
		//this.Log("nowSecs: "+nowSecs+" waveTimerDelay: "+waveTimerDelay+" timeDifference: "+timeDifference+" SendingMultipleWaves: "+this.SendingMultipleWaves);
		// If the last attack was sent at a time ago that is more than twice the attack delay,
		// then we assume something failed and we reset the multiple wave tracker so everything can continue.
		if(timeDifference > waveTimerDelay && this.SendingMultipleWaves==true){
			this.SendingMultipleWaves=false;
			this.Log("Multiple wave timer \("+waveTimerDelay+"\ seconds) has expired. Last known attack was sent "+timeDifference+" seconds ago. Resetting timer and continuing...");
		}
		return this.SendingMultipleWaves;
	},
	
	SetAttackFromGuiXY:function(x,y,box,isSuicideWave) {
		if(!isSuicideWave){
			var isSuicideWave = false;
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
		var comment=ById('KocAttackComment');
		var type=ById('modal_attack_atktype');
		if(!type) {
			throw("Cannot find attack type");
		}

		if(totalTroops<=0) {
			this.Log("No troops, not saving attack");
			return null;
		}

		// ignore anything other than attack
		if(type.selectedIndex==0) {
			var attack=this.GetAttack(x,y);
			if(!attack) attack={};
			attack.type=type.selectedIndex;
			if(comment){ attack.comment=comment.value; }
			var nowSecs=new Date().getTime()/1000;
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);
			var firstAttack=this.IsFirstAttackAtLocation(x,y);
			this.Log("First attack?: "+firstAttack);
			
			this.Log("Suicide attack defined? : "+SuicideAttackDefined);
			
			if(totalTroops>0 && (((troops[1]+troops[2]+troops[10])==totalTroops && firstAttack) || isSuicideWave)) {
				if(totalTroops>0 && ((troops[1]+troops[2]+troops[10])==totalTroops && firstAttack)){
					this.Log("Suicide attack determined by troop type and by first attack");
				}else if(isSuicideWave){
					this.Log("Suicide attack determined by checkbox");
				}
				// nothing but supply troops and/or militiamen and/or ballista. This must be an anti-defense suicide wave attack
				this.Log("Suicide wave :"+troops);
				attack.suicidewave=troops;
				attack.currenttattackwavetype = "suicide";
				attack.suicidewavetime = nowSecs;
				this.SendingMultipleWaves = true;
			} else {
				this.Log("Normal wave :"+troops);
				attack.time=nowSecs;
				if(firstAttack) {
					attack.suicidewave=undefined;
				}
				attack.currenttattackwavetype = "normal";
				attack.troops=troops;
				this.SendingMultipleWaves = false;
			}
			
			//if (this.options.lockAttackFromCity) {
			attack.fromCity=this.GetCurrentCityId();
			//}

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
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);

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
			
			//if (this.options.lockAttackFromCity) {
			attack.fromCity=this.GetCurrentCityId();
			//}
			//attack.ignore=undefined;
			attack.currenttattackwavetype = "transport";
			this.prevAttack={'x':x,'y':y};
			this.SetAttack(x,y,attack);
			return attack;
		} else {
			// Reset it
			this.prevAttack={'x':"350",'y':'350'};
		}
		return null;
	},

	ToggleCurrenttAttackWaveType:function(x,y,manual_setting) {
		var original_attack = this.GetAttack(x,y);
		if(original_attack) {
			var attack = original_attack;
			if(original_attack.a){
				attack = original_attack.a;
			}
			var previousattackwavetype = 'undefined';
			if(attack){
				//this.Log("Inspecting attack: "+inspect(attack,10));
				if(attack.currenttattackwavetype){
					previousattackwavetype = attack.currenttattackwavetype;
				}
				if(manual_setting){
					attack.currenttattackwavetype = manual_setting;
				}else if(attack.suicidewave && attack.currenttattackwavetype == "bulkadded"){
					attack.currenttattackwavetype = "suicide";
				}else{
					// Toggle back and forth
					if(attack.suicidewave && attack.currenttattackwavetype == "normal"){
						attack.currenttattackwavetype = "suicide";
					}else{
						attack.currenttattackwavetype = "normal";
					}
				}
				this.Log("Toggling attack for ("+x+", "+y+") from "+previousattackwavetype+" to "+attack.currenttattackwavetype);
				if(original_attack.a){
					original_attack.a = attack;
					attack = original_attack;
				}
				this.SetAttack(x,y,attack);
				return attack.currenttattackwavetype;
			}else{
				return false;
			}
		}else{
			return false;
		}
	},

	BulkAddCoords:function(box,coordsText,force,locationType,isSuicideWave) {
		if(!locationType){
			var locationType = "Camp";
		}
		if(!isSuicideWave){
			var isSuicideWave = false;
		}
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
			
			var currenttattackwavetype = "bulkadded";
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);
			var previous_suicidewave = undefined;
			if(attack && (SuicideAttackDefined || isSuicideWave)){
				previous_suicidewave = attack.suicidewave;
			}
			
			if(attack && !force) {
				if(SuicideAttackDefined && isSuicideWave==true){
					this.Log('Suicide wave for '+x+','+y+' has already been added. Try over-writing it.');
					continue;
				}else if(attack.troops){
					this.Log('Attack wave for '+x+','+y+' has already been added. Try over-writing it.');
					continue;
				}
			}
			var attack=this.SetAttackFromGuiXY(x,y,box,isSuicideWave);
			if(attack) {
				attack.levelInfo={'type':locationType,'level':0};
				attack.fromCity=this.GetCurrentCityId();
				var nowSecs=new Date().getTime()/1000;
				var monthAgo=nowSecs-(60*60*24*31);
				attack.time=monthAgo;
				if(SuicideAttackDefined || isSuicideWave || previous_suicidewave){
					// set up suicide wave before attack time, according to "seconds in between sending each attack"
					attack.suicidewavetime = attack.time - this.options.attackDelay;
					if(previous_suicidewave && (!SuicideAttackDefined || !isSuicideWave)){
						this.Log("Previous suicide wave for this attack was over-written by new attack. Merging and restoring...");
						attack.suicidewave = previous_suicidewave;
					}
				}
				attack.ignore=undefined;
				attack.currenttattackwavetype=currenttattackwavetype;
				this.SetAttack(x,y,attack);
				this.Log(x+','+y+' attack added: '+inspect(attack));
				this.Log("current attack wave type: "+attack.currenttattackwavetype);
				added++;
			}
		}
		// Redraw attacks on map listing
		this.DrawClosestFarms();
		// done
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
		AddHtml(bulkAddDiv,"<hr />");
		AddHtml(bulkAddDiv,"Copy and paste coords here (ie. 343,434) one on each line...<br />Note: it will only add the target using the current number of troops on this screen.<br /><input id='KOCAttackBulkAddForce' type='checkbox' /> Overwrite existing attack if one already exists<br />");

		
		// radio boxes for defining bulk coordinate type
		AddHtml(bulkAddDiv,"<hr />");
		AddHtml(bulkAddDiv,"Type of Locations (All coordinates must match this type):<br />");
		var arrData = [["Camp", "Camps"],["Wilderness", "Wildernesses"]];
		for (var i=0; i < arrData.length; i++){
			var objRadItem = document.createElement("input");
			objRadItem.type = "radio";
			objRadItem.name = "KOCAttackBulkAddLocationType";
			objRadItem.id = "KOCAttackBulkAddLocationType_" + arrData[i][0];
			objRadItem.value = arrData[i][0];

			if(i == 0) {objRadItem.defaultChecked = true; objRadItem.checked = true; };

			var objTextNode = document.createTextNode(" " + arrData[i][1]);

			var objLabel = document.createElement("label");
			objLabel.htmlFor = objRadItem.id;
			objLabel.appendChild(objRadItem);
			objLabel.appendChild(objTextNode);

			bulkAddDiv.appendChild(objLabel);
			AddHtml(bulkAddDiv," ");
		};
		AddHtml(bulkAddDiv,"<hr />");
		
		AddHtml(bulkAddDiv,"<input id='KOCAttackBulkAddSuicideWave' type='checkbox' onClick='javascript:document.getElementById(\"KOCAttackBulkAddLocationType_Wilderness\").checked=true;' /> This is an initial suicide wave to wipe out traps on a wilderness.<br />");
		
		AddHtml(bulkAddDiv,"<hr />");
		
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
			// Determine location type
			var locationType = "Camp"; // Default value
			var locationTypeRadioBoxes = ByName('KOCAttackBulkAddLocationType');
			for(var i = 0; i < locationTypeRadioBoxes.length; i++) {
				if(locationTypeRadioBoxes[i].checked) {
					locationType = locationTypeRadioBoxes[i].value;
					break;
				}
			}
			// Determine attack wave type
			var isSuicideWave = ById('KOCAttackBulkAddSuicideWave').checked;
			// Add the coordinates
			var added=t.BulkAddCoords(box,coords.value,ById('KOCAttackBulkAddForce').checked,locationType,isSuicideWave);
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
		return this.GetValue('AutoGold,'+this.GetCurrentCityId(),true);
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
		var t=this;
		var castle=ById('slot_0');
		nHtml.Click(castle);
		this.DoUnsafeWindow("changeCastleModalTabs(2);");
		var wildsWindow=ById('castle_2');
		var rows=wildsWindow.getElementsByTagName('tr');
		if (rows.length==1) { //no wilds
			this.DoUnsafeWindow("Modal.hideModal();");
			return;
		}
		var commands = new Array();
		for (i=0;i<rows.length;i++) {
			var abandonButton=rows[i].getElementsByTagName('a')[0];
			if (abandonButton==undefined) {
				continue;
			}
			var command=abandonButton.getAttribute('onclick');
			command=command.substring(0,command.length-13);
			if(command.indexOf("wilderness_abandon")>-1){
				var tmp_obj = new Object;
				tmp_obj.command = command;
				tmp_obj.clicked = false;
				commands.push(tmp_obj);
			}
		}
		var command_timer=0;
		var milliseconds_between=4000;
		for (var i=0;i<commands.length;i++) {
			window.setTimeout(function() {
				// Determine next unclicked button
				var unclicked_commandObj = undefined;
				for (var j=0;j<commands.length;j++) {
					if(!commands[j].clicked){
						t.DoUnsafeWindow(commands[j].command);
						window.setTimeout(function() {
							var mainbody = ById("mainbody");
							if(mainbody){
								var okay_btn=nHtml.FindByXPath(mainbody,".//a[contains(@class,'okay')]");
								if(okay_btn){
									nHtml.Click(okay_btn);
								}
							}
						},500);
						commands[j].clicked = true;
						break;
					}
				}
			},t.GetRandTime(command_timer));
			command_timer+=milliseconds_between;
		}
		window.setTimeout(function() {
			t.DoUnsafeWindow("Modal.hideModal();");
		},t.GetRandTime(command_timer));
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

	HandleChatPane:function() {
		var t=this;
		
		// Determine our own name so we can ignore our own requests
		var DisplayName = t.GetDisplayName();
		
		// Process chat pane
		var AllianceChatBox=ById('mod_comm_list2');
		if(AllianceChatBox){
		
			var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			if(chatPosts){
				// Loop through each post
				for (var i = 0; i < chatPosts.snapshotLength; i++) {
					thisPost = chatPosts.snapshotItem(i);
					//t.Log(thisPost.innerHTML);
					
					// Automatically help out with alliance requests
					if(this.options.autoHelpAlliance){
						
						// Make sure that this isn't our own request
						var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
						if(postAuthor.snapshotItem(0)){
							var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
							if(postAuthorName != DisplayName){
								// Look for any alliance assist links in this current post item
								var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
								if(helpAllianceLinks){
									for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
										thisLink = helpAllianceLinks.snapshotItem(j);
										// Check to see if link has already been clicked
										var alreadyClicked = thisLink.getAttribute("clicked");
										if(!alreadyClicked){
											// Mark it as clicked
											thisLink.setAttribute('clicked', 'true');
											// Execute the onclick code
											var myregexp = /(claimAllianceChatHelp\(.*\);)/;
											var match = myregexp.exec(thisLink.getAttribute("onclick"));
											if (match != null) {
												onclickCode = match[0];
												//t.Log(onclickCode);
												// Check alliance help command history to make sure link hasn't already been processed
												if(!t.FindInCommandHistory(onclickCode, 'alliance_help')){
													t.DoUnsafeWindow(onclickCode);
													// Add the onclick code to the alliance help command history
													this.AddToCommandHistory(onclickCode, 'alliance_help');
												}else{
													//t.Log("already clicked");
												}
											}
										}else{
											//t.Log("already clicked");
										}
									}
								}else{
									//t.Log("no alliance links found in current post");
								}
							}else{
								//t.Log("current post is by yourself");
							}
						}else{
							//t.Log("unable to find post's author");
						}
					}
					
					// Hide alliance requests in chat
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
					
					// Hide alliance reports in chat
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

	HandlePublishPopup:function() {
		var t=this;
		if (t.currentPage == "facebook_popup") {
			if(t.options.autoPublishGamePopups){
				// Check the app id (we only want to handle the popup for kingdoms of camelot)
				var FBInputForm = ById('uiserver_form');
				if(FBInputForm){
					var channel_input = nHtml.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
					if(channel_input){
						var current_channel_url = channel_input.value;
						if (current_channel_url.match(/http:\/\/.{0,100}kingdomsofcamelot\.com\/.{0,100}\/cross\.htm/i)) {
							var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'publish')]");
							var privacy_setting = nHtml.FindByXPath(FBInputForm,".//input[@type='hidden' and contains(@name, 'privacy_data') and contains(@name, 'value')]");
							if(publish_button && privacy_setting){
								// 80: Everyone
								// 50: Friends of Friends
								// 40: Friends Only
								// 10: Only Me
								privacy_setting.value = t.options.autoPublishPrivacySetting;
								nHtml.Click(publish_button);
							}
						}
					}		
				}
			}
		}
	},
	
	domainLoginTimer:null,
	domainLoginStartTime:null,
	domainLoginCurrentTime:null,
	domainLoginSeconds:30,
	domainLoginActionTaken:false,
	HandleDomainLogin:function() {
		var t=this;
		if (t.currentPage == "domain_selection" && t.options.autoLogBackIn && !t.domainLoginActionTaken) {
		
			if(!t.domainLoginStartTime){
				t.domainLoginStartTime = Math.round(new Date().getTime() / 1000);
			}
			t.domainLoginCurrentTime = Math.round(new Date().getTime() / 1000);
			var timeDifference = Math.round(t.domainLoginStartTime+t.domainLoginSeconds - t.domainLoginCurrentTime);
			if(timeDifference<0){ timeDifference=0; }
			
			var statusDiv=ById('KOCAttackLoginStatus');
			if(!statusDiv) {
				statusDiv=document.createElement('div');
				statusDiv.id='KOCAttackLoginStatus';
				statusDiv.style.position='relative';
				statusDiv.style.backgroundColor='#fff';
				statusDiv.style.border='3px solid #888';
				statusDiv.style.margin='30px 0px 0px 0px';
				statusDiv.style.padding='10px';
				statusDiv.style.display='none';
				var loginBox = ById("formoptions0");
				loginBox.appendChild(statusDiv);
			}
		
			// Find the top-most domain in the list (the most recent one)
			var playButtons=document.evaluate(".//a[contains(@class,'button20')]", unsafeWindow.document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			if(playButtons && playButtons.snapshotLength>0){
				//var firstPlayButton = playButtons.snapshotItem(0);
				//var domain_name = firstPlayButton.parentNode.parentNode.firstChild.innerHTML;
				//statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging into '+domain_name+' in '+timeDifference+' seconds...</center>';
				statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging back into KoC in '+timeDifference+' seconds...</center>';
				if(timeDifference==0){
					//t.Log("Loading URL: "+firstPlayButton.href);
					t.Log("Loading URL: http://apps.facebook.com/kingdomsofcamelot/");
					//statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging into '+domain_name+' now...</center>';
					statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging back into KoC now...</center>';
					var functionCall = {
						'action':'load_url',
						//'parameters':firstPlayButton.href
						'parameters':'http://apps.facebook.com/kingdomsofcamelot/'
					};
					t.AddCrossIframeCommand("domain_selection_app_page", functionCall);
					t.domainLoginActionTaken=true;
					// Reload current window if things are unsuccessful
					window.setTimeout(function() {
						t.ReloadWindow();
					},10000);
				}
			}else{
				statusDiv.innerHTML='<center>KoCAttack Extra: Automatically reloading page in '+timeDifference+' seconds...</center>';
				if(timeDifference==0){
					statusDiv.innerHTML='<center>KoCAttack Extra: Automatically reloading page now...</center>';
					t.ReloadWindow();
					t.domainLoginActionTaken=true;
				}
			}
			statusDiv.style.display='block';
			
			if(!t.domainLoginTimer && !t.domainLoginActionTaken) {
				t.domainLoginTimer=window.setTimeout(function() {
					t.domainLoginTimer=null;
					t.HandleDomainLogin();
				},1000);
			}		
		}
	},
	
	HandleCrossIframeCommands:function() {
		var t=this;
		var commands = t.GetCrossIframeCommands();
		if(!commands.queue) return false;
		var commandsUpdated = false;
		for(var i=0; i<commands.queue.length; i++) {
			var command = commands.queue[i];
			// Cross-iframe Command structure:
			// commands {
			//		command {
			//			'pageName' (string) - The page to execute the code on
			//			'functionCall' (string) - The function to call
			//		}
			// }
			if(t.currentPage == command.pageName){
				if(command.functionCall.action == "load_url"){
					setTimeout (function (){window.location.href=command.functionCall.parameters;}, 0); 
				}
				ArrayRemoveItem(commands.queue, i);
				commandsUpdated=true;
			}
		}
		if(commandsUpdated){
			this.SetCrossIframeCommands(commands);
		}
	},
		
	OnCastleBoxAppear:function(box) {
		var raiseGold=nHtml.FindByXPath(box,".//a[contains(@onclick,'raiseGold')]");
		var a=document.createElement('a');
		a.className='button25';
		var t=this;
		
		function SetAutoGoldA() {
			var str=t.GetAutoGold()?'Auto - On':'Auto - Off';
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
			var str=t.GetAbandonWilds()?'Abandon Wilds - On':'Abandon Wilds - Off';
			b.innerHTML='<span>'+str+'</span>';
		}
		b.addEventListener('click',function() {
			var abandonWilds=t.GetAbandonWilds();
			if(!abandonWilds){
				var abandonWildsConfirm = confirm("Are you sure you want to automatically abandon all wildernesses?\n")
				if (!abandonWildsConfirm){
					return false;
				}
			}
			t.SetAbandonWilds(abandonWilds?false:true);
			SetAbandonWildsA();
		},false);
		SetAbandonWildsA();
		//raiseGold.parentNode.insertBefore(b,raiseGold.nextSibling);
		productionHeader.parentNode.insertBefore(b,productionHeader);
	},

	ClickShareToWall:function(box) {
		var t=this;
		if(t.options.autoPublishGamePopups){
			var sharetowall_btn = nHtml.FindByXPath(box,".//a[contains(@onclick,'gethelp')]");
			nHtml.Click(sharetowall_btn);
		}
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
			this.Log('no march button');
			window.setTimeout(function() {
				t.OnAttackBoxAppear(box);
			},1000);
			return; 
		}

		this.StopWaitForAttackBoxAppear();
		if(ById('KocAttackComment')) {
			this.Log("We already have an attack dialog opened");
			return;
		}
		
		btnMarch.addEventListener('click',function(e) {
			window.setTimeout(function() {
				t.SetAttackFromGui(box);
				t.SetValuesCache();
				// we want to keep the scroll bar at the same position, don't redraw
				//~~~ mmm... need to wait for attack to finish before the numbers will update.
				t.DrawClosestFarms();
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
				AddHtml(div,'Last attack: '+SecsToStr(nowSecs-attack.time)+' ago<br />');
			}
			if(attack.comment){
				comment.value=attack.comment;
			}
			
			var attackTypeSelect=ById('modal_attack_atktype');
			// only fill things in if we're in attack mode.
			if(attackTypeSelect.selectedIndex==0 && attack.type==0) {
				if(this.prevAttack) { this.Log('Previous attack:'+this.prevAttack.x+'=='+xy[0] +','+this.prevAttack.y+'=='+xy[1] ); }
				var firstAttack = this.IsFirstAttackAtLocation(xy[0], xy[1]);
				this.Log("current attack wave type: "+attack.currenttattackwavetype);
				if(attack.suicidewave && attack.currenttattackwavetype=="suicide" && firstAttack) {
					// anti traps suicide wave attack
					if(typeof(attack.suicidewave)=="object") {
						for(var i=1; i<attack.suicidewave.length; i++) {
							this.SetTroopInput(i,attack.suicidewave[i]);
							totalTroops+=attack.suicidewave[i];
						}
					} else {
						this.SetTroopInput(2,attack.suicidewave);
						totalTroops+=attack.suicidewave;
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
			deleteBtn.innerHTML='<span>Delete Attack</span>';
			deleteBtn.addEventListener('click',function() {
				t.DeleteAttack(xy[0],xy[1]);
				t.DoUnsafeWindow('Modal.hideModalAll();');
				t.DrawClosestFarms();
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
				t.Log('We wont change an attack if the type is different. You must delete the attack to change the type');
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
				this.Log('Auto attack:'+xy[0]+','+xy[1]+', from city:'+this.autoAttackCityUpto);
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
					this.Log('Cannot continue auto attacking, about to attack or change city');
				}
				return;
			} else {
				this.Log('auto attack, not enough troops/knights: '+xy[0]+','+xy[1]+
					", knights avail:"+(knightSelect.options.length-1)+", Not enough troops/resources:"+notFullTroops+'/'+notFullResources+', needed:'+totalTroops+'/'+totalResources);
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
			if(!m) {
				this.Log("Unable to find location level/type information in cached reports!");
				continue;
			}
			var typeNum=m[3].replace('"','');
			var type=this.squareTypeNums[typeNum];
			if(!type) {
				this.Log("Unable to find location type information in cached reports!");
				continue;
			}
			if(typeNum=="51" && m[5]!='0') {
				type='';
			}
			//this.Log("Target Type: "+type+", Target Level: "+m[4]);
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

	currentMarchesNum:0,
	DetermineCurrentMarchesNum:function() {
		var marchesnum = 0;
		var troopactivity = ById("untqueue_list");
		if(troopactivity && troopactivity.style.display!="none" && troopactivity.style.visibility!="hidden"){
			marchesnum = troopactivity.childNodes.length;
		}
		//this.Log("Current number of marches in this city: "+marchesnum);
		this.currentMarchesNum = marchesnum;
		return marchesnum;
	},

	currentRallyPointLevel:0,
	DetermineCurrentRallyPointLevel:function() {
		var rallypointlevel = 0;
		var citymap = ById("citymap");
		if(citymap){
			var citylinks = nHtml.FindByXPath(citymap,'.//a[contains(@class, "bldg")]', XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
			for (var i = 0; i < citylinks.snapshotLength; i++){
				var building = citylinks.snapshotItem(i);
				var style = window.getComputedStyle(building, false);
				var css_bgimg = style.backgroundImage;
				//this.Log("building background image "+i+": "+css_bgimg);
				var myregexp = /rally_point_lvl/i;
				var match = myregexp.exec(css_bgimg);
				if (match != null) {
					// Determine the rally point level based on the level tag overlay
					var leveltag = nHtml.FindByXPath(building,'.//span[contains(@class, "level")]');
					if(!leveltag){ continue; }
					var levelnum = parseInt(leveltag.innerHTML);
					if(levelnum>rallypointlevel){
						rallypointlevel = levelnum;
					}
				}
			}
			if(rallypointlevel==0){
				// Couldn't find the rally point based on the background image. Odds are that the rally point exists,
				// but is currently under construction. Let's see if we can deduce the rally point's level based on this assumption.
				// Note: This will bug out if the city has literally no rally point at all, but who's really that stupid?
				for (var i = 0; i < citylinks.snapshotLength; i++){
					var building = citylinks.snapshotItem(i);
					var style = window.getComputedStyle(building, false);
					var css_bgimg = style.backgroundImage;
					//this.Log("building background image "+i+": "+css_bgimg);
					var myregexp = /construction/i;
					var match = myregexp.exec(css_bgimg);
					if (match != null) {
						// Determine the rally point level based on the level tag overlay
						var leveltag = nHtml.FindByXPath(building,'.//span[contains(@class, "level")]');
						if(!leveltag){ continue; }
						var levelnum = parseInt(leveltag.innerHTML);
						if(levelnum>rallypointlevel){
							rallypointlevel = levelnum-1;
						}
					}
				}
			}
			//this.Log("Rally point level in this city is: "+rallypointlevel);
		}
		this.currentRallyPointLevel = rallypointlevel;
		return rallypointlevel;
	},

	GetLevelInfo:function(attack) {
		if(!attack) throw('GetLevelInfo: attack is null');
		var levelI=attack.levelInfo;
		//if((!levelI || levelI.level==0) && attack.messages && attack.messages.length>0) {
		if((!levelI || levelI.level==0) && attack.messages && attack.messages.length>0) {
			levelI=this.FindLevelFromMessages(attack);
		}
		return levelI;
	},

	GetAttackDelay:function(attack) {
		if(!attack) throw('GetAttackDelay: attack is null');
		var attackDelay = 0;
		var wilderness={
			'Lake':1,
			'Mountains':1,
			'Woods':1,
			'Forest':1,
			'Plain':1,
			'Hills':1,
			'Grassland':1,
			'Wilderness':1 // Unknown wilderness type
		};
		var levelInfo=this.GetLevelInfo(attack);
		if(!levelInfo) {
			this.Log("Unable to calculate attack delay: Missing level info for coordinates ("+attack.x+","+attack.y+"). Assuming delay of 0.");
		}else{
			if(levelInfo.type=='Camp') {
				// Camp
				attackDelay = this.options.attackSecsSinceLastCamp;
			} else if(wilderness[levelInfo.type]) {
				// Wilderness
				attackDelay = this.options.attackSecsSinceLastWild;
			} else if (levelInfo.type!='Camp' && !wilderness[levelInfo.type]) {
				var tempAttack=this.GetAttack(attack.x,attack.y);
				if(tempAttack.type==0) {
					// City
					attackDelay = this.options.attackSecsSinceLastCity;
				} else if(tempAttack.type==1) {
					// Transport
					attackDelay = this.options.attackSecsSinceLastTransport;
				}else{
					this.Log("Unknown attack type for ("+attack.x+","+attack.y+"). Assuming delay of 0.");
				}
			}else{
				this.Log("Unknown attack type for ("+attack.x+","+attack.y+"). Assuming delay of 0.");
			}
		}
		return attackDelay;
	},

	FindBiggestCampAttack:function(attacks,currentTroops,currentResources) {
		var bestAttack=null;
		var bestAttackSize=0;
		var bestAttackDist=10000;
		var nowSecs=new Date().getTime()/1000;
		var currentCity = this.GetCurrentCityId();
		// Determine the current rally point level and current marches
		this.DetermineCurrentRallyPointLevel();
		this.DetermineCurrentMarchesNum();
		this.Log("Current Rally Point Level: "+this.currentRallyPointLevel+" Current Marches: "+this.currentMarchesNum);

		var wilderness={
			'Lake':1,
			'Mountains':1,
			'Woods':1,
			'Forest':1,
			'Plain':1,
			'Hills':1,
			'Grassland':1,
			'Wilderness':1 // Unknown wilderness type
		};
		for(var a=0; a<attacks.length; a++) {
			var attack=attacks[a];
			//this.Log("Inspecting attack #"+a+": "+inspect(attack,10));
			var levelInfo=this.GetLevelInfo(attack.a);
			if(!levelInfo) {
				this.Log("Not attacking: Missing level info! for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			
			if(levelInfo.type=='Camp') {
				if(this.options.attackTypeCamp!=true) {
					this.Log("Not attacking: Not attacking camps! for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			} else if(wilderness[levelInfo.type]) {
				if(this.options.attackTypeWild!=true) {
					this.Log("Not attacking: Not attacking wildernesses! for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			} else if (levelInfo.type!='Camp' && !wilderness[levelInfo.type]) {
				var tempAttack=this.GetAttack(attack.x,attack.y);
				if(tempAttack.type==0) {
					if(this.options.attackTypeCity!=true) {
						this.Log("Not attacking: Not attacking cities for coordinates ("+attack.x+","+attack.y+")");
						continue;
					}
				} else if(tempAttack.type==1) {
					if(this.options.attackTypeTransport!=true) {
						this.Log("Not attacking: Not sending transports for coordinates ("+attack.x+","+attack.y+")");
						continue;
					}
				}
			} else {
				if(levelInfo.type!='' && levelInfo.type!='Camp') {
					this.Log("Not attacking: Unknown attack type for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			}

			if(!attack.a.troops) {
				this.Log("inspect1: "+inspect(attack.a),10);
				this.Log("Not attacking: No troops defined for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			if(attack.a.ignore) {
				this.Log("Not attacking: Location ignored for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			if(attack.dist>=this.options.attackMaxDistance) {
				this.Log("Not attacking: Distance too far for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			if(this.options.lockAttackFromCity) {
				//this.Log('fromCity='+attack.a.fromCity+', currentCity='+this.GetCurrentCityId());
				if(attack.a.fromCity!=undefined) {
					if(currentCity!=attack.a.fromCity) { continue; }
				}
			}
			
			var troops_to_send = attack.a.troops;
			if(attack.a.suicidewave){
				// count up all the troops in *both* attack waves.
				// we don't want to launch suicide wave if we can't follow it up.
				var suicide_troops = attack.a.suicidewave;
				for(var t=0; t<suicide_troops.length; t++) {
					if(!suicide_troops[t]) continue;
					troops_to_send[t] = troops_to_send[t] + suicide_troops[t];
				}
			}

			//if(!this.currentMarchesNum || this.currentMarchesNum==undefined) {
			//	this.Log("Not attacking: Unable to determine current number of marches (refresh your window?) for coordinates ("+attack.x+","+attack.y+")");
			//	continue;
			//}
			
			// Make sure we have more than two available slots in attack queue if this is a suicide wave (unless there are only two slots even allowed)
			var available_marches_num = this.currentRallyPointLevel - this.currentMarchesNum;
			//this.Log("Available marches: "+available_marches_num);
			if(attack.a.suicidewave && attack.a.currenttattackwavetype != "normal"){
				//this.Log("Current attack wave type: "+attack.a.currenttattackwavetype);
				if(available_marches_num < 2 || this.currentRallyPointLevel < 2){
					// Make sure this is the first wave of the multi-wave attack and then don't send it if there aren't enough marching slots for both waves
					if(this.prevAttack.x != attack.x && this.prevAttack.y != attack.y) {
						// This is the first wave
						this.Log("Not attacking: Not enough available marching slots at rally point to launch both suicide wave and second wave for coordinates ("+attack.x+","+attack.y+")");
						break;
					}
				}
			}
			
			// Make sure we have at least one available slot in attack queue for normal attack
			if(available_marches_num<1){
				this.Log("Not attacking: Not enough marching slots at rally point to launch attack for coordinates ("+attack.x+","+attack.y+")");
				break;
			}
			
			if(!this.IsEnoughTroops(currentTroops,troops_to_send)) {
				this.Log("Not attacking: Not enough troops for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			if (attack.a.type==1) {
				if(!this.IsEnoughResources(currentResources,attack.a.resources)) {
					this.Log("Not attacking: Not enough resources for coordinates ("+attack.x+","+attack.y+")");
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
					if(lastAttack<this.options.attackSecsSinceLastCity) {
						this.Log("Not attacking: last attack ("+lastAttack+") < this.options.attackSecsSinceLastCity ("+this.options.attackSecsSinceLastCity+") for coordinates ("+attack.x+","+attack.y+")");
						continue;
					}
				} else {
					if(lastAttack<this.options.attackSecsSinceLastTransport){
						this.Log("Not attacking: last attack ("+lastAttack+") < this.options.attackSecsSinceLastTransport ("+this.options.attackSecsSinceLastTransport+") for coordinates ("+attack.x+","+attack.y+")");
						continue;
					}
				}
			} else if(levelInfo.type.toUpperCase()=='C') {
				if(lastAttack<this.options.attackSecsSinceLastCamp) {
					this.Log("Not attacking: last attack ("+lastAttack+") < this.options.attackSecsSinceLastCamp ("+this.options.attackSecsSinceLastCamp+") for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			} else  {
				if(lastAttack<this.options.attackSecsSinceLastWild) {
					this.Log("Not attacking: last attack ("+lastAttack+") < this.options.attackSecsSinceLastWild ("+this.options.attackSecsSinceLastWild+") for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			}
			var armySize=0;
			for(var t=0; t<attack.a.troops.length; t++) {
				if(!attack.a.troops[t]) {
					continue;
				}
				armySize+=parseInt(attack.a.troops[t]);
			}
			if(attack.a.suicidewave) {
				var suicideArmySize=0;
				for(var t=0; t<attack.a.suicidewave.length; t++) {
					if(!attack.a.suicidewave[t]) {
						continue;
					}
					suicideArmySize+=parseInt(attack.a.suicidewave[t]);
				}
				if(suicideArmySize<=0) {
					this.Log('Invalid suicide wave army size (not enough!) for coordinates ('+attack.x+','+attack.y+')');
					continue;
				}
			}
			if(armySize<=0) {
				this.Log('Invalid suicide wave army size (not enough!)for coordinates ('+attack.x+','+attack.y+')');
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
		var DeleteFarm=function(e) {
			var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
			t.DeleteAttack(xy[0],xy[1]);
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
				//if(lastAttack<(60*60*minHrsSinceAttack)) continue;

				var levelI=this.GetLevelInfo(attackI.a);
				var m=( (levelI!=null && levelI.type) ?(levelI.type.charAt(0)+levelI.level):'');
				//this.Log("Location Type: "+m);
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
							if(attackI.a.suicidewave) {
								var am=attackI.a.suicidewave[tupto];
								if(am) num+=" ("+am+")";
							}
							AddText(tr.insertCell(-1),num);
						}
					}
				}
				
				var aDelete=document.createElement('a');
				aDelete.innerHTML='X';
				aDelete.title='Delete';
				aDelete.addEventListener('click',function(e) { DeleteFarm(e); },false);
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
		resources[0]=parseInt(ById('stat_gold_bar_num').innerHTML.replace(/,/g,'')); // Gold  
		resources[1]=parseInt(ById('stat_rec1_bar_num').innerHTML.replace(/,/g,'')); // Food  
		resources[2]=parseInt(ById('stat_rec2_bar_num').innerHTML.replace(/,/g,'')); // Wood  
		resources[3]=parseInt(ById('stat_rec3_bar_num').innerHTML.replace(/,/g,'')); // Stone  
		resources[4]=parseInt(ById('stat_rec4_bar_num').innerHTML.replace(/,/g,'')); // Ore  
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
			if(t.IsMapperRunning() || t.IsCurrentlySendingMultipleWaves()) {
				if(t.IsMapperRunning()){
					t.Log("Waiting for mapping to finish");
				}else{
					t.Log("Waiting for multiple wave attack to finish");
				}
				// don't reload until the mapper or multi-wave attack has finished.
				window.setTimeout(function() {
					t.StartReloadPageTimer();
				},0);
				return;
			}
			t.SetValuesCache();
			//window.location.reload(true);
			t.ReloadWindow();
		},refreshMSecs);
		this.Log('reload page timer started');
	},
	
	multipleWaveTimeout:null,
	ClearMultipleWaveTimeout:function() {
		if(this.multipleWaveTimeout!=null) {
			this.Log('city switching timer killed');
			window.clearTimeout(this.multipleWaveTimeout);
			this.multipleWaveTimeout=null;
		}
	},
	StartMultipleWaveTimer:function(secs) {
		var t=this;
		if(!secs) secs=t.options.attackDelay;
		var attackDelayMSecs=t.GetRandTime(1000*secs);
		this.Log('Waiting '+(attackDelayMSecs/1000)+' secs to retry second wave attack...');
		this.ClearMultipleWaveTimeout();
		this.multipleWaveTimeout=window.setTimeout(function() {
			if(t.multipleWaveTimeout==null) return;
			t.multipleWaveTimeout=null;
			if(t.IsCurrentlySendingMultipleWaves()) {
				t.Log("Waiting for multiple wave attack to finish...");
				// don't switch cities until the multi-wave attack has finished.
				window.setTimeout(function() {
					t.StartMultipleWaveTimer();
				},0);
				return;
			}
			t.NextAutoAttackCity();
		},attackDelayMSecs);
		this.Log('Multiple wave attack timer started');
	},

	lastOpenViewReports:0,
	CheckReports:function() {
		var t=this;
		var autoAttack=this.GetAutoAttack();
		if(!autoAttack) return;
		
		// Load the reports every minute or on initial page load
		if(!this.options.noViewReports) {
			var nowSecs=new Date().getTime()/1000;
			if((this.lastOpenViewReports+(60*1))<nowSecs) {
				this.lastOpenViewReports=nowSecs;
				this.OpenViewReports();
				this.bringUpReports=true;
				if(this.options.autoRemoveReports) {
					this.autoAttackRemoveReports=true;
				}
			}
		}
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


	NextAutoAttackCity:function() {
		var t=this;
		var autoAttack=this.GetAutoAttack();
		if(!autoAttack) return;
	
		if(this.IsCurrentlySendingMultipleWaves()){
			this.Log('Cannot change city. Waiting for multiple wave attack to finish...');
			t.ClearMultipleWaveTimeout();
			t.StartMultipleWaveTimer();
			return;
		}else{
			t.ClearMultipleWaveTimeout();
		}
	
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
				this.Log('changing city to:'+this.autoAttackCityUpto+', in '+(secs/1000)+'secs, loop:'+this.autoAttackCitiesDone);
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
			t.Log("Attack box has not appeared, let's reload the page");
			t.ReloadWindow();
			//window.setTimeout(function() {
			//	t.OpenAttackDialog(bestAttack);
			//},0);
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
			// Toggle attack waves between suicide and normal mode
			this.ToggleCurrenttAttackWaveType(bestAttack.x,bestAttack.y);
			// Update the last attack sent time
			this.UpdateAttackLastSentTime();
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
		//this.Log("Current attacks in system: "+inspect(attacks,10));
		var bestAttack=this.FindBiggestCampAttack(attacks,currentTroops,currentResources);
		if(bestAttack && this.autoAttacksThisCity<10) {
			// attack closest biggest barbarian/wilderness
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
				},1000);
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
				
				var saveReportAsAttack = true;
				if(!attack) {
					// Don't record reports as attacks if the attack doesn't already exist in the system
					var saveReportAsAttack = false;
				}
				
				if(!attack) { attack={}; }
				
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
					//this.Log("attack messages: "+attack.messages);
					var li=this.GetLevelInfo(attack);
					if(li) attack.levelInfo=li;
					changed=true;
				}
				if(!attack.levelInfo) {
					// to fix up old scripts where this didn't work.
					attack.levelInfo=this.GetLevelInfo(attack);
					if(attack.levelInfo) changed=true;
				}
				if(changed && saveReportAsAttack) {
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
			a.innerHTML='<span>'+(trainTroops[t.GetCurrentCityId()]==type?'Auto Train - On':'Auto Train - Off')+'</span>';
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

	
	// returns {count, maxlevel}
	getCityBuilding: function(cityId, buildingId){
	  var b = unsafeWindow.seed.buildings['city'+cityId];
	  var ret = {count:0, maxLevel:0};
	  for (var i=1; i<33; i++){
		if (b['pos'+i] && b['pos'+i][0] == buildingId){
		  ++ret.count;
		  if (parseInt(b['pos'+i][1]) > ret.maxLevel)
			ret.maxLevel = parseInt(b['pos'+i][1]);
		}
	  }
	  return ret;
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
		
		// Determine number of available training slots
		var availableTrainingSlots = 0;
		try{
			var barracksTotal = this.getCityBuilding(cityid, 13).count;
			var trainingSlotsUsed = unsafeWindow.seed.queue_unt['city'+cityid].length;
			if(trainingSlotsUsed!=null){
				var availableTrainingSlots = barracksTotal-trainingSlotsUsed;
			}
		}finally{
			if(availableTrainingSlots<1){ return false; }
		}

		
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
				numInp.value=Math.floor(parseInt(maxObj.textContent)*0.9);
				var t=this;
				window.setTimeout(function() {
					if(numInp.value>maxObj.textContent) {
						t.Log('Not training troops:'+numInp.value+'>'+maxObj.textContent);
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

	DetermineCurrentPage:function() {
		if(unsafeWindow.location.href.match(/kingdomsofcamelot\.com\/fb\/.*?\/src\/main_src\.php/i)){
			this.currentPage = "koc_game";
		}else if (unsafeWindow.location.href.match(/apps\.facebook\.com\/kingdomsofcamelot\/.*?page=nogame/i)) {
			this.currentPage = "domain_selection_app_page";
		}else if (unsafeWindow.location.href.match(/apps\.facebook\.com\/kingdomsofcamelot/i)) {
			this.currentPage = "app_page";
		}else if (unsafeWindow.location.href.match(/facebook.com\/connect\/uiserver.php/i)) {
			this.currentPage = "facebook_popup";
		}else if(unsafeWindow.location.href.match(/kingdomsofcamelot\.com\/fb\/.*?\/src\/newgame_src\.php/i)){
			this.currentPage = "domain_selection";
		}else{
			this.currentPage = "unknown";
		}
		return this.currentPage;
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
	DeleteAllStoredAttacks:function() {
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
			if(attackX && attackY){
				t.DeleteAttack(attackX, attackY);
			}
			return true;
		});
		window.alert("All stored attacks for this domain have been deleted.\nClick the ok button to reload.");
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
	inviteFriendsTabHidden:false,
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
		
		// Determine which page we're on
		t.DetermineCurrentPage();
		
		// Code strictly for page: koc_game
		if(t.currentPage == "koc_game"){
		
			window.setTimeout(function() {
				if(!t.pageLoaded && t.GetAutoAttack() && !t.IsMapperRunning()) {
					GM_log("whoops, game not loaded after 60 secs problem. reloading.");
					t.SetValuesCache();
					//window.location.reload(true);
					t.ReloadWindow();
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
			
			// Hide the invite friends tab on page load
			if(!t.inviteFriendsTabHidden && t.options.disableInviteFriends){
				var tabBar=ById("main_engagement_tabs");
				if(tabBar){
					var inviteFriendsTab=nHtml.FindByXPath(tabBar,".//a[contains(@onclick,'invite_friends_popup')]");
					if(inviteFriendsTab){
						inviteFriendsTab.style.display="none";
						t.inviteFriendsTabHidden = true;
					}
				}
			}
		
		} // End of code strictly for page: koc_game

		var domTickTimer=null;
		var domTickUpto=0;
		var domTick=function(e) {
			
			var funcsById={};
			
			// Handle cross-iframe commands (which are currently only being used for the domain selection page)
			if (t.currentPage == "domain_selection" || t.currentPage == "domain_selection_app_page"){
				if((domTickUpto%20)==0) {
					t.HandleCrossIframeCommands();
				}
			}

			// Code strictly for page: koc_game
			if(t.currentPage == "koc_game"){
			
				//if(e.target.className && !/(chat|city|slot)/.exec(e.target.className)) GM_log('xxx:'+e.target.className);
				//if(e.target.id && e.target.id!='tooltip' && e.target.id('_l_')<0 && e.target.id.substring(0,2)!='l_' && e.target.id.substring(0,8)!='citysel_') GM_log('id:'+e.target.id);
				var cityId=t.GetCurrentCityId();
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
					},0);
					setTimeout(function() {
						t.DetermineCurrentRallyPointLevel();
						t.DetermineCurrentMarchesNum();
						t.CheckAutoRaiseGold();
						t.CheckAbandonWilds();
						t.CheckTrainTroops();
					},1000);
					setTimeout(function() {
						t.CheckReports();
					},3000);
					setTimeout(function() {
						t.NextAutoAttack();
					},5000);
				}
				
				funcsById={
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
					'modal_speedup':function(target) {
						t.ClickShareToWall(target);
					},
					'invitePopup':function(target) {
						if(t.options.disableInviteFriends){
							// Hide the invite popup if auto attack is enabled
							target.parentNode.removeChild(target);
						}
					},
				};
				
			} // End of code strictly for page: koc_game
			
			// Handle cross-domain facebook game publish requests
			funcsById.RES_ID_fb_pop_dialog_table = function(target){
				if (t.currentPage == "koc_game") {
					// Update the current server id locally for cross-domain access
					if(t.currentServerId>0 && t.currentPage == "koc_game"){
						GM_setValue("KOCAttackLastKnownServerID", t.currentServerId);
					}
				}
			}
			if(t.currentPage == "facebook_popup"){
				if((domTickUpto%20)==0) {
					t.HandlePublishPopup();
				}
			}
			
			// Log back into domain if disconnected due to server down-time
			if(t.currentPage == "domain_selection" && t.options.autoLogBackIn){
				if((domTickUpto%20)==0) {
					t.HandleDomainLogin();
				}
			}
			
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
		if(document.body){
			document.body.addEventListener('DOMNodeInserted',function(e) {
				if(withinDomInserted) return;
				var isStatuses=(e.target.className && e.target.className=='statues')?true:false;
				if(isStatuses){
					t.pageLoaded=true;
				}
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
		}

		domTick();
	},

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
//		['Modal.showAlert(printLocalError(','if(rslt.error_code==3 || rslt.error_code==8) { try {retryMarch(); } catch(e) { alert("retry failed:"+e); }  } else { Modal.hideModalAll(); }  Modal.showAlert(printLocalError('],
		['Modal.showAlert(printLocalError(','if(rslt.error_code==3 || rslt.error_code==8) { try {window.setTimeout(function() { retryMarch(); },(3*1000)); } catch(e) { /*alert("retry failed:"+e);*/ }  } else { Modal.hideModalAll(); }  Modal.showAlert(printLocalError(']
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
				//alert("modalAttackReplace: cannot find: "+repI[0]+','+modalAttackFunc);
			}
			
			modalAttackFunc=modalAttackFunc.replace(repI[0],repI[1]);
		}

		try {
			window[nameOld]=eval(modalAttackFunc);
//alert(window[nameOld].toString());			
		} catch(e) {
			//alert(e+', bad func:'+modalAttackFunc);
		}

		window[name]=function() {
			// let our stuff in addListener run first.
			window.setTimeout(function() {
				eval(nameOld+'();');
			},100);
		}
	};
	
	replaceFunc('modal_attack_do',modalAttackReplaces);
	//replaceFunc('attack_generatequeue',attack_generatequeueReplaces);

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
		if(document.body){
			document.body.appendChild(m);
		}
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