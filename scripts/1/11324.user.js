// ElectroFox Designs (Max Smiley)
// http://www.efoxdesigns.com
// GPL
//Please send any bugs / webmail url change notices to support@efoxdesigns.com    Enjoy!
//need a place to test it?  why not "http://www.efoxdesigns.com/max/downloads"?  Hover over the email link at the top...

// ==UserScript==
// @name           Mailto 2 Webmail
// @version        2.1
// @namespace      http://*
// @description    Makes "mailto" links open in your favorite web-based email account, instead of a pop-3 client (like Outlook, Eudora, Thunderbird, etc.)
// @exclude       http://mail.google.com/*
// @exclude       https://mail.google.com/*
// @exclude       about:blank
// ==/UserScript==

//--------  CONFIGURATION OPTIONS NO LONGER IN THIS FILE. Set options with Monkey Menu.  -------//

if (document.links.length < 1)
    return;

//each of the following two calls seem to add extra run-time...
GM_registerMenuCommand("Select Mail Provider", getService);
GM_registerMenuCommand("Option: Compose in New Tab", getOpenInNewTab);

var showAlert = false; //for debugging

var whichService = GM_getValue("mailto_service", "browser-set provider");
var openNewWindow = GM_getValue("mailto_newtab", "window");
var gmailDomain = GM_getValue("mailto_gapps", "");

GM_setValue("onlyonce", GM_getValue("onlyonce",0) + 1);
if (whichService == "browser-set provider" && GM_getValue("onlyonce") == 1)
{
	alert("It looks like you haven't run Mailto 2 Webmail before.\nPlease fill out the following configuration options.\nThe page may need to be reloaded for settings to take effect.\nIf you ever need to change these settings in the future, you can do so by going to\nTools->Greasemonkey->User Script Commands...");
	getService();
	getOpenInNewTab();
	GM_deleteValue("onlyonce");
	whichService = GM_getValue("mailto_service", "browser-set provider");
}

var alertText = ""; var anError = false;
var pageLinks = document.evaluate("//a[contains(@href,'ailto:')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
var currentLink;
for(var i = 0; i < pageLinks.snapshotLength; i++) {
  var mailUrl = "";
  currentLink = pageLinks.snapshotItem(i);  //rather than write pageLinks.snapshotItem(i) all over the place
  switch(whichService.toLowerCase())
  {
    case "gmail":
    mailUrl = makeGmailUrl(currentLink.href); break;   
    case "yahoo":
      mailUrl = makeYahooUrl(currentLink.href); break;
    case "hotmail":
      mailUrl = makeHotmailUrl(currentLink.href); break;
    case "aol":
      mailUrl = makeAolUrl(currentLink.href); break;
    default:
	  mailUrl = currentLink.href;
	  if (GM_getValue("mailto_service", "notyetset") == "notyetset")
	    break;
	  alertText = "Mailto 2 Webmail\nUh oh... It appears you have set the email service incorrectly.\nPlease try entering a valid email provider by clicking:\nTools->Greasemonkey->User Script Commands...->Select Mail Provider";
	  showAlert = true; anError = true;
      break;
  }
  currentLink.setAttribute('href', mailUrl);	//re-write the link here
  currentLink.setAttribute('title', "Link will go to " + whichService);   //and the title
  if (openNewWindow.toLowerCase() != "no") 
  {
    currentLink.setAttribute('target', "_blank");  //opens in a new window or tab (browser preference)
	if (openNewWindow.toLowerCase() != "default") currentLink.setAttribute('onClick',"window.open(this.href,'m_compose','width=800,height=600'); return false;"); //force new window, not new tab.
  }
}
pageLinks = null;
if (showAlert && alertText != "") alert(alertText);

function makeGmailUrl(theHref)
{
var part = "mail";
if (gmailDomain != "") part = "a/" + gmailDomain;
var compose_url = "https://mail.google.com/" + part + "/?extsrc=mailto&url=" + cleanHref(theHref);
return compose_url;
}
function makeYahooUrl(theHref)
{
var compose_url = "http://compose.mail.yahoo.com/?To=" + theHref.replace('mailto:','').replace('?','&');
return compose_url;
}
function makeHotmailUrl(theHref)
{
var compose_url = "http://mail.live.com/mail/mail.aspx?rru=compose%3faction%3dcompose%26to%3d" + theHref.replace("mailto:","").replace('?','&');
return compose_url;
}
function makeAolUrl(theHref)
{
alertText = "Mailto 2 Webmail\nSorry, Aim Mail isn't supported at this time.";
showAlert = true; anError = true;
return theHref;
}
function cleanHref(theHref)
{
    return theHref.replace('?','%3F').replace('&','%26');//.replace('subject=','Subject=').replace('Body=','body=');
}
function getService()
{
	var choice = prompt("Please enter gmail, yahoo, hotmail, or aol.", GM_getValue("mailto_service", "gmail"));
	GM_setValue("mailto_service", choice);
	if (choice.toLowerCase() == "gmail")
		getGAppsDomain();
}
function getOpenInNewTab()
{
	GM_setValue("mailto_newtab", prompt("Would you like email compositions to be opened in a new window or tab? (Requires page refresh.)\n[window/default/no]", openNewWindow));
}
function getGAppsDomain()
{
	GM_setValue("mailto_gapps", prompt("If using Google Apps, enter your domain name (example: example.com).\nOtherwise, leave this blank", GM_getValue("mailto_gapps", "")));
}