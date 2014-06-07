// ==UserScript==
// @id             github-md5-hashes@erikvold.com
// @name           Github MD5 Hashes
// @version        1.2
// @namespace      github-md5-hashes
// @author         Erik Vold
// @description    Displays the MD5 hash of a file on Github
// @include        http*//github.com*
// @run-at         document-end
// @grant          GM_xmlhttpRequest
// @grant          GM_xpath
// @grant          GM_cryptoHash
// @homepageURL    http://userscripts.org/scripts/show/121233
// ==/UserScript==

var rawURL = document.getElementById("raw-url");

var infoDiv = GM_xpath({
  path: "//div[@class='file']/div[@class='meta']/div[@class='info']"
});

if (rawURL && infoDiv) {
  GM_xmlhttpRequest({
    method: "GET",
    url: rawURL.getAttribute("href"),
    ignoreCache: true,
    onload: function(res) {
      var md5 = document.createElement("span");
      md5.setAttribute("class", "md5");
      md5.appendChild(document.createTextNode(GM_cryptoHash(res.responseText, "MD5")));
      infoDiv.appendChild(md5);
    }
  });
}
