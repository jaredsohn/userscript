// ==UserScript==
// @name       Realestate.com.au useful links
// @namespace  http://www.linkedin.com/in/jadon/
// @version    0.1
// @description  Adds a few useful links to property listings. Displays full agent phone number without needing to refresh the page.
// @match      http://www.realestate.com.au/*
// @copyright  2014+, Jadon Baker
// ==/UserScript==


// show full agent number
var node    = document.querySelector (
    "#agentInfoExpanded > div.agent > div.agentContactInfo > ul > li.phone > a"
);

var nodeTxt = node.getAttribute("data-value");
node.innerText = nodeTxt;

var address = document.querySelector (
    "#listing_header > h1"
).innerText;

// add link to google maps
var contactDetailsList = document.getElementsByClassName('linkList contactDetails')[0];
var newListItem = document.createElement("li");
var anchorTag = document.createElement("a");
anchorTag.href = "http://maps.google.com/?q=" + address;
var itemValue = document.createTextNode("Google Maps");
anchorTag.appendChild(itemValue);
newListItem.appendChild(anchorTag);
contactDetailsList.appendChild(newListItem);

// add link to OnTheHouse for sales history and valuation
var newListItem = document.createElement("li");
var anchorTag = document.createElement("a");
anchorTag.href = "http://www.onthehouse.com.au/property_search/?Query=" + address + "&Mode[]=Buy&Mode[]=Rent&Mode[]=Sell&Mode[]=Rented&Mode[]=Values&PriceMin=Any&PriceMax=Any&Type[]=House&Type[]=Unit&Type[]=Townhouse&Type[]=Land&Type[]=Duplex&Type[]=Other&BedsMin=0&BedsMax=10&BathsMin=0&BathsMax=10&CarsMin=0&CarsMax=10&Activity=0&Layout=combined&AddRecentSearch=true";
var itemValue = document.createTextNode("OnTheHouse");
anchorTag.appendChild(itemValue);
newListItem.appendChild(anchorTag);
contactDetailsList.appendChild(newListItem);

// add links to top horizontal menu
var horizontalLinkList = document.getElementsByClassName('linkList horizontalLinkList')[4];
var newListItem = document.createElement("li");
var anchorTag = document.createElement("a");
anchorTag.href = "http://www.onthehouse.com.au/property_search/?Query=" + address + "&Mode[]=Buy&Mode[]=Rent&Mode[]=Sell&Mode[]=Rented&Mode[]=Values&PriceMin=Any&PriceMax=Any&Type[]=House&Type[]=Unit&Type[]=Townhouse&Type[]=Land&Type[]=Duplex&Type[]=Other&BedsMin=0&BedsMax=10&BathsMin=0&BathsMax=10&CarsMin=0&CarsMax=10&Activity=0&Layout=combined&AddRecentSearch=true";
anchorTag.target = "_blank";
var itemSpan = document.createElement('span')
itemSpan.innerHTML = "History & Valuation";
anchorTag.appendChild(itemSpan);
newListItem.appendChild(anchorTag);
horizontalLinkList.appendChild(newListItem);

var newListItem = document.createElement("li");
newListItem.className = "directions";
var anchorTag = document.createElement("a");
anchorTag.href = "http://maps.google.com/?q=" + address;
anchorTag.target = "_blank";
var itemSpan = document.createElement('span')
itemSpan.innerHTML = "View on Google Maps";
anchorTag.appendChild(itemSpan);
newListItem.appendChild(anchorTag);
horizontalLinkList.appendChild(newListItem);