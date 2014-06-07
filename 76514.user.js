// ==UserScript==
// @name          4p-nick_highlight
// @namespace      seph` (seph.pot@gmail.com)
// @description    highlight nick
// @include        http://forum.4pforen.4players.de/viewtopic.php*
// ==/UserScript==

function conprom (e) {
  GM_setValue("hlnick", (prompt('Hervorzuhebenden Nick eingeben',GM_getValue("hlnick"))));
}
GM_registerMenuCommand("Highlight Nicks", conprom);


var spans = document.getElementsByClassName("name"), users=[];
for(i=0;i<spans.length;i++)
{
    users[i] = spans[i].textContent;
    if(users[i]==GM_getValue("hlnick"))
        spans[i].style.backgroundColor = "yellow";
}