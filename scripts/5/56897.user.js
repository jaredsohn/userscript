// ==UserScript==
// @name           mail.com
// @namespace      diamethuel
// @description    account creator autofill
// @include        https://signup.mail.com/
// ==/UserScript==

{

// Domain Name
    document.getElementById("Domainname").value = 'mail.com';
// Security Question
    document.getElementById("SecQuestion").value = 'What city were you born in?';
// Security Question Answer
    document.getElementById("SecAnswer").value = 'San Diego?';
// City
    document.getElementById("City").value = 'San Diego';
// State
    document.getElementById("State").value = 'CA';
// Zip Code
    document.getElementById("Zip").value = '92129';


}