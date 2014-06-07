// ==UserScript==
// @name          No Ads on Rapidshare by Erdinc
// @namespace     http://www.cithiz.com/
// @description	  Very clean download page, countdown timer
// @include       http://*
// @exclude       http://*.js*
// @exclude       http://userscripts.org/scripts/source/*
// @version       1.28
// @What's New : Removed Game banner

// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
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

/* ********************************************************************
                          Script Features

        - Download Page cleanup.
        - Auto-clicks the free button.
        - Download alert. Whenever you wait for a download, or between downloads,
        you'll be alerted when the wait is over.
        - Timer in the title (optional, to turn off set a boolean value named
          greasemonkey.scriptvals.Jillian/Rapidshare Bundle.timerInTitle
          to false.
   ******************************************************************** */

// History:
// v1.28  Removed Game banner
// v1.27  Focus on accesscode field so you don't have to click on it
// v1.26  Fixed alert when ready to download
// v1.25  Added Auto Update thanks to alien_scum's MonkeyBarrel Google script http://userscripts.org/scripts/show/8124
//	  I've added a "what's new" and version info to the auto update dialog box
// vE1.24 fixed for new layout
// vE1.23 small changes
// vE1.22 small changes
// vE1.21 Commented out code to modify dl button - didn't work
// vE1.2  Modified by Erdinc to show even less on the download page. Added timer in seconds
//	  Based on Jillian's Rapidshare Bundle: http://userscripts.org/scripts/show/5907
//	  Thanks Jillian, you're a better Javascript programmer than I am :)
var version=1.28;
var href = window.location.host;
var tokens = href.split('.');
n=tokens.length-2;
var query = (tokens[n].length<4 && tokens[n-1]!='www')? tokens[n-1]:tokens[n];

// Returns null if expr didn't match anything
function getFirstXPathResult(expr, node)
{
    if (!node) node = document;
    var res = document.evaluate(expr, node, null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return res.singleNodeValue;
}


// Auto-clicks the free button in the pre-download page
function clickFreeButton()
{
    var freeBtn = getFirstXPathResult("//input[@value='Free']");
    if (freeBtn) {
        freeBtn.click();
    }
}

function cleanDownloadPage()
{
            
    var tdchild = getFirstXPathResult("//p[text() = 'You have requested ']");
    if (!tdchild)
        return;


    // In the TD element, clean everything from the bottom up to the ad.
    var ad = getFirstXPathResult("following-sibling::img", tdchild);
    if (ad) {
        var td = tdchild.parentNode;
        var i = td.childNodes.length - 1;
        while (td.removeChild(td.childNodes[i]) != ad) {
            i--;
        }
    } 
    else {
        // If there's no ad (the new design) - delete the premium table
        var prmTable = document.getElementById("premiumtable2");
        prmTable.parentNode.removeChild(prmTable);
    }
    // Remove anything related to the upload form
    var ulform = getFirstXPathResult("//form[@name='ul']");
    var ulscript = getFirstXPathResult("preceding-sibling::script", ulform);
    var uliframe = getFirstXPathResult("//iframe[contains(@src, 'uploadid')]");
    if (ulform)    ulform.parentNode.removeChild(ulform);
    if (ulscript)  ulscript.parentNode.removeChild(ulscript);
    if (uliframe)  uliframe.parentNode.removeChild(uliframe);

    h2 = document.getElementsByTagName('h2');
    if (h2) { h2[0].parentNode.removeChild(h2[0]); };
	hdr = document.getElementsByTagName('div');
	if (hdr) { hdr[1].parentNode.removeChild(hdr[1]); };
	ft = document.getElementById("footer");
	if (ft) { ft.innerHTML = ''; };
	ul = document.getElementsByTagName('ul');
	if (ul) { ul[0].parentNode.removeChild(ul[0]); };
	//ifr = document.getElementsByTagName('iframe');
	//if (ifr) { ifr[0].parentNode.removeChild(ifr[0]); };
       	var  tables = document.getElementsByTagName('table');
	if (tables.length) {
	tables[0].parentNode.removeChild(tables[0]);
	};
	imgs = document.getElementsByTagName('img');
	if (imgs) { imgs[0].parentNode.removeChild(imgs[0]); };


    	pe = document.getElementsByTagName("p");
    if (pe) {	
	dld= pe[3].innerHTML;
//alert(dld.substr(0 ,15));
	if (dld.substr(0 ,15) == 'Your IP-address') {
		pe[0].innerHTML = '<B>Already Downloading! Will automatically reload this page in a minute...';
		pe[3].innerHTML = '';
		setTimeout(function(){
			pe[0].innerHTML = 'reloading..';
			window.location=document.referrer;
		 	}
		 	,60000); 
	 }
	else {
	    var dlt = getFirstXPathResult("//*[contains(text(), 'Download-Ticket reserved')]");
	    if (dlt) {
		var pl = dlt.parentNode;
		pe[0].innerHTML = 'Hang on, almost there';
		var int1 = setInterval("if (self.c && c > 3) { document.title = c.toFixed(0)+ ' Seconds'; }", 1000);
		var int2 = setInterval("if (self.c && c <= 2) {clearInterval(int1); clearInterval(int2);}", 400);
	        }
	    else { pe[0].innerHTML = ''; };
	    //pe[2].innerHTML = '';
	};
	pe[1].innerHTML = '';
     };

}

// Alerts the user when the waiting time is over
function waitUntilReady()
{
     pollFormCreation();
  
    // Wait for the script to create the form
    function pollFormCreation()
    {

        if (document.forms.namedItem("dl")) {
		var h = document.getElementsByTagName('body')[0];
		if (h) { h.setAttribute('onload','document.getElementsByTagName(\'input\')[10].focus();')};
		alert('Ready to download');
        }
        else {
            setTimeout(pollFormCreation, 2000);
        }
    }
}

var putTimerInTitle = true;
// Alerts the user when the wait between downloads is over
function waitToDownloadAgain()
{
    var font = getFirstXPathResult("//*[contains(text(), 'reached the download-limit')]");
    if (!font)
        return;
    var p = font.parentNode;
    var minutes = Number(p.textContent.match(/or wait (\d+) minutes?/i)[1]);
    // Create a span to hold the time ticker
   p.innerHTML = "Time left: <span id='timer' style='font-weight: bold; color: grey; font-size: larger'></span>";

    var timeReady = new Date();
    timeReady.setMinutes(timeReady.getMinutes() + minutes);
    waitTimeoff();

    function waitTimeoff()
    {
        var now = new Date();
        if (now < timeReady) {
            var left = new Date(timeReady - now);
            // Match hours only if not 00
            var strTime = left.toUTCString().match(/(0[1-9]:)?\d\d:\d\d /)[0];
            document.getElementById("timer").textContent = strTime;
            if (putTimerInTitle) {
                document.title = "RS: " + strTime;
            }
            setTimeout(waitTimeoff, 1000);
        }
        else {
//            alert("Time has passed - you can download again.");
            history.back();
        }
    }
}

try {
    putTimerInTitle = GM_getValue("timerInTitle", true);
}
catch (e) {}

// As each of the following functions has its own validity checks,
//  they will only perform their task when appropriate.
if (location.href.match(/rapidshare/)) {
clickFreeButton();
cleanDownloadPage();
waitUntilReady();
waitToDownloadAgain();
}

function getValue(query) {
  return eval(GM_getValue('cache','({})'))[query];
}

function setValue(query,value) {
  var values=eval(GM_getValue('cache','({})'));
  values[query]=value;
  GM_setValue('cache', uneval(values));
}

function xhr(uri,f) {GM_xmlhttpRequest({method: 'get',headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},url: uri,onload:function(res){f(res.responseText)}});}

function cur(date) {return (date==undefined || (new Date()-date)/(1000*60*60*24)>1)}

if(window == window.top) {
  oldnum=num=getValue(query+'-num');
  date=getValue(query+'-checked');
  updt=getValue(query+'-updated');
  dif=(new Date()-updt)/(1000*60*60*24);

}
if(cur(getValue('install_date'))) xhr('http://userscripts.org/scripts/source/5067',function(res){
 try {
  setValue('install_date',new Date());
  var v=parseFloat(res.match(/version=\s*(\d+\.?\d*)/)[1]);
  if (v>version) {
    var wn=res.match(/What\'s New (?:.*)/);
    alert('A new version of the "No Ads on Rapidshare" script is available.\nYour version: '+version+'. New version: '+v+'\n'+ wn); 
    location.replace('http://userscripts.org/scripts/source/5067.user.js'); 
  }
 } catch(e){}
});
