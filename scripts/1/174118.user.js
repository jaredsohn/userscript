// ==UserScript==
// @name        Fix Jenkins Links
// @namespace   https://ci.inria.fr/
// @include     https://ci.inria.fr/medinria/computer/*
// @version     1
// ==/UserScript==

var table = document.getElementById('projectstatus');
var first_row = table.firstChild.firstChild;


function fixLinks() {
  var row = first_row.nextSibling;
  while(row) {
    row = row.nextSibling;
    
    var links = row.getElementsByTagName('a');
    // Find actual name of job
    var job_name = "";
    for(var i = 0; i < links.length; i++) {
      var quote_pos = links[i].text.indexOf("»");
      if (quote_pos != -1) {
        job_name = links[i].text.substring(0, quote_pos-1);
        console.log("job_name: " + job_name);
      }
    }
    
    if (job_name != "") {
      for(var i = 0; i < links.length; i++) {
        console.log("Fixing " + links[i].href);
        links[i].href = links[i].href.replace(/\/[^\/]+\.\//, "/" + job_name + "/");
        console.log("Done " + links[i].href);
      }
    }  
  }
}

setTimeout (fixLinks, 500);

table.addEventListener("DOMSubtreeModified", fixLinks, false);
