// ==UserScript==
// @name        Oracle APEX Feature Requests
// @namespace   ubergeeky.com
// @include     https://apex.oracle.com/pls/apex/f?p=55447:*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==


apexRequest = decodedApexRequest();

if (apexRequest["PAGE"] == "19") {
  mobileAnchor = $("a > img.mobile").parent();
  mobileAnchor.attr("href","f?p=55447:304:"+apexRequest["SESSION"]+"::NO:304:P304_REQUEST_ID:"+$("#P19_ID").val());
}


function decodedApexRequest() {
  var apexRequestString = window.location.search.replace(/^\?p=|&.*$/g,"");
  var apexRequest = apexRequestString.split(":");
  
  apexRequest["APP"] = apexRequest[0];
  apexRequest["PAGE"] = apexRequest[1];
  apexRequest["SESSION"] = apexRequest[2];
  apexRequest["REQUEST"] = apexRequest[3];
  apexRequest["DEBUG"] = apexRequest[4];
  apexRequest["CLEAR_CACHE"] = apexRequest[5];
  apexRequest["ITEM_NAMES"] = apexRequest[6];
  apexRequest["ITEM_VALUES"] = apexRequest[7];
  apexRequest["PRINTER_FRIENDLY"] = apexRequest[8];
  
  return apexRequest;
}
