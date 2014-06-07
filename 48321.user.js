// ==UserScript==
// @name           Orbitz.com flight search
// @namespace      OrbitzSearch
// @version_timestamp 1242917549147
// @description    Search orbitz.com plane tickets with different dates.
// @include        http://www.orbitz.com/*
// ==/UserScript==

/*

To use:
Do search for flights on orbitz.com
Click "start search" on the results page.

The search will start around the departure/return dates you have picked until orbitz returns an error when the search reaches today.


To try to guess the best season of a year...
* Change the "move ... per search" box to 30 days.
* Change departure/return dates to 6 months away.
* Click "start search"
This will do searches in 30 day gaps.

* Note: if you search too much as a non-member eventually they'll ask you to join.

*/


var version_scriptNum = 44038; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1242917549147; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
//function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/source/" + version_scriptNum +".meta.js" + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText; var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/@version_timestamp\s+([0-9]+)\s*$/m.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }


if(!this.JSON){JSON={};}
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
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());

nHtml={
Log:function(str) {
	if(GM_log) {
		GM_log('OrbitzSearch:'+str);
	}
},
FindByXPath:function(obj,xp) {
	var q=null;
	try {
		q=document.evaluate(xp,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		this.Log("XPath Failed:"+tag+","+className);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
Click2:function(obj,evtName) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
Click:function(obj) {
	this.Click2(obj,"click");
}
};


OrbitzSearch={

SaveSearch:function(search) {
	GM_setValue('search',JSON.stringify(search));
},

LoadSearch:function() {
	return JSON.parse(GM_getValue('search','{}'));
},

SortableDateToOrbitzDate:function(str) {
	str=str.trim();
	return str.substring(5,7)+"/"+str.substring(8,10)+"/"+str.substring(2,4);
},

ClickDate:function(dateStr) {
	var startEnd=dateStr.split('-');
	
	var inps=this.GetStartEndInputs();
	if(inps.start) {
		inps.start.value=this.SortableDateToOrbitzDate(startEnd[0]);
	}
	inps.end.value=this.SortableDateToOrbitzDate(startEnd[1]);
},

minFare:0,
GetCurrentResultsDiv:function(search) {
	var div=document.createElement('div');
	if(!search.ByDate) { return div; }

	var dates=[];
	var byCost=[];
	for(var d in search.ByDate) {
		var cost=search.ByDate[d];
		byCost.push(cost);
		dates.push(d);
	}
	byCost=byCost.sort(function(a,b) { return a-b; });
	this.minFare=byCost[0];
	dates=dates.sort();
	for(var dUpto=0; dUpto<dates.length; dUpto++) {
		var dStr=dates[dUpto];
		var t=document.createElement('a');
		var cost=search.ByDate[dStr];
		var fontOpt='';
		if(cost==byCost[0]) {
			t.style.fontWeight='bold';
		}
		t.innerHTML=dStr+" :	 $"+cost;
		t.href='javascript:void();';
		t.addEventListener('click',function(e) {
			var dateStr=e.target.textContent.split(':')[0];
			OrbitzSearch.ClickDate(dateStr);
			
		},false);

		div.appendChild(t);
		div.appendChild(document.createElement('br'));
	}
	return div;
},

GetStartEndInputs:function() {
	var start=document.getElementById('airchgStartDate');
	var end=document.getElementById('airchgEndDate');
	if(!start) { start=document.getElementById('amcchgStartDate1'); }
	if(!end) { 
		var endNum=1;
		while(true) {
			var e=document.getElementById('amcchgStartDate'+endNum); 
			if(!e || e.value=="mm/dd/yy") {break; }
			end=e;
			endNum++;
		}
	}
	return {
		'start':start,
		'end':end
	};
},

AddATag:function(txt,func,title) {
	var stopA=document.createElement('a');
	stopA.innerHTML=txt;
	stopA.href='javascript:void();';
	if(title) stopA.title=title;
	stopA.addEventListener('click',func,false);
	return stopA;
},

stopA:null,
startA:null,
continueA:null,
//stopOnBestA:null,
belowInp:null,

ToggleSearchVis:function(started) {
	if(this.stopA)
		this.stopA.style.display=(started?'inline':'none');
//	this.stopOnBestA.style.display=(started?'inline':'none');
	if(this.continueA)
		this.continueA.style.display=(started?'none':'inline');
	if(this.startA)
		this.startA.style.display=(started?'none':'inline');
},

SearchForm:function() {
	var chgBotBox=document.getElementById('sort_tabs');
	if(!chgBotBox) { return; }
	var search=this.LoadSearch();
	var div=document.createElement('div');
	div.innerHTML="Move <input id='dateShiftAdd' size='3' value='"+(search.dateShiftAdd==undefined?1:search.dateShiftAdd)+"' /> days per search<br />"+
		"<input type='checkbox' id='noStartDate' "+(search.noStartDate?"checked":"")+" />Don't change the start date<br />"+
		"<input type='checkbox' id='noEndDate' "+(search.noEndDate?"checked":"")+" />Don't change the end date<br />";

	div.appendChild(this.stopA=this.AddATag('Stop Search',function() {
		OrbitzSearch.StopSearch();
		OrbitzSearch.ToggleSearchVis(false);
	}));
	this.stopA.style.fontSize='14pt';
	div.appendChild(document.createElement('br'));
/*
	div.appendChild(this.stopOnBestA=this.AddATag('Stop when a price below $',function() {
		OrbitzSearch.StopOnBestSearch();
	}));
	this.stopOnBestA.style.fontSize='14pt';
*/
	div.appendChild(document.createTextNode('Stop when price is below $'));
	var belowInp=document.createElement('input');
	belowInp.id='belowInp';
	belowInp.size='6';
	belowInp.value=search.belowCost>0?search.belowCost:-1;
	div.appendChild(belowInp);
	this.belowInp=belowInp;
	div.appendChild(document.createElement('br'));


	div.appendChild(this.continueA=this.AddATag('Continue Search',function() {
		OrbitzSearch.ContinueSearch();
		OrbitzSearch.ToggleSearchVis(true);
	}));
	div.appendChild(document.createElement('br'));
	div.appendChild(this.startA=this.AddATag('Start Search',function() {
		OrbitzSearch.StartSearch();
		OrbitzSearch.ToggleSearchVis(true);
	},"This will take a while, leave it running in the background.  The search will stop when we reach a date before today."));
	div.appendChild(document.createElement('br'));
	OrbitzSearch.ToggleSearchVis(search.startSearch);

	
	var currentResults=null;
	div.appendChild(this.AddATag('Hide/Show Results',function() {
		currentResults.style.display=currentResults.style.display=='none'?'block':'none';
	},""));
	div.appendChild(document.createElement('br'));
	
	currentResults=this.GetCurrentResultsDiv(search);
	div.appendChild(currentResults);
	
	chgBotBox.insertBefore(div,chgBotBox.childNodes[0]);
},

StopSearch:function() {
	var search=this.LoadSearch();
	if(!search.startSearch) { return false; }
	search.startSearch=undefined;
	this.SaveSearch(search);
	return true;
},
/*
StopOnBestSearch:function() {
	var search=this.LoadSearch();
	search.stopOnBest=search.stopOnBest?false:true;
	this.SaveSearch(search);
},

*/

Get2Digits:function(num) {
	if(num<10) { num="0"+num.toString(); }
	return num;
},
DateToDateStr:function(d) {
	return this.Get2Digits(d.getMonth()+1)+"/"+this.Get2Digits(d.getDate())+"/"+this.Get2Digits(d.getFullYear()-2000);
},

DateToSortableStr:function(d) {
	return d.getFullYear()+"/"+this.Get2Digits(d.getMonth()+1)+"/"+this.Get2Digits(d.getDate());
},

toInt:function(str) {
	var num=str.replace(/^0*/,'');
	return parseInt(num);
},

DateStrToDate:function(str) {
	var i=str.split('/');
	var d=new Date();
	d.setMonth(this.toInt(i[0])-1);
	d.setFullYear(2000+this.toInt(i[2]));
	d.setDate(i[1]);

	return d;
},

ContinueSearch:function() {
	var search=this.LoadSearch();
	search.startSearch=true;
	this.SaveSearch(search);
	this.Search();
},
StartSearch:function() {
	var search=this.LoadSearch();
	search.startSearch=true;
//	search.stopOnBest=false;
	search.dateShift=0;
	search.belowCost=parseInt(this.belowInp.value);
	search.dateShiftAdd=parseInt(document.getElementById('dateShiftAdd').value);
	search.noStartDate=document.getElementById('noStartDate').checked;
	search.noEndDate=document.getElementById('noEndDate').checked;
	search.ByDate={};
	if(!search.dateShiftAdd || isNaN(search.dateShiftAdd)) { search.dateShiftAdd=1; }

	var inps=this.GetStartEndInputs();

	var startDate=this.DateStrToDate(inps.start.value);
	var endDate=this.DateStrToDate(inps.end.value);
	search.startDate=startDate.getTime();
	search.endDate=endDate.getTime();
	nHtml.Log('Start/end date:'+startDate.toLocaleString()+" to "+endDate.toLocaleString());
	this.SaveSearch(search);
	
	this.Search();
},

GetBestFare:function() {
	var nonNumberRe=new RegExp('[^0-9]','g');
	var ss=document.evaluate(".//div[@class='matrixTotal']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var bestFare=-1;
	for(var s=0; s<ss.snapshotLength; s++) {
		var priceDiv=ss.snapshotItem(s)
		var num=parseInt(priceDiv.textContent.replace(nonNumberRe,''));
		if(bestFare<0 || num<bestFare) { bestFare=num; }
	}
	return bestFare;
},

Search:function() {
	var search=this.LoadSearch();
	if(!search.startSearch) { return; }
	
//	var airOrigin=document.getElementById('airOrigin');
//	var airDestination=document.getElementById('airDestination');
	var inps=this.GetStartEndInputs();

	var buttonDiv=nHtml.FindByXPath(document,".//div[contains(@class,'geckoButtonFix') and contains(string(),'Find')]");
	if(!inps.start || !inps.end || !buttonDiv) {
		// we're in the intermediate page?
//		window.setTimeout(function() { OrbitzSearch.Search(); },5000);
//		nHtml.Log("Could not find date inputs");
		return;
	}

	// add best fare
	var bestFare=this.GetBestFare();
	var d=new Date();
	if(search.noStartDate) {
		d.setTime(search.startDate);
	} else {
		d.setTime(search.startDate+(search.dateShift*86400*1000));
	}
	var dend=new Date();
	if(search.noEndDate) {
		dend.setTime(search.endDate);
	} else {
		dend.setTime(search.endDate+(search.dateShift*86400*1000));
	}
	var currentDStr=this.DateToSortableStr(d)+' - '+this.DateToSortableStr(dend);
	if(bestFare>0) {
		search.ByDate[currentDStr]=bestFare;
	}
	
	nHtml.Log("Bestfare:"+currentDStr+"="+bestFare);

	// search for the next date
	search.dateShift=(0-search.dateShift);
	if(search.dateShift>=0) {
		search.dateShift+=search.dateShiftAdd;
	}
	
	if(search.dateShift>365) {
		nHtml.Log("Reached 365 days, quitting");
		return;
	}
	
	this.SaveSearch(search);

	if(bestFare>0 && bestFare<search.belowCost) {
		nHtml.Log("Found beter fare:"+bestFare);
		this.minFare=bestFare;
		this.StopSearch();
		this.ToggleSearchVis(false);
		return;
	}

	if(!search.noStartDate) {
		d.setTime(search.startDate+(search.dateShift*86400*1000));
		inps.start.value=this.DateToDateStr(d);
	}
	if(!search.noEndDate) {
		dend=new Date();
		dend.setTime(search.endDate+(search.dateShift*86400*1000));
		inps.end.value=this.DateToDateStr(dend);
	}


	nHtml.Click(buttonDiv.childNodes[0]);
}

};

if(GM_registerMenuCommand) {
	GM_registerMenuCommand('Orbitz - stop searching',function() {
		OrbitzSearch.StopSearch();
	});
}

window.addEventListener('load',function() {
	var perror=nHtml.FindByXPath(document,"//p[@class='error']");
	if(perror) {
		nHtml.Log('Search stopped on error');
		if(OrbitzSearch.StopSearch()) {
			window.history.go(-1);
		}
	} else {
		OrbitzSearch.SearchForm();
		window.setTimeout(function() {
			OrbitzSearch.Search();
		},3000);
	}
},false);
