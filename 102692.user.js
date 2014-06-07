// ==UserScript==
//
// @name           FHC image resizer
// @namespace      fhc
// @include        http://www.failheap-challenge.com/showthread.php*
// @include        http://failheap-challenge.com/showthread.php*
//
// ==/UserScript==
(function () {

     function addGlobalStyle(css) {
         var head, style;
         head = document.getElementsByTagName('head')[0];
         if (!head) { return; }
         style = document.createElement('style');
         style.type = 'text/css';
         style.innerHTML = css;
         head.appendChild(style);
     }


     addGlobalStyle('.postcontent img { max-width: 900px !important;}');
     addGlobalStyle('.signature img { max-width: 900px !important; max-height: 150px;}');
     addGlobalStyle('span.postdetails img { max-width: 150px !important;}');

     function rez(e) {
         var img = e.target;
         if (img.style.cssText && img.style.cssText.length) {
             img.style.cssText = "";
         }
         else {
             img.style.cssText = "max-width: 9999px !important";
         }
     }

     var results = document.evaluate('//div[@class="postbody"]//blockquote//img[@alt=""]', document, null, XPathResult.ANY_TYPE, null );
     var resultNodes = [];

     var aResult;
     while (aResult = results.iterateNext()) {
         resultNodes.push(aResult);
     }

     var img;
     var l = resultNodes.length; 
     while(l--) {
         img = resultNodes[l];
         img.addEventListener("click", rez, true);
     }
}());