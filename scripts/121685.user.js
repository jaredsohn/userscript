// ==UserScript==
// @name           sfURL
// ==/UserScript==


var url = "Resolving";
var words = "Something to look for";
function finder(xhr){   // set-up a looker
if (xhr.indexOf(words)>-1) {
alert("Match found!!");     // alert a match
document.location.href = url;
} else {
setTimeout(function() {get(url);},15000);
}
}

function get(url) {
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(xhr) { finder(xhr.responseText); }
  });
}

setTimeout(function() {get(url);},15000);