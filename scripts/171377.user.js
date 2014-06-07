// ==UserScript==
// @name           Ebay Enhancer
// @description    blablabla
// @namespace      iamtheone@live.at
// @include        *contact.ebay.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version        0.1
// ==/UserScript==

respond_textarea_id= "message_cnt";
//desc_div_id= "descRTE";

function findElem(id) {
	return document.getElementById(id);
}

function add_button_respond(c,t) {
   var ta= findElem(respond_textarea_id);
   var btn= document.createElement("button");
   var cap=document.createTextNode(c);
   btn.appendChild(cap);
   btn.type="button";
   btn.addEventListener("click",function(){ta.value=t;});
   ta.parentNode.insertBefore(btn,ta);
}

add_button_respond("shipping","Thank you for your interest in this item. Please note that for your protection our shipping is insured and we take great care in packaging everything we ship in a way that guarantees a safe arrival of your item.");
add_button_respond("offer","Thank you for your interest in this item. It is our policy to always give all our costumers a chance to bid on our items until the end of the auction. You are very welcome to take part in the auction by bidding on the item. If after the regular end of the auction the item is still available because no one bought it we will be happy to hear from you.");

