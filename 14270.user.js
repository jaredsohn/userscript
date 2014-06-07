// ==UserScript==
// @name           SP Image Galleries - Default Colors
// @namespace      http://www.summitpost.org/user_page.php?user_id=19666
// @description    Enlarges Thumbnails and Changes the Page Color Scheme
// @include        http://www.summitpost.org/object_list.php?object_type=3*
// @include        http://summitpost.org/object_list.php?object_type=3*
// @include		 http://www.summitpost.org/image/p*
// @include		 http://www.summitpost.org/object_list.php?order_type=DESC&object_type=3*
// @include		 http://www.summitpost.org/image/
// @include		 http://www.summitpost.org/object_list.php?contributor_id=*
// @include        http://www.summitpost.org/object_list.php?parent_id=*&object_type=3*
// @include		 http://www.summitpost.org/object_list.php?within_last_3=*&object_type=3*
// ==/UserScript==


var toReplace = 'square';
var replaceWith = 'small';
var imgs = document.getElementsByTagName("img");
 for (var i = 0; i < imgs.length; i++) { 
 	imgs[i].setAttribute("height", "");
 	imgs[i].setAttribute("width", "");
  var imgSrcString = imgs[i].getAttribute("src");
  var index = imgSrcString.indexOf(toReplace);
  if (index >= 0) {
   var first = imgSrcString.substring(0, index);
   var second = imgSrcString.substring(index + toReplace.length);
   imgSrcString = first + replaceWith + second;
  }
  imgs[i].setAttribute("src", imgSrcString);
 }


var css = new Array();
function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

// Define your CSS here
addStyle(".thumb_img {  border: solid 1px #aaa;  width: auto;  height: auto; padding: 0px;  margin-left: 1px;  margin-right: 1px; }");
addStyle("td { border-color:black; align:top!important;}");
addStyle(".thumb_quality{ color:gray; border:none;}");




// Writes CSS to the document
writeStyle(css);
