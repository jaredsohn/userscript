// ==UserScript==
// @name           Team Fortress Wiki Hover-Tooltips for Items
// @namespace      tf-wiki
// @include        http://wiki.teamfortress.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @icon           http://wiki.teamfortress.com/w/images/b/be/TF2_crosshair_orange.png
// ==/UserScript==

/* Borrowed from http://userscripts.org/scripts/show/85398, to save requesting it and trusting it */
var read_content_global;
(function() {
var callbacks = [];
var callback_counter = 0;

function dispatch_global(id, name, value) {
  var msg_data = {
      'type': 'read_content_global',
      'callback_id': id,
      'name': name,
      'data': value,
      };
  var msg = JSON.stringify(msg_data);
  window.postMessage(msg, '*');
}
location.href = 'javascript:'+dispatch_global.toString();

function receive_global(event) {
  try {
    var result = JSON.parse(event.data);
    if ('read_content_global' != result.type) return;
    if (!callbacks[result.callback_id]) return;
    callbacks[result.callback_id](result.name, result.data);
    del(callbacks[result.callback_id]);
  } catch (e) {
    // No-op.
  }
}
window.addEventListener('message', receive_global, false);

read_content_global = function(name, callback) {
  var id = (callback_counter++);
  callbacks[id] = callback;

  location.href = 'javascript:dispatch_global('
      + id + ', "'
      + name.replace(/\"/g, '\\"') + '", '
      + name 
      + ');void(0);';
}
})();

/*---------------------------*/

/**
 * jQuery JSON Plugin
 * version: 2.3 (2011-09-17)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is
 * copyrighted 2005 by Bob Ippolito.
 */

(function( $ ) {

	var	escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
		meta = {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"' : '\\"',
			'\\': '\\\\'
		};

	$.toJSON = typeof JSON === 'object' && JSON.stringify
		? JSON.stringify
		: function( o ) {

		if ( o === null ) {
			return 'null';
		}

		var type = typeof o;

		if ( type === 'undefined' ) {
			return undefined;
		}
		if ( type === 'number' || type === 'boolean' ) {
			return '' + o;
		}
		if ( type === 'string') {
			return $.quoteString( o );
		}
		if ( type === 'object' ) {
			if ( typeof o.toJSON === 'function' ) {
				return $.toJSON( o.toJSON() );
			}
			if ( o.constructor === Date ) {
				var	month = o.getUTCMonth() + 1,
					day = o.getUTCDate(),
					year = o.getUTCFullYear(),
					hours = o.getUTCHours(),
					minutes = o.getUTCMinutes(),
					seconds = o.getUTCSeconds(),
					milli = o.getUTCMilliseconds();

				if ( month < 10 ) {
					month = '0' + month;
				}
				if ( day < 10 ) {
					day = '0' + day;
				}
				if ( hours < 10 ) {
					hours = '0' + hours;
				}
				if ( minutes < 10 ) {
					minutes = '0' + minutes;
				}
				if ( seconds < 10 ) {
					seconds = '0' + seconds;
				}
				if ( milli < 100 ) {
					milli = '0' + milli;
				}
				if ( milli < 10 ) {
					milli = '0' + milli;
				}
				return '"' + year + '-' + month + '-' + day + 'T' +
					hours + ':' + minutes + ':' + seconds +
					'.' + milli + 'Z"';
			}
			if ( o.constructor === Array ) {
				var ret = [];
				for ( var i = 0; i < o.length; i++ ) {
					ret.push( $.toJSON( o[i] ) || 'null' );
				}
				return '[' + ret.join(',') + ']';
			}
			var	name,
				val,
				pairs = [];
			for ( var k in o ) {
				type = typeof k;
				if ( type === 'number' ) {
					name = '"' + k + '"';
				} else if (type === 'string') {
					name = $.quoteString(k);
				} else {
					continue;
				}
				type = typeof o[k];

				if ( type === 'function' || type === 'undefined' ) {
					continue;
				}
				val = $.toJSON( o[k] );
				pairs.push( name + ':' + val );
			}
			return '{' + pairs.join( ',' ) + '}';
		}
	};

	$.evalJSON = typeof JSON === 'object' && JSON.parse
		? JSON.parse
		: function( src ) {
		return eval('(' + src + ')');
	};

	$.secureEvalJSON = typeof JSON === 'object' && JSON.parse
		? JSON.parse
		: function( src ) {

		var filtered = 
			src
			.replace( /\\["\\\/bfnrtu]/g, '@' )
			.replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
			.replace( /(?:^|:|,)(?:\s*\[)+/g, '');

		if ( /^[\],:{}\s]*$/.test( filtered ) ) {
			return eval( '(' + src + ')' );
		} else {
			throw new SyntaxError( 'Error parsing JSON, source is not valid.' );
		}
	};

	$.quoteString = function( string ) {
		if ( string.match( escapeable ) ) {
			return '"' + string.replace( escapeable, function( a ) {
				var c = meta[a];
				if ( typeof c === 'string' ) {
					return c;
				}
				c = a.charCodeAt();
				return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
			}) + '"';
		}
		return '"' + string + '"';
	};

})( jQuery );

/*---------------------------*/

/**
 * TFWiki Hover Tooltips Script
 *
 * Author: Stewart Atkins (http://wiki.teamfortress.com/wiki/User:Stewart)
 */
 


var wgScript = "/w/index.php"; //default values incase read_content_global fails
var wgArticlePath = "/wiki/$1";
read_content_global('wgScript', function(name,value){ wgScript = value; });
read_content_global('wgArticlePath', function(name,value){ wgArticlePath = value; });

var cacheName = "tfwiki.cache";
var cacheLifetime = 7 * 24 * 60 * 60;

GM_registerMenuCommand("Clear Tooltip Cache",function(){
	ttCache = new Object();
	GM_setValue(cacheName,"{}");
});


var ttCache = $.secureEvalJSON(GM_getValue(cacheName,"{}"));
/* TODO: check dates in cache, and clean */
$.each(ttCache,function(url,val){
	if(ttCache[url].date < ((new Date().getTime()/1000) - cacheLifetime)){
		ttCache[url] = undefined;
	}
});
var ttOffset = 10;
var mouseX = 0;
var mouseY = 0;
var currentTooltip = "";
var container = $("<div id='tooltip-container' style='position:absolute;z-index:999999;height:auto !important;max-width: 300px;color:white;text-align: center; background: #24201B; -moz-border-radius: 10px; border-radius: 10px; padding:7px 0px;'></div>");
$("#bodyContent").append(container);
var offsetContainer = container.offsetParent();
container.hide();
$("a[href]").each(function(){
	$(this).removeAttr("title");
}).live('mouseover',function(evt){
	var url = $(this).attr("href");
	var urlPrefix = wgArticlePath.replace("$1","");
	if(urlPrefix == url.substr(0,urlPrefix.length)){
		url = url.substr(urlPrefix.length);
	}
	currentTooltip = url;
	relocateTooltip(evt);
	if(ttCache[url] != undefined){
		if(ttCache[url].date > ((new Date().getTime()/1000) - cacheLifetime)){
			if(ttCache[url].tip != ""){ //0 = no tooltip
				showTooltip(ttCache[url].tip);
			}
			return;
		}else{
			ttCache[url] = undefined;
			GM_setValue(cacheName,$.toJSON(ttCache));
		}
	}
	$.get(wgScript+"?title="+url+"&action=render",function(data){
		var subpage = $(data).find("table.infobox td.loadout-tooltip-container > div");
		if(subpage.size() == 0){
			subpage = "";
		}else{
			subpage = subpage.eq(0).html();
		}
		ttCache[url] = { tip: subpage, date: (new Date().getTime()/1000)};
		GM_setValue(cacheName,$.toJSON(ttCache));
		if(currentTooltip == url && subpage != ""){
			showTooltip(subpage);
		}
	},"html");
}).live('mousemove',function(evt){
	updateCoords(evt);
	relocateTooltip();
}).live('mouseout',function(){
	currentTooltip = null;
	container.hide();
});
function showTooltip(tooltipObj){
	container.html(tooltipObj);
	container.css("width","auto");
	if(container.outerWidth() > 300)
		container.css("width","300px");
	relocateTooltip();
	container.show();
}
function relocateTooltip(){
	var lMouseX = mouseX;
	var lMouseY = mouseY;
	if(lMouseY + container.outerHeight() > $(window).height()+$(window).scrollTop())
		lMouseY = ($(window).height()+$(window).scrollTop())-container.outerHeight();
	if(lMouseX + container.outerWidth() > $(window).width()+$(window).scrollLeft())
		lMouseX = lMouseX - ((ttOffset*2) + container.outerWidth());
	var bodyOffset = offsetContainer.offset();
	lMouseX -= bodyOffset.left;
	lMouseY -= bodyOffset.top;
	container.css("left",lMouseX+"px").css("top",lMouseY+"px");
}
function updateCoords(evt){
	mouseX = evt.pageX + ttOffset;
	mouseY = evt.pageY + ttOffset;
}
$(document).unload(function(){
	container.hide();
});