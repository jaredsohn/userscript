// ==UserScript==
// @name           USPS Click-n-Ship Helper
// @description    Helps automate the process of entering data into Click-n-Ship.
// @namespace      http://kepibu.org/
// @include        https://sss-web.usps.com/cns/*
// ==/UserScript==

// USPS puts the form on several different URLs, and also puts other things
// on those same URLs, so only do our thing if the form exists.

// Address entry
(function () {
if (!document.forms.namedItem("labelInformationForm")) return;

function dataURL (reference) {
    return GM_getValue("dataURL", "http://localhost:8080/usps?invoice=%s") .
             replace("%s", reference);
}

var form = document.forms.namedItem("labelInformationForm");
function selectDeliveryState (select, value) {
    for (var i = 0; i < select.length; i++) {
        if (select.options[i].value == value) {
            select.selectedIndex = i;
            return;
        }
    }
    GM_log("could not set deliveryState to "+value);
};

function insertAddress(invdata) {
    form.elements.namedItem("deliveryCompanyName").value = invdata.shipto.company;
    form.elements.namedItem("deliveryFullName").value = invdata.shipto.name;
    form.elements.namedItem("deliveryAddressOne").value = invdata.shipto.street;
    form.elements.namedItem("deliveryAddressTwo").value = invdata.shipto.unit;
    form.elements.namedItem("deliveryCity").value = invdata.shipto.city;
    selectDeliveryState(form.elements.namedItem("deliveryState"), invdata.shipto.state);
    form.elements.namedItem("deliveryZipcode").value = invdata.shipto.zip;
    form.elements.namedItem("deliveryEmail").value = invdata["e-mail"];
    // wrappedJSObject is just so much more expedient than the DOM way of triggering an event.
    form.elements.namedItem("deliveryEmail").wrappedJSObject.onchange();
    form.elements.namedItem("shippingWeightInPounds").focus();
}

function getAddress(reference) {
    GM_xmlhttpRequest({
        "method": "GET",
        "url": dataURL(reference),
        "headers": {
            "Accept-Type": "application/javascript",
        },
        "onerror": function (response) {
            GM_log("failed to get address for invoice "+reference);
            // FIXME: add something to the page denoting the problem
        },
        "onload": function (response) {
            GM_log("got invoice data: "+response.responseText);
            insertAddress(JSON.parse(response.responseText));
            // Turn off autocomplete because it isn't necessary for an auto-filled form
            form.setAttribute("autocomplete", "off");
        },
    });
}

var ref = form.elements.namedItem("deliveryRefNbr");
ref.addEventListener(
    "change",
    function (e) {
        GM_log("value of ref is "+this.value);
        getAddress(this.value);
    },
    true);

var row = ref.parentNode.parentNode;
//row.style.backgroundColor="#eef";

var tbl = row.parentNode;
tbl.insertBefore(row, tbl.firstChild);

ref.tabIndex=40;
ref.focus();
document.getElementById("ship_from_same_zipcode").checked=form.elements.namedItem("otherZipCode").value == "";

// After 5PM PO Closes, so shipping date can't be earlier than tomorrow
form.elements.namedItem("shippingDate").selectedIndex = (17 <= new Date().getHours() ? 1 : 0);
})();

(function () {
/* Turns an entire row into, effectively, a <label> tied to the radio
   button in the row.  Very handy for turning a small clickable area into a
   large clickable area, thereby improving usability via Fitts' Law. */
function labelizeRow(formName, radioName, extra) {
    if (!document.forms.namedItem(formName)) return;

    var form = document.forms.namedItem(formName).wrappedJSObject;

    /* Apparently if there's only one radio element, Firefox doesn't bother
       with the array-like bits, so to make the whole row clickable even
       when there's only one radio element, we have either duplicate the
       code or break it out into a function and call it under two
       scenarios.  Completely asinine, but easier than fixing Firefox's
       stupidity.
     */
    function loop_body (radio) {
        var row = radio.parentNode.parentNode;
        row.setAttribute("class", "GM-radio-selector");
        row.addEventListener("click",
                             // JS closures...ya gotta love 'em
                             (function (radio) {
                                 return function (e) {
                                     if (e.target.tagName != "A" &&
                                         e.target.parentNode.tagName != "A")
                                         radio.click();
                                     if (extra) extra(radio);
                                 };})(radio),
                             false);
    }

    if (form[radioName].length) {
        for (var i = 0; i < form[radioName].length; i++) loop_body(form[radioName][i]);
    } else if (form[radioName]) {
        loop_body(form[radioName]);
    }

    function addStyleSheet(style){
        var getHead = document.getElementsByTagName("HEAD")[0];
        var cssNode = window.document.createElement( 'style' );
        var elementStyle= getHead.appendChild(cssNode);
        elementStyle.innerHTML = style;
        return elementStyle;
    }

    addStyleSheet('tr.GM-radio-selector:hover { background-color: #ddd; }');
}

// Service and Postage options
labelizeRow("servicePostageOptionsForm", "selectedService", false);

// Credit Card selection
labelizeRow("storedCardForm", "selectedCard",
            // put keyboard focus in the CVV textbox
            function (radio) {
                var tr = radio.parentNode.parentNode;
                tr.getElementsByTagName("TD")[5].getElementsByTagName("input")[0].focus();
            });
})();
