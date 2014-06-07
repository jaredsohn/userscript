/*
	FriendFeed Read Later
	http://ffapps.com/readlater
*/

// ==UserScript==
// @name           FriendFeed Read Later
// @namespace      http://ffapps.com/readlater
// @description    Mark items to read later and easily access them from a custom FriendFeed tab!
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings/*
// @version        0.1
// ==/UserScript==

var ffreadlater_version = "0.1";

var RL_SETTINGS = {};
var RL_ENTRIES = [];
var FF_COOKIE_AT;
var FF_UUID;
var FF_USERNAME;

(function() {

	autoUpdateFromUserscriptsDotOrg({
	    name: 'FriendFeed Read Later',
			url: 'http://userscripts.org/scripts/source/24734.user.js',
			version: ffreadlater_version,
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
	
	function isSavedForLater(eid) {
		return (RL_ENTRIES.indexOf(eid) != -1);
	}
	
	function saveChanges() {
		window.setTimeout(function() { GM_setValue("rl_entries",RL_ENTRIES.join('|'));}, 0);
	}

	function removeSavedForLater(eid) {
		RL_ENTRIES.removeValue(eid);
		saveChanges();
	}
	
	function addSavedForLater(eid) {
		RL_ENTRIES.push(eid);
		saveChanges();
	}

	function linkClickAction() {
		$(this).css("font-weight","normal").parents(".entry").find("span.rlt_span").css("display","inline");
		eid = $(this).parents(".entry").attr("id").substring(2);
		removeSavedForLater(eid);
	}

	function addLaterButton() {
		linkHtml = '<span class="rlt_span">&nbsp;- <a href="#" class="rlt_btn">Later</a></span>';
		$(linkHtml).insertAfter("span.like");
		$("a.rlt_btn").click(function(){
			$(this).parent().hide().parents(".entry").find("a.main").css("font-weight","bold").click(linkClickAction);
			like_btn = $(this).parents(".entry").find("span.like");
			eid = $(this).parents(".entry").attr("id").substring(2);
			addSavedForLater(eid);
			if (like_btn.css("display")!="none") {
				like_btn.hide();
				unsafeWindow.clickHandlers['like']($(this));
			}
			return false;
		});
	}
	
	function highlightLaterItems() {
		$(".entry").each(function(){
			eid = $(this).attr("id").substring(2);
			if (isSavedForLater(eid)) {
				$(this).find("a.main").css("font-weight","bold").click(linkClickAction);
				$(this).find("span.rlt_span").css("display","none");
			}
		});
	}

  function initializeLaterTab() {
		$('.tabs').find('.l_tab:last').after('<td class="l_tab" style="padding-left:0px;" id="tablater"><div class="rounded bb"><div class="t"><div class="l"><div class="r"><div class="tl"><div class="tr"><div class="body"><a id="tab-link-rl" href="#">read later</a></div></div></div></div></div></div></div></td>');
    $('#tab-link-rl').click(function() {
			window.location = "http://friendfeed.com/" + FF_USERNAME + "/likes?num=100&later=1";
		});
  }

	function isInsideLaterTab() {
		return (window.location.href.indexOf("later") != -1);
	}
	
	function drawLaterTabPage() {
		$('.userlisttop').html('<div class="username"><span class="subscribed">Stuff I kept for later</span></div>');
		$("#feedcontainer").hide();
		$(".entry").each(function(){
			eid = $(this).attr("id").substring(2);
			if (isSavedForLater(eid)) {
				l_likes = $(this).find(".likes");
				if (l_likes.find("a.friend").length == 1) {
					l_likes.hide();
				} else {
					l_likes.find("span.unlike").hide();
				}
			} else {
				$(this).parents(".cluster").hide();
			}
		});
		$("#feedcontainer").show();
		$('.tabs').find("td.l_tab.selected").remove();
		$('.tabs').find('#tablater').addClass("selected").find("div:first").addClass("white");
		$(".l_options").after('<span class="rltd_span">&nbsp;- <a href="#" class="rltd_btn">Done!</a></span>');
		$("a.rltd_btn").click(function(){
			$(this).parents(".cluster").hide();
			eid = $(this).parents(".entry").attr("id").substring(2);
			removeSavedForLater(eid);
			return false;
		});
		if (RL_ENTRIES.length == 0) {
			$("#feedcontainer").html("Nothing yet... To save items for later, simply click the Later button for it.");
		}
		if (RL_ENTRIES.length < 100) {
			$(".pager").hide();
		} else {
			$(".pager a[@href*=num]").attr("href",function(){return $(this).attr("href") + '&later=1'});
		}
		$("#feedviews").hide();
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

  function initFFAPPS_ReadLater() {
		if (!isLogged()) { return }
		initLocalStorage();
		initializeLaterTab();
		if (isInsideLaterTab()) {
			drawLaterTabPage();
		} else {
			addLaterButton();
			highlightLaterItems();
		} 
	}

  function jquery_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = unsafeWindow.jQuery; initFFAPPS_ReadLater(); }
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