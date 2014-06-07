// ==UserScript==
// @name Google Calendar Link Adder
// @namespace gCalLinkAdd
// @description Searches a page for dates and creates a link to easily add them to Google Calendar
// @include *
// @exclude https://www.google.com/calendar/*
// @exclude http://www.google.com/calendar/*
// @version 1.0.1
// ==/UserScript==

//Sourced From: http://userscripts.org/scripts/review/38475
//Add jQuery  
var GM_JQ = document.createElement('script');  
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';  
GM_JQ.type = 'text/javascript';  
document.getElementsByTagName('head')[0].appendChild(GM_JQ);  

//Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	}
	else {
		$ = unsafeWindow.jQuery;
		letsJQuery();
	}
}
GM_wait();

function letsJQuery() {
	$(document).ready(function(){
		createJqueryMethods();
	
		//updateCheck(forced);
		createLinkSection();
		createLinkHandler();
		regExScanForDate();

	});
}

//$(document).ready(function(){
//	//updateCheck(forced);
//	createLinkSection();
//	createLinkHandler();
//	regExScanForDate();
//});

function createJqueryMethods() {	
	//http://refactormycode.com/codes/341-jquery-all-descendent-text-nodes-within-a-node#refactor_12159
	$.fn.textNodes = function() {
	  var ret = [];
	  $.each(this[0].childNodes, function() {
		  if ( this.nodeType == 3 || $.nodeName(this, "br") ) 
			ret.push( this );
		  else $.each(this.childNodes, arguments.callee);
	  });
	  return $(ret);
	};
}

function regExScanForDate() {
	var dateRegEx = new Array();
	dateRegEx.push(/\d{1,2}(\-|\/|\.)\d{1,2}(\-|\/|\.)\d{4}/g);
	dateRegEx.push(/(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?)\ 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Sep|Nov|Dec)(ember)?)\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/g);
	
	var regExResults = new Array();
	for(var i in dateRegEx) {
		var results = document.body.innerHTML.match(new RegExp(dateRegEx[i]));
		regExResults = regExResults.concat(results);
	}

	regExResults = unique(regExResults);
	
	for(var i in regExResults) {
		var textNodeList = $("body").textNodes();
		textNodeList.not(exclusionNodes());
		
		for(var textNode in textNodeList) {
			var curNode = textNodeList[textNode];
			if(curNode==null || curNode.data==null || curNode.data.indexOf(regExResults[i])==-1) {
				continue;
			}
			replaceAll(curNode, regExResults[i], createSpanDate(regExResults[i]));
		}
	}	
}


function createLinkHandler() {
	var timer;
	$(".gcalDate").live('mouseenter', function() {
		clearTimeout(timer);
		var curObj = $(this);
		var calDate = new Date(curObj.attr("year"), curObj.attr("month"), curObj.attr("day"),11,59,0);
		var googleHref = "http://www.google.com/calendar/event"
			+ "?action=TEMPLATE"
			+ "&text=" + encodeURIComponent(document.title)
			+ "&details=" + encodeURIComponent("Sourced from " + document.URL)
			+ "&dates=" + dateToString(calDate) +"/" + dateToString(calDate)
		    + "&sprop=website:" + encodeURIComponent(document.URL)
		    + "&sprop;=name:" + encodeURIComponent(document.title);
		
		$("#googleLinkBoxHref").attr("href", googleHref);
		$("#googleLinkBox").css("visibility","visible");
		$(this).css("color","red");
	});
	
	$(".gcalDate").live('mouseleave', function() {
		$(this).css("color","black");
		timer=setTimeout(function () {$("#googleLinkBox").css("visibility","hidden");},8000);
	});
}

function createLinkSection(){
	var googleLinkBox = ""
		+ "";
	$("body").prepend(googleLinkBox);
}

//Date as yyyymmddThhmm00 format
function dateToString(date) {
  return '' + date.getFullYear() + lpad('' + (1 + date.getMonth()), 2, "0") + lpad('' + date.getDate(), 2, "0"); 
}

// Left pad a string
function lpad(str, len, chr) {
  while(str.length < len) {
    str = chr + str;
  }
  return str;
}

//http://www.martienus.com/code/javascript-remove-duplicates-from-array.html
function unique(a)
{
   var r = new Array();
   o:for(var i = 0, n = a.length; i < n; i++) {
      for(var x = 0, y = r.length; x < y; x++)  {
         if(r[x]==a[i]) continue o;
      }
      r[r.length] = a[i];
   }
   return r;
}


function exclusionNodes() {
	var returnArray = new Array();
	$.each($(".gcalDate"), function() {
		returnArray = returnArray.concat($(this).textNodes());
	});
	return returnArray;
}

function createSpanDate(strdate) { 
	if(!Date.parse(strdate)) {
		return strdate;
	}
	var gdate = new Date(strdate);
	var spanString = "";
	
	return spanString;
}

//http://naspinski.net/post/Javascript-replaceAll-function.aspx
//http://james.padolsey.com/javascript/replacing-text-in-the-dom-its-not-that-simple/
function replaceAll(textNode, replace, with_this) {
	if(textNode.data==null) {
		return;
	}
	var temp = document.createElement('div');
	temp.innerHTML = textNode.data.replace(new RegExp(replace, 'g'),with_this);
	while(temp.firstChild) {
		textNode.parentNode.insertBefore(temp.firstChild, textNode);
		
	}
	textNode.parentNode.removeChild(textNode);
