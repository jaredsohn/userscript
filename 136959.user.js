// ==UserScript==
// @name        Oracle APEX Feature Requests
// @match     https://apex.oracle.com/pls/apex/f?p=55447:*
// @version     1
// ==/UserScript==

//addjQuery function adapted from: http://stackoverflow.com/a/3550261
//script based on existing script: http://userscripts.org/scripts/show/136956 but loads jquery dynamically since chrome user scripts don't support the include property.

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main(){
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
    
    apexRequest = decodedApexRequest();
    
    if (apexRequest["PAGE"] == "19") {
        mobileAnchor = $("a > img.mobile").parent();
        mobileAnchor.attr("href","f?p=55447:304:"+apexRequest["SESSION"]+"::NO:304:P304_REQUEST_ID:"+$("#P19_ID").val());
    }
    
}

addJQuery(main);