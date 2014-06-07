// ==UserScript==
// @name Login KMITL
// @namespace http://userscripts.org/users/useridnumber
// @include https://161.246.254.213/dana-na/auth/url_default/welcome.cgi*

// @include https://161.246.254.213/dana-na/auth/welcome.cgi*
// @include https://161.246.254.213/dana/home/infranet.cgi*
// ==/UserScript==

function Check_Login() { if( document.location.href == logedinURL ){ var new_obj = document.getElementById('liveclock2').childNodes[2].textContent; var hours = parseInt(new_obj.substring(2,4)); if ( hours <= 4 ) { document.getElementById('Extendbg').click(); } } else{ } }

var setURL = 'https://161.246.254.213/dana-na/auth/url_default/welcome.cgi'; var sesionURL = 'https://161.246.254.213/dana-na/auth/welcome.cgi?p=extend-session'; var logedinURL = 'https://161.246.254.213/dana/home/infranet.cgi';
var foff='https://161.246.254.213/dana-na/auth/url_default/welcome.cgi?p=forced-off';

if( document.location.href == setURL ||document.location.href == foff || document.location.href == sesionURL ){ document.forms[0].elements[1].value = 's5011320'; document.forms[0].elements[2].value = 'ryxxqEex'; document.forms[0].submit(); }

var checked = function() { Check_Login() }; window.setInterval(checked, 5000);
// ==/UserScript==