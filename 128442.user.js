// ==UserScript==
// @name           WebCat WebObject downloader
// @namespace      wod
// @description    WebCat WebObject downloader
// @include        http://web-cat2.cs.vt.edu/Web-CAT/WebObjects/Web-CAT.woa/wo/*
// ==/UserScript==



// http://stackoverflow.com/a/3550261
function wod_addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


wod_addJQuery(wod_main);

function wod_main(){

  createUI();

  function createUI() {
    if ($("table.srcView#bigtab").length > 0) {
      var filenameSpan = $("span[dojoattachpoint=titleNode].dijitTitlePaneTextNode");
      var filename = $(filenameSpan).text();
      $(filenameSpan).after("(<a href='" + generateDataURI(getSrc()) +" ' class='webcat-wod-download-link'>Download</a>)");
      
    }
  }

  function getSrc(){
    var tr = $("table.srcView#bigtab > tbody > tr");
    var src = '';
    $(tr).each(function(index,element){
      
      var srcLine = $(element).children("td").children("pre.srcLine");
      src = src +  $(srcLine).text().substr(1) + "\r\n";
      
    });
    return src;
  }

  function generateDataURI(src){
    return "data:text/plain;charset=utf-8," + encodeURI(src);
  } 
}
