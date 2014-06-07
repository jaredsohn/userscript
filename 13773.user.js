// ==UserScript==
// @name           easy I'm reading now
// @namespace      http://d.hatena.ne.jp/Cormorant/
// @description    Usage: Ctrl + Shift + Enter -> "Browsing: ****" on Twitter!
// @include        *
// @version        0.9.1
// ==/UserScript==
//
// last modified: 2010/11/30 19:30
// histry : undef
// 
// 


(function (){

var SCRIPT_NAME        = "easy I'm reading now";
var UPDATE_URL         = 'http://api.twitter.com/1/statuses/update.json';
var CONSUMER_KEY       = '9ujBkWuqhJzguEHgOm2LQ';
var CONSUMER_SECRET    = 'cowVnPEcW9Kxnrv8pRnHM7iSQy00s6ZuwtepM3mXXA';
var OURL_REQUEST_TOKEN = 'https://api.twitter.com/oauth/request_token';
var OURL_AUTHORIZE     = 'https://api.twitter.com/oauth/authorize';
var OURL_ACCESS_TOKEN  = 'https://api.twitter.com/oauth/access_token';

var VERBOSE = false;

var w = window, d = document;
if (typeof unsafeWindow != 'undefined') { w = unsafeWindow }

function debug(mes, useAlert) {
	if (w.console) w.console.log(mes);
	else {
		if (typeof mes != 'string') mes = uneval(mes);
		GM_log(mes);
	}

	if (useAlert) alert(mes);
}

function error(mes, useAlert) {
	if (w.console) w.console.error(mes);
	else {
		if (typeof mes != 'string') mes = uneval(mes);
		GM_log('Warning, ' + mes);
	}

	if (useAlert) alert(mes);
}

function mess(func, res, mes, useAlert, noResTxt) {
	var site = res.finalUrl.match(/\/\/([^\/]+)/)[1];
	var sts  = res.status + ': ' + res.statusText;
	if (!noResTxt) sts += ' - ' + res.responseText;
	func('[' + site + '] ' + mes + ' - ' + sts, useAlert);
}

function succ() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(debug); mess.apply(mess, args);
}

function fail() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(error); mess.apply(mess, args);
}

function h2q(hash) {
	var query = [];
	for (key in hash) {
		query.push(key + '=' + encodeURIComponent(hash[key]));
	}
	return query.sort().join('&');
}

function q2h(query) {
	var arr = query.split('&'), hash = {};
	for (var i = 0, l = arr.length, a = []; i < l; i++) {
		a = arr[i].split('=');
		hash[a[0]] = a[1];
	}
	return hash;
}

//GM_registerMenuCommand(SCRIPT_NAME + " - configure", configure);
GM_registerMenuCommand(SCRIPT_NAME + " - delete OAuth tokens", function() { GM_deleteValue('token') });


var Browsing = function() { this.init.apply(this, arguments) };

Browsing.prototype.confDefault = {
	general: {
		useShortening : 40,
		format        : '%TAG% %TITLE% %URL%',
		defaultTag    : "Browsing:",
		wrapTitle     : ['', ''],
		wrapStatus    : ['', ' :'],
		wrapUrl       : ['', ''],
		replaceTag2Sts: true,
		getSelection  : true,
		quoteMark     : ['"', '"']
	},
	shortener: [
		{
			name: 'bit.ly',
			url : 'http://bit.ly/api?url=%URL%',
			use : true,
			isError: '^(?:(?!^http:).)',
			account: false,
			user: 'user',
			pass: 'pass',
			loginUrl: 'http://api.bit.ly/v3/shorten?format=txt&login=%USER%&apiKey=%PASS%&longUrl=%URL%'
		},
		{
			name: 'j.mp',
			url : 'http://j.mp/api?url=%URL%',
			use : true,
			isError: '^(?:(?!^http:).)',
			account: false,
			user: 'user',
			pass: 'pass',
			loginUrl: 'http://api.bit.ly/v3/shorten?format=txt&domain=j.mp&login=%USER%&apiKey=%PASS%&longUrl=%URL%'
		},
		{
			name: 'is.gd',
			url : 'http://is.gd/api.php?longurl=%URL%',
			use : true,
			isError: '^(?:(?!^http:).)',
			account: false
		},
		{
			name: 'tinyurl',
			url : 'http://tinyurl.com/api-create.php?url=%URL%',
			use : true,
			isError: '^(?:(?!^http:).)',
			account: false
		},
		{
			name: 'titanurl',
			url : 'http://titanurl.com/create.php?url=%URL%',
			use : true,
			method: 'post',
			referer: 'http://titanurl.com/',
			isSuccess: '(http://titanurl.com/[^\s\'"]{1000,})',
			isError: '^(?:(?!TitanURL was created!).)*$',
			account: false
		}
	]
};

Browsing.prototype.init = function(oauth) {
	this.conf = GM_getValue('ini');
	if (this.conf) this.conf = JSON.parse(this.conf);
	else           this.conf = this.confDefault;

	if (VERBOSE) debug('Browsing.conf: '), debug(this.conf);

	var i   = 0;
	var th  = this;
	var sh  = this.conf.shortener;
	var ge  = this.conf.general;
	var url = d.location.href;

	this.oauth = oauth;
	this.title = d.title;
	this.status = '';
	this.select = w.getSelection().toString();
	if (ge.getSelection && this.select) this.select = ge.quoteMark[0] + this.select + ge.quoteMark[1];

	var xhr = function() {
		if (i >= sh.length) {
			th.url = url; th.prompt(); return;
		}
		else if (!sh[i].use) xhr(++i);
		else {
			var reqMethod = 'GET', shortenerUrl = sh[i].url, query = '', header = {};
			if (sh[i].method) reqMethod = sh[i].method;
			if (sh[i].referer) header.referer = sh[i].referer;
			if (sh[i].account && sh[i].loginUrl)
				shortenerUrl = sh[i].loginUrl.replace(/%USER%/g, encodeURIComponent(sh[i].user)).replace(/%PASS%/g, encodeURIComponent(sh[i].pass));

			shortenUrl = shortenerUrl.replace(/%URL%/g, encodeURIComponent(url));
			if (reqMethod.toUpperCase() == 'POST') {
				query = shortenUrl.replace(/^[^?]+\?/, '');
				shortenUrl = shortenUrl.match(/^[^?]+/)[0];
				header['content-type'] = 'application/x-www-form-urlencoded';
			}

			var opt = {
				method : reqMethod,
				url    : shortenUrl,
				data   : query,
				headers: header,
				onload : function(res) {
					if (VERBOSE) debug('Browsing.shortenUrlSection.onload: response'), debug(res);

					if (sh[i].isError && res.responseText.match(new RegExp(sh[i].isError))) {
						fail(res, 'Faild'); xhr(++i);
					}
					else {
						if (sh[i].isSuccess) th.url = res.responseText.match(new RegExp(sh[i].isSuccess))[1];
						else                 th.url = res.responseText;

						if (VERBOSE) debug('Browsing.shortenUrlSection.isSuccess: url: '+th.url);
						th.prompt();
					}
				},
				onerror: function(res) {
					if (VERBOSE) debug('Browsing.shortenUrlSection.onerror: response'), debug(res);

					fail(res, 'Faild'); xhr(++i);
				}
			};

			if (VERBOSE) debug('Browsing.shortenUrlSection: GM_XHR.option: '), debug(opt);

			GM_xmlhttpRequest(opt);
		}
	};

	xhr();
};

Browsing.prototype.prompt = function() {
	var p = this.formatStatus();
	if (!p) {
		error('tweet format is too long! do configure command and shorten format.', 1);
		return;
	}

	this.status = prompt(p, this.select);

	if (this.status == null) return;

	this.status = this.formatStatus();
	if (!this.status) {
		error('comment too long!', 1);
		return;
	}

	if (VERBOSE) debug('Browsing.prompt: status: '+this.status);

	this.post();
};

Browsing.prototype.post = function() {
	var status = this.oauth.ex.status = this.status;
	this.oauth.sign(UPDATE_URL);

	if (VERBOSE) debug('Browsing.post: OAuth'), debug(this.oauth);

	var opt = this.oauth.toGM_XHR();
	opt.onload = function(res) {
		if (VERBOSE) debug('Browsing.post.onload: response'), debug(res);
		switch (res.status) {
			case 200:
				succ(res, 'Loaded - ' + status, 0, 1);

				break;
			case 401:
				error(res, 'Unauthorized? - please do authentication process again.' ,1);

				GM_deleteValue('token');

				break;
			default:
				fail(res, 'Failed - ' + status, 1); break;
		};
	};
	opt.onerror = function(res) {
		if (VERBOSE) debug('Browsing.post.onerror: response'), debug(res);
		fail(res, 'Faild', 1);
	};

	if (VERBOSE) debug('Browsing.post: GM_XHR.option'), debug(opt);

	GM_xmlhttpRequest(opt);
};

Browsing.prototype.formatStatus = function() {
	var t = this.title,
	    u = this.url,
	    s = this.status,
	    g = this.conf.general,
	    f = g.format;

	if (VERBOSE) debug('Browsing.formatStatus.format: ' + f);

	f = f.replace(/%TAG%/g,    s && g.replaceTag2Sts ? g.wrapStatus[0] + s + g.wrapStatus[1] : g.defaultTag)
	     .replace(/%STATUS%/g, s ? g.wrapStatus[0] + s + g.wrapStatus[1] : '')
	     .replace(/%TITLE%/g,  t ? g.wrapTitle[0]  + t + g.wrapTitle[1]  : '')
	     .replace(/%URL%/g,    g.wrapUrl[0] + u + g.wrapUrl[1]);

	if (VERBOSE) debug('Browsing.formatStatus.format.replaced: ' + f);

	if (f.length > 140) {
		var cutLength = f.length - 137;

		if (arguments.callee.done == true || t.length < cutLength) {
			arguments.callee.done = false;
			return '';
		}

		this.title = t.slice(0, -cutLength) + '...';
		arguments.callee.done = true;

		if (VERBOSE) debug('Browsing.formatStatus.format.cut: ' + this.title);
		return this.formatStatus();
	}

	arguments.callee.done = false;

	return f;
};

/*
	promptEx : function(status, select) {
		var div  = createElement("div");
		var ok   = createElement("input");
		var can  = createElement("input");
		var wrap = createElement("fieldset");
		var head = createElement("legend");
		var text = createElement("textarea");
		div.id = "GM_easy_im_reading_now";
		ok.type = can.type = "button";
		ok.value = "OK";
		can.value = "Cancel";
		text.value = select;

		opts = JSON.parse(GM_getValue());
	}
*/

addEventListener('keypress', function(e) {
	var c = (e.ctrlKey), s = (e.shiftKey), v = (e.keyCode == 13);
	if (c && s && v) {
		var oauth = new $GM_OAuth();
		if (VERBOSE) debug('OAuth: '), debug(oauth);

		if (oauth.verified)
			new Browsing(oauth);

		else {
			oauth.method = 'GET';
			var pin = document.getElementById('oauth_pin'),
			    mes = 'Failed to get OAuth token - please press Ctrl+Shit+Enter again',
			    succFunc = function(sMes, aMes, openTab) { return function(res) { switch (res.status) {
			    	case 200: succ(res, sMes);
			    		var token = q2h(res.responseText);
			    		if (oauth.oauth_verifier) token.verified = true;
			    		GM_setValue('token', JSON.stringify(token));

			    		alert(aMes);
			    		if (openTab) GM_openInTab(OURL_AUTHORIZE + '?oauth_token=' + token.oauth_token);

			    		break;
			    	default: GM_deleteValue('token'); fail(res, mes, 1); break;
			    } } },
			    failFunc = function() { return function(res) { GM_deleteValue('token'); fail(res, mes, 1) } };

			if ( oauth.oauth_token && pin && document.body.innerHTML.match(new RegExp('\\b'+SCRIPT_NAME+'\\b')) ) {
				pin = prompt('enter the following PIN', pin.textContent.replace(/\s/g,''));
				if (pin == null) return;

				oauth.oauth_verifier = pin;
				oauth.sign(OURL_ACCESS_TOKEN);

				var opt = oauth.toGM_XHR();
				opt.onload  = succFunc('Authenticated',
						'authentication is completed! now you can use ' + SCRIPT_NAME + '!');
				opt.onerror = failFunc();

				if (VERBOSE) debug('Browsing.access: xhrOpt: '), debug(opt);
				GM_xmlhttpRequest(opt);
			} else {
				oauth.sign(OURL_REQUEST_TOKEN);

				var opt = oauth.toGM_XHR();
				opt.onload  = succFunc('You got request token',
						"open authorize page to click allow button and press Ctrl+Shift+Enter on PIN page again.", 'opentab');
				opt.onerror = failFunc();

				if (VERBOSE) debug('Browsing.request: xhrOpt: '), debug(opt);
				GM_xmlhttpRequest(opt);
			}
		}
	}
}, true);


var $GM_OAuth = function() { this.init.apply(this, arguments) };

$GM_OAuth.prototype.init = function(key) {
	if (!key) key = 'token';
	var token = GM_getValue(key);
	if (token) token = JSON.parse(token);
	else       token = { oauth_token: '', oauth_token_secret: '', verified: false };

	this.ex = {};
	this.url = '';
	this.method = 'POST';
	this.verified = token.verified;
	this.oauth_consumer_key = CONSUMER_KEY;
	this.oauth_consumer_key_secret = CONSUMER_SECRET;
	this.oauth_token = token.oauth_token;
	this.oauth_token_secret = token.oauth_token_secret;
	this.oauth_nonce = this.getNonce(20);
	this.oauth_signature_method = 'HMAC-SHA1';
	this.oauth_timestamp = Math.floor(new Date().getTime() / 1000);
	this.oauth_version = '1.0';
};

$GM_OAuth.prototype.getProp = function(include) {
	var i, j, a = {};
	for (i in this) {
		if (i.match(/^oauth_/) && this[i]) a[i] = this[i];
		if (include && i == 'ex') for (j in this[i]) if (this[i][j]) a[j] = this[i][j];
	}
	return a;
};

$GM_OAuth.prototype.getNonce = function(length) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
	var nonce = '';
	for (var i = 0; i < length; i++) {
		nonce += chars[Math.floor(Math.random() * chars.length)];
	}
	return nonce;
};

$GM_OAuth.prototype.sign = function(url) {
	if (url) this.url = url;
	var query = this.toQuery(),
	    key   = this.oauth_consumer_key_secret+'&'+this.oauth_token_secret;
	    value = this.method + '&' + this.encode(this.url) + '&' + this.encode(query);

	this.oauth_signature = b64_hmac_sha1(key, value);
}

$GM_OAuth.prototype.toOAuthHeader = function() {
	var param = [], hash = this.getProp();
	delete hash.oauth_consumer_key_secret;
	delete hash.oauth_token_secret;
	for (key in hash) {
		param.push(key + '="' + this.encode(hash[key]) + '"');
	}
	return 'OAuth ' + param.sort().join(', ');
}

$GM_OAuth.prototype.toQuery = function(hash) {
	if (!hash) hash = this.getProp(1);
	delete hash.oauth_consumer_key_secret;
	delete hash.oauth_token_secret;

	var query = [];
	for (key in hash) {
		query.push(key + '=' + this.encode(hash[key]));
	}
	return query.sort().join('&');
}

$GM_OAuth.prototype.toGM_XHR = function(url) {
	if (!url) url = this.url;
	var opt = { method: this.method },
//	    query = this.toQuery(this.ex),
	    query = this.toQuery(),
	    isPost = (this.method.toUpperCase() == 'POST');

	opt.headers = isPost ? {
		'Content-type': 'application/x-www-form-urlencoded',
//		'Authorization': this.toOAuthHeader()
	} : {};
	opt.data = isPost ? query : '';
	if (isPost || url.indexOf('?', 0) != -1) opt.url = url;
	else                                     opt.url = url + '?' + query;

	return opt;
}

$GM_OAuth.prototype.encode = function(s) {
	return encodeURIComponent(s).replace(/[!'()*]/g, function(r) { return '%' + r.charCodeAt(0).toString(16).toUpperCase() });
}

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "="; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data)
{
  var bkey = str2binb(key);
  if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
  return core_sha1(opad.concat(hash), 512 + 160);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  return bin;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

})()
