// ==UserScript==
// @name       OkCupid Sent Message Deleter
// @namespace  http://ryan-kahn.com/
// @version    0.1
// @description  Select your entire okcupid sent box and prime it for deletion
// @match      http://www.okcupid.com/*
// @copyright  2012+, You
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    jQuery.noConflict();
    jQuery(document).ready(function(){  
        jQuery('input[type="checkbox"]').each(function(index, item){
            item = jQuery(item);
            var itemId = item.attr('id').replace('checkbox_','');
            Mailbox.deleteQueue(itemId);
            item.attr('checked','checked')
        })  
    })
}
// load jQuery and execute the main function
if(window.location.search.indexOf('folder=2') != -1){
    addJQuery(main);
}