// ==UserScript== 
// @name AXIO improvements 
// @namespace http://axio.eot.su/ input/form
// @description Fills zero fields 
// @include http://axio.eot.su/input/form
// ==/UserScript==

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

function main() {
jQuery('body').prepend(function() {
    return jQuery('<div id="superbutton" style="z-index:100;position:fixed"><input type="button" value="Заполнить пустые" /></div>');
})
jQuery('#superbutton').on('click',function() {
    jQuery('div.content input[type="number"]').each(function() {
        if(jQuery(this).val() == '') jQuery(this).val(0);
    });
});
}

// load jQuery and execute the main function
addJQuery(main);
