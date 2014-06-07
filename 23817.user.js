// ==UserScript==
// @name           Intercepter 1.2.1
// @namespace      http://hacks.wuonm.com & http://www.sambenson.co.uk
// @description    Replace short and meaningless tinyurls with the domain of the actual web site using the preview feature, now works on all websites.
// @include        *
// ==/UserScript==

 const __re_redirecturl=/(.*<a id="redirecturl" href=")([^"]+)(">.*)/
 const __chrome_data = 'data:image/gif,GIF89a%0D%00%07%00%C2%04%00%98%A8%94%A2%A6%92%B9%BC%AD%D2%D7%BF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%04%00%2C%00%00%00%00%0D%00%07%00%00%03%1F8%12%2CC%04%40%22%26%0C%10H%82%AD%D5%1C4hd%D9y%99TY%1DH(L%E0dS%02%00%3B';

 function getAnchorId(urlPrefix, n){return urlPrefix + "-" + n}

 var urlPrefix = "tinyurl.com";
 var xpath = "//a[contains(@href, 'http://" + urlPrefix + "')]";
 var anchorList = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 for (var jdx=0; jdx<anchorList.snapshotLength; jdx++){
     var anchor = anchorList.snapshotItem(jdx);
     if (anchor) {
         anchor.setAttribute("title", "Loading...");
         anchor.setAttribute("id", getAnchorId(urlPrefix, jdx));
         var uriParts = anchor.href.split("/")
         GM_xmlhttpRequest({
                  method: 'GET'
                 ,url: "http://preview.tinyurl.com/" + uriParts[uriParts.length-1]
                 ,onload: function(resp) {
                     anchor = document.getElementById(this.anchorId);
                     if (resp.status == 200) {
                         try {
                             var actualUrl = __re_redirecturl.exec(resp.responseText)[2];
							 replacedURL = actualUrl.replace(/&amp;/gi, "&");
                             anchor.setAttribute("href", replacedURL);
                             anchor.setAttribute("title", replacedURL);
                             /* FIXME use css + data: */
                             var chromeImg = document.createElement("IMG");
                             chromeImg.setAttribute("src", __chrome_data);
                             anchor.innerHTML = '&nbsp;' + replacedURL.split("/")[2];
                             anchor.parentNode.insertBefore(chromeImg, anchor);
                         }
                         catch(exc){
                             /* ignore errors */
                         }
                     }
                 }
                 ,anchorId: getAnchorId(urlPrefix, jdx)
             }
         );
    }
 }