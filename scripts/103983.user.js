// ==UserScript==
// @name           Zebsy cult filter
// @namespace      zebsy.cultfilter
// @description    Excludes certain threads from US TV Shows Forum
// @include        http://forums.digitalspy.co.uk/forumdisplay.php?f=115*
// ==/UserScript==

// version 4 - Chrome compatiblity added

// HARD CODED LIST NO LONGER USED!! Configuration interface has been added
//var filterTexts = [ 'Glee', 'Wrestling', 'WWE',
//		    '90210 an under-rated show?', 
//		    'Desperate Housewives', 
//		    'Scrubs' 
//];

var LOG=true;

var _log = LOG ? function() {
  var a=Array.prototype.slice.apply(arguments);
  GM_log(a);
} : function () {};

_log("loading");

// http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}



// Read exclude list (filterTexts) from previously saved data value - this is stored on your PC by your browser
var currentExcludeListValue = GM_getValue("zebsyExcludeListKey", "Glee\nWrestling\nWWE");
currentExcludeListValueArray = currentExcludeListValue.split("\n");
//alert(currentExcludeListValueArray);
var filterTexts = currentExcludeListValueArray;
// NOTE: filterTexts can contain a blank entry, so we make sure to ignore that when checking


_log("filter texts list:");
for (var i = 0; i < filterTexts.length; i++) {
	_log("  filter " + i + " = " + filterTexts[i]);
}

String.prototype.startsWith = function(str){
    return (this.indexOf(str) === 0);
}
function ignoreThreadTitle(str) {
    for (var i = 0; i < filterTexts.length; i++) {
	// NOTE: filterTexts can contain a blank entry, so we make sure to ignore that when checking
	if (filterTexts[i].length > 0 && str.indexOf(filterTexts[i]) != -1) {
		return true; // Ignore thread
	}
    }
    return false; // Don't ignore thread
}

//alert('Hello world!');

var threadslist = document.getElementById('threadslist');

//alert('found threadslist table: ' + threadslist);

var allEles = threadslist.getElementsByTagName('A');
var removedList = "";
var removedListArray = new Array(0);
for (var i = 0; i < allEles.length; i++) {
    var thisEle = allEles[i];
    if (thisEle.id.startsWith('thread_title')) {
        //_log('thread title', thisEle.id);
	var textContent = thisEle.textContent;
	//_log('  text: ', textContent);

	if (ignoreThreadTitle(textContent)) {
		_log('    HIDING: ', textContent);
		
		//thisEle.textContent = "REMOVED!!!!!!";

		var p = thisEle.parentNode.parentNode.parentNode;
		_log ('    p', p.tagName);

		// replace child
		//var altText = document.createTextNode("Removed‚Ä¶");
    		//p.parentNode.replaceChild(altText, p);
		//p.innerHtml = "<TD>xxxx</TD>";

		// Hide child
		p.style.display = 'none';

		// Remember all removed threads
		removedList = removedList + "," + thisEle.textContent;
		removedListArray[removedListArray.length] = thisEle.textContent;
	}
    }
}

// Insert a list of removed threads after threadslist table
var newElement = document.createElement('div');
_log("Removed list", removedList);
// Build unordered list of removed threads
var removedListHtml = "<ul>";
for (var i = 0; i < removedListArray.length; i++) {
	_log("removed item: " + removedListArray[i]);
	removedListHtml	+= "<li>" + removedListArray[i] + "</li>";
}
removedListHtml	+= "</ul>";
newElement.innerHTML = "<hr>Thread Filter - Removed threads:" + removedListHtml + "<hr>";
threadslist.parentNode.insertBefore(newElement, threadslist.nextSibling);

// Add configuration form
var configDivHtml = "";
configDivHtml += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
configDivHtml += "<form id=\"zebsyConfigForm\" action=\"javascript:return false;\">";
configDivHtml += "<table><tr>";
configDivHtml += "<td>";
configDivHtml += "<textarea name=\"zebsyExcludeList2\" id=\"zebsyExcludeList\" rows=\"10\" cols=\"50\"></textarea>";
configDivHtml += "</td><td valign=\"top\">";
configDivHtml += "Please enter a number of filter strings on separate lines.<BR>";
configDivHtml += "The script will hide all threads with a title containing one of these filter strings.<BR><BR>";
configDivHtml += "Press the button to save any changes and refresh the page.";
configDivHtml += "</td>";
configDivHtml += "</tr>";
configDivHtml += "<tr><td>";
configDivHtml += "<input value=\"Save and Refresh\" type=\"submit\"></input>";
configDivHtml += "</td></tr></table>";
configDivHtml += "</form";
var newElement2 = document.createElement('div');
newElement2.innerHTML = "Thread Filter Configuration:<br>" + configDivHtml + "<hr>";
newElement.parentNode.insertBefore(newElement2, newElement.nextSibling);
// Add configuration logic
function zebsySubmitConfigForm() {
	var excludeListValue = document.getElementById('zebsyExcludeList').value;
	//alert("value to save: " + excludeListValue);
	GM_setValue("zebsyExcludeListKey", excludeListValue);
	_log("Saved - page will now refresh");
	setTimeout( "window.location.reload()", 100);
	return false;
}
var elmLink = document.getElementById('zebsyConfigForm');
elmLink.addEventListener("submit", zebsySubmitConfigForm, true);

// Init config texture value from previously saved value
document.getElementById('zebsyExcludeList').value = currentExcludeListValue;




_log("done");

