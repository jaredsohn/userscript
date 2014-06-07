// ==UserScript==
// @name           UWDC Tools
// @namespace      http://michelada/greasemonkey/uwdc.js
// @description    Greasemonkey tools for UWDC staff.
// @include        http://digicoll.library.wisc.edu/*
// @version        0.0.3
// ==/UserScript==

(function(){

    
    function link_to_forward() {

      // Get Elements By Class Name
      document.getElementsByClassName = function(cl) {
        var retnode = [];
        var myclass = new RegExp('\\b'+cl+'\\b');
        var elem = this.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
          var classes = elem[i].className;
          if (myclass.test(classes)) retnode.push(elem[i]);
        }
        return retnode;
      };
    
      // Find identifier
      local_identifier = document.getElementsByClassName("imagetext").pop();
      forward_id = local_identifier.innerHTML.split(".").slice(0,2).join(".");
    
      // Forward URL
      forward_url = "http://forward-qa.library.wisconsin.edu/catalog?q=" + forward_id
      
      // Forward Button
      var forward_button = document.createElement("div");
      forward_button.setAttribute("id", "forward");
      forward_button.setAttribute("href", forward_url);
      forward_button.setAttribute("style", "display:block; height:25px; width:150px; position:absolute; top:145px; left:160px; background-color:#4E98E0; border:1px solid #FFF; color:#FFF; vertical-align:middle; text-align:center;-moz-border-radius:5px;-webkit-border-radius:5px;");
    
      // Forward Link
      var forward_link = document.createElement("a")
      forward_link.setAttribute("href", forward_url);
      forward_link.setAttribute("style", "text-decoration:none;");
    
      // Forward Text
      var forward_text = document.createElement("div")
      forward_text.setAttribute("style", "color:#FFF; width:100%; margin-top:3px;");
      forward_text.innerHTML = "View in Forward"
    
      // Append Append Append
      forward_link.appendChild(forward_text)
      forward_button.appendChild(forward_link)
      document.body.appendChild(forward_button);
    }
    
    // Link to Forward
    link_to_forward();
})();