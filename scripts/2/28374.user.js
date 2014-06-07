// ==UserScript==
// @name           Unpaginate phpbbV2 threads
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/28374.user.js
// @description  Marks up phpbbV2 threads with the Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.ibdof.com/viewtopic.php*
// ==/UserScript==

// Apart from the code needed for a phpbbV2 site to "play nice", 
//   all other code is "borrowed" from Johan Sundström's pagination microformat producer scripts.
// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

/***********************************************************************************************
  the rel tag "next" (href='next topic') already exists for viewtopic pages on IBDoF - the same for all phpbbv2 sites??,
  - edit the rel reference so it doesn't conflict with unpaginate rel "next"
*/
var rel = document.evaluate('//link[@rel="next"]', document, null, 9, null ).singleNodeValue;
if (rel)
  rel.setAttribute("rel", "nextTopic");
  
/**
  bugfix 200807022 - needed to allow for poll voting table
    [not(child::td/form[contains(@action,"mode=vote")])]
  
  bugfix 200807028 - damn!, also need to allow for (non-voting) poll results
    [not(child::td//img[contains(@src,"voting_bar")])]
*/

var posts = '//table[@class="forumline"]/tbody/tr[not(child::td[@class="catHead"])][not(child::td/form[contains(@action,"mode=vote")])][not(child::td//img[contains(@src,"voting_bar")])][not(child::th)]'; //[not(child::td[@class="catBottom"])]
var next = '//span[@class="nav"]/a[.="Next"]';
var link = $X(next), nodes = $x(posts);
if (link && nodes.length > 0) {
  var last = nodes.length-1;
  nodes[last].parentNode.removeChild(nodes[last]); // remove table footer
}

unpaginate(posts, next, '//span[@class="nav" and starts-with(text(),"Goto page")]');
