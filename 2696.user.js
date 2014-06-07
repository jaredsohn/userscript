// Friend of Print-Friendly
// version 2.1
// 21 January 2006
// Latest version by Eugene <eugene.vasserman at gmail.com>
//
// Latest version of 2.0 branch is available on: http://www.samuelooi.com
// [Eugene]: Offline, as far as I know
//
// [Eugene]: Latest version of 2.1 branch is available at:
// [Eugene]: https://userscripts.org/scripts/show/2696/
//
// ==UserScript==
// @name Friend of Print-Friendly v2.1
// @namespace http://wiki.samuelooi.com/wikka.php?wakka=FriendofPrintFriendly
// @description Read the news, not something else.
// @include http://*
// @include https://*
// ==/UserScript==

var r; var rr;

// Eugene
// name: BetaNews
// namespace: http://wiki.samuelooi.com/wikka.php?wakka=FriendofPrintFriendly
// description: Printer-friendly
r = new RegExp("http\:\/\/www.betanews.com");
rr = new RegExp("http\:\/\/betanews.com");
if (r.exec(document.location) || rr.exec(document.location)) {
	var a = document.evaluate("//a[contains(@href,'/print/')]", document, null, 0, null).iterateNext();
	var b = new RegExp("\/print\/");  
	if (a != null && !b.exec(document.location)) window.location = a;
}

// Eugene
// name: Science Blog
// namespace: http://wiki.samuelooi.com/wikka.php?wakka=FriendofPrintFriendly
// description: Printer-friendly
r = new RegExp("http\:\/\/www.scienceblog.com");
rr = new RegExp("http\:\/\/scienceblog.com");
if (r.exec(document.location) || rr.exec(document.location)) {
	var a = document.evaluate("//a[contains(@href,'/print')]", document, null, 0, null).iterateNext();
	var b = new RegExp("\/print\/");  
	if (a != null && !b.exec(document.location)) window.location = a;
}

// Eugene
// name: BBC News
// namespace: http://wiki.samuelooi.com/wikka.php?wakka=FriendofPrintFriendly
// description: Printer-friendly
r = new RegExp("http\:\/\/news.bbc.co.uk");
if (r.exec(document.location) || rr.exec(document.location)) {
	var a = document.evaluate("//a[contains(@href,'/print/')]", document, null, 0, null).iterateNext();
	var b = new RegExp("\/print\/");  
	if (a != null && !b.exec(document.location)) window.location = a;
}

// Eugene
// name: Business Journal
// namespace: http://wiki.samuelooi.com/wikka.php?wakka=FriendofPrintFriendly
// description: Printer-friendly
r = new RegExp("http\:\/\/www.bizjournals.com");
rr = new RegExp("http\:\/\/bizjournals.com");
if (r.exec(document.location) || rr.exec(document.location)) {
	var a = document.evaluate("//a[contains(@href,'t=printable')]", document, null, 0, null).iterateNext();
	var b = new RegExp("t=printable");
	if (a != null && !b.exec(document.location)) window.location = a;
}

// name:  Guardian
// namespace:  http://wiki.samuelooi.com/wikka.php?wakka=FpfScriptsGuardian
// description:  Printer-friendly
r = new RegExp("http\:\/\/www.guardian.co.uk");
rr = new RegExp("http\:\/\/guardian.co.uk");
if (r.exec(document.location) || rr.exec(document.location)) {
  var a = document.evaluate("//a[contains(@href,'/print/')]", document, null, 0, null).iterateNext();
  var b = new RegExp("\/print\/");  
  if (a != null && !b.exec(document.location)) window.location = a;
}

// name:  LATimes
// namespace:  http://wiki.samuelooi.com/wikka.php?wakka=FpfScriptsLATimes
// description:  Printer-friendly
r = new RegExp("http\:\/\/www.latimes.com");
rr = new RegExp("http\:\/\/latimes.com");
if (r.exec(document.location) || rr.exec(document.location)) {
  var a = document.evaluate("//a[contains(@href,',print.story')]", document, null, 0, null).iterateNext();
  var b = new RegExp("print\.story");
  if (a != null && !b.exec(document.location)) window.location = a;
}

// name:  The Register
// namespace:  http://wiki.samuelooi.com/wikka.php?wakka=FpfScriptsTheRegister
// description:  Printer-friendly
r = new RegExp("http\:\/\/(www\.)?(channel|the)register.co(m|\.uk)");
if (r.exec(document.location)) {
  var a = document.evaluate("//link[contains(@href,'print.html')]", document, null, 0, null).iterateNext();
  var b = new RegExp("print\.html");
  if (a != null && !b.exec(document.location)) window.location = document.location + 'print.html'; 
}

// name:  Soccernet.com
// original author:  http://wiki.samuelooi.com/wikka.php?wakka=FpfScriptsSoccernet
// description:  Printer-friendly
r = new RegExp("http\:\/\/soccernet.espn.go.com");
if (r.exec(document.location)) {
  var a = document.evaluate("//a[contains(@href,'/print?id=')]", document, null, 0, null).iterateNext();
  if (a != null) window.location = a;
}

// name: Washington Post
// namespace: http://wiki.samuelooi.com/wikka.php?wakka=FpfScriptsWashingtonPost
// description: Printer-friendly
r = new RegExp("http\:\/\/www.washingtonpost.com");
rr = new RegExp("http\:\/\/washingtonpost.com"); 
if (r.exec(document.location) || rr.exec(document.location)) {
  var a = document.evaluate("//a[contains(.,'Print This Article')]", document, null, 0, null).iterateNext();
  if (a != null) window.location = a;
}

// name:  Wired News
// original author:  http://www.mamata.com.br/greasemonkey
// FPF:  http://wiki.samuelooi.com/wikka.php?wakka=FpfScriptsWired
// description:  Printer-friendly
r = new RegExp("http\:\/\/www.wired.com");
rr = new RegExp("http\:\/\/wired.com");
if (r.exec(document.location) || rr.exec(document.location)) {
  var toolsDiv = document.getElementById("storyTools");
  var redirectPage = toolsDiv.getElementsByTagName("a")[0].href;
  if(redirectPage) document.location = redirectPage;
}

// name:  ZDNet.co.uk
// namespace:  http://wiki.samuelooi.com/wikka.php?wakka=FpfScriptsZDNetCoUk
// description:  Printer-friendly, Font-size
r = new RegExp("http\:\/\/news.zdnet.co.uk"); 
if (r.exec(document.location)) {
  var b = document.evaluate("//a[contains(@href,'/print/?')]", document, null, 0, null).iterateNext();
  if (b != null) window.location = b;
}

r = new RegExp("Printer friendly"); 
rr = new RegExp("http\:\/\/www.zdnet.co.uk"); 
if (r.exec(document.title) && rr.exec(document.location)) {
  y = document.getElementsByTagName("P");
  for (var i=1; i<y.length; i++) {
    theStyle = y[i].getAttribute("style");
    if(theStyle == null) theStyle = "";
    else
	  theStyle += ";";
      theStyle += "font-size:15px;";
      y[i].setAttribute("style",theStyle);
  }
}
