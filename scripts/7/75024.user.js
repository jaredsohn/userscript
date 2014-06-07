// ==UserScript==
// @name           Castle Age Autoplayer
// @namespace      zynga
// @description    Auto player for zynga's castle age game
// @version        1.0
// @include        http*://apps.*facebook.com/castle_age/*
// @include        http://www.facebook.com/common/error.html
// @include        http://www.facebook.com/reqs.php#confirm_46755028429_0
// @include        http://www.facebook.com/home.php
// @include        http://www.facebook.com/home.php*filter=app_46755028429*
// ==/UserScript==

var thisVersion = "1.0";
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

var discussionURL= 'http://senses.ws/caap/index.php';
var debug=false;
var newVersionAvailable=0;

if (parseInt(GM_getValue('SUC_remote_version',0)) > thisVersion) {
	newVersionAvailable=1;
}

// update script from: http://userscripts.org/scripts/review/57917
var SUC_script_num = 57917;
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
			})
		}catch (err) {
			if (forced) alert('An error occurred while checking for updates:\n'+err);
		}
	}
     }
     GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});
     updateCheck(false);
} catch(err) {}

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

/////////////////////////////////////////////////////////////////////

//							HTML TOOLS

// this object contains general methods for wading through the DOM and dealing with HTML

/////////////////////////////////////////////////////////////////////

var xpath = {
	string : XPathResult.STRING_TYPE,
	unordered: XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	first : XPathResult.FIRST_ORDERED_NODE_TYPE
};
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
spaceTags:{'td':1,'br':1,'hr':1,'span':1,'table':1
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
getX:function(path,parent,type) {
	switch (type) {
		case xpath.string : return document.evaluate(path,parent,null,type,null).stringValue;
		case xpath.first : return document.evaluate(path,parent,null,type,null).singleNodeValue;
		case xpath.unordered : return document.evaluate(path,parent,null,type,null);
	}
},
getHTMLPredicate:function(HTML){
	for (var x = HTML.length; x > 1; x--) {
		if (HTML.substr(x,1) == '/') {
			return HTML.substr(x + 1);
		}
	}
	return HTML
},

OpenInIFrame:function(url, key) {
	//if(!iframe = document.getElementById(key))
	iframe = document.createElement("iframe");
	//GM_log ("Navigating iframe to " + url);
	iframe.setAttribute("src", url);
	iframe.setAttribute("id", key);
	iframe.setAttribute("style","width:0;height:0;");
	document.body.insertBefore(iframe, document.body.firstChild);
},

ResetIFrame:function(key) {
	if(iframe = document.getElementById(key)){
		GM.Log("Deleting iframe = "+key);
		iframe.parentNode.removeChild(iframe);
	}else GM.Log("Frame not found = "+key);
	if(document.getElementById(key))GM.Log("Found iframe");
},
};

/////////////////////////////////////////////////////////////////////

//							GM OBJECT

// this object is used for setting/getting GM specific functions.
/////////////////////////////////////////////////////////////////////
var ls='\n'; // Line separator
var os='\t'; // Object separator
var vs='\f'; // Value separator

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
	return GM_setValue(Zynga.gameName+"__"+n,v);
},
GetValue:function(n,v) {
	GM.Debug('Get ' +n + ' value ' + GM_getValue(Zynga.gameName+"__"+n,v));
	return GM_getValue(Zynga.gameName+"__"+n,v);
},
DeleteValue:function(n) {
	GM.Debug('Delete ' +n + ' value ');
	return GM_deleteValue(Zynga.gameName+"__"+n);
},
SetList:function(n,v) {
	return GM_setValue(Zynga.gameName+"__"+n,v.join(ls));
},
GetList:function(n) {
	list = GM_getValue(Zynga.gameName+"__"+n,'')
	return list ? list.split(ls) : [];
},
ListAddBefore:function(listName,addList) {
	newList = addList.concat(GM.GetList(listName));
	GM.SetList(listName,newList);
	return newList;
},
ListPop:function(listName) {
	list = GM.GetList(listName)
	if (!list.length) return '';
	popItem = list.pop();
	GM.SetList(listName,list);
	return popItem;
},
SetObjValue:function(objName,label,value) {
	obj = GM.GetValue(objName);
	if (!GM.GetObjValue(objName,label)) GM.SetValue(objName,(obj ? obj : '')+ label + os + value);
	obj = obj.split(os);
	GM.SetValue(objName,obj.filter(function(item){
		return item.indexOf(label + vs)!=0
	}).push(label + vs + value));
},
GetObjValue:function(objName,label,defaultValue) {
	obj = GM.GetValue(objName);
	if ((obj) && obj.split(os).some(function(item){
		return item.indexOf(label + vs)==0
	})) return obj.split(label + vs)[1].split(os)[0];
	return defaultValue;
},
ListPush:function(listName, pushItem, max) {
  var list = GM.GetList(listName);

  // Only add if it isn't already there.
  if (list.indexOf(pushItem) != -1) {
    return;
  }
  list.push(pushItem);
  if (max > 0) {
    while (max < list.length) {
      var pushItem = list.shift();
      GM.Debug('Removing ' + pushItem + ' from ' + listName + '.');
    }
  }
  GM.SetList(listName, list);
}
}
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
Move={
moveHandler:function(e){
	savedTarget.style.position='absolute';
	if (e == null) return;
	if ( e.button<=1 && dragOK ){
		savedTarget.style.left = e.clientX - dragXoffset + 'px';
		savedTarget.style.top = e.clientY - dragYoffset + 'px';
		return false;
	}
},

cleanup:function(e) {
	document.removeEventListener('mousemove',Move.moveHandler,false);
	document.removeEventListener('mouseup',Move.cleanup,false);
	savedTarget.style.cursor=orgCursor;

	if(savedTarget.getAttribute('id')=='divOptions'){
		GM_setValue('optionsLeft', savedTarget.style.left);
		GM_setValue('optionsTop',  savedTarget.style.top);
	}else if(savedTarget.getAttribute('id')=='divUpdater'){
		GM_setValue('updaterLeft', savedTarget.style.left);
		GM_setValue('updaterTop',  savedTarget.style.top);
	}else if(savedTarget.getAttribute('id')=='divMenu'){
		GM_setValue('menuLeft', savedTarget.style.left);
		GM_setValue('menuTop',  savedTarget.style.top);
	}

	dragOK=false; //its been dragged now
	didDrag=true;
},

dragHandler:function(e){

	var htype='-moz-grabbing';
	if (e == null) return;// {{ e = window.event;}  // htype='move';}
	var target = document.getElementById("AutoZynga_div");// != null ? e.target : e.srcElement;
	orgCursor=target.style.cursor;

	if(target.nodeName!='DIV')
		return;

	savedTarget=target;
	target.style.cursor=htype;
	dragOK=true;
	dragXoffset = e.clientX-target.offsetLeft;
	dragYoffset = e.clientY-target.offsetTop;

	//set the left before removing the right
	target.style.left = e.clientX - dragXoffset + 'px';
	target.style.right = null;
	document.addEventListener('mousemove',Move.moveHandler,false);
	document.addEventListener('mouseup',Move.cleanup,false);
	return false;
}
}
////////////////////////////////////////////////////////////////////

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
armyRe:new RegExp('My Army\\s*\\(?([0-9]+)','i'),
statusRe:new RegExp('([0-9\\.]+)\\s*/\\s*([0-9]+)','i'),
htmlJunkRe:new RegExp("\\&[^;]+;","g"),
energyRe:new RegExp("([0-9]+)\\s+(energy)","i"),
gameNameRe:new RegExp("^/([^/]+)/"),
experienceRe:new RegExp("\\+([0-9]+)"),
influenceRe:new RegExp("([0-9]+)%"),
gainLevelRe:new RegExp("gain\\s+level\\s+([0-9]+)\\s+in","i"),
moneyRe:new RegExp("\\$([0-9,]+)\\s*-\\s*\\$([0-9,]+)","i"),
firstNumberRe:new RegExp("([0-9]+)"),
gameName:'castle_age',

/////////////////////////////////////////////////////////////////////

//							UTILITY FUNCTIONS

// Small functions called a lot to reduce duplicate code

/////////////////////////////////////////////////////////////////////

Click:function(obj,loadWaitTime) {
	if (!obj) {
		GM.Log('ERROR: Null object passed to Click');
		return;
	}
	this.waitMilliSecs = (loadWaitTime) ? loadWaitTime : 5000;
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
ClickWait:function(obj,loadWaitTime) {
	this.setTimeout(function() {
		this.Click(obj,loadWaitTime);
	},1000+Math.floor(Math.random()*1000));
},
VisitUrl:function(url,loadWaitTime) {
	this.waitMilliSecs = (loadWaitTime) ? loadWaitTime : 5000;
//	this.setTimeout(function() {
	document.location.href=url;
//	},1000+Math.floor(Math.random()*1000));
},
GetCurrentGeneral:function() {
	var webSlice = nHtml.FindByAttrContains(document.body,"div","class",'general_name_div3');
	if (!webSlice) {
		GM.Log("Couldn't find current general div");
		return false;
	}
	return webSlice.innerHTML.trim();
},
UpdateGeneralList:function() {
	if (!this.CheckForImage('tab_generals_on.gif')) return false;
	var gens = nHtml.getX('//div[@class=\'generalSmallContainer2\']', document, xpath.unordered);
	GM.SetValue('AllGenerals','');
	GM.SetValue('GeneralImages','');
	GM.SetValue('LevelUpGenerals','');
	for (var x = 0; x < gens.snapshotLength; x++)	{
		var gen = nHtml.getX('./div[@class=\'general_name_div3\']/text()', gens.snapshotItem(x), xpath.string).replace(/[\t\r\n]/g,'');
		var img = nHtml.getX('.//input[@class=\'imgButton\']/@src', gens.snapshotItem(x), xpath.string);
		img = nHtml.getHTMLPredicate(img);
//		var atk = nHtml.getX('./div[@class=\'generals_indv_stats\']/div[1]/text()', gens.snapshotItem(x), xpath.string);
//		var def = nHtml.getX('./div[@class=\'generals_indv_stats\']/div[2]/text()', gens.snapshotItem(x), xpath.string);
//		var skills = nHtml.getX('.//table//td[1]/div/text()', gens.snapshotItem(x), xpath.string).replace(/[\t\r\n]/gm,'');
		var level = nHtml.getX('./div[4]/div[2]/text()', gens.snapshotItem(x), xpath.string).replace(/Level /gi,'').replace(/[\t\r\n]/g,'');
//		var genatts = gen + ":" + atk + "/" + def + ":L" + level + ":" + img + ","
		GM.ListPush('AllGenerals',gen);
		GM.ListPush('GeneralImages',gen + ':' + img);
		if (level < 4){GM.ListPush('LevelUpGenerals',gen);}
	}
	GM.SetList('AllGenerals',GM.GetList('AllGenerals').sort());
//	GM.Log("All Generals: " + GM.GetList('AllGenerals'));
},
ClearGeneral:function(whichGeneral) {
	GM.Log('Setting ' + whichGeneral + ' to "Use Current"');
	GM.SetValue(whichGeneral,'Use Current');
	this.SetControls(true);
},
SelectGeneral:function(whichGeneral) {
	if (!(general = GM.GetValue(whichGeneral,''))) return false;
	if (!general || /use current/i.test(general)) return false;
	if (/under level 4/i.test(general)) {
		if (!GM.GetList('LevelUpGenerals').length) return this.ClearGeneral(whichGeneral);
		general = GM.GetList('LevelUpGenerals').pop();
	}
	currentGeneral = this.GetCurrentGeneral().replace('**','');
	if(general.indexOf(currentGeneral) >= 0) return false;

	GM.Log('Changing from ' + currentGeneral + ' to ' + general);
	if (this.NavigateTo('mercenary,generals','tab_generals_on.gif')) return true;;
	if (/get general list/i.test(general)) return this.ClearGeneral(whichGeneral);
	var hasGeneral = function(genImg) {return (genImg.indexOf(general.replace(/:.+/,''))>=0); }
	generalImage = GM.GetList('GeneralImages').filter(hasGeneral).toString().replace(/.+:/,'');
	if (this.CheckForImage(generalImage)) {
		return this.NavigateTo(generalImage);
	}
	this.SetDivContent('Could not find ' + general);
	GM.Log('Could not find ' + generalImage);
	return this.ClearGeneral(whichGeneral);
},

NavigateTo:function(pathToPage,imageOnPage) {
	var content=document.getElementById('content');
	if(!content) {
		GM.Log('No content to Navigate to ' + imageOnPage + ' using ' + pathToPage);
		return false;
	}
	if (imageOnPage && this.CheckForImage(imageOnPage)) return false;

	var pathList = pathToPage.split(",");
	for(var s=pathList.length-1; s>=0; s--) {
		var a=nHtml.FindByAttrXPath(content,'a',"contains(@href,'/" + pathList[s] + ".php') and not(contains(@href,'" + pathList[s] + ".php?'))");
		if (a) {
			GM.Log('Go to ' + pathList[s]);
			Zynga.Click(a);
			return true;
		}
		var imageTest = pathList[s]
		if (imageTest.indexOf(".") == -1) imageTest = imageTest + "."
		var input = nHtml.FindByAttrContains(document.body,"input","src",imageTest);
		if (input) {
			GM.Log('Click on image ' + input.src.match(/[\w.]+$/));
			Zynga.Click(input);
			return true;
		}
		var input = nHtml.FindByAttrContains(document.body,"img","src",imageTest);
		if (input) {
			GM.Log('Click on image ' + input.src.match(/[\w.]+$/));
			Zynga.Click(input);
			return true;
		}
	}
	GM.Log('Unable to Navigate to ' + imageOnPage + ' using ' + pathToPage);
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
CheckLastAction:function(thisAction) {
	this.SetDivContent('activity_mess','Current Action: ' + thisAction);
	lastAction = GM.GetValue('LastAction','none')
	GM.SetValue('LastAction',thisAction);
	if (lastAction!=thisAction) {
		GM.Log('Changed from doing ' + lastAction + ' to ' + thisAction);
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
	var b=nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_Container clearfix');
	div.id='AutoZynga_div';
	div.style.top='100px';
	div.style.left='940px';
	div.style.width='180px';

	div.style.padding='4px';
	div.style.border='1px  ';
	div.style.background = GM.GetValue('StyleBackgroundLight','#EEF6FC');
	div.style.color='#000';
	div.style.cssFloat='right';
	if (nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_SidebarAds')) {
		nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_SidebarAds').style.display='none';
	}	

	var divList = ['activity_mess','army_mess','quest_mess','battle_mess','heal_mess','demipoint_mess','demibless_mess','level_mess','control'];
	for (var divID in divList) {
		var addDiv=document.createElement('div');
		addDiv.id='AutoZynga_' + divList[divID];
		div.appendChild(addDiv);
	}

//check these out to see which one actually works on CA and remove the rest
	var b=nHtml.FindByAttrContains(document.body, 'div', 'className', 'UIStandardFrame_Container');
	if(b) {
		b.insertBefore(div,b.childNodes[1]);
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
	var htmlCode = "<input type='checkbox' id='AutoZynga_" + idName + "' title=" + '"' + instructions +'"' + ((varClass)?" class='" + varClass + "'":'') + (GM.GetValue(idName)?'checked':'')+' />';
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
	htmlCode += "<div id='AutoZyngaPaused' style='display: " + GM.GetValue('ZyngaPause','block') +"'><b>Paused on mouse click.</b><br /><a href='javascript:;' id='AutoZyngaRestart' >Click here to restart <hr /> </a></div>";
	var bankInstructions0="Minimum cash to keep in the bank. Press tab to save";
	var bankInstructions1="Minimum cash to have on hand, press tab to save";
	var bankInstructions2="Maximum cash to have on hand, bank anything above this, press tab to save(leave blank to disable)";
	var healthInstructions="Minimum health to have before healing, press tab to save(leave blank to disable): ";
	var healthStamInstructions="Minimum Stamina to have before healing, press tab to save(leave blank to disable): ";
	var bankImmedInstructions="Bank as soon as possible. May interrupt player and monster battles."
	var autobuyInstructions="Automatically buy properties in groups of 10 based on best Return On Investment value. "
	

		
	

	/*var forceSubGen = "Always do a quest with Sub General";
	htmlCode += this.ToggleControl('Quests','QUEST');
		var questList = ['Never','At Max Energy','Not Fortifying','Energy Available'];
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
		htmlCode += '<tr><td width=80>Quest When:</td><td>' + this.MakeDropDown('WhenQuest',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
		htmlCode += "<div id='AutoZynga_WhenQuestHide' style='display: " + (GM.GetValue('WhenQuest',false)!='Never'?'block':'none') +"'>";
			questList = ['Quest','Demi Quests','Atlantis'];
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
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
			htmlCode += '<tr><td>Quest For:</td><td>' + this.MakeDropDown('WhyQuest',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
			htmlCode += '<tr><td>Switch Quest Area</td><td> ' + this.MakeCheckBox('swithQuestArea',false,'','Allows switching quest area') +  "</td></tr>";
			htmlCode += '<tr><td>Force SubGeneral</td><td> ' + this.MakeCheckBox('ForceSubGeneral',false,'',forceSubGen) +  "</td></tr></table>"
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";
	autoQuestObj = this.GetAutoQuest()
	if (autoQuestObj.name) {
		htmlCode += "<a id='stopAutoQuest' href='javascript:;'>Stop auto quest: "+ autoQuestObj.name +" (energy: "+autoQuestObj.energy+")"+"</a><br />";
	}


	var XBattleInstructions="Start battling if stamina is above this points";
	var XMinBattleInstructions="Don't battle if stamina is below this points";
	var userIdInstructions="User IDs(not user name).  Click with the right mouse button on the link to the users profile & copy link.  Then paste it here and remove everything but the last numbers. (ie. 123456789)";
	var chainBPInstructions="Number of battle points won to initiate a chain attack. Specify 0 to always chain attack.";
	var chainGoldInstructions="Amount of gold won to initiate a chain attack. Specify 0 to always chain attack.";
	var FMRankInstructions="The lowest relative rank below yours that you are willing to spend your stamina on. Leave blank to attack any rank."
	var FMLevelInstructions="The highest relative level above yours that you are willing to attack. Default 15."
	var FMARBaseInstructions="This value sets the base for your army ratio calculation. It is basically a multiplier for the army size of a player at your equal level. A value of 1 means you will battle an opponent the same level as you with an army the same size as you or less. Default .5"
	var FMARMaxInstructions="Maximum value of Army Ratio multiplier. Default no max."
	var FMARMinInstructions="Minimum value of Army Ratio multiplier. Default no min."
	var dontbattleInstructions="Remember an opponents id after a loss and don't battle him again"
	htmlCode += this.ToggleControl('Battling','BATTLE');
		var battleList = ['Stamina Available','At Max Stamina','At X Stamina','No Monster','Not Hiding','Never'];
		var battleInst = ['Stamina Available will battle whenever you have enough stamina','At Max Stamina will battle when stamina is at max and will burn down all stamina when able to level up','At X Stamina you can set maximum and minimum stamina to battle','No Monster will battle only when there are no active monster battles','Not Hiding uses stamina to try to keep you under 10 health so you cannot be attacked, but making sure no stamina is wasted','Never - disables player battles'];
		var typeList = ['Invade','Duel']
		var typeInst = ['Battle using Invade button','Battle using Duel button - no guarentee you will win though']
		var targetList = ['Freshmeat','Userid List','Raid']
		var targetInst = ['Use settings to select a target from the Battle Page','Select target from the supplied list of userids','Raid Battles']
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
		htmlCode += '<tr><td>Battle When:&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('WhenBattle',battleList,battleInst,"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
		htmlCode += "<div id='AutoZynga_WhenBattleXStamina' style='display: " + (GM.GetValue('WhenBattle',false)!='At X Stamina'?'none':'block') +"'>";
				htmlCode += '<tr><td>Start Battles with</td><td>' + this.MakeNumberForm('XBattleStamina',XBattleInstructions,1,"size='1'  style='font-size: 10px'") +  ' Stamina</td></tr><br/>';
				htmlCode += '<tr><td>Keep</td><td>' + this.MakeNumberForm('XMinBattleStamina',XMinBattleInstructions,0,"size='1'  style='font-size: 10px'") +  ' Stamina Points</td></tr>';
		htmlCode += "</div>";
		htmlCode += "<div id='AutoZynga_WhenBattleHide' style='display: " + (GM.GetValue('WhenBattle',false)!='Never'?'block':'none') +"'>"
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Avoid Target After Loss</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + this.MakeCheckBox('DontBattleOption',true,'',dontbattleInstructions) +  '</td></tr>';
			htmlCode += '<tr><td>Battle Type:</td><td>' + this.MakeDropDown('BattleType',typeList,typeInst,"style='font-size: 10px min-width: 60px; max-width: 60px; width : 60px;'") + '</td></tr>';
			htmlCode += '<tr><td>Chain:Battle Points Won</td><td>' + this.MakeNumberForm('ChainBP',chainBPInstructions,'',"size='8' style='font-size: 10px; text-align: right' ") + '</td></tr>';
			htmlCode += '<tr><td>Chain:Gold Won</td><td>' + this.MakeNumberForm('ChainGold',chainGoldInstructions,'',"size='8' style='font-size: 10px; text-align: right' ") + '</td></tr></table>';
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Target Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('TargetType',targetList,targetInst,"style='font-size: 105px min-width: 105px; max-width: 105px; width : 105px;'") + '</td></tr></table>';
			htmlCode += "<div id='AutoZynga_FreshmeatSub' style='display: " + (GM.GetValue('TargetType',false) != 'Userid List'?'block':'none') +"'>"
				htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Min Relative Rank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('FreshMeatMinRank',FMRankInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Max Relative Level&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('FreshMeatMaxLevel',FMLevelInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Army Ratio Base&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('FreshMeatARBase',FMARBaseInstructions,'.5',"size='2'  style='font-size: 10px; text-align: right'") + '</td></tr></table>';
				htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Army Ratio Min/Max</td><td>' + this.MakeNumberForm('FreshMeatARMin',FMARMinInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + "&nbsp;&nbsp;"+ this.MakeNumberForm('FreshMeatARMax',FMARMaxInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + '</td></tr></table>';
			htmlCode += "</div>";
			htmlCode += "<div align=right id='AutoZynga_UserIdsSub' style='display: " + (GM.GetValue('TargetType',false) == 'Userid List'?'block':'none') +"'>"
				htmlCode += this.MakeTextBox('BattleTargets',userIdInstructions," rows='2'") + '<br />';
			htmlCode += "</div>";
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";

	var XMonsterInstructions="Start attacking if stamina is above this points";
	var XMinMonsterInstructions="Don't attack if stamina is below this points";
	var attackOrderInstructions="List of search words that decide which monster to attack first.  Can be names or monster types.";
	var fortifyInstructions="Fortify if ship health is below this % (leave blank to disable)";
	var questFortifyInstructions="Do Quests if ship health is above this % and quest mode is set to Not Fortify (leave blank to disable)";
	var stopAttackInstructions="Don't attack if ship health is below this % (leave blank to disable)";
	var monsterachieveInstructions="Check if monsters have reached achievement damage level first. Switch when achievement met.";
	var demiPointsFirstInstructions="Don't attack monsters until you've gotten all your demi points from battling."
	var powerattackInstructions="Use power attacks. Only do normal attacks if power attack not possible";
	htmlCode += this.ToggleControl('Monster','MONSTER');
		var mbattleList = ['Stamina Available','At Max Stamina','At X Stamina','Not Hiding','Never'];
		var mbattleInst = ['Stamina Available will attack whenever you have enough stamina','At Max Stamina will attack when stamina is at max and will burn down all stamina when able to level up','At X Stamina you can set maximum and minimum stamina to battle','Not Hiding uses stamina to try to keep you under 10 health so you cannot be attacked, but making sure no stamina is wasted','Never - disables attacking monsters'];
		htmlCode += '<table width=189 cellpadding=0 cellspacing=0>'
		htmlCode += '<tr><td>Attack When:</td><td>' + this.MakeDropDown('WhenMonster',mbattleList,mbattleInst,"style='font-size: 10px min-width: 105px; max-width: 105px; width : 105px;'") + '</td></tr></table>';
		htmlCode += "<div id='AutoZynga_WhenMonsterXStamina' style='display: " + (GM.GetValue('WhenMonster',false)!='At X Stamina'?'none':'block') +"'>";
			htmlCode += '<tr><td>Start Battles with</td><td>' + this.MakeNumberForm('XMonsterStamina',XMonsterInstructions,1,"size='1'  style='font-size: 10px'") +  ' Stamina</td></tr><br/>';
			htmlCode += '<tr><td>Keep </td><td>' + this.MakeNumberForm('XMinMonsterStamina',XMinMonsterInstructions,0,"size='1'  style='font-size: 10px'") +  ' Stamina Points</td></tr>';
		htmlCode += "</div>";
		htmlCode += "<div id='AutoZynga_WhenMonsterHide' style='display: " + (GM.GetValue('WhenMonster',false)!='Never'?'block':'none') +"'>"
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Power Attack Only</td><td> ' + this.MakeCheckBox('PowerAttack',true,'',powerattackInstructions) +  '</td></tr>';
			htmlCode += '<tr><td>Achievement Mode</td><td> ' + this.MakeCheckBox('AchievementMode',true,'',monsterachieveInstructions) +  '</td></tr>';
			htmlCode += '<tr><td>Get Demi Points First</td><td> ' + this.MakeCheckBox('DemiPointsFirst',false,'DemiList',demiPointsFirstInstructions,true)+  '</td></tr>';
			var demiPoint =['Ambrosia','Malekus','Corvintheus','Aurora','Azeron'];
			var demiPtList = ['<img src="http://image2.castleagegame.com/1331/graphics/symbol_tiny_1.jpg" height="15" width="14"/>','<img src="http://image2.castleagegame.com/1331/graphics/symbol_tiny_2.jpg" height="15" width="14"/>','<img src="http://image2.castleagegame.com/1331/graphics/symbol_tiny_3.jpg" height="15" width="14"/>','<img src="http://image2.castleagegame.com/1331/graphics/symbol_tiny_4.jpg" height="15" width="14"/>','<img src="http://image2.castleagegame.com/1331/graphics/symbol_tiny_5.jpg" height="15" width="14"/>'];
				for (var demiPtItem in demiPtList) {
					htmlCode += demiPtList[demiPtItem] + this.MakeCheckBox('DemiPoint'+demiPtItem,true,'',demiPoint[demiPtItem]);
				}	
			htmlCode += "</div>";
			htmlCode += '</table><table width=180 cellpadding=0 cellspacing=0>'
			htmlCode += '<tr><td>Fortify If Under</td><td>' + this.MakeNumberForm('MaxToFortify',fortifyInstructions,50,"size='1'  style='font-size: 10px'") + '%</td></tr>';
			htmlCode += '<tr><td>   Quest If Over</td><td>' + this.MakeNumberForm('MaxHealthtoQuest',questFortifyInstructions,60,"size='1'  style='font-size: 10px'") + '%</td></tr>';
			htmlCode += '<tr><td>No Attack Under</td><td>' + this.MakeNumberForm('MinShipHealthToAttack',stopAttackInstructions,10,"size='1'  style='font-size: 10px'") + '%</td></tr></table>';
			htmlCode += "Attack Monsters in this order: <a href='http://userscripts.org/topics/43757' target='_blank'><font color='red'>?</font></a><br />";
			htmlCode += this.MakeTextBox('AttackOrder',attackOrderInstructions," rows='3'") + '<br />';
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";


	// Add General Comboboxes
	generalList = GM.GetList('AllGenerals');
	generalList.unshift('Under Level 4');
	generalList.unshift('Read New Generals');
	generalList.unshift('Use Current');

	var crossList = function(checkItem) { return (generalList.indexOf(checkItem)>=0); }
	var generalIncomeList= ['Mercedes','Cid','Use Current','Read New Generals'].filter(crossList);
	var generalBankingList= ['Aeris','Use Current','Read New Generals'].filter(crossList);

	htmlCode += this.ToggleControl('Generals','GENERALS');
		var dropDownList = ['Idle','Monster','Fortify','Battle','SubQuest','Buy'];
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
		for (var dropDownItem in dropDownList) {
			htmlCode += '<tr><td>' + dropDownList[dropDownItem] + '</td><td>' + this.MakeDropDown(dropDownList[dropDownItem] + 'General',generalList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		}
		//<input type='button' id='AutoZynga_resetGeneralList' value='Do Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>'
		htmlCode += '<tr><td>Income</td><td>' + this.MakeDropDown('IncomeGeneral',generalIncomeList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		htmlCode += '<tr><td>Banking</td><td>' + this.MakeDropDown('BankingGeneral',generalBankingList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table><br />';

	htmlCode += "<hr/> </div>";


	var statusInstructions="Automatically increase attributes when upgrade skill points are available."
	var statusAdvInstructions="USE WITH CAUTION: You can use numbers or formulas(ie. level * 2 + 10). Variable keywords include energy, health, stamina, attack, defense, and level. JS functions can be used (Math.min, Math.max, etc) !!!Remember your math class: 'level + 20' not equals 'level * 2 + 10'!!!";
	attrList = ['','energy','attack','defense','stamina','health'];
	htmlCode += this.ToggleControl('Status','UPGRADE SKILL POINTS');
		htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Auto Add Upgrade Points</td><td> ' + this.MakeCheckBox('AutoStat',false,'',statusInstructions) +  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>";
		htmlCode += '<tr><td>Advanced Settings</td><td> ' + this.MakeCheckBox('AutoStatAdv',false,'',statusAdvInstructions) +  " <a href='http://userscripts.org/posts/207279' target='_blank'><font color='red'>?</font></a></td></tr></table>";
		htmlCode += "<div id='AutoZynga_Status_Normal' style='display: " + (GM.GetValue('AutoStatAdv',false)?'none':'block') +"'>"
			htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
			htmlCode += "<tr><td>Increase" + this.MakeDropDown('Attribute1',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue1',statusInstructions,0,"type='text' size='2' style='font-size: 10px '") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute2',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue2',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute3',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue3',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute4',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue4',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute5',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue5',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr></table>";
		htmlCode += "</div>";
		htmlCode += "<div id='AutoZynga_Status_Adv' style='display: " + (GM.GetValue('AutoStatAdv',false)?'block':'none') +"'>"
			htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
			htmlCode += "<tr><td>Increase" + this.MakeDropDown('Attribute1',attrList) + " using </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue1',statusInstructions,0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute2',attrList) + " using </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue2',statusInstructions,0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute3',attrList) + " using </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue3',statusInstructions,0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute4',attrList) + " using </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue4',statusInstructions,0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute5',attrList) + " using </td></tr></table>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue5',statusInstructions,0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";*/

	var giftInstructions="Automatically receive and send return gifts.";
	htmlCode += this.ToggleControl('Other','AUTO ELITE/GIFT/DEMI-BLESS');

		var giftChoiceList = ['Same Gift As Received','Random Gift'];
		giftChoiceList.push('Read New Gifts');
		giftChoiceList = giftChoiceList.concat(GM.GetList('GiftList'));
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Auto Elite Army</td><td> ' + this.MakeCheckBox('AutoElite',true,'AutoEliteControl','Enable or disable Auto Elite function',true) + " </td><td><input type='button' id='AutoZynga_resetElite' value='Do Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>'+this.MakeTextBox('EliteArmyList',"Try these UserIDs first. Use ',' between each UserID"," rows='2'") + '</td></tr></table>';
		htmlCode += '</div>';
		htmlCode += '<tr><td>Auto Return Gifts</td><td> ' + this.MakeCheckBox('AutoGift',false,'GiftControl',giftInstructions,true) + "</td>";
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Give&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('GiftChoice',giftChoiceList) + '</td></tr></table>';
		htmlCode += '</div>';
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Auto Demi-Bless&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('AutoBless',['None','Energy','Attack','Defense','Stamina','Health']) + '</td></tr>';
		//htmlCode += '<tr><td>Style               </td><td>' + this.MakeDropDown('DisplayStyle',['Default','CA Skin','None']) + '</td></tr>';
		htmlCode +=  "</td></tr></table>";
		htmlCode += '</div>';
	htmlCode += "<hr/> </div>";

	htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
	htmlCode += "<tr><td></td><td></td><td><input type='button' id='FillArmy' value='Auto Fill Army' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
	htmlCode += "<tr><td><input type='checkbox' id='unlockMenu' /></td><td>Move Menu</td><td><input type='button' id='ResetMenuLocation' value='Reset' style='font-size: 10px; width:50; height:50'></td></tr></table>";
	htmlCode += 'Disable auto run for this game. ' + this.MakeCheckBox('Disabled',false) + '<br />';
	/*htmlCode+= "Version: " + thisVersion + "  -  <a href='" + discussionURL + "' target='_blank'>Discussion Boards</a><br />"

	if (newVersionAvailable) {
		htmlCode += "<a href='http://userscripts.org/scripts/source/" +SUC_script_num+".user.js'>Install new autoplayer version!</a>";
	}*/

	this.SetDivContent('control',htmlCode);

	this.AddListeners('AutoZynga_div');

	var unlockMenuBox=document.getElementById('unlockMenu');
	var unlockMenu=GM.GetValue('unlockMenu',false);
	unlockMenuBox.checked=unlockMenu?true:false;
	unlockMenuBox.addEventListener('change',function(e) {
		div = document.getElementById("AutoZynga_div");
		if(unlockMenuBox.checked){
			div.style.cursor='move';
			div.addEventListener('mousedown', Move.dragHandler, false);
		}else{
			div.style.cursor ='';
			div.removeEventListener('mousedown', Move.dragHandler, false);
		}

	},false);

	var FillArmyButton=document.getElementById('FillArmy');
	FillArmyButton.addEventListener('click',function(e) {
			GM.SetValue("FillArmy",true);
	},false);

	var resetMenuLocation=document.getElementById('ResetMenuLocation');
	resetMenuLocation.addEventListener('click',function(e) {
			div = document.getElementById("AutoZynga_div");
			div.style.cursor ='';
			div.style.position='';
			div.removeEventListener('mousedown', Move.dragHandler, false);
			div.style.top='100px';
			div.style.left='940px';
			document.getElementById('unlockMenu').checked = false;
	},false);

	var resetElite=document.getElementById('AutoZynga_resetElite');
	resetElite.addEventListener('click',function(e) {
		GM.SetValue('AutoEliteGetList',0);
	},false);

	var autoZyngaRestart=document.getElementById('AutoZyngaRestart');
	var autoZyngaPaused=document.getElementById('AutoZyngaPaused');
	autoZyngaRestart.addEventListener('click',function(e) {
		autoZyngaPaused.style.display='none';
		document.getElementById("AutoZynga_div").style.background = GM.GetValue('StyleBackgroundLight','#EEF6FC');
		GM.SetValue('ZyngaPause','none');
		GM.SetValue('ReleaseControl',true);
		GM.SetValue('NoMonsterToAttack',0)
//		Zynga.ReloadOccasionally();
//		Zynga.WaitMainLoop();
	},false);


	controlDiv.addEventListener('mousedown',function(e) {
		document.getElementById("AutoZynga_div").style.background = GM.GetValue('StyleBackgroundDark','#EFEFEF');;
//		nHtml.clearTimeouts();
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

	if (GM.GetValue('WhenBattle') == 'Not Hiding'  && GM.GetValue('WhenMonster') != 'Not Hiding') {
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
		// Reset HoleyShipTimer when MinShipHealthToAttack is changed
		} else if (inputDiv.type=='text' && /MinShipHealthToAttack/.test(inputDiv.id)) {
			var idName = inputDiv.id.replace(/AutoZynga_/i,'')
			inputDiv.value=GM.GetValue(idName,'').toString();
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/AutoZynga_/i,'')
				GM.SetValue(idName,e.target.value);
				GM.SetValue('HoleyShipTimer','0')
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
				if (idName =='WhenQuest' || idName =='WhenBattle' || idName =='WhenMonster') {
					Zynga.SetDisplay(idName + 'Hide',(value!='Never'));
					Zynga.SetControls(true);
				} else if (idName == 'QuestArea' || idName == 'QuestSubArea' || idName =='WhyQuest') {
					Zynga.SetAutoQuest('',0,'',0);
					Zynga.SetControls(true);
				} else if (idName == 'IdleGeneral') {
					GM.SetValue('MaxIdleEnergy', 0);
					GM.SetValue('MaxIdleStamina', 0);
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
				} else if (idName == 'DisplayStyle') {
					switch (value) {
						case "CA Skin" :
							GM.SetValue("StyleBackgroundLight","#E0C691");
							GM.SetValue("StyleBackgroundDark","#B09060");	;
							Zynga.SetControls(true);
							break;
						case "None" :
							GM.SetValue("StyleBackgroundLight","");
							GM.SetValue("StyleBackgroundDark","");	;
							Zynga.SetControls(true);
							break;							
						default :
							GM.SetValue("StyleBackgroundLight","#EEF6FC");
							GM.SetValue("StyleBackgroundDark","#EFEFEF");	;
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
			if (idName == 'AttackOrder') {
				GM.SetValue('MonstersOverMaxDam','');
				GM.SetValue('MonstersOverAchDam','');
				GM.SetValue('MonsterStaminaReq',1);
				Zynga.JustDidIt('ClearDamagedMonsterList');
				Zynga.monster.name = ' ';
			}
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

// Functions that records all of base game stats, energy, stamina, etc.

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

	// rank
	var attrDiv =nHtml.FindByAttrContains(document.body,"div","class",'keep_stat_title');
	if (attrDiv) {
		var txt = nHtml.GetText(attrDiv);
		var levelm=this.rankRe.exec(txt);
		if (levelm) {
			var rank = this.rankTable[levelm[1].toString().toLowerCase().trim()];
			if (rank != undefined) {
				this.stats['rank']=rank;
				GM.SetValue('MyRank',this.stats.rank);
				this.JustDidIt('MyRankLast');
			} else {
				GM.Log("Unknown rank " + rank + ':' + levelm[1].toString());
			}
		}
		var userName = txt.match(/"(.+)"/);
		GM.SetValue('PlayerName',userName[1]);
	}

	// health
	var health=nHtml.FindByAttrContains(document.body,"span","id",'_current_health');
	var healthMess='';
	if(!health) {
		health=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_health') and not(contains(@id,'health_time'))");
	}
	if(health!=null) {
		this.stats['health']=this.GetStatusNumbers(health.parentNode);
		if(this.stats.health) {
			healthMess="Health: "+this.stats.health.num;
		}
	} else {
		GM.Log('Could not find health');
		this.needReload = true;
	}

	// stamina
	this.stats.stamina = null;
	var stamina=nHtml.FindByAttrContains(document.body,"span","id",'_current_stamina');
	var staminaMess='';
	if(!stamina) {
		stamina=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_stamina') and not(contains(@id,'stamina_time'))");
	}
	if(stamina!=null) {
		this.stats['stamina']=this.GetStatusNumbers(stamina.parentNode);
		if(this.stats.stamina) {
			staminaMess="Stamina: "+this.stats.stamina.num;
			if ((GM.GetValue('IdleGeneral','').indexOf(this.GetCurrentGeneral()) >= 0) || (GM.GetValue('IdleGeneral','').match(/use current/i))) {
				GM.SetValue('MaxIdleStamina', this.stats.stamina.max);
			}
		}
	} else {
		GM.Log('Could not find stamina');
	}

	// energy
	var energyMess='';
	var energy=nHtml.FindByAttrContains(document.body,"span","id",'_current_energy');
	if(!energy) {
		energy=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_energy') and not(contains(@id,'energy_time'))");
	}
	if(energy!=null) {
		this.stats['energy']=this.GetStatusNumbers(energy.parentNode);
		if(this.stats.energy!=null) {
			energyMess="Energy: "+this.stats.energy.num;
			//if current general == idle general
			if ((GM.GetValue('IdleGeneral','').indexOf(this.GetCurrentGeneral()) >= 0) || (GM.GetValue('IdleGeneral','').match(/use current/i))) {
				GM.SetValue('MaxIdleEnergy', this.stats.energy.max);
			}
		}
	} else {
		GM.Log('Could not find energy');
	}

	// level
	var level=nHtml.FindByAttrContains(document.body,"div","title",'experience points');
	var levelMess;
	if(level!=null) {
		var txt=nHtml.GetText(level);
		var levelm=this.levelRe.exec(txt);
		if (levelm) {
			this.stats['level']=parseInt(levelm[1]);
			levelMess = "Level: " + this.stats.level;
			if(GM.GetValue('Level',0) != this.stats.level) GM.DeleteValue('BestPropCost');
			GM.SetValue('Level',this.stats.level);
		} else {
			GM.Log('Could not find level re');
		}
	} else {
		GM.Log('Could not find level obj');
	}

	this.stats['rank']=parseInt(GM.GetValue('MyRank'));

	// army
	var td=nHtml.FindByAttrContains(document.body,"div","id","main_bntp");
	if (td) {
		var a=nHtml.FindByAttrContains(td,"a","href","army");
		var txt = nHtml.GetText(a);
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
	cashObj=nHtml.FindByAttrXPath(document.body,"strong","contains(string(),'$')");
	if(cashObj) {
		var cashTxt=nHtml.GetText(cashObj);
		var cash=this.NumberOnly(cashTxt);
		this.stats.cash=cash;
	} else {
		GM.Log('Could not find cash');
	}

	// experience
	var levelMess='';
	var exp=nHtml.FindByAttrContains(document.body,'div','id','st_2_5');
	if(exp) {
		this.stats.exp = this.GetStatusNumbers(exp);
	} else GM.Log('Unable to find exp div');

	// time to next level
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

	if (this.DisplayTimer('DemiPointTimer')) {
		if (this.CheckTimer('DemiPointTimer'))
			this.SetDivContent('demipoint_mess','Battle demipoints cleared');
		else
			this.SetDivContent('demipoint_mess','Next Battle DemiPts: ' + this.DisplayTimer('DemiPointTimer'));
	}

	if (this.DisplayTimer('BlessingTimer')) {
		if (this.CheckTimer('BlessingTimer'))
			this.SetDivContent('demibless_mess','Demi Blessing = none');
		else
			this.SetDivContent('demibless_mess','Next Demi Blessing: ' + this.DisplayTimer('BlessingTimer'));
	}

	// time to next paycheck
	if ((paytime = nHtml.FindByAttrContains(document.body,"span","id",'_gold_time_value'))) {
		this.stats.paytime = nHtml.GetText(paytime).trim();
		this.stats.payminute = this.stats.paytime.substr(0,this.stats.paytime.indexOf(':'));
	}
	// return true if probably working
	return cashObj && (health!=null);
},

/////////////////////////////////////////////////////////////////////

//							CHECK RESULTS

// Called each iteration of main loop, this does passive checks for

// results to update other functions.

/////////////////////////////////////////////////////////////////////
SetCheckResultsFunction:function(resultsFunction) {
	this.JustDidIt('SetResultsFunctionTimer');
	GM.SetValue('ResultsFunction',resultsFunction);
},
CheckResults:function() {
	// Check for new gifts

	if (!GM.GetValue('HaveGift')) {
		if (nHtml.FindByAttrContains(document.body,'a','href','reqs.php#confirm_')) {
			GM.Log('We have a gift waiting!');
			GM.SetValue('HaveGift',true);
		} 
	}
	
	if (this.stats.level < 10) this.battlePage = 'battle_train';
	else this.battlePage = 'battle';

	// Check for Gold Stored
	if (nHtml.FindByAttrContains(document.body,"div","class",'keep_main_section')) {
		var goldStored = nHtml.FindByAttrContains(document.body,"b","class",'money').firstChild.data.replace(/[^0-9]/g,'')
		GM.SetValue('inStore',goldStored);
	}
	if (resultsDiv = nHtml.FindByAttrContains(document.body,'span','class','result_body'))
		resultsText = nHtml.GetText(resultsDiv).trim();
	else resultsText = '';
	resultsFunction = GM.GetValue('ResultsFunction','');
	if ((resultsFunction) && !this.WhileSinceDidIt('SetResultsFunctionTimer',20)) this[resultsFunction](resultsText);
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
MaxEnergyQuest:function() {
	if (!GM.GetValue('MaxIdleEnergy', 0)) {
		GM.Log("Changing to idle general to get Max energy");
		return this.PassiveGeneral();
	}
	if (this.stats.energy.num >= GM.GetValue('MaxIdleEnergy')) return this.Quests();
	return false;
},

GetAutoQuest:function() {
	var name=GM.GetValue('AutoQuest','');
	var energy=parseInt(GM.GetValue('AutoQuestEnergy',0));
	var general=GM.GetValue('AutoQuestGeneral','');
	var expRatio=GM.GetValue('AutoQuestRatio',0);
	return { 'name':name,'energy':energy, 'general':general, 'expRatio':expRatio };
},

baseQuestTable : { 'Land of Fire' :'land_fire', 'Land of Earth':'land_earth', 'Land of Mist':'land_mist', 'Land of Water':'land_water', 'Demon Realm' :'land_demon_realm', 'Undead Realm':'land_undead_realm'},
demiQuestTable : { 'Ambrosia' : 'energy', 'Malekus':'attack', 'Corvintheus':'defense', 'Aurora':'health', 'Azeron':'stamina'},

Quests:function() {
	if(GM.GetValue('storeRetrieve','') !== ''){
		if(GM.GetValue('storeRetrieve') == 'general'){
			if (this.SelectGeneral('BuyGeneral')) return true;
			GM.SetValue('storeRetrieve','');
			return true;
		}else return this.RetrieveFromBank(GM.GetValue('storeRetrieve',''));
	}
	this.SetDivContent('quest_mess','');
	if(GM.GetValue('WhenQuest','')=='Never') {
		this.SetDivContent('quest_mess','Questing off.');
		return false;
	}

	if(GM.GetValue('WhenQuest','') == 'Not Fortifying') {
		var maxHealthtoQuest=this.GetNumber('MaxHealthtoQuest');
		//Check to see if we are even battling a monster that needs defense.  if not health will be -1
		if (/Dark Legion/.test(this.monster.name) || /Serpent/.test(this.monster.name) || !this.WhileSinceDidIt('HoleyShipTimer',60*60)) {
			if(!this.WhileSinceDidIt('HoleyShipTimer',60*60)) {
				var holeyShipName = /\S+/i.exec(GM.GetValue('HoleyShip',''));
				this.SetDivContent('quest_mess',holeyShipName + "'s ship/castle needs repair. No questing.");
				return false;
			}

			if(!maxHealthtoQuest) {
				this.SetDivContent('quest_mess','<b>No valid Over Fortify %</b>');
				return false;
			}

			if(GM.GetValue('ShipHealth','') == '') {
				this.SetDivContent('quest_mess','Awaiting ship/castle stats before Questing.');
				return false;
			}

			if(GM.GetValue('ShipHealth','') < maxHealthtoQuest) {
				this.SetDivContent('quest_mess','No Quest until ship/castle health exceeds ' + maxHealthtoQuest + '%');
				return false;
			}
		}
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

	if (autoQuestObj.general == 'none' || GM.GetValue('ForceSubGeneral',false)) {
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
			if (this.NavigateTo('quests,symbolquests','demi_quest_on.gif')) return true;
			var subArea = GM.GetValue('QuestSubArea','Ambrosia');
			var picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+this.demiQuestTable[subArea])
			if (picSlice.style.height!='160px') {
				return this.NavigateTo('deity_'+this.demiQuestTable[subArea]);
			}
			break;
		case 'Atlantis' :
			if (!this.CheckForImage('tab_atlantis_on.gif')) return this.NavigateTo('quests,monster_quests');
	}

	if (button = this.CheckForImage('quick_switch_button.gif')) {
		GM.Log('Clicking on quick switch general button.');
		this.Click(button);
		return true;
	}
	//Buy quest requires popup
	if(itemBuyPopUp = nHtml.FindByAttrContains(document.body,"form","id",'itemBuy')){
		GM.SetValue('storeRetrieve','general');
		if (this.SelectGeneral('BuyGeneral')) return true;
		GM.SetValue('storeRetrieve','');
		var costToBuy =itemBuyPopUp.textContent.replace(/.*\$/,'')
		GM.Log("costToBuy = "+costToBuy);
		if(this.stats.cash < costToBuy) {
			//Retrieving from Bank
			if(this.stats.cash+(GM.GetValue('inStore')-this.GetNumber('minInStore'))>= costToBuy){
				GM.Log("Trying to retrieve: "+(costToBuy-this.stats.cash));
				GM.SetValue("storeRetrieve",costToBuy-this.stats.cash);
				return this.RetrieveFromBank(costToBuy-this.stats.cash);
			}else{
				Zynga.SetAutoQuest('',0,'',0);
				GM.SetValue('WhyQuest','Manual');
				GM.Log("Cant buy requires, stopping quest");
				Zynga.SetControls(true);
				return false;
			}
		}
		if (button = this.CheckForImage('quick_buy_button.jpg')){
		GM.Log('Clicking on quick buy button.');
		this.Click(button);
		return true;
		}
		GM.Log("Cant find buy button");
		return false;
	}

	if (button = this.CheckForImage('quick_buy_button.jpg')) {
		GM.SetValue('storeRetrieve','general');
		if (this.SelectGeneral('BuyGeneral')) return true;
		GM.SetValue('storeRetrieve','');
		var costToBuy = button.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.data.replace(/[^0-9]/g,'');
		GM.Log("costToBuy = "+costToBuy);
			if(this.stats.cash < costToBuy) {
				//Retrieving from Bank
				if(this.stats.cash+(GM.GetValue('inStore')-this.GetNumber('minInStore'))>= costToBuy){
					GM.Log("Trying to retrieve: "+(costToBuy-this.stats.cash));
					GM.SetValue("storeRetrieve",costToBuy-this.stats.cash);
					return this.RetrieveFromBank(costToBuy-this.stats.cash);
				}else{
					Zynga.SetAutoQuest('',0,'',0);
					GM.SetValue('WhyQuest','Manual');
					GM.Log("Cant buy General, stopping quest");
					Zynga.SetControls(true);
					return false;
				}
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
	//if found missing requires, click to buy
	if(background = nHtml.FindByAttrContains(autoQuestObj.tr,"div","style",'background-color')){
		if(background.style.backgroundColor == 'rgb(158, 11, 15)'){
			GM.Log(" background.style.backgroundColor = "+background.style.backgroundColor);
			GM.SetValue('storeRetrieve','general');
			if (this.SelectGeneral('BuyGeneral'))return true;
			GM.SetValue('storeRetrieve','');
			if (background.firstChild.firstChild.title) {
				GM.Log("Clicking to buy "+background.firstChild.firstChild.title);
				this.Click(background.firstChild.firstChild);
				return true;
			}
		}
	}
	if (autoQuestObj.general == 'none' || GM.GetValue('ForceSubGeneral',false)) {
		if (this.SelectGeneral('SubQuestGeneral')) return true;
	} else if (autoQuestObj.general && autoQuestObj.general.indexOf(this.GetCurrentGeneral()) < 0) {
		GM.Log('Clicking on general ' + autoQuestObj.general);
		this.Click(autoQuestObj.genDiv);
		return true;
	}
	GM.Log('Do auto quest: '+autoQuest);
	GM.SetValue('ReleaseControl',true);
	Zynga.Click(autoQuestObj.click,10000);
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
					general = genDiv.title;
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
		if(whyQuest=='Max Influence' && GM.GetValue('swithQuestArea',false)){//if not find quest, probably you already maxed the subarea, try another area
			var SubAreaQuest = GM.GetValue('QuestSubArea','Land of Earth');
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
					GM.SetValue('QuestArea','Demi Quests');
					GM.SetValue('QuestSubArea','Ambrosia');
					break;
				case 'Ambrosia':
					GM.SetValue('QuestSubArea','Malekus');
					break;
				case 'Malekus':
					GM.SetValue('QuestSubArea','Corvintheus');
					break;
				case 'Corvintheus':
					GM.SetValue('QuestSubArea','Aurora');
					break;
				case 'Aurora':
					GM.SetValue('QuestSubArea','Azeron');
					break;
				case 'Azeron':
					GM.SetValue('QuestArea','Quest');
					GM.SetValue('QuestSubArea','Land of Fire');
					break;
				default :
					this.SetAutoQuest('',0,'',0);
					GM.SetValue('WhyQuest','Manual');
					this.SetControls(true);
					return {name:''};
			}
			return false;
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

	if(whenQuest == 'Energy Available' || whenQuest == 'Not Fortifying') {
		if (this.stats.energy.num>=autoQuestObj.energy) return true;
		this.SetDivContent('quest_mess','Waiting for more energy: '+this.stats.energy.num+"/"+(autoQuestObj.energy?autoQuestObj.energy:""));
		return false;
	} else if (whenQuest == 'At Max Energy') {
		if (!GM.GetValue('MaxIdleEnergy', 0)) {
			GM.Log("Changing to idle general to get Max energy");
			this.PassiveGeneral();
		}
		if (this.stats.energy.num >= GM.GetValue('MaxIdleEnergy')) return true;
		if (this.InLevelUpMode() && this.stats.energy.num>=autoQuestObj.energy) {
			this.SetDivContent('quest_mess','Burning all energy to level up');
			return true;
		}
		this.SetDivContent('quest_mess','Waiting for max energy:'+this.stats.energy.num+"/"+GM.GetValue('MaxIdleEnergy'));
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

BlessingResults:function(resultsText) {
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
	this.SetCheckResultsFunction('');
},
AutoBless:function() {
	var autoBless=GM.GetValue('AutoBless','none').toLowerCase();
	if (autoBless=='none') return false;
	if (!this.CheckTimer('BlessingTimer')) return false;
	if (this.NavigateTo('quests,demi_quest_off','demi_quest_bless')) return true;

	var picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+autoBless)
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
	this.SetCheckResultsFunction('BlessingResults');
	Zynga.Click(picSlice);
	return true;
},

/////////////////////////////////////////////////////////////////////

//							PROPERTY

// Displays return on properties and perfom auto purchasing

/////////////////////////////////////////////////////////////////////

PropertiesGetNameFromRow:function(row) {
	// schoolofmagic, etc. <div class=item_title
	var infoDiv=nHtml.FindByAttrXPath(row,'div',"contains(@class,'land_buy_info') or contains(@class,'item_title')");
	if(!infoDiv) {
		GM.Log("can't find land_buy_info");
	}
	if(infoDiv.className.indexOf('item_title')>=0) {
		return infoDiv.textContent.trim();
	}
	var strongs=infoDiv.getElementsByTagName('strong');
	if(strongs.length<1) {
		return null;
	}
	return strongs[0].textContent.trim();
},

bestProp:{prop:'',roi:''},
DrawProperties:function() {
	if(!this.CheckForImage('tab_land_on.gif')|| nHtml.FindByAttrXPath(document,'div',"contains(@class,'AutoZynga_propDone')")) return null;	
	GM.DeleteValue('BestPropCost');
	this.sellProp = '';	
	this.bestProp.roi =0;
	var propByName=this.IterateProperties(function(prop) {
		this.SelectProperties(prop.row, 2);
		var roi=(parseInt((prop.income/prop.totalCost)*240000) /100);
		selects = prop.row.getElementsByTagName('select'); 
		if(!nHtml.FindByAttrXPath(prop.row,'input',"@name='Buy'")) {
			roi = 0;
			// Lets get our max allowed from the land_buy_info div
			div = nHtml.FindByAttrXPath(prop.row,'div',"contains(@class,'land_buy_info') or contains(@class,'item_title')");
			maxText = nHtml.GetText(div).match(/:\s+\d+/i).toString().trim();
			maxAllowed= Number(maxText.replace(/:\s+/,''));
			// Lets get our owned total from the land_buy_costs div
			div = nHtml.FindByAttrXPath(prop.row,'div',"contains(@class,'land_buy_costs')");
			ownedText = nHtml.GetText(div).match(/:\s+\d+/i).toString().trim();
			owned = Number(ownedText.replace(/:\s+/,''));
			// If we own more than allowed we will set property and selection
			var selection = new Array(1,5,10);	
			for (var s=2; s>=0; s--) {
				if (owned - maxAllowed >= selection[s]) {
					this.sellProp = prop;
					this.sellProp.selection = s;
					break;
				}
			}						
		}		
		div = nHtml.FindByAttrXPath(prop.row,'div',"contains(@class,'land_buy_info') or contains(@class,'item_title')").getElementsByTagName('strong');
		div[0].innerHTML+=" | "+roi+"% per day.";
		if(!prop.usedByOther) {
			if(!(this.bestProp.roi || roi == 0)|| roi>this.bestProp.roi) {
				this.bestProp.roi=roi;
				this.bestProp.prop=prop;
				GM.SetValue('BestPropCost',this.bestProp.prop.cost);
			}
		}
		if(prop.row.className == "land_buy_row_unique"){
			if(nHtml.GetText(prop.row).match(/each consecutive day/i) != null) {
				GM.Log("Found unique land, cheking timer");
				if(nHtml.GetText(prop.row.childNodes[1].childNodes[7].childNodes[5])){
					resultsText = nHtml.GetText(prop.row.childNodes[1].childNodes[7].childNodes[5]).trim()
					if(resultsText.match(/([0-9]{1,2}:)?([0-9]{2}:)?[0-9]{2}/)){
						resultsText = resultsText.match(/([0-9]{1,2}:)?([0-9]{2}:)?[0-9]{2}/).toString().split(',')[0];
						resultsText = resultsText.split(':');
						var time=[];
						for(x = 2; x >= 0 ; x--){
							time[x] = 0;
							if(resultsText[x])
								time[x] = resultsText[resultsText.length-1-x];
						}
						hours =  time[2];
						minutes =  time[1];
						seconds =  time[0];
						GM.Log("hours:"+hours+" minutes:"+minutes+" seconds:"+seconds);
						if(GM.GetValue('LandTimer',9999999999999999999999999) > (new Date().getTime())*1000+hours*3600+minutes*60+seconds){
							GM.Log("Setting Land Timer");
							this.SetTimer('LandTimer',hours*3600+minutes*60+seconds);
						}
						//prop.row.childNodes[1].childNodes[7].childNodes[5].childNodes[5].childNodes[1]
					}else {GM.Log("You need to buy a prop first"); this.SetTimer('LandTimer',9999999999999999999999999);}
				}else GM.Log("Error");
			}	
		}
	});
	GM.Log("BestPropCost:"+GM.GetValue('BestPropCost'));
	if(!GM.GetValue('BestPropCost')){
		GM.SetValue('BestPropCost','none');
	}
	div=document.createElement('div');
	div.className='AutoZynga_propDone';
	div.style.display='none';
	nHtml.FindByAttrContains(document.body,"tr","class",'land_buy_row').appendChild(div);
	return null;
},

IterateProperties:function(func) {
	var content=document.getElementById('content');
	var ss=document.evaluate(".//tr[contains(@class,'land_buy_row')]",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if (!ss || (ss.snapshotLength == 0)) {
		//GM.Log("Can't find land_buy_row");
		return null;
	}
	var builtOnRe=new RegExp('(Built On|Consumes|Requires):\\s*([^<]+)','i');
	var propByName={};
	var propNames=[];

	var gameName=this.gameName;
	//GM.Log('forms found:'+ss.snapshotLength);
	for(var s=0; s<ss.snapshotLength; s++) {

		var row=ss.snapshotItem(s);
		if(!row) { continue; }

		var name=this.PropertiesGetNameFromRow(row);

		if(name==null || name=='') { GM.Log("Can't find property name"); continue; }

		var moneyss=document.evaluate(".//*[contains(@class,'gold') or contains(@class,'currency')]",row,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

		if(moneyss.snapshotLength < 2) { GM.Log("Can't find 2 gold instances"); continue; }

		var nums=[];
		var numberRe=new RegExp("([0-9,]+)");
		for(var sm=0; sm<moneyss.snapshotLength; sm++) {
			var income=moneyss.snapshotItem(sm);
			if(income.className.indexOf('label')>=0) {
				income=income.parentNode;
				var m=numberRe.exec(income.textContent);
				if(m && m.length>=2 && m[1].length>1) {
					// number must be more than a digit or else it could be a "? required" text
					income=this.NumberOnly(m[1]);
				} else {
					//GM.Log('Cannot find income for: '+name+","+income.textContent);
					income=0;
					continue;
				}
			} else {
				income=this.NumberOnly(income.textContent);
			}
			nums.push(income);
		}

		var income=nums[0];
		var cost=nums[1];
		if(!income || !cost) {
			GM.Log("Can't find income or cost for " + name);
			continue;
		}
		if(income>cost) {
			// income is always less than the cost of property.
			income=nums[1]; cost=nums[0];
		}

		var totalCost=cost;

		var prop={'row':row,'name':name,'income':income,'cost':cost,'totalCost':totalCost,'usedByOther':false};

		propByName[name]=prop;
		propNames.push(name);
	}

	for(var p=0; p<propNames.length;p++) {
		func.call(this,propByName[propNames[p]]);
	}
	return propByName;
},

SelectProperties:function(row,val) {
	var selects=row.getElementsByTagName('select');
	if(selects.length<1) { return false; }
	var select=selects[0];
	select.selectedIndex=val;
	return true;
},
BuyProperty:function(prop) {
	//this.DrawProperties();
	this.SelectProperties(prop.row,2);
	var button;
	if(button=nHtml.FindByAttrXPath(prop.row,'input',"@type='submit' or @type='image'")){
//		GM.Log("Clicking buy button:" +button);
		if(button) {
			GM.Log("Buying Prop: " +prop.name);
			this.Click(button,13000);
			GM.SetValue('BestPropCost','')
			this.bestProp.roi = '';
			return true;
		}
	}
	return false;
},
SellProperty:function(prop,select) {
	//this.DrawProperties();
	this.SelectProperties(prop.row,select);
	var button;
	if(button=nHtml.FindByAttrXPath(prop.row,'input',"@type='submit' or @type='image'")){
//		GM.Log("Clicking sell button:" +button);
		if(button) {
			GM.Log("Selling Prop: " +prop.name);
			this.Click(button,13000);
			this.sellProp = '';
			return true;
		}
	}
	return false;
},

Properties:function() {
	if(this.CheckTimer('LandTimer')) {
		if (this.NavigateTo('soldiers,land')) return true;
	}
	var autoBuyProperty=GM.GetValue('autoBuyProperty',0);
	if(autoBuyProperty) {
		// Do we have properties above our max to sell?
		if (this.sellProp) {
			this.SellProperty(this.sellProp,this.sellProp.selection);
			return true;	
		}	
		
		if(!GM.GetValue('BestPropCost')){
			GM.Log("Going to land to get Best Property Cost");
			if (this.NavigateTo('soldiers,land')) return true;
		}
		if(GM.GetValue('BestPropCost') == 'none'){
			//GM.Log("No Properties avaliable");
			return false;
		}
		if(!GM.GetValue('inStore')){
			GM.Log("Going to keep to get Stored Value");
			if (this.NavigateTo('keep')) return true;
		}
		//Retrieving from Bank
		if(this.stats.cash+(GM.GetValue('inStore')-this.GetNumber('minInStore'))>=10*GM.GetValue('BestPropCost') && this.stats.cash < 10*GM.GetValue('BestPropCost')){
			if(this.PassiveGeneral())return true;
			GM.Log("Trying to retrieve: "+(10*GM.GetValue('BestPropCost')-this.stats.cash));
			return this.RetrieveFromBank(10*GM.GetValue('BestPropCost')-this.stats.cash);
		}

// Need to check for enough moneys + do we have enough of the builton type that we already own.
		if(GM.GetValue('BestPropCost') && this.stats.cash >= 10*GM.GetValue('BestPropCost')){
			if(this.PassiveGeneral())return true;
			this.NavigateTo('soldiers,land');
			if(this.CheckForImage('tab_land_on.gif')){
				GM.Log("Buying property: "+Zynga.bestProp.name);
				if (this.BuyProperty(Zynga.bestProp.prop))
				return true;
			}else return this.NavigateTo('soldiers,land');
		}
	}
	return false;
},

/////////////////////////////////////////////////////////////////////

//							BATTLING PLAYERS

/////////////////////////////////////////////////////////////////////

// Doesn't appear to be implemented in CA
/*
IterateBattleLinks:function(func) {
	var content=document.getElementById('content');
	if(!content) { return; }
	var ss=document.evaluate(".//a[(contains(@href,'xw_controller=stats') and contains(@href,'xw_action=view')) "+
		"or (contains(@href,'/profile/'))"+
		"or (contains(@href,'/"+this.gameName+"/profile.php?userId='))"+
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

AddBattleLinks:function() {
	if(document.getElementById('addBattleLink')) {
		return;
	}
	this.IterateBattleLinks(function(userLink,user) {
	if(nHtml.FindByAttr(userLink.parentNode,'a','class','addBattle')) { return; }
		var addBattle=document.createElement('a');
		addBattle.className='addBattle';
		addBattle.id='addBattleLink';
		addBattle.innerHTML='(Auto Battle)';
		addBattle.addEventListener('click',function() {
			var battleTarget=document.getElementById('AutoZynga_BattleTargets');
			if(battleTarget.value=="freshmeat") { battleTarget.value=''; }
			if(battleTarget.value!="") { battleTarget.value+="\n"; }
			battleTarget.value+=user;
			Zynga.SaveBoxText('BattleTargets');
		},false);
		userLink.parentNode.insertBefore(addBattle,userLink.nextSibling);
		userLink.parentNode.insertBefore(document.createTextNode(' '),userLink.nextSibling);
	});
},
*/

CheckBattleResults:function() {
	// Check for Battle results
	if (nHtml.FindByAttrContains(document.body,"img","src",'battle_victory.gif')) {
		winresults = nHtml.FindByAttrContains(document.body,'span','class','positive');
		bptxt = nHtml.GetText(winresults.parentNode).toString().trim();
		bpnum = Number(bptxt.match(/\d+/i));
		goldtxt = nHtml.FindByAttrContains(document.body,"b","class",'gold').innerHTML;
		goldnum = Number(goldtxt.substring(1).replace(/,/,''));

		nameLink=nHtml.FindByAttrContains(document.body,"a","href","keep.php?user=");
		userId = nameLink.href.match(/user=\d+/i);
		userId = String(userId).substr(5);
		userName = nHtml.GetText(nameLink).trim();

		wins = 1
		GM.Log("We Defeated "+userName+"!!")

		//Test if we should chain this guy
		if (this.GetNumber('ChainBP') !== '' && bpnum >= Number(this.GetNumber('ChainBP'))) {
			GM.SetValue("BattleChainId",userId);
			GM.Log("Chain Attack " + userId + " Battle Points:" + bpnum );
		} else if  (this.GetNumber('ChainGold') !== '' && goldnum >= Number(this.GetNumber('ChainGold'))) {
			GM.SetValue("BattleChainId",userId);
			GM.Log("Chain Attack " + userId + " Gold:" + goldnum)
		} else GM.SetValue("BattleChainId",'');

/* 	Not ready for primtime.   Need to build SliceList to extract our element
		if (GM.GetValue('BattlesWonList','').indexOf("\t"+userId+"\t") >= 0) {
			element = GM.SliceList('BattlesWonList',"\t"+userId+"\t");
			elementArray = element.split(os);
			prevWins = Number(elementArray[3]);
			prevBPs = Number(elementArray[4]);
			prevGold = Number(elementArray[5]);
			wins = prevWins + wins;
			bpnum = prevBPs + bpnum;
			goldnum  = prevGold + goldnum
		}
*/
		if (GM.GetValue('BattlesWonList','').indexOf("\t"+userId+"\t") == -1) {
			now = (new Date().getTime()).toString();
			newelement = now + os + userId + os + userName + os + wins + os + bpnum + os + goldnum;
			GM.ListPush('BattlesWonList',newelement,100);
		}
		this.SetCheckResultsFunction('');
	} else if (nHtml.FindByAttrContains(document.body,"img","src",'battle_defeat.gif')) {
		nameLink=nHtml.FindByAttrContains(document.body,"a","href","keep.php?user=");
		userId = nameLink.href.match(/user=\d+/i);
		userId = String(userId).substr(5);
		userName = nHtml.GetText(nameLink).trim();

		GM.Log("We Were Defeated By "+userName+".")
		if (GM.GetValue('BattlesLostList','').indexOf("\t"+userId+"\t") == -1) {
			now = (new Date().getTime()).toString();
			newelement = now + os + userId + os + userName
			GM.ListPush('BattlesLostList',newelement,100)
		}
/* 	Not ready for primtime.   Need to build SliceList to yank our elemment out of the win list as well
		if (GM.GetValue('BattlesWonList','').indexOf("\t"+userId+"\t") >= 0) {
			trash = GM.SliceList('BattlesWonList',"\t"+userId+"\t");
			elementArray = element.split(os);
		}
*/		this.SetCheckResultsFunction('');
	}
},
FindBattleForm:function(obj,withOpponent) {
	var ss=document.evaluate(".//form[contains(@onsubmit,'battle.php')]",obj,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var battleForm=null;
	for(var s=0; s<ss.snapshotLength; s++) {
		battleForm=ss.snapshotItem(s);

		// ignore forms in overlays
		var p=battleForm;
		while(p) {
			if (p.id && p.id.indexOf('verlay')>=0) {
				battleForm=null; break;
			}
			p=p.parentNode;
		}
		if(!battleForm) {
			continue;
		}

		var inviteButton=nHtml.FindByAttrXPath(battleForm,"input","(@type='submit' or @name='submit') and (contains(@value,'Invite') or contains(@value,'Notify'))");
		if(inviteButton) {
			// we only want "attack" forms not "attack and invite", "attack & notify"
			continue;
		}

		var submitButton=nHtml.FindByAttrXPath(battleForm,"input","@type='image'");
		if(!submitButton) {
			// we only want forms that have a submit button
			continue;
		}

		if(withOpponent) {
			var inp=nHtml.FindByAttrXPath(battleForm,"input","@name='target_id'");
			if(!inp) {
				continue;
			} else {
				GM.Log('inp.name is:' + inp.name);
			}
		}

		if (GM.GetValue("BattleType","Invade") == "Duel") {
			var inp=nHtml.FindByAttrXPath(battleForm,"input","@name='duel'");
			if (inp) {
				if (inp.value == "false") continue;
				else GM.Log('dueling form found');
			}
		}

		if(battleForm) { break; }
	}

	return battleForm;
},

battleLinkXPath:"(contains(@onclick,'xw_controller=battle') and contains(@onclick,'xw_action=attack')) "+
	"or contains(@onclick,'directAttack')"+
	"or contains(@onclick,'_battle_battle(')",

BattleUserId:function(userid) {
	GM.Log('Battle user:'+userid);
	if ((inp = nHtml.FindByAttrContains(document.body,'input','value',userid))) {
		if((battleButton=nHtml.FindByAttrXPath(inp.parentNode,"input","@type='image'"))) {
			GM.Log('Battle user button:'+battleButton.name);
			this.lastBattleID=userid;
			this.ClickBattleButton(battleButton);
			return true;
		} else {
			GM.Log('No submit button?:'+battleButton.name);
			return false;
		}
	}
	var battleForm=this.FindBattleForm(document,true);
	if(battleForm && userid > 0) {
		GM.Log('Found battleForm');
		if(!(inp=nHtml.FindByAttrXPath(battleForm,"input","@name='target_id'"))) {
			GM.Log('no target_id in attack form');
			return false;
		}
		inp.value=userid;
	}
	GM.Log('No battleform or ID = 0');
},
rankTable:{'acolyte':0, 'scout': 1,'soldier': 2,'elite soldier': 3,'squire': 4,'knight': 5,'first knight': 6,'legionnaire': 7,'centurion': 8,'champion': 9,'lieutenant commander':10,'commander':11,'high commander':12,'lieutenant general':13,'general':14,'high general':15,'baron':16,'earl':17,'duke':18},

battleLevelRe:new RegExp('Level ([0-9]+)\\s*([A-Za-z ]+)','i'),

battleUserListHeader : ['targetID','targetName','deity','rank','armysize','battlePoints','timesKilled'],

ClickBattleButton:function(battleButton) {
	GM.SetValue('ReleaseControl',true);
	this.SetCheckResultsFunction('CheckBattleResults');
	this.Click(battleButton);
},
BattleFreshmeat:function() {
	if (GM.GetValue('BattleType','Invade') == "Duel") target = "//input[contains(@src,'battle_02.gif')]"
	else target = "//input[contains(@src,'battle_01.gif')]"

	var ss=document.evaluate(target,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	if(ss.snapshotLength<=0) {
		GM.Log('No battle buttons on battlepage?');
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
			demiPointList = GM.GetList('DemiPointList');
			if (parseInt(demiPointList[deityNumber])==10 || !GM.GetValue('DemiPoint'+deityNumber)) continue;
		}

		var txt=nHtml.GetText(tr).trim();
		var levelm=this.battleLevelRe.exec(txt);
		if (!levelm) {
			GM.Log("Can't match battleLevelRe in " + txt);
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
		var minRank = (GM.GetValue("FreshMeatMinRank",'') == ''?99:Number(GM.GetValue("FreshMeatMinRank")))
		var maxLevel = (GM.GetValue("FreshMeatMaxLevel",'') == ''?1000:Number(GM.GetValue("FreshMeatMaxLevel")))
		var ARBase = (GM.GetValue("FreshMeatARBase",'') == ''?.5:Number(GM.GetValue("FreshMeatARBase")))
		var ARMax = (GM.GetValue("FreshMeatARMax",'') == ''?1000:Number(GM.GetValue("FreshMeatARMax")))
		var ARMin = (GM.GetValue("FreshMeatARMin",'') == ''?0:Number(GM.GetValue("FreshMeatARMin")))

		if (level - this.stats.level > maxLevel) continue;

		if (this.stats.rank && (this.stats.rank - rankInt  > minRank)) continue;

		var levelMultiplier = this.stats.level/level

		var armyRatio = ARBase * levelMultiplier
		var armyRatio = Math.min(armyRatio,ARMax)
		var armyRatio = Math.max(armyRatio,ARMin)

		if (armyRatio <= 0) {
			GM.Log("Bad ratio");
			continue;
		}

//		GM.Log("Army Ratio:" + armyRatio + " Level:" + level + " Rank:" + rankInt + " Army: " + army)

		// if we know our army size, and this one is larger than armyRatio, don't battle
		if (this.stats.army && (army > (this.stats.army*armyRatio))) {
			continue;
		}

		var inp=nHtml.FindByAttrXPath(tr,"input","@name='target_id'");
		var id=inp.value;

		var dfl = GM.GetValue('BattlesLostList','')
		if (dfl.indexOf("\t"+id+"\t") >= 0 && GM.GetValue('DontBattleOption',true)) {
			// don't battle people we recently lost to
			continue;
		}


		var thisScore = rankInt-(army/levelMultiplier/this.stats.army);
		safeTargets += id + "," + army + "," + level + "," + rankInt + "," + thisScore + " / "
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
		this.ClickBattleButton(bestButton);
		this.lastBattleID = bestID;
		return true;
	}

	GM.Log('No safe targets.');
	this.NavigateTo('battle_on.gif');
	GM.SetValue('LastAction','Idle');
	return true;
},battleRaidRe:new RegExp('Rank: ([0-9]+) ([^0-9]+) ([0-9]+) ([^0-9]+) ([0-9]+)','i'),
BattleRaid:function() {
try{
	
	if (GM.GetValue('BattleType','Invade') == "Duel") target = "//input[contains(@src,'raid_attack_button2.gif')]"
	else target = "//input[contains(@src,'raid_attack_button.gif')]"

	var ss=document.evaluate(target,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	if(ss.snapshotLength<=0) {
		
		///////////////// Going to Raid Page \\\\\\\\\\\\\\\\\\\\\\
		resultsDiv = nHtml.FindByAttrContains(document.body,'span','class','result_body')
		if (resultsDiv) {
			resultsText = nHtml.GetText(resultsDiv).trim()
			if (resultsText.match(/temporarily disabled/)) {
				this.JustDidIt('NoRaidToAttack');
				return false;
			}	
		}

		if (!this.CheckForImage('tab_raid_on.gif')) {
			return this.NavigateTo(this.battlePage+',raid');
		}
		if (nHtml.FindByAttrContains(document.body,"img","src", 'http://image2.castleagegame.com/1210/graphics/raid_map_2.jpg' )||nHtml.FindByAttrContains(document.body,"img","src", 'http://image2.castleagegame.com/1210/graphics/raid_map_1.jpg' )){
			//inside raid but dont find targets (CA bug)
			GM.Log("Not find target");
			if (this.NavigateTo('raid')) return true;
		}
		///////////////// Check For Raid Page \\\\\\\\\\\\\\\\\\\\\\

		// search for ENGAGE button specifically, not "collect reward" button... user can do that manually
		var ss=document.evaluate(".//img[contains(@src,'dragon_list_btn_3')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

		if (ss.snapshotLength==0) {
			GM.Log("No engage button");
			this.NavigateTo(this.battlePage);
			this.JustDidIt('NoRaidToAttack');
			return false;
		}

		///////////////// Select Raid Page \\\\\\\\\\\\\\\\\\\\\\

		
		// Process Attack Order
		engageButton = null;
		var achMonstList = GM.GetList('MonstersOverAchDam',' ');
		var holeyList = GM.GetList('HoleyShip',' ');
		var maxList = GM.GetList('MonstersOverMaxDam',' ');
		var attackOrderString = GM.GetValue('AttackOrder','') + ",your,'";
		GM.Log('Attack Order ' + attackOrderString);
		var attackOrderList=attackOrderString.split(/[\n,]/);
		// The extra apostrophe at the end of attack order makes it match any "soandos's monster" so it always selects a monster if available

		var tfList = [0, 1];
		for (var tf in tfList) {
			if (!GM.GetValue('AchievementMode',false) && tf == 0) continue;
			GM.Log((tf==1)?'Searching for anything available.':'Looking for monsters below achievement');
			this.SetDivContent('battle_mess',(tf==1)?'Searching for anything available.':'Looking for monsters below achievement');
			for(var p in attackOrderList) {
				if (attackOrderList[p].trim())
					attackOrderName = attackOrderList[p].match(/^[^:]+/).toString().trim().toLowerCase();
				else continue;
				for(var s=0; s<ss.snapshotLength; s++) {
					var div=ss.snapshotItem(s).parentNode.parentNode.parentNode.parentNode;
					this.monster.name=nHtml.GetText(div).trim();
					var monstMatch = (this.monster.name.toLowerCase().indexOf(attackOrderName)>=0)
					if ((monstMatch==true) && ((tf==1) || (achMonstList.indexOf(this.monster.name)==-1))) {
						if (holeyList.indexOf(this.monster.name)>=0) {
							GM.Log('Skipping Holey Ship: '+ this.monster.name + ' Holey Ships: ' + holeyList);
							continue;
						}
						if (maxList.indexOf(this.monster.name)>=0) {
							GM.Log('Skipping monster over max damage: '+ this.monster.name + ' Over Max Damage List: ' + maxList);
							continue;
						}
						engageButton = ss.snapshotItem(s).parentNode;
						this.monster.conditions= attackOrderList[p].replace(/^[^:]+/,'').toString().trim().toLowerCase();
						GM.Log("Found monster. Name:" + this.monster.name + " Word: " + attackOrderList[p].replace(/:.+/,'') + ' conditions ' + this.monster.conditions);

						// break out of loops
						break;
					}
				} if (engageButton) break;
			} if (engageButton) break;
		}

		GM.Log("Opening " + this.monster.name);
		if (engageButton) {
			this.SetDivContent('battle_mess','Checking on ' + this.monster.name);
			this.raidEngageButton = engageButton;
			Zynga.Click(engageButton);
			return true;
		} else {
			this.JustDidIt('NoRaidToAttack');
			GM.Log("Oops.  Engage button not there for " + this.monster.name);
			return false;
		}
	}

	resultsDiv = nHtml.FindByAttrContains(document.body,'span','class','result_body')
	if (resultsDiv) {
		var loading = document.getElementById('app46755028429_AjaxLoadIcon');
		if (loading.style.display != 'block'){
			resultsText = nHtml.GetText(resultsDiv).trim()
			
			if (resultsText.match(/Your opponent/)) {
				this.val ++;
				GM.Log('Dead oponent, looking for other target');
			}
		}
	}
	
	var bestButton;
	var bestScore = -10000;
	var bestID = 0;
	var bestTargetNumber = 0;
	var safeTargets = []; 
	var count = 0;
	//GM.Log("my army/rank/level:" + this.stats.army + "/" + this.stats.rank + "/" + this.stats.level);
	for(var s=0; s<ss.snapshotLength; s++) {
		var button=ss.snapshotItem(s);
		//GM.Log("s = "+s);
		var tr=button;
			tr=tr.parentNode.parentNode.parentNode.parentNode.parentNode;


		if(!button) {
			GM.Log('No tr parent of button?');
			continue;
		}
		var txt=tr.childNodes[3].childNodes[3].textContent;
		
		//GM.Log("txt = "+txt);
		var levelm=this.battleRaidRe.exec(txt);
		/*for(var x in levelm){
			GM.Log("levelm["+x+"] = "+levelm[x]);
		}*/
		if (!levelm) {
			GM.Log("Can't match battleRaidRe in " + txt);
			continue;
		}
		
		var rank =parseInt(levelm[1]);
		var level=parseInt(levelm[3]);
		var army =parseInt(levelm[5]);

		// Lets get our Freshmeat user settings
		var minRank = (GM.GetValue("FreshMeatMinRank",'') == ''?99:Number(GM.GetValue("FreshMeatMinRank")))
		var maxLevel = (GM.GetValue("FreshMeatMaxLevel",'') == ''?1000:Number(GM.GetValue("FreshMeatMaxLevel")))
		var ARBase = (GM.GetValue("FreshMeatARBase",'') == ''?.5:Number(GM.GetValue("FreshMeatARBase")))
		var ARMax = (GM.GetValue("FreshMeatARMax",'') == ''?1000:Number(GM.GetValue("FreshMeatARMax")))
		var ARMin = (GM.GetValue("FreshMeatARMin",'') == ''?0:Number(GM.GetValue("FreshMeatARMin")))

		if (level - this.stats.level > maxLevel) continue;
		
		if (this.stats.rank && (this.stats.rank - rank  > minRank)) continue;

				var levelMultiplier = this.stats.level/level

		var armyRatio = ARBase * levelMultiplier
		var armyRatio = Math.min(armyRatio,ARMax)
		var armyRatio = Math.max(armyRatio,ARMin)

		if (armyRatio <= 0) {
			GM.Log("Bad ratio");
			continue;
		}

//		GM.Log("Army Ratio:" + armyRatio + " Level:" + level + " Rank:" + rank + " Army: " + army)

		// if we know our army size, and this one is larger than armyRatio, don't battle
		if (this.stats.army && (army > (this.stats.army*armyRatio))) {
			continue;
		}

		var inp=nHtml.FindByAttrXPath(tr,"input","@name='target_id'");
		var id=inp.value;
		
		if (this.doNotBattle && this.doNotBattle.indexOf(id) >= 0) continue;

		var dfl = GM.GetValue('BattlesLostList','')
		if (dfl.indexOf('\t'+id+'\t') >= 0 && gm.getValue('DontBattleOption',true)) {
			// don't battle people we recently lost to
			continue;
		}


		var thisScore = rank-(army/levelMultiplier/this.stats.army);
		//GM.Log("thisScore:" + thisScore);
		//GM.Log("best army/level:" + army + "/"  + level);
		var temp ={};
		temp.id = id ;
		temp.score = thisScore ;
		temp.button = button ;
		temp.targetNumber = s+1 ;
		safeTargets[count] = temp; 
		count++;
		
		for(var x = 0 ; x < count; x++){
			for(var y = 0 ; y < x ; y++){
				if(safeTargets[y].score< safeTargets[y+1].score){
					var temp = safeTargets[y];
					safeTargets[y] = safeTargets[y+1];
					safeTargets[y+1] = temp;
				}
			}
		}

	}
	for(var x = 0 ; x < count; x++){
	//	GM.Log("safeTargets["+x+"].id = "+safeTargets[x].id+" safeTargets["+x+"].score = "+safeTargets[x].score);
		if(!this.lastBattleID && this.lastBattleID == safeTargets[x].id && x < count-1) continue;
		bestButton = safeTargets[x].button;
		if (bestButton != null) {
			GM.Log('Found Raid score: ' + safeTargets[x].score + ' id: ' + safeTargets[x].id +' Number: '+safeTargets[x].targetNumber);
			//GM.Log('   Out of these targets:' + safeTargets);
			GM.SetValue('LastAction','Idle');
            // form = bestButton.parentNode.parentNode
            // var inp=nHtml.FindByAttrXPath(form,"input","@name='target_id'");
            // if (inp) inp.value = '100000338877944';
            // else GM.Log("Target ID Not Overriden");  
			this.ClickBattleButton(bestButton);
			this.lastBattleID = safeTargets[x].id;
			return true;
		}
	}
	GM.Log('No safe targets.');
	if (this.raidEngageButton) Zynga.Click(this.raidEngageButton);
	else this.NavigateTo('raid');

	return true;
}catch (e){GM.Log("ERROR Raid :"+e);window.location ='http://apps.facebook.com/castle_age/raid.php';}
},

Battle:function(mode) {
	if (!this.CheckNotHiding("Battle")) {
//		GM.Log("Not Hiding Mode: Safe To Wait For Monster.")
		this.SetDivContent('battle_mess','Safe To Wait For Monster');
		return false;
	}
	if (GM.GetValue('WhenBattle') == 'No Monster' && mode != 'DemiPoints') {
		if ((GM.GetValue('WhenMonster','') != 'Never') && this.WhileSinceDidIt('NoMonsterToAttack',60*5)) {
			return false;
		}
	}
	if (!this.CheckStamina('Battle')) return false;

	if (this.WhileSinceDidIt('MyRankLast',60*60)) {
			GM.Log('Visiting keep to get new rank');
			this.NavigateTo('keep');
			return true;
	}

	if (this.SelectGeneral('BattleGeneral')) return true;

	// Check if we should chain attack
	if (nHtml.FindByAttrContains(document.body,"img","src",'battle_victory.gif')) {

		if (GM.GetValue('BattleType') == 'Invade')
			chainButton = this.CheckForImage('battle_invade_again.gif');
		else
			chainButton = this.CheckForImage('battle_duel_again.gif');

		if (chainButton && GM.GetValue("BattleChainId",'') != '') {
			this.SetDivContent('battle_mess','Chain Attack In Progress');
			this.ClickBattleButton(chainButton);
			GM.SetValue("BattleChainId",'')
			return true;
		}
	}
    if (GM.GetValue('TargetType','Freshmeat') == "Raid" && this.WhileSinceDidIt('NoRaidToAttack',60*5)) {
		this.SetDivContent('battle_mess','Joining the raid');
		return this.BattleRaid();
	}

	if (GM.GetValue('BattleType','Invade') == "Duel") image = 'battle_02'
	else image = 'battle_01'

	if (this.NavigateTo(this.battlePage,image)) return true;

	var target=this.GetCurrentBattleTarget();
	GM.Log("target = "+target);
	if(!target) {
		this.NextBattleTarget();
		return false;
	}

	GM.Log('battling ' + target);
	this.SetDivContent('battle_mess','Battling ' + target);
	if(target=='freshmeat') return this.BattleFreshmeat();
	if(target=='raid') return this.BattleRaid();
	if (this.BattleUserId(target)) this.NextBattleTarget();
	return true;
},

NextBattleTarget:function() {
	if (GM.GetValue("BattleChainId",'')!='') {
		GM.SetValue("BattleChainId",'');
		return;
	}
	var battleUpto=GM.GetValue('BattleTargetUpto',0);
	GM.SetValue('BattleTargetUpto',battleUpto+1);
},

GetCurrentBattleTarget:function() {
	if (GM.GetValue("BattleChainId",'')!='') return GM.GetValue("BattleChainId");
	if (GM.GetValue('TargetType','') == 'Freshmeat') return 'freshmeat';
	if (GM.GetValue('TargetType','') == 'Raid') {
		if (this.WhileSinceDidIt('NoRaidToAttack',60*5)) return 'raid';
		else return 'freshmeat';
	}
	var target=GM.GetValue('BattleTargets',"");
	if(!target) return false;
	var targets=target.split(/[\n,]/);
	var battleUpto=GM.GetValue('BattleTargetUpto',0);
	battleUpto=battleUpto%targets.length;
//	GM.Log('target ' + target + ' targets.length ' + targets.length+ ' battleUpto%targets.length ' + battleUpto%targets.length);
	GM.Log('nth battle target:'+battleUpto+':'+targets[battleUpto]);
	return targets[battleUpto];
},

/////////////////////////////////////////////////////////////////////

//							ATTACKING MONSTERS

/////////////////////////////////////////////////////////////////////

monstAchTable:{'Dragon':100000, 'Serpent': 250000,'Knight': 30000,'Terra': 20000,'Hydra': 500000,'Ravenmoore': 500000,'King': 15000,'Queen': 50000,'Legion':250,'Mephistopheles':250000},

monster:{},

parseCondition:function(type,conditions) {
	if (!conditions || conditions.toLowerCase().indexOf(':'+type) <0) return 0;
	var value = conditions.substring(conditions.indexOf(':'+type)+4).replace(/:.+/,'');
	if (/k$/i.test(value) || /m$/i.test(value)) {
		value = parseInt(value) * 1000 * (/\d+k/i.test(value) + /\d+m/i.test(value) * 1000);
	}
	return parseInt(value);
},

Monsters:function() {
	if (!this.WhileSinceDidIt('NoMonsterToAttack',60*5)) return false;

///////////////// Occasional Monster Tasks \\\\\\\\\\\\\\\\\\\\\\

	if (!this.CheckNotHiding("Monster") && this.CheckStamina('Monster',1)) {
		GM.Log("Not Hiding Mode: We're not safe. Go battle.")
		this.SetDivContent('battle_mess','Not Safe For Monster. Battle!');
		return false;
	}
	//See if we can launch a siege weapon
	if (this.WhileSinceDidIt('MonsterSiege',2*60*60)) {
		if(!this.CheckStamina('Monster',1)) return false;
		if (!GM.GetList('SiegeList').length) {
			if (this.NavigateTo('keep,battle_monster','tab_monster_on.jpg')) return true;
			var ss=document.evaluate(".//img[contains(@src,'dragon_list_btn_3')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			for(var s=0; s<ss.snapshotLength; s++) {
				var div=ss.snapshotItem(s).parentNode;
				siegeID = div.href.match(/user=\d+/i);
				siegeID = siegeID[0].substr(5);
				GM.Log('Loop siege ID = ' + siegeID);
				if (div.href.match(/mpool=3/i) && GM.GetValue('SiegeCompleteList','').indexOf(siegeID) < 0) {
					GM.ListPush('SiegeList',siegeID);
				}
			}
		}
		if (GM.GetList('SiegeList').length) {
			GM.Log("Participating in Siege");
			var siegeID = GM.ListPop('SiegeList');
			this.SetDivContent('battle_mess','Checking sieges.');
			GM.Log('siegeID: ' + siegeID + ' siegelist ' + GM.GetList('SiegeList'));
			if (!GM.GetList('SiegeList').length) {
				this.JustDidIt('MonsterSiege');
				this.monster.name=' ';
				GM.Log('Siege Complete');
			}
			Zynga.VisitUrl("http://apps.facebook.com/castle_age/battle_monster.php?user=" + siegeID + "&action=doObjective&mpool=3&lka=" + siegeID + "&twt=drg&ref=nf");
			return true;
		} else {
			this.JustDidIt('MonsterSiege');
			this.monster.name=' ';
			GM.Log('No siege monsters.');
			return true;
		}
	}

///////////////// Individual Monster Page \\\\\\\\\\\\\\\\\\\\\\

// Establish a delay timer when we are 1 stamina below attack level. Timer includes 5 min for stamina tick plus user defined random interval
	if (!this.InLevelUpMode() && this.stats.stamina.num == (GM.GetValue('MonsterStaminaReq',1) - 1) && this.CheckTimer('battleTimer') && GM.GetValue('seedTime',0) > 0) {
		this.SetTimer('battleTimer',5*60+Math.floor(Math.random()*GM.GetValue('seedTime',0)));
		this.SetDivContent('battle_mess','Monster Delay Until ' + this.DisplayTimer('battleTimer'));
		return false;
	}
	if (!this.CheckTimer('battleTimer')) {
		if(this.stats.stamina.num < GM.GetValue('MaxIdleStamina',this.stats.stamina.max)) {
			this.SetDivContent('fight_mess','Monster Delay Until ' + this.DisplayTimer('battleTimer'));
			return false;
		}
	}

	if (!this.CheckStamina('Monster',GM.GetValue('MonsterStaminaReq',1))) return false;
	if (this.SelectGeneral(GM.GetValue('MonsterMode','Monster')+'General')) return true;
	if (!(playerName = GM.GetValue('PlayerName',''))) return this.NavigateTo('keep');

	// Find the attack button
	if (GM.GetValue('MonsterStaminaReq',1)==1) {
		// not power attack only normal attacks
		if(!(attackButton = this.CheckForImage('attack_monster_button.jpg'))) {
			if(!(attackButton = this.CheckForImage('seamonster_power.gif'))) {
				attackButton = this.CheckForImage('attack_monster_button2.jpg');
				if (attackButton) GM.SetValue('MonsterStaminaReq',5);
			}
		}

	}else{
		// power attack or if not seamonster power attack or if not regular attack - need case for seamonster regular attack?
		if(!(attackButton = this.CheckForImage('attack_monster_button2.jpg'))) {
			if(!(attackButton = this.CheckForImage('seamonster_power.gif'))) {
				attackButton = this.CheckForImage('attack_monster_button.jpg');
				if (attackButton) GM.SetValue('MonsterStaminaReq',1);
			}
		}
	}

	// Check if on engage monster page
	if ((webSlice=this.CheckForImage('dragon_title_owner.jpg')) && attackButton) {

		// Get name and type of monster
		var monsterName = nHtml.GetText(webSlice);
		var monsterName = monsterName.substring(0,monsterName.indexOf('You have (')).trim();
		var monstType = /\w+$/i.exec(monsterName);

		if (!(playerName = GM.GetValue('PlayerName',''))) return this.NavigateTo('keep');
		if (nHtml.FindByAttrContains(webSlice,'a','href','id='+unsafeWindow.Env.user)) {
			monsterName = monsterName.replace(playerName+"'s",'Your');
		}

		if (this.monster.name != monsterName) {
			GM.Log("Monster over achievement level or name not recognized:" + this.monster.name +  ' Actual Name: ' + monsterName + ' Back to select screen.');
			this.NavigateTo('keep,battle_monster');
			return true;
		}

		// Check fortify stuff
		GM.SetValue('ShipHealth','');  //Reset the GMvalue for Ship Health so if not monster that needs fortifying we can detect during questing
		if (monstType == "Serpent" || monstType == "Legion") {
			if ((img=this.CheckForImage('seamonster_ship_health'))) {
				var shipHealth = img.parentNode.style.width;
				shipHealth = shipHealth.substring(0,shipHealth.length-1);
				if (monstType == "Legion") {
					if ((img = this.CheckForImage('repair_bar_grey'))) {
						var extraHealth = img.parentNode.style.width;
						extraHealth = extraHealth.substring(0,extraHealth.length-1);
						shipHealth = Number(shipHealth) * (100/(100 - Number(extraHealth)));
					}
				}
			} else shipHealth = 0;
			GM.Log('Ship health: ' + shipHealth + '%');
			GM.SetValue('ShipHealth',parseInt(shipHealth));

			// Should we fortify the ship?
			var maxToFortify=this.GetNumber('MaxToFortify');
			if (maxToFortify !== "" && this.stats.energy.num>=10 && shipHealth < maxToFortify) {
				GM.Log("Fortifying the ship");
				if (!(fortbutton=this.CheckForImage('seamonster_fortify.gif'))) {
					fortbutton = this.CheckForImage('attack_monster_button3.jpg');
				}
				GM.SetValue('MonsterMode','Fortify');
				if (this.SelectGeneral(GM.GetValue('MonsterMode')+'General')) return true;
				GM.SetValue('ReleaseControl',true);
				Zynga.Click(fortbutton);
				return true;
			}

			// Should we stop attacking lest we sink the ship?
			var minShipHealthToAttack=this.GetNumber('MinShipHealthToAttack','');
			if (minShipHealthToAttack!='' && shipHealth < minShipHealthToAttack) {
				GM.Log("Ship in danger.  Look for other targets.");
				if (GM.GetList('HoleyShip').indexOf(this.monster.name)==-1) {
					GM.ListPush('HoleyShip',this.monster.name);
					this.JustDidIt('HoleyShipTimer');
				}
				GM.Log("Avoiding sinking the ship.  Check back after page reload.  Sinking ships list: " + GM.GetList('HoleyShip') +'  Back to select screen.');
				this.monster.name = ' ';
				return true;
			}
		}

		// Get damage done to monster
		var webSlice=nHtml.FindByAttrContains(document.body,"td","class","dragonContainer");
		if (webSlice) {
			webSlice=nHtml.FindByAttrContains(webSlice,"td","valign","top");
			if (webSlice) {
				webSlice=nHtml.FindByAttrContains(webSlice,"a","href","keep.php?user=" + unsafeWindow.Env.user);
				if (webSlice) {
					if ( monstType=="Serpent") {
						var damList=nHtml.GetText(webSlice.parentNode.parentNode).trim().split("/");
						var damDone = this.NumberOnly(damList[0]) + this.NumberOnly(damList[1]);
					} else {
						var damDone = this.NumberOnly(nHtml.GetText(webSlice.parentNode.parentNode).trim())
					}
					maxDamage = this.parseCondition('max',this.monster.conditions);
					if (maxDamage) {
						if (damDone>maxDamage) {
							maxMonstList= GM.ListPush('MonstersOverMaxDam',this.monster.name);
							GM.Log("Monster over maximum damage threshold of " + maxDamage + ".  New Over Max Damage Monster's list: " + maxMonstList +'  Back to select screen.');
							this.SetDivContent('battle_mess','Monster over maximum damage.  Looking for monsters under maximum.');
							this.monster.name=' '
							return true;
						}
					}
					achLevel = this.parseCondition('ach',this.monster.conditions);
					if (!achLevel) achLevel = this.monstAchTable[monstType];
					var achMonstList = GM.GetList('MonstersOverAchDam');
					if (damDone>achLevel && achMonstList.indexOf(this.monster.name)<0 && GM.GetValue('AchievementMode',false)) {
						achMonstList= GM.ListPush('MonstersOverAchDam',this.monster.name);
						GM.Log("Monster over achievement threshold of " + achLevel + ".  New Over Achievement Monster's list: " + achMonstList +'  Back to select screen.');
						this.SetDivContent('battle_mess','Monster over achievement damage.  Looking for monsters under achievement.');
						this.monster.name=' '
						return true;
					}
					GM.Log("Damage done = " + damDone);
				} else GM.Log("couldn't get Damage done slice");
			} else GM.Log("couldn't get top table");
		} else GM.Log("couldn't get dragoncontainer");

		GM.Log((GM.GetValue('MonsterStaminaReq',1)==5?'Power':'Single')+' Attacking ' + this.monster.name);
		this.SetDivContent('battle_mess',(GM.GetValue('MonsterStaminaReq',1)==5?'Power':'Single')+' Attacking ' + this.monster.name);
		GM.SetValue('MonsterMode','Monster');
		if (this.SelectGeneral(GM.GetValue('MonsterMode')+'General')) return true;
		GM.SetValue('ReleaseControl',true);
		Zynga.Click(attackButton,8000);
		return true;
	}


	if (!this.CheckForImage('tab_monster_on.jpg')) {
		return this.NavigateTo("keep,battle_monster");
	}

///////////////// Check For Monster Page \\\\\\\\\\\\\\\\\\\\\\

	// search for ENGAGE button specifically, not "collect reward" button... user can do that manually
	var ss=document.evaluate(".//img[contains(@src,'dragon_list_btn_3')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	if (ss.snapshotLength==0) {
		GM.Log("No engage button");
		this.NavigateTo('keep');
		this.JustDidIt('NoMonsterToAttack');
		return false;
	}

///////////////// Select Monster Page \\\\\\\\\\\\\\\\\\\\\\

	// If we stopped attacking a damaged ship an hour ago, recheck if ok now.
	if (this.WhileSinceDidIt('HoleyShipTimer',60*60)) {
		GM.SetValue('HoleyShip','');
	}
	if (this.WhileSinceDidIt('ClearDamagedMonsterList',12*60*60)) {
		GM.SetValue('MonstersOverAchDam','');
		GM.SetValue('MonstersOverMaxDam','');
		this.JustDidIt('ClearDamagedMonsterList');
	}

	// Process Attack Order
	engageButton = null;
	var achMonstList = GM.GetList('MonstersOverAchDam');
	var holeyList = GM.GetList('HoleyShip');
	var maxList = GM.GetList('MonstersOverMaxDam');
	var attackOrderString = GM.GetValue('AttackOrder','') + ",your,'";
	GM.Log('Attack Order ' + attackOrderString);
	var attackOrderList=attackOrderString.split(/[\n,]/);
	// The extra apostrophe at the end of attack order makes it match any "soandos's monster" so it always selects a monster if available

	var tfList = [0, 1];
	for (var tf in tfList) {
		if (!GM.GetValue('AchievementMode',false) && tf == 0) continue;
		GM.Log((tf==1)?'Searching for anything available.':'Looking for monsters below achievement');
		this.SetDivContent('battle_mess',(tf==1)?'Searching for anything available.':'Looking for monsters below achievement');
		for(var p in attackOrderList) {
			if (attackOrderList[p].trim())
				attackOrderName = attackOrderList[p].match(/^[^:]+/).toString().trim().toLowerCase();
			else continue;
			for(var s=0; s<ss.snapshotLength; s++) {
				var div=ss.snapshotItem(s).parentNode.parentNode.parentNode.parentNode;
				this.monster.name=nHtml.GetText(div).trim();
				var monstMatch = (this.monster.name.toLowerCase().indexOf(attackOrderName)>=0)
				if ((monstMatch==true) && ((tf==1) || (achMonstList.indexOf(this.monster.name)==-1))) {
					if (holeyList.indexOf(this.monster.name)>=0) {
						GM.Log('Skipping Holey Ship: '+ this.monster.name + ' Holey Ships: ' + holeyList);
						continue;
					}
					if (maxList.indexOf(this.monster.name)>=0) {
						GM.Log('Skipping monster over max damage: '+ this.monster.name + ' Over Max Damage List: ' + maxList);
						continue;
					}
					engageButton = ss.snapshotItem(s).parentNode;
					this.monster.conditions= attackOrderList[p].replace(/^[^:]+/,'').toString().trim().toLowerCase();
					GM.Log("Found monster. Name:" + this.monster.name + " Word: " + attackOrderList[p].replace(/:.+/,'') + ' conditions ' + this.monster.conditions);

					// break out of loops
					break;
				}
			} if (engageButton) break;
		} if (engageButton) break;
	}

	GM.Log("Opening " + this.monster.name);
	if (engageButton) {
		powerAttackForLevelUp = (this.InLevelUpMode() && this.stats.stamina.num>=10);
		currentMonsterSingleAttack = ((this.monster.conditions) && this.monster.conditions.match(/:sa/i));
		currentMonsterPowerAttack = ((this.monster.conditions) && this.monster.conditions.match(/:pa/i));
		if (powerAttackForLevelUp) {
			GM.SetValue('MonsterStaminaReq',5);
		} else if (/Dark Legion/.test(this.monster.name) || /Serpent/.test(this.monster.name)) {
			GM.SetValue('MonsterStaminaReq',5);
		} else if (currentMonsterSingleAttack) {
			GM.SetValue('MonsterStaminaReq',1);
		} else if (currentMonsterPowerAttack) {
			GM.SetValue('MonsterStaminaReq',5);
		} else if (GM.GetValue('PowerAttack',false)) {
			GM.SetValue('MonsterStaminaReq',5);
		} else GM.SetValue('MonsterStaminaReq',1);


		this.SetDivContent('battle_mess','Checking on ' + this.monster.name);
		Zynga.Click(engageButton);
		return true;
	} else {
		this.JustDidIt('NoMonsterToAttack');
		GM.Log("Oops.  Engage button not there for " + this.monster.name);
		return false;
	}
},

/////////////////////////////////////////////////////////////////////

//							COMMON FIGHTING FUNCTIONS

/////////////////////////////////////////////////////////////////////

DemiPoints:function() {
	if (!GM.GetValue('DemiPointsFirst')) return false;

	if (this.CheckForImage('battle_on.gif')) {
		if (smallDeity = this.CheckForImage('symbol_tiny_1.jpg')) {
			demiPointList = nHtml.GetText(smallDeity.parentNode.parentNode.parentNode).match(/\d+ \/ 10/g);
			GM.SetList('DemiPointList',demiPointList);
			GM.Log('DemiPointList: ' + demiPointList);
			if (this.CheckTimer('DemiPointTimer')) {
				GM.Log('Set DemiPointTimer to 24 hours, and check if DemiPoints done');
				this.SetTimer('DemiPointTimer', 24*60*60);
			}
			GM.SetValue('DemiPointsDone',true);
			for (var demiPtItem in demiPointList) {
				if (demiPointList[demiPtItem] != '10 / 10' && GM.GetValue('DemiPoint'+demiPtItem)) {
					GM.SetValue('DemiPointsDone',false);
					break;
				}
			}
			GM.Log('Demi Point Timer '+this.DisplayTimer('DemiPointTimer')+' demipoints done is  '+GM.GetValue('DemiPointsDone',false));
		}
	}
	if (this.CheckTimer('DemiPointTimer')) return this.NavigateTo(this.battlePage,'battle_on.gif');

	if (!GM.GetValue('DemiPointsDone',true)) return this.Battle('DemiPoints');
},

minutesBeforeLevelToUseUpStaEnergy : 5,

InLevelUpMode:function() {
	var now = new Date()
	if ((this.stats.levelTime.getTime() - now.getTime())<this.minutesBeforeLevelToUseUpStaEnergy*60*1000) {
		return true;
	}
	return false;
},
CheckStamina:function(battleOrBattle,attackMinStamina) {
	if (!attackMinStamina) attackMinStamina=1;
	when = GM.GetValue('When' + battleOrBattle,'');
	if (when == 'Never') return false;
	if(!this.stats.stamina || !this.stats.health) {
		this.SetDivContent('battle_mess','Health or stamina not known yet.');
		return false;
	}
	if(this.stats.health.num<10) {
		this.SetDivContent('battle_mess',"Need health to " + battleOrBattle.toLowerCase() + ": " + this.stats.health.num + "/10");
		return false;
	}

	if (when == 'At X Stamina') {
		staminaMF = battleOrBattle+'Stamina';
		if (GM.GetValue('BurnMode_'+staminaMF,false)|| this.stats.stamina.num >= GM.GetValue('X' + staminaMF,1)) {
			if (this.stats.stamina.num < attackMinStamina || this.stats.stamina.num <=GM.GetValue('XMin' + staminaMF,0)){
				GM.SetValue('BurnMode_' +staminaMF,false);
				return false;
			}
			this.SetDivContent('battle_mess','Burning stamina');
			GM.SetValue('BurnMode_' + staminaMF,true);
			return true;
		}else GM.SetValue('BurnMode_' + staminaMF,false);
		if (this.InLevelUpMode() && this.stats.stamina.num>=attackMinStamina) {
			this.SetDivContent('battle_mess','Burning stamina to level up');
			return true;
		}
		this.SetDivContent('battle_mess','Waiting for stamina: '+this.stats.stamina.num+"/"+GM.GetValue('X' + staminaMF,1));
		return false;
	}

	if (when == 'At Max Stamina') {
		if (!GM.GetValue('MaxIdleStamina', 0)) {
			GM.Log("Changing to idle general to get Max Stamina");
			this.PassiveGeneral();
		}
		if (this.stats.stamina.num >= GM.GetValue('MaxIdleStamina')) {
			this.SetDivContent('battle_mess','Using max stamina');
			return true;
		}
		if (this.InLevelUpMode() && this.stats.stamina.num>=attackMinStamina) {
			this.SetDivContent('battle_mess','Burning all stamina to level up');
			return true;
		}
		this.SetDivContent('battle_mess','Waiting for max stamina: '+this.stats.stamina.num+"/"+GM.GetValue('MaxIdleStamina'));
		return false;
	}
	if (this.stats.stamina.num>=attackMinStamina) return true;
	this.SetDivContent('battle_mess','Waiting for more stamina: '+this.stats.stamina.num+"/"+attackMinStamina);
	return false;
},
CheckNotHiding:function(attackType) {
	if ((GM.GetValue('WhenBattle') != "Not Hiding") || (GM.GetValue('WhenMonster') != "Not Hiding")) return true;

	if (GM.GetValue('BattleType') == 'Invade') chainButton = this.CheckForImage('battle_invade_again.gif');
	else chainButton = this.CheckForImage('battle_duel_again.gif');
	if (chainButton) {
		if (attackType == "Monster") return false;
		if (attackType == "Battle")	return true;
	}

	// The lower the risk constant, the more you stay in hiding
	var riskConstant = 1.7
	// Formula to calculate when to use your stamina for hiding
	// If (health - (estimated dmg from next atack) puts us below 10)  AND (current stamina can reach 5 using staminatime/healthtime ratio) then stamina can be used/saved for Monster

	if ((this.stats.health.num - ((this.stats.stamina.num - 1) * riskConstant) < 10) && (this.stats.stamina.num * (5/3) >= 5)) {
		if (attackType == "Monster") return true;
		if ((attackType == "Battle") && (!this.WhileSinceDidIt('NoMonsterToAttack',60*5))) return true;
		return false;
	} else {
		if (attackType == "Battle") return true;
		return false;
	}
},


/////////////////////////////////////////////////////////////////////

//							BANKING

// Keep it safe!

/////////////////////////////////////////////////////////////////////
ImmediateBanking:function() {
	if (!GM.GetValue("BankImmed")) return false;
	return this.Bank();
},

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
	return (nHtml.FindByAttrContains(document.body,"div","class",'result').firstChild.data.indexOf("You have stashed") < 0);
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

	GM.Log('Retrieving '+num +'from bank');
	GM.SetValue('storeRetrieve','');
	this.Click(retrieveButton);
	return true;

},

/////////////////////////////////////////////////////////////////////

//							HEAL

/////////////////////////////////////////////////////////////////////

Heal:function() {
	this.SetDivContent('heal_mess','');
	var whenBattle = GM.GetValue('WhenBattle','');
	var minToHeal=this.GetNumber('MinToHeal');
	if(minToHeal=="") return false;
	var minStamToHeal=this.GetNumber('MinStamToHeal');
	if(minStamToHeal=="") minStamToHeal = 0;

	if(!this.stats.health) return false;

	if (whenBattle != 'Never') {
		if ((this.InLevelUpMode() || this.stats.stamina.num >= this.stats.stamina.max) && this.stats.health.num < 10) {
			GM.Log('Heal');
			return this.NavigateTo('keep,heal_button.gif');
		}
	}
	if(this.stats.health.num>=this.stats.health.max || this.stats.health.num>minToHeal) return false;

	if(this.stats.stamina.num<minStamToHeal) {
		this.SetDivContent('heal_mess','Waiting for stamina to heal: '+this.stats.stamina.num +'/'+minStamToHeal );
		return false;
	}
	GM.Log('Heal');
	return this.NavigateTo('keep,heal_button.gif');
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
				return false;
			}
		}
	}

	var eliteList=GM.GetValue('MyEliteTodo','').trim();
	if (eliteList== '') {
		if (this.CheckForImage('view_army_on.gif')) {
			GM.Log('load auto elite list');
			var armyList=GM.GetValue('EliteArmyList','');
			if(/[^0-9,]/.test(armyList)){
				GM.Log("Elite Army list incorrect, please check your UserID list. You must use ',' between UserID");
				armyList = '';
			}
			if(armyList != '') armyList+= ',';
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
		this.VisitUrl("http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=" + user);
		eliteList = eliteList.substring(eliteList.indexOf(',')+1);
		GM.SetValue('MyEliteTodo',eliteList);
		this.JustDidIt('AutoEliteReqNext');
		if (eliteList == '') {
			this.JustDidIt('AutoEliteGetList');
			GM.Log('Army list exhausted');
		}
	}
	return true;
},

/////////////////////////////////////////////////////////////////////

//							PASSIVE GENERALS

/////////////////////////////////////////////////////////////////////

PassiveGeneral:function() {
	return this.SelectGeneral('IdleGeneral')
},

/////////////////////////////////////////////////////////////////////

//							AUTOINCOME

/////////////////////////////////////////////////////////////////////

AutoIncome:function() {
	if (this.stats.payminute < 1 && this.stats.paytime.match(/\d/)) {
		this.SelectGeneral('IncomeGeneral');
		return true;
	}
	return false;
},

/////////////////////////////////////////////////////////////////////

//								AUTOGIFT

/////////////////////////////////////////////////////////////////////

CheckGiftResults:function(resultsText) {
	// Confirm gifts actually sent
	if (resultsText.match(/^\d+ requests? sent\.$/)) {
		GM.Log('Confirmed gifts sent out.');
		GM.SetValue('RandomGiftPic','');
		GM.SetValue('FBSendList','');
		this.SetCheckResultsFunction('');
	}
},
AutoGift:function() {

	if (!GM.GetValue('AutoGift')) return false;
	if (giftEntry = nHtml.FindByAttrContains(document.body,'div','id','_gift1')) {
		GM.SetList('GiftList',[]);
		var ss=document.evaluate(".//div[contains(@id,'_gift')]",giftEntry.parentNode,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var giftNamePic= {};
		for(var s=0; s<ss.snapshotLength; s++) {
			var giftDiv=ss.snapshotItem(s);
			giftName = nHtml.GetText(giftDiv).trim().replace(/!/i,'');
			if (GM.GetValue("GiftList").indexOf(giftName) >= 0) giftName += ' #2';
			GM.ListPush('GiftList',giftName);
			giftNamePic[giftName]=this.CheckForImage('mystery',giftDiv).src.match(/[\w_\.]+$/i).toString();
//			GM.Log('Gift name: ' + giftName + ' pic ' + giftNamePic[giftName] + ' hidden ' + giftExtraGiftTF[giftName]);
		}
//		GM.Log('Gift list: ' + GM.GetList('GiftList'));
		if (GM.GetValue('GiftChoice') == 'Get Gift List') {
			GM.SetValue('GiftChoice','Same Gift As Received');
			this.SetControls(true);
		}
	}

	// Go to gifts page if asked to read in gift list
	if (GM.GetValue('GiftChoice',false)=='Get Gift List' || !GM.GetList('GiftList')) {
		if (this.NavigateTo('army,gift','giftpage_title.jpg')) return true;
	}

	// Gather the gifts
	if (GM.GetValue('HaveGift',false)) {
		if (this.NavigateTo('army','invite_on.gif')) return true;
		var acceptDiv = nHtml.FindByAttrContains(document.body,'a','href','reqs.php#confirm_');
		var ignoreDiv = nHtml.FindByAttrContains(document.body,'a','href','act=ignore');
		if(ignoreDiv && acceptDiv) {
			if (!(giverId = this.userRe.exec(ignoreDiv.href))) {
				GM.Log('Unable to find giver ID');
				return false;
			}
			var giverName = nHtml.GetText(nHtml.FindByAttrContains(acceptDiv.parentNode.parentNode,'a','href','profile.php')).trim();
			GM.SetValue('GiftEntry',giverId[2]+os+giverName);
			GM.Log('Giver ID = ' + giverId[2] + ' Name  = ' + giverName);
			this.JustDidIt('ClickedFacebookURL');
			this.VisitUrl(acceptDiv.href);
			return true;
		}
		GM.SetValue('HaveGift',false);
		return this.NavigateTo('gift');
	}

	// Facebook pop-up on CA
	if (GM.GetValue('FBSendList','')) {
		if (button = nHtml.FindByAttrContains(document.body,'input','name','sendit') ) {
			GM.Log('Sending gifts to Facebook');
			this.Click(button);
			this.SetCheckResultsFunction('CheckGiftResults');
			return true;
		} else if (button = nHtml.FindByAttrContains(document.body,'input','name','ok')){
			GM.Log('Over max gifts per day');
			this.JustDidIt('WaitForNextGiftSend');
			this.Click(button);
			return true;
		} else GM.Log('No Facebook pop up to send gifts');
		GM.ListAddBefore('ReceivedList',GM.GetList('FBSendList'));
		GM.SetList('FBSendList',[]);
		return false;
	}

	// CA send gift button
	if (GM.GetValue('CASendList','')) {
		if (button = nHtml.FindByAttrContains(nHtml.FindByAttrContains(document.body,'form','id','req_form_'),'input','id','send')) {
			GM.Log('Clicked CA send gift button');
			GM.ListAddBefore('FBSendList',GM.GetList('CASendList'));
			GM.SetList('CASendList',[]);
			Zynga.Click(button);
			return true;
		}
		GM.Log('No CA button to send gifts');
		GM.ListAddBefore('ReceivedList',GM.GetList('CASendList'));
		GM.SetList('CASendList',[]);
		return false;
	}

	if (!this.WhileSinceDidIt('WaitForNextGiftSend',3*60*60)) return false;

	if (this.WhileSinceDidIt('WaitForNotFoundIDs',3*60*60) && GM.GetList('NotFoundIDs')) {
		GM.ListAddBefore('ReceivedList',GM.GetList('NotFoundIDs'));
		GM.SetList('NotFoundIDs',[]);
	}

	giverList = GM.GetList('ReceivedList');
	if (!giverList.length) return false;
	var giftChoice = GM.GetValue('GiftChoice')

	if (this.NavigateTo('army,gift','giftpage_title.jpg')) return true;

	// Get the gift to send out
	if (giftNamePic.length==0) {
		GM.Log('No list of pictures for gift choices');
		return false;
	}
	switch (giftChoice) {
		case 'Random Gift':
                        if ((giftPic = GM.GetValue('RandomGiftPic'))) break;
			var picNum = Math.floor(Math.random()* (GM.GetList('GiftList').length));
			var n = 0;
			for(var p in giftNamePic) {
				if (n++ == picNum) {
					var giftPic = giftNamePic[p];
                                        GM.SetValue('RandomGiftPic',giftPic)
					break;
				}
			}
			if (!giftPic) {
				GM.Log('No gift type match. GiverList: ' + giverList);
				return false;
			}
			break;
		case 'Same Gift As Received':
			if (giverList[0].indexOf('Unknown Gift')>=0) {
                		var givenGiftType = GM.GetList('GiftList').shift();
			} else {
				var givenGiftType = giverList[0].match(/\t[\w ]+$/i).toString().replace(/\t/,'');;
			}
			GM.Log('Looking for same gift as ' + givenGiftType);
			var giftPic = giftNamePic[givenGiftType];
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
		this.NavigateTo('gift_more_gifts.gif');
		return this.NavigateTo(giftPic);
	}
	// Click on names
	giveDiv = nHtml.FindByAttrContains(document.body,'div','class','unselected_list');
	doneDiv = nHtml.FindByAttrContains(document.body,'div','class','selected_list');
	GM.SetList('ReceivedList',[]);
	for(var p in giverList) {
		if (p>10) {
			GM.ListPush('ReceivedList',giverList[p]);
			continue;
		}
		giverData=giverList[p].split(os);
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
	if (window.location.href.indexOf('www.facebook.com/reqs.php') < 0 && window.location.href.indexOf('www.facebook.com/home.php') < 0) {
		return false;
	}
	var giftEntry = GM.GetValue('GiftEntry','');
	if (!giftEntry) {
		return false;
	}

	GM.Log('On FB page with gift ready to go');
	if (window.location.href.indexOf('facebook.com/reqs.php') >= 0) {
		var ss=document.evaluate(".//input[contains(@name,'/castle/tracker.php')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			var giftDiv=ss.snapshotItem(s);
			var user = giftDiv.name.match(/uid%3D\d+/i);
			if (!user) continue;
			user = String(user).substr(6);
			if (user != this.NumberOnly(giftEntry)) continue;
			giftType = giftDiv.value.replace(/^Accept /i,'').trim();
			if (GM.GetList('GiftList').indexOf(giftType) < 0) {
				GM.Log('Unknown gift type.');
				giftType = 'Unknown Gift';
			}
			if (GM.GetValue('ReceivedList',' ').indexOf(giftEntry)<0) GM.ListPush('ReceivedList',giftEntry + os + giftType);
			GM.Log ('This giver: ' + user + ' gave ' + giftType + ' Givers: ' + GM.GetList('ReceivedList'));
			Zynga.Click(giftDiv);
			GM.SetValue('GiftEntry','');
			return true;
		}
	}
	if (!this.WhileSinceDidIt('ClickedFacebookURL',10)) return false;
	GM.Log('Error: unable to find gift');
	if (GM.GetValue('ReceivedList',' ').indexOf(giftEntry)<0) GM.ListPush('ReceivedList',giftEntry + '\tUnknown Gift');
	Zynga.VisitUrl("http://apps.facebook.com/castle_age/army.php?act=acpt&uid=" + this.NumberOnly(giftEntry));
	GM.SetValue('GiftEntry','');
	return true;
},
////////////////////////////////////////////////////////////////////

//						Auto Stat

////////////////////////////////////////////////////////////////////

IncreaseStat:function(attribute,attrAdjust){

	switch (attribute) {
		case "energy"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','energy_max'); break;
		case "stamina"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','stamina_max'); break;
		case "attack"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','attack'); break;
		case "defense"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','defense'); break;
		case "health"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','health_max'); break;
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
	var attack = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','attack').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var defense = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','defense').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var health = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','health_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var level = this.stats.level;
//	GM.Log("Energy ="+energy+" Stamina ="+stamina+" Attack ="+attack+" Defense ="+defense+" Heath ="+health);

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
					GM.SetValue("SkillPointsNeed",2);
					return "Fail";
				} else GM.SetValue("SkillPointsNeed",1);
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

Idle:function() { 
	try{
		//if we need to add some army member
		if(GM.GetValue('FillArmy',false)){
			if (!this.CheckForImage('invite_on.gif')) {
				Zynga.SetDivContent('army_mess','Filling Army');
				this.NavigateTo('army');
			} else { //get not army members
				var IdsListNotArmyAll="//div[@class='unselected_list']//label[@class='clearfix']",
				results=document.evaluate(IdsListNotArmyAll, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
				i=0,res;
				IdsListNotArmyAll=[];
				while((res=results.snapshotItem(i))!=null){
					IdsListNotArmyAll[IdsListNotArmyAll.length]=res.firstChild.value;
					i++;
				}
				var Ids =[];
				var counter = 0;
				if(!GM.GetValue('waiting',false)){ //get CA friends
					GM.Log("Getting CA friend's list");
					GM.SetValue('waiting',true);
					window.setTimeout(function() {GM.SetValue('waiting',false);},10000);
					GM_xmlhttpRequest({
						url: 'http://apps.facebook.com/castle_age/gift.php?app_friends=false&giftSelection=1',
						method: 'GET',
						onload: function(response){
							if(response.status == 200){ //if response == ok
								GM.DeleteValue('waiting');
								GM.Log(response.statusText);
								IdsList = response.responseText.match(/(exclude_ids=")[0-9,]*"/).toString().replace(/[^0-9,]/g,'').split(',');
								for(var x in IdsListNotArmyAll){ //search for CA friends not in army
									for(var y in IdsList){
										if(IdsList[y] == IdsListNotArmyAll[x]){
											Ids[counter++] = IdsListNotArmyAll[x];
											break;
										}
									}
								}

								// Add army members //
								var count = 0;
								var ID = GM.GetValue("ArmyCount",0);
								if(ID == 0) GM.Log("Adding "+Ids.length+" member");
								Zynga.SetDivContent('army_mess','Filling Army, Please wait...'+ID+"/"+Ids.length);
								for (ID; ID < Ids.length ; ID++) {
									if(count >= 5){ //don't spam requests
										this.waitMilliSecs=1000;
										break;	
									}else{
										count++;
										GM_xmlhttpRequest({
											url: 'http://apps.facebook.com/castle_age//index.php?tp=cht&lka='+ Ids[ID] +'&buf=1',
											method: "GET",
											onload: function(response) {
												count--;
												if(response.status != 200){
													GM_log([
													  response.status,
													  response.finalUrl,
													].join("\n"));
												}
											}
										});
										GM.SetValue("ArmyCount",ID);
									}
								}
								if(ID >= Ids.length){
								Zynga.SetDivContent('army_mess','<b>Fill Army Completed</b>');
								window.setTimeout(function() {Zynga.SetDivContent('army_mess','');},5000);
								GM.Log("Fill Army Completed");
								GM.SetValue('FillArmy',false);
								GM.DeleteValue("ArmyCount");
								}
							}else{//if response != ok
								Zynga.SetDivContent('army_mess','<b>Fill Army Failed</b>');
								window.setTimeout(function() {Zynga.SetDivContent('army_mess','');},5000);
								GM.Log("Fill Army Not Completed, cant get CA friends list");
								GM.Log("Response.status: "+response.statusText);
								GM.SetValue('FillArmy',false);
								GM.DeleteValue("ArmyCount");
								GM.DeleteValue('waiting');
							}
						}
					});
				}
				
			}
			return true;
		}
	}catch (e){
		GM.Log("ERROR: " + e);
	}
	GM.SetValue('ReleaseControl',true);
	return true;
},

currentPage:"",
currentTab:"",
waitMilliSecs:5000,

/////////////////////////////////////////////////////////////////////

//							MAIN LOOP

// This function repeats continously.  In principle, functions should only make one
// click before returning back here.

/////////////////////////////////////////////////////////////////////

actionDescTable:{'AutoIncome':'Awaiting Income','AutoStat':'Upgrade Skill Points','MaxEnergyQuest':'At Max Energy Quest','PassiveGeneral':'Setting Idle General','ImmediateBanking':'Immediate Banking','Battle':'Battling Players','Monster':'Attacking Monsters'},

CheckLastAction:function(thisAction) {
	lastAction = GM.GetValue('LastAction','none');
	if (this.actionDescTable[thisAction])
		this.SetDivContent('activity_mess','Current Action: ' + this.actionDescTable[thisAction]);
	else
		this.SetDivContent('activity_mess','Current Action: ' + thisAction);
	if (lastAction!=thisAction) {
		GM.Log('Changed from doing ' + lastAction + ' to ' + thisAction);
		GM.SetValue('LastAction',thisAction);
	}
},

MainLoop:function() {
	this.waitMilliSecs=1000;
	// assorted errors...
	var href=location.href;
	if(href.indexOf('/common/error.html')>=0) {
		GM.Log('detected error page, waiting to go back to previous page.');
		window.setTimeout(function() {
			window.history.go(-1);
		}, 30*1000);
		return;
	}
	if(document.getElementById('try_again_button')) {
		GM.Log('detected Try Again message, waiting to reload');
		// error
		window.setTimeout(function() {
			window.history.go(0);
		}, 30*1000);
		return;
	}

	if (window.location.href.indexOf('www.facebook.com/reqs.php') >= 0 || window.location.href.indexOf('www.facebook.com/home.php') >= 0) {
		this.AcceptGiftOnFB();
	 	this.WaitMainLoop();
		return;
	}

	//We don't need to send out any notifications
	if (button = nHtml.FindByAttrContains(document.body,"a","class",'undo_link')){
		this.Click(button);
		GM.Log('Undoing notification');
	}

	this.SetupDivs();
//	this.AddBattleLinks();
	if(GM.GetValue('Disabled',false)) {
		this.SetControls();
		this.WaitMainLoop();
		return;
	}

	if (!this.GetStats()) {
		noWindowLoad = GM.GetValue('NoWindowLoad',0)
		if (noWindowLoad == 0) {
			this.JustDidIt('NoWindowLoadTimer');
			GM.SetValue('NoWindowLoad',1);
		} else if (this.WhileSinceDidIt('NoWindowLoadTimer',Math.min(Math.pow(2,noWindowLoad-1)*15,60*60))) {
			this.JustDidIt('NoWindowLoadTimer');
			GM.SetValue('NoWindowLoad',noWindowLoad+1);
			this.ReloadCastleAge();
		}
		GM.Log('Page no-load count: ' + noWindowLoad);
		this.WaitMainLoop();
		return;
	} else GM.SetValue('NoWindowLoad',0);

	this.DrawQuests(false);
    this.UpdateGeneralList();
	this.CheckResults();
    this.SetControls();
	this.DrawProperties();

	if(GM.GetValue('ZyngaPause','none') != 'none') {
	/*
		var text = "";
		for each(var val in GM_listValues()){
			text += val +'|'+GM_getValue(val)+';';
		}
		text = text.replace(/\n/gi,',');
		//GM_log(GM_listValues());
		//var vals = GM_listValues().map(GM_getValue);
		GM.Log("text = "+text);
		//GM.Log("Vals = "+vals);
		*/
		document.getElementById("AutoZynga_div").style.background = GM.GetValue('StyleBackgroundDark','#EFEFEF');;
		this.WaitMainLoop();
		return;
	}
	if (this.AutoIncome()) {
		this.CheckLastAction('AutoIncome');
		this.WaitMainLoop();
		return;
	}	
	var actionsList = ['AutoElite','Heal','ImmediateBanking','MaxEnergyQuest','DemiPoints','Monsters','Battle','Quests','Properties','Bank','PassiveGeneral','AutoBless','AutoStat','AutoGift','Idle'];

	if (!GM.GetValue('ReleaseControl',false)) actionsList.unshift(GM.GetValue('LastAction','Idle'));
	else GM.SetValue('ReleaseControl',false);
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
	nHtml.setTimeout(function() { this.waitForPageChange=false; Zynga.MainLoop(); },Zynga.waitMilliSecs * (1 + Math.random() * 0.2));
},

ReloadCastleAge:function() {
	// better than reload... no prompt on forms!
	if (window.location.href.indexOf('castle_age') >= 0 && !GM.GetValue('Disabled') && (GM.GetValue('ZyngaPause') == 'none')) {
		GM.SetValue('ReleaseControl',true);
		GM.SetValue('ZyngaPause','none');
		window.location = "http://apps.facebook.com/castle_age/index.php?bm=1";
	}
},
ReloadOccasionally:function() {
	nHtml.setTimeout(function() {
		Zynga.ReloadCastleAge();
		Zynga.ReloadOccasionally();
	}, 1000*60*10 + (10 * 60 * 1000 * Math.random()));
}
};

GM.SetValue('ZyngaPause','none');
//GM.SetValue('test','testt|yes!');
GM.Log('Page reloaded');
//GM.Log('Object value' + GM.GetObjValue('test','testt|'));

if (GM.GetValue('LastVersion',0) != thisVersion) {
	// Put code to be run once to upgrade an old version's variables to new format or such here.
	if (parseInt(GM.GetValue('LastVersion',0))<121) GM.SetValue('WhenBattle',GM.GetValue('WhenFight','Stamina Available'));
	if (parseInt(GM.GetValue('LastVersion',0))<127) {
		for each(var n in GM_listValues()){
			if (GM_getValue(n)) GM_setValue(n,GM_getValue(n).toString().replace(/~/g,ls).replace(/`/g,os));
		}
	}

	GM.SetValue('LastVersion',thisVersion.toString());
};

window.setTimeout(function() {Zynga.MainLoop();GM.Log('Window timeout startup');},1000);

Zynga.ReloadOccasionally();

// ENDOFSCRIPT