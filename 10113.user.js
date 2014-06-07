// Brian Shaler
// Digg Story view with no-comment links
// 2007.05.06
// Copyright (c) 2007 - Brian Shaler
// Brian's Interwebs: // http://brian.shaler.name/
// brian@shaler.name // As always, feedback is appreciated!
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// --------------------------------------------------------------------
// Check out http://brian.shaler.name/digg/ for more Digg tools
// If you like this tool, you will probably like the RSS feed
// --------------------------------------------------------------------
// Security Note:
// | No identifying information about the user is sent using this
// | script. Users should be warned that installing Greasemonkey 
// | user scripts can be a security risk. ALWAYS inspect the code
// | before installing it!!
// --------------------------------------------------------------------
// "Digg" is a trademark of Digg Inc.
// This tool is not affiliated, sponsored, or endorsed by Digg Inc.
// No warranty is expressed or implied. Install at your own risk.
// --------------------------------------------------------------------
// ==UserScript==
// @name          View Comments on Digg Fully Expanded
// @namespace     http://brian.shaler.name/digg/allcomments/
// @description   Replaces Digg story links within Digg.com with the URL to the fully expanded version of the comments page.
// @include       http://digg.com/*
// @include       http://*.digg.com/*
// ==/UserScript==

function getElementsByClass (className, parent)
{
  var all = document.all ? document.all : document.getElementsByTagName('*');
  if (parent != undefined)
    all = parent;
  var elements = new Array();
  for (var i = 0; i < all.length; i++)
  {
    if (all[i].className == className)
    {
      elements[elements.length] = all[i];
    }
  }
  return elements;
}

// selects all of those little yellow digg count boxes
// like.. in the "top 10" and "hot in" lists..
// even the yellow box next to story view items
diggCounts = getElementsByClass("digg-count");

for (i=0;i<diggCounts.length;i++)
{
  s = diggCounts[i].innerHTML;
  i1 = s.indexOf("href")+6;
  if (i1 > 6)
  {
    s1 = s.substring(i1);
    i2 = s1.indexOf("\"");
    s = s.substring(0, i1+i2) + "/all" + s.substring(i1+i2);
    diggCounts[i].innerHTML = s;
  }
}

// now the text next to the yellow boxes in the sidebar
sidebar = getElementsByClass("sidebar");
if (sidebar.length == 1)
{
h3s = sidebar[0].getElementsByTagName("h3");

for (i=0;i<h3s.length;i++)
{
  try
  {
    h3s[i].firstChild.href += "/all";
  } catch (ex)
  {
    console.log(ex);
  }
}
}

// for normal story view (i.e. on the front page)
commentLinks1 = getElementsByClass("tool comments");
commentLinks2 = getElementsByClass("tool comments friend");
commentLinks = [];
for (i=0;i<commentLinks1.length;i++)
{
  commentLinks.push(commentLinks1[i]);
}
for (i=0;i<commentLinks2.length;i++)
{
  commentLinks.push(commentLinks2[i]);
}

for (i=0;i<commentLinks.length;i++)
{
  commentLinks[i].href += "/all";
}


// cloud view.. find all the different size/type links
classes = ["size-1", "size-1-f", "size-2", "size-2-f", "size-3", "size-3-f", "size-4", "size-4-f", "size-5", "size-5-f"];
cloudLinks = [];

for (i=0;i<classes.length;i++)
{
  thisGroup = getElementsByClass(classes[i]);
  for (j=0;j<thisGroup.length;j++)
  {
    cloudLinks.push(thisGroup[j]);
  }
}

for (i=0;i<cloudLinks.length;i++)
{
  cloudLinks[i].href += "/all";
}

