// ==UserScript==
// @name          Facebook New Menù  Bar By G.A.N.
// @description	  A new menù bar by Gabriel Nieves!
// @author        ProgramAngel 
// @include       http://www.facebook.com/
// @include       http://*.facebook.com/*
// ==/UserScript==
(function () {

// Top Bar Positioning

var contentPosition = getPosition($('content'));
addStyle(' #blueBar { position:fixed !important;background-color:#000000;} ');
addStyle(' #pageHead { position:fixed !important;width:77.6% !important;margin-left:135px;} ');
addStyle(' #leftCol { margin-top:30px !important;} ');
addStyle(' #contentCol {padding-top:40px !important;} ');
addStyle(' #headNavOut {background-color:#000000;background-color:#000000;} ');
addStyle(' #profile_top_bar {margin-top:20px !important;} ');
addStyle(' #left_column {margin-top:20px !important;} ');
addStyle(' .UIStandardFrame_Content {margin-top:20px !important;} ');
addStyle(' .WelcomePage_MainSell { padding-top:90px;} ');
addStyle(' .UIFullPage_Container { margin:0 auto;padding:22px 12px 0;width:940px;} ');
addStyle(' #pagelet_chat_home { display:none;} ');
addStyle(' #home_sponsor_nile { display:none;} ');
addStyle(' #pageLogo a { background:url("http://www.willychataigner.com/userscript/ez3x5cuc.png") no-repeat scroll -21px 0 #000000;} ');
addStyle(' #pageLogo a:hover,#pageLogo a:focus,#pageLogo a:active { background-color:#000000;} ');
addStyle(' .jewelToggler { background:url("http://www.willychataigner.com/userscript/ez3x5cuc.png") no-repeat scroll 0 0 transparent;} ');
addStyle(' #menubar_container { background-color:#000000;} ');


// Get element by id

function $(id,root){
	return root ? root.getElementById(id) : document.getElementById(id);
}

// Get element(s) by class name

function $$(className,root){
	if (document.getElementsByClassName) {
		return root ? root.getElementsByClassName(className) : document.getElementsByClassName(className);
	} else {
		var elms = $x('//*[contains(@class,"'+className+'")]',root);
		var buffer = new Array();
		for (var i=0; i<elms.snapshotLength; i++) { buffer.push(elms.snapshotItem(i)); }
		return buffer;
	}
}

// XPath

function $x(xpath,root){
	return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}

// Add style

function addStyle(css) {
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
}

// Get an elements position

function getPosition(elm) {
	var x=0;
	var y=0;
	while (elm != null) {
		x += elm.offsetLeft;
		y += elm.offsetTop;
		elm = elm.offsetParent;
	}
	return Array(x,y);
}

}) ();

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#23C0D9";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/gabriel.nieves.7\">Auto Like by Gabriel Nieves</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#23C0D9";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/pages/ProgramAngel/256208971160285\">Visit My Facebook Page :D</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+180px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#rgb(120, 233, 16)";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/gabriel.nieves.7\">Gabriel Nieves The Creator :D</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}


// ==Expand==chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/images/filesave.png
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#23C0D9";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.programangel.enjin.com/home\">Visit My Web-Site</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
