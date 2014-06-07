// ==UserScript==
// @name           Creationists to Design proponents
// @namespace      http://userscripts.org/users/87014
// @description    Corrects a minor terminology error across the internet.
// ==/UserScript==


document.body.innerHTML = replaceAll(document.body.innerHTML, /* (1) */'reation','design proponents');
// (1): could be capital or lower case c, better just omit it from the search.

function replaceAll(text, strA, strB)
{
    while ( text.indexOf(strA) != -1)
    {
        text = text.replace(strA,strB);
    }
    return text;
}