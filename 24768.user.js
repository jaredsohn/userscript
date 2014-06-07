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
// @name           Friend Feed Who Are You
// @namespace      http://internetducttape.com
// @description    Adds a 'who are you' link at the top of every users' profile page.
// @include        http://friendfeed.com*
// @version        0.4
// ==/UserScript==

    // Some of this code taken from Aviv Shaham's Show Likes script:
    //    http://ffapps.com/showlikes/
    // and from Aviv Shaham's Filter and Groups script
    //    http://ffapps.com/filters/
    //
    // Namely: fetching username, remotekey, and subscriber info.

var friendfeedwhoareyou_version = "0.4";

(function() {
  // Handy dandy auto-updater I use for all my scripts.
  autoUpdateFromUserscriptsDotOrg({
    name: 'Friend Feed Who Are You',
	url: 'http://userscripts.org/scripts/source/24768.user.js',
	version: friendfeedwhoareyou_version,
	});

  var usage_count = GM_getValue('IDT_WHOAREYOU_USAGE', 0);

  var re = {
    'remoteKey': 	/remote key:.*[\s]?.*>([\w]+)</,
    'username':		/\/([\w]+)\"/,
    'uuid':				/([\w]{8}(?:-[\w]{4}){3}-[\w]{12})/
  };

  var user = {
    'uuid':null,
    'username':null,
    'AT':null,
    'remoteKey':null,
    'subscriptions':null
  };

  var time = new Date().getTime().toString();

  function jquery_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = unsafeWindow.jQuery; friendFeedWhoAreYou(); }
  }
  jquery_wait();

  function friendFeedWhoAreYou() {   
    // Utility functions for setting GM variables even from unsafeWindow
    function getGMValue(k,d) { if(typeof d=='undefined'){d=null;} return GM_getValue(k,d); }
    function setGMValue(k,v) { window.setTimeout(function() { GM_setValue(k,v);}, 0); return }

    // fetch the remote key with caching
    function cacheRemoteKey() {
      function fetchRemoteKey() {
	$.ajax({
	  url:"http://friendfeed.com/account/api",
	      cache:false,
	      success:function(html){
	      M = html.match(re['remoteKey']);
	      user['remoteKey'] = M ? M[1] : '';
	      setGMValue('IDT_WHOAREYOU_REMOTEKEY', user['remoteKey'].toSource());
	      setGMValue('IDT_WHOAREYOU_REMOTEKEY_TIMER', time);
	    }});
      }

      if (isValueExpired('IDT_WHOAREYOU_REMOTEKEY_TIMER', 30*60*1000)) {
	fetchRemoteKey();
      }
      else {
	user['remoteKey'] = eval(GM_getValue('IDT_WHOAREYOU_REMOTEKEY'));
      }
    }

    // Set up HTTP basic authorization
    function friendFeedAuth() {
      u = user['username'];
      p = user['remoteKey'];
      //    alert(u+' '+p+' '+Base64.encode(u+':'+p));
      return "Basic " + Base64.encode(u+':'+p);
    }

    // Call this function every time someone interacts with the script.
    // It'll automatically share itself every X usages. People who use
    // the script a lot will promote it, people who don't use it that
    // often won't promote it. It's fair.
    function selfPromote() {
      usage_count += 1;
      setGMValue('IDT_WHOAREYOU_USAGE', usage_count);
      // Play around with these numbers to control how often the script
      // promotes itself.
      if (25 == (usage_count % 100)) {
	$.ajax({
	  url:"/api/share",
	      type:'POST',
	      beforeSend: function(req) {
	      req.setRequestHeader('Authorization', friendFeedAuth());
	    },
	      data: {
	    title:"Friend Feed - Who Are You? (version "+friendfeedwhoareyou_version+")",
		link:"http://internetducttape.com/2008/04/10/friendfeed-scripts-unsubscribe-who-service/#whoareyou",
		comment:"See more information about who people are on Friend Feed with this handy script for Firefox. I've used it "+usage_count+" times. This is an automated message.",
		via:"internetducttape",
		}
	    //	  , success: function() { alert("Thank you for sharing!"); }
	  });
      }
    }

    // Utility function to check if a value is expired
    function isValueExpired(GMVal, maxDuration) {
      var lastChecked = GM_getValue(GMVal, null);
      return (!lastChecked || (time - lastChecked) > maxDuration);
    }

    // Get the logged in username and user subscriptions.
    function fetchUserInfo() {
      user['username'] = unsafeWindow.gUserLink ? unsafeWindow.gUserLink.match(re['username'])[1] : null;

      if (isValueExpired('IDT_WHOAREYOU_SUBSCRIPTIONS_TIMER', 30*60*1000)) {
	fetchSubscriptions(user['username'], 0, 0);
      }
      else {
	user['subscriptions'] = eval(GM_getValue('IDT_WHOAREYOU_SUBSCRIPTIONS'));
      }
    }

    // Fetch the subscriptions and update the display.
    // user_mode = 0 initialize the logged in user
    // user_mode = 1 get someone else
    // display_mode = 1 for on the l_popup window
    // display_mode = 0 for on the profile page
    function fetchSubscriptions(username, user_mode, display_mode) {
      function callbackSortNames(a,b) {
	if (a.name.toLowerCase() == b.name.toLowerCase()) {
	  if (a.nickname == b.nickname)
	    return 0;
	  return (a.nickname < b.nickname) ? -1 : 1;
	}
	return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
      }

      function linkSubNames(arr, display_mode) {
	if (arr.length == 0) {
	  return '';
	}
	// performance hit, don't create the links if the array is too big
	if ((display_mode == 0) && (arr.length < 500)) {
	  return '<p>'+arr.map(function(x) {
					   return '<a class="friend l_popup" uid="'+x['id']+'" href="'+x['profile_url']+'">'+x['name']+'</a>';
					 }).join(', ')+'</p>';
	}
	else {
	  return '<p>'+arr.map(function(x) {
					   return x['name'];
					 }).join(', ')+'</p>';
	}
      }

      function linkSubImgs(arr) {
	if (arr.length == 0) {
	  return '';
	}
	if (arr.length > 500) {
	  return '<p>Too many friends to show pictures of.</p>';
	}
	// /mathewingram/picture?size=medium&v=1
	return '<p>'+arr.map(function(x) {
				    return '<img height="25" width="25" src="/'+x['nickname']+'/picture?size=small&v=1">';
				  }).join(' ')+'</p>';	
      }

      function displaySub(arr, display_mode) {
	return linkSubNames(arr, display_mode) + linkSubImgs(arr);
      }

      var subscriptions = [];
      $.ajax({
	url:"http://friendfeed.com/api/user/"+username+"/profile",
	    cache:false,
	    dataType:'json',
	    complete:function(xhr) {
	    if (xhr.status == 200) {
	      var json = eval("("+xhr.responseText+")");
	      $.each(json['subscriptions'], function(){
		       subscriptions.push({
			 id:this['id'],
			     name:this['name'],
			     nickname:this['nickname'],
			     profile_url:this['profileUrl']
			     });
		     });
	      subscriptions.sort(callbackSortNames);
	      // Cache the user's subscriptions
	      if (user_mode == 0) {
		//	      setGMValue('subscriptions', subscriptions.toSource());
		//	      setGMValue('lastSubscriptionsFetch', time);
		user['subscriptions'] = subscriptions;
		setGMValue('IDT_WHOAREYOU_SUBSCRIPTIONS', user['subscriptions'].toSource());
		setGMValue('IDT_WHOAREYOU_SUBSCRIPTIONS_TIMER', time);
	      }
	      // Compare against this guy
	      else if (user_mode == 1) {
		var my_subs = user['subscriptions'].map(function(x) {return x['nickname']});
		var our_subs = [];
		var their_subs = [];
		$.each(subscriptions, function(i, val) {
			 if(-1 != $.inArray(val['nickname'], my_subs)) {
			   our_subs.push(val);
			 }
			 else {
			   their_subs.push(val);
			 }
		       });
		var our_display = '';
		var their_display = '';
		if (our_subs.length > 0) {
		  our_display = '<h4>Common Friends</h4>' + displaySub(our_subs, display_mode);
		}
		// Don't display their friends in the mini-popup
		if ((their_subs.length > 0) && (display_mode == 0)) {
		  their_display = '<h4>Uncommon Friends</h4>' + displaySub(their_subs, display_mode);
		}
		my_subs = null;
		their_subs = null;
		$('.idt-whoareyou-subscriptions-'+username).html('<p>They have <b>'+subscriptions.length+'</b> friends.</p><p>You have <b>'+our_subs.length+'</b> friends in common.</p>'+our_display+their_display);
		our_subs = null;
		subscriptions = null;
		our_display = null;
		their_display = null;
	      }
	    }
	  }
	});
    }


    // Load the username/remotekey so we can use the API.
    if (null == user['remoteKey']) { cacheRemoteKey(); }
    if (null == user['username']) { fetchUserInfo(); }

    // Describe who a user is based on their services and their friends.
    // display_mode = 1 for on the l_popup window
    // display_mode = 0 for on the profile page
    function friendFeedDescribe(display_mode, username) {
      // Depending on the display_mode, we will use different class names for inserting things.
      var info_class = display_mode ? '.userpopup .services' : '.section:first';
      var insert_class = display_mode ? '.userpopup .subscribe' : '.userlisttop .username';
      var sub_style = display_mode ? 'margin-right: 50px;' : 'padding-right: 250px';

      // Build up the code to be inserted.
      // Have to set the href to javascript:; instead of # because I do not want to go to the top of the page.
      var insert = '<div class="idt-whoareyou"><div class="idt-whoareyou-toggle-'+username+'"><a class="idt-whoareyou-show idt-whoareyou-toggle-'+username+'" href="javascript:;">Who is this person?</a></div><div class="idt-whoareyou-toggle-'+username+'" style="display:none;"><ul style="list-style:none;">';
      $(info_class+' img.icon[alt]').each( function(i) {
					     var alt = $(this).attr('alt');
					     var href = $(this).parents('a').attr('href');
					     var s = alt.replace(/\./g,'').toLowerCase();
					     // For some of the services there is no reason to display
					     // their information because the URL doesn't link to a profile.
					     if ((alt != 'Amazon.com') &&
						 (alt != 'Gmail/Google Talk') &&
						 (alt != 'Netflix')) {
					       insert += '<li><a service="'+s+'" class="l_idt_byservice" href="#">'+$(this).parent().html()+'</a> <b>'+alt+':</b> <a title="'+alt+'" href="'+href+'">'+href+'</a></li>';
					     }
					   });
      insert += '<div class="idt-whoareyou-subscriptions-'+username+'" style="'+sub_style+'"></div></ul><p><a class="idt-whoareyou-hide idt-whoareyou-toggle-'+username+'" href="javascript:;">Hide this information</a></p></div></div>';
      $(insert_class).after(insert);
      insert = null;
      // Click handler for the toggle
      //       $('a.idt-whoareyou-toggle').click(function(){
      // Use the FriendFeed click handler

      $('a.idt-whoareyou-toggle-'+username).click(function(){
				    if($('.idt-whoareyou-subscriptions-'+username).html() == "") {
				      fetchSubscriptions(username, 1, display_mode);
				    }
				    selfPromote();
				    $('div.idt-whoareyou-toggle-'+username).toggle();
				  });
    }

    if ((document.location.pathname != '/') &&
	(document.location.pathname != '/public')
	) {
      if ($('.userlisttop')) {
	var username = unsafeWindow.gPath.slice(1);
	// Set vertical-align top to fix the profile image
	$('.userlisttop td').css('vertical-align','top')
	friendFeedDescribe(0, username);
      }
    }
    // Overwrite the userpopup.makeShadow method to add whoareyou description.
    if (typeof unsafeWindow.userpopup != 'undefined') {
      if (typeof unsafeWindow.userpopup.makeShadowWhoAreYou == 'undefined') {
	unsafeWindow.userpopup.makeShadowWhoAreYou = unsafeWindow.userpopup.makeShadow;
	unsafeWindow.userpopup.makeShadow = function() {
	  var B = $("#userpopup");
	  if (B.length == 0) {
	    return;
	  }
	  if (B.find('a:first')) {
	    var username = B.find('a:first').attr('href').slice(1);
	    // Stick in my "Who Are You" link?
	    friendFeedDescribe(1, username);
	  }
	  // Call the original.
	  unsafeWindow.userpopup.makeShadowWhoAreYou();
	}
      }
    }
  };

  /**
   *
   *  Base64 encode / decode
   *  http://www.webtoolkit.info/
   *
   **/

  var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = Base64._utf8_encode(input);

      while (i < input.length) {

	chr1 = input.charCodeAt(i++);
	chr2 = input.charCodeAt(i++);
	chr3 = input.charCodeAt(i++);

	enc1 = chr1 >> 2;
	enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	enc4 = chr3 & 63;

	if (isNaN(chr2)) {
	  enc3 = enc4 = 64;
	} else if (isNaN(chr3)) {
	  enc4 = 64;
	}

	output = output +
	  this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	  this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

      }

      return output;
    },

    // public method for decoding
    decode : function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {

	enc1 = this._keyStr.indexOf(input.charAt(i++));
	enc2 = this._keyStr.indexOf(input.charAt(i++));
	enc3 = this._keyStr.indexOf(input.charAt(i++));
	enc4 = this._keyStr.indexOf(input.charAt(i++));

	chr1 = (enc1 << 2) | (enc2 >> 4);
	chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	chr3 = ((enc3 & 3) << 6) | enc4;

	output = output + String.fromCharCode(chr1);

	if (enc3 != 64) {
	  output = output + String.fromCharCode(chr2);
	}
	if (enc4 != 64) {
	  output = output + String.fromCharCode(chr3);
	}

      }

      output = Base64._utf8_decode(output);

      return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {

	var c = string.charCodeAt(n);

	if (c < 128) {
	  utftext += String.fromCharCode(c);
	}
	else if((c > 127) && (c < 2048)) {
	  utftext += String.fromCharCode((c >> 6) | 192);
	  utftext += String.fromCharCode((c & 63) | 128);
	}
	else {
	  utftext += String.fromCharCode((c >> 12) | 224);
	  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	  utftext += String.fromCharCode((c & 63) | 128);
	}

      }

      return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;

      while ( i < utftext.length ) {

	c = utftext.charCodeAt(i);

	if (c < 128) {
	  string += String.fromCharCode(c);
	  i++;
	}
	else if((c > 191) && (c < 224)) {
	  c2 = utftext.charCodeAt(i+1);
	  string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	  i += 2;
	}
	else {
	  c2 = utftext.charCodeAt(i+1);
	  c3 = utftext.charCodeAt(i+2);
	  string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	  i += 3;
	}

      }

      return string;
    }

  }

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
