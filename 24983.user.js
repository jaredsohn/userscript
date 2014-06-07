/*
	FriendFeed Sticky Search
	http://ffapps.com/stickysearch
*/

// ==UserScript==
// @name           FriendFeed Sticky Search
// @namespace      http://ffapps.com/stickysearch
// @description    Search
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings/*
// @version        0.6
// ==/UserScript==

const FF_DIALOG_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAA" +
	"AQCAMAAAAoLQ9TAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2" +
	"VSZWFkeXHJZTwAAABFUExURWaY102GzF2Q0J2%2F6F6R0aLC6nWk3mGV1anH7Imz52uc2VeMzl" +
	"KJznGf2EeByJS45X%2Br4oSv5EiCybDM71eN0JO660N%2BxympYLkAAABzSURBVHjabI7ZEoNA" +
	"CAT3iGeiKBn4%2F0%2FNEFOWGvthoZodiuQXkr9PbKIXaVgakT5ELfG1TM9fpM6uQGafAaUo3h" +
	"npdI1C4Tkae43xriFgNqh6a9Z6pkDiAAAT6bvDjuBO%2FEVi6cIrlpj7Lh6bkFtx5iPAAM0JEt" +
	"zoEv4KAAAAAElFTkSuQmCC";

var ffapps = {
	'version':	'0.6',
	'name':			'StickySearch',
	'author':		'Aviv Shaham <aviv@sent.com>',
	'link':			'http://ffapps.com/stickysearch/',
	'usId':			'24983',
}

var re = {
	'remoteKey': 	/remote key:.*[\s]?.*>([\w]+)</,
	'username':		/\/([\w]+)"/,
	'uuid':				/([\w]{8}(?:-[\w]{4}){3}-[\w]{12})/
};

var user = {
	'uuid':null,'username':null,'AT':null,'remoteKey':null,'firstRun':false,
};

var config = {
	'defaultSticky':'({d2hvOmZmYXBwcyBuZXdz:{query:"who:ffapps news", label:"#News from ffapps", watchlist:"1", entryIds:[], newCount:0}, updated:1207772121398})',
	'refreshRate': 30,
	'refreshQueryDelay': 5,
};

var busy = false;
var searches = [];

(function() {

	autoUpdateFromUserscriptsDotOrg({
		name: 'FriendFeed Sticky Search',
		url: 'http://userscripts.org/scripts/source/'+ffapps.usId+'.user.js',
		version: ffapps.version,
	});
			
	var stickyClickHandlers = {

		ss_click : function(A) {
			var Q = A.parent().attr("sticky");
			resetStickyCount(Q);
			document.location = 'http://friendfeed.com/search?q='+encodeURIComponent(Q.base64d());
		},

		ss_edit_action : function(A) {
			var P = A.parents(".ss_item");
			if (A.attr('ssdata')) {
				var S = eval(A.attr('ssdata').base64d());
				P.html(S[4]);
				addStickySearch(S[0],S[1],S[2],S[3]);
			} else {
				var Q = P.attr("sticky");
				var D = [ Q, searches[Q].label, searches[Q].watchlist, searches[Q].newCount, P.html() ].toSource().base64e();
				$(A).parents(".ss_item").html('<div style="font-style:italic;color:gray;font-weight:normal;">Search query deleted - <a href="#" class="l_ss_edit_action" ssdata="'+D+'">Undo</a></div>');
				removeStickySearch(Q);
			}
		},

		ss_edit : function(A) { $(".ss_edit_btn").toggle() },

		ss_about : function(A) { },

		ss_add_action : function(A) {
			if (A.attr('ssdata')) {
				var Q = A.attr('ssdata');
				removeStickySearch(Q);
				ff.infoMessage("Ok, `"+Q.base64d().maxChars(30)+'` has been removed from StickySearch - <a href="#" class="l_ss_add_dialog">Re-add query</a>');
			} else {
				var L=$("#ss_label").val();
				var Q=$(".ss_query").val();
				var W=$(".ss_watchlist").attr("checked") ? '1':'0';
				$.closeDialog();$(".ss_search_tip").remove();
				ff.infoMessage("Added `"+Q.base64d().maxChars(60)+'` as a StickySearch! - <a href="#" class="l_ss_add_action" ssdata="'+Q+'">Undo</a>');
				addStickySearch(Q,L,W);
			}
		},

		ss_add_dialog : function(A) {
			var query = buildSearchString();
			var H = '<div class="dialog hideent"><div class="title"><img src="' + FF_DIALOG_IMAGE + '" class="icon">Add a StickySearch</div><div class="content" style="padding-right:1em;line-height:17px;">StickySearch lets you <strong>save frequently-used searches</strong>, with the option to also add your query to the StickySearch <strong>Live Watch List</strong> and be notified of new results instantly! While you continue to browse and enjoy FriendFeed uninterruptedly, StickySearch queries the FriendFeed servers in the background and saves you the trouble of having to search your favorite queries over and over.<BR><BR>Your search query: <strong>'+query+'</strong>';
			H += '<div class="hideentoptions" style="padding-left:2em;"><div><label for="cb_1" style="font-size:110%;"><input style="margin-left:0em;" type="checkbox" name="ss_watchlist" id="cb_1" class="cb ss_watchlist" checked/>Also add to Watch List</label>';
			H += '</div><BR><table class="form"><tr><td class="label" style="font-weight:normal;">Optional label</td><td class="value"><input id="ss_label" name="ss_label" type="text" size="22" style="font-weight:normal;"/></td></tr></table><input type="hidden" class="ss_query" name="ss_query" value="'+query.base64e()+'"><button style="margin-top:10px;" class="l_ss_add_action">Add query</button></div><a href="#" class="close l l_closedialog">Cancel</a></div></div>';
			$.dialog(H, A.offset());
			ff.showInputHint($("#ss_label"), "Apple, FriendFeed reviews");
		},

		ss_remove_action : function(A) {
			if (A.attr('ssdata')) {
				var S = eval(A.attr('ssdata').base64d());
				addStickySearch(S[0],S[1],S[2],0);
				ff.infoMessage("Ok, `"+S[0].base64d().maxChars(30)+'` has been re-added to StickySearch - <a href="#" class="l_ss_remove_action">Undo</a>');
			} else {
				var _Q = buildSearchString();
				var Q = _Q.base64e();
				var D = [ Q, searches[Q].label, searches[Q].watchlist ].toSource().base64e();
				ff.infoMessage("Removed `"+_Q.maxChars(60)+'` from your StickySearch! - <a href="#" class="l_ss_remove_action" ssdata="'+D+'">Undo</a>');
				$.closeDialog();$(".ss_search_tip").remove();
				removeStickySearch(Q);
			}
		},

	};
	
	fetchRemoteKey = function() {
		$.ajax({url:"http://friendfeed.com/account/api",cache:false,success:function(html){
			M = html.match(re['remoteKey']);
			user['remoteKey'] = M ? M[1] : '';
			setGMValue('remoteKey', user['remoteKey']);
		}});
	}

	buildSearchString = function() {
		var Q = decodeURIComponent(window.location.search.substring(1).replace(/\+/g,' ')).split('&');
		if (!Q) return null;
		var query = '';
		$.each(Q,function(){
			[k,v]=this.split('=');
			switch(k) {
				case 'q':
					query += ' '+v; break;
				case 'who':
				case 'service':
					if (v)
						query += ' '+k+':'+v;
					break;
				case 'public':
					query += ' who:everyone'; break;
			}
		});
		return query.substring(1);
	}

	updateStickyList = function(W) {
		if (!searches.updated) return;
		$(".ss_list_0:not(:has('div')),.ss_list_1:not(:has('div'))").remove();
		if (W) {
			if (searches[W].newCount) {
				$("#rightstickysearch div[@sticky="+W+"]").css("font-weight","bold").find(".ss_count").html(' ('+searches[W].newCount+')').css("font-weight","bold").animate({opacity: 1},3000);
				window.setTimeout(function() { $("#rightstickysearch div[@sticky="+W+"]").find(".ss_count").animate({opacity: 0.4}, 6000,'',function(){$(this).css("font-weight","normal")}); }, 120000);
			}
		} else {
			$.each(searches,function(Q,D){
				if (D.newCount)
					$("#rightstickysearch div[@sticky="+Q+"]").css("font-weight","bold").find(".ss_count").html(' ('+D.newCount+')');
			});
		}
	}
	
	displayStickyList = function() {
		if (!searches.updated) return;
		var _top = ($('#fltrFriends').val()) ? '70px':'40px';
		var P = $('<div id="rightstickysearch" style="position:absolute;right:0px;top:'+_top+';z-index:1000;width:300px;text-align:left;border:1px solid silver;padding:10px;"><div class="ss_list_1"><strong>StickySearch <span style="color:#C03000;">Live</span> Watch List:</strong></div><div class="ss_list_0" style="margin-top:18px;"><strong>Saved Searches:</strong></div></div>');
		$.each(searches,function(Q,D){
			if (D.query) {
				var I = $('<div style="padding-top:8px;" class="ss_item" sticky=""><a class="l_ss_click" href="#"></a><span class="ss_count" style="font-weight:normal;"></span><span class="ss_edit_btn" style="display:none;">&nbsp;<a class="l_ss_edit_action" style="color:#8E574E;text-decoration:none;font-weight:normal;font-size:11px;" href="#">[x]</a></span></div>');
				I.attr("sticky",Q).find("a:first").html(D.label).next().css("opacity",0.4);
				P.find('.ss_list_'+D.watchlist).append(I);
			}
		});
		var BB = $('<div style="text-align:right;position:relative;right:1px;bottom:1px;font-size:11px;color:silver;"><a href="#" style="color:#7777CC;" class="l_ss_edit">edit</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" style="color:#7777CC;" class="l_ss_about">about</a></div>');
		P.append(BB);
		$("#rightsearch").css("width","300px").after(P);
		updateStickyList();
	}

	processSearchResults = function(query, commitChanges, updateDisplay, data, etag) {
		var json = eval("("+data+")");
		var firstTime = (searches[query].entryIds.length === 0);
		var C = searches[query].newCount;
		searches[query].lastEtag = etag;
		
		$.each(json['entries'], function(){
			if (firstTime || searches[query].entryIds.indexOf(this['id']) == -1) {
				searches[query].entryIds.push(this['id']);
				C++;
			}
		});

		searches[query].newCount = (firstTime) ? 0 : C;

		if (commitChanges) {
			saveStickySearch();
			if (updateDisplay)
				updateStickyList(query);
		}
		else
			updateStickyList();
	}

	runSearchQuery = function(query, commitChanges, updateDisplay) {
		if (!commitChanges) commitChanges = false;
		if (!updateDisplay) updateDisplay = false;
		if (!searches[query]) return;
		$.ajax({
			url:"http://friendfeed.com/api/feed/search",
			cache:true,
			data:{"q":query.base64d()},
			dataType:'json',
			beforeSend:function(xhr){
				if (searches[query].lastEtag)
					xhr.setRequestHeader("If-None-Match", searches[query].lastEtag);
				if (query.indexOf("who:everyone") == -1)
					xhr.setRequestHeader("Authorization", getBasicAuth(user['username'], user['remoteKey']));
			},
			complete:function(xhr) {
				if (xhr.status == 200) {
					var etag = xhr.getResponseHeader('Etag');
					var data = xhr.responseText;
					processSearchResults(query, commitChanges, updateDisplay, data, etag);
				}
			}
		});
	}

	addStickySearch = function(Q,L,W,C) {
		L=(L==Q.base64d() || !L || L == "Apple, FriendFeed reviews") ? Q.base64d() : '#'+L;
		searches[Q] = {'query':Q.base64d(), 'label':L, 'watchlist':W, 'entryIds':[], 'newCount':C||0 };
		if (C===undefined)
			runSearchQuery(Q, true);
		else
			saveStickySearch();
	}
	
	resetStickyCount = function(Q) {
		if (searches[Q].newCount>0) {
			searches[Q].newCount=0;
			saveStickySearch();
		}
	}
	
	restoreStickySearch = function() {
		searches = getGMValue('searches') ? eval(getGMValue('searches')) : {};
	}
	
	removeStickySearch = function(Q) {
		delete searches[Q]; saveStickySearch();
	}
	
	saveStickySearch = function() {
		searches.updated = new Date().getTime(); setGMValue('searches',searches.toSource());
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

	insertSearchPageTips = function (){
		var query = buildSearchString();
		if (query && searches[query.base64e()]) { // query already saved
			$("#feedcontainer").before('<div style="margin-bottom:1.70em;margin-left:5px;" class="ss_search_tip"><a href="#" class="l_ss_remove_action">Remove this query from StickySearch</a></div>');
		} else if (query) {
			$("#feedcontainer").before('<div style="margin-bottom:1.70em;margin-left:5px;" class="ss_search_tip"><a href="#" class="l_ss_add_dialog">Add to StickySearch</a> - <strong>Let StickySearch monitor this search query for you or simply save it for later</strong></div>');
		}
	}

	initStickyStorage = function() {
		if (isFirstRun())
		{
			user['firstRun'] = true;
			setGMValue("searches", config.defaultSticky);
			setGMValue("firstRun","1");
		}
		else
			restoreStickySearch();
	}

	refreshSticky = function() {
		if (!busy) {
			var C = 0;
			$.each(searches,function(Q,D){
				if (D.watchlist=='1') {
					busy = true; C++;
					window.setTimeout(function(){runSearchQuery(Q,true,true);}, (1000*config.refreshRate)+(C*config.refreshQueryDelay*1000));
				}
			});
			if (busy)
				window.setTimeout(function(){busy=false;}, (1000*config.refreshRate)+(C*config.refreshQueryDelay*1000)+2000);
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
	
  initFFAPPS_StickySearch = function() {
		if (!isLogged()) { return }

		initStickyStorage();

		// extend FriendFeed's clickHandlers functionality to capture StickySearch events
		$.extend(ff.clickHandlers, stickyClickHandlers);

		if (path('/search'))
			return insertSearchPageTips();

		if (path('/')) {
			displayStickyList();
			window.setInterval(refreshSticky, 5*1000);
		}
	}

  function jquery_wait() {
		ff = unsafeWindow;
    if(typeof ff.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = ff.jQuery; initFFAPPS_StickySearch(); }
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