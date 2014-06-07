// ==UserScript==
// @name                NexusHD Auto Thanks
// @namespace           lvtuantuan1988@gmail.com
// @description         auto say thanks when open the torrent detail page in NexusHD 
// @include             http://www.nexushd.org/details.php?id*
// ==/UserScript==

// find say thanks button
var thanksButton = document.getElementById("thanksbutton").getElementsByClassName("btn")[0];

// Different language
en = "You Said Thanks!".replace(/\x20/g,String.fromCharCode(160));
simple = "你已说过谢谢";
traditional = "你已說過謝謝";

if (thanksButton.value != simple && thanksButton.value != en && thanksButton.value != traditional)
    thanksButton.click();
