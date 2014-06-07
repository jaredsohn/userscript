// ==UserScript==
// @name       Fix the damn mq-console
// @namespace  http://meeuw.org/
// @version    0.1
// @description  The silly dropdown to move/copy-message is too small and contains unreadable display values. This simply copies the actual values to the inner html
// @match      http://localhost:8161/admin/message.jsp*
// @match      http://mq.test.vpro.nl:8262/message.jsp*
// @match      http://mq-dev.poms.omroep.nl/message.jsp*
// @match      http://mq-test.poms.omroep.nl/message.jsp*
// @match      http://mq.poms.omroep.nl/message.jsp*
// @copyright  2012+, Michiel Meeuwissen
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==
window.addEventListener("DOMContentLoaded", function() {    
    jQuery('#queue option').each(function (index, option) { 
        jQuery(option).html(option.value); 
    });
}, false);
