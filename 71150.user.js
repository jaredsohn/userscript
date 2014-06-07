// ==UserScript==
// @name           Magento USPS Click-n-Ship launcher
// @namespace      http://www.yourstore.com/
// @description    Set script to include https://<your domain>//*sales_order_invoice* and install http://userscripts.org/scripts/show/50429 and set that script to match https://<your domain>/*sales_order_shipment*usps
// ==/UserScript==

   //DMM: Determine appropriate divider character
   if ( document.location.href.indexOf("?",0) == -1) {
       divider = "?";
   } else {
       divider = "&";
   }
   //DMM: Form the URL that triggers the USPS Click-n-Ship window
   newurl = document.location.href + divider + "usps";
   //DMM: Make actual HREF string
   USPSlink = " <a href=\"" + newurl + "\">(Create a Click-n-Ship label)</a> ";
   //DMM: Inject the HTML into the page
   document.body.innerHTML= document.body.innerHTML.replace(/Shipping Address/g,"Shipping Address "+USPSlink);