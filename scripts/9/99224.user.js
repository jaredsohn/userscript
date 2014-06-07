// ==UserScript==
// @name           Stack Overflow Box Mod: For the 9th Box
// @namespace      SOUNTAGS
// @description    Reverts the styling changes to voting system and improves usability
// @include        http://stackoverflow.com/*
// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
    $(function() {
        try {
            $('.unanswered').css({
                "background-color": "rgba(240, 201, 22, 0.6)",
                "border": "1px solid #000000",
                "color": "#000000"
            });

            $('.unanswered strong').css('color', 'rgba(0,0,0,1) !important;');


            $('.answered').css({
                "background-color": "rgba(240, 201, 22, 0.9)",
                "border": "1px solid #000000",
                "color": "#000000"
            });

            $('.answered strong').css('color', 'rgba(0,0,0,1) !important;');
			
			$(".tagged-interesting").css({
                "background-color": "rgba(240, 201, 22, 0.4)",
                "border": "1px solid #000000",
			});
			

        } catch (all) {}
    });
});