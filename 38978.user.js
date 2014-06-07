// ==UserScript==
// @name           LJ Profile Incremental
// @namespace      http://axisofevil.net/~xtina/
// @description    Resets the LJ profile back *one step*.
// @include        http://*.livejournal.com/profile*
// @include        http://*.livejournal.com/*/profile*
// @exclude        http://*.livejournal.com/*/*/profile*
// ==/UserScript==

// Resets the profile to look like this:
// http://pics.livejournal.com/chasethestars/pic/0026w81k

// If true, this will append the reformatted profile to the existing profile.
var debug = false;

// What kind of profile: community, syndicated, or user?
// Also get the username.
var ljType = window.location.href;

var ljFoo = ljType.split(".")[0];
if (ljFoo == "http://community") {
	var ljUsername = ljType.split("/")[3];
	ljType = "C";
} else if (ljFoo == "http://syndicated") {
	var ljUsername = ljType.split("/")[3];
	ljType = "S";
} else if (ljFoo == "http://users") {
	var ljUsername = ljType.split("/")[3];
	ljType = "U";
} else {
	var ljUsername = ljFoo.split("//")[1];
	if (ljUsername == "news") { ljType = "N"; } else { ljType = "U"; }
}

ljUsername = ljUsername.replace(/-/g, "_");


// Change the CSS.

//http://userscripts.org/scripts/review/3775
var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

// Define your CSS here.
addStyle(".section { font-size: 1.2em; border-bottom: 1px solid #BDBDBD; background-color: #FFF; color: #505050; }");

// Writes CSS to the document
writeStyle(css);



/* ***
*/


// The top stats tiem.
var ljDoc = document.getElementById("profile_top");
var ljUserpic = getElementsByClassName(document, "div", "userpicdiv")[0].innerHTML;
var ljUser = getElementsByClassName(document, "div", "username")[0].innerHTML;
var ljActions = getElementsByClassName(document, "div", "actions")[0].childNodes[0].childNodes;

/*
	| User | UN  |          actions |
	|  Pic | T/S | Stats1 |  Stats2 |
*/

var ljNewStats = document.createElement("table");
ljNewStats.setAttribute("border", "0");
ljNewStats.setAttribute("width", "100%");
ljNewStats.setAttribute("cellpadding", "5");
ljNewStats.setAttribute("cellspacing", "-1");

var tmp1 = document.createElement("tr");
tmp1.style.verticalAlign = "top";

// Userpic.
var tmp2 = document.createElement("td");
tmp2.setAttribute("rowspan", "2");
tmp2.innerHTML = ljUserpic;
tmp1.appendChild(tmp2);

// Username.
tmp2 = document.createElement("td");
tmp2.style.borderBottom = "1px solid #999";
tmp2.style.fontSize = "1.4em";
tmp2.innerHTML = ljUser;
tmp1.appendChild(tmp2);

// Actionstrip.
tmp2 = document.createElement("td");
tmp2.setAttribute("colspan", "2");
tmp2.style.fontWeight = "bold";
tmp2.style.textAlign = "right";
tmp2.style.borderBottom = "1px solid #999";
tmp2.style.whiteSpace = "nowrap";
for (var x = 0; x < ljActions.length; x++) {
	tmp2.innerHTML += ljActions[x].innerHTML;
	if (x < ljActions.length) {
		tmp2.innerHTML += "&nbsp;";
	}
}
for (var x = 0; x < tmp2.getElementsByTagName("img").length; x++) {
	tmp2.getElementsByTagName("img")[x].style.border = "0";
	tmp2.getElementsByTagName("img")[x].style.margin = "0 4px 0 4px";
	tmp2.getElementsByTagName("img")[x].style.verticalAlign = "middle";
}
tmp1.appendChild(tmp2);
ljNewStats.appendChild(tmp1);

tmp1 = document.createElement("tr");
tmp1.style.verticalAlign = "top";

// Process the stats, aiee.
tmp2 = document.createElement("td");

// Title/subtitle.
var ljTitleblock;
if (ljType != "S") {
	var ljTitle = getElementsByClassName(document, "p", "journal_title")[0];
	if (ljTitle) { ljTitle = '<b>' + ljTitle.innerHTML + '</b>'; }
	var ljSubtitle = getElementsByClassName(document, "p", "journal_subtitle")[0];
	if (ljSubtitle != null) { ljSubtitle = '<i>' + ljSubtitle.innerHTML + '</i>'; }

	if (ljTitle != null && ljSubtitle != null) {
		ljTitleblock = ljTitle + "<br />" + ljSubtitle + "</div><br />";
	} else if (ljTitle != null && ljSubtitle == null) {
		ljTitleblock = ljTitle + "</div><br />";
	} else if (ljTitle == null && ljSubtitle != null) {
		ljTitleblock = ljSubtitle + "</div><br />";
	}
}
if (ljTitleblock) {
	tmp2.innerHTML = ljTitleblock;
	tmp1.appendChild(tmp2);
	tmp2 = document.createElement("td");
} else {
	tmp2.setAttribute("colspan", "2");
}

// Get the stats, and break them out into left/right.
tmp2.style.fontSize = "smaller";
var ljDetails = getElementsByClassName(document, "div", "details_stats")[0].childNodes;
for (var x = 0; x < ljDetails.length; x++) {
	var tmpThing = ljDetails[x].innerHTML;
// User number, created/joined, last updated.  All on one line.
	if (tmpThing.indexOf(" (#") > -1) {
		var tmpArray = tmpThing.split(",")[0].split(" ");
		var ljUnum = tmpArray.pop();
		ljUnum = "LJ User No.: " + ljUnum.substr(2, ljUnum.length - 3);

		var ljTool = tmpArray.pop();
		var ljCreated = tmpArray.pop();
		ljTool = ljCreated + ' ' + ljTool;
		ljCreated = tmpArray.join(" ") + ': <span style="border-bottom: 1px dotted #999;" title="' + ljTool + '">' + ljCreated + '</span>';

		if (ljDetails[x].childNodes.length == 1) {
			var ljUpdated = "Never updated";
		} else {
			var ljUpdated = ljDetails[x].innerHTML.split(", ")[1];
			ljUpdated = Left(ljUpdated, 1).toUpperCase() + Right(ljUpdated, ljUpdated.length - 1);
		}
// Account type.
	} else if (tmpThing.toLowerCase().indexOf("<strong") > -1) {
		var ljAccountType = ljDetails[x].innerHTML;
// Adult concepts, oh noes!
	} else if (tmpThing.toLowerCase().indexOf("warning.gif") > -1) {
		var ljAdult = tmpThing;
// Oh lord.  Comments and support points.
	} else {
		var ljComments = tmpThing;
		if (ljComments.indexOf("/support/") > -1) {
			var ljSupport = ljComments.split(", ")[2];
			ljSupport = '<a' + ljSupport.split(" <a")[1] + ': ' + ljSupport.split(" <a")[0];
			ljComments = ljComments.split(", ")[0] + ', ' + ljComments.split(", ")[1];
		}
	}
}

// The links line.
tmpThing = getElementsByClassName(document, "div", "details_links")[0].childNodes[0].childNodes;
var tmpLinks = getElementsByClassName(document, "div", "details_links")[0].childNodes[0].innerHTML.split("</a>,");

var ljLinks = "";
for (var x = 0; x < tmpLinks.length; x++) {
	var tmpLink = tmpLinks[x];
	if (x == 0) {
		var ljEntries = (tmpLink + "</a>").toLowerCase();
	} else if (tmpLink.indexOf("vgift.bml") > -1) {
		var ljVgifts = '<a' + tmpLink.split(" <a")[1] + '</a>:' + tmpLink.split(" <a")[0];
	} else {
		if (tmpLink.indexOf("allpics.bml") == -1) {
			ljLinks += trim(tmpLink) + "</a>, ";
		}
	}
}
if (Right(ljLinks, 6) == "</a>, ") { ljLinks = trim(Left(ljLinks, ljLinks.length - 2)) }

// Add to middle stats block: entries, updated, comments, links, adult.
tmp2.innerHTML += ljEntries + '<br />';
tmp2.innerHTML += ljUpdated + '<br />';
tmp2.innerHTML += ljComments + '<br />';
if (ljLinks.length > 1) { tmp2.innerHTML += ljLinks + '<br />'; }
if (ljAdult) { tmp2.innerHTML += ljAdult + '<br />'; }
tmp1.appendChild(tmp2);

// Add to right stats block: #, joined, support, vgifts, actype.

tmp2 = document.createElement("td");
tmp2.style.fontSize = "smaller";
tmp2.style.whiteSpace = "nowrap";
tmp2.style.textAlign = "right";

tmp2.innerHTML = ljUnum + '<br />';
tmp2.innerHTML += ljCreated + '<br />';
if (ljSupport) { tmp2.innerHTML += ljSupport + '<br />'; }
if (ljVgifts) { tmp2.innerHTML += ljVgifts + '<br />'; }
if (ljAccountType) { tmp2.innerHTML += ljAccountType + '<br />'; }
tmp1.appendChild(tmp2);
ljNewStats.appendChild(tmp1);

// Wee, replace!
ljDoc.parentNode.replaceChild(ljNewStats, ljDoc);


/**
***
**/


if (ljType == "U") {
	// Fie.  Make a new table.
	var ljNewInfo = document.createElement("table");
	ljNewInfo.setAttribute("border", "0");
	ljNewInfo.setAttribute("width", "100%");
	ljNewInfo.setAttribute("cellpadding", "5");
	ljNewInfo.setAttribute("cellspacing", "-1");

	tmp1 = document.createElement("tr");
	tmp1.style.verticalAlign = "top";

	var ljServices = getElementsByClassName(document, "div", "external_services")[0];
	if (ljServices) { ljServices = ljServices.innerHTML; }
	var ljInfo = getElementsByClassName(document, "div", "userinfo")[0].innerHTML;
	ljInfo = ljInfo.replace(/<th>/g, "<th style=\"color: #444; text-align: right;\">");
	var ljSchools = getElementsByClassName(document, "div", "schools")[0];
	if (ljSchools) { ljSchools = ljSchools.innerHTML; }
	var ljContact = getElementsByClassName(document, "div", "contact")[0].innerHTML;
	
	if (ljServices) {
		var tmp = getElementsByClassName(document, "div", "external_services")[0];
		tmp.parentNode.removeChild(tmp);
	}
	tmp = getElementsByClassName(document, "div", "schools")[0];
	if (ljSchools) { tmp.parentNode.removeChild(tmp); }

	tmp2 = document.createElement("td");
	tmp2.style.width = "50%";
	tmp2.innerHTML = ljInfo + "<br />";
	if (ljServices) { tmp2.innerHTML += ljServices; }
	tmp1.appendChild(tmp2);

// For reasons that elude me, the LJ Talk image loves borders.  :p
	for (x = 0; x < tmp1.getElementsByTagName("img").length; x++) {
		tmp1.getElementsByTagName("img")[x].style.border = "0";
	}
	
	tmp2 = document.createElement("td");
	tmp2.innerHTML = ljContact + "<br />";
	if (ljSchools) { tmp2.innerHTML += ljSchools; }
	tmp1.appendChild(tmp2);

	ljNewInfo.appendChild(tmp1);
	document.getElementById("basics_body").innerHTML = '<table>' + ljNewInfo.innerHTML + '</table>';

	// Rename the Interests section.
	tmp = document.getElementById("interests_body").childNodes[0];
	if (tmp) {
		tmp = tmp.innerHTML.split(" (")[0];
		document.getElementById("interests_header").childNodes[1].nodeValue = 
			' ' + document.getElementById("interests_body").childNodes[0].innerHTML.split(" (")[0];
	}
}

/* ***
*/

// Code from: http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all :
        oElm.getElementsByTagName(strTagName);

    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];     
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

// Code from: http://www.expertsforge.com/Web-Development/Tutorial-217.asp
function Left(str, n) {
   if (n <= 0)
         return "";
   else if (n > String(str).length)
         return str;
   else
         return String(str).substring(0,n);
}

// Code from: http://www.expertsforge.com/Web-Development/Tutorial-218.asp
function Right(str, n) {
      if (n <= 0)
          return "";
      else if (n > String(str).length)
          return str;
      else
   {
          var iLen = String(str).length;
          return String(str).substring(iLen, iLen - n);
      }
}

// Code from: http://snipplr.com/view.php?codeview&id=8329
function trim(str) {
    while('' + str.charAt(0) == ' ') {
        str = str.substring(1, str.length);
    }
    while('' + str.charAt(str.length-1)==' ') {
        str = str.substring(0, str.length-1);
    }
    return str;
}
