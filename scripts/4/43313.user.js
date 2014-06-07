// ==UserScript==
// @name           norbits_not_connected.js
// @namespace      http://example.org
// @description    removes the not connected message from norbits
// @include        http://www.norbits.net/*
// @include        http://norbits.net/*
// @include        https://www.norbits.net/*
// @include        https://norbits.net/*
// ==/UserScript==
(function() { 

    if(location.hostname.indexOf('norbits.net') == -1) {
        return false;
    }
   
    function getNodes(expression, startElement) {
        startElement = startElement || document;
        var nodes = document.evaluate( expression, startElement, null,
                                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        return nodes;
    }
  
 
    function _t(e) {
     
        try{
            var nodes = getNodes('//font[@color="red"' +
                                 'and contains(text(), "IKKE ")]' +
                                  '//a[@href="faq.php#user8" and contains(text(), "connectable")]/../..');
               
            var stupidStatement = nodes.snapshotItem(0);
            
            stupidStatement.style.visibility = 'hidden';
            
        }catch(e) {
        
        }
    }
    
   if(window.opera) {
        window.addEventListener('DOMContentLoaded', _t, false); 
   } else {
        window.addEventListener('load', _t, false);
   }
})();