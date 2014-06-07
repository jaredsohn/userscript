// ==UserScript==
// @name           Userscripts.org Obnoxious Scripts Remover
// @namespace      http://userscripts.org
// @description    Remove (hide) obnoxious script listings from userscripts.org
// @include        http://userscripts.org/*
// @include        http://*.userscripts.org/*
// ==/UserScript==
//v. 4.7


//
//Script Number list
//
var scriptslist = new Array ("14031", "13541", "15055", "15110", "15105", "15094", "15182", "15247", "15249", "15291", "14538", "15307", "15310", "15230", "15231", "15229", "14366", "15188", "15151", "15064", "15048", "15017", "15005", "15012", "14979", "14937", "14890", "14851", "14852", "14788", "15319", "15320", "15411", "15407", "15406", "15414", "15417", "15439", "15440", "15455", "15510", "15486", "15533", "15614", "15621", "15660", "15639", "15652", "15656", "15651", "15684", "15682", "15758", "15809", "15959", "15839", "15971", "16072", "16069", "16068", "16077", "16049", "16038", "16031", "16024", "14917", "15972", "16107", "16252", "16200", "16208", "16279", "16295", "16299", "16129", "16304", "16303", "16322", "16419", "16409", "16422", "16411", "16390", "16383", "16379", "16371", "16415", "14944", "16418", "16410", "16438", "16439", "16436", "15736", "16440", "16493", "16497", "16494", "16499", "16348", "16513", "16514", "16516", "16529", "16549", "16541", "16545", "16551", "16536", "16531", "16526", "16441", "16417", "16699", "17967", "17968", "17969", "17970", "17971", "18592", "18382", "18679", "18645", "19086", "19089", "19090", "19471", "19473", "19467", "19418", "19416", "19408", "19392", "19089", "18904", "19592", "19503", "19470", "19407", "19579", "19650", "19653", "19655", "19935", "19939", "19940", "19915", "19916", "19917", "19918", "19922", "19874", "19662", "19977", "19666", "17297", "20278", "20274", "20266", "20237", "20170", "20199", "20202", "16351", "20182", "20184", "20186", "20187", "20188", "20189", "20190", "20191", "20193", "20194", "20195", "20196", "20175", "20116", "20110", "20111", "20107", "20048", "20438", "20457", "20454", "20445", "20437");
//"10314", "12535", "12536", "12537", "12538", "12539", "12540", "12541", "20330"


//
//Script Title List
//
var titleslist = new Array("OGame", "isnoop.net", "orkut", "scrap all", "pak idol", "ANQ", "morkut", "Scraps Friends Lite", "SUPERSCRAP", "ForwardScrap", "ScrapAll", "JuST4U", "skraps", "scrap-all", "Coolfonts", "Facekut", "RedOrkut", "PretOrkut", "scrapper", "Xtreme-Style", "Scrap Sending Technique", "Scrap on 280", "this scrap", "Super Scraper", "scrap to", "Universal Scraps", "scarp", "scrap 2", "send scrap", "scrapz", "scrap to", "anish", "sraps", "scraps", "travian3", "travian", "mass-scrap", "sendscrap2all", "Scrappp");

//
//Script Description List
//
var description_list = new Array("scraps all", "Envie scraps", "sends scrap", "send scrap", "Creates fake accounts in ORKUT", "test script", "to all of ur friends at once", "scrapping all your friends", "It Sends Same Scrap", "new features added by Aman", "ScrapBook Flooder", "send scraps", "orkut");


//
// Partial Word List
//
var partialWordList = new Array (" Sahil", "scrap ", " scrap ", " ur ");


//
/**
 **
 **/
var XPathList1 = new Array("//tr/td[@class='script-install']/a", "//tr/td[@class='script-meat']/a[@class='title']", "//tr/td[@class='script-meat']/p[@class='desc']");
//var XPathList2 = new Array("//div[@class='container']/div[3]/a", "//div[@class='container']/div[5]/a");
var XPathList2 = new Array("/html/body/div[2]/div[4]/a", "/html/body/div[2]/div[6]/a");
var i, lr, mainPage, wclh = window.content.location.href.toString();

function removeMain(mlist,nod) {
	var obj1 = nod.textContent.toString();
	for (var ii = 0; ii<mlist.length; ii++) {
		test = new RegExp("\\b"+mlist[ii]+"\\b","gi");
		if (obj1.match(test)) {
			if (mainPage=="false") {
				mpfalse(nod);
			} else if (mainPage=="true") {
				mptrue(nod);
			}
			break;
		}
	}
}

function removeByScriptNum(passList, nod) {
	var num = nod.href.toString();
	if (num.match(/\.user\.js$/i)!=-1) {num = num.match(/\d{1,7}/i);}
	else {num = num.match(/\d{1,7}$/i);}
	var test = new RegExp("\\b"+num+"\\b","gi");
	if (passList.match(test)) {
		if (mainPage=="false") {
			mpfalse(nod);
		} else if (mainPage=="true") {
			mptrue(nod);
		}
	}
}

function removePartialMatch(mlist,nod) {
	var obj1 = nod.textContent.toString();
	for (var iii = 0; iii<mlist.length; iii++) {
	test = mlist[iii];
		if (obj1.search(test)!=-1) {
			if (mainPage=="false") {
				mpfalse(nod);
			} else if (mainPage=="true") {
				mptrue(nod);
			}
			break;
		}
	}
}

function mptrue(nod) {
	nod.setAttribute("style" , "color:#bbbab9!important;font-size:75%!important;");
	nod.textContent="--OBNOXIOUS - REMOVED--";
	nod.removeAttribute("href");
}

function mpfalse(nod) {
	nod.parentNode.parentNode.setAttribute("style" , "display: none !important; visibility: hidden !important;");
}

function cleanScriptList(XP,c) {
	nodes = document.evaluate(XP, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (c==0) {
		for (i = 0; i<nodes.snapshotLength; i++) {
			var passList = scriptslist.join(" ");
			removeByScriptNum(passList,nodes.snapshotItem(i));
		}
	} else if (c==1||c==2) {
		if (c==1) {var passList = titleslist;} else if (c==2) {var passList = description_list;}
		for (i = 0; i<nodes.snapshotLength; i++) {
			removeMain(passList,nodes.snapshotItem(i));
			removePartialMatch(partialWordList,nodes.snapshotItem(i));
			//if (c==1) {removePartialMatch(partialWordList,nodes.snapshotItem(i));}
		}
	}
}

function cleanMainPage(XP) {
	nodes = document.evaluate(XP, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var passList = scriptslist.join(" ");
	for (i = 0; i<nodes.snapshotLength; i++) {
		removeByScriptNum(passList, nodes.snapshotItem(i));
		removeMain(titleslist,nodes.snapshotItem(i));
		removePartialMatch(partialWordList,nodes.snapshotItem(i));
	}
}

if (wclh.match(/\/$/)||wclh.match(/\/index.html$/)) {
	mainPage ="true";
	for (lr = 0; lr<XPathList2.length; lr++) {
		cleanMainPage(XPathList2[lr]);
	}
} else if (wclh.match(/\/scripts$/i)||wclh.match(/\/scripts\?page\=\d{1,4}$/)) {
	mainPage ="false";
	for (lr = 0; lr<XPathList1.length; lr++) {
		cleanScriptList(XPathList1[lr],lr);
	}
}
