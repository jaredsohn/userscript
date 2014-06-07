// ==UserScript==
// @name        Bitbucket MyOpen
// @namespace   bitbucket
// @description To add button to show my open issues
// @include     https://bitbucket.org/*
// @version     1
// ==/UserScript==


function addButton()
{
var urlParams = {};
(function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

    var $ = jQ;
    var $toolbar = $('#issues-toolbar>div:eq(1)');
    if($toolbar){
        var $open = $('a:eq(0)',$toolbar); 
        var $my =$('a:eq(1)',$toolbar);
        var $my_open =$('<a class="aui-button aui-style" href="">My Open</a>');
        $toolbar.append($my_open);
        var my_href = $my.attr('href').split("?")[1];
        var clear_href = location.protocol +'//'+ location.host + location.pathname;
        
        if(urlParams.status === 'open' && urlParams.responsible){
          $my_open.attr('aria-pressed', 'true');
          $my_open.attr('href', clear_href);
        }else{
          $my_open.attr('href', clear_href + '?status=open&' + my_href);
        }
    }
}


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// load jQuery and execute the main function
addJQuery(addButton);