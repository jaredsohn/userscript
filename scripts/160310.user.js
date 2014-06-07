// ==UserScript==
// @name       CQ text box resizer
// @namespace  http://poknat-cqweb.iespc.ibm.com/
// @version    1.3
// @match      http://poknat-cqweb.iespc.ibm.com/*
// @copyright  2013+
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$(document.body).on('keyup', function(evt) {    
    evt.keyCode === 192 && $("div[id^='cq_widget_CqReadonlyTextArea_']").each(function(index, elem) {
        elem.offsetHeight < 400 && $(elem).parent().css('height', '500px');
    });
});
