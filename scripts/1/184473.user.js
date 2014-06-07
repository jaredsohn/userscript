// ==UserScript==
// @name          pardus trade sb run punkt js
// @namespace     http://www.paruds.to
// @description   Scripting is not so much fun
// @include       http*://*.pardus.at/planet_trade.php
// @version       1.0
// ==/UserScript==

// Settings
var purchase = {"1": 3, "3": 2};

function generateQuickButtonSb() {
    // Generate Button HTML
    var sellVars = unsafeWindow.generateQuickSellButton(unsafeWindow.res_upkeep, "Sell all", "quickButtonSellSb", unsafeWindow.keep_res);
    var buyVars = unsafeWindow.generateQuickBuyButton(purchase, "Buy Starbase Supplies", "quickButtonBuySb");
    var sellAndBuyVars = unsafeWindow.generateQuickSellAndBuyButton(purchase, "Starbase Run", "quickButtonSellAndBuySb", sellVars, buyVars);
    var buyButton = sellAndBuyVars[0] + "<br><br>";
    var buyPreview = sellAndBuyVars[1];
    
    // Create Button Element
    var sellAndBuyButton = document.createElement("div");
    sellAndBuyButton.innerHTML = buyButton;
    
    // Add Button to page
    var parentEl = document.getElementById("quickButtons");
    var checkboxEl = document.getElementById("preview_checkbox_line");
    parentEl.insertBefore(sellAndBuyButton, checkboxEl);
    unsafeWindow.addButtonPreview("quickButtonSellAndBuySb", buyPreview);
}

if (document.getElementById("quickButtonsTbl").style.display != "none") {
    generateQuickButtonSb();
}

// Override the generateQuickButtons function to create our button as well
var originalGenerateQuickButtons = unsafeWindow.generateQuickButtons;
unsafeWindow.generateQuickButtons = function() {
    originalGenerateQuickButtons();
    generateQuickButtonSb();
};