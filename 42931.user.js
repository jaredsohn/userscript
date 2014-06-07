// Google Scholar to CiteULike
// version 0.5 BETA
// 2009-02-22
// Copyright (c) 2009, Augustin Luna
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// http://www.citeulike.org/user/cannin
// Based on pubmed2connotea written by Pierre Lindenbaum PhD
// Fixed from an 2005 script by Ted Kandell ted underscore kandell at yahoo dot com
// --------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Scholar to CiteULike", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name          Google Scholar to CiteULike
// @namespace     http://www.citeulike.org/user/cannin
// @description   Post citations to CiteULike from Google Scholar
// @include       http://scholar.google.com/*
// ==/UserScript==


function gm_xpath(expression,contextNode)
{
   return document.evaluate(expression,contextNode,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

function getParameter(url, parameter)
{
   if (url != null &&
       url.indexOf('?') != -1)
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


function createAnchor(url)
{   
   var newanchor = document.createElement("a");
   
   newanchor.setAttribute("href","http://www.citeulike.org/posturl?url=" + url);      
   newanchor.setAttribute("style", " font-weight: bold;  text-decoration: none; font-family: sans-serif; color: blue");

   var span1 = document.createElement("span");
   span1.setAttribute("style", "color: black");
   var bracket = document.createTextNode("[");
   span1.appendChild(bracket);
   
   var cite = document.createTextNode("Cite");

   var span = document.createElement("span");
   span.setAttribute("style", "color: red");
   var u = document.createTextNode("U");
   span.appendChild(u);

   var like = document.createTextNode("Like");

   var span2 = document.createElement("span");
   span2.setAttribute("style", "color: black");
   var bracket2 = document.createTextNode("]");
   span2.appendChild(bracket2);

   var space = document.createTextNode(" ");
   
   newanchor.appendChild(span1);   
   newanchor.appendChild(cite);
   newanchor.appendChild(span);
   newanchor.appendChild(like);
   newanchor.appendChild(span2);
   newanchor.appendChild(space);
    
   return newanchor;
}

function findSupportedLink(result)
{
   var supported = new Array(

// These are the sites currently supported by CiteULike for automatic parsing
// of bibliographic information. If non of these URLs are found, 
// the primary link is returned, and the user has to manually enter the information 
// into CiteULike. 
//
// The order here is deliberate:
// First, governmental, academic, and non-profit citation sites,
// then, the specific sites and journals supported by CiteULike,
// and last, the commercial citation collections.
// 
// Entrez PubMed was put first, deliberately, because if its vast cross indexing
// of papers in the life science, with links to keywords, gene sequences, etc.
// which are not found on the publisher's own sites. 
//
// Currently this script ignores search results that are books.
// When WorldCat support is included by writing a plugin in CiteULike, I will
// then add the links for book results too.
//
// OCLC WordCat is included here instead of Amazon.com because this provides  
// bibliographic data for most books, as well as which libraries have them 
// in their collections. Another script or extension that can parse the ISBN
// on a page can turn that on the WorldCat page for the book into a link to
// Amazon.com, if desired. There are scripts and extension that do just this.

"http://www.ncbi.nlm.nih.gov/entrez/",	// Entrez PubMed   
"http://www.ncbi.nlm.nih.gov/pubmed/",	// PubMed   
"http://www.pubmedcentral.nih.gov/",	// PubMed Central

"http://highwire.stanford.edu/",	// HighWire
"http://scitation.aip.org/",		// AIP Scitation
"http://citeseer.ist.psu.edu/",		// CiteSeer
"http://arxiv.org/",			// arXiv.org e-Print archive
"http://www.worldcatlibraries.org/",	// OCLC WorldCat
"http://www.ingentaconnect.com/",	// IngentaConnect

"http://www.agu.org/",			// American Geophysical Union
"http://ams.allenpress.com/",		// American Meteorological Society
"http://www.anthrosource.net/",		// Anthrosource
"http://portal.acm.org/",		// Association for Computing Machinery (ACM) portal
"http://www.usenix.org/",		// Usenix
"http://bmj.bmjjournals.com/",		// BMJ
"http://ieeexplore.ieee.org/",		// IEEE Xplore
"http://journals.iop.org/",		// IoP Electronic Journals
"http://www.ams.org/mathscinet",	// MathSciNet
"http://adswww.harvard.edu/",		// NASA Astrophysics Data System
"http://www.nature.com/",		// Nature
"http://www.plosbiology.org/",		// PLoS Biology
"http://www.sciencemag.org/",		// Science


"http://www.kluweronline.com/",         // now SpringerLink
"http://links.jstor.org/",		// JSTOR

"http://www.springerlink.com/",		// SpringerLink
"http://www.metapress.com/",		// MetaPress
"http://www3.interscience.wiley.com/",	// Wiley InterScience
"http://www.sciencedirect.com/"		// ScienceDirect 
);

   var isSupported = -1;
                   
   for (var i=0; i < supported.length; i++)
   {
      isSupported = result.search(supported[i]);
      
      //DEBUG
      //GM_log(result);
      //GM_log(isSupported);
  
  	  // -1 is not found
      if (isSupported != -1)
      {  
         break;
      }
   }
  
   if (isSupported != -1) 
   {
      //DEBUG
      //GM_log(result);
      return result; 
   } 
   else 
   {
      return null;
   }
}


function insertAnchors()
{
	var allLinks = document.evaluate(
    "//h3[@class]/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
   
   for (var i=0; i < allLinks.snapshotLength; i++)
   {
     var link = allLinks.snapshotItem(i);
     var supportedLink = findSupportedLink(link.toString());
     
     //DEBUG
     //GM_log(supportedLink);
    
     if (supportedLink != null)
     {  
        //DEBUG 
        GM_log(supportedLink);
        url = encodeURIComponent(supportedLink) +"&title=" + 
              encodeURIComponent(link.textContent);

        link.parentNode.insertBefore(createAnchor(url), link);
     }
   }
}

window.addEventListener("load", insertAnchors, false);
