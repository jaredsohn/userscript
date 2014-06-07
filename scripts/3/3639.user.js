// Basecamp multi-project search
// version 0.1 BETA!
// 2006-03-22
// Copyright (c) 2006, Steve Polyak, Iowa City, IA USA
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Basecamp multi-project search", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Basecamp mult-project search
// @namespace http://stevepolyak.com/greasemonkey
// @description Enables a multi-project search
// @include http://*.grouphub.com/clients*
// @include http://*.projectpath.com/clients*
// @include http://*.updatelog.com/clients*
// @include https://*.grouphub.com/clients*
// @include https://*.projectpath.com/clients*
// @include https://*.updatelog.com/clients*
// ==/UserScript==

document.addEventListener('click', function(event) {

  //determine target
  var targ;
  if (!e) var e = event;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
  if (targ.nodeType == 3) // defeat Safari bug
    targ = targ.parentNode;
  
  //if it is go search link, let's get busy
  if(targ.id == 'gosearch') {

    //fetch projects
    var projects = document.evaluate("//div[@class='Project']/a",document,null,XPathResult.ANY_TYPE,null);
    var project = projects.iterateNext(); 
    var req;
    if (window.XMLHttpRequest) {
       req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
       req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var terms = document.getElementById('searchTerms'); 
    req.open("GET", project + '/project/search?terms=' + terms.value + '&scope=all', false);
    req.send(null);

    new_window = open("","searchresults","width=300,height=300,left=150,top=150,resizable=1,scrollbars=1");

    // open new document 
    new_window.document.open();

    // Text of the new document
    // Replace your " with ' or \" or your document.write statements will fail
    new_window.document.write("<html><head>");

    // ************** get the head section for styles,CSS from first project  *******************
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(req.responseText, "application/xml");
    var xpathResult = xmlDoc.evaluate(
      "//pf:head",
       xmlDoc,
       { 
         normalResolver:
         xmlDoc.createNSResolver(xmlDoc.documentElement),
         lookupNamespaceURI : function (prefix) {
         switch (prefix) {
           case "pf":
            return "http://www.w3.org/1999/xhtml";
           default:
            return this.normalResolver.lookupNamespaceURI(prefix);
        }
      }
    },
    0,
    null
  );

  while(item = xpathResult.iterateNext()) 
  {
     new_window.document.write(item.innerHTML);
  } 

  new_window.document.write("</head><body bgcolor=\"#FFFFFF\">");

  // ************** search over all the projects  *******************
  do {

    req.open("GET", project + '/project/search?terms=' + terms.value + '&scope=all', false);
    req.send(null);

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(req.responseText, "application/xml");
    xpathResult = xmlDoc.evaluate(
      "//pf:div[@id='SearchWrapper']",
       xmlDoc,
       { 
         normalResolver:
         xmlDoc.createNSResolver(xmlDoc.documentElement),
         lookupNamespaceURI : function (prefix) {
         switch (prefix) {
           case "pf":
            return "http://www.w3.org/1999/xhtml";
           default:
            return this.normalResolver.lookupNamespaceURI(prefix);
          }
        }
      },
      0,
      null
    );

    var itemCount = 0;
    while(item = xpathResult.iterateNext()) 
    {
       if(itemCount == 0) {
         new_window.document.write("<p>Results for: <a href='" + project + "'>" + project + "</a></p>");
       }
       new_window.document.write(item.innerHTML);
       itemCount = itemCount + 1;
    } 

  } while (project = projects.iterateNext());

  new_window.document.write("</body></html>");

  // close the document
  new_window.document.close(); 
 }

}, true);

var search = document.createElement("div");
search.innerHTML = '<div class="dashannouncement" style="margin: 0 auto 0 auto;"><p style="margin: 2px 0 1px 0;"> ' +
'Search: <input id="searchTerms" type="text"> <a id="gosearch" href="#">Go!</a> ' +
'</p></div>';

var header;
header = document.getElementById('Header');
if (header) {
header.parentNode.insertBefore(search, header.nextSibling);
}



