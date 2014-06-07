// ==UserScript==
// @name         Clean Delicious
// @namespace    CleanDelicious
// @include      http://delicious.com/*
// @include      http://*.delicious.com/*
// @author       Jean-Baptiste B
// @description  This userscript is meant to clean delicious profile interface by removing useless items.
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
$('#systemStatus, #browseNav, #userNav li a img.headerProfilePic, .sidebar .sidebarProfilePic, .sortBy, .sidebar h3, .sidebar #tagList, .sidebarSort, .sidebar .sidebarStats li:first-child, .sidebarStats li:nth-child(2), .profilePicAndNotes .pic').css('display', 'none');
$('#banner .search-box').css('margin-left', '460px');
$('.post h4').css('font-size', '13px');
$('.tabs li, .pills li').css('float', 'right');
$('.tabs li a').css({'font-size':'12px', 'line-height':'24px'});
$('.linkCount').css('margin', '-36px 0 7px 5px');
$('.sidebar .sidebarStats').css({'border':'none', 'font-size':'13px', 'margin-bottom':'0', 'padding-bottom':'0'});
$('.sidebar .sidebarStats li').css({'margin':'5px 10px 0 0', 'text-align':'right'});

$('.post .actions').css({'width':'180px', 'margin':'0 -200px 6px 0', 'float':'right', 'height':'auto'});
$('.bulkSelect').css('height', '20px');
$('.linkList').css('width', '960px');
$('.post').css('padding', '5px 0');

$('.profilePicAndNotes .notes').css({'margin-left':'0', 'width':'625px', 'text-align':'justify'});

$('.post .actions .bookmark-actions').css('top', '39px');
$('.post .actions .brickStats').css({'left':'auto','right':'0'});
$('.sidebar > a').html('View all tags').css({'float':'right', 'margin':'0 10px 0 0'});


}

// load jQuery and execute the main function
addJQuery(main);