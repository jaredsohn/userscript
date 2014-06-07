// ==UserScript==
// @name nCore || Link a hírfolyamhoz Képpel
// @namespace created by gala 
// @description Link beszúrása a hírfolyamhoz!
// @include http://ncore.cc/*
// ==/UserScript==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main(){
$("div.news_sepa").each(function() {
    var id = $(this).attr("id").replace("newssep_row_", "");
    $(this).append( '<a href="http://ncore.cc/?action=news&id=' + id + '"><img src="http://picstore.eu/di-JP68.png" /></a>' );
});
}

addJQuery(main);