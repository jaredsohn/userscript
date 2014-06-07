Kingdoms of camelot Auto Barber
By eric b. — 

    
Add Syntax Highlighting (this will take a few seconds, probably freezing your browser while it works)

// ==UserScript==
// @name           knights of camelot
// @namespace      eric
// @description    Auto player for knights of camelot game
// @include        
// @version	   1
// ==/UserScript==

if(!GM_log) {
	GM_log=console.debug;
}

var thisVersion = 1;
var debug=false;
var newVersionAvailable=0;

if (parseInt(GM_getValue('SUC_remote_version',0)) > thisVersion) {
	newVersionAvailable=1;
}

;;// update script from: http://userscripts.org/scripts/reviews/69420
;;var SUC_script_num = 65460;
;;try{ function updateCheck(forced) {
;;	if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*1) <= (new Date().getTime()))) {
;;		try {
;			GM_xmlhttpRequest({
;				method: 'GET',
;				url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
;				headers: {'Cache-Control': 'no-cache'},
;				onload: function(resp){
;					var remote_version, rt, script_name;
;					rt=resp.responseText;
;					GM_setValue('SUC_last_update', new Date().getTime()+'');
;					remote_version=parseInt(/@version\s*(.*?)\s*$/m.exec(rt)[1]);
;					script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
;					GM_setValue('SUC_target_script_name', script_name);
;					GM_setValue('SUC_remote_version', remote_version);
;					GM_log('remote version ' + remote_version);
;					if (remote_version > thisVersion) {
;						newVersionAvailable=1;
;						if (forced) {
;							if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
;								GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
;							}
;						}
;					} else if (forced) alert('No update is available for "'+script_name+'."');
;				}
;			})
;		}catch (err) {
;			if (forced) alert('An error occurred while checking for updates:\n'+err);
;		}
;	}
;     }
;     GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});
;     updateCheck(false);
;} catch(err) {}

window.addEventListener("load", function(e) {
	nHtml.clearTimeouts();
	Player.ReloadOccasionally();
	Player.MainLoop();
},false);

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }


/////////////////////////////////////////////////////////////////////
//							HTML TOOLS
// this object contains optionally prefix'ed GM_ replacements
// useful if possible to play multiple servers, worlds, games, etc.
/////////////////////////////////////////////////////////////////////

var GM={
setLValue:function(k, v) {
	GM_setValue(this.lprefix + k, v)
},
getLValue:function(k, d) {
	return GM_getValue(this.lprefix + k, d)
},
setGValue:function(k, v) {
	GM_setValue(this.gprefix + k, v)
},
getGValue:function(k, d) {
	return GM_getValue(this.gprefix + k, d)
},
log:function(m) {
	GM_log(this.lprefix + m)
},
debug:function(m) {
	if (this.getGValue('DebugMode'))
		GM_log(this.lprefix + m);
},
gprefix:'',
lprefix:''
};

var tk_server = String(window.location.hostname).match(/\d+/);
if (tk_server) {
	tk_server=parseInt(tk_server);
	GM.gprefix = GM.lprefix = tk_server + '.';
}

/////////////////////////////////////////////////////////////////////
//							HTML TOOLS
// this object contains general methods for wading through the DOM and dealing with HTML
/////////////////////////////////////////////////////////////////////

var nHtml={
InCList:function(clist, n) {
// returns i>=0 if n starts with the text in one of the comma-delimited entries in clist
// case and whitespace insensitive search
// return -1 if no match
	if (!clist || clist=='') return -1;

	n=n.trim().toLowerCase();
	if (!n || n=='') return -1;
	
	var list = clist.split(',');
	for(var index in list) {
		var e=list[index].trim().toLowerCase();
		if (e=='') next;
		if (n.indexOf(e)==0) return index;
	}
	return -1;
},
Dump:function(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
},
FindByAttrContains:function(obj,tag,attr,className) {
	var pre='@';
	className=className.toLowerCase();
	if(attr=="className") { attr="class"; }
	if(attr=="text()") { pre=''; }
	try {
		var q=document.evaluate(".//"+tag+
			"[contains(translate("+pre+attr+",'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"+className+
			"')]",obj,null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch (err) {
		GM.log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByAttrXPath:function(obj,tag,className) {
	var q=null;
	try {
		var xpath=".//"+tag+"["+className+"]";
		if(obj==null) {
			GM.log('Trying to find xpath with null obj:'+xpath);
			return null;
		}
		q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		GM.log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
LoopByXPath:function(obj,xpath,snapFunc) {
	var ss;
	try {
		ss=document.evaluate(xpath,obj,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	} catch(err) {
		GM.log("XPath Failed:"+xpath+","+err);
	}
	if (ss) {
	for(var s=0; s<ss.snapshotLength; s++) {
		if (snapFunc(ss.snapshotItem(s)) == 'break') {
			break;
		}
	}
	} else {
		GM.log("XPath didn't find anything:"+xpath);
	}
},
FindByXPath:function(obj,xpath) {
	var q=null;
	try {
		if(obj==null) {
			GM.log('Trying to find xpath with null obj:'+xpath);
			return null;
		}
		q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		GM.log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByAttr:function(obj,tag,attr,className) {
	if(className.exec==undefined) {
		if(attr=="className") { attr="class"; }
		try {
			var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
			if(q && q.singleNodeValue) { return q.singleNodeValue; }
		} catch (err) {
			GM.log("XPath Failed:"+xpath+","+err);
		}
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
FindByTag:function(obj,tag) {
	try {
		var q=document.evaluate(".//"+tag,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		GM.log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByClassName:function(obj,tag,className) {
	return this.FindByAttr(obj,tag,"className",className);
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
		if (!obj.getAttribute('onclick')) {
			if (obj.href && obj.href.match(/^javascript:/)) {
				var code = obj.href.substr(11);
				if (code.indexOf('void(0)') < 0) {
					//GM.debug("Changing " + obj.getAttribute('onclick') + " to " + obj.href.substr(11));
					obj.setAttribute('onclick', unescape(obj.href.substr(11)));
				}
			}
		}
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
IsVisible:function(n) {
	return n && n.visibility!='hidden' && n.style.display!='none' && (!n.parentNode || n.parentNode.tagName=='BODY' || this.IsVisible(n.parentNode));
}
};

/////////////////////////////////////////////////////////////////////

//							Player OBJECT

// this is the main object for the game, containing all methods, globals, etc.

/////////////////////////////////////////////////////////////////////

Player={

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
	return (!GM.getLValue(name) || (parseInt(GM.getLValue(name)) < (now-1000*seconds)));
},
JustDidIt:function(name) {
	var now = (new Date().getTime());
	GM.setLValue(name, now.toString());
},
PushDidIt:function(name, seconds) {
	var v=parseInt(GM.getLValue(name,0))+(seconds*1000);
	GM.setLValue(name, v.toString());
},
// slowly, after a randomized time visit a url
VisitUrl:function(href) {
	this.waitMilliSecs=4000+Math.random()*2000;
	nHtml.VisitUrl(href);
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
AddControls:function() {
	// sets up divs and input boxes for controls
	
	if(document.getElementById('AutoPlayer_controls')) {
		return true;
	}
	
	var mn=this.GetMainNav();
	if (mn) {
		var linkStyle = 'background:#fff; border: 2px solid #444; font-weight: bold; padding: 1px';

		var addLink=document.createElement('span');
		addLink.setAttribute('style',linkStyle);
		addLink.id='AutoPauseLink';
		addLink.innerHTML=(GM.getGValue('PlayerPaused','') == '') ? 'Pause' : 'Resume';
		if (GM.getGValue('WaitForCaptcha','') != '') {
			addLink.innerHTML='Captcha OK';
		}
	        addLink.addEventListener('click',function(e) {
			if (GM.getGValue('WaitForCaptcha','') != '') {
				GM.setGValue('PlayerPaused','true');
				GM.setGValue('WaitForCaptcha','');
				Player.JustDidIt("ClickCaptchaOK");
			}
			if (GM.getGValue('PlayerPaused','') == '') {
				this.innerHTML='Resume';
				GM.setGValue('PlayerPaused','true');
			} else {
				this.innerHTML='Pause';
				GM.setGValue('PlayerPaused','');
				if (GM.getGValue('DebugMode')) {
					//GM.setGValue('0.AutoFactionQuest',0);
					//GM.setGValue('0.QuestCheckList','');
				}
			}
		},false);
		mn.insertBefore(addLink,mn.childNodes[0]);

		var addLink=document.createElement('span');
		addLink.setAttribute('style',linkStyle);
		addLink.innerHTML='Settings';
	        addLink.addEventListener('click',function(e) {
			var div = document.getElementById('AutoPlayer_controls');
			if (div) {
				if (div.style.display == 'block') {
					div.style.display = 'none';
				} else {
					div.style.display = 'block';
				}
			} else {
				GM.log("No AutoPlayer_controls");
			}
		},false);
		mn.insertBefore(addLink,mn.childNodes[0]);
	} else {
		GM.log("No main nav, can't add links");
		return false;
	}

	var div=document.createElement('div');
	
	div.id='AutoPlayer_controls';	
	div.setAttribute('style','padding:5px; border:2px solid #444; background:#fff; color: #000; position: absolute; left:0%; top: 20px; display: none; z-index: 90000');	


	div.innerHTML = "\
		<style type='text/css'>label, .check1 {text-align: left; float: left; width: 10em;} .tablink {cursor: pointer; color: blue; border: 1px solid black; padding: 1px}</style>\
		<h3 style='text-align:center; padding:0; margin:0;'>Kingdom of camelot : <span id=ac_curtabname>General</span> Options</h3>\
		<p style='text-align:left'>\
		<span class=tablink style='color:black; cursor: default;' id=ac_tab_1>General</span> \
		<span class=tablink id=ac_tab_2>Farm</span></p>\
		<div id=ac_div_1 style='margin:0; text-align:left;'>\
		<span class=check1><input type=checkbox id='ac_1_EnableBuild'3> Build- coming soon</span> \
		<input type=checkbox id='ac_1_EnableFactionQuests'> Quests - coming soon<br />\
		<span class=check1><input type=checkbox id='ac_1_EnableRecruit'> empty for now</span>\
		<input type=checkbox id='ac_1_EnableLootCamp'> Barb Looting<br />\
		<span class=check1><input type=checkbox id='ac_1_EnableTowerTrial'> empty for now</span>\
		<input type=checkbox id='ac_DebugMode'> Debug Log<br style='clear: both'/>\
		<label>Prefer Faction:</label> <input id='ac_PreferFaction'><br />\
		<label>Prefer Hero:</label> <input id='ac_PreferHero'><br />\
		<label>Prefer Recruit:</label> <input id='ac_PreferRecruit'><br />\
		</div>\
		<div id=ac_div_2 style='display:none; margin:0; text-align:left;'>\
		<label>Coordinates:</label> <textarea id='ac_PlunderCoordinates'></textarea><br />\
		<label>Troop Amount:</label> <input id='ac_PlunderTroopAmount' ac_default='100'><br />\
		<label>Attack Every:</label> <input id='ac_PlunderFrequency' ac_default='1'> Days<br />\
		</div>\
		<div id='AutoPlayer_info' style='text-align:left;'></div>\
	";
	
	document.body.appendChild(div);

	// automatic listener links input to GM.setGValue
	this.AddListeners('AutoPlayer_controls');
	return true;
},
SetDivContent:function(div, code) {
	var div = document.getElementById(div);
	if (!div) {
		GM.log("Can't find div " + div);
		return false;
	}
	div.innerHTML = code;
},
SetControls:function() {
	// sets current values for controls, runs each loop
	
	if(!this.AddControls()) return false;
	
	var htmlCode = '';
	
	htmlCode+= this.statsLine + "<br />";
	if (GM.getLValue('NeedMoreSoldiers','')!='') {
		htmlCode+="Need more soldiers for " + GM.getLValue('NeedMoreSoldiers') + "<br />";
	}
	
	htmlCode+= "Version: " + thisVersion + " ";
	if (newVersionAvailable) {
		htmlCode += "<a href='http://userscripts.org/scripts/source/" +SUC_script_num+".user.js'>(Newer version available)</a>";
	}
	htmlCode+= "<br />";

	this.SetDivContent('AutoPlayer_info', htmlCode);
},

/////////////////////////////////////////////////////////////////////

//							EVENT LISTENERS

// Watch for changes and update the controls

/////////////////////////////////////////////////////////////////////

ShowTab:function(topDivName, idNum) {
	var topDiv;
	if(!(topDiv = document.getElementById(topDivName))) {
		GM.debug("Can't find " + topDivName);
		return false;
	}
	var div = document.getElementById('ac_div_' + idNum);
	if (div) {		
		nHtml.LoopByXPath(topDiv,".//div[starts-with(@id,'ac_div_')]",function(tab) {
			tab.style.display = 'none';
		});
		nHtml.LoopByXPath(topDiv,".//span[starts-with(@id,'ac_tab_')]",function(tab) {
			tab.style.color = 'blue';
			tab.style.cursor = 'pointer';
		});
		div.style.display = 'block';
		var tab = document.getElementById('ac_tab_' + idNum);
		if (tab) {
			tab.style.color = 'black';
			tab.style.cursor = 'default';
		}
		var ctn = nHtml.FindByXPath(topDiv,".//span[@id='ac_curtabname']")
		if (ctn) {
			ctn.innerHTML = tab.innerHTML;
		}
	} else {
		GM.log("Can't find " + 'ac_div_' + idNum);
	}
},

// given a div, auto-adds listeners to all inputs that being with ac_
// if you want default_false, then do ac_f_
// inputs cannot have an "_" in the name

AddListeners:function(topDivName) {
	var topDiv;
	if(!(topDiv = document.getElementById(topDivName))) return false;
	
	nHtml.LoopByXPath(topDiv,".//input[starts-with(@id,'ac_')] | .//textarea[starts-with(@id,'ac_')]",function(inputDiv) {
		var def = inputDiv.id.match(/ac_(.*)_.*/);
		if (def) def = def[1];
		var idName = inputDiv.id.replace(/^.*_/,'')
		//GM.log(' id ' + inputDiv.id + ' def '+ def +' type ' + inputDiv.type + ' tagName ' + inputDiv.tagName);
		if (inputDiv.type=='checkbox') {
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/^.*_/,'')
				GM.setGValue(idName,e.target.checked);
				//GM.log("Just set " + idName);
			},false);
			inputDiv.checked = GM.getGValue(idName,def ? true : false);
		} else if (inputDiv.type=='text' || inputDiv.nodeName=='TEXTAREA') {
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/^.*_/,'')
				GM.setGValue(idName,e.target.value);
				//GM.log("Just set " + idName);
			},false);
			inputDiv.value = GM.getGValue(idName,'');
		}
	});
	nHtml.LoopByXPath(topDiv,".//span[starts-with(@id,'ac_')]",function(span) {
		var m = span.id.match(/ac_(.*)_([0-9]*)/);
		if (m) {
			var nam = m[1];
			var num = m[2];
			if (nam == 'tab') {
				//GM.debug("spanac" +  name + ' ' + num);
				span.addEventListener('click',function(e) {
					var idNum = e.target.id.replace(/^.*_/,'');
					Player.ShowTab(topDivName,idNum);
				},false);
			}
		}
	});
},

/////////////////////////////////////////////////////////////////////

//							GET STATS

// Functions that records all of base game stats, energy, stamina, etc.

/////////////////////////////////////////////////////////////////////

GetStats:function() {
	var rd=nHtml.FindByAttr(document.body, 'div', 'class', 'resourcedata');
	if (!rd) {
		GM.log("Resource data not found");
		var eTime = GM.getGValue("ErrorTime",0);
		if (eTime == 0)
			GM.setGValue("ErrorTime", (new Date().getTime()));
		if ((eTime > 0) && (eTime < (new Date().getTime())-(1000*60*15))) {
			GM.log('Waiting too long for stats');
			Player.ReloadNow();
		}
		return false;
	}
	GM.setGValue("ErrorTime",0);

	var ci=nHtml.FindByAttr(document.body, 'div', 'class', 'city');
	
	this.stats = {};
	
	this.statsLine = '';
	var list = ['gold', 'food', 'wood', 'stone', 'ore'];
	for (var i in list) {
		var r = list[i];

		this.stats[r] = {};
		if (ci) {
			var el = nHtml.FindByAttrContains(ci, "font", "id", r);
			if (el)
				this.stats[r].inc = parseInt(nHtml.GetText(el).trim());
			else 
				GM.log("Font id " + r + " not found in city (inc)");
		}
		
		var el = nHtml.FindByAttrContains(rd, "span", "id", r + '_now');
		if (el)
			this.stats[r].cur = parseInt(nHtml.GetText(el).trim());
		else 
			GM.log("Span id " + r + "_now not found");

		// GM.debug("El found + " + l + " " + nHtml.GetText(el).trim());
		
		var el = nHtml.FindByAttrContains(rd, "span", "id", r + '_max');
		if (el)
			this.stats[r].max = parseInt(nHtml.GetText(el).trim());
		else
			GM.log("Span id " + r + "_max not found");
			
		var l = r;
                if (r=='gold') l = 'gold';
		if (r=='food') l = 'food';
		if (r=='wood') l = 'wood';
		if (r=='stone') l = 'stone';
                if (r=='ore') l = 'ore';
		this.stats[l] = this.stats[r];
		
		this.statsLine = this.statsLine + l.substr(0,1) + ': ' + this.stats[r].cur + '/' + this.stats[r].max + '+' + this.stats[r].inc + ' ';
	}
	//GM.log(this.statsLine);
	
	return this.stats.gold.cur > 0 ||return this.stats.food.cur > 0 || return this.stats.wood.cur > 0 || return this.stats.stone.cur > 0 || return this.stats.ore.cur > 0 ;
},

waitMilliSecs:5000,

/////////////////////////////////////////////////////////////////////

//							MAIN LOOP

// This function repeats continously.  In principle, functions should only make one
// click before returning back here.

/////////////////////////////////////////////////////////////////////


MainLoop:function() {
	var ok = this.GetStats();
	this.SetControls();

	if (GM.getGValue('PlayerPaused','') != '') {
		this.WaitMainLoop();
		return;
	}

	if (!ok) {
		GM.log("Wait for stats.");
		GM.debug("Debug mode is ON");
		this.WaitMainLoop();
		return;
	}


/	if (GM.getGValue("WaitForCaptcha",'') == '') {
/		var img = nHtml.FindByAttr(document.body, "img", "id", 'validate_img');
/		if (img && nHtml.IsVisible(img)) {
/			// todo ... try to ocr it?
/			if (this.WhileSinceDidIt("ClickCaptchaOK",60*5)) {
/				var el;
/				if (el = document.getElementById('AutoPauseLink')) {
/					GM.setGValue("WaitForCaptcha", true);
/					el.innerHTML = 'Captcha OK';
/				}
/			}
/			GM.log("Wait for captcha");
/			this.WaitMainLoop();
/			return;
/		}
/	}
/	
	var citylist = new Array;
	var nCit = 0;
	var selCity = 0;
	nHtml.LoopByXPath(document.body,".//ul[@id='listallcity']//a",function(el){
		//GM.log("classname is " + el.className + " nCit is " + nCit);
		citylist.push(el);
		if (el.className.match(/now/i)) {
			//GM.log("match nCit is " + nCit);
			selCity=nCit;
		}
		++nCit;
	});
	
	//GM.log("Selcity is " + selCity);
	
	// change GM prefix for city selection
	GM.lprefix = tk_server + '.' + selCity + '.';
	
	// log & close system notices
	var pop = nHtml.FindByAttr(document.body, "div", "class", 'dialog_header');
	if (nHtml.IsVisible(pop)) {
		var title = nHtml.FindByXPath(pop, ".//h3");
		var msg = nHtml.FindByXPath(document.body, ".//div[@id='dialog']//h4");
		if (title) title=nHtml.GetText(title).trim();
		if (msg) msg=nHtml.GetText(msg).trim().toLowerCase();
		if (title && title.match(/(system notice)|(special event)/i) && !msg.match(/this will cost you.*gold/i)) {
			var bclose = nHtml.FindByXPath(document.body, ".//div[@id='dialog']//div[@class='dialogbtn']//a[@class='submitbtn']");
			if (!bclose) {
				GM.debug("No submit button");
				bclose = nHtml.FindByAttr(pop, "a", "class", "closewindow");
			}
			if (bclose) {
				GM.log("Close pop " + title + " : " + msg);
				GM.setLValue("PopWasClosed", title + " : " + msg);
				this.Click(bclose);
				this.WaitMainLoop();
				return;
			}
		}
	}

	//GM.log("Main loop");
	
	var did = false;
	if (!did) did = this.MainHeroStats();
	if (nCit <= 1 || selCity>=(nCit-1)) {
		// do these in most recent for most benefit
		if (!did) did = this.MainDailyStipend();
		if (!did) did = this.MainDailyHero();
	}
	if (selCity == 0) {
		if (GM.getGValue("WaitForCaptcha",'') == '') {
			// only try faction quests with main city
			if (!did) did = this.MainFaction();
		}
	}
	//if (!did) did = this.MainPlunder();
	if (GM.getGValue("WaitForCaptcha",'') == '') {
		if (!did) did = this.MainCamp();
	}
	if (!did) did = this.MainTrial();
	if (!did) did = this.MainBuild();
	if (!did) did = this.MainRecruit();

	if (!did) 
		did = this.CloseFloat();

	// change GM prefix to server-wide
	GM.prefix = tk_server + '.';
	
	if (!did) {
		if (nCit > 1) {
			if (this.WhileSinceDidIt("CitySwitch",60)) {
				selCity=selCity+1;
				if (selCity >= nCit) 
					selCity=0;
				GM.debug("City switch to " + selCity + " " + nHtml.GetText(citylist[selCity]).trim());
				this.Click(citylist[selCity]);
				did = true;
				this.JustDidIt("CitySwitch");
			}
		}
	}
	
	this.WaitMainLoop(); 
	return;
},
CloseFloat:function () {
	// close all pops
	var ext = arguments.callee ? (" called from " + arguments.callee.caller.name) : '';
	var clicked = false;
	
	nHtml.LoopByXPath(document.body, ".//div[@id='dialog']//a[@class='closewindow']", function (bclose) {
		if (nHtml.IsVisible(bclose)) {
			if (bclose.parentNode)
				GM.debug("Closing dialog " + nHtml.GetText(bclose.parentNode).trim() + ext);
			nHtml.Click(bclose);
			clicked = true;
			return true;
		}
	});
	if (clicked) return true;
	
	nHtml.LoopByXPath(document.body, ".//div[contains(@id,'floatblock')]//a[@class='closewindow']", function (bclose) {
		if (nHtml.IsVisible(bclose)) {
			if (bclose.parentNode)
				GM.debug("Closing floatblock " + nHtml.GetText(bclose.parentNode).trim() + ext);
			nHtml.Click(bclose);
			clicked = true;
			return true;
		}
	});
	return clicked;
},

MainCamp:function() {
	if (!GM.getGValue('EnableLootCamp',true)) 
		return false;

	var fmb = nHtml.FindByXPath(document.body,".//div[@id='floatblockleft']");
	var fmh = nHtml.FindByTag(fmb,"h2");
	var popName = '';
	if (fmh)
		popName = nHtml.GetText(fmh).trim();
	if (fmb && !fmh) {
		//GM.log("No header in fmb, usually OK");
	}

	if (!this.WhileSinceDidIt("AutoLootCamp",600)) return false; 
	if (!this.HeroClick()) {
		GM.debug("No knight in city"); 
		this.JustDidIt("AutoLootCamp");
		return false;
	}

	var hero = nHtml.FindByAttr(document.body, "select", "id", "self_gid");	
	var selectedHero = '';
	if (hero) {
		if (!this.heroStats)
			GM.log("ERROR: why no stats?");
		
		if (hero.options.length <= 1) {
			GM.log("All knight are busy, no camp attacks");
			this.JustDidIt("AutoLootCamp");
			return this.CloseFloat();
		}
		
		var pref = GM.getGValue("PreferHero",'').trim().toLowerCase();
		for (var i in hero.options) {
			if (i == 0) continue;
			
			var name = hero.options[i].text.trim().toLowerCase();
			//GM.log("NAME " + name);
			
			if (this.heroStats && this.heroStats[name] && this.heroStats[name].stamina > 20) {
				hero.options[i].selected = true;
				if (pref != '' && (name.indexOf(pref) >= 0 || pref.indexOf(name) >= 0))
					break;
				else if (pref == '')
					break;
			}
			
			if (this.heroStats && !this.heroStats[name])
				GM.log("ERROR: why not stats for " + name);
		}

		selectedHero = hero.options[hero.selectedIndex].text.trim().toLowerCase();
		if (this.heroStats && this.heroStats[selectedHero]) {
			if (this.heroStats[selectedHero].stamina < 20) {
				GM.log("Can't loot, stamina for " + selectedHero + " is " + this.heroStats[selectedHero].stamina);
				this.JustDidIt("AutoLootCamp");
				return this.CloseFloat();
			}
		} else {
			GM.log("No stats! for " + selectedHero);
			GM.setLValue("AutoHeroStats",0);
		}
	}

	if (popName && (popName == GM.getLValue("CampFacLast",''))) {
		var lev_max;
		var title_max;
		var el_max;		
		nHtml.LoopByXPath(fmb,".//map/area",function(el) {
			var title=el.getAttribute('sgtitle');
			if (!title)
				return;
				
			var level = title.match(/Level(\d+)/i);
			if (!level) {
				//GM.log("No level for area " + title);
				return;
			}
			
			level=level[1];
			if (this.heroStats && (level*.97) > this.heroStats[selectedHero].level)
				return;

			if (level < lev_max)
				return;

			title_max=title;
			lev_max=level;
			el_max=el;
		});

		this.JustDidIt("AutoLootCamp");
		
		if (!el_max) {
			GM.log("Can't find knight to attack");
			GM.setLValue('NeedHeroLevel', true);
			return this.CloseFloat();
		}

		GM.log("Click on general " + popName + " " + title_max);
		this.Click(el_max);
		return true;
	}

	if (popName == 'Faction Map') {
		var cit = [];
		GM.log("Found faction map header");
		nHtml.LoopByXPath(fmb,".//span[starts-with(@id,'influence_')]/a",function(el) {
			var facName=nHtml.GetText(el).trim();
			if (GM.getLValue("CampFacLast",'') != el.facName)
				cit.push(el);
		});
		
		if (cit.length == 0) {
			GM.log("No faction cities?");
			return false;
		}
		
		rcit = (Math.random()*cit.length);
		//GM.log("rcit1 is " + rcit);
		rcit = 0|rcit;
		//GM.log("rcit2 is " + rcit);
		var el = cit[rcit];
		
		var facName=nHtml.GetText(el).trim();
		GM.setLValue("CampFacLast", facName);
		this.Click(el);
		
		return true;
	}
	
	if (popName) {
		GM.log("Loot pop name is " + popName);
	}

	var fm = nHtml.FindByXPath(document.body,".//div[@id='floatbutton']//img[contains(@sgtitle,'Faction Map')]");
	if (!fm) {
		GM.log("Can't find faction map");
		this.JustDidIt("AutoLootCamp");
		return this.CloseFloat();
	}
	
	GM.debug("Click on faction map");
	this.Click(fm);
	return true;
}
,
MainPlunder:function() {
	if (GM.getGValue('PlunderCoordinates','').trim()=='') 
		return false;

	if (!this.WhileSinceDidIt("AutoPlunder",60*10)) 
		return false;
		
	if (!this.HeroClick()) {
		return false;
	}
}
,

MainFaction:function() {
	if (!GM.getGValue('EnableFactionQuests',true)) 
		return false;

	if (!this.WhileSinceDidIt("AutoFactionQuest",600)) return false;
	if (!this.HeroClick()) {
		GM.debug("No heroes for faction quest"); 
		this.JustDidIt("AutoFactionQuest");
		return false;
	}

	if (GM.getLValue('PopWasClosed','').match(/level is too low/i)) {
		GM.debug("Level too low");
		GM.setLValue('QuestFollowName', '');
		GM.setLValue('PopWasClosed','');
		return this.CloseFloat();
	}

	// the name of the quest i followed
	var questFollowName=GM.getLValue('QuestFollowName');
	var questActionName=GM.getLValue("QuestActionName");

	// solf
	var solf = nHtml.FindByXPath(document.body, ".//form[@id='soldierf']//a[contains(@href,'village.detail')]");
	var solfName;
	
	if (solf) solfName = nHtml.GetText(solf).trim().toLowerCase();

	if (solf && solfName && solfName.indexOf(questFollowName)>=0) {
		var s2 = nHtml.FindByXPath(document.body, ".//div[@id='school_2']");
		var wb = nHtml.FindByAttr(s2, "a", "class", "submitbtn");
		if (!wb) {
			GM.log("Solf fail " + solfName);
			return false;
		}
		GM.log("Solf war start " + solfName);
		this.Click(wb);
		return true;
	}

	if (solf) {
		GM.log("Not my solf " + solfName);
	}
	
	// the thing i'm aiming for (battle wise)
	var aim = nHtml.FindByXPath(document.body, ".//input[@id='aim_name']");
	var aimName;
	if (aim) 
		aimName = String(aim.value).trim().toLowerCase();	

	if (aim && GM.getLValue('PopWasClosed','').match(/too few soldiers/i)) {
		GM.setLValue('PopWasClosed','');
		GM.setLValue("NeedMoreSoldiers", questActionName);
		aimName = '';	// skip next section
		GM.log("Need more soldiers for " + questActionName);
	}
	
        if (aimName && (aimName == questFollowName)) {
		//GM.log("solf is " + aim.form.id);
		var s = new Array;
		var sHv = new Array;
		for (i = 0; i <= 9; ++i) {
			s[i] = nHtml.FindByAttr(aim.form, "input", "id", "soldier"+i);
			var sH = nHtml.FindByAttr(aim.form, "a", "id", "soldier_link" + i);
			sHv[i] = 0;
			if (sH) 
				sHv[i] = parseInt(nHtml.GetText(sH).trim().replace(/[()]/,'')); 
		}
				
		GM.debug("Militia/swordsman is " + sHv[0] + " Scout is " + sHv[9]);
		
		// for scouting, use s9 ... the scouts only
		// for other, use anyone, in order
		
		var isScout = questActionName.match(/scout/);
		
		var nS = nHtml.FindByAttr(aim.form, "input", "id", "uit_condition_soldier_num");
		if (nS) 
			nS = parseInt(nS.value);
		
		var starti = isScout?9:0;
		
		GM.debug("nS is " + nS + " s[si]: " + s[starti] + " sHv[si]: " + sHv[starti]);
		if (s[starti] && (sHv[starti]>10)) {
			var tot=0;
			if (nS > 0) {
				// know how many? send that
				for (var i=starti;i<=9;++i) {
					if (tot>=nS) 
						break;

					if (sHv[i] > (nS-tot))
						s[i].value = (nS-tot);
					else if (sHv[i] > 0)
						s[i].value = sHv[i];

					tot+=parseInt(s[i].value);
				}
			} else {
				// else, just be lazy and send everyone
				for (var i=starti;i<=9;++i) {
					s[i].value = sHv[i];
					tot+=parseInt(s[i].value);
				}
				// but log it
				GM.log("Don't know how many to send, fix code!");
			}			
			GM.log("Aim war start " + aimName + " with " + tot);
			var wb = nHtml.FindByXPath(document.body, ".//a[contains(@onclick,'warStart')]");
			this.Click(wb);
			return true;
		} else {
			if (!s[starti]) {
				GM.log("Error: no s[" + starti + "] on aim Form.");
				return false;
			} else {
				GM.log("Not enough troops to " + questActionName + " " + aimName);
				if (sHv[starti]>10) 
					GM.setLValue('NeedMoreSoldiers',questActionName);
			}
		}
	} else {
		if (aimName) {
			GM.log("Aiming for " + aimName + " but doesn't match " + questFollowName);
		}
	}

	// is there a quest action?
	var action = nHtml.FindByXPath(document.body, ".//div[@class='junying_right']//a[contains(@onclick,'startITask')]");
	if (action) {
		var hero = nHtml.FindByAttr(document.body, "select", "id", "self_gid");
		if (hero.options.length > 1) {
			var pref = GM.getGValue("PreferHero",'').trim().toLowerCase();
			if (pref != '') {
				for (var i in hero.options) {
					if (hero.options[i].text.toLowerCase().indexOf(pref) >= 0 || pref.indexOf(hero.options[i].text.toLowerCase())>=0) {
						hero.options[i].selected = true;
						GM.log("Using hero " + hero.options[i].text);
						break;
					}
				}
			}
			var aName = nHtml.GetText(action).trim().toLowerCase();
			GM.log("Click action " + questFollowName + " : " + aName);
			GM.setLValue("QuestActionName", aName);
			this.Click(action);
			return true;
		} else {
			GM.log("No heroes left for quests");
			this.JustDidIt("AutoFactionQuest");
			return this.CloseFloat();
		}
	}

        if (this.Goto('quest')) return true;
        if (!this.navOK) return false;

	var sw=nHtml.FindByAttr(document.body, "div", "id", 'floatblockcenter');
	var ul=nHtml.FindByAttrContains(sw, "ul", "class", "subnav");
	var fb=nHtml.FindByAttrContains(ul, "a", "onclick", "InfluenceTask");

        if (!fb) {
		GM.log("No faction click?");
		return false;
	}
	
        if (fb.parentNode.className != 'now') {
		GM.log("Faction click");
		this.Click(fb);
		return true;
	}
	
	var ul=nHtml.FindByAttrContains(sw, "ul","id","taskTypeListAll");
	var fac;
	var facName;
	var questCheckList = GM.getLValue('QuestCheckList','');
	
	nHtml.LoopByXPath(ul, ".//li/a",function(el){
		var n=nHtml.GetText(el);
		n = n.trim().toLowerCase();
		if (questCheckList.indexOf(n) < 0) {
			if (!fac || (nHtml.InCList(GM.getGValue('PreferFaction',''),n) >= 0)) {
				fac = el;
				facName = n;
			}
		}
	});
	
	if (!fac) {
		// all followed
		GM.log("No facs left");
		this.JustDidIt("AutoFactionQuest");
		GM.setLValue('QuestCheckList', '');
		return this.CloseFloat();
	}
	
	if (fac.parentNode.className != 'now') {
		GM.debug("Selecting " + facName);
		this.Click(fac);
		return true;
	}
	
	GM.debug("Selected " + facName);

	var questSubCheckList = GM.getLValue('QuestSubCheckList','');

	var sub;
	var subName;	
	var ul=nHtml.FindByAttrContains(sw, "ul","id","taskListAll");
	nHtml.LoopByXPath(ul, ".//li/a",function(el){
		var n=nHtml.GetText(el);
		n = n.trim().toLowerCase();
		if (questSubCheckList.indexOf(n) < 0) {
				sub = el;
				subName = n;
				return 'break';
		}
	});

	if (!sub) {
		GM.setLValue('QuestCheckList', questCheckList + ',' + facName);
		GM.setLValue('QuestSubCheckList', '');
		return true;
	}
	
	if (sub.parentNode.className != 'now') {
		GM.log("Selecting sub " + subName);
		this.Click(sub);
		return true;
	}

	GM.log("Selected sub " + subName);

	GM.setLValue('QuestSubCheckList', questSubCheckList + ',' + subName);

	var notstart = nHtml.FindByXPath(sw, ".//li[contains(text(),'not started')]");
	if (notstart) {
		var action = nHtml.FindByXPath(sw, ".//ul[@class='taskcontent']//strong[@class='tips_green']/parent::a");	
		if (!action) {
			GM.log("Can't find tips_green under " + facName + " quest");
			return false;
		}
		var aName = nHtml.GetText(action).trim().toLowerCase();
		GM.setLValue('QuestFollowName', aName);
		GM.log("Following quest for " + aName);	
		this.Click(action);
		return true;
	} else {
		GM.debug("Already done " + facName + ':' + subName);
	}
	return true;
},
MainRecruit:function() {
	if (!GM.getGValue('EnableRecruit',true)) 
		return false;

	if (GM.getLValue('NeedMoreSoldiers','')=='')
		return false;
	
	if (!this.WhileSinceDidIt('Recruit_'+name,60*15))
		return false;

	var pref = GM.getGValue('PreferRecruit', '').toLowerCase().trim();

	if (GM.getLValue('NeedMoreSoldiers','').indexOf('scout')>=0) {
		pref='scout';
	}

	if (this.needFood)
		return false;
	
	if (pref.indexOf('scout')>=0 || pref.indexOf('crossbowman')>=0) {
		if (this.PickArea('city', 'scout camp'))
			return true;		
		if (!this.navOK) {
			GM.debug("No scout camp");
			Player.JustDidIt('Recruit_'+name);
			return false;
		}
	} else if (pref.indexOf('lance')>=0) {
		if (this.PickArea('city', 'stable'))
			return true;		
		if (!this.navOK) {
			GM.debug("No stable");
			Player.JustDidIt('Recruit_'+name);
			return false;
		}
	} else {
		if (this.PickArea('city', 'barracks'))
			return true;		

		if (!this.navOK) {
			GM.debug("No barracks");
			Player.JustDidIt('Recruit_'+name);
			return false;
		}
	}
	
	GM.debug("Recruiting " + pref);
	
	var sw = nHtml.FindByAttr(this.currentPop, 'div', 'class', 'subwindow_right');
	var con = nHtml.FindByAttr(sw, 'div', 'class', 'construct');
	var okdid = false;
	nHtml.LoopByXPath(sw, ".//div[@class='construct']//ul/li",function(li){
		var info = nHtml.FindByXPath(li, ".//div[@class='infoshow']");
		if (info) {
			var name=nHtml.GetText(info);
			name=name.replace(/\s+now:.*/i,'').trim().toLowerCase();
			name=name.replace(/\s+requirement:.*/i,'');
			if ((pref=='') || name.indexOf(pref) >= 0) {
				//GM.debug("Recruit name is " + name + " pref is " + pref);
				var avail=nHtml.GetText(info);
				avail=avail.replace(/.*available to recruit\s*[:()\s]*/i,'');
				//GM.debug("avail is " + avail);
				avail=parseInt(avail);
				var but = nHtml.FindByXPath(li, ".//a[contains(@onlick,'raiseSoldierStart')]");
				if (!but)
					but = nHtml.FindByXPath(li, ".//a[@sgtitle='Recruit']");
				var inp = nHtml.FindByXPath(li, ".//input[@type='text']");
				// GM.log("Name: " + name + " Avail: " + avail + " But: " + but + " In: " + inp);
				if (inp && avail>1 && but) {
					GM.log("Recruit " + 0|(avail/2) + " " + name);
					inp.value=0|(avail/2);
					Player.Click(but);
					GM.setLValue('NeedMoreSoldiers','');
					okdid = true;
				} else {
					GM.log("Can't recruit " + name + " avail " + avail);
				}
				// for pref = '' ... keep looping for cheapest?  or recrut militia/swordsman?
				return 'break';
			}
		}
	});

	this.JustDidIt('Recruit_'+name);
	if (!okdid) 
		GM.log("Can't recruit " + name);
	return okdid;
},
MinCityLev:function(list, prior) {
	var minL = 10000;
	var minN = '';
	if (prior) {
		var lev = this.cityStats[prior];
		if (lev>0) 
			minL = lev-1;
	}
	for (var i in list) {
		var name = list[i];
		var lev = this.cityStats[name];
		if (name == 'tower' || name == 'city wall') {
			//GM.debug(name + " LEVEL " + lev);
		}
		if (lev != undefined) {
			//GM.debug(name + " LEVEL DEF " + lev);
			if (lev < minL) {
				minN = name;
				minL = lev;
			}
		}
	}
	return minN;
},
MainBuild:function() {
	if (!GM.getGValue('EnableBuild',true)) 
		return false;

	// get current building list
	var iq=nHtml.FindByAttr(document.body, "div", "id", 'indexqueue');
	var ci=iq ? nHtml.FindByAttr(iq, "div", "class", 'constructinfo') : iq;
	if (ci) {
		var blist = '';
		if (ci) {
			nHtml.LoopByXPath(ci, ".//li", function (li) {
				var b = nHtml.GetText(li).trim();
				var t = b.match(/(.*)\t/);
				if (t) b = t[1].trim();
				if (b.match(/Lv\.\d/i)) {
					blist = blist + "," + b;
				}
			});
		}
		//GM.log("blist: " + blist);
		this.buildingList = blist.substr(1);

		// if in city and no building list... do it now
		if (this.buildingList == '')
			GM.setLValue('AutoCheckBuild',0);
	} else {
		GM.debug("Can't find constructinfo!");
	}

	//GM.debug("Build list is " + this.buildingList);

	if (!this.WhileSinceDidIt('AutoCheckBuild',60))
		return false;

	if (!ci || this.buildingList != '') {
		this.JustDidIt("AutoCheckBuild");
		return false;
	}	
	
	this.needFood = this.stats.crop.inc < this.stats.crop.max*.005;
	
	var did = false;
	
	//GM.debug("1. Need food " + this.needFood + " did " + did);	
	if (this.WhileSinceDidIt('AutoResource',300)) {
		if (this.needFood) {
			GM.log('Food is low try build farmland');
			did = this.Build('resource', 'farmland');
		} else {
			if (!did && this.stats.clay.inc < (this.stats.lumber.inc*.90) && this.stats.clay.inc < this.stats.iron.inc)
				did = this.Build('resource', 'stone mine');

			if (!did && this.stats.iron.inc < (this.stats.lumber.inc*.90))
				did = this.Build('resource', 'iron mine');

			if (!did)
				did = this.Build('resource', 'timberland');			
		}
		if (!did) 
			this.JustDidIt('AutoResource');
	}

	//GM.debug("2. Need food " + this.needFood + " did " + did);	
	if (!did && this.WhileSinceDidIt('AutoCity',600)) {
		if ( !this.needFood ) {
			GM.debug("3. Need food " + this.needFood + " did " + did);	

			// priority mansion or annex, but don't create them
			if (!did) did = this.Build('city', 'mansion', 'nocreate');
			if (!did) did = this.Build('city', 'annex', 'nocreate');

			if (!did) {
				// nav to city to be sure citystats is set
				if (this.PickArea('city')) return true;
				if (!this.navOK) return false;

				GM.log("CS: " + this.cityStats);

				// ok to create these				
				var minC = this.MinCityLev(['barracks', 'weaponsmith', 'drill ground', 'Kingdoms of Kingdom Auto Barber
By eric b. — 

    
Add Syntax Highlighting (this will take a few seconds, probably freezing your browser while it works)

// ==UserScript==
// @name           knights of camelot
// @namespace      erik
// @description    Auto player for knights of camelot game
// @include        
// @version	   1
// ==/UserScript==

if(!GM_log) {
	GM_log=console.debug;
}

var thisVersion = 1;
var debug=false;
var newVersionAvailable=0;

if (parseInt(GM_getValue('SUC_remote_version',0)) > thisVersion) {
	newVersionAvailable=1;
}

;;// update script from: http://userscripts.org/scripts/reviews/69420
;;var SUC_script_num = 65460;
;;try{ function updateCheck(forced) {
;;	if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*1) <= (new Date().getTime()))) {
;;		try {
;			GM_xmlhttpRequest({
;				method: 'GET',
;				url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
;				headers: {'Cache-Control': 'no-cache'},
;				onload: function(resp){
;					var remote_version, rt, script_name;
;					rt=resp.responseText;
;					GM_setValue('SUC_last_update', new Date().getTime()+'');
;					remote_version=parseInt(/@version\s*(.*?)\s*$/m.exec(rt)[1]);
;					script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
;					GM_setValue('SUC_target_script_name', script_name);
;					GM_setValue('SUC_remote_version', remote_version);
;					GM_log('remote version ' + remote_version);
;					if (remote_version > thisVersion) {
;						newVersionAvailable=1;
;						if (forced) {
;							if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
;								GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
;							}
;						}
;					} else if (forced) alert('No update is available for "'+script_name+'."');
;				}
;			})
;		}catch (err) {
;			if (forced) alert('An error occurred while checking for updates:\n'+err);
;		}
;	}
;     }
;     GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});
;     updateCheck(false);
;} catch(err) {}

window.addEventListener("load", function(e) {
	nHtml.clearTimeouts();
	Player.ReloadOccasionally();
	Player.MainLoop();
},false);

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }


/////////////////////////////////////////////////////////////////////
//							HTML TOOLS
// this object contains optionally prefix'ed GM_ replacements
// useful if possible to play multiple servers, worlds, games, etc.
/////////////////////////////////////////////////////////////////////

var GM={
setLValue:function(k, v) {
	GM_setValue(this.lprefix + k, v)
},
getLValue:function(k, d) {
	return GM_getValue(this.lprefix + k, d)
},
setGValue:function(k, v) {
	GM_setValue(this.gprefix + k, v)
},
getGValue:function(k, d) {
	return GM_getValue(this.gprefix + k, d)
},
log:function(m) {
	GM_log(this.lprefix + m)
},
debug:function(m) {
	if (this.getGValue('DebugMode'))
		GM_log(this.lprefix + m);
},
gprefix:'',
lprefix:''
};

var tk_server = String(window.location.hostname).match(/\d+/);
if (tk_server) {
	tk_server=parseInt(tk_server);
	GM.gprefix = GM.lprefix = tk_server + '.';
}

/////////////////////////////////////////////////////////////////////
//							HTML TOOLS
// this object contains general methods for wading through the DOM and dealing with HTML
/////////////////////////////////////////////////////////////////////

var nHtml={
InCList:function(clist, n) {
// returns i>=0 if n starts with the text in one of the comma-delimited entries in clist
// case and whitespace insensitive search
// return -1 if no match
	if (!clist || clist=='') return -1;

	n=n.trim().toLowerCase();
	if (!n || n=='') return -1;
	
	var list = clist.split(',');
	for(var index in list) {
		var e=list[index].trim().toLowerCase();
		if (e=='') next;
		if (n.indexOf(e)==0) return index;
	}
	return -1;
},
Dump:function(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
},
FindByAttrContains:function(obj,tag,attr,className) {
	var pre='@';
	className=className.toLowerCase();
	if(attr=="className") { attr="class"; }
	if(attr=="text()") { pre=''; }
	try {
		var q=document.evaluate(".//"+tag+
			"[contains(translate("+pre+attr+",'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"+className+
			"')]",obj,null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch (err) {
		GM.log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByAttrXPath:function(obj,tag,className) {
	var q=null;
	try {
		var xpath=".//"+tag+"["+className+"]";
		if(obj==null) {
			GM.log('Trying to find xpath with null obj:'+xpath);
			return null;
		}
		q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		GM.log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
LoopByXPath:function(obj,xpath,snapFunc) {
	var ss;
	try {
		ss=document.evaluate(xpath,obj,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	} catch(err) {
		GM.log("XPath Failed:"+xpath+","+err);
	}
	if (ss) {
	for(var s=0; s<ss.snapshotLength; s++) {
		if (snapFunc(ss.snapshotItem(s)) == 'break') {
			break;
		}
	}
	} else {
		GM.log("XPath didn't find anything:"+xpath);
	}
},
FindByXPath:function(obj,xpath) {
	var q=null;
	try {
		if(obj==null) {
			GM.log('Trying to find xpath with null obj:'+xpath);
			return null;
		}
		q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		GM.log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByAttr:function(obj,tag,attr,className) {
	if(className.exec==undefined) {
		if(attr=="className") { attr="class"; }
		try {
			var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
			if(q && q.singleNodeValue) { return q.singleNodeValue; }
		} catch (err) {
			GM.log("XPath Failed:"+xpath+","+err);
		}
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
FindByTag:function(obj,tag) {
	try {
		var q=document.evaluate(".//"+tag,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		GM.log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByClassName:function(obj,tag,className) {
	return this.FindByAttr(obj,tag,"className",className);
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
		if (!obj.getAttribute('onclick')) {
			if (obj.href && obj.href.match(/^javascript:/)) {
				var code = obj.href.substr(11);
				if (code.indexOf('void(0)') < 0) {
					//GM.debug("Changing " + obj.getAttribute('onclick') + " to " + obj.href.substr(11));
					obj.setAttribute('onclick', unescape(obj.href.substr(11)));
				}
			}
		}
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
IsVisible:function(n) {
	return n && n.visibility!='hidden' && n.style.display!='none' && (!n.parentNode || n.parentNode.tagName=='BODY' || this.IsVisible(n.parentNode));
}
};

/////////////////////////////////////////////////////////////////////

//							Player OBJECT

// this is the main object for the game, containing all methods, globals, etc.

/////////////////////////////////////////////////////////////////////

Player={

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
	return (!GM.getLValue(name) || (parseInt(GM.getLValue(name)) < (now-1000*seconds)));
},
JustDidIt:function(name) {
	var now = (new Date().getTime());
	GM.setLValue(name, now.toString());
},
PushDidIt:function(name, seconds) {
	var v=parseInt(GM.getLValue(name,0))+(seconds*1000);
	GM.setLValue(name, v.toString());
},
// slowly, after a randomized time visit a url
VisitUrl:function(href) {
	this.waitMilliSecs=4000+Math.random()*2000;
	nHtml.VisitUrl(href);
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
AddControls:function() {
	// sets up divs and input boxes for controls
	
	if(document.getElementById('AutoPlayer_controls')) {
		return true;
	}
	
	var mn=this.GetMainNav();
	if (mn) {
		var linkStyle = 'background:#fff; border: 2px solid #444; font-weight: bold; padding: 1px';

		var addLink=document.createElement('span');
		addLink.setAttribute('style',linkStyle);
		addLink.id='AutoPauseLink';
		addLink.innerHTML=(GM.getGValue('PlayerPaused','') == '') ? 'Pause' : 'Resume';
		if (GM.getGValue('WaitForCaptcha','') != '') {
			addLink.innerHTML='Captcha OK';
		}
	        addLink.addEventListener('click',function(e) {
			if (GM.getGValue('WaitForCaptcha','') != '') {
				GM.setGValue('PlayerPaused','true');
				GM.setGValue('WaitForCaptcha','');
				Player.JustDidIt("ClickCaptchaOK");
			}
			if (GM.getGValue('PlayerPaused','') == '') {
				this.innerHTML='Resume';
				GM.setGValue('PlayerPaused','true');
			} else {
				this.innerHTML='Pause';
				GM.setGValue('PlayerPaused','');
				if (GM.getGValue('DebugMode')) {
					//GM.setGValue('0.AutoFactionQuest',0);
					//GM.setGValue('0.QuestCheckList','');
				}
			}
		},false);
		mn.insertBefore(addLink,mn.childNodes[0]);

		var addLink=document.createElement('span');
		addLink.setAttribute('style',linkStyle);
		addLink.innerHTML='Settings';
	        addLink.addEventListener('click',function(e) {
			var div = document.getElementById('AutoPlayer_controls');
			if (div) {
				if (div.style.display == 'block') {
					div.style.display = 'none';
				} else {
					div.style.display = 'block';
				}
			} else {
				GM.log("No AutoPlayer_controls");
			}
		},false);
		mn.insertBefore(addLink,mn.childNodes[0]);
	} else {
		GM.log("No main nav, can't add links");
		return false;
	}

	var div=document.createElement('div');
	
	div.id='AutoPlayer_controls';	
	div.setAttribute('style','padding:5px; border:2px solid #444; background:#fff; color: #000; position: absolute; left:15%; top: 90px; display: none; z-index: 90000');	


	div.innerHTML = "\
		<style type='text/css'>label, .check1 {text-align: left; float: left; width: 10em;} .tablink {cursor: pointer; color: blue; border: 1px solid black; padding: 1px}</style>\
		<h3 style='text-align:center; padding:0; margin:0;'>Kingdom of camelot : <span id=ac_curtabname>General</span> Options</h3>\
		<p style='text-align:left'>\
		<span class=tablink style='color:black; cursor: default;' id=ac_tab_1>General</span> \
		<span class=tablink id=ac_tab_2>Farm</span></p>\
		<div id=ac_div_1 style='margin:0; text-align:left;'>\
		<span class=check1><input type=checkbox id='ac_1_EnableBuild'3> Build- coming soon</span> \
		<input type=checkbox id='ac_1_EnableFactionQuests'> Quests - coming soon<br />\
		<span class=check1><input type=checkbox id='ac_1_EnableRecruit'> empty for now</span>\
		<input type=checkbox id='ac_1_EnableLootCamp'> Barb Looting<br />\
		<span class=check1><input type=checkbox id='ac_1_EnableTowerTrial'> empty for now</span>\
		<input type=checkbox id='ac_DebugMode'> Debug Log<br style='clear: both'/>\
		<label>Prefer Faction:</label> <input id='ac_PreferFaction'><br />\
		<label>Prefer Hero:</label> <input id='ac_PreferHero'><br />\
		<label>Prefer Recruit:</label> <input id='ac_PreferRecruit'><br />\
		</div>\
		<div id=ac_div_2 style='display:none; margin:0; text-align:left;'>\
		<label>Coordinates:</label> <textarea id='ac_PlunderCoordinates'></textarea><br />\
		<label>Troop Amount:</label> <input id='ac_PlunderTroopAmount' ac_default='100'><br />\
		<label>Attack Every:</label> <input id='ac_PlunderFrequency' ac_default='1'> Days<br />\
		</div>\
		<div id='AutoPlayer_info' style='text-align:left;'></div>\
	";
	
	document.body.appendChild(div);

	// automatic listener links input to GM.setGValue
	this.AddListeners('AutoPlayer_controls');
	return true;
},
SetDivContent:function(div, code) {
	var div = document.getElementById(div);
	if (!div) {
		GM.log("Can't find div " + div);
		return false;
	}
	div.innerHTML = code;
},
SetControls:function() {
	// sets current values for controls, runs each loop
	
	if(!this.AddControls()) return false;
	
	var htmlCode = '';
	
	htmlCode+= this.statsLine + "<br />";
	if (GM.getLValue('NeedMoreSoldiers','')!='') {
		htmlCode+="Need more soldiers for " + GM.getLValue('NeedMoreSoldiers') + "<br />";
	}
	
	htmlCode+= "Version: " + thisVersion + " ";
	if (newVersionAvailable) {
		htmlCode += "<a href='http://userscripts.org/scripts/source/" +SUC_script_num+".user.js'>(Newer version available)</a>";
	}
	htmlCode+= "<br />";

	this.SetDivContent('AutoPlayer_info', htmlCode);
},

/////////////////////////////////////////////////////////////////////

//							EVENT LISTENERS

// Watch for changes and update the controls

/////////////////////////////////////////////////////////////////////

ShowTab:function(topDivName, idNum) {
	var topDiv;
	if(!(topDiv = document.getElementById(topDivName))) {
		GM.debug("Can't find " + topDivName);
		return false;
	}
	var div = document.getElementById('ac_div_' + idNum);
	if (div) {		
		nHtml.LoopByXPath(topDiv,".//div[starts-with(@id,'ac_div_')]",function(tab) {
			tab.style.display = 'none';
		});
		nHtml.LoopByXPath(topDiv,".//span[starts-with(@id,'ac_tab_')]",function(tab) {
			tab.style.color = 'blue';
			tab.style.cursor = 'pointer';
		});
		div.style.display = 'block';
		var tab = document.getElementById('ac_tab_' + idNum);
		if (tab) {
			tab.style.color = 'black';
			tab.style.cursor = 'default';
		}
		var ctn = nHtml.FindByXPath(topDiv,".//span[@id='ac_curtabname']")
		if (ctn) {
			ctn.innerHTML = tab.innerHTML;
		}
	} else {
		GM.log("Can't find " + 'ac_div_' + idNum);
	}
},

// given a div, auto-adds listeners to all inputs that being with ac_
// if you want default_false, then do ac_f_
// inputs cannot have an "_" in the name

AddListeners:function(topDivName) {
	var topDiv;
	if(!(topDiv = document.getElementById(topDivName))) return false;
	
	nHtml.LoopByXPath(topDiv,".//input[starts-with(@id,'ac_')] | .//textarea[starts-with(@id,'ac_')]",function(inputDiv) {
		var def = inputDiv.id.match(/ac_(.*)_.*/);
		if (def) def = def[1];
		var idName = inputDiv.id.replace(/^.*_/,'')
		//GM.log(' id ' + inputDiv.id + ' def '+ def +' type ' + inputDiv.type + ' tagName ' + inputDiv.tagName);
		if (inputDiv.type=='checkbox') {
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/^.*_/,'')
				GM.setGValue(idName,e.target.checked);
				//GM.log("Just set " + idName);
			},false);
			inputDiv.checked = GM.getGValue(idName,def ? true : false);
		} else if (inputDiv.type=='text' || inputDiv.nodeName=='TEXTAREA') {
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/^.*_/,'')
				GM.setGValue(idName,e.target.value);
				//GM.log("Just set " + idName);
			},false);
			inputDiv.value = GM.getGValue(idName,'');
		}
	});
	nHtml.LoopByXPath(topDiv,".//span[starts-with(@id,'ac_')]",function(span) {
		var m = span.id.match(/ac_(.*)_([0-9]*)/);
		if (m) {
			var nam = m[1];
			var num = m[2];
			if (nam == 'tab') {
				//GM.debug("spanac" +  name + ' ' + num);
				span.addEventListener('click',function(e) {
					var idNum = e.target.id.replace(/^.*_/,'');
					Player.ShowTab(topDivName,idNum);
				},false);
			}
		}
	});
},

/////////////////////////////////////////////////////////////////////

//							GET STATS

// Functions that records all of base game stats, energy, stamina, etc.

/////////////////////////////////////////////////////////////////////

GetStats:function() {
	var rd=nHtml.FindByAttr(document.body, 'div', 'class', 'resourcedata');
	if (!rd) {
		GM.log("Resource data not found");
		var eTime = GM.getGValue("ErrorTime",0);
		if (eTime == 0)
			GM.setGValue("ErrorTime", (new Date().getTime()));
		if ((eTime > 0) && (eTime < (new Date().getTime())-(1000*60*15))) {
			GM.log('Waiting too long for stats');
			Player.ReloadNow();
		}
		return false;
	}
	GM.setGValue("ErrorTime",0);

	var ci=nHtml.FindByAttr(document.body, 'div', 'class', 'city');
	
	this.stats = {};
	
	this.statsLine = '';
	var list = ['gold', 'food', 'wood', 'stone', 'ore'];
	for (var i in list) {
		var r = list[i];

		this.stats[r] = {};
		if (ci) {
			var el = nHtml.FindByAttrContains(ci, "font", "id", r);
			if (el)
				this.stats[r].inc = parseInt(nHtml.GetText(el).trim());
			else 
				GM.log("Font id " + r + " not found in city (inc)");
		}
		
		var el = nHtml.FindByAttrContains(rd, "span", "id", r + '_now');
		if (el)
			this.stats[r].cur = parseInt(nHtml.GetText(el).trim());
		else 
			GM.log("Span id " + r + "_now not found");

		// GM.debug("El found + " + l + " " + nHtml.GetText(el).trim());
		
		var el = nHtml.FindByAttrContains(rd, "span", "id", r + '_max');
		if (el)
			this.stats[r].max = parseInt(nHtml.GetText(el).trim());
		else
			GM.log("Span id " + r + "_max not found");
			
		var l = r;
                if (r=='gold') l = 'gold';
		if (r=='food') l = 'food';
		if (r=='wood') l = 'wood';
		if (r=='stone') l = 'stone';
                if (r=='ore') l = 'ore';
		this.stats[l] = this.stats[r];
		
		this.statsLine = this.statsLine + l.substr(0,1) + ': ' + this.stats[r].cur + '/' + this.stats[r].max + '+' + this.stats[r].inc + ' ';
	}
	//GM.log(this.statsLine);
	
	return this.stats.gold.cur > 0 ||return this.stats.food.cur > 0 || return this.stats.wood.cur > 0 || return this.stats.stone.cur > 0 || return this.stats.ore.cur > 0 ;
},

waitMilliSecs:5000,

/////////////////////////////////////////////////////////////////////

//							MAIN LOOP

// This function repeats continously.  In principle, functions should only make one
// click before returning back here.

/////////////////////////////////////////////////////////////////////


MainLoop:function() {
	var ok = this.GetStats();
	this.SetControls();

	if (GM.getGValue('PlayerPaused','') != '') {
		this.WaitMainLoop();
		return;
	}

	if (!ok) {
		GM.log("Wait for stats.");
		GM.debug("Debug mode is ON");
		this.WaitMainLoop();
		return;
	}


/	if (GM.getGValue("WaitForCaptcha",'') == '') {
/		var img = nHtml.FindByAttr(document.body, "img", "id", 'validate_img');
/		if (img && nHtml.IsVisible(img)) {
/			// todo ... try to ocr it?
/			if (this.WhileSinceDidIt("ClickCaptchaOK",60*5)) {
/				var el;
/				if (el = document.getElementById('AutoPauseLink')) {
/					GM.setGValue("WaitForCaptcha", true);
/					el.innerHTML = 'Captcha OK';
/				}
/			}
/			GM.log("Wait for captcha");
/			this.WaitMainLoop();
/			return;
/		}
/	}
/	
	var citylist = new Array;
	var nCit = 0;
	var selCity = 0;
	nHtml.LoopByXPath(document.body,".//ul[@id='listallcity']//a",function(el){
		//GM.log("classname is " + el.className + " nCit is " + nCit);
		citylist.push(el);
		if (el.className.match(/now/i)) {
			//GM.log("match nCit is " + nCit);
			selCity=nCit;
		}
		++nCit;
	});
	
	//GM.log("Selcity is " + selCity);
	
	// change GM prefix for city selection
	GM.lprefix = tk_server + '.' + selCity + '.';
	
	// log & close system notices
	var pop = nHtml.FindByAttr(document.body, "div", "class", 'dialog_header');
	if (nHtml.IsVisible(pop)) {
		var title = nHtml.FindByXPath(pop, ".//h3");
		var msg = nHtml.FindByXPath(document.body, ".//div[@id='dialog']//h4");
		if (title) title=nHtml.GetText(title).trim();
		if (msg) msg=nHtml.GetText(msg).trim().toLowerCase();
		if (title && title.match(/(system notice)|(special event)/i) && !msg.match(/this will cost you.*gold/i)) {
			var bclose = nHtml.FindByXPath(document.body, ".//div[@id='dialog']//div[@class='dialogbtn']//a[@class='submitbtn']");
			if (!bclose) {
				GM.debug("No submit button");
				bclose = nHtml.FindByAttr(pop, "a", "class", "closewindow");
			}
			if (bclose) {
				GM.log("Close pop " + title + " : " + msg);
				GM.setLValue("PopWasClosed", title + " : " + msg);
				this.Click(bclose);
				this.WaitMainLoop();
				return;
			}
		}
	}

	//GM.log("Main loop");
	
	var did = false;
	if (!did) did = this.MainHeroStats();
	if (nCit <= 1 || selCity>=(nCit-1)) {
		// do these in most recent for most benefit
		if (!did) did = this.MainDailyStipend();
		if (!did) did = this.MainDailyHero();
	}
	if (selCity == 0) {
		if (GM.getGValue("WaitForCaptcha",'') == '') {
			// only try faction quests with main city
			if (!did) did = this.MainFaction();
		}
	}
	//if (!did) did = this.MainPlunder();
	if (GM.getGValue("WaitForCaptcha",'') == '') {
		if (!did) did = this.MainCamp();
	}
	if (!did) did = this.MainTrial();
	if (!did) did = this.MainBuild();
	if (!did) did = this.MainRecruit();

	if (!did) 
		did = this.CloseFloat();

	// change GM prefix to server-wide
	GM.prefix = tk_server + '.';
	
	if (!did) {
		if (nCit > 1) {
			if (this.WhileSinceDidIt("CitySwitch",60)) {
				selCity=selCity+1;
				if (selCity >= nCit) 
					selCity=0;
				GM.debug("City switch to " + selCity + " " + nHtml.GetText(citylist[selCity]).trim());
				this.Click(citylist[selCity]);
				did = true;
				this.JustDidIt("CitySwitch");
			}
		}
	}
	
	this.WaitMainLoop(); 
	return;
},
CloseFloat:function () {
	// close all pops
	var ext = arguments.callee ? (" called from " + arguments.callee.caller.name) : '';
	var clicked = false;
	
	nHtml.LoopByXPath(document.body, ".//div[@id='dialog']//a[@class='closewindow']", function (bclose) {
		if (nHtml.IsVisible(bclose)) {
			if (bclose.parentNode)
				GM.debug("Closing dialog " + nHtml.GetText(bclose.parentNode).trim() + ext);
			nHtml.Click(bclose);
			clicked = true;
			return true;
		}
	});
	if (clicked) return true;
	
	nHtml.LoopByXPath(document.body, ".//div[contains(@id,'floatblock')]//a[@class='closewindow']", function (bclose) {
		if (nHtml.IsVisible(bclose)) {
			if (bclose.parentNode)
				GM.debug("Closing floatblock " + nHtml.GetText(bclose.parentNode).trim() + ext);
			nHtml.Click(bclose);
			clicked = true;
			return true;
		}
	});
	return clicked;
},

MainCamp:function() {
	if (!GM.getGValue('EnableLootCamp',true)) 
		return false;

	var fmb = nHtml.FindByXPath(document.body,".//div[@id='floatblockleft']");
	var fmh = nHtml.FindByTag(fmb,"h2");
	var popName = '';
	if (fmh)
		popName = nHtml.GetText(fmh).trim();
	if (fmb && !fmh) {
		//GM.log("No header in fmb, usually OK");
	}

	if (!this.WhileSinceDidIt("AutoLootCamp",600)) return false; 
	if (!this.HeroClick()) {
		GM.debug("No knight in city"); 
		this.JustDidIt("AutoLootCamp");
		return false;
	}

	var hero = nHtml.FindByAttr(document.body, "select", "id", "self_gid");	
	var selectedHero = '';
	if (hero) {
		if (!this.heroStats)
			GM.log("ERROR: why no stats?");
		
		if (hero.options.length <= 1) {
			GM.log("All knight are busy, no camp attacks");
			this.JustDidIt("AutoLootCamp");
			return this.CloseFloat();
		}
		
		var pref = GM.getGValue("PreferHero",'').trim().toLowerCase();
		for (var i in hero.options) {
			if (i == 0) continue;
			
			var name = hero.options[i].text.trim().toLowerCase();
			//GM.log("NAME " + name);
			
			if (this.heroStats && this.heroStats[name] && this.heroStats[name].stamina > 20) {
				hero.options[i].selected = true;
				if (pref != '' && (name.indexOf(pref) >= 0 || pref.indexOf(name) >= 0))
					break;
				else if (pref == '')
					break;
			}
			
			if (this.heroStats && !this.heroStats[name])
				GM.log("ERROR: why not stats for " + name);
		}

		selectedHero = hero.options[hero.selectedIndex].text.trim().toLowerCase();
		if (this.heroStats && this.heroStats[selectedHero]) {
			if (this.heroStats[selectedHero].stamina < 20) {
				GM.log("Can't loot, stamina for " + selectedHero + " is " + this.heroStats[selectedHero].stamina);
				this.JustDidIt("AutoLootCamp");
				return this.CloseFloat();
			}
		} else {
			GM.log("No stats! for " + selectedHero);
			GM.setLValue("AutoHeroStats",0);
		}
	}

	if (popName && (popName == GM.getLValue("CampFacLast",''))) {
		var lev_max;
		var title_max;
		var el_max;		
		nHtml.LoopByXPath(fmb,".//map/area",function(el) {
			var title=el.getAttribute('sgtitle');
			if (!title)
				return;
				
			var level = title.match(/Level(\d+)/i);
			if (!level) {
				//GM.log("No level for area " + title);
				return;
			}
			
			level=level[1];
			if (this.heroStats && (level*.97) > this.heroStats[selectedHero].level)
				return;

			if (level < lev_max)
				return;

			title_max=title;
			lev_max=level;
			el_max=el;
		});

		this.JustDidIt("AutoLootCamp");
		
		if (!el_max) {
			GM.log("Can't find knight to attack");
			GM.setLValue('NeedHeroLevel', true);
			return this.CloseFloat();
		}

		GM.log("Click on general " + popName + " " + title_max);
		this.Click(el_max);
		return true;
	}

	if (popName == 'Faction Map') {
		var cit = [];
		GM.log("Found faction map header");
		nHtml.LoopByXPath(fmb,".//span[starts-with(@id,'influence_')]/a",function(el) {
			var facName=nHtml.GetText(el).trim();
			if (GM.getLValue("CampFacLast",'') != el.facName)
				cit.push(el);
		});
		
		if (cit.length == 0) {
			GM.log("No faction cities?");
			return false;
		}
		
		rcit = (Math.random()*cit.length);
		//GM.log("rcit1 is " + rcit);
		rcit = 0|rcit;
		//GM.log("rcit2 is " + rcit);
		var el = cit[rcit];
		
		var facName=nHtml.GetText(el).trim();
		GM.setLValue("CampFacLast", facName);
		this.Click(el);
		
		return true;
	}
	
	if (popName) {
		GM.log("Loot pop name is " + popName);
	}

	var fm = nHtml.FindByXPath(document.body,".//div[@id='floatbutton']//img[contains(@sgtitle,'Faction Map')]");
	if (!fm) {
		GM.log("Can't find faction map");
		this.JustDidIt("AutoLootCamp");
		return this.CloseFloat();
	}
	
	GM.debug("Click on faction map");
	this.Click(fm);
	return true;
}
,
MainPlunder:function() {
	if (GM.getGValue('PlunderCoordinates','').trim()=='') 
		return false;

	if (!this.WhileSinceDidIt("AutoPlunder",60*10)) 
		return false;
		
	if (!this.HeroClick()) {
		return false;
	}
}
,

MainFaction:function() {
	if (!GM.getGValue('EnableFactionQuests',true)) 
		return false;

	if (!this.WhileSinceDidIt("AutoFactionQuest",600)) return false;
	if (!this.HeroClick()) {
		GM.debug("No heroes for faction quest"); 
		this.JustDidIt("AutoFactionQuest");
		return false;
	}

	if (GM.getLValue('PopWasClosed','').match(/level is too low/i)) {
		GM.debug("Level too low");
		GM.setLValue('QuestFollowName', '');
		GM.setLValue('PopWasClosed','');
		return this.CloseFloat();
	}

	// the name of the quest i followed
	var questFollowName=GM.getLValue('QuestFollowName');
	var questActionName=GM.getLValue("QuestActionName");

	// solf
	var solf = nHtml.FindByXPath(document.body, ".//form[@id='soldierf']//a[contains(@href,'village.detail')]");
	var solfName;
	
	if (solf) solfName = nHtml.GetText(solf).trim().toLowerCase();

	if (solf && solfName && solfName.indexOf(questFollowName)>=0) {
		var s2 = nHtml.FindByXPath(document.body, ".//div[@id='school_2']");
		var wb = nHtml.FindByAttr(s2, "a", "class", "submitbtn");
		if (!wb) {
			GM.log("Solf fail " + solfName);
			return false;
		}
		GM.log("Solf war start " + solfName);
		this.Click(wb);
		return true;
	}

	if (solf) {
		GM.log("Not my solf " + solfName);
	}
	
	// the thing i'm aiming for (battle wise)
	var aim = nHtml.FindByXPath(document.body, ".//input[@id='aim_name']");
	var aimName;
	if (aim) 
		aimName = String(aim.value).trim().toLowerCase();	

	if (aim && GM.getLValue('PopWasClosed','').match(/too few soldiers/i)) {
		GM.setLValue('PopWasClosed','');
		GM.setLValue("NeedMoreSoldiers", questActionName);
		aimName = '';	// skip next section
		GM.log("Need more soldiers for " + questActionName);
	}
	
        if (aimName && (aimName == questFollowName)) {
		//GM.log("solf is " + aim.form.id);
		var s = new Array;
		var sHv = new Array;
		for (i = 0; i <= 9; ++i) {
			s[i] = nHtml.FindByAttr(aim.form, "input", "id", "soldier"+i);
			var sH = nHtml.FindByAttr(aim.form, "a", "id", "soldier_link" + i);
			sHv[i] = 0;
			if (sH) 
				sHv[i] = parseInt(nHtml.GetText(sH).trim().replace(/[()]/,'')); 
		}
				
		GM.debug("Militia/swordsman is " + sHv[0] + " Scout is " + sHv[9]);
		
		// for scouting, use s9 ... the scouts only
		// for other, use anyone, in order
		
		var isScout = questActionName.match(/scout/);
		
		var nS = nHtml.FindByAttr(aim.form, "input", "id", "uit_condition_soldier_num");
		if (nS) 
			nS = parseInt(nS.value);
		
		var starti = isScout?9:0;
		
		GM.debug("nS is " + nS + " s[si]: " + s[starti] + " sHv[si]: " + sHv[starti]);
		if (s[starti] && (sHv[starti]>10)) {
			var tot=0;
			if (nS > 0) {
				// know how many? send that
				for (var i=starti;i<=9;++i) {
					if (tot>=nS) 
						break;

					if (sHv[i] > (nS-tot))
						s[i].value = (nS-tot);
					else if (sHv[i] > 0)
						s[i].value = sHv[i];

					tot+=parseInt(s[i].value);
				}
			} else {
				// else, just be lazy and send everyone
				for (var i=starti;i<=9;++i) {
					s[i].value = sHv[i];
					tot+=parseInt(s[i].value);
				}
				// but log it
				GM.log("Don't know how many to send, fix code!");
			}			
			GM.log("Aim war start " + aimName + " with " + tot);
			var wb = nHtml.FindByXPath(document.body, ".//a[contains(@onclick,'warStart')]");
			this.Click(wb);
			return true;
		} else {
			if (!s[starti]) {
				GM.log("Error: no s[" + starti + "] on aim Form.");
				return false;
			} else {
				GM.log("Not enough troops to " + questActionName + " " + aimName);
				if (sHv[starti]>10) 
					GM.setLValue('NeedMoreSoldiers',questActionName);
			}
		}
	} else {
		if (aimName) {
			GM.log("Aiming for " + aimName + " but doesn't match " + questFollowName);
		}
	}

	// is there a quest action?
	var action = nHtml.FindByXPath(document.body, ".//div[@class='junying_right']//a[contains(@onclick,'startITask')]");
	if (action) {
		var hero = nHtml.FindByAttr(document.body, "select", "id", "self_gid");
		if (hero.options.length > 1) {
			var pref = GM.getGValue("PreferHero",'').trim().toLowerCase();
			if (pref != '') {
				for (var i in hero.options) {
					if (hero.options[i].text.toLowerCase().indexOf(pref) >= 0 || pref.indexOf(hero.options[i].text.toLowerCase())>=0) {
						hero.options[i].selected = true;
						GM.log("Using hero " + hero.options[i].text);
						break;
					}
				}
			}
			var aName = nHtml.GetText(action).trim().toLowerCase();
			GM.log("Click action " + questFollowName + " : " + aName);
			GM.setLValue("QuestActionName", aName);
			this.Click(action);
			return true;
		} else {
			GM.log("No heroes left for quests");
			this.JustDidIt("AutoFactionQuest");
			return this.CloseFloat();
		}
	}

        if (this.Goto('quest')) return true;
        if (!this.navOK) return false;

	var sw=nHtml.FindByAttr(document.body, "div", "id", 'floatblockcenter');
	var ul=nHtml.FindByAttrContains(sw, "ul", "class", "subnav");
	var fb=nHtml.FindByAttrContains(ul, "a", "onclick", "InfluenceTask");

        if (!fb) {
		GM.log("No faction click?");
		return false;
	}
	
        if (fb.parentNode.className != 'now') {
		GM.log("Faction click");
		this.Click(fb);
		return true;
	}
	
	var ul=nHtml.FindByAttrContains(sw, "ul","id","taskTypeListAll");
	var fac;
	var facName;
	var questCheckList = GM.getLValue('QuestCheckList','');
	
	nHtml.LoopByXPath(ul, ".//li/a",function(el){
		var n=nHtml.GetText(el);
		n = n.trim().toLowerCase();
		if (questCheckList.indexOf(n) < 0) {
			if (!fac || (nHtml.InCList(GM.getGValue('PreferFaction',''),n) >= 0)) {
				fac = el;
				facName = n;
			}
		}
	});
	
	if (!fac) {
		// all followed
		GM.log("No facs left");
		this.JustDidIt("AutoFactionQuest");
		GM.setLValue('QuestCheckList', '');
		return this.CloseFloat();
	}
	
	if (fac.parentNode.className != 'now') {
		GM.debug("Selecting " + facName);
		this.Click(fac);
		return true;
	}
	
	GM.debug("Selected " + facName);

	var questSubCheckList = GM.getLValue('QuestSubCheckList','');

	var sub;
	var subName;	
	var ul=nHtml.FindByAttrContains(sw, "ul","id","taskListAll");
	nHtml.LoopByXPath(ul, ".//li/a",function(el){
		var n=nHtml.GetText(el);
		n = n.trim().toLowerCase();
		if (questSubCheckList.indexOf(n) < 0) {
				sub = el;
				subName = n;
				return 'break';
		}
	});

	if (!sub) {
		GM.setLValue('QuestCheckList', questCheckList + ',' + facName);
		GM.setLValue('QuestSubCheckList', '');
		return true;
	}
	
	if (sub.parentNode.className != 'now') {
		GM.log("Selecting sub " + subName);
		this.Click(sub);
		return true;
	}

	GM.log("Selected sub " + subName);

	GM.setLValue('QuestSubCheckList', questSubCheckList + ',' + subName);

	var notstart = nHtml.FindByXPath(sw, ".//li[contains(text(),'not started')]");
	if (notstart) {
		var action = nHtml.FindByXPath(sw, ".//ul[@class='taskcontent']//strong[@class='tips_green']/parent::a");	
		if (!action) {
			GM.log("Can't find tips_green under " + facName + " quest");
			return false;
		}
		var aName = nHtml.GetText(action).trim().toLowerCase();
		GM.setLValue('QuestFollowName', aName);
		GM.log("Following quest for " + aName);	
		this.Click(action);
		return true;
	} else {
		GM.debug("Already done " + facName + ':' + subName);
	}
	return true;
},
MainRecruit:function() {
	if (!GM.getGValue('EnableRecruit',true)) 
		return false;

	if (GM.getLValue('NeedMoreSoldiers','')=='')
		return false;
	
	if (!this.WhileSinceDidIt('Recruit_'+name,60*15))
		return false;

	var pref = GM.getGValue('PreferRecruit', '').toLowerCase().trim();

	if (GM.getLValue('NeedMoreSoldiers','').indexOf('scout')>=0) {
		pref='scout';
	}

	if (this.needFood)
		return false;
	
	if (pref.indexOf('scout')>=0 || pref.indexOf('crossbowman')>=0) {
		if (this.PickArea('city', 'scout camp'))
			return true;		
		if (!this.navOK) {
			GM.debug("No scout camp");
			Player.JustDidIt('Recruit_'+name);
			return false;
		}
	} else if (pref.indexOf('lance')>=0) {
		if (this.PickArea('city', 'stable'))
			return true;		
		if (!this.navOK) {
			GM.debug("No stable");
			Player.JustDidIt('Recruit_'+name);
			return false;
		}
	} else {
		if (this.PickArea('city', 'barracks'))
			return true;		

		if (!this.navOK) {
			GM.debug("No barracks");
			Player.JustDidIt('Recruit_'+name);
			return false;
		}
	}
	
	GM.debug("Recruiting " + pref);
	
	var sw = nHtml.FindByAttr(this.currentPop, 'div', 'class', 'subwindow_right');
	var con = nHtml.FindByAttr(sw, 'div', 'class', 'construct');
	var okdid = false;
	nHtml.LoopByXPath(sw, ".//div[@class='construct']//ul/li",function(li){
		var info = nHtml.FindByXPath(li, ".//div[@class='infoshow']");
		if (info) {
			var name=nHtml.GetText(info);
			name=name.replace(/\s+now:.*/i,'').trim().toLowerCase();
			name=name.replace(/\s+requirement:.*/i,'');
			if ((pref=='') || name.indexOf(pref) >= 0) {
				//GM.debug("Recruit name is " + name + " pref is " + pref);
				var avail=nHtml.GetText(info);
				avail=avail.replace(/.*available to recruit\s*[:()\s]*/i,'');
				//GM.debug("avail is " + avail);
				avail=parseInt(avail);
				var but = nHtml.FindByXPath(li, ".//a[contains(@onlick,'raiseSoldierStart')]");
				if (!but)
					but = nHtml.FindByXPath(li, ".//a[@sgtitle='Recruit']");
				var inp = nHtml.FindByXPath(li, ".//input[@type='text']");
				// GM.log("Name: " + name + " Avail: " + avail + " But: " + but + " In: " + inp);
				if (inp && avail>1 && but) {
					GM.log("Recruit " + 0|(avail/2) + " " + name);
					inp.value=0|(avail/2);
					Player.Click(but);
					GM.setLValue('NeedMoreSoldiers','');
					okdid = true;
				} else {
					GM.log("Can't recruit " + name + " avail " + avail);
				}
				// for pref = '' ... keep looping for cheapest?  or recrut militia/swordsman?
				return 'break';
			}
		}
	});

	this.JustDidIt('Recruit_'+name);
	if (!okdid) 
		GM.log("Can't recruit " + name);
	return okdid;
},
MinCityLev:function(list, prior) {
	var minL = 10000;
	var minN = '';
	if (prior) {
		var lev = this.cityStats[prior];
		if (lev>0) 
			minL = lev-1;
	}
	for (var i in list) {
		var name = list[i];
		var lev = this.cityStats[name];
		if (name == 'tower' || name == 'city wall') {
			//GM.debug(name + " LEVEL " + lev);
		}
		if (lev != undefined) {
			//GM.debug(name + " LEVEL DEF " + lev);
			if (lev < minL) {
				minN = name;
				minL = lev;
			}
		}
	}
	return minN;
},
MainBuild:function() {
	if (!GM.getGValue('EnableBuild',true)) 
		return false;

	// get current building list
	var iq=nHtml.FindByAttr(document.body, "div", "id", 'indexqueue');
	var ci=iq ? nHtml.FindByAttr(iq, "div", "class", 'constructinfo') : iq;
	if (ci) {
		var blist = '';
		if (ci) {
			nHtml.LoopByXPath(ci, ".//li", function (li) {
				var b = nHtml.GetText(li).trim();
				var t = b.match(/(.*)\t/);
				if (t) b = t[1].trim();
				if (b.match(/Lv\.\d/i)) {
					blist = blist + "," + b;
				}
			});
		}
		//GM.log("blist: " + blist);
		this.buildingList = blist.substr(1);

		// if in city and no building list... do it now
		if (this.buildingList == '')
			GM.setLValue('AutoCheckBuild',0);
	} else {
		GM.debug("Can't find constructinfo!");
	}

	//GM.debug("Build list is " + this.buildingList);

	if (!this.WhileSinceDidIt('AutoCheckBuild',60))
		return false;

	if (!ci || this.buildingList != '') {
		this.JustDidIt("AutoCheckBuild");
		return false;
	}	
	
	this.needFood = this.stats.crop.inc < this.stats.crop.max*.005;
	
	var did = false;
	
	//GM.debug("1. Need food " + this.needFood + " did " + did);	
	if (this.WhileSinceDidIt('AutoResource',300)) {
		if (this.needFood) {
			GM.log('Food is low try build farmland');
			did = this.Build('resource', 'farmland');
		} else {
			if (!did && this.stats.clay.inc < (this.stats.lumber.inc*.90) && this.stats.clay.inc < this.stats.iron.inc)
				did = this.Build('resource', 'stone mine');

			if (!did && this.stats.iron.inc < (this.stats.lumber.inc*.90))
				did = this.Build('resource', 'iron mine');

			if (!did)
				did = this.Build('resource', 'timberland');			
		}
		if (!did) 
			this.JustDidIt('AutoResource');
	}

	//GM.debug("2. Need food " + this.needFood + " did " + did);	
	if (!did && this.WhileSinceDidIt('AutoCity',600)) {
		if ( !this.needFood ) {
			GM.debug("3. Need food " + this.needFood + " did " + did);	

			// priority mansion or annex, but don't create them
			if (!did) did = this.Build('city', 'mansion', 'nocreate');
			if (!did) did = this.Build('city', 'annex', 'nocreate');

			if (!did) {
				// nav to city to be sure citystats is set
				if (this.PickArea('city')) return true;
				if (!this.navOK) return false;

				GM.log("CS: " + this.cityStats);

				// ok to create these				
				var minC = this.MinCityLev(['barracks', 'weaponsmith', 'drill ground', 'career center', 'armorsmith', 'scout camp', 'stable']);
				GM.debug("4. Need food " + this.needFood + " minc " + minC);	
				if (minC != '' && !did) 
					did = this.Build('city', minC, 'create');

				if (!did) {
					// pick only if they are less than above, or don't exist
					var minC = this.MinCityLev(['bunker','tower','city wall','market'],minC);
					GM.debug("5. Need food " + this.needFood + " minc " + minC);
					if (minC != '') 
						did = this.Build('city', minC, 'create');
				}
			}

			this.needWarehouse = ((this.stats.clay.cur >= this.stats.clay.max*.98) || (this.stats.lumber.cur>=this.stats.lumber.max*.98));

			if (this.stats.lumber.max > this.stats.crop.max) {
				if (!did) did = this.Build('city', 'granary')
			} else {
				if (!did) did = this.Build('city', 'warehouse');
			}
			
			if (!did) {
				this.JustDidIt('AutoCity');
			}
		}		
	}

	if (!did) {
		GM.setLValue('BuildCheckList', '');
	}

	//GM.debug("Returning " + did + " from MainBuild");
	return did;
},
Build:function(nav, name) {
	var buildCheckList = GM.getLValue('BuildCheckList', '');

	if (buildCheckList.indexOf(nav+':'+name)>=0) {
		//GM.debug("here 0 " + name);
		return false;
	}

	if (this.PickArea(nav, name))
		return true;

	//GM.debug("here 1 " + name);
			
	if (!this.navOK) {
		GM.setLValue('BuildCheckList', buildCheckList + ',' + nav+':'+name);
		return false;
	}	
	//GM.debug("here 2 " + name);

	var pop = this.currentPop;
	if (pop) {
		var title = this.currentPopName;
		
		var up  = nHtml.FindByXPath(pop,".//a[contains(@onclick,'build.upgrade')]");
		if (!up) 
			up = nHtml.FindByXPath(pop,".//a[@sgtitle='Upgrade']");

		//GM.debug("here 3 " + name +  " bcs " + buildCheckList);

		if (!up) {
			GM.log("No upgrade button for " + title);
			GM.setLValue('BuildCheckList', buildCheckList + ',' + nav+':'+name);
			return this.CloseFloat();
		}

		var reqs = {};
		nHtml.LoopByXPath(pop,".//li/img",function (el) {
			var req=String(el.getAttribute('sgtitle'));
			req=req.trim().toLowerCase();
			var val=nHtml.GetText(el.parentNode).trim();
			reqs[req] = val;
		});

		if (this.stats.lumber.cur >= reqs.wood &&
		    this.stats.clay.cur   >= reqs.stone &&
		    this.stats.iron.cur   >= reqs.iron &&
		    this.stats.crop.cur   >= reqs.food) {  
		    this.Click(up);
		    GM.debug("here 4 " + name +  " bcs " + buildCheckList);
		    return true;
		}

		GM.log("Wait to upgrade " + name);
		GM.setLValue('BuildCheckList', buildCheckList + ',' + nav+':'+name);
		return this.CloseFloat();
	} else {
		GM.log("No pop for " + name);
		GM.setLValue('BuildCheckList', buildCheckList + ',' + nav+':'+name);
		return false;
	}
},
PickArea:function(nav, name) {
	var ext = arguments.callee ? (" called from " + arguments.callee.caller.name) : '';
	GM.debug("Pick area " + nav + " : " + name + ext);
	
	if (this.Goto(nav)) 
		return true;
		
        if (!this.navOK) {
		GM.log("Not the nav I expect to be " + this.currentNav + " != " + nav);
		return this.CloseFloat();
	}

	if (name == undefined)
		name = '';
	
	// already at area
	var map;
	var pop;
	
	if (nav == 'resource') {
		map = nHtml.FindByAttrContains(document.body, "map", "id", 'Res');
		pop = nHtml.FindByXPath(document.body, ".//div[@id='dialog']");
	} else if (nav == 'city') {
		map = nHtml.FindByAttrContains(document.body, "map", "id", 'city');
		pop = nHtml.FindByXPath(document.body, ".//div[@id='floatblockleft']");
	}
	
	if (!nHtml.IsVisible(pop)) 
		pop = null;
	
	this.currentPop=null;
	this.currentPopName='';
	this.cityStats = {};

	var cityStr = GM.getLValue("CityStats", '');
		
	//GM.log("cityStr is " + cityStr);
	var dsp=cityStr.split(','); 
	for (var j in dsp) {
		var vent=dsp[j];
		if (vent != '') {
			var p2 = vent.indexOf('=');
			var k = vent.substr(0,p2);
			var v = vent.substr(p2+1);
			//GM.log("city k=v is " + k + '=' + v);
			this.cityStats[k]=parseInt(v);
		}
	}

	this.navOK=false;
	
	if (!map) {
		GM.log("Can't find map for " + nav);
		return false;
	}
	
	if (pop && nHtml.IsVisible(pop)) {
		this.currentPop=pop;
		var title = nHtml.FindByXPath(pop, ".//h4 | .//h2");			
		if (title) {
			title=nHtml.GetText(title).trim().toLowerCase();
			this.currentPopName=title;
			GM.log("Current pop is " + title);
		}
		if (title && title.indexOf(name)==0) {
			this.currentPopName=name;	// normalize to be nice
			this.navOK=true;		// need to check this!
			return false;
		} else {
			if (title) {
				GM.log("Not the area I expect to be " + this.currentPopName + " != " + name);
				return this.CloseFloat();
			}
			return false;
		}
	}

	if (!map) {
		GM.log("Pick while not in area");
		return false;
	}
	
	this.currentMap = map;

	// pick lowest lev
	var minLv = 10000;
	var minEl;
	nHtml.LoopByXPath(map, ".//area", function(el) {
		var d='';
		var ename = el.getAttribute('sgtitle').trim().toLowerCase();
		var lv = ename.match(/(.*)lv\.(\d+)/);
		if (lv) {
			ename = lv[1].trim();
			lv = lv[2];
			//GM.debug("ename: " + ename + " lv: " + lv);
			Player.cityStats[ename] = parseInt(lv);
			if (name && (ename.indexOf(name) == 0)) {
				if (lv < minLv) {
					GM.debug("Found: " + ename + " lv: " + lv);
					minEl = el;
					minLv = lv;
				}
			}
		}
	});

	cityStr = '';
	for (var x in this.cityStats) {
		cityStr = cityStr + x + "=";
		cityStr = cityStr + this.cityStats[x] + ",";
	}
	if (cityStr != '') {
		GM.debug("City stats : " + cityStr);
		GM.setLValue("CityStats", cityStr);
	}

	if (name && name != undefined) {
		if (minEl) {	
			GM.debug("Click on building " + minEl.getAttribute('sgtitle'));
			Player.Click(minEl);
			return true;
		}	
		GM.log("Can't find area " + name);
	} else {
		GM.debug("Don't need area");
		// just wanted cityStats
		this.navOK = true;
	}
	return false;	
},
// slowly, after a randomized time click a button
Click:function(button) {
	this.waitMilliSecs=4000+Math.random()*2000;
	nHtml.Click(button);
},
UnsafeClick:function(obj) {
	nHtml.setTimeout(function() {
		if (obj.getAttribute('onclick') career center', 'armorsmith', 'scout camp', 'stable']);
				GM.debug("4. Need food " + this.needFood + " minc " + minC);	
				if (minC != '' && !did) 
					did = this.Build('city', minC, 'create');

				if (!did) {
					// pick only if they are less than above, or don't exist
					var minC = this.MinCityLev(['bunker','tower','city wall','market'],minC);
					GM.debug("5. Need food " + this.needFood + " minc " + minC);
					if (minC != '') 
						did = this.Build('city', minC, 'create');
				}
			}

			this.needWarehouse = ((this.stats.clay.cur >= this.stats.clay.max*.98) || (this.stats.lumber.cur>=this.stats.lumber.max*.98));

			if (this.stats.lumber.max > this.stats.crop.max) {
				if (!did) did = this.Build('city', 'granary')
			} else {
				if (!did) did = this.Build('city', 'warehouse');
			}
			
			if (!did) {
				this.JustDidIt('AutoCity');
			}
		}		
	}

	if (!did) {
		GM.setLValue('BuildCheckList', '');
	}

	//GM.debug("Returning " + did + " from MainBuild");
	return did;
},
Build:function(nav, name) {
	var buildCheckList = GM.getLValue('BuildCheckList', '');

	if (buildCheckList.indexOf(nav+':'+name)>=0) {
		//GM.debug("here 0 " + name);
		return false;
	}

	if (this.PickArea(nav, name))
		return true;

	//GM.debug("here 1 " + name);
			
	if (!this.navOK) {
		GM.setLValue('BuildCheckList', buildCheckList + ',' + nav+':'+name);
		return false;
	}	
	//GM.debug("here 2 " + name);

	var pop = this.currentPop;
	if (pop) {
		var title = this.currentPopName;
		
		var up  = nHtml.FindByXPath(pop,".//a[contains(@onclick,'build.upgrade')]");
		if (!up) 
			up = nHtml.FindByXPath(pop,".//a[@sgtitle='Upgrade']");

		//GM.debug("here 3 " + name +  " bcs " + buildCheckList);

		if (!up) {
			GM.log("No upgrade button for " + title);
			GM.setLValue('BuildCheckList', buildCheckList + ',' + nav+':'+name);
			return this.CloseFloat();
		}

		var reqs = {};
		nHtml.LoopByXPath(pop,".//li/img",function (el) {
			var req=String(el.getAttribute('sgtitle'));
			req=req.trim().toLowerCase();
			var val=nHtml.GetText(el.parentNode).trim();
			reqs[req] = val;
		});

		if (this.stats.lumber.cur >= reqs.wood &&
		    this.stats.clay.cur   >= reqs.stone &&
		    this.stats.iron.cur   >= reqs.iron &&
		    this.stats.crop.cur   >= reqs.food) {  
		    this.Click(up);
		    GM.debug("here 4 " + name +  " bcs " + buildCheckList);
		    return true;
		}

		GM.log("Wait to upgrade " + name);
		GM.setLValue('BuildCheckList', buildCheckList + ',' + nav+':'+name);
		return this.CloseFloat();
	} else {
		GM.log("No pop for " + name);
		GM.setLValue('BuildCheckList', buildCheckList + ',' + nav+':'+name);
		return false;
	}
},
PickArea:function(nav, name) {
	var ext = arguments.callee ? (" called from " + arguments.callee.caller.name) : '';
	GM.debug("Pick area " + nav + " : " + name + ext);
	
	if (this.Goto(nav)) 
		return true;
		
        if (!this.navOK) {
		GM.log("Not the nav I expect to be " + this.currentNav + " != " + nav);
		return this.CloseFloat();
	}

	if (name == undefined)
		name = '';
	
	// already at area
	var map;
	var pop;
	
	if (nav == 'resource') {
		map = nHtml.FindByAttrContains(document.body, "map", "id", 'Res');
		pop = nHtml.FindByXPath(document.body, ".//div[@id='dialog']");
	} else if (nav == 'city') {
		map = nHtml.FindByAttrContains(document.body, "map", "id", 'city');
		pop = nHtml.FindByXPath(document.body, ".//div[@id='floatblockleft']");
	}
	
	if (!nHtml.IsVisible(pop)) 
		pop = null;
	
	this.currentPop=null;
	this.currentPopName='';
	this.cityStats = {};

	var cityStr = GM.getLValue("CityStats", '');
		
	//GM.log("cityStr is " + cityStr);
	var dsp=cityStr.split(','); 
	for (var j in dsp) {
		var vent=dsp[j];
		if (vent != '') {
			var p2 = vent.indexOf('=');
			var k = vent.substr(0,p2);
			var v = vent.substr(p2+1);
			//GM.log("city k=v is " + k + '=' + v);
			this.cityStats[k]=parseInt(v);
		}
	}

	this.navOK=false;
	
	if (!map) {
		GM.log("Can't find map for " + nav);
		return false;
	}
	
	if (pop && nHtml.IsVisible(pop)) {
		this.currentPop=pop;
		var title = nHtml.FindByXPath(pop, ".//h4 | .//h2");			
		if (title) {
			title=nHtml.GetText(title).trim().toLowerCase();
			this.currentPopName=title;
			GM.log("Current pop is " + title);
		}
		if (title && title.indexOf(name)==0) {
			this.currentPopName=name;	// normalize to be nice
			this.navOK=true;		// need to check this!
			return false;
		} else {
			if (title) {
				GM.log("Not the area I expect to be " + this.currentPopName + " != " + name);
				return this.CloseFloat();
			}
			return false;
		}
	}

	if (!map) {
		GM.log("Pick while not in area");
		return false;
	}
	
	this.currentMap = map;

	// pick lowest lev
	var minLv = 10000;
	var minEl;
	nHtml.LoopByXPath(map, ".//area", function(el) {
		var d='';
		var ename = el.getAttribute('sgtitle').trim().toLowerCase();
		var lv = ename.match(/(.*)lv\.(\d+)/);
		if (lv) {
			ename = lv[1].trim();
			lv = lv[2];
			//GM.debug("ename: " + ename + " lv: " + lv);
			Player.cityStats[ename] = parseInt(lv);
			if (name && (ename.indexOf(name) == 0)) {
				if (lv < minLv) {
					GM.debug("Found: " + ename + " lv: " + lv);
					minEl = el;
					minLv = lv;
				}
			}
		}
	});

	cityStr = '';
	for (var x in this.cityStats) {
		cityStr = cityStr + x + "=";
		cityStr = cityStr + this.cityStats[x] + ",";
	}
	if (cityStr != '') {
		GM.debug("City stats : " + cityStr);
		GM.setLValue("CityStats", cityStr);
	}

	if (name && name != undefined) {
		if (minEl) {	
			GM.debug("Click on building " + minEl.getAttribute('sgtitle'));
			Player.Click(minEl);
			return true;
		}	
		GM.log("Can't find area " + name);
	} else {
		GM.debug("Don't need area");
		// just wanted cityStats
		this.navOK = true;
	}
	return false;	
},
// slowly, after a randomized time click a button
Click:function(button) {
	this.waitMilliSecs=4000+Math.random()*2000;
	nHtml.Click(button);
},
UnsafeClick:function(obj) {
	nHtml.setTimeout(function() {
		if (obj.getAttribute('onclick') 