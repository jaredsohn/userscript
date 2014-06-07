// ==UserScript==
// @name           Kipa Unlimited messages
// @namespace      http://www.theiceman.co.il/
// @description    Read messages at kipa.co.il even if you over limit
// @include        http://www.kipa.co.il/My/*
// ==/UserScript==
function show_msg_over(msg_id) {
        show_msg(msg_id);
}

function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

embedFunction(show_msg_over);
