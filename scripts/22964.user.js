// ==UserScript==
// @name           Flickr: Filter images in comments
// @namespace      http://zoolcar9.lhukie.net/greasemonkey
// @include        http://www.flickr.com/*
// @include        http://flickr.com/*
// @description    Filter images in photo comments or discussion page
// ==/UserScript==

// Inspired by Steffen A. Jakob's Flickr Filter Hearts
// http://userscripts.org/scripts/show/22860
// http://www.flickr.com/photos/steffenj/2266236285/
// http://www.flickr.com/groups/flickrhacks/discuss/72157603915475719/

(function() {
  var imgs, img;
  imgs = document.evaluate("//td[@class='Said' or @class='Comment']" +
                           "/p//img[@src] | " +
                           "//td[@class='Said' or @class='Comment']" +
                           "/blockquote//img[@src] | " +
                           "//table[@class='NewComments']" +
                           "//img[@src and not(contains(@src, 'buddyicon'))]",
                           document, null, 6, null);

  if (!imgs.snapshotLength) return;

  for (var i = 0; i < imgs.snapshotLength; i++) {
    img = imgs.snapshotItem(i);
    if (((img.width > 200) && (img.height > 50)) || (img.height > 100)) {
      filterize(img);
    }
  }

  function filterize(aImg) {
    var lnk = document.createElement("a");
    lnk.href = aImg.src;
    lnk.title = "Show image";
    lnk.textContent = "[" + (aImg.alt ? aImg.alt : aImg.src) + "]";
    lnk.style.fontWeight = "bold";
    lnk.addEventListener("click", function(e) {
      e.preventDefault();
      with (this.nextSibling.nextSibling.style) {
        display = display ? "" : "none";
      }
      this.title = (this.title == "Show image") ? "Hide image": "Show image";
    }, false);
    var isLinkedImage = aImg.parentNode.nodeName == "A";
    var parent = isLinkedImage ? aImg.parentNode.parentNode
                               : aImg.parentNode;
    parent.insertBefore(lnk, isLinkedImage ? aImg.parentNode : aImg);
    lnk.nextSibling.style.display = "none";
    lnk.parentNode.insertBefore(document.createElement("br"), lnk);
    lnk.parentNode.insertBefore(document.createElement("br"), lnk.nextSibling);
  }

})()