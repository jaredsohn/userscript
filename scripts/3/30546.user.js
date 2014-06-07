// ==UserScript==
// @name           Unpaginate IP.Board topics
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/30546.user.js
// @description  Marks up IP.Board topics with the Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://asoiaf.westeros.org/index.php?showforum=*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

/*
    Need to move the TR footer rows(*2) [search forum] + [spacerow]
      out of their current container otherwise they become
      grid-locked by future paginated posts.
*/
if (self.location == top.location)
{
  // grab references to the footer rows
  var footers = $x('//div[@class="borderwrap"][child::div[@class="maintitle"]]/table/tbody/tr[(child::td[@class="darkrow1"]) | (child::td[@class="catend"])]');
  
  // the table parent of "posts+footers"
  var ptable = footers[0].parentNode.parentNode;
  
  // create a new footer table
  var ftable = ptable.parentNode.appendChild(document.createElement("table"));
  ftable.setAttribute("class","ipbtable");
  ftable.setAttribute("cellspacing","1");
  
  // shuffle the footer rows into the new table
  ftable.appendChild(footers[0]);
  ftable.appendChild(footers[1]);
}

unpaginate('//div[@class="borderwrap"][child::div[@class="maintitle"]]/table/tbody/tr[not(child::th) and not(child::td[@class="darkrow1"]) and not(child::td[@class="catend"])]',
           'id("page-jump-2")/../span/a[.=">"]',
           'id("page-jump-2")/..');
