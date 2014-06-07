// ==UserScript==
// @name	Flickr Move Additional Info
// @namespace	http://6v8.gamboni.org/
// @description Move photos additional informations on top of the group/set list
// @version        0.4
// @identifier	http://6v8.gamboni.org/IMG/js/flickrmoveadditionalinfo.user.user.js
// @date           2009-09-28
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/photos/*/*
// @exclude *flickr.com/photos/*/alltags*
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
// Copyright (C) 2009 Pierre Andrews
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


(function () {

	//update information
	var SCRIPT = {
		name: "Move Additional Info",
		namespace: "http://6v8.gamboni.org/",
		description: "Move photos additional informations on top of the group/set list",
		identifier: "http://6v8.gamboni.org/IMG/js/flickrmoveadditionalinfo.user.js",
		version: "0.4",								// version
		date: (new Date("2009-09-28"))		// update date
		.valueOf()
	};


	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
	}

	function getObjectMethodClosure(object, method) {
		return function(arg) {
			return object[method](arg);
		}
	}

	/*
	  Xpath trickery, from:
	  http://ecmanaut.blogspot.com/2006/07/expressive-user-scripts-with-xpath-and.html
	 */
	function $x( xpath, root )
		{
			var doc = root ? root.evaluate?root:root.ownerDocument : document;
			var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
			var result = [];
			while( next = got.iterateNext() )
				result.push( next );
			return result;
		}

	function $x1(xpath,root) {
		var doc = root ? root.evaluate?root:root.ownerDocument : document;
		return document.evaluate( xpath,
									root||doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
									).singleNodeValue;
	}

	function foreach( xpath, cb, root )
	{
		var nodes = $x( xpath, root ), e = 0;
		for( var i=0; i<nodes.length; i++ )
			e += cb( nodes[i], i ) || 0;
		return e;
	}


	/*
	  E4X trickery, from:
	  http://ecmanaut.blogspot.com/2006/03/e4x-and-dom.html#import_node
	 */
	function importNode( e4x, doc )
	{
		var me = importNode, xhtml, domTree, importMe;
		me.Const = me.Const || { mimeType: 'text/xml' };
		me.Static = me.Static || {};
		me.Static.parser = me.Static.parser || new DOMParser;
		xhtml = <testing xmlns="http://www.w3.org/1999/xhtml" />;
		xhtml.test = e4x;
		domTree = me.Static.parser.parseFromString( xhtml.toXMLString(),
													me.Const.mimeType );
		importMe = domTree.documentElement.firstChild;
		while( importMe && importMe.nodeType != 1 )
			importMe = importMe.nextSibling;
		if( !doc ) doc = document;
		return importMe ? doc.importNode( importMe, true ) : null;
	}

	function appendTo( e4x, node, doc )
	{
		return node.appendChild( importNode( e4x, doc || node.ownerDocument ) );
	}


	var flickrmoveadditionalinfo = function() {this.init();}

	flickrmoveadditionalinfo.prototype = {

		init: function() {
			var before = document.getElementById("otherContexts_div");
			if(before) {
				this.move("/html/body/div[@id='Main']/table[@id='Photo']/tbody/tr/td[2]/h4",before);
				this.move("/html/body/div[@id='Main']/table[@id='Photo']/tbody/tr/td[2]/p[1]",before);
				this.move("/html/body/div[@id='Main']/table[@id='Photo']/tbody/tr/td[2]/p[2]",before);
				this.move("/html/body/div[@id='Main']/table[@id='Photo']/tbody/tr/td[2]/ul[1]",before);
				this.move("/html/body/div[@id='Main']/table[@id='Photo']/tbody/tr/td[2]/ul[2]",before);
				this.move("//div[@id='upload_form_container']",before);
				this.move("//textarea[@id='texty']",before);
			}
		},
		move: function(xpath,to) {
			var node = $x1(xpath);
			if(node)
				to.parentNode.insertBefore(node,to);
		}
	}
	//======================================================================
	// launch
	try {
		window.addEventListener("load", function () {
									try {

										// update automatically (http://userscripts.org/scripts/show/2296)
										win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
									} catch (ex) {}

									var flickrgp = new flickrmoveadditionalinfo();
		}, false);
	} catch (ex) {}
})();


