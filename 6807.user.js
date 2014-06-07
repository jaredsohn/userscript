// Copyright (c) 2006-2007 Egon Willighagen <egonw@users.sf.net>
//                    2007 Joerg Kurt Wegner <wegner@users.sf.net>
// Version: 20070114
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// -- HOWTO INSTALL --
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// -- SUPPORTED --
//
// This script supports the microformats and RDFa as described in
// http://chem-bla-ics.blogspot.com/2006/12/including-smiles-cml-and-inchi-in.html
//
// -- TODO --
//
// - implement proper namespace support for RDFa, and not have 'chem' the hardcoded prefix
//
// --------------------------------------------------------------------
//
// ChangeLog
//
// 2007-01-14  JKW Added support for eMolecule queries
// 2007-01-14  EW  Per Joerg Wegner's comment, searching SMILES on PubChem now 
//                   via SMARTS
// 2006-12-19  EW  Added support for chem:compound, and added ChageLog,
//                   removed redundant " in SMILES PC query, added version
//                   number, changed description
// 2006-12-17  EW  Initial script, with support for InChI, CAS and SMILES
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Sechemtic Web
// @namespace     tag:egonw@users.sf.net,2006-12-17:SechemticWeb-1
// @description   Enriches chemistry enabled HTML.
// @include       *
// ==/UserScript==

var useGoogle = 1;
var usePubChem = 1;
var useEMolecules = 1;

var allLinks, thisLink;

// InChI support
allLinks = document.evaluate(
    '//span[@class="chem:inchi" or @class="inchi"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    inchi = thisLink.innerHTML;
    // alert("Found InChI:" + inchi);

    if (usePubChem == 1) {
        // create a link to PubChem
        newElement = document.createElement('a');
        newElement.href = "http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?CMD=search&DB=pccompound&term=%22" + 
            inchi + " %22[InChI]";
        newElement.innerHTML = "<sup>PubChem</sup>";
        thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
    }
    if (usePubChem == 1 && useGoogle == 1) {
        spacer = document.createElement('sup');
        spacer.innerHTML = ", ";
        thisLink.parentNode.insertBefore(spacer, thisLink.nextSibling);
    }
    if (useGoogle == 1) {
        // create a link to PubChem
        newElement = document.createElement('a');
        newElement.href = "http://www.google.com/search?q=" + inchi.substring(6);
        newElement.innerHTML = "<sup>Google</sup>";
        thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
    }
}

// SMILES support
allLinks = document.evaluate(
    '//span[@class="chem:smiles" or @class="smiles"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    smiles = thisLink.innerHTML;
    // alert("Found SMILES:" + smiles);

    if (usePubChem == 1) {
        // create a link to PubChem
        newElement = document.createElement('a');
        newElement.href = "http://pubchem.ncbi.nlm.nih.gov/search/?smarts=" + smiles;
        newElement.innerHTML = "<sup>PubChem</sup>";
        thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
    }
    if (usePubChem == 1 && (useGoogle == 1 || useEMolecules == 1)) {
        spacer = document.createElement('sup');
        spacer.innerHTML = ", ";
        thisLink.parentNode.insertBefore(spacer, thisLink.nextSibling);
    }
    if (useGoogle == 1) {
        // create a link to PubChem
        newElement = document.createElement('a');
        newElement.href = "http://www.google.com/search?q=" + smiles;
        newElement.innerHTML = "<sup>Google</sup>";
        thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
    }
    if (useEMolecules == 1 && useGoogle == 1) {
        spacer = document.createElement('sup');
        spacer.innerHTML = ", ";
        thisLink.parentNode.insertBefore(spacer, thisLink.nextSibling);
    }
    if (useEMolecules == 1) {
        // create a link to eMolecules
        newElement = document.createElement('a');
        newElement.href = "http://www.emolecules.com/cgi-bin/search?t=ss&q=" + smiles;
        newElement.innerHTML = "<sup>eMolecules</sup>";
        thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
    }
}

// CAS regisitry number support
allLinks = document.evaluate(
    '//span[@class="chem:casnumber" or @class="casnumber"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    casnumber = thisLink.innerHTML;
    // alert("Found CAS registry number:" + casnumber);

    if (useGoogle == 1) {
        // create a link to PubChem
        newElement = document.createElement('a');
        newElement.href = "http://www.google.com/search?q=" + casnumber + "+CAS";
        newElement.innerHTML = "<sup>Google</sup>";
        thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
    }
}

// 'compound' support
allLinks = document.evaluate(
    '//span[@class="chem:compound"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    smiles = thisLink.innerHTML;
    // alert("Found SMILES:" + smiles);

    if (usePubChem == 1) {
        // create a link to PubChem
        newElement = document.createElement('a');
        newElement.href = "http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?CMD=search&DB=pccompound&term=" + 
            smiles;
        newElement.innerHTML = "<sup>PubChem</sup>";
        thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
    }
}


