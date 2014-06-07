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
  Akismet Auntie-Spam for WordPress v2 
  --------------------------------------------------------------------

  This script completely revolutionizes the WordPress akismet page.
  With this script I can see around 16 to 18 spam comments per screen 
  compared to 3 to 5 spam comments per screen without it. It also identifies
  and hides obvious spammers (by number of spam comments they have left).

  The current Akismet spam review page is not very useful when you
  get large amounts of spam because you spend too much time scrolling and
  too much time waiting for pages to load.

  I'm getting around 13000 spam a week now, so I need something to search
  through it faster.

  - Works with WordPress / WordPress Multi-user
  - IE: wordpress.com, edublogs.org, blogsome.com, and any self-hosted WordPress blog
  - Fetches all (or some) of your spam comments and display them on one page.
  - Sorts spammers by the amount of spam they have left.
  - Shows only the first line of spam, so less time is spent scrolling.
  - Completely hide obvious spam.
  - Checks for new version of script every two weeks.

  http://InternetDuctTape.com/tools/wordpress/akismet-auntie-spam/

  If you find this interesting you may also want to check out my
  other Greasemonkey scripts:
  http://InternetDuctTape.com/tools/

  --------------------------------------------------------------------
*/
//
// ==UserScript==
// @name          Akismet Auntie Spam for WordPress
// @namespace     http://InternetDuctTape.com
// @version       2.21
// @description   Reskins the Akismet spambox page for WordPress users.
// @include       http*://*/wp-admin/edit-comments.php?page=akismet-admi*
// @include       http*://*/wp-admin/admin.php?page=akismet-admi*
// @exclude       *noheader=true*
// ==/UserScript==
//
/*
  --------------------------------------------------------------------
  2008/04/09 version 2.21
  - WordPress.com 2.5 support

  2008/04/01 version 2.20
  - WordPress 2.5 support

  2007/11/18 version 2.10
  - Some people are reporting that WordPress 2.31 has a different URL for Akismet
  - IP addresses are displayed again

  2007/11/15 version 2.09
  - bug fix: vanilla WordPress and WordPress.com return spam results a little differently

  2007/11/15 version 2.08
  - bug fix: fixed a stupid debug statement that was breaking 2.07
  - added menu option for switching between HTTP and HTTPS for accessing Auntie Spam

  2007/11/15 version 2.07
  - bug fix: improved slowness of displaying hidden comments
  - added menu option for checking for updates right now
  - added menu option for configuring how much spam to download at a time for modem users

  2007/11/15 version 2.06
  - optimized, optimized, optimized
  - only displays 5000 comments per page to avoid stressing slower computers
  - will work for any language (not just english anymore)
  - any additional slowness is because of a bug on the WordPress end that makes
    you download the same spam over and over again: http://dev.wp-plugins.org/ticket/722
  - my home PC can download and display 5000 spam in 30 seconds

  2007/11/05 version 2.05
  - remove FirebugUtils, will start passing script through a cleaner
  - add crappy hand-coded profiler (TimeLogger)
  - Searched through http://svn.wp-plugins.org/akismet/trunk/akismet.php for shortcuts (see $_GET and $_POST)
  - switched to using search instead of getting the individual pages

  2007/10/04 version 2.04
  - Fixed (some) memory problems with v2.03
  - Still slow, I need to get it working with a profiler, none of the hacks
  for Greasemonkey + Firebug seem to work
  
  New Firefox install - 38 mb
  - 211 mb after loading auntie spam v2.03
  -  48 mb after loading auntie spam v2.04

  2007/09/17 version 2.03
  - Changed to work with the AdminSSL plugin. Thanks to Jan @ http://wp.dembowski.net/

  2007/09/12
  - Newest spam displays first
  - Akismet search doesn't function well with Auntie Spam, so use browser 
  search instead (Ctrl+F)
  - Added logo branding

  2007/08/23
  - Handles "no spam found" in an intelligent manner.
  - CSS twiddling to make it look better.
  - Automatically checks for script updates every two weeks.
  - Handles only one page of spam :) thanks http://growthmadness.org/

  2007/08/17
  - Rewrote from scratch using IP filtering idea from Donncha.
  - Will now fetch all of your spam comments and display them on one page.
  - Groups by the originating IP address.
  - Because it groups by IP address, the more spam you have, the more likely it is to
  correctly identify spam!
  - Sorted by the least number of spam comments to the most number of spam comments.
  - IP addresses with more than 5 comments are hidden (as the are likely spammers).
  - Can easily check the hidden text by moving your mouse over the parts that say [hidden]
  - Surprisingly much faster than the old version! (less code, too)
  - No longer has any confusing configuration options -- does the right thing all the time.
*/

(function() {
  var auntie_version = "2.21";
  var auntie_max_comments = 100;

  var wp_ver = 2.3;

  function auntieShowHidden(comment_id) {    
    ///html/body/div[5]/form[2]/ul/li[47]/span[2]/ul/li/p
    var p = "//form/ul/li[@id='"+comment_id+"']/span[@class='spam-hidden']/ul/li/p";
    var i, xpr = document.evaluate(p, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) {
      if (item.style.display != "block") {
	item.style.display = "block";
      }
      else {
	if (item.className != "spam-body") {
	  item.style.display = "none";
	}
      }
    }
    return ;
  };


  function makeMenuFunction(desc, fn, prefix) {
    // The first argument is the description for the command
    // The second argument is the function to call
    // The third option is an option prefix for this menu item
    GM_registerMenuCommand((prefix ? prefix+": " : "") + desc, fn);
  }

  // Make a toggle menu item
  function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
    // The first argument is the key used with GM_get/setValue and is also the variable which will hold the current value. 
    // The second argument is the default value.
    // The third and fourth arguments are the text to be displayed in the menu for toggling on and toggling off, respectively. 
    // The fifth argument is an optional prefix for those menu items.
    // Only one menu command is added, that will toggle the option. 
    // Page will reload when toggle is called.
    // Load current value into variable
    window[key] = GM_getValue(key, defaultValue);
    // Add menu toggle
    GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
			     GM_setValue(key, !window[key]);
			     location.reload();
			   });
  }


  function auntieCSS() {
    // CSS hacks
    var styles = "";
    styles += ".commentlist li { padding: 0.5em 1em 0.3em;}";
    styles += "#idt-nfo { border: 1px solid #fc0; border-left: 0; border-right:0; background-color: #ffc; margin-top: 10px; padding: 3px 10px; min-height: 160px; } #idt-nfo a { font-weight: bolder;} #idt-nfo img { float:left; border: 1px solid #999; margin: 5px 15px 5px 5px; }";
    styles += 'ul#spam-list li.spam-title li, ul#spam-list li.spam-title ul, ul#spam-list li.spam-title p { margin:0; padding: 0; list-style:none; line-height: 1.4em; border:0; background-color: #fff; }';
    styles += '.spam-title a, .spam-title a:visited { border:0; }';
    styles += 'ul#spam-list li ul li { margin-left: 40px; }';
    styles += 'ul#spam-list li ul li.alternate { background-color: #fff; margin-left: 45px; }';
    styles += 'ul#spam-list li ul li p.spam-body { background-color: yellow; font-size: small ! important; line-height: 1.2em; margin-left: 15px; font-family: courier; }';
    styles += '.spam-hidden ul { display: none; }';
    styles += '.spam-body-hidden { display: none; }';
    styles += '.spam-hidden ul { margin-left: 30px !important; }';
    styles += 'li.maybe-spam .spam-hidden  ul { display: inline; }';
    styles += '.spam-hidden .spam-header { display: none; }';
    styles += '.spam-hidden .spam-footer { display: none; }';
    styles += 'li.is-spam .spam-hidden:hover ul { display: inline; }';
    styles += 'ul#spam-list li ul li p.spam-header { background-color: fff; font-size: small ! important; margin-bottom: 5px;  }';
    styles += 'ul#spam-list li ul li p.spam-footer { text-align: right; background-color: #ddd; font-size: small ! important; margin-top: 3px;   }';
    styles += 'ul#spam-list li ul li p.spam-header a, ul#spam-list li ul li p.spam-footer a { visibility: visible; border: 0;}';
    styles += 'a.spam-toggle, a.spam-toggle:visited { border-bottom:1px solid #6699CC !important; }';
    styles += 'ul#spam-list li span.spam-title { text-align: left; margin: 10px 0px 12px 0px; }';
    styles += 'ul#spam-list li.is-spam span.spam-title { background-color:red; }';
    styles += 'form#akismetsearch { display:none; }';
    GM_addStyle(styles);
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
      if (SCRIPT.check_now == false) {
	if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;
      }

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

  function auntieSpam() {
    // GLOBALS
    var total_time = new Date().getTime();
    var wpadmin_url = ((auntie_http_prefix) ? "http://" : "https://") + document.location.hostname + document.location.pathname;
    var is_search = true;
    var found_id = new Array();
    var spam_list;
    var main;
    var status;
    var pages;
    var ips;
    var data;
    var downloaded_comments;
    var total_comments;
    var guessed_total_comments;

    var Comment = function (ip, header, id, info) {
      this.ip = ip;
      this.count = 0;
      this.info = "";
      this.name = header;
      this.latest_id = 0;
      this.add(id, info);
    }

    Comment.prototype =  {
      add: function(id, info) {
	if (this.count == 0) {
	  this.latest_id = id;
	}
	// Update the user
	total_comments += 1;
	if (total_comments % 150 == 0) {
	  auntieStatus("Looked at "+total_comments+" of " + download_comments + " spam comments. Still looking...");
	}
	this.count += 1;
	if (this.count % 2 == 1) {
	  this.info = this.info + "<li id='comment-"+id+"'>" + info + "</li>";
	}
	else {
	  this.info = this.info + "<li class='alternate' id='comment-"+id+"'>" + info + "</li>";
	}
      }
    }

    function auntieStatus (msg) {
      if (status) {
	main.removeChild(status);
      }
      status = document.createElement("blockquote");
      status.id = "idt-status";
      status.innerHTML = msg; 
      main.appendChild(status);
    }

    function auntieInit() {
      guessed_total_comments = "unknown";
      // Find the amount of spam
      // /html/body/ul[2]/li[3]/a
      // WP 2.3
      var items = auntieXpath("/html/body/ul[@id='submenu']/li/a[@class='current']");
      if (items.length == 0) {
	// WP 2.5
	wp_ver = 2.5;
	items = auntieXpath("/html/body/div/div/ul[@id='submenu']/li/a[@class='current']");
      }
      if (items[0]) {
	var details = items[0].innerHTML.split(/[\(\)]/);
	guessed_total_comments = details[1];
      }

      // Create a header block for the Akismet Auntie Spam extension.
      // /html/body/div[4]/h2  [@class='wrap']
      var items = auntieXpath("/html/body/div[@class='wrap']/h2");
      if (items.length == 0) {
	wp_ver = 2.5;
	items = auntieXpath("/html/body/div[@id='wpwrap']/div[@id='wpcontent']/div[@id='wpbody']/div[@class='wrap']/h2");
      }
      var submit_top = items[0];
  
      var idt_logo = 'data:image/gif;base64,'+
	'R0lGODlhqgCCAPcAAFxaXKyurARerNTa3ByGxGyu3JyepHx+fNzu9ESazJTG5ARyvDyGxOTm5MzO'+
	'1GxubLzCxIySlCR+vIy63PT6/Lza7DSOxFym1ARqtGym1LTS5LS6vISKjOTy/GRmZDSGxFyazDyS'+
	'zHy23KTO5BxyvMzm9HR2dCx+vKSmpPT29LzW7MTKzJSanIzC5LS2vNzi5Hyu1ISGjOzu7FSi1Ax6'+
	'vMzi9ARuvCyGzESW1FxiZLS2tARmtISGhEya1KTG5NTW1BR+xBRqtEySxKyutNze5Hx+hOTm7Gxu'+
	'dMTGzJSWnIy+5MTe9Gyq3Ly+xIyOlGRmbNzq9HR2fKSmrOzu9CSCxFxeZARitNze3CSKxHSy3Jyi'+
	'pJzK5BR2vESOxMzS1MTGxJSWlJS+3Pz+/MTe7DSOzGSq1ARutHSq1KzS7Ly+vIyOjPT2/CyKxFyi'+
	'1DyWzKTO7NTq9DSCxMzOzJyenJzC5ISy3Ax6xCyKzEye1ByCxKyytHyChOTq7GxydGRqbHR6fKSq'+
	'rCR6vFSWzFSazNTW3ESKxOz2/GSezOzy9LTW7FxeXARirAR2vKTK5BRutDSSzNza3CSGxHSu3OTu'+
	'9JzG5MTCxJSSlJS63Pz6/MTa7GSm1AxqtHSm1Ly6vIyKjESSzIS23KzO5NTm9DR+vMTW7MzKzJya'+
	'nJTC5OTi5ISu1BR6vNTi9GRiZAxmtBx+xKSipNTS1DSKxDSKzFSe1LSytISChOzq7HRydGxqbHx6'+
	'fKyqrPTy9AD//wD//wD//wD//4gAAGYAABYAAAAAAAC0/AHj5AATEwAAAAA01gBkWACDTAB8AFf4'+
	'3PT35IATE3wAAOAYd+PuMBOQTwB8AIgAEGa35RaSEwB8AHD/NGX/ZC3/g2z/fG9QzWfv5W8XEwAA'+
	'ABE0uQBk/wCD/wB8fwT4iADk5QATEwAAAAPnUABk7wCDFwB8AACINABkZACDgwB8fAAAUAAA7wAA'+
	'FwAAAAQwwQAAGAAAAAAAAAMBAAAAAAAAAAAAAAAanQAA/wAARwAAACH5BAAAAAAALAAAAACqAIIA'+
	'Bwj/AMUIHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuX'+
	'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'+
	'+IL/8oQ/GU6P24e/+Izf+I7/+JC/EAEBADs=';

      main = document.createElement('blockquote');
      main.id = "idt-nfo";

      var img = document.createElement('img');
      img.src = idt_logo;

      var a = document.createElement('a');
      a.href = "http://InternetDuctTape.com/tools/";
      a.title = "More tools from Internet Duct Tape";
      a.appendChild(img);
      main.appendChild(a);

      a = document.createElement('a');
      a.innerHTML = 'Using <strong>Akismet Auntie Spam</strong> version '+auntie_version+' extension by InternetDuctTape.com'; 
      a.title = "Find out more about Akismet Auntie Spam";
      a.href = "http://internetducttape.com/tools/wordpress/akismet-auntie-spam/";
      main.appendChild(a);

      submit_top.parentNode.insertBefore(main, submit_top.nextSibling);
    }

    function auntieDownloadSpam() {
      auntieStatus("Starting to download spam...");

      var SpamPages = function() {
	this.pages = new Array();
      };

      SpamPages.prototype = {
	starting: function(url) {
	  var u = encodeURI(url);
	  this.pages[u] = 0;
	},
	downloading: function(url) {
	  var u = encodeURI(url);
	  this.pages[u] = 1;
	},
	finished: function(url) {
	  var u = encodeURI(url);
	  this.pages[u] = 2;
	  if (this.all_done() ) {
	    setTimeout(function() { auntieDisplaySpam(); }, 0);	    
	  }
	},
	next_page: function() {
	  for(var i in this.pages) {
	    if (this.pages[i] != 2) {
	      return(decodeURI(i));
	    }
	  }
	  return(null);
	},
	all_done: function() {
	  var success = 1;
	  for(var i in this.pages) {
	    if (this.pages[i] != 2) {
	      success = 0;
	    }
	  }
	  return(success);
	},
	display: function() {
	  var d = "";
	  for(var i in this.pages) {
	    d += decodeURI(i) + "<br />";
	  }
	  return(d);
	}	
      };

      pages = new SpamPages();
      ips = new Array();
      data = new Array();
      total_comments = 0;

      // Delete the current spam
      spam_list = document.getElementById("spam-list");
      if (spam_list) {
	spam_list.innerHTML = "";
      }

      // Get the number of pages of spam
      var last_num = 1;
      var current = 1;
      var m = document.location.href.match(/\auntiepage=(\d+)/);
      if (m) {      
	current = parseInt(m[1]);
      }
      var list = auntieXpath("//a[contains(@class,'page-numbers')]");
      if (list.length > 0) {
	last_num = list[list.length-1].innerHTML;
	var replaceStr = "";
	if (last_num > auntie_max_comments) {
	  // will have multiple pages
	  replaceStr = auntiePager(current, parseInt(last_num/auntie_max_comments)+1);
	}
	// Delete the top and bottom pagerize bars so as not to confuse the user
	list[list.length-1].parentNode.innerHTML = replaceStr;
	list[0].parentNode.innerHTML = replaceStr;
	replaceStr = null;
      }
      delete list;

      if (last_num <= auntie_max_comments) {
	download_comments = guessed_total_comments;
	auntieStatus("Downloading "+guessed_total_comments+" spam comments in one go...");
	pages.starting(wpadmin_url + "?page=akismet-admin");
	setTimeout(function() {
		     auntieDownloadSearch(pages.next_page(), "s=&submit=Search&noheader=true");
		   }, 0);       
      }
      else {
// 		last_num = 3; // DEBUG
	download_comments = 50 * auntie_max_comments;
	var slice_start = auntie_max_comments * (current - 1) + 1; // 1, 51, 101...
	var slice_end = slice_start + auntie_max_comments;
	if (slice_end > last_num) slice_end = last_num + 1;
	for (var i = slice_start; i < slice_end; i++) {
	  // /wp-admin/edit-comments.php?page=akismet-admin&apage=27
	  // not using document.location.protocol because that breaks the
	  // AdminSSL plugin. Thanks to Jan @ http://wp.dembowski.net/
	  pages.starting(wpadmin_url + "?page=akismet-admin&apage="+i+"&noheader=true");
	}
	is_search = false
	setTimeout(function() {
		     auntieDownloadPage(pages.next_page());
		   }, 0);       
      }
      return;
    }

      
    function auntiePager(current, end) {
      var str = "<p>";
      if (current > 1) str += '<a class="prev" href="'+wpadmin_url+'?page=akismet-admin&auntiepage='+(current-1)+'">Previous Page</a>';
      for(var i=1; i<=end; i++) {
	if (i == current) str += '<strong>'+i+'</strong>';
	else str += '<a class="page-numbers" href="'+wpadmin_url+'?page=akismet-admin&auntiepage='+i+'">'+i+'</a>';
      }
      if (current < end) str += '<a class="next" href="'+wpadmin_url+'?page=akismet-admin&auntiepage='+(current+1)+'">Next Page</a>';
      str += '</p>';
      return(str);
    }

    function auntieParseSpam(url, text) {

      var comments = text.split(/<li/);
      text = null;
      // Akismet has a bug where it returns too much comment spam for higher pages
      // http://dev.wp-plugins.org/ticket/722
      var max_length = 75;
      if (is_search) max_length = comments.length;
      if (max_length > comments.length) max_length = comments.length;
      for(var i=0; i<max_length; i++) {
	// id='comment-95021' class="alternate"> <p><strong>tylenol recall</strong> | <a href='http://buytylenol.ipboard.org' rel='external'>buytylenol.ipboard.org</a> | IP: <a href="http://ws.arin.net/cgi-bin/whois.pl?queryinput=67.159.26.171">67.159.26.171</a></p> <p><strong>tylenol recall</strong></p> <p>news</p> <p><label for="spam-95021"> <input type="checkbox" id="spam-95021" name="not_spam[]" value="95021" /> Not Spam</label> &#8212; Nov 14, 10:12 PM &#8212; [ <a href="http://internetducttape.com/2007/07/25/tim-ferriss-four-minute-blog-training-the-9-rules-you-need-to-know/" title="Tim Ferriss' Four Minute Blog Training - The 9 Rules You Need to Know">View Post</a> ] </p>

	var m = comments[i].match(/id=['"]comment-(\d+)['"][^]*?<p>([^]*?\s*?IP:[^\d]*?(\d+\.\d+\.\d+\.\d+)\">\d+\.\d+\.\d+\.\d+<\/a>)<\/p>\s*<p>([^]*)<\/p>\s*<p>(<label[^]*\])\s*<\/p>/);
	if (m) {
	  // m[1] = comment_id
	  // m[2] = header
	  // m[3] = ip
	  // m[4] = body
	  // m[5] = footer
	  if (found_id[m[1]]) {
	    // ID has already been added, skip it
	  }
	  else {
	    found_id[m[1]] = 1;
	    m[4] = m[4].replace(/<[^>]*>/g, "");
	    var str = '<p class="spam-header">'+m[2]+'</p><p class="spam-body">'+m[4].substr(0,100)+'</p><p class="spam-body-hidden">'+m[4].substr(101,500)+'</p><p class="spam-footer">'+m[5]+'</p>';
	    var ip = m[3];
	    if (ips[ip]) {
	      data[ips[ip]].add(m[1], str);
	    }
	    else {
	      ips[ip] = data.length; // increase the size of the array
	      data[data.length] = new Comment(ip, m[2], m[1], str);
	    }
	  }
	}
      }
      delete comments;

      auntieStatus("Looked at "+total_comments+" of about " + download_comments+" spam comments. Still Looking...");
      pages.finished(url);
      setTimeout(function() {
		   auntieDownloadPage(pages.next_page());
		 }, 0);       
    }

    function auntieDisplaySpam() {
      auntieStatus("Looked at "+total_comments+" of about " + download_comments+" spam comments. Preparing to display...");

      // time: 93ms
      data = data.sort(sortByCountThenId);

      // time: 7469ms
      var count = 0;
      var last_count = 0;
      var str = "";
      for (var i in data) {
	count += 1;

	if (data[i].count != last_count) {
	  last_count = data[i].count;
	  str += "<li><h4>Left "+last_count+" Comments</li>";
	}
      
	var li_className = "spam-title maybe-spam";
	var show_more = "";
	if (data[i].count > 5) {
	  li_className = "spam-title is-spam";
	  show_more = " | [Hover mouse to show more]";
	}

	str += '<li class="'+li_className+'" id="auntie-'+count+'"><span class="spam-title">' + data[i].name + ' | <a class="spam-toggle" title="Click on this link to show or hide the full comments and access the not-spam checkbox" href="javascript:window.auntieShowHidden(\'auntie-'+count+'\');">' + data[i].count + ' comments</a></span><span class="spam-hidden">' + show_more + '<ul>' + data[i].info + '</ul></span></li>'

	  // time consuming, but worth it for the memory freeing
	  delete data[i];
      }
    
      spam_list.innerHTML = str;
      str = null;
      total_time = new Date().getTime() - total_time;
      var comment_perc = parseInt(100 * total_comments / download_comments);
      if (comment_perc > 97) {
	comment_perc = "all";
      }
      else {
	comment_perc += "%";
      }
      auntieStatus("<p>Auntie Spam has put "+comment_perc+" of your spam comments on one page. She is only showing you the first line of the comments.</p><p>Click on the '1 comments' link to show the full comment (including the option to mark it as not-spam).</p><p>Hit Ctrl+F to search or use Edit &gt;&gt; Find</p><p>Auntie took "+total_time/1000+" seconds to download and display "+total_comments+" spam comments.</p>");
    }

    function sortByCount(a, b) {
      var x = a.count;
      var y = b.count;
      var r = (x<y) ? -1 : ((x>y) ? 1: 0);
      return (r);
    }

    function sortById(a, b) {
      // The higher the Id, the newer the spam.

      var x = b.latest_id;
      var y = a.latest_id;
      var r = (x<y) ? -1 : ((x>y) ? 1: 0);
      return (r);
    }

    function sortByCountThenId(a, b) {
      var x = a.count;
      var y = b.count;
      var r = (x<y) ? -1 : ((x>y) ? 1: ((x==y) ? sortById(a, b) : 0));
      return (r);
    }


    function auntieDownloadPage(page_url) {
      if (page_url == null) return ;
      pages.downloading(page_url);
      // 	GM_xmlhttpRequest({
      // 	  method:"GET",
      // 	      url:page_url,
      // 	      headers:{
      // 	      "User-Agent":"AkismetAuntieSpamAgent",
      // 		"Accept":"text/monkey,text/xml"
      // 		},
      // 	      onload:function(details) {
      // 	      auntieParsePage(this.url, details);
      // 	    }
      // 	  });
      getXHR(page_url, auntieParsePage);
    }

    function getXHR(url, func) {
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onreadystatechange = function (aEvt) {
	if (req.readyState == 4) {
	  if(req.status == 200)
	    func(url, req);
	  else
	    alert("Error loading page: "+url);
	  req.onreadystatechange = null;
	}
      };
      req.send(null); 
    }

    function auntieDownloadSearch(page_url,data) {
      pages.downloading(page_url);
      postXHR(page_url, data, auntieParsePage);
    }

    function postXHR(url, params, func) {
      var req = new XMLHttpRequest();
      req.open('POST', url, true);
      //Send the proper header information along with the request
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      req.setRequestHeader("Content-length", params.length);
      req.setRequestHeader("Connection", "close");

      req.onreadystatechange = function() {//Call a function when the state changes.
	if(req.readyState == 4 && req.status == 200) {
	  func(url, req);
	  req.onreadystatechange = null;
	}
      }
      req.send(params);
    }

    function auntieParsePage(url, details) {
      setTimeout(function() {
		   auntieParseSpam(url, details.responseText);
		 }, 0);
    }

    function auntieXpath(p, context) {
      if (!context) context = document;
      var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
      return arr;
    }

    // MAIN
    auntieInit();
    if (guessed_total_comments == "0") {
      auntieStatus("You don't have any spam.");
      return;
    }
    auntieDownloadSpam();
  }

  function checkUpdates(now) {
    autoUpdateFromUserscriptsDotOrg({
      name: 'Akismet Auntie Spam for WordPress',
	  url: 'http://userscripts.org/scripts/source/7037.user.js',
	  version: auntie_version,
	  check_now: now,
	  });
  }

  checkUpdates(false);
  unsafeWindow.auntieShowHidden = auntieShowHidden;
  auntieCSS();
  makeMenuFunction("Check for updates", function() {
		     checkUpdates(true);
		   }, "Akismet Auntie Spam");
  makeMenuToggle("auntie_http_prefix", true, "Use HTTP:// for accessing Auntie Spam", "Use HTTPS:// for accessing Auntie Spam", "Akismet Auntie Spam");
  auntie_max_comments = GM_getValue("auntie_max_comments", 100);
  makeMenuFunction("Set the max number of comments to download", function() {
		     var user_set = parseInt(prompt("How many comments do you want to download at a time?", 50*auntie_max_comments));
		     if (user_set < 50) user_set = 50;
		     user_set = parseInt(user_set / 50);
		     GM_setValue("auntie_max_comments", user_set);
		     alert("Auntie Spam will download "+50*user_set+" comments at a time. (It has to be a multiple of 50)");
		     location.reload();
		   }, "Akismet Auntie Spam");
 auntie_max_comments = GM_getValue("auntie_max_comments", 100);
 window.addEventListener("load", function(e) {
			   auntieSpam();
			   this.removeEventListener('load',arguments.callee,false);
			 }, false);
 })();

