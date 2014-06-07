// ==UserScript==
// @name           News Image Viewing Enhancer
// @namespace      Written by BiGLiN http://bigbiglin.blogspot.com
// @include        http://*.nextmedia.com/*
// ==/UserScript==

(function() {

function insert_large_image(url) {

   //================================================================================
   // Construct URL for image
   //================================================================================
   // Hong Kong Atnext all and Taiwan Appledaily
   // No need to modify since actual <a> will be changed below
   if ((document.domain.indexOf("hk.") != -1) || (document.domain.indexOf("tw.nextmedia") != -1))
      var image_src = url;
   // Taiwan Atnext
   // Remove tailing characters starting from the ampersand characters, i.e. &blocknum=2&imgnum=1
   else if (document.domain.indexOf("tw.") != -1)
      var image_src = url.replace(/\&.*/, '');


   //================================================================================
   // Close the previous image before loading the new one
   //================================================================================
   // If not done, users will see the previous image while loading the new one
   if (document.getElementById("large_image") != null)
      document.getElementById('large_image').parentNode.removeChild(document.getElementById('large_image'));


   //================================================================================
   // New Image Element
   //================================================================================
   // Create an image element
   var image = document.createElement("img");

   // Set image ID
   image.setAttribute("id", "large_image");

   // Set image source
   image.setAttribute("src", image_src);

   // Set image position
   image.setAttribute("style", "position:absolute;z-index:9999999999;top:" + pageYOffset + "px;left:0px;");

   // When clicked, remove the image
   image.setAttribute("onclick", "document.getElementById('large_image').parentNode.removeChild(document.getElementById('large_image'));");

   // Insert the image
   document.body.appendChild(image);

}


//================================================================================
// Override function
//================================================================================
// Hong Kong All and Taiwan Appledaily: Modify the "href" attribute of <a class="thickbox"> to bypass thickbox
if (document.domain.indexOf("hk.") != 1 || document.domain.indexOf("tw.nextmedia") != -1) {
   // Find all <a> with class="thickbox"
   var tb_links = document.evaluate("//a[@class='thickbox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

   // For each of these links, change the "href" attribute so that it calls the custom function
   for (var i=0; i<tb_links.snapshotLength; i++) {
      // Shortcut for the current link
      var this_tb_link           = tb_links.snapshotItem(i);
      // Shortcut for the parent node of <a class="thickbox"
      var this_link_parent       = this_tb_link.parentNode;
      // Extract the path for large image
      var large_image_path       = this_tb_link.href.replace(/http.*imageUrl=/, '');
      // Construct new href
      var new_href               = 'href="javascript:insert_large_image(\'' + large_image_path + '\')"';
      // Replace the "href" attrigbute with the new_href
      this_link_parent.innerHTML = this_link_parent.innerHTML.replace(/href=[^ ]*"/, new_href);
   }

   // Add the function
   unsafeWindow.insert_large_image = insert_large_image;

   // Hong Kong Atnext: Override photoviewer()
   //if (document.domain.indexOf("hk.") != -1) {
      unsafeWindow.photoviewer = insert_large_image;
   //}
}
// Taiwan Atnext other sections: Override two functions
else {
   unsafeWindow.MM_openBrWindow = insert_large_image;
   unsafeWindow.Popup = insert_large_image;
}


})();
