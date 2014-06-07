// ==UserScript==
// @name             KoC Attack - Deutsch
// @version          0.9.7.0.32
// @namespace        PDX
// @homepage	     http://koc.god-like.org
// @description      KoC Attack - Extra Feature! German Version by PDX

// @include          *apps.facebook.com/kingdomsofcamelot*
// @include          *kingdomsofcamelot.com/*main_src.php*
// @include          *kingdomsofcamelot.com/*newgame_src.php*
// @include          *facebook.com/connect/uiserver.php*
// @include          *kingdomsofcamelot.com/*standAlone.php*
// @icon           http://koc.god-like.org/power/img/kocscripts.png

// ==/UserScript==


var KOCAversion = '0.9.7.0.32';

// Override the default alert functionality of the web browser (which causes the script to pause)
// Instead of displaying alert popups, messages will be displayed in the firefox console
unsafeWindow.alert = function(message) {
	console.info("Javascript Alarm: "+message);
	if(typeof(GM_log)=="function"){
		GM_log("Javascript Alarm: "+message);
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
        return '<font color="red">Fehler: Level müssen > 0 sein</font>';

    // We start with a non null object
    if(obj == null)
    return '<font color="red">Fehler: Objekt <b>NULL</b></font>';
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
        else                        msg = 'Unbekannt';

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
				this.Log("Ein Javascript hat fehler verursacht beim aufruf einer Funktion via DoUnsafeWindow. Fehler Meldung: "+error.description);
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
		
		var m = '<a id="ImportBoxCancel" class="button20"><span>Schließen</span></a>';
		m += '<a id="ImportData" class="button20"><span>Import</span></a>';
		m += '<a id="ExportData" class="button20"><span>Export</span></a>&nbsp;';
		
		var cities=this.GetSeed().cities;
		//WinLog.write(inspect(cities));
		var citysel ='<select id=srcStadt>';
		//citysel += '<option value=All>All Cities</option>';
		for(var c=0; c<cities.length; c++) {
			citysel += '<option value="'+cities[c][0]+'">'+cities[c][1]+'</option>';
		}
		citysel += '<option value=options>Einstellung</option>';		
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
			    if (x.fromStadt == ById('srcStadt').value) {
			      obj[name]=v;
			    }
		      }
			}
			else if (ById('srcStadt').value == 'options') {
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
		var citysel ='<select id=srcStadt>';
		citysel += '<option value=All>Alle</option>';
		for(var c=0; c<cities.length; c++) {
			citysel += '<option value="'+cities[c][1]+'">'+cities[c][1]+'</option>';
		}		
		citysel += '</select>';
		
		var levelsel ='<select id=srcLevel>';
		levelsel += '<option value="All">Alle</option>';
		for(var c=1; c<=11; c++) {
			levelsel += '<option value="'+c+'">Level '+c+'</option>';
		}
		levelsel += '</select>';
		
		var typesel ='<select id=srcAttackType>';
		typesel += '<option value="All">Alle</option>';
		typesel += '<option value="normal">Angriffe</option>';
		typesel += '<option value="transport">Transporte</option>';
		typesel += '<option value="koord">Hinzugefüge Koordinaten</option>';
		typesel += '</select>';
		
		div.style.display='block';
		div.innerHTML='';
		var m = '<DIV id="srcAttackOpts" style="height:30px">\
		<TABLE><TR valign=bottom><TD class=xtab width=100 align=center>Suchen: </td><TD align=left>\
		<SELECT id=srcAttack>\
		<OPTION value=All>Alle</option>\
		<OPTION value=Barbaren>Barbaren Lager</option>\
		<OPTION value=Wildniss>Wildnisse</option>\
		<OPTION value=Grassland>Grassland</option>\
		<OPTION value=See>See</option>\
		<OPTION value=Berg>Berg</option>\
		<OPTION value=Wälder>Wald</option>\
		<OPTION value=Hügel>Hügel</option>\
		<OPTION value=Ebene>Ebene</option>\
		<OPTION value=Stadt>Städte</option>\
		<OPTION value=Transport>Transporte</option>\
		<OPTION value=Unknown>Unbekannt</option>\
		</select></td>\
		<td class=xtab width=100 align=center>Heiligtum: &nbsp; </td>\
		 <td align=left><span id=ptattackcity></span></td>\
		 <td class=xtab width=100 align=center>Level: &nbsp; </td>\
		 <td align=left><span id=ptattacklevel></span></td>\
		 <td class=xtab width=100 align=center>Typ: &nbsp; </td>\
		 <td align=left><span id=ptattacktype></span></td></tr>\
		</table></div>\
		<a id="KOCAttackViewAttacksCancel" class="button20"><span>Schließen</span></a>\
		<a id="KOCAttackViewAttacksList" class="button20"><span>Aktuallisieren</span></a>\
		<a id="KOCAttackViewAttacksClearList" class="button20"><span>Leeren</span></a>\
		<a id="KOCAttackViewAttacksDelete" class="button20"><span>Löschen</span></a>\
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
		  var cityQuery = ById('srcStadt').value;
		  var levelQuery = ById('srcLevel').value;
		  var attackQuery = ById('srcAttack').value;
		  
		  var h = '<table>';
		  h += '<tr><td><input type=checkbox id=selAllAttacks></td><td>&nbsp;</td><td>Stadt</td><td>Koordinate</td><td nowrap>Was ?</td>';
		  h += '<td>Type</td><td>Truppenstärke</td><td>Kamikaze Wellen/Resourcen</td><td>Entf.</td><td>Zeit</td><td>Ignorieren</td></tr>';
		  var tableRows= '';
		  var count = 1
		  for(var a=0; a<t.attacks.length; a++) {
			var levelInfo=t.GetLevelInfo(t.attacks[a]);
			if (levelInfo==undefined) levelInfo='';
			var type;
			if (levelInfo.type){
			  type = levelInfo.type;
			} else {
			  type = 'Unbekannt';
			}

			var displayRow = '';
			if (cityQuery != 'All'){
			  if (t.GetStadtName(t.attacks[a]['fromStadt']) != cityQuery){
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
			tableRows += '<td>'+count+'</td><td>'+t.GetStadtName(t.attacks[a]['fromStadt'])+'</td>';
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
      
 	  var distance=t.CalcXYDist({'x':t.attacks[a].xy[0],'y':t.attacks[a].xy[0]},{'x':t.GetStadtCoordsX(t.attacks[a]['fromStadt']),'y':t.GetStadtCoordsX(t.attacks[a]['fromStadt'])});
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
			    GM_log('Koordinate '+xy[0]+' '+xy[1]);
			    t.DeleteAttack(xy[0],xy[1]);
				deletes++;
			  }
			}
			window.alert(deletes+' Erfolgreich gelöscht!');
			//var listBtn=ById('KOCAttackViewAttacksList');
			//nHtml.Click(listBtn);
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
	
	GetStadtName:function(cityid) {  
	  var cityName;
	  for(var a=0; a<unsafeWindow.seed.cities.length; a++) {
	    if(unsafeWindow.seed.cities[a][0] == cityid){
		  var cityName = unsafeWindow.seed.cities[a][1];
		}
	  }
	  return cityName;
	},	

	GetStadtCoordsX:function(cityid) {  
	  var cityName;
	  for(var a=0; a<unsafeWindow.seed.cities.length; a++) {
	    if(unsafeWindow.seed.cities[a][0] == cityid){
		  var x = unsafeWindow.seed.cities[a][2];
		}
	  }
	  return x;
	},	

	GetStadtCoordsY:function(cityid) {  
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
		var goto = window.location.protocol+'//apps.facebook.com/kingdomsofcamelot/?s='+m[1];
		var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxButReload type=submit value=REFRESH><input type=hidden name=s value="'+ m[1] +'"</form>';
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
		
		var attackfirst = '';
		var arrData = [["Barbaren", "Barbaren Lager"],["Stadt", "Städte"],["Transport", "Transporte"],["Wildniss", "Wildnisse"],["Keine", "Keine"]];
		for (var i=0; i < arrData.length; i++){
			attackfirst += "<input type=radio name=KOCAttackPriority id='KOCAttackPriority_"+arrData[i][0]+"' value="+arrData[i][0]+" "+(arrData[i][0]==this.options.attackpriority?'checked':'')+"/>";
			attackfirst += "<label for='KOCAttackPriority_"+arrData[i][0]+"'>"+arrData[i][1]+"</label>";
		};
		
		div.style.display='block';
		div.innerHTML='';
		this.options=this.GetOptions();
		div.innerHTML="<form><table>"+
			"<tr><td valign='top' align='center'><img src='img/units/unit_6_50.jpg' /></td><td valign='top'>"+
			"Angriffs Befehl: <select id='KOCAttackOrder'><option value='mostTroops'>Truppenstärke</option><option value='closest'>Entfernung</option></select><br />"+
			"Marsch Typ: <input type='checkbox' "+(this.options.attackTypeBarbaren?'checked':'')+" id='KOCAttackTypeBarbaren'>Barbaren Lager "+
			"<input type='checkbox' "+(this.options.attackTypeWild?'checked':'')+" id='KOCAttackTypeWild'>Wildnisse "+
			"<input type='checkbox' "+(this.options.attackTypeStadt?'checked':'')+" id='KOCAttackTypeStadt'>Städte "+
			"<input type='checkbox' "+(this.options.attackTypeTransport?'checked':'')+" id='KOCAttackTypeTransport'>Transporte<br> "+
			"Priorität für Angriffe auf: "+attackfirst+ 
			"<br><br />"+
			"<input id='KOCAttackDelay' value='"+this.options.attackDelay+"' size='3' /> Sekunden Abstand zwischen den Angriffen!<br />"+
			"Die Zeit in der die <u>gleichen</u> Ziele angegriffen werden.<br />"+
			"<div style='margin-left: 40px'>"+
			"Barbaren Lager: <input id='KOCAttackHoursSinceLastBarbaren' value='"+(this.options.attackSecsSinceLastBarbaren/(60*60))+"' size='3' />Stunden<br />"+
			"Wildnisse: <input id='KOCAttackHoursSinceLastWild' value='"+(this.options.attackSecsSinceLastWild/(60*60))+"' size='3' />Stunden<br />"+
			" Angriff auf Städte: <input id='KOCAttackHoursSinceLastStadt' value='"+(this.options.attackSecsSinceLastStadt/(60*60))+"' size='3' />Stunden<br />"+
			" Transporte: <input id='KOCAttackMinsSinceLastTransport' value='"+(this.options.attackSecsSinceLastTransport/(60))+"' size='3' />Minuten<br />"+
			" <input id='KOCAttackTransportReserveAmount' value='"+this.options.transportResourcesReserveAmount+"' size='10' /> je Ressource in der Stadt als mind. Bestand stehen lassen! <font color=#600000>(Überproduktion)</font>"+
			"</div>"+
			"<input id='KOCAttackRandom' value='"+this.options.randomPercent+"' size='3' />% zufällige Verzögerung <font color=#600000>(um Menschlich zu wirken!)</font><br />"+
"<input id='KOCAttackRally' value='"+this.options.rallyKeep+"' size='3' /> Versammlungsplatz Slots freihalten<br />"+
"<br />"+
			"<input id='KOCAttackMaxDistance' value='"+(this.options.attackMaxDistance)+"' size='3' /> max. Entfernung für Angriffe/Transporte<br />"+
			"<input id='KOCAttackLockAttackFromStadt' type='checkbox' "+(this.options.lockAttackFromStadt?'checked':'')+" /> Nur aus der Stadt aus Angreifen aus dem der erste Angriff gestartet wurde!<br />"+
			"<input id='KOCAttackUnselectKnight' type='checkbox' "+(this.options.knightreset?'checked':'')+" /> Ritter nur im Angriff einsetzen!<br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \"><u><b>Hinweis</b></u>: wird auch bei verstärkung keinen Ritter automatisch einsetzen!</span><br />"+	
			"<input id='KOCAttackRetryMarch' type='checkbox' "+(this.options.retryMarch?'checked':'')+" /> Marsch Abbrechen wenn: unknown/excess traffic error <font color=#600000>(benötigt Refresh!)</font><br />"+
			"<input id='KOCAttackImpendingStopAttack' type='checkbox' "+(this.options.impendingStopAttack?'checked':'')+" /> Auto Attack Ausschalten wenn du angegriffen wirst.<br />"+	
			"<span style=\"font-size:10px; color:#555; line-height:18px; \"><u><b>Hinweis</b></u>: Auto Attack wird nach dem Angriff NICHT automatisch eingeschaltet!</span><br />"+		
			"URL Aufrufen: <input id='KOCAttackImpendingAttackUrl' size='60' value='"+(this.options.impendingAttackUrl)+"' /><br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \"><u><b>Hinweis</b></u>: Wird beim Angriff auf dich Aufgerufen z.B. Sound Datei eintragen</span><br />"+
			"</td></tr>"+
			
			"<tr><td valign='top' align='center'><img src='img/chrome_message_up.png' /></td><td valign='top'>"+
			"<input id='KOCAttackRemoveReports' type='checkbox' "+(this.options.autoRemoveReports?'checked':'')+" /> Automatisches Löschen der Barbaren/Widlniss Berichten. <font color=#600000>(benötigt Refresh!)</font><br />"+
			"<input id='KOCAttackRemoveFarmReports' type='checkbox' "+(this.options.autoRemoveFarmReports?'checked':'')+" /> Farm Berichte Automatisch Löschen.<br />"+
			"<input id='KOCAttackKeepReports' value='"+this.options.keepReports+"' size='3' /> Angriffs Berichte die auf der Angriffs Seite Angezeigt werden. <font color=#600000>(Truppen aussenden Fenster)</font><br />"+
			"<input id='KOCAttackNoViewReports' type='checkbox' "+(this.options.noViewReports?'checked':'')+" /> Berichte Automatisch aufrufen Ausschalten.<br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \"><u><b>Hinweis</b></u>: Wird auch die Berichte der Angriffs Seite deaktivieren!</span><br />"+	
			"</td></tr>"+
			
			"<tr><td valign='top' align='center'><img src='img/chome_alliance_up.png' /></td><td valign='top'>"+
			"Bei <input id='KOCAttackPercentOfPopToTrain' value='"+this.options.percentOfPopToTrain+"' size='3' />% Müßiges Volk Auto Ausbildung Starten und <input id='KOCAttackPercentToTrainOfMax' value='"+this.options.percentToTrainOfMax+"' size='3' />% von dem max. möglichen Volk Ausbilden!<br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \">Um Auto Ausbildung einzuschalten einfach in den Kasernen beim Truppen Typ 'Auto Ausbildung - EIN' schalten!</span><br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \"><u><b>Hinweis</b></u>: Wenn du 100% vom verfügbaren Volk ausbilden möchtest, kann es manchmal zu Fehlern mit den Ressourcen kommen. Kommt durch die Spiel Cache.</span><br />"+
			"</td></tr>"+
			
			"<tr><td valign='top' align='center'><img src='img/gold_30.png' /></td><td valign='top'>"+
			"Bei <input id='KOCAttackAutoGoldHappiness' value='"+this.options.autoGoldHappiness+"' size='3' />% Glück Auto Gold Starten <font color=#600000>(Ab wieviel % Glück soll geklickt werden?)</font><br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \">Um Auto Gold zu Aktevieren einfach im Schloss 'Auto Gold - EIN' schalten.</span><br />"+
			"</td></tr>"+
			
			"<tr><td valign='top' align='center'><img src='img/gems.png' /></td><td valign='top'>"+
"<input id='KOCAttackDisableMapDraw' type='checkbox' "+(this.options.disableDrawMapIcons?'checked':'')+" /> Map Icons ausschalten<br />"+
			"<input id='KOCAttackDisableInviteFriends' type='checkbox' "+(this.options.disableInviteFriends?'checked':'')+" /> \"Freunde Einladen\" popups Blocken.<br />"+
			"<input id='KOCAttackAutoHelpAlliance' type='checkbox' "+(this.options.autoHelpAlliance?'checked':'')+" /> Automatisch bei Bau und Forschungshilfen helfen.<br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \"><u><b>WICHTIG</b></u>: Bei Chat Einstellung den Allianz Chat auswählen!</span><br />"+
			"<input id='KOCAttackHideAllianceHelpRequests' type='checkbox' "+(this.options.hideAllianceHelpRequests?'checked':'')+" /> Bau und Forschungshilfen im Chat nicht anzeigen!<br />"+
			"<span style=\"font-size:10px; color:#555; line-height:18px; \"><u><b>Hinweis</b></u>: Wenn die Auto Hilfe <u>NICHT</u> Akteviert ist wird sie erst nach dem klick ausgeblendet!</span><br />"+
			"<input id='KOCAttackAutoPublishGamePopups' type='checkbox' "+(this.options.autoPublishGamePopups?'checked':'')+" /> Automatisch veröffentlichen. <font color=#600000>(als Spielanfrage auf die Pinwand posten)</font><br />"+
			"Wer darf die Anfrage sehen ? <select id='KOCAttackAutoPublishPrivacy'><option value='80'>jeder</option><option value='50'>Freunde von Freunde</option><option value='40'>Nur Freunde</option><option value='10'>Nur Ich</option></select><br />"+
			"<input id='KOCAttackAutoLogBackIn' type='checkbox' "+(this.options.autoLogBackIn?'checked':'')+" /> Automatisch neu Laden wenn Facebook oder KoC spinnt.<br />"+
			"<input id='KOCAttackEnableLogging' type='checkbox' "+(this.options.enableLogging?'checked':'')+" /> Diagnostic logging in der Firefox fehler console einschalten. <font color=#600000>(nur für Bug Reports!)</font><br />"+
			"</td></tr>"+
			
			"<tr><td valign='top' align='center'><img src='img/buildings/castle_lvl10.png' /></td><td valign='top'>"+
			"<input id='KOCAttackChangeStadtSecs' value='"+(this.options.changeStadtSecs)+"' size='3' /> Sekunden warten bis zum Wechsel in die nächste Stadt.<br />"+
			"Durch alle Städte <input id='KOCAttackCitiesDoneMax' value='"+(this.options.autoAttackCitiesDoneMax)+"' size='3' /> <u>mal</u> Switchen, <u>dann</u> "+
			"<input id='KOCAttackCitiesDelay' value='"+this.options.waitAfterCitiesDone+"' size='3' />Sekunden <u>warten</u>... danach <font color=#600000>Auto Refresh</font>!<br />"+
			"Städte von den angegriffen werden soll: "+okCitiesHtml+' <font color=#600000>(Makiert = Eingeschaltet)</font><br />'+

			"<tr><td valign='top' align='center'></td><td valign='top'>"+
			"Import/Export: <u>Einstellungen</u> hier reinkopieren...<br /><textarea id='KOCAttackImport'></textarea>"+
			"<a class='button20' id='KOCAttackImportButton'><span>Import</span></a> <a class='button20' id='KOCAttackExportButton'><span>Export</span></a><br />"+
			"</td></tr>"+

			"</table>"+
			
			"<TABLE width=100%><TR><TD>"+
			"<a id='KOCAttackOptionsReset' class='button20'><span>Zurücksetzen (Einstellung)</span></a> <a id='KOCAttackOptionsResetAll' class='button20'><span>Zurücksetzten (alles)</span></a><BR>"+
			"<a id='KOCAttackDeleteAllStoredAttacks' class='button20'><span>Koordinaten Löschen</span></a>"+
			"<a id='KOCAttackDeleteTransports' class='button20'><span>Transporte Löschen</span></a><BR>"+
			"<BR><HR><a id='KOCAttackOptionsSave' class='button20'><span>Speichern</span></a> <a id='KOCAttackOptionsCancel' class='button20'><span>Abbrechen</span></a>"+
			"</td><TD align=right><a href='http://userscripts.org/scripts/show/98234' target='_blank'>KoC Attack - Deutsch</a><BR>German Version by <a href='http://userscripts.org/users/297645/scripts' target='_blank'>PDX</a><BR>Version:<span style='color:red'> "+ KOCAversion +" </span></td></tr></form>";
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
			var SetStadt=function(target,set) {
				target.style.border=set?'2px solid #080':'';
				target.style.margin=set?'2px':'4px';
			};
			sp.addEventListener('click',function(evt) { SetStadt(evt.target,evt.target.style.border==''?true:false); },false);
			//sp.onmousedown=function() { return false; }
			SetStadt(sp,t.options.okCities[c]);
		}
		

		ById('KOCAttackOptionsSave').addEventListener('click',function() {
			t.options.attackTypeBarbaren=ById('KOCAttackTypeBarbaren').checked;
			t.options.attackTypeStadt=ById('KOCAttackTypeStadt').checked;
			t.options.attackTypeWild=ById('KOCAttackTypeWild').checked;
			t.options.attackTypeTransport=ById('KOCAttackTypeTransport').checked;
			
			var attackpriority = ByName('KOCAttackPriority');
				if(attackpriority){
					for(var i = 0; i < attackpriority.length; i++) {
						if(attackpriority[i].checked) {
							t.options.attackpriority = attackpriority[i].value;
							break;
						}
					}
				}
			
			t.options.attackDelay=parseInt(ById('KOCAttackDelay').value);
			t.options.waitAfterCitiesDone=parseInt(ById('KOCAttackCitiesDelay').value);
			t.options.keepReports=parseInt(ById('KOCAttackKeepReports').value);
			t.options.changeStadtSecs=parseInt(ById('KOCAttackChangeStadtSecs').value);
			t.options.autoGoldHappiness=parseInt(ById('KOCAttackAutoGoldHappiness').value);
			t.options.percentOfPopToTrain=parseFloat(ById('KOCAttackPercentOfPopToTrain').value);
			t.options.percentToTrainOfMax=parseFloat(ById('KOCAttackPercentToTrainOfMax').value);
			
			var prev_disableInviteFriends = t.options.disableInviteFriends;
			t.options.disableInviteFriends=ById('KOCAttackDisableInviteFriends').checked;
t.options.disableDrawMapIcons=ById('KOCAttackDisableMapDraw').checked;
			if(prev_disableInviteFriends != t.options.disableInviteFriends){
				alert("Du hast die Einstellung für \"Freunde Einladen\" popups Blocken geändert!\nHinweis: die nächste Einstellung die du änderst benötigt ein Refresh!");
			}
			
			t.options.autoHelpAlliance=ById('KOCAttackAutoHelpAlliance').checked;
			t.options.hideAllianceHelpRequests=ById('KOCAttackHideAllianceHelpRequests').checked;
			t.options.autoPublishGamePopups=ById('KOCAttackAutoPublishGamePopups').checked;
			t.options.autoPublishPrivacySetting=ById('KOCAttackAutoPublishPrivacy').value;
			
			t.options.autoLogBackIn=ById('KOCAttackAutoLogBackIn').checked;
			t.options.enableLogging=ById('KOCAttackEnableLogging').checked;

			t.options.attackSecsSinceLastBarbaren=parseFloat(ById('KOCAttackHoursSinceLastBarbaren').value)*60*60;
			t.options.attackSecsSinceLastWild=parseFloat(ById('KOCAttackHoursSinceLastWild').value)*60*60;
			t.options.attackSecsSinceLastStadt=parseFloat(ById('KOCAttackHoursSinceLastStadt').value)*60*60;
			t.options.attackSecsSinceLastTransport=parseFloat(ById('KOCAttackMinsSinceLastTransport').value)*60;
			
			t.options.transportResourcesReserveAmount=parseInt(ById('KOCAttackTransportReserveAmount').value);
			
			t.options.randomPercent=parseFloat(ById('KOCAttackRandom').value);
			t.options.rallyKeep=parseInt(ById('KOCAttackRally').value);t.options.attackMaxDistance=parseFloat(ById('KOCAttackMaxDistance').value);
			t.options.autoAttackCitiesDoneMax=parseInt(ById('KOCAttackCitiesDoneMax').value);

			t.options.attackOrder=ById('KOCAttackOrder').value;
			
			t.options.lockAttackFromStadt=ById('KOCAttackLockAttackFromStadt').checked;
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

		a=this.AddTabLink('Einstellung');
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

		a=this.AddTabLink('Angriffe');
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
			t.Log("Auto Attack wird eingeschaltet!");
			t.SetAutoAttack({'barbarian':true,'cities':{}});
			window.setTimeout(function() {
				t.SetAttackStatusMessage();
			},t.GetRandTime(250));
			t.RestartAutoAttack();
		} else {
			t.Log("Auto Attack wird ausgeschaltet!");
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
			toggle=this.AddTabLink('Angriff');
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
			toggle.innerHTML='<span>Angriff = AN</span>';
		} else {
			toggle.innerHTML='<span>Angriff = AUS</span>';
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
		
		var cookie='kocattackdeutsch';
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
		document.cookie='kocattackdeutsch='+escape(JSON2.stringify(this.valuesCache))+'; expires='+
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
		this.SetValue('Einstellung',JSON.stringify({}));
	},
	GetOptions:function() {
		var json=this.GetValue('Einstellung','{}');
		if(json=='') json='{}';
		var options=JSON2.parse(json);
		var defOptions={"attackDelay":8,
			"attackTypeBarbaren":true,
			"attackOrder":"closest",
			"attackpriority":"Keine",
			"autoRemoveReports":false,
"rallyKeep":0,
"disableDrawMapIcons":false,
			"attackSecsSinceLastStadt":60*60*12,
			"attackSecsSinceLastBarbaren":1800,
			"attackSecsSinceLastWild":3600,
			"attackSecsSinceLastTransport":60,
			"transportResourcesReserveAmount":1000000,
			"randomPercent":10,
			"keepReports":10,
			"attackMaxDistance":75,
			"lockAttackFromStadt":true,
			"knightreset":true,
			"waitAfterCitiesDone":20,
			"autoAttackCitiesDoneMax":2,
			"changeStadtSecs":20,
			"retryMarch":true,
			"noViewReports":false,
			"chromeKeepReports":2,
			"percentOfPopToTrain":75,
			"percentToTrainOfMax":95,
			"autoGoldHappiness":0,
			"disableInviteFriends":true,
			"autoHelpAlliance":true,
			"hideAllianceHelpRequests":true,
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
		this.SetValue('Einstellung',JSON2.stringify(v));
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
			this.Log("Auto Attack: Anrgiff wurde nicht definiert im System, dies ist der erste Angriff!");
			return true;
		}
		if(attack.a) { attack = attack.a; }
		// Check the current marches to see if there's an existing attack underway from this city
		var current_marches=this.GetSeed().queue_atkp["city" + this.GetCurrentStadtId()];
		for (var march in current_marches) {
			if(current_marches[march]['toXCoord'] == x && current_marches[march]['toYCoord'] == y){
				this.Log("Auto Attack: Truppen rennen bereits auf ("+x+","+y+") laut Truppen Aktivität!");
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
						this.Log("Auto Attack: Kamikaze Welle ist bereits länger als 30 Sekunden unterwegs und es wurde keine Angriffs welle geschickt, dies wird der erste Angriff auf ("+x+","+y+")!");
						return true;
					}
				}
				this.Log("Auto Attack: Dies ist nicht der erste Angriff auf ("+x+","+y+").");
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

		this.Log("Auto Attack: Truppen laufen zur Zeit nicht auf ("+x+","+y+") in der Truppen Aktivität. Dies ist der erste Angriff!");
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
			this.Log("Auto Attack: Finde keine GUI Koordinaten!");
			return null;
		}
		if(x.value.length<1 || y.value.length<1){
			this.Log("Auto Attack: eine oder beide Koordinaten fehlen!");
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
			this.Log("Auto Attack: Multiwellen timer \("+waveTimerDelay+"\ Sekunden) sind vorbei. Letzter Angriff: "+timeDifference+" Sekunden, es wird ein Reset durchgeführt und von vorne angefangen!");
		}
		return this.SendingMultipleWaves;
	},
	
	SetAttackFromGuiXY:function(x,y,box,isSuicideWave,locationType,resetTime) {
	
		if(resetTime==true){
			this.Log("Auto Attack: Resette Laufzeiten für ("+x+","+y+")");
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
			throw("Auto Attack: Finde den Angriffs Typ nicht!");
		}

		if(totalTroops<=0) {
			this.Log("Auto Attack: keine Truppen, es werden keine Angriffe gespeichert!");
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
			this.Log("Auto Attack: erster Angriff?: "+firstAttack);
			this.Log("Auto Attack: Kamikaze Welle definiert? : "+SuicideAttackDefined);

			if(isSuicideWave) {
				this.Log("Auto Attack: Kamikaze Welle eingeschaltet!");
				this.Log("Auto Attack: Kamikaze Welle: "+troops);
				attack.suicidewave=troops;
				attack.currenttattackwavetype = "kamikaze";
				attack.suicidewavetime = nowSecs;
				if(resetTime==true){ attack.suicidewavetime=monthAgo; }
				this.SendingMultipleWaves = true;
			} else {
				this.Log("Auto Attack: Normal Welle: "+troops);
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
			attack.fromStadt=this.GetCurrentStadtId();
			//}
			
			//Check if level is undefined
			if(!attack.levelInfo){attack.levelInfo={'type':locationType,'level':0};}
			if(locationType==""){
				if(attack.levelInfo.type!=""){
					// a pre-defined location type was already entered before for this attack.
					locationType = attack.levelInfo.type;
				}else{
					// Default to camp if attack location type was absolutely not specified in any way
					locationType = "Barbaren";
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
			attack.fromStadt=this.GetCurrentStadtId();
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
				}else if(attack.suicidewave && attack.currenttattackwavetype == "koord"){
					attack.currenttattackwavetype = "kamikaze";
				}else{
					// Toggle back and forth
					if(attack.suicidewave && attack.currenttattackwavetype == "normal"){
						attack.currenttattackwavetype = "kamikaze";
					}else{
						attack.currenttattackwavetype = "normal";
					}
				}
				this.Log("Auto Attack: Toggle Angriff für ("+x+", "+y+") von "+previousattackwavetype+" nach "+attack.currenttattackwavetype);
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
			var locationType = "Barbaren"; //Default to camp
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
			
			var currenttattackwavetype = "koord";
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
					this.Log('Auto Attack: Kamikaze Welle für '+x+','+y+' wurde bereits Hinzugefügt! Versuch sie zu Überschreiben!');
					continue;
				}else if(attack.troops){
					this.Log('Auto Attack: Angriffs Welle für '+x+','+y+' wurde bereits Hinzugefügt! Versuch sie zu Überschreiben!');
					continue;
				}
			}
			var attack=this.SetAttackFromGuiXY(x,y,box,isSuicideWave,locationType);
			if(attack) {
				attack.levelInfo={'type':locationType,'level':0};
				attack.fromStadt=this.GetCurrentStadtId();
				var nowSecs=new Date().getTime()/1000;
				var monthAgo=nowSecs-(60*60*24*31);
				attack.time=monthAgo;
				if(SuicideAttackDefined || isSuicideWave || previous_suicidewave){
					// set up suicide wave before attack time, according to "seconds in between sending each attack"
					attack.suicidewavetime = attack.time - this.options.attackDelay;
					if(previous_suicidewave && (!SuicideAttackDefined || !isSuicideWave)){
						this.Log("Auto Attack: Letzte Kamikaze Welle für diesen Angriff wurde überschrieben von einem Neuen Angriff! füge Daten zusammen und stelle die Datenbank wieder her!");
						attack.suicidewave = previous_suicidewave;
					}
				}
				attack.ignore=undefined;
				attack.currenttattackwavetype=currenttattackwavetype;
				this.SetAttack(x,y,attack);
				this.Log(x+','+y+' Angriff Hinzugefügt: '+inspect(attack));
				this.Log("Auto Attack: Aktueller Angriffs Wellen Typ: "+attack.currenttattackwavetype);
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
			div.style.display='inli