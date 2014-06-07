// ==UserScript==
// @name       bricodepot true zoom
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description Depuis le nouveau site de BricoDepot le zoom est pourri. Ce user script remet une visionneuse convenable pour zoomer les photos (FancyBox)
// @match      http://www.bricodepot.fr/*
// @copyright  2013, sdjeser
// ==/UserScript==

(function(){
    var main_code = function() {
        window.checkBricoLoaded = function(){
            console.log('**** check');
            if (!window.jQuery || ! window.jQuery.fancybox) {
        		window.setTimeout(window.checkBricoLoaded, 800);
                return;
            }
            console.log("fancybox loaded");
			$(".thumbs a").fancybox();
        };
        window.setTimeout(window.checkBricoLoaded, 800);
    };
    
    try {
		var css = document.createElement("link");
		css.type = "text/css";
        css.rel = "stylesheet";
        css.href = '//cdn.jsdelivr.net/fancybox/2.1.4/jquery.fancybox.css';
		document.getElementsByTagName("head")[0].appendChild(css);

        var scr = document.createElement("script");
		scr.type = "text/javascript";
        scr.src = '//cdn.jsdelivr.net/fancybox/2.1.4/jquery.fancybox.pack.js';
		document.getElementsByTagName("head")[0].appendChild(scr);

        var script = document.createElement("script");
        script.innerHTML = "(" + main_code.toString() + ")();";
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);
	} catch (err) {
		console.log("bricodepot true zoom / init error: ", err);
	}

})();