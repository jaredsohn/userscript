// ==UserScript==
// @name           Because it's your userscripts.org
// @namespace      http://userscripts.org/users/31237
// @description    VERSION 2.8 (UNINSTALL EARLIER VERSION IF THIS IS YOUR FIRST 2.*) A powerful script and site manager for Userscripts.org.  Some interesting improvements, including moving the menu.
// @version        2.8 (20091128)
// @include        http://userscripts.org/*scripts
// @include        http://userscripts.org/tags/*
// @include        http://userscripts.org/*scripts?page=*
// @include        http://userscripts.org/*scripts/search?*
// @include        http://userscripts.org/*scripts?sort=*
// @exclude        http://userscripts.org/articles/*
// @exclude        http://userscripts.org/forums/*
// @exclude        http://userscripts.org/users/*
// ==/UserScript==
var v=2.8;
/*
VERSION 2.* OF THE SCRIPT IS A MAJOR UPGRADE.  You should uninstall
any previous version of this script not identified as version 2.0 or
above as you may experience conflicts between this and earlier versions.
*/

/*
This script's feeping creaturism is getting ridiculous....
*/

// Allow disabling script entirely
var biyus = GM_getValue("biyus", true);
biyus == true ? biyusToggle = "On" : biyusToggle = "Off";
GM_registerMenuCommand("Toggle BIYUS (" + biyusToggle + ")", toggleBIYUS);
function toggleBIYUS() {
	biyus == true ? biyus = false : biyus = true;
	GM_setValue("biyus", biyus);
	document.location.reload();
}

if (!biyus) { return; }

/*
IF YOU ARE UPGRADING FROM AN EARLIER VERSION OF THE SCRIPT
WHICH REQUIRED THAT YOU HARDCODE ADDITIONS TO THE LISTS OF
TERMS USED FOR REJECTION, SAVE THOSE ARRAYS ONE LAST TIME
AND INSERT HERE.  IN THIS AND FUTURE VERSIONS, ALL
MANAGEMENT OF REJECTION TERMS IS HANDLED IN THE BROWSER.
*/

// Items in these arrays should be in quotes, comma separated
// e.g. "abc","def"
// Rejected titles:
var rejects = new Array();

// Rejected descriptions:
var rejdescs = new Array();

// Rejected authors:
var rejauths = new Array();

// rejected tags
var rejtags = new Array();

// Rejected @includes
// 'noInclude' rejects scripts with no @include line, which are
// (almost?) always bogus.  (It's now handled outside this array.)
var includes = new Array();

/*
You are, of course, free to do so, but you should not need to
change anything beyond here*/

// This code is here to accommodate the hardcoded arrays which were
// required by older versions of the script - it will go away in
// the next major version
if (!GM_getValue('ignoreHardCodedTerms',false)) {
// Add rejected title terms to hardcoded list
	rejects=rejects.concat(GM_getValue('titleTerms',"").split(":"));
// save for future
	GM_setValue('titleTerms',rejects.join(":"));
// Add rejected authors to hardcoded list
	rejauths=rejauths.concat(GM_getValue('rejectByAuthor', "").split(":"));
// save for future
	GM_setValue('rejectByAuthor',rejauths.join(":"));
// Add rejected descriptive terms to hardcoded list
	rejdescs=rejdescs.concat(GM_getValue('descTerms',"").split(":"));
// save for future
	GM_setValue('descTerms',rejdescs.join(":"));
// Add rejected tags to hardcoded list
	rejtags=rejtags.concat(GM_getValue('rejtags',"").split(":"));
// save for future
	GM_setValue('rejtags',rejtags.join(":"));
// Add rejected includes to hardcoded list
	includes=includes.concat(GM_getValue('includes',"").split(":"));
// save for future
	GM_setValue('includes',includes.join(":"));
// and never retrieve hardcoded values again
	GM_setValue('ignoreHardCodedTerms',true);
} else {
	rejects=GM_getValue('titleTerms',"").split(":");
	rejauths=GM_getValue('rejectByAuthor', "").split(":");
	rejdescs=GM_getValue('descTerms',"").split(":");
	rejtags=GM_getValue('rejtags',"").split(":");
	includes=GM_getValue('includes',"").split(":");
}

// Set up the menu and configure form
var body = document.getElementsByTagName('body')[0];
var menuContainer = document.createElement('div');
menuContainer.id="menuContainer";
var bs = GM_getValue('bs',false);
var reloadAlert = document.createElement('div');
reloadAlert.innerHTML = "<div id='apply' style='cursor:pointer;background-color:white;color:red;'><br></div>";
var menu = document.createElement('form');
menu.innerHTML = "\
	<span class='ec' name='do'>[\u2193]<u>Discard options</u></span><br>\
	<span class='submenu' id='do' style='display:none'>\
	<input type='checkbox' name='pr'> Discard previously discarded scripts<br>\
	<input type='checkbox' name='tr'> Discard scripts by rejected terms in title<br>\
	<div style='background-color:lightgray;color:yellow;'><span id='ct' class='clear' clear='TitleRejects'>&nbsp;&nbsp;&nbsp;CLEAR scripts previously discarded by title</span></div>\
	<div style='background-color:lightgray;color:blue;'><span id='et' class='edit' edit='titleTerms'>&nbsp;&nbsp;&nbsp;EDIT title terms</span></div>\
	<input type='checkbox' name='dr'> Discard scripts by rejected terms in description<br>\
	<span id='tu'>&nbsp;&nbsp;<input type='checkbox' name='tu'> Discard non-8859-1 scripts<br></span>\
	<span id='nd'>&nbsp;&nbsp;<input type='checkbox' name='nd'> Discard scripts with no description<br></span>\
	<div style='background-color:lightgray;color:blue;'><span id='ed' class='edit' edit='descTerms'>&nbsp;&nbsp;&nbsp;EDIT description terms</span></div>\
	<div style='background-color:lightgray;color:yellow;display:none;'><span id='cd' class='clear' clear='DescriptionRejects'>&nbsp;&nbsp;&nbsp;CLEAR scripts previously discarded by description<br></span></div>\
	<input type='checkbox' name='ai'> Collect (and show) author information<br>\
	<span id='ar'>&nbsp;&nbsp;<input type='checkbox' name='ar'> Discard scripts by rejected authors<br></span>\
	<span id='ua'>&nbsp;&nbsp;<input type='checkbox' name='ua'> Discard scripts with unidentified author<br></span>\
	<div style='background-color:lightgray;color:yellow;display:none;'><span id='ca' class='clear' clear='AuthorRejects'>&nbsp;&nbsp;&nbsp;CLEAR scripts previously discarded by author</span></div>\
	<div style='background-color:lightgray;color:blue;'><span id='ea' class='edit' edit='rejectByAuthor'>&nbsp;&nbsp;&nbsp;EDIT author list</span></div>\
	<input type='checkbox' name='gr'> Discard scripts by tags<br>\
	<div style='background-color:lightgray;color:yellow;display:none;'><span id='cr' class='clear' clear='TagRejects'>&nbsp;&nbsp;&nbsp;CLEAR scripts previously discarded by tag</span></div>\
	<div style='background-color:lightgray;color:blue;'><span id='eg' class='edit' edit='rejtags'>&nbsp;&nbsp;&nbsp;EDIT list of rejected tags</span></div>\
	<input type='checkbox' name='ir'> Discard scripts by rejected URLs in @include<br>\
	<span id='ni'>&nbsp;&nbsp;<input type='checkbox' name='ni'> Discard scripts with no @include<br></span>\
	<div style='background-color:lightgray;color:yellow;display:none;'><span id='ci' class='clear' clear='IncludeRejects'>&nbsp;&nbsp;&nbsp;CLEAR scripts previously discarded by @include</span></div>\
	<div style='background-color:lightgray;color:blue;'><span id='ei' class='edit' edit='includes'>&nbsp;&nbsp;&nbsp;EDIT terms in @include</span></div>\
	<span id='gi'><input type='checkbox' name='gi'> Protect scripts which pass @include<br></span>\
	<div style='background-color:lightgray;color:yellow;display:none;'><span id='cg' class='clear' clear='goodIncludes'>&nbsp;&nbsp;&nbsp;CLEAR scripts previously protected</span></div>\
	<input type='checkbox' name='sr'> Show discard information at top of page<br>\
	</span>\
	<span class='ec' name='lo'>[\u2193]<u>Logging options</u></span><br>\
	<span class='submenu' id='lo' style='display:none'>\
	<input type='checkbox' name='lr'> Log discards in error console<br>\
	<input type='checkbox' name='db'> Log debugging messages in error console<br>\
	</span>\
	<span class='ec' name='so'>[\u2193]<u>Script by script options</u></span><br>\
	<span class='submenu' id='so' style='display:none'>\
	(seen when cursor over script)<br>\
	<input type='checkbox' name='is'> Install script<br>\
	<input type='checkbox' name='li'> Mark/unmark script installed<br>\	<input type='checkbox' name='ps'> Protect script<br>\
	<span id='tt'><input type='checkbox' name='tt'> Reject by term in title<br></span>\
	<span id='td'><input type='checkbox' name='td'> Reject by term in description<br></span>\
	<input type='checkbox' name='ts'> Reject script<br>\
	<span id='ta'><input type='checkbox' name='ta'> Reject author's scripts</span><br>\
	<span id='tg'><input type='checkbox' name='tg'> Reject similar scripts</span><br>\
	</span>\
	<span class='ec' name='oo'>[\u2193]<u>Script listing options</u></span><br>\
	<span class='submenu' id='oo' style='display:none'>\
	<input type='checkbox' name='Rating'> Show 'Rating' Column<br>\
	<input type='checkbox' name='Posts'> Show 'Posts' Column<br>\
	<input type='checkbox' name='Fans'> Show 'Fans' Column<br>\
	<input type='checkbox' name='Installs'> Show 'Installs' Column<br>\
	<input type='checkbox' name='Last&amp;nbsp;Updated'> Show 'Last Updated' Column<br>\
	<input type='checkbox' name='Votes'> <span title='In script listings in Groups'>Show 'Votes' Column</span><br>\
	</span>\
	<span class='ec' name='ao'>[\u2193]<u>Additional options</u></span><br>\
	<span class='submenu' id='ao' style='display:none'>\
	<span id='bs'><input type='checkbox' name='bs'> Apply BIYUS style<br></span>\
	<input type='checkbox' id='rd'> Reset BIYUS defaults<br>\
	<input type='checkbox' name='vc'> Alert when BIYUS updated\
	</span>\
";

// set up top menuContainer link
var menuSwitch = document.createElement('div');
menuSwitch.setAttribute('id','updateSwitch');
//menuSwitch.setAttribute('id','menuSwitch');
menuSwitch.innerHTML = "<span id='handleL' title='Grab and drag to move menu'>[]&nbsp;&nbsp;</span><span id='updateNotice'></span><span id='menuSwitch' title=\"Because It's Your Userscripts.org Script and Site Manager ("+v+")\"><u>Show BIYUS options</u></span><span id='handleR' title='Grab and drag to move menu'>&nbsp;&nbsp;[]</span>";
menuContainer.appendChild(reloadAlert);
menuContainer.appendChild(menuSwitch);
menu.setAttribute('id','menu');
menuContainer.appendChild(menu);
body.appendChild(menuContainer);
document.getElementById('menuSwitch').style.cursor="pointer";
document.getElementById('handleL').style.cursor="move";
document.getElementById('handleR').style.cursor="move";
document.getElementById('menuSwitch').addEventListener("click", configBIYUS, false);
document.getElementById("apply").addEventListener('click', function() { document.location.reload() }, false);
document.getElementById('handleL').addEventListener('mousedown',drag,true);
document.getElementById('handleR').addEventListener('mousedown',drag,true);

// Check for updates
var vc = GM_getValue("versionCheck",true);
if (vc) versionCheck("BIYUS","14648",v);
vc ? document.getElementById('updateNotice').style.display='inline' : document.getElementById('updateNotice').style.display='none';

menu.elements.namedItem("vc").checked = vc;
menu.elements.namedItem("vc").addEventListener('change', vcToggle, false);
menu.elements.namedItem("rd").addEventListener('change', resetDefaults, false);

function vcToggle() {
	vc == true ? vc = false : vc = true;
	vc ? document.getElementById('updateNotice').style.display='inline' : document.getElementById('updateNotice').style.display='none';
	GM_setValue('versionCheck',vc);
}

menu.elements.namedItem("bs").checked = bs;
document.getElementById("bs").addEventListener('click', bsOptions, false);
function bsOptions() {
	bs == true ? bs = false : bs = true;
	GM_setValue('bs',bs);
	BIYUSStyle();
}
BIYUSStyle();
clickEdits(); //set up edit links
clickClears(); // set up clear links
ecSubMenus(); // set up menus for expand/collapse

function BIYUSStyle() {
	var biyusStyle = "<!--biyus styling-->\n\
		tr, td { border:2px groove #FF8800; }\n\
		tr { background-color: #F0FFF0; }\n\		tr:hover { background-color: #F5DEB3 !important; }\n\
		";
	if (bs) {
		GM_addStyle(biyusStyle);
	} else {
		var styles = document.getElementsByTagName('style');
		for (i=0; i<styles.length; i++) {
			if (styles[i].innerHTML.match('biyus')) styles[i].parentNode.removeChild(styles[i]);
		}
	}
}
var menuX = GM_getValue('menuX','5');
var menuY = GM_getValue('menuY','175');
// set some styles
GM_addStyle("\
th a:visited { color:white; }\n\
#updateSwitch, #menuSwitch, #updateNotice { color:#333333;background-color:white; }\n\
#menuContainer { position:fixed; top:"+menuY+"px; left:"+menuX+"px; color:white; background-color:gray; }\n\
#menu { display:none; }\n\
div.options { background-color:lightblue;text-align:right; }\n\
tr:hover div.options { display:block !important; }\n\
textarea.edit { position:absolute; left:10%; width:80%; height:80px; }\n\
#rejects { cursor:default;text-align:right;color:white; };\n\
img { margin:2px; }\n\
");

var sp = GM_getValue("showPriors", false);
sp == true ? spToggle = "On" : spToggle = "Off";
GM_registerMenuCommand("Show Prior Rejects (" + spToggle + ")", showPriorReject);
function showPriorReject() {
	sp == true ? sp = false : sp = true;
	GM_setValue("showPriors", sp);
	document.location.reload();
}

GM_registerMenuCommand("Clear BIYUS arrays", clearArrays);

// The rejectPriorRejects() function rejects scripts based on the stored
// script numbers of scripts which have been previously rejected
// or, alternatively, shows prior rejects
var pr = GM_getValue("priorReject", true);
var prC=0; // keep track of toggles
if (!sp) {
	menu.elements.namedItem("pr").checked = pr;
	menu.elements.namedItem("pr").addEventListener('change', priorReject, false);
}
function priorReject() {
	pr == true ? pr = false : pr = true;
	prC == 0 ? prC = 1 : prC = 0;
	GM_setValue("priorReject", pr);
	promptReload(prC);
}

var tr = GM_getValue("titleReject", true);
var trC=0;
if (!sp) {
	menu.elements.namedItem("tr").checked = tr;
	menu.elements.namedItem("tr").addEventListener('change', titleReject, false);
}
function titleReject() {
	tr == true ? tr = false : tr = true;
	trC == 0 ? trC = 1 : trC = 0;
	GM_setValue("titleReject", tr);
// Remove title terms icons
	tt=!tt; byTitle(); // hack to remove icon w/o toggling tt
	tr == false ? document.getElementById('et').style.display='none' : document.getElementById('et').style.display='inline';
	tr == false ? document.getElementById('ct').parentNode.style.display='block' : document.getElementById('ct').parentNode.style.display='none';
	tr == false ? document.getElementById('tt').style.display='none' : document.getElementById('tt').style.display='inline';
	promptReload(trC);
}
tr == false ? document.getElementById('et').style.display='none' : document.getElementById('et').style.display='inline';
tr == false ? document.getElementById('ct').parentNode.style.display='block' : document.getElementById('ct').parentNode.style.display='none';
tr == false ? document.getElementById('tt').style.display='none' : document.getElementById('tt').style.display='inline';

var dr = GM_getValue("descriptReject", true);
var drC=0;
if (!sp) {
	menu.elements.namedItem("dr").checked = dr;
	menu.elements.namedItem("dr").addEventListener('change', descriptReject, false);
}
function descriptReject() {
	dr == true ? dr = false : dr = true;
	drC == 0 ? drC = 1 : drC = 0;
	GM_setValue("descriptReject", dr);
// Remove description terms icons
	td=!td; byDesc();
	dr == false ? document.getElementById('tu').style.display='none' : document.getElementById('tu').style.display='inline';
	dr == false ? document.getElementById('nd').style.display='none' : document.getElementById('nd').style.display='inline';
	dr == false ? document.getElementById('ed').style.display='none' : document.getElementById('ed').style.display='inline';
	dr == false ? document.getElementById('cd').parentNode.style.display='block' : document.getElementById('cd').parentNode.style.display='none';
	dr == false ? document.getElementById('td').style.display='none' : document.getElementById('td').style.display='inline';
	promptReload(drC);
}
dr == false ? document.getElementById('tu').style.display='none' : document.getElementById('tu').style.display='inline';
dr == false ? document.getElementById('nd').style.display='none' : document.getElementById('nd').style.display='inline';
dr == false ? document.getElementById('ed').style.display='none' : document.getElementById('ed').style.display='inline';
dr == false ? document.getElementById('td').style.display='none' : document.getElementById('td').style.display='inline';
var tu = GM_getValue("trashUni", false);
if (tu) rejdescs.push("not 8859-1");
var tuC=0;
if (!sp && dr) {
	menu.elements.namedItem("tu").checked = tu;
	menu.elements.namedItem("tu").addEventListener('change', trashUni, false);
}
function trashUni() {
	tu == true ? tu = false : tu = true;
	tuC == 0 ? tuC = 1 : tuC = 0;
	GM_setValue("trashUni", tu);
	promptReload(tuC);
}

var nd = GM_getValue("noDesc", false);
if (nd) rejdescs.push("no_description");
var ndC=0;
if (!sp && dr) {
	menu.elements.namedItem("nd").checked = nd;
	menu.elements.namedItem("nd").addEventListener('change', noDesc, false);
}
function noDesc() {
	nd == true ? nd = false : nd = true;
	ndC == 0 ? ndC = 1 : ndC = 0;
	GM_setValue("noDesc", nd);
	promptReload(ndC);
}

var ai = GM_getValue("authInsert", true);
aiC=0;
if (!sp) {
	menu.elements.namedItem("ai").checked = ai;
	menu.elements.namedItem("ai").addEventListener('change', authInsert, false);
}
function authInsert() {
	ai == true ? ai = false : ai = true;
	aiC == 0 ? aiC = 1 : aiC = 0;
	GM_setValue("authInsert", ai);
	ai == false ? document.getElementById('ar').style.display='none' : document.getElementById('ar').style.display='inline';
	ai == false ? document.getElementById('ua').style.display='none' : document.getElementById('ua').style.display='inline';
	ai == false ? document.getElementById('ta').style.display='none' : document.getElementById('ta').style.display='inline';
	ai == false ? document.getElementById('ea').style.display='none' : document.getElementById('ea').style.display='inline';
	var author = document.evaluate("//div[@class='author']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<author.snapshotLength; i++) {
		if (ai == false) {
			author.snapshotItem(i).style.display='none';
			ta = false;
			imgAuth();
		} else {
			ta = GM_getValue("trashAuth", true);
			author.snapshotItem(i).style.display='block';
			ta == false ? ta = false : ta = true;
			imgAuth();
		}
	promptReload(aiC);
	}
}
ai == false ? document.getElementById('ar').style.display='none' : document.getElementById('ar').style.display='inline';
ai == false ? document.getElementById('ua').style.display='none' : document.getElementById('ua').style.display='inline';
ai == false ? document.getElementById('ta').style.display='none' : document.getElementById('ta').style.display='inline';
ai == false ? document.getElementById('ea').style.display='none' : document.getElementById('ea').style.display='inline';

var ar = GM_getValue("authReject", true);
var arC=0;
if (!sp && ai) {
	menu.elements.namedItem("ar").checked = ar;
	menu.elements.namedItem("ar").addEventListener('change', authReject, false);
}
function authReject() {
	ar == true ? ar = false : ar = true;
	arC == 0 ? arC = 1 : arC = 0;
	GM_setValue("authReject", ar);
	ar == false ? document.getElementById('ea').style.display='none' : document.getElementById('ea').style.display='inline';
	ar == false ? document.getElementById('ca').parentNode.style.display='block' : document.getElementById('ca').parentNode.style.display='none';
	promptReload(arC);
}
ar == false ? document.getElementById('ea').style.display='none' : document.getElementById('ea').style.display='inline';

var ua = GM_getValue("unknownAuth", false);
var uaC=0;
if (ua) rejauths=rejauths.concat("#unidentified","deleted user");
if (!sp && ai) {
	menu.elements.namedItem("ua").checked = ua;
	menu.elements.namedItem("ua").addEventListener('change', unknownAuth, false);
}
function unknownAuth() {
	ua == true ? ua = false : ua = true;
	uaC == 0 ? uaC = 1 : uaC = 0;
	GM_setValue("unknownAuth", ua);
	promptReload(uaC);
}

var gr = GM_getValue("tagReject", true);
var grC=0;
if (!sp) {
	menu.elements.namedItem("gr").checked = gr;
	menu.elements.namedItem("gr").addEventListener('change', tagReject, false);
}
function tagReject() {
	gr == true ? gr = false : gr = true;
	grC == 0 ? grC = 1 : grC = 0;
	GM_setValue("tagReject", gr);
	gr == false ? document.getElementById('eg').style.display='none' : document.getElementById('eg').style.display='inline';
	gr == false ? document.getElementById('cr').parentNode.style.display='block' : document.getElementById('cr').parentNode.style.display='none';
	promptReload(grC);
}
gr == false ? document.getElementById('eg').style.display='none' : document.getElementById('eg').style.display='inline';

var ir = GM_getValue("inclReject", false);
var irC=0;
if (!sp) {
	menu.elements.namedItem("ir").checked = ir;
	menu.elements.namedItem("ir").addEventListener('change', inclReject, false);
}
function inclReject() {
	ir == true ? ir = false : ir = true;
	irC == 0 ? irC = 1 : irC = 0;
	GM_setValue("inclReject", ir);
	ir == false ? document.getElementById('ei').style.display='none' : document.getElementById('ei').style.display='inline';
	ir == false ? document.getElementById('ci').parentNode.style.display='block' : document.getElementById('ci').parentNode.style.display='none';
	ir == false ? document.getElementById('ni').style.display='none' : document.getElementById('ni').style.display='inline';
	ir == false ? document.getElementById('gi').style.display='none' : document.getElementById('gi').style.display='inline';
	promptReload(irC);
}
ir == false ? document.getElementById('ei').style.display='none' : document.getElementById('ei').style.display='inline';
ir == false ? document.getElementById('ni').style.display='none' : document.getElementById('ni').style.display='inline';
ir == false ? document.getElementById('gi').style.display='none' : document.getElementById('gi').style.display='inline';

var ni = GM_getValue("noInc", false);
if (ni) includes=includes.concat("noInclude");
var niC=0;
if (!sp && ir) {
	menu.elements.namedItem("ni").checked = ni;
	menu.elements.namedItem("ni").addEventListener('change', noInc, false);
}
function noInc() {
	ni == true ? ni = false : ni = true;
	niC == 0 ? niC = 1 : niC = 0;
	GM_setValue("noInc", ni);
	promptReload(niC);
}

var gi = GM_getValue("goodIncs",true);
var giC=0;
if (!sp && ir) {
	menu.elements.namedItem("gi").checked = gi;
	menu.elements.namedItem("gi").addEventListener('change', goodIncs, false);
}
function goodIncs() {
	gi == true ? gi = false : gi = true;
	giC == 0 ? giC = 1 : giC = 0;
	GM_setValue("goodIncs", gi);
	gi == false ? document.getElementById('cg').parentNode.style.display='block' : document.getElementById('cg').parentNode.style.display='none';
	promptReload(giC);
}

// Next few determine whether icons for various functions appear
var ta = GM_getValue("trashAuth", true);
if (!sp) {
	menu.elements.namedItem("ta").checked = ta;
	menu.elements.namedItem("ta").addEventListener('change', trashAuth, false);
}
function trashAuth() {
	ta == true ? ta = false : ta = true;
	GM_setValue("trashAuth", ta);
	imgAuth();
}
function imgAuth() {
//	remove delete author imgs + options div if empty
	var img_authors = document.evaluate("//img[@class='img_author']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<img_authors.snapshotLength; i++) {
		var img = img_authors.snapshotItem(i);
		ta == true ? img.style.display='inline' : img.style.display='none';
	}
}

var ts = GM_getValue("trashScr", true);
if (!sp) {
	menu.elements.namedItem("ts").checked = ts;
	menu.elements.namedItem("ts").addEventListener('change', trashScr, false);
}
function trashScr() {
	ts == true ? ts = false : ts = true;
	GM_setValue("trashScr", ts);
//	remove delete script imgs + options div if empty
	var img_scripts = document.evaluate("//img[@class='img_script']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<img_scripts.snapshotLength; i++) {
		var img = img_scripts.snapshotItem(i);
		ts == true ? img.style.display='inline' : img.style.display='none';
	}
}

var is = GM_getValue("installScr", true);
if (!sp) {
	menu.elements.namedItem("is").checked = is;
	menu.elements.namedItem("is").addEventListener('change', installScr, false);
}
function installScr() {
	is == true ? is = false : is = true;
	GM_setValue("installScr", is);
//	remove install script imgs + options div if empty
	var img_install = document.evaluate("//img[@class='img_install']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<img_install.snapshotLength; i++) {
		var img = img_install.snapshotItem(i);
		is == true ? img.style.display='inline' : img.style.display='none';
	}
}

var li = GM_getValue("logInstall", false);
var liC=0;
if (!sp) {
	menu.elements.namedItem("li").checked = li;
	menu.elements.namedItem("li").addEventListener('change', logInstall, false);
}
function logInstall() {
	li == true ? li = false : li = true;
	liC == 0 ? liC = 1 : liC = 0;
	GM_setValue("logInstall", li);
//	remove install script imgs + options div if empty
	var img_mark = document.evaluate("//img[@class='img_mark']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<img_mark.snapshotLength; i++) {
		var img = img_mark.snapshotItem(i);
		li == true ? img.style.display='inline' : img.style.display='none';
	}
}

var ps = GM_getValue("saveScr", true);
if (!sp) {
	menu.elements.namedItem("ps").checked = ps;
	menu.elements.namedItem("ps").addEventListener('change', saveScr, false);
}
function saveScr() {
	ps == true ? ps = false : ps = true;
	GM_setValue("saveScr", ps);
//	remove protect script imgs + options div if empty
	var img_save = document.evaluate("//img[@class='img_save']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<img_save.snapshotLength; i++) {
		var img = img_save.snapshotItem(i);
		ps == true ? img.style.display='inline' : img.style.display='none';
	}
}

var tt = GM_getValue("byTitle", false);
if (!sp) {
	menu.elements.namedItem("tt").checked = tt;
	menu.elements.namedItem("tt").addEventListener('change', byTitle, false);
}
function byTitle() {
		tt == true ? tt = false : tt = true;
		GM_setValue("byTitle", tt);
//	remove title terms imgs + options div if empty
	var img_tt = document.evaluate("//img[@class='img_tt']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<img_tt.snapshotLength; i++) {
		var img = img_tt.snapshotItem(i);
		tt == true ? img.style.display='inline' : img.style.display='none';
		tr == false ? img.style.display='none' : null; // false tr overrides tt
	}
}

var td = GM_getValue("byDesc", false);
if (!sp) {
	menu.elements.namedItem("td").checked = td;
	menu.elements.namedItem("td").addEventListener('change', byDesc, false);
}
function byDesc() {
	td == true ? td = false : td = true;
	GM_setValue("byDesc", td);
//	remove description terms imgs + options div if empty
	var img_td = document.evaluate("//img[@class='img_td']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<img_td.snapshotLength; i++) {
		var img = img_td.snapshotItem(i);
		td == true ? img.style.display='inline' : img.style.display='none';
		dr == false ? img.style.display='none' : null; // false dr overrides td
	}
}

var tg = GM_getValue("byTag", true);
if (!sp) {
	menu.elements.namedItem("tg").checked = tg;
	menu.elements.namedItem("tg").addEventListener('change', byTag, false);
}
function byTag() {
	tg == true ? tg = false : tg = true;
	GM_setValue("byTag", tg);
//	remove description terms imgs + options div if empty
	var img_tg = document.evaluate("//img[@class='img_tg']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<img_tg.snapshotLength; i++) {
		var img = img_tg.snapshotItem(i);
		tg == true ? img.style.display='inline' : img.style.display='none';
	}
}

var sr = GM_getValue("showReject", true);
if (!sp) {
	menu.elements.namedItem("sr").checked = sr;
	menu.elements.namedItem("sr").addEventListener('change', showReject, false);
}
function showReject() {
	sr == 1 ? sr = 0 : sr = 1;
	GM_setValue("showReject", sr);
	var rejects = document.getElementById('rejects');
	sr == 1 ? rejects.style.visibility='visible' : rejects.style.visibility='hidden';
}

var lr = GM_getValue("logReject", false);
var lrC=0;
if (!sp) {
	menu.elements.namedItem("lr").checked = lr;
	menu.elements.namedItem("lr").addEventListener('change', logReject, false);
}
function logReject() {
	lr == true ? lr = false : lr = true;
	lrC == 0 ? lrC = 1 : lrC = 0;
	GM_setValue("logReject", lr);
	promptReload(lrC);
}

var db = GM_getValue("logDebug", false);
var dbC=0;
menu.elements.namedItem("db").checked = db;
menu.elements.namedItem("db").addEventListener('change', logDebug, false);
function logDebug() {
	db == true ? db = false : db = true;
	dbC == 0 ? dbC = 1 : dbC = 0;
	GM_setValue("logDebug", db);
	promptReload(dbC);
}

// The columns of data on the scripts listing pages
var sh1 = GM_getValue("Rating", true);
menu.elements.namedItem("Rating").checked = sh1;
menu.elements.namedItem("Rating").addEventListener('change', showhide, false);
var sh2 = GM_getValue("Posts", true);
menu.elements.namedItem("Posts").checked = sh2;
menu.elements.namedItem("Posts").addEventListener('change', showhide, false);
var sh3 = GM_getValue("Fans", true);
menu.elements.namedItem("Fans").checked = sh3;
menu.elements.namedItem("Fans").addEventListener('change', showhide, false);
var sh4 = GM_getValue("Installs", true);
menu.elements.namedItem("Installs").checked = sh4;
menu.elements.namedItem("Installs").addEventListener('change', showhide, false);
var sh5 = GM_getValue("Last&nbsp;Updated", true);
menu.elements.namedItem("Last&nbsp;Updated").checked = sh5;
menu.elements.namedItem("Last&nbsp;Updated").addEventListener('change', showhide, false);
// The 'Votes' column appears in the group script pages
var sh6 = GM_getValue("Votes", true);
menu.elements.namedItem("Votes").checked = sh6;
menu.elements.namedItem("Votes").addEventListener('change', showhide, false);

function clickEdits() {
	var ce = document.evaluate("//span[@class='edit']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i=0; i<ce.snapshotLength; i++) {
		ce.snapshotItem(i).style.cursor='pointer';
		ce.snapshotItem(i).addEventListener('click', editTerms, false);
	}
}

function clickClears() {
	var cc = document.evaluate("//span[@class='clear']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i=0; i<cc.snapshotLength; i++) {
		cc.snapshotItem(i).style.cursor='pointer';
		cc.snapshotItem(i).addEventListener('click', clearDiscards, false);
	}
}

function ecSubMenus() {
	var ec = document.evaluate("//span[@class='ec']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i=0; i<ec.snapshotLength; i++) {
		ec.snapshotItem(i).style.cursor='pointer';
		ec.snapshotItem(i).addEventListener('click', exco, false);
	}
}

function exco() {
		var sm = document.getElementById(this.getAttribute('name'));
		sm.style.display == 'none' ? sm.style.display = 'inline' : sm.style.display = 'none';
		this.innerHTML.match('[\u2193]') ? this.innerHTML=this.innerHTML.replace('[\u2193]','[\u2191]') : this.innerHTML=this.innerHTML.replace('[\u2191]','[\u2193]');
}

// End menu and form set up
// rejectedScripts.length is count of rejected scripts
var rejectedScripts = new Array();
// total scripts reviewed
var allScripts = document.evaluate("//tr/td[@class='script-meat']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var n = allScripts.snapshotLength;
for (var i=0; i<n; i++) { allScripts.snapshotItem(i).parentNode.setAttribute('num',i+1); }
var script_no;
// Take snapshots before hiding columns
var headers = document.evaluate("//tr/th", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var rows = document.evaluate("id('content')//tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var cells = document.evaluate("id('content')//td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

// The first few reject functions are in order from least overhead to
// most.  The functions are executed by array so that an exception
// thrown by one will not prevent the next from running.
functions = new Array(showRejectInfo, createOptionsBar, hideColumns, rejectTrashArray, rejectPriorRejects, rejectTitles, rejectDescriptions, rejectTags, rejectIncludes, insertAuthors, trashScripts, cleanArrays);
for (f=0; f<functions.length; f++) {
	try { functions[f](); }
	catch(e) { debug("Trying " + functions[f] + " caused error: " + e); }
}

function createOptionsBar() {
	if (sp) { return; }
	var script = document.evaluate("//td[@class='script-meat']//a[@class='title']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<script.snapshotLength; i++) {
		var a=script.snapshotItem(i).parentNode;
		var s=script.snapshotItem(i).href;
		var d=document.createElement("div");
		script_no=s.match(/\/(\d+)/)[1];
		d.style.display='none'; // hide until hovered over
		if (script_no) {
			d.setAttribute("class", "options");
			d.setAttribute("id", "options-"+script_no);
			a.appendChild(d);
			// add option to protect script
			addProtect(script_no);
			// add option to install script
			installScripts(script_no);
			// add option to mark script installed
			markInstalled(script_no);
			// add option to reject scripts by term in title
			addRejectTitle(script_no);
			// ... by term in description
			addRejectDesc(script_no);
			// add option to discard similar scripts (i.e. by tag)
			addRejectTag(script_no);
			// add option to discard script
			trashScripts(script_no);
			// The author discard function is handled separately
		}
	}
}

function hideColumns() {
	if (!sh1) hide('Rating');
	if (!sh2) hide('Posts');
	if (!sh3) hide('Fans');
	if (!sh4) hide('Installs');
	if (!sh5) hide('Last&nbsp;Updated');
	if (!sh6) hide('Votes');
}

function rejectTrashArray() {
	if (sp||pr) { return; } // if 'pr' these get rejected there
	var rows = document.evaluate("//tr/td[@class='script-meat']/a[@class='title']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i<rows.snapshotLength; i++) {
		var trow = rows.snapshotItem(i);
		script_no = trow.href.match(/(\d+)/)[1];
		if (inArray(script_no,GM_getValue('protectedScripts',""))) continue;
		var trashed = GM_getValue("trashArray","").split(":");
		for (var j = 0; j<trashed.length; j++) {
			if (trashed[j]==script_no) {
				discard(script_no);
				log('Rejected Script #' + script_no + ' from trashArray');
				break;
			}
		}
	}
}

function rejectPriorRejects() {
	var links = document.evaluate("//tr/td[@class='script-meat']/a[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (!sp && !pr) { return; }
	var canData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFuSURBVBgZBcG/S1RxAADwz3teyp3XFUUWNVSoRGQR3dLQIESBbUZt9gekm9XW2lRbNDv0gxbJWoJoCcT+ABskTgcDDwLpOD19d+/73rfPJ4kAANaejUx03t5eBZIIgKe34r3JB7OTVVvZuzf9lderiKIoip7MLba+xY24H4v4N36PC635uSgFIJ2/Pz7ppH19w66aHk/nqQCfk8LU1BWJAyMyo3Y1bV2nwpeh8nxxthg+Vm+ZUFVKHDjhK1UqlJeK52E61LOkasOhRDAic8EWKp/qxaupmdOO6Fi3bVyiEAQdA6Th7tjMGYcyDTcdtWlUoqYtypHmjy/atadrX6JpU5QaMhDlSPNTFX9kMj0H6rr+gYFCjnSw3XNZ2y9dPfT1lUq5UkA6+Phb3TU3NJArHFeKhtTkSBc+rC//0NBQVbNmwphzGu5oCztUGDz8udydbSrlVmI9eSkIirzYKZokESw+yl+EdtgL75eWAID/yIWfXhcZhKEAAAAASUVORK5CYII=";
	var rejectArrays = new Array('TitleRejects','DescriptionRejects','AuthorRejects','TagRejects','IncludeRejects','trashArray');
	for (var a=0; a<rejectArrays.length; a++) {
	var r = rejectArrays[a];
	var priorRejects = GM_getValue(r, "");
	debug("Reading " + r + " array");
	if (priorRejects) {
		var priors = priorRejects.split(":");
		debug(priors.length + " scripts have been previously discardd in " + r + "!");
		for (var i = 0; i<links.snapshotLength; i++) {
			var link = links.snapshotItem(i);
			debug("Processing " + link);
			var script_no = link.href.match(/(\d+)/)[1];
			if (inArray(script_no,GM_getValue('protectedScripts',""))) continue;
			for (var j = 0; j<priors.length; j++) {
				if (script_no == priors[j]) {
					debug("Script " + priors[j] + " on prior reject list");
					if (sp) {
						var can = document.createElement('img');
						can.title = "Click to untrash script #" + script_no + " from " + r + " array!";
						can.src = canData;
						can.setAttribute('id', script_no);
						can.setAttribute('class', r);
						can.addEventListener("click", untrash, false);
						link.parentNode.appendChild(can);
						break;
					} else {
						if (!pr) { return; }
						discard(script_no);
						log('Rejected prior reject, script #' + script_no + ' ('+r+')');
						break;
					}
				}
			}
		}
	}
	} // end for loop
}

function rejectTitles() {
	if (sp||!tr) { return; }
	var rows = document.evaluate("//tr/td[@class='script-meat']/a[@class='title']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i<rows.snapshotLength; i++) {
		var trow = rows.snapshotItem(i);
		script_no = trow.href.match(/(\d+)/)[1];
		if (inArray(script_no,GM_getValue('protectedScripts',""))) continue;
		var title = trow.textContent.toString();
		for (var j = 0; j<rejects.length; j++) {
			test = new RegExp(rejects[j],"gi");
			if (rejects[j] && title.match(test)) {
				discard(script_no);
				log('Rejected Script #' + script_no + ', Titled: "' + title + '"');
				var TitleRejects = GM_getValue('TitleRejects', "").split(":");
				TitleRejects.push(script_no);
				GM_setValue('TitleRejects', TitleRejects.join(":"));
				break;
			}
		}
	}
}

function rejectDescriptions() {
	if (sp||!dr) { return; }
	var rows = document.evaluate("//tr/td[@class='script-meat']/a[@class='title']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var descs = document.evaluate("//tr/td[@class='script-meat']/p[@class='desc']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i<descs.snapshotLength; i++) {
		script_no = rows.snapshotItem(i).href.match(/(\d+)/)[1];
		if (inArray(script_no,GM_getValue('protectedScripts',""))) continue;
		var desc = descs.snapshotItem(i);
		var details = desc.textContent.toString();
		details = rejectByUnicode(details);
		details ? details = details : details = "no_description";
		for (var j = 0; j<rejdescs.length; j++) {
			test = new RegExp(rejdescs[j],"gi");
			if (rejdescs[j] && details.match(test)) {
				discard(script_no);
				log('Rejected Script #' + script_no + ', Described: "' + details + '"');
				var DescriptionRejects = GM_getValue('DescriptionRejects', "").split(":");
				DescriptionRejects.push(script_no);
				GM_setValue('DescriptionRejects', DescriptionRejects.join(":"));
				break;
			}
		}
	}
}

function rejectByUnicode(str) {
	if (!tu) { return str; }
// Reject if ANY character in description is outside the
// 8859-1 charset
	if (str.match(/[^\u0000-\u0255]/)) { str = "not 8859-1"; }
	return str;
}

function insertAuthors() {
	if (!ai) { return; }
	var script = document.evaluate("//td[@class='script-meat']//a[@class='title']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	debug("There are " + rejauths.length + " authors in the reject list");
	for (var i=0; i<script.snapshotLength; i++) {
		var a=script.snapshotItem(i).parentNode;
		var s=script.snapshotItem(i).href;
		insertAuthorInfo(a,s);
	}
}

// This function uses asynchronous HTTP request
function insertAuthorInfo(a,s) {
	var request = new XMLHttpRequest();
	request.open("GET", s, true);
	request.send(null);
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if (request.status == 200) {
				script_no = s.match(/\/(\d+)/)[1];
				var aName = request.responseText.match(/<.+?author.+?>.+?(<a.+?>(.+?)<\/a>)/m);
				if (!aName) { aName = new Array("","unkn0wn",""); }
				author = aName[2];
				rejectAuthor(author,script_no);
				var authText = document.createElement('div');
				authText.setAttribute("class", "author");
				authText.setAttribute("id", aName[2]+"_"+script_no);
				authText.setAttribute('style', 'background-color:lightgray;color:white;');
				authText.innerHTML = "Scriptwright: " + aName[1];
				a.appendChild(authText);
//				if (ta && !sp) {
					delauthor = document.createElement('img');
					delauthor.title = "Discard all scripts by " + aName[2];
					delauthor.src ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKRSURBVDjLpZNrSNNRGIeVuaSLrW2NCozlSsrCvqifKrG1vyznRDLQMi9TsamsUCzvSWJKC0Ms0/I2hratmVbi3bLIysRZlgh9qFGuCKOF5KaonV9n+yAGokIHHs7hhd/zvofDcQHg8j8sW0wN2FpQJuVNl8u2QC3loEDMtUX7CYrXJDjrx8u6FcYlNVE83KbciOCiNISD9MDNRHaQf3lVQZWMgwYaVNNQqcwBF1dCBbhwlIczfpypVQWlgZvQVZUPS6cag7XpOBckQIZkB9IYEZIPcee02XL3FQU1scKfM98/YOpFFb72XseooRDm9quwmk3QKXdPvdOkrltRUBG9f8A6dBeTw0bY3+ooeufZatLhToLv8IpX2CZrYnsfTtXqVP6YHa7FzFirE/ubJrRk+sM3UHlfwNSsX1YgCNG586WNKZ7SPox9mYYhLwz6PLkTx/n5+G94Bj8BT1x3ni+u3vCPgH/c4OoRbIgXhg5g3GJHowXIGANSXgOJT4G4DkBTXolnMT7oFbPxgNlo7WDYuYuCAxH14ZKTahgHF1A9CqheESj7CZK6CWIfElwrqsRI5hHMtJeBjHfBps/AUJrvn55jbiqnYCR/38JkWzZu1rchvpN2pR0VjwhimglONREYw/fATsOokANZXKDECz/UQeiWsD45BaMFPsTaU4So5AYU99oQ3Qyc1hNEagkiagn66NjE1IKl61fhdlp3I07Be60qx5TjPa9QlMwHxPdDQUdPWELrCSGm6xIBGpq96AIr5bOShW6GZVl8BbM+xeNSbjF/V3hbtTBIMyFi7tlEwc1zIolxLjM0bv5l4l58y/LCZA4bH5Nc8VjuttDFsHLX/G0HIndm045mx9h0n3CEHfW/dpehdpL0UXsAAAAASUVORK5CYII=';
					delauthor.setAttribute("style","margin:2px;");
					delauthor.setAttribute('class','img_author');
					delauthor.setAttribute('id', aName[2]);
					delauthor.addEventListener("click", trashAuthor, false);
					document.getElementById("options-"+script_no).appendChild(delauthor);
					ta=!ta; trashAuth();
//				}
			}
		}
	}
}

function rejectAuthor(author,script_no) {
	if (sp||!ai||!ar) { return; }
	if (inArray(script_no,GM_getValue('protectedScripts',""))) return;
	debug("Script #" + script_no + " was written by " + author);
	var allAuths=rejauths.concat(author);
	var aa = allAuths.length;
	allAuths = uniqArray(allAuths);
	var ra = allAuths.length;
	if (aa > ra) {  // a common member was found
		discard(script_no);
		log('Rejected script #' + script_no + ' by ' + author);
		var AuthorRejects = GM_getValue('AuthorRejects', "").split(":");
		AuthorRejects.push(script_no);
		GM_setValue('AuthorRejects', AuthorRejects.join(":"));
	}
}

/*
This is a last resort to catch those scripts which are ill-titled
and ill-described and whose authors contribute non-rejectable
scripts in addition to their rejectable ones.

It saves the # of any script which passes the @include test,
and gives it a free pass in future; that saves a good bit of
overhead, but allows a script to be smuggled through (not a great
danger)!
*/

function rejectIncludes() {
	if (!ir||sp) { return; }
	var script = document.evaluate("//td[@class='script-meat']//a[@class='title']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var include;
	goodIncArray = cleanArray('goodIncludes');
	debug("Checking @include in " + script.snapshotLength + " scripts");
	for (var i=0; i<script.snapshotLength; i++) {
		br = 0; // loop breaker
		var s = script.snapshotItem(i).href.replace(/show/, "review");
		script_no = s.match(/(\d+)/)[1];
		if (inArray(script_no,GM_getValue('protectedScripts',""))) continue;
		if (gi && inArray(script_no,goodIncArray)) { debug("Gave script #" + script_no + " @include pass"); continue; }
		s += "?format=txt";
		var sc = script.snapshotItem(i);
		rejectInclude(script_no,s,sc);
	}
}

function rejectInclude(script_no,s,sc) {
	var request = new XMLHttpRequest();
	request.open("GET", s, true);
	request.send(null);
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if (request.status == 200) {
				debug("Getting info from " + s);
				include = request.responseText.match(/\@include\s+\S+/g);
				debug("include = " + include);
				// If include has no properties, the script is bogus so we'll get rid of it!
				if (!include) { include = new Array (" noInclude "); }
				debug("Script #" + script_no + " includes " + include[0]);
				for (var j=0; j<include.length; j++) {
					for (var k=0; k<includes.length; k++) {
						if (includes[k] && include[j].split(/\s+/)[1].match(includes[k])) {
							discard(script_no);
							log("Rejected Script #" + script_no + " (of " + m + " rejected)\nas it @includes " + include[j].split(/\s+/)[1] + " which matches " + includes[k]);
							var IncludeRejects = GM_getValue('IncludeRejects', "").split(":");
							IncludeRejects.push(script_no);
							GM_setValue('IncludeRejects', IncludeRejects.join(":"));
							br++;
							break;
						}
					}
					if (br) { break; }
					var goodIncludes = GM_getValue('goodIncludes', "").split(":");
					goodIncludes.push(script_no);
					GM_setValue('goodIncludes', goodIncludes.join(":"));
					debug("Added script#" + script_no + " to goodIncludes array");
				}
			}
		}
	}
}

function rejectTags() {
	if (!gr||sp) { return; }
	var script = document.evaluate("//td[@class='script-meat']//a[@class='title']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var include;
	debug("Checking tags in " + script.snapshotLength + " scripts");
	for (var i=0; i<script.snapshotLength; i++) {
		var s = script.snapshotItem(i).href;
		script_no = s.match(/(\d+)/)[1];
		if (inArray(script_no,GM_getValue('protectedScripts',""))) continue;
		rejectByTag(script_no,s);
	}
}

function rejectByTag(script_no,s) {
	var tags = new Array();
	var request = new XMLHttpRequest();
	request.open("GET", s, true);
	request.send(null);
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if (request.status == 200) {
				debug("Getting info from " + s);
				tags = request.responseText.match(/\/tags\/\w+/g);
				if (tags) {
					for (var i=0; i<tags.length; i++) { tags[i]=tags[i].replace("/tags/","") };
					tags=uniqArray(tags); // make sure there are no duplicates
					// compare tags array with rejtags array
					var allTags = rejtags.concat(tags);
					debug("allTags = " + allTags);
					var t = allTags.length;
					var g = uniqArray(allTags);
					if (t > g.length) { // common tags were found
						discard(script_no);
						log("Rejected script #"+script_no+" with tags "+tags);
						var TagRejects = GM_getValue('TagRejects', "").split(":");
						TagRejects.push(script_no);
						GM_setValue('TagRejects', TagRejects.join(":"));
					}
				}
			}
		}
	}
}

function markInstalled(script_no) {
//	if (!is||sp) { return; }
	if (!li) return;
	var mkscript = document.createElement('img');
	if (inArray(script_no,GM_getValue('installedScripts',"14648"))) {
		mkscript.title = "UNmark this script (#" + script_no + ") installed";
	} else {
		mkscript.title = "Mark this script (#" + script_no + ") installed";
	}
	mkscript.src ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMBSURBVDjLTdFNaJt1AMfx7/OePGnypE27LbNrcbpZKagTqQ6ZjsmGOETxoKiXwURlgkz04sGDeFGYMhEv7ii7DAU9dXOgMCcOy8bYRLtRN03b2JekadO89Pm/eulqv/C7fi4/x1oLwJFvp8eAkzuLmb0daehIgzSGrjIrwCpQAzTQAOrA18APPusZpR59cFvP3nefHGBzbWGSjjBJY00PCgmrqebvWovxv9oHgeObga2F0AFgelkTOA6+A54PUeAyFLl4rkvgwZ7BLNuTXN+p36qfbgBjhQujh6KfWLpu8YXBaEOqDVZLIIdz3wkIt3BX4vH+6QqfvDrMr7eCAR+gfvWAN5obHS31lvGCATJSYaVCiy7dxiQrpRexth9PgAEc3eTSrQZXKitVF8Bqs2Mk/nNnkB3GtP/AcXMYrVhbvsl8zyus5J+hnUJbGrAw30z5/PxUUwtxxK9d3h9abV7L94144GG6c+CnNP45T630Fq3keZDgYfGti7GgA40S6u7v33l8yTda77HKvBHld2FVF7wySIk2Hn63QjJzEtQaxsmjyi9g7RAqTdFSaQDfKvNFpvRIf7c+iVGGML4XjE9p+wHi+nW0FDSrV2ne8yFuVERqTavdUUATwDVKn6nevnbquysxNtzNwtQ5VNpGri0jOjUW9DD1sXOIHS+RzcbUWykqFfNnP3jaArjlJy6dOPbjsc/GZw+S7Hod0hadhd9ZrFzm396jNO//GJUZBgux77LY6KJFWr1zv7/v+Ol+4KOxkSFmfn6bMOpjtlumNvIVYTZP4FiC0CH0oBDD1HQHJcT8BqCFeAo4vFoZZ3nLFBfSo9xQj5HO1hFqEaUNxlr6koQ3D21jrt5BC7H4PyDlw8/tfyD73uFeLM/yUHE3ANqC1BahAAtfnq0SB7Da6qClrG8Gbs/VVjgzkVDsyVIszFHMRSS5iHwcEoUuke/y8r6tRD4sLq2ipZzZAIxS31ycmBy8ODE5DJTW17u+JBMGQSYTUMhlKRZirt2Yvgn8cgf4D/BEgoyc1axMAAAAAElFTkSuQmCC';
	mkscript.setAttribute('class','img_mark');
	mkscript.setAttribute("style","margin:2px");
	mkscript.setAttribute('id', 'mark-'+script_no);
//	document.getElementById("options-"+script_no).appendChild(mkscript);
	document.getElementById("options-"+script_no).insertBefore(mkscript,document.getElementById('protect-'+script_no));
	mkscript.addEventListener('click',logScriptInstall,false);
	// We're calling the toggle function, so we reverse value first (yes, hackish)
	is=!is; installScr();
}

function installScripts(script_no) {
//	if (!is||sp) { return; }
	if (li && (inArray(script_no,GM_getValue('installedScripts',"14648")))) return;
	var a = document.createElement('a');
	var inscript = document.createElement('img');
	inscript.title = "Install this script (#" + script_no + ")";
	inscript.src ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALvSURBVBgZBcFNaNUFAADw3//jbe/t6d6cc2/kUpeXsEgUsSSiKIzAQxDdvCgdulgagmBXLx4K7BgRWamnOgSDIj3EusRangwlbVvOyba25tvH23v/z36/oCxLcOr7uaO48sxA9Vg7LbTTQloUtrKihXUsI8cqVvAtfo4Biix78eDItmPnX90FADaTotFOisZqJx9NUta7udnlDT/+vXkc52KAIsua/T0BmHuSqwSBOCCK6a2E9vSGojBUiTg0WvNUoz74xeTjT0OAPE376zFZwXoSaKU86dLq0OqwssXSRg4uXn/o2Fjd80OVXTFAnqaD23tCm102O7kwDMSIIsKISCAKKBDka36bXnX7YetxDJAnSbNRi7S2Mu1uKQxLUUiYB6KQSCmKUEYW17o+u/lgDadigCxJ9jb7K1qdUgYlUR4IS+RsPfhFliaeGzkhr+SyJBv74aOX/wsB8qS7d6TRazMpBSFREAjWH0lmflV21lR7e/T19fl3acmbAw+9MzT7CQRlWXrr0k+1OArb3104bvKfVKEE6fSEffv2mZ+f12w2hWFodnbW6Oio8fFxRVHUY8i6ya56vSoMKKAkCAi279bpdCwvL5uYmFCr1Rw4cEC73Vav1786c+ZMO4Q86fbFCnFIFAYEoY17tzSiTcPDw+7fv+/1kxe9e/q8R/PzRkZG7N+///Tly5fL+JVz14dw6eizeyyslWYXc/UqnVZLFEWazabh4WG1Kv19lGVgfX3d3Nyc6elpcZ4kb+DEH3dnrG7FNrqlNC8V2UEjG/MGBxeMjY2ZHP/aVFDa8/RuKysr7ty58yUuxHmaHn77tRdqH598CQDkJde+mcKAhYUFRw4f1Ol0zMzMaDQa8F6tVns/ztN0ZmG55drNuwa21Qz0Vw3UezXqvQYGh1y9etUHH5419fukxcVFy2XTrVufl1mW3bxx40YeHDp5ZQjnsBc7sRM7sAONak+lUq1WHKrds7S05M/yyF84efva2Sn4HxcNUm7wsX3qAAAAAElFTkSuQmCC';
	inscript.setAttribute('class','img_install');
	inscript.setAttribute("style","margin:2px");
	inscript.setAttribute('id', 'install-'+script_no);
	a.href="/scripts/source/"+script_no+".user.js";
	a.appendChild(inscript);
//	document.getElementById("options-"+script_no).appendChild(a);
	document.getElementById("options-"+script_no).insertBefore(a,document.getElementById('protect-'+script_no));
	// We're calling the toggle function, so we reverse value first (yes, hackish)
	is=!is; installScr();
}

// Apparently there's no way to capture a successful install :(
// so this logs an install only when user so 'marks' a script
function logScriptInstall() {
//	if (!li) return;
	script_no = this.getAttribute('id').match(/\d+/)[0];
	var mkimg = document.getElementById('mark-'+script_no);
	mkimg.parentNode.removeChild(mkimg);
	if (inArray(script_no,GM_getValue('installedScripts',""))) {
		// remove script_no from array
		var array = GM_getValue('installedScripts',"").split(":");
		for (var j=0; j<array.length; j++) {
			if (array[j] == script_no) {
				array.splice(j,1);
				break;
			}
		}
		GM_setValue('installedScripts',array.join(":"));
		installScripts(script_no);
//		promptReload(1);
	} else {
		var inimg = document.getElementById('install-'+script_no);
		var installedScripts = GM_getValue('installedScripts',"14648").split(":");
		installedScripts.push(script_no);
		GM_setValue('installedScripts',installedScripts.join(":"));
		inimg.parentNode.removeChild(inimg);
	}
	markInstalled(script_no);
}

function addProtect(script_no) {
//	if (!ps||sp) { return; }
	var imgProtect='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK9SURBVBgZBcHLi1VlAADw3/edc+fRmOP4YEzERxQYZGaQaQ8qRDCK+gPcGC1rYbjRWtqiTaAULWrRItwVVAaFBUIvhqjAyixIE41JB8fxzsy9c+855ztfv1/IOYPDH1/bg5N3rxnb169b/bpVt62Vpu1iCTeRsIB5fIizJUDbNI/s2rhq39EnNwCAXtVO9qt2cmGQNlc1S8Pkys1lX1zqHcCREqBtmunVIwFcu510QlAGipLRTrRlNCpi1CnYvXncpsmJte//OPtWBEh1vXqipGlZqoJuze0h3QHdAfMrzC0ncPz0Vfu2T7h/fWdDCZDqeu2dI1FvSG+QxBiUKApiQSEoAi1CWjRzecEvV7uzJUCqqunJ8UJ3pdEfZjFmRSSmoIgUsqJALtxYHDr11d+LOFwCNFW1dXp1R3eQNZApUhAzEoWszFGbSZ2kqZrtn7762K0IkKrh1o2To3pVFiJFCCIiAiBkcqYZDqVqmKCEgye+HC+LODLaiaqURBlZRhJAQIzUKVnu9RssQgnNsNowMTEmBlrIhEAU5EwIXLx0xl+XP7fUXzAV+0V3+cbrHHyjhFQN7ygnRpSRIgapDeSsRQj8+udH5vtfe/rxh21ee69zFz4JM79fP7H3lU1r4hNHTq9vqurEnh1bXF/MrtxIbi0lvYqUsxCyny6c9uCOXVJMdt11QAq1vTsfhZfLVFX78ezPF/+xsFJaHmZ1yoZ1UDWtJrWWuv/phFWeue8lcHT/e8789i4+GytTXT/0wlMPjL92aC8ASJk6ZVXD88e7Lsz+4Pzsd44d+MCbZ180VozCoNi48+A9U5MTz80v1a7O9cwtDiz2a3WTFTEa6QQpDX3zxxnbpre52f9Xtzfn+/PfWrw9PBV2Hzq5HkewFeuwDlOYwuTYSKczNtYRRs5ZSTPaPEDok9+eeWf22P/PLlOL9Py8xgAAAABJRU5ErkJggg==';
	var imgUnprotect='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALnSURBVBgZBcFdaNQFAADw3//jbred7pY6NLe2FKGgKOthtiJMyiiEgnoMwacIglKih3r1OSh68MFe+hCjsqgXU9N6WJFJBZU5I8/5kbqYzbvtbnf/z36/oCxLsOfIlSm8vXmkNt1NC920kBaFlaxoYQkLyLGIm/gQx2OAIsu23b9h1fRr20cBQCcpGt2kaCz28vEkZamfm1tYdvRCZyf2xgBFlq0frgbgyq1cJQjEAVHMQCU0MRCKwlAl4oHxQRsb9TUHf7r2VgiQp+lwPSYrWEoCrZRbfVo9Wj1urvDvcg7eOHTZ9Ka6e9dVRmOAPE3XrK6GOn06vVwYBmJEEWFEJBAFFAjyth+bi3653LoWA+RJsr4xGGmtZLr9UhiWopAwD0QhkVIUoYzMt/veOfF3G3tigCxJJtcPV7R6pQxKojwQlsiJytxw84D5c01bq5Nm+tObvtz3yH8hQJ70Jzc0BnSSUhASBYEQIQIMzh22sXHJ6Lbdnt/8u1dWXt8BMTy1/+vBOAqrA5VQkudCJUolcoGhq1+4o/Kdxl07dS4d1Ri506aJ9gdHX91cjSHrJ6P1ek0YUEBJEBAKlCX1pV81Ht4l755VWzeul191+/atQ1ln8UAMedIfiutVcUgUBvIioCwVCAL68Zh0cU4YLQjCjurwAr2u5ev9KH5076F12D9194Qb7dLcfK5eo1YNDa/8acP8e6q1VJH1hMUtwtXKNDH78fne2fPtF+M8SR7Hrp/PXbS4Elvul9K8tCWbMVU5aezJHcrkuCBf8uexvnK5q0h6K81me/fuwxePxHmaPvjsY/cNvvnCQwDg+jfvWnPP05KFA+K44Y9vM72Jl5ztTfj02OmDJ9/fdwTiPE0v3lho+ejEOSOrBo0M14zUB4yIBNE/ooFRs6e68i0v2zL1jFOf/6CVVZsAcZFln82cmR2fOTM7ibVYi9ueG2uNPdFsDrUXE5/MbbVwoWvk9Fd+O3/lL3wP8D9kTlQPa94WnAAAAABJRU5ErkJggg==';
	var savescript = document.createElement('img');
	savescript.setAttribute("style","margin:2px");
	savescript.setAttribute('id', 'protect-'+script_no);
	savescript.setAttribute('class','img_save');
	if (inArray(script_no,GM_getValue('protectedScripts',""))) {
		savescript.title = "This script (#" + script_no + ") is protected.";
		savescript.src = imgUnprotect;
		savescript.addEventListener("click", unprotect, false);
	} else {
		savescript.title = "Protect this script (#" + script_no + ")";
		savescript.src = imgProtect;
		savescript.addEventListener("click", protect, false);
	}
	document.getElementById("options-"+script_no).appendChild(savescript);
	ps=!ps; saveScr();
}

function trashScripts(script_no) {
//	if (!ts||sp) { return; }
	if (inArray(script_no,GM_getValue('protectedScripts',""))) return;
	var delscript = document.createElement('img');
	delscript.title = "Discard this script (#" + script_no + ")";
	delscript.src ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK9SURBVBgZBcFLiFVlAADg7//PuXdmGp3xMeIokk1USG8jKmlRYJJU1K6NRILQopXVImoVFBGBpLteu2gVLYyiUALFRSVk0aKC0nyE5uA43pm598495/zn7/tCzhns//LSQzh867rxXYO6NahbddsaNm0Py7iGhEUs4DMcKwHapnn4vtk1u157bBMA6Fft9KBqpxdX07aqZnmUnL+24tuz/T04WAK0TbN5qhvApRtJJwRloCgZ60Q3j0VFjDoFO7dN2Do9ueGT05cPRYBU11OTJU3LchX0am6M6K3SW2VhyPxKAm98ftGuuUl3z3Q2lQCprjes7Ub9Ef3VJMagRFEQCwpBEWgR0pIfzy06c7F3uQRIVbV5eqLQGzYGoyzGrIjEFBSRQlYUyIWrSyNHjv+9hP0lQFNV2zdPdfRWswYyRQpiRqKQlTlqM6mTNFUzd/SVR69HgFSNts9Oj+lXWYgUIYiICICQyZlmNJKqUYIS9r793URZxO5YJ6pSEmVkGUkAATFSp2SlP2iwBCU0o2rT5OS4GGghEwJRkDMh4ORHhic/9MO/f3lpfF1YU11/nea9ElI1uqmc7CojRQxSG8hZixBw4mNTf37hjucPGJu7y/C3Y8Xvp46/c/yJTr/4/sbtM21Kh3Y/uOPOua0zfjnfSG2WBUXMioLRpy+6/9kXTJw9IZz6QGd4XnfDlnjl3IUdZaqq3Xj65z/+sTgsrYyyOmWjOqiaVpNaB65eMD47x1OvAijf2qJowy1lqusHnnv83ok39z0CAFKmTlnVcOanrQa/fmPyq5eNhv8ZYHmpkAqXi9l79t62fnrymYXl2sX5vvmlVUuDWt1kRYy6naAbWv+cOip2grro6y1k567ElBrvh537Ds/gILZjIzZiPdZjerzb6YyPd+xJp+248rW1/QVVGeeL3Bx58ljz7v/pCEpK8wRGcAAAAABJRU5ErkJggg==';
	delscript.setAttribute("style","margin:2px");
	delscript.setAttribute('id', script_no);
	delscript.setAttribute('class','img_script');
	delscript.addEventListener("click", trash, false);
	try {
	document.getElementById("options-"+script_no).appendChild(delscript);
	} catch(e) {} // it may not be there any more?
	ts=!ts; trashScr();
}

function configBIYUS() {
	var cf = document.getElementById('menu');
	cf.style.display == 'block' ? cf.style.display='none' : cf.style.display='block';
	cf.style.display == 'none' ? sh = "Show" : sh = "Hide";
	document.getElementById('menuSwitch').innerHTML = "<span title=\"Because It's Your Userscripts.org Script and Site Manager ("+v+")\"><u>" + sh + " BIYUS options</u><span>";
}

function addRejectTitle(script_no) {
//	if (!tt||sp) { return; }
	var rejectTitle=document.createElement('img');
	rejectTitle.setAttribute("style","margin:2px");
	rejectTitle.title = "Add term to discard scripts by title";
	rejectTitle.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ1SURBVBgZBcFNiJVVGADg5z3fmTujY5NZBANBIVkZ2J9IKkZFGKRuglq1KaqVtoqoVbSKFi1LoY2QEVSbcqiFWWJqPxL044wUGESQVqJOKerce7/z9jyRmba++tXTy2YmnyphPaYQIJBBNuPWfls8l1/EfxdeOrJnxxAgMtO2148d2ffC+rWlxMqkkwBkQjp7aeT97xf99cfS5ZPzv6w6umfHElQoXdw+qN3KhX90JYIgG30243G6Muo9tOYa999WfdfOLs92x4UHd3163eG3ti8ViIgVmdkNumKiUIOu0AURFIFmdmZgx4ZZt9w6uazOTO+FAklAQQlKhBKhRCgRShfOnL/i5hUjd64Kz2+6XjfRPQkVIJPaEUJGaH1SQu0YZHHqXBq2sdaGHlg9KWoZQ4VMEjWKlBJRQiAb2RUGlBZa66RCFFAh0RBBCIlENiY6QBTRhyypIROo0MZk0hDITFAKWqhdkkGSQt/oG1ChtZSZJCkBSCCEE79+Yv7UnIuXLxiNR8rwnsomFfpGn2SjAUjQkuPzHzp98XMPb9ngplVrHFr42OX5ubpx1943K7Rxaple+2EopBZkBo2MNL3wnie2P6ovvbtntzp48iMb1232+6n9OyuMx72+Z3Zmwn03Fi3pkz5oyWffnjERKzy29lnw4iPvmDuxG/unKoyXWhu3lsNefPNnr0VKAVpy/tK/Fk5/7afTR72yda83DjxjqpuEqxVGV/u/pwfdDS+vG05nZpE0wLXLqn2Lzzn287s237XF3IndBlEd/fEwvB2ZacPOgzvHo3w8Iu5NuRxAkkhpovug1u5Q5SoGfWurDxzf/eW2/wEnITFm/fHryQAAAABJRU5ErkJggg==';
	rejectTitle.setAttribute('class','img_tt');
	rejectTitle.addEventListener("click", titleTermAdd, false);
	document.getElementById("options-"+script_no).appendChild(rejectTitle);
	tt=!tt; byTitle();
}

function titleTermAdd() {
	var rj = prompt("Discard scripts with this term in title: ");
	if (rj) {
		var array = GM_getValue('titleTerms',"").split(":");
		array.push(rj);
		GM_setValue('titleTerms',array.join(":"));
//		document.location.reload();
		promptReload(1);
	}
}

function addRejectDesc(script_no) {
//	if (!td||sp) { return; }
	var rejectDesc=document.createElement('img');
	rejectDesc.setAttribute("style","margin:2px");
	rejectDesc.title = "Add term to discard scripts by description";
	rejectDesc.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADTSURBVDjLY/j//z8DJZhhGBhw8uTJ/5RgsAF//vwhC7948QJhADkGDTEDtp9c+790ZsL/tD7//4ldXv+X7pmBagA+vOnosv+NqxP/b7ky9f+FZ7v+9+/O+h/er/u/fXHZfwaQKYRwYpfn/42XJ/zfeG3SfxDo2ZP6v39P+n/bfHniEotPteH/bVfm/EcGmy5N/W+eLUmcAZY50t+7dyX9b9+VANbcvjMB7AKgAd+JMgCosCW4R+N/764UsM0gGsQHivcQneaBijuA+BPI2VC6AyQOAPdpPzVHO/APAAAAAElFTkSuQmCC';
	rejectDesc.setAttribute('class','img_td');
	rejectDesc.addEventListener("click", descTermAdd, false);
	document.getElementById("options-"+script_no).appendChild(rejectDesc);
	td=!td; byDesc();
}

function descTermAdd() {
	var rj = prompt("Discard scripts with this term in description: ");
	if (rj) {
		var array = GM_getValue('descTerms',"").split(":");
		array.push(rj);
		GM_setValue('descTerms',array.join(":"));
//		document.location.reload();
		promptReload(1);
	}
}

function addRejectTag(script_no) {
	if (!tg||sp) { return; }
// getting tags for EVERY script is VERY time consuming;
// so do it 1x1 only when hovered over
	document.getElementById("scripts-"+script_no).addEventListener("mouseover", function() {
		var tags = getScriptTags(script_no);
		if (tags) {
			if (!document.getElementById('tags-'+script_no)) {
				var rejectTag=document.createElement('img');
				rejectTag.setAttribute("style","margin:2px");
				rejectTag.title = "Discard similar scripts (by tag)";
				rejectTag.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJPSURBVDjLhZPNi1JRGMZv6PwBLQaiqBiIoEV7QQaiaZazrNm0qlkMRJugptpEBNJMtAmapK9lhZ8oKnq5FxQVv7qOX1dRzBxHU8eohc219OrTOVfGSZyxC4cL73nf3/O857yHEUURmUwGqVQKyWQSiUQC8XgcgiAgFovNAmCmLSadTqPf70+sarWqQMLh8FQIQ5VpQaVSUZTL5fIIQmPEBQKBwJEQhlqmyVSNBqLRqNBut9Hr9ZQ4BYZCIXi93kMhDFXdTyTFf4jlSqfTQaPdA78zdFIqleD3+8Hz/ASEocr7lmVZBi3e3etjY2uAJ58BrjLcKxaL1AU8Hs8YhCE9Sq1WS0nqdruoE+X1+ACbGeC1CDzbOoAUCgXqAk6ncwRhIpHIPOlRajabSlK61VOU9QTwPge8yY5D8vk8dQGbzaZAFEowGNSSHqVGo6EkZb/38FToQy8eQNbjALs9hORyOeoCFotldtSLz+fTkh6ler0+AXlLAB/1L8FevwBuYQb8tVNwP74Bk8l0duxESX9ajuOkWq02gugI5MOrTSTuzqPjfI5B1o29T3cQu3VRZhfUtyfulWVZrdvtlugkUohIII7lc5BIMV4sAWvHAd0cWhuX4LmiKh06XS6XS+twOCQ6iRRCbQ8EC/79fj46Ae6yenDkjNvtdg05aYkOGHf1JH69uwmQot/3GPwga3tVBc+iqjr1pVmtVo3ZbJZ43SoiK+flb2tz2H0wgy8rx8AvqWX3ouoh87/najQaNQaD4Uxg+fR9oviV2ib/HVpM9/8Cz3kffqwCPcsAAAAASUVORK5CYII=';
				rejectTag.setAttribute('class','img_tg');
				rejectTag.setAttribute('id','tags-'+script_no);
				rejectTag.addEventListener("click", tagAdd, false);
				document.getElementById("options-"+script_no).appendChild(rejectTag);
				tg=!tg; byTag();
				}
			}
		}, false);
}

function tagAdd() {
	var tags = getScriptTags(this.getAttribute('id').match(/\d+/)[0]);
	var rj = new Array();
	if (tags) {
		rj = prompt("Discard scripts which share these tags with script #"+this.getAttribute('id').match(/\d+/)[0]+"?\n(Feel free to edit, being sure to separate tags by commas,\nand deleting common terms which will discard good scripts.)",tags);
		if (rj) {
			var array = GM_getValue('rejtags',"").split(":");
			rj = rj.split(","); // this should NOT be necessary!! (But it works)
			array = array.concat(rj);
			GM_setValue('rejtags',array.join(":"));
			promptReload(1);
//			rejectTags();
		}
	} else {
		alert("Script #"+this.getAttribute('id')+" has no tags!");
	}
}

// Has to be synchronous request or else no tags are found
function getScriptTags(sn) {
	var s = 'http://userscripts.org/scripts/show/' + sn;
	var request = new XMLHttpRequest();
//	request.open("GET", s, true);
	request.open("GET", s, false);
	request.send(null);
//	request.onreadystatechange = function() {
//		if(request.readyState == 4) {
			if (request.status == 200) {
				debug("Getting info from " + s);
				tags = request.responseText.match(/\/tags\/(\w+)/g);
				if (tags) {
					for (var i=0; i<tags.length; i++) { tags[i]=tags[i].replace("/tags/","") };
					tags=uniqArray(tags); // make sure there are no duplicates
					debug("tags = "+tags);
				}
				return tags;
			}
//		}
//	}
}

function showRejectInfo() {
//	if (!sr||sp) { return; }
	if (sp) { return; } // insert even if !sr, so can turn on w/o reload
	var header = document.evaluate("//div[@id='nav']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var rejectText = document.createElement('div');
	if (lr) {
		rejectText.title = "See 'Messages' in Error Console (Alt-T,C) for rejected scripts.";
	}
	rejectText.setAttribute('id', 'rejects');
	rejectText.innerHTML = "[*Discarded <span id='m'>0</span> of "+n+"*]";
	header.appendChild(rejectText);
	sr == false ? document.getElementById('rejects').style.visibility='hidden' : document.getElementById('rejects').style.visibility='visible';
}

function updateRejectCount() {
// asynchronous rejection causes some scripts to be rejected more than once!
	var m = uniqArray(rejectedScripts); // this eliminates duplicates
	if (m) document.getElementById('m').innerHTML=m.length;
}

function cleanArrays() {
	arrays = new Array ('TitleRejects','DescriptionRejects','AuthorRejects','IncludeRejects','trashArray','protectedScripts','installedScripts','goodIncludes','rejectByAuthor','titleTerms','descTerms', 'includes');
	for (var i=0; i<arrays.length; i++) {
		var r = arrays[i];
		cleanArray(r);
	}
}

function cleanArray(r) {
	array = GM_getValue(r,"").split(":");
	if (array.length == 1) { return; }
	array.sort(); // not every array is numerical
	array.sort(byNumber);
	for (var j=0; j<array.length; j++) {
		if (array[j] == array[j-1]) { array.splice(j-1,1); }
	}
	array = array.join(":");
	GM_setValue(r,array);
	return array;
}

function uniqArray(r) { // make sure array has no duplicates
	array = r;
	if (array.length == 1) { return array; }
	array.sort(); // not every array is numerical
	array.sort(byNumber);
	for (var j=0; j<array.length; j++) {
		if (array[j] == array[j-1]) { array.splice(j-1,1); }
	}
	return array;
}

function clearArrays() {
	if (confirm("If you prefer to EDIT rather than CLEAR the arrays of script\nnumbers, open 'about:config' in the Location Bar, and go to 'because'.\nOtherwise, click 'OK' to proceed.")) {
		arrays = new Array ('TitleRejects','DescriptionRejects','AuthorRejects','IncludeRejects','TagRejects','trashArray','goodIncludes','protectedScripts','installedScripts');
		for (var i=0; i<arrays.length; i++) {
			var r = arrays[i];
			clearArray(r);
		}
	}
}

function clearArray(r) {
	array = GM_getValue(r,"").split(":");
	if (confirm("Clear array " + r + "?")) {
		GM_setValue(r,"");
		return 1;
	}
	return 0;
}

function clearDiscards() {
	if (clearArray(this.getAttribute('clear'))) promptReload(1);
}

function inArray(n,r) {
	if (!r) { return 0; }
	array = r.split(":");
	for (var j=0; j<array.length; j++) {
		if (n == array[j]) { debug(n+"=="+array[j]); return 1; }
	}
	return 0;
}

function trashAuthor() {
	author = this.getAttribute('id');
	if (confirm("Really discard all scripts by " + author + "?")) {
		var array = GM_getValue('rejectByAuthor', "").split(":");
		array.push(author);
		GM_setValue('rejectByAuthor', array.join(":"));
//		document.location.reload();
		promptReload(1);
	}
}

function protect(e,sn) { // 'e' is the click event
	!sn ? script_no = this.getAttribute('id').match(/\d+/)[0] : script_no = sn;
	if (confirm("Always protect script #" + script_no + " from rejection?")) {
		array = GM_getValue('protectedScripts', "").split(":");
		array.push(script_no);
		GM_setValue('protectedScripts', array.join(":"));
		promptReload(1);
	}
}

function unprotect() {
	var imgProtect='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK9SURBVBgZBcHLi1VlAADw3/edc+fRmOP4YEzERxQYZGaQaQ8qRDCK+gPcGC1rYbjRWtqiTaAULWrRItwVVAaFBUIvhqjAyixIE41JB8fxzsy9c+855ztfv1/IOYPDH1/bg5N3rxnb169b/bpVt62Vpu1iCTeRsIB5fIizJUDbNI/s2rhq39EnNwCAXtVO9qt2cmGQNlc1S8Pkys1lX1zqHcCREqBtmunVIwFcu510QlAGipLRTrRlNCpi1CnYvXncpsmJte//OPtWBEh1vXqipGlZqoJuze0h3QHdAfMrzC0ncPz0Vfu2T7h/fWdDCZDqeu2dI1FvSG+QxBiUKApiQSEoAi1CWjRzecEvV7uzJUCqqunJ8UJ3pdEfZjFmRSSmoIgUsqJALtxYHDr11d+LOFwCNFW1dXp1R3eQNZApUhAzEoWszFGbSZ2kqZrtn7762K0IkKrh1o2To3pVFiJFCCIiAiBkcqYZDqVqmKCEgye+HC+LODLaiaqURBlZRhJAQIzUKVnu9RssQgnNsNowMTEmBlrIhEAU5EwIXLx0xl+XP7fUXzAV+0V3+cbrHHyjhFQN7ygnRpSRIgapDeSsRQj8+udH5vtfe/rxh21ee69zFz4JM79fP7H3lU1r4hNHTq9vqurEnh1bXF/MrtxIbi0lvYqUsxCyny6c9uCOXVJMdt11QAq1vTsfhZfLVFX78ezPF/+xsFJaHmZ1yoZ1UDWtJrWWuv/phFWeue8lcHT/e8789i4+GytTXT/0wlMPjL92aC8ASJk6ZVXD88e7Lsz+4Pzsd44d+MCbZ180VozCoNi48+A9U5MTz80v1a7O9cwtDiz2a3WTFTEa6QQpDX3zxxnbpre52f9Xtzfn+/PfWrw9PBV2Hzq5HkewFeuwDlOYwuTYSKczNtYRRs5ZSTPaPEDok9+eeWf22P/PLlOL9Py8xgAAAABJRU5ErkJggg==';
	script_no = this.getAttribute('id').match(/\d+/)[0];
	if (confirm("Allow script #" + script_no + " to be rejected?")) {
		array = GM_getValue('protectedScripts',"").split(":");
		for (var j=0; j<array.length; j++) {
			if (array[j] == script_no) {
				array.splice(j,1);
				break;
			}
		}
		this.title = "Protect this script (#" + script_no + ")";
		this.src = imgProtect;
		this.removeEventListener("click",unprotect,false);
		this.addEventListener("click",protect,false);
		GM_setValue('protectedScripts', array.join(":"));
		trash(null,script_no);
	}
}

function trash(e,sn) {
	script_no = sn || this.getAttribute('id'); // another way to do it
	if (confirm("Discard script #" + script_no + " from all lists?")) {
		discard(script_no);
		array = GM_getValue('trashArray', "").split(":");
		array.push(script_no);
		GM_setValue('trashArray', array.join(":"));
	}
}

function untrash() {
	script_no = this.getAttribute('id');
	var r = this.getAttribute('class');
	if (confirm("Untrashing a script does not protect it from future rejection\nunless you take the additional precaution of protecting it.\n\nUntrash script #" + script_no + " from array " + r + "?")) {
		array = GM_getValue(r,"").split(":");
		for (var j=0; j<array.length; j++) {
			if (array[j] == script_no) {
				array.splice(j,1);
				break;
			}
		}
		GM_setValue(r,array.join(":"));
		this.setAttribute('style','visibility:hidden');
		protect(null,script_no);
	}
}

function discard(script_no) { // this is repeated so often it needs a function!
		rejectedScripts.push(script_no);
		updateRejectCount();
		var row = document.getElementById("scripts-"+script_no);
		try { row.parentNode.removeChild(row); } catch(e) {}
}

function log(msg) {
	if (!lr) { return; }
	GM_log(msg);
}

function debug(msg) {
	if (!db) { return; }
	GM_log("(db)" + msg);
}

function byNumber(a,b) {
	return a-b;
}

function editTerms() {
	cleanArray(this.getAttribute('edit'));
	var	terms = GM_getValue(this.getAttribute('edit'),"").split(':').join('\n');
	if(!document.getElementById(this.getAttribute('edit')+'_txt')) {
		var tdiv = document.createElement('div');
		var txt = document.createElement('textarea');
		txt.setAttribute('id',this.getAttribute('edit')+'_txt');
		txt.value=terms;
		txt.className='edit';
		tdiv.appendChild(txt);
		this.parentNode.appendChild(tdiv);
		this.innerHTML=this.innerHTML.replace('EDIT','SAVE');
		txt.focus(); // unfortunately, focus is at the end of the list, but the view is not
	} else {
		var txt = document.getElementById(this.getAttribute('edit')+'_txt');
		if (txt.value!=terms) {
			GM_setValue(this.getAttribute('edit'),txt.value.split('\n').join(':'));
			promptReload(1); // require reload if changes have been made
		}
		var tdiv = txt.parentNode;
		tdiv.parentNode.removeChild(tdiv);
		this.innerHTML=this.innerHTML.replace('SAVE','EDIT');
	}
}

function showhide() { // show or hide data columns on script list page
	GM_setValue(this.getAttribute('name'), this.checked);
	this.checked == true ? show(this.getAttribute('name')) : hide(this.getAttribute('name'));
}
var thname;
function hide(col) {
	var k;
	for (var i=0; i<headers.snapshotLength; i++) {
		var th = headers.snapshotItem(i);
		if (th.innerHTML.match(col)) {
			k=i;
			th.parentNode.removeChild(th);
		}
		if (th.innerHTML.match("Name")) { thname=i; }
	}
	var j=0;
	for (var i=0; i<cells.snapshotLength; i++) {
		var td = cells.snapshotItem(i);
		if (j == k) { td.parentNode.removeChild(td); }
		j++; j == headers.snapshotLength ? j=0 : j=j;
	}
}
function show(col) {
	var k;
	for (var i=0; i<headers.snapshotLength; i++) {
		var th = headers.snapshotItem(i);
		if (th.innerHTML.match(col)) {
			k=i;
			headers.snapshotItem(thname).parentNode.appendChild(th);
		}
	}
	var j=0;
	for (var i=0; i<cells.snapshotLength; i++) {
		var td = cells.snapshotItem(i);
		if (j == k) { cells.snapshotItem(i-j+thname).parentNode.appendChild(td); }
		j++; j == headers.snapshotLength ? j=0 : j=j;
	}
}

var reload=0;
function promptReload(r) {
	r ? reload+=1 : reload-=1;
	var reloadLink = document.getElementById('apply');
	reload ? reload > 1 ? reloadLink.innerHTML='Reload page to apply changes<br>' : reloadLink.innerHTML='Reload page to apply change<br>' : reloadLink.innerHTML='<br>';
}

function resetDefaults() {
	if (document.getElementById('rd').checked) {
		if (confirm("Resetting defaults preserves all arrays, and resets BIYUS's default behavior.\nProceed?")) {
			for each(var val in GM_listValues()) {
				if (typeof GM_getValue(val) == "boolean") {
					GM_deleteValue(val);
				}
			}
			promptReload(1);
		}
	}
	document.getElementById('rd').checked=false;
}

//Adapted from Rhino 5, 422-424
function drag(event) {
	var obj = document.getElementById('menuContainer');
	var startX = event.clientX, startY = event.clientY;
	var origX = obj.offsetLeft, origY = obj.offsetTop;
	var deltaX = startX - origX, deltaY = startY - origY;
	document.addEventListener('mousemove',move,true);
	document.addEventListener('mouseup',drop,true);
	event.stopPropagation();
	event.preventDefault();

	function move(e) {
		obj.style.left = (e.clientX - deltaX) + "px";
		obj.style.top = (e.clientY - deltaY) + "px";
		e.stopPropagation();
	}

	function drop(e) {
		GM_setValue('menuX',e.clientX - deltaX);
		GM_setValue('menuY',e.clientY - deltaY);
		document.removeEventListener("mouseup",drop,true);
		document.removeEventListener("mousemove",move,true);
		e.stopPropagation();
	}
}

function versionCheck(sName,sNo,vNo) {
	var install = "http://userscripts.org/scripts/source/" + sNo + ".user.js";
	var src = "http://userscripts.org/scripts/review/" + sNo;
	var version = "";
	var request = new XMLHttpRequest();
	request.open("GET", src, false);
	request.send(null);
	if (request.status == 200) {
		debug("Getting code from " + src);
		version = request.responseText.match(/\@version\s+(\S+)/)[1];
		debug("version = " + version);
	}
	if (Number(version) > vNo) {
// Put update icon next to options link
		var updateLink=document.createElement('a');
		updateLink.href=install;
		updateImg=document.createElement('img');
		updateImg.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKKSURBVDjLpZNdSBRRGIbnzOzubSxBRReBYhTRDziQQlKxbmoKItp0YVRUsBB2UVQsWdkfilHaj6GuZqEkhJaSf6knISqUYIgooogWS2uRwjFd25yZ3Xn7NlKS3bzp4jDMzHne73zPfCMAEP5nzbux6gU5UifwsE+AWSMos89DVczz4xpD8ArjkxUsMW4AwZ7InSWwetJh8Vzo1YzPviNYjfTmQL8rY+KSqI1fFJWYAKrsjjSvgPV4F/DsAGbqFyF0nSVOX2Xu0M3lwKMdCHdlgGDtW5kox23BqGFes2UdBeyD2ZYKgn1Tlcynt6YAPB/TDUkg2PNPB9H1s4pxozWZTlIIgjX9XipVL0CoaW0U9sVINGsF2ahm8l/9OkmWZg3shNWXC/TnwnzgwtdSUR27IDpn942cluSPxZIsRGXpt5eCTINg7Y9pNdy1DejbDjzMhNm+BQSrgXMS/1wi+UdOSQiUOeH32rgwc4PxSH8eMFSECC+A2Z0Ns5PAgXygNxPoTqdrFoz2dMy0bKLTuCk0B6HmjXh3hALINCdZCFYyTFaIKn0mTqa50baZNmZQgAvG/TSMlkjqp5MSHz4h+T8ct+HtYRteFdl5jMTxctFJsjSrLw/hDtfvEL01DQSrBDsXnMToIphPN66H0ZGJL2ckf7ApGejJglazCu+P2XwLBpDp8smG1dS/gonalSDTHjLtm7q1AehyIXA5AS8P2r1xAwhWvtcm0Bjn08Rlg0xrBDvJtHukdBnQuRU6SXxzdDGG9jpiJ3HsvKgEzkpasDEZE3VrMFwszVV6fciuTjWmYLQ8CYN7HNrTQocStwUynUiyWkgWJ9Nzf90Lj115vt/BB3c7vE8KHfNE/gKM7aCNx0eNYwAAAABJRU5ErkJggg==';
		updateImg.style.margin='2px';
		updateLink.setAttribute('title',"["+sName+" version "+version+" available]");
		updateLink.appendChild(updateImg);
		document.getElementById('updateNotice').appendChild(updateLink);
	}
}

/*
CHANGELOG
2.8	Added drag-drop for BIYUS menu
2.7	Allowed user to mark/unmark script as installed; won't show Install
		icon for scripts marked installed;
		Cleaned up some duplicative code (there's more!)
		NEVER A SEPARATE RELEASE
2.6	Icon for removing similar scripts, by tag, appears only when the
		mouse is over the script, and only if the script has tags
2.52	No, really!  NOW the count really is accurate.
2.51	Made reject count at top of page dynamic and accurate (it wasn't
		for scripts rejected asynchronously)
2.5	Enough to jump over 2.4!  Added rejection by tags, script protection;
		cleaned up quite a lot under the hood; made script by script options
		appear only when cursor over script
2.31	Modified versionCheck not to get script in txt format (which is
		apparently not current)
2.3	Rewrote versionCheck to display install icon when update available
		(and option to check for updates set)
2.2	Fixed (?) bug in versionCheck function
2.1	Cosmetic changes, including using GM_AddStyle for styling
		Added 'Reset BIYUS defaults' option
2.0	MAJOR upgrade from earlier versions
*/

