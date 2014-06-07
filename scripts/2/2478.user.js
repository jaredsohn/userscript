// Post Entrez PubMed Citations to CiteULike
// version 1.2
// 2009-05-26
// Copyright (c) 2005, Ted Kandell ted underscore kandell at yahoo dot com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// http://www.citeulike.org/user/Archaeogenetics
// Based on pubmed2connotea written by Pierre Lindenbaum PhD
// --------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Post Entrez PubMed Citations to CiteULike", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name          Post Entrez PubMed Citations to CiteULike
// @namespace     http://www.citeulike.org/user/archaeogenetics
// @description   Inserts links on NCBI Entrez PubMed pages to post citations to CiteULike with one click.
// @include       http://www.ncbi.nlm.nih.gov/entrez/*
// @include       http://www.ncbi.nlm.nih.gov/sites/entrez*
// @include       http://www.ncbi.nlm.nih.gov/pubmed/*
// ==/UserScript==


function getParameter(url, parameter)
{
   if (url.indexOf('?') != -1)
   {
      var vars = url.split('?')[1].split('&');
   
      for (var i=0; i < vars.length; i++) 
      {
         if (vars[i].split('=')[0] == parameter)
         {
            return vars[i].split('=')[1];
         }
      }
   }
   
   return null;
}


function createAnchor(uid)
{
   var entrezURL = "http%3A%2F%2Fwww.ncbi.nlm.nih.gov%2Fentrez%2Fquery.fcgi%3Fcmd%3DRetrieve%26db%3Dpubmed%26dopt%3DAbstract%26query_hl%3D5%26itool%3Dpubmed_Brief%26list_uids%3D";

   var newanchor = document.createElement("a");
   
   newanchor.setAttribute("href","http://www.citeulike.org/posturl?url=" + entrezURL + uid);      
   newanchor.setAttribute("style", " font-weight: bold; font-size: 14px; font-family: Verdana, sans-serif; text-decoration: none; color: blue");

   var cite = document.createTextNode("Cite");

   var span = document.createElement("span");
   span.setAttribute("style", "color: red");
   var u = document.createTextNode("U");
   span.appendChild(u);

   var like = document.createTextNode("Like");

   var span2 = document.createElement("span");
   span2.setAttribute("style", "color: black");
   var arrow = document.createTextNode("\u00A0\u21E9");
   span2.appendChild(arrow);

   newanchor.appendChild(cite);
   newanchor.appendChild(span);
   newanchor.appendChild(like);
   newanchor.appendChild(span2);
     
   var tabledata = document.createElement("td");
   tabledata.setAttribute("style", "border-collapse: collapse; width: 1%");
   tabledata.appendChild(newanchor);

   var tablerow = document.createElement("tr");
   tablerow.appendChild(tabledata);

   return tablerow;
}

function insertAnchors()
{
   if ((document.getElementById("db") &&
        document.getElementById("db").value == "pubmed") ||
       (document.getElementsByName("orig_db") &&
document.getElementsByName("orig_db")[0] &&        document.getElementsByName("orig_db")[0].value == "pubmed"))
   {
      if (document.getElementsByTagName)
      {
         var inputElements = document.getElementsByTagName("input");

         for (var i=0; inputElements[i] != null; i++)
         {
            inputElements[i].setAttribute("autocomplete","off");
         }
      }
     
      var allCheckboxes = document.evaluate("//input[@type=\"checkbox\"]", document, 
                                            null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                                          
      if (allCheckboxes.snapshotLength == 0)
      {
         allCheckboxes = document.evaluate("//input[@name=\"uid\"]", document, 
                                           null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      }
     
      for (var i=0; i < allCheckboxes.snapshotLength; i++)
      {
         var checkbox = allCheckboxes.snapshotItem(i);
 
         var refNode = checkbox.parentNode;
         refNode = refNode.parentNode;

         refNode.parentNode.insertBefore(createAnchor(checkbox.value), refNode);
      }
   }
}

window.addEventListener("load", insertAnchors, false);

