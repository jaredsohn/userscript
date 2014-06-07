// ==UserScript==
// @name           Minibuffer d.hatena reblog from d.hatena command 
// @namespace      http://ido.nu/kuma/
// @description    
// @include        http://d.hatena.ne.jp/*
// ==/UserScript==
/*
# Version: MPL 1.1/GPL 2.0/LGPL 2.1
#
# The contents of this file are subject to the Mozilla Public License Version
# 1.1 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
# http://www.mozilla.org/MPL/
#
# Software distributed under the License is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
# for the specific language governing rights and limitations under the
# License.
#
# The Initial Developer of the Original Code is
# KUMAGAI Kentaro <ku0522a*gmail.com>
# Portions created by the Initial Developer are Copyright (C) 2007
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#
# Alternatively, the contents of this file may be used under the terms of
# either the GNU General Public License Version 2 or later (the "GPL"), or
# the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
# in which case the provisions of the GPL or the LGPL are applicable instead
# of those above. If you wish to allow use of your version of this file only
# under the terms of either the GPL or the LGPL, and not to allow others to
# use your version of this file under the terms of the MPL, indicate your
# decision by deleting the provisions above and replace them with the notice
# and other provisions required by the GPL or the LGPL. If you do not delete
# the provisions above, a recipient may use your version of this file under
# the terms of any one of the MPL, the GPL or the LGPL.
#
# ***** END LICENSE BLOCK *****
*/
var $DEBUG_TRACE = 0;

var VERSION = '0.0.1';

function trace() {

	if ( ! $DEBUG_TRACE )
		return;

	var fn;
	if ( typeof Firebug == 'undefined' ) {
		fn = console;
	} else if ( Firebug && Firebug.Console && Firebug.Console.log  ) {
		fn = Firebug.Console;
	}

	if ( fn ) {
		if ( arguments.length == 1 ) {
			fn.log(arguments[0]);
		} else {
			var args = [];
			for (var i = 0; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			fn.log(args);
		}
	}
}
function $A(pa) {
	var a = [];
	for (var i = 0; i < pa.length; i++) {
		a.push(pa[i]);
	}
	return a;
}

var Hatena = { };
Hatena.Diary = {
	init: function () {
		window.Minibuffer.addCommand( {
			'hatena.d.reblog': this.reblog
		} );
	},
	post: function (title, body, callback) {
		var hatenaId = null;
		while ( (hatenaId = GM_getValue('userid', '')) == '' ) {
			hatenaId = prompt("plz input your hatena id.");
			hatenaId = hatenaId.replace(/\s/g);
			GM_setValue('userid', hatenaId)
		}

		var query = [
			['rkm', unsafeWindow.Hatena.rkm],
			['title', title],
			['body', body]
		].map( function (p) {
			return p[0] + '=' + encodeURIComponent(p[1])
		} ).join('&') ;

		var onerror = function (){}

		// rkm=PPPE2xP%2B5trPl4qpUcAkGw&title=test&body=test
		//
		GM_xmlhttpRequest({
			method : 'POST',
			url : 'http://d.hatena.ne.jp/' + hatenaId + '/',
			data : query,
			onload : function(res){
				if(res.status!=200)
					return onerror(res);
				callback(res) && onload(res);
			},
			//onerror : onerror,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
			}
		})
	},
	reblog: function (stdin) {
		stdin = stdin.filter( function (i) {
			return i
		} );

		var total = stdin.length;
		var reblogged = 0;

		var index = 0;
		var html = stdin.map( function (paragraph) {
			var nodeset =  window.Minibuffer.$X(
				'./h3//text()[ not(ancestor::span[@class="sanchor"])]',
				paragraph);
			if ( nodeset.length == 0 )
				return;


			var title = $A(nodeset).map( function (e) {
				return e.textContent;
			} ).join("");
				trace(title);

			var xpath = './*[not(self::h3) and not(self::p[@class="sectionfooter"])]';
			nodeset = window.Minibuffer.$X(xpath, paragraph);
			if ( nodeset.length == 0 )
				return '';

			var r = document.createRange();
			var start = nodeset[0];
			var end = nodeset[ nodeset.length - 1 ];

			r.setStart(start, 0);
			r.setEndAfter(end);
			var doc = r.cloneContents();
			var d =  document.createElement('div');
			d.appendChild(doc);

			var text = d.innerHTML;
			text += (
				'\n\n<span class="source">' + "reblogged from " +
					'<a href="' + document.location.href + '">' +
						title +
					'</a>' +
				'</span>'
			);

			window.setTimeout(  function () {
				Hatena.Diary.post(title, text, function () {
					window.Minibuffer.execute("toggle-pin", [paragraph]);
					window.Minibuffer.message(
						Math.floor( ++reblogged / total * 100 ) + "% reblogged"
					);
				} );
			}, 500 * index++ );

		} );
	}

		
}


// run if in greasemonkey.
if ( typeof GM_log != 'undefined' ) {
	Hatena.Diary.init();
}

