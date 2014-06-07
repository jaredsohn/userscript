// ==UserScript==
// @name        Campfire hide row button
// @namespace   none
// @include     *.campfirenow.com/room*
// @version     1.0.2
// @run-at      document-end
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    // Note, jQ replaces $ to avoid conflicts.
    var addHideRowButtons = function() {
        //alert('adding rows');
        var rows = jQ('tr.text_message, tr.paste_message, tr.upload_message').not('.done').addClass('done');
        jQ.each(rows, function(index, item) {
            jQ(item).find('td.body > div.body').after(' <span style="float:left;" class="hide-message"><small><i><a href="#' + item.id + '" style="color:#999;" onclick="jQ(\'tr#' + item.id + ' div.body\').toggle(); jQ(\'tr#' + item.id + ' .show-message\').toggle(); jQ(\'tr#' + item.id + ' .hide-message\').toggle(); return false;">Hide</a></i></small><span>');
            jQ(item).find('td.body').prepend('<div style="display:none;" class="show-message"><small><i><a href="#' + item.id + '" style="color:#000;" onclick="jQ(\'tr#' + item.id + ' div.body\').toggle(); jQ(\'tr#' + item.id + ' .show-message\').toggle(); jQ(\'tr#' + item.id + ' .hide-message\').toggle(); return false;">Show this message</a></i></small></div>');
        });
        
        //Automatically hide images by default
        jQ(rows).has('div.body a.image img').each(function(index, item) {
            jQ(item).find('.hide-message a').click();
        });
    };
    
    document.addEventListener("DOMNodeInserted", addHideRowButtons, false);
    //window.addEventListener("load", addHideRowButtons, false);
    addHideRowButtons();
    
    var resizeChat = function() {
        jQ('#chat-wrapper > style#updated').html('');
        var rowWidth = jQ('#chat td.body div').last().width();
        jQ('#chat-wrapper > style').last().before("<style type=\"text/css\" id=\"updated\">#chat td.body div { width: " + (rowWidth-24) + "px !important; } .show-message:hover a, .hide-message:hover a{ background-color:#9cf;}</style>");
    };
    
    window.addEventListener("resize", resizeChat, false);
    resizeChat();

}

// load jQuery and execute the main function
addJQuery(main);

/* ** Change log **
v1.0:
 * Initial version, hide and show all text/image messages
 
v1.0.1
 * Bug fix: jQuery conflict causing images to be hidden
 
v1.0.2
 * Bug fix: Uploaded images cannot be hidden
 * Bug fix: Code blocks cannot be hidden
 * Feature Request: Hide images by default 
 
*/