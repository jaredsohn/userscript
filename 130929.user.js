// ==UserScript==
// @name           Block Requesters (Fixed)
// @author         Aphit (adopted from Ergo)
// @version        1.0.0
// @description    Hide HITs from requesters you're not interested in (FIXED FOR GOOGLE CHROME)
// @include        https://www.mturk.com/mturk/findhits*
// @include        https://www.mturk.com/mturk/searchbar*
// @include        https://www.mturk.com/mturk/viewsearchbar*
// @include        https://www.mturk.com/mturk/sorthits*
// @include        https://www.mturk.com/mturk/viewhits*
// @include        https://www.mturk.com/mturk/accept*
// @include        https://www.mturk.com/mturk/preview*
// @include        https://www.mturk.com/mturk/return*
// @include        https://www.mturk.com/mturk/sortsearchbar*
// ==/UserScript==



//CHANGES

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

if(window.navigator.vendor.match(/Google/)) {
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  unsafeWindow = div.onclick();
};


//CHANGES



requesterIndex = GM_getValue("requesterIndex");
if(!requesterIndex) {
  //alert(requesterIndex);
  requesterIndex="";
  
  GM_setValue("requesterIndex","");
}


function showUpdates() {
  updated = GM_getValue('requesterUpdated');
  if (updated) {
    tables = document.evaluate("//table",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    table = tables.snapshotItem(6);
    action = updated.split(',');
    rId = action[1].split('::')[0];
    rName = action[1].split('::')[1];
    div = document.createElement('div');
    div.id = 'updated';
    status = "<div class='message success'><h6><span id='alertboxHeader'>"+action[0]+" "+rName;
    if (action[0]=='Blocked') {
      status+=" <a style='font-size:80%;' href='javascript:unblockRequester(\""+rId+"\",\""+rName+"\");' title='Unblock this requester'>undo</a>";
    }
    div.innerHTML = status + "</h6></span></div>";
      table.parentNode.insertBefore(div, table);
    GM_deleteValue('requesterUpdated');
  }
}

function hideHIT(element) {
  pa=element, step=0;
  while (step++ < 14) {
    ch = pa;
    pa = pa.parentNode;
  }
  pa.className = "blocked";
}

function unhideHIT(element) {
  pa=element, step=0;
  while (step++ < 14) {
    ch = pa;
    pa = pa.parentNode;
  }
  pa.className = "";
}

function hideMatchingHITs() {
  var numBlocked=0;
  theseRequesters = document.evaluate("//a[starts-with(@href,'/mturk/searchbar?selectedSearchType=hitgroups&requesterId=')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (i=0; i<theseRequesters.snapshotLength; i++) {
    rLink = theseRequesters.snapshotItem(i);
	rLink.parentNode.nowrap = false;
	rName = rLink.innerHTML;
    rId = rLink.href.toString().split('=')[2];
    if (requesterIndex.indexOf(rId) != -1 && location.href.indexOf(rId) == -1) {
      newElement = document.createElement('a');
      newElement.innerHTML = "&nbsp;<a style='font-size:80%;' href='javascript:unblockRequester(\""+rId+"\",\""+rName+"\");' title='Unblock this requester'>unblock</a>";
      rLink.parentNode.insertBefore(newElement, rLink.nextSibling);
      hideHIT(rLink);
  	  numBlocked+=1;
    } else {
      newElement = document.createElement('a');
      newElement.innerHTML = "&nbsp;<a href='javascript:blockRequester(\""+rId+"\","+i+");' style='font-size:80%;' title='Block this requester'>x</a>";
      rLink.parentNode.insertBefore(newElement, rLink.nextSibling);
    }
  }
  return numBlocked;
}

unsafeWindow.unhideAllHITs = function () {
	theseRequesters = document.evaluate("//a[starts-with(@href,'/mturk/searchbar?selectedSearchType=hitgroups&requesterId=')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i<theseRequesters.snapshotLength; i++) {
		unhideHIT(theseRequesters.snapshotItem(i));
	}
}

function showNumBlocked(numBlocked) {
  collapseAll = document.getElementById('collapseall');
  showAllBlocked = document.createElement("span");
  showAllBlocked.innerHTML = '&nbsp;&nbsp;<font color="#9ab8ef">|</font>&nbsp;&nbsp;<a href="javascript:unhideAllHITs();" class="footer_links" id="showblocked">Show ' + numBlocked + ' Blocked</a>';
  collapseAll.parentNode.insertBefore(showAllBlocked, collapseAll.nextSibling);
}
           
		   


unsafeWindow.blockRequester = function (rId,i) {
    rName = theseRequesters.snapshotItem(i).innerHTML;
    rEntry = rId+"::"+rName;
    requesterIndex+= rEntry+"}{";
    if (confirm("Hide HITs from "+rName+" ("+rId+")?")) { 
		window.setTimeout(function() {
			GM_setValue("requesterIndex", requesterIndex);
			GM_setValue("requesterUpdated", "Blocked,"+rEntry);
		  }, 0);
      //window.setTimeout(GM_setValue, 0, "requesterIndex", requesterIndex);
      //window.setTimeout(GM_setValue, 0, "requesterUpdated", "Blocked,"+rEntry);
	  
	 
      document.location.reload();
    }
}

unsafeWindow.unblockRequester = function (rId,rName) {
  theseRequesters = document.evaluate("//a[starts-with(@href,'/mturk/searchbar?selectedSearchType=hitgroups&requesterId=')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  rEntry = rId+"::"+rName;
  half = requesterIndex.split(rId+"::");
  left = half[0];
  temp = half[1].split('}{');
  right = temp[1]+"}{";
  if (temp.length>1) {
    for (i=2;i<temp.length-1;i++) {
      right+=temp[i]+"}{";
    }
  }  
  requesterIndex = left + right;
  window.setTimeout(function() {
			GM_setValue("requesterIndex", requesterIndex);
			GM_setValue("requesterUpdated", "Unblocked,"+rEntry);
		  }, 0);
  //window.setTimeout(GM_setValue, 0, "requesterIndex", requesterIndex);
  //window.setTimeout(GM_setValue, 0, "requesterUpdated", "Unblocked,"+rEntry);
  document.location.reload();
}

function addGlobalStyle(css) {
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.blocked { display: none; }');
showUpdates();
showNumBlocked(hideMatchingHITs());