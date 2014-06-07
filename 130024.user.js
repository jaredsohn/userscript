// ==UserScript==
// @name           RapidLeech helper - ads bypass
// @namespace      RapidLeech helper - ads bypass
// @description    RapidLeech helper - ads bypass
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version        1.0.0
// ==/UserScript==

// Wait for document ready

$(document).ready(function () {

    // Check if the site is RapidLeech based 
    
    var checkname = $("html").text().toLowerCase();

    if(((checkname.indexOf("leech") > -1)) && ($("form[name='transload']").length)){

        // Insert fixed button with bypass function

        $('<div style="margin-top: 10px;">' +
            '<input id="fixed_button" class="super button green" type="button" value="Bypass!" />' + 
        '</div>')
        //    .insertAfter("input[class='download_url']");
            .insertAfter("form[name='transload']");

        $("#fixed_button").click(function() {
            bypass();
        });

        function bypass(){
            
            $('form[name=transload]').submit();

        };

        $("input[name='link']").attr('value','RapidLeech bypassed');
        
        $("input, textarea").focus(
            function()
            {
                // only select if the text has not changed
                if(this.value == this.defaultValue)
                {
                    this.select();
                }
            }
        )
    }

});


// Add style to button

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(' \
    #fixed_button, #fixed_button:visited { \
        background: #222 url(overlay.png) repeat-x; \
        display: inline-block; \
        padding: 5px 10px 6px; \
        color: #fff; \
        text-decoration: none; \
        -moz-border-radius: 6px; \
        -webkit-border-radius: 6px; \
        -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.6); \
        -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.6); \
        text-shadow: 0 -1px 1px rgba(0,0,0,0.25); \
        border-bottom: 1px solid rgba(0,0,0,0.25); \
        position: relative; \
        cursor: pointer; \
        width: auto; \
        height: auto; \
    } \
    .small#fixed_button, .small#fixed_button:visited { \
        font-size: 11px; \
    } \
    #fixed_button, #fixed_button:visited, .medium#fixed_button, .medium#fixed_button:visited { \
        font-size: 13px; \
        font-weight: bold; \
        line-height: 1; \
        text-shadow: 0 -1px 1px rgba(0,0,0,0.25); \
    } \
    .large#fixed_button, .large#fixed_button:visited { \
        font-size: 14px; \
        padding: 8px 14px 9px; \
    } \
    .super#fixed_button, .super#fixed_button:visited { \
        font-size: 34px; \
        padding: 8px 14px 9px; \
    } \
    .pink#fixed_button, .magenta#fixed_button:visited   { background-color: #e22092; } \
    .pink#fixed_button:hover                            { background-color: #c81e82; } \
    .green#fixed_button, .green#fixed_button:visited    { background-color: #91bd09; } \
    .green#fixed_button:hover                           { background-color: #749a02; } \
    .red#fixed_button, .red#fixed_button:visited        { background-color: #e62727; } \
    .red#fixed_button:hover                             { background-color: #cf2525; } \
    .orange#fixed_button, .orange#fixed_button:visited  { background-color: #ff5c00; } \
    .orange#fixed_button:hover                          { background-color: #d45500; } \
    .blue#fixed_button, .blue#fixed_button:visited      { background-color: #2981e4; } \
    .blue#fixed_button:hover                            { background-color: #2575cf; } \
    .yellow#fixed_button, .yellow#fixed_button:visited  { background-color: #ffb515; } \
    .yellow#fixed_button:hover                          { background-color: #fc9200; } \
');