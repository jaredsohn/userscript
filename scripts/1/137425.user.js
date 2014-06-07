// ==UserScript==
// @name        TryJasmine-widescreen
// @namespace   http://jason.karns.name
// @match       http://tryjasmine.com/*
// @version     1
// ==/UserScript==

function contentEval(source) {
  if ('function' == typeof source) { source = '(' + source + ')();'; }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function(){
  (function($){
    widescreen = function(){
      var widescreen = localStorage['verticalSplit'] !== "false";

      $('.body-wrap').css('width', widescreen? '98%' : '');
      $('.editor-wrapper').css('width', widescreen? '49%' : '');
      $('.editor').css('width', widescreen? '48%' : '');

      $('#src, #specs').each(function(index, editor){
        if(editor = $(this).data('editor')) editor.resize();
      });

    };

    widescreen();
    $(document).delegate('.flip-editors', 'click', widescreen);
  })(jQuery);
});
