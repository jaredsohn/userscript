// ==UserScript==
// @name        IsaAllowanceSummary
// @namespace   eelcodevlieger
// @description Show Summary of ISA Allowance on HL ISA account summary page
// @include     https://online.hl.co.uk/my-accounts/account_summary/account/22
// @include     https://online.hl.co.uk/my-accounts/account_summary?account=22
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

console.debug('start');

var accountsTopBar = document.getElementById('accounts-top-bar');
console.debug(accountsTopBar);


/* Converts a string like '£3,740.52' to a float of 3740.52  */
function parseAmount(amountStr){
    console.debug('parseAmount: ' + amountStr);
    var amount = parseFloat( amountStr.trim().replace(",", "").substr(1) );
    console.debug('amount=' + amount);
    return amount;
}

// Insert placeholder div, so the content doesn't jump out of place when the Ajax request loads the ISA details div
// TODO merge placeHolder and ISA div style/code
var placeHolderDiv = document.createElement('div');
placeHolderDiv.innerHTML = "<br/><i>Loading ISA details..</i>";
placeHolderDiv.style.minHeight="65px";
placeHolderDiv.style.margin="40px 30px 0px 30px";
placeHolderDiv.style.textAlign="center";
placeHolderDiv.style.backgroundColor="#abadad";
placeHolderDiv.style.borderRadius="15px";
accountsTopBar.parentNode.insertBefore(placeHolderDiv, accountsTopBar.nextSibling);

// Ajax request to grab the ISA subscription amounts from the 'vantage_application_isa_topup' page
GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://online.hl.co.uk/my-accounts/vantage_application_isa_topup',
    onload: function (response) {
        console.debug('onload');
        
        var doc = document.implementation.createHTMLDocument("doc");
        doc.documentElement.innerHTML = response.responseText;
        console.debug(doc);
        
        var subscribedAmount = 0;
        var remainingAmount = 0;
        
        // Get the div listing the ISA subscription amounts
        var fieldsets = doc.getElementsByTagName('fieldset');
        var result = "Text not found";
        for(var i = 0; i < fieldsets.length; i++){
            var div = fieldsets[i].getElementsByTagName('div')[0];
            var divText = div.textContent;
            if( divText.trim().indexOf("So far this tax year") == 0 ){
                console.debug("match");
                console.debug(div);
                result = div;
            }
        }
        console.debug(result);
        
        // Replace placeholder div with the ISA details div
        placeHolderDiv.style.display="none"; 
        accountsTopBar.parentNode.insertBefore(result, accountsTopBar.nextSibling);
        
        // Parse the amounts from the subscription amounts string
        var isaAmounts = result.getElementsByTagName('strong');
        console.debug(isaAmounts);
        subscribedAmount = parseAmount( isaAmounts[0].textContent );
        remainingAmount = parseAmount( isaAmounts[1].textContent );
        
        var totalAmount = subscribedAmount + remainingAmount;
        console.debug('subscribedAmount=' + subscribedAmount);
        console.debug('remainingAmount=' + remainingAmount);
        console.debug('totalAmount=' + totalAmount);

        // Display total amount too
        result.innerHTML = result.innerHTML + " You are allowed to invest up to <b>£" + totalAmount.toLocaleString("en-GB", {style: "currency", currency: "GBP", minimumFractionDigits: 2}) + "</b> this tax year.";
        
        // Show a percentage bar of subscribedAmount -> total as green -> gray
        var subscribedPercentage = subscribedAmount / totalAmount * 100;
        result.style.float="left";
        result.style.padding="15px";
        result.style.margin="40px 30px 0px 30px";
        result.style.textAlign="center";
        result.style.background="linear-gradient(to right, #1A8415 " + subscribedPercentage + "%,#abadad " + subscribedPercentage + "%)";
        result.style.borderRadius="15px";
        result.style.minHeight="35px";
        
        console.debug('onload done');
    }
});

console.debug('done');