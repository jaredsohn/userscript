// ==UserScript==
// @name          Ofek - Display Flash
// @namespace     Nadav Kavalerchik
// @description	  Enables Flash Objects on Ofek Site by MA.TA.CH (v0.1)
// @include	      http://ofek.cet.ac.il/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey  (0.5+) user script.
//
// To install, you need Firefox  http://www.getfirefox.com and
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools|Manage User Scripts,
// select the script and click Uninstall.
//
// --------------------------------------------------------------------


var obj = document.getElementById("AS_FlashDiv440444");
if (obj) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 465;
    newObj.width = 604;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    //newObj.BGColor="#EFFCD2";
    newObj.movie = "/Units/math/flash/Snake.swf?gameMode=2&showTopTen=true";
    newObj.data = "/Units/math/flash/Snake.swf?gameMode=2&showTopTen=true";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

var obj = document.getElementById("AS_FlashDiv440505");
if (obj) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 465;
    newObj.width = 604;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    //newObj.BGColor="#EFFCD2";
    newObj.movie = "/Units/math/flash/Snake.swf?gameMode=1&showTopTen=true";
    newObj.data = "/Units/math/flash/Snake.swf?gameMode=1&showTopTen=true";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

var obj = document.getElementById("AS_FlashDiv440504");
if (obj) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 465;
    newObj.width = 604;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.BGColor="#EFFCD2";
    newObj.movie = "/Units/math/flash/frog.swf?gameMode=34&showTopTen=true";
    newObj.data = "/Units/math/flash/frog.swf?gameMode=34&showTopTen=true";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

var obj = document.getElementById("FlashDivcomics");
if (obj) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 400;
    newObj.width = 500;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.BGColor="#EFFCD2";
    newObj.movie = "/common/CetComics/Comics.swf?imgPath=uploads/&initState=edit&ver=0.88&initPath=/xml/Comics/init_xml.xml&edit_page=0&comicsPath=xml/Comics/comics_xml.xml";
    newObj.data = "/common/CetComics/Comics.swf?imgPath=uploads/&initState=edit&ver=0.88&initPath=/xml/Comics/init_xml.xml&edit_page=0&comicsPath=xml/Comics/comics_xml.xml";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}


if (document.baseURI == 'http://ofek.cet.ac.il/units/science/unit98/act1.aspx')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivRiddle");
if (obj) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;
    //alert("yes");

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 333;
    newObj.width = 562;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.BGColor="#EFFCD2";
    newObj.movie = "/units/science/unit98/Flash/shavuot.swf";
    newObj.data = "/units/science/unit98/Flash/shavuot.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}
}

if (document.baseURI == 'http://ofek.cet.ac.il/units/science/unit98/act2.aspx')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivRiddle");
if (obj) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;
    //alert("yes");

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 365;
    newObj.width = 585;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.BGColor="#EFFCD2";
    newObj.movie = "/units/science/unit98/Flash/crosswordLoader.swf?sXmlPath=/units/science/unit98/Flash/crossword.xml";
    newObj.data = "/units/science/unit98/Flash/crosswordLoader.swf?sXmlPath=/units/science/unit98/Flash/crossword.xml";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}
}



//http://ofek.cet.ac.il/units/science/scienceFrame.aspx?BottomFrame=/units/science/games/natureMaze.aspx
//

//http://ofek.cet.ac.il/units/science/scienceframe.aspx?BottomFrame=http://demo.go.cet.ac.il/matary/trivia/space.asp
//

//obj = document.evaluate(
//    "//div[@id='divFlash']",
//    document,
//    null,
//    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
//    null);
//alert("yes ("+obj.snapshotItem(0)+") "+document.baseURI);

var obj = document.getElementById("divFlash");
if (obj) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 400;
    newObj.width = 500;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.BGColor="#EFFCD2";
    newObj.movie = "http://demo.go.cet.ac.il/matary/trivia/trivia-space.swf?nQuestions=10&sLanguage=Hebrew&";
    newObj.data = "http://demo.go.cet.ac.il/matary/trivia/trivia-space.swf?nQuestions=10&sLanguage=Hebrew&";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (document.baseURI == 'http://www3.cet.ac.il/disabled')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivmain");
if (obj) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;
    //alert("yes");

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
	// embed is not standrd ! html tag
    	//var newObj = document.createElement("embed");
    newObj.params = new Object();
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 330;
    newObj.width = 780;
	newObj.params['quality']='high';
    //newObj.quality = "high";
	newObj.params['wmode']='transparent';
    //newObj.wmode = "transparent";
	newObj.params['allowScriptAccess']='sameDomain';
    //newObj.allowScriptAccess="sameDomain";
	newObj.params['bgcolor']='#EFFCD2';
    //newObj.BGColor="#EFFCD2";
    //newObj.movie = "/images/main.swf";
    newObj.data = "/images/main.swf";
    //newObj.src = "/images/main.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}
}



/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept == "undefined") var deconcept = new Object();
if(typeof deconcept.util == "undefined") deconcept.util = new Object();
if(typeof deconcept.SWFObjectUtil == "undefined") deconcept.SWFObjectUtil = new Object();
deconcept.SWFObject = function(swf, id, w, h, ver, c, quality, xiRedirectUrl, redirectUrl, detectKey) {
	if (!document.getElementById) { return; }
	this.DETECT_KEY = detectKey ? detectKey : 'detectflash';
	this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
	this.params = new Object();
	this.variables = new Object();
	this.attributes = new Array();
	if(swf) { this.setAttribute('swf', swf); }
//alert(swf);
	if(id) { this.setAttribute('id', id); }
	if(w) { this.setAttribute('width', w); }
	if(h) { this.setAttribute('height', h); }
	if(ver) { this.setAttribute('version', new deconcept.PlayerVersion(ver.toString().split("."))); }
	this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
	if (!window.opera && document.all && this.installedVer.major > 7) {
		// only add the onunload cleanup if the Flash Player version supports External Interface and we are in IE
		deconcept.SWFObject.doPrepUnload = true;
	}
	if(c) { this.addParam('bgcolor', c); }
	var q = quality ? quality : 'high';
	this.addParam('quality', q);
	this.setAttribute('useExpressInstall', false);
	this.setAttribute('doExpressInstall', false);
	var xir = (xiRedirectUrl) ? xiRedirectUrl : window.location;
	this.setAttribute('xiRedirectUrl', xir);
	this.setAttribute('redirectUrl', '');
	if(redirectUrl) { this.setAttribute('redirectUrl', redirectUrl); }
}
deconcept.SWFObject.prototype = {
	useExpressInstall: function(path) {
		this.xiSWFPath = !path ? "expressinstall.swf" : path;
		this.setAttribute('useExpressInstall', true);
	},
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},
	getAttribute: function(name){
		return this.attributes[name];
	},
	addParam: function(name, value){
		this.params[name] = value;
	},
	getParams: function(){
		return this.params;
	},
	addVariable: function(name, value){
		this.variables[name] = value;
	},
	getVariable: function(name){
		return this.variables[name];
	},
	getVariables: function(){
		return this.variables;
	},
	getVariablePairs: function(){
		var variablePairs = new Array();
		var key;
		var variables = this.getVariables();
		for(key in variables){
			variablePairs[variablePairs.length] = key +"="+ variables[key];
		}
		return variablePairs;
	},
	getSWFHTML: function() {
		var swfNode = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { // netscape plugin architecture
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "PlugIn");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<embed type="application/x-shockwave-flash" src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'" style="'+ this.getAttribute('style') +'"';
			swfNode += ' id="'+ this.getAttribute('id') +'" name="'+ this.getAttribute('id') +'" ';
			var params = this.getParams();
			 for(var key in params){ swfNode += [key] +'="'+ params[key] +'" '; }
			var pairs = this.getVariablePairs().join("&");
			 if (pairs.length > 0){ swfNode += 'flashvars="'+ pairs +'"'; }
			swfNode += '/>';
		} else { // PC IE
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "ActiveX");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<object id="'+ this.getAttribute('id') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'" style="'+ this.getAttribute('style') +'">';
			swfNode += '<param name="movie" value="'+ this.getAttribute('swf') +'" />';
			var params = this.getParams();
			for(var key in params) {
			 swfNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
			}
			var pairs = this.getVariablePairs().join("&");
			if(pairs.length > 0) {swfNode += '<param name="flashvars" value="'+ pairs +'" />';}
			swfNode += "</object>";
		}
		return swfNode;
	},
	write: function(elementId){
		
		if(this.getAttribute('useExpressInstall')) {
			
			// check to see if we need to do an express install
			var expressInstallReqVer = new deconcept.PlayerVersion([6,0,65]);
			if (this.installedVer.versionIsValid(expressInstallReqVer) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
				this.setAttribute('doExpressInstall', true);
				this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
				document.title = document.title.slice(0, 47) + " - Flash Player Installation";
				this.addVariable("MMdoctitle", document.title);
			}
		}
		//alert('Player Version valid='+this.installedVer.versionIsValid(this.getAttribute('version')));
		//alert('doExpressInstall='+this.getAttribute('doExpressInstall'));
		if(this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version'))){
			//alert(elementId);
			var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
			n.innerHTML = this.getSWFHTML();
			//alert(n.innerHTML);
			return true;
		}else{
			if(this.getAttribute('redirectUrl') != "") {
				document.location.replace(this.getAttribute('redirectUrl'));
			}
		}
		return false;
	}
}

/* ---- detection functions ---- */
deconcept.SWFObjectUtil.getPlayerVersion = function(){
	var PlayerVersion = new deconcept.PlayerVersion([0,0,0]);
	if(navigator.plugins && navigator.mimeTypes.length){
		var x = navigator.plugins["Shockwave Flash"];
		if(x && x.description) {
			PlayerVersion = new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
		}
	}else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0){ // if Windows CE
		var axo = 1;
		var counter = 3;
		while(axo) {
			try {
				counter++;
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+ counter);
//				document.write("player v: "+ counter);
				PlayerVersion = new deconcept.PlayerVersion([counter,0,0]);
			} catch (e) {
				axo = null;
			}
		}
	} else { // Win IE (non mobile)
		// do minor version lookup in IE, but avoid fp6 crashing issues
		// see http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
		try{
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}catch(e){
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				PlayerVersion = new deconcept.PlayerVersion([6,0,21]);
				axo.AllowScriptAccess = "always"; // error if player version < 6.0.47 (thanks to Michael Williams @ Adobe for this code)
			} catch(e) {
				if (PlayerVersion.major == 6) {
					return PlayerVersion;
				}
			}
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			} catch(e) {}
		}
		if (axo != null) {
			PlayerVersion = new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
		}
	}
	return PlayerVersion;
}
deconcept.PlayerVersion = function(arrVersion){
	this.major = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
	this.minor = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
	this.rev = arrVersion[2] != null ? parseInt(arrVersion[2]) : 0;
}
deconcept.PlayerVersion.prototype.versionIsValid = function(fv){
	//alert(this.major +'= major ='+ fv.major + ' // '+this.minor +'= minor ='+ fv.minor);
	if(this.major < fv.major) return false;
	if(this.major > fv.major) return true;
	if(this.minor < fv.minor) return false;
	if(this.minor > fv.minor) return true;
	if(this.rev < fv.rev) return false;
	return true;
}
/* ---- get value of query string param ---- */
deconcept.util = {
	getRequestParameter: function(param) {
		var q = document.location.search || document.location.hash;
		if (param == null) { return q; }
		if(q) {
			var pairs = q.substring(1).split("&");
			for (var i=0; i < pairs.length; i++) {
				if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
					return pairs[i].substring((pairs[i].indexOf("=")+1));
				}
			}
		}
		return "";
	}
}
/* fix for video streaming bug */
deconcept.SWFObjectUtil.cleanupSWFs = function() {
	var objects = document.getElementsByTagName("OBJECT");
	for (var i = objects.length - 1; i >= 0; i--) {
		objects[i].style.display = 'none';
		for (var x in objects[i]) {
			if (typeof objects[i][x] == 'function') {
				objects[i][x] = function(){};
			}
		}
	}
}
// fixes bug in some fp9 versions see http://blog.deconcept.com/2006/07/28/swfobject-143-released/
if (deconcept.SWFObject.doPrepUnload) {
	if (!deconcept.unloadSet) {
		deconcept.SWFObjectUtil.prepUnload = function() {
			__flash_unloadHandler = function(){};
			__flash_savedUnloadHandler = function(){};
			window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs);
		}
		window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload);
		deconcept.unloadSet = true;
	}
}
/* add document.getElementById if needed (mobile IE < 5) */
if (!document.getElementById && document.all) { document.getElementById = function(id) { return document.all[id]; }}

/* add some aliases for ease of use/backwards compatibility */
var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject; // for legacy support
var SWFObject = deconcept.SWFObject;

if (document.baseURI == 'http://www3.cet.ac.il/')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivmain");
if (obj) {

	var so = new SWFObject("/images/main.swf", "main", "780", "330", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("name", "main");

   	so.write("FlashDivmain");

}
}

if (document.baseURI == 'http://ofek.cet.ac.il/units/he/math/unit51/act1.aspx')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivDoghouse");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/math/Flash/Doghouse.swf?workMode=4", "Doghouse", "650", "465", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
  	//name="main"

   	so.write("FlashDivDoghouse");

}
}

if (document.baseURI == 'http://ofek.cet.ac.il/units/he/studentmenu.aspx?sSubjectKey=lashon-')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivoStudentTree");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/flash/lashon/menu.swf", "oStudentTree", "200", "580", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	so.addParam("FlashVars", "sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=lashon");
  	//name="main"

   	so.write("FlashDivoStudentTree");

}
}

if (document.baseURI == 'http://ofek.cet.ac.il/units/he/lashon/unit70/act1.aspx?nUnit=70&sSubjectKey=lashon')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivcards");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/flashGames/TifzoretLoader.swf?sXmlPath=/units/he/lashon/unit70/Flash/game/tif.xml", "cards", "594", "400", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("FlashVars", "");
  	//name="main"

   	so.write("FlashDivcards");

}
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////			פורטל מתמטיקה

if (document.baseURI == 'http://ofek.cet.ac.il/units/he/StudentMenu.aspx?sSubjectKey=math-')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivWindowOptions");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/flash/left-Top.swf", "WindowOptions", "90", "40", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("FlashVars", "bIndexPage=1");
  	//name="main"

   	so.write("FlashDivWindowOptions");

}
}


if (document.baseURI == 'http://ofek.cet.ac.il/units/he/StudentMenu.aspx?sSubjectKey=math-')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivoTop");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/flash/math/main_top.swf", "oTop", "287", "87", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("FlashVars", "HTML_nClass=3");
  	//name="main"

   	so.write("FlashDivoTop");

}
}


if (document.baseURI == 'http://ofek.cet.ac.il/units/he/StudentMenu.aspx?sSubjectKey=math-')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivregister");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/flash/register.swf", "register", "176", "80", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("FlashVars", "HTML_nClass=3");
  	//name="main"

   	so.write("FlashDivregister");

}
}


if (document.baseURI == 'http://ofek.cet.ac.il/units/he/StudentMenu.aspx?sSubjectKey=math-')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivoStudentTree");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/flash/math/menu3.swf", "oStudentTree", "200", "590", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	so.addParam("FlashVars", "sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=math_3");
  	//name="main"

   	so.write("FlashDivoStudentTree");

}
}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
////////////////		לוח מגירות

if (document.baseURI == 'http://ofek.cet.ac.il/units/he/math/unit89/act1.aspx?sOpenLinkIn=New')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivPAGETITLE_right-");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/Flash/Right.swf", "PAGETITLE_right", "462", "140", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("FlashVars", "sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=math_3");
  	//name="main"

   	so.write("FlashDivPAGETITLE_right");

}
}


if (document.baseURI == 'http://ofek.cet.ac.il/units/he/math/unit89/act1.aspx?sOpenLinkIn=New')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivPAGETITLE_left-");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/Flash/left3ms.swf", "PAGETITLE_left", "314", "140", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("FlashVars", "sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=math_3");
  	//name="main"

   	so.write("FlashDivPAGETITLE_left");

}
}


if (document.baseURI == 'http://ofek.cet.ac.il/units/he/math/unit89/act1.aspx?sOpenLinkIn=New')
{
//alert(document.baseURI);
var obj = document.getElementById("PageBottom");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/Units/he/math/Flash/DrawersGame01.swf?maxNumber=200", "lab", "465", "650", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("FlashVars", "sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=math_3");
  	//name="main"

   	so.write("PageBottom");

}
}


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
////////////////		פורטל מדע

if (document.baseURI == 'http://ofek.cet.ac.il/units/he/studentmenu.aspx?sSubjectKey=science-')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivWindowOptions");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/flash/left-Top.swf", "WindowOptions", "90", "40", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("FlashVars", "bIndexPage=1");
  	//name="main"

   	so.write("FlashDivWindowOptions");

}
}


if (document.baseURI == 'http://ofek.cet.ac.il/units/he/studentmenu.aspx?sSubjectKey=science-')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivoTop");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/flash/science/main_top.swf", "oTop", "287", "87", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("FlashVars", "HTML_nClass=3");
  	//name="main"

   	so.write("FlashDivoTop");

}
}


if (document.baseURI == 'http://ofek.cet.ac.il/units/he/studentmenu.aspx?sSubjectKey=science-')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivregister");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/flash/register.swf", "register", "176", "80", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	//so.addParam("FlashVars", "HTML_nClass=3");
  	//name="main"

   	so.write("FlashDivregister");

}
}


if (document.baseURI == 'http://ofek.cet.ac.il/units/he/studentmenu.aspx?sSubjectKey=science-')
{
//alert(document.baseURI);
var obj = document.getElementById("FlashDivoStudentTree");
if (obj) {

	var so = new SWFObject("http://ofek.cet.ac.il/units/he/flash/science/menu.swf", "oStudentTree", "200", "1090", "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
   	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	so.addParam("FlashVars", "sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=science");
  	//name="main"

   	so.write("FlashDivoStudentTree");

}
}

var changes = [

//{name:'PAGETITLE_left', wrapper: 'FlashDivPAGETITLE_left', 
//url: '/units/he/math//act1.aspx?nUnit=60&sSubjectKey=math' , flash: '/units/he/Flash/left3ms.swf', height: 140 ,width: 314 ,vars: ''},

//{name: 'WindowOptions', wrapper: 'FlashDivWindowOptions', 
//url: '/units/he/math/unit63/index.aspx?nUnit=63&sSubjectKey=math' , flash:'/units/he/Flash/left-Top.swf?bIndexPage=1' ,height:40 , width:90 , vars: '' },

//{name: 'PAGETITLE_left', wrapper: 'FlashDivPAGETITLE_left', 
//url: '/units/he/math/unit63/index.aspx?nUnit=63&sSubjectKey=math' , flash:'/units/he/Flash/leftMsIndex.swf' ,height:140 , width:314 , vars: '' },

{name: 'oTop', wrapper: 'FlashDivoTop', 
url: '/units/he/StudentMenu.aspx?sSubjectKey=math&sMathGrade=3' , flash:'/units/he/flash/math/main_top.swf' ,height:87 , width:286 , vars: '' },

{name: 'oTop', wrapper: 'FlashDivoTop', 
url: '/units/he/StudentMenu.aspx?sSubjectKey=math&sMathGrade=4' , flash:'/units/he/flash/math/main_top.swf' ,height:87 , width:286 , vars: '' },

{name: 'oTop', wrapper: 'FlashDivoTop', 
url: '/units/he/StudentMenu.aspx?sSubjectKey=math&sMathGrade=5' , flash:'/units/he/flash/math/main_top.swf' ,height:87 , width:286 , vars: '' },

{name: 'oTop', wrapper: 'FlashDivoTop', 
url: '/units/he/StudentMenu.aspx?sSubjectKey=math&sMathGrade=6' , flash:'/units/he/flash/math/main_top.swf' ,height:87 , width:286 , vars: '' },

{name: 'oTop', wrapper: 'FlashDivoTop', 
url: '/units/he/studentmenu.aspx?sSubjectKey=math' , flash:'/units/he/flash/math/main_top.swf' ,height:87 , width:286 , vars: '' },


{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit60/act1.aspx?nUnit=60&sSubjectKey=math' , flash:'/units/he/math/Flash/DrawersGame01.swf?maxNumber=200' ,height:465 , width:650  ,vars: ''},

{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit70/act1.aspx?nUnit=70&sSubjectKey=math' , flash:'/units/he/math/Flash/MonsterInDark.swf?maxNumber=200' ,height:465 , width:650  ,vars: ''},

{name: 'UnitIndex', wrapper: 'UnitIndex1_UnitIndex_Flash', 
url: '/units/he/math/unit63/index.aspx?nUnit=63&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=4&HTML_sActNames="רמה 1 *רמה 2 *רמה 3 *רמה 4 "' ,height:264 , width:250 , vars: '' },

{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit5/index.aspx?nUnit=5&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="רמה 1*רמה 2"' ,height:264 , width:250 , vars: '' },
{name: 'BigMoney', wrapper: 'FlashDivBigMoney', 
url: '/units/he/math/unit5/Act1.aspx?nUnit=5&sSubjectKey=math' , flash:'/Common/MathGames/BigMoneyEval.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fCashBoxGenerator.aspx%3fsID%3dc1b' ,height:465 , width:650 , vars: '' },
{name: 'BigMoney', wrapper: 'FlashDivBigMoney', 
url: '/units/he/math/unit5/Act2.aspx?nUnit=5&sSubjectKey=math' , flash:'/Common/MathGames/BigMoneyEval.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fCashBoxGenerator.aspx%3fsID%3dc2b' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit6/index.aspx?nUnit=6&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="רמה 1*רמה 2"' ,height:264 , width:250 , vars: '' },
{name: 'BigMoney', wrapper: 'FlashDivBigMoney', 
url: '/units/he/math/unit6/Act1.aspx?nUnit=6&sSubjectKey=math' , flash:'/Common/MathGames/BigMoneyEval.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fCashBoxGenerator.aspx%3fsID%3dc1c' ,height:465 , width:650 , vars: '' },
{name: 'BigMoney', wrapper: 'FlashDivBigMoney', 
url: '/units/he/math/unit6/Act2.aspx?nUnit=6&sSubjectKey=math' , flash:'/Common/MathGames/BigMoneyEval.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fCashBoxGenerator.aspx%3fsID%3dc2c' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit45/index.aspx?nUnit=45&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=3&HTML_sActNames="רמה 1 *רמה 2 *רמה 3 "' ,height:264 , width:250 , vars: '' },
{name: 'Bricks', wrapper: 'FlashDivBricks', 
url: '/units/he/math/unit45/Act1.aspx?nUnit=45&sSubjectKey=math' , flash:'/Common/MathGames/BricksEval.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fBricksToolGenerator.aspx%3fsID%3d3a101r' ,height:465 , width:650 , vars: '' },
{name: 'Bricks', wrapper: 'FlashDivBricks', 
url: '/units/he/math/unit45/Act2.aspx?nUnit=45&sSubjectKey=math' , flash:'/Common/MathGames/BricksEval.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fBricksToolGenerator.aspx%3fsID%3d3a102r' ,height:465 , width:650 , vars: '' },
{name: 'Bricks', wrapper: 'FlashDivBricks', 
url: '/units/he/math/unit45/Act3.aspx?nUnit=45&sSubjectKey=math' , flash:'/Common/MathGames/BricksEval.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fBricksToolGenerator.aspx%3fsID%3d3a103r' ,height:465 , width:650 , vars: '' },
{name: 'Bricks', wrapper: 'FlashDivBricks', 
url: '/units/he/math/unit46/act1.aspx?nUnit=46&sSubjectKey=math' ,
 flash:'/Common/MathGames/BricksEval.swf?sXmlPath=%2fCommon%2fMathGames%2fBricksToolGenerator.aspx%3fsID%3d3a104' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit47/index.aspx?nUnit=47&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=3&HTML_sActNames="רמה 1 *רמה 2 *רמה 3 "' ,height:264 , width:250 , vars: '' },
{name: 'Bricks', wrapper: 'FlashDivBricks', 
url: '/units/he/math/unit47/Act1.aspx?nUnit=47&sSubjectKey=math' , flash:'/Common/MathGames/BricksEval.swf?sXmlPath=%2fCommon%2fMathGames%2fBricksToolGenerator.aspx%3fsID%3d3a105r' ,height:465 , width:650 , vars: '' },
{name: 'Bricks', wrapper: 'FlashDivBricks', 
url: '/units/he/math/unit47/Act2.aspx?nUnit=47&sSubjectKey=math' , flash:'/Common/MathGames/BricksEval.swf?sXmlPath=%2fCommon%2fMathGames%2fBricksToolGenerator.aspx%3fsID%3d3a106r' ,height:465 , width:650 , vars: '' },
{name: 'Bricks', wrapper: 'FlashDivBricks', 
url: '/units/he/math/unit47/Act3.aspx?nUnit=47&sSubjectKey=math' , flash:'/Common/MathGames/BricksEval.swf?sXmlPath=%2fCommon%2fMathGames%2fBricksToolGenerator.aspx%3fsID%3d3a107r' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit49/index.aspx?nUnit=49&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=3&HTML_sActNames="רמה 1 *רמה 2 *רמה 3 "' ,height:264 , width:250 , vars: '' },


{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit42/act1.aspx?nUnit=42&sSubjectKey=math' , flash:'/units/he/math/Flash/FlyingCook.swf?numberMode=3&showTopTen=true' ,height:465 , width:650 , vars: '' },


{name: 'AS_FlashDiv1560817', wrapper: 'AS_FlashDiv1560817', 
url: '/units/he/math/unit10/act1.aspx?nUnit=10&sSubjectKey=math' , flash:'/units/he/math/flash/frog.swf?gameMode=1&showTopTen=true' ,height:465 , width:604 , vars: '' },

{name: 'AS_FlashDiv283335', wrapper: 'AS_FlashDiv283335', 
url: '/units/he/math/unit15/act1.aspx?nUnit=15&sSubjectKey=math' , flash:'/units/he/math/flash/frog.swf?gameMode=36&showTopTen=true' ,height:465 , width:604 , vars: '' },

{name: 'AS_Flash283335', wrapper: 'AS_FlashDiv283335', 
url: '/units/he/math/unit16/act1.aspx?nUnit=16&sSubjectKey=math' , flash:'/units/he/math/flash/frog.swf?gameMode=37&showTopTen=true' ,height:465 , width:604 , vars: '' },


{name: 'drag', wrapper: 'FlashDivdrag', 
url: '/units/he/math/unit20/act1.aspx?nUnit=20&sSubjectKey=math' , flash:'/units/he/math/flash/ShoppingFree.swf' ,height:465 , width:604 , vars: '' },

{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit21/index.aspx?nUnit=21&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="חיסור מדויק *חיסור בעזרת אומדן "' ,height:264 , width:250 , vars: '' },
{name: 'drag', wrapper: 'FlashDivdrag', 
url: '/units/he/math/unit21/Act1.aspx?nUnit=21&sSubjectKey=math' , flash:'/units/he/math/flash/ShoppingByOrder.swf' ,height:465 , width:604 , vars: '' },
{name: 'drag', wrapper: 'FlashDivdrag', 
url: '/units/he/math/unit21/Act2.aspx?nUnit=21&sSubjectKey=math' , flash:'/units/he/math/flash/ShoppingByOrder2.swf' ,height:465 , width:604 , vars: '' },

{name: 'drag', wrapper: 'FlashDivdrag', 
url: '/units/he/math/unit22/act1.aspx?nUnit=22&sSubjectKey=math' , flash:'/units/he/math/flash/ShoppingByTotal.swf' ,height:465 , width:604 , vars: '' },

{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit23/index.aspx?nUnit=23&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="עד 1000 *עד 10000 "' ,height:264 , width:250 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit23/Act1.aspx?nUnit=23&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr32' ,height:465 , width:650 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit23/Act2.aspx?nUnit=23&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr33' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit24/index.aspx?nUnit=24&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="עד 1000 *עד 10000 "' ,height:264 , width:250 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit24/Act1.aspx?nUnit=24&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr42' ,height:465 , width:650 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit24/Act2.aspx?nUnit=24&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr42' ,height:465 , width:650 , vars: '' },

{name: 'AS_FlashDiv1560835', wrapper: 'AS_FlashDiv1560835', 
url: '/units/he/math/unit32/act1.aspx?nUnit=32&sSubjectKey=math' , flash:'/units/he/math/flash/Snake.swf?gameMode=3&showTopTen=true' ,height:465 , width:604 , vars: '' },

{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit33/index.aspx?nUnit=33&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=3&HTML_sActNames="כפולות *כפל בתחום *חילוק "' ,height:264 , width:250 , vars: '' },
{name: 'Doghouse', wrapper: 'FlashDivDoghouse', 
url: '/units/he/math/unit33/Act1.aspx?nUnit=33&sSubjectKey=math' , flash:'/units/he/math/Flash/Doghouse.swf?workMode=1' ,height:465 , width:650 , vars: '' },
{name: 'Doghouse', wrapper: 'FlashDivDoghouse', 
url: '/units/he/math/unit33/Act2.aspx?nUnit=33&sSubjectKey=math' , flash:'/units/he/math/Flash/Doghouse.swf?workMode=2' ,height:465 , width:650 , vars: '' },
{name: 'Doghouse', wrapper: 'FlashDivDoghouse', 
url: '/units/he/math/unit33/Act3.aspx?nUnit=33&sSubjectKey=math' , flash:'/units/he/math/Flash/Doghouse.swf?workMode=3' ,height:465 , width:650 , vars: '' },

{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit52/act1.aspx?nUnit=52&sSubjectKey=math' , flash:'/units/he/math/Flash/DivisionMachine.swf?startLevel=1&endLevel=5&exCount=5&skipRemainder=true' ,height:465 , width:650 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit53/act1.aspx?nUnit=53&sSubjectKey=math' , flash:'/units/he/math/Flash/DivisionMachine.swf?startLevel=1&endLevel=4&exCount=3&skipRemainder=false' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit26/index.aspx?nUnit=26&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="עד 1000 *עד 10000 "' ,height:264 , width:250 , vars: '' },

{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit26/Act1.aspx?nUnit=26&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr34' ,height:465 , width:650 , vars: '' },

{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit26/Act2.aspx?nUnit=26&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr35' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit28/index.aspx?nUnit=28&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=4&HTML_sActNames="עד 1000 *עד 10000 *עד 100000 רמה א *עד 100000 רמה ב "' ,height:264 , width:250 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit28/Act1.aspx?nUnit=28&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr42' ,height:465 , width:650 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit28/Act2.aspx?nUnit=28&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr43' ,height:465 , width:650 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit28/Act3.aspx?nUnit=28&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr21' ,height:465 , width:650 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit28/Act4.aspx?nUnit=28&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr22' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit25/index.aspx?nUnit=25&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="עד 1000 *עד 10000 "' ,height:264 , width:250 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit25/Act1.aspx?nUnit=25&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr44' ,height:465 , width:650 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit25/Act2.aspx?nUnit=25&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr45' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit27/index.aspx?nUnit=27&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=4&HTML_sActNames="עד 1000 *עד 10000 *עד 100000 רמה א *עד 100000 רמה ב "' ,height:264 , width:250 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit27/Act1.aspx?nUnit=27&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr32' ,height:465 , width:650 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit27/Act2.aspx?nUnit=27&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr33' ,height:465 , width:650 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit27/Act3.aspx?nUnit=27&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr11' ,height:465 , width:650 , vars: '' },
{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/math/unit27/Act4.aspx?nUnit=27&sSubjectKey=math' , flash:'/Common/MathGames/Riddle.swf?workMode=Learning&sXmlPath=%2fCommon%2fMathGames%2fRiddleGenerator.aspx%3fsID%3dr12' ,height:465 , width:650 , vars: '' },

{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit11/index.aspx?nUnit=11&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="רמה 1 *רמה 2 "' ,height:264 , width:250 , vars: '' },

{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit12/index.aspx?nUnit=12&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="רמה 1 *רמה 2 "' ,height:264 , width:250 , vars: '' },
{name: 'AS_FlashDiv1011419', wrapper: 'AS_FlashDiv1011419', 
url: '/units/he/math/unit12/Act1.aspx?nUnit=12&sSubjectKey=math' , flash:'/units/he/math/flash/frog.swf?gameMode=32&showTopTen=true' ,height:465 , width:604 , vars: '' },
{name: 'AS_FlashDiv1556264', wrapper: 'AS_FlashDiv1556264', 
url: '/units/he/math/unit12/Act2.aspx?nUnit=12&sSubjectKey=math' , flash:'/units/he/math/flash/frog.swf?gameMode=33&showTopTen=true' ,height:465 , width:604 , vars: '' },

{name: 'honeyBee3.swf', wrapper: 'FlashDivhoneyBee3.swf', 
url: '/units/he/math/unit37/act1.aspx?nUnit=37&sSubjectKey=math' , flash:'/units/he/math/unit37/Flash/honeyBee3.swf' ,height:400 , width:360 , vars: '' },
{name: 'honeyBee.swf', wrapper: 'FlashDivhoneyBee.swf', 
url: '/units/he/math/unit36/act1.aspx?nUnit=36&sSubjectKey=math' , flash:'/units/he/math/unit36/Flash/honeyBee.swf' ,height:400 , width:360 , vars: '' },

{name: 'AS_FlashDiv283335', wrapper: 'AS_FlashDiv283335', 
url: '/units/he/math/unit14/act1.aspx?nUnit=14&sSubjectKey=math' , flash:'/units/he/math/flash/frog.swf?gameMode=35&showTopTen=true' ,height:465 , width:604 , vars: '' },

{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit50/act1.aspx?nUnit=50&sSubjectKey=math' , flash:'/units/he/math/Flash/DivisionMachine.swf?flashvars=startLevel=1&endLevel=10&exCount=5&skipRemainder=true' ,height:465 , width:650 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit51/act1.aspx?nUnit=51&sSubjectKey=math' , flash:'/units/he/math/Flash/DivisionMachine.swf?flashvars=startLevel=1&endLevel=10&exCount=3&skipRemainder=false' ,height:465 , width:650 , vars: '' },

{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit55/act1.aspx?nUnit=55&sSubjectKey=math' , flash:'/units/he/math/flash/Bridges.swf?workMode=1' ,height:465 , width:650 , vars: '' },
{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit56/act1.aspx?nUnit=56&sSubjectKey=math' , flash:'/units/he/math/flash/Bridges.swf?workMode=2' ,height:465 , width:650 , vars: '' },
{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit57/act1.aspx?nUnit=57&sSubjectKey=math' , flash:'/units/he/math/flash/Bridges.swf?workMode=3' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit8/index.aspx?nUnit=8&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="רמה 1 *רמה 2 "' ,height:264 , width:250 , vars: '' },
{name: 'Ball', wrapper: 'FlashDivBall', 
url: '/units/he/math/unit8/Act1.aspx?nUnit=8&sSubjectKey=math' , flash:'/Common/MathGames/FractionBall.swf?workMode=Learning&sXmlPath0=/Common/MathGames/FractionDataGenerator.aspx?sID=f211&sXmlPath1=/Common/MathGames/FractionDataGenerator.aspx?sID=f212&sXmlPath2=/Common/MathGames/FractionDataGenerator.aspx?sID=f213&sXmlPath3=/Common/MathGames/FractionDataGenerator.aspx?sID=f214&sXmlPath4=/Common/MathGames/FractionDataGenerator.aspx?sID=f215' ,height:465 , width:650 , vars: '' },
{name: 'Ball', wrapper: 'FlashDivBall', 
url: '/units/he/math/unit8/Act2.aspx?nUnit=8&sSubjectKey=math' , flash:'/Common/MathGames/FractionBall.swf?workMode=Learning&sXmlPath0=/Common/MathGames/FractionDataGenerator.aspx?sID=f221&sXmlPath1=/Common/MathGames/FractionDataGenerator.aspx?sID=f222&sXmlPath2=/Common/MathGames/FractionDataGenerator.aspx?sID=f223&sXmlPath3=/Common/MathGames/FractionDataGenerator.aspx?sID=f224&sXmlPath4=/Common/MathGames/FractionDataGenerator.aspx?sID=f225' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit9/index.aspx?nUnit=9&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="רמה 1 *רמה 2 "' ,height:264 , width:250 , vars: '' },

{name: 'Ball', wrapper: 'FlashDivBall', 
url: '/units/he/math/unit9/Act1.aspx?nUnit=9&sSubjectKey=math' , flash:'/Common/MathGames/FractionBall.swf?workMode=Learning&sXmlPath0=/Common/MathGames/FractionDataGenerator.aspx?sID=f311&sXmlPath1=/Common/MathGames/FractionDataGenerator.aspx?sID=f312&sXmlPath2=/Common/MathGames/FractionDataGenerator.aspx?sID=f313&sXmlPath3=/Common/MathGames/FractionDataGenerator.aspx?sID=f314&sXmlPath4=/Common/MathGames/FractionDataGenerator.aspx?sID=f315' ,height:465 , width:650 , vars: '' },
{name: 'Ball', wrapper: 'FlashDivBall', 
url: '/units/he/math/unit9/Act2.aspx?nUnit=9&sSubjectKey=math' , flash:'/Common/MathGames/FractionBall.swf?workMode=Learning&sXmlPath0=/Common/MathGames/FractionDataGenerator.aspx?sID=f311&sXmlPath1=/Common/MathGames/FractionDataGenerator.aspx?sID=f312&sXmlPath2=/Common/MathGames/FractionDataGenerator.aspx?sID=f313&sXmlPath3=/Common/MathGames/FractionDataGenerator.aspx?sID=f314&sXmlPath4=/Common/MathGames/FractionDataGenerator.aspx?sID=f325' ,height:465 , width:650 , vars: '' },

{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit35/act1.aspx?nUnit=35&sSubjectKey=math' , flash:'/units/he/math/Flash/Zoo.swf?gameLevel=0' ,height:400 , width:650 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit35/act1.aspx?nUnit=35&sSubjectKey=math&sOpenLinkIn=Same' , flash:'/units/he/math/Flash/Zoo.swf?gameLevel=0' ,height:400 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit38/index.aspx?nUnit=38&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=6&HTML_sActNames="רמה 1 *רמה 2 *רמה 3 *רמה 4 *רמה 5 *רמה 6 "' ,height:264 , width:250 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit38/Act1.aspx?nUnit=38&sSubjectKey=math' , flash:'/units/he/math/Flash/Zoo.swf?gameLevel=1' ,height:400 , width:650 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit38/Act2.aspx?nUnit=38&sSubjectKey=math' , flash:'/units/he/math/Flash/Zoo.swf?gameLevel=2' ,height:400 , width:650 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit38/Act3.aspx?nUnit=38&sSubjectKey=math' , flash:'/units/he/math/Flash/Zoo.swf?gameLevel=3' ,height:400 , width:650 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit38/Act4.aspx?nUnit=38&sSubjectKey=math' , flash:'/units/he/math/Flash/Zoo.swf?gameLevel=4' ,height:400 , width:650 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit38/Act5.aspx?nUnit=38&sSubjectKey=math' , flash:'/units/he/math/Flash/Zoo.swf?gameLevel=5' ,height:400 , width:650 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit38/Act6.aspx?nUnit=38&sSubjectKey=math' , flash:'/units/he/math/Flash/Zoo.swf?gameLevel=6' ,height:400 , width:650 , vars: '' },

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////            6rd grade MATH
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


{name: 'AutumnRiddle', wrapper: 'FlashDivAutumnRiddle', 
url: '/Units/He/Math/unit96/act1.aspx?sOpenLinkIn=Same' , flash:'/Units/He/Math/unit96/Flash/AutumnRiddle2.swf' ,height:350 , width:450 , vars: '' },


{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit58/act1.aspx?nUnit=58&sSubjectKey=math&sOpenLinkIn=Same' , flash:'/units/he/math/Flash/FlyingCook.swf?numberMode=4' ,height:465 , width:650 , vars: '' },

{name: 'Ball', wrapper: 'FlashDivBall', 
url: '/units/he/math/unit7/Act2.aspx?nUnit=7&sSubjectKey=math&sOpenLinkIn=Same' , flash:'/Common/MathGames/FractionBall.swf?workMode=Learning&sXmlPath0=/Common/MathGames/FractionDataGenerator.aspx?sID=f121&sXmlPath1=/Common/MathGames/FractionDataGenerator.aspx?sID=f122&sXmlPath2=/Common/MathGames/FractionDataGenerator.aspx?sID=f123&sXmlPath3=/Common/MathGames/FractionDataGenerator.aspx?sID=f124&sXmlPath4=/Common/MathGames/FractionDataGenerator.aspx?sID=f125' ,height:465 , width:650 , vars: '' },

{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit43/index.aspx?nUnit=43&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=3&HTML_sActNames="רמה 1 *רמה 2 *רמה 3 "' ,height:264 , width:250 , vars: '' },
{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit43/Act1.aspx?nUnit=43&sSubjectKey=math' , flash:'/units/he/math/Flash/FlyingCook.swf?numberMode=4' ,height:465 , width:650 , vars: '' },
{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit43/Act2.aspx?nUnit=43&sSubjectKey=math' , flash:'/units/he/math/Flash/FlyingCook.swf?numberMode=5' ,height:465 , width:650 , vars: '' },
{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit43/Act3.aspx?nUnit=43&sSubjectKey=math' , flash:'/units/he/math/Flash/FlyingCook.swf?numberMode=6' ,height:465 , width:650 , vars: '' },

{name: 'BricksToolDec', wrapper: 'FlashDivBricksToolDec', 
url: '/units/he/math/unit44/act1.aspx' , flash:'/units/he/math/Flash/BricksToolDec.swf' ,height:465 , width:650 , vars: '' },




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////            3rd grade MATH
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

{name: 'plant', wrapper: 'FlashDivplant', 
url: '/Units/He/Math/unit80/act1.aspx' , flash:'/Units/He/Math/unit80/Flash/plant.swf' ,height:400 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit1/index.aspx?nUnit=1&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="רמה 1 <br>כל השטרות והמטב...*רמה 2 <br>חלק מהשטרות והמ..."' ,height:264 , width:250 , vars: '' },

{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit64/index.aspx?nUnit=64&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=4&HTML_sActNames="רמה 1 *רמה 2 *רמה 3 *רמה 4 "' ,height:264 , width:250 , vars: '' },
{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit64/Act1.aspx?nUnit=64&sSubjectKey=math' , flash:'/units/he/math/Flash/DrawersGame02.swf?maxNumber=1000&startLevel=1' ,height:465 , width:650 , vars: '' },
{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit64/Act2.aspx?nUnit=64&sSubjectKey=math' , flash:'/units/he/math/Flash/DrawersGame02.swf?maxNumber=1000&startLevel=2' ,height:465 , width:650 , vars: '' },
{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit64/Act3.aspx?nUnit=64&sSubjectKey=math' , flash:'/units/he/math/Flash/DrawersGame02.swf?maxNumber=1000&startLevel=3' ,height:465 , width:650 , vars: '' },
{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit64/Act4.aspx?nUnit=64&sSubjectKey=math' , flash:'/units/he/math/Flash/DrawersGame02.swf?maxNumber=1000&startLevel=4' ,height:465 , width:650 , vars: '' },



//{name: 'WindowOptions', wrapper: 'FlashDivWindowOptions', 
//url: '/units/he/math/unit66/act1.aspx?nUnit=66&sSubjectKey=math' , flash:'/units/he/Flash/left-Top.swf?bIndexPage=1' ,height:40 , width:90 , vars: '' },

//{name: 'PAGETITLE_left', wrapper: 'FlashDivPAGETITLE_left', 
//url: '/units/he/math/unit66/act1.aspx?nUnit=66&sSubjectKey=math' , flash:'/units/he/Flash/leftMsIndex.swf' ,height:140 , width:314 , vars: '' },

{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit66/act1.aspx?nUnit=66&sSubjectKey=math' , flash:'/units/he/math/Flash/DrawersGame03.swf?maxNumber=200' ,height:465 , width:650 , vars: '' },

{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit67/act1.aspx?nUnit=67&sSubjectKey=math' , flash:'/units/he/math/Flash/DrawersGame03.swf?maxNumber=1000' ,height:465 , width:650 , vars: '' },


{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit2/index.aspx?nUnit=2&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=2&HTML_sActNames="1, 10, 100 - המבנה העשרונ...*כל השטרות והמטבעות "' ,height:264 , width:250 , vars: '' },

{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/math/unit3/index.aspx?nUnit=3&sSubjectKey=math' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=3&HTML_sActNames="רמה 1*רמה 2*רמה 3"' ,height:264 , width:250 , vars: '' },



{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit40/act1.aspx?nUnit=40&sSubjectKey=math' , flash:'/units/he/math/Flash/FlyingCook.swf?numberMode=3&showTopTen=true' ,height:465 , width:650 , vars: '' },

{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit41/act1.aspx?nUnit=41&sSubjectKey=math' , flash:'/units/he/math/Flash/FlyingCook.swf?numberMode=2&showTopTen=true' ,height:465 , width:650 , vars: '' },

{name: 'Doghouse', wrapper: 'FlashDivDoghouse', 
url: '/units/he/math/unit34/act1.aspx?nUnit=34&sSubjectKey=math' , flash:'/units/he/math/Flash/Doghouse.swf?workMode=4' ,height:465 , width:650 , vars: '' },


{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit1/Act2.aspx?nUnit=1&sSubjectKey=math' , flash:'/units/he/math/Flash/MoneyBuildTrans.swf?missionLevel=2' ,height:461 , width:600 , vars: '' },

{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit1/Act1.aspx?nUnit=1&sSubjectKey=math' , flash:'/units/he/math/Flash/MoneyBuildTrans.swf?missionLevel=1' ,height:461 , width:600 , vars: '' },

{name: 'AS_Flash1010939', wrapper: 'AS_FlashDiv1010939', 
url: '/units/he/math/unit31/act1.aspx?nUnit=31&sSubjectKey=math' , flash:'/units/he/math/flash/Snake.swf?gameMode=2&showTopTen=true' ,height:465 , width:604 , vars: '' },

{name: 'AS_Flash1010995', wrapper: 'AS_FlashDiv1010995', 
url: '/units/he/math/unit13/act1.aspx?nUnit=13&sSubjectKey=math' , flash:'/units/he/math/flash/frog.swf?gameMode=34&showTopTen=true' ,height:465 , width:604 , vars: '' },

{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit2/Act1.aspx?nUnit=2&sSubjectKey=math' , flash:'/units/he/math/Flash/MoneyCountTrans.swf?missionLevel=1' ,height:461 , width:600 , vars: '' },

{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit2/Act2.aspx?nUnit=2&sSubjectKey=math' , flash:'/units/he/math/Flash/MoneyCountTrans.swf?missionLevel=2' ,height:461 , width:600 , vars: '' },

{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit3/Act1.aspx?nUnit=3&sSubjectKey=math' , flash:'/units/he/math/Flash/MoneyDragTrans.swf?missionLevel=1' ,height:461 , width:600 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit3/Act2.aspx?nUnit=3&sSubjectKey=math' , flash:'/units/he/math/Flash/MoneyDragTrans.swf?missionLevel=2' ,height:461 , width:600 , vars: '' },
{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit3/Act3.aspx?nUnit=3&sSubjectKey=math' , flash:'/units/he/math/Flash/MoneyDragTrans.swf?missionLevel=3' ,height:461 , width:600 , vars: '' },


{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit61/act1.aspx?nUnit=61&sSubjectKey=math' , flash:'/units/he/math/Flash/DrawersGame01.swf?maxNumber=1000' ,height:465 , width:650 , vars: '' },

{name: 'AS_Flash283336', wrapper: 'AS_FlashDiv283336', 
url: '/units/he/math/unit30/act1.aspx?nUnit=30&sSubjectKey=math' , flash:'/units/he/math/flash/Snake.swf?gameMode=1&showTopTen=true' ,height:465 , width:604 , vars: '' },

{name: 'Memory', wrapper: 'FlashDivMemory', 
url: '/units/he/math/unit49/Act1.aspx?nUnit=49&sSubjectKey=math' , flash:'/Common/MathGames/Memory.swf?sXmlPath=%2fCommon%2fMathGames%2fMemoryGenerator.aspx%3fnRows%3d2%26nCols%3d4%26nType%3d0' ,height:465 , width:650 , vars: '' },

{name: 'Memory', wrapper: 'FlashDivMemory', 
url: '/units/he/math/unit49/Act2.aspx?nUnit=49&sSubjectKey=math' , flash:'/Common/MathGames/Memory.swf?sXmlPath=%2fCommon%2fMathGames%2fMemoryGenerator.aspx%3fnRows%3d3%26nCols%3d4%26nType%3d0' ,height:465 , width:650 , vars: '' },

{name: 'AS_Flash1011389', wrapper: 'AS_FlashDiv1011389', 
url: '/units/he/math/unit11/Act1.aspx?nUnit=11&sSubjectKey=math' , flash:'/units/he/math/flash/frog.swf?gameMode=30&showTopTen=true' ,height:465 , width:604 , vars: '' },

{name: 'AS_Flash1011419', wrapper: 'AS_FlashDiv1011419', 
url: '/units/he/math/unit11/Act2.aspx?nUnit=11&sSubjectKey=math' , flash:'/units/he/math/flash/frog.swf?gameMode=32&showTopTen=true' ,height:465 , width:604 , vars: '' },

{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit63/Act1.aspx?nUnit=63&sSubjectKey=math' , flash:'/units/he/math/Flash/DrawersGame02.swf?maxNumber=200&startLevel=1' ,height:465 , width:650 , vars: '' },

{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit63/Act2.aspx?nUnit=63&sSubjectKey=math' , flash:'/units/he/math/Flash/DrawersGame02.swf?maxNumber=200&startLevel=2' ,height:465 , width:650 , vars: '' },

{name: 'DrawersGame', wrapper: 'PageBottom', 
url: '/units/he/math/unit20/act1.aspx?nUnit=57&sSubjectKey=math&sOpenLinkIn=Same' , flash:'/units/he/math/flash/ShoppingFree.swf' ,height:465 , width:604 , vars: '' },

{name: 'FlyingCook', wrapper: 'FlashDivFlyingCook', 
url: '/units/he/math/unit57/act1.aspx?nUnit=57&sSubjectKey=math&sOpenLinkIn=Same' , flash:'/units/he/math/Flash/Bridges.swf?workMode=3' ,height:465 , width:650 , vars: '' },

{name: 'oStudentTree', wrapper: 'FlashDivoStudentTree', 
url: '/units/he/studentmenu.aspx?sSubjectKey=math' , flash:'/units/he/flash/math/menu3.swf?sFlashAnchor=&sXmlPath=/units/he/StudentMenuTree.aspx?sSubjectKey=math_3' ,height:590 , width:200 , vars: '' },

{name: 'simulation', wrapper: 'FlashDivsimulation', 
url: '/units/he/math/unit4/act1.aspx' , flash:'/units/he/math/Flash/CashboxTool.swf?missionLevel=2' ,height:461 , width:600 , vars: '' },

{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit69/act1.aspx' , flash:'/units/he/math/Flash/DrawersGame02.swf?maxNumber=10000' ,height:465 , width:650 , vars: '' },

{name: 'Doghouse', wrapper: 'FlashDivDoghouse', 
url: '/units/he/math/unit48/act1.aspx' , flash:'/units/he/math/Flash/BricksTool.swf' ,height:465 , width:650 , vars: '' },

{name: 'Doghouse', wrapper: 'FlashDivDoghouse', 
url: '/units/he/math/unit54/act1.aspx' , flash:'/units/he/math/Flash/DivisionTool.swf' ,height:465 , width:650 , vars: '' },

////   hinuh leshoni

{name: 'Riddle', wrapper: 'FlashDivRiddle', 
url: '/units/he/lashon/unit6/act3.aspx?nUnit=6&sSubjectKey=lashon' , flash:'/units/he/lashon/unit6/Flash/placard/dolphin_drag.swf' ,height:400 , width:630 , vars: '' },
/* /flashGames/drag.swf?sXmlPath=http://ofek.cet.ac.il/units/he/lashon/unit6/Flash/Placard/drag.xml */

{name: 'RightMenu', wrapper: 'FlashDivRightMenu', 
url: '/' , flash:'/images/ofek/Flash/menu_main.swf?sXmlPath=images/ofek/Flash/menu.xml&xx' ,height:680 , width:222 , vars: '' },

{name: 'oStudentTree', wrapper: 'FlashDivoStudentTree', 
url: '/units/he/StudentMenu.aspx?sSubjectKey=math&sMathGrade=3' , flash:'/units/he/flash/math/menu3.swf?sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=math_3' ,height:590 , width:200 , vars: '' },

{name: 'oStudentTree', wrapper: 'FlashDivoStudentTree', 
url: '/units/he/StudentMenu.aspx?sSubjectKey=math&sMathGrade=4' , flash:'/units/he/flash/math/menu4.swf?sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=math_4' ,height:590 , width:200 , vars: '' },

{name: 'oStudentTree', wrapper: 'FlashDivoStudentTree', 
url: '/units/he/StudentMenu.aspx?sSubjectKey=math&sMathGrade=5' , flash:'/units/he/flash/math/menu4.swf?sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=math_5' ,height:590 , width:200 , vars: '' },

{name: 'oStudentTree', wrapper: 'FlashDivoStudentTree', 
url: '/units/he/StudentMenu.aspx?sSubjectKey=math&sMathGrade=6' , flash:'/units/he/flash/math/menu4.swf?sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=math_6' ,height:590 , width:200 , vars: '' },

{name: 'DrawersGame', wrapper: 'FlashDivDrawersGame', 
url: '/units/he/math/unit72/act1.aspx?nUnit=72&sSubjectKey=math' , flash:'/units/he/math/Flash/MonsterInDark.swf?maxNumber=10000' ,height:465 , width:650 , vars: '' },



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////
////////////                      HINUH LESHONI



{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/lashon/unit5/index.aspx?nUnit=5&sSubjectKey=lashon' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=6&HTML_sActNames="קוראים את הסיפור*יוון דומה ל...*הדימוי מתפתח*הדימוי של רות צרפתי*מה מעורר דימוי?*יוצרים דימוי"' ,height:264 , width:250 , vars: '' },

{name: 'UnitIndex', wrapper: 'FlashDivUnitIndex', 
url: '/units/he/lashon/unit12/index.aspx?nUnit=12&sSubjectKey=lashon' , flash:'/units/he/Flash/Index.swf?HTML_nTotalPages=9&HTML_sActTypes="read,game,game,game,game,game,game,write,read"&HTML_sActNames="קוראים באנציקלופדיה*מה השורות המודגשות אומרות...*תחנות בחיים*מה קרה? מה השפיע?*האדם הפרטי והאדם הציבורי*מחייה השפה העברית*מחפשים מילים של בן-יהודה*מצטרפים לאקדמיה*קריאה נוספת ברשת"' ,height:264 , width:250 , vars: '' },

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////
////////////                      MADA


{name: 'oStudentTree', wrapper: 'FlashDivoStudentTree', 
url: '/units/he/StudentMenu.aspx?sSubjectKey=science' , flash:'/units/he/flash/science/menu.swf?sFlashAnchor=&sXmlPath=StudentMenuTree.aspx?sSubjectKey=science' ,height:1090 , width:200 , vars: '' },


//{name:'', wrapper: '', url: '' , flash: '', height:'' ,width:'', vars: ''}
];


for (i in changes)
//	fixFlash_SWFObject (changes[i]);
	fixFlash (changes[i]);

// works with firefox
function fixFlash (c) {
	if (document.baseURI == 'http://ofek.cet.ac.il' + c.url){
	//if (document.location.pathname == c.url) {
		//alert(c.wrapper);
		var obj = document.getElementById(c.wrapper);
		if (!obj) return false;
		
		//var div = obj.parentNode;
		var div = obj;
		// Remove Ofek's Original Flash Object
		var newDiv = div.cloneNode(false);
		div.parentNode.replaceChild(newDiv, div);
		
		var newObj = document.createElement("object");
		newObj.type = "application/x-shockwave-flash";
		newObj.quality = "high";
		newObj.wmode = "transparent";
		newObj.allowScriptAccess = "sameDomain";
		newObj.height = c.height;
		newObj.width = c.width;
		newObj.movie = "http://ofek.cet.ac.il" + c.flash;
		newObj.data =  "http://ofek.cet.ac.il" + c.flash;
		//alert("http://ofek.cet.ac.il" + c.flash);
		if (c.name) newObj.name =  c.name;
		
		newDiv.appendChild(newObj);
	}
} 

// works for all browsers
function fixFlash_SWFObject (c){
	//alert(document.location.pathname + " == " + c.url);
	//alert(document.baseURI + " == http://ofek.cet.ac.il" + c.url);
	//if (document.location.pathname == c.url) {
	if (document.baseURI == 'http://ofek.cet.ac.il' + c.url) {
	alert("http://ofek.cet.ac.il"+c.flash);
	var so = new SWFObject("http://ofek.cet.ac.il"+c.flash, c.wrapper, c.width, c.height, "0", "#EFFCD2");
	
	//so.setAttribute('doExpressInstall', 'true');
	so.addParam("quality", "high");
	so.addParam("wmode", "transparent");
	so.addParam("allowScriptAccess", "sameDomain");
	so.addParam("align", "middle");
	if (c.vars) so.addParam("FlashVars", c.vars);
	if (c.name) so.addParam("name", c.name);

	so.write(c.wrapper);

	}
}

var allScripts, thisScript;

allScripts = document.evaluate("//script[@for='main']" , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allScripts.snapshotLength; i++) {
    thisScript = allScripts.snapshotItem(i);
    // do something with thisDiv
	//alert(thisScript.text);
	var newScript = document.createElement("script");
	newScript.innerHTML = 'function main_DoFSCommand(command,args){ '+thisScript.text+';}';
	thisScript.parentNode.replaceChild(newScript,thisScript);
}

allScripts = document.evaluate("//script[@for='RightMenu']" , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allScripts.snapshotLength; i++) {
    thisScript = allScripts.snapshotItem(i);
    // do something with thisDiv
	//alert(thisScript.text);
	var newScript = document.createElement("script");
	newScript.innerHTML = 'function RightMenu_DoFSCommand(command,args){ '+thisScript.text+';}';
	thisScript.parentNode.replaceChild(newScript,thisScript);
}

allScripts = document.evaluate("//script[@for='oStudentTree']" , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allScripts.snapshotLength; i++) {
    thisScript = allScripts.snapshotItem(i);
    // do something with thisDiv
	//alert(thisScript.text);
	var newScript = document.createElement("script");
	newScript.innerHTML = 'function oStudentTree_DoFSCommand(command,args){ '+thisScript.text+';}';
	thisScript.parentNode.replaceChild(newScript,thisScript);
}

allScripts = document.evaluate("//script[@for='UnitIndex']" , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allScripts.snapshotLength; i++) {
    thisScript = allScripts.snapshotItem(i);
    // do something with thisDiv
	//alert(thisScript.text);
	var newScript = document.createElement("script");
	newScript.innerHTML = 'function UnitIndex_DoFSCommand(command,args){ '+thisScript.text+';}';
	thisScript.parentNode.replaceChild(newScript,thisScript);
}

allScripts = document.evaluate("//script[@for='oTop']" , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allScripts.snapshotLength; i++) {
    thisScript = allScripts.snapshotItem(i);
    // do something with thisDiv
	//alert(thisScript.text);
	var newScript = document.createElement("script");
	newScript.innerHTML = 'function oTop_DoFSCommand(command,args){ '+thisScript.text+';}';
	thisScript.parentNode.replaceChild(newScript,thisScript);
}

/// display  iframe in http://ofek.cet.ac.il/units/he/science/greenpage.aspx
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('iframe.ScienceUnit109Iframe { width: 800px ! important; height: 700px ! important; }');
//