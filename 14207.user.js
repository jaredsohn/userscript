// ==UserScript==
// @name           SP Image Galleries
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
addStyle("body { background-color: black; color:gray;}");
addStyle("table { border-color:black !important; color:gray!important;}");
addStyle("td { border-color:black; align:top!important;}");
addStyle(".thumb_title{ color:dimgray; }");
addStyle (".hdr_tbl { background-color:lightgrey; }");
addStyle(".thumb_quality{ color:222222; border:none;}");
addStyle(".thumb_img{ border:1px solid black !important; }");
addStyle(".thumb_parent{ color:darkslategrey!important; }");

addStyle ("div#search_form_box { background-color:black; border-style:none !important; }");
addStyle ("table.search_table { background-color:black!important; color:gray; }");
addStyle ("table.adv_table { display: none!important; border-top: 1px solid #aaa; width: 100%; }");
addStyle ("div.adv_button { display: none!important; font-style: italic; font-size: 10px; color: #444; }");
addStyle ("div.adv_basic_adv { display: none!important; float:left!important; font-weight: normal; padding-top: 2px; font-size: 10px; }");
addStyle ("input.search_text {background-color:gray;border:none;}");
addStyle ("select.search_select {background-color:gray;border:none;}");

// Writes CSS to the document
writeStyle(css);
