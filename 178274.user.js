// ==UserScript==
// @name       Pixiv Autoload
// @namespace  
// @version    1.0
// @description  Autoloads all images in pixiv mangas
// @match      http://www.pixiv.net/member_illust.php?mode=manga*
// @copyright  2012+, You
// ==/UserScript==

console.log("Starting autoload");

var pics = document.getElementsByClassName("image");

for ( var i = 0; i < pics.length; i++ ) {
  pics[i].src = pics[i].getAttribute("data-src");
  console.log("Loading: "+pics[i].getAttribute("data-src"));
};
