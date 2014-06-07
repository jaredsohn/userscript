// ==UserScript==
// @name           OTS_recruiting
// @namespace      dwthegreat@hotmail.com
// @include        http://www.cybernations.net/send_message.asp?Nation_ID=*
// ==/UserScript==
subject = document.getElementsByTagName("input")[2];
subject.setAttribute("value","Order of the Sword");

textarea = document.getElementsByTagName("textarea")[1];
recruit_message = "Hail!I'm [name], and I'd like to invite you to join the Order of the Sword! We're a black team alliance that is seeing tremendous growth, with our detailed plan for continued expansion. We are determined to make it a success, and I'd like to offer you the chance to be a part of it.Join today to receive an education in Cyber Nations, as well as the chance to be a part of a growing alliance and, if you're active, receive promotions to official government positions within the alliance.You will be added to our aid list if you complete the admission process and remain active for a good bit, no strings attached. Most nations on our aid list receive about $3 million every week.If you'd like to join, check us out here:www.swordorder.com/forumsRegister an account with the same name as your nation ruler. Then, apply for membership in the "Admissions" Yours truly,"
textarea.innerHTML = recruit_message;