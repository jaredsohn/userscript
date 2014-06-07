// ==UserScript==
// @name        SEEING SOMEONE (OkC)
// @namespace   www.abiteasier.in
// @description If the user's status is "Seeing Someone", make it bold and ALLCAPS and red. 
// @include     http://www.okcupid.com/profile/*
// @version     0.8.1
// @grant       none
// ==/UserScript==

set_style(document.getElementById('ajax_status'));

function add_css(css_string) { 
    var head = document.getElementsByTagName('head')[0]; 
    if (!head) {
        return;
    }
    var new_css = document.createElement('style'); 
    new_css.type = "text/css"; 
    new_css.innerHTML = css_string; 
    head.appendChild(new_css); 
}

function set_style(statNode)
{
    if (statNode.innerHTML.trim().toUpperCase() === 'Seeing someone'.toUpperCase()) {
        add_css(['div#basic_info div#aso_loc span#ajax_status',
                '{',
                'text-transform: uppercase !important ;',
                'font-size: 15 !important ;',
                'font-weight: bold !important ;',
                'color: #ff0000 !important ;',
                'background-color: #ffff00 !important ;',            
                '};'].join('\n')
              );
    }
}

