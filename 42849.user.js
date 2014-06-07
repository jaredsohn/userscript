scr_meta=<><![CDATA[ // For Autoupdate script : http://userscripts.org/scripts/show/38017
// ==UserScript==
// @name          Better FreeCause Results Page
// @namespace     http://userscripts.org/users/81476
// @description   Adds a 'Try Google' button, opens links in new window, highlights Sponsored results. Script will prompt you if new version is available.
// @version       2.0.1
// @include       http://search.freecause.com/*
// ==/UserScript==
]]></>.toString();

//***********************************************
//*           User Configurable Data            *
//*---------------------------------------------*

var GoogleDomain = 'com';
	// Can be set to one of the local domains used by Google.
	// For exemple, to use the Canadian Google, set it to 'ca'; for the United Kingdom, set it to 'co.uk'.
	// Find your local Google Website : http://hubpages.com/hub/Googles-Vast-Domain

var NewWindow = false;
	// Set to true to open the links in a new tab/window.

var SponsoredStyle = 'background-color:#f0f7f9';
	// You can change the inline style used to highlight the sponsored results. 

//*---------------------------------------------*
//*       End of User Configurable Data         *
//***********************************************



// Helper function
// ===============

function getElementsByClass( searchClass, tagName, domNode) {
	// from http://www.anyexample.com/webdev/javascript/javascript_getelementsbyclass_function.xml
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}


// Add a "Try Google" button
// =========================

// Make sure we find the search form...
var formObj = document.forms.namedItem('s');
if (formObj) {
	// ...and the Search button.
	var target = formObj.elements.item(4);
	if (target) {
		// Determine type of search and build corresponding Google search.
		var reImg = new RegExp("m=images");
		var reVid = new RegExp("m=video");
		var reNws = new RegExp("m=news");
		if ( reImg.test(location) )
			var gURL = 'http://images.google.' + GoogleDomain + '/images';
		else if ( reVid.test(location) )
			var gURL = 'http://video.google.' + GoogleDomain + '/videosearch';
		else if ( reNws.test(location) )
			var gURL = 'http://news.google.' + GoogleDomain + '/news';
		else
			var gURL = 'http://www.google.' + GoogleDomain + '/search';
		// Create and add 'Try Google' button.
		// Code inspired by http://userscripts.org/scripts/review/42765
		var button = document.createElement('input');
		button.setAttribute('type', 'button');
		button.setAttribute('value', 'Try Google');
		button.setAttribute('style', 'margin-left:0.25em');
		button.setAttribute('onclick', 'window.open("' + gURL + '?q=' + escape(formObj.elements.namedItem('p').getAttribute('value')) + '");return false;');
		target.parentNode.insertBefore(button, target.nextSibling);
		}
	}


// Open links in a new window (or tab)
// ===================================
// Code inspired by http://developer.ning.com/forum/topic/show?id=1185512%3ATopic%3A3389

if ( NewWindow ) {
	var myLinks = document.getElementsByTagName('a');
	for (x in myLinks)
		if(myLinks[x].href != null)
			if((myLinks[x].href.match('/?rm=click')))
				myLinks[x].target = '_blank';
	}


// Highlights the Sponsored results
// ================================

// Main content.
var theResultsInfo = getElementsByClass('ssboxh');
var theResults = getElementsByClass('results');
for (x in theResultsInfo)
	if (theResultsInfo[x].innerHTML.match('sponsored results for')) {
		theResultsInfo[x].setAttribute('style', SponsoredStyle);
		theResults[x].setAttribute('style', SponsoredStyle);
		}
// Right column.
theResults = document.getElementById('ssright');
if (theResults) theResults.setAttribute('style', SponsoredStyle);


// Autoupdate Script
// =================
// from : http://userscripts.org/scripts/show/38017

aaus_38017={i:'42849',d:7,n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_38017.ch();