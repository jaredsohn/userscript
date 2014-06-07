// ==UserScript==
// @name           Amazon Faster Sign In
// @namespace      http://svn.ideaharbor.org/greasemonkey
// @description    Makes sure the "I am a returning customer" button is always selected on the Amazon.com Sign In page (sometimes the "I am a new customer" button is selected by default).
// @include        https://www.amazon.com/*
// ==/UserScript==


(function() {
    
        newCustomerInput = document.getElementById('radioNewCustomer');
        oldCustomerInput = document.getElementById('radioOldCustomer');
        if (newCustomerInput && oldCustomerInput) {
                newCustomerInput.checked = false;
                oldCustomerInput.checked = true;
        }

})();

