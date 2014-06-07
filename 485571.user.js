// ==UserScript==
// @name        Pluralsight Continuous Play
// @description Auto play next module after the end of current module.
// @author      Weijie JIN
// @namespace   goldtect.pluralsight
// @include     http://*.pluralsight.com/training/Player*
// @include     http://pluralsight.com/training/Player*
// @version     1
// @grant       none
// ==/UserScript==

console.log('[start]Pluralsight Continuous Play');

window.setInterval(function(){
    if($('#endOfModuleMessageDiv').css('display') == 'block'){
        
       $('.nextClipControl').first().click();
    }
    
},5000);