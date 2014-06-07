// ==UserScript==
// @name           GW2 Client DL Enabler
// @namespace      account.guildwars2.com
// @description    Enables the Download button in the Download Clients section of account.guildwars2.com
// @include        http*://account.guildwars2.com/download*
// ==/UserScript==

var buttons = document.getElementById("content").getElementsByTagName("a");

for(i = 0; i < buttons.length; i++)
{
    if(buttons[i].getAttribute("class") == "yui3-u yui3-button" && buttons[i].innerHTML == "Not Available")
    {
        button = buttons[i];
    }
}

if(button != "oopse!")
{
    button.removeAttribute("disabled");
    button.setAttribute("href", "http://cloudfront.guildwars2.com/client/Gw2.exe");
    button.innerHTML = "Download";
}
else
{
    alert("Arena Net changed something! Remove this UserScript!");
}