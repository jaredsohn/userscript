// Convert hCard
// version 1.0
// 2005-07-27
// Copyright (c) 2005, George Hotelling
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Convert hCard", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES
// 
// Finds hCard contact information and provides a link to convert it to 
// vCard for address book applications.
//
// More information available at http://developers.technorati.com/wiki/hCard
//
// ==UserScript==
// @name          Convert hCard
// @namespace     http://george.hotelling.net/projects/converthcard/
// @description   Finds hCard data and provides a link to convert them to vCards
// @include       *
// ==/UserScript==
(function() {

const subscribe_image_src = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00P%00%00%00%0F%08%02%00%00%00%FC%AB%DF%D8%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%C2IDATx%DA%ECVK%0A%840%0C5%E2%89%E6P%ED%0D%5C%B9t57%E8%A5%E6J%F5AP%82%AD!%83-%081%A8%E4%85P%7C%CD%97B%08%83\'%99%F0%A6%94%9C%B0%8D1N%AC%11%D1%FD%E3r%CE%9Fyy%2C%DB%DFw%C5w%1C%9C%C9KxON%3B%BCJ%1E%A9%B0.aia%A8%5Bz%11FIKV%3A4%D6%0F%CA%1B%8F%BC%8B%93%05b%B14%E8%D2%0A%E7%A3%99%E9P%09%F2IdW%2B%7D%D8%D2%B5%F3%8DJ%CB%95%7CtX%25V%FD%EF2zW%D7%D1q%0E7g%5B%E5o%8C%1E%7B%1En%CDcN%D8%B4%B0x8%99%C3X%3C%DE%B1%E4a%97%B6%8C%D6%BF%D6%B7%A7%13Ff%FB%89%F0%26%C0%00%D0Y%8C%E7%C3%0A%85x%00%00%00%00IEND%AEB%60%82';

var findHCards = function() {
  // hasClass helper function
  // TODO: replace with regex, which is tougher than it sounds since JavaScript
  //       doesn't support \A, \Z or lookbacks and [^|\s] doesn't work
  var hasClass = function(element, class_to_match) {
    var classNames = element.className.split(' ');
    for (var j = 0; j < classNames.length; ++j) {
      if (classNames[j] == class_to_match) {
        return true;
      }
    }
    return false;
  };
  
  var hCards = new Array();
  var children = document.getElementsByTagName('*');
  for (var i = 0; i < children.length; ++i) {
    var child = children[i];
    if (hasClass(child, 'vcard')) {
      hCards.push(child);
    }
  }
  return hCards;
};

var makevCardConverterLink = function(event) {
  var converter_link = document.createElement('a');
  converter_link.href = "http://suda.co.uk/projects/X2V/get-vcard.php?uri=" + escape(document.location);
  converter_image = document.createElement('img');
  converter_image.src = subscribe_image_src;
  converter_image.border = 0;
  converter_link.appendChild(converter_image);
  event.appendChild(converter_link);
};

/**********************************************************/
// This is where the magic happens
/**********************************************************/
var hCards = findHCards();
for(var i=0; i < hCards.length; ++i) {
  makevCardConverterLink(hCards[i]);
}

})();
