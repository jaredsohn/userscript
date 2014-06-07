// ==UserScript==
// @name           RTM: Tag Cloud Restructurer
// @version        1.1
// @namespace      http://www.rememberthemilk.com/home/*
// @include        http://www.rememberthemilk.com/home/*
// @include        https://www.rememberthemilk.com/home/*
// @include        http://*.www.rememberthemilk.com/home/*
// @include        https://*.www.rememberthemilk.com/home/*
// ==/UserScript==

/*
 * Note: code to hide lists and to tweak the cow graphic and sidebar position
 * is at the end of the script, past all of the Task Cloud Restructurer code.
 */

/*
 ************************************************
 Tag Cloud Restructuring
 ************************************************
 */

/*
 * Configuration section
 */

/*
  Overview:

  Three types of sections:
  - sectionSingle takes a single tag and renames it
  - sectionFlat groups all tags with a given prefix
   - click on header to search for all tags in that group
  - sectionHierarchy creates a hierarchy from tags with a given prefix
   - example: lists -ac, -ac/cs, -ac/cs/101, -ac/math, -ac/math/101 becomes
		ac
		 cs: 101
		 math: 101
   - can override displayed name by adding ' [[new-name]]' to list or tag name
*/

// Preferences that should hold for all sections
// - bool drawSectionBorders: draw borders around sections
// - string borderColor: color spec for border
// - hiddenTags: list of tags not to display
// - renameTags: dictionary of tags to rename
// - matchTagCase: match case of tag when checking for rename
//  - remember that RTM converts tag names to lowercase in tag cloud

var globalprefs = {
	drawSectionBorders: true,
	borderColor: 'lightGrey',
	hiddenTags: ['sent'],
	renameTags: {
		'-P': 'Personal',
		'-W': 'Work',
		'-P/Computer/TeX': 'TeX'
	},
	matchTagCase: false
};


// section definitions
// - prefix: matched to tags in the order specified
//  - ex: if '@' before '@_', '@' will grab all tags starting with '@'
// - type: class name of section
// overwrite per-section preferences here:
// - add key-value pairs to section dictionary, where key comes from the
//   type's default preference dictionary below
// - descriptions of preference keys are also given below with defaults

var my_sections = [
	{ prefix: 'inbox',  type: sectionSingle,
	                    displayname: 'Unsorted',
	                    color: 'orange'
	},

	{ prefix: 'next',   type: sectionSingle,
	                    displayname: 'Next Actions',
	                    color: 'red'
	},

	{ prefix: 'goal',   type: sectionSingle,
	                    displayname: 'Goals',
	                    color: 'black'
	},

	{ prefix: '_',      type: sectionFlat,
	                    displayname: 'Responsibilities',
	                    color: '#444444'
	},

	{ prefix: '@',      type: sectionFlat,
	                    displayname: 'Contexts',
	                    color: 'blue'
	},

	{ prefix: '-',      type: sectionHierarchy,
	                    colors: ['green', 'purple', 'brown']
	},

	{ prefix: 'maybe',  type: sectionSingle,
	                    displayname: 'Someday/Maybe',
	                    color: 'CornflowerBlue'
	},

	// catch-all section for unprocessed lists and tags
	{ prefix: '',       type: sectionFlat,
	                    displayname: 'Miscellaneous',
	                    runinText: false,
	                    color: 'gray'
	}
];

// pick the above section list as sections to process
var sections = my_sections;


// default preferences for each type of section
// can overwrite each of these in the section defintions below
// some section preferences must be specified for given section

var sectionprefs = {
	// sectionBase preferences:
	// - displayOrder: governs final order of sections, with higher nums at top
	//  - ex: to move a section to top/bottom, give it a displayOrder of 1/-1
	// - bool hide: hide section

	sectionBase: {
		displayOrder: 0,
		hide: false
	},
	
	// sectionSingle preferences:
	// - headerSize: RTM size for header tag (1-9)
	// - color: color of section
	// - bool displayOriginalName: display '(original tag)' after new name
	
	sectionSingle: {
		headerSize: 6,
		color: 'black',
		displayOriginalName: false
	},
	
	// sectionFlat preferences:
	// - headerSize: RTM size for header tag (1-9)
	// - color: color of section
	// - maxChildSize, maximum RTM size for child tags
	// - minChildSize, minimum RTM size for child tags
	//  - set these equal to make all tags a particular size 
	// - displayPrefixInHeader: show '(prefix)' after header
	// - displayPrefixInTags: keep prefix on tags
	// - renameTags: convert underscores to spaces, capitalize words
	// - runinText:
	//  - if true: HEADER: tag tag tag ...
	//  - if false: HEADER, new line, tag tag tag ...
		
	sectionFlat: {
		headerSize: 6,
		color: 'black',
		maxChildSize: 4,
		minChildSize: 1,
		displayPrefixInHeader: false,
		displayPrefixInTags: false,
		capAndSpaceTags: false,
		runinText: true
	},
	
	// sectionHierarchy preferences:
	// - depth: max depth of hierarchy (should be at least 3)
	// - colors: list of colors of top-level sections (assigned cyclically)
	// - sizes: RTM sizes of each level in hierarchy (1 to 9)
	// - separators: string of path separators:
	//  - '/' most convenient for lists, '+' allowed in tags
	// - hideChildren: child tags to hide (not currently implemented)
	
	sectionHierarchy: {
		depth: 3,
		colors: ['black', 'green', 'brown'],
		sizes: ['6', '4', '1'],
		separators: '|/+'
		// hidechildren: []
		// indentChildTags: true
	}
};


/*
 * End of configuration section
 */

/*
 ************************************************
 Task Cloud Restructuring - Actual Code
 ************************************************
 */

/*
 * Section classes
 */

function sectionBase(arguments) {
	// copy or overwrite default preferences
	for (var key in sectionprefs.sectionBase) {
		if (key in arguments) {
			this[key] = arguments[key];
		}
		else {
			this[key] = sectionprefs.sectionBase[key];
		}
	}
	
	// set required data
	this.prefix = arguments.prefix;
}

// void base-class member functions
sectionBase.prototype.setupDiv = null;
sectionBase.prototype.includeTag = null;
sectionBase.prototype.addTag = null;
sectionBase.prototype.assembleDiv = null;
sectionBase.prototype.styleFinalBlock = null;

// constructors for section subclasses

function sectionFlat(arguments) {
	// call sectionBase base class constructor
	this.super_constructor = sectionBase;
	this.super_constructor(arguments);
	
	// copy or overwrite default preferences
	for (var key in sectionprefs.sectionFlat) {
		if (key in arguments) {
			this[key] = arguments[key];
		}
		else {
			this[key] = sectionprefs.sectionFlat[key];
		}
	}
	
	// set no-default required data
	this.displayname = arguments.displayname;
	this.color = arguments.color;
	
	// construct html div containing section
	this.setupDiv();
}

function sectionHierarchy(arguments) {
	// call sectionBase base class constructor
	this.super_constructor = sectionBase;
	this.super_constructor(arguments);
	
	// copy or overwrite default preferences
	for (var key in sectionprefs.sectionHierarchy) {
		if (key in arguments) {
			this[key] = arguments[key];
		}
		else {
			this[key] = sectionprefs.sectionHierarchy[key];
		}
	}
	
	// set no-default required data
	this.colors = arguments.colors;
	
	// construct html div containing section
	this.setupDiv();
}

function sectionSingle(arguments) {
	// call sectionBase base class constructor
	this.super_constructor = sectionBase;
	this.super_constructor(arguments);

	// copy or overwrite default preferences
	for (var key in sectionprefs.sectionSingle) {
		if (key in arguments) {
			this[key] = arguments[key];
		}
		else {
			this[key] = sectionprefs.sectionSingle[key];
		}
	}
	
	// set no-default required data
	this.displayname = arguments.displayname;
	this.color = arguments.color;
	
	// construct html div containing section
	this.setupDiv();
}

/*
 * Routines for sectionFlat class
 */

// setupDiv()
// create div, boilerplate for this section

sectionFlat.prototype.setupDiv = function() {
	// node structure:
	// main div: has border, 2px left pad
	// |-div: 10px left pad, -10 px text-indent
	//   |-span/a: for header; add ':' if run-in
	//   |-div: 2px text-indent; inline if run-in, block otherwise
	//     |-span/a's for tags - add in addTag
	
	// main div
	this.div = document.createElement('div');
	
	// div below that
	this.subdiv = document.createElement('div');
	this.div.appendChild(this.subdiv);

	// span for header tag
	var headerSpan = document.createElement('span');
	this.subdiv.appendChild(headerSpan);

	// header tag itself
	this.headerTag = document.createElement('a');
	headerSpan.appendChild(this.headerTag);
	
	headertagname = this.displayname;
	
	if (this.displayPrefixInHeader) {
		headertagname += " (" + this.prefix + ")";
	}
	
	if (this.runinText) {
		headertagname += ":";
	}
	
	this.headerTag.appendChild(document.createTextNode(headertagname));
	
	// on hover, tell user what the section prefix is
	var titlestring = "Prefix: '" + this.prefix + "'";
	
	this.headerTag.setAttribute("title", titlestring);
	
	// div to contain tags
	this.tagDiv = document.createElement('div');
	this.subdiv.appendChild(this.tagDiv);

	// styling:

	// main div box model settings, colors
	if (globalprefs.drawSectionBorders) {
		this.div.style.borderTop = '1px solid';
		this.div.style.borderLeft = '1px solid';
		this.div.style.borderRight = '1px solid';
		this.div.style.borderColor = globalprefs.borderColor;
		this.div.style.paddingLeft = '2px';			
	}

	this.div.style.bottomMargin = '2px';
	
	// sub div padding, text indent
	this.subdiv.style.paddingLeft = '10px';
	this.subdiv.style.textIndent = '-10px';

	// header span/tag
	headerSpan.className = 'tasktag level' + this.headerSize;
	this.headerTag.style.color = this.color;
	
	// tag div: inline if runin, block + reset text-indent if not
	if (this.runinText) {
		this.tagDiv.style.display = 'inline';
	}
	else {
		this.tagDiv.style.display = 'block';
		this.tagDiv.style.textIndent = '2px';
	}

	// list of search strings for child tags
	this.searchlist = [];
}

// includeTag(tag)
// returns true if section should contain tag

sectionFlat.prototype.includeTag = function(tag) {
	var tagname = tag.getAttribute('tagname');
	
	// check that tag starts with prefix
	return (tagname.indexOf(this.prefix) == 0);
}

// addTag(tag)
// add given tag to this section

sectionFlat.prototype.addTag = function(tag) {
	// save original tag name
	var tagname = tag.getAttribute('tagname')

	// add tag to child-tag div
	this.tagDiv.appendChild(tag.parentNode);
	
	// insert thin space (\u2009) so that tag spans break across lines
	// zero-width space (\u200B) also present so Chrome breaks correctly
	// thin space may not work with Firefox 2
	this.tagDiv.appendChild(document.createTextNode('\u200B\u2009'));

	// set tag color
	tag.style.color = this.color;
	
	// strip prefix out of tags
	if (this.displayPrefixInTags == false) {
		tag.innerHTML = tagname.substring(this.prefix.length);
	}
	
	// if specified, convert _ to space, capitalize
	if (this.capAndSpaceTags) {
		tag.innerHTML = capitalizeAndSpace(tag.innerHTML);
	}
	
	// check for a rename_text attribute
	if (tag.getAttribute('rename_text')) {
		tag.innerHTML = tag.getAttribute('rename_text')
	}

	// add tag type, name to search string
	var searchstring = getTagSearchString(tag);

	if (searchstring) {
		this.searchlist.push(searchstring);
	}
	
	// DEBUG
	// deal with sizing (level##) in tag span, maybe
	// unsafeWindow.console.log("Tag '%s' is level '%d'", tagname, getTagSize(tag));
	
	// increase/decrease child tag size if needed
	if (getTagSize(tag) > this.maxChildSize) {
		setTagSize(tag, this.maxChildSize);
	}
	
	if (getTagSize(tag) < this.minChildSize) {
		setTagSize(tag, this.minChildSize);
	}
}

// assembleDiv()
// setup for div after tag processing

sectionFlat.prototype.assembleDiv = function() {	
	var onclickstring = "document.getElementById('listFilter').value=";
	var searchstring = this.searchlist.join(' or ');
	
	onclickstring += "'" + searchstring + "';";
	onclickstring += "control.updateListFilter();return false";
	
	this.headerTag.setAttribute("onclick", onclickstring);
}

// styleFinalBlock()
// style processing for section if last block in section list

sectionFlat.prototype.styleFinalBlock = function() {
	if (globalprefs.drawSectionBorders) {
		this.div.style.borderBottom = '1px solid';
		this.div.style.borderColor = globalprefs.borderColor;
	}
}

/*
 * Routines for sectionHierarchy class
 */

// setupDiv()
// create div, boilerplate for this section

sectionHierarchy.prototype.setupDiv = function() {
	// create containing div
	var wrapperDiv = document.createElement('div');
	this.div = wrapperDiv;

	// list to store child tags
	this.children = [];
}

// includeTag(tag)
// returns true if section should contain tag

sectionHierarchy.prototype.includeTag = function(tag) {
	var tagname = tag.getAttribute('tagname');
	
	// check that tag starts with prefix
	return (tagname.indexOf(this.prefix) == 0);
}

// addTag(tag)
// add given tag to this section

sectionHierarchy.prototype.addTag = function(tag) {
	var tagname = tag.getAttribute('tagname')

	// strip prefix off of tagname to get tagpath
	var tagpath = tagname.substring(this.prefix.length);
	
	// find, store display name if present
	var displayname = null;
	
	// check for a rename_text attribute
	if (tag.getAttribute('rename_text')) {
		displayname = tag.getAttribute('rename_text')
	}
	
	// split tagpath into tokens
	// TODO: make its own subroutine
	
	var re = new RegExp("[" + this.separators + "]+");
	var pathtokens = tagpath.split(re);
	
	if (pathtokens.length >= this.depth) {
		// more tokens than depth, so pack all overflow tokens into last one
		
		// keep first (depth - 1) tokens 
		var newtokens = pathtokens.slice(0, this.depth - 1);
		
		// new regexp to search for leading separators
		re = new RegExp("^[" + this.separators + "]+");
		var lasttoken = tagpath;
		
		// chop off first (depth - 1) tokens
		for (var i = 0; i < this.depth - 1; i++) {
			// chop
			lasttoken = lasttoken.substring(pathtokens[i].length);
			
			// separator characters now at front, kill them
			lasttoken = lasttoken.replace(re, '');
		}
		
		// add lasttoken to list of new tokens
		newtokens.push(lasttoken);
		pathtokens = newtokens;
	}
	
	var pathlength = pathtokens.length;
	
	// set display name to last token in list
	if (displayname == null) {
		displayname = pathtokens[pathlength - 1];
	}
	
	tag.innerHTML = displayname;
	
	// package tokens into tree structure in section
	var currentChildren = this.children;
	
	for ( var i = 0; i < pathlength; i++ ) {
		
		// find child node, if present
		var childIndex = null;
		var childrenlength = currentChildren.length;
		
		for (var j = 0; j < childrenlength; j++) {
			if (currentChildren[j].name == pathtokens[i]) {
				childIndex = j;
				break;
			}
		}
		
		if (childIndex != null) {
			currentChildren = currentChildren[childIndex].children;
		}
		else {
			// create new child in tree
			var newchild = { name: pathtokens[i], div: null, tag: null, children: [] };
			currentChildren.push(newchild);
			currentChildren = newchild.children;
			
			// add tag to new child node's tag if last in token list
			if (i == pathlength - 1) {
				newchild.tag = tag;
			}
		}
	}
}

// assembleDiv()
// setup for div after tag processing

sectionHierarchy.prototype.assembleDiv = function() {
	var topDiv = this.div;
	var topChildren = this.children;
	var childrenlength = topChildren.length;
	
	for (var i = 0; i < childrenlength; i++) {
		// pick color for top-level node and its children
		var topNodeColor = this.colors[i % this.colors.length];
		
		// process nodes recursively
		this.assembleNodeDiv(topChildren[i], 1, topNodeColor);
		var childDiv = topChildren[i].div;
		
		// draw borders around each top-level section
		if (globalprefs.drawSectionBorders) {
			// make a div just for the border
			var borderDiv = document.createElement('div');
			borderDiv.style.borderTop = '1px solid';
			borderDiv.style.borderLeft = '1px solid';
			borderDiv.style.borderRight = '1px solid';
			borderDiv.style.borderColor = globalprefs.borderColor;
			borderDiv.style.paddingLeft = '2px';
			
			// add the top-level node's div to the border div
			borderDiv.appendChild(childDiv);
			
			// add the border div to the hierarchy section div
			topDiv.appendChild(borderDiv);		
		}
		else {
			// just add the top-level node's div to the hierarchy div
			topDiv.appendChild(childDiv);
		}
	}
}

// assembleNodeDiv(node, depth, color)
// helper routine for hierarchy node traversal

sectionHierarchy.prototype.assembleNodeDiv = function(node, depth, color) {
	// make sublevel for node
	node.div = document.createElement("div");
	
	if (node.tag != null) {
		// set color for tag anchor, insert containing span into node's div
		node.tag.style.color = color;
		node.div.appendChild(node.tag.parentNode);
	}
	else {
		// create new tag for this sublevel
		var tagspan = document.createElement('span');
		node.tag = document.createElement('a');
		node.tag.style.color = color;
		tagspan.appendChild(node.tag);
		node.tag.appendChild(document.createTextNode(node.name));
		node.div.appendChild(tagspan);

		// TODO: on click, search for all child nodes?
	}

	// adjust style of tag anchor and span
	// set padding around each tag to 0
	// RTM sets right padding on each tag anchor to 5px as a separator
	node.tag.style.paddingRight = "0px";
	setTagSize(node.tag, this.sizes[depth - 1]);

	if (depth == this.depth) {
		// at the lowest depth in hierarchy
		// no children to process
	}
	else if (depth == this.depth - 1) {
		// in second-lowest stage of hierarchy
		// assemble children as (this tag): (child tag) (child tag) ...
		//   so that (this tag) has a hanging indent
		if (node.children.length > 0) {
			node.tag.appendChild(document.createTextNode(":"));
			node.tag.parentNode.style.paddingRight = "5px";
			node.div.style.paddingLeft = "10px";
			node.div.style.textIndent = "-10px";
			node.div.style.color = color;
			
			// inline div to store the leaf tags
			var subdiv = document.createElement('div');
			subdiv.style.display = 'inline';
			node.div.appendChild(subdiv);
			
			// string for middle-dot separator
			var sepdot = "\u200B\u2009\u00b7\u200B\u2009";
			
			var childrenlength = node.children.length;
			
			for (var i = 0; i < childrenlength; i++) {
				//
				this.assembleNodeDiv(node.children[i], depth + 1, color);
				
				if (i > 0) {
					// add central dot to separate leaf nodes
					subdiv.appendChild(document.createTextNode(sepdot));
				}
				
				// add the tag span of the leaf
				subdiv.appendChild(node.children[i].tag.parentNode);
			}
		}		
	}
	else {
		// in at least third level up
		// TODO: set indent width as hierarchy option?
		// create divs for children
		var childrenlength = node.children.length;
		
		for (var i = 0; i < childrenlength; i++) {
			this.assembleNodeDiv(node.children[i], depth + 1, color);
			node.children[i].div.style.marginLeft = "10px";
			node.div.appendChild(node.children[i].div)
		}
	}
}

// styleFinalBlock()
// style processing for section if last block in section list

sectionHierarchy.prototype.styleFinalBlock = function() {
	// draw border line at bottom
	if (globalprefs.drawSectionBorders) {
		if (this.children.length > 0) {
			var lastChild = this.children[this.children.length - 1];
			lastChild.div.style.borderBottom = '1px solid';
			lastChild.div.style.borderColor = globalprefs.borderColor;
		}
		else {
			this.div.style.borderBottom = '1px solid';
			this.div.style.borderColor = globalprefs.borderColor;
		}
	}
}

/*
 * Routines for sectionSingle class
 */

// setupDiv()
// create div, boilerplate for this section

sectionSingle.prototype.setupDiv = function() {
	// create containing div
	this.div = document.createElement('div');

	// borders
	if (globalprefs.drawSectionBorders) {
		this.div.style.borderTop = '1px solid';
		this.div.style.borderLeft = '1px solid';
		this.div.style.borderRight = '1px solid';
		this.div.style.borderColor = globalprefs.borderColor;
		this.div.style.paddingLeft = '2px';			
	}

	this.div.style.bottomMargin = '2px';
}

// includeTag(tag)
// returns true if section should contain tag

sectionSingle.prototype.includeTag = function(tag) {
	// check that tag is exactly the prefix
	return (tag.getAttribute('tagname') == this.prefix);
}

// addTag(tag)
// add given tag to this section

sectionSingle.prototype.addTag = function(tag) {
	// take tag, replace name
	this.tag = tag;
	this.tag.innerHTML = this.displayname;
	
	// add original prefix if specified
	if (this.displayOriginalName) {
		this.tag.innerHTML += " (" + this.prefix + ")";
	}
	
	// check for a rename_text attribute
	// will override rename settings
	if (this.tag.getAttribute('rename_text')) {
		this.tag.innerHTML = this.tag.getAttribute('rename_text')
	}
	
	// set tag style
	this.tag.style.color = this.color;
	setTagSize(this.tag, this.headerSize);
	
	this.div.appendChild(this.tag.parentNode);
}

// assembleDiv()
// setup for div after tag processing

sectionSingle.prototype.assembleDiv = function() {
	// nothing to do
}

// styleFinalBlock()
// style processing for section if last block in section list

sectionSingle.prototype.styleFinalBlock = function() {
	// draw border line at bottom
	if (globalprefs.drawSectionBorders) {
		this.div.style.borderBottom = '1px solid';
		this.div.style.borderColor = globalprefs.borderColor;
	}
}

/*
 * Utility routines
 */

// constructSections
// construct section objects from specification

function constructSections(sectionargumentslist) {
	
	var sectionobjlist = [];
	var sectionlength = sectionargumentslist.length;
	
	for (var i = 0; i < sectionlength; i++) {
		var secargs = sectionargumentslist[i];
		var newsection = new secargs.type(secargs);
		sectionobjlist.push(newsection);
	}
	
	return sectionobjlist;
}

// determine if an array contains an element

Array.prototype.contains = function (element)  {
	var len = this.length;
	for (var i = 0; i < len; i++) {
    	if (this[i] == element)  {
			return true;
        }
    }
    return false;
};

// convert _ to spaces, capitalize remaining words

function capitalizeAndSpace(str) {
	var newstr = str.replace(/_+/g, ' ');
	
    newstr = newstr.replace(/\w+/g, function(a){
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });

    return newstr;
}

var waitingTask;

function handleChange() {
	if (waitingTask) {
		window.clearTimeout(waitingTask);
	}
	waitingTask = window.setTimeout(processCloud, 100, sections);
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

// get type (list, location, tag) of tag element

function getTagType(tag) {
	var classname = tag.parentNode.className;

	var result = classname.match(/\w+tag/);
	
	if (result == null) {
		return false;
	}
	
	var tagstring = result[0];
	
	if (tagstring == "tasktag") {
		return "tag";
	}
	else if (tagstring == "listtag") {
		return "list";
	}
	else if (tagstring == "locationtag") {
		return "location";
	}
	else {
		return false;
	}
}

// get RTM size of tag as integer

function getTagSize(tag) {
	var classname = tag.parentNode.className;
	var re = /level(\d+)/;

	var result = classname.match(re);
	
	if (result == null) {
		return false;
	}
	
	return parseInt(result[1]);
}

// set RTM size of tag

function setTagSize(tag, newsize) {
	var classname = tag.parentNode.className;
	var newlevelclass = "level" + newsize;
	if (classname.match(/level\d+/)) {
		tag.parentNode.className = classname.replace(/level\d+/, newlevelclass);
	}
	else { 
		tag.parentNode.className = classname + " " + newlevelclass;
	}
}

// build search string for given tag

function getTagSearchString(tag) {
	var searchstring = '';
	
	var tagtype = getTagType(tag);
	var tagname = tag.getAttribute('orig_tagname');
	
	// if tagtype found, build into search string
	if (tagtype) {
		searchstring = tagtype + ":";
	}
	
	// wrap name in quotes if contains a space
	if (tagname.match(/\s/)) {
		searchstring += "\\\"" + tagname + "\\\"";
	}
	else {
		searchstring += tagname;
	}
	
	return searchstring;
}

// match all tags in cloud to section objects

function collectAndMatchTags(cloud, sectionlist) {
	// cloud as context, collect all anchors inside spans
	var xpathStr = "./span/a"; 
	allTags = document.evaluate(xpathStr, cloud, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		
	for (var tagIndex = 0; tagIndex < allTags.snapshotLength; tagIndex++) {
	
		var tag = allTags.snapshotItem(tagIndex);
		var orig_tagname = null;
		
		// store original name in tag or retrieve from tag
		// because we might change the HTML representation later

		if (tag.getAttribute('orig_tagname')) {
			orig_tagname = tag.getAttribute('orig_tagname');
		} 
		else {
			orig_tagname = tag.innerHTML
			tag.setAttribute('orig_tagname', orig_tagname);
		}
		
		// remove any tags we decided to hide
		var tagname = orig_tagname;
		
		if (globalprefs.matchTagCase == false) {
			tagname = tagname.toLowerCase();
		}
		
		if (globalprefs.hiddenTagsNormalized.contains(tagname)) {
			tag.parentNode.parentNode.removeChild(tag.parentNode);
			continue;
		}
		
		// check for rename info
		addRenameInfoToTag(tag);
		
		// try to match tag to a section
		var matchingSection = matchTagToSection(sectionlist, tag);
		
		// if we matched, add the tag to that section
		if (matchingSection) {
			matchingSection.addTag(tag);
		}
		else {
			// remove any tags not falling into our sections
			// should happen only if no section defined with empty prefix
			tag.parentNode.parentNode.removeChild(tag.parentNode);
		}
	}
}

// determine which section a tag belongs to
// returns first section that matches, so order matters in section list

function matchTagToSection(sectionlist, tag) {
	
	var sectionlength = sectionlist.length;
	
	for (var i = 0; i < sectionlength; i++) {
		if (sectionlist[i].includeTag(tag)) {
			return sectionlist[i];
		}
	}
	
	return false;
}

// function to sort sections by decreasing displayorder

function sortSection(a, b) {
	if (a.displayOrder < b.displayOrder)
		return 1;
	if (a.displayOrder > b.displayOrder)
		return -1;
	return 0;
}

// function to check for tag renaming:
// - check for [[...]] rename block in tag name, remove if present
// - match remaining tag name to global rename list
//
// effects:
// - stores tag name in 'tagname' attribute in a element
// - stores rename text in 'rename_text' attribute

function addRenameInfoToTag(tag) {
	var tagname = tag.getAttribute('orig_tagname');
	var rename_text = null;
	
	// check for a [[...]] rename block at end of tag name
	var result = tagname.match(/\[\[.*\]\]\s*$/);
	
	if (result) {
		// isolate the text in the block
		rename_text = result[0].trim();
		rename_text = rename_text.substring(2, rename_text.length - 2);
		
		// remove from tag name
		tagname = tagname.substring(0, tagname.length - result[0].length);
		tagname = tagname.trim();
	}
	else {
		// no [[...]] block, so clear off spaces, check in global rename list
		tagname = tagname.trim();
		
		if (globalprefs.matchTagCase == false) {
			tagname = tagname.toLowerCase();
		}
		
		if (globalprefs.renameTagsNormalized[tagname]) {
			rename_text = globalprefs.renameTagsNormalized[tagname];
		}
		
	}
	
	tag.setAttribute('tagname', tagname);
	
	if (rename_text != null) {
		tag.setAttribute('rename_text', rename_text);
	}
	
	return (rename_text == null);
}

// process tag cloud given list of section specifications

function processCloud(sectionlistconfig) {
	// DEBUG
	// unsafeWindow.console.log("Processing Cloud in RTM Test...")
	
	// stop listening for tag cloud changes
	listenForTagChanges(false);
	
	// DEBUG
	// unsafeWindow.console.log("Config");	
	// unsafeWindow.console.log(sectionlistconfig);
	// unsafeWindow.console.log("Global");	
	// unsafeWindow.console.log(sections);
	
	// build section objects
	var sectionlist = constructSections(sections);
	
	// try to grab the tag cloud
	var cloud = document.getElementById('taskcloudcontent');
		
	// if we got the tag cloud
	if (cloud) {
		// process all tags in cloud: add to approp section
		collectAndMatchTags(cloud, sectionlist);

		// assemble section divs into #taskcloudcontent	
		var displayedSections = [];

		var sectionlength = sectionlist.length;

		// build each section, push those to be displayed onto list
		for (var i = 0; i < sectionlength; i++) {
			
			// build the section
			sectionlist[i].assembleDiv();

			// keep those we want to display
			if (sectionlist[i].hide == false) {
				displayedSections.push(sectionlist[i]);
			}
		}

		var displayedsectionlength = displayedSections.length;
				
		// sort sections by decreasing displayorder
		for (var i = 0; i < displayedsectionlength; i++) {
			
			// tweak display order values 
			// since sort apparently does not always preserve ordering
			// - expand out by length of list
			// - subtract position in list (sections sorted high to low values)
			displayedSections[i].displayOrder *= displayedsectionlength;
			displayedSections[i].displayOrder -= i;
		}
		
		displayedSections.sort(sortSection);
		
		// add the sections to be displayed to the cloud
		for (var i = 0; i < displayedsectionlength; i++) {
			cloud.appendChild(displayedSections[i].div);

			// do extra style processing if this is the last section
			if (i == displayedsectionlength - 1) {
				displayedSections[i].styleFinalBlock();
			}
		}

		// copy #taskcloudcontent html, handlers to #taskcloudcontent_copy
		// #taskcloudcontent_copy is the cloud on the Tasks tab
		var copy = document.getElementById("taskcloudcontent_copy");

		if (copy) {
			copy.innerHTML = cloud.innerHTML;
		}
	}
	
	// re-hook listenForTagChanges
	listenForTagChanges(true);
}

// Convert hiddenTags entries to lower case if case sensitivity is off

function normalizeHiddenTags() {
	// new array for normalized tags
	globalprefs.hiddenTagsNormalized = [];
	
	// iterate through the tags to hide
	var len = globalprefs.hiddenTags.length;
	for (var i = 0; i < len; i++) {
		var newkey = globalprefs.hiddenTags[i];
		
		// if matching not case sensitive, convert to lower case
		if (globalprefs.matchTagCase == false) {
			newkey = newkey.toLowerCase();
		}
		
		// store key in normalized array
		globalprefs.hiddenTagsNormalized.push(newkey);
	}
	
	return;
}

// Convert renameTags keys to lower case if case sensitivity is off

function normalizeRenameTags() {
	// new dictionary for normalized tags
	globalprefs.renameTagsNormalized = {};
	
	// iterate through the tags to rename
	for (var key in globalprefs.renameTags) {
		var newkey = key;
		
		// if matching not case sensitive, convert to lower case
		if (globalprefs.matchTagCase == false) {
			newkey = key.toLowerCase();
		}
		
		// store key-value pair in normalized dictionary
		var value = globalprefs.renameTags[key];
		globalprefs.renameTagsNormalized[newkey] = value;
	}
	
	return;
}

// start by processing global preference settings
// - make new rename and hidden lists with tags converted to lower case
normalizeHiddenTags();
normalizeRenameTags();

// then process the cloud with our section list
processCloud(sections);

// de-hook handler when we unload the page
window.addEventListener('unload', 
                        function() { listenForTagChanges(false); }, false);

/*
 ************************************************
 Miscellaneous Display Changes
 ************************************************
 */

// stop sidebar animation
// adapted from http://userscripts.org/scripts/show/7825

function DisableSidebarAnimation() {
	var L = unsafeWindow.document.getElementById("detailsbox");
	L.moveDiv = function () {
		var L = unsafeWindow.document.getElementById("detailsbox");
		L.style.top = window.pageYOffset+"px";
		unsafeWindow.Autocomplete.handleWindowResize();
	};
}

// fixes sidebar position

function FixSidebar() {
	unsafeWindow.document.getElementById("detailsbox").style.position = "static"
}

/*
  Hides cow graphic and adjusts status box position

  Adapted from the RememberTheMilkEnhanced script:
  http://userscripts.org/scripts/show/26057
*/

function HideRTMCowGraphic() {
	// Hide cow graphic
	document.getElementById("appheaderlogo").style.display = "none";
	
	// Reduce padding on status bar div so left edge aligns with list box
	document.getElementById("statusbox").style.paddingLeft = "9px";	
}

HideRTMCowGraphic()
// DisableSidebarAnimation()
FixSidebar()

/*
 ************************************************
 Ordinary List Hiding
 ************************************************
 */


/*
  Much of this code copied or adapted from the RememberTheMilkEnhanced script:
  http://userscripts.org/scripts/show/26057
*/

// TODO: reimplement using XPath?

var doNotRemoveLists = ["Inbox", "Sent"];

RemoveListHandler = function() {
	var listtabs = document.getElementById("listtabs");
	var ul = listtabs.childNodes[0];
	var listtabslength = ul.childNodes.length;

	for (var i = 0; i < listtabslength; i++) {
		var tab = ul.childNodes[i];
		var txt = tab.childNodes[0].innerHTML;
		if (tab.className.indexOf("xtab_smartlist") == -1 &&
			doNotRemoveLists.contains(txt) == false)
		{
			//tab.setAttribute('class','xtab_smartlist');
			tab.style.display = "none";
		}
	}
	
	ListenForListTabChanges(true);
}

ListenForListTabChanges = function(listen)
{
	var listtabs = document.getElementById("listtabs");
	
	if (listtabs) {
		if (listen) {
			listtabs.addEventListener("DOMNodeInserted", RemoveListHandler, false);
			listtabs.addEventListener("DOMNodeRemoved", RemoveListHandler, false);
		} else {
			listtabs.removeEventListener("DOMNodeInserted", RemoveListHandler, false);
			listtabs.removeEventListener("DOMNodeRemoved", RemoveListHandler, false);
		}
	}
}

RemoveLists = function() {
	//addGlobalStyle('#listtabs ul li { display:none;}');
	//addGlobalStyle('#listtabs ul li.xtab_smartlist,#listtabs ul li.xtab_exclude,#listtabs ul li.xtab_selected { display:block;}');
	ListenForListTabChanges(true);
}

RemoveLists()

window.addEventListener('unload', function() {
	ListenForListTabChanges(false);
}, false);

