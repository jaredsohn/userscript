// ==UserScript==
// @name           Clalit Online Services Fixer
// @description	   Make Clalit online services work with a non IE6 browser
// @version        2009-06-16
// @namespace      http://userscripts.org/51494
// @include        https://e-services.clalit.org.il/*
// @include        http://www.clalit.org.il/*
// @include        http://www.clalit.co.il/*
// ==/UserScript==

// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give credit. Thanks.
// Improvements & suggestions are welcome.

//////////////////////////
// Helper functions
//////////////////////////
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function $get(id) { return document.getElementById(id); }

////////////////////////////
// GM configuration
////////////////////////////

function setID() {
	GM_setValue("clalitID", prompt("ID number for Clalit"));
	window.location.reload();
}
GM_registerMenuCommand("Set ID number for login", setID);

//////////////////////////
// Fixing functions
//////////////////////////

function handleLogin() {
	var uid = $get("userId");
	var uname = $get("userName");
	var pswd = $get("password");

	if (uid && uname && pswd) {
		uid.setAttribute("autocomplete","on");
		uname.setAttribute("autocomplete","on");
		pswd.setAttribute("autocomplete","on");

		if (GM_getValue("clalitID", "ID")!="ID") {
			uid.value = GM_getValue("clalitID");

			// Try to trigger the autocomplete mechanism
			// (stopped working in FF3.5b99)
			uname.focus();
			uname.blur();
			uname.focus();
		} else {
			uid.focus();
		}
		
		// If all values are filled - log in
		if ((uid.value != "") && (uname.value != "") && (pswd.value != "") 
			&& (document.body.innerHTML.indexOf(
			unescape("%u05E9%u05D2%u05D5%u05D9"))==-1))  // ="shagui"
			$get("btn").click();
	}
}

function hackGetters() { 
	// Make document.frames work
	unsafeWindow.document.__defineGetter__("frames", function() 
											{ return unsafeWindow.frames; });
}

function fixFunctions(reparray) {

	for (var f in unsafeWindow) {
		try { 
			if (typeof unsafeWindow[f] != "function") continue;
			var s = unsafeWindow[f].toSource();
			if (s.indexOf("[native code]") > 0) continue;
			var fix = false;
		
			for (var rep in reparray) {
				var r = RegExp(rep,"g");
				if (s.match(r)) {
					fix = true;
					s = s.replace(r,reparray[rep]);
				}
			}
			
			if (fix) {
				var i = s.indexOf("{");
				s = s.substring(0,i) + "{ with(unsafeWindow) " + s.substring(i)+"}";
				s = "unsafeWindow."+f+"="+s;
				eval(s);	    
			}
		} catch(e if e.name=="NS_ERROR_DOM_SECURITY_ERR") { }  // Catch security exceptions
	}
}

function rerunOnloadFunctions() {
	// Fix redirect pages
	if (document.forms.length > 0 && document.forms[0].name=="Redirect") document.forms[0].submit();
	// Fix zimun pages
	if (unsafeWindow.UpdateHours) unsafeWindow.UpdateHours();
	
	if (unsafeWindow.xx) window.location="javascript:xx();";
}

function fixOnClicks() {
	// Replace some VB functions with JS ones
	if (!unsafeWindow.SendOp) unsafeWindow.SendOp = function(tindex) {
		window.frames[0].location.href = "doctors.asp?Op=" + tindex;
	}

	if (!unsafeWindow.SendDoc) unsafeWindow.SendDoc = function(tindex,zamod,zamod_cond_indp) {
		tLink = "page2.asp?zamod=" + zamod + 
			"&zamod_cond_indp=" + zamod_cond_indp +
			"&Pos=" + tindex + "&Op=" + document.getElementById("Op").value;
		window.parent.location.href = tLink;
	}
	
	// Fix "onclick" attributes
	docs = $x("//div[starts-with(@onclick,'SendDoc')]");
	for (i=0; i<docs.length; ++i) {
		at = docs[i].getAttribute("onclick");
		at = at.replace("SendDoc","SendDoc(") + ")";
		docs[i].setAttribute("onclick",at);
	}
		
	// Fix some VBscript on "Error/Error.asp"
	if ($get("btnBack")) {
		 vb = $x("//script[@language='vbscript']");
		 if (vb.length>0) {
			cmd=vb[0].textContent.match(/window\.location.*/);
			$get("btnBack").setAttribute("onclick","javascript:"+cmd);
		}
	}
	
	// Replace modal window with an alert
	unsafeWindow.pShowModalDialog = function(s) { alert(s);}
	
	// Fix modal window
	if ($get("oMassage")) {
		if (unsafeWindow.dialogArguments.trim() != "") {
			$get("oMassage").innerHTML = unsafeWindow.dialogArguments;
		} else {
			unsafeWindow.close();
		}
	}
}

function fixCosmetics() {

	// Hide zero width select elements
	var zerowidth = $x("//select[@style='width: 0pt;']");
	for (i=0; i<zerowidth.length; ++i) 
		zerowidth[i].style.setProperty("visibility","hidden","");

	// Enlarge doctor list frame size
	if ($get("doctors")) {
		if (window.parent.scrollbars.visible)
  		 window.parent.document.getElementById("Iframe1").height = 
		  document.body.scrollHeight;
	}	
	
	// Fix menus
	var menuright = $get("Menu1_menuright");
	if (menuright) {
		t = menuright.innerHTML.replace(/span/g,"div").replace(/\<br>/g,"");
		menuright.innerHTML = t;
	}
	
	var menutop = $get("header_topMenu");
	if (menutop) {
		t = menutop.innerHTML.replace(/span/g,"div");
		menutop.innerHTML = t;
	}

	// Fix CSS issues
	GM_addStyle(".headMenu { float:left; }");
	GM_addStyle("#wrapper { overflow:auto; }");    // fixes bad calculation of scrollHight
	GM_addStyle(".Lab_List_tabletext_link:visited {	color:#a7a7a7; }"); // fixes type in css
	
	// Add a favicon
	var imgFavIcon = "data:image/gif,GIF89a%10%00%10%00%B3%00%00%10%B51%23%B5w%00%AD%EF%1B%AF%EC6%BDLH%BA%A9%85%C9%C5%CC%DD%D0%EB%EB%E2%E7%EF%EF%EF%EF%EB%F7%F5%EF%F7%F7%F7%FF%F7%F7%FF%FF%F7%FF%FF%FF%2C%00%00%00%00%10%00%10%00%00%04m%F0%C9)%17%A3x%B63%CC%CATc%08%A4%D1dM%B3%8C%24y%A4%E7%93%0Ct%3B%D8t%F2%1Cmy%B0%A4%01%E2a%A0%D1%0CCF%F1%A8x4%10PDS%F2%8C%5E%601%89%03%2BA%10%BE%84C%A5%00%26%0C%0F%80t%FA%A0%20%A8%01f%228%FDU%7F%0D%CD%86B%EA%B6%23%A1%17%14mtl%20%13%07_%07%1F%86%13%0B%08%81%18%11%00%00%3B";
	var link = document.createElement("link");
	link.setAttribute("rel", "shortcut icon");
	link.setAttribute("href", imgFavIcon);
	document.getElementsByTagName("head")[0].appendChild(link);
}


//////////////////////////
// VB functions
//////////////////////////
var TimeValue = function(d) {
	return d.getHours() + ":" + d.getMinutes();
}

unsafeWindow.VB_AddDate = function(DaysFromNow, Today) {
	today = new Date(Today);
	var a = new Date(today.getTime() + DaysFromNow*24*60*60*1000);
	return a.getDate() + "/" + (a.getMonth()+1) + "/" + a.getFullYear() + " 00:00";
}

unsafeWindow.VB_AddHours = function(HoursFromNow, Today) {
	today = new Date(Today);
	var a = new Date(today.getTime() + HoursFromNow*60*60*1000);
	return a.getDate() + "/" + (a.getMonth()+1) + "/" + a.getFullYear() + " " + TimeValue(a);
}

unsafeWindow.VB_FindSecondsInterval= function(Date1) {
	return (new Date(Date1).getTime()-(new Date()).getTime())/1000;
}

//////////////////////////
// Main
//////////////////////////

hackGetters();

var reparray = new Array();
reparray["options\\((.*?)\\)"]="options[$1]";
reparray["innerText"]="textContent";
reparray["iframe.document"]="iframe.contentDocument";
reparray["window.Approve"]="document.Approve";
fixFunctions(reparray);

fixOnClicks();

rerunOnloadFunctions();

fixCosmetics();

if (window.location.pathname.match(/login\/login1\.aspx/i)) 
	window.addEventListener("load",handleLogin,true);

