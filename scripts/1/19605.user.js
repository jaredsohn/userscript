// ==UserScript==
// @name           newsnow.co.uk filter
// @namespace      dubblebubble.co.uk
// @description    Filter out sites from newsnow.co.uk results
// @include        http://www.newsnow.co.uk/*
// @include        http://nnv4.newsnow.co.uk/*
// ==/UserScript==

// Filters out newsnow.co.uk links based on a regular expression. works on both 
// the normal newsnow site and the new beta version (as of 08Jan2008)
// Any valid regular expression is possible. See 
// http://www.w3schools.com/jsref/jsref_obj_regexp.asp for more details.
// Typically you will only want the "|" (or) operator. Also be warned that the 
// use of parentheses (backreference) must be escaped, for example the name 
// "Talking Soccer (Weblog)" must be entered as Talking Soccer \(Weblog\)".
// The regular expression modifier can also be specified, ie "i" would give
// a case insensitive search.
// The regular expression is stored in the Firefox configuration preferences 
// To update this value enter about:config in your browser and filter
// on greasemonkey.scriptvals.dubblebubble.co.uk. Double click on the 
// value and change to reflect your own preference

// default filter. These are just a couple of football sites I don't particular 
// rate very highly but occur quite regularly. sorry fellas 
var default_filter = 'TribalFootball|TEAMtalk|Fans FC|Sportal NZ|Pink Football';
var default_modifier = '';

// get the stored values and use those in preference
// if the values have been created then reset manually then this will cause a 
// problem until http://greasemonkey.devjavu.com/ticket/11 is shipped
// workround is to manually reset the value for 
// greasemonkey.scriptvals.dubblebubble.co.uk/newsnowfilter.initialised 
// back to an empty string and the defaults will be put back. again use
// about:config for this 
var initialised = GM_getValue('initialised');

if (initialised === undefined || initialised === null || initialised == '') {
	// write the default values to config as initial values
	GM_setValue('filter', default_filter);
	GM_setValue('modifier', default_modifier);
	GM_setValue('initialised', Date());
}

var filter = GM_getValue('filter', default_filter);
var modifier = GM_getValue('modifier', default_modifier);

// convert string to a regular expression 
var regexp=new RegExp(filter, modifier);

// newsnow items are as follows 
// old site
// <p><img src="/flags/FGB.gif"><a href="/cgi/NGoto/251062066?-11179" target="_blank" onClick="return wopen(this)">Defiant Defoe rules out Manchester United move</a>&nbsp;<span class="src">Fans FC&nbsp;20&#58;39</span></p>
// beta site
// <p><img src="/flags/FGB.gif"/><a href="/cgi/NGoto/251062066sp?-11179" target="_blank" onclick="return wopen(this)">Defiant Defoe rules out Manchester United move</a><span class="src">Fans FC&nbsp;20:39</span></p>
//
// so look through all spans, filter those by class name 'src' and check 
// whether the innerHTML matches our regular expression. if it does make it
// disappear 

var list = document.getElementsByTagName('span');

for (i=0; i<list.length; i++) {
	if (list[i].innerHTML.match(regexp) !== null &&
		  list[i].className == 'src') { 
			list[i].parentNode.style.display = 'none';
		} 
	}
