// ==UserScript==
// @name           Google ReBar
// @namespace      http://rebar.william-rawls.info
// @description    Shows Google Products/Video/Groups links in the top left bar between "Gmail" and "more". Should handle most if not all Google pages. Additionally adds eBay and Amazon search buttons.
// @include        http://*.google.com/*
// @include        http://*.igoogle.com/*
// @exclude        http://mail.google.com/*
// @exclude        https://mail.google.com/*
// @exclude        http://docs.google.com/*
// @exclude        https://docs.google.com/*
// @exclude        http://voice.google.com/*
// @exclude        https://voice.google.com/*
// ==/UserScript==

//
// Author:   william.rawls@gmail.com
// About me: william-rawls.info
//
var version = '1.19';  // More to come soon. check back.
//
// 1.19
//  Added imeem (bipolar+) searching imeem music
//  Added Styles (bipolar+) searching Stylish's userstyles (thanks to LL25255252)
//  Added AMO (bipolar+) searching addons.mozilla.org (thanks again to LL25255252)
//  Excluded docs.google.com (thanks again to LL25255252... what kind of username is that ;)
//  Excluded voice.google.com 
//  Changed namespace to rebar.william-rawls.info
//  Updated my info
//  (re)Added Google voice link (Crazy+)
//  Google Voice, Google Groups, Google Blogs, and Google Code only appear 
//    if crazy+ or if google only
//  Moved YouTube next to Videos where it belonged
//  Made 'code' related stuff bipolar+
//  Rearranged a couple tags
//  Renamed imDB to Movies
//
// 1.18
//	Got lost in the shuffle somehow. 1.19 reapplies the 1.18 changes
//
// 1.17
//	Fix to work with firefox's new version
//
// 1.16
//	Fix to work with google's new code
//
// 1.15
//	Tested with FireFox 3 release (yay!)
//
// 1.13
//	Added the removeGoogleLInk() function.
//  Removes the word "Web" from the gbar when it's not a link. (Crazy mode+)
//  Added commented out examples for removing google links
//
// 1.12
//	Clicking the word 'Rebar' in the options dialog takes you to 
//	 the ReBar script page on userscripts.org
//	Fixed namespace. NOTE This will require you to uninstall other version of 
//	 Google ReBar. My apologies. I didn't realize this would have this effect.
// 1.11
//	Added user interface for setting up options. 
//	NOTE: Click the new circled plus sign in the upper left corner of the 
//	  Google page to access the options.
//	Fixed an issue where links wouldn't click if debug mode was off (DOH!)
//
// 1.10
//	Added
//		Link: imDB (crazy+)
//		grNav() function - whenever a click occurs it occurs through here now to facilitate better link handling,
//			especially when the query is empty (userscripts.org for instance).
//			<a> tags are now DOM constructed allowing proper callback into the sandbox.
//		defaultSearchTerms - when a link is clicked and there no search terms entered, defaultSearchTerms will be used.
//		GM_getValue support for all the settings
//		GM_log support (basically set debugLevel = 5 and open the javascript console)
//		The customUrl parameter on the addCustomeUrl method now supports javascript: and will allow urls to optionally include http:
//			this facilitates including items that you may want to custom code or to use https with
//		linkTarget - Set to have links open in new windows (_blank by default)
//		ScriptletStyle - A new style for links that execute javascript.
//
//	Changes
//		[SearchTerms] to [Query] to make it shorter
//		onFailUrl to onFailParams to accept far less information or full url template
//		dontGoCrazy to Craziness to facilitate new levels of crazyness.
//			0 queit
//			3 tame    the default
//			4 crazy   currently supported
//			6 bipolar (before you start,i'm bipolar so it's cool, probably what got me going anyway :)
//			8 insane
//			9 omg
//		  This sets the stage for changing modes on the fly. skipped values are for future use
//
//	Fixed
//		Error in some parameters passed 'on fail' (which lead to the change above)
//
//	Also Comments and code cleaned up a bit
//
// 1.07
//	Added
//		dontGoCrazy - Only adds "most useful" links. set to true to get a lot more links and start custimizing :)
//		GoogleStyle - style attributes for links that go to google (sub) searches
//		CustomStyle - style attributes for links to third party searches
//		AffiliateStyle - style attributes for links to third party affiliate links (currently only Amazon)
//		BaseStyle - style applied to all links. 
//		no other style elements are applied
//
// 1.06
//	Added 
//		Userscripts.org
//		allowAffiliate - set to false if you don't want me to make any money :)
//		allowLinkStyling - set to true if you want to see what's getting added
//		googleOnly - set to true if you don't wany anything but the additional google links
//		More code comments - like this
//	Fixed error in addCustomLink
//
// 1.05 - Added Wikipedia
//			cleaned up entries and code to make it a bit easier to modify / use.
//
// 1.04 - excluded Gmail (doesn't seem to play well and I don't wanna cause issues)
//

// --------------------------------------------------------------------------------------------
//   Variables controlling the ReBar
// --------------------------------------------------------------------------------------------
//
// Set up debugging / logging (via JavaScript message Console)
//

var debugLevel = GM_getValue('debugLevel', 0); 
if(debugLevel > 1) GM_log('\r\ndebugLevel: ' + debugLevel);
// 5 = Verbose. 
// 3 = 3rd party links +
// 2 = Google links +
// 1 = Exceptions
// 0 = normal operation
//

// Set up how much information is added to the rebar.
//	The higher the craziness, the more links that will be showns
//
var Craziness = GM_getValue('Craziness', 3); // tame (3) is the default
if(debugLevel > 1) GM_log('\r\nCraziness: ' + Craziness);
//
// 0 = Queit
// 3 = Tame    the default
// 4 = Crazy   currently supported
// 6 = Bipolar (before you start,i'm bipolar so it's cool, probably what got me going anyway :)
// 8 = Insane
// 9 = Omg
//     Other flags are reserved for future heights of craziness


// NOTE: If craziness is set to 0 (zero) then no links get added (Quiet)
//
var dontGoCrazy = (Craziness < 4 ? true : false); // (aka Tame)
var Crazy = (Craziness > 3 ? true : false);
var Bipolar = (Craziness > 5 ? true : false);
var Insane = (Craziness > 7 ? true : false);
var Omg = (Craziness > 8 ? true : false);

// When the google query box is empty defaultSearchTerms will be used instead
//
var defaultSearchTerms = GM_getValue('defaultSearchTerms','');
if(debugLevel > 1 && defaultSearchTerms.length > 0) GM_log('\r\defaultSearchTerms: ' + defaultSearchTerms);

// Set linkTarget to have link results open in a new window
//
var linkTarget = GM_getValue('linkTarget', '_blank');
if(debugLevel > 1 && linkTarget.length > 0) GM_log('\r\nlinkTarget: ' + linkTarget);

// Set this to true if you don't want anything but google links added (no affiliate links)
//
var googleOnly = GM_getValue('googleOnly', false);
if(debugLevel > 1) GM_log('\r\ngoogleOnly: ' + googleOnly);

// NOTE: Some links (currently only Amazon) go through my affiliate link.
//		If you object to this, just set allowAffiliate to false and normal search results will be used. 
//      However, I could really use the money and it won't cost you anything, affect your search or do anything weird or bad :)
//		So please leave it set to true if you can. Thanks for the clicks!
//
// IMPORTANT NOTE: I will NOT add affiliate links to Google sites. Ever. Period. 
//	It just seems wrong... Unless Google calls me up and says it's okay :)
//
var allowAffiliate = GM_getValue('allowAffiliate', true);
if(debugLevel > 1) GM_log('\r\nallowAffiliate: ' + allowAffiliate);

// I've decided that making all added links is a good idea, but stand out by default isn't.
// If you think this should default to true or something else, let me know: william.rawls@gmail.com
//
var allowLinkStyling = GM_getValue('allowLinkStyling', false);
if(debugLevel > 1) GM_log('\r\nallowLinkStyling: ' + allowLinkStyling);

// Set the style of each link added so you can visually tell the difference between googles links and ReBar's links
//
var BaseStyle = 'cursor: pointer; text-decoration: underline; ';
var GoogleStyle = (allowLinkStyling ? 'color: green;' : '');
var CustomStyle = (allowLinkStyling ? 'color: black;' : '');
var ScriptletStyle = (allowLinkStyling ? 'color: red;' : '');

// ... Should I note the links that are affiliated ? 
//  On the one hand I want to let the user know there's something else going on
//  On the other I don't want it to look like I'm trying to drive traffic...
//  Hmm... I think I'll opt for a very dark color so there's a difference, but so it doesn't stick out
var AffiliateStyle = (allowLinkStyling ? 'color: #113355; ' : ''); 

// Cause Rebar to setup, hopefully after the web page finishes loaded
// NOTE: Slower computer? Increase the value. Faster? Decrease, but probably no lower than say 250

window.setTimeout(setupRebar, 200);

// --------------------------------------------------------------------------------------------
//   Setup Google ReBar links
// --------------------------------------------------------------------------------------------
//
function setupRebar() {
  setupRebarOptions();

  if(Craziness > 0) {
// --------------------------------------------------------------------------------------------
//   Add Google links 
// --------------------------------------------------------------------------------------------
//                    Title,     SubDomain,  FirstUrlPart,   AltPart,   onFailLookFor, onFailParams
//
	  addGoogleLink( 'Shopping','www',      '/products',    '/prdhp',  'products',    'tab=wf');
	  addGoogleLink( 'Video',   'video',    '/videosearch', '/videos', 'video',       'tab=wv');
	  if(Crazy) {
	    addCustomLink('YouTube', 'www.youtube.com/results?q=[Query]&source=ig&hl=en&rlz=&um=1&ie=UTF-8&sa=N&tab=w1', GoogleStyle, null, 'Click to search YouTube using your query');
	  }
	  addGoogleLink( 'Images',  'images',   '/images',      '/imghp',  'images',      'tab=mi');

	  if(Bipolar && !googleOnly) {
		addCustomLink('Music', 'www.imeem.com/tag/?f=music&q=[Query]', CustomStyle, null, 'Click to search music on imeem.com using your query');
	  }

	  if(Crazy || googleOnly) {
		addGoogleLink( 'Voice',   'voice',      '/voicesearch', '/voice', 'voice', 'tab=vc'); 	
		addGoogleLink( 'Groups',  'groups',     '/groups',    '/grphp',  'groups', 'tab=fg');
		addGoogleLink( 'Blogs',   'blogsearch', '/blogsearch','/blghp',  'blogs',  'source=ig&rlz=&tab=wb');
	  }
	  if(Bipolar || googleOnly) {
		addGoogleLink( 'Code',    'code',       '/codesearch','/cdehp',  'code',   'http://code.google.com/search/#q=[Query]');
	  }

// --------------------------------------------------------------------------------------------
//   From here on it's all 3rd party (no direct competitors like yahoo, msn, etc.)
// --------------------------------------------------------------------------------------------
	if(!googleOnly) {
		addCustomLink('eBay',    'search.ebay.com/[Query]', CustomStyle, null, 'Click to search eBay using your query');

	  if(!allowAffiliate)
	    addCustomLink('Amazon',  'www.amazon.com/s?ie=UTF8&tag=mozilla-20&index=blended&link%5Fcode=qs&field-keywords=[Query]&sourceid=Mozilla-search', CustomStyle, null, 'Click to search Amazon using your query');
	  else
	    addCustomLink('Amazon',  'www.amazon.com/gp/associates/link-types/searchbox.html?tag=wilmraw-20&creative=0&campaign=0&adid=0XQ8J8Y9PPJZQFGGEJ5H&mode=blended&keyword=[Query]', AffiliateStyle, null, 'Click to search Amazon using your query');
		// LINE ABOVE CONTAINS AFFILIATE LINK -- NO STRANGE RESULTS, JUST GIVES ME CREDIT IF YOU BUY SOMETHING. NOTHING MORE, NOTHING LESS, NO MONEY OUT OF YOUR POCKET, JUST A LITTLE IN MINE :)

	  addCustomLink('Wiki',    'en.wikipedia.org/wiki/[Query]', CustomStyle, null, 'Click to search Wikipedia using your query');
	  addCustomLink('Scripts', 'userscripts.org/scripts/search?q=[Query]', CustomStyle, 'http://www.userscripts.org', null, 'Click to search userscripts.org using your query');  	  

	  if(Bipolar) {
		addCustomLink('Styles', 'userstyles.org/styles/browse/all/[Query]/popularity/desc/1', CustomStyle, 'http://www.userstyles.org', null, 'Click to search userstyles.org using your query');
		addCustomLink('AMO', 'addons.mozilla.org/en-US/firefox/search?q=[Query]&cat=all', CustomStyle, 'http://addons.mozilla.org/en-US/firefox', null, 'Click to search userscripts.org using your query');
	  }

	  if(Crazy) {
	    addCustomLink('Movies',  'www.imdb.com/find?q=[Query]&sourceid=mozilla-search', CustomStyle, null, 'Click to search imDB using your query');
	    addCustomLink('Answers', 'www.answers.com/[Query]', CustomStyle, null, 'Click to search Answers.com using your query');
	    addCustomLink('Define',  'dictionary.reference.com/search?q=[Query]', CustomStyle, null, 'Click to search Dictionary.com using your query');
	  }
	}	
	// Suggestions for more ??
  }
  var rebarOptions = addCustomLink('\&#8853;', null, ScriptletStyle, null, 'Click to change ReBar options. Google ReBar version: ' + version)
  if(rebarOptions != null)
	rebarOptions.addEventListener('click', reOptArea, true);

  // This will remove the word "Web" when we're searching the web to give us some more space
  if(Crazy)
	removeGoogleLink('<b>Web</b>', null);
  
  // If you wanted to remove other links you can uncomment the following lines and play around:
  //removeGoogleLink('news.google.com', '/news?');
  //removeGoogleLink('mail.google.com', 'Gmail');
}

function reNav(e) {
	try {
		var url = this.getAttribute('url');
		var urlWhenEmpty = this.getAttribute('urlWhenEmpty');
		var SearchTerms = document.getElementsByName('q')[0].value;
		if(SearchTerms == null)
			SearchTerms = defaultSearchTerms;

		if(debugLevel > 4) {
			GM_log('\r\npassed url: ' + url);
			GM_log('\r\npassed urlWhenEmpty: ' + urlWhenEmpty);
		}
	
		url = SearchTerms.length > 0 || urlWhenEmpty == null ? url.replace('[Query]', SearchTerms) : urlWhenEmpty.replace('[Query]', SearchTerms);
		if(url.length > 0) {
			url = url.replace('[Query]', SearchTerms);
			if(url.indexOf('http') == 0) {
				if(linkTarget.length > 0)
					window.open(url, linkTarget);
				else
					document.location.href = url;
			}
			else 
				if(url.indexOf('javascript:') == 0) {
					try {
						url = url.substring(11);
						eval(url);
					} catch(e) {  if(debugLevel > 0)  GM_log('\r\nreNav: ' + e.toString() + '\r\nurl: ' + url + '\r\nQuery: ' + SearchTerms); }
				}
				else {
					url = 'http://' + url;
					if(linkTarget.length > 0)
						window.open(url, linkTarget);
					else
						document.location.href = url;
				}
			if(debugLevel > 1) GM_log('\r\nurl: ' + url);
		} else {
			if(debugLevel > 0) 
				GM_log('\r\nNo Url');
		}
			
		
	} catch(e) {
		// if(debugLevel > 0) 
			GM_log('\r\nreNav: ' + e.toString() + '\r\nurl: ' + url + '\r\nQuery: ' + SearchTerms);
	}
}

var moreSpan;
var rebarOpts;
var rebarMenu;

function setupRebarOptions() {
	moreSpan = getTheMoreSpan();
	
	rebarMenu = document.createElement('div');
	var t = document.createElement('b');
	var ar = document.createElement('a');
	ar.setAttribute('href','http://userscripts.org/scripts/show/23969');
	ar.setAttribute('title','Click here to visit this script on userscrips.org');
	ar.appendChild(document.createTextNode('ReBar'));
	t.appendChild(ar);
	
	t.setAttribute('style', 'font-size: 0.8em; border-bottom: solid 1px black;');
	rebarMenu.appendChild(t);
	t = document.createElement('span');
	t.appendChild(document.createTextNode(' Values change on Refresh'));
	t.setAttribute('style', 'font-size: 0.8em;');
	rebarMenu.appendChild(t);
	rebarMenu.appendChild(document.createElement('br'));
	rebarMenu.setAttribute('style', 'display: none;');
	rebarMenu.setAttribute('shown', 'no');
	document.body.appendChild(rebarMenu);

	addRebarCraziness();

	addRebarOption('Google only', 'googleOnly', 'checkbox', googleOnly);
		rebarMenu.appendChild(document.createElement('br'));

	addRebarOption('Allow Link Styling', 'allowLinkStyling', 'checkbox', allowLinkStyling);
		rebarMenu.appendChild(document.createElement('br'));

	addRebarOption('Allow Affiliate', 'allowAffiliate', 'checkbox', allowAffiliate);
		rebarMenu.appendChild(document.createElement('br'));
	addRebarOption('Debug', 'debugLevel', 'checkbox', debugLevel);

	rebarMenu.appendChild(document.createTextNode(' '));
}

function addRebarCraziness() {
	var s = document.createElement('span');
	var l = document.createElement("select");
	var o;
	
	o = l.appendChild(document.createElement("option")); o.setAttribute('id', 'Quiet');   o.setAttribute('value', '0'); o.innerHTML = 'Quiet';   o.addEventListener('click', reOpt, true); if(Craziness == 0) o.selected = true;
	o = l.appendChild(document.createElement("option")); o.setAttribute('id', 'Tame');    o.setAttribute('value', '3'); o.innerHTML = 'Tame';    o.addEventListener('click', reOpt, true); if(Craziness == 3) o.selected = true;
	o = l.appendChild(document.createElement("option")); o.setAttribute('id', 'Crazy');   o.setAttribute('value', '4'); o.innerHTML = 'Crazy';   o.addEventListener('click', reOpt, true); if(Craziness == 4) o.selected = true;
	o = l.appendChild(document.createElement("option")); o.setAttribute('id', 'Bipolar'); o.setAttribute('value', '6'); o.innerHTML = 'Bipolar'; o.addEventListener('click', reOpt, true); if(Craziness == 6) o.selected = true;
	o = l.appendChild(document.createElement("option")); o.setAttribute('id', 'Insane');  o.setAttribute('value', '8'); o.innerHTML = 'Insane';  o.addEventListener('click', reOpt, true); if(Craziness == 8) o.selected = true;
	o = l.appendChild(document.createElement("option")); o.setAttribute('id', 'OMG');     o.setAttribute('value', '9'); o.innerHTML = 'OMG';     o.addEventListener('click', reOpt, true); if(Craziness == 9) o.selected = true;
	
	l.setAttribute('type', 'select');
	l.setAttribute('id', 'Craziness');
	l.setAttribute('style', 'margin: 0; padding: 0;');
	//l.addEventListener('change', reOpt, true);
	s.appendChild(l);
	var t = document.createElement('span');
		t.appendChild(document.createTextNode('Craziness'));
		t.setAttribute('style', 'margin: 0 10px 0 10px; padding: 0; ');
	s.appendChild(t);
	rebarMenu.appendChild(s);
	rebarMenu.appendChild(document.createElement('br'));
}

function reOptArea(e) {
	if(rebarMenu.getAttribute('shown') == 'no') {
		rebarMenu.setAttribute('style', 'position: absolute; display: block; left: 0px; top: 25px; width: 200px; border: solid 2px black; background-color: white; margin: 3px 3px 3px 3px; padding: 1px 1px 1px 1px;');
		rebarMenu.setAttribute('shown', 'yes');
	} else {
		rebarMenu.setAttribute('style', 'display: none;');
		rebarMenu.setAttribute('shown', 'no');
	}
}

function reOpt(e) {
	var handled = false;
	switch(this.id) {
		case 'debugLevel': 
			debugLevel = (debugLevel == 0 ? 5 : 0);
			GM_setValue(this.id, debugLevel);
			if(debugLevel > 1) GM_log(this.id + ' set to ' + debugLevel);
			handled = true;
			break;
		case 'allowAffiliate': 
			allowAffiliate = (allowAffiliate ? false : true);
			GM_setValue(this.id, allowAffiliate);
			if(debugLevel > 1) GM_log(this.id + ' set to ' + allowAffiliate);
			handled = true;
			break;
		case 'allowLinkStyling': 
			allowLinkStyling = (allowLinkStyling ? false : true);
			GM_setValue(this.id, allowLinkStyling);
			if(debugLevel > 1) GM_log(this.id + ' set to ' + allowLinkStyling);
			handled = true;
			break;
		case 'googleOnly': 
			googleOnly = (googleOnly ? false : true);
			GM_setValue(this.id, googleOnly);
			if(debugLevel > 1) GM_log(this.id + ' set to ' + googleOnly);
			handled = true;
			break;
		case 'Quiet':
		case 'Tame':
		case 'Crazy':
		case 'Bipolar':
		case 'Insane':
		case 'OMG':
			Craziness = this.value;
			GM_setValue('Craziness', Craziness);
			if(debugLevel > 1) GM_log(this.id + ' set to ' + Craziness);
			handled = true;
			break;
		default:
			alert(this.id + ': ' + this.value);
			break;
	}	
	if(handled) {
		reOptArea(this);
		window.location.reload();
	}
}

function addRebarOption(title, id, inputType, value) {
	var s = document.createElement('span');
	var input = document.createElement('input');
		input.setAttribute('type', inputType);
		input.setAttribute('id', id);
		if(inputType == 'checkbox') {
			if(value == true || value == "true" || value == "checked" || value != 0) {
				input.setAttribute('checked', 'checked');
			} 
		} else {
			input.setAttribute('value', value);
		}
		input.setAttribute('style', 'margin: 0; padding: 0;');
		input.addEventListener('click', reOpt, true);
	s.appendChild(input);
	var t = document.createElement('span');
		t.appendChild(document.createTextNode(title)); // + ' ' + value));
		t.setAttribute('style', 'margin: 0 10px 0 10px; padding: 0; ');
	s.appendChild(t);
	rebarMenu.appendChild(s);
}

// Trys to intelligently add a google site link to the google gBar span/div (such as Shopping or Video)
//
function addGoogleLink(Title, SubDomain, FirstUrlPart, AltPart, onFailLookFor, onFailParams) {
	var addedOne = false;
	var oneAlreadyExists = false;
	var ret = 0;
	try { // Make sure we don't throw errors
		// var moreSpan = getTheMoreSpan();
		if(moreSpan != null) {
			var gb1Spans = getElementsByClassName('gb1', 'span', null);   // gb2 spans are the links inside the "more" link drop down
			if(gb1Spans == null) gb1Spans = getElementsByClassName('gb1', 'div', null);
			if(gb1Spans != null) {
				for(i = 0; i < gb1Spans.length; i++) {
					if(gb1Spans[i].innerHTML.indexOf(FirstUrlPart) > 0 || gb1Spans[i].innerHTML.indexOf(AltPart) > 0) {
						oneAlreadyExists = true;
						break;
					}
				}
			}
			if(!oneAlreadyExists) {
				var gb2s = getElementsByClassName('gb2', 'span', null);   // gb2 spans are the links inside the "more" link drop down
				if(gb2s == null) gb2s = getElementsByClassName('gb2', 'div', null);

				if(gb2s != null && gb2s.length > 0) {
					for(i = 0; i < gb2s.length; i++) {
						if(gb2s[i].innerHTML.indexOf(FirstUrlPart) > 0 || gb2s[i].innerHTML.indexOf(AltPart) > 0) {
							var exprod = gb2s[i];                       // This is the FirstUrlPart link inside the "more" drop down
							var prod = document.createElement('span');   // Ok, create a new gb1 style link between "Gmail" and "more"
							prod.className = 'gb1';   					// gb1 links are the links before the "more" link (like GMail)
							var a = document.createElement('a');
							a.setAttribute("style", BaseStyle + GoogleStyle);
							a.appendChild(document.createTextNode(Title));
							if(exprod.innerHTML.indexOf(AltPart) > 0) {
								a.setAttribute('url', SubDomain + '.google.com' +
									FirstUrlPart + '?q=[Query]&hl=en&scoring=p&btnG=Search+' +
									FirstUrlPart.replace('/',''));
								a.setAttribute('urlWhenEmpty', SubDomain + '.google.com');
								a.addEventListener("click", reNav, true);
								oneAlreadyExists = true;
								if(debugLevel > 1)
									a.setAttribute('title', a.getAttribute('url'));
							}
							else {
								if(exprod.getAttribute('href'))
									a.setAttribute('href', exprod.getAttribute('href'));
								else
									a.setAttribute('href', exprod.firstChild.getAttribute('href'));;
								if(debugLevel > 1)
									a.setAttribute('title', a.getAttribute('href'));
								if(linkTarget.length > 0)
									a.setAttribute('target', linkTarget);
							}
							prod.appendChild(a);
							moreSpan.parentNode.insertBefore(prod, moreSpan);     // Add the new FirstUrlPart gb1 link before the "more" link
							if(debugLevel > 1) GM_log('\r\n1: ' + prod.innerHTML);
							addedOne = true;
							break;
						}
					}
				}
			}
		} else {
			moreSpan = document.getElementById('gbar');	// This handles the iGoogle page
			if(moreSpan != null) {
				moreSpan = moreSpan.firstChild.firstChild.lastChild.previousSibling.lastChild;	// Nasty huh ?
				var prod = document.createElement('td');   // Ok, create a new gb1 style link between "Gmail" and "more"
				prod.className = 'gb1';   					// gb1 links are the links before the "more" link (like GMail)
				var a = document.createElement('a');
				a.setAttribute("style", BaseStyle + GoogleStyle);
				a.addEventListener("click", reNav, true);
				a.setAttribute('url', SubDomain + '.google.com' +
					FirstUrlPart + '?q=[Query]&hl=en&scoring=p&btnG=Search+' +
					FirstUrlPart.replace('/',''));
				a.setAttribute('urlWhenEmpty', SubDomain + '.google.com');
				a.appendChild(document.createTextNode(Title));
				prod.appendChild(a);
				if(debugLevel > 1) GM_log('\r\n3: ' + prod.innerHTML);
				moreSpan.parentNode.insertBefore(prod, moreSpan);
				addedOne = true;
			}
		}
		if(!addedOne && !oneAlreadyExists && debugLevel > 1)
			GM_log('\r\n4: Did not add ' + Title);
		
	} catch(e) { if(debugLevel > 0) GM_log('\r\n5:' + e.toString()); }
	if(!addedOne) {
		if(!oneAlreadyExists) {
			ret = 0;
			if(onFailLookFor != null && onFailParams != null) {
				if(document.location.href.indexOf(onFailLookFor) == -1) {
					// We didn't add a link because we couldn't find on in the "more" menu, 
					// but neither is one shown in gBar. So add a custom link now
					if(onFailParams.indexOf('http') != 0)
						addCustomLink(Title, SubDomain + '.google.com' + FirstUrlPart +
							'?hl=en&q=[Query]&um=1&ie=UTF-8&sa=N&' + onFailParams, GoogleStyle);
					else
						addCustomLink(Title, onFailParams, GoogleStyle);
				}
			}
		}
		else 
			ret = 1;
	} else
		ret = 2;
	return ret;
}

function getTheMoreSpan() {
		var gb3 = getElementsByClassName('gb3', 'a', null);
		if(gb3 == null) gb3 = getElementsByClassName('gb3', 'span', null);
		if(gb3 == null) gb3 = getElementsByClassName('gb3', 'div', null);
		if(gb3 == null) gb3 = document.getElementById('gbar');

		if(gb3 != null)
			if (gb3 instanceof Array) 
			{
				if(gb3[0] != null)
					return gb3[0]; // 1st gb3 span is the "more" link
			}
			else
				return gb3;
		return null;
}

// Adds a fully customizable search link such as the one used in the toolbar search box
//	The existing search terms typed into the Google search box are copied and used for the search.
//  Search terms are communicated through CustomUrl by replacing the string [Query] with the contents of the google search box
//
function addCustomLink(Title, CustomUrl, Style, urlWhenEmpty, ToolTip) {
	var a = null;
	try { // Make sure we don't throw errors
		var addedOne = false;
		if(moreSpan != null) {
			var link = document.createElement('span');  // Ok, create a new gb1 style link between "Gmail" and "more"
			link.className = 'gb1';   					// gb1 links are the links before the "more" link (like GMail)
			a = document.createElement('a');
			if(linkTarget.length > 0 && CustomUrl != null)
				a.setAttribute('target', linkTarget);
			a.setAttribute('style', BaseStyle + Style);
			if(ToolTip != null) 
				a.setAttribute('title', ToolTip);
			if(Title.indexOf('&') == -1)
				a.appendChild(document.createTextNode(Title));
			else {
				var s = document.createElement('b');
				s.innerHTML = Title;
				a.appendChild(s);
				a.setAttribute('style', 'text-decoration: none; cursor: pointer; color: blue;');
			}
			if(CustomUrl != null)
				a.addEventListener("click", reNav, true);
			//if(debugLevel > 0)
			a.setAttribute('url', CustomUrl);
			if(CustomUrl != null) {
				a.setAttribute('title', CustomUrl);
				if(urlWhenEmpty != null && urlWhenEmpty.length > 0)
					a.setAttribute('urlWhenEmpty', urlWhenEmpty);
				else
					a.setAttribute('urlWhenEmpty', null);
			}
			link.appendChild(a);
			if(Title.indexOf('&') == -1)
				moreSpan.parentNode.insertBefore(link, moreSpan);     // Add the new FirstUrlPart gb1 link before the "more" link
			else
				moreSpan.parentNode.insertBefore(link, moreSpan.parentNode.firstChild);
			if(debugLevel > 2) GM_log('\r\n6: ' + link.innerHTML);
			addedOne = true;
		}
		if(!addedOne)
			if(debugLevel > 4) GM_log('\r\n7: Did not add ' + Title);
		
	} catch(e) { if(debugLevel > 0) GM_log('\r\n8: ' + e.toString()); }
	return a;
}

// Worker function that returns all DOM objects of type "tag" with a particular class attribute set to "ClassName"
//   If elm is supplied results are limited to the contents of the elm DOM child objects 
//   Warning: I don't know if elm really works as I didn't use it.
//
function getElementsByClassName(className, tag, elm){
	var returnElements = [];
	try {
		var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
		var tag = tag || "*";
		var elm = elm || document;
		var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
		var current;
		var length = elements.length;
		for(var i=0; i<length; i++) {
			current = elements[i];
			if(testClass.test(current.className)) 
				returnElements.push(current);
		}
	} catch(e) { if(debugLevel > 0) GM_log('\r\n11: ' + e.toString()); }
	return returnElements;	
}


// Trys to intelligently remove a google site link from the google gBar span/div (such as News or Shopping or Gmail)
//
function removeGoogleLink(FirstUrlPart, AltPart) {
	try { // Make sure we don't throw errors
		if(moreSpan != null) {
			var gb1Spans = getElementsByClassName('gb1', 'span', null);   // gb2 spans are the links inside the "more" link drop down
			if(gb1Spans == null) gb1Spans = getElementsByClassName('gb1', 'div', null);
			if(gb1Spans != null) {
				for(i = 0; i < gb1Spans.length; i++) {
					if(gb1Spans[i].innerHTML.indexOf(FirstUrlPart) > -1 || gb1Spans[i].innerHTML.indexOf(AltPart) > -1) {
						gb1Spans[i].parentNode.removeChild(gb1Spans[i]);
						break;
					}
				}
			}
		}
	} catch(e) { if(debugLevel > 0) GM_log('\r\n5:' + e.toString()); }
}