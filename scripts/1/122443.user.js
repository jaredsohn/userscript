// ==UserScript==
// @id			efllinks
// @name		efllinks
// @version		120109
// @namespace      
// @author		Maija
// @description		Examples For Learning, Links: Learn how to do stuff with links on a web page.
// @homepage		http://userscripts.org/users/maija
// @include		*
// @run-at		document-end
// ==/UserScript==


/*	Examples For Learning, Links:
		So here's a bunch of examples to study and mess about with.
		There are always different ways to do the same thing, this isn't THE way to anything, just some examples that work.
		To try out the various options adjust which things are commented out etc.
		conlog() is for firebug console.log debugging output so you can see what's going on

	Generally there are two ways to open a link in a new tab.
		1. by adding target="_blank" to the link, or
		2. register an eventhandler on the link and open it in a new tab using GM_OpenInTab
	
	External links provided in this article are randomly picked from my favourites list.
	I have no affiliation with any of them, they're there simply for educational purposes.
	
	I use Scriptish, so I don't know if anything will not work for any other script engine, but feel free to post discussions
	about what needs to be done to make it work etc.  Thanks.
	http://scriptish.org/index.html

*/

function conlog(arg){
/*	120108

	Console logging with firebug.  This works on a regular webpage too.
		http://getfirebug.com/wiki/index.php/Main_Page
		
	This is little function is handy because you can send multiple things to the console at once
	doesn't matter either what type of information it is, object, string, function...
	
	Examples:
		conlog('simple message');
		conlog('results = ', a);  // where a can be an object or any other variable
		conlog(a, b, c); // logging multiple values to the console
		conlog('heading\n', a);  // put variable on a new line
		conlog('\n\n', a);  // insert two line space above a
	
	using console.dir in Greasemonkey requires adding unsafeWindow to it:
		http://devilsworkshop.org/using-firebug-console-to-log-from-greasemonkey-scripts/
	
	Howto Pass Arguments To Another Function:
		http://www.hunlock.com/blogs/Functional_Javascript
		A function method called apply which will apply the arguments array as an arguments list in the new function. 
		Here it applies the arguments in a list to sent to console.log
*/

		try {
			if (arguments.length > 1){
				if (typeof unsafeWindow === 'undefined') {
					console.log.apply(this, arguments);
				}
				else {
					unsafeWindow.console.log.apply(this, arguments);
				}	
			}
			else if (typeof arg === 'object'){
				if (typeof unsafeWindow === 'undefined') {
					console.dir(arg);
				}
				else {
					unsafeWindow.console.dir(arg);
				}	
			}
			else {
				if (typeof unsafeWindow === 'undefined') {
					console.log(arg);
				}
				else {
					unsafeWindow.console.log(arg);
				}
			}
		}
		catch (e){
			alert(e);
		}
};
function getKeys(o,op,iv){
/*	version 110901
	JavaScript 1.8.5 has Object.keys(obj)
	https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
	this function can return key:value pairs

	op	=> ownProperties, true|false only return properties belonging to this object, else return inherited ones too
	iv	=> includeValues, true|false return the values as well in an array
	
	USE:
		getKeys(obj)
		conlog(getKeys(o.wrappedJSObject,false,true)); // fetch everything you can get about this object
		conlog(getKeys(window.wrappedJSObject,false,true)); // fetch everything in the window, including other javascript namespace objects
		
	NOTES:
	When dealing with event objects, remember to add obj.currentTarget or obj.target to find the object
*/

	if (typeof o === 'undefined') return false;
	if (typeof op === 'undefined') op = false;
	if (typeof iv === 'undefined') iv = true;

	var ks = [];
	for (var k in o) {
		if (o.hasOwnProperty(k) && op==true) {
			if (iv == true){
				ks.push([k,o[k]]);
			}
			else {
				ks.push(k);
			}
		}
		else if (op == false) {
			if (iv == true){
				ks.push([k,o[k]]);
			}
			else {
				ks.push(k);
			}
		}
	}
	return ks;
};
function de(xpathExpression, contextNode, namespaceResolver, resultType, result){
/* 120106

	notes:
		start xpathExpression with .// or ./ so it links in with the context node document.body.//
		this is important mainly if you use the contextNode and are limiting the scope of search for efficiency or other reasons

	resultType:
		ANY_TYPE			0
		ANY_UNORDERED_NODE_TYPE		8
		BOOLEAN_TYPE			3
		FIRST_ORDERED_NODE_TYPE		9
		NUMBER_TYPE			1
		ORDERED_NODE_ITERATOR_TYPE	5
		ORDERED_NODE_SNAPSHOT_TYPE	7
		STRING_TYPE			2
		UNORDERED_NODE_ITERATOR_TYPE	4
		UNORDERED_NODE_SNAPSHOT_TYPE	6

	examples:
		var rows = de(".//div[@id='someId']/p[contains(.,'Posted with')]");

*/
	return document.evaluate(
		(xpathExpression || './/*'),
		(contextNode || document.body),
		(namespaceResolver || null),
		(resultType || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE),
		(result || null)
	);
};
function clickHander(e){
// e in this case is the 'click' event that's fired
// the argument is automatically passed here from addEventListener
// from this we can extract all kinds of information
// https://developer.mozilla.org/En/Listening_to_events
// http://www.javascriptkit.com/jsref/event.shtml
//conlog(e.type);
//conlog(e.button);


	// So when the user clicks a link the browser passes control to us here in clickHandler
	// after that, it may continue onto the next process (what ever it may be) relating to the same link
	// you could set up several eventListeners on a single link and they'd all be executed one after the other
	// unless you told the browser to not do that...
	// https://developer.mozilla.org/en/DOM/event
	e.stopPropagation();
	e.preventDefault();

	// currentTarget gets the node you registered the eventListener on otherwise if it's a thumbnail link you'd get the img instead.
	// try using target instead and see in conlog(el.attributes) which element comes through.
	// https://developer.mozilla.org/en/DOM/event/Comparison_of_Event_Targets
//	var el = e.target;
	var el = e.currentTarget;
// list the element attributes
//conlog(el.attributes);

// list the element properties (all of them)
// you don't get to see these from this side of the xpconnect wrapper, but you can peer through using wrappedJSObject
//conlog(getKeys(el.wrappedJSObject,false,true));


	// sometimes it's undesirable if a link is selected after it's been clicked.
	// Firefox adds a thin dotted border around the object, this can look untidy on objects which already
	// have a "selected" style added to them by you as a result of the click.
	// this is how it happens...
	// click link -> view image in new tab -> close image tab -> return to original page -> link has dotted border around it
	el.blur();

	// make thumbnail border black when clicked on
	el.firstChild.setAttribute('style', 'border:2px solid #000;');
	
	
	// GM_openInTab options
	// https://github.com/scriptish/scriptish/wiki/GM_openInTab
	var	loadInBackground = true,
		reuseTab = false; // this doesn't appear to work for images

	GM_openInTab(el.href, loadInBackground, reuseTab);
}


// css to add a pointy arrow thingy on external links
// the image is embedded in the css here using the data URI scheme.
// http://en.wikipedia.org/wiki/Data_URI_scheme
// http://dataurl.net/#dataurlmaker
GM_addStyle('a.external, a.external:hover {\
    background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ\lYWR5ccllPAAAAA9QTFRFhaPCwsLC2uPtwNDf////TEbXywAAAAV0Uk5T/////wD7tg5TAAAAOUlEQVR42izLwQ0AMAgCQEH2n7kI5WEuBEcOpznnqNYyBuBNe6hk\HM7GoWu2H+Yhewrfl/rHfgIMAFErATporxVBAAAAAElFTkSuQmCC) no-repeat scroll right center transparent !important;\
    padding-right: 13px;\
}');



// finding anything in the DOM is easy using document.evaluate and an xpathExpression
// https://developer.mozilla.org/en/DOM/document.evaluate
// http://www.exampledepot.com/taxonomy/term/386
// here are a variety of examples to find relative and non-relative links on a webpage, including those with/without thumbnail.


	// find non-relative links only
//	var rows = de(".//a[contains(@href, 'http')]");


	// find relative links only
//	var rows = de(".//a[not(contains(@href, 'http'))]");


	// find;
	//	non-relative links and,
	//	not including the webpage domain
	//	regex courtesy of http://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex
	var domain = document.location.href.match(/^((http[s]?|ftp):\/\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*?)?(#[\w\-]+)?$/i)[3];
conlog(domain);
//	var rows = de(".//a[contains(@href, 'http') and not(contains(@href, '"+ domain +"'))]");


	// find;
	//	non-relative links and,
	//	not including the webpage domain and,
	//	not with any child elements, i.e. no thumbnail images
//	var rows = de(".//a[contains(@href, 'http') and not(contains(@href, '"+ domain +"')) and not(*)]");


	// find;
	//	non-relative links and,
	//	not including the webpage domain and,
	//	only with an img child element, i.e. a thumbnail image
	var rows = de(".//a[contains(@href, 'http') and not(contains(@href, '"+ domain +"')) and img]");
conlog('links found:	'+rows.snapshotLength);

		
	if (rows.snapshotLength > 0){
		for (var i=0; rows.snapshotItem(i); i++) {
			var r = rows.snapshotItem(i);
//conlog(r.attributes);
conlog(r.href);
			
			// prefix links
//			r.href = 'http://anonym.to/' + r.href;

			// add a pointer image to the end of a text link
			// see the stylesheet further up the page for the .external class
//			if (r.className.search(/external/) == -1) r.setAttribute('class', r.className + (r.className.length > 0 ? ' ' : '') + 'external');

			// add a colored border around the thumbnail image so we can see things are happening
			// whilst testing on the webpage.  If you're messing with the xpathExpression for example
			// you'll want to easily see which objects are in play.
			if (r.firstChild.tagName == 'IMG') r.firstChild.setAttribute('style', 'border:2px solid #0f0;');
//conlog(r.firstChild.tagName);


			// Methods of opening external links
			// easiest way is set the target attribute
//			if (r.target.search(/_blank/) == -1) r.setAttribute('target', '_blank');
//			if (r.target.search(/_self/) == -1) r.setAttribute('target', '_self');
			
			// Another way of opening an external link is by attaching a click eventListener on it.
			// This method can be useful in so many other ways because as a result of the click you can apply further
			// processing on the document, not just open the link.
			
			// it's probably also a good idea to remove any other methods that may exist for opening the link with a click
			// https://developer.mozilla.org/en/DOM/element.hasAttribute
			// https://developer.mozilla.org/en/DOM/element.removeAttribute
			// tip: attempting to remove an attribute that's not there doesn't raise an exception so no need to precheck.
			// 		however in the interests of completeness I've used hasAttribute to precheck
			if (r.hasAttribute('target')) r.removeAttribute('target');
			if (r.hasAttribute('onclick')) r.removeAttribute('onclick');

			// now put an eventListener on every link pointing to a common callback function clickHandler()
			// when the user clicks a link, the function is called
			// from there we can figure out a bunch of information to do stuff with
			r.addEventListener('click', clickHander, true);
			
		}
	}