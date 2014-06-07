// ==UserScript==
// @name          eBay Universal Script
// @namespace     http://www.marco-schubert.de
// @description   Remove several boxes, converts links to articles into a more handy format, removes layer for foreign users
// @include       http://*.ebay.com/*
// @include       http://*.ebay.de/*
// @include       http://*.ebay.at/*
// @include       http://*.ebay.ch/*
// @exclude       http://*.ebay.tld/*ViewItem*
// ==/UserScript==
// (C) 2007 Marco Schubert
//
// Version 0.3c
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// version 2 as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You can receive a copy of the GNU General Public License by
// visiting http://www.gnu.org/licenses/gpl-2.0.html


// What should be done by this script

var cRemoveLayerForeignCountry = false;   // Remove the layer of foreign visitors? At the moment this function is
                                          // deactivated by eBay.
var cRemoveAnnoyingBoxes       = true;    // Remove annoying boxes (Welcome to eBay, Join the Fun etc.)?
var cRemoveHighlightings       = true;    // Remove highlightings of promoted articles in search results?
var cRemoveAdRow               = true;    // Remove ad row on the right side in the category view?

// Node and node list related functions

function removeElem(node, layercnt) {
  for (var i = 0; (i < layercnt && node.parentNode); i++) {
    node = node.parentNode;
  }
  if ((i == layercnt) && node.parentNode) {
    node.parentNode.removeChild(node);
  }
}

function removeByText(txt, typeOfNode, layercnt) {
  var ad = document.evaluate("//" + typeOfNode + "/text()[contains(., '" + txt + "')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var node;

  if (ad && (ad.snapshotLength == 1)) {
    // Only one unique element is allowed
    removeElem(ad.snapshotItem(0), layercnt);
  }
}

function removeById(elemid, layercnt) {
  var ad = document.getElementById(elemid);
  if (ad) {
    removeElem(ad, layercnt);
  } else {
  	GM_log("Element mit ID " + elemid + " nicht gefunden.");
  }
}

function getElemListByPath(pathExpr, rootNode) {
  // Get the list of nodes which matches the XPath expression in pathExpr.
  return document.evaluate(pathExpr, rootNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getElemByPath(pathExpr, rootNode) {
  // Get the first node that will match the Xpath expression in pathExpr.
  var nodeList = getElemListByPath(pathExpr, rootNode);
  if (nodeList.snapshotLength > 0) {
    return nodeList.snapshotItem(0);
  } else {
    return null;
  }
}

// The main functions of this script

function removeLayerForeignCountry() {
  removeById("oc_usp", 0);
}

function removeAnnoyingBoxes() {
	
	// ebay.com
  removeById("rtm_html_226", 2);             // ebay.com: Yahoo ad frame
  removeById("hpmebaag", 3);                 // ebay.com: Welcome to eBay
  removeById("connectlearn", 3);             // ebay.com: Join the fun
  removeById("worldofebay", 2);              // ebay.com: Meet our family
  removeById("AreaNavigation", 0);           // ebay.com: Top ad
  removeById("rtm_div_393", 0);              // ebay.com: Sponsored Links;
  removeById("rtm_div_393", 0);              // ebay.com: Sponsored Links;

	// ebay.de
  removeById("BottomContainer", 0);          // ebay.de: Fußzeile einschl. Partnerlinks
  removeById("SchonGesehen2", 0);            // ebay.de: Schon gesehen?
  removeById("expEbx1", 0);                  // ebay.de: Express-Angebote
  removeById("featuredItemsSection", 2);     // ebay.de: Topangebote bei den Fahrzeugteilen
  removeById("hpFeaturedItems", 2);          // ebay.de, ebay.com: Featured items
  removeById("marketplace", 3);              // ebay.de, ebay.com: Bunte eBay Welt, Start shopping
  removeById("mobiledediv", 2);              // ebay.de: mobile.de-Querverweis
  removeById("moe", 0);                      // ebay.de: Einkaufen in eBay Shops
  removeById("moreInfoCont", 4);             // ebay.de: Suchmaschinenspam auf den Suchseiten
  removeById("rtm_data_frame", 0);           // ebay.de: IFrame mit Zeugs
  removeById("rtm_div_184", 0);              // ebay.de: Zentrale Werbung über den Suchergebnissen
  removeById("rtm_div_186", 0);              // ebay.de: Gesponserte Links
  removeById("rtm_div_188", 1);              // ebay.de: Zentrale Werbung über den Suchergebnissen
  removeById("rtm_div_190", 0);              // ebay.de: Gesponserte Links
  removeById("rtm_div_274", 0);              // ebay.de: Gesponserte Links
  removeById("rtm_div_391", 0);              // ebay.de: Gesponserte Links
  removeById("rtm_html_225", 2);             // ebay.de: Flash ad
  removeById("rtm_html_228", 7);             // ebay.de: Beliebt auf eBay
  removeById("rtm_html_229", 3);             // ebay.de: Schon gesehen?
  removeById("rtm_html_245", 2);             // ebay.de, ebay.com: New Homepage
  removeById("searchText", 0);               // ebay.de: Suchtexte (insb. eBay Motors)
  removeById("topAdTable", 0);               // ebay.de: Werbezeile oberhalb der Suchergebnisse

  removeByText("Nur Neuware. Nur geprüfte Händler. Unbegrenzter Käuferschutz.", "i", 5);
                                            // ebay.de: eBay Express Werbung in Suchseiten

  if (document.location.href.indexOf("fahrzeugteile.ebay.de") > -1) {
    // eBay Motors: Fahrzeugteile
    removeByText("Top-Verkäufer", "b", 11);
    removeByText("eBay Motors: Fahrzeuge bedeutet", "span", 7);
  }
  
  // ebay.at
  removeById("rtm_div_7", 6);                // ebay.at: Top of eBay
  removeById("rtm_html_227", 3);             // ebay.at: Community hilft
}

function removeAdRow() {
	// Remove ad row in the category view.
  var lay = document.getElementById("layout");
  if (lay != null) {
    lay = getElemByPath("//td[@class='adSpacer']", lay);
    if (lay != null) {
      removeElem(lay.previousSibling, 0);
      removeElem(lay, 0);
    }
  }
}

function removeHighlightings() {
  // Remove the highlighting of promoted articles in search lists.
  // Currently this will not work on the upcoming "new search experience".
  var itemListTable = getElemByPath("//table[@class='ebItemlist single']", document);
  if (itemListTable != null) {
  	var itemListTableRows = getElemListByPath("//table[@class='ebItemlist single']/tbody/tr", document);
  	for (var i = 0; i < itemListTableRows.snapshotLength; i++) {
  		itemListTableRows.snapshotItem(i).style.backgroundColor = 'white';
  	}
	  var itemListTableCells = getElemListByPath("//table[@class='ebItemlist single']/tbody/tr/td", document);
	  for (var i = 0; i < itemListTableCells.snapshotLength; i++) {
	  	itemListTableCells.snapshotItem(i).style.borderWidth = "0px";
	  	itemListTableCells.snapshotItem(i).style.borderBottomWidth = "1px";
	  	itemListTableCells.snapshotItem(i).style.borderBottomColor = "#cccccc";
	  }
  }
}

if(document.body) {

  if (cRemoveLayerForeignCountry)
    removeLayerForeignCountry();

  if (cRemoveAnnoyingBoxes)
    removeAnnoyingBoxes();

  // RegEx to determine the links to articles.
  const urlRegEx = /(http:\/\/cgi\.ebay(?:\.[a-zA-Z]+){1,2})\/.*(\d{12}).*/

  // Get all Links on an eBay page
  var allLinks = getElemListByPath("//a[@href]", document);

  var hr;
  var imgs;
  var extLink;

  // Take a look into every link.
  for (var i = 0; i < allLinks.snapshotLength; i++) {
    hr = allLinks.snapshotItem(i).href;
    if (urlRegEx.test(allLinks.snapshotItem(i).href)) {

      // It's a link to an article. Replace the difficult address with a more common one.
      hr = hr.replace(urlRegEx, "$1/ws/eBayISAPI.dll?ViewItem&Item=$2");
      allLinks.snapshotItem(i).href = hr;

      // Now extent links with a small icon that opens an article in a new window or tab.
      // Check, if there are images as child nodes. These links will not be extended.
      imgs = getElemListByPath("img", allLinks.snapshotItem(i));
      
      // document.evaluate("img", allLinks.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      if (imgs.snapshotLength == 0) {
        // No images inside the <a> node.
        extLink = document.createElement("a");
        extLink.href = hr;
        extLink.target = "_blank";
        extLink.innerHTML = '<img width="10" height="10" src="data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAICAgMzMzP///yH5BAkAAAIALAAAAAAKAAoAAAg0AAUIAECwIEGBBg0iHMCwIYAAAQA0dAhR4sQBDzFexBgAY0KCHScGECggZMORAiGqhEgyIAA7" title="Open in new window" border="0" />';

        // Insert after the original one.
        allLinks.snapshotItem(i).parentNode.insertBefore(extLink, allLinks.snapshotItem(i).nextSibling);

        // Place a blank between the two links.
        allLinks.snapshotItem(i).parentNode.insertBefore(document.createTextNode(" "), allLinks.snapshotItem(i).nextSibling);
      }
      imgs = null;
    }
  }
  
  if (cRemoveAdRow)
    removeAdRow();

  if (cRemoveHighlightings)
  	removeHighlightings();

}
