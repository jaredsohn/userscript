// ==UserScript==
// @name        FoodPornDaily-Helper
// @namespace   FoodPornDailyHelper
// @description Displays the URLs to the images
// @include     http://foodporndaily.com/*
// @version     1
// ==/UserScript==

function createNewLink(linkText, link)
{
  var div = document.getElementById('header');
  var newlink = document.createElement('a');
  newlink.innerHTML=linkText
  newlink.setAttribute("href", link);
  newlink.setAttribute("target", "_new");
  div.appendChild(newlink); 
}

function createNewLinkInDiv(linkText, link)
{
  var div = document.getElementsByClassName('content');
  var divFirstChild = div[0].firstChild;
  var linkDiv = document.createElement('div')
  var newlink = document.createElement('a');
  newlink.innerHTML=linkText
  newlink.setAttribute("href", link);
  newlink.setAttribute("target", "_new");
  linkDiv.appendChild(newlink);
  div[0].insertBefore(linkDiv, divFirstChild);
}

var imageURL =  document.getElementById("mainPhoto").getAttribute("src");
//createNewLink("Image-URL: " + imageURL, imageURL);
createNewLinkInDiv("Image-URL: " + imageURL, imageURL);

