// ==UserScript==
// @name           wifa
// @namespace      userscripts.org
// @description    change wifa.ru
// @include        http://wifa.ru/*
// ==/UserScript==
var hat = new Object();
hat.src = "http://lh5.ggpht.com/_tWjtNT2t3oo/TQmm9MXnguI/AAAAAAAAASQ/X09e4BsZ0ck/hat.gif";
var jun = new Object();
jun.src = "http://lh4.ggpht.com/_tWjtNT2t3oo/TQnrUpS0iKI/AAAAAAAAASY/0q8G2-iwC5E/team19.gif";
var jo = new Object();
jo.src = "http://lh4.ggpht.com/_tWjtNT2t3oo/TQnrUrbgoRI/AAAAAAAAASc/KnejgHxZV6I/team23.gif";
var old = new Object();
old.src = "http://lh5.ggpht.com/_tWjtNT2t3oo/TQnrUop5goI/AAAAAAAAASg/p4ZzVjGIuxM/team.gif";
var train = new Object();
train.src = "http://lh5.ggpht.com/_tWjtNT2t3oo/TQnrU5A8QOI/AAAAAAAAASk/wOvWv4qPrcI/train.gif";
var tv = new Object();
tv.src = "http://lh5.ggpht.com/_tWjtNT2t3oo/TQnrU3LUouI/AAAAAAAAASo/lY9G5DXicSU/train_vet.gif";


//
//// define the images to replace
var imageList = new Object();
imageList["http://wifa.ru/images_ng/team19.gif"] = {remove: false, fg: "#000", newimage:jun.src};
imageList["http://wifa.ru/images_ng/hat.gif"] = {remove: false, fg: "#000", newimage:hat.src};
imageList["http://wifa.ru/images_ng/team23.gif"] = {remove: false, fg: "#000", newimage:jo.src};
imageList["http://wifa.ru/images_ng/train.gif"] = {remove: false, fg: "#000", newimage:train.src};
imageList["http://wifa.ru/images_ng/team.gif"] = {remove: false, fg: "#000", newimage:old.src};
imageList["http://wifa.ru/images_ng/train_vet.gif"] = {remove: false, fg: "#000", newimage:tv.src};



// replace images with replacements

// grab all the images on the page
var images = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// loop through all of the images on the page
for (var i = 0; i < images.snapshotLength; i++) {
// place the current image into a variable
var img = images.snapshotItem(i);
// check if the current image is to be replaced with a new version
if (imageList[img.src]) {
// replace the current image with one from above
img.src = imageList[img.src].newimage;
}
} 

//redirect to club
var site = 'wifa.ru';
var link, startPos, newUrl;

link = window.location.href;

if ( (link.indexOf("bypass") > -1)){

  newUrl = 'http://wifa.ru/modules.php?name=ngClub';
  window.location.href = newUrl;
}