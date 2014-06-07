// ==UserScript==
// @name           StackOverflow Interesting Tags First
// @namespace      stackoverflow
// @description    Moves all interesting tags to the top of the queue - this is the fork of http://userscripts.org/scripts/show/54938
// @include        http://*stackoverflow.com/*
// @include        http://*serverfault.com/*
// @include        http://*superuser.com/*
// @include        http://*mathoverflow.net/*
// @include        http://area51.stackexchange.com/*
// @include        http://*stackexchange.com/*
// ==/UserScript==

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function($) {
  var executeMove = function() {
    var interestings = $('.question-summary.tagged-interesting');
    if(interestings.length){
      interestings.parent().prepend(interestings);
    }else{
      setTimeout(executeMove, 300);
    }
  };
  executeMove();
});
