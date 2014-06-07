// ==UserScript==
// @name          Octopus - Highlight Version missmatch
// @namespace     http://octopus/
// @description   Highlight Version mismatch
// @include       http://octopusservergoeshere/
// ==/UserScript==

window.octopus = {};

window.octopus.highlight = function (){
    var ul = $('<ul/>').appendTo('body');
    $.each($('table.release-matrix tr.project-row'), function(key, row) {
        var version = false;
        $.each($('td .release.navigate h4', row), function(key, h4) {
			var thisversion = h4.innerText;
            version = version || thisversion;
            if (version != thisversion){
                $(h4).css('background-color', 'red');
            }
        });
    });
};

// Add jQuery
(function(){
    $(document).ajaxSuccess(function(){octopus.highlight();});
})();