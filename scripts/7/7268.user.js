/*
 *  NoDelay - Copyright (C) 2006 chr15 (chr15@mail.com)
 *  NoDelay Source code at http://userscripts.org/scripts/show/6499
 *    NoDelay is designed to be wildcard filtered through greasemonkey, and then further filtering is imposed at the 
 *    script level to allow a far greater control of script processing.
 *    NoDelay handles any subdomain and prefix, if you wanted to do further processing on the domain prefix this is 
 *    also possible via the aDomain Array, as well as further processing of the path parameters via the aPath Array.
 *  History
 *    2006.11.24..Added more scripts, and Improved NoCountdown's "depositfiles.com" script          
 *        Included support for 
 *           http://www.filesend.net     -- Taken from NoCountdown
 *           http://www.depositfiles.com -- Taken from NoCountdown -- Modified script
 *           http://www.badongo.com      -- Taken from NoCountdown
 *           http://www.megaupload.com   -- Taken from NoCountdown
 *        Added support for 
 *           http://www.mihd.net
 *           http://www.icefile.net
 *           http://www.mytempdir.com
 *           http://www.bigupload.com
 *           http://www.yousendit.com
 *           http://www.live-share.com
 *           http://www.fileho.com
 *    2006.11.27..Added more scripts, and Improved Rapidshare Bundle's "rapidshare" script          
 *        Fixed http://www.megaupload.com - just wait for the script to start the download automatically
 *        Added support for 
 *           http://www.rapidshare.com
 *           http://www.rapidshare.de
 *           http://www.oxyshare.com
 *
 *  NoDelay was inspired and is partly based on "NoCountdown!", and incorperates "Rapidshare Bundle" with some modifications.
 *  My thanks goes to Unbrained and Jillian for providing the original scripts, which NoDelay is based on.  
 *
 *    NoCountdown! - Copyright (C) 2006 Unbrained (josuicida@gmail.com)
 *    NoCountdown! Source code at http://userscripts.org/scripts/show/5949
 *
 *  Rapidshare Bundle was the source for the Rapidshare functions below, I added some changes to get the script working
 *    Rapidshare Bundle - Jillian
 *    Rapidshare Bundle Source code at http://userscripts.org/scripts/show/5907
 *
 *  This script is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public
 *  License as published by the Free Software Foundation; either
 *  version 2 of the License, or (at your option) any later version.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  General Public License for more details.
 *  http://www.gnu.org/copyleft/gpl.html
 */
// ?include			http://*

// ==UserScript== 
// @name			  NoDelay
// @namespace   userscripts.org
// @author			chr15
// @description	Removes the delay in navigating to the download links on many upload sites (v1.1.20061127.0)
// @include			http://*filesend.net/*
// @include			http://*depositfiles.com/*/files/*
// @include			http://*badongo.com/*/file/*
// @include			http://*megaupload.com/*
// @include			http://*mihd.net/*
// @include			http://*icefile.net/*
// @include			http://*mytempdir.com/*
// @include			http://*bigupload.com/*
// @include			http://*yousendit.com/*
// @include			http://*live-share.com/*
// @include			http://*fileho.com/download/*
// @include			http://*rapidshare.de/*
// @include			http://*rapidshare.com/*
// @include			http://*.rapidshare.com/*
// @include			http://*.rapidshare.de/*
// @include			http://*oxyshare.com/get/*

// ==/UserScript==

//***********************  //***********************
// Returns null if expr didn't match anything
function getFirstXPathResult(expr, node){
  if (!node) node = document;
  var res = document.evaluate(expr, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return res.singleNodeValue;
}
//***********************
function clickButton(btnText){
  var freeBtn = getFirstXPathResult("//input[@value='"+btnText+"']");
  if (freeBtn) { freeBtn.click(); }
}
//***********************  rapidshare_domain  //***********************
function rapidshare_domain_prepareDownloadLink(){
  var dlform = document.forms.namedItem("dl");
  if (!dlform) {
    GM_log("Something is wrong, the form named 'dl' should exist by now!");
    return;
  }
  var btn = dlform.elements.namedItem("actionstring"); // The submit button
  var url = dlform.action + "?actionstring=" + btn.value + "&captcha=";
  btn.value = "create link";
  dlform.addEventListener("submit", createLink, true);
 // On submit, add captcha code and create the download link
  function createLink(evt) {
    evt.preventDefault(); // Prevent form submission
    var captcha = dlform.elements.namedItem("captcha").value;
    if (captcha == "") {
      alert("You must enter the captcha code before the link can be created.");
      return;
    }
    var fullurl = url + captcha;
    dlform.innerHTML += "<a href='" + fullurl + "'><b>(alt) click to download</b></a>";
  }
}
//***********************
function rapidshare_domain_cleanDownloadPage(){
  var tdchild = getFirstXPathResult("//p[text() = 'You have requested the file ']");
  if (!tdchild) return;
  // In the TD element, clean everything from the bottom up to the ad.
  var ad = getFirstXPathResult("following-sibling::img", tdchild);
  if (ad) {
    var td = tdchild.parentNode;
    var i = td.childNodes.length - 1;
    while (td.removeChild(td.childNodes[i]) != ad) i--;
  }
  // Remove anything related to the upload form
  var ulform = getFirstXPathResult("//form[@name='ul']");
  var ulscript = getFirstXPathResult("preceding-sibling::script", ulform);
  var uliframe = getFirstXPathResult("//iframe[contains(@src, 'uploadid')]");
  if (ulform)    ulform.parentNode.removeChild(ulform);
  if (ulscript)  ulscript.parentNode.removeChild(ulscript);
  if (uliframe)  uliframe.parentNode.removeChild(uliframe);
}
//***********************
// Alerts the user when the waiting time is over
function rapidshare_domain_waitUntilReady(){
  if (unsafeWindow.c) {
    unsafeWindow.c -= 5; // a little speedup
    pollFormCreation();
  }
  // Wait for the script to create the form
  function pollFormCreation() {
    if (document.forms.namedItem("dl")) {
//            prepareDownloadLink(); // removed because this no longer allows files to be downloaded
      alert('Ready to download');
    }
    else setTimeout(pollFormCreation, 2000);
  }
}
//***********************
var putTimerInTitle = true;
// Alerts the user when the wait between downloads is over
function rapidshare_domain_waitToDownloadAgain(textData){
  var font = getFirstXPathResult("//*[contains(text(), '"+textData+"')]");
  if (!font) return;
  var p = font.parentNode;
  var minutes = 1;
  try { minutes = Number(p.textContent.match(/or wait (\d+) minutes?/i)[1]); } catch(e){ minutes = 1; };
  p.innerHTML += "<h3> If you keep this page open, you'll be alerted when you can download again.</h3>";
  // Create a span to hold the time ticker
  p.innerHTML = p.innerHTML.replace(/\d+ minutes?/i,
      "<span id='timer' style='font-weight: bold; color: grey; font-size: larger'></span>");
  var timeReady = new Date();
  timeReady.setMinutes(timeReady.getMinutes() + minutes);
  waitTimeoff();

	function waitTimeoff()  {
	  var now = new Date();
	  if (now < timeReady) {
	    var left = new Date(timeReady - now);
	    // Match hours only if not 00
	    var strTime = left.toUTCString().match(/(0[1-9]:)?\d\d:\d\d /)[0];
	    document.getElementById("timer").textContent = strTime;
	    if (putTimerInTitle) document.title = "RS (" + strTime + ")";
	    setTimeout(waitTimeoff, 1000);
	  }
	  else {
	//            alert("Time has passed - you can download again.");
	    history.back();
	  }
  }
}
//***********************  rapidshare_domain  //***********************
function rapidshare_domain(){
	try { clickButton('Free'); } catch(e){};
  rapidshare_domain_cleanDownloadPage();
  rapidshare_domain_waitUntilReady();
  rapidshare_domain_waitToDownloadAgain('already downloading a File');
  rapidshare_domain_waitToDownloadAgain('reached the download-limit');
  try { putTimerInTitle = GM_getValue("timerInTitle", true); } catch (e){};
}
//***********************
// Alerts the user when the wait between downloads is over
function megaupload_com_waitUntilReady(){//(textData){
//  var font = getFirstXPathResult("//*[contains(text(), '"+textData+"')]");
  var font = document.getElementById("download_html");
	if (!font) return;
  var p = font.parentNode;
  var seconds = 44;
  try { seconds = Number(p.textContent.match(/or wait (\d+) seconds?/i)[1]); } catch(e){ seconds = 44; };
  p.innerHTML += "<h3> Do not click the above link unless the seconds counter is at 00:00.<BR/>If you keep this page open, it will automatically start the download for you.</h3>";
  // Create a span to hold the time ticker
  p.innerHTML += "Please wait <span id='timer' style='font-weight: bold; color: grey; font-size: larger'></span> Seconds";  
  var timeReady = new Date();
  timeReady.setSeconds(timeReady.getSeconds() + seconds);
  waitTimeoff();

	function waitTimeoff()  {
	  var now = new Date();
	  if (now < timeReady) {
	    var left = new Date(timeReady - now);
	    // Match hours only if not 00
	    var strTime = left.toUTCString().match(/(0[1-9]:)?\d\d:\d\d /)[0];
	    document.getElementById("timer").textContent = strTime;
	    if (putTimerInTitle) document.title = "MU (" + strTime + ")";
	    setTimeout(waitTimeoff, 1000);
	  }
	  else {
			var x=document.body.innerHTML.replace(/\n/g, '').match(/(x\d+)=46/)[1];
			unsafeWindow.setTimeout(x+'=1', 1);
      document.location=document.getElementById("download_html").getElementsByTagName('a')[0];
//      alert('Ready to download');
	    }
	  }
}
//***********************
function megaupload_com() {
	try {
		var x=document.body.innerHTML.replace(/\n/g, '').match(/(x\d+)=46/)[1];
		unsafeWindow.setTimeout(x+'=1', 1);
/*		try {
		  var box = document.getElementById("floatingbox");
	  	box.parentNode.removeChild(box);
  	} catch(e){};*/
		unsafeWindow.setTimeout(
    	function () {
    		megaupload_com_waitUntilReady();
    }, 1000);
	} catch(e){};
}
//***********************
function depositfiles_com() {
	try { unsafeWindow.pass_gateway(0);	} catch(e){}; // Added support for the header page if it exists
	try { unsafeWindow.show_url(1);	} catch(e){};
};
//***********************
function mihd_net() {
	try { 
		unsafeWindow.getTicket(); 
	} catch(e){	
		try { 
	    document.location=document.getElementById("content").getElementsByTagName('table')[0].getElementsByTagName('tr')[1].getElementsByTagName('a')[0];
		} catch(e){};
  };
};
//***********************
function filesend_net() {
	try { unsafeWindow.time=0; } catch(e){};
}
//***********************
function badongo_com() {
	try { unsafeWindow.check_n=0; } catch(e){};
}
//***********************
function icefile_net() {
	try { unsafeWindow.seconds=1; } catch(e){};
}
//***********************
function mytempdir_com() {
	try { unsafeWindow.setTimeout('loading()', 1); } catch(e){};
	unsafeWindow.setTimeout(
		function() {
			try { 
				document.location=document.getElementById('download').getElementsByTagName('table')[0].getElementsByTagName('a')[0]; 
			} catch(e){}
		}, 1);
}
//***********************
function bigupload_com() {
	try { unsafeWindow.count=1; } catch(e){};
}
//***********************
function yousendit_com() {
	try { 
    document.location=document.getElementById("download-direct-link");
	} catch(e){};
	try { 
    document.location=document.getElementById("button-div").getElementsByTagName('a')[0];
	} catch(e){};
}
//***********************
function live_share_com() {
	try { unsafeWindow.waitingTime=1; } catch(e){};
	unsafeWindow.setTimeout(
		function() {
			try { 
				document.location=document.getElementById("download_link_btn");
			} catch(e){}
		}, 1);
}
//***********************
function fileho_com(){
	try { 
		document.location=document.getElementById("sh_link").getElementsByTagName('a')[0];
	} catch(e){};
};
//***********************
function oxyshare_com(){
	try { 
		document.getElementsByTagName('form')[0].submit();
	} catch(e){};
}
//***********************  //***********************
var idx = location.href.indexOf("://")+3;
var sDomain = location.href.substring(idx);
var idx = sDomain.indexOf("/");
sDomain = sDomain.substring(0, idx);
var aDomain = new Array();
aDomain = sDomain.split('.');
var aPath = new Array();
aPath = location.pathname.split('/');
var domain = aDomain[aDomain.length-2].toLowerCase();
//***********************
switch(aDomain[aDomain.length-1].toLowerCase()){
	case 'com':
    if (domain=='depositfiles') depositfiles_com()
    else if (domain=='badongo') badongo_com()
    else if (domain=='megaupload') megaupload_com()
    else if (domain=='mytempdir') mytempdir_com()
    else if (domain=='bigupload') bigupload_com()
    else if (domain=='yousendit') yousendit_com()
    else if (domain=='live-share') live_share_com()
    else if (domain=='fileho') fileho_com()
    else if (domain=='rapidshare') rapidshare_domain()
    else if (domain=='oxyshare') oxyshare_com()
	break;
	case 'net':
    if (domain=='mihd') mihd_net()    
    else if (domain=='filesend') filesend_net()
    else if (domain=='icefile') icefile_net()
	break;
	case 'de':
    if (domain=='rapidshare') rapidshare_domain()
	break;
}
//***********************  //***********************

