// ==UserScript==
// @name           Flipkart link from Amazon
// @namespace      http://nullpointers.wordpress.com
// @description    Amazon.com does not ship to India. A good alternative is www.flipkart.com. 
//                 After looking at reviews at amazon.com it would be convenient to click on a link 
//                 that opens up the same book in flipkart.com.
// @include        http://*.amazon.com/*
// @version        v0.9
// ==/UserScript==


//check if we are on the right page
var prodImage = document.getElementById("prodImageCell");

if (prodImage){

  //Display a link
  var targetURL = "http://www.flipkart.com/search.php?query=";
  var strbookurl = document.location.href;

  var start = strbookurl.indexOf(".com/") +5;
  var matter = strbookurl.substr(start);
  var end = matter.indexOf("/");

  targetURL = targetURL + matter.substr(0,end).replace(/-/g, "+");
  var insertHTML = "<tr><td><a href='" + targetURL + "' target = '_blank' > <br/>FlipKart <br/></a></td><tr>";
  var oldhtml = prodImage.parentNode.parentNode.innerHTML;

  prodImage.parentNode.parentNode.innerHTML = insertHTML + oldhtml;
}
