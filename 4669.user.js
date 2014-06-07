/*
Gmail Label Hider: v0.03
Ben Hengst
ben.hengst+glh@gmail.com

This script will hide any label that you rename to begin with 'x_' 
so for instance if you have a label of 'TEST' and rename it to 
'x_TEST' then you will not see it in the label bar on the side of 
the Gmail interface. 

KNOWN ISSUES:
Currently your labels can not contain certain characters:
{}
[]
()
(space)
.

RESOURCES USED:
http://diveintogreasemonkey.org/toc/index.html
http://www.devguru.com/Technologies/ecmascript/quickref/javascript_index.html
http://www.regular-expressions.info/javascript.html
http://greasemonkey.mozdev.org/authoring.html

LICENSE:
http://creativecommons.org/licenses/GPL/2.0/

CHANGE LOG:
c0.03 Gmail2.0 changes everything, should now be in sync
v0.02 Fixed issue with Google changing location of the label name
v0.01 Initial release

*/
// ==UserScript==
// @name           Gmail Label Hider
// @namespace      
// @description    Allows for Labels to be hidden in the label bar
// @include        http://gmail.google.com/*
// @include        https://gmail.google.com/*
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*

// ==/UserScript==
(function () {

   // the big object that were going to look at takes a while to load,
   // so we will give it some time to load, 2 sec should do it
   window.setTimeout( 
      function() {

         // thanks google for keeping just about everything as an object.
         if ( this.CJn != undefined ) {
            for( num in this.CJn ) {
               var target = this.CJn[num][0];
         
               // if the entry exists in the labels box
               // and if the label is 'x_something'
               if( target.src.className == 'qn0D4e' 
                   && target.src.attributes[0].nodeValue.match(/^x_/)
                 ) {
                  
                  // set the display to none
                  target.src.parentNode.parentNode.style.display = 'none';
                  
               }
            }
         }
      }
   , 2000 );

})();
