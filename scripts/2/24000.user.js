// Copyright (C) 2008 Manuel F. <mf@find-the-flow.com>
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by 
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// ==UserScript== 
// @name           www.kicker.de livescores AutoUpdater&eMail-Ticker (ajax)
// @namespace      *
// @version        0.8.7
// @description    Für alle die keine Lust haben ständig auf "aktualisieren" zu drücken...
// @include        *.kicker.de*/live-news/livescores/*
// @releasenotes   http://ticker.e-dias.de/releasenotes.txt
// ==/UserScript==

/* global vars */
var kickerAutoUpdater,reloadImg,requestObj,update,serverTime,userEmail;

var serverURL="http://ticker.e-dias.de/";
var tickerObject=document.getElementById("ltcontent");
var msgBase="http://www.kicker.de/";
var msgCSS="css/generic/liveticker_v4-2-9.css";

/* global constants */
var VERSION="0.8.7";
var UPDATE_TIME_IN_SECONDS=5;
var DEFAULT_SETTING="on";	//  "on" heißt autoupdater ist standardmäßig eingeschaltet, alles andere bedeutet AUS!
var SHOW_ERG_TYPES=new Array(["Tor","true"],["Gelbe Karte","false"],["Gelb-Rote Karte","true"],["Rote Karte","true"],["Spielerwechsel","false"]);

(function() {
	var styles = [
		serverURL+'tickerstyles.css'
	];
	/* append external styles to head */
	for (i in styles) {
	    var style = document.createElement('link');
	    style.setAttribute("rel","stylesheet");
	    style.href = styles[i];
	    document.getElementsByTagName('head')[0].appendChild(style);
	}
})(); // end anonymous function wrapper

function initTicker(){
	reloadImg=document.getElementById('reloadimg');
	/* create and append Settings */
	serverTime=kickerAutoUpdater.startTime;
	window.setInterval(startAutoUpdate, kickerAutoUpdater.updateInterval*1000);
}

function setStand(updateElemArr){
	try{
		requestTime();
	}catch (e){};
	if(serverTime){
		for(var i=0;i<updateElemArr.length;i++){
			if(updateElemArr[i].parentNode)
				updateElemArr[i].parentNode.getElementsByTagName("small")[0].innerHTML="         (Stand "+serverTime+")";
		}
	}
}

startAutoUpdate=function(){
	if(document.getElementById("updateState").value=="true"){
		kickerAutoUpdater.getLiveTickerUpdate();
		if(document.getElementById("ltkonf")){
			setStand([document.getElementById("ltkonf").getElementsByTagName("div")[0],document.getElementById("lttxtt").getElementsByTagName("div")[0]]);
		}else{
			setStand([document.getElementById("lttxtt").getElementsByTagName("div")[0]]);
		}
		if(kickerAutoUpdater.recentUpdate){
			if(kickerAutoUpdater.alertMessage[0]){
				var message=kickerAutoUpdater.alertMessage[0];
				var title=kickerAutoUpdater.alertMessage[1];
				var send=false;
				var check=false;
				var topaktuell=document.getElementById("lttopa").innerHTML?true:false;
				check=topaktuell?title.contains(kickerAutoUpdater.showErgTypes[0][0]):message.contains("ergtyp_1.");
				send=(check&&kickerAutoUpdater.showErgTypes[0][1]=="true")?true:send;
				title=check?kickerAutoUpdater.showErgTypes[0][0]+"! "+title:title;
				if(!check){	// es kann nur einen Typ geben ;)
					check=topaktuell?title.contains(kickerAutoUpdater.showErgTypes[1][0]):message.contains("ergtyp_2.");
					send=(check&&kickerAutoUpdater.showErgTypes[1][1]=="true")?true:send;
					title=check?kickerAutoUpdater.showErgTypes[1][0]+". "+title:title;
				}
				if(!check){ // Gelb-Rot schließt Rot aus!
					check=topaktuell?title.contains(kickerAutoUpdater.showErgTypes[2][0]):message.contains("ergtyp_3.");
					send=(check&&kickerAutoUpdater.showErgTypes[2][1]=="true")?true:send;
					title=check?kickerAutoUpdater.showErgTypes[2][0]+"! "+title:title;
				}
				if(!check){
					check=topaktuell?title.contains(kickerAutoUpdater.showErgTypes[3][0]):message.contains("ergtyp_4.");
					send=(check&&kickerAutoUpdater.showErgTypes[3][1]=="true")?true:send;
					title=check?kickerAutoUpdater.showErgTypes[3][0]+"! "+title:title;
				}
				if(!check){
					check=topaktuell?title.contains(kickerAutoUpdater.showErgTypes[4][0]):message.contains("ergtyp_5.");
					send=(check&&kickerAutoUpdater.showErgTypes[4][1]=="true")?true:send;
					title=check?kickerAutoUpdater.showErgTypes[4][0]+". "+title:title;
				}
				//alert("send="+send);
				if(send){
					try{
						sendMail(message,escape(title));
					}catch(e){}
				}
			}
			kickerAutoUpdater.recentUpdate=false;
		}
	}
}

/**********************************************************************/
/******************************* dom-tools ******************************/

/** get element by ID! */
elem=function(id) {
	if (document.getElementById) {
		return document.getElementById(id);
	} else if (window[id]) {
		return window[id];
	}
	return null;
}

String.prototype.contains = function(t) { return this.indexOf(t) >= 0 ? true : false }

/**********************************************************************/
/***************************** ajax-functions ****************************/

/************************** request Server time *************************/
function requestTime() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: serverURL+'getTime.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			serverTime=responseDetails.responseText;
		}
	});
}
/****************************** send eMail ******************************/
function sendMail(msg,title) {
	GM_xmlhttpRequest({
		method: 'POST',
		url: serverURL+'sendmail.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-Type':'application/x-www-form-urlencoded',
			'Accept': 'application/atom+xml,application/xml,text/xml'
		},
		data:'email='+document.getElementById('userEmailField').value+'&title='+title+'&css='+msgCSS+'&text='+msg+'&base='+msgBase,
		onload: function(responseDetails) {
			kickerAutoUpdater.alertMessage[0]="";
			kickerAutoUpdater.alertMessage[1]="";
			//alert(responseDetails.responseText);
		}
	});
}

// Copyright (C) 2008 Manuel F. <mf@find-the-flow.com>
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

var serverURL="http://ticker.e-dias.de/";
var scriptURL="http://userscripts.org/scripts/show/24000";
var updateString,requestObj;

function AutoUpdater(tickerID,tickerType,updateInterval,updateState,showErgTypes){
	this.tickerElems=new Array();
	this.prepareTickerElements();
	this.createTextTickerTable();
	this.updateInterval=updateInterval; 
	this.updateState=(updateState=="on"?true:false);
	this.baseURL="http://www.kicker.de";
	this.tickerURL="/";
	this.currVers="0.8.7";
	this.serverURL=serverURL;
	this.tickerID=tickerID;
	this.tickerType=tickerType;
	this.userEmail=GetCookie("userEmail");
	this.recentUpdate=false;
	this.alertMessage=new Array(["",""]);
	this.showErgTypesDefault=new Array(5);
	for(var i=0;i<showErgTypes.length;i++){
		this.showErgTypesDefault[i]=showErgTypes[i][1];
	}
	this.showErgTypes=showErgTypes;
	if(GetCookie("showErgTypes")&&this.userEmail){
		for(var i=0;i<this.showErgTypes.length;i++){
			this.showErgTypes[i][1]=GetCookie("showErgType"+(i+1))=="true"?"true":"false";
		}
	}
	this.ergTypeURL="http://mediadb.kicker.de/library/img/ergtyp_";
	this.ergTypeDataType=".gif";
	createUpdateSelector(this);
}

AutoUpdater.prototype.getLiveTickerUpdate=function()
{
	var url=this.baseURL+this.tickerURL;
	liveticker_sppID = this.tickerID;
	if(this.tickerType==1) {
		url += 'livematch_content/?object='+ this.tickerID +'&d='; //+ (Math.random()*100000);
	} else {
		url += 'livekonferenz_content/?object='+ this.tickerID +'&d='; //+ (Math.random()*100000);
	}try{
		this.requestUpdate(url);
	}catch (e){};
	if(updateString!=null){
		document.getElementById("updateFrame").contentDocument.body.innerHTML=updateString;
		this.updateLiveTicker();
	}
}

AutoUpdater.prototype.resetSettings=function(){
	this.userEmail='';
	var num=this.showErgTypes.length;
	var ergTypes=document.getElementById('ergTypes').getElementsByTagName('div');
	for(var i =0;i<num;i++){
		ergTypes[i].getElementsByTagName('input')[0].checked=this.showErgTypesDefault[i]=="true"?true:false;
		this.showErgTypes[i][1]=this.showErgTypesDefault[i];
	}
	SetCookie('userEmail','',0,'/');
	SetCookie('showErgTypes','',0,'/');
	SetCookie('showErgType1','',0,'/');
	SetCookie('showErgType2','',0,'/');
	SetCookie('showErgType3','',0,'/');
	SetCookie('showErgType4','',0,'/');
	SetCookie('showErgType5','',0,'/');
	document.getElementById("clearBtn").style.display='none';
	document.getElementById('userEmailField').value='';
	var emailField=document.getElementById('emailField');
	emailField.value=emailField.name;
	emailField.style.color='grey';	
	document.getElementById('alertCheckBox').click();
}

AutoUpdater.prototype.updateLiveTicker=function(){
	// START TEMP
	var tickerversion=document.getElementById("autoUpdaterElement").getAttribute("version");
	if(!tickerversion||tickerversion!=kickerAutoUpdater.currVers){
		var update=confirm("Es ist eine neue Version (Version "+kickerAutoUpdater.currVers+") des \nAutoUpdaters verfügbar. Wollen Sie jetzt updaten?");
		if(update){
			window.open("http://userscripts.org/scripts/show/24000");
		}
		document.getElementById("autoUpdaterElement").setAttribute("version",kickerAutoUpdater.currVers);
	}
	// END TEMP
	var updateElem=document.getElementById("updateFrame").contentDocument;
	if(updateElem.getElementById("livet")){
		var liveMatchUpdate=updateElem.getElementById("ltmatch");
		var liveKonfUpdate=updateElem.getElementById("ltkonf");
		if(liveKonfUpdate){
			liveKonfUpdate=liveKonfUpdate.getElementsByTagName("div")[0];
		}
		var liveTimeUpdate=updateElem.getElementById("lttime");
		var liveTableUpdate=updateElem.getElementById("lttab");
		var liveTickerUpdate=updateElem.getElementById("lttxtt").getElementsByTagName("div")[0];
		var liveNewsUpdate=updateElem.getElementById("lttopa");
		var liveMatch=document.getElementById("ltmatch");
		var liveKonf=document.getElementById("ltkonf");
		if(liveKonf){
			liveKonf=liveKonf.getElementsByTagName("div")[0];
		}
		var liveTime=document.getElementById("lttime");
		var liveTable=document.getElementById("lttab");
		var liveTicker=document.getElementById("lttxtt").getElementsByTagName("div")[0];
		var liveNews=document.getElementById("lttopa");
		/* specific nodes */
		if(this.tickerType==2){
			var liveSubst=document.getElementById("lteinw");
			var liveSubstUpdate=updateElem.getElementById("lteinw");
			var liveTeam=document.getElementById("ltaufst");
			var liveTeamUpdate=updateElem.getElementById("ltaufst");
			if(liveSubstUpdate){
				liveSubst.parentNode.replaceChild(liveSubstUpdate.cloneNode(true),liveSubst);
			}
			if(liveTeamUpdate){
				liveTeam.parentNode.replaceChild(liveTeamUpdate.cloneNode(true),liveTeam);
			}
		}else{
			if(liveTimeUpdate){
				liveTime.parentNode.replaceChild(liveTimeUpdate.cloneNode(true),liveTime);
			}
			if(liveMatchUpdate){
				liveMatch.parentNode.replaceChild(liveMatchUpdate.cloneNode(true),liveMatch);
			}
		}
		/* general nodes */
		if(liveKonfUpdate){
			liveKonf.parentNode.replaceChild(liveKonfUpdate.cloneNode(true),liveKonf);
		}
		if(liveTableUpdate){
			liveTable.parentNode.replaceChild(liveTableUpdate.cloneNode(true),liveTable);
		}
		if(liveTickerUpdate){
			//if(liveTicker.innerHTML.length!=liveTickerUpdate.innerHTML.length){
				//liveTicker.parentNode.replaceChild(liveTickerUpdate.cloneNode(true),liveTicker);
				if(liveTickerUpdate.getElementsByTagName("tbody")[0]){
					var newRows=liveTickerUpdate.getElementsByTagName("tr");
					var numOfNewElems=newRows.length-this.tickerElems.length;
					if(numOfNewElems>0){
						var tempStack=new Stack();
						for(var i=1;i<=numOfNewElems;i++){
							tempStack.push(newRows[i].cloneNode("true"));
							//alert(newRows[i].textContent);
						}
						while(!tempStack.isEmpty()){
							if(document.getElementById('alertState').value=='true'&&document.getElementById('userEmailField').value&&(this.tickerType!=1||!liveNewsUpdate)){
								var newResult=tempStack.peek();
								this.alertMessage[0]=escape('<div id="lttxtt"><table><tbody>'
									+newResult.innerHTML+'</tbody></table></div>');
								this.alertMessage[1]=newResult.getElementsByTagName("td")[2].childNodes[0].textContent+" - ";
								this.alertMessage[1]+=newResult.getElementsByTagName("td")[2].childNodes[2]?newResult.getElementsByTagName("td")[2].childNodes[2].textContent:"";
								if(liveMatchUpdate.getElementsByTagName("table")[0]){
									this.alertMessage[1]+=" ("+liveMatchUpdate.getElementsByTagName("table")[0].summary+")";
								}
								this.recentUpdate=true;
							}
							this.tickerElems.splice(1,0,tempStack.pop());
							tempStack.empty();
						}
						this.updateTextTickerTable();
					}
				}
			//}
		}
		if(liveNewsUpdate){
			if(liveNews.innerHTML.length!=liveNewsUpdate.innerHTML.length){
				liveNews.parentNode.replaceChild(liveNewsUpdate.cloneNode(true),liveNews);
				if(document.getElementById('alertState').value=='true'&&document.getElementById('userEmailField').value){
					var title=liveNewsUpdate.getElementsByTagName("th")[0].innerHTML.toHTML()+" - "
						+liveNewsUpdate.getElementsByTagName("td")[0].getElementsByTagName("div")[0].innerHTML;
					var punctuation=(title.contains("Gelbe Karte")||title.contains("Spielerwechsel"))?".":"!";
					this.alertMessage[0]=escape('<div id="lttopa">'+liveNewsUpdate.innerHTML+'</div>');
					this.alertMessage[1]=(title+punctuation).replace(/<br>/," - ");
					this.recentUpdate=true;
				}
			}
		}
		updateString="";
		return true;
	}else{
		updateString="";
		return false;
	}
}

/***************************** request Update ****************************/
AutoUpdater.prototype.requestUpdate=function(url) {
	if (window.XMLHttpRequest) {
		requestObj = new XMLHttpRequest();
		requestObj.onreadystatechange = this.updateCallback;
		requestObj.open("GET", url, true);
		requestObj.send(null);
	}
	return requestObj;
}

/**************************** set Update data ****************************/
AutoUpdater.prototype.updateCallback=function(){
	if(requestObj){
	    if (requestObj.readyState == 4)
	    {
		if (requestObj.status == 200)
		{
			updateString=requestObj.responseText;
		}
		else
		{
		    alert("Please check your connection and try again!");
		}
	    }
	}
}

/* add Elements that are not present before , yet may be updated during match*/
AutoUpdater.prototype.prepareTickerElements=function(){
	if(!document.getElementById("lttopa")){
		var topaktuell=document.createElement("div");
		topaktuell.setAttribute("id","lttopa");
		topaktuell.setAttribute("class","hidden");
		var nextSibling=document.getElementById("ltadv2");
		if(!nextSibling)nextSibling=document.getElementById("lttab");
		nextSibling.parentNode.insertBefore(topaktuell,nextSibling);
	}
	if(!document.getElementById("lttime")){
		var timeline=document.createElement("div");
		timeline.setAttribute("id","lttime");
		timeline.setAttribute("class","hidden");
		var nextSibling=document.getElementById("lttxtt");
		nextSibling.parentNode.insertBefore(timeline,nextSibling);
	}
}

AutoUpdater.prototype.createTextTickerTable=function(){
	if(document.getElementById("lttxtt").getElementsByTagName("table")[0]){
		tickerTable=document.getElementById("lttxtt").getElementsByTagName("table")[0];
		var tickerTableElems=tickerTable.getElementsByTagName("tr");
		for (var i=0;i<tickerTableElems.length;i++){
			this.tickerElems.push(tickerTableElems[i].cloneNode("true"));
		}
		tickerTable.innerHTML="";
		var myTicker=document.createElement("tbody");
		for(var i=0;i<this.tickerElems.length;i++){
			myTicker.appendChild(this.tickerElems[i]);
		}
		tickerTable.appendChild(myTicker);
	}
}
AutoUpdater.prototype.updateTextTickerTable=function(){
	tickerTableBody=document.getElementById("lttxtt").getElementsByTagName("tbody")[0];
	tickerTableBody.innerHTML="";
	for(var i=0;i<this.tickerElems.length;i++){
		if(i>0){
			i%2?this.tickerElems[i].setAttribute("class",""):this.tickerElems[i].setAttribute("class","con");
		}
		tickerTableBody.appendChild(this.tickerElems[i]);
	}
}

function createUpdateSelector(kickerAutoUpdater){
	var newFrame = document.createElement("iframe");
	newFrame.setAttribute("id", "updateFrame");
	newFrame.setAttribute("class", "hidden");
	document.body.appendChild(newFrame);
	var autoUpdaterElement=document.createElement("div");
	autoUpdaterElement.setAttribute("id","autoUpdaterElement");
	var updateSelector=document.createElement("div");
	updateSelector.setAttribute("id","updateSelector");
	var updateState=document.createElement("input");
	updateState.setAttribute("id","updateState");
	updateState.setAttribute("type","hidden");
	var check = document.createElement("input");
	check.setAttribute("type","checkBox");
	check.setAttribute("onclick","if(document.getElementById('updateState').value=='true'){this.checked=false;document.getElementById('reloadimg').style.display='block';document.getElementById('updateState').value='false';if(document.getElementById('lttopa'))document.getElementById('alertSelector').style.display='none'}else{this.checked=true;document.getElementById('reloadimg').style.display='none';document.getElementById('updateState').value='true';if(document.getElementById('lttopa'))document.getElementById('alertSelector').style.display='block'}");
	if(kickerAutoUpdater.updateState){
		check.checked=true;
		document.getElementById("reloadimg").style.display="none";
		updateState.setAttribute("value","true");
	}else{
		check.checked=false;
		document.getElementById("reloadimg").style.display="block";
		updateState.setAttribute("value","false");
	}
	var sp1 = document.createElement("span");
	sp1.setAttribute("id", "newSpan");
	var sp1_content = document.createTextNode(" auto-update");
	sp1.appendChild(sp1_content);
	autoUpdaterElement.appendChild(updateSelector);
	updateSelector.appendChild(check);
	updateSelector.appendChild(updateState);
	updateSelector.appendChild(sp1);
	document.getElementById("ltreload").style.top="20px";
	removeElem(document.getElementById("ltbtn"));
	var ticker=document.getElementById("ajaxliveticker");
	var parentDiv = ticker.parentNode;
	 // insert the new element into the DOM before sp2
	parentDiv.insertBefore(autoUpdaterElement, ticker);
	createAlertSelector(kickerAutoUpdater);
}
function createAlertSelector(kickerAutoUpdater){
	var alertSelector=document.createElement("div");
	alertSelector.setAttribute("id","alertSelector");
	var alertState=document.createElement("input");
	alertState.setAttribute("id","alertState");
	alertState.setAttribute("type","hidden");
	var check = document.createElement("input");
	check.setAttribute("type","checkBox");
	check.setAttribute("id","alertCheckBox");
	check.setAttribute("style","cursor:pointer");
	check.setAttribute("onclick","if(document.getElementById('alertState').value=='true'){this.checked=false;document.getElementById('alertState').value='false';document.getElementById('emailField').style.display='none';document.getElementById('alertSelector').style.color='';document.getElementById('ergTypes').style.display='none';document.getElementById('aboStr1').innerHTML=document.getElementById('aboStrTemp').innerHTML;}else{this.checked=true;document.getElementById('alertState').value='true';if(document.getElementById('userEmailField').value){document.getElementById('aboStr1').innerHTML=document.getElementById('aboStr2').innerHTML;var clearBtn=document.getElementById('clearBtn');document.getElementById('alertSelector').style.color='green';document.getElementById('ergTypes').style.display='';if(GetCookie('userEmail')){clearBtn.style.display='inline'}}else{document.getElementById('alertSelector').style.color='red';document.getElementById('emailField').style.display='inline';document.getElementById('aboStr1').innerHTML=document.getElementById('aboStrTemp').innerHTML;}}");
	alertState.setAttribute("style","display:none");
	alertState.setAttribute("value","false");
	var sp1 = document.createElement("span");
	sp1.setAttribute("id", "aboStr1");
	var sp2 = document.createElement("span");
	sp2.setAttribute("id", "aboStr2");
	sp2.setAttribute("class", "hidden");
	var sp3 = document.createElement("span");
	sp3.setAttribute("id", "aboStrTemp");
	sp3.setAttribute("class", "hidden");
	var userEmailField=document.createElement("input");
	userEmailField.setAttribute("id","userEmailField");
	userEmailField.setAttribute("type","hidden");
	userEmailField.setAttribute("value",kickerAutoUpdater.userEmail);
	document.body.appendChild(userEmailField);
	var emailField=document.createElement("input");
	emailField.setAttribute("id","emailField");
	emailField.setAttribute("type","text");
	emailField.setAttribute("style","cursor:text");
	if(kickerAutoUpdater.userEmail){
		check.setAttribute("title","eMail an "+kickerAutoUpdater.userEmail);
	}else{
		emailField.setAttribute("value","ihre eMail-Adresse");
	}
	emailField.setAttribute("name","ihre eMail-Adresse");
	emailField.setAttribute("onclick","if(!document.getElementById('userEmailField').value&&this.style.color!='black'){this.value='';this.style.color='black';this.style.cursor='text';}");
	emailField.setAttribute("onblur","this.style.color='grey';this.value=this.name;");
	emailField.setAttribute("onkeyup","this.emailAddress=this.value;document.getElementById('alertSelector').style.color=''");
	emailField.setAttribute("onkeydown","if(event.keyCode==13){setEmail=prompt('Bitte bestätigen Sie Ihre Adresse!');if(setEmail==this.emailAddress){document.getElementById('ergTypes').style.display='';document.getElementById('userEmailField').value=this.emailAddress;this.style.display='none';var alertState=document.getElementById('alertSelector');var saveBtn=document.getElementById('saveBtn');alertState.style.color='green';document.getElementById('aboStr1').innerHTML=document.getElementById('aboStr2').innerHTML;alertState.setAttribute('title',\"eMail an \"+this.emailAddress);saveBtn.style.display='inline';saveBtn.setAttribute('title',\"eMail Adresse \"+this.emailAddress+\" in Cookie speichern.\");}else{}}");
	if(kickerAutoUpdater.userEmail&&check.checked){
		emailField.style.display="none";
		sp1.setAttribute("style","color:green");
	}else if(!kickerAutoUpdater.userEmail&&check.checked){
		emailField.style.display="inline";
		sp1.setAttribute("style","color:red");
	}
	var sp1_content = document.createTextNode(" news-flash abonnieren");
	var sp2_content = document.createTextNode(" news-flash abonniert");
	sp1.appendChild(sp1_content);
	sp2.appendChild(sp2_content);
	sp3.appendChild(sp1_content.cloneNode(false));
	alertSelector.appendChild(check);
	alertSelector.appendChild(alertState);
	alertSelector.appendChild(sp1);
	alertSelector.appendChild(sp2);
	alertSelector.appendChild(sp3);
	alertSelector.appendChild(emailField);
	var saveBtn=document.createElement("img");
	saveBtn.setAttribute("id","saveBtn");
	saveBtn.setAttribute("src",serverURL+"save.gif");
	saveBtn.setAttribute("alt","eMail-Adresse speichern.");
	saveBtn.setAttribute("onclick","var userEmail=document.getElementById('userEmailField').value;var confStr=\"eMail Adresse \"+userEmail+\" in Cookie speichern?\"; var saveCookie=confirm(confStr);if(saveCookie){SetCookie('userEmail',userEmail,365,'/');this.style.display='none';document.getElementById('clearBtn').style.display='inline'}");
	alertSelector.appendChild(saveBtn);
	var clearBtn=document.createElement("img");
	clearBtn.setAttribute("id","clearBtn");
	clearBtn.setAttribute("src",serverURL+"trash.gif");
	clearBtn.setAttribute("alt","Einstellungen zurücksetzen");
	clearBtn.setAttribute("title","Einstellungen zurücksetzen");
	clearBtn.setAttribute("onclick","var confStr=\"Wollen Sie sämtliche Einstellungen zurücksetzen?\"; var clearCookies=confirm(confStr);if(clearCookies){window.kickerAutoUpdater.resetSettings()}");
	clearBtn.display="none";
	alertSelector.appendChild(clearBtn);
	var parentDiv = document.getElementById("autoUpdaterElement");
	parentDiv.insertBefore(alertSelector,parentDiv.firstChild);
	createErgTypeSelector(kickerAutoUpdater);
}
function createErgTypeSelector(kickerAutoUpdater){
	var num=kickerAutoUpdater.showErgTypes.length;
	var ergTypes=document.createElement("div");
	ergTypes.setAttribute("id","ergTypes");
	ergTypes.style.display="none";
	SetCookie('showErgTypes','true',365,'/');
	for(var i =0;i<num;i++){
		var ergTypeSelector=document.createElement("div");
		ergTypeSelector.setAttribute("class","ergTypeSelector");
		ergTypeSelector.setAttribute("id","showErgType"+(i+1));
		var ergTypeCheck=document.createElement("input");
		ergTypeCheck.setAttribute("type","checkBox");
		ergTypeCheck.checked=kickerAutoUpdater.showErgTypes[i][1]=="true"?true:false;
		if(GetCookie("showErgTypes")){
			SetCookie("showErgType"+(i+1),ergTypeCheck.checked,365,'/');
		}
		ergTypeCheck.setAttribute("onclick","SetCookie('showErgType"+(i+1)+"',this.checked,365,'/');window.kickerAutoUpdater.showErgTypes["+i+"][1]=this.checked.toString()");
		var ergTypeImg=document.createElement("img");
		var ergTypeSrc=kickerAutoUpdater.ergTypeURL+(i+1)+kickerAutoUpdater.ergTypeDataType;
		var ergTypeDescr=kickerAutoUpdater.showErgTypes[i][0];
		ergTypeImg.setAttribute("src",ergTypeSrc);
		ergTypeImg.setAttribute("alt",ergTypeDescr);
		ergTypeSelector.setAttribute("title",ergTypeDescr);
		ergTypeSelector.appendChild(ergTypeCheck);
		ergTypeSelector.appendChild(ergTypeImg);
		ergTypes.appendChild(ergTypeSelector);
	}
	document.getElementById("alertSelector").appendChild(ergTypes);
	createFooter();
}
function createFooter(){
	var updateFooter=document.createElement("div");
	updateFooter.setAttribute("id","updateFooter");
	updateFooter.setAttribute("class","center");
	var newlink = document.createElement("a");
	newlink.setAttribute("href",scriptURL);
	newlink.setAttribute("title","Weitere Infos auf userscripts.org");
	var linkText=document.createTextNode("www.kicker.de AutoUpdater");
	newlink.appendChild(linkText);
	var newmaillink = document.createElement("a");
	newmaillink.setAttribute("href","mailto:mf@find-the-flow.com");
	newmaillink.setAttribute("title","Fragen? Anregungen? Einfach Email an mich!");
	var maillinktext=document.createTextNode("mf.find-the-flow");
	var copy = document.createTextNode("  ©");
	var year = document.createTextNode(" (2008)");
	newmaillink.appendChild(maillinktext);
	updateFooter.appendChild(newlink);
	updateFooter.appendChild(copy);
	updateFooter.appendChild(newmaillink);
	updateFooter.appendChild(year);
	var parentDiv = document.getElementById("widescreen").childNodes[5];
	var referenceDiv = parentDiv.childNodes[2];
	parentDiv.insertBefore(updateFooter,referenceDiv);
}
/****************************
 * tools for all, required! */

/**
 * htmlEntities
 *
 * Convert all applicable characters to HTML entities
 *
 * object string
 * return string
 *
 * example:
 *   test = '???'
 *   test.htmlEntities() //returns '&auml;&ouml;&uuml;'
 */
String.prototype.toHTML = function()
{
  var chars = new Array ('&','à','á','â','ã','ä','å','æ','ç','è','é',
                         'ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô',
                         'õ','ö','ø','ù','ú','û','ü','ý','þ','ÿ','À',
                         'Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë',
                         'Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö',
                         'Ø','Ù','Ú','Û','Ü','Ý','Þ','','\"','ß','<',
                         '>','¢','£','¤','¥','¦','§','¨','©','ª','«',
                         '¬','­','®','¯','°','±','²','³','´','µ','¶',
                         '·','¸','¹','º','»','¼','½','¾');
  
  var entities = new Array ('amp','agrave','aacute','acirc','atilde','auml','aring',
                            'aelig','ccedil','egrave','eacute','ecirc','euml','igrave',
                            'iacute','icirc','iuml','eth','ntilde','ograve','oacute',
                            'ocirc','otilde','ouml','oslash','ugrave','uacute','ucirc',
                            'uuml','yacute','thorn','yuml','Agrave','Aacute','Acirc',
                            'Atilde','Auml','Aring','AElig','Ccedil','Egrave','Eacute',
                            'Ecirc','Euml','Igrave','Iacute','Icirc','Iuml','ETH','Ntilde',
                            'Ograve','Oacute','Ocirc','Otilde','Ouml','Oslash','Ugrave',
                            'Uacute','Ucirc','Uuml','Yacute','THORN','euro','quot','szlig',
                            'lt','gt','cent','pound','curren','yen','brvbar','sect','uml',
                            'copy','ordf','laquo','not','shy','reg','macr','deg','plusmn',
                            'sup2','sup3','acute','micro','para','middot','cedil','sup1',
                            'ordm','raquo','frac14','frac12','frac34');

  newString = this;
  for (var i = 0; i < chars.length; i++)
  {
    myRegExp = new RegExp();
    try {
    	myRegExp.compile(chars[i],'g');
    	newString = newString.replace (myRegExp, '&' + entities[i] + ';');
    } catch (err) {
    	// alert(err); 
    	/* Safari!!! */
    }
    
  }
  return newString;
}

/* JS-Stack implementation */
Stack=function(){
	this.elementData=new Array();
	this.elementCount=this.elementData.length;
}
Stack.prototype.push=function(obj){
	this.elementData.push(obj);
	this.elementCount++;
}
Stack.prototype.pop=function(){
	if (this.elementCount == 0)
		throw "The stack is empty!";
	var obj = this.elementData[--this.elementCount];
	// Set topmost element to null to assist the gc in cleanup.
	this.elementData[this.elementCount] = null;
	return obj;
}
Stack.prototype.peek=function(){
	if (this.elementCount == 0)
		throw "The stack is empty!";
	return this.elementData[this.elementCount-1];
}
Stack.prototype.isEmpty=function(){
	return this.elementCount==0;
}
Stack.prototype.empty=function(){
	this.elementData=new Array();
	this.elementCount=this.elementData.length;
}
Stack.prototype.search=function(obj){
	var i = this.elementCount;
	var pos=-1;
	while (--i >= 0){
		if (this.elementData[i]==obj)
			pos=(this.elementCount - i);
	}
	return pos;
}
Stack.prototype.contains=function(obj){
	var i = this.elementCount;
	var found=false;
	while (--i >= 0){
		if (this.elementData[i]==obj)
			found=true;
	}
	return found;
}

String.prototype.contains = function(t) { return this.indexOf(t) >= 0 ? true : false }

/* DOM Helper-functions */ 
/** get element by ID! */
elem=function(id) {
	if (document.getElementById) {
		return document.getElementById(id);
	} else if (window[id]) {
		return window[id];
	}
	return null;
}

removeElem=function(elem){
	if(elem)
		elem.parentNode.removeChild(elem);
	else throw "Element not found.";
}

function(elem){
	if(elem){
		elem.style.display="none";
		elem.style.visibility="hidden";
	}
	else throw "Element not found.";
}

switchStates=function(id,sw){
	var on, off;
	switch(sw){
		case enable:	on="enable";off="disable";break;
		case disable:	on="disable";off="enable";break;
		case on:		on="on";off="off";break;
		case off:		on="off";off="onn";break;
	}
	if(document.getElementById(id)){
		var layerNode=document.getElementById(id);
	}else{
		var layerNode=id;
	}
	var classNames;
	var classAtt=layerNode.getAttributeNode("class");
	if(classAtt==null){
		var newAtt=document.createAttribute("class");
		newAtt.nodeValue=on;
		layerNode.setAttributeNode(newAtt);
		classNames=on;
	}else if(classAtt.value==off){
		classNames=on;
	}else{
		var currClasses = classAtt.value.split(' ');
		for(var i=0;i<currClasses.length;i++){
			if(i==0){
				if(currClasses.length==1){
					classNames=currClasses[i]+" on";
				}else{
					classNames=currClasses[i];
				}
			}else{
				if(currClasses[i]==off){
					classNames=classNames+" on";
				}else{
					classNames=classNames+" "+currClasses[i];
				}
			}
			
		}
	}
	classAtt.value=classNames;
}

/* Cookie-related functions */
SetCookie=function(c_name,value,expiredays,path){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	( ( path ) ? ";path=" + path : "") +
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
};

GetCookie=function(c_name) {
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1; 
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}return "";
};
	
getElementStyle=function(elemID, IEStyleProp, CSSStyleProp) {
    var elem = document.getElementById(elemID);
    if (elem.currentStyle) {
        return elem.currentStyle[IEStyleProp];
    } else if (window.getComputedStyle) {
        var compStyle = window.getComputedStyle(elem, "");
        return compStyle.getPropertyValue(CSSStyleProp);
    }
    return "";
}

// Cross-browser implementation of element.addEventListener()
addListener=function(element, type, expression, bubbling)
{
	bubbling = bubbling || false;
	
	if(window.addEventListener)	{ // Standard
		element.addEventListener(type, expression, bubbling);
		return true;
	} else if(window.attachEvent) { // IE
		element.attachEvent('on' + type, expression);
		return true;
	} else return false;
}

window.addEventListener('load', function(event) {
	if(document.getElementById("livet")){
		// Grab a reference to the AutoUpdater object which was loaded by the AutoUpdater library earlier.
		//AutoUpdater = unsafeWindow['AutoUpdater'];
		var loc=window.location.toString();
		var firstChar=loc.lastIndexOf("object/")+7;
		var tickerID=loc.substr(firstChar,6);
		var tickerType=loc.indexOf("livematch")==-1?2:1;
		kickerAutoUpdater=new AutoUpdater(tickerID,tickerType,UPDATE_TIME_IN_SECONDS,DEFAULT_SETTING,SHOW_ERG_TYPES);
		unsafeWindow.kickerAutoUpdater=kickerAutoUpdater;
		document.getElementById("autoUpdaterElement").setAttribute("version",VERSION);
		initTicker();
	}
}, 'false');
window.addEventListener('unload', function(event) {
	if(document.getElementById("livet")){
		unsafeWindow.kickerAutoUpdater=null;
	}
}, 'false');