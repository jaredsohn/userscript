// ==UserScript==
// @name Delicious.com - Show Unbundled Lite
// @namespace http://murklins.talkoncorners.net
// @description On the page where you pick a bundle to edit, show the unbundled tags so you know what bundle to choose. Does not have the hover behaviour of the original script.
// @include https://secure.delicious.com/settings/tags/bundle
// ==/UserScript==

var tagcolor = "#1462C1";

// get the current account name
var scope = document.getElementById("currscope");
scope = scope.innerHTML;
fetchTags();
addGlobalStyle('#showunbundled_tagsdiv a {color:' + tagcolor + ';}');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function fetchTags() {
  GM_xmlhttpRequest({
    method: "GET",
    url: "https://secure.delicious.com/settings/tags/bundle/edit",
    onload: function(details) {
      
      // get the list of unbundled tags
      var bundled = "";
      var arr;
      var bundledRegex = new RegExp("<input type=\"hidden\" id=\"tagsInOtherBundles\" name=\"tagsInOtherBundles\" value=\"(.*?)\">","g");
      arr = bundledRegex.exec(details.responseText);
      if (arr) {
        bundled = arr[1];
      }
      
      // go through each tag and check to see if it is in a bundle already
      if (bundled != "") {
        bundled = " " + bundled + " ";
      }
      var tagsRegex = new RegExp("<div class=\"tagList\" id=\"alphacloud\">\\s*?<ul>([\\s\\S]*?)</ul>\\s*?</div>","g");
      var liTags = "";
      var tags = new Array();
      arr = tagsRegex.exec(details.responseText);
      if (arr) { 
        var count = 0;
        liTags = arr[1]; 
        var tagnameRegex = new RegExp("<label [\\s\\S]*?title=\"(.*?)\"[\\s\\S]*?>", "g");
        while(arr = tagnameRegex.exec(liTags)) {
          if (bundled.indexOf(" " + arr[1].toLowerCase() + " ") == -1) {
            tags[count] = arr[1];
            count++;
          }
        }
      }
      
      // insert the tags into a div in the page so we can preview what needs bundling
      if (tags && tags.length != 0) {
        var bundleList = document.getElementById("manageBundle");
        if (bundleList) {
          var p = bundleList.parentNode;
          var unbundledDiv = document.createElement("div");
          unbundledDiv.id = "showunbundled_tagsdiv";
          for (var i = 0; i < tags.length; i++) {
		        var a = document.createElement("a");
            a.innerHTML = tags[i];
            a.href = "http://delicious.com/" + scope + "/" + encodeURIComponent(tags[i]);
            a.id = i;
            unbundledDiv.appendChild(a);
            unbundledDiv.appendChild(document.createTextNode(" "));
          }
          unbundledDiv.style.marginTop = "5px";
          unbundledDiv.style.textAlign = "justify";
          var h = document.createElement("h4");
          h.class = "editBundleTitle";
          h.innerHTML = "Unbundled Tags";
          h.style.paddingTop = "20px";
          h.style.clear = "both";
          p.insertBefore(unbundledDiv, bundleList.nextSibling);
          p.insertBefore(h, bundleList.nextSibling);
        }
      }
    }
  });
}