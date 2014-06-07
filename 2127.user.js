// DeviantART - Print Uploader v0.2
// Made By Lucanos
//   GreaseMonkey Script Repository
//     - http://blog.lucanos.com
//   DeviantArt Account
//     - http://lucanos.deviantart.com
// Last updated: 17 November 2006
//
// This script creates a link to allow the fast and easy upload of prints
//   to the deviantPrints shop from the "*/deviation/*" and "*/view/*"
//   pages.
//
// ==UserScript==
// @name              DeviantART - Print Uploader
// @namespace         http://blog.lucanos.com/
// @description       Creates a link (where appropriate) to allow for the fast and easy upload of prints to the deviantPrints Shop
// @include           http://www.deviantart.com/deviation/*
// @include           http://www.deviantart.com/view/*
// ==/UserScript==

(function (){

  function xpSingle(str){
    return 
  }

  var uploadPrint = document.evaluate("//a[@href='/submit/sell/']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var reDevID = new RegExp("http:\/\/www\.deviantart\.com\/[a-z]+\/([0-9]+)","gi");
  var DevID = reDevID.exec(document.location.href)[1];
  
  if ( uploadPrint ) {
    uploadPrint.href = "http://www.deviantart.com/submit/sell/step2?deviationid="+DevID;
  } else {
    // Not Applicable
  }

})();