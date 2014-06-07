// ==UserScript==// @name          100 Things to try in SF// @namespace     http://www.imusicmash.com// @description   Yelp Linkify the restaurants on 100 Things to Try in SF Before You Die list by 7x7.com// @include       http://www.7x7.com/content/eat-drink/big-eat-sf-100-things-try-you-die*
// ==/UserScript==

(function() {
	
var foodItems = document.getElementsByTagName('strong');
var foodItem;
var yelpSearchUrl = "http://www.yelp.com/search?find_desc="
var yelpSFParams = "&find_loc=San+Francisco%2C+CA&ns=1&rpp=1";
var yelpItemSearchUrl;

for (var i = 0; i < foodItems.length; i++) {  // iterate thru each strong DOM element

    // some hacks to skip the bolded DOM elements I don't care about
    if((i%2)==0 && i<=106) continue; 
    if (i==107) continue; // nice hack to skip the dynamo donut!
    if((i%2)!=0 && i >106) continue;
    
    // extract the restaurant name and create the complete yelp url
    foodItem = foodItems[i].textContent;
    yelpItemSearchUrl = yelpSearchUrl + escape(foodItem) + yelpSFParams;
    
    // replace the contents of the restaurant DOM node with the new link
    foodItems[i].innerHTML = '<a href="' + yelpItemSearchUrl+'" target="_blank">'+ foodItem + '</a>';
}        

})(); 
