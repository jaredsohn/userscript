// ==UserScript==
// @name           gmail in germany
// @namespace      gmail
// @description    In Deutschland ist seit einiger Zeit die Domain gmail.com nicht mehr verfügbar. Da es Leute geben soll, die sich das nicht merken können und immer die alte URL eintippen, hier ein Script, was automatisch auf https://mail.google.com/ weiterleitet. (Sie wollen die Seite gmail.de besuchen? Das geht mit diesem Script leider nicht mehr. - Vielleicht kann mir da jemand helfen.)
// @include        *//mail.google.com/gmail/
// @exclude        
// ==/UserScript==


// redirect
window.location.href = "https://mail.google.com/";