// ==UserScript==
// @name           Castle Age Autoplayer
// @namespace      zynga
// @description    Auto player for zynga's castle age game
// @version        108.63
// @include        http*://apps.*facebook.com/castle_age/*
// @include        http://www.facebook.com/common/error.html
// ==/UserScript==
// about:config
// dom.allow_scripts_to_close_windows

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	 GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
	
	if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
}

if(!GM_log) {
	GM_log=console.debug;
}

var thisVersion = 108.58;
var debug=false;

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

/////////////////////////////////////////////////////////////////////
//							HTML TOOLS
// this object contains general methods for wading through the DOM and dealing with HTML
/////////////////////////////////////////////////////////////////////
var nHtml={
FindByAttrContains:function(obj,tag,attr,className) {
	if(attr=="className") { attr="class"; }
	className=className.toLowerCase();
	var q=document.evaluate(".//"+tag+
		"[contains(translate(@"+attr+",'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"+className+
		"')]",obj,null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByAttrXPath:function(obj,tag,className) {
	var q=null;
	try {
		var xpath=".//"+tag+"["+className+"]";
		if(obj==null) {
			GM_log('Trying to find xpath with null obj:'+xpath);
			return null;
		}
		q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		GM_log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByAttr:function(obj,tag,attr,className) {
	if(className.exec==undefined) {
		if(attr=="className") { attr="class"; }
		var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
		return null;
	}
	var divs=obj.getElementsByTagName(tag);
	for(var d=0; d<divs.length; d++) {
		var div=divs[d];
		if(className.exec!=undefined) {
			if(className.exec(div[attr])) {
				return div;
			}
		} else if(div[attr]==className) {
			return div;
		}
	}
	return null;
},
FindByClassName:function(obj,tag,className) {
	return this.FindByAttr(obj,tag,"className",className);
},
VisitUrl:function(url) {
	this.setTimeout(function() {
		if(url.indexOf("violations.php")>=0) {
			GM_log("Huh? we clicked on the voilations url:"+url);
			return;
		}

		document.location.href=url;
	},1000+Math.floor(Math.random()*1000));
},

Click2:function(obj,evtName) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
ClickNoWait:function(obj) {
//	this.Click2(obj,"mousedown");
//	this.Click2(obj,"mouseup");
	this.Click2(obj,"click");
},
Click:function(obj) {
	this.setTimeout(function() {
		nHtml.ClickNoWait(obj);
	},1000+Math.floor(Math.random()*1000));
},
spaceTags:{
	'td':1,
	'br':1,
	'hr':1,
	'span':1,
	'table':1
},
GetText:function(obj) {
	var txt=' ';
	if(obj.tagName!=undefined && this.spaceTags[obj.tagName.toLowerCase()]) {
		txt+=" ";
	}
	if(obj.nodeName=="#text") { return txt+obj.textContent; }
	for(var o=0; o<obj.childNodes.length; o++) {
		var child=obj.childNodes[o];
		txt+=this.GetText(child);
	}
	return txt;
},

htmlRe:new RegExp('<[^>]+>','g'),
StripHtml:function(html) {
	return html.replace(this.htmlRe,'').replace(/&nbsp;/g,'');
},

timeouts:{},
setTimeout:function(func,millis) {
	var t=window.setTimeout(function() {
		func();
		nHtml.timeouts[t]=undefined;
	},millis);
	this.timeouts[t]=1;
},
clearTimeouts:function() {
	for(var t in this.timeouts) {
		window.clearTimeout(t);
	}
	this.timeouts={};
}

};

/////////////////////////////////////////////////////////////////////
//							GM OBJECT
// this object is used for setting/getting GM specific functions.
/////////////////////////////////////////////////////////////////////
GM={
	// use to log stuff
	Log:function(mess) {
		GM_log(mess);
	},
	Debug:function(mess) {
		if(debug) { GM.Log(mess); }
	},
	// use these to set/get values in a way that prepends the game's name
	SetValue:function(n,v) {
		GM.Debug('Set ' + n + ' to ' + v);
		return GM_setValue(Zynga.GameName()+"__"+n,v);
	},
	GetValue:function(n,v) {
		GM.Debug('Get ' +n + ' value ' + GM_getValue(Zynga.GameName()+"__"+n,v));
		return GM_getValue(Zynga.GameName()+"__"+n,v);
	},
	IsArray:function(testObject) {
	    return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
	},
	SetList:function(n,v) {
		if (GM.IsArray(v)) {
			return GM_setValue(Zynga.GameName()+"__"+n,v.join('~'));
		}
		return GM_setValue(Zynga.GameName()+"__"+n,v);
	},
	GetList:function(n,v) {
		list = GM_getValue(Zynga.GameName()+"__"+n,v)
		if (!list) return list;
		list = list.split('~');
		if (!GM.IsArray(list)) list[0] = list
		return list;
	},
	ListAddBefore:function(listName,addList) {
		newList = GM.GetList(listName,'')
		if (!newList) {
			newList = addList;
		} else newList = addList.concat(newList);
		GM.SetList(listName,newList);
		return newList;
	},
	ListPop:function(listName) {
		list = GM.GetList(listName,'')
		if (!list) return '';
		popItem = list.pop();
		GM.SetList(listName,list);
		return popItem;
	},
	ListPush:function(listName,pushItem) {
		list = GM.GetList(listName,'')
		if (list) list.push(pushItem);
		else list = pushItem;
		GM.SetList(listName,list);
		return list;
	},

}

/////////////////////////////////////////////////////////////////////
//							ZYNGA OBJECT
// this is the main object for the game, containing all methods, globals, etc.
/////////////////////////////////////////////////////////////////////
Zynga={
	stats:{},
	autoQuest:{},
	lastReload:new Date(),
	autoReloadMilliSecs:15*60*1000,
	
	userRe:new RegExp("(userId=|user=|/profile/|uid=)([0-9]+)"),
	levelRe:new RegExp('Level\\s*:\\s*([0-9]+)','i'),
	statusRe:new RegExp('([0-9\\.]+)\\s*/\\s*([0-9]+)','i'),
	htmlJunkRe:new RegExp("\\&[^;]+;","g"),
	energyRe:new RegExp("([0-9]+)\\s+(energy)","i"),
	gameNameRe:new RegExp("^/([^/]+)/"),
	experienceRe:new RegExp("\\+([0-9]+)"),
	influenceRe:new RegExp("([0-9]+)%"),
	moneyRe:new RegExp("\\$([0-9,]+)\\s*-\\s*\\$([0-9,]+)","i"),
	firstNumberRe:new RegExp("([0-9]+)"),
	gameName:null,
	
	GameName:function() {
		return 'castle_age';
	},

	/////////////////////////////////////////////////////////////////////
	// UTILITY FUNCTIONS
	/////////////////////////////////////////////////////////////////////
	GetCurrentGeneral:function() {
		var webSlice = nHtml.FindByAttrContains(document.body,"div","class",'general_name_div3');
		if (!webSlice) {
			GM.Log("Couldn't find current general div");
			return false;
		}
		return webSlice.innerHTML.trim().toLowerCase().replace(/\*+/g,'')
	},
	
	GetGeneralImage:function(general){
		switch(general){
			case 'crom':							return 'crom.jpg';
			case 'mephistopheles':		return 'quest_mephisto.jpg';
			case 'sylvanas':					return 'darkelf_boss_200.jpg';
			case 'stone guardian':		return 'stonegiant_200.jpg';
			case 'orc king':					return 'orc_boss.jpg';
			case 'lotus ravenmoore':	return 'boss_lotus.jpg';
			case 'skaar deathrune':		return 'boss_skaar.jpg';
			case 'keira':							return 'boss_keira_framed.jpg';
			case 'malekus':	 					return 'boss_malekus.jpg';
			case 'ambrosia':					return 'boss_ambrosia.jpg';
			case 'lothar the ranger':	return 'hero_lothar.jpg';
			case 'memnon':						return 'hero_wizard.jpg';
			case 'helena':						return 'hero_twinfire.jpg';
			case 'marina':						return 'hero_twinwater.jpg';
			case 'chimerus':					return 'hero_demon.jpg';
			case 'tifanna':						return 'hero_huntress.jpg';
			case 'serra silverlight':	return 'hero_angel.jpg';
			case 'golden fang':				return 'hero_wolf.jpg';
			case 'elizabeth lione':		return 'hero_elizabeth.jpg';
			case 'leon ironhart':			return 'hero_leon.jpg';
			case 'lilith and riku':		return 'hero_riku.jpg';
			default: return 'hero_' + general + '.jpg'
		}
	},
	
	SelectGeneral:function(whichGeneral) {
		if (!(general = GM.GetValue(whichGeneral,''))) return false;
		if (!general || (general.match(/use current/i))) return false;
	
		general = general.toLowerCase();
		currentGeneral = this.GetCurrentGeneral()
	
		if(general.indexOf(currentGeneral) >= 0)
			return false;
	
		GM.Log('Changing from ' + currentGeneral + ' to ' + general);
	
		if (this.CheckForImage('tab_generals_on.gif')) {
			generalImage = this.GetGeneralImage(general)
			if (this.CheckForImage(generalImage)) {
				return this.NavigateTo(generalImage);
			} else {
				this.SetDivContent('Could not find ' + general);
				GM.Log('Could not find ' + generalImage);
				GM.SetValue(whichGeneral,'Use Current');
				this.SetControls(true);
				return false;
			}
		} else {
			return this.NavigateTo('keep,mercenary,generals');
		}
	},
	
	NavigateTo:function(pathToPage,imageOnPage) {
		var content = document.getElementById('content');
		if (!content)
			return false;
			
		if (imageOnPage && this.CheckForImage(imageOnPage)) 
			return false;
	
		var pathList = pathToPage.split(",");
		var pageLink, input;
		for(var s=pathList.length-1 ; s>=0 ; s-- ) {
			pageLink = nHtml.FindByAttrXPath(content,'a',"contains(@href,'/" + pathList[s] + ".php') and not(contains(@href,'" + pathList[s] + ".php?'))");
			
			if (pageLink) {
				GM.Log('Go to ' + pathList[s]);
				Zynga.Click(pageLink);
				return true;
			}
			
			input = nHtml.FindByAttrContains(document.body,"input","src", pathList[s] );
			if (input) {
				GM.Log('Click on image ' + input.src.match(/[a-zA-Z._]+$/));
				Zynga.Click(input);
				return true;
			}
			input = nHtml.FindByAttrContains(document.body,"img","src", pathList[s] );
			if (input) {
				GM.Log('Click on image ' + input.src.match(/[a-zA-Z._]+$/));
				Zynga.Click(input);
				return true;
			}
		}
		return false;
	},
	
 	CheckForImage:function(image, webSlice) {
		if (!webSlice)
			webSlice = document.body;

		if (imageSlice = nHtml.FindByAttrContains(webSlice,'input','src',image))
			return imageSlice;
		if (imageSlice = nHtml.FindByAttrContains(webSlice,'img','src',image))
			return imageSlice;
		if (imageSlice = nHtml.FindByAttrContains(webSlice,'div','style',image))
			return imageSlice;
	
		return false;
	},
	
	WhileSinceDidIt:function(name, seconds) {
		var now = (new Date().getTime());
		return (!GM.GetValue(name) || (parseInt(GM.GetValue(name)) < (now-1000*seconds)));
	},
	
	JustDidIt:function(name) {
		var now = (new Date().getTime());
		GM.SetValue(name, now.toString());
	},
	
	CheckTimer:function(name) {
		nameTimer = GM.GetValue(name)
		if (!nameTimer) return true;
		var now = new Date().getTime();
		return (nameTimer < now);
	},
	
	FormatTime:function(time) {
		return time.toDateString().match(/^\w+ /) + time.toLocaleTimeString().replace(/:\d+ /i,' ').replace(/:\d+$/i,'')
	},
	
	DisplayTimer:function(name) {
		nameTimer = GM.GetValue(name);
		if (!nameTimer) return false;
		var newTime = new Date();
		newTime.setTime(parseInt(nameTimer));
		return this.FormatTime(newTime);
	},
	
	SetTimer:function(name, time) {
		var now = (new Date().getTime());
		now += time*1000
		GM.SetValue(name, now.toString());
	},
	
	VisitUrl:function(href, watiMSec) {
		if ( watiMSec && watiMSec > 0 )
			this.waitMilliSecs = watiMSec;
		else
			this.waitMilliSecs=7000;
		nHtml.VisitUrl(href);
	},
	
	Click:function(button, waitTime) {
		if ( waitTime && waitTime > 0 )
			this.waitMilliSecs = waitTime;
		else
			this.waitMilliSecs = 7000;
		nHtml.Click(button);
	},
	
	CheckLastAction:function(thisAction) {
		this.SetDivContent('activity_mess','Current activity: ' + thisAction);
		lastAction = GM.GetValue('LastAction','none')
		if (lastAction!=thisAction) {
			GM.Log('Changed from doing ' + lastAction + ' to ' + thisAction);
			GM.SetValue('LastAction',thisAction);
		}
	},
	
	NumberOnly:function(num) {
		var numOnly=parseFloat(num.replace(/[^0-9\.]/g,""));
		return numOnly;
	},
	
	RemoveHtmlJunk:function(html) {
		return html.replace(this.htmlJunkRe,'');
	},
	
	ForceSetEngReq:function(req) {
		this.SetDivContent('quest_mess','Waiting for eng: ?/' + req);
	},

	ForceSetStaReq:function(req) {
		this.SetDivContent('fight_mess','Waiting for sta: ?/' + req);
	},
	
	ForceChangePlayer:function(req) {
		this.ForceSetStaReq(9999);
		this.ForceSetEngReq(9999);
	},	

	/////////////////////////////////////////////////////////////////////
	// DISPLAY FUNCTIONS
	/////////////////////////////////////////////////////////////////////
	SetupDivs:function() {
		if(document.getElementById('AutoZynga_div')) {
			return false;
		}
		var div=document.createElement('div');
		var b=nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_Container clearfix');
		
		div.id='AutoZynga_div';
		div.style.top='100px';
		div.style.left='940px';
		div.style.width='180px';
		
		div.style.padding='9px';
		div.style.border='2px solid #444';
		div.style.background='#fff';
		div.style.color='#000';
		div.style.cssFloat='right';
	
		var divList = ['activity_mess','quest_mess','fight_mess','heal_mess','demipoint_mess','demibless_mess','level_mess','control'];
		for (var divID in divList) {
			var addDiv=document.createElement('div');
			addDiv.id='AutoZynga_' + divList[divID];
			div.appendChild(addDiv);
		}

		var theAds = document.getElementById('pagelet_ego_pane');
		if ( theAds ) {
			theAds.innerHTML = '';
			theAds.parentNode.appendChild(div);
		} else {	
			var b=nHtml.FindByAttrContains(document.body, 'div', 'className', 'UIStandardFrame_Container');
			if(b)
				b.insertBefore(div,b.childNodes[1]);
		}
			
		return true;
	},
	
	AppendTextToDiv:function(divName,text) {
		var d=document.getElementById('AutoZynga_' + divName);
		if(d) {
			d.innerHTML  += text;
			return true;
		} else return false;
	},
	
	MakeDropDown:function(idName, dropDownList,instructions,formatParms) {
		var selectedItem = GM.GetValue(idName,'defaultValue');
		if (selectedItem=='defaultValue') {
			GM.SetValue(idName,dropDownList[0]);
			selectedItem=dropDownList[0];
		}
		var htmlCode = " <select id='AutoZynga_" + idName + "' " + formatParms + "'><option>" + selectedItem;
		for (var item in dropDownList) {
			if (selectedItem!=dropDownList[item]) {
				if (instructions) {
					htmlCode+="<option" + ((instructions[item])?" title='" + instructions[item] + "'":'') + ">"  + dropDownList[item];
				} else {
					htmlCode+="<option>"  + dropDownList[item];
				}
			}
		}
		htmlCode+='</select>';
		return htmlCode;
	},
	
	MakeCheckBox:function(idName,defaultValue,varClass,instructions,tableTF) {
		var checkItem = GM.GetValue(idName,'defaultValue');
		if (checkItem=='defaultValue') GM.SetValue(idName,defaultValue);
		var htmlCode = " <input type='checkbox' id='AutoZynga_" + idName + "' title=" + '"' + instructions +'"' + ((varClass)?" class='" + varClass + "'":'') + (GM.GetValue(idName)?'checked':'')+' />';
			if (varClass) {
				if (tableTF) htmlCode += "</td></tr></table>";
				else htmlCode += '<br />';
			htmlCode += this.AddCollapsingDiv(idName,varClass);
		}
		return htmlCode;
	},
	
	MakeNumberForm:function(idName,instructions,initDefault,formatParms) {
		var checkItem = GM.GetValue(idName,'defaultValue');
		if (!initDefault) initDefault = ''
		if (!formatParms) formatParms = "size='4'";
		var htmlCode = " <input type='text' id='AutoZynga_" + idName + "' " + formatParms + " title=" + '"' + instructions +'"' + " />";
		return htmlCode;
	},
	
	AddCollapsingDiv:function(parentId,subId) {
		var htmlCode = "<div id='AutoZynga_" + subId + "' style='display: " + (GM.GetValue(parentId,false)?'block':'none') +"'>";
		return htmlCode;
	},
	
	ToggleControl:function(controlId,staticText) {
		var currentDisplay = GM.GetValue('Control_'+controlId,"none")
		if (currentDisplay == "none") var displayChar = "+";
		else var displayChar = "-";
		var toggleCode = '<b><a id="AutoZynga_Switch_' + controlId + '" href="javascript:;" style="text-decoration: none;"> ' + displayChar + ' ' + staticText + '</a></b> <br />';
		toggleCode += "<div id='AutoZynga_" + controlId + "' style='display: " + currentDisplay + "'>";
		return toggleCode;
	},
	
	GetNumber:function(name) {
		var n=GM.GetValue(name,'');
		if(n==null || n=='') { return ''; }
		return Number(n);
	},
	
	MakeTextBox:function(idName,instructions,formatParms) {
		var checkItem = GM.GetValue(idName,'');
		var htmlCode = "<textarea title=" + '"' + instructions +'"' + " type='text' id='AutoZynga_" + idName + "' " + formatParms + ">"+GM.GetValue(idName,'')+"</textarea><br />";
		return htmlCode;
	},
	
	SaveBoxText:function(idName) {
		var boxText=document.getElementById('AutoZynga_' + idName);
		GM.SetValue(idName,boxText.value);
	},
	
	SetDivContent:function(idName,mess) {
		this.SetupDivs();
		var d=document.getElementById('AutoZynga_' + idName);
		if(d) { d.innerHTML=mess; }
	},
	
	SetQuestControl:function() {
		this.SetupDivs();
		var htmlCode = '';
		this.SetDivContent('quest_control',htmlCode);
	},
	
	SetControls:function(force) {
		var controlDiv=document.getElementById('AutoZynga_control');
		if(controlDiv && controlDiv.innerHTML.length>0 && !force)
			return;
	
		var htmlCode = '';
		htmlCode += "<div id='AutoZyngaPaused' style='display: " + GM.GetValue('ZyngaPause','block') +"'><b>Paused on mouse click.</b><br /><a href='javascript:;' id='AutoZyngaRestart' >Click here to restart <hr /> </a></div>";
		htmlCode += 'Disable ' + this.MakeCheckBox('Disabled',false) + '<br />';
		htmlCode += "<br /><hr/>";
	
		htmlCode += this.ToggleControl('CashandHealth','CASH and HEALTH');
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += "Bank Above&nbsp$" + this.MakeNumberForm('MaxInCash',"",'',"type='text'  size='7' style='font-size: 10px'") + "<br />";
			htmlCode += "Heal If Below&nbsp;" + this.MakeNumberForm('MinToHeal','',10,"size='1'  style='font-size: 10px'") + " Health<br />";
			htmlCode += "But Not If Below&nbsp;" + this.MakeNumberForm('MinStamToHeal','','',"size='1'  style='font-size: 10px'") + ' Sta<br />';
		htmlCode += "</table><hr/></div>";
		
		GM.SetValue('QuestArea', 'Quest');
		htmlCode += this.ToggleControl('Quests','QUEST');
			htmlCode += 'Only 20/35' + this.MakeCheckBox('Only20_35',false) + '<br />';
			var questList = ['Energy Available', 'Manual', 'Never'];
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
			htmlCode += '<tr><td width=80>Quest When:</td><td>' + this.MakeDropDown('WhenQuest',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
			htmlCode += "<div id='AutoZynga_WhenQuestHide' style='display: " + (GM.GetValue('WhenQuest',false)!='Never'?'block':'none') +"'>";
				htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
				questList =['Land of Fire','Land of Earth','Land of Mist','Land of Water','Demon Realm','Undead Realm','Underworld'];
				htmlCode += '<tr><td>Pick Sub Area:</td><td>' + this.MakeDropDown('QuestSubArea',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
				var questList = ['Max Influence','Max Experience', 'Manual'];
				htmlCode += '<tr><td>Quest For:</td><td>' + this.MakeDropDown('WhyQuest',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table><br />';
			htmlCode += "</div>";
		htmlCode += "</div>";
		autoQuestObj = this.GetAutoQuest()
		if (autoQuestObj.name) {
			htmlCode += "<a id='stopAutoQuest' href='javascript:;'>Stop auto quest: "+ autoQuestObj.name +" (energy: "+autoQuestObj.energy+")"+"</a><br />";
		}
		htmlCode += "<hr/><br />";
	
		htmlCode += this.ToggleControl('Arena','ARENA');
			htmlCode += '<tr><td>Enable Arena</td><td>' + this.MakeCheckBox('EnableArena', true,'','') +  '</td></tr>';						
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
				htmlCode += "<div id='AutoZynga_WhenArenaHide' style='display: " + 'block' +"'>"
					htmlCode += this.MakeTextBox('ArenaTargets',""," rows='1'") + '<br />';
				htmlCode += "</div>";
			htmlCode += "</table>";
		htmlCode += "<hr/></div>";
			
		GM.SetValue('TargetType', 'Userid List');
		htmlCode += this.ToggleControl('Fighting','FIGHT');
			var fightList = ['Stamina Available','Never'];
			var fightInst = ['',''];
			var typeList = ['Invade','Duel']
			var typeInst = ['','']
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
			htmlCode += '<tr><td>WAR</td><td>' + this.MakeCheckBox('WarMode', true,'','') +  '</td></tr>';						
			htmlCode += '<tr><td>Fight When:</td><td>' + this.MakeDropDown('WhenFight',fightList,fightInst,"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
			htmlCode += "<div id='AutoZynga_WhenFightHide' style='display: " + (GM.GetValue('WhenFight',false)!='Never'?'block':'none') +"'>"
				htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
				htmlCode += '<tr><td>Fight Type:</td><td>' + this.MakeDropDown('FightType',typeList,typeInst,"style='font-size: 10px min-width: 60px; max-width: 60px; width : 60px;'") + '</td></tr>';
				htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
				htmlCode += "<div align=right id='AutoZynga_UserIdsSub' style='display: " + (GM.GetValue('TargetType',false) == 'Userid List'?'block':'none') +"'>"
					htmlCode += this.MakeTextBox('BattleTargets',""," rows='1'") + '<br />';
				htmlCode += "</div>";
			htmlCode += "</table></div>";
		htmlCode += "<hr/></div>";
		
		htmlCode += this.ToggleControl('Monster','MONSTER');
		var mfightList = ['Stamina Available','Never'];
		var mfightInst = ['',''];
		htmlCode += '<table width=189 cellpadding=0 cellspacing=0>'
		htmlCode += '<tr><td>Battle When:</td><td>' + this.MakeDropDown('WhenMonster',mfightList,mfightInst,"style='font-size: 10px min-width: 105px; max-width: 105px; width : 105px;'") + '</td></tr></table>';
		htmlCode += "<div id='AutoZynga_WhenMonsterHide' style='display: " + (GM.GetValue('WhenMonster',false)!='Never'?'block':'none') +"'>"
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Cleric Only</td><td>' + this.MakeCheckBox('ClericOnly', false,'','') +  '</td></tr>';			
			htmlCode += '<tr><td>Auto Collect Reward</td><td>' + this.MakeCheckBox('AutoCollectReward', true,'','') +  '</td></tr>';			
			htmlCode += '<tr><td>No Attack Under</td><td>' + this.MakeNumberForm('MinShipHealthToAttack','',10,"size='1'  style='font-size: 10px'") + '%</td></tr></table>';
			htmlCode += "Attack Monsters in this order:<br />";
			htmlCode += this.MakeTextBox('AttackOrder',""," rows='3'") + '<br />';
		htmlCode += "</div>";
		htmlCode += "<hr/> </div>";		
	
		// Add General Comboboxes
		GM.SetValue('BankingGeneral', 'Edea');
		var generalList= ['Use Current','Aeris','Ambrosia','Angelica','Araxis','Aria','Artanis','Celesta','Chimerus','Cid','Crom','Dante','Dexter','Dragan','Edea','Elena','Elizabeth Lione','Garlan','Helena','Illusia','Keira','Leon Ironhart','Lilith and Riku','Lothar the Ranger','Lotus Ravenmoore','Lucius','Lyra','Malekus','Marina','Memnon','Mephistopheles','Mercedes','Morrigan','Nautica','Ophelia','Orc King','Penelope','Percival','Sano','Savannah','Serra Silverlight','Shino','Skaar Deathrune','Sophia','Stone Guardian','Strider','Sylvanas','Terra','Tifanna','Titania','Vanquish','Vorenus','Vulcan','Zarevok'];
		var generalIncomeList= ['Use Current','Mercedes','Cid'];
		var generalBankingList= ['Use Current','Aeris'];
	
		htmlCode += this.ToggleControl('Generals','GENERALS');
			var dropDownList = ['Idle','Monster','Invade','SubQuest'];
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
			for (var dropDownItem in dropDownList) {
				htmlCode += '<tr><td>' + dropDownList[dropDownItem] + '</td><td>' + this.MakeDropDown(dropDownList[dropDownItem] + 'General',generalList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
			}
			//htmlCode += '<tr><td>Banking</td><td>' + this.MakeDropDown('BankingGeneral',generalBankingList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table><br />';
		htmlCode += "</table><br/><hr/></div>";
			
		attrList = ['','energy','attack','defense','stamina','health'];
		htmlCode += this.ToggleControl('Status','UPGRADE SKILL POINTS');
			htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Auto Add Upgrade Points</td><td>' + this.MakeCheckBox('AutoStat',false,'',"") +  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>";
			htmlCode += '<tr><td>Advanced Settings</td><td>' + this.MakeCheckBox('AutoStatAdv',false,'',"") +  " <a href='http://userscripts.org/posts/207279' target='_blank'>Help</a></td></tr></table>";
			htmlCode += "<div id='AutoZynga_Status_Normal' style='display: " + (GM.GetValue('AutoStatAdv',false)?'none':'block') +"'>"
				htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
				htmlCode += "<tr><td>Increase" + this.MakeDropDown('Attribute1',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue1',"",0,"type='text' size='2' style='font-size: 10px '") + " </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute2',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue2',"",0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute3',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue3',"",0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute4',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue4',"",0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute5',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue5',"",0,"type='text' size='2' style='font-size: 10px'") + " </td></tr></table>";
			htmlCode += "</div>";
			htmlCode += "<div id='AutoZynga_Status_Adv' style='display: " + (GM.GetValue('AutoStatAdv',false)?'block':'none') +"'>"
				htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
				htmlCode += "<tr><td>Increase" + this.MakeDropDown('Attribute1',attrList) + " using </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue1',"",0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute2',attrList) + " using </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue2',"",0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute3',attrList) + " using </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue3',"",0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute4',attrList) + " using </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue4',"",0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute5',attrList) + " using </td></tr></table>";
				htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue5',"",0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
			htmlCode += "</div>";
		htmlCode += "<hr/> </div>";	
		
		htmlCode += this.ToggleControl('Other','OTHER OPTIONS');	
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Auto bless&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('AutoBless',['None','Energy','Attack','Defense','Stamina','Health']) + '</td></tr>';
			htmlCode += '</div>';
		htmlCode += "Version: " + thisVersion + '<br />';
		htmlCode += "</table></div>";
	
		this.SetDivContent('control',htmlCode);	
		this.AddListeners('AutoZynga_div');

		var autoZyngaRestart=document.getElementById('AutoZyngaRestart');
		var autoZyngaPaused=document.getElementById('AutoZyngaPaused');
		autoZyngaRestart.addEventListener('click',function(e) {
			autoZyngaPaused.style.display='none';
			GM.SetValue('ZyngaPause','none');
			GM.SetValue('NoMonsterToAttack',0)
			Zynga.waitMilliSecs = 3000;
			Zynga.ReloadOccasionally();
			Zynga.WaitMainLoop();
		},false);
	
		controlDiv.addEventListener('mousedown',function(e) {
			nHtml.clearTimeouts();
			GM.SetValue('ZyngaPause','block');
			autoZyngaPaused.style.display='block';
		},false);
	
		var autoQuestObj = this.GetAutoQuest();
		if(autoQuestObj.name) {
			var stopA=document.getElementById('stopAutoQuest');
			stopA.addEventListener('click',function() {
				Zynga.SetAutoQuest('',0,'',0);
				GM.SetValue('WhyQuest','Manual');
				GM.Log('Change: setting stopAutoQuest and go to Manual');
				Zynga.SetControls(true);
			},false);
		}
	
		if (GM.GetValue('WhenFight') == 'Not Hiding'  && GM.GetValue('WhenMonster') != 'Not Hiding') {
			GM.SetValue('WhenMonster','Not Hiding');
			this.SetControls(true);
		}
	},

	/////////////////////////////////////////////////////////////////////
	// EVENT LISTENERS
	/////////////////////////////////////////////////////////////////////
	SetDisplay:function(idName,setting){
		if (!(div = document.getElementById('AutoZynga_' + idName))) {
			GM.Log('Unable to find div: ' + idName);
			return;
		}
		if (setting == true) {
			div.style.display = 'block';
		} else {
			div.style.display = 'none';
		}
	},
	
	AddListeners:function(topDivName) {
		if(!(div = document.getElementById(topDivName))) return false;
		var ss=document.evaluate("//input[contains(@id,'AutoZynga_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if(ss.snapshotLength<=0) GM.Log('no inputs');
		for(var s=0; s<ss.snapshotLength; s++) {
			var inputDiv=ss.snapshotItem(s);
			if (inputDiv.type=='checkbox') {
				inputDiv.addEventListener('change',function(e) {
					var idName = e.target.id.replace(/AutoZynga_/i,'')
					var value = e.target.value;
					GM.SetValue(idName,e.target.checked);
					if (e.target.className) Zynga.SetDisplay(e.target.className,e.target.checked);
					else if (idName == 'AutoStatAdv') {
						if (value) {
							Zynga.SetDisplay('Status_Normal',false);
							Zynga.SetDisplay('Status_Adv',true);
							for (var n=1; n<=5; n++) {
								GM.SetValue('AttrValue' + n,'')
							}
						} else {
							Zynga.SetDisplay('Status_Normal',true);
							Zynga.SetDisplay('Status_Adv',false);
						}	
						Zynga.SetControls(true);
					}
				},false);		
						
			// Stats Points textbox
			} else if (inputDiv.type=='text' && /AttrValue./.test(inputDiv.id)) {
				var idName = inputDiv.id.replace(/AutoZynga_/i,'')
				inputDiv.value=GM.GetValue(idName,'').toString();
				inputDiv.addEventListener('change',function(e) {
					var idName = e.target.id.replace(/AutoZynga_/i,'')
					GM.SetValue(idName,e.target.value);
				},false);
			}else if (inputDiv.type=='text') {
				var idName = inputDiv.id.replace(/AutoZynga_/i,'')
				inputDiv.value=this.GetNumber(idName).toString();
				inputDiv.addEventListener('change',function(e) {
					var idName = e.target.id.replace(/AutoZynga_/i,'')
					GM.SetValue(idName,e.target.value);
				},false);
			}
		}
	
		var ss=document.evaluate("//select[contains(@id,'AutoZynga_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if(ss.snapshotLength<=0) GM.Log('no selects');
		for(var s=0; s<ss.snapshotLength; s++) {
			var inputDiv=ss.snapshotItem(s);
			inputDiv.addEventListener('change',function(e) {
				if (e.target.selectedIndex > 0) {
					var idName = e.target.id.replace(/AutoZynga_/i,'')
					var value = e.target.options[e.target.selectedIndex].value
					GM.Log('Change: setting ' + idName + ' to ' + value);
					GM.SetValue(idName,value);
					e.target.options[0].value = value;
					if (idName =='WhenQuest' || idName =='WhenFight' || idName =='WhenMonster') {
						Zynga.SetDisplay(idName + 'Hide',(value!='Never'));
						Zynga.SetControls(true);
					} else if (idName == 'QuestArea' || idName == 'QuestSubArea' || idName =='WhyQuest') {
						Zynga.SetAutoQuest('',0,'',0);
						Zynga.SetControls(true);
					} else if (idName == 'IdleGeneral') {
						GM.SetValue('MaxIdleEnergy', 0);
						Zynga.SetControls(true);
					} else if (idName == 'TargetType') {
						switch (value) {
							case "Freshmeat" :
								Zynga.SetDisplay('FreshmeatSub',true);
								Zynga.SetDisplay('UserIdsSub',false);
								Zynga.SetControls(true);
								break;
							case "Userid List" :
								Zynga.SetDisplay('FreshmeatSub',false);
								Zynga.SetDisplay('UserIdsSub',true);
								Zynga.SetControls(true);
								break;
							default :
								Zynga.SetDisplay('FreshmeatSub',true);
								Zynga.SetDisplay('UserIdsSub',false);
								Zynga.SetControls(true);
						}
					} else if (/Attribute./.test(idName)) {
						GM.SetValue("SkillPointsNeed",1)
					}	
				}
			},false);
		}
	
		var ss=document.evaluate("//textarea[contains(@id,'AutoZynga_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			var inputDiv=ss.snapshotItem(s);
			inputDiv.addEventListener('change',function(e) {
				GM.Log('Change: setting ' + idName + ' to something new');
				var idName = e.target.id.replace(/AutoZynga_/i,'')
				Zynga.SaveBoxText(idName);
			},false);
		}
	
		var ss=document.evaluate("//a[contains(@id,'AutoZynga_Switch_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			var switchDiv=ss.snapshotItem(s);
			switchDiv.addEventListener('click',function(e) {
				var subId = e.target.id.replace(/_Switch/i,'');
				var subDiv = document.getElementById(subId);
				if(subDiv.style.display == "block") {
					subDiv.style.display = "none";
					e.target.innerHTML = e.target.innerHTML.replace(/-/,'+');
					GM.SetValue('Control_' + subId.replace(/AutoZynga_/i,''),"none")
				}
				else {
					subDiv.style.display = "block";
					e.target.innerHTML = e.target.innerHTML.replace(/\+/,'-');
					GM.SetValue('Control_'+ subId.replace(/AutoZynga_/i,''),"block")
				}
			},false);
		}
	},

	/////////////////////////////////////////////////////////////////////
	//							GET STATS
	/////////////////////////////////////////////////////////////////////
	GetStatusNumbers:function(node) {
		var txt=nHtml.GetText(node);
		var staminam=this.statusRe.exec(txt);
		if(staminam) {
			return {'num':parseInt(staminam[1]),'max':parseInt(staminam[2])};
		} else {
			GM.Log('Cannot find status:'+txt);
		}
		return null;
	},
	
	GetStats:function() {
		this.stats={};
	
		// Facebook ID
		var webSlice=nHtml.FindByAttrContains(document.body,"a","href","party.php");
		if (webSlice) {
			var m=this.userRe.exec(webSlice.getAttribute('href'));
			if(m) {
				var txt=m[2];
				GM.SetValue('FBID',txt);
			}
		}
	
		// Player's Name
		var playerChanged = false;
		var attrDiv =nHtml.FindByAttrContains(document.body,"div","class",'keep_stat_title_inc');
		if (attrDiv) {
			var txt = nHtml.GetText(attrDiv);
			var userName = txt.match(/"(.+)"/);
			GM.SetValue('PlayerName',userName[1]);
			
			var prePlayerName = GM.GetValue('Pre_PlayerName','');
			if ( prePlayerName != userName[1] || prePlayerName == '' ) {
				GM.Log("Change Player, reset Quest and monster");

				GM.SetValue('bqh', '');
				
				GM.SetValue('AlreadyCollectReward', 0);		
				GM.SetValue('CollectMonster', '');				
				GM.SetValue('CollectSkipList', '');
				GM.SetValue('PreCollectMonster', '');
				GM.SetValue('CollectTryCount', 0);		
						
				GM.SetValue('MonsterCheckedLink','');			
				GM.SetValue('CurrentMonster', '');
				
				GM.SetValue('AutoQuest','');
				GM.SetValue('AutoQuestEnergy',0);
				GM.SetValue('AutoQuestGeneral','');
				GM.SetValue('AutoQuestRatio',0);				
				
				GM.SetValue('BlessingTimer', 0);
				GM.SetValue('CompletedArena', 0);
				
				playerChanged = true;			
			}
			GM.SetValue('Pre_PlayerName',userName[1]);
		}
	
		// health
		var health = nHtml.FindByAttrContains(document.body,"span","id",'_current_health');
		if(!health)
			health=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_health') and not(contains(@id,'health_time'))");
	
		if(health!=null) {
			this.stats['health']=this.GetStatusNumbers(health.parentNode);
		} else {
			GM.Log('Could not find health');
			this.waitMilliSecs=5000;
			this.needReload = true;
			return;
		}
	
		// stamina
		this.stats.stamina = null;
		var stamina=nHtml.FindByAttrContains(document.body,"span","id",'_current_stamina');
		if(!stamina)
			stamina=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_stamina') and not(contains(@id,'stamina_time'))");
	
		if(stamina!=null) {
			this.stats['stamina']=this.GetStatusNumbers(stamina.parentNode);
		} else {
			GM.Log('Could not find stamina');
			this.waitMilliSecs=5000;
			return;
		}
	
		// energy
		var energy=nHtml.FindByAttrContains(document.body,"span","id",'_current_energy');
		if(!energy)
			energy=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_energy') and not(contains(@id,'energy_time'))");
		
		if(energy!=null) {
			this.stats['energy']=this.GetStatusNumbers(energy.parentNode);
			if(this.stats.energy!=null) {
				if ((GM.GetValue('IdleGeneral','').toLowerCase().indexOf(this.GetCurrentGeneral()) >= 0) || (GM.GetValue('IdleGeneral','').match(/use current/i)))
					GM.SetValue('MaxIdleEnergy', this.stats.energy.max);	
			}
		} else {
			GM.Log('Could not find energy');
			this.waitMilliSecs=5000;
			return;
		}
	
		// level
		var level=nHtml.FindByAttrContains(document.body,"div","title",'experience points');
		if(level!=null) {
			var txt=nHtml.GetText(level);
			var levelm=this.levelRe.exec(txt);
			if (levelm) {
				this.stats['level']=parseInt(levelm[1]);
				
				if ( playerChanged ) {
					GM.SetValue('PreLevel', this.stats.level);	
					
					if ( GM.GetValue('WhyQuest','Max Influence') == 'Max Influence' )
						GM.SetValue('QuestSubArea','Land of Fire');
				} else if ( this.stats.level > GM.GetValue('PreLevel',this.stats.level-1) ) {
					GM.Log("Level up, clear checked link");
					GM.SetValue('PreLevel', this.stats.level);				
					GM.SetValue('MonsterCheckedLink','');			
					GM.SetValue('CurrentMonster', '');					
				}
				/*
				if ( playerChanged && this.stats.level < 80 ) {
					if ( GM.GetValue('WhyQuest','Max Influence') == 'Manual' ) {
						GM.SetValue('QuestSubArea','Land of Fire');
						GM.SetValue('WhyQuest','Max Influence');
					} else 
						GM.SetValue('QuestSubArea','Land of Fire');
				}*/
			} else 
				GM.Log('Could not find level re');
		} else {
			GM.Log('Could not find level obj');
		}
	
		// gold
		cashObj=nHtml.FindByAttrXPath(document.body,"strong","contains(string(),'$')");
		if(cashObj) {
			this.stats.cash = this.NumberOnly(nHtml.GetText(cashObj));
		} else {
			GM.Log('Could not find cash');
		}
	
		if (this.DisplayTimer('BlessingTimer')) {
			if (this.CheckTimer('BlessingTimer'))
				this.SetDivContent('demibless_mess','Demi Blessing = none');
			else
				this.SetDivContent('demibless_mess','Next DB: ' + this.DisplayTimer('BlessingTimer'));
		}
	
		// return true if probably working
		if (!cashObj) window.location = "http://apps.facebook.com/castle_age/index.php?bm=1";
	
		return cashObj && (health!=null);
	},
	
	/////////////////////////////////////////////////////////////////////
	// CHECK RESULTS
	// Called each iteration of main loop, this does passive checks for
	// results to update other functions.
	/////////////////////////////////////////////////////////////////////
	CheckResults:function() {
		// Check for Gold Stored
		if (nHtml.FindByAttrContains(document.body,"div","class",'keep_main_section')) {
			var goldStored = nHtml.FindByAttrContains(document.body,"b","class",'money').firstChild.data.replace(/[^0-9]/g,'');
			if ( goldStored.indexOf('no money found') >= 0 )
				goldStored = 0;
			GM.SetValue('inStore',goldStored);
		}
		
		var resultsDiv = '';
		if (resultsDiv = nHtml.FindByAttrContains(document.body,'span','class','result_body'))
			resultsText = nHtml.GetText(resultsDiv).trim();
		else 
			resultsText = '';
			
		// Check time until next Oracle Blessing
		if (resultsText.match(/Please come back in: /)) {
			var hours = parseInt(resultsText.match(/ \d+ hour/),10);
			var minutes = parseInt(resultsText.match(/ \d+ minute/),10);
			this.SetTimer('BlessingTimer',(hours*60+minutes+1)*60);
			GM.Log('Recorded Blessing Time.  Scheduling next click!');
		}
	
		// Recieved Demi Blessing.  Wait 24 hours to try again.
		if (resultsText.match(/You have paid tribute to/)) {
			this.SetTimer('BlessingTimer',24*60*60+60);
			GM.Log('Received blessing.  Scheduling next click!');
		}						
	},

	/////////////////////////////////////////////////////////////////////
	// Quest
	/////////////////////////////////////////////////////////////////////
	baseQuestTable : { 'Land of Fire' :'land_fire', 'Land of Earth':'land_earth', 'Land of Mist':'land_mist', 'Land of Water':'land_water', 'Demon Realm' :'land_demon_realm', 'Undead Realm':'land_undead_realm', 'Underworld':'tab_underworld'},
	
	SetAutoQuest:function(quest_name,quest_energy,quest_general,quest_expRatio) {
		GM.SetValue('AutoQuest',quest_name);
		GM.SetValue('AutoQuestEnergy',quest_energy);
		GM.SetValue('AutoQuestGeneral',quest_general);
		GM.SetValue('AutoQuestRatio',quest_expRatio);
	},
	
	GetAutoQuest:function() {
		var name=GM.GetValue('AutoQuest','');
		var energy=parseInt(GM.GetValue('AutoQuestEnergy',0));
		var general=GM.GetValue('AutoQuestGeneral','');
		var expRatio=GM.GetValue('AutoQuestRatio',0);
		return { 'name':name,'energy':energy, 'general':general, 'expRatio':expRatio };
	},

	IsEnoughEnergyForAutoQuest:function() {
		var autoQuestObj=this.GetAutoQuest();
		if( !this.stats.energy || !autoQuestObj.energy )
				return false;
				
		var whenQuest = GM.GetValue('WhenQuest','');
		if ( whenQuest == 'Energy Available' ) {
			if ( this.stats.energy.num>=autoQuestObj.energy ) 
				return true;
			this.SetDivContent('quest_mess','Waiting for eng: '+this.stats.energy.num+"/"+(autoQuestObj.energy?autoQuestObj.energy:""));
			return false;
		}
		
		return false;
	},
	
	GetQuestName:function(questDiv) {
		var item_title=nHtml.FindByAttrXPath(questDiv,'div',"@class='quest_desc' or @class='quest_sub_title'");
		if(!item_title)
			return false;
	
		if (item_title.innerHTML.toString().match(/LOCK/))
			return false;
	
		var firstb=item_title.getElementsByTagName('b')[0];
		if (!firstb) {
			GM.Log("Can't get bolded member out of " + item_title.innerHTML.toString());
			return false;
		}
	
		var quest_name=nHtml.StripHtml(firstb.innerHTML.toString()).trim();	
		if(!quest_name) {
			GM.Log('no quest name for this row'+div.innerHTML);
			return false;
		}
		return quest_name;
	},
	
	SwitchToNextQuestArea:function() {
		var SubAreaQuest = GM.GetValue('QuestSubArea', '');
		switch (SubAreaQuest) {
			case 'Land of Fire':
				GM.SetValue('QuestSubArea','Land of Earth');
				break;
			case 'Land of Earth':
				GM.SetValue('QuestSubArea','Land of Mist');
				break;
			case 'Land of Mist':
				GM.SetValue('QuestSubArea','Land of Water');
				break;
			case 'Land of Water':
				GM.SetValue('QuestSubArea','Demon Realm');
				break;
			case 'Demon Realm':
				GM.SetValue('QuestSubArea','Undead Realm');
				break;
			case 'Undead Realm':
				GM.SetValue('QuestSubArea','Underworld');
				break;
			default :
				GM.SetValue('AutoQuest','');
				GM.SetValue('WhyQuest','Manual');
				this.SetControls(true);
		}
	},
	
	SearchQuests:function() {	
		var div = document.body;
		var quests={};
		var ss = document.evaluate(".//div[contains(@class,'quests_background')]",div,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

		if (ss.snapshotLength == 0)
			return quests;
		if ( ss.snapshotLength < 5 ) {
			GM.Log("Total Quest number < 5!!, need reload");
			window.setTimeout(function() { window.history.go(0); }, 5*1000);
			return quests;
		}
			
		var neverDoBossQuest = (ss.snapshotLength == 6);
		var bestQuest=null;
		var bestReward=0;
		var CompletedCount = 0;
		var reward = null;
		var energy = null;
		var experience = null;
		var divTxt = null;
		var expM = null;
		var m = null;
		var is_map_type = 0;
		if ( GM.GetValue('QuestSubArea','') == 'Land of Fire' )
			is_map_type = 1;
		
		for( var s = 0 ; s < ss.snapshotLength ; s++) {
			var cur_idx = s;
			if ( is_map_type )
				cur_idx = ss.snapshotLength - s - 1;
			
			div = ss.snapshotItem(cur_idx);
			if ( !(quest_name=this.GetQuestName(div)) )
				continue;
				
			divTxt = nHtml.GetText(div);
			reward = energy = experience = null;
			expM = this.experienceRe.exec(divTxt);
	
			//Get exp ---------------------------------------------------------------
			if ( expM ) {
				experience = this.NumberOnly(expM[1]); 
			}	else {
				var expObj = nHtml.FindByAttr(div,'div','className','quest_experience');
				if ( expObj )
					experience=(this.NumberOnly(nHtml.GetText(expObj)));
				else
					GM.Log('cannot find experience:' + quest_name);
			}
			if( (idx=quest_name.indexOf('<br>')) >= 0 )
				quest_name = quest_name.substring(0, idx);	
	
			//Get necessary energy --------------------------------------------------
			m = this.energyRe.exec(divTxt);
			if (m) {
				energy=this.NumberOnly(m[1]);
			} else {
				var eObj=nHtml.FindByAttrContains(div,'div','className','quest_req');
				if(eObj)
					energy=eObjs.getElementsByTagName('b')[0];
			}
			if(!energy) {
				GM.Log('cannot find energy for quest:'+quest_name);
				continue;
			}
	
			//Get money -------------------------------------------------------------
			m=this.moneyRe.exec(this.RemoveHtmlJunk(divTxt));
			if(m)
				reward=(this.NumberOnly(m[1])+this.NumberOnly(m[2]))/2;
			else
				GM.Log('no money found:'+quest_name+' in ' + divTxt);

			//Get do button ---------------------------------------------------------	
			var a=nHtml.FindByAttr(div,"input","name",/^Do/);
			if(!a) {
				GM.Log('no button found:'+quest_name);
				continue;
			}
	
			//Get influence ---------------------------------------------------------
			var influenceList = this.influenceRe.exec(divTxt);
			var foundFluence = divTxt.indexOf('INFLUENCE:') >= 0 ? 1 : 0;
			var influence = influenceList[1];
			if(!influence) {
				GM.Log('no influence found:'+quest_name+' in ' + divTxt);
			} else if ( influence >= 100 && foundFluence )
				CompletedCount++;			
			var isBossQuest = (influence >= 100 && !foundFluence);
			if ( isBossQuest && !neverDoBossQuest )
				CompletedCount++;
			
			//Get general -----------------------------------------------------------
			var general = 'none';
			if ( !isBossQuest && influence && influence < 100) {
				var genDiv=nHtml.FindByAttrContains(div,'div','className','quest_act_gen');
				if (genDiv) {
					genDiv = nHtml.FindByAttrContains(genDiv,'img','src','jpg');
					if (genDiv)
						general = genDiv.title.toLowerCase();
				}
			}
	
			quests[quest_name]={
				'click':a,'tr':div,
				'energy':energy,'reward':reward,
				'experience':experience, 'general':general,
				'influence':influence, 'genDiv':genDiv,
				'name':quest_name,'isBossQuest':isBossQuest
			};
			
			whyQuest = GM.GetValue('WhyQuest','');
			switch (whyQuest) {
				case 'Max Influence' :
					if(influence) {
						if ( isBossQuest && neverDoBossQuest && CompletedCount == 5 && this.stats.energy.max >= energy ) 
							bestQuest = quest_name;
						else if (!bestQuest && this.NumberOnly(influence)<100)
							bestQuest = quest_name;
					} else {
						GM.Log('cannot find influence:'+quest_name+': '+influence);
					}
					break;
				case 'Max Experience' :
					var rewardRatio=(Math.floor(experience/energy*100)/100);
					if(bestReward<rewardRatio) {
						bestReward=rewardRatio;
						bestQuest=quest_name;
					}
					break;
			}
		}
	
		if( whyQuest == 'Max Influence' && !neverDoBossQuest && ss.snapshotLength == CompletedCount ) {
				GM.Log("All quest completed! go to next area");
				this.SwitchToNextQuestArea();
				return false;
		}
			
		if ( whyQuest=='Manual' ) {
			autoQuestObj = this.GetAutoQuest();
			bestQuest = autoQuestObj.name;
		}
		
		if (quests[bestQuest]) {
			var expRatio = quests[bestQuest].experience/quests[bestQuest].energy;
			this.SetAutoQuest(bestQuest,quests[bestQuest].energy,quests[bestQuest].general,expRatio.toString());
			this.SetControls(true);
			return quests[bestQuest];
		}
	
		this.SetAutoQuest('',0,'',0);
		//GM.SetValue('WhyQuest','Manual');
		GM.Log("Can't Find auto quest, Force do 20/35 Quest");
		this.DoDirectQuest(4, 104, 20);			
		this.SetControls(true);
		return {name:''};
	},
		
	BuyQuestReqItem:function(costToBuy) {
		var inStore = parseInt(GM.GetValue('inStore'));
		GM.Log("costToBuy=" + costToBuy + ", Cash=" + this.stats.cash + ", inStore:" + inStore);
		
		if ( this.stats.cash >= costToBuy )
			return;
			
		if ( (this.stats.cash + inStore) >= costToBuy ){
			GM.Log("Trying to retrieve: "+(costToBuy-this.stats.cash));
			return this.RetrieveFromBank(costToBuy-this.stats.cash);
		} else {
			/*
			Zynga.SetAutoQuest('',0,'',0);
			GM.SetValue('WhyQuest','Manual');
			GM.Log("Cant buy General, stopping quest");
			Zynga.SetControls(true);
			return false;
			*/
			GM.Log("Can't buy Quest Req Item, Force do 20/35 Quest");
			return this.DoDirectQuest(4, 104, 20);			
		}
	},
	
	DoDirectQuest:function(landId, questId, needEng) {
		var directLink = 'http://apps.facebook.com/castle_age/quests.php?land=' + landId + '&quest=' + questId + '&bqh=' + this.bqh + '&ang108=quest';
		this.SetDivContent('quest_mess','Waiting for eng: ?/' + needEng);
		if ( this.stats.energy.num < needEng )
			return false;
		GM.SetValue('bqh', this.bqh);
		Zynga.VisitUrl(directLink, 4000);
		return true;		
	},
	
	Quests:function() {		
		this.SetDivContent('quest_mess','');
		if(GM.GetValue('WhenQuest','')=='Never') {
			this.SetDivContent('quest_mess','Questing off.');
			return false;
		}
		
		if ( GM.GetValue('Only20_35',0) )
			return this.DoDirectQuest(4, 104, 20);
	
		var autoQuestObj = this.GetAutoQuest();
		var autoQuest = autoQuestObj.name;
	
		if(!autoQuest) {
			if(GM.GetValue('WhyQuest','')=='Manual') {
				this.SetDivContent('quest_mess','Quest manually, use link');
				return false;
			}
			this.SetDivContent('quest_mess','Searching for quest.');
		} else if(!this.IsEnoughEnergyForAutoQuest()) return false;

		if (autoQuestObj.general == 'none') {
			if (this.SelectGeneral('SubQuestGeneral')) return true;
		}
		
		var subArea = GM.GetValue('QuestSubArea','Land of Fire');
		var landPic = this.baseQuestTable[subArea];
		if ((landPic == 'land_demon_realm') || (landPic == 'land_undead_realm' || (landPic == 'Underworld'))) {
			if (this.NavigateTo('quests,jobs_tab_more.gif,'+landPic + '.gif',landPic + '_sel')) return true;
		} else {
			if ( !this.CheckForImage('map_button_click_below.gif') && !this.CheckForImage('map_fire_half.jpg') ) 
				if (this.NavigateTo('quests,jobs_tab_back.gif,'+landPic + '.gif',landPic + '_sel')) return true;
		}
	
		if (button = this.CheckForImage('quick_switch_button.gif')) {
			GM.Log('Clicking on quick switch general button.');
			this.Click(button);
			return true;
		}
		
		//Buy quest requires popup
		var costToBuy = '';	
		if(itemBuyPopUp = nHtml.FindByAttrContains(document.body,"form","id",'itemBuy')){
			costToBuy = itemBuyPopUp.textContent.replace(/.*\$/,'').replace(/[^0-9]{3,}.*/,'');
			this.BuyQuestReqItem(costToBuy);
			
			if (button = this.CheckForImage('quick_buy_button.jpg')){
				GM.Log('Clicking on quick buy button.');
				this.Click(button);
				return true;
			}
			GM.Log("Cant find buy button");
			return false;
		}
	
		if (button = this.CheckForImage('quick_buy_button.jpg')) {
			costToBuy = button.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.data.replace(/[^0-9]/g,'');
			this.BuyQuestReqItem(costToBuy);
			GM.Log('Clicking on quick buy general button.');
			this.Click(button);
			return true;
		}
		
		autoQuestObj=this.SearchQuests();
		if(!autoQuestObj.name) {
			GM.Log('Could not find autoquest.');
			this.SetDivContent('quest_mess','Could not find autoquest.');
			return false;
		}
		if(autoQuestObj.name!=autoQuest) {
			GM.Log('New AutoQuest found.');
			this.SetDivContent('quest_mess','New AutoQuest found[' + autoQuestObj.name + ']');
			return true;
		}
		//if found missing requires, click to buy
		if( background = nHtml.FindByAttrContains(autoQuestObj.tr,"div","style",'background-color')){
			if(background.style.backgroundColor == 'rgb(158, 11, 15)'){
				if (background.firstChild.firstChild.title) {
					GM.Log("Clicking to buy " + background.firstChild.firstChild.title);
					this.Click(background.firstChild.firstChild, 5000);
					return true;
				}
			}
		}		
		if (autoQuestObj.general == 'none') {
			if (this.SelectGeneral('SubQuestGeneral')) return true;
		} else if (autoQuestObj.general && autoQuestObj.general.indexOf(this.GetCurrentGeneral()) < 0) {
			GM.Log('Clicking on general ' + autoQuestObj.general);
			this.Click(autoQuestObj.genDiv);
			return true;
		}
	
		GM.Log('Do auto quest: ' + autoQuest);
		this.waitMilliSecs=10000;

		var count = (this.stats.level >= 80) ? 15 : 5;
		if ( autoQuestObj.isBossQuest )
			count = 1;
			
		GM.SetValue('AngQuestCount', count);
			
		nHtml.setTimeout(function() {
			var count = GM.GetValue('AngQuestCount', 1);
			GM.SetValue('AngQuestCount', 1);
			for(var i = 0 ; i < count ; i++ )
				Zynga.Click(autoQuestObj.click);
			if (autoQuestObj.isBossQuest)
				Zynga.SetAutoQuest('',0,'',0);
		},1000);
		return true;
	},

	/////////////////////////////////////////////////////////////////////
	// AUTO BLESSING
	/////////////////////////////////////////////////////////////////////
	AutoBless:function() {
		var autoBless=GM.GetValue('AutoBless','none').toLowerCase();
		if (!this.CheckTimer('BlessingTimer')) 
			return false;
		
		var index = 1;
		if (autoBless=='none') 
			return false;
		else if ( autoBless=='energy' )
			index = 1;
		else if ( autoBless=='attack' )
			index = 2;
		else if ( autoBless=='defense' )
			index = 3;
		else if ( autoBless=='health' )
			index = 4;
		else if ( autoBless=='stamina' )
			index = 5;
		
		GM.Log('Click deity blessing for ' + autoBless);
		var blessURL = 'http://apps.facebook.com/castle_age/symbolquests.php?action=tribute&symbol=' + index + '&ang108=closetab';
		this.SetTimer('BlessingTimer',60*60);
		
		GM.SetValue('AngWaitBlessTab', 1);
		GM_openInTab(blessURL)			
		return true;
	},
	
	/////////////////////////////////////////////////////////////////////
	// BATTLING PLAYERS
	/////////////////////////////////////////////////////////////////////
	FindFightForm:function(obj,withOpponent) {
		var ss=document.evaluate(".//form[contains(@onsubmit,'battle.php')]",obj,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var fightForm=null;
		for(var s=0; s<ss.snapshotLength; s++) {
			fightForm=ss.snapshotItem(s);
	
			// ignore forms in overlays
			var p=fightForm;
			while(p) {
				if (p.id && p.id.indexOf('verlay')>=0) {
					fightForm=null; break;
				}
				p=p.parentNode;
			}
			if(!fightForm) {
				continue;
			}
	
			var inviteButton=nHtml.FindByAttrXPath(fightForm,"input","(@type='submit' or @name='submit') and (contains(@value,'Invite') or contains(@value,'Notify'))");
			if(inviteButton) {
				// we only want "attack" forms not "attack and invite", "attack & notify"
				continue;
			}
	
			var submitButton=nHtml.FindByAttrXPath(fightForm,"input","@type='image'");
			if(!submitButton) {
				// we only want forms that have a submit button
				continue;
			}
	
			if(withOpponent) {
				var inp=nHtml.FindByAttrXPath(fightForm,"input","@name='target_id'");
				if(!inp) {
					continue;
				} else {
					GM.Log('inp.name is:' + inp.name);
				}
			}
	
			if ( this.IsWarMode() ) {
				var inp=nHtml.FindByAttrXPath(fightForm,"input","@value='war'");
				if (inp)
					GM.Log('war form found');
				else
					continue;
			} else {
				if (GM.GetValue("FightType","Invade") == "Duel" ) {
					var inp=nHtml.FindByAttrXPath(fightForm,"input","@name='duel'");
					if (inp) {
						if (inp.value == "false") continue;
						else GM.Log('dueling form found');
					}
				}
			}
				
			
			if(fightForm) { break; }
		}
	
		return fightForm;
	},

	FightUserId:function(userid) {
		GM.Log('Fight user:'+userid);
	
		var fightForm=this.FindFightForm(document,true);
	
		if(fightForm && (userid > 0)) {
			GM.Log('Found fightForm');
			var inp=nHtml.FindByAttrXPath(fightForm,"input","@name='target_id'");
			if(!inp) {
				GM.Log('no target_id in attack form');
				return null;
			}
			inp.value=userid;
	
			var button=nHtml.FindByAttrXPath(fightForm,"input","@type='image'");
				
			if(button) {
				GM.Log('Fight user button:'+button.name+", type:"+button.alt);
				this.lastFightID=userid;
				Zynga.Click(button);
			} else {
				GM.Log('No submit button?:'+button.name);
				return null;
			}
			return 'fight';
		}
	
		return null;
	},
	
	IsWarMode:function() {
		if ( this.stats.level >= 100 && GM.GetValue("WarMode",0) )
			return true;
		else
			return false;
	},
	
	Arena:function() {
		var CompletedArena = GM.GetValue("CompletedArena",0);
		if ( CompletedArena == 2 )
			return false;
			
		//Need Join Arena ?
		var acceptBtn = this.CheckForImage('arena_button_accept.gif');
		if ( acceptBtn ) {
			Zynga.Click(acceptBtn);
			return true;
		}
		
		var helpCloseBtn = null;		
		if ( (helpCloseBtn=this.CheckForImage("help_close_x.gif")) ) {
    	GM.Log("Found help close button, click it");
			Zynga.Click(helpCloseBtn, 3000);    	
    	return true;    
    }		
		
		//Check Result
		var result = nHtml.FindByAttrContains(document.body,'span','class','result_body');
		var maxAttackStat = 0;
		if ( result ) {
			var resultText = nHtml.GetText(result).trim();
			//GM.Log("resultText:"+resultText);
			if ( resultText.indexOf('You have already attacked this player 5 times') >= 0 )
				maxAttackStat = 1;
			else if ( resultText.indexOf('Your opponent is dead or too weak to battle.') >= 0 )
				maxAttackStat = 1;				
		}
		
		//On Arean Page ?	
		if ( !this.CheckForImage('tab_arena_on.gif') ) {
			if (this.NavigateTo('battle,tab_arena_off.gif')) 
				return true;						
		}
			
		
		//Check Arena Token                                                  
		var tokenContain = nHtml.FindByAttrContains(document.body,'span','id','app46755028429_arena_token_current_value');
		if ( !tokenContain ) {
			GM.Log("ERROR!! Can't get token contain");	
			return true;
		}

		var token = nHtml.GetText(tokenContain).trim();
		if ( token < 10 ) {
			GM.SetValue("CompletedArena", 2);
			GM.Log("Need 10 arena token, now only " + token);	
			return false;		
		}
		
		//Chck Rank
		var rank = 1;
		if ( 			this.CheckForImage('arena2_rank1.gif') ) rank = 1;
		else if ( this.CheckForImage('arena2_rank2.gif') ) rank = 2;
		else if ( this.CheckForImage('arena2_rank3.gif') ) rank = 3;
		else if ( this.CheckForImage('arena2_rank4.gif') ) rank = 4;
		else if ( this.CheckForImage('arena2_rank5.gif') ) rank = 5;
		else if ( this.CheckForImage('arena2_rank6.gif') ) rank = 6;
		else if ( this.CheckForImage('arena2_rank7.gif') ) rank = 7;
		GM.Log("Token:" + token + ", Rank:" +  rank);	
		
		//Check Attack Button
		var atkButton = this.CheckForImage('arena2_button.gif');
		if ( !atkButton ) {
			GM.Log("ERROR!! Can't get arena attack button");	
			return false;
		}
		
		//Get List Group
		var listGroup = atkButton.parentNode.parentNode;
		if ( !listGroup ) {
			GM.Log("ERROR!! Can't get arena battle list Group");	
			return false;
		}

		var targetInput = nHtml.FindByAttrContains(listGroup,'input','name','target_id');
		if ( !targetInput ) {
			GM.Log("ERROR!! Can't get org targetInput value");	
			return false;
		}
				
		//Get Target
		var targetList = GM.GetValue('ArenaTargets', "");
		if( !targetList ) {
			GM.Log('No Attack Target!');
			return false;
		}
		
		var targets = targetList.split(/[\n,]/);
		if( targets.length != 2) {
			GM.Log('No Enough Attack Target, need 2!');
			return false;
		}
		
		if ( maxAttackStat ) {
			if ( CompletedArena == 1 ) {
				GM.SetValue("CompletedArena", 2);			
				GM.Log("Arena Completed, go to next action");
				return false;	
			}
		
			GM.SetValue("CompletedArena", 1);			
			CompletedArena = 1;
		}
		
		if ( CompletedArena == 1 && rank < 3 ) {
			GM.Log("Rank not high enough to attack main people, go to next action");
			GM.SetValue("CompletedArena", 2);			
			return false;	
		}
		
		if ( CompletedArena == 0 && rank >= 4 ) {
			GM.Log("Rank high enough to attack main people, go to attack main people#1");
			GM.SetValue("CompletedArena", 1);			
			return true;			
		}
		
		if ( CompletedArena == 0 && rank >= 3 && token <= 40 ) {
			GM.Log("Rank high enough to attack main people, go to attack main people#2");
			GM.SetValue("CompletedArena", 1);			
			return true;			
		}
		
		var fightUpto = CompletedArena % targets.length;
		var currentTarget = targets[fightUpto];		
	
		GM.Log('Arean[' + fightUpto + ',' + currentTarget + ']');
		this.SetDivContent('fight_mess', 'Do Arena ' + currentTarget);
		targetInput.value = currentTarget;

		//Check Health
		if(this.stats.health.num < 40) {
			this.SetDivContent('fight_mess',"Need health: " + this.stats.health.num + "/40");
			return true;
		}
		
		Zynga.Click(atkButton);
		return true;
	},
	
	Battle:function() {
		var monsterEnable = ( GM.GetValue('WhenMonster','') == 'Never' ) ? false : true;		
		var chkSta = this.IsWarMode() ? 10 : 1;		
		if ( monsterEnable ) chkSta += 5;

		if (!this.CheckStatsForAutoFight(chkSta)) {
			GM.Log("Need " + chkSta + " stamina to battle.");
			return false;
		}
		
		if (this.SelectGeneral('InvadeGeneral')) 	return true;
	
		if ( nHtml.FindByAttrContains(document.body,'span','class','positive') || 
				 nHtml.FindByAttrContains(document.body,'span','class','negative') ) {
	
			if ( this.IsWarMode() ) 
				chainButton = this.CheckForImage('battle_duel_again.gif');
			else if (GM.GetValue('FightType') == 'Invade')
				chainButton = this.CheckForImage('battle_invade_again.gif');
			else 
				chainButton = this.CheckForImage('battle_duel_again.gif');
			
			if (chainButton) {
				this.SetDivContent('fight_mess','Chain Attack');			

				if ( (this.IsWarMode() && this.stats.stamina.num > 10) ||
				     (!this.IsWarMode() && this.stats.stamina.num > 0) ) {
					GM.SetValue('AngEngPkgDelay', this.stats.health.num);
				}
				
				Zynga.Click(chainButton);
				return true;
			}
		}
			
		var targetList = GM.GetValue('BattleTargets', "");
		if( !targetList ) {
			GM.Log('No Attack Target!');
			return false;
		}
		
		var targets = targetList.split(/[\n,]/);
		var fightUpto = GM.GetValue('FightTargetUpto', 0);
		fightUpto = fightUpto % targets.length;
		var currentTarget = targets[fightUpto];		

		if ( this.IsWarMode() )
			image = 'war_button_duel';
		else if ( GM.GetValue('FightType','Invade') == "Duel" ) 	
			image = 'battle_02';
		else		
	 		image = 'battle_01';
		 		
		if (this.NavigateTo('battle',image)) 
			return true;
	
		//GM.Log('Fighting ' + currentTarget);
		this.SetDivContent('fight_mess', 'Fighting ' + currentTarget);
		this.FightUserId(currentTarget);	
		GM.SetValue('FightTargetUpto', fightUpto+1 );
		
		if ( (this.IsWarMode() && this.stats.stamina.num > 10) ||
		     (!this.IsWarMode() && this.stats.stamina.num > 0) ) {
			GM.SetValue('AngEngPkgDelay', this.stats.health.num);
		}
		
		return true;		
	},

	/////////////////////////////////////////////////////////////////////
	// Collect Reward
	/////////////////////////////////////////////////////////////////////
	CollectReward:function() {		
		if ( GM.GetValue('AutoCollectReward',0) == false )
			return false;
			
		if ( GM.GetValue('AlreadyCollectReward', 0) )
			return false;
			
		if ( GM.GetValue('WhenMonster','') == 'Never' )
			return false;
			
		var helpCloseBtn = null;		
		if ( (helpCloseBtn=this.CheckForImage("help_close_x.gif")) ) {
    	GM.Log("Found help close button, click it");
			Zynga.Click(helpCloseBtn, 5000);    	
    	return true;    
    }

		var skipMonster = GM.GetValue('CollectSkipList','');
		var collectBtn = null;		
		if ( !(collectBtn=this.CheckForImage("collect_reward_button.jpg")) )
			collectBtn = this.CheckForImage("collect_reward_button2.jpg");
 		if ( collectBtn ) {
 			var collectMonster = GM.GetValue('CollectMonster', ''); 			
			var preMonster = GM.GetValue('PreCollectMonster', '');
			var tryCount =  GM.GetValue('CollectTryCount', 0);
			if ( preMonster == collectMonster && tryCount >= 5 ) {
				GM.Log("Collect " + collectMonster + " failed!! try others");
				skipMonster += (collectMonster + '\n');
				GM.SetValue('CollectSkipList', skipMonster);
				GM.SetValue('PreCollectMonster', '');
				GM.SetValue('CollectTryCount', 0);		
			} else { 			
	    	GM.Log("Found collect reward button, click it");
				if ( preMonster == collectMonster ) {
					GM.SetValue('CollectTryCount', tryCount+1);
				} else {
					GM.SetValue('PreCollectMonster', collectMonster);
					GM.SetValue('CollectTryCount', 0);
				}	    	
				Zynga.Click(collectBtn, 5000);    	
	    	return true;    
	    }
    }
		
		// Check Monster On Image =================================================		
		if (!this.CheckForImage('tab_monster_list_on.gif'))
			return this.NavigateTo("keep,tab_monster_active");

		// Check For Completed Button =============================================
		var ss = document.evaluate(".//img[contains(@src,'dragon_list_btn_4')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var s = 0; s < ss.snapshotLength ; s++) {
			var monsterRow = ss.snapshotItem(s).parentNode.parentNode.parentNode.parentNode;
			if ( monsterRow == null )
				continue;
			var cancelBtn = this.CheckForImage('cancelButton.gif', monsterRow);
			if ( cancelBtn == null || cancelBtn == false)
				continue;
			GM.Log("Found cancel button, clear it!!");
			Zynga.Click(cancelBtn, 5000);
			return true;
		}
		
		// Check For Collect Reward Button ========================================
		ss = document.evaluate(".//img[contains(@src,'dragon_list_btn_2')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if ( ss.snapshotLength == 0 ) {
			GM.Log("No Any Collect button");
			GM.SetValue('AlreadyCollectReward', 1);
			return false;			
		}
		
		var monsterName = '';
		var skipMonsteList = skipMonster.split('\n');
		var button = null;			
		for ( var s = 0 ; s < ss.snapshotLength; s++ ) {
			var div = ss.snapshotItem(s).parentNode.parentNode.parentNode.parentNode;
			monsterName = nHtml.GetText(div).trim();
			monsterName = monsterName.replace('Completed!', '').trim().toLowerCase();
			
			var is_skip = 0;
			for(var sub = 0 ; sub < skipMonsteList.length ; sub++ ) {
				var chkName = skipMonsteList[sub].trim().toLowerCase();
				//GM.Log("chkName:"+chkName);
				if ( !chkName )
					continue;
				if ( chkName.length == 0 || chkName == '' )
					continue;
				if ( chkName == monsterName ) {
					is_skip = 1;
					break;
				}
			}
			if ( is_skip )
				continue;
			
			button = ss.snapshotItem(s).parentNode;			
			if (button)
				break;
		}
	
		if (button) {
			GM.Log("Collect " + monsterName);
			GM.SetValue('CollectMonster', monsterName);
			this.SetDivContent('fight_mess', 'Collect ' + monsterName);
			Zynga.Click(button, 5000);
			return true;
		}
		
		GM.Log("No Any Collect button");
		GM.SetValue('AlreadyCollectReward', 1);
		return false;
	},

	/////////////////////////////////////////////////////////////////////
	// ATTACKING MONSTERS
	/////////////////////////////////////////////////////////////////////	
	SetCheckedList:function() {
		var currentMonster = GM.GetValue('CurrentMonster','')
		if ( currentMonster.indexOf('http://') >= 0 ) {
			var monstChkedLink = GM.GetValue('MonsterCheckedLink','');
			var monstChkedLinkList = monstChkedLink.split(/[\n,]/);
			monstChkedLinkList += (currentMonster + '\n');
			GM.SetValue('MonsterCheckedLink', monstChkedLinkList);
		}				
	},
	
	SearhStaGroup:function(imgName) {
		var btnGroup = null;
		
		/* War Type */
		if ( this.CheckForImage('nm_button_tactics.gif') || 
		     this.CheckForImage('nm_button_tactics_grey.gif') ) {
			
			var ss = document.evaluate(".//img[contains(@src,'" + imgName + "')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			if ( ss.snapshotLength != 2 ) {
				//GM.Log("Button cost stamina image count failed!!");
				return null;
			}
			
			btnGroup = ss.snapshotItem(1);
		} else {	
			btnGroup = this.CheckForImage(imgName);			
		}
		
		return btnGroup;
	},
	
	SearchAtkButton:function() {
		var atkBtn = this.CheckForImage('attack_monster_button2.jpg');
		if ( !atkBtn )	atkBtn = this.CheckForImage('seamonster_power.gif');
		if ( !atkBtn )	atkBtn = this.CheckForImage('event_attack2.gif');	
		if ( !atkBtn )	atkBtn = this.CheckForImage('serpent_10stam_attack');	
		if ( !atkBtn )	atkBtn = this.CheckForImage('serpent_20stam_attack');	

		if ( atkBtn )
			return atkBtn;
		
		/* Found Stamina Group Box */
		var btnGroup = null;
		if ( this.stats.stamina.num >= 50 )
			btnGroup = this.SearhStaGroup('button_cost_stamina_50.gif');
		if ( !btnGroup && this.stats.stamina.num >= 20 )
			btnGroup = this.SearhStaGroup('button_cost_stamina_20.gif');
		if ( !btnGroup && this.stats.stamina.num >= 10 )
			btnGroup = this.SearhStaGroup('button_cost_stamina_10.gif');
		if ( !btnGroup && this.stats.stamina.num >= 5 )
			btnGroup = this.SearhStaGroup('button_cost_stamina_5.gif');
	
		if ( !btnGroup )
			return null;
			
		btnGroup = btnGroup.parentNode.parentNode;
		if ( !atkBtn )	atkBtn = this.CheckForImage('button_nm_p_power_attack.gif', btnGroup);	
		if ( !atkBtn )	atkBtn = this.CheckForImage('button_nm_p_bash.gif', btnGroup);	
		if ( !atkBtn )	atkBtn = this.CheckForImage('button_nm_p_stab.gif', btnGroup);	
		if ( !atkBtn )	atkBtn = this.CheckForImage('button_nm_p_bolt.gif', btnGroup);	
		if ( !atkBtn )	atkBtn = this.CheckForImage('button_nm_p_smite.gif', btnGroup);			

		if ( atkBtn == false )
			atkBtn = null;
			
		return atkBtn;
	},
	
	SearchEngButton:function() {
		var engBtn = this.CheckForImage('seamonster_fortify.gif');
		if ( !engBtn )	engBtn = this.CheckForImage('button_dispel.gif');
		if ( !engBtn )	engBtn = this.CheckForImage('attack_monster_button3.jpg');
		if ( !engBtn )	engBtn = this.CheckForImage('button_nm_s_fortify.gif');
		if ( !engBtn )	engBtn = this.CheckForImage('button_nm_s_dispel.gif');
																							
		if ( engBtn )
			return engBtn;
		
		var btnGroup = null;
		if ( this.stats.energy.num >= 100 )
			btnGroup = this.CheckForImage('button_cost_energy_100.gif');
		if ( !btnGroup && this.stats.energy.num >= 40 )
			btnGroup = this.CheckForImage('button_cost_energy_40.gif');
		if ( !btnGroup && this.stats.energy.num >= 20 )
			btnGroup = this.CheckForImage('button_cost_energy_20.gif');
		if ( !btnGroup && this.stats.energy.num >= 10 )
			btnGroup = this.CheckForImage('button_cost_energy_10.gif');
		
		if ( !btnGroup )
			return null;
			
		btnGroup = btnGroup.parentNode.parentNode;
		if ( !engBtn )	engBtn = this.CheckForImage('button_nm_s_strengthen.gif', btnGroup);	
		if ( !engBtn )	engBtn = this.CheckForImage('button_nm_s_cripple.gif', btnGroup);	
		if ( !engBtn )	engBtn = this.CheckForImage('button_nm_s_deflect.gif', btnGroup);	
		if ( !engBtn )	engBtn = this.CheckForImage('button_nm_s_heal.gif', btnGroup);	
		
		if ( engBtn == false )
			engBtn = null;
			
		return engBtn;
	},
	
	SearchClassType:function() {
		var btnImg = null;
	
		if ( !btnImg )	btnImg = this.CheckForImage('button_nm_s_strengthen.gif');
		if ( btnImg )		return 0;

		if ( !btnImg )	btnImg = this.CheckForImage('button_nm_s_cripple.gif');
		if ( btnImg )		return 1;
		if ( !btnImg )	btnImg = this.CheckForImage('button_nm_s_off_cripple.gif');
		if ( btnImg )		return 1;

		if ( !btnImg )	btnImg = this.CheckForImage('button_nm_s_deflect.gif');
		if ( btnImg )		return 2;
		if ( !btnImg )	btnImg = this.CheckForImage('button_nm_s_off_deflect.gif');
		if ( btnImg )		return 2;

		if ( !btnImg )	btnImg = this.CheckForImage('button_nm_s_heal.gif');
		if ( btnImg )		return 3;
		
		return -1;
	},

	Monster:function() {
		var atkBtn = null, engBtn = null;
		var classType = -1;
		
		if ( !this.WhileSinceDidIt('NoMonsterToAttack',60*5) )
			return false;
	
		//Check status ============================================================
		if ( !this.CheckStatsForMonster(5) && this.stats.energy.num < 10 ) {
			GM.Log("Return from check state");
			GM.SetValue('CurrentMonster', '');					
			return false;
		}
		
		if (this.SelectGeneral(GM.GetValue('MonsterMode','Monster')+'General')) {
			GM.SetValue('CurrentMonster', '');					
			return true;
		}
		
		// Check if on engage monster page ========================================
		var webSlice = null;
		var isBahamutSystem = 0;
		var isFestival = 0;
		if (!(webSlice=this.CheckForImage('dragon_title_owner.jpg'))) { 
			if ( (webSlice=this.CheckForImage('monster_header_')) ) {
			} else {
				if ( !webSlice ) webSlice = this.CheckForImage('festival_monsters_top_');
				if ( !webSlice ) {
					if ( !webSlice ) webSlice = this.CheckForImage('nm_bars.jpg');
					if ( !webSlice ) webSlice = this.CheckForImage('nm_bars_2.jpg');
				} else {
					isFestival = 1;
					GM.Log("Festival monster");		
				}
			}
		}	
				
		if ( this.CheckForImage('nm_bars.jpg') || this.CheckForImage('nm_bars2.jpg') ) {
				isBahamutSystem = 1;
				GM.Log("Bahamut System");		
		}
		
		var enterImg = null;
		if ( isBahamutSystem )
			enterImg = this.CheckForImage('battle_enter_battle.gif');
				
		atkBtn = this.SearchAtkButton();
		engBtn = this.SearchEngButton();
		classType = this.SearchClassType();
		//GM.Log("atkBtn:"+atkBtn+", engBtn:"+engBtn+",classType:"+classType);
		
		// Check if on engage monster page
		if ( webSlice && (atkBtn || engBtn || enterImg) ) {	
			var currentMonster = GM.GetValue('CurrentMonster',' ')
			var monsterName = nHtml.GetText(webSlice);
			var monstType = null;
			var monstOwnerID = null;
			var isTitleImageType = 0;
			var isAurora = 0;
			
			if ( this.CheckForImage('festival_monsters_top_') || this.CheckForImage('monster_header_') ) {
				isTitleImageType = 1;
				GM.Log("Image Title Type");						
			}			
			
			if ( isBahamutSystem ) {
				var monsterOwner = null;
				var tmpWebSlice = this.CheckForImage('nm_top.jpg');
				if ( !tmpWebSlice ) tmpWebSlice = this.CheckForImage('nm_top_2.jpg');
				if ( !tmpWebSlice )	tmpWebSlice = this.CheckForImage('monster_header_');
				if ( !tmpWebSlice )	tmpWebSlice = this.CheckForImage('festival_monsters_top_');
					
				if ( this.CheckForImage('monster_header_aurora.jpg') )
					isAurora = 1;
	
				if ( tmpWebSlice ) {
					monsterOwner = nHtml.GetText(tmpWebSlice);
//GM.Log("monsterOwner:" + monsterOwner);						
					monsterOwner = monsterOwner.substring(0,monsterOwner.indexOf("'s")+2).trim();
					monsterOwner += " ";
					monstOwnerID = tmpWebSlice.innerHTML;
					monstOwnerID = monstOwnerID.substring(monstOwnerID.indexOf('<img uid="')+10);
					monstOwnerID = monstOwnerID.substring(0, monstOwnerID.indexOf('"')); 
					GM.Log("monstOwnerID:" + monstOwnerID);	
				}
				
				monsterName = monsterOwner + monsterName.substring(0,monsterName.indexOf("'s Life")).trim();
				monstType = monsterName.substring(0,monsterName.indexOf(", ")).trim();
			} else {
				if ( isTitleImageType ) {
					var tmpWebSlice = this.CheckForImage('monster_health_back.jpg');
					monsterName = nHtml.GetText(tmpWebSlice);
					monsterName = monsterName.substring(0,monsterName.indexOf("'s Life")).trim();		
					monsterName = monsterName.replace('The ','');	
					monstType = /\w+$/i.exec(monsterName.trim());
				} else {
					monsterName = monsterName.substring(0,monsterName.indexOf('You have (')).trim();			
					monstType = /\w+$/i.exec(monsterName.trim());
				}
							
				if (!(playerName = GM.GetValue('PlayerName',''))) return this.NavigateTo('keep');
				if (monsterName.indexOf(playerName + "'s")>=0)
					monsterName = monsterName.replace(/^.+'s/i,'Your');
				
				GM.Log("monsterName:" + monsterName + ", monstType:" + monstType);						
			}
				
			if ( currentMonster.indexOf("http://") < 0 && currentMonster != monsterName)
				GM.Log("Monster name not recognized:" + currentMonster +  " Actual Name: " + monsterName + " Back to select screen.");
			
			// Check for eng stat
			var fort = 0, partyStrength = 0, stun = 0;
			var img;
			if ( monstType=="Deathrune" ) {
				img=this.CheckForImage('bar_dispel');
				if ( img ) {
					var manaHealth = img.parentNode.style.width;
					manaHealth = manaHealth.substring(0,manaHealth.length-1);
					manaHealth = 100 - Number(manaHealth);
					fort = (Math.round(manaHealth*10)) / 10;
				} else {
					fort = 100.0;
				}			
			} else if ((img=this.CheckForImage('bar_dispel'))) {
					var manaHealth = img.parentNode.style.width;
					manaHealth = manaHealth.substring(0,manaHealth.length-1);
					manaHealth = 100 - Number(manaHealth);
					fort = (Math.round(manaHealth*10)) / 10;
			} else if ((img=this.CheckForImage('seamonster_ship_health'))) {
				var shipHealth = img.parentNode.style.width;
				shipHealth = shipHealth.substring(0,shipHealth.length-1);
				if (monstType == "Legion" || monstType == 'Elemental') {
					if ((img = this.CheckForImage('repair_bar_grey'))) {
						var extraHealth = img.parentNode.style.width;
						extraHealth = extraHealth.substring(0,extraHealth.length-1);
						shipHealth = Math.round(Number(shipHealth) * (100/(100 - Number(extraHealth))));
					}
				}
				fort = (Math.round(shipHealth*10)) / 10;
			} else if ((img=this.CheckForImage('nm_green.jpg'))) {
				partyStrength = img.parentNode.parentNode.style.width;
				partyStrength = parseFloat(partyStrength.substring(0,partyStrength.length-1));
				partyStrength = (Math.round(partyStrength*10)) / 10;
				
				var partyHealth = img.parentNode.style.width;			
				partyHealth = partyHealth.substring(0,partyHealth.length-1);
				//partyHealth = Math.round(Number(partyStrength/100) * partyHealth);
				fort = (Math.round(partyHealth*10)) / 10;
				
				if (img=this.CheckForImage('nm_stun_bar.gif')) {
					stun = img.style.width;
					stun = parseFloat(stun.substring(0, stun.length-1));
					stun = (Math.round(stun*10)) / 10;
				}
			}		
			
			if ( isBahamutSystem && engBtn )		
				GM.Log("classType:" + classType	+ ", fort:" + fort + "%, partyStrength:" + partyStrength + "%, stun:" + stun + "%" );
			else if ( engBtn )		
				GM.Log("fort:" + fort + "%" );
			
			if ( isBahamutSystem && enterImg ) {
				if ( !this.CheckStatsForMonster(5) ) {
					GM.Log("No enough stamina, go to next monster");					
					this.SetCheckedList();
					this.NavigateTo('keep, dragon_view_more.gif');
					return true;
				}
				
				if ( !monstOwnerID || monstOwnerID == '' ) {
					GM.Log("Can't found monster owner ID, go to next monster");					
					this.SetCheckedList();
					this.NavigateTo('keep, dragon_view_more.gif');
					return true;
				}
				
				var usedClass = (GM.GetValue('PreUsedClass',0) + 1) % 5;
				var recordClass = usedClass;
				if ( usedClass == 0 && partyStrength >= 100 ) 
					usedClass = 3;
				else if ( usedClass == 3 && partyStrength <= 90 ) 
					usedClass = 0;
				else if ( usedClass == 4 )
					usedClass = 3;
					
				if ( GM.GetValue('ClericOnly',0) )
					usedClass = 3;
				
				var usedClassName = 'cleric';
				if ( usedClass == 0 ) usedClassName = 'warrior';
				if ( usedClass == 1 ) usedClassName = 'rogue';
				if ( usedClass == 2 ) usedClassName = 'mage';
				if ( usedClass == 3 ) usedClassName = 'cleric';
				
				GM.Log("Enter " + monstType + "! use class:" + usedClassName);
				GM.SetValue('PreUsedClass', recordClass);
				GM.SetValue('bqh', this.bqh);
				GM.SetValue('CurrentMonster', monsterName);
				
				var mpool = monstType.indexOf('Azriel') >= 0 ? 1 : 3; 
				if ( isAurora )
					mpool = 1;
					
				var monsterPage = 'battle_monster.php';
				if ( isFestival )
					monsterPage = 'festival_battle_monster.php';
					
				var selClssURL = 'http://apps.facebook.com/castle_age/' + monsterPage + '?user=' + monstOwnerID + '&mpool=' + mpool + '&action=pickClass&class=' + usedClassName + '&bqh=' + this.bqh;
				Zynga.VisitUrl(selClssURL, 60*1000);
				return true;
			}
			
			GM.SetValue('MonsterMode', 'Monster');
			if (this.SelectGeneral(GM.GetValue('MonsterMode')+'General')) 
				return true;
			
			if ( engBtn && isBahamutSystem && this.stats.energy.num >= 10 ) {
				var doClassSecondary = 0;
				if ( classType == 0 ) {
					if ( partyStrength < 100 || fort < 100 )	doClassSecondary = 1;
				} else if ( classType == 1 || classType == 2 ) {
					if ( stun < 100 )	doClassSecondary = 1;
				} else if ( classType == 3 ) {
					if ( fort < 100 )	doClassSecondary = 1;
				}
				
				if ( doClassSecondary ) {
					GM.Log("ClassSecondary " + monsterName);
					Zynga.Click(engBtn, 3500);
					return true;
				}
			} else if ( engBtn && this.stats.energy.num >= 10 && fort < 100 ) {
					GM.Log("Do fortify, " + monsterName);
					Zynga.Click(engBtn, 3500);
					return true;
			}
			
			var noAtkFort = GM.GetValue('MinShipHealthToAttack', 0);
			if ( (engBtn || isBahamutSystem) && fort < noAtkFort ) {
				GM.Log("Define <= " + noAtkFort + "% !!, goto next monster!!");
			} else if ( engBtn && this.stats.stamina.num < 5 && this.stats.energy.num >= 10 ) {
				GM.Log("sta < 5, eng >= 10, goto next monster");
			} else if ( !atkBtn ) {
				GM.Log("No Atk Button!!, goto next monster!!");
			} else if ( this.stats.stamina.num >= 5 ) {
				GM.Log("Attack " + monsterName);
				Zynga.Click(atkBtn, 3500);
				return true;
			}				
		}	
			
	
		// Check Monster Link List ================================================
		this.SetCheckedList();
		
		if ( this.stats.energy.num < 10 && this.stats.stamina.num < 5 )
				return false;
				
		GM.Log('Checking monster link');
		this.SetDivContent('fight_mess', 'Checking monster link.');
		
		var monstLink = GM.GetValue('AttackOrder','') + '\n';
		var monstChkedLink = GM.GetValue('MonsterCheckedLink','');
		var monstLinkList = monstLink.split(/[\n,]/);
		var monstChkedLinkList = monstChkedLink.split(/[\n,]/);
		GM.Log('MonstChkedLinkList:' + monstChkedLinkList);

		for(var m = 0 ; m < monstLinkList.length ; m++ ) {
			var chkLink = monstLinkList[m].trim().toLowerCase();
			if ( chkLink.length == 0 || chkLink == '' )
				continue;
			if ( chkLink.indexOf("http://") < 0 )
				continue;
				
			var alreadyChecked = 0;
			for(var chkedLink in monstChkedLinkList) {
				if ( chkLink == monstChkedLinkList[chkedLink] ) {
					GM.Log("Already checked this link");
					alreadyChecked = 1;
					break;
				}
			}
			if ( alreadyChecked )
				continue;
			
			GM.Log("Opening " + chkLink);
			GM.SetValue('bqh', this.bqh);
			GM.SetValue('CurrentMonster', chkLink);
			Zynga.VisitUrl(chkLink, 60*1000);
			return true;
		}
		GM.SetValue('CurrentMonster', '');	
		
		//if ( fightEnable	) {
			GM.Log("All link checked, no available monster");
			this.ForceSetStaReq( parseInt(this.stats.stamina.num)+10 );
			return false;
		//}

		// Cechk Monster On Image =================================================		
		if (!this.CheckForImage('tab_monster_on.jpg'))
			return this.NavigateTo("keep,battle_monster");
		
		// Check For Monster Page =================================================
		// search for ENGAGE button specifically, not "collect reward" button... 
		// user can do that manually
		var ss=document.evaluate(".//img[contains(@src,'dragon_list_btn_3')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if ( ss.snapshotLength==0 ) {
			GM.Log("No engage button");
			this.NavigateTo('keep');
			this.JustDidIt('NoMonsterToAttack');
			return false;
		}
	
		// Select Monster Page ====================================================
		var button = null;
		var pref = GM.GetValue('AttackOrder','') + ",your,'";
						
		GM.Log('Searching for anything available');
		this.SetDivContent('fight_mess', 'Searching for anything available.');
		
		var prefList = pref.split(/[\n,]/);
		GM.Log('prelist ' + prefList);
		for(var p in prefList) {
			var chkItem = prefList[p].trim().toLowerCase();
			if ( chkItem.indexOf("http://") >= 0 )
				continue;
			
			for(var s=0; s<ss.snapshotLength; s++) {
				var div=ss.snapshotItem(s).parentNode.parentNode.parentNode.parentNode;
				monsterName=nHtml.GetText(div).trim();

				var monstMatch = (monsterName.toLowerCase().indexOf(chkItem)>=0)
				if ( monstMatch ) {
					button = ss.snapshotItem(s).parentNode;
					GM.Log("Found monster. Name:" + monsterName + " Word: " + prefList[p]);
					break;
				}
			} 
			
			if (button) 
				break;
		}
	
		GM.Log("Opening " + monsterName);
		if (button) {
			var user = button.href.match(/user=\d+/i);
			if (user) this.monsterID = String(user).substr(5);
			else this.monsterID = null;
			var mpool = button.href.match(/mpool=\d+/i);
	
			if (mpool) this.monsterPool = Number(String(mpool).substr(6));
			else this.monsterPool = null;
	
			GM.SetValue('CurrentMonster', monsterName);
			this.SetDivContent('fight_mess', 'Attacking ' + monsterName);
			Zynga.Click(button, 5000);
			return true;
		} else {
			this.JustDidIt('NoMonsterToAttack');
			//GM.Log("Oops. Button not there for " + monsterName);
			GM.Log("No Monster to attack");
			return false;
		}
	},
	
	/////////////////////////////////////////////////////////////////////
	// COMMON FIGHTING FUNCTIONS
	/////////////////////////////////////////////////////////////////////
	Fight:function() {
		if ( GM.GetValue("EnableArena",0) ) {
			if ( this.Arena() ) {
				this.CheckLastAction('Arena');
				return true;
			}
		}
				
		if(GM.GetValue('WhenFight','') != 'Never') {
			if (this.Battle()) {
				this.CheckLastAction('Fight');
				return true;
			}
			
			var monsterEnable = ( GM.GetValue('WhenMonster','') == 'Never' ) ? false : true;		
			if ( !monsterEnable )		
				return false;
		}
	
		// monsters usually take priority
		if(GM.GetValue('WhenMonster','Never') != 'Never') {
			if (this.Monster()) {
				this.CheckLastAction('Monster');
				return true;
			}
		}
		return false;
	},

	CheckStatsForAutoAct:function(minSta, isFight) {
		var whenActKey = (isFight) ? 'WhenFight' : 'WhenMonster';
		var whenAct = GM.GetValue(whenActKey,'');
		if (whenAct == 'Never') {
			this.SetDivContent('fight_mess', '');
			return false;
		}
	
		if(!this.stats.stamina || !this.stats.health) {
			this.SetDivContent('fight_mess','Health or stamina not known yet.');
			return false;
		}
	
		if(this.stats.health.num < 10) {
			this.SetDivContent('fight_mess',"Need health: " + this.stats.health.num + "/10");
			return false;
		}
			
		if ( this.stats.stamina.num >= minSta) 
			return true;
		
		this.SetDivContent('fight_mess','Waiting for sta: ' + this.stats.stamina.num + "/" + minSta);
		return false;
	},

	CheckStatsForAutoFight:function(attackMinStamina) {
		return this.CheckStatsForAutoAct(attackMinStamina, 1);
	},
	
	CheckStatsForMonster:function(attackMinStamina) {
		return this.CheckStatsForAutoAct(attackMinStamina, 0);
	},

	/////////////////////////////////////////////////////////////////////
	// BANK
	/////////////////////////////////////////////////////////////////////
	Bank:function() {
		var maxInCash=this.GetNumber('MaxInCash');
		var minInCash=this.GetNumber('MinInCash');
		if (minInCash=='') minInCash=0;
	
		if(maxInCash=="" || this.stats.cash<=minInCash || this.stats.cash<maxInCash) {
			return false;
		}
	
		//Temp if (this.SelectGeneral('BankingGeneral')) return true;
	
		if(!(depositButton = this.CheckForImage('btn_stash.gif'))) {
			return this.NavigateTo('keep');
		}
	
		var depositForm = depositButton.form;
	
		var numberInput=nHtml.FindByAttrXPath(depositForm,'input',"@type='' or @type='text'");
		if(numberInput) {
			numberInput.value=parseInt(numberInput.value)-minInCash;
		} else {
			GM.Log('Cannot find box to put in number for bank deposit.');
			return false;
		}
	
		GM.Log('Depositing into bank');
		this.Click(depositButton);
		
		if (nHtml.FindByAttrContains(document.body,"div","class",'result').innerHTML) {
			if (nHtml.FindByAttrContains(document.body,"div","class",'result').firstChild.data.indexOf("You have stashed") < 0) 
				return true;
		}
	  GM.Log('Cannot find deposited value.');
	
		return false;
	},
	
	RetrieveFromBank:function(num){
		if ( num <= 0 )
			return false;
			
		var inStore = parseInt(GM.GetValue('inStore'));
		if ( num > inStore ) {
			GM.Log("Retrieve[" + num + "] > In store money [" + inStore + "]");
			return false;
		}
			
		var retrieveURL = 'http://apps.facebook.com/castle_age/keep.php?do=Retrieve&get_gold=' + num + '&bqh=' + this.bqh;
		GM.Log('Retriving ' + num + 'from bank');
		Zynga.VisitUrl(retrieveURL, 5000);
		return true;
	},

	/////////////////////////////////////////////////////////////////////
	// HEAL
	/////////////////////////////////////////////////////////////////////
	GetBqh:function() {
		var recBqh = GM.GetValue('bqh', this.bqh);
		if ( recBqh && recBqh != '' ) {
			this.bqh = recBqh;
			GM.SetValue('bqh', '');		
			return;
		}
		
		var keepMainSection = nHtml.FindByAttrContains(document.body, "div", "class", "keep_main_section");
		if ( !keepMainSection ) {
			Zynga.VisitUrl("http://apps.facebook.com/castle_age/keep.php");				
			return true;
		}
		
		this.bqh = "";
		var bqhElement = document.evaluate(".//input[contains(translate(@name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'bqh')]",document.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	  if (bqhElement && bqhElement.singleNodeValue) { 
	  	this.bqh = bqhElement.singleNodeValue.value.toString(); 
	  }	
	
	  GM.Log("bqh:" + this.bqh); 
	},

	Heal:function() {
		this.SetDivContent('heal_mess','');
		var whenFight = GM.GetValue('WhenFight','');
		var minToHeal=this.GetNumber('MinToHeal');
		if(minToHeal=="") return false;
		var minStamToHeal=this.GetNumber('MinStamToHeal');
		if(minStamToHeal=="") minStamToHeal = 0;
	
		if(!this.stats.health) return false;
	
		if (whenFight != 'Never') {
			if ((false || this.stats.stamina.num >= this.stats.stamina.max) && this.stats.health.num < 10) {
				GM.Log('Heal');
				return this.NavigateTo('keep,heal_button.gif');
			}
		}
		
		var preHealMode = 0;
		if ( this.stats.health.num > 55 )
			GM.SetValue('alreadyPreHeal', 0);
		if ( this.stats.health.num <= 55 && this.stats.health.num > minToHeal && 
				 this.stats.stamina.num >= minStamToHeal ) 
		{
			var alreadyPreHeal = GM.GetValue('alreadyPreHeal', 0);
			if ( !alreadyPreHeal ) {
				preHealMode = 1;
				GM.SetValue('alreadyPreHeal', 1);
			}
		}
		
		if ( !preHealMode ) {
			if(this.stats.health.num>=this.stats.health.max || this.stats.health.num>minToHeal) 
				return false;
		
			if(this.stats.stamina.num < minStamToHeal) {
				this.SetDivContent('heal_mess','Waiting for stamina to heal: '+this.stats.stamina.num +'/'+minStamToHeal );
				return false;
			}
		}

		var use_bqh = 0;		
		if ( nHtml.FindByAttrContains(document.body,'span','class','positive') || 
				 nHtml.FindByAttrContains(document.body,'span','class','negative') ) {
			use_bqh = 1;
		} else if ( this.CheckForImage('dragon_title_owner.jpg') || this.CheckForImage('nm_bars.jpg') ) {
			use_bqh = 1;
		}
	
		if ( use_bqh && this.bqh != "" ) {
			GM.Log('Heal using Bqh[' + this.bqh + ']');
			var healURL = "http://apps.facebook.com/castle_age/keep.php?action=heal_avatar&bqh=" + this.bqh;
			if ( !preHealMode )
				GM.SetValue('AngWaitHealTab', 1);
			GM_openInTab(healURL)
			
			if ( preHealMode )
				return false;
			else
				return true;
		} else {
			GM.Log('Heal');
			return this.NavigateTo('keep,heal_button.gif');
		}
	},

	/////////////////////////////////////////////////////////////////////
	// PASSIVE GENERALS
	/////////////////////////////////////////////////////////////////////
	PassiveGeneral:function() {
		return this.SelectGeneral('IdleGeneral')
	},

	////////////////////////////////////////////////////////////////////
	// Auto Stat
	////////////////////////////////////////////////////////////////////
	IncreaseStat:function(attribute,attrAdjust){
	
		switch (attribute) {
			case "energy"		: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','energy_max'); 	break;
			case "stamina"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','stamina_max'); break;
			case "attack"		: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','attack'); 			break;
			case "defense"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','defense'); 		break;
			case "health"		: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','health_max'); 	break;
			default : 
				GM.Log("Unable to identify attribute " + attribute);
				return "Fail";
		}
		
		if (!button) {
			GM.Log("Unable to locate upgrade button for " + attribute);
			return "Fail";
		}	
	
		attrCurrent = parseInt(button.parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));	
		var energy = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','energy_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
		var stamina = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','stamina_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
		var attack = 0;
		var defense = 0;
		var health = 100;
		var level = this.stats.level;
		
		if ( level >= 10 ) {
			attack	= parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','attack').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
			defense	= parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','defense').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
			health	= parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','health_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
		}
		
		if(nHtml.FindByAttrContains(document.body,'div','id','app46755028429_AjaxLoadIcon').style.display=='none') {
			if(!GM.GetValue('AutoStatAdv',false)){
				if (attrAdjust > attrCurrent) {
					if ((attribute == 'stamina') && (this.statsPoints < 2)) {
						GM.SetValue("SkillPointsNeed",2)
						return "Fail";
					} else GM.SetValue("SkillPointsNeed",1)		
					GM.Log("Status Before:  " + attribute + "=" + attrCurrent + " Adjusting To: " + attrAdjust) 
					this.Click(button); 
					return "Click";
				} else return "Next";
			} else {
				//Using eval, so user can define formulas on menu, like energy = level + 50
				if (eval(attrAdjust) > attrCurrent) {
					if ((attribute == 'stamina') && (this.statsPoints < 2)) {
						GM.SetValue("SkillPointsNeed",2)
						return "Fail";
					} else GM.SetValue("SkillPointsNeed",1)				
					GM.Log("Status Before:  " + attribute + "=" + attrCurrent + " Adjusting To: (" + attrAdjust + ")=" + eval(attrAdjust)) 
					this.Click(button); 
					return "Click";
				} else return "Next";
			}
		} else {
			GM.Log("Unable to find AjaxLoadIcon?")
			return "Fail"
		}	
		
		// Realy shouldn't make it here 
		GM.Log("Somethings not right.") 	
		return "Fail";
	},
	
	AutoStat:function(){
		if(!GM.GetValue('AutoStat'))return false;
		
		var content=document.getElementById('content');
		if(!content) { return false; }
		var a=nHtml.FindByAttrContains(content,'a','href','keep.php');
		if(!(this.statsPoints = a.firstChild.firstChild.data.replace(/[^0-9]/g,''))) return false; //GM.Log("Dont have any stats points");
	
		if (this.statsPoints < GM.GetValue("SkillPointsNeed",1)) return false;
		
		if(!(atributeSlice = nHtml.FindByAttrContains(document.body,"div","class",'keep_attribute_section'))) {
			this.NavigateTo('keep');
			return true;
		}	
		this.CheckLastAction('Upgrade Skill Points'); 
		
		for (var n=1; n<=5; n++) {
			if (GM.GetValue('Attribute' + n,'') != '') {
				switch (this.IncreaseStat(GM.GetValue('Attribute' + n,''),GM.GetValue('AttrValue' + n,0))) {
					case "Next"	:	continue;
					case "Click":	return true; 
					default		:	return false;
				}
			} else return false;
		}
	
		return false;			
	},
	
	////////////////////////////////////////////////////////////////////
	// Variables
	////////////////////////////////////////////////////////////////////
	currentPage:"",
	currentTab:"",
	waitMilliSecs:5000,
	bqh:"",
	waitHealCount:0,
	waitBlessCount:0,
	
	/////////////////////////////////////////////////////////////////////
	//							MAIN LOOP
	// This function repeats continously. In principle, functions should 
	// only make one click before returning back here.
	/////////////////////////////////////////////////////////////////////
	MainLoop:function(runMode) {
		//***************************************************************************
		//Bless Tab	
		//***************************************************************************
		if ( location.href.indexOf('symbolquests.php?action=tribute&symbol=') >= 0 ) {
			//GM.Log("In Bless Tab");
			GM.SetValue('AngWaitBlessTab', 0);
			window.open('', '_self', '');
	    window.close();	
	    return;
		}
		
		//***************************************************************************
		//Heal Tab	
		//***************************************************************************
		if ( location.href.indexOf('action=heal_avatar&bqh=') >= 0 ) {
			//GM.Log("In Heal Tab");
			GM.SetValue('AngWaitHealTab', 0);
			window.open('', '_self', '');			
	    window.close();	
	    return;
		}

		//***************************************************************************
		//Check Error
		//***************************************************************************
		var href=location.href;
		if(href.indexOf('/common/error.html')>=0) {
			GM.Log('detected error page, waiting to go back to previous page.');
			window.setTimeout(function() { window.history.go(-1);	}, 30*1000);
			return;
		}
	
		if(document.getElementById('try_again_button')) {
			GM.Log('detected Try Again message, waiting to reload');
			window.setTimeout(function() { window.history.go(0); }, 30*1000);
			return;
		}
	
		//***************************************************************************
		//Set Div & Get player stats
		//***************************************************************************
		this.SetupDivs();
		if (!this.GetStats()) {
		 	this.WaitMainLoop(runMode);
			return;
		}
		
		if ( this.needReload ) {
			window.setTimeout(function() { 
					window.history.go(0); 
					}, 5*1000);
			return;		
		}
		
		//***************************************************************************
		//Show controls
		//***************************************************************************
		this.SetControls();
		this.CheckResults();
	
		//***************************************************************************
		//
		//***************************************************************************
		if( GM.GetValue('Disabled',false) ) {
			this.WaitMainLoop(runMode);
			return;
		}
		
		//***************************************************************************
		// Wait Bless
		//***************************************************************************
		this.waitMilliSecs=5000;	
		if ( runMode == 'WaitBless' ) {
			GM.Log("In Wait Bless, count=" + this.waitBlessCount);
			if ( this.waitBlessCount < 10 ) {
				if ( GM.GetValue('AngWaitBlessTab', 0) ) {
					this.waitMilliSecs=2000;
					this.waitBlessCount++;
					this.WaitMainLoop('WaitBless');
				} else {
					this.waitMilliSecs=1000;
					this.waitBlessCount = 0;
					this.WaitMainLoop('');
				}			
				return;
			}
		}
		this.waitBlessCount = 0;		
		
		//***************************************************************************
		// Wait Heal
		//***************************************************************************
		this.waitMilliSecs=5000;	
		if ( runMode == 'WaitHeal' ) {
			GM.Log("In Wait Heal, count=" + this.waitHealCount);
			this.stats.health.num = 100;
			if ( this.waitHealCount < 10 ) {
				if ( GM.GetValue('AngWaitHealTab', 0) ) {
					this.waitMilliSecs=2000;
					this.waitHealCount++;
					this.WaitMainLoop('WaitHeal');
					return;
				} else {
					GM.SetValue('AngEngPkgDelay', 0);
				}			
			}
		}
		this.waitHealCount = 0;
	
		if ( this.bqh == "" )
			this.GetBqh();			
	
		if( this.Heal()	) 	{
			this.CheckLastAction('Heal');
			if ( GM.GetValue('AngWaitHealTab',0) ) {
				this.WaitMainLoop('WaitHeal');
				return;		
			}
			GM.SetValue('CurrentMonster', '');
		} else if( this.AutoStat()		) {
			this.CheckLastAction('Upgrade Skill Points');
			GM.SetValue('CurrentMonster', '');
		} else if(this.AutoBless()	) {
			this.CheckLastAction('AutoBless');
			if ( GM.GetValue('AngWaitBlessTab',0) ) {
				this.WaitMainLoop('WaitBless');
				return;		
			}
			
			GM.SetValue('CurrentMonster', '');
		} else if( this.CollectReward() ) {
			this.CheckLastAction('Collect Reward');
			GM.SetValue('CurrentMonster', '');
		} else if( this.Fight() ) {
			//this.CheckLastAction('Fight');
		} else if( this.Quests()		) {
			this.CheckLastAction('Quests');
			GM.SetValue('CurrentMonster', '');
		} else if( this.Bank()		) {
			this.CheckLastAction('Bank');
			GM.SetValue('CurrentMonster', '');
		} else if( this.PassiveGeneral()	) {
			this.CheckLastAction('Setting Idle General');
			GM.SetValue('CurrentMonster', '');
		} else {
			var fightEnable = ( GM.GetValue('WhenFight','') == 'Never' ) ? false : true;
			var monsterEnable = ( GM.GetValue('WhenMonster','') == 'Never' ) ? false : true;		
			var questEnable = ( GM.GetValue('WhenQuest','')=='Never' ) ? false : true;
			GM.Log("fightEnable:" + fightEnable + ", monsterEnable:" + monsterEnable + ", questEnable:" + questEnable);
		
			if ( fightEnable && monsterEnable && !questEnable ) {
				this.ForceSetEngReq( parseInt(this.stats.energy.num)+10 );
			} else if ( fightEnable && !monsterEnable && !questEnable ) {
				this.ForceSetEngReq( parseInt(this.stats.energy.num)+10 );
			}
			
			this.CheckLastAction('Idle');
			GM.SetValue('CurrentMonster', '');
		}
		
		this.WaitMainLoop('');
	},
	
	WaitMainLoop:function(runMode) {
		this.waitForPageChange=true;
		var AngEngPkgDelay = GM.GetValue('AngEngPkgDelay', 0);
		var alreadyPreHeal = GM.GetValue('alreadyPreHeal', 0);
		if ( alreadyPreHeal )
			this.waitMilliSecs=4000;
		else if ( AngEngPkgDelay > 45 )
			this.waitMilliSecs=2000;
		else if ( AngEngPkgDelay > 25 )
			this.waitMilliSecs=3500;
		else if ( AngEngPkgDelay > 0 )
			this.waitMilliSecs=5000;
			
		GM.SetValue('AngEngPkgDelay', 0);	
		nHtml.setTimeout(function() { this.waitForPageChange=false; Zynga.MainLoop(runMode); },this.waitMilliSecs);
	},
	
	ReloadOccasionally:function() {
		if ( location.href.indexOf('action=heal_avatar&bqh=') >= 0 )
			return;
			
		GM.SetValue('ZyngaPause','none')
		nHtml.setTimeout(function() {
			// better than reload... no prompt on forms!
			if (window.location.href.indexOf('castle_age') >= 0 && !GM.GetValue('Disabled')) {
				GM.SetValue('bqh', '');	
				window.location = "http://apps.facebook.com/castle_age/index.php?bm=1";
				GM.Log('Page reloaded');
			}
			Zynga.ReloadOccasionally();
		}, 1000*60*4 + (3 * 60 * 1000 * Math.random()));
	}
};

window.setTimeout(function() {Zynga.MainLoop();},500);
Zynga.ReloadOccasionally();

// ENDOFSCRIPT