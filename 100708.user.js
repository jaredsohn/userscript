// ==UserScript==
// @name           Salesforce Customize Object Admin Link
// @version        0.9.14
// @date           2011-04-20
// @namespace      SalesForce
// @description    Adds a "Customize Object" link to the Tab and page layout pages to go directly to the object page under Setup
// @include        https://*.salesforce.com/*
// @exclude        https://*.salesforce.com/p/setup/layout/
// @exclude        https://*.salesforce.com/*?setupid=CustomObjects*
// @exclude        https://*.salesforce.com/servlet*
// @exclude        https://*.salesforce.com/ui/*
// @exclude        https://*.salesforce.com/home/*
// @exclude        https://*.salesforce.com/help/*
// @exclude        https://*.salesforce.com/00O/o
// @exclude        https://*.salesforce.com/01Z/o
// @exclude        https://*.salesforce.com/apex*
// @exclude        https://dreamevent.my.salesforce.com/*
// ==/UserScript==
//
// Copyright (c) 2011, Michael Smith (http://www.force2b.net)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================

// Delay execution of this GreaseMonkey script to give the page time to finish loading
function runThisScript() { SalesforceObjectAdminLink(); }
window.setTimeout(runThisScript, 1000)

// -------------------------------------------------------------------------------------------
// The main processing of this is buried in this function so that the execution can be delayed
// slightly to give time for any dynamic content to be rendered by Salesforce
// -------------------------------------------------------------------------------------------
function SalesforceObjectAdminLink() {

	// Define a special function to find document elements using a classname. Do this to avoid loading jQuery.
	var getElementsByClassName = creategetElementsByClassName();

	var objectID = '';
	var linksDiv = null;
	var firstLink = null;
	var targetURL = null;
	var linkColor = null;
	var isTab = false;

	// Get the main links section where we'll be adding our 'Customize Object' link
	var configLinks = getElementsByClassName('links');
	// For Tab Views, need to find the topNavTab DIV where the print icon is
	if (configLinks.length == 0) configLinks = getElementsByClassName('topNavTab');
	GM_log('configLinks=' + configLinks.length );
	GM_log('configLinks=' + configLinks);

	// If there is a section where our link will be added ....
	if (configLinks.length > 0) {
		
		// Find the first link listed to see if we can get the Object ID/Name
		linksDiv = configLinks[0];
		firstLink = linksDiv.getElementsByTagName("a")[0];

		// Customize Page: https://cs3.salesforce.com/setup/ui/uiconfigrelatedlistsedit.jsp?retURL=%2Fa1LQ0000000DxuY&id=01IQ0000000D2Wm
		// Edit Layout: https://cs3.salesforce.com/layouteditor/layoutEditor.apexp?type=01IQ0000000D2Wm&lid=00hQ0000000RpOv&retURL=%2Fa1LQ0000000DxuY
		objectID = getURLParameter( firstLink.href, 'id');
		if (objectID == '' && firstLink.innerHTML == 'Edit Layout')  objectID = getURLParameter( firstLink.href, 'type');
		
		// GM_log('objectID =' + objectID );
		
		// for the tab page there is no object ID available in the first link of this section
		// instead we have to find it in the [Create New View] link, which may exist in 2 different places
		if (objectID == '') {
			isTab = true;
			
			// look for a [Create New View] link to get the ID from
			var createNewViewLink = null;
			try {
				// This element is created by the dynamic list views
				createNewViewLink = document.getElementById('create-new-view'); 
			} catch (e) { }
			if (createNewViewLink == null) {
				// If the 'create-new-view' element did not exist then the [Create New View] 
				// link may exist in another section so look there for the first link
				var filterLinks = getElementsByClassName('fFooter'); 
				var createNewViewLink = filterLinks[0].getElementsByTagName("a")[1];
			} else linkColor = 'blue'; /* force the link color to blue in this case */
			
			// Now that we found the [Create New View] link get the object ID
			GM_log('createNewViewLink =' + createNewViewLink );
			// <a href="/ui/list/FilterEditPage?ftype=01IQ0000000D2Wm&amp;retURL=%2Fa1L&amp;cancelURL=%2Fa1L%2Fo">Create New View</a>
			objectID = getURLParameter(createNewViewLink.href, 'ftype');
			
			// For some reason Salesforce uses a one letter code for the object ID on standard objects
			if (objectID == 'c') objectID = 'Contact';
			else if (objectID == 'o') objectID = 'Opportunity';
			else if (objectID == 'a') objectID = 'Account';
			else if (objectID == 'l') objectID = 'Lead';
			else if (objectID == '0') objectID = 'Campaign';
			else if (objectID == 'R') objectID = 'Contract';
			else if (objectID == 't') objectID = 'Case';
			else if (objectID == 'f') objectID = 'Solutions';
			else if (objectID == 'z') objectID = 'Activity';
			else if (objectID == 'PricebookEntry') objectID = 'Products';
			else if (objectID == 'Product2') objectID = 'Products';
		}
		if (endsWith(objectID, 'XX')) objectID = 'PersonAccount'; /* 04/20/2011 */

	}

	// if there is an object ID found ....
	if (objectID != '') {

		// Custom Object Target Link: https://cs3.salesforce.com/01IQ0000000D7CX?setupid=CustomObjects
		// Standard Object Target Link: https://cs3.salesforce.com/ui/setup/Setup?setupid=Contact
		if (objectID.substr(0,1) == '0') {
			targetURL = '/' + objectID + '?setupid=CustomObjects';
			if (isTab) targetURL += '#ListLayoutList_target';
		} else if (isTab) targetURL = '/ui/setup/layout/ListLayouts?type=' + objectID + '&setupid=' + objectID + 'SearchLayouts';
		else targetURL = '/ui/setup/Setup?setupid=' + objectID;

		var spacer = document.createElement('span');
		spacer.innerHTML = '&nbsp;|&nbsp;'
		linksDiv.insertBefore(spacer, firstLink);
		
		// Append the link to the links block
		var newLink = document.createElement('a');
		newLink.setAttribute('href',targetURL);
		newLink.setAttribute('title',"Go to object setup page");
		if (linkColor != null) newLink.setAttribute('style', 'color: ' + linkColor + ';');
		newLink.innerHTML = 'Customize Object';
		linksDiv.insertBefore(newLink, spacer);
	}
}


// ----------------------------------------------
// Return a URL parameter value (or '')
// ----------------------------------------------
function getURLParameter( url, name ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    if( results == null ) return "";
    else return results[1];
}

function endsWith(str, suffix) {
    GM_log('endsWith =' + str.indexOf(suffix, str.length - suffix.length) );
	return str.indexOf(suffix, str.length - suffix.length) != -1;
}


// ----------------------------------------------
// Build a function to return a list of elements
// matching by ClassName. Doing this to avoid
// loading jQuery in the script
// ----------------------------------------------
function creategetElementsByClassName() { 
// ----------------------------------------------
//	Developed by Robert Nyman, http://www.robertnyman.com
//	Code/licensing: http://code.google.com/p/getelementsbyclassname/
// ----------------------------------------------
return function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};
}