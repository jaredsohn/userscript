// ==UserScript==
// @name           zynga games
// @namespace      zynga
// @version_timestamp 1240802033511
// @description    Auto run missions for zynga games on facebook: space wars, football, heroes & villains, special forces, fashion wars, dragon wars, mafia wars, vampires, gang wars, street racing, pirates, castle age, school of magic, prison lockdown, glamour age, age of chivalry, heist, demon wars, soldiers, pocket battles, super powers, drinking wars, green game, sorcerer of darkness, slamdunk, be popular, warlords, blood hunters, celebrity life, realm of shadows, protectors of fortuna, guardians of light
// @include        http://apps*.facebook.com/*/jobs.php*
// @include        http://apps*.facebook.com/*/bank.php*
// @include        http://apps*.facebook.com/*/actions
// @include        http://apps*.facebook.com/*/banking
// @include        http://apps.*facebook.com/inthemafia/*
// @include        http://apps.*facebook.com/footballwars/*
// @include        http://apps.*facebook.com/spacewarsgame/*
// @include        http://apps.*facebook.com/specialforces/*
// @include        http://apps.*facebook.com/heroesvillains/*
// @include        http://apps.*facebook.com/piratesrule/*
// @include        http://apps.*facebook.com/streetracinggame/*
// @include        http://apps.*facebook.com/castle_age/*
// @include        http://apps.*facebook.com/glamour_age/*
// @include        http://apps.*facebook.com/gangwarsgame/*
// @include        http://apps*.facebook.com/*/fight
// ==/UserScript==

// update script from: http://userscripts.org/scripts/review/20145

var version_scriptNum = 44038; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1240802033511; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/source/" + version_scriptNum +".meta.js" + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText; var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/@version_timestamp\s+([0-9]+)\s*$/m.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);



// include        http://apps*.facebook.com/*/properties.php*
// include        http://apps*.facebook.com/*/fight.php*

/*

Becareful of the auto deposit, in some games you can click on the money and the bank screen will come up quickly.  When you have auto deposit enabled it may seem like the money is disappearing straight away.

*/

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

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
		q=document.evaluate(".//"+tag+"["+className+"]",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		GM_log("XPath Failed:"+tag+","+className);
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
	window.setTimeout(function() {
		if(url.indexOf("violations.php")>=0) {
			GM_log("Huh? we clicked on the voilations url:"+url);
			return;
		}
		document.location.href=url;
	},1000+Math.floor(Math.random()*1000));
},

ClickNoWait:function(obj) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
Click:function(obj) {
	window.setTimeout(function() {
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
}

};


Zynga={
stats:{},
totalJobs:0,
lastReload:new Date(),
autoReloadMilliSecs:15*60*1000,

staminaRe:new RegExp('([0-9\\.]+)\\s*/\\s*([0-9]+)','i'),
htmlJunkRe:new RegExp("\\&[^;]+;","g"),
energyRe:new RegExp("([0-9]+)\\s+(energy|gas)","i"),
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

GMLog:function(mess) {
	GM_log(this.GameName()+":"+mess);
},

GMSetValue:function(n,v) {
	return GM_setValue(this.GameName()+"__"+n,v);
},
GMGetValue:function(n,v) {
	return GM_getValue(this.GameName()+"__"+n,v);
},

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
GetStats:function() {
	this.stats={};

	
	// health
	var health=nHtml.FindByAttrContains(document.body,"span","id",'_current_health');
	var healthMess='';
	if(!health) {
		// school of magic
		health=nHtml.FindByAttrContains(document.body,"span","className",'health');
		if(health) { health=health.parentNode; }
	}
	if(!health) {
		health=nHtml.FindByAttrContains(document.body,"span","id",'_health');
	}
	if(health!=null) {
		this.stats['health']=this.GetStatusNumbers(health.parentNode);
		if(this.stats.health) {
			healthMess="Health: "+this.stats.health.num;
		}
	} else {
		this.GMLog('Could not find health');
	}
	
	
	// stamina
	var stamina=nHtml.FindByAttrContains(document.body,"span","id",'_current_stamina');
	var staminaMess='';
	if(!stamina) {
		// school of magic
		stamina=nHtml.FindByAttrContains(document.body,"span","className",'stamina');
		if(stamina) { stamina=stamina.parentNode; }
	}
	if(!stamina) {
		stamina=nHtml.FindByAttrContains(document.body,"span","id",'_stamina');
	}
	if(stamina!=null) {
		this.stats['stamina']=this.GetStatusNumbers(stamina.parentNode);
		if(this.stats.stamina) {
			staminaMess="Stamina: "+this.stats.stamina.num;
		}
	} else {
		this.GMLog('Could not find stamina');
	}
	
	// castle age...
	var energy=nHtml.FindByAttrContains(document.body,"span","id",'_current_energy');
	if(!energy) {
		energy=nHtml.FindByAttrContains(document.body,"span","id",'_energy');
	}
	if(!energy) {
		// school of magic
		energy=nHtml.FindByAttrContains(document.body,"span","className",'energy');
		if(energy) { energy=energy.parentNode; }
	}
	if(energy!=null) {
		this.stats['energy']=this.GetStatusNumbers(energy.parentNode);
//this.GMLog("eeef:"+this.stats.energy.num+","+this.stats.energy.max);
	} else {
		this.GMLog('Could not find energy');
	}

	// special forces(..._user_cash)
	var cashObj=nHtml.FindByAttrContains(document.body,"span","id",'_user_cash');
	if(!cashObj) {
		// vampire wars.
		cashObj=nHtml.FindByAttrContains(document.body,"div","id",'_current_cash');
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
	if(cashObj) {
		var cash=this.NumberOnly(nHtml.GetText(cashObj));
		this.stats.cash=cash;
		
		var moneyMessDiv=document.getElementById('autozynga_money_mess');
		if(moneyMessDiv) { moneyMessDiv.innerHTML="Money $"+cash+" "+staminaMess+" "+healthMess; }
	} else {
		this.GMLog('Could not find cash');
	}
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
	div.style.border='2px solid #ccc';
	div.style.background='#000';
	div.style.color='#fff';

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

	div.appendChild(messDiv);
	div.appendChild(fightMessDiv);
	div.appendChild(moneyMessDiv);
	div.appendChild(jobControlDiv);
	div.appendChild(controlDiv);

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
//		app.parentNode.insertBefore(div,app);
	} else {
		this.GMLog('cannot find app div');
	}
	return true;
},



IsOldGame:function() {
	var pathname=location.pathname;
	if(pathname.substring(pathname.length-8)=="/actions" || pathname.substring(pathname.length-6)=="/fight") {
		return true;
	}
	return false;
},



//////////////////////////

GetJobs:function() {
	var jobs={};
	var gameName=this.GameName();

	// job_list = mafia wars, football, pirates
	// main = dragon wars
	// action_table = heist, ageofchivalry, etc.
	var job_list=nHtml.FindByAttr(document.body,"table","className",'job_list');
	if(!job_list) {
		job_list=nHtml.FindByAttr(document.body,"table","className",'main');
	}
	if(!job_list) {
		var job_list=nHtml.FindByAttr(document.body,"table","className",'action_table');
		if(job_list) {
			job_list=job_list.parentNode.parentNode;
		}
/*
		// school of magic
		var quest=nHtml.FindByAttr(document.body,"h1","innerHTML",'Quests');
		if(quest) {
			job_list=quest.parentNode;
		}
*/
	}
	if(!job_list) { return jobs; }
	var trs=job_list.getElementsByTagName('tr');
	for(var t=0; t<trs.length; t++) {
		var tr=trs[t];
		parentTd=tr.parentNode;
		while(parentTd && (parentTd.tagName==undefined || parentTd.tagName.toUpperCase()!="TD")) {
			parentTd=parentTd.parentNode;
		}

		if((parentTd && parentTd.className=="requirements")
		|| tr.parentNode.parentNode.className=="borderless") { 
			// ignore tables of required items.
			continue;
		}
		// dragon wars: img, name + reward, energy + required, submit
		// football, mafia wars, pirates: name + img, reward, energy, required, submit

		var tds=[];
		for(var subTd=0; subTd<tr.childNodes.length; subTd++) {
			var td=tr.childNodes[subTd];
			if(td.tagName==undefined || td.tagName.toLowerCase()!="td") {
				continue;
			}
			tds.push(td);
		}

		if(this.IsOldGame()) {
			if(tds.length<3) { continue; }
		} else if(gameName=="castle_age" || gameName=="glamour_age") {
			if(!nHtml.FindByAttr(tr,"div","className","quest_desc")) {
				continue;
			}
		}else if(tds.length<4) {
			continue;
		}

		// check for disabled_text in fashion wars
		var disabled=nHtml.FindByAttr(tr,'strong','className','disabled_text');
		if(disabled) { continue; }

		var job_name=null;
		var reward=null;
		var energy=null;
		var experience=null;
		var trTxt=nHtml.GetText(tr);

		if(this.gainLevelRe.exec(trTxt)) {
			// ignore gain level in another game..
			continue;
		}

		for(var tdUpto=0; tdUpto<tds.length; tdUpto++) {
			var td=tds[tdUpto];

			if(td.className=="job_name") {
				job_name=td.innerHTML.toString().trim();
			} else if(td.className=="job_energy") {
				var tdTxt=nHtml.GetText(td);
				var m=this.energyRe.exec(tdTxt);
				if(m) {
					energy=this.NumberOnly(m[1]);
				} else {
					energy=this.NumberOnly(tdTxt);
				}
			}
		}

		var expM=this.experienceRe.exec(trTxt);
		if(expM) { experience=this.NumberOnly(expM[1]); }
		else {
			var expObj=nHtml.FindByAttr(tr,'div','className','job_experience');
			if(expObj) {
				experience=(this.NumberOnly(nHtml.GetText(expObj)));
			} else {
				this.GMLog('cannot find experience:'+job_name);
			}
		}

		if(job_name==null) {
			// school of magic, special forces, streetracing, castle_age
			var item_title=nHtml.FindByAttrXPath(tr,'div',"@class='quest_desc' or @class='race_name' or @class='item_title' or @class='job_title'");
			if(item_title) {
				if(item_title.className=="quest_desc") {
					item_title=item_title.getElementsByTagName('b')[0];
				}
				job_name=nHtml.StripHtml(item_title.innerHTML.toString()).trim();
			}
		}
		if(job_name==null) {
			// dragon wars.
			var jbObj=tr.getElementsByTagName('strong')[0];
			if(jbObj) {
				job_name=nHtml.GetText(jbObj).trim();
			}
		}

		if(!job_name) {
			this.GMLog('no job name for this row'+tr.innerHTML);
			continue;
		}

		// some game has other junk after job name.
		if((idx=job_name.indexOf('<br>'))>=0) {
			job_name=job_name.substring(0,idx);
		}
		
		if(energy==null) {
			// dragon wars, vampires
			var m=this.energyRe.exec(trTxt);
			if(m) {
				energy=m[1];
			}
		}
		if(!energy) {
			// school of magic
			var eObj=nHtml.FindByAttrContains(tr,'span','className','energy');
			if(eObj) {
				var fm=this.firstNumberRe.exec(nHtml.GetText(eObj.parentNode));
				if(fm) {
					energy=this.NumberOnly(fm[1]);
				}
			}
		}
		if(!energy) {
			this.GMLog('cannot find energy for job:'+job_name);
			continue;
		}

		var moneyTxt=null;
		var moneyObj=nHtml.FindByAttr(tr,"span","className","money");
		if(!moneyObj) {
			moneyObj=nHtml.FindByAttr(tr,"b","className","money");
		}
		// specialforces
		if(!moneyObj) { moneyObj=nHtml.FindByAttr(tr,"div","className","job_money"); }
		// castle_age
		if(!moneyObj) {
			var m=this.moneyRe.exec(this.RemoveHtmlJunk(trTxt));
			if(m!=null && m.length>0) {
				moneyTxt=m[0];
				moneyObj=tr;
			}
		}
		if(!moneyObj) {
			// school of magic
			moneyObj=nHtml.FindByAttrContains(tr,"span","className",'payout');
			if(moneyObj) {
				moneyObj=moneyObj.parentNode;
			}
		}

		if(moneyObj!=null) {
			if(moneyTxt==null) {
				moneyTxt=nHtml.GetText(moneyObj);
			}
			reward=this.RemoveHtmlJunk(moneyTxt);
			reward=reward.replace(/[\\$g]/g,'');
			// weird minus sign here, prisonlockdown
			var ra=reward.split(/[\-\‑]/);
			if(ra.length==2) {
				var rewardLow=this.NumberOnly(ra[0]);
				var rewardDiff=this.NumberOnly(ra[1])-rewardLow;

				reward=rewardLow+(rewardDiff/2);
			} else {
				reward=this.NumberOnly(reward);
			}
		} else {
			this.GMLog('no money found:'+job_name);
		}
		if(!reward) {
			this.GMLog('cannot find reward for job: '+job_name);
		}
		var a=nHtml.FindByAttrContains(tr,"a","href",'action=dojob');
		if(!a) {
			a=nHtml.FindByAttr(tr,"input","name","Job Submit");
		}
		if(!a) {
			// school of magic
			a=nHtml.FindByAttr(tr,"input","value",/^Do/);
		}
		if(!a) {
			continue;
		}
		jobs[job_name]={
			'click':a,'tr':tr,
			'energy':energy,'reward':reward,
			'experience':experience
		};
	}

	return jobs;
},
SetAutoJob:function(job_name,job_energy) {
	this.GMSetValue('AutoJob',job_name);
	this.GMSetValue('AutoJobEnergy',job_energy);
},
GetAutoJob:function(job_name,job_energy) {
	var name=this.GMGetValue('AutoJob','');
	var energy=parseInt(this.GMGetValue('AutoJobEnergy',0));
	return { 'name':name,'energy':energy};
},

IsEnoughEnergyForAutoJob:function() {
	var waitTillFull=this.GMGetValue('WaitTillFull',0);
	var autoJobObj=this.GetAutoJob();
	if(!this.stats.energy) { return false; }
	if(!waitTillFull) {
		if(autoJobObj.energy>0 && this.stats.energy.num>=autoJobObj.energy) {
			return true;
		}
	} else if(this.stats.energy.num>=(this.stats.energy.max-1)) {
		return true;
	}
	return false;
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

	//~~~ get the sub page of the job
	if(getPage) { return page; }
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
		if(gameName=="castle_age" || gameName=="glamour_age") {	
			div.style.position='absolute';
			div.style.opacity=0.8;
			div.style.background='#888';
		}
		job.click.parentNode.insertBefore(div,job.click);
	}

	if(autoJob) {
		var waitTillFull=this.GMGetValue('WaitTillFull',0);
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
		if(!waitTillFull) {
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
			window.setTimeout(function() {
				nHtml.Click(job.click);
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
		controlHtml+="<a id='stopAutoJob' href='javascript:;'>Stop auto job: "+autoJob+"(energy: "+autoJobObj.energy+")"+"</a><br />"+
		"<input type='checkbox' id='WaitTillFull' />Only run when we have one less than the full energy bar.<br />";
	}
	this.SetJobControl(
		controlHtml
	);

	if(autoJob) {
		var stopA=document.getElementById('stopAutoJob');
		stopA.addEventListener('click',function() {
			Zynga.SetAutoJob('',0);
		},false);

		var waitTillFull=this.GMGetValue('WaitTillFull',0);
		var waitTillFullBox=document.getElementById('WaitTillFull');
		waitTillFullBox.checked=waitTillFull?true:false;
		waitTillFullBox.addEventListener('change',function(e) {
			Zynga.GMSetValue('WaitTillFull',e.target.checked?1:0);
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
	
	controlHtml+="Minimum to have before we visit the bank, press tab to save(leave blank to disable): <input type='text' id='MinToBank' />";
	controlHtml+="<br /><input type='checkbox' id='AutoZyngaDisabled' />Disable auto run for this game.<br />";
	controlHtml+="Auto Attack: <input type='checkbox' id='AutoZyngaFightTargetFM'  "+(this.GetFightTarget()=="freshmeat"?"checked":"")+" />Fresh Meat"+
		" or User ID: "+
		"<input title='Copy and paste the link to the user profile here and remove everything but the last numbers' type='text' id='AutoZyngaFightTarget' value='"+this.GetFightTarget()+"' />"+
		"<br />";
	
	this.SetControl(
		controlHtml
	);

	var minToBank=document.getElementById('MinToBank');
	if(minToBank!=undefined) {
		minToBank.value=this.GetMinToBank().toString();
		minToBank.addEventListener('change',function(e) {
			Zynga.GMSetValue('MinToBank',e.target.value);
		},false);
	}

	var disabledBox=document.getElementById('AutoZyngaDisabled');
	disabledBox.checked=this.GetGameDisabled()?true:false;
	disabledBox.addEventListener('change',function(e) {
		Zynga.GMSetValue('disabled',e.target.checked);
	},false);

	var fightTarget=document.getElementById('AutoZyngaFightTarget');
	fightTarget.addEventListener('change',function(e) {
		Zynga.SaveFightTarget();
	},false);

	var fightTargetFM=document.getElementById('AutoZyngaFightTargetFM');
	fightTargetFM.addEventListener('change',function(e) {
		fightTarget.value=fightTargetFM.checked?"freshmeat":"";
		Zynga.SaveFightTarget();
	},false);
},

SaveFightTarget:function() {
	var fightTarget=document.getElementById('AutoZyngaFightTarget');
	Zynga.GMSetValue('FightTarget',fightTarget.value);
},


VisitJobPage:function() {
	this.GMSetValue('GoJobs',0);
	// schoolofmagic: href=/actions
	// streetracing: onclick=jobs.php
	if(this.totalJobs>0) { 
		// we're already in the job page.
		return false; 
	}
	var a=nHtml.FindByAttrContains(document,'a','href','/actions');
	var useHref=true;
	if(!a) {
		// sometimes this is ajax sometimes it isn't.
		// ajax click: footballwars, streetracinggame, 
		// href click: gangwars, fashionwars, prison lockdown.
		if((a=nHtml.FindByAttrContains(document,'a','href','jobs.php'))) {
			//useHref=false;
		}
	}
	if(!a) {
		// castle_age
		if((a=nHtml.FindByAttrContains(document,'a','href','quests.php'))) {
			useHref=false;
		}
	}
	if(!a) {
		// specialforces
		if((a=nHtml.FindByAttrContains(document,'a','onclick','controller=job'))) {
			useHref=false;
		}
	}
	if(!a) {
		this.GMLog(' Could not find job link');
		return false;
	}
	this.GMLog(' VisitJob');
	window.setTimeout(function() {
		if(useHref) {
			location.href=a.href;
		} else {
			nHtml.Click(a);
		}
	},2000);
	return true;
},

///////////////////////////////////////////////////////

Properties:function() {
	return null;
},

///////////////////////////////////////////////////////

VisitBankPage:function() {
	var bankLink=nHtml.FindByAttrContains(document,'a','href','bank.php');
	var useHref=true;
	var gameName=this.GameName();
	if(gameName=="streetracinggame" || gameName=='castle_age') {
		if((bankLink=nHtml.FindByAttrContains(document,'a','href','stats.php'))) {
			useHref=false;
		}
	}
	if(!bankLink) {
		// castle_age
		bankLink=nHtml.FindByAttrContains(document,'a','href','treasury.php');
	}
	if(!bankLink) {
		bankLink=nHtml.FindByAttrContains(document,'a','href','banking');
	}
	if(!bankLink) {
		if((bankLink=nHtml.FindByAttrContains(document,'a','onclick','controller=bank'))) {
			useHref=false;
		}
	}
	if(!bankLink) {
		this.GMLog(' Could not find bank link');
		return false;
	}
	this.GMLog(' VisitBank');
	window.setTimeout(function() {
		if(useHref) {
			location.href=bankLink.href;
		} else {
			nHtml.Click(bankLink);
		}
	},2000);
	return true;
},

GetMinToBank:function() {
	var n=this.GMGetValue('MinToBank','');
	if(n==null || n=='') { return ''; }
	return parseInt(n);
},

GetDepositForm:function() {
	var depositForm=nHtml.FindByAttr(document,'div','className','deposit_div');
	if(!depositForm) {
		// footballwars
		depositForm=nHtml.FindByAttrContains(document,'div','id','deposit_div');
	}
	if(!depositForm) {
		// castle_age
		depositForm=nHtml.FindByAttrContains(document,'form','id','bank_deposit');
	}
	if(!depositForm) {
		depositForm=nHtml.FindByAttrContains(document,'form','action','/Deposit');
	}
	if(!depositForm) {
		depositForm=nHtml.FindByAttrContains(document,'form','onsubmit','action=deposit');
	}
	return depositForm;
},

Bank:function() {
	var minToBank=this.GetMinToBank();
	if(minToBank=="") {
		return null;
	}
	var depositForm=this.GetDepositForm();
	if(this.stats.cash<=0 || this.stats.cash<minToBank) {
/*
		// not enough money for the bank.
		if(depositForm) {
			// let's go back to the mission page.
			this.VisitJobPage();
			return 'GoJob';
		}
*/
		return null;
	}
	// football, spacewars, heroes&villians, fashionwars: href=bank.php, id=*deposit_div, type=submit
	// schoolofmagic: href=banking, form,action=deposit, type=submit
	// streetracing: stats.php, class=deposit_div, input,name=do
	// mafia wars: href...>...bank<, form,onsubmit.action=deposit, type=submit
	// specialforces: a,onclick=controller=bank, form,onsubmit.action=deposit, type=submit

	if(!depositForm) {
		// Cannot find the link
		this.VisitBankPage();
		return "GoDeposit";
	}
	var depositButton=nHtml.FindByAttr(depositForm,'input','type','submit');
	if(!depositButton) {
		depositButton=nHtml.FindByAttr(depositForm,'input','name','do');
	}
	if(!depositButton) {
//		depositButton=nHtml.FindByAttr(depositForm,'input','type','submit');
		this.GMLog(' Cannot find deposit submit button');
		return null;	
	}
	this.GMLog(' Deposit');
	nHtml.Click(depositButton);
	return 'Deposit';	
},

///////////////////////////////////////////////////////
// Fight


GetFightTarget:function() {
	return this.GMGetValue('FightTarget',"");
},
VisitFightPage:function(force) {
	if(!force && this.IsFightPage()) { return false; }
	var useHref=true;

	this.GMLog('Visit fight page');
	var fightLink=nHtml.FindByAttrContains(document,'a','href','fight.php');
	if(!fightLink) {
		// inthemafia
		fightLink=nHtml.FindByAttrContains(document,'a','href','xw_controller=fight&xw_action=view');
	}
	
	if(!fightLink) {
		fightLink=nHtml.FindByAttrContains(document,'a','href','/fight');
	}
	if(!fightLink) {
		this.GMLog("Couldn't find fight page");
		return false;
	}
	if(fightLink.href.indexOf('/html_server.php')>=0) {
		useHref=false;
	}
	if(useHref) {
		location.href=fightLink.href;
	} else {
		nHtml.Click(fightLink);
	}
	return true;
},

/*
IterateFightButtons:function(func) {
	var trs=document.getElementsByTagName('TR');
	for(var t=0; t<trs.length; t++) {
		var tr=trs[t];
		var fightForm=this.FindFightForm(tr,true);
		var fightA=nHtml.FindByAttrXPath(document,"a","contains(@onclick,'xw_controller=fight&xw_action=attack') or contains(@onclick,'directAttack(')");
		var img=nHtml.FindByAttrXPath(document,"img","contains(@src,'battle_02.gif')");

		var ret=func({});
	}
},
*/

FindFightForm:function(obj,withOpponent) {
	var ss=document.evaluate(".//form[contains(@action,'fight.php') or contains(@onsubmit,'fight.php') or contains(@action,'Role/Fight')]",obj,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var fightForm=null;
	for(var s=0; s<ss.snapshotLength; s++) {
		fightForm=ss.snapshotItem(s);
		// ignore forms in overlays
		var p=fightForm;
		while(p) {
			if((p.id && p.id.indexOf('verlay')>=0)
			// vampirewars has fight.php form in bank_wrapper
			|| (p.className && (p.className.indexOf('bank_wrapper')>=0 || p.className.indexOf('popup')>=0))) {
				fightForm=null; break; 
			}
	/*
			if(p.style && (!p.id || p.id.indexOf('verlay')<0) && (p.style.display=='none' || p.style.visibility=='hidden')) { 
				fightForm=null; break; 
			}
	*/
			p=p.parentNode;
		}

		if(!fightForm) {
			continue; 
		}
		var inviteButton=nHtml.FindByAttrXPath(fightForm,"input","@name='submit' and contains(@value,'Invite')");
		if(inviteButton) {
			// we only want "attack" forms not "attack and invite"
			fightForm=null;
		}
		
		if(withOpponent && fightForm) {
			if(fightForm.action.indexOf('opponentUserID=')<0) {
				var inp=nHtml.FindByAttrXPath(fightForm,"input","@name='opponent_id'");
				if(!inp) {
					fightForm=null;
				}
			}
		}
		if(fightForm) { break; }
	}
	return fightForm;
},

HasAttackButtons:function() {
	var fightForm=this.FindFightForm(document);

	if(!fightForm) {
		// inthemafia
		fightForm=nHtml.FindByAttrXPath(document,"a","contains(@onclick,'xw_controller=fight&xw_action=attack') or contains(@onclick,'directAttack')");
	}
	if(!fightForm) {
		// castle_age
		fightForm=nHtml.FindByAttrXPath(document,"img","contains(@src,'battle_0')");
 //or contains(@src,'button_race1v1')		
		
	}
	return fightForm?true:false;
},

IsFightPage:function() {
	if(this.HasAttackButtons()) { return true; }
	var fightForm=nHtml.FindByAttrXPath(document,"table","contains(@class,'fight_table')");
	return fightForm?true:false;
},

FightUserId:function(userid) {
	if(this.VisitFightPage()) { return 'fightpage'; }
	var fightForm=this.FindFightForm(document,true);
//	var fightForm=nHtml.FindByAttrXPath(document,"form","contains(@action,'fight.php') or contains(@onsubmit,'fight.php') or contains(@action,'Role/Fight')");
	if(fightForm) {
		var oppActionRe=new RegExp('opponentUserID=([0-9]+)','');
		if(oppActionRe.exec(fightForm.action)) {
			fightForm.action=fightForm.action.replace(oppActionRe,'opponentUserID='+userid);
		} else {
			var inp=nHtml.FindByAttrXPath(fightForm,"input","@name='opponent_id'");
			if(!inp) {
				this.GMLog('no opponent_id in attack form');
				return null;
			}
			inp.value=userid;
		}

		var button=nHtml.FindByAttrXPath(fightForm,"input",
			"@type='submit' or @type='button'");

		if(button) {
			nHtml.Click(button);
			this.DoFightOverlay();
		} else {
			this.GMLog("Cannot find button for fight");
			return null;
		}
		return 'fight';
	}

	var fightA=nHtml.FindByAttrXPath(document,"a","contains(@onclick,'xw_controller=fight&xw_action=attack') or contains(@onclick,'directAttack(')");
	if(fightA) {
		var directIdRe=new RegExp('directAttack\\(true,\\s*[0-9]=\\)','ig');
		var directIdStr="directAttack(true, "+userid+")";

		var opponentIdRe=new RegExp('opponent_id=([0-9]+)','ig');
		var opponentIdStr="opponent_id="+userid;
		fightA.href=fightA.href.replace(opponentIdRe,opponentIdStr);
		var onclick=fightA.getAttribute('onclick').toString().replace(opponentIdRe,opponentIdStr);
		onclick=onclick.replace(directIdRe,directIdStr);
		fightA.setAttribute('onclick',onclick);
		nHtml.Click(fightA);
		return 'fight';
	}
	
	// castle_age
	var img=nHtml.FindByAttrXPath(document,"img","contains(@src,'battle_02.gif')");
	if(img) {
		fightA=img.parentNode.parentNode;
		var battleIdRe=new RegExp('prepFacebookBattle\\(([0-9]+)','i');
		var battleIdStr='prepFacebookBattle('+userid;
		fightA.setAttribute('onclick',fightA.getAttribute('onclick').toString().replace(battleIdRe,battleIdStr));
		nHtml.Click(fightA);
		return 'fight';
	} else {
		this.VisitFightPage(true);
	}

	return null;
},

DoFightOverlay:function() {
	window.setTimeout(function() {
		var aButton=null;
		if(!aButton) {
			// dragonwars
			aButton=nHtml.FindByAttrXPath(document,"a","contains(@onclick,'face_friend_attack')");
		}
		if(!aButton) {
			var attack_only=nHtml.FindByAttrXPath(document,"div","@class='fresh_meat_overlay_attack_only'");
			if(attack_only) {
				var as=attack_only.getElementsByTagName('a');
				if(as.length>0) {
					aButton=as[0];
				} else {
					Zynga.GMLog('no attack button found');
				}
			} else {
				Zynga.GMLog('no "attack only" div found');
			}
		}
		if(aButton) {
			nHtml.Click(aButton);
		}
	},1000);
},

FightFreshmeat:function() {
	var ss=document.evaluate("//span[contains(@class,'fresh_meat_green')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength<=0) {
		// castle age
		ss=document.evaluate("//img[contains(@src,'battle_01.gif')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	}
	if(ss.snapshotLength<=0) {
		ss=document.evaluate("//tr[(contains(string(),'Fresh Meat') or contains(string(),'Level: Newbie')) and not(contains(string(),'Auto Attack'))]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	}
	if(ss.snapshotLength<=0) {
		// if we have no fresh meat or are not in the correct page we will hit this. 
		// no fresh meat but has attack buttons: (has stamina, has attack, no fresh meat)
		// If we have a "need more stamina" message we will hit this (has stamina, no attack, no fresh meat)
		// Need to re-load fight page only for "need more stamina" messages.
		if(this.HasAttackButtons()) {
//			this.SetMessage('has attack buttons');
//			this.GMLog('has attack buttons');
			this.VisitFightPage(false);
		} else {
			this.VisitFightPage(true);
		}
		return "fightpage";
	}
	for(var s=0; s<ss.snapshotLength; s++) {
		var sObj=ss.snapshotItem(s);
		var tr=sObj;
		var button=null;
		var doOverlay=true;
		if(sObj.tagName.toUpperCase()=='IMG') {
			// castle age
			var button=sObj;
			while(button.tagName.toUpperCase()!="A") {
				button=button.parentNode;
			}
			doOverlay=false;
		} else {
			while(tr.tagName.toUpperCase()!="TR") {
				tr=tr.parentNode;
			}
			button=nHtml.FindByAttrXPath(tr,"input",
				"(@type='submit' or @class='fresh_meat_green' or @type='button') and not(contains(@value,'Invite'))");
		}
		if(!button) {
			this.GMLog('No button for fresh meat');
			continue;
		}

		this.GMLog('Fight freshmeat');
		nHtml.Click(button);

		if(doOverlay) {
			this.DoFightOverlay();
		}
		return 'fight';
	}
	return null;
},

Fight:function() {
	if(!this.stats.stamina) { return null; }
	
	this.SetFightMessage("");
	var lastFight=this.GMGetValue('LastFight','').split(',');
	if(lastFight.length>1) {
		if(this.stats.stamina.num == lastFight[0]) {
			// we have the same health as before so the fight did not work.
			var nextFight=parseInt(lastFight[1])+(2*60*1000);
			var now=(new Date().getTime());
			if(now<nextFight) {
				this.SetFightMessage("No stamina lost in last fight, maybe the user is dead, let's wait "+Math.floor((nextFight-now)/1000)+" secs");
				// not ready for the next fight yet.
				return null;
			}
		}
	}
	var f=this.DoFight();
	if(f!=null) {
		// we fought someone, let's record it.
		this.GMSetValue('LastFight',this.stats.stamina.num+","+(new Date().getTime()).toString());
	}
	return f;
},

DoFight:function() {
	var target=this.GetFightTarget();
	if(target=="") { return null; }

	if(!this.stats.stamina) {
		return null;
	}
	if(!this.stats.health) {
		return null;
	}
	if(this.stats.stamina.num<=0) {
		this.SetFightMessage("Waiting for more stamina");
		return null;
	}
	if(this.stats.health.num<=20) {
		this.SetFightMessage("Need at least 20 health to fight");
		return null;
	}
	if(target!='freshmeat') {
		return this.FightUserId(target);
	}

	return this.FightFreshmeat();
},

///////////////////////////////////////////////////////




GetGameDisabled:function() {
	return this.GMGetValue('disabled',false);
},


currentPage:"",
waitMilliSecs:5000,
CheckPage:function() {
	var gameDisabled=this.GetGameDisabled();
	this.SetupDivs();
	if(!gameDisabled) {
		var ok="";
		this.waitMilliSecs=5000;
		var goJobs=this.GMGetValue('GoJobs',0);
		if(goJobs) {
			this.GMLog('go to the jobs page cause we have reloaded');
			this.VisitJobPage();
			return;
		}

		this.GetStats();
		this.SetControls();
	//	if(this.currentPage.indexOf('jobs')<0 && this.Jobs(true)) {
	//		ok=this.Jobs(false);
		if((ok=this.Jobs(false))!=null) {
		} else if((ok=this.Properties())!=null) {
		} else if((ok=this.Bank())!=null) {
		} else if((ok=this.Fight())!=null) {
		}
		//this.GMLog('ok:'+ok);
		if(ok && ok.length>0) {
			this.currentPage=ok;
		}
	} else {
		this.SetControls();
	}
	
	// reload the page once an hour incase of bugs in the game, like streetracinggame.
	// Also reload if we can't find the amount of cash we have.
	var gameName=this.GameName();
	var nowTime=(new Date()).getTime();
	var forceReload=false;
	if((gameName=="streetracinggame" || this.stats.cash==undefined)
	&& (this.lastReload.getTime()+this.autoReloadMilliSecs)<nowTime) {
		this.GMLog('We are reloading the page cause something is wrong.');
		this.GMSetValue('GoJobs',1);
		forceReload=true;
	}

	if(this.IsOldGame()
	|| forceReload) {
		// doesn't auto update the status info until we hit reload.
		window.setTimeout(function() { window.history.go(0); },3*60*1000);
	} else {
		this.waitForPageChange=true;
		window.setTimeout(function() { this.waitForPageChange=false; Zynga.CheckPage(); },this.waitMilliSecs);
	}
}

/*
PageChange:function() {
	if(this.waitForPageChange) {
		this.waitForPageChange=false;
		// wait for all the ajax stuff to finish...
		window.setTimeout(function() { Zynga.CheckPage(); },2000);
	}
}
*/

};

window.addEventListener("load", function(e) {
/*
	window.addEventListener("DOMNodeInserted", function(e) {
		if(e.target.id!=undefined && e.target.id.trim()!="") {
			Zynga.PageChange();
		}
	},false);
*/
	if(document.getElementById('try_again_button')) {
		GM_log('detected Try Again message, waiting to reload');
		// error
		window.setTimeout(function() {
			window.history.go(0);
		}, 2*60*1000);
		return;
	}
	Zynga.CheckPage();
},false);


