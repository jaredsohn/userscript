// ==UserScript==
// @name           RewardsCentral
// @namespace      RewardsCentral
// @description    RewardsCentral(EmailCash) auto run guessing game, survey, ad click.
// @include        http://www.rewardscentral.com.au/*
// ==/UserScript==


nHtml={
Click:function(obj) {
	window.setTimeout(function() {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		return !obj.dispatchEvent(evt);
	},1000+Math.floor(Math.random()*1000));
}
};

RewardsCentral={
// Change here to run the program at a different hour.
// The guessing game resets at 11am, but you would want to change this if you're not in the same time zone.
hourToRun:12,

href:'http://www.rewardscentral.com.au',
guessing:'/Community/guessingGame.aspx',
main:'/default.aspx',
webClicks:'/earn/webclicks.aspx',

CheckSurvey:function() {
	var boxes=document.evaluate("//input[(@type='checkbox' or @type='radio') and contains(@id,'QuickSurvey')]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var sub=document.evaluate("//input[@type='submit' and contains(@name,'QuickSurvey')]",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

	if(!sub || !sub.singleNodeValue) { 
		GM_log('Survey done');
		window.location.href=this.href+this.guessing;
		return; 
	}
	if(boxes.snapshotLength<1) { return; }
	var boxToClick=boxes.snapshotItem(Math.floor(Math.random()*boxes.snapshotLength));
	nHtml.Click(boxToClick);
	window.setTimeout(function() {
		GM_log('submit quick survey');
		nHtml.Click(sub.singleNodeValue);
	},1000);
},

WebClick:function() {
	if(window.location.search.indexOf('?catid=')>=0) {
		var urls=document.evaluate("//a[contains(@href,'TopFrame')]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if(urls.snapshotLength<1) {
			GM_log('No urls');
		}

		var urlToClick=urls.snapshotItem(Math.floor(Math.random()*urls.snapshotLength));
		window.setTimeout(function() {
			GM_log('url to click'+urlToClick.href);
			urlToClick.focus();
			location.href=urlToClick.href;
		},1000);
		return;
	}

	var caturls=document.evaluate("//a[contains(@href,'webclicks.aspx?catid=')]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	if(caturls.snapshotLength<1) {
		GM_log('No category urls');
		return;
	}
	var urlToClick=caturls.snapshotItem(Math.floor(Math.random()*caturls.snapshotLength));
	GM_log('url to click:'+urlToClick.href);
	location.href=urlToClick.href;
},

Guess:function() {
	var auto=document.evaluate("//a[contains(@title,'Automatic')]",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var sub=document.evaluate("//input[@type='submit' and contains(@name,'SubmitGuessing')]",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(!auto || !sub || !sub.singleNodeValue || !auto.singleNodeValue) { 
		GM_log('Guessing game done');
		var url=this.href+this.webClicks;
		window.setTimeout(function() {
			location.href=url;	
		},1000);
		return;
	}

	GM_log('guess:'+auto.singleNodeValue.href);
	location.href=auto.singleNodeValue.href;
	window.setTimeout(function() {
		nHtml.Click(sub.singleNodeValue);
	},1000);
},

CheckPage:function() {
	var href=window.location.href;
	var pathname=window.location.pathname;
	var hreflc=href.toLowerCase();
	if(href.indexOf(this.main)>=0 || pathname=="/") {
		this.CheckSurvey();
	}
	else if(hreflc.indexOf(this.webClicks)>=0) {
		this.WebClick();
	}
	else if(href.indexOf(this.guessing)>=0) {
		this.Guess();
	} else {

		var nextrun=new Date();
		nextrun.setSeconds(0);
		nextrun.setMinutes(0);
		nextrun.setHours(this.hourToRun);
		var nextRunTime=nextrun.getTime()+(60*60*24*1000);
		nextrun.setTime(nextRunTime);
		var now=(new Date()).getTime();

		var div=document.createElement('div');
		div.style.position='absolute';
		div.style.top="0px";
		div.style.left="0px";
		div.style.backgroundColor='#fff';
		div.innerHTML='Waiting until: '+nextrun.toString();
		div.zOrder=1000;

		var url=this.href+this.main;
		window.setTimeout(function() {
			document.getElementById('frame1').contentDocument.body.appendChild(div);
			GM_log('waiting until:'+nextrun.toString());

			window.setTimeout(function() {
				GM_log('going to:'+url);
				location.href=url;
			},nextRunTime-now);
		},15000);
	}
}

};

window.addEventListener("load", function(e) {
	RewardsCentral.CheckPage();
},false);

