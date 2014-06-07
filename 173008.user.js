// ==UserScript==
// @name           Ebay Listing Enhancer
// @description    less typing, more listing
// @namespace      iamtheone@live.at
// @include        *ebay.com*NewListing*
// @include        *cgi*ebay.com/ws/eBayISAPI.dll*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version        0.2
// ==/UserScript==

if (window.top != window.self)  // only run on the top window
    return;

desc_iframe_id= "rte";
div_tools_id= "rte_toolbar_inpGrp";
   
function findElem(id) {
	return document.getElementById(id);
}

function add_button_desc(c,t) {
   var f= findElem(desc_iframe_id);
   var div= findElem(div_tools_id);
   var btn= document.createElement("button");
   var cap=document.createTextNode(c);
   btn.appendChild(cap);
   btn.type="button";
   btn.addEventListener("click",function(){f.contentWindow.document.body.innerHTML=t;});
   btn.style.setProperty("border", "2px solid black", "important");
   btn.style.setProperty("margin", "5px", "important");
   btn.style.setProperty("padding", "2px", "important");
   btn.style.setProperty("background-color", "#ddf", "important");
   div.parentNode.insertBefore(btn,div);
}

var desc= '<span style="font-weight: bold;">Description:</span> You are bidding on _. ';
var d_add= 'An excellent addition to any collection.<br><br>';
var d_custom= 'Extremely Fashionable!<br><br>';
var size= '<span style="font-weight: bold;">Size:</span> <br><br>';
var height= '<span style="font-weight: bold;">Size:</span> <br><br>';
var len= '<span style="font-weight: bold;">Length:</span> <br><br>';
var inner_len= '<span style="font-weight: bold;">Length:</span> the inner measure is ? inch<br><br>';
var weight= '<span style="font-weight: bold;">Weight:</span> total weight is<br><br>';
var ship= '<span style="font-weight: bold;">Shipping:</span> Please let us know if there is a dispute with the shipping cost before you leave a negative feedback so we can resolve to your satisfaction. Be aware that <span style="text-decoration: underline;">international shipping carries a higher cost</span>. We encourage you to make sure you clarify the cost of shipping before you make your bid if you are an international buyer.<br><br>';
var ship_int= '<span style="font-weight: bold;">International Shipping:</span> Be aware that <span style="text-decoration: underline;">international shipping carries a higher cost</span>. We encourage you to make sure you clarify the cost of shipping before you make your bid if you are an international buyer. Please let us know if there is a dispute with the shipping cost before you leave a negative feedback so we can resolve to your satisfaction.<br><br>';
var ship_free= '<span style="font-weight: bold;">US Shipping:</span><span style="text-decoration: underline;">Free!</span><br><br>';
var imp= '<span style="font-weight: bold;">Important:</span> Please consider the pictures part of the description and be invited to ask us about any information not provided here because it is of utmost importance to us that all our customers are satisfied with our service.</font><br>';
var rdoulton= '<span style="font-weight: bold;">Description:</span> You are bidding on a original Royal Doulton _. She was designed by _ and her number is _. The item is in mint condition. ';

add_button_desc("Default",desc+d_add+size+weight+ship+imp);
add_button_desc("Default FS",desc+d_custom+size+weight+ship_free+ship_int+imp);
add_button_desc("Silver Spoon",'<span style="font-weight: bold;">Description:<br></span>You are bidding on a very nice _ silver spoon by _. It is a rare find in this excellent condition and a valuable addition to any collection.<br><br>'+len+weight+ship+imp);
add_button_desc("Bracelet",desc+d_custom+inner_len+weight+ship+imp);
add_button_desc("Doulton",rdoulton+d_add+height+ship+imp);




