// ==UserScript==
// @name Delicious.com - Bundle Names on Hover
// @namespace http://murklins.talkoncorners.net
// @description On the bundle edit pages, hover over a tag to show which bundles it belongs to.
// @include https://secure.delicious.com/settings/tags/bundle/edit*
// ==/UserScript==

// Grab the tag list and initializee the title text with a temp message
var tagDiv = document.getElementById("alphacloud");
var tags = document.evaluate("ul/li/label", tagDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var tagBundles = new Object();
var unfetchedBundles = new Object();
for (var i = 0; i < tags.snapshotLength; i++) {
  var label = tags.snapshotItem(i);
  // the tag name is the id stripped of the "label-" prefix
  var t = label.id.substr("label-".length);
  // Set up a <div> element to put the bundle names in
  var linkDiv = document.createElement("div");
  linkDiv.setAttribute("id", "bundlenameshover-" + t);
  linkDiv.setAttribute("style",
                        "position: fixed; width: 200px; " +
                        "left: 10px; top: 10px; z-index: 9999; " +
                        "color:  #0a0a0a; background-color: #ffffcc;" +
                        "padding: 10px; text-align: left; " +
                        "border: thin solid black; display: none; " +
                        "-moz-border-radius: 5px;");
  
  linkDiv.appendChild(document.createTextNode("Getting bundles..."));
  var body = document.getElementsByTagName("body");
  body[0].appendChild(linkDiv);
  
  var label = tags.snapshotItem(i);
  label.addEventListener("mouseover", 
    function(event) {
      var tagName = this.id.substr("label-".length);
      var div = document.getElementById("bundlenameshover-" + tagName);
      div.style.display = "block";
    },
    false
  );
  label.addEventListener("mouseout", 
    function(event) {
      var tagName = this.id.substr("label-".length);
      var div = document.getElementById("bundlenameshover-" + tagName);
      div.style.display = "none";
    },
    false
  );
}

// now do the work
fetchBundles();

function fetchBundles() {
  GM_xmlhttpRequest({
    method: "GET",
    url: "https://secure.delicious.com/settings/tags/bundle",
    onload: function(details) {      
      // get the name and edit link of each bundle
      var bundled = "";
      var arr;
      var bundleRegex = new RegExp("<span class=\"name\">(.*?)</span>\\s*?<span class=\"actions\">\\s*?<a href=\"(/settings/tags/bundle/edit.*?)(bundle=)(.*?)\">Edit</a>","g");
      while (arr = bundleRegex.exec(details.responseText)) {
      	var link = "https://secure.delicious.com" + arr[2] + arr[3] + arr[4];
      	var name = arr[1];
      	unfetchedBundles[name] = true;
      	fetchActiveTags(name, link);      	
      }
    }
     
  });
}

function fetchActiveTags(name, link) {
  GM_xmlhttpRequest({
    method: "GET",
    url: link,
    onload: function(details) {
      // get all the tags that are turned on
      var arr, thisBundlesTagsArr;
      var thisBundlesTags = "";
      var tagRegex = new RegExp("<input type=\"text\" id=\"tagBundleInput\" name=\"tagsInput\" value=\"(.*?)\">","g");
      
      arr = tagRegex.exec(details.responseText);
      if (arr) {
        thisBundlesTags = arr[1];
      }
      if (thisBundlesTags != "") {
        thisBundlesTagsArr = thisBundlesTags.split(" ");
      }
      
      // assign the current bundle name to each tag found to be in the bundle
      for (var i = 0; i < thisBundlesTagsArr.length; i++) {
      	var tag = thisBundlesTagsArr[i].toLowerCase();
      	if (tagBundles[tag] == null) {
      	  tagBundles[tag] = new Object();
      	}     	
      	tagBundles[tag][name] = name;
      }      
      // this bundle is done, so set its unfetched flag to false
      unfetchedBundles[name] = false;
      // now check to see if the entire set of bundles have completed the callback
      var done = true;
      for (var bname in unfetchedBundles) {
        if (unfetchedBundles[bname]) {
          done = false;
        }
      }
      // if all the bundles are done, the tags can now be assigned their hover text
      if (done) {
        for (var i = 0; i < tags.snapshotLength; i++) {
          var label = tags.snapshotItem(i);
          // the tag name is the id stripped of the "label-" prefix
          var t = label.id.substr("label-".length);
          var bundleNameDiv = document.getElementById("bundlenameshover-" + t);
          if (tagBundles[t.toLowerCase()] != null) {
            var b = [];
            for (var bname in tagBundles[t.toLowerCase()]) {
              b[b.length] = bname;
            }
            b.sort();
            b = b.join(", ");
            b = b.substring(0, b.length);
            bundleNameDiv.innerHTML = "Bundles: " + b;
          }
          else {
            bundleNameDiv.innerHTML = "Unbundled";
          }
        }	
      }				
    }
     
  });
}