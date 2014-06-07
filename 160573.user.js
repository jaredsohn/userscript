// ==UserScript==
// @author			mungushume
// @name            Project Free TV
// @version			1.1
// @namespace		http://www.monkeyr.com
// @description    	Highlights your preferred sources, reorders most popular at the top, quick episode jump with Ctrl+up/Ctrl+down, expand and collapse episode headers
// @include         http://www.free-tv-video-online.me/internet/*/*
// @grant			GM_addStyle
// @grant			GM_setValue
// @grant			GM_getValue
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

var $ = jQuery.noConflict();

var projectFreeTV = {

	reOrderResults : true,
	highLightResults : true,
	disableActualReporting : false,
	hideTenNegative : true,
	enableExpandCollapse : true,

	highlightHosts : ['putlocker.com','vidbull.com','sockshare.com','vreer.com'],
	hideHosts : [],
	rateings : {},
	offsetFromAnchor : 20,
	debug : false,

	init : function(){
		var spans, span, tds, td;
		that = this;
		this.rateings = this.getList('rateings');
		if(this.highLightResults)this.addStyle("@namespace url(http://www.w3.org/1999/xhtml); tr[class] td[id] a div{text-shadow: 0.1em 0.1em rgb(255, 255, 0), -0.1em 0.1em rgb(255, 255, 0), 0.1em -0.1em rgb(255, 255, 0), -0.1em -0.1em rgb(255, 255, 0), 0px 0px 0.2em rgb(255, 255, 0);} .hide{display:none}");
		tds = document.querySelectorAll('td[id]');
		for(var i=0;(td = tds[i++]);){
			span = td.querySelector('a > span');
			var host = span.innerHTML.match(/Host: ([\w\d\.]+)/);
			var cls = host[1].replace('.','-')
			var tr = $(td).closest('tr').addClass(cls);
			var a = tr.find('td:not([class]) > a:not([target])').click(this.addVoteClick.bind(this));
		}
		$('a.down').hide();
		this.setColors( this.rateings );
		this.sortFaves( this.rateings );
		this.hideTenNegatives( this.rateings );
		if(this.enableExpandCollapse) this.expandCollapse();
		this.anchor = {};
		$.each($('a[name]'), function(){
			that.anchor[$(this).offset().top] = $(this).attr('name')
		});
		$(document).bind('keydown', 'Ctrl+down', that.scroll('down'));
		$(document).bind('keydown', 'Ctrl+up', that.scroll('up'));
	},

	init2 : function(){
		that = this;
		this.anchor = {};
		$.each($('a[name]'), function(){
			that.anchor[$(this).offset().top] = $(this).attr('name')
		});
		this.log('here')
		$(document).bind('keydown', 'Ctrl+down', that.scroll('down'));
		$(document).bind('keydown', 'Ctrl+up', that.scroll('up'));

		this.log(this.anchor);
	},

	expandCollapse : function(){
		that = this;
		var header = $('tr.3').find('td[align]').append(
			$('<a/>', {
				html:'collapse', 
				href:'#' ,
				css: {color:'#6384AD'},
				'class' : 'ex',
				click:function(e){
					e.preventDefault();
					mes = header.find('a.ex');
					// that.log(mes.html())
					if(mes.html() == 'collapse'){
						mes.html('expand')
						$('tr[class]:not(tr.3)').hide();
					}
					else{
						mes.html('collapse');
						$('tr[class]:not(tr.3,tr.none,tr.hide)').show();
						// that.log('closest',$(e.target).closest('tr'))
						that.scrollTo($(e.target).closest('tr').find('a[name]').attr('name'), 0);
					}
				}
			})
		).append("&nbsp;");
	},

	scroll : function(type){
		return function(e){
			// this.log(e)
			var obj = this.anchor;
			var offset = this.offsetFromAnchor;
			var scroll_to = undefined;
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					if(type == 'down'){
						if(1*prop > window.pageYOffset+offset){
							scroll_to = obj[prop];
							break;
						}
					}
					else{
						if(1*prop > window.pageYOffset-offset){
							break;
						}
						else{
							scroll_to = obj[prop];
						}
					}
				}
			}		
			if(typeof scroll_to !== "undefined"){
				this.scrollTo(scroll_to, 1000);
			}			
		}.bind(this);
	},

	scrollTo : function(a, t){
		$(document.body).animate({'scrollTop': $('a[name="'+a+'"]').offset().top - this.offsetFromAnchor}, t);
	},

	logit : function(){
		this.log(document.body.scrollHeight, window.pageYOffset, window.innerHeight, $('a[name="e12"]').offset().top);

	},

	hideTenNegatives : function(obj){
		if(!this.hideTenNegative) return;
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if(obj[prop] <= -10){
					this.log(obj[prop], prop)
					$('.'+prop).addClass('hide');
				}
			}
		}
	},

	sortFaves : function(obj){
		if(!this.reOrderResults) return;
		var that = this,
		info = undefined,
		trs = $('tr[class]');
		trs.each(function(){
			if(typeof info === "undefined") info = trs.is('tr.none');
			if($(this).attr('class') == '3'){
				if (typeof sort_array !== "undefined" ){
					sorted = sort_array.sort(function(a,b){
						var compA = obj[$(a).attr('class')] || 0;
						var compB = obj[$(b).attr('class')] || 0;
						return (compA < compB) ? 1 : (compA > compB) ? -1 : 0;
					});
					var last = undefined;
					$.each(sorted, function(){
						if(typeof last !== "undefined"){
							$(this).insertAfter($(last));
						}
						last = this;
					});
				}
				if(!info){
					sort_array = [];
				}
			}
			else if($(this).attr('class') == 'none'){
				sort_array = [];
			}
			else if($(this).attr('class') != '3')
				sort_array.push(this);
		});
		var first = false;
		$('tr[class]').each(function(){
			if($(this).attr('class') == '3' || $(this).attr('class') == 'none'){
				first = true;
			}
			else if(first){
				$(this).children('td').removeClass('dotted')
				first = false;
			}
			else {
				$(this).children('td').addClass('dotted')
			}
		});
	},

	setColors : function(obj){
		if(!this.highLightResults) return;
		var min, max, up, dn, val, col;
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if(min === undefined) min = max = obj[prop];
				if(obj[prop]<min) min = obj[prop];
				else if(obj[prop]>max) max = obj[prop];
			}
		}
		if(min === undefined) min = max = 0;
		up = ((max==0)?0:50/max);
		dn = ((min==0)?0:50/min);

		// this.log(min, max, up, dn);
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				val = obj[prop];
				if(val>0){
					col = this.setColor(parseInt((((val)*up)+50)/10)*10);
					this.addColor('tr.'+prop+' td a div', col)
				}
				else if(val<0){
					col = this.setColor(parseInt((((val)*dn)-50)/10)*-10);
					this.addColor('tr.'+prop+' td a div', col)
				}
				else{
					$('tr.'+prop+' td a div').removeAttr('style');
				}
				
			}
		}
	},

	addColor : function(el, col){
		$(el).css({'text-shadow': ' .1em .1em '+col+', -.1em .1em '+col+', .1em -.1em '+col+', -.1em -.1em '+col+', 0 0 .2em '+col});
	},

	setColor : function (i){
	    var red = ((i < 50) ? 255 : 255 - (256.0 / 100 * ((i - 50) * 2)));
	    var green = ((i < 50) ? 256.0 / 100 * (i * 2) : 255);
	    return "rgb(" + parseInt(red) + "," + parseInt(green) + ",0)";
	},

	addVoteClick : function(e){
		this.log(e)
		this.log( $(e.target).closest('tr[class]'))
		var r = this.rateings;
		var cls = $(e.target).closest('tr[class]').attr('class');
		if(!r.hasOwnProperty(cls)) r[cls] = 0;
		r[cls] += (($(e.target).attr('src').indexOf('good')>-1) ? 1 : -1);
		this.setList('rateings', r)
		this.setColors(r);
		this.sortFaves(r);
		this.hideTenNegatives( r );
		if(this.disableActualReporting || e.ctrlKey) {
			e.preventDefault();
			e.stopPropagation();
		}
		this.log(r)
	},

	hideHidden : function(){
		$.each(this.getList('hideHosts'), function(){
			var cls = this.replace('.','-');
			$('tr.'+cls).hide();
		})		
	},

	hide : function(e){
		e.preventDefault();
		var cls = $(e.target).closest('tr').attr('class');
		$('.'+cls).hide();
		var lists = this.getList('hideHosts');
		if($.inArray(cls, lists)==-1) lists.push(cls);
		this.log(lists);
		this.setList('hideHosts', lists);		
	},

	getList : function(lst){
		return JSON.parse(GM_getValue(lst, JSON.stringify(this[lst])));
	},

	setList : function(lst, val){
		GM_setValue(lst, JSON.stringify(val));
	},

	addStyle : function(css)
	{
		if (typeof GM_addStyle !== "undefined") {
			GM_addStyle(css);
		} else {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				node.innerHTML = css;
				heads[0].appendChild(node);
			}
		}
	},

	log : function(){
		if(this.debug && console && console.log) {
			if(arguments.length>1)
				console.log(arguments);
			else
				console.log(arguments[0]);
		}
	}

}

/*
* jQuery Hotkeys Plugin
* Copyright 2010, John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* Based upon the plugin by Tzury Bar Yochay:
* http://github.com/tzuryby/hotkeys
*
* Original idea by:
* Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/
	
jQuery.hotkeys = {
	version: "0.8",

	specialKeys: {
		8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
		20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
		37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
		96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
		104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
		112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
		120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
	},

	shiftNums: {
		"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
		"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
		".": ">",  "/": "?",  "\\": "|"
	}
};

function keyHandler( handleObj ) {
	// Only care when a possible input has been specified
	if ( typeof handleObj.data !== "string" ) {
		return;
	}
	
	var origHandler = handleObj.handler,
		keys = handleObj.data.toLowerCase().split(" "),
		textAcceptingInputTypes = ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color"];

	handleObj.handler = function( event ) {
		// Don't fire in text-accepting inputs that we didn't directly bind to
		if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
			jQuery.inArray(event.target.type, textAcceptingInputTypes) > -1 ) ) {
			return;
		}
		
		// Keypress represents characters, not special keys
		var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
			character = String.fromCharCode( event.which ).toLowerCase(),
			key, modif = "", possible = {};

		// check combinations (alt|ctrl|shift+anything)
		if ( event.altKey && special !== "alt" ) {
			modif += "alt+";
		}

		if ( event.ctrlKey && special !== "ctrl" ) {
			modif += "ctrl+";
		}
		
		// TODO: Need to make sure this works consistently across platforms
		if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
			modif += "meta+";
		}

		if ( event.shiftKey && special !== "shift" ) {
			modif += "shift+";
		}

		if ( special ) {
			possible[ modif + special ] = true;

		} else {
			possible[ modif + character ] = true;
			possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

			// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
			if ( modif === "shift+" ) {
				possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
			}
		}

		for ( var i = 0, l = keys.length; i < l; i++ ) {
			if ( possible[ keys[i] ] ) {
				return origHandler.apply( this, arguments );
			}
		}
	};
}

jQuery.each([ "keydown", "keyup", "keypress" ], function() {
	jQuery.event.special[ this ] = { add: keyHandler };
});

projectFreeTV.init();