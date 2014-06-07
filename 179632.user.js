// ==UserScript==
// @name          re-enable comments
// @description   re-enables bsn comments
// @include       http://social.bioware.com/*
// @version       2013.10.10
// @grant         none
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

// the guts of this userscript
function main() {
	jQ("textarea.newsfeedplus_comment").show();
}

// load jQuery and execute the main function
addJQuery(main);