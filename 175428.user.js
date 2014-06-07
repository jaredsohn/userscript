// ==UserScript==
// @name           Etsy Listing Enhancer
// @description    less typing, more listing
// @namespace      iamtheone@live.at
// @include        *etsy.com/your/listings/create*
// @version        0.2
// ==/UserScript==

// warning: for some reason unbeknown to me requiring jquery destroys the upload on etsy an an imac

if (window.top != window.self)  // only run on the top window
    return;

desc_text_id= "item-description-en-US"
   
function findElem(id) {
   return document.getElementById(id);
}

function add_button_desc(c,t) {
   add_button(c,t,function(d){d.value+=t;});
}

function add_button_clear(c) {
   add_button(c,"",function(d){d.value="";});
}

function add_button(c,t,f) {
   var desc= findElem(desc_text_id);
   var btn= document.createElement("button");
   var cap=document.createTextNode(c);
   btn.appendChild(cap);
   btn.type="button";
   btn.addEventListener("click",function(){f(desc)});
   btn.style.setProperty("border", "2px solid black", "important");
   btn.style.setProperty("margin", "5px", "important");
   btn.style.setProperty("padding", "2px", "important");
   btn.style.setProperty("background-color", "#ddf", "important");
   desc.parentNode.insertBefore(btn,desc);
}

var ship= "Shipping:\nPlease let us know if there is a dispute with the shipping cost before you buy. Be aware that international shipping carries a higher cost. We encourage you to make sure you clarify the cost of shipping before you buy if you are an international buyer.\n\n";
var imp= "Important:\nPlease consider the pictures part of the description and be invited to ask us about any information not provided here because it is of utmost importance to us that all our customers are satisfied with our service.";
var ring_size= "US ring size: \n\n";
var bracelet_size= "Inner measure: \n\n";

add_button_desc("Default",ship+imp);
add_button_desc("Ring",ring_size+ship+imp);
add_button_desc("Bracelet",bracelet_size+ship+imp);
add_button_clear("Clear");

