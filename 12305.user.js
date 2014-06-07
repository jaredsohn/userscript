// ==UserScript==
// @name           LDRize Mibuffer tumblr reblog command
// @namespace      http://ido.nu/kuma/
// @description    add tumblr.reblog and tumblr.delete command  to Minibuffer.
// @include        http://*.tumblr.com/*
// ==/UserScript==
//
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
#   brazil http://d.hatena.ne.jp/brazil/
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

var SCRIPT_VERSION  = '2007.11.20.4';
var SCRIPT_URL      = "http://userscripts.org/scripts/show/12305";

var $DEBUG_TRACE = 0;

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

//
// code from ShareOnTumblr.js
// (c)2007 brazil
// http://d.hatena.ne.jp/brazil/20070708/1183855622
//
{

	var context = {
		title:  '',
		withKey: 0,
	};

	function reblog(id, onload){
		var url = 'http://www.tumblr.com/reblog/' + id;

		trace("reblog", id, onload);
		
		var onerror = function(res){
			addTab(url);
			alert('Post failed. (' + res.status + ')');
		}
		
		getInputFields(url, function(fields){
//			if(fields['post[type]']=='photo'){
//				var source = {
//					url : url,
//					title : 'ReBlog: ' + id,
//				}
//				
//				checkPhoto(function(){
//					postByXHR(url, fields, onload, onerror);
//				}, source);
//				
//				return;
//			}
			
			postByXHR(url, fields, onload, onerror);
		}, onerror)
	}

	function getInputFields(url, onload, onerror){
		getByXHR(
			url, 
			null, 
			function(res){
				var doc = convertToHTMLDocument(res.responseText);
				var elms = window.Minibuffer.$X('id("edit_post")//*[name()="INPUT" or name()="TEXTAREA" or name()="SELECT"]', doc);
				var fields = {};
				elms.forEach(function(elm){
					fields[elm.name] = elm.value;
				});
				delete fields.preview_post;
				return onload(fields);
			}, 
			onerror
		)
	}

	function postByXHR(url, params, onload, onerror){
		url = url + 
		GM_xmlhttpRequest({
			method : 'POST',
			url : url,
			data : queryString(params),
			onload : function(res){
				if(res.status!=200)
					return onerror(res);
				onload && onload(res);
			},
			onerror : onerror,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
			}
		})
	}
	function checkPhoto(proceed, source){
		trace("checkPhoto", proceed, source);
		var onerror = createReopener('Post failed.', source);
		var onlimit = createReopener("You've used 100% of your daily photo uploads.", source);
		getInputFields('http://www.tumblr.com/new/photo', function(fields){
			if(isEmpty(fields))
				return onerror();
			
			if(!('photo_src' in fields))
				return onlimit();
			
			proceed();
		}, onerror);
	}
	function createReopener(msg1, source){
		source = source || {
			url : location.href,
			title : context.title,
		}
		return function(res, msg2){
			msg2 = msg2 || '';
			if(confirm(
				msg1 + msg2 + '\n'+
				'Will you reopen?\n\n' + 
				'Source page: ' + source.title + '\n' + source.url)){
				addTab(source.url);
			}
		}
	}
	function getByXHR(url, params, onload, onerror){
		url = url + queryString(params, true);
		GM_xmlhttpRequest({
			method : 'GET',
			url : url,
			onload : function(res){
				if(res.status!=200)
					return onerror(res);
				onload && onload(res);
			},
			onerror : onerror,
		})
	}
	function queryString(params, question){
		if(isEmpty(params))
			return '';
		
		var qeries = [];
		for(var key in params)
			qeries.push(key + '='+ encodeURIComponent(params[key]));
		return (question? '?' : '') + qeries.join('&');
	}
	function isEmpty(obj){
		for(var i in obj)
			return false;
		return true;
	}
	function convertToHTMLDocument(html) {
		var xsl = (new DOMParser()).parseFromString(
			'<?xml version="1.0"?>\
				<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">\
				<output method="html"/>\
			</stylesheet>', "text/xml");
		
		var xsltp = new XSLTProcessor();
		xsltp.importStylesheet(xsl);
		
		var doc = xsltp.transformToDocument(document.implementation.createDocument("", "", null));
		doc.appendChild(doc.createElement("html"));
		
		var range = doc.createRange();
		range.selectNodeContents(doc.documentElement);
		doc.documentElement.appendChild(range.createContextualFragment(html));
		
		return doc
	}
}

//
// (c)2007 ku http://ido.nu/kuma/
//
function addTab(url) {
	GM_openInTab(url);
}

var MinibufferHack = {
	LDRize: null,
	Minibuffer: null,
	init: function () {
		this.LDRize = eval("self", window.LDRize.setSiteinfo);
		this.Minibuffer = eval("Minibuffer", window.Minibuffer.addCommand);
		this.alter();

		trace("MinibufferHack", this, this.LDRize, this.Minibuffer);
	},
	alter: function () {
		var modifications = {
			LDRize: {
				// easy, quick and dirty....
			}
		};

		var LDRize = this.LDRize;
		var Minibuffer = this.Minibuffer;

		for ( var classname in modifications ) {
			var mod = modifications[classname];
			var instance = this[classname];
			for ( var name in mod ) {
				instance[name] = (
					( typeof mod[name] == 'function' ) ?  (
						( function (mod, name) {
							return function () {
								return mod[name].apply(instance, arguments);
							};
						} )(mod, name)
						
					) : mod[name]
				);
			}
		}

		//Minibuffer.KEYBIND['|'] = 'bindCompleteAndPipe';

		// Minibuffer 10.19 version does not export event function symbols...
		window.Minibuffer.addEventListener = Minibuffer.addEventListener;
		window.Minibuffer.removeEventListener = Minibuffer.removeEventListener;
	}
}

var Tumblr = new function () {
	var deletePost = this.deletePost = function (id, callback) {
		var url = 'http://www.tumblr.com/delete'
		var params = {id: id};
		GM_xmlhttpRequest({
			method : 'POST',
			url : url,
			data : queryString(params),
			onload : function(res){
				if(res.status==200)
					callback.apply(res);
				onload && onload(res);
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
			}
		})
	};
	var LDRize = this.LDRize = {
		message_duration: 1500,
		request_period: 3000,
		init_as_minibuffer_command: function () {
			window.Minibuffer.addCommand( {
				"tumblr.reblog": LDRize.reblog,
				"tumblr.delete": LDRize.deletePost,
			} );
		},
		init: function () {
			if ( window.Minibuffer )
				this.init_as_minibuffer_command.apply(this);
		},
		x1: function (xpath, context) {
		try{
			var links = window.Minibuffer.$X(xpath, context);
		}catch(e){
			trace(e, context, xpath);
		}
			var link;
			return links && (link = links.shift()) && link.value;
		},
		do_command: function (fn, start_message, end_message) {
			var stdin = MinibufferHack.LDRize.getPinnedItems().map(
				function (i) { return i.node; } );
			var total = stdin.length;
			if ( ! total ) 
				return;
			
			var xpath;
			if ( window.location.host == 'www.tumblr.com' ) {
				xpath = '(ancestor-or-self::li[1]//div[@class="so_ie_doesnt_treat_this_as_inline"]//a[@title="Permalink"])[1]/@href';
			} else {
				var path = location.protocol + "//" + location.host + "/post/"
				path = '"' + path + '"';
				xpath = './/a[starts-with(@href,' + path + ')]/@href';
			}

			var msg = start_message + total + ("post" + ( (total > 1) ? 's' : '') );
			window.Minibuffer.message( msg, this.message_duration);
			
			var self = this;
			var index = 0;
			var reblogged = 0;
			stdin.map( function ( para ) {
				if ( !para )
					return;

				var u = self.x1(xpath, para);
				trace("u", u,xpath,para);
				if ( u && u.match( /post\/(\d+)/ ) ) {
					var id = RegExp.$1;
					setTimeout( function () {
	try {
						fn.call(LDRize, id, function (req) {
							window.Minibuffer.message(
								Math.floor( ++reblogged / total * 100 ) + "% " + end_message,
								self.message_duration
							);
							// removing existing nodes makes LDRize confused.
							//if ( end_message == 'deleted' ) {
							//	if ( para ) {
							//		para.parentNode.removeChild(para);
							//	}
							//}
								
							window.Minibuffer.execute("toggle-pin", [para]);
						} );
	} catch(e){ trace(e) }
					}, index * self.request_period );
				}
			} );
			return stdin;
		},
		deletePost: function ( stdin ) {
			return LDRize.do_command.call(LDRize, function ( id, callback ) {
					deletePost(id, callback)
			}, "Deleteing", "deleted");
		},
		reblog: function ( stdin ) {
			return LDRize.do_command.call(LDRize, function ( id, callback ) {
					reblog(id, callback)
				}, "Reblogging", "reblogged" );
		},
	};
};

// run if in greasemonkey.
if ( typeof GM_log != 'undefined' ) {
	if ( window.Minibuffer ) {
		MinibufferHack.init();
	}
	if ( window.LDRize ) {
		Tumblr.LDRize.init();
	}
}

