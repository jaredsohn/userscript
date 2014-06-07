// ==UserScript==
// @name           Zelly's YouTube Comments without Javascript
// @description    Embeds the Comments page in the comments section to bypass Javascript comment loading or to fix 'Comments currently unavailable.' error 
// @author         Zelly
// @homepage       http://userscripts.org/scripts/show/174234
// @version        0.03
// @updateURL      https://userscripts.org/scripts/source/174234.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174234.user.js
// @include        http*//*.youtube.com/watch*
// @grant          GM_xmlhttpRequest
// ==/UserScript==


var vId = window.location.search.split('v=')[1];
var ampPos = vId.indexOf('&');
if(ampPos != -1)
    vId = vId.substring(0, ampPos);

var element = document.getElementById("watch-discussion");
element.id="watch-discussion-OLD";

GM_xmlhttpRequest({
                      method: "GET",
                      url: "http://www.youtube.com/all_comments?v="+vId,
                      onload: function(response)
                              {
                                  var parser      = new DOMParser ();
                                  var responseDoc = parser.parseFromString (response.responseText, "text/html");
                                  var comments=responseDoc.getElementById("watch-discussion").innerHTML;
                                  element.innerHTML=comments;
                              }
                  });