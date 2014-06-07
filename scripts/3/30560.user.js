// ==UserScript==
// @name           Anti boulets
// @namespace      http://hordes.fr/anti-boulets
// @description	   Cache les messages des citoyens bannis
// @include        http://hordes.fr/*
// @include        http://www.hordes.fr/*
// ==/UserScript==

setInterval(function()
{
    messages = document.evaluate('//div[@class="author"]/em[contains(text(), "banni")]/../../..[not(@blocked)]', document, null, XPathResult.ANY_TYPE, null);
    while ((message = messages.iterateNext()) != null)
    {
        message.setAttribute('blocked', 'true');
        message.style.display = 'none';
    }
}, 100);