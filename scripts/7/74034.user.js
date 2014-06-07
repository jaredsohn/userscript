// ==UserScript==
// @name          spreadlink.us delay killer
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Kills the delay on spreadlink.us and redirects you directly
// @include       http://spreadlink.us/*
// ==/UserScript==

// Try to find the form
var form = document.getElementById('lassdas');

// Check whether we could not found the form
if (!form)
{
    // Try to find the first form on the page (fallback)
    var allForms = document.getElementsByTagName('form');
    
    // Check whether we found some <form> tags
    if (allForms.length > 0)
    {
        // Cache the first form
        form = allForms[0];
    }
}

// Check whether we found a form now
if (form)
{
    // Submit the form directly
    // Otherwise the submit button will be shown after 10 seocnds
    form.submit();
}