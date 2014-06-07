// ==UserScript==
// @name           linkedin_template_message
// @namespace      http://www.linkedin.com/
// @description    Send message via templates
// @include        http://www.linkedin.com/profile?viewProfile*
// ==/UserScript==


document.getElementById("send-message-subject").value = "Your Subject HERE.";
document.getElementById("send-message-body").value = "Your Body Test HERE."

