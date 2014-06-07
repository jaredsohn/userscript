/*
	FriendFeed Show Likes
	http://ffapps.com/showlikes
*/

// ==UserScript==
// @name           FriendFeed Show Likes
// @namespace      http://ffapps.com/showlikes/
// @description    Displays the full list of Likes for a particular entry
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings/*
// @version        0.1
// ==/UserScript==

const FF_DIALOG_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAA" +
	"AQCAMAAAAoLQ9TAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2" +
	"VSZWFkeXHJZTwAAABFUExURWaY102GzF2Q0J2%2F6F6R0aLC6nWk3mGV1anH7Imz52uc2VeMzl" +
	"KJznGf2EeByJS45X%2Br4oSv5EiCybDM71eN0JO660N%2BxympYLkAAABzSURBVHjabI7ZEoNA" +
	"CAT3iGeiKBn4%2F0%2FNEFOWGvthoZodiuQXkr9PbKIXaVgakT5ELfG1TM9fpM6uQGafAaUo3h" +
	"npdI1C4Tkae43xriFgNqh6a9Z6pkDiAAAT6bvDjuBO%2FEVi6cIrlpj7Lh6bkFtx5iPAAM0JEt" +
	"zoEv4KAAAAAElFTkSuQmCC";

var ffapps = {
	'version':	'0.1',
	'name':			'FriendFeed Show Likes',
	'author':		'Aviv Shaham <aviv@sent.com>',
	'link':			'http://ffapps.com/showlikes/',
	'usId':			'25038',
};

var re = {
	'remoteKey': 	/remote key:.*[\s]?.*>([\w]+)</,
	'username':		/\/([\w]+)"/,
	'uuid':				/([\w]{8}(?:-[\w]{4}){3}-[\w]{12})/
};

var user = {
	'uuid':null,'username':null,'AT':null,'remoteKey':null,'firstRun':false,
};

(function() {

	autoUpdateFromUserscriptsDotOrg({
		name: 'FriendFeed Sticky Search',
		url: 'http://userscripts.org/scripts/source/'+ffapps.usId+'.user.js',
		version: ffapps.version,
	});

	insertLikesLink = function(){
		$(".likes").filter(":contains(other people),:contains(other person)").each(function(){
			var H = $(this).html();
			var P = H.match(/(\d+\sother\s(people|person))/)[1];
			var B = '<a href="#" class="l_showlikes">'+P+'</a>';
			$(this).html(H.replace(P,B));
		});
	}

	updateLikes = function(E,D){
		var B=[];
		var C='<div class="likes" style="line-height:20px;">';
		A=$(".entry[@id=e-"+E+"]");
		A.find(".likes a").each(function(){
			B.push($(this).attr('href'));
		});
		$.each(D,function(){
			var P=this['user']['profileUrl'].replace('http://friendfeed.com','');
			if (-1==B.indexOf(P))
				C+='<a href="'+P+'" class="friend">'+this['user']['name']+'</a>, ';
		});
		C=C.substring(0,C.length-2)+"</div>";
		A.find(".likes").after(C);
	}

	fetchRemoteKey = function() {
		$.ajax({url:"http://friendfeed.com/account/api",cache:false,success:function(html){
			M = html.match(re['remoteKey']);
			user['remoteKey'] = M ? M[1] : '';
			setGMValue('remoteKey', user['remoteKey']);
		}});
	}

	var customClickHandlers = {

		showlikes : function(A) {
			if (path('/') || path('/public'))
				var N = A.parents(".body").find(".summary a:first").attr("href").substring(1);
			else
				var N = window.location.pathname.substring(1);
			var E =	A.parents(".entry").attr("id").substring(2);
			fetchLikes(N,E);
		},

	};

	processFetchLikes = function(N,E,S,data) {
		var json = eval("("+data+")");
		var F=false;
		$.each(json['entries'], function(){
			if (this['id']==E) {
				F=true;
				console.log('at:'+S);
				updateLikes(E,this['likes']);
			}
		});
		if (F==false && S<100)
			fetchLikes(N,E,S+30)
	}

	fetchLikes = function(N,E,S) {
		S=S||0;
		$.ajax({
			url:"http://friendfeed.com/api/feed/user/"+N+"?start="+S,
			cache:true,
			dataType:'json',
			beforeSend:function(xhr){
				xhr.setRequestHeader("Authorization", getBasicAuth(user['username'], user['remoteKey']));
			},
			complete:function(xhr) {
				if (xhr.status == 200) {
					var data = xhr.responseText;
					processFetchLikes(N,E,S,data);
				}
			}
		});
	}

	isLogged = function() {
		user['AT'] = getCookie('AT');
		user['uuid'] = getCookie('U','').split('|')[0];
		if (user['AT'] && user['uuid']) {
			user['username'] = ff.gUserLink ? ff.gUserLink.match(re['username'])[1] : null;
			user['remoteKey'] = getGMValue('remoteKey') || fetchRemoteKey();
			return true;
		}
	}

	initShowLikes = function() {
		if (isFirstRun())
		{
			user['firstRun'] = true;
			setGMValue("firstRun","1");
		}
	}

	getCookie = function(name, defaultValue) {
	  var re = new RegExp(name + "=([^;]+)");
	  var value = re.exec(document.cookie);
	  return (value != null) ? unescape(value[1]) : defaultValue;
	}

	setCookie = function(name, value) {
	  var today = new Date();
	  var expiry = new Date(today.getTime() + 3 * 60 * 1000);
	  document.cookie = name + "=" + escape(value) + "; expires=" + expiry.toGMTString() + "; path=/";
	}

	Array.prototype.removeValue = function(val) { return this.splice(this.indexOf(val),1); }

	String.prototype.maxChars = function(max) { if (max < this.length) { return this.substring(0,max)+'...' } else { return this } }
	
	String.prototype.base64e = function() { return Base64.encode(this) }

	String.prototype.base64d = function() { return Base64.decode(this) }
	
	String.prototype.clean = function() { return this.toLowerCase().replace(/[^\w]/g,'') }
	
	function getBasicAuth(u,p) { return "Basic " + Base64.encode(u+':'+p) }
	
	function path(str) { return (str==window.location.pathname) }

	function getGMValue(k) { return GM_getValue(user['username']+"_"+k); }

	function setGMValue(k,v) { window.setTimeout(function() { GM_setValue(user['username']+"_"+k,v);}, 0); return }

	function isFirstRun() { return (getGMValue("firstRun")!='1'); }
	
  initFFAPPS_ShowLikes = function() {
		if (!isLogged()) { return }
		initShowLikes();
		$.extend(ff.clickHandlers, customClickHandlers);
		insertLikesLink();
	}

  function jquery_wait() {
		ff = unsafeWindow;
    if(typeof ff.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = ff.jQuery; initFFAPPS_ShowLikes(); }
  }

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
    var _now = new Date().getTime();
    GM_setValue('CHECKING', _now.toString());

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