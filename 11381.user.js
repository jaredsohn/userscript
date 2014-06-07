/*
  --------------------------------------------------------------------
  How to Install a Greasemonkey Script
  --------------------------------------------------------------------

  - You need the Firefox web browser - Download and install
  http://www.mozilla.com/en-US/firefox/

  - You need to install Greasemonkey - How-To
  http://internetducttape.com/2007/08/23/howto-install-firefox-extensions-screenshots/

  - Install this script - How-To
  http://internetducttape.com/2007/08/24/howto-use-firefox-greasemonkey-userscripts-screenshots/

*/
/*
  --------------------------------------------------------------------
  Yahoo Pipe Cleaner
  --------------------------------------------------------------------
  Please link to: 
    http://internetducttape.com/tools/greasemonkey-script-yahoo-pipe-cleaner/

  Yahoo Pipes can create automated lists that you can cut-and-paste 
  into blog posts. My only real complaint is with the HTML markup they 
  create. It doesn't look good when you cut-and-paste it into a WordPress
  blog. This is where Yahoo Pipe Cleaner comes in. It is a Greasemonkey 
  script for Firefox that fixes the Yahoo Pipe output so that it looks 
  nicer when you cut-and-paste it into a WordPress blog.

    * removes any H1, H2, H3, H4, H5, H6 headers
    * dofollows the links (removes rel=nofollow)
    * replaces paragraphs with list elements
    * removes all class/id CSS selectors
    * removes media thumbnails from images
*/
// ==UserScript==
// @name          Yahoo Pipe Cleaner
// @namespace     http://internetducttape.com
// @version       1.1
// @description   Removes most of the HTML markup from Yahoo Pipe run output so that it can be cut-and-pasted into WordPress blogs
// @include       http://pipes.yahoo.com/pipes/pipe.info*
// @include       http://pipes.yahoo.com/engtech*
// ==/UserScript==

(function() {
  function embedFunction(s) {
    document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
 }

 function pipeCleaner(arg1, arg2) {
   _pipeCleaner(arg1, arg2);
   function insertAfter(newNode, node) {
     return node.parentNode.insertBefore(newNode, node.nextSibling);
   }
   function cleanThePipes() {
     var items = document.getElementsByTagName('ul');
     for (var index=0; index<items.length; index++) {
       var i = items[index];
       //       console.log(i.className);
       if (i.className == "htmlresults") {
	 var start = document.createElement('p');
	 start.innerHTML = "<b>START-CUTTING-HERE (Click right mouse button, hold and drag) &gt;&gt;</b>";
	 var end = document.createElement('p');
	 end.innerHTML = "<b>&lt;&lt; STOP-CUTTING-HERE (Ctrl-C to copy, Ctrl-V to paste)</b>";
	 i.parentNode.insertBefore(start, i);
	 insertAfter(end,i);
	 var str = i.innerHTML;
	 // Get rid of headers
	 str = str.replace(/<(|\/)h.>/g, "");
	 // Get rid of nofollow
	 str = str.replace(/ rel="nofollow"/g, "");
	 // Replace paragraphs with list items
	 str = str.replace(/<p>(.*?)<\/p>/g, "<ul><li style=\"list-style:none;\">$1</li></ul>");
	 // Remove comments
	 str = str.replace(/<!--.*?-->/gm, "");
	 // Remove media elements
	 str = str.replace(/<ul class="media_thumbnail">.*?<\/ul>/gm, "");
	 // Reinsert the string
	 i.innerHTML = str;
	 // Remove IDs and CLASSes
	 i.parentNode.innerHTML = i.parentNode.innerHTML.replace(/ (class|)=[\'\"].*?[\'\"]/g, "");
       }
     }
   }
   window.setTimeout(function (){ cleanThePipes(); },1500,false);
 }

 // SCRIPT CHECK FOR UPDATES
 function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
   // Update code from Junk Blocker: http://loonyone.livejournal.com/
   // usage example
   // autoUpdateFromUserscriptsDotOrg({
   //   name: 'RSS+Atom Feed Subscribe Button Generator',
   //   url: 'http://userscripts.org/scripts/source/688.user.js',
   //   version: "1.2",
   // });
   try {
     if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.

     // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
     // and a script with * includes or opening a tabgrop
     var DoS_PREVENTION_TIME = 2 * 60 * 1000;
     var isSomeoneChecking = GM_getValue('CHECKING', null);
     var now = new Date().getTime();
     GM_setValue('CHECKING', now.toString());

     if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

     // check daily
     var ONE_DAY = 24 * 60 * 60 * 1000;
     var ONE_WEEK = 7 * ONE_DAY;
     var TWO_WEEKS = 2 * ONE_WEEK;
     var lastChecked = GM_getValue('LAST_CHECKED', null);
     if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

     GM_xmlhttpRequest({
       method: 'GET',
	   url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	   onload: function(result) {
	   if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	   var theOtherVersion = parseFloat(RegExp.$1);
	   if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	   if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	     GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	   }
	 }
       });
     GM_setValue('LAST_CHECKED', now.toString());
   } catch (ex) {
   }
 }

  autoUpdateFromUserscriptsDotOrg({
    name: 'Yahoo Pipe Cleaner',
	url: 'http://userscripts.org/scripts/source/11381.user.js',
	version: "1.1",
	});

 embedFunction(pipeCleaner);
 // Take control of Yahoo's function for drawing the pipe
 unsafeWindow._pipeCleaner = unsafeWindow.YAHOO.pipes.site.ajax.Pipeinfo;
 unsafeWindow.YAHOO.pipes.site.ajax.Pipeinfo = unsafeWindow.pipeCleaner;
 })();
