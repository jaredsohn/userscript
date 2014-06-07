// ==UserScript==
// @name   CA Legislative Process Demystification
// @namespace  http://davisdollars.org
// @description Explain what the legislative process jargon actually means! See http://bit.ly/did8hx for an example
// @include  http://leginfo.ca.gov/pub/*
// ==/UserScript==

var html = document.body.innerHTML;
html = html.replace( 'Chaptered by Secretary of State', 'Chaptered by Secretary of State (<b><span style="color:orange">TRANSLATION</span></b>: This bill is now law)' );
html = html.replace( 'Enrolled.', 'Enrolled (<b><span style="color:orange">TRANSLATION: </span></b>The Legislature passed this bill; it now requires action by the Governor).' );
html = html.replace( 'To third reading.', 'To third reading (<b><span style="color:orange">TRANSLATION: </span></b>This bill is now on the Floor, awaiting a vote).' );
html = html.replace( 'Do pass.', 'Do pass (<b><span style="color:orange">TRANSLATION: </span></b>This bill is headed toward the Floor for a vote).' );
html = html.replace( 'Do pass as amended.', 'Do pass as amended (<b><span style="color:orange">TRANSLATION: </span></b>This bill is headed toward the Floor for a vote).' );
document.body.innerHTML = html;