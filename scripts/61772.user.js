// ==UserScript==
// @name           Castle Age Autoplayer
// @namespace      zynga
// @description    Auto player for zynga's castle age game
// @version        49.1
// @include        http*://apps.*facebook.com/castle_age/*
// @include        http://www.facebook.com/common/error.html
// ==/UserScript==

if(!GM_log) {
	GM_log=console.debug;
}

var thisVersion = 49.1;
var fastLoad=false;
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

// this object contains general methods for wading through the DOM and dealing with HTML

var nHtml={
FindByAttrContains:function(obj,tag,attr,className) {
	if(attr=="className") { attr="class"; }
	var q=document.evaluate(".//"+tag+
		"[contains(@"+attr+",'"+className+
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


// this is the main object for the game, containing all methods, globals, etc.

Zynga={
stats:{},
totalJobs:0,
lastReload:new Date(),
autoReloadMilliSecs:15*60*1000,

levelRe:new RegExp('Level\\s*:\\s*([0-9]+)','i'),
rankRe:new RegExp(',\\s*level\\s*:?\\s*[0-9]+\\s+([a-z ]+)','i'),
armyRe:new RegExp('My Army\\s*\\(?([0-9]+)','i'),
staminaRe:new RegExp('([0-9\\.]+)\\s*/\\s*([0-9]+)','i'),
htmlJunkRe:new RegExp("\\&[^;]+;","g"),
energyRe:new RegExp("([0-9]+)\\s+(energy)","i"),
gameNameRe:new RegExp("^/([^/]+)/"),
experienceRe:new RegExp("\\+([0-9]+)"),
gainLevelRe:new RegExp("gain\\s+level\\s+([0-9]+)\\s+in","i"),
moneyRe:new RegExp("\\$([0-9,]+)\\s*-\\s*\\$([0-9,]+)","i"),
firstNumberRe:new RegExp("([0-9]+)"),
gameName:null,

GameName:function() {
	if(this.gameName!=null) { return this.gameName; }
	var m=this.gameNameRe.exec(window.location.pathname);
	if(m) { 
		this.gameName=m[1];
		return m[1]; 
	}
	GM_log('Error unknown game:'+window.location.pathname);
	return null;
},

// use these to log stuff
GMLog:function(mess) {
	GM_log(this.GameName()+":"+mess);
},
GMDebug:function(mess) {
	if(debug) { this.GMLog(mess); }
},

// use these to set/get values in a way that prepends the game's name
GMSetValue:function(n,v) {
	return GM_setValue(this.GameName()+"__"+n,v);
},
GMGetValue:function(n,v) {
	return GM_getValue(this.GameName()+"__"+n,v);
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


//////////////////////////////
NumberOnly:function(num) {
	var numOnly=parseFloat(num.replace(/[^0-9\.]/g,""));
	return numOnly;
},
RemoveHtmlJunk:function(html) {
	return html.replace(this.htmlJunkRe,'');
},

GetStatusNumbers:function(node) {
	var txt=nHtml.GetText(node);
	var staminam=this.staminaRe.exec(txt);
	if(staminam) {
		return {'num':parseInt(staminam[1]),'max':parseInt(staminam[2])};
	} else {
		this.GMLog('Cannot find status:'+txt);
	}
	return null;
},
GetRankStat:function() {
	var attrDiv =nHtml.FindByAttrContains(document.body,"div","class",'keep_stat_title');
	if (attrDiv) {
		var txt = nHtml.GetText(attrDiv);
		var levelm=this.rankRe.exec(txt);
		if (levelm) {
			var rank = this.rankTable[levelm[1].toString().toLowerCase().trim()];
			if (rank != undefined) {
				this.stats['rank']=rank;
				this.GMSetValue('MyRank',this.stats.rank);
				this.JustDidIt('MyRankLast');
			} else {
				this.GMLog("Unknown rank " + rank + ':' + levelm[1].toString());
			}
			//this.GMLog("Found rankRe " + levelm[1].toString() + ' ' + this.stats.rank);
		} else {
			if (this.currentTab == 'keep') {
				this.GMLog("Can't find rankRe in " + txt);
			}
		}
	} else {
		if (this.currentTab == 'keep') {
			this.GMLog("Can't find keep_stat_title on keep page");
		}
	}
},
GetStats:function() {
	this.stats={};
	var isKidsGame=this.IsKidsGame();
	
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
		this.GMLog('Could not find health');
		this.waitMilliSecs=5000;
		this.needReload = true;
	}

	this.stats.stamina = null;		
	// stamina
	var stamina=nHtml.FindByAttrContains(document.body,"span","id",'_current_stamina');
	var staminaMess='';
	if(!stamina) {
		stamina=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_stamina') and not(contains(@id,'stamina_time'))");
		//stamina=nHtml.FindByAttrContains(document.body,"span","id",'_stamina');
	}
	if(stamina!=null) {
		this.stats['stamina']=this.GetStatusNumbers(stamina.parentNode);
		if(this.stats.stamina) {
			staminaMess="Stamina: "+this.stats.stamina.num;
		}
	} else {
		this.GMLog('Could not find stamina');
		this.waitMilliSecs=5000;
	}

	var energyMess='';
	// castle age...
	var energy=nHtml.FindByAttrContains(document.body,"span","id",'_current_energy');
	if(!energy) {
		energy=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_energy') and not(contains(@id,'energy_time'))");
	}
	if(energy!=null) {
		this.stats['energy']=this.GetStatusNumbers(energy.parentNode);
		if(this.stats.energy!=null) {
			energyMess="Energy: "+this.stats.energy.num;
		}
	} else {
		this.GMLog('Could not find energy');
		this.waitMilliSecs=5000;
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
		} else {
			this.GMLog('Could not find level re');
		}
	} else {
		this.GMLog('Could not find level obj');
	}

	this.stats['rank']=parseInt(this.GMGetValue('MyRank'));


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
			this.GMLog("Can't find armyRe in " + txt);
		}			
	} else {
		this.GMLog("Can't find main_bntp stats");
	}
	
	
	// special forces(..._user_cash)
	var cashObj=nHtml.FindByAttrContains(document.body,"span","id",'_user_cash');
	if(!cashObj && isKidsGame) {
		// robhood,etc.
		cashObj=nHtml.FindByAttrContains(document.body,"span","id",'_cur_cash');
	}
	if(!cashObj) {
		// vampire wars.
		cashObj=nHtml.FindByAttrContains(document.body,"div","id",'_current_cash');
	}

	if(!cashObj && this.IsVikingGame()) {
		// viking clan
		cashObj=nHtml.FindByAttrContains(document.body,"span","id",'_cash');
	}
	if(!cashObj) {
		// piratesrule
		cashObj=nHtml.FindByAttrContains(document.body,"a","href",'nav=status_button_cash');
		if(cashObj) { cashObj=cashObj.parentNode; }
	}
	
	if(!cashObj) {
		cashObj=nHtml.FindByClassName(document.body,"strong","money");
	}
	if(!cashObj) {
		// school of magic
		cashObj=nHtml.FindByAttrContains(document.body,"span","className",'money');
		if(cashObj) {
			cashObj=cashObj.parentNode.parentNode;
		}
	}
	if(!cashObj || this.GameName()=="streetracinggame") {
		// streetracinggame
		cashObj=nHtml.FindByAttrXPath(document.body,"strong","contains(string(),'$')");
	}
	var numberRemoveRe=new RegExp('\\s*([0-9,\\s*]+)\\s*\\S+');
	if(cashObj) {
		var cashTxt=nHtml.GetText(cashObj);
		if(this.IsVikingGame()) {
			var m=numberRemoveRe.exec(cashTxt);
			if(m && m.length>0) {
				cashTxt=m[1];
			}
		}
		var cash=this.NumberOnly(cashTxt);
		this.stats.cash=cash;
		
		var moneyMessDiv=document.getElementById('autozynga_money_mess');
		if(moneyMessDiv) { moneyMessDiv.innerHTML="Money $"+cash+" "+staminaMess+" "+healthMess+" "+energyMess+" "+levelMess+" "+armyMess; }
	} else {
		this.GMLog('Could not find cash');
	}

	// return true if castle age is probably working
	return cashObj || (health!=null);
},
SetMessage:function(mess) {
	this.SetupDivs();
	var d=document.getElementById('autozynga_mess');
	if(d) { d.innerHTML=mess; }
},
SetFightMessage:function(mess) {
	this.SetupDivs();
	var d=document.getElementById('autozynga_fight_mess');
	if(d) { d.innerHTML=mess; }
},
SetHospitalMessage:function(mess) {
	this.SetupDivs();
	var d=document.getElementById('autozynga_hospital_mess');
	if(d) { d.innerHTML=mess; }
},

SetJobControl:function(mess) {
	this.SetupDivs();
	var d=document.getElementById('autozynga_job_control');
	if(d) { d.innerHTML=mess; }
},
SetControl:function(mess) {
	this.SetupDivs();
	var d=this.GetControlDiv();
	if(d) { d.innerHTML=mess; }
},
GetControlDiv:function() {
	return document.getElementById('autozynga_control');
},

SetupDivs:function() {
	if(document.getElementById('autozynga_div')) {
		return false;
	}
	var div=document.createElement('div');
	div.id='autozynga_div';
	div.style.padding='4px';
	div.style.border='2px solid #444';
	div.style.background='#fff';
	div.style.color='#000';
	div.style.float='right';

	var controlDiv=document.createElement('div');
	controlDiv.id='autozynga_control';
	var jobControlDiv=document.createElement('div');
	jobControlDiv.id='autozynga_job_control';

	var messDiv=document.createElement('div');
	messDiv.id='autozynga_mess';
	var moneyMessDiv=document.createElement('div');
	moneyMessDiv.id='autozynga_money_mess';
	var fightMessDiv=document.createElement('div');
	fightMessDiv.id='autozynga_fight_mess';
	var hospitalMessDiv=document.createElement('div');
	hospitalMessDiv.id='autozynga_hospital_mess';

	div.appendChild(messDiv);
	div.appendChild(fightMessDiv);
	div.appendChild(moneyMessDiv);
	div.appendChild(hospitalMessDiv);
	div.appendChild(jobControlDiv);
	div.appendChild(controlDiv);

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
			this.GMLog('cannot find app div');
		}
	}

	return true;
},


IsVikingGame:function() {
	var pathname=location.pathname;
	if(pathname.substring(pathname.length-7)=="/quests" || pathname.substring(pathname.length-7)=="/battle") {
		return true;
	}
	return false;
},

IsOldGame:function() {
	var pathname=location.pathname;
	if(pathname.substring(pathname.length-8)=="/actions" 
	|| pathname.substring(pathname.length-6)=="/fight"
	|| pathname.substring(pathname.length-8)=="/banking"
	|| pathname.substring(pathname.length-7)=="/invest"
	) {
		return true;
	}
	return false;
},

kidsGames:{
	'mafiosowar':1,
	'robhood':1,
	'itsfashion':1,
	'secretagents':1
},
IsKidsGame:function() {
	var gameName=this.GameName();
	if(this.kidsGames[gameName]) { return true; }
	return false;
},

//////////////////////////

GetJobs:function() {
	var jobs={};
	var gameName=this.GameName();

	var table=nHtml.FindByAttr(document.body,"table","className",'quests_layout');
	var jobLists=[];
	if(!table) {
		return jobs;
	}
	
	this.GMLog('here');
	
	var ss=document.evaluate(".//div[contains(@class,'quests_background')]",table,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	
	if (ss.snapshotLength == 0) {
		this.GMLog("Failed to find quests_background");
	}
	this.GMLog('here2');
	
	var jobsAdded = 0;
	for(var s=0; s<ss.snapshotLength; s++) {
		var div=ss.snapshotItem(s);
		
		if(!nHtml.FindByAttr(div,"div","className","quest_desc")) {
		if(!nHtml.FindByAttr(div,"div","className","quest_sub_title")) {
			this.GMLog("Can't find quest description or sub-title");
			continue;
		}
		}

		var job_name=null;
		var reward=null;
		var energy=null;
		var experience=null;
		
		var divTxt=nHtml.GetText(div);
		
		var item_title=nHtml.FindByAttrXPath(div,'div',"@class='quest_desc' or @class='quest_sub_title'");
		if(item_title) {
			if (!item_title.innerHTML.toString().match(/LOCKED/)) {
				var firstb=item_title.getElementsByTagName('b')[0];
				if (firstb) {
					job_name=nHtml.StripHtml(firstb.innerHTML.toString()).trim();
				} else {
					this.GMLog("Can't get bolded member out of " + item_title.innerHTML.toString());
					continue;
				}
			} else {
				continue;
			}
		} else {
			this.GMLog("Can't find item_title");
			continue;
		}

		var expM=this.experienceRe.exec(divTxt);
		if(expM) { experience=this.NumberOnly(expM[1]); }
		else {
			var expObj=nHtml.FindByAttr(div,'div','className','job_experience');
			if(expObj) {
				experience=(this.NumberOnly(nHtml.GetText(expObj)));
			} else {
				this.GMLog('cannot find experience:'+job_name);
			}
		}

		if(!job_name) {
			this.GMLog('no job name for this row'+div.innerHTML);
			continue;
		}

		if((idx=job_name.indexOf('<br>'))>=0) {
			job_name=job_name.substring(0,idx);
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
			this.GMLog('cannot find energy for job:'+job_name);
			continue;
		}

		var moneyTxt=null;
		
		var m=this.moneyRe.exec(this.RemoveHtmlJunk(divTxt));
		if(m) {
			var rewardLow=this.NumberOnly(m[1]);
			var rewardHigh=this.NumberOnly(m[2]);
			reward=(rewardLow+rewardHigh)/2;
		} else {
			this.GMLog('no money found:'+job_name+' in ' + divTxt);
		}
		
		var a=nHtml.FindByAttr(div,"input","name",/^Do/);
		if(!a) {
			this.GMLog('no button found:'+job_name);
			continue;
		}
		
		jobs[job_name]={
			'click':a,'tr':div,
			'energy':energy,'reward':reward,
			'experience':experience
		};
		
		jobsAdded++;
		
	}
	return jobs;
},
SetAutoJob:function(job_name,job_energy) {
	this.GMSetValue('AutoJob',job_name);
	this.GMSetValue('AutoJobEnergy',job_energy);
},
GetAutoJob:function() {
	var name=this.GMGetValue('AutoJob','');
	var energy=parseInt(this.GMGetValue('AutoJobEnergy',0));
	return { 'name':name,'energy':energy};
},

IsEnoughEnergyForAutoJob:function() {
	var waitUntilFull=this.GMGetValue('WaitUntilFull',0);
	var waitWasFull=this.GMGetValue('WaitEnergyWasFull',0);
	var autoJobObj=this.GetAutoJob();
	if(!this.stats.energy) { return false; }
	var waitMax = Math.min(this.stats.energy.max-1,Math.max(46,Math.min(96,autoJobObj.energy*3))+Math.random()*8);
	if(!waitUntilFull || waitWasFull) {
		if(autoJobObj.energy>0 && this.stats.energy.num>=autoJobObj.energy) {
			return true;
		}
		if (autoJobObj.energy>0 && waitWasFull) {
			this.GMSetValue('WaitEnergyWasFull',0);
		}
	} else if(this.stats.energy.num>=waitMax) {
		this.GMSetValue('WaitEnergyWasFull',1);
		return true;
	}
	return false;
},

IsEnoughStaminaForAutoFight:function() {
	var waitUntilFull=this.GMGetValue('WaitUntilFull',0);
	var waitWasFull=this.GMGetValue('WaitStaminaWasFull',0);
	var waitMax = Math.min(this.stats.stamina.max,5+Math.random()*3);
	if(!this.stats.stamina) { return false; }
	if(!waitUntilFull || waitWasFull) {
		if(this.stats.stamina.num > 0) {
			return true;
		}
	} else if(this.stats.stamina.num>=waitMax) {
		this.GMSetValue('WaitStaminaWasFull',1);
		return true;
	}
	return false;
},

DrawJobs:function(jobs,enableAutoJob) {
	if(jobs==null) { jobs=this.GetJobs(); }

	var gameName=this.GameName();
	var autoJobObj=this.GetAutoJob();

	for(var job_name in jobs) {
		var job=jobs[job_name];
		var x=nHtml.FindByAttr(job.tr,'div','className','autojob');
		if(x) {
			continue;
		}

		var div=document.createElement('div');
		div.className='autojob';
		div.style.fontSize='10px';
		div.innerHTML="$ per energy: "+
			(Math.floor(job.reward/job.energy*10)/10)+
			"<br />Exp per energy: "+
			(Math.floor(job.experience/job.energy*100)/100)+
			"<br />";

		if(autoJobObj.name==job_name) {
			var b=document.createElement('b');
			b.innerHTML="Current auto job";
			div.appendChild(b);
		} else if(enableAutoJob) {
			var setAutoJob=document.createElement('a');
			setAutoJob.innerHTML='Auto run this job.';
			setAutoJob.job_name=job_name;

			var job_nameObj=document.createElement('span');
			job_nameObj.innerHTML=job_name;
			job_nameObj.style.display='none';
			setAutoJob.appendChild(job_nameObj);
			
			var job_energyObj=document.createElement('span');
			job_energyObj.innerHTML=job.energy;
			job_energyObj.style.display='none';
			setAutoJob.appendChild(job_energyObj);
			setAutoJob.addEventListener("click",function(e) {
				var sps=e.target.getElementsByTagName('span');
				if(sps.length>0) {
					Zynga.SetAutoJob(sps[0].innerHTML.toString(),sps[1].innerHTML.toString());
					Zynga.Jobs();
				} else {
					this.GMLog('what did we click on?');
				}
			},false);
			div.appendChild(setAutoJob);
		}
		div.style.position='absolute';
		div.style.opacity=0.8;
		div.style.background='#888';
		job.click.parentNode.insertBefore(div,job.click);
	}
},

Jobs:function(getPage) {
	this.totalJobs=0;

	var gameName=this.GameName();
	var jobs=this.GetJobs();
	for(var job_name in jobs) {
		this.totalJobs++;
	}

	var autoJobObj=this.GetAutoJob();
	var autoJob=autoJobObj.name;
	
	if(this.totalJobs==0) {
		if(autoJob!="") {
			if(this.IsEnoughEnergyForAutoJob()) {
				this.VisitJobPage();
				return 'GoJobs';
			}
		}
		return null;
	}
	var page='jobs';
	this.DrawJobs(jobs,true);

	//~~~ get the sub page of the job
	if(getPage) { return page; }

	if(autoJob) {
		var waitUntilFull=this.GMGetValue('WaitUntilFull',0);
		var job=jobs[autoJob];
		var doAutoJob=false;

		var mess='';
		if(!job) {
			this.GMLog('Could not find job: '+autoJob);
			mess+='<br />Could not find job: '+autoJob+", make sure you have clicked into the correct mission page.";
		} else if(this.IsEnoughEnergyForAutoJob()) {
			doAutoJob=true;
		}
/*
		if(!waitUntilFull) {
			this.pageHasAutoJob=false;
			if(this.stats.energy.num>=job.energy) {
				this.GMLog(" energy:"+this.stats.energy.num+", max:"+this.stats.energy.max);
				doAutoJob=true;
			}
			
		} else if(this.stats.energy.num>=(this.stats.energy.max-1)) {
			this.pageHasAutoJob=false;
			this.GMLog(" energy:"+this.stats.energy.num+", max:"+this.stats.energy.max);
			doAutoJob=true;
		}
*/
		if(doAutoJob) {
			this.GMLog(': do auto job:'+autoJob);
			this.waitMilliSecs=10000;
			nHtml.setTimeout(function() {
				Zynga.Click(job.click);
			},1000);
		} else {
			this.SetMessage(mess+'Waiting for more energy:'+this.stats.energy.num+"/"+this.stats.energy.max+", job energy:"+(job?job.energy:""));
			// let's not waste the cpu if we're only waiting for the energy to recover.
			//this.waitMilliSecs=8000;
			return null;
		}
		return 'jobs';
	} else {
		this.SetMessage('');
//		this.SetControl('');
	}

	return null;
},


SetJobControls:function() {
	var controlHtml='';

	var autoJobObj=this.GetAutoJob();
	var autoJob=autoJobObj.name;
	if(autoJob) {
		controlHtml+="<a id='stopAutoJob' href='javascript:;'>Stop auto job: "+autoJob+"(energy: "+autoJobObj.energy+")"+"</a><br />";
	}
	this.SetJobControl(
		controlHtml
	);

	if(autoJob) {
		var stopA=document.getElementById('stopAutoJob');
		stopA.addEventListener('click',function() {
			Zynga.SetAutoJob('',0);
		},false);
	}
},
SetControls:function() {
	this.SetJobControls();

	var controlDiv=this.GetControlDiv();
	if(controlDiv && controlDiv.innerHTML.length>0) { 
		// we already have the controls
		return; 
	}
	
	var controlHtml='';
	var bankInstructions1="Minimum cash to have on hand, press tab to save";
	var bankInstructions2="Maximum cash to have on hand, bank anything above this, press tab to save(leave blank to disable)";
	var preferInstructions="List of user ids (numbers only) to help with their monsters first";
	var healthInstructions="Minimum to have before we visit the hospital, press tab to save(leave blank to disable): ";
	var userIdInstructions="User IDs(not user name).  Click with the right mouse button on the link to the users profile & copy link.  Then paste it here and remove everything but the last numbers. (ie. 123456789)";
	controlHtml+="<div id='AutoZyngaPaused' style='display: none'><b>Paused on mouse click.</b><br /><a href='javascript:;' id='AutoZyngaRestart' ><img title='' src='http://photos-c.ak.fbcdn.net/hphotos-ak-snc3/hs002.snc3/10938_102715483081238_100000283613396_72539_5750859_s.jpg' /></a></div>";
	controlHtml+="<img title='"+bankInstructions1+"' src='http://photos-e.ak.fbcdn.net/hphotos-ak-snc3/hs002.snc3/10938_102715479747905_100000283613396_72538_6622130_s.jpg' /><input type='text' id='MinInCash' title='"+bankInstructions1+"' />";
	controlHtml+="<br /><img title='"+bankInstructions2+"' src='http://photos-f.ak.fbcdn.net/hphotos-ak-snc3/hs022.snc3/10938_102715476414572_100000283613396_72537_6754501_s.jpg' /><input type='text' id='MinToBank' title='"+bankInstructions2+"' /><br />";
	controlHtml+="<img title='' src='http://photos-c.ak.fbcdn.net/hphotos-ak-snc3/hs002.snc3/10938_102715063081280_100000283613396_72494_1289897_s.jpg' />: <img title='"+healthInstructions+"' src='http://mwdirectfb10.static.zynga.com/mwfb/graphics/icon_health_16x16_01.gif' /><input type='text' id='MinToHospital' size='3' title='"+healthInstructions+"' /> Version: " + thisVersion + "<br />";
	controlHtml+="<img src='http://mwdirectfb10.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif' />";
	controlHtml+="<input type='checkbox' id='WaitUntilFull' /><img title='' src='http://photos-f.ak.fbcdn.net/hphotos-ak-snc3/hs022.snc3/10938_102714449748008_100000283613396_72491_65256_s.jpg' /><br />";
	controlHtml+="<input type='checkbox' id='AutoZyngaFightTargetFM'  "+(this.GetFightTarget()=="freshmeat"?"checked":"")+" />Fresh Meat or UserIDs";
	controlHtml+="<textarea title='"+userIdInstructions+"' type='text' id='AutoZyngaFightTarget' rows='6'>"+this.GetFightTarget()+"</textarea>";
	controlHtml+="<br><input type='checkbox' id='AutoZyngaFightMonster'  "+(this.GetFightMonster()?"checked":"")+" /><img title='' src='http://photos-h.ak.fbcdn.net/hphotos-ak-snc3/hs022.snc3/10938_102714433081343_100000283613396_72486_7343873_s.jpg' />"+
		"<br />";
	controlHtml+="<input type='checkbox' id='AutoZyngaElite'  "+(this.GetAutoElite()?"checked":"")+" /><img title='' src='http://photos-h.ak.fbcdn.net/hphotos-ak-snc3/hs022.snc3/10938_102713663081420_100000283613396_72473_6561587_n.jpg' />"+
		"<br />";
	controlHtml+="<img title='' src='http://photos-f.ak.fbcdn.net/hphotos-ak-snc3/hs022.snc3/10938_102714429748010_100000283613396_72485_8216927_s.jpg' /> <select id='AutoZyngaBless'><option>" + this.GetAutoBless() + "<option>energy<option>attack<option>defense<option>stamina<option>health<option>none</select>"+
		"<br />";
	controlHtml+="<img title='' src='http://photos-b.ak.fbcdn.net/hphotos-ak-snc3/hs022.snc3/10938_102716103081176_100000283613396_72667_1476232_s.jpg' />: <input type='text' id='PreferMonsterBy' title='"+preferInstructions+"' /><br />";
		"<br />";
	controlHtml+="<input type='checkbox' id='AutoZyngaDisabled' /><img title='' src='http://photos-d.ak.fbcdn.net/hphotos-ak-snc3/hs022.snc3/10938_102714446414675_100000283613396_72490_8052149_s.jpg' /><br /><br />";
	controlHtml+="<img title='' src='http://photos-f.ak.fbcdn.net/hphotos-ak-snc3/hs022.snc3/10938_102716083081178_100000283613396_72665_4533635_s.jpg' /><br />";
	if (newVersionAvailable) {
		controlHtml+="<a href='http://userscripts.org/scripts/source/" +SUC_script_num+".user.js'>Install new autoplayer version!</a>";
	}
	this.SetControl(
		controlHtml
	);

	var waitUntilFullBox=document.getElementById('WaitUntilFull');
	var waitUntilFull=this.GMGetValue('WaitUntilFull',0);
	waitUntilFullBox.checked=waitUntilFull?true:false;
	waitUntilFullBox.addEventListener('change',function(e) {
		Zynga.GMSetValue('WaitUntilFull',e.target.checked?1:0);
	},false);

	var preferMon=document.getElementById('PreferMonsterBy');
	if(preferMon!=undefined) {
		preferMon.value=this.GMGetValue('PreferMonsterBy','');
		preferMon.addEventListener('change',function(e) {
			Zynga.GMSetValue('PreferMonsterBy',e.target.value);
		},false);
	}
	var minToBank=document.getElementById('MinToBank');
	if(minToBank!=undefined) {
		minToBank.value=this.GetMinToBank().toString();
		minToBank.addEventListener('change',function(e) {
			Zynga.GMSetValue('MinToBank',e.target.value);
		},false);
	}
	var minInCash=document.getElementById('MinInCash');
	if(minInCash!=undefined) {
		minInCash.value=this.GetMinInCash().toString();
		minInCash.addEventListener('change',function(e) {
			Zynga.GMSetValue('MinInCash',e.target.value);
		},false);
	}
	var minToHospital=document.getElementById('MinToHospital');
	if(minToHospital!=undefined) {
		minToHospital.value=this.GetMinToHospital().toString();
		minToHospital.addEventListener('change',function(e) {
			Zynga.GMSetValue('MinToHospital',e.target.value);
		},false);
	}

	var disabledBox=document.getElementById('AutoZyngaDisabled');
	disabledBox.checked=this.GetGameDisabled()?true:false;
	disabledBox.addEventListener('change',function(e) {
		Zynga.GMSetValue('disabled',e.target.checked);
	},false);

/*	
	var divAtBottom=document.getElementById('DivAtBottom');
	divAtBottom.checked=this.GetDivAtBottom()?true:false;
	divAtBottom.addEventListener('change',function(e) {
		Zynga.GMSetValue('DivAtBottom',e.target.checked);
	},false);
*/

	var fightTarget=document.getElementById('AutoZyngaFightTarget');
	fightTarget.addEventListener('change',function(e) {
		Zynga.SaveFightTarget();
	},false);

	var fightMon=document.getElementById('AutoZyngaFightMonster');
	fightMon.addEventListener('change',function(e) {
		Zynga.GMSetValue('FightMonster',e.target.checked);
	},false);

	var fightMon=document.getElementById('AutoZyngaElite');
	fightMon.addEventListener('change',function(e) {
		Zynga.GMSetValue('AutoElite',e.target.checked);
	},false);

	var autoBless=document.getElementById('AutoZyngaBless');
	autoBless.addEventListener('change',function(e) {
		if (e.target.selectedIndex > 0) {
			Zynga.GMLog('change: setting autobless to ' + e.target.options[e.target.selectedIndex].value);
			Zynga.GMSetValue('AutoBless',e.target.options[e.target.selectedIndex].value);
			e.target.options[0].value = e.target.options[e.target.selectedIndex].value;
		}
	},false);

	var fightTargetFM=document.getElementById('AutoZyngaFightTargetFM');
	fightTargetFM.addEventListener('change',function(e) {
		fightTarget.value=fightTargetFM.checked?"freshmeat":"";
		Zynga.SaveFightTarget();
	},false);

	var autoZyngaRestart=document.getElementById('AutoZyngaRestart');
	var autoZyngaPaused=document.getElementById('AutoZyngaPaused');
	autoZyngaRestart.addEventListener('click',function(e) {
		autoZyngaPaused.style.display='none';
		Zynga.currentTab = "";
		Zynga.waitMilliSecs = 3000;
		Zynga.ReloadOccasionally();
		Zynga.WaitCheckPage();
	},false);
	
	controlDiv.addEventListener('mousedown',function(e) {
		nHtml.clearTimeouts();
		autoZyngaPaused.style.display='block';
	},false);
	
},

SaveFightTarget:function() {
	var fightTarget=document.getElementById('AutoZyngaFightTarget');
	Zynga.GMSetValue('FightTarget',fightTarget.value);
},


VisitJobPage:function() {
	var content=document.getElementById('content');
	if(!content) { return false; }

	this.GMSetValue('GoJobs',0);
	// schoolofmagic: href=/actions
	// streetracing: onclick=jobs.php
	if(this.totalJobs>0) { 
		// we're already in the job page.
		return false; 
	}
	
	var a=nHtml.FindByAttrContains(content,'a','href','quests.php');

	if(!a) {
		this.GMLog(' Could not find job link');
		return false;
	}

	this.GMLog('VisitJob'+","+a.href);
	this.waitMilliSecs=12000;
	nHtml.setTimeout(function() {
		Zynga.Click(a);
	},2000);
	return true;
},

///////////////////////////////////////////////////////

SelectMaxProperties:function(row) {
	var selects=row.getElementsByTagName('select');
	if(selects.length<1) { return false; }
	
	var select=selects[0];
	select.selectedIndex=select.options.length-1;
	
	return true;
},

PropertiesGetNameFromRow:function(row) {
	// schoolofmagic, etc. <div class=item_title
	var infoDiv=nHtml.FindByAttrXPath(row,'div',"contains(@class,'land_buy_info') or contains(@class,'item_title')");
	if(!infoDiv) {
		this.GMLog("can't find land_buy_info");
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
IterateProperties:function(func) {
	var content=document.getElementById('content');
	var ss=document.evaluate(".//tr[contains(@class,'land_buy_row')]",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if (!ss || (ss.snapshotLength == 0)) {
		// this.GMLog("Can't find land_buy_row"); 
		return null;
	}
	var builtOnRe=new RegExp('(Built On|Consumes|Requires):\\s*([^<]+)','i');
	var propByName={};
	var propNames=[];

	var gameName=this.GameName();
	//this.GMLog('forms found:'+ss.snapshotLength);
	for(var s=0; s<ss.snapshotLength; s++) {
		var row=ss.snapshotItem(s);
		if(!row) { continue; }

		var div=nHtml.FindByAttrXPath(row,'div',"contains(@class,'AutoZynga_propDone')");
		if(div) { continue; }

		var name=this.PropertiesGetNameFromRow(row);

		if(name==null || name=='') { this.GMLog("Can't find property name"); continue; }

		var moneyss=document.evaluate(".//*[contains(@class,'gold') or contains(@class,'currency')]",row,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

		if(moneyss.snapshotLength < 2) { this.GMLog("Can't find 2 gold instances"); continue; }

		div=document.createElement('div');
		div.className='AutoZynga_propDone';
		div.style.display='none';
		moneyss.snapshotItem(0).appendChild(div);

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
					//this.GMLog('Cannot find income for: '+name+","+income.textContent);
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
			this.GMLog("Can't find income or cost for " + name);
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

BuyProperty:function(prop) {
	if(prop.builtOn!=null && prop.builtOn.builtOn==null) {
		// need to build something first.
		return this.BuyProperty(prop.builtOn);
	}
	var button=nHtml.FindByAttrXPath(row,'input',"@type='submit' or @type='image'");
	if(button) {
		this.waitMilliSecs=13000;
		this.Click(button);
		return true;
	}
	return false;
},

DrawProperties:function() {
	var bestProp={};
	var propByName=this.IterateProperties(function(prop) {
		this.SelectMaxProperties(prop.row);

		var div=document.createElement('div');
		div.style.display='inline';
		div.className='AutoZynga_costCalc';
		var roi=(parseInt((prop.income/prop.totalCost)*240000) /100);
		div.innerHTML=roi+"% per day.";

		if(!prop.usedByOther) {
			if(!bestProp.roi || roi>=bestProp.roi) {
				bestProp.roi=roi;
				bestProp.prop=prop;
			}
		}
		
		var infoDiv=nHtml.FindByAttrXPath(prop.row,'div',"contains(@class,'land_buy_info')");
		if(!infoDiv) {
			var st=prop.row.getElementsByTagName('td');
			if(st && st.length>=2) {
				infoDiv=st[1];
			}
		}
		if(!infoDiv) {
			this.GMLog("Cannot find place to insert property price");
			return;
		}
		infoDiv.insertBefore(div,infoDiv.childNodes[0]);
	});

	return null;
},
Properties:function() {
	var autoBuyProperty=this.GMGetValue('autoBuyProperty',0);
	if(autoBuyProperty) {
//~~~ Need to check for enough moneys + do we have enough of the builton type that we already own.
//		this.BuyProperty(bestProp.prop);
	}
	return null;
},

///////////////////////////////////////////////////////

VisitBankPage:function() {
	this.VisitTabPage('keep');	
	return true;
},

GetMinToBank:function() {
	var n=this.GMGetValue('MinToBank','');
	if(n==null || n=='') { return ''; }
	return parseInt(n);
},
GetMinInCash:function() {
	var n=this.GMGetValue('MinInCash','');
	if(n==null || n=='') { return 0; }
	return parseInt(n);
},

Bank:function() {
	var minToBank=this.GetMinToBank();
	var minInCash=this.GetMinInCash();

	if(minToBank=="") {
		return null;
	}

	if(this.stats.cash<=minInCash || this.stats.cash<minToBank) {
		return null;
	}

	var content=document.getElementById('content');	
	var depositButton=nHtml.FindByAttrContains(content,'input','src','btn_stash.gif');

	if(!depositButton) {
		// Cannot find the link
		this.VisitBankPage();
		return "GoDeposit";
	}

	var depositForm = depositButton.form;
	
	var numberInput=nHtml.FindByAttrXPath(depositForm,'input',"@type='' or @type='text'");
	if(numberInput) {
		numberInput.value=parseInt(numberInput.value)-minInCash;
	} else {
		this.GMLog('Cannot find box to put in number for bank deposit.');
	}

	this.GMLog('Deposit');
	this.Click(depositButton);
	return 'Deposit';	
},

///////////////////////////////////////////////////////
// Fight


GetFightMonster:function() {
	return this.GMGetValue('FightMonster',false);
},
GetAutoElite:function() {
	return this.GMGetValue('AutoElite',false);
},
GetAutoBless:function() {
	return this.GMGetValue('AutoBless','none');
},
GetFightTarget:function() {
	return this.GMGetValue('FightTarget',"");
},
VisitFightPage:function(force) {
	if(!force && this.IsFightPage()) { return false; }
	return this.VisitTabPage('battle');
},
HaveTabPage:function(tabname) {
	var content=document.getElementById('content');
	if (!content) { return false; }

	var pageLink=nHtml.FindByAttrContains(content,'a','href','/' + tabname + '.php');
	if (!pageLink) { 
		return false; 
	}
	return true;
},
VisitTabPage:function(tabname) {
	var content=document.getElementById('content');
	if (!content) { return false; }

	var pageLink=nHtml.FindByAttrContains(content,'a','href','/' + tabname + '.php');
	if (!pageLink) { 
		this.GMLog("Can't find page tab for " + tabname);
		return false; 
	}
	this.Click(pageLink);
	this.currentTab=tabname;
	return true;
},
userRe:new RegExp("(userId=|user=|/profile/)([0-9]+)"),
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
			var fightTarget=document.getElementById('AutoZyngaFightTarget');
			if(fightTarget.value=="freshmeat") { fightTarget.value=''; }
			if(fightTarget.value!="") { fightTarget.value+="\n"; }
			fightTarget.value+=user;
			Zynga.SaveFightTarget();
		},false);
		userLink.parentNode.insertBefore(addFight,userLink.nextSibling);
		userLink.parentNode.insertBefore(document.createTextNode(' '),userLink.nextSibling);
	});
},

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
				this.GMLog('inp.name is:' + inp.name);
			}
		}
		if(fightForm) { break; }
	}
	
	return fightForm;
},

fightLinkXPath:"(contains(@onclick,'xw_controller=fight') and contains(@onclick,'xw_action=attack')) "+
	"or contains(@onclick,'directAttack')"+
	"or contains(@onclick,'_fight_fight(')",
HasAttackButtons:function() {
	var fightForm=this.FindFightForm(document);

	if(!fightForm) {
		// inthemafia
		fightForm=nHtml.FindByAttrXPath(document,"a",this.fightLinkXPath);
	}
	if(!fightForm) {
		// castle_age
		fightForm=nHtml.FindByAttrXPath(document,"input","contains(@src,'battle_01')");
		if(!fightForm) {
			// castle_age
			fightForm=nHtml.FindByAttrXPath(document,"img","contains(@src,'battle_01')");
		}
	}
	return fightForm?true:false;
},

IsFightPage:function() {
	if(this.HasAttackButtons()) { return true; }
	var fightForm=nHtml.FindByAttrXPath(document,"table","contains(@class,'fight_table')");
	return fightForm?true:false;
},

opponentIdRe:new RegExp('opponent_id=([0-9]+)','ig'),
FightUserId:function(userid) {
	if(this.VisitFightPage()) { return 'fightpage'; }
	this.GMLog('Fight user:'+userid);
	
	var fightForm=this.FindFightForm(document,true);

	if(fightForm && (userid > 0)) {
		this.GMLog('Found fightForm');
		var inp=nHtml.FindByAttrXPath(fightForm,"input","@name='target_id'");
		if(!inp) {
			this.GMLog('no target_id in attack form');
			return null;
		}
		inp.value=userid;

		var button=nHtml.FindByAttrXPath(fightForm,"input","@type='image'");
		if(button) {
			this.GMLog('Fight user button:'+button.name);
			this.lastFightID=userid;
			Zynga.Click(button);
		} else {
			this.GMLog('No submit button?:'+button.name);
			return null;
		}
		return 'fight';
	}

	return null;
},
rankTable:{'acolyte':0, 'scout': 1,'soldier': 2,'elite soldier': 3,'squire': 4,'knight': 5,'first knight': 6,'legionnaire': 7,'centurion': 8,'champion': 9,'lieutenant commander':10,'commander':11,'high commander':12,'lieutenant general':13,'general':14,'high general':15},
fightLevelRe:new RegExp('Level ([0-9]+)\\s*([A-Za-z ]+)','i'),
FightFreshmeat:function() {
	var ss=document.evaluate("//input[contains(@src,'battle_01.gif')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	if(ss.snapshotLength<=0) {
		if (this.currentPage == 'fightpage') {
			this.GMLog('No battle buttons on fightpage');
		}
		this.VisitFightPage(true);
		return "fightpage";
	}
	
	var bestButton;
	var bestScore = -10000;
	var bestID = 0;
	//this.GMLog("my army/rank/level:" + this.stats.army + "/" + this.stats.rank + "/" + this.stats.level);
	for(var s=0; s<ss.snapshotLength; s++) {
		var button=ss.snapshotItem(s);

		var tr=button;
		while(tr.tagName.toUpperCase()!="TR") {
			tr=tr.parentNode;
		}

		if(!button) {
			this.GMLog('No tr parent of button?');
			continue;
		}

		var txt=nHtml.GetText(tr);
		var levelm=this.fightLevelRe.exec(txt);
		if (!levelm) {
			this.GMLog("Can't match fightLevelRe in " + txt);
			continue;
		}	
		var level=parseInt(levelm[1]);
		var rankStr=levelm[2].toLowerCase().trim();
		var rankInt = this.rankTable[rankStr];
		var army = 0;
		
		var subtd=document.evaluate("td",tr,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if (!subtd) {
			this.GMLog("Can't find army subtd below " + txt);
		} else {
			army = parseInt(nHtml.GetText(subtd.snapshotItem(2)).trim());
		}
		
		if (army == 0) {
			this.GMLog("Battle table changed... can't find army size");
		}
		
		// if we know our rank, and this guy's higher, don't fight
		if (this.stats.rank && (rankInt > this.stats.rank)) {
			continue;
		}

		// level doesn't matter much, since zynga adjusts the list for you
		var levelDiff = 20;		
		if (this.stats.rank == rankInt) {
			levelDiff = 5;
		} else if (this.stats.rank == (rankInt+1)) {
			levelDiff = 10;
		}

		// if we know our level, and this guy's higher level by levelDiff, don't fight
		if (this.stats.level && level > (this.stats.level+levelDiff)) {
			continue;
		}

		// scale down the army ratio if the rank is high... rank is the best indicator of toughness
		var armyRatio = 1.7;		
		if (this.stats.rank == rankInt) {
			armyRatio = 1.0;
		} else if (this.stats.rank == (rankInt+1)) {
			armyRatio = 1.4;
		}
		
		// if we know our army size, and this one's bigger, not safe
		if (this.stats.army && (army > (this.stats.army*armyRatio))) {
			continue;
		}

		var inp=nHtml.FindByAttrXPath(tr,"input","@name='target_id'");
		var id=inp.value;

		var dfl = this.GMGetValue('DontFight','');
		if (dfl.indexOf(','+id)>=0) {
			// don't fight people we recently lost to
			continue;
		}
		
		// passed safety tests... so pick a good fight
		// try to create a score which chooses a good battle-ranked payer while also
		// somewhat prioritizing an safer fight
		var thisScore = rankInt-((army/armyRatio)/this.stats.army);
		if (thisScore > bestScore) {
			//this.GMLog("best army/rank/level:" + army + "/" + rankInt + "/" + level);
			bestScore = thisScore;
			bestButton = button;
			bestID = id;
		}
	}

	if (bestButton != null) {
		this.GMLog('Found freshmeat score ' + bestScore + ' id ' + bestID);
		this.Click(bestButton);
		this.lastFightID = bestID;
		return 'fight';
	}
	
	this.GMLog('No safe targets.');
	this.VisitFightPage(true);
	this.waitMilliSecs=13000;
	return null;
},
Fight:function() {
	this.SetFightMessage("");
	var lastFight=this.GMGetValue('LastFight','').split(',');
	if(lastFight.length>1) {
		if(this.stats.stamina.num == lastFight[0]) {
			// we have the same health as before so the fight did not work.
			var nextFight=parseInt(lastFight[1])+(1*20*1000);
			var now=(new Date().getTime());
			if(now<nextFight) {
				this.SetFightMessage("<font style='font-size: 16pt'>No stamina lost in last fight, maybe the user is dead, let's wait "+Math.floor((nextFight-now)/1000)+" secs</font>");
				// not ready for the next fight yet.
				return null;
			}
		}
	}
	var f=this.DoFight();
	if(f=='fight') {
		// we fought someone, let's record it.
		this.GMSetValue('LastFight',this.stats.stamina.num+","+(new Date().getTime()).toString());
		this.waitMilliSecs=13000;
	} else {
		this.GMSetValue('LastFight','');
	}
	return f;
},
WhileSinceDidIt:function(name, seconds) {
	var now = (new Date().getTime());
	return (!this.GMGetValue(name) || (parseInt(this.GMGetValue(name)) < (now-1000*seconds)));
},
JustDidIt:function(name) {
	var now = (new Date().getTime());
	this.GMSetValue(name, now.toString());
},
NextFightTarget:function() {
	var fightUpto=this.GMGetValue('FightTargetUpto',0);
	this.GMSetValue('FightTargetUpto',fightUpto+1);
},
GetCurrentFightTarget:function() {
	var target=this.GetFightTarget();
	if(target=="") { return ""; }
	var targets=target.split(/[\n,]/);
	var fightUpto=this.GMGetValue('FightTargetUpto',0);
	fightUpto=fightUpto%targets.length;
	this.GMLog('nth fight target:'+fightUpto+':'+targets[fightUpto]);
	return targets[fightUpto];
},
DoFight:function() {
	if(!this.stats.stamina) {
		return null;
	}
	if(!this.stats.health) {
		return null;
	}
	if(this.stats.stamina.num<=0) {
		this.SetFightMessage("Waiting for more stamina");
		// drained to 0
		this.GMSetValue('WaitStaminaWasFull',0);
		return null;
	}
	if(this.stats.health.num<=10) {
		this.SetFightMessage("Need at least 10 health to fight");
		return null;
	}
	if(!this.IsEnoughStaminaForAutoFight()) {
		this.SetFightMessage("Waiting for stamina to be full");
		return null;
	}

	if(this.GetFightMonster()) {
		var button;
		
	        if (this.currentTab == "engage" && this.monsterID && this.monsterPool == 3 && this.stats.stamina.num >= 1 && this.WhileSinceDidIt('SiegeLastCheck', 60)) {
		  var siegeComplete = nHtml.FindByAttrContains(document.body, "img[contains(@src,'/monster_siege_6.jpg')]/parent::div/parent::div/parent::div/following-sibling::div/div/div", "style", "width: 100%");
		  this.JustDidIt('SiegeLastCheck');
		  if (siegeComplete) {
		    this.GMLog("Siege Complete");
		  } else {
		    this.GMLog("Participating in Siege");
		    Zynga.VisitUrl("http://apps.facebook.com/castle_age/battle_monster.php?user=" + this.monsterID + "&action=doObjective&mpool=" + this.monsterPool + "&lka=" + this.monsterID + "&twt=drg&ref=nf");
		    return "siege";
		  }
	        }		
		      
		if (this.stats.stamina.num>=5) {
			// power attack
			button = nHtml.FindByAttrContains(document.body,"input","src","attack_monster_button2.jpg");
			if (button) {
				this.GMLog("Attack monster power");
				Zynga.Click(button);
				return "monster2";
			}
		}
		
		button = nHtml.FindByAttrContains(document.body,"input","src","attack_monster_button.jpg");
		if (button) {
			// monster is there, but power attack didn't happen
			if (this.stats.stamina.max < 5) {
				// regular attack with less than 5 max stamina
				this.GMLog("Attack monster regular");
				Zynga.Click(button);
				return "monster1";
			}
			this.SetFightMessage("Waiting for power stamina");
			return null;
		}

		// search for ENGAGE button specifically, not "collect reward" button... user can do that manually
		var img = nHtml.FindByAttrContains(document.body,"img","src","dragon_list_btn_3");
		if (img) {
			button=img.parentNode;
		}

		var pref = this.GMGetValue('PreferMonsterBy','');
		if (pref) {
			var prefList=pref.split(',');
			for(var p in prefList) {
			    // xpath by Sparafucile
			    var img = nHtml.FindByAttrContains(document.body, "a[contains(@href,'battle_monster.php?user=" + prefList[p] + "')]/img", "src", "dragon_list_btn_3.jpg");
			    if (img) {
			      button = img.parentNode;
			      break;
			    }
			}
		}
				
		if (button) {
			if (button.tagName.toUpperCase()!="A") {
				this.GMLog("ERROR: parent node of engage button is " + button.tagName);
				button = null;
			}
		}
		
		if (button) {
			this.GMSetValue("MonsterAvailable", (new Date().getTime()).toString());

			var user = button.href.match(/user=\d+/i);
			if (user)
			  this.monsterID = String(user).substr(5);
			else
			  this.monsterID = null;

			var mpool = button.href.match(/mpool=\d+/i);
			if (mpool)
			  this.monsterPool = Number(String(mpool).substr(6));
			else
			  this.monsterPool = null;

			this.GMLog("Engaging Monster: ID " + this.monsterID + ", Pool " + this.monsterPool);
			this.GMLog("Engage monster");
			Zynga.Click(button);
			this.currentTab = "engage";
			return "mbattle";
		} else {
			if (this.currentTab == "battle_monster") {
				this.GMLog("No engage button");
			}
		}
		
		if (this.currentTab != "battle_monster") {
			if (this.WhileSinceDidIt('MonsterLastCheck',60)) {
				if (this.currentTab != "keep") {
					if (this.VisitTabPage('keep')) {
						return "keep";
					}
				}
				this.GMLog("Search for monster in " + this.currentTab);
				if (this.VisitTabPage('battle_monster')) {
					return "battle_monster";
				}
			}
		} else {
			// failed to find monster... don't check for a while, fall through to fighttargets
			this.JustDidIt('MonsterLastCheck');
		}
	}
	
	var target=this.GetCurrentFightTarget();
	if(target=="") { this.NextFightTarget(); return null; }

	this.GMLog('fighting ' + target);
	this.waitMilliSecs=13000;
	if(target!='freshmeat') {
		var f=this.FightUserId(target);
		if (f) {
			this.currentTab = f;
		}
		this.NextFightTarget();
		return f;
	}
	var f = this.FightFreshmeat();
	if (f) {
		this.currentTab = f;
	}
	return f;
},


///////////////////////////////////////////////////////
// hospital

GetMinToHospital:function() {
	var n=this.GMGetValue('MinToHospital','');
	if(n==null || n=='') { return ''; }
	return parseInt(n);
},

Hospital:function() {
	this.SetHospitalMessage("");
	var minToHospital=this.GetMinToHospital();
	if(minToHospital=="") {
		return null;
	}
	var health=this.stats.health;
	if(!health) { return null; }
	var lastHealthOnHeal=this.GMGetValue('LastHealthOnHeal',0);
	if(lastHealthOnHeal==health.num) {
		// nothing happened on 
		this.SetHospitalMessage("Health did not change after the last heal, maybe trying to heal too fast.");
		return null;
	}
	if(health.num>=health.max || health.num>minToHospital) {
		return null;
	}
	
	var content=document.getElementById('content');
	// mafia wars
	var healLink=nHtml.FindByAttrXPath(content,"a","contains(@onclick,'controller=hospital') and contains(@onclick,'action=heal')");
	if(!healLink) {
		// heal button castle age, gangwars, dragonwars, glamour_age
		var healForm=nHtml.FindByAttrXPath(content,"form","contains(@id,'_healForm') or contains(@id,'_hospital') or contains(@action,'hospital.php')");
		if(!healForm) {
			// robhood, etc.
			healForm=nHtml.FindByAttrXPath(content,'input',"@name='op' and @value='heal'");
			if(healForm) healForm=healForm.parentNode;
		}
		
		if(!healForm) {
			// street racing
			healForm=nHtml.FindByAttrXPath(content,'input',"contains(@name,'healthRefillNowBtn')");
			if(healForm) {
				while(healForm && healForm.tagName!="BODY") {
					if(healForm.tagName=="FORM") { break; }
					healForm=healForm.parentNode;
				}
				if(healForm.tagName!="FORM") {
					healLink=null;
				}
			}
		}
		var favor=null;
		if(healForm) favor=nHtml.FindByAttrXPath(healForm,'input',"@name='favor'");
		if(favor) {
			// don't spend favor points!
			healLink=healForm=null;
			this.GMLog("Will not heal cause we've found the wrong link.");
		} else if(healForm) {
			healLink=nHtml.FindByAttrXPath(healForm,"input","@type='button' or @type='submit' or @type='image'");
		}
	}
	if(!healLink) {
		return this.VisitHospitalPage();
	}
	this.GMLog('Heal');
	this.GMSetValue('LastHealthOnHeal',health.num);
	this.Click(healLink);
	this.waitMilliSecs=10000;
	return 'hospital';
},

VisitHospitalPage:function() {
	this.GMLog('Visit hospital');
	var content=document.getElementById('content');
	var hospitalLink=nHtml.FindByAttrXPath(content,"a","contains(@onclick,'keep.php')");
	if(!hospitalLink) {
		this.GMLog('Cannot find hospital link');
		return null;
	}
	this.waitMilliSecs=10000;
	this.Click(hospitalLink);
	return 'visithospital';
},



///////////////////////////////////////////////////////


GetGameDisabled:function() {
	return this.GMGetValue('disabled',false);
},
GetDivAtBottom:function() {
	return this.GMGetValue('DivAtBottom',false);
},
WaitCheckPage:function() {
	this.waitForPageChange=true;
	nHtml.setTimeout(function() { this.waitForPageChange=false; Zynga.CheckPage(); },this.waitMilliSecs);

},
deityTable:{'energy':1, 'attack': 2,'defense': 3,'health': 4,'stamina': 5},
currentPage:"",
currentTab:"",
waitMilliSecs:5000,
// this is the MAIN loop
CheckPage:function() {
	// assorted errors...
	var href=location.href;
	if(href.indexOf('/common/error.html')>=0) {
		this.GMLog('detected error page, waiting to go back to previous page.');
		window.setTimeout(function() {
			window.history.go(-1);
		}, 30*1000);
		return;
	}
	if(document.getElementById('try_again_button')) {
		this.GMLog('detected Try Again message, waiting to reload');
		// error
		window.setTimeout(function() {
			window.history.go(0);
		}, 30*1000);
		return;
	}

	// this.GMLog('castle game loop');
	var forceReload=false;
	var gameDisabled=this.GetGameDisabled();
	this.SetupDivs();
	this.AddFightLinks();
	if(!gameDisabled) {
		var ok="";
		this.waitMilliSecs=fastLoad?1000:5000;

		if (this.currentPage=='fight') {
			// if we lost, add to dontfight list
			var res = nHtml.FindByAttrContains(document.body,"div","class",'results');
			if (res) {
				var lost = nHtml.FindByAttrContains(res,"span","class",'negative');
				if (lost && this.lastFightID) {
					var dfl = this.GMGetValue('DontFight','');
					dfl = dfl + ',' + this.lastFightID;
					if (dfl.length > 50) {
						// just keep a few
						dfl = dfl.substring(dfl.indexOf(',',1))
					}
					this.GMSetValue('DontFight',dfl);
					this.GMLog("new dfl: " + dfl);
				}
			}
		}

		var goJobs=this.GMGetValue('GoJobs',0);
		if(goJobs) {
			this.GMLog('go to the jobs page cause we have reloaded');
			this.VisitJobPage();
			this.WaitCheckPage();
			return;
		}
		
		this.GetRankStat();	

		if (this.WhileSinceDidIt('MyRankLast',60*60)) {
			this.GMLog('visitng keep to get new rank');
			this.VisitTabPage('keep');
			this.WaitCheckPage();
			return;
		}		
		
		var gameOK=this.GetStats();
		this.SetControls();
		this.DrawProperties();

		var autoBless=this.GetAutoBless();
		if (autoBless!='none' && autoBless!='' && this.WhileSinceDidIt('OracleBlessing',60*60*6+Math.random()*60*60)) {
			var node=nHtml.FindByAttrContains(document.body,"img","src",'deity_' + autoBless + '.jpg');
			if (node) {
				nHtml.ClickNoWait(node);		// for display only			
				var index=this.deityTable[autoBless];			
				var node=nHtml.FindByAttrContains(document.body,"div","id",'symbol_displaysymbols'+index);
				if (node) {
					node=nHtml.FindByAttrContains(node,"input","src",'demi_bless_button');					
					if (node) {
						this.GMLog('click bless ' + autoBless);
						Zynga.Click(node);
						this.currentTab='blessed';
					}
				} else {
					this.GMLog('autobless cannot find symbol_displaysymbols'+index);	
				}
				this.JustDidIt('OracleBlessing');
			} else if (this.HaveTabPage('symbols')) {
				this.GMLog('visitng symbols for blessing');	
				this.VisitTabPage('symbols');
			} else {
				this.GMLog('visitng oracle for blessing');
				if(!this.VisitTabPage('oracle')) {
					this.GMLog('cannot find oracle page...ignore for a while');	
					this.JustDidIt('OracleBlessing');
				}
			}
			this.waitMilliSecs=13000;	
			this.WaitCheckPage();
			return;
		}

		var autoElite=this.GetAutoElite();
		if (autoElite!='') {	
			if ((this.GMGetValue('MyEliteTodo','').trim()=='' && this.WhileSinceDidIt('AutoEliteGetList',60*60*6)) ) {
				this.GMLog('load auto elite list');
				if (this.HaveTabPage('army_member')) {
					this.VisitTabPage('army_member');
				} else {
					this.VisitTabPage('army');
				}
				if (this.currentTab=='army_member') {
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
						this.GMSetValue('MyEliteTodo',armyList);
						this.JustDidIt('AutoEliteGetList');
					}
				}
				this.waitMilliSecs=13000;	
				this.WaitCheckPage();
				return;
			}

			if (String(window.location).indexOf('party.php')) {			
				var res=nHtml.FindByAttrContains(document.body,"div","class",'results');
				if (res) {
					res=nHtml.GetText(res);			
					if (res.match(/Your Elite Guard is FULL/i)) {
						this.GMSetValue('MyEliteTodo','');
						this.GMLog('elite guard is full');
					}
				}
			}
			
			var eliteList=this.GMGetValue('MyEliteTodo','');
			if (eliteList != '' && this.WhileSinceDidIt('AutoEliteReqNext',120*1*Math.random())) {
				user=eliteList.substring(0,eliteList.indexOf(','));
				this.GMLog('add elite ' + user);
				this.VisitUrl("http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=" + user);
				eliteList = eliteList.substring(eliteList.indexOf(',')+1);
				this.GMSetValue('MyEliteTodo',eliteList);
				this.JustDidIt('AutoEliteReqNext');
			}
		}
		
		if((ok=this.Jobs(false))!=null) {
		} else if((ok=this.Properties())!=null) {
		} else if((ok=this.Hospital())!=null) {
		} else if((ok=this.Bank())!=null) {
		} else if((ok=this.Fight())!=null) {
		}

		//this.GMLog('ok:'+ok);
		if(ok && ok.length>0) {
			this.currentPage=ok;
		} else {
			forceReload=true;
		}
	} else {
		this.GetStats();
		this.SetControls();
		this.DrawJobs(null,true);
		this.DrawProperties();
	}
	
	if (forceReload) {
	}

	this.WaitCheckPage();
},


/*
PageChange:function() {
	if(this.waitForPageChange) {
		this.waitForPageChange=false;
		// wait for all the ajax stuff to finish...
		window.setTimeout(function() { Zynga.CheckPage(); },2000);
	}
}
*/

ReloadOccasionally:function() {
	nHtml.clearTimeouts();	
	nHtml.setTimeout(function() {
		// better than reload... no prompt on forms!
		window.location = "http://apps.facebook.com/castle_age/index.php";
		this.currentTab = "index";
		Zynga.ReloadOccasionally();
	}, 1000*60*4 + (3 * 60 * 1000 * Math.random()));
}

};

if(fastLoad) {
	Zynga.CheckPage();
}

window.addEventListener("load", function(e) {
	if(!fastLoad) {
		Zynga.CheckPage();
	}
},false);

Zynga.ReloadOccasionally();
