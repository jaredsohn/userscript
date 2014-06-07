// ==UserScript==
// @name        PhishTankCheck
// @description Check visited websites against the PhishTank (http://www.phishtank.com/)
// @namespace   http://ltdev.im/
// @include     *
// @version     1.0
// @run-at      document-start
// @grant       GM_xmlhttpRequest 
// @grant       unsafeWindow
// @grant       GM_openInTab
// ==/UserScript==

//NOTICE: API key is NOT needed, but it gives you more requests!
var APIKEY = "API-KEY-HERE"; // Get a free key from http://www.phishtank.com/api_register.php
var defLink = "http://google.com/"; // Go to this page if you want to leave the phising page.
var errOnPage = true; // Display any errors on the top and bottom of a page.

/* No need to edit below this. */
function errorMessage (msg,count,fsize) {
         count = (count>2?2:1);
         fsize = (fsize?fsize:20);
         if (errOnPage) {
            window.addEventListener("load",function (msg,count,fsize) {
                for (var i = 0; i <= count; i++) {
                    var newDiv = document.createElement('div');
                    newDiv.setAttribute('style','position:fixed;'+(i==0?'bottom':'top')+':0px;background-color:red;font-size:'+fsize+'px;width:100%;');
                    newDiv.innerHTML = "NOTICE: "+msg;
                    document.body.appendChild(newDiv);
                }
            }.bind(null,msg,count,fsize),false)
         };
};
function parseJSON(data) {
         var win = unsafeWindow;
         return (win.JSON&&win.JSON.parse?win.JSON.parse(data):(new Function("return "+data))());
}
function checkResponse (resp) {
         var json = parseJSON(resp);
         if ('meta' in json && json.meta.status == 'success') {
            if ('results' in json && json.results['in_database'] == true) {
               if (json.results['verified'] == true) {
                  var msg = "This site has been verified as a phishing site.";
                  errorMessage(msg,2,20);
                  if ('phish_detail_page' in json.results) {
                     var link = json.results['phish_detail_page'];
                     msg += " Leave this page to see phising report?"
                   } else {
                     var link = defLink;
                     msg += " Leave this page?";
                  }
                  if (confirm(msg)) {
                     unsafeWindow.location = link;
                  } else if (link !== defLink && confirm('View report in new tab?')) {
                     GM_openInTab(link);
                  }
                } else {
                  var msg = 'This page has been reported as a possible phishing site. Leave?';
                  errorMessage(msg,2,20);
                  if (confirm(msg)) {
                     unsafeWindow.location = defLink;
                  }
               }
            }
         } 
};
GM_xmlhttpRequest({
   method: "POST",
   url: "http://checkurl.phishtank.com/checkurl/",
   data: "url="+encodeURIComponent(unsafeWindow.location.href)+"&format=json&app_key="+APIKEY,
   headers: { "Content-Type": "application/x-www-form-urlencoded" },
   onload: function (response) {
       var heads = {};
       var exp = response.responseHeaders.split(/\r?\n/);
       for (var x in exp) {
           var split = exp[x].split(': ');
           heads[split[0]] = split[1];
       }
       if (Number(heads['X-Request-Count']) >= Number(heads['X-Request-Limit'])) {
          errorMessage('Ran out of PhishTank requets! Reset in '+heads['X-Request-Limit-Interval'],2,10);
        } else {
          checkResponse(response.responseText);
       }
   },
   onerror: function () {
       errorMessage('There was an error with phishtank!',2,10);
   },
});
