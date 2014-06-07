// ==UserScript==
// @name          IMDb Links in Rogers Video Direct
// @namespace     http://stephen-cross.blogspot.com/
// @description	  Adds IMDb search links to Rogers Video Direct pages
// @include       http://www.rogersvideodirect.ca/Browse/title.aspx*
// ==/UserScript==

/**
 ** DESCRIPTION
 **
 ** This script adds a link to IMDb from a Movie Page in Rogers Video Direct
 ** http://rogersvideodirect.ca
 **
 ** This script is based on the 13-May-2006 version of the "IMDb Links in Netflix"
 ** script from http://www.j-san.net/files/imdblinksinnetflix.user.js
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **/

/**
 ** LICENSE
 **
 ** Copyright (c) 2007, Stephen Cross
 ** All rights reserved.
 ** 
 ** Redistribution and use in source and binary forms, with or without modification, 
 ** are permitted provided that the following conditions are met:
 **
 **    * Redistributions of source code must retain the above copyright notice, 
 **      this list of conditions and the following disclaimer.
 **    * Redistributions in binary form must reproduce the above copyright notice, 
 **      this list of conditions and the following disclaimer in the documentation 
 **      and/or other materials provided with the distribution.
 **    * Neither the name of the author nor the names of its contributors 
 **      may be used to endorse or promote products derived from this software 
 **      without specific prior written permission.
 **
 ** THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
 ** ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
 ** WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
 ** IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
 ** INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
 ** BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 ** OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
 ** WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 ** ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 ** POSSIBILITY OF SUCH DAMAGE.
 **/

/**
 ** CHANGE LOG
 **
 ** 29-Jan-2007   v1.0   Stephen Cross   Initial Version
 **/

(function()
{
	// get the Movie Title from the current Rogers Video Direct page
	function getMovieTitle() {
		// get the movie title from the page title in the HEAD section and
		// remove the first 22 characters "Rogers Video Direct - "
		var movietitle = document.title.slice(22);
		return movietitle;
	}

	// construct the IMDb search url using the movie title
	function makeIMDbUrl(movietitle) {
		var imdburl = 'http://www.imdb.com/find?q='+ movietitle +';tt=on;nm=on;mx=20;';
		return imdburl;
	}

	// create a table row with the link, and set the style
	function makeIMDbLink(movietitle) {
		var container = document.createElement("tr");
		container.innerHTML = '<a href="'+ makeIMDbUrl(movietitle) +' " target="IMDb">Find on IMDb</a>';
		container.setAttribute('style', 'text-transform:none;font-weight:normal;');
		return container;
	}

	// insert the new link into the document
	function insertIMDbLinks() {
		var title = getMovieTitle();
		var container = makeIMDbLink(title);
		// place the IMDb link just before the 'Rent' icon
		var target = document.getElementById('btnRent');
		target.parentNode.insertBefore(container, target);
	}

	insertIMDbLinks();
})();


