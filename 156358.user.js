// ==UserScript==
// @name In Development
// @id In_Development
// @description Adds a button to collect all gifts and accept all mana help requests. Saves a lot of clicking time so you can enjoy the game more.
// @author lanceal
// @version 0.0.4
// @developer None
// @contributor None
// @homepageURL http://google.com/
// @supportURL http://google.com/
// @updateURL https://somedomain.com/downloads/cool-script.meta.js
// @icon64 http://images1.fanpop.com/images/image_uploads/Witch-p-cards-witchcraft-1132355_200_150.jpg
// @screenshot http://cslibweb.files.wordpress.com/2010/10/witchcraft-2.jpg
// @contributionURL https://google.com
// @contributionAmount $0.00
// @include https://witchcraft.alchemad.com/*
// @run-at document-end
// @priority 1
// @delay 4000
// @jsversion 1.8
// ==/UserScript==
var current_url = document.URL;




//Functions for the Alliance Requests tab
var requests = {
  accept: function() {
var a_elements = document.getElementsByTagName('a');

for(i=0; i<a_elements.length;i++)
{
    if(a_elements[i].className == "accept button"){
        
        a_elements[i].click();
    }
}
},
  add_accept_button: function() {
  var element = document.createElement("input");
 
    //Assign different attributes to the element.
    element.setAttribute("id", "accept_all");
    element.setAttribute("type", "button");
    element.setAttribute("value", "Accept All Gifts/Mana Requests");
    element.setAttribute("name", "accept_all");
     element.onclick = requests.accept;
 
    var foo = document.getElementById("alliance_buttons");
 
    //Append the element in page (in span).
    foo.appendChild(element);  
}
}
if(current_url == "https://witchcraft.alchemad.com/app_requests"){requests.add_accept_button();}
