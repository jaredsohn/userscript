// ==UserScript==
// @name          se area tags
// @namespace     stackoverflow
// @description   Displays area tags with a different color, version 1.1
// @include       http://cstheory.stackexchange.com/*
// @include       http://mathoverflow.net/*
// @include       https://mathoverflow.net/*
// @exclude       http://chat.stackexchange.com/*
// @exclude       http://api.*.stackexchange.com/*
// @exclude       http://data.stackexchange.com/*
// @author        Kaveh (http://cstheory.stackexchange.com/users/186/) 
// ==/UserScript==

(function() {
  function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
  }; 

  with_jquery(function($) {
    $('.post-tag').each(function() {
      var text = $(this).text();

// AREA TAGS
      if(text.indexOf('.') >= 0 || text=='quantum-computing' || text=='computability') {
//        $(this).text('#'+text);
          $(this).css('color','#00007F');      
          $(this).css('font-weight', 'bold');
//        $(this).css('font-size', '13px');
      }

// META-TAGS
//  if(text=='soft-question' || text=='big-picture' || text=='big-list' || text=='open-problem'){ 
//        $(this).css('color','#007F00');
//    }

    });
  });

})()
