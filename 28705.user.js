// ==UserScript==
// @name          AutoLink (Modified for Twitter)
// @namespace     http://www.squarefree.com/userscripts
// @description   Turns plain text URLs, email addresses, and Twitter links (@twitterID) into links. You can add new filters if you know how to use JavaScript regular expressions. (Only Twitter links are new in this modified version.)
// @include *
// @exclude http://www.vox.com/compose/
// @exclude *contacts
// ==/UserScript==

/*

  Please note - this is a SUBSET of the AutoLink script provided by Jesse Ruderman's AutoLink greasemonkey script - For the full functional version of that script, please go to http://www.squarefree.com/2005/05/22/autolink/

  (Note: Jesse Ruderman's version will not support @twitter style links)

  If this interferes with a webpage you visit, add another @exclude statement above or let me know at ross.autolink@rossotron.com and I'll add it to the script.

  Included filters:

    * Plain text link
    * Email address
    * Twitter links (format @twitterID)
    
  Features:

    * You can add new filters if you know how to use JavaScript regular expressions.
    * Works even on pages with dynamic content, such as Gmail.
    * Avoids slowing down Firefox.  (Calls setTimeout after working for a while.)
    * Avoids creating self-links.

  Warnings:

    * This triggers a memory leak bug in Firefox (bug 241518).
    * This triggers a dataloss bug in Firefox when editing long Wikipedia pages (bug 315997)

  Author: Jesse Ruderman - http://www.squarefree.com/
  Adapted: Ross Goldberg - http://www.rossotron.com/

  Test page: http://www.rossotron.com/public/gm/autolink/autolink-test.html

  License: MPL, GPL, LGPL.

  Version history:

    2008-07-11: Updated exclude list to exclude Gmail's "contacts" page so as to avoid changing email links in that view

    2008-07-01: Fixed regular expression for Twitter AutoLink to ignore @twitterID if it has a dash in it (e.g. @dash-not-allowed) - Thanks to Jeremy Fujimoto-Johnson for the suggested fix!

    2005-05-25 00:30: Fixed a bug where inserting a leaf made AutoLink re-examine 
                      the entire document from that leaf on.  This slowed down
                      the DHTML at http://www.tiddlywiki.com/, for example.

    2005-05-23 00:20: Use better ISBN regexp from Phil Ringnalda.
                      Exclude "Invite foo@bar.com to Gmail" fake links on Gmail.

    2005-05-22 05:30: Make skipping work correctly.

    2005-05-22 05:00: Use fewer deprecated features of regular expressions.  See
                        http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:RegExp and
                        http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Deprecated_Features

    2005-05-22 01:00: Initial release. See http://www.squarefree.com/2005/05/22/autolink/.

*/


const timeBefore = new Date();


/***********************************
 *             Filters             *
 ***********************************/

/*

  I encourage you to create new filters in your copy of AutoLink. 

  Filters have three fields:

   * name (string)
       Used for tooltip on created links, e.g. "Link added by AutoLink filter: Plain Text Links".
       Used for class attribute of created links, e.g. "autolink autolink-plain-text-links".

   * regexp (regular expression)
       The entire text matching the regular expression will be linked.
       Must be global (/g).
       May be case-insensitive (/i).

   * href (function)
       Arguments: |match|, an output of regexp.exec.  (May also treat RegExp.leftContext, etc. as inputs.)
       Returns: The URL to be used for a link, or |null| to cancel link creation.
       Must not use filter.regexp, but may use other regular expressions.
    
  This regular expression reference might be useful:
  http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:RegExp
  
  If multiple filters match a string, the first filter will win.

*/


const filters = [
  {
    name: "Plain text link",
    regexp: /https?\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!]/g,
    href: function(match) { return match[0]; }
  },
  {
    name: "Email address",
    regexp: /[a-z0-9_\-+=.]+@[a-z0-9\-]+(\.[a-z0-9-]+)+/ig,
    href: function(match) { return "mailto:" + match[0]; }
  },
  {
    name: "Twitter link",
	// If anyone wants to help me with my RegExp so I can avoid
	// malformed@emailaddress, please email me
	// at ross.autolink@rossotron.com 
	regexp: /\@([a-z0-9\_]+)(?![-a-z0-9\_])/ig,
    href: function(match) { return "http://www.twitter.com/" + match[1]; }
  }
];


/***********************************
 *  Helper functions for filters   *
 ***********************************/

function digits(s)
{
  return s.replace(/[^0-9]/g, "");
}

function alphanumerics(s)
{
  return s.replace(/[^0-9a-z]/ig, "");
}


/***********************************
 *           Link styling          *
 ***********************************/
    
/*

  You can make links generated by AutoLink look different from normal links
  by editing styleLink below and/or by setting up user style sheet rules.
  
  Example: on squarefree.com, make autolinked plain text links orange. (Firefox trunk only.)
  
    @-moz-document domain(squarefree.com) { 
      .autolink-plain-text-link { color: orange ! important; }
    }
      
*/

function styleLink(a, filter)
{
  // Add back in if you want a border on your links
  // a.style.borderBottom = "1px solid orange";
}


/***********************************
 *           Fix filters           *
 ***********************************/

function fixFilters()
{
  var i, r;
  for (i = 0; r = filters[i]; ++i) {
    // lowercase, and replace each run of non-alphanumerics with a single hyphen
    r.classNamePart = r.name.toLowerCase().replace(/[^0-9a-z]+/ig, "-");
    if(!r.regexp.global)
      alert("AutoLink filter " + r.name + " is not global! This will break stuff!");
  }
}
fixFilters();


/***********************************
 *      When and where to run      *
 ***********************************/

var moddingDOM = false;

window.addEventListener("load", init, false);
function init()
{
  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  setTimeout(go, 50, document.body);
}

// This makes it work at Gmail.
// 20% performance penalty on a plain text file with a link on almost every line.
// Tiny performance penalty on pages with few automatically added links.
function nodeInserted(e)
{
  // our own modifications should not trigger this.
  // (we don't want our regular expression objects getting confused)
  // (we want better control over when we recurse)
  
  //GM_log("Inserted: " + e.target);
  
  if (!moddingDOM)
    go(e.target);
}



/***********************************
 *          DOM traversal          *
 ***********************************/


/*

  This script uses manual DOM traversal, in an iterative way without a stack!

  Advantages of snapshot XPath:
    * Much less code
    * 20-40% faster
    * May be possible to get another speed boost by including the regexp in the XPath expression - http://www.developer.com/xml/article.php/10929_3344421_3
    * All the cool people are using it
  
  Advantages of manual DOM traversal:
    * Lets us stop+continue (snapshot xpath doesn't let us)
    * Lets us modify DOM in strange ways without worrying.
    * Easier to control which elements we recurse into.

*/


// Ignore all children of these elements.
const skippedElements = { 
  a:        true, // keeps us from screwing with existing links. keeps us from recursing to death :)
  noscript: true, // noscript has uninterpreted, unshown text children; don't waste time+sanity there.
  head:     true,
  script:   true,
  style:    true,
  textarea: true,
  label:    true,
  select:   true,
  button:   true
}

const gmail = (location.host == "gmail.google.com");

function skipChildren(node)
{
  if (node.tagName)  // !
  {
    if (skippedElements[node.tagName.toLowerCase()]) {
      return true;
    }
    
    if (gmail) {
      if (node.className == "ac") // gmail autocomplete (fake dropdown)
        return true;
      if (node.className == "ilc sxs") // invite foo to gmail (fake link/button)
        return true;
    }
  }

  return false;
}


function go(traversalRoot)
{
  var m;
  
  // Ensure we're not already in a forbidden element.
  for (m = traversalRoot; m != undefined; m = m.parentNode) {
    if (skipChildren(m)) {
      return;
    }
  }

  // work around bug, or in case previous user scripts did crazy stuff
  traversalRoot.normalize();

  function cont(n, didChildren)
  {
    var k = 0; // split work into chunks so Firefox doesn't freeze
    var q;
    
    while (n && k < 100)
    {
      ++k;
    
      // Do stuff at this node
      if (!didChildren && n.nodeType == 3) {
        if((q = runFiltersOnTextNode(n))) {
          n = q[0];

          // if there were changes, run filters again on the new text node that's here          
          if (q[1]) 
            continue;
        }
      }
  
      // Traverse to the "next" node in depth-first order

      if (!n.firstChild)
        didChildren = true;
  
      if (didChildren && n == traversalRoot)
        break;
      else if (!didChildren && n.firstChild && !skipChildren(n)) {
        n = n.firstChild;
        // didChildren is already false and should stay false
      }
      else {
        if (n.nextSibling) {
          n = n.nextSibling;
          didChildren = false;
        }
        else {
          n = n.parentNode;
          didChildren = true;
        }
      }
    } // end while
  
    if (!n) {
      //GM_log("Odd. traversalRoot was " + traversalRoot);
    }
    else if (n == traversalRoot) {
      //GM_log("Done");
      //alert("AutoLink time: " + (new Date() - timeBefore))
    }
    else {
      // Continue after 10ms.
      //GM_log("will have to continue");
      setTimeout(cont, 10, n, didChildren);
    }
    
  } // end function cont
  
  cont(traversalRoot, false);
}


/***********************************
 *         Running filters         *
 ***********************************/

// runFiltersOnTextNode
// Return: node at which to continue traversal, or |null| to mean no changes were made.

function runFiltersOnTextNode(node)
{
  // Too many variables.  Good hint that I need to split this function up :P
  var source, j, regexp, match, lastLastIndex, k, filter, href, anyChanges; // things
  var used, unused, firstUnused, lastUnused, a, parent, nextSibling; // nodes
  
  source = node.data;
  
  anyChanges = false;

  // runFiltersOnTextNode has its own do-too-much-at-once avoider thingie.
  // assumption: if there is one text node with a lot of matches,
  // it's more important to finish quickly than be transparent.
  // (e.g. plain text file FULL of links)
  // assumption: 40 * 100 = 140.
  k=0;
  
  for (j = 0; filter = filters[j]; ++j) {
    regexp = filter.regexp;
    
    if (regexp.test(source)) {

      parent = node.parentNode;
      nextSibling = node.nextSibling;

      
      regexp.lastIndex = 0;
      firstUnused = null;
      
      // Optimization from the linkify that came with Greasemonkey(?):
      // instead of splitting a text node multiple times, take advantage
      // of global regexps and substring.

      for (match = null, lastLastIndex = 0; k < 40 && (match = regexp.exec(source)); ) {
      
        // this should happen first, so RegExp.foo is still good :)
        href = genLink(filter, match); 
        
        if (href != null && href != location.href) { 
          ++k;

          unused = document.createTextNode(source.substring(lastLastIndex, match.index));
          if (!anyChanges) {
            anyChanges = true;
            parent.removeChild(node);
            firstUnused = unused;
            moddingDOM = true;
          }
          parent.insertBefore(unused, nextSibling);

          used = document.createTextNode(match[0])
  
          a = document.createElement("a");
          a.href = href;
//          a.title = "Link added by AutoLink filter: " + filter.name;
//          a.className = "autolink autolink-" + filter.classNamePart;
  
          styleLink(a, filter);
  
          a.appendChild(used);
          parent.insertBefore(a, nextSibling);
          
          lastLastIndex = regexp.lastIndex;
        }

      }

      if (anyChanges) {
        lastUnused = document.createTextNode(source.substring(lastLastIndex));
        parent.insertBefore(lastUnused, nextSibling);
        moddingDOM = false;
        return [firstUnused, true]
      }
      
      return [node, false];
    }
  }
  return null;
}

function genLink(filter, match)
{
  try {
    return filter.href(match); 
  }
  catch(er) {
    return "data:text/plain,Error running AutoLink function for filter: " + encodeURIComponent(filter.name) + "%0A%0A" + encodeURIComponent(er);
  }
}
