// ==UserScript==
// @name nCore || Premium eltávolítása
// @namespace created by gala 
// @description Link beszúrása a hírfolyamhoz!
// @include http://ncore.cc/*
// @include https://ncore.nu/*
// @include https://ncore.cc/*
// @include http://ncore.nu/*
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main(){
$("a.premium").remove();
}
addJQuery(main);