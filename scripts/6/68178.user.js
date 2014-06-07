// ==UserScript==
// @name           Castle Age Autoplayer
// @namespace      caap
// @description    Auto player for Castle Age
// @version        136.5
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http*://apps.*facebook.com/castle_age/*
// @include        http://www.facebook.com/common/error.html
// @include        http://www.facebook.com/reqs.php#confirm_46755028429_0
// @include        http://www.facebook.com/home.php
// @include        http://www.facebook.com/home.php*filter=app_46755028429*
// ==/UserScript==

var thisVersion = "136.5";
/*
# Temporary v136 Patches:
# .1 - V136 Patch: Remove Unnecessary Timed Navigation To Land Page
# .2 - V136 Patch: Remove Log Spamming For Monsters and Raids
# .3 - V136 Patch: Not Hiding Mode Does Not Fight Monsters When No Raids To Attack
# .4 - V136 Patch: Remove Log Spamming For Monsters and Raids (Revised "Added to Patch: 2/23 14:55 ET")
# .5 - v136 Patch: Experience To Next Level not updating/disappearing
*/

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
var documentTitle=document.title;

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
		default :
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
		gm.log("Deleting iframe = "+key);
		iframe.parentNode.removeChild(iframe);
	}else gm.log("Frame not found = "+key);
	if(document.getElementById(key))gm.log("Found iframe");
}
};

/////////////////////////////////////////////////////////////////////

//							gm OBJECT

// this object is used for setting/getting GM specific functions.
/////////////////////////////////////////////////////////////////////
var os='\n'; // Object separator - used to separate objects
var vs='\t'; // Value separator - used to separate name/values within the objects
var ls='\f'; // Label separator - used to separate the name from the value
gm={

// use to log stuff
log:function(mess) {
	GM_log('v'+thisVersion + ': ' +mess);
},
debug:function(mess) {
	if(debug) { gm.log(mess); }
},
// use these to set/get values in a way that prepends the game's name
setValue:function(n,v) {
	gm.debug('Set ' + n + ' to ' + v);
	GM_setValue(caap.gameName+"__"+n,v);
	return v;
},
getValue:function(n,v) {
	gm.debug('Get ' +n + ' value ' + GM_getValue(caap.gameName+"__"+n,v));
	return GM_getValue(caap.gameName+"__"+n,v);
},
deleteValue:function(n) {
	gm.debug('Delete ' +n + ' value ');
	return GM_deleteValue(caap.gameName+"__"+n);
},
IsArray:function(testObject) {
    return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
},
setList:function(n,v) {
	if (!gm.IsArray(v)) {
		gm.log('Attempted to SetList ' + n + ' to ' + v.toString() + ' which is not an array.');
		return;
	}
	return GM_setValue(caap.gameName+"__"+n,v.join(os));
},
getList:function(n) {
	getList = GM_getValue(caap.gameName+"__"+n,'')
	gm.debug('GetList ' +n + ' value ' + GM_getValue(caap.gameName+"__"+n));
	return (getList) ? getList.split(os) : [];
},
listAddBefore:function(listName,addList) {
	newList = addList.concat(gm.getList(listName));
	gm.setList(listName,newList);
	return newList;
},
listPop:function(listName) {
	popList = gm.getList(listName)
	if (!popList.length) return '';
	popItem = popList.pop();
	gm.setList(listName,popList);
	return popItem;
},
listPush:function(listName, pushItem, max) {
  var list = gm.getList(listName);

  // Only add if it isn't already there.
  if (list.indexOf(pushItem) != -1) {
    return;
  }
  list.push(pushItem);
  if (max > 0) {
    while (max < list.length) {
      //var pushItem = list.shift();
      pushItem = list.shift();
      gm.debug('Removing ' + pushItem + ' from ' + listName + '.');
    }
  }
  gm.setList(listName, list);
},
listFindItemByPrefix:function(list,prefix) {
	var itemList = list.filter(function(item){
		return item.indexOf(prefix)==0;
	});
//gm.log('List: ' + list + ' prefix ' + prefix + ' filtered ' + itemList);
	if (itemList.length) return itemList[0];
},
setObjVal:function(objName,label,value) {
	if (!(objStr = gm.getValue(objName))) {
		gm.setValue(objName,label+ls+value);
		return;
	}
	if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) {
		gm.setValue(objName,label + ls + value + vs + objStr);
		return;
	}
	objList = objStr.split(vs);
	objList.splice(objList.indexOf(itemStr),1,label+ls+value)
	gm.setValue(objName,objList.join(vs));
},
getObjVal:function(objName,label,defaultValue) {
	objStr = gm.getValue(objName);
	if (!objStr) return defaultValue;
	if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) return defaultValue;
	return itemStr.split(ls)[1];
},
getListObjVal:function(listName,objName,label,defaultValue) {
	gLOVlist = gm.getList(listName);
	if (!(gLOVlist.length)) return defaultValue;
//gm.log('have list '+gLOVlist);
	if (!(objStr = gm.listFindItemByPrefix(gLOVlist,objName+vs))) return defaultValue;
//gm.log('have obj ' + objStr);
	if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) return defaultValue;
//gm.log('have val '+itemStr);
	return itemStr.split(ls)[1];
},
setListObjVal:function(listName,objName,label,value) {
	objList = gm.getList(listName);
	if (!(objList.length)) {
		gm.setValue(listName,objName+vs+label+ls+value);
		return;
	}
	if (!(objStr = gm.listFindItemByPrefix(objList,objName+vs))) {
		gm.listPush(listName,objName+vs+label+ls+value);
		return;
	}
	valList = objStr.split(vs);
	if (!(valStr = gm.listFindItemByPrefix(valList,label+ls))) {
		valList.push(label+ls+value);
		objList.splice(objList.indexOf(objStr),1,objStr+vs+label+ls+value)
		gm.setList(listName,objList);
		return;
	}
	valList.splice(valList.indexOf(valStr),1,label+ls+value)
	objList.splice(objList.indexOf(objStr),1,valList.join(vs))
	gm.setList(listName,objList);
},
deleteListObj:function(listName,objName) {
	objList = gm.getList(listName);
	if (!(objList.length)) return false;
	if ((objStr = gm.listFindItemByPrefix(objList,objName))) {
		objList.splice(objList.indexOf(objStr),1);
		gm.setList(listName,objList);
	}
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
	var target = document.getElementById("caap_div");// != null ? e.target : e.srcElement;
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

//							caap OBJECT

// this is the main object for the game, containing all methods, globals, etc.

/////////////////////////////////////////////////////////////////////

caap={
stats:{},
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
		gm.log('ERROR: Null object passed to Click');
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
		gm.log("Couldn't find current general div");
		return false;
	}
	return webSlice.innerHTML.trim();
},
UpdateGeneralList:function() {
	if (!this.CheckForImage('tab_generals_on.gif')) return false;
	var gens = nHtml.getX('//div[@class=\'generalSmallContainer2\']', document, xpath.unordered);
	gm.setValue('AllGenerals','');
	gm.setValue('GeneralImages','');
	gm.setValue('LevelUpGenerals','');
	for (var x = 0; x < gens.snapshotLength; x++)	{
		var gen = nHtml.getX('./div[@class=\'general_name_div3\']/text()', gens.snapshotItem(x), xpath.string).replace(/[\t\r\n]/g,'');
		var img = nHtml.getX('.//input[@class=\'imgButton\']/@src', gens.snapshotItem(x), xpath.string);
		img = nHtml.getHTMLPredicate(img);
//		var atk = nHtml.getX('./div[@class=\'generals_indv_stats\']/div[1]/text()', gens.snapshotItem(x), xpath.string);
//		var def = nHtml.getX('./div[@class=\'generals_indv_stats\']/div[2]/text()', gens.snapshotItem(x), xpath.string);
//		var skills = nHtml.getX('.//table//td[1]/div/text()', gens.snapshotItem(x), xpath.string).replace(/[\t\r\n]/gm,'');
		var level = nHtml.getX('./div[4]/div[2]/text()', gens.snapshotItem(x), xpath.string).replace(/Level /gi,'').replace(/[\t\r\n]/g,'');
//		var genatts = gen + ":" + atk + "/" + def + ":L" + level + ":" + img + ","
		gm.listPush('AllGenerals',gen);
		gm.listPush('GeneralImages',gen + ':' + img);
		if (level < 4){gm.listPush('LevelUpGenerals',gen);}
	}
	gm.setList('AllGenerals',gm.getList('AllGenerals').sort());
//	gm.log("All Generals: " + gm.getList('AllGenerals'));
},
ClearGeneral:function(whichGeneral) {
	gm.log('Setting ' + whichGeneral + ' to "Use Current"');
	gm.setValue(whichGeneral,'Use Current');
	this.SetControls(true);
},
SelectGeneral:function(whichGeneral) {
	if (!(general = gm.getValue(whichGeneral,''))) return false;
	if (!general || /use current/i.test(general)) return false;
	if (/under level 4/i.test(general)) {
		if (!gm.getList('LevelUpGenerals').length) return this.ClearGeneral(whichGeneral);
		if (gm.getValue('ReverseLevelUpGenerals')) {
			general = gm.getList('LevelUpGenerals').reverse().pop();
		}
		else {
			general = gm.getList('LevelUpGenerals').pop();
		}
	}
	currentGeneral = this.GetCurrentGeneral().replace('**','');
	if(general.indexOf(currentGeneral) >= 0) return false;

	gm.log('Changing from ' + currentGeneral + ' to ' + general);
	if (this.NavigateTo('mercenary,generals','tab_generals_on.gif')) return true;;
	if (/get general list/i.test(general)) return this.ClearGeneral(whichGeneral);
	var hasGeneral = function(genImg) {return (genImg.indexOf(general.replace(/:.+/,''))>=0); }
	generalImage = gm.getList('GeneralImages').filter(hasGeneral).toString().replace(/.+:/,'');
	if (this.CheckForImage(generalImage)) {
		return this.NavigateTo(generalImage);
	}
	this.SetDivContent('Could not find ' + general);
	gm.log('Could not find ' + generalImage);
	return this.ClearGeneral(whichGeneral);
},

NavigateTo:function(pathToPage,imageOnPage) {
	var content=document.getElementById('content');
	if(!content) {
		gm.log('No content to Navigate to ' + imageOnPage + ' using ' + pathToPage);
		return false;
	}
	if (imageOnPage && this.CheckForImage(imageOnPage)) return false;

	var pathList = pathToPage.split(",");
	for(var s=pathList.length-1; s>=0; s--) {
		var a=nHtml.FindByAttrXPath(content,'a',"contains(@href,'/" + pathList[s] + ".php') and not(contains(@href,'" + pathList[s] + ".php?'))");
		if (a) {
			gm.log('Go to ' + pathList[s]);
			caap.Click(a);
			return true;
		}
		var imageTest = pathList[s]
		if (imageTest.indexOf(".") == -1) imageTest = imageTest + '.'
		var input = nHtml.FindByAttrContains(document.body,"input","src",imageTest);
		if (input) {
			gm.log('Click on image ' + input.src.match(/[\w.]+$/));
			caap.Click(input);
			return true;
		}
		var input = nHtml.FindByAttrContains(document.body,"img","src",imageTest);
		if (input) {
			gm.log('Click on image ' + input.src.match(/[\w.]+$/));
			caap.Click(input);
			return true;
		}
	}
	gm.log('Unable to Navigate to ' + imageOnPage + ' using ' + pathToPage);
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
	return (!gm.getValue(name) || (parseInt(gm.getValue(name)) < (now-1000*seconds)));
},
JustDidIt:function(name) {
	var now = (new Date().getTime());
	gm.setValue(name, now.toString());
},
// Returns true if timer is passed, or undefined
CheckTimer:function(name) {
	nameTimer = gm.getValue(name)
	if (!nameTimer) return true;
	var now = new Date().getTime();
	return (nameTimer < now);
},
FormatTime:function(time) {
	return time.toDateString().match(/^\w+ /) + time.toLocaleTimeString().replace(/:\d+ /i,' ').replace(/:\d+$/i,'')
},
DisplayTimer:function(name) {
	nameTimer = gm.getValue(name);
	if (!nameTimer) return false;
	var newTime = new Date();
	newTime.setTime(parseInt(nameTimer));
	return this.FormatTime(newTime);
},
SetTimer:function(name, time) {
	var now = (new Date().getTime());
	now += time*1000
	gm.setValue(name, now.toString());
},
CheckLastAction:function(thisAction) {
	this.SetDivContent('activity_mess','Current activity: ' + thisAction);
	lastAction = gm.getValue('LastAction','none')
	gm.setValue('LastAction',thisAction);
	if (lastAction!=thisAction) {
		gm.log('Changed from doing ' + lastAction + ' to ' + thisAction);
	}
},
NumberOnly:function(num) {
	var numOnly=parseFloat(num.toString().replace(/[^0-9\.]/g,""));
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

	if(document.getElementById('caap_div')) {
		return false;
	}
	var div=document.createElement('div');
	var b=nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_Container clearfix');
	div.id='caap_div';
	div.style.top='100px';
	div.style.left='940px';
	div.style.width='180px';

	div.style.padding='4px';
	div.style.border='2px solid #444';
	div.style.background = gm.getValue('StyleBackgroundLight','#E0C691');
	div.style.opacity = gm.getValue('StyleOpacityLight','1');
	div.style.color='#000';
	div.style.cssFloat='right';
	nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_SidebarAds').style.display='none';

	var divList = ['activity_mess','army_mess','quest_mess','battle_mess','heal_mess','demipoint_mess','demibless_mess','level_mess','control'];
	for (var divID in divList) {
		var addDiv=document.createElement('div');
		addDiv.id='caap_' + divList[divID];
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
			gm.log('cannot find app div');
		}
	}

	return true;
},

AppendTextToDiv:function(divName,text) {
	var d=document.getElementById('caap_' + divName);
	if(d) {
		d.innerHTML  += text;
		return true;
	} else return false;
},

MakeDropDown:function(idName, dropDownList,instructions,formatParms) {
	var selectedItem = gm.getValue(idName,'defaultValue');
	if (selectedItem=='defaultValue')
		selectedItem = gm.setValue(idName,dropDownList[0]);
	var htmlCode = " <select id='caap_" + idName + "' " + formatParms + "'><option>" + selectedItem;
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
	var checkItem = gm.getValue(idName,'defaultValue');
	if (checkItem=='defaultValue') gm.setValue(idName,defaultValue);
	var htmlCode = "<input type='checkbox' id='caap_" + idName + "' title=" + '"' + instructions +'"' + ((varClass)?" class='" + varClass + "'":'') + (gm.getValue(idName)?'checked':'')+' />';
	if (varClass) {
		if (tableTF) htmlCode += "</td></tr></table>";
		else htmlCode += '<br />';
		htmlCode += this.AddCollapsingDiv(idName,varClass);
	}
	return htmlCode;
},

MakeNumberForm:function(idName,instructions,initDefault,formatParms) {
	if (gm.getValue(idName,'defaultValue')=='defaultValue') gm.setValue(idName,initDefault);
	if (!initDefault) initDefault = '';
	if (!formatParms) formatParms = "size='4'";
	var htmlCode = " <input type='text' id='caap_" + idName + "' " + formatParms + " title=" + '"' + instructions +'"' + " />";
	return htmlCode;
},

AddCollapsingDiv:function(parentId,subId) {
	var htmlCode = "<div id='caap_" + subId + "' style='display: " + (gm.getValue(parentId,false)?'block':'none') +"'>";
	return htmlCode;
},

ToggleControl:function(controlId,staticText) {
	var currentDisplay = gm.getValue('Control_'+controlId,"none")
	if (currentDisplay == "none") var displayChar = "+";
	else var displayChar = "-";
	var toggleCode = '<b><a id="caap_Switch_' + controlId + '" href="javascript:;" style="text-decoration: none;"> ' + displayChar + ' ' + staticText + '</a></b> <br />';
	toggleCode += "<div id='caap_" + controlId + "' style='display: " + currentDisplay + "'>";
	return toggleCode;
},

GetNumber:function(name,defaultValue) {
	if(!gm.getValue(name)) return defaultValue || '';
	return Number(gm.getValue(name));
},

MakeTextBox:function(idName,instructions,formatParms) {
	var checkItem = gm.getValue(idName,'');
	// if (idName == 'BattleTargets' && checkItem == '') {
		// gm.log('Freshmeat set.' + idName + ' checkItem ' + checkItem);
		// gm.setValue(idName,'freshmeat');
	// }
	var htmlCode = "<textarea title=" + '"' + instructions +'"' + " type='text' id='caap_" + idName + "' " + formatParms + ">"+gm.getValue(idName,'')+"</textarea><br />";
	return htmlCode;
},

SaveBoxText:function(idName) {
	var boxText=document.getElementById('caap_' + idName);
	gm.setValue(idName,boxText.value);
},

SetDivContent:function(idName,mess) {
	this.SetupDivs();
	var d=document.getElementById('caap_' + idName);
	if(d) { d.innerHTML=mess; }
},

SetQuestControl:function() {
	this.SetupDivs();
	var htmlCode = '';
	this.SetDivContent('quest_control',htmlCode);
},

SetControls:function(force) {

	var controlDiv=document.getElementById('caap_control');
	if(controlDiv && controlDiv.innerHTML.length>0 && !force) {
		// we already have the controls
		return;
	}

	var htmlCode = '';
	htmlCode += "<div id='caapPaused' style='display: " + gm.getValue('caapPause','block') +"'><b>Paused on mouse click.</b><br /><a href='javascript:;' id='caapRestart' >Click here to restart </a></div>";
	htmlCode += '<hr />Disable auto run for this game. ' + this.MakeCheckBox('Disabled',false);
	var bankInstructions0="Minimum cash to keep in the bank. Press tab to save";
	var bankInstructions1="Minimum cash to have on hand, press tab to save";
	var bankInstructions2="Maximum cash to have on hand, bank anything above this, press tab to save(leave blank to disable)";
	var healthInstructions="Minimum health to have before healing, press tab to save(leave blank to disable): ";
	var healthStamInstructions="Minimum Stamina to have before healing, press tab to save(leave blank to disable): ";
	var bankImmedInstructions="Bank as soon as possible. May interrupt player and monster battles."
	var autobuyInstructions="Automatically buy properties in groups of 10 based on best Return On Investment value. "
	htmlCode += '<hr />' + this.ToggleControl('CashandHealth','CASH and HEALTH');
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Bank Immediately</td><td> ' + this.MakeCheckBox('BankImmed',false,'',bankImmedInstructions) +  '</td></tr>';
		htmlCode += '<tr><td>Auto Buy Properties</td><td> ' + this.MakeCheckBox('autoBuyProperty',false,'',autobuyInstructions) + '</td></tr></table>';
		htmlCode += "Always Keep&nbsp$" + this.MakeNumberForm('minInStore',bankInstructions0,100000,"type='text'  size='12' style='font-size: 10px'") + " In Bank<br />";
		htmlCode += "Bank Above&nbsp;&nbsp$" + this.MakeNumberForm('MaxInCash',bankInstructions2,'',"type='text'  size='7' style='font-size: 10px'") + "<br />";
		htmlCode += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;But Keep&nbsp;$" + this.MakeNumberForm('MinInCash',bankInstructions1,'',"type='text' size='7' style='font-size: 10px'") + " On Hand <br /><br />";
		htmlCode += "Heal If Below&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('MinToHeal',healthInstructions,10,"size='1'  style='font-size: 10px'") + " Health<br />";
		htmlCode += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;But Not If Below" + this.MakeNumberForm('MinStamToHeal',healthStamInstructions,'',"size='1'  style='font-size: 10px'") + ' Stamina<br />';
	htmlCode += "<hr/> </div>";

	var forceSubGen = "Always do a quest with Sub General";
	htmlCode += this.ToggleControl('Quests','QUEST');
		var questList = ['Energy Available','At Max Energy','Not Fortifying','Never'];
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
		htmlCode += '<tr><td width=80>Quest When:</td><td>' + this.MakeDropDown('WhenQuest',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
		htmlCode += "<div id='caap_WhenQuestHide' style='display: " + (gm.getValue('WhenQuest',false)!='Never'?'block':'none') +"'>";
			questList = ['Quest','Demi Quests','Atlantis'];
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
			htmlCode += '<tr><td>Pick Quest Area:</td><td>' + this.MakeDropDown('QuestArea',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
			switch (gm.getValue('QuestArea', questList[0])){
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
		if ((autoQuestName = gm.getObjVal('AutoQuest','name'))) {
			htmlCode += "<a id='stopAutoQuest' href='javascript:;'>Stop auto quest: "+ autoQuestName +" (energy: "+gm.getObjVal('AutoQuest','energy')+")"+"</a><br />";
		}
	htmlCode += "<hr/> </div>";


	var XBattleInstructions="Start battling if stamina is above this points";
	var XMinBattleInstructions="Don't battle if stamina is below this points";
	var userIdInstructions="User IDs(not user name).  Click with the right mouse button on the link to the users profile & copy link.  Then paste it here and remove everything but the last numbers. (ie. 123456789)";
	var chainBPInstructions="Number of battle points won to initiate a chain attack. Specify 0 to always chain attack.";
	var chainGoldInstructions="Amount of gold won to initiate a chain attack. Specify 0 to always chain attack.";
	var FMRankInstructions="The lowest relative rank below yours that you are willing to spend your stamina on. Leave blank to attack any rank."
	var FMARBaseInstructions="This value sets the base for your army ratio calculation. It is basically a multiplier for the army size of a player at your equal level. A value of 1 means you will battle an opponent the same level as you with an army the same size as you or less. Default .5"
	var dontbattleInstructions="Remember an opponents id after a loss and don't battle him again"
	var plusonekillsInstructions="Force +1 kill scenario if 80% or more of targets are withn freshmeat settings. Note: Since Castle Age choses the target, selecting this option could result in a greater chance of loss."
	var raidOrderInstructions="List of search words that decide which raids to participate in first.  Use words in player name or in raid name. To specify max damage follow keyword with :max token and specifiy max damage values. Use 'k' and 'm' suffixes for thousand and million.";
	htmlCode += this.ToggleControl('Battling','BATTLE');
		var battleList = ['Stamina Available','At Max Stamina','At X Stamina','No Monster','Not Hiding','Never'];
		var battleInst = ['Stamina Available will battle whenever you have enough stamina','At Max Stamina will battle when stamina is at max and will burn down all stamina when able to level up','At X Stamina you can set maximum and minimum stamina to battle','No Monster will battle only when there are no active monster battles','Not Hiding uses stamina to try to keep you under 10 health so you cannot be attacked, but making sure no stamina is wasted','Never - disables player battles'];
		var typeList = ['Invade','Duel']
		var typeInst = ['Battle using Invade button','Battle using Duel button - no guarentee you will win though']
		var targetList = ['Freshmeat','Userid List','Raid']
		var targetInst = ['Use settings to select a target from the Battle Page','Select target from the supplied list of userids','Raid Battles']
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
		htmlCode += '<tr><td>Battle When:&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('WhenBattle',battleList,battleInst,"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
		htmlCode += "<div id='caap_WhenBattleXStamina' style='display: " + (gm.getValue('WhenBattle',false)!='At X Stamina'?'none':'block') +"'>";
				htmlCode += '<tr><td>Start Battles with</td><td>' + this.MakeNumberForm('XBattleStamina',XBattleInstructions,1,"size='1'  style='font-size: 10px'") +  ' Stamina</td></tr><br/>';
				htmlCode += '<tr><td>Keep</td><td>' + this.MakeNumberForm('XMinBattleStamina',XMinBattleInstructions,0,"size='1'  style='font-size: 10px'") +  ' Stamina Points</td></tr>';
		htmlCode += "</div>";
		htmlCode += "<div id='caap_WhenBattleHide' style='display: " + (gm.getValue('WhenBattle',false)!='Never'?'block':'none') +"'>"
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Battle Type:</td><td>' + this.MakeDropDown('BattleType',typeList,typeInst,"style='font-size: 10px min-width: 60px; max-width: 60px; width : 60px;'") + '</td></tr>';
			htmlCode += '<tr><td>Chain:Battle Points Won</td><td>' + this.MakeNumberForm('ChainBP',chainBPInstructions,'',"size='8' style='font-size: 10px; text-align: right' ") + '</td></tr>';
			htmlCode += '<tr><td>Chain:Gold Won</td><td>' + this.MakeNumberForm('ChainGold',chainGoldInstructions,'',"size='8' style='font-size: 10px; text-align: right' ") + '</td></tr></table>';
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Target Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('TargetType',targetList,targetInst,"style='font-size: 105px min-width: 105px; max-width: 105px; width : 105px;'") + '</td></tr></table>';
			htmlCode += "<div id='caap_FreshmeatSub' style='display: " + (gm.getValue('TargetType',false) != 'Userid List'?'block':'none') +"'>"
				htmlCode += "<div id='caap_RaidSub' style='display: " + (gm.getValue('TargetType',false) == 'Raid'?'block':'none') +"'>"
					htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
					htmlCode += '<tr><td>Attempt +1 Kills</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + this.MakeCheckBox('PlusOneKills',false,'',plusonekillsInstructions) +  '</td></tr></table>';
					htmlCode += "Join Raids in this order: <a href='http://userscripts.org/topics/43757' target='_blank'><font color='red'>?</font></a><br />";
					htmlCode += this.MakeTextBox('RaidOrder',raidOrderInstructions," rows='3'");
				htmlCode += "</div>";
				htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Min Relative Rank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('FreshMeatMinRank',FMRankInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Army Ratio Base&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('FreshMeatARBase',FMARBaseInstructions,"0.5","size='2'  style='font-size: 10px; text-align: right'") + '</td></tr></table>';
			htmlCode += "</div>";
			htmlCode += "<div align=right id='caap_UserIdsSub' style='display: " + (gm.getValue('TargetType',false) == 'Userid List'?'block':'none') +"'>"
				htmlCode += this.MakeTextBox('BattleTargets',userIdInstructions," rows='2'") + '<br />';
			htmlCode += "</div>";
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";

	var XMonsterInstructions="Start attacking if stamina is above this points";
	var XMinMonsterInstructions="Don't attack if stamina is below this points";
	var attackOrderInstructions="List of search words that decide which monster to attack first.  Use words in player name or in monster name. To specify max damage follow keyword with :max token and specifiy max damage values. Use 'k' and 'm' suffixes for thousand and million. To override achievement use the ach: token and specify damage values.";
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
		htmlCode += "<div id='caap_WhenMonsterXStamina' style='display: " + (gm.getValue('WhenMonster',false)!='At X Stamina'?'none':'block') +"'>";
			htmlCode += '<tr><td>Start Battles with</td><td>' + this.MakeNumberForm('XMonsterStamina',XMonsterInstructions,1,"size='1'  style='font-size: 10px'") +  ' Stamina</td></tr><br/>';
			htmlCode += '<tr><td>Keep </td><td>' + this.MakeNumberForm('XMinMonsterStamina',XMinMonsterInstructions,0,"size='1'  style='font-size: 10px'") +  ' Stamina Points</td></tr>';
		htmlCode += "</div>";
		htmlCode += "<div id='caap_WhenMonsterHide' style='display: " + (gm.getValue('WhenMonster',false)!='Never'?'block':'none') +"'>"
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += "<tr><td>Monster delay secs</td><td>" + this.MakeNumberForm('seedTime','Max random delay to battle monsters',300,"type='text'  size='4' style='font-size: 10px'") + "</td></tr>";
			htmlCode += '<tr><td>Power Attack Only</td><td> ' + this.MakeCheckBox('PowerAttack',true,'',powerattackInstructions) +  '</td></tr>';
			htmlCode += '<tr><td>Achievement Mode</td><td> ' + this.MakeCheckBox('AchievementMode',true,'',monsterachieveInstructions) +  '</td></tr>';
			htmlCode += '<tr><td>Get Demi Points First</td><td> ' + this.MakeCheckBox('DemiPointsFirst',false,'DemiList',demiPointsFirstInstructions,true)+  '</td></tr>';
			var demiPoint =['Ambrosia','Malekus','Corvintheus','Aurora','Azeron'];
			var demiPtList = ['<img src="http://image2.castleagegame.com/1393/graphics/symbol_tiny_1.jpg" height="15" width="14"/>','<img src="http://image2.castleagegame.com/1393/graphics/symbol_tiny_2.jpg" height="15" width="14"/>','<img src="http://image2.castleagegame.com/1393/graphics/symbol_tiny_3.jpg" height="15" width="14"/>','<img src="http://image2.castleagegame.com/1393/graphics/symbol_tiny_4.jpg" height="15" width="14"/>','<img src="http://image2.castleagegame.com/1393/graphics/symbol_tiny_5.jpg" height="15" width="14"/>'];
				for (var demiPtItem in demiPtList) {
					htmlCode += demiPtList[demiPtItem] + this.MakeCheckBox('DemiPoint'+demiPtItem,true,'',demiPoint[demiPtItem]);
				}
			htmlCode += "</div>";
			htmlCode += '</table><table width=180 cellpadding=0 cellspacing=0>'
			htmlCode += '<tr><td>Fortify If Under</td><td>' + this.MakeNumberForm('MaxToFortify',fortifyInstructions,50,"size='1'  style='font-size: 10px'") + '%</td></tr>';
			htmlCode += '<tr><td>   Quest If Over</td><td>' + this.MakeNumberForm('MaxHealthtoQuest',questFortifyInstructions,60,"size='1'  style='font-size: 10px'") + '%</td></tr>';
			htmlCode += '<tr><td>No Attack Under</td><td>' + this.MakeNumberForm('MinFortToAttack',stopAttackInstructions,10,"size='1'  style='font-size: 10px'") + '%</td></tr></table>';
			htmlCode += "Attack Monsters in this order: <a href='http://userscripts.org/topics/43757' target='_blank'><font color='red'>?</font></a><br />";
			htmlCode += this.MakeTextBox('AttackOrder',attackOrderInstructions," rows='3'");
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";


	// Add General Comboboxes
	generalList = ['Get General List','Use Current','Under Level 4'].concat(gm.getList('AllGenerals'));

	var crossList = function(checkItem) { return (generalList.indexOf(checkItem)>=0); }
	var generalIncomeList= ['Get General List','Mercedes','Cid','Use Current'].filter(crossList);
	var generalBankingList= ['Get General List','Aeris','Use Current'].filter(crossList);
	var reverseGenInstructions="This will make the script level Generals under level 4 from Top-down instead of Bottom-up";

	htmlCode += this.ToggleControl('Generals','GENERALS');
		var dropDownList = ['Idle','Attack','Fortify','Battle','SubQuest','Buy'];
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
		for (var dropDownItem in dropDownList) {
			htmlCode += '<tr><td>' + dropDownList[dropDownItem] + '</td><td>' + this.MakeDropDown(dropDownList[dropDownItem] + 'General',generalList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		}
		//<input type='button' id='caap_resetGeneralList' value='Do Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>'
		htmlCode += '<tr><td>Income</td><td>' + this.MakeDropDown('IncomeGeneral',generalIncomeList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		htmlCode += '<tr><td>Banking</td><td>' + this.MakeDropDown('BankingGeneral',generalBankingList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		htmlCode += '<tr><td colspan="2">' + this.MakeCheckBox('ReverseLevelUpGenerals',false,'',reverseGenInstructions) + '  Reverse Under Level 4 Order</td></tr></table>';
	htmlCode += "<hr/> </div>";

	var statusInstructions="Automatically increase attributes when upgrade skill points are available."
	var statusAdvInstructions="USE WITH CAUTION: You can use numbers or formulas(ie. level * 2 + 10). Variable keywords include energy, health, stamina, attack, defense, and level. JS functions can be used (Math.min, Math.max, etc) !!!Remember your math class: 'level + 20' not equals 'level * 2 + 10'!!!";
	var statImmedInstructions="Update Stats Immediately";
	attrList = ['','energy','attack','defense','stamina','health'];
	htmlCode += this.ToggleControl('Status','UPGRADE SKILL POINTS');
		htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Auto Add Upgrade Points</td><td> ' + this.MakeCheckBox('AutoStat',false,'',statusInstructions) +  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>";
                htmlCode += '<tr><td>Upgrade Immediately</td><td> ' + this.MakeCheckBox('StatImmed',false,'',statImmedInstructions) +  "</td></tr>";
		htmlCode += '<tr><td>Advanced Settings</td><td> ' + this.MakeCheckBox('AutoStatAdv',false,'',statusAdvInstructions) +  " <a href='http://userscripts.org/posts/207279' target='_blank'><font color='red'>?</font></a></td></tr></table>";
		htmlCode += "<div id='caap_Status_Normal' style='display: " + (gm.getValue('AutoStatAdv',false)?'none':'block') +"'>"
			htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
			htmlCode += "<tr><td>Increase" + this.MakeDropDown('Attribute1',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue1',statusInstructions,0,"type='text' size='2' style='font-size: 10px '") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute2',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue2',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute3',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue3',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute4',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue4',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute5',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue5',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr></table>";
		htmlCode += "</div>";
		htmlCode += "<div id='caap_Status_Adv' style='display: " + (gm.getValue('AutoStatAdv',false)?'block':'none') +"'>"
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
	htmlCode += "<hr/> </div>";

	var giftInstructions="Automatically receive and send return gifts.";
	var titleInstructions="Set the title bar to the player name.";
	htmlCode += this.ToggleControl('Other','OTHER OPTIONS');

		var giftChoiceList = ['Same Gift As Received','Random Gift'];
		giftChoiceList = giftChoiceList.concat(gm.getList('GiftList'));
		giftChoiceList.push('Get Gift List');
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Set Title</td><td> ' + this.MakeCheckBox('SetTitle',false,'',titleInstructions) +  "</td></tr>";
		htmlCode += '<tr><td>Auto Elite Army</td><td> ' + this.MakeCheckBox('AutoElite',true,'AutoEliteControl','Enable or disable Auto Elite function',true) + " </td><td><input type='button' id='caap_resetElite' value='Do Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>'+this.MakeTextBox('EliteArmyList',"Try these UserIDs first. Use ',' between each UserID"," rows='2'") + '</td></tr></table>';
		htmlCode += '</div>';
		htmlCode += '<tr><td>Auto Return Gifts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td> ' + this.MakeCheckBox('AutoGift',false,'GiftControl',giftInstructions,true) + "</td></tr>";
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Give&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('GiftChoice',giftChoiceList) + '</td></tr></table>';
		htmlCode += '</div>';
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Auto bless&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('AutoBless',['None','Energy','Attack','Defense','Stamina','Health']) + '</td></tr>';
		htmlCode += '<tr><td>Style&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('DisplayStyle',['CA Skin','Original','Custom','None']) + '</td></tr>';
		htmlCode += "</table><div id='caap_StyleSub' style='display: " + (gm.getValue('DisplayStyle',false) == 'Custom'?'block':'none') +"'>"
				htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
				htmlCode += '<tr><td><b>Started</b></td></tr>';
				htmlCode += '<tr><td>RGB Color</td><td>' + this.MakeNumberForm('StyleColorStarted','FFF or FFFFFF','',"type='text' size='5'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td>Transparency</td><td>' + this.MakeNumberForm('StyleTransparencyStarted','0 ~ 1','',"type='text' size='5'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td><b>Stoped</b></td></tr>';
				htmlCode += '<tr><td>RGB Color</td><td>' + this.MakeNumberForm('StyleColorStoped','FFF or FFFFFF','',"type='text' size='5'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td>Transparency</td><td>' + this.MakeNumberForm('StyleTransparencyStoped','0 ~ 1','',"type='text' size='5'  style='font-size: 10px; text-align: right'") + '</td></tr>';
			htmlCode += "</table></div>";
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += "<tr><td>Reset Dashboard</td><td></td><td>&nbsp;&nbsp;&nbsp;<input type='button' id='caap_refreshMonsters' value='Reset Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
			htmlCode += "<tr><td></td><td></td><td>&nbsp;&nbsp;&nbsp;<input type='button' id='FillArmy' value='Fill Army' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
		htmlCode += '</table></div>';
	htmlCode += "<hr/> </div>";
	htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
	htmlCode += "<tr><td><input type='checkbox' id='unlockMenu' /></td><td>Unlock Menu</td><td><input type='button' id='ResetMenuLocation' value='Reset' style='font-size: 10px; width:50; height:50'></td></tr></table>";
	htmlCode+= "Version: " + thisVersion + "  -  <a href='" + discussionURL + "' target='_blank'>Discussion Boards</a><br />"

	if (newVersionAvailable) {
		htmlCode += "<a href='http://userscripts.org/scripts/source/" +SUC_script_num+".user.js'>Install new autoplayer version: "+GM_getValue('SUC_remote_version') + "!</a>";
	}

	this.SetDivContent('control',htmlCode);

	this.AddListeners('caap_div');

	var SetTitleBox=document.getElementById('caap_SetTitle');
	var SetTitle=gm.getValue('SetTitle',false);
	SetTitleBox.checked=SetTitle?true:false;
	SetTitleBox.addEventListener('change',function(e) {
		if(gm.getValue('SetTitle')) {
			document.title=gm.getValue('PlayerName','CAAP')+" - "+documentTitle;
		}else document.title=documentTitle;
	},false);

	var unlockMenuBox=document.getElementById('unlockMenu');
	var unlockMenu=gm.getValue('unlockMenu',false);
	unlockMenuBox.checked=unlockMenu?true:false;
	unlockMenuBox.addEventListener('change',function(e) {
		div = document.getElementById("caap_div");
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
			gm.setValue("FillArmy",true);
	},false);

	var resetMenuLocation=document.getElementById('ResetMenuLocation');
	resetMenuLocation.addEventListener('click',function(e) {
			div = document.getElementById("caap_div");
			div.style.cursor ='';
			div.style.position='';
			div.removeEventListener('mousedown', Move.dragHandler, false);
			div.style.top='100px';
			div.style.left='940px';
			document.getElementById('unlockMenu').checked = false;
	},false);

	var resetElite=document.getElementById('caap_resetElite');
	resetElite.addEventListener('click',function(e) {
		gm.setValue('AutoEliteGetList',0);
	},false);

	var refreshMonsters=document.getElementById('caap_refreshMonsters');
	refreshMonsters.addEventListener('click',function(e) {
		gm.setValue('monsterOl','');
		gm.setValue('monsterReview',0);
		gm.setValue('monsterReviewCounter',-2);			
	},false);

	var caapRestart=document.getElementById('caapRestart');
	var caapPaused=document.getElementById('caapPaused');
	caapRestart.addEventListener('click',function(e) {
		caapPaused.style.display='none';
		document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundLight','#efe');
		document.getElementById("caap_div").style.background = div.style.opacity = gm.getValue('StyleOpacityLight','1');
		gm.setValue('caapPause','none');
		gm.setValue('ReleaseControl',true);
//		caap.ReloadOccasionally();
//		caap.WaitMainLoop();
	},false);


	controlDiv.addEventListener('mousedown',function(e) {
		document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundDark','#fee');
		document.getElementById("caap_div").style.opacity = div.style.transparency = gm.getValue('StyleOpacityDark','1');
//		nHtml.clearTimeouts();
		gm.setValue('caapPause','block');
		caapPaused.style.display='block';
	},false);

	if(gm.getObjVal('AutoQuest','name')) {
		var stopA=document.getElementById('stopAutoQuest');
		stopA.addEventListener('click',function() {
			gm.setValue('AutoQuest','');
			gm.setValue('WhyQuest','Manual');
			gm.log('Change: setting stopAutoQuest and go to Manual');
			caap.SetControls(true);
		},false);
	}

	if (gm.getValue('WhenBattle') == 'Not Hiding'  && gm.getValue('WhenMonster') != 'Not Hiding') {
		gm.setValue('WhenMonster','Not Hiding');
		this.SetControls(true);
	}

	if (!(globalContainer = document.querySelector('#app46755028429_globalContainer'))) return;
	globalContainer.addEventListener('DOMNodeInserted', function(event) {
/*		if(event.target.querySelector("#app46755028429_app_body")) {
            nHtml.setTimeout(caap.checkMonsterDamage, 0);
		}
*/		if(document.querySelector('#app46755028429_st_2_5')) {
			nHtml.setTimeout(caap.addExpDisplay, 0);
		}
//		nHtml.setTimeout(testfunc, 0);
	}, true);

	globalContainer.addEventListener('click', function(event) {
		var obj = event.target;
		while(obj && !obj.href) obj = obj.parentNode;
		if(obj && obj.href)	caap.clickUrl = obj.href;
//		gm.log('global container ' + caap.clickUrl);
	}, true);

},
/////////////////////////////////////////////////////////////////////

//						MONSTERS DASHBOARD

// Display the current monsters and stats

/////////////////////////////////////////////////////////////////////
makeCommaValue:function(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
},
makeTd:function(text,color) {
	if (gm.getListObjVal('monsterOl',color,'color')) color = gm.getListObjVal('monsterOl',color,'color');
	if (!color) color = 'black';
	return "<td><font size=1 color='" + color+"'>"+text+"</font></td>";
},
engageDashboard:function(force) {
	if ($("#caap_info") && !force && !this.WhileSinceDidIt('engageDashboardTimer',60)) return;
	this.JustDidIt('engageDashboardTimer');
	// if not on an individual monster page, delete any monsters without the page info from Engage
	if (!caap.CheckForImage('dragon_title_owner.jpg')) {
		gm.getList('monsterOl').forEach(function(monsterObj) {
			if (monsterObj.indexOf(vs+'page'+ls)<0)
				gm.deleteListObj('monsterOl',monsterObj.split(vs)[0]);
		});
	}
	caap.selectMonster();
	var layout = "<div id='caap_top' style='position:absolute;top:" + (document.querySelector('#app46755028429_main_bn_container').offsetTop-11)
		+ "px;left:0px;'>"; 
	layout += "<div style='font-size: 9px'<a href='http://www.facebook.com/home.php?filter=app_46755028429'><b>LIVE FEED!</b> Your friends are calling.</a></div>" 	
	layout += "<div id='caap_info' style='width:610px;height:175px;overflow:auto;'></div>";
	layout += "</div>";
	if (!$("#caap_top").length) {
	   $(layout).css({
			background : gm.getValue("StyleBackgroundLight","white"),
//			background : "white",		
//			background : "url('http://image2.castleagegame.com/1357/graphics/bg_jobs_tile.jpg')",
			padding : "5px",
			width: " 610px",
			margin : "0 auto",
			opacity : "1"
		}).insertBefore("#app46755028429_globalContainer");
	}

	var html = "<table width=570 cellpadding=0 cellspacing=0 ><tr>";
	displayItems=['Name','Damage','Damage%','Fort%','TimeLeft','T2K','Phase','Link'];
	for (var p in displayItems) html += "<td><b><font size=1>"+displayItems[p]+'</font></b></td>';
	html += '</tr>';
	displayItems.shift();
	monsterList=gm.getList('monsterOl');
	for (var n in monsterList) {
		monster = monsterList[n].split(vs)[0];
		html += "<tr>";
		html += caap.makeTd(monster,monster);
		for (var p in displayItems) {
//			gm.log(' displayItems[p] '+ displayItems[p] + ' value '+ gm.getListObjVal('monsterOl',monsterList[n],displayItems[p]));
			color = gm.getListObjVal('monsterOl',monster,'color');
			if (displayItems[p] == 'Phase' && (color == 'grey'))
				html += caap.makeTd(gm.getListObjVal('monsterOl',monster,'status'),monster);
			else if ((value = gm.getListObjVal('monsterOl',monster,displayItems[p]))) {
				if (parseInt(value).toString() == value)
					value = caap.makeCommaValue(value);
				html += caap.makeTd(value+(displayItems[p].match(/%/) ? '%':''),monster);
			} else
				html += '<td></td>';
		}
		html += '</tr>';
	}
	html += '</table></div>';
       $("#caap_info").html(html);
	//	$(#caap_monsterdash).remove();
//    $(html).css({ background : "white", padding : "5px", width: "590px", margin : "0 auto" }).insertAfter("#app46755028429_nvbar_div_end");
},

shortenURL:function(long_url, callback) {
// Called too frequently, the delay can cause the screen to flicker, so disabled by returning for now:
callback(long_url);
return;

    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://api.bit.ly/shorten?version=2.0.1&longUrl=' + encodeURIComponent(long_url) + '&login=castleage&apiKey=R_438eea4a725a25d92661bce54b17bee1&format=json&history=1',
        onload : function(response) {
            var result = eval("("+response.responseText+")");
            callback(result.results ? result.results[long_url].shortUrl : long_url);
        }
    });
},

addExpDisplay:function() {
    if (/\(/.test($("#app46755028429_st_2_5 strong").text())) return false;
    var arrExp = $("#app46755028429_st_2_5 strong").text().split("/");
    $("#app46755028429_st_2_5 strong").append(" (<span style='color:red'>"+(arrExp[1] - arrExp[0])+"</span>)");
},

/////////////////////////////////////////////////////////////////////

//							EVENT LISTENERS

// Watch for changes and update the controls

/////////////////////////////////////////////////////////////////////

SetDisplay:function(idName,setting){
	if (!(div = document.getElementById('caap_' + idName))) {
		gm.log('Unable to find div: ' + idName);
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
	var ss=document.evaluate("//input[contains(@id,'caap_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength<=0) gm.log('no inputs');
	for(var s=0; s<ss.snapshotLength; s++) {
		var inputDiv=ss.snapshotItem(s);
		if (inputDiv.type=='checkbox') {
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/caap_/i,'')
				var value = e.target.value;
				gm.setValue(idName,e.target.checked);
				if (e.target.className) caap.SetDisplay(e.target.className,e.target.checked);
				else if (idName == 'AutoStatAdv') {
					if (value) {
						caap.SetDisplay('Status_Normal',false);
						caap.SetDisplay('Status_Adv',true);
						for (var n=1; n<=5; n++) {
							gm.setValue('AttrValue' + n,'')
						}
					} else {
						caap.SetDisplay('Status_Normal',true);
						caap.SetDisplay('Status_Adv',false);
					}
					caap.SetControls(true);
				}
			},false);

		} else if (inputDiv.type=='text') {
			var idName = inputDiv.id.replace(/caap_/i,'');
			inputDiv.value=gm.getValue(idName,'').toString();
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/caap_/i,'');
				if (/Style.*/.test(inputDiv.id)) {
					gm.setValue("StyleBackgroundLight","#"+gm.getValue("StyleColorStarted","FFF"));
					gm.setValue("StyleOpacityLight",gm.getValue("StyleTransparencyStarted","1"));
					gm.setValue("StyleBackgroundDark","#"+gm.getValue("StyleColorStoped","FFF"));
					gm.setValue("StyleOpacityDark",gm.getValue("StyleTransparencyStoped","1"));
				}
				gm.setValue(idName,e.target.value);
			},false);
		}
	}

	var ss=document.evaluate("//select[contains(@id,'caap_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength<=0) gm.log('no selects');
	for(var s=0; s<ss.snapshotLength; s++) {
		var inputDiv=ss.snapshotItem(s);
		inputDiv.addEventListener('change',function(e) {
			if (e.target.selectedIndex > 0) {
				var idName = e.target.id.replace(/caap_/i,'')
				var value = e.target.options[e.target.selectedIndex].value
				gm.log('Change: setting ' + idName + ' to ' + value);
				gm.setValue(idName,value);
				e.target.options[0].value = value;
				if (idName =='WhenQuest' || idName =='WhenBattle' || idName =='WhenMonster') {
					caap.SetDisplay(idName + 'Hide',(value!='Never'));
					caap.SetControls(true);
				} else if (idName == 'QuestArea' || idName == 'QuestSubArea' || idName =='WhyQuest') {
					gm.setValue('AutoQuest','');
					caap.SetControls(true);
				} else if (idName == 'IdleGeneral') {
					gm.setValue('MaxIdleEnergy', 0);
					gm.setValue('MaxIdleStamina', 0);
					caap.SetControls(true);
				} else if (idName == 'TargetType') {
					switch (value) {
						case "Freshmeat" :
							caap.SetDisplay('FreshmeatSub',true);
							caap.SetDisplay('UserIdsSub',false);
							caap.SetControls(true);
							break;
						case "Userid List" :
							caap.SetDisplay('FreshmeatSub',false);
							caap.SetDisplay('UserIdsSub',true);
							caap.SetControls(true);
							break;
						default :
							caap.SetDisplay('FreshmeatSub',true);
							caap.SetDisplay('UserIdsSub',false);
							caap.SetControls(true);
					}
				} else if (/Attribute./.test(idName)) {
					gm.setValue("SkillPointsNeed",1)
				} else if (idName == 'DisplayStyle') {
					switch (value) {
						case "CA Skin" :
							gm.setValue("StyleBackgroundLight","#E0C691");
							gm.setValue("StyleBackgroundDark","#B09060");
							gm.setValue("StyleOpacityLight","1");
							gm.setValue("StyleOpacityDark","1");
							if (nHtml.FindByAttr(document.body,'div','id','caap_top')) {
								nHtml.FindByAttr(document.body,'div','id','caap_top').style.backgroundColor= gm.getValue("StyleBackgroundLight","white");
							}	
							caap.SetControls(true);
							break;
						case "None" :
							gm.setValue("StyleBackgroundLight","white");
							gm.setValue("StyleBackgroundDark","");
							gm.setValue("StyleOpacityLight","1");
							gm.setValue("StyleOpacityDark","1");
							if (nHtml.FindByAttr(document.body,'div','id','caap_top')) {
								nHtml.FindByAttr(document.body,'div','id','caap_top').style.backgroundColor = gm.getValue("StyleBackgroundLight","white");
							}								
							caap.SetControls(true);
							break;
						case "Custom" :
							gm.setValue("StyleBackgroundLight","#"+gm.getValue("StyleColorStarted","FFF"));
							gm.setValue("StyleOpacityLight",gm.getValue("StyleTransparencyStarted","1"));
							gm.setValue("StyleBackgroundDark","#"+gm.getValue("StyleColorStoped","FFF"));
							gm.setValue("StyleOpacityDark",gm.getValue("StyleTransparencyStoped","1"));
							if (nHtml.FindByAttr(document.body,'div','id','caap_top')) {
								nHtml.FindByAttr(document.body,'div','id','caap_top').style.backgroundColor = gm.getValue("StyleBackgroundLight","white");
							}							
							caap.SetControls(true);
							break;
						default :
							gm.setValue("StyleBackgroundLight","#efe");
							gm.setValue("StyleBackgroundDark","#fee");
							gm.setValue("StyleOpacityLight","1");
							gm.setValue("StyleOpacityDark","1");
							if (nHtml.FindByAttr(document.body,'div','id','caap_top')) {
								nHtml.FindByAttr(document.body,'div','id','caap_top').style.backgroundColor = gm.getValue("StyleBackgroundLight","white");
							}
							caap.SetControls(true);
					}
				}
			}
		},false);
	}

	var ss=document.evaluate("//textarea[contains(@id,'caap_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
//	if(ss.snapshotLength<=0) gm.log('no textareas');
	for(var s=0; s<ss.snapshotLength; s++) {
		var inputDiv=ss.snapshotItem(s);
		inputDiv.addEventListener('change',function(e) {
			var idName = e.target.id.replace(/caap_/i,'');
			gm.log('Change: setting ' + idName + ' to something new');
			if (idName == 'AttackOrder' || idName == 'RaidOrder') {
				caap.engageDashboard(true);
				//gm.setValue('monsterReview',0);
				//gm.setValue('monsterReviewCounter',-2);
			}
			caap.SaveBoxText(idName);
		},false);
	}

	var ss=document.evaluate("//a[contains(@id,'caap_Switch_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var s=0; s<ss.snapshotLength; s++) {
		var switchDiv=ss.snapshotItem(s);
		switchDiv.addEventListener('click',function(e) {
			var subId = e.target.id.replace(/_Switch/i,'');
			var subDiv = document.getElementById(subId);
			if(subDiv.style.display == "block") {
				subDiv.style.display = "none";
				e.target.innerHTML = e.target.innerHTML.replace(/-/,'+');
				gm.setValue('Control_' + subId.replace(/caap_/i,''),"none")
			}
			else {
				subDiv.style.display = "block";
				e.target.innerHTML = e.target.innerHTML.replace(/\+/,'-');
				gm.setValue('Control_'+ subId.replace(/caap_/i,''),"block")
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
		gm.log('Cannot find status:'+txt);
	}
	return null;
},

GetStats:function() {
	this.stats={};

	if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
		// Facebook ID
		var webSlice=nHtml.FindByAttrContains(document.body,"a","href","party.php");
		if (webSlice) {
			var m=this.userRe.exec(webSlice.getAttribute('href'));
			if(m) {
				var txt=m[2];
				gm.setValue('FBID',txt);
			}
		}
	}

	// rank
	var attrDiv =nHtml.FindByAttrContains(document.body,"div","class",'keep_stat_title');
	if (attrDiv) {
		var txt = nHtml.GetText(attrDiv);
		var levelm=this.rankRe.exec(txt);
		if (levelm) {
			var rank = this.rankTable[levelm[1].toString().toLowerCase().trim()];
			if (rank != undefined) {
				this.stats['rank']=rank;
				gm.setValue('MyRank',this.stats.rank);
				this.JustDidIt('MyRankLast');
			} else {
				gm.log("Unknown rank " + rank + ':' + levelm[1].toString());
			}
		}
		var userName = txt.match(/"(.+)"/);
		gm.setValue('PlayerName',userName[1]);
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
		gm.log('Could not find health');
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
			if ((gm.getValue('IdleGeneral','').indexOf(this.GetCurrentGeneral()) >= 0) || (gm.getValue('IdleGeneral','').match(/use current/i))) {
				gm.setValue('MaxIdleStamina', this.stats.stamina.max);
			}
		}
	} else {
		gm.log('Could not find stamina');
		return false;
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
			if ((gm.getValue('IdleGeneral','').indexOf(this.GetCurrentGeneral()) >= 0) || (gm.getValue('IdleGeneral','').match(/use current/i))) {
				gm.setValue('MaxIdleEnergy', this.stats.energy.max);
			}
		}
	} else {
		gm.log('Could not find energy');
		return false;
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
			if(gm.getValue('Level',0) != this.stats.level) gm.deleteValue('BestPropCost');
			gm.setValue('Level',this.stats.level);
		} else {
			gm.log('Could not find level re');
		}
	} else {
		gm.log('Could not find level obj');
	}

	this.stats['rank']=parseInt(gm.getValue('MyRank'));

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
			gm.log("Can't find armyRe in " + txt);
		}
	} else {
		gm.log("Can't find main_bntp stats");
	}

	// gold
	cashObj=nHtml.FindByAttrXPath(document.body,"strong","contains(string(),'$')");
	if(cashObj) {
		var cashTxt=nHtml.GetText(cashObj);
		var cash=this.NumberOnly(cashTxt);
		this.stats.cash=cash;
	} else {
		gm.log('Could not find cash');
	}

	// experience
	var levelMess='';
	var exp=nHtml.FindByAttrContains(document.body,'div','id','st_2_5');
	if(exp) {
		this.stats.exp = this.GetStatusNumbers(exp);
	} else gm.log('Unable to find exp div');

	// time to next level
	if (this.stats.exp) {
		var expPerStamina = 2;
		var expPerEnergy = parseFloat(gm.getObjVal('AutoQuest','expRatio'));
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
	gm.setValue('ResultsFunction',resultsFunction);
},
pageSpecificCheckFunctions:{'battle_monster':'checkMonsterEngage','raid':'checkMonsterEngage'},
CheckResults:function() {
	// Check for new gifts
	if (!gm.getValue('HaveGift')) {
		if (nHtml.FindByAttrContains(document.body,'a','href','reqs.php#confirm_')) {
			gm.log('We have a gift waiting!');
			gm.setValue('HaveGift',true);
		} else if (beepDiv = nHtml.FindByAttrContains(document.body,'div','class','UIBeep_Title')) {
			beepText = nHtml.GetText(beepDiv).trim();
			if (beepText.match(/sent you a gift/) && !beepText.match(/notification/)) {
				gm.log('We have a gift waiting');
				gm.setValue('HaveGift',true);
			}
		}
	}

	if (this.stats.level < 10) this.battlePage = 'battle_train,battle_off';
	else this.battlePage = 'battle';


	// Check for Gold Stored
	if (nHtml.FindByAttrContains(document.body,"div","class",'keep_main_section')) {
		var goldStored = nHtml.FindByAttrContains(document.body,"b","class",'money').firstChild.data.replace(/[^0-9]/g,'')
		gm.setValue('inStore',goldStored);
	}
	if (resultsDiv = nHtml.FindByAttrContains(document.body,'span','class','result_body'))
		resultsText = nHtml.GetText(resultsDiv).trim();
	else resultsText = '';

	this.checkMonsterEngage();

	// If set and still recent, go to the function specified in 'ResultsFunction'
	resultsFunction = gm.getValue('ResultsFunction','');
	if ((resultsFunction) && !caap.WhileSinceDidIt('SetResultsFunctionTimer',20)) caap[resultsFunction](resultsText);

	// Below not working, so return
//	return;
	// Check page to see if we should go to a page specific check function
	// todo find a way to verify if a function exists, and replace the array with a check_functionName exists check
	if (!caap.clickURL) return;
	page = caap.clickUrl.match(/\/[^\/]+.php/i)[0].replace('/','').replace('.php','');
	gm.log('Clicked page is ' + page);
	if (this.pageSpecificCheckFunctions[page])
		this[this.pageSpecificCheckFunctions[page]]();
	caap.clickUrl = null;
},


/////////////////////////////////////////////////////////////////////

//							QUESTING

// Quest function does action, DrawQuest sets up the page and gathers info

/////////////////////////////////////////////////////////////////////

MaxEnergyQuest:function() {
	if (!gm.getValue('MaxIdleEnergy', 0)) {
		gm.log("Changing to idle general to get Max energy");
		return this.PassiveGeneral();
	}
	if (this.stats.energy.num >= gm.getValue('MaxIdleEnergy')) return this.Quests();
	return false;
},
baseQuestTable : { 'Land of Fire' :'land_fire', 'Land of Earth':'land_earth', 'Land of Mist':'land_mist', 'Land of Water':'land_water', 'Demon Realm' :'land_demon_realm', 'Undead Realm':'land_undead_realm'},
demiQuestTable : { 'Ambrosia' : 'energy', 'Malekus':'attack', 'Corvintheus':'defense', 'Aurora':'health', 'Azeron':'stamina'},

Quests:function() {
	if(gm.getValue('storeRetrieve','') !== ''){
		if(gm.getValue('storeRetrieve') == 'general'){
			if (this.SelectGeneral('BuyGeneral')) return true;
			gm.setValue('storeRetrieve','');
			return true;
		}else return this.RetrieveFromBank(gm.getValue('storeRetrieve',''));
	}
	this.SetDivContent('quest_mess','');
	if(gm.getValue('WhenQuest','')=='Never') {
		this.SetDivContent('quest_mess','Questing off');
		return false;
	}
	if(gm.getValue('WhenQuest','') == 'Not Fortifying') {
		if(!(maxHealthtoQuest=this.GetNumber('MaxHealthtoQuest'))) {
			this.SetDivContent('quest_mess','<b>No valid over fortify %</b>');
			return false;
		}
		if ((fortMon = gm.getValue('monsterToFortify'))) {
			this.SetDivContent('quest_mess','No questing until attack target '+fortMon+" health exceeds "+this.GetNumber('MaxToFortify')+'%');
			return false;
		}
		if (!(monsterToAttack = gm.getValue('monsterToAttack'))) {
			if (!(targetFort = gm.getListObjVal('monsterOl',monsterToAttack,'ShipHealth'))) {
				if(targetFort < maxHealthtoQuest) {
					this.SetDivContent('quest_mess','No questing until fortify target '+monsterToAttack+' health exceeds '+maxHealthtoQuest+'%');
					return false;
				}
			}
		}
	}
	if(!gm.getObjVal('AutoQuest','name')) {
		if(gm.getValue('WhyQuest','')=='Manual') {
			this.SetDivContent('quest_mess','Pick quest manually.');
			return false;
		}
		this.SetDivContent('quest_mess','Searching for quest.');
	} else if(!this.IsEnoughEnergyForAutoQuest()) return false;

	if (gm.getObjVal('AutoQuest','general')=='none' || gm.getValue('ForceSubGeneral')) {
		if (this.SelectGeneral('SubQuestGeneral')) return true;
	}

	switch (gm.getValue('QuestArea','Quest')) {
		case 'Quest' :
			var subArea = gm.getValue('QuestSubArea','Land of Fire');
			var landPic = this.baseQuestTable[subArea];
			if ((landPic == 'land_demon_realm') || (landPic == 'land_undead_realm')) {
				if (this.NavigateTo('quests,jobs_tab_more.gif,'+landPic + '.gif',landPic + '_sel')) return true;
			} else {
				if (this.NavigateTo('quests,jobs_tab_back.gif,'+landPic + '.gif',landPic + '_sel')) return true;
			}
			break;
		case 'Demi Quests' :
			if (this.NavigateTo('quests,symbolquests','demi_quest_on.gif')) return true;
			var subArea = gm.getValue('QuestSubArea','Ambrosia');
			var picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+this.demiQuestTable[subArea])
			if (picSlice.style.height!='160px') {
				return this.NavigateTo('deity_'+this.demiQuestTable[subArea]);
			}
			break;
		case 'Atlantis' :
			if (!this.CheckForImage('tab_atlantis_on.gif')) return this.NavigateTo('quests,monster_quests');
		default :
	}

	if ((button = this.CheckForImage('quick_switch_button.gif')) && !gm.getValue('ForceSubGeneral',false)) {
		gm.log('Clicking on quick switch general button.');
		this.Click(button);
		return true;
	}
	//Buy quest requires popup
	if(itemBuyPopUp = nHtml.FindByAttrContains(document.body,"form","id",'itemBuy')){
		gm.setValue('storeRetrieve','general');
		if (this.SelectGeneral('BuyGeneral')) return true;
		gm.setValue('storeRetrieve','');
		var costToBuy =itemBuyPopUp.textContent.replace(/.*\$/,'')
		gm.log("costToBuy = "+costToBuy);
		if(this.stats.cash < costToBuy) {
			//Retrieving from Bank
			if(this.stats.cash+(gm.getValue('inStore')-this.GetNumber('minInStore'))>= costToBuy){
				gm.log("Trying to retrieve: "+(costToBuy-this.stats.cash));
				gm.setValue("storeRetrieve",costToBuy-this.stats.cash);
				return this.RetrieveFromBank(costToBuy-this.stats.cash);
			}else{
				gm.setValue('AutoQuest','');
				gm.setValue('WhyQuest','Manual');
				gm.log("Cant buy requires, stopping quest");
				caap.SetControls(true);
				return false;
			}
		}
		if (button = this.CheckForImage('quick_buy_button.jpg')){
		gm.log('Clicking on quick buy button.');
		this.Click(button);
		return true;
		}
		gm.log("Cant find buy button");
		return false;
	}

	if (button = this.CheckForImage('quick_buy_button.jpg')) {
		gm.setValue('storeRetrieve','general');
		if (this.SelectGeneral('BuyGeneral')) return true;
		gm.setValue('storeRetrieve','');
		var costToBuy = button.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.data.replace(/[^0-9]/g,'');
		gm.log("costToBuy = "+costToBuy);
			if(this.stats.cash < costToBuy) {
				//Retrieving from Bank
				if(this.stats.cash+(gm.getValue('inStore')-this.GetNumber('minInStore'))>= costToBuy){
					gm.log("Trying to retrieve: "+(costToBuy-this.stats.cash));
					gm.setValue("storeRetrieve",costToBuy-this.stats.cash);
					return this.RetrieveFromBank(costToBuy-this.stats.cash);
				}else{
					gm.setValue('AutoQuest','');
					gm.setValue('WhyQuest','Manual');
					gm.log("Cant buy General, stopping quest");
					caap.SetControls(true);
					return false;
				}
			}
		gm.log('Clicking on quick buy general button.');
		this.Click(button);
		return true;
	}
	autoQuestDivs = this.DrawQuests(true);
	if(!gm.getObjVal('AutoQuest','name')) {
		gm.log('Could not find autoquest.');
		this.SetDivContent('quest_mess','Could not find autoquest.');
		return false;
	}
	if(gm.getObjVal('AutoQuest','name')!=autoQuestName) {
		gm.log('New AutoQuest found.');
		this.SetDivContent('quest_mess','New AutoQuest found.');
		return true;
	}
	//if found missing requires, click to buy
	if(background = nHtml.FindByAttrContains(autoQuestDivs.tr,"div","style",'background-color')){
		if(background.style.backgroundColor == 'rgb(158, 11, 15)'){
			gm.log(" background.style.backgroundColor = "+background.style.backgroundColor);
			gm.setValue('storeRetrieve','general');
			if (this.SelectGeneral('BuyGeneral'))return true;
			gm.setValue('storeRetrieve','');
			if (background.firstChild.firstChild.title) {
				gm.log("Clicking to buy "+background.firstChild.firstChild.title);
				this.Click(background.firstChild.firstChild);
				return true;
			}
		}
	}
	general = gm.getObjVal('AutoQuest','general');
	if (general == 'none' || gm.getValue('ForceSubGeneral',false)) {
		if (this.SelectGeneral('SubQuestGeneral')) return true;
	} else if ((general) && general != this.GetCurrentGeneral()) {
		gm.log('Clicking on general ' + general);
		this.Click(autoQuestDivs.genDiv);
		return true;
	}
	gm.log('Clicking auto quest: '+autoQuestName);
	gm.setValue('ReleaseControl',true);
	caap.Click(autoQuestDivs.click,10000);
	return true;
},

DrawQuests:function(pickQuestTF) {
	whyQuest = gm.getValue('WhyQuest','');
	if (pickQuestTF && whyQuest!='Manual') gm.setValue('AutoQuest','');
	var bestReward=0;
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
//		gm.log("Failed to find quests_background");
		return;
	}
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
				gm.log('cannot find experience:'+quest_name);
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
				energy=eObj.getElementsByTagName('b')[0];
			}
		}

		if(!energy) {
			gm.log('cannot find energy for quest:'+quest_name);
			continue;
		}

		var m=this.moneyRe.exec(this.RemoveHtmlJunk(divTxt));
		if(m) {
			var rewardLow=this.NumberOnly(m[1]);
			var rewardHigh=this.NumberOnly(m[2]);
			reward=(rewardLow+rewardHigh)/2;
		} else {
			gm.log('no money found:'+quest_name+' in ' + divTxt);
		}

		var click=nHtml.FindByAttr(div,"input","name",/^Do/);
		if(!click) {
			gm.log('no button found:'+quest_name);
			continue;
		}
		var bossList = ["Gift of Earth","Eye of the Storm","A Look into the Darkness","The Rift","Undead Embrace"];
		if (bossList.indexOf(quest_name) >= 0) {
			//if boss
			influence = "100";
		} else {
			var influenceList=this.influenceRe.exec(divTxt);
			influence = influenceList[1];
		}
		if(!influence) {
			gm.log('no influence found:'+quest_name+' in ' + divTxt);
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
		this.LabelQuests(div,energy,reward,experience,click);
		switch (whyQuest) {
			case 'Max Influence' :
				if(influence) {
					if (!gm.getObjVal('AutoQuest','name') && this.NumberOnly(influence)<100) gm.setObjVal('AutoQuest','name',quest_name);
				} else {
					gm.log('cannot find influence:'+quest_name+': '+influence);
				}
				break;
			case 'Max Experience' :
				var rewardRatio=(Math.floor(experience/energy*100)/100);
				if(bestReward<rewardRatio) gm.setObjVal('AutoQuest','name',quest_name);
				break;
			case 'Max Gold' :
				var rewardRatio=(Math.floor(reward/energy*10)/10);
				if(bestReward<rewardRatio) gm.setObjVal('AutoQuest','name',quest_name);
			default :
		}
		if (gm.getObjVal('AutoQuest','name')==quest_name) {
			bestReward=rewardRatio;
			expRatio = experience/energy;
			gm.setValue('AutoQuest','name'+ls+quest_name+vs+'energy'+ls+energy+vs+'general'+ls+general+vs+'expRatio'+ls+expRatio);
			autoQuestDivs={'click':click,'tr':div,'genDiv':genDiv};
		}
	}

	if (pickQuestTF) {
		if (gm.getObjVal('AutoQuest','name')) {
			this.SetControls(true);
			return autoQuestDivs;
		}
		if(whyQuest=='Max Influence' && gm.getValue('swithQuestArea',false)){//if not find quest, probably you already maxed the subarea, try another area
			var SubAreaQuest = gm.getValue('QuestSubArea');
			switch (SubAreaQuest) {
				case 'Land of Fire':
					gm.setValue('QuestSubArea','Land of Earth');
					break;
				case 'Land of Earth':
					gm.setValue('QuestSubArea','Land of Mist');
					break;
				case 'Land of Mist':
					gm.setValue('QuestSubArea','Land of Water');
					break;
				case 'Land of Water':
					gm.setValue('QuestSubArea','Demon Realm');
					break;
				case 'Demon Realm':
					gm.setValue('QuestSubArea','Undead Realm');
					break;
				case 'Undead Realm':
					gm.setValue('QuestArea','Demi Quests');
					gm.setValue('QuestSubArea','Ambrosia');
					break;
				case 'Ambrosia':
					gm.setValue('QuestSubArea','Malekus');
					break;
				case 'Malekus':
					gm.setValue('QuestSubArea','Corvintheus');
					break;
				case 'Corvintheus':
					gm.setValue('QuestSubArea','Aurora');
					break;
				case 'Aurora':
					gm.setValue('QuestSubArea','Azeron');
					break;
				case 'Azeron':
					gm.setValue('QuestArea','Quest');
					gm.setValue('QuestSubArea','Land of Fire');
					break;
				default :
					gm.setValue('AutoQuest','');
					gm.setValue('WhyQuest','Manual');
					this.SetControls(true);
					return false;
			}
			return false;
		}
		gm.setValue('AutoQuest','');
		gm.setValue('WhyQuest','Manual');
		this.SetControls(true);
	}
},

GetQuestName:function(questDiv) {
	var item_title=nHtml.FindByAttrXPath(questDiv,'div',"@class='quest_desc' or @class='quest_sub_title'");
	if(!item_title) {
	//	gm.log("Can't find quest description or sub-title");
		return false;
	}

	if (item_title.innerHTML.toString().match(/LOCK/)) {
		return false;
	}

	var firstb=item_title.getElementsByTagName('b')[0];
	if (!firstb) {
		gm.log("Can't get bolded member out of " + item_title.innerHTML.toString());
		return false;
	}

	var quest_name=nHtml.StripHtml(firstb.innerHTML.toString()).trim();

	if(!quest_name) {
		gm.log('no quest name for this row'+div.innerHTML);
		return false;
	}
	return quest_name;
},

IsEnoughEnergyForAutoQuest:function() {
	energy = gm.getObjVal('AutoQuest','energy');
	if(!this.stats.energy || !energy) { return false; }
	var whenQuest = gm.getValue('WhenQuest','');

	if(whenQuest == 'Energy Available' || whenQuest == 'Not Fortifying') {
		if (this.stats.energy.num>=energy) return true;
		this.SetDivContent('quest_mess','Waiting for more energy: '+this.stats.energy.num+"/"+(energy?energy:""));
		return false;
	} else if (whenQuest == 'At Max Energy') {
		if (!gm.getValue('MaxIdleEnergy', 0)) {
			gm.log("Changing to idle general to get Max energy");
			this.PassiveGeneral();
		}
		if (this.stats.energy.num >= gm.getValue('MaxIdleEnergy')) return true;
		if (this.InLevelUpMode() && this.stats.energy.num>=energy) {
			this.SetDivContent('quest_mess','Burning all energy to level up');
			return true;
		}
		this.SetDivContent('quest_mess','Waiting for max energy:'+this.stats.energy.num+"/"+gm.getValue('MaxIdleEnergy'));
		return false;
	}
	return false;
},

LabelQuests:function(div,energy,reward,experience,click) {
	if(nHtml.FindByAttr(div,'div','className','autoquest')) return;

	//var div=document.createElement('div');
	div=document.createElement('div');
	div.className='autoquest';
	div.style.fontSize='10px';
	div.innerHTML="$ per energy: "+
		(Math.floor(reward/energy*10)/10)+
		"<br />Exp per energy: "+
		(Math.floor(experience/energy*100)/100)+
		"<br />";

	if(gm.getObjVal('AutoQuest','name')==quest_name) {
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
		quest_energyObj.innerHTML=energy;
		quest_energyObj.style.display='none';
		setAutoQuest.appendChild(quest_energyObj);
		setAutoQuest.addEventListener("click",function(e) {
			var sps=e.target.getElementsByTagName('span');
			if(sps.length>0) {
				gm.setValue('AutoQuest','name'+ls+sps[0].innerHTML.toString()+ls+'energy'+ls+sps[1].innerHTML.toString());
				gm.setValue('WhyQuest','Manual');
				if (caap.CheckForImage('tab_quest_on.gif')) {
					gm.setValue('QuestArea','Quest');
					if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_1')){
						gm.setValue('QuestSubArea','Land of Fire');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_2')){
						gm.setValue('QuestSubArea','Land of Earth');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_3')){
						gm.setValue('QuestSubArea','Land of Mist');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_4')){
						gm.setValue('QuestSubArea','Land of Water');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_5')){
						gm.setValue('QuestSubArea','Demon Realm');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_6')){
						gm.setValue('QuestSubArea','Undead Realm');
					}
					gm.log('Seting SubQuest Area to: '+ gm.getValue('QuestSubArea'));
				} else if (caap.CheckForImage('demi_quest_on.gif')) {
					gm.setValue('QuestArea','Demi Quests');
					// Set Sub Quest Area
					if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_1')){
						gm.setValue('QuestSubArea','Ambrosia');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_2')){
						gm.setValue('QuestSubArea','Malekus');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_3')){
						gm.setValue('QuestSubArea','Corvintheus');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_4')){
						gm.setValue('QuestSubArea','Aurora');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_5')){
						gm.setValue('QuestSubArea','Azeron');
					}
					gm.log('Seting SubQuest Area to: '+ gm.getValue('QuestSubArea'));
				} else if (caap.CheckForImage('tab_atlantis_on.gif')) {
					gm.setValue('QuestArea','Atlantis');
				}
				caap.SetControls(true);
			} else {
				gm.log('what did we click on?');
			}
		},false);
		div.appendChild(setAutoQuest);
	}
	div.style.position='absolute';
	div.style.background='#B09060';
	div.style.right="144px";
	click.parentNode.insertBefore(div,click);
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
		gm.log('Recorded Blessing Time.  Scheduling next click!');
	}

	// Recieved Demi Blessing.  Wait 24 hours to try again.
	if (resultsText.match(/You have paid tribute to/)) {
		this.SetTimer('BlessingTimer',24*60*60+60);
		gm.log('Received blessing.  Scheduling next click!');
	}
	this.SetCheckResultsFunction('');
},
AutoBless:function() {
	var autoBless=gm.getValue('AutoBless','none').toLowerCase();
	if (autoBless=='none') return false;
	if (!this.CheckTimer('BlessingTimer')) return false;
	if (this.NavigateTo('quests,demi_quest_off','demi_quest_bless')) return true;

	var picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+autoBless)
	if (!(picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+autoBless))) {
		gm.log('No diety pics for deity_'+autoBless);
		return false;
	}

	if (picSlice.style.height!='160px') {
			return this.NavigateTo('deity_'+autoBless);
	}
	if (!(picSlice = nHtml.FindByAttrContains(document.body,'form','id','_symbols_form_'+this.deityTable[autoBless]))) {
		gm.log('No form for deity blessing.');
		return false;
	}
	if (!(picSlice = this.CheckForImage('demi_quest_bless',picSlice))) {
		gm.log('No image for deity blessing.');
		return false;
	}
	gm.log('Click deity blessing for ' + autoBless);
	this.SetTimer('BlessingTimer',60*60);
	this.SetCheckResultsFunction('BlessingResults');
	caap.Click(picSlice);
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
		gm.log("can't find land_buy_info");
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
	if(!this.CheckForImage('tab_land_on.gif')|| nHtml.FindByAttrXPath(document,'div',"contains(@class,'caap_propDone')")) return null;
	gm.deleteValue('BestPropCost');
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
				gm.setValue('BestPropCost',this.bestProp.prop.cost);
			}
		}
		if(prop.row.className == "land_buy_row_unique"){
			if(nHtml.GetText(prop.row).match(/each consecutive day/i) != null) {
				gm.log("Found unique land, checking timer");
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
						gm.log("hours:"+hours+" minutes:"+minutes+" seconds:"+seconds);
						if(gm.getValue('LandTimer',9999999999999999999999999) > (new Date().getTime())*1000+hours*3600+minutes*60+seconds){
							gm.log("Setting Land Timer");
							this.SetTimer('LandTimer',hours*3600+minutes*60+seconds);
						}
						//prop.row.childNodes[1].childNodes[7].childNodes[5].childNodes[5].childNodes[1]
					}else {gm.log("You need to buy a prop first"); this.SetTimer('LandTimer',9999999999999999999999999);}
				}else gm.log("Error");
			}
		}
	});
	gm.log("BestPropCost:"+gm.getValue('BestPropCost'));
	if(!gm.getValue('BestPropCost')){
		gm.setValue('BestPropCost','none');
	}
	div=document.createElement('div');
	div.className='caap_propDone';
	div.style.display='none';
	nHtml.FindByAttrContains(document.body,"tr","class",'land_buy_row').appendChild(div);
	return null;
},

IterateProperties:function(func) {
	var content=document.getElementById('content');
	var ss=document.evaluate(".//tr[contains(@class,'land_buy_row')]",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if (!ss || (ss.snapshotLength == 0)) {
		//gm.log("Can't find land_buy_row");
		return null;
	}
	var builtOnRe=new RegExp('(Built On|Consumes|Requires):\\s*([^<]+)','i');
	var propByName={};
	var propNames=[];

	//gm.log('forms found:'+ss.snapshotLength);
	for(var s=0; s<ss.snapshotLength; s++) {
		var row=ss.snapshotItem(s);
		if(!row) { continue; }

		var name=this.PropertiesGetNameFromRow(row);

		if(name==null || name=='') { gm.log("Can't find property name"); continue; }

		var moneyss=document.evaluate(".//*[contains(@class,'gold') or contains(@class,'currency')]",row,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

		if(moneyss.snapshotLength < 2) { gm.log("Can't find 2 gold instances"); continue; }

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
					//gm.log('Cannot find income for: '+name+","+income.textContent);
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
			gm.log("Can't find income or cost for " + name);
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
//		gm.log("Clicking buy button:" +button);
		if(button) {
			gm.log("Buying Prop: " +prop.name);
			this.Click(button,13000);
			gm.setValue('BestPropCost','')
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
//		gm.log("Clicking sell button:" +button);
		if(button) {
			gm.log("Selling Prop: " +prop.name);
			this.Click(button,13000);
			this.sellProp = '';
			return true;
		}
	}
	return false;
},

Properties:function() {
//	if(gm.getValue('LandTimer') && this.CheckTimer('LandTimer')) {
//		if (this.NavigateTo('soldiers,land','tab_land_on.gif')) return true;
//	}
	var autoBuyProperty=gm.getValue('autoBuyProperty',0);
	if(autoBuyProperty) {
		// Do we have properties above our max to sell?
		if (this.sellProp) {
			this.SellProperty(this.sellProp,this.sellProp.selection);
			return true;
		}

		if(!gm.getValue('BestPropCost')){
			gm.log("Going to land to get Best Property Cost");
			if (this.NavigateTo('soldiers,land','tab_land_on.gif')) return true;
		}
		if(gm.getValue('BestPropCost') == 'none'){
			//gm.log("No Properties avaliable");
			return false;
		}
		if(!gm.getValue('inStore')){
			gm.log("Going to keep to get Stored Value");
			if (this.NavigateTo('keep')) return true;
		}
		//Retrieving from Bank
		if(this.stats.cash+(gm.getValue('inStore')-this.GetNumber('minInStore'))>=10*gm.getValue('BestPropCost') && this.stats.cash < 10*gm.getValue('BestPropCost')){
			if(this.PassiveGeneral())return true;
			gm.log("Trying to retrieve: "+(10*gm.getValue('BestPropCost')-this.stats.cash));
			return this.RetrieveFromBank(10*gm.getValue('BestPropCost')-this.stats.cash);
		}

// Need to check for enough moneys + do we have enough of the builton type that we already own.
		if(gm.getValue('BestPropCost') && this.stats.cash >= 10*gm.getValue('BestPropCost')){
			if(this.PassiveGeneral())return true;
			this.NavigateTo('soldiers,land');
			if(this.CheckForImage('tab_land_on.gif')){
				gm.log("Buying property: "+caap.bestProp.name);
				if (this.BuyProperty(caap.bestProp.prop))
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
			var battleTarget=document.getElementById('caap_BattleTargets');
			if(battleTarget.value=="freshmeat") { battleTarget.value=''; }
			if(battleTarget.value!="") { battleTarget.value+="\n"; }
			battleTarget.value+=user;
			caap.SaveBoxText('BattleTargets');
		},false);
		userLink.parentNode.insertBefore(addBattle,userLink.nextSibling);
		userLink.parentNode.insertBefore(document.createTextNode(' '),userLink.nextSibling);
	});
},
*/

CheckBattleResults:function() {
	// Check for Battle results

	resultsDiv = nHtml.FindByAttrContains(document.body,'span','class','result_body')
	if (resultsDiv) {
		resultsText = nHtml.GetText(resultsDiv).trim()
		if (resultsText.match(/Your opponent is dead or too weak to battle/)) {
			if (!this.doNotBattle) this.doNotBattle = this.lastBattleID
			else this.doNotBattle += " " + this.lastBattleID
		}
	}

	if (nHtml.FindByAttrContains(document.body,"img","src",'battle_victory.gif')) {
		winresults = nHtml.FindByAttrContains(document.body,'span','class','positive');
		bptxt = nHtml.GetText(winresults.parentNode).toString().trim();
		bpnum = Number(bptxt.match(/\d+/i));
		goldtxt = nHtml.FindByAttrContains(document.body,"b","class",'gold').innerHTML;
		goldnum = Number(goldtxt.substring(1).replace(/,/,''));

		resultsDiv = nHtml.FindByAttrContains(document.body,'div','id','app_body');
		nameLink=nHtml.FindByAttrContains(resultsDiv.parentNode.parentNode,"a","href","keep.php?user=");
		userId = nameLink.href.match(/user=\d+/i);
		userId = String(userId).substr(5);
		userName = nHtml.GetText(nameLink).trim();

		wins = 1
		gm.log("We Defeated "+userName+"!!")

		//Test if we should chain this guy
		gm.setValue("BattleChainId",'');
		if (this.GetNumber('ChainBP') !== '') {
			if (bpnum >= Number(this.GetNumber('ChainBP'))) {
				gm.setValue("BattleChainId",userId);
				gm.log("Chain Attack " + userId + " Battle Points:" + bpnum );
			} else {
				if (!this.doNotBattle) this.doNotBattle = this.lastBattleID
				else this.doNotBattle += " " + this.lastBattleID
			}
		}
		if (this.GetNumber('ChainGold') !== '') {
			if (goldnum >= Number(this.GetNumber('ChainGold'))) {
				gm.setValue("BattleChainId",userId);
				gm.log("Chain Attack " + userId + " Gold:" + goldnum)
			} else 	{
				if (!this.doNotBattle) this.doNotBattle = this.lastBattleID
				else this.doNotBattle += " " + this.lastBattleID
			}
		}

/* 	Not ready for primtime.   Need to build SliceList to extract our element
		if (gm.getValue('BattlesWonList','').indexOf(os+userId+os) >= 0) {
			element = gm.sliceList('BattlesWonList',os+userId+os);
			elementArray = element.split(vs);
			prevWins = Number(elementArray[3]);
			prevBPs = Number(elementArray[4]);
			prevGold = Number(elementArray[5]);
			wins = prevWins + wins;
			bpnum = prevBPs + bpnum;
			goldnum  = prevGold + goldnum
		}
*/
		if (gm.getValue('BattlesWonList','').indexOf(os+userId+os) == -1) {
			now = (new Date().getTime()).toString();
			newelement = now + os + userId + os + userName + os + wins + os + bpnum + os + goldnum;
			gm.listPush('BattlesWonList',newelement,100);
		}
		this.SetCheckResultsFunction('');
	} else if (this.CheckForImage('battle_defeat.gif')) {
		resultsDiv = nHtml.FindByAttrContains(document.body,'div','id','app_body');
		nameLink=nHtml.FindByAttrContains(resultsDiv.parentNode.parentNode,"a","href","keep.php?user=");
		userId = nameLink.href.match(/user=\d+/i);
		userId = String(userId).substr(5);
		userName = nHtml.GetText(nameLink).trim();

		gm.log("We Were Defeated By "+userName+".")
		if (gm.getValue('BattlesLostList','').indexOf(os+userId+os) == -1) {
			now = (new Date().getTime()).toString();
			newelement = now + os + userId + os + userName
			gm.listPush('BattlesLostList',newelement,100)
		}
/* 	Not ready for primtime.   Need to build SliceList to yank our elemment out of the win list as well
		if (gm.getValue('BattlesWonList','').indexOf(os+userId+os) >= 0) {
			trash = gm.sliceList('BattlesWonList',os+userId+os);
			elementArray = element.split(vs);
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
				gm.log('inp.name is:' + inp.name);
			}
		}

		if (gm.getValue("BattleType","Invade") == "Duel") {
			var inp=nHtml.FindByAttrXPath(battleForm,"input","@name='duel'");
			if (inp) {
				if (inp.value == "false") continue;
				else gm.log('dueling form found');
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
		gm.log('Battle user:'+userid);
		if (gm.getValue('BattleType','Invade') == "Duel") target = "battle_02.gif";
		else target = "battle_01.gif";

		var battleButton = nHtml.FindByAttrContains(document.body,"input","src",target);
		if (battleButton) {
			form = battleButton.parentNode.parentNode;
			inp = nHtml.FindByAttrXPath(form,"input","@name='target_id'");
			if (inp) {
				inp.value = userid;
				this.lastBattleID=userid;
				this.ClickBattleButton(battleButton);
				this.notSafeCount = 0;
				return true;
			} else gm.log("target_id not found in battleForm");
				gm.log("target_id not found in battleForm");
		} else gm.log("battleButton not found");

	return false;
},
rankTable:{'acolyte':0, 'scout': 1,'soldier': 2,'elite soldier': 3,'squire': 4,'knight': 5,'first knight': 6,'legionnaire': 7,'centurion': 8,'champion': 9,'lieutenant commander':10,'commander':11,'high commander':12,'lieutenant general':13,'general':14,'high general':15,'baron':16,'earl':17,'duke':18,'prince':19,'king':20,'high king':21},

ClickBattleButton:function(battleButton) {
	gm.setValue('ReleaseControl',true);
	this.SetCheckResultsFunction('CheckBattleResults');
	this.Click(battleButton);
},
// raid_attack_middle2.gif

battles:{
        'Raid'			: {Invade: 'raid_attack_button.gif'
						, Duel : 'raid_attack_button2.gif'
						, regex : new RegExp('Rank: ([0-9]+) ([^0-9]+) ([0-9]+) ([^0-9]+) ([0-9]+)','i')
						, refresh : 'raid'
						, image : 'tab_raid_on.gif'

						},
        'Freshmeat'		: {Invade: 'battle_01.gif'
						, Duel : 'battle_02.gif'
						, regex : new RegExp('Level ([0-9]+)\\s*([A-Za-z ]+)','i')
						, refresh : 'battle_on.gif'
						, image : 'battle_on.gif'
						}
},

BattleFreshmeat:function(type) {
try{
	var invadeOrDuel = gm.getValue('BattleType');
	var target = "//input[contains(@src,'" + this.battles[type][invadeOrDuel] + "')]";
	gm.log('target ' + target);
	var ss=document.evaluate(target,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength<=0) {
		gm.log('Not on battlepage');
		return false;
	}

	var plusOneSafe = false;
	var bestButton;
	var bestScore = -10000;
	var bestID = 0;
	var safeTargets = [];
	var count = 0;

//	gm.log("my army/rank/level:" + this.stats.army + "/" + this.stats.rank + "/" + this.stats.level);
	for(var s=0; s<ss.snapshotLength; s++) {
		var button=ss.snapshotItem(s);
		if(!(tr=button)) {
			gm.log('No tr parent of button?');
			continue;
		}
		if (type == 'Raid') {
			tr=tr.parentNode.parentNode.parentNode.parentNode.parentNode;
			txt=tr.childNodes[3].childNodes[3].textContent;
			var levelm=this.battles.Raid.regex.exec(txt);
			if (!levelm) {
				gm.log("Can't match battleRaidRe in " + txt);
				continue;
			}
			var rank =parseInt(levelm[1]);
			var level=parseInt(levelm[3]);
			var army =parseInt(levelm[5]);
		} else {
			while(tr.tagName.toLowerCase()!="tr") {
				tr=tr.parentNode;
			}
			//  If looking for demi points, and already full, continue
			if(gm.getValue('DemiPointsFirst','') && !gm.getValue('DemiPointsDone',true)) {
				deityNumber = this.NumberOnly(this.CheckForImage('symbol_',tr).src.match(/\d+\.jpg/i).toString())-1;
				demiPointList = gm.getList('DemiPointList');
				if (parseInt(demiPointList[deityNumber])==10 || !gm.getValue('DemiPoint'+deityNumber)) continue;
			}
			var txt=nHtml.GetText(tr).trim();
			if (!(levelm=this.battles.Freshmeat.regex.exec(txt))) {
				gm.log("Can't match battleLevelRe in " + txt);
				continue;
			}
			var level=parseInt(levelm[1]);
			var rankStr=levelm[2].toLowerCase().trim();
			var rank = this.rankTable[rankStr];
			var subtd=document.evaluate("td",tr,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			var army = parseInt(nHtml.GetText(subtd.snapshotItem(2)).trim());
		}

		// Lets get our Freshmeat user settings
		var minRank = this.GetNumber("FreshMeatMinRank",99);
		var maxLevel = this.GetNumber("FreshMeatMaxLevel",((invadeOrDuel == 'Invade') ? 1000 : 15));
		var ARBase = this.GetNumber("FreshMeatARBase",0.5);
		var ARMax = this.GetNumber("FreshMeatARMax",1000);
		var ARMin = this.GetNumber("FreshMeatARMin",0);

		if (level - this.stats.level > maxLevel) continue;
		if (this.stats.rank && (this.stats.rank - rank  > minRank)) continue;

		var levelMultiplier = this.stats.level/level
		var armyRatio = ARBase * levelMultiplier
		var armyRatio = Math.min(armyRatio,ARMax)
		var armyRatio = Math.max(armyRatio,ARMin)
		if (armyRatio <= 0) {
			gm.log("Bad ratio");
			continue;
		}
//		gm.log("Army Ratio:" + armyRatio + " Level:" + level + " Rank:" + rank + " Army: " + army)

		// if we know our army size, and this one is larger than armyRatio, don't battle
		if (this.stats.army && (army > (this.stats.army*armyRatio))) {
			continue;
		}
		var inp=nHtml.FindByAttrXPath(tr,"input","@name='target_id'");
		var id=inp.value;
		var dfl = gm.getValue('BattlesLostList','');

		// don't battle people we recently lost to
		if (dfl.indexOf(os+id+os) >= 0) continue;
		var thisScore = rank-(army/levelMultiplier/this.stats.army);

		var temp = {};
		temp.id = id ;
		temp.score = thisScore ;
		temp.button = button ;
		temp.targetNumber = s+1 ;
		safeTargets[count] = temp;
		count++;
		if (s == 0 && type == 'Raid') plusOneSafe = true;

		for (x = 0; x < count; x++) {
			for (var y = 0 ; y < x ; y++) {
				if (safeTargets[y].score< safeTargets[y+1].score) {
					temp = safeTargets[y];
					safeTargets[y] = safeTargets[y+1];
					safeTargets[y+1] = temp;
				}
			}
		}
	}

	if (count > 0) {
		if (gm.getValue('PlusOneKills',false) && type == 'Raid') {
			if (plusOneSafe) {
				anyButton = ss.snapshotItem(0);
				form = anyButton.parentNode.parentNode;
				inp = nHtml.FindByAttrXPath(form,"input","@name='target_id'");
				if (inp) {
					firstId = inp.value;
					inp.value = '200000000000001';
					gm.log("Target ID Overriden For +1 Kill. Expected Defender:  " + firstId);
					this.ClickBattleButton(anyButton);
					this.lastBattleID = firstId;
					this.SetDivContent('battle_mess','Attacked: ' + this.lastBattleID);
					this.notSafeCount = 0;
					return true;
				} else gm.log("Could not find 'target_id' input");
			} else gm.log("Not safe for +1 kill.");
		} else {
			for (x = 0; x < count; x++) {
				//gm.log("safeTargets["+x+"].id = "+safeTargets[x].id+" safeTargets["+x+"].score = "+safeTargets[x].score);
				if (!this.lastBattleID && this.lastBattleID == safeTargets[x].id && x < count-1) continue;

				bestButton = safeTargets[x].button;
				if (bestButton != null) {
						gm.log('Found Target score: ' + safeTargets[x].score + ' id: ' + safeTargets[x].id +' Number: '+safeTargets[x].targetNumber);
						this.ClickBattleButton(bestButton);
						this.lastBattleID = safeTargets[x].id;
						this.SetDivContent('battle_mess','Attacked: ' + this.lastBattleID);
						this.notSafeCount = 0;
						return true;
				} else gm.log('Attack button is null');
			}
		}
	}

	this.notSafeCount++;
	if (this.notSafeCount > 100) {
		this.SetDivContent('battle_mess','Leaving Battle. Will Return Soon.');
		gm.log('No safe targets limit reached. Releasing control for other processes.');
		this.notSafeCount = 0;
		return false;
	}

	this.SetDivContent('battle_mess','No targets matching criteria');
	gm.log('No safe targets. ' + this.notSafeCount);

	if (type == 'Raid') {
		if ( (engageButton = this.monsterEngageButtons[gm.getValue('raidToAttack','')]) ) caap.Click(engageButton);
		else this.NavigateTo(this.battlePage + ',raid');
	} else this.NavigateTo(this.battlePage + ',battle_on.gif');
	return true;

}catch (e){gm.log("ERROR Raid :"+e);window.location ='http://apps.facebook.com/castle_age/raid.php';}
},

Battle:function(mode) {
	if (!this.CheckNotHiding("Battle")) {
//		gm.log("Not Hiding Mode: Safe To Wait For Monster.")
		this.SetDivContent('battle_mess','Safe To Wait For Monster');
		return false;
	}
	if (gm.getValue('WhenBattle') == 'No Monster' && mode != 'DemiPoints') {
		if ((gm.getValue('WhenMonster','') != 'Never') && gm.getValue('monsterToAttack') && !gm.getValue('monsterToAttack').match(/the deathrune siege/i)) {
			return false;
		}
	}
	if (!this.CheckStamina('Battle')) return false;

	if (this.WhileSinceDidIt('MyRankLast',60*60)) {
			gm.log('Visiting keep to get new rank');
			this.NavigateTo('keep');
			return true;
	}


	// Check if we should chain attack
	if (nHtml.FindByAttrContains(document.body,"img","src",'battle_victory.gif')) {
		if (this.SelectGeneral('BattleGeneral')) return true;
		if (gm.getValue('BattleType') == 'Invade')
			chainButton = this.CheckForImage('battle_invade_again.gif');
		else
			chainButton = this.CheckForImage('battle_duel_again.gif');

		if (chainButton && gm.getValue("BattleChainId",'') != '') {
			this.SetDivContent('battle_mess','Chain Attack In Progress');
			this.ClickBattleButton(chainButton);
			gm.setValue("BattleChainId",'')
			return true;
		}
	}

	if (!this.notSafeCount) this.notSafeCount = 0;

	if ( !(target = this.GetCurrentBattleTarget())) return false;
	target = target.toLowerCase();
	gm.log('Battle Target: '+target);

	if (this.SelectGeneral('BattleGeneral')) return true;
	switch (target) {
		case 'raid' :
			this.SetDivContent('battle_mess','Joining the Raid');
			if (this.NavigateTo(this.battlePage + ',raid','tab_raid_on.gif')) return true;
			if (!caap.CheckForImage('dragon_title_owner.jpg')) {
				if ((engageButton = this.monsterEngageButtons[gm.getValue('raidToAttack','')])) {
					caap.Click(engageButton);
					return true;
				}
				else {
					gm.log('Unable to engage raid ' + gm.getValue('raidToAttack',''));
					return false;
				}
			}
			if (gm.getValue('TargetType','') == "Userid List") {
				if (this.BattleFreshmeat('Raid')) {
					if (nHtml.FindByAttrContains(document.body,'span','class','result_body')) this.NextBattleTarget();
					if (this.notSafeCount > 10) {
						this.notSafeCount = 0;
						this.NextBattleTarget();
					}
					return true;
				} else return false;
			}
			return this.BattleFreshmeat('Raid');
		case 'freshmeat' :
			if (this.NavigateTo(this.battlePage,'battle_on.gif')) return true;
			this.SetDivContent('battle_mess','Battling ' + target);
			if (gm.getValue('TargetType','') == "Userid List") {
				if (this.BattleFreshmeat('Freshmeat')) {
					if (nHtml.FindByAttrContains(document.body,'span','class','result_body')) this.NextBattleTarget();
					if (this.notSafeCount > 10) {
						this.notSafeCount = 0;
						this.NextBattleTarget();
					}
					return true;
				} else return false;
			}
			return this.BattleFreshmeat('Freshmeat');
		default:
			var dfl = gm.getValue('BattlesLostList','');
			if (dfl.indexOf(os+target+os) >= 0) {
				gm.log('Avoiding Losing Target: ' + target);
				this.NextBattleTarget();
				return true;
			}
			if (this.NavigateTo(this.battlePage,'battle_on.gif')) return true;
			this.SetDivContent('battle_mess','Battling User ' + target);
			if (this.BattleUserId(target)) {
				this.NextBattleTarget();
				return true;
			} return false;
	}
},

NextBattleTarget:function() {
	if (gm.getValue("BattleChainId",'')!='') {
		gm.setValue("BattleChainId",'');
		return;
	}

	var battleUpto=gm.getValue('BattleTargetUpto',0);
	gm.setValue('BattleTargetUpto',battleUpto+1);
},

GetCurrentBattleTarget:function() {
	if (gm.getValue("BattleChainId",'')!='') return gm.getValue("BattleChainId");

	if (gm.getValue('TargetType','') == 'Freshmeat') return 'Freshmeat';

	if (gm.getValue('TargetType','') == 'Raid') {
		if (gm.getValue('raidToAttack','')) {
			return 'Raid';
		} else {
			this.SetDivContent('battle_mess','No Raid To Attack');
			return false;
		}
	}

	var target=gm.getValue('BattleTargets',"");
	if (!target) return false;

	var targets=target.split(/[\n,]/);
	var battleUpto=gm.getValue('BattleTargetUpto',0);
	if (battleUpto > targets.length-1) {
		battleUpto = 0;
		gm.setValue('BattleTargetUpto',0);
	}

	if (!targets[battleUpto]) return false;

	if (targets[battleUpto].toLowerCase() == 'raid') {
		if (gm.getValue('raidToAttack','')) {
			return 'Raid';
		} else {
			this.SetDivContent('battle_mess','No Raid To Attack');
			return false;
		}
	}

	gm.log('nth battle target:'+battleUpto+':'+targets[battleUpto]);
	return targets[battleUpto];
},
/////////////////////////////////////////////////////////////////////

//							ATTACKING MONSTERS

/////////////////////////////////////////////////////////////////////
group:function(label, max) {
    return {
        'label'   : label,
        'max'     : max,
        'count'   : 0
    };
},


//http://castleage.wikidot.com/monster for monster info
bosses:{
        'Elemental'			: {duration: 168, ach: 500000, siege : 5, siegeClicks : [30,60,90,120,200]
							, siegeDam : [6600000,8250000,9900000,13200000,16500000]
							, siege_img : '/graphics/earth_siege_'
/*							, levels : {
								'Levels 90+'   : caap.group('90+: '  ,40),
								'Levels 60-90' : caap.group('60-90: ',30),
								'Levels 30-60' : caap.group('30-60: ',30),
								'Levels 1-30'  : caap.group('01-30: ',30)}
*/							},
        'Hydra'			: {duration: 168, ach: 500000, siege : 6, siegeClicks : [10,20,50,100,200,300]
							, siegeDam : [1340000,2680000,5360000,14700000,28200000,37520000]
							, siege_img : '/graphics/monster_siege_small'
/*							, levels : {
								'Levels 90+'   : caap.group('90+: '  ,30),
								'Levels 60-90' : caap.group('60-90: ',30),
								'Levels 30-60' : caap.group('30-60: ',30),
								'Levels 1-30'  : caap.group('01-30: ',40)}
*/							},
		'Legion'		: {duration: 168 , ach: 250, siege : 6,  siegeClicks : [10,20,40,80,150,300]
							, siegeDam : [3000,4500,6000,9000,12000,15000]
							, siege_img : '/graphics/castle_siege_small', fort: true, staUse:5},
        'Dragon'		: {duration: 72  , ach: 100000, siege : 0},
        'King'			: {duration: 72  , ach:  15000, siege : 0},
        'Terra'         : {duration: 72  , ach:  20000, siege : 0},
        'Queen'			: {duration: 48  , ach:  50000, siege : 1 , siegeClicks : [11], siegeDam : [500000], siege_img : '/graphics/boss_sylvanas_drain_icon.gif'},
        'Ravenmoore'	: {duration: 48  , ach: 500000, siege : 0},
        'Knight'		: {duration: 48  , ach:  30000, siege : 0},
        'Serpent'		: {duration: 72  , ach: 250000, siege : 0, fort: true, staUse:5},
        'Raid I'		: {duration: 88  , ach:     50, siege : 2, siegeClicks : [30,50], siegeDam : [200,500]
							, siege_img : '/graphics/monster_siege_', staUse:1},
        'Raid II'		: {duration: 144 , ach:     50, siege : 2, siegeClicks : [80,100], siegeDam : [300,1500]
							, siege_img : '/graphics/monster_siege_', staUse:1},
        'Mephistopheles': {duration: 48  , ach: 200000, siege : 0}
},
monster:{},
monsterEngageButtons:{},

parseCondition:function(type,conditions) {
	if (!conditions || conditions.toLowerCase().indexOf(':'+type) <0) return 0;
	var value = conditions.substring(conditions.indexOf(':'+type)+4).replace(/:.+/,'');
	if (/k$/i.test(value) || /m$/i.test(value))
		value = parseInt(value) * 1000 * (/\d+k/i.test(value) + /\d+m/i.test(value) * 1000);
	return parseInt(value);
},
checkMonsterEngage:function() {
	if(caap.CheckForImage('tab_monster_active.jpg') || caap.CheckForImage('raid_title')) {
		caap.checkMonsterDamage();
		return;
	}
	if (caap.CheckForImage('tab_monster_on.jpg'))
		page = 'battle_monster';
	else if (caap.CheckForImage('tab_raid_on.gif'))
		page = 'raid';
	else return;
//	gm.log('In check '+ page + ' engage');

	firstMonsterButtonDiv = caap.CheckForImage('dragon_list_btn_');
	if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
		if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user='+gm.getValue('FBID','x'))
				|| firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
			gm.log('On another player\'s keep.');
			return false;
		}
	} else {
		if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user='+unsafeWindow.Env.user)
				|| firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
			gm.log('On another player\'s keep.');
			return false;
		}
	}
	// get all buttons to check monsterObjectList
	var ss=document.evaluate(".//img[contains(@src,'dragon_list_btn_')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if (ss.snapshotLength==0) {
		gm.log('No monster buttons?  On wrong page?');
		return false;
	}
	// Review monsters and find attack and fortify button
	monsterList=[];
	for(var s=0; s<ss.snapshotLength; s++) {
		engageButtonName = ss.snapshotItem(s).src.match(/dragon_list_btn_\d/i)[0];
		monsterFull=nHtml.GetText(ss.snapshotItem(s).parentNode.parentNode.parentNode.parentNode).trim();
		monster=monsterFull.replace('Completed!','').replace(/Fled!/i,'').trim();
		monsterList.push(monster);

		// Make links for easy clickin'
		var url=ss.snapshotItem(s).parentNode.href;
		if (!(url && url.match(/user=/) && (url.match(/mpool=/) || url.match(/raid\.php/)))) continue;
		var mpool = ((url.match(/mpool=\d+/i)) ? '&mpool=' +url.match(/mpool=\d+/i)[0].split('=')[1] : '');
		var link = "<a href='http://apps.facebook.com/castle_age/" + page + ".php?user="
				+ url.match(/user=\d+/i)[0].split('=')[1] + mpool
				+ ((/=3/.test(mpool) || page == 'raid') ? "&action=doObjective" : '') + "'>Link</a>";
		gm.setListObjVal('monsterOl',monster,'Link',link);
		gm.setListObjVal('monsterOl',monster,'page',page);

		switch (engageButtonName) {
			case 'dragon_list_btn_2' :
				gm.setListObjVal('monsterOl',monster,'status','Collect Reward');
				gm.setListObjVal('monsterOl',monster,'color','grey');
				break;
			case 'dragon_list_btn_3' :
				caap.monsterEngageButtons[monster] = ss.snapshotItem(s);
				break;
			case 'dragon_list_btn_4' :
				if (page == 'raid' && !(/!/.test(monsterFull))) {
					caap.monsterEngageButtons[monster] = ss.snapshotItem(s);
					break;
				}
				gm.setListObjVal('monsterOl',monster,'status','Complete');
				gm.setListObjVal('monsterOl',monster,'color','grey');
				break;
			default :
		}
	}
	gm.getList('monsterOl').forEach(function(monsterObj) {
		monster = monsterObj.split(vs)[0];
		if (monsterList.indexOf(monster)<0 && monsterObj.indexOf('page'+ls+page)>=0) gm.deleteListObj('monsterOl',monster);
	});
	caap.engageDashboard(true);
},

checkMonsterDamage:function() {
	// Check if on monster page
	if (!(webSlice=caap.CheckForImage('dragon_title_owner.jpg'))) return;
//	gm.log('In check monster damage');
	// Get name and type of monster
	var monster = nHtml.GetText(webSlice);
	monster = monster.substring(0,monster.indexOf('You have (')).trim();
	if (this.CheckForImage('raid_1_large.jpg')) monstType = 'Raid I';
	else if (this.CheckForImage('raid_b1_large.jpg')) monstType = 'Raid II';
	else monstType = /\w+$/i.exec(monster);
	if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
		if (nHtml.FindByAttrContains(webSlice,'a','href','id='+gm.getValue('FBID','x')))
			 monster = monster.replace(/.+'s /,'Your ');
	} else {
		if (nHtml.FindByAttrContains(webSlice,'a','href','id='+unsafeWindow.Env.user))
			 monster = monster.replace(/.+'s /,'Your ');
	}
	gm.setListObjVal('monsterOl',monster,'Type',monstType);
    // Extract info
    var time     = $("#app46755028429_monsterTicker").text().split(":")
      , boss_name, boss, group_name = '', attacker = '', phase;

	// Check fortify stuff
	if ((img=caap.CheckForImage('seamonster_ship_health'))) {
		var shipHealth = img.parentNode.style.width;
		shipHealth = shipHealth.substring(0,shipHealth.length-1);
		if (monstType == "Legion" || monstType == 'Elemental') {
			if ((img = caap.CheckForImage('repair_bar_grey'))) {
				var extraHealth = img.parentNode.style.width;
				extraHealth = extraHealth.substring(0,extraHealth.length-1);
				shipHealth = Math.round(Number(shipHealth) * (100/(100 - Number(extraHealth))));
			}
		}
		gm.setListObjVal('monsterOl',monster,'Fort%',(Math.round(shipHealth*10))/10);
	}

	// Get damage done to monster
	var webSlice=nHtml.FindByAttrContains(document.body,"td","class","dragonContainer");
	if (webSlice) {
		webSlice=nHtml.FindByAttrContains(webSlice,"td","valign","top");
		if (webSlice) {
			if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
				webSlice=nHtml.FindByAttrContains(webSlice,"a","href","keep.php?user=" + gm.getValue('FBID','x'));
			} else {
				webSlice=nHtml.FindByAttrContains(webSlice,"a","href","keep.php?user=" + unsafeWindow.Env.user);
			}
			if (webSlice) {
				if (monstType=="Serpent" || monstType=="Elemental") {
					var damList=nHtml.GetText(webSlice.parentNode.nextSibling.nextSibling).trim().split("/");
					gm.setListObjVal('monsterOl',monster,'Damage',caap.NumberOnly(damList[0]));
					gm.setListObjVal('monsterOl',monster,'Fort',caap.NumberOnly(damList[1]));
				} else {
					gm.setListObjVal('monsterOl',monster,'Damage',caap.NumberOnly(nHtml.GetText(webSlice.parentNode.nextSibling.nextSibling).trim()));
				}
				var damDone = gm.getListObjVal('monsterOl',monster,'Damage');
//				if (damDone) gm.log("Damage done = " + gm.getListObjVal('monsterOl',monster,'Damage'));
			} else gm.log("Player hasn't done damage yet");
		} else gm.log("couldn't get top table");
	} else gm.log("couldn't get dragoncontainer");

	time     = $("#app46755028429_monsterTicker").text().split(":");
    if(time.length == 3) {
        var miss = $.trim($("#app46755028429_action_logs").prev().children().eq(3).children().eq(2).children().eq(1).text().replace(/.*:\s*Need (\d+) more answered calls to launch/, "$1"));
		gm.setListObjVal('monsterOl',monster,'TimeLeft',time[0] + ":" + time[1]);
		if ((hpBar = $("img[src*=/graphics/monster_health_background.jpg]").parent().css("width"))) {
			var hp   = Math.round(hpBar.replace(/%/,'')*10)/10; //fix two 2 decimal places
			gm.setListObjVal('monsterOl',monster,'Damage%',hp);
			if (!(boss = caap.bosses[monstType])) {
				gm.log('Unknown monster');
				return;
			}
			var T2K = (100/(100-hp))*(boss.duration - (parseInt(time[0]) + (parseInt(time[1])*0.0166)) );
			T2K = Math.round(T2K*10)/10; //fix two 1 decimal place
			gm.setListObjVal('monsterOl',monster,'T2K',T2K.toString()+ ' hr');
		}
		if (boss && boss.siege) {
			phaseText=Math.min($("img[src*="+boss.siege_img+"]").size()+1,boss.siege)+"/"+boss.siege+ " need " + (isNaN(+miss) ? 0 : miss);
			gm.setListObjVal('monsterOl',monster,'Phase',phaseText);
		}
	}
	caap.engageDashboard(true);
},

selectMonster:function() {
	// Process Attack Order
	var firstOverAchMonster;
	var holeyList = gm.getList('HoleyShip');
	var attackOrderString = gm.getValue('AttackOrder','') + ",your,'";
	var attackOrderList=attackOrderString.split(/[\n,]/);
	// The extra apostrophe at the end of attack order makes it match any "soandos's monster" so it always selects a monster if available

	gm.setValue('monsterToAttack','');
	gm.setValue('monsterToFortify','');
	gm.setValue('raidToAttack','');
	monsterList = gm.getList('monsterOl').filter(function(monsterObj) {
		return !(gm.getListObjVal('monsterOl',monsterObj.split(vs)[0],'status'));
	});
	monsterList.forEach(function(monsterObj) {
		gm.setListObjVal('monsterOl',monsterObj.split(vs)[0],'color','black');
		gm.setListObjVal('monsterOl',monsterObj.split(vs)[0],'conditions','none');
	});

	var monsterSelects = ['battle_monster','raid'];
	for (var s in monsterSelects) {
		var selectType = monsterSelects[s];
		if (selectType == 'battle_monster') {
			var atkSetting = 'monsterToAttack';
			var attackOrderString = gm.getValue('AttackOrder','') + ",your,'";
			var attackOrderList=attackOrderString.split(/[\n,]/);
		}
		else {
			atkSetting = 'raidToAttack';
			var attackOrderString = gm.getValue('RaidOrder','') + ",your,'";
			var attackOrderList=attackOrderString.split(/[\n,]/);
		}
		for (var p in attackOrderList) {
			if (!(attackOrderList[p].trim())) continue;
			attackOrderName = attackOrderList[p].match(/^[^:]+/).toString().trim().toLowerCase();
			for (var m in monsterList) {
				monster = monsterList[m].split(vs)[0];
				if (gm.getListObjVal('monsterOl',monster,'conditions')!='none') continue;
				if (gm.getListObjVal('monsterOl',monster,'status')) {
					gm.setListObjVal('monsterOl',monster,'color','grey');
					continue;
				}
				if (monster.toLowerCase().indexOf(attackOrderName)<0) continue;
				if (gm.getListObjVal('monsterOl',monster,'page') != selectType) continue;

				monsterConditions= attackOrderList[p].replace(/^[^:]+/,'').toString().trim();
				gm.setListObjVal('monsterOl',monster,'conditions',monsterConditions);
				damDone = gm.getListObjVal('monsterOl',monster,'Damage',0);
				monstType = gm.getListObjVal('monsterOl',monster,'Type');
				if ((boss = caap.bosses[monstType]))
					achLevel = caap.parseCondition('ach',monsterConditions) || boss.ach;
				else achLevel = caap.parseCondition('ach',monsterConditions);
				maxDamage = caap.parseCondition('max',monsterConditions);
				monsterFort = parseFloat(gm.getListObjVal('monsterOl',monster,'Fort%',100));
//				battleFuncCheck = (gm.getValue('LastAction')!='Battle' || gm.getListObjVal('monsterOl',monster,'page')=='raid');

				if (maxDamage && damDone>maxDamage)
					gm.setListObjVal('monsterOl',monster,'color','red');
				else if (monsterFort < caap.GetNumber('MinFortToAttack',1))
					gm.setListObjVal('monsterOl',monster,'color','purple');
				else if (damDone>achLevel && gm.getValue('AchievementMode') && selectType == 'battle_monster') {
					if (!firstOverAchMonster) firstOverAchMonster = monster;
					gm.setListObjVal('monsterOl',monster,'color','chocolate');
				} else if (!gm.getValue(atkSetting,''))
					gm.setValue(atkSetting,monster);
				maxToFortify = caap.parseCondition('f%',monsterConditions) || caap.GetNumber('MaxToFortify',0);
				if (monsterFort < maxToFortify && !gm.getValue('monsterToFortify','')) {
					gm.setListObjVal('monsterOl',monster,'color','blue');
					gm.setValue('monsterToFortify',monster);
				}
			}
		}

		if (!gm.getValue(atkSetting)) {
			if (firstOverAchMonster) gm.setValue(atkSetting,firstOverAchMonster);
			else continue;
		}		

		monster = gm.getValue(atkSetting)
		gm.setListObjVal('monsterOl',monster,'color','green');
		monsterConditions = gm.getListObjVal('monsterOl',monster,'conditions');
		monstType = gm.getListObjVal('monsterOl',monster,'Type','Dragon');
	//	gm.log(' monster type 2 '+ monstType + ' monster '  + monster);

		if (selectType == 'battle_monster') {
			if (caap.bosses[monstType] && caap.bosses[monstType].staUse)
				gm.setValue('MonsterStaminaReq',caap.bosses[monstType].staUse);
			else if ((caap.InLevelUpMode() && caap.stats.stamina.num>=10) || monsterConditions.match(/:pa/i))
				gm.setValue('MonsterStaminaReq',5);
			else if (monsterConditions.match(/:sa/i))
				gm.setValue('MonsterStaminaReq',1);
			else if (gm.getValue('PowerAttack'))
				gm.setValue('MonsterStaminaReq',5);
			else gm.setValue('MonsterStaminaReq',1);
		}
	}
},

Monsters:function() {
///////////////// Reivew/Siege all monsters/raids \\\\\\\\\\\\\\\\\\\\\\

	if (!this.CheckNotHiding("Monster") && this.CheckStamina('Monster',1)) {
		gm.log("Not Hiding Mode: We're not safe. Go battle.")
		this.SetDivContent('battle_mess','Not Safe For Monster. Battle!');
		return false;
	}

	// Review all active monsters, try siege weapons on the way
	if (this.WhileSinceDidIt('monsterReview',60*60)
			&& (this.CheckStamina('Monster',1) || gm.getValue('monsterReview')==0)) {
		counter = parseInt(gm.getValue('monsterReviewCounter',-2));
		// Check Monster page
		if (counter == -3) {
			gm.setValue('monsterOl','');
			gm.setValue('monsterReviewCounter',++counter);
		}
		if (counter == -2) {
			if (this.NavigateTo('keep,battle_monster','tab_monster_on.jpg')) return true;
			gm.setValue('monsterReviewCounter',++counter);
		}
		// Check Raid page
		if (counter == -1)
			if (this.NavigateTo(this.battlePage + ',raid','tab_raid_on.gif')) return true;
		// Check raids and monster individual pages
		monsterObjList = gm.getList('monsterOl');
		while ( ++counter < monsterObjList.length) {
			if (!(monsterObjList[counter])) continue;
			monster = monsterObjList[counter].split(vs)[0];
			this.SetDivContent('battle_mess','Reviewing/sieging '+ monster);
			this.SetDivContent('battle_mess','Reviewing/sieging '+ monster);
			gm.setValue('monsterReviewCounter',counter);
			if ((link = gm.getListObjVal('monsterOl',monster,'Link')))
				caap.VisitUrl(link.split("'")[1]);
			return true;
		}
		this.JustDidIt('monsterReview');
		gm.log('No monsters to review/siege.');
		gm.setValue('monsterReviewCounter',-3);
	}
	if (!this.WhileSinceDidIt('NoMonsterToAttack',60*5)) return false;


///////////////// Individual Monster Page \\\\\\\\\\\\\\\\\\\\\\

// Establish a delay timer when we are 1 stamina below attack level. Timer includes 5 min for stamina tick plus user defined random interval
	if (!this.InLevelUpMode() && this.stats.stamina.num == (gm.getValue('MonsterStaminaReq',1) - 1)
			&& this.CheckTimer('battleTimer') && gm.getValue('seedTime',0) > 0) {
		this.SetTimer('battleTimer',5*60+Math.floor(Math.random()*gm.getValue('seedTime',0)));
		this.SetDivContent('battle_mess','Monster Delay Until ' + this.DisplayTimer('battleTimer'));
		return false;
	}

	if (!this.CheckTimer('battleTimer')) {
		if(this.stats.stamina.num < gm.getValue('MaxIdleStamina',this.stats.stamina.max)) {
			this.SetDivContent('fight_mess','Monster Delay Until ' + this.DisplayTimer('battleTimer'));
			return false;
		}
	}

	// Check to see if we should fortify, attack monster, or battle raid

	if ( (monster = gm.getValue('monsterToFortify')) && this.stats.energy.num >= 10) {
		fightMode = gm.setValue('fightMode','Fortify');
	} else if ( (monster = gm.getValue('monsterToAttack')) && this.CheckStamina('Monster',gm.getValue('MonsterStaminaReq',1))) {
		fightMode = gm.setValue('fightMode','Attack');
	} else return false;


	// Set right general

	if (this.SelectGeneral(fightMode +'General')) return true;

	// Check if on engage monster page
	if ((webSlice=this.CheckForImage('dragon_title_owner.jpg'))) {
		// Confirm name and type of monster
		var monsterOnPage = nHtml.GetText(webSlice);
		monsterOnPage = monsterOnPage.substring(0,monsterOnPage.indexOf('You have (')).trim();
		if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
			if (nHtml.FindByAttrContains(webSlice,'a','href','id='+gm.getValue('FBID','x')))
				 monsterOnPage = monsterOnPage.replace(/.+'s /,'Your ');
		} else {
			if (nHtml.FindByAttrContains(webSlice,'a','href','id='+unsafeWindow.Env.user))
				 monsterOnPage = monsterOnPage.replace(/.+'s /,'Your ');
		}
		if (monster != monsterOnPage) {
			gm.log('Looking for ' + monster +  ' but on ' + monsterOnPage + '. Going back to select screen');
			return this.NavigateTo('keep,battle_monster');
		}

		// Find the attack or fortify button
		if (fightMode == 'Fortify') {
			if (!(attackButton=this.CheckForImage('seamonster_fortify.gif')))
				attackButton = this.CheckForImage('attack_monster_button3.jpg');
		} else if (gm.getValue('MonsterStaminaReq',1)==1) {
			// not power attack only normal attacks
			if(!(attackButton = this.CheckForImage('attack_monster_button.jpg'))) {
				if(!(attackButton = this.CheckForImage('seamonster_power.gif'))) {
					attackButton = this.CheckForImage('attack_monster_button2.jpg');
					if (attackButton) gm.setValue('MonsterStaminaReq',5);
				}
			}
		}else{
			// power attack or if not seamonster power attack or if not regular attack - need case for seamonster regular attack?
			if(!(attackButton = this.CheckForImage('attack_monster_button2.jpg'))) {
				if(!(attackButton = this.CheckForImage('seamonster_power.gif'))) {
					attackButton = this.CheckForImage('attack_monster_button.jpg');
					if (attackButton) gm.setValue('MonsterStaminaReq',1);
				}
			}
		}
		if (attackButton) {
			if (fightMode == 'Fortify')
				attackMess = 'Fortifying ' + monster;
			else attackMess = (gm.getValue('MonsterStaminaReq',1)==5?'Power':'Single') + ' Attacking ' + monster;
			gm.log(attackMess);
			this.SetDivContent('battle_mess',attackMess);
			gm.setValue('ReleaseControl',true);
			caap.Click(attackButton,8000);
			return true;
		}
	}
///////////////// Check For Monster Page \\\\\\\\\\\\\\\\\\\\\\

	if (this.NavigateTo('keep,battle_monster','tab_monster_on.jpg')) return true;

	firstMonsterButtonDiv = this.CheckForImage('dragon_list_btn_');
	if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
		if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user='+gm.getValue('FBID','x'))
				|| firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
			gm.log('On another player\'s keep.');
			return this.NavigateTo('keep,battle_monster');
		}
	} else {
		if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user='+unsafeWindow.Env.user)
				|| firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
			gm.log('On another player\'s keep.');
			return this.NavigateTo('keep,battle_monster');
		}
	}

	engageButton = this.monsterEngageButtons[monster];
	if (engageButton) {
		this.SetDivContent('battle_mess','Opening ' + monster);
		caap.Click(engageButton);
		return true;
	} else {
		this.JustDidIt('NoMonsterToAttack');
		gm.log('No "Engage" button for ' + monster);
		return false;
	}
},

/////////////////////////////////////////////////////////////////////

//							COMMON FIGHTING FUNCTIONS

/////////////////////////////////////////////////////////////////////

DemiPoints:function() {
	if (!gm.getValue('DemiPointsFirst')) return false;

	if (this.CheckForImage('battle_on.gif')) {
		if (smallDeity = this.CheckForImage('symbol_tiny_1.jpg')) {
			demiPointList = nHtml.GetText(smallDeity.parentNode.parentNode.parentNode).match(/\d+ \/ 10/g);
			gm.setList('DemiPointList',demiPointList);
			gm.log('DemiPointList: ' + demiPointList);
			if (this.CheckTimer('DemiPointTimer')) {
				gm.log('Set DemiPointTimer to 24 hours, and check if DemiPoints done');
				this.SetTimer('DemiPointTimer', 24*60*60);
			}
			gm.setValue('DemiPointsDone',true);
			for (var demiPtItem in demiPointList) {
				if (demiPointList[demiPtItem] != '10 / 10' && gm.getValue('DemiPoint'+demiPtItem)) {
					gm.setValue('DemiPointsDone',false);
					break;
				}
			}
			gm.log('Demi Point Timer '+this.DisplayTimer('DemiPointTimer')+' demipoints done is  '+gm.getValue('DemiPointsDone',false));
		}
	}
	if (this.CheckTimer('DemiPointTimer')) return this.NavigateTo(this.battlePage,'battle_on.gif');

	if (!gm.getValue('DemiPointsDone',true)) return this.Battle('DemiPoints');
},

minutesBeforeLevelToUseUpStaEnergy : 5,

InLevelUpMode:function() {
	var now = new Date();
	if (!(this.stats.levelTime)) return false;
	if ((this.stats.levelTime.getTime() - now.getTime())<this.minutesBeforeLevelToUseUpStaEnergy*60*1000) {
		return true;
	}
	return false;
},
CheckStamina:function(battleOrBattle,attackMinStamina) {
	if (!attackMinStamina) attackMinStamina=1;
	when = gm.getValue('When' + battleOrBattle,'');
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
		if (gm.getValue('BurnMode_'+staminaMF,false)|| this.stats.stamina.num >= gm.getValue('X' + staminaMF,1)) {
			if (this.stats.stamina.num < attackMinStamina || this.stats.stamina.num <=gm.getValue('XMin' + staminaMF,0)){
				gm.setValue('BurnMode_' +staminaMF,false);
				return false;
			}
			this.SetDivContent('battle_mess','Burning stamina');
			gm.setValue('BurnMode_' + staminaMF,true);
			return true;
		}else gm.setValue('BurnMode_' + staminaMF,false);
		if (this.InLevelUpMode() && this.stats.stamina.num>=attackMinStamina) {
			this.SetDivContent('battle_mess','Burning stamina to level up');
			return true;
		}
		this.SetDivContent('battle_mess','Waiting for stamina: '+this.stats.stamina.num+"/"+gm.getValue('X' + staminaMF,1));
		return false;
	}

	if (when == 'At Max Stamina') {
		if (!gm.getValue('MaxIdleStamina', 0)) {
			gm.log("Changing to idle general to get Max Stamina");
			this.PassiveGeneral();
		}
		if (this.stats.stamina.num >= gm.getValue('MaxIdleStamina')) {
			this.SetDivContent('battle_mess','Using max stamina');
			return true;
		}
		if (this.InLevelUpMode() && this.stats.stamina.num>=attackMinStamina) {
			this.SetDivContent('battle_mess','Burning all stamina to level up');
			return true;
		}
		this.SetDivContent('battle_mess','Waiting for max stamina: '+this.stats.stamina.num+"/"+gm.getValue('MaxIdleStamina'));
		return false;
	}
	if (this.stats.stamina.num>=attackMinStamina) return true;
	this.SetDivContent('battle_mess','Waiting for more stamina: '+this.stats.stamina.num+"/"+attackMinStamina);
	return false;
},
CheckNotHiding:function(attackType) {
	if ((gm.getValue('WhenBattle') != "Not Hiding") || (gm.getValue('WhenMonster') != "Not Hiding")) return true;

	if (gm.getValue('BattleType') == 'Invade') chainButton = this.CheckForImage('battle_invade_again.gif');
	else chainButton = this.CheckForImage('battle_duel_again.gif');
	if (chainButton) {
		if (attackType == "Monster") return false;
		if (attackType == "Battle")	return true;
	}

	if (gm.getValue('TargetType') == 'Raid' && !gm.getValue('raidToAttack','')) {
		if (attackType == "Monster") return true;
		if (attackType == "Battle")	return false;	
	}	

	// The lower the risk constant, the more you stay in hiding
	var riskConstant = 1.7
	// Formula to calculate when to use your stamina for hiding
	// If (health - (estimated dmg from next atack) puts us below 10)  AND (current stamina can reach 5 using staminatime/healthtime ratio) then stamina can be used/saved for Monster

	if ((this.stats.health.num - ((this.stats.stamina.num - 1) * riskConstant) < 10) && (this.stats.stamina.num * (5/3) >= 5)) {
		if (attackType == "Monster") return true;
		if ((attackType == "Battle") && (!gm.getValue('monsterToAttack'))) return true;
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
	if (!gm.getValue("BankImmed")) return false;
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
		gm.log('Cannot find box to put in number for bank deposit.');
		return false;
	}

	gm.log('Depositing into bank');
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
	if (!(minInStore==''|| minInStore <= gm.getValue('inStore',0)-num))return false;


	var retrieveForm = retrieveButton.form;

	var numberInput=nHtml.FindByAttrXPath(retrieveForm,'input',"@type='' or @type='text'");
	if(numberInput) {
		numberInput.value=num;
	} else {
		gm.log('Cannot find box to put in number for bank retrieve.');
		return false;
	}

	gm.log('Retrieving '+num +'from bank');
	gm.setValue('storeRetrieve','');
	this.Click(retrieveButton);
	return true;

},

/////////////////////////////////////////////////////////////////////

//							HEAL

/////////////////////////////////////////////////////////////////////

Heal:function() {
	this.SetDivContent('heal_mess','');
	var whenBattle = gm.getValue('WhenBattle','');
	var minToHeal=this.GetNumber('MinToHeal');
	if(minToHeal=="") return false;
	var minStamToHeal=this.GetNumber('MinStamToHeal');
	if(minStamToHeal=="") minStamToHeal = 0;

	if(!this.stats.health) return false;

	if (whenBattle != 'Never') {
		if ((this.InLevelUpMode() || this.stats.stamina.num >= this.stats.stamina.max) && this.stats.health.num < 10) {
			gm.log('Heal');
			return this.NavigateTo('keep,heal_button.gif');
		}
	}
	if(this.stats.health.num>=this.stats.health.max || this.stats.health.num>minToHeal) return false;

	if(this.stats.stamina.num<minStamToHeal) {
		this.SetDivContent('heal_mess','Waiting for stamina to heal: '+this.stats.stamina.num +'/'+minStamToHeal );
		return false;
	}
	gm.log('Heal');
	return this.NavigateTo('keep,heal_button.gif');
},

/////////////////////////////////////////////////////////////////////

//							ELITE GUARD

/////////////////////////////////////////////////////////////////////

AutoElite:function() {
	if (!gm.getValue('AutoElite',false) || !(this.WhileSinceDidIt('AutoEliteGetList',6*60*60))) {
		return false;
	}

	if (String(window.location).indexOf('party.php')) {
		var res=nHtml.FindByAttrContains(document.body,'span','class','result_body');
		if (res) {
			res=nHtml.GetText(res);
			if (res.match(/Your Elite Guard is FULL/i)) {
				gm.setValue('MyEliteTodo','');
				gm.log('elite guard is full');
				this.JustDidIt('AutoEliteGetList');
				return false;
			}
		}
	}

	var eliteList=gm.getValue('MyEliteTodo','').trim();
	if (eliteList== '') {
		if (this.CheckForImage('view_army_on.gif')) {
			gm.log('load auto elite list');
			var armyList=gm.getValue('EliteArmyList','');
			if(/[^0-9,]/.test(armyList) && /\n/.test(armyList)){
				armyList = armyList.replace(/\n/gi,',');
			}
			if(armyList != '') armyList += ',';
			var ss=document.evaluate(".//img[contains(@src,'view_friends_profile')]/ancestor::a[contains(@href,'keep.php?user')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			for(var s=0; s<ss.snapshotLength; s++) {
				var a=ss.snapshotItem(s);
				var user = a.href.match(/user=\d+/i);
				if (user) {
					armyList += String(user).substr(5) + ',';
				}
			}
			if (armyList!='' || (this.stats.army <= 1)) {
				gm.setValue('MyEliteTodo',armyList);
			}
		} else {
			return this.NavigateTo('army,army_member');
		}
	} else if (this.WhileSinceDidIt('AutoEliteReqNext',7)) {
		user=eliteList.substring(0,eliteList.indexOf(','));
		gm.log('add elite ' + user);
		this.VisitUrl("http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=" + user);
		eliteList = eliteList.substring(eliteList.indexOf(',')+1);
		gm.setValue('MyEliteTodo',eliteList);
		this.JustDidIt('AutoEliteReqNext');
		if (eliteList == '') {
			this.JustDidIt('AutoEliteGetList');
			gm.log('Army list exhausted');
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

//				                IMMEDIATEAUTOSTAT

/////////////////////////////////////////////////////////////////////

ImmediateAutoStat:function() {
	if (!gm.getValue("StatImmed")) return false;
	return caap.AutoStat();
},

/////////////////////////////////////////////////////////////////////

//								AUTOGIFT

/////////////////////////////////////////////////////////////////////

CheckGiftResults:function(resultsText) {
	// Confirm gifts actually sent
	if (resultsText.match(/^\d+ requests? sent\.$/)) {
		gm.log('Confirmed gifts sent out.');
		gm.setValue('RandomGiftPic','');
		gm.setValue('FBSendList','');
		this.SetCheckResultsFunction('');
	}
},
AutoGift:function() {

	if (!gm.getValue('AutoGift')) return false;
	if (giftEntry = nHtml.FindByAttrContains(document.body,'div','id','_gift1')) {
		gm.setList('GiftList',[]);
		var ss=document.evaluate(".//div[contains(@id,'_gift')]",giftEntry.parentNode,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var giftNamePic= {};
		for(var s=0; s<ss.snapshotLength; s++) {
			var giftDiv=ss.snapshotItem(s);
			giftName = nHtml.GetText(giftDiv).trim().replace(/!/i,'');
			if (gm.getValue("GiftList").indexOf(giftName) >= 0) giftName += ' #2';
			gm.listPush('GiftList',giftName);
			giftNamePic[giftName]=this.CheckForImage('mystery',giftDiv).src.match(/[\w_\.]+$/i).toString();
//			gm.log('Gift name: ' + giftName + ' pic ' + giftNamePic[giftName] + ' hidden ' + giftExtraGiftTF[giftName]);
		}
//		gm.log('Gift list: ' + gm.getList('GiftList'));
		if (gm.getValue('GiftChoice') == 'Get Gift List') {
			gm.setValue('GiftChoice','Same Gift As Received');
			this.SetControls(true);
		}
	}

	// Go to gifts page if asked to read in gift list
	if (gm.getValue('GiftChoice',false)=='Get Gift List' || !gm.getList('GiftList')) {
		if (this.NavigateTo('army,gift','giftpage_title.jpg')) return true;
	}

	// Gather the gifts
	if (gm.getValue('HaveGift',false)) {
		if (this.NavigateTo('army','invite_on.gif')) return true;
		var acceptDiv = nHtml.FindByAttrContains(document.body,'a','href','reqs.php#confirm_');
		var ignoreDiv = nHtml.FindByAttrContains(document.body,'a','href','act=ignore');
		if(ignoreDiv && acceptDiv) {
			if (!(giverId = this.userRe.exec(ignoreDiv.href))) {
				gm.log('Unable to find giver ID');
				return false;
			}
			var giverName = nHtml.GetText(nHtml.FindByAttrContains(acceptDiv.parentNode.parentNode,'a','href','profile.php')).trim();
			gm.setValue('GiftEntry',giverId[2]+vs+giverName);
			gm.log('Giver ID = ' + giverId[2] + ' Name  = ' + giverName);
			this.JustDidIt('ClickedFacebookURL');
			this.VisitUrl(acceptDiv.href);
			return true;
		}
		gm.setValue('HaveGift',false);
		return this.NavigateTo('gift');
	}

	// Facebook pop-up on CA
	if (gm.getValue('FBSendList','')) {
		if (button = nHtml.FindByAttrContains(document.body,'input','name','sendit') ) {
			gm.log('Sending gifts to Facebook');
			this.Click(button);
			this.SetCheckResultsFunction('CheckGiftResults');
			return true;
		}
		gm.listAddBefore('ReceivedList',gm.getList('FBSendList'));
		gm.setList('FBSendList',[]);
		if (button = nHtml.FindByAttrContains(document.body,'input','name','ok')){
			gm.log('Over max gifts per day');
			this.JustDidIt('WaitForNextGiftSend');
			this.Click(button);
			return true;
		}
		gm.log('No Facebook pop up to send gifts');
		return false;
	}

	// CA send gift button
	if (gm.getValue('CASendList','')) {
		if (button = nHtml.FindByAttrContains(nHtml.FindByAttrContains(document.body,'form','id','req_form_'),'input','id','send')) {
			gm.log('Clicked CA send gift button');
			gm.listAddBefore('FBSendList',gm.getList('CASendList'));
			gm.setList('CASendList',[]);
			caap.Click(button);
			return true;
		}
		gm.log('No CA button to send gifts');
		gm.listAddBefore('ReceivedList',gm.getList('CASendList'));
		gm.setList('CASendList',[]);
		return false;
	}

	if (!this.WhileSinceDidIt('WaitForNextGiftSend',3*60*60)) return false;

	if (this.WhileSinceDidIt('WaitForNotFoundIDs',3*60*60) && gm.getList('NotFoundIDs')) {
		gm.listAddBefore('ReceivedList',gm.getList('NotFoundIDs'));
		gm.setList('NotFoundIDs',[]);
	}

	giverList = gm.getList('ReceivedList');
	if (!giverList.length) return false;
	var giftChoice = gm.getValue('GiftChoice')

	if (this.NavigateTo('army,gift','giftpage_title.jpg')) return true;

	// Get the gift to send out
	if (giftNamePic.length==0) {
		gm.log('No list of pictures for gift choices');
		return false;
	}
	switch (giftChoice) {
		case 'Random Gift':
			if ((giftPic = gm.getValue('RandomGiftPic'))) break;
			var picNum = Math.floor(Math.random()* (gm.getList('GiftList').length));
			var n = 0;
			for(var p in giftNamePic) {
				if (n++ == picNum) {
					var giftPic = giftNamePic[p];
					gm.setValue('RandomGiftPic',giftPic)
					break;
				}
			}
			if (!giftPic) {
				gm.log('No gift type match. GiverList: ' + giverList);
				return false;
			}
			break;
		case 'Same Gift As Received':
			if (giverList[0].indexOf('Unknown Gift')>=0) {
				var givenGiftType = gm.getList('GiftList').shift();
			} else {
				var givenGiftType = giverList[0].split(vs)[2];
			}
			gm.log('Looking for same gift as ' + givenGiftType);
			var giftPic = giftNamePic[givenGiftType];
			if (!giftPic) {
				gm.log('No gift type match. GiverList: ' + giverList);
				return false;
			}
			break;
		default:
			var giftPic = giftNamePic[gm.getValue('GiftChoice')];
	}

	// Move to gifts page
	if (!(picDiv = this.CheckForImage(giftPic))) {
		gm.log('Unable to find ' + giftPic);
		return false;
	} else gm.log('GiftPic is ' + giftPic);
	if (nHtml.FindByAttrContains(picDiv.parentNode.parentNode.parentNode.parentNode,'div','style','giftpage_select')) {
		if (this.NavigateTo('giftpage_ca_friends_off.gif','giftpage_ca_friends_on.gif')) return true;
	} else {
		this.NavigateTo('gift_more_gifts.gif');
		return this.NavigateTo(giftPic);
	}
	// Click on names
	giveDiv = nHtml.FindByAttrContains(document.body,'div','class','unselected_list');
	doneDiv = nHtml.FindByAttrContains(document.body,'div','class','selected_list');
	gm.setList('ReceivedList',[]);
	for(var p in giverList) {
		if (p>10) {
			gm.listPush('ReceivedList',giverList[p]);
			continue;
		}
		giverData=giverList[p].split(vs);
		giverID=giverData[0];
		giftType=giverData[2];
		if (giftChoice == 'Same Gift As Received' && giftType != givenGiftType && giftType != 'Unknown Gift') {
			gm.log('giftType ' + giftType + ' givenGiftType ' + givenGiftType);
			gm.listPush('ReceivedList',giverList[p]);
			continue;
		}

		if (!(nameButton = nHtml.FindByAttrContains(giveDiv,'input','value',giverID))) {
			gm.log('Unable to find giver ID ' + giverID);
			gm.listPush('NotFoundIDs',giverList[p]);
			this.JustDidIt('WaitForNotFoundIDs');
			continue;
		}
		gm.log('Clicking giver ID ' + giverID);
		this.Click(nameButton);

		//test actually clicked
		if (nHtml.FindByAttrContains(doneDiv,'input','value',giverID)) {
			gm.listPush('CASendList',giverList[p]);
			gm.log('Moved ID ' + giverID);
		} else {
			gm.log('NOT moved ID ' + giverID);
			gm.listPush('NotFoundIDs',giverList[p]);
			this.JustDidIt('WaitForNotFoundIDs');
		}
	}
	return true;
},

AcceptGiftOnFB:function() {
	if (window.location.href.indexOf('www.facebook.com/reqs.php') < 0 && window.location.href.indexOf('www.facebook.com/home.php') < 0) {
		return false;
	}
	var giftEntry = gm.getValue('GiftEntry','');
	if (!giftEntry) {
		return false;
	}

	gm.log('On FB page with gift ready to go');
	if (window.location.href.indexOf('facebook.com/reqs.php') >= 0) {
		var ss=document.evaluate(".//input[contains(@name,'/castle/tracker.php')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			var giftDiv=ss.snapshotItem(s);
			var user = giftDiv.name.match(/uid%3D\d+/i);
			if (!user) continue;
			user = String(user).substr(6);
			if (user != this.NumberOnly(giftEntry)) continue;
			giftType = giftDiv.value.replace(/^Accept /i,'').trim();
			if (gm.getList('GiftList').indexOf(giftType) < 0) {
				gm.log('Unknown gift type.');
				giftType = 'Unknown Gift';
			}
			if (gm.getValue('ReceivedList',' ').indexOf(giftEntry)<0) gm.listPush('ReceivedList',giftEntry + vs + giftType);
			gm.log ('This giver: ' + user + ' gave ' + giftType + ' Givers: ' + gm.getList('ReceivedList'));
			caap.Click(giftDiv);
			gm.setValue('GiftEntry','');
			return true;
		}
	}
	if (!this.WhileSinceDidIt('ClickedFacebookURL',10)) return false;
	gm.log('Error: unable to find gift');
	if (gm.getValue('ReceivedList',' ').indexOf(giftEntry)<0) gm.listPush('ReceivedList',giftEntry + '\tUnknown Gift');
	caap.VisitUrl("http://apps.facebook.com/castle_age/army.php?act=acpt&uid=" + this.NumberOnly(giftEntry));
	gm.setValue('GiftEntry','');
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
			gm.log("Unable to identify attribute " + attribute);
			return "Fail";
	}

	if (!button) {
		gm.log("Unable to locate upgrade button for " + attribute);
		return "Fail";
	}

	attrCurrent = parseInt(button.parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));

	var energy = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','energy_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var stamina = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','stamina_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var attack = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','attack').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var defense = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','defense').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var health = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','health_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var level = this.stats.level;
//	gm.log("Energy ="+energy+" Stamina ="+stamina+" Attack ="+attack+" Defense ="+defense+" Heath ="+health);

	if(nHtml.FindByAttrContains(document.body,'div','id','app46755028429_AjaxLoadIcon').style.display=='none') {
		if(!gm.getValue('AutoStatAdv',false)){
			if (attrAdjust > attrCurrent) {
				if ((attribute == 'stamina') && (this.statsPoints < 2)) {
					gm.setValue("SkillPointsNeed",2)
					return "Fail";
				} else gm.setValue("SkillPointsNeed",1)
				gm.log("Status Before:  " + attribute + "=" + attrCurrent + " Adjusting To: " + attrAdjust)
				this.Click(button);
				return "Click";
			} else return "Next";
		} else {
			//Using eval, so user can define formulas on menu, like energy = level + 50
			if (eval(attrAdjust) > attrCurrent) {
				if ((attribute == 'stamina') && (this.statsPoints < 2)) {
					gm.setValue("SkillPointsNeed",2);
					return "Fail";
				} else gm.setValue("SkillPointsNeed",1);
				gm.log("Status Before:  " + attribute + "=" + attrCurrent + " Adjusting To: (" + attrAdjust + ")=" + eval(attrAdjust))
				this.Click(button);
				return "Click";
			} else return "Next";
		}
	} else {
		gm.log("Unable to find AjaxLoadIcon?")
		return "Fail"
	}

// Realy shouldn't make it here
	gm.log("Somethings not right.")
	return "Fail";
},

AutoStat:function(){
	if(!gm.getValue('AutoStat'))return false;

	var content=document.getElementById('content');
	if(!content) { return false; }
	var a=nHtml.FindByAttrContains(content,'a','href','keep.php');
	if(!(this.statsPoints = a.firstChild.firstChild.data.replace(/[^0-9]/g,''))) return false; //gm.log("Dont have any stats points");

	if (this.statsPoints < gm.getValue("SkillPointsNeed",1)) return false;

	if(!(atributeSlice = nHtml.FindByAttrContains(document.body,"div","class",'keep_attribute_section'))) {
		this.NavigateTo('keep');
		return true;
	}
	for (var n=1; n<=5; n++) {
		if (gm.getValue('Attribute' + n,'') != '') {
			switch (this.IncreaseStat(gm.getValue('Attribute' + n,''),gm.getValue('AttrValue' + n,0))) {
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
		if(gm.getValue('FillArmy',false)){
			if (!this.CheckForImage('invite_on.gif')) {
				caap.SetDivContent('army_mess','Filling Army');
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
				if(!gm.getValue('waiting',false)){ //get CA friends
					gm.log("Getting CA friend's list");
					gm.setValue('waiting',true);
					window.setTimeout(function() {gm.setValue('waiting',false);},10000);
					GM_xmlhttpRequest({
						url: 'http://apps.facebook.com/castle_age/gift.php?app_friends=false&giftSelection=1',
						method: 'GET',
						onload: function(response){
							var excludeMatch = response.responseText.match(/(exclude_ids=")[\-0-9,]*"/);
							if(response.status == 200 && excludeMatch){ //if response == ok
								gm.deleteValue('waiting');
								gm.log(response.statusText);
								IdsList = excludeMatch.toString().replace(/[^0-9,]/g,'').split(',');
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
								var ID = gm.getValue("ArmyCount",0);
								if(ID == 0) gm.log("Adding "+Ids.length+" member");
								caap.SetDivContent('army_mess','Filling Army, Please wait...'+ID+"/"+Ids.length);
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
										gm.setValue("ArmyCount",ID);
									}
								}
								if(ID >= Ids.length){
								caap.SetDivContent('army_mess','<b>Fill Army Completed</b>');
								window.setTimeout(function() {caap.SetDivContent('army_mess','');},5000);
								gm.log("Fill Army Completed");
								gm.setValue('FillArmy',false);
								gm.deleteValue("ArmyCount");
								}
							}else{//if response != ok
								caap.SetDivContent('army_mess','<b>Fill Army Failed</b>');
								window.setTimeout(function() {caap.SetDivContent('army_mess','');},5000);
								gm.log("Fill Army Not Completed, cant get CA friends list");
								gm.log("Response.status: "+response.statusText);
								gm.setValue('FillArmy',false);
								gm.deleteValue("ArmyCount");
								gm.deleteValue('waiting');
							}
						}
					});
				}

			}
			return true;
		}
	}catch (e){
		gm.log("ERROR: " + e);
	}
	gm.setValue('ReleaseControl',true);
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

actionDescTable:{'AutoIncome':'Awaiting Income','AutoStat':'Upgrade Skill Points','MaxEnergyQuest':'At Max Energy Quest','PassiveGeneral':'Setting Idle General','ImmediateBanking':'Immediate Banking','Battle':'Battling Players'},

CheckLastAction:function(thisAction) {
	lastAction = gm.getValue('LastAction','none');
	if (this.actionDescTable[thisAction])
		this.SetDivContent('activity_mess','Current activity: ' + this.actionDescTable[thisAction]);
	else
		this.SetDivContent('activity_mess','Current activity: ' + thisAction);
	if (lastAction!=thisAction) {
		gm.log('Changed from doing ' + lastAction + ' to ' + thisAction);
		gm.setValue('LastAction',thisAction);
	}
},

MainLoop:function() {
	this.waitMilliSecs=1000;
	// assorted errors...
	var href=location.href;
	if(href.indexOf('/common/error.html')>=0) {
		gm.log('detected error page, waiting to go back to previous page.');
		window.setTimeout(function() {
			window.history.go(-1);
		}, 30*1000);
		return;
	}
	if(document.getElementById('try_again_button')) {
		gm.log('detected Try Again message, waiting to reload');
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
		gm.log('Undoing notification');
	}

	this.SetupDivs();
//	this.AddBattleLinks();
	if(gm.getValue('Disabled',false)) {
		this.SetControls();
		this.WaitMainLoop();
		return;
	}

	if (!this.GetStats()) {
		noWindowLoad = gm.getValue('NoWindowLoad',0)
		if (noWindowLoad == 0) {
			this.JustDidIt('NoWindowLoadTimer');
			gm.setValue('NoWindowLoad',1);
		} else if (this.WhileSinceDidIt('NoWindowLoadTimer',Math.min(Math.pow(2,noWindowLoad-1)*15,60*60))) {
			this.JustDidIt('NoWindowLoadTimer');
			gm.setValue('NoWindowLoad',noWindowLoad+1);
			this.ReloadCastleAge();
		}
		gm.log('Page no-load count: ' + noWindowLoad);
		this.WaitMainLoop();
		return;
	} else gm.setValue('NoWindowLoad',0);

	this.DrawQuests(false);
	this.CheckResults();
//	this.engageDashboard();
    this.UpdateGeneralList();
    this.SetControls();
	this.DrawProperties();

	if(!this.WhileSinceDidIt('PageLoad',3)) {
		this.WaitMainLoop();
		return;
	}
	if(gm.getValue('caapPause','none') != 'none' || !this.WhileSinceDidIt('PageLoad',3)) {
	/*
		var text = "";
		for each(var val in GM_listValues()){
			text += val +'|'+GM_getValue(val)+';';
		}
		text = text.replace(/\n/gi,',');
		//GM_log(GM_listValues());
		//var vals = GM_listValues().map(GM_getValue);
		gm.log("text = "+text);
		//gm.log("Vals = "+vals);
		*/
		document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundDark','#fee');
		document.getElementById("caap_div").style.opacity = div.style.transparency = gm.getValue('StyleOpacityDark','1');
		this.WaitMainLoop();
		return;
	}
	if (this.AutoIncome()) {
		this.CheckLastAction('AutoIncome');
		this.WaitMainLoop();
		return;
	}
	var actionsList = ['AutoElite','Heal','ImmediateBanking','ImmediateAutoStat','MaxEnergyQuest','DemiPoints','Monsters','Battle','Quests','Properties','Bank','PassiveGeneral','AutoBless','AutoStat','AutoGift','Idle'];

	if (!gm.getValue('ReleaseControl',false)) actionsList.unshift(gm.getValue('LastAction','Idle'));
	else gm.setValue('ReleaseControl',false);
//	gm.log('Action list: ' + actionsList);

	for (var action in actionsList) {
//		gm.log('Action: ' + actionsList[action]);
		if(this[actionsList[action]]()) {
			this.CheckLastAction(actionsList[action]);
			break;
		}
	}

	this.WaitMainLoop();
},

WaitMainLoop:function() {
	this.waitForPageChange=true;
	nHtml.setTimeout(function() { this.waitForPageChange=false; caap.MainLoop(); },caap.waitMilliSecs * (1 + Math.random() * 0.2));
},

ReloadCastleAge:function() {
	// better than reload... no prompt on forms!
	if (window.location.href.indexOf('castle_age') >= 0 && !gm.getValue('Disabled') && (gm.getValue('caapPause') == 'none')) {
		gm.setValue('ReleaseControl',true);
		gm.setValue('caapPause','none');
		window.location = "http://apps.facebook.com/castle_age/index.php?bm=1";
	}
},
ReloadOccasionally:function() {
	nHtml.setTimeout(function() {
		caap.ReloadCastleAge();
		caap.ReloadOccasionally();
	}, 1000*60*8 + (8 * 60 * 1000 * Math.random()));
}
};

if(gm.getValue('SetTitle')) {
        document.title=gm.getValue('PlayerName','CAAP');
};

if (gm.getValue('LastVersion',0) != thisVersion) {
	// Put code to be run once to upgrade an old version's variables to new format or such here.
	if (parseInt(gm.getValue('LastVersion',0))<121) gm.setValue('WhenBattle',gm.getValue('WhenFight','Stamina Available'));
	/*if (parseInt(gm.getValue('LastVersion',0))<126) {
		if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
			for each(var n in GM_listValues()){
				if (GM_getValue(n)) GM_setValue(n,GM_getValue(n).toString().replace('~',os).replace('`',vs));
			}
		}
	}*/
	if (parseInt(gm.getValue('LastVersion',0))<130 && gm.getValue('MonsterGeneral')) {
		gm.setValue('AttackGeneral',gm.getValue('MonsterGeneral'));
		gm.deleteValue('MonsterGeneral');
	}
	if (parseInt(gm.getValue('LastVersion',0))<133) {
		clearList = ['FreshMeatMaxLevel','FreshMeatARMax','FreshMeatARMin'];
		clearList.forEach(function(gmVal) {
			gm.setValue(gmVal,'');
		});
	}
	gm.setValue('LastVersion',thisVersion);
};
$(function() {
	gm.log('Full page load completed');
	gm.setValue('caapPause','none');
	caap.clickUrl=window.location.href;
	// todo figure out way to print out the querySelector value for refined function calls
	if (document.querySelector("#app46755028429_battle_monster"))
		caap.checkMonsterDamage();
//	if (!gm.getValue('Disabled',false))
//		caap.engageDashboard();
	caap.JustDidIt('PageLoad');
	caap.addExpDisplay();
	gm.setValue('ReleaseControl',true);
	caap.MainLoop();
});


caap.ReloadOccasionally();

// ENDOFSCRIPT
