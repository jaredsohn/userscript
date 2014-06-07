// ==UserScript==
// @name           GW ATTACK
// @namespace      noobs
// @version        1.0
// @description    AUTOATACK for Global Warfare

// @include        http://*.globalwarfaregame.com/*main_src.php*
// @include        http://apps.facebook.com/globalwarfaregame/*


// ==/UserScript==

var KOCAversion = '1.0';

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
	if(level == null) level = 0;

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
	for(property in obj) {
		try {
			// Show "property" and "type property"
			type = typeof(obj[property]);
			str += '<li>(' + type + ') ' + property + ( (obj[property]==null)?(': <b>null</b>'):(': '+obj[property])) + '</li>';

			// We keep iterating if this property is an Object, non null
			// and we are inside the required number of levels
			if((type == 'object') && (obj[property] != null) && (level+1 < maxLevels))
			str += inspect(obj[property], maxLevels, level+1);
		} catch(err) {
			// Is there some properties in obj we can't access? Print it red.
			if(typeof(err) == 'string')
				msg = err;
			else if(err.message)
				msg = err.message;
			else if(err.description)
				msg = err.description;
			else
				msg = 'Unknown';
			str += '<li><font color="red">(Error) ' + property + ': ' + msg +'</font></li>';
		}
	}

	// Close indent
	str += '</ul>';

	return str;
}

var troopNames = {
	 1: 'Sp',
	 2: 'Mn',
	 3: 'St',
	 4: 'Pn',
	 5: 'Sn',
	 6: 'Ar',
	 7: 'Cy',
	 8: 'Hy',
	 9: 'Sn',
	10: 'Ba',
	11: 'Bm',
	12: 'Ct',
};

var resourceNames = {
	1: 'F',
	2: 'W',
	3: 'S',
	4: 'O',
};

function MinDigits(num,digits) {
	while((""+num).length<digits) {
		num="0"+num;
	}
	return num;
};
function SecsToStr(secs) {
	secs=Math.floor(secs);
	return Math.floor(secs/86400) + ":"+MinDigits(Math.floor(secs/3600%24),2) + ":"+MinDigits(Math.floor(secs/60%60),2);
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
	if (document.getElementById('modal_attack_tab_4').className == 'selected') // attack
		return 0;
	if (document.getElementById('modal_attack_tab_1').className == 'selected') // transport
		return 1;
	if (document.getElementById('modal_attack_tab_2').className == 'selected') // reinforce
		return 3;
	if (document.getElementById('modal_attack_tab_5').className == 'selected') // reassign
		return 4;
	return null;
}

var GWAttack={
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
			div.id='GWAttackViewAttacks';
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
		var citysel ='<select id=srcCity>';
		for(var c=0; c<cities.length; c++) {
			citysel += '<option value="'+cities[c][0]+'">'+cities[c][1]+'</option>';
		}
		citysel += '<option value=options>Options</option>';
		citysel += '</select>';

		m += citysel;
		m += '<br /><textarea id="ImportExportArea" rows=25 cols=60></textarea>';
		div.innerHTML = m;

		ById('ImportBoxCancel').addEventListener('click',function() {
			div.innerHTML = '';
			div.style.display='none';
		},false);

		ById('ImportData').addEventListener('click',function() {

		},false);

		ById('ExportData').addEventListener('click',function() {
			var x;
				var names=GWAttack.browser_listValues();
			var obj={};
			var serverId=GWAttack.GetServerId();
			for(var n=0; n<names.length; n++) {
				var name=names[n];
				var a = name.substring(0,11);
				var b = 'attack_'+serverId+'_';
				if (a==b ) {
					var sid=GWAttack.GetServerIdFromName(name);
					if(sid!=serverId) continue;
					var v=GWAttack.browser_getValue(name,null);
					if(v!=null && v!=undefined && v!=""){
						x = JSON2.parse(v);
						if (x.fromCity == ById('srcCity').value) {
							obj[name]=v;
						}
					}
				}
				else if (ById('srcCity').value == 'options') {
					var sid=GWAttack.GetServerIdFromName(name);
					if(sid!=serverId) continue;
					var v=GWAttack.browser_getValue(name,null);
					if(v!=null && v!=undefined && v!="")
						obj[name]=v;
				}
			}
			ById('ImportExportArea').value = JSON2.stringify(obj);
		},false);
	},

	ShowViewAttacksDialog:function() {
		var t=this;
		t.attacks=[];
		var div=ById('GWAttackViewAttacks');
		if(!div) {
			div=document.createElement('div');
			div.id='GWAttackViewAttacks';
			div.style.zIndex=1000000;
			div.style.position='absolute';
			div.style.left='20px';
			div.style.top='44px';
			div.style.backgroundColor='#fff';
			div.style.border='3px solid #888';
			div.style.padding='3px';
			document.body.appendChild(div);
		}
		var cities=this.GetSeed().cities;
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

		var distsel ='<select id=srcAttackDist>';
		distsel += '<option value="0">All</option>';
		distsel += '<option value="10">> 10</option>';
		distsel += '<option value="20">> 20</option>';
		distsel += '<option value="30">> 30</option>';
		distsel += '<option value="40">> 40</option>';
		distsel += '<option value="50">> 50</option>';
		distsel += '<option value="60">> 60</option>';
		distsel += '</select>';

		div.style.display='block';
		div.innerHTML='';
		var m = '<DIV id="srcAttackOpts" style="height:30px">\
		<TABLE><TR valign=bottom><TD class=xtab align=center>Target: &nbsp; </td><TD align=left>\
		<SELECT id=srcAttack>\
		<OPTION value=All>All</option>\
		<OPTION value=Camp>terrorista Camp</option>\
		<OPTION value=Pradera>Pradera</option>\
		<OPTION value=Grassland>Grassland</option>\
		<OPTION value=Lago>Lago</option>\
		<OPTION value=Montañas>Montañas</option>\
		<OPTION value=Yacimiento petrolíferos>Petroleo</option>\
		<OPTION value=Colinas>Colinas</option>\
		<OPTION value=Llanuras>Llanuras</option>\
		<OPTION value=City>City</option>\
		<OPTION value=Transport>Transport</option>\
		<OPTION value=Unknown>Unknown</option>\
		</select></td>\
		<td class=xtab align=center>City: &nbsp; </td>\
		<td align=left><span id=ptattackcity></span></td>\
		<td class=xtab align=center>Level: &nbsp; </td>\
		<td align=left><span id=ptattacklevel></span></td>\
		<td class=xtab align=center>Type: &nbsp; </td>\
		<td align=left><span id=ptattacktype></span></td>\
		<td class=xtab align=center>Dist: &nbsp; </td>\
		<td align=left><span id=ptattackdist></span></td></tr>\
		</table></div>\
		<a id="GWAttackViewAttacksCancel" class="button20"><span>Close</span></a>\
		<a id="GWAttackViewAttacksList" class="button20"><span>List Attacks</span></a>\
		<a id="GWAttackViewAttacksClearList" class="button20"><span>Clear List</span></a>\
		<a id="GWAttackViewAttacksDelete" class="button20"><span>Delete Selected</span></a>\
		<a id="GWAttackViewAttacksImportExport" class="button20"><span>Import / Export</span></a>\
		<br /><br /><DIV id="srcAttackResults" style="height:900px; max-height:900px; overflow-y:auto;"></div>';

		var srcAttackResults = ById("srcAttackResults");
		if (srcAttackResults != null)
			ById('GWAttackViewAttacksClearList').click();
		div.innerHTML = m;
		ById('ptattackcity').innerHTML = citysel;
		ById('ptattacklevel').innerHTML = levelsel;
		ById('ptattacktype').innerHTML = typesel;
		ById('ptattackdist').innerHTML = distsel;

		ById('GWAttackViewAttacksClearList').addEventListener('click',function() {
			ById('srcAttackResults').innerHTML='';
		},false);

		ById('GWAttackViewAttacksCancel').addEventListener('click',function() {
			div.style.display='none';
		},false);

		ById('GWAttackViewAttacksList').addEventListener('click',function() {
			t.attacks=[];
			t.DetailAttacks();

			var typeQuery = ById('srcAttackType').value;
			var cityQuery = ById('srcCity').value;
			var levelQuery = ById('srcLevel').value;
			var attackQuery = ById('srcAttack').value;
			var distQuery = parseInt(ById('srcAttackDist').value);

			var viewResults = [];
			var rcnt = 0;
			for(var a=0; a<t.attacks.length; a++) {
				viewResults[rcnt] = [];
				var levelInfo=t.GetLevelInfo(t.attacks[a]);
				if (levelInfo==undefined) levelInfo='';
				var type;
				if (levelInfo.type)
					type = levelInfo.type;
				else
					type = 'Unknown';
				if (cityQuery != 'All')
					if (t.GetCityName(t.attacks[a]['fromCity']) != cityQuery)
						continue;
				if (levelQuery != 'All')
					if (levelInfo.level != levelQuery)
						continue;
				if (typeQuery != 'All')
					if (t.attacks[a].currenttattackwavetype != typeQuery)
						continue;
				if (attackQuery != 'All')
					if (type != attackQuery)
						continue;

				var targetx = t.attacks[a].xy[0];
				var targety = t.attacks[a].xy[1];
				var targetdist = t.CalcXYDist({'x':t.GetCityX(t.attacks[a]['fromCity']),'y':t.GetCityY(t.attacks[a]['fromCity'])},{'x':targetx,'y':targety})
				if (targetdist < distQuery)
					continue;

				viewResults[rcnt].City = t.GetCityName(t.attacks[a]['fromCity']);
				viewResults[rcnt].X=targetx;
				viewResults[rcnt].Y=targety;
				viewResults[rcnt].Dist=targetdist.toFixed(2);

				if (type == 'transport')
					viewResults[rcnt].What = 'CIUDAD '+levelInfo.level;
				else if (type == 'Praderas')
					viewResults[rcnt].What = 'Pradera'+levelInfo.level;
				else if (type == 'Yacimiento PetroLiferos')
					viewResults[rcnt].What = 'petro'+levelInfo.level;
				else if (type == 'Montañas')
					viewResults[rcnt].What = 'Montaña'+levelInfo.level;
				else
					viewResults[rcnt].What = type+' '+levelInfo.level;

				var aWaveType = t.attacks[a].currenttattackwavetype;
				if (aWaveType == 'normal')
					viewResults[rcnt].WaveType = 'Attack';
				else if (aWaveType == 'bulkadded')
					viewResults[rcnt].WaveType = 'Bulk';
				else if (aWaveType == 'transport')
					viewResults[rcnt].WaveType = 'Trans';

					var troops='';
				var troopcnt=0;
				if(typeof(t.attacks[a].troops)=="object") {
					for(var i=1; i<t.attacks[a].troops.length; i++) {
						troopcnt=parseInt(t.attacks[a].troops[i]+',');
						if(troopcnt>0) {
							if (troopcnt%1000==0)
								troopcnt=troopcnt/1000+"k"
							troops+=troopNames[i]+':'+troopcnt+',';
						}
					}
					troops = troops.substring(0, troops.length - 1);
				}
				viewResults[rcnt].Troops = troops;

				var suires='';
				var suirescnt=0;
				if(typeof(t.attacks[a].suicidewave)=="object") {
					for(var i=1; i<t.attacks[a].suicidewave.length; i++) {
						suirescnt=parseInt(t.attacks[a].suicidewave[i]);
						if(suirescnt>0)
							suires+=troopNames[i]+":"+suirescnt+',';
					}
					suires = suires.substring(0, suires.length - 1);
					viewResults[rcnt].SuicideResources = suires;
				}
				else if (typeof(t.attacks[a].resources)=="object"){
					for(var i=1; i<t.attacks[a].resources.length; i++) {
						suirescnt=parseInt(t.attacks[a].resources[i]);
						if(suirescnt>0) {
							if (suirescnt%1000000==0)
								suirescnt=suirescnt/1000000+"m"
							else if (suirescnt%1000==0)
								suirescnt=suirescnt/1000+"k"
							suires+=resourceNames[i]+":"+suirescnt+',';
						}
					}
					suires = suires.substring(0, suires.length - 1);
					viewResults[rcnt].SuicideResources = suires;
				}
				else
					viewResults[rcnt].SuicideResources = '';

				var nowSecs=new Date().getTime()/1000;
				viewResults[rcnt].LastAttack = SecsToStr(nowSecs-t.attacks[a].time)+'</td>';

				if (t.attacks[a].ignore == null || t.attacks[a].ignore==undefined)
					viewResults[rcnt].ignChecked = '';
				else
					viewResults[rcnt].ignChecked = 'CHECKED';
				rcnt++;
			}

			viewResults.sort (function (a,b){return parseInt(100*a.Dist)-parseInt(100*b.Dist)});

			var h = '<table>';
			h += '<tr><td><input type=checkbox id=selAllAttacks></td><td>City</td><td align=right>Dist</td><td>Coords</td><td nowrap>What</td>';
			h += '<td>Type</td><td>Troops</td><td nowrap>Suicide/Resources</td><td>Time</td><td>Ignore</td></tr>';
			var tableRows= '';
			var count = 1;
			for(var a=0; a<viewResults.length; a++) {
				if(viewResults[a].City!=undefined) {
					tableRows += '<tr id=row'+count+' style="display: ;">';
					tableRows += '<td><input type=checkbox id=aasel'+count+'>';
					tableRows += '<td nowrap>'+viewResults[a].City+'</td>';
					tableRows += '<td align=right>'+viewResults[a].Dist+'</td>';
					tableRows += '<td id=aacoords'+count+' onclick="aaGotoMapHide('+viewResults[a].X+','+viewResults[a].Y+')">'+viewResults[a].X+','+viewResults[a].Y+'</td>';
					tableRows += '<td nowrap>'+viewResults[a].What+'</td>';
					tableRows += '<td>'+viewResults[a].WaveType+'</td>';
					tableRows += '<td>'+viewResults[a].Troops+'</td>';
					tableRows += '<td>'+viewResults[a].SuicideResources+'</td>';
					tableRows += '<td>'+viewResults[a].LastAttack+'</td>';
					tableRows += '<td><input type=checkbox name=chkIgnore id='+count+' '+viewResults[a].ignChecked+'></td>';
					tableRows += '</tr>';
					count++;
				}
			}

			h += tableRows + '</table>';
			ById('srcAttackResults').innerHTML = h;

			ById('KOCAttackViewAttacksDelete').addEventListener('click',function() {
				var deletes = 0;
				for (var i=1; i<count; i++){
					var row = 'aasel'+i;
					if (ById(row) == undefined) continue;
					if (ById(row).checked == true){
						var c = ById('aacoords'+i).innerHTML;
						var xy = c.split(",");
						t.DeleteAttack(xy[0],xy[1]);
						deletes++;
					}
				}
				if (deletes>0)
					window.alert(deletes+' of coords deleted');
				//var listBtn=ById('GWAttackViewAttacksList');
				//nHtml.Click(listBtn);
			},false);

			for (var i=1; i<count; i++){
				var ignore = i;
				t.addEvent(ById(ignore), "click", t.ChangeIgnore);
			}

			ById('selAllAttacks').addEventListener('click',function() {
				var myChecked = true;

				if (ById('selAllAttacks').checked == false)
					myChecked = false;

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
			else
				obj.addEventListener(type, fn, false);
	},

	ChangeIgnore:function(e){
		var c = ById('aacoords'+e.target.id).innerHTML;
		var xy = c.split(",");
		var serverID = GWAttack.GetServerId();

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
			if(unsafeWindow.seed.cities[a][0] == cityid)
				var cityName = unsafeWindow.seed.cities[a][1];
		}
		return cityName;
	},

	GetCityX:function(cityid) {
		var cityX;
		for(var a=0; a<unsafeWindow.seed.cities.length; a++) {
			if(unsafeWindow.seed.cities[a][0] == cityid)
				var cityX = unsafeWindow.seed.cities[a][2];
		}
		return cityX;
	},

	GetCityY:function(cityid) {
		var cityY;
		for(var a=0; a<unsafeWindow.seed.cities.length; a++) {
			if(unsafeWindow.seed.cities[a][0] == cityid)
				var cityY = unsafeWindow.seed.cities[a][3];
		}
		return cityY;
	},

	ReloadWindow:function() {
		var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
		if (!m){
			//window.location.reload(true);
			history.go(0);
			return;
		}
		var goto = 'http://apps.facebook.com/globalwarfaregame/?s='+m[1];
		var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=aes value="'+ m[1] +'"</form>';
		var e = document.createElement ('div');
		e.innerHTML = t;
		document.body.appendChild (e);
		setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
	},

	ShowOptionsDialog:function() {
		var div=ById('GWAttackOptions');
		if(!div) {
			div=document.createElement('div');
			div.id='GWAttackOptions';
			div.style.zIndex=1000000;
			div.style.position='absolute';
			div.style.left='20px';
			div.style.top='44px';
			div.style.backgroundColor='#fff';
			div.style.border='3px solid #888';
			div.style.padding='3px';
			div.style.maxWidth='700px';
			document.body.appendChild(div);
		}

		var attackfirst = '';
		var arrData = [["Campamento Terorista", "Camp"],["City", "City (Attack)"],["City", "City (Scout)"],["Transport", "Transport"],["Recursos", "Recursos"],["None", "None"]];
		for (var i=0; i < arrData.length; i++){
			attackfirst += "<input type=radio name=GWAttackPriority id='GWAttackPriority_"+arrData[i][0]+"' value="+arrData[i][0]+" "+(arrData[i][0]==this.options.attackpriority?'checked':'')+"/>";
			attackfirst += "<label for='GWAttackPriority_"+arrData[i][0]+"'>"+arrData[i][1]+"</label>";
		};

		var troopSelect2 = "><option value='0'></option><option value='1'>Camion de Suministro</option><option value='2'>Infanteria</option><option value='3'>Francotirador</option><option value='4'>Fuerzas Especiales</option>"+
											"<option value='5'>Batería SAM móvil</option><option value='6'>Tanque</option><option value='7'>Drone Predator</option><option value='8'>Caza</option>"+
											"<option value='9'>Chinook</option><option value='10'>Bombardero</option><option value='11'>Helicóptero de combate</option><option value='12'>Tactical Nuke</option></select>"
		var autoStuff="";
		var cities=this.GetSeed().cities;
		var cityName = '';
		var cityid = '';
		autoStuff+="<div style='margin-left:20px'><table><tr><td align=center>City</td><td align=center>Attack</td><td align=center>Train</td><td align=center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gold&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td align=center>Abandon Wilds</td></tr>";
		for(var i=0; i < cities.length; i++){
			cityid = cities[i][0];
			cityName = cities[i][1];
			autoStuff+="<tr><td align=right>"+cityName+":&nbsp;"+"</td>"+
								"<td align=center><input type='checkbox' "+(this.options.okCities[i+1]?'checked':'')+" id='AEAttack"+(i+1)+"'/></td>"+
								"<td align=center><SELECT id=AETrainTroop"+(i+1)+">"+
								"<option value='0'" + (this.options.trainTroops[i+1]=='0'?'SELECTED':'') + ">Auto Train - Off</option>"+
								"<option value='1'" + (this.options.trainTroops[i+1]=='1'?'SELECTED':'') + ">Camion de Suministro</option>"+
								"<option value='2'" + (this.options.trainTroops[i+1]=='2'?'SELECTED':'') + ">Infanteria</option>"+
								"<option value='3'" + (this.options.trainTroops[i+1]=='4'?'SELECTED':'') + ">Francotirador</option>"+
								"<option value='5'" + (this.options.trainTroops[i+1]=='5'?'SELECTED':'') + ">Fuerzas Especiales</option>"+
								"<option value='6'" + (this.options.trainTroops[i+1]=='6'?'SELECTED':'') + ">Batería SAM móvil</option>"+
								"<option value='7'" + (this.options.trainTroops[i+1]=='7'?'SELECTED':'') + ">Tanque</option>"+
								"<option value='8'" + (this.options.trainTroops[i+1]=='8'?'SELECTED':'') + ">Drone Predator</option>"+
								"<option value='9'" + (this.options.trainTroops[i+1]=='9'?'SELECTED':'') + ">Helicóptero de combate</option>"+
								"<option value='10'" + (this.options.trainTroops[i+1]=='10'?'SELECTED':'') + ">Chinook</option>"+
								"<option value='11'" + (this.options.trainTroops[i+1]=='11'?'SELECTED':'') + ">Caza</option>"+
								"<option value='12'" + (this.options.trainTroops[i+1]=='12'?'SELECTED':'') + ">Bombardero</option></select></td>"+
								"<td align=center><input type='checkbox' " + (this.options.autoGold[i+1]?'checked':'')+" id='AEGold"+(i+1)+"'/></td>"+
								"<td align=center><input type='checkbox' " + (this.options.abandonWilds[i+1]?'checked':'')+" id='AEWild"+(i+1)+"'/></td></tr>";
		}
		autoStuff+="</table></div><span style=\"font-size:10px; color:#555; line-height:18px; \">If you check Abandon Wilds then <B>all</B> current and future wilds will be abandoned in that city.</span><br />";

		div.style.display='block';
		div.innerHTML='';
		this.options=this.GetOptions();
		div.innerHTML="<form><table>"+
			"<tr><td valign='center' align='center'><img src='img/units/unit_6_50.jpg' /></td><td valign='top'>"+
			"Attack Order: <select id='GWAttackOrder'><option value='mostTroops'>Use most troops first</option><option value='closest'>Closest targets first</option></select><br />"+
			"Attack Type:&nbsp;&nbsp;"+
			"<input type='checkbox' "+(this.options.attackTypeCamp?'checked':'')+" id='GWAttackTypeCamp'>Camp"+
			"<input type='checkbox' "+(this.options.attackTypeCity?'checked':'')+" id='GWAttackTypeCity'>City (Attack)"+
			"<input type='checkbox'  "+(this.options.attackTypeTransport?'checked':'')+" id='GWAttackTypeTransport'>Transport"+
			"<input type='checkbox' "+(this.options.attackTypeWild?'checked':'')+" id='GWAttackTypeWild'>Wild"+
			"<br />Prioritise for: "+attackfirst+"<br />"+
			"<input id='GWAttackDelay' value='"+this.options.attackDelay+"' size='2' /> seconds between sending each attack<br />"+
			"Time between sending to the <b>same</b> target:<br />"+
			"<div style='margin-left:20px'><table>"+
			"<tr><td>Attack campamento terrorista:</td><td><input id='GWAttackMinsSinceLastCamp' value='"+(this.options.attackSecsSinceLastCamp/(60))+"' size='2' />mins</td><td>&nbsp;&nbsp;</td>"+
			"<td>Attack city:</td><td><input id='GWttackMinsSinceLastCity' value='"+(this.options.attackSecsSinceLastCity/(60))+"' size='2' />mins</td><td>&nbsp;&nbsp;</td>"+
			"<td>Scout city:</td><td><input id='GWAttackMinsSinceLastScout' value='"+(this.options.attackSecsSinceLastScout/(60))+"' size='2' />mins</td></tr>"+
			"<tr><td>Transport:</td><td><input id='GWAttackMinsSinceLastTransport' value='"+(this.options.attackSecsSinceLastTransport/(60))+"' size='2' />mins</td><td>&nbsp;&nbsp;</td>"+
			"<td>Attack wild:</td><td><input id='GWAttackMinsSinceLastWild' value='"+(this.options.attackSecsSinceLastWild/(60))+"' size='2' />mins</td></tr>"+
			"<tr></tr>"+
			"</table></div>"+
			"Minimum number of troops to keep at home:<br />"+
			"<div style='margin-left:20px'><table>"+
			"<tr><td align=right>When&nbsp;</td><td align=center>Cavalry</td><td align=center>Heavy</td><td align=center>Archer</td><td align=center>Ballista</td><td>Rally Point slot(s) reserved</td></tr>"+
			"<tr><td align=right>Defending:&nbsp;</td>"+
			"<td><input id='GWDefendMinCavalry' value='"    +(this.options.defendMinCavalry)+"' size='4' /></td>"+
			"<td><input id='GWDefendMinHeavy' value='"      +(this.options.defendMinHeavy)+"' size='4' /></td>"+
			"<td><input id='GWDefendMinArcher' value='"     +(this.options.defendMinArcher)+"' size='4' /></td>"+
			"<td><input id='GWCDefendMinBallista' value='"   +(this.options.defendMinBallista)+"' size='4' /></td>"+
			"<td><input id='GWDefendRallySlotsFree' value='"+(this.options.defendRallySlotsFree)+"' size='4' /></td></tr>"+
			"<tr><td align=right>Hiding:&nbsp;</td>"+
			"<td><input id='GWHideMinCavalry' value='"    +(this.options.hideMinCavalry)+"' size='4' /></td>"+
			"<td><input id='GWideMinHeavy' value='"      +(this.options.hideMinHeavy)+"' size='4' /></td>"+
			"<td><input id='GWideMinArcher' value='"     +(this.options.hideMinArcher)+"' size='4' /></td>"+
			"<td><input id='GWHideMinBallista' value='"   +(this.options.hideMinBallista)+"' size='4' /></td>"+
			"<td><input id='GWHideRallySlotsFree' value='"+(this.options.hideRallySlotsFree)+"' size='4' /></td></tr>"+
			"</table></div>"+
			"<input id='GWAttackRandom' value='"+this.options.randomPercent+"' size='2' />% random adjustment for all delays (to look more human).<br />"+
			"<input id='GWAttackMaxDistance' value='"+(this.options.attackMaxDistance)+"' size='2' /> max distance away from city to attack/transport.<br />"+
			"<input id='GWTransportMinimum' value='"+(this.options.transportMinimum)+"' size='9' /> minimum resources to leave behind before transporting.<br />"+
			"<input id='GWTransportMinFoodHours' value='"+(this.options.transportMinFoodHours)+"' size='2' /> minimum number of hours food to leave behind (if 0 then use above minimum).<br />"+
			"<input id='GWAttackLockAttackFromCity' type='checkbox' "+(this.options.lockAttackFromCity?'checked':'')+" /> Only launch attacks from city they were first launched from.<br />"+
			"<input id='GWAttackRetryMarch' type='checkbox' "+(this.options.retryMarch?'checked':'')+" /> Retry march if it has unknown/excess traffic error (reload after changing this).<br />"+
			"<input id='GWAttackImpendingStopAttack' type='checkbox' "+(this.options.impendingStopAttack?'checked':'')+" /> Stop auto attack on impending alert.<span style='color:red'> (Will not restart auto after the attack - risky)</span><br />"+
			"</td></tr>"+
			"<tr><td valign='center' align='center'><img src='img/chrome_message_up.png' /></td><td valign='top'>"+
			"<input id='KOCAttackCheckReportSecs' value='"+this.options.checkReportSecs+"' size='1' /> seconds between viewing, collecting and deleting reports.<br />"+
			"<input id='GWAttackNoViewReports' type='checkbox' "+(this.options.noViewReports?'checked':'')+" /> Disable viewing of reports (also disables recording and auto removal of reports).<br />"+
			"<input id='GWAttackRecordReports' type='checkbox' "+(this.options.RecordReports?'checked':'')+" /> Record and retain the last <input id='GWAttackKeepReports' value='"+this.options.keepReports+"' size='1' /> report(s) per stored attack.<br />"+
			"Auto-remove: <input id='GWAttackRemoveReports' type='checkbox' "+(this.options.autoRemoveReports?'checked':'')+" />  Camp, wild and transport reports.&nbsp;&nbsp;"+
			"<input id='GWCAttackRemoveFarmReports' type='checkbox' "+(this.options.autoRemoveFarmReports?'checked':'')+" /> Farm attack reports.<br />"+
			"</td></tr>"+
			"<tr><td valign='center' align='center'>"+
			"<img src='img/chome_alliance_up.png' /><br /><br /><br /><br />"+
			"<img src='img/gold_30.png' /><br /><br /><br /><br />"+
			"<img src='img/buildings/castle_lvl11.png' /></td><td valign='top'>"+
			"<input id='GWAttackPercentOfPopToTrain' value='"+this.options.percentOfPopToTrain+"' size='1' />% of idle population available before we auto train <input id='GWAttackPercentToTrainOfMax' value='"+this.options.percentToTrainOfMax+"' size='1' />% of max available.<br />"+
			"<input id='GWAttackAutoGoldHappiness' value='"+this.options.autoGoldHappiness+"' size='1' />% happiness before we click auto gold.&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<input id='GWAttackChangeCitySecs' value='"+(this.options.changeCitySecs)+"' size='1' /> seconds between changing cities.<br />"+
			"Cycle thru all the cities <input id='GWAttackCitiesDoneMax' value='"+(this.options.autoAttackCitiesDoneMax)+"' size='1' /> times and then wait "+
			"<input id='GWAttackCitiesDelay' value='"+this.options.waitAfterCitiesDone+"' size='1' /> secs before refreshing.<br />"+autoStuff+
			"</td></tr>"+
			"<tr><td valign='center' align='center'><img src='img/gems.png' /></td><td valign='top'>"+
			"<input id='GWAttackDisableInviteFriends' type='checkbox' "+(this.options.disableInviteFriends?'checked':'')+" /> Disable the annoying \"Invite Friends\" popup dialog in-game.<br />"+
			"<input id='GWAttackAutoHelpAlliance' type='checkbox' "+(this.options.autoHelpAlliance?'checked':'')+" /> Automatically help alliance members with building/researching.<br />"+
			"<input id='GWAttackHideAllianceHelpRequests' type='checkbox' "+(this.options.hideAllianceHelpRequests?'checked':'')+" /> Hide alliance help requests/reports in chat (if above is checked, then after helping).<br />"+
			"<input id='GWAttackAutoPublishGamePopups' type='checkbox' "+(this.options.autoPublishGamePopups?'checked':'')+" /> Automatically publish game popups (such as help requests) to facebook wall.<br />"+
			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If above is checked, what privacy setting should we use? <select id='KOCAttackAutoPublishPrivacy'><option value='80'>Everyone</option><option value='50'>Friends of Friends</option><option value='40'>Friends Only</option><option value='10'>Only Me</option></select><br />"+
			"<input id='GWAttackAutoLogBackIn' type='checkbox' "+(this.options.autoLogBackIn?'checked':'')+" /> Automatically log back into domain if disconnected.<br />"+
			"<input id='GWAttackEnableLogging' type='checkbox' "+(this.options.enableLogging?'checked':'')+" /> Enable a little bit of diagnostic logging in the Firefox Error Console.<br />"+
			"</td></tr>"+
			""+
			"<tr><td></td><td><table><tr><td>Paste or copy here:<br><a class='button20' id='GWAttackImportButton'><span>Import</span></a> <a class='button20' id='GWAttackExportButton'><span>Export</span></a></td>"+
			"<td><textarea rows='1' cols='42' id='KOCAttackImport'></textarea></td></tr></table></td></tr>"+
			"</table>"+
			"<TABLE width=100%><TR><TD>"+
			"<a id='GWAttackOptionsSave' class='button20'><span>Save</span></a>"+
			"<a id='GWAttackOptionsCancel' class='button20'><span>Cancel</span></a>"+
			"<a id='GWAttackOptionsReset' class='button20'><span>Reset options</span></a>"+
			"<a id='GWAttackOptionsResetAll' class='button20'><span>Reset all!</span></a>"+
			"<a id='GWAttackDeleteAllStoredAttacks' class='button20'><span>Delete all stored attacks</span></a>"+
			"</td><TD align=right>&nbsp;"+ GWAversion +"&nbsp;</td></tr></table></form>";
		var t=this;

		var importText=ById('KOCAttackImport');
		importText.addEventListener('focus',function() {
			importText.select();
		},false);
		ById('GWttackImportButton').addEventListener('click',function() {
			if(importText.value=="") return;
			t.ImportAllFromJSON(importText.value);
		},false);
		ById('GWAttackExportButton').addEventListener('click',function() {
			importText.value=t.ExportAllToJSON();
		},false);

		nHtml.SetSelect(ById('KOCAttackOrder'),this.options.attackOrder);
		ById('GWAttackOptionsCancel').addEventListener('click',function() {
			div.style.display='none';
		},false);
		ById('GWAttackOptionsReset').addEventListener('click',function() {
			t.ClearOptions();
			this.options=t.GetOptions();
			div.style.display='none';
		},false);
		ById('GWAttackOptionsResetAll').addEventListener('click',function() {
			t.FactoryReset();
			t.ReloadWindow();
		},false);
		ById('GWAttackDeleteAllStoredAttacks').addEventListener('click',function() {
			t.DeleteAllStoredAttacks();
			t.ReloadWindow();
		},false);

		nHtml.SetSelect(ById('GWAttackAutoPublishPrivacy'),this.options.autoPublishPrivacySetting);

		ById('GWAttackOptionsSave').addEventListener('click',function() {
			t.options.attackTypeCamp=ById('GWAttackTypeCamp').checked;
			t.options.attackTypeCity=ById('GWAttackTypeCity').checked;
			t.options.attackTypeScout=ById('GWAttackTypeScout').checked;
			t.options.attackTypeWild=ById('GWAttackTypeWild').checked;
			t.options.attackTypeTransport=ById('GWAttackTypeTransport').checked;

			for(var i=0; i < cities.length; i++) {
				t.options.okCities[i+1]=ById('AEAttack'+(i+1)).checked;
				t.options.trainTroops[i+1]=parseInt(ById('AETrainTroop'+(i+1)).value);
				t.options.autoGold[i+1]=ById('AEGold'+(i+1)).checked;
				t.options.abandonWilds[i+1]=ById('AEWild'+(i+1)).checked;
			}
			var attackpriority = ByName('KOCAttackPriority');
			if(attackpriority){
				for(var i = 0; i < attackpriority.length; i++) {
					if(attackpriority[i].checked) {
						t.options.attackpriority = attackpriority[i].value;
						break;
					}
				}
			}

			t.options.attackDelay=parseFloat(ById('GWAttackDelay').value);
			t.options.waitAfterCitiesDone=parseInt(ById('GWAttackCitiesDelay').value);
			t.options.keepReports=parseInt(ById('GWAttackKeepReports').value);
			t.options.checkReportSecs=parseInt(ById('GWAttackCheckReportSecs').value);
			t.options.changeCitySecs=parseInt(ById('GWAttackChangeCitySecs').value);
			t.options.defendRallySlotsFree=parseInt(ById('GWDefendRallySlotsFree').value);
			t.options.hideRallySlotsFree=parseInt(ById('GWideRallySlotsFree').value);
			t.options.autoGoldHappiness=parseInt(ById('GWAttackAutoGoldHappiness').value);
			t.options.percentOfPopToTrain=parseFloat(ById('GWAttackPercentOfPopToTrain').value);
			t.options.percentToTrainOfMax=parseFloat(ById('GWAttackPercentToTrainOfMax').value);

			var prev_disableInviteFriends = t.options.disableInviteFriends;
			t.options.disableInviteFriends=ById('GWAttackDisableInviteFriends').checked;
			if(prev_disableInviteFriends != t.options.disableInviteFriends)
				alert("You changed the option for disabling/enabling the \"Invite Friends\" feature.\nPlease note: You will need to refresh the entire game window for the new setting to take effect!");

			t.options.autoHelpAlliance=ById('GWAttackAutoHelpAlliance').checked;
			t.options.hideAllianceHelpRequests=ById('GWAttackHideAllianceHelpRequests').checked;
			t.options.autoPublishGamePopups=ById('GWAttackAutoPublishGamePopups').checked;
			t.options.autoPublishPrivacySetting=ById('GWAttackAutoPublishPrivacy').value;

			t.options.autoLogBackIn=ById('GWAttackAutoLogBackIn').checked;
			t.options.enableLogging=ById('GWAttackEnableLogging').checked;

			t.options.attackSecsSinceLastCamp=parseFloat(ById('GWAttackMinsSinceLastCamp').value)*60;
			t.options.attackSecsSinceLastWild=parseFloat(ById('GWAttackMinsSinceLastWild').value)*60;
			t.options.attackSecsSinceLastCity=parseFloat(ById('GWAttackMinsSinceLastCity').value)*60;
			t.options.attackSecsSinceLastScout=parseFloat(ById('GWAttackMinsSinceLastScout').value)*60;
			t.options.attackSecsSinceLastTransport=parseFloat(ById('GWAttackMinsSinceLastTransport').value)*60;
			t.options.defendMinCavalry=parseInt(ById('GWDefendMinCavalry').value);
			t.options.defendMinHeavy=parseInt(ById('GWDefendMinHeavy').value);
			t.options.defendMinArcher=parseInt(ById('GWDefendMinArcher').value);
			t.options.defendMinBallista=parseInt(ById('GWDefendMinBallista').value);
			t.options.hideMinCavalry=parseInt(ById('GWHideMinCavalry').value);
			t.options.hideMinHeavy=parseInt(ById('GWHideMinHeavy').value);
			t.options.hideMinArcher=parseInt(ById('GWHideMinArcher').value);
			t.options.hideMinBallista=parseInt(ById('GWHideMinBallista').value);
			t.options.randomPercent=parseFloat(ById('GWAttackRandom').value);
			t.options.transportMinimum=parseFloat(ById('GWTransportMinimum').value);
			t.options.transportMinFoodHours=parseFloat(ById('GWTransportMinFoodHours').value);
			t.options.attackMaxDistance=parseFloat(ById('GWAttackMaxDistance').value);
			t.options.autoAttackCitiesDoneMax=parseInt(ById('GWAttackCitiesDoneMax').value);

			t.options.attackOrder=ById('GWAttackOrder').value;

			t.options.lockAttackFromCity=ById('GWAttackLockAttackFromCity').checked;
			t.options.autoRemoveReports=ById('GWAttackRemoveReports').checked;
			t.options.autoRemoveFarmReports=ById('GWAttackRemoveFarmReports').checked;
			t.options.retryMarch=ById('GWAttackRetryMarch').checked;
			t.options.impendingStopAttack=ById('GWAttackImpendingStopAttack').checked;

			t.options.noViewReports=ById('GWAttackNoViewReports').checked;
			t.options.RecordReports=ById('GWAttackRecordReports').checked;

			t.SetOptions(t.options);
			div.style.display='none';
		},false);
	},

	AddOptionsLink:function() {
		var t=this;
		var a=ById('GWAttackOptionsLink');
		if(a) return;

		a=this.AddTabLink('Options');
		if(!a) {
			window.setTimeout(function() {
				t.AddOptionsLink();
			},t.GetRandTime(250));
			return;
		}
		a.id='GWAttackOptionsLink';
		a.addEventListener('click',function() {
			t.ShowOptionsDialog();
		},false);
	},

	AddViewAttacksLink:function() {
		var t=this;
		var a=ById('GWAttackViewAttacksLink');
		if(a) return;

		a=this.AddTabLink('View Attacks');
		if(!a) {
			window.setTimeout(function() {
				t.AddViewAttacksLink();
			},t.GetRandTime(250));
			return;
		}
		a.id='GWAttackViewAttacksLink';
		a.addEventListener('click',function() {
			t.ShowViewAttacksDialog();
		},false);
	},

	AddQueueKOCToolsLink:function() {
		var t=this;
		var a=ById('GWAttackQueueKOCToolsLink');
		if(a) return;

		a=this.AddTabLink('Queue @ KOCTools');
		if(!a) {
			window.setTimeout(function() {
				t.AddQueueKOCToolsLink();
			},t.GetRandTime(250));
			return;
		}
		a.id='GWAttackQueueGWToolsLink';
		a.addEventListener('click',function() {
			var params = "host=" + window.location.hostname.split('.')[0] + '&' + "servername=" + unsafeWindow.domainName + "&";
			for (var key in unsafeWindow.g_ajaxparams)
			params = params + key + "=" + unsafeWindow.g_ajaxparams[key] + "&";
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://www.koctools.com/queuegm.php?" + params,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					if(response.responseText != "1")
						window.alert(response.responseText);
					else
						window.alert(unsafeWindow.domainName + " added to queue.")
				}
			});
		},false);
	},

	AddTabLink:function(html) {
		// Resize main tab bar container
		var tab_container = ById("main_engagement_tabs");
		tab_container.style.width = "800px"; // was 715
		// Create new tab
		var a=document.createElement('a');
		a.className='navTab';
		a.innerHTML='<span>'+html+'</span>';
		var tabs=ById('GWAttackTabs');
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
			tabs.id='GWAttackTabs';
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

	TurnOffAutoAttack:function() {
		var t=this;
		var a=t.GetAutoAttack();
		if(a) {
			t.ClearAutoAttackTimeout();
			t.SetAutoAttack(null);
		}
		setTimeout(function(){t.SetAttackStatusMessage();},t.GetRandTime(250));
	},

	ToggleAutoAttack:function() {
	var toggle=ById('GWAttackToggle');
		var t=this;
		var a=t.GetAutoAttack();
		if(!a) {
			t.SetAutoAttack({'barbarian':true,'cities':{}});
			window.setTimeout(function() {
				t.SetAttackStatusMessage();
			},t.GetRandTime(250));
			t.RestartAutoAttack();
		} else {
			toggle.innerHTML='<span>Auto Attack - Off</span>';
			t.ClearAutoAttackTimeout();
			t.SetAutoAttack(null);
			window.setTimeout(function() {
				t.SetAttackStatusMessage();
			},t.GetRandTime(250));
		}
	},

	SetAttackStatusMessage:function() {
		var toggle=ById('GWAttackToggle');
		if(!toggle) {
				var t=this;
			toggle=this.AddTabLink('Auto Attack');
			if(!toggle) {
				window.setTimeout(function() {
					t.SetAttackStatusMessage();
				},t.GetRandTime(250));
				return;
			}
			toggle.id='GWAttackToggle';
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

	SetStatusMessage:function(str) {
		var mess=this.GetStatusMessage();
		var txt=ById('GWAttackMessage');
		if(!txt) {
			txt=document.createElement('span');
			mess.appendChild(txt);
		}
		txt.innerHTML=str;
	},
	GetStatusMessage:function() {
		var mess=ById('GWAttackStatus');
		if(!mess) {
			var timeHead=ById('kochead_time');
			mess=document.createElement('span');
			mess.id='GWAttackStatus';
			timeHead.parentNode.appendChild(mess);
		}
		return mess;
	},

	Log:function(str) {
		if(!this.options || !this.options.enableLogging) // disable logging
			return;
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
		if(this.currentServerId<0)
			this.currentServerId = GM_getValue("KOCAttackLastKnownServerID",-1);
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
			if(doneFunc)
				doneFunc.call(this);
			return;
		}
		var idx=0;

		var cookie='kocattack';
		var doccookie=document.cookie;
		while(true) {
			var i=doccookie.indexOf(cookie+'=',idx);
			if(i<0) {
				this.valuesCache={};
				return;
			}
			idx=i+cookie.length+1;
			var ch=doccookie.substring(i-1,i);
			if(i==0 || ch==';' || ch==' ' || ch=='=')
				break;
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
			"attackpriority":"None",
			"autoRemoveReports":true,
			"attackSecsSinceLastCity":3600*12,
			"attackSecsSinceLastScout":3600*12,
			"attackSecsSinceLastCamp":3600,
			"attackSecsSinceLastWild":3600,
			"attackSecsSinceLastTransport":60,
			"defendMinCavalry":0,
			"defendMinHeavy":0,
			"defendMinArcher":0,
			"defendMinBallista":0,
			"hideMinCavalry":0,
			"hideMinHeavy":0,
			"hideMinArcher":0,
			"hideMinBallista":0,
			"randomPercent":10,
			"transportMinimum":0,
			"transportMinFoodHours":26,
			"keepReports":2,
			"checkReportSecs":60,
			"attackMaxDistance":60,
			"lockAttackFromCity":true,
			"knightreset":true,
			"waitAfterCitiesDone":20,
			"autoAttackCitiesDoneMax":2,
			"changeCitySecs":20,
			"defendRallySlotsFree":0,
			"hideRallySlotsFree":0,
			"retryMarch":true,
			"noViewReports":false,
			"RecordReports":false,
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
			"trainTroops":[0,0,0,0,0,0,0,0,0,0],
			"autoGold":[false,false,false,false,false,false,false,false,false,false],
			"abandonWilds":[false,false,false,false,false,false,false,false,false,false],
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
		if(!attack)
			return true;
		if(attack.a) { attack = attack.a; }
		// Check the current marches to see if there's an existing attack underway from this city
		var current_marches=this.GetSeed().queue_atkp["city" + this.GetCurrentCityId()];
		for (var march in current_marches) {
			if(current_marches[march]['toXCoord'] == x && current_marches[march]['toYCoord'] == y){
				if(attack.suicidewavetime && attack.suicidewave){
					var nowSecs=new Date().getTime()/1000;
					var elapsedTime=nowSecs-attack.suicidewavetime;
					if(elapsedTime > 30 && attack.time < attack.suicidewavetime)
						return true;
				}
				return false;
				break;
			}
		}
		return true;
	},

	GetCommandHistory:function(history_log_name) {
		if(!history_log_name)
			var history_log_name = "default";
		var json=this.GetValue('PreviousCommandHistory_'+history_log_name,'{}');
		if(json=='') json='{}';
		var json_object=JSON2.parse(json);
		if(!json_object['items'])
			json_object['items'] = Array();
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
		if(items.length>log_length_limit)
			items = items.slice(items.length-log_length_limit);
		previous_commands['items'] = items;
		this.SetValue('PreviousCommandHistory_'+history_log_name,JSON2.stringify(previous_commands));
	},

	FindInCommandHistory:function(command_string, history_log_name) {
		if(!command_string){ return false; }
		if(!history_log_name){ var history_log_name = "default"; }
		// Get the previous history of commands
		var previous_commands = this.GetCommandHistory(history_log_name);
		var items = previous_commands['items'];
		for(var i=0; i<items.length; i++)
			if(items[i] == command_string)
				return true;
		return false;
	},

	GetGuiCoords:function() {
		var x=ById('modal_attack_target_coords_x');
		var y=ById('modal_attack_target_coords_y');
		if(!x || !y)
			return null;
		if(x.value.length<1 || y.value.length<1)
			return null;
		return [x.value,y.value];
	},

	SetAttackFromGui:function(box, resetTime) {
		var xy=this.GetGuiCoords();
		if(!xy) return null;
		if(!resetTime)
			resetTime=false;
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
		// If the last attack was sent at a time ago that is more than twice the attack delay,
		// then we assume something failed and we reset the multiple wave tracker so everything can continue.
		if(timeDifference > waveTimerDelay && this.SendingMultipleWaves==true)
			this.SendingMultipleWaves=false;
		return this.SendingMultipleWaves;
	},

	SetAttackFromGuiXY:function(x,y,box,isSuicideWave,locationType,resetTime) {

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
			if(otherIsSuicideWaveCheckbox){ if(otherIsSuicideWaveCheckbox.checked){isSuicideWave=true;} }
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
			return null;
		}

		var nowSecs=new Date().getTime()/1000;
		var monthAgo=nowSecs-(60*60*24*31);

		// ignore anything other than attack
		if(marchType==0 && locationType!="Transport") {
			var attack=this.GetAttack(x,y);
			if(!attack) attack={};
			attack.type=marchType;
			if(comment)
				attack.comment=comment.value;
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);
			var firstAttack=this.IsFirstAttackAtLocation(x,y);

			if(isSuicideWave) {
				attack.suicidewave=troops;
				attack.currenttattackwavetype = "suicide";
				attack.suicidewavetime = nowSecs;
				if(resetTime){ attack.suicidewavetime=monthAgo; }
				this.SendingMultipleWaves = true;
			} else {
				attack.time=nowSecs;
				if(resetTime){ attack.time=monthAgo; }
				if(!SuicideAttackDefined && firstAttack){
					attack.suicidewave=undefined;
				}
				attack.currenttattackwavetype = "normal";
				attack.troops=troops;
				this.SendingMultipleWaves = false;
			}

			attack.fromCity=this.GetCurrentCityId();

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
			if(!attack)
				attack={};
			attack.type=1; //If we got here presume to be transport mode
			//attack.ignore=true; // We set this to ignore for now until I can get the auto attack working
			if(comment)
				attack.comment=comment.value;
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
				if(!resource)
					continue;
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

			//Check if level is undefined
			if(!attack.levelInfo)
				attack.levelInfo={'type':locationType,'level':0};

			attack.currenttattackwavetype = "transport";
			this.prevAttack={'x':x,'y':y};
			this.SetAttack(x,y,attack);
			return attack;
		} else if(marchType==2 && locationType=="City") { // Scout
			// try to parse scouts
			var attack=this.GetAttack(x,y);
			if(!attack) attack={};
			attack.type=marchType;
			if(comment)
				attack.comment=comment.value;
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);

			attack.time=nowSecs;
			if(resetTime==true){ attack.time=monthAgo; }
			attack.troops=troops;
			attack.fromCity=this.GetCurrentCityId();

			//Check if level is undefined
			if(!attack.levelInfo){attack.levelInfo={'type':locationType,'level':0};}
			if(locationType==""){
				if(attack.levelInfo.type!=""){
					// a pre-defined location type was already entered before for this attack.
					locationType = attack.levelInfo.type;
				}else{
					// Default to camp if attack location type was absolutely not specified in any way
					locationType = "City";
				}
			}
			attack.levelInfo.type = locationType;

			attack.currenttattackwavetype = "scout";
			this.prevAttack={'x':x,'y':y};
			this.SetAttack(x,y,attack);
			return attack;
		} else
			this.prevAttack={'x':"350",'y':'350'};
		return null;
	},

	ToggleCurrenttAttackWaveType:function(x,y,manual_setting) {
		var original_attack = this.GetAttack(x,y);
		if(original_attack) {
			var attack = original_attack;
			if(original_attack.a)
				attack = original_attack.a;
			var previousattackwavetype = 'undefined';
			if(attack){
				if(attack.currenttattackwavetype)
					previousattackwavetype = attack.currenttattackwavetype;
				if(manual_setting)
					attack.currenttattackwavetype = manual_setting;
				else if(attack.suicidewave && attack.currenttattackwavetype == "bulkadded")
					attack.currenttattackwavetype = "suicide";
				else{
					// Toggle back and forth
					if(attack.suicidewave && attack.currenttattackwavetype == "normal")
						attack.currenttattackwavetype = "suicide";
					else
						attack.currenttattackwavetype = "normal";
				}
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
		if(!locationType)
			var locationType = "Camp"; //Default to camp
		if(!isSuicideWave)
			var isSuicideWave = false;
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
			if(locationType=="Transport")
				currenttattackwavetype = "transport";
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);
			var previous_suicidewave = undefined;
			if(attack && (SuicideAttackDefined || isSuicideWave))
				previous_suicidewave = attack.suicidewave;

			if(attack && !force) {
				if(SuicideAttackDefined && isSuicideWave==true)
					continue;
				else if(attack.troops)
					continue;
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
					if(previous_suicidewave && (!SuicideAttackDefined || !isSuicideWave))
						attack.suicidewave = previous_suicidewave;
				}
				attack.ignore=undefined;
				attack.currenttattackwavetype=currenttattackwavetype;
				this.SetAttack(x,y,attack);
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
		AddHtml(bulkAddDiv,"Copy and paste co-ords here, e.g. 343,434, one on each line.<br />Note: It will only add the target using the current number of troops on this screen.<br /><input id='KOCAttackBulkAddForce' type='checkbox' /> <label for=\"KOCAttackBulkAddForce\">Overwrite existing attack if one already exists</label><br />");

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

			if(i == 0) {
				objRadItem.defaultChecked = true;
				objRadItem.checked = true;
			}

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
				}else
					suicideWaveCheckbox.checked = false;
			}
		},false);

		AddHtml(bulkAddDiv,"<hr />");

		var coords=document.createElement('textarea');
		coords.wrap='off';
		coords.style.whiteSpace='nowrap';
		coords.cols=8;
		coords.rows=9;
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
			if(otherIsSuicideWaveCheckbox){ if(otherIsSuicideWaveCheckbox.checked){isSuicideWave=true;} }

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
			if(bulkAddDiv.style.display=='inline')
				bulkAddDiv.style.display='none';
			else
				bulkAddDiv.style.display='inline';
		},false);
		div.appendChild(bulkAddAttackLink);
		div.appendChild(bulkAddTable);
		return div;
	},

	hideAttackEffortsState : true,
	HideAttackEfforts:function() {
		var t = KOCAttack;
		if (!ById('modal_attack_march_boost')) { return; }
		var span = document.createElement('span');
		var a = document.createElement('a');
		a.innerHTML = 'Hide Attack/Speed Boosts';
		span.appendChild (a);
		if (t.hideAttackEffortsState)
			hideshow ('none');
		a.addEventListener('click', function(evt) {
			t.hideAttackEffortsState = !t.hideAttackEffortsState;
			hideshow();
		},false);
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
			}else if(attackTypeSelected==2){
				// Scout
				var KOCAttackLocationType_City = ById("KOCAttackLocationType_City");
				if(KOCAttackLocationType_City) { KOCAttackLocationType_City.checked = true; }
				var KOCAttackBulkAddLocationType_City = ById("KOCAttackBulkAddLocationType_City");
				if(KOCAttackBulkAddLocationType_City) { KOCAttackBulkAddLocationType_City.checked = true; }
			}else{
				// Default back to Camp
				var KOCAttackLocationType_Camp = ById("KOCAttackLocationType_Camp");
				if(KOCAttackLocationType_Camp) { KOCAttackLocationType_Camp.checked = true; }
				var KOCAttackBulkAddLocationType_Camp = ById("KOCAttackBulkAddLocationType_Camp");
				if(KOCAttackBulkAddLocationType_Camp) { KOCAttackBulkAddLocationType_Camp.checked = true; }
			}
		}

		function hideshow (){
			var attackTypeSelected = getAttackTypeSelected();
			var knightSelect=ById('modal_attack_knight');
			if(attackTypeSelected != 0)
				knightSelect.selectedIndex = 0;
			//else // going to stick with the default knight (the strongest one), just to see how it performs. Will go random if that knight is unavailable
			//	knightSelect.selectedIndex = 1+Math.floor(Math.random()*(knightSelect.options.length-1)); //Select random knight
			if (t.hideAttackEffortsState)
				disp = 'none';
			else
				disp = 'block';
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
						if (div.childNodes[i].style != undefined && div.childNodes[i].className != 'estimated')
							div.childNodes[i].style.display = disp;
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
		if(evt.initKeyboardEvent)
			evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
		else
			evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
		resource.dispatchEvent(evt);

		if(parseInt(resourceCount)>0) {
			if(resource.value!=resourceCount) {
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
		if(evt.initKeyboardEvent)
			evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
		else
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
		return this.options.autoGold[this.GetCurrentCityNum()];
	},

	SetAutoGold:function(v) {
		this.options.autoGold[this.GetCurrentCityNum()]=v;
		this.SetOptions(this.options);
	},

	GetAbandonWilds:function() {
		return this.options.abandonWilds[this.GetCurrentCityNum()];
	},

	SetAbandonWilds:function(v) {
		this.options.abandonWilds[this.GetCurrentCityNum()]=v;
		this.SetOptions(this.options);
	},

	CheckAutoRaiseGold:function() {
		if(!this.GetAutoGold()) return;
		var happiness=parseInt(this.GetSeed().citystats["city" + this.GetCurrentCityId()].pop[2]);
		if(happiness>=this.options.autoGoldHappiness)
			this.DoUnsafeWindow("modal_raise_gold();");
	},

	CheckAbandonWilds:function() {
		if(!this.GetAbandonWilds())
			return;
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
			if (abandonButton==undefined)
				continue;
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
								if(okay_btn)
									nHtml.Click(okay_btn);
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
		if(DisplayName)
			DisplayName = DisplayName.innerHTML;
		else
			DisplayName = null;
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
												// Check alliance help command history to make sure link hasn't already been processed
												if(!t.FindInCommandHistory(onclickCode, 'alliance_help')){
													t.DoUnsafeWindow(onclickCode);
													// Add the onclick code to the alliance help command history
													this.AddToCommandHistory(onclickCode, 'alliance_help');
												}
											}
										}
									}
								}
							}
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

					// Hide alliance request reports in chat
					if(this.options.hideAllianceHelpRequests){
						// Look for any alliance assist links in this current post item
						var myregexp1 = /You are # [1-5] of 5 to help/i;
						var myregexp2 = /\'s Kingdom does not need help\./i;
						var myregexp3 = /\'s project has already been completed\./i;
						var myregexp4 = /\'s project has received the maximum amount of help\./i;
						var myregexp5 = /Could not complete request, Player not found\./i;
						if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4) || thisPost.innerHTML.match(myregexp5)) {
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

			if(!t.domainLoginStartTime)
				t.domainLoginStartTime = Math.round(new Date().getTime() / 1000);
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
				statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging back into KoC in '+timeDifference+' seconds...</center>';
				if(timeDifference==0){
					statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging back into KoC now...</center>';
					var functionCall = {
						'action':'load_url',
						'parameters':'http://apps.facebook.com/kingdomsofcamelot/'
					};
					t.AddCrossIframeCommand("domain_selection_app_page", functionCall);
					t.domainLoginActionTaken=true;
					// Reload current window if things are unsuccessful
					window.setTimeout(function() {
						t.ReloadWindow();
					},10*1000);
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
			if(t.currentPage == command.pageName){
				if(command.functionCall.action == "load_url")
					setTimeout (function (){window.location.href=command.functionCall.parameters;}, 0);
				ArrayRemoveItem(commands.queue, i);
				commandsUpdated=true;
			}
		}
		if(commandsUpdated)
			this.SetCrossIframeCommands(commands);
	},

	OnCastleBoxAppear:function(box) {
		var incHappy=nHtml.FindByXPath(box,".//a[contains(@onclick,'increaseHappiness')]");
		incHappy.innerHTML="<span>Inc. Happiness</span>"
		var raiseGold=nHtml.FindByXPath(box,".//a[contains(@onclick,'raiseGold')]");
		raiseGold.innerHTML="<span>Inc. Gold</span>"
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
			//var price=ById('marketmod_price');
			//if(price && price.value=="0") price.value='1';
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
			window.setTimeout(function() {
				t.OnAttackBoxAppear(box);
			},1*1000);
			return;
		}

		this.StopWaitForAttackBoxAppear();
		if(ById('KocAttackComment'))
			return;

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
		div.appendChild (div2);
		div2.appendChild (div3);

		var xy=this.GetGuiCoords();
		var attack=null;
		if(xy)
			attack=this.GetAttack(xy[0],xy[1]);
		var notFullTroops=false;
		var notFullResources=false;

		var knightSelect=ById('modal_attack_knight');
		var totalTroops=0;
		var totalResources=0;
		var attackTypeSelected = getAttackTypeSelected ();
		if(attack) {
			ignore.checked=attack.ignore?true:false;
			deletefarmno.checked=attack.deletefarmno?true:false;
			if(attack.time)
				AddHtml(div,'Last attack: '+SecsToStr(nowSecs-attack.time)+' ago<br />');
			if(attack.comment)
				comment.value=attack.comment;

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
			if(levelInfo && levelInfo.type)
				locationType = levelInfo.type;
			if(wildtype[levelInfo.type])
				locationType = wildtype[levelInfo.type];
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

			// fill things depending on the mode.
			if (attackTypeSelected==1) // transport
				ById('KOCAttackLocationType_Transport').checked;
			else if (attackTypeSelected==2) // scout
				ById('KOCAttackLocationType_City').checked;
			if(attackTypeSelected==0 && attack.type==0) { // attack
				SuicideAttackDefined = this.isSuicideAttackDefinedAtLocation(xy[0], xy[1]);
				var firstAttack = this.IsFirstAttackAtLocation(xy[0], xy[1]);
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

				if(this.knightmarchid == knightSelect.options[knightSelect.selectedIndex].value)
					knightSelect.selectedIndex = 1+Math.floor(Math.random()*(knightSelect.options.length-1)); //Select random knight if last knight didn't go out
			} else if(attackTypeSelected==2 && attack.type==2) { // scout
				for(var tr=0; tr<attack.troops.length; tr++) {
					var troopCount=attack.troops[tr];
					if(!troopCount) continue;
					totalTroops+=troopCount;

					if(this.SetTroopInput(tr,troopCount)=='notfull')
						notFullTroops=true;
				}

				// We don't send a knight with scouts
				knightSelect.selectedIndex = 0;
			} else if (attackTypeSelected==1 && attack.type==1) { // transport

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

					if(this.SetTroopInput(tr,troopCount)=='notfull')
						notFullTroops=true;
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
					}
					ma.innerHTML=mess;

	//{"time":1273315720.514,"troops":"test","type":0,"messages":[["Attack (326,97) - Barbarian Camp Lv. 2 (NewCity4216)","modal_messages_viewreports_view(\"529747\",1,51,2,0,\"Enemy\",\"0\",\"niknah\",\"M\",4,326,97,1273312617,1,333,110);return false;"],["Attack (326,97) - Barbarian Camp Lv. 2 (NewCity4216)","modal_messages_viewreports_view(\"529747\",1,51,2,0,\"Enemy\",\"0\",\"niknah\",\"M\",4,326,97,1273312617,0,333,110);return false;"]]}

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
		}

		var ChangeAttack=function() {
			var xy=t.GetGuiCoords();
			var attack=null;
			if(xy) {
				attack=t.GetAttack(xy[0],xy[1]);
			}
			if(!attack) attack={};
			if(getAttackTypeSelected()!=attack.type)
				return;

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
		divContainer.style.height = '420px';
		divContainer.style.maxHeight = '420px';
		divContainer.style.overflowY = 'auto';
		divContainer.appendChild(this.HideAttackEfforts());
		divContainer.appendChild(div);
		divContainer.appendChild(this.BulkAddAttackLink(box));
		document.getElementById ('modal_attack').style.top = '100px';
		document.getElementById ('modal_attack').appendChild(divContainer);

		this.AttachXYPaste('modal_attack_target_coords_x','modal_attack_target_coords_y');

		var autoAttack=this.GetAutoAttack();
		if(autoAttack && autoAttack.x==xy[0] && autoAttack.y==xy[1] && !ignore.checked) {

			autoAttack.x=autoAttack.y=-1;
			this.SetAutoAttack(autoAttack);

			if(totalTroops>0
			&& (knightSelect.options.length>1 || attackTypeSelected==1 || attackTypeSelected==2)//If transport or scout then you don't need a knight
			&& !notFullTroops
			&& !notFullResources
			&& btnMarch.className.indexOf('grey')<0) {
				var t=this;
				window.setTimeout(function() {
					t.autoAttacksThisCity++;
					t.ClickMarch(btnMarch, box, false);
					this.knightmarchid = knightSelect.options[knightSelect.selectedIndex].value;
				},t.GetRandTime(1000));

				if(!this.nextAutoAttackTimeout) {
					this.nextAutoAttackTimeout=setTimeout(function() {
						// let's attack again in a few secs.
						t.nextAutoAttackTimeout=null;
						t.NextAutoAttack();

					},t.GetRandTime(1000*this.options.attackDelay));
				}
				return;
			} else {
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
			if(!m)
				continue;
			var typeNum=m[3].replace('"','');
			var type=this.squareTypeNums[typeNum];
			if(!type)
				continue;
			if(typeNum=="51" && m[5]!='0') { //Gradually replace all attack types to follow Tom's new method of storing attacks
				if(attack.type==0 || attack.type==2)
					type='City';
				else if (attack.type==1)
					type='Transport';
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
					owner=" "+onclickM[6].StripQuotes()+'<br />Might:'+might;
				}
			}
			var m=lvRe.exec(a.className);
			if(!m) continue;
			var sp=a.getElementsByTagName('span');
			if(sp.length==0) continue;

			if(!idDone) {
				a.id='levelIcons';
				idDone=true;
			}
			sp[0].style.color='#cc0';
			sp[0].innerHTML='&nbsp;'+m[1]+owner;
		}

	},

	AttachXYPaste:function(xId,yId,func) {
		var x=ById(xId);
		if(!x)
			return;
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

				if(func!=undefined)
					func(xI[0],xI[1]);
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
			if(t.options.lockAttackFromCity && attack.fromCity!=unsafeWindow.currentcityid) { return; }
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
			if(t==6 && parseInt(neededTroops[t])>0) {
				if(cityStatus=="Defending" && (parseInt(neededTroops[t])+parseInt(this.options.defendMinArcher))>parseInt(currentTroops[t]))
					return false;
				if(cityStatus=="Hiding" && (parseInt(neededTroops[t])+parseInt(this.options.hideMinArcher))>parseInt(currentTroops[t]))
					return false;
			}
			else if(t==7 && parseInt(neededTroops[t])>0) {
				if(cityStatus=="Defending" && (parseInt(neededTroops[t])+parseInt(this.options.defendMinCavalry))>parseInt(currentTroops[t]))
					return false;
				if(cityStatus=="Hiding" && (parseInt(neededTroops[t])+parseInt(this.options.hideMinCavalry))>parseInt(currentTroops[t]))
					return false;
			}
			else if(t==8 && parseInt(neededTroops[t])>0) {
				if(cityStatus=="Defending" && (parseInt(neededTroops[t])+parseInt(this.options.defendMinHeavy))>parseInt(currentTroops[t]))
					return false;
				if(cityStatus=="Hiding" && (parseInt(neededTroops[t])+parseInt(this.options.hideMinHeavy))>parseInt(currentTroops[t]))
					return false;
			}
			else if(t==10 && parseInt(neededTroops[t])>0) {
				if(cityStatus=="Defending" && (parseInt(neededTroops[t])+parseInt(this.options.defendMinBallista))>parseInt(currentTroops[t]))
					return false;
				if(cityStatus=="Hiding" && (parseInt(neededTroops[t])+parseInt(this.options.hideMinBallista))>parseInt(currentTroops[t]))
					return false;
			}
			else
				if(parseInt(neededTroops[t])>parseInt(currentTroops[t]))
					return false;
		}
		return true;
	},

	IsEnoughResources:function(currentResources,neededResources) {
		for(var t=0; t<neededResources.length; t++) {
			if(!neededResources[t]) continue;
			if(t==1 && this.options.transportMinFoodHours>0) {
				if(parseInt(neededResources[1]+this.options.transportMinFoodHours*this.GetCityFoodExpenditure())>parseInt(currentResources[1]))
					return false;
			} else {
				if(parseInt(neededResources[t]+this.options.transportMinimum)>parseInt(currentResources[t]))
					return false;
			}
		}
		return true;
	},

	GetCityFoodExpenditure:function() {
		var wilds = 0;
		var cityID = 'city'+ this.GetCurrentCityId();
		var w = this.GetSeed().wilderness[cityID];
		for (var k in w){
			var type = parseInt(w[k].tileType);
			if (type==10 || type==11)
				wilds += parseInt(w[k].tileLevel);
		}

		var knight = 0;
		var now = parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
		var s = this.GetSeed().knights[cityID];
		if (s) {
			s = s["knt" + this.GetSeed().leaders[cityID].resourcefulnessKnightId];
			if (s){
				var knight = parseInt(s.resourcefulness);
				if (s.resourcefulnessBoostExpireUnixtime > now)
					knight *= 1.25;
			}
		}
		var workerFactor = 1;
		var c = parseInt(this.GetSeed().citystats[cityID]["pop"][0]); // Current population
		var w = parseInt(this.GetSeed().citystats[cityID]["pop"][3]); // Labor force
		if (w > c)
			workerFactor = c / w;


		var usage = this.GetSeed().resources[cityID]["rec1"];
		var items = 0;
		if (parseInt(this.GetSeed().playerEffects["r1BstExp"]) > now)
			items = 0.25;
		var tech = this.GetSeed().tech["tch1"];
		ret = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + 0.05 * wilds) * workerFactor + 100));
		var foodUsage = parseInt(this.GetSeed().resources[cityID]['rec1'][3]);
		ret = foodUsage - ret;
		return ret;
	},

	currentMarchesNum:0,
	available_marches_num:0,
	DetermineCurrentMarchesNum:function() {
		var marchesnum = 0;
		var troopactivity = ById("untqueue_list");
		if(troopactivity && troopactivity.style.display!="none" && troopactivity.style.visibility!="hidden")
			marchesnum = troopactivity.childNodes.length;
		this.currentMarchesNum = marchesnum;
		return marchesnum;
	},

	currentRallyPointLevel:0,
	cityStatus:"Hiding",

	DetermineCurrentRallyPointLevel:function() {
		var cityID = 'city'+ this.GetCurrentCityId();
		var b = this.GetSeed().buildings[cityID];
		for (var i=1; i<33; i++){
			if (b['pos'+i] && b['pos'+i][0] == 12){
				rallypointlevel = parseInt(b['pos'+i][1]);
				break;
			}
		}
		var defendorhide = parseInt(this.GetSeed().citystats[cityID].gate);
		var rallyslotsfree;
		if (defendorhide == 0) {
			cityStatus = "Hiding";
			rallyslotsfree = this.options.hideRallySlotsFree;
		} else {
			cityStatus = "Defending";
			rallyslotsfree = this.options.defendRallySlotsFree;
		}
		// Return the actual level less the number of slots we are reserving for other things, e.g. BOT reassigns & transports
		this.currentRallyPointLevel = rallypointlevel - rallyslotsfree;
		return rallypointlevel;
	},

	GetLevelInfo:function(attack) {
		if(!attack) throw('GetLevelInfo: attack is null');
		var levelI=attack.levelInfo;
		if((!levelI || levelI.level==0) && attack.messages && attack.messages.length>0)
			levelI=this.FindLevelFromMessages(attack);
		if (!levelI && (attack.currenttattackwavetype == 'transport'))
			return {'type':'Transport','level':0};
		if (!levelI)
			return {'type':'Camp','level':0}; // Default to camp
		if(levelI.type==""){levelI.type="Camp";}
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

		// Make sure we have at least one available slot in attack queue for normal attack before trying to find any kind of attack
		if(this.currentRallyPointLevel <= this.currentMarchesNum)
			return bestAttack;

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
			var levelInfo=this.GetLevelInfo(attack.a);
			if(!levelInfo) continue;

			if(levelInfo.type == ""){levelInfo.type = this.FindLevelFromMessages(attack);;} // If empty look in messages
			if(levelInfo.type == ""){levelInfo.type = "City";} // If still blanck default to city

			if(levelInfo.type=='Camp') {
				if(this.options.attackTypeCamp!=true) continue;
			} else if(wilderness[levelInfo.type]) {
				if(this.options.attackTypeWild!=true) continue;
			} else if (levelInfo.type!='Camp' && !wilderness[levelInfo.type]) {
				var tempAttack=this.GetAttack(attack.x,attack.y);
				if(!tempAttack)
					continue;
				if(tempAttack.type==0) {
					if(this.options.attackTypeCity!=true) continue;
				} else if(tempAttack.type==1) {
					if(this.options.attackTypeTransport!=true) continue;
				} else if(tempAttack.type==2) {
					if(this.options.attackTypeScout!=true) continue;
				}
			} else {
				if(levelInfo.type!='City' && levelInfo.type!='Camp') continue;
			}

			if(!attack.a.troops) continue;
			if(attack.a.ignore) continue;
			if(attack.dist>=this.options.attackMaxDistance) continue;
			if(this.options.lockAttackFromCity)
				if(attack.a.fromCity!=undefined)
					if(currentCity!=attack.a.fromCity) continue;

			var troops_to_send = attack.a.troops;
			if(attack.a.suicidewave){
				// Count up all the troops in *both* attack waves. we don't want to launch suicide wave if we can't follow it up.
				var suicide_troops = attack.a.suicidewave;
				for(var t=0; t<suicide_troops.length; t++) {
					if(!suicide_troops[t]) continue;
					troops_to_send[t] = troops_to_send[t] + suicide_troops[t];
				}
			}

			// Make sure we have more than two available slots in attack queue if this is a suicide wave (unless there are only two slots even allowed)
			this.available_marches_num = this.currentRallyPointLevel - this.currentMarchesNum;
			if(attack.a.suicidewave && attack.a.currenttattackwavetype != "normal"){
				if(this.available_marches_num < 2 || this.currentRallyPointLevel < 2){
					// Make sure this is the first wave of the multi-wave attack and then don't send it if there aren't enough marching slots for both waves
					if(this.IsFirstAttackAtLocation(attack.x, attack.y)) // This is the first wave
						break;
				}
			}

			// Make sure we have at least one available slot in attack queue for normal attack
			if(this.available_marches_num<1) break;

			if(!this.IsEnoughTroops(currentTroops,troops_to_send)) continue;

			if (attack.a.type==1)
				if(!this.IsEnoughResources(currentResources,attack.a.resources)) continue;
			var lastAttack;
			if(!attack.a.time)
				lastAttack=60*60*24*31;
			else
				lastAttack=nowSecs-parseInt(attack.a.time);
			if(levelInfo.type=='' || levelInfo.type=='City' || levelInfo.type=='Transport') {
				if(attack.a.type==0) {
					if(lastAttack<this.options.attackSecsSinceLastCity)
						continue;
				} else if(attack.a.type==1) {
					if(lastAttack<this.options.attackSecsSinceLastTransport)
						continue;
				} else {
					if(lastAttack<this.options.attackSecsSinceLastScout)
						continue;
				}
			} else if(levelInfo.type=='Camp') {
				if(lastAttack<this.options.attackSecsSinceLastCamp)
					continue;
			} else {
				if(lastAttack<this.options.attackSecsSinceLastWild)
					continue;
			}
			var armySize=0;
			for(var t=0; t<attack.a.troops.length; t++) {
				if(!attack.a.troops[t])
					continue;
				armySize+=parseInt(attack.a.troops[t]);
			}
			if(attack.a.suicidewave) {
				var suicideArmySize=0;
				for(var t=0; t<attack.a.suicidewave.length; t++) {
					if(!attack.a.suicidewave[t])
						continue;
					suicideArmySize+=parseInt(attack.a.suicidewave[t]);
				}
				if(suicideArmySize<=0)
					continue;
			}
			if(armySize<=0)
				continue;

			var ok=0;
			if(this.options.attackOrder=='mostTroops') {
				if(bestAttackSize<armySize) {
					ok=1;
				}
			} else {
				if(this.options.attackOrder!='closest') {
					//this.Log('Unknown order:'+this.options.attackOrder);
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
		} else
			this.priorityattack = true;
		return bestAttack;
	},

	IsMapperRunning:function() {
		if(ById('SendMap'))
			return true;
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
			this.Log('failed to parse autoattack:'+aStr);
			this.SetValue('AutoAttack','');
			return null;
		}
	},

	SetAutoAttack:function(s) {
		if(s) {
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
			if(xcoord && ycoord)
				return {'x':xcoord.value,'y':ycoord.value};
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
				if(!attackI.a.time)
					lastAttack=60*60*24*31;
				else
					lastAttack=nowSecs-parseInt(attackI.a.time);
				if(lastAttack<(60*60*minHrsSinceAttack)) continue;

				var levelI=this.GetLevelInfo(attackI.a);
				var m=( (levelI!=null && levelI.type) ?(levelI.type.charAt(0)+levelI.level):'');
				if(viewType=="" || m.substring(0,viewType.length)==viewType) {
					var dist=this.CalcXYDist({'x':attackI.x,'y':attackI.y},mapCoord);
					if(dist>=this.options.attackMaxDistance)
						break;

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
					attackA.title=(levelI!=null?(levelI.type+' '+levelI.level):'');
					if(attackI.a.comment)
						attackA.title+=", "+attackI.a.comment;
					if(attackI.a.time && !isNaN(lastAttack)) // if we only scouted or transported to someone they won't have a last attack time.
						m=m+'@'+SecsToStr(lastAttack);
					attackA.innerHTML=m;
					attackA.addEventListener('click',function(e) { AttackClosestFarm(e); },false);
					td.appendChild(attackA);

					if(t.expandedInfo) {
						var troops=attackI.a.troops;
						var troopList='';
						if(troops) {
							for(var tupto=0; tupto<troops.length; tupto++) {
								var num=parseInt(troops[tupto]);
								var am=0;
								if(attackI.a.suicidewave)
									am=attackI.a.suicidewave[tupto];
								if(num+am>0){
									troopList+=troopNames[tupto]+":";
									if(num>0)
									troopList+=num;
									if(am>0)
										troopList+="("+am+")";
									troopList+=",";
								}
							}
							AddText(tr.insertCell(-1),troopList.substring(0, troopList.length - 1));
						}
					}

					var aDelete=document.createElement('a');
					aDelete.innerHTML='X';
					aDelete.title='Delete';
					aDelete.addEventListener('click',function(e) { DeleteFarm(e); },false);
					tr.insertCell(-1).appendChild(aDelete);

					aDone++;
				}
			} catch(e) {
				this.Log('Error:'+e);
			}
		}

		div.appendChild(table);
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
		if(m)
			return m[1]+"0"+m[3];
		return a;
	},

	IterateArmy:function(f) {
		if(!this.GetSeed()) return;
		var armyDiv=ById('cityinfo_3');
		var units=this.GetSeed().units["city"+unsafeWindow.currentcityid];
		var uRe=/([0-9]+)$/;
		for(var u in units) {
			var m=uRe.exec(u);
			if(!m) continue;
			f.call(this,m[1],units[u]);
		}
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
		this.DoUnsafeWindow("modal_messages();");
		this.DoUnsafeWindow('track_chrome_btn("messages_btn");');
		this.DoUnsafeWindow('modal_messages_viewreports();');
	},

	autoAttackCitiesDone:0,
	autoAttackCityUpto:1,
	autoAttackModalWaiting:false,
	autoAttackTimeout:null,
	autoAttacksThisCity:0,
	ClearAutoAttackTimeout:function() {
		if(this.autoAttackTimeout!=null) {
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
		this.ClearAutoAttackTimeout();
		this.autoAttackTimeout=window.setTimeout(function() {
			if(t.autoAttackTimeout==null) return;
			t.autoAttackTimeout=null;
			if(t.IsMapperRunning() || t.IsCurrentlySendingMultipleWaves()) {
				// don't reload until the mapper or multi-wave attack has finished.
				window.setTimeout(function() {
					t.StartReloadPageTimer();
				},0);
				return;
			}
			t.SetValuesCache();
			t.ReloadWindow();
		},refreshMSecs);
	},

	multipleWaveTimeout:null,
	ClearMultipleWaveTimeout:function() {
		if(this.multipleWaveTimeout!=null) {
			window.clearTimeout(this.multipleWaveTimeout);
			this.multipleWaveTimeout=null;
		}
	},
	StartMultipleWaveTimer:function(secs) {
		var t=this;
		if(!secs) secs=t.options.attackDelay;
		var attackDelayMSecs=t.GetRandTime(1000*secs);
		this.ClearMultipleWaveTimeout();
		this.multipleWaveTimeout=window.setTimeout(function() {
			if(t.multipleWaveTimeout==null) return;
			t.multipleWaveTimeout=null;
			if(t.IsCurrentlySendingMultipleWaves()) {
				// don't switch cities until the multi-wave attack has finished.
				window.setTimeout(function() {
					t.StartMultipleWaveTimer();
				},0);
				return;
			}
			t.NextAutoAttackCity();
		},attackDelayMSecs);
	},

	lastOpenViewReports:0,
	CheckReports:function() {
		var t=this;
		var autoAttack=this.GetAutoAttack();
		if(!autoAttack)
			return;

		// Load the reports every minute or on initial page load
		if(!this.options.noViewReports) {
			var nowSecs=new Date().getTime()/1000;
			if((this.lastOpenViewReports+(this.options.checkReportSecs))<nowSecs) {
				this.lastOpenViewReports=nowSecs;
				this.OpenViewReports();
				this.bringUpReports=true;
				if(this.options.autoRemoveReports || this.options.autoRemoveFarmReports)
					this.autoAttackRemoveReports=true;
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
			if(this.options.okCities[i])
				enabledCities++;
		}
		if(enabledCities==1){ t.prevCurrentCity = -1; }
		// Determine the number of the city and store it
		t.SetCurrentAttackCityNum(cityA.id.replace("citysel_",""));
		t.nextAutoAttackWanted=window.setTimeout(function() {
			if(t.nextAutoAttackWanted!=null) {
				if(tries>4) {
					t.NextAutoAttackCity();
					return;
				}
				// Didn't change city
				t.ClickChangeCity(cityA,tries+1);
			}
		},10*1000);
	},

	NextAutoAttackCity:function() {
		var t=this;
		var autoAttack=this.GetAutoAttack();
		if(!autoAttack) return;

		if(this.IsCurrentlySendingMultipleWaves()){
			t.ClearMultipleWaveTimeout();
			t.StartMultipleWaveTimer();
			return;
		}else
			t.ClearMultipleWaveTimeout();

		// change to next city
		this.autoAttacksThisCity=0;

		var cityA=null;

		while(true) {
			this.autoAttackCityUpto++;
			cityA=ById('citysel_'+this.autoAttackCityUpto);
			//~~~ problem here when under attack, the city isn't marked as selected?
			if((cityA && cityA.className && cityA.className.indexOf('city_selected')>=0) || (!this.options.okCities[this.autoAttackCityUpto])) {
				//this.Log('Skip city, current city or city not selected: '+this.autoAttackCityUpto);
			} else {
				cityA=ById('citysel_'+this.autoAttackCityUpto);
				break;
			}
		}

		cityA=ById('citysel_'+this.autoAttackCityUpto);
		if(!cityA) {
			// go back to the 1st available city
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
				this.nextAutoAttackTimeout=setTimeout(function() {
					t.nextAutoAttackTimeout=null;
					t.SetValuesCache();
					t.ClickChangeCity(cityA,0);
				},secs);
			} else {
				//this.Log('Cannot change city. Reason: about to attack or change city');
			}
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
			window.setTimeout(function() {
				t.OpenAttackDialog(bestAttack);
			},0);
		},5*1000);

		//~~~ strange things here, sometimes the attack dialog is on screen but modalid is not updated
		if(ById('modal_attack')) {
			try {
				var countOut=10;
				while(countOut-->=0) {
					var maxi=0;
					for(var i=0; i<20; i++)
						if(ById('modalBox'+i))
							maxi=i;
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
			// Toggle attack waves between suicide and normal mode
			this.ToggleCurrenttAttackWaveType(bestAttack.x,bestAttack.y);
			// Update the last attack sent time
			this.UpdateAttackLastSentTime();
		} else if (bestAttack.type==1) {
			unsafeWindow.modal_attack(1,bestAttack.x,bestAttack.y);
		} else if (bestAttack.type==2) {
			unsafeWindow.modal_attack(3,bestAttack.x,bestAttack.y);
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
			this.NextAutoAttackCity();
			return;
		}

		if(!autoAttack || (autoAttack.x!=undefined && autoAttack.x!=-1)) return;
		if(this.IsMapperRunning()) {
			this.StartReloadPageTimer();
			return;
		}
		this.available_marches_num = this.currentRallyPointLevel - this.currentMarchesNum;
		var currentTroops=this.GetArmySize();
		var currentResources=this.GetResourcesSize();
		var mapCoord=this.GetCurrentMapCoord();
		var attacks=this.GetClosestAttacks(mapCoord.x,mapCoord.y);
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
				if(waitedCount>20)
					t.DoUnsafeWindow('Modal.hideModalAll();');
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
			this.SetAutoAttack(autoAttack);
			// no valid attacks for this city.
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

	DeleteFarmAttacks:function() {
		var deletes=0;
		this.IterateMsgReports(function(a,tr,desc,x,y) {
			var DisplayName = this.GetDisplayName();
			DisplayName = /([^"]+) ([^"]+)/.exec(DisplayName);

			var onclick=a.getAttribute('onclick');
			if(!onclick) return false;
			onclick=onclick.trim();
			var m=this.onclickReportRe.exec(onclick);
			if(this.IsOnclickMyselfToMyself(onclick))
				return true; //Don't select transports
			else if(m && m[5]=='0')
				return true; //Don't select barbs or wilds
			else if(m && m[11]=='0' && m[12]=='0')
				return true; //Don't select if empty
			else if(m && m[8].StripQuotes()!=DisplayName[2])
				return true; //Don't select if attacker is not yourself
			var attack = this.GetAttack(m[11],m[12]); //Check if attack exists in system
			if(!attack) return true;
			if(attack.deletefarmno) return true; //Don't select if checked not to delete
			if(!attack.troops) return true; //Sometimes the script will record reports but u don't want them deleted
			var inps=tr.getElementsByTagName('input');
			if(inps.length>=1)
				inps[0].checked=true;

			deletes++;
			return true;
		});
		if(deletes>0)
			this.DoUnsafeWindow('modal_messages_reports_chkdel();');
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
		a.innerHTML='<span>Delete W/B/T</span>';
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
			var closestNum=1;
			for(var c=0; c<cities.length; c++) {
				var city=cities[c];
				var cityLoc={'x':city[2],'y':city[3]};
				var dist=this.CalcXYDist({'x':x,'y':y},cityLoc);
				if(dist<closestDist) {
					closestDist=dist;
					closestLoc=cityLoc;
					closestNum=c+1;
				}
			}
			var onclick=a.getAttribute('onclick');
			var m=this.onclickReportRe.exec(onclick);
			if(m && m[5]=='0')
				tr.cells[1].style.color='#888';
			if(closestLoc!=null) {
				var td=tr.insertCell(-1);
				td.style.textAlign='right';
				var loctd=tr.insertCell(-1);
				loctd.style.textAlign='center';
				AddHtml(loctd,'<A onclick=\"aaGotoCity(' + closestNum + ')\">' + closestLoc.x+','+closestLoc.y + '</a>');
				AddText(td,Math.floor(closestDist));
			}
			return true;
		});
	},

	IterateAttacks:function(f) {
		if(this.isChrome)
			return;
		var names=this.browser_listValues();
		var attackPrefix='attack_'+this.GetServerId()+'_';
		for(var n=0; n<names.length; n++) {
			var name=names[n];
			if(name.substring(0,attackPrefix.length)!=attackPrefix)
				continue;
			f(name,this.browser_getValue(name));
		}
	},

	prevClearMessages:0,
	ClearMessages:function() {
		var nowSecs=new Date().getTime()/1000;
		if((this.prevClearMessages+(10*60)) > nowSecs)
			return;
		this.prevClearMessages=nowSecs;

		var keepReports=this.isChrome?this.options.chromeKeepReports:this.options.keepReports;
		if(keepReports<=0) // must keep at least 1 report to get level information.
			keepReports=1;
		var t=this;
		this.IterateAttacks(function(name,value) {
			var attack=JSON2.parse(value);
			if(attack.messages && attack.messages.length>keepReports)
				attack.messages.splice(0,attack.messages.length-keepReports+1);
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
			a.innerHTML='<span>'+(t.options.trainTroops[t.GetCurrentCityNum()]==type?'Auto Train - On':'Auto Train - Off')+'</span>';
		}
		a.addEventListener('click',function() {
			t.options.trainTroops[t.GetCurrentCityNum()]=t.options.trainTroops[t.GetCurrentCityNum()]==type?0:parseInt(type);
			t.SetOptions(t.options);
			setTrainTroopsA();
		},false);
		setTrainTroopsA();

		AddText(pnode,' ');
		pnode.appendChild(a);
	},

	GetCurrentCityId:function() {
		if(!unsafeWindow.currentcityid) return null;
		return unsafeWindow.currentcityid;
	},

	GetCurrentCityNum:function() {
		var cities=this.GetSeed().cities;
		for(i=0; i<cities.length; i++){
			if(cities[i][0]==unsafeWindow.currentcityid){
				return i+1;
				break;
			}
		}
		if(!unsafeWindow.currentcityid) return null;
		var cityid=unsafeWindow.currentcityid;
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
		if(!curCityNum)
			var curCityNum = 1;
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
		if(!this.GetSeed())
			return;
		var cityid=this.GetCurrentCityId();
		var currentCityNum = this.GetCurrentCityNum();

		var trainTroopId=this.options.trainTroops[currentCityNum];
		if(!trainTroopId || trainTroopId == 0)
			return;

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
			if(trainingSlotsUsed!=null)
				var availableTrainingSlots = barracksTotal-trainingSlotsUsed;
		}finally{
			if(availableTrainingSlots<1)
				return false;
		}

		if(popAvail>0 && popAvail>=popNeeded) {
			// avoid over training.
			var lastTrain=this.lastTrainTroops[cityid];
			var nowSecs=new Date().getTime()/1000;
			if(nowSecs<(lastTrain+(3*60)))
				return;
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
					if(numInp.value>parseInt(maxObj.textContent))
						return;
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
		GM_registerMenuCommand('KOCAttack - Auto Attack OFF',function() {
			t.TurnOffAutoAttack();
		});
		GM_registerMenuCommand('KOCAttack - Options',function() {
			t.ShowOptionsDialog();
		});
		GM_registerMenuCommand('KOCAttack - View Attacks',function() {
			t.ShowViewAttacksDialog();
		});
		GM_registerMenuCommand('KOCAttack - Import/Export',function() {
			t.ShowImportExportBox();
		});
		GM_registerMenuCommand('KOCAttack - Factory Reset!',function() {
			t.FactoryReset();
		});
	},

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
		//Check for strange magic error
		setTimeout(function(){checkStrangeMagic();},10*1000); // was 15*1000

			window.setTimeout(function() {
				if(!t.pageLoaded && t.GetAutoAttack() && !t.IsMapperRunning()) {
					GM_log("whoops, game not loaded after 30 secs problem. Reloading ...");
					t.SetValuesCache();
					t.ReloadWindow();
				}
			},t.GetRandTime(30*1000)); // was 60*1000

			if(t.GetAutoAttack()) {
				window.setTimeout(function() {
					// press start on the poc timer after we reload
					if(unsafeWindow.poctoggletimer && unsafeWindow.ispaused)
						unsafeWindow.poctoggletimer();
				},5*1000);
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
				if((domTickUpto%20)==0)
					t.HandleCrossIframeCommands();
			}

			if (t.currentPage == 'kabam_page')
				KOCAttack.ReloadWindow();

			// Code strictly for page: koc_game
			if(t.currentPage == "koc_game"){

				var cityId=t.GetCurrentCityId();
				var cityChanged=cityId!=t.prevCurrentCity?true:false;
				if(cityChanged)
					t.prevCurrentCity=cityId;

				// Resume attacks at the last city we left off on (if page was reloaded)
				if(!t.currentAttackCityResumed){
					var currentAttackCityNum = t.GetCurrentAttackCityNum();
					var currentAttackCity=ById('citysel_'+currentAttackCityNum);
					if(currentAttackCity){
						if(currentAttackCityNum>1){ //Do not change city if the last city saved was 1
							t.autoAttackCityUpto = currentAttackCityNum;
							t.ClickChangeCity(currentAttackCity,0);
						}
						t.currentAttackCityResumed = true;
					}
				}

				if((domTickUpto%10)==0) {
					t.HandleChatPane();
				}

				if(cityChanged && cityId!=null) {
					// changed city
					setTimeout(function() {
						t.AddOptionsLink();
						t.DrawClosestFarms(); // Init auto attack tab
						t.AddViewAttacksLink();
						t.AddQueueKOCToolsLink();
						//t.AddImportExportLink();
					},0);
					setTimeout(function() {
						t.CheckAutoRaiseGold();
						t.CheckAbandonWilds();
						t.CheckTrainTroops();
					},1*1000);
					setTimeout(function() {
						t.CheckReports();
					},3*1000);
					setTimeout(function() {
						t.NextAutoAttack();
					},5*1000);
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
					if(t.currentServerId>0 && t.currentPage == "koc_game")
						GM_setValue("KOCAttackLastKnownServerID", t.currentServerId);
				}
			}
			if(t.currentPage == "facebook_popup")
				if((domTickUpto%20)==0)
					t.HandlePublishPopup();

			// Log back into domain if disconnected due to server down-time
			if(t.currentPage == "domain_selection" && t.options.autoLogBackIn)
				if((domTickUpto%20)==0)
					t.HandleDomainLogin();

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
							if (t.options.RecordReports)
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

unsafeWindow.aaGotoCity = function (gotoCityNum){
	setTimeout (function(){unsafeWindow.citysel_click(document.getElementById('citysel_'+gotoCityNum));}, 0);
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
		for (var b = 0; b < a.length; b++)
			a[b].className = ""
		document.getElementById('mod_views_map').className = "sel";
		document.getElementById("maparea_city").style.display = 'none';
		document.getElementById("maparea_fields").style.display = 'none';
		document.getElementById("maparea_map").style.display = 'block';
		unsafeWindow.tutorialClear()
	}, 0);
};

function SetupQuickMarchButton(useRetryMarch) {
	var retryMarches='var retryMarch = function() { '+
		'new (Ajax.Request)(g_ajaxpath + "ajax/march.php" + g_ajaxsuffix, {'+
		'method: "post",'+
				'parameters: params,'+
				'onSuccess: function(transport) { marchSuccess(transport); },'+
				'onFailure: function () { Modal.hideModalAll(); }'+
	'}); };';
	if(!useRetryMarch)
		retryMarches='var retryMarch = function() { return; };';

	var modal_attack_update_num_maxReplaces=[
		[['modal_attack_update_num_max','modal_attack_update_num_maxOld']],
		[['$("modal_attack_unit_ipt','var x=0; var o = getBuildingLevel(12); if(o==11){x=150000}else{x=o*10000};$("modal_attack_unit_ipt']],
		[['parseInt(','x; //parseInt(']]
	];

	var modalAttackReplaces=[
		// *** it says "new Ajax" in the source but firefox converts it to new (Ajax
		[['modal_attack_do','modal_attack_doOld']],
		[['onSuccess:','onSuccess: marchSuccess=']],
		[['Modal.showAlert(printLocalError(','if(rslt.error_code==3 || rslt.error_code==8) { try {window.setTimeout(function() { retryMarch(); },(3*1000)); } catch(e) { alert("retry failed:"+e); } } else { Modal.hideModalAll(); } Modal.showAlert(printLocalError(']]
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
		[['var u = 0;','var u = "K:"+seed.knights["city" + currentcityid]["knt" + q].combat; ']],
		[['u += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+r][0]; u+=", "+uname[0]+uname[uname.length-1]+":"; if (x%1000==0) {u+=x/1000+"k"} else {u+=x};; } ']],
	];
	var attack_generatequeueReplacesR=[
		[['var r = 0;','var r = "K:"+seed.knights["city" + currentcityid]["knt" + t].combat; ']],
		[['r += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+p][0]; r+=", "+uname[0]+uname[uname.length-1]+":"; if (x%1000==0) {r+=x/1000+"k"} else {r+=x}; } ']],
	];
	var attack_generatequeueReplacesS=[
		[['var s = 0;','var s = "K:"+seed.knights["city" + currentcityid]["knt" + u].combat; ']],
		[['s += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+q][0]; s+=", "+uname[0]+uname[uname.length-1]+":"; if (x%1000==0) {s+=x/1000+"k"} else {s+=x}; } ']],
	];
	var attack_generatequeueReplacesT=[
		[['var t = 0;','var t = "K:"+seed.knights["city" + currentcityid]["knt" + w].combat; ']],
		[['t += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+q][0]; t+=", "+uname[0]+uname[uname.length-1]+":"; if (x%1000==0) {t+=x/1000+"k"} else {t+=x}; } ']],
	];
	var attack_generatequeueReplacesV=[
		[['var v = 0;','var v = "K:"+seed.knights["city" + currentcityid]["knt" + y].combat; ']],
		[['v += parseInt','var f = parseInt']],
		[['"Count"]);','"Count"]); if(f>0) { var uname=unitcost["unt"+r][0]; v+=", "+uname[0]+uname[uname.length-1]+":"; if (f%1000==0) {v+=f/1000+"k"} else {v+=f}; } ']],
	];
	var attack_generatequeueReplacesW=[
		[['var w = 0;','var w = "K:"+seed.knights["city" + currentcityid]["knt" + A].combat; ']],
		[['w += parseInt','var t = parseInt']],
		[['w += parseInt','var t = parseInt']],
		[['"Return"])','"Return"]); if(t>0) { var uname=unitcost["unt"+s][0]; w+=", "+uname[0]+uname[uname.length-1]+":"; if (t%1000==0) {w+=t/1000+"k"} else {w+=t}; } ']],
		[['"Count"])','"Count"]); if(t>0) { var uname=unitcost["unt"+s][0]; w+=", "+uname[0]+uname[uname.length-1]+":"; if (t%1000==0) {w+=t/1000+"k"} else {w+=t}; } ']],
	];

	if(!useRetryMarch)
		modalAttackReplaces.push(['Modal.hideModalAll();','']);

	var replaceFunc=function(name,replaces) {
		var modalAttackFunc=window[name].toString();
		var nameOld=name+'Old';
		var foundFailed=false;
		for(var a=0; a<replaces.length; a++) {
			var found=false;
			var repArr=replaces[a];
			for(var ra=0; ra<repArr.length; ra++) {
				var repI=repArr[ra];
				if(typeof(repI[0])=="object")
					found=repI[0].exec(modalAttackFunc)?true:false;
				else
					found=modalAttackFunc.indexOf(repI[0])>=0?true:false;
				if(found)
					break;
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
			// let our stuff in addListener run first.
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
	//replaceFunc('modal_attack_update_num_max',modal_attack_update_num_maxReplaces);

	function AddArray(to,from) {
		for(var c=0; c<from.length; c++) { to.push(from[c]); }
	}

	var arr=[];
	AddArray(arr,attack_generatequeueReplaces);
	var funcStr=window['attack_generatequeue'].toString();
	if(funcStr.indexOf(' var w = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesW);
	} else if(funcStr.indexOf('; var v = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesV);
	} else if(funcStr.indexOf('; var u = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesU);
	} else if(funcStr.indexOf('; var t = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesT);
	} else if(funcStr.indexOf('; var s = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesS);
	} else if(funcStr.indexOf('; var r = 0;')>=0) {
		AddArray(arr,attack_generatequeueReplacesR);
	} else {
		var err="Unknown attack queue func: "+location.href+"\n"+funcStr;
		GM_log(err);
	}
	replaceFunc('attack_generatequeue',arr);

}

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
		if(document.body)
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
	scr.innerHTML="CreateMsgDiv="+CreateMsgDiv+";\n;\n"+SetupQuickMarchButton+"\n; SetupQuickMarchButton("+options.retryMarch+"); \n";
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
		mixpanelRemoved=true;
	}
}

/******************* Check strange magics error ******************/
function checkWhiteScreen (){
	window.setTimeout(function(){
	GM_log("Check iFrame");
	var checknumber = 0;
	function checkiFrame() {
		var iFrame = document.getElementById('iframe_canvas');
		if (!iFrame && checknumber<10){
			checknumber++;
			setTimeout (checkiFrame, 1000);
			return;
		} else if (checknumber>=10){
			KOCAttack.ReloadWindow();
			GM_log("White screen error. Refreshing.....");
		}
		return;
	}
	checkiFrame();
	}, 10000);
}

function checkStrangeMagic (){ // Oops! There are some strange magicks going on in Kingdoms of Camelot.
 if (!document.getElementById("kochead")){
		window.setTimeout ( function() { GM_log ("checkStrangeMagic Reloading..."); KOCAttack.ReloadWindow(); }, 3*1000);
		popup (100,100,500,275, "<br /><CENTER>checkStrangeMagic<br /><br />KofC NOT FOUND<br />Refreshing in 3 seconds ...<br /><br />");
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
	div.style.zIndex = "999999"; // KOC modal is 100210 ?
	div.style.display = 'block';
	window.document.body.insertBefore(div, window.document.body.childNodes[0]);
	return div;
}

/******************* Function calls ******************/
KOCAttack.Listen();
if(unsafeWindow.cm){
	unsafeWindow.cm.cheatDetector={
		a:function(){ },
		detect:function() { }
	};
}
if(document.URL.search('apps.facebook.com/kingdomsofcamelot/')>=0)
	checkWhiteScreen();
else
	StartAll();
var startAllTimeout=null;
function StartAll() {
	DisableMixpanel();
	var now=new Date().getTime();
	if(startAllTimeout==null)
		startAllTimeout=now+5000;
	if(mixpanelRemoved || startAllTimeout<now) {
		if(startAllTimeout<now)
			GM_log("Did not remove mixpanel, starting anyways");
		KOCAttack.SetupClearMessages();
		SetupScripts();
	} else
		window.setTimeout(function() { StartAll(); },200);
}

var WINLOG_MAX_ENTRIES = 1000; // TODO
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
			for (i=n-2; i>=0; i--)
				t.eOut.appendChild (t.eOut.childNodes[i]);
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
			t.eOut = t.win.document.getElementById('wlOut');
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