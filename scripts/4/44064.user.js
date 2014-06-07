/*
	FriendFeed Yay
	http://hmert.com/ff
*/

// ==UserScript==
// @name           FriendFeed Yay
// @namespace      http://hmert.com/fftools
// @description    YAY!
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings/*
// @version        0.1
// ==/UserScript==

var ff_yay_version = "0.1";

var RL_SETTINGS = {};
var RL_ENTRIES = [];
var FF_COOKIE_AT;
var FF_UUID;
var FF_USERNAME;

(function() {

	autoUpdateFromUserscriptsDotOrg({
	    name: 'FriendFeed Yay',
			url: 'http://userscripts.org/scripts/source/44064.user.js',
			version: ff_yay_version,
		});
		
	Array.prototype.removeValue = function(val) { return this.splice(this.indexOf(val),1); }
	
	function getCookie(name) {
	  var re = new RegExp(name + "=([^;]+)");
	  var value = re.exec(document.cookie);
	  return (value != null) ? unescape(value[1]) : null;
	}

	function setCookie(name, value) {
	  var today = new Date();
	  var expiry = new Date(today.getTime() + 3 * 60 * 1000);
	  document.cookie = name + "=" + escape(value) + "; expires=" + expiry.toGMTString() + "; path=/";
	}

	function isLogged() {
		FF_COOKIE_AT = getCookie('AT');
		FF_UUID = getCookie('U') ? getCookie('U').split('|')[0] : null;
		FF_USERNAME = unsafeWindow.gUserLink.match(/\/([\w]+)"/)[1];
		if (FF_UUID) { return true }
	}
	

	function addLaterButton() {
		linkHtml = '<span class="rlt_span">&nbsp;- <a href="#" class="rlt_btn">Yay</a></span>';
		$(linkHtml).insertAfter("span.like");
		$("a.rlt_btn").click(function(){
			alert('Yay');

		});
	}


	function isFirstRun() {
		return (GM_getValue("rl_init")!='1');
	}
	
	function initLocalStorage() {
		if (isFirstRun()) {
			window.setTimeout(function() { GM_setValue("rl_init","1");}, 0);
		} else {
			v = GM_getValue("rl_entries");
			RL_ENTRIES = v ? v.split('|') : [];
		}
	}

  function initFFAPPS_Yay() {
			addLaterButton();
	}

  function jquery_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = unsafeWindow.jQuery; initFFAPPS_Yay(); }
  }

  jquery_wait();

})();

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