// Basecamp - Add project names to milestones
// Copyright (c) 2009,  Alex Burkhardt
// http://www.alex3d.de
// 02 February 2010 
//
// ==UserScript==
// @name        Basecamp - Add project names to milestones
// @version     0.5.2
// @description Adds project names to milestones in calendar view of Basecamp
// @namespace   https://www.alex3d.de/
// @exclude     https://*.basecamphq.*/milestones/responsibilities
// @exclude     http://*.basecamphq.*/milestones/responsibilities
// @include     https://*.basecamphq.*/*
// @include     http://*.basecamphq.*/*
// ==/UserScript==


var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    
    var thisLink, newElement;
    
    var projectName = thisLink.title.split(" | ");
    
    if (projectName.length > 1) {   
    
           
        var titleText = document.createTextNode("("+projectName[1]+")");

        thisLink.parentNode.insertBefore(titleText, thisLink.nextSibling);


    }
    
    
      if (thisLink.title.match("COMPANY") ==  true) {

              var projectName = thisLink.title.split(", ");
              
                  if (projectName.length > 1) {   
              
                     projectTitleOnly = projectName[1].split("PROJECT: ")[1];
                     
                     var titleText = document.createTextNode("("+projectTitleOnly+")");
          
                     thisLink.parentNode.insertBefore(titleText, thisLink.nextSibling);
          
          
                 }    
      }
    
    
}