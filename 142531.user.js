// ==UserScript==
// @name          fastbill.einzelpostenTextarea
// @namespace     
// @author        Thomas Kekeisen 
// @description   Erlaubt die mehrzeilige Texteingabe bei Rechnungseinzelnposten
// @include       https://portal.fastbill.com/*
// ==/UserScript==

// Load jQuery
// Thanks to: http://stackoverflow.com/a/6834930/301277
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function()
{
    // jQuery plugin to replace lements
    // Thanks to: http://stackoverflow.com/a/8584217/301277
    (function($) {
        $.fn.changeElementType = function(newType) {
            var attrs = {};
    
            $.each(this[0].attributes, function(idx, attr) {
                attrs[attr.nodeName] = attr.nodeValue;
            });
    
            this.replaceWith(function() {
                return $("<" + newType + "/>", attrs).append($(this).contents());
            });
        };
    })(jQuery);

    // Watch for new inputs
    window.setInterval(function()
   {
        // Get all inputs with name "description"
        var inputsToChange = $('input[name="description"]');

        // Check whether we got some inputs
        if (inputsToChange.length > 0)
        {
            // Transform it into a textarea
            inputsToChange.changeElementType('textarea');
        }
    }, 200); 
});