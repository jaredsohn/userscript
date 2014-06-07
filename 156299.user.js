// ==UserScript==
// @name           BYBS Ikariam 
// @namespace      domz
// @description    Automatically refreshes ikariam pages in every 5-10 minutes, and plays sound when attacked.
//                 This is part of the "ikariam alarm an overview table" script.
// @include        http://secura.e-sim.org/productMarket*
// ==/UserScript==
/**************************************************************************************************
**************************************************************************************************/

window.addEventListener('load', function() {
setTimeout("window.location.reload(true)", Math.random() * 2 * 10 * 1000);


    (function() {
     
    const WORD = {
      "0.01": {"color": "red"},
    };
    
    //build in the global variable...
    var j = 0;
     
    function highlightText() {
     
      var allTextNodes = document.evaluate('//text()', document, null,
                                           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                           null);
     
      for (var i = 0; i < allTextNodes.snapshotLength; i++) {
        var ele = allTextNodes.snapshotItem(i);
        for (var key in WORD) {
       
          if (ele.nodeValue.toLowerCase().indexOf(key) != -1) {
            var span = document.createElement("span");
            ele.parentNode.replaceChild(span, ele);
            span.appendChild(ele);
       
            for (var css in WORD[key]) {
              span.style[css] = WORD[key][css];
              //changes the global variable to 1
              j = 1;         
            }
          }
        }
      }
    }
      highlightText();
      if(j==1){
        window.location.replace("imacros://run/?m=e-sim%20-%20Free%20MMOG%20browser%20game(1).iim");
      }
    })();
	}, false);
   