
//	Rate all Google AdWords links using SiteTruth rating system.
//	J. Nagle		SiteTruth
//	March, 2008
// 	PRELIMINARY - not for wide distribution.
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SiteTruth AdRater
// @namespace     http://www.sitetruth.com/experimental
// @description   Rate all Google AdWords links using the SiteTruth system. (v0.7)
// @include       http://*
// ==/UserScript==
//
//	SITETRUTH LIBRARIES -- START
//
//	(This will become a library when Greasemonkey gets an "include" capability.)
//
//	Configuration
//
var stsite = "http://www.sitetruth.com";	// base URL of SiteTruth site
var stimagebase = stsite +  "/images/";		// base for image URLs
var stcgibase = stsite + "/cgi-bin/";		// location of CGI programs
var stfcgibase = stsite + "/fcgi/";			// location of FCGI programs
var strateprefix = stfcgibase + "rateapiv1.fcgi";	// begins quick poll-type queries
var kretrysecs = 5;							// retry every 5 seconds
var kmaxretries = 24;						// stop after 2 minutes
var kcachettl = 60*60*24*7;					// Lifetime of cache entries, seconds
var verbose = false;						// extensive logging if true
//
//
//	querySiteTruthServer  --  general query request generator, Greasemonkey mode
//
//	rateitems form is:
//		{ domain : elt, domain : elt ... }
//
//	ratedcallback form is:
//		callbackfn(elt, domain, rating, ratinginfo)
//
//	extrargs form is:
//		{ argname : value, argname : value ...)
//	and adds additional args to the query URL.  The usual value for
//	extraargs is { key: "guest" }
//
//	Use this generic version in all Javascript clients.
//
function querySiteTruthServer(rateitems, ratedcallback, extraargs)
{	return(querySiteTruthServerTry(rateitems, ratedcallback, extraargs, kmaxretries)); }

//	Internal function, with retry countdown
function querySiteTruthServerTry(rateitems, ratedcallback, extraargs, maxretries)
{	querySiteTruthCache(rateitems, ratedcallback);		// handle anything in cache
	var querystring = buildSiteTruthQuery(rateitems, extraargs);
	if (querystring === null) { return; }				// nothing to do
	//	Create callback function - a closure 
	var ratingCallbackClosure = function(response)		// create a closure
	{	ratingCallback(response, rateitems, ratedcallback, extraargs, maxretries-1);	};	// pass data through callback
	//	Make async request of server
	GM_xmlhttpRequest({
    method: 'GET',
    url: querystring,
    headers: {
        'User-agent': 'SiteTruth.com client (free)',
        'Accept': 'text/xml'
    	},
    onload: ratingCallbackClosure,
	onerror: ratingCallbackClosure});
}
//
//	buildSiteTruthQuery  -- build a SiteTruth query url
//
//	Format is:
//		http://www.sitetruth.com/fcgi/rateapiv1.fcgi?url="urla"&url="urlb"&...
//
//	This query URL will query the database, and start a rating if necessary
//	Retry every 5 seconds if status is 202; a rating is in progress.
//
//	Input is an associative array indexed by domain name.
//	Extraargs is an associative array of the form {key: value, ... }
//
function buildSiteTruthQuery(queries, extraargs)
{	var result = strateprefix;									// standard API, v1.
	var nodata = true;											// if no data yet
	for (var domain in queries)									// get all domains in query
	{	if (queries[domain] === null) { continue; }				// skip nulls
		if (nodata)												// if no data yet
		{	result += "?"; nodata = false; }					// first field gets "?"
		else
		{	result += "&"; }									// later fields get "&"
		result += "url=" + encodeURIComponent(domain);			// add next component
	}
	if (nodata) { return(null); }								// return null if no items
	if (extraargs !== null)										// add additional args
	{	for (var key in extraargs)								// add additional fields
		{	result += "&" + encodeURIComponent(key) + "=" + 	// add "key=value" to URI
				encodeURIComponent(extraargs[key]); 
			////GM_log("Key: " + key + "  Value: " + extraargs[key]);	// ***TEMP***
		}
	}
	if (verbose)												// if verbose mode
	{	GM_log("SiteTruth query: " + result);	}				// log queries
	return(result);												// return URL, ready for net
}
//
//	querySiteTruthCache  --  handle any items already in cache.
//
//	Domains in rateitems found in the cache are handled by calling ratedcallback.
//	The entry in rateitems is then changed to "null".
//
function querySiteTruthCache(rateitems, ratedcallback)
{
	for (var domain in rateitems)								// get all domains in query
	{	if (rateitems[domain] === null) { continue; }			// skip nulls
		var cacheresult = searchdomaincache(domain);			// check cache
		if (cacheresult !== null)								// if find
		{	ratedcallback(rateitems[domain], domain, 
						cacheresult[0], cacheresult[1]);		// handle it
			rateitems[domain] = null;							// clear from request
		}
	}
}

//
//	ratingCallback  --  callback after server rating request completion
//
//	Some items may have been rated, some not; we may have to ask again.
//
function ratingCallback(response, rateitems, ratedcallback, extraargs, maxretries)
{
	var status = response.status;								// get response status
	if (status != 200) 									// if trouble
	{	GM_log("SiteTruth query failed: " + status + " (" + response.statusText + ")");
		for (var domain in rateitems)					// for everything we tried to rate
		{	ratedcallback(rateitems[domain], domain, "U","error");	// mark as unknown/error	
		}
		if (status == 403)								// "Forbidden"
		{	var msg1 = 
			"The SiteTruth rating access key (" + extraargs["key"] + 
			") is not valid.\nPlease check for a later version of the browser plug-in you are using.";
			alert(msg1);
		}
		if (status == 410)								// "Gone"
		{	var msg2 = 
			"The SiteTruth API version used is obsolete.\nPlease check for a later version of the browser plug-in you are using.";
			alert(msg2);
		}
		return;											// failed
	}
	//
	if (verbose)
	{	GM_log("SiteTruth reply: " + response.responseText);	}
	//	Create an DOM tree from the returned string (Firefox family specific)
	var replydom = new DOMParser().parseFromString(response.responseText, "application/xml");
  	var ratings = replydom.getElementsByTagName("sitetruth:rating");// get SiteTruth replies
	var needretry = false;										// no retry needed
	if (ratings.length <= 0)									// other browsers
	{	ratings = replydom.getElementsByTagName("rating");	}	// get SiteTruth replies
	for (var i=0; i < ratings.length; i++)						// process ratings
	{	var ratingitem = ratings[i];
		var rating  = ratingitem.getAttribute("rating");		// get rating
		var ratinginfo = ratingitem.getAttribute("ratinginfo");	// get rating info
		var udomain = ratingitem.getAttribute("url");			// get URL
		var stat = ratingitem.getAttribute("status");			// get status
		////GM_log("  domain '" + udomain + "': " + rating + " (" + ratinginfo + ")" + " Status " + stat);	// ***TEMP***
		if (stat == 202)										// if need a retry
		{	needretry = true; }									// so note
		else													// if query concluded
		{	ratedcallback(rateitems[udomain], udomain, rating, ratinginfo);	// label ads
			updatedomaincache(udomain, rating, ratinginfo);		// cache for future use
			rateitems[udomain] = null;							// done with this one
		}
	}
	if (!needretry) { return; }									// return if no retry needed
	if (maxretries <= 0)										// if retry count depleted
	{	for (var domain in rateitems)					// for everything we tried to rate
		{	ratedcallback(rateitems[domain], domain, "U","timeout");// mark as unknown/error	
		}
		return;
	}
	////	GM_log("Retries left: " + maxretries);								// ***TEMP***
	//	Retry any ratings in 202 status after a 5 second delay.
	//	Create a closure for the timer callback
	window.setTimeout(function() 
			{ 	querySiteTruthServerTry(rateitems, ratedcallback, extraargs, maxretries-1); },
				kretrysecs*1000);
}
//
//	nowsecs  --  time now in seconds since epoch, as with UNIX time.
//
//	This ought to be standard.
//
function nowsecs()
	{	var now = new Date();							// current data object
		return(Math.round(now.getTime() / 1000));		// return secs since epoch				
	}
//
//	General purpose cache for Greasemonkey
//
//	Stored in Mozilla preferences.
//
//	Values are a comma-separated list of items.
//
//	Internal fomrmat is:
//	
//		ttl,value
//
//	cachesearch --  look up entry in cache
//
function cachesearch(key)
{
	var val = GM_getValue(key, null);				// get by key
	if (val === null)	{ return(null); }			// no find
	if (val === "")		{ return(null); }			// empty string
	////GM_log("Cache info: " + val);					// ***TEMP***
	var vals = val.split(",");						// split into two fields at first comma
	if (vals[0] < nowsecs())						// if expired
	{	return(null); }								// return null
	else 											// not expired
	{	return(vals.slice(1));	}					// return value without TTL
}
//
//	cachedupdate  --  update entry in cache
//
function cacheupdate(key, value, ttlsecs)
{
	var val = (nowsecs() + ttlsecs).toString() + "," + value.toString();	// expiry, value
	////GM_log("Cache update: " + val);						// ***TEMP***
	GM_setValue(key, val);								// set as value
}
//
//	Use of cache for SiteTruth rating
//
function updatedomaincache(domain, rating, ratinginfo)
{	cacheupdate(domain, (rating + ","+ ratinginfo), kcachettl);	}	// update cache
//
//	checkdomaincache  --  check in cache.
//
//	Returns (rating, ratinginfo) or null.
//
function searchdomaincache(domain)
{	return(cachesearch(domain));					// return rating, ratinginfo
}
//
//	SITETRUTH LIBRARIES -- END
//

//	LIBRARIES  --  make external once Greasemonkey 0.8, with "@require", is available.
/** 
* @projectDescription 	Poly9's polyvalent URLParser class
*
* @author	Denis Laprise - denis@poly9.com - http://poly9.com
* @version	0.1 
* @namespace	Poly9
*
* Usage: var p = new Poly9.URLParser('http://user:password@poly9.com/pathname?arguments=1#fragment');
* p.getHost() == 'poly9.com';
* p.getProtocol() == 'http';
* p.getPathname() == '/pathname';
* p.getQuerystring() == 'arguments=1';
* p.getFragment() == 'fragment';
* p.getUsername() == 'user';
* p.getPassword() == 'password';
*
* See the unit test file for more examples.
* URLParser is freely distributable under the terms of an MIT-style license.
*/

if (typeof Poly9 == 'undefined')
 var Poly9 = {};

/**
 * Creates an URLParser instance
 *
 * @classDescription	Creates an URLParser instance
 * @return {Object}	return an URLParser object
 * @param {String} url	The url to parse
 * @constructor
 * @exception {String}  Throws an exception if the specified url is invalid
 */
Poly9.URLParser = function(url) {
 this._fields = {'Username' : 4, 'Password' : 5, 'Port' : 7, 'Protocol' : 2, 'Host' : 6, 'Pathname' : 8, 'URL' : 0, 'Querystring' : 9, 'Fragment' : 10};
 this._values = {};
 this._regex = null;
 this.version = 0.1;
 this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
 for(var f in this._fields)
  this['get' + f] = this._makeGetter(f);
 if (typeof url != 'undefined')
  this._parse(url);
}
 
/**
 * @method 
 * @param {String} url	The url to parse
 * @exception {String} 	Throws an exception if the specified url is invalid
 */
Poly9.URLParser.prototype.setURL = function(url) {
  this._parse(url);
}

Poly9.URLParser.prototype._initValues = function() {
   for(var f in this._fields)
   this._values[f] = '';
}

Poly9.URLParser.prototype._parse = function(url) {
  this._initValues();
  var r = this._regex.exec(url);
  if (!r) throw Error("DPURLParser::_parse -> Invalid URL")
  for(var f in this._fields) if (typeof r[this._fields[f]] != 'undefined')
   this._values[f] = r[this._fields[f]];
}

Poly9.URLParser.prototype._makeGetter = function(field) {
 return function() {
  return this._values[field];
 }
}
//
//	END EXTERNAL LIBRARIES
//
//	SITETRUTH LIBRARIES
//
//
//	Configuration
//
var stkey = "adrater";						// key for SiteTruth site access
var kmaxatags = 1000;						// after this many links, stop.  Slows page loads
////verbose = true;							// extensive logging if true


//
//	basedomain  -- get base domain from full domain
//
//	foo.xyz.com => xyz.com
//	foo.co.uk => foo.co.uk
//
//	This should perform the same function as our miscutils.basedomain in Python.
//
function basedomain(domain) 
{
	domain = domain.toLowerCase()				// force lower case
	parts = domain.split(".")					// split on "." 
	//	If first part is "www", drop it.
	if (parts.length > 2 && parts[0] == "www")	// if at least three parts
	{	parts.shift();	}						// remove head item
	if (parts.length > 1)						// if at least two parts
	{	//	If TLD has two letters, assume country code, take three parts
		tld = parts[parts.length-1];			// get TLD
		keepparts = 2;							// keep two parts
		if (tld.length < 3)						// if country code TLD
		{	keepparts = 3;	}					// keep 3 parts (example "foo.co.uk")
		//	Truncate to desired number of parts
		while (parts.length > keepparts) 		// if too long, shorten
		{	parts.shift();	}
	}
	s = parts.join(".")							// join parts
	return(s)
}

//
//	addGlobalStyle  --  GreaseMonkey recommended approach
//
function addGlobalStyle(doc, css) {
    var head, style;
    head = doc.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = doc.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//
//	findqueryfield --  find query field in a URL
//
//	Input is a string and an object of desired keywords.  The first find is returned.
//
function findqueryfield(querystring, keys)
{	
	////GM_log("  Query string: " + querystring);				// ***TEMP***
	if (!querystring || querystring === '') 				// if no query string, done
	{	return(null);	}
	var queryitems = querystring.split('&');				// break at '&'
	for (var i=0; i < queryitems.length; i++)				// for all query items
	{	var item = queryitems[i];							// "name=value" form
		var keyval = item.split('=',2);						// split into name/value
		if (keyval.length < 2)								// if no split
		{	continue;	}									// skip this field
		key = keyval[0].toLowerCase();						// key always LC
		val = keyval[1];									// value is either
		////GM_log("  Key: " + key + "  Value: " + val);		// ***TEMP***
		if (key in keys)									// if find with any matching key
		{	return(val);	}								// return value		
	}
	return(null);											// no find
}

//
//	insertAround  --  encloses elt with a new elt
//
function insertAround(elt, newelt) 
{
	var parent = elt.parentNode;							// get parent
	parent.replaceChild(newelt, elt);						// new replaces old
	newelt.appendChild(elt);								// old becomes child
}

//	LOCAL FUNCTIONS

//
//	containsblockelt -- returns true if elt contains any block-type elt.
//
//	It ought to be sufficient to check the computed style of the elt,
//	but it's possible to have an A tag with display of "inline" 
//	enclosing a DIV.
//
//	This makes getblockelt O(N^2), which is not good.  But for Google ads, so far
//	N is very small.
//
//	There ought to be an easier way to do this.
//
function containsblockelt(elt)
{	if (elt === null) return(false);					// nulls have no properties
	if (elt.nodeType != 1) { return(false); }			// must be ELEMENT_NODE
	var computedstyle = document.defaultView.getComputedStyle(elt, null);	// get style
	var displaystyle = computedstyle.getPropertyValue("display");	// get display attr
	if (displaystyle != "inline") {	return(true);	}	// found a non-inline elt
	if (elt.childNodes === null) { return(false); }		// no children
	for (var i=0; i < elt.childNodes.length; i++)		// for all children
	{	if (containsblockelt(elt.childNodes[i])) { return(true); }	// recurse down tree
	}
	return(false);										// found no block elt
}
//
//	getblockelt --  move outward to first block-type elt surrounding an inline elt
//
function getblockelt(elt)
{	while (true)
	{	if (elt === null) { return(null); }				// fails
		if (containsblockelt(elt)) { break; }			// quit if not inline
		elt = elt.parentNode;							// move out one level
	}
	return(elt);										// return found elt
}
//
//	labeladlinks  --  label array of ad link with SiteTruth markings
//
function labeladlinks(elts, domain, rating, ratinginfo)
{
	if (elts === null) { return; }							// ignore if null
	for (var i = 0; i < elts.length; i++)					// for entire array
	{	labeladlink(elts[i], domain, rating, ratinginfo);	}	// do it
}
//
//	isstratingelt  --  true if this is an element we inserted
//
function isstratingelt(elt)
{	if (elt === null) { return(false); }							// no elt, no
	if (elt.nodeName.toLowerCase() != "div") { return(false); }	// not span, no
	if (elt.getAttribute("class") === null)  { return(false); }		// no class, no
	if (!elt.getAttribute("class").match(/^strating/))  { return(false); }	// not ours, no
	return(true);									// this is one of our inserted elts
}
//
//	Table of rating icon links and alt text.
//
var stratingiconlinks = {
		"A" : stimagebase + "symbolgreen.gif",
		"Q" : stimagebase + "symbolyellow.gif",
		"X"	: stimagebase + "symbolred.gif",
		"U" : stimagebase + "symbolclear.gif",
		"W" : stimagebase + "symbolwait.gif"}
		
var stratingalttext = {
		"A" : "Site ownership and business identity verified. No significant issues found.",
		"Q" : "Site ownership identified but not verified.",
		"X"	: "Site ownership unknown or questionable.",
		"U" : "No information available.",
		"W" : "Rating..."}

var stdetailslink = stcgibase + "ratingdetails.cgi?format=popup&url="	// begin details link
//
//	updateadlabel --  update our label on an ad
//
//	Updates icon and links.  Structure has already been constructed
//
function updateadlabel(elt, domain, rating, ratinginfo)
{
	var cssclass = "strating" + rating.toLowerCase();// construct CSS class name
	////elt.setAttribute("class",cssclass);			// set class
	//	***MORE*** this is a temporary old version
	var imglink = stratingiconlinks[rating];		// get appropriate rating icon
	var alttext = stratingalttext[rating];			// get alt text
	if (imglink === null)							// if no link
	{	imglink = stratingiconlinks["U"];			// errors yield U, the grey circle
		alttext = "ERROR - no rating";
	}
	var detailslink = stdetailslink + encodeURIComponent(domain);	// build link URL
	var divs = elt.getElementsByTagName("div");		// get inner DIV elts
	for (var i=0; i < divs.length; i++)
	{	var layerdiv = divs[i];
		if (layerdiv.className == "sticonlayer")	// if our DIV
		{	var aelt = layerdiv.firstChild;			// get A elt below it
			var imgelt = aelt.firstChild;			// get IMG elt below that
			aelt.href = detailslink;				// set details link
			imgelt.src = imglink;					// set image link
			imgelt.alt = alttext;					// set alt text
			break;									// done
		}
	}
}
//
//	labeladlink  --  label one ad link with SiteTruth markings
//
function labeladlink(elt, domain, rating, ratinginfo)
{
	if (verbose)									// debug
	{	GM_log("Label ad link " + elt.nodeName + " for " + domain);
	}
	var enclosingelt = getblockelt(elt);			// get enclosing elt, to mark
	////var enclosingelt = elt;							// just label the A tag
	if (enclosingelt === null)						// no enclosing elt, unexpected
	{	GM_log("No enclosing element for ad domain " + domain);	// should not happen
		return;
	}
	if (verbose)
	{	GM_log("Enclosing elt: " + enclosingelt.nodeName + " for " + domain);	
	}
	var cssclass = "strating" + rating.toLowerCase();// construct CSS class name
	//	We have found the next outer enclosing block elt.
	//	Create a DIV under it which contains all its existing children,
	//	unless we have already done that.
	//	Either the enclosing elt or its first child will be our elt if already
	//	created.
	if (isstratingelt(enclosingelt))					// if already have our elt
	{	updateadlabel(enclosingelt, domain, rating, ratinginfo); }	// change class of our tag
	else if (isstratingelt(enclosingelt.firstChild))	// if first child is ours
	{	updateadlabel(enclosingelt.firstChild, domain, rating, ratinginfo); }	// change tag
	else if (isstratingelt(enclosingelt.parentNode))
	{	updateadlabel(enclosingelt.parentNode, domain, rating, ratinginfo); }	// change tag
	else												// must create it
	{	var div = enclosingelt.ownerDocument.createElement("div");// create enclosing DIV
		div.setAttribute("class","strating");					// class for enclosing DIV
		//	We now have a DIV tag to put around the advertisment.  
		//	SiteTruth information can be attached to that DIV.
		//	We create the structure
		//		DIV	class="strating"
		//			DIV	class="sticonlayer"
		//				A	link to details page
		//					IMG	rating icon
		//	Then updateadlabel plugs in the link, alt text, and rating icon links.
		//
		////GM_log("Inserting DIV element for  " + domain);// ***TEMP***
		var layerdiv = div.ownerDocument.createElement("div");
		layerdiv.setAttribute("class","sticonlayer");		// set class
		var aelt = div.ownerDocument.createElement("a");	// filled in by updatelabel
		aelt.setAttribute("sitetruth_inserted", "t");		// avoid rating our own rating
		aelt.target = "_blank";								// open in new document
		var imgelt = div.ownerDocument.createElement("img");// filled in by updatelabel
		imgelt.align = "right";								// image at right
		imgelt.border = "0";								// no image border
		div.appendChild(layerdiv);							// build structure
		layerdiv.appendChild(aelt);
		aelt.appendChild(imgelt);
		//	If the enclosing tag is an A tag in block mode, we wrap our DIV
		//	tag around the A tag.
		var putaround = (enclosingelt.nodeName.toLowerCase() == 'a');	// if A tag
		if (putaround) 
		{	insertAround(enclosingelt, div);	}			// insert DIV around A
		else 												// otherwise
		{	var children = enclosingelt.childNodes;			// get the array of children
			////GM_log("Element before mod child count: " + enclosingelt.childNodes.length);
			var ourchildren = new Array();					// copy of nodes during alteration
			var i;
			for (i=0; i < children.length; i++)				// copy list
			{	ourchildren.push(children[i]);	}			// that we will be changing
			for (i=0; i < ourchildren.length; i++)			// for ell existing nodes
			{	div.appendChild(ourchildren[i]);			// move children under our DIV
				////GM_log("Put " + ourchildren[i].nodeName + " under SPAN");	// ***TEMP***
			}
			enclosingelt.appendChild(div);					// add DIV below elt.
		}
		updateadlabel(div, domain, rating, ratinginfo); // add rating info
		////GM_log("Element after mod child count: " + elt.childNodes.length);	// ***TEMP***
	}
}

//
//	doadlinktarget  --  have link elt, have found target url
//
function doadlinktarget(elt, targeturl)
{
	try 
	{
		var parsedurl = new Poly9.URLParser(targeturl);			// break apart URL
		var domain = parsedurl.getHost().toLowerCase();			// get the domain
		var basedom = basedomain(domain);						// get base domain
		if (verbose)
		{	GM_log("Ad domain: " + basedom + "  Ad URL: " + targeturl);	}
		return({elt: elt, domain: domain});						// return domain to rate
	} catch(e) {
		GM_log("Unparseable ad URL (" + e + "): " + targeturl);	// long wierd URLs
	}
	return(null);												// failed, nothing to rate
}

//
//	dogooglesyndicationlink  --  do a Google ad link
//
function dogooglesyndicationlink(elt, domain, url, urlquery)
{	//	Look for fields indicating Google ad link targets.  Use lowercase field names here.
	var targeturl = findqueryfield(urlquery, {"adurl":0, "q":0, "adu":0 });	// find ad site
	if (targeturl)										// if find
	{	return(doadlinktarget(elt, decodeURIComponent(targeturl)));	}	// pass to ad handler
	//	Check for Google "redir" URL.  Ignore.
	var redirfield = findqueryfield(urlquery, {"redir_url" : 0});	// get redir type URL
	if (redirfield)										// if find
	{	return(null);									// Google advertising itself
	}
	GM_log("Expected fields not found in Google ad URL: " + url); 
	return(null);										// nothing to rate
}
//
//	Table of handlers for different advertising domains
//
var adlinkdomains = {
	"googlesyndication.com" : dogooglesyndicationlink		// Google AdWords main
};
//
//	dolinkurl --  handle a url found in an element
//
function dolinkurl(elt, url)
{
	try {
		////GM_log("Node: " + elt.nodeName + "  URL: " + url.toString());		// ***TEMP***
		if ((url === undefined) || (url === null) || (url.length < 1) || 
			(url[0] == "/") || (url[0] == '#'))					// if not a good URL
		{	return(null);	}									// can't be ad
		var parsedurl = new Poly9.URLParser(url);
		var domain = parsedurl.getHost().toLowerCase();			// get the domain
		var basedom = basedomain(domain);						// get base domain
		////GM_log("Node: " + elt.nodeName + " Base domain: " + basedom);    // log the href
		//	Look for an ad URL of a known type
		handler = adlinkdomains[basedom];						// look up handler
		if (handler)											// if handler for this domain
		{	////GM_log("Calling ad handler");						// ***TEMP***
			//	Call appropriate handler for this domain
			var hreply = handler(elt, domain, url, parsedurl.getQuerystring());	
			if (hreply) { return(hreply); }						// success
			GM_log("Unrecognized " + basedom + " URL: " + url);	// log rejected URLs
			
		}
	} catch(e) {
		GM_log("Unparseable URL (" + e + "): " + url);			// long wierd URLs
	}
	return(null);												// nothing to rate
}
//
//	dolink --  handle a link (A) element
//
function dolink(elt)
{
	if (elt.href === null || elt.href === undefined)				// avoid undefs
	{	return(null);	}
	var url = decodeURI(elt.href);									// unescape
	return (dolinkurl(elt, url));									// do link target
}
//
//	geturlbase  --  get base url of document
//
function geturlbase(doc)
{	var urlbase = null;											// no URL base yet
	var allbasetags = doc.getElementsByTagName("base");			// get BASE elt
	if (allbasetags.length > 0)									// if have BASE tag
	{	urlbase = allbasetags[0].getAttribute("href");			// get HREF param
	}
	if (urlbase === null)										// if no BASE tag
	{	var parsedurl = new Poly9.URLParser(doc.URL);			// break apart URL
		urlbase = parsedurl.getProtocol() + "://" + 			// build up base URL
			parsedurl.getHost() + parsedurl.getPathname();							
	}
	return(urlbase)
}
//
//	findratingitems  --  processing for one document, recursive
//
function findrateitems(doc, rateitems)
{	if (doc === null) { return; }								// avoid empty
	if (doc.nodeName != "#document")							// must be a document
	{	GM_log("IFRAME was not parent of document, but of " + doc.nodeName);
		return;													// does nothing
	}
	////GM_log("Starting subdocument");		// ***TEMP***
	//	Find all A tags with a link.
	var allatags = doc.getElementsByTagName("a");				// get links
	//	Examine all links; find which ones need rating.
	//	Builds an associative array indexed by domain of arrays of DOM elements.
	var found = false;											// found anything?
	var i;														// for all loops
	for (i = 0; i < allatags.length; i++)						// for all A tags
	{	if (i >= kmaxatags) { break; }							// stop on huge link lists
		var elt = allatags[i];									// A tag to check
		if (elt.getAttribute("sitetruth_checked") == "t")		// if already done
		{	continue;	}										// skip this one
		if (elt.getAttribute("sitetruth_inserted") == "t")		// if one of ours
		{	continue;	}										// skip this one
		elt.setAttribute("sitetruth_checked", "t");					// note as done
		var rateitem = dolink(elt);								// handle A tag
		if (rateitem !== null) 									// if something to rate
		{	if (!(rateitem.domain in rateitems))				// if domain not listed
			{	rateitems[rateitem.domain] = new Array();	}	// give it an array of elts
			////GM_log("Rating needed: " + rateitem.domain);		// ***TEMP***
			rateitems[rateitem.domain].push(elt); 				// add to to-do list
			found = true;
		}
	}
	if (found)													// if found a link
	{	loadcss(doc);	}										// doc needs our CSS
}
//
//	startratings  --  start the rating process after page load
//
function startratings(doc)
{	var urlbase = geturlbase(doc);						// get base URL
	if (verbose) { GM_log("Starting " + urlbase);	}	// debug
	var contenttype = doc.contentType;					// get document content type
	if (!contenttype.match(/html/)) { return; }			// must be HTML or XHTML
	updateonchange()									// note later updates
	var rateitems = {};									// our to-do list
	////GM_log("Start search for ads");						// ***TEMP***
	findrateitems(doc, rateitems);						// scan all docs for items
	for (var domain in rateitems)						// for all domains
	{	labeladlinks(rateitems[domain], domain, "W", "Rating..."); }// mark as in progress
	querySiteTruthServer(rateitems, labeladlinks, {key: stkey});	// start query 
	if (verbose) { GM_log("Ending " + urlbase); }		
}
//
//	updateonchange  --  notice new ads inserted, handle them.
//
function updateonchange()
{
  document.addEventListener("DOMNodeInserted", nodechanged, false);
  ////document.addEventListener("DOMSubtreeModified", subtreemodified, false);
  document.addEventListener("DOMAttrModified", attrmodified, false);
}
//
//	nodechanged  -- note that node was inserted or changed
//
//	When a whole subtree is being built, we only get some of the events.
//	All we can really do here is notice when a document has been updated
//	and schedule it for reprocessing
//
var changetimeout = null;								// current change timeout if any
var kchangetimeoutsecs = 2;								// run 2 secs after idle
function nodechanged(eventObject)
{	////var elt = eventObject.currentTarget;				// get updated document
	////GM_log("Change to node  " + elt); 					// ***TEMP***
	if (changetimeout)
	{	////GM_log("Cancelling old timeout: " + changetimeout);// ***TEMP***
		clearTimeout(changetimeout);						// clear old timeout
	}
	//	Schedule a retry 
	changetimeout = window.setTimeout(
		function() { 	startratings(document) },
		kchangetimeoutsecs*1000);
	////GM_log("Setting new change timeout: " + changetimeout);
}


//
//	attrmodified --  an attributeh has been modified.
//
//	If this is an A node and the href has changed, we need to
//	do something about it.
//
//	This is called far too often.  
//	In fact, it really isn't necessary, because, while Google does change
//	ad link URLs, they still point to the same advertiser.  So this should
//	check that the ad target is the same.  Or at least just reprocess the ad,
//	not the whole document.
//
function attrmodified(eventObject)
{
	var elt = eventObject.target;						// the element
	var attrName = eventObject.attrName;				// name of attr changed
	var newValue = eventObject.newValue;				// new value of attr
	if (elt === null) { return; }						// no elt
	if (attrName == "sitetruth_checked") { return; }	// don't act on our own changes
	if (elt.nodeName != "A") { return; }				// not A tag, skip
	if (elt.getAttribute("sitetruth_inserted") == "t") { return; }	// one of our own 
	if (verbose)										// see what changed
	{	var relatedNode = eventObject.relatedNode;		// related node
		var prevValue = eventObject.prevValue;
		GM_log("Change " + elt.nodeName + " " + attrName + '="' + newValue + '" (was "' + prevValue + '")');
	}
	if (attrName != "href") { return; }						// not HREF change, skip
	////if (dolinkurl(elt, newValue) !== null)					// if an ad link
	{	if (verbose)
		{	GM_log("Ad link changed to: " + eventObject.newValue);
		}
		elt.setAttribute("sitetruth_checked", "f");			// note as not done
		nodechanged(eventObject);							// schedule reprocessing
	}
}


//
//	Add global CSS definitions used to express ratings
//
//	sticonlayer -- the clickable icon with our rating goes in a higher layer.
var sticonlayer = ".sticonlayer { \
	position: absolute; \
	opacity: .6; \
	width: 100%; \
	height: 25px; \
	top: 50%; \
	margin-top: -12px; \
	z-index: 3; \
}";
var strating = ".strating { \
	position: relative; \
}";
//
//	loadcss -- Load in CSS definitions
//
function loadcss(doc) 
{	addGlobalStyle(doc, sticonlayer);							
	addGlobalStyle(doc, strating);							
}
//
//	Main program, for now.
//
//	Run ratings after page is fully built.
window.addEventListener(
    'load', 
    function() { startratings(document) },
    true);
////verbose = true;			// ***TEMP***


