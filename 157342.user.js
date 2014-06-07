// ==UserScript==
// @name       Bigger Tasks in GMail
// @namespace  http://neiti.at
// @version    1.0
// @description  Makes the tasks frame in GMail 500px high
// @match      https://mail.google.com/*
// @copyright  2013+, Markus Neubrand
// ==/UserScript==

var executed = false;

function enlarge() {
  if(!executed) {
    var iframe = document.getElementById('tasksiframe');
    if(iframe != null && iframe.parentNode != null) {
      // configuration of the observer:
      var config = { attributes: true, attributeFilter: [ "style" ] };
        
      // create an observer instance
      var observer = new WebKitMutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            observer.takeRecords();
            observer.disconnect();
            
            var oldHeight = iframe.parentNode.style.height;
            iframe.parentNode.style.height = oldHeight != '0px' ? '660px' : '0px';
            var divs = iframe.contentDocument.getElementsByTagName('div');
            for(var i=0; i<divs.length; i++) {
                if(divs[i].getAttribute("id") != null
                   && divs[i].getAttribute("id").indexOf(".fc") >= 0
                   && divs[i].getAttribute("class") == "Ed") {
                  divs[i].style.height = oldHeight != '0px' ? '630px' : '0px';
                }
            }
            
            observer.observe(iframe.parentNode, config);
        });    
      });
  
      // pass in the target node, as well as the observer options
      observer.observe(iframe.parentNode, config);
        
      executed = true;
    }
    window.setTimeout(enlarge, 100);
  }
}

window.onload = enlarge;