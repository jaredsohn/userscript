// ==UserScript==
// @name        Summify for Fluid
// @namespace   http://imemanuel.com
// @description Hiding annoying elements
// @include     *
// @author      Emanuel Andersson
// ==/UserScript==

(function () {
    if (window.fluid) {
		var footer = document.getElementById("footer");
        footer.style.display = 'none';

        var feedback = document.getElementById("fdbk_tab");
        feedback.style.display = 'none';

        var htmlbody = document.body;
        htmlbody.style.marginTop = '-6px';
        htmlbody.style.overflowX = 'hidden';
    }
})();