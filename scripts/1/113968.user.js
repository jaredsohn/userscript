// ==UserScript==
// @name GET
// @namespace sdaghfjksdhagsfdhagjksdflahsddsf
// @include http://boards.4chan.org/*
// ==/UserScript==

var first = true, n = 0;

function check() {
if (n == 0) return;
var k = first ? n : (n-1);
GM_xmlhttpRequest({
method: "HEAD",
url: "http://sys.4chan.org" + location.pathname.match(/\/[^\/]+\//)[0] + "imgboard.php?res=" + k,
onload: function(response) {
if (n == 0) return;
if (response.status == 200) {
if (first) {
alert(n + " passed");
n = 0;
} else {
document.getElementsByName("post")[0].submit();
}
} else {
first = false;
check();
}
}
});
}
document.getElementsByName("post")[0].addEventListener("dblclick", function(e) {
var m = document.getElementsByName("com")[0].value.match(/(\d+) /);
if (m) {
first = true;
n = parseInt(m[1]);
check();
}
}, false);