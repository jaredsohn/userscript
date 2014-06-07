//
// MetaFilter coralizer script. This replaces links on the mefi front
// page and on recent posts with their CoralCDN equivalents, along
// with adding a "coralize/decoralize" button to posts.
//
// Written by Wim Lewis <wiml@hhhh.org>
// Copyright 2007. Distributed under the terms of the GNU General Public Licence version 2.
//

// Greasemonkey magic comments:
//
// ==UserScript==
// @name          Coralize Metafilter
// @namespace     http://www.hhhh.org/wiml/
// @version       1.1
// @description   Replaces links on recent MeFi posts with their Coral Cache equivalents.
// @include       http://www.metafilter.com/*
// @include       http://metafilter.com/*
// ==/UserScript==

// Change log:
//  1.0   25 November 2007: Written & released
//  1.1   26 November 2007: Simplified a little using XPath queries

var coralizer = new Object();

coralizer.nocdnhost = /metafilter\.com|metafilter\.net|google\.|wikipedia|feedburner|.nyud.net|:/i;
coralizer.part = new RegExp('^http://([^/]+)(/[^?]*)$', 'i');
coralizer.decoralize = new RegExp('^([^:]+)\.nyud\.net\.?(?::80[89]0)?$', 'i');

coralizer.coralizeLinks = function coralizeLinks(elt, coralize) {
   var hrefs = elt.ownerDocument.evaluate('//A[@href]', elt, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   var elt, uri, splithost, uricount, cdncount;
   uricount = 0;
   cdncount = 0;
   this.last_op = coralize;
   for(ix = 0; ix < hrefs.snapshotLength; ix ++) {
      elt = hrefs.snapshotItem(ix);
      uricount ++;
      uri = this.part.exec(elt.getAttribute('href'));
      if (uri) {
         if (coralize && !this.nocdnhost.test(uri[1])) {
            elt.href = 'http://' + uri[1] + '.nyud.net' + uri[2];
            cdncount ++;
         }
         if (!coralize && (splithost = this.decoralize.exec(uri[1]))) {
            elt.href = 'http://' + splithost[1] + uri[2];
            cdncount ++;
         }
      }
   }
   
   this.suffix = '(' + cdncount + ' links)';
   
   this.updatebutton();
}

coralizer.updatebutton = function updatebutton() {
   var newtext = ( this.last_op ? "Decoralize" : "Coralize" );
   if (this.suffix) {
      newtext = newtext + ' ' + this.suffix;
   }
   if (this.controlspan) {
      this.controlspan.lastChild.textContent = newtext;
   }
}

// This is the 'EventListener' DOM interface
coralizer.handleEvent = function handleEvent(evt) {
   this.coralizeLinks(this.rootelt, ! this.last_op);
}

var shouldCoralize = false;

if (document.location.pathname.match('^/[0-9]+')) {
   shouldCoralize = true;
   smallcopy = document.evaluate("//SPAN[@class='smallcopy']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
   if (smallcopy) {
      var controlspan, space, datematch, d;
      
      // Try to figure out how old this post is by looking for the date string. This is pretty fuzzy since we're not considering time zones or anything.
      datematch = smallcopy.textContent.match( /[A-Z][a-z]* \d+, \d+(?: \d\d:\d\d [AP]M)? / );
      if (datematch) {
         d = new Date(datematch[0]);
         d = ( Date.now() - d.getTime() );
         // d holds the age of the page in milliseconds.
         if (d > (2*24*60*60*1000)) {
            shouldCoralize = false; // Don't coralize old posts by default
         }
      }

      controlspan = document.createElement('A');
      controlspan.innerHTML = '<img src="http://www.coralcdn.org/bin/mozilla/coral.gif">-';
      coralizer.controlspan = controlspan;
      space = document.createTextNode(' ');
      space.innerHTML = ' &nbsp;';
      smallcopy.appendChild(space);
      smallcopy.appendChild(controlspan);
      smallcopy.normalize();
      
      controlspan.addEventListener('click', coralizer, false);
   }
} else if (document.location.pathname == '/') {
   shouldCoralize = true;
}

coralizer.rootelt = document.getElementById('page');

if (shouldCoralize) {
   coralizer.coralizeLinks(coralizer.rootelt, true);
} else {
   coralizer.updatebutton();
}
