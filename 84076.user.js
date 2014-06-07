// ==UserScript==
// @name           Clean DOM
// @namespace      koshiua.userscripts.org
// @description    Remove hidden DOM elements (with display:none) and comments
// @include        *
// ==/UserScript==

// More precisely it remove ELEMENT_NODEs for which computed style "display" == 'none'
// BUGS: stats can lie if you run this script twice without page reload

//----- Configurable -----------------
// Preserve these tags:
var TagRemoveIgnoreString = 'HEAD META TITLE STYLE';  // SCRIPT
// RemoveComments - remove HTML <!-- --> comments
// 0 - dont remove
// 1 - remove only template designer's comments (single word with optional start/end)
//     such as <!--header start-->, <!--header end--> or <!--someblock-->, <!--/someblock-->
// 2 - remove every html comment
var RemoveComments = 1;
var ShowStats = 1;
var ShowPreservedStats = 1; // Show which tags from TagRemoveIgnoreString was preserved
var RecursionLimit = 1000; // Dont follow too deep
var debug = 0;  // Some output to console.log
//------------------------------------

GM_registerMenuCommand("Clean DOM", RemoveHidden, "c", "control  shift", "c"); // alt

// Statistics object
var Stats = {
  totalremoved: 0,
  totalignored: 0,
  removed: {},
  ignored: {},
  commentsremoved: 0,
  commentsremovedbytes: 0,
  commentspreserved: 0,
  commentspreservedbytes: 0,
  
  removecomment: function(node) {
    this.commentsremoved += 1;
    this.commentsremovedbytes += node.nodeValue.length;
  },

  preservecomment: function(node) {
    this.commentspreserved += 1;
    this.commentspreservedbytes += node.nodeValue.length;
  },

  remove: function(node) {
    this.totalremoved += 1;
    if (this.removed[node.nodeName] == null)
      this.removed[node.nodeName] = 1;
    else
      this.removed[node.nodeName] += 1;
  },

  ignore: function(node) {
    this.totalignored += 1;
    if (this.ignored[node.nodeName] == null)
      this.ignored[node.nodeName] = 1;
    else
      this.ignored[node.nodeName] += 1;
  }
}

var RecursionLevel = 0;
var TotalTraversed = 0;
var TagRemoveIgnored = {};

function RemoveHidden() {
  var tmptags = TagRemoveIgnoreString.split(' ');
  for (var i in tmptags) {
    TagRemoveIgnored[tmptags[i]] = 0;
  }
  
  Traversal(document.documentElement);

  // Show stats
  if (ShowStats) {
    var whatremoved = '';
    for (var tagname in Stats.removed) {
      //console.log(' Removed ' + tagname + ' - ' + removed[tagname]);
      whatremoved += '  ' + tagname + ' - ' + Stats.removed[tagname] + "\n";
    }
    var whatnotremoved = '';
    for (var tagname in Stats.ignored) {  //TagRemoveIgnored
      whatnotremoved += '  ' + tagname + ' - ' + Stats.ignored[tagname] + "\n";
    }
    
    //console.log(whatremoved + 'Total removed ' + totalremoved);
    //alert("Removed " + totalremoved + " elements (from "+odditems.length+"):\n" + whatremoved);

    //console.dir(Stats); 
    var statmsg = 'Traversed ' + TotalTraversed + " elements\n";
    if (Stats.commentsremoved)
      statmsg += "Deleted " + Stats.commentsremovedbytes 
      + " (" + (Stats.commentsremoved*7 + Stats.commentsremovedbytes) + ")"
      + " chars in " + Stats.commentsremoved + " comments.\n";
    if (Stats.commentspreserved)
      statmsg += "Preserved " + Stats.commentspreservedbytes 
      + " (" + (Stats.commentspreserved*7 + Stats.commentspreservedbytes) + ")"
      + " chars in " + Stats.commentspreserved + " comments.\n";
    statmsg += "\nRemoved " + Stats.totalremoved + " elements:\n" + whatremoved;
    if (ShowPreservedStats)
      statmsg += "Preserved: \n" + whatnotremoved;

    alert(statmsg);
  }
}


function Traversal(node) {
  if (RecursionLevel > RecursionLimit) {
    console.log('Recursion Limit reached');
    return;
  }

  var children = node.childNodes;
  TotalTraversed++;
  for (var i=0; i < children.length && i >= 0; i++) {
    // do something with each child as children[i]
    // NOTE: List is live, Adding or removing children will change the list
    RecursionLevel++;
    Traversal(children[i]);
    RecursionLevel--;

    // COMMENT_NODE
    if (children[i].nodeType == 8) {
      if (RemoveComments==2 || (RemoveComments==1 && 
          children[i].nodeValue.search(/^\s*\/?[-0-9a-z._]+( end| start| begin)?\s*$/i) >= 0)) {  // ?? what about IE "[if " ??
        // Delete comment
        Stats.removecomment(children[i]);
        if(debug) console.log('Remove comment: ' + children[i].nodeValue);
        node.removeChild(children[i]);
        i--;  // correct loop index for live list
        continue;
      } else {
        Stats.preservecomment(children[i]);
        if(debug) console.log('Comment: ' + children[i].nodeValue);
      }
      //console.dir(children[i]);

    // TEXT_NODE
    } else if (children[i].nodeType == 3) {
      //if (children[i].isElementContentWhitespace == true)
        //console.log(RecursionLevel + ' !! ' + children[i].nodeType + children[i].nodeValue);

    // ELEMENT_NODE
    } else if (children[i].nodeType == 1) {
      var cs = window.getComputedStyle(children[i], null);
      if (cs.getPropertyValue("display") == 'none') {
        if (TagRemoveIgnored[children[i].nodeName] != null) {
          // Dont remove some predefined tags
          Stats.ignore(children[i]);
        } else {
          // Remove this hidden element
          Stats.remove(children[i]);
          node.removeChild(children[i]);
          i--;  // correct loop index
          continue;
        }
      }

    } else {
      if(debug) console.log(RecursionLevel + ' !! ' + children[i].nodeType + children[i].nodeValue);
    }
  }
}

// Docs ;)
/*
  ELEMENT_NODE                = 1;
  ATTRIBUTE_NODE              = 2;
  TEXT_NODE                   = 3;
  CDATA_SECTION_NODE          = 4;
  ENTITY_REFERENCE_NODE       = 5;
  ENTITY_NODE                 = 6;
  PROCESSING_INSTRUCTION_NODE = 7;
  COMMENT_NODE                = 8;
  DOCUMENT_NODE               = 9;
  DOCUMENT_TYPE_NODE          = 10;
  DOCUMENT_FRAGMENT_NODE      = 11;
  NOTATION_NODE               = 12;
 */

