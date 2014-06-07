// Find images that are too wide
//
// Features
// - Warns if images are too big and will break your blog.
// - Suggests dimensions for resizing images so they will fit.
//
// What Does It Do?
//
// Blog themes come in two flavours. Fluid/liquid where the template
// stretches around the content to use the maximum width and fixed where
// the template will always be a certain number of pixels wide.
//
// Problems can arise when using a fixed width template with images. 
// If the image is too wide to fit it can stretch the fixed width section.
// This can break your sidebar in Internet Explorer 6 your sidebar by 
// pushing it so that it comes after all of your content.
//
// As a Firefox user I don't "test" my blog in Internet Explorer 6 very 
// often (even though it still has 50% of the browser market share). So
// I needed a script that scans my blog and warns me if I've added an image
// that is too big and will break my blog template under IE 6.
//
// *Very Important*
//
// This script doesn't work "out of the box". You need to edit the list
// of pages it runs on to include your blog. 
// http://engtech.wordpress.com/tools/wordpress/findwideimages/#config

// I've set it up so that the default width is 500px (which is good for 
// most Wordpress.com templates) but you may need to change the value to 
// whatever is appropriate for your site.
// http://engtech.wordpress.com/tools/wordpress/findwideimages/#config2
//
// 
// 
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.6 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/GreaseMonkey/Manage User Scripts,
// select this script, and click Uninstall.
//
// ==UserScript==
// @name          Find images that are too wide
// @namespace     http://engtech.wordpress.com
// @description   Use this script to quickly scan your blog for images that
//                are too wide to fit on it
// @include       http://beatsentropy.com/*

// ==/UserScript==

(function() {
  var MAX_WIDTH = 500;
  var COLOR = "red";
  var CSS_ID_NAME = "found-wide-image";

  addGlobalStyle('#'+CSS_ID_NAME+' { border: 5px dashed '+COLOR+' ! important; }');

  var found = 0;
  var imgs = document.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; i++) {
    img = imgs[i];  
    if (img.width > MAX_WIDTH) {
      found = 1;
      img.id = CSS_ID_NAME;
      var p = document.createElement('p');
      p.id = CSS_ID_NAME;
      var new_height = Math.round((MAX_WIDTH * img.height) / img.width);
      p.innerHTML = 'resize image to width="'+MAX_WIDTH+'" height="'+new_height+'"';
      img.parentNode.insertBefore(p, img.nextSibling);	
    }
  }

  if (found) {
    alert("There are images that are too big for the blog template.");
  }
 })();

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
