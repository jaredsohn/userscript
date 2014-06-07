// ==UserScript==
// @author        Crend King
// @version       2.1
// @name          Textarea Backup with expiry
// @namespace     http://users.soe.ucsc.edu/~kjin
// @description   Retains text entered into textareas, and expires after certain time span.
// @include       http://*
// @include       https://*
// ==/UserScript==

// this script was originally based on http://userscripts.org/scripts/review/7671

// check latest version at http://userscripts.org/scripts/show/42879

/*

version history

2.1 on 05/09/2011:
- Add user menu command to restore all textarea in the page.

2.0 on 05/06/2011:
- Completely rewrite the script. New script should be faster, stronger and more standard-compliant.
- Fix bugs in previous versions and the original script.

1.0.4 on 04/22/2009:
- Synchronize with the original Textarea Backup script.

1.0.3 on 03/08/2009:
- Add "ask overwrite" option.

1.0.2 on 03/04/2009:
- Add "keep after submission" option.

1.0.1 on 02/22/2009:
- Extract the expiry time stamp codes to stand-alone functions.

1.0 on 02/21/2009:
- Initial version.

*/


///// preference section /////

// backup when textarea loses focus


function GM_setValue( cookieName, cookieValue, lifeTime ) {
	if( !cookieName ) { return; }
	if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
	document.cookie = escape( cookieName ) + "=" + escape( getRecoverableString( cookieValue ) ) +
		";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
}

function GM_getValue( cookieName, oDefault ) {
	var cookieJar = document.cookie.split( "; " );
	for( var x = 0; x < cookieJar.length; x++ ) {
		var oneCookie = cookieJar[x].split( "=" );
		if( oneCookie[0] == escape( cookieName ) ) {
			try {
				eval('var footm = '+unescape( oneCookie[1] ));
			} catch(e) { return oDefault; }
			return footm;
		}
	}
	return oDefault;
}

function GM_deleteValue( oKey ) {
	//yes, they didn't seem to provide a way to delete variables in Greasemonkey, and the user must use about:config to
	//delete them - so the stored variables will pile up forever ...
	GM_setValue( oKey, '', 'delete' );
}

var GM_falsifiedMenuCom = [], hasPageGMloaded = false;
window.addEventListener('load',function () {hasPageGMloaded=true;doGMMeenoo();},false)
function GM_registerMenuCommand( oText, oFunc ) {
	GM_falsifiedMenuCom[GM_falsifiedMenuCom.length] = [oText,oFunc];
	if( hasPageGMloaded ) { doGMMeenoo(); } //if the page has already loaded, do it now
}

function doGMMeenoo() {
	if( !GM_falsifiedMenuCom.length ) { return; }
	//create a menu of commands in the top corner
	var foo = document.getElementById('GM_Falsify_me'), bar, par = document.body ? document.body : document.documentElement;
	if( foo ) { par.removeChild(foo); }
	foo = document.createElement('GMmenoo');
	foo.id = 'GM_Falsify_me';
	par.appendChild(foo);
	with( foo.style ) {
		border = '1px solid #000';
		backgroundColor = '#bbf';
		color = '#000';
		position = 'fixed';
		zIndex = '100000';
		top = '0px';
		right = '0px';
		padding = '2px';
		overflow = 'hidden';
		height = '1.3em';
	}
	foo.appendChild(bar = document.createElement('b'))
	bar.style.cursor = 'move';
	bar.onclick = function () {
		this.parentNode.style.left = this.parentNode.style.left ? '' : '0px';
		this.parentNode.style.right = this.parentNode.style.right ? '' : '0px';
	};
	bar.appendChild(document.createTextNode('User Script Commands'));
	foo.appendChild(bar = document.createElement('ul'));
	bar.style.margin = '0px';
	bar.style.padding = '0px';
	bar.style.listStylePosition = 'inside';
	for( var i = 0; GM_falsifiedMenuCom[i]; i++ ) {
		var baz = document.createElement('li'), bing;
		baz.appendChild(bing = document.createElement('a'));
		bing.setAttribute('href','#');
		bing.onclick = new Function('GM_falsifiedMenuCom['+i+'][1](arguments[0]);return false;');
		bing.onfocus = function () { this.parentNode.style.height = ''; };
		bing.onblur = function () { this.parentNode.style.height = '1.3em'; };
		bing.appendChild(document.createTextNode(GM_falsifiedMenuCom[i][0]));
		bar.appendChild(baz);
	}
	foo.onmouseover = function () { this.style.height = ''; };
	foo.onmouseout = function () { this.style.height = '1.3em'; };
}

// GM_log = opera.postError;

window._content = window;

function getRecoverableString(oVar,notFirst) {
	var oType = typeof(oVar);
	if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
		//most browsers say that the typeof for null is 'object', but unlike a real
		//object, it will not have any overall value
		return 'null';
	}
	if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
	if( oType == 'object' ) {
		//Safari throws errors when comparing non-objects with window/document/etc
		if( oVar == window ) { return 'window'; }
		if( oVar == document ) { return 'document'; }
		if( oVar == document.body ) { return 'document.body'; }
		if( oVar == document.documentElement ) { return 'document.documentElement'; }
	}
	if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
	if( !notFirst ) {
		Object.prototype.toRecoverableString = function (oBn) {
			if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
			this.tempLockIgnoreMe = true;
			var retVal = '{', sepChar = '', j;
			for( var i in this ) {
				if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
				if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
				j = this[i];
				if( !i.match(basicObPropNameValStr) ) {
					//for some reason, you cannot use unescape when defining peoperty names inline
					for( var x = 0; x < cleanStrFromAr.length; x++ ) {
						i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
					}
					i = '\''+i+'\'';
				} else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
					//IE mac does not allow numerical property names to be used unless they are quoted
					i = '\''+i+'\'';
				}
				retVal += sepChar+i+':'+getRecoverableString(j,true);
				sepChar = ',';
			}
			retVal += '}';
			this.tempLockIgnoreMe = false;
			return retVal;
		};
		Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
		Array.prototype.toRecoverableString = function () {
			if( this.tempLock ) { return '[\'LoopBack\']'; }
			if( !this.length ) {
				var oCountProp = 0;
				for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
				if( oCountProp ) { return this.toRecoverableObString(true); }
			}
			this.tempLock = true;
			var retVal = '[';
			for( var i = 0; i < this.length; i++ ) {
				retVal += (i?',':'')+getRecoverableString(this[i],true);
			}
			retVal += ']';
			delete this.tempLock;
			return retVal;
		};
		Boolean.prototype.toRecoverableString = function () {
			return ''+this+'';
		};
		Date.prototype.toRecoverableString = function () {
			return 'new Date('+this.getTime()+')';
		};
		Function.prototype.toRecoverableString = function () {
			return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
		};
		Number.prototype.toRecoverableString = function () {
			if( isNaN(this) ) { return 'Number.NaN'; }
			if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
			if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
			return ''+this+'';
		};
		RegExp.prototype.toRecoverableString = function () {
			return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
		};
		String.prototype.toRecoverableString = function () {
			var oTmp = escape(this);
			if( oTmp == this ) { return '\''+this+'\''; }
			return 'unescape(\''+oTmp+'\')';
		};
	}
	if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
	var oTmp = oVar.toRecoverableString();
	if( !notFirst ) {
		//prevent it from changing for...in loops that the page may be using
		delete Object.prototype.toRecoverableString;
		delete Array.prototype.toRecoverableObString;
		delete Array.prototype.toRecoverableString;
		delete Boolean.prototype.toRecoverableString;
		delete Date.prototype.toRecoverableString;
		delete Function.prototype.toRecoverableString;
		delete Number.prototype.toRecoverableString;
		delete RegExp.prototype.toRecoverableString;
		delete String.prototype.toRecoverableString;
	}
	return oTmp;
}
var basicObPropNameValStr = /^\w+$/, cleanStrFromAr = new Array(/\\/g,/'/g,/"/g,/\r/g,/\n/g,/\f/g,/\t/g,new RegExp('-'+'->','g'),new RegExp('<!-'+'-','g'),/\//g), cleanStrToAr = new Array('\\\\','\\\'','\\\"','\\r','\\n','\\f','\\t','-\'+\'->','<!-\'+\'-','\\\/');

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
function GM_xmlhttpRequest(details) {
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

function GM_addStyle(css) {
	var NSURI = 'http://www.w3.org/1999/xhtml';
	var hashead = document.getElementsByTagName('head')[0];
	var parentel = hashead || document.documentElement;
	var newElement = document.createElementNS(NSURI,'link');
	newElement.setAttributeNS(NSURI,'rel','stylesheet');
	newElement.setAttributeNS(NSURI,'type','text/css');
	newElement.setAttributeNS(NSURI,'href','data:text/css,'+encodeURIComponent(css));
	if( hashead ) {
		parentel.appendChild(newElement);
	} else {
		parentel.insertBefore(newElement,parentel.firstChild);
	}
}
var blur_backup = true;

// interval for timely backup, in millisecond. 0 disables timely backup
var timely_backup_interval = 0;

// keep backup even form is submitted
// make sure expiration is enabled or backup will never be deleted
var keep_after_submission = false;

// set true to display a confirmation window for restoration
// otherwise restore unconditionally
var confirm_overwrite = true;

// auxiliary variable to compute expiry_timespan
// set all 0 to disable expiration
var expire_after_days = 0;
var expire_after_hours = 0;
var expire_after_minutes = 30;


///// code section /////

// expiry time for a backup, in millisecond
var expiry_timespan = (((expire_after_days * 24) + expire_after_hours) * 60 + expire_after_minutes) * 60000;
// RegExp to check if string is consisted of all spaces
var empty_regexp = /^\s*$/;

// how many times to flash. must be a even number, or the border style will not revert
var flash_count = 6;
// how fast is the flash
var flash_frequency = 100;

// array of all textarea elements in the page
var textareas = [];
// textarea_id: whether this textarea is prompted for restoration
var prompted = {};

var get_ta_id = function(ta)
{
	/*
	return the reference ID of the textarea
	multiple textareas with no name or id will collide
	but textarea without either would be useless
	*/
	return ta.name || ta.id || '';
};

var get_ta_key = function(ta)
{
	// Greasemonkey key for the backup
	// take URI into consideration
	return ta.baseURI + ';' + get_ta_id(ta);
};

var append_timestamp = function(str)
{
	return str + '@' + (new Date()).getTime();
};

var remove_timestamp = function(str)
{
	return str.replace(/@\d+$/, '');
};

var get_timestamp = function(str)
{
	var time_pos = str.lastIndexOf('@');
	return str.substr(time_pos + 1);
};

var commit_backup = function(ta)
{
	// backup if value is not empty
	if (!empty_regexp.test(ta.value))
	{
		var bak_payload = append_timestamp(ta.value);
		GM_setValue(get_ta_key(ta), bak_payload);
	}
};

var flash_textarea = function(ta)
{
	// flash the textarea
	
	var ori_border = ta.style.border;
	var new_border = '2px solid red';
	var toggle = true;
	var flashed = flash_count;
	var interval_id;

	var toggle_border = function()
	{
		ta.style.border = (toggle ? new_border : ori_border);
		toggle = !toggle;

		--flashed;
		if (flashed == 0)
			clearInterval(interval_id);
	};

	interval_id = setInterval(toggle_border, flash_frequency);
};

var confirm_restore = function(tas, index, bak_content)
{
	var ta = tas[index];
	
	ta.scrollIntoView();
	flash_textarea(ta);
	
	var confirmation = function()
	{
		var msg = "[Textarea Backup] Backup exists for this textarea, proceed to overwrite with this backup?\n\n";
		msg += bak_content.length > 750 ?
			   bak_content.substr(0, 500) + "\n..." :
			   bak_content;

		if (confirm(msg))
			ta.value = bak_content;

		if (index + 1 < tas.length)
		{
			// setTimeout is an asynchronized operation
			// need recursion to serialize restoration on textareas
			restore_backup(tas, index + 1);
		}
	};

	// setInterval in flash_textarea is an asynchronized operation
	// need to wait until flashing is finished
	setTimeout(confirmation, (flash_count + 1) * flash_frequency);
};


var get_backup_content = function(ta)
{
	// backup payload is in format of "backup_text@save_time",
	// where save_time is the millisecond from Javascript Date object's getTime()
	var bak_payload = GM_getValue(get_ta_key(ta));
	if (!bak_payload)
		return false;

	var bak_content = remove_timestamp(bak_payload);
	
	// ignore if backup text is identical to current value
	if (bak_content == ta.value)
		return false;
	else
		return bak_content;
};

var restore_backup = function(tas, index)
{
	// check with user before overwriting existing content with backup
	// asynchronized when confirmation is enabled, synchronized otherwise
	if (confirm_overwrite)
	{
		var bak_content = get_backup_content(tas[index]);
		if (bak_content !== false)
			confirm_restore(tas, index, bak_content);
	}
	else
	{
		for (var i = 0; i < tas.length; ++i)
		{
			var ta = tas[i];
			ta.value = get_backup_content(ta);
		}
	}
};

var on_focus = function(event)
{
	var ta = event.target;
	var ta_id = get_ta_id(ta);

	if (!prompted[ta_id])
	{
		// set prompted status disregarding user's choice of overwriting
		prompted[ta_id] = true;

		restore_backup([ta], 0);
	}
};

var on_blur = function(event)
{
	commit_backup(event.target);
};

var on_submit = function(event)
{
	for (var i = 0; i < textareas.length; ++i)
		GM_deleteValue(get_ta_key(textareas[i]));
};

var init_backup = function(ta)
{
	// textarea-specific initialization
	
	prompted[get_ta_id(ta)] = false;

	ta.addEventListener('focus', on_focus, true);

	// save buffer when the textarea loses focus
	if (blur_backup)
		ta.addEventListener('blur', on_blur, true);
	
	// delete buffer when the form is submitted
	if (!keep_after_submission)
		ta.form.addEventListener('submit', on_submit, true);
};

var restore_all = function()
{
	// restore all textareas and set prompted status
	
	for (var i = 0; i < textareas.length; ++i)
	{
		var ta = textareas[i];
		var ta_id = get_ta_id(ta);

		if (!prompted[ta_id])
			prompted[ta_id] = true;
	}

	restore_backup(textareas, 0);
};

// expiration check routine
if (expiry_timespan > 0)
{
	// get all associated backups for this page, and compare timestamp now and then
	var curr_time = new Date().getTime();
	var stored_bak = GM_listValues();

	for (var i = 0; i < stored_bak.length; ++i)
	{
		var bak_payload = GM_getValue(stored_bak[i]);
		var bak_content = remove_timestamp(bak_payload);
		var bak_time = get_timestamp(bak_payload);
		
		if (curr_time - bak_time >= expiry_timespan)
			GM_deleteValue(stored_bak[i]);
	}
}

textareas = document.getElementsByTagName('textarea');
for (var i = 0; i < textareas.length; ++i)
{
	var ta = textareas[i];

	// process textarea only if it is under a form
	if (ta.form)
		init_backup(ta);
}

if (textareas.length > 0)
{
	// save buffer in interval fashion
	if (timely_backup_interval > 0)
	{
		var backup_all = function()
		{
			for (var i = 0; i < textareas.length; ++i)
			{
				var ta = textareas[i];
	
				if (prompted[get_ta_id(ta)])
					commit_backup(ta);
			}
		};
	
		setInterval(backup_all, timely_backup_interval);
	}
	
	GM_registerMenuCommand('Restore all textareas in this page', restore_all);
}