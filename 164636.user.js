// ==UserScript==
// @name          Generic GerKiN Injector
// @namespace     http://duality-studios.ca
// @description   enables spacial navigation with SHIFT + (W | A | S | D)
// @include       *
// @exclude       *.google.*
// @require       http://userscripts.org/scripts/source/159638.user.js
// @require       http://userscripts.org/scripts/source/164634.user.js
// ==/UserScript==

(function($) {

  $(document).ready( function() {
    function spaceClick(e){
      var elem = $('.hasFocus');
      var code = e.keyCode || e.which;
      if(code == 32){
        var currentTop = $(document).scrollTop();
        var html = $('html, body');
        setTimeout(function(){
          html.animate({
            scrollTop: (currentTop) + 'px'
          }, 0);
          elem.focus();
          elem.click();
        }, 0);
      }
    }
  
    var links = $('a, input, textarea, checkbox, option');
    $('body').keydown(spaceClick);
    links.first().addClass('target-first');
    $('input:text, textarea').on('keydown', function(e){
      var code = e.keyCode || e.which;
      if(code == 27){
	    $(this).blur();
      }
	});
      
    gerkin.navigate_with_keyboard({
      strategy:'spacial nav', //   | "flow tree"
      target_class:'aui-tab-target',
      auto_apply_targeting:function () {
        return $('a, input, textarea, checkbox, option');
      }
    });

    $('head').append('<style type="text/css">' + GM_getResourceText('targetingStyles') + '</style>');
      
  });
})($);
