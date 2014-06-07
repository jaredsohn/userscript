// ==UserScript==
// @name       Klix cenzura
// @namespace  http://www.klix.ba
// @version    0.1
// @description  Uklanjanje sekcije "Ljepotice" sa Klix.ba stranice
// @matches      http://klix.ba/*
// @matches      http://www.klix.ba/*
// @copyright  2012+, Amir Ahmic
// ==/UserScript==



// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  $('.ticker').each(function(){
    if($(this).children('a').attr('href') == 'magazin/ljepotice'){
        $(this).parent().parent().html('Sadržaj uklonjen');
    }
});
}

// load jQuery and execute the main function
addJQuery(main);