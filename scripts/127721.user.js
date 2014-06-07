// ==UserScript==
// @name           Stilul Porcu
// @namespace      @viulian
// @description    Transforma un text ca sa faca viata mai usoara utilizatorului Porcu de pe acvariu.ro.
// @include        http://www.acvariu.ro/forum/*
// ==/UserScript==



addPorcuButton();

/*
 * Helper method to run func with $ context of jQuery.
 */
function withJQuery(func) {
  if (!unsafeWindow.jQuery) {
    return;
  }
  
  func(unsafeWindow.jQuery);
}

function addPorcuButton() {
  withJQuery(function($) {
      var wmvButton = $("input[name='addbbcode22']");
      if (wmvButton.length == 0) {
        return; // not on edit page
      }
      
      // add new button
      // onclick="bbstyle(22)"
      // onmouseover="helpline('v')"
      var porcButtonDef = '<input type="button" name="addbbcode24" value="Porc" style="WIDTH: 50px" class="button">';
      
      wmvButton.parent().append(porcButtonDef);
      
      var porcButton = $("input[name='addbbcode24']");
      
      // add events
      porcButton.mouseover(function() {
        $('input[name="helpbox"]').val('Apply Porcu style.');
      });
      
      porcButton.click(function() {
        var message = $('textarea[name="message"]').val();
        
        // u -> oo
        message = message.replace(/u/mg, "oo");
        // U -> Oo
        message = message.replace(/U/mg, "Oo");
        
        // pick random word and -> <i>word&trade;</i>
        var words = message.match(/\b([^0-9 ]{3,})\b/mg);
        var word = words[Math.floor(words.length*Math.random())];
        message = message.replace(word, "[i]" + word + "[/i]™");
        
        $('textarea[name="message"]').val(message);
      });
      
  });
}