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

// ==UserScript==
// @name           Friend Feed Remove Visited Links
// @namespace      http://internetducttape.com
// @description    Remove any links from the Friend Feed news stream that you've already visited
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings*
// @version        0.4
// ==/UserScript==

var friendfeedremovevisited_version = "0.4";

(function() {
  autoUpdateFromUserscriptsDotOrg({
    name: 'Friend Feed Remove Visited Links',
	url: 'http://userscripts.org/scripts/source/24383.user.js',
	version: friendfeedremovevisited_version,
	});


  // Uses jQuery
  function main() {
    /**
     * @author Remy Sharp
     * @date 2008-02-25
     * @url 
     * @license Creative Commons License - ShareAlike http://creativecommons.org/licenses/by-sa/3.0/
     */
    (function ($) {

      $.fn.visited = function (fn) {
	var iframe = document.createElement('iframe'), 
        links = this, 
        body = $('body'), 
        i, 
        win, 
        visitedList = {},
        filter;

	// we need the iframe visible, otherwise getComputedStyle doesn't work
	iframe.style.position = 'absolute';
	iframe.style.left = '-1000px';
	iframe.height = '1';
	iframe.width = '1';
	iframe.id = 'visitedIF';
    
	body.append(iframe);
	win = iframe.contentDocument || iframe.contentWindow.document;

	// insert the HTML
	win.write(iframeHeader());
	for (i = 0; i < links.length; i++) {
	  win.write('<a href="' + links[i].href + '">' + links[i].href + '</a>');
	}
	win.write(iframeFooter());
	win.close();

	// find the links which are green rgb(0, 255, 0) - troubled that I'm matching on a string like this.
	$('a', win).each(function (i) {
			   var visited = getStyle(this, 'color', win);
			   visitedList[i] = !!(visited == 'rgb(0, 255, 0)');
			 });
    
	$(iframe).remove();
    
	filter = function (i) {
	  return visitedList[i];
	};

	return $.isFunction(fn) ? this.filter(filter).each(fn) : this.filter(filter);
      }

      // @private

      function getStyle(x,styleProp, win) {
	if (x.currentStyle)
	  var y = x.currentStyle[styleProp];
	else if (win.defaultView.getComputedStyle) {
	  var y = win.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	}
        
	return y;
      }

      function iframeHeader() {
	return [
		'<!' + 'DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"', 
		'    "http://www.w3.org/TR/html4/loose.dtd">', 
		'<' + 'html>', 
		'<' + 'head>', 
		'<' + 'title>',
		':visited iframe',
		'<' + '/title>',
		'<' + 'style>', 
		'a:visited { color: #0f0 ! important }',  // where the magic happens
		'<' + '/style>', 
		'<' + '/head>', 
		'<' + 'body>'
		].join("\n");
      }

      function iframeFooter() {
	return '<' + '/body>' + '<' + '/html>';
      }
    
    })(unsafeWindow.jQuery);

    function remove_visited(node) {
      $(node).find('div.entry a.main').visited(function () {
				 if (0 == $(this).parents('div.hiddenent').length) {
				   // only hide the links that aren't already hidden.
  				   //console.log("hiddenent: ", $(this).parents('div.hiddenent').length, $(this).parents('div.hiddenent'));	 
				      var entries = $(this).parents('div.entries');
				      if (entries.children().length == 1) {
					// if this is the only one inside a cluster, then hide that cluster.
					entries.parents('div.cluster').hide();
				      }
   			              //console.log("hiding: ", $(this).parents('div.entry'));
					// <div id="e-1b281db6-c5ea-6855-3096-59072a51c360" class="entry other" tohide="54072c22-0b27-49cc-9a01-b102532bfa99_blog_1">
					// at	from cookie
					// rules	1b281db6-c5ea-6855-3096-59072a51c360_e_2					                
					var guid = $(this).parents('div.entry').attr('id').substring(2) + '_e_2';
					var at = unsafeWindow.getCookie("AT");
					//console.log("guid: ", guid);
					//console.log("at: ", at);
					$.post('/events/sethiderule ', {at:at, rules:guid});
				 }
					       });
    };

    remove_visited('div.feed');

    addFilter(remove_visited);
  }

  function jquery_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = unsafeWindow.jQuery; main(); }
  }
  jquery_wait();
 })();

function addFilter(func, i) {
	i = i || 4;
	if (window.AutoPagerize && window.AutoPagerize.addFilter) {
		window.AutoPagerize.addFilter(function (nodes) {
			nodes.forEach(func);
		});
	}
	else if (i > 1) {
		setTimeout(arguments.callee, 1000, func, i - 1);
	}
	else {
		(function () {
			func(document);
			setTimeout(arguments.callee, 200);
		})();
	}
}

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

