// ==UserScript==
// @name          escape pod wikify
// @namespace     *
// @description   creates an alert with the entry for http://en.wikipedia.org/wiki/List_of_Escape_Pod_episodes
// @include       http://escapepod.org/*/*/*/*/
// ==/UserScript==

////////////////////////////
// string_edit
// example:
//
// 	 var editHTML = new string_edit(document.body.innerHTML);
//
//   editHTML.cut(0, '<h2', INCLUDE_END);
//   editHTML.add(']', '">', REPLACE);
//
//   $(document).ready(function() {
//	   document.body.innerHTML = editHTML.finish();
//   });
//
//------
// function: cut
//  start  : the position to start the cut, may be a number or string/regex (search for position)
// 	end    : the position to end the cut, may be a number (# of characters after the last character of start) or string/regex (search after the last character of start)
// 	return : the removed section of string (includes start, excludes end); characters up to the beginning of start are moved to newHTML
// 	         if start or end are invalid or not found then return false; if SAVE_START && DELETE_START or INCLUDE_END && DELETE_END then return false
//
// flags:
// 	DELETE_UPTO  : characters up to the beginning of start are deleted
// 	SAVE_START   : characters in start are moved to newHTML instead of included in cut
// 	DELETE_START : characters in start are deleted
// 	INCLUDE_END  : characters in end are included in the cut
// 	DELETE_END   : characters in end are deleted
//
// note: regex 'global' flag is not supported
//
//------
// function: add
//  insert   : the string to insert
// 	position : the position to insert the string (before this position), may be a number or string/regex
// 	return   : the position that the string was inserted; if the position wasn't found then return false
//
// flags:
// 	DELETE_UPTO : characters up to the beginning of position are deleted
// 	REPLACE     : characters in position are deleted
// 	AFTER       : string is insterted after position
//
// note: regex 'global' flag is not supported

const DELETE_UPTO  = 0x1;

const SAVE_START   = 0x2;
const DELETE_START = 0x4;
const INCLUDE_END  = 0x8;
const DELETE_END   = 0x10;

const REPLACE      = 0x2;
const AFTER        = 0x4;

function string_edit(originalstring)
{
	this.originalHTML = originalstring;
	this.newHTML = '';

	////////////////////////////
	// function: cut
	this.cut = function (start, end, flags)
	{
		// check flags
		if ( ((flags & SAVE_START) && (flags & DELETE_START)) || ((flags & INCLUDE_END) && (flags & DELETE_END)) )
			return false;

		// determine startpoint, check validity
		var startpoint;
		var startlength;
		var startstring;
		if (!(isNaN(start)))
		{
			startpoint = start;
			if ( (startpoint < 0) || (startpoint > this.originalHTML.length) )
				return false;

			startlength = 0;
		}
		else
		{
			startpoint = this.originalHTML.search(start);
			if (startpoint < 0)
				return false;

			startstring = this.originalHTML.match(start)[0];
			startlength = startstring.length;
		}

		// determine endpoint, check validity
		var endpoint;
		var endlength;
		if (!isNaN(end))
		{
			endpoint = startpoint + end;
			var endlength = 0;
		}
		else
		{
			var tempHTML = this.originalHTML.slice(startpoint + startlength);
			endpoint = tempHTML.search(end) + startpoint + startlength;
			endlength = tempHTML.match(end)[0].length;
		}

		if ( (endpoint < 0) || (endpoint > this.originalHTML.length) )
			return false;


		// tweak startpoint & endpoint if flags are set
		if (flags & SAVE_START)
		{
			if (flags & DELETE_UPTO)
				newHTML += startstring;
			else
				startpoint += startlength;
		}
		if (flags & INCLUDE_END)
			endpoint += endlength;


		var trimstring;
		if (flags & DELETE_START)
			trimstring = this.originalHTML.slice(startpoint + startlength, endpoint);
		else
			trimstring = this.originalHTML.slice(startpoint, endpoint);

		if (!(flags & DELETE_UPTO))
			this.newHTML += this.originalHTML.slice(0, startpoint);

		if (flags & DELETE_END)
			this.originalHTML = this.originalHTML.slice(endpoint + endlength);
		else
			this.originalHTML = this.originalHTML.slice(endpoint);


		return trimstring;
	};


	////////////////////////////
	// function: add
	this.add = function (insert, position, flags)
	{
		// if REPLACE is set make sure AFTER is not
		if (flags & REPLACE)
			flags &= ~AFTER;

		// determine positionpoint, check validity
		var positionpoint;
		var positionlength;
		if (!isNaN(position))
		{
			positionpoint = position;
			positionlength = 0;
		}
		else
		{
			positionpoint = this.originalHTML.search(position);
			positionlength = this.originalHTML.match(position)[0].length;
		}

		if ( (positionpoint < 0) || (positionpoint > this.originalHTML.length) )
			return false;


		if (!(flags & DELETE_UPTO))
			this.newHTML += this.originalHTML.slice(0, positionpoint);
		if (flags & AFTER)
		{
			this.newHTML += this.originalHTML.slice(positionpoint, positionpoint + positionlength);
			positionpoint += positionlength;
		}
		this.newHTML += insert;

		if (flags & REPLACE)
			positionpoint += positionlength;

		this.originalHTML = this.originalHTML.slice(positionpoint);

		return positionpoint;
	};

	this.finish = function()
	{
		this.newHTML += this.originalHTML;

		return this.newHTML;
	}

	return true;
}


////////////////////////////
// code begins

function stripHTML (input){
	if (input.slice(0,2) == '<a')
		input = input.slice(input.search('>') + 1);

	if (input.slice(-4) == '</a>')
		input = input.slice(0,-4);

	return input;
}

	var editHTML = new string_edit(document.body.innerHTML);

	var html = editHTML.cut('<h1 class="post-title"><a href="', '"', DELETE_START);
 	var number = editHTML.cut('>EP', ':', DELETE_START);
 	var title = editHTML.cut(1, '</a>', DELETE_START);
	var author = editHTML.cut('By: ', /<\/s|<b| of /, DELETE_START);
	author = stripHTML(author);
	var narrator = editHTML.cut('Read by: ', /<b| of /, DELETE_START);
	narrator = stripHTML(narrator);

	// ep no longer has run times in the blog entries.
	var time = "";

  var wiki = '|-\n| ' + number + ' || [' + html + ' ' + title + '] || [[' + author + ']] || [[' + narrator + ']] || ' + time + ' || [ forum]\n';

window.addEventListener('load', function(){
  alert(wiki);
}, true);
