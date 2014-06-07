// ==UserScript==
// @name           Google Reader: Fixer
// @description    Fix all missing images in enclosures.
// @author henrah / LudoO(xeoos.fr) 
// @namespace      http://www.pitaso.com
// @include        htt*://www.google.*/reader/view*
// ==/UserScript==

(function(){

    //object constructor
    function GoogleReaderFixer(){
        this.fixEnclosures();
    };

    GoogleReaderFixer.prototype.fixEnclosures = function() {
      var nodes, o, img, src;
      nodes = document.evaluate("//a[span[@class='view-enclosure']]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      //alert('count='+nodes.snapshotLength);
      if (nodes){
        for (var i = 0; i < nodes.snapshotLength; i++) {
            o = nodes.snapshotItem(i);
            div = document.createElement('div');
            div.className = "item-pict";
            img = document.createElement('img');
            div.appendChild(img);
            img.src = o.href;
            var p = o.parentNode.parentNode;
            p.parentNode.replaceChild(div, p);
        }
      }
    }
    
    //instantiate and run 
    /*window.addEventListener("load", function() { 
      window.setTimeout(function(){ new GoogleReaderFixer(); }, 500);
    }, false);*/
    
    document.getElementById('entries').addEventListener('DOMNodeInserted', function(){ new GoogleReaderFixer(); }, true);
    
    GM_registerMenuCommand("GoogleReaderFixer", function(){ new GoogleReaderFixer(); });

})();