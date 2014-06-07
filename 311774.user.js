// ==UserScript==
// @name        QOFCheckoutWithFakeName
// @namespace   http://userscripts.org/users/553666
// @include     https://*/apex/*createticketorder*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function pad (str, max) {
	return str.length < max ? pad("0" + str, max) : str;
}

var emailDomain;

$("td[id*=commandButtons]").append("<input id='FakeName' type='button' value='Get Fake Name' class='btn' />");

$("#FakeName").on("click", function() {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://www.fakenamegenerator.com/gen-random-us-us.php",
        onload: function(response) {
            var $fakeNameDocument = $(response.responseText);
            var fullName = $fakeNameDocument.find("div.address").find("h3").text().trim();
            var splitName = fullName.split(/\s[A-Z][\.]\s/);
            var firstName = splitName[0];
            var lastName = splitName[1];
            var fullAddress = $fakeNameDocument.find("div.adr").html().trim();
            var splitAddress = fullAddress.split(/<br>/);
            var streetAddress = splitAddress[0].trim();
            splitAddress = splitAddress[1].trim().split(',');
            var city = splitAddress[0].trim();
            splitAddress = splitAddress[1].trim().split(' ');
            var state = splitAddress[0];
            var zipCode = splitAddress[1];
            var $extra = $fakeNameDocument.find("div.extra");
            var phone = $extra.find("li.tel").find("span.value").text().trim();
            var email = $extra.find("li.email").find("span.value").text().trim();
            if (emailDomain) {
                email = email.replace(/@.*/, "@" + emailDomain);
            }
            var $li = $extra.find("li");
            var ccType = $li.get(12).innerHTML.trim();
            ccType = ccType.substring(0, ccType.lastIndexOf(':'));
            var ccNumber = $li.get(13).innerHTML.trim();
            var expiration = $li.get(15).innerHTML.trim().split('/');
            var expMonth = pad(expiration[0], 2);
            var expYear = expiration[1];
            var cvv2 = $li.get(17).innerHTML.trim();
            $("select[id*=paymentMethod]").val("Credit Card");
            $("input[id*=firstName]").val(firstName);
            $("input[id*=lastName]").val(lastName);
            $("textarea[id*=street]").val(streetAddress);
            $("input[id*=city]").val(city);
            $("input[id*=stateText]").val(state);
            $("select[id*=stateList]").val(state);
            $("input[id*=zip]").val(zipCode);
            $("input[id*=phone]").val(phone);
            $("input[id*=email]").val(email);
            $("select[id*=orderSource]").val("Other");
            $("select[id*=ccType]").val(ccType);
            $("input[id*=ccNumber]").val(ccNumber);
            $("input[id*=cvv2]").val(cvv2);
            $("input[id*=expMonth]").val(expMonth);
            $("input[id*=expYear]").val(expYear);
            // Fire the blur even on the phone field to format it
            $("input[id*=phone]").blur();
        },
        onerror: function(response) {
            alert("Error! Unable to get fake name from www.fakenamegenerator.com: " + response.responseText);
        }
    });
});