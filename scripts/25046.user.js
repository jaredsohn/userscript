// ==UserScript==
// @name          Remember The Milk - Tag Cloud Colorizer
// @namespace     http://userstyles.org
// @description	  Based on this excellent idea found in RTM's forum (http://www.rememberthemilk.com/forums/tips/2943/)
// @author        Mike Snare
// @include       http://www.rememberthemilk.com/*
// @include       https://www.rememberthemilk.com/*
// @include       http://*.www.rememberthemilk.com/*
// @include       https://*.www.rememberthemilk.com/*
// ==/UserScript==

/************************************************************************************
*                          Begin CONFIGURATION.                                     *
*                          Muck with the code below.                                *
************************************************************************************/

/**
 * Set the value of renameHeaders to false if you DON'T want this script to 
 * pretty-print the headers.
 */
var renameHeaders = true;

/**
 * Should the individual tags be renamed in a manner similar to the 
 * headers?
 */
var renameTags = false;

/**
 * Should each category use a border?
 */
var useBordersForCategories = true;

/*
 * Controls whether or not a header is separated from its children using
 * a border element
 */
var separateHeaderWithBorder = false;

/**
 * Should the border colors match the color of the tags they are surrounding?
 * Warning: This usually ends up looking like ass.
 */
var borderColorsMatchTagColors = false;

/**
 * The border color to use when borders are in use AND the tag colors should not 
 * be used for bordering
 */
var borderColor = 'lightGrey';

/**
 * Should the leading symbol (@ or + or whatever) be included in the header?
 */
var useSymbolInHeader = true;

/**
 * If you are keeping the symbols in the headers, it may be acceptable to 
 * prevent them from showing up in the tags themselves
 */
var keepSymbolInTags = false;

/*
 * Should the children tags that exist under the headers be indented?
 */
var indentChildTags = true;

/**
 * Should the leftover tags (those that aren't matched by a section definition) 
 * be grouped visually in a border box like the others?
 */
var useMiscDiv = true;

/**
 * The color to use for the misc div
 */
var miscDivColor = 'CornflowerBlue';

/**
 * The header label for the miscellaneous box
 */
var miscLabel = 'Lists, Locations, etc...';

/**
 * determines whether or not the header link should be modified to search 
 * for all the tags contained by the header. 
 */
var overrideHeaderLinks = true;

/**
 * This query is used when the user clicks on a header link and overrideHeaderLinks 
 * is true BUT there are no tags in the section.  Without this, the search will return
 * the dummy task that holds the header tag.
 */
var EMPTY_QUERY_STR = 'tag:youdonthaveanytasksinthissection';

/**
 * Register your sections here.  Performance is helped (slightly) if you 
 * register them in the order they appear.  It IS necessary that double
 * prefixes are registered ahead of their single counterparts.  I.e. @@ should
 * be registered before @
 *
 * Note that the section names don't need to be long as the thread suggests, but 
 * they should start with the symbol followed by two underscores in order to make sure
 * they show up first.
 **/
var sections = { 'sections' : [
	{prefix:'@', name:'@__contexts', color:'blue', hide:false}, // change @ to blue
	{prefix:'+', name:'+__goals', color:'green', hide:false}, // change + to green
	{prefix:'.', name:'.__minor_projects', color:'brown', hide:false}, // change . to brown
	{prefix:'-', name:'-__major_projects', color:'purple', hide:false}, // change - to purple
	{prefix:'_@', name:'_@__locations', color:'black', hide:false}, // change _@ to black
	{prefix:'_', name:'___areas_of_responsibility', color:'red', hide:false} // change _ to red.
	]
};

/**
 * Non-header tags that should not be displayed
 */
var hiddenTags = new Array('family', 'health', 'inbox', 'no hurry', 'personal', 'photography', 'sent', 'system', 'work');

/************************************************************************************
*                          END CONFIGURATION.                                       *
*                          Don't muck with the code below.                          *
************************************************************************************/

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

Array.prototype.contains = function (element)  {
	for (var i = 0; i < this.length; i++) {
    	if (this[i] == element)  {
			return true;
        }
    }
    return false;
};

function convertToHeader(tag, prefix) {
	var str = tag;
	
	/**
	 * It's necessary to remove the first character in the event that the first 
	 * character is a '_' b/c otherwise it's lost in the replace() call anyway.
	 */
	var symbol = str.substring(0, prefix.length);
	str = str.substring(prefix.length);
	
	str = capitalizeAndSpace(str);
    
    if (useSymbolInHeader) {
    	str = str.trim() + ' (' + symbol +  ')';
    }
    
    return str;
};

function capitalizeAndSpace(str) {
	str = str.replace(/_+/g, ' ');
	
    str = str.replace(/\w+/g, function(a){
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
    return str;
}

var waitingTask;
function handleChange() {
	if (waitingTask) {
		window.clearTimeout(waitingTask);
	}
	waitingTask = window.setTimeout(processCloud, 100);
}

function listenForTagChanges(listen) {
	var cloud = document.getElementById('taskcloudcontent');
	if (cloud) {
		if (listen) {
			cloud.addEventListener("DOMNodeInserted", handleChange, false);
			cloud.addEventListener("DOMNodeRemoved", handleChange, false);
		} else {
			cloud.removeEventListener("DOMNodeInserted", handleChange, false);
			cloud.removeEventListener("DOMNodeRemoved", handleChange, false);
		}
	}
}

function setupHeader(wrapperDiv, headerDiv, tagDiv, tagLink, customColor) {
	if (useBordersForCategories) {
		wrapperDiv.style.border = '1px solid';
		wrapperDiv.style.borderColor = borderColorsMatchTagColors ? customColor : borderColor;
		wrapperDiv.style.paddingLeft = '2px';			
		if (separateHeaderWithBorder) {
				headerDiv.style.borderBottom = '1px solid';
				headerDiv.style.borderColor = borderColorsMatchTagColors ? customColor : borderColor;
		}
	}
	if (indentChildTags) {
		tagDiv.style.paddingLeft = '10px';
	}
	wrapperDiv.style.bottomMargin = '2px';
	headerDiv.className = 'tasktag level11 headerdiv';
	headerDiv.style.display = 'block';
	tagLink.className = 'tasktag level9';
	tagLink.style.color = customColor;
}

function headerSearch(event) {
//	alert(event.currentTarget.innerHTML);
	var headerDiv = event.currentTarget.parentNode.parentNode;
	var tag_str = '';
	var tags = document.evaluate('./div/span/a',headerDiv,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var tagIndex = 0; tagIndex < tags.snapshotLength; tagIndex++) {
		var tag = tags.snapshotItem(tagIndex);
		if (tag_str.length > 0) tag_str += ' OR '
		tag_str += 'tag:' + tag.getAttribute('origTagName');
	}
	if (tag_str.length == 0) {
		tag_str = EMPTY_QUERY_STR;
	}
	document.getElementById('listFilter').value = tag_str;
	event.preventDefault();
}

function processCloud() {

	listenForTagChanges(false);
	var cloud = document.getElementById('taskcloudcontent');
	if (cloud) {
		var allTags, thisTag, thisSection, thisTagName, currentPrefix, currentColor, divIndex, sectionDiv, tagDiv, processingHeader, borderStr, miscDiv, miscTagDiv = undefined;
		processingHeader = false;
		var xpathStr = "./span/a"; // using the cloud as the context.
		if (useMiscDiv) {
			miscDiv = document.createElement('div');
			var miscHeader = document.createElement('span');
			
			miscDiv.appendChild(miscHeader);
			var miscLink = document.createElement('a');
			miscHeader.appendChild(miscLink);
			miscLink.appendChild(document.createTextNode(miscLabel));
			miscTagDiv = document.createElement('div');
			miscDiv.appendChild(miscTagDiv);
			setupHeader(miscDiv, miscHeader, miscTagDiv, miscLink, miscDivColor);
		}
		allTags = document.evaluate(xpathStr,cloud,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var tagIndex = 0; tagIndex < allTags.snapshotLength; tagIndex++) {
			
			thisTag = allTags.snapshotItem(tagIndex);
			thisTagName = thisTag.innerHTML;
			
			if (thisTag.getAttribute('origTagName')) {
				thisTagName = thisTag.getAttribute('origTagName');
			} else {
				thisTag.setAttribute('origTagName', thisTagName);
			}
			processingHeader = false;
			
			for (var sectionIndex = 0; sectionIndex < sections.sections.length; sectionIndex++) {
				thisSection = sections.sections[sectionIndex];
				if (thisTagName == thisSection.name) {
					processingHeader = true;
					
					if (thisSection.hide) {
						thisTag.parentNode.parentNode.removeChild(thisTag.parentNode);
						continue;
					}
				
					/**
					 * This div will hold the header span and another 
					 * div that contains the tags for the heading
					 */
					sectionDiv = document.createElement('div');
					
					thisTag.parentNode/*tag span*/.parentNode/*cloud div*/.insertBefore(sectionDiv, thisTag.parentNode);
					
					if (overrideHeaderLinks) {
						thisTag.addEventListener('click', headerSearch, true);
					}
					
					/**
					 * The header should be a block to make sure it's all on one line and that the tags go on the 
					 * next line
					 */
					sectionDiv.appendChild(thisTag.parentNode);
					
					tagDiv = document.createElement('div');
					
					sectionDiv.appendChild(tagDiv);
					
					currentPrefix = thisSection.prefix;
					currentColor = thisSection.color;
					
					if (renameHeaders) {
						thisTag.innerHTML = convertToHeader(thisTagName, currentPrefix);
					}
	//				log('calling setup header with color = ' + currentColor);
					setupHeader(sectionDiv, thisTag.parentNode, tagDiv, thisTag, currentColor);
					break;  // no reason to keep trying the next sections
				}
			}
			
			if (!processingHeader) {
				if (thisSection.hide || hiddenTags.contains(thisTagName)) {
					thisTag.parentNode.parentNode.removeChild(thisTag.parentNode);
					continue;
				}
				if (currentPrefix && thisTagName.indexOf(currentPrefix) == 0) {
					// grab the whole span
					tagDiv.appendChild(thisTag.parentNode);
					/**
					 * We have to append a simple space here to make sure the spans have some room between them so they can wrap.
					 */
					tagDiv.appendChild(document.createTextNode(" "));
					thisTag.style.color = currentColor;
					if (!keepSymbolInTags) {
						thisTag.innerHTML = thisTagName.substring(currentPrefix.length);
						if (renameTags) {
							thisTag.innerHTML = capitalizeAndSpace(thisTag.innerHTML);
						}
					}
				} 
				else if (useMiscDiv) {
					miscTagDiv.appendChild(thisTag.parentNode);
					miscTagDiv.appendChild(document.createTextNode(" "));
				}
			}
	
		}
		
		if (useMiscDiv) {
			cloud.appendChild(miscDiv);
		}
		
		var copy = document.getElementById('taskcloudcontent_copy');
		if (copy) {
			copy.innerHTML = cloud.innerHTML;
			if (overrideHeaderLinks) {
				xpathStr = "//span[@class='tasktag level11 headerdiv']/a";
				allTags = document.evaluate(xpathStr,cloud,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				for (var tagIndex = 0; tagIndex < allTags.snapshotLength; tagIndex++) {
					thisTag = allTags.snapshotItem(tagIndex);
					thisTag.addEventListener('click', headerSearch, true);
				}
			}
		}
	}
	// re-hook listenForTagChanges
	listenForTagChanges(true);
}

processCloud();

window.addEventListener('unload', function() {
	listenForTagChanges(false);
}, false);
