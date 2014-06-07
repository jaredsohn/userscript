// ==UserScript==
// @author         Matthew Ng
// @name           IPCountryLookup
// @description    Finds all the proxies on a page and puts the country that it corresponds to next to that address.
// @namespace      none
// @include        *proxy*
// @include        *proxies*
// @include        *ip*
// @include        *forum*
// ==/UserScript==

//Constants for the script
var VERSION_NUM   = "1.0";
var SCRIPT_URL    = "http://userscripts.org/scripts/show/102758";

//Custom for the site you take from
var REQUEST_URL   = "http://api.hostip.info/?ip=";
var RETURN_FAIL   = "(Unknown Country?)";

//Other Constants
var IP_REGEXP           = /\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,4})?)\b/gm;  //Matches XX.XX.XX.XX:XX and XX.XX.XX.XX
var EXCLUDE_PARENT_TAGS = [            //Exclude all of these tags that contain proxies
                           "script",
                           "style",
                           "link",
                           "meta"
                           ];

//Structure
function QueueNode(_ip, _element)
{  
   this.ip = _ip;             //Holds the ip
   this.element = _element;   //Holds the element which we want to apply the ip on
}
//Object that finds the items
var ajaxQueue = {
   //Variables
   queue : [],
   
   //Queue Functions
   dequeue : function()
   {
      if(this.queue.length > 0)
         return this.queue.shift();
      else
         return null;
   },
   enqueue : function(ip, node)
   {
      this.queue.push( new QueueNode( ip, node ) );
   },
   
   //Controllers
   start : function()
   {
      var currNode;
      
      //If the QueueNode elements exist, then move on
      if( ( currNode = this.dequeue() ) && currNode.ip && currNode.element)
      {
         var replacedText = currNode.element.parentNode.innerHTML;
         
         //Grabs the country
         function grabCountry(ipArray, parentN)
         {
            if(ipArray.length > 0)     //Theres is still more in the array
            {
               var ip = ipArray.shift()
               
               var grabUrl = REQUEST_URL + ip;      //url to grab the xml from
               
               //Ajax Request for the country
               GM_xmlhttpRequest({
                  method: "GET",
                  url: grabUrl,
                  onload: function(response) {
                     try{
                  
                     //Parse the data
                     var xmlText = response.responseText;
                     
                     //Find the full country name
                     var fullNameStart    = xmlText.indexOf("<countryName>") + ("<countryName>").length;
                     var fullNameEnd      = xmlText.indexOf("</countryName>", fullNameStart);
                     var fullCountryName  = xmlText.substring(fullNameStart, fullNameEnd);
                     
                     //Find the abv form
                     var abvNameStart     = xmlText.indexOf("<countryAbbrev>", fullNameEnd) + ("<countryAbbrev>").length;
                     var abvNameEnd       = xmlText.indexOf("</countryAbbrev>", abvNameStart);
                     var abvCountryName   = xmlText.substring(abvNameStart, abvNameEnd);
                     
                     var foundCountry = RETURN_FAIL != fullCountryName;    //true if we found it
                     
                     //Attach the result to the page
                     var insertN = " <span style='color: " + ( foundCountry ? "green" : "red" ) + " !important;' title='"+fullCountryName+"'>(" + ( foundCountry ? abvCountryName : "?" ) + ")</span>";

                     //Add it in
                     replacedText = replacedText.replace(ip, ip + insertN);
                     parentN.innerHTML = replacedText;
                     
                     //Run again
                     grabCountry(ipArray, parentN);
                     
                     }catch(e){out(e)}
                  },
                  onerror: function(response)
                  {
                     alert("There was an error trying to get content. Please visit the script url: "+SCRIPT_URL+" for updates.\nMsg: "+response.responseText);
                  }
               });
            }
            else     //No more in the array
            {
               //Apply the entire innerHTML inside
               parentN.innerHTML = replacedText;
               
               //Do the next one
               ajaxQueue.start();
            }
         }
         
         //Check if the ip is an array
         if (currNode.ip.constructor.toString().indexOf("Array") != -1) //Array
         {
            grabCountry(currNode.ip, currNode.element.parentNode);        //Feed in the array
         }
         else  //Not an Array
         {
            grabCountry([currNode.ip], currNode.element.parentNode);      //Make it an array
         }
      }
   }
};


//Miscellanious functions
function equalsToAnyOf(comparableItem, listOfItems)
{
   for(var key in listOfItems)
   {
      var value = listOfItems[key];
      if(value == comparableItem)
         return true;
   }
   return false;     //If none of the values are equal, then return false
}


/*
 *    Begin Code
 */
function begin()
{
   //Remove eventlistener
   window.removeEventListener("load", begin, false);
   
   var xPathResult = document.evaluate('.//text()[normalize-space(.) != ""]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i = 0, l = xPathResult.snapshotLength; i < l; i++) {
      var textNode = xPathResult.snapshotItem(i);
      var parentTag = textNode.parentNode.nodeName.toLowerCase();
      var text = textNode.data;
      
      //If the parent tag is blacklisted and should not be read
      if( !equalsToAnyOf(parentTag, EXCLUDE_PARENT_TAGS) )
      {
         var allIpInElement = text.match(IP_REGEXP);
         if(allIpInElement && allIpInElement.length)
            ajaxQueue.enqueue(allIpInElement, textNode);
      }
   }
   ajaxQueue.start();
}
 

window.addEventListener("load", begin, false);