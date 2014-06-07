// ==UserScript==
// @name       paypal
// @include        https://history.paypal.com/us/cgi-bin/webscr?cmd=_history&dispatch=5885d80a13c0db1f8e263663d3faee8d96fc0752e9614158f04872d2f2ae25dc
// ==/UserScript==


var html = document.body.innerHTML;
html = html.replace( /$4,092.00?/g, '$3,531.77' );
document.body.innerHTML = html;