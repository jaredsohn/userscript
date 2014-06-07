// ==UserScript==
// @name           LetterboxMarker
// @namespace      http://dosensuche.de
// @description    Fügt auf auf Letterboxing Germany eine Merker-Spalte hinzu.
// @include        http://michael-wilhelm.info/forum/viewforum.php*
// @include        http://michael-wilhelm.info/lbg_forum/*
// @include        http://letterboxing-germany.info/lbg_forum/*
// ==/UserScript==

var markerValues=new Array("","gefunden","vorgemerkt","ignoriert");
var ignoreForums=new Array(1,7,15,8,9,10,11,12,29,31);

var bs=document.getElementsByTagName("b");
var themen=null;
for(var i=0;i<bs.length;i++) {
	if(bs[i].firstChild && bs[i].firstChild.data && bs[i].firstChild.data.substr(0,6)=="Themen") {
		themen=bs[i].parentNode.parentNode;
	}
}

if(!themen) {
	log("unbekanntes/unpassendes HTML");
} else {
	var url=document.URL;
	var reForum=/viewforum\.php\?f=(\d+)/;
	reForum.exec(url);
	var forum=RegExp.$1;
	var ignore=false;
	for(var i=0;i<ignoreForums.length;i++) {
		if(ignoreForums[i]==forum) ignore=true;
	}
	if(!ignore) displayMarkers();
}

function displayMarkers() {
	var trs=themen.parentNode.getElementsByTagName("tr");
	var themenseen=false;
	for(var i=0;i<trs.length-1;i++) {
		if(trs[i]==themen) {themenseen=true;}
		else if(themenseen==true) {
			var tds=trs[i].getElementsByTagName("td");
			if(!tds || tds.length<2) continue;
			var as=tds[1].getElementsByTagName("a");
			var topiclink=null;
			for(var j=0;j<as.length;j++) {
				var classString=as[j].getAttribute("class");
				if(classString=="topictitle link-new" || classString=="topictitle") topicLink=as[j].getAttribute("href");
			}
			var regexp=/viewtopic\.php\?f=(\d+)&t=(\d+)/;
			regexp.exec(topicLink);
			var topic=RegExp.$2;
			var newCell=tds[0].cloneNode(false);
			newCell.appendChild(getMarker(topic));
			tds[0].parentNode.appendChild(newCell);
		}
	}
	trs[trs.length-1].getElementsByTagName("td")[0].setAttribute("colspan","7");
	trs[trs.length-1].id="letterboxmarker_lastrow";
	trs[1].id="letterboxmarker_firstrow";
	var headerCell=themen.getElementsByTagName("td")[0].cloneNode(false);
	var title=document.createElement("b");
	var titletext=document.createTextNode("LetterboxMarker");
	title.appendChild(titletext);
	title.setAttribute("class","gensmall");
	title.setAttribute("font-size","smaller");
	var titlespan=document.createElement("span");
	titlespan.addEventListener("click",insertStoreControl,false);
	titlespan.appendChild(title);
	headerCell.appendChild(titlespan);
	headerCell.setAttribute("colspan","1");
//	themen.parentNode.insertBefore(headerCell,themen);
	themen.appendChild(headerCell);
}

function getMarker(topic) {
	var select=document.createElement("select");
	var selected=getStoredMarker(topic);
	for(var i=0;i<markerValues.length;i++) {
		var option=document.createElement("option");
		option.setAttribute("value",i);
		if(i==selected) {
			option.setAttribute("selected","selected");
		}
		option.appendChild(document.createTextNode(markerValues[i]));
		select.appendChild(option);
	}
	select.addEventListener("change",getEventHandler(topic),false);
	return select;
}

function getEventHandler(topic) {
	return function() {
		var val=this.value;
		setStoredMarker(topic,val);
	}	
}

function getStoredMarker(topic) {
	var val=getValue(topic);
	if(!val) {
		val=0;
	}
	return val;
}

function setStoredMarker(topic, value) {
//	log(topic+"->"+value);
	if(value==0) {
		deleteValue(topic);
	} else {
		setValue(topic,value);
	}
	if(storeControlActive()) {
		document.getElementById("letterboxmarker_markerstring").setAttribute("value",getMarkerString());
	}
}

function getMarkerString() {
	var string="";
	var topics=listValues();
	for(i in topics) {
//		log("top "+i+": "+topics[i]);
		var val=getStoredMarker(topics[i]);
		if(val!=0) {
			if(string.length>0) string+=";";
			string+=topics[i]+":"+val;
		}
	}
//	log("markerstring "+string);
	return string;
}

function setMarkerString(string) {
//	log("setmarkerstring "+string);
	if(!string || string.length==0) return;
//	log("setmarkerstring1 "+string);
	var tops=string.split(";");
	for (var i in tops) {
		var top=tops[i];
		var re=/(\d+):(\d+)/;
		re.exec(top);
		var topic=RegExp.$1;
		var value=RegExp.$2;
//		log(topic+"->"+value);
		setStoredMarker(topic,value);
	}
}

function deleteStoredMarkers() {
	var topics=listValues();
	for (topic in topics) {
//		log("del "+topics[topic]);
		var val=setStoredMarker(topics[topic],0);
	}
}

function storeControlActive() {
	return document.getElementById("letterboxmarker_storecontrol");
}

function saveStore() {
	var val=document.getElementById("letterboxmarker_markerstring").value;
	if(document.getElementById("letterboxmarker_overwrite").checked && val) deleteStoredMarkers();
	setMarkerString(val);
	window.location.reload();
}

function insertStoreControl() {
	if(storeControlActive()) return;
	var lastrow=document.getElementById("letterboxmarker_lastrow");
	var tr=lastrow.cloneNode(false);;
	tr.id="letterboxmarker_storecontrol";
	var td=lastrow.getElementsByTagName("td")[0].cloneNode(false);
	td.setAttribute("colspan",7);
	tr.appendChild(td);
	var input=document.createElement("input");
	input.setAttribute("type","text");
	input.setAttribute("size","50");
	input.setAttribute("value",getMarkerString());
	input.id="letterboxmarker_markerstring";
	td.appendChild(input);
	var checkbox=document.createElement("input");
	checkbox.setAttribute("type","checkbox");
	checkbox.id="letterboxmarker_overwrite";
	td.appendChild(checkbox);
	td.appendChild(document.createTextNode("\u00fcberschreiben"));
	var button=document.createElement("input");
	button.setAttribute("type","button");
	button.setAttribute("value","\u00fcbernehmen");
	button.addEventListener("click",saveStore,false);
	td.appendChild(button);
	lastrow.parentNode.insertBefore(tr,document.getElementById("letterboxmarker_firstrow"));
}

function log(s) {
	if(typeof GM_log!="undefined") {GM_log(s);}
	else {
		opera.postError(s);
	}
}

function setValue(k,v,lifeTime) {
	if(typeof GM_setValue!="undefined") {GM_setValue(k,v);}
	else {
	if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
	document.cookie = escape(k) + "=" + escape( v ) +
		";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * 31536000 ) ) ).toGMTString() + ";path=/";

	}
}

function getValue(k) {
	if(typeof GM_getValue!="undefined") {return GM_getValue(k);}
	else {
		var cookieJar = document.cookie.split( "; " );
		for( var x = 0; x < cookieJar.length; x++ ) {
			var oneCookie = cookieJar[x].split( "=" );
			if( oneCookie[0] == escape(k) ) {
				try {
					eval('var footm = '+unescape( oneCookie[1] ));
				} catch(e) { return null; }
				return footm;
			}
		}
		return null;
	}
}

function deleteValue(k) {
	if(typeof GM_deleteValue!="undefined") {GM_deleteValue(k);}
	else {
		setValue( k, '', 'delete' );
	}
}

function listValues() {
	if(typeof GM_listValues!="undefined") {return GM_listValues();}
	else {
		var cookieJar = document.cookie.split( "; " );
		var arr=new Array();
//		log("found "+cookieJar.length+" in "+document.cookie);
		for( var x = 0; x < cookieJar.length; x++ ) {
			var oneCookie = cookieJar[x].split( "=" );
			var val=unescape(oneCookie[0]);
			if(!val.match(/\D/)) {
	//			log(oneCookie[0]);
				arr.push(val);
			}
		}
		return arr;
	}
}

