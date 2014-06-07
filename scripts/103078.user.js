// ==UserScript==
// @name           NFV2FilterDodgeButton
// @namespace      NFv2
// @description    Adds a filter dodge button to the reply page
// @include        http://s4.zetaboards.com/New_Flood/post/*
// @include        http://s1.zetaboards.com/Flood_V2/post/*
// ==/UserScript==

var script = document.createElement("script");
var text = document.createTextNode("function filterdodge() {var postArea = document.getElementById('c_post-text');var newPost = '';for (var i=0;i<postArea.value.length;i++) {if (postArea.value.charAt(i) == '[') {while (postArea.value.charAt(i) != ']') {newPost = newPost + postArea.value.charAt(i);i++;}newPost = newPost + postArea.value.charAt(i);}else if (postArea.value.slice(i).indexOf('http:') == 0) {while (postArea.value.charAt(i) != ' ') {newPost = newPost + postArea.value.charAt(i);i++;}newPost = newPost + postArea.value.charAt(i);}else newPost = newPost + '[b][/b]' + postArea.value.charAt(i);}postArea.value = newPost;}");

script.type = "text/javascript";
script.appendChild(text);
document.body.appendChild(script);

document.getElementById('c_postbtn').innerHTML = document.getElementById('c_postbtn').innerHTML+
'<input type="button" value="Dodge" onclick="filterdodge()"/>';