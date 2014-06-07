// ==UserScript==
// @name       Sansifier
// @namespace  http://santhosh.cc
// @version    0
// @description  Converts font of all pages to Open Sans
// @match      *://*/*
// @copyright  2013+, Santhosh Kumar Bala Krishnan
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://osric.com/chris/iaccess/js/shortcut.js
// ==/UserScript==

var $head = $("head");
var $headlinklast = $head.find("link[rel='stylesheet']:last");
var linkElement = "<link href='//fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>";
if ($headlinklast.length){
   $headlinklast.after(linkElement);
}
else {
   $head.append(linkElement);
}

shortcut.add("Alt+s",function() {
    
      //Sansify
        $('*').css("font-family", 'Open Sans');
   
});