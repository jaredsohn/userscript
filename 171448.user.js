// ==UserScript==
// @name       Facebook Hashtag Blacklist Filter
// @namespace  https://www.facebook.com/DonKoopa
// @version    0.1
// @description  This simple little script will check for posts with hashtags and deletes them from your page if they match against the defined blacklist array.
// @match      https://*.facebook.com*
// @copyright  2013+, Don Koopa
// ==/UserScript==
var blacklist = new Array("YOLO","SWAG");
var contains = function(obj) {
    for (var i = 0; i < blacklist.length; i++) {
        if (blacklist[i] === obj) {
            return true;
        }
    }
    return false;
};
document.onscroll = function(){
    var hashtagposts = document.getElementsByClassName("_58cm");
    var i=0;
    for(i=0; i<hashtagposts.length; i++) { 
        if(contains(hashtagposts[i].innerHTML)){
            var posttodelete = hashtagposts[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            posttodelete.parentNode.removeChild(posttodelete);
        }
    }
};