// ==UserScript==
// @name           ToodleDo Search Tab Counts
// @namespace      Pi
// @include        http://www.toodledo.*/views/search.php*
// @include        https://www.toodledo.*/views/search.php*
// @version        3.7
// @require        http://sizzlemctwizzle.com/updater.php?id=88390&days=1
// ==/UserScript==


//***************************************************************************
var GM_KEY_PREFIX = "GM_KEY_";
var MAX_DAYS = 5000;
var isChrome = (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0);
var debug = false;
if(isChrome)
{
    GM_log = function (message) { console.log(message);};
}

log = debug ? GM_log : function(message) {};

function GM_GlobalSetValue(key, val)
{
    var gmFound = false;
    try
    {
        if(GM_setValue && !isChrome) // to increase the problems, Chrome defines the method and says "not supported".
        {
            GM_setValue(key, val);
            gmFound = true;
        }
    }
    catch(ex)
    {
        //I hate you Google Chrome.
    }
   
    if(!gmFound)
    {
        //work around using cookies.
        createCookie(GM_KEY_PREFIX + key, val, MAX_DAYS);
    }
}

function GM_GlobalGetValue(key, defaultValue)
{
    var returnValue = defaultValue;
    var gmFound = false;
    try
    {
        if(GM_getValue && !isChrome)
        {
            returnValue = GM_getValue(key, defaultValue);
            gmFound = true;
        }
    }
    catch(ex)
    {
		//do nothing
    }
    if(!gmFound)
    {
		var cookieTry = readCookie(GM_KEY_PREFIX + key);
		if(cookieTry)
		{
			returnValue = cookieTry;
			if(returnValue == "false") //most probably, we wanted this. 
				returnValue = false;
			else if(returnValue == "true")
				returnValue = true;
		}
    }

    return returnValue;
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
//***************************************************************************






var foundSearchesPattern = /(\d+) To-dos? sorted by/i;
var forgetTabNumPattern = /forget=(-?\d+)/;
var INCLUDED_IN_COUNT = 'includedInCount';

url = new String(location.href);
url = url.toLowerCase();
var lastClickedTabNum = null;
var lastClickCountEnabled = false;
var defaultOpenTabNum = null;
var head;
var searchesDone = 0;
var totalValidDivCount = 0;

log(url);

var index = url.indexOf('search.php');
if(index >= 0)
{
	//First of all, save the default open search tab. ToodleDo seemingly changes tab when searching. 
	defaultOpenTabNum = GetTabNumFromForgetSearchLink();
	// alert(defaultOpenTabNum);
	log("*** Default open tab : " + defaultOpenTabNum);
	searchStatus = document.getElementById('status');
	searchStatus.addEventListener('DOMNodeInserted', OnNodeInserted, false);
	//huh ... doing this extra step just for chrome ... 
	tasksDiv = document.getElementById('tasks');
	tasksDiv.addEventListener('DOMNodeInserted', OnNodeInserted, false);
	
	var tabsDiv = document.getElementById('tabs');
	if(tabsDiv)
	{
		var tabs = tabsDiv.childNodes;
		var arrValidTabs = new Array();
		for(i = 0; i < tabs.length; ++i)
		{
			var thisDiv = tabs[i];
			if(thisDiv.tagName.toLowerCase() != 'div')
				continue;
			var tabNum = thisDiv.getAttribute("val");
			if(tabNum < 0)
				continue;
			var tabLink = GetFirstLinkChild(thisDiv);
			if(tabLink)
				tabLink.addEventListener('click', AnotherClickEvent, false);
			if(GM_GlobalGetValue(INCLUDED_IN_COUNT + tabNum, false))
				arrValidTabs.push(thisDiv);
		}
		totalValidDivCount = arrValidTabs.length;
		log("totalValidDivCount: " + totalValidDivCount);
		for(i = 0; i < arrValidTabs.length; ++i)
		{
			var tabNum = arrValidTabs[i].getAttribute("val");
			appendTabNum(tabNum);
		}
	}
}

checkShowIncludedInCount();

function OnNodeInserted(e)
{
	var target = e.target;
	var matchString; 
	if(target.parentNode.id == 'status' && target.nodeType == 3/*text*/ && target.nodeValue.length > 0)
		matchString = target.nodeValue;
	else if(target.nodeName.toLowerCase() == 'h3' && target.id == 'newstatus') // I hate you Chrome, again. 
		matchString = target.innerHTML;
	else
		return;
	log('useful node inserted ' + e.target.nodeName + ", matchString: " + matchString);
		
	var match = foundSearchesPattern.exec(matchString);
	if(match.length > 1)
	{
		var matchedValue = match[1];
		// alert('node inserted ' + matchedValue);
		//var tabNum = searchStatus.getAttribute('i');
		tabNum = lastClickedTabNum;
		log('getting tab num in node inserted: ' + tabNum);
		if(tabNum > 0)
		{
			var tabDiv = document.getElementById('tab' + tabNum);
			if(tabDiv)
			{
				// if(GM_GlobalGetValue(INCLUDED_IN_COUNT + tabNum, false))
				if(lastClickCountEnabled)
					replaceCount(tabDiv, matchedValue);
				lastClickedTabNum = null;
			}
		}
	}
}

function switchTab(tabNum)
{
	location.href = "javascript:swap_tabs('" + tabNum + "');void(0);";
}

function appendTabNum(tabNum)
{
	log('calling for tab number ' + tabNum);
		
	var tabURL = url.substring(0,index + 10) + "?i=" + tabNum;
	var thisDiv = document.getElementById('tab' + tabNum);
	log("tabURL = " + tabURL);
				
	GM_xmlhttpRequest({
	  method: "GET",
	  url: tabURL,
	  onload: function(response) {
		if(response.responseText.length > 0)
		{
			var match = foundSearchesPattern.exec(response.responseText);
			if(match.length > 1)
			{
				var matchedValue = match[1];
				log(matchedValue + ", " + tabNum);
				log('*** called gxml with ' + thisDiv.id + ' matched value : ' + matchedValue + ", " + tabNum);
				replaceCount(thisDiv, matchedValue);
			}
			log('searches Done' + (++searchesDone) + ', totalValidDivCount : ' + totalValidDivCount + ", " + "currentTabNum; " + GetTabNumFromForgetSearchLink() + ', defaultOpenTabNum ' + defaultOpenTabNum);
			if(searchesDone >= totalValidDivCount && (parseInt(defaultOpenTabNum, 10) > 0 || parseInt(defaultOpenTabNum, 10) == -9))// && GetTabNumFromForgetSearchLink() != defaultOpenTabNum)
			{
				log('trying to switch tabs as searches done : ' + searchesDone + ", currentTabNum: " + GetTabNumFromForgetSearchLink() + ', defaultOpenTabNum ' + defaultOpenTabNum);
				switchTab(defaultOpenTabNum);
			}
		}
	  }
	});
}

function replaceCount(tabDiv, count)
{
	log('came to replaceCount with tabDiv ' + tabDiv.id + ' count ' + count);
	var tabLink = GetFirstLinkChild(tabDiv);
	if(!tabLink)
		return;
	log('continue with tabDiv ' + tabDiv.id);
	var iEl = document.getElementById("i" + tabDiv.id);
	if(!iEl)
	{
		iEl = document.createElement('i');
		iEl.id = "i" + tabDiv.id;
		tabLink.appendChild(iEl);
	}
	iEl.innerHTML = " (" + count + ")";
	
}

function GetFirstLinkChild(tabDiv)
{
	var childrenOfThisDiv = tabDiv.childNodes;
	if(childrenOfThisDiv)
	{
		for(j = 0; j < childrenOfThisDiv.length; ++j)
		{
			if(childrenOfThisDiv[j].tagName.toLowerCase() == 'a')
			{
				log('Found link child with id: ' + childrenOfThisDiv[j].id);
				return childrenOfThisDiv[j];
			}
		}
	}
	
	return null;
}

function AnotherClickEvent(e)
{
	divElement = e.target.parentNode;
	if(e.target.tagName.toLowerCase() == 'i')
		divElement = e.target.parentNode.parentNode;
	lastClickedTabNum = divElement.getAttribute('val');
	log('clicked on ' + e.target.tagName + ", tab num  " + lastClickedTabNum);
		
	checkShowIncludedInCount();
		
}

function checkShowIncludedInCount()
{
	var filterRow = document.getElementById('filtertask');
	if(!filterRow)
		return;
	var currentTabNum = GetTabNumFromForgetSearchLink();
	if(currentTabNum < 0)
		return;
		
	var checkBox;
	checkBox = document.getElementById(INCLUDED_IN_COUNT);
	if(!checkBox)
	{
		checkBox = document.createElement('input');
		checkBox.type = "checkbox";
		checkBox.id = INCLUDED_IN_COUNT;
		checkBox.addEventListener('click', SetIncludedInCount, false);
		text = document.createTextNode(' Show tab count for this search ');
		span = document.createElement('span');
		span.innerHTML = '&nbsp;&nbsp;&nbsp;';
		filterRow.appendChild(span);
		filterRow.appendChild(checkBox);		
		filterRow.appendChild(text);

	}
	
	lastClickCountEnabled = GM_GlobalGetValue(INCLUDED_IN_COUNT + currentTabNum, false);
	checkBox.checked = lastClickCountEnabled;
		
}

function GetTabNumFromForgetSearchLink()
{
	var currentTabNum = -1;
	var forgetSearch = document.getElementById('forgetsearch');	
	if(forgetSearch)
	{
		var match = forgetTabNumPattern.exec(forgetSearch.href);
		if(match && match.length > 1)
			currentTabNum = match[1];
	}
	return currentTabNum;
}

function SetIncludedInCount()
{		
	tabNum = GetTabNumFromForgetSearchLink();
	// alert('got in checkbox for search number ' + tabNum + ', will set it to ' + document.getElementById(INCLUDED_IN_COUNT).checked);
	GM_GlobalSetValue(INCLUDED_IN_COUNT + tabNum, document.getElementById(INCLUDED_IN_COUNT).checked);
}
