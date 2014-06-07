// ==UserScript==
// @name		Show Just Fiction
// @description	Removes garbage from some fiction hosting sites and displays the fiction only. Benefited form timendum's "Show Just Image 2", which can be got from "http://userscripts.org/scripts/show/78214"
// @version		0.0.0.3
// @author		Jal
// @contributors	
// @license		GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include		http://www.aikanxs.com/book/*
// @include		http://userscripts.org/scripts/show/105550
// ==/UserScript==

// Show Just fiction CORE

if (typeof usoCheckup != "undefined") {
	//ok
} else {
	usoCheckup = {enabled: false};
}
var isFullPage = false;
var isCleanScript = true;
var divContent, divGuide, divTitle;

// helper
var hId = function(id){ return document.getElementById(id); };
var hXP = function(pat) { return document.evaluate(pat, document, null, 9, null).singleNodeValue; };
var hXPV = function(pat) { return hXP(pat).value; };
// content getter
var byCNTId = function(id){ divContent = document.getElementById(id) || divContent; return divContent; };
var byCNTXP = function(pat) { divContent = hXP(pat) || divContent; return divContent; };
// guide getters
var byGIDId = function(id){ divGuide = document.getElementById(id) || divGuide; return divGuide; };
var byGIDXP = function(pat) { divGuide = hXP(pat) || divGuide; return divGuide; };
// fiction title getters
var byTITId = function(id){ divTitle = document.getElementById(id) || divTitle; return divTitle; };
var byTITXP = function(pat) { divTitle = hXP(pat) || divTitle; return divTitle; };

var fictionPrefer = "0000";
if (typeof GM_getValue != 'undefined') {
	var fictionPrefer = GM_getValue('fictionPrefer', fictionPrefer) || fictionPrefer;
	isFullPage = fictionPrefer.substr(3,1) === "1";
	isCleanScript = fictionPrefer.substr(2,1) === "1";
}

function printPreferencesControls() {
	var descBody = hId('full_description');
	var beforeElem = hXP('//div[@id="full_description"]/h3[1]');
	if (typeof GM_setValue === 'undefined' || descBody === null || beforeElem === null) {
		return;
	}	

	var createCheckbox = function(id, checked, listener, textLabel) {
		var divRow = document.createElement('div');
		var input = document.createElement('input');
		input.setAttribute('id', id);
		input.setAttribute('type','checkbox');
		input.checked = checked;
		input.setAttribute('orig', checked);
		input.addEventListener('change', listener, false);
		divRow.appendChild(input);
		var label = document.createElement('label');
		label.setAttribute('for', id);
		label.appendChild(document.createTextNode(' ' + textLabel));
		divRow.appendChild(label);
		return divRow;
	};
	
	var title = document.createElement('h3');
	title.appendChild(document.createTextNode("Fiction Preferences"));
	descBody.insertBefore(title,beforeElem);
	
	var toggleF = function() {
		var checked = hId('sjfFullPage').checked;
		fictionPrefer = fictionPrefer.substr(0,3) + (checked ? "1" : "0");
		GM_setValue('fictionPrefer', fictionPrefer);
	};
	descBody.insertBefore(
		createCheckbox(
			'sjfFullPage',
			isFullPage,
			toggleF,
			'show the whole page?'
		),
		beforeElem
	);
	var toggleC = function() {
		var checked = hId('sjfCleanScript').checked;
		fictionPrefer = fictionPrefer.substr(0,2) + (checked ? "1" : "0") + fictionPrefer.substr(3,1);
		GM_setValue('fictionPrefer', fictionPrefer);
	};
	descBody.insertBefore(
		createCheckbox(
			'sjfCleanScript',
			isCleanScript,
			toggleC,
			'Clean the scripts?'
		),
		beforeElem
	);
	
	var toggleU = function() {
		var checked = hId('usoEnab').checked;
		usoCheckup.enabled = checked;
	};
	descBody.insertBefore(
		createCheckbox(
			'usoEnab',
			usoCheckup.enabled,
			toggleU,
			'Enable auto-update'
		),
		beforeElem
	);
	descBody.insertBefore(document.createElement('p'),beforeElem);
}

function cleanScript() {
	var scripts = document.getElementsByTagName('script');
	while (scripts && scripts.length) {
		scripts[0].parentNode.removeChild(scripts[0]);
	}
}

function viewFiction() {
		if (divContent && divGuide)
	{
		var cssElem = hXP('//link[@rel="stylesheet"]');
		
		var cssElemClone = document.createElement('link');
		cssElemClone.href = cssElem.href;
		cssElemClone.rel = cssElem.rel;
		cssElemClone.type = cssElem.type;
		
		var titleStr = divTitle.innerHTML, titleid = divTitle.id;
		var contentStr = divContent.innerHTML, contentid = divContent.id;
		var guideStr = divGuide.innerHTML, guideid = divGuide.id;
				
		var docElem = document.documentElement;
		
		//clean html
		while (docElem.attributes.item(0)) {
			docElem.attributes.removeNamedItem(docElem.attributes.item(0).name);
		}
		
		while (docElem.children[0]) {
			docElem.removeChild(document.documentElement.children[0]);
		}
		
		// create
		var head = document.createElement('head');
		var title = document.createElement('title');
		title.appendChild(document.createTextNode(titleStr));
		head.appendChild(title);
		head.appendChild(cssElemClone);
		docElem.appendChild(head);
		
		var body = document.createElement('body');
		docElem.appendChild(body);
		
		var div = document.createElement('div');
		div.id = titleid;
		div.innerHTML = titleStr;		 
		body.appendChild(div);
		
		div = document.createElement('div');
		div.id = contentid;
		div.innerHTML = contentStr;
		body.appendChild(div);
		
		div = document.createElement('div');
		div.id = guideid;
		div.innerHTML = guideStr;		 
		body.appendChild(div);
	}
}

function getContent() {
	// MAIN SCRIPT STARTS HERE

	var domain = location.hostname.match('([^\.]+)\.(be|biz|ca|cc|com|de|dk|eu|gr|hu|in|info|it|me|ms|name|net|no|nu|org|pl|ro|ru|se|su|to|ua|us|ws)$');
	
	if (domain) {
		switch (domain[0]) {
			case 'aikanxs.com':
			    byTITId('title');
				byCNTId('content');
				byGIDId('footlink');
				break;	
			case 'userscripts.org':
				printPreferencesControls();
				break;
		}
	}
}

if (isCleanScript){
	cleanScript();
}

getContent();

if (!isFullPage) {
	viewFiction();
}

