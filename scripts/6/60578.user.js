// ==UserScript==
// @name           SMBC Reader
// @namespace      #aVg
// @description    Makes reading Saturday Morning Breakfast Cereal more pleasurable, with adblock and hidden comic (votey) viewer.
// @version        0.1
// @include        http://www.smbc-comics.com/*
// ==/UserScript==
(function() {
function single(A, B) {return document.evaluate("." + A, B || document.body, null, 9, null).singleNodeValue}
function remove(A) {if(A)A.parentNode.removeChild(A);return remove;}
remove(single("//td[@width='235']"))(single("/../../../..", document.getElementById("refbox")))(single("//form[@target='paypal']"))(single("//center/script/.."));
var comic = single("//center/img[contains(@src, '/comics/')]"), img=new Image();
img.src=comic.src.replace(/\.gif/, "after.gif");
comic.parentNode.insertBefore(img, comic.nextSibling);
})();