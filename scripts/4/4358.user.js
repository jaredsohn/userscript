// ==UserScript==
// @name	Flickr Exif Info
// @namespace	http://6v8.gamboni.org/
// @description Select which exif info you want to see on the photo page
// @version        0.6
// @identifier	http://6v8.gamboni.org/IMG/js/flickrexifinfo.user.user.js
// @date           2010-07-18
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @match http://*.flickr.com/*
// @match http://flickr.com/*
// @include http://*flickr.com/photos/*/*
// @include http://*flickr.com/photo_exif.gne?id=*
// @include http://*flickr.com/photos/*/*/meta*
// @exclude http://*flickr.com/photos/organize*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2010 Pierre Andrews
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA

//======================================================================


/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
	var olda = a;
	var oldb = b;
	var oldc = c;
	var oldd = d;

	a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

	a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

	a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

	a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

	a = safe_add(a, olda);
	b = safe_add(b, oldb);
	c = safe_add(c, oldc);
	d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
	ipad[i] = bkey[i] ^ 0x36363636;
	opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
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
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
	bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
	str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
	str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
	  hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
	var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
	  | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
	  |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
	for(var j = 0; j < 4; j++)
	{
	  if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
	  else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
	}
  }
  return str;
}



//======================================================================

// constants
// http status constants
var OK = 200;

// xmlhttprequest readystate
var COMPLETE = 4;

var DEBUG = true;

//======================================================================
//exception
var procException =  function(msg, code, req) {
  this.msg = msg;
  this.code =code;
  this.req = req;
};


//======================================================================
//to do the closure and get the right this.
//adapted from http://persistent.info/greasemonkey/gmail.user.js

function getObjectMethodClosure(object, method) {
  return function() {
	return object[method]();
  }
}

function getObjectMethodClosure0(object, method,args) {
  return function() {
	return object[method](args);
  }
}

function getObjectMethodClosure1(object, method) {
  return function(arg) {
	return object[method](arg);
  }
}


function getObjectMethodClosure11(object, method,args3) {
  return function(arg) {
	return object[method](arg,args3);
  }
}

function getObjectMethodClosure2(object, method) {
  return function(arg,arg2) {
	return object[method](arg,arg2);
  }
}
function getObjectMethodClosure21(object, method,args3) {
  return function(arg,arg2) {
	return object[method](arg,arg2,args3);
  }
}



//======================================================================
//message and prompt
//this code blatantly lifted from the Flickr Super Batch scripts
//http://webdev.yuan.cc/
var status_msg_container = document.createElement('div');
status_msg_container.style.left = '50%';
status_msg_container.style.width = '400px';
//status_msg_container.style.height = '400px';
status_msg_container.style.zIndex = 60000;
//status_msg_container.style.overflow = 'visible';
status_msg_container.style.position = 'absolute';
status_msg_container.style.display = 'none';
//status_msg_container.style.textAlign = 'center';
status_msg_container.innerHTML = '<div id="status_msg_fgpe" style="position:relative;left: -50%;top:100px;background:#0063DC;padding:40px 10px;font:bold 12px Arial, Helvetica, sans-serif; color:white;border:solid 5px #ff0084; width: 500px"></div>';

var ip = document.evaluate( '//div[@id="head"]',
							document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
						  ).singleNodeValue;
if(ip) {
  ip.appendChild(status_msg_container);
}


var status_msg = document.getElementById('status_msg_fgpe');
status_msg.submitfunc = function() {};
status_msg.on = false;
status_msg.show = function(msg) {
  this.on = true;
  this.innerHTML = '<img src="http://www.flickr.com/images/pulser2.gif" style="vertical-align:middle;margin-right:4px;border:0px #ffffff" />';
  this.innerHTML += msg;
  status_msg_container.style.display = 'block';
}
status_msg.msgbox = function(msg) {
  this.on = true;
  this.innerHTML = msg;
  this.innerHTML += "<div align=center>[<a id='closeBox'>close</a>]</div>";
  a = document.getElementById('closeBox');
  a.addEventListener('click',this.clicky,true);
  status_msg_container.style.display = 'block';
}
status_msg.msgbox2 = function(msg,button,callback) {
  this.on = true;
  this.innerHTML = msg;
  this.innerHTML += "<div align=center>[<a id='closeBox'>"+button+"</a>]</div>";
  a = document.getElementById('closeBox');
  var self = this;
  a.addEventListener('click',function(event) {self.clicky2(event,callback)},true);
  status_msg_container.style.display = 'block';
}
status_msg.hide = function() {
  status_msg.on = false;
  status_msg_container.style.display = 'none';
  status_msg_container.style.textAlign = 'left';
}
status_msg.prompt = function(msg, fn) {
  status_msg.submitfunc = fn;
  this.on = true;
  this.innerHTML = msg;
  var form = document.createElement('form');
  form.addEventListener('submit',this.entered,true);
  var input = document.createElement('input');
  input.id = 'woowoo';
  input.type = 'text';
  form.appendChild(input);
  input = document.createElement('input');
  input.type = 'submit';
  input.value = 'ok';
  form.appendChild(input);
  this.appendChild(form);
  status_msg_container.style.display = 'block';

}
status_msg.entered = function(event) {
  var input = document.getElementById('woowoo');
  status_msg.submitfunc(input.value);
  event.preventDefault();
  event.returnValue = false;
  event.cancel = true;
  return false;
}
status_msg.clicky = function(event) {
  status_msg.hide();
  event.preventDefault();
  event.returnValue = false;
  event.cancel = true;
  return false;
}
status_msg.clicky2 = function(event,callback) {
  status_msg.hide();
  event.preventDefault();
  event.returnValue = false;
  event.cancel = true;
  callback();
  return false;
}


//======================================================================
//Simple calls to flickr REST API, from the batch enhancer script
// needs the md5 and status_msg code above

FlickrAPI = function(){;};

FlickrAPI.prototype = {	// flickr api

  init: function(api_key,shared_secret) {
	this.api_key = api_key;
	this.shared_secret = shared_secret;
	this.auth_token = M8_getValue('auth_'+this.api_key);

	if (this.shared_secret && !this.auth_token) {
	  this.askForAuth();

	}
  },

  askForAuth: function() {
	this.flickr_api_call("flickr.auth.getFrob",
						 {api_sig: this.getMethodSig("flickr.auth.getFrob", {api_key: this.api_key, format:'json'}), format:'json'},
						 getObjectMethodClosure2(this,'frob_loaded'),
						 getObjectMethodClosure1(this,'frob_failed'));
  },

  frob_loaded: function(req, rsp) {
	this.frob = rsp.frob._content;
	if(DEBUG) M8_log("received Frob "+this.frob);
	var api_sig = this.getMethodSig(false, {api_key: this.api_key,frob:this.frob,perms:"write"});
	var url= "http://flickr.com/services/auth/?api_key="+this.api_key+"&perms=write&frob="+this.frob+"&api_sig="+api_sig;
	//Here, we need the status_msg code
	status_msg.msgbox2("<p>You have just installed the <strong>More Exif script</strong> for Flickr</p> "
					   + "<p> To access the Exif information it will display, you need to give authorisation to this script.</p> <br/>" +
					   "<p><b style=\"font-variant:small-caps;\">Click [<a onclick='window.open(\""+url+"\"); return false'>Step1</a>]</b>, " +
					   "follow the instructions in the popup window,<br/> " +
					   "then return here click Step2.<br/></p> " +
					   "<p>Popup blockers may cause this not to work.</p>"
					   + "<p>You'll only have to do this once.</p><br/>","Step2",getObjectMethodClosure1(this,'getToken'));
  },

  frob_failed: function(e) {
	status_msg.msgbox('Couldn\'t authorize, for whatever reason.');
  },

  token_loaded: function(req,rsp) {
	status_msg.hide();
	var token = rsp.auth.token._content;
	this.nsid = rsp.auth.user.nsid;

	if(DEBUG) M8_log("authenticated with user "+this.nsid+": "+token);
	this.auth = token;

	M8_setValue('auth_'+this.api_key,""+token);
  },

  token_failed:function(e) {
	status_msg.msgbox('Couldn\'t authorize, for whatever reason.');
  },

  // set it all up

  getToken: function()
  {
	status_msg.show('authorizing...');
	var api_sig = this.getMethodSig("flickr.auth.getToken", {api_key: this.api_key,frob:this.frob, format: 'json'});
	this.flickr_api_call("flickr.auth.getToken",
						 {frob: this.frob,api_sig: api_sig, format: 'json'},
						 getObjectMethodClosure2(this,'token_loaded'),
						 getObjectMethodClosure1(this,'token_failed'));
  },

  do_req: function ( method, proc_request, url, referer, data ) {
	var headers = new Object();
	var details = {
	  method    : method,
	  onload    : function(d) { proc_request(d) },
	  url       : url,
	  header    : headers
	};

	if (referer != null)
	  headers['Referer'] = referer;

	if (data != null) {
	  headers['Content-Type'] = 'application/x-www-form-urlencoded';
	  details['data']         = data;
	}

	M8_xmlhttpRequest( details );
  },



  // a proc just spins around waiting for the thing to succeed or fail
  // then calls a callback, if we got 200 OK message.
  make_proc: function (op_name, ok_cb, fail_cb) {

	return function(req) {

	  try {
		// init progress
		document.body.style.cursor = 'progress';

		if (req.readyState != COMPLETE) {
		  return;
		}

		// if (alert_response) { alert(req.responseText); }

		if( req.status != OK ) {
		  throw new procException( op_name + " request status was '" + req.status + "'", 0, req )
		}

		ok_cb(req);

	  } catch(e) {

		// clean up progress
		document.body.style.cursor = 'default';


		if (e instanceof procException) {
		  if( fail_cb != null )
			fail_cb( e );
		  else {
			M8_log( e.msg );
			if (DEBUG) {
			  M8_log(e.req.responseText);
			}
		  }
		} else {
		  throw(e);
		}
	  }

	  // clean up progress

	  document.body.style.cursor = 'default';
	}
  },


  // this is wraps the spinning proc like above,
  // except it parses the flickr api response a little before deciding all is well,
  // and passing control to the all-is-well callback
  make_flickr_api_proc: function(op_name, ok_cb, fail_cb) {

	function parse_and_ok_cb(req) {
	  var rsp = req.responseText.replace(/<\?xml.*\?>/,'');
	  if(rsp.indexOf('jsonFlickrApi') >= 0) {
		rsp = rsp.replace(/jsonFlickrApi\(/,'');
		rsp = eval('('+rsp);

		if (rsp == null) {
		  throw new procException( "Could not understand Flickr's response.", 0, req );
		}

		var stat = rsp.stat;
		if (stat == null) {
		  throw new procException( "Could not find status of Flickr request", 0, req);
		}

		if (stat != 'ok') {
		  if (stat == 'fail') {
			var code = rsp.code;
			var err_msg = rsp.msg;
			throw new procException( err_msg, code, req );
		  } else {
			throw new procException("Unknown error status: '" + stat + "'", 0, req);
		  }
		}

		ok_cb(req, rsp);
	  }
	}

	return this.make_proc(op_name, parse_and_ok_cb, fail_cb);
  },

  getMethodSig: function(method, args)
  {
	var data = new Array();
	var names = new Array();
	var sig = this.shared_secret;

	if(method) {
	  data['method'] = method;
	  names.push('method');
	}
	for (var key in args) {
	  data[key] = args[key];
	  names.push(key);
	}
	names.sort();
	for (i in names) {
	  sig += names[i] + data[names[i]];
	}
	return hex_md5(sig);
  },


  // construct a flickr api request, with method and args,
  // if that worked, call callback with request object.
  flickr_api_call: function( method, args, ok_cb, fail_cb,with_auth) {

	var http_method = args['http_method'];
	http_method = ( http_method ? http_method : 'GET' );
	delete args['http_method'];

	args['api_key'] = this.api_key;
	args['format'] = 'json';

	if (this.shared_secret && with_auth && this.auth_token) {
	  args['auth_token'] = this.auth_token;
	  args['api_sig'] = this.getMethodSig(method, args);
	} else if(DEBUG) M8_log('not signing: ' + method);


	var url = 'http://www.flickr.com/services/rest/?method=' + encodeURIComponent(method);

	for (var key in args) {
	  url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
	}
	if(DEBUG) M8_log(url);

	var proc = this.make_flickr_api_proc( method, ok_cb, fail_cb );

	this.do_req(http_method, proc, url, null, null);
  }

};

/* GM_xmlhttpRequest implementation adapted from the
 Turnabout GM compatibility library:
 http://www.reifysoft.com/turnabout.php
 Used under the following license:

 Copyright (c) 2005, Reify Software, Inc.
 All rights reserved.

 Redistribution and use in source and binary forms,
 with or without modification, are permitted provided
 that the following conditions are met:

 1) Redistributions of source code must retain the
 above copyright notice, this list of conditions
 and the following disclaimer.
 2) Redistributions in binary form must reproduce the
 above copyright notice, this list of conditions
 and the following disclaimer in the documentation
 and/or other materials provided with the
 distribution.
 3) Neither the name of the Reify Software, Inc. nor
 the names of its contributors may be used to
 endorse or promote products derived from this
 software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS
 AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
 THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF
 USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
 USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 OF SUCH DAMAGE.

 */

//yes, I know the domain limitations, but it's better than an outright error
function M8_xmlhttpRequest(details) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    var responseState = {
      responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
      responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
      readyState:xmlhttp.readyState,
      responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
      status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
      statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
    }
    if (details["onreadystatechange"]) {
      details["onreadystatechange"](responseState);
    }
    if (xmlhttp.readyState==4) {
      if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
        details["onload"](responseState);
      }
      if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
        details["onerror"](responseState);
      }
    }
  }
  try {
	//cannot do cross domain
	xmlhttp.open(details.method, details.url);
  } catch(e) {
	if( details["onerror"] ) {
	  //simulate a real error
	  details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
	}
	return;
  }
  if (details.headers) {
    for (var prop in details.headers) {
      xmlhttp.setRequestHeader(prop, details.headers[prop]);
    }
  }
  xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
}

function M8_getValue(name, defaultValue) {
  if(typeof GM_deleteValue == 'undefined')
	return localStorage.getItem(name) || defaultValue;
  else
	return GM_getValue(name);
}

function M8_setValue(name, value) {
  if(typeof GM_deleteValue == 'undefined') {
	try {
	localStorage.setItem(name, value);
	} catch(e) {
	  M8_log("error when storing"+e);
	}
  } else
	GM_setValue(name,value);
}

function M8_log(msg) {
  if(console && console.log) {
	console.log(msg);
  } else
	alert(msg);
}



(function () {

   /***********************************************************************
	* Flickr Localisation
	**********************************************************************/

   function $x1(xpath) {
	 return document.evaluate(
	   xpath,
	   document,
	   null,
	   XPathResult.FIRST_ORDERED_NODE_TYPE, null
	 ).singleNodeValue;
   }


   var FlickrLocaliser = function(locals) {
	 this.init(locals);
   }
   FlickrLocaliser.prototype = {
	 selectedLang: undefined,
	 localisations: undefined,
	 getLanguage: function() {
	   if(!this.selectedLang) {
		 var langA = $x1("//div[@id='foot']/div[@id='foot-lang']//a[contains(@class,'selected')]");
		 if(!langA) {
		   langA= $x1("//p[@id='LanguageSelector']//a[contains(@class,'selected')]");
		 }
		 if(langA) {
		   var matches = /\/change_language.gne\?lang=([^&]+)&.*/.exec(langA.href);
		   if(matches && matches[1]) {
			 this.selectedLang = matches[1];
			 return this.selectedLang;
		   }
		 }
		 return false;
	   } else return this.selectedLang;
	 },

	 init: function(locals) {
	   this.localisations = locals;
	 },

	 localise: function(string, params) {
	   if(this.localisations && this.getLanguage()) {
		 var currentLang = this.localisations[this.selectedLang];
		 if(!currentLang) currentLang = this.localisations[this.localisations.defaultLang];
		 var local = currentLang[string];
		 if(!local) {
		   local = this.localisations[this.localisations.defaultLang][string];
		 }
		 if(!local) return string;
		 for(arg in params) {
		   var rep = new RegExp('@'+arg+'@','g');
		   local = local.replace(rep,params[arg]);
		 }
		 local =local.replace(/@[^@]+@/g,'');
		 return local;
	   } else return undefined;
	 }

   }

   /*****************************Flickr Localisation**********************/


   var localiser =  new FlickrLocaliser({
										  'en-us' : {
											'more-prop': "More properties"
										  },
										  'fr-fr' : {
											'more-prop': "Plus de détails"
										  },
										  'es-us' : {
											'more-prop':"Más propiedades"
										  },
										  'de-de' : {
											'more-prop':"Weitere Eigenschaften"
										  },
										  'zh-hk' : {
											'more-prop':"更多內容"
										  },
										  'zh-hk' : {
											'more-prop':"更多內容"
										  },
										  'ko-kr' : {
											'more-prop':"추가 속성(exif 정보) 보기"
										  },
										  'pt-br' : {
											'more-prop':"Mais propriedades"
										  },
										  'it-it' : {
											'more-prop':"Altre proprietà"
										  },
										  defaultLang: 'en-us'
										});


   //This is an array to help in different conversion of the raw data.
   // you can map a exif value name as displayed by flickr
   // with:
   // - it's real name in the EXIF info
   // - it's unit
   // - the name of the EXIF info defining the unit
   // - a replacement regexp for when you add this info in the tags (%u in in the replacement will be replaced by the unit if any)
   // see the existing values to understand more.

   var MAPPING = {
	 'Image Width': {map:'Pixel X-Dimension',direct_unit:'pixel'},
	 'Image Height': {map:'Pixel Y-Dimension',direct_unit:'pixel'},
	 'Y-Resolution': {indirect_unit:'Resolution Unit'},
	 'X-Resolution': {indirect_unit:'Resolution Unit'},
	 'ISO Speed' : {addtag:{regexp:/([0-9]+)/,replacement:'iso:$1'}},
	 'Focal Length' : {addtag:{regexp:/([0-9]+) mm/,replacement:'$1mm'}},
	 'Exposure' : {addtag:{regexp:/.*\(([\/0-9]+)\)/,replacement:'$1s'}},
   };


   //conversion for the units, I have no idea what the 0 and 1 stands for, but 2 is for dpi apparently :D
   var UNITS = new Array('?','?','dpi');


   function getObjectMethodClosure11(object, method,arg1) {
	 return function(arg) {
	   return object[method](arg,arg1);
	 }
   }

   function M8_log() {
	 if(console)
	   console.log(arguments);
	 else
	   GM_log(arguments);
   }

   var flickrexifinfo = function() {this.init();}

   flickrexifinfo.prototype = {
	 config: M8_getValue('ExifInfoConfig'),
	 api: undefined,

	 init: function() {
	   if(this.config == undefined) this.config= ',Aperture,Focal Length,ISO Speed,Flash,';
	   if(document.location.pathname.indexOf("/meta") >= 0) {
		 this.showConfigurationBoxes();
	   } else {
		 this.api =  new FlickrAPI();
		 this.api.init('830ae86c68216cc8ec8f0f16e353795a','5ac2c757ba678d22');
		 this.showMoreExif();
	   }
	 },

	 showConfigurationBoxes: function() {
	   var infos = document.evaluate(
		 "//div[@id='exif-right']//table[2]//th",
		 document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	   for(var i = 0; i < infos.snapshotLength; i++) {
		 var exif = infos.snapshotItem(i);
		 var name = exif.innerHTML.replace(/:$/,'');
		 var check = document.createElement('input');
		 check.type = 'checkbox';
		 check.addEventListener('change',getObjectMethodClosure11(this,'addToConf',name),false);
		 if(i == 0) {
		   check.checked = true;
		   check.disabled = true;
		 } else if(this.config && (this.config.indexOf(','+name+',') >= 0)) {
		   check.checked = true;
		 }
		 var td = document.createElement('td');
		 td.style.width = '13px';
		 td.appendChild(check);
		 exif.parentNode.insertBefore(td,exif);
	   }
	 },

	 addToConf: function(event, name) {
	   var newConfig = this.config;
	   if(!newConfig) newConfig = ',';
	   if(event.target.checked) {
		 newConfig += name+',';
	   } else {
		 newConfig = newConfig.replace(','+name+',',',');
	   }
	   this.config = newConfig;
	   M8_setValue('ExifInfoConfig',this.config);
	 },

	 showMoreExif: function() {
	   var more = document.getElementById('photo-story');
	   var photoid = document.location.href.replace(/http:\/\/(www.)?flickr.com\/photos\/[^\/]*\/([0-9]+).*/,'$2');
		   if(this.config.length > 1) {
			 var ul = document.createElement('ul');

			 var self = this;
			 var listener = {
			   flickr_photos_getExif_onLoad: function(req, rsp){
				 var exifInfo = new Array();
				 for(var i=0;i<rsp.photo.exif.length;i++) {
				   exifInfo[rsp.photo.exif[i].label] = rsp.photo.exif[i];
				 }
				 var finds = self.config.split(',');
				 for(var i=0;i<finds.length;i++) {
				   if(finds[i]) {
					 var mapping = MAPPING[finds[i]];
					 var map = null;
					 if(mapping)
					   map = mapping.map;
					 var ex = '';
					 if(!map) {
					   ex = exifInfo[finds[i]];
					 }  else {
					   ex = exifInfo[map];
					 }
					 if(ex.clean && new String(ex.clean._content).length > 0)
					   ex = ex.clean._content;
					 else if(ex.raw)
					   ex = ex.raw._content;
					 if(new String(ex).length > 0) {
					   var unit = '';
					   if(mapping) {
						 unit =  mapping.direct_unit;
						 if(!unit && mapping.indirect_unit) {
						   unit = UNITS[parseInt(exifInfo[mapping.indirect_unit].raw._content)];
						 }
					   }
					   var li = ul.appendChild(document.createElement('li'));
					   li.className = 'Stats';
					   li.innerHTML = '<b>'+finds[i]+':</b> '+ex;
					   if(unit && new String(unit).length > 0)
						 li.innerHTML += ' '+unit;
					   if(document.getElementById('tagadderlink')) {
						 var addtag = li.appendChild(document.createElement('a'));
						 addtag.innerHTML = ' [+]';
						 addtag.title ="add this as a tag";
						 addtag.href="javascript:;";
						 addtag.setAttribute('style','text-decoration:none;color: #C9C9C9;');
						 addtag.addEventListener('click',getObjectMethodClosure11(self,'addtag',new Array(photoid,finds[i],ex,unit)),false);
					   }
					 }
				   }
				 }
				 var div = document.createElement('div');
				 var h4 = div.appendChild(document.createElement('h4'));
				 h4.className = 'primary-context-label';
				 h4.innerHTML = localiser.localise('more-prop');
				 div.setAttribute('style',"border-bottom: 1px solid #EEE;padding-bottom: 10px;padding-top:10px;");
				 ul.setAttribute('style',"padding-left:10px;");
				 div.appendChild(ul);
				 more.appendChild(div);
/*				 var li = document.createElement('li');
				 li.className = 'Stats';
				 li.appendChild(more);
				 ul.appendChild(li);*/
			   }
			 };

			 this.api.flickr_api_call('flickr.photos.getExif', {
											 photo_id:photoid
									  }, listener.flickr_photos_getExif_onLoad, undefined, true);

	   }
	 },

	 addtag: function(evt,args) {
	   var id =args[0];
	   var title = args[1];
	   var value = new String(args[2]);
	   var unit = args[3];
	   var mapping = MAPPING[title];
	   if(mapping && mapping.addtag) {
		 value = value.replace(mapping.addtag.regexp,mapping.addtag.replacement);
		 if(unit) value.replace(/%u/g,unit);
	   }
	   value = 'exif:'+value.replace(':','=');

	   this.api.flickr_api_call('flickr.photos.addTags', {
								  photo_id:id,
								  tags: value
								}, function(req, rsp) {M8_log(rsp);}, undefined, true);
	   	 }
   }
   //======================================================================
   // launch
   var flickrgp = new flickrexifinfo();
 })();
