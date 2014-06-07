/*
	FriendFeed TinyURL Resolver
	http://ffapps.com/tinyurl/
*/

// ==UserScript==
// @name           FriendFeed TinyURL Resolver
// @namespace      http://ffapps.com/tinyurl/
// @description    One-click instant inline preview of TinyURL urls that show up on FriendFeed, usually included in Twitter messages
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/account/*
// @version        0.3
// ==/UserScript==

var ffapps = {
	'version':	'0.3',
	'name':			'FriendFeed TinyURL Resolver',
	'author':		'Aviv Shaham <aviv@sent.com>',
	'link':			'http://ffapps.com/tinyurl/',
	'usId':			'25435',
};

var services = {
	'tinyurl.com': {
		'find': /id="redirecturl" href="(.*?)"/,
		'url': 'http://preview.tinyurl.com/%id%',
	},
	'is.gd': {
		'find': /points to <a href="(.*?)"/,
		'url': 'http://is.gd/%id%-',
	},
	'snurl.com': {
		'find': /(http(.*))\b/,
		'url': 'http://snipurl.com/resolveurl?id=%id%',
	},
	'snipr.com': {
		'find': /(http(.*))\b/,
		'url': 'http://snipurl.com/resolveurl?id=%id%',
	},
}

var re = {
	'remoteKey': 		/remote key:.*[\s]?.*>([\w]+)</,
	'username':			/\/([\w]+)"/,
	'uuid':					/([\w]{8}(?:-[\w]{4}){3}-[\w]{12})/,
};

var user = {
	'uuid':null,'username':null,'AT':null,'remoteKey':null,
	'firstRun':false,'resolved':{},
};

var time = new Date().getTime().toString();

const FF_LOADING_IMAGE = "data:image/gif,GIF89a%10%00%10%00%F2%00%00%FF%FF%FF" +
	"%99%99%99%E6%E6%E6%B3%B3%B3%99%99%99%BF%BF%BF%CC%CC%CC%D3%D3%D3!%FF%0BNETS" +
	"CAPE2.0%03%01%00%00%00!%FE%1DBuilt%20with%20GIF%20Movie%20Gear%204.0%00!%F" +
	"E%15Made%20by%20AjaxLoad.info%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%0" +
	"0%10%00%00%033%08%BA%DC%FE0%CAIk%13c%08%3A%08%19%9C%07N%98f%09E%B11%C2%BA%" +
	"14%99%C1%B6.%60%C4%C2q%D0-%5B%189%DD%A6%079%18%0C%07Jk%E7H%00%00!%F9%04%09" +
	"%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%034%08%BA%DC%FEN%8C!%20%1B%84%0" +
	"C%BB%B0%E6%8ADqBQT%601%19%20%60LE%5B%1A%A8%7C%1C%B5u%DF%EDa%18%07%80%20%D7" +
	"%18%E2%86C%19%B2%25%24*%12%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%1" +
	"0%00%00%036%08%BA2%23%2B%CAA%C8%90%CC%94V%2F%06%85c%1C%0E%F4%19N%F1IBa%98%" +
	"ABp%1C%F0%0A%CC%B3%BD%1C%C6%A8%2B%02Y%ED%17%FC%01%83%C3%0F2%A9d%1A%9F%BF%0" +
	"4%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%033%08%BAb%25%2B%" +
	"CA2%86%91%EC%9CV_%85%8B%A6%09%85!%0C%041D%87a%1C%11%AAF%82%B0%D1%1F%03bR%5" +
	"D%F3%3D%1F08%2C%1A%8F%C8%A4r9L%00%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%" +
	"10%00%10%00%00%032%08%BAr'%2BJ%E7d%14%F0%18%F3L%81%0C%26v%C3%60%5CbT%94%85" +
	"%84%B9%1EhYB)%CF%CA%40%10%03%1E%E9%3C%1F%C3%26%2C%1A%8F%C8%A4R%92%00%00!%F" +
	"9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%033%08%BA%20%C2%909%17%E" +
	"3t%E7%BC%DA%9E0%19%C7%1C%E0!.B%B6%9D%CAW%AC%A21%0C%06%0B%14sa%BB%B05%F7%95" +
	"%01%810%B0%09%89%BB%9Fm)J%00%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00" +
	"%10%00%00%032%08%BA%DC%FE%F0%09%11%D9%9CU%5D%9A%01%EE%DAqp%95%60%88%DDa%9C" +
	"%DD4%96%85AF%C50%14%90%60%9B%B6%01%0D%04%C2%40%10%9B1%80%C2%D6%CE%91%00%00" +
	"!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%032%08%BA%DC%FE0%CAI%" +
	"ABeB%D4%9C)%D7%1E%08%08%C3%20%8E%C7q%0E%0410%A9%CA%B0%AEP%18%C2a%18%07V%DA" +
	"%A5%02%20ub%18%82%9E%5B%11%90%00%00%3B%00%00%00%00%00%00%00%00%00";

(function() {

	autoUpdateFromUserscriptsDotOrg({
		name: 'FriendFeed TinyURL Resolver',
		url: 'http://userscripts.org/scripts/source/'+ffapps.usId+'.user.js',
		version: ffapps.version,
	});

	String.prototype.maxChars = function(max) { if (max < this.length) { return this.substring(0,max)+'...' } else { return this.substring(0); } }

	function getGMValue(k,d) { if(typeof d=='undefined'){d=null;} return GM_getValue(user['username']+"_"+k,d); }

	function setGMValue(k,v) { window.setTimeout(function() { GM_setValue(user['username']+"_"+k,v);}, 0); return }
	
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

	isLogged = function() {
		user['AT'] = getCookie('AT');
		user['uuid'] = getCookie('U','').split('|')[0];
		if (user['AT'] && user['uuid']) {
			if (ff.gUserLink) {
				user['username'] = ff.gUserLink.match(re['username'])[1];
				user['resolved'] = (getGMValue('resolved')) ? eval(getGMValue('resolved')) : {};
				
			}
			return true;
		}
	}

	resolveRequest = function(url, container) {
		var C = url.match(/http\:\/\/([a-zA-Z0-9\.]+)\/([a-zA-Z0-9]+)/);
		var service = C[1];
		var id = C[2];
		if (services[service]) {
		  GM_xmlhttpRequest({
				method: 'GET',
				url: services[service].url.replace('%id%', id),
				onload: function(resp) {
					if (resp.status == 200) {
						var L = resp.responseText.match(services[service].find)[1];
						container.html(L).attr('href', L);
						ff.removeLoading();
						if (user['resolved']) {
							user['resolved'][url] = L;
							setGMValue('resolved', user['resolved'].toSource());
						}
					} else {
						window.setTimeout(function() { resolveRequest(url, container);}, 7500);
					}
				}
			});
		}
	}

	insertResolverButtons = function() {
		GM_addStyle('.l_tinyurl_resolver { color:#FF3366;font-size:11px;text-decoration:none;font-weight:bold; }');
		
		$(".entry .link").find("a[@href*=tinyurl.com],a[@href*=is.gd],a[@href*=snurl.com],a[@href*=snipr.com]").each(function(){
			link = $(this).attr('href');
			if (user['resolved'][link]) {
				$(this).html(user['resolved'][link].maxChars(30)).attr('href',user['resolved'][link]);
			} else {
				$(this).after(' <a href="#" class="l_tinyurl_resolver">?</a>');
			}
		});

		ff.clickHandlers.tinyurl_resolver = function(A){
			var container = A.prev();
			var loadingImg = ' <img src="'+FF_LOADING_IMAGE+'" class="loading" width="12" height="12"/>';
			A.html(loadingImg).blur();
			window.setTimeout(function() { resolveRequest(container.attr('href'), container);}, 0);
		};
	}


  initFFAPPS_TinyURLResolver = function() {
		isLogged();
		insertResolverButtons();
	}

  function jquery_wait() {
		ff = unsafeWindow;
    if(typeof ff.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = ff.jQuery; initFFAPPS_TinyURLResolver(); }
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

    if (isSomeoneChecking && (_now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < ONE_DAY) return;

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