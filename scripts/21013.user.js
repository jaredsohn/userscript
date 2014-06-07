// ==UserScript==
// @name        Nobody gives a Fark
// @namespace   http://userscripts.org/users/2460
// @description Removes junk on Fark.com
// @date        2013-02-23
// @include     http://*.fark.com/*
// @include     http://fark.com/*
// @include     http://foobies.com/*
// @include     http://*.foobies.com/*
// @version     4
// @grant       none
// ==/UserScript==

//
// Removes Fark "featured partners" and crap like that.
//

// Add global CSS styles
// from http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Removes an element given the class name.
function hideByClassName(className) {
   var elements = document.getElementsByClassName( className );
   for ( var i = 0; i < elements.length; i++ ) {
     var element = elements[i];
     element.parentNode.removeChild( element );
  }
}

// Removes an element given the ID.
function hideByID(idName) {
    var element = document.getElementById(idName);
    if ( element )
        element.parentNode.removeChild( element );
}

hideByID('header');         // No need for a header
hideByID('BF_WIDGET_1');       // "Featured partner" sites listed with main links
hideByID('BF_WIDGET_2');
hideByID('boxSwap');           // Featured sites
hideByID('alsoOnFarkTable');   // Also on Fark
hideByID('facebook');          // Social media
hideByID('gplus');
hideByID('twitter');
hideByID('pinterest');

hideByClassName('shoprotator');         // Fark shop
hideByClassName('BF_WIDGET');           // "Featured partner" sites (again, for safety)
hideByClassName('alsoOnFark');          // Also on Fark header
hideByClassName('shareLinkContainer');  // Social media

addGlobalStyle('#abPleaBar { visibility:hidden; }'); // Beg bar


// That's it!  Any suggestions, e-mail me kthnxbye.