// ==UserScript==
// @name     _Nike bot script
// @include  http://store.nike.com/*
// @include  https://store.nike.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

var targetShoeSize  = "10";

//-- STEP 1:    Activate size drop-down.
waitForKeyElements (
    "div.footwear form.add-to-cart-form span.sizeDropdown a.size-dropdown",
    activateSizeDropdown
);
function activateSizeDropdown (jNode) {
    triggerMouseEvent (jNode[0], "mousedown");

    //-- Setup step 2.
    waitForKeyElements (
        "ul.selectBox-dropdown-menu li a:contains('" + targetShoeSize + "'):visible",
        selectDesiredShoeSize
    );
}

//-- STEP 2:    Select desired shoe size.
function selectDesiredShoeSize (jNode) {
    /*-- Because the selector for this node is vulnerable to false positives,
        we need an additional check here.
    */
    if ($.trim (jNode.text () ) === targetShoeSize) {
        //-- This node needs a triplex event
        triggerMouseEvent (jNode[0], "mouseover");
        triggerMouseEvent (jNode[0], "mousedown");
        triggerMouseEvent (jNode[0], "mouseup");

        //-- Setup steps 3 and 4.
        waitForKeyElements (
            "div.footwear form.add-to-cart-form span.sizeDropdown a.selectBox "
            + "span.selectBox-label:contains('(" + targetShoeSize + ")')",
            waitForShoeSizeDisplayAndAddToCart
        );
    }
}

//-- STEPS 3 and 4: Wait for shoe size display and add to cart.
function waitForShoeSizeDisplayAndAddToCart (jNode) {
    var addToCartButton = $(
        "div.footwear form.add-to-cart-form div.product-selections div.add-to-cart"
    );
    triggerMouseEvent (addToCartButton[0], "click");

    //-- Setup step 5.
    waitForKeyElements (
        "div.mini-cart div.cart-item-data a.checkout-button:visible",
        clickTheCheckoutButton
    );
}

//-- STEP 5:    Click the checkout button.
function clickTheCheckoutButton (jNode) {
    triggerMouseEvent (jNode[0], "click");

    //-- All done.  The checkout page should load.
}

function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
}

