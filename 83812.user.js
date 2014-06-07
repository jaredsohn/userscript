// ==UserScript==
// @name           AutoblogGalleryMassive
// @namespace      7null.com/GM_scripts
// @description   changes large image button to ALL MASSIVE and waits for click to unleash massive images
// @include        http://www.autoblog.com/photos/*
// @include        http://green.autoblog.com/photos/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js");
  script.addEventListener('load', function () {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
(function () {


$('#hiResUrl').text("ALL MASSSIVE");
$('#hiResUrl').removeAttr("href");
$('#hiResUrl').click(function () {
$('.clearfix, .thumb').removeClass();

$('#featuredgalleries').remove();
$('#thumbstrip-nav img').each(function () {
var x = $(this).attr('src').replace('_thumbnail','');
$(this).attr('src', x);
});

});


}());
}


// load jQuery and execute the main function
addJQuery(main);
