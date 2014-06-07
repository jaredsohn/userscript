// ==UserScript==
// @name getHighlightedCodeForSkype
// @description Formats the highlighted code obtained from source.virtser.net to HTML suitable for Skype.
// @author Shedal
// @license MIT
// @version 1.0
// @include http://source.virtser.net/*
// ==/UserScript==

if (unsafeWindow.self != unsafeWindow.top) {
    return;
}
    
if (!/source\.virtser\.net/.test(unsafeWindow.location.href)) {
    return;
}

function withJQuery($)
{
    var highlighted = $('#txtCreatedCode');
    
    if(!highlighted.length) {
        return;
    }
    
    var buttonClick = function() {
        var highlighted = $('#txtCreatedCode');
        var tmp = $('<div/>');
        tmp.append(highlighted.val().replace(/&nbsp;/g, '  '));
        highlighted.val($('blockquote > code > font', tmp).html());
        
    }
    
    var transformButton =
        $('<input/>', {
            'type': 'button',
            'id': 'transformButton',
            'value': 'Transform for Skype'
        })
        .click(buttonClick)
        .insertAfter('#btnCreate');
}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")(jQuery);";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

addJQuery(withJQuery);