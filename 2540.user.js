// Copyright (C) 1997-2004  Daniel W. Crompton <daniel.crompton@gmail.com>
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307 USA
//
// CVSVERSION: $Id: $
//
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Name of Module", and click Uninstall.
//
// --------------------------------------------------------------------
//
//
// ==UserScript==
// @name	  Slashdot Edit
// @namespace	  http://www.rphh.org/
// @description	  v0.2 Does your JE or Comment get eaten? Use this to prevent that. Only stores Title, Journal Enrty, or Comment Entry
// @include	  http://slashdot.org/journal.pl?op=edit
// @include	  http://slashdot.org/comments.pl?*op=Reply*
// @include	  http://slashdot.org/journal.pl
// @include	  http://slashdot.org/comments.pl
// @version	  0.2
// ==/UserScript==

function SE_log(_value) {
		GM_log(_value);
//		alert(_value);
}

// Execute on page load
(function () {
 	SE_log("Slashdot Edit loaded");
	var _ta = document.getElementsByTagName("TEXTAREA"),	_my_ta,	_my_ta_c;
	var _ti = document.getElementsByTagName("INPUT"),	_my_ti, _my_ti_c;
	var _i;

	for( _i = 0; _i < _ta.length; _i++) {
		if( _ta.item(_i).name == "article") {
			_my_ta = _ta.item(_i);
		}
		if( _ta.item(_i).name == "postercomment") {
			_my_ta_c = _ta.item(_i);
		}
	}

	for( _i = 0; _i < _ti.length; _i++) {
		if( _ti.item(_i).name == "description") {
			_my_ti = _ti.item(_i);
		}
		if( _ti.item(_i).name == "postersubj") {
			_my_ti_c = _ti.item(_i);
		}
	}

	if(!_my_ta && !_my_ta_c) return -1;
	if(!_my_ti && !_my_ta_c) return -1;

	var _old_TI	= GM_getValue("_slashdot_journal_title");
	var _old_TA	= GM_getValue("_slashdot_journal");
	var _old_TI_C	= GM_getValue("_slashdot_comment_title");
	var _old_TA_C	= GM_getValue("_slashdot_comment");

	if(_old_TI && _my_ti)		_my_ti.value = _old_TI; 
	if(_old_TA && _my_ta)		_my_ta.value = _old_TA; 
	if(_old_TI_C && _my_ti_c)	_my_ti_c.value = _old_TI_C; 
	if(_old_TA_C && _my_ti_c)	_my_ta_c.value = _old_TA_C; 

	function newsubmit(event) {
			//alert("newsubmit called");
			var target = event ? event.target : this;

			// do anything you like here
			if(_my_ti)	GM_setValue("_slashdot_journal_title",	_my_ti.value);
			if(_my_ta)	GM_setValue("_slashdot_journal",	_my_ta.value);
			if(_my_ti_c)	GM_setValue("_slashdot_comment_title",	_my_ti_c.value);
			if(_my_ta_c)	GM_setValue("_slashdot_comment",	_my_ta_c.value);

			// call real submit function
			this._submit();
	}

	window.addEventListener('submit', newsubmit, false);

	HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
	HTMLFormElement.prototype.submit = newsubmit;

	/* <textarea wrap="virtual" name="article" rows="10" cols="50"></textarea> */
})(); 


