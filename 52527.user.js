// ==UserScript==
// @name           hide_people_from_your_facebook_highlights_sidebar
// @namespace      web
// @description    hide doucheBags from your highlights sidebar
// @include        http://*facebook.com/*
// ==/UserScript==
(function() {

/****
 * 
 * Start of customizable section
 *
 ****/

// this is the min percentage required to say "this story has too many doucheBags
// in it, fuck if i want to see it," thus will it be removed.  default is 100%, 
// meaning a story has to be made up completely of douche bags (this way you
// won't miss out on people you like).  Put it to 1 if you don't want to see any
// stories that invlove any doucheBags.
var doucheBagInvolvementPercentage = 100;

// type in the names of your doucheBag friends, just as you see them on facebook, this is case
// insensitive.  there are two names below, replace them with your first two douchebags, as you
// add more, you'll need the commas.  you're smart, you'll figure it out.  if not, you're
// name should be on your doucheBag list.
var doucheBagNames = [
	"Douche Bag Jones",
	"George W. Bush"
];

/*!
 * mLib JavaScript Library v0.1
 *
 * Emulates very minimal set of jQuery behavior.  Is not cross platform tested (only moz),
 * nor overly efficient.  It is meant to be something small you can inline with grease monkey scritps
 *
 * Copyright (c) 2009 Johnny Marnell
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){var A=[],W,N,a,G={},D={},M={},R={},K=window.$m;Y.each=B;Y.trim=T;Y.isArray=I;Y.noConflict=b;window.$m=window.mLib=Y;Z();L();function Y(h,e){var l,d=[],m=e,t;function n(y){B(d,y);return l}function c(z){var y=[];n(function(){V(y,this.getElementsByClassName(z))});return y}function s(y){return d[y]}function w(){n(function(){if(this.parentNode){this.parentNode.removeChild(this)}})}function u(y){n(function(){j(y+j())});return l}function r(y){n(function(){j(j()+y)});return l}function v(y){return $m(s(y),l)}function x(z,y){n(function(){Q(this,z,y)});return l}function p(y){return function(){return $m(y.apply(this,arguments),l)}}function g(){return m}function q(){m.each(function(){d.push(this)});return l}function k(){return f()}function f(){return d.length}function j(y){return o("innerHTML",y)}function o(y,z){if(z){n(function(){this[y]=z});return l}else{return s(0)[y]}}function i(y,z){if(z){n(function(){this.style[y]=z});return l}else{return s(0).style[y]}}if(typeof h==="function"){H(h);return Y}else{if(h.constructor===Y){return h}else{if(I(h)){B(h,function(){d.push(this)})}else{d.push(h)}l={get:s,bind:x,each:n,end:g,css:i,html:j,attr:o,size:k,length:f,andSelf:q,eq:v,prepend:u,append:r,remove:w};B(["click","load","mousedown"],function(){l[this]=function(y){return function(z){return l.bind(y,z)}}(this)});B(G,function(y){l["filter"+y]=p(G[y]);l["child"+y]=p(D[y]);l["parents"+y]=p(M[y]);l["parent"+y]=p(R[y])});l.childClass=p(c);l.constructor=Y;return l}}}function b(){window.$m=K;return Y}function I(c){return typeof c==="object"&&typeof c.splice==="function"&&typeof c.length==="number"&&!(c.propertyIsEnumerable("length"))}function T(c){return(c||"").replace(/^\s+|\s+$/,"")}function V(d,c){B(c,function(){d.push(this)})}function P(c,f,d,e,g){var e=e||[];B(c.childNodes,function(){P(this,f,d,e,true)});if(g){if(f.apply(c,d)){e.push(c)}}else{return e}}function F(f,e,c){var d=[];for(f=f.parentNode;!!f;f=f.parentNode){if(e.apply(f,c)){d.push(f)}}return d}function S(e,d,c){for(e=e.parentNode;!!e;e=e.parentNode){if(d.apply(e,c)){return[e]}}return[]}function C(c){return function(){var d=[],e=arguments;this.each(function(){if(c.apply(this,e)){d.push(this)}});return d}}function X(c,d){return function(f,e){return c(f,d,e)}}function O(c){return function(){var d=[],e=arguments;this.each(function(){var f=c(this,e);V(d,f)});return d}}function L(){a={Type:U("nodeName"),Class:function(e){var c=T(e).split(/\s+/),d=this,f;B(c,function(){e=this.toString();f=false;B(d.className&&T(d.className).split(/\s+/),function(){if(this.toString()==e){f=true;return false}});if(!f){return false}});return f},All:function(){return this.nodeName!=="#text"}};B(a,function(c){G[c]=C(this);D[c]=O(X(P,this));R[c]=O(X(S,this));M[c]=O(X(F,this))})}function E(c){return function(d){return this[c]===d}}function U(c){return function(d){return this[c]===d.toUpperCase()}}function B(e,f){if(e){if(e.length===undefined){for(var c in e){if(f.call(e[c],c)===false){break}}}else{for(var d=0;d<e.length;d++){if(f.call(e[d],d)===false){break}}}}}function J(){if(!N){B(A,function(){this()});N=true}}function H(c){if(N){c()}else{A.push(c)}}function Q(f,g,h){var c,d,e="on"+g;c=f[e];d=c&&c._mL_handlers;if(!d){d=[];if(typeof c==="function"){d.push(c)}f[e]=function(i){return function(){var j=this,k=arguments;B(i,function(){this.apply(j,k)})}}(d);f[e]._mL_handlers=d}d.push(h)}function Z(){if(W){return }W=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);J()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);J()}});if(document.documentElement.doScroll&&window==window.top){(function(){if(N){return }try{document.documentElement.doScroll("left")}catch(c){setTimeout(arguments.callee,0);return }J()})()}}}Q(window,"load",J)}})();

	var	highlightsLoaded,
		waitForHighlightsInterval
		waitAmount = 27,
		elapsedWait = 0,
		maxWait = 5000,
		maxHideBar = 1500;
		processedDoucheBagNames = {};

	// first, preprocess names to lower case and into a hash map
	$m( doucheBagNames).each( function() {
		processedDoucheBagNames[ this.toLowerCase()] = true;
	});
	
	// hide the highlight bar so nothing pops
	$m( document)
		.childType( 'head')
		.eq( 0)
			.append( 
				'<style id="__db_hide_side">'
					+ 'div.UIHomeBox.UITitledBox { display: none; }</style>');

	// set up document ready and home click events
	$m(function() {
		// highlights should be loaded by now, so fix them
		waitForHighlights();

		// add the wait to the home buttons' clicks
		$m( [
			document.getElementById('fb_menubar_logo'),
			document.getElementById('fb_menu_home')
		])
			.childAll()
			.andSelf()
				.click(function() {
					stopWaitingForHighlights();
					waitForHighlights();
				});
	});

	function stopWaitingForHighlights() {
		if( waitForHighlightsInterval) {
			highlightsLoaded = false;
			clearInterval(waitForHighlightsInterval);
			elapsedWait = 0;
		}
	}
	function waitForHighlights() {
		if( elapsedWait === 0) {
			waitForHighlightsInterval = setInterval(
				function() {						
					maxWait += waitAmount;

					if( elapsedWait > maxHideBar) {
						//console.log(' #####################unhiding');
						$m( document.getElementById('__db_hide_side')).remove();
					}
					// if they were loaded or we've wasted too much time, then stop
					if( highlightsLoaded || elapsedWait > maxWait) {
						stopWaitingForHighlights();
						//console.log(' ###############################unhiding');
						$m( document.getElementById('__db_hide_side')).remove();
					}
					// otherwise keep trying
					else {
						fix();
					}
				},
				waitAmount
			);
		}
	}

	// and, finally, do our actual work...
	// look for the highlights section, examine the stories within it, and hide any that are
	// mostly about doucheBag bags
	function fix() {
		$m(	document)
			.childClass( 'UITitledBox_Title')
			.each( function() {
				var title = $m( this);
				
				// if this one is highlights, we're in business
				if( title.html().toLowerCase().indexOf('highlights') >= 0 ) {
					
					title
						.parentClass( 'UIHomeBox UITitledBox')
							.childClass( 'UIHotStory')
							.each( fixStory);
							
					// signal that we found it
					highlightsLoaded = true;
					
				}
			});

	}

	// spilt the innerHtml (should be a name) by whitespace, then rejoin (in case of page breaks
	// or something) and return whether or not it's in our doucheBag hashmap.
	function isADoucheBag( el) {
		//console.log('checking for douche', el.innerHTML);
		return !!processedDoucheBagNames[ 
					$m.trim( 
						$m( el).html().toLowerCase()
					).split(/\s+/)
					.join(' ')
				];
	}

	function fixStory() {
		var story = $m( this),
			ppl,
			numDoucheBags = 0,
			numTotalPeople = 0;

		// see if there are multiple people
		ppl = story.childClass('stream_participants_long');

		// if not, check for authors, i.e. "by Douche Bagenstein"
		if( !ppl.length()) {
			ppl = story.childClass('UIHotStory_Why');
		}

		numTotalPeople = ppl.length();
		if( numTotalPeople > 0) {
			//console.log( 'found some peeps');
			ppl
				.childType('a')
				.each(function() {
					if( isADoucheBag( this)) {
						//console.log( '***************found a douche', this.innerHTML);
						numDoucheBags++;
					}
				});

			// if this story is about enough doucheBags, fucking get rid of it for fuck's sake
			if( numDoucheBags / numTotalPeople * 100 >= doucheBagInvolvementPercentage) {
				//console.log( '*********hiding')
				story.css( 'display', 'none');
			}
		}
	}
})();