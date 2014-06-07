// ==UserScript==
// @name      Gmail Send Attachment Confirmation Dialog
// @version   1.0
// @description  Gmail Send Attachment Confirmation Dialog
// @run-at    document-start
// @require   http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @include     http*://mail.google.com/mail/*
// ==/UserScript==

if (window.top != window.self){  //don't run on frames or iframes
    return;
}

window.addEventListener ("load",LocalMain,false);

function LocalMain ()
{
    window.setInterval(function(){
    	var sendElement=$('table .HE td div[role="button"][data-tooltip^="Send"]');
        var emailMessage=$('div[role="textbox"][aria-label="Message Body"]')[0].innerHTML.toString().toLowerCase();
        var attachmentLength=$('div[aria-label^="Attachment"] div[role="button"]').length;
        console.log($('table .HE td div[role="button"][data-tooltip^="Send"]'));
        var object = $._data($('table .HE td div[role="button"][data-tooltip^="Send"]').get(0), "events");
        console.log(object);
        sendElement.unbind();
        sendElement.click(function(e) {
            if ((emailMessage.indexOf('attach') > -1 || emailMessage.indexOf('attachment') > -1) && attachmentLength < 1) {
                alert("Please attach the appropriate file, or remove the keyword (attach or attachment) from the message.");
            }
        });
    },1000);
}
