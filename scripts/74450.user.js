// ==UserScript==
// @name			Read it Later Restyled
// @version			2.1
// @description 	A restyled interface for the Read it Later Web site.
// @namespace  		http://joshnichols.com
// @include 		http://readitlaterlist.com/unread*
// @include  		http://readitlaterlist.com/read*
// @include 		http://readitlaterlist.com/options
// @include 		http://readitlaterlist.com/pass/
// @include 		http://readitlaterlist.com/privacy_controls/
// @include  		http://readitlaterlist.com/services/
// @include  		http://readitlaterlist.com/offline
// @include  		http://readitlaterlist.com/add
// @include  		http://readitlaterlist.com/edit*
// @exclude  		http://readitlaterlist.com/text*
// @exclude  		http://readitlaterlist.com/d
// @exclude  		http://readitlaterlist.com/d/*
// @copyright 		2009, 2010, Josh Nichols (http://joshnichols.com)
// @contributor		Inspired by Instapaper restyled (http://unttld.co.uk/labs/instapaper-restyled/)
// @license	(CC) 	Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://projects.joshnichols.com/read-it-later/ril-restyled-2.0.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);