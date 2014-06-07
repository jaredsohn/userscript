// ==UserScript==
// @id             removeAutocomplete
// @name           removeAutocomplete
// @version        1.0
// @namespace      
// @author         Daniel
// @description    removeAutocomplete
// @run-at         document-end
// ==/UserScript==


var inputs = document.querySelectorAll('input[autocomplete]')
for(var i=0;i<inputs.length;i++)
{
    inputs[i].removeAttribute('autocomplete');
}
