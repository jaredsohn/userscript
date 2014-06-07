// ==UserScript==
// @name       fuck_off_bytemobile
// @namespace  https://gist.github.com/908bf95d777db70436cb
// @version    0.1
// @description  disable bullshit image proxy crap
// @match      http://*/*
// @copyright  2012+, matt.koscica@gmail.com
// ==/UserScript==

var img = document.getElementsByTagName("img");
var regex = /^(http:\/\/)1\.1\.[0-9]+\.[0-9]\/bmi\/(.*)$/i;
var total = img.length;
for (var i=0; i<total; i++) {
    img[i].href = img[i].href.replace(regex,"$1$2");
}