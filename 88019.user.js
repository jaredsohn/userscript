// ==UserScript==
// @name           Better ToodleDo Slim
// @namespace      Pi
// @include        http://*.toodledo.com/slim/*
// @include        https://*.toodledo.com/slim/*
// @include        http://*.google.*/calendar/*
// @include        https://*.google.*/calendar/*
// @version        3.0
// @require        http://sizzlemctwizzle.com/updater.php?id=88019&days=1
// ==/UserScript==


//***************************************************************************
var GM_KEY_PREFIX = "GM_KEY_";
var MAX_DAYS = 5000;
var isChrome = (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0);

if(isChrome)
{
    GM_log = function (message) { console.info(message);}
}

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




//Auto refresh
refreshInterval = GM_GlobalGetValue("refresh_interval", 60);

GM_GlobalSetValue("refresh_interval", refreshInterval);

//Another link item in settings
var settings = document.getElementById('set');
var furtherSettingsNode = null, lnkSetRefreshInterval = null, liEL = null;

clickObject = function(obj)
{
    var clickEvent = window.document.createEvent("MouseEvent");
    clickEvent.initEvent("click", true, true);
    obj.dispatchEvent(clickEvent);
};

something = function()
{
    var time = prompt("Input Auto-refresh interval in seconds (0 to disable it.)");
    if(isNaN(time) || time < 0)
        time = 0;
    GM_GlobalSetValue("refresh_interval",time);
   
    //Probably silly, but just to ensure that it is set properly
    refreshInterval = GM_GlobalGetValue("refresh_interval", 60);
    displayRefreshInterval();
    // if(refreshInterval > 0)
        // GM_log("Auto refresh interval set to " + refreshInterval + " seconds.");
    // else
        // GM_log("Auto refresh disabled.");
       
    //Just click somewhere so that the link is verified again (DoTestAgain will be called).
    clickObject(document.body);
};

if(settings)
{
    furtherSettingsNode = settings.lastChild.previousSibling;
    lnkSetRefreshInterval = document.createElement('a');
    lnkSetRefreshInterval.href = "#";
    lnkSetRefreshInterval.class = "alf";
    //lnkSetRefreshInterval.innerHTML = "<img src='/images/icons/refresh.gif' width='16' height='16' class='rs' /> Better ToodleDo Refresh Interval" + " (current value : " + refreshInterval + " seconds.)";
    displayRefreshInterval();
    lnkSetRefreshInterval.addEventListener('click', something, false);
    liEL = document.createElement('li');
    liEL.appendChild(lnkSetRefreshInterval);
    settings.insertBefore(liEL,furtherSettingsNode);
}

function displayRefreshInterval()
{
    if(lnkSetRefreshInterval)
    {
        if(refreshInterval > 0)
            lnkSetRefreshInterval.innerHTML = "<img src='/images/icons/refresh.gif' width='16' height='16' class='rs' /> Better ToodleDo Refresh Interval" + " (current value : " + refreshInterval + " seconds.)";
        else
            lnkSetRefreshInterval.innerHTML = "<img src='/images/icons/refresh.gif' width='16' height='16' class='rs' /> Better ToodleDo Refresh Interval" + " (current value : disabled.)";
    }
};


var refreshEnabled = false;
var lastURL = new String("");
var url = new String(window.location.href);
var debug = false;
var debugCal = false;

if(debugCal)
    GM_log("url: " + url);

var slimHere = false;
var calendarDone = false;
var doTestCounter = 0;
var calendarTry = 0;
var MAX_CALENDAR_TRIES = 50;
var CALENDAR_RETRY_INTERVAL = 200;

function AreSameStrings(a, b, message)
{
    // GM_log("Input 1: " + a);
    // GM_log("Input 2: " + b);
    if(a.length != b.length)
    {
        if(message)
            GM_log('length not same');
        return false;
    }
    for(i = 0; i < a.length; i++)
    {
        if(a[i] != b[i])
        {
        if(message)
            GM_log('not same at ' + i + 'th char');
        return false;
        }
    }
   
    return true;
       
}

function isNotEditTask(string)
{
    //even though it's alraedy upper case, just to be sure.
    string = string.toUpperCase();
    if(string.indexOf("_I") < 0) //cannot be an edit task
        return true;
    string = string.replace("#","").replace("_","").replace("I","");
    if(string.length == 0)
        return true;
    return isNaN(string);
}           
       
function DoTestAgain()
{
    //if(debug) GM_log('clicked');
    doTestCounter++;

    url = new String(window.location.href);
    //GM_log("window.location = " + url + "\n");

    var count = 0;
    // if(url == lastURL)
    if(AreSameStrings(url, lastURL,false) || url.indexOf("#") < 0 )
    {
        //we've just clicked. Give the browser some time to change the URL
        function checkURLAgain()
        {
            url = new String(window.location.href);
            if(count++ < 20)
            {
                if((AreSameStrings(url, lastURL,false) || url.indexOf("#") < 0))
                {
                    if(debug) GM_log("checking URL again " + count);
                    setTimeout(checkURLAgain, 100);
                }
                else
                {
                    if(debug)
                        GM_log('calling again');
                    DoTestAgain();
                }
            }
        }
       
        checkURLAgain();
    }
   
    if(AreSameStrings(url, lastURL, false))
        return;
       
    lastURL = url;
    //GM_log('testing again. URL: ' + url);
    var anchor = new String(url.toUpperCase());
    var anchorIndex = url.toUpperCase().indexOf("#");
    if(anchorIndex > 0)
        anchor = anchor.substr(anchorIndex + 1);
        //GM_log(anchor);
    if(
        anchor.indexOf("_ADD") < 0 &&
        anchor.indexOf("_SET") < 0 &&
        anchor.indexOf("_TOP") < 0 &&
        anchor.indexOf("_DEF") < 0 &&
        anchor.indexOf("_FOLDERS") < 0  &&
        anchor.indexOf("_CONTEXTS") < 0  &&
        anchor.indexOf("_LDUEDATE") < 0 &&
        anchor.indexOf("_PRIS") < 0 &&
        anchor.indexOf("_TAGS") < 0 &&
        isNotEditTask(anchor) &&
        anchor.length > 0
    )
    {
        refreshEnabled = true;
        var refreshInterval = GM_GlobalGetValue("refresh_interval", 60);
        if(debug)
            GM_log('refresh Enabled on ' + anchor + ' with interval ' + refreshInterval);
        if(refreshInterval > 0)
            setTimeout(refreshTasks, refreshInterval * 1000);
    }
    else
    {
        refreshEnabled = false;
        if(debug)
            GM_log('refresh DISABLED on ' + anchor);
    }
};

function refreshTasks()
{
    if(refreshEnabled)
        window.location.reload();
}

function DoCalendarOnLoad()   
{
    var frames = document.getElementsByTagName('iframe');
    if(debugCal)
        GM_log("frames : " + frames.length);
    for(i = 0; i < frames.length; ++i)
    {
        var source = frames[i].src;
        //GM_log(source);
        if(source.toUpperCase().indexOf('TOODLEDO') >= 0)
        {
            frames[i].setAttribute('scrolling', 'yes');
            calendarDone = true;
            if(debugCal)
                GM_log("done after trying : " + calendarTry + "times" );
            break;
        }
    }
    if(!calendarDone && calendarTry++ < MAX_CALENDAR_TRIES)
        setTimeout(DoCalendarOnLoad, CALENDAR_RETRY_INTERVAL);
}

if(url.toUpperCase().indexOf("TOODLEDO.COM/SLIM") >= 0)
{
    slimHere = true;
    DoTestAgain();
	document.addEventListener('click',DoTestAgain,false);
}
else if(url.toUpperCase().indexOf("GOOGLE.COM/CALENDAR") >= 0)
{   
	window.addEventListener('load',DoCalendarOnLoad,false);
    //Huh ! Chrome sometimes loads scripts when the window has already finished loading(due to performance reasons)
    //So we'll keep on waiting for onload fire, will never happen.
    DoCalendarOnLoad();
}