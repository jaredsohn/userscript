/*
* WP-Rechtschreibpruefung, Version: 0.5.25beta, Date: 2013-07-23
 *TODO: Klammerungen in der Markierungsliste durch (?:text)  ersetzten und RegExp-Syntax ausbackslashen, irgendeine id-Moeglichkeit zur Unterscheidung text-regexp, Schriftgroesse dynamisch anpassen
* Copyright (C) 2005-2013 Frank Rechenberger <revvar@gmx.de>
* Released under the GPL license
* http://www.gnu.org/copyleft/gpl.html
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 2 as
* published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty
* of MERCHANTABILITY or FITNESS FOR A PARTICULAR * PURPOSE.
* See the GNU General Public License for more details.
*/
// ==UserScript==
// @name WP-Rechtschreibpruefung
// @description Rechtschreibpruefung von deutschen Wikipedia-Artikeln, durch Kombination der Online-Dienste von www.canoo.com und wortschatz.uni-leipzig.de. Siehe http://de.wikipedia.org/wiki/Benutzer:Revvar/RT
// @include http://de.wikipedia.org/*
// @date 2013-07-23
// @version 0.5.25beta
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @grant       GM_log
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function() {
	if (document.getElementById("noarticletext")!=null) return;
	// prevent double injections (FF1.0.x) and iframes from other scripts
	if (document.getElementById("RTInjected") || document.lastModified == '01/01/1970 00:00:00') return;
	cNode(document.body,"div",null,{id:"RTInjected",style:"display:none"});

	//check page type
	var url = decodeURIComponent(document.location.toString());
	var bTesting = false;
	var bDiff = false;
	var sLocals = "D";
	if (url.search("Diskussion:Revvar/RT") >= 0) bTesting = true;
	if (url.search("diff=") >= 0) bDiff = true;
	var bNoCheck = false;
	if (url.search(new RegExp("(L"+String.fromCharCode(246)+"schkandidaten|Spezial:|Wikipedia:Vandalensperrung|action=history)",""))>=0) bNoCheck = true; // FIXME: exclude meta pages
	if ((!bTesting) && bNoCheck && ((url.search("&action=edit")<0) && (url.search("&action=submit")<0))) return;

	//globals
	var TIMEBREAK=10;
	var HTTPTIMEOUT=90000;
	var DBTIMEOUT=4*60*60*1000; // timeout for db entries in ms
	var VERSION="0.5.25";
	var StatusStyle="z-index:98;background-color:#ffffff;border:1px solid grey;padding:2px;text-align:left;opacity:0.85;font:12px sans-serif;";
	var Logo=null,LogoBack=null,Status=null,oMarkCounter=null,iRequestID=0,timerDeleteView=null;
	var iMinor=parseInt(GM_getValue("minoredit","0"));
	var wsproxyDB = new Object();
	var knownWords = new Object();

	var sz=new Object(); //HACK-FF1.5: special german chars
	with (String) {
		sz["ae"]=fromCharCode(228);
		sz["oe"]=fromCharCode(246);
		sz["ue"]=fromCharCode(252);
		sz["Ae"]=fromCharCode(196);
		sz["Oe"]=fromCharCode(214);
		sz["Ue"]=fromCharCode(220);
		sz["sz"]=fromCharCode(223);
		sz["iiu"]=fromCharCode(8222);
		sz["iio"]=fromCharCode(8220);
		sz["io"]=fromCharCode(8216);
		sz["iu"]=fromCharCode(8218);
		sz["aph"]=fromCharCode(8217);
		sz["-"]=fromCharCode(8211);
	}

	var aExp=new Array(
		new Array("Wort nachschlagen...","",0),
		new Array("CanooNet","http://www.canoo.net/services/Controller?input=$1&MenuId=Search&service=canooNet&lang=de",0),
		new Array("Wortschatz Uni-Leipzig","http://wortschatz.uni-leipzig.de/cgi-bin/wort_www.exe?site=1&Wort=$1&sprache=de&x=0&y=0&cs=1",0),
		new Array("Duden","http://www.duden.de/suchen/dudenonline/$1",0),
		new Array("dict.leo.org","http://dict.leo.org/ende?lp=ende&lang=de&searchLoc=0&cmpType=relaxed&sectHdr=on&spellToler=on&search=$1&relink=on",0),
		new Array("BEOLINGUS","http://dict.tu-chemnitz.de/dings.cgi?lang=de&service=deen&opterrors=0&optpro=0&query=$1&iservice=&comment=",0),
		new Array("Wikipedia","http://de.wikipedia.org/w/index.php?title=Special%3ASearch&search=$1&fulltext=Suche",0),
		new Array("Wiktionary","http://de.wiktionary.org/wiki/Spezial:Search?search=$1&fulltext=Suche",0),
		new Array("WP-Weblink Suche","http://de.wikipedia.org/w/index.php?title=Spezial%3ALinksearch&target=$1",1),
		new Array("Amazon","http://www.amazon.de/s/?url=search-alias%3Daps&field-keywords=$1",0),
		new Array("WikiBlame","http://wikipedia.ramselehof.de/wikiblame.php?article=$2&needle=$1&lang=de",2),
		new Array("Google","http://www.google.de/search?hl=de&as_epq=$1&btnG=Google-Suche&meta=",0)
	);
	var aColor=null,aDefault=null,BCheck=null,oBreak=null,Quit=null,articleObj=null,aNavigator=null;
	var descLinks=new Array();//list of description links for wrong words
	var bBreak=false,cState=0,rcState=0,bDeleteView=false;
	var sToolLink="([[Benutzer:Revvar/RT|RT]])";
	var sLemma="";
	var aMarkList=null,oBDelMarks=null;

	//HACK-FF1.5: "\w" and "\b"  ignores special chars
	var wordCharsWoSz="a-zA-Z"+sz["ae"]+sz["Ae"]+sz["ue"]+sz["Ue"]+sz["oe"]+sz["Oe"];
	var wordCharsWoNumbers=wordCharsWoSz+sz["sz"];
	var wordChars=wordCharsWoNumbers+"0-9";
	var sSpaceChars="\\s.,\\-_!?\"/()[\\]{}':;<>|&="+sz["iiu"]+sz["iio"]+sz["iu"]+sz["io"]+sz["aph"]+sz["-"];

	// detect wikEd gadget
	var aScripts = document.getElementsByTagName("script");
	var isWikEd = false;
	var isWikEdEnabled = false;
	for (var i = 0 ; i < aScripts.length; i++) {
		if ((' ' + aScripts[i].src).search('wikEd.js') >= 0) {
			if (document.getElementById("wikEdLogoImg")) {
				isWikEd = true;
			}
			break;
		}
	}

	window.addEventListener("load", lateInit, true);

var mutexLateInit = false;
function lateInit() {
	if (mutexLateInit) return;
	mutexLateInit = true;
	var navi=document.getElementById("wprt-navi");

	if (isWikEd) {
		var oWikEdButton = document.getElementById("wikEdLogoImg");
		isWikEdEnabled = (oWikEdButton.src.search("disabled") < 0);
		oWikEdButton.addEventListener("click", function() {
			isWikEdEnabled = (oWikEdButton.src.search("disabled") < 0);
			if (navi) {
				navi.style.display = (isWikEdEnabled ? "none" : "");
			}
		}, true);
		
		if (navi && aNavigator) {
			navi.style.display = (isWikEdEnabled ? "none" : "");

			// fill searchbox in wikEd once
			var oWikEdFindSelect = document.getElementById("wikEdFindSelect");
			if (oWikEdFindSelect) oWikEdFindSelect.addEventListener("click", eventFillWikEdFind, true);

			// add external search field
			var oWikEdFindText = document.getElementById("wikEdFindText");
			if (oWikEdFindText) {
				new CWikEdTExp(oWikEdFindText.parentNode,oWikEdFindText);
			}
		}
	}
}

// fill searchbox in wikEd
function eventFillWikEdFind() {
	if (!aNavigator) return;

	var oWikEdFindSelect = document.getElementById("wikEdFindSelect");
	var aWordList = aNavigator.opGetWords();

	if (oWikEdFindSelect && aWordList) {
		var oActOptions = new Object();
		for (var i = 0 ; i < oWikEdFindSelect.length; i++) oActOptions[oWikEdFindSelect.options[i].value] = true;

		for (var i = 0; i < aWordList.length; i++) if (typeof(oActOptions[aWordList[i][1]]) == 'undefined') {
			var opt = new Option(aWordList[i][1], aWordList[i][1]);
			opt.setAttribute("style", "background-color:" + aColor[aWordList[i][0]][0]);
			opt.setAttribute("title", aColor[aWordList[i][0]][2]);
			oWikEdFindSelect.options[oWikEdFindSelect.length] = opt;
		}
	}
}

function init()
{
	if (GM_getValue("autoupdatecheck",true)) check4Update();

	//special actions on update
	var iRunOnce=GM_getValue("runonce",0);
	switch (iRunOnce) {
		//0.5.2: update cats to new format
		case 0: check4Update(true);
		case 1: GM_setValue("catsA","");GM_setValue("catsCH","");
		default: GM_setValue("runonce",2);
	}

	//get Lemma
	var h1=document.getElementsByTagName("H1");
	if ((h1) && (h1[0])) {
		if (h1[0].firstChild.nodeType == 3) {
			sLemma=h1[0].firstChild.data;
			if (sLemma == "Bearbeiten von ") {
				sLemma=h1[0].firstChild.nextSibling.firstChild.data;
			} else if (sLemma.substr(0, "Bearbeiten von ".length) == "Bearbeiten von ") {
				sLemma = sLemma.replace(/^Bearbeiten von .(.*).$/i, "$1");
			}
		} else {
			sLemma=h1[0].firstChild.firstChild.data;
			// kursiv geschriebene Lemmas
			if (!sLemma) {
				sLemma=h1[0].firstChild.firstChild.firstChild.data;
			} else if (sLemma == '„') {
				sLemma=h1[0].firstChild.firstChild.nextSibling.firstChild.data;
			}
			sLemma = sLemma.replace(/^„(.*)“ – Bearbeiten$/i, "$1");
		}
		sLemma = sLemma.replace(/^(Bearbeiten von ){0,1}(.+?)( [(](Absatz|Abschnitt)[)]){0,1}$/,"$2");
	}

	//disable scripting at unload time
	window.addEventListener("unload", cleanupGlobals, true);

	C_ERROR=0;C_CONTEXT=1;C_UNKNOWN=2;C_UNUSUAL=3;C_RARE=4;C_NAME=5;C_UNMARKED=6;C_OWN=7;
	aDefault=new Array("#ffaaaa","#ffcc4a","#ffff88","#ffdcaa","#ffccff","#ccccff","#eeeeee","#bbff77");

	var cColorOff=GM_getValue("c_unmarked",aDefault[C_UNMARKED]);

	aColor=new Array(8);
	aColor[C_ERROR]=new Array(GM_getValue("c_error",aDefault[C_ERROR]),cColorOff,"Fehler",0,"c_error");
	aColor[C_CONTEXT]=new Array(GM_getValue("c_context",aDefault[C_CONTEXT]),cColorOff,"bedeutungsabh"+sz["ae"]+"ngig",0,"c_context");
	aColor[C_UNKNOWN]=new Array(GM_getValue("c_unknown",aDefault[C_UNKNOWN]),cColorOff,"unbekannte W"+sz["oe"]+"rter",0,"c_unknown");
	aColor[C_UNUSUAL]=new Array(GM_getValue("c_unusual",aDefault[C_UNUSUAL]),cColorOff,"sehr seltene W"+sz["oe"]+"rter",0,"c_unusual");
	aColor[C_RARE]=new Array(GM_getValue("c_rare",aDefault[C_RARE]),cColorOff,"seltene W"+sz["oe"]+"rter",0,"c_rare");
	aColor[C_NAME]=new Array(GM_getValue("c_name",aDefault[C_NAME]),cColorOff,"Namen",0,"c_name");
	aColor[C_UNMARKED]=new Array(cColorOff,GM_getValue("c_unknown",aDefault[C_UNMARKED]),"unmarkierte W"+sz["oe"]+"rter",1,"c_unmarked");
	aColor[C_OWN]=new Array(GM_getValue("c_own",aDefault[C_OWN]),cColorOff,"Markierungsliste",0,"c_own");

	GM_registerMenuCommand("WP-RP: Konfiguration",showConfig);

	//check locals FIXME: read it from the db
	var oCats=document.getElementById("catlinks");
	if (oCats) {
		var sxCHCats=""+GM_getValue("catsCH","");
		var sxACats=""+GM_getValue("catsA","");
		var sxBlackCats=""+GM_getValue("catsblacklist","-");
		if ((sxCHCats!="") && (sxACats!="") && (oCats.firstChild)) {
			var xCHCats=new RegExp(sxCHCats);
			var xACats=new RegExp(sxACats);
			var xBlackCats=new RegExp(sxBlackCats);

			var oChild=oCats.firstChild.firstChild;
			while (oChild) {
				if (oChild.firstChild) {
					var content=""+oChild.firstChild.innerHTML;
					if (sLocals == "D") {
						if (content.search(xCHCats)==0) sLocals="CH";
						else if (content.search(xACats)==0) sLocals="A";
					}
					if (content.search(xBlackCats) == 0) {
						sLocals="D";
						break;
					}
				}
				oChild=oChild.nextSibling;
			}
		}
	}

	var pTextArea = document.getElementById("wpTextbox1");
	var aWordList = new Array();

	checkDBTimes();
	if (pTextArea) {
		aWordList = getMarks(sLemma, {type:true, word:true, state:false}, true, true);
		if (aWordList.length > 0) {
			// show locals if not D
			if (sLocals != "D") {
				var h1 = document.getElementsByTagName("H1");
				if (h1) if (h1[0]) h1[0].innerHTML += " <small>(" + sLocals + ")</small>";
			}

			//prepare the save button, to add adlink to summary
			var oWpSave = document.getElementById("wpSave");
			if (oWpSave) {
				oWpSave.addEventListener("click", function(e) {
					var oCbAdLink=document.getElementById("cbAdLink");
					if (oCbAdLink) if (oCbAdLink.checked) {
						var oWpSummary = document.getElementById("wpSummary");
						if ((oWpSummary) && (oWpSummary.value.search(sToolLink) < 0)) {
							oWpSummary.value += " " + sToolLink;
						} else GM_log("error: save button, but no summary field?");
					}
				},true);
			}

			if (aWordList.length > 0) {
				var oSumm = document.getElementById("wpSummary");
				if (oSumm) {
					var sSumm = GM_getValue("summary", "ortho");
					if (sSumm.length > 0) if (oSumm.value.search(sSumm) < 0) oSumm.value += sSumm;
				}
				if (iMinor > 0) {
					var oMinor = document.getElementById("wpMinoredit");
					if (oMinor) oMinor.checked = (iMinor == 1);
				}
			}

			// append checkbox for link to project page
			var oMinorEdit=document.getElementById("wpWatchthis");
			if (oMinorEdit) {
				var oCBAdLink=cNode(null,"input",null,{id:"cbAdLink",type:"checkbox",style:"margin-left:8px"});
				var oTAdLink=document.createTextNode("Toollink anf"+sz["ue"]+"gen");
				oMinorEdit.parentNode.insertBefore(oCBAdLink,oMinorEdit.nextSibling.nextSibling.nextSibling);
				oMinorEdit.parentNode.insertBefore(oTAdLink,oCBAdLink.nextSibling);
				oCBAdLink.checked=GM_getValue("summaryAdlink",true);
			} else GM_log("can't find minor edit checkbox");

			showNavigator(pTextArea,aWordList);
		} else showNavigator(pTextArea,null);
	}
	if (((!bNoCheck) || bTesting) && (!bDiff)) {
		// normal mode -> show check button & add secure logout link
		body=document.getElementById("wikiPreview");
		if (body) if (!body.hasChildNodes()) return; //edit without preview
		if (!body) body=document.getElementById("bodyContent");
		if (!body) body=document.getElementById("article");
		if (!body) {GM_log("body is null");return;}

		if (!restoreMarks()) showCheckButton(true);
	}
	if (!document.getElementById("ctextexplain")) oFlyingTExp=new CFlyingTExp(window);
}

function showCheckButton(firstrun)
{
	// secure logout-link
	var oLogout=document.getElementById("pt-logout");
	if (oLogout) {
		oLogout.addEventListener("click", function (e) {
			if (confirm("Wollen Sie sich wirklich abmelden=[Ok] oder [Abbrechen] ?")==false) e.preventDefault();
		}, true);
	} else GM_log("warning: element pt-logout not found.");

	if (firstrun && (GM_getValue("autorun",false))) {
		createView();
		controller();
	} else {
		// create button
		var buttonTop = 14;
		if (document.body.getAttribute('class').search('vector') >= 0) {
			buttonTop = 26;
		}
		BCheck=cNode(
				document.body,
				"button",
				((bTesting) ? "Test starten" : "Pr"+sz["ue"]+"fen" + ((sLocals=="D") ? "" : " ("+sLocals+")")),
				{
					class:"noprint", 
					id:"bCheckS",
					style:"position:fixed;z-index:99;top:" + buttonTop + "px;right:20px;font-weight:bold;" + ((bTesting) ? "background-color:#aaffaa;" : "opacity:0.7;")
				}
		);
		BCheck.addEventListener(
			"click",  	
			function() {
				if (!bBreak) {
					BCheck = delDomNode(document.body, BCheck);
					createView();
					controller();
					
				}
			}, 
			true
		);
	}
}

function cNode(nRoot,nType,nText,nAttr)
{
	var elem=document.createElement(nType);
	if (nAttr) for (var aid in nAttr) elem.setAttribute(aid,nAttr[aid]);
	if (nText) elem.appendChild(document.createTextNode(nText));
	if (nRoot) nRoot.appendChild(elem);
	return elem;
}

function showNavigator(pTextArea,pWordList)
{
	if ((pWordList==null) || (pWordList.length==0) || (pWordList[0].length==0)) pWordList=null; // no words
	// delete old Navibar
	var navi=document.getElementById("wprt-navi");
	if (navi) {
		navi.parentNode.removeChild(navi);
	}
	if (aNavigator) {
		aNavigator.cleanup();
		delete aNavigator;
		aNavigator=null;
	}

	aNavigator=new CTextAreaNavigator(pTextArea,pWordList);
	var Navi=aNavigator.opGetView();
	var toolbar=document.getElementById("toolbar");
	if (!toolbar) {
		editform=document.getElementById("editform");
		if (editform) {
			aNavigator.oParent=editform.parentNode;
			editform.parentNode.insertBefore(Navi,editform);
		} else GM_log("error: neither toolbar nor editform found");
	} else if (isWikEd) {
		toolbar.parentNode.insertBefore(Navi, toolbar);
		aNavigator.oParent=toolbar.parentNode;
	} else {
 		toolbar.setAttribute("style","width:100%");
		toolbar.appendChild(Navi);
		aNavigator.oParent=toolbar;
	}
	setTimeout(function() {aNavigator.opRefreshView()},10);//HACK
}

//BEGIN: class CTextAreaNavigator
function CTextAreaNavigator(oTextArea,aWordList)
{
	if ((!oTextArea) || ((aWordList!=null) && (aWordList.length<1))) throw("CTextAreaNavigator: Invalid Arguments");
	var self=this;
	var iActOffset=0;
	var iActWord=(aWordList)?0:-1;
	var sActWord=(aWordList)?aWordList[iActWord][1]:"Suchen...";
	var Navi=null;
	var oActWord=null;
	this.oParent=null;
	this.oExp=null;

	this.cleanup=function()
	{
		if (aWordList) {delete self.aWordList;self.aWordList=null;}
	}
	this.opSelectWord=function ()
	{
		if (aWordList) oTextArea.focus();
		if (iActOffset<0) {
			try {
				oTextArea.setSelectionRange(0,0);
			} catch(e) {}
			return;
		}

		//HACK: scroll to selection
		var sOrginal=oTextArea.value;
		oTextArea.value="";
		var sHEmpty=oTextArea.scrollHeight;
		oTextArea.value=sOrginal.substr(0,iActOffset);
		var sHSel=oTextArea.scrollHeight;
		oTextArea.value=sOrginal;
		if (sHSel<=sHEmpty) sHSel=0;
		if (sHSel>50) sHSel-=50;
		oTextArea.scrollTop=sHSel;

		//select
		try {
			oTextArea.setSelectionRange(iActOffset,iActOffset);
			oTextArea.setSelectionRange(iActOffset,iActOffset+sActWord.length);
		} catch(e) {}
	}
	this.opGotoNextOcc=function (e)
	{
		self.opSetState("yellow");
		if (iActOffset<=0) iActOffset=-sActWord.length;
		var xActWord=new RegExp("[^"+wordChars+"]"+sActWord+"[^"+wordChars+"]");
		var newOffset=(" "+oTextArea.value.substr(iActOffset+sActWord.length,oTextArea.value.length-1)+" ").search(xActWord);
		if (newOffset>=0)
		{
			iActOffset+=newOffset+sActWord.length;
		} else {
			newOffset=(" "+oTextArea.value.substr(iActOffset,oTextArea.value.length-1)+" ").search(xActWord);
			if (newOffset<0)
			{
				iActOffset=(" "+oTextArea.value+" ").search(xActWord);
			} else iActOffset+=newOffset;
		}
		self.opSelectWord();
		self.opSetState(((iActOffset<0)?"lightgreen":"white"));
		delete xActWord;
	}

	this.opGotoPrevOcc=function (e)
	{
		self.opSetState("yellow");
		if (iActOffset<0) iActOffset=0;
		var xActWord=new RegExp("[^"+wordChars+"]"+sActWord+"[^"+wordChars+"]");
		var newOffset=(" "+oTextArea.value.substr(0,iActOffset).split(new RegExp("["+sSpaceChars+"]","")).reverse().join(" ")+" ").search(xActWord);
		if (newOffset>=0)
		{
			iActOffset=iActOffset-sActWord.length-newOffset;
		} else {
			newOffset=(" "+oTextArea.value.substr(iActOffset,oTextArea.value.length-1)+" ").search(xActWord);
			if (newOffset<0)
			{
				iActOffset=(" "+oTextArea.value+" ").search(xActWord);
			} else iActOffset+=newOffset;
		}
		self.opSelectWord();
		self.opSetState(((iActOffset<0)?"lightgreen":"white"));
		delete xActWord;
	}
	this.opSetWord=function (sWord,bInt)
	{
		sActWord=sWord;
		if (oActWord) oActWord.firstChild.data=" "+sActWord+" ";
		if (self.oExp) self.oExp.opSetText(sActWord);
		iActOffset=0;
		if (bInt==null) iActWord=-1;
		self.opGotoNextOcc();
	}
	this.opNextWord=function (e)
	{
		if (iActWord<aWordList.length-1)
		{
			iActWord++;
			self.opSetWord(aWordList[iActWord][1],true);
		} else {
			self.opGotoNextOcc();
			self.opSelectWord();
		}
	}
	this.opPrevWord=function (e)
	{
		if (iActWord>0)
		{
			iActWord--;
			self.opSetWord(aWordList[iActWord][1],true);
		} else {
			iActWord=0;
			self.opGotoNextOcc();
			self.opSelectWord();
		}
	}
	this.opSetState=function(sState)
	{
		if (oActWord) {
			oActWord.setAttribute("style","border:4px solid "+sState+";background-color:"+((iActWord<0)?"white":aColor[aWordList[iActWord][0]][0]));
		}
	}
	this.opRefreshView=function ()
	{
		oActWord.firstChild.data=" "+sActWord+" ";
	}
	this.opGetView=function ()
	{
		if (Navi==null)
		{
			Navi=cNode(null,"div",null,{style:"float:right",id:"wprt-navi"});
			self.oExp=new CStaticTExp(Navi,oTextArea,self.opSetWord);
			self.oExp.opSetText(sActWord);
			oActWord=cNode(Navi,"span",sActWord,{style:"margin:2px"});
			self.opSetState(((iActOffset<0)?"lightgreen":"white"));
			if (aWordList) {
				var prevWord=cNode(Navi,"button","|<",{style:"margin:2px",title:"Vorheriges Wort"});
				prevWord.addEventListener("click",self.opPrevWord,true);
			}
			var prevOcc=cNode(Navi,"button","<<",{style:"margin:2px",title:"Vorheriges Vorkommen des Wortes"});
			prevOcc.addEventListener("click",self.opGotoPrevOcc,true);
			var nextOcc=cNode(Navi,"button",">>",{style:"margin:2px",title:"N"+sz["ae"]+"chstes Vorkommen des Wortes"});
			nextOcc.addEventListener("click",self.opGotoNextOcc,true);
			if (aWordList) {
				var nextWord=cNode(Navi,"button",">|",{style:"margin:2px",title:"N"+sz["ae"]+"chstes Wort"});
				nextWord.addEventListener("click",self.opNextWord,true);
			}
		}
		return Navi;
	}

	this.opGetWords=function ()
	{
		return aWordList;
	}

	if (aWordList) self.opGotoNextOcc();
} //END: class CTextAreaNavigator

//BEGIN: class CTextExplain
function CTextExplain()
{
	var self=this;
	this.sText="";
	this.orgText="";
	this.oList=cNode(null,"select",null,{style:"margin:2px",id:"ctextexplain"});
	this.fListAfterChange=null;

	var sOptions="";
	for (var i=0;i<aExp.length;i++) sOptions+="<OPTION VALUE=\""+i+"\">"+aExp[i][0]+"</option>";
	self.oList.innerHTML+=sOptions;

	this.oList.addEventListener("change",
		function(e) {
			e.preventDefault();
			with (self) if ((oList.value>0) && (sText.length>0)) {
				var tmp_text;
				switch (aExp[oList.value][2]) {
					case 1: tmp_text = orgText;break;
					case 2: tmp_text = encodeURIComponent(orgText);break;
					default: tmp_text = escape(sText);
				}
				window.open(aExp[oList.value][1].replace("$1",tmp_text).replace("$2",sLemma));
				oList.value=0;
				if (fListAfterChange) fListAfterChange();
			}
		},false);

}//END: class CTextExplain

//BEGIN: class CStaticTExp:CTextExplain
function CStaticTExp(oViewRoot,oTextSource,fTextDependence)
{
	var self=this;
	this.constructor();
	this.oTextSource=oTextSource;
	this.fTextDependence=fTextDependence;
	this.oInput=cNode(oViewRoot,"input",null,{size:"15",style:"margin:2px"});

	this.oInput.addEventListener("keyup",
	function (e) {
		with (self) {
			sText = oInput.value;
			orgText = sText;
			if ((e.which==13) && (fTextDependence)) fTextDependence(sText);
		}
	},true);

	oViewRoot.appendChild(self.oList);

	this.oTextSource.addEventListener("select",
	function(e) {
		with (self.oTextSource) {
			self.oInput.value=trimWord(value.substring(selectionStart,selectionEnd));
			self.sText=self.oInput.value;
			self.orgText = self.sText;
		}
	}, true);

	this.opSetText=function(text)
	{
		self.oInput.value=text;
		self.sText=text;
		self.orgText = text;
	}

}
CStaticTExp.prototype=new CTextExplain();
//END: class CStaticTExp

//BEGIN: class CFlyingTExp:CTextExplain
function CFlyingTExp(oRoot)
{
	if (!oRoot.getSelection) throw("CFlyingTExp:wrong root");
	var self=this;
	this.constructor();
	var sListAttr="position:absolute;z-index:99;top:$1px;left:$2px;";
	this.fListAfterChange=function() {self.oList.setAttribute("style","0&0".replace(/([^&]+)&([^&]+)/,sListAttr)+"visibility:hidden;display:none;");self.bVisible=false;};
	this.fListAfterChange();
	this.oList.setAttribute("size",aExp.length);
	this.oList.className = "kontextmenue";
	this.oRoot=oRoot;
	this.selected_text = "";
	this.bVisible=false;
	oRoot.document.body.appendChild(this.oList);
	oRoot.addEventListener("mouseup",
		function(e) {
			if (("" + self.oRoot.getSelection()).length > 0) self.selected_text = "" + self.oRoot.getSelection();
		}, false);

	oRoot.addEventListener("mouseup",
		function(e) {
			if (("" + self.oRoot.getSelection()).length > 0) self.selected_text = "" + self.oRoot.getSelection();
		}, false);

	oRoot.addEventListener("mousedown",
		function(e) {
			if (e.which==1) with (self) {
				var iX=e.pageX-oRoot.document.body.offsetLeft;
				var iY=e.pageY-oRoot.document.body.offsetTop;
				if ((!bVisible) || (!((iY>=oList.offsetTop) && (iY<=(oList.offsetTop+oList.offsetHeight)) && (iX>=oList.offsetLeft) && (iX<=(oList.offsetLeft+oList.offsetWidth))))) {
					if (e.ctrlKey || e.altKey) {
						var sel_text = selected_text;
						var o_s=sel_text.replace(/^\s*(\S.*\S)\s*$/,"$1");
						var space_chars="";
						with (String) space_chars = "\\s.,\\-_!?\"/()[\\]{}':;<>|&="+fromCharCode(8222)+fromCharCode(8220)+fromCharCode(8216)+fromCharCode(8218)+fromCharCode(8217)+fromCharCode(8211);
						var s=o_s.replace(/[.,;]/g,"").replace(new RegExp("^(["+space_chars+"])+","g"),"").replace(new RegExp("(["+space_chars+"])+$","g"),"");
						if (s.length>0) {
							e.preventDefault();
							orgText=o_s;
							sText=s;

							/* show first chars of the selected text within the box */
							var s_first = s;
							if (s_first.length > 19) s_first = s_first.substr(0,16) + "..."
							oList.firstChild.firstChild.data= "\"" + s_first + "\"-->";
							oList.firstChild.setAttribute("style","background-color: #333; color: #ddd");

							/* calculate display postion */
							oList.setAttribute("style","0&0".replace(/([^&]+)&([^&]+)/,sListAttr)+"visibility:hidden;")
							var x_pos = e.pageX;
							var y_pos = e.pageY;
							if ((x_pos + oList.offsetWidth + 40) > window.pageXOffset + window.innerWidth) x_pos = window.pageXOffset + window.innerWidth - oList.offsetWidth - 40;
							if ((y_pos + oList.offsetHeight + 40) > window.pageYOffset + window.innerHeight) y_pos = window.pageYOffset + window.innerHeight - oList.offsetHeight - 40;

							oList.setAttribute("style",(y_pos+"&"+x_pos).replace(/([^&]+)&([^&]+)/, sListAttr));
							bVisible=true;
						}
						if (bOpera) {
							oList.focus();
						}
					} else if (bVisible) {
						e.preventDefault();
						fListAfterChange();
					}
				}

			}
		},false);
}
CFlyingTExp.prototype=new CTextExplain();
//END: class CFlyingTExp

//BEGIN: class CWikEdTExp:CTextExplain
function CWikEdTExp(oViewRoot,oInput)
{
	var self=this;
	this.constructor();
	this.oInput = oInput;
	this.oList.setAttribute("class", "wikEdCombo");

	this.oInput.addEventListener("keyup",
		function (e) {
			with (self) {
				sText=oInput.value;
				orgText = sText;
			}
		}, true);

	this.oInput.addEventListener("blur",
		function (e) {
			with (self) {
				sText=oInput.value;
				orgText = sText;
			}
		}, true);

	oViewRoot.appendChild(self.oList);


	this.opSetText=function(text)
	{
		self.oInput.value=text;
		self.sText=text;
		self.orgText = text;
	}

}
CWikEdTExp.prototype=new CTextExplain();
//END: class CStaticTExp


function createView()
{
	if (Logo!=null) {
		GM_log("view already created");
		return;
	}
	// service provider logos
	var logoatt="position:fixed;top:20px;right:0px;padding:2px;text-align:center;width:260px;";
	Logo=document.createElement("div");
	Logo.setAttribute("style",logoatt+"z-index:98;");
	Logo.innerHTML+='<br/><table width="95%" style="background-color:white"><tr><td width="50%"><span style="font-weight:bold;font-family:Arial,Helvetica;font-size:20px"><a href="http://www.canoo.net"><span style="color:#0099ff">canoo</span><span style="color:#7b797b">net</span></a></span></td><td width="50%"><span style="font-family:Arial,Helvetica"><a href="http://wortschatz.uni-leipzig.de"><span style="font-weight:bold;font-size:12px"><span style="color:#007DC5">WORT</span><span style="color:#202020">SCHATZ</span></span><br/><span style="color:white;background-color:#949994;font-size:10px">UNIVERSIT'+sz["Ae"]+'T LEIPZIG</span></a></span></td></tr><tr><td colspan="2"><span style="font-size:8px;font-weight:normal;color:#a0a0a0">(C) 2005-2013 Frank Rechenberger - <a href="http://www.gnu.org/copyleft/gpl.html" style="color:#a0a0a0 !important">GPL license</a></span></td></tr></table>';
	document.body.appendChild(Logo);
	var sTop=Logo.offsetHeight+24;
	LogoBack=document.createElement("div");
	LogoBack.innerHTML+='<span style="color:black;font-size:9px;vertical-align:top">Service Provider:</span>';
	LogoBack.setAttribute("style",logoatt+"z-index:97;opacity:0.75;background-color:#ffffff;height:"+Logo.offsetHeight+"px");
	Status=document.createElement("div");
	Status.setAttribute("style",StatusStyle+"position:fixed;top:"+sTop+"px;right:0px;width:259px;");
	document.body.appendChild(LogoBack);
	document.body.appendChild(Status);
	//Break button
	oBreak=cNode(Status,"button","Abbruch",{style:"font-size:8px;padding:0px;"});
	oBreak.addEventListener("click",  function(e){bBreak=true;location.reload();}, true);
	Status.appendChild(document.createElement("div"));
	//Quit button
	Quit=cNode(Logo,"button","X",{style:"position:absolute;top:0px;right:0px;font-size:8px;padding:0px;"});
	Quit.addEventListener("click",  deleteView, true);
	Quit.disabled=true;
	// Textnode for messages
	LogMessage=document.createTextNode("");
	Status.appendChild(LogMessage);
}

function deleteView()
{
	if (timerDeleteView) clearTimeout(timerDeleteView);
	if (bBreak) return;
	if (bDeleteView) return;
	bDeleteView=true;
	if (Quit) {delete Quit;Quit=null; }
	Logo=delDomNode(document.body,Logo);
	LogoBack=delDomNode(document.body,LogoBack);
	if (!Status) Status=cNode(document.body,"div",null,null);
	var top=GM_getValue("wpRTStatusTop",10);
	var left=GM_getValue("wpRTStatusLeft",10);
	Status.setAttribute("style",StatusStyle+"position:absolute;;top:10px;left:10px;visibility:hidden");
	if (top>document.height-Status.clientHeight) top=document.height-Status.clientHeight;
	if (left>document.width-Status.clientWidth) left=document.width-Status.clientWidth;
	Status.setAttribute("style",StatusStyle+"position:fixed;;top:"+top+"px;left:"+left+"px;");

	bMove=false;
	Status.addEventListener("click", function(e) {e.preventDefault(); if (bMove) setMiniView(e);else bMove=true;}, true);
	document.body.addEventListener("mousemove",  function(e) {if (bMove) { e.preventDefault();moveMiniView(e);}}, true);
}

function setMiniView(e)
{
	try {
		bMove=false;
		var y=e.pageY-window.pageYOffset-Status.clientHeight/2;if ((y==Number.NaN) || (y<0)) y=0;
		var x=e.pageX-window.pageXOffset-Status.clientWidth/2;if ((x==Number.NaN) || (x<0)) x=0;
		Status.setAttribute("style",StatusStyle+"position:fixed;top:"+y+"px;left:"+x+"px;");
		GM_setValue("wpRTStatusTop",Status.offsetTop);
		GM_setValue("wpRTStatusLeft",Status.offsetLeft);
	} catch(e) {GM_log(e);}
}

function moveMiniView(e)
{
	try {
		var y=e.pageY-Status.clientHeight/2;if ((y==Number.NaN) || (y<0)) y=0;
		var x=e.pageX-Status.clientWidth/2;if ((x==Number.NaN) || (x<0)) x=0;
		Status.setAttribute("style",StatusStyle+"position:absolute;top:"+y+"px;left:"+x+"px;");
	} catch(e) {GM_log(e);}
}

function setFinalView()
{
	if (Quit) Quit.disabled=false;
	oBreak=delDomNode(Status,oBreak);
	//"delete marks" button
	oBDelMarks=cNode(Status,"button","Ergebnis l"+sz["oe"]+"schen",{"id":"bRTDelete"});
	oBDelMarks.addEventListener("click",  deleteMarks, true);
}

function appendOwnMarks(words)
{
	/*if (sLocals=="CH") words.push(new Array(0,"(?:["+wordCharsWoSz+"]*"+sz["sz"]+"["+wordCharsWoSz+"]*)+"));*/
	var sOwnMarks=GM_getValue("ownmarklist",null);
	if (sOwnMarks) {
		var aOwnMarks=decodeURIComponent(sOwnMarks).split(",,");
		for (var i=0;i<aOwnMarks.length;i++) if (aOwnMarks[i].search(/[^\s]/)>=0) words.push(new Array(C_OWN,"(?:"+aOwnMarks[i]+")"));
	}
	return words;
}

function controller(words)
{
	if (bBreak) return;
	switch (cState)
	{
		case 0: cState++;getObjects(body,controller);break;
		case 1: cState++;getText(words,controller);break;
		case 2: {
			articleObj=words.articleObj;
			cState++;transformText(words.aTxt,checkTextController);
		};break;
		case 3: cState++;getWordsFromWsproxy(words);break;
		case 4: cState++;checkMeanings(words);break;
		case 5: cState++;checkNames(words);break;
		case 6: cState++;checkFrequencies(words,"de");break;
		case 7: cState++;checkFrequencies(words,"en");break;
		case 8: cState++;sendWordsToWsproxy(words);break;
		case 9: {
			words=appendOwnMarks(words);
			oMarkCounter=new CMarkCounter(Status,aColor.length,aColor);
			cState++;markWords(words,controller);
		};break;
		case 10: cState++;createMarkList(controller,null,words);break;

		default:{
			saveMarksToDB();

			var mc=0;
			for (var i=0;i<oMarkCounter.aCounter.length;i++) mc+=oMarkCounter.aCounter[i][0];
			if (mc==0) {
				LogMessage.data="Keine Fehler gefunden.";
				cNode(LogMessage.parentNode,"div",null,null);
			} else LogMessage.data="Ergebnis:";
			if (sLocals!="D") LogMessage.data+=" ("+sLocals+")";

			var pTextArea=document.getElementsByTagName("textarea")[0];
			if (pTextArea) {
				if (aNavigator) {aNavigator.cleanup();delete aNavigator;aNavigator=null;}
				showNavigator(pTextArea,words);
			}

			setFinalView();

			timerDeleteView=setTimeout(deleteView , 10000); // fadeout status window after 10 seconds
		}
	}
}

//XMLHttpRequest wrapper, with timeout support
function oXmlHttpRequest(data)
{
	//preconditions
	if ((data.onload==null) || (data.onreadystatechange==null) || ((data.new_timeout != null) && (data.new_timeout_handler == null))) throw("oXmlHttpRequest-precondition");
	var orgHandler={id:(iRequestID++),onload:data.onload,onreadystatechange:data.onreadystatechange,onerror:data.onerror,timeout:null,valid:true,new_timeout:data.new_timeout,new_timeout_handler:data.new_timeout_handler};

	data.onload=function (rD) {
		if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
		if (bBreak) return; //cancel by user
		if (!orgHandler.valid) return; //old discarded request
		orgHandler.onload(rD);
		orgHandler.valid=false;
		return;
	}

	data.onreadystatechange=function (rD) {
		if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
		if (bBreak) return; //cancel by user
		if (!orgHandler.valid) return; //old discarded request
		orgHandler.onreadystatechange(rD);
		if (orgHandler.new_timeout != null) {
			orgHandler.timeout=setTimeout(fNewTimeout, orgHandler.new_timeout);
		} else {
			orgHandler.timeout=setTimeout(fTimeout, HTTPTIMEOUT);
		}
	}

	data.onerror=function (rD)
	{
		if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
		if (bBreak) return; //cancel by user
		if (!orgHandler.valid) return; //old discarded request
		orgHandler.valid=false;//discard request
		if (orgHandler.onerror) orgHandler.onerror(rD);
		var errmsg = "Timeout";
		if (typeof(rD.status) != "undefined" && rD.status != null) errmsg = rD.status + ":" + rD.statusText + ".";
		GM_log("HTTP-Error " + errmsg);
		fRetry("Fehler1: " + errmsg);
		return;
	}

	function fRetry(text)
	{
		if (data.silent) return;
		var bRetry=confirm(text+" Wollen sie die Anfrage wiederholen=[Ok] oder [Abbrechen] ?");
		if (bRetry==false) {
			bBreak=true;
			location.reload();
			return;
		}
		//retry request
		setTimeout(function() {oXmlHttpRequest({method:data.method,url:data.url,headers:data.headers,data:data.data,onload:orgHandler.onload,onerror:orgHandler.onerror,onreadystatechange:orgHandler.onreadystatechange})},10);
		return;
	}

	function fTimeout()
	{
		if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
		if (bBreak) return; //cancel by user
		if (!orgHandler.valid) return; //old discarded request
		if ((orgHandler.tries) && (orgHandler.tries >= 3)) {
			var bWait=false;
			if (!data.silent) bWait=confirm("Der Server ben"+sz["oe"]+"tigt nun schon l"+sz["ae"]+"nger als "+Math.round(HTTPTIMEOUT/1000)+" Sekunden. Wollen sie warten=[Ok]?");
			if (bWait==false) {
				orgHandler.valid=false;//discard request
				GM_log("timeout:"+data.url);
				fRetry("Timeout:");
			} else {
				if (!orgHandler.valid) return; //old discarded request
				orgHandler.timeout=setTimeout(fTimeout,HTTPTIMEOUT);
			}
		} else {
			if (orgHandler.tries) orgHandler.tries++; else orgHandler.tries = 0;
			//retry request
			setTimeout(function() {oXmlHttpRequest({method:data.method,url:data.url,headers:data.headers,data:data.data,onload:orgHandler.onload,onerror:orgHandler.onerror,onreadystatechange:orgHandler.onreadystatechange,silent:data.silent})},10);
		}
		return;
	}

	function fNewTimeout()
	{
		if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
		if (bBreak) return; //cancel by user
		if (!orgHandler.valid) return; //old discarded request
		orgHandler.valid=false;//discard request
		orgHandler.new_timeout_handler();//call user defined handler
		return;
	}

	if (orgHandler.new_timeout != null) {
		orgHandler.timeout=setTimeout(fNewTimeout, orgHandler.new_timeout);
	} else {
		orgHandler.timeout=setTimeout(fTimeout, HTTPTIMEOUT);
	}
	GM_xmlhttpRequest(data);
	return;
}

//BEGIN:checkTextController
function checkTextController(result)
{
	var aText=result.aTxt;
	var words=new Array();

	// combine text blocks, 0=prepared text, 1=original text
	var text="";
	for (var i=0;i<aText[1].length;i++) text+=aText[1][i];
	aText[1]=text;
	text="";
	for (var i=0;i<aText[0].length;i++) text+=aText[0][i];
	aText[0]=text;

	checkCanoo(aText);
	return;

	/* subfunctions */

	function checkCanoo(aText)
	{
		// whole text to canoo.com -> returns wrong and unknown words
		//HACK: escape returns nothing if input param is to large; furthermore escape, encodeURI and encodeURIComponent are not compatible with canoo.com
		LogMessage.data="Sende Text an canoo.net.";
		var esc=[[sz["ue"],"%FC"],[sz["Ue"],"%DC"],[sz["ae"],"%E4"],[sz["Ae"],"%C4"],[sz["oe"],"%F6"],[sz["Oe"],"%D6"],[sz["sz"],"%DF"],[",","%2C"],["|","%7C"],["\n","%0D%0A"],["\"","%22"],["'","%27"],["\\\\","%5C"],["!","%21"],["?","%3F"],["/","%2F"],["(","%28"],[")","%29"],["[","%5B"],["\]","%5D"],["{","%7B"],["}","%7D"],[":","%3A"],[";","%3B"],["<","%3C"],[">","%3E"],["&","%26"],[sz["iiu"],"%84"],[sz["iio"],"%93"],[sz["io"],"%91"],[sz["iu"],"%82"],[sz["aph"],"%92"],[sz["-"],"%96"]];
		for (var i=0;i<esc.length;i++) aText[0]=aText[0].replace(new RegExp("["+esc[i][0]+"]","g"),esc[i][1]);//escape the text
		aText[0]=aText[0].replace(/([.,])([^\s])/g,"$1 $2"); //insert a space after points and commas
		aText[0]=aText[0].replace(/[\s]/g,"+"); // replace spaces with "+"
		//END: HACK
		var curl="http://www.canoo.net/services/GermanSpellingChecker/Controller;MenuId=GermanSpellingChecker02";
		var sParams="language=reformiert&region="+sLocals+"&textInput="+aText[0];
		oXmlHttpRequest({
			method:"POST",
			url:curl,
			headers:{"Content-type":"application/x-www-form-urlencoded","User-agent": "Skript: wikipedia.de-Rechtschreibpruefung"},
			data:sParams,
			onload: canoo_onload,
			onreadystatechange:function() {LogMessage.data+=" .";}
		});

		function canoo_onload(rD)
		{
			if (bBreak) return;
			try {
				var error2WarnList=new RegExp("^(letztere(n){0,1}|erstere(n){0,1})$","");
				var error2IgnoreList=new RegExp("^(Alpen|Da sein|sein Eigen( .*){0,1}|as|Erste(r|n|res|re){0,1}(\\s[a-zA-Z]+){0,1}|Zweite(r|n|res|re){0,1}(\\s[a-zA-Z]+){0,1}|[A-Za-z]*[cC]reme|muss)$","");
				var error2ContextList=new RegExp("^([zZ]ur Zeit)$");
				var txt=Html2Text(rD.responseText);
				var falschBlock=txt.split("<TD class='falsch'")[3].split("</TD>")[0];
				var unbekannt=txt.split("<TD class='neutral'")[3].split("</TD>")[0].replace(/[^>]*>\s*([^<]+)\s*</g,"$1|").split("|");
				unbekannt.pop();
				var falschRows=falschBlock.match( /<tr>(.*?)<\/tr>/g );
				if (falschRows) for (var i=0; i < falschRows.length; i++)
				{
					var fw = "";
					var aLink = "";
					var sErrorPart = "";
					if (falschRows[i].search( /><a[^>]*>\s*(.*?)\s*<\/a>/ ) >= 0) {
						fw = trimWord(falschRows[i].replace(/.*<a[^>]*>\s*(.*?)\s*<\/a>.*/,"$1"));
						aLink = "" + falschRows[i].replace(/.*<a href=['"]([^>]+)['"]>[^<]+<\/a>.*/,"http://www.canoo.net$1");
						sErrorPart = ""+falschRows[i].replace(/.*<a href=['"][^>]+['"]>([^<]+)<\/a>.*/,"$1");
					} else {
						fw=trimWord(falschRows[i].replace(/^<tr><td>([^&]*)&.*/,"$1"));
						while ((falschRows[i+1]) && (falschRows[i+1].search(/^<tr><td>&/)>=0))
						{
							i++;
							if (aLink.length<1) {
								aLink=""+falschRows[i].replace(/.*<a href=['"]([^>]+)['"]>[^<]+<\/a>.*/,"http://www.canoo.net$1");
								sErrorPart=""+falschRows[i].replace(/.*<a href=['"][^>]+['"]>([^<]+)<\/a>.*/,"$1");
							}
						}
					}
					if (fw.length<1) continue;
					descLinks.push(new Array(fw,aLink));
					if (fw.search(error2WarnList)>=0) words.push(new Array(C_CONTEXT,fw));
					else if (fw.search(error2IgnoreList)>=0) ;
					else if (fw.search(error2ContextList)>=0) words.push(new Array(C_CONTEXT,fw,sErrorPart,aLink));
					else if (aText[1].search(new RegExp("["+sSpaceChars+"]"+fw+"["+sSpaceChars+"]"))>=0) words.push(new Array(C_ERROR,fw,sErrorPart,aLink));
				}

				if (unbekannt) if (unbekannt.length>0)
				{
					for (var i=0;i<unbekannt.length;i++) {
						if (aText[1].search(new RegExp("["+sSpaceChars+"]"+unbekannt[i]+"["+sSpaceChars+"]"))>=0)
							words.push(new Array(C_UNKNOWN,trimWord(unbekannt[i])));
					}
				}
				controller(words);

				delete error2WarnList;
			} catch(e) {
				GM_log(e);
				GM_log(rD.responseText);
				LogMessage.data="Fehler2: Wahrscheinlich ist der canoo.net-Server nicht online.";
			}
		}
	}

} //END: checkTextController

function sendWordsToWsproxy(words)
{
	var wordlist = new Array();
	for (var word in wsproxyDB) {
		if (((wsproxyDB[word]["frequency"] != null) && (wsproxyDB[word]["frequency"] > 0)) ||
			((wsproxyDB[word]["baseform"] != null) && (wsproxyDB[word]["baseform"] != ""))) {
			var frequency = (wsproxyDB[word]["frequency"] == null)?0:wsproxyDB[word]["frequency"];
			var baseform = (wsproxyDB[word]["baseform"] == null)?"":wsproxyDB[word]["baseform"];
			wordlist.push(new Array(encodeURIComponent(word), frequency , encodeURIComponent(baseform), wsproxyDB[word]["corpus"]));
		}
	}
	if (wordlist.length > 0) {
		var msg = "wordlist=" + wordlist.join(";");
		oXmlHttpRequest({
			method:"POST",
			url:"http://toolserver.org/~revvar/wsproxyAddWords.php",
			headers:{"Content-type":"application/x-www-form-urlencoded","User-agent": "Skript: wikipedia.de-Rechtschreibpruefung"},
			data:msg,
			onload: function(rD) {if ((!bBreak) && (rD.responseText!="")) alert("Fehler3: " + rD.responseText);},
			onreadystatechange:function() {},
			onerror: function (rD) {if (!bBreak) alert(rD.responseText);},
			new_timeout:90000,
			new_timeout_handler:function() {GM_log("sendWordsToWsproxy -> Timeout: " + sLemma);},
			silent:true
		});
	}
	controller(words);
}

function getWordsFromWsproxy(words)
{
	if (words.length < 1) {
		controller(words);
		return;
	}
	LogMessage.data="Pr" + sz["ue"] + "fe Wortliste " + sz["ue"] + "ber Toolserverdienst .";
	var msg = "";
	var msg_list = new Array();
	for (var i = 0; i < words.length; i++) msg_list.push(encodeURIComponent(words[i][1]));
	msg = "wordlist=" + msg_list.join(";");
	var timeout_value = 10000;
	oXmlHttpRequest({
		method:"POST",
		url:"http://toolserver.org/~revvar/wsproxyGetWords.php",
		headers:{"Content-type":"application/x-www-form-urlencoded","User-agent": "Skript: wikipedia.de-Rechtschreibpruefung"},
		data:msg,
		onload: wsproxy_onload,
		onreadystatechange:function() {LogMessage.data+=" .";},
		onerror: function (rD) {if (!bBreak) alert("Fehler: " + rD.responseText);},
		new_timeout:timeout_value,
		new_timeout_handler:function() {GM_log("getWordsFromWsproxy -> Timeout: " + sLemma);LogMessage.data+="Timeout --> Vorgang abgebrochen.";setTimeout(function() {controller(words);}, 1000);},
		silent:true
	});
	function wsproxy_onload(rD) {
		if (!bBreak) {
			var wordlist = ("" + rD.responseText).split(";");
			for (var i = 0; i < wordlist.length; i++) if (wordlist[i].length > 0) {
				parts = wordlist[i].split(",");
				if (parts.length != 4) {
					alert("Error: Toolserver returned not a valid wordlist: " + rD.responseText);
					break;
				}
				var word = decodeURIComponent(parts[0]);
				var frequency = parseInt(parts[1]);
				var baseform = decodeURIComponent(parts[2]);
				var corpus = parts[3];
				knownWords[word] = new Object();
				knownWords[word]["frequency"] = frequency;
				knownWords[word]["baseform"] = baseform;
				knownWords[word]["corpus"] = corpus;
			}
			controller(words);
		}
	}
}

function oWSUniLeipzigRequest(request)
{
	var soapmsg='<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soapenv:Body><execute xmlns='+"\"urn:"+request.service+"\""+'><objRequestParameters><corpus>'+request.corpus+'</corpus ><parameters><dataVectors><ns1:dataRow xmlns:ns1="http://datatypes.webservice.wortschatz.uni_leipzig.de">Wort</ns1:dataRow><ns2:dataRow xmlns:ns2="http://datatypes.webservice.wortschatz.uni_leipzig.de">'+request.word+'</ns2:dataRow></dataVectors></parameters></objRequestParameters></execute></soapenv:Body></soapenv:Envelope>';

	oXmlHttpRequest({
		method:"POST",
		url:"http://pcai055.informatik.uni-leipzig.de:8100/axis/services/"+request.service,
		headers:{"User-Agent":"Skript: wikipedia.de-Rechtschreibpruefung", "Accept":"application/soap+xml", "Accept":"application/dime", "Accept":"multipart/related", "Accept":"text/*", "Content-Type":"text/xml", "Content-Length":soapmsg.length.toString(), "SOAPAction":'""', "Authorization":"Basic d2lraXAtcmVjaDphbm9ueW1vdXM=...."},
		data:soapmsg,
		onload: request.onload,
		onreadystatechange:request.onreadystatechange
	});
}

/* checkNames - checks all ERRORs and UNKNOWN words, and if there names mark them as NAMEs*/
function checkNames(words)
{
	var word;
	var result=new Array();
	check();
	return;

	function check()
	{
		do {
			var bNext=false;
			if (words.length==0) {
				controller(result);
				return;
			}
			word=words.pop();
			if ((word[1].search(/[A-Z]/)!=0) && (word[0]!=C_ERROR) && (word[0]!=C_UNKNOWN))
			{
				result.push(word);
				bNext=true;
			}
		} while (bNext);

		var first=true;
		getBaseform(word[1],word[1],onload);

		function onload(bf,cat) {
			for (var i=0;i<cat.length;i++) {
				if(cat[i].search(/[NV]N/)==0) {
					word[0]=C_NAME;
					break;
				}
			}
			// second try with the baseform
			if ((first==true) && (word[0]!=C_UNMARKED) && (word[1]!=bf)) {
				first=false;
				getBaseform(bf,bf,onload);
				return;
			}
			result.push(word);
			check();
		}

	}
}

/* checkFrequencies - checks the use frequencies of all (for canoo) UNKNOWN, RARE and UNUSUAL (other corpus!) words, and change them to UNMARKED, RARE, UNUSUAL or UNKNOWN*/
function checkFrequencies(words,corpus)
{
	var word;
	var result=new Array();
	check();
	return;

	function check()
	{
		do {
			var bNext=false;
			if (words.length==0) {
				controller(result);
				return;
			}
			word=words.pop();
			if ((word[0]!=C_UNKNOWN) && (word[0]!=C_RARE) && (word[0]!=C_UNUSUAL))
			{
				result.push(word);
				bNext=true;
			}
			if (!bNext) {
				// check if word is known by wsproxy and use proxy entry if true
				if ((knownWords[word[1]] != null) && (knownWords[word[1]]["frequency"] > 0)) {
					if (knownWords[word[1]]["corpus"].search(corpus) == 0) {
						if ((knownWords[word[1]]["corpus"]=="de") && (knownWords[word[1]]["frequency"] > 15))
						{
							if (knownWords[word[1]]["frequency"] > 17) word[0] = C_UNUSUAL; else word[0] = C_RARE;
						} else {
							word[0] = C_UNMARKED;
						}
					}
					result.push(word);
					bNext = true;
				}
			}
		} while (bNext);
		var w=word[1];

		LogMessage.data=sz["Ue"]+"berpr"+sz["ue"]+"fe unbekannte W"+sz["oe"]+"rter - wortschatz.uni-leipzig.de, corpus:"+corpus+" ("+w+") .";

		oWSUniLeipzigRequest({
			word:w,
			corpus:corpus,
			service:"Frequencies",
			onload: frequencies_onload,
			onreadystatechange:function() {LogMessage.data+=" .";}
		});

		function frequencies_onload(rD)
		{
			if (bBreak) return;
			var ns1=rD.responseText.split(/<\/{0,1}ns1:dataRow>/);
			var iHK = 0;
			if (ns1.length==5) {
				iHK=parseInt(ns1[3]);
				if ((corpus=="de") && (iHK>15))
				{
					if (iHK>17) word[0]=C_UNUSUAL; else word[0]=C_RARE;

					// save result into wsproxyDB
					if (wsproxyDB[w] == null) wsproxyDB[w] = new Object();
					wsproxyDB[w]["corpus"] = corpus;
					wsproxyDB[w]["frequency"] = iHK;
				} else {
					word[0]=C_UNMARKED;

					// save result into wsproxyDB
					if (wsproxyDB[w] == null) wsproxyDB[w] = new Object();
					wsproxyDB[w]["corpus"] = corpus;
					wsproxyDB[w]["frequency"] = iHK;
				}
			}

			result.push(word);
			check();
		}
	}
}

/*checks all ERRORs found by canoo, and check for context dependence (ERROR --> (ERROR || CONTEXT))*/
function checkMeanings(words)
{
	var word;
	var baseform;
	var result=new Array();;
	check();
	return;

	function check()
	{
		var bNext=false;
		do {
			if (words.length==0) {
				controller(result);
				return;
			}
			word=words.pop();
			if ((word[0]==C_ERROR) && (word[3].search(/(trennung|grossklein|stammprinzip\/ersetzung-sz)/)>=0)) bNext=true; else result.push(word);
		} while (!bNext);
		getBaseform(word[2],word[2],check2);
	}

	function check2(tmp_baseform, tmp_wordcat)
	{
		baseform = tmp_baseform;
		LogMessage.data="Pr"+sz["ue"]+"fe Bedeutungen von '"+word[2]+"' auf canoo.net.";
		var curl="http://www.canoo.net/services/Controller?input="+escape(word[2])+"&MenuId=Search&service=canooNet&lang=de";
		oXmlHttpRequest({
			method:"GET",
			url:curl,
			headers:{"User-agent": "Skript: wikipedia.de-Rechtschreibpruefung"},
			onload: canoo_onload,
			onreadystatechange:function() {LogMessage.data+=" .";}
		});
	}

	function canoo_onload(rD)
	{
		if (bBreak) return;
		try {
			var txt=rD.responseText.split('class="Headline">W'+sz["oe"]+"rterb"+sz["ue"]+"cher");
			if (txt.length>1) {
				var txt=txt[1].split("<table>")[1].split("</table>")[0].split("<tr>");
				for (var i=0;i<txt.length;i++) txt[i]=Html2Text(""+txt[i].split("<td>")[3]);
				var count=0;
				for (var i=0;i<txt.length;i++) if ((txt[i]).search(new RegExp("&input=("+word[2]+"|"+baseform+")&","i"))>=0) if ((txt[i]).search(/Ortho\+Old-Obs/)<0) count++;
				if (count>0) word[0]=C_CONTEXT;
			}
		} catch(e) {
			alert(e);
			alert("checkCanooDictonary: Konnte Ergebnis nicht auswerten - Fehler mit zugeh"+sz["oe"]+"rigen Artikel bitte melden.");
		}
		result.push(word);
		check();
	}
}

function getBaseform(word,alt,cbf,retry)
{
	// check if word is known by wsproxy and return proxy entry if true
	if ((knownWords[word] != null) && (knownWords[word]["baseform"].length > 0)) {
		var ws_entry = knownWords[word]["baseform"].split("#");
		cbf(""+ws_entry[0], (""+ws_entry[1]).split("|"));
		return;
	}
	var baseform="";
	var wordcat=new Array();
	LogMessage.data="Ermittle Grundform und Wortart von '"+word+"' auf wortschatz.uni-leipzig.de.";

	oWSUniLeipzigRequest({
		word:word,
		corpus:"de",
		service:"Baseform",
		onload: baseform_onload,
		onreadystatechange:function() {LogMessage.data+=" .";}
	});

	function baseform_onload(rD)
	{
		if (bBreak) return;
		var dom=parseXML("XML",rD.responseText);
		try {
			var oResult=dom.getElementsByTagName("result")[0];
			if (oResult.firstChild) {
				var oDataRow=oResult.firstChild;
				while (oDataRow)
				{
					if (baseform=="") baseform=oDataRow.firstChild.textContent;
					wordcat.push(""+oDataRow.firstChild.nextSibling.textContent);
					oDataRow=oDataRow.nextSibling;
				}
			}
		} catch (e) {
			GM_log(rD.responseText);
			GM_log(e);
//			if (retry == 1) {
				//alert("getBaseform: Fehler in der Auswertung -  bitte dem Autor melden!");
				GM_log("getBaseform: Fehler in der Auswertung,  zweiter Versuch gescheitert!");
//			} else {
//				GM_log("getBaseform: Fehler in der Auswertung, starte zweiten Versuch.");
//				setTimeout(function() {getBaseform(word,alt,cbf,1);}, 4000);
//				return;
//			}
		}

		// save result into wsproxyDB
		if (wsproxyDB[word] == null) wsproxyDB[word] = new Object();
		if ((wsproxyDB[word]["corpus"] != null) && (wsproxyDB[word]["corpus"] != "de")) alert("baseform check after valid frequency result!");
		wsproxyDB[word]["corpus"] = "de";
		if (baseform != "") wsproxyDB[word]["baseform"] = baseform + "#" + wordcat.join("|");

		if (baseform=="") baseform=alt;
		cbf(baseform,wordcat);
	}
}

function markWords(result,fCallback)
{
	var myTask=new CTask();
	myTask.FCallback=fCallback;

	// extend state
	var myState=new CState(LogMessage,"Markiere Text- Fortschritt: #1#",1,0,articleObj.length+aColor.length+12);

	var aMarks=new Array(aColor.length);
	for (var i=0;i<aMarks.length;i++) aMarks[i]=new Array();
	for (var i=0;i<result.length;i++) aMarks[result[i][0] % aMarks.length].push(result[i][1]);
	myState.aMarks=aMarks;

	var regexp=new Array(aMarks.length);
	for (var i=0;i<aMarks.length;i++) if (aMarks[i].length>0) {
		regexp[i]=new RegExp("(^|["+sSpaceChars+"])("+aMarks[i].join("|")+")($|["+sSpaceChars+"])","g");
	} else regexp[i]=null;
	myState.regexp=regexp;
	myState.max=300;
	myState.result=result;

	myTask.FWorkStep=function (state) {
		with (state) {
			if (iAct<articleObj.length) {
				// mark words with special marks
				for (var k=iAct;((k<articleObj.length) && (k<iAct+max));k++) if (articleObj[k].type==3) {
					for (var m=0;m<regexp.length;m++) if (regexp[m]) while (articleObj[k].content.data.search(regexp[m])>=0) {
						articleObj[k].content.data=articleObj[k].content.data.replace(regexp[m],"$1#_#_B"+m+"_#_#$2#_#_E"+m+"_#_#$3");
					}
				}
				iAct+=max;
				if (iAct>articleObj.length) iAct=articleObj.length;
			} else if (iAct==articleObj.length) {
				state.sText=body.innerHTML;
				iAct++;
			} else if (iAct<articleObj.length+aColor.length+1) {
				var i=iAct-articleObj.length-1;
				//replace special marks with HTML
				var xS=new RegExp("#_#_B"+i+"_#_#","");
				var xR=new RegExp("#_#_B"+i+"_#_#([^#]+)#_#_E"+i+"_#_#","g");
				var sR="<span name=\"WPR"+i+"$1ON\"style=\"background-color:"+aColor[i][0]+"\">$1</span>";
				if (sText.search(xS)>=0) sText=sText.replace(xR,sR);
				iAct++;
			} else if (iAct==articleObj.length+aColor.length+1) {
				body.innerHTML=sText;
				state.spans=body.getElementsByTagName("span");
				for (var i = 0; i < aColor.length; i++) oMarkCounter.aCounter[i][0] = 0;
				iAct++;
			} else if (iAct<articleObj.length+aColor.length+12) {
				// count markings
				var delta = Math.round(spans.length/10);
				if (delta < 10) delta = 10;
				var i= delta * (iAct-articleObj.length-aColor.length-2);

				for (var j=i; (j<spans.length) && ((j-i) < delta); j++) {
					for (var k = 0; k < aColor.length; k++) try {
						if (spans[j].getAttribute("name").search(new RegExp("WPR"+k+".*O(N|FF)"))>=0) {
							oMarkCounter.aCounter[k][0]++;
							spans[j].addEventListener("click", clickOnMark, true);
							break;
						}
					} catch(e) {};
				}

				iAct++;
			} else {oMarkCounter.update(); state.bFinished=true;}
		}
	}

	var myExecutor=new CExecutor(myTask,myState);
	myExecutor.run();
}

//class CMarkCounter
function CMarkCounter(rootNode,count,aColors)
{
	//preconditions
	if (count<1) throw("CMarkCounter: count<1");
	if (rootNode==null) throw("CMarkCounter: rootNode is null");

	var self=this;
	this.oRootNode=rootNode;
	this.aCounter=new Array(count);
	this.aColors=aColors;
	for (var i=0;i<count;i++) this.aCounter[i]=new Array(0,document.createElement("div"));

	this.update=function() {
		with (self) {
			for (var i=0;i<aCounter.length;i++) {
				try {
					oRootNode.removeChild(aCounter[i][1]);
				} catch(e) { }
				if (aCounter[i][0]>0) {
					aCounter[i][1].innerHTML="<span style=\"background-color:"+aColors[i][0]+"\">"+aColors[i][2]+"</span>: "+aCounter[i][0];
					oRootNode.insertBefore(aCounter[i][1],oBDelMarks);
				}
			}
		}
	}
}

function createMarkList(fCallback,words,cbParam)
{
	var myTask=new CTask();
	myTask.FCallback=fCallback;

	// extend state
	var aSpans=body.getElementsByTagName("span");
	if (aSpans.length<1) {
		fCallback();
		return;
	}
	var myState=new CState(LogMessage,"Sammle alle Markierungen: #1#",1,0,aSpans.length);
	aMarkList=new Array();
	myState.spans=aSpans;
	myState.step=30;
	myState.result=cbParam;

	myTask.FWorkStep=function (state) {
		with (state) {
			var i=iAct;
			for (;((i<spans.length) && (i-iAct<step));i++) {
				var name=spans[i].getAttribute("name");
				if (name) if (name.search(/O(N|FF)$/)>0) {
					var word=name.replace(new RegExp("WPR[0-9](["+wordChars+sSpaceChars+"]+)(ON|OFF)",""),"$1");
					var type=parseInt(name.replace(new RegExp("WPR([0-9])(["+wordChars+sSpaceChars+"]+)(ON|OFF)",""),"$1"));
					var wstate=1;
					aMarkList.push({obj:spans[i],type:type,word:word,state:wstate});
					if (words) {
						for (var j=0;j<words.length;j++) if (words[j][1]==word) {
							if (words[j][2]==0) switchMark(aMarkList[aMarkList.length-1]);
							break;
						}
					}
					spans[i].removeAttribute("name");
				}
			}
			iAct=i;
			if (iAct>=spans.length) bFinished=true;
		}
	}

	var myExecutor=new CExecutor(myTask,myState);
	myExecutor.run();
}

function clickOnMark(e)
{
	if (bBreak) return;
	e.preventDefault();

	// find mark
	var oMark=null;
	for (var i=0;((i<aMarkList.length) && (oMark==null));i++) if (aMarkList[i].obj==e.target) oMark=aMarkList[i];
	if (oMark==null) {
		alert("error: mark not found");
		return;
	}

	if (e.ctrlKey)
	{
		// open word description on error markings
		for (var i=0;i<descLinks.length;i++) if (descLinks[i][0]==oMark.word)
		{
			window.open(descLinks[i][1]);
			return;
		}
	} else {
		for (var i=0;i<aMarkList.length;i++) if (aMarkList[i].word==oMark.word) switchMark(aMarkList[i]);
	}
}

function switchMark(oMark)
{
	if (oMark==null) {
		GM_log("error: switchMark: oMark==null");
		return;
	}
	// switch mark
	if (oMark.state==1)
	{
		oMark.obj.setAttribute("style","background-color:"+aColor[oMark.type][1]);
		oMarkCounter.aCounter[oMark.type][0]--;
		if (oMark.type==C_UNMARKED) oMarkCounter.aCounter[C_UNKNOWN][0]++; else oMarkCounter.aCounter[C_UNMARKED][0]++;
	} else {
		oMark.obj.setAttribute("style","background-color:"+aColor[oMark.type][0]);
		oMarkCounter.aCounter[oMark.type][0]++;
		if (oMark.type==C_UNMARKED) oMarkCounter.aCounter[C_UNKNOWN][0]--; else oMarkCounter.aCounter[C_UNMARKED][0]--;
	}
	oMark.state=1-oMark.state;
	oMarkCounter.update();
}

//class CState
function CState(oTextNode,sMessage,iType,iPParam1,iPParam2)
{
	if (!((((iType==1) && ((iPParam2-iPParam1)>0)) || (iType==0)) && (oTextNode!=null))) {
		GM_log("error: CState:precondition failed: iType="+iType+", iPParam2="+iPParam2+", iPParam1="+iPParam1+", oTextNode="+oTextNode);
		throw("CState:precondition");
	}
	var self=this;
	this.oTextNode=oTextNode;
	this.result=null;
	this.bFinished=false;
	this.iType=iType; //0:simple counter, 1: relative progress 0-100%
	this.iPParam1=iPParam1;//0:user defined, 1:start value
	this.iAct=(iType==0)?0:iPParam1;
	this.iPParam2=iPParam2;//0: user defined, 1: end value
	this.sMessage=sMessage;

	this.showProgress=function () {
		with (self) {
			if (iType>0) {
				var progress=Math.floor(((iAct-iPParam1)/(iPParam2-iPParam1))*100);
				oTextNode.data=sMessage.replace(/(.*)#1#(.*)/,"$1"+((progress<10)?"  ":(progress<100)?" ":"")+progress+"%$2");
			} else {
				oTextNode.data=sMessage.replace(/(.*)#1#(.*)#2#(.*)/,"$1"+iPParam1+"$2"+iPParam2+"$3");
			}
		}
	}
}

// abstract class CTask
function CTask()
{
	var self=this;
	this.FInit=null;
	this.FWorkStep=null;
	this.FCallBack=null;
	this.FFinal=null;;
	this.state=null;
}

//class CExecutor, running one task a time
function CExecutor(oTask,oState)
{
	var self=this;
	this.oState=oState;
	this.oTask=oTask;
	this.timeExecutor=null;

	this.run=function() {
		var bInTimer=false;
		if (self.oTask.init) self.oTask.init();
		timer();

		function timer()
		{
			with (self) {
				if (timeExecutor) clearTimeout(timeExecutor);
				if (bBreak) return;
				if (bInTimer) return;
				bInTimer=true;
				oTask.FWorkStep(oState);
				oState.showProgress();
				if (!oState.bFinished) {
					timeExecutor=setTimeout(timer , TIMEBREAK);
				} else {
					timeExecutor=setTimeout(postTimer,TIMEBREAK);
				}
				bInTimer=false;
			}
		}

		function postTimer()
		{
			with (self) {
				if (timeExecutor) clearTimeout(timeExecutor);
				if (bBreak) return;
				if (bInTimer) return;
				bInTimer=true;
				if (oTask.FFinal) oTask.FFinal();
				oTask.FCallback(oState.result);
			}
		}

	}
}


function getText(Obj,fCallback)
{
	// preconditions
	if ((!Obj) || (Obj.length==0)) throw("gettext:Obj null or empty");
	if (fCallback==null) throw("gettext:callback is null");

	var myTask=new CTask();
	myTask.FCallback=fCallback;

	// extend state
	var myState=new CState(LogMessage,"Extrahiere Text- Fortschritt: #1#",1,0,Obj.length);
	myState.result=new Object();
	myState.result.aTxt=new Array(new Array(""),"");
	myState.result.articleObj=new Array();
	myState.actBlock=0;
	myState.tresholdBS=3000;
	myState.max=40;

	//put lemma on ignore list
	myState.result.aTxt[1]+=sLemma+" ";

	myTask.FWorkStep=function (state)
	{
		with (state) {
			if (bFinished) return;
			var i=iAct;
			for (;((i<Obj.length) && (i<(iAct+max)));i++) if (Obj[i].type==3) {
				result.aTxt[0][actBlock]+=Obj[i].content.data;
				if (result.aTxt[0][actBlock].length>tresholdBS) {
					actBlock++;
					result.aTxt[0].push("");
				}
				result.articleObj.push(Obj[i]);
			} else {
				result.aTxt[1]+=Obj[i].content.data+" ";
			}
			iAct=i;
			if (iAct>=Obj.length) state.bFinished=true;
		}
	}

	var myExecutor=new CExecutor(myTask,myState);
	myExecutor.run();
}


function transformText(aText,fCallback)
{
	var myTask=new CTask();
	myTask.FCallback=fCallback;

	// extend state
	var myState=new CState(LogMessage,"Transformiere Text- Fortschritt: #1#",1,0,3*aText[0].length+2);
	myState.xIgnoreList=new RegExp("(["+sSpaceChars+"])([A-Z"+sz["Ae"]+sz["Oe"]+sz["Ue"]+"0-9]+|[Ii]hr|[Dd]u|[Dd]ein|kein|Mio|[kdcm]m|ha|kg|t|g|ca|bzw|Az|Chr|Jh|mbH|org|http|www|htm(l){0,1}|Abb|Aufl|Bd|[Hh]rsg|Meta|Commons|Wiki(pedia|books)|Wiktionary|Mediawiki|Audiodateien|engl|lat|frz|dt|selb(st|en|ig(e){0,1}|e){0,1}|bspw|bzw|Dr|Prof|Ing|[Pp]df[s]{0,1}|(ff|pp)|N(o|r)|etc|Linux|Microsoft|Firefox|Mozilla|exe|geb|wenngleich|vs|inkl|eG|StB|BGHSt|[a-z"+sz["ae"]+sz["oe"]+sz["ue"]+sz["sz"]+"]|Hz|Mega|Md[ABL]|ggf|usw|vgl|StGB|gif|jpg|jpeg|pdf|php|css|js|lt|net|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Okt|Nov|Dez|Wikiversit"+sz["ae"]+"t|Wikipedianer|Ebd|cit)(["+sSpaceChars+"])","g");
	myState.xForeignWords=new RegExp("(["+sSpaceChars+"])(["+wordChars+"]*[^"+wordChars+sSpaceChars+"]+["+wordChars+"]*)+(["+sSpaceChars+"])","g");
	myState.result=new Object();
	myState.result.aTxt=aText;
	myState.wl2=new Array();

	myTask.FWorkStep=function (state)
	{
		with (state) {
		if (bFinished) return;
		if (iAct<result.aTxt[0].length) with (result) {
			aTxt[0][iAct]=" "+Html2Text(aTxt[0][iAct])+" ";
			aTxt[0][iAct]=aTxt[0][iAct].replace(new RegExp("(http://|www\\.)["+wordChars+"-]+([./]["+wordChars+"-]+)+[/]{0,1}[^"+wordChars+"]*\\s","g")," ");//delete all links
			aTxt[0][iAct]=aTxt[0][iAct].replace(new RegExp("["+wordChars+"-]+@["+wordChars+"-]+([.]["+wordChars+"-]+)+\\s","g")," "); //delete all email-adresses
			while(aTxt[0][iAct].search(xIgnoreList)>=0) aTxt[0][iAct]=aTxt[0][iAct].replace(xIgnoreList,"$1$3");//delete all ignored words

		} else if (iAct==result.aTxt[0].length) with (result) {
			aTxt[1]=Html2Text(aTxt[1]);
			aTxt[1]=aTxt[1].replace(xIgnoreList,"$1$3");
			aTxt[1]=aTxt[1].replace(new RegExp("(["+sSpaceChars+"])(in|im|an|am|auf|der|die|das|des|ein)(["+sSpaceChars+"])","gi"),"$1 $3");
			var wl1=trimWord(aTxt[1]).split(new RegExp("["+sSpaceChars+"]",""));
			var wl3=new Array();
			for (var i=0;i<wl1.length;i++) if (wl1[i].search(new RegExp("["+wordCharsWoNumbers+"]",""))>=0)
				wl3.push(trimWord(wl1[i].replace(new RegExp("[^"+wordChars+sSpaceChars+"]","g")," ")));
				wl3=wl3.sort();
			for (var i=1;i<wl3.length;i++) if (wl3[i-1]!=wl3[i]) wl2.push(wl3[i-1]);

			aTxt[1]=aTxt[0]; //save the original
			xInterwikiLinks=new RegExp("(["+sSpaceChars+"])("+wl2.join("|")+")(["+sSpaceChars+"])","gi");

		} else if (iAct<=2*result.aTxt[0].length) with (result) {
			if (wl2.length>0) {
				var i=iAct-aTxt[0].length-1;
				//delete all words from interwiki links
				while (aTxt[0][i].substring().search(xInterwikiLinks)>=0)
					aTxt[0][i]=aTxt[0][i].replace(xInterwikiLinks,"$1$3");
			} else iAct+=result.aTxt[0].length-1;
		} else if (iAct<=3*result.aTxt[0].length) with (result) {
			var i=iAct-2*aTxt[0].length-1;
			while (aTxt[0][i].search(xForeignWords)>=0) aTxt[0][i]=(" "+aTxt[0][i]+" ").replace(xForeignWords,"$1 $3");//delete all words with foreign chars
			aTxt[0][i]=aTxt[0][i].replace(new RegExp("[^\\"+wordChars+sSpaceChars+"]","g"),""); // delete all single non german characters
			aTxt[0][i]=trimWord(aTxt[0][i]); //delete leading, terminal and multiple spaces
			while (aTxt[0][i].search(/[.,][.,]/)>=0) aTxt[0][i]=aTxt[0][i].replace(/([.,])[.,]+/g,"$1"); // delete multiple points and commas
		} else bFinished=true;

		iAct++;
		}
	}

	var myExecutor=new CExecutor(myTask,myState);
	myExecutor.run();
}

//class CNode
function CNode(pType,pContent)
{
	//type: 3- normal textnode, 4- ignore textnode
	var self=this;
	this.type=pType;
	this.content=pContent;
	this.childs=null;
	this.e=null;
}

//class CStackEntry
function OStackEntry(ret,elem,starti)
{
	this.retPoint=ret;
	this.element=elem;
	this.startIndex=starti;
}


function getObjects(node,fCallback)
{
	var myTask=new CTask();
	myTask.FCallback=fCallback;

	// extend state
	var myState=new CState(LogMessage,"Analysiere Artikel - Schritt: #1#, #2# Textknoten",0,0,0);
	myState.max=100;
	myState.liNode=new CNode(3,{data:". "});
	myState.spNode=new CNode(3,{data:" "});
	myState.Obj=new Array();
	myState.e=node.firstChild;
	myState.stack=new Array();
	myState.stack.push(new OStackEntry(0,null,0));
	myState.lastStep=0;

	myTask.FWorkStep=function (state)
	{
		with (state) {
			while (e) {
				while (e) {
					if (iPParam1>lastStep+max) {
						lastStep=iPParam1;
						return;
					}
					iPParam1++;
					if ((e.nodeType==1) && (e.hasChildNodes()) && (e.tagName.search(/^(script|style|form)$/i)<0) && (e.id!="toctitle") && (e.className.search(/(metadata|zitat|cite|toclevel)/gi)<0))
					{
						if ((e.tagName.search(/^a$/i)>=0) && (e.className!="new"))
						{
							stack.push(new OStackEntry(1,e,Obj.length));//save old values
						} else {
							if (e.tagName.search(/^(li|td)$/i)>=0) {
								iPParam2++;
								Obj.push(liNode);
							}
							if (e.tagName.search(/^(div|h[1-9]|table|tr|a|form)$/i)>=0) {
								iPParam2++;
								Obj.push(spNode);
							}
							stack.push(new OStackEntry(2,e,Obj.length));//save old values
						}
						e=e.firstChild;
						continue;
					} else if (e.nodeType==3) {
						iPParam2++;
						Obj.push(new CNode(3,e));
					}
					e=e.nextSibling;
				}
				while (stack.length>0) {
					var se=stack.pop();
					e=se.element;
					if (se.retPoint==1) for (var i=se.startIndex;i<Obj.length;i++) Obj[i].type=4;
					if (e) e=e.nextSibling;
					if (e) break;
				}
			}
			result=Obj;
			bFinished=true;
		}
	}

	var myExecutor=new CExecutor(myTask,myState);
	myExecutor.run();
}


function trimWord(word)
{
	word=word.replace(/^\s*(\S.*\S)\s*$/,"$1"); //cut leading and terminal white spaces
	word=word.replace(/\s+/g," "); //replace multiple white spaces with one space
	return word;
}

function saveMarksToDB()
{
	if (sLemma.length<1) {
		GM_log("saveMarksToDB: no lemma");
		return;
	}
	if ((aMarkList==null) || (aMarkList.length<1)) return;

	var sDBArticle=GM_getValue("DBArticle","");
	var sDBMarks=GM_getValue("DBMarks","");
	var oTime = new Date();

	var aArticle=sDBArticle.split("&");
	var bIsNew=true;
	var index=-1;
	for (var i=0;((i<aArticle.length) && (bIsNew));i+=2) if (decodeURIComponent(aArticle[i])==sLemma) {
		bIsNew=false;
		index=i/2;
	}

	if (bIsNew) {
		// create a new word list
		var aWord=new Array();
		for (var i=0;i<aMarkList.length;i++) {
			var bNewWord=true;
			var sWord=encodeURIComponent(aMarkList[i].word);
			for (var j=0;j<aWord.length;j+=3)  if ((aWord[j]==aMarkList[i].type) && (aWord[j+1]==sWord)) {
				bNewWord=false;
			}
			if (bNewWord) {
				aWord.push(aMarkList[i].type);
				aWord.push(sWord);
				aWord.push(aMarkList[i].state);
			}
		}
		// create a new description list
		var aDesc=new Array();
		for (var i=0;i<descLinks.length;i++) aDesc.push(encodeURIComponent(descLinks[i][0])+"?"+encodeURIComponent(descLinks[i][1]));

		// append a new entry
		if (sDBArticle.length>0) sDBArticle+="&";
		sDBArticle+=encodeURIComponent(sLemma)+"&"+oTime.getTime();

		if (sDBMarks.length>0) sDBMarks+="&";
		sDBMarks+=encodeURIComponent(sLemma)+"&"+sLocals+"&"+aWord.join(",")+"&"+aDesc.join(",");
	} else {
		var aMarks=sDBMarks.split("&");
		// update old word list
		var aOld=aMarks[index*4+2].split(",");
		for (var i=0;i<aMarkList.length;i++) {
			var bNewWord=true;
			var sWord=encodeURIComponent(aMarkList[i].word);
			for (var j=0;j<aOld.length;j+=3) if ((aOld[j]==aMarkList[i].type) && (aOld[j+1]==sWord)) {
				bNewWord=false;
				aOld[j+2]=aMarkList[i].state;
				break;
			}
			if (bNewWord) {
				aOld.push(aMarkList[i].type);
				aOld.push(sWord);
				aOld.push(aMarkList[i].state);
			}
		}

		//update entry
		aArticle[index*2+1]=oTime.getTime();
		aMarks[index*4+2]=aOld.join(",");;
		sDBArticle=aArticle.join("&");
		sDBMarks=aMarks.join("&");
	}

	//save dbs
	GM_setValue("DBArticle",sDBArticle);
	GM_setValue("DBMarks",sDBMarks);

}

function checkDBTimes()
{
	var oTime = new Date();
	var now=oTime.getTime();
	var sDBArticle=GM_getValue("DBArticle","");
	var aArticle=sDBArticle.split("&");
	for (var i=aArticle.length-2;i>=0;i-=2) {
		var tdiff=now-parseInt(aArticle[i+1]);
		if (tdiff > DBTIMEOUT) {
			deleteDBEntry(i/2);
		}
		if (tdiff<=0) {
			GM_log("db entry from the future -> there was an adjustment of clock time");
		}
	}
}

function deleteDBEntry(target)
{
	if ((!target) && (sLemma.length<1)) {
		GM_log("deleteDBEntry: no target & no lemma");
		return;
	}

	var sDBArticle=GM_getValue("DBArticle","");
	var aArticle=sDBArticle.split("&");
	var sDBMarks=GM_getValue("DBMarks","");

	if (target==null) {
		// find entry in db
		var index=-1;
		for (var i=0;((i<aArticle.length) && (index==-1));i+=2) if (decodeURIComponent(aArticle[i])==sLemma) {
			index=i/2;
		}
		if (index==-1) {
			GM_log("deleteDBEntry: entry for lemma '"+sLemma+"' not found.");
			return;
		}
	} else {
		if ((target<0) || (target*2>aArticle.length)) {
			GM_log("error: deleteDBEntry with illegal target");
			return;
		}
		index=target;
	}

	var aMarks=sDBMarks.split("&");

	//delete it
	aArticle.splice(index*2,2);
	aMarks.splice(index*4,4);

	//write dbs back
	sDBArticle=aArticle.join("&");
	sDBMarks=aMarks.join("&");
	GM_setValue("DBArticle",sDBArticle);
	GM_setValue("DBMarks",sDBMarks);
}

function deleteMarks(e)
{
	e.preventDefault();
	deleteView();
	if (aMarkList) while (aMarkList.length>0) {
		var oMark=aMarkList.pop();
		oMark.obj.setAttribute("style","background-color:transparent");
		oMark.obj.removeEventListener("click", clickOnMark, true);
	}

	Status=delDomNode(document.body,Status);
	if (oBDelMarks) {delete oBDelMarks;oBDelMarks=null;}

	var pTextArea=document.getElementById("wpTextbox1");
	if (pTextArea) showNavigator(pTextArea,null);

	bMove=false;
	bDeleteView=false;
	deleteDBEntry();
	cState=0;
	if (descLinks) {delete descLinks;descLinks=new Array();}
	delete wsproxyDB;wsproxyDB = new Object();
	showCheckButton(false);
}

function getMarks(name,col,bOnlyActive,bOwnMarks)
{
	var sDBArticle=GM_getValue("DBArticle","");
	var aArticle=sDBArticle.split("&");
	var aList=new Array();
	var bOutArray=false;
	if ((col.type && col.word) || (col.type && col.state) || (col.word && col.state)) bOutArray=true;
	var index=-1;
	for (var i=0;((i<aArticle.length) && (index==-1));i+=2) if (decodeURIComponent(aArticle[i])==name) index=i/2;
	if (index>=0) {
		var sDBMarks=GM_getValue("DBMarks","");
		var aDBMarks=sDBMarks.split("&");
		// restore description links
		var aDescs=aDBMarks[index*4+3].split(",");
		for (var i=0;i<aDescs.length;i++) {
			var atmp=aDescs[i].split("?");
			descLinks.push(new Array(decodeURIComponent(atmp[0]),decodeURIComponent(atmp[1])));
		}
		// get marks
		var aMarks=aDBMarks[index*4+2].split(",");
		for (var i=0;i<aMarks.length;i+=3) {
			var word=decodeURIComponent(aMarks[i+1]);
			var type=aMarks[i];
			var state=aMarks[i+2];
			if (((!bOnlyActive) || (Math.abs(state-aColor[type][3])==1)) && (bOwnMarks || (type!=C_OWN))) {
				var atmp;
				if (bOutArray) {
					atmp=new Array();
					if (col.type) atmp.push(type);
					if (col.word) atmp.push(word);
					if (col.state) atmp.push(state);
				} else {
					if (col.type) atmp=type;
					else if (col.word) atmp=word;
					else if (col.state) atmp=state;
				}
				aList.push(atmp);
			}
		}
	}
	return aList;
}

function restoreMarks()
{
	if (sLemma.length<1) {
		GM_log("restoreMarks: no lemma");
		return;
	}

	var words=getMarks(sLemma,{type:true,word:true,state:true},false,false);
	if (words.length>0) {
		createView();
		restoreController();
		return true;
	}
	return false;

	function restoreController(objs)
	{
		switch (rcState) {
			case 0: rcState++;getObjects(body,restoreController);break;
			case 1: rcState++;getText(objs,restoreController);break;
			case 2: {
					rcState++;
					articleObj=objs.articleObj;
					words=appendOwnMarks(words);
					oMarkCounter=new CMarkCounter(Status,aColor.length,aColor);
					markWords(words,restoreController);
			};break;
			case 3: rcState++;createMarkList(restoreController,words);break;
			case 4: {
					Quit.disabled=false;
					oBreak=delDomNode(Status,oBreak);
					var mc=0;
					for (var i=0;i<oMarkCounter.aCounter.length;i++) mc+=oMarkCounter.aCounter[i][0];
					if (mc==0) {
						LogMessage.data="Keine Fehler gefunden.";
						cNode(LogMessage.parentNode,"div",null,null);
					} else LogMessage.data="Wiederhergestellt.";
					setFinalView();
					deleteView();
					cState=0;
			};break;
			default:
					GM_log("error: restoreController unknown state: "+rcState);
		}
	}
}

function Html2Text(html)
{
	var rep=[["(&#(196|x[cC]4);|&Auml;|%[cC]4)",sz["Ae"]],["(&#(214|x[dD]6);|&Ouml;|%[dD]6)",sz["Oe"]],["(&#(220|x[dD][cC]);|&Uuml;|%DC)",sz["Ue"]],["(&#(228|x[eE]4);|&auml;|%[eE]4)",sz["ae"]],["(&#(246|x[fF]6);|&ouml;|%F6)",sz["oe"]],["(&#(252|x[fF][cC]);|&uuml;|%[fF][cC])",sz["ue"]],["(&#(223|x[dD][fF]);|&szlig;|%[dD][fF])",sz["sz"]]];
	for (var i=0;i<rep.length;i++) html=html.replace(new RegExp(rep[i][0],"g"),rep[i][1]);
	return html;
}

function showConfig()
{
	var iWidth=580;
	var iHeight=700;
	var iLeft=Math.floor(window.outerWidth/2-iWidth/2);
	var iTop=Math.floor(window.outerHeight/2-iHeight/2);
	var conf_window= window.open ("","config","width="+iWidth+",height="+iHeight+",left="+iLeft+",top="+iTop+",scrollbars=yes");
	conf_window.focus();
	var body=conf_window.document.getElementsByTagName("body");
	if ((!body) || (!body[0])) { GM_log("conf - no body"); return;}
	body[0].setAttribute("style","background-color:#eeeeff");
	var color_field='<tr><td>Farbe: #1#  </td><td>  <input TYPE="text" VALUE="#2#" SIZE="7"/>  </td><td><span style="background-color:#3#">Markierung</span></td></tr>';
	var html='<h3>WP-Rechtschreibpr'+sz["ue"]+'fung - Konfiguration</h3><span style="font-size:12px">Version  '+VERSION+' Copyright 2005-2013 Frank Rechenberger, released under the <a href="http://www.gnu.org/copyleft/gpl.html">GPL license</a></span> <br/><br/><table><tr><th>Eigenschaft</th><th>Wert</th><th>Hinweis</th></tr>';
	for (var i=0;i<aColor.length;i++) html+=color_field.replace(/#1#(.+)#2#(.+)#3#/,aColor[i][2]+"$1"+aColor[i][0]+"$2"+aColor[i][0]);
	html+='</table><br/>Eigene Markierungsliste:';
	body[0].innerHTML=html;

	var oOwnMarks=cNode(body[0],"input",null,{size:"60"});
	oOwnMarks.value=decodeURIComponent(GM_getValue("ownmarklist",""));

	var bAttr={style:"font-size:12px;margin:4px"};
	var bSave=cNode(body[0],"button","Speichern",bAttr);
	bSave.addEventListener("click",save,true);

	var bPreview=cNode(body[0],"button","Farbcode-Check",bAttr);
	bPreview.addEventListener("click",preview,true);

	var bDefault=cNode(body[0],"button","Zur"+sz["ue"]+"cksetzen",bAttr);
	bDefault.addEventListener("click",toDefault,true);

	var bBreak=cNode(body[0],"button","Abbruch",bAttr);
	bBreak.addEventListener("click",function(e) {conf_window.close();},true);

	var divMinor=conf_window.document.createElement("div");
	divMinor.innerHTML="<br>Das Feld \"Nur Kleinigkeiten wurden ver"+sz["ae"]+"ndert\": <BR><INPUT TYPE=\"RADIO\" NAME=\"minor\" VALUE=\"0\">bleibt unver"+sz["ae"]+"ndert </INPUT><INPUT TYPE=\"RADIO\" NAME=\"minor\" VALUE=\"1\">wird aktiviert </INPUT><INPUT TYPE=\"RADIO\" NAME=\"minor\" VALUE=\"2\">wird deaktiviert</INPUT>";
	body[0].insertBefore(divMinor,bSave);

	var divSumm=conf_window.document.createElement("div");
	divSumm.innerHTML='<br>Zusammenfassung: <input TYPE="text" VALUE="" SIZE="24"/><br><input TYPE="checkbox"/>Toollink beim Speichern automatisch anf'+sz["ue"]+'gen</input><br>';
	body[0].insertBefore(divSumm,bSave);

	var divAutoRun=conf_window.document.createElement("div");
	divAutoRun.innerHTML='<br><input TYPE="checkbox"/>Autostart der Pr'+sz["ue"]+'fung</input><br>';
	body[0].insertBefore(divAutoRun,bSave);

	var divUpd=conf_window.document.createElement("div");
	divUpd.innerHTML='<br><input TYPE="checkbox"/>Automatische Updatepr'+sz["ue"]+'fung</input>';
	var bUpdate=cNode(divUpd,"button","Jetzt Pr"+sz["ue"]+"fen...",bAttr);
	bUpdate.addEventListener("click",function(){check4Update(true,conf_window);},true);
	body[0].insertBefore(divUpd,bSave);

	var aInputs=conf_window.document.getElementsByTagName("input");
	var oUCheck=aInputs[aInputs.length-1];
	oUCheck.checked=GM_getValue("autoupdatecheck",true);
	var oAutoRun=aInputs[aInputs.length-2];
	oAutoRun.checked=GM_getValue("autorun",false);
	var oAdlink=aInputs[aInputs.length-3];
	oAdlink.checked=GM_getValue("summaryAdlink",true);
	var oSumm=aInputs[aInputs.length-4];
	oSumm.value=GM_getValue("summary","ortho");

	aInputs[aInputs.length-7+iMinor].checked=true;

	function toDefault()
	{
		for (var i=0;i<aColor.length;i++) aInputs[i].value=aDefault[i];
	}

	function preview(e)
	{
		//update colors
		for (var i=0;i<aColor.length;i++) if (checkColor(aInputs[i].value)) {
			aInputs[i].parentNode.nextSibling.firstChild.firstChild.data="Richtig";
			aInputs[i].parentNode.nextSibling.firstChild.setAttribute("style","background-color:"+aInputs[i].value);
		} else aInputs[i].parentNode.nextSibling.firstChild.firstChild.data="Falsch";
	}

	function save(e)
	{
		//save colors
		for (var i=0;i<aColor.length;i++) if (checkColor(aInputs[i].value)) {
			aColor[i][0]=aInputs[i].value;
			GM_setValue(aColor[i][4],aInputs[i].value);
		}
		GM_setValue("autoupdatecheck",oUCheck.checked);
		GM_setValue("autorun",oAutoRun.checked);
		GM_setValue("summaryAdlink",oAdlink.checked);
		GM_setValue("summary",oSumm.value);
		GM_setValue("ownmarklist",encodeURIComponent(oOwnMarks.value));
		for (var i=0;i<3;i++) if (aInputs[aInputs.length-7+i].checked==true) {
			iMinor=i;
		}
		GM_setValue("minoredit",iMinor);
		conf_window.close();
	}

	function checkColor(c)
	{
		if (((c.length==7) && (c.search(/#[0-9a-fA-F]{6,6}/)==0)) || ((c.length>0) && (c.search(/[^A-Za-z]/)<0))) return true;
		return false;
	}

}

function check4Update(bPrompt,base)
{
	if (!base) base=window;
	//autostart -> run only once a day
	var oDate=new Date();
	var aDate=new Array(oDate.getDate(),oDate.getMonth(),oDate.getFullYear());
	var aLastDate=GM_getValue("lastupdate","0.0.0").split(".");
	var bNewDay=false;
	for (var i=2;i>=0;i--) if (aDate[i]>parseInt(aLastDate[i])) {
		bNewDay=true;
		break;
	}

	if ((!bPrompt) && (!bNewDay)) return;
	refreshSubCats(base);
	var sURL="http://de.wikipedia.org/w/api.php?action=query&prop=revisions&titles=Benutzer:Revvar/RT/Version&rvlimit=50&format=xml&rvprop=user|ids";
	oXmlHttpRequest({
		method:'GET',
		url:sURL,
		headers:{'User-agent': 'Skript: wikipedia.de-Rechtschreibpruefung'},
		onload: getOldID,
		onerror:function(rD) {base.alert("Konnte History der Updateseite "+sURL+" nicht laden.");},
		onreadystatechange:function() {}
	});
	return;

	function getOldID(rD)
	{
		var dom=parseXML("XML",rD.responseText);
		if (!dom) { base.alert("Konnte History der Updateseite nicht parsen.");return;}
		try {
			var query = dom.getElementsByTagName("query")[0];
			var oRevisions = query.getElementsByTagName("revisions")[0];
			var oRev=oRevisions.firstChild;
			GM_log(rD.responseText);
			while (oRev) {
				if (oRev.getAttribute("user")=="Revvar") {
					var link="http://de.wikipedia.org/w/index.php?title=Benutzer:Revvar/RT/Version&oldid="+oRev.getAttribute("revid");
					getVersionString(link);
					return;
				}
				oRev = oRev.nextSibling;
			}
		} catch(e) {GM_log(e); }
		base.alert("Keine Bearbeitungen von Benutzer Revvar gefunden -> Abbruch.");
	}

	function getVersionString(oldid)
	{
		oldid+="&action=raw";
		oXmlHttpRequest({
			method:'GET',
			url:oldid,
			headers:{'User-agent': 'Skript: wikipedia.de-Rechtschreibpruefung'},
			onload: check,
			onerror:function(rD) {base.alert("Konnte Updateseite "+oldid+" nicht laden.");},
			onreadystatechange:function() {}
		});
	}

	function check(rD)
	{
		try {
			var sParts=rD.responseText.split(";");
			aParts=new Array();
			aParts["version"]=sParts[0];
			for (var i=1;i<sParts.length;i++) {
				var v=sParts[i].split(":");
				aParts[v[0]]=v[1]
			}
			if (sParts[0]==VERSION) {
				var msg="Aktuelle Version: "+VERSION+" - Keine Updates verf"+sz["ue"]+"gbar.";
				GM_log(msg);
				if (bPrompt) base.alert(msg);
			} else {
				base.alert("-=Wikipedia-Rechtschreibpr"+sz["ue"]+"fung=-\n\nEs existiert eine neue Version "+aParts["version"]+aParts["state"]+".\nNeuerungen:\n* "+aParts["changes"].replace(/,/g,"\n* "));
				if (aParts["update link"]) window.open("http://"+aParts["update link"]); else
				window.open("http://userscripts.org/scripts/source/35643.user.js");
			}
			GM_setValue("lastupdate",aDate.join("."));
			if (aParts["blacklist"]) GM_setValue("catsblacklist",aParts["blacklist"]);
		} catch (e) {
			base.alert("Konnte Updateseite "+sURL+" nicht auswerten.");
		}

	}
}

function parseXML(type,text)
{
	switch (type) {
		case "XHTML": type="application/xhtml+xml";break;
		case "XML": type="text/xml";break;
		default: { GM_log("function parse: unknown type");throw("function parse: unknown type");}
	}
	if (typeof(XPCNativeWrapper) == "function") {
		var dp = new XPCNativeWrapper(window, "DOMParser()");
		var parser = new dp.DOMParser();
		var dom = parser.parseFromString(text, type);
		var error=dom.getElementsByTagName("parsererror");
		if (!error[0]) {
			return dom;
		} else {
			var sError=error[0].firstChild.nodeValue;
			GM_log(sError);
			var aError=sError.split("\n");
			if (aError[2]) {
				aLocation=aError[2].match(/[0-9]+/g);
				if (aLocation[0]) {
					var aHtmlText=text.split("\n");
					GM_log("error line:"+aHtmlText[aLocation[0]-1]);
					return;
				}
			} else GM_log("no error position");
			return;
		}
		return;
	} else { GM_log("Object XPCNativeWrapper not found."); throw("Object XPCNativeWrapper not found.");}
}

function refreshSubCats(base)
{
	oXmlHttpRequest({
		method:'GET',
		url:'http://toolserver.org/~daniel/WikiSense/CategoryIntersect.php?wikilang=de&wikifam=.wikipedia.org&basecat=Schweiz&basedeep=20&mode=cl&go=Scan&raw=on&userlang=de',
		headers:{'User-agent': 'Skript: wikipedia.de-Rechtschreibpruefung'},
		onload: getCHCats,
		onerror:function() {GM_log("Konnte Toolserver nicht erreichen.");},
		onreadystatechange:function() {},
		silent:true
	});
	oXmlHttpRequest({
		method:'GET',
		url:'http://toolserver.org/~daniel/WikiSense/CategoryIntersect.php?wikilang=de&wikifam=.wikipedia.org&basecat=%C3%96sterreich&basedeep=20&mode=cl&go=Scan&raw=on&userlang=de',
		headers:{'User-agent': 'Skript: wikipedia.de-Rechtschreibpruefung'},
		onload: getACats,
		onerror:function() {GM_log("Konnte Toolserver nicht erreichen.");},
		onreadystatechange:function() {},
		silent:true
	});
	function prepareCats(rD)
	{
		var cats=rD.responseText.replace(/[0-9]+\t/g,"").split("\n");
		var cats2=new Array();
		for (var i=0;i<cats.length;i++) {
			cats[i]=trimWord(cats[i]);
			if (cats[i].search(/[a-z]/i)>=0) cats2.push(cats[i]);
		}
		var sxCats="^("+cats2.join("|").replace(/[ _]/g,"[ _]").replace(/[(]/g,"[(]").replace(/[)]/g,"[)]")+")$";
		return sxCats;
	}

	function getCHCats(rD)
	{
		if (rD.responseText.search("class='error'")>=0) {
			GM_log("Der Toolserver meldete einen Fehler.");
			GM_log(rD.responseText);
			return;
		}
		var sxCats=prepareCats(rD);
		GM_setValue("catsCH",sxCats);
	}

	function getACats(rD)
	{
		if (rD.responseText.search("class='error'")>=0) {
			GM_log("Der Toolserver meldete einen Fehler.");
			GM_log(rD.responseText);
			return;
		}
		var sxCats=prepareCats(rD);
		GM_setValue("catsA",sxCats);
	}
}

function delDomNode(parent,node)
{
	if (node!=null) {
		try {
			parent.removeChild(node);
		} catch(e) { }
		delete node;
	}
	return null;
}

function delArrayOfObjects(array)
{
	if (array!=null) {
		while (array.length>0) delete array.pop();
		delete array;
	}
	return null;
}
function cleanupGlobals(e)
{
	bBreak=true;
	saveMarksToDB();
	//HACK: clean all global variables
	aMarkList=delArrayOfObjects(aMarkList);
	aColor=delArrayOfObjects(aColor);
	aExp=delArrayOfObjects(aExp);
	articleObj=delArrayOfObjects(articleObj);

	if (Logo) { delete Logo;Logo=null;}
	if (LogoBack) { delete LogoBack;LogoBack=null;}
	if (Status) { delete Status;Status=null;}

	if (BCheck) {delete BCheck;BCheck=null;}
	if (sz) {delete sz;sz=null;}
	if (oMarkCounter) {delete oMarkCounter;oMarkCounter=null;}
	if (timerDeleteView) {clearTimeout(timerDeleteView);timerDeleteView=null;}
	if (descLinks) {}
	if (oBreak) {delete oBreak;oBreak=null;}
	if (Quit) {delete Quit;Quit=null;}
	if (aNavigator) {aNavigator.cleanup();delete aNavigator;aNavigator=null;}
	if (wsproxyDB) {delete wsproxyDB;wsproxyDB=null;};
	if (knownWords) {delete knownWords;knownWords=null;};
}

init(); })();