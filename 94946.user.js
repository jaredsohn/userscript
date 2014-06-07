// ==UserScript==
// @name           Common functions for MyFreeFarm-Scripts
// @namespace      http://userscripts.org/scripts/show/94946
// @updateURL      about:blank
// @description    Common functions for MyFreeFarm-Scripts
// @date           02.03.2014
// @version        1.0.51
// ==/UserScript==

const VERSIONfunctionFile = GM_info["script"]["version"];
var DEVMODE=GM_getValue("devmode",false);
var DEVMODE_EVENTS=GM_getValue("devmode_events",false);
var DEVMODE_FUNCTION=GM_getValue("devmode_function",false);
var DEVMODE_LOG_WARNING=GM_getValue("devmode_log_warning",false);
var DEVMODE_LOG_ERROR=GM_getValue("devmode_log_error",false);

// PROTOTYPES ************************************************************************************************************	
String.prototype.reverse = function(){
	splitext = this.split("");
	revertext = splitext.reverse();
	reversed = revertext.join("");
	return reversed;
};
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
Array.prototype.shuffle = function (){
	var i=this.length, j, temp;
	if (i==0) return;
	while (--i) {
			j = Math.floor( Math.random()*(i+1));
			temp = this[i];
			this[i] = this[j];
			this[j] = temp;
	}
	temp=null;
};
Array.prototype.swap = function (from, to){
	var temp;
	if (this.length==0) return;
	temp = this[from];
	this[from] = this[to];
	this[to] = temp;
	temp=null;
};
Object.prototype.order = new Array();
Object.prototype.sortObj = function(sortfkt,descending){
	// sortfkt:
	// a[0] accesses the object-key "a", a[1] the containing data "Object[a]"
	// numbers first, then strings : default
	// numbers : function(a,b){return (parseFloat(a[0],10)-parseFloat(b[0],10));}
	// dates - ascending sorting : function(a,b){return (getTime(a[0])-getTime(b[0]));}
	// descending: bool
	// Setup helping array
	var sorted = new Array();
	for (var i in this){
		if(!this.hasOwnProperty(i)){ continue; }
		sorted.push([i,this[i]]);
	}
	// Define default sorting function
	if(typeof sortfkt!="function"){
		sortfkt = function(a,b){
			if(isNaN(a[0])){
				if(isNaN(b[0])){ return ((a[0]>b[0])-(a[0]<b[0])); } // both strings
				else { return 1; } // string > number
			} else {
				if(isNaN(b[0])){ return -1; } // number < string
				else { return (a[0]-b[0]); } // both numbers
			}
		};
	}
	// Sorting the helping array
	sorted.sort(sortfkt);
	if(descending){ sorted.reverse(); }

	// Reconstruct sorted object
	this.order.splice(0,this.order.length);
	for(var j=0;j<sorted.length;j++){
		this.order.push(sorted[j][0]);
		// delete this[sorted[j][0]];
		// this[sorted[j][0]] = sorted[j][1];
	}
	sorted=null;
	return this;
};
Object.prototype.isEmpty = function(){
	for(var i in this){
		if(this.hasOwnProperty(i)){ return false; }
	}
	return true;
};
Object.prototype.length = function(){
	var len = 0;
	for (var i in this){
		if(!this.hasOwnProperty(i)){ continue; }
		len++;
	}
	return len;
};
Object.prototype.clone = function () {
try{
	var o = (this instanceof Array)?[]:{};
	for (var property in this) {
		if(!this.hasOwnProperty(property)){ continue; }
		if((this[property]!=null)&&(typeof (this[property])=="object")){
			o[property] = this[property].clone()
		}else{
			o[property] = this[property];
		}
	}
	return o;
}catch(err){ GM_logError("Object.prototype.clone property="+property+"\n"+err); }
};

// FUNCTIONS *************************************************************************************************************	

function GM_setValueCache(a,b){
	window.setTimeout(function(){
		GM_setValue(a,b);
	},0);
}
function GM_setValue2(a,b,debug){
	// for developing / finding security errors, use debug unique for optimal tracking
	GM_setValue(a,b);
	try{
	if(GM_getValue(a)!=b){
		GM_log("GM_setValue2 FAILED a="+a+" debug="+debug);
		GM_setValueCache(a,b);
	}
	}catch(err){
		GM_log("GM_setValue2 ERROR a="+a+" debug="+debug+" err="+err);
		GM_setValueCache(a,b);
	}
}
_GM_log=GM_log;
GM_log=function(txt){
	_GM_log((COUNTRY?COUNTRY.toUpperCase():"")+"-"+(SERVER?SERVER:"")+":\n"+txt);
};
GM_logWarning=function(txt){
	_GM_log((COUNTRY?COUNTRY.toUpperCase():"")+"-"+(SERVER?SERVER:"")+": Warning\n"+txt);
	if(DEVMODE_LOG_WARNING){ logBubble.add(txt,10,"orange"); }
};
GM_logError=function(txt){
	_GM_log((COUNTRY?COUNTRY.toUpperCase():"")+"-"+(SERVER?SERVER:"")+": Error\n"+txt);
	if(DEVMODE_LOG_ERROR){ logBubble.add(txt,10,"red"); }
};

// saving management with localStorage
function GM_setData(key,value,debugName){
	localStorage[COUNTRY+"_"+SERVER+"_"+key]=implode([value],debugName);
}
function GM_getData(key,defaultValue,debugName){
	var tmp = localStorage[COUNTRY+"_"+SERVER+"_"+key]
	if(tmp){
		tmp = explode(tmp,debugName,defaultValue);
		if(tmp[0]){
			return tmp[0];
		} else{
			return defaultValue;
		}
	}else{
		return defaultValue;
	}
}
function GM_listData(){
	var help = Object.keys(localStorage);
	var ret = [];
	for(var i=0;i<help.length;i++){
		if(help[i].search(COUNTRY+"_"+SERVER+"_")==0){
			ret.push(help[i].replace(COUNTRY+"_"+SERVER+"_",""));
		}
	}
	return ret;
}
function GM_deleteData(key){
	delete localStorage[COUNTRY+"_"+SERVER+"_"+key];
}
	
function $(ID){return document.getElementById(ID);}
//function $(ID){GM_log("ID:"+ID);return document.getElementById(ID);}
function $top(ID) {return top.document.getElementById(ID);}
function unsafe$(ID){return unsafeWindow.document.getElementById(ID);}
function unsafe$top(ID) {return top.window.wrappedJSObject.document.getElementById(ID);}
function containerId(node) {
	node = node.parentNode;
	while(node.id==""){
		if(node.parentNode){
			node = node.parentNode; 
		} else {
			GM_logError("in containerId");
			break;
		}
	}
	return node.id;
}
function removeElement(node){
	if(node&&node.parentNode){
		node.parentNode.removeChild(node);
	}
}
function createElement(type, attributes, append, inner){
	var node = document.createElement(type);
	for (var attr in attributes) {
		if (!attributes.hasOwnProperty(attr)){ continue; }
		if (attr=="checked"){ node.checked=attributes[attr]; }
		else { node.setAttribute(attr, attributes[attr]); }
	}
	if (append) append.appendChild(node);
	if (inner) node.innerHTML = inner;
	return node;
}

function raiseEvent(A){
	var B = document.createEvent("Event");
	B.initEvent(A, true, true);
	document.dispatchEvent(B);
}
function raiseEventTop(A){
	// should be called from frame-documents to inform the top-document(main.php)
	// if frame is top itself (=multi-window gaming) it instead saves to variable and do_main will raise the event in the main-window
	if((PAGE!="main")&&(self==top)){
		window.setTimeout(function(){
			if(DEVMODE_EVENTS){ logBubble.add("raiseEventTop set "+A); }
			var raisedEvents = explode(GM_getValue(COUNTRY+"_"+SERVER+"_"+USERNAME+"_raisedEvents"),"raiseEventTop","{}");
			raisedEvents[A] = PAGE;
			GM_setValue(COUNTRY+"_"+SERVER+"_"+USERNAME+"_raisedEvents",implode(raisedEvents));
		},0);
	} else {
		if(DEVMODE_EVENTS){ logBubble.add("raiseEventTop "+A); }
		var B = top.document.createEvent("Event");
		B.initEvent(A, true, true);
		top.document.dispatchEvent(B);
	}
}
function raiseDOMAttrModified(A){
 	var B = document.createEvent("MutationEvent");
	B.initEvent("DOMAttrModified", true, true);
	A.dispatchEvent(B);
}

function click(A){
try{
	var B = document.createEvent("MouseEvents");
	B.initEvent("click", true, true);
	A.dispatchEvent(B);
	if(DEVMODE){
		var T = A;
		var str = "";
		while(!T.id){
			T = T.parentNode;
			str += ".child";
		}
		//GM_log("Click :"+T.id+str);
	}
	// if (A.href){ location.href = A.href; }
}catch(err){
	GM_logError("click: "+(A&&A.id?("id="+A.id):("id unknown"))+".\n" + err);
	throw ("ERROR click: "+(A&&A.id?("id="+A.id):("id unknown"))+".\n" + err);
}
}
function dblclick(A){
	var B = document.createEvent("MouseEvents");
	B.initEvent("dblclick", true, true);
	A.dispatchEvent(B);
	// if (A.href){ location.href = A.href; }
}
function mouseover(A){
try{
	var B = document.createEvent("MouseEvents");
	B.initEvent("mouseover", true, true);
	A.dispatchEvent(B);
}catch(err){
	GM_logError("mouseover: "+(A&&A.id?("id="+A.id):("id unknown"))+".\n" + err);
	throw ("ERROR mouseover: "+(A&&A.id?("id="+A.id):("id unknown"))+".\n" + err);
}
}
function keyup(A,keycode,ctrlKeyArg,altKeyArg,shiftKeyArg) {
	if (!keycode) keycode=0;
	var B = document.createEvent("KeyboardEvent");
	B.initKeyEvent(
		"keyup",					//	in DOMString typeArg,
		true,							//	in boolean canBubbleArg,
		true,							//	in boolean cancelableArg,
		null,							//	in nsIDOMAbstractView viewArg,	Specifies UIEvent.view. This value may be null.
		!!ctrlKeyArg,			//	in boolean ctrlKeyArg,
		!!altKeyArg,			//	in boolean altKeyArg,
		!!shiftKeyArg,		//	in boolean shiftKeyArg,
		false,						//	in boolean metaKeyArg,
		keycode,					//	in unsigned long keyCodeArg,
		0);
	A.dispatchEvent(B);
}
function keydown(A,keycode,ctrlKeyArg,altKeyArg,shiftKeyArg){
	if (!keycode) keycode=0;
	var B = document.createEvent("KeyboardEvent");
	B.initKeyEvent(
		"keydown",				//	in DOMString typeArg,
		true,							//	in boolean canBubbleArg,
		true,							//	in boolean cancelableArg,
		null,							//	in nsIDOMAbstractView viewArg,	Specifies UIEvent.view. This value may be null.
		!!ctrlKeyArg,			//	in boolean ctrlKeyArg,
		!!altKeyArg,			//	in boolean altKeyArg,
		!!shiftKeyArg,		//	in boolean shiftKeyArg,
		false,						//	in boolean metaKeyArg,
		keycode,					//	in unsigned long keyCodeArg,
		0);
	A.dispatchEvent(B);
}
function change(A){
	var B = document.createEvent("MouseEvents");
	B.initEvent("change", true, true);
	A.dispatchEvent(B);
}

var timeMeasure = new Object();
function timeMeasureStart(str){
	timeMeasure[str] = (new Date()).getTime();
}
function timeMeasureStop(str){
	if(timeMeasure[str]){
		GM_log("timeMeasure "+str+": "+((new Date()).getTime()-timeMeasure[str])+"ms");
		delete timeMeasure[str];
	}
}

//---------------------------------------------------------------------------------------------------------------------------

function getElementLeft(Elem,toElem) {
	var elem = document.getElementById(Elem);
	xPos = elem.offsetLeft;
	tempEl = elem.offsetParent;
		while (tempEl != toElem.parenNode) {
			xPos += tempEl.offsetLeft;
			tempEl = tempEl.offsetParent;
		}
	return parseInt(xPos,10);
}
function getElementTop(Elem,toElem) {
	var elem = document.getElementById(Elem);
	yPos = elem.offsetTop;
	tempEl = elem.offsetParent;
	while (tempEl != toElem.parenNode) {
			yPos += tempEl.offsetTop;
			tempEl = tempEl.offsetParent;
		}
	return parseInt(yPos,10);
}
function getOffset(el){
		var _x = 0;
		var _y = 0;
		while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)){
			if(el.style.position){
				_x += el.offsetLeft - el.scrollLeft;
				_y += el.offsetTop - el.scrollTop;
			}
			el = el.offsetParent; //.parentNode
		}
		return { top: _y, left: _x };
}
function insertAfter(newNode, refNode){
	return refNode.nextSibling ? refNode.parentNode.insertBefore(newNode, refNode.nextSibling) : refNode.parentNode.appendChild(newNode);
}
function removeAllCSS(reg){
try{
		
	for (var i = document.styleSheets.length - 1; i >= 0; i--) {
		for (var j = document.styleSheets[i].cssRules.length - 1; j >= 0; j--) {
			if(	document.styleSheets[i].cssRules[j].selectorText&&(document.styleSheets[i].cssRules[j].selectorText.match(reg))){
				document.styleSheets[i].deleteRule(j);
			}
		}
	}
}catch(err){GM_logError("removeAllCSS\ni="+i+" j="+j+"\n"+err);}
}
/*
function makeTablebodyScrollable(table,bodyHeight){
	var innerTable = createElement("table",{});
	//insert outer div to shorten the table which could remove additional outer scrollbars
	var newdiv = createElement("div",{"style":"height:"+bodyHeight+";overflow-y:scroll;"});
	table.parentNode.insertBefore(newdiv,table);
	newdiv.appendChild(table);
	//get the computed widths
	var tbody = table.getElementsByTagName("tbody")[0];
	var help = new Array();
	for(var v=0;v<tbody.children[0].childElementCount;v++){
		help[v] = parseInt(window.getComputedStyle(tbody.children[0].children[v]).width,10);
	}
	//set the widths
	GM_log(help)
	newdiv = createElement("colgroup");
	table.insertBefore(newdiv,table.firstElementChild);
	var newdiv1 = createElement("colgroup",{},innerTable);
	for(var v=0;v<help.length;v++){
		createElement("col",{"width":help[v]+"px"},newdiv);
		createElement("col",{"width":help[v]+"px"},newdiv1);
	}
	//create new structure
	newdiv = createElement("tbody");
	tbody = table.replaceChild(newdiv,tbody);
	newdiv = createElement("tr",{},newdiv);
	newdiv = createElement("td",{"colspan":(1+help.length)},newdiv);
	newdiv = createElement("div",{"style":"height:"+bodyHeight+";overflow-y:scroll;"},newdiv);
	newdiv.appendChild(innerTable);	
	innerTable.appendChild(tbody);
	//remove outer div
	table.parentNode.parentNode.replaceChild(table,table.parentNode);
}
*/

//---------------------------------------------------------------------------------------------------------------------------
// TODO name? timeStr, getTimeStr, time2timestr, time2str, 2->To ?
function getTimeStr(time,hideSeconds){ // was int2timestr
	// returns like "1d 12:30:42"
	var str,help;
	if(time<0){ time *= -1; }
	if (hideSeconds) {
		str = timeFormatHM;
	} else {
		str = timeFormatHMS;
		help = time%60;
		str = str.replace("sec",((help<10)?"0":"")+Math.floor(help));
	}
	time=time/60;
	help = time%60;
	str = str.replace("min",((help<10)?"0":"")+Math.floor(help));
	time=time/60;
	help = time%24;
	str = str.replace("hour",((help<10)?"0":"")+Math.floor(help));
	time=time/24;
	if (time>=1){ str=Math.floor(time)+"d&nbsp;"+str; }
	return str;
}
// TODO this includes the call of str2seconds(str)
// TODO name? getTime, timestr2time, str2time, 2->To ?

function getTime(str){ // was timestr2int
	var help1 = null;
	var help;
	if(help=(/(\d+):(\d+):(\d+)/.exec(str))){
		help1 = [parseInt(help[1],10),parseInt(help[2],10),parseInt(help[3],10)];
		str = str.replace(/(\d+):(\d+):(\d+)/,"");
	}else if(help=(/(\d+):(\d+)/.exec(str))){
		help1 = [parseInt(help[1],10),parseInt(help[2],10),0];
		str = str.replace(/(\d+):(\d+)/,"");
	}else{
		help1 = [0,0,0];
	}
	if(help=(/(\d+)\.(\d+)\.(\d+)/.exec(str))){
		help[1] = parseInt(help[1],10);
		help[2] = parseInt(help[2],10)-1;
		help[3] = parseInt(help[3],10);
		if(help[3]<100){ help[3] += 2000; }
		return ((new Date(help[3],help[2],help[1],help1[0],help1[1],help1[2])).getTime()/1000);
	}else if(help=(/(\d+)\.(\d+)/.exec(str))){
		help[1] = parseInt(help[1],10)-1;
		help[2] = parseInt(help[2],10);
		if(help[2]<100){ help[2] += 2000; }
		return ((new Date(help[2],help[1],1,help1[0],help1[1],help1[2])).getTime()/1000);
	}else if(help=(/(\d+)-(\d+)/.exec(str))){
		help[1] = parseInt(help[1],10);
		help[2] = parseInt(help[2],10)-1;
		if(help[1]<100){ help[1] += 2000; }
		return ((new Date(help[1],help[2],1,help1[0],help1[1],help1[2])).getTime()/1000);
	}else if(help=(/(\d+)/.exec(str))){
		help[1] = parseInt(help[1],10);
		if(help[1]<100){ help[1] += 2000; }
		return ((new Date(help[1],0,1,help1[0],help1[1],help1[2])).getTime()/1000);
	}else{
		return ((Date.UTC(1970,0,1,help1[0],help1[1],help1[2]))/1000);
	}
}
/*
function getTime(str){ // was timestr2int
	var help = null;
	var help2;
	if(str.match(/\d+\.\d+\.\d+/)){
		if(str.match(/\d+\.\d+\.\d+.*\d+:\d+:\d+/)){
				help = [,,,,,];
				help2 = (/(\d+)\.(\d+)\.(\d+).*(\d+):(\d+):(\d+)/).exec(str);
				help[0] = parseInt(help2[3],10);
				help[1] = parseInt(help2[2],10);
				help[2] = parseInt(help2[1],10);
				help[3] = parseInt(help2[4],10);
				help[4] = parseInt(help2[5],10);
				help[5] = parseInt(help2[6],10);
		} else if(str.match(/\d+:\d+:\d+.*\d+\.\d+\.\d+/)){
				help = [,,,,,];
				help2 = (/(\d+):(\d+):(\d+).*(\d+)\.(\d+)\.(\d+)/).exec(str);
				help[0] = parseInt(help2[6],10);
				help[1] = parseInt(help2[5],10);
				help[2] = parseInt(help2[4],10);
				help[3] = parseInt(help2[1],10);
				help[4] = parseInt(help2[2],10);
				help[5] = parseInt(help2[3],10);
		} else {
			if(str.match(/\d+\.\d+\.\d+.*\d+:\d+/)){
				help = [,,,,,0];
				help2 = (/(\d+)\.(\d+)\.(\d+).*(\d+):(\d+)/).exec(str);
				help[0] = parseInt(help2[3],10);
				help[1] = parseInt(help2[2],10);
				help[2] = parseInt(help2[1],10);
				help[3] = parseInt(help2[4],10);
				help[4] = parseInt(help2[5],10);
			} else if(str.match(/\d+:\d+.*\d+\.\d+\.\d+/)){
				help = [,,,,,0];
				help2 = (/(\d+):(\d+).*(\d+)\.(\d+)\.(\d+)/).exec(str);
				help[0] = parseInt(help2[5],10);
				help[1] = parseInt(help2[4],10);
				help[2] = parseInt(help2[3],10);
				help[3] = parseInt(help2[1],10);
				help[4] = parseInt(help2[2],10);
			} else { 
				help = [,,,0,0,0];
				help2 = (/(\d+)\.(\d+)\.(\d+)/).exec(str);
				help[0] = parseInt(help2[3],10);
				help[1] = parseInt(help2[2],10);
				help[2] = parseInt(help2[1],10);
			}
		}
		if(help){
			if(help[0]<100){ help[0]+=2000; }
			return ((new Date(help[0],help[1]-1,help[2],help[3],help[4],help[5])).getTime()/1000);
		}
	} else {
		if(str.match(/\d+:\d+:\d+/)){
			help = [,,];
			help2 = (/(\d+):(\d+):(\d+)/).exec(str);
			help[0] = parseInt(help2[1],10);
			help[1] = parseInt(help2[2],10);
			help[2] = parseInt(help2[3],10);
		} else if(str.match(/\d+:\d+/)){
			help = [,,0];
			help2 = (/(\d+):(\d+)/).exec(str);
			help[0] = parseInt(help2[1],10);
			help[1] = parseInt(help2[2],10);
		}
		if(help){
			return ((Date.UTC(1970,0,1,help[0],help[1],help[2]))/1000); 
		}
	}
	GM_log("getTime failed at "+str);
	return 0;
}
*/
function getFormattedTime(str){
	var help = null;
	var regDate = dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","\\d+").replace(/\./g,"\\.");
	var regTime = timeFormatHMS.replace("hour","\\d+").replace("min","\\d+").replace("sec","\\d+").replace(/\./g,"\\.");
	if(str.match(new RegExp(regDate))){
		if(str.match(new RegExp(regDate+".*"+regTime))){
				help = [,,,,,];
				help[0] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace("hour","\\d+").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[1] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[2] = parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
				str = str.replace(new RegExp(regDate),"");
				help[3] = parseInt((new RegExp(timeFormatHMS.replace("hour","(\\d+)").replace("min","\\d+").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[4] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","(\\d+)").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[5] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","\\d+").replace("sec","(\\d+)").replace(".","\\."))).exec(str)[1],10);
		} else if(str.match(new RegExp(regTime+".*"+regDate))){
				help = [,,,,,];
				help[3] = parseInt((new RegExp(timeFormatHMS.replace("hour","(\\d+)").replace("min","\\d+").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[4] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","(\\d+)").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[5] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","\\d+").replace("sec","(\\d+)").replace(".","\\."))).exec(str)[1],10);
				str = str.replace(new RegExp(regTime),"");
				help[0] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace("hour","\\d+").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[1] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[2] = parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
		} else {
			regTime = timeFormatHM.replace("hour","\\d+").replace("min","\\d+").replace(".","\\.");
			if(str.match(new RegExp(regDate+".*"+regTime))){
				help = [,,,,,0];
				help[0] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace("hour","\\d+").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[1] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[2] = parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
				str = str.replace(new RegExp(regDate),"");
				help[3] = parseInt((new RegExp(timeFormatHM.replace("hour","(\\d+)").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[4] = parseInt((new RegExp(timeFormatHM.replace("hour","\\d+").replace("min","(\\d+)").replace(".","\\."))).exec(str)[1],10);
			} else if(str.match(new RegExp(regTime+".*"+regDate))){
				help = [,,,,,0];
				help[3] = parseInt((new RegExp(timeFormatHM.replace("hour","(\\d+)").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[4] = parseInt((new RegExp(timeFormatHM.replace("hour","\\d+").replace("min","(\\d+)").replace(".","\\."))).exec(str)[1],10);
				str = str.replace(new RegExp(regTime),"");
				help[0] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace("hour","\\d+").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[1] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[2] = parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
			} else { 
				help = [,,,0,0,0];
				help[0] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace("hour","\\d+").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[1] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[2] = parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
			}
		}
		if(help){
			if(help[0]<100){ help[0]+=2000; }
			return ((new Date(help[0],help[1]-1,help[2],help[3],help[4],help[5])).getTime()/1000);
		}
	} else {
		if(str.match(new RegExp(regTime))){
			help = [,,];
			help[0] = parseInt((new RegExp(timeFormatHMS.replace("hour","(\\d+)").replace("min","\\d+").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
			help[1] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","(\\d+)").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
			help[2] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","\\d+").replace("sec","(\\d+)").replace(".","\\."))).exec(str)[1],10);
		} else {
			regTime = timeFormatHM.replace("hour","\\d+").replace("min","\\d+").replace(".","\\.");
			if(str.match(new RegExp(regTime))){
				help = [,,0];
				help[0] = parseInt((new RegExp(timeFormatHM.replace("hour","(\\d+)").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
				help[1] = parseInt((new RegExp(timeFormatHM.replace("hour","\\d+").replace("min","(\\d+)").replace(".","\\."))).exec(str)[1],10);
			}
		}
		if(help){
			return ((Date.UTC(1970,0,1,help[0],help[1],help[2]))/1000); 
		}
	}
	GM_log("getFormattedTime failed at "+str);
	return 0;
}
//TODO name? getDaytime, time2daytime
function getDaytimeStr(time,hideSeconds,paddHours){ // was uhrzeit
	//GM_log("getDaytimeStr: " + time);
	var time2 = new Date(time*1000);
	var str,help;
	if (hideSeconds) {
		str = timeFormatHM;
	} else {
		str = timeFormatHMS;
		help = time2.getSeconds();
		str = str.replace("sec",((help<10)?"0":"")+Math.floor(help));
	}
	help = time2.getMinutes();
	str = str.replace("min",((help<10)?"0":"")+Math.floor(help));
	help = time2.getHours();
	str = str.replace("hour",((!!paddHours && help<10)?"0":"")+Math.floor(help));
	return str;
}
/*
function getDateStr(time,hideyear){	//TODO CHANGED THE ARGUMENTS
	var time2 = new Date(time*1000);
	str="";
	if (time2.getDate()<10) { str += "0"; }
	str += time2.getDate() +".";
	if (time2.getMonth()<9) { str += "0"; }
	str += (1+time2.getMonth())+".";
	if (!hideyear) str += (time2.getFullYear());
	return str;
}
*/
//TODO name? getDate, time2date
function getDateStr(time,yearformat,padd){ //in seconds //was datum
	// yearformat:
	// 0 -> 01.02.
	// 1 -> 01.02.11
	// 2 -> 01.02.2011 (default)
	// padd:
	// true -> 01.02.2011 (default)
	// false -> 1.2.2011
	if(typeof yearformat!="number"){ yearformat = 2; }
	if(typeof padd!="boolean"){ padd = true; }

	var time2 = new Date(time*1000);
	var str,help;
	switch(yearformat){
		case 0: str = "day.month"; break;
		case 1: str = ("day.month.year").replace("year",time2.getFullYear().toString().slice(-2)); break;
		case 2: str = ("day.month.year").replace("year",time2.getFullYear()); break;
	}	
	help = time2.getDate();
	str = str.replace("day",((padd&&help<10)?"0":"")+help);
	help = 1+time2.getMonth();
	str = str.replace("month",((padd&&help<10)?"0":"")+help);
	return str;
}
function getFormattedDateStr(time,yearformat,padd){
	// yearformat:
	// 0 -> 01.02.
	// 1 -> 01.02.11
	// 2 -> 01.02.2011 (default)
	// padd:
	// true -> 01.02.2011 (default)
	// false -> 1.2.2011
	if(typeof yearformat!="number"){ yearformat = 2; }
	if(typeof padd!="boolean"){ padd = true; }

	var time2 = new Date(time*1000);
	var str,help;
	switch(yearformat){
		case 0: str = dateFormatDM; break;
		case 1: str = dateFormatDMY.replace("year",time2.getFullYear().toString().slice(-2)); break;
		case 2: str = dateFormatDMY.replace("year",time2.getFullYear()); break;
	}	
	help = time2.getDate();
	str = str.replace("day",((padd&&help<10)?"0":"")+help);
	help = 1+time2.getMonth();
	str = str.replace("month",((padd&&help<10)?"0":"")+help);
	return str;
}
//TODO name? getDateText
function getDateText(time,yearformat){ // was datumDay
	var time2 = Math.floor(time);
	var today = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate(),0,0,0)/1000; //begin of this day.
	//GM_log ("timer :" + time2 + " : " + today);
	if (time2 < today){
		return getFormattedDateStr(time,yearformat);
	} else if (time2 < (today+(1*24*60*60))){
		return getText("day0");
	} else if (getText("day1") && (time2 < (today+(2*24*60*60)))){
		return getText("day1");
	} else if (getText("day2") && (time2 < (today+(3*24*60*60)))){
		return getText("day2");
	} else {
		return getFormattedDateStr(time,yearformat);
	}
}
function countDays(time1,time2){ //in seconds
	// returns number of days from 1 to 2. for example 0 if both on one day.
	// calculate times of midnight
	time1 = new Date(Math.round(time1*1000));
	time1 = ((new Date(time1.getFullYear(),time1.getMonth(),time1.getDate())).getTime())/1000;
	time2 = new Date(Math.round(time2*1000));
	time2 = ((new Date(time2.getFullYear(),time2.getMonth(),time2.getDate())).getTime())/1000;
	return Math.round((time2-time1)/86400);
}
//---------------------------------------------------------------------------------------------------------------------------
function explode(str,debugName,defaultReturn,depth){
	//GM_log("Begin explode "+ str);
	if(debugName==undefined){
		debugName = ""; 
		GM_logWarning("Explode. DebugName not set. Argument:" + str);
	}else if(typeof defaultReturn==undefined){
		GM_logWarning("Explode "+debugName+". defaultReturn not set.");
	}
	try{	
		if(str==undefined){ 
			throw ("Argument is undefined."); 
		}
		if(typeof str != "number" && typeof str != "string"){
			throw ("Argument is not a string nor a number."); 
		}
//	if(str==""){ return undefined; }
		var help = eval('(' + str + ')');
		// if(defaultReturn==undefined){
			return help;
		// }
	}catch(err){
		if((typeof defaultReturn=="boolean")&&(!defaultReturn)){
			GM_logError("explode "+debugName+". no defaultReturn.\n" + err);
			throw ("Explode error "+debugName+". no defaultReturn.\n" + err);
		}else if(typeof defaultReturn==undefined){
			GM_logError("explode "+debugName+". defaultReturn=" + implode(defaultReturn)+" \n" + err);
			throw ("Explode error "+debugName+". defaultReturn=" + implode(defaultReturn)+" \n" + err);
		} else {
			GM_logWarning("explode "+debugName+". returns given default. Argument=" + str+" \n" + err);
			return defaultReturn;
		}
	}
	/*
	try{
		function recusiveCheck(h,d,lvl,dpth){
			var i, correct=true;
			for(var i in d){
				if(!d.hasOwnProperty(i)){continue;}
				if(!((typeof h[i])==(typeof d[i]))||!((h[i] instanceof Array)==(d[i] instanceof Array))){
					return false;
				}
				if(typeof d[i]=="object" && lvl<dpth && !recusiveControl(h[i],d[i],lvl+1,dpth)){
					return false;
				}
			}
			return correct;
		}
		var correct=false;
		if(((typeof help)==(typeof defaultReturn))&&((help instanceof Array)==(defaultReturn instanceof Array))){
			correct=true;
			if(!isNaN(depth)&&depth>1&&!recusiveCheck(help,defaultReturn,0,depth)){
				correct=false;
			}
		}
		if(correct){
			return help;
		}else{
			GM_logWarning("Explode "+debugName+". incorrect structure compairing. returns given default. Argument:" + str+" \n");
			return defaultReturn;
		}
	}catch(err){
		GM_logWarning("Explode "+debugName+". error while compairing. \n" + err);
		return help;
	}
	*/
}
function implode(arr,debugName){
	try{
		if(debugName==undefined){
			debugName = ""; 
			// GM_logWarning("implode. DebugName not set. Argument:" + arr);
		}
		var line = new String();
		var InternalCounter = -1;
		var NoKey = new Boolean(false);
		if (arr == undefined){ return ""; }
		if (typeof arr == "function"){ return "function"; }
		if (typeof arr == "string"){ return arr; }
		if (typeof arr == "boolean"){ return arr.toString(); }
		if (typeof arr == "number"){ return arr.toString(); }
		if (typeof arr != "object"){ throw("Argument is not an Object or Array. Type is " + typeof arr +".\n"); }
		var type = (arr instanceof Array); //true->array | false->object

		line = (type)?"[":"{";
		for(var i in arr ){
			try{
				if(!arr.hasOwnProperty(i)){continue;}
				InternalCounter++;
				if (type){
					while (i>InternalCounter){
						line += ",";
						InternalCounter++;
					}
				}else{
					line += "\"" + i + "\":";
				}
				if (typeof arr[i] == "number" || typeof arr[i] == "boolean"){
					line += arr[i];
				} else if (typeof arr[i] == "string"){
					line += "\"" + arr[i].replace(/\\/g,"\\\\").replace(/\"/g,"\\\"") + "\"";
				} else if(typeof arr[i] == "undefined"){
					line += 'undefined';
				} else if(arr[i]==null){
					line += 'null';
				} else {
					line += implode(arr[i],debugName);
				}
				line += ",";
			}catch(err){
				GM_logError("implode "+debugName+" i="+i+"\n"+err);
				continue;
			}
		}
		var endChar = line.substring(line.length-1,line.length);
		return line.substring(0,line.length-1) + (("{[".indexOf(endChar)!=-1)? endChar:"")+ ((type)?"]":"}");
	} catch (err){
		GM_logError("implode "+debugName+"\n" + err);
		throw ("ERROR implode "+debugName+"\n" + err);
	}
}
function enc(str,sh) {
	var encoded = "";
	for (i=0; i<str.length;i++) {
		encoded = encoded+String.fromCharCode(str.charCodeAt(i)+sh);
	}
	return encoded;
}
function print_r(arr,line,showType,linebreak){
	var str = new String();
	if (!line){ line=""; }
	if (!showType){ showType=false; }
	if (!linebreak){ linebreak="<br/>"; }
	try{
	if(typeof arr == "object"){
		for (var i in arr ){
			try{
				if(!arr.hasOwnProperty(i)){ continue; }
				var type = (arr instanceof Array);
				////GM_log("i:" + i + " : " + typeof arr[i] + " | " + arr + "\n");
				if (typeof arr[i] == "string" || typeof arr[i] == "number" || typeof arr[i] == "boolean") {
					str += line + (type?"[":"{") + i + (type?"]":"}") + " = " + arr[i] + ((showType)?" ("+typeof(arr[i])+")":"") + linebreak;
				} else if(typeof arr[i] == "undefined"){
					str += line + (type?"[":"{") + i + (type?"]":"}") + " = " + linebreak;
				} else if(typeof arr[i] != "function"){
					str += print_r(arr[i],line +(type?"[":"{") + i + (type?"]":"}"),showType,linebreak);
				}
			}catch(err){
				GM_logError("print_r i:"+i+"\n"+err);
				continue;
			}
		}
		if(!i){str += line + " = " + "undefined" + linebreak;}
	}else{
		str += " = " + arr;
	}
	return str;
	} catch (err){
		GM_log("Print_r error : " + err);
		throw ("Print_r error : " + err);
	}
}
function print_r_time(arr,line){
	var str = new String();
//		for (var i = 0; i < arr.length; i++){
	try{
		for (var i in arr){
			try{
				if(!arr.hasOwnProperty(i)){ continue; }
				////GM_log("i:" + i + " : " + typeof arr[i] + " | " + arr + "\n");
				if (typeof arr[i] == "string" || typeof arr[i] == "number" || typeof arr[i] == "boolean") {
					str += line + "[" + i + "] = " + getDaytimeStr(arr[i]) + "<br/>";
				} else if(typeof arr[i] == "undefined"){
					str += line + "[" + i + "] = " + "<br/>";
				} else {
					str += print_r_time(arr[i],line +"[" + i + "]");
				}
			}catch(err){
				GM_logError("print_r_time i:"+i+"\n"+err);
				continue;
			}
		}
		if(!i){str += line + " = " + "undefined" + "<br/>";}
		return str;
	} catch (err){
		GM_log("Print_r_time error : " + err);
		throw ("Print_r_time error : " + err);
	}
}
function Log(obj,pre){
	if(true){
		if(pre==undefined){ pre=""; }
		if(typeof(obj)=="object"){
			//GM_log("______________________________ object");
			for(var v in obj){ 
				if(!obj.hasOwnProperty(v)){ continue; }
				Log(obj[v],pre+v+" : "); 
			}
			//GM_log("______________________________ object end");
		} else {
			if(typeof(obj)!="function") GM_log(pre+obj);
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------------

function produktPic(type,product,append){
// type: 0 = farm, 1 = forest, 2 = windmill
	var prodNum = isNaN(parseInt(product,10))?prodId[product]:parseInt(product,10);
	var type = parseInt(type,10);
	var newdiv = createElement("div",{"type":type,"prod":prodNum,"style":"display:inline-block;position:relative;margin-right:3px;border:none;vertical-align:bottom;"});
	switch(type){
	case 0:
		if (prodNum>0){
			newdiv.setAttribute("class","kp"+prodNum);
		} else {
			createElement("img",{"src":GFX+"menu/coins.gif","style":"height:15px;width:15px;border:none;top:0px;vertical-align:bottom;"},newdiv);
		}
	break;
	case 1:	newdiv.setAttribute("class","f_m_symbol"+prodNum); break;
	case 2:	newdiv.setAttribute("class","fmm"+prodNum); break;
	case 3:	newdiv.setAttribute("class","fmm"+prodNum); break;
	default: GM_log("unknown arguments in function-call of produktPic :type="+type+",product="+product);
	}
	if (append){ append.appendChild(newdiv); }
	return newdiv;
}
function numberFormat(number,decimals,dec_point,thousands_sep){
	// http://kevin.vanzonneveld.net
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +     bugfix by: Michael White (http://getsprink.com)
	// +     bugfix by: Benjamin Lupton
	// +     bugfix by: Allan Jensen (http://www.winternet.no)
	// +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +     bugfix by: Howard Yeend
	// +    revised by: Luke Smith (http://lucassmith.name)
	// +     bugfix by: Diogo Resende
	// +     bugfix by: Rival
	// %        note 1: For 1000.55 result with precision 1 in FF/Opera is 1,000.5, but in IE is 1,000.6
	// *     example 1: numberFormat(1234.56);
	// *     returns 1: '1,235'
	// *     example 2: numberFormat(1234.56, 2, ',', ' ');
	// *     returns 2: '1 234,56'
	// *     example 3: numberFormat(1234.5678, 2, '.', '');
	// *     returns 3: '1234.57'
	// *     example 4: numberFormat(67, 2, ',', '.');
	// *     returns 4: '67,00'
	// *     example 5: numberFormat(1000);
	// *     returns 5: '1,000'
	// *     example 6: numberFormat(67.311, 2);
	// *     returns 6: '67.31'
	try{
		var n = number, prec = decimals;
		n = !isFinite(+n) ? 0 : +n;
		prec = !isFinite(+prec) ? 0 : Math.abs(prec);
		var sep = (typeof thousands_sep == "undefined") ? delimThou : thousands_sep; // changed!
		var dec = (typeof dec_point == "undefined") ? delimDeci : dec_point; // changed!
	
		var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;
	
		var abs = Math.abs(n).toFixed(prec);
		var _, i;
	
		if (abs >= 1000) {
			_ = abs.split(/\D/);
			i = _[0].length % 3 || 3;
	
			_[0] = s.slice(0,i + (n < 0)) +
				_[0].slice(i).replace(/(\d{3})/g, sep+'$1');
	
			s = _.join(dec);
		} else {
			s = s.replace('.', dec);
		}
		return s;
	}catch(err){GM_logError("numberFormat\n"+err);return "";}
}
function numberFormatPrefixed(number){
	// results: 1; 21; 321; 4.321; 54k; 654k; 7.654k; 87M
	try{
		if(number>=10000000){
			return numberFormat(Math.floor(number/1000000))+"M";
		}else if(number>=10000){
			return numberFormat(Math.floor(number/1000))+"k";
		}else{
			return numberFormat(number);
		}
	}catch(err){GM_logError("numberFormatPrefixed\n"+err);return "";}
}
function moneyFormat(number){return numberFormat(number,2)+"&nbsp;"+getText("gamecurrency");}
function moneyFormatInt(number){return numberFormat(number,0)+"&nbsp;"+getText("gamecurrency");}
function moneyFormatLimit(number,limit){return (number>limit?moneyFormatInt(number):moneyFormat(number));}

function pointsFormat(number,containertype,append){
	var newspan = createElement(containertype,{"style":"white-space:nowrap;"},append?append:false);
 	newspan.addEventListener("mouseover",function(event){ toolTip.show(event,getText("points")); },false);
//	createElement("img",{"src":GFX+"points.gif","style":"border:0px;width:12px;height:12px;margin-right:2px;"},newspan);
	createElement("img",{"src":"data:image/gif;base64,R0lGODlhHgAeAMQfAP/ilv/Zdv/SWdikGv/VZkQ0CP/EJYhnEXdaDvO5HuqyHf/dgv/npf/MRLeLFpZyEsWWGP/FK//KO/7BH+KsHP/PT//gjqN8FP/HMayDFW1TDf/INWNLDH5gD6dmAAAAACH5BAEAAB8ALAAAAAAeAB4AAAX/4CeO5OgthFeubOtZaSu7b6rOuOgBljDdudluUVEAgyzPa9GgKJEui4VJcRyhJmlAUr1ilQCURAF5Yk2MMEGSoCS8JKV8rmRYAoLNZGKg+wkBCxYADIWGag0YBhESFYALC3gSEwoDHhINAo+DPCgVEhERGA0VAqYNEVUXD3MJE6OaBAQCnxEGixi5BmQPCBxyOh4OEAMJjA0SG7a3EwlkFx0F0mYmSg8ZEAp8tnuUAxkI0gXASR4XDgPazM0DDgfi1DQerswJzt/h5DkeohETFAMCQoA27gsyA1UyZHDg4MIBDXBoCBiToQOCDg8erOoQTwiBChMycBCnAeODAwciTq7wIAADBA3TPBQoiTJlECUNBkQbJ0cDzZQqTTRQ8CBmMJ8XbeKYd+FXvJ4aEAT9oAQCx4hKEEgN6mHAhY4llHRQ6qLMVKoeyJY7G+xKCAA7","style":"border:0px;width:12px;height:12px;margin-right:2px;"},newspan);
	createElement("span",{},newspan,numberFormat(number));
	return newspan;
}
function coinsFormat(number,append){
	var newdiv = createElement("div",{"style":"display:inline-block;height:16px;"});
	newdiv.addEventListener("mouseover",function(event){ toolTip.show(event,prodName[0]); },false);
	var newdiv1 = produktPic(0,0,newdiv);
	createElement("span",{},newdiv,numberFormat(number));
	if (append) append.appendChild(newdiv);
	return newdiv;
}
function getForestryUserBuilding(pos){
	if(unsafeWindow.forestry_user_buildings!=undefined&&pos!=undefined){
		for(var building in unsafeWindow.forestry_user_buildings){
			if(!unsafeWindow.forestry_user_buildings.hasOwnProperty(building)){continue;}
			if(unsafeWindow.forestry_user_buildings[building]["position"]==pos){
				return pos;
			}
		}
	}
	return false;
}
//---------------------------------------------------------------------------------------------------------------------------

function getRandom( min, max ){
	if ( min > max ){return( -1 );	}
	if ( min == max ){return( min );}
	return( min + parseInt( Math.random() * ( max-min+1 ),10 ) );
}
function compareVersions(ver1,ver2){
	// returns -1 if ver1<ver2
	// returns 0 if ver1=ver2
	// returns +1 if ver1>ver2
	if(ver1==ver2){
		return 0;
	} else {
		ver1 = /(\d+)\.*(.*)/.exec(ver1);
		ver2 = /(\d+)\.*(.*)/.exec(ver2);
		if(parseInt(ver1[1],10)<parseInt(ver2[1],10)){
			return -1;
		} else if(ver1[1]==ver2[1]){
			if(ver1[2]==""){ return -1; }
			if(ver2[2]==""){ return 1; }
			return compareVersions(ver1[2],ver2[2]);
		} else {
			return 1;
		}
	}
}

function alert2(text,yes,no,yesFkt,noFkt){
	var newdiv = createElement("div",{"style":"display:block;z-index:9999;position:fixed;top:0px;left:0px;width:100%;height:100%;"},top.document.body);
	createElement("div",{"style":"display:block;position:fixed;top:0px;left:0px;width:100%;height:100%;background-color:black;opacity:0.7;"},newdiv);
	newdiv = createElement("div",{"style":"display:block;position:fixed;width:300px;top:50%;left:50%;margin-left:-180px;padding:30px;background-color:yellow;border:3px solid black;border-radius:10px;color:black;font-weight:bold;"},newdiv);
	createElement("div",{"style":"position:relative;color:black;font-weight:bold;"},newdiv,text);
	var newdiv1 = createElement("div",{"style":"position:relative;height:37px;witdh:100%;color:black;font-weight:bold;"},newdiv);
	var newbutton = createElement("button",{"type":"button","class":"link","style":"position:absolute;top:20px;left:30px;width:100px;font-weight:bold;"},newdiv1,yes);
	newbutton.addEventListener("click",function(){
		if(typeof yesFkt=="function"){ yesFkt(); }
		removeElement(this.parentNode.parentNode.parentNode);
	},false);
	if(no){
		newbutton = createElement("button",{"type":"button","class":"link","style":"position:absolute;top:20px;right:30px;width:100px;font-weight:bold;"},newdiv1,no);
		newbutton.addEventListener("click",function(){
			if(typeof noFkt=="function"){ noFkt(); }
			removeElement(this.parentNode.parentNode.parentNode);
		},false);
	}
	newdiv.style.marginTop = -(newdiv.offsetHeight/2)+"px";
	newdiv=null;newdiv1=null;newbutton=null;
}

if(!unsafeWindow.top.toolTip){
	unsafeWindow.top.toolTip= new function(){
		var container=null;
		this.mousemove=function(evt){
			try{
				if(container.style.display!="none"){
					var help=getOffset(frameElement);
					var cleft=(evt.pageX+help.left-(container.offsetWidth/3));
					var mleft=Math.min(0,(top.document.body.clientWidth - cleft - container.offsetWidth));
					container.style.left=Math.max(0,cleft + mleft) + "px";
					container.style.top=Math.max(0,((top.document.body.clientHeight - evt.pageY+help.top - 25 - container.offsetHeight)<0)?(evt.pageY+help.top-25-container.offsetHeight):(evt.pageY+help.top+25)) + "px";
				}
			}catch(err){GM_logError("toolTip.mousemove\n"+err);}
		}
		this.init=function(){
			try{
				container=$top("divToolTip");
				if((container==null)&&(self==top)){
					container=createElement("div",{"id":"divToolTip","style":"z-index:999;overflow:visible;max-width:1000px;display:none;position:absolute;padding:4px;background-color:#fff;color:#000;border:2px solid #885F49;border-radius:5px;font-size:11px;"},ALL); // ="class":"ttbox"
					window.addEventListener("mousemove",toolTip.mousemove,false);					
				}else{
					toolTip.hide(); // important when a frame loads while tooltip opened
				}			
			}catch(err){GM_logError("toolTip.init\n"+err);}
		}
		this.show=function(evt,content){
			try{
				var help = getOffset(frameElement);
				container.setAttribute("targetId",evt.target.id);
				container.innerHTML = content;
				container.style.display = "block";
				window.addEventListener("mouseout",toolTip.hide,false);
				var cleft = (evt.pageX+help.left-(container.offsetWidth/3));
				var mleft = Math.min(0,(top.document.body.clientWidth - cleft - container.offsetWidth));
				container.style.left = Math.max(0,cleft + mleft) + "px";
				container.style.top = Math.max(0,((top.document.body.clientHeight - evt.pageY+help.top - 25 - container.offsetHeight)<0)?(evt.pageY+help.top-25-container.offsetHeight):(evt.pageY+help.top+25)) + "px";
			}catch(err){GM_logError("toolTip.show\n"+err);}
		}
		this.adjust=function(targetElem){
			try{
				if (targetElem!=undefined && container.getAttribute("targetId")==targetElem.id){
					var xLeft = container.offsetLeft;
					var xTop = container.offsetTop;
					var B = document.createEvent("MouseEvents");
					B.initEvent("mouseout", true, true);
					targetElem.dispatchEvent(B);
					B.initEvent("mouseover", true, true);
					//B.initMouseEvent("mouseover", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null); //TODO set the correct coords
					targetElem.dispatchEvent(B);
					container.style.left = xLeft+"px";
					container.style.top = xTop+"px";
				}
			}catch(err){GM_logError("toolTip.adjust\n"+err);}
		}
		this.hide=function(){
			try{
				window.removeEventListener("mouseout",toolTip.hide,false);
				if(container){
					container.setAttribute("targetId","");
					container.style.display = "none";
					container.innerHTML = "";
				}
			}catch(err){GM_logError("toolTip.hide\n"+err);}
		}
	}
}
toolTip=unsafeWindow.top.toolTip;
if(!unsafeWindow.top.logBubble){
	unsafeWindow.top.logBubble= new function(){
		var container=null;
		var elements=[];
		var clearActive=false;
		var isMouseOver=false;
		this.init=function(){
			try{
				if(!container){
					container=createElement("div",{"id":"_divLogBubbleBox","style":"position:fixed;right:0;bottom:0;z-index:999;","isMouseOver":"0"},ALL);
					container.addEventListener("mouseover",function(event){
						try{
							isMouseOver=true;
						}catch(err){GM_logError("logBubble.mouseOver\n"+err);}
					},false);
					container.addEventListener("mouseout",function(event){
						try{
							var nodeSource=event.target;
							if(nodeSource&&(nodeSource!=this)){
								while(nodeSource=nodeSource.parentNode){
									if(this==nodeSource){ break; }
								}
							}
							var nodeTarget=event.relatedTarget;
							if(nodeTarget&&(nodeTarget!=this)){
								while(nodeTarget=nodeTarget.parentNode){
									if(this==nodeTarget){ break; }
								}
							}
							if(nodeSource!=nodeTarget){
								isMouseOver=false;
								logBubble.clear();
							}
						}catch(err){GM_logError("logBubble.mouseOut\n"+err);}
					},false);				
				}
			}catch(err){GM_logError("logBubble.init\n"+err);}
		}	
		this.add=function(text,timer,color){
			try{
				if(timer==undefined){ timer=10; }
				if(color==undefined){ color="blue"; }
				if(!container){ logBubble.init(); }
				now=Math.floor((new Date()).getTime()/1000);
				elements.push(now+timer);
				createElement("div",{"class":"blackbox","style":"color:white;background-color:"+color+";border:2px solid black;border-radius:10px;padding:5px;margin-top:5px;"},container,getDaytimeStr(now)+"&nbsp;"+text);
				window.setTimeout(logBubble.clear,1000*timer+1);			
			}catch(err){GM_logError("logBubble.add\n"+err);}
		}
		this.clear=function(){
			try{
				if(clearActive){
					window.setTimeout(logBubble.clear,200);
				}else if(container){
					clearActive=true;
					now=Math.floor((new Date()).getTime()/1000);
					if(!isMouseOver){
						for (var i=elements.length-1;i>=0;i--){
							if (elements[i]<=now){
								removeElement(container.children[i]);
								elements.splice(i,1);
							}
						}
					}
					clearActive = false;
				}
			}catch(err){GM_logError("logBubble.clear\n"+err);}
		}		
	}
}
logBubble=unsafeWindow.top.logBubble;
if(!unsafeWindow.top.tracking){
	unsafeWindow.top.tracking= new function(){
		var data={};
		this.init=function(skriptName){
			try{
				if(!data[skriptName]){
					data[skriptName] = [];
					GM_registerMenuCommand("show tracking of "+skriptName, function(skriptName){
					return function(){
						tracking.plot(skriptName);
					}
					}(skriptName));
				}
			}catch(err){GM_logError("tracking.init\n"+err);}
		}	
		this.start=function(skriptName,functionName,parameterArray){
			try{
				return data[skriptName].push([functionName,(new Date()).getTime(),null,parameterArray]);
			}catch(err){GM_logError("tracking.start\n"+err);}
		}
		this.end=function(skriptName,trackingHandle){
			try{
				data[skriptName][trackingHandle-1][2]=(new Date()).getTime();
				// check for long durations?
			}catch(err){GM_logError("tracking.end\n"+err);}
		}
		this.plot=function(skriptName){
			var container=createElement("div",{"style":"z-index:995;position:absolute;top:0;left:0;background-color:white;height:100%;"},ALL);
			var div=createElement("img",{"class":"link","src":GFX+"close.jpg","style":"position:absolute;top:0;right:0;width:20px;height:20px;margin:5px;"},container);
			div.addEventListener("click",function(){ removeElement(this.parentNode); },false);
			div=createElement("div",{"style":"height:100%;padding-right:20px;margin-right:30px;overflow:auto;"},container);
			var table,tr,td;
			table=createElement("table",{"border":"1"},div);
			tr=createElement("tr",{},table);
			createElement("th",{},table,"Nr");
			createElement("th",{},table,"function");
			createElement("th",{},table,"start");
			createElement("th",{},table,"end");
			createElement("th",{},table,"parameter");
			for(var i=0;i<data[skriptName].length;i++){
				tr=createElement("tr",{},table);
				createElement("td",{},table,i);
				for(var j=0;j<3;j++){
					createElement("td",{},table,data[skriptName][i][j]);
				}
				createElement("td",{},table,data[skriptName][i][3]?implode(data[skriptName][i][3],"tracking.plot"):"");
			}
		}
	}
}
tracking=unsafeWindow.top.tracking;

// CONSTANTS / GLOBALS ************************************************************************************************
// DOM
var ALL = null;
var container = null;
	
// Objects
try{
	if(!unsafeWindow.greaseMonkeyData){ unsafeWindow.greaseMonkeyData=new Object(); }
	var unsafeData = unsafeWindow.greaseMonkeyData;
}catch(err){ GM_logError("unsafeData ("+location.href+")\n"+err); }
try{
	if(!top.window.wrappedJSObject.greaseMonkeyData){ top.window.wrappedJSObject.greaseMonkeyData=new Object(); }
	top.unsafeData = top.window.wrappedJSObject.greaseMonkeyData;
}catch(err){ GM_logError("top.unsafeData ("+location.href+")\n"+err); }
const STAT_SERVER = {"AE":"http://mff.metrax.eu","AU":"http://mff.metrax.eu","BG":"http://mff.metrax.eu","BR":"http://mff.metrax.eu","DE":"http://mff.metrax.eu","DK":"http://mff.metrax.eu","ES":"http://mff.metrax.eu","FR":"http://mff.metrax.eu","GR":"http://mff.metrax.eu","HR":"http://mff.metrax.eu","HU":"http://mff.metrax.eu","IR":"http://mff.metrax.eu","IT":"http://mff.metrax.eu","NL":"http://mff.metrax.eu","NO":"http://mff.metrax.eu","NZ":"http://mff.metrax.eu","PL":"http://mff.metrax.eu","PT":"http://mff.metrax.eu","RO":"http://mff.metrax.eu","RU":"http://mff.metrax.eu","SE":"http://mff.metrax.eu","TH":"http://mff.metrax.eu","TR":"http://mff.metrax.eu","UK":"http://mff.metrax.eu","US":"http://mff.metrax.eu","VN":"http://mff.metrax.eu"};
const STAT_VIEW = {"DE":"http://mff.metrax.eu"};
const GAMEPAGES = {"AE":"myfreefarm.ae","AU":"au.myfreefarm.com","BG":"veselaferma.com","BR":"myfreefarm.com.br","DE":"myfreefarm.de","CZ":"myfreefarm.cz","DK":"myfreefarm.dk","ES":"migranjalinda.es","FR":"mabelleferme.fr","GR":"myfreefarm.gr","HR":"myfreefarm.com.hr","HU":"enkicsitanyam.hu","IR":"myfreefarm.ir","IT":"myfreefarm.it","NL":"myfreefarm.nl","NO":"myfreefarm.no","NZ":"myfreefarm.co.nz","PL":"wolnifarmerzy.pl","PT":"pt.myfreefarm.com","RO":"fermavesela.ro","RU":"mojaderewnja.ru","SE":"myfreefarm.se","TH":"th.myfreefarm.com","TR":"tr.myfreefarm.com","UK":"myfreefarm.co.uk","US":"myfreefarm.com","VN":"myfreefarm.com.vn"};
var pageZusatz = new Object();
if(location.search!=""){
	var help = location.search.replace(/^\?/,"").split(/\&/);
	for(var v=0;v<help.length;v++){
		var help2 = help[v].split(/\=/);
		pageZusatz[help2[0]] = help2[1];
	}
}
const sortObjFunctions = {
	"desc":function(a,b){return ((b[0]>a[0])-(b[0]<a[0]));},
	"int":function(a,b){return (parseInt(a[0],10)-parseInt(b[0],10));},
	"float":function(a,b){return (parseFloat(a[0],10)-parseFloat(b[0],10));},
	"date":function(a,b){return (getTime(a[0])-getTime(b[0]));},
	"productId":function(a,b){
		if(prodTyp[0][a[0]]==prodTyp[0][b[0]]){
			return(parseInt(a[0],10)-parseInt(b[0],10));
		} else {
			return({"c":0,"v":1,"e":2,"o":3,"fw1":4,"fw2":5,"fw3":6,"fw4":7,"z":8}[prodTyp[0][a[0]]]-{"c":0,"v":1,"e":2,"o":3,"fw1":4,"fw2":5,"fw3":6,"fw4":7,"z":8}[prodTyp[0][b[0]]]);
		}
	}
};

// Strings
var LANGUAGE = null;
var texte = new Object();
function getText(id){
	try{
		if(texte[LANGUAGE]&&texte[LANGUAGE][id]){
			return texte[LANGUAGE][id];
		}else if(texte["en"]&&texte["en"][id]){
			return texte["en"][id];
		}else{
			return "";
			GM_logWarning("Text '"+id+"' not found!");
		}
	}catch(err){GM_logError("getText id="+id+"\n"+err);}
}
var delimThou = ".";
var regDelimThou = "\\.";
var regDelimThouShift="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
var regDelimThouDelete="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
var delimDeci = ",";
var regDelimDeci = ",";
var dateFormatDM = "day.month.";
var dateFormatDMY = "day.month.year";
var timeFormatHM = "hour:min";
var timeFormatHMS = "hour:min:sec";

var COUNTRY = null;
var SERVER = null;
var PAGE = null;
var GFX = null; // http://mff.wavecdn.de/mff/
var USERNAME = null;

// Numbers
var now = Math.floor((new Date()).getTime()/1000);
var todayStr;
var nowServerOff;
var todayServerStr;
// call:
// now = Math.floor((new Date()).getTime()/1000);
// todayStr = getDateStr(now,2,false); //4.2.2011
// nowServerOff = unsafeWindow.Zeit.Server+OFFSET;
// todayServerStr = getDateStr(nowServerOff,2,false);
var valServerTimeOffset = 0;
const NEVER = 2147483000; //upper limit of signed long

// special characters
const sign_average = "\u2205";
const sign_mult = "\u00D7";
const sign_sum = "\u2211"; //"\u03A3"
const sign_inf = "\u221E";
const A_dots = "\u00C4";
const a_dots = "\u00E4";
const O_dots = "\u00D6";
const o_dots = "\u00F6";
const sz = "\u00DF";
const U_dots = "\u00DC";
const u_dots = "\u00FC";

// ON LOAD ***************************************************************************************************************

window.addEventListener("load",function(){
	ALL = document.getElementsByTagName("body")[0];
	GFX = top.window.wrappedJSObject._GFX?top.window.wrappedJSObject._GFX:"http://mff.wavecdn.de/mff/";
	toolTip.init();
},false);
