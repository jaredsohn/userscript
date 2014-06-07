// ==UserScript==
// @name           Personalizer - Mil
// @namespace      it3
// @description    Personalise messages like a dream
// @include        http://www.cybernations.net/send_message.asp*
// ==/UserScript==

var title = "Comrade, " ;
var message = "\n\n As you know we have waded into the fray in support of our ally, NSO. We currently have targets in the U0 for you that are TOP and MI6. While any alliance has it's heavy hitters, I was quite surprised at how many low tech ratios and unimpressive warchests we are seeing from the enemy. We need every Delta level NPO nation to come in and take just ONE target from the UO, and only one for now. We are wary of counters and while U0 is loaded or if you are looking for something special get on IRC and see RagnarBuliwyf your LT. \n\n This is it Comrades - probably the most fun we are going to have in a war for a while!! If you have any questions or concerns at all don't hesitate to contact me. \n\n o/ \n\nRagnarBuliwyf \n\nDelta LT" ;


var intro = "Greetings, " ; 
// Don't change this
var ruler = document.forms["FrontPage_Form1"].elements["messaging_toid"].value ;
// avoid changing these
document.forms["FrontPage_Form1"].elements["messaging_subject"].value = title + ruler ;
document.forms["FrontPage_Form1"].elements["messaging_message"].value = intro + ruler + message ;