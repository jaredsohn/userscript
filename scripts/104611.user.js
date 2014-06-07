// ==UserScript==
// @name           Facebook Gender Neutralizer
// @namespace      rose
// @description    Provides the option to ungender oneself on Facebook, pronouns and all
// @include        http*://www.facebook.com/editprofile.php*
// ==/UserScript==

// For a one-liner like this, there really probably is a simpler way
// than a Greasemonkey script, but this is the only means by which I've 
// gotten it to work in Firefox so far.

document.getElementById("sex").innerHTML = '<option value="0">Other/Prefer not to answer</option><option value="1">Female</option><option value="2">Male</option>'

// I know this isn't perfect. For true justice, Facebook would have to provide
// a blank for the user to fill in for gender or omit the category entirely,
// but hopefully this will at least improve circumstances.
