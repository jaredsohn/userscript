// Copyright 2007,2008,2009 Brian Donovan
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
//---------------------------------------------------
// Stopped working?  Not working 100% any longer?
// Give me a description of the problem.
// Email: brian@briandon.com
//---------------------------------------------------
// Last Modified: Thursday, December 03, 2009
//---------------------------------------------------
// Highlights image containers in Google Image Search results 
// pages yellow, with the intensity of the color corresponding
// to the area of the linked image.
//------------------- History -----------------------
// Sept 2007:  Original version.
// March 2008: Added ability to include/exclude individual images that skew
//             the calculations and colorcoding.
// March 2009: Updated email address and added licensing information.
// July 2009:  Modified XPath in unsafeWindow.getDimsLinkedImagesAndDoAreaCalcs
//             to handle modified Google Image Search markup.
// Dec 2009:   Filter out clicks on anything but thumbnail-containing TDs
//---------------------------------------------------


// ==UserScript==
// @name          GIS color code
// @namespace     http://www.briandonovan.info/
// @description   The background color of the td elements containing results images in a GIS results page are shaded yellow in proportion to the images' areas (width x height).  Exclude and re-include individual results by clicking in the empty space around each result thumbnail.
// @include       http://images.google.com/images?*
// ==/UserScript==


//---------------------------------------------------
// Get the image dimensions from the rows of td's below
// the image thumbnails - content like: 
//
// 450 x 476 - 66k - jpg
//
// Then, calculate the area of each linked image.
// Along the way, identify the minimum area and the
// maximum area of the images linked from this results
// page.
//---------------------------------------------------
unsafeWindow.objGoogleImageSearchResultTds = {};
unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds = [];


unsafeWindow.doExcludeInclude = function (nodeTarget) {
    //---------------------------------------------------
    // All TD id attribute values begin with 'tDataImage' and end with the number 
    // of the TD, starting from 0 (top left) to n (bottom right).
    //---------------------------------------------------
    // Don't take action when a thumbnail is clicked.
    //---------------------------------------------------
    if ((nodeTarget.nodeName.toLowerCase() !== 'td') || (!nodeTarget.hasAttribute('id'))) {
        return false;
    }
    if (nodeTarget.id.indexOf('tDataImage') < 0) {
        return false;
    }
    //---------------------------------------------------
    var strNumberOfTd = nodeTarget.id.slice(10, (nodeTarget.id.length + 1));
    var intIndexTd = Number(strNumberOfTd);
    if (unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds[intIndexTd].blnExcluded) {
        unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds[intIndexTd].blnExcluded = false;
    } else {
        unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds[intIndexTd].blnExcluded = true;
    }
    unsafeWindow.getDimsLinkedImagesAndDoAreaCalcs();
    unsafeWindow.doColoring();
};


//---------------------------------------------------
// Add onclick event listeners to the image search result thumbnail TDs so that we 
// can include/exclude individual results via clicks in the TDs.
//---------------------------------------------------
var xPathResultGoogleImageSearchResultTds = document.evaluate("//td[starts-with(@id,'tDataImage')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < xPathResultGoogleImageSearchResultTds.snapshotLength; i++) {
    var objOneResult = {};
    objOneResult.nodeTdElem = xPathResultGoogleImageSearchResultTds.snapshotItem(i);
    objOneResult.nodeImgElem = objOneResult.nodeTdElem.firstChild;
    objOneResult.blnExcluded = false;
    unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds.push(objOneResult);
    objOneResult.nodeTdElem.addEventListener("click", function (e) { unsafeWindow.doExcludeInclude(e.target); }, false);
}


unsafeWindow.getDimsLinkedImagesAndDoAreaCalcs = function () {
    //---------------------------------------------------
    // Get the dimensions of the linked images and incorporate this information 
    // into the object within objGoogleImageSearchResultTds.arrElemNodesTds that
    // represents the containing TD element.
    //
    // Also, do area calculations and max/min areas along the way.
    //---------------------------------------------------
    var xpathResultLinkedImageDimsString = document.evaluate("//div[@class='f']/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    unsafeWindow.objGoogleImageSearchResultTds.intMaxImgArea = 0;
    unsafeWindow.objGoogleImageSearchResultTds.intMinImgArea = 0;
    for (var i = 0; i < xpathResultLinkedImageDimsString.snapshotLength; i++) {
        //---------------------------------------------------
        // Get the dimensions and calc the area.
        //---------------------------------------------------
        var nodeImgDimsText = xpathResultLinkedImageDimsString.snapshotItem(i);
        var arrDimsFileSizeFileTypeInfo = nodeImgDimsText.nodeValue.split(' ');
        var intImgArea = Number(arrDimsFileSizeFileTypeInfo[0]) * Number(arrDimsFileSizeFileTypeInfo[2]);
        unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds[i].intImgArea = intImgArea;
        //---------------------------------------------------
        // Only adjust the max and min areas using area of this image if it has not been excluded.
        //---------------------------------------------------
        if (!unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds[i].blnExcluded) {
            //---------------------------------------------------
            // Is this bigger than the previously biggest image or smaller than the previously smallest?
            //---------------------------------------------------
            if (intImgArea > unsafeWindow.objGoogleImageSearchResultTds.intMaxImgArea) {
                unsafeWindow.objGoogleImageSearchResultTds.intMaxImgArea = intImgArea;
            }
            if (intImgArea < unsafeWindow.objGoogleImageSearchResultTds.intMinImgArea) {
                unsafeWindow.objGoogleImageSearchResultTds.intMinImgArea = intImgArea;
            }
        }
    }
};
unsafeWindow.getDimsLinkedImagesAndDoAreaCalcs();


unsafeWindow.doColoring = function () {
    //---------------------------------------------------
    // Do calcs and set TD bgcolors
    //---------------------------------------------------
    var intRangeImgAreaMinMax = unsafeWindow.objGoogleImageSearchResultTds.intMaxImgArea - unsafeWindow.objGoogleImageSearchResultTds.intMinImgArea;
    for (var i = 0; i < unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds.length; i++) {
        if (!unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds[i].blnExcluded) {
            //---------------------------------------------------
            // Below: color calcs
            //---------------------------------------------------
            var intOverMin = unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds[i].intImgArea - unsafeWindow.objGoogleImageSearchResultTds.intMinImgArea;
            var fltProportionOfRangeImageAreaMinMax = intOverMin / intRangeImgAreaMinMax;
            var intRval = Math.floor((1 - fltProportionOfRangeImageAreaMinMax) * 255);
            //---------------------------------------------------
            unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds[i].nodeTdElem.style.backgroundColor = 'rgb(255,255,' + intRval + ')';
        } else {
            // TD #i has been excluded
            unsafeWindow.objGoogleImageSearchResultTds.arrElemNodesTds[i].nodeTdElem.style.backgroundColor = 'rgb(215,215,215)';
        }
    }
};
unsafeWindow.doColoring();
