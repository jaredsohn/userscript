// ==UserScript==
// @name           War Machine Autoplayer
// @namespace      zynga
// @description    Auto player for zynga's war machine game
// @version        04
// @include        http*://apps.*facebook.com/war_machine/*
// @include        http://www.facebook.com/common/error.html
// @include        http://*facebook.com/reqs.php*confirm_118674881342_0
// @include        http://www.facebook.com/home.php
// @include        http://www.facebook.com/home.php*filter=app_118674881342*
// ==/UserScript==
var thisVersion = 04;
var changeLogURL= 'http://userscripts.org/scripts/discuss/57917';
var debug=false;
var newVersionAvailable=0;

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	};

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
	};

	GM_log = function(message) {
		console.log(message);
	};

	 GM_registerMenuCommand = function(name, funk) {
	//todo
	};

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	};
	
	if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }

	
}

if(!GM_log) {
	GM_log=console.debug;
}

if (parseInt(GM_getValue('SUC_remote_version',0)) > thisVersion) {
	newVersionAvailable=1;
}

// update script from: http://userscripts.org/scripts/review/57917
var SUC_script_num = 66313;
try{ function updateCheck(forced) {
	if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*1) <= (new Date().getTime()))) {
		try {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(resp){
					var remote_version, rt, script_name;
					rt=resp.responseText;
					GM_setValue('SUC_last_update', new Date().getTime()+'');
					remote_version=parseInt(/@version\s*(.*?)\s*$/m.exec(rt)[1]);
					script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
					GM_setValue('SUC_target_script_name', script_name);
					GM_setValue('SUC_remote_version', remote_version);
					GM_log('remote version ' + remote_version);
					if (remote_version > thisVersion) {
						newVersionAvailable=1;
						if (forced) {
							if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
								GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
							}
						}
					} else if (forced) alert('No update is available for "'+script_name+'."');
				}
			});
		}catch (err) {
			if (forced) alert('An error occurred while checking for updates:\n'+err);
		}
	}
     }
     GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});
     updateCheck(false);
} catch(err) {}



String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

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
},
Goback:function (value) {
	history.go(value);
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
	list = GM_getValue(Zynga.GameName()+"__"+n,v);
	if (!list) return list;
	list = list.split('~');
	if (!GM.IsArray(list)) list[0] = list;
	return list;
},
ListAddBefore:function(listName,addList) {
	newList = GM.GetList(listName,'');
	if (!newList) {
		newList = addList;
	} else newList = addList.concat(newList);
	GM.SetList(listName,newList);
	return newList;
},
ListPop:function(listName) {
	list = GM.GetList(listName,'');
	if (!list) return '';
	popItem = list.pop();
	GM.SetList(listName,list);
	return popItem;
},
ListPush:function(listName,pushItem) {
	list = GM.GetList(listName,'');
	if (list) list.push(pushItem);
	else list = pushItem;
	GM.SetList(listName,list);
	return list;
}

};

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
rankRe:new RegExp(',\\s*level\\s*:?\\s*[0-9]+\\s+([a-z ]+)','i'),
armyRe:new RegExp('Alliance \\s*\\[?([0-9]+)','i'),
statusRe:new RegExp('([0-9\\,]+)\\s*/\\s*([0-9\\,]+)','i'),
htmlJunkRe:new RegExp("\\&[^;]+;","g"),
energyRe:new RegExp("([0-9]+)\\s+(energy)","i"),
gameNameRe:new RegExp("^/([^/]+)/"),
experienceRe:new RegExp("\\+([0-9]+)"),
influenceRe:new RegExp("([0-9]+)%"),
gainLevelRe:new RegExp("gain\\s+level\\s+([0-9]+)\\s+in","i"),
moneyRe:new RegExp("\\$([0-9,]+)\\s*-\\s*\\$([0-9,]+)","i"),
firstNumberRe:new RegExp("([0-9]+)"),
gameName:null,

GameName:function() {
	return 'war_machine';
},

/////////////////////////////////////////////////////////////////////

//							UTILITY FUNCTIONS

// Small functions called a lot to reduce duplicate code

/////////////////////////////////////////////////////////////////////

NavigateTo:function(pathToPage,imageOnPage) {
	var content=document.getElementById('content');
	if(!content) { return false; }
	if (imageOnPage && this.CheckForImage(imageOnPage)) return false;

	var pathList = pathToPage.split(",");
	for(var s=pathList.length-1; s>=0; s--) {
		var a=nHtml.FindByAttrContains(content,'a','href',pathList[s] + '.php');
		if (a) {
			GM.Log('Go to ' + pathList[s]);
			Zynga.Click(a);
			return true;
		}
		var a=nHtml.FindByAttrContains(content,'a','href', pathList[s] + '=1');
		if (a) {
			GM.Log('Go to ' + pathList[s]);
			Zynga.Click(a);
			return true;
		}
		var a=nHtml.FindByAttrContains(content,'a','href', 'page=' + pathList[s]);
		if (a) {
			GM.Log('Go to ' + pathList[s]);
			Zynga.Click(a);
			return true;
		}
		var input = nHtml.FindByAttrContains(document.body,"input","clickrewriteform", pathList[s] );
		if (input) {
			GM.Log('Click on form ' + input.src.match(/[a-zA-Z._]+$/));
			Zynga.Click(input);
			return true;
		}
		var input = nHtml.FindByAttrContains(document.body,"img","src", pathList[s] );
		if (input) {
			GM.Log('Click on image ' + input.src.match(/[a-zA-Z._]+$/));
			Zynga.Click(input);
			return true;
		}
	}
	return false;
},

CheckForImage:function(image,webSlice) {
	if (!webSlice) {
		webSlice=document.body;
	}
	if (imageSlice = nHtml.FindByAttrContains(webSlice,'input','src',image)) {
		return imageSlice;
	}
	if (imageSlice = nHtml.FindByAttrContains(webSlice,'img','src',image)) {
		return imageSlice;
	}
	if (imageSlice = nHtml.FindByAttrContains(webSlice,'div','style',image)) {
		return imageSlice;
	}
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
// Returns true if timer is passed, or undefined
CheckTimer:function(name) {
	nameTimer = GM.GetValue(name);
	if (!nameTimer) return true;
	var now = new Date().getTime();
	return (nameTimer < now);
},

FormatTime:function(time) {
	return time.toDateString().match(/^\w+ /) + time.toLocaleTimeString().replace(/:\d+ /i,' ').replace(/:\d+$/i,'');
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
	now += time*1000;
	GM.SetValue(name, now.toString());
},
// slowly, after a randomized time visit a url
VisitUrl:function(href) {
	this.waitMilliSecs=10000;
	nHtml.VisitUrl(href);
},
// slowly, after a randomized time click a button
Click:function(button) {
	this.waitMilliSecs=10000;
	nHtml.Click(button);
},
CheckLastAction:function(thisAction) {
	this.SetDivContent('activity_mess','Current activity: ' + thisAction);
	lastAction = GM.GetValue('LastAction','none');
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

/////////////////////////////////////////////////////////////////////

//							DISPLAY FUNCTIONS

// these functions set up the control applet and allow it to be changed

/////////////////////////////////////////////////////////////////////

SetupDivs:function() {

	if(document.getElementById('AutoZynga_div')) {
		return false;
	}
	var div=document.createElement('div');
	div.id='AutoZynga_div';
	div.style.padding='4px';
	div.style.border='2px solid #444';
	div.style.background='#fff';
	div.style.color='#000';
	div.style.float='right';

	var divList = ['activity_mess','quest_mess','fight_mess','heal_mess','demipoint_mess','demibless_mess','level_mess','control'];
	for (var divID in divList) {
		var addDiv=document.createElement('div');
		addDiv.id='AutoZynga_' + divList[divID];
		div.appendChild(addDiv);
	}

//check these out to see which one actually works on CA and remove the rest
	var b=nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_SidebarAds');
	if(b) {
		b.insertBefore(div,b.childNodes[0]);
	} else {

		var app=document.getElementById('fb_sell_profile');
		if(!app) {
			app=nHtml.FindByAttr(document.body,'div','className','app');
		}
		if(!app) {
			app=nHtml.FindByAttr(document.body,'div','id',/^app.*header$/);
		}
		if(app) {
			if(app.parentNode.parentNode) {
				// some ajax games won't reload before the app's area, let's insert the div there.
				app.parentNode.parentNode.insertBefore(div,app.parentNode);
			} else {
				app.insertBefore(div,app.childNodes[0]);
			}
		} else {
			GM.Log('cannot find app div');
		}
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
	if (selectedItem=='defaultValue') GM.SetValue(idName,dropDownList[0]);
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

MakeCheckBox:function(idName,defaultValue,class,instructions) {
	var checkItem = GM.GetValue(idName,'defaultValue');
	if (checkItem=='defaultValue') GM.SetValue(idName,defaultValue);
	var htmlCode = " <input type='checkbox' id='AutoZynga_" + idName + "' title=" + '"' + instructions +'"' + ((class)?" class='" + class + "'":'') + (GM.GetValue(idName)?'checked':'')+' />';
	if (class) {
		htmlCode += '<br />' + this.AddCollapsingDiv(idName,class);
	}
	return htmlCode;
},

MakeNumberForm:function(idName,instructions,initDefault,formatParms) {
	var checkItem = GM.GetValue(idName,'defaultValue');
	if (!initDefault) initDefault = '';
	if (checkItem=='defaultValue') GM.SetValue(idName,initDefault);
	if (!formatParms) formatParms = "size='4'";
	var htmlCode = " <input type='text' id='AutoZynga_" + idName + "' " + formatParms + " title=" + '"' + instructions +'"' + " />";
	return htmlCode;
},

AddCollapsingDiv:function(parentId,subId) {
	var htmlCode = "<div id='AutoZynga_" + subId + "' style='display: " + (GM.GetValue(parentId,false)?'block':'none') +"'>";
	return htmlCode;
},

ToggleControl:function(controlId,staticText) {
	var currentDisplay = GM.GetValue('Control_'+controlId,"none");
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
	// if (idName == 'BattleTargets' && checkItem == '') {
		// GM.Log('Freshmeat set.' + idName + ' checkItem ' + checkItem);
		// GM.SetValue(idName,'freshmeat');
	// }
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
	if(controlDiv && controlDiv.innerHTML.length>0 && !force) {
		// we already have the controls
		return;
	}

	var htmlCode = '';
	var bankInstructions1="Minimum cash to have on hand, press tab to save";
	var bankInstructions2="Maximum cash to have on hand, bank anything above this, press tab to save(leave blank to disable)";
	var preferInstructions="List of search words that decide which monster to attack first.  Can be names or monster types.";
	var healthInstructions="Minimum health to have before healing, press tab to save(leave blank to disable): ";
	var healthStamInstructions="Minimum Stamina to have before healing, press tab to save(leave blank to disable): ";
	var userIdInstructions="User IDs(not user name).  Click with the right mouse button on the link to the users profile & copy link.  Then paste it here and remove everything but the last numbers. (ie. 123456789)";
	var fortifyInstructions="Fortify if ship health is below this % (leave blank to disable)";
	var stopAttackInstructions="Don't attack if ship health is below this % (leave blank to disable)";
	var chainBPInstructions="Number of battle points won to initiate a chain attack. Specify 0 to always chain attack.";
	var chainGoldInstructions="Amount of gold won to initiate a chain attack. Specify 0 to always chain attack.";
	var monsterachieveInstructions="Preference monsters that have not reached achievement damage level. Switch when achievement met.";
	var bankImmedInstructions="Bank as soon as possible. May interrupt player and monster battles.";
	var demiPointsFirstInstructions="Don't battle monsters until you've gotten all your demi points from fighting.";
	var FMRankInstructions="The lowest relative rank below yours that you are willing to spend your stamina on. Leave blank to attack any rank.";
	var FMLevelInstructions="The highest relative level above yours that you are willing to attack. Default 15.";
	var FMARBaseInstructions="This value sets the base for your army ratio calculation. It is basically a multiplier for the army size of a player at your equal level. A value of 1 means you will fight an opponent the same level as you with an army the same size as you or less. Default 1.";		
	var FMARMaxInstructions="Maximum value of Army Ratio multiplier. Default no max.";
	var FMARMinInstructions="Minimum value of Army Ratio multiplier. Default no min.";
	var bankInstructions0="Minimum cash to keep in the bank. Press tab to save";
	
	htmlCode += "<div id='AutoZyngaPaused' style='display: " + GM.GetValue('ZyngaPause','block') +"'><b>Paused on mouse click.</b><br /><a href='javascript:;' id='AutoZyngaRestart' >Click here to restart <hr /> </a></div>";

	htmlCode += this.ToggleControl('CashandHealth','CASH and HEALTH CONTROLS');
		htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Bank Immediately</td><td>' + this.MakeCheckBox('BankImmed',false,'',bankImmedInstructions) +  '</td></tr>';	
		htmlCode += '<tr><td>Auto Buy Properties</td><td>' + this.MakeCheckBox('autoBuyProperty',false) + '</td></tr></table>';	
		htmlCode += "Always Keep&nbsp$" + this.MakeNumberForm('minInStore',bankInstructions0,100000,"type='text'  size='12' style='font-size: 10px'") + " In Bank<br />";	
		htmlCode += "Bank Above&nbsp;&nbsp$" + this.MakeNumberForm('MaxInCash',bankInstructions2,100000,"type='text'  size='7' style='font-size: 10px'") + "<br />";
		htmlCode += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;But Keep&nbsp;$" + this.MakeNumberForm('MinInCash',bankInstructions1,'',"type='text' size='7' style='font-size: 10px'") + " On Hand <br /><br />";
		htmlCode += "Heal If Below&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('MinToHeal',healthInstructions,10,"size='1'  style='font-size: 10px'") + " Health<br />";
		htmlCode += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;But Not If Below" + this.MakeNumberForm('MinStamToHeal',healthStamInstructions,'',"size='1'  style='font-size: 10px'") + ' Stamina<br />';
	htmlCode += "<hr/> </div>";


	htmlCode += this.ToggleControl('Quests','QUEST CONTROLS');
		var questList = ['Energy Available','At Max Energy','Never'];
		htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td width=80>Quest When:</td><td>' + this.MakeDropDown('WhenQuest',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
		htmlCode += "<div id='AutoZynga_WhenQuestHide' style='display: " + (GM.GetValue('WhenQuest',false)!='Never'?'block':'none') +"'>";
			questList = ['Quest','Demi Quests','Atlantis'];
			htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Pick Quest Area:</td><td>' + this.MakeDropDown('QuestArea',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
			switch (GM.GetValue('QuestArea', questList[0])){
				case 'Quest' :
					questList =['Land of Fire','Land of Earth','Land of Mist','Land of Water','Demon Realm','Undead Realm'];
					htmlCode += '<tr><td>Pick Sub Area:</td><td>' + this.MakeDropDown('QuestSubArea',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
					break;
				case 'Demi Quests' :
					questList = ['Ambrosia','Malekus','Corvintheus','Aurora','Azeron'];
					htmlCode += '<tr><td>Pick Sub Area:</td><td>' + this.MakeDropDown('QuestSubArea',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
					break;
				default :
					htmlCode += "<div id='AutoSubArea'></div>";
			}
			var questList = ['Max Influence','Max Gold','Max Experience', 'Manual'];
			htmlCode += '<tr><td>Quest For:</td><td>' + this.MakeDropDown('WhyQuest',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table><br />';
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";
	autoQuestObj = this.GetAutoQuest();
	if (autoQuestObj.name) {
		htmlCode += "<a id='stopAutoQuest' href='javascript:;'>Stop auto quest: "+ autoQuestObj.name +"(energy: "+autoQuestObj.energy+")"+"</a><br />";
	}

	htmlCode += this.ToggleControl('Fighting','BATTLE CONTROLS');
		var fightList = ['Stamina Available','At Max Stamina','No Monster','Not Hiding','Never'];
		var fightInst = ['Stamina Available will fight whenever you have enough stamina','At Max Stamina will fight when stamina is at max and will burn down all stamina when able to level up','No Monster will fight only when there are no active monster battles','Not Hiding uses stamina to try to keep you under 10 health so you cannot be attacked, but making sure no stamina is wasted','Never - disables player battles'];
		var typeList = ['Invade','Duel'];
		var typeInst = ['Fight using Invade button','Fight using Duel button - no guarentee you will win though'];
		var targetList = ['Freshmeat','Userid List'];
		var targetInst = ['Use settings to select a target from the Battle Page','Select target from the supplied list of userids'];
		htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Battle When:&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('WhenFight',fightList,fightInst,"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
		htmlCode += "<div id='AutoZynga_WhenFightHide' style='display: " + (GM.GetValue('WhenFight',false)!='Never'?'block':'none') +"'>";
			htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Battle Type:</td><td>' + this.MakeDropDown('FightType',typeList,typeInst,"style='font-size: 10px min-width: 60px; max-width: 60px; width : 60px;'") + '</td></tr>';
			htmlCode += '<tr><td>Chain:Battle Points Won</td><td>' + this.MakeNumberForm('ChainBP',chainBPInstructions,'',"size='10' style='font-size: 10px; text-align: right' ") + '</td></tr>';
			htmlCode += '<tr><td>Chain:Gold Won</td><td>' + this.MakeNumberForm('ChainGold',chainGoldInstructions,'',"size='10' style='font-size: 10px; text-align: right' ") + '</td></tr></table>';
			htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Target Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('TargetType',targetList,targetInst,"style='font-size: 100px min-width: 100px; max-width: 100px; width : 100px;'") + '</td></tr></table>';
			htmlCode += "<div id='AutoZynga_FreshmeatSub' style='display: " + (GM.GetValue('TargetType',false) == 'Freshmeat'?'block':'none') +"'>";
				htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Min Relative Rank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('FreshMeatMinRank',FMRankInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Max Relative Level&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('FreshMeatMaxLevel',FMLevelInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + '</td></tr>';	
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Army Ratio Base&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('FreshMeatARBase',FMARBaseInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + '</td></tr></table>';	
				htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Army Ratio Min/Max</td><td>' + this.MakeNumberForm('FreshMeatARMin',FMARMinInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + "&nbsp;&nbsp;"+ this.MakeNumberForm('FreshMeatARMax',FMARMaxInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + '</td></tr></table>';	
			htmlCode += "</div>";			
			htmlCode += "<div align=right id='AutoZynga_UserIdsSub' style='display: " + (GM.GetValue('TargetType',false) == 'Userid List'?'block':'none') +"'>";		
				htmlCode += this.MakeTextBox('BattleTargets',userIdInstructions," rows='2'") + '<br />';
			htmlCode += "</div>";	
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";

	htmlCode += this.ToggleControl('Monster','MONSTER CONTROLS');
		var mfightList = ['Stamina Available','At Max Stamina','Not Hiding','Never'];
		var mfightInst = ['Stamina Available will fight whenever you have enough stamina','At Max Stamina will fight when stamina is at max and will burn down all stamina when able to level up','Not Hiding uses stamina to try to keep you under 10 health so you cannot be attacked, but making sure no stamina is wasted','Never - disables monster battles'];
		htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Battle When:&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('WhenMonster',mfightList,mfightInst,"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
		htmlCode += "<div id='AutoZynga_WhenMonsterHide' style='display: " + (GM.GetValue('WhenMonster',false)!='Never'?'block':'none') +"'>";
			htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Achievement Mode</td><td>' + this.MakeCheckBox('AchievementMode',true,'',monsterachieveInstructions) +  '</td></tr>';
			htmlCode += '<tr><td>Get Demi Points First</td><td>' + this.MakeCheckBox('DemiPointsFirst',false,'',demiPointsFirstInstructions) +  '</td></tr>';
			htmlCode += '<tr><td>Fortify If Under</td><td>' + this.MakeNumberForm('MaxToFortify',fortifyInstructions,50,"size='1'  style='font-size: 10px'") + '%</td></tr>';
			htmlCode += '<tr><td>No Attack Under</td><td>' + this.MakeNumberForm('MinShipHealthToAttack',stopAttackInstructions,10,"size='1'  style='font-size: 10px'") + '%</td></tr></table>';
			htmlCode += "Attack Monsters in this order:<br />";
			htmlCode += this.MakeTextBox('AttackOrder',preferInstructions," rows='2'") + '<br />';
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";


	// Add General Comboboxes
	var generalList= ['Use Current','Aeris','Ambrosia','Angelica','Araxis','Aria','Artanis','Celesta','Chimerus','Cid','Crom','Dante','Dexter','Dragan','Edea','Elena','Elizabeth Lione','Garlan','Helena','Illusia','Keira','Leon Ironhart','Lilith and Riku','Lothar the Ranger','Lotus Ravenmoore','Lucius','Lyra','Malekus','Marina','Memnon','Mephistopheles','Mercedes','Morrigan','Nautica','Ophelia','Orc King','Penelope','Percival','Sano','Savannah','Serra Silverlight','Shino','Skaar Deathrune','Sophia','Stone Guardian','Strider','Sylvanas','Terra','Tifanna','Titania','Vanquish','Vorenus','Vulcan','Zarevok'];
	var generalIncomeList= ['Use Current','Mercedes','Cid'];
	var generalBankingList= ['Use Current','Aeris'];

	htmlCode += this.ToggleControl('Generals','GENERALS CONTROLS');
		var dropDownList = ['Idle','Monster','Invade','SubQuest'];
		htmlCode += '<table width=260 cellpadding=0 cellspacing=0>';
		for (var dropDownItem in dropDownList) {
			htmlCode += '<tr><td>' + dropDownList[dropDownItem] + '</td><td>' + this.MakeDropDown(dropDownList[dropDownItem] + 'General',generalList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		}
		htmlCode += '<tr><td>Income</td><td>' + this.MakeDropDown('IncomeGeneral',generalIncomeList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		htmlCode += '<tr><td>Banking</td><td>' + this.MakeDropDown('BankingGeneral',generalBankingList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table><br />';

	htmlCode += "<hr/> </div>";

	htmlCode += this.ToggleControl('Other','OTHER OPTIONS');

		var giftChoiceList = ['Same Gift As Received','Random Gift','Find Gift List'];
		if (giftList = GM.GetList('GiftList')) {
			giftChoiceList.pop();
			giftChoiceList = giftChoiceList.concat(giftList);
		}
		htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Auto Elite Army</td><td>' + this.MakeCheckBox('AutoElite',true) + " </td><td><input type='button' id='AutoZynga_resetElite' value='Do Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
		htmlCode += '<tr><td>Auto Return Gifts</td><td>' + this.MakeCheckBox('AutoGift',false,'GiftControl') + '</td></tr></table>';
			htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Give&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('GiftChoice',giftChoiceList) + '</td></tr></table>';
		htmlCode += '</div>';
		htmlCode += '<table width=190 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Auto bless&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('AutoBless',['None','Energy','Attack','Defense','Stamina','Health']) + '</td></tr></table>';
	htmlCode += "<hr/> </div>";

	htmlCode += 'Disable auto run for this game.' + this.MakeCheckBox('Disabled',false) + '<br />';
	htmlCode+= "Version: " + thisVersion + "  -  <a href='" + changeLogURL + "' target='_blank'>Discussion Boards</a><br />";
	
	if (newVersionAvailable) {
		htmlCode += "<a href='http://userscripts.org/scripts/source/" +SUC_script_num+".user.js'>Install new autoplayer version!</a>";
	}

	this.SetDivContent('control',htmlCode);

	this.AddListeners('AutoZynga_div');

	var resetElite=document.getElementById('AutoZynga_resetElite');
	resetElite.addEventListener('click',function(e) {
		GM.SetValue('AutoEliteGetList',0);
	},false);

	var autoZyngaRestart=document.getElementById('AutoZyngaRestart');
	var autoZyngaPaused=document.getElementById('AutoZyngaPaused');
	autoZyngaRestart.addEventListener('click',function(e) {
		autoZyngaPaused.style.display='none';
		GM.SetValue('ZyngaPause','none');
		GM.SetValue('NoMonsterToAttack',0);
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

//							EVENT LISTENERS

// Watch for changes and update the controls

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
				var idName = e.target.id.replace(/AutoZynga_/i,'');
				GM.SetValue(idName,e.target.checked);
				if (e.target.className) Zynga.SetDisplay(e.target.className,e.target.checked);
			},false);
		} else if (inputDiv.type=='text') {
			var idName = inputDiv.id.replace(/AutoZynga_/i,'');
			inputDiv.value=this.GetNumber(idName).toString();
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/AutoZynga_/i,'');
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
				var idName = e.target.id.replace(/AutoZynga_/i,'');
				var value = e.target.options[e.target.selectedIndex].value;
				GM.Log('Change: setting ' + idName + ' to ' + value);
				GM.SetValue(idName,value);
				e.target.options[0].value = value;
				if (idName =='WhenQuest' || idName =='WhenFight' || idName =='WhenMonster') {
					Zynga.SetDisplay(idName + 'Hide',(value!='Never'));
					Zynga.SetControls(true);
				} else if (idName == 'QuestArea' || idName == 'QuestSubArea' || idName =='WhyQuest') {
					Zynga.SetAutoQuest('',0,'',0);
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
				}	
			}
		},false);
	}

	var ss=document.evaluate("//textarea[contains(@id,'AutoZynga_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
//	if(ss.snapshotLength<=0) GM.Log('no textareas');
	for(var s=0; s<ss.snapshotLength; s++) {
		var inputDiv=ss.snapshotItem(s);
		inputDiv.addEventListener('change',function(e) {
			GM.Log('Change: setting ' + idName + ' to something new');
			var idName = e.target.id.replace(/AutoZynga_/i,'');
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
				GM.SetValue('Control_' + subId.replace(/AutoZynga_/i,''),"none");
			}
			else {
				subDiv.style.display = "block";
				e.target.innerHTML = e.target.innerHTML.replace(/\+/,'-');
				GM.SetValue('Control_'+ subId.replace(/AutoZynga_/i,''),"block");
			}
		},false);
	}
},

/////////////////////////////////////////////////////////////////////

//							GET STATS

// Functions that records all of base game stats, energy, stamina, etc.

/////////////////////////////////////////////////////////////////////

GetStatusNumbers:function(node) {
	var txt=nHtml.GetText(node);
	var staminam=this.statusRe.exec(txt);
	if(staminam) {
		return {'num':parseInt(this.NumberOnly(staminam[1])),'max':parseInt(this.NumberOnly(staminam[2]))};
	} else {
		GM.Log('Cannot find status:'+txt);
	}
	return null;
},

GetStats:function() {
	this.stats={};

	// Facebook ID
	var webSlice=nHtml.FindByAttr(document.body,"input","name","fb_sig_user");
	if (webSlice) {
		var m=webSlice.getAttribute('value');
		if(m) {
			var txt=m;
			GM.SetValue('FBID',txt);
		}
	}
	
		
	// rank
	var attrDiv =nHtml.FindByAttr(document.body,"div","class",'combatRating');
	if (attrDiv) {
		var txt = nHtml.GetText(attrDiv);
		if (txt){
			var rank = String(txt).trim();
			this.stats['rank']=rank;
			GM.SetValue('MyRank', this.stats.rank);
		}
	}
	
	//Player name
	var nameDiv =nHtml.FindByAttr(document.body,"li","id",'fb_menu_account');
	if (nameDiv) {
		var txt = nHtml.GetText(nameDiv);
		if (txt){
			GM.SetValue('PlayerName', String(txt).trim());
		}
	}
	
	// health
	var health=nHtml.FindByAttrContains(document.body,"span","id",'_health_span');
	var healthMess='';
	if(health!=null) {
		this.stats['health']=this.GetStatusNumbers(health.parentNode);
		if(this.stats.health) {
			healthMess="Health: "+this.stats.health.num;
		}
	} else {
		GM.Log('Could not find health');
		this.waitMilliSecs=5000;
		this.needReload = true;
	}
	
	// stamina
	this.stats.stamina = null;
	var stamina=nHtml.FindByAttrContains(document.body,"span","id",'_stamina_span');
	var staminaMess='';
	if(stamina!=null) {
		this.stats['stamina']=this.GetStatusNumbers(stamina.parentNode);
		if(this.stats.stamina) {
			staminaMess="Stamina: "+this.stats.stamina.num;
		}
	} else {
		GM.Log('Could not find stamina');
		this.waitMilliSecs=5000;
	}
	
	// energy
	var energyMess='';
	var energy=nHtml.FindByAttrContains(document.body,"span","id",'_energy_span');
	if(energy!=null) {
		this.stats['energy']=this.GetStatusNumbers(energy.parentNode);
		if(this.stats.energy!=null) {
			energyMess="Energy: "+this.stats.energy.num;
		}
	} else {
		GM.Log('Could not find energy');
		this.waitMilliSecs=5000;
	}
	
	// level
	var level=nHtml.FindByAttrContains(document.body,"div","id",'_level');
	var levelMess;
	if(level!=null) {
		var txt=nHtml.GetText(level);
		if (txt) {
			this.stats['level']= String(txt).trim();
			levelMess = "Level: " + this.stats.level;
		} else {
			GM.Log('Could not find level re');
		}
	} else {
		GM.Log('Could not find level obj');
	}

	this.stats['rank']=parseInt(GM.GetValue('MyRank'));

	// army
	var td=nHtml.FindByAttr(document.body,"a","href","?page=alliance");
	if (td) {
		var txt = nHtml.GetText(td);
		var m=this.armyRe.exec(txt);
		if (m) {
			var army = parseInt(m[1]);
                        army=Math.min(army, 501);
			this.stats['army']=army;
			var armyMess = "Army: " + this.stats.army;
		} else {
			GM.Log("Can't find armyRe in " + txt);
		}
	} else {
		GM.Log("Can't find main_bntp stats");
	}

	// gold
	cashObj=nHtml.FindByAttrContains(document.body,"span","id",'_money_span');
	if(cashObj!=null) {
		var cashTxt=nHtml.GetText(cashObj);
		var cash=this.NumberOnly(cashTxt);
		this.stats.cash=cash;
	} else {
		GM.Log('Could not find cash');
	}
	
	// experience
	var exp=nHtml.FindByAttrContains(document.body,"div","id",'_xp');
	if(exp) {
		this.stats.exp = this.GetStatusNumbers(exp);
	} else GM.Log('Unable to find exp div');

	// time to next level
	//FIXME: Add this function
	/*
	if (this.stats.exp) {
		var expPerStamina = 2;
		var autoQuestObj = this.GetAutoQuest();
		var expPerEnergy = parseFloat(autoQuestObj.expRatio);
		var minutesToLevel = (this.stats.exp.max - this.stats.exp.num - this.stats.stamina.num * expPerStamina - this.stats.energy.num * expPerEnergy) / ( expPerStamina + expPerEnergy ) / 12 * 60;
		this.stats.levelTime = new Date();
		var minutes = this.stats.levelTime.getMinutes();
		minutes += minutesToLevel;
		this.stats.levelTime.setMinutes(minutes);

		this.SetDivContent('level_mess','Expected next level: ' + this.FormatTime(this.stats.levelTime));
	}
	*/
	/*
	//TODO: What is this
	if (this.DisplayTimer('DemiPointTimer')) {
		if (this.CheckTimer('DemiPointTimer'))
			this.SetDivContent('demipoint_mess','Battle demipoints cleared');
		else
			this.SetDivContent('demipoint_mess','Next Battle DemiPoints: ' + this.DisplayTimer('DemiPointTimer'));
	}
	*/
	/*
	//TODO: What is this
	if (this.DisplayTimer('BlessingTimer')) {
		if (this.CheckTimer('BlessingTimer'))
			this.SetDivContent('demibless_mess','Demi Blessing = none');
		else
			this.SetDivContent('demibless_mess','Next Demi Blessing: ' + this.DisplayTimer('BlessingTimer'));
	}
	*/
	// time to next paycheck
	/*
	Not Used on war machines
	paytime = nHtml.FindByAttrContains(document.body,"span","id",'_gold_time_value');
	payminute = nHtml.GetText(paytime).trim();
	payminute = payminute.substr(0,payminute.indexOf(':'));
	this.stats.payminute = payminute;
	*/
	this.stats.payminute = 0;
	
	// return true if probably working
	//TODO: find for what is this
	if (!cashObj) window.location = "http://apps.facebook.com/war_machine/index.php?bm=1";

	return cashObj && (health!=null);
},

/////////////////////////////////////////////////////////////////////

//							CHECK RESULTS

// Called each iteration of main loop, this does passive checks for

// results to update other functions.

/////////////////////////////////////////////////////////////////////

CheckResults:function() {
	// Check for new gifts

	if (!GM.GetValue('HaveGift',false)) {
		if (nHtml.FindByAttrContains(document.body,'a','href','reqs.php#confirm_')) {
			GM.Log('We have a gift waiting!');
			GM.SetValue('HaveGift',true);
		}
	}
	
	// Check for Gold Stored
	if (nHtml.FindByAttrContains(document.body,"div","class",'keep_main_section')) {
		var goldStored = nHtml.FindByAttrContains(document.body,"b","class",'money').firstChild.data.replace(/[^0-9]/g,'');
		GM.SetValue('inStore',goldStored);
	}


	resultsDiv = nHtml.FindByAttrContains(document.body,'span','class','result_body');
	if (!resultsDiv) return;
	resultsText = nHtml.GetText(resultsDiv).trim();

	// Confirm gifts actually sent
	if (GM.GetValue('FBSendList','')) {
		if (resultsText.match(/^\d+ requests? sent\.$/)) {
			GM.Log('Confirmed gifts sent out.');
			GM.SetValue('FBSendList','');
		}
	}

	// Check time until next Oracle Blessing
	if (resultsText.match(/Please come back in: /)) {
		var hours = parseInt(resultsText.match(/ \d+ hour/));
		var minutes = parseInt(resultsText.match(/ \d+ minute/));
		this.SetTimer('BlessingTimer',(hours*60+minutes+1)*60);
		GM.Log('Recorded Blessing Time.  Scheduling next click!');
	}

	// Recieved Demi Blessing.  Wait 24 hours to try again.
	if (resultsText.match(/You have paid tribute to/)) {
		this.SetTimer('BlessingTimer',24*60*60+60);
		GM.Log('Received blessing.  Scheduling next click!');
	}

/*
//  I've haven't seen the code for all sieges complete for a hydra or legion, so I don't know how this should work.
//	Need to pull the Monster ID from somewhere on the page, and add to the SiegeCompleteList
	var siegeComplete = nHtml.FindByAttrContains(document.body, "img[contains(@src,'siege')]/parent::div/parent::div/parent::div/following-sibling::div/div/div", "style", "width: 100%");
	if (siegeComplete) GM.ListAddBefore(SiegeCompleteList,monster ID here);
*/
},


/////////////////////////////////////////////////////////////////////

//							QUESTING

// Quest function does action, DrawQuest sets up the page and gathers info

/////////////////////////////////////////////////////////////////////

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
	var expRatio=GM.GetValue('AutoQuestRatio','');
	return { 'name':name,'energy':energy, 'general':general, 'expRatio':expRatio };
},

baseQuestTable : { 'Land of Fire' :'land_fire', 'Land of Earth':'land_earth', 'Land of Mist':'land_mist', 'Land of Water':'land_water', 'Demon Realm' :'land_demon_realm', 'Undead Realm':'land_undead_realm'},
demiQuestTable : { 'Ambrosia' : 'energy', 'Malekus':'attack', 'Corvintheus':'defense', 'Aurora':'health', 'Azeron':'stamina'},

Quests:function() {
	this.SetDivContent('quest_mess','');
	if(GM.GetValue('WhenQuest','')=='Never') {
		this.SetDivContent('quest_mess','Questing off.');
		return false;
	}
	var autoQuestObj=this.GetAutoQuest();
	var autoQuest=autoQuestObj.name;

	if(!autoQuest) {
		if(GM.GetValue('WhyQuest','')=='Manual') {
			this.SetDivContent('quest_mess','Pick quest manually.');
			return false;
		}
		this.SetDivContent('quest_mess','Searching for quest.');
	} else if(!this.IsEnoughEnergyForAutoQuest()) return false;

	if (autoQuestObj.general == 'none') {
		if (this.SelectGeneral('SubQuestGeneral')) return true;
	}

	switch (GM.GetValue('QuestArea','Quest')) {
		case 'Quest' :
			var subArea = GM.GetValue('QuestSubArea','Land of Fire');
			var landPic = this.baseQuestTable[subArea];
			if ((landPic == 'land_demon_realm') || (landPic == 'land_undead_realm')) {
				if (this.NavigateTo('quests,jobs_tab_more.gif,'+landPic + '.gif',landPic + '_sel')) return true;
			} else {
				if (this.NavigateTo('quests,jobs_tab_back.gif,'+landPic + '.gif',landPic + '_sel')) return true;
			}
			break;
		case 'Demi Quests' :
			if (this.NavigateTo('quests,demi_quest_off.gif','demi_quest_on.gif')) return true;
			var subArea = GM.GetValue('QuestSubArea','Ambrosia');
			var picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+this.demiQuestTable[subArea]);
			if (picSlice.style.height!='160px') {
				return this.NavigateTo('deity_'+this.demiQuestTable[subArea]);
			}
			break;
		case 'Atlantis' :
			if (!this.CheckForImage('tab_atlantis_on.gif')) return this.NavigateTo('quests,tab_atlantis_off.gif');
	}

	if (button = this.CheckForImage('quick_switch_button.gif')) {
		GM.Log('Clicking on quick switch general button.');
		this.Click(button);
		return true;
	}
	if (button = this.CheckForImage('quick_buy_button.jpg')) {
			var costToBuy = button.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.data.replace(/[^0-9]/g,'');
			GM.Log("costToBuy = "+costToBuy);
			if(this.stats.cash < costToBuy) {
				Zynga.SetAutoQuest('',0,'',0);
				GM.SetValue('WhyQuest','Manual');
				GM.Log("Cant buy General, stopping quest");
				Zynga.SetControls(true);
				return false;
			}
		GM.Log('Clicking on quick buy general button.');
		this.Click(button);
		return true;
	}
	autoQuestObj=this.DrawQuests(true);
	if(!autoQuestObj.name) {
		GM.Log('Could not find autoquest.');
		this.SetDivContent('quest_mess','Could not find autoquest.');
		return false;
	}
	if(autoQuestObj.name!=autoQuest) {
		GM.Log('New AutoQuest found.');
		this.SetDivContent('quest_mess','New AutoQuest found.');
		return true;
	}
	if (autoQuestObj.general == 'none') {
		if (this.SelectGeneral('SubQuestGeneral')) return true;
	} else if (autoQuestObj.general && autoQuestObj.general.indexOf(this.GetCurrentGeneral()) < 0) {
		GM.Log('Clicking on general ' + autoQuestObj.general);
		this.Click(autoQuestObj.genDiv);
		return true;
	}

	GM.Log('Do auto quest: '+autoQuest);
	this.waitMilliSecs=10000;
	nHtml.setTimeout(function() {
		Zynga.Click(autoQuestObj.click);
	},1000);
	return true;
},

DrawQuests:function(pickQuestTF) {
	var quests={};
	var bestQuest=null;
	var topQuest=null;
	var bestReward=0;
	var questLists=[];
	var div = document.body;
	if (this.CheckForImage('demi_quest_on.gif')) {
		var ss=document.evaluate(".//div[contains(@id,'symbol_displaysymbolquest')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			div=ss.snapshotItem(s);
			if (div.style.display!='none') break;
		}
	}

	var ss=document.evaluate(".//div[contains(@class,'quests_background')]",div,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	if (ss.snapshotLength == 0) {
//		GM.Log("Failed to find quests_background");
		return quests;
	}

	var questsAdded = 0;
	for(var s=0; s<ss.snapshotLength; s++) {
		var div=ss.snapshotItem(s);

		if (!(quest_name=this.GetQuestName(div))) continue;

		var reward=null;
		var energy=null;
		var experience=null;
		var divTxt=nHtml.GetText(div);
		var expM=this.experienceRe.exec(divTxt);

		if(expM) { experience=this.NumberOnly(expM[1]); }
		else {
			var expObj=nHtml.FindByAttr(div,'div','className','quest_experience');
			if(expObj) {
				experience=(this.NumberOnly(nHtml.GetText(expObj)));
			} else {
				GM.Log('cannot find experience:'+quest_name);
			}
		}

		if((idx=quest_name.indexOf('<br>'))>=0) {
			quest_name=quest_name.substring(0,idx);
		}


		var m=this.energyRe.exec(divTxt);
		if(m) {
			energy=this.NumberOnly(m[1]);
		} else {
			var eObj=nHtml.FindByAttrContains(div,'div','className','quest_req');
			if(eObj) {
				energy=eObjs.getElementsByTagName('b')[0];
			}
		}

		if(!energy) {
			GM.Log('cannot find energy for quest:'+quest_name);
			continue;
		}

		var m=this.moneyRe.exec(this.RemoveHtmlJunk(divTxt));
		if(m) {
			var rewardLow=this.NumberOnly(m[1]);
			var rewardHigh=this.NumberOnly(m[2]);
			reward=(rewardLow+rewardHigh)/2;
		} else {
			GM.Log('no money found:'+quest_name+' in ' + divTxt);
		}

		var a=nHtml.FindByAttr(div,"input","name",/^Do/);
		if(!a) {
			GM.Log('no button found:'+quest_name);
			continue;
		}

		var influenceList=this.influenceRe.exec(divTxt);
		var influence = influenceList[1];
		if(!influence) {
			GM.Log('no influence found:'+quest_name+' in ' + divTxt);
		}


		var general = 'none';
		if (influence && influence < 100) {
			var genDiv=nHtml.FindByAttrContains(div,'div','className','quest_act_gen');
			if (genDiv) {
				genDiv = nHtml.FindByAttrContains(genDiv,'img','src','jpg');
				if (genDiv) {
					general = genDiv.title.toLowerCase();
				}
			}
		}

		quests[quest_name]={
			'click':a,'tr':div,
			'energy':energy,'reward':reward,
			'experience':experience, 'general':general,
			'influence':influence, 'genDiv':genDiv,
			'name':quest_name
		};

		this.LabelQuests(quests[quest_name]);

		whyQuest = GM.GetValue('WhyQuest','');
		switch (whyQuest) {
			case 'Max Influence' :
				if(influence) {
					if (!bestQuest && this.NumberOnly(influence)<100) {
						bestQuest=quest_name;
					}
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
			case 'Max Gold' :
				var rewardRatio=(Math.floor(reward/energy*10)/10);
				if(bestReward<rewardRatio) {
					bestReward=rewardRatio;
					bestQuest=quest_name;
				}
		}

		questsAdded++;

	}

	if (pickQuestTF) {
		if (whyQuest=='Manual') {
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
		GM.SetValue('WhyQuest','Manual');
		this.SetControls(true);
		return {name:''};
	}
},

GetQuestName:function(questDiv) {
	var item_title=nHtml.FindByAttrXPath(questDiv,'div',"@class='quest_desc' or @class='quest_sub_title'");
	if(!item_title) {
	//	GM.Log("Can't find quest description or sub-title");
		return false;
	}

	if (item_title.innerHTML.toString().match(/LOCK/)) {
		return false;
	}

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

IsEnoughEnergyForAutoQuest:function() {
	var autoQuestObj=this.GetAutoQuest();
	if(!this.stats.energy || !autoQuestObj.energy) { return false; }
	var whenQuest = GM.GetValue('WhenQuest','');
	if(whenQuest == 'Energy Available') {
		if (this.stats.energy.num>=autoQuestObj.energy) return true;
		this.SetDivContent('quest_mess','Waiting for more energy: '+this.stats.energy.num+"/"+(autoQuestObj.energy?autoQuestObj.energy:""));
		return false;
	} else if (whenQuest == 'At Max Energy') {
		if (this.stats.energy.num == this.stats.energy.max) return true;
		if (this.InLevelUpMode() && this.stats.energy.num>=autoQuestObj.energy) {
			this.SetDivContent('quest_mess','Burning all energy to level up');
			return true;
		}
		this.SetDivContent('quest_mess','Waiting for max energy:'+this.stats.energy.num+"/"+this.stats.energy.max);
		return false;
	}
	return false;
},

LabelQuests:function(quest) {

	if (!quest) { return; }

	var autoQuestObj=this.GetAutoQuest();

	if(nHtml.FindByAttr(quest.tr,'div','className','autoquest')) return;

	var div=document.createElement('div');
	div.className='autoquest';
	div.style.fontSize='10px';
	div.innerHTML="$ per energy: "+
		(Math.floor(quest.reward/quest.energy*10)/10)+
		"<br />Exp per energy: "+
		(Math.floor(quest.experience/quest.energy*100)/100)+
		"<br />";

	if(autoQuestObj.name==quest_name) {
		var b=document.createElement('b');
		b.innerHTML="Current auto quest";
		div.appendChild(b);
	} else {
		var setAutoQuest=document.createElement('a');
		setAutoQuest.innerHTML='Auto run this quest.';
		setAutoQuest.quest_name=quest_name;

		var quest_nameObj=document.createElement('span');
		quest_nameObj.innerHTML=quest_name;
		quest_nameObj.style.display='none';
		setAutoQuest.appendChild(quest_nameObj);

		var quest_energyObj=document.createElement('span');
		quest_energyObj.innerHTML=quest.energy;
		quest_energyObj.style.display='none';
		setAutoQuest.appendChild(quest_energyObj);
		setAutoQuest.addEventListener("click",function(e) {
			var sps=e.target.getElementsByTagName('span');
			if(sps.length>0) {
				Zynga.SetAutoQuest(sps[0].innerHTML.toString(),sps[1].innerHTML.toString(),'',0);
				GM.SetValue('WhyQuest','Manual');
				if (Zynga.CheckForImage('tab_quest_on.gif')) {
					GM.SetValue('QuestArea','Quest');
					if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_1')){
						GM.SetValue('QuestSubArea','Land of Fire');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_2')){
						GM.SetValue('QuestSubArea','Land of Earth');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_3')){
						GM.SetValue('QuestSubArea','Land of Mist');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_4')){
						GM.SetValue('QuestSubArea','Land of Water');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_5')){
						GM.SetValue('QuestSubArea','Demon Realm');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_6')){
						GM.SetValue('QuestSubArea','Undead Realm');
					}
					GM.Log('Seting SubQuest Area to: '+ GM.GetValue('QuestSubArea'));
				} else if (Zynga.CheckForImage('demi_quest_on.gif')) {
					GM.SetValue('QuestArea','Demi Quests');
					// Set Sub Quest Area
					if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_1')){
						GM.SetValue('QuestSubArea','Ambrosia');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_2')){
						GM.SetValue('QuestSubArea','Malekus');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_3')){
						GM.SetValue('QuestSubArea','Corvintheus');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_4')){
						GM.SetValue('QuestSubArea','Aurora');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_5')){
						GM.SetValue('QuestSubArea','Azeron');
					}
					GM.Log('Seting SubQuest Area to: '+ GM.GetValue('QuestSubArea'));
				} else if (Zynga.CheckForImage('tab_atlantis_on.gif')) {
					GM.SetValue('QuestArea','Atlantis');
				}
				Zynga.SetControls(true);
			} else {
				GM.Log('what did we click on?');
			}
		},false);
		div.appendChild(setAutoQuest);
	}
	div.style.position='absolute';
	div.style.opacity=0.8;
	div.style.background='#888';
	quest.click.parentNode.insertBefore(div,quest.click);
},

/////////////////////////////////////////////////////////////////////

//							AUTO BLESSING

/////////////////////////////////////////////////////////////////////

deityTable:{'energy':1, 'attack': 2,'defense': 3,'health': 4,'stamina': 5},

AutoBless:function() {
	var autoBless=GM.GetValue('AutoBless','none').toLowerCase();
	if (autoBless=='none') return false;
	if (!this.CheckTimer('BlessingTimer')) return false;
	if (this.NavigateTo('quests,demi_quest_off','demi_quest_bless')) return true;

	var picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+autoBless);
	if (!(picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+autoBless))) {
		GM.Log('No diety pics for deity_'+autoBless);
		return false;
	}

	if (picSlice.style.height!='160px') {
			return this.NavigateTo('deity_'+autoBless);
	}
	if (!(picSlice = nHtml.FindByAttrContains(document.body,'form','id','_symbols_form_'+this.deityTable[autoBless]))) {
		GM.Log('No form for deity blessing.');
		return false;
	}
	if (!(picSlice = this.CheckForImage('demi_quest_bless',picSlice))) {
		GM.Log('No image for deity blessing.');
		return false;
	}
	GM.Log('Click deity blessing for ' + autoBless);
	this.SetTimer('BlessingTimer',60*60);
	Zynga.Click(picSlice);
	return true;
},

/////////////////////////////////////////////////////////////////////

//							BATTLING PLAYERS

/////////////////////////////////////////////////////////////////////

// Doesn't appear to be implemented in CA
/*
IterateFightLinks:function(func) {
	var content=document.getElementById('content');
	if(!content) { return; }
	var ss=document.evaluate(".//a[(contains(@href,'xw_controller=stats') and contains(@href,'xw_action=view')) "+
		"or (contains(@href,'/profile/'))"+
		"or (contains(@href,'/"+this.GameName()+"/profile.php?userId='))"+
		"or (contains(@href,'/stats.php?user='))"+
		"]",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var s=0; s<ss.snapshotLength; s++) {
		var userLink=ss.snapshotItem(s);
		if(userLink.innerHTML.indexOf('<img')>=0) { continue; }
		var m=this.userRe.exec(userLink.getAttribute('href'));
		if(!m) { continue; }
		var user=m[2];
		func.call(this,userLink,user);
	}
},

AddFightLinks:function() {
	if(document.getElementById('addFightLink')) {
		return;
	}
	this.IterateFightLinks(function(userLink,user) {
	if(nHtml.FindByAttr(userLink.parentNode,'a','class','addFight')) { return; }
		var addFight=document.createElement('a');
		addFight.className='addFight';
		addFight.id='addFightLink';
		addFight.innerHTML='(Auto Fight)';
		addFight.addEventListener('click',function() {
			var fightTarget=document.getElementById('AutoZynga_BattleTargets');
			if(fightTarget.value=="freshmeat") { fightTarget.value=''; }
			if(fightTarget.value!="") { fightTarget.value+="\n"; }
			fightTarget.value+=user;
			Zynga.SaveBoxText('BattleTargets');
		},false);
		userLink.parentNode.insertBefore(addFight,userLink.nextSibling);
		userLink.parentNode.insertBefore(document.createTextNode(' '),userLink.nextSibling);
	});
},
*/
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

		if (GM.GetValue("FightType","Invade") == "Duel") {
			var inp=nHtml.FindByAttrXPath(fightForm,"input","@name='duel'");
			if (inp) {
				if (inp.value == "false") continue;
				else GM.Log('dueling form found');
			}
		}

		if(fightForm) { break; }
	}

	return fightForm;
},

fightLinkXPath:"(contains(@onclick,'xw_controller=fight') and contains(@onclick,'xw_action=attack')) "+
	"or contains(@onclick,'directAttack')"+
	"or contains(@onclick,'_fight_fight(')",

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
			GM.Log('Fight user button:'+button.name);
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
rankTable:{'acolyte':0, 'scout': 1,'soldier': 2,'elite soldier': 3,'squire': 4,'knight': 5,'first knight': 6,'legionnaire': 7,'centurion': 8,'champion': 9,'lieutenant commander':10,'commander':11,'high commander':12,'lieutenant general':13,'general':14,'high general':15,'baron':16,'earl':17,'duke':18},

fightLevelRe:new RegExp('Level ([0-9]+)\\s*([A-Za-z ]+)','i'),

fightUserListHeader : ['targetID','targetName','deity','rank','armysize','battlePoints','timesKilled'],

FightFreshmeat:function() {
	if (GM.GetValue('FightType','Invade') == "Duel") target = "//input[contains(@src,'battle_02.gif')]";
	else target = "//input[contains(@src,'battle_01.gif')]";

	var ss=document.evaluate(target,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	if(ss.snapshotLength<=0) {
		GM.Log('No battle buttons on fightpage?');
		return false;
	}

	var bestButton;
	var bestScore = -10000;
	var bestID = 0;
	var safeTargets = '';
	//GM.Log("my army/rank/level:" + this.stats.army + "/" + this.stats.rank + "/" + this.stats.level);
	for(var s=0; s<ss.snapshotLength; s++) {
		var button=ss.snapshotItem(s);

		var tr=button;
		while(tr.tagName.toUpperCase()!="TR") {
			tr=tr.parentNode;
		}

		if(!button) {
			GM.Log('No tr parent of button?');
			continue;
		}

		//  If looking for demi points, and already full, continue
		if(GM.GetValue('DemiPointsFirst','') && !GM.GetValue('DemiPointsDone',true)) {
			deityNumber = this.NumberOnly(this.CheckForImage('symbol_',tr).src.match(/\d+\.jpg/i).toString())-1;
			demiPointList = GM.GetList('DemiPointList','');
			if (parseInt(demiPointList[parseInt(deityNumber)])==10) continue;
		}

		var txt=nHtml.GetText(tr).trim();
		var levelm=this.fightLevelRe.exec(txt);
		if (!levelm) {
			GM.Log("Can't match fightLevelRe in " + txt);
			continue;
		}
		var level=parseInt(levelm[1]);
		var rankStr=levelm[2].toLowerCase().trim();
		var rankInt = this.rankTable[rankStr];
		var army = 0;

		var subtd=document.evaluate("td",tr,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if (!subtd) {
			GM.Log("Can't find army subtd below " + txt);
		} else {
			army = parseInt(nHtml.GetText(subtd.snapshotItem(2)).trim());
		}

		if (army == 0) {
			GM.Log("Battle table changed... can't find army size");
		}
		
		// Lets get our Freshmeat user settings
		var minRank = (GM.GetValue("FreshMeatMinRank",'') == ''?99:Number(GM.GetValue("FreshMeatMinRank")));
		var maxLevel = (GM.GetValue("FreshMeatMaxLevel",'') == ''?15:Number(GM.GetValue("FreshMeatMaxLevel")));
		var ARBase = (GM.GetValue("FreshMeatARBase",'') == ''?1:Number(GM.GetValue("FreshMeatARBase")));
		var ARMax = (GM.GetValue("FreshMeatARMax",'') == ''?99:Number(GM.GetValue("FreshMeatARMax")));
		var ARMin = (GM.GetValue("FreshMeatARMin",'') == ''?0:Number(GM.GetValue("FreshMeatARMin")));
		
		if (level - this.stats.level.num > maxLevel) continue;
		
		if (this.stats.rank && (this.stats.rank - rankInt  > minRank)) continue; 
		
		var levelMultiplier = this.stats.level/level;
		
		var armyRatio = ARBase * levelMultiplier;
		var armyRatio = Math.min(armyRatio,ARMax);
		var armyRatio = Math.max(armyRatio,ARMin);

		if (armyRatio <= 0) {
			GM.Log("Bad ratio");
			continue;
		}
		
//		GM.Log("Army Ratio:" + armyRatio + " Level:" + level + " Rank:" + rankInt + " Army: " + army)
		
		// if we know our army size, and this one is larger than armyRatio, don't fight
		if (this.stats.army && (army > (this.stats.army*armyRatio))) {
			continue;
		}

		var inp=nHtml.FindByAttrXPath(tr,"input","@name='target_id'");
		var id=inp.value;

		var dfl = GM.GetValue('DontFight','');
		if (dfl.indexOf(','+id)>=0) {
			// don't fight people we recently lost to
			continue;
		}

		
		var thisScore = rankInt-(army/levelMultiplier/this.stats.army);
		safeTargets += id + "," + army + "," + level + "," + rankInt + "," + thisScore + " / ";
		if (thisScore > bestScore) {
			//GM.Log("best army/rank/level:" + army + "/" + rankInt + "/" + level);
			bestScore = thisScore;
			bestButton = button;
			bestID = id;
		}
	}

	if (bestButton != null) {
		GM.Log('Found freshmeat score ' + bestScore + ' id ' + bestID);
		GM.Log('   Out of these targets:' + safeTargets);
		this.Click(bestButton);
		this.lastFightID = bestID;
		return true;
	}

	GM.Log('No safe targets.');
	this.NavigateTo('battle_on.gif');
	return true;
},

Battle:function(mode) {
	if (!mode) mode = '';
	if (!this.CheckStatsForAutoFight(1)) return false;
	
	if (!this.CheckNotHiding("Fight")) {
		GM.Log("Not Hiding Mode: Safe To Wait For Monster.");
		this.SetDivContent('fight_mess','Safe To Wait For Monster');
		return false;
	}	

	if (GM.GetValue('WhenFight','') == 'No Monster' && mode != 'DemiPoints') {
		if ((GM.GetValue('WhenMonster','') != 'Never') && this.WhileSinceDidIt('NoMonsterToAttack',60*5)) {
			this.SetDivContent('fight_mess','No Battles Until Monsters Dead');
			return false;
		}
	}


	if (this.WhileSinceDidIt('MyRankLast',60*60)) {
			GM.Log('Visiting keep to get new rank');
			this.NavigateTo('keep');
			return true;
	}

	if (this.SelectGeneral('InvadeGeneral')) return true;

	// Check results from last fight.
	if (nHtml.FindByAttrContains(document.body,'span','class','positive')) {
		GM.Log('We won!');


	if (GM.GetValue('FightType','Invade') == "Duel") image = 'battle_02';


		if (GM.GetValue('FightType') == 'Invade')
			chainButton = this.CheckForImage('battle_invade_again.gif');
		else chainButton = this.CheckForImage('battle_duel_again.gif');
		if (chainButton && (this.GetNumber('ChainBP') != '' || this.GetNumber('ChainGold') != '' )) {
			winresults = nHtml.FindByAttrContains(document.body,'span','class','positive');
			bptxt = nHtml.GetText(winresults.parentNode).toString().trim();
			bpnum = parseInt(bptxt.match(/\d+/i));
			moneytxt = nHtml.FindByAttrContains(document.body,"b","class",'gold').innerHTML;
			moneynum = parseInt(moneytxt.substring(1).replace(/,/,''));
			if (bpnum >= parseInt(this.GetNumber('ChainBP')) || moneynum >= parseInt(this.GetNumber('ChainGold'))) {
				GM.Log("Chain Attack After Win: Battle Points " + bpnum + " Gold " + moneynum);
				this.SetDivContent('fight_mess','Chain Attack In Progress');
				Zynga.Click(chainButton);
				return true;
			} else GM.Log('No chain attack: below Battle Points ' + bpnum + '>' + parseInt(this.GetNumber('ChainBP')) + ' or Gold ' + moneynum + '>' +parseInt(this.GetNumber('GetChainGold')));
		} else GM.Log('No chain attack: no "Attack Again" button or chain attack not set up');
	} else {
		// Battle Players - if we lost, add to dontfight list
		if (nHtml.FindByAttrContains(document.body,'span','class','negative')) {
			GM.Log('We lost.');
			if (this.lastFightID) {
				var dontFightList = GM.GetList('DontFightList','');
				dontFightList.push(this.lastFightID);
				if (dontFightList.length > 50) {
					// just keep a few
					dontFightList.shift();
				}
				GM.SetList('DontFightList',dontFightList);
				GM.Log("new DontFightList: " + dontFightList);
			} else GM.Log('We lost, but no lastFightID');
		} else GM.Log('We neither won nor lost');
	}

	var target=this.GetCurrentFightTarget();
	if(!target) {
		this.NextFightTarget();
		return false;
	}

	if (GM.GetValue('FightType','Invade') == "Duel") image = 'battle_02';
	else image = 'battle_01';

	if (this.NavigateTo('battle',image)) return true;
	GM.Log('fighting ' + target);
	this.SetDivContent('fight_mess','Fighting ' + target);
	if(target=='freshmeat') return this.FightFreshmeat();
	this.FightUserId(target);
	this.NextFightTarget();
	return true;
},

NextFightTarget:function() {
	var fightUpto=GM.GetValue('FightTargetUpto',0);
	GM.SetValue('FightTargetUpto',fightUpto+1);
},

GetCurrentFightTarget:function() {
	if (GM.GetValue('TargetType','') == 'Freshmeat') return 'freshmeat';
	var target=GM.GetValue('BattleTargets',"");
	if(!target) return false;
	var targets=target.split(/[\n,]/);
	var fightUpto=GM.GetValue('FightTargetUpto',0);
	fightUpto=fightUpto%targets.length;
//	GM.Log('target ' + target + ' targets.length ' + targets.length+ ' fightUpto%targets.length ' + fightUpto%targets.length);
	GM.Log('nth fight target:'+fightUpto+':'+targets[fightUpto]);
	return targets[fightUpto];
},

/////////////////////////////////////////////////////////////////////

//							ATTACKING MONSTERS

/////////////////////////////////////////////////////////////////////

monstTable:{'Dragon':100000, 'Serpent': 250000,'Knight': 30000,'Terra': 20000,'Hydra': 500000,'Ravenmoore': 500000,'King': 15000,'Queen': 50000,'Legion':250},

AttackMonster:function() {
	var mbattleList = ['Stamina Available','At Max Stamina','At X Stamina','Not Hiding','Never'];
	if (GM.GetValue('WhenMonster') == 'Never') return false;
	// can't do monsters without stamina
	if (this.stats.stamina.num<5) return false;
	//Check if the heal is good to battle.
	if (this.Heal()) return false;
	//check if there is monsters avaiable
	
	//Go to page.
	if (String(window.location).indexOf('event&event')<0){
		if (String(window.location).indexOf('page=event')>0){
			//find a monster
			return this.NavigateTo('event&event');
		} else {
			return this.NavigateTo('event');
		}
	}
	return this.NavigateTo('fight5');
},

/////////////////////////////////////////////////////////////////////

//							COMMON FIGHTING FUNCTIONS

/////////////////////////////////////////////////////////////////////

Fight:function() {

	if (GM.GetValue("BankImmed",false)) {
		var maxInCash=this.GetNumber('MaxInCash');
		var minInCash=this.GetNumber('MinInCash');
		if (minInCash=='') minInCash=0;

		if(maxInCash != "" && this.stats.cash > minInCash && this.stats.cash >= maxInCash) {
			GM.Log("Immediate Banking In Effect");
			this.SetDivContent('fight_mess','Immediate Banking In Effect');
			return false;
		}
	}

	// Check Demi Points First
	if (GM.GetValue('DemiPointsFirst',false)) {

		if (this.CheckForImage('battle_on.gif')) {
			if (smallDeity = this.CheckForImage('symbol_tiny_1.jpg')) {
				demiPointList = nHtml.GetText(smallDeity.parentNode.parentNode.parentNode).match(/\d+ \/ 10/g);
				GM.SetList('DemiPointList',demiPointList);
				GM.Log('demiPointList ' + demiPointList);
				if (this.CheckTimer('DemiPointTimer')) {
					GM.Log('Set DemiPointTimer to 24 hours, and DemiPointsDone to false');
					this.SetTimer('DemiPointTimer', 24*60*60);
				}
				if (demiPointList.join(',') == '10 / 10,10 / 10,10 / 10,10 / 10,10 / 10') GM.SetValue('DemiPointsDone',true);
				else GM.SetValue('DemiPointsDone',false);
				GM.Log('demipointtimer '+this.DisplayTimer('DemiPointTimer')+' demipoints done '+GM.GetValue('DemiPointsDone',false));
			}
		}

		if (this.CheckTimer('DemiPointTimer')) {
			this.CheckLastAction('Check Demi Points');
			return this.NavigateTo('battle','battle_on.gif');
		}

		if (!GM.GetValue('DemiPointsDone',true)) {
			this.SetDivContent('fight_mess',"Battling for Demi Points");
			if (this.Battle('DemiPoints')) {
				this.CheckLastAction('Fight');
				return true;
			}  else return false;
		}
	}

	// monsters usually take priority
	if(GM.GetValue('WhenMonster','Never') != 'Never') {
		if (this.AttackMonster()) {
			this.CheckLastAction('Monster');
			return true;
		}
	}

	// not fighting a monster for some reason, so fight a player
	if (GM.GetValue('WhenFight','Never') != 'Never') {
		if (this.Battle()) {
			this.CheckLastAction('Fight');
			return true;
		}
	}

	return false;
},

minutesBeforeLevelToUseUpStaEnergy : 5,

InLevelUpMode:function() {
	var now = new Date();
	if ((this.stats.levelTime.getTime() - now.getTime())<this.minutesBeforeLevelToUseUpStaEnergy*60*1000) {
		return true;
	}
	return false;
},
CheckStatsForAutoFight:function(attackMinStamina) {
	var whenFight = GM.GetValue('WhenFight','');
	if (whenFight == 'Never') {
		this.SetDivContent('fight_mess','');
		return false;
	}
	if(!this.stats.stamina || !this.stats.health) {
		this.SetDivContent('fight_mess','Health or stamina not known yet.');
		return false;
	}
	if(this.stats.health.num<10) {
		this.SetDivContent('fight_mess',"Need health to fight: " + this.stats.health.num + "/10");
		return false;
	}

	if (whenFight == 'At Max Stamina') {
		if (this.stats.stamina.num == this.stats.stamina.max) {
			this.SetDivContent('fight_mess','Using max stamina');
			return true;
		}
		if (this.InLevelUpMode() && this.stats.stamina.num>=attackMinStamina) {
			this.SetDivContent('fight_mess','Burning all stamina to level up');
			return true;
		}
		this.SetDivContent('fight_mess','Waiting for max stamina: '+this.stats.stamina.num+"/"+this.stats.stamina.max);
		return false;
	}
	if (this.stats.stamina.num>=attackMinStamina) return true;
	this.SetDivContent('fight_mess','Waiting for more stamina: '+this.stats.stamina.num+"/"+attackMinStamina);
	return false;
},
CheckStatsForMonster:function(attackMinStamina) {
	var whenMonster = GM.GetValue('WhenMonster','');
	if (whenMonster == 'Never') {
		this.SetDivContent('fight_mess','');
		return false;
	}
	if(!this.stats.stamina || !this.stats.health) {
		this.SetDivContent('fight_mess','Health or stamina not known yet.');
		return false;
	}
	if(this.stats.health.num<10) {
		this.SetDivContent('fight_mess',"Need at least 10 health to fight.");
		return false;
	}

	if (whenMonster == 'At Max Stamina') {
		if (this.stats.stamina.num == this.stats.stamina.max) {
			this.SetDivContent('fight_mess','Using max stamina');
			return true;
		}
		if (this.InLevelUpMode() && this.stats.stamina.num>=attackMinStamina) {
			this.SetDivContent('fight_mess','Burning all stamina to level up');
			return true;
		}
		this.SetDivContent('fight_mess','Waiting for max stamina:'+this.stats.stamina.num+"/"+this.stats.stamina.max);
		return false;
	}
	if (this.stats.stamina.num>=attackMinStamina) return true;
	this.SetDivContent('fight_mess','Waiting for more stamina:'+this.stats.stamina.num+"/"+attackMinStamina);
	return false;
},
CheckNotHiding:function(attackType) {
	if ((GM.GetValue('WhenFight') != "Not Hiding") || (GM.GetValue('WhenMonster') != "Not Hiding")) return true;
	
	if (GM.GetValue('FightType') == 'Invade') chainButton = this.CheckForImage('battle_invade_again.gif');
	else chainButton = this.CheckForImage('battle_duel_again.gif');
	if (chainButton) {
		if (attackType == "Monster") return false;
		if (attackType == "Fight")	return true;
	}		
	
	// The lower the risk constant, the more you stay in hiding 
	var riskConstant = 1.7;
	// Formula to calculate when to use your stamina for hiding 
	// If (health - (estimated dmg from next atack) puts us below 10)  AND (current stamina can reach 5 using staminatime/healthtime ratio) then stamina can be used/saved for Monster
	 
	if ((this.stats.health.num - ((this.stats.stamina.num - 1) * riskConstant) < 10) && (this.stats.stamina.num * (5/3) >= 5)) {
		if (attackType == "Monster") return true;
		if ((attackType == "Fight") && (!this.WhileSinceDidIt('NoMonsterToAttack',60*5))) return true;
		return false;
	} else {
		if (attackType == "Fight") return true;
		return false;
	}
},	
		

/////////////////////////////////////////////////////////////////////

//							BANKING

// Keep it safe!

/////////////////////////////////////////////////////////////////////

Bank:function() {
	var maxInCash=this.GetNumber('MaxInCash');
	var minInCash=this.GetNumber('MinInCash');
	if (minInCash=='') minInCash=0;

	if(maxInCash=="" || this.stats.cash<=minInCash || this.stats.cash<maxInCash) {
		return false;
	}

	if (this.SelectGeneral('BankingGeneral')) return true;

	if(!(depositButton = this.CheckForImage('btn_stash.gif'))) {
		// Cannot find the link
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
	return false;
},
RetrieveFromBank:function(num){
	if(num<=0)return false;
	var minInStore=this.GetNumber('minInStore');
	
	if(!(retrieveButton = this.CheckForImage('btn_retrieve.gif'))) {
		// Cannot find the link
		return this.NavigateTo('keep');
	}
	if (!(minInStore==''|| minInStore <= GM.GetValue('inStore',0)-num))return false;
	
	
	var retrieveForm = retrieveButton.form;

	var numberInput=nHtml.FindByAttrXPath(retrieveForm,'input',"@type='' or @type='text'");
	if(numberInput) {
		numberInput.value=num;
	} else {
		GM.Log('Cannot find box to put in number for bank retrieve.');
		return false;
	}

	GM.Log('Retriving '+num +'from bank');
	this.Click(retrieveButton);
	return true;
	
},

/////////////////////////////////////////////////////////////////////

//							HEAL

/////////////////////////////////////////////////////////////////////

Heal:function() {
	this.SetDivContent('heal_mess','');
	var whenFight = GM.GetValue('WhenFight','');
	var minToHeal=this.GetNumber('MinToHeal');
	if(minToHeal=="") return false;
	var minStamToHeal=this.GetNumber('MinStamToHeal');
	if(minStamToHeal=="") minStamToHeal = 0;

	if(!this.stats.health) return false;
	//http://apps.facebook.com/war_machine/index.php?heal=1
	if (whenFight != 'Never') {
		if ((this.stats.stamina.num >= this.stats.stamina.max) && this.stats.health.num < 10) {
			GM.Log('Heal');
			return this.NavigateTo('heal');
		}
	}
	if(this.stats.health.num>=this.stats.health.max || this.stats.health.num>minToHeal) return false;

	if(this.stats.stamina.num<minStamToHeal) {
		this.SetDivContent('heal_mess','Waiting for stamina to heal: '+this.stats.stamina.num +'/'+minStamToHeal );
		return false;
	}
	GM.Log('Heal');
	return this.NavigateTo('heal');
},

/////////////////////////////////////////////////////////////////////

//							ELITE GUARD

/////////////////////////////////////////////////////////////////////

AutoElite:function() {
	if (!GM.GetValue('AutoElite',false) || !(this.WhileSinceDidIt('AutoEliteGetList',6*60*60))) {
		return false;
	}

	if (String(window.location).indexOf('party.php')) {
		var res=nHtml.FindByAttrContains(document.body,'span','class','result_body');
		if (res) {
			res=nHtml.GetText(res);
			if (res.match(/Your Elite Guard is FULL/i)) {
				GM.SetValue('MyEliteTodo','');
				GM.Log('elite guard is full');
				this.JustDidIt('AutoEliteGetList');
				this.NavigateTo('generals');
				return false;
			}
		}
	}

	var eliteList=GM.GetValue('MyEliteTodo','').trim();
	if (eliteList== '') {
		if (this.CheckForImage('view_army_on.gif')) {
			GM.Log('load auto elite list');
			var armyList='';
			var ss=document.evaluate(".//img[contains(@src,'view_friends_profile')]/ancestor::a[contains(@href,'keep.php?user')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			for(var s=0; s<ss.snapshotLength; s++) {
				var a=ss.snapshotItem(s);
				var user = a.href.match(/user=\d+/i);
				if (user) {
					armyList += String(user).substr(5) + ',';
				}
			}
			if (armyList!='' || (this.stats.army <= 1)) {
				GM.SetValue('MyEliteTodo',armyList);
			}
		} else {
			return this.NavigateTo('army,view_army_off.gif');
		}
	} else if (this.WhileSinceDidIt('AutoEliteReqNext',7)) {
		user=eliteList.substring(0,eliteList.indexOf(','));
		GM.Log('add elite ' + user);
		this.VisitUrl("http://apps.facebook.com/war_machine/party.php?twt=jneg&jneg=true&user=" + user);
		eliteList = eliteList.substring(eliteList.indexOf(',')+1);
		GM.SetValue('MyEliteTodo',eliteList);
		this.JustDidIt('AutoEliteReqNext');
		if (eliteList == '') {
			this.JustDidIt('AutoEliteGetList');
			this.GMLog('Army list exhausted');
		}
	}
	return true;
},

/////////////////////////////////////////////////////////////////////

//							PASSIVE GENERALS

/////////////////////////////////////////////////////////////////////

PassiveGeneral:function() {
	return this.SelectGeneral('IdleGeneral');
},

/////////////////////////////////////////////////////////////////////

//							AUTOINCOME

/////////////////////////////////////////////////////////////////////

AutoIncome:function() {
	if (this.stats.payminute < 1) {
		this.SelectGeneral('IncomeGeneral');
		return true;
	}
	return false;
},

/////////////////////////////////////////////////////////////////////

//								AUTOGIFT

/////////////////////////////////////////////////////////////////////

AutoGift:function() {

	if (!GM.GetValue('AutoGift')) return false;
	if (giftEntry = nHtml.FindByAttrContains(document.body,'div','id','_gift1')) {
		GM.SetList('GiftList','');
		var ss=document.evaluate(".//div[contains(@id,'_gift')]",giftEntry.parentNode,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var giftNamePic= {};
		for(var s=0; s<ss.snapshotLength; s++) {
			var giftDiv=ss.snapshotItem(s);
			giftName = nHtml.GetText(giftDiv).trim().replace(/!/i,'');
			GM.ListPush('GiftList',giftName);
			giftNamePic[giftName]=this.CheckForImage('mystery',giftDiv).src.match(/[\w_\.]+$/i).toString();
//			GM.Log('Gift name: ' + giftName + ' pic ' + giftNamePic[giftName]);
		}
//		GM.Log('Gift list: ' + GM.GetList('GiftList'));
		if (GM.GetValue('GiftChoice') == 'Find Gift List') {
			GM.SetValue('GiftChoice','Same Gift As Received');
			this.SetControls(true);
		}
	}

	// Go to gifts page if asked to read in gift list
	if (GM.GetValue('GiftChoice',false)=='Find Gift List' || !GM.GetList('GiftList')) {
		if (this.NavigateTo('army,home_gift_button.gif,tab_gifts_off.gif','giftpage_title.jpg')) return true;
	}

	// Gather the gifts
	if (GM.GetValue('HaveGift',false)) {
		if (!this.CheckForImage('invite_on.gif') && !this.CheckForImage('giftpage_title.jpg')) {
			return this.NavigateTo('army');
		}
		var acceptDiv = nHtml.FindByAttrContains(document.body,'a','href','reqs.php#confirm_');
		var ignoreDiv = nHtml.FindByAttrContains(document.body,'a','href','act=ignore');
		if(ignoreDiv && acceptDiv) {
			if (!(giverId = this.userRe.exec(ignoreDiv.href))) {
				GM.Log('Unable to find giver ID');
				return false;
			}
			var giverName = nHtml.GetText(nHtml.FindByAttrContains(acceptDiv.parentNode.parentNode,'a','href','profile.php')).trim();
			GM.SetValue('GiftEntry',giverId[2]+'`'+giverName);
			GM.Log('Giver ID = ' + giverId[2] + ' Name  = ' + giverName);
			this.JustDidIt('ClickedFacebookURL');
			this.VisitUrl(acceptDiv.href);
			return true;
		}
		GM.SetValue('HaveGift',false);
	}

	// Facebook pop-up on CA
	if (GM.GetValue('FBSendList','')) {
		if (button = nHtml.FindByAttrContains(document.body,'input','name','sendit') ) {
			GM.Log('Sending gifts to Facebook');
			this.Click(button);
			return true;
		} else if (button = nHtml.FindByAttrContains(document.body,'input','name','ok')){
			GM.Log('Over max gifts per day');
			this.JustDidIt('WaitForNextGiftSend');
			this.Click(button);
		} else GM.Log('No Facebook pop up to send gifts');
		GM.ListAddBefore('ReceivedList',GM.GetList('FBSendList',''));
		GM.SetList('FBSendList','');
//		this.JustDidIt('WaitForNextGiftSend');
		return false;
	}

	// CA send gift button
	if (GM.GetValue('CASendList','')) {
		if (button = nHtml.FindByAttrContains(document.body,'input','value','Gift Request')) {
			GM.Log('Clicked CA send gift button');
			GM.ListAddBefore('FBSendList',GM.GetList('CASendList',''));
			GM.SetList('CASendList','');
			this.Click(button);
			return true;
		}
		GM.Log('No CA button to send gifts');
		GM.ListAddBefore('ReceivedList',GM.GetList('CASendList',''));
		GM.SetList('CASendList','');
//		this.JustDidIt('WaitForNextGiftSend');
		return false;
	}

	if (!this.WhileSinceDidIt('WaitForNextGiftSend',3*60*60)) return false;

	if (this.WhileSinceDidIt('WaitForNotFoundIDs',3*60*60) && GM.GetList('NotFoundIDs','')) {
		GM.ListAddBefore('ReceivedList',GM.GetList('NotFoundIDs',''));
		GM.SetList('NotFoundIDs','');
	}

	if (!(giverList = GM.GetList('ReceivedList',''))) return false;
	var giftChoice = GM.GetValue('GiftChoice');

	if (this.NavigateTo('army,home_gift_button.gif,tab_gifts_off.gif','giftpage_title.jpg')) return true;

	// Get the gift to send out
	if (giftNamePic.length==0) {
		GM.Log('No list of pictures for gift choices');
		return false;
	}
	switch (giftChoice) {
		case 'Random Gift':
			var picNum = Math.floor(Math.random()*6);
			var n = 0;
			for(var p in giftNamePic) {
				if (n++ == picNum) {
					var giftPic = giftNamePic[p];
					break;
				}
			}
			if (!giftPic) {
				GM.Log('No gift type match. GiverList: ' + giverList);
				return false;
			}
			break;
		case 'Same Gift As Received':
			for(var p in giftNamePic) {
				if (giverList.join('~').indexOf(p)>=0 || giverList.join('~').indexOf('Unknown Gift')>=0) {
					var giftPic = giftNamePic[p];
					givenGiftType = p;
					break;
				}
			}
			if (!giftPic) {
				GM.Log('No gift type match. GiverList: ' + giverList);
				return false;
			}
			break;
		default:
			var giftPic = giftNamePic[GM.GetValue('GiftChoice')];
	}

	// Move to gifts page
	if (!(picDiv = this.CheckForImage(giftPic))) {
		GM.Log('Unable to find ' + giftPic);
		return false;
	} else GM.Log('GiftPic is ' + giftPic);
	if (nHtml.FindByAttrContains(picDiv.parentNode.parentNode.parentNode.parentNode,'div','style','giftpage_select')) {
		if (this.NavigateTo('giftpage_ca_friends_off.gif','giftpage_ca_friends_on.gif')) return true;
	} else {
		return this.NavigateTo(giftPic);
	}
	// Click on names
	giveDiv = nHtml.FindByAttrContains(document.body,'div','class','unselected_list');
	doneDiv = nHtml.FindByAttrContains(document.body,'div','class','selected_list');
	GM.SetList('ReceivedList','');
	for(var p in giverList) {
		if (p>10) {
			GM.ListPush('ReceivedList',giverList[p]);
			continue;
		}
		giverData=giverList[p].split('`');
		giverID=giverData[0];
		giftType=giverData[2];
		if (giftChoice == 'Same Gift As Received' && giftType != givenGiftType && giftType != 'Unknown Gift') {
			GM.Log('giftType ' + giftType + ' givenGiftType ' + givenGiftType);
			GM.ListPush('ReceivedList',giverList[p]);
			continue;
		}

		if (!(nameButton = nHtml.FindByAttrContains(giveDiv,'input','value',giverID))) {
			GM.Log('Unable to find giver ID ' + giverID);
			GM.ListPush('NotFoundIDs',giverList[p]);
			this.JustDidIt('WaitForNotFoundIDs');
			continue;
		}
		GM.Log('Clicking giver ID ' + giverID);
		this.Click(nameButton);

		//test actually clicked
		if (nHtml.FindByAttrContains(doneDiv,'input','value',giverID)) {
			GM.ListPush('CASendList',giverList[p]);
			GM.Log('Moved ID ' + giverID);
		} else {
			GM.Log('NOT moved ID ' + giverID);
			GM.ListPush('NotFoundIDs',giverList[p]);
			this.JustDidIt('WaitForNotFoundIDs');
		}
	}
	return true;
},

AcceptGiftOnFB:function() {
	if (!(window.location.href.indexOf('facebook.com/reqs.php') < 0 || window.location.href.indexOf('www.facebook.com/home.php') < 0)) {
		return false;
	}
	var giftEntry = GM.GetValue('GiftEntry','');
	if (!giftEntry) {
		return false;
	}
	var defaultValue = (giftEntry == '0' ? '0' : '');
	GM.Log('On FB page with gift ready to go');
	if (window.location.href.indexOf('facebook.com/reqs.php') >= 0) {
		var ss=document.evaluate(".//input[contains(@name,'/war_machine/index.php?acceptGift=')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			var giftDiv=ss.snapshotItem(s);
			var user = giftDiv.name.match(/ref_id=\d+/i);
			if (!user) continue;
			user = String(user).substr(7);
			if (giftEntry != '0' && user != this.NumberOnly(giftEntry)) continue;
			giftType = giftDiv.value.replace(/^Accept /i,'').trim();
			var temp = GM.GetList('GiftList');
			if (temp && temp.indexOf(giftType) < 0) {
				GM.Log('Unknown gift type. ' + giftType);
				giftType = 'Unknown Gift';
			}
			GM.Log('LOL1');
			GM.ListPush('ReceivedList',giftEntry + '`' + giftType);
			GM.Log ('This giver: ' + user + ' gave ' + giftType + ' Givers: ' + GM.GetList('ReceivedList'));
			Zynga.Click(giftDiv);
			GM.SetValue('GiftEntry',defaultValue);
			return true;
		}
	}
	if (!this.WhileSinceDidIt('ClickedFacebookURL',5)) return false;
	GM.Log('Error: unable to find gift');
	GM.ListPush('ReceivedList',giftEntry + '`Unknown Gift');
	this.VisitUrl("http://apps.facebook.com/war_machine/index.php?page=home");
	GM.SetValue('GiftEntry',defaultValue);
	return true;
},

AcceptGiftOnGame:function() {
	if ((window.location.href.indexOf('facebook.com/war_machine/acceptGift.php?acceptGift=') < 0)) {
		return false;
	}
	GM.Log('On Game page with gift ready to accept');
	//FIXME: need to check if i accepted all gifts
	var yes = nHtml.FindByAttr(document.body,'input','value','Yes');
	if (yes){
		GM.Log('trying to accept more gifts!!');
		Zynga.Click(yes);
		return true;
	} else {
		GM.Log('Error could not find the button!!');
		return false;
	}
},


currentPage:"",
currentTab:"",
waitMilliSecs:5000,

/////////////////////////////////////////////////////////////////////

//							MAIN LOOP

// This function repeats continously.  In principle, functions should only make one
// click before returning back here.

/////////////////////////////////////////////////////////////////////


MainLoop:function() {
	// assorted errors...
	var href=location.href;
	if(href.indexOf('/common/error.html')>=0) {
		GM.Log('detected error page, waiting to go back to previous page.');
		window.setTimeout(function() {
			Goback(-1);
		}, 30*1000);
		return;
	}
	var spinner = nHtml.FindByAttrContains(document.body,'div','class','spinner');
	if(spinner && spinner.style.display != 'none') {
		GM.Log('detected Try Again message, waiting to reload');
		// error
		window.setTimeout(function() {
			Goback(0);
		}, 30*1000);
		return;
	}
	if (window.location.href.indexOf('facebook.com/reqs.php') >= 0 || window.location.href.indexOf('www.facebook.com/home.php') >= 0) {
		this.AcceptGiftOnFB();
		return;
	}
	//FIXME: Add a store to know that there is still gifts. 
	this.AcceptGiftOnGame();
	this.SetupDivs();
//	this.AddFightLinks();

	if (!this.GetStats()) {
	 // no stats... nothing works...
	 	this.WaitMainLoop();
		return;
	}
	
	this.SetControls();
	//this.DrawQuests(false);
	//this.CheckResults();
	//this.DrawProperties();
	
	if(GM.GetValue('Disabled',false)) {
		this.WaitMainLoop();
		return;
	}

	var actionsList = [
	//'AutoIncome','AutoElite',
	'Heal',
	//'ImmediateBanking','MaxEnergyQuest','DemiPoints',
	'AttackMonster'
	//,'Battle','Quests','Properties','Bank','PassiveGeneral',
	//'AutoBless','AutoStat','AutoGift','Idle'
	];

	if (GM.GetValue('LastAction','Idle')!='Idle') actionsList.unshift(GM.GetValue('LastAction'));
//	GM.Log('Action list: ' + actionsList);

	for (var action in actionsList) {
//		GM.Log('Action: ' + actionsList[action]);
		if(this[actionsList[action]]()) {
			this.CheckLastAction(actionsList[action]);
			break;
		}
	}

	this.WaitMainLoop();
},

WaitMainLoop:function() {
	this.waitForPageChange=true;
	nHtml.setTimeout(function() { this.waitForPageChange=false; Zynga.MainLoop(); },this.waitMilliSecs);

},

ReloadOccasionally:function() {
	GM.SetValue('ZyngaPause','none');
	GM.Log('Page reloaded');
	nHtml.setTimeout(function() {
		// better than reload... no prompt on forms!
		if (window.location.href.indexOf('war_machine') >= 0 && !GM.GetValue('Disabled')) {
			window.location = "http://apps.facebook.com/war_machine/index.php?bm=1";
		}
		Zynga.ReloadOccasionally();
	}, 1000*60*4 + (3 * 60 * 1000 * Math.random()));
}

};

window.addEventListener("load", function(e) {
	Zynga.MainLoop();
},false);
Zynga.ReloadOccasionally();
