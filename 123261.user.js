    // ==UserScript==
    // @name          Dpf great scrollbar
    // @namespace     http://userstyles.org
    // @description     This is a great scollbar for digitalplace.nl forum
    // @author        xvilo
    // @homepage      http://userstyles.org/styles/59417
    // @include       http://digitalplace.nl/forum/*
    // @run-at        document-start
    // ==/UserScript==
    (function() {
        var css = "html {\n overflow: hidden;\n}\nbody {\n    position: absolute;\n    top: 20px;\n    left: 20px;\n    

bottom: 20px;\n    right: 20px;\n    padding: 30px; \n    overflow-y: scroll;\n background-image: none;\n    overflow-x: 

hidden;\n}\n\n\n::-webkit-scrollbar {\n    width: 12px;\n}\n \n\n::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 

0 6px rgba(0,0,0,0.3); \n    -webkit-border-radius: 10px;\n    border-radius: 10px;\n}\n \n\n::-webkit-scrollbar-thumb {\n    

-webkit-border-radius: 10px;\n    border-radius: 10px;\n    background: rgba(255,0,0,0.8); \n    -webkit-box-shadow: inset 0 0 

6px rgba(0,0,0,0.5); \n}\n::-webkit-scrollbar-thumb:window-inactive {\n   background: rgba(255,0,0,0.4); \n}";
    if (typeof GM_addStyle != "undefined") {
       GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
       PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
       addStyle(css);
    } else {
       var heads = document.getElementsByTagName("head");
       if (heads.length > 0) {
          var node = document.createElement("style");
          node.type = "text/css";
          node.appendChild(document.createTextNode(css));
          heads[0].appendChild(node);
       }
    }
    })();
