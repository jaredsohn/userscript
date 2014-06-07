// ==UserScript==
// @name       Add space for double click highlight in imo.im
// @namespace  http://imo.im
// @version    0.1
// @description  add a space before imo.im posts so double click highlight is functional
// @match      https://imo.im
// @copyright  2012+, @jakl
// ==/UserScript==

setTimeout(function(){
(new WebKitMutationObserver(
  function(m){
    m.forEach(
      function(mutation){
        for(var i = 0; i < mutation.addedNodes.length; i++) {
           try{
            var mut = mutation.addedNodes[i];
            if(mut.attributes.class.nodeValue.indexOf('convlogitem') !== -1){
                var node = mut.getElementsByClassName(' ms')[0];
                node.innerHTML = ' ' + node.innerHTML;
            }
          } catch(e){}
        }
      }
    )
  }
)).observe(
    document.getElementsByClassName(' content')[0]
  , {childList: true, subtree: true}
)
}, 4000)