// ==UserScript==
// @name           GMailSidePaneWidth
// @namespace      pastymage@pobox.fakepart.com
// @description    Make the side pane a bit wider to compensate for new crap
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

//change this to suit your tastes
const SIDE_WIDTH = 160;
//change this to suit your tastes


const MIN_SIZE = 40;
const SIDE_SEPARATOR = 18;

//fix this if they ever provide a reliable link to the chat box in the api
const CHAT_PATH = "//div[contains(@style,'width:') and @class='XoqCub EGSDee' and descendant::input[@label] and count(*)=2]";

var big;
var originalSize;
var chatSize=0;
var kludgeBox,kludgeDisp,kludgeCount;

const KLUDGE_MAX=5;

	window.addEventListener('load', function() {
		setup('load');
	}, true);

function setup(eventType) {
	kludgeCount=0;
	GM_log("setup: " + eventType);
	if (eventType=='load') {
		window.addEventListener('resize', function() {
			setup('resize');
		},true);
		GM_log("resize added: " + eventType);
	}
	if (unsafeWindow.gmonkey) {
		if (unsafeWindow.gmonkey.isLoaded('1.0')) {
		  fixSizes(unsafeWindow.gmonkey.get('1.0'),eventType);
		} else {
			unsafeWindow.gmonkey.load('1.0', function(gmail) {
				fixSizes(gmail,eventType);
			});
		}
	} else {
		GM_log("no .gmonkey object, old gmail?");
		fixSizes(null,eventType);
	}

}

function fixSizes(gmail,eventType) {
var ng = "";

	if (eventType=='resize') {
		GM_log("delaying resize");
		window.setTimeout(function() {fixSizes(gmail,'resizedelay')},500);
		return;
	}

	if (!gmail) ng = 'NG';

	var dteNow=new Date();
	GM_log("fS" + ng + ": " + eventType + " started: " + dteNow.toLocaleString());
	GM_log("Window width:" + window.innerWidth);
	if (gmail) {
		var pagebox = gmail.getMastheadElement();
		while (pagebox.parentNode.className=='XoqCub') {
			pagebox=pagebox.parentNode;
		}
	} else {
		var pagebox = getPageBoxNoGmonkey();
	}
	try {
		GM_log("pagebox width:" + pagebox.style.width);
	} catch(e) {
		GM_log("pagebox not found, aborting");
		return;
	}
	var displacement=0;
	if (gmail) {
		var navPane = gmail.getNavPaneElement();
		var leftPane = gmail.getNavPaneElement();
	} else {
		var navPane = getNavPaneElementNoGmonkey();
		var leftPane = getNavPaneElementNoGmonkey();
	}
	try {
		var tmp=navPane.style.width;
	} catch(e) {
		GM_log("navPane not found, aborting");
		return;
	}
	tmp=tmp.replace("px","");
	originalSize=Number(tmp);
	displacement=SIDE_WIDTH-Number(tmp);
	
	if (displacement==0 && eventType!='resizedelay') {
		GM_log("displacement = 0, aborting")
		return;
	}
	
	navPane.style.width=String(Number(tmp) + displacement) + "px";

	var fixBox=navPane;
	big=0;
	fixSubBoxSizes(fixBox,displacement,".//*[contains(@style,'width:') and @class='XoqCub EGSDee']",false);
	var actView=navPane.parentNode.childNodes[2]
	tmp=pagebox.style.width;
	tmp=tmp.replace("px","");
	GM_log("actView:" + actView.style.width);
	GM_log("big:" + big);
	actView.style.width=String(Number(tmp)-(Math.max(big,SIDE_WIDTH) + SIDE_SEPARATOR)) + "px";
	actView.addEventListener('change', function() {
		GM_Log('view change fired');
	}, true);
	GM_log("fixed, actView, now: " + actView.style.width);
	kludgeBox=fixBox;
	kludgeDisp=displacement;

	dirtyKludgeFixChatWidth();

	dteNow = new Date();
	GM_log("fS" + ng + " finished: " + dteNow.toLocaleString());
//  }
}

function getPageBoxNoGmonkey() {

	var pb = xpath("//div[contains(@style,'width') and parent::div[not(@class)]]");
	return pb[0];

}

function getNavPaneElementNoGmonkey() {

	var npe = xpath("//div[@class='XoqCub EGSDee' and count(div)=1 and parent::*[count(*)=4]]");
	return npe[0];
	
}

function xpath(p, context) {
	if (!context) context=document;
	var arr=[];
	var xpr=document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i=0;item=xpr.snapshotItem(i);i++){ arr.push(item); }
	return arr;
}

function fixSubBoxSizes(subBox,displacement,path,capBig) {

	var fixes=xpath(path,subBox)
	GM_log(fixes.length);
	var fixed=0;
	
	var fixBox;
	for (var fi=0;fi<fixes.length;fi++) {
		fixBox=fixes[fi];
		GM_log("checking subBox(" + fi + "), " + fixBox.className);
		GM_log("Parent: " + fixBox.parentNode.className);
		if (fixBox.style.width!='') {
			tmp=fixBox.style.width;
			tmp=tmp.replace("px","");
			if ((Number(tmp) + displacement) < MIN_SIZE) {
				if (Number(tmp) > MIN_SIZE) {
					fixBox.style.width=String(MIN_SIZE) + "px";
					fixed++;
				}
			} else {
				GM_log("sbcheck: " + String(capBig) + " - " + tmp + " - " + String(big));
				if (((capBig) && (Number(tmp) < big)) || (!capBig)) {
					if ((Number(tmp) + displacement) > big) {
						big = Number(tmp) + displacement;
					}
					fixBox.style.width=String(Number(tmp) + displacement) + "px";
					fixed++;
				} else {
					GM_log("size capped, not fixing: " + tmp);
				}
			}
			GM_log("fixed, subBox, was:" + tmp + " now " + fixBox.style.width);
		} else {
			GM_log("WTF: " +fi + ", " + fixbox.className);
		}
	}
	return fixed;
}

function dirtyKludgeFixChatWidth() {

	var dteNow=new Date();
	GM_log("dirty chat kludge fired, disp:" + kludgeDisp+ " started: " + dteNow.toLocaleString());
	var chatBox=getChatBox(kludgeBox);
	if (!chatBox && kludgeCount<KLUDGE_MAX) {
		kludgeCount++;
		//chat window loads separately, try again in half a sec
		window.setTimeout(dirtyKludgeFixChatWidth,500);
		GM_log("dKFCW: no chatbox, timer set, aborting");
		return;
	}
	
	var tmp=chatBox.style.width.replace("px","");
	if (Number(tmp) < big) {
		chatBox.style.width=String(Number(tmp) + kludgeDisp) + "px";
		dteNow=new Date();
		GM_log("chatbox fixed:" + kludgeDisp + " time: " + dteNow.toLocaleString());
	} else {
		GM_log("chatbox already good:" + tmp + ", aborting");
	}
			
}

function getChatBox(navPane) {

	return xpath(CHAT_PATH,navPane)[0];
	
}
