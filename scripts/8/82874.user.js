// ==UserScript==
// @name           Popular Mechanics: Full page view
// @namespace      popMechanicsFullPage
// @include        http://www.popularmechanics.com/*
// @description    Show full page version of Popular Mechanics stories

// @author			   Manish Vij

// @version			   1.0

// @license			   GPL; http://www.gnu.org/copyleft/gpl.html

// @datecreated		 2010-08-03

// @lastupdated		 2010-08-03

// ==/UserScript==


(function()

{

  var xpath = "//a[contains(@href,'page=all')]";

  var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  var i, link;

  var bStop = false;



  for (i = 0; (link = res.snapshotItem(i)) && !bStop; i++)

  {

     if (link.href.search(/javascript/) >= 0)

     {

       //do nothing

     }

     else

     {

       window.location.href = link.href;

       bStop = true;

     }

   }

}

)();