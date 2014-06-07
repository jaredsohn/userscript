// ==UserScript==
// @name           Omegle Improver
// @namespace      TheNamelessAccount
// @description    Adds some handy features to Omegle.
// @include        http://omegle.com/
// ==/UserScript==

// Omegle Events
function newChat(){
	templateBarIdle(false);
	setTimeout(function (){
		sendAutoMessages();
	},0)
}
function chatFinished(){
	templateBarIdle(true);
}
// Omegle Code
var blConnected=false;
function checkForMessage(){
	var divStatusLogs=document.getElementsByClassName("statuslog");
	for(var i=0;i<divStatusLogs.length;i++){
		if(divStatusLogs[i].innerHTML.toLowerCase().indexOf("disconnected")!=-1 || divStatusLogs[i].innerHTML.toLowerCase().indexOf("error")!=-1){
			if(blConnected){
				blConnected=false;
				chatFinished();
			}
			return;
		}
	}
	for(var i=0;i<divStatusLogs.length;i++){
		if(!blConnected && divStatusLogs[i].innerHTML.toLowerCase().indexOf("you're now chatting with a random stranger. say hi!")!=-1){
			blConnected=true;
			newChat();
			return;
		}
	}
}
function monitorLogBox(){
	document.addEventListener("DOMNodeInserted",checkForMessage,false);
}
// Script to Omegle
function sendAutoMessages(){
	for(var i=0;i<Templates.getLength();i++){
		var index=Templates.getRelativeIndex(i);
		var objTemplate=Templates.get(index);
		if(objTemplate.getAutoSend())
			sendMessage(objTemplate.getTemplate());
	}
}
function sendMessage(strMessage){
	var strUserMessage=document.getElementsByClassName("chatmsg")[0].value;
	document.getElementsByClassName("chatmsg")[0].value=strMessage;
	document.getElementsByClassName("sendbtn")[0].click();
	document.getElementsByClassName("chatmsg")[0].value=strUserMessage;
}
function appendMessage(strMessage){
	document.getElementsByClassName("chatmsg")[0].value+=strMessage;
	document.getElementsByClassName("chatmsg")[0].focus();
}
function runHotKey(evnt){
	var this_event=evnt;
	if(!this_event)
		this_event=event;
	for(var i=0;i<Templates.getLength();i++){
		var index=Templates.getRelativeIndex(i);
		var objTemplate=Templates.get(index);
		if(objTemplate.getHotKey()!=0 && objTemplate.getHotKey()==this_event.keyCode && objTemplate.getAltKey()==this_event.altKey && objTemplate.getCtrlKey()==this_event.ctrlKey && objTemplate.getShiftKey()==this_event.shiftKey)
			sendMessage(objTemplate.getTemplate());
	}
}
// Templates Stored in GM
var Templates={
	get: function (index){
		var strConfigString=GM_getValue(index, "");
		if(strConfigString=="")
			return null;
		return (new Template(strConfigString));
	},
	getRelativeIndex: function (index){
		var strList=GM_listValues();
		for(var i=0;i<strList.length; i++){
			strList[i]=parseInt(strList[i]);
		}
		return strList.sort()[index];
	},
	add: function (objTemplate){
		GM_setValue(Templates.getLength(), objTemplate.getConfigString());
	},
	set: function (index, objTemplate){
		GM_setValue(index, objTemplate.getConfigString());
	},
	remove: function (index){
		GM_deleteValue(index);
	},
	getLength: function (){
		return GM_listValues().length;
	}
};
var Template=function (strConfigString){
	this.getConfigString=function (){
		return strConfigString;
	};
	this.setAll=function (intHotKey, blAltKey, blCtrlKey, blShiftKey, blAutoSend, strTemplate){
		strConfigString=intHotKey+","+booleanToString(blAltKey)+","+booleanToString(blCtrlKey)+","+booleanToString(blShiftKey)+","+booleanToString(blAutoSend)+","+strTemplate; // could have used & instead of ,
	};
	var booleanToString=function (blValue){
		return (blValue)?"true":""; // this function could have been avoided.
	};
	this.getHotKey=function (){
		return parseInt(strConfigString.split(",")[0]);
	};
	this.setHotKey=function (intHotKey){
		this.setAll(intHotKey, this.getAltKey(), this.getCtrlKey(), this.getShiftKey(), this.getAutoSend(), this.getTemplate());
	};
	this.getAltKey=function (){
		var strAltKey=strConfigString.split(",")[1];
		return (strAltKey=="true");
	};
	this.setAltKey=function (blValue){
		this.setAll(this.getHotKey(), blValue, this.getCtrlKey(), this.getShiftKey(), this.getAutoSend(), this.getTemplate());
	};
	this.getCtrlKey=function (){
		var strCtrlKey=strConfigString.split(",")[2];
		return (strCtrlKey=="true");
	};
	this.setCtrlKey=function (blValue){
		this.setAll(this.getHotKey(), this.getAltKey(), blValue, this.getShiftKey(), this.getAutoSend(), this.getTemplate());
	};
	this.getShiftKey=function (){
		var strShiftKey=strConfigString.split(",")[3];
		return (strShiftKey=="true");
	};
	this.setShiftKey=function (blValue){
		this.setAll(this.getHotKey(), this.getAltKey(), this.getCtrlKey(), blValue, this.getAutoSend(), this.getTemplate());
	};
	this.getAutoSend=function (){
		var strAutoSend=strConfigString.split(",")[4];
		return (strAutoSend=="true");
	};
	this.setAutoSend=function (blValue){
		this.setAll(this.getHotKey(), this.getAltKey(), this.getCtrlKey(), this.getShiftKey(), blValue, this.getTemplate());
	};
	this.getTemplate=function (){
		var i,j;
		for(i=0, j=0;i<strConfigString.length && j<5;i++){
			if(strConfigString.charAt(i)==",")
				j++;
		}
		return strConfigString.substring(i);
	};
	this.setTemplate=function (strTemplate){
		this.setAll(this.getHotKey(), this.getAltKey(), this.getCtrlKey(), this.getShiftKey(), this.getAutoSend(), strTemplate);
	};
};
// Hotkey
var HotKey={
	h: new Array(),
	blInitialized: false,
	init: function (){
		if(HotKey.blInitialized)
			return;
		HotKey.blInitialized=true;
		HotKey.h[9]="Tab";
		HotKey.h[12]="FormFeed";
		HotKey.h[13]="Enter";
		HotKey.h[19]="Pause";
		HotKey.h[20]="CapsLock";
		HotKey.h[27]="Esc";
		HotKey.h[33]="PageUp";
		HotKey.h[34]="PageDn";
		HotKey.h[35]="End";
		HotKey.h[36]="Home";
		HotKey.h[37]="Left";
		HotKey.h[38]="Up";
		HotKey.h[39]="Right";
		HotKey.h[40]="Down";
		HotKey.h[45]="Insert";
		HotKey.h[46]="Delete";
		for(var i=0;i<10;i++)
			HotKey.h[48+i]=String.fromCharCode(48+i);
		for(var i=0;i<26;i++)
			HotKey.h[65+i]=String.fromCharCode(65+i);
		HotKey.h[91]="Windows";
		HotKey.h[93]="ShortcutKey";
		for(var i=0;i<10;i++)
			HotKey.h[96+i]="Num"+i;
		HotKey.h[106]="Num*";
		HotKey.h[107]="Num+";
		HotKey.h[109]="Num-";
		HotKey.h[110]="Num.";
		HotKey.h[111]="Num/";
		for(var i=1;i<12;i++)
			HotKey.h[111+i]="F"+i;
		HotKey.h[144]="NumLock";
		HotKey.h[145]="ScrollLock";
		HotKey.h[186]=";";
		HotKey.h[187]="=";
		HotKey.h[188]=",";
		HotKey.h[189]="-";
		HotKey.h[190]=".";
		HotKey.h[191]="/";
		HotKey.h[192]="~";
		HotKey.h[219]="[";
		HotKey.h[220]="\\";
		HotKey.h[221]="]";
		HotKey.h[222]="'";
	},
	keyToString:function (intKey){
		if(!HotKey.blInitialized)
			HotKey.init();
		if(HotKey.h[intKey])
			return HotKey.h[intKey];
		return null;
	},
	stringToKey: function (strKey){
		if(!HotKey.blInitialized)
			HotKey.init();
		for(var i=0;i<HotKey.h.length;i++){
			if(HotKey.h[i] && HotKey.h[i].toLowerCase()==strKey.toLowerCase())
				return i;
		}
		return 0;
	},
	getMainKey:function (strHotKey){
		if(strHotKey.toLowerCase().indexOf("num+")!=-1)
			return "Num+";
		strHotKey=strHotKey.replace(/\+/g," ").split(" ");
		if(strHotKey.length>0)
			return strHotKey[strHotKey.length-1];
		return "";
	},
	getCtrlKey:function (strHotKey){
		return (strHotKey.toLowerCase().indexOf("ctrl")!=-1);
	},
	getAltKey:function (strHotKey){
		return (strHotKey.toLowerCase().indexOf("alt")!=-1);
	},
	getShiftKey:function (strHotKey){
		return (strHotKey.toLowerCase().indexOf("shift")!=-1);
	}
};
// GUI Config
function hideConfig(){
	var divOptions=document.getElementById("templates-options");
	if(divOptions)
		divOptions.style.display="";
	removeTemplateBar();
	
	addTemplateBar();
}
function showConfig(){
	var divOptions=document.getElementById("templates-options");
	if(!divOptions){
		var divOptions=document.createElement("div");
		divOptions.id="templates-options";
		divOptions.innerHTML=""+
			"<h3>Omegle - Templates and Auto Messages</h3>"+
			"<small>Script author: iampradip</small>"+
			"<input type=button value=X id=to-close-button />"+
			"<br/>"+
			"<br/>"+
			"<table width=100%>"+
				"<tbody>"+
					"<tr>"+
						"<td valign=top width=30%>"+
							"Templates:"+
							"<br/>"+
							"<br/>"+
							"<select id=to-templates-list size=20></select>"+
						"</td>"+
						"<td valign=top>"+
							"<div id=to-edit-template-container>"+
								"Edit Template: "+
								"<br/>"+
								"<br/>"+
								"<textarea rows=5 cols=20 id=to-template style=\"width:100%;height:122px;\"></textarea>"+
								"<br/>"+
								"<br/>"+
								"Hotkey: "+
								"<br/>"+
								"<br/>"+
								"<input type=text id=to-hotkey style=\"width:100%\" title=\"Allowed keys: 0..9, A..Z, Num0..Num9, F1..F12, Tab, FormFeed, Enter, Pause, CapsLock, Esc, PageUp, PageDn, End, Home, Left, Up, Right, Down, Insert, Delete, Windows, ShortcutKey, NumLock, ScrollLock, Num+, Num-, Num*, Num/, Num., ;, =, ,, -, ., /, ~, [, \\, ] and '\">"+
								"<br/>"+
								"<small title=\"Allowed keys: 0..9, A..Z, Num0..Num9, F1..F12, Tab, FormFeed, Enter, Pause, CapsLock, Esc, PageUp, PageDn, End, Home, Left, Up, Right, Down, Insert, Delete, Windows, ShortcutKey, NumLock, ScrollLock, Num+, Num-, Num*, Num/, Num., ;, =, ,, -, ., /, ~, [, \\, ] and '\">"+
									"You may use Hotkey with Ctrl, Shift and/or Alt. Use white space and/or plus character to separate keys. e.g. F3, Shift F4, Ctrl+Shift+1, Alt+Num9, etc. Some key combinations may not work, e.g. Ctrl+Alt+Delete. Hover to see allowed keys."+
								"</small>"+
								"<br/>"+
								"<br/>"+
								"<input type=checkbox id=to-autosend /><label for=to-autosend>Auto send on connecting to new stranger.</label>"+
								"<br/>"+
								"<br/>"+
								"<button class=omegle-button id=ta-save-template style=\"width:15em\"/>Save Template</button>"+
								" "+
								"<button class=omegle-button id=ta-delete-template style=\"width:15em\"/>Delete Template</button>"+
							"</div>"+
						"</td>"+
					"</tr>"+
					"<tr>"+
						"<td width=30%>"+
							"<button id=to-add-new-template class=omegle-button style=\"width:100%\">"+
								"Add New Template"+
							"</button>"+
						"</td>"+
						"<td/>"+
					"</tr>"+
				"</tbody>"+
			"</table>"+
			"<br/>"+
			"";
		document.body.appendChild(divOptions);
		
		var iOptionsCloseButton=document.getElementById("to-close-button");
		iOptionsCloseButton.addEventListener("click",hideConfig,false);
		
		var selTemplatesList=document.getElementById("to-templates-list");
		selTemplatesList.addEventListener("change",editTemplate,false);
		
		var btnAddNew=document.getElementById("to-add-new-template");
		btnAddNew.addEventListener("click",addNewTemplate,false);
		
		var iHotKey=document.getElementById("to-hotkey");
		iHotKey.addEventListener("focus",enterTextWithPrompt,false);
		iHotKey.addEventListener("change",validateHotKey,false); // not necessary for robots, only for humans
		
		var taTemplate=document.getElementById("to-template");
		taTemplate.addEventListener("focus",enterTextWithPrompt,false);
		
		var btnSave=document.getElementById("ta-save-template");
		btnSave.addEventListener("click",saveTemplate,false);
		
		var btnDelete=document.getElementById("ta-delete-template");
		btnDelete.addEventListener("click",deleteTemplate,false);
	}
	refreshConfigTemplatesList();
	divOptions.style.display="block";
}
function deleteTemplate(){
	var taEditTemplate=document.getElementById("to-template");
	taEditTemplate.value="";
	saveTemplate();
}
function saveTemplate(){
	var selTemplatesList=document.getElementById("to-templates-list");
	if(selTemplatesList.options.selectedIndex==-1 || selTemplatesList.options.length==0 && selTemplatesList.value!="")
		return;
	var taEditTemplate=document.getElementById("to-template");
	var iHotKey=document.getElementById("to-hotkey");
	var iAutoSend=document.getElementById("to-autosend");
	if(taEditTemplate.value.length==0){
		Templates.remove(selTemplatesList.value);
		refreshConfigTemplatesList();
		return;
	}	
	var objTemplate=Templates.get(selTemplatesList.value);
	if(!objTemplate){
		return;
	}
	objTemplate.setHotKey(HotKey.stringToKey(HotKey.getMainKey(iHotKey.value)));
	objTemplate.setCtrlKey(HotKey.getCtrlKey(iHotKey.value));
	objTemplate.setAltKey(HotKey.getAltKey(iHotKey.value));
	objTemplate.setShiftKey(HotKey.getShiftKey(iHotKey.value));
	objTemplate.setAutoSend(iAutoSend.checked);
	objTemplate.setTemplate(taEditTemplate.value);
	Templates.set(selTemplatesList.value,objTemplate);
	refreshConfigTemplatesList();
}
function validateHotKey(){
	var iHotKey=document.getElementById("to-hotkey");
	if(!iHotKey)
		return;
	var intHotKey=HotKey.stringToKey(HotKey.getMainKey(iHotKey.value));
	var blCtrlKey=HotKey.getCtrlKey(iHotKey.value);
	var blAltKey=HotKey.getAltKey(iHotKey.value);
	var blShiftKey=HotKey.getShiftKey(iHotKey.value);
	var strTargetValue="";
	if(intHotKey!=0){
		if(blCtrlKey)
			strTargetValue+="Ctrl + ";
		if(blShiftKey)
			strTargetValue+="Shift + ";
		if(blAltKey)
			strTargetValue+="Alt + ";
		strTargetValue+=HotKey.keyToString(intHotKey);
	}
	if(strTargetValue!=iHotKey.value)
		iHotKey.value=strTargetValue;
}
function editTemplate(){
	var selTemplatesList=document.getElementById("to-templates-list");
	var divEditTemplateContainer=document.getElementById("to-edit-template-container");
	var taEditTemplate=document.getElementById("to-template");
	var iHotKey=document.getElementById("to-hotkey");
	var iAutoSend=document.getElementById("to-autosend");
	if(!divEditTemplateContainer)
		return;
	divEditTemplateContainer.style.display=(!selTemplatesList || selTemplatesList.options.length==0 || selTemplatesList.options.selectedIndex==-1 || selTemplatesList.value.length==0)?"none":"block";
	if(divEditTemplateContainer.style.display=="none")
		return;
	var objTemplate=Templates.get(selTemplatesList.value);
	taEditTemplate.value=objTemplate.getTemplate();
	iHotKey.value="";
	if(objTemplate.getHotKey()!=0){
		if(objTemplate.getCtrlKey())
			iHotKey.value+="Ctrl + ";
		if(objTemplate.getShiftKey())
			iHotKey.value+="Shift + ";
		if(objTemplate.getAltKey())
			iHotKey.value+="Alt + ";
		iHotKey.value+=HotKey.keyToString(objTemplate.getHotKey());
	}
	iAutoSend.checked=objTemplate.getAutoSend();
}
function addNewTemplate(){
	var objNewTemp=new Template("");
	objNewTemp.setAll(0,false,false,false,false,"New Template");
	Templates.add(objNewTemp);
	refreshConfigTemplatesList();
}
function refreshConfigTemplatesList(){
	var selTemplatesList=document.getElementById("to-templates-list");
	var intIndex=selTemplatesList.options.selectedIndex;
	while(selTemplatesList.options.length>0)
		selTemplatesList.options.remove(0);
	for(var i=0;i<Templates.getLength();i++){
		var index=Templates.getRelativeIndex(i);
		var option1=document.createElement("option");
		option1.value=index;
		var strTemplate=Templates.get(index).getTemplate();
		if(strTemplate.length>20)
			strTemplate=strTemplate.substr(0,17)+"...";
		option1.text=strTemplate;
		selTemplatesList.appendChild(option1);
	}
	editTemplate();
}
function enterTextWithPrompt(){
	var blEditPromptless=!blConnected;
	if(blEditPromptless)
		return;
	var strValue=this.value;
	while(strValue.indexOf("\n")!=-1)
		strValue=strValue.replace("\n","#NEWLINE#");
	var x=prompt('Enter text:\nUse #NEWLINE# for new line.',strValue);
	if(x!=null){
		this.value=x.replace(/#NEWLINE#/g,"\n");
	}
	this.blur();
}
// Template Bar & Other code
function templateBarIdle(blIdle){
	var templateBar=document.getElementById("template-bar");
	if(templateBar){
		templateBar.className=blIdle?"idle":"";
		for(var i=0;i<templateBar.childNodes.length;i++){
			if(templateBar.childNodes[i].nodeName){
				switch(templateBar.childNodes[i].nodeName.toUpperCase()){
					case "BUTTON":
					case "INPUT":
					case "SELECT":
						if(!templateBar.childNodes[i].getAttribute("disableddisabled"))
							templateBar.childNodes[i].disabled=blIdle;
						break;
				}
			}
		}
	}
}
function checkTemplateBar(){
	var chatbox=document.getElementsByClassName("chatbox");
	var controlWrapper=document.getElementsByClassName("controlwrapper");
	if(chatbox.length==0 || controlWrapper.length==0){
		return;
	}
	var templateBar=document.getElementById("template-bar");
	if(!templateBar){
		setTimeout(function (){
			addTemplateBar();
		},0);
	}
}
function addTemplateBar(){
	var chatbox=document.getElementsByClassName("chatbox");
	var controlWrapper=document.getElementsByClassName("controlwrapper");
	if(chatbox.length==0 || controlWrapper.length==0){
		return;
	}
	var templateBar=document.getElementById("template-bar");
	if(templateBar)
		return;
	controlWrapper=controlWrapper[0];
	templateBar=document.createElement("div");
	templateBar.id="template-bar";
	var strHTML="Templates: "+
			"<select id=tb-templates-list class=tb-templates-list>"+
				"<option value=-1>Select</option>";
	for(var i=0;i<Templates.getLength();i++){
		var index=Templates.getRelativeIndex(i);
		strHTML+="<option value="+index+">";
		var strTemplate=Templates.get(index).getTemplate();
		if(strTemplate.length>50)
			strTemplate=strTemplate.substr(0,47)+"...";
		strHTML+=strTemplate;
		strHTML+="</option>";
	}
	strHTML+="</select>";
	strHTML+=" <input type=checkbox checked=\"checked\" id=tb-send-on-select><label for=tb-send-on-select title=\"Send directly without adding to my message\">Send on select</label>";
	strHTML+=" <button id=tb-edit-templates class=omegle-button disableddisabled=\"disabled\"><small>Edit Templates</small></button>";
	templateBar.innerHTML=strHTML;
	controlWrapper.parentNode.insertBefore(templateBar,controlWrapper);
	
	var selTemplatesList=document.getElementById("tb-templates-list");
	selTemplatesList.addEventListener("change", addTemplateToMessage, false);
	
	var btnEditTemplates=document.getElementById("tb-edit-templates");
	btnEditTemplates.addEventListener("click", showConfig, false);
	
	templateBarIdle(!blConnected);
}
function removeTemplateBar(){
	var templateBar=document.getElementById("template-bar");
	if(templateBar){
		templateBar.parentNode.removeChild(templateBar);
	}
}
function addTemplateToMessage(){
	var selTemplatesList=document.getElementById("tb-templates-list");
	var blSendNow=document.getElementById("tb-send-on-select").checked;
	if(selTemplatesList.options.selectedIndex<=0)
		return;
	var strTemplate=Templates.get(selTemplatesList.value).getTemplate();
	selTemplatesList.options.selectedIndex=0;
	if(blSendNow)
		sendMessage(strTemplate);
	else
		appendMessage(strTemplate);
}
function monitorInterface(){
	document.addEventListener("DOMNodeInserted",checkTemplateBar,false);
}
function monitorKeyEvents(){
	document.addEventListener("keydown",runHotKey,false);
}
function addCSS(css){
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
// let's start
function init(){
	addCSS("\
		#template-bar{position:absolute;left:1em;bottom:6.5em;right:1em;height:1em;font-family:sans-serif}\
		.tb-templates-list{height:100%;font-family:sans-serif}\
		#tb-edit-templates{position:absolute;right:0}\
		.omegle-button{border:1px solid grey !important;font-family:sans-serif;font-size:1em;background:white;width:7em;height:1.3em}\
		#template-bar.idle{margin-right:176px}\
		.logwrapper{bottom:8em !important}\
		#templates-options{position:fixed;top:1em;right:2em;left:2em;opacity:0.85;background:#303030;border-radius:10px;color:white;z-index:6;display:none;font-family:sans-serif;padding:10px 20px 20px 30px}\
		#templates-options td{padding:0px 20px}\
		#to-close-button{position:absolute;right:10px;top:10px;width:20px;text-align:center;height:18px;border:0px;}\
		#to-edit-template-container{display:none}\
		#to-templates-list{width:100%}\
	");
	monitorLogBox();
	monitorInterface();
	monitorKeyEvents();
}

init();