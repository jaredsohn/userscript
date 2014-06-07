// ==UserScript==
// @name Sports.ru userscript
// @description Userscript for sports.ru
// @author Alexey Knyazev
// @license MIT
// @version 1.0
// @include http://www.sports.ru/*
// ==/UserScript==

// wrap the script in a closure (opera, ie)
// do not spoil the global scope
// The script can be transformed into a bookmarklet easily :)
(function(window, undefined ) {

	// normalized window
	var w;
	if (unsafeWindow != "undefined"){
		w = unsafeWindow 
	} else {
		w = window;	
	}

	// You can inject almost any javascript library here.
	// Just pass the w as the window reference,
        // e.g. jquery.min.js embedding:
	// (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);


	// do not run in frames
	if (w.self != w.top){
		return;
	}

    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "window.jQ=$.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    function runScript(callback) {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }

    function initSportsRu(){
        var sportsRuMng = {
            init : function(){
                this.hideReadAlsoBlock();
            },

            hideReadAlsoBlock: function(){
                $('[data-control="Common.ReadAlso"]').remove();
            }
        }

        sportsRuMng.init();
    }

    // additional url check.
    // Google Chrome do not treat @match as intended sometimes.
    if (/http:\/\/www\.sports.ru/.test(w.location.href)){
        //addJQuery(init_sportsRu);
        runScript(initSportsRu);
    }

})(window);