// ==UserScript==
// @name          Pimp Gondal
// @description   Makes things in Gondal much cooler
// @include       http://gondal.de/*
// @include       http://*.gondal.de/*
// ==/UserScript==

function formatSeconds(seconds) {
	if (seconds < 0) {
		seconds = 0;
	}
	var m = Math.floor(seconds / 60);
	var secs = seconds % 60;
	return (m > 0?m + "m ":"") + secs + "s";
}

function registerTimer(name, endTime, nodeToUpdate, prepend, onFinish, onTick) {
	var interval = setInterval("updateTimer('" + name + "')", 1000);
	timers[name] = new Timer(endTime, nodeToUpdate, prepend, interval, onFinish, onTick);
	updateTimer(name);
}

function Timer(endTime, nodeToUpdate, prepend, interval, onFinish, onTick) {
	this.endTime = endTime;
	this.nodeToUpdate = nodeToUpdate;
	this.prepend = prepend;
	this.onFinish = onFinish;
	this.onTick = onTick;
	this.interval = interval;
}

function calcRemSecs(timer) {
	return timer.endTime - Math.floor(new Date().getTime() / 1000);
}

function updateTimer(name) {
	var timer = timers[name];
	if ((typeof timer.onTick) == "function") {
		timer.onTick(name, timer);
	}
	var remSecs = calcRemSecs(timer);
	timer.nodeToUpdate.nodeValue = timer.prepend + formatSeconds(remSecs);
	if (remSecs <= 0) {
		if ((typeof timer.onFinish) == "function") {
			timer.onFinish(name, timer);
		}
		clearInterval(timer.interval);
	}
}
unsafeWindow.updateTimer = updateTimer;

function getElementsByClassName(classname, node)  {
	if(!node)
		node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))
		a.push(els[i]);
	return a;
}

function xpath(path) {
	return document.evaluate(
		path, 
		document, 
		null, 
		XPathResult.ANY_TYPE,
		null
	);
}

function xpathResult(path) {
	var res = xpath(path);
	var result = new Array();
	while (guildTable = res.iterateNext()) {
		result.push(guildTable);
	}
	return result;
}


var timers = new Object();


//////////////////////////////////
//// Show extra info on exp bar
//////////////////////////////////
if (window.location.pathname == "/characters/index") {
	var expText = getElementsByClassName('yellow-bar-big-text')[0].firstChild.nodeValue;
	/.* ([0-9]+) \/ ([0-9]+)/.exec(expText);
	GM_setValue ('currentExp', RegExp.$1);
	GM_setValue ('maxExp', RegExp.$2);
	GM_log(RegExp.$1/RegExp.$2);
}

var currentExp = GM_getValue('currentExp');
var maxExp = GM_getValue('maxExp');
if (currentExp) {
	var savedExpPercent = Math.round(currentExp / maxExp * 100);
}

var expImage = xpathResult('//tr/td/img[@src="http://gondal.de/img/images2/gelb.gif"]')[0];
// Bonus <3 bugfix: when viewing profiles their exp bar is shown instead of yours on the left
if (window.location.pathname.indexOf("characters/profile/") != -1) {
	expImage.setAttribute('width', savedExpPercent + "%");
}
var expPercent = parseInt(expImage.getAttribute('width'));

var expText = expPercent + "%";
if (expPercent == savedExpPercent) {
	expText += " " + currentExp + "/" + maxExp;
}

var expDisplay = document.createElement("div");
expDisplay.setAttribute("style", "font-size: smaller; position: absolute; width: 103px; text-align: center; color: darkblue;");
expDisplay.appendChild(document.createTextNode(expText));
expImage.parentNode.insertBefore(expDisplay, expImage.parentNode.firstChild);

//////////////////////////////////
//// Show extra info on life bar
//////////////////////////////////

var lifeBar = document.getElementById("lifeBar").parentNode;
var remDisplay = document.createElement("div");
remDisplay.setAttribute("style", "font-size: smaller; position: absolute; width: 103px; text-align: center;");
var remDisplayText = document.createTextNode("");
remDisplay.appendChild(remDisplayText);
lifeBar.insertBefore(remDisplay, lifeBar.firstChild);

function updateLifePercent() {
	remDisplayText.nodeValue = unsafeWindow.lifePercent + "% "
}
updateLifePercent();

if (unsafeWindow.fullLifeAfter >= 0) {
	var remLifeTime = document.createElement("span");
	remLifeTime.appendChild(document.createTextNode(""));
	remDisplay.appendChild(remLifeTime);
	var lifeEndTime = Math.floor(new Date().getTime() / 1000) + (unsafeWindow.fullLifeAfter - unsafeWindow.secsDone);
	registerTimer("lifeBarTimer", lifeEndTime, remLifeTime.firstChild, "", function(name, timer){ timer.nodeToUpdate.nodeValue = ""; }, updateLifePercent);
}

//////////////////////////////////
//// Show Arena Info on every page
//////////////////////////////////

if (typeof (unsafeWindow.timers) != "undefined" && typeof (unsafeWindow.timers['remaining']) != "undefined") {
	var endTime = Math.floor(((new Date().getTime()) + (unsafeWindow.timers['remaining'].time * 1000)) / 1000);
	GM_setValue ('arenaEnd', endTime);
}

var xpathResult = xpath('//html/body/center/div/div/a');
xpathResult.iterateNext()
xpathResult.iterateNext();
var logoutLink = xpathResult.iterateNext();
var linkDiv = logoutLink.parentNode;

function createBottomTextNode() {
	var outerSpan = document.createElement("span");
	var innerSpan = document.createElement("span");
	innerSpan.setAttribute("style", "color: white");
	innerSpan.appendChild(document.createTextNode(""));
	outerSpan.appendChild(innerSpan);
	outerSpan.appendChild(document.createTextNode(" - "));
	linkDiv.insertBefore(outerSpan, logoutLink);
	return innerSpan.firstChild;
}

var arenaEndTime = GM_getValue('arenaEnd');
if (!arenaEndTime) {
	arenaEndTime = 0;
}
registerTimer("arenaTimer", arenaEndTime, createBottomTextNode(), "Arena: ");

//////////////////////////////////
//// Show Quest Time on Every Page
//////////////////////////////////
if (typeof (unsafeWindow.flashvars) != "undefined" && unsafeWindow.flashvars.urlFinish == "/quests/fight") {
	var endTime = Math.floor(((new Date().getTime()) + ((unsafeWindow.flashvars.fullTime - unsafeWindow.flashvars.currentTime) * 1000)) / 1000);
	GM_setValue ('questEnd', endTime);
}

var questEnd = GM_getValue('questEnd');
if (!questEnd) {
	questEnd = 0;
}
var orgTitle = document.title;
var questTick = undefined;
if (window.location.pathname == '/quests/doQuest') {
	questTick =  function(name, timer) {
		document.title = orgTitle + " [" + formatSeconds(calcRemSecs(timer)) + "]";
	};
}

registerTimer("questTimer", questEnd, createBottomTextNode(), "Quest: ", undefined,questTick);
