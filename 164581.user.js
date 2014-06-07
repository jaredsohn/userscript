// ==UserScript==
// @name           Torn OC Checker
// @namespace      *torn.com*
// @description    Torn OC Checker
// @include        *torn.com*
// ==/UserScript==

GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.torn.com/organisedcrimes.php",
  onload: function(response) {
    string = response.responseText
    
    // Check if there is a ready OC
    if(string.search(" - Ready") > 0) {
        // Get the URL of the OC
        pattern = /organisedcrimes\.php\?step\=details\&ID\=[0-9]+/
        urlLocation = string.search(pattern)
        
        suburl = string.substring(urlLocation)
        ocURL = suburl.split(" ", 1)
        ocURL = "http://www.torn.com/" + ocURL
        
        // Check OC page for traveling/hospital/jail
        GM_xmlhttpRequest({
            method: "GET",
            url: ocURL,
            onload: function(response) {
                string2 = response.responseText
                pattern2 = /Traveling<\/font>|Hospital<\/font>|Jail<\/font>/
                
                if(string2.search(pattern2) == -1) {
                    initiateURL = ocURL.replace("details","initiate")
                    var logo = document.createElement("div");
                    logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
                        'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
                        'font-size: small; background-color: #000000; ' +
                        'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
                        'Your OC is ready! Click ' +
                        '<a href="' + initiateURL + '" style="color: #ff0000;">here</a> ' +
                        'to initiate the OC.'
                        '</p></div>';
                    document.body.insertBefore(logo, document.body.firstChild);
                }
                else {
                    alert("Nope.")
                }
            }
        }); 
    }
  }
});