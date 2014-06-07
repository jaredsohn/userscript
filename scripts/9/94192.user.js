// ==UserScript==
// @name            DOA quickreply box
// @namespace       XZQt
// @author          Hacked together by some ilitirit mofo; modified by phpSelectah
// @version         0.5.8.1 Beta Carotene
// @include         http://www.dogsonacid.com/showthread.php*
// ==/UserScript==

// 0.5.8.1 Regression Fix:  Italics.  
// 0.5.8 Fixed:  annoying font tag problem.  either the HTML changed or it's Firefox 3b5
// 0.5.7 Improved:  multiple quote handling, URL handling (might not be an improvement if you have images enabled :teeth:)
// 0.5.6 Remove embedded youtubes
// 0.5.4 Put Quick reply on timer instead of onscroll handler to allow for multievent scrolling..... all methods of scrolling now work with QR button following (thanks tomshardware.com's article pages )
// 0.5.4 Placed essential function declarations and calls within 'script' variable so that function calls operate in all cases
// 0.5.4 Reply box has 'Hide QR' button to facilitate multiple page quotes
// 0.5.4 Multiple quick quotes working now as well
// 0.5.4 Started cleaning function names to reside in 'XZQt_' namespace
// 0.5.4 TODO: Finish generic quotes routines
// 0.5.4 TODO: Add effective comments and economize code flow
// 0.5.4 TODO: put this project in CVS

// 0.5.5 Quick hack to display Registered dates and locations

(function() {
  var xpath = "//embed";
  var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  var i, embed;
  for (i = 0; embed = res.snapshotItem(i); ++i) 
  {
    var dl = document.createElement('a');
    dl.href = embed.src;
    dl.appendChild(document.createTextNode(embed.src));
    //embed.parentNode.insertBefore(dl, embed.nextSibling);
    parent = embed.parentNode;
    parent.parentNode.replaceChild(dl, parent);
  }
})();

// Add "Quick Quote" functionality
var xpathResults, thisResult;
xpathResults = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < xpathResults.snapshotLength; i++)
{
	thisResult = xpathResults.snapshotItem(i);
	var threadId;
	
	if (thisResult.href.indexOf("action=getip") >= 0)
	{
		var XZQt_Extra = document.createElement("text");
		XZQt_Extra.id			= "XZQt_qquote_" + i;
		XZQt_Extra.innerHTML	= " | <a href=\"javascript:XZQt_QuickQuote('" + XZQt_Extra.id + "');\">Quick Quote</a>";
		
		// <font>
		var fontElem = thisResult.parentNode;
				
		fontElem.appendChild(XZQt_Extra);
	}
	else if (thisResult.href.indexOf("action=newreply&threadid=") >= 0) 
	{
		var tmp = thisResult.href;
		
		tmp			= tmp.substring(tmp.indexOf("action=newreply&threadid="), tmp.length);
		threadId	= tmp.substring(("action=newreply&threadid=").length, tmp.length);
	}
}

xpathResults = document.evaluate('//a[contains(@href, "getinfo&userid=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < xpathResults.snapshotLength; i++)
{
	thisResult = xpathResults.snapshotItem(i);
	thisResult.parentNode.parentNode.parentNode.parentNode.innerHTML += "<tr><td><div class='collapsable'><p class=\"profilesummary\"><font face=\"Verdana\" size=\"1\"></p></div></td></tr>";
}
/*
// Show posts, date registerd
var allFontTags, thisTag;
allFontTags = document.evaluate('//font[@size="1"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allFontTags.snapshotLength; i++)
{
	thisTag = allFontTags.snapshotItem(i);
	
	var oldValue = thisTag.innerHTML;
	
	
	if (oldValue.substring(0, 16) == '<!-- Registered:')
	{
		oldValue = oldValue.replace(new RegExp('<!--', "g"), '');
		oldValue = oldValue.replace(new RegExp('-->', "g"), '');
		thisTag.innerHTML = oldValue;
	}
}
*/

function getCookie(cookiename)
{
	var cookiestring = "" + document.cookie;
	
	var index1 = cookiestring.indexOf(cookiename);
	if (index1 == -1 || cookiename == "")
		return "";
	
	var index2 = cookiestring.indexOf(';',index1);
	if (index2 == -1)
		index2 = cookiestring.length;

	return unescape(cookiestring.substring(index1 + cookiename.length + 1, index2));
}
	
function getSmileyBoxImage(imgID, imgDefault)
{
	var imageURL = getCookie(imgID);
	
	return imageURL == "" ? imgDefault : imageURL;
}

var script = document.createElement("script");
script.language = 'javascript';
script.type = 'text/javascript';
script.innerHTML = '<!--\n' +
	'var COLLAPSABLE_PARENT_NAME = "collapsable";\n' +
	'var COLLAPSABLE_PARENT_TYPE = "div";\n' +
	'var COLLAPSABLE_CHILD_TYPE = "p";\n' +
	'var COLLAPSABLE_EXPAND = \'<font face="Verdana" size="1">[profile summary]+</font>\';\n' +
	'var COLLAPSABLE_SHRINK = \'<font face="Verdana" size="1">[profile summary]-</font>\';\n' +
	' var tags=new Array();\n' +
	
	'XZQt_init = function() {\n' +
	'    if(document.getElementById && document.createTextNode) {\n' +
	'        var entries = document.getElementsByTagName(COLLAPSABLE_PARENT_TYPE);\n' +
	'        for(i=0;i<entries.length;i++)\n' +
	'            if (entries[i].className==COLLAPSABLE_PARENT_NAME)\n' +
	'                assignCollapse(entries[i], true);\n' +
	'    }\n' +
	'}\n' +
	
	'assignCollapse = function (div, init) {\n' +
	'    var button = document.createElement("a");\n' +
	'    button.style.cursor="pointer";\n' +
	'    button.setAttribute("expand", COLLAPSABLE_EXPAND);\n' +
	'    button.setAttribute("shrink", COLLAPSABLE_SHRINK);\n' +
	'    button.setAttribute("state", -1);\n' +
	'    button.innerHTML=COLLAPSABLE_EXPAND;\n' +
	'    div.insertBefore(button, div.getElementsByTagName(COLLAPSABLE_CHILD_TYPE)[0]);\n' +
	
	
	'    button.onclick=function(){\n' +
	'        var state = -(1*this.getAttribute("state"));\n' +
	'        this.setAttribute("state", state);\n' +
	'        this.parentNode.getElementsByTagName(COLLAPSABLE_CHILD_TYPE)[0].style.display=state==1?"none":"block";\n' +
	'        this.innerHTML = this.getAttribute(state==1?"expand":"shrink");\n' +
	'		 var summaryInfoElement = this.nextSibling.firstChild;\n' +
	'		 if (state == -1 && summaryInfoElement.innerHTML == "")\n' +
	'		 {\n' +
	'			if (tags[url]==null)\n' +
	'			{\n' +
	'				var url = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("a")[0] + "";\n' +
	'				summaryInfoElement.innerHTML = "Loading...";\n' +
	'				xmlhttp=new XMLHttpRequest();\n' +
	'				xmlhttp.onreadystatechange=function()\n' +
	'				{\n' +
	'					if (xmlhttp.readyState==4)\n' +
	'					{\n' +
	'						if (xmlhttp.status==200)\n' +
	'						{\n' +
	'							var profTable = xmlhttp.responseText.substring(xmlhttp.responseText.indexOf(\'<table cellpadding="0"\'));\n' +
	'							profTable = profTable.substring(0, profTable.indexOf("</td></tr></table>") + "</td></tr></table>".length);\n' +
	'							var htmlTable = document.createElement("table");\n' +
	'							htmlTable.innerHTML = profTable;\n' +
	'							var tbody = htmlTable.getElementsByTagName("tbody")[0];\n' +
	'							var rows = htmlTable.getElementsByTagName("tr");\n' +
	'							rows[4].parentNode.removeChild(rows[4]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							rows[5].parentNode.removeChild(rows[5]);\n' +
	'							summaryInfoElement.innerHTML = htmlTable.innerHTML;\n' +
	'							tags[url]=htmlTable.innerHTML + "";\n' +
	'						}\n' +                              
	'						else\n' +
	'						{\n' +
	'							summaryInfoElement.innerHTML = "Error retrieving profile information.";\n' +
	'						}\n' +
	'					}\n' +
	'				};\n' +
	'				xmlhttp.open("GET",url,true);\n' +
	'				xmlhttp.send(null);\n' +
	'			}\n' +
	'			else\n' +
	'			{\n' +
	'				summaryInfoElement.innerHTML = tags[url];\n' +
	'			}\n' +
	'		 }\n' +
	'    };                   \n' +
	'    button.onclick();\n' +
	'}\n' +
	'window.onload=XZQt_init;\n' +
	
	'function XZQt_Show(id,how){\n' +
	'  if(document.getElementById(id).style.display == "none" || how == \'quick\'){\n' +
	'   document.getElementById(id).style.display = "inline";\n' +
	'  }else{\n' +
	'   document.getElementById(id).style.display = "none";\n' +
	'  }\n' +
	'}\n' +
	'	var smilies	= new Object();\n' +
	'	smilies["images/smilies/realmad.gif"] = ":fack:";\n' +
	'	smilies["images/smilies/bgrin.gif"] = ":bgrin:";\n' +
	'	smilies["images/smilies/dung.gif"] = ":poop:";\n' +
	'	smilies["images/smilies/eek1.gif"] = ":oogle:";\n' +
	'	smilies["images/smilies/asianslay.gif"] = ":asianslay";\n' +
	'	smilies["images/smilies/redx.gif"] = ":redx:";\n' +
	'	smilies["images/smilies/ana.gif"] = ":rant2:";\n' +
	'	smilies["images/smilies/lol.gif"] = ":up:";\n' +
	'	smilies["images/smilies/eek2.gif"] = ":wtf:";\n' +
	'	smilies["images/smilies/grumble.gif"] = ":grumble:";\n' +
	'	smilies["images/smilies/fett.gif"] = ":fett:";\n' +
	'	smilies["images/smilies/icon885.gif"] = ":confused:";\n' +
	'	smilies["images/smilies/icon_rolleyes.gif"] = ":rolleyes2";\n' +
	'	smilies["images/smilies/zzz.gif"] = ":zzz:";\n' +
	'	smilies["images/smilies/icon853.gif"] = ":eek:";\n' +
	'	smilies["images/smilies/puke.gif"] = ":puke:";\n' +
	'	smilies["images/smilies/wink2.gif"] = ":wink:";\n' +
	'	smilies["images/smilies/smashed.gif"] = ":smashed:";\n' +
	'	smilies["images/smilies/appl.gif"] = ":clap:";\n' +
	'	smilies["images/smilies/crazy.gif"] = ":zany:";\n' +
	'	smilies["images/smilies/lovetoss.gif"] = ":lovetoss:";\n' +
	'	smilies["images/smilies/pimp.gif"] = ":pimp:";\n' +
	'	smilies["images/smilies/blaze.gif"] = ":blaze:";\n' +
	'	smilies["images/smilies/dstar.gif"] = ":dstar:";\n' +
	'	smilies["images/smilies/smile2.gif"] = ":smil:";\n' +
	'	smilies["images/smilies/icon852.gif"] = ":laughing:";\n' +
	'	smilies["images/smilies/badgerslayer.gif"] = ":badger:";\n' +
	'	smilies["images/smilies/icon3.gif"] = ":devil:";\n' +
	'	smilies["images/smilies/icon31.gif"] = ":script:";\n' +
	'	smilies["images/smilies/icon33.gif"] = ":biggrin:";\n' +
	'	smilies["images/smilies/icon4.gif"] = ":warning:";\n' +
	'	smilies["images/smilies/icon45.gif"] = ":cry:";\n' +
	'	smilies["images/smilies/icon5.gif"] = ":question:";\n' +
	'	smilies["images/smilies/icon6.gif"] = ":cool:";\n' +
	'	smilies["images/smilies/icon8.gif"] = ":mad:";\n' +
	'	smilies["images/smilies/icon855.gif"] = ":spliff:";\n' +
	'	smilies["images/smilies/icon856.gif"] = ":love:";\n' +
	'	smilies["images/smilies/icon9.gif"] = ":blue:";\n' +
	'	smilies["images/smilies/icon996.gif"] = ":twothumbs";\n' +
	'	smilies["images/smilies/icon997.gif"] = ":death:";\n' +
	'	smilies["images/smilies/icon998.gif"] = ":nuke:";\n' +
	'	smilies["images/smilies/icon999.gif"] = ":finger:";\n' +
	'	smilies["images/smilies/icon1.gif"] = ":vinyl:";\n' +
	'	smilies["images/smilies/icon111.gif"] = ":cd:";\n' +
	'	smilies["images/smilies/icon112.gif"] = ":real:";\n' +
	'	smilies["images/smilies/icon122.gif"] = ":mp3:";\n' +
	'	smilies["images/smilies/icon15.gif"] = ":thumbdown";\n' +
	'	smilies["images/smilies/icon13.gif"] = ":thumbup:";\n' +
	'	smilies["images/smilies/icon2.gif"] = ":smoke:";\n' +
	'	smilies["images/smilies/icon20.gif"] = ":upsidedow";\n' +
	'	smilies["images/smilies/icon23.gif"] = ":whitey:";\n' +
	'	smilies["images/smilies/icon24.gif"] = ":loot:";\n' +
	'	smilies["images/smilies/monkey.gif"] = ":monkey:";\n' +
	'	smilies["images/smilies/punch.gif"] = ":punch:";\n' +
	'	smilies["images/smilies/spin2.gif"] = ":cookie:";\n' +
	'	smilies["images/smilies/alarm.gif"] = ":dainjah:";\n' +
	'	smilies["images/smilies/flipoff.gif"] = ":flipu:";\n' +
	'	smilies["images/smilies/crackhead3.gif"] = ":crack:";\n' +
	'	smilies["images/smilies/slayer2.gif"] = ":teef:";\n' +
	'	smilies["images/smilies/ban.gif"] = ":ban:";\n' +
	'	smilies["images/smilies/rasta.gif"] = ":rasta:";\n' +
	'	smilies["images/smilies/wave.gif"] = ":wave:";\n' +
	'	smilies["images/smilies/domokun.gif"] = ":domo:";\n' +
	'	smilies["images/smilies/domocrack.gif"] = ":wes:";\n' +
	'	smilies["images/smilies/gimp.gif"] = ":gimp:";\n' +
	'	smilies["images/smilies/fabio.gif"] = ":fabio:";\n' +
	'	smilies["images/smilies/banana2.gif"] = ":cl:";\n' +
	'	smilies["images/smilies/hump.gif"] = ":hump:";\n' +
	'	smilies["images/smilies/nana.gif"] = ":pbj:";\n' +
	'	smilies["images/smilies/tosser.gif"] = ":toss:";\n' +
	'	smilies["images/smilies/fire.gif"] = ":lighter:";\n' +
	'	smilies["images/smilies/sonar.gif"] = ":riot:";\n' +
	'	smilies["images/smilies/winter.gif"] = ":winter:";\n' +
	'	smilies["images/smilies/john.gif"] = ":johnb:";\n' +
	'	smilies["images/smilies/wiggle.gif"] = ":wiggle:";\n' +
	'	smilies["images/smilies/catsmile.gif"] = ":skosh:";\n' +
	'	smilies["images/smilies/baby.gif"] = ":dylan:";\n' +
	'	smilies["images/smilies/oogle.gif"] = ":melody:";\n' +
	'	smilies["images/smilies/clown.gif"] = ":honkhonk:";\n' +
	'	smilies["images/smilies/victoria.gif"] = ":victoria:";\n' +
	'	smilies["images/smilies/tnsv3.gif"] = ":tea:";\n' +
	'	smilies["images/smilies/dutty2.gif"] = ":dutty:";\n' +
	'	smilies["images/smilies/whip.gif"] = ":kameel:";\n' +
	'	smilies["images/smilies/nutkick.gif"] = ":esc:";\n' +
	'	smilies["images/smilies/webb.gif"] = ":webb:";\n' +
	'	smilies["images/smilies/moon.gif"] = ":butt:";\n' +
	'	smilies["images/smilies/evil.gif"] = ":evil:";\n' +
	'	smilies["images/smilies/3some.gif"] = ":3some:";\n' +
	'	smilies["images/smilies/puppy.gif"] = ":puppy:";\n' +
	'	smilies["images/smilies/guin.gif"] = ":beer:";\n' +
	'	smilies["images/smilies/slay2.gif"] = ":slay2:";\n' +
	'	smilies["images/smilies/2nanab.gif"] = ":banslay:";\n' +
	'	smilies["images/smilies/help.gif"] = ":help:";\n' +
	'	smilies["images/smilies/heart.gif"] = ":heart:";\n' +
	'	smilies["images/smilies/santaslay.gif"] = ":santa:";\n' +
	'	smilies["images/smilies/slayer.gif"] = ":slayer:";\n' +
	'	smilies["images/smilies/badteeth.gif"] = ":teeth:";\n' +
	'	smilies["images/smilies/alien.gif"] = ":alien:";\n' +
	'	smilies["images/smilies/attentionwhoresmile.gif"] = ":whore:";\n' +
	'	smilies["/attachment.php?s=&postid=1036511"] = ":deany:";\n' +
	'	smilies["http://www.phillyjunglemassive.com/board/images/smiles/fu.gif"] = ":fingah:";\n' +
	'	smilies["http://mywebpages.comcast.net/logictrigger/Blah.gif"] = ":blah:";\n' +
	'	smilies["http://www.dogsonacid.com/attachment.php?s=&postid=1303917"] = ":happysad:";\n' +
	'	smilies["http://www.dogsonacid.com/attachment.php?s=&postid=1794015"] = ":cform:";\n' +
	'	smilies["http://www.dogsonacid.com/attachment.php?s=&postid=1836384"] = ":ana:";\n' +
	'	smilies["http://www.dogsonacid.com/attachment.php?s=&postid=1842682"] = ":care:";\n' +
	'	smilies["http://dogsonacid.com/images/smilies/icon857.gif"] = ":rolleyes:";\n' +
	'	smilies["http://dogsonacid.com/images/smilies/burn.gif"] = ":burn:";\n' +
	'	smilies["showthread.php_files/icon856.gif"] = ":love:";\n' +

	'	function XZQt_Test(tmpVar)\n' +
	'	{\n' +
	'	}\n' +
	
	'	function XZQt_GetUserInfo(elem)\n' +
	'	{\n' +
	'	}\n' +
	
	'	function XZQt_RegexGetMatch(strRegex, strTarget)\n' +
	'	{\n' +
	'		// <[^>]+> \n' +
	'		var re = new RegExp(strRegex);\n' +
	'		var m = re.exec(strTarget);\n' +
	'		var theString = "";\n' +
	
	'		if (m == null) return null;\n' +
	
	'		for (i = 0; i < m.length; ++i)\n' +
	'			theString += m[i];\n' +
	
	'		return theString;\n' +
	
	'	}\n' +
	
	'	function XZQt_RegexReplace(strRegex, strTarget, strValue)\n' +
	'	{\n' +
	'		var re = new RegExp(strRegex, "g");\n' +
	'		strTarget = strTarget.replace(re, strValue);\n' +
	'	}\n' +


	'	function XZQt_GetExpiryDate( nodays)\n' +
	'	{\n' +
	'		var UTCstring;\n' +
	'		Today	= new Date();\n' +
	'		nomilli	= Date.parse(Today);\n' +
	'		Today.setTime(nomilli + nodays * 24 * 60 * 60 * 1000);\n' +
	'		UTCstring = Today.toUTCString();\n' +
	'		return UTCstring;\n' +
	'	}\n' +
    
    
	'	function XZQt_GetCookie(cookiename)\n' +
	'	{\n' +
	'		 var cookiestring	= "" + document.cookie;\n' +
	'		 var index1			= cookiestring.indexOf(cookiename);\n' +
	'		 if (index1 == -1 || cookiename=="")\n' +
	'		 	return "";\n' +
	'		 var index2	= cookiestring.indexOf(\';\',index1);\n' +
	'		 if (index2 == -1)\n' +
	'		 	index2 = cookiestring.length; \n' +
	'		 return unescape(cookiestring.substring(index1 + cookiename.length + 1, index2));\n' +
	'	}\n' +
    
    
	'	function XZQt_SetCookie(name, value, duration)\n' +
	'	{\n' +
	'		cookiestring	= name + "=" + escape(value) + ";EXPIRES=" + XZQt_GetExpiryDate(duration);\n' +
	'		document.cookie	= cookiestring;\n' +
	'		return XZQt_GetCookie(name);\n' +
	'	}\n' +
	
	
	'	function XZQt_Trim(theString)\n' +
	'	{\n' +
	'		if (theString == null) return null;\n' +
	'		return theString.replace(/^\\s+/g, "").replace(/\\s+$/g, "");\n' +
  	'	}\n' +
	
	'	function XZQt_FormatImageTag(theTag)\n' +
	'	{\n' +
	'		var imgTagStart	= \'<img src="\';\n' +
	'		var imgTagEnd	= \'" \';\n' +
	
	'		var imgStart	= theTag.indexOf(imgTagStart);\n' +
	'		var imgEnd		= theTag.indexOf(imgTagEnd);\n' +
		
	'		var imgLoc		= theTag.substring(imgStart + imgTagStart.length, imgEnd);\n' +
	
	'		// Remove first char if it is a forward slash\n' +
	'		if (imgLoc.indexOf("/") == 0)\n' +
	'			imgLoc = imgLoc.substring(1, imgLoc.length);\n' +
	
	'		var shortCut	= smilies[imgLoc];\n' +
	
	'		if (shortCut != null)\n' +
	'		{\n' +
	'			return shortCut;\n' +
	'		}\n' +
	'		else\n' +
	'		{\n' +
	'			return "[IMG]" + imgLoc + "[/IMG]";\n' +
	'		}\n' +
	'	}\n' +
	
	'	function XZQt_ProcessSmilieClick(rowCol, defShortcut)\n' +
	'	{\n' +
	'		if (document.getElementById(\'XZQt_Customize\').checked)\n' +
	'		{\n' +
	'			XZQt_CustomizeSmilie(rowCol);\n' +
	'		}\n' +
	'		else\n' +
	'		{\n' +
	'			XZQt_GetSmilieShortcut(rowCol, defShortcut);\n' +
	'		}\n' +
	'	}\n' +
		
	'	function XZQt_CustomizeSmilie(rowCol)\n' +
	'	{\n' +
	'		var msg = \'Enter the URL of the smiley or leave blank to reset.\';\n' +
	'		var tip = \'Tip:  Omit the domain if the image is local to the current server.\';\n' +
	'		var smilieURL = prompt(msg + "\\n" + tip);\n' +
	'		if (smilieURL == null)\n' +
	'			return;\n' +
	
	'		if (smilieURL == "")\n' +
	'			XZQt_SetCookie(rowCol, smilieURL, -1);\n' +
	'		else\n' +
	'			XZQt_SetCookie(rowCol, smilieURL, 365);\n' +
	'	}\n' +
	
	
	'	function XZQt_GetSmilieShortcut(rowCol, defShortcut)\n' +
	'	{\n' +
	'		var smilieURL = XZQt_GetCookie(rowCol);\n' +
	
	'		if (smilieURL == "" || smilieURL == null)\n' +
	'			XZQt_AppendToMessage(defShortcut);\n' +
	'		else\n' +
	'		{\n' +
	
	'			// Remove first char if it is a forward slash\n' +
	'			if (smilieURL.indexOf("/") == 0)\n' +
	'				smilieURL = smilieURL.substring(1, smilieURL.length);\n' +
	
	'			var shortCut = smilies[smilieURL];\n' +
	'			if (shortCut == null || shortCut == "")\n' +
	'				XZQt_AppendToMessage("[img]" + smilieURL + "[/img]");\n' +
	'			else\n' +
	'				XZQt_AppendToMessage(shortCut);\n' +
	'		}\n' +
	'	}\n' +
	
	
	'	var postmaxchars = 100000;\n' +
	'	function XZQt_validate()\n' +
	'	{\n' +
	'		document.getElementById("threadid").value=XZQt_getThreadId();\n' + 
	'		var msg = document.getElementById("message");\n' +
	'		if (msg.value=="")\n' +
	'		{\n' +
	'			alert("Please complete the message field.");\n' +
	'			return false;\n' +
	'		}\n' +
	'		if (postmaxchars != 0)\n' +
	'		{\n' +
	'			if (msg.value.length > 100000)\n' +
	'			{\n' +
	'				alert("Reduce your message to 100000 characters (Currently "+theform.message.value.length+")");\n' +
	'				return false;\n' +
	'			}\n' +
	'			else\n' +
	'			{\n' +
	'				return true;\n' +
	'			}\n' +
	'		}\n' +
	'		else\n' +
	'		{\n' +
	'			return false;\n' +
	'		}\n' +
	'	}\n' +
	'	\n' +
	
	
	'	function XZQt_checklength()\n' +
	'	{\n' +
	'		var msg = document.getElementById("message");\n' +
	'		if (postmaxchars != 0)\n' +
	'		{\n' +
	'			message = "The maximum permitted length is 100000 characters.";\n' +
	'		}\n' +
	'		else\n' +
	'		{\n' +
	'			message = "";\n' +
	'		}\n' +
	'		alert("Your message is "+msg.value.length+" characters long."+message);\n' +
	'	}\n' +
	'	\n' +
	
	
	'	function XZQt_AppendToMessage(theText)\n' +
	'	{\n' +
	'		var msg = document.getElementById("message");\n' +
	'		msg.value += theText; + " "\n' +
	'		msg.focus();\n' +
	'	}\n' +
	'\n' +
	
	
	'function XZQt_opensmiliewindow(x,y)\n' +
	'{\n' +
	'	window.open("misc.php?action=getsmilies", "smilies", "toolbar=no,scrollbars=yes,resizable=yes,width="+x+",height="+y);\n' +
	'}\n' +
	
	'function XZQt_Replace(s, t, u)\n' +
	'{\n' +
	'	i = s.indexOf(t);\n' +
	'	r = "";\n' +
	'	if (i == -1) return s;\n' +
	'	r += s.substring(0,i) + u;\n' +
	'	if ( i + t.length < s.length)\n' +
	'		r += XZQt_Replace(s.substring(i + t.length, s.length), t, u);\n' +
	'	return r;\n' +
	'}\n' +
	
	'function XZQt_RemoveElement(strText, elementName)\n' +
	'{\n' +
	'	var tagStart	= "<" + elementName + ">";\n' +
	'	var tagEnd		= "</" + elementName + ">";\n' +
	'	\n' +
	'	var elemStart	= strText.indexOf(tagStart);\n' +
	'	var elemEnd		= strText.indexOf(tagEnd);\n' +
	'	\n' +
	'	\n' +
	'	var protection  = 0;\n' +
	'	while (elemStart >= 0 && elemEnd >= 0 && protection < 20)\n' +
	'	{\n' +
	'		var tmp		= strText.substring(elemStart, elemEnd + tagEnd.length);\n' +
	'		\n' +
	'		strText		= XZQt_Replace(strText, tmp, "");\n' +
	'		\n' +
	'		elemStart	= strText.indexOf(tagStart);\n' +
	'		elemEnd		= strText.indexOf(tagEnd);\n' +
	'		protection++;\n' +
	'	}\n' +
	'	if (protection >= 20) alert("in XZQt_RemoveElement: protection kicked in for " + strText);\n' +
	'	// Remove the remaining endtag\n' +
	'	strText = XZQt_Replace(strText, tagEnd, "");\n' +
	'	\n' +
	'	return strText;	\n' +
	'}\n' +
 	
	'function XZQt_QuickQuote(linkId)\n' +
	'{\n' +
	'	var theLink	 = document.getElementById(linkId);\n' +
	'	var fontElem = theLink.parentNode;\n' +
	
	'	// <p align="right">\n' +
	'	var paragraphElem	= fontElem.parentNode;\n' +
	
	'	// <td bgcolor="#000000" valign="top" width="100%">\n' +
	'	var postElement		= paragraphElem.parentNode;\n' +
	'	var postText		= postElement.innerHTML;\n' +
	
	'	// Get the user name\n' +
	'	var userName = postElement.parentNode.innerHTML;\n' +
	'	userName	 = userName.substring(userName.indexOf("<b>") + 3, userName.indexOf("</b>"));\n' +
	
	'	// Find the post\n' +
	'	postText = postText.substring(postText.indexOf("<p>") + 3, postText.indexOf("</p>"));\n' +
	
	'	// TODO: list, code, proper font handling\n' +
	
	'	// Remove "<br>"\n' +
	'	postText = XZQt_Replace(postText, "<br>", "");\n' +
	
	'	// Remove the font tags\n' +
	'	postText = XZQt_Replace(postText, "<font face=\\"verdana\\" size=\\"2\\" color=\\"#ffffff\\">", "");\n' +
	'	postText = XZQt_Replace(postText, "<font color=\\"#ffffff\\" face=\\"verdana\\" size=\\"2\\">", "");\n' +
	'	postText = XZQt_Replace(postText, "<font size=\\"2\\" color=\\"#ffffff\\" face=\\"verdana\\">", "");\n' +
	'	postText = XZQt_Replace(postText, "</font>", "");\n' +
	
	'	// Replace italics\n' +
	'	postText = XZQt_Replace(postText, "<i>", "[i]");\n' +
	'	postText = XZQt_Replace(postText, "</i>", "[/i]");\n' +
	
	'	// Replace bold\n' +
	'	postText = XZQt_Replace(postText, "<b>", "[b]");\n' +
	'	postText = XZQt_Replace(postText, "</b>", "[/b]");\n' +
	
	'	// Replace underline\n' +
	'	postText = XZQt_Replace(postText, "<u>", "[u]");\n' +
	'	postText = XZQt_Replace(postText, "</u>", "[/u]");\n' +
	
	'	// Remove any quoted text\n' +
	'	postText = XZQt_RemoveElement(postText, "blockquote");\n' +
	
	'	// Format URLs\n' +
	'{\n' +
	'	var tagStart	= "<a ";\n' +
	'	var tagEnd		= "</a>";\n' +
		
	'	var elemStart	= postText.indexOf(tagStart);\n' +
	'	var elemEnd		= postText.indexOf(tagEnd);\n' +
		
	'	var protection = 0;\n' +
		
	'	while (elemStart >= 0 && protection < 50 )\n' +
	'	{\n' +
	'		var endStartTagPos = postText.lastIndexOf(">", elemEnd);\n' +
	'		var url = postText.substring(endStartTagPos + 1, elemEnd);\n' +
			
	'		postText = XZQt_Replace(postText, postText.substring(elemStart, elemEnd + tagEnd.length), "[URL]" + url + "[/URL]");\n' +
			
	'		var elemStart	= postText.indexOf(tagStart);\n' +
	'		var elemEnd		= postText.indexOf(tagEnd);\n' +
			
	'		protection++;\n' +
	'	}\n' +
		
	'	if (protection >= 30)\n' +
	'		alert("Protection kicked in while formatting URLs");\n' +
	'}\n' +
	
	'	// Format images/smilies\n' +
	'	{\n' +
	'		var imgRegex	= "<img[^>]+>";\n' +
	'		var img			= XZQt_RegexGetMatch(imgRegex, postText);\n' +
	'		var protection  = 0;\n' +
			
	'		while (img != null && protection < 20)\n' +
	'		{\n' +
	'			var newTag	= XZQt_FormatImageTag(img);\n' +
	'			postText	= XZQt_Replace(postText, img, newTag);\n' +
	'			img			= XZQt_RegexGetMatch(imgRegex, postText);\n' +
	'			protection++;\n' +
	'		}\n' +
	
	'		if (protection >= 20) alert("in Format images: protection kicked in for " + postText);\n' +
	
	'		// Trim the text (deal with it :|)\n' +
	'		postText = XZQt_Trim(postText);\n' +
	
	'		// Finally wrap it in quote tags\n' +
	'		postText = "[QUOTE][I]Originally posted by " + userName + "[/I]\\n[B]" + \n' +
	'					postText + "[/B][/QUOTE]";\n' +
	'	}\n' +
	
	'	var message = document.getElementById("message");\n' +
	'	message.value += unescape(postText) + \'\\n\\n\';\n' +
	'   XZQt_Show(\'doaQR\',\'quick\');\n' +
	'	message.focus();\n' +
	'}';
	
	script.innerHTML += 'function XZQt_getThreadId() { return ' + threadId + ';}\n-->';

	
var qreply = document.createElement("div");
    qreply.setAttribute('id','doaQRWrapper');
    qreply.innerHTML = 
'<button onclick="XZQt_Show(\'doaQR\');">QR</button>\n'+
'<div id="qr_debug"></div>'+
'<div id="doaQR" style="display: none; margin: 0 0 0 0; border-bottom: 1px solid #000000; margin-bottom: 5px; font-size: small; background-color: #111111; color: #ffffff;">\n' +
'<form enctype="multipart/form-data" action="newreply.php" id="vbform" name="vbform" method="post" onSubmit="return XZQt_validate()">\n' +
'	<script language="Javascript" src="vbcode.js"></script>\n' +
'	<script language="Javascript" src="vbcode_language.js"></script>\n' +
'	<Input type="hidden" id="action" name="action" value="postreply">\n' +
'	<input type="hidden" id="threadid" name="threadid" value="0">\n' +
'	<input type="hidden" id="title" name="title" value="">\n' +
'	<input type="hidden" id="iconid" name="iconid" value="0">\n' +
'	<input type="hidden" id="parseurl" name="parseurl" value="yes">\n' +
'	<input type="hidden" id="email" name="email" value="">\n' +
'	<input type="hidden" id="disablesmilies" name="disablesmilies" value="">\n' +
'	<input type="hidden" id="rating" name="rating" value="0">\n' +
'	<input type="hidden" id="mode" name="mode" value="0" checked>\n' +
'	<input type="hidden" id="mode" name="mode" value="1" >\n' +
/*'	<table cellpadding="0" cellspacing="0" border="1" bgcolor="00000"  width="80%" align="center">\n' +
'		<tr>\n' +
'			<td>\n' +*/
'				<table cellpadding="4" cellspacing="1" border="1"  width="95%">\n' +
'					<tr>\n' +
'						<td bgcolor="000000" colspan="2">\n' +
'							<font face="verdana" size="3" color="#ffffff"><b></b></font>\n' +
'						</td>\n' +
'					</tr>\n' +

'					<tr>\n' +
'						<td bgcolor="#000000" valign="top" nowrap><font face="verdana" size="2" color="#ffffff"><b><!-- Quick Reply Text Goes Here--></b></font><br>\n' +
'							<table cellpadding="3" cellspacing="1" border="0" bgcolor="#000000" class="XZQt_AppendToMessageTable" align="center">\n' +
'								<tr>\n' +
'									<td colspan="9" align="center" bgcolor="#000000" style="border-width:1px; border-style:inset"><font face="verdana" size="1" color="#ffffff"><b>Smilies</b></font></td>\n' +
'								</tr>\n' +
'								<tr align="center">\n' +
'									<td><a href="#" id=XZQt_r1c1 onclick="XZQt_ProcessSmilieClick(\'r1c1\', \':bgrin:\'); return false;"><img src="' + getSmileyBoxImage("r1c1", "images/smilies/bgrin.gif") + '" title="bgrin" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r1c2 onclick="XZQt_ProcessSmilieClick(\'r1c2\', \':grumble:\'); return false;"><img src="' + getSmileyBoxImage("r1c2", "images/smilies/grumble.gif") + '" title="Grumble" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r1c3 onclick="XZQt_ProcessSmilieClick(\'r1c3\', \':fett:\'); return false;"><img src="' + getSmileyBoxImage("r1c3", "images/smilies/fett.gif") + '" title="Fett" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r1c4 onclick="XZQt_ProcessSmilieClick(\'r1c4\', \':slayer:\'); return false;"><img src="' + getSmileyBoxImage("r1c4", "images/smilies/slayer.gif") + '" title="Brok" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r1c5 onclick="XZQt_ProcessSmilieClick(\'r1c5\', \':confused:\'); return false;"><img src="' + getSmileyBoxImage("r1c5", "images/smilies/icon885.gif") + '" title="confused" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r1c6 onclick="XZQt_ProcessSmilieClick(\'r1c6\', \':rolleyes2\'); return false;"><img src="' + getSmileyBoxImage("r1c6", "images/smilies/icon_rolleyes.gif") + '" title="rolleyes2" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r1c7 onclick="XZQt_ProcessSmilieClick(\'r1c7\', \':zzz:\'); return false;"><img src="' + getSmileyBoxImage("r1c7", "images/smilies/zzz.gif") + '" title="Zzzz" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r1c8 onclick="XZQt_ProcessSmilieClick(\'r1c8\', \':eek:\'); return false;"><img src="' + getSmileyBoxImage("r1c8", "images/smilies/icon853.gif") + '" title="eek" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r1c9 onclick="XZQt_ProcessSmilieClick(\'r1c9\', \':teeth:\'); return false;"><img src="' + getSmileyBoxImage("r1c9", "images/smilies/badteeth.gif") + '" title="Badteeth" border="0"></a>&nbsp;</td>\n' +
'								</tr>\n' +
'								<tr align="center">\n' +
'									<td><a href="#" id=XZQt_r2c1 onclick="XZQt_ProcessSmilieClick(\'r2c1\', \':puke:\'); return false;"><img src="' + getSmileyBoxImage("r2c1", "images/smilies/puke.gif") + '" title="Puke" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r2c2 onclick="XZQt_ProcessSmilieClick(\'r2c2\', \':wink:\'); return false;"><img src="' + getSmileyBoxImage("r2c2", "images/smilies/wink2.gif") + '" title="Wink" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r2c3 onclick="XZQt_ProcessSmilieClick(\'r2c3\', \':smashed:\'); return false;"><img src="' + getSmileyBoxImage("r2c3", "images/smilies/smashed.gif") + '" title="Smashed" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r2c4 onclick="XZQt_ProcessSmilieClick(\'r2c4\', \':burn:\'); return false;"><img src="' + getSmileyBoxImage("r2c4", "images/smilies/burn.gif") + '" title="Burn" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r2c5 onclick="XZQt_ProcessSmilieClick(\'r2c5\', \':pimp:\'); return false;"><img src="' + getSmileyBoxImage("r2c5", "images/smilies/pimp.gif") + '" title="Pimp" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r2c6 onclick="XZQt_ProcessSmilieClick(\'r2c6\', \':blaze:\'); return false;"><img src="' + getSmileyBoxImage("r2c6", "images/smilies/blaze.gif") + '" title="Blazed" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r2c7 onclick="XZQt_ProcessSmilieClick(\'r2c7\', \':dstar:\'); return false;"><img src="' + getSmileyBoxImage("r2c7", "images/smilies/dstar.gif") + '" title="dstar" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r2c8 onclick="XZQt_ProcessSmilieClick(\'r2c8\', \':smil:\'); return false;"><img src="' + getSmileyBoxImage("r2c8", "images/smilies/smile2.gif") + '" title="Smile" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r2c9 onclick="XZQt_ProcessSmilieClick(\'r2c9\', \':laughing:\'); return false;"><img src="' + getSmileyBoxImage("r2c9", "images/smilies/icon852.gif") + '" title="laughing" border="0"></a>&nbsp;</td>\n' +
'								</tr>\n' +                                                                                
'								<tr align="center">\n' +                                                                  
'									<td><a href="#" id=XZQt_r3c1 onclick="XZQt_ProcessSmilieClick(\'r3c1\', \':badger:\'); return false;"><img src="' + getSmileyBoxImage("r3c1", "images/smilies/badgerslayer.gif") + '" title="badger" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r3c2 onclick="XZQt_ProcessSmilieClick(\'r3c2\', \':devil:\'); return false;"><img src="' + getSmileyBoxImage("r3c2", "images/smilies/icon3.gif") + '" title="devil" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r3c3 onclick="XZQt_ProcessSmilieClick(\'r3c3\', \':script:\'); return false;"><img src="' + getSmileyBoxImage("r3c3", "images/smilies/icon31.gif") + '" title="script" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r3c4 onclick="XZQt_ProcessSmilieClick(\'r3c4\', \':biggrin:\'); return false;"><img src="' + getSmileyBoxImage("r3c4", "images/smilies/icon33.gif") + '" title="biggrin" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r3c5 onclick="XZQt_ProcessSmilieClick(\'r3c5\', \':warning:\'); return false;"><img src="' + getSmileyBoxImage("r3c5", "images/smilies/icon4.gif") + '" title="warning" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r3c6 onclick="XZQt_ProcessSmilieClick(\'r3c6\', \':cry:\'); return false;"><img src="' + getSmileyBoxImage("r3c6", "images/smilies/icon45.gif") + '" title="cry" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r3c7 onclick="XZQt_ProcessSmilieClick(\'r3c7\', \':question:\'); return false;"><img src="' + getSmileyBoxImage("r3c7", "images/smilies/icon5.gif") + '" title="question" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r3c8 onclick="XZQt_ProcessSmilieClick(\'r3c8\', \':cool:\'); return false;"><img src="' + getSmileyBoxImage("r3c8", "images/smilies/icon6.gif") + '" title="cool" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r3c9 onclick="XZQt_ProcessSmilieClick(\'r3c9\', \':mad:\'); return false;"><img src="' + getSmileyBoxImage("r3c9", "images/smilies/icon8.gif") + '" title="mad" border="0"></a>&nbsp;</td>\n' +
'								</tr>\n' +                                                                                
'									<tr align="center">\n' +                                                              
'									<td><a href="#" id=XZQt_r4c1 onclick="XZQt_ProcessSmilieClick(\'r4c1\', \':spliff:\'); return false;"><img src="' + getSmileyBoxImage("r4c1", "images/smilies/icon855.gif") + '" title="spliff" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r4c2 onclick="XZQt_ProcessSmilieClick(\'r4c2\', \':love:\'); return false;"><img src="' + getSmileyBoxImage("r4c2", "images/smilies/icon856.gif") + '" title="love" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r4c3 onclick="XZQt_ProcessSmilieClick(\'r4c3\', \':alien:\'); return false;"><img src="' + getSmileyBoxImage("r4c3", "images/smilies/alien.gif") + '" title="alien" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r4c4 onclick="XZQt_ProcessSmilieClick(\'r4c4\', \':blue:\'); return false;"><img src="' + getSmileyBoxImage("r4c4", "images/smilies/icon9.gif") + '" title="blue" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r4c5 onclick="XZQt_ProcessSmilieClick(\'r4c5\', \':twothumbs\'); return false;"><img src="' + getSmileyBoxImage("r4c5", "images/smilies/icon996.gif") + '" title="twothumbs" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r4c6 onclick="XZQt_ProcessSmilieClick(\'r4c6\', \':death:\'); return false;"><img src="' + getSmileyBoxImage("r4c6", "images/smilies/icon997.gif") + '" title="death" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r4c7 onclick="XZQt_ProcessSmilieClick(\'r4c7\', \':nuke:\'); return false;"><img src="' + getSmileyBoxImage("r4c7", "images/smilies/icon998.gif") + '" title="nuke" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r4c8 onclick="XZQt_ProcessSmilieClick(\'r4c8\', \':finger:\'); return false;"><img src="' + getSmileyBoxImage("r4c8", "images/smilies/icon999.gif") + '" title="finger" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r4c9 onclick="XZQt_ProcessSmilieClick(\'r4c9\', \':vinyl:\'); return false;"><img src="' + getSmileyBoxImage("r4c9", "images/smilies/icon1.gif") + '" title="vinyl" border="0"></a>&nbsp;</td>\n' +
'								</tr>\n' +                                                                                
'								<tr align="center">\n' +                                                                  
'									<td><a href="#" id=XZQt_r5c1 onclick="XZQt_ProcessSmilieClick(\'r5c1\', \':cd:\'); return false;"><img src="' + getSmileyBoxImage("r5c1", "images/smilies/icon111.gif") + '" title="cd" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r5c2 onclick="XZQt_ProcessSmilieClick(\'r5c2\', \':real:\'); return false;"><img src="' + getSmileyBoxImage("r5c2", "images/smilies/icon112.gif") + '" title="real" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r5c3 onclick="XZQt_ProcessSmilieClick(\'r5c3\', \':mp3:\'); return false;"><img src="' + getSmileyBoxImage("r5c3", "images/smilies/icon122.gif") + '" title="mp3" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r5c4 onclick="XZQt_ProcessSmilieClick(\'r5c4\', \':thumbdown\'); return false;"><img src="' + getSmileyBoxImage("r5c4", "images/smilies/icon15.gif") + '" title="thumbdown" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r5c5 onclick="XZQt_ProcessSmilieClick(\'r5c5\', \':thumbup:\'); return false;"><img src="' + getSmileyBoxImage("r5c5", "images/smilies/icon13.gif") + '" title="thumbup" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r5c6 onclick="XZQt_ProcessSmilieClick(\'r5c6\', \':smoke:\'); return false;"><img src="' + getSmileyBoxImage("r5c6", "images/smilies/icon2.gif") + '" title="smoke" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r5c7 onclick="XZQt_ProcessSmilieClick(\'r5c7\', \':upsidedow\'); return false;"><img src="' + getSmileyBoxImage("r5c7", "images/smilies/icon20.gif") + '" title="upsidedown" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r5c8 onclick="XZQt_ProcessSmilieClick(\'r5c8\', \':whitey:\'); return false;"><img src="' + getSmileyBoxImage("r5c8", "images/smilies/icon23.gif") + '" title="whitey" border="0"></a>&nbsp;</td>\n' +
'									<td><a href="#" id=XZQt_r5c9 onclick="XZQt_ProcessSmilieClick(\'r5c9\', \':loot:\'); return false;"><img src="' + getSmileyBoxImage("r5c9", "images/smilies/icon24.gif") + '" title="loot" border="0"></a>&nbsp;</td>\n' +
'								</tr>\n' +
'								<tr>\n' +
'									<td colspan="9" align="center" bgcolor="#000000" style="border-width:1px; border-style:inset">\n' +
'										<font face="verdana" size="1" color="#ffffff"><br>[<a href="javascript:XZQt_opensmiliewindow(390,280)">Get More</a>] [<a href="http://pages.videotron.com/bluefire/" target="_blank">Get even more</a>] [Customize<input type="checkbox" id="XZQt_Customize" value="no" >]</font>\n' +
'									</td>\n' +
'								</tr>\n' +
'							</table>\n' +
'						</td>\n' +
'						<td bgcolor="000000">\n' +
'							<table cellpadding="0" cellspacing="0" border="0">\n' +
'								<tr id="codebuttons">\n' +
'									<td bgcolor="#000000">\n' +
'										<table cellpadding="0" cellspacing="0" border="0">\n' +
'											<tr>\n' +
'												<td nowrap>\n' +
'													<font face="verdana" size="1" color="#ffffff">\n' +
'														<input type="button" class="bginput" value=" B " onclick="vbcode(this.form,\'B\',\'\')" onmouseover="stat(\'b\')" title="BOLD (alt+b)" accesskey="b">\n' +
'														<input type="button" class="bginput" value=" I " onclick="vbcode(this.form,\'I\',\'\')" onmouseover="stat(\'i\')" title="ITALIC (alt+i)" accesskey="i">\n' +
'														<input type="button" class="bginput" value=" U " onclick="vbcode(this.form,\'U\',\'\')" onmouseover="stat(\'u\')" title="UNDERLINE (alt+u)" accesskey="u">\n' +
'														&nbsp;\n' +
'														<select id="sizeselect" onchange="fontformat(this.form,this.options[this.selectedIndex].value,\'SIZE\')" onmouseover="stat(\'size\')">\n' +
'															<option value="0">SIZE</option>\n' +
'															<option value="1">small</option>\n' +
'															<option value="3">large</option>\n' +
'															<option value="4">huge</option>\n' +
'														</select>\n' +
'														<select id="fontselect" onchange="fontformat(this.form,this.options[this.selectedIndex].value,\'FONT\')" onmouseover="stat(\'font\')">\n' +
'															<option value="0">FONT</option><option value="arial">Arial</option>\n' +
'															<option value="times new roman">Times</option>\n' +
'															<option value="courier new">Courier</option>\n' +
'															<option value="century gothic">Century</option>\n' +
'														</select>\n' +
'														<select id="colorselect" onchange="fontformat(this.form,this.options[this.selectedIndex].value,\'COLOR\')" onmouseover="stat(\'color\')">\n' +
'															<option value="0">COLOR</option><!-- you should edit this list to remove the colors you don\'t want -->\n' +
'															<option value="skyblue" style="color:skyblue">sky blue</option>\n' +
'															<option value="royalblue" style="color:royalblue">royal blue</option>\n' +
'															<option value="blue" style="color:blue">blue</option>\n' +
'															<option value="darkblue" style="color:darkblue">dark-blue</option>\n' +
'															<option value="orange" style="color:orange">orange</option>\n' +
'															<option value="orangered" style="color:orangered">orange-red</option>\n' +
'															<option value="crimson" style="color:crimson">crimson</option>\n' +
'															<option value="red" style="color:red">red</option>\n' +
'															<option value="firebrick" style="color:firebrick">firebrick</option>\n' +
'															<option value="darkred" style="color:darkred">dark red</option>\n' +
'															<option value="green" style="color:green">green</option>\n' +
'															<option value="limegreen" style="color:limegreen">limegreen</option>\n' +
'															<option value="seagreen" style="color:seagreen">sea-green</option>\n' +
'															<option value="deeppink" style="color:deeppink">deeppink</option>\n' +
'															<option value="tomato" style="color:tomato">tomato</option>\n' +
'															<option value="coral" style="color:coral">coral</option>\n' +
'															<option value="purple" style="color:purple">purple</option>\n' +
'															<option value="indigo" style="color:indigo">indigo</option>\n' +
'															<option value="burlywood" style="color:burlywood">burlywood</option>\n' +
'															<option value="sandybrown" style="color:sandybrown">sandy brown</option>\n' +
'															<option value="sienna" style="color:sienna">sienna</option>\n' +
'															<option value="chocolate" style="color:chocolate">chocolate</option>\n' +
'															<option value="teal" style="color:teal">teal</option>\n' +
'															<option value="silver" style="color:silver">silver</option>\n' +
'														</select>\n' +
'														<br>\n' +
'														<input type="button" class="bginput" value="http://" title="Insert Hyperlink" onclick="namedlink(this.form,\'URL\')" onmouseover="stat(\'url\')">\n' +
'														<input type="button" class="bginput" value=" @ " title="Insert Email Address" onclick="namedlink(this.form,\'EMAIL\')" onmouseover="stat(\'email\')">\n' +
'														<input type="button" class="bginput" value="IMG" title="Insert Image" onclick="vbcode(this.form,\'IMG\',\'http://\')" onmouseover="stat(\'img\')">\n' +
'														&nbsp;\n' +
'														<input type="button" class="bginput" value=" # " title="CODE" onclick="vbcode(this.form,\'CODE\',\'\')" onmouseover="stat(\'code\')">\n' +
'														<input type="button" class="bginput" value="PHP" title="PHP CODE" onclick="vbcode(this.form,\'PHP\',\'\')" onmouseover="stat(\'php\')">\n' +
'														<input type="button" class="bginput" value="List" title="Ordered List" accesskey="l" onclick="dolist(this.form)" onmouseover="stat(\'list\')">\n' +
'														<input type="button" class="bginput" value="Quote" title="Insert Quote" onclick="vbcode(this.form,\'QUOTE\',\'\')" onmouseover="stat(\'quote\')">\n' +
'														<br>\n' +
'														<input type="text" class="bginput" name="status" style="font-size:7pt" size="50" value="Use these controls to insert vBcode">\n' +
'													</font>\n' +
'												</td>\n' +
'												<td>&nbsp;</td>\n' +
'												<td>\n' +
'													<font face="verdana" size="1" color="#ffffff">\n' +
'														<input type="button" class="bginput" value=" x " accesskey="c" title="Close Current Tag (alt+c)" style="color:red; font-weight:bold" onclick="closetag(this.form)" onmouseover="stat(\'closecurrent\')">\n' +
'														Close Current Tag<br>\n' +
'														<input type="button" class="bginput" value=" x " accesskey="x" title="Close All Open Tags (alt+x)" style="color:red; font-weight:bold" onclick="closeall(this.form)" onmouseover="stat(\'closeall\')">\n' +
'														Close All Tags\n' +
'													</font>\n' +
'												</td>\n' +
'											</tr>\n' +
'										</table>\n' +
'									</td>\n' +
'								</tr>\n' +
'								<tr valign="top">\n' +
'									<td>\n' +
'										<font face="verdana" size="1" color="#ffffff">\n' +
'											<a href="javascript:XZQt_checklength();">[check message length]</a><br>\n' +
'											<textarea id="message" name="message" rows="12" cols="75" wrap="virtual" tabindex="1"></textarea><br>\n' +
'											<input type="checkbox" name="signature" id="signature" value="yes" > <b>Show Signature:</b> include your profile signature.  Only registered users may have signatures.\n' +
'											<font face="verdana" size="2" color="#ffffff">Attach file:</font><br>\n' +
'											<input type="hidden" name="MAX_FILE_SIZE" value="">\n' +
'											<input type="file" class="bginput" name="attachment">\n' +
'										</font>\n' +
'										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
'										<font class="nf"><input type="submit" class="bginput" name="submit" value="Submit Reply" accesskey="s" tabindex="2">\n' +
'											<input type="reset" class="bginput" name="reset" value="Reset Form" accesskey="r" tabindex="3">\n' +
'											<input type="button" class="bginput" onclick="XZQt_Show(\'doaQR\')" name="hide QR" value="Hide QR" tabindex="3">\n' +
'										</font>\n' +
'									</td>\n'+//<td>\n' + makeGenericResponses() + '</td>\n' +
'								</tr>\n' +
'							</table>\n' +
'						</td>\n' +
'					</tr>\n' +
'				</table>\n' +
/*'			</td>\n' +
'		</tr>\n' +
'	</table>\n' +*/
'</form></div>';

  script.innerHTML += '\n' +
      ' function qr_debug(txt){\n'+
      '      if(  document.getElementById("qr_debug") ){\n'+
      '       debug = document.getElementById("qr_debug");\n'+
      '	    debug.innerHTML += txt;\n'+
      '	  }\n'+
      '  }\n';


  script.innerHTML += '\n' +
      '  function moveDoaQRHandle(){\n' +
      '	   y="window.pageYOffset";\n' +
      '	   pos = eval(y);\n' +
      '      if( document.getElementById("doaQRWrapper") ){\n' +
      '        handle =   document.getElementById("doaQRWrapper");\n' +
      '	       handle.style.position = "absolute";\n' +
      '        handle.style.top = pos;/*document.body.scrollTop*/ \n' +
      '	     }\n' +
      '    setTimeout("moveDoaQRHandle()", 10);\n' +
      '  }\n'+
	  'moveDoaQRHandle();\n';



  

  function makeGenericResponses(){
    var html ='';
	var g = 0;
	var genericResponses = Array();

    genericResponses[g]   = 'Fake.';
    genericResponses[g++] = 'Repost.';


    for(i = 0; i < genericResponses.length;i++){
      html += makeButton(genericResponses[i]);
	}
	return html;
  }


  function makeButton(txt){
    return '<input type="button" class="bginput" onclick="genericResponse(' + txt + ')" value="'+ txt +'"><br>\n';
  }
// Install Javascript into Body
document.body.insertBefore(script, document.body.firstChild);	

var elems = document.getElementsByTagName("table");
// Crappy, unportable guesstimate
elems[elems.length - 9].appendChild(qreply);
// window.document.body.appendChild(qreply);
