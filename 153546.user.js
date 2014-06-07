// ==UserScript==
// @name        e-hentai.org grabber
// @namespace   2f06d1a9-e5ba-4491-b5d6-862280fa5abd
// @description Grabs image links from e-hentai.org and exhentai.org
// @downloadURL https://userscripts.org/scripts/source/153546.user.js
// @updateURL   https://userscripts.org/scripts/source/153546.meta.js
// @include     *://exhentai.org/g/*
// @include     *://g.e-hentai.org/g/*
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @version     1.3.4
// ==/UserScript==
//
//Usage:
// Visit a gallery on exhentai.org or e-hentai.org, a new button will be added on the righthand toolbar named 'Image Links (begin)'.
// Click this to start the grabbing process, progress is tracked between the brackets.
// The grabber will fetch all image links and put them in a hidden div right after the 'Image Links' button, wait for it to complete.
// Using DownThemAll: Right click 'Image Links' and select 'DownThemAll!'. *text* for filename and *title*.*ext* for pagenumbered.
// Visual guide: http://i.imgur.com/zxxRx.png
//
//Notes:
// These websites try to prevent automated downloading by limiting how quickly you can view the pages, adjust the options below to adjust the delay between page fetches.
//
//Changelog
//
//Version 1.3.4
// Fixed the script when 'large image thumbnails' is enabled, thanks kitsame!
// Also 3rd upload for one fix...
//
//Version 1.3.3
// Checks for originals if available
//
//Version 1.3.2
// Fixed parser issues
//
//Version 1.3
// Recoded everything.
// Does not autocontinue on error, user needs to click again to continue.
// Added neat debug overlay displaying extended information.
// Fixed image.php links interpreted as invalid.
//
//Version 1.2.1
// Fixed meta data for auto updates.
//
//Version 1.2
// Better referral faking.
// Detects all errors and will retry if it can.
// Improved error handling.
// Fixed for filenames with spaces in it.
//
//Version 1.1
// Reduced default delay to 1 second.
// Added proper error handling, will try to continue after a failure.
// Fixed a minor visual glitch.
//

var options = {
	// Delay between page fetches
	delay: 1100,
	// Mouse over the ui stuff to display some internal data
	debug: true,
	// Fetch originals if available (NOTE: DOES NOT WORK PROPERLY YET!)
	originals: false,
};

//------------------------------------------------
// GUI manager

function gui( html, grab, auto )
{
	// Create the HTML
	this.div = document.createElement("div");
	this.div.id = "ehg";
	this.div.innerHTML = html;
	
	// Add style
	GM_addStyle( "#ehg { position:relative; color:#5C0D11; } #ehg a { cursor:pointer; } #ehg p.d { display:none; position:absolute; top:100%; border:2px solid #DFDFDF; background:#F8F8F8; padding:8px; min-width:350px; } #ehg>ul { display:none; }" );
	if ( options.debug ) GM_addStyle( "#ehg:hover p.d { display:block; } #ehg p.d:empty { display:none; }" );
	
	// If auto, will automatically grab links on load
	this.div.querySelector("a").addEventListener( 'click', function(e){ grab.click(); } );
	if ( auto ) grab.click();
}
// Update the progress indicator
gui.prototype.progress = function( desc )
{
	var p = this.div.querySelector(".c");
	p.innerHTML = '';
	
	if ( typeof desc!=="string" )
	{
		if ( desc.page==desc.pagecount )
			this.finished();
		desc = desc.page+" / "+desc.pagecount;
		p.parentNode.title = desc;
	}
	
	p.appendChild( document.createTextNode(desc) );
}
// Adds a found link
gui.prototype.addlink = function( data )
{
	var a = document.createElement("a");
	a.appendChild( document.createTextNode(data.filename) );
	a.href = data.link;
	a.title = (function(s,n){while(s.length<n)s="0"+s;return s;})( ""+data.page, Math.floor(1+Math.log(data.pagecount)/Math.log(10)) );
	var li = document.createElement("li");
	li.appendChild( a );
	var ul = this.div.querySelector("ul");
	ul.appendChild( li );
}
// Output debug information
gui.prototype.debug = function( data )
{
	var s = "";
	for ( var i in data )
	{
		if ( data.hasOwnProperty( i ) )
			s = s+"<b>"+i+"</b>"+": "+data[i]+"<br>";
	}
	var d = this.div.querySelector(".d");
	d.innerHTML = s;
}
// Play finished sound
gui.prototype.finished = function()
{
	var audio = this.div.querySelector("audio");
	if ( audio && options.finished )
	{
		audio.src = options.finished;
		audio.play();
	}
}

//------------------------------------------------
// e-hentai and exhentai grabber

function ehgrabber( gallery )
{
	this.failures = 0;
	// Create the ui
	var html = '<p class="g2"><img src="data:image/gif;base64,R0lGODlhBQAHALMAAK6vr7OztK+urra2tkJCQsDAwEZGRrKyskdHR0FBQUhISP///wAAAAAAAAAAAAAAACH5BAEAAAsALAAAAAAFAAcAAAQUUI1FlREVpbOUSkTgbZ0CUEhBLREAOw%3D%3D"> <a>Image Links (<span class="c">begin</span>)</a><br><span class="s" style="position:relative;left:18px;"></span></p><p class="d"></p><audio></audio><ul></ul>';
	this.gui = new gui( html, this, false );
	// Adjust the page
	var el = document.querySelector("#gd5>.g3");
	el.parentNode.insertBefore( this.gui.div, el );
	document.querySelector("#gright").style.height = "inherit";
}
// Extract information from the page with regex
ehgrabber.prototype.parse = function( html )
{
	var m, re, out = {};
	// Check if we get the error page
	re = /\(Strike (\d+)\)/;
	if ( m = re.exec(html) )
	{
		out.strike = parseInt(m[1]);
	}
	else
	{
		// The next button
		re = /<a [^>]*href="([^"]*)"><img src="[^"]*\/n\.png"/;
		if ( m = re.exec(html) )
		{
			out.next = m[1];
		}
		// The main image link (is always an ip address)
		re = /src="(http\:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}[^"]*)"/;
		if ( m = re.exec(html) )
		{
			out.link = m[1];
			// Fetch the file from the url
			out.linkfile = /([^\/#\?]*)[^\/]*$/.exec(out.link)[1];
			// Fix for image.php
			if ( out.linkfile=="image.php" )
				out.linkfile = /n\=([^\&\=\/]*)/.exec(out.link)[1];
		}
		// Get page numbers
		re = /<span>(\d+)<\/span> \/ <span>(\d+)<\/span>/;
		if ( m = re.exec(html) )
		{
			out.page = parseInt(m[1]);
			out.pagecount = parseInt(m[2]);
			out.pagevalid = ( out.page>0 && out.page<=out.pagecount );
		}
		// File information
		re = /<div>([^<]*?) :: (\d+) x (\d+) :: ([^B]*B)<\/div>/;
		if ( m = re.exec(html) )
		{
			out.filename = m[1];
			out.filesize = m[4];
			out.imgsize = [ parseInt(m[2]), parseInt(m[3]) ];
		}
		// Original image
		re = /<a [^>]*href="([^"]*)"[^>]*>Download original (\d+) x (\d+) ([^B]*B) source<\/a>/;
		if ( options.originals && ( m = re.exec(html) ) )
		{
			out.link = m[1].replace(/\&amp\;/g,'&');
			out.imgsize = [ parseInt(m[2]), parseInt(m[3]) ];
			out.filesize = m[4];
			out.original = true;
		}
	}
	return out;
}
ehgrabber.prototype.process = function( html )
{
	var data = this.parse( html );
	this.gui.debug( data );
	if ( data.next && data.link && data.pagevalid )
	{
		// So we can retry where we left off
		this.current = data.next;
		// Let it know we found a link
		this.gui.addlink( data );
		// Update the gui
		this.gui.progress( data );
		// Fetch next page in some time
		if ( data.page<data.pagecount )
		{
			var self = this;
			this.timer = setTimeout( function(){ self.fetch(data.next); }, options.delay );
		}
	}
	else
	{
		this.error( data );
	}
	// Keep the previous data around
	this.data = data;
}
ehgrabber.prototype.error = function( data )
{
	++this.failures;
	
	// Update the gui with an error message
	var msg;
	if ( !data )
	{
		// Some connection error
		msg = "connection";
	}
	else
	{
		// We were loading new pages too fast...
		if ( data.strike!==undefined ) msg = "strike "+data.strike;
		// Out of bandwidth, can't solve by retry
		else if ( data.linkfile=="509s.gif" ) msg = "bandwidth";
		// Got the forbidden gif
		else if ( data.linkfile=="403.gif" ) msg = "forbidden";
		// The actual filename & filename advertised don't match
		else if ( data.linkfile && data.linkfile!=data.filename ) msg = "mismatch";
		// Parsing failure?
		else msg = "parser";
	}
	this.gui.progress( msg );
	// Fetching is now paused, must click again to continue!
}
ehgrabber.prototype.fetch = function( url )
{
	if ( !url )
	{
		this.error( "gallery" );
		return;
	}

	var self = this;
	// Go fetch some pages
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		headers: {
			'User-Agent': window.navigator.userAgent,
			'Referer': window.location.href,
			'Cookie': document.cookie,
		},
		onload: function(resp){ self.process(resp.responseText); },
		onerror: function(resp){ self.error(); },
	});
}
ehgrabber.prototype.click = function()
{
	if ( this.timer )
		clearTimeout( this.timer ), this.timer = undefined;
	
	// Continue where we left off
	if ( this.current )
	{
		this.fetch( this.current );
	}
	else
	{
		// Find the first linked image on this gallery
		var a = document.querySelector("#gdt>.gdtm a"),
			b = document.querySelector("#gdt>.gdtl a");
		this.fetch( a ? a.href : b ? b.href : null );
	}
}

new ehgrabber( window.location.href );
