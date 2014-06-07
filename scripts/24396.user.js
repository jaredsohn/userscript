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
// @name           Friend Feed Twitter Client
// @namespace      http://internetducttape.com
// @description    Adds a character counter to the comment field, clicks the 'reply on Twitter' and has an interface for sending Tweets
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings*
// @version        0.44
// ==/UserScript==


var friendfeedtwitter_version = "0.44";

(function() {
  var twit_ui = null;
  var user = null;
  var pass = null;
  var update_url = null;

  autoUpdateFromUserscriptsDotOrg({
    name: 'Friend Feed Twitter Client',
	url: 'http://userscripts.org/scripts/source/24396.user.js',
	version: friendfeedtwitter_version,
	});

  //  GM_addStyle('#idt-twitter .idt-promote { visibility:hidden; } #idt-twitter:hover .idt-promote { visibility:visible; }');

  GM_registerMenuCommand("Friend Feed Twitter Client: Set keyboard shortcut", setKeyboardShortcut);

  function setKeyboardShortcut() {
    var hotkey = prompt("Please enter keyboard shortcut. Examples:\nALT+C\nALT+SHIFT+C\nCTRL+ALT+SHIFT+Z");
    GM_setValue("SHORTCUT", hotkey);
  }

  function xhrTweet(tweet) {
    GM_xmlhttpRequest({url:update_url, 
			  method:"POST",
			  headers:{
			  "Content-Type": "application/x-www-form-urlencoded",
			    "X-Twitter-Client":"twitter.user.js",
			    "X-Twitter-Client-Version":friendfeedtwitter_version,
			    "X-Twitter-Client-URL":"http://internetducttape.com"},
			  data:"source=idt&status="+encodeURIComponent(tweet),
			  onload:function(xhr){
			  $('#idt-twitter').hide();
			},
			  onerror:function(xhr){
			  alert("Unable to send Tweet. Bad username/password? Is Twitter down?");
			}
		      });
  }

  // Have to use a document event listener to be able to use GM XHR because of unsafeWindow.
  // Need GM XHR to do cross-site XHR to Twitter.
  function sendTweet(ev) {
    if (ev.target.getAttribute("idt")) {
      var tweet = $('#idt-twitter textarea').val();
      if (tweet.length > 0) {
	xhrTweet(tweet);
      }
    }
  }

  function twitter_build_ui() {
    if (twit_ui) {
      twit_ui.find('textarea').val('');
      //	  twit_ui.find('idt-character-count').val('140');
      twit_ui.show();
      twit_ui.find('textarea').focus();
    }
    else {
      $('#body').before('<div id="idt-twitter" style="padding-left: 35px; padding-top: 5px; display:block;"><table style="display:block;"><tr><td colspan="3"><textarea class="" name="comment" style="color: gray; width: 35em; margin-bottom: -3px; height: 6em; line-height: 1em;"/></td></tr><tr style="line-height: 2em;"><td><input idt="hack" id="idt-tweet" type="submit" value="Tweet" style="margin-left: 3px;"/><input id="idt-hide" type="submit" value="Hide" style="margin-left: 3px;"/></td><td align="left"><a class="idt-promote" title="Click to share Twitter Client on Friend Feed script with your friends" target="_blank" href="http://friendfeed.com/share?url=http://internetducttape.com/2008/03/27/greasemonkey-scripts-friend-feed-twitter-client-and-remove-visited-links/&title=How%20to%20use%20Twitter%20from%20Friend%20Feed">Share this script</a></td><td align="right">Characters left: <strong id="idt-character-count">140</strong></td></tr></table></div>');

      twit_ui = $('#idt-twitter');
      twit_ui.find('#idt-hide').click(function() {
					$('#idt-twitter').hide();
				      });
      document.addEventListener('click', sendTweet, false);
      twit_ui.find('textarea').keyup(function() {
				       var cc = $('#idt-character-count');
				       cc.html(140 - this.value.length);
				       // Twitter colors
				       if (this.value.length > 130) {
					 cc.css('color','#d40d12');
				       } else if (this.value.length > 120) {
					 cc.css('color','#5c0002');
				       } else {
					 cc.css('color','#cccccc');
				       }			 
				     });

    }
  }

  function shortcut(shortcut,callback,opt) {
    // from: Aaron Bassett http://foobr.co.uk and http://www.openjs.com/scripts/events/keyboard_shortcuts/

    var default_options = {'type':'keydown','propagate':false,'target':document}
    if(!opt) opt = default_options;
    else {for(var dfo in default_options) {if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];}}
    var ele = opt.target;
    if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
    var ths = this;
    var func = function(e) {
      e = e || window.event;
      if (e.keyCode) code = e.keyCode;
      else if (e.which) code = e.which;
      var character = String.fromCharCode(code).toLowerCase();
      var keys = shortcut.toLowerCase().split("+");
      var kp = 0;
      var shift_nums = {"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"}
      var special_keys = {'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123}
      for(var i=0; k=keys[i],i<keys.length; i++) {
	if(k == 'ctrl' || k == 'control') {if(e.ctrlKey) kp++;
	} else if(k ==  'shift') {if(e.shiftKey) kp++;
	} else if(k == 'alt') {if(e.altKey) kp++;
	} else if(k.length > 1) { if(special_keys[k] == code) kp++;
	} else { if(character == k) kp++;
	  else {if(shift_nums[character] && e.shiftKey) { 
	      character = shift_nums[character]; 
	      if(character == k) kp++;
	    }
	  }
	}
      }
      if(kp == keys.length) {
	callback(e);
	if(!opt['propagate']) {
	  e.cancelBubble = true;
	  e.returnValue = false;
	  if (e.stopPropagation) {
	    e.stopPropagation();
	    e.preventDefault();
	  }
	  return false;
	}
      }
    }
    if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
    else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
    else ele['on'+opt['type']] = func;
  }


  function setup_twitter(force) {
    user = GM_getValue("TWITTER_USERNAME", null);
    pass = GM_getValue("TWITTER_PASSWORD", null);
    var test_twitter = false;
    // Ask the user for credentials
    if ((null == pass) || (null == user) || force) {	  
      // FF caches the twitter username.
      if (unsafeWindow.gTwitLogin) {
	if (window.confirm('User twitter username '+unsafeWindow.gTwitLogin+'?')) {
	  user = unsafeWindow.gTwitLogin;
	}
	else {
	  user = window.prompt('Enter your Twitter username');
	}
	pass = window.prompt('Enter your Twitter password');
      }
      GM_setValue("TWITTER_USERNAME", user);
      GM_setValue("TWITTER_PASSWORD", pass);
      test_twitter = true;
    }
    update_url = ["http://", user, ":", pass, "@",
		  "twitter.com"].join("") + "/statuses/update.json";
    // Validate that the user entered valid credentials and do some shameless self promotion.
    if (test_twitter) {
      xhrTweet("Trying Friend Feed Twitter Client from http://InternetDuctTape.com");
    }
    var hotkey = GM_getValue("SHORTCUT", 'CTRL+ALT+SHIFT+Z');
    // See: http://jshotkeys.googlepages.com/test-static.html
    shortcut(hotkey, twitter_build_ui );
  };

  if ('function' != typeof(unsafeWindow.origSetTweetBackHtml)) {
    unsafeWindow.origSetTweetBackHtml = unsafeWindow.setTweetBackHtml;
    unsafeWindow.setTweetBackHtml = function(B) {
      unsafeWindow.origSetTweetBackHtml(true);
    };
  }

  // Uses jQuery
  function lets_jquery() {   
    // Add Twitter box after the settings menu
    $('.settings').find('.l_tab').after('<td class="l_tab" style="padding-left: 10px;"><div class="rounded bb"><div class="t"><div class="l"><div class="r"><div class="tl"><div class="tr"><div class="body"><a id="idt-tweet-link" href="#">tweet</a></div></div></div></div></div></div></div></td>');
    $('#idt-tweet-link').click(function() {
				 twitter_build_ui();
			       });
  }

  function jquery_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = unsafeWindow.jQuery; lets_jquery(); }
  }

  makeMenuFunction("Reset twitter username/password", function(){ setup_twitter(true); }, "Friend Feed Twitter Client");

  jquery_wait();
  setup_twitter(false);

 })();

function makeMenuFunction(desc, fn, prefix) {
  // The first argument is the description for the command
  // The second argument is the function to call
  // The third option is an option prefix for this menu item
  GM_registerMenuCommand((prefix ? prefix+": " : "") + desc, fn);
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


