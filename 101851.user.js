// ==UserScript==
// @name             KOCAttack - Extra Features!
// @version          0.9.5.8
// @namespace        KOCAttack-Extra
// @homepage         http://userscripts.org/scripts/show/89473
// @description      Same as the original Kingdoms of Camelot Attack script, but with extra features.

// @include          *apps.facebook.com/kingdomsofcamelot*
// @include          *kingdomsofcamelot.com/*main_src.php*
// @include          *kingdomsofcamelot.com/*newgame_src.php*
// @include          *facebook.com/connect/uiserver.php*
// @include          *kingdomsofcamelot.com/*standAlone.php*

// @require          http://tomchapin.me/auto-updater.php?id=89473
// ==/UserScript==


var KOCAversion = '0.9.5.8';

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


// Quick is_int function for javascript
function is_int(value){
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
      return true;
  } else {
      return false;
  }
}

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

function getAttackTypeSelected (){
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
		
		var m = '<a id="ImportBoxCancel" class="button20"><span>Close</span></a>';
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
		
		//<a id="KOCAttackViewAttacksImportExport" class="button20"><span>Import / Export</span></a>\	
		
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
		
		//ById('KOCAttackViewAttacksImportExport').addEventListener('click',function() {
		//	t.ShowImportExportBox();
		//},false);
				
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
		  h += '<td>Type</td><td>Attack Troops</td><td>Suicide Troops/Resources</td><td>Dist</td><td>Time</td><td>Ignore</td></tr>';
		  var tableRows= '';
		  var count = 1
		  for(var a=0; a<t.attacks.length; a++) {
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
      
 	  var distance=t.CalcXYDist({'x':t.attacks[a].xy[0],'y':t.attacks[a].xy[0]},{'x':t.GetCityCoordsX(t.attacks[a]['fromCity']),'y':t.GetCityCoordsX(t.attacks[a]['fromCity'])});
	  tableRows += '<td>'+parseInt(distance)+'</td>';
	  
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
		    var deletes = 0;
			for (var i=1; i<count; i++){
			  var row = 'aasel'+i;
			  if (ById(row) == undefined) continue;
			  if (ById(row).checked == true){
			    //ById(row).checked == false;
			    var c = ById('aacoords'+i).innerHTML;
			    var xy = c.split(",");
			    GM_log('Coords '+xy[0]+' '+xy[1]);
			    t.DeleteAttack(xy[0],xy[1]);
				deletes++;
			  }
			}
			window.alert(deletes+' of coords deleted');
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
			  var row = 'aasel'+i;
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
	  var c = ById('aacoords'+e.target.id).innerHTML;
	  var xy = c.split(",");
	  var serverID = KOCAttack.GetServerId();
	  	  
	  var attackname = 'attack_'+serverID+'_'+xy[0]+','+xy[1];
	  var str = GM_getValue(attackname,'') 

	  if(!str) return null;
	  attack= JSON2.parse(str);
	  attack.ignore=e.target.checked?true:undefined;
	  //WinLog.write (inspect(attack,10));
	  GM_setValue(attackname,JSON2.stringify(attack));
	},	
	
	GetAttack:function(x,y) {
		var str=this.browser_getValue(this.GetAttackName(x,y),'');
		if(!str) return null;
		return JSON2.parse(str);
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

	GetCityCoordsX:function(cityid) {  
	  var cityName;
	  for(var a=0; a<unsafeWindow.seed.cities.length; a++) {
	    if(unsafeWindow.seed.cities[a][0] == cityid){
		  var x = unsafeWindow.seed.cities[a][2];
		}
	  }
	  return x;
	},	

	GetCityCoordsY:function(cityid) {  
	  var cityName;
	  for(var a=0; a<unsafeWindow.seed.cities.length; a++) {
	    if(unsafeWindow.seed.cities[a][0] == cityid){
		  var y = unsafeWindow.seed.cities[a][3];
		}
	  }
	  return y;
	},	
				
	ReloadWindow:function() {
		var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
		if (!m){
			//window.location.reload(true);
			history.go(0);
			return;
		}
		var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+m[1];
		var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=s value="'+ m[1] +'"</form>';
		var e = document.createElement ('div');
		e.innerHTML = t;
		document.body.appendChild (e);
		setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
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
			div.style.maxWidth='700px';
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
			" Transporting:<input id='KOCAttackMinsSinceLastTransport' value='"+(this.options.attackSecsSinceLastTransport/(60))+"' size='3' />mins<br />"+
			" If transporting, try to keep at least <input id='KOCAttackTransportReserveAmount' value='"+this.options.transportResourcesReserveAmount+"' size='10' /> of each resource in each city <font color=#FF0000>(NEW)</font>"+
			"</div>"+
			"<input id='KOCAttackRandom' value='"+this.options.randomPercent+"' size='3' />% random adjustment for all delays (to look more human).<br />"+
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
			"<input id='KOCAttackDisableInviteFriends' type='checkbox' "+(this.options.disableInviteFriends?'checked':'')+" /> Disable the annoying \"Invite Friends\" popup dialog in-game.<br />"+
			"<input id='KOCAttackAutoHelpAlliance' type='checkbox' "+(this.options.autoHelpAlliance?'checked':'')+" /> Automatically help alliance members with building/researching.<br />"+
			"<input id='KOCAttackHideAllianceHelpRequests' type='checkbox' "+(this.options.hideAllianceHelpRequests?'checked':'')+" /> Hide alliance help requests/reports in chat (if above is checked, then after helping).<br />"+
			"<input id='KOCAttackAutoPublishGamePopups' type='checkbox' "+(this.options.autoPublishGamePopups?'checked':'')+" /> Automatically publish game popups (such as help requests) to facebook wall.<br />"+
			"If above is checked, what privacy setting should we use? <select id='KOCAttackAutoPublishPrivacy'><option value='80'>Everyone</option><option value='50'>Friends of Friends</option><option value='40'>Friends Only</option><option value='10'>Only Me</option></select><br />"+
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
			//"<a id='KOCAttackListAttacks' class='button20'><span>List attacks</span></a><a id='KOCAttackListTransports' class='button20'><span>List transports</span></a>"+
			"</td><TD align=right>"+ KOCAversion +"</td></tr></form>";
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
		ById('KOCAttackDeleteTransports').addEventListener('click',function() {
 			t.DeleteTransports();
 			//window.location.reload(true);
 			t.ReloadWindow();
 		},false);
		
 		//ById('KOCAttackListTransports').addEventListener('click',function() {
 			//t.ListTransports();
 			//window.location.reload(true);
 		//},false);
 		//ById('KOCAttackListAttacks').addEventListener('click',function() {
 			//t.ListAttacks();
 			//window.location.reload(true);
 		//},false);
		
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
			t.options.percentToTrainOfMax=parseFloat(ById('KOCAttackPercentToTrainOfMax').value);
			
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
			t.options.enableLogging=ById('KOCAttackEnableLogging').checked;

			t.options.attackSecsSinceLastCamp=parseFloat(ById('KOCAttackHoursSinceLastCamp').value)*60*60;
			t.options.attackSecsSinceLastWild=parseFloat(ById('KOCAttackHoursSinceLastWild').value)*60*60;
			t.options.attackSecsSinceLastCity=parseFloat(ById('KOCAttackHoursSinceLastCity').value)*60*60;
			t.options.attackSecsSinceLastTransport=parseFloat(ById('KOCAttackMinsSinceLastTransport').value)*60;
			
			t.options.transportResourcesReserveAmount=parseInt(ById('KOCAttackTransportReserveAmount').value);
			
			t.options.randomPercent=parseFloat(ById('KOCAttackRandom').value);
			t.options.attackMaxDistance=parseFloat(ById('KOCAttackMaxDistance').value);
			t.options.autoAttackCitiesDoneMax=parseInt(ById('KOCAttackCitiesDoneMax').value);

			t.options.attackOrder=ById('KOCAttackOrder').value;
			
			t.options.lockAttackFromCity=ById('KOCAttackLockAttackFromCity').checked;
			t.options.knightreset=ById('KOCAttackUnselectKnight').checked;
			t.options.autoRemoveReports=ById('KOCAttackRemoveReports').checked;
			t.options.autoRemoveFarmReports=ById('KOCAttackRemoveFarmReports').checked;
			t.options.retryMarch=ById('KOCAttackRetryMarch').checked;
			t.options.impendingAttackUrl=ById('KOCAttackImpendingAttackUrl').value;
			t.options.impendingStopAttack=ById('KOCAttackImpendingStopAttack').checked;
			
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
	

	/*
	AddImportExportLink:function() {
		var t=this;
		var a=ById('KOCImportExportLink');
		if(a) return;

		a=this.AddTabLink('Imp Exp');
		if(!a) {
			window.setTimeout(function() {
				t.AddImportExportLink();
			},t.GetRandTime(250));
			return;
		}
		a.id='KOCImportExportLink';
		a.addEventListener('click',function() {
			t.ShowImportExportBox();
		},false);
	},
	*/

	
	AddTabLink:function(html) {
		// Resize main tab bar container
		var tab_container = ById("main_engagement_tabs");
		tab_container.style.width = "715px";
		// Create new tab
		var a=document.createElement('a');
		a.className='navTab';
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
		//if(autoAttack && autoAttack.cities && autoAttack.cities[t.GetCurrentCityId()]) {
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
		if(!this.options || !this.options.enableLogging){
			// disable logging
			return;
		}
		str=this.GetServerId()+":"+str;
		GM_log(str);
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
			"transportResourcesReserveAmount":1000000,
			"randomPercent":10,
			"keepReports":10,
			"attackMaxDistance":60,
			"lockAttackFromCity":true,
			"knightreset":true,
			"waitAfterCitiesDone":20,
			"autoAttackCitiesDoneMax":2,
			"changeCitySecs":20,
			"retryMarch":true,
			"noViewReports":false,
			"chromeKeepReports":2,
			"percentOfPopToTrain":75,
			"percentToTrainOfMax":95,
			"autoGoldHappiness":99,
			"disableInviteFriends":true,
			"autoHelpAlliance":true,
			"hideAllianceHelpRequests":false,
			"autoPublishGamePopups":false,
			"autoPublishPrivacySetting":"80",
			"autoLogBackIn":true,
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
		this.browser_setValue(this.GetAttackName(x,y), JSON2.stringify(attack));
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
		var attack=this.GetAttack(x,y);
		if(!attack){
			this.Log("Attack not defined in system. This is first attack!");
			return true;
		}
		if(attack.a) { attack = attack.a; }
		// Check the current marches to see if there's an existing attack underway from this city
		var current_marches=this.GetSeed().queue_atkp["city" + this.GetCurrentCityId()];
		for (var march in current_marches) {
			if(current_marches[march]['toXCoord'] == x && current_marches[march]['toYCoord'] == y){
				this.Log("Troops are already marching to ("+x+","+y+") in the troop activity.");
				/*
				this.Log("Suicide wave time: "+attack.suicidewavetime+". Attack time: "+attack.time+".");
				if(!attack.suicidewavetime || !attack.time){
					this.Log("Suicide wave time: "+attack.suicidewavetime+". Attack time: "+attack.time+". This is first attack!");
					return true;
				}
				*/
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

		/*
		if(this.prevAttack.x && this.prevAttack.y){
			if(this.prevAttack.x==x && this.prevAttack.y==y) {
				this.Log("Previous attack matches current attack. This is not first attack!");
				return false;
			}
		}
		*/

		this.Log("Troops are not currently marching to ("+x+","+y+") in the troop activity. This is the first attack.");
		return true;
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
		if(x.value.length<1 || y.value.length<1){
			this.Log("One or both coordinates are missing!");
			return null;
		}
		return [x.value,y.value];
	},

	SetAttackFromGui:function(box, resetTime) {
		var xy=this.GetGuiCoords();
		if(!xy) return null;
		if(!resetTime){resetTime=false;}
		return this.SetAttackFromGuiXY(xy[0],xy[1],box, null, null, resetTime);
	},

	AttackLastSentTime:0,	
	UpdateAttackLastSentTime:function(){
		this.AttackLastSentTime = new Date().getTime()/1000;
		this.SetValue('AttackLastSentTime',parseInt(this.AttackLastSentTime));
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
	
	SetAttackFromGuiXY:function(x,y,box,isSuicideWave,locationType,resetTime) {
	
		if(resetTime==true){
			this.Log("Resetting start times for attack ("+x+","+y+")");
		}
		
		// Determine location type
		if(!locationType){ var locationType = ""; }
		var locationTypeRadioBoxes = ByName('KOCAttackLocationType');
		if(locationTypeRadioBoxes){
			for(var i = 0; i < locationTypeRadioBoxes.length; i++) {
				if(locationTypeRadioBoxes[i].checked) {
					locationType = locationTypeRadioBoxes[i].value;
					break;
				}
			}
		}

		// Determine attack wave type		
		if(!isSuicideWave){
			var isSuicideWave = false;
			var bulkAddSuicideWaveCheckbox = ById("KOCAttackBulkAddSuicideWave");
			if(bulkAddSuicideWaveCheckbox){isSuicideWave = bulkAddSuicideWaveCheckbox.checked;}
			var otherIsSuicideWaveCheckbox = ById("KOCAttackSuicideWaveCheckbox");
			if(otherIsSuicideWaveCheckbox){	if(otherIsSuicideWaveCheckbox.checked){isSuicideWave=true;} }
		}

		var troops=[];
		var totalTroops=0;
		for(var tr=0; tr<20; tr++) {
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
		var marchType = getAttackTypeSelected();	
		if(marchType==null) {
			throw("Cannot find attack type");
		}

		if(totalTroops<=0) {
			this.Log("No troops, not saving attack");
			return null;
		}

		var nowSecs=new Date().getTime()/1000;
		var monthAgo=nowSecs-(60*60*24*31);
		
		// ignore anything other than attack
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
			
			//if (this.options.lockAttackFromCity) {
			attack.fromCity=this.GetCurrentCityId();
			//}
			
			//Check if level is undefined
			if(!attack.levelInfo){attack.levelInfo={'type':locationType,'level':0};}
			if(locationType==""){
				if(attack.levelInfo.type!=""){
					// a pre-defined location type was already entered before for this attack.
					locationType = attack.levelInfo.type;
				}else{
					// Default to camp if attack location type was absolutely not specified in any way
					locationType = "Camp";
				}
			}
			attack.levelInfo.type = locationType;

			//attack.ignore=undefined;
			this.prevAttack={'x':x,'y':y};
			this.SetAttack(x,y,attack);
			return attack;
		} else if(marchType==1 || locationType=="Transport") {
			// try to parse transports
			var attack=this.GetAttack(x,y);
			if(!attack) attack={};
			attack.type=1; //If we got here presume to be transport mode
			//attack.ignore=true; // We set this to ignore for now until I can get the auto attack working
			if(comment){
				attack.comment=comment.value;
			}
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);

			attack.time=nowSecs;
			if(resetTime==true){ attack.time=monthAgo; }
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
			
			//locationType = "Transport"; Redundant code
			//Check if level is undefined
			if(!attack.levelInfo){attack.levelInfo={'type':locationType,'level':0};}
			// Set the location type
			//attack.levelInfo.type = locationType;
			
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
			var locationType = "Camp"; //Default to camp
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
		
		var bulkAddTable=document.createElement('table');
		bulkAddTable.style.background='transparent';
		var bulkAddDiv=document.createElement('div');
		bulkAddTable.insertRow(-1).insertCell(-1).appendChild(bulkAddDiv);
		bulkAddDiv.style.display='none';
		//AddHtml(bulkAddDiv,"<hr />");
		AddHtml(bulkAddDiv,"Copy and paste coords here (ie. 343,434) one on each line...<br />Note: it will only add the target using the current number of troops on this screen.<br /><input id='KOCAttackBulkAddForce' type='checkbox' /> <label for=\"KOCAttackBulkAddForce\">Overwrite existing attack if one already exists</label><br />");

		
		// radio boxes for defining bulk coordinate type
		AddHtml(bulkAddDiv,"<hr />");
		AddHtml(bulkAddDiv,"Type of Locations (All coordinates must match this type):<br />");
		var arrData = [["Camp", "Camps"],["City", "City"],["Transport", "Transport"],["Wilderness", "Wildernesses"]];
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
			
			objRadItem.addEventListener('change',function() {
				var locationType = "Camp"; // Set default value to camp
				var bulkLocationTypeRadioBoxes = ByName('KOCAttackBulkAddLocationType');
				if(bulkLocationTypeRadioBoxes){
					for(var i = 0; i < bulkLocationTypeRadioBoxes.length; i++) {
						if(bulkLocationTypeRadioBoxes[i].checked) {
							locationType = bulkLocationTypeRadioBoxes[i].value;
							break;
						}
					}
				}
				
				// Select the same radio box in the normal add area
				var locationTypeRadioBoxes = ByName('KOCAttackLocationType');
				if(locationTypeRadioBoxes){
					for(var i = 0; i < locationTypeRadioBoxes.length; i++) {
						if(locationTypeRadioBoxes[i].value == locationType) {
							locationTypeRadioBoxes[i].checked = true;
							break;
						}
					}
				}
			},false);
			
			AddHtml(bulkAddDiv," ");
		};
		AddHtml(bulkAddDiv,"<hr />");
		
		//AddHtml(bulkAddDiv,"<input id='KOCAttackBulkAddSuicideWave' type='checkbox' /> This is an initial suicide wave to wipe out traps on a wilderness.<br />");
		
		var bulkAddSuicideSpan=document.createElement('span');
		var bulkAddSuicideCheckbox=document.createElement('input');
		bulkAddSuicideCheckbox.id = "KOCAttackBulkAddSuicideWave";
		bulkAddSuicideCheckbox.name = bulkAddSuicideCheckbox.id;
		bulkAddSuicideCheckbox.type='checkbox';
		bulkAddSuicideSpan.appendChild(bulkAddSuicideCheckbox);
		AddHtml(bulkAddSuicideSpan,'<label for="KOCAttackBulkAddSuicideWave">This is an initial suicide wave to wipe out traps on a wilderness.</label>');
		bulkAddDiv.appendChild(bulkAddSuicideSpan);
		
		bulkAddSuicideCheckbox.addEventListener('click',function() {
			var bulkAddSuicideWaveCheckbox = ById("KOCAttackBulkAddSuicideWave");
			var suicideWaveCheckbox = ById("KOCAttackSuicideWaveCheckbox");
			var locationType_Wilderness = ById("KOCAttackLocationType_Wilderness");
			var bulkAddLocationType_Wilderness = ById("KOCAttackBulkAddLocationType_Wilderness");
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
			var locationType = "Camp"; // Set default value to camp
			var locationTypeRadioBoxes = ByName('KOCAttackBulkAddLocationType');
			if(locationTypeRadioBoxes){
				for(var i = 0; i < locationTypeRadioBoxes.length; i++) {
					if(locationTypeRadioBoxes[i].checked) {
						locationType = locationTypeRadioBoxes[i].value;
						break;
					}
				}
			}
			// Determine attack wave type
			var isSuicideWave = false;
			var bulkAddSuicideWaveCheckbox = ById("KOCAttackBulkAddSuicideWave");
			if(bulkAddSuicideWaveCheckbox){isSuicideWave = bulkAddSuicideWaveCheckbox.checked;}
			var otherIsSuicideWaveCheckbox = ById("KOCAttackSuicideWaveCheckbox");
			if(otherIsSuicideWaveCheckbox){	if(otherIsSuicideWaveCheckbox.checked){isSuicideWave=true;} }
			
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
	
	hideAttackEffortsState : true,
	HideAttackEfforts: function () {
		var t = KOCAttack;
		if (!ById('modal_attack_march_boost')) { return; }
		var span = document.createElement('span');
		var a = document.createElement('a');
		//var txt = document.createElement('text'); 
		a.innerHTML = 'Hide Attack/Speed Boosts';
		//inp.type='checkbox';
		span.appendChild(a);
		//span.appendChild (txt);
		if (t.hideAttackEffortsState) {
			hideshow('none');
		}
		a.addEventListener('click', function (evt) {
			t.hideAttackEffortsState = !t.hideAttackEffortsState;
			hideshow();
		}, false);
		for (var i = 1; i < 5; i++) {
			document.getElementById('modal_attack_tab_' + i).addEventListener('click', hideshow, false);
			document.getElementById('modal_attack_tab_' + i).addEventListener('click', setLocationType, false);
		}
		return span;

		function setLocationType() {
			var attackTypeSelected = getAttackTypeSelected();
			if(attackTypeSelected==1){
				// Transport
				var KOCAttackLocationType_Transport = ById("KOCAttackLocationType_Transport");
				if(KOCAttackLocationType_Transport) { KOCAttackLocationType_Transport.checked = true; }
				var KOCAttackBulkAddLocationType_Transport = ById("KOCAttackBulkAddLocationType_Transport");
				if(KOCAttackBulkAddLocationType_Transport) { KOCAttackBulkAddLocationType_Transport.checked = true; }
			}else{
				// Default back to Camp
				var KOCAttackLocationType_Camp = ById("KOCAttackLocationType_Camp");
				if(KOCAttackLocationType_Camp) { KOCAttackLocationType_Camp.checked = true; }
				var KOCAttackBulkAddLocationType_Camp = ById("KOCAttackBulkAddLocationType_Camp");
				if(KOCAttackBulkAddLocationType_Camp) { KOCAttackBulkAddLocationType_Camp.checked = true; }
			}
		}
		
		function hideshow() {
			if (t.options.knightreset) {
				var attackTypeSelected = getAttackTypeSelected();
				var knightSelect = ById('modal_attack_knight');
				if (attackTypeSelected != 0) { knightSelect.selectedIndex = 0; }
			}
			if (t.hideAttackEffortsState) {
				disp = 'none';
			}else{
				disp = 'block';
			}
			ById('modal_attack_march_boost').style.display = disp;
			ById('modal_attack_attack_boost').style.display = disp;
			ById('modal_attack_defense_boost').style.display = disp;
			var div = ById('modal_attack_speed_boost');
			for (var i = 0; i < i < div.childNodes.length; i++) {
				if (div.childNodes[i].className == 'section_title'){
					div.childNodes[i].style.display = disp;
				}
				if (div.childNodes[i].className == 'section_content') {
					div = div.childNodes[i];
					for (i = 0; i < div.childNodes.length; i++) {
						if (div.childNodes[i].style != undefined && div.childNodes[i].className != 'estimated') {
							div.childNodes[i].style.display = disp;
						}
					}
					break;
				}
			}
		}
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
		if(troop.disabled) return 'notfull'; //Disable filling in of troops if field is disabled
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
			var abandonButton=rows[i].getElementsByTagName('a')[1];
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

		this.StopWaitForAttackBoxAppear();
		if(ById('KocAttackComment')) {
			this.Log("We already have an attack dialog opened");
			return;
		}
		
		var addAttackContainerDiv=document.createElement('div');
		addAttackContainerDiv.id = "addAttackButtonContainerDiv";
		addAttackContainerDiv.style.position = "relative";
		addAttackContainerDiv.style.width = "1px";
		addAttackContainerDiv.style.height = "1px";
		addAttackContainerDiv.style.overflow = "visible";
		
		var addAttackDiv=document.createElement('div');
		addAttackDiv.id = "addAttackButtonDiv";
		addAttackDiv.style.width = "250px";
		addAttackDiv.style.left = "430px";
		addAttackDiv.style.top = "5px";
		addAttackDiv.style.position = "absolute";
		addAttackDiv.style.overflow = "visible";
		addAttackDiv.style.textAlign="left";

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
		locationTypeDiv.style.width="300px"
		locationTypeDiv.style.position="absolute";
		locationTypeDiv.style.left="0px";
		locationTypeDiv.style.top="-23px";
		locationTypeDiv.style.fontSize="10px";
		locationTypeDiv.style.textAlign="left";
		// radio boxes for defining bulk coordinate type
		var arrData = [["Camp", "Camp"],["City", "City"],["Transport", "Transport"],["Wilderness", "Wilderness"]];
		for (var i=0; i < arrData.length; i++){
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
				var locationType = "Camp"; // Set default value to camp
				var locationTypeRadioBoxes = ByName('KOCAttackLocationType');
				if(locationTypeRadioBoxes){
					for(var i = 0; i < locationTypeRadioBoxes.length; i++) {
						if(locationTypeRadioBoxes[i].checked) {
							locationType = locationTypeRadioBoxes[i].value;
							break;
						}
					}
				}
				
				// Select the same radio box in the bulk add area
				var bulkLocationTypeRadioBoxes = ByName('KOCAttackBulkAddLocationType');
				if(bulkLocationTypeRadioBoxes){
					for(var i = 0; i < bulkLocationTypeRadioBoxes.length; i++) {
						if(bulkLocationTypeRadioBoxes[i].value == locationType) {
							bulkLocationTypeRadioBoxes[i].checked = true;
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
		AddHtml(suicideSpan,'<label for="KOCAttackSuicideWaveCheckbox">This is a suicide wave</label>');
		addAttackDiv.appendChild(suicideSpan);
		suicideCheckbox.addEventListener('click',function() {
			var bulkAddSuicideWaveCheckbox = ById("KOCAttackBulkAddSuicideWave");
			var locationType_Wilderness = ById("KOCAttackLocationType_Wilderness");
			var bulkAddLocationType_Wilderness = ById("KOCAttackBulkAddLocationType_Wilderness");
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
		AddText(div,'Comment:');
		div.appendChild(comment);
		div.appendChild(document.createElement('br'));

		var div2=document.createElement('div');
		var ignore=document.createElement('input');
		ignore.type='checkbox';
		div2.appendChild(ignore);
		AddText(div2,'Ignore in the attack list');
		
		var div3=document.createElement('div');
		var deletefarmno=document.createElement('input');
		deletefarmno.type='checkbox';
		div3.appendChild(deletefarmno);
		AddText(div3,'Do not delete this report');
		
		var nextElement=ById('marchTypeDesc');
		//nextElement.parentNode.insertBefore(div2, nextElement.nextSibling);
		//div.appendChild(document.createElement('br'));
		div.appendChild (div2);
		div2.appendChild (div3);
		
		var xy=this.GetGuiCoords();
		var attack=null;
		if(xy) {
			attack=this.GetAttack(xy[0],xy[1]);
		}
		var notFullTroops=false;
		var notFullResources=false;

		var knightSelect=ById('modal_attack_knight');
		var totalTroops=0;
		var totalResources=0;
		var attackTypeSelected = getAttackTypeSelected();
		if(attack) {
			ignore.checked=attack.ignore?true:false;
			deletefarmno.checked=attack.deletefarmno?true:false;
			if(attack.time) {
				AddHtml(div,'Last attack: '+SecsToStr(nowSecs-attack.time)+' ago<br />');
			}
			if(attack.comment){
				comment.value=attack.comment;
			}
			
			// Select the attack type radio boxes
			var wildtype={
				'Lake':'Wilderness',
				'Mountains':'Wilderness',
				'Woods':'Wilderness',
				'Forest':'Wilderness',
				'Plain':'Wilderness',
				'Hills':'Wilderness',
				'Grassland':'Wilderness',
				'Wilderness':'Wilderness' // Unknown wilderness type
			};
			var levelInfo=this.GetLevelInfo(attack);
			var locationType = "City"; // Default to city
			if(levelInfo && levelInfo.type) {
				locationType = levelInfo.type;
			}
			if(wildtype[levelInfo.type]) {
				locationType = wildtype[levelInfo.type];
			}
			// Select the location type radio box in the normal add area
			var locationTypeRadioBoxes = ByName('KOCAttackLocationType');
			if(locationTypeRadioBoxes){
				for(var i = 0; i < locationTypeRadioBoxes.length; i++) {
					if(locationTypeRadioBoxes[i].value == locationType) {
						locationTypeRadioBoxes[i].checked = true;
						break;
					}
				}
			}
			// Select the location type radio box in the bulk add area
			var bulkLocationTypeRadioBoxes = ByName('KOCAttackBulkAddLocationType');
			if(bulkLocationTypeRadioBoxes){
				for(var i = 0; i < bulkLocationTypeRadioBoxes.length; i++) {
					if(bulkLocationTypeRadioBoxes[i].value == locationType) {
						bulkLocationTypeRadioBoxes[i].checked = true;
						break;
					}
				}
			}
			
			// only fill things in if we're in attack mode.
			if(attackTypeSelected==0 && attack.type==0) { // if 'attack' mode
				SuicideAttackDefined = this.isSuicideAttackDefinedAtLocation(xy[0], xy[1])
				if(this.prevAttack) { this.Log('Previous attack:'+this.prevAttack.x+'=='+xy[0] +','+this.prevAttack.y+'=='+xy[1] ); }
				var firstAttack = this.IsFirstAttackAtLocation(xy[0], xy[1]);
				this.Log("current attack wave type: "+attack.currenttattackwavetype);
				if(SuicideAttackDefined && firstAttack) {
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
					// Check the suicide wave checkbox
					suicideCheckbox.checked = true;
				} else if(attack.troops) {
					for(var tr=0; tr<attack.troops.length; tr++) {
						var troopCount=attack.troops[tr];
						if(!troopCount) continue;
						totalTroops+=troopCount;

						if(this.SetTroopInput(tr,troopCount)=='notfull') {
							notFullTroops=true;
						}
					}
					// Make sure the suicide wave checkbox is *not* checked
					suicideCheckbox.checked = false;
				}

				//attackTypeSelect.selectedIndex=attack.type;
				if(this.knightmarchid == knightSelect.options[knightSelect.selectedIndex].value){
					knightSelect.selectedIndex = 1+Math.floor(Math.random()*(knightSelect.options.length-1)); //Select random knight if last knight didn't go out
				}
			} else if (attackTypeSelected==1 && attack.type==1) { // transport
				
				ById('KOCAttackLocationType_Transport').checked;
				
				// If transporting, we enable all troop types. No reason to restrict ourselves to just normal supply troops!
				var supplyfilter_checkbox = ById('modal_attack_supplyfilter_checkbox');
				if(supplyfilter_checkbox){
					if(supplyfilter_checkbox.checked){
						supplyfilter_checkbox.click();
					}
				}				
				
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
						this.Log("Input field disabled for troop type: "+tr);
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
				knightSelect.selectedIndex = 0;
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
			
			
			// Show the "Delete Attack" button
			var deleteBtnDiv=document.createElement('div');
			deleteBtnDiv.id = "deleteAttackButtonDiv";
			deleteBtnDiv.style.width = "115px";
			deleteBtnDiv.style.left = "203px";
			deleteBtnDiv.style.top = "5px";
			deleteBtnDiv.style.position = "absolute";
			
			var deleteBtn=document.createElement('a');
			deleteBtn.className='button25';
			deleteBtn.innerHTML='<span>Delete Attack</span>';
			deleteBtn.addEventListener('click',function() {
				t.DeleteAttack(xy[0],xy[1]);
				t.DoUnsafeWindow('Modal.hideModalAll();');
			},false);
			deleteBtnDiv.appendChild(deleteBtn);
			addAttackContainerDiv.appendChild(deleteBtnDiv);

			//div.insertBefore (deleteBtn, div.firstChild);
		} 
		
		var ChangeAttack=function() {
			var xy=t.GetGuiCoords();
			var attack=null;
			if(xy) {
				attack=t.GetAttack(xy[0],xy[1]);
			}
			if(!attack) attack={};
			if(getAttackTypeSelected()!=attack.type) {
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
		divContainer.style.padding = '0px 12px';
		divContainer.style.height = '320px';
		divContainer.style.maxHeight = '320px';
		divContainer.style.overflowY = 'auto';
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
			&& (knightSelect.options.length>1 || attackTypeSelected==1)//If transport you don't need knights(Thanks to shalm for pointing that out)
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
					//t.ResetIdStatus();
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
				this.Log('Unable to send attack to '+xy[0]+','+xy[1]+', knights avail:'+(knightSelect.options.length-1)+', Not enough troops: '+notFullTroops+'(need '+totalTroops+'). Not enough resources:'+notFullResources+' (need '+totalResources+')');
				this.DoUnsafeWindow("Modal.hideModal();");
				this.NextAutoAttackCity();
			}
		}
	},
	
	ClickMarch:function(btnMarch, box, alert, resetTime){
		if(!resetTime){resetTime=false;}
		var t = this;
		if(btnMarch){
			nHtml.Click(btnMarch);
			window.setTimeout(function() {
				var mist=nHtml.FindByXPath(document,".//div[@class='mistwarn']");
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
	//javascript:Messages.viewMarchReport("22891795",0,51,10,1550996,"oftheNOOBS","M","Debby32","F",1,430,205,1302284981,1,284,83);
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
			if(typeNum=="51" && m[5]!='0') { //Gradually replace all attack types to follow Tom's new method of storing attacks
				if(attack.type==0){
					type='City';
				} else if (attack.type==1){
					type='Transport';
				}
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
			var xI=/^\s*([0-9]+)[\s|,|-|.]+([0-9]+)/.exec(xValue); 		
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
			if((parseInt(neededResources[t])+parseInt(this.options.transportResourcesReserveAmount))>parseInt(currentResources[t])) {
				return false;
			}
		}
		return true;
	},

	currentMarchesNum:0,
	available_marches_num:0,
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
		if((!levelI || levelI.level==0 || levelI.type=="" || levelI.type=="Camp") && attack.messages && attack.messages.length>0) { //The idea is to replace all old attacks with the new one
			levelI=this.FindLevelFromMessages(attack);
		}
		
		if (!levelI && (attack.currenttattackwavetype == 'transport')){
		  return {'type':'Transport','level':0};
		}
		// if (!levelI){
		  // return {'type':'Camp','level':0}; // Default to camp
		// }
		//All old attacks for city are stored as "" So disable this option for the mean time
		//if(levelI.type==""){levelI.type="Camp";}
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
				if(tempAttack){
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
					this.Log("Unknown/Invalid attack specified ("+attack.x+","+attack.y+").");
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
			
			if(levelInfo.type == ""){levelInfo.type = this.FindLevelFromMessages(attack);;} // If empty look in messages
			if(levelInfo.type == ""){levelInfo.type = "City";} // If still blanck default to city
			
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
			this.available_marches_num = this.currentRallyPointLevel - this.currentMarchesNum;
			//this.Log("Available marches: "+available_marches_num);
			if(attack.a.suicidewave && attack.a.currenttattackwavetype != "normal"){
				//this.Log("Current attack wave type: "+attack.a.currenttattackwavetype);
				if(this.available_marches_num < 2 || this.currentRallyPointLevel < 2){
					// Make sure this is the first wave of the multi-wave attack and then don't send it if there aren't enough marching slots for both waves
					if(this.IsFirstAttackAtLocation(attack.x, attack.y)) {
						// This is the first wave
						this.Log("Not attacking: Not enough available marching slots at rally point to launch both suicide wave and second wave for coordinates ("+attack.x+","+attack.y+")");
						break;
					}
				}
			}
			
			// Make sure we have at least one available slot in attack queue for normal attack
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
			this.Log('mapper is running, do not auto attack');
			return true;
		}
		return false;
	},
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
	SetAutoAttack:function(s) {
		if(s) {
			//this.Log("Setting Auto Attack: "+JSON2.stringify(s));
			this.SetValue('AutoAttack',JSON2.stringify(s));
		} else {
			this.SetValue('AutoAttack','');
		}
	},
	ResetAutoAttackTarget:function() {
		var autoAttack=this.GetAutoAttack();
		if(autoAttack) {
			autoAttack.x=undefined;
			autoAttack.y=undefined;
			this.SetAutoAttack(autoAttack);
		}
	},

	GetCurrentMapCoord:function() {
		// Check to see if we are on map screen
		var mapbutton = ById('mod_views_map');
		if(mapbutton && mapbutton.className=='sel'){
			// Return xy values from form inputs
			var xcoord=ById('mapXCoor');
			var ycoord=ById('mapYCoor');
			if(xcoord && ycoord){
				return {'x':xcoord.value,'y':ycoord.value};
			}
		}
		// Not on map screen. Return coordinates of current city
		var cities=this.GetSeed().cities;	
		for(i=0; i<cities.length; i++){
			if(cities[i][0]==unsafeWindow.currentcityid){
				return {'x':cities[i][2],'y':cities[i][3]};
				break;
			}
		}
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
		};
		var DeleteFarm=function(e) {
			var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
			t.DeleteAttack(xy[0],xy[1]);
			t.DrawClosestFarms();
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
				if(this.options.autoRemoveReports || this.options.autoRemoveFarmReports) {
					this.autoAttackRemoveReports=true;
				}
			}
		}
	},

	ClickChangeCity:function(cityA,tries) {
		var t=this;
		nHtml.Click(cityA);
		// If this is the only city selected in the options, we just pretend to switch
		var currentCityNum = this.autoAttackCityUpto;
		var enabledCities = 0;
		for(var i=1; i<=8; i++){
			if(this.options.okCities[i]){
				enabledCities++;
			}
		}
		//t.Log("Number of enabled cities to attack from: "+enabledCities);
		if(enabledCities==1){ t.prevCurrentCity = -1; }
		// Determine the number of the city and store it
		t.SetCurrentAttackCityNum(cityA.id.replace("citysel_",""));
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

		// this.autoAttackCityUpto++;
		// cityA=ById('citysel_'+this.autoAttackCityUpto);
		
		// //~~~ problem here when under attack, the city isn't marked as selected?
		// // Skip to next city along the line if the current city is already selected somehow
		// if(cityA && cityA.className && cityA.className.indexOf('city_selected')>=0) {
			// this.Log('Skip city, current city:'+this.autoAttackCityUpto);
			// this.autoAttackCityUpto++;
		// }

		// // Determine the next enabled city in the options
		// var firstAvailableCityNum = this.autoAttackCityUpto;
		// while(firstAvailableCityNum<=8){
			// if(this.options.okCities[firstAvailableCityNum]){
				// break;
			// }else{
				// firstAvailableCityNum++;
			// }
		// }
		// // Default to city #1 if no cities are enabled
		// if(!this.options.okCities[firstAvailableCityNum]){
			// firstAvailableCityNum = 1;
		// }
		
		// // Check to make sure that the next city is selected in the options
		// //this.Log("Currently attempting to switch to city: "+this.autoAttackCityUpto);
		// var currentCityNum = this.autoAttackCityUpto;
		// while(currentCityNum<=8){
			// //this.Log("Is City "+currentCityNum+" Selected in options: "+this.options.okCities[currentCityNum]);
			// if(!this.options.okCities[currentCityNum]){
				// currentCityNum++;
			// }else{
				// if(currentCityNum>this.autoAttackCityUpto){
					// this.Log("City "+this.autoAttackCityUpto+" not enabled in options.");
					// this.autoAttackCityUpto = currentCityNum;
				// }
				// //this.Log("Attempting to switch to city: "+this.autoAttackCityUpto);
				// break;
			// }
			// // No cities were available. Switching to first available city
			// this.autoAttackCityUpto = firstAvailableCityNum;
		// }

		while(true) {
			this.autoAttackCityUpto++;
			cityA=ById('citysel_'+this.autoAttackCityUpto);
			//~~~ problem here when under attack, the city isn't marked as selected?
			if((cityA && cityA.className && cityA.className.indexOf('city_selected')>=0) || (!this.options.okCities[this.autoAttackCityUpto])) {
				this.Log('Skip city, current city or city not selected: '+this.autoAttackCityUpto);
			} else {
				this.Log('Attempting to select this city: '+this.autoAttackCityUpto);
				cityA=ById('citysel_'+this.autoAttackCityUpto);
				break;
			}
		}
	
		cityA=ById('citysel_'+this.autoAttackCityUpto);
		if(!cityA) {
			// go back to the 1st available city
			this.Log('Start from 1st city again');
			if(this.autoAttackCityUpto<=2) {
				// only one city.
			} else {
				this.autoAttackCityUpto=1;
				cityA=ById('citysel_'+this.autoAttackCityUpto);
			}
			this.autoAttackCitiesDone++;
		}

		if(!cityA || this.autoAttackCitiesDone>=this.options.autoAttackCitiesDoneMax) {
			//Reset to first city if auto attack does the refresh
			this.SetCurrentAttackCityNum(1);
			// ran out of cities, let's refresh in a minute
			this.StartReloadPageTimer();
			return;
		} else {
			if(this.nextAutoAttackTimeout==null) {
				var secs=t.GetRandTime(1000*t.options.changeCitySecs);
				this.Log('Changing city to: '+this.autoAttackCityUpto+', in '+(secs/1000)+'secs, loop: '+this.autoAttackCitiesDone);
				this.nextAutoAttackTimeout=setTimeout(function() {
					t.nextAutoAttackTimeout=null;
					t.SetValuesCache();
					t.ClickChangeCity(cityA,0);
				},secs);
			} else {
				this.Log('Cannot change city. Reason: about to attack or change city');
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
		},5*1000);
		
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
		this.Log("Next auto attack");
		if(this.nextAutoAttackWanted!=null) {
			window.clearTimeout(this.nextAutoAttackWanted);
			this.nextAutoAttackWanted=null;
		}

		var autoAttack=this.GetAutoAttack();

		if(!this.options.okCities[this.autoAttackCityUpto]) {
			this.Log('Skip city. Not enabled in options. City: '+this.autoAttackCityUpto);
			this.NextAutoAttackCity();
			return;
		}
		
		
		if(!autoAttack || (autoAttack.x!=undefined && autoAttack.x!=-1)) return;
		if(this.IsMapperRunning()) {
			this.StartReloadPageTimer();
			return;
		}
		this.DetermineCurrentRallyPointLevel();
		this.DetermineCurrentMarchesNum();
		this.available_marches_num = this.currentRallyPointLevel - this.currentMarchesNum;
		var currentTroops=this.GetArmySize();
		var currentResources=this.GetResourcesSize();
		var mapCoord=this.GetCurrentMapCoord();
		var attacks=this.GetClosestAttacks(mapCoord.x,mapCoord.y);
		//this.Log("Current attacks in system: "+inspect(attacks,10));
		var bestAttack=this.FindBiggestCampAttack(attacks,currentTroops,currentResources);
		if(bestAttack && this.available_marches_num>0) {
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
					//this.Log('type:'+li.type+',level:'+li.level);
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
	DeleteFarmAttacks:function() {
		var deletes=0;
		this.IterateMsgReports(function(a,tr,desc,x,y) {
			var DisplayName = this.GetDisplayName();
			DisplayName = /([^"]+) ([^"]+)/.exec(DisplayName);
			
			var onclick=a.getAttribute('onclick');
			if(!onclick) return false;
			onclick=onclick.trim();
			var m=this.onclickReportRe.exec(onclick);
			if(this.IsOnclickMyselfToMyself(onclick)) {
				return true; //Don't select transports
			} else if(m && m[5]=='0') {
				return true; //Don't select barbs or wilds
			} else if(m && m[11]=='0' && m[12]=='0') {
				return true; //Don't select if empty
			} else if(m && m[8].StripQuotes()!=DisplayName[2])  {
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
			var reportsRemoved=0;
			if(this.options.autoRemoveReports){
				reportsRemoved+=this.DeleteWildBarbAttacks();
			}
			if(this.options.autoRemoveFarmReports){
				reportsRemoved+=this.DeleteFarmAttacks();
			}
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
	
	GetCurrentAttackCityNum:function() {
		var curCityNum=this.GetValue('CurrentAttackCityNum',null);
		if(!curCityNum || !is_int(curCityNum) || curCityNum>8){
			// default to first city
			curCityNum=1;
		}
		return curCityNum;
	},
	SetCurrentAttackCityNum:function(curCityNum) {
		if(!curCityNum){
			var curCityNum = 1;
		}
		//this.Log("Setting current attack city to: "+curCityNum);
		this.SetValue('CurrentAttackCityNum',curCityNum);
		return curCityNum;
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
				numInp.value=Math.floor(parseInt(maxObj.textContent)*(parseInt(this.options.percentToTrainOfMax)/100));
				var t=this;
				window.setTimeout(function() {
					if(numInp.value>parseInt(maxObj.textContent)) {
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
		if(unsafeWindow.location.href.match(/kingdomsofcamelot\.com\/fb\/.*?\/standAlone\.php/i)){
			this.currentPage = 'kabam_page';
		}else if(unsafeWindow.location.href.match(/kingdomsofcamelot\.com\/fb\/.*?\/src\/main_src\.php/i)){
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
		var autoAttack=this.GetAutoAttack();
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
	CheckImpendingAttack:function() {
		var r=false;
		var seed=this.GetSeed();
		
		if(seed && seed.queue_atkinc) {
		  for(k in seed.queue_atkinc){
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




	/*
	TimeoutZero:function(f,arg) {
		setTimeout(function() {
			f(arg);
		},0);
	},
	*/

	pageLoaded:false,
	prevCurrentCity:-1,
	currentAttackCityResumed:false,
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
			//Check for strange majic error
			setTimeout(function(){checkStrangeMagic();},15000);
					
			window.setTimeout(function() {
				if(!t.pageLoaded && t.GetAutoAttack() && !t.IsMapperRunning()) {
					GM_log("whoops, game not loaded after 60 secs problem. reloading.");
					t.SetValuesCache();
					t.ReloadWindow();
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
			
			if (t.currentPage == 'kabam_page'){
				t.Log('kabam_page');
				KOCAttack.ReloadWindow();
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

				// Resume attacks at the last city we left off on (if page was reloaded)
				if(!t.currentAttackCityResumed){
					var currentAttackCityNum = t.GetCurrentAttackCityNum();
					var currentAttackCity=ById('citysel_'+currentAttackCityNum);
					//t.Log('Last known attack city from :'+currentAttackCityNum);
					if(currentAttackCity){
						if(currentAttackCityNum>1){ //Do not change city if the last city saved was 1
							t.Log('Changing to last city before refresh:'+currentAttackCityNum);
							t.autoAttackCityUpto = currentAttackCityNum;
							t.ClickChangeCity(currentAttackCity,0);
						}
						t.currentAttackCityResumed = true;
					}
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
						t.DrawClosestFarms(); // Init auto attack tab
						t.AddViewAttacksLink();
						//t.AddImportExportLink();
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
		// *** it says "new Ajax" in the source but firefox converts it to new (Ajax
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
		[['v += parseInt','var f = parseInt']],
		[['"Count"]);','"Count"]); if(f>0) { var uname=unitcost["unt"+r][0]; v+=uname[0]+uname[uname.length-1]+":"+f+", "; } ']],
	];
		
/*****	
	if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		modalAttackReplaces.push([['new Ajax',"var marchSuccess=null; "+retryMarch+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew Ajax"]]);
	} else {
		modalAttackReplaces.push([['new (Ajax',"var marchSuccess=null; "+retryMarch+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew (Ajax"]]);
	}
*****/
	//modalAttackReplaces.push([['ajax.Request',   "var marchSuccess=null; "+retryMarch+
		//(useRetryMarch?"":" Modal.hideModalAll(); ")+	"\najax.Request"]]);

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
				document.body.insertBefore(sp,document.body.childNodes[0]);
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
	//}		
	replaceFunc('modal_attack_do',modalAttackReplaces);
	replaceFunc('modal_attack_update_num_max',modal_attack_update_num_maxReplaces);
	
	function AddArray(to,from) {
		for(var c=0; c<from.length; c++) { to.push(from[c]); }
	}
	
	var arr=[];
	AddArray(arr,attack_generatequeueReplaces);
	var funcStr=window['attack_generatequeue'].toString();
	if(funcStr.indexOf('; var u = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesU);
	} else if(funcStr.indexOf('; var r = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesR);
	} else if(funcStr.indexOf('; var s = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesS);
	} else if(funcStr.indexOf(' var t = 0;')>=0) {
		// camelotmain-150
		AddArray(arr,attack_generatequeueReplacesT);
	} else if(funcStr.indexOf(' var v = 0;')>=0) {
		// camelotmain-165
		AddArray(arr,attack_generatequeueReplacesV);
	} else {
		var err="Unknown attack queue func: "+location.href+"\n"+funcStr;
		GM_log(err);
	}
	replaceFunc('attack_generatequeue',arr);

	//replaceFunc('modal_attack_update_num',modalAttackUpdateNumReplaces);

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



/******************* Check strange majic error ******************/
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
				GM_log("White screen error. Refreshing.....");
			}
			return;
		}
		checkiFrame();
	},10000);
}
function checkStrangeMagic (){
	GM_log("Check strange majic");
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

/******************* Function calls ******************/
KOCAttack.Listen();
checkWhiteScreen();
DisableMixpanel();
if(unsafeWindow.cm){
	unsafeWindow.cm.cheatDetector={
		a:function(){  },
		detect:function() { }
	};
}
if(location.href.indexOf('apps.facebook.com/kingdomsofcamelot/')>=0) {
	window.setTimeout(function() {
		
	},10000);
} else {
	StartAll();
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
		KOCAttack.SetupClearMessages();

		SetupScripts();
	} else {
		window.setTimeout(function() { StartAll(); },200);
	}
}

var WINLOG_MAX_ENTRIES = 1000;     // TODO
var WinLog = {
  state : null,
  win: null,
  eOut : null,
  lastE : null,
  enabled : true,
  reverse : true,
  busy : false,
isOpening : false,

  open : function (){
    var t = WinLog;
	GM_log("opening WinLog");

    function eventButClear(){
      var t = WinLog;
      t.lastE = null;
      t.eOut.innerHTML ='';
    }
    function eventButReverse(){
      var t = WinLog;
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
      for (i=n-2; i>=0; i--){
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
  write : function (msg){
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



// ==UserScript==
// @name           KOC Power Bot
// @version        20110426b
// @namespace      mat
// @homepage       http://userscripts.org/scripts/show/101052
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @include        http://apps.facebook.com/kingdomsofcamelot/*
// @description    Automated features for Kingdoms of Camelot
// @require        http://tomchapin.me/auto-updater.php?id=101052
// ==/UserScript==


var Version = '20110426b';

// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var ENABLE_TEST_TAB = false;
var ENABLE_ATTACK_TAB = false;
var ENABLE_SAMPLE_TAB = false;
var DISABLE_BULKADD_LIST = false;
var ENABLE_GM_AJAX_TRACE = false;
var SEND_ALERT_AS_WHISPER = false;
// end test switches

var MAP_DELAY = 1200;

var DEFAULT_ALERT_SOUND_URL = 'http://www.falli.org/app/download/3780510256/fliegeralarmsire.mp3?t=1263916531';
//var SWF_PLAYER_URL = 'http://www.fileden.com/files/2011/2/25/3086757/matSimpleSound01aXD.swf';
var SWF_PLAYER_URL = 'http://www.saylortribe.com/KOC/matSimpleSound01aXD.swf';

var URL_CASTLE_BUT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAMAAAGkBsQ5AAABa1BMVEX%2F%2F8X%2F98X%2F973%2F97X%2F77X%2F7633773%2F76X377X3763%2F5q3%2F5qX%2F5pz35q335qX%2F3pz%2F3pT33pz%2F1pT%2F1oz%2F1oT31pT31oz%2FzoT%2Fznv3zoT%2FxXv%2FxXP%2FxWv3xXv3xXP%2FvWv%2FvWP3vWv3vWP%2FtWP%2FtVr%2FtVLmvWv3tWP3tVr3tVL%2FrVL%2FrUrmtWP3rVL3rUrvrVL%2FpUrvrUr%2FpULmrVrmrVL3pUr3pULmpUL3nDrepULWpVLWpUrmnDrFpUK1pVrOnDqcnFKcnEqMnEp7lHN7lGtzlGNrlGtjjEpajFpShFJSe2NChEJKe1o6hDohjDFCc1oZjDEhhDEQjDEAlDEpezoZhDEhezoQhDEAjDEpczoZezoIhDEhc0IhczoAhDEZczoIezEhazoAezEhY0IAczEAcykIazEhWkIAazEAaykIYzEhUkIAYzEAWjEAUjEAUikASjEASikAQjEAQikAOjEAOikAMTEAMSkAKSlOGAcLAAAACXBIWXMAAAsSAAALEgHS3X78AAABVklEQVQYGQXBPW4TYRiF0ee%2B3x2DRSxRIFJTGIkVUFDQIbEDlkE5%2B8kWWEKKIBSB5AohXBGUSAaCIdgz3x%2FnaARztjS3RSPodPkmfuzReLbOh1fm72a4h3kxyWgE8NXPz8%2F%2FhC%2FzRXLM3cmeqvGDl7Mfa9ztT9pvp3%2FDOpjOr7Yft9PXjPHxE%2Bl6p4SJqSq5RsL4EAtZaUAjAABoBADAt%2Fty8ovVnhQ%2Bfx%2BbDTfXQ9Bz5H7IdWGV9k588NJWrQiXjMkdly6Fo9beRap29F4QJBxTE%2Bo9bF7XuUpJsp8BAGjcATSgADOQWRsfLu8WT0%2B33wcePknfJj%2B6j3Hb17m5HQsr1%2Fm4aGBEbtp8uXPWzcSBlhYYXKunObLoOyU1jFH02oVRZNFJQ2CCko26MIrC3MAEpRdcSVkYFYzBuaAuQFFAgzFBK0GVZhYoaUYYVm8b0IAGNDr8B8ZXpEbZNGQ6AAAAAElFTkSuQmCC";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXAgMAAAHuttyYAAAACVBMVEX%2F%2F%2F8AOjEAKSnbo5E5AAAACXBIWXMAAAsSAAALEgHS3X78AAAAW0lEQVQI12NYwdAAhCsYOICwQQGEpiYwrGpgCHRgcIChUAeGqaERDBMZJRgmMCDwqlUrgHgBQ2hoAIMjiwAYOzBgxyA1ILVTQ4GggWEKK4MIK4JiYGAgiYKYAgBFlyWR9CCfyAAAAABJRU5ErkJggg%3D%3D";
var CHAT_BG_IMAGE = "data:image/gif;base64,R0lGODlhagHQAvcAAP%2F%2F5v%2F%2F1v%2F33v%2F31vf35v%2F3zvf33v%2F3xff31vf3zv%2Fv3u%2F33v%2Fv1v%2Fvzvfv1vfvzvfvxffvvffmzu%2Fmvebmvffere%2Feve%2Fete%2Fere%2Fepebevebeteberd7evd7ete%2FWpebWtd7Wtd7Wrd7WpdbWrd7Ord7OpdbOrdbOpdbFpc7FtdbFnM7FnMXFrc7FlM69rc69nM69lM69jMW9nMW9lMW9jL29nL29lM61jMW1nMW1lMW1jL21nMW1hL21lL21jMWtlLW1lL2tnL2tlL2thL2te7WthL2le72lc7WlhL2la7Wle7Wlc7Wla62le62lc7Wce7Wcc62chLWca6WcjK2cc6WchK2ca62cY6Wcc6Wca6WUhK2Ua6WUa6WUY5yUY5yMa5yMY5yMWpSMa5SMY5SMWoyMY5SEa5SEY4SEe4yEY4yEWoyEUpx7Uox7Wox7UoR7WoR7UoRzUntzY4RzSntzUntzSnNzSntrSmtrY3NrSmtjOhlrzmNaSjpjhBljxRljvRljtRlarRlapRlSnBlSlBlKjBlKhBlKexlCexlCcxlCa0o6CCE6Uhk6Yxk6WkopAEIpADopABAxQjEpEDEpCCEpMRkpMTohADEhACkhCDEZACkZACEZCCEZACEQABkQABkIABAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAagHQAgAI%2FgB1NGgAB02XJUaWKFziZEmShRAVOplIcSIUKA4fLsG4EUqVj1kqNpQosmJEJ1VGSvx4saXLlwxLTvxYReFHmSgnkqRJkabPn0CrvGypE2fFlEZLCl3I8SJEKCirZJmKNGlJIxRJjoza0CREq0eVBq0KNqdIpFo7ehQ61OVYLTSnZoGbUUoSJ0yeNJlR4EGdOGsCC37jRvAaN4gDI37DuDHjOI3dOHYcR46cyZgzI94cmfMby6BBZ34Tp7Tp0ocZFx79GPNp03LsjLZcGjRk1ZJZE278%2Bvbj3qZVH0482rQdO8DjbEZ8OnHwNaU9q9ZNOvnpzryTvzEcuLRr4MWt%2Fgev%2FpoOHdPm0zOWszkOm%2Fc3HjxY42QGChQmRNw%2FQaL%2FiRP7%2FYeCCAT%2BR6B%2B9yUYoIAKmuCgCSVEWMKDD5aAH4UOXkghCvz15yEJCoYoIgoT3gehCSRieKKEEkIogoQj3pcChx7%2Bx99%2FH%2F7H4o4RoohCCjNyaOOCAIb4YX8xJriCggDqGGGRIloo4oYaVgjjiBnGmGWSCdqIoopbhljhg1yWaeYKQJZwwoEjjHBDAgmoYcQGfRVg550DFJCnnQP0ead88tkJ56AJCEoonAUMpOiddiraAKOQRsrooZQOmqiji17qqKaLYurpp54WUGilk3IKaqiMNuAnpIiuKiqi%2F68W2uhAktYKKa13nqorpolemmukj9p6a6278kqqsH8%2B8CcEyhZwwAGMPgCBnQI1sIYRIDQAQbGbcmqqow%2BAGm64npKL6bjncituA%2BiiO1C77MYL77i5BtuXueqCqum37ALq77%2F%2B5vvuv%2F0GPLDBBhfbLr6KAkxwwacCKnC6706M67f1OhtBBBAcwOwADjgwA7tygJGEDjrkoPLKKvuwsg8w5wCzD0MMMXMOKKO8MhApsywzD0AHLfTQQc88NMxBDwHE0kwD4fPLM0dtdNRAU0200DPXXDPNWnettNc8s8yz1DPPYHYOVZNt9NE%2B6KB0z27rvDLKRa9dddBo86C21f5D5%2B3D1XjnMMPKgO8NeN12H6643joA0TXPTXstueQ%2FDPFDD5gXofkPlQuRgwQSwOGGGmecAcbpqIOxhRVWSCEF663DLrsVW9Re%2B%2By45667FVTsrvvrwPsu%2FPC2F7867Lfvfjztt9vOfPLD0%2F588dFXb73yy%2Bee%2FfXcd8%2B98eCHD%2F4ZcMxRRx1zwHHGEkQwQQcj8O%2FRRx8vMOBAHX2Iov%2F%2B%2FPfv%2F%2F8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygAxmhhyUUgQ3wy%2BALDKCAOeRPgiAMoQhHSMISmvCEKEzh%2Fxixhh6IIYOMaIEBDOBBFdrwhjjMoQ53yEMJsrAK7%2F6DXwsIQIAa9vCISEyiEpfIRAMyogtV2AP8XkBEIzbxiljMoha3%2BMA9ZGENU1RABz%2FIxTKa8YxoZCIZjBDGMYLijXCMoxznSMc62vGOeMyjHvfIxz768Y%2BADKQgB0nIQhrykG%2FcQxQZ8QIxehCRkIykJCdJyUpa8pKYzCQoGMGFNjByho%2FUpChHScpSmvKUqBRkF7gQQ0f2IZWwjKUsZ0nLWuIxCzuIIQdDacte%2BvKXwAwmIHGpSzcK85jITKYyY0nMFrhymdCMpjSnWchmPpOa2MymNrNpTWNu85vgDGcvs9CDVnpTnOhMpzozmQUimNODnYinPOdJz3ra8574zP%2BnPvfJz376858ADahAB0rQghr0oAhNqDzJ%2Bc4%2BKPShEI2oRCdK0Ypa9KIYjWc34ZnRjnr0oyANqUhHStCNOpSkKE2pSlfK0pbmk6HOHKNLZ0rTmtr0piUtZyNlitOe%2BvSnQE0pQ3fK0aAa9ahITWpBh%2BpKpTr1qVCFKlN5GtWqWvWqM4UpKE%2BK1a569asZbacuachVsJr1rGgtqTtlSFZNuPWtcI2rXOdK17ra9a54zate98rXvvr1r4ANrGAHS9jCGvatYmWrBw%2FL2MY69rGQjaxkJ0vZyro1C0Uo5mIty9nOevazoA2taAOLWc32YbSoTa1qV8va1t61CkdoqGv%2BZ0vb2tr2toGFrWxxy9ve%2Bva3qdUtUU8L3OIa97jIHaxwXZnc5jr3uc9d7hihS93qWre20t3sdbfL3e5aVrcx9SAlxkve8pr3vOhNr3rXy972uve98I2vfOdL3%2Fra9774za9%2B90veKhQBEuHVA38HTOACG%2FjACE6wghfM4PFC4QgAdqSAG0zhClv4whjOsIbt%2B%2BAIj3HDIA6xiEdM4hKztwpIgIQKXNmISbj4xTCOsYxnTOMa2%2FjGOM6xjnfM4x77%2BMdADrKQh0zkIhf5EpagxBVSTNQ88OHJUI6ylKdM5Spb%2BcpYzrKWt8zlLnv5y2AOs5jHTOYym%2FnMUH5Cilv%2BsIAF5CEPf4iznOdM5zrb%2Bc54zrOe98znPvv5z4AOtKAHTehCG%2FrQiE60nO0CCRsgwM1%2BAISkJ03pSlv60pjOtKY3zelOe%2FrToA61qEdN6lKb%2BtSoTrWqJ22FJEBiBgPoYKRXTeta2%2FrWuM61rnfN614DwgpLgAQMBCDrQBj72MhOtrKXzexmO%2FvZ0I62tKdN7Wpb%2B9rYzra2t83tbnv72A2BxE7T4AdBmPvc6E63utfN7na7%2B93wjre8503vetv73vjOt773ze9%2B%2B%2FvcRoiCh8n974Ib%2FOAIT7jCF87whjvc3EaA8LjzMIiKW%2FziGM%2B4xjfO8Y57%2FOMgD7nIR07%2F8pKb%2FOQoT7nKV87ylls8CRIXYxryQIia2%2FzmOM%2B5znfO8577%2FOdAD7rQh070ohv96EhPutKXzvSm2zzi4pY5zZ1O9apb%2FepYz7rWt871rhPCCEyWeiHGTvaym%2F3saE%2B72tfO9ra7%2Fe1wj7vc5073utv97njPu973TnawR10BMzeE4AdP%2BMIb%2FvCIT7ziF8%2F4xjv%2B8ZCPvOQnT%2FnKW%2F7ymM%2B85gcP9Q12MA%2BbD73oR0%2F60pv%2B9KhPveoFnxAAgzIPh4i97GdP%2B9rb%2Fva4z73ud8%2F73vv%2B98APvvCHT%2FziG%2F%2F4yE%2B%2B7I3ABNfTMA%2BIiL70p0%2F96lv%2F%2BtjPvva3z%2F3u%2Fnv%2F%2B%2BAPv%2FjHT%2F7ym%2F%2F86E%2B%2F9Jn%2F9znkIRHwj7%2F850%2F%2F%2Btv%2F%2FvjPv%2F73z%2F%2F%2B%2B%2F%2F%2FABiAAjiABFiABniACBh%2FftdICOB%2BivCAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCIjiCJFiCJniCEAhzABYy7rcILviCMBiDMjiDNFiDNniDOJiDOriDPNiDPviDQBiEQjiERFiERviCKtgCDtCAeXCETviEUBiFUjiFVFiFVniFLpgEUKBibeZ%2BjvCFYBiGYjiGZFiGZniGaJiGariGbNiGbviGcBiHcjiHdFiHdniHYPgDUBAJKvB6j%2FCHgBiIgjiIhFiIhniIiJiI%2F4q4iIzYiI74iJAYiZI4iZRYiZZ4iYAoBcHGAyEDB1SgAgAQiqI4iqRYiqZ4iqiYiqq4iqzYiq74irAYi7I4i7RYi7Z4i7iIix1gA1kQASk2AwLQAHjQBSeQi8Z4jMiYjMq4jMzYjM74jKi4i13wASmWAwMgjGggAtC4jdzYjd74jeAYjrlIAjfgBRmgBJDgA9qCB2WgjeL4jvAYj%2FI4j%2FTIiiJQA1iQAVMACT8gLXZABu5YjwI5kARZkAZJixsQA1dQAQLnAwnwAHZQBiNwkBRZkRZ5kfOYkAspcDdQABAQkROJkSI5kiRZkre4ATRwBR8gcDXgkSBpkjAZkzI5k%2F%2F3yAUfsI80wAASgAfZOJM%2B%2BZNAWZAj0ANecJOvNgA72ZNBuZRM2ZTcOJRFuY868AAMwJMo4JRYmZVaeYscIAMqmWJTWZVkcJVbWZZmeZameAEKuZKQMJXCOJZoGZdyqZVqqZINuS14AJdzuZd86ZMXgAM2KXA7gJdlQJZ9eZiIiZEbsAM2mWKD%2BZaGmZiSOZkCuZhXgAGOuS3%2FGJmU2ZmeCY4b4JUVkJkNsJmfeZqouY0XIJoC9wN98Y8BmZqyOZu5CAIxEJjp%2BJpKSZu82ZuxaJt2mZsPgAdrEJu%2BeZzIaYq2iZs%2B0BfEaZzJGZ3IqZFs2ZzDWZzSmZ3JqZEY0JD%2Fzomd2hmevAmc3RkJ1mkHagCd4rmenUmeU2Ce8mEHu8me9EmZ7mme7FIHYxAC9dmfk8kBMeAF5amOfrGf%2Fnmgh9mVRRkF%2BFmg%2FImgECqXobmgkfAD%2BUkGDxqhGlqWCrqSFXqhGbqhIuqUAEqhBKqfITqiKgqUtimgDHqiBrqiMvqTLZoBL5qfMTqjOgqTCUmhNCAfepCjOzqkIjmhHvqjDxCkKUqkTHqQG1ADPgqkQtqkVEqQTxqlSTqlVbqlGQmlRxoueKClXDqm4nil1BgJPyqMYkqmbNqNZsoEaAqma9qmdOqMZsqgaaqkdbqn3Gik7%2BkD8lEHGMqnhGqnNaCS%2F3AKqH7RjoXaqMr4pJeZqIHKqI5aqbm4mpEKn4uqnpbaqa%2BIqQM6qZzqqaSqiqD6oqJaqqrqihdwqB6qqHVAqas6q6jYqpkKq7JKq7o6ipCKmXGapAC5q8IqipD6AXCKpHoQrMMqrMV6rECqrMuqq72KBL%2Bal6MarZ36pFXgq0iKB19wrdhaqdNard8arrRqmRjgrMJYrua6qugKpyOzruDaroTKATuAqJFQLYLqAfSqqnV5k%2Fk6ELHKr%2F1KqnWZrgHbAPtasAarkAirr2RAsAxrqdwJpxArsRPrqKGZqRebsZYKqhYrsBHrsZW6mlpgrAm7sCTbqKtZlCFbmuy6sv%2BEOgEKmQEvawcxK7N7SrOXSa3Vogc5q7N0agEOC5bycQfQKrRDW7Rt%2BazzqrRMSrQ927TASgJQW6dS66tTWbVXS6c8251Um6xP27U6%2BrUNKaVWS7ZkSp4phqxzqrZDSp4Cl6ZhuqRwy6Ry%2B6t6erdbmrdua7d8u6PciafSsreB26SDG6cQYLiHS6TcSa0zIKWA27gr%2Brjm6ZxqMLmUO6IJ2ZiXO5yZu7mOe5u%2Bap14ELqiK7gxoAUIa7qom7ozapusm6jscrqaC7sQ2qKtW7uvi7sq2qMoS6C267syCry0C7q3S7z9abyaKqjJq7z0Camj2ZYgCr2ce6ijGbB%2BMaj%2F1ruh4yoQftG73Yug38su6Pm846ud5QuR4pu%2B%2FWmrZwq%2BddC%2B7kuftqq11Vu%2FB2oBh4qZ1Mu%2B6Ku%2F0xkDWOC%2F4Hu%2BAuyfPWrA5ku%2FCay%2BAUqN%2F4vADxy9AcrAAFzBFlzAYLmODqzB26mQ0ysQEDC8ICyeGjnC67gGAXzCqZmQHBy23OvC2QnD3PqsLUzDn2nDbRsujKvDAxzDefq2QCybC9zDDfDDRdybwEutQ5zDSyyZTay3MxzFTHzBPQysUGzFh5nCEAarVczFsjkB9zi1YLzFYjyXE8AB%2FUutZ5zGvLmxpRuoYQzHp3mwbkzHaGzHaInHzVvHfNyZfvzGgYya%2F3Kcx9u7x4W8lZYbuUmKBsW4yJ%2FJtvkqpSUgyZNctNVKxJg8l8CZAZAruZ3cnjUbylmqyKPMlJ%2FsxOFiB5ycyme5ynFammCAyrDMogQMyrPsyrZ8yz5pm%2FnIysJYy76MmBqZAU0QCY6sxMUcl5%2BczMsMyM0cy7mczG47ttPclC36AdYspdiczUsJAl4KzU4Lzp4cwaycpd9szjQawd08zL3MziIpuyi7tc4rz2gpzldgs9p7z%2Fhslvp8pCIbz%2F9ckeIcmGiavwWtlQHtxAq90FhJyfJrBgQN0QWZuDSQnxRt0VkJAl5ZnjTQF3Ww0RztlPpcno7MyyVt0hHMoCn9yv8rTZK669LxCdMxPc%2BkS9MQadM3fZHLidI1XdE9HY%2FbbMrMPNQmOcXLzNNI7aTorMyi3NQzCcM2qrdMLdVWGsHOOpxXjdUCuc3kPJzE7NUwCdZQLdZCTdbdaNaRC89qbZJmTbdj%2FdYjuc3vKddpTdfPaNezXLd6XdcBqo%2Bfi6J%2FjdPm%2BKci3dWFHY4g4AKHPdiKvdjfuAErkI%2BI7aCSbZGUbdmf%2B495ndnISNn7fNevKc2gTY%2BiLdjN%2BZGmfdrymNqJWtqf7dq4uAEscKv%2B%2BMG0DY8aoMnn2dq7LY4akJKlm9izHdy0ONw9C9nHjdyyqAH9G9uJ7Nz1CN24Pd3UPY%2F%2Fyl3cmJ3d8tjby92cDSAHY6AB3i2PX%2BvGieLX5w2PNLut6p3Ekd3eufjecyzfzU3fqmjfeYzf%2Bi2O%2FA2f%2Fv3f4Njb8C3gR03gzjjc2xrbA67g3bjdDs7eEM6Nyo2yIY3dFb6Ntm2OxyrSwL3hx6gBLCCg8GrcIr6NJG7iaAri%2BZ3iALDiCJvh%2FgzjzagBMODhv1rjNr6MOK7jNB7iPV6LP87PND7fQ66KRe7EiY2xST7iKWnkKP7kyajcUr7TL57iF%2F7hrJ3lIq4BOoCvId3lVF7lYQ6wGa7SZQ7lKkna3b3muWjl76kDTQ7nxsjgGDDnIrvOdo6KFZuwsNnntU0D%2F6yLqhCZq4I%2Bi4m7tYGe6LXYqwyaA%2BYr5I7u5%2FeKsCMDkSNb6Yp%2B6ccqsk7O6ax6qPwMsXwu6gBgAV7pofK76aj%2BqQ4rcK0e6q9uqrFOvQrr6rXOinLMoLO%2B6664sVWNpCoL7KuolgiNpDh76qJOtDa51XcQtMZ%2BijyL4a0s7dNeiuldyVqc7aqYtT7LLneA5IkO7pEg6afs7alo7pK%2BuJQO7H%2Fe7smatupuitQZsu5O7%2FVOiouuLfO%2B7%2FYe69r77wDP7wIv6Q0w7vpe8ACQtyRM8Awfig5fuO%2B%2B6xPv7l6%2B4f2O8RFPrJpMwp7d8aFouSCv296et6ttByws8g2%2Flv%2Fqjbwsn7ium%2FEVLvOYS%2FMQ3rkDevMxf5uvqps4r%2BBG%2BqKyHfMyIKAvz%2BMMH5oczNws35ULmWKE3PHTmo7%2BiAZBT%2BBPGsxWX8Imn%2B1bD8q5%2BZFYH%2FP4qMvnWfYiP67WqfQFb7m%2FnfX%2F%2FbhdL59yr98JybpSLx88eff0fcRW%2F8h%2B396Ar6h6oPZUj8WBf%2FiDf94pvPeC3%2FNRv%2FiIH%2FE6n8WM3%2FNcANJ9kflrT7pSbycJru6Xn5sFMPreXviJgvpg%2F9TWmayN792de6YZ7vkdj8eQMOZ9L%2FkYAGFjHvIdv8arHvrbuwEiL%2FxmHNRP75W6TOzkLugc4AL7jMhqTvXSP8f%2BWB7z18%2Fk2f%2F5y92tz9%2FncF%2B4lb%2F0mvyji4sGl%2Bz92M%2F60265f8v7Rh3%2Bdg7%2Fchr72Q2ctN%2FKcx3x%2Bg8QTCL5eNDADpgQABQuZNjQ4UOIESVOpFjR4kWMGTVu5NjR40eQIUNuiHEFg0AaDx7gGZNQ5EuYMWXOpFnT5k2cEEmaRBJphko9LXMOJVrU6FGkSUXuPOnzAQQ9alwqpVrV6lWsWSmCiKHlg0CCD4JO1VrW7Fm0aTly9fI1UsqVZMiqpVvX7l2qIGi0FTijgFi5eAUPJlw4pN62Pf0CnmvY8WPIhdl%2B6AnXjtDImTVvPssVS4YpA1VebszZ9GnUNtmCFv3%2BgHRq2LFlg0ScAWXBOphn7%2Bbd2yGIHV5sv8Wt2%2Fdx5KmBf65cvHRy6NEly2BOvEHu59K1b08LgjqG5g%2BwcydfHq33z02Iizdu3v17pOhZ%2F2SfHf59%2FDHlh6Y%2FPv9%2FAGGSTz368EAoQAQTXCuGz%2FhTyUD7FJRwQgBWc3Cl9ijUcMLJLmQpwg1DvK9Dp8TKUEQU8SNJuAvHSvHF%2F0j6TIn1giIBRhzhm4xGuGzM8cfydizRRSCLlM7CEj80csnkJiPwwROZlFK5GNpSz7Iop9RyMxLDem1LME9DMiz%2FwjQzszH%2FKvNMNg1Ls74245SsStbIzFJOPM0CYYUGW1szT0D%2Fz9qAzzoTgDNQRM3SYIUrWLvB0D8TlZSqRRsNzQdI75x005yYAms0TTkVlSamesIUAjvQAHFUVl%2FSoCTwInkU1cBatdWmV0361LVQb%2FV1Iw1oaDS8L381NqRgG72N11WPdVaiYLUYzsten7XWoWinBbXZa7sFIFtTcTvQW3KhFTaDygq4btxy222IAliXLdZdeieId7156W3XXl1by1ffcoVtilpuAb412YG3NdjdZIfDsuCFWW2YCUkIjrjcbCl%2B%2BGJyX5UWJXUj5fhYj9H1KeQxQBi5Ww1g%2BPgtNatdmdOWX4ZL5JkPdtlhlXDOuVWPP7gyZoh%2FDjRat2gg2miS%2FmnwCuRDmfZ1YpijltpWhJeto9arbd2ghn5TorXortvcYIewn7KD67JH%2FdqkKNbbmuy2zXwbg7hvlrlus2moAu%2BKC5Jjb77PJOnvuAm6ju3CJT0cbz%2FVEKFxTrmCeyAIXCNjcson1QvuwHnlvPNEP4c8pesIJ31K0%2FN2bvXSBXadWdgRvXv2f2s3G%2BzTQd1Ad0DP7jcsPBgHnk3hYw1Lj82Px3MDGrhQ%2FsHmnY8z1%2Bmttt5M7MOrowsPtm%2Bz%2B6q%2FD1%2F8M8lXWnv0tWyZp6qLH739Ld9vav2o5qd%2FSg1Y0LViNanhfPtzHwu0cL%2B%2F4EEqBKyfAREoljXQjYET6t8B%2FqGWvwnyz4HLwmAGmUQSCxKHAfLz4AerdL8HjHAM%2BithjjyGQhWysIUw6t%2F%2FlNaAoMhwhimqIQZCc0Mi7dCFLmuKXxqgJCEOUTi3OaLqkvifV7Xlh0Bx4hPxE8UPTNFEErTie7CoRQh18UVR9OF6wihGFLXMC2WkQQNoh0YRRZE1bXwjHDf0RXxV0Y7kwaMOFLZHDckxNH7EEBcBKZ0X%2FtCNxTPkIaFjvx%2F%2BRQ%2BqciQFiRhJsVCykgoq2RQksT47LHCTCULS%2BuogylEGqJRqMl4qR9SVpPWsla58DwhjyT5aerEkPHsAHPSYS97k6pa%2BbCQwY2OBXS6LmMbEDzLT%2FsYAXw6Qme5xZqxSAs0x%2FG6a76lmeJa5TWrCypu%2FBCdq1KeSb5aTj%2BJcDxzYpc7tvLA5DXBnMeGJpr1YswENcEMXtHlP7dSmJzpwYz0Bup3JoKQBEIgDOQ8amRVl0ScLbeiNHhqdFc3HjRW9KEbpNEh1NdSeHSUMkgjaSzBIk6S9QVIOGPCAhqp0pbvJaGhcisuZxqamJfJZTlGzAf8NZwb77KlPTQNUZUkiB0R1qFHvUsGvKJWpI3WqWqCq0NRRtapoqZlbTlqHd27VnC6L6lfBJ9bYXFUSOghZFjSAVtj0MFwFgIMRKADX1MhTVgkogBuMgNe8wpJifinAGn4A%2F1hzClYShDUsYk8TNI09oABqOKxjOWO%2FKGBCaZOtrGU1g1lMDJWznt0MZhfbgNGSNjP2G%2BwABkBZ1a42Bn9DwmJdC9vYQuZVfzvCWhvAANzm1jHY6y1BgNtZ4RaGuIFrQHCTW1JYFbcgavDBc90UXeZS17pzOqB0m1vd7Q4mBF0BzyehpNXw3oRqFkvvU88VLoM0tb05oRpckDhfujQsPPfFb1r06y%2F59rcmyaKMaNaFXgHDJFcmA2WAEyyTc9bxwWaJAROyl7sJW4VfCZNwhrGy4XB12MNWIR97R4wV7MnLwSf%2BCPa0iGEWH8XFeURwjDWy4L4szcZVqZnJZjAA9v6obMeU2hnUijpk9cJAWXJbMZIxAlm5zdLJOIGyKaU8ZVw5LWk6xnJR%2FmvKJnd5IvVFWY3FDJGsle%2FKZ46JBnSwZKWNjc1DcTOc1bbmOYvkcxm4Us%2FCnOeG7NmTYDYzoBXiYgA2YHCFNrTlMKAeH6hLDng2tEcc3WfxVK%2FSM5mxlzS9af0IzJMmBrWARG2dI5f6xueKZFZVrZ8385nGr1Ywq2dNa5EgbIrxZTSg68xhRuJazzTAQvaCLWzaCCxctNIhsp98Lzv1Os8pto4cwursG%2B9SMWXGtkcWvG0Rd%2Fsi9lMM9aQ9Z9ZGggdADuW52VzBk0hi3eJBpbgzAm%2BK6f%2BA3fW297g3ONGV8LvfFcH3kCQ38Hv%2Fmz5RKQHCn71GJvLX4WOmU2QLAOOJN0QDLrCgeZvo7jMXHHUSzzia%2F31DkpccW0TMMQ7%2FvOmaFVFdQVQ5mqt0S5rXHFs312LOdc4QPNIgc3q49s8PfcIpourllQ76QjFec0G%2BxelLN3TQ1UZ1X%2FM8En5UOsjF3MenpNzondy6G5nn9S73WJGMMfpDYo5JBaIdy1w54KD%2F0u62%2F6Yrc7y7wNtOd4laWe5TrjIrB%2B9kYS5r0XnXeEluKVLGAz2Z64F85I%2B%2B5KHScwxvtfy32DnUXo5Bpm0nH%2Bhj2nnPw48%2Blbd8hFkf%2BQhHE%2FX%2Bem0jPVM6e%2FJWZp%2FuHL3REaPPB%2FTz8EgOwV4cVtAuDH%2FIiEkaRVeI%2Boj2xfkWtfxOTT8G6kd%2BRWzcaNF9%2F9Gyw9T7P1%2BNQmGK9TwjqT%2Fon7Mty%2B3qzu%2FENh5PdcaROn9C1n%2FiSC3wV9nPZv7TPfEYP52zpXxzI7BSvh3bACUrKwQkQKjzn%2F5DwCzovZ8jt7KjpyS4q87DQIIqLOSCvQYcLNRqLNy7gqiCgX0ywQ4cwdNKrRZEwSnAhA90LtiDlRkULRtkvBSzrdcaAtRLPcoIrdsCwhMsrx8DLiPsQHGyLSUMwuXKAQf4riB0tN7igekCr86zwuzSQsvjQsXRLtT%2FA0OVEMMtzD0DM8MvJKKB2ic1FEGesC1%2BCkEeVDIkBDI4oMO8AwE7rK0f6yU9%2FLsm%2FMM8DMLxOqDaWh83CMTvsyE3ekPG24kPyCw6gsS8sxfE0ay%2FsMS2u4DZwoAl%2BKRH9MLIE4EeaItQrERSZDxTbIvMqsEgCMLbwQQfQC01iEXU44DgmERatEVG%2FLkNkAG40SzJKkTUu4AaWKMoMK8BMMb4%2B7yCcMbqc7wlcAp6wsVnRMFQpA84wMbqkwGvWMafuEZZrIEDyqyfaEZv1D5zvAB0fAB1lEVYoUR43MG8E4EY4AJeTInX%2BkWdczTXGQC%2FksfLQZ2BHMN8xBtiFMi%2F%2F0JIfQxINWjIM3zIhbTHtsNHiuRHizQ6jNxHN%2FTHmsNIDDgCqXuAjfw5DkjIuCGkk9S5lJSeVyxDkFS5l1RIlpzJkqvJmDTJdWQ8naTBMuzJvHtJXjwpTuTIZNzHv3CDJfzCpJxBRWzKyAOBp%2FykpZRKxvMOKbLK4MNJ%2B%2BM5rlxEedxKRfTK%2FeM5TezKscyitBRL6EPLG3LLM4Q4WlQJufxCGeCLulRL1BOBpGQCWlxKs3Q4fEwMTZzDKrw5wIxLrNzDE1pMdWHKxFwjJDhMyXxL4UjEqwxCXRSDD1iCwETMXNwBzwTNSJtDzrM8ESDNzwzNuyxF1jyCwOTLzltNz%2F%2FsrbIMQlO8zbYcTIQzgR64TasUzc4zgSJggw%2FAzcj0zYEzzjf4ACJgrtdkvBVggufsgdCZzrxjFDr4ABwYTu00ugngTu%2B0yr5iTnsbzyugAxP4zs0Kz58bTyxgz%2B9UHPjUOXvxAjxoz7okzsizlzDYA%2F6sRRA8xhUQAwHFgUw4qfusOQuQgTIQ0BhY0BVET3GzANLczxjoTxb8T9IUUBnoxeay0G6zFwRtTwqFwcjzxBPFARr0ReiTgRMlgkwgrKP8x%2BBkzyjYBBV8ADQgUWy7ACJgAzEwATTgBKF7AMNKzT1EgSVggyX4ADz4BKGjwi80gTBYgxUoAUag0gIoADT%2F8AEmFU8Q0IEw%2BIEUAANK%2BIQfgAAIIIMf4EDfmAA6nYCFkFOlsFOQwFOLqFM0G1OGoAAK8NNA1QA%2BfQhBTVRFTdQJGFRH1QANaFRJHdQ6pVMLoABIrdRK1QALsFM6hVRQBdVP5VRStQBOtQBUTVUL2IANUFVVnYBVvQBX7dRU%2FR0LAIENAAEQmAANKNMu0IESAIMuDYU4WwMjQIEQCIENSNZk1VVdDQERiFYRSFZpZdZoBQForVYR8ABu9QBWZVVmZVUPCIFxZVZzzVVsNVdqldZrRddv3QB2lVYTmFcUMAER4AARGIFoJddu7dZ1jdYSiFd2RQGCZdcSKIETSNgT%2FwhYaT1YEyBYFDhYhEXYhD3YhIVYjI3YEkCBFOhYjyXYj%2BXYFMDYjgVZjz3ZkBXZEzDZjIXYlDVZFkBZj2UBmk0BmqVZkGWBnG1ZnkWBFViBjP1ZoR3ZkSXYFWCBo%2F3ZjhVapm1ap3Xam41apG3am12BGNiBGtiBHTjaGXCCJAABH2CEURgFYj2AwjICGmCBGVBbGqCBGYABuIWBGJjbuW1bu73ZGUhbFoABqbVbv50BwM1btw1cwSXcuIUBv01cxU3cGsharM3aHugBIpjcHtDayn1cv%2FUBzfWBHfgBzyUCz%2FVcrd2BySUCIzAC0C3d0j1dI%2FjcH1DdJYhd1k0C1P9VXda9XdpFXSOIXd693SXI3dPlXd6lXeEt3iW4Xd8V3t29XSdoXuSd3SQwXuXd3eMN3ue93uuN3SLY3uKNXtml3iUogvAN3u%2BV3uIVX%2FE93iIwgvU13fXdXvgVXid4Ai3ogi8Igy5Ygh8Agx9omT4IhU8YBVEQugDwq%2BbNAgRO4CyogirIAi3QAgZ%2B4C54YC1QYASm4ApG4Al%2BYAvuYA%2F%2BYAZWYAzuAhIm4REmYS%2FQAi8IAzEQgzB4YS%2BI4RKeYfv9Ahv%2BAjLIYR0mgxfu4TAggzIoAx8eYiJ%2B4RwO4iDeYSLO4R5mYiPeYR5u4ij%2B4SLugiLGXxrO4hKuXy3eYAxTzuAvpuAJXmAHDmEEroLmfYInaF42doIqUOM1ZmM4nmMGZmMGvuM7hmM3ZmA1xmM%2F5uM5juM1ll8n4F04jmArLoM1YIMyWGMYGIAf6NKxFQVRCAgAOw%3D%3D";

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON; 

//logit ("+++ STARTUP: "+ document.URL);

var GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));

if (document.URL.search(/apps.facebook.com\/kingdomsofcamelot/i) >= 0){
  facebookInstance ();
  return;
}


/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
  function setWide (){
    var iFrame = null;
    var e = document.getElementById('app_content_130402594779');
	if(e){
		e = e.firstChild.firstChild;
		for (var c=0; c<e.childNodes.length; c++){
		  if (e.childNodes[c].tagName=='SPAN' && e.childNodes[c].firstChild.className == 'canvas_iframe_util'){
			iFrame = e.childNodes[c].firstChild; 
			break;
		  }
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
    if (!iFrame){
      setTimeout (setWide, 1000);
      return;
    }
    try{    
      document.getElementById('sidebar_ads').parentNode.removeChild(document.getElementById('sidebar_ads'));
      document.getElementById('canvas_nav_content').parentNode.removeChild(document.getElementById('canvas_nav_content'));
    } catch (e){
      // toolkit may have removed them already!
    }
    var e = document.getElementById('content');
    document.getElementById('content').style.minWidth = '1220px';
	for(i=0; i<e.childNodes.length; i++){
		if(e.childNodes[i].firstChild){
			e.childNodes[i].style.width = '100%';
			e.childNodes[i].style.margin = '0';
			e.childNodes[i].firstChild.style.width = '100%';
			break;
		}
	}
	iFrame.style.width = '100%';

    var div = searchDOM (document.getElementById('content'), 'node.tagName=="DIV" && node.className=="UIStandardFrame_Content"', 7);
    if (div)
      div.style.width ='100%';
    var div = searchDOM (document.getElementById('content'), 'node.tagName=="DIV" && node.className.indexOf("SidebarAds")>=0', 7);
    if (div)
      div.style.display ='none';
    
  }
  facebookWatchdog();
  if (GlobalOptions.pbWideScreen)
    setWide();
}



var Options = {
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  wildType     : 1,
  unownedOnly  : true,
  mistedOnly   : true,
  hostileOnly  : false,  
  minmight     : 1,
  pbWinIsOpen  : false,
  pbWinDrag    : true,
  pbWinPos     : {},
  pbTrackOpen  : true,
  pbKillFairie : false,
  pbGoldHappy  : 95,
  pbGoldEnable : false,
  pbEveryEnable: false,
  pbEveryMins  : 30,
  pbChatOnRight: false,
  pbWideMap    : false,
  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, minTroops:10000, spamLimit:10, lastAttack:0 },
  alertSound   : {enabled:false, soundUrl:DEFAULT_ALERT_SOUND_URL, repeat:true, playLength:20, repeatDelay:0.5, volume:100, alarmActive:false, expireTime:0},
  spamconfig   : {aspam:false, spamvert:'Join my Alliance!!', spammins:'10', atime:2 , spamstate:'a'},
  giftDomains  : {valid:false, list:{}},
  giftDelete   : 'e',
  currentTab   : null,
  hideOnGoto   : true,
  transportinterval : 60,
  minwagons		:100,
  lasttransport:0,
};
//unsafeWindow.pt_Options=Options;

var GlobalOptions = {
  pbWatchdog   : false,
  pbWideScreen : true,
};

var Cities = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var mainPop;
var pbStartupTimer = null;
var CPopUpTopClass = 'pbPopTop';
var firefoxVersion = getFirefoxVersion();


function pbStartup (){
  clearTimeout (pbStartupTimer);
  if (unsafeWindow.pbLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    pbStartupTimer = setTimeout (pbStartup, 1000);
    return;
  }
  unsafeWindow.pbLoaded = true;
  logit ("KofC client version: "+ anticd.getKOCversion());
  
  Seed = unsafeWindow.seed;
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    table.pbTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .hostile td { background:red; }.friendly td{background:lightgreen; }.ally td{background:lightblue; }\
	  table.pbTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.pbTabBR tr td {border:none; background:none;}\
    table.pbTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.pbOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
    table.pbTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .pbDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
    .pbStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {border-size:3px; border-color:#000;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    input.pbDefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
    input.pbDefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
    a.ptButton20 {color:#ffff80}\
    table.pbMainTab {empty-cells:show; margin-top:5px }\
    table.pbMainTab tr td a {color:inherit }\
    table.pbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.pbMainTab tr td.spacer {padding: 0px 4px;}\
    table.pbMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed;}\
    table.pbMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#00a044; color:white; border-color:black;}\
    tr.pbPopTop td { background-color:#ded; border:none; height: 21px;  padding:0px; }\
    tr.pbretry_pbPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px;}\
    .CPopup  {border:3px ridge #666}\
    span.pbTextFriendly {color: #080}\
    span.pbTextHostile {color: #800}\
    div.indent25 {padding-left:25px}';
    
  window.name = 'PT';
  logit ("* KOC Power Bot v"+ Version +" Loaded");
  readOptions();
  readGlobalOptions ();
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.pbWinPos==null || Options.pbWinPos.x==null|| Options.pbWinPos.x=='' || isNaN(Options.pbWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    Options.pbWinPos.y = c.y+c.height;
    saveOptions ();
  }
  mainPop = new CPopup ('pb', Options.pbWinPos.x, Options.pbWinPos.y, 750,600, Options.pbWinDrag, 
      function (){
        tabManager.hideTab();
        Options.pbWinIsOpen=false; 
        saveOptions()
      });
  mainPop.autoHeight (true);  

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  tabManager.init (mainPop.getMainDiv());
  actionLog ("KOC Power Bot v"+ Version +" Loaded  (KofC version: "+ anticd.getKOCversion() +")");
  
  FairieKiller.init (Options.pbKillFairie);
  RefreshEvery.init ();
  SpamEvery.init ();
  CollectGold.init();
  if (Options.pbWinIsOpen && Options.pbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  exportToKOCattack.init();
  AddMainTabLink('BOT', eventHideShow, mouseMainTab);
  kocWatchdog ();
  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  WideScreen.useWideMap (Options.pbWideMap);
}

/****************************  Tower Tab  ******************************/
Tabs.tower = {
  tabOrder: 1,
  tabLabel: 'Tower',
  myDiv: null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  secondTimer : null,
  soundPlaying : false,
  defMode : {},  
  soundRepeatTimer : null,
  soundStopTimer : null,
  towerMarches: [],

  init: function(div){
	  var t = Tabs.tower;
    t.myDiv = div;
    
    if (GM_getValue ('towerMarches_'+getServerId()) != null)
      GM_deleteValue ('towerMarches_'+getServerId());   // remove deprecated data if it exists
    t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
    unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;
 
    var m = '<DIV class=pbStat>TOWER ALERTS</div><TABLE class=pbTab><TR align=center>';

	  for (var i=0; i<Cities.cities.length; i++)
      m += '<TD width=95><SPAN id=pbtacity_'+ i +'>' + Cities.cities[i].name + '</span></td>';
    m += '</tr><TR align=center>';
	  for (var cityId in Cities.byID)
		m += '<TD><INPUT type=submit id=pbtabut_'+ cityId +' value=""></td>';
	m += '</tr><TR align=center>';
	  for (var cityId in Cities.byID)
	   m += '<TD><CENTER><INPUT id=pbattackqueue_' + cityId + ' type=submit value="A 0 | S 0"></center></td>';
    m += '</tr></table><BR><DIV><CENTER><INPUT id=pbSoundStop type=submit value="Stop Sound Alert"></center></div><DIV id=pbSwfPlayer></div>';
    m += '<BR><DIV class=pbStat>CONFIGURATION</div><TABLE class=pbTab>\
        <TR><TD><INPUT id=pbalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Automatically post incoming attacks to alliance chat.</td></tr>\
        <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>Message Prefix: &nbsp; </td><TD><INPUT id=pbalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
            <TR><TD align=right>Alert on scouting: &nbsp; </td><TD><INPUT id=pbalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Alert on wild attack: &nbsp; </td><TD><INPUT id=pbalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Minimum # of troops: &nbsp; </td><TD><INPUT id=pbalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> &nbsp; &nbsp; <span id=pbalerterr></span></td></tr>\
            </table></td></tr>\
        <TR><TD><BR></td></tr>\
        <TR><TD><INPUT id=pbSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD>Play sound on incoming attack/scout</td></tr>\
        <TR><TD></td><TD><DIV id=pbLoadingSwf>Loading SWF player</div><DIV style="display:none" id=pbSoundOpts><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>Sound file: &nbsp; </td><TD><INPUT id=pbsoundFile type=text size=55 maxlength=160 value="'+ Options.alertSound.soundUrl +'" \>\
             &nbsp; </td><TD><INPUT id=pbSoundLoad type=submit value=Load><INPUT id=pbSoundDefault type=submit value=Default></td></tr>\
            <TR><TD align=right>Volume: &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pbTab><TR valign=middle><TD><SPAN id=pbVolSlider></span></td><TD width=15></td><TD align=right id=pbVolOut>0</td></td></table></td><TD align=center><SPAN id=pbLoadStat>xx</span></td></tr>\
            <TR><TD align=right><INPUT id=pbSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD> Repeat every <INPUT id=pbSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> minutes</td></tr>\
            <TR><TD></td><TD>Play for <INPUT id=pbSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> seconds</td></tr>\
            <TR><TD></td><TD><INPUT type=submit value="Play Now" id=pbPlayNow></td></tr></table></div></td></tr>\
        </table><BR>';
  	t.myDiv.innerHTML = m;

//    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:36, width:340}, t.e_swfLoaded, 'debug=y'); 
    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:0, width:0}, t.e_swfLoaded, 'debug=n'); 
    t.mss.swfDebug = function (m){ logit ('SWF: '+ m)};
    t.mss.swfPlayComplete = t.e_soundFinished;
    t.mss.swfLoadComplete = t.e_soundFileLoaded;
    unsafeWindow.matSimpleSound01 = t.mss;   // let swf find it

    t.volSlider = new SliderBar (document.getElementById('pbVolSlider'), 200, 21, 0);
    t.volSlider.setChangeListener(t.e_volChanged);
    document.getElementById('pbPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
    document.getElementById('pbSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
    document.getElementById('pbSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked}, false);
    document.getElementById('pbSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value}, false);
    document.getElementById('pbSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value}, false);
    document.getElementById('pbSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked}, false);
    document.getElementById('pbSoundStop').disabled = true;
    document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertScout').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbsoundFile').addEventListener ('change', function (){
        Options.alertSound.soundUrl = document.getElementById('pbsoundFile').value;
        t.loadUrl (Options.alertSound.soundUrl);
      }, false);
    document.getElementById('pbSoundDefault').addEventListener ('click', function (){
        document.getElementById('pbsoundFile').value = DEFAULT_ALERT_SOUND_URL;
        Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL;
        t.loadUrl (DEFAULT_ALERT_SOUND_URL);
      }, false);

    for (var cityId in Cities.byID){
  	  var but = document.getElementById ('pbtabut_'+ cityId);
  	  addListener (but, cityId);
  	  t.defMode[cityId] =  parseInt(Seed.citystats["city" + cityId].gate);
  	  t.displayDefMode (cityId); 
	  var btnNameT = 'pbattackqueue_' + cityId;
      addTowerEventListener(cityId, btnNameT);
	  }
    function addListener (but, i){
      but.addEventListener ('click', function (){t.butToggleDefMode(i)}, false);
    }
	function addTowerEventListener(cityId, name){
        document.getElementById(name).addEventListener('click', function(){
            t.showTowerIncoming(cityId);
        }, false);
    }	
    setInterval (t.eachSecond, 2000); 
  },      

  show : function (){
  },
  
  hide : function (){
  },
 
  loadUrl : function (url){
    var t = Tabs.tower;
    t.mss.load (1, url, true);
    document.getElementById('pbLoadStat').innerHTML = 'Loading';
  },
      
  e_swfLoaded : function (){
    var t = Tabs.tower;
    document.getElementById('pbLoadingSwf').style.display = 'none';
    document.getElementById('pbSoundOpts').style.display = 'inline';
    t.volSlider.setValue (Options.alertSound.volume/100);
    t.loadUrl (Options.alertSound.soundUrl);
    setTimeout (function (){t.mss.setVolume (1, Options.alertSound.volume);}, 500);
    if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime())   
      t.soundTheAlert();
  },
  
  e_alertOptChanged : function (){
    var t = Tabs.tower;
    Options.alertConfig.aChat = document.getElementById('pbalertEnable').checked;
    Options.alertConfig.aPrefix=document.getElementById('pbalertPrefix').value;      
    Options.alertConfig.scouting=document.getElementById('pbalertScout').checked;      
    Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
    var mt = parseInt(document.getElementById('pbalertTroops').value);
    if (mt<1 || mt>120000){
      document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;
      document.getElementById('pbalerterr').innerHTML = '<font color=#600000><B>INVALID</b></font>';
      setTimeout (function (){document.getElementById('pbalerterr').innerHTML =''}, 2000);
      return;
    } 
    Options.alertConfig.minTroops = mt;
  },
  
  e_volChanged : function (val){
    var t = Tabs.tower;
    document.getElementById('pbVolOut').innerHTML = parseInt(val*100);
    Options.alertSound.volume = parseInt(val*100);
    t.mss.setVolume (1, Options.alertSound.volume);
  },
  
  butToggleDefMode : function (cityId){
    var t = Tabs.tower;
    var mode = 1;
    if (Seed.citystats["city" + cityId].gate != 0)
      mode = 0;
    t.ajaxSetDefMode (cityId, mode, function (newMode){
        t.defMode[cityId] = newMode;
        t.displayDefMode (cityId);
      });
  },
      
  displayDefMode : function (cityId){
    var t = Tabs.tower;
    var but = document.getElementById('pbtabut_'+ cityId);
    if (t.defMode[cityId]){
      but.className = 'pbDefButOn';
      but.value = 'Def = ON';  
    } else {
      but.className = 'pbDefButOff';
      but.value = 'Def = OFF';  
    }  
  },
    
  eachSecond : function (){
    var t = Tabs.tower;
	  for (var cityId in Cities.byID){
      if (Seed.citystats["city" + cityId].gate != t.defMode[cityId]){     // user changed def mode
        t.defMode[cityId] = Seed.citystats["city"+ cityId].gate;
        t.displayDefMode (cityId);
      }
    }
  	var now = unixTime();
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (var k in Seed.queue_atkinc){   // check each incoming march
        var m = Seed.queue_atkinc[k]; 
        if ((m.marchType==3 || m.marchType==4) && parseIntNan(m.arrivalTime)>now){
          if (m.departureTime > Options.alertConfig.lastAttack){
            Options.alertConfig.lastAttack = m.departureTime;  
            t.newIncoming (m); 
          }          
        }
      }
    }
//logit ("NOW="+ now + ' alarmActive='+ Options.alertSound.alarmActive + ' expireTime='+ Options.alertSound.expireTime);
    if (Options.alertSound.alarmActive && (now > Options.alertSound.expireTime))
      t.stopSoundAlerts(); 

        t.towerMarches = [];
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            t['attackCount_' + cId] = 0;
            t['scoutCount_' + cId] = 0;
        }
        if (matTypeof(Seed.queue_atkinc) != 'array') {
            for (var k in Seed.queue_atkinc) {
                var m = Seed.queue_atkinc[k];
                if ((m.marchType == 3 || m.marchType == 4) && parseIntNan(m.arrivalTime) > now) {
                    t.handleTowerData(m);

                }
            }
        }
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            document.getElementById('pbattackqueue_' + cId).value = 'A ' + t['attackCount_' + cId] + ' | S ' + t['scoutCount_' + cId];
        }

	  
  },   
  
  e_soundFinished : function (chan){ // called by SWF when sound finishes playing
    var t = Tabs.tower;
    if (chan != 1)
      return;
    if (!Options.alertSound.alarmActive){
      document.getElementById('pbSoundStop').disabled = true;
    }
  },

  e_soundFileLoaded : function (chan, isError){ // called by SWF when sound file finishes loading
    if (chan != 1)
      return;
    if (isError)  
      document.getElementById('pbLoadStat').innerHTML = 'Error!';
    else
      document.getElementById('pbLoadStat').innerHTML = 'Loaded';
  },  
  
  playSound : function (doRepeats){
    var t = Tabs.tower;
    document.getElementById('pbSoundStop').disabled = false;
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer);
    t.mss.play (1, 0);
    t.soundStopTimer = setTimeout (function(){t.mss.stop(1); t.e_soundFinished(1)}, Options.alertSound.playLength*1000);
    if (doRepeats && Options.alertSound.repeat)
      t.soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Options.alertSound.repeatDelay*60000);
    else
      Options.alertSound.alarmActive = false;
  },
        
  soundTheAlert : function (){
    var t = Tabs.tower;
    Options.alertSound.alarmActive = true;
    t.playSound(true);
  },
     
  stopSoundAlerts : function (){
    var t = Tabs.tower;
    t.mss.stop (1);
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer); 
    document.getElementById('pbSoundStop').disabled = true;
    Options.alertSound.alarmActive = false;
    Options.alertSound.expireTime = 0;
  },

  newIncoming : function (m){
    var t = Tabs.tower;
    var now = unixTime();
    if (Options.alertConfig.aChat)
      t.postToChat (m);
    if (Options.alertSound.enabled){
      t.soundTheAlert(m);
      if (m.arrivalTime > Options.alertSound.expireTime)
        Options.alertSound.expireTime = m.arrivalTime;
    }
  },

  ajaxSetDefMode : function (cityId, state, notify){
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cityId;
		params.state = state;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					Seed.citystats["city" + cityId].gate = state;
					notify (state);
				} 
			},
			onFailure: function () {
			}
		})
  },
  
  onUnload : function (){
  },
    
  postToChat : function (m){
    var t = Tabs.tower;
    if (DEBUG_TRACE) logit ("checkTower(): INCOMING at "+ unixTime()  +": \n"+ inspect (m, 8, 1));
    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv ("Incoming!<BR><PRE style='margin:0px;'>" + inspect (m, 8, 1) +'</pre>');
    if (m.marchType == 3){
      if (!Options.alertConfig.scouting)
        return;
      atkType = 'scouted';
    } else if (m.marchType == 4){
      atkType = 'attacked';
    } else {
      return;
    }
    var target, atkType, who;
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      target = 'city at '+ city.x +','+ city.y;
    else {
      if (!Options.alertConfig.wilds)
        return;
      target = 'wilderness';
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' at '+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      who = Seed.players['u'+m.pid].n;
    else if (m.players && m.players['u'+m.pid])
      who = m.players['u'+m.pid].n;
    else
      who = 'Unknown';
  
    if (m.fromXCoord)
      who += ' at '+ m.fromXCoord +','+ m.fromYCoord;
    var msg = Options.alertConfig.aPrefix +' ';
    msg += 'My '+ target +' is being '+ atkType  +' by '+ who +'. Incoming Troops (arriving in '+
        unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';
    var totTroops = 0;
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      msg += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
      totTroops += m.unts[k];
    }
    if (totTroops < Options.alertConfig.minTroops)
      return;
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){ 
            --availSlots;
          }
        }
        msg += ' My embassy has '+ availSlots +' of '+ emb.maxLevel +' slots available.';
        if (t.defMode[m.toCityId] == 0)
        {
            msg+= ' My troops are HIDING!';
        }
        if (t.defMode[m.toCityId] == 1)
        {
            msg+= ' My troops are DEFENDING!';
        }
      }
    }
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv (msg);
    if (SEND_ALERT_AS_WHISPER)
      sendChat ("/"+ Seed.player.name +' '+ msg);    // Whisper to myself
    else
      sendChat ("/a "+  msg);                        // Alliance chat
  },
      handleTowerData: function(m){
        var t = Tabs.tower;
        var now = unixTime();
        var target, atkType, who, attackermight, allianceId, allianceName, diplomacy;
        var city = Cities.byID[m.toCityId];
        
        if (DEBUG_TRACE) 
            logit("checkTower(): INCOMING at " + unixTime() + ": \n" + inspect(m, 8, 1));
        
        //ATKTYPE
        if (m.marchType == 3) {
            atkType = 'scouted';
            t['scoutCount_' + m.toCityId]++;
        }
        else 
            if (m.marchType == 4) {
                atkType = 'attacked';
                t['attackCount_' + m.toCityId]++;
            }
            else {
                return;
            }
        //TARGET
        if (city.tileId == m.toTileId) 
            target = 'City at ' + city.x + ',' + city.y;
        else {
            target = 'Wilderness';
            for (k in Seed.wilderness['city' + m.toCityId]) {
                if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
                    target += ' at ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord;
                    break;
                }
            }
        }
        //CITYNAME
        var cityName = Cities.byID[m.toCityId].name;
        
        //TROOPS
        var units = [];
        for (i = 0; i < 13; i++) 
            units[i] = 0;
        for (k in m.unts) {
            var uid = parseInt(k.substr(1));
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Supply Troop') 
                units[1] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Militiaman') 
                units[2] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Scout') 
                units[3] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Pikeman') 
                units[4] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Swordsman') 
                units[5] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Archer') 
                units[6] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Cavalry') 
                units[7] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Heavy Cavalry') 
                units[8] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Supply Wagon') 
                units[9] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Ballista') 
                units[10] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Battering Ram') 
                units[11] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Catapult') 
                units[12] = m.unts[k];
        }
        //ATTACKERS INFORMATION
        if (Seed.players['u' + m.pid]) {
            who = Seed.players['u' + m.pid].n;
            attackermight = Seed.players['u' + m.pid].m;
            allianceId = Seed.players['u' + m.pid].a;
            allianceName = Seed.allianceNames[allianceId];
            diplomacy = getDiplomacy(allianceId);
        }
        else 
            if (m.players && m.players['u' + m.pid]) {
                who = m.players['u' + m.pid].n;
                attackermight = parseInt(m.players['u' + m.pid].m);
                allianceId = 'a' + m.players['u' + m.pid].a;
                allianceName = Seed.allianceNames[allianceId];
                diplomacy = getDiplomacy(allianceId);
            }
            else {
                who = 'n.A.';
                attackermight = 'n.A.';
                allianceId = 'n.A.';
                allianceName = 'n.A.';
                diplomacy = 'n.A.';
            }
		//SOURCE
        if (m.fromXCoord) 
            var source = m.fromXCoord + ',' + m.fromYCoord;
        else 
            var source = 'n.A.';
        
        var arrivingDatetime = new Date();
        arrivingDatetime.setTime(m.arrivalTime * 1000);
        var count = t.towerMarches.length + 1;
        t.towerMarches[count] = {
            added: now,
            cityId: m.toCityId,
            target: target,
            arrival: parseIntNan(m.arrivalTime),
            atkType: atkType,
            who: who,
            attackermight: attackermight,
            allianceName: allianceName,
            diplomacy: diplomacy,
            rtime: unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())),
            arrivingDatetime: arrivingDatetime,
			source:source,
            units: units,
        };
    },
    showTowerIncoming: function(cityId){
        var t = Tabs.tower;
        var popTowerIncoming = null;
        var cityName = Tabs.build.getCityNameById(cityId);
        
        if (t.popTowerIncoming == null) {
            t.popTowerIncoming = new CPopup('pbtower_' + cityId, 0, 0, 750, 500, true, function() {clearTimeout (t.timer);});
        }
        t.popTowerIncoming.show(false);
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityTowerContent">';
        t.popTowerIncoming.getMainDiv().innerHTML = '</table></div>' + m;
        t.popTowerIncoming.getTopDiv().innerHTML = '<TD width="200px"><B>Tower Report of ' + cityName + '</b></td></td>';
        t.addCityData2Pop(cityId);
        t.popTowerIncoming.show(true);
		clearTimeout (t.timer);
		t.timer = setTimeout (function() {t.showTowerIncoming(cityId)}, 5000);        
    },
    addCityData2Pop: function(cityId){
        var t = Tabs.tower;
        var rownum = 0;
        var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
        enc = {};
        numSlots = 0;
        var row = document.getElementById('pbCityTowerContent').innerHTML = "";
        if (matTypeof(Seed.queue_atkinc) != 'array') {
            for (k in Seed.queue_atkinc) {
                march = Seed.queue_atkinc[k];
                if (march.marchType == 2) {
                    ++numSlots;
                    city = march.toCityId;
                    from = march.fromPlayerId;
					if (!enc[city]) 
                        enc[city] = {};
                    if (!enc[city][from]) 
                        enc[city][from] = [];
                    k = [];
                    k[0] = parseInt(march.knightCombat);
                    for (i = 1; i < 13; i++) {
                        if (Options.encRemaining) 
                            k[i] = parseInt(march['unit' + i + 'Return']);
                        else 
                            k[i] = parseInt(march['unit' + i + 'Count']);
                    }
					k[14] = parseInt(march.marchStatus);
					var now = unixTime();
					k[15] = parseInt(march.destinationUnixTime) - now;
                    enc[city][from].push(k);
                }
            }
        }
        var s1 = '';
		var s2 = '';
		var s3 = '';
		var tot = [];
        var atk = [];
        for (i = 0; i < 13; i++) {
            tot[i] = 0;
            atk[i] = 0;
        }

            s1 += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;} .attack{background:#FF9999;} .own{background:#66FF66;}</style>';
            s1 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=center width=16%></td>';
            
            for (k = 0; k < names.length; k++) 
                s1 += '<TD width=7%><B>' + names[k] + '</b></td>';
            s1 += '</tr>';
            dest = cityId;
            if (enc[dest]) {
                for (p in enc[dest]) {
                    try {
                        player = Seed.players['u' + p].n;
                    } 
                    catch (err) {
                        player = '???';
                    }
                    for (m = 0; m < enc[dest][p].length; m++) {
                        /*knight = '';
                        if (enc[dest][p][m][0] > 0) 
                            knight = ' (' + enc[dest][p][m][0] + ')';
						*/
						status = '';
                        if (enc[dest][p][m][14] == 1) {
						    status = ' (' + timestr(enc[dest][p][m][15]) + ')';	
							if (enc[dest][p][m][15] < 0)
								status = ' (enc)';	
							else
								 status = ' (' + timestr(enc[dest][p][m][15]) + ')';	
						}
						if (enc[dest][p][m][14] == 2) {
						    status = ' (enc)';	
						}

                        s1 += '<TR align=right><TD align=left class="city">' + player + status +'</td>'
                        for (i = 1; i < 13; i++) {
                            num = enc[dest][p][m][i];
                            s1 += '<TD class="city">' + num + '</td>';
                            tot[i] += num;
                        }
                        //s1 += '<TD><INPUT id=sendhome_' + numSlots + ' type=submit value="Home" style="border:1px solid black; background-color:red;"></td></tr>';
                    }
                }
            } else {
                s1 += '<TR align=right><TD align=left class="city"><B>Reinforcment:</b></td>'
                for (i = 1; i < 13; i++) {
                    s1 += '<TD class="city">0</td>';
                }
                
            }
			s1 += '<TR align=right><TD colspan=14><BR></tr>';
            s1 += '<TR align=right><TD class="own" align=left><B>Own Troops:</b></td>';
            //OWNTROOPS
            var ownTroops = "";
            for (r = 1; r < 13; r++) {
                cityString = 'city' + cityId;
                num = parseInt(Seed.units[cityString]['unt' + r]);
                s1 += '<TD class="own">' + num + '</td>';
                tot[r] += num;
            }
            s1 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>Defenders:</b></td>';
            for (i = 1; i < 13; i++) 
                s1 += '<TD class="tot">' + tot[i] + '</td>';      
			s3 += '</tr></table>';
        
        s3 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>Incoming Attacks:</b></td>';
        
        var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
        if (t.towerMarches.length > 0) {
            for (k in t.towerMarches) {
                if (typeof t.towerMarches[k].atkType != 'undefined') {
                    if (t.towerMarches[k].cityId == cityId) {
                        s3 += '<TABLE cellspacing=0 width=100%><TR>';
                        
                        if (t.towerMarches[k].atkType == 'attacked') {
                            s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.jpg?6545"></b></td>';
                        }
                        else 
                            if (t.towerMarches[k].atkType == 'scouted') {
                                s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_30.jpg?6545"></b></td>';
                            }
                        s3 += '<TD width=15%  ><B>Location</b></td>';
                        s3 += '<TD width=15%  ><B>Name</b></td>';
						s3 += '<TD width=10%><B>Source: </b></td><TD width=10%>' + t.towerMarches[k].source + '</td>';
                        s3 += '<TD width=10%><B>Might: </b></td><TD width=10%>' + t.towerMarches[k].attackermight + '</td>';
                        s3 += '<TD width=10%><B>Alliance: </b></td><TD width=10%>' + t.towerMarches[k].allianceName + '</td>';
                        s3 += '<TD width=10%><B>State: </b></td><TD width=10%>' + t.towerMarches[k].diplomacy + '</td></tr>';
                        s3 += '<TR><TD width=10%  >' + t.towerMarches[k].target + '</td>';
                        s3 += '<TD  >' + t.towerMarches[k].who + '</td>';
                        s3 += '<TD><B>Remaining: </b></td><TD width=10%>' + t.towerMarches[k].rtime + '</td>';
                        s3 += '<TD><B>Arrival: </b></td><TD  colspan=5 width=10%>' + t.towerMarches[k].arrivingDatetime + '</td></tr>';
                        s3 += '</tr></table>';
                        s3 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%></td>';
                        for (n = 0; n < names.length; n++) 
                            s3 += '<TD width=7%><B>' + names[n] + '</b></td>';
                        s3 += '</tr><TR align=right><TD class="attack" align=left><B>Units:</td>';
                        for (u = 1; u < 13; u++) {
                            num = t.towerMarches[k].units[u];
                            s3 += '<TD class="attack">' + num + '</td>';
                            atk[u] += parseInt(num);
                        }
						s3 += '</tr></table>';
                    }
                }
                
            }
        }
		s2 += '<TR><TD colspan=14><BR></td></tr><TR align=right><TD class="attack" align=left><B>Attackers:</b></td>';
        for (a = 1; a < 13; a++) 
            s2 += '<TD class="attack" width=7%>' + atk[a] + '</td>';
		var html = s1 + s2 + s3;
        document.getElementById('pbCityTowerContent').innerHTML = html;

    },
    sendReinforcmentHome: function(){ //FUNCTION NOT IN USE YET BUT SOON :-)
        //mid, cid, fromUid, fromCid, upkeep
        var params = Object.clone(g_ajaxparams);
        params.mid = mid;
        params.cid = cid;
        params.fromUid = fromUid;
        params.fromCid = fromCid;
        new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function(transport){
                var rslt = eval("(" + transport.responseText + ")");
                if (rslt.ok) {
                    Modal.showAlert(g_js_strings.kickout_allies.troopshome);
                    seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;
                    Modal.hideModalAll();
                    if (parseInt(fromUid) == parseInt(tvuid)) {
                        var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];
                        var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));
                        curmarch.returnUnixTime = unixtime() + marchtime;
                        curmarch.marchStatus = 8
                    }
                    delete seed.queue_atkinc["m" + mid]
                }
                else {
                    Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                }
            },
            onFailure: function(){
            }
        })
    },
}


/****************************  Build Implementation  ******************************
 TODO:
	 visu directly in the game of build queue elements
	 <span class="leveltag" style="left:60px;">10</span>
	 more todos within the code
 */
Tabs.build = {
    tabOrder: 1,
    tabLabel: 'Build',
    myDiv: null,
    timer: null,
    buildTab: null,
    koc_buildslot: null,
    currentBuildMode: null,
    buildStates: [],
	loaded_bQ: [],
	lbQ: [],

    init: function(div){
        var t = Tabs.build;
        t.myDiv = div;
        t.koc_buildslot = unsafeWindow.buildslot; //save original koc function
        t.currentBuildMode = "build";
		t.buildStates = {
            running: false,
			help: false,
        };
        t.readBuildStates();
        
        for (var i = 0; i < Cities.cities.length; i++) {
            t["bQ_" + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, '[]'));
			if (typeof t["bQ_" + Cities.cities[i].id] == 'undefined' || (t["bQ_" + Cities.cities[i].id]) == "") {
				t["bQ_" + Cities.cities[i].id] = [];
			}
        }
        
        var m = '<DIV id=pbBuildDivF class=pbStat>BUILD FUNCTIONS</div><TABLE id=pbbuildfunctions width=100% height=0% class=pbTab><TR>';
        if (t.buildStates.running == false) {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = OFF"></td>';
        }
        else {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = ON"></td>';
        }
		m += '<TD><INPUT id=pbBuildMode type=submit value="Build Mode = OFF"></td>';
		m += '<TD>Build Type: <SELECT id="pbBuildType">\
				<OPTION value=build>level up</option>\
				<OPTION value=max>level max</option>\
				<OPTION value=destruct>destruct</option>\
				</select></td>';
		m += '<TD><INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>Ask for help?</td>';
		m += '</tr></table></div>';
        m += '<DIV id=pbBuildDivQ class=pbStat>BUILD QUEUES</div><TABLE id=pbbuildqueues width=100% height=0% class=ptentry><TR>';
		for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><B>' + Cities.cities[i].name + '</b></center></td>';
        }
		m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value="Show"></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD>Qc:</td><TD id=pbbuildcount_' + Cities.cities[i].id + '>' + t["bQ_" + Cities.cities[i].id].length + '</td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            t['totalTime_' + Cities.cities[i].id] = 0;
            cbQ = t["bQ_" + Cities.cities[i].id];
            if (typeof cbQ != 'undefined') {
                for (var j = 0; j < cbQ.length; j++) {
                    t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].id]) + parseInt(cbQ[j].buildingTime);
                }
                timestring = timestr(t['totalTime_' + Cities.cities[i].id]);
            }
            m += '<TD>Tt:</td><TD id=pbbuildtotal_' + Cities.cities[i].id + '>' + timestring + '</td>';
        }
        m += '</tr></table><SPAN class=boldRed id=pbbuildError></span>';
        t.myDiv.innerHTML = m;
        
        for (var i = 0; i < Cities.cities.length; i++) {
            var cityId = Cities.cities[i].id;
            var btnName = 'pbbuild_' + cityId;
            addQueueEventListener(cityId, btnName);
			t.showBuildQueue(cityId, false);
        }

        t.e_autoBuild(); //start checking if we can build someting
        
		document.getElementById('pbBuildType').addEventListener('change', function(){t.setBuildMode(this.value);}, false);
		document.getElementById('pbBuildRunning').addEventListener('click', function(){
            t.toggleStateRunning(this);
        }, false);
		document.getElementById('pbBuildMode').addEventListener('click', function(){
            t.toggleStateMode(this);
        }, false);
		document.getElementById('pbHelpRequest').addEventListener ('change', function (){
        t.buildStates.help = (document.getElementById('pbHelpRequest').checked);
        t.saveBuildStates();
        }, false);
   	    
		window.addEventListener('unload', t.onUnload, false);
        
        function addQueueEventListener(cityId, name){
            document.getElementById(name).addEventListener('click', function(){
                t.showBuildQueue(cityId, true);
            }, false);
        }
    },
	setBuildMode: function (type) {
	    var t = Tabs.build;
		t.currentBuildMode = type;
	},	
    e_autoBuild: function(){
      var t = Tabs.build;
	    document.getElementById('pbbuildError').innerHTML = '';
      if (t.buildStates.running == true) {
          var now = unixTime();
		  //logit ('Seed.queue_con: (now='+ now +')\n'+ inspect (Seed.queue_con, 3));
          for (var i = 0; i < Cities.cities.length; i++) {
              var cityId = Cities.cities[i].id;
              var isBusy = false;
              var qcon = Seed.queue_con["city" + cityId];
              if (matTypeof(qcon)=='array' && qcon.length>0) {
                if (parseInt(qcon[0][4]) > now)
                  isBusy = true;
                else
                  qcon.shift();   // remove expired build from queue        
              }              
			  //logit ('City #'+ (i+1) + ' : busy='+ isBusy);               
              if (isBusy) {
                  //TODO add info of remaining build time and queue infos
              } else {
                 if (t["bQ_" + cityId].length > 0) { // something to do?
                 	 var bQi = t["bQ_" + cityId][0];   //take first queue item to build
					 t.doOne(bQi);;
					 //setTimeout(t.e_autoBuild, 10000); //should be at least 10
					 //return; // we need to make sure that there is enough time for each ajax request to not overwrite the vaule that are needed by the next run
                 }
              }       	
            }
          }
		setTimeout(t.e_autoBuild, 10000); //should be at least 10
    },  
    doOne : function (bQi){ 
		var t = Tabs.build;
		var currentcityid = parseInt(bQi.cityId);
		var cityName = t.getCityNameById(currentcityid);
		var time = parseInt(bQi.buildingTime);
		var mult = parseInt(bQi.buildingMult);
		var attempt = parseInt(bQi.buildingAttempt);

		
		//mat/KOC Power Bot: 49 @ 19:41:45.274: Pos: 6 Type: 13 Level: 8 Id: 1523749
		
		var mode = bQi.buildingMode;
		//  var mode = "build"; //FOR DEBUG
		
		var citpos = parseInt(bQi.buildingPos);
		//  var citpos = 6; //FOR DEBUG
		
		if (Seed.buildings['city' + currentcityid]["pos" + citpos] != undefined && Seed.buildings['city' + currentcityid]["pos" + citpos][0] != undefined) {	
			var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
			var bdgid = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][0]);
			//  var bdgid = 13; //FOR DEBUG
			
			var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
			var curlvl = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][1]);
			//  var curlvl = 8; //FOR DEBUG

			var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
			var bid = parseInt(Seed.buildings["city" + currentcityid]["pos" + citpos][3]);
			//  var bid = 1523749; //FOR DEBUG
									
			if (curlvl > 8 && mode == 'build') { 
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Queue item deleted: Building Level equals 9 or higher!!!");
				return;
			};
			if (isNaN(curlvl)) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Found no correct value for current building!!!!");
				return;
			}
			if (l_bdgid != bdgid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Building Type does not match!!!!");
				return;
			}
			if (l_bid != bid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Building ID does not match!!!!");
				return;
			}
			if (l_curlvl < curlvl) {
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog("Queue item deleted: Buildinglevel is equal or higher!!!");
					return;
			}
			if (l_curlvl > curlvl && mode == 'build') {
					t.requeueQueueElement(bQi);
					return;
			}

			if (mode == 'destruct') {
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = currentcityid;
				params.bid = "";
				params.pos = citpos;
				params.lv = curlvl - 1;
				if (curlvl >= 1) {
					params.bid = bid;
				}
				params.type = bdgid;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/destruct.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function(rslt){
						if (rslt.ok) {
							actionLog("Destructing " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " at " + cityName);
							Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
							if (params.cid == unsafeWindow.currentcityid) 
								unsafeWindow.update_bdg();
							if (document.getElementById('pbHelpRequest').checked == true)
								t.bot_gethelp(params.bid, currentcityid);
							t.cancelQueueElement(0, currentcityid, time, false);
						} else {
							var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
							t.requeueQueueElement(bQi);
							document.getElementById('pbbuildError').innerHTML = errmsg;
							logit(errmsg);
						}
					},
					onFailure: function(){
						document.getElementById('pbbuildError').innerHTML = "Connection Error while destructing! Please try later again";
					}
				})
			}
			if (mode == 'build') {
				var invalid = false;
				var chk = unsafeWindow.checkreq("bdg", bdgid, curlvl); //check if all requirements are met
				for (var c = 0; c < chk[3].length; c++) {
					if (chk[3][c] == 0) {
						invalid = true;
					}
				}
				if (invalid == false) {							
					var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
					params.cid = currentcityid;
					params.bid = "";
					params.pos = citpos;
					params.lv = curlvl + 1;
					if (params.lv > 9){ //make sure that no level 10+ is built
						t.cancelQueueElement(0, currentcityid, time, false);
						actionLog("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!");
						return;
					}
					if (params.lv > 1) {
						params.bid = bid;
					}
					params.type = bdgid;
					
					new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/construct.php" + unsafeWindow.g_ajaxsuffix, {
						method: "post",
						parameters: params,
						onSuccess: function(rslt){
							if (rslt.ok) {
								actionLog("Building " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " Level " + params.lv + " at " + cityName);								
								Seed.resources["city" + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][1]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][2]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][3]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][4]) * mult * 3600;
								Seed.citystats["city" + currentcityid].gold[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][5]) * mult;
								Seed.queue_con["city" + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(),  unsafeWindow.unixtime() + time, 0, time, citpos]);						
								if (params.cid == unsafeWindow.currentcityid) 
									unsafeWindow.update_bdg();
								if (document.getElementById('pbHelpRequest').checked == true)
									t.bot_gethelp(params.bid, currentcityid);
								t.cancelQueueElement(0, currentcityid, time, false);
							} else {
								var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
								if (rslt.error_code == 103) { // building has already the target level => just  delete
									t.cancelQueueElement(0, currentcityid, time, false);
									actionLog("Queue item deleted: Building at this Level already exists or build process already started!");
								} else {
									t.requeueQueueElement(bQi);
									document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name +': '+ errmsg + " Item was requeued. Check for retry count.";
								}
								logit(errmsg);
							}
					},
						onFailure: function(){
							document.getElementById('pbbuildError').innerHTML = "Connection Error while building! Please try later again";
						}
					});
				} else {
					t.requeueQueueElement(bQi); // requeue item if check is invalid
				}
			}
		} else {
			t.cancelQueueElement(0, currentcityid, time, false);
			actionLog("Queue item deleted: Building does not exist!!!");
		}
	},
	requeueQueueElement: function (bQi) {
	    var t = Tabs.build;
		var cityId = bQi.cityId;
		var buildingPos = parseInt(bQi.buildingPos);
		var buildingId = parseInt(bQi.buildingId);
		var buildingLevel = parseInt(bQi.buildingLevel);
		var buildingType = parseInt(bQi.buildingType);
		var buildingTime = parseInt(bQi.buildingTime);
		var buildingMult = parseInt(bQi.buildingMult);
		var buildingAttempts = parseInt(bQi.buildingAttempts);
		var buildingMode = bQi.buildingMode;
		
		t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts + 1, buildingMult, buildingMode); // requeue item
		t.cancelQueueElement(0, cityId, buildingTime, false); // delete Queue Item
	},
    show: function(){
		var t = Tabs.build;
    },
    bot_buildslot: function(c, a){
        var t = Tabs.build;
		var cityId = t.getCurrentCityId();
        var buildingPos   = c.id.split("_")[1];
        var buildingType  = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][0]);
        var buildingLevel = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
		var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
		if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Type: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
  		var buildingAttempts = 0;
		var loaded_bQ = t["bQ_" + cityId];
		if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
			var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
		} else {
			var current_construction_pos = "";
		}
		if (loaded_bQ.length == 0 && current_construction_pos != "" ) { //check anyway if there is currently build in progess for this specific building
			if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
		} else {
			if (current_construction_pos != "" && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
			for (var i = 0; i < loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
				var loadedCity = loaded_bQ[i].cityId;
				var loadedSlot = loaded_bQ[i].buildingPos;
				if (loadedSlot == buildingPos && loadedCity == cityId) {
					buildingLevel += 1;
				}
				if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { // check if destrcution is already in queue
					t.modalmessage('Destruction already in Queue!');
					return;
				}
			}
		}
        if (t.currentBuildMode == "build") {
		    if (buildingLevel >= 9) {
                t.modalmessage('Due to building requirements (DI), buildings above level 9\nshould be manualy built.');
                return;
            }
            var buildingMode = "build";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
        if (t.currentBuildMode == "max") {
            var buildingMode = "build";
			for (var bL = buildingLevel; bL <9; bL++) {
				var queueId = loaded_bQ.length;
				var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
				var buildingMult = result[0];
				var buildingTime = result[1];
				queueId = queueId ;
				t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
				t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
			}
        }
        if (t.currentBuildMode == "destruct") {
            var buildingMode = "destruct";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }

    },
	calculateQueueValues: function (cityId, buildingLevel, buildingType, buildingMode) {
	    var t = Tabs.build;
		var now = unixTime();
		if (buildingMode == 'build') {
			var buildingMult = Math.pow(2, buildingLevel);
        } 
		if (buildingMode == 'destruct') {
			var buildingMult = Math.pow(2, buildingLevel - 2);
		}
				
		var knights = Seed.knights["city" + cityId];
		if (knights) {
			var polKniId = parseInt(Seed.leaders['city' + cityId].politicsKnightId);
			if (polKniId) {
				var polValue = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politics);
				var polBoost = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politicsBoostExpireUnixtime);
				if ((polBoost - now) > 0) {
					polValue = parseInt(polValue * 1.25);
				}
			} else {
				polValue = 0;
			}
		} else {
			polValue = 0;
		}
        
        var buildingTime = unsafeWindow.buildingcost["bdg" + buildingType][7] * buildingMult;
        if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
            buildingTime = 15;
        }
		if (buildingMode == 'build') {
			buildingTime = parseInt(buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16)));
        } 
		if (buildingMode == 'destruct') {
			buildingTime = buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16));
			if (buildingTime % 1 > 0) {
				buildingTime = parseInt(buildingTime);
			}
		}
		
		var result = new Array(buildingMult, buildingTime);
		return result;
	},
	bot_gethelp: function (f, currentcityid) {
	  var a = qlist = Seed.queue_con["city" + currentcityid];
	  var e = 0;
	  var d = 0;
	  for (var c = 0; c < a.length; c++) {
		if (parseInt(a[c][2]) == parseInt(f)) {
		  e = parseInt(a[c][0]);
		  d = parseInt(a[c][1]);
		  break
		}
	  }
	  var b = new Array();
	  b.push(["REPLACE_LeVeLbUiLdInG", d]);
	  b.push(["REPLACE_BuIlDiNgNaMe", unsafeWindow.buildingcost["bdg" + e][0]]);
	  b.push(["REPLACE_LeVeLiD", d]);
	  b.push(["REPLACE_AsSeTiD", f]);
	  var g = function(h, i) {
		unsafeWindow.continuation_95(h, i);
		if (!h) {
		  var j = d > 1 ? unsafeWindow.cm.SpeedUpType.upgrade : unsafeWindow.cm.SpeedUpType.build;
		  unsafeWindow.cm.ClientSideCookieManager.setCookie(j, false)
		}
	  };
	  unsafeWindow.common_postToProfile("95", unsafeWindow.Object.cloneFeed(unsafeWindow.template_data_95), unsafeWindow.Object.cloneFeed(unsafeWindow.actionlink_data_95), g, b)
	},
	addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
	var t = Tabs.build;
		var lbQ = t["bQ_" + cityId];
		lbQ.push({
            cityId: 			cityId,
            buildingPos:		buildingPos,
            buildingType: 		buildingType,
			buildingId: 		buildingId,
            buildingTime: 		buildingTime,
            buildingLevel: 		buildingLevel,
            buildingAttempts: 	buildingAttempts,
			buildingMult: 		buildingMult,
            buildingMode: 		buildingMode
        });
		t.modifyTotalTime(cityId, 'increase', buildingTime); //adjust total Time
	},
    modalmessage: function(message){
	    var t = Tabs.build;
        var timeout = 10000;
        var content = "autoclose after 10sec...<br><br>"
        content += message;
        unsafeWindow.Modal.showAlert(content);
        window.setTimeout('unsafeWindow.Modal.hideModal();', timeout);
    },
	modifyTotalTime: function (cityId, type, buildingTime) {
	    var t = Tabs.build;
		var element = document.getElementById('pbbuildcount_' + cityId);
		var currentCount = parseInt(element.innerHTML);
		if (type == "increase") {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] + buildingTime;
			var currentCount = currentCount + 1;
		}
		if (type == "decrease") {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] - buildingTime;
			var currentCount = currentCount - 1;
		}
		element.innerHTML = currentCount;
		document.getElementById('pbbuildtotal_' + cityId).innerHTML = timestr(t['totalTime_' + cityId]);
	},
    hide: function(){
        var t = Tabs.build;
		//unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
    },
    onUnload: function(){
        var t = Tabs.build;
        for (var i = 0; i < Cities.cities.length; i++) {
            //t["bQ_" + Cities.cities[i].id] = []; //clean up if needed
            GM_setValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, JSON2.stringify((t["bQ_" + Cities.cities[i].id])));
        }
        t.saveBuildStates();
    },
    _addTab: function(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode){
		var t = Tabs.build;
        var row = document.getElementById('pbCityQueueContent').insertRow(0);
        row.vAlign = 'top';
        row.insertCell(0).innerHTML = queueId;
        if (buildingMode == "destruct") {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_att.png">';
        }
        else {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_prod.png">';
        }
        row.insertCell(2).innerHTML = unsafeWindow.buildingcost['bdg' + buildingType][0];
        row.insertCell(3).innerHTML = timestr(buildingTime);
		if (buildingMode == "destruct") {
			row.insertCell(4).innerHTML = 0;
        } else {
			row.insertCell(4).innerHTML = buildingLevel + 1; // => target Level
		}
		row.insertCell(5).innerHTML = buildingAttempts;
        row.insertCell(6).innerHTML = '<a class="button20" id="queuecancel_' + queueId + '"><span>Cancel</span></a>';
        document.getElementById('queuecancel_' + queueId).addEventListener('click', function(){
            t.cancelQueueElement(queueId, cityId, buildingTime, true);
        }, false);
    },
    cancelQueueElement: function(queueId, cityId, buildingTime, showQueue){
        var t = Tabs.build;
        var queueId = parseInt(queueId);
        t["bQ_" + cityId].splice(queueId, 1);
        t.modifyTotalTime(cityId, 'decrease', buildingTime); //adjust total Time	
        
        if (showQueue == true) {
            t.showBuildQueue(cityId, false);
        }
    },
    showBuildQueue: function(cityId, focus){
	    var t = Tabs.build;
	    clearTimeout (t.timer);
        var popBuildQueue = null;
        var cityName = t.getCityNameById(cityId);
        if (t.popBuildQueue == null) {
            t.popBuildQueue = new CPopup('pbbuild_' + cityId, 0, 0, 350, 500, true, function() {clearTimeout (t.timer);});
        }
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityQueueContent">';       
        t.popBuildQueue.getMainDiv().innerHTML = '</table></div>' + m;
        t.popBuildQueue.getTopDiv().innerHTML = '<TD width="200px"><B>Build Queue of ' + cityName + '</b></td><TD><INPUT id=pbOptimizeByTime type=submit value="Optimize by Time"></td>';
        t.paintBuildQueue(cityId);
        if (focus)
          t.popBuildQueue.show(true);
		document.getElementById('pbOptimizeByTime').addEventListener('click', function(){t.clearBuildQueue();t.paintBuildQueue(cityId, true);}, false);
		t.timer = setTimeout (function() {t.showBuildQueue(cityId, false)}, 5000);  
	},
    paintBuildQueue: function(cityId, optimize){
        var t = Tabs.build;
        var lbQ = t["bQ_" + cityId];
		if (optimize == true) {
			lbQ.sort(function(a,b){return a.buildingTime - b.buildingTime});
		}
		t["bQ_" + cityId] = lbQ;
		for (var i = 0; i < lbQ.length; i++) {
			var queueId = i;
			t._addTab(queueId, lbQ[i].cityId, lbQ[i].buildingType, lbQ[i].buildingTime, lbQ[i].buildingLevel, lbQ[i].buildingAttempts, lbQ[i].buildingMode);
        }
    },
	clearBuildQueue: function() {
	    var t = Tabs.build;
		var table = document.getElementById('pbCityQueueContent');
		var rows = table.rows;
		while(rows.length) 
			table.deleteRow(rows.length-1);
	},
    getCurrentCityId: function(){ // TODO maybe move as global function to the core application
        if (!unsafeWindow.currentcityid) 
            return null;
        return unsafeWindow.currentcityid;
    },
    saveBuildStates: function(){
		var t = Tabs.build;
        var serverID = getServerId();
        GM_setValue('buildStates_' + serverID, JSON2.stringify(t.buildStates));
    },
    readBuildStates: function(){
        var t = Tabs.build;
        var serverID = getServerId();
        s = GM_getValue('buildStates_' + serverID);
        if (s != null) {
            states = JSON2.parse(s);
            for (k in states) 
                t.buildStates[k] = states[k];
        }
    },
    toggleStateRunning: function(obj){
		var t = Tabs.build;
        if (t.buildStates.running == true) {
            t.buildStates.running = false;
            t.saveBuildStates();
            obj.value = "Auto Build = OFF";
        }
        else {
            t.buildStates.running = true;
            t.saveBuildStates();
            obj.value = "Auto Build = ON";
        }
    },
    toggleStateMode: function(obj){
		var t = Tabs.build;
        if (obj.value == 'Build Mode = OFF') {
			unsafeWindow.buildslot = t.bot_buildslot; // overwrite original koc function
            obj.value = "Build Mode = ON";
        }
        else {
			unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
			obj.value = "Build Mode = OFF";
        }
    },
	getCityNameById: function (cityId) {
    return Cities.byID[cityId].name;  	
	},
}


/********************************* Search Tab *************************************/

/***
TODO: Better search algorithm (circular OR square, always start at center, working outwards) 
        Should be separate class (producer/consumer) so auto attack can use it too
**/

Tabs.Search = {
  tabOrder : 2,
  myDiv : null,
  MapAjax : new CMapAjax(),
  MAX_SHOW_WHILE_RUNNING : 250,
  popFirst : true,
  
  init : function (div){
    var t = Tabs.Search;
    var Provinces = {1:{'name':"Tinagel",'x':75,'y':75},
				2:{'name':"Cornwall",'x':225,'y':75},
				3:{'name':"Astolat",'x':375,'y':75},
				4:{'name':"Lyonesse",'x':525,'y':75},
				5:{'name':"Corbnic",'x':625,'y':75},
				6:{'name':"Paimpont",'x':75,'y':225},
				7:{'name':"Cameliard",'x':225,'y':225},
				8:{'name':"Sarras",'x':375,'y':225},
				9:{'name':"Canoel",'x':525,'y':225},
				10:{'name':"Avalon",'x':625,'y':225},
				11:{'name':"Carmathen",'x':75,'y':375},
				12:{'name':"Shallot",'x':225,'y':375},
//				13:{'name':"-------",'x':375,'y':375},
				14:{'name':"Cadbury",'x':525,'y':375},
				15:{'name':"Glaston Bury",'x':625,'y':375},
				16:{'name':"Camlan",'x':75,'y':525},
				17:{'name':"Orkney",'x':225,'y':525},
				18:{'name':"Dore",'x':375,'y':525},
				19:{'name':"Logres",'x':525,'y':525},
				20:{'name':"Caerleon",'x':625,'y':525},
				21:{'name':"Parmenie",'x':75,'y':675},
				22:{'name':"Bodmin Moor",'x':225,'y':675},
				23:{'name':"Cellwig",'x':375,'y':675},
				24:{'name':"Listeneise",'x':525,'y':675},
				25:{'name':"Albion",'x':625,'y':675}};
    t.selectedCity = Cities.cities[0];
    t.myDiv = div;
    
    m = '<DIV class=ptentry><TABLE width=100% class=pbTab><TR><TD class=pbDetLeft>Search for: </td><TD width=99%>';
    m += htmlSelector ({0:"Barb Camp", 1:"Wilderness", 2:"Cities"}, null, 'id=pasrcType'); 
    m += '</td></tr><TR><TD class=pbDetLeft>At: </td><TD class=xtab>X=<INPUT id=pasrchX type=text\> &nbsp;Y=<INPUT id=pasrchY type=text\>\
      &nbsp; Radius: <INPUT id=pasrcDist size=3 value=10 /> &nbsp; <SPAN id=paspInXY></span>\
      <TR><TD class=pbDetLeft>Or:</td><TD>Search entire province: <select id="provinceXY"><option>--provinces--</option>';
    for (var i in Provinces)
    	m += '<option value="'+i+'">'+Provinces[i].name+'</option>';
    m += '</select></td></tr>';
    m += '<TR><TD colspan=2 align=center><INPUT id=pasrcStart type=submit value="Start Search"/></td></tr>';
    m += '</table></div>\
        <DIV id="pasrcResults" style="height:400px; max-height:400px;"></div>';
    
    t.myDiv.innerHTML = m;
    var psearch = document.getElementById ("pasrcType");
    new CdispCityPicker ('pasrchdcp', document.getElementById ('paspInXY'), true, t.citySelNotify).bindToXYboxes(document.getElementById ('pasrchX'), document.getElementById ('pasrchY'));
    document.getElementById ('provinceXY').addEventListener ('click', function() {
    	  if (this.value >= 1) {
    		  document.getElementById ('pasrchX').value = Provinces[this.value].x;
    		  document.getElementById ('pasrchY').value = Provinces[this.value].y;
    		  document.getElementById ('pasrcDist').value = '75';
    	  }
	    }, false); 
    document.getElementById ('pasrcStart').addEventListener ('click', t.clickedSearch, false);
    document.getElementById ('pasrchX').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrcDist').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('change', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('change', t.e_coordChange, false);
    unsafeWindow.pbSearchLookup = t.clickedLookup;  
    unsafeWindow.pbSearchScout = t.clickedScout;  
  },

  e_coordChange : function(){
    document.getElementById ('provinceXY').selectedIndex = 0;
  },
  
  hide : function (){
  },

  show : function (cont){
  },

  citySelNotify : function (city){
    var t = Tabs.Search;
    t.selectedCity = city;
  },
  
  opt : {},
  selectedCity : null,
  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,

  clickedSearch : function (){
    var t = Tabs.Search;

    if (t.searchRunning){
      t.stopSearch ('SEARCH CANCELLED!');
      return;
    }
    t.opt.searchType = document.getElementById ('pasrcType').value;
    t.opt.startX = parseInt(document.getElementById ('pasrchX').value);
    t.opt.startY = parseInt(document.getElementById ('pasrchY').value);
    t.opt.maxDistance = parseInt(document.getElementById ('pasrcDist').value);
    if (document.getElementById ('provinceXY').value > 0)
      t.opt.searchShape = 'square';
    else
      t.opt.searchShape = 'circle'; 
    errMsg = '';

    if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>749)
      errMsg = "X must be between 0 and 749<BR>";
    if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>749)
      errMsg += "Y must be between 0 and 749<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1 || t.opt.maxDistance>75)
      errMsg += "Radius (distance) must be between 1 and 75<BR>";
    if (errMsg != ''){
      document.getElementById('pasrcResults').innerHTML = '<FONT COLOR=#660000>ERROR:</font><BR><BR>'+ errMsg;
      return;
    }

    t.searchRunning = true;
    document.getElementById ('pasrcStart').value = 'Stop Search';
    m = '<DIV class=pbStat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=pastatSearched></div></td>\
        <TD class=xtab align=center><SPAN style="white-space:normal" id=pastatStatus></span></td>\
        <TD class=xtab align=right width=125><DIV id=pastatFound></div></td></tr></table></div>\
          <TABLE width=100%><TR valign=top>\
            <TD width=99% style="max-width:50px"><DIV id=padivOutTab style="height:380px; max-height:380px; overflow-y:auto;"></div></td>\
            <TD align=center valign=middle><A id=pbAhideShow style="text-decoration:none; cursor:pointer;"><DIV style="width:1em; border:1px solid red; padding:10px 2px; background-color:#fee"><SPAN id=spanHideShow> H I D E</span><BR><BR> L<BR>I<BR>S<BR>T<BR><BR> O<BR>P<BR>T<BR>I<BR>O<BR>N<BR>S </div></a></td>\
            <TD width=100% height=100% style="background:#e0e0f0; height:100%; padding:5px"><DIV id=padivOutOpts></div></td>\
          </table>';
      
    document.getElementById('pasrcResults').innerHTML = m;
    if (t.opt.searchType == 0)
      var typeName = 'Barbarians';
    else if (t.opt.searchType == 1)
      var typeName = 'Wildernesses';
    else 
      var typeName = 'Cities';
    if (t.opt.searchShape == 'square')
      var distName = 'Distance';
    else
      var distName = 'Radius';
    m = '<CENTER><B>Search for '+ typeName +'<BR>\
        Center: '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; '+ distName +': '+ t.opt.maxDistance +'<BR></center>\
        <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>LIST OPTIONS:</b><BR></td></tr>';
        
    if (t.opt.searchType == 1 || t.opt.searchType == 0) {
      m += '<TR><TD class=xtab align=right>Min. level to show:</td><TD class=xtab> <INPUT id=pafilMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD class=xtab align=right>Max. level to show:</td><TD class=xtab> <INPUT id=pafilMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
		}
    if (t.opt.searchType == 1){
      m += '<TR><TD class=xtab align=right>Wilderness Type:</td><TD class=xtab><SELECT id=pafilWildType>';
      m += htmlOptions ( {1:'Glassland/Lake', 3:'Woodlands', 4:'Hills', 5:'Mountain', 6:'Plain', 0:'ALL'}, Options.wildType );
      m += '</select></td></tr><TR><TD class=xtab align=right>Unowned Only:</td><TD class=xtab><INPUT id=pafilUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    }
   if (t.opt.searchType == 1 || t.opt.searchType == 0) {
        m+= '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=pafilSortBy>\
          <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Level</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
			</select></td></tr>\
			<TR><TD class=xtab align=right>Coordinates only:</td><TD class=xtab><INPUT type=checkbox id=pacoordsOnly \></td></tr>\
			</table></div><BR><SPAN id=pasrchSizeWarn></span><DIV id=pbSrcExp></div>';
    } else {
		m+= '</select></td></tr><TR><TD class=xtab align=right>Misted Only:</td><TD class=xtab><INPUT id=pafilMisted type=CHECKBOX '+ (Options.mistedOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Hostile Only:</td><TD class=xtab><INPUT id=pafilHostile type=CHECKBOX '+ (Options.hostileOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=pafilSortBy>\
          <OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Might</option>\
             <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
        </select></td></tr>\
		<TR><TD class=xtab align=right>Min might:</td><TD class=xtab><INPUT type=text id=paminmight value='+ Options.minmight +'>\
        <TR><TD class=xtab align=right>Coordinates only:</td><TD class=xtab><INPUT type=checkbox id=pacoordsOnly \></td></tr>\
        </table></div><BR><SPAN id=pasrchSizeWarn></span><DIV id=pbSrcExp></div>';
	
	}
    document.getElementById('padivOutOpts').innerHTML = m;
	 if (t.opt.searchType == 1 || t.opt.searchType == 0) {
    document.getElementById('pafilMinLvl').addEventListener ('change', function (){
      Options.srcMinLevel = document.getElementById('pafilMinLvl').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pafilMaxLvl').addEventListener ('change', function (){
      Options.srcMaxLevel = document.getElementById('pafilMaxLvl').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
	  }
    document.getElementById('pafilSortBy').addEventListener ('change', function (){
      Options.srcSortBy = document.getElementById('pafilSortBy').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pacoordsOnly').addEventListener ('change', function (){ t.dispMapTable (); }, false);
    if (t.opt.searchType == 1){
      document.getElementById('pafilWildType').addEventListener ('change', function (){
        Options.wildType = document.getElementById('pafilWildType').value;
        saveOptions();
        t.dispMapTable ();
        }, false);
      document.getElementById('pafilUnowned').addEventListener ('change', function (){
        Options.unownedOnly = (document.getElementById('pafilUnowned').checked);
        saveOptions();
        t.dispMapTable ();
        }, false);
    }
	if (t.opt.searchType == 2){
		document.getElementById('pafilMisted').addEventListener ('change', function (){
        Options.mistedOnly = (document.getElementById('pafilMisted').checked);
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilHostile').addEventListener ('change', function (){
        Options.hostileOnly = (document.getElementById('pafilHostile').checked);
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('paminmight').addEventListener ('change', function (){
        Options.minmight = parseIntNan(document.getElementById('paminmight').value);
        saveOptions();
        t.dispMapTable ();
        }, false);
	
	}
	
    document.getElementById('pbAhideShow').addEventListener ('click', t.hideShowClicked, false);
	
    t.mapDat = [];
    t.firstX =  t.opt.startX - t.opt.maxDistance;
    t.lastX = t.opt.startX + t.opt.maxDistance;
    t.firstY =  t.opt.startY - t.opt.maxDistance;
    t.lastY = t.opt.startY + t.opt.maxDistance;
    t.tilesSearched = 0;
    t.tilesFound = 0;
    t.curX = t.firstX;
    t.curY = t.firstY;
    var xxx = t.MapAjax.normalize(t.curX);
    var yyy = t.MapAjax.normalize(t.curY);
    document.getElementById ('pastatStatus').innerHTML = 'Searching at '+ xxx +','+ yyy;
    setTimeout (function(){t.MapAjax.request (xxx, yyy, 15, t.mapCallback)}, MAP_DELAY);
  },

  hideShowClicked : function (){
    var div = document.getElementById('padivOutOpts');
    if (div.style.display == 'none'){
      div.style.display = 'block';
      document.getElementById('spanHideShow').innerHTML = 'H I D E';
    } else {
      div.style.display = 'none';
      document.getElementById('spanHideShow').innerHTML = 'S H O W';
    }
  },
  
  dispMapTable : function (){
    var tileNames = ['Barb Camp', 'Grassland', 'Lake', 'Woodlands', 'Hills', 'Mountain', 'Plain' ];
    var t = Tabs.Search;
    var coordsOnly = document.getElementById('pacoordsOnly').checked;
    if (DEBUG_SEARCH) DebugTimer.start();
     function mySort(a, b){
      if (Options.srcSortBy == 'level'){
        if ((x = a[4] - b[4]) != 0)
          return x;
      }
	  if (Options.srcSortBy == 'might'){
        if ((x = b[10] - a[10]) != 0)
          return x;
      }
      return a[2] - b[2];
    }
    
    dat = [];
    for (i=0; i<t.mapDat.length; i++){
      lvl = parseInt (t.mapDat[i][4]);
      type = t.mapDat[i][3];
      if (t.opt.searchType==2 && type==7 ) {
        if (!Options.hostileOnly || t.mapDat[i][12] == 'h') {
          if (!Options.mistedOnly || t.mapDat[i][5]===true)
		    if(t.mapDat[i][10] >= Options.minmight || t.mapDat[i][5])
              dat.push(t.mapDat[i]);
        }
      } else {
       if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
        if (t.opt.searchType==0 || Options.wildType==0
        ||  (Options.wildType==1 && (type==1 || type==2))
        ||  (Options.wildType == type)){
          if (!Options.unownedOnly || t.mapDat[i][5]===false)
            dat.push (t.mapDat[i]);
        }
       }
	  }
    }
    if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: FILTER');

    document.getElementById('pastatFound').innerHTML = 'Found: '+ dat.length;
    if (dat.length == 0){
      m = '<BR><CENTER>None found</center>';
    } else {
      dat.sort(mySort);
      if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: SORT');
      if (coordsOnly)
        m = '<TABLE align=center id=pasrcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Location</td></tr>';
      else {
      if (t.opt.searchType == 2) {
			 m = '<TABLE id=pasrcOutTab class=pbSrchResults cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Loc</td><TD align=right>Dist</td><TD>Player</td><TD align=right>Might</td><TD>Alliance</td><TD></td></tr>';
		} else { 
			m = '<TABLE id=pasrcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Location</td><TD style="padding-left: 10px">Distance</td><TD style="padding-left: 10px;">Lvl</td><TD width=80%> &nbsp; Type</td><TD style=""></td></tr>';
		}
	}
      var numRows = dat.length;
      if (numRows > t.MAX_SHOW_WHILE_RUNNING && t.searchRunning){
        numRows = t.MAX_SHOW_WHILE_RUNNING;
        document.getElementById('pasrchSizeWarn').innerHTML = '<FONT COLOR=#600000>NOTE: Table only shows '+ t.MAX_SHOW_WHILE_RUNNING +' of '+ dat.length +' results until search is complete.</font>';
      }
      for (i=0; i<numRows; i++){
        m += '<TR><TD><DIV onclick="pbGotoMap('+ dat[i][0] +','+ dat[i][1] +')"><A>'+ dat[i][0] +','+ dat[i][1] +'</a></div></td>';
        if (coordsOnly) {
          m += '</tr>';
        } else {
          if (t.opt.searchType == 2) { // city search
            m += '<TD align="right" >'+ dat[i][2].toFixed(2) +'</td>';
            if (dat[i][5])
              m += '<TD colspan=4>* MISTED * &nbsp; &nbsp; <SPAN onclick="pbSearchScout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A>Scout</a></span></td></tr>';
            else{
              var allStyle = '';
              if (dat[i][12]=='f')
                allStyle = 'class=pbTextFriendly';
              else if (dat[i][12]=='h')
                allStyle = 'class=pbTextHostile';
              m += '<TD>'+ dat[i][9]+'</td><TD align=right>'+ dat[i][10] +'</td><TD><SPAN '+ allStyle +'>'+ dat[i][11]+'</span></td><TD><A onclick="pbSearchLookup('+ dat[i][7] +')">Lookup</a></td></tr>';
            }
			} else { 
          m += '<TD align=right  valign="top">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ tileNames[dat[i][3]]
            +'</td><TD  valign="top">'+ (dat[i][5]?(dat[i][6]!=0?' <A onclick="pbSearchLookup('+dat[i][6]+')">OWNED</a>':'<A onclick="pbSearchScout('+ dat[i][0] +','+ dat[i][1] +');return false;">MISTED</a>'):'') +'</td></tr>';
			}
		}
			
       }
      m += '</table>';
    }
    document.getElementById('padivOutTab').innerHTML = m;
    dat = null;
    if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: DRAW');
  },

  mapDat : [],

  stopSearch : function (msg){
    var t = Tabs.Search;
    document.getElementById ('pastatStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';
    document.getElementById ('pasrcStart').value = 'Start Search';
    document.getElementById ('pasrchSizeWarn').innerHTML = '';
    if (t.opt.searchType==0 && document.getElementById('KOCAttackToggle')!=null){    
      document.getElementById ('pbSrcExp').innerHTML = '<CENTER>'+ strButton20('Export Results', 'id=pbSrcDoExp') +'</center>'; 
      document.getElementById ('pbSrcDoExp').addEventListener ('click', t.exportKOCattack, false);
    }
    t.searchRunning = false;
    t.dispMapTable();
  },

  exportKOCattack : function (){
    var t = Tabs.Search;
    var bulkAdds = {};
    for (i=1; i<11; i++)
      bulkAdds['lvl'+ i] = [];
    for (i=0; i<t.mapDat.length; i++){
      var lvl = parseInt (t.mapDat[i][4]);
      if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel && t.mapDat[i][3]==0)
        bulkAdds['lvl'+ lvl].push({x:t.mapDat[i][0], y:t.mapDat[i][1]});
    }
    exportToKOCattack.doExport (bulkAdds, t.selectedCity);
  },
    
  
/** mapdata.userInfo:
(object) u4127810 = [object Object]
    (string) n = George2gh02    (name)
    (string) t = 1              (title code)
    (string) m = 55             (might)
    (string) s = M              (sex)
    (string) w = 2              (mode: 1=normal, 2=begprotect, 3=truce, 4=vacation )
    (string) a = 0              (alliance)
    (string) i = 1              (avatar code)
*****/
  mapCallback : function (left, top, width, rslt){
    var t = Tabs.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('ERROR: '+ rslt.errorMsg);
      return;
    }

    map = rslt.data;
    var Dip = Seed.allianceDiplomacies;	
    var userInfo = rslt.userInfo;
    var alliance = rslt.allianceNames;
	
    for (k in map){
      if (t.opt.searchType==0 && map[k].tileType==51 && !map[k].tileCityId ) {  // if barb
        type = 0;
      } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) { // if wild
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11)
          type = 2;
        else
          type = (map[k].tileType/10) + 1;
      } else if (t.opt.searchType==2 && map[k].tileCityId>=0 && map[k].tileType>50 && map[k].cityName) {
		    type = 7;
      } else
        continue;
        
      var dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      if ((t.opt.searchShape=='circle' && dist <= t.opt.maxDistance)
      ||  (t.opt.searchShape=='square' && map[k].xCoord>=t.firstX && map[k].xCoord<=t.lastX && map[k].yCoord>=t.firstY && map[k].yCoord<=t.lastY)){
	  	  if (t.opt.searchType==2) {    // if city search
    			var isMisted = map[k].tileUserId == 0 || false;		
    			var uu = 'u'+map[k].tileUserId;
    			var aD = '';
  				var nameU = '';
  				var mightU = ''; 
  				var aU = '';
    			if (!isMisted && userInfo[uu]) {
    				nameU = userInfo[uu].n;   // can error, must check if (userInfo[uu])
    				mightU = userInfo[uu].m;
    				if (alliance['a'+userInfo[uu].a])
    					aU = alliance['a'+userInfo[uu].a];
    				else
    				  aU = '----';
    				aD = '';
    				if (Dip.friendly && Dip.friendly['a'+userInfo[uu].a]) aD = 'f';
    				if (Dip.hostile && Dip.hostile['a'+userInfo[uu].a]) aD = 'h';
    			}
// TODO: save memory, remove city name ?   			
          t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName, nameU, mightU, aU, aD]);
        } else {
          isOwned = map[k].tileUserId>0 || map[k].misted;
          t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, (map[k].tileUserId>0? map[k].tileUserId : 0)]);
        }
        ++t.tilesFound;
      }
    }
    
    t.tilesSearched += (15*15);
    document.getElementById('pastatSearched').innerHTML = 'Searched: '+ t.tilesSearched;
    t.dispMapTable();

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        t.stopSearch ('Done!');
        return;
      }
    }
    var x = t.MapAjax.normalize(t.curX);
    var y = t.MapAjax.normalize(t.curY);
    document.getElementById ('pastatStatus').innerHTML = 'Searching at '+ x +','+ y;
    setTimeout (function(){t.MapAjax.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
  },

  clickedScout : function (x, y){
    unsafeWindow.modal_attack (3, x, y);
    CwaitForElement ('modal_attack', 5000, function (){document.getElementById('modalBox1').style.zIndex='112000'});
  },
    
  clickedLookup : function (pid){
    var t = Tabs.Search;
    var pop = new CPopup ('pbsrclookup', 0,0, 500,500, true);
    if (t.popFirst){
      pop.centerMe (mainPop.getMainDiv());  
      t.popFirst = false;
    }
    pop.getTopDiv().innerHTML = '<CENTER><B>Player Lookup</b></center>';
    pop.getMainDiv().innerHTML = '<DIV class=pbStat>Leaderboard information</div><SPAN id=pblupLB>Looking up leaderboard...</span>\
      <BR><DIV class=pbStat>Alliance Lookup</div><SPAN id=pblupAI>Looking up alliance info...</span>';
    pop.show (true);
    t.fetchLeaderboard (pid, function (r){t.gotPlayerLeaderboard(r, document.getElementById('pblupLB'))});
    t.fetchPlayerInfo (pid, function (r){t.gotPlayerInfo(r, document.getElementById('pblupAI'))});
  },

  gotPlayerLeaderboard : function (rslt, span){
    var t = Tabs.Search;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Leaderboard:</b> Not found! (misted?)<BR><BR>';
      return;
    }
    var p = rslt.results[0];
    var x;
    var name = '';
    if (p.playerSex == 'M')
      name = 'Lord ';
    else if (p.playerSex == 'F')
      name = 'Lady ';   
    name += p.displayName;      
    if ((x = officerId2String(p.officerType)) != '')  
      name += ' ('+ x + ')';  
    var aName = p.allianceName;
    if (!aName || aName=='')
      aName = 'none';
             
    var m = '<CENTER><SPAN class=boldRed>NOTE: Leaderboard information is delayed up to 24 hours</span></center><TABLE class=pbTabSome>';
    m += '<TR><TD class=pbDetLeft>Player Name:</td><TD>'+ name +'</td></tr>\
      <TR><TD class=pbDetLeft>Might:</td><TD>'+ p.might +' (rank #'+ p.rank +')</td></tr>\
      <TR><TD class=pbDetLeft>Alliance:</td><TD>'+ aName +' ('+ getDiplomacy(p.allianceId) +')</td></tr>\
      <TR valign=top><TD class=pbDetLeft>Cities:</td><TD><TABLE class=pbTabSome><TR style="font-weight:bold"><TD>City Name</td><TD>Coords</td><TD>Level</td><TD>Status</td><TD>Created</td></tr>';
      
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = c.dateCreated.substr(0,10);
      m += '<TR><TD>'+ c.cityName +'</td><TD>'+ coordLink(c.xCoord, c.yCoord) +'</td><TD align=center>'+ c.tileLevel +'</td>\
          <TD>'+ cityStatusString (c.cityStatus) +'</td><TD>'+ created +'</td></tr>';
    }    
    m += '</table></td></tr></table>';
    span.innerHTML = m;
  },

  gotPlayerInfo : function (rslt, span){
    var t = Tabs.Search;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<TABLE class=pbTabSome>';
    var p = rslt.userInfo[0];
    var pids = p.provinceIds.split (',');
    var prov = [];
    for (var i=0; i<pids.length; i++)
      prov.push(unsafeWindow.provincenames['p'+pids[i]]);
    m += '<TR><TD class=pbDetLeft>Player Name:</td><TD>'+ p.genderAndName +'</td></tr>\
      <TR><TD class=pbDetLeft>Might:</td><TD>'+ p.might +'</td></tr>\
      <TR><TD class=pbDetLeft>Facebook profile:</td><TD><A target="_tab" href="http://www.facebook.com/profile.php?id='+ p.fbuid +'">Click to open in new tab</a></td></tr>\
      <TR><TD class=pbDetLeft>Alliance:</td><TD>'+ p.allianceName +' ('+ getDiplomacy(p.allianceId) +')</td></tr>\
      <TR valign=top><TD class=pbDetLeft>Provinces:</td><TD style="white-space:normal">'+ prov.join(', ') +'</td></tr>';
    span.innerHTML = m + '</table>';
  },
      
  fetchPlayerInfo : function (uid, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.uid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onSuccess: function (rslt) {
        notify (rslt);
      },
    });
  },
  fetchLeaderboard : function (uid, notify) {
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.userId = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify (rslt);
      },
    });
  },
  
};   // end Search tab




/******** Export to KOC Attack **********/  

var exportToKOCattack = {
  troops : {},  
  
  init : function (){
    var t = exportToKOCattack;
    for (var b=1; b<11; b++){
      t.troops['b'+ b] = [];
      for (var trp=0; trp<12; trp++){
        t.troops['b'+ b][trp] = 0;
      }
    }
    var s = GM_getValue ('atkTroops_'+ getServerId(), null);
    if (s != null){
      var trp = JSON2.parse(s);
      for (var b=1; b<11; b++){
        if (trp['b'+ b] && trp['b'+ b].length == 12)
          t.troops['b'+ b] = trp['b'+ b];
      }
    }
    window.addEventListener('unload', t.onUnload, false);
  },
  
  onUnload : function (){
    var t = exportToKOCattack;
    GM_setValue ('atkTroops_'+ getServerId(),  JSON2.stringify(t.troops));
  },
  
  doExport : function (coordList, city){
    var t = exportToKOCattack;
    var popExp = null;
    var cList = coordList;
    var curLevel = 0;
    var city = city;
    var troopDef = [
      ['STroop', 1],
      ['Wagon', 9],
      ['Archers', 6],
      ['Cavalry', 7],
      ['Heavies', 8],
      ['Ballista', 10],
    ];
    
    if (popExp == null){
      popExp = new CPopup ('pbsrcexp', 0,0, 625,600, true, function (){popExp.destroy(); popExp=null;});
      popExp.centerMe (mainPop.getMainDiv());  
    }
    var m = '<DIV class=pbStat>Export data to KOC Attack</div><BR><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPadNW>\
      <TR style="font-weight:bold; background-color:white"><TD>Target Type</td><TD style="padding:1px" align=center>#<BR>targets</td><TD width=15></td>';
    for (var i=0; i<troopDef.length; i++)
      m += '<TD>'+ troopDef[i][0] +'</td>';
    m += '</tr>';
    for (var b=1; b<11; b++){
      m += '<TR><TD>Barb level '+ b +'</td><TD align=right>'+ coordList['lvl'+b].length  +'&nbsp; &nbsp;</td><TD></td>'; 
      for (var td=0; td<troopDef.length; td++)
        m += '<TD><INPUT id=ptET_'+ b +'_'+ troopDef[td][1] +' type=text size=3 value="'+ t.troops['b'+ b][troopDef[td][1]-1] +'"></td>';
      m += '<TD width=90%><SPAN class=boldRed id=ptETerr_'+ b +'></span></tr>';
    } 
    m += '</table>';
    var isKOCattack = !(document.getElementById('KOCAttackToggle') == null);
    
    //TODO: 'RESET VALUES' button ?
    
    if (isKOCattack){
      m += '<BR><CENTER>'+ strButton20('Bulk Add to KOC Attack', 'id=pbSrcDoBA') +'</center>';
    } else {
      m += 'KOC Attack not running, unable to export';
    } 
    m += '<CENTER><DIV style="width:70%" id=pbSrcExpResult></DIV></center>'; 
    popExp.getMainDiv().innerHTML =  m;
    for (var b=1; b<11; b++)
      for (var td=0; td<troopDef.length; td++)
        document.getElementById('ptET_'+ b +'_'+ troopDef[td][1]).addEventListener ('change', validate, false);
    
    popExp.getTopDiv().innerHTML = '<CENTER><B>Power Bot Export</b></center>';
    if (isKOCattack)    
      document.getElementById ('pbSrcDoBA').addEventListener ('click', doBulkAdd, false);
    popExp.show(true);
         
    if (city != null){
      for (var i=0; i<Cities.numCities; i++)
        if (city.id == Cities.cities[i].id)
          break;
      if (i < Cities.numCities){
        setTimeout (function(){unsafeWindow.citysel_click(document.getElementById('citysel_'+ (i+1)));}, 0);
//logit ("SWITCH CITY: "+ (i+1));          
      }
    }
// TODO: WAIT FOR City select ?
    
  
    function validate (e){
      var x = e.target.id.substr(5).split('_');
      var b = x[0];
      var trp = x[1];
      document.getElementById('ptETerr_'+ b).innerHTML = '';
      var x = parseIntZero (e.target.value);
      if (isNaN(x) || x<0 || x>150000){
        e.target.style.backgroundColor = 'red';
        document.getElementById('ptETerr_'+ b).innerHTML = 'Invalid Entry';
        return;
      } else {
        e.target.style.backgroundColor = '';
        e.target.value = x;
        t.troops['b'+ b][trp-1] = x;
      }
      var tot = 0;
      for (var td=0; td<troopDef.length; td++)
        tot += parseIntZero(document.getElementById('ptET_'+ b +'_'+ [troopDef[td][1]]).value);
      if (tot<1 && cList['lvl'+ b].length>0 )
        document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
      if (tot>150000)
        document.getElementById('ptETerr_'+ b).innerHTML = 'Too many troops';
    }
      
    function doBulkAdd (){
      for (var b=1; b<11; b++){
        if (document.getElementById('ptETerr_'+ b).innerHTML != '')
          return;
        var tot = 0;
        for (var td=0; td<troopDef.length; td++)
          tot += t.troops['b'+b][troopDef[td][1]-1];
        if (tot<1 && cList['lvl'+ b].length>0){
          document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
          return; 
        } else if (tot>150000) {
          document.getElementById('ptETerr_'+ b).innerHTML = 'Too many troops';
          return; 
        }
      }    
      document.getElementById('pbSrcExpResult').innerHTML = '';
      doNextLevel ();
    }
    
    function endBulkAdd (msg){
      unsafeWindow.Modal.hideModalAll(); 
      curLevel = 0;
      showMe ();
      popExp.show(true);
      document.getElementById('pbSrcExpResult').innerHTML += msg;
    }
    
    function doNextLevel (){
      while ( curLevel<10 && cList['lvl'+ ++curLevel].length==0)
        ;
      if (curLevel>=10){
        endBulkAdd ('Done!<BR>'); 
        return;
      }
// WinManager.hideall();      <=== TODO!  
      hideMe();
      popExp.show (false);
      unsafeWindow.Modal.hideModalAll(); 
      unsafeWindow.modal_attack(4,0,0);
      new CwaitForElement ('BulkAddAttackDiv', 100, e_attackDialog );
    }
        
    function e_attackDialog (tf){
      if (!tf){
        hideMe();
      popExp.show (false);
      unsafeWindow.Modal.hideModalAll(); 
      unsafeWindow.modal_attack(4,0,0);
      new CwaitForElement ('BulkAddAttackDiv', 100, e_attackDialog );
      } 
      var div = searchDOM (document.getElementById('BulkAddAttackDiv'), 'node.tagName=="DIV" && node.style.display=="none"', 10);
      if (div==null){
        endBulkAdd ('<SPAN class=boldRed>ERROR: Unexpected attack dialog format (1).</span>');
        return;  
      }
      var ta = searchDOM (div, 'node.tagName=="TEXTAREA"', 10);
      var but = searchDOM (div, 'node.tagName=="A"', 10);
      if (ta==null || but==null){
        endBulkAdd ('<SPAN class=boldRed>ERROR: Unexpected attack dialog format (2).</span>');
        return;  
      }
      for (var trp=1; trp<13; trp++){
        var inp = document.getElementById('modal_attack_unit_ipt' +trp);
        inp.value = t.troops['b'+curLevel][trp-1];
        if (t.troops['b'+curLevel][trp-1] > 0)
          inp.style.backgroundColor = 'yellow';
        else
          inp.style.backgroundColor = 'white';
      }
      div.style.display = 'block';
      document.getElementById('KOCAttackBulkAddForce').checked = true;
      if (DISABLE_BULKADD_LIST)
        ta.value = '';
      else {
        var m = '';
        var list = cList['lvl'+ (curLevel)];
        for (i=0; i<list.length; i++)
          m += list[i].x +','+ list[i].y +'\n';
        ta.value = m;
      }
      clickWin (unsafeWindow, but, 'click');   
      unsafeWindow.Modal.hideModal();
      document.getElementById('pbSrcExpResult').innerHTML += 'Added '+ list.length +' targets for '+ city.name +'<BR>';
      setTimeout (doNextLevel, 10);
    }    
  },
}


  function searchDOM (node, condition, maxLevel, doMult){
    var found = [];
    eval ('var compFunc = function (node) { return ('+ condition +') }');
    doOne(node, 1);
    if(!doMult){
      if (found.length==0)
        return null;
      return found[0];
    }
    return found;
    function doOne (node, curLevel){
      try {
        if (compFunc(node))
          found.push(node);
      } catch (e){
      }      
      if (!doMult && found.length>0)
        return; 
      if (++curLevel<maxLevel && node.childNodes!=undefined)
        for (var c=0; c<node.childNodes.length; c++)
          doOne (node.childNodes[c], curLevel);
    }
  }



/****************************  Sample Tab Implementation  ******************************/
Tabs.sample = {
  tabOrder : 30,                    // order to place tab in top bar
  tabDisabled : !ENABLE_SAMPLE_TAB, // if true, tab will not be added or initialized
  tabLabel : 'Click Me',            // label to show in main window tabs
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.sample;
    t.myDiv = div;
    var cityName = Cities.cities[0].name;
    div.innerHTML = '<CENTER><BR>This is a sample tab implementation<BR><BR>Showing food for '+ cityName +' : <SPAN id=pbSampleFood>0</span>\
        <BR><BR>(Food is updated every 5 seconds)</center>';
  },
  
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.sample;
    clearTimeout (t.timer);
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.sample;
    var food = parseInt(Seed.resources['city'+ Cities.cities[0].id]['rec'+1][0] / 3600);
    document.getElementById('pbSampleFood').innerHTML = addCommas (food);
    clearTimeout (t.timer);
    t.timer = setTimeout (t.show, 5000);
  },
}


/*********************************** ATTACK TAB ***********************************/
function setMaxHeightScrollable (e){
  e.style.height = '100%';
  e.style.height = e.clientHeight + 'px';
  e.style.maxHeight = e.clientHeight + 'px';
  e.style.overflowY = 'auto';
}

Tabs.Attack = {
  tabDisabled : !ENABLE_ATTACK_TAB,
  tabOrder: 20,
  myDiv : null,
  data : {},  
  MapAjax : new CMapAjax(),
    
  init : function (div){
    var t = Tabs.Attack;
    t.myDiv = div;
    t.myDiv.innerHTML = '<TABLE width=100% height=100% class=pbTab><TR><TD><INPUT id=pbBarbShow type=submit value="Show All Targets" \> <BR>\
       City: <SPAN id=pbAtkCSS></span> &nbsp; &nbsp; &nbsp; Radius: <INPUT id=pbBarbDist size=3 type=text> &nbsp; &nbsp; <INPUT id=pbBarbScan type=submit value=Scan \></td></tr><TR><TD height=100%>\
       <DIV id=pbAtkDiv style="background-color:white"></div></td></tr></table>';
    t.loadTargets ();
    // TODO: Check current cities, invalidate data if city moved
    document.getElementById('pbBarbScan').addEventListener ('click', t.e_clickedScan, false);
    document.getElementById('pbBarbShow').addEventListener ('click', t.e_clickedShow, false);
    new CdispCityPicker ('pbAtkCS', document.getElementById('pbAtkCSS'), false, function (c){t.scanCity=c}, 0);
  },
  
  hide : function (){
  },

  state : 0,
  show : function (){
    var t = Tabs.Attack;
    if (t.state == 0){
      setMaxHeightScrollable (document.getElementById('pbAtkDiv'));
      t.state = 1;
    }
  },

  clearDiv : function (){
    document.getElementById('pbAtkDiv').innerHTML = '';
  },
  writeDiv : function (m){
    document.getElementById('pbAtkDiv').innerHTML += m;
  },
  
  loadTargets : function (){
    var t = Tabs.Attack;
DebugTimer.start(); 
    var totTargets = 0;   
    for (var c=0; c<Cities.numCities; c++){
      var s = GM_getValue ('atk_'+ getServerId() +'_'+ Cities.cities[c].id, null);
      if (s == null)
        t.data['city'+ Cities.cities[c].id] = {cityX:Cities.cities[c].x, cityY:Cities.cities[c].y, radius:0, numTargets:0, targets:{}};
      else
        t.data['city'+ Cities.cities[c].id] = JSON2.parse (s);
      totTargets += t.data['city'+ Cities.cities[c].id].numTargets;
    }
DebugTimer.display ('Time to GM_getValue() '+ totTargets +' targets for all cities');    
  },
  
  e_clickedScan : function (){
    var t = Tabs.Attack;
    t.clearDiv();
    var dist = parseInt(document.getElementById('pbBarbDist').value);
    if (isNaN(dist) || dist<1 || dist>35){
      t.writeDiv ("<SPAN class=boldRed>Nuh-uh, try again</span><BR>");
      return; 
    }
    t.writeDiv ('Scanning map for city: '+ t.scanCity.name +'<BR>');
    t.scanBarbs (t.scanCity.id, dist);
  },

  popShow : null,  
  
  e_clickedShow : function (){    // show all current attack data
    var t = Tabs.Attack;
    if (t.popShow == null){
      t.popShow = new CPopup ('pbbs', 0,0, 500,500, true, function (){t.popShow.destroy(); t.popShow=null;});
      t.popShow.centerMe (mainPop.getMainDiv());  
    }
    var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPad>';
    for (var c=0; c<Cities.numCities; c++){
      var dat = t.data['city'+ Cities.cities[c].id];
      m += '<TR><TD colspan=3><DIV class=pbStat>'+ Cities.cities[c].name +' &nbsp; (radius:'+ dat.radius +' &nbsp;targets:'+ dat.numTargets  +')</div></td></tr>';
      // sort by distance ...
      var atks = [];
      for (k in dat.targets)
        atks.push (dat.targets[k]);
      atks.sort (function(a,b){return a.dist-b.dist});     
      for (i=0; i<atks.length; i++)
        m += '<TR><TD>Barb Camp '+ atks[i].lvl +'</td><TD>'+ atks[i].x +','+ atks[i].y +'</td><TD> &nbsp; Dist='+ atks[i].dist.toFixed(2) +'</td></tr>';
    }    
    t.popShow.getMainDiv().innerHTML = '</table></div>'+ m;
    t.popShow.getTopDiv().innerHTML = '<CENTER><B>Showing all targets in memory</b></center>';
    t.popShow.show(true);    
  },

  configWriteTargets : function (cityID){
    var t = Tabs.Attack;
    var serverID = getServerId();
    DebugTimer.start();    
    GM_setValue ('atk_'+ serverID +'_'+ cityID,  JSON2.stringify(t.data['city'+ cityID]));
    t.writeDiv ('** Time to GM_setValue() '+ t.data['city'+ cityID].numTargets +' targets for city: '+ (DebugTimer.getMillis()/1000) +' seconds<BR>');
  },
    
  oScan : {},   
  scanBarbs : function (cityID, distance){   // max distance:35
    var t = Tabs.Attack;
    var city = Cities.byID[cityID];
// TODO: remember state - in case of refresh
    var x = t.MapAjax.normalize(city.x-distance); 
    var y = t.MapAjax.normalize(city.y-distance); 
    t.oScan = { city:city, centerX:city.x, centerY:city.y, maxDist:distance,
        minX:x, maxX:city.x+distance, minY:y, maxY:city.y+distance, curX:x, curY:y, data:[] };
    setTimeout (function(){t.MapAjax.request (t.oScan.curX, t.oScan.curY, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ t.oScan.curX +','+ t.oScan.curY +'<BR>');
  },

  e_scanDone : function (errMsg){
    var t = Tabs.Attack;
    t.data['city'+ t.oScan.city.id] = {cityX:t.oScan.city.x, cityY:t.oScan.city.y, radius:t.oScan.maxDist, numTargets:0, targets:{}};
    var dat = t.data['city'+ t.oScan.city.id];
    t.writeDiv ('Done scanning<BR>');
    for (var i=0; i<t.oScan.data.length; i++){
      var map = t.oScan.data[i];
      dat.targets[map[0] +'_'+ map[1]] = {type:'b', x:map[0], y:map[1], dist:map[2], lvl:map[3]};
      ++dat.numTargets;
    }
    t.configWriteTargets (t.oScan.city.id);
  },
      
  e_mapCallback : function (left, top, width, rslt){
    var t = Tabs.Attack;
    if (!rslt.ok){
      setTimeout (function(){t.e_scanDone (rslt.errorMsg)}, 0);
      t.writeDIV ('<BR>ERROR: '+ rslt.errorMsg +'<BR>');
      return;
    }
    var map = rslt.data;
    for (k in map){
      var lvl = parseInt(map[k].tileLevel);
      if (map[k].tileType==51 && !map[k].tileCityId && lvl<8) {  // if barb
        var dist = distance (t.oScan.centerX, t.oScan.centerY, map[k].xCoord, map[k].yCoord);
        if (dist <= t.oScan.maxDist){
          t.oScan.data.push ([parseInt(map[k].xCoord), parseInt(map[k].yCoord), dist, lvl]);
        }
      } 
    }
    t.oScan.curX += 15;
    if (t.oScan.curX > t.oScan.maxX){
      t.oScan.curX = t.oScan.minX;
      t.oScan.curY += 15;
      if (t.oScan.curY > t.oScan.maxY){
        setTimeout (function(){t.e_scanDone (null)}, 0);
        return;
      }
    }
    var x = t.oScan.curX;
    var y = t.oScan.curY;
    setTimeout (function(){t.MapAjax.request (x,y, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ x +','+ y +'<BR>');
  },
}


/*********************************** Test TAB ***********************************/
Tabs.Test = {
  tabOrder: 25,
  tabDisabled : !ENABLE_TEST_TAB,         // if true, tab will not be added or initialized
  tabLabel : 'Test',
  myDiv : null,

  init : function (div){
    var t = Tabs.Test;
    t.myDiv = div;
    var m = '<TABLE><TR><TD align=right>Scout: </td><TD><INPUT type=checkbox id=pbfakeIsScout></td></tr>\
        <TR><TD align=right>Wild: </td><TD><INPUT type=checkbox id=pbfakeIsWild></td></tr>\
        <TR><TD align=right>False Report: </td><TD><INPUT type=checkbox id=pbfakeFalse></td></tr>\
        <TR><TD align=right>Seconds: </td><TD><INPUT type=text size=4 value=300 id=pbfakeSeconds></td></tr>\
        <TR><TD align=right># of Militia: </td><TD><INPUT type=text size=6 value=5000 id=pbfakeMilitia></td></tr>\
        <TR><TD colspan=2 align=center><INPUT id=pbtestSendMarch type=submit value="Fake Attack" \></td></tr></table>\
        <INPUT id=pbReloadKOC type=submit value="Reload KOC" \>\
        <BR>Force ajax errors : <INPUT type=checkbox id=pbajaxErr>\
        <BR>Send alliance chat alert as whisper : <INPUT type=checkbox id=pbalertWhisper CHECKED>\
        <BR><DIV id=pbtestDiv style="background-color:#ffffff; maxwidth:675; maxheight:350px; height:350px; overflow-y:auto;"></div>';
    div.innerHTML = m;
    document.getElementById('pbtestSendMarch').addEventListener ('click', t.clickFakeAttack, false);
    document.getElementById('pbReloadKOC').addEventListener ('click', reloadKOC, false);
    document.getElementById('pbajaxErr').addEventListener ('click', function (){window.EmulateAjaxError=this.checked}, false);
    document.getElementById('pbalertWhisper').addEventListener ('click', function (){SEND_ALERT_AS_WHISPER=this.checked}, false);
    SEND_ALERT_AS_WHISPER = true;
  },

  hide : function (){
    var t = Tabs.Test;
  },

  show : function (){
  },

  writeDiv : function (msg){
    var t = Tabs.Test;
    document.getElementById('pbtestDiv').innerHTML = msg;
  },

  addDiv : function (msg){
    var t = Tabs.Test;
    document.getElementById('pbtestDiv').innerHTML += msg;
  },
  
  createFakeAttack : function (cityNum, isScout, isWild, isFalse, secs, numMilitia){
    var marchId = 'm'+ (88888 + Math.floor(Math.random()*11111));
    var march = {};
    if (matTypeof(Seed.queue_atkinc)=='array')
      Seed.queue_atkinc = {};
    if (isFalse)
      march.marchType = 0;
    else if (isScout)
      march.marchType = 3;
    else
      march.marchType = 4;

    march.toCityId = Cities.cities[cityNum].id;
    if (isWild) {
      keys = unsafeWindow.Object.keys(Seed.wilderness['city'+Cities.cities[cityNum].id]);
      march.toTileId = Seed.wilderness['city'+Cities.cities[cityNum].id][keys[0]].tileId;
    } else {
      march.toTileId = Cities.cities[cityNum].tileId;
    }
    secs = parseInt(secs);
    march.arrivalTime = unixTime() + secs;
    march.departureTime = unixTime() - 10;
    march.unts = {}
    march.unts.u3 = 1
    march.unts.u2 = numMilitia
    march.pid = 1234567
    march.score = 9
    march.mid = marchId.substr(1);
    march.players = {}
    march.players.u1234567 = {}
    march.players.u1234567.n = 'Fred Flintstone';
    march.players.u1234567.t = 60
    march.players.u1234567.m = 5441192
    march.players.u1234567.s = 'M';
    march.players.u1234567.w = 1
    march.players.u1234567.a = 1
    march.players.u1234567.i = 5
    Seed.queue_atkinc[marchId] = march;
    Seed.players.u1234567 = march.players.u1234567;
  },

  clickFakeAttack : function (){
    var t = Tabs.Test;
    var isScout = document.getElementById('pbfakeIsScout').checked;
    var isWild = document.getElementById('pbfakeIsWild').checked;
    var isFalse = document.getElementById('pbfakeFalse').checked;
    var secs = parseInt(document.getElementById('pbfakeSeconds').value);
    var mil = parseInt(document.getElementById('pbfakeMilitia').value);
    t.createFakeAttack (0, isScout, isWild, isFalse, secs, mil);
  },
}

/*********************************** Log Tab ***********************************/
Tabs.ActionLog = {
  tabOrder: 11,
  tabLabel : 'Log',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,
    
  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pbStat>ACTION LOG</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=pbTabLined><TR><TD></td><TD width=95%></td></table></div>';
    t.logTab = document.getElementById('pbactionlog');  
    t.state = 1;
    var a = JSON2.parse(GM_getValue ('log_'+getServerId(), '[]'));
    if (matTypeof(a) == 'array'){
      t.last50 = a;
      for (var i=0; i<t.last50.length; i++)
        t._addTab (t.last50[i].msg, t.last50[i].ts);
    }
    window.addEventListener('unload', t.onUnload, false);
  },

  hide : function (){
  },

  show : function (){
  },

  onUnload : function (){
    var t = Tabs.ActionLog;
    GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last50));
  },
    
  _addTab : function (msg, ts){
    var t = Tabs.ActionLog;
    if (t.state != 1)
      return;
    if (t.logTab.rows.length >= t.maxEntries)
      t.logTab.deleteRow(t.maxEntries-1);
    var row = t.logTab.insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML = ts;
    row.insertCell(1).innerHTML = msg;
  }, 
  
  log : function (msg){
    var t = Tabs.ActionLog;
    var ts = new Date().toTimeString().substring (0,8);
    t._addTab (msg, ts);
    while (t.last50.length >= 50)
      t.last50.shift();
    t.last50.push ({msg:msg, ts:ts});
  },
}

function actionLog (msg){
  if (!Tabs.ActionLog.tabDisabled)
    Tabs.ActionLog.log (msg);  
}
    

/*********************************** Options Tab ***********************************/
Tabs.Options = {
  tabOrder: 10,
  myDiv : null,
  fixAvailable : {},

  init : function (div){
    var t = Tabs.Options;
    t.myDiv = div;
    try {      
      m = '<DIV style="height:500px; max-height:500px; overflow-y:auto"><TABLE width=100% class=pbOptions cellspacing=0 cellpadding=0>\
        <TR><TD colspan=2><B>Power Bot Config:</b></td></tr>\
        <TR><TD><INPUT id=pballowWinMove type=checkbox /></td><TD>Enable window drag (move window by dragging top bar with mouse)</td></tr>\
        <TR><TD><INPUT id=pbTrackWinOpen type=checkbox /></td><TD>Remember window open state on refresh</td></tr>\
        <TR><TD><INPUT id=pbHideOnGoto type=checkbox /></td><TD>Hide window when clicking on map coordinates</td></tr>\
        <TR><TD colspan=2><BR><B>KofC Features:</b></td></tr>\
        <TR><TD><INPUT id=pbFairie type=checkbox /></td><TD>Disable all Fairie popup windows</td></tr>\
        <TR><TD><INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/></td><TD>Wide screen (all domains, requires refresh)</td></tr>\
        <TR><TD><INPUT id=pbWatchEnable type=checkbox '+ (GlobalOptions.pbWatchdog?'CHECKED ':'') +'/></td><TD>Refresh if KOC not loaded within 1 minute (all domains)</td></tr>\
        <TR><TD><INPUT id=pbEveryEnable type=checkbox /></td><TD>Refresh KOC every <INPUT id=pbeverymins type=text size=2 maxlength=3 \> minutes</td></tr>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>Put chat on right (requires wide screen)</td></tr>\
		<TR><TD><INPUT id=pbWMapEnable type=checkbox /></td><TD>Use WideMap (requires wide screen)</td></tr>\
        <TR><TD><INPUT id=pbGoldEnable type=checkbox /></td><TD>Auto collect gold when happiness reaches <INPUT id=pbgoldLimit type=text size=2 maxlength=3 \>%</td></tr>\
        </table><BR><BR><HR>Note that if a checkbox is greyed out there has probably been a change of KofC\'s code, rendering the option inoperable.</div>';
      div.innerHTML = m;

      document.getElementById('pbWatchEnable').addEventListener ('change', t.e_watchChanged, false);
      document.getElementById('pbWideOpt').addEventListener ('change', t.e_wideChanged, false);
      t.togOpt ('pballowWinMove', 'pbWinDrag', mainPop.setEnableDrag);
      t.togOpt ('pbTrackWinOpen', 'pbTrackOpen');
      t.togOpt ('pbHideOnGoto', 'hideOnGoto');
      t.togOpt ('pbFairie', 'pbKillFairie', FairieKiller.setEnable);
      t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
      t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
      t.changeOpt ('pbeverymins', 'pbEveryMins');
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
      t.togOpt ('pbWMapEnable', 'pbWideMap', WideScreen.useWideMap);
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);

    } catch (e) {
      div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }      
  },

  hide : function (){
  },

  show : function (){
  },

  togOpt : function (checkboxId, optionName, callOnChange){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },
  
  changeOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
      if (callOnChange)
        callOnChange (this.value);
    }
  },
  
  e_watchChanged : function (){
    GlobalOptions.pbWatchdog = document.getElementById('pbWatchEnable').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
  e_wideChanged : function (){
    GlobalOptions.pbWideScreen = document.getElementById('pbWideOpt').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
}

/****************************  Transport Implementation  *******************************/
Tabs.transport = {
  tabOrder: 1,
  tabLabel: 'Transport',
  myDiv: null,
  timer: null,
  traderState: [],
  lTR: [],
  tradeRoutes: [], 
  checkdotradetimeout: null,
  count:0,

    init: function(div){
		var t = Tabs.transport;
        t.myDiv = div;
		t.traderState = {
            running: false,
        };
        t.readTraderState();
	t.readTradeRoutes();
	t.e_tradeRoutes();

      var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED TRANSPORT FUNCTION</div><TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center">';
      if (t.traderState.running == false) {
          m += '<TD><INPUT id=pbTraderState type=submit value="Transport = OFF"></td>';
      } else {
          m += '<TD><INPUT id=pbTraderState type=submit value="Transport = ON"></td>';
      }
      m += '<TD><INPUT id=pbShowRoutes type=submit value="Show Routes"></td>';
      m += '</tr></table></div>';
      m += '<DIV id=pbTraderDivD class=pbStat>ADD TRADE ROUTE</div>';

      m += '<TABLE id=pbaddtraderoute width=95% height=0% class=pbTab><TR align="left">';
      m += '<TD>From City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptrescity></span></div></td></tr>';

      m += '<TR align="left">';
      m += '<TD>To City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptcityTo></span></div></td>';
      m += '<TD>OR</td>';
      m += '<TD>X:<INPUT id=ptcityX type=text size=3\></td>';
      m += '<TD>Y:<INPUT id=ptcityY type=text size=3\></td></tr>';
	  
	  m += '<TR align="left">';
	  m += '<TD colspan=4>Time inbetween to check transport: <INPUT id=pbtransportinterval type=text size=2 value="'+Options.transportinterval+'"\> minutes</td></tr></table>';
      m += '<TD colspan=4>Dont send transport out if less then <INPUT id=pbminwagons type=text size=2 value="'+Options.minwagons+'"\> are needed. (Needless transports are skipped this way)</td></tr></table>';
      
      m += '<DIV style="margin-top:10px;margin-bottom:5px;">If the "trade" amount is 0 then it will transport the max amount above "keep". Gold only if there is space left...</div>';
      m += '<TABLE id=pbaddtraderoute width=55% height=0% class=pbTab><TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td>';
      m += '<TD><INPUT id=pbshipFood type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountFood type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountFood type=text size=10 maxlength=10 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td>';
      m += '<TD><INPUT id=pbshipWood type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountWood type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountWood type=text size=10 maxlength=10 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td>';
      m += '<TD><INPUT id=pbshipStone type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountStone type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountStone type=text size=10 maxlength=10 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td>';
      m += '<TD><INPUT id=pbshipOre type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountOre type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountOre type=text size=10 maxlength=10 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png"></td>';
      m += '<TD><INPUT id=pbshipGold type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountGold type=text size=10 maxlength =10 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountGold type=text size=10 maxlength=10 value="0"\></td></tr>'
      m += '</table>';

      m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRoute type=submit value="Add Route"></div>';
      
      t.myDiv.innerHTML = m;
      
      t.tcp = new CdispCityPicker ('pttrader', document.getElementById('ptrescity'), true, t.clickCitySelect, 0);
      t.tcpto = new CdispCityPicker ('pttraderTo', document.getElementById('ptcityTo'), true, t.clickCitySelect).bindToXYboxes(document.getElementById ('ptcityX'), document.getElementById ('ptcityY'));
      
      document.getElementById('pbTraderState').addEventListener('click', function(){
      t.toggleTraderState(this);
      }, false);
      document.getElementById('pbSaveRoute').addEventListener('click', function(){
      t.addTradeRoute();
      }, false);
      document.getElementById('pbShowRoutes').addEventListener('click', function(){
      t.showTradeRoutes();
      }, false);
      
      document.getElementById('pbtransportinterval').addEventListener('keyup', function(){
		if (isNaN(document.getElementById('pbtransportinterval').value)){ document.getElementById('pbtransportinterval').value=60 ;}
		Options.transportinterval = document.getElementById('pbtransportinterval').value;
		saveOptions();
      }, false);
      
      document.getElementById('pbtargetamountFood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountFood').value)) document.getElementById('pbtargetamountFood').value=0 ;
      }, false);
      document.getElementById('pbtargetamountWood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountWood').value)) document.getElementById('pbtargetamountWood').value=0 ;
      }, false);
      document.getElementById('pbtargetamountStone').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountStone').value)) document.getElementById('pbtargetamountStone').value=0 ;
      }, false);
      document.getElementById('pbtargetamountOre').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountOre').value)) document.getElementById('pbtargetamountOre').value=0 ;
      }, false);
      document.getElementById('pbtargetamountGold').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountGold').value)) document.getElementById('pbtargetamountGold').value=0 ;
      }, false);
      document.getElementById('pbtradeamountFood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountFood').value)) document.getElementById('pbtradeamountFood').value=0 ;
      }, false);
      document.getElementById('pbtradeamountWood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountWood').value)) document.getElementById('pbtradeamountWood').value=0 ;
      }, false);
      document.getElementById('pbtradeamountStone').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountStone').value)) document.getElementById('pbtradeamountStone').value=0 ;
      }, false);
      document.getElementById('pbtradeamountOre').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountOre').value)) document.getElementById('pbtradeamountOre').value=0 ;
      }, false);
      document.getElementById('pbtradeamountGold').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountGold').value)) document.getElementById('pbtradeamountGold').value=0 ;
      }, false);
     document.getElementById('pbminwagons').addEventListener('keyup', function(){
         if (isNaN(document.getElementById('pbminwagons').value)) document.getElementById('pbminwagons').value=100 ;
         Options.minwagons = parseInt(document.getElementById('pbminwagons').value);
         saveOptions();
     }, false)
      
      document.getElementById('pbshipFood').addEventListener('click', function(){
          if (document.getElementById('pbshipFood').checked==false) {
              document.getElementById('pbtargetamountFood').disabled = true;
              document.getElementById('pbtradeamountFood').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountFood').disabled = false;
            document.getElementById('pbtradeamountFood').disabled = false;
          }
      },false);
      document.getElementById('pbshipWood').addEventListener('click', function(){
          if (document.getElementById('pbshipWood').checked==false) {
              document.getElementById('pbtargetamountWood').disabled = true;
              document.getElementById('pbtradeamountWood').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountWood').disabled = false;
            document.getElementById('pbtradeamountWood').disabled = false;
          }
      },false);
      document.getElementById('pbshipStone').addEventListener('click', function(){
          if (document.getElementById('pbshipStone').checked==false) {
              document.getElementById('pbtargetamountStone').disabled = true;
              document.getElementById('pbtradeamountStone').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountStone').disabled = false;
            document.getElementById('pbtradeamountStone').disabled = false;
          }
      },false);
      document.getElementById('pbshipOre').addEventListener('click', function(){
          if (document.getElementById('pbshipOre').checked==false) {
              document.getElementById('pbtargetamountOre').disabled = true;
              document.getElementById('pbtradeamountOre').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountOre').disabled = false;
            document.getElementById('pbtradeamountOre').disabled = false;
          }
      },false);
      document.getElementById('pbshipGold').addEventListener('click', function(){
          if (document.getElementById('pbshipGold').checked==false) {
              document.getElementById('pbtargetamountGold').disabled = true;
              document.getElementById('pbtradeamountGold').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountGold').disabled = false;
            document.getElementById('pbtradeamountGold').disabled = false;
          }
      },false);
      window.addEventListener('unload', t.onUnload, false);
    }, 
    
    getRallypoint: function(cityId){
      var t = Tabs.transport;
      for (var k in Seed.buildings[cityId]){
           var buildingType  = parseInt(Seed.buildings[cityId][k][0]);
           var buildingLevel = parseInt(Seed.buildings[cityId][k][1]);
    	     var buildingName = unsafeWindow.buildingcost['bdg' + buildingType][0];
    	     if(DEBUG_TRACE) logit(buildingName + ' => Level: ' + buildingLevel);
    	     if (buildingName == "Rally Point"){
				return buildingLevel;
				break;
			 }
      }
	  return 0;
    },
      	  
    e_tradeRoutes: function(){
      var t = Tabs.transport;
      var now = new Date();
      if (t.traderState.running == true)    {
      	var now = new Date().getTime()/1000.0;
      	now = now.toFixed(0);
      	var last = Options.lasttransport;
      		//alert(last);    
        	// logit(now + ' / ' + (parseInt(last) + (Options.transportinterval*60)) );
      
      		if ( now > (parseInt(last) + (Options.transportinterval*60))){
				  t.checkdoTrades();
      		}
      }
	  //setTimeout(function(){ t.e_tradeRoutes();}, Options.transportinterval*60*1000);
	  setTimeout(function(){ t.e_tradeRoutes();}, Options.transportinterval*1000);
	  
    },
    	
	delTradeRoutes: function() {
		var t = Tabs.transport;	
		t.tradeRoutes= [];
	},
	
	addTradeRoute: function () {
		var valid = true;
		var t = Tabs.transport;
		var city = t.tcp.city.id;
		var ship_Food = document.getElementById('pbshipFood').checked;
		var ship_Wood = document.getElementById('pbshipWood').checked;
		var ship_Stone = document.getElementById('pbshipStone').checked;
		var ship_Ore = document.getElementById('pbshipOre').checked;
		var ship_Gold = document.getElementById('pbshipGold').checked;
		var target_Food = document.getElementById('pbtargetamountFood').value;
		var target_Wood = document.getElementById('pbtargetamountWood').value;
		var target_Stone = document.getElementById('pbtargetamountStone').value;
		var target_Ore = document.getElementById('pbtargetamountOre').value;
		var target_Gold = document.getElementById('pbtargetamountGold').value;
		var trade_Food = document.getElementById('pbtradeamountFood').value;
		var trade_Wood = document.getElementById('pbtradeamountWood').value;
		var trade_Stone = document.getElementById('pbtradeamountStone').value;
		var trade_Ore = document.getElementById('pbtradeamountOre').value;
		var trade_Gold = document.getElementById('pbtradeamountGold').value;
		var target_x = document.getElementById('ptcityX').value;
		var target_y = document.getElementById('ptcityY').value;
		var route_state = true;
				
		if (valid == true) {
			var lTR = t.tradeRoutes;
			lTR.push({
				city:				city,
				ship_Food:			ship_Food,
				target_Food:		target_Food,
				trade_Food: 		trade_Food,
				ship_Wood:			ship_Wood,
				target_Wood:		target_Wood,
				trade_Wood: 		trade_Wood,
				ship_Stone:			ship_Stone,
				target_Stone:		target_Stone,
				trade_Stone: 		trade_Stone,
				ship_Ore:			ship_Ore,
				target_Ore:			target_Ore,
				trade_Ore:	 		trade_Ore,
				ship_Gold:			ship_Gold,
				target_Gold:		target_Gold,
				trade_Gold: 		trade_Gold,
				target_x: 			target_x,
				target_y: 			target_y,
				route_state: 		"true"
			});
		}
		document.getElementById('pbTraderDivD').style.background ='#99FF99';
		setTimeout(function(){ (document.getElementById('pbTraderDivD').style.background =''); }, 1000);
	},
	showTradeRoutes: function () {
		var t = Tabs.transport;
		var popTradeRoutes = null;
		t.popTradeRoutes = new CPopup('pbShowTrade', 0, 0, 1100, 500, true, function() {clearTimeout (1000);});
		var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowTradeRoutes" id="pbRoutesQueue">';       
		t.popTradeRoutes.getMainDiv().innerHTML = '</table></div>' + m;
		t.popTradeRoutes.getTopDiv().innerHTML = '<TD><B>Transport routes:</td><BR><TD>ID</td><TD>From</td><TD>Enabled</td><TD>Target Food</td><TD>Trade Food</td></b>';
		t.paintTradeRoutes();
		t.popTradeRoutes.show(true)	;
	},
	paintTradeRoutes: function(){
	        var t = Tabs.transport;
	        var r = t.tradeRoutes;
	        var cityname;
			for (var i = (r.length-1); i>=0; i--) {
				for (var y=0; y< Seed.cities.length;y++) {
					if ( parseInt(Seed.cities[y][0]) == r[i].city) var cityname = Seed.cities[y][1];
				}    
				var queueId = i;
				t._addTab(queueId,cityname, r[i].target_x, r[i].target_y, r[i].ship_Food, r[i].target_Food, r[i].trade_Food,r[i].ship_Wood, r[i].target_Wood, r[i].trade_Wood,r[i].ship_Stone, r[i].target_Stone, r[i].trade_Stone,r[i].ship_Ore, r[i].target_Ore, r[i].trade_Ore,r[i].ship_Gold, r[i].target_Gold, r[i].trade_Gold);
	        }
	    },
	  
	 _addTab: function(queueId,cityname, cityX,cityY,ship_Food, target_Food, trade_Food,ship_Wood, target_Wood, trade_Wood,ship_Stone, target_Stone, trade_Stone,ship_Ore, target_Ore, trade_Ore,ship_Gold, target_Gold, trade_Gold){
	 	var t = Tabs.transport;
	     var row = document.getElementById('pbRoutesQueue').insertRow(0);
	     row.vAlign = 'top';
	     row.insertCell(0).innerHTML = queueId;
	     row.insertCell(1).innerHTML = cityname;
	     row.insertCell(2).innerHTML = cityX + ',' + cityY;
	     row.insertCell(3).innerHTML = ship_Food;
	 	 row.insertCell(4).innerHTML = target_Food;
	 	 row.insertCell(5).innerHTML = trade_Food;
	 	 row.insertCell(6).innerHTML = ship_Wood;
	 	 row.insertCell(7).innerHTML = target_Wood;
	 	 row.insertCell(8).innerHTML = trade_Wood;
	 	 row.insertCell(9).innerHTML = ship_Stone;
	 	 row.insertCell(10).innerHTML = target_Stone;
	 	 row.insertCell(11).innerHTML = trade_Stone;
	 	 row.insertCell(12).innerHTML = ship_Ore;
	 	 row.insertCell(13).innerHTML = target_Ore;
	 	 row.insertCell(14).innerHTML = trade_Ore;
	 	 row.insertCell(15).innerHTML = ship_Gold;
	 	 row.insertCell(16).innerHTML = target_Gold;
	 	 row.insertCell(17).innerHTML = trade_Gold;
	     row.insertCell(18).innerHTML = '<a class="button20" id="tradecancel_' + queueId + '"><span>Delete</span></a>';
	     document.getElementById('tradecancel_' + queueId).addEventListener('click', function(){
	        t.cancelQueueElement(queueId);
	     }, false);
	 },
	 cancelQueueElement: function(queueId){
	     var t = Tabs.transport;
	     var queueId = parseInt(queueId);
	     t.tradeRoutes.splice(queueId, 1);
	     t.showTradeRoutes();
	 },
	   
	saveTradeRoutes: function(){
		var t = Tabs.transport;
        var serverID = getServerId();
        GM_setValue('tradeRoutes_' + serverID, JSON2.stringify(t.tradeRoutes));
    },
    readTradeRoutes: function(){
        var t = Tabs.transport;
        var serverID = getServerId();
        s = GM_getValue('tradeRoutes_' + serverID);
        if (s != null) {
            route = JSON2.parse(s);
            for (k in route) 
                t.tradeRoutes[k] = route[k];
        }
    },
	saveTraderState: function(){
		var t = Tabs.transport;
        var serverID = getServerId();
        GM_setValue('traderState_' + serverID, JSON2.stringify(t.traderState));
    },
    readTraderState: function(){
        var t = Tabs.transport;
        var serverID = getServerId();
        s = GM_getValue('traderState_' + serverID);
        if (s != null) {
            state = JSON2.parse(s);
            for (k in state) 
                t.traderState[k] = state[k];
        }
    },
    toggleTraderState: function(obj){
		var t = Tabs.transport;
        if (t.traderState.running == true) {
            t.traderState.running = false;
            obj.value = "Transport = OFF";
			clearTimeout(t.checkdotradetimeout);
			t.count = 0;
        }
        else {
            t.traderState.running = true;
            obj.value = "Transport = ON";
			t.e_tradeRoutes();
        }
    },
	
	checkdoTrades: function(){
	var t = Tabs.transport;
	if(t.tradeRoutes.length==0) return;
	t.doTrades(t.count);
	t.count++;
	if(t.count < t.tradeRoutes.length){
			  t.checkdotradetimeout = setTimeout(function() { t.checkdoTrades();}, 5000);
			} else {
			  var now = new Date().getTime()/1000.0;
			  now = now.toFixed(0);
			  Options.lasttransport = now;
			  saveOptions();	
			  t.count = 0;
			}
	},
    
    doTrades: function(count){
    	var t = Tabs.transport;
   		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.gold =0;
		params.r1 =0;
		params.r2 =0;
		params.r3 =0;
		params.r4 =0 ;
		params.kid = 0;
		
		var carry_amount= 0;
		var wagons_needed=0;
		var citymax = 0;
		var city = t.tradeRoutes[count]["city"]; 
		var cityID = 'city' + city;
		
		
   	 	var xcoord = t.tradeRoutes[count]["target_x"];
    	var ycoord = t.tradeRoutes[count]["target_y"];
    	var trade_Food = t.tradeRoutes[count]["trade_Food"];
    	var trade_Wood = t.tradeRoutes[count]["trade_Wood"];
    	var trade_Stone = t.tradeRoutes[count]["trade_Stone"];
    	var trade_Ore = t.tradeRoutes[count]["trade_Ore"];
    	var trade_Gold = t.tradeRoutes[count]["trade_Gold"];
    	var target_Food = t.tradeRoutes[count]["target_Food"]; 
    	var target_Wood = t.tradeRoutes[count]["target_Wood"]; 
    	var target_Stone = t.tradeRoutes[count]["target_Stone"]; 
    	var target_Ore = t.tradeRoutes[count]["target_Ore"]; 
    	var target_Gold = t.tradeRoutes[count]["target_Gold"]; 
    	var ship_Food = t.tradeRoutes[count]["ship_Food"];
    	var ship_Wood = t.tradeRoutes[count]["ship_Wood"];
    	var ship_Stone = t.tradeRoutes[count]["ship_Stone"];
    	var ship_Ore = t.tradeRoutes[count]["ship_Ore"];
    	var ship_Gold = t.tradeRoutes[count]["ship_Gold"]; 
    	var citymax_Food = parseInt(Seed.resources[cityID]['rec1'][0] / 3600);
    	var citymax_Wood = parseInt(Seed.resources[cityID]['rec2'][0] / 3600);
    	var citymax_Stone = parseInt(Seed.resources[cityID]['rec3'][0] / 3600);
    	var citymax_Ore = parseInt(Seed.resources[cityID]['rec4'][0] / 3600);
    	var citymax_Gold = parseInt(Seed.citystats[cityID]['gold']);
    	var carry_Food = (citymax_Food - target_Food);
    	var carry_Wood = (citymax_Wood - target_Wood);
    	var carry_Stone = (citymax_Stone - target_Stone);
    	var carry_Ore = (citymax_Ore - target_Ore);
    	var carry_Gold = 0;
    	if (carry_Food < 0 || ship_Food==false) carry_Food = 0;
    	if (carry_Wood < 0 || ship_Wood==false) carry_Wood = 0;
    	if (carry_Stone < 0 || ship_Stone==false) carry_Stone = 0;
    	if (carry_Ore < 0 || ship_Ore==false) carry_Ore = 0;
    	if (trade_Food > 0 && (carry_Food > trade_Food)) carry_Food = parseInt(trade_Food);
    	if (trade_Wood > 0 && (carry_Wood > trade_Wood)) carry_Wood = parseInt(trade_Wood);
    	if (trade_Stone > 0 && (carry_Stone > trade_Stone)) carry_Stone = parseInt(trade_Stone);
    	if (trade_Ore > 0 && (carry_Ore > trade_Ore)) carry_Ore = parseInt(trade_Ore);
    	var wagons =  parseInt(Seed.units[cityID]['unt'+9]);
    	var rallypointlevel = t.getRallypoint(cityID);	
		if (rallypointlevel == 11) { rallypointlevel = 15; }
    	if (wagons > (rallypointlevel*10000)){ wagons = (rallypointlevel*10000); }
    	var featherweight = parseInt(Seed.tech.tch10);
    	var maxloadperwagon = ((featherweight *500) + 5000);
		var maxload = (maxloadperwagon* wagons);
		
		if(wagons <= 0) {logit('No wagons'); return; }

		for (var t=0; t< Seed.cities.length;t++) {
			if ( parseInt(Seed.cities[t][0]) == city) var cityname = Seed.cities[t][1];
		}                     
		
		var shift_Food = (maxload / 4);
		var shift_Wood = (maxload / 4);
		var shift_Stone = (maxload / 4);
		var shift_Ore = (maxload / 4);
					
		if ((maxload - carry_Food - carry_Wood - carry_Stone - carry_Ore) < 0){
			var shift_num=0;
			var shift_spare=0;
			
			// Check: See if load/4 is to big for some resources...
			if (carry_Food < shift_Food) {
				shift_spare += (shift_Food - carry_Food);
				shift_Food = carry_Food;
			}
			if (carry_Wood < shift_Wood) {
				shift_spare += (shift_Wood - carry_Wood);
				shift_Wood = carry_Wood;	
			}
			if (carry_Stone < shift_Stone) {
				shift_spare += (shift_Stone - carry_Stone);
				shift_Stone = carry_Stone;
			}
			if (carry_Ore < shift_Ore) {
				shift_spare += (shift_Ore - carry_Ore);
				shift_Ore = carry_Ore;
			}			
			 
		  while (shift_spare >1) {
				 if (carry_Food < (shift_Food + shift_spare)){
				    shift_spare = shift_spare - carry_Food;; 
				    shift_Food = carry_Food;
				 }
				 else{
				  shift_Food = (shift_Food + shift_spare);
				  shift_spare = shift_spare- shift_spare;
				}
				 if (carry_Wood < (shift_Wood + shift_spare)){
				    shift_spare = shift_spare - carry_Wood;; 
				    shift_Wood = carry_Wood;
				 }
				 else{
				  shift_Wood = shift_Wood + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				} 
        		if (carry_Stone < (shift_Stone + shift_spare)){
				    shift_spare = shift_spare - carry_Stone;; 
				    shift_Stone = carry_Stone;
				 }
				 else{
				  shift_Stone = shift_Stone + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
				 if (carry_Ore < (shift_Ore + shift_spare)){
				    shift_spare = shift_spare - carry_Ore;; 
				    shift_Ore = carry_Ore;
				 }
				 else{
				  shift_Ore = shift_Ore + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
			 }

		carry_Food = shift_Food;
		carry_Wood = shift_Wood;
		carry_Stone = shift_Stone;
		carry_Ore = shift_Ore;
		}
		
		if (maxload > (carry_Food + carry_Wood + carry_Stone + carry_Ore) && ship_Gold==true) {
		    if ((maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore)) > (citymax_Gold - target_Gold)){
		    	  carry_Gold = (citymax_Gold - target_Gold);
		    	  if (carry_Gold < 0 ) carry_Gold = 0;
		   	}
		    else carry_Gold = (maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore));
		    if (trade_Gold > 0 && (carry_Gold > trade_Gold)) carry_Gold = trade_Gold;
		}
		
		wagons_needed = ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) / maxloadperwagon);
		wagons_needed = wagons_needed.toFixed(0);	
		if (wagons_needed < ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) / maxloadperwagon)) wagons_needed++;	
		if ( wagons_needed < Options.minwagons ) { if(DEBUG_TRACE) logit('Small transport skipped'); return; }
        
		params.cid= city;
		params.type = "1";
		params.xcoord = xcoord;
		params.ycoord = ycoord;
		params.r1 = carry_Food;
		params.r2 = carry_Wood;
		params.r3 = carry_Stone;
		params.r4 = carry_Ore;
		params.gold = carry_Gold;
		params.u9 = wagons_needed;	
		
   		if ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) > 0) {
         actionLog('Trade   From: ' + cityname + "   To: " + xcoord + ',' + ycoord + "    ->   Wagons: " + wagons_needed);
         
         new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  loading: true,
                  onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
                  unsafeWindow.Modal.hideModalAll();
                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                  var ut = unsafeWindow.unixtime();
                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                  for(i = 0; i <= unitsarr.length; i++){
                  	if(params["u"+i]){
                  	unitsarr[i] = params["u"+i];
                  	}
                  }
                  var resources=new Array();
                  resources[0] = params.gold;
                  for(i=1; i<=4; i++){
                  	resources[i] = params["r"+i];
                  }
                  var currentcityid = city;
                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                  unsafeWindow.update_seed(rslt.updateSeed)
                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                  } else {
                  actionLog('FAIL: ' + cityname + ' -> ' + rslt.msg);
                  //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                  }
                  },
                  onFailure: function () {}
          });
        }
	},
	
	show: function(){
		var t = Tabs.transport;
    },
	hide: function(){
        var t = Tabs.transport;
    },
    onUnload: function(){
        var t = Tabs.transport;
        t.saveTradeRoutes();
		t.saveTraderState();
        
    },
}
 
/************************ Gold Collector ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].id] = 0;
    if (Options.pbGoldEnable)
      t.setEnable (true);
  },
  
  setEnable : function (tf){
    var t = CollectGold;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var happy = Seed.citystats['city'+ city.id].pop[2];
      var since = unixTime() - t.lastCollect['c'+city.id];
      if (happy>=Options.pbGoldHappy && since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.colHappy = happy;
        t.ajaxCollectGold (city, t.e_ajaxDone); 
        break;
      }
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
    if (rslt.ok)
      actionLog ('Collected '+ rslt.goldGained +' gold for '+ t.colCityName +' (happiness was '+ t.colHappy +')'); 
    else 
      actionLog ('Error collecting gold for '+ t.colCityName +': <SPAN class=boldRed>'+ rslt.errorMsg +'</span>'); 
  },
  
  ajaxCollectGold : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/levyGold.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify)  
          notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify)  
          notify (rslt);
      }
    });
  },
}

/************************ Refresh Every X minutes ************************/
var RefreshEvery  = {
  timer : null,
  init : function (){
    if (Options.pbEveryMins < 1)
      Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
  },
  doit : function (){
    actionLog ('Refreshing ('+ Options.pbEveryMins +' minutes expired)');
    reloadKOC();
  }
}

/************************ Fairie Killer ************************/
var FairieKiller  = {
  saveFunc : null,
  init : function (tf){
    if (firefoxVersion.substring(0,4) == '4.0b')  // bug in firefox 4.0b10 causes syntax error with: "var func = eval ('function (){}');"
      return;
    FairieKiller.saveFunc = unsafeWindow.Modal.showModalUEP;
    FairieKiller.setEnable (tf);
  },
  setEnable : function (tf){
    if (tf)
      unsafeWindow.Modal.showModalUEP = eval ('function (a,b,c) {actionLog ("Blocked Faire popup");}');
    else
      unsafeWindow.Modal.showModalUEP = FairieKiller.saveFunc;
  },
}

/********** facebook watchdog: runs only in 'http://apps.facebook.com/kingdomsofcamelot/*' instance!  ******/
function facebookWatchdog (){
  var INTERVAL = 50000; // wait 50 seconds minute before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  
// TODO: actionLog ?  
  function watchdog (){
    try {
//      if (document.getElementById('app_content_130402594779').firstChild.firstChild.childNodes[1].firstChild.tagName!='IFRAME'){
      if (document.getElementById('app_content_130402594779') == null){
        logit ("KOC NOT FOUND!"); 
        KOCnotFound(5*60);
      } 
    } catch (e){
      logit ("KOC NOT FOUND!"); 
      KOCnotFound(4*60);
    } 
  }
}


function kocWatchdog (){
  var INTERVAL = 30000; // wait 30 seconds before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  function watchdog (){
logit ("KOC WATCHDOG: "+ document.getElementById('mod_maparea'));    
    if (document.getElementById('mod_maparea')==null){
      actionLog ("KOC not loaded");
      KOCnotFound(2*60);
    }     
  }
}


function KOCnotFound(secs){
  var div;
  var countdownTimer = null;
  var endSecs = (new Date().getTime()/1000) + secs;
    
  div = document.createElement('div');
  div.innerHTML = '<DIV style="font-size:18px; background-color:#a00; color:#fff"><CENTER><BR>KOC Power Bot has detected that KOC is not loaded<BR>\
      Refreshing in <SPAN id=pbwdsecs></span><BR><INPUT id=pbwdcan type=submit value="Cancel Refresh"><BR><BR></div>';
  document.body.insertBefore (div, document.body.firstChild);
  document.getElementById('pbwdcan').addEventListener('click', cancel, false);
  countdown();
      
  function countdown (){
    var secsLeft = endSecs - (new Date().getTime()/1000);
    document.getElementById('pbwdsecs').innerHTML = timestr(secsLeft);
    if (secsLeft < 0)
      reloadKOC();
    countdownTimer = setTimeout (countdown, 1000);
  }
  function cancel (){
    clearTimeout (countdownTimer);
    document.body.removeChild (div);
  }
}



var WideScreen = {
  chatIsRight : false,
  useWideMap : false,
  rail : null,
  
  init : function (){
    t = WideScreen;
    if (GlobalOptions.pbWideScreen){
      t.rail = searchDOM (document.getElementById('mod_maparea'), 'node.className=="maparea_rrail"', 10);
      GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important}');  
      try {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'));
        document.getElementById('crossPromoBarContainer').parentNode.removeChild(document.getElementById('crossPromoBarContainer'));
      } catch (e) {
      }
    }
  },
        
  setChatOnRight : function (tf){
    t = WideScreen;
    if (tf == t.chatIsRight || !GlobalOptions.pbWideScreen)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1000); 
      chat.style.top = '-624px';
      chat.style.left = '760px';
      chat.style.height = '720px';
      chat.style.background = 'url("'+ CHAT_BG_IMAGE +'")';
      document.getElementById('mod_comm_list1').style.height = '580px';
      document.getElementById('mod_comm_list2').style.height = '580px';
    } else {
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      chat.style.top = '0px';
      chat.style.left = '0px';
      chat.style.height = '';
      chat.style.background = '';
      document.getElementById('mod_comm_list1').style.height = '287px';
      document.getElementById('mod_comm_list2').style.height = '287px';
    }
    t.chatIsRight = tf;
  },
  
  useWideMap : function (tf) {
  	t = WideScreen;
  	if (tf == t.useWideMap || !GlobalOptions.pbWideScreen)
  		return;
  	if (tf){
      t.rail.style.display = 'none';
      document.getElementById('mapwindow').style.height = "436px";
      document.getElementById('mapwindow').style.width = "1220px";
      document.getElementById('mapwindow').style.zIndex = "50";
  	} else {
      t.rail.style.display = 'block';
      document.getElementById('mapwindow').style.height = "439px";
      document.getElementById('mapwindow').style.width = "760px";
      document.getElementById('mapwindow').style.zIndex = "";
  	}
  },
}



/*******************   KOC Map interface ****************/
// 0:bog, 10:grassland, 11:lake, 20:woods, 30:hills, 40:mountain, 50:plain, 51:city / barb, 53:misted city
function CMapAjax (){
  this.normalize = normalize;  
  this.request = request;

  function request (left, top, width, notify){    
    var left = parseInt(left / 5) * 5;
    var top = parseInt(top / 5) * 5;
    var width = parseInt((width+4) / 5) * 5;
    
    var blockString = generateBlockList(left, top, width);
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.blocks = blockString;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify(left, top, width, rslt);
      },
      onFailure: function (rslt) {
        notify(left, top, width, rslt);
      }
    });
    function generateBlockList (left, top, width) {
      var width5 = parseInt(width / 5);
      var bl = [];
      for (x=0; x<width5; x++){
        var xx = left + (x*5);
        if (xx > 745)
          xx -= 750;
        for (y=0; y<width5; y++){
          var yy = top + (y*5);
          if (yy > 745)
            yy -= 750;
          bl.push ('bl_'+ xx +'_bt_'+ yy);
        }
      }
      return bl.join(",");
    }
  }
 
  function normalize  (x){
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  }
}

var anticd = {
  isInited : false,
  KOCversion : '?',
  
  init: function (){
    if (this.isInited)
      return this.KOCversion;
    unsafeWindow.cm.cheatDetector.detect = eval ('function (){}');
    var scripts = document.getElementsByTagName('script');
    for (var i=0; i<scripts.length; i++){
      if (scripts[i].src.indexOf('camelotmain') >=0){
        break; 
      }
    }
    if (i<scripts.length){
      var m = scripts[i].src.match (/camelotmain-(.*).js/);  
      if (m)
        this.KOCversion = m[1];
    }
    this.isInited = true;
    // more coming soon :) 
  },
  
  getKOCversion : function (){
    return this.KOCversion;
  },
}
try {
  anticd.init ();
} catch (e){
  logit ("ANTICD error: "+ e);
}

var tabManager = {
  tabList : {},           // {name, obj, div}
  currentTab : null,
  
  init : function (mainDiv){
    var t = tabManager;
    var sorter = [];
    for (k in Tabs){
      if (!Tabs[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs[k].tabOrder != null)
          sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        t.tabList[k].div = document.createElement('div');
      }
    }

    sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<TABLE cellspacing=0 class=pbMainTab><TR>';
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id=pbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab =t.tabList[k] ;
      document.getElementById('pbtc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div; 
      div.style.display = 'none';
      div.style.height = '100%';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "INIT ERROR: "+ e;
      }
    }
    
    if (t.currentTab == null)
      t.currentTab = sorter[0][1];    
    t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), true);
    t.currentTab.div.style.display = 'block';
  },
  
  hideTab : function (){
    var t = tabManager;
    t.currentTab.obj.hide();
  },
  
  showTab : function (){
    var t = tabManager;
    t.currentTab.obj.show();
  },
    
  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager;
    newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pbtc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}

function onUnload (){
  Options.pbWinPos = mainPop.getLocation();
  saveOptions();
}

function mouseMainTab (me){   // right-click on main button resets window location
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    tabManager.showTab();
    Options.pbWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.pbWinIsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.pbWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.pbWinIsOpen = true;
  saveOptions();
}

function addMyFunction (func){      // add function to run in our own scope
  unsafeWindow[func.name] = func;
}

function addUwFunction (func){      // add function to run in unsafeWindow's scope
  var scr = document.createElement('script');
	scr.innerHTML = func.toString();
	document.body.appendChild(scr);
}

function alterUwFunction (funcName, frArray){
  try {
    funcText = unsafeWindow[funcName].toString();
    rt = funcText.replace ('function '+funcName, 'function');
    for (i=0; i<frArray.length; i++){
      x = rt.replace(frArray[i][0], frArray[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    js = funcName +' = '+ rt;
  	var scr=document.createElement('script');
  	scr.innerHTML=js;
  	document.body.appendChild(scr);
  	return true;
  } catch (err) {
    return false;
  }
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

var knightRoles = {
  Foreman : 'politics',
  Marshall : 'combat',
  Alchemystic : 'intelligence',
  Steward : 'resourcefulness',
};

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

var fortNamesShort = {
  53: "Crossbows",
  55: "Trebuchet",
  60: "Trap",
  61: "Caltrops",
  62: "Spiked Barrier",
}

// onClick (city{name, id, x, y}, x, y)   city may be null!
function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "castleBut castleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "castleBut castleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true ); // event type,bubbling,cancelable
        that.coordBoxX.dispatchEvent(evt);
        that.coordBoxY.dispatchEvent(evt);
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.x, that.city.y);
    }
  }

  function selectBut (idx){
    document.getElementById(this.id+'_'+idx).click();
  }

  function bindToXYboxes (eX, eY){
    function CboxHandler (t){
      var that = t;
      this.eventChange = eventChange;
      if (that.city){
        eX.value = that.city.x;
        eY.value = that.city.y;
      }
      function eventChange (){
		var xValue=that.coordBoxX.value.trim();
			var xI=/^\s*([0-9]+)[\s|,|-|.]+([0-9]+)/.exec(xValue); 				
			if(xI) {
				that.coordBoxX.value=xI[1]
				that.coordBoxY.value=xI[2]
			}
        var x = parseInt(that.coordBoxX.value, 10);
        var y = parseInt(that.coordBoxY.value, 10);
        if (isNaN(x) || x<0 || x>750){
          that.coordBoxX.style.backgroundColor = '#ff8888';
          return;
        }
        if (isNaN(y) || y<0 || y>750){
          that.coordBoxY.style.backgroundColor = '#ff8888';
          return;
        }
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
        if (that.notify != null)
          that.notify (null, x, y);
      }
      return false;
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.maxLength=8;
    eY.maxLength=3;
    eX.style.width='2em';    
    eY.style.width='2em';    
    eX.addEventListener('change', bh.eventChange, false);
    eY.addEventListener('change', bh.eventChange, false);
  }

  this.selectBut = selectBut;
  this.bindToXYboxes = bindToXYboxes;
  this.coordBoxX = null;
  this.coordBoxY = null;
  this.id = id;
  this.dispName = dispName;
  this.prefixLen = id.length+1;
  this.notify = notify;
  this.selected = null;
  this.city = null;
  var m = '';
  for (var i=0; i<Cities.cities.length; i++)
    m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};

function setCities(){
  Cities.numCities = Seed.cities.length;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){
    city = {};
    city.idx = i;
    city.id = parseInt(Seed.cities[i][0]);
    city.name = Seed.cities[i][1];
    city.x = parseInt(Seed.cities[i][2]);
    city.y = parseInt(Seed.cities[i][3]);
    city.tileId = parseInt(Seed.cities[i][5]);
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}


function dialogRetry (errMsg, seconds, onRetry, onCancel){
  seconds = parseInt(seconds);
  var pop = new CPopup ('pbretry', 0, 0, 400,200, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL Retry" \>';
  document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
  pop.show(true);
  
  document.getElementById('paretryErrMsg').innerHTML = errMsg;
  document.getElementById('paretrySeconds').innerHTML = seconds;
  var rTimer = setTimeout (doRetry, seconds*1000);
  countdown ();

  function countdown (){
    document.getElementById('paretrySeconds').innerHTML = seconds--;
    if (seconds > 0)
      cdTimer = setTimeout (countdown, 1000);
  }
  function doCancel(){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.destroy();
    onCancel ();
  }
  function doRetry (){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.show(false);
    onRetry();
  }
}

function implodeUrlArgs (obj){
  var a = [];
  for (var k in obj)
    a.push (k +'='+ encodeURI(obj[k]) );
  return a.join ('&');    
}

// NOTE: args can be either a string which will be appended as is to url or an object of name->values
function addUrlArgs (url, args){
  if (!args)
    return url;
  if (url.indexOf('?') < 0)
    url += '?';
  else if (url.substr(url.length-1) != '&')
    url += '&';    
  if (matTypeof(args == 'object'))
    return url + implodeUrlArgs (args);    
  return url + args;
}

// emulate protoype's Ajax.Request ...
function AjaxRequest (url, opts){
  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  var ajax = null;
  
  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");
  
  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();  
    
  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (method == 'GET'){
    addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
    } else {
      if (opts.onChange) opts.onChange (ajax);
    }
  }  
    
  ajax.open(method, url, true);   // always async!

  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);
      
  if (method == 'POST'){
    var a = [];
    for (k in opts.parameters)
      a.push (k +'='+ opts.parameters[k] );
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}   


function MyAjaxRequest (url, o, noRetryX){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }
  function myFailure(){
    var o = {};
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }
  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (window.EmulateAjaxError){
      rslt.ok = false;  
      rslt.error_code=8;
    }
    if (rslt.ok){
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}

// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  return 'neutral';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

function distance (d, f, c, e) {
  var a = 750;
  var g = a / 2;
  var b = Math.abs(c - d);
  if (b > g)
    b = a - b;
  var h = Math.abs(e - f);
  if (h > g)
    h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};


// returns {count, maxlevel}
function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i<33; i++){
    if (b['pos'+i] && b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
    }
  }
  return ret;
}

// example: http://www150.kingdomsofcamelot.com
var myServerId = null;
function getServerId() {
  if (myServerId == null){
    var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
    if (m)
      myServerId = m[1];
    else
      myServerId = '??';
  }
  return myServerId;
}

function logit (msg){
  var now = new Date();
  GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}



function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('Options_'+serverID, JSON2.stringify(Options));}, 0);
}

function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('Options_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          Options[k][kk] = opts[k][kk];
      else
        Options[k] = opts[k];
    }
  }
}

function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}

function createButton (label){
  var a=document.createElement('a');
  a.className='button20';
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text);
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}
function coordLink (x, y){
  var m = [];
  m.push ('(<a onclick="pbGotoMap (');
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


unsafeWindow.pbGotoMap = function (x, y){
  if (Options.hideOnGoto)
    hideMe ();
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

/****************************  Spam Tab  ******************************/
Tabs.Spam = {
  tabOrder : 30,                    // order to place tab in top bar
  tabLabel : 'Spam',            // label to show in main window tabs
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.Spam;
    t.myDiv = div;
    var m = '<DIV class=pbStat>Advertise</div><TABLE class=pbTab width=100% height=0% ><TR align="center">';

       if (Options.spamconfig.aspam == true) {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam On"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam Off"></td>';
       }

       if (Options.spamconfig.spamstate == 'a') {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To Alliance"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To  Global "></td>';
       }
        m += '</tr></table></div>';
       m += '<DIV class=pbStat>Settings</div><TABLE class=pbTab><TR align="left">';
        m += '<tr><td>Automatically post every <INPUT id=pbSpamMin type=text size=2 maxlength=3 value="'+ Options.spamconfig.spammins +'"  \> minutes</td></tr><BR>\
              <tr><TD><TABLE cellpadding=0 cellspacing=0>\
              <TD align=left>Your spam: &nbsp; </td><TD><INPUT id=pbSpamAd type=text size=60 maxlength=500 value="'+ Options.spamconfig.spamvert +'" \></td></tr>\
              </table><BR>';
    
    t.myDiv.innerHTML = m;

    document.getElementById('pbSpamEnable').addEventListener ('click', function(){t.toggleon(this);}, false);
    document.getElementById('pbSpamAd').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamMin').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamState').addEventListener ('click', function(){t.togglespam(this);}, false);
 },

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.Spam;
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.Spam;

  },

 e_spamOptChanged : function (){
  var t = Tabs.Spam;
  Options.spamconfig.spamvert = document.getElementById('pbSpamAd').value;
  Options.spamconfig.spammins = document.getElementById('pbSpamMin').value;

 },

 togglespam: function(obj){
  var t = Tabs.Spam;
  if (Options.spamconfig.spamstate == 'a') {
   Options.spamconfig.spamstate = 'g';
   obj.value = "Send To  Global ";
  }
  else {
   Options.spamconfig.spamstate = 'a';
   obj.value = "Send To Alliance";
  };

 },

 toggleon: function(obj){
  var t = Tabs.Spam;
  if (Options.spamconfig.aspam == true) {
   Options.spamconfig.aspam = false;
   obj.value = "Spam Off";
  }
  else {
   Options.spamconfig.aspam = true;
   obj.value = "Spam On";
  };

 },
};  

var SpamEvery  = {
  timer : null,
  init : function (){

    if (Options.spamconfig.spammins < 1)
      Options.spamconfig.spammins = 1;
    SpamEvery.setEnable (Options.spamconfig.aspam);
  },
  setEnable : function (tf){
    var t = SpamEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.count, '60000');
  },
  count : function (){
   var t = SpamEvery;
   if (Options.spamconfig.atime > Options.spamconfig.spammins) {
    Options.spamconfig.atime = 2;
    t.doit ();
   } else {
    Options.spamconfig.atime = (Options.spamconfig.atime + 1);
    SpamEvery.init ();
   }
  },
  doit : function (){
    actionLog ('Spamming ('+ Options.spamconfig.spammins +' minutes expired)');
    sendChat ("/" + Options.spamconfig.spamstate + " " +  Options.spamconfig.spamvert);
    SpamEvery.init ();
  }
}

/**********************************************************************************/
var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];  
  this.funcNew = null;
  try {
    var funcText = unsafeWindow[funcName].toString();
    var rt = funcText.replace ('function '+ funcName, 'function');
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
  }
      
  function setEnable (tf){
    if (t.funcNew == null)
      return;
    if (t.isEnabled != tf){
      if (tf){
      	var scr=document.createElement('script');
      	scr.innerHTML = funcName +' = '+ t.funcNew;
      	document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 0);
      	t.isEnabled = true;
      } else {
        unsafeWindow[t.funcName] = t.funcOld;
        t.isEnabled = false;
      }
    }
  }
  function isAvailable (){
    if (t.funcNew == null)
      return false;
    return true;
  }
};


function makeButton20 (label){
  var a = document.createElement('a');
  a.className = "button20 ptButton20";
  var s = document.createElement('span');
  s.innerHTML = label;
  a.appendChild (s);
  return a;
}

function strButton20 (label, tags){
  if (tags == null)
    tags = '';
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}

function reloadKOC (){
  var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+getServerId();
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ getServerId() +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}
  
function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (var k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');
}

function cityStatusString (cs){
  if (cs==4)
    return 'Vacation';
  if (cs==3)
    return 'Truce';
  if (cs==2)
    return 'Beg Protection';
  return 'Normal';
}    

// Simple method, as if it were typed in thru DOM
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

// works well, but message is not echoed back to local client
Chat = {
  params : null,

  sendWhisper : function (msg, who, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 3;
    this.params.name = who;
    this._sendit (msg, notify);
  },

  sendGlobal : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 1;
    this._sendit (msg, notify);
  },

  sendAlliance : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 2;
    this._sendit (msg, notify);
  },

  _sendit : function (msg, notify){
    function strip(s) {
       return s.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    this.params.comment = strip (msg);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendChat.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: this.params,
      onSuccess: function(transport) {
        if (notify)
          notify ();
      },
      onFailure: function(transport) {
        if (notify)
          notify ();
      }
    });
  },
}



/************  LIB classes/functions .... **************/

DebugTimer = {
  startTime : 0,
  start : function (){
    now = new Date();
    DebugTimer.startTime = now.getTime();
  },
  getMillis : function (){
    now = new Date();
    return now.getTime() - DebugTimer.startTime;
  },
  display : function (label, noReset){
    now = new Date();
    elapsed = now.getTime() - DebugTimer.startTime;
    logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};


function debugPos  (e){
  return '['+ e.tagName +'] client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
}

function CwaitForElement (id, timeout, notify){
  this.check = check;
  this.end = new Date().getTime() + timeout;
  var t = this;
  this.check();
  function check(){
    if (document.getElementById (id))
      notify (true);
    else if (new Date().getTime() > t.end)
      notify (false);
    else
      setTimeout (t.check, 250);
  }
}

function clickWin (win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
}
    
function debugElement  (e){
  var x = unsafeWindow.Object.clone (e.wrappedJSObject);
  x.innerHTML = '';
  x.innerText = '';
  x.textContent = '';
  return inspect (x, 1, 1);
}     

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetLeft;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

function DOMtree (e, levels){
  var m = [];
  level (e, levels, 0);
  
  function level (e, levels, cur){
    try {        
      for (var i=0; i<cur; i++)
        m.push('  ');
      if (!e.tagName)
        m.push ('?');
      else
        m.push (e.tagName);
      if (e.id){
        m.push (' id=');
        m.push (e.id);
      }
      if (e.name){
        m.push (' name=');
        m.push (e.name);
      }
      if (e.className){
        m.push (' class=');
        m.push (e.className);
      }
      if (e.style && e.style.display && e.style.display.indexOf('none')>0)
        m.push (' hidden');
       m.push ('\n');
      if (cur < levels){
        for (var c=0; c<e.childNodes.length; c++){
          level (e.childNodes[c], levels, cur+1);
        }
      }
    } catch (e) {
      m.push ('UNAVAILBLE!\n');
    }
  }
  return m.join('');  
}

function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x; 
}
function parseIntZero (n){
  n = n.trim();
  if (n == '')
    return 0;
  return parseInt(n, 10);
}


function getFirefoxVersion (){
  var ver='', i;
  var ua = navigator.userAgent;  
  if (ua==null || (i = ua.indexOf('Firefox/'))<0)
    return;
  return ua.substr(i+8);
}

var WinManager = {
  wins : {},    // prefix : CPopup obj
  didHide : [],
  
  
  get : function (prefix){
    var t = WinManager;
    return t.wins[prefix];
  },
  
  add : function (prefix, pop){
    var t = WinManager;
    t.wins[prefix] = pop;
    if (unsafeWindow.cpopupWins == null)
      unsafeWindow.cpopupWins = {};
    unsafeWindow.cpopupWins[prefix] = pop;
  },
  
  hideAll : function (){
    var t = WinManager;
    t.didHide = [];
    for (k in t.wins){
      if (t.wins[k].isShown()){
        t.didHide.push (t.wins[k]);
        t.wins[k].show (false);
      } 
    }
  },
  restoreAll : function (){
    var t = WinManager;
    for (var i=0; i<t.didHide.length; i++)
      t.didHide[i].show (true);
  },
  
  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
    delete unsafeWindow.cpopupWins[prefix];
  }    
}


// creates a 'popup' div
// prefix must be a unique (short) name for the popup window
function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 111111;
    
  // protos ...
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainDiv = getMainDiv;
  this.getLayer = getLayer;
  this.setLayer = setLayer;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.focusMe = focusMe;
  this.isShown = isShown;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;
  this.autoHeight = autoHeight;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'CPopup '+ prefix +'_CPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'hidden';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td></tr>\
      <TR><TD height=100% valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);
  
  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);
  
  function e_divClicked (){
    t.focusMe();
  }  
  function e_XClose (){
    t.show(false);
    if (t.onClose != null)
      t.onClose();
  }
  function autoHeight (onoff){
    if (onoff)
      t.div.style.height = '';  
    else
      t.div.style.height = t.div.style.maxHeight;
  }
  function focusMe (){
    t.setLayer(5);
    for (k in unsafeWindow.cpopupWins){
      if (k != t.prefix)
        unsafeWindow.cpopupWins[k].unfocusMe(); 
    }
  }
  function unfocusMe (){
    t.setLayer(-5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }
  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }
  function destroy (){
    document.body.removeChild(t.div);
    WinManager.delete (t.prefix);
  }
  function centerMe (parent){
    if (parent == null){
      var coords = getClientCoords(document.body);
    } else
      var coords = getClientCoords(parent);
    var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
    var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
    if (x<0)
      x = 0;
    if (y<0)
      y = 0;
    t.div.style.left = x +'px';
    t.div.style.top = y +'px';
  }
  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }
  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }
  function isShown (){
    return t.div.style.display == 'block';
  }
  function show(tf){
    if (tf){
      t.div.style.display = 'block';
      t.focusMe ();
    } else {
      t.div.style.display = 'none';
    }
    return tf;
  }
  function toggleHide(t){
    if (t.div.style.display == 'block') {
      return t.show (false);
    } else {
      return t.show (true);
    }
  }
}

function CWinDrag (clickableElement, movingDiv, enabled) {
  var t=this;
  this.setEnable = setEnable;
  this.setBoundRect = setBoundRect;
  this.debug = debug;
  this.dispEvent = dispEvent;
  this.lastX = null;
  this.lastY = null;
  this.enabled = true;
  this.moving = false;
  this.theDiv = movingDiv;
  this.body = document.body;
  this.ce = clickableElement;
  this.moveHandler = new CeventMove(this).handler;
  this.outHandler = new CeventOut(this).handler;
  this.upHandler = new CeventUp(this).handler;
  this.downHandler = new CeventDown(this).handler;
  this.clickableRect = null;
  this.boundRect = null;
  this.bounds = null;
  this.enabled = false;
  if (enabled == null)
    enabled = true;
  this.setEnable (enabled);

  function setBoundRect (b){    // this rect (client coords) will not go outside of current body
    this.boundRect = boundRect;
    this.bounds = null;
  }

  function setEnable (enable){
    if (enable == t.enabled)
      return;
    if (enable){
      clickableElement.addEventListener('mousedown',  t.downHandler, false);
      t.body.addEventListener('mouseup', t.upHandler, false);
    } else {
      clickableElement.removeEventListener('mousedown', t.downHandler, false);
      t.body.removeEventListener('mouseup', t.upHandler, false);
    }
    t.enabled = enable;
  }

  function CeventDown (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.bounds == null){
        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
      }
      if (me.button==0 && t.enabled){
        t.body.addEventListener('mousemove', t.moveHandler, true);
        t.body.addEventListener('mouseout', t.outHandler, true);
        t.lastX = me.clientX;
        t.lastY = me.clientY;
        t.moving = true;
      }
    }
  }

  function CeventUp  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0){
        t.moveHandler (me);
      }
    }
  }

  function CeventMove (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.enabled && !t.wentOut){
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
        if (newTop < t.bounds.top){     // if out-of-bounds...
          newTop = t.bounds.top;
          _doneMoving(t);
        } else if (newLeft < t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } else if (newLeft > t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } else if (newTop > t.bounds.bot){
          newTop = t.bounds.bot;
          _doneMoving(t);
        }
        t.theDiv.style.top = newTop + 'px';
        t.theDiv.style.left = newLeft + 'px';
        t.lastX = me.clientX;
        t.lastY = me.clientY;
      }
    }
  }

  function debug  (msg, e){
    logit ("*************** "+ msg +" ****************");
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
  }

  function dispEvent (msg, me){
    logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
  }
}

function inspect(obj, maxLevels, level, doFunctions){
  var str = '', type, msg;
  if(level == null)  level = 0;
  if(maxLevels == null) maxLevels = 1;
  if(maxLevels < 1)
      return 'Inspect Error: Levels number must be > 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i<level; i++)
    indent += '  ';
  for(property in obj) {
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
    }
    catch(err) {
      // Is there some properties in obj we can't access? Print it red.
      if(typeof(err) == 'string') msg = err;
      else if(err.message)        msg = err.message;
      else if(err.description)    msg = err.description;
      else                        msg = 'Unknown';
      str += '(Error) ' + property + ': ' + msg +"\n";
    }
  }
  str += "\n";
  return str;
}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { 
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}
String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039' };
String.prototype.htmlSpecialChars = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}
String.prototype.htmlSpecialCharsDecode = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret = ret.split(this.entityTrans[k]).join(k);
  return ret;
}
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

function matTypeof (v){
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
//    else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object Array]')
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}


function tbodyScroller (tbody, maxHeight){  
  tbody.style.maxHeight = '';
  tbody.style.height = '';
  tbody.style.overflowX = 'hidden';
  if (parseInt(tbody.clientHeight) > maxHeight){
    tbody.style.height = maxHeight + 'px';
    tbody.style.maxHeight = maxHeight + 'px';
    tbody.style.overflowY = 'auto';
  }
}
function getRemainingHeight (e, cont){
  var ec = getClientCoords(e);
  var cc = getClientCoords(cont);
  return cont.clientHeight - (ec.y - cc.y);
}


function addCommasInt(n){
  nStr = parseInt(n) + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) {
    nStr = nStr.replace(rgx, '$1' + ',' + '$2');
  }
  return nStr;
}

function addCommas(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function unixTime (){
  return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}
function htmlOptions (a, curVal){
  m = '';
  for (k in a)
    m += '<OPTION value="'+ k +'"'+ (k==curVal?' SELECTED':'')  +'>'+ a[k] +'</option>';
  return m;
}
function getFunctionName (func){
  var name=/\W*function\s+([\w\$]+)\(/.exec(func);
  if (!name)
    return '';
  return name[1];
}

function findAllBetween (txt, find1, find2){
  var m = [];
  var last = 0;
  while ( (i1=txt.indexOf(find1, last))>=0 && (i2=txt.indexOf (find2, i1))>=0 ) {
    m.push (txt.substring(i1+find1.length, i2));
    last = i2 + find2.length;
  }
  return m;
}

function strUpTo (s, find){
  var i = s.indexOf(find);
  if (i > 0)
    return s.substr(0, i);
  return s;
}

/********
 Xd Xh
 Xh Xm
 Xm Xs
 Xs
********/
function timestrShort(time) {
  time = parseInt (time);
  if (time > 86400){
    var m = [];
    time /= 3600;
    m.push (parseInt(time/24)); 
    m.push ('d ');
    m.push (parseInt(time%24)); 
    m.push ('h ');
    return m.join ('');    
  } else
    return timestr (time);
}

/**********************
 part       full
 Xd Xh Xm   Xd Xh Xm Xs
 Xh Xm      Xh Xm Xs
 Xm Xs      Xm Xs
 Xs         Xs
**********************/
function timestr(time, full) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  t + 's';
  if (t > 86400){
    m.push (parseInt(t/86400)); 
    m.push ('d ');
    t %= 86400;
  }  
  if (t>3600 || time>3600){
    m.push (parseInt(t/3600)); 
    m.push ('h ');
    t %= 3600;
  }  
  m.push (parseInt(t/60)); 
  m.push ('m');
  if (full || time<=3600 ){
    m.push (' ');
    m.push (t%60);
    m.push ('s');  
  }
  return m.join ('');
}

/************  LIB singletons .... **************/
// TODO: fix REopening window
var WINLOG_MAX_ENTRIES = 1000;     // TODO
var WinLog = {
  state : null,
  win: null,
  eOut : null,
  lastE : null,
  enabled : true,
  reverse : true,
  busy : false,
isOpening : false,

  open : function (){
    var t = WinLog;

    function eventButClear(){
      var t = WinLog;
      t.lastE = null;
      t.eOut.innerHTML ='';
    }
    function eventButReverse(){
      var t = WinLog;
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
      for (i=n-2; i>=0; i--){
        t.eOut.appendChild (t.eOut.childNodes[i]);
      }
      t.busy = false;
    }
    
    if (!t.win || t.win.closed){
t.isOpening = true;  
// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window? huh?
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
      t.lastE = null;
      t.state = 1;
    }
  },

  writeText : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.write (msg.htmlSpecialChars());
  },
  
  write : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.open();
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

    
/*********************************** Gifts TAB ***********************************/
function explodeUrlArgs (url){
  var i = url.indexOf ('?');
  var a = url.substr(i+1).split ('&');
  var args = {};
  for (i=0; i<a.length; i++){
    var s = a[i].split ('=');
    args[s[0]] = s[1];
  }
  return args;
}


// returns: page text or null on comm error
function GM_AjaxPost (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxPost ('+ label +'): ' + url +'\n'+ inspect (args, 5, 1));
  GM_xmlhttpRequest({
    method: "post",
    url: url,
    data: implodeUrlArgs(args),
    headers: { "Content-Type": "application/x-www-form-urlencoded", 'X-Requested-With': 'XMLHttpRequest', 'X-Prototype-Version': '1.6.1',
               'Accept': 'text/javascript, text/html, application/xml, text/xml, */*' },
    onload: function (rslt) {
      if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ( 'GM_AjaxPost.onLoad ('+ label +'):\n '  + inspect (rslt, 6, 1));  
      notify (rslt.responseText);
    },
    onerror: function () {
      notify (null);
    },
  }); 
}

// returns: page text or null on comm error
function GM_AjaxGet (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxGet ('+ label +'): ' + url);
  GM_xmlhttpRequest({
    method: "get",
    url: addUrlArgs(url, args),
    onload: function (rslt) {
      if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ( 'GM_AjaxGet.onLoad ('+ label +')  len='+ rslt.responseText.length +':\n '  + inspect (rslt, 6, 1));  
      notify (rslt.responseText);
    },
    onerror: function () {
      notify (null);
    },
  }); 
}         
  
Tabs.Gifts = {
  tabOrder : 3,
  gifts : null,
  myDiv : null,
  doList : [], // list of gifts to accept 
  doServer : 0,
  accepting : false,
    
  init : function (div){
    var t = Tabs.Gifts;
    t.myDiv = div;    
    div.innerHTML = '<TABLE cellpadding=0 cellspacing=0 class=pbTab width=100%><TR><TD width=200></td><TD align=center><INPUT id="pasubGifts" type=submit value="Check for Gifts" \></td><TD width=200 align=right><INPUT id=paGiftHelp type=submit value=HELP></td></tr></table><HR>\
        <DIV id=giftDiv style="width:100%; min-height:300px; height:100%">';
    document.getElementById('pasubGifts').addEventListener ('click', t.e_clickedGifts, false);
    document.getElementById('paGiftHelp').addEventListener ('click', t.helpPop, false);
    if (!Options.giftDomains.valid)
      Options.giftDomains.list[getServerId()] = unsafeWindow.domainName;
  },
  
  show : function (){
  },
  hide : function (){
  },
  
  helpPop : function (){
    var helpText = '<BR>The GIFTS tab helps you accept gifts easier than going through facebook. To use it, first hit the \'Check for Gifts\'\
        button.  This will fetch the facebook gifts page and will list all of the KofC gifts which are available.<BR><BR>\
        From the list, check all of the gifts that you want to accept or press the \'All\' button to select all of them.  Be sure to select which \
        domain you wish to apply the gifts to. If you want the gifts to be deleted from facebook after accepting them, set the \'delete gifts\'\
        option to \'Always\'. Now, press the \'Accept Gifts\' button to accept the selected gifts.  Note that this process takes some time as there are 4 webpages\
        that are being accessed for each gift!<BR><BR>\
        NOTES:<UL><LI>The Facebook gifts page lists up to 100 gifts for <B>all</b> of your game apps. This means that only some of the KofC\
        gifts which are available will be listed. After accepting gifts, be sure to \'Check for Gifts\' again to see if more show up!<p>\
        <LI>If you choose not to delete gifts after accepting them, they may be available to get again! After the process is complete, just press the\
        \'Check for Gifts\' button again to see what gifts are available.</ul>';
    var pop = new CPopup ('giftHelp', 0, 0, 500, 400, true);
    pop.centerMe (mainPop.getMainDiv());  
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help</b>: Accepting gifts</center>';
    pop.show (true);
  },
  
      
  e_clickedGifts : function  (){     // (also cancel accepting)
    var t = Tabs.Gifts;
    if (t.accepting){
      document.getElementById('pasubGifts').value = 'Check for Gifts';
      document.getElementById('giftDiv').innerHTML+= '<BR><SPAN class=boldRed>Cancelled.</span>';
      t.accepting = false;
      return; 
    }
    document.getElementById('giftDiv').innerHTML = 'Fetching Facebook gifts page ...';
    
    t.fetchGiftsPage (gotGiftsPage);
    function gotGiftsPage(rslt){
      if (rslt.errMsg){
        document.getElementById('giftDiv').innerHTML += rslt.errMsg;
        return;
      } 
      t.gifts = rslt;
      if (!Options.giftDomains.valid && t.gifts.length>0){
        t.ajaxGetGiftData (t.gifts[0], listGifts, function (){});    // try to get domain list ... don't delete gift!
        return;
      }
      listGifts();
    }
    
    function listGifts (){
//logit ("LIST GIFTS"); 
//logit (inspect (t.gifts, 8, 1));     
      var m = '<DIV class=pbStat><CENTER>KofC gifts &nbsp; &nbsp; &nbsp; ('+ t.gifts.length +' found)</center></div>';
      if (t.gifts.length<1){
        document.getElementById('giftDiv').innerHTML = m + '<BR><BR><CENTER>No gifts found!</center>';
        return;
      }
      m += '<TABLE class=pbTab align=center><TR><TD align=right>Server to apply gifts to: </td><TD>'
        + htmlSelector (Options.giftDomains.list, getServerId(), 'id=pbGiftServers') +'</td></tr>\
          <TR><TD align=right>Delete gifts after accepting</td><TD>'
        + htmlSelector ({y:'Always', e:'Only if Error', n:'Never'}, Options.giftDelete, 'id=pbGiftDel')
        + '</td></tr><TR><TD>Select gifts you want to accept and hit: </td><TD width=250><INPUT type=submit id=pbGiftDo value="Accept Gifts">\
        &nbsp; <SPAN id=pbGiftNone class=boldRed></span></td></tr></table><HR><TABLE class=pbTab><TR valign=top><TD>\
        <INPUT id=pbGiftButAll type=submit value="All" style="width:100%; margin-bottom:5px"><BR><INPUT id=pbGiftButNone type=submit value="None"></td>\
        <TD width=10></td><TD><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabLined>\
        <TBODY id=pbGiftTbody>\
        <TR style="font-weight:bold; background:white"><TD>Gift</td><TD>Date</td><TD>From (server)</td><TD width=20></td></tr>';
      t.gifts.sort (function (a,b){  // sort by gift name, date
          var x = a.gift.localeCompare (b.gift);
          if (x != 0)
            return x;
          return a.args.da.localeCompare(b.args.da);
          });
      for (var i=0; i<t.gifts.length; i++){
        var giftName = t.gifts[i].gift;
        if (t.gifts[i].args.si == 9)
          giftName += ' (Daily)';
        var date = t.gifts[i].args.da.substr(0,4) +'-'+ t.gifts[i].args.da.substr(4,2) +'-'+ t.gifts[i].args.da.substr(6,2);
        m += '<TR><TD><INPUT type=checkbox id=pbgchk_'+ i +'> &nbsp;'+ giftName +'</td><TD>'+ date +'</td>\
              <TD>'+ t.gifts[i].giver +' ('+ t.gifts[i].args.exs +')</td></tr>';
      }
      document.getElementById('giftDiv').innerHTML = m + '</tbody></table></td></tr></table>';
      document.getElementById('pbGiftDo').addEventListener ('click', t.getErDone, false);
      document.getElementById('pbGiftButAll').addEventListener ('click', t.e_butAll, false);
      document.getElementById('pbGiftButNone').addEventListener ('click', t.e_butNone, false);
      var tbody = document.getElementById('pbGiftTbody');
      tbodyScroller (tbody, getRemainingHeight (tbody, mainPop.div));
    }
  },

  e_butAll : function (){
    var t = Tabs.Gifts;
    for (var i=0; i<t.gifts.length; i++)
      document.getElementById('pbgchk_'+i).checked = true;
  },
  
  e_butNone : function (){
    var t = Tabs.Gifts;
    for (var i=0; i<t.gifts.length; i++)
      document.getElementById('pbgchk_'+i).checked = false;
  },
  
  getErDone : function (){ 
    var t = Tabs.Gifts;
    t.doList = [];
    document.getElementById('pbGiftNone').innerHTML = '';
    Options.giftDelete = document.getElementById('pbGiftDel').value;
    for (var i=0; i<t.gifts.length; i++){
      if (document.getElementById('pbgchk_'+i).checked)
        t.doList.push (t.gifts[i]); 
    }
    if (t.doList.length==0){
      document.getElementById('pbGiftNone').innerHTML = 'None Selected!';
      return;
    }
    t.doServer = document.getElementById('pbGiftServers').value;
    t.accepting = true;
    document.getElementById('pasubGifts').value = 'Stop Accepting'; 
    document.getElementById('giftDiv').innerHTML = '<DIV id=acpDiv style="height:400px; max-height:400px; overflow-y:auto"><B>Accepting '+ t.doList.length +' gifts:</b><BR></div>';    
    t.acceptNext ();
  },

    
  allDone : function (msg){
    var t = Tabs.Gifts;
    document.getElementById('acpDiv').innerHTML += '<BR><BR>' + msg;
    document.getElementById('pasubGifts').value = 'Check for Gifts';
    t.accepting = false;
  },
  
    
  acceptNext : function (){
    var t = Tabs.Gifts;
    var gift = t.doList.shift();
    if (gift == null){
      t.allDone ('Done accepting gifts.'); 
      return;
    }
    var acpDiv = document.getElementById('acpDiv');
    var curDiv = document.createElement ('div');
    acpDiv.appendChild (curDiv);
    curDiv.innerHTML = '<B>'+ gift.gift +'</b> from '+ gift.giver +' on '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2) +': ';    
    var statSpan = document.createElement ('span');
    curDiv.appendChild (statSpan);
    statSpan.innerHTML = 'Getting data ';
    t.ajaxGetGiftData (gift, gotGiftData, progress);
    
    function progress (m){
      if (t.accepting)
        statSpan.innerHTML += ' '+m;
    }
        
    function gotGiftData (rslt){
//logit ("getErDone.gotGiftData ... \n"+ inspect (gift, 8, 1)); 
      if (!t.accepting)
        return;
      if (rslt.ok){
        statSpan.innerHTML += ' &nbsp; Accepting .';
        t.ajaxAcceptGift (gift, t.doServer, doneAccepting);
        return;
      }
        
      if (rslt.feedback)
        msg = '<B>'+ rslt.feedback + '</b>';
      else 
        msg = '<SPAN class=boldRed>ERROR: '+ rslt.ajaxErr +'</span>';
      if (rslt.del && Options.giftDelete!='n'){
        t.deleteGift (gift);  
        msg += ' Gift Deleted.';
      }
      curDiv.removeChild (statSpan);
      curDiv = document.createElement ('div');
      curDiv.className = 'indent25';
      acpDiv.appendChild (curDiv);
      curDiv.innerHTML = msg;
      t.acceptNext ();  
    }
    
    function doneAccepting (rslt){
      if (!t.accepting)
        return;
      var msg = 'OK.';
      if (rslt.ok)
        actionLog ('Accepted Gift:  '+ gift.gift +' from '+ gift.giver +' on '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2)     );
      else
        msg = '<SPAN class=boldRed>'+ rslt.msg +'</span>';
      statSpan.innerHTML = msg;
      if (Options.giftDelete=='y'){
        statSpan.innerHTML += ' &nbsp; Deleted.';
        t.deleteGift (gift);      
      }
      t.acceptNext ();  
    }
  },

    

  ajaxAcceptGift : function (gift, serverId, notify){
    var url;
    var pargs = {};
        
    if (gift.dat.ver == 1){
      url = gift.dat.url;
      pargs.giftId = gift.dat.giftId;
      pargs.hasExistingServer = 1;
      pargs.serverid = serverId;
      pargs.go = 'Next';
      GM_AjaxPost (url, pargs, ver1GotPost, 'Accept'); 
    } else {
      var i = gift.dat.url.indexOf('src/');
      url = gift.dat.url.substr(0,i) +'src/ajax/claimgift.php?wcfbuid='+ gift.dat.wcfbuid;        
      pargs = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      pargs.fb_sig_ext_perms = unescape(pargs.fb_sig_ext_perms);
      pargs.ver = '2';
      pargs.selectedS = serverId;
      pargs.giftinviteid = gift.dat.giftId;
      GM_AjaxPost (url, pargs, ver2GotPost, 'Accept'); 
     }
     
//  parse multiple reply formats .....         
    function ver1GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:"AJAX Error"}); 
        return;
      }
      var m = /<div class=\'nm\'>(.*?)<\/div/im.exec(rslt);
      if (m)
        notify ({ok:false, msg: 'Got '+ m[1]}); 
      else
        notify ({ok:true, msg:'OK'});
    }
    function ver2GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:"AJAX Error"}); 
        return;
      } 
      rslt = eval ('('+ rslt +')');
      if (rslt.ok)
        rslt.msg = 'OK';
      notify (rslt);
    }
  },

      
  deleteGift : function (gift){
    var pargs = {};
//logit ("DELETING GIFT!");    
    for (var i=0; i<gift.inputs.length; i++){
//      if (gift.inputs[i].name != 'actions[reject]')
        pargs[gift.inputs[i].name] = gift.inputs[i].value;
    }
    GM_AjaxPost ('http://www.facebook.com/ajax/reqs.php?__a=1', pargs, gotAjaxPost, 'Delete');
    function gotAjaxPost (p){
    }
  },

    
// get 3 pages ... facebook convert page, facebook claim page and first KofC page (for gift ID) ...
// adds: dat.url, dat.giftId and dat.ver to gift object (if available)
// notify: {ok:true/false,  feedback:,  ajaxErr:  }    
  ajaxGetGiftData : function (gift, notify, progress, DELETE){
    var t = Tabs.Gifts;
    gift.dat = {};

    GM_AjaxGet (gift.submit, null, got1, 'Page 1');        
        
    function got1 (page){
// sample URL: http://apps.facebook.com/kingdomsofcamelot/?page=claimdailygift&gid=361&sid=4411654&s=88&in=4411654&si=9      
// sample result: .... window.location.replace("http:\/\/apps.facebook.com\/kingdomsofcamelot\/?page=claimgift&gid=1045&sid=1432568&s=250&in=1432568&si=5"); ...
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 1'});
      progress ('1');
      var m = /window.location.replace\(\"(.*?)\"/im.exec (page);
      if (m == null)
        notify ({ajaxErr:'PARSE Error - page 1'});
      var url = m[1].replace ('\\/', '/', 'g');
      GM_AjaxGet (url, '', got2, 'Page 2');        
    }
    
// sample URL: http://www88.kingdomsofcamelot.com/fb/e2/src/claimDailyGift_src.php?sid=4411654&gid=361&standalone=0&res=1&iframe=1&wcfbuid=1400526627&fbml_sessionkey=2.wdwjP4blBLkO2wXAFqDglg__.3600.1293681600-1400526627&lang=en&in=4411654&si=9&ts=1293677199.881&page=claimdailygift&gid=361&sid=4411654&s=88&in=4411654&si=9&appBar=&kabamuid=114014&tpuid=alYJXw-Us9z9qjRn3DHChEtsFvo&fb_sig_in_iframe=1&fb_sig_base_domain=kingdomsofcamelot.com&fb_sig_locale=en_GB&fb_sig_in_new_facebook=1&fb_sig_time=1293677199.924&fb_sig_added=1&fb_sig_profile_update_time=1267240352&fb_sig_expires=1293681600&fb_sig_user=1400526627&fb_sig_session_key=2.wdwjP4blBLkO2wXAFqDglg__.3600.1293681600-1400526627&fb_sig_ss=7wEsU_e0FLqhrGxE1LAZDg__&fb_sig_cookie_sig=514b59deb303becb5c5c654c9d457732&fb_sig_ext_perms=email%2Cuser_birthday%2Cuser_religion_politics%2Cuser_relationships%2Cuser_relationship_details%2Cuser_hometown%2Cuser_location%2Cuser_likes%2Cuser_activities%2Cuser_interests%2Cuser_education_history%2Cuser_work_history%2Cuser_online_presence%2Cuser_website%2Cuser_groups%2Cuser_events%2Cuser_photos%2Cuser_videos%2Cuser_photo_video_tags%2Cuser_notes%2Cuser_about_me%2Cuser_status%2Cfriends_birthday%2Cfriends_religion_politics%2Cfriends_relationships%2Cfriends_relationship_details%2Cfriends_hometown%2Cfriends_location%2Cfriends_likes%2Cfriends_activities%2Cfriends_interests%2Cfriends_education_history%2Cfriends_work_history%2Cfriends_online_presence%2Cfriends_website%2Cfriends_groups%2Cfriends_events%2Cfriends_photos%2Cfriends_videos%2Cfriends_photo_video_tags%2Cfriends_notes%2Cfriends_about_me%2Cfriends_status&fb_sig_country=us&fb_sig_api_key=0ab5e11ff842ddbdbf51ed7938650b3f&fb_sig_app_id=130402594779&fb_sig=fca33813d9e1c9d411f0ddd04cf5d014
    function got2 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 2'});
      progress ('2');
      var m = page.match (/<form action=\"(.*?)\"/im);
      if (m == null)
        notify ({ajaxErr:'PARSE Error - page 2'});
      var url = m[1].htmlSpecialCharsDecode();
      url = url.replace (/lang=.*?&/, 'lang=en&');      
      gift.dat.url = url;
      GM_AjaxGet (url, '', got3, 'Page 3');        
    }
    
    function got3 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 3'});
      progress ('3');
      var m = /<div class=\'giftreturned\'>(.*?)<\/div/im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true}); 
        return;
      }
      var m = /(We were unable to find your gift.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true}); 
        return;
      }
      var m = /(Unable to get the list of your friends.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1]}); 
        return;
      }
      var m = /(Facebook says you are not friends.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true}); 
        return;
      }
            
      var regexp = /<option value='(.*?)'.*?>(.*?)</img ;
      var m;
      while ( (m = regexp.exec (page)) != null){
        if (m[1] != 'noserver')
          Options.giftDomains.list[m[1]] = m[2];  
      }
      Options.giftDomains.valid = true;
      if (page.indexOf('ver:2') >= 0){
        m = /giftinviteid:(.*?),/im.exec(page);
        if (m == null)
          notify ({ajaxErr:'PARSE Error (ver:2, giftinviteid not found) - page 3'});
        gift.dat.giftId = m[1];
        gift.dat.ver = 2;
/** for KofC change 20110119
        m = /wcfbuid=([0-9]*)/im.exec(page);
        if (m == null){
          notify ({ajaxErr:'PARSE Error (ver:2, wcfbuid not found) - page 3'});
          return;
        }
        gift.dat.wcfbuid = m[1];
**/        
      } else {
        m = /name='giftId' value='(.*?)'/im.exec(page);
        if (m == null){
          notify ({ajaxErr:'PARSE Error (ver:1, giftId not found) - page 3'});
          return;
        }
        gift.dat.giftId = m[1];
        gift.dat.ver = 1;
      }
      notify ({ok:true});
    }
  },

  
  // notify with gifts[] or: {errMsg:xxx}
  fetchGiftsPage : function (notify){
    GM_AjaxGet ('http://www.facebook.com/games?ap=1', '', parseGiftsPage, 'FB Gifts Page');
    
    // ...profile.php?id=100000710937192">Anestis Mallos</
    // Here is a GIFTNAME you can use 
    // OR:  ... would like to give you a gift of GIFTNAME in Kingdoms of Camelot
    // OR:  ... would like to give you a GIFTNAME in Kingdoms of Camelot
    // <input value=\"Accept\" type=\"submit\" name=\"actions[http:\/\/apps.facebook.com\/kingdomsofcamelot\/convert.php?pl=1&in=4411654&ty=1&si=9&wccc=fcf-inv-9&ln=11&da=20101229&ex=gid%3A361%7Csid%3A4411654%7Cs%3A88]\" \/><\/label>
    function parseGiftsPage  (p){
      if (p == null)
        notify ({errMsg:'Ajax Comm Error'});
      p = p.replace ('\\u003c', '<', 'g');    
      var t = Tabs.Gifts;
      var gifts = [];
      try {    
        var m = p.split ('<form');  
        for (var i=0; i<m.length; i++){
          if ( m[i].indexOf('kingdomsofcamelot')<0)
            continue;
          var mm = m[i].match( /facebook.com\\\/.*\">(.*?)<\\\/a><\\\/strong>.*?(?:give you a (?:gift of|)(.*?) in |here is a(.*?)you can use)/im );
          if (mm==null)
            continue;
          var giver = mm[1];
          if (mm[2])
            var gift = mm[2].trim();
          else
            var gift = mm[3].trim();
            
          // get all inputs ...  (name, value, type)          
          var inps = [];
          var args = {};  
          var inpsub = null;            
          var ins = m[i].match (/<input.*?>/igm);
          for (var ii=0; ii<ins.length; ii++){
            var it = {};
            mm = /value=\\\"(.*?)\\\"/im.exec(ins[ii]);  
            it.value = mm[1];
            mm = /name=\\\"(.*?)\\\"/im.exec(ins[ii]);  
            it.name = mm[1];
            mm = /type=\\\"(.*?)\\\"/im.exec(ins[ii]);  
            it.type = mm[1];
            if (it.type=='submit' && it.name!='actions[reject]'){
              it.name = eval ('"'+ it.name +'"');          
              mm = /actions\[(.*?)\]/im.exec(it.name);
              inpsub = mm[1].replace('\\/', '/', 'g');
              inpsub = inpsub.replace('&amp;', '&', 'g');
              var a = inpsub.split ('&');
              for (var iii=0; iii<a.length; iii++){
                var aa = a[iii].split ('=');
                if (aa[0]=='da' || aa[0]=='si'){
                  args[aa[0]] = unescape(aa[1]);
                } else if (aa[0] == 'ex') {
                  var s = unescape(aa[1]).split ('|');
                  for (var iiii=0; iiii<s.length; iiii++){
                    var ss = s[iiii].split(':');
                    if (ss[0] == 's')
                      args.exs = ss[1];
                  }
                } 
              }
            } else {
              inps.push (it); 
            }
          }
          if (args.da)
            gifts.push ({giver:giver, gift:gift, args:args, submit:inpsub, inputs:inps});
        } 
        notify (gifts);
      } catch (e) {
        notify ({errMsg:"Error parsing Facebook gift page"+ e});
      }
    }
  },
}

function encode_utf8( s ){
  return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s ){
  return decodeURIComponent( escape( s ) );
}

function hexDump (dat){
  var i = 0;
  var s = [];
  while (i < dat.length) {
    asc = [];
    s.push (hex4(i));
    s.push (': ');
    for (var ii=0; ii<16; ii++) {
      c = dat.charCodeAt(i+ii);
      s.push (hex2(c));
      s.push (' ');
      if (c>31 && c<128)
        asc.push (dat.charAt(i+ii));
      else
        asc.push ('.');
    } 
    s.push ('  ');
    s.push (asc.join(''))
    s.push ('\n'); 
    i += 16;
  }
  return s.join ('');
  function hex4(d){
    return hexDig(d>>12) + hexDig(d>>8) + hexDig(d>>4) + hexDig(d&15);
  }
  function hex2(d){
    return hexDig(d>>4) + hexDig(d&15);
  }
  function hexDig (d){
    hexdigs = '0123456789ABCDEF';
    return hexdigs.charAt(d&15);      
  }
}
 
// value is 0 to 1.0
function SliderBar (container, width, height, value, classPrefix, margin){
  var self = this;
  this.listener = null;
  if (value==null)
    value = 0; 
  if (!margin)
    margin = parseInt(width*.05);
  this.value = value;
  if (width<20) width=20;
  if (height<5) height=5; 
  if (classPrefix == null){
    classPrefix = 'slider';
    var noClass = true;
  }      
  var sliderHeight = parseInt(height/2);  
  var sliderTop = parseInt(height/4);
  this.sliderWidth = width - (margin*2);
    
  this.div = document.createElement ('div');  
  this.div.style.height = height +'px';
  this.div.style.width = width +'px';
  this.div.className = classPrefix +'Cont';
  if (noClass)
    this.div.style.backgroundColor='#ddd';
  
  this.slider = document.createElement ('div');
  this.slider.setAttribute ('style', 'position:relative;');
  this.slider.style.height = sliderHeight + 'px'
  this.slider.style.top = sliderTop + 'px';
  this.slider.style.width = this.sliderWidth +'px';
  this.slider.style.left = margin +'px';   /////
  this.slider.className = classPrefix +'Bar';
  this.slider.draggable = true;
  if (noClass)
    this.slider.style.backgroundColor='#fff';
  
  this.sliderL = document.createElement ('div');
  this.sliderL.setAttribute ('style', 'width:100px; height:100%; position:relative; ');
  this.sliderL.className = classPrefix +'Part';
  this.sliderL.draggable = true;
  if (noClass)
    this.sliderL.style.backgroundColor='#0c0';
  
  this.knob = document.createElement ('div');
  this.knob.setAttribute ('style', 'width:3px; position:relative; left:0px; background-color:#222');
  this.knob.style.height = height +'px';
  this.knob.style.top = (0-sliderTop) +'px';
  this.knob.className = classPrefix +'Knob';
  this.knob.draggable = true;
  this.slider.appendChild(this.sliderL);
  this.sliderL.appendChild (this.knob);
  this.div.appendChild (this.slider);
  container.appendChild (this.div);
  this.div.addEventListener('mousedown',  mouseDown, false);

  this.getValue = function (){
    return self.value;
  }

  this.setValue = function (val){   // todo: range check
    var relX = (val * self.sliderWidth);
    self.sliderL.style.width = relX + 'px';
    self.knob.style.left =  relX + 'px';
    self.value = val;
    if (self.listener)
      self.listener(self.value); 
  }
  
  this.setChangeListener = function (listener){
    self.listener = listener;
  }

  function moveKnob (me){
    var relX = me.clientX - self.divLeft;
    if (relX < 0)
      relX = 0;
    if (relX > self.sliderWidth)
      relX = self.sliderWidth;
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px';   // - half knob width !?!?
    self.sliderL.style.width = relX + 'px';
    self.value =  relX / self.sliderWidth;   
    if (self.listener)
      self.listener(self.value); 
  }
  function doneMoving (){
    self.div.removeEventListener('mousemove', mouseMove, true);
    document.removeEventListener('mouseup', mouseUp, true);
  }  
  function mouseUp (me){
    moveKnob (me);
    doneMoving();
  }
  
  function mouseDown(me){
    var e = self.slider;
    self.divLeft = 0;
    while (e.offsetParent){   // determine actual clientX
      self.divLeft += e.offsetLeft;
      e = e.offsetParent;
    }
    moveKnob (me);
    document.addEventListener('mouseup',  mouseUp, true);
    self.div.addEventListener('mousemove',  mouseMove, true);
  }
  function mouseMove(me){
    moveKnob (me); 
  }
}


function CmatSimpleSound (playerUrl, container, attrs, onLoad, flashVars) {
  var self = this;
  this.player = null;
  this.volume = 100;
  this.isLoaded = false;
  this.onSwfLoaded = null;
  
  var div = document.createElement ('div');
  this.onSwfLoaded = onLoad;
  if (navigator.appName.toLowerCase().indexOf('microsoft')+1) {
    div.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"><param name="movie" value="'+playerUrl+'"><param name="quality" value="high"></object>';
    this.player = div.getElementsByTagName('object')[0];
  } else {
    div.innerHTML = '<embed src="'+playerUrl+'"  bgcolor="#eeeeee" allowfullscreen=false FlashVars="'+ flashVars +'" quality="high" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" ></embed>';
    this.player = div.getElementsByTagName('embed')[0].wrappedJSObject;
  }
  if (container)
    container.appendChild (div);
  else 
    document.body.appendChild (div);
  for (k in attrs)
    this.player.setAttribute(k, attrs[k]); 
       
  this.setVolume = function (chanNum, vol){
    if (!self.isLoaded)
      return;
    self.player.jsSetVolume (chanNum, vol);
    volume = vol; 
  }
  
  this.load = function (chanNum, url, bStream, bAutoplay, bUsePolicyFile){   // loop ?
    self.player.jsLoad (chanNum, url, bStream, bAutoplay, bUsePolicyFile);
  }
  
  this.play = function (chanNum, position){
    self.player.jsPlay (chanNum, position);
  }
    
  this.stop = function (chanNum){
    self.player.jsStop (chanNum);
  }
    
  this.getStatus = function (chanNum){           // returns null if sound channel is 'empty'
    return self.player.jsGetStatus (chanNum);
  }
  
  this.debugFunc = function (msg){  // overload to use
  }
      
  this.swfDebug = function (msg){    // called by plugin
    self.debugFunc('SWF: '+ msg);
  }
  this.swfLoaded = function (){    // called by plugin when ready to go!
    self.isLoaded = true;
    self.debugFunc ('playerIsReady'); 
    if (self.onSwfLoaded)
      self.onSwfLoaded();
  }
  this.swfPlayComplete = function (chanNum){    // called by plugin when a sound finishes playing (overload to be notified)
  }
  this.swfLoadComplete = function (chanNum, isError){    // called by plugin when a sound finishes loading  (overload to be notified)
  }
}

//

pbStartup ();


