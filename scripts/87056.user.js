// ==UserScript==
// @name            MyGoogleReader
// @author          dfayruzov
// @namespace       http://denis.fayruzov.ru
// @include         https://www.google.*/reader/*
// @include         www.google.*/reader/*
// @version         1.0
// ==/UserScript==

(function() {
    var css = '@namespace url(http://www.w3.org/1999/xhtml);';
    css += '#main, #settings-frame, #settings { top:2.1em !important; }';
    css += '#logo-container, #lhn-add-subscription-section, .gbh { display: none !important; }';
    css += '#search { position: inherit !important; }';
    css += '#search-input { width: 150px; }';

    if (typeof GM_addStyle != 'undefined') {
        GM_addStyle(css);
    } else if (typeof addStyle != 'undefined') {
        addStyle(css);
    } else {
        var node = document.createElement('style');
        node.type = 'text/css';
        node.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head').appendChild(node);
    }

    var init = function() {
        var moving_node = document.getElementById('search');
        if (moving_node == null) { setTimeout(init, 100); }
        else {
            var target_node = document.getElementById('viewer-top-controls');        
            var brother_node = document.getElementById('viewer-details-toggle');    
            if ((moving_node != null) && (target_node != null) && (brother_node != null))    {
                 var parent_node = moving_node.parentNode;
                parent_node.removeChild(moving_node);    
                target_node.insertBefore(moving_node, brother_node);
            }
        }    
    }
    init();
    })();
