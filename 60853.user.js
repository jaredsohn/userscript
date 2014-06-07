// ==UserScript==
// @name Firegrep
// @namespace
// @description Enables better searching by regex by combining the text in and around certain tags (like <a> and <span>) before starting to match using the provided regex. Ctrl+Alt+F begins a new search and Ctrl+Alt+N finds the next match.
// @copyright Justin A. Tisi; justintisi@hotmail.com
// @include *
// ==/UserScript==

/**
 * =Backlog=
 * config options: case-insensitive, highlight color, respect tags, caching?
 * wrap search
 * possible interface: floating div in corner of screen? (=> clutter)
 * possible other interface: another keyboard command
 */

/**
 * ===================
 * Config options here.
 * ===================
 */
/**
 * We construct paragraphs by adding the contents of text nodes across these tags.
 */
var tagsInText = {
	 'a': true
	,'em': true
	,'strong': true
	,'small': true
	,'q': true
	,'dfn': true
	,'abbr': true
	,'time': true
	,'code': true
	,'var': true
	,'samp': true
	,'kbd': true
	,'sub': true
	,'sup': true
	,'i': true
	,'b': true
	,'u': true
	,'mark': true
	,'progress': true
	,'meter': true
	,'rp': true
	,'rt': true
	,'bdo': true
	,'span': true
	,'ins': true
	,'del': true
	,'font': true
};

/**
 * If a text node is a descendant of a node with one of these tags, then we ignore it
 */
var discardTags = {
	 '#comment': true
	,'script': true
	,'textarea': true
	,'input': true
	,'option': true
	,'button': true
};

/**
 * =======================
 * Actual script begins here
 * =======================
 */

var say = function(msg) {
	alert( 'Firegrep: ' + msg );
};

/**
 * Returns true if the text node passed in should be ignored.
 * Examples of reasons for this include the node not being visible, or it being part of a <textarea> tag.
 */
var ignoreNode = function(node) {
	var parent = node.parentNode;
	//make sure there is a parent
	if ( ! parent ) {
		return true;
	}
	
	do {
		var tagname = parent.nodeName.toLowerCase();
		//if we've reached the document, then the node is OK by the checks in this loop
		if ( tagname === '#document' ) {
			break;
		}
		
		if ( discardTags[ tagname ] ) {
			return true;
		}
		
		//make sure all of the node's parents have some dimension
		var width = parent.offsetWidth;
		var height = parent.offsetHeight;
		if ( width <= 0 || height <= 0 ) {
			return true;
		}
		
		//check visibility-type styles
		var style = getComputedStyle( parent, null );
		if ( style && 
				( style.getPropertyValue('display') === 'none' || style.getPropertyValue('visibility') === 'hidden' ) ) {
			return true;
		}
		
		parent = parent.parentNode;
	} while ( parent !== null );
	
	//make sure the node has a position
	parent = node.parentNode;
	var left = 0;
	var top = 0;
	do {
		left += parent.offsetLeft;
		top += parent.offsetTop;
		parent = parent.offsetParent;
	} while ( parent !== null );
	
	return ( left < 0 || top < 0 );
};

/**
 * Variables shared between functions related to results display
 */
var result_globals = {
	replacements: undefined
};

var clearPreviousResult = function() {
	var replacements = result_globals.replacements;
	
	if ( replacements !== undefined ) {
		for ( var i = 0; i < replacements.length; i++ ) {
			var replacement = replacements[i];
			var parent = replacement.createdBefore.parentNode;
			
			parent.insertBefore(replacement.orig, replacement.createdBefore);
			parent.removeChild(replacement.createdBefore);
			parent.removeChild(replacement.createdHighlighted);
			parent.removeChild(replacement.createdAfter);
		}
		
		delete result_globals.replacements;
	}
};

var showResult = function(matched_text, text_index, parag) {
	var nodes = parag.nodes;
	var numNodes = nodes.length;
	var matchedTextLength = matched_text.length;
	
	result_globals.replacements = [];
	
	var firstHighlighted = undefined;
	
	var startIndexInNode;
	var endIndexInNode;
	var textLengthSoFar = 0;
	var matchedLengthSoFar = 0;
	for ( var i = 0; i < numNodes; i++ ) {
		var curNode = nodes[i];
		var curNodeText = curNode.textContent;
		var curNodeTextLength = curNodeText.length;
		
		startIndexInNode = text_index + matchedLengthSoFar - textLengthSoFar;
		endIndexInNode = Math.min( curNodeTextLength, startIndexInNode + matchedTextLength - matchedLengthSoFar );
		if ( startIndexInNode >= 0 && startIndexInNode < endIndexInNode ) {
			matchedLengthSoFar += ( endIndexInNode - startIndexInNode );
			
			var before = document.createTextNode(curNodeText.substring(0, startIndexInNode));
			var highlighted = document.createElement('span');
			highlighted.innerHTML = curNodeText.substring(startIndexInNode, endIndexInNode);
			highlighted.style.backgroundColor = 'yellow';
			var after = document.createTextNode(curNodeText.substring(endIndexInNode));
			
			result_globals.replacements.push({
				createdBefore: before,
				createdHighlighted: highlighted,
				createdAfter: after,
				orig: curNode
			});
			
			var parent = curNode.parentNode;
			parent.insertBefore(before, curNode);
			parent.insertBefore(highlighted, curNode);
			parent.insertBefore(after, curNode);
			parent.removeChild(curNode);
			
			if ( firstHighlighted === undefined ) {
				firstHighlighted = highlighted;
			}
		}
		
		textLengthSoFar += curNodeTextLength;
	}
	
	if ( firstHighlighted !== undefined ) {
		firstHighlighted.scrollIntoView();
	}
};

/**
 * Variables shared between search-related functions
 */
var search_globals = {
	haveSearched: false,
	
	regex: undefined,
	textNodes: undefined,
	len: undefined,
	
	lastParagraph: undefined,
	curTextNodeIndex: 0,
	
	moreMatches: true
};

var whiteSpaceRegex = /^\s*$/;
var newLineRegex = /\n/g;

/**
 * Constructs the next paragraph to search against. This uses some relatively complex state to keep track of the current nodes in the list
 * that have already been part of some paragraph.  This state also depends on being able to traverse the DOM tree and finding the nodes in the
 * same order as they appear in the snapshot.  This returns a paragraph object, which has 2 properties: the text of the paragraph (stripped of tags), and
 * the text nodes involved in the paragraph.  If no more paragraphs can be constructed, returns null.
 */
var getNextParagraph = function() {
	var textNodes = search_globals.textNodes;
	var len = search_globals.len;
	var snapshotIndex = search_globals.curTextNodeIndex;
	
	if ( snapshotIndex >= len ) {
		return null;
	}
	
	var curNode;
	var ignoreNodeRes;
	do {
		curNode = textNodes.snapshotItem( snapshotIndex );
		snapshotIndex++;
		ignoreNodeRes = ignoreNode( curNode );
	} while ( snapshotIndex < len && ignoreNodeRes );
	
	if ( ignoreNodeRes ) {
		search_globals.curTextNodeIndex = snapshotIndex;
		return null;
	}
	
	var txt = curNode.textContent.replace(newLineRegex, ' ');	//javascript regexes seem to have trouble with new lines, so replace them with spaces
																//this also has the nice property of replacing a single character with only one other character
																//so that showResult() can still use string indexes
	var nodes = [ curNode ];
	
	addMoreText:
	for (;;) {
		var tag;
		
		var nextNode = curNode.firstChild;
		if ( ! nextNode ) {
			nextNode = curNode.nextSibling;
			if ( ! nextNode ) {
				//going back up the tree
				do {
					curNode = curNode.parentNode;
					if ( ! curNode ) {
						//no more parents
						break addMoreText;
					}
					
					tag = curNode.nodeName.toLowerCase();
					
					if ( ! tagsInText[ tag ] ) {
						//we've found a tag that we don't want to continue searching over
						break addMoreText;
					}
					if ( tag === '#document' ) {
						//we've made it through the whole tree
						break addMoreText;
					}
				} while ( ! curNode.nextSibling );
				nextNode = curNode.nextSibling;
			}
		}
		
		curNode = nextNode;
		tag = curNode.nodeName.toLowerCase();
		
		if ( tag !== '#text' ) {
			if ( ! tagsInText[ tag ] ) {
				//we've found a tag that we don't want to continue searching over
				break addMoreText;
			}
			if ( tag === '#document' ) {
				//we've made it through the whole tree
				break addMoreText;
			}
		} else {
			var textContent = curNode.textContent.replace(newLineRegex, ' ');	//javascript regexes seem to have trouble with new lines, so replace them with spaces
																				//this also has the nice property of replacing a single character with only one other character
																				//so that showResult() can still use string indexes
			if ( ! whiteSpaceRegex.test( textContent ) ) {
				//this is the next text node
				snapshotIndex++;
				if ( ! ignoreNode( curNode ) ) {
					txt += textContent;
					nodes.push( curNode );
				}
			}
		}
	}
	
	search_globals.curTextNodeIndex = snapshotIndex;
	
	return {
		text: txt,
		nodes: nodes
	};
};

/**
 * Common method between beginSearch and findNextMatch that actually searches for the next match.
 * Invokes showResult when a match is found and returns true.  Otherwise, returns false to indicate that there are no more matches.
 */
var doSearch = function() {
	try {
		var regex = search_globals.regex;
		var parag = search_globals.lastParagraph;
		
		clearPreviousResult();
		
		do {
			if ( parag ) {
				var txt = parag.text;
				
				var execRes = regex.exec(txt);
				while (execRes !== null && execRes[0].length === 0) {
					regex.lastIndex++;	//avoid an infinite loop if we match the empty string
					execRes = regex.exec(txt);
				}
				
				if ( execRes !== null ) {
					search_globals.lastParagraph = parag;
					showResult( execRes[0], execRes.index, parag);
					return true;
				}
			}
			
			parag = getNextParagraph();
			
		} while ( parag );
		
		return false;
		
	} catch (e) {
		say( 'An error occurred while searching.' );
		throw e;
	}
};

/**
 * Initializes a new search, prompts the user for the regex and finds the first match, if any.
 */
var beginSearch = function() {
	var search = prompt( 'Firegrep: Enter the regex to use for searching.' );
	if ( ! search ) {
		return;
	}
	
	//initialize the globals
	for ( var x in search_globals ) {
		delete search_globals[x];
	}
	
	search_globals.haveSearched = true;
	search_globals.curTextNodeIndex = 0;
	search_globals.moreMatches = true;
	
	try {
		search_globals.regex = new RegExp(search, 'g'); //possibly also 'gi'
	} catch (e) {
		say( 'Error parsing regular expression "' + search + '"' );
		return;
	}
	
	//get all the text nodes in the body of the document
	var textNodes = document.evaluate(
		"//body//text()[normalize-space(.)!='']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	search_globals.textNodes = textNodes;
	search_globals.len = textNodes.snapshotLength;
	
	//search through the text nodes for a match
	if ( doSearch() ) {
		return;
	}
	search_globals.moreMatches = false;
	say( 'No matches.' );
};

/**
 * Finds the next match, if any.
 */
var findNextMatch = function() {
	if ( ! search_globals.haveSearched ) {
		say( 'There was no inital search for which to find the next match.' );
		return;
	}
	if ( ! search_globals.moreMatches ) {	//Short-circuit this method if we've already found no more matches
		say( 'No more matches.' );
		return;
	}
	
	if ( doSearch() ) {
		return;
	}
	search_globals.moreMatches = false;
	say( 'No more matches.' );
};

/**
 * Invoke beginSearch on Ctrl+Alt+F.
 * Invoke findNextMatch on Ctrl+Alt+N.
 * Clear previous result with Esc.
 */
window.addEventListener('keypress', function(e) {
	if (e.altKey === true && e.ctrlKey === true) {
		if (e.charCode === 102) {
			beginSearch();
		} else if (e.charCode === 110) {
			findNextMatch();
		}
	} else if (e.keyCode === e.DOM_VK_ESCAPE &&
			e.altKey === false &&
			e.ctrlKey === false &&
			e.shiftKey === false &&
			e.metaKey === false ) {
		clearPreviousResult();
	}
}, false);
