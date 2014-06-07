// ==UserScript==
// @name           Google access keys
// @namespace      google.com
// @description    Allows the type of Google search to be changed quickly using "Shift - Alt acceskeys (Apple: Option key)".
// @include        http://*.google.*
// @version        1.01 - Fix some unusual behaviour with Scholar link
// @version        1.00 - Update for compatability with new Google bar
// @version        0.15 - Yet more improvements from Orion751
// @version        0.14 - More improvements from Orion751
// @version        0.13 - Add more accesskeys: thanks, Orion751!
// @version        0.12 - Remove 'Scholar pro' link and improve positioning of Wikipedia link
// @exclude        http://*.google.com/ig
// @exclude        http://*.google.com/a/*
// ==/UserScript==

if (document.getElementById("gb_2")) {
  sch = document.getElementById('gb_2').parentNode.cloneNode();
  sch2 = document.getElementById('gb_2').cloneNode();
  sch2.id = "gb_scholar"
  sch2.accessKey = "a";
  sch2.innerHTML = "<span class='gbtb2'></span><span class='gbts'>Scholar</span>";
  sch2.href = sch2.href.replace(/\/imghp\?|\/search\?/, '/scholar?');
  sch.appendChild(sch2);
  document.getElementById('gb_36').parentNode.parentNode.insertBefore(sch, document.getElementById('gb_36').parentNode);
}

var ids =  [1,   119, 36 , 2  , 8  , 5  , 23 , 25 , 24 ];
var keys = ["s", "+", "y", "i", "m", "n", "g", "d", "c"];

for (var i in ids) {
  if (document.getElementById("gb_" + ids[i])) document.getElementById("gb_" + ids[i]).accessKey = keys[i];
}