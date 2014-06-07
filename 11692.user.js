// ==UserScript==
// @name           JSLint easier
// @namespace      http://eric.themoritzfamily.com/jslint
// @description    This makes www.jslint.com a little easier to use.  Use the new url field or the query string ?url=[url] to get an external script
// @include        http://www.jslint.com/
// @include        http://www.jslint.com/?*
// ==/UserScript==

// Add Support for Firebug
if(console && console.debug) {
  GM_log = console.debug;
 }
 /**
  * Handle the availability of the javascript src
  **/
 function onSRC(src) {

   // Fill in the textarea
   var textarea = document.getElementById("input");
   textarea.value = src;

   var jslint_button = document.evaluate("//input[@name='jslint']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
   jslint_button.click();

 }

 function onClick_GET() {
   var url = document.getElementById("gm-url-field").value;
   GET(url);
 }

 function GET(url) {
   GM_xmlhttpRequest({
         method : "GET",
	 url    : url,
	 onload: function(responeDetails) {
	 var src = responeDetails.responseText;
  	 onSRC(src);
       }
     });
 }

var init = function(){
 var form = document.getElementsByTagName("form")[0];
 var textarea = document.getElementById("input");

 var query_string = window.location.search
 var url = null;

 // Try to extract the url from the query string
 var match = query_string.match(/[&?]url=([^&]+)/);
 if(match && match.length == 2) {
   url = unescape(match[1]);
 }

 // Create Interface
 var p = document.createElement("p");

 var label = document.createElement("label");
 label.innerHTML = "URL: ";
 label.htmlFor ="gm-url-field";

 var url_field = document.createElement("input");
 url_field.id="gm-url-field";
 url_field.style.width = "80%";
 if(url) {
  url_field.value = url;
 }
 var button = document.createElement("input");
 button.type = "button";
 button.value = "get";


 p.align = "center";
 p.appendChild(label);
 p.appendChild(url_field);
 p.appendChild(button);


 textarea.parentNode.appendChild(p,textarea);

 button.addEventListener('click', function() { onClick_GET(); return false; },true);
 

 // If the url exists,
 if(url) { GET(url); }
};
window.addEventListener('load', init, true);